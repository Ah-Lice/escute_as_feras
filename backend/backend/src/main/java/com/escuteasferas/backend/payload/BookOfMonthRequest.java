package com.escuteasferas.backend.payload;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import java.time.LocalDate;
import java.util.List;

public record BookOfMonthRequest(
        @NotBlank String title,
        @NotNull Long authorId,
        String description,
        String publisher,
        Integer year,
        Integer pages,
        String coverUrl,
        LocalDate eventDate,
        String eventTime,
        String eventFormat,
        String eventLocation,
        List<String> tags
) {}