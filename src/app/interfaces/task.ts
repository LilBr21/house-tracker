
export interface ITask {
    assignee: string;
    due_to: Date;
    name: string;
    id: string;
    notes?: string;
    done?: boolean;
};