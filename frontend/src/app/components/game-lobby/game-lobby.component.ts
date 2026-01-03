import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-game-lobby',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="text-center animate-pulse">
      <h2 class="text-4xl font-bold mb-4">You're in!</h2>
      <p class="text-xl text-slate-400 mb-8">Please wait until the game starts...</p>
      <div class="inline-block bg-slate-900 px-8 py-6 rounded-2xl border border-slate-800 shadow-xl">
        <p class="text-xs text-slate-500 uppercase font-bold mb-2 tracking-widest">Playing as</p>
        <p class="text-3xl font-black text-blue-400">{{ username }}</p>
      </div>
    </div>
  `,
  styles: []
})
export class GameLobbyComponent {
  @Input() username: string = '';
}
