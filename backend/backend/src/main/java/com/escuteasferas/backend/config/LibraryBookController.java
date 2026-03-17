package com.escuteasferas.backend.config;

import com.escuteasferas.backend.model.library.LibraryBook;
import com.escuteasferas.backend.model.library.LibraryBookService;
import com.escuteasferas.backend.payload.LibraryBookRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/api/library")
@RequiredArgsConstructor
public class LibraryBookController {

    private final LibraryBookService bookService;

    @GetMapping
    public ResponseEntity<List<LibraryBook>> getAll() {
        return ResponseEntity.ok(bookService.getAll());
    }

    @GetMapping("/search")
    public ResponseEntity<List<LibraryBook>> search(
            @RequestParam String query) {
        return ResponseEntity.ok(bookService.search(query));
    }

    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    @PreAuthorize("hasAnyRole('MEMBER', 'ADMIN')")
    public ResponseEntity<LibraryBook> create(
            @RequestPart("dados") LibraryBookRequest request,
            @RequestPart("capa") MultipartFile capa,
            @RequestPart("epub") MultipartFile epub) throws IOException {
        return ResponseEntity.ok(bookService.create(request, capa, epub));
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        bookService.delete(id);
        return ResponseEntity.noContent().build();
    }
}