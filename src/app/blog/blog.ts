import { Post } from './../interfaces';
import { Component, OnInit } from '@angular/core';

import { Data } from '../data';
import { RouterLink, RouterLinkActive } from "@angular/router";
import { ActivatedRoute, Router } from '@angular/router';



@Component({
  selector: 'app-blog',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './blog.html',
  styleUrl: './blog.css',
})
export class Blog implements OnInit {
 allposts: Post[] = [];
selectedCategory: string ='جميع المقالات';
grid: string = 'grid'

gridtoggle(){
  if(this.grid == 'grid'){
    this.grid = ''
   
  }else{
    this.grid = 'grid'
  }

}
  constructor(private x: Data , private route: ActivatedRoute , private router: Router)  {

  this.allposts = this.x.posts
  console.log(this.allposts);

  }

ngOnInit(): void {
this.route.queryParams.subscribe(params => {
    this.selectedCategory  = params['category'] || 'جميع المقالات';
    if (this.selectedCategory ) {
        if (this.selectedCategory === 'جميع المقالات') {
            this.allposts = this.x.posts;
        } else {
            this.allposts = this.x.posts.filter(post => post.category === this.selectedCategory);
        }
     
    }
  });
  
}
filterByCategory(category: string) {
  if (category === 'جميع المقالات') {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {}
    });
  } else {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { category }
    });
  }
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


    currentPage = 1;   
  itemsPerPage = 6;  

  get paginatedPosts() {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    return this.allposts.slice(start, start + this.itemsPerPage);
  }

  get totalPages() {
    return Math.ceil(this.allposts.length / this.itemsPerPage);
  }

  get pages() {
    return Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }
  

search(event: KeyboardEvent) {
  const input = (event.target as HTMLInputElement).value.toLowerCase();
  

  if (input) {
    this.allposts = this.x.posts.filter(post =>
      post.title.toLowerCase().includes(input) ||
      post.category.toLowerCase().includes(input) || post.excerpt.toLowerCase().includes(input)
    );
  }
  

}

}
