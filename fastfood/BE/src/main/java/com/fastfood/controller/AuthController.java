package com.fastfood.controller;


import com.fastfood.dto.request.ChangePasswordForm;
import com.fastfood.dto.request.SignInForm;
import com.fastfood.dto.request.SignUpForm;
import com.fastfood.dto.response.JwtResponse;
import com.fastfood.security.jwt.JWTProvider;
import com.fastfood.security.principle.UserPrinciple;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;

import org.springframework.web.bind.annotation.*;


@RequestMapping("/api")
@RestController
@CrossOrigin("*")
public class AuthController {

    @Autowired
    private AuthenticationManager authenticationManager;
    @Autowired
    private JWTProvider jwtProvider;


    /**
     * Function: login with only username and password
     */
    @PostMapping("/login")

    public ResponseEntity<?> login( @RequestBody SignInForm signInForm ) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(signInForm.getUsername(), signInForm.getPassword()));
        SecurityContextHolder.getContext().setAuthentication(authentication);
        String token = jwtProvider.createToken(authentication);
        UserPrinciple userPrinciple = (UserPrinciple) authentication.getPrincipal();
        return ResponseEntity.ok(new JwtResponse(token,
                userPrinciple.getName(),
                userPrinciple.getId(),
                userPrinciple.getUsername(),
                userPrinciple.getEmail(),
                userPrinciple.getPassword(),
                userPrinciple.getAvatar(),
                userPrinciple.getAuthorities()));
    }


}
