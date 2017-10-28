package com.anna.recept.service.impl;

import com.anna.recept.converter.DtoConverter;
import com.anna.recept.entity.Ingridient;
import com.anna.recept.exception.Errors;
import com.anna.recept.exception.ReceptApplicationException;
import com.anna.recept.repository.IngridientRepository;
import com.anna.recept.service.IIngridientService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.Assert;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class IngridientService implements IIngridientService {

    @Autowired
    private IngridientRepository ingRep;

    @Override
    @Transactional
    public Integer saveIngridient(Ingridient ingridient) {
        Assert.isNull(ingridient.getId(), Errors.ID_MUST_BE_NULL.getCause());
        ingRep.saveAndFlush(ingridient);
        return ingridient.getId();
    }

    @Override
    public Integer saveUniqueIngridient(Ingridient ingridient) {
        if (isUniqueIngridientName(ingridient.getName())) {
            return saveIngridient(ingridient);
        }
        throw new ReceptApplicationException(Errors.INGRIDIENT_NAME_NOT_UNIQUE);
    }

    private boolean isUniqueIngridientName(String name) {
        return !name.isEmpty() && ingRep.findByNameIgnoreCase(name).isEmpty();
    }

    @Override
    @Transactional
    public void deleteIngridient(Integer ingId) {
        ingRep.delete(ingId);
    }

    @Override
    @Transactional
    public List<Ingridient> showAllIngridients() {
        return ingRep.findAll().stream()
                .map(ing -> DtoConverter.toIngridientDto(ing))
                .collect(Collectors.toList());
    }

}
