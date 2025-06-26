import nodemailer from 'nodemailer';

interface SendMailProps {
    subject: string;
    email: string;
    html: string;
}

const transporter = nodemailer.createTransport({
    service: process.env.MAIL_SERVICE,
    auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
    },
});
export default async function sendMail({ subject, email, html }: SendMailProps) {
    try {
        const response = await transporter.sendMail({
            from: process.env.MAIL_USER,
            to: email,
            subject,
            html,
        });
        console.log(`Email sent to ${email} with subject "${subject}"`);
        console.log('Response:', response);
        return response;
    } catch (error) {
        console.error(`Failed to send email to ${email}:`, error);
        throw error;
    }



}