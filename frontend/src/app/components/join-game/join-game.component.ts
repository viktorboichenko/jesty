import { Component, output, inject, signal} from '@angular/core'; // 1. Import signal
import { FormsModule } from '@angular/forms';
import { GameService } from '../../services/game.service';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-join-game',
  standalone: true,
  imports: [FormsModule],
  template: `
    <div class="w-full max-w-sm bg-slate-900 p-8 rounded-2xl shadow-2xl border border-slate-800 animate-fade-in">
      <h2 class="text-2xl font-bold text-center mb-6">Join Game</h2>

      <div class="flex flex-col gap-5">
        <div>
          <label class="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 block">Game PIN</label>
          <input
            type="text"
            [(ngModel)]="pin"
            (keyup.enter)="onSubmit()"
            [disabled]="isLoading()"
            placeholder="0000"
            class="w-full bg-slate-950 border-2 border-slate-800 text-white text-3xl font-black text-center py-4 rounded-xl focus:outline-none focus:border-blue-600 transition-colors tracking-[0.5em] disabled:opacity-50"
          />
        </div>

        <button
          (click)="onSubmit()"
          [disabled]="isLoading()"
          class="w-full bg-purple-400 hover:bg-purple-500 disabled:bg-slate-700 text-white font-bold py-4 rounded-xl shadow-lg shadow-blue-900/20 active:scale-95 transition-all flex justify-center"
        >
          @if (isLoading()) { <span>CHECKING...</span> } @else { <span>ENTER PIN</span> }
        </button>

        @if (errorMessage()) {
          <p class="text-red-400 text-center text-sm font-bold bg-red-900/20 p-2 rounded animate-fade-in">
            {{ errorMessage() }}
          </p>
        }

      </div>
    </div>
  `
})
export class JoinGameComponent {
  pin = '';
  isLoading = signal(false);
  errorMessage = signal('');

  pinEntered = output<string>();

  private gameService = inject(GameService);

  onSubmit() {
    if (this.pin.length === 0) return;

    this.isLoading.set(true);
    this.errorMessage.set('');

    this.gameService.checkRoom(this.pin)
      .pipe(
        // 2. FINALIZE: This runs when the stream is done (Success OR Error)
        finalize(() => this.isLoading.set(false))
      )
      .subscribe({
        next: (response) => {
          console.log("Room Found:", response);
          this.pinEntered.emit(this.pin);
        },
        error: (err) => {
          console.error("API Error:", err);
          if (err.status === 404) {
            this.errorMessage.set("Game not found. Check your PIN.");
          } else {
            this.errorMessage.set("Connection failed. Please try again.");
          }
        }
      });
  }
}
