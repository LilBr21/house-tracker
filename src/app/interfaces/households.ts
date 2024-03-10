import { ITask } from "./task";

export interface IHousehold {
    created_at: Date;
    id: string;
    members: string[];
    name: string;
    tasks: ITask[] | null;
}