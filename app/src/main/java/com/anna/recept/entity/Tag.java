package com.anna.recept.entity;

import lombok.*;

import javax.persistence.*;

import com.anna.recept.dto.RecipeDto;

@Getter
@Setter
@EqualsAndHashCode(of = {"id"})
@Entity
@Table(name = "tag")
public class Tag {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Integer id;

    @Column(name = "name")
    private String name;

    public static Tag of(RecipeDto.TagDto dto) {
        Tag tag = new Tag();
        tag.setId(dto.getId());
        tag.setName(dto.getName());
        return tag;
    }
}
