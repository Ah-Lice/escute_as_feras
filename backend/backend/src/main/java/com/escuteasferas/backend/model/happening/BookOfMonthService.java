package com.escuteasferas.backend.model.happening;

import com.escuteasferas.backend.model.users.User;
import com.escuteasferas.backend.model.users.UserRepository;
import com.escuteasferas.backend.payload.BookOfMonthRequest;
import com.escuteasferas.backend.payload.CommentRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class BookOfMonthService {

    private final BookOfMonthRepository bookRepository;
    private final BookOfMonthCommentRepo commentRepository;
    private final AuthorRepository authorRepository;
    private final UserRepository userRepository;

    public BookOfMonth getCurrentBook() {
        return bookRepository.findFirstByActiveTrueOrderByCreatedAtDesc()
                .orElseThrow(() -> new RuntimeException("Nenhum livro do mês cadastrado"));
    }

    public BookOfMonth createBook(BookOfMonthRequest request) {
        Author author = authorRepository.findById(request.authorId())
                .orElseThrow(() -> new RuntimeException("Autor não encontrado"));

        String email = SecurityContextHolder.getContext()
                .getAuthentication().getName();
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado"));

        BookOfMonth book = BookOfMonth.builder()
                .title(request.title())
                .author(author)
                .description(request.description())
                .publisher(request.publisher())
                .year(request.year())
                .pages(request.pages())
                .coverUrl(request.coverUrl())
                .eventDate(request.eventDate())
                .eventTime(request.eventTime())
                .eventFormat(request.eventFormat())
                .eventLocation(request.eventLocation())
                .tags(request.tags())
                .createdBy(user)
                .active(true)
                .build();

        return bookRepository.save(book);
    }

    public BookOfMonthComments addComment(Long bookId, CommentRequest request) {
        BookOfMonth book = bookRepository.findById(bookId)
                .orElseThrow(() -> new RuntimeException("Livro não encontrado"));

        BookOfMonthComments parent = null;
        if (request.parentId() != null) {
            parent = commentRepository.findById(request.parentId())
                    .orElse(null);
        }

        BookOfMonthComments comment = BookOfMonthComments.builder()
                .book(book)
                .text(request.text())
                .authorName(request.authorName())
                .parent(parent)
                .build();

        return commentRepository.save(comment);
    }

    public List<BookOfMonthComments> getComments(Long bookId) {
        return commentRepository
                .findByBookIdAndParentIsNullOrderByCreatedAtAsc(bookId);
    }

    public void deleteComment(Long commentId) {
        commentRepository.deleteById(commentId);
    }
}