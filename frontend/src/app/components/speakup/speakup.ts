import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { BlogService } from '../../services/blog.service';
import { PostEditorComponent } from '../post-editor/post-editor';

interface Post {
  id: number;
  titulo: string;
  autor: any;
  anonimo: boolean;
  conteudo: string;
  tag: string;
  createdAt: string;
}

@Component({
  selector: 'app-speakup',
  imports: [CommonModule, RouterLink, FormsModule, PostEditorComponent],
  templateUrl: './speakup.html',
  styleUrl: './speakup.css',
})
export class SpeakupComponent implements OnInit {
  posts: Post[] = [];
  isLoading = signal(true);
  isEditorOpen = signal(false);

  constructor(private blogService: BlogService) {}

  ngOnInit() {
    this.loadPosts();
  }

  loadPosts() {
    this.blogService.getAll().subscribe({
      next: (data) => {
        this.posts = data;
        this.isLoading.set(false);
      },
      error: () => {
        this.isLoading.set(false);
      },
    });
  }

  openEditor() {
    this.isEditorOpen.set(true);
  }

  closeEditor() {
    this.isEditorOpen.set(false);
  }

  onPublish(post: any) {
    this.isEditorOpen.set(false);
    this.posts = [post, ...this.posts];
  }

  getTrecho(conteudo: string): string {
    const stripped = conteudo.replace(/<[^>]*>/g, '');
    return stripped.length > 200 ? stripped.substring(0, 200) : stripped;
  }
}
