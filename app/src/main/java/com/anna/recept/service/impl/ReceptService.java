package com.anna.recept.service.impl;

import com.anna.recept.converter.DtoConverter;
import com.anna.recept.entity.Recept;
import com.anna.recept.entity.Tag;
import com.anna.recept.exception.Errors;
import com.anna.recept.exception.ReceptApplicationException;
import com.anna.recept.repository.DepartmentRepository;
import com.anna.recept.repository.ReceptRepository;
import com.anna.recept.repository.TagRepository;
import com.anna.recept.service.IReceptService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.io.File;
import java.io.IOException;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class ReceptService implements IReceptService {

    private static final Integer ALL_RECEPTS_FETCH_FLAG = -1;

    @Autowired
    private ReceptRepository receptRep;

    @Autowired
    private TagRepository tagRep;

    @Autowired
    private DepartmentRepository departmentRep;

    @Autowired
    private FileService fileService;

//    @Autowired
//    private IAutoCompleteService autocompleteService;

    @Override
    @Transactional
    public Recept showRecept(Integer receptId) {
        return DtoConverter.withChildren(receptRep.findOne(receptId));
    }

    @Override
    @Transactional
    public void deleteRecept(Integer receptId) {
        receptRep.delete(receptId);
    }

    @Override
    @Transactional
    public List<Recept> showReceptDtos(Integer departId) {
        List<Recept> recepts;
        //TODO: remove this logic -1
        if (ALL_RECEPTS_FETCH_FLAG.equals(departId)) {
            recepts = receptRep.findAll();
        } else {
            recepts = departmentRep.findOne(departId).getRecepts();
        }
        return recepts.stream().map(recept -> DtoConverter.toReceptDto(recept)).collect(Collectors.toList());
    }

    @Override
    public Recept getRecept(Integer receptId) {
        return receptRep.findOne(receptId);
    }

    @Override
    @Transactional
    public Integer saveRecept(Recept recept) throws IOException {
        recept.getProportions().forEach(proportion -> proportion.setRecept(recept));
        List<Recept> refs = recept.getRefs().stream().map(ref -> receptRep.findOne(ref.getId())).collect(Collectors.toList());
        recept.setRefs(refs);
        List<Tag> tags = recept.getTags().stream().map(tag -> tagRep.findOne(tag.getId())).collect(Collectors.toList());
        recept.setTags(tags);
        tags.forEach(tag -> tag.getRecepts().add(recept));

        String fileName = departmentRep.findOne(recept.getDepartment().getId()).getName() + File.separator + recept.getName() + File.separator + recept.getName() + ".png";

        if (recept.getImgPath() != null) {
            recept.setImgPath(fileService.saveTempFile(recept.getImgPath(), fileName));
        }

        if ((recept.getId() == null && isUniqueReceptName(recept.getName()))
                || recept.getId() != null) {
            receptRep.save(recept);
            return recept.getId();
        }
        throw new ReceptApplicationException(Errors.RECEPT_NAME_NOT_UNIQUE);
    }

    @Override
    @Transactional
    public void saveFilePath(Integer receptId, String path) {
        Recept recept = receptRep.findOne(receptId);
        recept.setImgPath(path);
        receptRep.save(recept);
    }

    @Override
    @Transactional
    public List<Recept> showReceptsByTag(Integer tagId) {
        return tagRep.findOne(tagId).getRecepts();
    }

    @Override
    public Recept getRecept(String name) {
        return receptRep.findByName(name).stream().findFirst().orElse(null);
    }

    private boolean isUniqueReceptName(String name) {
        return receptRep.findByName(name).isEmpty();
    }
}
