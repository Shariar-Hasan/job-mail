// /lib/DynamicMail.ts

import { ENV } from "@/constants/environments";

interface DynamicMailProps {
    title: string;
    subtitle: string;
    body: string;
    email: string; // Optional, can be used for personalization
}

export const DynamicMail = ({ title, subtitle, body, email }: DynamicMailProps) => {
    return `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>${title}</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    ${Styles()}
  </head>
  <body>
    <div class="email-container">
      ${Header({ title, subtitle })}
      <div class="email-body">
        ${body}
      </div>
      ${Footer({ email })}
    </div>
  </body>
  </html>
    `;
};

const Styles = () => `
  <style>
    body {
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      background: #e9f1fb;
      padding: 30px;
      margin: 0;
    }
    .email-container {
      max-width: 600px;
      margin: auto;
      background: #ffffff;
      border-radius: 10px;
      overflow: hidden;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
    }
    .email-header {
      background: #2563eb;
      color: white;
      padding: 24px 32px;
      text-align: center;
    }
    .email-header h1 {
      margin: 0;
      font-size: 24px;
    }
    .email-header p {
      margin: 4px 0 0;
      font-size: 14px;
      color: #cbd5e1;
    }
    .email-body {
      padding: 24px 32px;
      font-size: 16px;
      color: #374151;
      line-height: 1.6;
    }
    .email-footer {
      background: #f3f4f6;
      padding: 16px;
      text-align: center;
      font-size: 13px;
      color: #6b7280;
    }
  </style>
  `;

const Header = ({ title, subtitle }: { title: string; subtitle: string }) => {
    return `
      <div class="email-header">
        <h1>${title}</h1>
        <p>${subtitle}</p>
      </div>
    `;
};

const Footer = ({ email }: { email: string }) => {
    return `
      <div class="email-footer">
        <p>&copy; ${new Date().getFullYear()} Job Mailer. All rights reserved.</p>
        <p>If you wish to unsubscribe, click <a href="${ENV.BASE_URL}/unsubscribe/${email}" style="color: #2563eb; text-decoration: none;">here</a>.</p>
        <p>
          <a href="https://linkedin.com/in/shariar-hasan" style="color: #2563eb; text-decoration: none; margin-right: 12px;">
            LinkedIn
          </a>
          <a href="https://github.com/shariar-hasan" style="color: #2563eb; text-decoration: none;">
            GitHub
          </a>
        </p>
      </div>
    `;
};
