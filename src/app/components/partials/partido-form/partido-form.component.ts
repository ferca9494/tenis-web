import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { Jugador } from 'src/app/models/jugador';
import { Partido } from 'src/app/models/partido';
import { JugadorService } from 'src/app/services/jugador.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-partido-form',
  templateUrl: './partido-form.component.html',
  styleUrls: ['./partido-form.component.css']
})
export class PartidoFormComponent implements OnInit {

  @Input() model: Partido;
  @Input() isEdit: boolean;
  @Input() mensajeError: string;

  @Output() onSubmit = new EventEmitter();
  @Output() onCancel = new EventEmitter();

  title: string;
  btnSubmitText: string;
  jugadores: Jugador[];

  constructor(
    private jugadorService: JugadorService) {
  }

  ngOnInit(): void {
    this.title = !this.isEdit ? 'Agregar Partido' : 'Editar Partido';
    this.btnSubmitText = !this.isEdit ? 'Agregar' : 'Editar';
    this.loadJugadores();
  }

  loadJugadores() {
    this.jugadorService.listJugadores().subscribe((jugadores: Jugador[]) =>
      this.jugadores = jugadores);
  }

  submitForm() {
    this.onSubmit.emit();
  }

  cancelar() {
    this.onCancel.emit();
  }

  isValid(control: any): boolean {
    return control.valid || control.pristine;
  }

}
