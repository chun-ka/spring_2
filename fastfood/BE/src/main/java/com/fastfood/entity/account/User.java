package com.fastfood.entity.account;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.Set;

@Entity
@Table(name = "user", uniqueConstraints = {
        @UniqueConstraint(columnNames = {
                "username"
        }),
        @UniqueConstraint(columnNames = {
                "email"
        })
})
@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idUser;
    @Column(columnDefinition = "varchar(45)",unique = true)
    private String username;
    @JsonIgnore
    private String password;
    @Column(columnDefinition = "varchar(45)",unique = true)
    private String email;
    private String phoneNumber;
    private String address;
    private String name;
    @Column(columnDefinition = "bit default 1")
    private boolean flagUser;

    @ManyToMany(fetch = FetchType.EAGER)
    @JsonBackReference
    @JoinTable(name = "user_role", joinColumns = @JoinColumn(name = "user_id"), inverseJoinColumns = @JoinColumn(name = "role_id"))
    private Set<Role> roles;
    @Lob
    private String avatar;


    public User(String username, String encode, String name, String email) {
    }

}
