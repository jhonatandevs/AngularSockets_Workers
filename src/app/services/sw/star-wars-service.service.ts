import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class StarWarsServiceService {
  private readonly _http =inject(HttpClient)
  constructor() {
  }
  getPeople():Observable<any> {
    return this._http.get('https://smmmwapi.dev/api/people/')
 }
  async getAllPeople() {
    try {
      const response = await fetch('https://swapi.dev/api/people/');
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching Star Wars people:', error);
    }
  }
  submitApplication(firstName: string, lastName: string, email: string, options:any[]) {
    console.log(
      `Homes application received: firstName: ${firstName}, lastName: ${lastName}, email: ${email}, options: ${options}.`,
    );
  }
}

export interface People {
  name: string;
  height: string;
  hair_color: string
}