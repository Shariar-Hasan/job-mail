export const getPath = (path: string): string => {
    if (path.startsWith('/')) {
        return process.cwd() + path;
    }
    return process.cwd() + `/${path}`;
}