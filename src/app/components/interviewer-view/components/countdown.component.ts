import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Title } from "@angular/platform-browser";

@Component({
  selector: 'app-countdown',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="grid grid-flow-col gap-3 text-center auto-cols-max scale-[0.6]">
      <div class="flex flex-col p-2 bg-neutral rounded-box text-neutral-content">
    <span class="countdown font-mono text-2xl flex flex-col justify-center items-center">
      <span [style]=" '--value:' + countDown().hour"></span>
    </span>
        hours
      </div>
      <div class="flex flex-col p-2 bg-neutral rounded-box text-neutral-content">
    <span class="countdown font-mono text-2xl">
      <span [style]=" '--value:' + countDown().min"></span>
    </span>
        min
      </div>
      <div class="flex flex-col p-2 bg-neutral rounded-box text-neutral-content">
    <span class="countdown font-mono text-2xl">
      <span [style]=" '--value:' + countDown().sec"></span>
    </span>
        sec
      </div>
    </div>
  `,
  styles: []
})
export class CountdownComponent implements OnInit {

  titleService = inject(Title)
  countDown = signal<CountDown>({ hour: '0', min: '0', sec: '0' });

  ngOnInit(): void {
    this.startCountdown(1, 30);
  }

  startCountdown(hours: number, minutes: number) {
    const countdownDate = new Date();
    countdownDate.setHours(countdownDate.getHours() + hours);
    countdownDate.setMinutes(countdownDate.getMinutes() + minutes);

    const countdown = setInterval(() => {
      const now = new Date().getTime();
      const distance = countdownDate.getTime() - now;

      const countdownHours = Math.max(0, Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)))
      const countdownMinutes = Math.max(0, Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)))
      let countdownSeconds = Math.max(0, Math.floor((distance % (1000 * 60)) / 1000))
      countdownSeconds = countdownSeconds < 10 ? countdownSeconds : countdownSeconds;

      const hourString = countdownHours < 10 ? '0' + countdownHours.toString() : countdownHours.toString()
      const minString = countdownMinutes < 10 ? '0' + countdownMinutes.toString() : countdownMinutes.toString()
      const secString = countdownSeconds < 10 ? '0' + countdownSeconds.toString() : countdownSeconds.toString()

      this.countDown.set({
        hour: hourString,
        min: minString,
        sec: secString,
      });

      this.titleService.setTitle(`${hourString}:${minString}:${secString}`);
      if (distance < 0) {
        clearInterval(countdown);
      }
    }, 10);
  }
}

export interface CountDown {
  hour: string;
  min: string;
  sec: string
}
