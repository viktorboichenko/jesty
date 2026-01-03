import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';

// IMPORTS: Pointing to the new files you just made
import { JoinGameComponent } from './components/join-game/join-game.component';
import { EnterNameComponent } from './components/enter-name/enter-name.component';
import { GameLobbyComponent } from './components/game-lobby/game-lobby.component';
import {FormsModule} from '@angular/forms';

type GameState = 'JOIN' | 'NAME' | 'LOBBY';

@Component({
  selector: 'app-root',
  standalone: true,
  // We register the 3 new components here so HTML can use them
  imports: [CommonModule, RouterOutlet, JoinGameComponent, EnterNameComponent, GameLobbyComponent, FormsModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  currentState: GameState = 'JOIN';
  gamePin = '';
  username = '';

  // Step 1: User entered PIN
  onPinEntered(pin: string) {
    this.gamePin = pin;
    console.log("PIN:", pin);
    this.currentState = 'NAME'; // Switch screen
  }

  // Step 2: User entered Name
  onNameEntered(name: string) {
    this.username = name;
    console.log("Name:", name);
    this.currentState = 'LOBBY'; // Switch screen
  }

  onHostLogin() {
    console.log("Host login clicked");
  }
}
