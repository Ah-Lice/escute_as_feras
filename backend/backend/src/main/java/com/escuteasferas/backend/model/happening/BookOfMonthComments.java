package com.escuteasferas.backend.model.happening;

import com.escuteasferas.backend.model.users.User;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "book_comments")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class BookOfMonthComments {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "book_id", nullable = false)
    private BookOfMonth book;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    private String authorName;

    @Column(columnDefinition = "TEXT", nullable = false)
    private String text;

    @ManyToOne
    @JoinColumn(name = "parent_id")
    private BookOfMonthComments parent;

    @OneToMany(mappedBy = "parent", cascade = CascadeType.ALL)
    private List<BookOfMonthComments> replies;

    @Column(updatable = false)
    private LocalDateTime createdAt;

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
    }
}