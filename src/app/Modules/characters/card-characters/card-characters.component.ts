import { Component, Input } from '@angular/core';
import { Character } from '../../../interfaces/character';

@Component({
  selector: 'app-card-characters',
  templateUrl: './card-characters.component.html',
  styleUrl: './card-characters.component.css'
})
export class CardCharactersComponent {


  @Input() Character = {
    id: 0,
    name: "",
    ki:"  ",
    maxKi: "",
    race: "",
    gender: "",
    description: "",
    image: "",
    affiliation: ""
  }
}
