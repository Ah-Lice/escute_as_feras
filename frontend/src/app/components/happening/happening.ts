import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';

interface Comment {
  id: number;
  author: string;
  text: string;
  date: Date;
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
export class HappeningComponent {

  book = {
    title: 'Trilogia de Copenhagen',
    author: 'Tove Ditlevsen',
    authorBio: 'Tove Ditlevsen (1917-1976) foi uma das escritoras dinamarquesas mais importantes do século XX. Nascida em Copenhagen, em uma família da classe trabalhadora, tornou-se símbolo da literatura autobiográfica nórdica. Sua obra explora com brutalidade e beleza os temas da infância, casamento, maternidade, dependência química e criação literária.',
    description: 'A Trilogia de Copenhagen reúne três volumes autobiográficos — Infância, Juventude e Dependência — que traçam a vida de Tove desde a sua infância numa Copenhagen operária dos anos 1930 até a vida adulta marcada por casamentos turbulentos e vícios. Com uma prosa direta e cortante, Ditlevsen nos convida a habitar uma mente feminina que deseja, sofre e cria com igual intensidade.',
    coverPlaceholder: true,
    tags: ['Autobiografia', 'Literatura Nórdica', 'Feminismo', 'Século XX'],
    pages: 352,
    publisher: 'Companhia das Letras',
    year: 2022
  };

  nextEvent = {
    date: '29 de março de 2026',
    time: '15h00',
    format: 'Online',
    location: 'Via Google Meet'
  };

  comments: Comment[] = [
    {
      id: 1,
      author: 'Mariana',
      text: 'Que livro devastador e necessário. A forma como Tove descreve a dependência é perturbadora.',
      date: new Date('2026-03-10'),
      replies: [],
      showReplyForm: false,
      replyText: ''
    }
  ];

  newComment = { author: '', text: '' };
  showCommentForm = signal(true);

  addComment() {
    if (!this.newComment.author.trim() || !this.newComment.text.trim()) return;
    this.comments.push({
      id: Date.now(),
      author: this.newComment.author,
      text: this.newComment.text,
      date: new Date(),
      replies: [],
      showReplyForm: false,
      replyText: ''
    });
    this.newComment = { author: '', text: '' };
  }

  addReply(comment: Comment) {
    if (!comment.replyText.trim()) return;
    comment.replies.push({
      id: Date.now(),
      author: 'Visitante',
      text: comment.replyText,
      date: new Date(),
      replies: [],
      showReplyForm: false,
      replyText: ''
    });
    comment.replyText = '';
    comment.showReplyForm = false;
  }
  deleteComment(commentId: number) {
    this.comments = this.comments.filter(c => c.id !== commentId);
  }

  deleteReply(comment: Comment, replyId: number) {
    comment.replies = comment.replies.filter(r => r.id !== replyId);
  }
  toggleReplyForm(comment: Comment) {
    comment.showReplyForm = !comment.showReplyForm;
  }
}
