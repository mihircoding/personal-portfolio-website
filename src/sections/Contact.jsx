import { useState } from "react";
import { AlertCircle, CheckCircle, Linkedin } from "lucide-react";
import { profile } from "@/data/site";

const field =
  "w-full rounded-md border border-border bg-background px-3 py-2 text-sm outline-none transition-colors placeholder:text-muted-foreground/70 focus:border-muted-foreground/50";

// FormSubmit relays the message to profile.email. No account or API key —
// the first submission triggers a one-time confirmation email that has to be
// clicked once, after which every message is delivered.
const ENDPOINT = `https://formsubmit.co/ajax/${profile.email}`;

export const Contact = () => {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState({ type: null, message: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setStatus({ type: null, message: "" });

    try {
      const res = await fetch(ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message: formData.message,
          _subject: `Portfolio contact form: ${formData.name}`,
          _template: "table",
          _captcha: "false",
        }),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok || String(data.success) !== "true") {
        throw new Error(data.message || `Request failed (${res.status})`);
      }

      setStatus({
        type: "success",
        message: "Message sent. I'll get back to you soon.",
      });
      setFormData({ name: "", email: "", message: "" });
    } catch (err) {
      console.error("Contact form error:", err);
      setStatus({
        type: "error",
        message: `Couldn't send that — email me directly at ${profile.email}.`,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section id="contact" className="mb-4 scroll-mt-20">
      <h2 className="text-lg font-bold text-foreground">Get in Touch</h2>
      <p className="mt-1 max-w-2xl text-sm leading-7 text-muted-foreground">
        Based in {profile.location}. Reach me at{" "}
        <a
          href={`mailto:${profile.email}`}
          className="text-foreground underline underline-offset-4 hover:opacity-70"
        >
          {profile.email}
        </a>
        , or send a note below.
      </p>

      <form onSubmit={handleSubmit} className="mt-5 max-w-lg space-y-3">
        <div className="grid gap-3 sm:grid-cols-2">
          <div>
            <label htmlFor="name" className="mb-1.5 block text-xs text-muted-foreground">
              Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              required
              placeholder="Your name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className={field}
            />
          </div>
          <div>
            <label htmlFor="email" className="mb-1.5 block text-xs text-muted-foreground">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              placeholder="you@email.com"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className={field}
            />
          </div>
        </div>

        <div>
          <label htmlFor="message" className="mb-1.5 block text-xs text-muted-foreground">
            Message
          </label>
          <textarea
            id="message"
            name="message"
            rows={4}
            required
            placeholder="What's on your mind?"
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            className={`${field} resize-none`}
          />
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="inline-flex h-9 items-center justify-center rounded-md bg-foreground px-4 text-sm font-medium text-background transition-opacity hover:opacity-85 disabled:opacity-50"
        >
          {isLoading ? "Sending…" : "Submit"}
        </button>

        {status.type && (
          <div
            className={`flex items-start gap-2 rounded-md border p-3 text-xs ${
              status.type === "success"
                ? "border-border text-foreground"
                : "border-red-500/40 text-red-500"
            }`}
          >
            {status.type === "success" ? (
              <CheckCircle className="mt-0.5 size-3.5 flex-shrink-0" />
            ) : (
              <AlertCircle className="mt-0.5 size-3.5 flex-shrink-0" />
            )}
            <p>{status.message}</p>
          </div>
        )}
      </form>

      <p className="mt-5 text-xs text-muted-foreground">
        Or just want to have a casual chat?{" "}
        <a
          href={profile.linkedin}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-1 text-foreground underline underline-offset-4 hover:opacity-70"
        >
          <Linkedin className="size-3" />
          DM me on LinkedIn
        </a>
        .
      </p>
    </section>
  );
};
