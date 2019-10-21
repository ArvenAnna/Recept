package com.anna.recept.entity;

import lombok.*;

import javax.persistence.*;

import java.util.ArrayList;
import java.util.List;

import org.hibernate.annotations.Formula;

@Getter
@Setter
@EqualsAndHashCode(of = {"id"})
@Entity
@Table(name = "ingredient")
public class Ingredient {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "name")
    private String name;

    @Column(name = "description")
    private String description;

    @Column(name = "img_path")
    private String imgPath;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinTable(name = "ingredient_ref", joinColumns = {@JoinColumn(name = "ingredient_id", nullable = false)}, inverseJoinColumns = {@JoinColumn(name = "parent_ingredient_id", nullable = false)})
    private Ingredient parent;

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "parent")
    private List<Ingredient> children;

}
