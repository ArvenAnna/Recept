package com.anna.recept.service.impl;

import com.anna.recept.converter.DtoConverter;
import com.anna.recept.entity.Recept;
import com.anna.recept.entity.Tag;
import com.anna.recept.repository.ReceptRepository;
import com.anna.recept.repository.TagRepository;
import com.anna.recept.service.ITagService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class TagService implements ITagService {

    @Autowired
    private TagRepository tagRep;

    @Autowired
    private ReceptRepository receptRep;

    @Override
    public List<Tag> findTagsByRecept(Integer receptId) {
        return receptRep.findOne(receptId).getTags();
    }

    @Override
    @Transactional
    public void saveCategory(Integer receptId, Integer tagId) {
        Recept recept = receptRep.findOne(receptId);
        Tag tag = tagRep.findOne(tagId);
        recept.getTags().add(tag);
        receptRep.flush();
    }

    @Override
    @Transactional
    public void deleteTagFromRecept(Integer receptId, Integer tagId) {
        Recept recept = receptRep.findOne(receptId);
        Tag deletedTag = recept.getTags().stream().filter(tag -> tag.getId().equals(tagId)).findFirst().orElse(null);
        recept.getTags().remove(deletedTag);
        receptRep.flush();
    }

    @Override
    public List<Tag> findTags() {
        return tagRep.findAll().stream()
                .map(tag -> DtoConverter.toTagDto(tag))
                .collect(Collectors.toList());
    }
}
