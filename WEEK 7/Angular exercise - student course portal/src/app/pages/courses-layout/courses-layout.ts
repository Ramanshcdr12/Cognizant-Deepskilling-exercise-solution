import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-courses-layout',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './courses-layout.html',
  styleUrl: './courses-layout.css'
})
export class CoursesLayout {}
