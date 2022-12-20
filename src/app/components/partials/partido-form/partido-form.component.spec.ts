import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { PartidoFormComponent } from './partido-form.component';
import { FormsModule } from '@angular/forms';
import { JugadorService } from 'src/app/services/jugador.service';
import { of } from 'rxjs';
import { Partido } from 'src/app/models/partido';

class JugadorServiceSpy {
  listJugadores = jasmine.createSpy('listJugadores').and.callFake(() => of([]));
}

describe('PartidoFormComponent', () => {
  let component: PartidoFormComponent;
  let fixture: ComponentFixture<PartidoFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PartidoFormComponent ],
      imports: [ FormsModule ]
    })
    .overrideComponent(PartidoFormComponent, {
      set: {
        providers: [
          { provide: JugadorService, useClass: JugadorServiceSpy}
        ]
      }
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PartidoFormComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    component.model = {
      fechaComienzo: new Date(),
      jugadorLocal: { id: 2 },
      jugadorVisitante: { id: 3}
    } as Partido;

    fixture.detectChanges();

    expect(component).toBeTruthy();
  });
});
