package com.anna.recept.entity;

import lombok.*;

import javax.persistence.*;

import com.anna.recept.dto.RecipeDto;

@Getter
@Setter
@EqualsAndHashCode(of = {"id"})
@Entity
@Table(name = "detail")
public class Detail {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "description")
    private String description;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "recept_id")
    private Recipe recipe;

    @Column(name = "file")
    private String filePath;

    @Column(name = "detail_order")
    private Integer order;

    public static Detail of(RecipeDto.DetailDto dto) {
        Detail detail = new Detail();
        detail.setId(dto.getId());
        detail.setDescription(dto.getDescription());
        detail.setFilePath(dto.getFilePath());
        return detail;
    }

    public static Detail of(RecipeDto.DetailDto dto, Recipe recipe) {
        Detail detail = of(dto);
        detail.setRecipe(recipe);
        return detail;
    }
}
