package com.anna.recept.service.impl;

import com.anna.recept.entity.Ingredient;
import com.anna.recept.repository.IngredientRepository;
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
public class IngredientServiceTest {

    private static final Long INGREDIENT_ID = 34L;

    @InjectMocks
    private IngredientService sut;

    @Mock
    private IngredientRepository ingRep;

    private static Integer LIST_SIZE = 1;

    @Before
    public void setUp() {
        //when(ingRep.findOne(anyInt())).thenReturn(new Ingredient());
        when(ingRep.findAll()).thenReturn(constructIngridientList(LIST_SIZE));
        when(ingRep.save(any(Ingredient.class))).thenReturn(constructIngridient());
    }

    private Ingredient constructIngridient() {
        Ingredient ingredient = new Ingredient();
        ingredient.setId(INGREDIENT_ID);
        return ingredient;
    }

    @Test
    public void shouldShowIngridients() {
        List<Ingredient> ingredientList = sut.showAllIngredients();

        assertNotNull(ingredientList);
        assertThat(ingredientList.size(), is(LIST_SIZE));
        verify(ingRep).findAll();
    }

    @Test
    public void shouldDeleteIngridient() {
        sut.deleteIngredient(INGREDIENT_ID);

        verify(ingRep).deleteById(INGREDIENT_ID);
    }

    @Test(expected = IllegalArgumentException.class)
    public void shouldNotSaveIngridient() {
        Ingredient ingredientDto = new Ingredient();
        ingredientDto.setId(INGREDIENT_ID);
        Long ingId = sut.saveIngredient(ingredientDto).getId();
    }

    //@Test
    //public void shouldSaveUniqueIngridient() {
    //    when(ingRep.findByNameIgnoreCase(any())).thenReturn(new ArrayList<>());
    //    Integer ingId = sut.saveUniqueIngridient(new Ingredient());

        //verify(ingRep).save(any());
        //assertThat(ingId, is(INGREDIENT_ID));

    //}

    //@Test(expected = RecipeApplicationException.class)
    //public void shouldNotSaveNotUniqueIngridient() {
    //    when(ingRep.findByNameIgnoreCase(any())).thenReturn(constructIngridientList(LIST_SIZE));
    //    sut.saveUniqueIngridient(new Ingredient());
    //}

    private List<Ingredient> constructIngridientList(int number) {
        List<Ingredient> ingList = new ArrayList<>();
        for (int i = 0; i < number; i++) {
            ingList.add(new Ingredient());
        }
        return ingList;
    }
}