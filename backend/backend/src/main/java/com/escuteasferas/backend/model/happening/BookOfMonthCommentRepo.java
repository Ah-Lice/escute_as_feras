package com.escuteasferas.backend.model.happening;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface BookOfMonthCommentRepo extends JpaRepository<BookOfMonthComments, Long> {
    List<BookOfMonthComments> findByBookIdAndParentIsNullOrderByCreatedAtAsc(Long bookId);
}