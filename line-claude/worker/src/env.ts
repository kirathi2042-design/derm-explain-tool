export type Env = {
  // Secrets
  LINE_CHANNEL_ACCESS_TOKEN: string;
  LINE_CHANNEL_SECRET: string;
  LINE_LOGIN_CHANNEL_ID: string;
  ANTHROPIC_API_KEY: string;
  OWNER_USER_ID: string;
  NOTION_TOKEN?: string;
  NOTION_DATABASE_ID?: string;

  // Vars
  LIFF_BASE_URL: string;
  PUBLIC_WORKER_URL: string;
  MAX_DAILY_TASKS: string;

  // Bindings
  KV: KVNamespace;
  FILES: R2Bucket;
  TASK_QUEUE: Queue<TaskMessage>;
};

export type TaskMessage = {
  jobId: string;
  userId: string;
  kind: "research" | "write" | "pdf";
  prompt: string;
  createdAt: number;
};
