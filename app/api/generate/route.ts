import { NextResponse } from 'next/server';
import OpenAI from 'openai';

export const client = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

interface GenerateRequest {
    prompt: string;
}

export async function POST(request: Request) {
    const body: GenerateRequest = await request.json();

    try {
        const response = await client.responses.create({
            model: 'gpt-4.1-nano-2025-04-14',
            input: body.prompt,
    
        });

        return NextResponse.json({ response });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Failed to generate response' }, { status: 500 });
    }
}
