package com.escuteasferas.backend.model.blog;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface BlogPostCommentRepo extends JpaRepository<BlogPostComments, Long> {
    List<BlogPostComments> findByPostIdAndParentIsNullOrderByCreatedAtAsc(Long postId);
}