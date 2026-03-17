package com.escuteasferas.backend.model.users;

import com.escuteasferas.backend.config.JwtUtil;
import com.escuteasferas.backend.payload.AuthResponse;
import com.escuteasferas.backend.payload.LoginRequest;
import com.escuteasferas.backend.payload.RegisterRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDate;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;
    private final AuthenticationManager authenticationManager;

    public AuthResponse register(RegisterRequest request) {
        if (userRepository.existsByEmail(request.email())) {
            throw new RuntimeException("Não foi possível completar o cadastro");
        }

        User user = User.builder()
                .name(request.name())
                .email(request.email())
                .phone(request.phone())
                .birthDate(request.birthDate() != null && !request.birthDate().isEmpty()
                        ? LocalDate.parse(request.birthDate())
                        : null)
                .profession(request.profession())
                .preferredGenre(request.preferredGenre())
                .password(request.password() != null
                        ? passwordEncoder.encode(request.password())
                        : null)
                .role(UserRole.MEMBER)
                .active(true)
                .build();

        userRepository.save(user);

        String token = jwtUtil.generateToken(user);

        return new AuthResponse(
                token,
                user.getName(),
                user.getEmail(),
                user.getRole().name()
        );
    }

    public AuthResponse login(LoginRequest request) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.email(),
                        request.password()
                )
        );

        User user = userRepository.findByEmail(request.email())
                .orElseThrow(() -> new RuntimeException("Credenciais inválidas"));

        String token = jwtUtil.generateToken(user);

        return new AuthResponse(
                token,
                user.getName(),
                user.getEmail(),
                user.getRole().name()
        );
    }
}