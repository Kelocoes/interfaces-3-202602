import { Injectable } from '@nestjs/common';
import { Cat } from './cat.interface';

@Injectable()
export class CatService {
    private cats: Cat[] = [
        { id: 1, name: 'Tom' },
        { id: 2, name: 'Garfield' },
        { id: 3, name: 'Sylvester' },
    ];

    private nextId = 4;

    findAll(): Cat[] {
        return this.cats;
    }

    findOne(id: string): Cat | undefined {
        const numericId = Number(id);
        return this.cats.find((cat) => cat.id === numericId);
    }

    create(name: string): Cat {
        const newCat: Cat = { id: this.nextId++, name };
        this.cats.push(newCat);
        return newCat;
    }

    update(id: string, name: string): Cat | undefined {
        const numericId = Number(id);
        const cat = this.cats.find((c) => c.id === numericId);
        if (cat) {
            cat.name = name;
        }
        return cat;
    }

    remove(id: string): boolean {
        const numericId = Number(id);
        const index = this.cats.findIndex((c) => c.id === numericId);
        if (index >= 0) {
            this.cats.splice(index, 1);
            return true;
        }
        return false;
    }
}
