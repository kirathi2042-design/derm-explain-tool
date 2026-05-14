import type { LineFlexMessage } from "./line";

export function textCard(title: string, body: string, footer?: string): LineFlexMessage {
  return {
    type: "flex",
    altText: title,
    contents: {
      type: "bubble",
      size: "mega",
      header: {
        type: "box",
        layout: "vertical",
        contents: [{ type: "text", text: title, weight: "bold", size: "md", wrap: true }],
        paddingBottom: "sm",
      },
      body: {
        type: "box",
        layout: "vertical",
        contents: [{ type: "text", text: body, wrap: true, size: "sm", color: "#333333" }],
      },
      ...(footer
        ? {
            footer: {
              type: "box",
              layout: "vertical",
              contents: [{ type: "text", text: footer, size: "xs", color: "#888888", wrap: true }],
            },
          }
        : {}),
    },
  };
}

export function fileCard(title: string, summary: string, url: string, ctaLabel = "下載"): LineFlexMessage {
  return {
    type: "flex",
    altText: `${title} — ${ctaLabel}`,
    contents: {
      type: "bubble",
      size: "mega",
      body: {
        type: "box",
        layout: "vertical",
        spacing: "md",
        contents: [
          { type: "text", text: title, weight: "bold", size: "md", wrap: true },
          { type: "text", text: summary, size: "sm", color: "#555555", wrap: true },
        ],
      },
      footer: {
        type: "box",
        layout: "vertical",
        contents: [
          {
            type: "button",
            style: "primary",
            action: { type: "uri", label: ctaLabel, uri: url },
          },
        ],
      },
    },
  };
}

export function jobAck(jobId: string, statusUrl: string): LineFlexMessage {
  return {
    type: "flex",
    altText: "已收到任務",
    contents: {
      type: "bubble",
      size: "kilo",
      body: {
        type: "box",
        layout: "vertical",
        spacing: "sm",
        contents: [
          { type: "text", text: "已收到，處理中 ⏳", weight: "bold", size: "md" },
          { type: "text", text: `Job ${jobId.slice(0, 8)}`, size: "xs", color: "#999999" },
          { type: "text", text: "完成後會自動傳給你。", size: "sm", wrap: true, color: "#555555" },
        ],
      },
      footer: {
        type: "box",
        layout: "vertical",
        contents: [
          {
            type: "button",
            style: "secondary",
            action: { type: "uri", label: "查看狀態", uri: statusUrl },
          },
        ],
      },
    },
  };
}
