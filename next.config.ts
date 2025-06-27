import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  env: {
    MAIL_SERVICE: process.env.MAIL_SERVICE || "gmail",
    MAIL_USER: process.env.MAIL_USER || "user@example.com",
    MAIL_PASS: process.env.MAIL_PASS || "password",
    BASE_URL: process.env.BASE_URL || "http://localhost:3000",
    PORT: process.env.PORT || "3000",
  },
};

export default nextConfig;
