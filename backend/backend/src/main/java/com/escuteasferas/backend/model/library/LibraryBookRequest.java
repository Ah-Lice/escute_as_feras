package com.escuteasferas.backend.payload;

import jakarta.validation.constraints.NotBlank;

public record LibraryBookRequest(
        @NotBlank String titulo,
        @NotBlank String autor,
        @NotBlank String editora,
        @NotBlank String isbn,
        Integer anoPublicacao,
        String paisPublicacao,
        String genero
) {}