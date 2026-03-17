import { Component, OnDestroy, Output, EventEmitter, signal, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BlogService } from '../../services/blog.service';
import Quill from 'quill';

@Component({
  selector: 'app-post-editor',
  imports: [CommonModule, FormsModule],
  templateUrl: './post-editor.html',
  styleUrl: './post-editor.css'
})
export class PostEditorComponent implements AfterViewInit, OnDestroy {

  @Output() close = new EventEmitter<void>();
  @Output() publish = new EventEmitter<any>();

  titulo = '';
  anonimo = false;
  selectedTag = '';
  isMinimized = signal(false);
  isSaved = signal(false);
  isPublishing = signal(false);
  errorMessage = signal('');

  tags = [
    'Poesia', 'Crônica', 'Conto', 'Ensaio',
    'Devaneio', 'Carta', 'Fragmento'
  ];

  private quill!: Quill;

  constructor(private blogService: BlogService) {}

  ngAfterViewInit() {
    this.quill = new Quill('#editor', {
      theme: 'snow',
      placeholder: 'Escreva seu texto aqui...',
      modules: {
        toolbar: [
          [{ 'header': [1, 2, 3, false] }],
          [{ 'font': [] }],
          [{ 'size': ['small', false, 'large', 'huge'] }],
          ['bold', 'italic', 'underline', 'strike'],
          [{ 'color': [] }, { 'background': [] }],
          [{ 'align': [] }],
          [{ 'list': 'ordered' }, { 'list': 'bullet' }],
          [{ 'indent': '-1' }, { 'indent': '+1' }],
          ['blockquote', 'code-block'],
          ['link', 'image'],
          ['clean']
        ]
      }
    });
  }

  ngOnDestroy() {
    if (this.quill) {
      const toolbar = document.querySelector('.ql-toolbar');
      if (toolbar) toolbar.remove();
    }
  }

  toggleMinimize() {
    this.isMinimized.update(v => !v);
  }

  saveAsDraft() {
    this.isSaved.set(true);
    setTimeout(() => this.isSaved.set(false), 2500);
  }

  onPublish() {
    if (!this.titulo.trim()) {
      this.errorMessage.set('O título é obrigatório.');
      return;
    }
    const content = this.quill.root.innerHTML;
    if (!content || content === '<p><br></p>') {
      this.errorMessage.set('O texto não pode estar vazio.');
      return;
    }

    this.isPublishing.set(true);
    this.errorMessage.set('');

    this.blogService.create({
      titulo: this.titulo,
      conteudo: content,
      tag: this.selectedTag,
      anonimo: this.anonimo
    }).subscribe({
      next: (post) => {
        this.isPublishing.set(false);
        this.publish.emit(post);
      },
      error: () => {
        this.errorMessage.set('Erro ao publicar. Tente novamente.');
        this.isPublishing.set(false);
      }
    });
  }

  onClose() {
    this.close.emit();
  }
}
