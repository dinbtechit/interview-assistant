import { Component, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-notes',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="mt-5 flex flex-col flex-grow w-full">
      <h1 class="text-2xl">Notes</h1>
      <div contenteditable="true" #editableDiv
           (keydown)="onKeyPressed($event)"
           class="p-5 rounded-md w-full border-[1px] border-gray-300 h-full text-xl">
      </div>
    </div>
  `,
  styles: [
  ]
})
export class NotesComponent {
  @ViewChild('editableDiv') editableDiv: ElementRef | undefined;

  async onKeyPressed(event: KeyboardEvent) {
    if (event.key === 'Escape' && !this.editableDiv) return;
    const notes = (this.editableDiv?.nativeElement as HTMLInputElement).innerText
  }
}
