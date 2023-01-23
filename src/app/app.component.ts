import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Roshambo!';

  get currentYear(): number {
    return (new Date()).getFullYear();
  }
}
