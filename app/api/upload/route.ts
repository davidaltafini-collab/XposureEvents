import { NextResponse } from 'next/server';
import { v2 as cloudinary } from 'cloudinary';

// Configurare Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(request: Request) {
  try {
    const data = await request.formData();
    const file = data.get('file') as File;

    if (!file) {
      return NextResponse.json({ success: false, message: 'Niciun fișier detectat' }, { status: 400 });
    }

    // Transformăm fișierul pentru Cloudinary
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const fileBase64 = `data:${file.type};base64,${buffer.toString('base64')}`;

    // Upload efectiv
    const result = await cloudinary.uploader.upload(fileBase64, {
      folder: 'xposure_events', // Folderul unde se vor salva pozele în Cloudinary
    });

    // Returnăm link-ul către poză
    return NextResponse.json({ 
      success: true, 
      url: result.secure_url 
    });

  } catch (error) {
    console.error('Cloudinary Upload Error:', error);
    return NextResponse.json({ success: false, message: 'Eroare la upload' }, { status: 500 });
  }
}