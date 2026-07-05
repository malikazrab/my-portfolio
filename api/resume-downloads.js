const { listDownloads } = require("./_resume-downloads");

function send(res, status, payload) {
  res.status(status).json(payload);
}

module.exports = async function handler(req, res) {
  const expectedToken = process.env.ADMIN_DOWNLOADS_TOKEN;

  if (!expectedToken) {
    return send(res, 503, {
      error: "Admin token is not configured on the server.",
    });
  }

  const suppliedToken = req.headers["x-admin-token"];
  if (!suppliedToken || suppliedToken !== expectedToken) {
    return send(res, 401, { error: "Unauthorized" });
  }

  if (req.method !== "GET") {
    res.setHeader("Allow", ["GET"]);
    return send(res, 405, { error: "Method not allowed" });
  }

  try {
    const records = await listDownloads();
    return send(res, 200, { records });
  } catch (error) {
    return send(res, 500, { error: "Could not load download logs." });
  }
};
