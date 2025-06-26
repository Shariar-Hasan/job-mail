import fs from 'fs/promises';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
    const { email, topics } = await req.json();
    const userPath = process.cwd() + '/src/data/user.json';
    console.log('User path:', userPath);
    const users = JSON.parse(await fs.readFile(userPath, 'utf8'));
    const existing = users.find((u: { email: string }) => u.email === email);

    if (existing) {
        existing.topics = topics;
        existing.isUnsubscribed = false;
    } else {
        users.push({ email, topics, isUnsubscribed: false });
    }

    await fs.writeFile(userPath, JSON.stringify(users, null, 2));
    return NextResponse.json({ success: true });
}