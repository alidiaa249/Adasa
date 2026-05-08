import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Navbar } from './navbar/navbar';
import { Footer } from "./footer/footer";
import { PostDetails } from "./post-details/post-details";


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Navbar, Footer, PostDetails],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('adasa');
}
