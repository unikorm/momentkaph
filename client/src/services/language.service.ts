// import { Injectable, signal, computed, inject } from '@angular/core';
// import { Router } from '@angular/router';

// @Injectable({
//     providedIn: 'root'
// })
// export class LanguageService {
//     private router = inject(Router);

//     private languageSignal = signal<string>('sk');

//     currentLang = computed(() => this.languageSignal());

//     setLanguage(lang: string) {
//         if (this.isValidLanguage(lang)) {
//             this.languageSignal.set(lang);
//         }
//     }

//     switchLanguage(newLang: string) {
//         if (this.isValidLanguage(newLang)) {
//             const urlSegments = this.router.url.split('/');
//             urlSegments[1] = newLang;

//             this.router.navigate([urlSegments.join('/')])
//                 .then(
//                     () => { this.setLanguage(newLang) }
//                 )
//         }
//     }

//     isValidLanguage(lang: string): boolean {
//         return ['sk', 'en', 'ua'].includes(lang);
//     }
// }