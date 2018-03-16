package com.anna.recept.service.impl;

import com.anna.recept.entity.Ingridient;
import com.anna.recept.repository.IngridientRepository;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.runners.MockitoJUnitRunner;

import java.util.ArrayList;
import java.util.List;

import static org.hamcrest.core.Is.is;
import static org.junit.Assert.assertNotNull;
import static org.junit.Assert.assertThat;
import static org.mockito.Matchers.any;
import static org.mockito.Matchers.anyInt;
import static org.mockito.Mockito.*;

@RunWith(MockitoJUnitRunner.class)
public class IngridientServiceTest {

    private static final Integer INGRIDIENT_ID = 34;

    @InjectMocks
    private IngridientService sut;

    @Mock
    private IngridientRepository ingRep;

    private static Integer LIST_SIZE = 1;

    @Before
    public void setUp() {
        when(ingRep.findOne(anyInt())).thenReturn(new Ingridient());
        when(ingRep.findAll()).thenReturn(constructIngridientList(LIST_SIZE));
        when(ingRep.save(any(Ingridient.class))).thenReturn(constructIngridient());
    }

    private Ingridient constructIngridient() {
        Ingridient ingridient = new Ingridient();
        ingridient.setId(INGRIDIENT_ID);
        return ingridient;
    }

    @Test
    public void shouldShowIngridients() {
        List<Ingridient> ingridientList = sut.showAllIngridients();

        assertNotNull(ingridientList);
        assertThat(ingridientList.size(), is(LIST_SIZE));
        verify(ingRep).findAll();
    }

    @Test
    public void shouldDeleteIngridient() {
        sut.deleteIngridient(INGRIDIENT_ID);

        verify(ingRep).delete(INGRIDIENT_ID);
    }

    @Test
    public void shouldSaveIngridient() {
        Integer ingId = sut.saveIngridient(new Ingridient());

        //verify(ingRep).save(any());
        //assertThat(ingId, is(INGRIDIENT_ID));
    }

    @Test(expected = IllegalArgumentException.class)
    public void shouldNotSaveIngridient() {
        Ingridient ingridientDto = new Ingridient();
        ingridientDto.setId(INGRIDIENT_ID);
        Integer ingId = sut.saveIngridient(ingridientDto);
    }

    //@Test
    //public void shouldSaveUniqueIngridient() {
    //    when(ingRep.findByNameIgnoreCase(any())).thenReturn(new ArrayList<>());
    //    Integer ingId = sut.saveUniqueIngridient(new Ingridient());

        //verify(ingRep).save(any());
        //assertThat(ingId, is(INGRIDIENT_ID));

    //}

    //@Test(expected = ReceptApplicationException.class)
    //public void shouldNotSaveNotUniqueIngridient() {
    //    when(ingRep.findByNameIgnoreCase(any())).thenReturn(constructIngridientList(LIST_SIZE));
    //    sut.saveUniqueIngridient(new Ingridient());
    //}

    private List<Ingridient> constructIngridientList(int number) {
        List<Ingridient> ingList = new ArrayList<>();
        for (int i = 0; i < number; i++) {
            ingList.add(new Ingridient());
        }
        return ingList;
    }
}