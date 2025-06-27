import { ENV } from "@/constants/environments";

class FetchService {
    private baseUrl: string;

    constructor(baseUrl: string) {
        this.baseUrl = baseUrl;
    }

    setBaseUrl(url: string) {
        this.baseUrl = url;
    }
    fixEndpoint(endpoint: string): string {
        if (endpoint.startsWith('/')) {
            return endpoint;
        }
        return '/' + endpoint;
    }

    async request<T>(endpoint: string, options?: RequestInit): Promise<T> {
        const res = await fetch(this.baseUrl + this.fixEndpoint(endpoint), options);
        if (!res.ok) throw new Error(await res.text());
        return res.json();
    }

    get<T>(endpoint: string): Promise<T> {
        return this.request<T>(endpoint, { method: 'GET' });
    }

    post<T, D = unknown>(endpoint: string, data: D): Promise<T> {
        return this.request<T>(endpoint, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        });
    }

    patch<T, D = unknown>(endpoint: string, data: D): Promise<T> {
        return this.request<T>(endpoint, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        });
    }

    delete<T>(endpoint: string): Promise<T> {
        return this.request<T>(endpoint, { method: 'DELETE' });
    }
}

const baseUrl =
    typeof window === 'undefined'
        ? ENV.BASE_URL || 'http://localhost:3000/api'
        : ''
const api = new FetchService(baseUrl);
export { api };

