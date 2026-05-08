import { Post } from './../interfaces';
import { Component } from '@angular/core';
import { Data } from '../data';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-home',
  imports: [RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  selectedposts: Post[] = [];
  freshPosts: Post[] = [];


  constructor(private x: Data) {
    this.selectedposts = this.x.posts.slice(0, 3);
  this.freshPosts = this.x.posts.slice(3, 6);
  
 
  }
    convertToArabicDate(dateString: string): string {
    const arabicMonths = [
      'يناير',
      'فبراير',
      'مارس',
      'أبريل',
      'مايو',
      'يونيو',
      'يوليو',
      'أغسطس',
      'سبتمبر',
      'أكتوبر',
      'نوفمبر',
      'ديسمبر'
    ];
    const [year, month, day] = dateString.split('-');
    const monthIndex = parseInt(month) - 1;
    const monthName = arabicMonths[monthIndex];
    return `${day} ${monthName} ${year}`;
  }





 

}
