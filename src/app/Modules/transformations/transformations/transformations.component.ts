import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TransformationsService } from '../../../Services/transformations.service';

@Component({
  selector: 'app-transformations',
  templateUrl: './transformations.component.html',
  styleUrls: ['./transformations.component.css']
})
export class TransformationComponent implements OnInit {
  transformations: { [key: string]: any[] } = {
    goku: [],
    vegeta: [],
    cell: [],
    gohan: [],
    freezer: []
  };

  currentCharacter: string = 'goku';

  editForm: FormGroup;
  
  constructor(
    private transformationsService: TransformationsService,
    private fb: FormBuilder
  ) {
    this.editForm = this.fb.group({
      ki: ['', [Validators.required, Validators.pattern('^[0-9a-zA-Z. ]+$')]],
    });
  }

  ngOnInit(): void {
    this.transformationsService.getTransformations().subscribe({
      next: (data) => {
        this.filterTransformations(data);
      },
      error: (err) => {
        console.error('Error al obtener las transformaciones:', err);
      }
    });
  }

  private filterTransformations(data: any[]): void {
    this.transformations['goku'] = data.filter(t => t.name.toLowerCase().includes('goku'));
    this.transformations['vegeta'] = data.filter(t => t.name.toLowerCase().includes('vegeta'));
    this.transformations['cell'] = data.filter(t => [19, 20, 21].includes(t.id));
    this.transformations['gohan'] = data.filter(t => t.name.toLowerCase().includes('gohan'));
    this.transformations['freezer'] = data.filter(t => t.name.toLowerCase().includes('freezer'));
  }

  public getTransformations(character: string): any[] {
    return this.transformations[character];
  }

  changeCharacter(character: string): void {
    this.currentCharacter = character;
  }

  saveKi(transformation: any): void {
    transformation.ki = this.editForm.value.ki;
    console.log(`Ki actualizado para ${transformation.name}: ${transformation.ki}`);
  }
}
