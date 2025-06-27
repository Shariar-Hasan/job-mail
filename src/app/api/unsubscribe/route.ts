import { user } from '@/services/data/provider';
import sendMail from '@/services/mail/sendMail';
import { User } from '@/types/user.model';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(
    request: NextRequest,
    { params }: { params: { email: string } }
) {
    const { email } = params;
    const oldUser = await user.findOne((u: User) => u.email === email);

    if (oldUser) {
        oldUser.isUnsubscribed = true;
        user.update(
            (u: User) => u.email === email,
            (u: User) => ({ ...u, isUnsubscribed: true })
        );


        await sendMail({
            email,
            subject: 'Unsubscribed from Job Mailer',
            html: `<h2>You have been unsubscribed.</h2><p>You will no longer receive job notifications.</p>`,
        });

        return NextResponse.json({ message: 'Unsubscribed successfully.', success: true }, { status: 200 });
    } else {
        return NextResponse.json({ message: 'User not found.', success: false }, { status: 404 });
    }
}