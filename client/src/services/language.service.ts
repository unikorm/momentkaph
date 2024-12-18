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
        const pathSegments = this.location.path().split('/')
        // console.log(pathSegments)
        return pathSegments[1] || this.defaultLanguage
    }

    private languageSignal = signal<string>(this.getPathLanguage());

    currentLang = computed(() => {
        const lang = this.languageSignal()
        // console.log(lang)
        return this.supportedLanguages.includes(lang) ? lang : this.defaultLanguage
    })

    switchLanguage(newLang: string) {
        if (!this.supportedLanguages.includes(newLang) || this.currentLang() === newLang) return

        const currentPath = this.location.path()
        const currentLang = this.currentLang()
        const newUrl = currentPath.replace(`/${currentLang}`, `/${newLang}`)
        // console.log(newUrl)

        window.location.href = newUrl
    }
}