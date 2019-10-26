ALTER TABLE public.proportion ADD optional boolean DEFAULT FALSE  NOT NULL;
ALTER TABLE public.proportion ADD alternative_proportion_id integer NULL;
ALTER TABLE public.proportion ADD alternative_ref_id integer NULL;

ALTER TABLE public.reference ADD norma varchar(150) NULL;
ALTER TABLE public.reference ADD optional boolean DEFAULT FALSE  NOT NULL;
ALTER TABLE public.reference ADD alternative_ref_id integer NULL;
ALTER TABLE public.reference ADD alternative_proportion_id integer NULL;

-- next iteration --

CREATE TABLE public.alternative_proportion
(
    id serial PRIMARY KEY NOT NULL,
    ingredient_id integer NOT NULL,
    norma varchar(150),
    optional boolean DEFAULT FALSE  NOT NULL,
    proportion_id integer NOT NULL,
    CONSTRAINT alternative_proportion_ingredient_id_fk FOREIGN KEY (ingredient_id) REFERENCES ingredient (id),
    CONSTRAINT alternative_proportion_proportion_id_fk FOREIGN KEY (proportion_id) REFERENCES proportion (id)
);
CREATE UNIQUE INDEX alternative_proportion_id_uindex ON public.alternative_proportion (id);
COMMENT ON TABLE public.alternative_proportion IS 'proportion that are interchangeable with main proportions';

ALTER TABLE public.proportion RENAME COLUMN ingridient_id TO ingredient_id;
ALTER TABLE public.proportion DROP alternative_proportion_id;
ALTER TABLE public.proportion DROP alternative_ref_id;


CREATE TABLE public.alternative_proportion_from_recipe
(
    id serial PRIMARY KEY NOT NULL,
    recipe_id integer NOT NULL,
    norma varchar(150),
    proportion_id integer NOT NULL,
    CONSTRAINT alternative_proportion_from_recipe_recipe_id_fk FOREIGN KEY (recipe_id) REFERENCES recipe (id),
    CONSTRAINT alternative_proportion_from_recipe_proportion_id_fk FOREIGN KEY (proportion_id) REFERENCES proportion (id)
);
CREATE UNIQUE INDEX alternative_proportion_from_recipe_id_uindex ON public.alternative_proportion_from_recipe (id);
COMMENT ON TABLE public.alternative_proportion_from_recipe IS 'Same as alternative proportion but among existing recipes instead of ingredients';

ALTER TABLE alternative_proportion DROP optional;

ALTER TABLE public.alternative_proportion_from_recipe RENAME TO alternative_proportion_from_recipes;

ALTER TABLE public.reference DROP alternative_ref_id;
ALTER TABLE public.reference DROP alternative_proportion_id;