export class Task {
    srNo:number=0;
    title: string  = '';
    assignedDate:Date = new Date();
    dueDate: Date = new Date();
    status: string = '';
    attachment: any;
    id?: number = 0;
}