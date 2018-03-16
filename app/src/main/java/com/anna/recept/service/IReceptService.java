package com.anna.recept.service;

import com.anna.recept.entity.Recept;

import java.io.IOException;
import java.util.List;

public interface IReceptService {
    List<Recept> showReceptDtos(Integer departId);

    Recept getRecept(Integer receptId);

    Integer saveRecept(Recept recept) throws IOException;

    void saveFilePath(Integer receptId, String path);

    List<Recept> showReceptsByTag(Integer tagId);

    Recept getRecept(String name);

    Recept showRecept(Integer receptId);

    void deleteRecept(Integer receptId);
}
