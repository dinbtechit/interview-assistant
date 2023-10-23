import { ApplicationRef, Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  darkThemeName = "night";
  lightThemeName = "lofi";

  defaultOSTheme = signal(this.darkThemeName);
  userSelectedTheme = signal(localStorage.getItem("userSelectedTheme") || "");
  switchedToDarkMode = signal(false);

  constructor(private ref: ApplicationRef) {
    // initially trigger dark mode if preference is set to dark mode on system
    const darkModeOn =
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches;

    if (darkModeOn) {
      this.defaultOSTheme.set(this.darkThemeName);
    } else {
      this.defaultOSTheme.set(this.lightThemeName);
    }

    // watch for changes of the preference
    window.matchMedia("(prefers-color-scheme: dark)").addEventListener('change', e => {
      const turnOn = e.matches;
      this.defaultOSTheme.set(turnOn ? this.darkThemeName : this.lightThemeName);
      // trigger refresh of UI
      this.ref.tick();
    });
  }

  isDarkModeSelected(): boolean {
    return this.userSelectedTheme() ? this.userSelectedTheme() == this.darkThemeName : this.defaultOSTheme() == this.darkThemeName;
  }

  setUserSelectedTheme(darkMode: boolean): void {
    const theme = darkMode ? this.darkThemeName : this.lightThemeName;
    this.userSelectedTheme.set(theme);
    localStorage.setItem("userSelectedTheme", theme);
  }
}
