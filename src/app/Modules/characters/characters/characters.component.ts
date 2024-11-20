import { Component } from '@angular/core';
import { CharactersService } from '../../../Services/characters.service';
@Component({
  selector: 'app-characters',
  templateUrl: './characters.component.html',
  styleUrl: './characters.component.css'
})
export class CharactersComponent {

  constructor(public _service_characters: CharactersService){}
  user: string = ""
  handleSubmitData(){
    if(this.isValidUsername(this.user)){
      this.CargarDatos()
    }
  }
  isValidUsername(user: string) {
    return /^[a-zA-Z0-9]+$/.test(user);
  }
  CargarDatos(){
    this._service_characters.getCharacters().subscribe (
      ( characters ) => {
        characters.items.map(
          (element) =>{
            this._service_characters.characters.push(element)
          }
        )
      }
    )
  }
}
