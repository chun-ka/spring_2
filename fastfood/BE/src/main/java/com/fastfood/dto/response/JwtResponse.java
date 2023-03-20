package com.fastfood.dto.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.security.core.GrantedAuthority;

import java.util.Collection;
@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class JwtResponse {
    String token;
    private String type = "Bearer";
    private String name;
    private Long id;
    private String username;
    private String email;
    private String password;
    private String avatar;
    private String phoneNumber;
    private String address;
    private Integer age;
    private Boolean gender;
    private String dateOfBirth;
    private Collection<? extends GrantedAuthority> roles;

    public JwtResponse(String token, String name, Long id, String username, String email, String password, String avatar, Collection<? extends GrantedAuthority> roles) {
        this.token=token;
        this.id=id;
        this.name=name;
        this.username=username;
        this.email=email;
        this.password=password;
        this.avatar=avatar;
        this.roles=roles;
    }
}
