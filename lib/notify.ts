import { site } from "./site";

/**
 * Builds a click-to-send WhatsApp link to the manager with a prefilled message.
 *
 * In this demo, notifications surface two ways:
 *   1. a `wa.me` deep-link stored on the notification (open it to send), and
 *   2. a live entry in the manager dashboard notification feed.
 *
 * To send fully-automatically instead, set WHATSAPP_API_URL + WHATSAPP_TOKEN
 * (e.g. WhatsApp Cloud API / Twilio) and POST from `sendWhatsApp()` below.
 */
export function managerWaLink(message: string) {
  const to = site.managerWhatsapp;
  return `https://wa.me/${to}?text=${encodeURIComponent(message)}`;
}

export async function sendWhatsApp(message: string): Promise<boolean> {
  const url = process.env.WHATSAPP_API_URL;
  const token = process.env.WHATSAPP_TOKEN;
  if (!url || !token) return false; // not configured — rely on the wa.me link
  try {
    await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        messaging_product: "whatsapp",
        to: site.managerWhatsapp,
        type: "text",
        text: { body: message },
      }),
    });
    return true;
  } catch {
    return false;
  }
}
