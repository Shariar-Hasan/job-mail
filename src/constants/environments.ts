export const ENV = {
    MAIL_SERVICE: process.env.MAIL_SERVICE || 'gmail',
    MAIL_USER: process.env.MAIL_USER || 'your-email@gmail.com',
    MAIL_PASS: process.env.MAIL_PASS || 'your-email-password',
    BASE_URL: process.env.BASE_URL || 'http://localhost:3000',
    API_URL: process.env.API_URL || 'http://localhost:3000/api',
    PORT: process.env.PORT || 3000,
}