package com.anna.recept.entity;

import lombok.*;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonFilter;

@JsonFilter("Recipe")
@Getter
@Setter
@EqualsAndHashCode(of = {"id"})
@Entity
@Table(name = "recept")
public class Recipe {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "text")
    private String text;

    @Column(name = "name", unique = true)
    private String name;

    @ManyToOne(fetch = FetchType.EAGER, optional = false)
    @JoinColumn(name = "depart_id")
    private Department department;

    @Column(name = "file")
    private String imgPath;

    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.LAZY)
    @JoinColumn(name = "recept_id")
    private List<Detail> details = new ArrayList<>();

    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.LAZY)
    @JoinColumn(name = "ingridient_id")
    private List<Proportion> proportions = new ArrayList<>();


    //    @OneToMany(mappedBy = "recipe", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.LAZY)
//    private List<Detail> details = new ArrayList<>();
//
//    @OneToMany(mappedBy = "recipe", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.LAZY)
//    private List<Proportion> proportions = new ArrayList<>();

    @ManyToMany(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JoinTable(name = "category", joinColumns = {@JoinColumn(name = "recept_id", nullable = false, updatable = false)},
                        inverseJoinColumns = {@JoinColumn(name = "tag_id", nullable = false, updatable = false)})
    private List<Tag> tags = new ArrayList<>();

    @ManyToMany(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JoinTable(name = "reference", joinColumns = {@JoinColumn(name = "recept_id", nullable = false, updatable = false)},
            inverseJoinColumns = {@JoinColumn(name = "recept_reference_id", nullable = false, updatable = false)})
    private List<Recipe> refs = new ArrayList<>();
}
