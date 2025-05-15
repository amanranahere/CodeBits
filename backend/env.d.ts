declare namespace NodeJS {
  interface ProcessEnv {
    Port: string;
    CORS_ORIGIN: string;
    MONGODB_URI: string;
    ACCESS_TOKEN_SECRET: string;
    ACCESS_TOKEN_EXPIRY: string;
    REFRESH_TOKEN_SECRET: string;
    REFRESH_TOKEN_EXPIRY: string;
  }
}
