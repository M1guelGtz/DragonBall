import { Component, OnInit, signal, Signal } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TransformationsService } from '../../../Services/transformations.service';

@Component({
  selector: 'app-transformations',
  templateUrl: './transformations.component.html',
  styleUrls: ['./transformations.component.css']
})
export class TransformationComponent implements OnInit {
  personajes: string[]=['goku', 'vegeta', 'piccolo', 'freezer', 'zarbon', 'gohan']
  currentCharacter!: string;
  editForm: FormGroup;
  constructor(
    private router: ActivatedRoute,
    private transformationsService: TransformationsService,
    private fb: FormBuilder,
    private route: Router
  ) {
    this.editForm = this.fb.group({
      ki: ['', [Validators.required, Validators.pattern('^[0-9a-zA-Z. ]+$')]],
    });
  }
  name: string | null = null
  ngOnInit(): void {
    this.name = this.router.snapshot.paramMap.get('name')
    this.currentCharacter = this.name ?? 'goku'
    this.transformationsService.getTransformations().subscribe({
      next: (data) => {
        this.filterTransformations(data);

      },
      error: (err) => {
        console.error('Error al obtener las transformaciones:', err);
      }
    });
    
  }
  

  

  changeCharacter(character: string): void {
    this.personajes.map( (characterName, index) => {
      if(characterName == this.name ){
        console.log(this.name);
        console.log(this.personajes[index], index);
        console.log(this.personajes[index+1]);
        this.route.navigate(["transformations/" + this.personajes[index+1]])
      }
    })
    this.currentCharacter = character;
  }

  saveKi(transformation: any): void {
    transformation.ki = this.editForm.value.ki;
    console.log(`Ki actualizado para ${transformation.name}: ${transformation.ki}`);
  }


  transformations = signal<any[]>([]);

  filterTransformations(data: any[]): void {
    this.transformations.set(
      data.filter(t => t.name.toLowerCase().includes(this.name?.toLowerCase()))
    );
  }
}


