module.exports = async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { name, email, subject, message } = req.body || {};

  const cleanName = String(name || "").trim();
  const cleanEmail = String(email || "").trim();
  const cleanSubject = String(subject || "").trim();
  const cleanMessage = String(message || "").trim();

  if (!cleanName || cleanName.length < 2) {
    return res.status(400).json({ error: "Name is required." });
  }
  if (!cleanEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleanEmail)) {
    return res.status(400).json({ error: "A valid email is required." });
  }
  if (!cleanSubject) {
    return res.status(400).json({ error: "Subject is required." });
  }
  if (!cleanMessage || cleanMessage.length < 20) {
    return res.status(400).json({ error: "Message must be at least 20 characters." });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const toEmail = process.env.CONTACT_TO_EMAIL || "malikazrab2007@gmail.com";

  if (!apiKey) {
    return res.status(503).json({ error: "Email service is not configured." });
  }

  const payload = {
    from: "Portfolio Contact <onboarding@resend.dev>",
    to: [toEmail],
    reply_to: cleanEmail,
    subject: `[Portfolio] ${cleanSubject}`,
    text: `From: ${cleanName} <${cleanEmail}>\n\n${cleanMessage}`,
    html: `<p><strong>From:</strong> ${cleanName} &lt;${cleanEmail}&gt;</p><p>${cleanMessage.replace(/\n/g, "<br>")}</p>`,
  };

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const error = await response.text();
    console.error("Resend error:", error);
    return res.status(502).json({ error: "Failed to send message. Please try again." });
  }

  return res.status(200).json({ ok: true });
};
