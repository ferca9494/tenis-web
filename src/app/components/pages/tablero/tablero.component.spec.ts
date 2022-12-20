import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TableroComponent } from './tablero.component';
import { Router, ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { Tablero } from 'src/app/models/tablero';
import { TableroService } from 'src/app/services/tablero.service';
import { PartidoService } from 'src/app/services/partido.service';

class TableroServiceSpy {
  getTablero = jasmine.createSpy('getTablero').and.callFake(
    () => of({ jugadorLocal: { nombre: 'Juan' }, jugadorVisitante: { nombre: 'Pepe' } } as Tablero));
}

class PartidoServiceSpy {
}

class RouterSpy {
  navigate = jasmine.createSpy('navigate');
}

describe('TableroComponent', () => {
  let component: TableroComponent;
  let fixture: ComponentFixture<TableroComponent>;

  const activatedRoute: any  = {
    params: of({ id: '1' })
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TableroComponent ]
    })
    .overrideComponent(TableroComponent, {
      set: {
        providers: [
          { provide: TableroService, useClass: TableroServiceSpy },
          { provide: PartidoService, useClass: PartidoServiceSpy },
          { provide: Router, useClass: RouterSpy },
          { provide: ActivatedRoute, useValue: activatedRoute },
        ]
      }
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
