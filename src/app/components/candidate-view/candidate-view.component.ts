import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-candidate-view',
  standalone: true,
  imports: [CommonModule],
  template: `
      <div class="h-full flex flex-col justify-center items-center">
          <p>
              candidate-view works!
          </p>
      </div>
  `,
  styles: [`

  `]
})
export class CandidateViewComponent {

}
