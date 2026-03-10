import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrudUsuarios } from './crud-usuarios';

describe('CrudUsuarios', () => {
  let component: CrudUsuarios;
  let fixture: ComponentFixture<CrudUsuarios>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CrudUsuarios]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrudUsuarios);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
