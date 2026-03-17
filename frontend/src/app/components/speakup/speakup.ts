import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { PostEditorComponent } from '../post-editor/post-editor';

interface Post {
  id: number;
  titulo: string;
  autor: string | null;
  anonimo: boolean;
  trecho: string;
  data: Date;
  tag: string;
}

@Component({
  selector: 'app-speakup',
  imports: [CommonModule, RouterLink, PostEditorComponent],
  templateUrl: './speakup.html',
  styleUrl: './speakup.css',

})
export class SpeakupComponent {
  isEditorOpen = signal(false);
  openEditor() {
    this.isEditorOpen.set(true);
  }

  closeEditor() {
    this.isEditorOpen.set(false);
  }
  posts: Post[] = [
    {
      id: 1,
      titulo: 'O rugido que ninguém ouviu',
      autor: null,
      anonimo: true,
      trecho: 'Existe um silêncio que não é paz. É o silêncio de quem aprendeu que sua voz incomoda, que suas palavras chegam antes do tempo ou tarde demais...',
      data: new Date('2026-03-14'),
      tag: 'Poesia'
    },
    {
      id: 2,
      titulo: 'Carta para a menina que fui',
      autor: 'Mariana',
      anonimo: false,
      trecho: 'Você vai aprender que o mundo tem mais camadas do que te ensinaram. Que a beleza mora nos lugares que te disseram para ignorar...',
      data: new Date('2026-03-10'),
      tag: 'Crônica'
    },
    {
      id: 3,
      titulo: 'Decolonizar o olhar',
      autor: 'Alice',
      anonimo: false,
      trecho: 'Quando comecei a desaprender tudo que me foi dado como verdade absoluta, percebi que estava apenas começando a ver. O olhar decolonial não é um destino...',
      data: new Date('2026-03-05'),
      tag: 'Ensaio'
    }
  ];
}
