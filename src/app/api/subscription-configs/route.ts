import getConfigs from '@/services/get/getConfigs';
import { NextResponse } from 'next/server';

export async function GET() {
    const configs = await getConfigs();
    return NextResponse.json(configs);
}