package com.escuteasferas.backend.payload;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record RegisterRequest(
        @NotBlank(message = "Nome é obrigatório")
        String name,

        @Email(message = "Email inválido")
        @NotBlank(message = "Email é obrigatório")
        String email,

        @NotBlank(message = "Telefone é obrigatório")
        String phone,

        @NotBlank(message = "Data de nascimento é obrigatória")
        String birthDate,

        String profession,

        String preferredGenre,

        @Size(min = 8, message = "Senha deve conter no mínimo 8 caracteres")
        String password
) {}