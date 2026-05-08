import { About } from './about/about';
import { Routes } from '@angular/router';
import { Home } from './home/home';

import { Blog } from './blog/blog';
import { Notfound } from './notfound/notfound';
import { PostDetails } from './post-details/post-details';

export const routes: Routes = [
    
    
 {
    path: '' , redirectTo: 'home', pathMatch: 'full'
    

} , 

{
    path: 'home', component: Home , title: 'Home'
    

} 



,
{
    path: "blog" , component: Blog , title: 'Blog' 
} , 
{
    path: "about" , component: About , title: 'about' 
} , 
 {path: 'blog/:id', component: PostDetails} 
,
{
    path: '**' , component: Notfound , title: 'Not Found' 
}


];
