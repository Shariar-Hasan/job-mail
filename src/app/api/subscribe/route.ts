import sendMail from '@/services/mail/sendMail';
import fs from 'fs/promises';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
    const { email, topics } = await req.json();
    const userPath = process.cwd() + '/src/data/user.json';
    const users = JSON.parse(await fs.readFile(userPath, 'utf8'));
    const existing = users.find((u: { email: string; topics: string[]; isUnsubscribed: boolean }) => u.email === email);

    if (existing) {
        existing.topics = topics;
        existing.isUnsubscribed = false;
    } else {
        users.push({ email, topics, isUnsubscribed: false });
    }

    await fs.writeFile(userPath, JSON.stringify(users, null, 2));

    await sendMail({
        email,
        subject: 'Subscription Confirmed',
        html: `<h2>Thanks for subscribing!</h2><p>You selected: ${topics.join(', ')}</p>`,
    });

    return NextResponse.json({ success: true });
}