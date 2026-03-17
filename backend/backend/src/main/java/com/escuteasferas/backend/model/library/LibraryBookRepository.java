package com.escuteasferas.backend.model.library;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface LibraryBookRepository extends JpaRepository<LibraryBook, Long> {

    boolean existsByIsbn(String isbn);

    List<LibraryBook> findByTituloContainingIgnoreCaseOrAutorContainingIgnoreCaseOrGeneroContainingIgnoreCaseOrEditoraContainingIgnoreCaseOrPaisPublicacaoContainingIgnoreCase(
            String titulo,
            String autor,
            String genero,
            String editora,
            String pais
    );
}