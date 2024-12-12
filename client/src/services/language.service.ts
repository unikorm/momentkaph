import { Injectable, signal, computed } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class LanguageService {
    private languageSignal = signal<string>('sk');

    currentLang = computed(() => this.languageSignal());

    setLanguage(lang: string) {
        if (this.isValidLanguage(lang)) {
            this.languageSignal.set(lang);
        }
    }

    isValidLanguage(lang: string): boolean {
        return ['sk', 'en', 'ua'].includes(lang);
    }
}