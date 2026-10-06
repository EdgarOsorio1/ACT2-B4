import { Component } from '@angular/core';
import { ProductoFormComponent } from './producto-form/producto-form.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ProductoFormComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {}