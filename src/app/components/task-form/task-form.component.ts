import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Task } from 'src/app/models/task';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.scss']
})
export class TaskFormComponent implements OnInit {

  // @ViewChild('attachment') attachment: ElementRef = ElementRef;
  newTask: Task = new Task();
  today: Date = new Date();
  srNo: number = 0;
  base64textString: string [] = [];
  constructor(
    private dialgoRef: MatDialogRef<TaskFormComponent>
  ) { }

  ngOnInit(): void {
    if(!this.newTask.srNo){
      this.newTask.srNo = this.srNo;
    }
  }

  cancel(){
    this.dialgoRef.close();
  }
  
  changeImage(event:any){
console.log('event',event);
    let reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);
    // reader.onload = function (){
    //   btoa(reader.result);
    // }
    reader.onload = this._handleReaderLoaded.bind(this);
    reader.readAsBinaryString(event.target.files[0]);
  }

  _handleReaderLoaded(readerEvt: any){
    var binaryString = readerEvt.target.result;
    this.base64textString.push(btoa(binaryString));
    console.log(btoa(binaryString)); 
  }
  save(){
    this.dialgoRef.close(this.newTask);
  }


}
