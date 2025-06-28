import getMeta from '@/lib/getMeta';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
    console.log("Job Meta API called");
    const { link } = await req.json();
    console.log("Link received:", link);
    const meta = await getMeta(link);
    return NextResponse.json(meta);
}
