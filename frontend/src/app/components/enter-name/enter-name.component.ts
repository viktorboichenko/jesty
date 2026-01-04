import { Component, inject, input, output, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { GameService } from '../../services/game.service';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-enter-name',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="w-full max-w-sm bg-slate-900 p-8 rounded-2xl shadow-2xl border border-slate-800 animate-fade-in">
      <h2 class="text-2xl font-bold text-center mb-6">Who are you?</h2>
      <div class="flex flex-col gap-5">
        <div>
          <label class="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 block">Nickname</label>
          <input
            type="text"
            [(ngModel)]="username"
            (keyup.enter)="onSubmit()"
            [disabled]="isLoading()"
            placeholder="CoolPlayer"
            class="w-full bg-slate-950 border-2 border-slate-800 text-white text-2xl font-bold text-center py-4 rounded-xl focus:outline-none focus:border-green-500 transition-colors"
          />
        </div>
        <button
            (click)="onSubmit()"
            [disabled]="isLoading()"
            class="w-full bg-green-600 hover:bg-green-500 disabled:bg-slate-700 text-white font-bold py-4 rounded-xl shadow-lg shadow-green-900/20 active:scale-95 transition-all">
           @if (isLoading()) { <span>JOINING...</span> } @else { <span>JOIN LOBBY</span> }
        </button>
        @if (errorMessage()) {
          <p class="text-red-400 text-center text-sm font-bold bg-red-900/20 p-2 rounded animate-fade-in">
            {{ errorMessage() }}
          </p>
        }
      </div>
    </div>
  `,
  styles: []
})
export class EnterNameComponent {
  private gameService = inject(GameService);

  username = '';
  isLoading = signal(false);
  errorMessage = signal('');
  gamePin = input.required<string>();
  nameEntered = output<string>();

  onSubmit() {
    if (!this.username) return;

    this.isLoading.set(true);

    this.gameService.enterRoom(this.gamePin(), this.username)
      .pipe(finalize(() => this.isLoading.set(false)))
      .subscribe({
        next: (response) => {
          console.log("Joined successfully:", response);
          this.nameEntered.emit(this.username);
        },
        error: (err) => {
          console.error("Failed to join:", err);
          if (err.status === 404) {
            this.errorMessage.set("Game PIN not found.");
          } else if (err.status === 409) {
            this.errorMessage.set("That username is already taken!");
          } else {
            this.errorMessage.set(err.error || "Connection failed.");
          }
        }
      });
  }
}
