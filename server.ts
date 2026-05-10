import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import cors from "cors";
import { rateLimit } from "express-rate-limit";
import dotenv from "dotenv";
import { Resend } from "resend";
import { ownerNotificationEmailTemplate, confirmationEmailTemplate } from "./src/emails/templates.js";

dotenv.config();

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());
  app.use(cors());

  // Rate limiting for the leads endpoint
  const leadRateLimit = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 10,
    message: { success: false, error: "Too many requests from this IP, please try again after 15 minutes" },
  });

  app.get("/api/health", (req, res) => {
    res.json({ status: "ok" });
  });

  app.post("/api/leads", leadRateLimit, async (req, res) => {
    try {
      const { name, email, company, phone, challenge, referralSource } = req.body;

      if (!name || !email || !company || !challenge) {
        return res.status(400).json({ success: false, error: "Required fields missing" });
      }

      console.log("New Lead Received:", { name, email, company, phone, challenge, referralSource });

      // Trigger Emails
      if (resend) {
        const fromEmail = process.env.FROM_EMAIL || "onboarding@resend.dev";
        const notificationEmail = process.env.NOTIFICATION_EMAIL;

        // Owner Notification
        if (notificationEmail) {
           await resend.emails.send({
            from: fromEmail,
            to: notificationEmail,
            subject: `🔥 New Call Booking: ${name} from ${company}`,
            html: ownerNotificationEmailTemplate(req.body),
          });
        }

        // Potential Customer Confirmation
        await resend.emails.send({
          from: fromEmail,
          to: email,
          subject: `You're all set — talk soon, ${name.split(' ')[0]}!`,
          html: confirmationEmailTemplate(req.body),
        });
      } else {
        console.warn("RESEND_API_KEY not set. Skipping emails.");
      }

      res.status(200).json({ success: true, message: "We'll be in touch within 24 hours!" });
    } catch (error) {
      console.error("Submission error:", error);
      res.status(500).json({ success: false, error: "Internal server error" });
    }
  });

  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
