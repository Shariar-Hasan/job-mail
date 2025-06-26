import { JSDOM } from 'jsdom';

export default async function getMeta(url: string) {
    const res = await fetch(url);
    const html = await res.text();
    const dom = new JSDOM(html);
    const doc = dom.window.document;

    const getMetaTag = (name: string) =>
        doc.querySelector(`meta[name='${name}']`)?.getAttribute('content') ||
        doc.querySelector(`meta[property='og:${name}']`)?.getAttribute('content');

    return {
        title: doc.querySelector('title')?.textContent || '',
        description: getMetaTag('description') || '',
        image: getMetaTag('image') || '',
    };
}