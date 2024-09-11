export type TaskList = {
    totalPages?: number;
    totalItems?: number;
    items?: Task[];
}

export type Task = {
    id: string,
    title?: string,
    completed?: boolean,
    categoryId?: string,
    startDate?: string,
    endDate?: string,
    subTasks?: SubTask[]
}

export type SubTask = {
    id?: string,
    title: string,
    completed?: boolean
}

export type Category = {
    id?: string,
    name?: string
}

export type FilterParams = {
    keyword: string;
    from: number;
    size: number;
}