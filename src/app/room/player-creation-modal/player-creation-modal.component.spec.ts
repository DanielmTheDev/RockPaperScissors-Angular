import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PlayerCreationModalComponent } from './player-creation-modal.component';
import { FormBuilder } from '@angular/forms';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';

describe('PlayerCreationModalComponent', () => {
  let component: PlayerCreationModalComponent;
  let fixture: ComponentFixture<PlayerCreationModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PlayerCreationModalComponent],
      providers: [FormBuilder, { provide: MatDialogRef, useValue: {} }],
      imports: [MatDialogModule]
    })
      .compileComponents();

    fixture = TestBed.createComponent(PlayerCreationModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
