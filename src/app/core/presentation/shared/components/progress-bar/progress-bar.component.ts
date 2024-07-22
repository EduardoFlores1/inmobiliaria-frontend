import { Component, Input, signal, SimpleChanges } from '@angular/core';

import {MatProgressBarModule, ProgressBarMode} from '@angular/material/progress-bar';

@Component({
  selector: 'app-progress-bar',
  standalone: true,
  imports: [
    MatProgressBarModule
  ],
  templateUrl: './progress-bar.component.html',
  styleUrl: './progress-bar.component.scss'
})
export class ProgressBarComponent {

  @Input({required: true}) mode: ProgressBarMode = 'indeterminate';

  modeProgress = signal<ProgressBarMode>('indeterminate');

  ngOnChanges(changes: SimpleChanges): void {
    if(changes['mode']) {
      this.modeProgress.set(this.mode);
    }
  }
}
