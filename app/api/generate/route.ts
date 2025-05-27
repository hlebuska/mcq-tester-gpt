import { NextResponse } from 'next/server';
import OpenAI from 'openai';

console.log(process.env.OPENAI_API_KEY + 'API CODE');

export const client = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

interface GenerateRequest {
    prompt: string;
}

export async function POST(request: Request) {
    console.log(process.env.OPENAI_API_KEY);
    const body: GenerateRequest = await request.json();

    try {
        const response = await client.responses.create({
            model: 'gpt-4.1',
            input: body.prompt,
            max_output_tokens: 150,
        });

        return NextResponse.json({ response });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Failed to generate response' }, { status: 500 });
    }
}
