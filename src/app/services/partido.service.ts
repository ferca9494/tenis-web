import { Injectable } from '@angular/core';
import { Partido } from '../models/partido';
import { Jugador } from '../models/jugador';
import { Estados } from '../models/estados';
import { Respuesta } from '../models/respuesta';
import { Restangular } from 'ngx-restangular';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PartidoService {

  constructor(
    private restangular: Restangular) {
  }

  listPartidos(): Observable<Partido[]> {
    return this.restangular.all(`/partidos`).getList();
  }

  addPartido(partido: Partido): Observable<Partido> {
    return Observable.create(observer => {
      this.validatePartido(partido).subscribe(
        (resp) => this.restangular.all('/partidos').post(partido).subscribe(observer),
        (error) => observer.error(error));
    });
  }

  editPartido(partido: Partido): Observable<Partido> {
    return Observable.create(observer => {
      this.validatePartido(partido).subscribe(
        (resp) => this.restangular.all(`/partidos/${partido.id}`).customPUT(partido).subscribe(observer),
        (error) => observer.error(error));
    });
  }

  removePartido(id: number): Observable<any> {
    return this.restangular.all(`/partidos/${id}`).remove();
  }

  getPartido(id: number): Observable<any> {
    return this.restangular.all(`/partidos`).get(id);
  }

  iniciarPartido(id: number): Observable<any> {
    return this.restangular.all(`/partidos/${id}/actions/init`).customPUT();
  }

  private validatePartido(partido: Partido): Observable<Respuesta> {
    return Observable.create(observer => {

      // tslint:disable-next-line:triple-equals
      if (partido.jugadorLocal.id == partido.jugadorVisitante.id) {
        return observer.error(new Respuesta(true, 'Los jugadores local y visitante no pueden ser iguales'));
      }

      const date = new Date(partido.fechaComienzo);

      if (!(date instanceof Date) || isNaN(date.getTime())) {
        return observer.error(new Respuesta(true, 'El formato de la fecha/hora de inicio no es válido'));
      }

      if (date < new Date(Date.now())) {
        return observer.error(new Respuesta(true, 'La fecha/hora de inicio debe ser mayor o igual a la fecha/hora actual'));
      }

      return observer.next(new Respuesta(false));
    });
  }
}
