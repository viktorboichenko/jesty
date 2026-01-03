import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-join-game',
  standalone: true,
  imports: [CommonModule, FormsModule],
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
            placeholder="0000"
            class="w-full bg-slate-950 border-2 border-slate-800 text-white text-3xl font-black text-center py-4 rounded-xl focus:outline-none focus:border-blue-600 transition-colors tracking-[0.5em]"
          />
        </div>
        <button (click)="onSubmit()" class="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-4 rounded-xl shadow-lg shadow-blue-900/20 active:scale-95 transition-all">
          ENTER PIN
        </button>
      </div>
    </div>
  `,
  styles: []
})
export class JoinGameComponent {
  pin = '';
  @Output() pinEntered = new EventEmitter<string>();

  onSubmit() {
    console.log("Button Clicked. Pin is:", this.pin);
    if (this.pin.length > 0) this.pinEntered.emit(this.pin);
  }
}
