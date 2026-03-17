import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HappeningService } from '../../services/happening.service';

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
  selector: 'app-happening',
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './happening.html',
  styleUrl: './happening.css'
})
export class HappeningComponent implements OnInit {

  book: any = null;
  isLoading = signal(true);
  errorMessage = signal('');

  nextEvent = {
    date: '29 de março de 2026',
    time: '15h00',
    format: 'Presencial',
    location: 'A confirmar'
  };

  comments: Comment[] = [];
  newComment = { authorName: '', text: '' };

  constructor(private happeningService: HappeningService) {}

  ngOnInit() {
    this.happeningService.getCurrentBook().subscribe({
      next: (data) => {
        this.book = data;
        this.isLoading.set(false);
        this.loadComments(data.id);
      },
      error: () => {
        this.errorMessage.set('Nenhum livro do mês cadastrado ainda.');
        this.isLoading.set(false);
      }
    });
  }

  loadComments(bookId: number) {
    this.happeningService.getComments(bookId).subscribe({
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
    if (!this.newComment.authorName.trim() || !this.newComment.text.trim()) return;
    this.happeningService.addComment(this.book.id, {
      authorName: this.newComment.authorName,
      text: this.newComment.text
    }).subscribe({
      next: (comment) => {
        this.comments.push({ ...comment, showReplyForm: false, replyText: '' });
        this.newComment = { authorName: '', text: '' };
      }
    });
  }

  addReply(comment: Comment) {
    if (!comment.replyText.trim()) return;
    this.happeningService.addComment(this.book.id, {
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
    this.happeningService.deleteComment(commentId).subscribe({
      next: () => {
        this.comments = this.comments.filter(c => c.id !== commentId);
      }
    });
  }

  deleteReply(comment: Comment, replyId: number) {
    this.happeningService.deleteComment(replyId).subscribe({
      next: () => {
        comment.replies = comment.replies.filter(r => r.id !== replyId);
      }
    });
  }
}
