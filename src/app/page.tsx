'use client';
import { useEffect, useState } from 'react';

export default function HomePage() {
  const [topics, setTopics] = useState<string[]>([]);
  const [selected, setSelected] = useState<string[]>([]);
  const [email, setEmail] = useState('');

  useEffect(() => {
    fetch('/api/topic').then(res => res.json()).then(data => {
      setTopics(data);
      setSelected(data);
    });
  }, []);

  const toggleSelection = (topic: string) => {
    setSelected(prev =>
      prev.includes(topic) ? prev.filter(t => t !== topic) : [...prev, topic]
    );
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email || selected.length === 0) {
      alert('Please enter a valid email and select at least one topic.');
      return;
    }
    await fetch('/api/subscribe', {
      method: 'POST',
      body: JSON.stringify({ email, topics: selected }),
    });
    alert('Subscribed!');
  };

  return (
    <main className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <form onSubmit={handleSubmit} className="w-full max-w-md space-y-4">
        <h1 className="text-2xl font-bold text-center">Subscribe</h1>

        <input
          type="email"
          placeholder="Your email"
          required
          autoFocus
          value={email}
          onChange={e => setEmail(e.target.value)}
          className="w-full border rounded px-4 py-2"
        />

        <div className="flex items-center">
          <input
            type="checkbox"
            onChange={() => setSelected(selected.length === topics.length ? [] : topics)}
            className="mr-2"
          />
          <label>All topics</label>
        </div>

        {(
          <div className="grid grid-cols-2 gap-2">
            {topics.map(topic => (
              <label key={topic} className="flex items-center">
                <input
                  type="checkbox"
                  checked={selected.includes(topic)}
                  onChange={() => toggleSelection(topic)}
                  className="mr-2"
                />
                {topic}
              </label>
            ))}
          </div>
        )}

        <button
          type="submit"
          disabled={!email || selected.length === 0}
          className="w-full bg-blue-600 text-white rounded px-4 py-2 hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          Subscribe
        </button>
      </form>
    </main>
  );
}
