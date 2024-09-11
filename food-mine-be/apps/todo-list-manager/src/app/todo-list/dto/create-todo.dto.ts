import { SubTask, Task } from "../interfaces/todo.interface";

export class CreateTodoDto implements Partial<Task> {
    title: string;
    categoryId: string;
    startDate: string;
    endDate: string;
    subTasks?: SubTask[];
}