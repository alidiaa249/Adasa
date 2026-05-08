import { Post } from './../interfaces';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';
import { Data } from '../data';

@Component({
  selector: 'app-post-details',
  imports: [RouterLink],
  templateUrl: './post-details.html',
  styleUrl: './post-details.css',
})
export class PostDetails implements OnInit, OnDestroy {
  selectedposts!: Post;
  dateposts!: { introduction: string; sections: any[] };
  suggesteddata!: Post[];

  private paramSubscription?: Subscription;

  constructor(
    private route: ActivatedRoute,
    private data: Data,
  ) {}

  ngOnInit() {
    this.loadPostFromRoute();
    this.paramSubscription = this.route.paramMap.subscribe(() => {
      this.loadPostFromRoute();
    });
  }

  ngOnDestroy() {
    this.paramSubscription?.unsubscribe();
  }

  private loadPostFromRoute() {
    const id = this.route.snapshot.paramMap.get('id');
    for (let i = 0; i < this.data.posts.length; i++) {
      if (this.data.posts[i].slug === id) {
        this.selectedposts = this.data.posts[i];
        break;
      }
    }
    if (this.selectedposts) {
      this.dateposts = this.parseArticleContent(this.selectedposts.content);
      this.suggesteddata = this.suggested(this.data.posts);
    
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
      'ديسمبر',
    ];
    const [year, month, day] = dateString.split('-');
    const monthIndex = parseInt(month) - 1;
    const monthName = arabicMonths[monthIndex];
    return `${day} ${monthName} ${year}`;
  }

  parseArticleContent(content: string) {
    const lines = content.split('\n').filter((line) => line.trim() !== '');

    const sections: any[] = [];
    let introduction = '';
    let currentTitle = '';
    let currentBody: string[] = [];

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim();

      if (line.startsWith('##')) {
        if (currentTitle && currentBody.length > 0) {
          sections.push({
            title: currentTitle,
            body: currentBody.join(' ').trim(),
          });
        }

        currentTitle = line.replace(/^##\s*/, '').trim();
        currentBody = [];
      } else if (sections.length === 0 && !currentTitle) {
        introduction += line + ' ';
      } else if (currentTitle) {
        currentBody.push(line);
      }
    }

    if (currentTitle && currentBody.length > 0) {
      sections.push({
        title: currentTitle,
        body: currentBody.join(' ').trim(),
      });
    }

    return {
      introduction: introduction.trim(),
      sections,
    };
  }
  suggested(data: Post[]): Post[] {
    const final: Post[] = [];
    for (let i = 0; i < data.length; i++) {
      if (data[i].category === this.selectedposts.category && data[i].id !== this.selectedposts.id) {
        final.push(data[i]);
      }
    }
    return this.shuffle(final).slice(0, 3);
  }

  private shuffle<T>(arr: T[]): T[] {
    const a = [...arr];
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }
}
