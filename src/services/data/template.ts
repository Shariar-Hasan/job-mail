import fs from 'fs/promises';
import path from 'path';
type Models = 'user' | 'topics' | 'experience' | 'stacks';
class JsonORM<T> {
    private filePath: string;
    private model: Models;

    constructor(modelName: Models) {
        this.filePath = path.join(process.cwd(), 'src', 'data', `${modelName}.json`);
        this.model = modelName;
    }

    async find(): Promise<T[]> {
        console.info('Finding all db entries for ' + this.model);
        const data = await fs.readFile(this.filePath, 'utf8');
        return JSON.parse(data);
    }

    async findOne(predicate: (item: T) => boolean): Promise<T | undefined> {
        console.info('Finding one db entry for ' + this.model);
        const items = await this.find();
        return items.find(predicate);
    }

    async create(item: T): Promise<T> {
        console.info('Creating db entry for ' + this.model);
        const items = await this.find();
        items.push(item);
        await fs.writeFile(this.filePath, JSON.stringify(items, null, 2));
        return item;
    }

    async update(predicate: (item: T) => boolean, updater: (item: T) => T): Promise<boolean> {
        console.info('Updating db for ' + this.model);
        const items = await this.find();
        const idx = items.findIndex(predicate);
        if (idx === -1) return false;
        items[idx] = updater(items[idx]);
        await fs.writeFile(this.filePath, JSON.stringify(items, null, 2));
        return true;
    }

    async delete(predicate: (item: T) => boolean): Promise<boolean> {
        console.info('Deleting db entry for ' + this.model);
        const items = await this.find();
        const newItems = items.filter(item => !predicate(item));
        const deleted = newItems.length !== items.length;
        if (deleted) {
            await fs.writeFile(this.filePath, JSON.stringify(newItems, null, 2));
        }
        return deleted;
    }
}

export default JsonORM;
