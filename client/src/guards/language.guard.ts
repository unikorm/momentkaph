import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
    providedIn: 'root',
})
export class LanguageGuard implements CanActivate {
    constructor(private router: Router) { }

    canActivate(): boolean {
        const url = this.router.url;
        const validLanguages = ['sk', 'en'];
        const langSegment = url.split('/')[1];

        if (!validLanguages.includes(langSegment)) {
            this.router.navigate(['/sk']);
            return false;
        }
        return true;
    }
}
