import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LibraryService } from '../../services/library.service';

interface Book {
  id: number;
  titulo: string;
  autor: string;
  editora: string;
  isbn: string;
  anoPublicacao: number;
  paisPublicacao: string;
  genero: string;
  capaPath: string | null;
  epubPath: string | null;
}

@Component({
  selector: 'app-library',
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './library.html',
  styleUrl: './library.css'
})
export class LibraryComponent implements OnInit {
  searchQuery = '';
  isModalOpen = signal(false);
  isLoading = signal(false);
  isLoadingBooks = signal(true);
  successMessage = signal('');
  errorMessage = signal('');
  capaPreview = signal<string | null>(null);
  epubFileName = signal<string | null>(null);

  currentPage = 1;
  itemsPerPage = 10;

  generos = [
    'Romance', 'Ficção Científica', 'Fantasia', 'Terror', 'Poesia',
    'Ensaio', 'Biografia', 'Conto', 'Crônica', 'Literatura Estrangeira',
    'Literatura Brasileira', 'Psicanálise', 'Antropologia', 'Filosofia'
  ];

  bookForm: FormGroup;
  capaFile: File | null = null;
  epubFile: File | null = null;
  books: Book[] = [];

  constructor(
    private fb: FormBuilder,
    private libraryService: LibraryService
  ) {
    this.bookForm = this.fb.group({
      titulo: ['', Validators.required],
      autor: ['', Validators.required],
      editora: ['', Validators.required],
      isbn: ['', Validators.required],
      anoPublicacao: ['', Validators.required],
      paisPublicacao: ['', Validators.required],
      genero: ['', Validators.required],
    });
  }

  ngOnInit() {
    this.loadBooks();
  }

  loadBooks() {
    this.isLoadingBooks.set(true);
    this.libraryService.getAll().subscribe({
      next: (data) => {
        this.books = data;
        this.isLoadingBooks.set(false);
      },
      error: () => {
        this.isLoadingBooks.set(false);
      }
    });
  }

  get filteredBooks(): Book[] {
    if (!this.searchQuery.trim()) return this.books;
    const q = this.searchQuery.toLowerCase();
    return this.books.filter(b =>
      b.titulo?.toLowerCase().includes(q) ||
      b.autor?.toLowerCase().includes(q) ||
      b.editora?.toLowerCase().includes(q) ||
      b.isbn?.toLowerCase().includes(q) ||
      b.anoPublicacao?.toString().includes(q) ||
      b.paisPublicacao?.toLowerCase().includes(q) ||
      b.genero?.toLowerCase().includes(q)
    );
  }

  get paginatedBooks(): Book[] {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    return this.filteredBooks.slice(start, start + this.itemsPerPage);
  }

  get totalPages(): number {
    return Math.ceil(this.filteredBooks.length / this.itemsPerPage);
  }

  get pages(): number[] {
    return Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }

  onSearch() {
    this.currentPage = 1;
  }

  goToPage(page: number) {
    if (page < 1 || page > this.totalPages) return;
    this.currentPage = page;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  openModal() {
    this.isModalOpen.set(true);
    this.successMessage.set('');
    this.errorMessage.set('');
    document.body.style.overflow = 'hidden';
  }

  closeModal() {
    this.isModalOpen.set(false);
    document.body.style.overflow = 'auto';
    this.bookForm.reset();
    this.capaFile = null;
    this.epubFile = null;
    this.capaPreview.set(null);
    this.epubFileName.set(null);
    this.errorMessage.set('');
    this.successMessage.set('');
  }

  onCapaChange(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      this.capaFile = input.files[0];
      const reader = new FileReader();
      reader.onload = (e) => this.capaPreview.set(e.target?.result as string);
      reader.readAsDataURL(this.capaFile);
    }
  }

  onEpubChange(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];
      if (!file.name.endsWith('.epub')) {
        this.errorMessage.set('O arquivo deve estar no formato .epub');
        this.epubFile = null;
        this.epubFileName.set(null);
        return;
      }
      this.epubFile = file;
      this.epubFileName.set(file.name);
      this.errorMessage.set('');
    }
  }

  onIsbnInput(event: Event) {
    const input = event.target as HTMLInputElement;
    input.value = input.value.replace(/[^a-zA-Z0-9]/g, '');
    this.bookForm.get('isbn')?.setValue(input.value, { emitEvent: false });
  }

  onAnoInput(event: Event) {
    const input = event.target as HTMLInputElement;
    input.value = input.value.replace(/[^0-9]/g, '').slice(0, 4);
    this.bookForm.get('anoPublicacao')?.setValue(input.value, { emitEvent: false });
  }

  onSubmit() {
    if (this.bookForm.invalid) {
      this.bookForm.markAllAsTouched();
      return;
    }
    if (!this.capaFile) {
      this.errorMessage.set('A capa do livro é obrigatória.');
      return;
    }
    if (!this.epubFile) {
      this.errorMessage.set('O arquivo .epub é obrigatório.');
      return;
    }

    this.isLoading.set(true);
    this.errorMessage.set('');

    const formData = new FormData();
    formData.append('dados', new Blob([JSON.stringify(this.bookForm.value)], { type: 'application/json' }));
    formData.append('capa', this.capaFile);
    formData.append('epub', this.epubFile);

    this.libraryService.create(formData).subscribe({
      next: (newBook) => {
        this.books.unshift(newBook);
        this.isLoading.set(false);
        this.successMessage.set(`"${newBook.titulo}" foi adicionado ao acervo com sucesso!`);
        setTimeout(() => this.closeModal(), 2500);
      },
      error: (err) => {
        this.isLoading.set(false);
        if (err.status === 409 || err.error?.message?.includes('ISBN')) {
          this.errorMessage.set('Este livro já está cadastrado no acervo (ISBN duplicado).');
        } else {
          this.errorMessage.set('Erro ao cadastrar livro. Tente novamente.');
        }
      }
    });
  }

  downloadBook(book: Book) {
    alert(`Download de "${book.titulo}" em breve!`);
  }
}
