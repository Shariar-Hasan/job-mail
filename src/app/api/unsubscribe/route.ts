import { user } from '@/services/data/provider';
import sendMail from '@/services/mail/sendMail';
import { UnSubscriptionMail } from '@/services/mail/views/subscription';
import { User } from '@/types/user.model';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(
    request: NextRequest,
) {
    const { email } = await request.json();
    console.log(`Unsubscribe request received for email: ${email}`);
    const oldUser = await user.findOne((u: User) => u.email === email);
    console.log('Old user data:', oldUser);

    if (oldUser) {
        oldUser.isUnsubscribed = true;
        user.update(
            (u: User) => u.email === email,
            (u: User) => ({ ...u, isUnsubscribed: true })
        );


        await sendMail({
            email,
            subject: 'Unsubscribed from Job Mailer',
            html: UnSubscriptionMail(oldUser),
        });
        console.log(`User ${email} unsubscribed successfully.`);
        console.log('Updated user data:', oldUser);
        return NextResponse.json({ message: 'Unsubscribed successfully.', success: true }, { status: 200 });
    } else {
        return NextResponse.json({ message: 'User not found.', success: false }, { status: 404 });
    }
}