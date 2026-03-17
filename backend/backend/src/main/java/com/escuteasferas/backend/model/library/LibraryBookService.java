package com.escuteasferas.backend.model.library;

import com.escuteasferas.backend.model.users.User;
import com.escuteasferas.backend.model.users.UserRepository;
import com.escuteasferas.backend.payload.LibraryBookRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class LibraryBookService {

    private final LibraryBookRepository bookRepository;
    private final UserRepository userRepository;

    private static final String UPLOAD_DIR = "uploads/";
    private static final String EPUB_DIR = UPLOAD_DIR + "epubs/";
    private static final String CAPA_DIR = UPLOAD_DIR + "capas/";

    public List<LibraryBook> getAll() {
        return bookRepository.findAll();
    }

    public List<LibraryBook> search(String query) {
        return bookRepository
                .findByTituloContainingIgnoreCaseOrAutorContainingIgnoreCaseOrGeneroContainingIgnoreCaseOrEditoraContainingIgnoreCaseOrPaisPublicacaoContainingIgnoreCase(
                        query, query, query, query, query
                );
    }

    public LibraryBook create(LibraryBookRequest request,
                              MultipartFile capa,
                              MultipartFile epub) throws IOException {

        if (bookRepository.existsByIsbn(request.isbn())) {
            throw new RuntimeException("Este livro já está cadastrado no acervo (ISBN duplicado).");
        }

        if (epub != null && !epub.isEmpty()) {
            String filename = epub.getOriginalFilename();
            if (filename == null || !filename.endsWith(".epub")) {
                throw new RuntimeException("O arquivo deve estar no formato .epub");
            }
        }

        String email = SecurityContextHolder.getContext()
                .getAuthentication().getName();
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado"));

        String capaPath = null;
        String epubPath = null;

        if (capa != null && !capa.isEmpty()) {
            capaPath = saveFile(capa, CAPA_DIR);
        }

        if (epub != null && !epub.isEmpty()) {
            epubPath = saveFile(epub, EPUB_DIR);
        }

        LibraryBook book = LibraryBook.builder()
                .titulo(request.titulo())
                .autor(request.autor())
                .editora(request.editora())
                .isbn(request.isbn())
                .anoPublicacao(request.anoPublicacao())
                .paisPublicacao(request.paisPublicacao())
                .genero(request.genero())
                .capaPath(capaPath)
                .epubPath(epubPath)
                .uploadedBy(user)
                .build();

        return bookRepository.save(book);
    }

    public void delete(Long id) {
        bookRepository.deleteById(id);
    }

    private String saveFile(MultipartFile file, String dir) throws IOException {
        Files.createDirectories(Paths.get(dir));
        String filename = UUID.randomUUID() + "_" + file.getOriginalFilename();
        Path path = Paths.get(dir + filename);
        Files.write(path, file.getBytes());
        return path.toString();
    }
}