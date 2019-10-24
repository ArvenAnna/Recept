ALTER TABLE public.proportion ADD optional boolean DEFAULT FALSE  NOT NULL;
ALTER TABLE public.proportion ADD alternative_proportion_id integer NULL;
ALTER TABLE public.proportion ADD alternative_ref_id integer NULL;

ALTER TABLE public.reference ADD norma varchar(150) NULL;
ALTER TABLE public.reference ADD optional boolean DEFAULT FALSE  NOT NULL;
ALTER TABLE public.reference ADD alternative_ref_id integer NULL;
ALTER TABLE public.reference ADD alternative_proportion_id integer NULL;