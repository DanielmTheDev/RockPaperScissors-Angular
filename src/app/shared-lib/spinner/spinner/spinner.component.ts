import { Component, Input } from '@angular/core';
import { LoadingStatus } from '../models/loadingStatus';

@Component({
  selector: 'spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.scss']
})
export class SpinnerComponent {
  @Input()
  loadingStatus?: LoadingStatus;
}
