import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AppInit } from './core/services/app-init';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App implements OnInit {
  private readonly appInit = inject(AppInit);
  protected readonly isInitialized = this.appInit.isInitialized;

  ngOnInit(): void {
    const splash = document.getElementById('splash');

    splash?.addEventListener('animationend', () => {
      splash.style.display = 'none';
    });
  }
}
