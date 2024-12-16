import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

export async function GET() {
  try {
    // Ensure the directory exists
    const imagesDirectory = path.join(process.cwd(), 'public/Images/Artists');
    
    try {
      await fs.access(imagesDirectory);
    } catch {
      // If directory doesn't exist, create it and return empty array
      await fs.mkdir(imagesDirectory, { recursive: true });
      return NextResponse.json({ images: [] });
    }

    // Read directory contents
    const files = await fs.readdir(imagesDirectory);
    
    // Filter for image files
    const imageFiles = files.filter(file => 
      /\.(jpg|jpeg|png|gif|webp)$/i.test(file)
    );

    // Return JSON response
    return new NextResponse(JSON.stringify({ images: imageFiles }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });

  } catch (error) {
    console.error('API Error:', error);
    return new NextResponse(JSON.stringify({ images: [], error: 'Failed to fetch images' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
} 