import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PartidosComponent } from './partidos.component';
import { RouterModule } from '@angular/router';
import { of } from 'rxjs';
import { PartidoService } from 'src/app/services/partido.service';

class PartidoServiceSpy {
  listPartidos = jasmine.createSpy('listPartidos').and.callFake(() => of([]));
}

describe('PartidosComponent', () => {
  let component: PartidosComponent;
  let fixture: ComponentFixture<PartidosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PartidosComponent ],
      imports: [ RouterModule.forRoot([]) ]
    })
    .overrideComponent(PartidosComponent, {
      set: {
        providers: [
          { provide: PartidoService, useClass: PartidoServiceSpy}
        ]
      }
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PartidosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
