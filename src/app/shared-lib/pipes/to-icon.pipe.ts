import { Pipe, PipeTransform } from '@angular/core';
import { Choice } from '../../firebase/models/choice';

@Pipe({
  name: 'toIcon'
})
export class ToIconPipe implements PipeTransform {

  transform(value: Choice | null | undefined): string {
    switch (value) {
      case Choice.Rock:
        return 'fa-hand-rock-o';
      case Choice.Scissors:
        return 'fa-hand-scissors-o';
      case Choice.Paper:
        return 'fa-hand-paper-o';
      default:
        return '';
    }
  }
}
