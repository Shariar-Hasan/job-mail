import fs from 'fs/promises';
import { NextResponse } from 'next/server';

export async function GET() {
    const topicPath = process.cwd() + '/src/data/topic.json';
    console.log('Topic path:', topicPath);
    const topics = JSON.parse(await fs.readFile(topicPath, 'utf8'));
    return NextResponse.json(topics);
}