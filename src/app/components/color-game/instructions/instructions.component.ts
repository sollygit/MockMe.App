import { Component } from '@angular/core';
import { GameService, GameState, StateDetails } from '../../../services/game.service';

@Component({
  selector: 'instructions',
  templateUrl: './instructions.component.html',
  styleUrls: ['./instructions.component.scss']
})
export class InstructionsComponent {
  currentState: GameState = 'usersRequired';

  get message() {
    return this.details.message();
  }

  get title() {
    return this.details.title;
  }

  get isGameOver() {
    return this.currentState === 'gameEnded';
  }

  get isRandomEnabled() {
    return this.currentState === 'selectWinningColor';
  }

  private get details(): StateDetails {
    return this.gameService.stateDetails.get(this.currentState)!;
  }

  constructor(private readonly gameService: GameService) {
    this.gameService
      .$gameState
      .subscribe((state: GameState) => {
        this.currentState = state;
      });
  }

  resetGame() {
    this.gameService.reset();
  }

  randomSelection() {
    this.gameService.setRandomWinningColor();
  }
}
