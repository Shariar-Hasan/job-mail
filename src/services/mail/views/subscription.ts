import { DynamicMail } from "./builder";

export const SubscriptionMail = ({ email, topics }: { email: string; topics: string[] }) => {
    return DynamicMail({
        title: 'New Job Subscription',
        subtitle: `You've subscribed with ${email}`,
        body: `
      <p>Thank you for subscribing to job alerts!</p>
      <p>You will receive notifications for the following topics:</p>
      <ul>
        ${topics.map(topic => `<li>${topic}</li>`).join('')}
      </ul>
    `,
    });
};
