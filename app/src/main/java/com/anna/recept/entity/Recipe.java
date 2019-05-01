package com.anna.recept.entity;

import lombok.*;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import com.anna.recept.dto.RecipeDto;
import com.fasterxml.jackson.annotation.JsonFilter;

//@JsonFilter("Recipe")
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

    @OneToMany(mappedBy = "recipe", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.LAZY)
    private List<Detail> details = new ArrayList<>();

    @OneToMany(mappedBy = "recipe", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.LAZY)
    private List<Proportion> proportions = new ArrayList<>();

    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(name = "category", joinColumns = {@JoinColumn(name = "recept_id", nullable = false, updatable = false)},
                        inverseJoinColumns = {@JoinColumn(name = "tag_id", nullable = false, updatable = false)})
    private List<Tag> tags = new ArrayList<>();

    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(name = "reference", joinColumns = {@JoinColumn(name = "recept_id", nullable = false, updatable = false)},
            inverseJoinColumns = {@JoinColumn(name = "recept_reference_id", nullable = false, updatable = false)})
    private List<Recipe> refs = new ArrayList<>();

    public static Recipe of(RecipeDto dto) {
        Recipe recipe = new Recipe();
        recipe.setId(dto.getId());
        recipe.setName(dto.getName());
        recipe.setText(dto.getText());
        recipe.setImgPath(dto.getImgPath());
        recipe.setDepartment(Optional.ofNullable(dto.getDepartment()).map(Department::of).orElse(null));
        recipe.setTags(Optional.ofNullable(dto.getTags())
                .map(tags -> tags.stream().map(Tag::of).collect(Collectors.toList()))
                .orElse(new ArrayList<>()));
        recipe.setDetails(Optional.ofNullable(dto.getDetails())
                .map(details -> details.stream().map(detail -> Detail.of(detail, recipe)).collect(Collectors.toList()))
                .orElse(new ArrayList<>()));
        recipe.setProportions(Optional.ofNullable(dto.getProportions())
                .map(proportions -> proportions.stream().map(proportion -> Proportion.of(proportion, recipe)).collect(Collectors.toList()))
                .orElse(new ArrayList<>()));
        recipe.setRefs(Optional.ofNullable(dto.getRefs())
                .map(refs -> refs.stream().map(Recipe::of).collect(Collectors.toList()))
                .orElse(new ArrayList<>()));
        return recipe;
    }
}
