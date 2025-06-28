export const ROUTES = {
    SUBSCRIBE: () => "/",
    UNSUBSCRIBE: ({ email }: { email: string }) => `/unsubscribe/${email}`,
    SUBSCRIPTION_SUCCESS: () => "/subscription-success",
    DASHBOARD: () => "/dashboard",




    // other
    MAILTO: (email: string) => `mailto:${email}`,
    PHONE: (phone: string) => `tel:${phone}`,
    GITHUB: (username: string) => `https://github.com/${username}`,
    LINKEDIN: (username: string) => `https://linkedin.com/in/${username}`,
}