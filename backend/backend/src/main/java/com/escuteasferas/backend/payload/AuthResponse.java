package com.escuteasferas.backend.payload;

public record AuthResponse(
        String token,
        String name,
        String email,
        String role
) {}