-- drop sequence file_ids;
-- CREATE TABLE public.ingredient_ref
-- (
--     id serial PRIMARY KEY NOT NULL,
--     ingredient_id int NOT NULL,
--     parent_ingredient_id int NOT NULL,
--     CONSTRAINT ingredient_ref_ingredient_id_fk FOREIGN KEY (ingredient_id) REFERENCES public.ingredient (id),
--     CONSTRAINT ingredient_ref_ingredient_id_fk_2 FOREIGN KEY (parent_ingredient_id) REFERENCES public.ingredient (id)
-- );
-- CREATE UNIQUE INDEX ingredient_ref_id_uindex ON public.ingredient_ref (id);
-- CREATE UNIQUE INDEX ingredient_ref_ingredient_id_uindex ON public.ingredient_ref (ingredient_id);
-- COMMENT ON TABLE public.ingredient_ref IS 'Parent-child bonds for ingredients';
--
-- ALTER TABLE public.ingredient DROP parent;


ALTER TABLE public.detail ADD detail_order int DEFAULT 1 NOT NULL;
