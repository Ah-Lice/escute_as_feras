package com.escuteasferas.backend.config;

import com.escuteasferas.backend.model.happening.Author;
import com.escuteasferas.backend.model.happening.AuthorRepository;
import com.escuteasferas.backend.payload.AuthorRequest;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/authors")
@RequiredArgsConstructor
public class AuthorController {

    private final AuthorRepository authorRepository;

    @GetMapping
    public ResponseEntity<List<Author>> getAll() {
        return ResponseEntity.ok(authorRepository.findAll());
    }

    @PostMapping
    public ResponseEntity<Author> create(
            @Valid @RequestBody AuthorRequest request) {
        Author author = Author.builder()
                .name(request.name())
                .nationality(request.nationality())
                .bio(request.bio())
                .photoUrl(request.photoUrl())
                .build();
        return ResponseEntity.ok(authorRepository.save(author));
    }
}