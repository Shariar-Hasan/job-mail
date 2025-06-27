import fs from 'fs/promises';
import path from 'path';

class JsonORM<T> {
    private filePath: string;

    constructor(modelName: 'user' | 'topics' | 'experience' | 'stacks') {
        this.filePath = path.join(process.cwd(), 'src', 'data', `${modelName}.json`);
    }

    async find(): Promise<T[]> {
        const data = await fs.readFile(this.filePath, 'utf8');
        return JSON.parse(data);
    }

    async findOne(predicate: (item: T) => boolean): Promise<T | undefined> {
        const items = await this.find();
        return items.find(predicate);
    }

    async create(item: T): Promise<T> {
        const items = await this.find();
        items.push(item);
        await fs.writeFile(this.filePath, JSON.stringify(items, null, 2));
        return item;
    }

    async update(predicate: (item: T) => boolean, updater: (item: T) => T): Promise<boolean> {
        const items = await this.find();
        const idx = items.findIndex(predicate);
        if (idx === -1) return false;
        items[idx] = updater(items[idx]);
        await fs.writeFile(this.filePath, JSON.stringify(items, null, 2));
        return true;
    }

    async delete(predicate: (item: T) => boolean): Promise<boolean> {
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
