import { experience, stacks, topics } from '../data/provider';

export default async function getConfigs() {

    const topicsList = await topics.find();
    const experienceList = await experience.find();
    const stacksList = await stacks.find();

    return {
        experience: experienceList,
        stacks: stacksList,
        topics: topicsList
    };
}