import { json } from '@sveltejs/kit';

export async function GET() {
    return json({ message: 'Export function triggered!' });
}