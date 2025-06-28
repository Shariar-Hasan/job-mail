import fs from 'fs/promises';
import { JSDOM } from 'jsdom';

export default async function getMeta(url: string) {
    const res = await fetch(url, {
        headers: {
            'User-Agent': 'Mozilla/5.0 (compatible; JobMailerBot/1.0; +https://yourdomain.com)',
            'Accept-Language': 'en-US,en;q=0.9',
        },
    });
    const html = await res.text();
    await fs.writeFile('debug.html', html, 'utf-8');
    const dom = new JSDOM(html);
    const doc = dom.window.document;

    // Helper to get meta content by multiple possible names
    const getMeta = (names: string[]) => {
        for (const name of names) {
            const meta = doc.querySelector(`meta[name='${name}']`) || doc.querySelector(`meta[property='${name}']`);
            if (meta?.getAttribute('content')) return meta.getAttribute('content');
        }
        return '';
    };

    // Collect all meta tags for extra fields
    const metaTags: Record<string, string> = {};
    doc.querySelectorAll('meta').forEach((meta) => {
        const name = meta.getAttribute('name') || meta.getAttribute('property');
        const content = meta.getAttribute('content');
        if (name && content) {
            metaTags[name] = content;
        }
    });

    const title =
        getMeta(['og:title', 'twitter:title']) ||
        doc.querySelector('title')?.textContent ||
        '';
    const description =
        getMeta(['description', 'og:description', 'twitter:description']) ||
        '';
    const image =
        getMeta(['og:image', 'twitter:image', 'image']) ||
        '';

    return {
        title,
        description,
        image,
        metaTags, // all meta tags for extra card details
    };
}