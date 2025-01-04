import { Injectable } from '@angular/core';
import { Task } from './models/task';

@Injectable({
  providedIn: 'root'
})
export class TaskService {


  tasks: Task[] = [];

  constructor() {
    // Load tasks from localStorage if available
    const savedTasks = localStorage.getItem('tasks');
    if (savedTasks) {
      try {
        this.tasks = JSON.parse(savedTasks);
      } catch (error) {
        console.error('Error parsing tasks from localStorage', error);
      }
    }
  }

  getTasks() {
    return [...this.tasks];
  }

  addTask(newTask: Task) {
    const test = { id: this.generateUniqueId(), ...newTask };
    this.tasks.push(test);
    this.saveTasks();
  }

  deleteTask(id: number) {
    this.tasks = this.tasks.filter(task => task.id !== id);
    this.saveTasks();
  }

  toggleTaskCompletion(id: number) {
    const index = this.tasks.findIndex(task => task.id === id);
    if (index !== -1) {
      this.tasks[index].status = "completed";
      this.saveTasks();
    }
  }

  private saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(this.tasks));
  }

  private generateUniqueId() {
    return Math.floor(Math.random() * Date.now());
  }
}
