import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Task } from './models/task';
import { MatDialog} from '@angular/material/dialog'
import { TaskFormComponent } from './components/task-form/task-form.component';
import { MatSnackBar} from '@angular/material/snack-bar';
import { TaskService } from './task.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'to-do-list';
  columns:string[]  = ['srNo','title','assignedDate','dueDate','status','attachment','actions']
  toDoList: Task[]=[
  ];
  toDoDataSource: MatTableDataSource<Task> = new MatTableDataSource(this.toDoList)

  constructor(
    private dialog: MatDialog,
    private _snackBar: MatSnackBar,
    private taskService: TaskService
  ){}

  ngOnInit(): void {
    if(localStorage.getItem('todoList')){
      this.toDoList = JSON.parse(localStorage.getItem('todoList')??'');
      this.toDoDataSource =  new MatTableDataSource(this.toDoList)
      console.log('from localstorage',this.toDoList);
    } 
  }
  addTask(element?: Task){
    let taskFormDialog = this.dialog.open(TaskFormComponent,{
        disableClose:true,
    });
    let instance = taskFormDialog.componentInstance;
    if(element){
      instance.newTask = {...element};
    } else {
      instance.srNo = this.toDoList.length+1;
    }
    taskFormDialog.afterClosed().subscribe((newTask:Task) => {
      if(newTask){
        if(!element){
          this.taskService.addTask(newTask);
          this._snackBar.open('Task added successfully.','',{duration:2000});
          this.toDoList.push(newTask);
          this.toDoDataSource = new MatTableDataSource(this.toDoList);
          localStorage.setItem('todoList',JSON.stringify(this.toDoList));
        } else {
          this._snackBar.open('Task edited successfully.','',{duration:2000});
          let index  = this.toDoList.indexOf(element);
          this.toDoList[index] = newTask;
          localStorage.setItem('todoList',JSON.stringify(this.toDoList));
          this.toDoDataSource = new MatTableDataSource(this.toDoList);
        }
       
      }
     
    })

  }

  deleteTask(element: Task){
    
    let value = confirm('Are you sure you want to delete this task?').valueOf();
    console.log('value',value);
    if(value){
      let index  = this.toDoList.indexOf(element);
      this.toDoList.splice(index,1);
      localStorage.setItem('todoList',JSON.stringify(this.toDoList));
      this.toDoDataSource = new MatTableDataSource(this.toDoList);
      this._snackBar.open('Task deleted successfully.','',{duration:2000});
    }
  }

}
