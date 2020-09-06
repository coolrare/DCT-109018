import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PostsRoutingModule } from './posts-routing.module';
import { PostsComponent } from './posts.component';
import { PostComponent } from './post/post.component';
import { CreateComponent } from './create/create.component';


@NgModule({
  declarations: [PostsComponent, PostComponent, CreateComponent],
  imports: [
    CommonModule,
    PostsRoutingModule
  ]
})
export class PostsModule { }
