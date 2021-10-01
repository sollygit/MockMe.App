import { Injectable } from '@angular/core';
import { ReplaySubject, Observable } from 'rxjs';
import { ConfigurationService } from './configuration.service';

export type GameState = 'usersRequired' | 'selectWinningColor' | 'playingGame' | 'gameEnded';

export interface StateDetails {
  state: GameState;
  title: string;
  message: () => string;
}

@Injectable()
export class GameService {
  private winningColor: string = '';
  private activePlayer: string = '';
  private _gameState = new ReplaySubject<GameState>();
  $gameState: Observable<GameState> = this._gameState.asObservable();
  stateDetails = new Map<GameState, StateDetails>();

  constructor(private configurations: ConfigurationService) {
    this.stateDetails.set('usersRequired', {
      state: 'usersRequired',
      title: 'Users Required',
      message: () => 'Add at least two players to begin...'
    });
    this.stateDetails.set('selectWinningColor', {
      state: 'selectWinningColor',
      title: 'Select Winning Color',
      message: () => 'Click "Random Selection" or pick a winning color.'
    });
    this.stateDetails.set('playingGame', {
      state: 'playingGame',
      title: 'Game Active',
      message: () => `"${this.activePlayer}" please choose your color.`
    });
    this.stateDetails.set('gameEnded', {
      state: 'gameEnded',
      title: 'Game Over',
      message: () => `Congratulations... "${this.activePlayer}" has won the game!`
    });
  }

  isWinningColor(color: string) {
    return this.winningColor === color;
  }

  setWinningColor(color: string) {
    this.winningColor = color;
    this.changeState('playingGame');
  }

  setRandomWinningColor() {
    const colors = [
      'black', 'white',
      'red', 'blue', 'yellow',
      'orange', 'green', 'purple',
      'teal', 'pink', 'brown', 'gray'
    ];
    this.setWinningColor(
      colors[Math.floor(Math.random() * colors.length)]);
  }

  changeState(state: GameState) {
    this._gameState.next(state);
    const details = this.stateDetails.get(state);
    if (state == 'gameEnded') {
      this.configurations.speak(details?.message()!);
    }
  }

  setActivePlayer(player: string) {
    this.activePlayer = player;
  }

  reset() {
    this.changeState('selectWinningColor');
  }

}
