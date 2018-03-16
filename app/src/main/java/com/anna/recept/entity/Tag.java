package com.anna.recept.entity;

import lombok.*;

import javax.persistence.*;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@Entity
@Table(name = "tag")
public class Tag {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Integer id;

    @Column(name = "name")
    private String name;

    @ManyToMany(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JoinTable(name = "category", joinColumns = {@JoinColumn(name = "tag_id", nullable = false, updatable = false)},
            inverseJoinColumns = {@JoinColumn(name = "recept_id", nullable = false, updatable = false)})
    private List<Recept> recepts = new ArrayList<>();
}
