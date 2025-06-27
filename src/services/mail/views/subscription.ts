import { User } from "@/types/user.model";
import { DynamicMail } from "./builder";

export const SubscriptionMail = ({ email, topics, experience, stacks }: User) => {
  const topicList = topics.map(topic => `<li style="margin-bottom: 6px;">✅ ${topic}</li>`).join('');
  const stackList = stacks.map(stack => `<li style="margin-bottom: 6px;">✅ ${stack}</li>`).join('');
  const experienceText = experience ? `<p style="margin-bottom: 16px;">You have selected: <strong>${experience}</strong> as experience.</p>` : '';
  return DynamicMail({
    title: 'New Job Subscription',
    subtitle: `You've subscribed with ${email}`,
    email,
    body: `
  <p style="margin-bottom: 16px;">
    👋 Hi there!
  </p>
  <p style="margin-bottom: 16px;">
    Thanks for subscribing to <strong>Job Mailer</strong>. We're excited to have you on board!
  </p>
  <p style="margin-bottom: 16px;">
    You’ll now receive job alerts based on the topics you've chosen:
  </p>
  <ul style="padding-left: 20px; margin-bottom: 24px;">
    ${topicList}
  </ul>
  <p style="margin-bottom: 16px;">
      You also selected the following stacks:
  </p>
  <ul style="padding-left: 20px; margin-bottom: 24px;">
    ${stackList}
  </ul>
  ${experienceText}
  <p style="margin-bottom: 0;">
    Stay tuned for your first alert — we’ll be in touch soon!
  </p>
`,
  });
};


export const UnSubscriptionMail = ({ email }: User) => {
  return DynamicMail({
    title: 'Unsubscribed from Job Subscription',
    subtitle: `You've unsubscribed from ${email}`,
    email,
    body: `
  <p style="margin-bottom: 16px;">
    👋 Hi there!
  </p>
  <p style="margin-bottom: 16px;">
    We're sorry to see you go. You have successfully unsubscribed from <strong>Job Mailer</strong>.
  </p>
  <p style="margin-bottom: 0;">
    If you change your mind, you can always subscribe again!
  </p>
`,
  });
};



