package com.escuteasferas.backend.model.blog;

import com.escuteasferas.backend.model.users.User;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "post_comments")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class BlogPostComments {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "post_id", nullable = false)
    private BlogPost post;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    private String authorName;

    @Column(columnDefinition = "TEXT", nullable = false)
    private String text;

    @ManyToOne
    @JoinColumn(name = "parent_id")
    private BlogPostComments parent;

    @OneToMany(mappedBy = "parent", cascade = CascadeType.ALL)
    private List<BlogPostComments> replies;

    @Column(updatable = false)
    private LocalDateTime createdAt;

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
    }
}