import { User } from "@/types/user.model";
import JsonORM from "./template";

const user = new JsonORM<User>('user');
const topics = new JsonORM<string>('topics');
const experience = new JsonORM<string>('experience');
const stacks = new JsonORM<string>('stacks');

export { experience, stacks, topics, user };
