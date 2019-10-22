package com.anna.recept.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;

//it is exists for performance reason - in order to populate ingredient's children without many joins (triggering lazy bond)
@Getter
@Setter
@EqualsAndHashCode(of = {"id"})
@Entity
@Table(name = "ingredient_ref")
public class IngredientRef {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id")
	private Long id;

	@Column(name = "ingredient_id")
	private Long ingredientId;

	@Column(name = "parent_ingredient_id")
	private Long parentIngredientId;
}
