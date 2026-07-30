import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NgIf, AsyncPipe } from '@angular/common';
import { Header } from './components/header/header';
import { LoadingService } from './services/loading';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NgIf, AsyncPipe, Header],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('student-course-portal');

  constructor(public loadingService: LoadingService) {}
}
