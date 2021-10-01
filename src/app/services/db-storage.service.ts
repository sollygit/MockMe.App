import { Injectable } from '@angular/core';
import { openDB } from 'idb';

export interface Player { name: string }
export type Players = Player[];

@Injectable()
export class DBStorageService {
  private readonly dbName = 'color-game';
  private readonly players = 'players';

  async initializeDb() {
    const players = this.players;
    const db = await openDB(this.dbName, 1, {
      upgrade(db) {
        if (!db.objectStoreNames.contains(players)) {
          db.createObjectStore(players, { keyPath: 'name' });
        }
      }
    })
    return db;
  };
 
  async initializeStore() {
    const database = await this.initializeDb();
    return database.transaction(this.players, 'readwrite').objectStore(this.players);
  }

  async getAll(): Promise<Players> {
    const store = await this.initializeStore();
    const result = await store.getAll();
    return result as Players;
  }

  async get(name: string): Promise<Player> {
    const store = await this.initializeStore();
    const result = await store.get(name);
    return result as Player;
  }

  async set(name: string) {
    const store = await this.initializeStore();
    await store.put({ name: name });
  }

  async delete(name: string) {
    const store = await this.initializeStore();
    await store.delete(name);
  }
}
