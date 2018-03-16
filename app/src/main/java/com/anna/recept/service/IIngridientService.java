package com.anna.recept.service;

import com.anna.recept.entity.Ingridient;

import java.util.List;

public interface IIngridientService {
    Integer saveIngridient(Ingridient ingridient);

    Integer saveUniqueIngridient(Ingridient ingridient);

    void deleteIngridient(Integer ingId);

    List<Ingridient> showAllIngridients();
}
