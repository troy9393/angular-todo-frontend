import { Component, OnInit } from '@angular/core';
import { Task } from '../models/task';
import { TaskService } from '../services/task.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.css'
})
export class TaskListComponent implements OnInit {
  
  tasks: Task[]=[];
  newTaskTitle: string = '';

  constructor(private taskService: TaskService){}

  ngOnInit(): void {
    this.loadTasks();
  }

  loadTasks(): void {
    this.taskService.getTasks().subscribe({
      next: (data) => this.tasks = data,
      error: (err) => console.error('Error loading tasks', err)
    });
  }

  onAddTask() {
    if(!this.newTaskTitle.trim()) return;

    const newTask: Task = {
      title: this.newTaskTitle,
      completed: false
    };

    this.taskService.addTask(newTask).subscribe((createdTask) => {
      this.tasks.push(createdTask);
      this.newTaskTitle = '';
    })
  }

  onDeleteTask(id: string) {
    this.taskService.deleteTask(id).subscribe(() => {
      this.tasks = this.tasks.filter(task => task.id !== id);
    })
  }
}
