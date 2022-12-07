import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import constants from './constants';
import { HomeComponent } from './home/components/home.component';
import { RoomComponent } from './room/components/room.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: `${constants.routing.room}/:id`, component: RoomComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
