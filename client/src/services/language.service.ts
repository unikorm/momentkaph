import { Location } from '@angular/common';
import { Injectable, signal, computed, inject } from '@angular/core';


@Injectable({
    providedIn: 'root'
})
export class LanguageService {
    private location = inject(Location);

    private supportedLanguages = ['sk', 'en'];
    private defaultLanguage = 'sk';

    getPathLanguage = (): string => {
        const baseHref = document.querySelector('base')?.getAttribute('href') || '';
        const currentLang = baseHref.replace(/^\/|\/$/g, '');

        return currentLang || this.defaultLanguage;
    }

    private languageSignal = signal<string>(this.getPathLanguage());

    currentLang = computed(() => {
        const lang = this.languageSignal()
        return this.supportedLanguages.includes(lang) ? lang : this.defaultLanguage
    })

    switchLanguage(newLang: string) {
        if (!this.supportedLanguages.includes(newLang) || this.currentLang() === newLang) return

        const currentPath = this.location.path()
        const newUrl = `/${newLang}${currentPath}`

        window.location.href = newUrl
    }
}