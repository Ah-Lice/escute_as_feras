package com.escuteasferas.backend.config;

import com.escuteasferas.backend.model.blog.BlogPost;
import com.escuteasferas.backend.model.blog.BlogPostComments;
import com.escuteasferas.backend.model.blog.BlogPostService;
import com.escuteasferas.backend.payload.BlogPostRequest;
import com.escuteasferas.backend.payload.CommentRequest;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/blog")
@RequiredArgsConstructor
public class BlogPostController {

    private final BlogPostService postService;

    @GetMapping
    public ResponseEntity<List<BlogPost>> getAll() {
        return ResponseEntity.ok(postService.getAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<BlogPost> getById(@PathVariable Long id) {
        return ResponseEntity.ok(postService.getById(id));
    }

    @PostMapping
    @PreAuthorize("hasAnyRole('MEMBER', 'ADMIN')")
    public ResponseEntity<BlogPost> create(
            @Valid @RequestBody BlogPostRequest request) {
        return ResponseEntity.ok(postService.create(request));
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasAnyRole('MEMBER', 'ADMIN')")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        postService.delete(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/{postId}/comments")
    public ResponseEntity<List<BlogPostComments>> getComments(
            @PathVariable Long postId) {
        return ResponseEntity.ok(postService.getComments(postId));
    }

    @PostMapping("/{postId}/comments")
    public ResponseEntity<BlogPostComments> addComment(
            @PathVariable Long postId,
            @Valid @RequestBody CommentRequest request) {
        return ResponseEntity.ok(postService.addComment(postId, request));
    }

    @DeleteMapping("/comments/{commentId}")
    @PreAuthorize("hasAnyRole('MEMBER', 'ADMIN')")
    public ResponseEntity<Void> deleteComment(
            @PathVariable Long commentId) {
        postService.deleteComment(commentId);
        return ResponseEntity.noContent().build();
    }
}