package com.escuteasferas.backend.config;

import com.escuteasferas.backend.model.happening.BookOfMonth;
import com.escuteasferas.backend.model.happening.BookOfMonthComments;
import com.escuteasferas.backend.model.happening.BookOfMonthService;
import com.escuteasferas.backend.payload.BookOfMonthRequest;
import com.escuteasferas.backend.payload.CommentRequest;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/happening")
@RequiredArgsConstructor
public class BookOfMonthController {

    private final BookOfMonthService bookService;

    @GetMapping
    public ResponseEntity<BookOfMonth> getCurrentBook() {
        return ResponseEntity.ok(bookService.getCurrentBook());
    }

    @PostMapping
    public ResponseEntity<BookOfMonth> createBook(
            @Valid @RequestBody BookOfMonthRequest request) {
        return ResponseEntity.ok(bookService.createBook(request));
    }

    @GetMapping("/{bookId}/comments")
    public ResponseEntity<List<BookOfMonthComments>> getComments(
            @PathVariable Long bookId) {
        return ResponseEntity.ok(bookService.getComments(bookId));
    }

    @PostMapping("/{bookId}/comments")
    public ResponseEntity<BookOfMonthComments> addComment(
            @PathVariable Long bookId,
            @Valid @RequestBody CommentRequest request) {
        return ResponseEntity.ok(bookService.addComment(bookId, request));
    }

    @DeleteMapping("/comments/{commentId}")
    public ResponseEntity<Void> deleteComment(
            @PathVariable Long commentId) {
        bookService.deleteComment(commentId);
        return ResponseEntity.noContent().build();
    }
}