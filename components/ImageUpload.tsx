'use client';

import { useState } from 'react';

interface ImageUploadProps {
  onUploadComplete: (url: string) => void;
  existingImage?: string;
}

export default function ImageUpload({ onUploadComplete, existingImage }: ImageUploadProps) {
  const [preview, setPreview] = useState(existingImage || '');
  const [loading, setLoading] = useState(false);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.[0]) return;

    setLoading(true);
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append('file', file);

    try {
      // Apelăm API-ul nostru de upload (care trimite la Cloudinary)
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();

      if (data.success) {
        setPreview(data.url);
        onUploadComplete(data.url); // Trimitem URL-ul înapoi la formular
      } else {
        alert('Eroare la upload: ' + (data.message || 'Necunoscută'));
      }
    } catch (error) {
      console.error(error);
      alert('Eroare conexiune server.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full">
      <label className="block text-sm font-medium text-gray-300 mb-2">
        Imagine Eveniment *
      </label>
      
      <div className="flex items-center justify-center w-full">
        <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-600 border-dashed rounded-lg cursor-pointer bg-gray-800/50 hover:bg-gray-700/50 transition-all overflow-hidden relative">
          
          {loading ? (
            <div className="flex flex-col items-center">
              <svg className="animate-spin h-8 w-8 text-cyan-500 mb-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <p className="text-gray-400">Se încarcă...</p>
            </div>
          ) : preview ? (
            <div className="relative w-full h-full group">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img 
                src={preview} 
                alt="Preview" 
                className="w-full h-full object-cover" 
              />
              <div className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                 <p className="text-white font-bold">Click pentru a schimba</p>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <svg className="w-10 h-10 mb-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
              </svg>
              <p className="mb-2 text-sm text-gray-400"><span className="font-semibold">Click pentru upload</span></p>
              <p className="text-xs text-gray-500">JPG, PNG sau WebP</p>
            </div>
          )}

          <input id="dropzone-file" type="file" accept="image/*" className="hidden" onChange={handleFileChange} />
        </label>
      </div>
    </div>
  );
}