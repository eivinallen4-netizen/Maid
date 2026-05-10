export async function sendAdminNotification(
  title: string,
  message: string,
  data?: Record<string, string>
) {
  const apiKey = process.env.ONESIGNAL_REST_API_KEY;
  const appId = "6fddc9f5-0f91-4460-8283-c6ef206f2c7e";

  if (!apiKey) {
    console.warn("OneSignal API key not configured");
    return false;
  }

  try {
    const response = await fetch("https://onesignal.com/api/v1/notifications", {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        Authorization: `Basic ${apiKey}`,
      },
      body: JSON.stringify({
        app_id: appId,
        filters: [
          {
            field: "tag",
            key: "role",
            value: "admin",
          },
        ],
        headings: { en: title },
        contents: { en: message },
        data: data || {},
        chrome_web_icon:
          "https://cdn.onesignal.com/pictures/f64ac826-c5f1-4b80-b96b-6b8ba3e21fa6.png",
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      console.error("OneSignal notification failed:", error);
      return false;
    }

    return true;
  } catch (error) {
    console.error("Error sending admin notification:", error);
    return false;
  }
}
