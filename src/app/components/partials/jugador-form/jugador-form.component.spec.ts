import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { JugadorFormComponent } from './jugador-form.component';
import { FormsModule } from '@angular/forms';
import { JugadorService } from 'src/app/services/jugador.service';
import { Jugador } from 'src/app/models/jugador';

class JugadorServiceSpy {
}

describe('JugadorFormComponent', () => {
  let component: JugadorFormComponent;
  let fixture: ComponentFixture<JugadorFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JugadorFormComponent ],
      imports: [ FormsModule ]
    })
    .overrideComponent(JugadorFormComponent, {
      set: {
        providers: [
          { provide: JugadorService, useClass: JugadorServiceSpy}
        ]
      }
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JugadorFormComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    component.model = { nombre: 'Juan' } as Jugador;

    fixture.detectChanges();

    expect(component).toBeTruthy();
  });
});
