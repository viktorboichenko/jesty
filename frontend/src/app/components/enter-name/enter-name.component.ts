import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

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
            placeholder="CoolPlayer"
            class="w-full bg-slate-950 border-2 border-slate-800 text-white text-2xl font-bold text-center py-4 rounded-xl focus:outline-none focus:border-green-500 transition-colors"
          />
        </div>
        <button (click)="onSubmit()" class="w-full bg-green-600 hover:bg-green-500 text-white font-bold py-4 rounded-xl shadow-lg shadow-green-900/20 active:scale-95 transition-all">
          JOIN LOBBY
        </button>
      </div>
    </div>
  `,
  styles: []
})
export class EnterNameComponent {
  username = '';
  @Output() nameEntered = new EventEmitter<string>();

  onSubmit() {
    if (this.username.length > 0) this.nameEntered.emit(this.username);
  }
}
