import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-range-score',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="flex lg:flex-row flex-wrap gap-1 lg:gap-5 justify-center">
      <ng-container *ngFor="let rate of ratings">
        <div class="tooltip" [attr.data-tip]="rate.name">
          <input class="join-item btn btn-outline"
                 type="radio" name="options"
                 [value]="rate.percentage"
                 [attr.aria-label]="rate.percentage + '%'">
        </div>
      </ng-container>
    </div>
  `,
  styles: []
})
export class RangeScoreComponent {
  ratings: Array<Rating> = [
    { name: "No Answer/Skipped", percentage: 0 },
    { name: "Little Knowledge", percentage: 10 },
    { name: "Somewhat Knowledgeable", percentage: 25 },
    { name: "Fairly Knowledgeable", percentage: 50 },
    { name: "Good Knowledge", percentage: 80 },
    { name: "Extremely Knowledgeable", percentage: 100 }
  ]
}

export interface Rating {
  name: string;
  percentage: number
}
