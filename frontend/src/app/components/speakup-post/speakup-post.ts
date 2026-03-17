import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { BlogService } from '../../services/blog.service';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

interface Comment {
  id: number;
  authorName: string;
  text: string;
  createdAt: string;
  replies: Comment[];
  showReplyForm: boolean;
  replyText: string;
}

@Component({
  selector: 'app-speakup-post',
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './speakup-post.html',
  styleUrl: './speakup-post.css'
})
export class SpeakupPostComponent implements OnInit {

  post: any = null;
  safeConteudo: SafeHtml = '';
  isLoading = signal(true);
  errorMessage = signal('');
  comments: Comment[] = [];
  newComment = { author: '', text: '' };

  constructor(
    private route: ActivatedRoute,
    private blogService: BlogService,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.blogService.getById(id).subscribe({
      next: (data) => {
        this.post = data;
        this.safeConteudo = this.sanitizer.bypassSecurityTrustHtml(data.conteudo);
        this.isLoading.set(false);
        this.loadComments(id);
      },
      error: () => {
        this.errorMessage.set('Post não encontrado.');
        this.isLoading.set(false);
      }
    });
  }

  loadComments(postId: number) {
    this.blogService.getComments(postId).subscribe({
      next: (data) => {
        this.comments = data.map(c => ({
          ...c,
          showReplyForm: false,
          replyText: ''
        }));
      }
    });
  }

  addComment() {
    if (!this.newComment.author.trim() || !this.newComment.text.trim()) return;
    this.blogService.addComment(this.post.id, {
      authorName: this.newComment.author,
      text: this.newComment.text
    }).subscribe({
      next: (comment) => {
        this.comments.push({ ...comment, showReplyForm: false, replyText: '' });
        this.newComment = { author: '', text: '' };
      }
    });
  }

  addReply(comment: Comment) {
    if (!comment.replyText.trim()) return;
    this.blogService.addComment(this.post.id, {
      text: comment.replyText,
      parentId: comment.id
    }).subscribe({
      next: (reply) => {
        comment.replies.push({ ...reply, showReplyForm: false, replyText: '' });
        comment.replyText = '';
        comment.showReplyForm = false;
      }
    });
  }

  toggleReplyForm(comment: Comment) {
    comment.showReplyForm = !comment.showReplyForm;
  }

  deleteComment(commentId: number) {
    this.blogService.deleteComment(commentId).subscribe({
      next: () => {
        this.comments = this.comments.filter(c => c.id !== commentId);
      }
    });
  }

  deleteReply(comment: Comment, replyId: number) {
    this.blogService.deleteComment(replyId).subscribe({
      next: () => {
        comment.replies = comment.replies.filter(r => r.id !== replyId);
      }
    });
  }
}
