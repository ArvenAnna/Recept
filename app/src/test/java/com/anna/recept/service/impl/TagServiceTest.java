package com.anna.recept.service.impl;

import com.anna.recept.entity.Tag;
import com.anna.recept.repository.TagRepository;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.runners.MockitoJUnitRunner;

import java.util.ArrayList;
import java.util.List;

import static org.junit.Assert.assertNotNull;
import static org.mockito.Matchers.anyInt;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@RunWith(MockitoJUnitRunner.class)
public class TagServiceTest {

    @InjectMocks
    private TagService sut;

    @Mock
    private TagRepository tagRep;

    private static Integer LIST_SIZE = 1;
    private static Integer TAG_ID = 13;


    @Before
    public void setUp() {
        when(tagRep.findAll()).thenReturn(constructTagList(LIST_SIZE));
        //when(tagRep.findById((anyInt())).thenReturn(new Tag());
    }

    @Test
    public void shouldFindTags() {
        List<Tag> tags = sut.findTags();

        assertNotNull(tags);
        verify(tagRep).findAll();
    }

    private List<Tag> constructTagList(int number) {
        List<Tag> tagList = new ArrayList<>();
        for (int i = 0; i < number; i++) {
            tagList.add(new Tag());
        }
        return tagList;
    }
}
