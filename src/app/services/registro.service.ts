import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RegistroService {

  private provincesList: Array<string> = ['Álava','Albacete','Alicante','Almería','Asturias','Ávila','Badajoz','Barcelona','Burgos','Cáceres',
    'Cádiz','Cantabria','Castellón','Ciudad Real','Córdoba','La Coruña','Cuenca','Gerona','Granada','Guadalajara',
    'Guipúzcoa','Huelva','Huesca','Islas Baleares','Jaén','León','Lérida','Lugo','Madrid','Málaga','Murcia','Navarra',
    'Orense','Palencia','Las Palmas','Pontevedra','La Rioja','Salamanca','Segovia','Sevilla','Soria','Tarragona',
    'Santa Cruz de Tenerife','Teruel','Toledo','Valencia','Valladolid','Vizcaya','Zamora','Zaragoza']

    constructor(){}

    public getProvinces(): Array<string> {
        return this.provincesList;
    }

    public getRegisteredUser(form: any):void {
        console.log('Usuario registrado con éxito.');
        console.log(form.value);
    }
}
