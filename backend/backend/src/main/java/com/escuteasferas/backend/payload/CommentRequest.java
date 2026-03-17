package com.escuteasferas.backend.payload;

import jakarta.validation.constraints.NotBlank;

public record CommentRequest(
        @NotBlank String text,
        String authorName,
        Long parentId
) {}