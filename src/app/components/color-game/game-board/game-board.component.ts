import { Component, ViewChild } from '@angular/core';
import { GameService } from '../../../services/game.service';
import { PlayersComponent } from '../players/players.component';

@Component({
  selector: 'game-board',
  templateUrl: './game-board.component.html',
  styleUrls: ['./game-board.component.scss']
})
export class GameBoardComponent {
  @ViewChild('playerComponent') playerComponent!: PlayersComponent;

  colors = this.shuffle([
    'black', 'white',
    'red', 'blue', 'yellow',
    'orange', 'green', 'purple',
    'teal', 'pink', 'brown', 'gray'
  ]);

  positions = this.shuffle([
    'top-left', 'top-center-left', 'top-center-right', 'top-right',
    'middle-left', 'middle-center-left', 'middle-center-right', 'middle-right',
    'bottom-left', 'bottom-center-left', 'bottom-center-right', 'bottom-right'
  ]);

  constructor(private readonly gameService: GameService) {
    this.gameService
      .$gameState
      .subscribe(state => {
        if (state === 'playingGame') {
          const nextPlayer = this.playerComponent?.nextPlayer;
          this.gameService.setActivePlayer(nextPlayer);
        }
      });
   }

  shuffle(array: string[]) {
    for (let i = array.length - 1; i > 0; --i) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  getClasses(color: string): string[] {
    const index = this.colors.findIndex(c => c === color);
    return [color, this.positions[index]];
  }
}