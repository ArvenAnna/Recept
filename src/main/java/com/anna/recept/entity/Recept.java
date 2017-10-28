package com.anna.recept.entity;

import lombok.*;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@Entity
@Table(name = "recept")
public class Recept {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Integer id;

    @Column(name = "text")
    private String text;

    @Column(name = "name")
    private String name;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "depart_id")
    private Department department;

    @Column(name = "file")
    private String imgPath;

    @OneToMany(mappedBy = "recept", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.LAZY)
    private List<Detail> details = new ArrayList<>();

    @OneToMany(mappedBy = "recept", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.LAZY)
    private List<Proportion> proportions = new ArrayList<>();

    @ManyToMany(mappedBy = "recepts", fetch = FetchType.LAZY)
    private List<Tag> tags = new ArrayList<>();

    @ManyToMany(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JoinTable(name = "reference", joinColumns = {@JoinColumn(name = "recept_id", nullable = false, updatable = false)},
            inverseJoinColumns = {@JoinColumn(name = "recept_reference_id", nullable = false, updatable = false)})
    private List<Recept> refs = new ArrayList<>();
}
