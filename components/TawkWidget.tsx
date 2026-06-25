"use client";

import dynamic from "next/dynamic";

const TawkMessengerReact = dynamic(
  () => import("@tawk.to/tawk-messenger-react"),
  { ssr: false }
);

function getTawkIds() {
  const rawProperty = process.env.NEXT_PUBLIC_TAWK_PROPERTY_ID?.trim() ?? "";
  const rawWidget = process.env.NEXT_PUBLIC_TAWK_WIDGET_ID?.trim() ?? "default";

  if (!rawProperty) return null;

  if (rawProperty.includes("/")) {
    const [propertyId, widgetId] = rawProperty.split("/");
    if (propertyId && widgetId) {
      return { propertyId, widgetId };
    }
  }

  return { propertyId: rawProperty, widgetId: rawWidget };
}

export function TawkWidget() {
  const ids = getTawkIds();
  if (!ids) return null;

  return (
    <TawkMessengerReact
      propertyId={ids.propertyId}
      widgetId={ids.widgetId}
    />
  );
}
