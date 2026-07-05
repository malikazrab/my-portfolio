const { addDownload, normalizeRecord } = require("./_resume-downloads");

function send(res, status, payload) {
  res.status(status).json(payload);
}

module.exports = async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", ["POST"]);
    return send(res, 405, { error: "Method not allowed" });
  }

  const { name, email, resumeName, resumePath } = req.body || {};
  const cleanedName = String(name || "").trim();
  const cleanedEmail = String(email || "").trim();

  if (!cleanedName || cleanedName.length < 2) {
    return send(res, 400, { error: "Name is required." });
  }

  if (!cleanedEmail || !cleanedEmail.includes("@")) {
    return send(res, 400, { error: "A valid email is required." });
  }

  const record = normalizeRecord(
    {
      name: cleanedName,
      email: cleanedEmail,
      resumeName,
      resumePath,
    },
    req.headers
  );

  try {
    await addDownload(record);
    return send(res, 200, { ok: true });
  } catch (error) {
    return send(res, 500, {
      error: "Could not save the download log.",
    });
  }
};
