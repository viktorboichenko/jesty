import {Component, Input, OnInit, OnDestroy, output, inject, input} from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameService } from '../../services/game.service';
import {interval, Subscription, switchMap, filter, tap, catchError, of} from 'rxjs';

@Component({
  selector: 'app-game-lobby',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="text-center animate-pulse">
      <h2 class="text-4xl font-bold mb-4">You're in!</h2>
      <p class="text-xl text-slate-400 mb-8">Waiting for host to start...</p>

      <div class="inline-block bg-slate-900 px-8 py-6 rounded-2xl border border-slate-800 shadow-xl">
        <p class="text-xs text-slate-500 uppercase font-bold mb-2 tracking-widest">Playing as</p>
        <p class="text-3xl font-black text-blue-400">{{ username() }}</p>
      </div>

      <p class="text-xs text-slate-600 mt-8">Polling game {{ pin() }}...</p>
    </div>
  `
})
export class GameLobbyComponent implements OnInit, OnDestroy {
  private gameService = inject(GameService);
  private pollingSub?: Subscription;

  username = input.required<string>();
  pin = input.required<string>();
  questionAsked = output<any>();

  ngOnInit() {
    const POLLING_INTERVAL_MS = 2000;

    this.pollingSub = interval(POLLING_INTERVAL_MS)
      .pipe(
        tap(iteration => console.log(`[${iteration}] Polling backend...`)),

        switchMap(() =>
          // 1. INNER PIPE: Wraps the dangerous API call
          this.gameService.checkRoom(this.pin()).pipe(

            // 2. CATCH ERROR HERE: Prevents the error from bubbling up to the interval
            catchError(err => {
              console.error("Polling failed (server might be down):", err);
              // Return "null" or a safe empty object so the stream keeps flowing
              return of(null);
            })
          )
        ),
        // 3. Filter out the nulls we returned from catchError
        filter(gameState => gameState !== null && gameState.step === 'QUESTION')
      )
      .subscribe({
        next: (gameState) => {
          console.log("Question asked!", gameState);
          this.questionAsked.emit(gameState);
        },
        // This error block will NEVER run now, which is what we want!
        error: (err) => console.error("CRITICAL: Polling died completely", err)
      });
  }

  ngOnDestroy() {
    // Stop polling when component is destroyed (e.g. view switches)
    this.pollingSub?.unsubscribe();
  }
}
