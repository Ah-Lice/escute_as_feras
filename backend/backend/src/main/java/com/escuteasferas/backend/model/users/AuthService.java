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

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;
    private final AuthenticationManager authenticationManager;

    public AuthResponse register(RegisterRequest request) {
        if (userRepository.existsByEmail(request.email())) {
            throw new RuntimeException("Não foi possível prosseguir com o cadastro.");
        }

        User user = User.builder()
                .name(request.name())
                .email(request.email())
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
                .orElseThrow(() -> new RuntimeException("Usuário e/ou Senha incorretos."));

        String token = jwtUtil.generateToken(user);

        return new AuthResponse(
                token,
                user.getName(),
                user.getEmail(),
                user.getRole().name()
        );
    }
}