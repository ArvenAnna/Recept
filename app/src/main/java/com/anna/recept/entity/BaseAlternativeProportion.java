package com.anna.recept.entity;

import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.MappedSuperclass;

@Getter
@Setter
@EqualsAndHashCode(of = {"id"})
@MappedSuperclass
public class BaseAlternativeProportion extends BaseProportion {

    @ManyToOne(fetch = FetchType.EAGER, optional = false)
    @JoinColumn(name = "proportion_id")
    private Proportion proportion;
}
