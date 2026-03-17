package com.escuteasferas.backend.model.happening;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface BookOfMonthRepository extends JpaRepository<BookOfMonth, Long> {
    Optional<BookOfMonth> findFirstByActiveTrueOrderByCreatedAtDesc();
}