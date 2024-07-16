import { Component, EventEmitter, inject, Input, NgModule, OnInit, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { StarWarsServiceService } from '../services/sw/star-wars-service.service';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-games',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './games.component.html',
  styleUrl: './games.component.css'
})
export class GamesComponent{
  @Input() username = '';
  @Output() addFavoriteEvent = new EventEmitter<string>();
  housingService = inject(StarWarsServiceService);
  applyForm = new FormGroup({
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', [Validators.required]),// Asegúrate de que el nombre del control sea correcto.
    email: new FormControl('', [Validators.email, Validators.required]),
    options: new FormControl([],[Validators.required])
  });

  games = [
    {
      id: 1,
      name: 'GameOfThrones'
    },
    {
      id: 2,
      name: 'Untracked 4'
    }
  ];

  submitApplication() {
    this.housingService.submitApplication(
      this.applyForm.value.firstName ?? '',
      this.applyForm.value.lastName ?? '',
      this.applyForm.value.email ?? '',
      this.applyForm.value.options ?? [],
    );
  }
  customValidator(): import("@angular/forms").ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const isValid = this.applyForm?.value?.lastName?.charAt(0).toLowerCase() == 'a';
      return isValid ? null : { customError: 'El campo no es válido' };
    };
  }
  fav(name: string) {
    console.log("FAV:  ", name)
    this.addFavoriteEvent.emit(name);
  }
}


