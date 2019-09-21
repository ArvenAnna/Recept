ALTER TABLE public.recept RENAME TO recipe;
ALTER TABLE public.ingridient RENAME TO ingredient;
ALTER TABLE public.dapart RENAME TO depart;
ALTER TABLE public.ingredient ADD description varchar NULL;
ALTER TABLE public.ingredient ADD img_path varchar NULL;
ALTER TABLE public.ingredient ADD parent int NULL;