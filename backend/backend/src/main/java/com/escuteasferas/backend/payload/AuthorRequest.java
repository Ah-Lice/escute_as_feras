package com.escuteasferas.backend.payload;

import jakarta.validation.constraints.NotBlank;

public record AuthorRequest(
        @NotBlank String name,
        String nationality,
        String bio,
        String photoUrl
) {}