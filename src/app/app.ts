import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AppInit } from './core/services/app-init';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  private readonly appInit = inject(AppInit);
  protected readonly isInitialized = this.appInit.isInitialized;
}
