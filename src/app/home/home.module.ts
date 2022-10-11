import { HomeComponent } from "./home.component";
import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { RoomCreationModalComponent } from "./room-creation-modal/room-creation-modal.component";
import { MatButtonModule } from "@angular/material/button";
import { MatDialogModule } from "@angular/material/dialog";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { ReactiveFormsModule } from "@angular/forms";
import { MatRadioModule } from "@angular/material/radio";


@NgModule({
  declarations: [
    HomeComponent,
    RoomCreationModalComponent
  ],
  exports: [
    HomeComponent
  ],
  imports: [
    BrowserModule,
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatRadioModule
  ]
})
export class HomeModule { }
