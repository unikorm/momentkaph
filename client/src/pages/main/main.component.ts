import { Component } from "@angular/core";
import { MainMenuComponent } from "../../components/main-menu/main-menu.component";
import { RouterOutlet } from "@angular/router";

@Component({
  standalone: true,
  selector: "main-layout",
  imports: [MainMenuComponent, RouterOutlet],
  templateUrl: "./main.component.html",
  styleUrl: "./main.component.scss",
})
export class MainComponent {}