package com.openclassrooms.mddapi.security;

public class AuthenticationException extends RuntimeException {
    public AuthenticationException() { super("Email ou mot de passe invalide"); }
}