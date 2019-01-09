import { Moment } from 'moment';

export class CurrentDay {
    earned: number;
    spent: number;
    date: Moment;

    public constructor(init?:Partial<CurrentDay>) {
        Object.assign(this, init);
    }
}