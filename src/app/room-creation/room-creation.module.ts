import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoomCreationModalComponent } from './room-creation-modal/room-creation-modal.component';
import { MatRadioModule } from '@angular/material/radio';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { RandomNamesProvider } from './services/random-names-provider.service';
import { HttpClientModule } from '@angular/common/http';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@NgModule({
  declarations: [RoomCreationModalComponent],
  imports: [
    CommonModule,
    MatRadioModule,
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatRadioModule,
    HttpClientModule,
    MatProgressSpinnerModule
  ],
  providers: [RandomNamesProvider],
  exports: [RoomCreationModalComponent]
})
export class RoomCreationModule {}
