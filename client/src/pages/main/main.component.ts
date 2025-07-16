import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
    selector: 'main-layout',
    imports: [RouterOutlet],
    templateUrl: './main.component.html',
    styleUrl: './main.component.scss'
})
export class MainComponent {
}
