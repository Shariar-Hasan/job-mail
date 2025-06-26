import getMeta from '@/lib/getMeta';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
    const { link } = await req.json();
    const meta = await getMeta(link);
    return NextResponse.json(meta);
}
