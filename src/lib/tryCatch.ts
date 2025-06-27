export default async function tryCatch<T>(
    fn: () => Promise<T>,
): Promise<{ data: T; error: null } | { data: null; error: string }> {
    try {
        return {
            data: await fn(),
            error: null,
        }
    } catch (error) {
        return {
            data: null,
            error: error instanceof Error ? error.message : 'Unknown error',
        };
    }
}