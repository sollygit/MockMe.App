import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable()
export class ConfigurationService {
  public appVersion = environment.appVersion;
  public restUrl = environment.restUrl;
  public starwarsUrl = environment.starwarsUrl;
  public cinemaWorld = 'CinemaWorld';
  public filmWorld = 'FilmWorld';
  readonly colors: string[] = ['maroon', 'red', 'orange', 'olive', 'green', 'purple', 'fuchsia', 'lime', 'teal', 'aqua', 'blue', 'navy', 'black', 'gray'];

  get randomColor() {
    return this.colors[Math.round(Math.random() * (this.colors.length - 1))];
  }

  get states() {
    return this.stateList;
  }
  get dateFormat() {
    return this._dateFormat;
  }
  get directions() {
    return this._directions;
  }

  private stateList = [
    { value: 0, display: 'NT' },
    { value: 1, display: 'ACT' },
    { value: 2, display: 'NSW' },
    { value: 3, display: 'VIC' },
    { value: 4, display: 'QLD' },
    { value: 5, display: 'SA' },
    { value: 6, display: 'WA' },
    { value: 7, display: 'TAS' }
  ];

  private _dateFormat = 'dd-MM-yyyy';

  private _directions = [
    { value: 1, display: "UP" },
    { value: 2, display: "DOWN" }
  ];

  speak(message: string) {
    const utterance = new SpeechSynthesisUtterance(message);
    const voices = window.speechSynthesis.getVoices();
    utterance.voice = voices.find(v => v.name === 'Google US English') || voices[0];
    utterance.lang = 'en-US';
    utterance.volume = 1;
    utterance.rate = 1;

    speechSynthesis.speak(utterance);
  }

  humanFileSize(bytes: number): string {
    if (Math.abs(bytes) < 1024) {
      return bytes + ' B';
    }
    const units = ['kB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    let u = -1;
    do {
      bytes /= 1024;
      u++;
    } while (Math.abs(bytes) >= 1024 && u < units.length - 1);
    return `${bytes.toFixed(1)} ${units[u]}`;
  }

}
