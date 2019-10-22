package com.anna.recept.entity;

import javax.persistence.Column;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.MappedSuperclass;

import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@EqualsAndHashCode(of = {"id"})
@MappedSuperclass
public class BaseRecipeRef {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id")
	private Long id;

	@ManyToOne(fetch = FetchType.LAZY, optional = false)
	@JoinColumn(name = "recept_id")
	private Recipe recipe;

	@Column(name = "norma")
	private String norma;

	@Column(name="optional")
	private boolean optional;

	@Column(name="alternative_proportion_id")
	private Long alternativeProportionId;

	@Column(name="alternative_ref_id")
	private Long alternativeRefId;
}
