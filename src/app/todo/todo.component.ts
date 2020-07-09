import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../services/firebase.service';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
export class TodoComponent implements OnInit {
  task;
  tasks = []
  loading: boolean;
  constructor(private firebaseService: FirebaseService) { }

  ngOnInit(): void {
    this.getTasks()
  }

  getTasks() {
    this.loading = true;
    this.firebaseService.getTasks().subscribe(data => {
      this.tasks = data.map(e => {
        return {
          id: e.payload.doc.id,
          name: e.payload.doc.data()['name'],
          done: e.payload.doc.data()['done']
        }
      })
      this.loading = false;
    })
  }

  completeTask(task) {
    task.done = true;
    this.firebaseService.updateTask(task.id, task)
  }

  cancelTask(task) {
    task.done = false;
    this.firebaseService.updateTask(task.id, task)
  }

  addTask() {
    const task = {name: this.task, done: false}
    this.firebaseService.createTask(task);
    this.task = ''
    console.log(this.tasks)
  }

}
