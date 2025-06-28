import { user } from '@/services/data/provider';
import sendMail from '@/services/mail/sendMail';
import { SubscriptionMail } from '@/services/mail/views/subscription';
import { User } from '@/types/user.model';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
    const { email, topics, experience, stacks } = await req.json();
    const existing = await user.findOne((u: User) => u.email === email);

    if (existing) {
        user.update(
            (u: User) => u.email === email,
            (u: User) => ({ ...u, topics, experience, stacks, isUnsubscribed: false })
        );
    } else {
        await user.create({ email, topics, experience, stacks, isUnsubscribed: false });
    }

    await sendMail({
        email,
        subject: 'Subscription Confirmed',
        html: SubscriptionMail(existing ? existing : { email, topics, experience, stacks } as User),
    });

    return NextResponse.json({ success: true, message: 'Subscribed successfully!' }, { status: 200 });
}