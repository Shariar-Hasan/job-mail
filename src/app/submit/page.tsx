'use client';
import Image from 'next/image';
import { useState } from 'react';

export default function SubmitJobPage() {
    const [link, setLink] = useState('');
    const [meta, setMeta] = useState<{ title: string; description: string; image: string; } | null>(null);

    const handleFetch = async () => {
        const res = await fetch('/api/job-meta', {
            method: 'POST',
            body: JSON.stringify({ link }),
        });
        const data = await res.json();
        setMeta(data);
    };

    return (
        <main className="min-h-screen p-8 bg-white">
            <h1 className="text-2xl font-bold mb-4">Submit a Job</h1>
            <input
                type="text"
                value={link}
                onChange={e => setLink(e.target.value)}
                placeholder="Paste job post link"
                className="border w-full p-2 rounded mb-4"
            />
            <button onClick={handleFetch} className="bg-blue-600 text-white px-4 py-2 rounded">Fetch</button>

            {meta && (
                <div className="mt-6 space-y-2">
                    <h2 className="text-xl font-semibold">{meta.title}</h2>
                    <p>{meta.description}</p>
                    {meta.image && <Image src={meta.image} alt="Job thumbnail" className="w-32 h-32 object-cover" />}
                </div>
            )}
        </main>
    );
}
