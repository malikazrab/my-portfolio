const { Redis } = require("@upstash/redis");

const KEY = "resume-downloads";
const MAX_ITEMS = 500;

function getMemoryStore() {
  if (!globalThis.__resumeDownloadStore) {
    globalThis.__resumeDownloadStore = [];
  }

  return globalThis.__resumeDownloadStore;
}

function hasRedisConfig() {
  return Boolean(
    process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN
  );
}

function getRedis() {
  if (!hasRedisConfig()) return null;

  if (!globalThis.__resumeDownloadRedis) {
    globalThis.__resumeDownloadRedis = new Redis({
      url: process.env.UPSTASH_REDIS_REST_URL,
      token: process.env.UPSTASH_REDIS_REST_TOKEN,
    });
  }

  return globalThis.__resumeDownloadRedis;
}

async function addDownload(record) {
  const redis = getRedis();

  if (!redis) {
    const store = getMemoryStore();
    store.unshift(record);
    store.length = Math.min(store.length, MAX_ITEMS);
    return;
  }

  await redis.lpush(KEY, JSON.stringify(record));
  await redis.ltrim(KEY, 0, MAX_ITEMS - 1);
}

async function listDownloads() {
  const redis = getRedis();

  if (!redis) {
    return getMemoryStore();
  }

  const items = await redis.lrange(KEY, 0, MAX_ITEMS - 1);
  return items
    .map((item) => {
      try {
        return typeof item === "string" ? JSON.parse(item) : item;
      } catch (error) {
        return null;
      }
    })
    .filter(Boolean);
}

function getClientIp(headers = {}) {
  const forwardedFor = headers["x-forwarded-for"];
  if (!forwardedFor) return null;
  return String(forwardedFor).split(",")[0].trim() || null;
}

function normalizeRecord(body = {}, headers = {}) {
  return {
    id: body.id || `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    timestamp: body.timestamp || new Date().toISOString(),
    name: String(body.name || "").trim(),
    email: String(body.email || "").trim(),
    resumeName: String(body.resumeName || "CV").trim(),
    resumePath: String(body.resumePath || "").trim(),
    ip: getClientIp(headers),
    country: headers["x-vercel-ip-country"] || null,
    region: headers["x-vercel-ip-country-region"] || null,
    city: headers["x-vercel-ip-city"] || null,
    userAgent: headers["user-agent"] || null,
    referrer: headers["referer"] || headers["referrer"] || null,
  };
}

module.exports = {
  KEY,
  MAX_ITEMS,
  addDownload,
  listDownloads,
  normalizeRecord,
};
