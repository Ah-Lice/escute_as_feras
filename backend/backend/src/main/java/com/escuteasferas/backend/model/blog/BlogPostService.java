package com.escuteasferas.backend.model.blog;

import com.escuteasferas.backend.model.users.User;
import com.escuteasferas.backend.model.users.UserRepository;
import com.escuteasferas.backend.payload.CommentRequest;
import com.escuteasferas.backend.payload.BlogPostRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class BlogPostService {

    private final BlogPostRepository postRepository;
    private final BlogPostCommentRepo commentRepository;
    private final UserRepository userRepository;

    public List<BlogPost> getAll() {
        return postRepository.findByActiveTrueOrderByCreatedAtDesc();
    }

    public BlogPost getById(Long id) {
        return postRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Post não encontrado"));
    }

    public BlogPost create(BlogPostRequest request) {
        String email = SecurityContextHolder.getContext()
                .getAuthentication().getName();
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado"));

        BlogPost post = BlogPost.builder()
                .titulo(request.titulo())
                .conteudo(request.conteudo())
                .tag(request.tag())
                .anonimo(request.anonimo())
                .author(user)
                .active(true)
                .build();

        return postRepository.save(post);
    }

    public void delete(Long id) {
        BlogPost post = postRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Post não encontrado"));
        post.setActive(false);
        postRepository.save(post);
    }

    public BlogPostComments addComment(Long postId, CommentRequest request) {
        BlogPost post = postRepository.findById(postId)
                .orElseThrow(() -> new RuntimeException("Post não encontrado"));

        BlogPostComments parent = null;
        if (request.parentId() != null) {
            parent = commentRepository.findById(request.parentId())
                    .orElse(null);
        }

        BlogPostComments comment = BlogPostComments.builder()
                .post(post)
                .text(request.text())
                .authorName(request.authorName())
                .parent(parent)
                .build();

        return commentRepository.save(comment);
    }

    public List<BlogPostComments> getComments(Long postId) {
        return commentRepository
                .findByPostIdAndParentIsNullOrderByCreatedAtAsc(postId);
    }

    public void deleteComment(Long commentId) {
        commentRepository.deleteById(commentId);
    }
}