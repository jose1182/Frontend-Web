import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RegistroService {


    constructor(){}

    public getRegisteredUser(form: any):void {
        console.log('Usuario registrado con éxito.');
        console.log(form.value);
    }
}
