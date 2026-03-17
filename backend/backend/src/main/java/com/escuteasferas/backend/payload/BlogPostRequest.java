package com.escuteasferas.backend.payload;

import jakarta.validation.constraints.NotBlank;

public record BlogPostRequest(
        @NotBlank String titulo,
        @NotBlank String conteudo,
        String tag,
        boolean anonimo
) {}