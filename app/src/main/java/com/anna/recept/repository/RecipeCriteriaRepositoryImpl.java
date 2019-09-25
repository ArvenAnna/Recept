package com.anna.recept.repository;

import com.anna.recept.dto.SearchRecipeParams;
import com.anna.recept.entity.Proportion;
import com.anna.recept.entity.Recipe;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Join;
import javax.persistence.criteria.JoinType;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;
import java.util.ArrayList;
import java.util.List;

@Repository
public class RecipeCriteriaRepositoryImpl implements RecipeCriteriaRepository {

    @Autowired
    EntityManager em;

    @Override
    public List<Recipe> findRecipesBySearchParams(SearchRecipeParams params) {
        CriteriaBuilder cb = em.getCriteriaBuilder();
        CriteriaQuery<Recipe> cq = cb.createQuery(Recipe.class);

        Root<Recipe> recipe = cq.from(Recipe.class);
        List<Predicate> predicates = new ArrayList<>();

        if (params.getSearch() != null) {
            Predicate searchInNamePredicate = cb.like(cb.upper(recipe.get("name")), "%" + params.getSearch().toUpperCase() + "%");
            Predicate searchInTextPredicate = cb.like(cb.upper(recipe.get("text")), "%" + params.getSearch().toUpperCase() + "%");
            Predicate searchPredicate = cb.or(searchInNamePredicate, searchInTextPredicate);

            predicates.add(searchPredicate);
        }

        if (params.getDepartmentId() != null) {
            predicates.add(cb.equal(recipe.get("department"), params.getDepartmentId()));
        }

        if (params.getRefs() != null && !params.getRefs().isEmpty()) {
            Predicate refsPredicate =  recipe.get("refs").in(params.getRefs().toArray());
            predicates.add(refsPredicate);
        }

        if (params.getIngredients() != null && !params.getIngredients().isEmpty()) {
            Join<Recipe, Proportion> propJoin = recipe.join("proportions", JoinType.INNER);
            Predicate propPredicate =  propJoin.get("ingredient").in(params.getIngredients().toArray());
            predicates.add(propPredicate);
        }

        cq.where(predicates.toArray(new Predicate[0]));

        return em.createQuery(cq).getResultList();
    }
}