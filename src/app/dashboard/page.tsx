"use client";
import Button from "@/components/small/Button";
import tryCatch from "@/lib/tryCatch";
import { api } from "@/services/fetch/fetchService";
import { useState } from "react";
import toast from "react-hot-toast";

export default function DashboardPage() {
    const [link, setLink] = useState("");
    const [meta, setMeta] = useState<{ title: string; description: string; image?: string; } | null>(null);
    const [loading, setLoading] = useState(false);

    const handleFetch = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setMeta(null);
        toast.dismiss();
        const { data, error } = await tryCatch(async () => await api.post<{ title: string; description: string; image: string }>("/job-meta", { link }));
        setLoading(false);
        if (error) {
            console.error("Error fetching metadata:", error);
            toast.error("Failed to fetch metadata. Please try again.");
            setMeta(null);
        } else {
            setMeta(data);
        }
    };

    return (
        <main className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 flex flex-col items-center justify-center p-2 md:p-4">
            <form
                onSubmit={handleFetch}
                className="w-full max-w-2xl bg-white rounded-xl shadow-lg p-3 sm:p-4 md:p-6 lg:p-8 space-y-6"
            >
                <h1 className="text-3xl font-bold text-center text-green-700 mb-2">Submit a Job Link</h1>
                <p className="text-center text-green-500 mb-4">Paste a job post link to fetch its metadata.</p>
                <div>
                    <label className="block text-gray-700 font-bold mb-1">Job Link</label>
                    <input
                        type="text"
                        value={link}
                        onChange={e => setLink(e.target.value)}
                        placeholder="Paste job post link"
                        className="w-full border px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-green-400 border-gray-300"
                    />
                </div>
                <Button
                    type="submit"
                    loading={loading}
                    loadingText="Fetching..."
                    className="w-full bg-green-600 text-white rounded px-4 py-2 cursor-pointer font-semibold hover:bg-green-700 transition disabled:bg-gray-400 disabled:cursor-not-allowed"
                >
                    Fetch Metadata
                </Button>
            </form>

            {meta && (
                <div className="w-full max-w-2xl mt-8">
                    <div className="bg-white rounded-xl shadow-lg p-6 flex flex-col md:flex-row items-center gap-6">
                        {meta.image && (
                            <img
                                src={meta.image}
                                alt={meta.title || "Job thumbnail"}
                                className="w-32 h-32 object-cover rounded-lg border border-green-100 shadow-sm mb-4 md:mb-0"
                            />
                        )}
                        <div className="flex-1">
                            <h2 className="text-xl font-bold text-green-700 mb-2">{meta.title}</h2>
                            <p className="text-gray-700 mb-2">{meta.description}</p>
                            {/* Show any extra fields except title, description, image */}
                            {Object.entries(meta)
                                .filter(([k]) => !["title", "description", "image"].includes(k))
                                .map(([k, v]) => (
                                    <div key={k} className="text-sm text-gray-500 mb-1">
                                        <span className="font-semibold capitalize">{k}:</span> {String(v)}
                                    </div>
                                ))}
                        </div>
                    </div>
                </div>
            )}
        </main>
    );
}
