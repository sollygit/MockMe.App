import { Component, OnInit } from '@angular/core';
import { GameService } from '../../../services/game.service';
import { DBStorageService } from '../../../services/db-storage.service';

@Component({
  selector: 'players',
  templateUrl: './players.component.html',
  styleUrls: ['./players.component.scss']
})
export class PlayersComponent implements OnInit {
  players: string[] = [];
  player: string = '';

  private activePlayerIndex = 0;

  get nextPlayer() {
    if (this.activePlayerIndex >= this.players.length) {
      this.activePlayerIndex = 0;
    }

    const player = this.players[this.activePlayerIndex];
    this.activePlayerIndex += 1;
    return player;
  }

  constructor(
    private readonly gameService: GameService,
    private readonly dbStorageService: DBStorageService) {
    this.gameService.changeState('usersRequired');
  }

  async ngOnInit() {
    const players = await this.dbStorageService.getAll();
    this.players = players.map(p => p.name);
    if (this.players.length >= 2) {
      this.gameService.changeState('selectWinningColor');
    }
  }

  async addPlayer(player: string) {
    if (!player) return;

    this.player = '';
    await this.dbStorageService.set(player);
    this.players.push(player);
    if (this.players.length >= 2) {
      this.gameService.changeState('selectWinningColor');
    }
  }

  async removePlayer(player: string) {
    if (this.players.length) {
      await this.dbStorageService.delete(player)
      this.players =
        this.players.filter(p => p !== player);
    }

    if (this.players.length < 2) {
      this.gameService.changeState('usersRequired');
    }
  }
}