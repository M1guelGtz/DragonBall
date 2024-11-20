import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PreCharacter } from '../interfaces/pre-character';
import { Character } from '../interfaces/character';

@Injectable({
  providedIn: 'root'
})
export class CharactersService {

  constructor(private _http: HttpClient) { }

  characters: Character[] = []

  getCharacters(): Observable<PreCharacter>{
    return this._http.get<PreCharacter>("https://dragonball-api.com/api/characters")
  }

}
