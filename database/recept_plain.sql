--
-- PostgreSQL database dump
--

-- Dumped from database version 9.6.12
-- Dumped by pg_dump version 9.6.12

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: plpgsql; Type: EXTENSION; Schema: -; Owner: 
--

CREATE EXTENSION IF NOT EXISTS plpgsql WITH SCHEMA pg_catalog;


--
-- Name: EXTENSION plpgsql; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION plpgsql IS 'PL/pgSQL procedural language';


SET default_tablespace = '';

SET default_with_oids = false;

--
-- Name: alternative_proportion; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.alternative_proportion (
    id integer NOT NULL,
    ingredient_id integer NOT NULL,
    norma character varying(150),
    proportion_id integer NOT NULL
);


ALTER TABLE public.alternative_proportion OWNER TO postgres;

--
-- Name: TABLE alternative_proportion; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON TABLE public.alternative_proportion IS 'proportion that are interchangeable with main proportions';


--
-- Name: alternative_proportion_from_recipes; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.alternative_proportion_from_recipes (
    id integer NOT NULL,
    recipe_id integer NOT NULL,
    norma character varying(150),
    proportion_id integer NOT NULL
);


ALTER TABLE public.alternative_proportion_from_recipes OWNER TO postgres;

--
-- Name: TABLE alternative_proportion_from_recipes; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON TABLE public.alternative_proportion_from_recipes IS 'Same as alternative proportion but among existing recipes instead of ingredients';


--
-- Name: alternative_proportion_from_recipe_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.alternative_proportion_from_recipe_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.alternative_proportion_from_recipe_id_seq OWNER TO postgres;

--
-- Name: alternative_proportion_from_recipe_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.alternative_proportion_from_recipe_id_seq OWNED BY public.alternative_proportion_from_recipes.id;


--
-- Name: alternative_proportion_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.alternative_proportion_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.alternative_proportion_id_seq OWNER TO postgres;

--
-- Name: alternative_proportion_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.alternative_proportion_id_seq OWNED BY public.alternative_proportion.id;


--
-- Name: category_ids; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.category_ids
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.category_ids OWNER TO postgres;

--
-- Name: category; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.category (
    id integer DEFAULT nextval('public.category_ids'::regclass) NOT NULL,
    recept_id integer NOT NULL,
    tag_id integer NOT NULL
);


ALTER TABLE public.category OWNER TO postgres;

--
-- Name: dapart_ids; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.dapart_ids
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.dapart_ids OWNER TO postgres;

--
-- Name: department; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.department (
    id integer DEFAULT nextval('public.dapart_ids'::regclass) NOT NULL,
    name character varying(120) NOT NULL
);


ALTER TABLE public.department OWNER TO postgres;

--
-- Name: detail_ids; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.detail_ids
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.detail_ids OWNER TO postgres;

--
-- Name: detail; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.detail (
    id integer DEFAULT nextval('public.detail_ids'::regclass) NOT NULL,
    description text,
    recept_id integer NOT NULL,
    file character varying,
    detail_order integer DEFAULT 1 NOT NULL
);


ALTER TABLE public.detail OWNER TO postgres;

--
-- Name: ingridient_ids; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.ingridient_ids
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.ingridient_ids OWNER TO postgres;

--
-- Name: ingredient; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.ingredient (
    id integer DEFAULT nextval('public.ingridient_ids'::regclass) NOT NULL,
    name character varying(150) NOT NULL,
    description character varying,
    img_path character varying
);


ALTER TABLE public.ingredient OWNER TO postgres;

--
-- Name: ingredient_ref; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.ingredient_ref (
    id integer NOT NULL,
    ingredient_id integer NOT NULL,
    parent_ingredient_id integer NOT NULL
);


ALTER TABLE public.ingredient_ref OWNER TO postgres;

--
-- Name: TABLE ingredient_ref; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON TABLE public.ingredient_ref IS 'Parent-child bonds for ingredients';


--
-- Name: ingredient_ref_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.ingredient_ref_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.ingredient_ref_id_seq OWNER TO postgres;

--
-- Name: ingredient_ref_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.ingredient_ref_id_seq OWNED BY public.ingredient_ref.id;


--
-- Name: proportion_ids; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.proportion_ids
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.proportion_ids OWNER TO postgres;

--
-- Name: proportion; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.proportion (
    id integer DEFAULT nextval('public.proportion_ids'::regclass) NOT NULL,
    recept_id integer NOT NULL,
    ingredient_id integer NOT NULL,
    norma character varying(150),
    optional boolean DEFAULT false NOT NULL
);


ALTER TABLE public.proportion OWNER TO postgres;

--
-- Name: recept_ids; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.recept_ids
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.recept_ids OWNER TO postgres;

--
-- Name: recipe; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.recipe (
    text text,
    name character varying(200) NOT NULL,
    depart_id integer NOT NULL,
    id integer DEFAULT nextval('public.recept_ids'::regclass) NOT NULL,
    file character varying
);


ALTER TABLE public.recipe OWNER TO postgres;

--
-- Name: reference_ids; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.reference_ids
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.reference_ids OWNER TO postgres;

--
-- Name: reference; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.reference (
    id integer DEFAULT nextval('public.reference_ids'::regclass) NOT NULL,
    recept_id integer NOT NULL,
    recept_reference_id integer NOT NULL,
    norma character varying(150),
    optional boolean DEFAULT false NOT NULL
);


ALTER TABLE public.reference OWNER TO postgres;

--
-- Name: tag_ids; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.tag_ids
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.tag_ids OWNER TO postgres;

--
-- Name: tag; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.tag (
    id integer DEFAULT nextval('public.tag_ids'::regclass) NOT NULL,
    name character varying(150) NOT NULL
);


ALTER TABLE public.tag OWNER TO postgres;

--
-- Name: alternative_proportion id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.alternative_proportion ALTER COLUMN id SET DEFAULT nextval('public.alternative_proportion_id_seq'::regclass);


--
-- Name: alternative_proportion_from_recipes id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.alternative_proportion_from_recipes ALTER COLUMN id SET DEFAULT nextval('public.alternative_proportion_from_recipe_id_seq'::regclass);


--
-- Name: ingredient_ref id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.ingredient_ref ALTER COLUMN id SET DEFAULT nextval('public.ingredient_ref_id_seq'::regclass);


--
-- Data for Name: alternative_proportion; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.alternative_proportion (id, ingredient_id, norma, proportion_id) FROM stdin;
1	203	50мл	2002
2	162	пара кристаллов	2011
\.


--
-- Name: alternative_proportion_from_recipe_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.alternative_proportion_from_recipe_id_seq', 1, false);


--
-- Data for Name: alternative_proportion_from_recipes; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.alternative_proportion_from_recipes (id, recipe_id, norma, proportion_id) FROM stdin;
\.


--
-- Name: alternative_proportion_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.alternative_proportion_id_seq', 2, true);


--
-- Data for Name: category; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.category (id, recept_id, tag_id) FROM stdin;
30	137	1
31	104	1
32	109	1
33	5	1
34	129	1
35	123	1
36	139	1
37	145	1
38	151	1
39	143	1
40	56	1
43	13	1
44	19	1
45	149	1
46	16	1
47	144	1
48	148	1
49	147	1
50	141	1
51	32	1
52	152	1
\.


--
-- Name: category_ids; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.category_ids', 52, true);


--
-- Name: dapart_ids; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.dapart_ids', 9, true);


--
-- Data for Name: department; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.department (id, name) FROM stdin;
1	Первые блюда
2	Вторые блюда
3	Десерты
4	Тесто
5	Крема
6	Салаты
7	Консервация
8	Соусы
9	Напитки
10	Заготовки для рецептов
\.


--
-- Data for Name: detail; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.detail (id, description, recept_id, file, detail_order) FROM stdin;
406	Залитый творожок	143	Десерты/Творожный пирог/Творожный пирог14e1cc76-61e3-46fb-81b2-91267abb2025.png	1
407	Тесто с какао	143	Десерты/Творожный пирог/Творожный пирог53ab05cc-ac03-4c39-ae21-eb1ba5795ced.png	1
408	С вишнёвым муссом	143	Десерты/Творожный пирог/Творожный пирог4f97178d-f32d-4e49-8d16-69eabe183726.png	1
409	Кусочек	143	Десерты/Творожный пирог/Творожный пирогa01e5f34-a5df-413f-bd37-9dec4cefa7c9.png	1
410	С персиковым муссом	143	Десерты/Творожный пирог/Творожный пирогd8e200ee-b419-4beb-8865-6897ae4c27c2.png	1
431	Без украшений	154	Салаты/Мой генерал/Мой генерал991902fa-5ed2-4266-82f0-7760df885076.png	1
436	Ингридиенты	200	Салаты/Тёплый салат с фасолью и свининой/Тёплый салат с фасолью и свининой93ab812b-4d6c-4bf9-8d3f-b12add385d5c.png	1
447	Одним слоем	3	Вторые блюда/Свинина по-степному/Свинина по-степномуddbb545b-10b0-478a-84e3-38cfd221dcb3.png	1
596	Ревнево-мятная шарлотка	117	Десерты/Шарлотка/Шарлоткаc27dd41a-884b-48e4-b582-a56771450ac2.JPG	4
597	Порезать стебли ревеня	117	Десерты/Шарлотка/Шарлоткаbf21848c-8b1a-423d-aeec-f7e1d257d818.JPG	5
598	Приготовить продукты для бисквита	117	Десерты/Шарлотка/Шарлотка5d9ed39f-bffc-4695-aead-ad188bc67945.JPG	6
599	Мяту нарезать, яйца взбить с сахаром.	117	Десерты/Шарлотка/Шарлоткаc41c106d-e090-47c1-a0b3-ebdf2f8b8718.JPG	7
601	Перемешать	117	Десерты/Шарлотка/Шарлоткаa1271714-2e4c-4e75-8838-da64b7eb9f54.JPG	10
602	Добавить ревень в бисквит.	117	Десерты/Шарлотка/Шарлоткаd8073e06-cfc9-4573-9d68-f0a53e2cf1d4.JPG	9
603	Вылить в форму.	117	Десерты/Шарлотка/Шарлоткаa3262f54-298a-4d3b-8efe-f17c9997b7fc.JPG	11
604	Выпечь 20-25 минут при 190 градусах	117	Десерты/Шарлотка/Шарлотка98b5796f-3173-43ba-af75-096661acc801.JPG	12
605	В разрезе	117	Десерты/Шарлотка/Шарлоткаcd21b6d7-b81d-40c2-923e-a63d1cbd37bf.JPG	13
333	Вариант в мультиварке (без разрыхлителя), предварительно смазав чашу мультиварки маслом, 40минут в режиме "Выпечка"	117	Десерты/Шарлотка/Шарлоткаae3e9c38-3bfb-4ac0-9a98-95a9e4e41c9f.png	3
600	Добавить муку и мяту в бисквит.	117	Десерты/Шарлотка/Шарлоткаc65b1a49-7f48-4b99-8441-101cbcc0fae5.JPG	8
578	осетинская аджика:\nперец болгарский - 300г\nперец жгучий - 100г\nчеснок - 200г\nтоматный сок - 1кг (перекруч.помидоры)\nзелень - пучок\nяблоки - 1кг\nсоль - 3ст.л.\nсахар - 1ст.л. (от сорта яблок)\n\nвсе в мясорубку, 30мин варить	216	Консервация/Аджика/Аджикаb49d1c2a-6e20-4a8c-885e-e605eba39916.JPG	1
579	хреновина\n\nперец болгарский - 300г\nхрен - 60г\nчеснок - 40г\nпомидор - 1кг (перекруч.помидоры)\nсоль - 2ст.л.\nсахар - 2ст.л. (а нужно біло чайніх)\n\nвсе в мясорубку, 30мин варить	216	Консервация/Аджика/Аджика217561bd-9506-405e-9a72-a592c1b148d7.JPG	2
580	ничего лишнего\nперец болгарский - 1,5кг\nперец жгучий - 3-7шт\nчеснок - 300г\nпомидор - 3кг\nзелень - пучок\nсоль - 7ст.л.\nсахар - 4ст.л. (от сорта яблок)\n\nтоматі варить 30мин, доюавить перці, чеснок - 20-30мин, петрушка 5-10мин	216	Консервация/Аджика/Аджикаcf0de9ed-aeab-4edf-8416-38e2e6613153.JPG	3
611	Клубника в креме	236	Десерты/Торт Ах Лето/Торт Ах Лето8fe496db-28dc-416c-ab24-913676463c71.JPG	1
612	Собранный торт	236	Десерты/Торт Ах Лето/Торт Ах Летоc48b81ce-77f6-487a-93d4-f360143d6965.JPG	2
613	Облепленный орехами	236	Десерты/Торт Ах Лето/Торт Ах Летоd139b4a1-7989-4d65-a0fa-332ee476c59c.JPG	3
614	В разрезе	236	Десерты/Торт Ах Лето/Торт Ах Летоe9759840-155b-496a-84f4-66d67b66116e.JPG	4
615	Кусочек	236	Десерты/Торт Ах Лето/Торт Ах Лето8251d1f9-fcae-4c73-aa85-6ba7342f84c7.JPG	5
616	Кусочек с другого ракурса	236	Десерты/Торт Ах Лето/Торт Ах Лето0cdbfb3a-3e74-4ecc-a7a0-988610328dfe.JPG	6
411	Ингридиенты для марципана	209	Десерты/Марципан/Марципанd5f6c5ca-9881-4bf8-a125-a6bbf59e7691.png	1
412	Миндальная мука	209	Десерты/Марципан/Марципанe3811afc-e11a-4889-9d6e-3040290fae67.png	1
413	Кипящий сироп	209	Десерты/Марципан/Марципан09ef97b9-9533-41c3-867b-e64a656c3f7b.png	1
414	Марципановое тесто	209	Десерты/Марципан/Марципан34452551-07c4-491a-a736-ea932adb8856.png	1
415	Изделия из марципана	209	Десерты/Марципан/Марципанc0a26e72-b962-4778-a188-dcb93e585262.png	1
416	Марципановые шарики в растопленном шоколаде	209	Десерты/Марципан/Марципанff79b02f-c4cd-45ad-9f3a-73113dd098de.png	1
417	Изделия из марципана с шоколадом более хрупкие	209	Десерты/Марципан/Марципан41722eca-beec-48ef-8d85-30e00b62188a.png	1
432	Ингридиенты	201	Салаты/Жареный петушок/Жареный петушокd13d6a48-7fa0-47b5-a91a-626867b9dff7.png	1
437	Порция	52	Вторые блюда/Баклажаны, запеченные с овощами/Баклажаны, запеченные с овощами5c4b3dc7-49e7-4e0a-9e47-e13843baebd0.png	1
307	Зажарка к супу.	2	Первые блюда/Суп с крапивой/Суп с крапивой8891736a-7df5-422d-a899-8da9dfb29a1e.png	1
581	порезанный ревень в воде	224	Напитки/Лимонад с ревеня и мяты/Лимонад с ревеня и мяты59dc0d59-8b1a-456a-8a44-e09d98de7c5c.JPG	1
582	Со льдом и мятой	224	Напитки/Лимонад с ревеня и мяты/Лимонад с ревеня и мятыc88b12a0-b94d-49f9-b9f3-8a7df98449db.JPG	2
606	Аджика из слив с яблоками: \n Все помытые и очищенные ингредиенты измельчаем на мясорубке. Перекладываем в кастрюлю и варим 15 минут, периодически помешивая.  Добавляем соль, специи, сахар, варим еще 15-20 минут.\n\nАДЖИКА ИЗ СЛИВ С ЯБЛОКАМИ (пропорции как я делала в скобочках)\nСливы 1 кг  (1,5кг)\n\tЯблоки 200 г (300г)\n\tЧеснок 100 г (150г)\n\tБолгарский перец 200 г (300г)\n\tПомидоры 400 г (600г)\n\tСоль 1 ст.л. (1,5 ст.л.)\n\tСахар  100 г (150г)\n\tПерец острый стручковый 50 г (60г)\n\nвроде получилась совсем не острая\nиз продуктов по пропорциям в скобочках получилось 2 литрове банки и еще где-то 350мл	216	Консервация/Аджика/Аджика397fae81-8cd6-4346-b59e-4d0876098a8e.JPG	4
607	результат	216	Консервация/Аджика/Аджикаfd57e2bd-d5b5-4ae5-a9b3-6bf88a5aac24.JPG	5
418	Кусочки бананов залитые панна коттой	208	Десерты/Панна котта/Панна котта8509e1ab-5e59-457b-bb5f-b54e50a738d2.png	1
419	Панна котта со свежей малиной	208	Десерты/Панна котта/Панна котта423b47c4-9c4d-4946-96d9-2f8071bd58ee.png	1
420	Панна котта напополам с желе	208	Десерты/Панна котта/Панна коттаcdd59716-010d-4e3a-ac96-dc140c53e678.png	1
421	Шоколадная панна котта (с добавлением какао) с присыпкой из тёртых орехов	208	Десерты/Панна котта/Панна коттаbffa71d8-5abc-4fb1-8046-24294956ec61.png	1
422	Панна котта с манговым сиропом, застывшая в причудливой форме.	208	Десерты/Панна котта/Панна котта63fdcebf-ad18-447d-8fa3-adce3360585c.png	1
423	Желе с кусочками винограда и панна коттой	208	Десерты/Панна котта/Панна коттаf1805bcb-6b14-4c62-a208-e7978b98b6c1.png	1
424	Панна котта с тёртым кокосом	208	Десерты/Панна котта/Панна котта7a1f5ff3-92c3-4bc7-95d3-53f865888968.png	1
433	с фасолью	158	Салаты/Cалат из редьки/Cалат из редькиea5e034f-4ec1-4b23-9d42-db08da692fbc.png	1
438	Без картофеля и соленых огурцов в виде апельсиновой дольки	153	Салаты/Грибная поляна/Грибная поляна3c3fe24f-e6a0-4a07-870a-03e2cbf873c8.png	1
439	Большая порция	153	Салаты/Грибная поляна/Грибная поляна7f35f91c-d5ca-4f36-abe5-c68e1cf7198e.png	1
440	И еще	153	Салаты/Грибная поляна/Грибная полянаcfc57a85-399e-4da6-b809-bb46c392a416.png	1
425	Порезанный хлеб	196	Салаты/Цезарь/Цезарьd2c0d2c8-e21a-4e41-9ee0-1aeaa054576a.png	1
434	Смешанные ингридиенты	115	Салаты/Салат с мясом и овощами/Салат с мясом и овощами0806b99d-8d26-4e89-88c4-e71db4093416.png	1
441	Ингридиенты для салата	210	Салаты/Салат из куриных сердечек с грибами/Салат из куриных сердечек с грибамиee204ec2-5ee5-47a4-b460-4e6c882c9610.png	1
442	Нарезанные сердечки	210	Салаты/Салат из куриных сердечек с грибами/Салат из куриных сердечек с грибами9859cc61-8bfe-4bd4-9223-0eb7ae93c569.png	1
443	Укрыты яйцами	210	Салаты/Салат из куриных сердечек с грибами/Салат из куриных сердечек с грибами0039e846-8469-49b1-9cff-c90ea0c88630.png	1
444	Вареной морковью	210	Салаты/Салат из куриных сердечек с грибами/Салат из куриных сердечек с грибами0e1d7b50-24b9-4ed1-aafd-c7a101eefe83.png	1
445	Огурцами	210	Салаты/Салат из куриных сердечек с грибами/Салат из куриных сердечек с грибами9b046c46-6524-4392-84c0-9391acb69e12.png	1
428	Оформление с красной икрой	162	Салаты/Морская звезда/Морская звезда73fb19ae-e5f6-4a8a-998c-d172a5216305.png	1
429	В виде рулета без сыра	162	Салаты/Морская звезда/Морская звезда42b0d2ec-25c8-4577-a2bf-026db255350a.png	1
435	Без украшений	50	Салаты/Любовница/Любовница3e621d59-6091-48b3-a168-075b02baa32b.JPG	1
446	С картошечкой	12	Вторые блюда/Вареники/Вареники150396c4-4c43-4f80-9c56-636fde24efbc.png	1
583	Яйца на бисквит	225	Десерты/Торт Ягодная поляна в лесу/Торт Ягодная поляна в лесу4eed5e5f-bb27-443a-8781-6c6b06ce613c.jpg	1
584	С сахаром	225	Десерты/Торт Ягодная поляна в лесу/Торт Ягодная поляна в лесуe0554f32-43ef-4dd3-a4d3-677a59c26200.jpg	2
608	Сацебели 2: ингридиенты	234	Консервация/Сацебели/Сацебелиad67baaa-108e-4852-9e94-8f2685dc027e.jpg	1
426	Продукты для соуса	196	Салаты/Цезарь/Цезарьe3f7ae5e-edf7-4753-8c72-bd1a7df9ebd2.png	2
427	С томатами черри	196	Салаты/Цезарь/Цезарьc0f11057-4b5d-4ed2-969e-57bbc2be234a.png	3
308	С лёгким дымком	190	Напитки/Марокканский чай по-генически/Марокканский чай по-геническиa1ffe89c-848a-44f3-b904-d5c6bb181c8a.png	1
309	Макароны в сырном соусе	205	Соусы/Сырный соус/Сырный соус742472e8-df79-4c90-b646-30ffca70ffe8.png	1
310	Хранить больше месяца не рекомендуется	100	Консервация/Тушенка/Тушенка848ec39c-a5d9-461a-b81d-55e83ec4dcd3.png	1
311	Вскрытая баночка	204	Консервация/Сладкий сливовый соус/Сладкий сливовый соус0632087b-3bde-4637-8737-a4fcb3f2a1cf.png	1
312	Яблоки - заготовка на пирожки, с сахаром	62	Консервация/Фрукты в собственном соку/Фрукты в собственном сокуe2fdd50e-a5af-42d0-9be1-2d0c66003019.png	1
313	Яблоки - заготовка на пирожки, с сахаром	62	Консервация/Фрукты в собственном соку/Фрукты в собственном соку39047229-0b11-430b-8c00-27d96852b983.png	1
314	Белая черешня без сахара	62	Консервация/Фрукты в собственном соку/Фрукты в собственном соку49716aa5-3961-493e-b4b0-27c1acd08e5d.png	1
315	Консервированный персик	62	Консервация/Фрукты в собственном соку/Фрукты в собственном соку7c284ec0-5687-4c41-af0a-8dd29a481b46.png	1
316	Слива "венгерка" в собственном соку	62	Консервация/Фрукты в собственном соку/Фрукты в собственном соку9cf0077c-2c40-4b90-9e72-3be7d94f81db.png	1
317	Слива "венгерка" в собственном соку	62	Консервация/Фрукты в собственном соку/Фрукты в собственном соку4148f043-abb5-42f1-a65e-f02583c4cb43.png	1
318	Красная черешня без сахара	62	Консервация/Фрукты в собственном соку/Фрукты в собственном соку4111f111-b37c-4689-8a29-2d1b64d7a33a.png	1
319	Продукты для теста	188	Тесто/Тесто для галеты/Тесто для галеты5397b15a-17f9-4770-8717-fff03d605fd6.png	1
320	В мультиварке\n	6	Тесто/Бисквит/Бисквитc8b41c10-d1f6-4ab3-a5ce-92764a36a3f6.png	1
321	Пирожки с повидлом	8	Тесто/Сдобное дрожжевое тесто 1/Сдобное дрожжевое тесто 129aaf6cf-b2df-4a21-a1cd-a3249e43fae9.png	1
322	Готовое изделие	8	Тесто/Сдобное дрожжевое тесто 1/Сдобное дрожжевое тесто 1179f2b75-fe9a-49e0-b95d-e94ed6bb3c62.png	1
609	Все в мясорубку	234	Консервация/Сацебели/Сацебелиd024555d-c3a6-42df-9bb6-f199aca56c6d.jpg	2
323	В салатнице	49	Салаты/Мимоза/Мимозаd56c44da-8fc4-42e6-825c-06b20eb9141e.png	1
324	С мышкой из яйца	49	Салаты/Мимоза/Мимоза982ce8a5-0626-4407-8f3d-f2218120709e.png	1
325	Со взбитыми сливками сверху	72	Десерты/Желе/Желе4cb30501-345d-4d8f-928e-3287479a9ab0.JPG	1
326	Желейный пирог из агар-агара	72	Десерты/Желе/Желе3a0ff6d3-46de-42aa-901d-244d6a978246.JPG	1
327	Из темного шоколада	89	Десерты/Спящий вулкан/Спящий вулкан9e7dd7f3-cb92-4740-90d6-5200d6a31a53.png	1
328	Из молочного шоколада	89	Десерты/Спящий вулкан/Спящий вулкан2801cd10-9ccf-48ad-8034-ba63637c17c7.png	1
329	Творожная запеканка с изюмом	109	Десерты/Запеканка в мультиварке/Запеканка в мультиварке9f3b93da-1085-4483-9cf4-e4d75bbba639.png	1
330	Пирог с нутеллой	74	Десерты/Бисквитный торт/Бисквитный торт0f666e9c-988c-46e8-9e3e-8a26ecf43cfd.png	1
331	В разрезе	117	Десерты/Шарлотка/Шарлоткаeae73ba5-d513-4e1f-b387-1c0b710d05e6.png	1
334	В готовом виде с крышкой	121	Десерты/Шкатулка/Шкатулка56791ea1-18c5-4b59-9028-dc2c966fd51a.png	1
335	В разрезе	121	Десерты/Шкатулка/Шкатулкаe89540fb-79e1-442b-86c3-6c670b34f9fd.png	1
336	Корж для основы	64	Десерты/Графские развалины/Графские развалины73450201-0d41-4e33-b4fa-785f57fe301e.png	1
337	Корж для "горки"	64	Десерты/Графские развалины/Графские развалины68632a7e-d071-4931-a4dc-c296f286dfe9.png	1
338	"Горка" в крему\n	64	Десерты/Графские развалины/Графские развалиныa73c36fc-700c-46a8-ba5a-1dc03e606edb.png	1
339	Покрытие взбитыми сливками	64	Десерты/Графские развалины/Графские развалины030b008f-745c-4bae-bb3f-21227b159c37.png	1
340	Итог ...	64	Десерты/Графские развалины/Графские развалины0bd2d75b-551a-4efc-97f4-19cd9270ea2d.png	1
341	Вид сверху	64	Десерты/Графские развалины/Графские развалины9637abf4-1ce6-4562-9bfd-7b6d9af70689.png	1
342	Пицца с малиновым сиропом (малина + сахар), после выпекания смазана маскарпоне, украшена свежей малиной и фундуком	82	Десерты/Пицца фруктовая/Пицца фруктоваяda9b8f2c-bc06-4fdf-a28c-b369c12e26ee.png	1
343	Вариант без маскарпоне	82	Десерты/Пицца фруктовая/Пицца фруктоваяacc296ba-a673-42d3-9dcc-146894b97c4b.png	1
344	Из более жидкого теста	145	Десерты/Шоколадно-твоpожный пиpог/Шоколадно-твоpожный пиpогb3d51d58-d262-4ce2-a1b9-e044ee09a4bf.png	1
345	С присыпкой	145	Десерты/Шоколадно-твоpожный пиpог/Шоколадно-твоpожный пиpогe9879c61-ecb0-437f-bdf3-e8ae2a49c83a.png	1
346	Печенье без глазури	86	Десерты/Печенье лимонное/Печенье лимонноеd977f084-e70f-4e46-9c7e-24ee0bcb5d82.png	1
347	Количество пирожных из указанных пропорций	29	Десерты/Медовое пирожное/Медовое пирожноеe53b4765-1b5d-45ed-9a8e-3e06c31a8e5d.png	1
348	Сдобные булки	70	Десерты/Булочки с корицей/Булочки с корицей3c3a8ea1-7c8a-484f-86c1-cc11172c1770.png	1
349	Сырники с мукой	132	Десерты/Сырники/Сырникиe55f0238-2f35-4342-9866-9c79babc2015.png	1
350	В разрезе	151	Десерты/Кекс шоколадный/Кекс шоколадный87d55e39-0111-413a-8872-5e6235939385.png	1
351	Из 10 коржей	67	Десерты/Наполеон/Наполеонb997fbba-72e6-4918-8586-5afeadbc45eb.png	1
352	Сырая, уложенная в форму для выпекания.	202	Десерты/Творожная запеканка Нежная/Творожная запеканка Нежнаяa3c052cb-d97c-49e8-83fc-5fbc44f67d74.png	1
353	Готовая	202	Десерты/Творожная запеканка Нежная/Творожная запеканка Нежнаяeecb0af2-5ebf-4d6d-89a1-cef3b525c289.png	1
354	Кусочек в разрезе	193	Десерты/Торт Рафаэлло с маскарпоне/Торт Рафаэлло с маскарпонеe5af607c-bc60-4ecf-b26b-2c5fe6e8c0c0.png	1
355	Вид сверху	176	Десерты/Яблочный пирог с корочкой/Яблочный пирог с корочкойc0b9d8cd-c32f-43ab-879e-18efcd7ee7d3.png	1
356	Ингридиенты	76	Десерты/Пирог дровосека/Пирог дровосекаc5cb0e14-2ab7-4e5e-bf4d-c5179769e0a8.png	1
357	Ингридиенты для топпинга	76	Десерты/Пирог дровосека/Пирог дровосека48a7ee04-0893-42a5-921f-fd06867ef4dd.png	1
358	Финики с яблоками в тесте	76	Десерты/Пирог дровосека/Пирог дровосека8115cc24-1f9a-4e0b-a7ca-ca9933270708.png	1
359	Топпинг	76	Десерты/Пирог дровосека/Пирог дровосека5e6edcb0-9741-40fe-aa75-fc20b6d3dba3.png	1
360	Поливаем полуготовый пирог	76	Десерты/Пирог дровосека/Пирог дровосекаe8712cdb-4e2b-4327-a4eb-5d5ba9e1a247.png	1
361	В разрезе	76	Десерты/Пирог дровосека/Пирог дровосека0a558bff-6a46-4ef7-8583-5c7477f5aacd.png	1
332	Шарлотка со сливами	117	Десерты/Шарлотка/Шарлотка72052f09-d795-406f-ae77-2cfbd47243b1.png	2
610	Масса в блендере	235	Соусы/Мухаммара/Мухаммараd98f2bf8-e02c-4700-a68d-945be20016fc.jpg	1
362	Рикотта, желтки, сливки, сахар.	211	Десерты/Воздушный творожный пирог/Воздушный творожный пирог5dbca8f7-9898-4181-9cc8-67ec6b67333b.png	1
363	Отдельно белки	211	Десерты/Воздушный творожный пирог/Воздушный творожный пирогd2b5c0b0-4d38-48bf-afa8-b389594d7f9c.png	1
364	Взбитые белки	211	Десерты/Воздушный творожный пирог/Воздушный творожный пирогa244d041-1ea1-46f9-9233-5275b8ba255c.png	1
365	Взбитая сырная масса	211	Десерты/Воздушный творожный пирог/Воздушный творожный пирог081db0bc-cc90-42f3-ab19-240cebd0787a.png	1
366	Сырная масса с вмешанными белками	211	Десерты/Воздушный творожный пирог/Воздушный творожный пирог66f5731f-a92a-4b07-abe3-8f01e0cf2ff9.png	1
367	Вылитая масса в форму на песочный корж	211	Десерты/Воздушный творожный пирог/Воздушный творожный пирог433d6693-51f5-4683-9216-4a446c06da65.png	1
368	Чуть больше какао	114	Десерты/Шоколадный торт с кокосом/Шоколадный торт с кокосом77205c49-9252-4fdf-80ba-494fa26ee9b6.png	1
369	С орехами	93	Десерты/Землетрясение/Землетрясение5d372e4d-d795-4e0d-8e41-3bedac61b9f7.png	1
370	Надрезанній торт	93	Десерты/Землетрясение/Землетрясение449dd147-90f5-4ca7-a046-fcabf6a8aa23.png	1
371	Кусочек	93	Десерты/Землетрясение/Землетрясение2f7adeb3-455e-42b4-a091-c9802626e5d6.png	1
372	Фрукты с крекером залиты слоем йогуртовой массы	93	Десерты/Землетрясение/Землетрясениеebc70c5d-3062-4051-9f46-e8f025e974e1.png	1
373	Верхний слой желе	93	Десерты/Землетрясение/Землетрясение19c4cbdc-b1ee-4ed3-8b18-72de949d795f.png	1
374	Целый	180	Десерты/Медовый торт/Медовый тортd8838f49-0590-4409-aa37-245ad711ae78.png	1
375	В разрезе	180	Десерты/Медовый торт/Медовый торт74bb9ede-7501-4f92-a184-17bca5d713d8.png	1
376	Со сметанным кремом	180	Десерты/Медовый торт/Медовый тортccd32e0e-4a64-4e77-a6c5-994883ef0e9c.png	1
377	Коржи с кремом и вишней	180	Десерты/Медовый торт/Медовый торт704a7223-0cb2-4a68-b866-6ae118be1d8c.png	1
378	---- Ягодная начинка ---- 0,5кг очищенных от косточек вишен в сотейнике поставить на огонь, залить раствором из 1ст.л. крахмала и 70мл воды, довести до загустевания на плите.	182	Десерты/Галета с начинкой/Галета с начинкой68d20b46-3107-4eb1-b508-7d49c87bd941.png	1
379	Вишня с крахмалом	182	Десерты/Галета с начинкой/Галета с начинкой498c48da-b5c1-4b81-b7e9-0f633047daf0.png	1
380	Сырая галета	182	Десерты/Галета с начинкой/Галета с начинкой302be13c-57f9-4675-8cee-0aa9c17cab65.png	1
381	Готовая галета	182	Десерты/Галета с начинкой/Галета с начинкойe97d356e-cd47-4488-b6db-b506cdcc81a8.png	1
382	Творожная галета украшенная ягодами	182	Десерты/Галета с начинкой/Галета с начинкой05a716cb-4c5d-48a5-9193-70158bfedeeb.png	1
383	Ингридиенты для миндального бисквита	195	Десерты/Таю на губах/Таю на губахc5811936-5e58-46c6-bd37-9efb123f2998.png	1
588	Овощи на суп	226	Первые блюда/Суп из баклажанов с базиликом/Суп из баклажанов с базиликом44e06619-1393-491d-b1fb-f9b5f9bce287.JPG	1
589	Баклажаны кольцами	226	Первые блюда/Суп из баклажанов с базиликом/Суп из баклажанов с базиликом8fea9e73-e704-4af2-9f61-ffa54d39dc14.JPG	2
590	Намазаны на хлеб	227	Вторые блюда/Закуска из печеных перцев/Закуска из печеных перцев4bd1627e-74e9-43a2-9db7-96885acc438f.jpg	1
430	Плоская шляпка	154	Салаты/Мой генерал/Мой генералb73f6d61-fb1e-477b-be53-b2ea6e9edf0e.png	1
448	Кальцоне	21	Вторые блюда/Пицца/Пицца9e084f52-8338-429e-800e-fc656f8cf9e9.png	1
449	Пицца дрожжевая	21	Вторые блюда/Пицца/Пицца86780830-24dd-4777-8990-8944e6025f3d.png	1
450	В процессе выкладывания начинки	21	Вторые блюда/Пицца/Пицца89158926-0d2a-4253-aff9-ae86537b899d.png	1
451	Сливочный соус	197	Вторые блюда/Креветки в панировке из киноа/Креветки в панировке из киноа01c56133-962d-410a-97a2-e5974028796b.png	1
452	Готовая креветка в соусе	197	Вторые блюда/Креветки в панировке из киноа/Креветки в панировке из киноа4add3773-2ae2-4e0a-b52d-ad29fa1c7abc.png	1
457	Целый кусочек	13	Вторые блюда/Буженина/Буженина35aa38ae-f6e2-4ff4-8895-06682ca2b86c.png	1
458	В тарелке	14	Вторые блюда/Запеченная курочка/Запеченная курочкаc50c9b6f-1176-47c3-8fd8-f621adc0a422.png	1
459	Колдуны	40	Вторые блюда/Драники/Драники96f97978-a627-4015-acbb-f9b58307888d.png	1
460	Оладьи из кабачков	40	Вторые блюда/Драники/Драники62802f1d-822f-4074-82f9-259e15f15931.png	1
461	Замаринованы	106	Вторые блюда/Свинина по-боярски/Свинина по-боярски0ffe7349-2fcb-4eab-a4ff-e42c95014958.png	1
462	Сверху выложенные грибочки с луком	106	Вторые блюда/Свинина по-боярски/Свинина по-боярскиf2846ac8-a553-4686-91cd-b69a2aac008e.png	1
463	Слой помидорчиков	106	Вторые блюда/Свинина по-боярски/Свинина по-боярски11e895ed-c577-4a37-877b-92f87b05a37e.png	1
464	Притрушены сырком	106	Вторые блюда/Свинина по-боярски/Свинина по-боярски99fdb1a5-b289-48ff-9033-614ee2672c8f.png	1
465	Поданы на стол	106	Вторые блюда/Свинина по-боярски/Свинина по-боярски6f2a1271-04d0-4146-822b-2a881a9e33d0.png	1
466	Плов в мультиварке	16	Вторые блюда/Плов/Плов37678e8d-f773-4ae1-8068-a8e5918d79d5.png	1
467	Начинка	136	Вторые блюда/Фаршированный перец/Фаршированный перец25fdb54c-d0e9-4bdc-91bc-696a23eee0a2.png	1
469	С размешанным яйцом	71	Вторые блюда/Хачапури по-аджарски/Хачапури по-аджарскиf3ac33c7-3191-4c5c-ac3e-d179a9bc6f55.png	1
470	С помидорами в мультиварке	60	Вторые блюда/Мясо по-французски/Мясо по-французски6c252e51-2cb5-467e-b9d6-fde74097e44c.png	1
471	В свежих перцах	140	Вторые блюда/Макароны по-флотски/Макароны по-флотски2ac777cb-46db-472c-9dd2-cf6efaf664f9.png	1
472	Ароматные чесночные	150	Вторые блюда/Пшеничные булочки/Пшеничные булочки0b4dbabb-0f62-4f7e-89bd-7d977e2b08aa.png	1
473	В мультиварке	32	Вторые блюда/Фаршированные кабачки/Фаршированные кабачки809a843f-0dbf-4a21-adc2-4a4b8652de1a.png	1
474	Выскобленная сердцевина кабачков с остатками фарша	32	Вторые блюда/Фаршированные кабачки/Фаршированные кабачки7a994db7-4f93-419f-950a-37a09f35b265.png	1
475	Куриные стрипсы	169	Вторые блюда/Индюшиные наггетсы/Индюшиные наггетсы63b5f9f5-d601-4dc1-8bae-ba06c874bf82.png	1
476	Из яиц с чесноком	171	Вторые блюда/Бутерброды/Бутербродыd7f56e77-2ba0-4629-8da0-714e65c4b8c6.png	1
477	Котлеты с ароматной начинкой	30	Вторые блюда/Котлеты домашние/Котлеты домашниеb9cf547f-a018-4b45-9f32-bcb77007a860.png	1
478	Фарш для индюшино-сырных котлет	30	Вторые блюда/Котлеты домашние/Котлеты домашние7044c2e6-aafc-4de8-86a3-9ad223bf4ffa.png	1
479	Индюшино-сырные котлеты с ароматной начинкой	30	Вторые блюда/Котлеты домашние/Котлеты домашниеd2246da4-e6e0-4b50-baec-5e1fd89c064d.png	1
480	Индюшино-сырные котлеты	30	Вторые блюда/Котлеты домашние/Котлеты домашние4ecd77cd-b396-4349-a81d-9f58d7fd6198.png	1
481	Котлеты на пару	30	Вторые блюда/Котлеты домашние/Котлеты домашниеc7f0f624-b2f4-447b-ad4f-8960ac4b42da.png	1
482	Куриные котлеты с кабачком и рисом	30	Вторые блюда/Котлеты домашние/Котлеты домашниеbdb46aec-4dc7-4063-9abf-b86d7fda99b6.png	1
483	Перед отправкой в пароварку	48	Вторые блюда/Картофельные пельмени/Картофельные пельмени96f53b59-e29c-4ab7-94e5-2d7451e08208.png	1
468	Начиненный перец	136	Вторые блюда/Фаршированный перец/Фаршированный перец90d7bb55-3ec1-45d0-9988-230e915f5e8c.png	2
484	Если остался фарш, можно сделать такие ежики	107	Вторые блюда/Голубцы/Голубцы80d791a0-fcc4-468c-86af-f6e0772e5179.png	1
485	Ингридиенты на тесто	69	Вторые блюда/Бешмармак/Бешмармак016e07be-c3e0-49b5-ab22-96c74677d0f5.png	1
486	Процесс замешивания теста	69	Вторые блюда/Бешмармак/Бешмармакc6dc9b42-6951-48d9-921e-9b505f052a47.png	1
487	Замешиваем...	69	Вторые блюда/Бешмармак/Бешмармак559250ce-8028-44fa-aaf8-80e9dd633e4f.png	1
488	Лук	69	Вторые блюда/Бешмармак/Бешмармак3223d799-4bad-4cc9-acaa-b9f76128ecb7.png	1
489	Нарезаем тесто на кусочки	69	Вторые блюда/Бешмармак/Бешмармакa1267790-e38d-4e2b-8d06-75f665eb60df.png	1
490	Нарезанные кусочки теста	69	Вторые блюда/Бешмармак/Бешмармак057b22c6-5bbb-4e75-9fc9-01c4aa9819e4.png	1
491	Готовый бешмармак	69	Вторые блюда/Бешмармак/Бешмармакe6683f35-fc4d-459a-a4c3-998261d9afa4.png	1
492	Неразрезанные	184	Вторые блюда/Мясной пирог на кефире/Мясной пирог на кефиреb3c62a0f-1324-4768-a103-2b06dd45a4ab.png	1
493	Индюшиное мясо с приправами и грибами	203	Вторые блюда/Запеканка из курицы с грибами/Запеканка из курицы с грибами47246f66-2fd2-490e-a9f2-221881ea0293.png	1
494	+ картошка	203	Вторые блюда/Запеканка из курицы с грибами/Запеканка из курицы с грибами57036419-987f-4bf4-8522-542b5d3b1fd4.png	1
495	Сверху сыр и зелень	203	Вторые блюда/Запеканка из курицы с грибами/Запеканка из курицы с грибамиf94d1d06-84d3-4335-8460-02d6d0a676a4.png	1
496	Уложенное в форму.	203	Вторые блюда/Запеканка из курицы с грибами/Запеканка из курицы с грибами175e63b4-82d1-4fe1-82f1-b20ccfc25d16.png	1
497	Ингридиенты	214	Вторые блюда/Тушёная капуста по-немецки/Тушёная капуста по-немецкиb941c06b-f073-4fdb-86c5-841feb41f1ae.JPG	1
498	Порезанная капуста	214	Вторые блюда/Тушёная капуста по-немецки/Тушёная капуста по-немецки3bb91aab-f000-43ca-99e3-f47390ad1cb6.JPG	1
499	Жарящиеся яблоки с луковицей	214	Вторые блюда/Тушёная капуста по-немецки/Тушёная капуста по-немецкиf1fed0c7-c854-4a91-8a72-187e915e0013.JPG	1
500	В половинку луковицы воткнуть гвоздики.	214	Вторые блюда/Тушёная капуста по-немецки/Тушёная капуста по-немецки22823de7-c3e2-45b5-ac70-3d26700a90e5.JPG	1
501	Порция	214	Вторые блюда/Тушёная капуста по-немецки/Тушёная капуста по-немецки141b899a-d147-48b5-b733-e0a9617fd9f5.JPG	1
502	На сковородочке	206	Вторые блюда/Омлет с картофелем и мягким сыром/Омлет с картофелем и мягким сыромf90e8a4e-8367-46b6-8f71-e4cabe6f568c.png	1
503	Стопка ароматных бризолей	53	Вторые блюда/Бризоль/Бризольffc57b03-6616-4e34-b592-58149a47779e.png	1
504	Еще стопка ароматных бризолей	53	Вторые блюда/Бризоль/Бризоль34e5f738-d4a2-4a2d-9c1c-c83990914aee.png	1
505	Мясные шарики	53	Вторые блюда/Бризоль/Бризоль7ae49c87-73af-4dfd-89a2-8f7289b94ef1.png	1
506	Раскатанный мясной шарик	53	Вторые блюда/Бризоль/Бризоль41ff781b-d438-4c65-9f4e-5dda5d60d6dd.png	1
507	Обжаренный	53	Вторые блюда/Бризоль/Бризоль96f6e50a-bcdf-4284-bd90-d6d51d7bd5e8.png	1
508	Стопочка	53	Вторые блюда/Бризоль/Бризоль22b094e5-6c02-460b-8826-cc47c0582c75.png	1
509	Она же	53	Вторые блюда/Бризоль/Бризоль3634dcf0-60cc-4e26-bb1c-3429f855cb93.png	1
510	Яблоки засыпанные сахаром	63	Десерты/Янтарный торт/Янтарный торт31c5c05b-54fb-45e7-acad-a689a45dc181.JPG	1
511	Яблоки залитые тестом	63	Десерты/Янтарный торт/Янтарный торт278a0f19-d19b-40f6-a732-f526af5d1b22.JPG	2
512	Выпеченный пирог	63	Десерты/Янтарный торт/Янтарный торт92dbb87e-b530-4074-8ae2-9a03a0f6a30e.JPG	3
513	Перевернутый вверх дном пирог	63	Десерты/Янтарный торт/Янтарный торт1f7e9817-b218-462c-87e2-0038e8f767d4.JPG	4
514	В разрезе	63	Десерты/Янтарный торт/Янтарный тортc6ab551d-78f2-40ca-9df8-31be9d19aed8.JPG	5
515	Зажарочка из лучка, перчика и помидорчиков	217	Вторые блюда/Омлет с помидором/Омлет с помидором54df7912-4a1b-48da-bd6f-4cb82c8c57e6.jpg	1
516	Залитая взбитыми яйцами с молочком	217	Вторые блюда/Омлет с помидором/Омлет с помидором24f63c46-c3ba-4aea-8e51-07c48fb4d1a5.jpg	2
517	Омлетпод крышечкой	217	Вторые блюда/Омлет с помидором/Омлет с помидором11754db4-03c1-4aa3-8a89-c8aaaf5f04e4.jpg	3
518	Более ровная текстура за счет того, что холодный крем, соединенный с желатином был быстро залит и не успел застыть до заливки	195	Десерты/Таю на губах/Таю на губахa49ff838-20a4-4707-a9a1-3164f1748406.jpg	24
519	Кусочек рулета под банановым соусом	195	Десерты/Таю на губах/Таю на губахe7b14fff-c9ac-479c-b60a-e34c02e346db.jpg	26
538	Положить сыр и подрумянить в духовке	218	Вторые блюда/Брускетта/Брускеттаa14d999e-fb90-4b25-81f9-b9b69e13ea78.jpg	7
384	Смешанный измельчённый миндаль, сахар, желток и яйцо.	195	Десерты/Таю на губах/Таю на губахca9ee505-07b4-4294-b542-ddf053daa8af.png	2
385	А белки взбить	195	Десерты/Таю на губах/Таю на губах4cd1f5d8-26c9-4caf-94b7-4d4a6dbc4778.png	3
386	Вмешать муку	195	Десерты/Таю на губах/Таю на губахa72856ce-1961-41fb-ad1a-3bd858186edf.png	4
387	Влить масло	195	Десерты/Таю на губах/Таю на губах4924d7df-a5d9-421c-bcc9-9e3870421dae.png	5
388	Запечь в форме	195	Десерты/Таю на губах/Таю на губах2ff27179-515b-481a-b02b-047c01155beb.png	6
389	Ингридиенты для крема	195	Десерты/Таю на губах/Таю на губахbe85afa2-905f-457e-a3b2-3c8456d018fe.png	7
390	Свернуть горячий выпеченный корж рулетиком	195	Десерты/Таю на губах/Таю на губахdf489e70-601d-4dcd-ba97-a34a99ad20a2.png	8
391	Взбить все ингридиенты для крема	195	Десерты/Таю на губах/Таю на губах627c6aca-2fe9-4b03-9296-dda8ffbb29ba.png	9
392	Желатин с водой	195	Десерты/Таю на губах/Таю на губах80809bb7-303d-4d19-9719-d469930232f4.png	10
393	Растворить желатин в воде	195	Десерты/Таю на губах/Таю на губахe96013af-7377-430a-a76e-da79c8edfcd8.png	11
394	Зазвернуть рулет, намазать крем, положить нарезанные бананы, завернуть.	195	Десерты/Таю на губах/Таю на губах16d41d4e-963a-4e38-8235-3ebc5eb44605.png	12
395	Соединить крем с желатином, выложить часть крема в форму.	195	Десерты/Таю на губах/Таю на губах524bc755-c1b7-45d4-9388-3516ec20e18d.png	13
396	Выложить рулет на крем, залить оставшимся кремом	195	Десерты/Таю на губах/Таю на губахf2a66c00-c55e-4a3a-ba3e-b7f86f667d3f.png	14
397	Ингридиенты на соус	195	Десерты/Таю на губах/Таю на губахca26a964-3e5a-463b-95ca-a0b820caa303.png	15
398	Отправить их в блендер	195	Десерты/Таю на губах/Таю на губах508e5739-c03c-466b-8f25-add88c0bbac6.png	16
399	Получить массу.	195	Десерты/Таю на губах/Таю на губах63f3a405-4d1c-4c47-a148-4befc85b0711.png	17
400	Вынуть рулет из формы	195	Десерты/Таю на губах/Таю на губахc57511c6-b29a-462c-aee5-ea8b78be93d5.png	18
401	Разрезать на части	195	Десерты/Таю на губах/Таю на губах8a92872e-651b-48d0-8a25-fa87215ab152.png	19
402	И еще	195	Десерты/Таю на губах/Таю на губах773b87c4-b127-49fd-9599-f9a186277798.png	20
403	Полить манговым соусом	195	Десерты/Таю на губах/Таю на губахb224ca15-062e-4565-8a9c-39d95e574c87.png	21
404	В разрезе	195	Десерты/Таю на губах/Таю на губах394da3e0-06cc-42a8-8cf5-8bd1a0b98206.png	22
405	Только из холодильничка	195	Десерты/Таю на губах/Таю на губах8a0a3411-39aa-43cd-b3c4-9a4532b26c2b.png	23
520	В разрезе	195	Десерты/Таю на губах/Таю на губах7e0f353d-4a77-4114-aec7-b56e2879c62c.jpg	25
521	Фарш	220	Вторые блюда/Котлеты из судака/Котлеты из судакаfd1f7949-86d2-4857-8b23-c0b92161d477.jpg	1
522	Обваленные в панировке	220	Вторые блюда/Котлеты из судака/Котлеты из судакаb5088759-49d4-4788-9197-eb87cd97e9cc.jpg	2
523	Подрумяненные на сковороде	220	Вторые блюда/Котлеты из судака/Котлеты из судака27d2c6af-98a2-4c5e-b9b3-4572137336a1.jpg	3
524	Сливы разоезом вверх, присыпанные коричневым сахаром и корицей	135	Десерты/Сливовый пирог из New York Times/Сливовый пирог из New York Times1d3f7d16-f931-408f-84ed-981d738e5e84.jpg	1
525	Немножко в другом ракурсе	135	Десерты/Сливовый пирог из New York Times/Сливовый пирог из New York Times24bc69a1-2e2b-4746-a7e7-e30614f24eb6.jpg	2
526	Готовый пирог	135	Десерты/Сливовый пирог из New York Times/Сливовый пирог из New York Times1a016dbe-bfa6-4fec-af57-a4d45f34f513.jpg	3
527	ингридиенты	126	Салаты/Греческий салат/Греческий салат585ea609-531e-4774-9b5a-35eca6e2b235.jpg	1
528	готовый салат	126	Салаты/Греческий салат/Греческий салатbdb79c7a-8a0f-49ee-b3a8-18cab183307f.jpg	2
529	С авокадо и лучком	126	Салаты/Греческий салат/Греческий салатb97fa961-3dd4-4a12-9ea1-45385445714a.jpg	3
530	В собранном виде	126	Салаты/Греческий салат/Греческий салат7cc933d5-edb4-4e04-841a-f8a7e779be46.jpg	4
531	И приправленный	126	Салаты/Греческий салат/Греческий салат9a16b547-e470-4793-b4af-3df7725c4726.jpg	5
532	Нарезанные помидоры, приправленные специями	218	Вторые блюда/Брускетта/Брускетта601bc3cb-d2c5-419f-bd50-74f88a58eea9.jpg	1
533	Выложены на багет	218	Вторые блюда/Брускетта/Брускетта71d3f71d-4d04-4ba9-ab6b-347aa40014c2.jpg	2
534	С расплавленным сыром в духовке	218	Вторые блюда/Брускетта/Брускетта33c6da86-1999-44c7-9ef5-842ebae8d3fb.jpg	3
535	Нарезанный сыр	218	Вторые блюда/Брускетта/Брускетта9fde282f-e5be-42ca-893a-b715f6726426.jpg	4
536	Можно взять желтые помидоры	218	Вторые блюда/Брускетта/Брускетта85a97ee1-7f94-4360-9751-25d34cbb96de.jpg	5
537	Тоже нанести на багет	218	Вторые блюда/Брускетта/Брускеттаd6b19a5d-ea3a-4e4a-8d90-b29fa8026da3.jpg	6
539	Тесто	221	Десерты/Корнуэльский яблочный пирог/Корнуэльский яблочный пирогb7d01d58-0f36-4b77-8d70-8770b5b52775.JPG	1
540	Выложенные яблоки, посыпанные сахаром	221	Десерты/Корнуэльский яблочный пирог/Корнуэльский яблочный пирог8b33d14f-e07b-42b6-b707-3e91fb9de288.JPG	2
541	Результат	221	Десерты/Корнуэльский яблочный пирог/Корнуэльский яблочный пирогfe294825-3797-4c73-9f10-a22b6ced4a52.JPG	3
542	Разрезанный	221	Десерты/Корнуэльский яблочный пирог/Корнуэльский яблочный пирог0030bead-2f5e-4272-9b03-48829ac6fde8.JPG	4
543	поджарить лучок	222	Вторые блюда/Баклажаны гармошка/Баклажаны гармошкаf4258220-638a-4ef3-ac85-399c792bbf60.JPG	1
544	Добавить морковочку	222	Вторые блюда/Баклажаны гармошка/Баклажаны гармошка88063e06-f777-4d15-b90c-50f211e04a7b.JPG	2
545	Все тушится вместе	222	Вторые блюда/Баклажаны гармошка/Баклажаны гармошкаa072964c-3a19-474b-add6-db393bbbe65a.JPG	3
546	Баклажаны нареаются кружочками	222	Вторые блюда/Баклажаны гармошка/Баклажаны гармошкаd02cbb70-b3d9-476c-b833-5844dada0b30.JPG	6
547	Помидоры нарезаются кольцами	222	Вторые блюда/Баклажаны гармошка/Баклажаны гармошка4be3de5b-aff2-47c6-99ca-8911b8947bf0.jpg	5
548	Добавляются порезанные помидоры и тушится все вместе	222	Вторые блюда/Баклажаны гармошка/Баклажаны гармошкаa1df5643-2d76-40ac-8846-0a2e14ac5989.jpg	4
549	Готовится фарш	222	Вторые блюда/Баклажаны гармошка/Баклажаны гармошкаd2a7b89d-4d1e-45a5-aa42-3ed29b3fbf1a.jpg	7
550	Раскладывется в форму в таком виде	222	Вторые блюда/Баклажаны гармошка/Баклажаны гармошка020660be-685d-4289-8edf-065dbd89b045.JPG	8
551	Заливается соусом	222	Вторые блюда/Баклажаны гармошка/Баклажаны гармошка1a6f3535-d606-486b-9b11-c1c413de93d0.JPG	9
552	Индейка в йогурте	223	Вторые блюда/Индейка под шубой/Индейка под шубойec6ac064-f812-4a41-9e57-6c01c4bab19a.jpg	1
553	Покрытая помидорами	223	Вторые блюда/Индейка под шубой/Индейка под шубойda5eeea3-06fd-4191-9afb-785c527669fa.jpg	2
554	Сверху корейской морковью	223	Вторые блюда/Индейка под шубой/Индейка под шубойaeef51d3-67bd-4e94-84f1-e2530b74ac51.jpg	3
555	И пластами сыра	223	Вторые блюда/Индейка под шубой/Индейка под шубойd018fad4-73bd-44bf-9f2f-bd664d8c736a.jpg	4
556	Готовое блюдо на тарелке	223	Вторые блюда/Индейка под шубой/Индейка под шубой0a739a13-1199-4716-ab0e-4b38db7fba31.jpg	5
557	Нарезанная морковочка	136	Вторые блюда/Фаршированный перец/Фаршированный перец99aca7aa-788f-4809-a47d-873749272c36.JPG	3
558	Обжаренный лучок	136	Вторые блюда/Фаршированный перец/Фаршированный перец35b64861-2543-4c8f-8588-7c2b06de7e40.JPG	5
559	Фарш с рисом и специями	136	Вторые блюда/Фаршированный перец/Фаршированный перец5dba207f-f363-43c7-bb54-39c3a04ed216.JPG	6
560	В фарш добавили лучок	136	Вторые блюда/Фаршированный перец/Фаршированный перец9fe6efd3-e3a4-40a4-9b74-8d5fdaa7e6d6.JPG	7
561	морковочку и помидоры	136	Вторые блюда/Фаршированный перец/Фаршированный перецb01122bf-0650-4279-9103-45923ca490c3.JPG	8
562	Перемешали	136	Вторые блюда/Фаршированный перец/Фаршированный перец670385a9-1fb0-4d62-aa71-61c55830f7b7.JPG	9
563	Обжарили морковочку	136	Вторые блюда/Фаршированный перец/Фаршированный перецaa86e8fc-b9fa-47f9-902b-df31e88fd03f.JPG	4
564	Начинили перец	136	Вторые блюда/Фаршированный перец/Фаршированный перец6f8b75d2-556e-4ebf-b50f-d78dbba023bb.JPG	10
565	Закрыли крышечками	136	Вторые блюда/Фаршированный перец/Фаршированный перец320644bb-bb8e-4ea7-8dcc-6053b82c1eb9.JPG	11
566	Творожная масса и натертая морковь	215	Десерты/Творожно-морковный пирог/Творожно-морковный пирог4d6014bb-f633-448f-86c4-d58c8da19b90.JPG	2
591	Яблоки выложить на творог, засыпать сахаром и корицей.	228	Десерты/Творожная запеканка корично-яблочная/Творожная запеканка корично-яблочная8c466a43-8bff-4a3c-a49d-a97e902f4589.jpg	1
568	Ингридиенты для теста	215	Десерты/Творожно-морковный пирог/Творожно-морковный пирогf01e1ce6-9f0b-48e2-9af8-fe4118b2df04.JPG	4
569	Морковные шарики и тесто	215	Десерты/Творожно-морковный пирог/Творожно-морковный пирог295071e1-8818-4b52-989e-a661c5bb2630.JPG	3
592	Присыпать слоем творога	228	Десерты/Творожная запеканка корично-яблочная/Творожная запеканка корично-яблочнаяb3733a9c-3799-453f-9f77-f4639c0e4d23.jpg	2
593	Финальный слой яблок	228	Десерты/Творожная запеканка корично-яблочная/Творожная запеканка корично-яблочнаяef6ddbdb-1719-4321-8a89-880ec4ec5233.jpg	3
574	Ингридиенты для начинки	215	Десерты/Творожно-морковный пирог/Творожно-морковный пирог62a1519e-a76d-403c-bf48-a012a37b4cd8.JPG	1
572	Залить тестом	215	Десерты/Творожно-морковный пирог/Творожно-морковный пирог00418994-9a92-4fe1-bb7d-7d77f37894d3.JPG	5
567	Соединить	215	Десерты/Творожно-морковный пирог/Творожно-морковный пирогdb0302cb-1766-4edc-bfa2-8ba754467628.JPG	6
570	Тесто	215	Десерты/Творожно-морковный пирог/Творожно-морковный пирогd5cdbd62-ff21-48ba-bf4e-165a3c8dc013.JPG	7
573	Творожные шарики	215	Десерты/Творожно-морковный пирог/Творожно-морковный пирог44df3855-2b9c-4f66-a4e1-c044ede19827.JPG	8
571	Выложить творожные шарики	215	Десерты/Творожно-морковный пирог/Творожно-морковный пирогe278f938-f2a6-42ad-8a49-e1ba6f185a32.JPG	9
575	ингридиенты	219	Десерты/Савоярди/Савоярди801955ec-4018-4418-a2fc-5c460ddff87f.JPG	1
576	взбитая масса	219	Десерты/Савоярди/Савоярди64bce65d-e21b-4b9d-a9a2-b933fe4aaed4.JPG	2
577	отсаженное печенье	219	Десерты/Савоярди/Савоярди8889f2d7-0dab-46cb-9575-0bbed26af3b9.JPG	3
594	С морепродуктами	229	Вторые блюда/Фунчоза с морепродуктами/Фунчоза с морепродуктамиf65e761e-d069-4c8f-9eee-2ddf63da8444.JPG	1
595	и овощами	229	Вторые блюда/Фунчоза с морепродуктами/Фунчоза с морепродуктами07d6d4a0-53ab-406d-9019-df58a80685ae.JPG	2
644	Ягодная прослойка	225	Десерты/Торт Ягодная поляна в лесу/Торт Ягодная поляна в лесу465d0a49-e298-4659-93c3-f1f566bfa12f.JPG	3
585	Готовый в разрезе	225	Десерты/Торт Ягодная поляна в лесу/Торт Ягодная поляна в лесу4898dc92-b01e-4052-9046-7e5a0058c782.jpg	4
586	Кусочек	225	Десерты/Торт Ягодная поляна в лесу/Торт Ягодная поляна в лесу8489d875-bf98-4933-a7e2-f6fad0c40e00.jpg	5
587	В серединке	225	Десерты/Торт Ягодная поляна в лесу/Торт Ягодная поляна в лесуde2a322f-10b7-4c24-83d8-6e6954f3a913.jpg	6
646	Грибочки в специях	270	Вторые блюда/Отбивная в тесте/Отбивная в тесте2a11fc84-e7dd-4780-a9af-7e70d85ab096.JPG	1
647	Поджаренные грибочки	270	Вторые блюда/Отбивная в тесте/Отбивная в тестеfefd7041-c45f-495e-b054-ff9b9500d165.JPG	2
648	Грибная начинка	270	Вторые блюда/Отбивная в тесте/Отбивная в тесте3dcfb9e8-10ee-4349-85c9-53d67d264fbf.JPG	3
649	Перемешанная	270	Вторые блюда/Отбивная в тесте/Отбивная в тестеdd3d01f3-dba4-476a-9ac5-77bc25babd78.JPG	4
650	Раскатываем пласт теста	270	Вторые блюда/Отбивная в тесте/Отбивная в тесте25f748f5-6eab-4b08-9d83-e7c038e127f1.JPG	5
651	Ложим сверху отбивную и начинку	270	Вторые блюда/Отбивная в тесте/Отбивная в тесте54fe5af9-edee-4856-a064-1949aeef4d49.JPG	6
652	Закрываем вторым пластом	270	Вторые блюда/Отбивная в тесте/Отбивная в тесте0af06d0e-2ab1-44f3-828f-4164cbd578e0.JPG	7
653	Обрезаем края	270	Вторые блюда/Отбивная в тесте/Отбивная в тестеe0e88258-84bc-42a6-bf4c-a1df5c66efe3.JPG	8
654	Жарим	270	Вторые блюда/Отбивная в тесте/Отбивная в тесте893a6039-44a8-4d75-aace-10476c26f09c.JPG	9
655	Готово	270	Вторые блюда/Отбивная в тесте/Отбивная в тесте0c2cdc7b-9792-485f-b252-32cff999e883.JPG	10
656	Кипяток с маслом	269	Тесто/Заварное тесто/Заварное тестоef7f859f-c04d-4d9a-a1f1-1a2c9dbed10e.JPG	1
645	Раскатанное тесто	269	Тесто/Заварное тесто/Заварное тесто782f242f-16b7-4413-9284-07c89d262bb2.JPG	2
657	Вскрытая баночка	232	Консервация/Чатни из слив/Чатни из слив0fc5c6d1-7581-4892-b7fc-07976bd2e781.jpg	1
658	С салатом Ромен	196	Салаты/Цезарь/Цезарь82514048-ee8d-4cd2-b058-31681fe8231d.jpg	4
659	Поджарилось мясо	196	Салаты/Цезарь/Цезарь2ef925b0-dbb0-472c-8e67-f31b41e853bc.JPG	6
660	Нарезались сухарики	196	Салаты/Цезарь/Цезарьd38e39e0-a710-4fa9-a83a-cb66791509a3.JPG	7
661	Поджарились сухарики	196	Салаты/Цезарь/Цезарьa9638aec-0ede-4533-b865-254a37a340be.JPG	8
662	Замешивается соус	196	Салаты/Цезарь/Цезарь9b344f94-bbfe-48c7-b9ea-afbc6ff457e9.JPG	9
663	С Вустерским соусом	196	Салаты/Цезарь/Цезарь9f060172-2331-4ba5-966e-839d343acd17.JPG	10
664	Натертый пармезан	196	Салаты/Цезарь/Цезарь0bc52c88-e16c-4561-9e39-7f99503264f1.JPG	11
665	Замешанный соус	196	Салаты/Цезарь/Цезарьe84cfff8-c03f-49c3-b293-2e106fa6f1de.JPG	12
666	Приготовленные листья салата (есть их потом неудобно)	196	Салаты/Цезарь/Цезарьb14880e8-580a-4688-9eba-c04471b0c99d.JPG	14
667	С мясом	196	Салаты/Цезарь/Цезарьd2b262d3-44f0-4a61-8955-9402eecaa972.JPG	15
668	майонезом	196	Салаты/Цезарь/Цезарь089166b7-8aea-4f63-bbf0-cc360cffaf7d.JPG	16
669	сухариками	196	Салаты/Цезарь/Цезарь8677072e-a9bf-4ae1-810b-6f586b24d198.JPG	17
670	сыром	196	Салаты/Цезарь/Цезарь0a821422-41ec-49e6-b407-1a46b2f36f18.JPG	18
671	и черри	196	Салаты/Цезарь/Цезарьed79111f-d401-44b4-b88e-26856e59cf2e.JPG	20
672	Салат с мясом, обычным салатом и черри	196	Салаты/Цезарь/Цезарь1c18d31c-6189-4d14-abe3-28a5f8929960.JPG	21
673	Ингридиенты для курда	271	Крема/Апельсиновый курд/Апельсиновый курд8b155acc-546e-41b4-b590-1ab5ad004ec5.JPG	1
674	Натертая цедра с апельсинов	271	Крема/Апельсиновый курд/Апельсиновый курдf3b60dab-da1e-46c9-80b7-a64c91cbdf92.JPG	2
675	Яйцо с крахмалом	271	Крема/Апельсиновый курд/Апельсиновый курд38f96d74-ea38-444f-993e-ad060be59868.JPG	3
676	Апельсиновый сок с цедрой	271	Крема/Апельсиновый курд/Апельсиновый курд6c3488af-c568-4bb3-91a6-0673fbe5ef20.JPG	4
677	Готовый курд	271	Крема/Апельсиновый курд/Апельсиновый курдab9fbec1-bbf0-4a2b-b13f-96c09c14afe2.JPG	5
678	Накрытый пищевой пленкой вконтакт	271	Крема/Апельсиновый курд/Апельсиновый курд5f0d0911-fa2e-42c9-8974-8742817848c7.JPG	6
679	Взбитый маскарпоне с пудрой и сгущёнкой.	272	Крема/Сливочный крем/Сливочный кремb0828a5f-9623-4279-8c8c-316c4d9ab194.JPG	1
680	Крем на венчике	272	Крема/Сливочный крем/Сливочный кремe555dc9c-3afa-435b-b1a7-bfe1a1245685.JPG	2
681	Продукты для теста	273	Десерты/Сливочный торт с апельсиновым курдом/Сливочный торт с апельсиновым курдомc7f384f5-781c-4dc3-8578-ce8a11131d9a.JPG	1
682	Тесто	273	Десерты/Сливочный торт с апельсиновым курдом/Сливочный торт с апельсиновым курдомc073cda4-4bc6-4668-a0a5-d819e53f02fe.JPG	2
683	Корж пропитанный вином	273	Десерты/Сливочный торт с апельсиновым курдом/Сливочный торт с апельсиновым курдомa079d4ee-cd7e-4f13-b3dc-281097cd92ce.JPG	3
684	Корж намазанный курдом	273	Десерты/Сливочный торт с апельсиновым курдом/Сливочный торт с апельсиновым курдом6a217aa6-afef-4586-a9a4-d616c5ec2283.JPG	4
685	Намазан кремом и другим коржом прикрыт	273	Десерты/Сливочный торт с апельсиновым курдом/Сливочный торт с апельсиновым курдом28b519ea-3280-46de-9fd3-6ca2e914f286.JPG	5
686	Намазан сверху кпемом	273	Десерты/Сливочный торт с апельсиновым курдом/Сливочный торт с апельсиновым курдомe5536521-deb3-4d47-b6a1-701372828acc.JPG	6
687	Начало украшения апельсином	273	Десерты/Сливочный торт с апельсиновым курдом/Сливочный торт с апельсиновым курдомb3e08868-e83f-4936-9e34-87f9ba626eb7.JPG	7
688	Полностью украшен	273	Десерты/Сливочный торт с апельсиновым курдом/Сливочный торт с апельсиновым курдом7e5d2ac5-5984-48b3-98a1-7ba5597c5446.JPG	8
689	Кусочек отрезан	273	Десерты/Сливочный торт с апельсиновым курдом/Сливочный торт с апельсиновым курдомf95a9e0e-952a-41f5-8f70-e40fd751b175.jpg	9
690	Белки и желтки	274	Десерты/Тирамису - летняя версия/Тиримисуffbbb66f-3782-4aea-81b8-dd3ee7f8a76c.JPG	1
691	Савоярди и сок	274	Десерты/Тирамису - летняя версия/Тиримису2de5644e-c876-491e-8f97-26bfcd4ff10a.JPG	2
692	Савоярди на дне формы	274	Десерты/Тирамису - летняя версия/Тиримису90e50678-471e-497a-ac65-8e60866befc3.JPG	3
693	Соединенная масса, залитая клубничным соусом	274	Десерты/Тирамису - летняя версия/Тиримису20b24c12-6e35-4217-b50f-7c86d5056796.JPG	4
694	В процессе поедания	274	Десерты/Тирамису - летняя версия/Тиримису2cdf153d-4e4b-4643-b801-29fbb9f163b5.JPG	5
695	Можно сделать и ласточкины гнезда из свинины	15	Вторые блюда/Куриные гнёзда/Куриные гнёздаb89f178d-1068-4c16-9e56-700736e92ca0.jpg	1
696	Сварить яйца	15	Вторые блюда/Куриные гнёзда/Куриные гнёзда26484414-fc28-4c44-ba13-bcf7e53baec6.jpg	2
697	Выложить фарш в форму шариками с углублениями, в углубления воткнуть по половине яйца	15	Вторые блюда/Куриные гнёзда/Куриные гнёздаc6a1cd55-bfad-4b00-9f05-4c3c62d62005.JPG	4
698	Покрыть томатной заливкой	15	Вторые блюда/Куриные гнёзда/Куриные гнёзда90be64c6-d192-4c19-ab86-a79bedd806e4.JPG	6
699	Готово	15	Вторые блюда/Куриные гнёзда/Куриные гнёзда41033607-684a-413b-bd54-daea1c11a9ae.jpg	7
700	Можно запечькабачки с помидорами	52	Вторые блюда/Баклажаны, запеченные с овощами/Баклажаны, запеченные с овощами235d1205-4698-45ba-8f0b-293390a80e83.jpg	2
701	под сыром	52	Вторые блюда/Баклажаны, запеченные с овощами/Баклажаны, запеченные с овощами55135f70-bda5-4e0e-a2f3-06f8b25eda31.jpg	3
702	подсушенные баклажаны	275	Вторые блюда/Торт из баклажанов/Торт из баклажанов915dd9e7-afbf-428e-8825-1b6757ff33e7.jpg	1
703	отваренный до полуготовности рис	275	Вторые блюда/Торт из баклажанов/Торт из баклажановb673821d-c770-4c83-81eb-28b45962e151.jpg	2
704	Укладка пирога	275	Вторые блюда/Торт из баклажанов/Торт из баклажанов1ff18f28-9da8-41e8-82cf-c05ae7450100.jpg	3
705	Слой помидоров	275	Вторые блюда/Торт из баклажанов/Торт из баклажановba09a469-5ff4-4c47-b548-b8eab387e59e.jpg	4
706	Продукты для соуса	276	Соусы/Мицукан/Мицукан96eea272-9225-47a5-98c1-635e6de2a386.JPG	1
707	Рис залитый водой на палец	277	Вторые блюда/Роллы/Роллы00a72be5-01cf-4d7e-be9a-7d3183f0ab9c.JPG	1
708	Готовый рис, заправленный мицуканом	277	Вторые блюда/Роллы/Роллы5b0ecfd4-fdd2-486a-9190-404b798af9f5.JPG	2
709	Инструменты для приготовления	277	Вторые блюда/Роллы/Роллы2c3b80b1-17b1-4735-8834-e4828a4f0f70.JPG	3
710	Слегка неудавшиеся (раскрывшиеся) роллы	277	Вторые блюда/Роллы/Роллы2e121ff6-d51c-457e-aed4-1bc769e6751a.JPG	4
711	Половина порции	277	Вторые блюда/Роллы/Роллы43860786-03cc-48ea-8003-fdcdbdbb4de4.JPG	5
712	С кунжутом и филадельфией	277	Вторые блюда/Роллы/Роллыfa6e6446-eb19-4c3f-a0cd-2dc7e8e820f5.JPG	6
713	С авокадо, крабовыми палочками и лососем	277	Вторые блюда/Роллы/Роллы32d1c790-67c0-423c-a338-27900a48a555.JPG	7
714	Закрытый ролл с болгарским перцем	277	Вторые блюда/Роллы/Роллыdd11e3b3-17b1-4f53-8779-791a9e37592a.JPG	8
715	Закрытые роллы	277	Вторые блюда/Роллы/Роллы6c36c873-aaf1-4ec4-8684-b49752056a53.JPG	9
716	Открытые роллы	277	Вторые блюда/Роллы/Роллы068bfe01-1e58-4a05-a8c5-502ad742e23c.JPG	10
717	С икрой масаго	277	Вторые блюда/Роллы/Роллыeed07b50-5771-4d3e-9f31-56b2bc384ff1.JPG	11
718	С лососем	277	Вторые блюда/Роллы/Роллыe1d8f36f-2880-4ace-8d1d-cc7363c7b8e7.JPG	12
719	Еще пол порции	277	Вторые блюда/Роллы/Роллы4f532017-1abd-41db-bdd0-13c043bca45e.JPG	13
720	Контрастность цветов	277	Вторые блюда/Роллы/Роллы1ded7688-0fa4-4a29-b7e9-0e67ab11cff8.JPG	14
721	С манго сверху	277	Вторые блюда/Роллы/Роллы76cf3624-4102-4ea8-b3d3-9bc0882b4bce.JPG	15
722	Манго 400г\nВершки 33% 300г\nМолоко 1% 300г\nСахар 100г\n45 минут в мороженице	278	Десерты/Мороженое/Мороженое3a676e0c-51c0-4bff-bb1b-04fd428a2f57.JPG	2
723	С черешней по такому же рецепту	278	Десерты/Мороженое/Мороженоеcc24d0d6-8ec2-41e5-aea4-785f01216768.JPG	3
724	Манговый сорбе: перекрутить 1 манго с мятой в блендере, добавить сок 1-го лайма, 60 г сахара, 80 мл минеральной воды, несколько листочков мяты	278	Десерты/Мороженое/Мороженое7a95e6e4-ee2a-401e-ab55-151d3d1d3a67.JPG	4
725	Перекручено	278	Десерты/Мороженое/Мороженое21b36e89-c3cc-4498-8229-d5dff1c09989.JPG	5
726	Заморожено	278	Десерты/Мороженое/Мороженое566c0519-eda7-42f6-82d0-01bcc85cfe2e.JPG	6
727	Выложено из чаши мороженицы	278	Десерты/Мороженое/Мороженое6bdb0c8c-ced9-474d-8d3e-5a3fbb83fda5.JPG	7
728	Шелковица + вишня	278	Десерты/Мороженое/Мороженое0ff49420-0572-441f-958a-3662ad3e12af.JPG	8
729	В формочке	278	Десерты/Мороженое/Мороженоеca1f0c23-bda0-4498-ba8b-bed99d52f306.JPG	9
730	Вишня	278	Десерты/Мороженое/Мороженое16c33a72-4dd1-4777-8975-385ed158ba63.JPG	10
731	Клубника	278	Десерты/Мороженое/Мороженое4d54708f-b322-493f-8382-1f046690bdd5.JPG	11
732	Клубника со сливками:\nсливки 33% 200мл,\nмолоко 50мл	278	Десерты/Мороженое/Мороженоеc0c44dcc-f152-4b06-bf62-5e0fbc6fb1ee.JPG	12
733	Подготовительные работы	280	Вторые блюда/Копченая рыба/Копченая рыбаaeeae6af-0698-48f7-87eb-0191cd70df16.JPG	1
734	Уложена в коптильню	280	Вторые блюда/Копченая рыба/Копченая рыба3c13ac90-7578-4dea-83b0-eeb5a3c1b649.JPG	2
735	Не помню что за рыба	280	Вторые блюда/Копченая рыба/Копченая рыба41afee23-cb67-47de-848f-9e6a6571f603.JPG	3
736	С миндалем и чуть больше яблок	228	Десерты/Творожная запеканка корично-яблочная/Творожная запеканка корично-яблочная32c372a0-ace8-4b16-b522-c7af050fc862.JPG	4
737	Готовая	228	Десерты/Творожная запеканка корично-яблочная/Творожная запеканка корично-яблочнаяc7d7fffc-298c-4b07-bcb8-6eeb35128cae.JPG	5
\.


--
-- Name: detail_ids; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.detail_ids', 737, true);


--
-- Data for Name: ingredient; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.ingredient (id, name, description, img_path) FROM stdin;
1	Вода	\N	\N
9	Зелень	\N	\N
18	Сыр	\N	\N
19	Бульон	\N	\N
20	Рассол	\N	\N
21	Аджика	\N	\N
25	Сахар	\N	\N
26	Соль	\N	\N
27	Яйца	\N	\N
28	Масло сливочное	\N	\N
30	Маргарин	\N	\N
31	Дрожжи	\N	\N
32	Молоко	\N	\N
33	Сметана	\N	\N
34	Майонез	\N	\N
35	Ванильный сахар	\N	\N
36	Тесто	\N	\N
37	Начинка	\N	\N
40	Специи	\N	\N
41	Лапша	\N	\N
46	Грибы	\N	\N
49	Кунжут	\N	\N
52	Горчица	\N	\N
55	Томатный соус	\N	\N
61	Макароны	\N	\N
63	Сливки	\N	\N
72	Сгущёное молоко	\N	\N
73	Кокосовая стружка	\N	\N
75	Шоколад	\N	\N
81	Какао	\N	\N
82	Сода	\N	\N
83	Мёд	\N	\N
84	Кефир	\N	\N
85	Орехи	\N	\N
86	Разрыхлитель	\N	\N
88	Фрукты	\N	\N
89	Желатин	\N	\N
90	Сок	\N	\N
92	Бисквит	\N	\N
94	Белковый крем	\N	\N
98	Мак	\N	\N
99	Варенье	\N	\N
100	Крахмал	\N	\N
102	Ром	\N	\N
103	Творог	\N	\N
104	Курага	\N	\N
105	Агар	\N	\N
106	Изюм	\N	\N
107	Овсяные хлопья	\N	\N
108	Желе	\N	\N
109	Крекер	\N	\N
119	Ягоды	\N	\N
121	Булочки	\N	\N
122	Крем	\N	\N
126	Коньяк	\N	\N
127	Глазурь	\N	\N
129	Спагетти	\N	\N
133	Сахарная пудра	\N	\N
143	Йогурт	\N	\N
149	Рыба	\N	\N
151	Вино	\N	\N
158	Чай	\N	\N
78	Сулугуни		\N
93	Персики		\N
95	Яблоки		\N
146	Виноград		\N
131	Сливы		\N
145	Ананас		\N
39	Курица		\N
136	Куриные сердца		\N
125	Банан		\N
140	Груша		\N
147	Сёмга		\N
38	Язык		\N
76	Скумбрия		\N
97	Вишня		\N
65	Килька		\N
43	Лавровый лист		\N
44	Перец горошком		\N
51	Куриные грудки		\N
155	Черешня		\N
62	Печень		\N
74	Корица		\N
115	Лимон		\N
156	Маскарпоне		\N
112	Апельсин		\N
116	Мандарины		\N
101	Миндаль		\N
113	Облепиха		\N
128	Нектарины		\N
118	Куркума		\N
159	Бадьян		\N
148	Рыбная консерва		\N
3	Лук		\N
5	Морковь		\N
6	Свекла		\N
8	Капуста		\N
14	Картофель		\N
12	Кукуруза		\N
22	Огурцы солёные		\N
13	Зелёный горошек		\N
70	Брокколи		\N
59	Кабачки		\N
50	Панировочные сухари		\N
71	Спаржа		\N
111	Тыква		\N
157	Сыр Фета		\N
47	Шпинат		\N
60	Базилик		\N
45	Мидии		\N
80	Краб		\N
79	Фасоль		\N
96	Клюква		\N
114	Гвоздика		\N
141	Финики		\N
130	Лимонный сок		\N
154	Смородина		\N
117	Лаваш		\N
123	Креветки		\N
144	Редька		\N
132	Стручковая фасоль		\N
160	Мята		\N
152	Кресс-салат		\N
124	Паприка		\N
135	Перец чили		\N
134	Карри		\N
142	Кокос		\N
16	Крапива		\N
10	Сельдерей		\N
150	Брынза		\N
162	Лимонная кислота	\N	\N
24	Мука		ingredients/Мука/Мукаf6acb311-d292-462c-ae2a-74c17a3dd0b2.JPG
66	Крупа гречневая		\N
69	Крупа манная		\N
166	Киноа		\N
164	Соус Вустерский		\N
67	Крупа рисовая		\N
68	Крупа пшеная		\N
42	Рис		\N
77	Баклажаны		ingredients/Баклажаны/Баклажаныc72cb23f-434d-4795-b86a-ea5da40ec195.JPG
4	Чеснок		ingredients/Чеснок/Чеснокf1e7a815-833e-42c5-adf8-bd7e12c970df.jpg
91	Абрикосы		ingredients/Абрикосы/Абрикосы7f4a706b-b309-4d8a-b453-64f9b34e3da4.jpg
54	Авокадо		ingredients/Авокадо/Авокадоb8e9186d-adbd-4fbf-8044-21aad9cf4f6a.jpg
174	Багет	Длинное и тонкое хлебобулочное изделие, мягкое внутри, с хрустящей корочкой, часто припудренное мукой. У стандартного багета длина примерно 65 см, ширина 5-6 см и высота 3-4 см. Вес приблизительно 250 г.	\N
175	Орегано	Специя орегано – это высушенные листья и соцветия растения. Также летом используются свежие листья. Душица обладает приятным, тонким ароматом и пряным, чуть горьким вкусом. Специя возбуждает аппетит и способствует пищеварению. \nОрегано – неотъемлемый ингредиент многих пряных смесей (дукка, затар, итальянские травы, карри, прованские травы), отлично сочетается с черным перцем, базиликом, розмарином, эстрагоном, фенхелем, анисом, тимьяном и родственным майораном.\nОрегано облагораживает вкус мяса, рыбы, птицы, дичи, паштетов, разнообразных начинок из фарша и ливера, домашних колбас, соусов, маринадов. \nСпецию обажают итальянцы – ее добавляют в пасты, пиццу, лазанью, всевозможные овощные и рыбные салаты, холодные и горячие закуски, супы, соусы .\nОрегано хорошо сочетается с оливками, каперсами, артишоками, корнишонами, шампиньонами и другими грибами, свежими и вялеными томатами. Подходит для омлетов (и других блюд с яйцами), творога, каш, бобовых, начинок для пирогов, пельменей, запеканок.\nОрегано невероятно популярно в Турции, там специю используют в разнообразнейщих блюдах. В России душицей ароматизируют домашнее пиво, компоты, квас и даже вино, добавляют в горячие и холодные блюда. Например, в печеную ягнятину и картофель. Используется в блюдах, приготовляемых на гриле\nОрегано добавляют в оливковое масло, уксусы. Хранят в сухом виде или замораживают свежие листья.	\N
57	Хлеб	Хлебобулочное изделие без начинки с влажностью более 19 % (по терминологии ГОСТ 32677-2014 массой более 500 г), получаемое путём выпекания теста (состоящего как минимум из муки и воды), разрыхлённого дрож­жами или за­ква­ской	\N
172	Рикотта		\N
53	Перец красный молотый		\N
163	Манго		\N
48	Мускатный орех		\N
17	Сыр плавленый		\N
171	Малина		\N
173	Угорь копчёный		\N
178	Овощи		\N
179	Морепродукты		\N
64	Перец чёрный молотый		\N
170	Кальмар		\N
168	Салат-латук		\N
180	Ванилин		\N
181	Масло растительное		\N
169	Масло кунжутное		\N
182	Судак		\N
183	Сыр моцарелла		\N
186	Сахар коричневый		\N
187	Индейка		\N
188	Ревень		\N
189	Уксус		\N
191	Уксус бальзамический		\N
161	Уксус винный		\N
192	Кинза		\N
193	Лещ		\N
194	Прованские травы		\N
195	Дыня		\N
199	Рисовый уксус		\N
200	Петрушка		ingredients/Петрушка/Петрушкаfca03234-4ba6-40a9-9554-03314bf2972b.JPG
198	Шампиньоны		ingredients/Шампиньоны/Шампиньоны27f51ce7-0621-41ac-b8bf-89a0585f20fa.JPG
201	Соевый соус		\N
202	Соус тирияки		\N
203	Соус унаги		\N
204	Крупа		\N
205	Соус		\N
206	Лук ялтинский		ingredients/Лук ялтинский/Лук ялтинскийca1b612f-9e27-4aeb-9a16-b7e69ea90e9e.JPG
207	Салат Ромен		ingredients/Салат Ромен/Салат Роменf0667c30-6e34-496a-afcd-5d2cf46ffecb.jpg
167	Пармезан		ingredients/Пармезан/Пармезан527a7a25-438e-40dc-b125-3cf97a69dc8b.jpg
165	Анчоус		ingredients/Анчоус/Анчоусff2826ba-276b-455c-bb72-24a8b156b9e8.jpg
56	Фарш		ingredients/Фарш/Фаршcd4e02b0-743e-4e65-9c55-f0de3ff5e058.jpg
2	Мясо		ingredients/Мясо/Мясоd43f2cc9-a249-4566-a6e5-3eb4a2967335.jpg
23	Огурцы		ingredients/Огурцы/Огурцы7960f562-6b6d-4d71-aea3-7dd5bb2de7ec.jpg
208	Инжир		ingredients/Инжир/Инжирf6f44817-281c-49d8-9ffa-1fb8972115cb.jpg
196	Имбирь		ingredients/Имбирь/Имбирь44ce124c-80da-4927-a487-139e99c9488d.jpg
197	Грецкий орех		ingredients/Грецкий орех/Грецкий орехdc1afb92-f1ea-48d3-b67e-145f87f95e51.jpg
11	Помидоры		ingredients/Помидоры/Помидорыd7158b98-d987-4fe5-9baa-fb98584df161.JPG
15	Перец болгарский		ingredients/Перец болгарский/Перец болгарскийd9bf3789-3eec-4b26-8702-9d3ff7b6ee67.jpg
29	Масло подсолнечное		ingredients/Масло подсолнечное/Масло подсолнечноеc50c9288-298c-4e51-97f8-862f9b2e1a36.jpg
209	Слива Top Hit	Слива Top Hit - поздний сорт сливы немецкой селекции. Относится к крупным сортам сливы. Плоды очень крупные, массой около 100 г, отличного сладкого вкуса. Форма плодов - яйцевидная. Мякоть желтая, сочная. Созревает сорт в конце сентября - начале октября. Косточка хорошо отделяется. Урожайность сорта высокая, стабильная, плодоносит ежегодно. Сорт отлично подходит для промышленных насаждений и выращивания на приусадебных участках. Транспортабельность плодов высокая. Зимостойкий сорт. Перспективен для выращивания на Украине.\nВысокоурожайный сорт сливы, позднего срока созревания.\n\nОдин из самых популярных сортов сливы, выведенный в 1995 году в Германии, путем скрещивания сортов «Чачакская ранняя» (Čačanska rana) и «Президент» (President).\nСорт отличается высокой урожайностью, крупноплодностью, с высокой вкусовой оценкой и способностью к долгой транспортировке.\nСорт самоплодный, не требует опылителей, но для лучшего плодоношения, подойдут такие сорта как «Чачакская ранняя» и «Президент».\nСлива хорошо переносит влагу и заморозки.\nДеревья среднерослые, с округлой густой кроной.\nПлоды сливы крупные, яйцевидной пропорциональной формы.\nЦвет темно – фиолетовый с голубым налетом.\nМякоть янтарного цвета, плотная, приятного сладкого вкуса, с легкой кислинкой.\nКосточка, среднего размера, хорошо отделимая.\nУрожайность взрослого дерева очень высокая: 70 -100 кг.\nСрок созревания: конец сентября – середина октября.\n\nОт меня: мясисто-сочная, со сливовым привкусом, сладкая с еле заметной кислинкой\n\n	ingredients/Слива Top Hit/Слива Top Hit2ca2b3b7-2782-443e-9418-09219f1902ce.jpg
210	Слива Blue Free	Слива Блю Фри\nПроисхождение: сорт выведен в США. Получен от скрещивания сортов Стенли и Президент.\nСроки созревания: Блю Фри слива позднего срока созревания - плоды созревают во второй декаде сентября.\nХарактеристика плода: плоды крупные (массой 60- 75гр., при хорошем уходе и до 100 гр.), округло асимметричной формы, слегка приплюснутые.  Иссиня-черные, с дымчатым налетом фрукты длительно висят на ветвях, после созревания приобретают сочную мякоть с кисло-сладким вкусом. Сочная мякоть со средней и легко отделяющейся внутри плода косточкой имеет желтый цвет и отличается своим гармоничным вкусом: вкус десертный, сладкий, с легкой кислинкой, отличный, 4,5 балла.\nРостовые особенности сорта:  дерево сильнорослое, особенно активный рост в первые годы после посадки. После вступления в плодоношение рост ослабевает. Образует густую раскидистую крону, ветви которой отходят от центрального проводника под довольно большими углами. Сорт отличается крупноплодностью, вступает в плодоношение рано, урожайность высокая, ежегодная.\nСорт адаптирован к климатическим условиям на всей территории Украины.\nОпылители: частично самоплодный, но наилучшие результаты по урожайности дает выращивание с такими опылителями как Стенли, Вижен, Эмпресс, Президент, Анна Шпет, Опал, Вериту, Руш Герштеттер, Амерс.\nЗимостойкость: зимостойкость очень высокая . Не боится возвратных морозов.\nУстойчивость к болезням: почти не поражается болезнями.\nОсобенности: засухоустойчивый, зимостойкий, высокоурожайный, стойкий к грибковым болезням сорт, не требователен к грунту. Плоды сливы Блю Фри универсальны в назначении, пригодны для чернослива, сушки, консервирования и употребления в свежем виде. Высокотоварные сливы отлично транспортируются, хранятся до 3-х месяцев  в холодильнике.\n\nОт меня: мясистая, с кислинкой	ingredients/Слива Blue Free/Слива Blue Free69e3f839-d37f-494b-b1fb-c880c6ee875a.jpg
211	Слива Волошка	Сорт Волошка украинской селекции. Выведен Институт помологии им. Л.П.Симиренко НААН Украины, полученый в результате скрещивания сортов Угорка италийська х Большая синяя. Селекционерами И.И. Ильчишин, А.М Шевченко В. Ф. Ласкавий. \nСаженец высотой от 140 до 180 см привитый на подвое Алыча дикая с мощной корневой системой. \nСрок созревания: позднеспелый. \nДерево сорта Волошка сильнорослое, крона широкоокруглая, средней загущенности. В плодоношение вступает на 4-5-й год. Плодоносит преимущественно на букетных веточках и шпорцах. \nПлоды сорта Волошка крупные (45-60 г), овальной формы типа венгерок. Кожица плотная, неравномерного темно-синего цвета с зеленовато-фиолетовыми, иногда оранжевыми пятнами и разбросанными по всей поверхности плода коричневыми точками. Косточка хорошо отделяется от мякоти. \nМякоть плотная, сочная, желто-зеленая, приятного кисло-сладкого вкуса. В плодах содержится, %: сухих растворимых веществ – 17-18, сахаров 9,8, органических кислот 0,9. \nСорт Волошка отличается хорошей зимостойкостью и засухоустойчивостью, удовлетворительной стойкостью к грибковым болезням. Сорт неприхотлив к условиям произрастания. \nСозревание сорта Волошка в условиях Киевской области наступает в начале сентября. Плоды высоких вкусовых и товарных качеств. Основное назначение - употребление в свежем виде, а также для приготовления высококачественных продуктов переработки: варенья, джемов, пастилы, компотов и чернослива. В селекции используеться для виведенния нових крупноплодных форм сливы типа венгерок. \n\nОт меня: мясистый, с кислинкой, косточка маленькая, хорошо отходит	ingredients/Слива Волошка/Слива Волошка48b9945e-67c8-42a6-bc33-0d85562bef90.jpg
212	Слива Чемпион	Сорт зимостойкий. Засухоустойчивость высокая. Восприимчив к монолиозу особенно во влажные годы. Сорт скороплодный, с 4-6 лет. Урожайность равномерная и высокая по годам, 230 ц/га. Сорт самобесплодный. Сила роста средняя. Косточка крупная, не отделяется или полуотделяется. При достаточном поливе в августе, хорошо отделяется. Не требователен к условиям произрастания, плоды высоко-транспортабельные, высокотоварные, очень привлекательные. Универсального использования.\n\nОт меня: мясистая, не сочная,сладкая - очень вкусная	ingredients/Слива Чемпион/Слива Чемпион92f4195e-67cd-4548-bac5-d42be57e7016.jpg
87	Клубника		ingredients/Клубника/Клубникаda99b6ff-2741-47b3-9ab7-089ad40c29a1.jpg
110	Перец горький		ingredients/Перец горький/Перец горькийeaaf7872-a229-439e-9c21-39f7fd47b044.jpg
58	Укроп		ingredients/Укроп/Укроп40c03438-43c1-4829-b757-bf7d4d824dcc.jpg
120	Салат		ingredients/Салат/Салатe52c7411-55c5-4b15-bc86-1584300c2138.jpg
153	Масло оливковое		ingredients/Масло оливковое/Масло оливковое09e19b67-66aa-491a-a1cc-ee4126179279.jpg
213	Камамбер	Камамбер – это мягкий и жирный французский сыр, покрытый бархатистой корочкой белой плесени. Внешне камамбер легко спутать с сыром бри, но его жирность гораздо выше, из-за чего он кажется более нежным и сливочным. Главная особенность камамбера заключается в лёгкости плавления – уже через несколько минут при комнатной температуре его серединка размягчается и начинает течь.	ingredients/Камамбер/Камамберa5ee01ae-3a9e-4f27-9bdd-5c80f8f0565f.jpg
214	Яичный белок		\N
215	Яичный желток		\N
\.


--
-- Data for Name: ingredient_ref; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.ingredient_ref (id, ingredient_id, parent_ingredient_id) FROM stdin;
237	22	23
681	120	9
682	47	9
683	58	9
684	60	9
685	160	9
686	152	9
687	192	9
688	16	9
597	186	25
599	39	2
600	56	2
601	38	2
602	62	2
603	187	2
712	78	18
713	156	18
714	157	18
715	172	18
716	167	18
717	17	18
718	183	18
74	136	39
75	51	39
719	150	18
721	3	178
722	4	178
723	5	178
724	6	178
725	8	178
726	11	178
727	14	178
728	12	178
729	15	178
730	23	178
731	13	178
732	70	178
733	59	178
734	71	178
735	111	178
736	77	178
737	79	178
738	110	178
739	144	178
740	132	178
741	135	178
742	188	178
743	10	178
744	196	178
746	101	85
436	130	90
747	142	85
748	197	85
574	153	181
575	29	181
576	169	181
440	168	120
441	97	119
442	155	119
443	87	119
444	113	119
445	96	119
446	171	119
447	154	119
448	50	57
449	174	57
450	117	57
451	45	179
452	80	179
453	170	179
454	123	179
630	191	189
631	161	189
641	147	149
642	76	149
643	65	149
644	148	149
645	173	149
646	165	149
647	182	149
648	193	149
650	43	40
651	44	40
652	74	40
653	118	40
654	159	40
655	114	40
656	175	40
657	53	40
658	48	40
659	64	40
660	124	40
661	180	40
662	134	40
663	194	40
665	93	88
666	146	88
667	131	88
668	145	88
669	125	88
670	163	88
671	140	88
672	91	88
673	115	88
674	112	88
675	116	88
676	128	88
677	95	88
678	54	88
679	141	88
680	195	88
749	198	46
750	199	189
751	200	9
752	66	204
753	69	204
754	166	204
755	164	205
756	201	205
757	202	205
758	203	205
759	67	204
760	68	204
761	42	204
762	206	3
763	207	120
764	208	88
765	209	131
766	210	131
767	211	131
768	212	131
769	213	18
770	214	27
771	215	27
\.


--
-- Name: ingredient_ref_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.ingredient_ref_id_seq', 771, true);


--
-- Name: ingridient_ids; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.ingridient_ids', 215, true);


--
-- Data for Name: proportion; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.proportion (id, recept_id, ingredient_id, norma, optional) FROM stdin;
8	1	2	\N	f
9	1	3	\N	f
10	1	1	3л	f
11	1	13	1 стакан	f
12	1	9	\N	f
13	1	5	\N	f
14	1	10	\N	f
15	1	4	\N	f
16	1	8	\N	f
17	1	12	1 стакан	f
18	1	11	0,5кг	f
19	1	14	4шт.	f
20	2	1	3л	f
21	2	14	5шт.	f
22	2	3	\N	f
23	2	11	\N	f
24	2	9	\N	f
25	2	16	\N	f
26	2	5	\N	f
27	2	15	\N	f
28	3	14	\N	f
29	3	9	\N	f
63	3	3	\N	f
64	3	24	3ст.л.	f
65	3	2	\N	f
66	3	4	\N	f
67	3	33	200г + 2ст.л.	f
92	17	29	\N	f
93	17	3	\N	f
94	17	45	\N	f
121	21	36	\N	f
125	22	18	\N	f
126	22	46	\N	f
127	22	27	1шт.	f
128	22	50	\N	f
129	22	49	\N	f
130	22	51	\N	f
139	25	9	\N	f
140	25	28	60г	f
141	25	30	200г	f
142	25	33	40г	f
143	25	24	2 стакана	f
144	25	27	3шт.	f
145	26	33	200г	f
146	26	1	3ст.л.	f
147	26	46	0,5кг	f
148	26	18	150г	f
149	26	51	0,5кг	f
150	26	8	\N	f
151	26	27	3шт.	f
152	26	48	\N	f
153	26	24	200г	f
154	26	26	0,5ч.л.	f
155	26	21	\N	f
156	26	3	\N	f
157	26	28	50г	f
160	28	40	\N	f
161	28	14	\N	f
162	28	28	\N	f
163	28	18	\N	f
164	28	3	\N	f
165	28	39	\N	f
41	7	26	0,5ч.л.	f
42	7	31	2ч.л. сухих или 50г мокрых	f
43	7	24	3,5 стакана	f
44	7	30	200г	f
45	7	25	2 ст.л.	f
49	8	32	250г	f
50	8	25	200г	f
51	8	27	2-3шт.	f
52	8	35	\N	f
53	8	28	100г	f
47	8	26	\N	f
48	8	24	3 стакана	f
78	14	14	\N	f
79	14	5	\N	f
80	14	40	\N	f
81	14	39	\N	f
172	30	3	2шт.	f
173	30	57	4 ломтика	f
174	30	56	1кг	f
175	30	50	\N	f
59	10	26	1ч.л.	f
60	10	1	0,8 стакана	f
61	10	24	2 стакана	f
62	10	27	1шт.	f
71	12	36	\N	f
58	10	29	1ч.л.	f
72	12	37	\N	f
87	16	2	0,5кг	f
89	16	44	\N	f
91	16	43	\N	f
84	15	3	1 шт	f
69	11	9	\N	f
111	20	14	4шт	f
110	20	27	3шт	f
104	19	18	150г	f
105	19	3	1шт	f
54	9	1	0,5 стакана	f
55	9	26	0,5ч.л.	f
56	9	24	1 стакан	f
57	9	29	2ст.л.	f
186	32	11	\N	f
187	32	33	\N	f
188	32	18	\N	f
189	32	3	\N	f
190	32	51	0,5кг	f
191	32	4	\N	f
192	32	15	\N	f
193	32	59	6шт.	f
194	32	60	\N	f
195	33	4	2 зубчика	f
196	33	40	\N	f
197	33	25	1ст.л.	f
198	33	2	0,5кг	f
199	33	3	4шт.	f
200	33	61	\N	f
201	34	27	4шт.	f
202	34	32	4ст.л.	f
203	34	60	\N	f
204	34	4	\N	f
205	34	24	0,5кг	f
206	34	28	300г	f
207	34	48	\N	f
208	34	63	0,5л	f
209	34	64	\N	f
86	16	5	4шт.	f
210	34	62	300г	f
237	39	11	\N	f
238	39	53	\N	f
239	39	18	\N	f
240	39	36	\N	f
241	40	24	2ст.л.	f
242	40	14	1кг	f
243	40	64	\N	f
244	40	3	1шт.	f
245	40	27	2шт.	f
250	42	19	\N	f
251	42	40	\N	f
252	42	9	\N	f
253	42	27	\N	f
254	42	3	\N	f
259	44	51	1шт.	f
260	44	11	\N	f
261	44	18	200г + 50г	f
262	44	23	1шт.	f
263	44	9	\N	f
264	44	34	\N	f
265	44	15	\N	f
266	44	27	3шт.	f
267	45	11	\N	f
268	45	33	\N	f
269	45	2	\N	f
270	45	12	(консервированная)	f
271	45	8	\N	f
272	46	27	4шт.	f
273	46	12	(консервированная) 0,5 банки	f
274	46	9	\N	f
275	46	18	100г	f
276	46	34	\N	f
277	46	3	1шт.	f
278	46	38	1шт. (0,5кг)	f
279	47	22	\N	f
280	47	14	\N	f
281	47	27	\N	f
282	47	5	\N	f
283	47	2	\N	f
284	47	12	(консервированная)	f
285	47	34	\N	f
297	49	34	\N	f
298	49	76	(консерва)	f
299	50	18	\N	f
300	50	5	\N	f
301	50	6	\N	f
302	50	4	\N	f
303	50	34	\N	f
304	51	4	1 зубчик	f
305	51	57	100г	f
306	51	50	150г	f
307	51	9	\N	f
308	51	18	150г	f
309	51	27	1шт.	f
310	51	32	немного	f
311	51	77	1кг	f
312	51	78	200г	f
178	30	27	2шт.	f
344	57	12	1 банка	f
313	52	11	\N	f
314	52	77	\N	f
315	52	14	\N	f
316	52	9	\N	f
317	52	18	\N	f
333	55	3	1шт	f
336	55	40	\N	f
338	55	32	1л	f
339	55	26	\N	f
342	56	3	2шт	f
247	41	3	4шт	f
248	41	2	600г	f
246	41	27	\N	f
343	56	5	2-3шт	f
365	60	2	300г	f
366	60	64	\N	f
367	60	34	100г	f
368	60	14	7-8шт.	f
369	60	26	\N	f
370	60	18	100г	f
371	60	3	1шт.	f
372	61	27	4шт.	f
373	61	3	2шт.	f
374	61	58	\N	f
375	61	56	1кг	f
376	61	40	\N	f
377	61	26	\N	f
378	61	34	3ст.л.	f
379	61	24	3ст.л.	f
380	61	18	400г	f
381	64	33	3 стакана	f
383	64	72	0,5 банки	f
384	64	63	0,5л	f
385	64	27	2шт	f
386	64	24	1,5 стакана	f
388	64	82	(погашеная) 1ч.л.	f
391	65	28	190г	f
392	65	25	90г	f
393	65	24		f
398	65	35	\N	f
394	66	25	130г	f
395	66	27	2шт	f
396	66	24	170г	f
397	66	82	1 ч.л.	f
399	66	83	2ст.л.	f
400	66	84	110г	f
401	66	85		f
402	67	24	6 стаканов + 100г	f
403	67	32	1л +400г	f
404	67	25	450г	f
405	67	27	(желтки) 4-8шт	f
406	67	1	350г	f
407	67	30	500г	f
389	64	81	5 ст.л.	f
293	49	14	2шт	f
294	49	18	150г	f
295	49	27	4шт	f
296	49	5	3шт	f
257	43	72	200г	f
255	43	28	25г	f
256	43	73	150г	f
345	57	57	3 ломтика	f
439	74	87		f
418	70	36	\N	f
440	74	92	корж	f
441	75	24	1,5 стакана	f
442	75	25	1 стакан	f
443	75	27	4шт	f
444	75	32	85мл	f
445	75	28	180г	f
446	75	93	\N	f
447	75	94		f
469	78	27	3шт	f
470	78	82	0,5 ч.л.	f
458	77	33	1 стакан	f
459	77	27	2шт	f
460	77	25	1 стакан	f
461	77	82	1 ч.л.	f
462	77	24	1,5-2 стакана	f
463	77	98	1 стакан	f
464	77	97	300г	f
465	78	24	1,5 стакана	f
466	78	33	3 ст.л.	f
467	78	28	250г	f
468	78	25	0,5 стакана	f
471	78	35		f
472	78	100	1 ст.л.	f
473	78	99	(сливовое) 1 стакан	f
481	80	32	700г	f
482	80	27	2шт	f
483	80	24		f
484	80	31	1/4 пачки	f
485	80	37		f
486	81	28	100г	f
487	81	24	1ст.л.	f
488	81	73	0,5 стакана	f
489	81	25	1 стакан	f
490	81	27	1шт + 2 желтка	f
491	81	101	(рубленый) 1 стакан	f
492	81	102	2 ст.л.	f
352	58	34	4ст.л.	f
353	58	5	2шт.	f
354	58	40	\N	f
355	58	14	7шт.	f
356	58	2	0,5кг	f
357	58	3	1шт.	f
358	58	18	200г	f
426	72	90	1л	f
346	57	64	\N	f
347	57	18	150г	f
348	57	34	\N	f
349	57	4	\N	f
350	57	27	3шт.	f
351	57	79	1 банка	f
359	59	11	\N	f
360	59	67	\N	f
361	59	27	\N	f
362	59	18	\N	f
363	59	34	\N	f
364	59	80	\N	f
419	70	25		f
420	70	74	\N	f
506	83	103	0,5кг	f
502	83	27	3шт	f
503	83	28	2 ст.л.	f
504	83	69	2,5 ст.л.	f
507	83	104		f
508	83	5		f
509	84	28	200г	f
510	84	91	(консервированные) 0,5л	f
511	84	27	4шт	f
512	84	25	1,5 стакана	f
513	84	86	2 ч.л.	f
514	84	24	3 стакана	f
515	84	35		f
516	85	90	1,5 стакана	f
517	85	100	(кукурузный) 1 стакан	f
518	85	25	0,5 стакана	f
519	85	105	1 щепотка	f
525	88	30	1 ст.л.	f
526	88	90	(апельсиновый) 0,5 стакана	f
527	88	24	1,5 стакана	f
528	88	82	0,5 ч.л.	f
529	88	83		f
530	88	85		f
531	89	28	100г	f
532	89	25	6 ст.л.	f
533	89	27	3шт	f
534	89	24	4 ст.л	f
535	89	75	(жидкий) 100г	f
574	96	5		f
575	96	44		f
576	96	43		f
584	98	11	5кг	f
421	71	24	6 стаканов	f
424	71	28	90г	f
423	71	25	3ч.л.	f
422	71	27	7шт	f
548	92	95	1кг	f
549	92	25	0,5кг	f
585	98	25	50г	f
586	98	26	60г	f
587	98	44		f
588	99	25	850г	f
589	99	111	1кг	f
590	99	112	1шт	f
550	93	88	\N	f
177	30	26	1 ч.л. с верхом	f
619	105	22	5-6шт	f
40	7	32	1 стакан	f
591	99	113	150г	f
614	104	40		f
615	104	26		f
616	104	55	2 ст.л.	f
617	104	10	1шт	f
567	95	1	1л	f
568	95	25	200г	f
569	95	88		f
577	97	11	3кг	f
578	97	15	1кг	f
579	97	25	3 ст.л.	f
580	97	26	1 ст.л.	f
581	97	4	6 зубьев	f
582	97	9		f
583	97	40		f
570	96	1	1,5л	f
571	96	26	2 ст.л.	f
572	96	25	2 ст.л.	f
573	96	8		f
592	100	2	\N	f
593	100	1		f
594	100	26		f
595	100	44		f
596	100	43		f
597	100	114	\N	f
598	101	111	\N	f
599	101	95		f
600	101	25		f
601	101	115	(сок)	f
602	102	95	1кг	f
603	102	1	3/4 стакана	f
604	102	25	1,5 стакана	f
605	103	95	1кг	f
606	103	25	150г	f
607	103	112	3шт	f
560	94	3	4-5шт	f
561	94	15	1кг	f
562	94	5	0,5кг	f
563	94	4	2 головки	f
564	94	9		f
565	94	77	3кг	f
566	94	110	1шт	f
551	93	35		f
552	93	33	0,5л	f
553	93	25	3 ст.л.	f
554	93	81	3 ст.л.	f
555	93	28	50г	f
556	93	89	60г	f
557	93	109	(сладкий) 150г	f
558	93	108	0,5л	f
613	104	4	3 зубчика	f
608	104	2	700г	f
627	106	3	2шт	f
628	106	4	3 зубчика	f
629	106	52	2 ст.л.	f
630	106	26		f
618	105	2	700г	f
620	105	8	1/4 вилка	f
621	105	34	по вкусу	f
622	105	117	на 20 маленьких порций	f
609	104	3	2шт	f
610	104	5	1шт	f
611	104	15	2шт	f
612	104	9	0,5 пучка	f
623	106	2	1кг	f
624	106	46	700г	f
625	106	18	300г	f
626	106	33	4 ст.л.	f
631	106	64		f
632	106	11	4шт	f
428	72	89	60г (или 2-3ч.л. агара)	f
559	93	90	100г	f
647	109	103	700г	f
648	109	25	2/3 стакана	f
649	109	27	5шт	f
650	109	32	1 стакан	f
651	109	69	1/2 стакана	f
652	109	35	2 ч.л.	f
653	109	86	1 ч.л.	f
654	109	119	\N	f
655	110	56	700г	f
656	110	27	2шт	f
657	110	50		f
658	110	40		f
659	110	3	2шт	f
660	110	11	2шт	f
661	110	120	(листья)	f
662	110	121	(для гамбургеров) 9шт	f
663	6	27	4шт	f
664	6	25	0,8 стакана	f
665	6	24	1 стакан	f
666	6	35		f
668	111	27	3шт	f
669	111	28	100г	f
670	111	25	0,5 стакана	f
671	111	35		f
672	112	72	\N	f
673	112	81		f
674	112	85		f
675	113	11	\N	f
676	113	23		f
677	113	9		f
678	113	33		f
679	113	123	\N	f
88	16	4	1 головка	f
46	8	31	17г сухих или 40г мокрых	f
688	15	40	\N	f
689	15	5	2 шт	f
690	15	27	7-8 шт	f
691	15	56	1кг	f
692	15	26		f
318	52	3	\N	f
701	19	5	1шт	f
667	74	122		f
702	19	27	4шт	f
703	19	24	1 ст. л.	f
704	19	15	2шт	f
705	19	59	1шт	f
706	55	2	1кг	f
707	55	11	3шт	f
708	55	46	300г	f
709	55	28	100г	f
710	55	48		f
711	55	24	3ст.л.	f
712	55	18	немного	f
713	55	9		f
693	115	2	0,5 кг	f
694	115	11	3шт	f
695	115	15	3шт	f
696	115	27	6шт	f
697	115	23	2шт	f
698	115	18	150г	f
699	115	33		f
700	115	12	1 банка	f
714	20	34		f
715	20	17	1шт	f
716	20	120	7-8 листьев	f
717	20	40		f
718	20	39	200г	f
719	20	4	2-3 зубца	f
720	20	9		f
721	20	46	(маринованные) 200г	f
728	41	15	5шт	f
729	41	19	1,5 стакана	f
730	41	33	200г	f
731	41	24	1,5 ст.л.	f
732	41	64		f
733	41	124	1 ст.л.	f
758	119	27	4шт	f
734	116	2	1кг	f
735	116	3	3шт	f
736	116	15	2шт	f
737	116	9	100г	f
738	116	11	(в собственном соку) 400г	f
739	116	32	0,5 стакана	f
740	116	24	400г	f
741	116	27	1шт	f
742	116	40		f
747	118	14	3-4шт	f
748	118	3	2шт	f
749	118	19	800г	f
750	118	32	100г	f
751	118	63	200г	f
752	118	26		f
753	118	9		f
754	118	64	(лучше белый)	f
755	119	2	200г	f
756	119	11	2шт	f
757	119	46	300г	f
759	119	18	200г	f
769	121	92	1 порция	f
770	121	28	200г	f
771	121	72	1 банка	f
772	121	73	немного	f
773	121	75	30г	f
774	121	85	30г	f
775	121	1	120г	f
776	121	25	130г	f
777	121	115	1 ломтик	f
778	121	125	3шт	f
779	121	126	1 ст.л.	f
746	118	4	1 головка	f
788	123	27	5шт	f
789	123	25	360г	f
790	123	28	100г	f
791	123	33	200г	f
792	123	24	250г	f
793	123	82	1/3 ч.л	f
794	123	86	1 ч.л.	f
795	123	81	2 ст.л.	f
796	123	85	70г	f
801	123	127	1 порция	f
802	13	2	700г	f
803	13	4	3 зубца	f
804	13	33	3 ст.л.	f
805	13	26		f
806	13	64		f
807	13	52	(в зёрнах) 2ст.л.	f
808	56	2	0,5кг	f
809	56	8	1/4 вилка	f
810	56	11	3шт.	f
811	56	14	3-4шт.	f
812	56	59	2шт	f
813	56	77	1-2шт	f
814	125	77	3-4шт	f
815	125	3	1шт	f
816	125	4	1 зубец	f
817	125	11	2-3шт	f
818	125	18	200г	f
819	125	56	400г	f
820	125	33		f
821	125	9		f
829	5	24	210г	f
830	5	27	6шт	f
831	5	25	200г	f
832	5	81	1 ч.л.	f
833	5	85	30г	f
834	5	28	140г	f
835	5	93	0,5кг	f
836	11	15	3шт	f
837	11	11	3шт	f
838	11	4	2 зубца	f
839	11	29	2ст.л.	f
840	127	56	(куриный) 0,5кг	f
841	127	27	1шт	f
842	127	32	150мл	f
843	127	3	1шт	f
844	127	46	200г	f
845	127	17	2шт	f
846	127	4	1 зубец	f
847	127	34	2-3ст.л.	f
848	127	9		f
849	128	27	5шт	f
850	128	6	3шт	f
851	128	14	6шт	f
852	128	5	6шт	f
853	128	9		f
854	128	64		f
855	128	34		f
856	129	28	200г	f
857	129	25	225г	f
858	129	24	280г	f
859	129	86	1,5 ч.л.	f
860	129	27	4шт	f
861	129	35		f
862	129	128	600г	f
865	131	27	4 шт.	f
866	131	24	1,5 стакана	f
867	131	25	1,3 стакана	f
868	131	28	200г	f
869	131	35	1 ч.л.	f
870	132	103	500г	f
871	132	27	3 яйца	f
872	132	69	3 ст.л.	f
873	132	25	5 ст.л.	f
874	132	35	щепотка	f
875	132	86	10г	f
876	132	88	(или варенье)	f
877	133	3	1шт	f
878	133	63	200мл	f
879	133	18	70г	f
880	133	46	300г	f
881	133	129	400г	f
882	134	1	0,5л	f
883	134	26	17г (0,7ст.л.)	f
884	134	15	2-3шт.	f
885	134	25	35г (почти 2ст.л. без горки)	f
886	134	130	12г (полные 2 ч.л.)	f
887	135	24	1 стакан	f
888	135	27	2шт	f
889	135	28	113г	f
890	135	86	1 ч.л.	f
891	135	25	3/4 стакана	f
892	135	131	(венгерка) 12шт	f
893	136	56	400г	f
894	136	15	8-10шт	f
895	136	42	3ст.л.	f
896	136	11	3шт	f
897	136	3	2шт	f
898	136	5	1шт	f
899	136	4	2 зубца	f
900	136	9	\N	f
901	136	25	щепотка	f
902	136	26	\N	f
903	136	64	\N	f
904	136	1	0,5 л	f
905	136	33	200г	f
906	137	14	3-4шт	f
907	137	5	1шт	f
908	137	18	(адыгейский) 100г	f
909	137	17	(или косичка) 70г	f
910	137	9	\N	f
911	137	43	\N	f
912	137	64	\N	f
913	137	132	\N	f
914	137	70	\N	f
923	139	24	1,5 стакана	f
924	139	25	1 стакан	f
925	139	82	1 ч.л.	f
926	139	81	0,25 стакана	f
927	139	29	3/8 стакана	f
928	139	1	1 стакан	f
929	139	130	3 ч.л.	f
930	139	35	0,5 пакета	f
931	139	26	0,5 ч.л.	f
932	140	61	200г	f
933	140	56	250г	f
934	140	3	1шт.	f
935	140	4	1 зубец	f
936	140	11	3шт.	f
937	140	26	\N	f
938	140	64	\N	f
939	141	2	0,5кг	f
940	141	11	3шт	f
941	141	3	2шт	f
942	141	5	1шт	f
943	141	15	1шт	f
944	141	77	1шт	f
945	141	9	\N	f
946	141	26		f
947	141	40	\N	f
948	142	92	\N	f
950	142	24	0,5ст.л.	f
949	142	1	75мл	f
951	142	25	1 стакан	f
952	142	27	5шт	f
953	142	89	20г	f
954	142	32	0,5 стакана	f
955	142	28	150г	f
956	142	35	0,5 пакета	f
957	142	127	1,5 порции	f
960	143	27	3шт.	f
964	143	103	0,5 кг	f
966	143	100	(карт.) 2 ст.л. с горкой	f
974	144	9	\N	f
969	144	3	3шт	f
968	144	5	2шт	f
967	144	51	3шт	f
970	144	63	5 ст.л.	f
971	144	15	1шт	f
972	144	11	1шт	f
973	144	4	3 зубца	f
975	144	134	1 ч.л.	f
976	145	28	200г	f
978	145	27	2-3шт	f
979	145	81	3 ст.л.	f
980	145	24	200г	f
981	145	86	1 ч.л.	f
982	145	103	250г	f
977	145	25	200г + в начинку по вкусу	f
990	147	79	0,5 банки	f
991	147	2	700г	f
992	147	5	1шт	f
993	147	3	1шт	f
994	147	11	3шт	f
995	147	26	2ч.л.	f
996	147	9	\N	f
997	147	4	2 зубца	f
998	148	77	0,5кг	f
962	143	25	80г	f
965	143	33	100г	f
999	148	15	1кг	f
1000	148	5	0,5кг	f
1001	148	3	400г	f
1002	148	11	400г	f
1003	148	25	1 ст.л.	f
1004	148	26	\N	f
1005	148	9	\N	f
1006	148	135	1шт	f
1007	149	11	2шт	f
1008	149	15	1шт	f
1009	149	5	1шт	f
1010	149	3	1шт	f
1011	149	4	3 зубца	f
1012	149	34	5 ст.л.	f
1013	149	64	\N	f
1014	149	136	0,5кг	f
1015	150	24	2 стакана	f
1016	150	1	2/3 стакана	f
1017	150	31	(сухие) 2ч.л.	f
1018	150	83	1ч.л.	f
1019	150	29	2ст.л.	f
1020	150	58	\N	f
1021	150	4	1 головка	f
1022	151	28	200г	f
1023	151	25	1,5 стакана	f
1024	151	81	0,5 стакана	f
1025	151	27	4шт	f
1026	151	82	0,5ч.л.	f
1027	151	24	2 стакана	f
1028	150	26	1 ч.л без горки	f
1029	152	25	1ч.л.	f
1030	152	1	1/2 стакана	f
1031	152	31	5г	f
1032	152	24	250г	f
1033	152	29	3ст.л.	f
1034	152	26	щепотка	f
1035	152	11	3шт	f
1036	152	3	2шт	f
1037	152	18	100г	f
1046	154	2	300г	f
1047	154	4	2 зубца	f
1048	154	18	100г	f
1049	154	27	4шт	f
1050	154	5	2шт	f
1051	154	6	2шт	f
1052	154	34	\N	f
1053	155	74	\N	f
1055	155	141	15шт	f
1056	155	140	2-3шт	f
1057	155	142	1шт	f
1058	156	125	2шт	f
1059	156	95	2шт	f
1060	156	85	1 стакан	f
1061	156	143	125г	f
1062	157	27	1шт	f
1063	157	29	150г	f
1064	157	130	1 ст.л.	f
1065	157	25	1 ч.л.	f
1066	157	26	1 ч.л	f
1067	158	5	1шт	f
1068	158	34	\N	f
1069	158	29	\N	f
1070	158	79	(консервированная) 0,5 банки	f
1071	158	144	1шт	f
1072	159	2	250г	f
1073	159	3	2шт	f
1074	159	27	3шт	f
1075	159	22	3шт	f
1076	159	5	2шт	f
1077	159	18	150г	f
1078	159	4	2 зубца	f
1079	159	124	1 ч.л.	f
1080	159	34	\N	f
1081	160	18	200г	f
1082	160	27	4шт	f
1083	160	22	7шт	f
1084	160	12	(консервированная) 400г	f
1085	160	11	2шт	f
1086	160	34	\N	f
1087	161	116	1 стакан	f
1088	161	142	1 шт	f
1089	161	143	1 стакан	f
1090	161	145	(консервированный) 1 стакан	f
1091	161	146	(киш-миш) 1 стакан	f
1092	162	14	3шт	f
1093	162	18	200г	f
1094	162	5	2шт	f
1095	162	27	3шт	f
1096	162	147	200г	f
1097	163	14	2шт	f
1098	163	15	1шт	f
1099	163	27	2шт	f
1100	163	9	\N	f
1101	163	34	\N	f
1102	163	148	1шт	f
1103	164	5	2шт	f
1104	164	18	50г	f
1105	164	4	3 зубца	f
1106	164	34	\N	f
1107	165	1	150мл	f
1108	165	25	1ч.л.	f
1109	165	26	1ч.л.	f
1110	165	31	1,5 ст.л.	f
1111	165	27	1шт	f
1112	165	24	\N	f
1113	165	29	50г	f
1121	168	6	1шт	f
1122	168	5	3шт	f
1123	168	14	3шт	f
1124	168	64	\N	f
1125	168	34	200г	f
1126	168	58	\N	f
1127	168	147	200г	f
1128	169	2	(индюшиное)  700г	f
1129	169	27	2шт	f
1130	169	53	\N	f
1131	169	40	\N	f
1132	169	24	0,5 стакана	f
1133	169	50	0,5 стакана	f
1134	169	64	\N	f
1143	171	57	\N	f
1144	171	37	\N	f
1149	173	27	5шт	f
1150	173	3	100г	f
1151	173	5	100г	f
1152	173	2	0,5кг	f
382	64	25	1 стакан 8ст.л.	f
1153	64	127	\N	f
1154	49	22	2шт	f
1155	174	18	150г	f
1156	174	27	4шт	f
1157	174	4	4 зубца	f
1158	174	5	2шт	f
1159	174	34	\N	f
90	16	42	800г	f
1160	16	3	2шт	f
1161	16	118	\N	f
1162	16	15	2шт	f
1163	21	37	\N	f
1164	30	1	0,5 стакана	f
1165	30	18	100г	f
1166	30	28	100г	f
1167	30	9	\N	f
1168	71	84	300 мл	f
1169	71	26	1 ч.л.	f
1170	71	31	(сухие) 10г	f
1171	71	9	\N	f
1172	71	78	150г	f
1173	71	150	150г	f
1174	4	24	350г	f
1175	4	27	2шт	f
1176	4	25	100г	f
1177	4	28	150г	f
1178	4	86	1ч.л.	f
1179	143	36	песочное	f
1180	18	88	400г	f
1181	18	25	120г	f
1182	18	100	(картофельный) 2ст.л.	f
1183	43	101	10-15 штук	f
1184	23	27	3шт	f
1185	23	50	1 пачка	f
1186	23	46	1кг	f
1187	23	4	2 головки	f
1188	23	34	5 ст.л.	f
1189	24	27	3шт	f
1190	24	25	200г	f
1191	24	1	100г	f
1192	31	3	200г	f
1193	31	27	4щт	f
1194	31	56	500г	f
1195	31	57	100г	f
1196	31	32	200г	f
1197	31	26	\N	f
1198	31	64	\N	f
1199	35	2	500г	f
1200	35	32	300г	f
1201	35	27	1шт	f
1202	35	50	\N	f
1203	35	26	\N	f
1204	35	64	\N	f
1205	35	33	150г	f
1206	35	18	150г	f
1207	35	4	4 зубца	f
1208	35	9	\N	f
1215	29	33	300г	f
1216	29	85	100г	f
1217	36	14	1кг	f
1218	36	46	300г	f
1219	36	3	150г	f
1220	36	32	70г	f
1221	36	27	1шт	f
1222	36	50	\N	f
1223	36	26	\N	f
1224	36	64	\N	f
1225	36	33	250г	f
1226	36	4	4 зубца	f
1227	36	9	\N	f
1228	37	56	(куриный) 400г	f
1229	37	84	1 стакан	f
1230	37	27	1шт	f
1231	37	26	\N	f
1232	37	24	3 ст.л. с горкой	f
1233	37	29	\N	f
1234	38	25	130г	f
1235	38	28	100г	f
1236	38	35	1 ст.л.	f
1237	38	27	2шт	f
1238	38	24	(ржаная) 40г	f
1239	38	24	(овсяная) 80г	f
1240	38	82	1 ч.л.	f
1241	38	103	170г	f
1242	38	106	40г	f
1243	38	95	300г	f
1244	38	115	1/2шт	f
1245	38	90	(или вино белое сухое) 10мл	f
1246	38	83	20г	f
1247	38	74	0,5ч.л.	f
1248	38	85	60г	f
1249	38	107	20г	f
1250	48	14	2-3шт	f
1251	48	27	1шт	f
1252	48	32	2ст.л.	f
1253	48	90	3ст.л.	f
1254	48	3	1шт	f
1255	48	56	(куриный) 500г	f
1256	48	24	\N	f
1257	48	40	\N	f
1258	54	42	250г	f
1259	54	32	100г	f
1260	54	18	100г	f
1261	54	3	50г	f
1262	54	4	2 зубца	f
1263	54	6	1шт	f
1264	54	19	(или вода) 800мл	f
1265	54	26	\N	f
1266	54	153	1ст.л.	f
1267	54	28	2ст.л.	f
1268	54	152	\N	f
1269	54	151	(белое сухое) 150г	f
1270	68	24	270г	f
1271	68	25	250г	f
1272	68	28	50г	f
1273	68	33	200г	f
1274	68	82	1ч.л.	f
1275	68	35	\N	f
1276	68	27	3шт	f
1277	68	154	1,5 стакана	f
1284	73	133	3 ст.л.	f
1285	73	90	3-4 капли	f
1286	79	28	95г	f
1287	79	25	200г	f
1288	79	27	1шт	f
1289	79	32	0,75г	f
1290	79	35	\N	f
1291	79	82	4г	f
1292	79	24	400г	f
1293	86	28	150г	f
1294	86	27	3шт	f
1295	86	25	0,75 стакана	f
1296	86	115	0,5шт	f
1297	86	24	1,5 стакана	f
1298	87	3	100г	f
1299	87	5	100г	f
1300	87	2	(рёбра)  300г	f
1301	87	8	400г	f
1302	87	1	1 стакан	f
1303	87	64	\N	f
1304	90	117	8шт	f
1305	90	2	700г	f
1306	90	11	4шт	f
1307	90	18	200г	f
1308	91	56	500г	f
1309	91	33	1-2 ст.л.	f
1310	91	6	100г	f
1311	91	26	\N	f
1312	91	24	2ст.л	f
1313	107	56	600г	f
1314	107	8	1кг	f
1315	107	42	100г	f
1316	107	5	1шт	f
1317	107	3	1шт	f
1318	107	4	2 зубца	f
1319	107	11	1шт	f
1320	107	19	1 стакан	f
1321	108	28	180г	f
1322	108	25	280г	f
1323	108	27	3шт	f
1324	108	24	160г	f
1325	108	35	\N	f
1326	108	81	150г	f
1327	114	92	1 корж	f
1328	114	81	\N	f
1329	114	127	1 порция	f
1330	114	142	0,75шт	f
1331	114	28	100г	f
1332	114	32	3ст.л.	f
1333	114	25	9ст.л.	f
1334	120	28	100г	f
1335	120	32	60мл	f
1336	120	27	3шт	f
1337	120	82	0,5 ч.л.	f
1338	120	25	200г	f
1339	120	24	40г + 1 стакан	f
1340	120	74	\N	f
1341	120	155	750г	f
1342	122	28	100г	f
1344	122	27	3шт	f
1345	122	35	\N	f
1346	122	82	1ч.л.	f
1347	122	24	2 стакана	f
1348	122	131	1л	f
1349	122	63	100г	f
1343	122	25	1 + 0,5 стакана	f
1350	126	23	2шт	f
1351	126	11	3шт	f
1352	126	15	1шт	f
1354	126	64	\N	f
1355	126	26	\N	f
1358	138	24	300г	f
1359	138	25	250г	f
1360	138	69	300г	f
1361	138	86	10г	f
1362	138	95	1,5кг	f
1363	138	35	15г	f
1364	138	27	1шт	f
1365	138	29	100мл	f
1366	138	32	350мл	f
1367	138	133	\N	f
1368	138	28	для смазывания формы	f
1369	130	75	100г	f
1370	130	28	100г	f
1371	130	25	130г	f
1372	130	27	3шт	f
1373	130	24	75г	f
1374	130	86	0,5ч.л.	f
1375	130	35	\N	f
1376	126	157	100г	f
1377	130	156	250г	f
1378	175	11	3шт	f
1379	175	18	150г	f
1380	175	27	2шт	f
1381	175	34	2 ст.л.	f
1382	175	24	2 ст.л.	f
1383	175	64	\N	f
1384	176	32	90г	f
1385	176	25	70г + 80г	f
1386	176	27	2шт + 1шт	f
1387	176	24	60г	f
1388	176	95	3-4шт	f
1389	176	126	1 ст.л.	f
1390	176	86	15г	f
1391	176	29	2 ст.л.	f
1392	176	28	3 ст.л.	f
1393	176	85	2-3 ст.л.	f
1394	179	28	100г	f
1395	179	27	2шт	f
1396	179	83	2 ст.л.	f
1397	179	25	1 стакан	f
1398	179	82	1 ч.л.	f
1399	179	24	4 стакана	f
1400	29	36	медовое	f
1211	29	25	1 стакан	f
1401	180	27	2шт	f
1402	180	25	1 стакан	f
1403	180	32	0,5л	f
1404	180	24	2 ст.л.	f
1405	180	28	100г	f
1406	181	27	4	f
1407	181	17	70г	f
1408	181	134	щепотка	f
1409	181	9	\N	f
1417	183	28	125г	f
1418	183	32	500г	f
1419	183	27	5шт	f
1420	183	25	150г	f
1421	183	24	110г	f
1422	183	35	\N	f
1423	184	24	2-2,5 стакана	f
1424	184	84	1 стакан	f
1425	184	29	2ст.л.	f
1426	184	26	0,5ч.л.	f
1427	184	27	1шт	f
1428	184	82	щепотка	f
1429	184	2	400г	f
1430	184	3	2шт	f
1431	184	4	1 зубчик	f
1432	184	9	3ст.л.	f
1433	184	32	3ст.л.	f
1434	184	49	\N	f
1435	185	11	10шт	f
1436	185	27	10шт	f
1446	124	28	50г	f
1447	124	81	2 ст.л.	f
1448	124	25	4 ст.л.	f
1449	124	32	2 ст.л.	f
1468	187	60	1 пучок	f
1469	187	4	1 зубчик	f
1470	187	85	40г	f
1471	187	18	(пармезан) 50г	f
1472	187	26		f
1473	187	153	7 ст.л.	f
1482	182	103	250г	f
1483	182	25	50г	f
1484	182	27	1шт	f
1485	182	97	0,5кг	f
1486	182	36	(для галет)	f
1491	188	24	200г	f
1492	188	28	100г	f
1493	188	1	5 ст.л.	f
1494	188	26	1/8 ч.л.	f
1495	53	53	\N	f
1496	53	64	\N	f
1497	53	29	\N	f
1498	53	26	\N	f
1499	53	27	5шт.	f
1500	53	56	500г	f
1501	53	48		f
1502	69	27	1шт	f
1503	69	3	3-4шт	f
1504	69	64	\N	f
1505	69	26	\N	f
1506	69	24	\N	f
1507	69	2	700г	f
1508	153	2	300г	f
1509	153	27	3шт	f
1510	153	14	3шт	f
1511	153	5	2шт	f
1512	153	18	100г	f
1513	153	22	3шт	f
1514	153	46	(маринованные) - 400г	f
1515	153	34	\N	f
1519	189	151	(белое + красное) 0,25л + 0,25л	f
1520	189	115	0,5шт	f
1521	189	25	75г	f
1522	189	158	0,5 стакана	f
1526	190	115	1 ломтик	f
1527	190	74	1 палочка	f
1528	190	83	1ч.л.	f
1529	190	159	1шт	f
1530	190	160	несколько листьев	f
1541	191	27	4шт	f
1542	191	2	300г	f
1543	191	51	400г	f
1544	191	18	100г	f
1545	191	22	4шт	f
1546	191	15	2шт	f
1547	191	153	3ст.л.	f
1548	191	143	125г	f
1549	191	64		f
1550	191	26		f
1551	191	161	1ст.л.	f
1552	191	52	0,5ч.л.	f
1557	192	95	(очищенные) 650г	f
1558	192	1	650г	f
1559	192	25	5ст.л.	f
1560	192	69	5ст.л.	f
1561	192	162	на кончике ножа	f
1562	193	72	0,5 банки + 2ст.л.	f
1563	193	1	100мл	f
1564	193	73	100г	f
1565	193	75	(белый) 200г	f
1566	193	63	80г	f
1567	193	156	300г	f
1568	194	27	4шт	f
1569	194	14	4шт	f
1570	194	39	800г	f
1571	194	18	100г	f
1572	194	15	1шт	f
1573	194	34	300г	f
1574	194	9		f
1575	194	26		f
1587	195	27	(2 яйца и 2 белка) 4шт	f
1588	195	28	20г	f
1589	195	24	20г	f
1590	195	101	50г	f
1591	195	25	(коричневый) 200г	f
1592	195	63	(35%) 250г	f
1593	195	156	300г	f
1594	195	89	10г	f
1595	195	1	100мл	f
1596	195	125	2шт	f
1597	195	115	1шт	f
1598	195	163	1шт	f
1610	197	123	1кг	f
1611	197	27	1шт	f
1612	197	24	0,3 стакана	f
1613	197	63	200мл	f
1614	197	18	(голландский) 0,3 стакана	f
1615	197	4	2 зубца	f
1616	197	26		f
1617	197	166	0,3 стакана	f
1618	198	27	(белки) 6шт.	f
1619	198	89	25г	f
1620	198	1	75г	f
1621	198	25	100г	f
1622	198	28	120г	f
1623	198	72	150г	f
1624	198	162	1/4ч.л.	f
1625	199	14	5шт	f
1626	199	5	2шт	f
1627	199	3	2шт	f
1628	199	12	1/2 банки	f
1629	199	24	(кукурузная) 6ст.л.	f
1630	199	26		f
1631	199	64		f
1638	200	46	200г	f
1639	200	49	0,5 стакана	f
1640	200	4	1 зубец	f
1641	200	2	400г	f
1642	200	79	(стручковая) 400г	f
1643	200	11	(черри) 8шт.	f
1644	200	168	1 кочан	f
1645	200	25	0,5ч.л.	f
1646	200	169	2ст.л.	f
1647	200	161	1ст.л.	f
1648	200	26		f
1649	196	57	5-6 ломтиков	f
1650	196	27	1шт	f
1651	196	165	1-2 филе	f
1652	196	4	2 зубца	f
1653	196	153	100мл	f
1654	196	130	2ст.л.	f
1655	196	164	0,5ч.л.	f
1656	196	168	1 кочан	f
1657	196	167	100г	f
1658	201	51	1шт	f
1659	201	14	5шт.	f
1660	201	5	2шт.	f
1661	201	22	10шт.	f
1662	201	27	4шт.	f
1663	201	15	1шт.	f
1664	76	73	70г	f
1665	76	96	(сушеная) 250г	f
1666	76	24	280г	f
1667	76	35		f
1668	76	27	1шт	f
1669	76	141	350г	f
1670	76	95	400-500г	f
1671	76	1	(кипяток) 250г	f
1672	76	82	1ч.л.	f
1673	76	28	100г + 50г в топпинг	f
1674	76	25	(коричневый) 100г +50г в топпинг	f
1675	76	32	120г	f
1676	202	103	500г	f
1677	202	27	3-4шт.	f
1678	202	28	3ст.л.	f
1679	202	33	3ст.л.	f
1680	202	25	3ст.л.	f
1681	202	69	3ст.л.	f
1682	202	106	1 горсть	f
1683	202	35		f
1684	203	14	5шт.	f
1685	203	51	500г	f
1686	203	46	300г	f
1687	203	33	200мл	f
1688	203	18	100г	f
1689	203	27	2шт.	f
1690	203	3	1шт.	f
1691	203	9		f
1692	203	64		f
1693	203	26		f
1694	203	4		f
1695	204	131	2кг	f
1696	204	134	30г	f
1697	204	25	10ст.л.	f
1698	204	26	1ст.л.	f
1699	204	4	100г	f
1700	204	135	(по вкусу) 1 стручок	f
1701	186	155	1,5кг	f
1702	186	25	2 стакана	f
1703	186	1	1л	f
1704	205	18	(твёрдый) 130г	f
1705	205	32	600г	f
1706	205	28	1 ст.л. (40г)	f
1707	205	24	2ст.л. (40-50г)	f
1708	205	48	0,5 ч.л.	f
1709	205	64		f
1710	205	26		f
1711	206	14	3шт	f
1712	206	27	3шт	f
1713	206	18	(сливочный) 150г	f
1714	206	3	1шт	f
1715	206	32	50мл	f
1716	206	9		f
1717	206	26		f
1718	206	64		f
1719	206	153		f
1721	207	123	250г	f
1722	207	170	250г	f
1723	207	9		f
1724	207	11	1шт	f
1725	207	153	2 ст.л.	f
1726	207	4	1 зубец	f
1727	207	26		f
1728	207	64		f
1729	207	168	20г	f
1730	207	130		f
1731	207	22	(корнишоны) 75г	f
1732	208	63	500мл	f
1733	208	89	8г	f
1734	208	25	100г	f
1735	208	35		f
1736	209	101	300г	f
1737	209	1	250г	f
1738	209	133	250г	f
1739	209	130		f
1740	210	27	3шт	f
1741	210	22	2шт	f
1742	210	136	500г	f
1743	210	34	150г	f
1744	210	18	200г	f
1745	210	46	(маринованные) 150г	f
1746	210	5	1шт	f
1747	210	9		f
1748	82	35		f
1749	82	32	250г + 3 ст.л.	f
1750	82	27	2шт	f
1751	82	25	2 ст.л.	f
1752	82	1	1 ст.л.	f
1753	82	81	1,5 ст.л.	f
1754	82	88		f
1755	82	36	(для пиццы)	f
1756	82	28	50г	f
1757	117	92	1 порция	f
1758	117	86	1 ч.л.	f
1759	117	88	400г	f
1764	211	36	(песочное) на форму 20см	f
1765	211	63	(10%) 50мл	f
1766	211	27	2шт	f
1767	211	100	1 ст.л.	f
1768	211	171	100г	f
1769	211	172	250г	f
1770	211	35		f
1771	212	24	300г	f
1772	212	28	150г	f
1773	212	27	(желток) 2шт	f
1774	212	33	1ст.л.	f
1775	212	26	щепотка	f
1776	212	25	(для сладкого варианта) 100г	f
1784	213	36	(песочное для тарталеток, сладкий вариант)	f
1785	213	33	200г	f
1786	213	27	2шт	f
1787	213	35		f
1788	213	100	(картофельный) 20г	f
1789	213	119	1,5 стакана	f
1790	213	25	60г	f
1791	214	8	(красная) 0,5 кочана	f
1792	214	3	0,5 шт.	f
1793	214	114	3шт.	f
1794	214	43	2шт.	f
1795	214	153	2 ст.л.	f
1796	214	95	2шт.	f
1797	214	74	1/4 ч.л.	f
1798	214	25	2-3 ст.л.	f
1799	214	26	1 ч.л.	f
1800	214	96	100г	f
1801	214	151	(красное) 100г	f
1802	214	1	100г	f
1803	214	44	1 горошина	f
1804	214	161	1 ст.л.	f
1805	215	103	300г	f
1810	216	15		f
1811	216	11		f
1812	216	4		f
1813	216	110		f
1814	218	11	3шт	f
1815	218	4	1 зубчик	f
1816	218	60	0,5 ч.л. сухого	f
1817	219	27	2шт	f
1818	219	133	50г	f
1819	219	24	50г	f
1820	219	35	0,5 ч.л.	f
1821	63	95	(Антоновка) 1,5кг	f
1822	63	25	(коричневый) 2 стакана	f
1823	63	28	100г	f
1824	63	27	3шт	f
1825	63	86	1,5 ч.л.	f
1826	63	24	1 стакан	f
1827	63	180	2-3г	f
1828	220	182	500г филе	f
1829	220	27	1шт	f
1830	220	28	50г	f
1831	220	57	3-4 ломтика	f
1832	220	3	2шт	f
1833	220	4	2 зубца	f
1834	220	50		f
1835	220	64		f
1836	220	5	1шт	f
1837	126	130	2 ст.л.	f
1838	126	153	2 ст.л.	f
1839	126	120	пучок	f
1840	126	3	1шт (ялтинский)	f
1841	218	175	0,5 ч.л.	f
1842	218	174	2шт	f
1843	218	64	1 щепотка	f
1844	218	183	200г	f
1845	221	95	500-600г (4шт)	f
1846	221	28	200г	f
1847	221	27	3шт.	f
1848	221	33	0,5 стакана	f
1849	221	24	250г	f
1850	221	86	1 пакет	f
1851	221	35	2 пакета	f
1852	221	186	1ст.л.	f
1853	221	25	150г	f
1854	222	77	2шт	f
1855	222	56	500г	f
1856	222	3	2шт	f
1857	222	5	1шт	f
1858	222	15	1шт	f
1859	222	27	1шт	f
1860	222	11	4-5шт	f
1861	222	4	2 зубца	f
1862	222	124	1 ч.л.	f
1863	222	53		f
1864	222	25	\N	f
1865	223	187	700г	f
1866	223	18	100г	f
1867	223	143	120г	f
1868	223	5	(по-корейски) 300г	f
1869	223	11	2шт	f
1870	223	40		f
1871	215	27	4шт	f
1872	215	25	50г в шарики + 120г в тесто	f
1873	215	35	по 0,5 ч.л. в тесто и шарики	f
1874	215	5	80г	f
1875	215	143	150мл	f
1876	215	28	100г	f
1877	215	24	200г	f
1878	215	86	10г	f
1879	224	1	8 стаканов	f
1880	224	25	0,3 стаана	f
1881	224	160	по вкусу	f
1882	224	188	8 стеблей	f
1883	225	27	2шт	f
1884	225	25	50г	f
1885	225	86	1г	f
1886	225	24	80г	f
1887	225	98	50г	f
1888	225	33	300г	f
1889	225	156	200г	f
1890	225	133	2ст.л.	f
1891	225	119	500г	f
1892	225	89	15г	f
1893	226	77	2шт	f
1894	226	11	2шт	f
1895	226	5	1шт	f
1896	226	3	1шт	f
1897	226	15	1шт	f
1898	226	60	1 пучок	f
1899	226	4	2 зубца	f
1900	226	181	для жарки	f
1901	227	15	10шт	f
1902	227	4	4 зубца	f
1903	227	153	1,5 ст.л.	f
1904	227	25	щепотка	f
1905	227	26	щепотка	f
1906	227	64		f
1907	227	192	3-4 ветки	f
1908	227	191	1 ч.л.	f
1909	228	103	1кг	f
1910	228	69	0,5 стакана	f
1911	228	32	1/3 стакана	f
1912	228	27	3шт	f
1913	228	25	по вкусу	f
1914	228	95	3шт	f
1915	228	74	1 ч.л.	f
1916	228	35	1 пакет	f
1917	230	193	4-5шт	f
1918	230	34	150г	f
1919	230	115	1шт	f
1920	230	26		f
1921	230	64		f
1922	230	134		f
1923	230	124		f
1924	230	194	\N	f
1925	232	131	1кг	f
1926	232	196	20г	f
1927	232	1	6 ст.л.	f
1928	232	25	4 ст.л.	f
1929	232	26	2 ч.л.	f
1930	232	40	\N	f
1931	235	15	3шт	f
1932	235	4	1 зубчик	f
1933	235	11	1шт	f
1934	235	130	1 ст.л.	f
1935	235	53	0.5 ч.л.	f
1936	235	153	0.25 стакана	f
1937	235	25	2 ст.л.	f
1938	235	197	3/4 стакана	f
1939	236	27	3шт	f
1940	236	25	75г	f
1941	236	24	75г	f
1942	236	35	1 пакет	f
1943	236	103	300г	f
1944	236	63	300мл	f
1945	236	143	250г	f
1946	236	133	150г	f
1947	236	158	1 ч.л.	f
1948	236	115	1 ломтик	f
1949	236	87	400г	f
1950	236	85	70г фисташек или тыквенных семечек	f
1951	236	89	15г	f
1952	269	24	300г	f
1953	269	1	300мл	f
1954	269	181	2 ст.л.	f
1955	269	26	\N	t
1956	270	2	6 сырых отбивных	f
1957	270	18	100г	f
1958	270	9	100г	f
1959	270	27	1шт	f
1960	270	33	1 ст.л.	f
1961	270	198	100г	f
1962	270	40		f
1963	271	112	2шт	f
1964	271	27	2 желтка	f
1965	271	25	180г	f
1966	271	100	(кукурузный) 2ст.л.	f
1967	272	156	250г	f
1968	272	72	100г	f
1969	272	133	30г	f
1970	272	63	80г	f
1971	273	24	200г	f
1972	273	27	3шт	f
1973	273	25	130г	f
1974	273	28	120г	f
1975	273	86	1 пакет	f
1976	273	35	1 пакет	f
1977	274	112	2шт	f
1978	274	27	6шт.	f
1979	274	25		f
1980	274	156	500г	f
1981	274	87		f
1982	274	160		f
1983	274	130		f
1984	275	56	500г	f
1985	275	42	300г	f
1986	275	77	4шт.	f
1987	275	11	2шт.	f
1988	275	4	6 зубцов	f
1989	275	18	250г	f
1990	275	175		f
1991	275	60		f
1992	275	64		f
1993	276	199	50мл	f
1994	276	26	10г	f
1995	276	25	30г	f
1996	277	42	500г	f
1997	280	149	2-4шт	f
1998	280	115		f
1999	280	26	\N	f
2000	279	42	1кг	f
2001	279	201	50мл	f
2002	279	202	50мл	f
2003	279	15	2шт.	f
2004	279	5	2шт.	f
2005	279	12	1 банка	f
2006	279	3	3шт.	f
2007	279	179	300г	f
2008	279	153	для жарки	f
2009	279	26		f
2010	281	214	1шт	f
2011	281	26	щепотка	f
\.


--
-- Name: proportion_ids; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.proportion_ids', 2011, true);


--
-- Name: recept_ids; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.recept_ids', 281, true);


--
-- Data for Name: recipe; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.recipe (text, name, depart_id, id, file) FROM stdin;
 Тесто вымешать, тонко раскатать. Подходит для итальянских пицц. В сладкую пиццу соли меньше.    	Тесто простое универсальное	4	9	Тесто/Тесто простое универсальное/Тесто простое универсальное3da79e70-1571-49d0-a440-497d0f5bf4f3.png
 Варёные мясо, картофель, морковь, яйца, солёные огурцы порезать, добавить горошек или кукурузу, \r\nприправить майонезом.        	Оливье	6	47	Салаты/Оливье/Оливьеaa3e0d70-1f1c-4da7-bcbe-2496f6c06b7a.png
 Взять варёное мясо или тушёнку. Порезать, все остальное также. \r\nЗаправить сметаной.      	Салат осенний	6	45	Салаты/Салат осенний/Салат осенний3314c8b4-7d2b-4879-8872-3181137fde77.png
Послойно, перемежая с майонезом, выложить грудку куриную, яичные белки, \r\n200г тертого сыра, огурец большой, желтки. Украшение: помидоры (перец), сыр, зелень. \r\nМожно использовать маслины в качестве арбузных семечек.          	Арбузная долька	6	44	Салаты/Арбузная долька/Арбузная долька012f2416-e143-44cb-883c-f707f197fce8.png
 Свежие живые мидии, отварить 10 минут до раскрывания, поджарить и протушить с большой луковицей.\r\nИз 2кг (со скорлупой) выходит около 300г готового блюда.     	Мидии с луком	2	17	Вторые блюда/Мидии с луком/Мидии с луком9391a08f-19ef-4497-bf23-7b6639723f88.png
   Слепить, варить 5-7мин.\r\nНачинка - картофель-пюре с зажаркой из лука,\r\nтворог с яйцом, вишня, яблоки и т.п.    	Вареники	2	12	Вторые блюда/Вареники/Вареники1ebeb83c-0372-423c-8e38-92b726b27497.JPG
Отбивную пожарить в шубе из натёртого картофеля, \r\nпорезанной мелко луковицы, зелени, яиц, 2ст. л. сметаны, 3 зубчиков чеснока \r\nи 3ст. л. муки. Все отбивные выложить на противень, залить сметаной и на 10мин при 200 град.          	Свинина по-степному	2	3	Вторые блюда/Свинина по-степному/Свинина по-степному4f08199f-6e52-4cb4-9cab-f913fa8e9974.JPG
Для итальянской пиццы бездрожжевое простое универсальное тесто раскатать, положить на противень,\nвыложить начинку.  Выпечь мин 40 при 180 град.   \nДрожжевую пиццу запекать при 200 град около 50 минут. В качестве начинки подойдет мысо или грибы, помидоры, болгарский перец, в качестве заливки - сметана с аджикой, сыр.	Пицца	2	21	Вторые блюда/Пицца/Пицца7b25f294-c126-4b0d-ae9c-2d79d980fefe.png
Приготовить небольшой кусочек свинины, натереть смесью тёртого чеснока, перца, горчицы в зёрнах, сметаны и соли. Завернуть мясо в фольгу, оставить на час в холодильнике. Затем выложить в чашу мультиварки и запекать в режиме "духовка" около 2ч.	Буженина	2	13	Вторые блюда/Буженина/Буженинаbf533684-06b0-4922-89a4-f606291932d5.png
 Внутри картофель, морковь. Запекать 1,5 часа при 190-200 град. Со специями.      	Запеченная курочка	2	14	Вторые блюда/Запеченная курочка/Запеченная курочкаb81184f1-f32e-424d-a469-63ce21b62222.JPG
 Пирожки с вареными яйцами, зеленью и сливочным маслом.\r\nТесто: 2 стакана муки с 200г маргарина, 40г сметаны, соль, в холодильник на 30мин.       	Летние пирожки	2	25	Вторые блюда/Летние пирожки/Летние пирожкиc4561ea0-ba65-418c-b823-63fc9fd42048.png
 Слой отварной измельченной картошки с маслом, яйцом и приправами, слой пассированных колец лука и прожаренной измельченной курицы, опять слой картофеля, порубленное масло и сыр.        	Картофельная запеканка	2	28	Вторые блюда/Картофельная запеканка/Картофельная запеканка3c22b3c1-2677-4d6f-a568-b22213c0457a.png
Замесить тесто из воды, масла, муки, соли и 1 яйца.  Тесто выложить на противень, сформировать бортики. Выложить начинку:\r\nварёное куриное филе, поджаренные грибы с луком, капустой (брокколи или обычной), соль.\r\nЗаливка: сметана, сыр, яйца, немного аджики, мускатный орех.\r\nВыпекать при 180 град 35-40мин.              	Лоранский пирог	2	26	Вторые блюда/Лоранский пирог/Лоранский пирог33e4f690-fb03-469c-b6c9-755d6ef3e373.png
 На сковороду налить масло, разогреть, всыпать сахар. Когда он \r\nрастворится, засыпать мясо кусочками и порезанный лук, чеснок. \r\nОбжарить 5мин. Тушить около 45мин. Выложить на сваренные макароны.        	Хингане с макаронами	2	33	Вторые блюда/Хингане с макаронами/Хингане с макаронамиbd66c3cd-0f15-47d4-8fcf-a3ced36cf3a2.png
Натереть на терке вареный картофель, сверху слой размятой скумбрии в консервах, \nсыра, белков, вареной моркови, желтков. Можно натереть солёный огурец. Все перемазать майонезом.	Мимоза	6	49	Салаты/Мимоза/Мимоза6b53b303-70f2-4cd4-b1f5-6d7d8475b4fd.png
Нарезать яйца, помидоры, натереть сыр, сварить рис. Все смешать, добавить крабовое мясо, заправить майонезом.     	Салат из крабового мяса	6	59	Салаты/Салат из крабового мяса/Салат из крабового мяса4c0a8a82-7e42-4d39-b576-0594704fff23.png
Распустить желатин в холодной жидкости. Чуть нагреть.\nНельзя добавлять киви, ананас, папайя.\nДля варианта с агаром довести смесь до кипения. \nМожно делать слои из компота, сметаны, молока с схаром, какао.	Желе	3	72	Десерты/Желе/Желе35dbad1e-38db-4a56-b546-71d55ec3d728.JPG
Печенье песочное. Замесить тесто из масла, сахара, муки и 3 желтков, муки как можно меньше, поставить на час в холодильник, \nвырезать, смазать желтком. Выпекать 15 мин.	Солитоны	3	65	Десерты/Солитоны/Солитоныe9876466-6e83-4ac9-af01-3427656a3d0b.png
На дно выложить дольки персиков разрезом вверх, залить тестом с кусочками песиков, сверху украсить белковым кремом. \nМожно в тесто использовать желтки, а белки пустить на крем.	Перевернутый персиковый пирог	3	75	Десерты/Перевернутый персиковый пирог/Перевернутый персиковый пирогaad6c5ad-d927-4d48-8337-a39cc913ef86.png
Бисквитный корж остудить, разрезать вдоль надвое, промазать кремом с половинками клубники или кремом "нутелла". \nСверху можно сделать то же самое.	Бисквитный торт	3	74	Десерты/Бисквитный торт/Бисквитный торт97d2aabe-b079-4743-a9d7-5c3c1b886112.png
Взять сладкий толстостенный перец, разрезать пополам, сложить на противень, в каждую лодочку положить ломтик помидора, чеснока, зелень, посолить, поперчить, сбрызнуть подсолнечным маслом, поставить в духовку про 180 град. на 45мин.	Запеченный перец	2	11	Вторые блюда/Запеченный перец/Запеченный перецab775832-c9f0-4942-8fb1-7af2417480fc.png
Обжарить порезанное на небольшие кусочки мясо в режиме "жарка", за 5 минут до конца добавить порезанный лук, затем добавить порезанные овощи крупными кусками, слегка перемешать, долить пол стакана воды, готовить в режиме "тушение" 1 час.	Рагу	2	56	Вторые блюда/Рагу/Рагуc8b60755-a76b-4943-961f-34dc1945b0b4.png
Свинину нарезать на крупные куски и посыпать солью, черным молотым перцем и специями. Поставить мясо в холодильник минут на 20-30.   Мясо обжарить со всех сторон, выложить. Обжарить лук, порезанный полукольцами, добавить паприку и муку, перемешать. Влить бульон. Когда закипит, заложить мясо, тушить 15 минут. Добавить сметану, тушить. За 10минут до конца тушения добавить порезанный болгарский перец.	Свинина по-венгерски	2	41	Вторые блюда/Свинина по-венгерски/Свинина по-венгерски1a1cd645-1486-4009-b972-23f06ea25390.png
Отварить стручковую фасоль или спаржу, поджаренный лук, залить взбитыми яйцами с бульоном (соком из-под фасоли) с приправами и солью.\r\n  Все выпечь при 230 град около 15 мин, посыпать зеленью.      	Фасоль запечённая в яйцах	2	42	Вторые блюда/Фасоль запечённая в яйцах/Фасоль запечённая в яйцах464a0d29-4be3-4b37-beb4-289d43232f08.png
 Булочки из дрожжевого теста с начинкой из помидора, красного перца и сыра.\r\nЗакрытые сочнее.       	Булочки пикантные	2	39	Вторые блюда/Булочки пикантные/Булочки пикантные57302ac3-74b6-4e41-8743-d9746b61582c.png
Картофель, луковицу натереть (картофель в луковом соке не темнеет), добавить яйца, 2 полные ложки муки, соль, перец по вкусу, подсолнечное масло (чтоб не прилипало к сковороде при жарке). Поджарить или запечь.       Для колдунов дополнительно подготовить 300г фарша или порезанных грибов, обжаривать, выкладывая ложку массы, сверху ложку фарша и опять прикрыть ложкой массы.      Для оладьев из кабачков картошка заменяется кабачками в пропорции в 4 раза меньше (250г кабачков).	Драники	2	40	Вторые блюда/Драники/Драникиe8b98f22-3279-4622-9864-32ca9f869259.png
Яйца взбить с сахаром, добавить соду, погашенную в сметане, ванилин и растопленное масло, \nмуку. Половина массы выложить в форму, налить сливовое варенье, перемешанное с крахмалом, \nвыложить остальное тесто.\nВыпечь при 200 град 20мин.	Пирог со сливовым вареньем	3	78	\N
Все сварить до загустения все время помешивая. Выложить на пакет, \nостудить, порезать, обвалять в сахарной пудре.	Рахат-лукум	3	85	\N
Посечённая капуста, потёртая морковь засыпается в банку, \nслои перекладываются лавровым листом и перцем-горошком, \nзаливается рассолом. \nПериодически капуста протыкается деревянной палочкой, следя за тем, \nчтоб рассол покрывал капусту. Банка помещается в глубокую посудину, чтоб стекал рассол. \nЧерез 2-3 дня капуста готова.\nИли то же самое, только без рассола: хорошо утрамбовать в банке чтоб выделился сок, 1ст. л. соли на 2л банку.	Квашеная капуста	7	96	\N
 Замесить тесто. На ночь в холодильник. Хранится пару месяцев.\r\nРаскатывается тонко, но рвется. Попробовать на пиццу.        	Хрущёвское тесто	4	7	\N
Тыкву нарезать кубиками, апельсин мелко нарезать, засыпать сахаром \nи подождать растворения. Поставить на медленный огонь и варить 40-60мин после кипения. \nЗакрутить. Апельсин можно заменить облепихой.	Тыква с апельсином	7	99	Консервация/Тыква с апельсином/Тыква с апельсиномa95e2433-e1a2-4901-9f54-e087eed91128.png
Фрукты обработать, сложить в стерилизованные банки. \nПриготовить сироп из воды с сахаром, довести до кипения. \nЗалить фрукты в банках, дать постоять, затем слить сироп \nв кастрюлю и повторить снова. Закрыть.	Компот из фруктов	7	95	Консервация/Компот из фруктов/Компот из фруктовc66546cc-0322-4aea-8781-8d289309d0a6.png
Нарезать половину помидор и перец, довести до кипения, \nуменьшить огонь и варить 15мин. Добавить оставшиеся порезанные \nпомидоры, варить ещё 15мин. Добавить измельчённые зелень, \nчеснок, специи, соль, сахар. Варить ещё 5 минут. Разложить \nв банки, закатать.	Лечо	7	97	Консервация/Лечо/Лечоadf81ea5-90fc-4f51-a50a-8edd1c2421c3.png
Из 2кг крупных помидор сделать сок, добавить соль, сахар, перец, \nдовести до кипения, снять пену, залить 3кг мелких помидор, \nрасфасовать по банкам и наколоть. Стерилизовать в кипящей воде 10мин.	Помидоры в собственном соку	7	98	Консервация/Помидоры в собственном соку/Помидоры в собственном сокуd0a28d75-44d7-4678-840a-8ef4ecd8234d.png
Соединить воду с сахаром. Добавить кусочки яблок, очищенных от сердцевины и кожуры. \nКипятить 20мин. Затем растолочь толкушкой, залить в банки, простерилизовать (я не делала). \nЗакрыть.	Яблочное пюре	7	102	Консервация/Яблочное пюре/Яблочное пюре1dbc1a21-ab77-4400-ac09-5501e6816817.png
Креветки отварить, почистить, соединить их с опрезанными огурцами, помидорами, зеленью. Заправить сметаной, соль по вкусу.	Салат из креветок	6	113	Салаты/Салат из креветок/Салат из креветок3ad688fb-b16e-4038-9806-6873126df69a.png
Яйца взбить с сахаром, добавить мёд, кефир, муку с содой негашёной, орехи. \nВсё постоянно взбивается. На 40 мин при 190град.	Медовый пирог	3	66	Десерты/Медовый пирог/Медовый пирог14a65c20-ea0a-464c-abdf-dac5de392ac2.png
Кексы с жидким шоколадом - чёрным, белым или молочным. \nЖидкий шоколад и сливочное масло смешать с сахаром, яицами и мукой. \nВыпекать ровно 7 мин при 200 град.	Спящий вулкан	3	89	Десерты/Спящий вулкан/Спящий вулканaf54bc1f-42b7-4726-bc10-3f118c594597.JPG
Яйца взбить с сахаром, домешать сметану и соду, мак и муку (чтоб тесто лилось). \nТесто залить в форму, выложить сверху вишню без косточек, выпечь при 200град около 1,5 часа.	Пирог с маком и вишнями	3	77	Десерты/Пирог с маком и вишнями/Пирог с маком и вишнями0ec19ce0-d103-408c-ad8b-058b77917f2d.png
Пирожки вылепить в виде вареников с орехами в меде, запечь около 30-25мин при 250 град. Мед течет!!	Скальцунья	3	88	Десерты/Скальцунья/Скальцуньяebba3a2b-c31d-4996-8857-eaecaea5a5a6.png
Соединить пюре вареной морковь, творог, распаренную курагу, манку, масло, желтки и взбитые белки. Запечь.	Пуддинг с курагой	3	83	Десерты/Пуддинг с курагой/Пуддинг с курагой515c2906-4fd8-4624-97ea-3aa642d15925.png
Подтаявшее масло соединить с 4 желтками, добавить какао, 150г муки, немного сахара и измельчённые орехи. Отдельно взбить 4 белка, соединить с массой. Поставить на режим "выпечка" на 40минут. Готовый корж разрезать на 2 части, промазать кремом. Тесто обалденное!! Для крема в молоко вбить 2 яйца, 120г сахара, 60г муки, перемешать, довести до кипения, всыпать порезанные персики, варить до загустения, постоянно помешивая.	Пирог с персиковым кремом	3	5	Десерты/Пирог с персиковым кремом/Пирог с персиковым кремом26592e7a-4fb0-4925-a7a2-8eeaa07f573a.png
Яблоки, запеченные без сердцевины, протереть через сито, добавить сахар, \nуварить на медленном огне до загустения. Вывалить на пергамент, остудить, нарезать.	Яблочный мармелад	3	92	Десерты/Яблочный мармелад/Яблочный мармелад7bf35da5-13b8-4c89-bba1-8625a338ee60.png
При замешивании бисквита (из расчета на 4 яйца) добавить разрыхлитель, затем всыпать в бисквит ягоды или порезанные фрукты, испечь как бисквит.	Шарлотка	3	117	Десерты/Шарлотка/Шарлотка0aa6e1b2-5226-4c19-8aad-db4c2414a8b8.png
Все овощи отварить, отдельно потереть, каждый овощ перемешать с майонезом и выложить слоями: картофель, морковь, яйца, свекла.	Папский салат	6	128	Салаты/Папский салат/Папский салатc620dda2-1ce9-4aa6-8032-7fc08ea8f5a2.png
Яйца и мясо отварить, порезать. Овощи порезать, соединить с мясом либо слоями, перемазывая сметаной, либо смешать всё вместе. Кукурузу добавлять по желанию. Можно ею украсить салат.	Салат с мясом и овощами	6	115	Салаты/Салат с мясом и овощами/Салат с мясом и овощами2659a274-b980-4da9-81ca-1d683164cd5a.png
Салат выложить слоями, каждый слой промазывать майонезом. Сначала слой варёного мяса, затем тушёных с луком шампиньонов, тёртых яиц, сыра, нарезанных помидоров.	Потрясающий салат	6	119	Салаты/Потрясающий салат/Потрясающий салатcf3331bd-ca4e-472a-a3d9-29f4aaac8157.png
В лаваш завернуть начинку из протушеного мяса, тонко порезанных капусты и солёных огурцов, майонеза, можно добавить по вкусу кетчуп или горчицу.	Шаурма	2	105	Вторые блюда/Шаурма/Шаурмаed0b3ec7-4572-4ccc-b289-39620a458665.png
Отбивные, замаринованные в горчице, соли, перце, выложить на противень, сверху выложить протушенные грибы с луком, далее - кольца помидоров, сверху тёртый сыр. Запекать 30минут при 200 градусах.	Свинина по-боярски	2	106	Вторые блюда/Свинина по-боярски/Свинина по-боярскиeaf8b951-82c6-4b62-8533-44eac600469d.png
Из фарша сформировать котлетки, выпечь их, уложить в булочки для гамбургеров, перемежая кольцами помодор и листьями салата.	Гамбургер	2	110	Вторые блюда/Гамбургер/Гамбургер9d2b1512-057a-4221-968e-275ea78adc40.png
Лук порезать и обжарить в режиме "жарка" 10минут, выложить тёртую морковь, залить частью заливки, затем, тёртый кабачок, порезанный перец,  залить остальной заливкой. Для заливки слегка взбить яйца с мукой, добавиь тёртый сыр, соль, размешать. Готовить в режиме "Выпечка" 45минут.	Овощная запеканка	2	19	Вторые блюда/Овощная запеканка/Овощная запеканкаa5b177be-a209-4def-9dbf-20a210feb94a.png
Баклажаны разрезать пополам, вырезать сердцевину, отправить в разогретую до 230 град. духовку на 10-15 минут. Мякоть баклажан обжарить, фарш тоже обжарить с луком. Соединить. Добавить раздавленный чеснок, порезанные помидоры, зелень, посолить, поперчить. Наполнить получившейся смесью лодочки баклажан, полить сметаной, присыпать тёртым сыром. Запекать 30-40 минут при 180 град.	Фаршированные баклажаны	2	125	Вторые блюда/Фаршированные баклажаны/Фаршированные баклажаны073ef959-9c94-4ddd-8440-5a9a16a14d21.png
Рецепт на 0,5л банку. Проварить половинки перца до мягкости (7-8мин), сложить в банку, залить кипящей заливкой из воды, сахара, соли, лимонного сока.	Консервированный перец	7	134	Консервация/Консервированный перец/Консервированный перец2f6500a0-cd4a-4708-8984-6be604ff85a6.png
Размягченное сливочное масло растереть с половиной сахара (180 г). В другую миску вбить яйца, добавить оставшийся сахар (180 г) и слегка взбить смесь венчиком или миксером. К масляной смеси влить яичную смесь и хорошо перемешать. В сметану положить соду и разрыхлитель. Хорошо перемешать.\nСметану добавить к масляно-яичной смеси и перемешать. Ввести в смесь просеянную муку и еще раз хорошо перемешать. Тесто разделить на 2 равные части.\nВ одну часть теста добавить какао, просеянное через мелкое сито, и перемешать. Чашу мультиварки смазать маслом.\nВ центр чаши выложить 2 столовых ложки светлого теста.\nВ центр светлого теста вылить 2 столовых ложки темного теста. Таким образом, чередуя слои, выложить все тесто. Выпекать в режиме "выпечка" 50минут. Можно нанести глазурь и выложить сверху орехи.	Зебра	3	123	Десерты/Зебра/Зебраc1ad3ee4-cff1-46c8-bf05-30dc5fb31026.png
Смешать какао с водой, туда добавить яйца с сахаром, муку, 3 ст. л. молока, \nсюда влить 250г кипящего молока, варить до загустения, затем добавить 50г масла, \nваниль, взбить до однородности. Получится крем. Выложить фрукты на раскатанное \nтесто, залить кремом, запечь пиццу.	Пицца фруктовая	3	82	Десерты/Пицца фруктовая/Пицца фруктовая950e5a72-2b7b-4717-923c-13b0a906a8d7.png
Сварить яйца и картофель. Очистить и нарезать мелкими кубиками. Нарезать перец и лук. Консерву размять вилкой. Мелко порубить зелень.\nСмешать все ингредиенты, посолить, приправить перцем, добавить майонез. Вместо майонеза можно взять сметану, смешанную с 1 ч.л. горчицы. Можно выложить слоями.	Салат из консервы	6	163	Салаты/Салат из консервы/Салат из консервы5cd4e580-9345-4d90-9abd-a08f74f5c618.png
Смешать куриный фарш, яйцо и 100мл молока, посолить, поперчить, выпечь из фарша коржи (15 минут при 180 град). Коржи перемазать кремом и сложить один на другой. Для крема обжарить грибы с луком, чесноком, остудить, отправить в блендер с 1 плавленым сырком. Сверху торт залить глазурью из 30мг молока, плавленого сырка и майонеза, взбитых в блендере.	Закусочный мясной торт	2	127	Вторые блюда/Закусочный мясной торт/Закусочный мясной тортaae7c6ea-17c7-4527-a632-da4026e772eb.png
 Куриные грудки разрезать пополам по горизонтали, немного отбить, \r\nпосолить, на них уложить начинку из тушеных грибов, \r\nсмешанных с тёртым сыром (можно кунжутом ещё). \r\nКотлеты смочены в яйце, запанированы в сухарях.        	Куриные котлеты с грибами	2	22	Вторые блюда/Куриные котлеты с грибами/Куриные котлеты с грибами9bd0d513-3dca-41ce-be98-0a30e250efd2.png
Мультиваpку включить на pежим «Выпечка». Закинуть пpомытые и обсушенные сеpдца. Дать им там пpокипеть, пока не выпаpится жидкость. Добавить лук, моpковь, помидоpы. Добавить соус или майонез, поперчить, пеpемешать. Воду не доливать. Закpыть кpышку, поставить pежим «Тушение» на 1 час.	Куpиные сеpдечки по-болгаpски	2	149	Вторые блюда/Куpиные сеpдечки по-болгаpски/Куpиные сеpдечки по-болгаpскиe74e0936-1b27-4d97-9349-b10f4e7bc4e6.png
поджарить грибы с луком, добавить сливки, готовить 10 минут, добавить тёртый сыр. Когда сыр растопится, можно заливать полученной заливкой сваренные спагетти.	Спагетти с грибами в сливочном соусе	2	133	Вторые блюда/Спагетти с грибами в сливочном соусе/Спагетти с грибами в сливочном соусе002da54f-0bc6-4284-a688-3ed09054ce6b.png
Обжарить нарезанное мясо в режиме "жарка" 15 минут, добавить морковь, лук, перец, обжаривать ещё 15 минут. Положить приправы, соль, рис, слегка перемешать, долить воду на 1см выше риса, установить головку чеснока в центре и готовить в режиме "плов" 50минут.	Плов	2	16	Вторые блюда/Плов/Пловc6b832f7-064d-4747-bf01-4859972e07a4.JPG
Смешать сахар и какао, добавить молоко, поставить на плиту, довести до кипения. Добавить масло, держать на огне до растворения масла.	Шоколадная глазурь	5	124	\N
Яблоки порезать с апельсинами, засыпать сахаром, с утра проварить 15-20мин и растолочь.	Яблоки с апельсином	7	103	Консервация/Яблоки с апельсином/Яблоки с апельсиномe711c4b8-05e6-4dac-b467-911d3f5e2d8f.png
Просеять в форму муку, сахар, соль, соду и какао и перемешать.\nСмешать масло с лимонной кислотой и водой.\nВлить эту смесь в мучную и перемешать вилкой до однородной массы.\nВыпекать в разогретой до 180 градусов духовке в течение 30-40 минут или в мультиварке на режиме "выпечка" 40 минут.	Crazy cake	3	139	Десерты/Crazy cake/Crazy cakefd6632d5-04ae-4865-8dc0-c59aa7a878da.png
Растопленное и охлаждённое масло, сахар, яйца, ванилин, \nсироп  с 1 банки консервированных абрикос, муку, разрыхлитель смешать. \nТесто вылить в форму, выложить сверху абрикосы. На 30 мин при 180град. \nСамый удачный из консервации.	Пуховый пирог	3	84	Десерты/Пуховый пирог/Пуховый пирог6fc19614-e78e-4733-a781-14f72bc2f519.png
Морковку очистить. Натереть на терке. Добавить к морковке выдавленный чеснок, хорошо перемешать. Натереть на терке сыр и добавить в салат.\nПосолить, заправить майонезом. Снова перемешать.	Салат из морковки с сыром	6	164	Салаты/Салат из морковки с сыром/Салат из морковки с сыром3d899ee3-8fa7-4e45-b6c0-fb76546a9222.png
Для начала нам необходимо сделать тесто для пампушек. Просеиваем муку, в стакане смешиваем яйцо с солью и добавляем эту смесь в муку. Начинаем замешивать тесто, постепенно добавляя молоко. Тесто должно получиться упругое и эластичное и не должно прилипать к рукам. Когда оно будет готово, помещаем его в целлофановый пакет и кладем в теплое место примерно на пол часа. Лук нарезаем полукольцами и обжариваем его в казане с добавлением масла до золотистости. Перец нарезаем небольшими кубиками, а мясо режем на средние кубики со стороной примерно 2-3 сантиметра. Перекладываем лук в миску, а в казан наливаем немного масла и ставим его на сильный огонь. Выкладываем мясо и начинаем его жарить, переворачивая, до румяной корочки. Это надо делать небольшими порциями, иначе мясо будет не жариться, а тушиться. Не забываем добавлять в каждую новую порцию мяса при жарке немного специй. Затем перекладываем все обжаренное мясо в казан и добавляем к нему половину лука, перемешиваем и обжариваем все вместе примерно 5-7 минут на сильном огне. Когда лук станет мягким и пустит сок, выкладываем в казан нарезанный перец, перемешиваем. Добавляем помидоры в собственном соку, перемешиваем и тушим все на медленном огне. Сейчас жидкость следует попробовать на вкус и при необходимости добавить соль и молотый перец. Пока наша свинина тушится, мы займемся приготовлением пампушек. Для этого посыпаем стол мукой и раскатываем на нем приготовленное тесто с тонкий пласт. Выкладываем на него обжаренный лук, распределяем равномерно по всему периметру. Теперь сворачиваем тесто рулетиком и нарезаем на небольшие части примерно 1,5-2 сантиметра шириной. В казан добавляем перец горошком и выкладываем пампушки. Варим на медленном огне в течение 15 минут. За 1-2 минуты до готовности блюда высыпаем в него мелко нарезанную зелень. Когда пампушки всплыли, значит, блюдо готово и его можно подавать к столу.	Свинина по-польски	2	116	Вторые блюда/Свинина по-польски/Свинина по-польскиbb55e315-3389-45e5-b161-ca682132391e.png
Перец вымыть, вырезать середины. Рис промыть, залить водой и отварить до полуготовности (около 10-15 минут).\nМорковь, лук очистить и нарезать четвертькольцами.\nЛук немного посолить, поперчить и обжарить около 15-20 минут на медленном огне до мягкости.\nМорковь, слегка посолить и обжарить, помешивая, пока морковь немного не обмякнет (около 3-4 минут).\nВ большой миске соединить фарш, рис и обжаренные лук с морковью.\nПомидоры нарезать маленькими кубиками.\nЧеснок очистить и пропустить через чесноковыжималку.\nЗелень вымыть, обсушить и порубить.\nДобавить к фаршу помидоры, чеснок, зелень, соль, сахар и свежемолотый перец.\nХорошо перемешать фарш (удобно перемешивать руками). Подготовленные перцы наполнить фаршем и поместить в сотейник или другую толстостенную посуду.\nПриготовить томатно-сметанный соус.\nСметану соединить с порезанными помидорами и перемешать.\nВлить воду и еще раз перемешать.\nПо вкусу соус посолить и поперчить.\nПолученным соусом залить перец.\nТушить перец при слабом кипении, под крышкой, около 40-60 минут.\nВыключить огонь и дать настояться еще 10 минут. При подаче фаршированный перец полить сметаной и посыпать зеленью.	Фаршированный перец	2	136	Вторые блюда/Фаршированный перец/Фаршированный перец60e286a7-07db-4a01-a0ea-f77f29752fe3.png
Яйца взбить с сахаром.\nДобавить ванильный сахар и растопленное сливочное масло - все взбивать миксером на небольшой скорости до однородности. В тесто всыпать просеянную муку и перемешать.\nВафельницу хорошо нагреть, смазать растительным маслом обе полуформы.\nНа нижнюю полуформу налить 3-4 столовых ложки теста, закрыть вафельницу и за ручки сжать крышки (при этом начнется интенсивное выделение пара - будьте осторожны, чтобы не обжечься (!).\nЧерез 1-3 минуты открыть вафельницу, аккуратно снять вафлю и сразу же свернуть ее трубочкой (сворачивать нужно, пока она еще горячая, т.к.когда вафля остынет ее не удастся свернуть - будет очень ломкой).	Вафли	3	131	Десерты/Вафли/Вафли644fc484-1819-42ee-a7d8-6bf8d0f96588.png
Нарезать бананы кружочками, яблоки нарезать небольшими кубиками, орехи порубить. Добавить йогурт, перемешать хорошо. Поставить в холодильник до подачи.	Банановый салат	3	156	Десерты/Банановый салат/Банановый салат6d65e753-4227-4f92-8425-3483095f35d7.png
Картофель нарезать очень тонкой соломкой, поджарить малыми порциями до золотистого цвета. Порезать вареную курицу, маринованые грибы и натертые вареные яичные белки, перемешать с майонезом. Массу выложить на листья салата, сделав углубление. Вокруг обложить поджаренной картошкой. В центр положить "яйца", которые формируются из натёртых плавленого сырка, желтков, чеснока, зелени. Украсить зеленью.	Гнездо глухаря	6	20	Салаты/Гнездо глухаря/Гнездо глухаряe3014993-cf0e-4450-be79-6ac2e18bd2ca.png
Включить мультиварку на режим «Выпечка». Смазать чашу маслом. Лук нарезать полукольцами и обжарить на масле до мягкости.\nМорковь и перец также порезать тоненькой соломкой. Высыпать в чашу мультиварки.\nЗатем порезать филе тонкими полосками. Из индюшиного мяса получается гораздо вкуснее.\nПережарить все вместе.\nПоложить помидоры, чеснок и зелень.\nЗалить сливки и засыпать карри.\nВсе перемешать, закрыть крышку мультиварки, включить режим «Тушение» и оставить карри готовиться в течение получаса.	Карри	2	144	Вторые блюда/Карри/Карриae7212f1-9d31-483c-8add-67f9671c6a6c.png
Овощи нарезать на кубики, лук полукольцами, морковь соломкой. Высыпать все в чашу мультиварки.\nПриправить, посолить по вкусу. Влить воду, если овощи недостаточно сочные. Закрыть крышку, включить программу «тушение» на 65 минут. При подаче посыпать петрушкой.	Овощное рагу	2	148	Вторые блюда/Овощное рагу/Овощное рагуfd7d0b6a-426e-4170-aa1b-864798b4d42f.png
Фасоль замочить на ночь. Слить воду с фасоли и промыть ее.\nГовядину нарезать на небольшие куски.\nПоложить в мультиварку мясо и фасоль, добавить соль, лавровый лист и налить воду на один см выше. Поставить на режим тушение на один час.\nНарезать соломкой морковь, лук и обжарить на среднем огне в течение трех минут. Затем добавить порезанные помидоры и измельченный чеснок и еще обжарить полминуты.\nДалее к мясу добавить морковь с луком и поставить еще раз на один час в режиме тушения. За пять минут до готовности добавить зелень по вкусу.	Лобио с говядиной	2	147	Вторые блюда/Лобио с говядиной/Лобио с говядиной1cb290d4-1f00-4cc9-96c0-b700e63173aa.png
Свиной биток нарезать и отбить, замочить в молоке и оставить на 2 часа. Для соуса нарезать зелень, натереть сыр, выдавить чеснок, добавить сметану, перемешать. Яйца взбить, посолить и поперчить. Мясо обвалять в яйце, затем в панировочных сухарях, выложить на противень, сверху выложить соус. Запекать при 180 градусах в течение 40 минут.	Свинина вымоченная в молоке под соусом	2	35	Вторые блюда/Свинина вымоченная в молоке под соусом/Свинина вымоченная в молоке под соусомc36fe45e-9b99-4048-865d-ef4ccf054292.png
Прийдя на кухню, отыщите глубокую миску, в которую хорошо бы влить не слишком  горячую воду и разбавить в ней сахар и соль. После чего на водную поверхность посыпать дрожжами и подождать 15 минут. Затем поместить в раствор одно разбитое яйцо и добавить подсолнечное масло, после чего в полученную субстанцию добавлять муку, помешивая, до того, как тесто не станет таким, что его будет возможно мять. Оставить на 1ч в теплом месте. После этого повторить процедуру замеса.	Дрожжевое тесто	4	165	\N
 В воду или бульон добавить порезанный картофель, через 5 мин горошек и кукурузу, зажарку из моркови, лука и корневого сельдерея, через 5мин кипения - помидоры, мясо, капусту, зелень. Сварить до готовности, добавить чеснок.                                   	Томатный мультиовощной суп	1	1	Первые блюда/Томатный мультиовощной суп/Томатный мультиовощной суп7788a6fe-4f17-4aa4-acdb-2a1baf0ea9e7.png
С фасоли и кукурузы слить жидкость, выложить в миску. Натереть на терке яйца, измельчить чеснок. Добавить в миску. Сыр натереть на крупной терке, добавить к фасоли, кукурузе и яйцам. Салат посолить, поперчить, заправить майонезом. Для сухариков порезать ломтики хлеба маленькими кубиками и подсушить на сковороде. Выложить салат в салатник и посыпать сухариками. При подаче салат с фасолью, сыром и сухариками перемешать.           	Салат с фасолью, сыром и сухариками	6	57	Салаты/Салат с фасолью, сыром и сухариками/Салат с фасолью, сыром и сухариками67af4f23-92b3-45d2-bc18-5367d1c79e6d.png
Лук порезать полукольцами, обжарить до золотистого цвета на растительном масле. Морковь натереть на крупной терке, обжарить до готовности, посолить, добавить паприку и выдавленый чеснок.\nОбжаренную свинину порезать мелко. Яйца потереть на крупной терке.\nОгурцы нарезать ломтиками или тонкой соломкой. Сыр потереть на крупной терке. Одну маленькую свеклу натереть для имитации полос.\nВыложить слоями: жареный лук, свинина, яйца, огурцы, сыр, морковь, свекла. Поставить на 2-3 часа для пропитки в холодильник.	Тигрица	6	159	Салаты/Тигрица/Тигрицаecfd5985-eecd-4b7b-96f3-975efc5fe093.png
Натереть морковь и редьку, заправить или майонезом с чесноком или фасолью и подсолнечным маслом.	Cалат из редьки	6	158	Салаты/Cалат из редьки/Cалат из редьки292bd537-cb1d-40d4-8bdb-1b1ba57afca8.png
 Натереть морковь с чесноком и майонезом, \r\nсверху слой тёртого сыра, затем тёртая печёная свекла с майонезом и чесноком.              	Любовница	6	50	Салаты/Любовница/Любовницаebc80f1f-9bfc-4ffa-b24b-d12faf8a74a9.png
 Язык сварить, не менее 1,5-2часа. Порезать. Добавить поджаренный лук и \r\nподжаренные блинчики из яиц (тоненькие, по 2 яйца) на небольшом кол-ве масла, \r\nа также все остальные ингридиенты. Сыр добавлять потёртым.        	Салат из языка с яичными блинчиками	6	46	Салаты/Салат из языка с яичными блинчиками/Салат из языка с яичными блинчикамиef26a091-742e-40df-bc09-3fe1d2129f79.png
Растворить дрожжи в тёплой воде с мёдом и оставить на 5 минут. Добавить соль, масло, всыпать порциями муку, обмять. Оставить на 15 минут. Разделить на 6-7 частей, скатать в шарики, дать 5 минут постоять. Выпекать при 180 град. 20-25 минут. Смазать заправкой из растительного масла, порубленного чеснока. зелени и соли.	Пшеничные булочки	2	150	Вторые блюда/Пшеничные булочки/Пшеничные булочки97b2100d-c046-49c9-bbca-e0e7f78f69dc.png
Кабачки надрезать, выдолбить середину, нафаршировать порезанной \nобжаренной куриной грудкой с луком, болгарским перцем и мякотью кабачков, \nкуда затем добавить помидор, базилик, чеснок. \nСверху залить сметанным соусом с томатом и присыпать тёртым сыром, запечь.  \nВместо куриной гудки можно использовать фарш. В мультиварке готовить 30 минут на режиме "выпечка".	Фаршированные кабачки	2	32	Вторые блюда/Фаршированные кабачки/Фаршированные кабачки8fccf69b-bff4-4092-a587-a2046cfc1331.png
Смешать мандарины, ананас, виноград, кокос и йогурт. Поставить в холодильник.	Пятерочка	3	161	Десерты/Пятерочка/Пятерочка8027c70b-c30b-42e0-8798-9ae7a0000042.png
Яйца сварить вкрутую и нарезать кубиками.\nСыр натереть на крупной терке.\nОгурцы порезать кубиками.\nПомидоры порезать.\nСмешать яйца, сыр, огурцы, кукурузу, помидоры и майонез.	Салат с кукурузой и сыром	6	160	Салаты/Салат с кукурузой и сыром/Салат с кукурузой и сыром3619f2ff-3022-4db3-bb19-4e0ffaf55f53.png
Все ингредиенты нарезать очень крупно. Помидоры на большие дольки, лук, морковь и баклажан крупными кольцами, перец полосками и мясо на куски около 4 сантиметров. Одну помидорку оставить целой. В чашу мультиварки налить немного подсолнечного масла, выложить кольца лука, морковь, половину долек помидор.\nСверху положить половину баклажана.\nСледующим слоем выкложить все мясо, посолить, посыпать приправой. Мясо закрыть оставшимися овощами – перцем, помидорами и баклажанами, посыпать половиной свежей петрушки, еще раз посолить и приправить.\nЕсли не помещается, слегка утрамбовать ладошкой. Ничего не перемешивать и не добавлять воды. Все будет томиться в собственном соку. Закрыть крышку, включить мультиварку в режим «Тушение/томление» на 1 час 20 минут. Если продуктов больше, можно и 2 часа потомить. Через час открыть, покласть остатки петрушки и порезанную на дольки помидорку. Готовить до завершения программы. Готовую хашламу посыпать свежей зеленью.	Хашлама	2	141	Вторые блюда/Хашлама/Хашламаd4852f0b-bdc8-4534-9899-8bb76d6ea7cb.png
Перемешать тертый сыр с майонезом, мукой и взбитыми венчиком яйцами. Застелить форму пергаментом, выложить половину сырного теста, разровнять, поставить в разогретую до 180 градусов духовку и запечь до затвердевания. Так же приготовить вторую часть сырного теста. Разрезать сырные коржи пополам поперек чтобы получилось 4 одинаковых листа. Лук мелко нарезать, обжарить до мягкости, перемешать с фаршем, рубленым укропом, поперчив и посолив. Выстелить форму фольгой, чтобы ее края свисали со все сторон. Выложить в центр 1 сырный корж, смазать третью фарша, уложить сверху второй корж, снова смазать фаршем и т.д. Верхний корж фаршем не смазывать. Свисающей фольгой обернуть пирог сверху, запечь в разогретой до 160-170 градусов духовке 50 мин, достать, оставить на 10-15 мин в фольге, затем ее снять. 	Курино-сырный слоеный пирог	2	61	Вторые блюда/Курино-сырный слоеный пирог/Курино-сырный слоеный пирог9d5feb86-ea6c-4be3-bf8e-00beacde959e.png
Сварить макароны. Пока они варятся, лук почистить и порезать мелким кубиком. Чеснок почистить и измельчить. В разогретую сковороду налить масло и обжарить лук на среднем огне до легкой золотистости. В конце добавить чеснок и обжаривать еще секунд 30. Обжаренный лук выложить на тарелку, увеличить огонь, добавить фарш и обжаривать его, разбивая комочки. Весь процесс займет около 5 минут. К фаршу добавить соль, перец, порезанные помидоры и немного воды. Всё перемешать, закрыть крышкой и потомить несколько минут. С макарон слить воду, промыть и добавить к фаршу. Перемешать макароны с фаршем.	Макароны по-флотски	2	140	Вторые блюда/Макароны по-флотски/Макароны по-флотски99731ca5-4bab-43aa-96f7-18a60a594619.png
Куриный фарш смешать с натертой морковью, специями, солью. Можно ложить мелко порезанный лук. Выложить на противень, формируя котлетки в виде гнёзд. В углубления вбить по яйцу. Запекать в духовке 35 минут.	Куриные гнёзда	2	15	Вторые блюда/Куриные гнёзда/Куриные гнёзда2991a441-9daa-4a0b-b74d-a7ace658ccd1.png
Всё мелко нарезать или перекрутить.\nОбжарить лук в глубокой посудине 5 мин, добавить перец, обжарить 7 мин, помидоры, протушить 5 мин. \nДобавить баклажаны, протушить 8 мин, посолить, поперчить. Добавить чеснок, зелень. Тушить ещё чуть.\nРазложить по стерилизованным банкам, прикрыть крышками, стерилизовать 15 мин в кипящей воде, закупорить.\nБанки укутать, хранить в прохладном месте.\nИз указанного числа продуктов  у меня вышло 3 полных литра.	Икра из баклажан	7	94	\N
Раскатать в продолговатые лепешки тесто, смазанное маслом, \nвыложить начинку из корицы и сахара 1:2, скрутить в рулет, \nслепить концы и надрезать в месте сгиба. Запечь 10-15 мин при 230 град.	Булочки с корицей	3	70	Десерты/Булочки с корицей/Булочки с корицейe9ae6439-b7ce-4dff-9a68-793112e7dd83.JPG
Сахар коричневый (мелкий от "Мистраль" 50 гр в тесто, 100 гр в крем, 50 гр в соус) — 200 г\n\n\nСначала для десерта готовим миндальный бисквит.\nБерём миндаль и измельчаем его блендером.Сливочное масло растапливаем на плите или в микроволновке. Смешиваем один желток от яйца, одно яйцо, сахар и измельчённый миндаль, взбиваем всё миксером. Смесь должна стать практически белой (ну, конечно, крупинки миндаля будут заметны).Добавляем просеянную муку. Перемешиваем.\n\nТри белка взбиваем в устойчивую пену. Добавляем белки в тесто и аккуратно перемешиваем. Добавляем в тесто остывшее растопленное масло, всё тщательно аккуратно перемешиваем. Берём противень приблизительно 30 на 40 см, застилаем пекарской бумагой или силиконовым ковриком, выливаем тесто и аккуратно размазываем его по бумаге лопаткой. Ставим в нагретую до 200 градусов духовку и выпекаем 12 минут.Достаём миндальный бисквит, аккуратно отделяем от бумаги и заворачиваем рулетом вместе с бумагой.\n\nПока рулет остывает, готовим крем.\nБерём всё тот же коричневый мелкий сахар от "Мистраль", сливки и взбиваем в пену. Добавляем к взбитым сливкам маскарпоне и ещё раз всё тщательно взбиваем. Достаём наш рулет, разворачиваем и намазываем кремом (используем приблизительно четверть от всего приготовленного крема), берём бананы, чистим, режем на 4 части вдоль и укладываем на бисквит с краю. Заворачиваем рулет. Вот, тут я должна отметить, что нам нужен только "один виток" рулета, остальное отрезаем, конечно, он будет впоследствии съеден.\n\nЗамачиваем пачку желатина согласно инструкции.\nУ меня быстрорастворимый желатин, им можно пользоваться сразу.Заранее приготавливаем форму, соизмеримую по длине с длиной рулета, у меня она оказалась меньше, концы рулета пришлось отрезать, что также было впоследствии съедено. Застилаем форму пищевой плёнкой. В оставшийся крем добавляем растворённый согласно инструкции желатин, взбиваем. \nЯ не уверена, что в оригинальном рецепте был именно желатин, явно присутствовал какой-то стабилизатор, который давал десерту возможность держать форму, но я этого не знаю. Заливаем половину крема в форму, даём ему немного застыть.Укладываем сверху готовый рулет.\n\nЗаливаем остатками крема с желатином. \nСтавим десерт в холодильник для застывания. У меня на это ушло 3 часа.\n\nГотовим соус из манго, сока лимона и сахара мелкого коричневого от "Мистраль".Манго чистим, режем на кусочки, измельчаем блендером, добавляем сок половины лимона и сахар.Блендером перемешиваем соус.\n\nостаём готовый застывший десерт из холодильника. Берём сервировочное блюдо, переворачиваем десерт, удаляем пищевую плёнку.Для сервировки отрезаем кусочек десерта.\nПосыпаем сахарной пудрой, поливаем манговым соусом. 	Таю на губах	3	195	Десерты/Таю на губах/Таю на губах5d8ba165-a941-4a6a-89e9-f70922079ccf.png
Сыр, яйца, отварной картофель натереть на крупной терке.\nСемгу нарезать небольшими пластинками.\nМорковь натереть на мелкой терке и смешать с майонезом.\nВыложить салат слоями, формируя морскую звезду. \nСлои: картофель - сыр - семга - яйца. Каждый слой промазать майонезом с морковкой. Верх салата покрыть пластинками сёмги. Поставить в холодильник для пропитки.	Морская звезда	6	162	Салаты/Морская звезда/Морская звезда78a8483e-81ff-41b4-8986-5f5cb19e95a0.png
Для соуса "Бешамель" в сотейник  положить масло, муку, щепотку мускатного ореха, поставить на огонь и готовить, постоянно помешивая, до полного растворения масла. Затем постепенно влить тонкой струйкой молоко, не забывая помешивать соус и готовить на среднем огне до густоты сметаны.\nГотовый соус по вкусу посолить и поперчить. В форму для запекания  выложить слой порезанных дольками томатов. Полить слегка соусом. Выложить слой порезанныз грибочков, лука, слой порезанной свинины, залить оставшимся соусом. Поставить в духовку на часик при 200 градусов. За 10 минут до окончания посыпать сыром и зеленью. Можно готовить в мультиварке.	Звуки Франции	2	55	Вторые блюда/Звуки Франции/Звуки Франции8f62cd7d-ed2e-46aa-ad8f-9542c27c64c6.png
Дрожжи замочить в тёплой воде с сахаром на 5 минут. Добавить щепотку соли, 3ст.л. растительного масла, 250г муки. Замесить тесто. Оставить на 1 час. Раскатать тесто, выложить в форму, сделать бортики, выложить поджаренный лук, затем помидоры кольцами, сверху положить кусочки адыгейского сыра. Выставить режим "печь" на 45 минут (180 град).	Пирог с помидорами и сыром	2	152	Вторые блюда/Пирог с помидорами и сыром/Пирог с помидорами и сыромbf315e41-8bee-4f5c-adc5-dc310bc03566.png
Смешать размягчённое масло с сахаром и яйцами. Добавить муку с разрыхлителем, замесить, отправить на 1ч в холодильник. Тесто очень пластичное, но лекго рвется. Порция для большого пирога.	Песочное пластичное тесто	4	4	\N
Груши потереть на самую крупную терку.\nКокос почистить и измельчить на комбайне или на мясорубке до крупных "крошек".\nФиники избавить от косточек и порезать по возможности помельче.\nВсе перемешать, выложить на красивые тарелочки, посыпать семенами льна и чуть-чуть корицей.	Волшебный салат со сливочным вкусом	3	155	Десерты/Волшебный салат со сливочным вкусом/Волшебный салат со сливочным вкусом408e39f9-88eb-4122-ae6a-e4b0fd99d954.png
Все сварить. Мясо мелко нарезать, добавить чеснок, пропущенный через чесночницу, добавить немного майонеза, все перемешать. Выложить первым слоем в салатник. Сыр и яйца натереть на крупной терке. Потереть морковку и свеклу. Выложить салат слоями: мясо - сыр - яйца - морковь - свекла. Все слои промазать майонезом.	Мой генерал	6	154	Салаты/Мой генерал/Мой генерал1a461d3a-d8be-43a5-8244-98b9d17ca655.png
Натереть яйца, сыр, чеснок, смешать с майонезом. Облепить потёртой вареной морковью, вставить "хвостик" из гвоздики.	Апельсины	6	174	Салаты/Апельсины/Апельсиныb4a3ad22-d439-4995-8ea4-68e5c4f0a62e.png
Рыбу мелко нарезать, перемешать с укропом, молотым перцем. Уложить на дно формы. Вареные овощи почистить, натереть на крупной терке. Уложить слоями поверх рыбы: картошка, морковка, сверху свекла. Каждый слой перемешать с майонезом.	Красная рыба под шубой	6	168	Салаты/Красная рыба под шубой/Красная рыба под шубой61bc8a58-0642-4250-8e3f-5878526cf63f.png
На кусочки хлеба, наложить начинку, поставить в разогретую духовку, запекать 7минут. Например, в качестве начинки, можно потереть сыр, чеснок и перемешать с порезанной зеленью.          Для бутербродов из яиц с чесноком взять белый хлеб, намазать каждый кусочек тонким слоем сливочного масла с двух сторон. Обжарить на сковороде несколько минут. Можно запечь в духовке. 3 яйца сварить, очистить. Натереть яйца на терке. Выдавить в яйца 2 зубчика чеснока, добавить соль, перец и 2 ст.л. майонеза. Все хорошо перемешать. Намазать яичную массу на 8 кусочков поджаренного хлеба.	Бутерброды	2	171	Вторые блюда/Бутерброды/Бутербродыd2112a0b-7257-4297-b747-43a169c4b9d1.png
Замесить тесто на коржи из из 6ст муки, маргарина, воды. Раскатать. \nПеред выпечкой наколоть вилкой. Разделять на 12 частей. Выходит 14 коржей (с обрезками).\nЗаварной крем из желтков (лучше больше) с сахаром, 100г муки, 400г молока, \nвсе это влить в 1л кипящего молока. На указанное количество теста крема надо в 2 раза больше.	Наполеон	3	67	Десерты/Наполеон/Наполеон4f6ea8de-7819-47aa-b94f-e6db4c7a0596.png
Испечь бисквит, разрезать пополам, пропитать коржи вкусным сиропом, намазать белковым кремом внутри и сверху,  Украсить топленым шоколадом, сиропом, можно орехами.	Торт с белковым кремом	3	27	Десерты/Торт с белковым кремом/Торт с белковым кремом0b79682d-2f79-4bf7-adb3-98ac6e15a13d.png
Лук и варёные яйца мелко нарезать, лук поджарить, смешать с яйцами. Замочить батон в молоке, смешать с фаршем, поперчить, посолить. Сформировать из фарша лепёшку, в центр выложить начинку из яиц и лука, сформировать котлету.  Запечь при 180 градусах 40-45мин.	Зразы мясные с яйцом и луком	2	31	Вторые блюда/Зразы мясные с яйцом и луком/Зразы мясные с яйцом и лукомac30eec5-bac9-41c2-a4ee-ca14e83a528a.png
Взбить яйца с солью, помыть и высушить грибы, обмакнуть грибы в яйцо, усыпать панировочными сухарями, выложить на сетку и готовить на огне 15-20 минут.  Подавать с соусом в виде майонеза с чесноком.	Грибы на огне	2	23	Вторые блюда/Грибы на огне/Грибы на огнеe86c330e-dafc-4594-b9de-5f88e1d922b4.png
Тесто, раскатать, выложить в форму для запекания, сделать борты.\nПечень, шалот, чеснок – в блендер, добавить яйца, сливки, базилик, мускатный орех, соль, перец, еще раз взбить, выложить на тесто и на 40 мин в духовку, 160 град.\n\nТесто: сливочное масло растереть с 2 яйцами, добавить муку и 2 ч.л. соли, молоко. В холодильник на 30 мин.	Флан с печенью	2	34	Вторые блюда/Флан с печенью/Флан с печенью272c535e-42ff-454d-95a3-0beabe9fc1e7.JPG
Грибы обжарить с луком, картофель сварить, потолочь с молоком. Размешать картофель с грибами, яйца слегка взбить. Сформировать котлеты, обмакнуть их в яйцо, затем в панировочные сухари, поджарить или поставить в духовку. Подавать с соусом из сметаны, зелени и чеснока.	Картофельно-грибные котлеты	2	36	Вторые блюда/Картофельно-грибные котлеты/Картофельно-грибные котлетыd529b199-6b6a-449e-938f-35a384b6219f.png
Из медового раскатанного коржа сразу же вырезать под трафарет пирожные. Выложить слоями, пропитывая кремом. Для крема сметану смешать с  сахаром, добавить измельчённые орехи. Поставить пирожные на 3-4 часа в холодильник, затем смазать остатками крема сверху и по бокам и присыпать измельчёнными остатками коржа после вырезания.	Медовое пирожное	3	29	Десерты/Медовое пирожное/Медовое пирожноеc45ae63f-df1f-4d38-8c4f-df792a9bce95.png
Для яблочного слоя: Яблоки помыть, почистить, удалить сердцевину, нарезать не очень тонкими ломтиками (толщиной где-то 0,5 см). К яблокам добавить сок половины лимона и белое вино, поставить на огонь и готовить до мягкости яблок. Очень важно их не переварить!!! Для ленивых предлагаю более простой способ: яблоки почистить, удалить семечки и поставить в микроволновку на 5 минут. Получается нужное нам состояние яблок, и не надо ни за чем следить.\nСделать гранолу: Для этого смешать измельченные орехи (не надо измельчать в муку) и овсяные хлопья.\nНа сковороде растопить мед, сливочное масло (30г), 50г сахара и корицу. Добавить орехово-овсяную смесь, тщательно перемешать. Остудить.\nДля творожного слоя: Творог растереть вилкой, смешать с 30г сахара и изюмом.\nСделать тесто: Смешать в отдельной миске ржаную и овсяную муку, разрыхлитель. Если есть возможность, не заменяйте ржаную муку пшеничной! Ржаная мука придает очень интересную нотку тесту!!!\n\tВзбить растопленное сливочное масло (70г) с обычным (50г) и ванильным сахаром и добавить яйца. Затем постепенно, непрерывно помешивая, ввести мучную смесь. Получится достаточно густое тесто.\n Смазать форму растительным маслом и посыпать овсяными хлопьями. Выложить тесто, затем творожную массу. Сверху накрыть яблоками. Последним слоем идет гранола.\nВыпекать в предварительно разогретой духовке при 180 градусах 25-30 минут. Готовый пирог остудить.	Пирог 4 слоя	3	38	Десерты/Пирог 4 слоя/Пирог 4 слояadb9a9eb-9bb3-437a-b566-a65a73ceda2c.png
Раскатать коржи из медового теста, перемазать кремом. Приготовление крема.\nВзбиваем яйца с сахаром, затем добавляем 2 ложки муки, выливаем молоко. Хорошенько перемешиваем, ставим кипятиться. После закипания варим, помешивая, пару минут и выключаем огонь. Заварной крем остужаем, добавляем в него размягченное масло, взбиваем (перемешиваем) до однородности. Собираем торт.\nКоржи перемазываем кремом - совсем немножечко, чтобы они не получились слишком мокрыми.	Медовый торт	3	180	Десерты/Медовый торт/Медовый тортfd94ef63-bd7b-4580-91f4-a7e17a668b6d.png
Сначала яйцо взбить с кефиром. Влить в фарш и хорошенько размешать до однородной массы. Затем добавить муку, посолить и снова хорошенько перемешать. Тесто должно получиться как сметана, но не очень густая. С ложки падать, а не литься.\nНагреть масло на сковороде. Столовой ложкой выложить оладушки и немного разравнять, чтобы получались плоские. Жарить с двух сторон до румяной корочки.\nМасло они совершенно не впитывают.	Куриные оладьи	2	37	Вторые блюда/Куриные оладьи/Куриные оладьи7067a3f4-ab1b-435e-b1c5-e4e73fce7110.png
Сделать бисквит  на 4 яйца с добавлением какао, соды, 5ст.л. сахара и 3ст.л. муки (В пропорциях это не указано). Разрезать напополам вдоль на 2 коржа, промазать кремом из перемолотой мякоти кокоса, замоченной в масле с добавлением молока, сахара, проваренной 2-3 минуты, остуженной до загустевания.  Покрыть глазурью. Настояться ночь.	Шоколадный торт с кокосом	3	114	Десерты/Шоколадный торт с кокосом/Шоколадный торт с кокосом633f29d4-4ffe-4b4c-b090-be12d3a12b13.png
Смешать фарш с рисом. Свежую капусту помещаем в кастрюлю с кипятком и варим 5 минут, переворачиваем, варим еще 5 минут. Можно капусту полностью окунуть в кипящую воду, тогда переворачивать не нужно. Достать капусту, дать стечь воде и вырезать кочерыжку. Аккуратно снять капустные листы, не повреждая их. Срезать толстую часть листа. Где-то после 4-го листа капуста была твердой, я еще раз поварила ее в кипятке 2-3 минуты. з фарша слепить небольшую котлетку, выложить на капустный лист. Сворачивать, сдвигая внутренние края листа друг к другу, чтобы не было большой щели от выреза. Сложить внешние края листа друг к другу, выпрямляя их, и свернуть голубец до конца. Лук репчатый тонко нарезать, морковь натереть соломкой, чеснок раздавить и мелко нарезать.  В мультиварке-скороварке включить режим «Жарка», добавить растительное масло, выложить морковь, лук, чеснок и пассеровать 3-5 минут. Добавить мелко нарезанный средний мясистый помидор. Посолить, поперчить и перемешать. Жарить еще 2-3 минуты. Выключить режим «Жарка», выложить голубцы.  Добавить стакан куриного или мясного бульона, можно воды. Если голубцов 2 слоя, то жидкости потребуется чуть больше, если 1 слой, то, как в рецепте. Готовить в режиме «Тушение» 20 минут.	Голубцы	2	107	Вторые блюда/Голубцы/Голубцы1668eb3f-e482-4d13-8732-cc6f72137358.png
Смешать сахарную пудру с пару капель окрашенной жидкости (варенье, лимонный сок и т.д.) Застывает около 12 часов, лучше делать погуще.	Глазурь	5	73	Крема/Глазурь/Глазурьfcad7f6c-2108-4b83-bbcf-3c3375e0cf49.png
Сахар, яйца, ванильный сахар взбить в пышную массу. Добавить сметану, хорошо размешать. В получившуюся массу ввести мягкое сливочное масло комнатной температуры, размешать.\nПросеять муку с разрыхлителем (дозу не уменьшать) соединить с массой, хорошо размешать.\nСмородину посыпать мукой и подмешать к тесту. Можно выложить сверху.\n\nФорму смазать раст. маслом, застелить кулинарной бумагой, заполнить тестом на 2/3.\nВыпекать в хорошо разогретой духовке при температуре 180 градусов около 1 часа, проверить готовность на сухую спичку.\nГотовый кекс посыпать сахарной пудрой. На мой вкус кексы нравится покрывать глазурью.	Кекс Смородинка	3	68	Десерты/Кекс Смородинка/Кекс Смородинка993886c6-06ee-40cb-aac4-5772a1360b59.png
Обжариваем мелко нарезанный лук в растительном масле до прозрачности.\nДобавляем тертую на мелкой терке морковь. Обжариваем.\nКладем свиные ребрышки. Обжариваем, перемешивая.\nДобавляем шинкованную капусту и приправы. Недолго жарим, следим, чтобы не подгорела.\nДобавляем воду, перемешиваем, готовим под крышкой до почти полного испарения воды. Если готовить в мультиварке, то вода не испаряется.	Бигус на свиных ребрах	2	87	Вторые блюда/Бигус на свиных ребрах/Бигус на свиных ребрах721ba03d-b419-4927-b97d-3d2649e003ad.png
Добавить в смешанный фарш тёртую вареную свеклу, сматану, соль. Хорошо вымешать. Обжарить до полуготовности. В сковороде, где обжаривались бифштексы, прожарить муку. Затем муку разбавить горячей водой и тщательно перемешать, чтобы не было комков. Воду добавить до консистенции подливы. Получившейся подливой залить бифштексы и тушить около 20 минут под крышкой.\nМожно тушить в духовке, разогретой до 100-120*С.	Бифштекс линдстрем	2	91	Вторые блюда/Бифштекс линдстрем/Бифштекс линдстрем85dc0585-150e-4f38-a1e1-0e25179fe669.png
Варим мясо очень долго... 5-6 часов\nУ меня домашняя курица особой жесткости варилась не менее 4-5 часов.\nТесто делаем из яиц+мука+соль+очень наваристый бульон от курицы!\nЗамешиваем и оставляем на 30 мин. отдохнуть\nРежем много много много лука, и туда еще больше перца!\nРаскатываем тесто очень тонко.\nЛук с перцем поджариваем.\nСтавим кастрюлю поболее и наливаем туда бульон, в котором варилась кура или мяско...\nЛапшу режем большими квадратами.\nВарим, то есть кидаем в кипящий бульон и ждем когда всплывет, потом вылавливаем шумовкой и выкладываем на большое блюдо, чуть поливаем  луком и бульоном.\nИ так всю лапшу.\nЗатем выкладываем мясо и сверху поливаем остатками лука.	Бешмармак	2	69	Вторые блюда/Бешмармак/Бешмармак1fc123c0-2157-4e80-99a9-80dfe1a93b2e.png
Масло комнатной температуры взбить с сахаром до однородности. Яйцо хорошо разболтать и разделить на 2 равные части. Одну часть отставить, она нужна для смазывания коржиков.\nДобавить молоко и половину яйца в масло. Взбить в крем. Добавить разрыхлители, перемешать. Всыпать муку и замесить гладкое, не липнущее тесто. Стол припылить мукой. Раскатать пласт толщиной 6-7 мм. Вырезать коржики диаметром 9,5 см (у меня они диаметром 8 см). Переложить на противень, выстеленный пергаментом. Смазать яйцом. Оставшееся тесто собрать в шар, обмять, снова раскатать... Так, пока не израсходуете всё тесто. Выпекать коржики молочные в разогретой до 200С духовке 10-12 минут. До золотого цвета.\nОстудить на решётке. Получается около 20 коржиков, на один противень не помещается.	Коржики молочные	3	79	Десерты/Коржики молочные/Коржики молочныеfe7317eb-65f4-4158-99ec-cb05b97c8fd2.png
Приготовить тесто для галеты. В тесто можно добавить вместо воды холодную сметану по желанию из расчёта 1:1 с мукой.\n\nПока тесто охлаждается, приготовим начинку.\n------ Творожная начинка -----\nВ мисочке соединить творог (250г), сахар(50г) и яйцо. Тщательно перетереть вилкой до однородного состояния. У вишен(0,5кг) удалить косточки. \nОхлажденное тесто тонко раскатать.Выложить творожную начинку, оставляя примерно 4-5 см края.\nСверху творожной начинки выложить вишенки. Края завернуть сверху на начинку. Края пирога и вишни чуть присыпать сахаром.\n\nАккуратно перенести лист пергамента с галетой на противень.\n\nВыпекать в разогретой до 200 градусов духовке 20-25 минут до золотистого цвета.	Галета с начинкой	3	182	Десерты/Галета с начинкой/Галета с начинкойd2bd0328-929a-4c57-a7e4-01c7233211bd.png
Мясо отварить около 3 часов, разделить на кусочки, выложить на лаваш, выложить также порезанные помидоры и тёртый сыр. Скрутить лист лаваша в трубочку, посыпать чуть-чуть сыром, поставить в духовку на 15 минут. Подавать горячими.	Бурито	2	90	Вторые блюда/Бурито/Бурито8f2109fb-46fa-484b-9a8a-4e9dd1499b62.png
Яблоки мою, очищаю от кожуры и натираю на крупной терке.\nДобавляю ванильный сахар, перемешиваю.\nВ миске хорошо смешиваю манную крупу, муку, просеянную с разрыхлителем, сахар.\nКруглую разъемную форму (диаметр моей формы 24 см) смазываю сливочным маслом. 1/3 часть сухой мучной смеси равномерно распределяю по дну формы.\nНатертое яблоко снова перемешиваю, т. к. на дне образуется сок, 1/2 часть равномерно распределяю по сухому слою в форме. Автор настоятельно рекомендовала не прижимать яблочный слой ко дну формы. Я придерживалась этого совета и не пожалела, т. к. это придало нежную структуру выпечке.\nПосыпаю яблочный слой 1/3 частью сухой мучной смеси (от начального объема).\nВыкладываю оставшееся натертое яблоко, стараясь равномерно распределить его, не прижимая.\nПосыпаю оставшейся сухой смесью.\n\nГотовлю заливку. Взбиваю миксером или венчиком 300 мл молока, яйцо, растительное масло.\nСтараюсь равномерно распределить заливку по верхнему слою пирога. В зависимости от сорта яблок, яблочный слой может иметь разную консистенцию. Если он имеет более рыхлую структуру, то заливка не закроет пирог полностью, что видно на моем фото (если бы я прижимала яблочный слой к сухому, то заливка покрыла бы пирог полностью, но в этом случае пирог не получился бы таким нежным). Можно нижний слой чуть полить заливкой, чтобы он не получился сухим, или с помощью тонкого деревянного шампура сделать проколы в пироге до дна.\nВыпекаю пирог в разогретой до 200 градусов духовке около 15 минут. Вынимаю из духовки, сверху распределяю оставшееся молоко (50 мл), с помощью кулинарной кисти смазываю оставшиеся участки сухой смеси. Снова убираю пирог в духовку.\nВыпекаю пирог при той же температуре еще около 25-30 минут (до золотистой корочки). Вынимаю пирог из духовки и обязательно даю пирогу остыть и настояться не менее 3-4 часов, чтобы яблочный сок лучше пропитал все слои пирога. Посыпаю пирог сахарной пудрой через ситечко.	Яблочно-манный пирог	3	138	Десерты/Яблочно-манный пирог/Яблочно-манный пирогb1e6d970-3ce4-4189-906a-45f304b3ea6a.png
Овощи и мясо сварить. Мясо нарезать соломкой, натереть яйца, картошку, морковку и сыр. Огурцы мелко нарезать. Взять глубокую миску, застелить пищевой полиэтиленовой пленкой. Салат Грибная поляна выкладывается слоями: шампиньоны шляпками вниз, зелень, половина картофеля, тертая морковь, яйца, сыр, нарезанные огурцы, мясо, половина картофеля.\nВсе слои промазать майонезом и убрать для пропитки на 1-2 часа в холодильник.\nГотовый салат перед подачей перевернуть на тарелку, чтобы грибочки получились сверху.	Грибная поляна	6	153	Салаты/Грибная поляна/Грибная полянаa99da4f2-119d-4f90-a260-11eb9013896c.png
Помидоры помыть, обдать кипятком, снять кожицу и нарезать кружочками.\nСыр натереть на мелкой терке. Сделать кляр: к сыру добавить яйца, майонез, муку ( в оригинальном рецепте не было муки). Посолить, поперчить по вкусу и перемешать. Консистенция дожна получиться густой. Помидоры обмакнуть в кляр, выложить ложкой в сковороду, разогретую с растительным маслом.\nОбжарить с двух сторон до золотистой корочки.\nВыложить на бумажное полотенце, дать стечь лишней жидкости.	Помидоры в сырном кляре	2	175	Вторые блюда/Помидоры в сырном кляре/Помидоры в сырном кляреab301e6a-3a6b-45bf-a1bc-b7b481b030b5.png
Помидоры, перец, огурцы порезать крупными кусками, салат порвать кусочками, лук порезать помельче. Можно добавить порезанное авокадо. Приправить оливковым маслом с солью, молотым перцем и лимонным соком. Сверху порезать сыр Фета.	Греческий салат	6	126	Салаты/Греческий салат/Греческий салатee945a75-ddff-41e7-b210-4965d66bb739.png
Свинину обжарить.\n\nФиле курицы либо обжарить без масла, чуть посолив-поперчив, либо отварить.\n\nМясо охладить хорошенько.\n\nНарезать свинину и курицу на кусочки.\n\nБолгарский перец нарезать (для красоты можно использовать разноцветный перец).\n\nНарезать маринованные огурцы.\n\nЯйца и сыр натереть на крупной терке.\n\nЗаправка: смешать оливковое масло, йогурт, соль, горчицу, уксус, перец. Слегка взбить вилкой.\n\nВсе ингредиенты соединить и заправить соусом.	Зимняя сказка	6	191	Салаты/Зимняя сказка/Зимняя сказка743c557d-12a3-40fe-989f-beb71e436e79.png
Взбиваем в кастрюле яйца с сахаром, сыплем соду. Добавляем мёд и маргарин комнатной температуры.\nОбратите внимание: соду уксусом не гасим. Здесь сода гасится медом, который имеет кислую реакцию pH. Всё перемешиваем, ставим на малый огонь и, непрерывно помешивая, доводим до карамельно-коричневого цвета (варить до 7 минут). \nСнимаем с огня, слегка остужаем, всыпаем 4 стакана муки. Замешиваем крутое тесто.  Очень важно не дать остыть тесту совсем. Также, если экономить на масле,  то тесто будет рассыпаться и его невозможно будет раскатывать.\nДелим тесто на семь частей, после чего каждую раскатываем в корж. Коржи раскатываем тонкие. Очень удобно раскатывать на пекарском пергаменте. Я сразу же на пергаменте и обрезаю корж по круглой тарелочке. Обрезки не выбрасывать! Позже они послужат украшением. \nВыпекаем коржи в разогретой духовке при температуре 180˚C.	Медовое тесто	4	179	\N
Белое и красное вино смешать в кастрюльке. Добавить свежезаваренный чай, сахар и лимонную корочку. Поставить на огонь и нагреть до кипения. Варить около 5 минут. Процедить в чистую посуду.\n\nЛимон нарезать дольками, удаляя косточки и разложить в чашки. Влить в чашки с лимоном горячий пунш и сразу подать его на стол.	Розовый пунш	9	189	Напитки/Розовый пунш/Розовый пуншa859bca7-6ba8-4de5-bd31-0b3d5fb95dfb.png
Мягкий плавленый сыр растопить до состояния соуса.\nПожарить яйца на растительном масле на среднем огне - белок должен прожариться, но не до хруста, а желток оставаться жидким. Посолить, добавить карри.\nВыложить на тарелку, посыпать мелко порубленной зеленью.\nЗалить жидким плавленым сыром и немедленно подавать.	Глазунья с плавленым сыром	2	181	Вторые блюда/Глазунья с плавленым сыром/Глазунья с плавленым сыром8f38979a-39ee-46d5-8a87-5f7296580297.png
У помидор вынуть серединку, вбить туда яйца, присолить, поставить в разогретую духовку на 5 минут.	Яичница в помидоре	2	185	Вторые блюда/Яичница в помидоре/Яичница в помидоре5c4e6bcf-6f5e-4102-a1c7-75470a95ca99.png
Картофель натереть на крупной терке, грибы нарезать пластинами, лук и филе - кубиками. Измельчить зелень, чеснок, сыр натереть.\nЯйца размешать со сметаной миксером.\nВсе соединить, приправить солью и перцем.\nВыложить массу в мультиварку и готовить в режиме "Выпечка" 50минут или в духовке.\nУказанных пропорций для моей мультиварке много.	Запеканка из курицы с грибами	2	203	Вторые блюда/Запеканка из курицы с грибами/Запеканка из курицы с грибамиba29fa55-3261-4102-8688-a0aaf57d9838.png
Капусту нарезать. Воткнуть гвоздику в половинку луковицы. \nЯблоки (небольшие) очистить и нарезать кубиками.\nВылить масло на сковороду. Выложить яблоки и луковицу, обжарить несколько минут. \nВыложить капусту в яблоки, залить вином, разбаленным с водой. Перемешать, добавить соль и сахар, душистый перец, корицу, уксус, лавровые листы. Накрыть крышкой. Протушить 30 минут. Когда капуста почти готова, выложить клюкву, тушить еще 10 минут. Вынуть лук и лавровый лист.	Тушёная капуста по-немецки	2	214	Вторые блюда/Тушёная капуста по-немецки/Тушёная капуста по-немецки7002fb09-a778-47b5-bf67-b90df24ff645.JPG
Вымыть листья базилика и дать им хорошо обсохнуть. Положить в блендер 1 зубчик чеснока (предварительно почищенный и разрезанный пополам) и кедровые орехи, добавить немного соли и влить оливковое масло. Измельчить до состояния пюре. Добавить сыр, соль и масло по желанию.	Песто	8	187	Соусы/Песто/Песто8e1186de-c3b4-4a54-afa5-86b8fda3b228.png
Готовим продукты для салата: вареную курицу очищаем от костей и режем очень мелко.Болгарский перец очищаем от семян и мелко режем, эелень моем и измельчаем. Зелень и перец смешиваем. Можно чуть-чуть посолить.Яйца варим вкрутую, очищаем от скорлупок и режем пополам. Белки убрать в сторону, нам понадобятся целые половинки, желтки измельчаем. Сыр трем через терку. Размер терки выбираем по желанию. Отварной картофель очищаем от шкурки, мелко режем и формируем из него нижний слой. можно чуть-чуть посолить.Смазываем слой майонезом.\nФормируем слой из курицы. Выкладываем не всю курицу, приблизительно четверть массы откладываем в отдельную посуду, из нее будем делать начинку для белков.Выкладваем на курицу зелень с перцем. Смазываем этот слой майонезом.\nВысыпаем часть сыра. Посыпаем измельченными желтками. Желтки тоже делим. 1/3 добавляем к курице, для приготовления начинки. Смешиваем курицу, желтки и столовую ложку майонеза.\nЭтой смесью фаршируем половинки белков.\nИз фаршированных белков формируем верхний слой.\nЗаливаем салат оставшимся майонезом и посыпаем сыром.\nПолучается зимний наст со множеством сугробов. Украшаем веточками укропа, так напоминающие еловые веточки. Вполне зимняя картинка, снег, еловые ветки и неяркое солнышко, приподнятое над сугробами.	Сугроб	6	194	Салаты/Сугроб/Сугробf4db73ba-fa8f-48f6-9bfb-2e11d1572e88.png
Кладём в прозрачный бокал все ингредиенты, кроме мёда. \nЗаливаем кипятком. Ждём, пока вода в бокале остынет до комфортной для питья температуры.\n\tДобавляем ложку мёда, размешиваем и даём напитку настоятся около минуты.	Марокканский чай по-генически	9	190	Напитки/Марокканский чай по-генически/Марокканский чай по-геническиf20ecd3e-4712-4fac-9985-e6152a921828.png
Фасоль заранее разморозить: положить в дуршлаг, поставить его на миску и поместить на верхнюю полку холодильника. Вскипятить большое количество подсоленной воды, положить фасоль и вновь довести до кипения. Отбросить на дуршлаг и обдать холодной водой. Поместить в большую миску и оставить в теплом месте. Свинину вымыть, нарезать полосками длиной 3,5 см и шириной 1,5 см. Приправить солью и перцем. Половину семян кунжута пересыпать на плоское блюдо, обвалять в них кусочки мяса и обжарить, по 3 мин. с каждой стороны. Переложить в миску с фасолью, накрыть. Шампиньоны вымыть, обсушить, нарезать тонкими пластинами и обжарить в той же сковороде, где жарилась свинина, 6–7 мин. Добавить к мясу и фасоли, перемешать. Помидоры черри и салат вымыть. Помидоры разрезать пополам, салат разобрать на листья и крупно их нарвать.\nВзбить кунжутное масло с уксусом, сахаром и солью. Чеснок очистить, разрезать пополам и натереть им чистую сковороду. Обжарить на ней оставшийся кунжут, постоянно помешивая, 1 мин. В салатницу выложить листья латука, сбрызнуть небольшим количеством приготовленной заправки. Сверху положить фасоль с мясом и грибами и помидоры. Полить оставшейся заправкой и посыпать обжаренным кунжутом.	Тёплый салат с фасолью и свининой	6	200	Салаты/Тёплый салат с фасолью и свининой/Тёплый салат с фасолью и свининойcce2b2c8-afc1-4f49-b413-2089d5e34f80.png
Лук мелко шинкуем, а картофель нарезаем кубиками.Нашинкованные овощи обжариваем на растительном масле в течении 10 минут. Не забываем хорошо посолить. Хорошо взбиваем яйца с молоком, добавляем соль, перец. Заливаем обжаренные овощи яичной смесью и готовим на медленном огне до полной готовности омлета. На поверхность омлета выкладываем сыр и даем ему время, чтобы он расплавился. Готовое блюдо украшаем свежей зеленью.	Омлет с картофелем и мягким сыром	2	206	Вторые блюда/Омлет с картофелем и мягким сыром/Омлет с картофелем и мягким сыром179181b8-560c-413a-9690-e2ba81886acc.png
Репчатый лук почистить, мелко порезать. Обжарить на растительном масле до золотистого цвета.\nКартофель отварить в мундире, остудить. Почистить и натереть на крупной терке.\nМорковь отварить, остудить. Почистить и натереть на крупной терке.\nВ миске соединить картофель, морковь и жареный лук. Посолить и поперчить по вкусу. Хорошо все перемешать до однородности. Картофельное тесто разделить на равные части (у меня получилось 10 шт. по 80 грамм).\nКукурузу откинуть на дуршлаг.\nИз каждой части формовать на ладошке лепешку. В середину положить по 1-2 чайной ложке кукурузы. Формовать котлетки любой формы.\nЗатем обвалять их в муке. Обжарить на растительном масле (на маленькой количестве) с обеих сторон до золотистого цвета.	Овощной бифштекс	2	199	Вторые блюда/Овощной бифштекс/Овощной бифштексf8d79e39-32ad-4c57-bebf-93cf67344a9a.png
Чеснок почистить и измельчить. Сливы (крупные синие) помыть, обсушить и удалить косточки. Выложить сливы в чашу блендера и измельчить. Выложить сливовое пюре в кастрюлю, добавить сахар, соль и карри. Перемешать. Довести до кипения и варить на небольшом огне 15 минут, постоянно помешивая. Аккуратно снимаем\nпену. Добавить чеснок. Варим еще 15 минут, помешивая. По желанию, можно добавить острый перчик, но мне\nхотелось именно сладкий соус. В подготовленные банки выложить горячий соус и стерилизовать 20 минут. У меня хватило на 2 банки по\n850 грамм. Потом закрываем крышками, переворачиваем, укутываем и даем остыть. После этого\nубираем на хранение в темное место.	Сладкий сливовый соус	7	204	Консервация/Сладкий сливовый соус/Сладкий сливовый соус9d194d8c-a92b-4bfe-ade2-44fa7ae61e7b.png
Смешать сахар, манку, ванилин, добавить сметану и растопленное масло, перемешать, добавить творог, перемешать, ввести яйца, взбить миксером.\nВыпекать в мультиварке в режиме "Выпечка" 90 минут или в духовке - быстрее. Дать остыть.	Творожная запеканка Нежная	3	202	Десерты/Творожная запеканка Нежная/Творожная запеканка Нежная9de0fcd8-9499-4c4a-980a-1b33d5713700.png
Подготовить продукты. Количество ингредиентов рассчитано на форму диаметром 25-26 см. Все продукты должны быть комнатной температуры. Сливочного масло (100 г в тесто) должно быть полностью мягким. Финики залить горячей водой минут на 5. Затем воду слить, снять с фиников тонкую пленку и вынуть косточки. Вес фиников без косточки должен быть 200-250 г.\nПодготовленные финики нарезать кусочками. Добавить соду. Яблоки очистить и нарезать небольшими кусочками.\n\nДобавить к финикам и залить 250 мл кипятка. Перемешать, накрыть крышкой и оставить на 10 минут. Тем временем размягченное сливочное масло хорошо перемешать с сахаром, взбить до гладкости. Добавить ванильный сахар или ванилин и яйцо. Для оттенка вкуса можно добавить щепотку соли. Перемешать.\n\nДобавить в смесь яблоки с финиками и водой, в которой их замачивали. В два приема просеять муку и перемешать. Тесто получится как густая сметана. Форму застелить пергаментом для выпечки и вылить в неё тесто. \nВыпекать пирог в разогретой до 160-170°С около 40 минут. Пирог должен подняться и подрумяниться.\n\nПока пирог выпекается, нужно приготовить заливку. Соединить в кастрюльке сахар и ст. л. молока, довести сахар до полного растворения, Добавить сливочное масло, Кокосовую стружку и молоко. Перемешать, довести до кипения и снять с огня. Готовый пирог вынуть из духовки.\n\nЛожкой полить заливкой. Жидкость почти сразу впитается, а кокосовую стружку надо равномерно распределить на поверхности пирога. Вернуть пирог на 15-20 минут в духовку.	Пирог дровосека	3	76	Десерты/Пирог дровосека/Пирог дровосека63592238-9f1a-4ea1-86eb-a0f0aa77e2d7.png
Рыбу выпотрошить и помыть, но не чистить чешую. Просушить. Сбрызнуть по всей чешуе лимонным соком и обильно смазать солью. Коптить 40 минут.	Копченая рыба	2	280	Вторые блюда/Копченая рыба/Копченая рыбаaf1681ca-6d5c-41b2-943f-3bf6f47ca3e6.JPG
Приготовим гренки: лучше использовать только мякоть белого хлеба. Нарезанный хлеб посыпать сухим чесноком, травами Прованса и сбрызнуть оливковым маслом. Сушить в духовке при 160 градусах, до золотистой корочки (примерно 30 минут). Можно просто поджарить на сковороде.\nЯйцо поместить в чашку и залить крутым кипятком, выдержать 1минуту, залить холодной водой. Вылить яйцо в блендер, чеснок, лисонный сок, масло, вустерский соус, анчоусы, немного пармезана, взбить до однородности.\nСалат нарвать руками. Полить частью заправки, перемешать. Выложить сухари. Выложить тёртый пармезан, залить оставшейся заправкой, украсить пармезановыми хлопьями.\nВ классическом салате помидоров черри нет, но с ними вкуснее.	Цезарь	6	196	Салаты/Цезарь/Цезарь8e49368a-3e1a-4b5d-b6db-6de5aa53f071.png
Мякоть тыквы нарезать кубиками, залить водой, чтоб чуть прикрывало, \nварить до разваривания, добавить натёртые на мелкой тёрке яблоки. \nВарить мин 10, добавить сахар и лимонный сок по вкусу. \nЗакатать, перевернуть, укрыть.	Яблочно-тыквенное пюре	7	101	Консервация/Яблочно-тыквенное пюре/Яблочно-тыквенное пюреc46abe00-f6f4-43b9-863f-8d54eb4ad65b.png
Миндаль залить кипятком, 10минут постоять, очистить от кожуры, просушить, измельчить в муку.\nДля сиропа 250г воды, 250г сахарной пудры (всыпать в воду и не мешать), добавить в конце лимонную кислоту чтобы сахар не кристаллизовался, сварить до 118 градусов до пробы на шарик(добавить лимонный сок, пудру в сиропе не перемешивать), влить сироп в муку, перемешать.\n\nНе размачивать сильно!!! Только чтобы снялась шкурочка. Если перемочены, то нужно чуть подсушить в духовке, чтоб при помоле мука была не с крупными фракциями. \n\n-------- Советы. \nЧтобы не был темным, после обдирки кожицы просушить (без духовки) и сразу готовить муку\nЧтобы марципан не был насыщенно сладким влить горячий сироп в муку\nГотовый марципан перемолоть в мясорубке чтоб держал форму\nЧтобы не рвался при раскачивании нужно выдержать 10минут при комнатной температуре\nКраситель добавить в половину куска, затем пермешать с неокрашенной частью.	Марципан	3	209	Десерты/Марципан/Марципанd86ff102-e63d-4607-a174-2a4e19bde2e8.png
Замочите желатин в холодной воде или сливках. Желатин подогрейте и растворите, налейте сливки в кастрюлю, добавьте ваниль и сахар. Доведите смесь до кипения и снимите с огня. Разлейте по формам.\nЕсли брать жирные сливки, панна котта получается приторной, посему их можно разбавлять молоком.\nК панна котте обычно подают фруктовый сироп или мусс из перетёртых фруктов с сахаром.	Панна котта	3	208	Десерты/Панна котта/Панна котта6ea89b71-344c-4d68-b8fa-5bd373a644db.png
Отварные сердечки нарезаем кольцами\nВарим морковь\nНа крупной терке натираем яйцо\nНарезаем огурец\nВыкладываем слоями:После каждого слоя смазуем майонезом 1-й слой сердечки2-й слой яйцо3-й слой морковь4-й слой сол.огурцы5-й слой грибы6-й слой на мелкой терке сыр\nГотовый салат ставим в холодильник на несколько часов чтобы пропитался\n\n\nСердечки куриные предварительно отвариваю в воде с солью до готовности. Остывшие сердца нарезаю кружочками и укладываю в салатницу первым слоем. Промазываю майонезом. Затем укладываю яйца, натертые на крупной терке и также сверху майонез. Дальше следует морковь, пассированная вместе с луком на масле растительном. Лучше морковь натереть на спецпальной терке, чтобы по виду она получилась как у корейцев. У меня есть для этого особая немецкая терка. Не забываем о майонезе. Огурчики маринованные нарезаю тонкими полосками и выкладываю четвертым слоем. Сверху майонез. Пятым слоем идут грибочки маринованные, мною мелко нарезанные. Снова майонез. И, наконец, последний слой, который состоит из крупно натертого сыра. Салат был очень необычный, но гости оставили только положительные отзывы. Так что, если и Вам хочется удивить гостей чем-то необычным, рекомендую этот салат!\n	Салат из куриных сердечек с грибами	6	210	Салаты/Салат из куриных сердечек с грибами/Салат из куриных сердечек с грибамиad13e959-bd2a-4d2e-aae4-7fd6da8a3d23.png
Сливочное масло должно быть сильно охлажденное.\nМуку с солью просеять горкой на стол или в чашу кухонного комбайна.\nДобавить сахар для сладкого варианта.\nСверху положить нарезанное кубиками охлажденное сливочное масло. Порубить муку со сливочным маслом в кухонном комбайне до состояния мелкой крошки. По одному добавлять желтки, каждый раз перемешивая тесто (вместо желтков можно добавить целое яйцо или холодную воду). Должна получиться густая, рассыпчатая смесь (однородности добиваться не нужно). Тесто при этом легко лепится.\nСовет. При необходимости, если тесто слишком рассыпчатое, - можно добавить немного сметаны или еще 1 желток.\n\nГотовое тесто собрать в шар, затем раскатать до толщины 5-6 мм между двумя слоями пергамента или двумя силиконовыми ковриками и убрать на 4-6 часов в холодильник.\n	Рубленое тесто для тарталеток	4	212	\N
Налив молоко, ставим кастрюлю на средний огонь, кладем масло. Когда нагреется, быстро помешивая венчиком, чтобы избежать комков, засыпаем муку. Работаем венчиком, пока смесь не закипит.\nСразу уводим огонь на минимальный и продолжаем движения венчика, пока жидкость не станет действительно однородной – еще 4-5 минут.\nЗасыпаем заранее натертый - очень мелко! - сыр, приправляем перцем и солью, мускатным орехом – и продолжаем смешивать до тех пор, пока расплавится сыр и соус станет полностью однородным, что займет еще примерно 5 минут.\nСырный соус обычно подается горячим. Остывая, он густеет.	Сырный соус	8	205	Соусы/Сырный соус/Сырный соус6b513e14-3f33-44c0-a939-3a3d91427c8f.png
Тесто достать из холодильника, немного раскатать и выложить дно и бока формы для пирога, сформировав бортики.\n\nЗастелить тесто кружком из пергамента и положить пару горстей сухой фасоли.\nФасоль равномерно распределить по дну формы - это позволит тесту, во время выпечки, не съезжать вниз по стенкам формы.\n\nПоставить форму с тестом в нагретую до ~190-200°С духовку и выпекать тестяную корочку ~10-12 минут, до полуготовности. \n\nЯгоду перебрать, вымыть и обсушить.\nПоловину ягод перемешать с 3 столовыми ложками сахара.\nНа дно выпеченной корочки выложить ягоду, смешанную с сахаром, сверху уложить оставшуюся ягоду и посыпать ягоды еще 1 столовой ложкой сахара.\n\nПриготовить сметанно-яичную заливку.\nВ миску положить яйца, сметану, сахар, ванильный сахар, добавить крахмал и хорошо размешать венчиком до получения однородной массы. Залить пирог сметанно-яичной заливкой.\n\nЗапекать в духовке ~15-20 минут при температуре ~180°С.\nПирог готов, когда он зарумянится, а начинка  дойдет до состояния суфле-желе, т.е. будет чуть трястись при покачивании формы. \nПосле выпечки пирог лучше остудить и охладить в холодильнике.	Песочный пирог с ягодами	3	213	Десерты/Песочный пирог с ягодами/Песочный пирог с ягодамиbc163567-44d8-4b59-94d1-f5c54064b7d4.png
Сделать зажарку из лука, помидоров и болгарского перца, залить взбитым яйцом, накрыть крышкой и тушить на медленном огне.	Омлет с помидором	2	217	Вторые блюда/Омлет с помидором/Омлет с помидоромc86c7efd-1038-44c6-a56f-63c6853ca04b.jpg
аджика бывает разная, например, с кабачками:     перец болгарский - 1,5кг\nперец жгучий - 3шт\nчеснок - 6шт\nпомидор - 2кг\nзелень - пучок\nкабачок 3кг\nсвекла 2шт\nсоль - 5ст.л.\n\nвсе на терке, варить 30мин, добавпит чеснок, проварить	Аджика	7	216	\N
(ингредиенты на 24 шт. длиной около 7 см)\nДля начала установим кулинарный мешок с насадкой в высокую кружку для удобства.\nРазделить яйца на белок и желток.\nЖелтки смешать венчиком с ванильным сахаром.\nБелки взбить в легкую пену. Добавить частями просеянную сахарную пудру и взбить до плотных устойчивых пиков.\nСмешать силиконовой лопаткой белки с желтками, до однородной консистенции.\nДобавить просеянную муку и вымесить однородное тесто.\nВыложить тесто в кулинарный мешок с насадкой (большое круглое отверстие).\nОтсадить на пергамент печенье длиной около 7 см, на расстоянии 2 см друг от друга. Посыпать сахарной пудрой.\nВыпекать печенье "Савоярди" в разогретой духовке при температуре 175 градусов, около 10-14 минут. Печенье должно быть светлого цвета, запекать до коричневой корочки не нужно.\nСнять печенье с пергамента и остудить на решетке. \nПеченье "Савоярди" готово! Подаем его к чашечке кофе или чая. Также можно приготовить любой десерт на ваше усмотрение.	Савоярди	3	219	\N
 В воду или бульон окунуть мелко нарезанный картофель. После 10 мин кипения добавить зажарку из лука, потёртой моркови, болгарского перца, помидора, зелени, проварить еще 5мин, затем добавить крапиву, порезанную и предварительно продержанную 3 мин в кипятке.                   	Суп с крапивой	1	2	Первые блюда/Суп с крапивой/Суп с крапивойbbb7949c-cd8e-41dd-99ff-3620174a6722.png
С головки чеснока снять верхний слой шелухи, при этом головку не разбирать на дольки, оставить целой. Чеснок поместить в вырезанный из фольги квадрат и полить 1 чайной ложкой оливкового или растительного масла. Завернуть чеснок в фольгу и запекать в нагретой до ~180°C духовке ~30-40 минут (изредка можно проверять готовность, возможно чеснок испечется раньше).\nИспеченный чеснок вынуть из духовки, фольгу развернуть, а чеснок остудить. У чеснока срезать ножом кончики и выдавить чесночную мякоть в миску.  Оставшуюся шелуху выбросить.\nПриготовить овощной бульон.\nПока запекается чеснок и варится бульон подготовить овощи.\nЛук очистить и нарезать полукольцами.\nКартофель вымыть, очистить, еще раз промыть и нарезать небольшими кубиками.\nВ кастрюлю (желательно с толстым дном), положить сливочное масло, и влить оливковое или растительное масло.\nВыложить лук, чуть посолить, поперчить, и обжарить до мягкости, периодически, помешивая. Добавить картофель, перемешать и влить горячий бульон. Суп довести до кипения, убавить огонь, и варить ~10-15 минут, пока картофель не станет мягким. Немного посолить и поперчить по вкусу.  Затем выложить в суп испеченную мякоть чеснока и перемешать.\nВлить в кастрюлю молоко и еще раз перемешать.  Суп перелить в блендер и пюрировать (легче всего превратить суп в пюре при помощи стержневого измельчителя прямо в кастрюле). Вернуть суп на огонь и снова довести до кипения, периодически, помешивая.\nВ суп влить сливки, перемешать, и немного прогреть, постоянно помешивая, но, не давая закипеть. Готовый суп, попробовать на вкус, и если нужно, добавить немного соли или перца.\nПодавать суп горячим или холодным, посыпав зеленью петрушки.	Чесночный суп-пюре	1	118	Первые блюда/Чесночный суп-пюре/Чесночный суп-пюре9a4d523c-540a-4612-bb4b-6bf847cfdac7.png
Каждое яйцо взбить и поджарить из него блинчик, остудить, нарезать соломкой. В готовый бульон из курицы или индюшатины добавить зажарку из моркови и лука, а также порезанные блинчики, зелень, проварить пару минут.	Суп с яичными блинчиками	1	173	Первые блюда/Суп с яичными блинчиками/Суп с яичными блинчиками0bb2fe18-1f6e-4ae5-8756-4f32d30146c5.png
Натереть на кpупной тёpке моpковку и положить её в мультиваpку потушиться до мягкости в оливковом масле. Почистить и наpезать каpтошку и покpошить адыгейский сыp. Минут чеpез 10 выключить pежим «Тушение» в мультиваpке, загpузить в неё каpтошку и сыp. Налить воды – так, чтобы вода покpывала все пpодукты полностью, добавить лавpушку с чёpным пеpцем и нажать на кнопку «Суп». Попозже, ещё чеpез 15 минут, положить в суп ещё и косичку (котоpый как pаз к тому моменту мелко наpезать) и капусту бpокколи. Этой капусте лучше слишком долго не ваpиться, а то будет не так вкусно.  Ещё можно помидоp туда добавить. Мелко поpезать и положить в суп зелень.	Вегетарианский сырный суп	1	137	Первые блюда/Вегетарианский сырный суп/Вегетарианский сырный суп1098c36f-f57b-4990-9d60-9c728800c3b7.png
Мясо режем средними кусочками. В чашу мультиварки вливаем растительное масло и включаем режим жарка, добавляем мясо и жарим 30мин. (если режима жарки нет, включаем режим выпечка).\nПока мясо жарится, режем лук полукольцами, морковь и сельдерей брусочками (или зелёную редьку). Через 30мин. добавляем к мясу лук, морковь и сельдерей. Перемешиваем. Затем  болгарский перец соломкой. Добавляем специи, солим, перчим. Перемешиваем. Затем добавляем томатную пасту (если густая, можно развести водой). Добавляем воды, в зависимости от желаемой густоты лагмана, но не выше метки на внутренней стороне чаши. Закрываем плотно крышку, выставляем режим тушение и тушим 1,5-2часа.\nПока всё тушится, отвариваем лагманную лапшу. В конце добавляем ее.	Лагман	1	104	Первые блюда/Лагман/Лагманcd07d9da-dc83-47fe-8a6a-442099dc3d6c.png
Взбить яйцо слегка блендером, погрузить блендер в яйцо и налить сверху подсолнечное масло, включить блендер, потихонечку поднимая-опуская его. Добиться белой массы, добавить сок лимона, соль, сахар. Еще раз взбить.	Майонез	8	157	Соусы/Майонез/Майонезa916021b-496d-4b80-a4c0-7e362d511fb5.png
Мясо нарезать кусками, посолить, сложить в кастрюлю, добавить специи.\nЗалить слегка водой, чтоб чуть покрывала мясо, поставить тушиться на \nмедленный огонь часа на 3. Остудить, сложить в банки, закрыть крышками. \nЧтобы дольше хранилась, необходимо, чтобы жир укупоривал мясо, поэтому воду \nне лить, в конце полить растопленным жиром.	Тушенка	7	100	Консервация/Тушенка/Тушенка337523bc-6101-4f86-bad2-995db05e3ed2.png
Черешню необходимо вымыть, удалить косточки. Если есть специальное приспособление, то им, если его нет, то лучше воспользоваться булавкой. В подходящую банку плотно укладываем черешню, желательно в стерилизованную банку, крышку также желательно простерилизовать.Воду нагреваем, добавляем в нее сахар и доводим до кипения. Заливаем черешню сахарным сиропом, закрываем крышкой, укладываем в одеяло на 3-4 часа, после чего достаем, даем остыть и убираем в темное место.	Коктейльная черешня	7	186	Консервация/Коктейльная черешня/Коктейльная черешня85042a95-9827-49c8-a333-09006bca2b59.png
Фрукты или ягоды очистить от косточек, если это возможно, \r\nили нарезать, засыпать сахаром по вкусу. Дать постоять 12 часов. \r\nПосле выделения сока поставить на плиту, довести до кипения и проварить \r\n7-10мин. Закатать. Другой способ - засыпать сахаром прямо в банках, затем их стерилизовать. \r\nЛибо же стерилизовать без сахара.        	Фрукты в собственном соку	7	62	Консервация/Фрукты в собственном соку/Фрукты в собственном соку1731b584-ebc1-4706-ac95-b90dc78c642e.png
Орехи измельчить, жирное сгущенное молоко размешать с орехами и какао-порошком по вкусу.	Nutella	5	112	Крема/Nutella/Nutellaaef37cb6-6ac4-4974-af45-0dccd89c8856.png
Яйца комнатной температуры разделить на белки и желтки. Желтки взбить добела. Белки взбить до устойчивых пиков, ввести размягченное масло, взбивая, затем сахар, ваниль и желтки. Можно отсаживать через кондитерский мешок.	Масляно-яичный крем	5	111	Крема/Масляно-яичный крем/Масляно-яичный кремaef90b99-921b-44dd-8491-bef23f9e4c4c.png
Фрукты или ягоды размолоть в блендере с сахаром, в меньшую часть массы размешать крахмал. Основную часть поставить на огонь, после закипания влить крахмал, регулярно помешивая.	Фруктовый мусс	5	18	Крема/Фруктовый мусс/Фруктовый муссb79ffd26-f408-46c0-bc54-83581f3f9bdc.png
Взбить 3 белка, можно добавить кристаллики соли или лимонной кислоты. Тем временем поставить вариться сироп из 200г сахара и 100г воды. Довести сироп до пробы на мокрый шарик, кипящим влить тоненькой струйкой во взбивающиеся белки, продолжать взбивать до полного остывания. Хранить не более 36 часов.	Белковый крем	5	24	Крема/Белковый крем/Белковый крем8a0b1e02-f571-4048-ace0-ffbc1a8ae20c.png
Яблоки очищаем от кожицы, удаляем семена и нарезаем на четвертинки. Добавляем воду, сахар и при необходимости лимонную кислоту.\n(Пропорция воды и яблок 1:1. Сахар - из расчета 1 столовая ложка на 150-200 грамм яблок в зависимости от того, насколько яблоки сладкие, полагайтесь на свой вкус.\n\nЛимонная кислота - в зависимости от того, насколько яблоки сами по себе кислые или нет, пробуйте, может кислоты и не потребуется.)\nСтавим на огонь доводим до кипения и ждем, пока яблоки разварятся. После закипания это займет примерно 5-10 минут в зависимости от сорта яблок.\nИз полученной массы при помощи блендера, миксера или сита делаем яблочное пюре.\n\nПо одной ложке, каждый раз перемешивая, добавляем манную крупу из расчета одна столовая ложка манки на 130 грамм яблок.\n\nСнова ставим на огонь и варим манную кашу. После закипания варим 3-4 минуты, периодически помешивая.\n\nДаем манной каше на яблочном пюре остыть до теплого и затем взбиваем миксером. Масса должна побелеть, увеличиться в объеме и полностью остыть. Чтобы этот процесс прошел быстрей, масса лучше взбивалась и была более воздушной, это нужно делать при быстром охлаждении. Для этого во время взбивания посуду с яблочным муссом можно поставить в бо́льшую посуду, налив туда холодной, ледяной воды.\n\nВ итоге получается воздушный яблочный мусс. Ставим его в холодильник на пару часов, он станет гуще и свежее.	Яблочный мусс	5	192	Крема/Яблочный мусс/Яблочный мусс29339058-8c3b-4a30-be3a-5b6e28529f85.png
Ингридиенты для одной галеты.\nНасыпать муку и соль в кухонный измельчитель, поставить в морозилку, масло порезать на кубики и отправить в морозилку, воду и венчик также поставить в морозилку.\nЗатем высыпать кубики масла в муку и измельчить в комбайне, добавить ледяную воду и продолжить измельчать - должно получиться тесто, собрать в комок, завернуть в пленку и поставить в холодильник на пол часа. Сформировать галету, выложить начинку. Выпекать при 170 градусах 20-15 минут.	Тесто для галеты	4	188	Тесто/Тесто для галеты/Тесто для галеты9fdb5eec-8225-42b4-9f66-55727c58b1c9.png
 В муку влить взбитое яйцо с водой, добавить соль, чуть вымешать, затем масло.\r\nВымесить. Поставить в холодильник на час.      	Тесто на вареники	4	10	Тесто/Тесто на вареники/Тесто на вареникиf841c4d6-9604-4319-82e7-d516d4376d2a.png
Яйца комнатной температуры взбить с сахаром и ванильным сахаром до белой пены. Добавить муку, слегка размешать. Выпечь около 35 минут. В мультиварке выпекать в режиме "духовка" с закрытой крышкой.	Бисквит	4	6	Тесто/Бисквит/Бисквитd1e0b84c-6311-42d9-88ed-b92d83f6cac7.png
 Поставить опару из молока, 3ст.л. муки, 1ст.л. сахара и дрожжей. Опара готова когда поднимется шапкой и опустится пузырями (мин 30).\r\nСоединить опару со сдобой (масло, яйца, сахар), добавить соль, ванильный сахар, муку. \r\nДля замеса использовать растительное масло. 1-2 часа отстаивать тесто.\r\nПирожки выпекать при 180 град около 25 мин, рулеты около 40мин.         	Сдобное дрожжевое тесто 1	4	8	Тесто/Сдобное дрожжевое тесто 1/Сдобное дрожжевое тесто 178f5bdde-6999-4d0f-acd7-da46d1d0bdf7.png
1. В небольшую миску сложите помидоры, лук, чеснок, базилик, орегано, соль и перец. Тщательно перемешайте накройте крышкой и поставьте в холодильник.\n    2. Разогрейте духовку до 190 С.\n    3. Нарежьте французский батон на 12 ломтиков по диагонали. Выложите хлеб на противень и поджарьте в духовке 5 минут, или пока не подрумянится. Убавьте температуру в духовке до 120 С.\n    4. Ложкой выложите равное количество томатной смеси на ломтики поджаренного хлеба. Сверху выложите тонкие ломтики сыра Моцарелла. Поставьте противень с хлебом обратно в духовку до тех пор, пока сыр немного не расплавится и не станет сочиться по помидорам, примерно на 2 минуты. Сразу подавайте.	Брускетта	2	218	Вторые блюда/Брускетта/Брускетта03414780-93cb-4c36-8579-b6b21b8fd49d.jpg
Замесить тесто. Для сладких пирожков можно добавить сахар в тесто. \nНачинка любая не текучая.\nВыпекать при температуре 130 градусов.	Пирожки с начинкой	3	80	Десерты/Пирожки с начинкой/Пирожки с начинкойab5c726f-56dd-4b4d-bab4-a2f257e14453.png
Соединить миндаль рубленый, 6ст. л сахара, сливочное масло, взбитое яйцо, ром, \nмуку (по рецепту - фото слева или сколько влезет - справа), стружку кокоса, 2 желтка и остальной сахар, \nвсе взбить, обвалять в стружке, выпечь.	Пирожное кокосовое	3	81	Десерты/Пирожное кокосовое/Пирожное кокосовоеac750f46-6e93-4ae5-8747-179dd58e6834.png
Шоколад и масло растопить на водяной бане.\nСухие ингредиенты смешать и просеять.\nМиксером взбить яйца с сахаром (100г) до состояния густого крема (взбивать 6-8 мин.).\nНе прекращая взбивать ввести шоколадную массу.\nВвести в тесто сухие ингредиенты, не переставая взбивать на маленьких оборотах.\nВ отдельной миске взбить яйцо, 30г сахара, ванильный сахар и маскарпоне.\nФорму 18-20 см в диаметре застелить пергаментом. Выложить в форму половину шоколадного теста, затем начинку из маскарпоне и вторую половину шоколадного теста. Деревянной шпажкой слегка перемешать слои. Выпекать в предварительно разогретой до 180 град. духовке 40 мин. до сухой спички.\nМожно віпекать в мультиварке в режиме "Выпечка" 45 мин. \nПирог очень хорошо поднялся, но после того, как я достала его из мультиварки, он немного опал.	Шоколадный пирог с маскарпоне	3	130	Десерты/Шоколадный пирог с маскарпоне/Шоколадный пирог с маскарпонеe29ee5c3-3b79-4d60-97cd-baef61fc6fdf.png
Манку засыпать в молоко и оставить на 30 минут для набухания. Белки и желтки отдельно взбить с частями сахара. Творог перетереть. Всё смешать и взбить миксером. Смесь вылить в чашу и поставить на режим "выпечка" на 1 час.\nЕсли ложатся ягоды или изюм, лучше всего бросить их спустя 15-20минут после начала выпечки.        \nМожно запечь в духовке без молока и разрыхлителя, например, с изюмом около 40минут.	Запеканка в мультиварке	3	109	Десерты/Запеканка в мультиварке/Запеканка в мультиварке96a14fae-52b0-41f7-8012-6efb71ef3a89.png
Лук, баклажан, помидор колечками протушить отдельно или вместе. \nКартофель отварить и порезать кругами.\nВсе уложить слоями, присыпать сыром и зеленью, запечь 20-30 мин.   \nМожно также запекать в мультиварке в режиме "выпечка" в течение 1 часа, выложив все сырые ингридиенты слоями.	Баклажаны, запеченные с овощами	2	52	Вторые блюда/Баклажаны, запеченные с овощами/Баклажаны, запеченные с овощамиa874e2c6-176f-47d3-b48f-6138fa0e06d3.JPG
Нектарины нарезать на дольки и замариновать с сахаром на 1 час. Масло взбить миксером, постепенно добавляя сахар, до белой пены. Не переставая взбивать ввести по одному яйца и ваниль. Бить минут 7-8 до однородной и гладкой массы. Добавить муку, просеянную вместе с разрыхлителем, перемешать лопаткой. Поместить тесто в чашу мультиварки и выстелить нектарины, слегка их вдавливая. Сверху полить выделившимся после маринования соком. Выпекать в режиме "выпечка" 50минут.	Пирог с нектаринами	3	129	Десерты/Пирог с нектаринами/Пирог с нектаринамиb6490ebe-c5e6-4786-91ab-c648dd6d348f.png
Испечь бисквит (на 4 яйца), оставить на день отстаиваться. Срезать крышку, в основании выдолбить середину в форме шкатулки. Бисквитную мякоть сложить в тарелку. Пропитать коржи сиропом из сахара и воды, доведенных до кипения и после остывания добавленным  коньяком. Часть сиропа пустить на мякоть в тарелке. Затем промазать кремом из взбитого масла и сгущёнки. Выложить на дно шкатулки порезанные кольцами бананы, сбрызнуть их лимонным соком чтоб не темнели. На бананы выложить шарики, сформирванные из бисквитной мякоти с кремом и сиропом, обвалянные в кокосовой стружке, тёртом шоколаде, орехах. Накрыть крышкой, украсить.	Шкатулка	3	121	Десерты/Шкатулка/Шкатулка23b58add-f947-4ce4-8f98-60f8190e4b0a.png
Тесто из 1ст. сметаны, сгущёнки, яиц, 1ст. сахара, муки и соды замесить, разделить на 2 части, в меньшую добавить 5ст.л. какао, выпечь. \nНа шоколадный корж уложить белый, порванный на куски и обмоченный в креме из взбитых 2ст. сметаны и 4ст.л. сахара. \nВсё намазать после взбитыми сливками с сахаром (4ст.л.). Взбивать сливки только на диком холоде. Для лучшего эффекта можно в сливки добавить несколько ложек молока.\nСверху полить шоколадной глазурью.	Графские развалины	3	64	Десерты/Графские развалины/Графские развалиныaaec49d6-9a88-4e71-9cf7-6a9ff6582769.png
Взбить масло с 3/4 ст. сахара. По одному добавить яйца, соль. Взбить еще раз. Ложкой вмешать муку, перемешанную с разрыхлителем. Не до фанатизма! Как видите, тесто довольно густое. На этом этапе включаем духовку на 175-180 градусов. Форму смазать маслом, присыпать мукой, выложить тесто, разровнять. У меня форма диаметром 24 см. Сливы разделить на половинки. Сверху, не вдавливая, разложить половинки слив. Смешать 2 ст. л. сахара с 1 ч.л. корицы. И присыпать коричным сахаром сливы. Ставим в хорошо разогретую духовку и выпекаем 40-45 минут до хрустящей корочки.	Сливовый пирог из New York Times	3	135	Десерты/Сливовый пирог из New York Times/Сливовый пирог из New York Times50c674f6-1e03-4b5b-9491-37058ed6b24c.png
Растопить масло.\n4 яйца разделить на белки и желтки, одно яйцо целиком разбить в желтки. Желтки взбить с сахаром и ванилином. Добавить к желткам растопленное масло и снова взбить. Постепенно вводить муку, взбивая. Добавить теплое молоко, хорошо размешать. Белки хорошо взбить в стойкую пену, до устойчивых пиков. Добавить белки к тесту, аккуратно венчиком перемешать. Да, будет жидко, не пугайтесь. Форму смазать растительным маслом, вылить в нее тесто.\nВыпекать в разогретой духовке при 180 градусах 40-45 минут. Покрыть шоколадной глазурью при желании.\nРазрезать готовый пирог на пирожные.  \n\nПо вкусу напоминает яичній омлет с сахаром.	Умное пирожное	3	183	Десерты/Умное пирожное/Умное пирожное849c2840-5111-4e5e-9252-99b0ba350154.png
Взбить яйца с сахаpным песком до появления пузыpиков. Масло pастопить до жидкого состояния. Влить pастопленное масло к взбитым яйцам. Пеpемешать до одноpодной консистенции. Добавить какао.  Муку смешать с pазpыхлителем и пpосеять в чашу, пеpемешать и замесить тесто. Тесто для пиpога получается густым. Смазать маслом дно и бока чаши мультиварки. Выложить большую часть теста в чашу. Твоpог смешать с сахаpом. Выложить твоpожную начинку повеpх теста, затем остатки теста. Выбрать pежим «выпечка» и поставить вpемя пpиготовления 50 минут.	Шоколадно-твоpожный пиpог	3	145	Десерты/Шоколадно-твоpожный пиpог/Шоколадно-твоpожный пиpог0a5ad6c3-6f86-4926-b6ea-f9756c99b699.png
Масло и сахар взбить до рыхлой смеси. Ввести в смесь яйца,молоко,лимонный сок, муку с разрыхлителем. Смазать форму маслом и присыпать мукой или крошками.\nВыложить смесь в смазанную маслом и посыпанную мукой форму. На тесто положить очищенные от косточек черешни. Сверху посыпать рассыпчатой смесью, приготовленной из муки (40 г), сахара (20 г), корицы и разогретого масла (20 г). Выпекать на умеренно сильном жару (180 гр 45 минут).	Кекс с черешней	3	120	Десерты/Кекс с черешней/Кекс с черешней59e13dbe-7b91-47df-8f68-c3a6214837c5.png
Взбить яйца. Растереть добела масло. Натереть цедру лимона. В масло добавить взбитые яйца, сахар, сок и цедру лимона, муку. Хорошо перемешать. Противень застелить бумагой и смазать маслом.\nВключить духовку.\nРавномерно выложить тесто на противень, покрытый смазанной маслом бумагой. Слой теста должен быть 0,5 см. Выпекать в разогретой духовке до полуготовности (7 минут при температуре 180 градусов).\nРазрезать на прямоугольные кусочки и допечь печенье на скорую руку (еще 7-10 минут). Покрыть глазурью, если надо.	Печенье лимонное	3	86	Десерты/Печенье лимонное/Печенье лимонноеd3d710ae-6539-4552-87f2-bb37fc10d4b7.png
Отложить немного кокосовой стружки для обсыпки конфет, остальное смешать со сгущёнкой и размягчённым маслом, поставить в холодильник для застывания. Затем обернуть миндаль в шарики из массы, обвалять в стружке.	Конфеты Raffaello	3	43	Десерты/Конфеты Raffaello/Конфеты Raffaellobf08e929-bdd1-42cf-82a7-e838c1d7f1c4.png
Размять творог в посудине, добавить яйца и перемешать. Добавить манную крупу, сахар, соль, ваниль, разрыхлитель и хорошенько размешать. Досыпьте ягоды, аккуратно перемешав их с тестом.\nВыложить творожную смесь ложкой, смоченной водой, в формы для маффинов. Если формочки не силиконовые, смажьте их маслом. Формы наполняйте не полные, так как сырники немного поднимутся при выпекании.            Можно манку заменить мукой и выпекать без форм.\nВыпекать сырники 30 минут в духовке, разогретой до 170 градусов.	Сырники	3	132	Десерты/Сырники/Сырники4fc95546-7791-4cb3-8af7-37870e7ec874.png
Крем делается в три этапа. Сначала желатин залить теплой водой. \nЖелтки отделить от белков (белки пока убрать в холодильник).  В небольшой кастрюльке взбить желтки с 1 стаканом сахара до пышной белой массы. Влить молоко, всыпать муку и перемешать.\nПоместить кастрюльку на водяную баню и, помешивая, довести крем до появления пузырей. Он сильно увеличится в объеме.\nПо сути, мы с вами сварили заварной крем. Массу остудить, изредка перемешивая, чтобы не образовалась пленочка. Затем масло, размягченное до комнатной температуры, взбить, постепенно, по ложке, добавляя заварной крем. Для этого потребуется еще одна кастрюлька, немного больше первой. Добавить ванильный сахар или ванилин и перемешать. Теперь набухший к этому времени желатин довести до полного растворения и, если это необходимо, процедить.\nХорошо остывшие к этому времени белки поместить в третью кастрюлю. Она должна быть еще больше, литра на 2,5. Взбить белки со вторым стаканом сахара до крепких пиков. Влить растворенный желатин и хорошо перемешать.\nИ последнее - соединить вместе белковый и масляный кремы, причем масляный по частям добавляем в белковый, каждый раз тщательно взбивая до однородности. \n\tСобирать торт. Бисквит разрезать на две части. Вокруг нижнего коржа установить кольцо. Выложить крем, разровнять и накрыть вторым коржом. Слегка прижать. Убрать в холодильник до полного застывания, лучше всего на ночь. \nКогда торт полностью застынет, кольцо убрать и покрыть торт шоколадной глазурью.	Птичье молоко	3	142	Десерты/Птичье молоко/Птичье молоко4858f45a-ec28-466d-9680-66d58d9ea33a.png
Приготовим продукты для суфле "Птичье молоко" - белки нужны охлажденные, остальные продукты - комнатной температуры (масло должно быть очень мягким - это важно!! - иначе расслоится). Сначала замочим желатин в воде с половиной лимонной кислоты и с сахаром. (Время, на которое нужно замачивать, посмотрите на пачке вашего желатина, оно может различаться у разных производителей.) Масло комнатной температуры и сгущенное молоко взбить миксером. Получившийся масляно-сгущеночный крем отставим в сторону. \nБелки взбить миксером до устойчивых пиков. Посуда и венчики миксера должны быть идеально чистыми, без каких-либо следов жира (т.к. жир препятствует взбиванию белков), в белках не должно быть даже маленьких частиц желтка. Правильно взбитые белки очень важны для успешного приготовления "Птичьего молока". Белки взбиваем на высокой скорости до устойчивых пиков, в процессе взбивания прибавляем оставшуюся лимонную кислоту.\nУстойчивые пики - это значит, что взбитые белки не вываливаются из перевернутой вверх дном миски. :) Посмотрите - на фото я держу миску вверх дном, и белки остаются в посуде.\n\nВернемся к желатиновой массе - желатин нужно растворить или на водяной бане, или в микроволновке. Я растапливаю желатин в микроволновке, прогревая понемногу и помешивая периодически. Желатин и сахар должны полностью раствориться, должны появиться вот такие пузырики, но масса не должна закипеть! Это важно, не позволяйте желатину закипеть!\nВо взбитые белки, непрерывно помешивая, вливаем струйкой горячую желатиновую массу - от горячего желатиново-сахарного сиропа белки завариваются и сильно увеличиваются в объеме.\nПродолжаем взбивать еще 5-10 мин., пока масса не остынет до комнатной температуры.\n\nВ белково-желатиновый крем аккуратно, по одной ложке вводим масляно-сгущеночный крем. От масла со сгущенкой смесь немного осядет, но все равно останется воздушной.	Птичье молоко (вариант 2)	3	198	Десерты/Птичье молоко (вариант 2)/Птичье молоко (вариант 2)782751eb-545f-44e0-8cb5-e6d8485fd250.png
Растопить масло. Когда масло растает, добавить какао, сахар и молоко. Размешать и продолжать готовить с открытой крышкой, пока не начнет закипать. Помешивать время от времени. Когда закипит, выключить, остудить. Отлить 1/3 стакана для украшения верха (это будет глазурь).\nВ теплую массу вбить венчиком яйца по одному. Затем добавить муку с содой, все хорошо перемешать. Можно добавить рубленые орешки.\nПоставить мультиварку в режим Выпечка на 55 минут.\nОстудить слегка, верх смазать глазурью, посыпать рублеными орешками.	Кекс шоколадный	3	151	Десерты/Кекс шоколадный/Кекс шоколадный7651911e-0cd9-44e6-b989-d089e97068e3.png
Лучше, если все ингредиенты для брауни будут комнатной температуры. Масло растереть с сахаром до пышного состояния. По одному ввести яйца, каждый раз взбивая массу до однородности. Смешать сухие ингредиенты. Просеять постепенно сухие ингредиенты в масляно-яичную смесь. Получается кремообразное тесто. Разогреваем духовку до 175-180 градусов. \nВыкладываем тесто в подготовленную форму (у меня форма диаметром около 20 см), разравниваем лопаткой. И ставим брауни выпекаться в разогретую духовку при температуре 175-180 градусов на 20-35 минут. \nГотовность брауни проверяем деревянной шпажкой - готовый брауни внутри чуть влажный, не стоит его пересушивать. \nВыключаем духовку, приоткрываем дверцу и оставляем готовый брауни до полного остывания.	Брауни	3	108	Десерты/Брауни/Брауниa42797e4-3d49-44d1-9a35-09af0c5ee114.png
Хорошо смешиваем все ингредиенты которые мы подготовили для теста (кроме консервированных слив) до консистенции густой сметаны. Затем берем противень или форму для выпечки, смазываем ее маргарином и заполняем тестом. Сверху как вам понравится выкладываем фрукты из банки. Сливы можно предварительно порезать на 2 половинки и вынуть из них косточки (если они есть). Ставим в духовку прогретую до 180 градусов и запекаем около 20 минут. В ковшике разводим 0,5 стакана сахара со сливками и греем его на несильном огне до полного растворения. Вынимаем готовый пирог из духовки, заливаем сладким сиропом и возвращаем его в духовку ещё на 10 минут. После этого выключаем духовку, приоткрываем и ждем ещё 5 минуток. Пирог готов.	Пирог с консервированными сливами	3	122	Десерты/Пирог с консервированными сливами/Пирог с консервированными сливами7b372b2b-d3e8-4aa9-962a-32f0bade380e.png
Готовый бисквит достаем и дадим ему остыть в форме . Затем достаем из формы и дадим ему постоять сутки. Это обязательное услобие. Тогда бисквит будет легче резать и пропитывать.\n\nНа следующий день разрезаем его на 3 части. Пропитываем пропиткой. Для этого смешаем кипяченую воду с сгущенкой.\n\nДля крема берем маскарпоне и сгущенку. Взбиваем хорошо миксером. Кладем на корж крем. Накрываем другим и т.д. Можно на крем выложить орехи или перемолотые конфеты Рафаэлло. Немного крема оставим для украшения. Готовый торт кладем пока в холодильник.\n\nДелаем глазурь.Подготовим шоколад и сливки.\nПодогреем сливки. И выливаем их на шоколад. Если надо то ставим еще в микроволновку. До полного растворения шоколада. Размешаем все.Дадим слегка остыть глазури.\n\nПоливаем глазурью торт. И сверху посыпаем кокосовой стружкой.\nВыдавливаем крем на верх торта и кладем конфеты. Ставим для пропитки на 5 часов в холод.\n	Торт Рафаэлло с маскарпоне	3	193	Десерты/Торт Рафаэлло с маскарпоне/Торт Рафаэлло с маскарпоне1e077042-7f3a-42a7-830e-4620ad6b9dd5.png
Смешать муку, 70г сахара, разрыхлитель. 2 яйца слегка взбить вилкой и влить в смесь муки с сахаром. Теперь вливаем молоко. Размешиваем. Затем в тесто влить растительное масло и коньяк, если желаете. Хорошенько взбиваем до пузырьков. Приступаем к чистке яблок. Снять с них кожуру и убрать семечки. Нарезать тонкими пластинками, это обязательно, иначе не получится нужная нам текстура теста. Кладем яблоки в тесто. Посмотрите, какое тесто должно быть, его почти и не видно, оно впитано яблоками. Так и должно быть. \tФорму смазать маслом, вылить в нее тесто. \nИ выпекать в разогретой духовке 25-30 мин. при температуре 200 град. Пирог готов, когда наощупь он достаточно твердый. В это время готовим будущую корочку: взбить в белую пену яйцо с сахаром. Добавить растопленное сливочное масло и еще раз взбить. И залить этой смесью еще горячий пирог. Сверху посыпать пластинками миндаля и 1 ст. л. сахара. И поставить еще на 10-15 мин. в духовку при температуре 200 град. до золотистой корочки.	Яблочный пирог с корочкой	3	176	Десерты/Яблочный пирог с корочкой/Яблочный пирог с корочкой041d1109-c742-462b-b3e7-9a2695172b3d.png
Сначала испечь песочную заготовку из вашего любимого песочного теста. Лучше испечь ее до полуготовности. Я испекла полностью и, в результате (на выходе), основа получилась пересушенной. Можно использовать и привычный вариант основы для чизкейка: молотое печенье с маслом или молоком.\nВзбить сливочный сыр (автор предлагает Рикотту, я же приготовила сыр сама), желтки, сливки, сахар ( я положила немного меньше сахара, чем указано и добавила щепотку соли), ванильный экстракт и крахмал. Взбивать до тех пор, пока масса не станет нежной и однородной.\nБелки взбить до крепких пиков. Можно соль не класть в основную массу и взбить белки с щепоткой соли, можно разделить норму сахара и половинку оставить на белки, а можно взбивать белки без всяких "добавок"\nБелки аккуратно вмешать в творожную массу в три приема. Стараться долго не перемешивать, чтобы масса оставалась нежной и воздушной.\nВ форму диаметром 18 см. уложить песочную основу (у меня разъемное кольцо, которое я установила на диаметр 20 см, т. к готовила из 400 грамм сыра) и вылить творожную массу. Внимание, если у вас, как у меня, кольцо, то его нужно установить на бумагу для выпечки и приподнять ее края, окутав форму, обвязать, чтобы начинка не вытекла!!!\nВыложить равномерно любимые ягоды.\nВыпекать при 160 градусах около 40 минут. У меня десерт поднялся при выпечке очень высоко, хотя бортики кольца 8,5 см высотой, норовил перевалиться через край. Это стоит учитывать, если будете готовить удвоенную порцию!!!\n\nУ меня было сырое!!!	Воздушный творожный пирог	3	211	Десерты/Воздушный творожный пирог/Воздушный творожный пирогda52dbf6-fd12-4cb1-b373-298fc771f129.png
Крекер, кубики желе, порезанные фрукты, залить смесью из сметаны и\n40г желатина (распустить сначала в соке). Дать застыть.\nПеревернуть посуду, высвободив застывшую массу.\nПомадка из какао, сахара, ванилина, 1ст. л. желатина, масла.  Застывает очень быстро.\nНаносить как подостынет. На ночь в холодильник. \n1пачка желе заменяется 400мл сладкой жидкости и 25г желатина. На чашку 2,5л нужно 1л йогуртовой массы на 150г крекера, 2 банана и 1 апельсин.	Землетрясение	3	93	Десерты/Землетрясение/Землетрясение61cd49ac-82e3-470d-84ab-6a44221a4d2e.JPG
Замесить песочное пластичное тесто.\nВ это время в чашу блендера сложить творог, сметану, сахар, яйца, картофельный крахмал.\nВзбить блендером творожную массу до однородности.\nБумагу для выпечки расстелить на столе и отрезать 2 длинные полосы, шириной примерно 10 см. Выкложить их в чашу мультиварки крест на крест.\nКогда тесто охладится, вынуть его из холодильника, покласть в форму, разровнять, сделать бортики.\nВлить начинку, разравнивая слегка ложкой. Украсить фруктами.\nМультиварку включить в режим Выпечка, время приготовления 1 час 30 минут. За это время верх пирога должен «схватиться», но все равно подрагивать при постукивании.\nКогда пирог готов, дать ему остыть. Только после этого вынять пирог из чаши, потянув за все 4 края бумаги.                 Можно приготовить такой пирог с фруктовым муссом, залив сверху творожный слой слоем мусса.                Если выпекать в духовке, то при 180 градусах 50минут.	Творожный пирог	3	143	Десерты/Творожный пирог/Творожный пирог49b775c3-b383-4751-b7dc-5586795fc2fa.png
Подготовить ингредиенты для салата: куриное мясо нарезать кубиком, поперчить, посолить, обжарить на подсолнечном масле.\nКартофель сварить, потереть на крупной терке.\nСоленые огурцы. Сварить морковь, потереть на крупной терке.\nЯйца сварить, почистить, отдельно потереть белки на среднюю терку, отдельно - желтки.\nМайонез, сливочное масло, соль.\nКартофель сварить, почистить. Натереть на крупной терке. Уложить в форме петуха. Посолить. Смазать майонезом.\nМясо порезать кубиком, посолить, поперчить, обжарить на подсолнечном масле.\nСоленые огурцы порезать на крупную терку, уложить слоем.\nСварить морковь, очистить, потереть на крупную терку, уложить слоем. Смазать майонезом.\nСварить яйца. Белок потереть на средней терке, желток - отдельно. Засыпать желтком "голову и крыло". Белком "туловище".\nУКРАСИТЬ перцем	Жареный петушок	6	201	Салаты/Жареный петушок/Жареный петушокd2902eba-1cd0-4b2d-adf7-096648d1604c.png
Чистим кальмаров и 20 минут отвариваем их в кипящей подсоленной воде. вынимаем и нарезаем полосками. Разогреть в сковороде масло и обжарить кальмаров на медленном огне, предварительно посолив и поперчив. \nКреветки обжариваем в другой кастрюле или сковороде с высокими стенками. Огурцы и помидоры режем на полоски.\nДля соуса нужно смешать оливковое масло, лимонный сок, измельченный чеснок, соль и перец. Все это очень хорошо перемешиваем - масло плохо смешивается с лимонным соком.\nВ блюдо, на листья салата выкладываем кальмаров и креветок, посыпаем сверху резаными овощами, вокруг раскладываем корнишоны целиком. Все это заливаем соусом. И сверху посыпаем резаной петрушкой.	Салат с креветками и кальмарами	6	207	Салаты/Салат с креветками и кальмарами/Салат с креветками и кальмарами92bd6773-3dff-47d2-a29e-aace09ed3659.png
 Баклажаны порезать кубиками, обжарить, долить воды чуть, протушить, \r\nдобавить зелень. Остудить, смешать с потёртым твёрдым сыром, яйцом, \r\nбатоном, замоченном в молоке, чесноком. Фарш вымешать. \r\nЕсли получился жидкий - добавить сухарей или муки. Можно добавить \r\nподсолнечного масла, чтоб не пригорали. Взять кусочек сулугуни, \r\nнакатать на него фарш, обвалять в муке или сухарях, обжарить.           	Котлеты из баклажан	2	51	Вторые блюда/Котлеты из баклажан/Котлеты из баклажанd8ac5f87-a56d-43c3-8b79-f1253c877884.png
Сначала приготовим соус. Пока мы будем готовить креветки, он как раз остынет. Сливки немного нагреем в кастрюле и добавим тёртый сыр.\nВарим на медленном огне до расплавления сыра. Снимаем с огня. Добавляем сок половины лимона, чеснок через пресс, солим и перчим по вкусу.\nКиноа хорошо промыть. Для этого рецепта я использовала киноа ТМ Мистраль.И залить водой (1:2), после кипения посолить, накрыть крышкой, уменьшить огонь и варить около 20 минут. Отварить креветки в подсоленной воде. (7-10 минут). Креветки почистить. Приготовить муку. Отдельно в миске взбить вилкой яйцо. Киноа разрыхлить вилкой, чтобы она стала более рассыпчатой. Противень смазать маслом. Сначала каждую креветку обваливаем в муке. Я для удобства взяла деревянную шпажку. Затем в яйце. Затем в киноа и выкладываем на противень.\nДуховку разогеть до 250 градусов и запекать креветки около 10 минут. Достаём наши креветочки.\n\nПодаём с соусом и ломтиками лимона.	Креветки в панировке из киноа	2	197	Вторые блюда/Креветки в панировке из киноа/Креветки в панировке из киноа751ce91e-8dd3-46e3-b141-5e3b5ecf3a05.png
Почистить и порезать полукольцами лук. Мясо порезать небольшими кусочками, уложить в горшочки. Мясо хорошо посолить, поперчить. Затем в горшочки уложить порезанный лук. На крупной терке натереть морковь и уложить поверх лука в горшочки. Картофель почистить, нарезать кубиками и уложить в горшочки, посолить и хорошо поперчить. Сыр натереть на терке с крупными делениями и уложить поверх картофеля.\r\nСмазать майонезом и отправить в духовку на 1 час, духовку разогреть до 200 градусов. Картофель можно пробовать на готовность, когда он стал мягким, значит все готово. \r\n	Мясо в горшочках	2	58	Вторые блюда/Мясо в горшочках/Мясо в горшочках32954e0f-9475-4c56-b781-b0b393a7c1c2.png
Жидкости (разбавленный мацони, кефир, простокваша, молоко, вода) должно быть в четыре раза меньше, чем муки. Т. е. на 1,5 стакана (300 мл) жидкости берем 6 ст. муки. На это количество берем 6 ст. л. сливочного масла, 1 ч. л. соли, 3 ч. л. сахара и 10 г сухих дрожжей. \nЕсли готовим тесто в хлебопечи, то закладываем продукты согласно инструкции. В моей хлебопечи сначала наливаем жидкость, добавляем соль и сахар. Масло сливочное режем хлопьями и добавляем, потом мука и дрожжи. Ставим программу "Дрожжевое тесто". Если готовим вручную - соединяем все ингредиенты, замешиваем и оставляем подходить примерно на час. Тесто выходит "жирным" на ощупь и пупырчатым.      Для начинки пропорции следующие: 1 часть сулугуни, 1 часть брынзы и 2 части - вареные яйца. Сыры трем на крупной терке. Примерно 50 г откладываем в сторону. Три отваренных яйца чистим и мелко рубим. Яйца смешиваем с сырами (напомню, часть смеси сыров откладываем в сторону). Смесь яиц и сыров делим на 4 части и скатываем каждую в шарик.      Тесто делим на 4 части. Раскатываем овалом толщиной около 7 мм. С двух бОльших сторон овала насыпаем отложенный ранее сыр. Заворачиваем края так, чтобы сыр оказался внутри в бортиках. Хорошо "заклеиваем" (если так можно выразится) края теста, так, чтобы сыр остался в бортиках в процессе выпечки.\nФормируем "лодочку", делая довольно длинную "корму" с двух сторон. Позднее расскажу для чего эти края нужны. Выкладываем начинку. В начинке сделать углубление. Оно должно быть достаточно широким, чтобы туда поместилось яйцо и не вытекло. ОБЯЗАТЕЛЬНО перед отправкой в духовку дайте лодочкам расстояться минут 15. Отправляем в разогретую до 220-250 градусов духовку на 10-15 минут.\nТеперь в каждое углубление аккуратно выливаем по одному яйцу. Отправляем в духовку еще на 5-7 минут - до момента когда "схватится" белок. Вынимаем наши хачапури, кладем на каждый по кусочку сливочного масла, присыпаем зеленью. И немедленно подаем на стол.	Хачапури по-аджарски	2	71	Вторые блюда/Хачапури по-аджарски/Хачапури по-аджарски17651494-ebff-42a9-9804-3d12566b2d3c.png
Для начала очищаем картофель, промываем его под холодной водой и нарезаем на пластинки. Свинину промываем под водой и высушиваем при помощи бумажной салфетки. Затем нарезаем на порционные куски шириной примерно 1 сантиметр и хорошенько отбиваем их. Репчатый лук чистим и нарезаем полукольцами или кольцами, сыр трем на крупной терке. Теперь берем форму для запекания и начинаем выкладывать слои, первым идет картофель, его необходимо немного посолить и поперчить. Затем выкладываем отбитое мясо, его так посыпаем солью и черным молотым перцем. Теперь выкладываем нарезанный лук. Далее смазываем верхний слой майонезом так, что не оставалось непокрытых участков, и посыпаем тертым сыром. Отправляем форму в разогретую до 180 градусов духовку и запекаем в течение 40-50 минут.	Мясо по-французски	2	60	Вторые блюда/Мясо по-французски/Мясо по-французскиd7e085f1-8017-4b77-9b8a-c30674cd57f6.png
Разогреть духовку до 220 C. Противень смазать или выложить бумагой для выпечки. Филе порезать на кусочки по 3 см.\nВ миске взбить яйца, соль и воду, смешать с курицей.\nВ миске или кастрюле с крышкой смешать специи, панировочные сухари, муку, молотый перец. Добавить растительное масло и растереть все вместе вилкой. Добавить куриные кусочки, закрыть и хорошо потрясти, чтобы мясо покрылось этой смесью со всех сторон.\nВыложить на подготовленный противень и запекать 7-10 минут в разогретой до 220 С духовке; затем перевернуть и запекать еще 5 минут.	Индюшиные наггетсы	2	169	Вторые блюда/Индюшиные наггетсы/Индюшиные наггетсы5eded74b-d204-4f42-9c55-d6cdaa3e6ffe.png
Фарш и крупные луковицы перекрутить, мякиш замочить в воде, добавить перец, \nсоль, яичные желтки. Фарш вымешать бросками, запанировать в сухарях, обжарить по 5 мин с каждой стороны и 10мин под крышкой.  Можно также запечь в духовке около 30-40мин.      Можно также приготовить котлеты с начинкой из 100г тертого сыра, 100г сливочного масла и укропа.      В котлеты из индюшиного фарша хорошо добавлять тёртый на мелкой тёрке сыр и 3 зубца чеснока.       На пару куриные котлеты готовятся около 20минут.\nЧтобы котлеты были сочными, нужно мелко рубить мясо вместе с большим количеством лука, можно добавить тёртую морковь. Белки от яиц лучше не ложить, хлеб размачивать в воде вместо молока.	Котлеты домашние	2	30	Вторые блюда/Котлеты домашние/Котлеты домашние147a5ea3-e959-4dd6-bbb2-245ac5781708.png
В теплый картофель добавить сок свеклы (для розового цвета теста), молоко, яйцо. Хорошо размять вилочкой или погружным блендером. Добавить муку, замесить крутое тесто. Полученное тесто накрыть, дать немного постоять.\nВ это время готовим начинку.\nКуриное мясо перемолоть вместе с луком в блендере или 2 раза пропустить в мясорубке. Добавить соль, перец.\nРаскатать тесто в тонкий пласт.\nВырезать кружки (это можно сделать стаканом)\nБерем вырезанный кружок, свернем три стороны кружка, получим таким образом треугольник.\nАккуратно перевернуть.\nВ серединку укладываем готовый фарш по чайной ложке.\nСоединяем вершины треугольника.\nВыворачиваем наружу подвёрнутые ранее края теста.\nУкладываем в пароварку на листы капусты, чтобы пельмени не прилипли.\nГотовим на пару 15 минут.\nГотовые пельмени подать с соевым соусом и бальзамическим уксусом.	Картофельные пельмени	2	48	Вторые блюда/Картофельные пельмени/Картофельные пельмени54d4ec57-ea90-4095-bd7f-5a99c1284b83.png
Лук мелко нарежем и спассеруем на сковороде до мягкости в смеси 1 столовой ложки сливочного и 1 столовой ложки оливкового масел.\nДобавим рис, обжарим его с луком 2-3 минуты. \nНапомню, что рис для ризотто не промывают, чтобы не смыть крахмал.\n\nВливаем в сковороду бокал сухого белого вина. Помешивая, даем вину впитаться в рис.\nДобавляем в рис измельченную на терке свеклу, перемешиваем.\n Если вы хотите использовать сырую свеклу, положите её перед тем, как засыпать рис.\n\nДалее готовим ризотто как обычно, подливая бульон, помешивая и дожидаясь, пока жидкость полностью не впитается в рис. Не забываем блюдо посолить по вкусу.\n\nКогда рис будет готов, т. е. будет мягким снаружи и чуть жестковатым внутри, добавляем в сковороду половину сыра, перемешиваем, добиваясь того, чтобы сыр растворился, накрываем крышкой и снимаем ризотто с огня. Сыр с плесенью можно заменить мягким сыром, например, плавленым.\nПриготовим сырный соус.\nВ сковороде растопим 1 столовую ложку сливочного масла, добавим сливки или молоко, доведем до кипения.\nВ кипящие сливки выложим оставшийся сыр и, помешивая, дадим ему расплавиться.\nДержа сковороду на небольшом огне, мешаем соус до тех пор, пока он не станет однородным и не загустеет.\nРис выкладываем горкой на тарелку, поливаем соусом, посыпаем перцем и зеленью. Очень подойдут в качестве зелени рукола и кресс-салат, но можно использовать и петрушку.	Ризотто со свеклой и сыром	2	54	Вторые блюда/Ризотто со свеклой и сыром/Ризотто со свеклой и сыром18cf2a9b-28cc-499e-bf64-41366742f521.png
Приготовим тесто. Яйцо слегка разболтать с солью, добавить кефир, соду, растительное масло и хорошо размешать. Затем добавить муку, сколько возьмет тесто. Примерно может понадобиться 2-2,5 ст. Тесто должно быть достаточно мягким, слегка липким, но отставать от рук. Вымесить тесто на столе и оставить под полотенцем на 20 минут "отдохнуть". Пока тесто отдыхает, приготовим начинку. Мясо измельчить в процессоре или прокрутить на мясорубке вместе с зубчиком чеснока и половиной луковицы. Свинину лучше брать пожирнее, тогда начинка будет сочнее. Остальной лук порезать тонкой соломкой, зелень измельчить и добавить в фарш. Чем больше лука в начинке, тем пирог получится сочнее. Добавить сливки или молоко, посолить, поперчить и перемешать. Тесто раскатать на столе одной большой лепешкой, или разделить на две части и раскатать две лепешки поменьше. Толщина теста должна быть не менее 8 мм. Выложить в центр начинку, разровнять. Собрать края к середине и защипать, не оставляя зазоров через которые может вытечь сок при выпечке. Разровнять, перевернуть и раскатать скалкой до ровного и плоского круга. Пирог перенести на противень, застеленный пекарской бумагой и смазанной маслом. В середине сделать маленькое отверстие для выхода пара. Пирог можно наколоть вилкой, не затрагивая дно. Смазать сливками или яйцом. Посыпать кунжутом. Поставить выпекаться при 180 гр. на 30 минут. Готовый мясной пирог сбрызнуть водой и накрыть полотенцем. Оставить на 15 минут. По вкусу напиминает пельмени.	Мясной пирог на кефире	2	184	Вторые блюда/Мясной пирог на кефире/Мясной пирог на кефире758dfd2a-6dd3-424f-a3a1-84647d2caaed.png
Фарш выложить в миску, добавить соль, красный и черный молотый перец, мускатный орех. Также к фаршу добавить 1 яйцо. Хорошо перемешать. Из полученного мясного фарша сделать 4 шарика.\nВ тарелку разбить 1 яйцо, посолить, поперчить и слегка взбить вилкой – это будет основа для бризоли.\nРазделочную доску посыпать мукой, выложить шарик из мяса и расплющить его рукой, слегка нажимая на шарик. Размер мясной лепешки должен быть чуть меньше диаметра сковороды, толщина 4-5 мм.\nНагреть сковороду налить растительное масло, чтобы масло было на 0,5 см на сковороде. Вылить взбитое яйцо, аккуратно распределив его по всей сковороде.\nКогда яйцо слегка схватится, аккуратно перенести мясную лепешку и выложить ее прямо на яичный слой.\nНакрыть крышкой и уменьшить огонь, чтобы яйцо не подгорело. Жарить бризоль из свинины до золотистого цвета минут 5.\nКогда яйцо поджарится, аккуратно лопаточкой нужно перевернуть бризоль и поджарить со второй стороны, также под крышкой. Таким же образом обжарить и другие бризоли. Подать бризоль из свинины с гарниром или овощами.            	Бризоль	2	53	Вторые блюда/Бризоль/Бризоль3542dfde-93b2-45ac-b343-439a839c43f8.png
Подготовить все продукты. \nСразу хочу сказать, что в ингредиентах я не ошиблась, нужно именно 1,5 кг яблок.\nФорму для выпечки выстилаем пекарской бумагой, на нее в произвольном порядке разбросать сливочное масло, нарезанное небольшими кусочками.\nЯблоки разрезаем на 4-8 частей, удаляем сердцевину, не очищаем от кожицы, выкладываем в форму, в два ряда.\nЗасыпать яблоки одним стаканом сахара.\nПоставить в разогретую до 200 градусов духовку.\nЗапекаем в течение 30-40 минут. Время и температуру регулируйте по своей духовке. Яблоки должны запечься, а сахар слегка карамелизоваться.\nПока запекаются яблоки, смешать яйца с сахаром (1 стакан). Слегка взбить.\nДобавить муку, разрыхлитель, ванилин. Если нет разрыхлителя, можно добавить одну чайную ложку соды, гашенную уксусом.\nТесто взбить, но не сильно.\nВыливаем тесто на запеченные яблоки. Ставим опять в духовку на 20-30 минут.\nЭто наш торт после выпечки. \nПрежде чем его перекладывать на блюдо, его нужно хорошо остудить.\nДалее торт переворачиваем на блюдо. Снимаем бумагу.\nВот такой красавец, действительно янтарный на вид.\nЗатем наливаем наливаем чай, непременно из Тульского самовара. Угощаемся.\nЗдесь кусочек в разрезе. \nЭто получается не торт в привычном понимании, а скорее всего вариант запеченных яблок, тесто служит здесь подушкой для яблок.\nОчень нежно и вкусно.	Янтарный торт	3	63	Десерты/Янтарный торт/Янтарный тортe64e2c3c-90f3-4338-862b-6ff260136c91.JPG
Судака филировать. Пропустить филе рыбы через мясорубку, сливочное масло, лук, мелко порезанную зелень, чеснок, мякиш хлеба (вымоченный в молоке и отжатый). Благодаря хлебу котлеты получаются нежные и сочные. В рыбный фарш разбить яйцо, посолить, поперчить, высыпать потертую морковь. Хорошо вымесить фарш и отбить. Сформировать котлеты. Каждую котлетку смочить во взбитом яйце и обвалять в панировочных сухарях. Жарить на разогретом растительном масле до румяной корочки.\nК рыбным котлетам очень подходит соус тартар.	Котлеты из судака	2	220	Вторые блюда/Котлеты из судака/Котлеты из судакаee09d077-ac2b-467d-86f1-84c905a4a848.jpg
Белки отделить от желтков и убрать в холодильник.\nРастопленное сливочное масло соединить с сахаром и ванильным сахаром.\nПо одному ввести в массу желтки,\nПодмешать сметану. Всыпать муку, смешанную с разрыхлителем, взбить до однородного состояния. \nБелки взбить до крепких пиков.\nАккуратно вмешать в тесто методом складывания.\nПолученную массу выложить в смазанную форму d 23-24 см. Дно можно застелить промасленной пергаментной бумагой.\nЯблоки очистить, освободить от семян и кожицы, нарезать тонкими дольками. Воткнуть в тесто по кругу выпуклой стороной вверх, плотно друг к другу по всей поверхности пирога (чем больше яблок, тем пирог получится сочнее).\nСверху посыпать коричневым сахаром.\nПоместить в духовку при 180*С. Выпекать примерно 45-50 минут (до сухой зубочистки). У меня пекся 50 минут, затем еще 5 минут выдержала в выключенной духовке. 	Корнуэльский яблочный пирог	3	221	Десерты/Корнуэльский яблочный пирог/Корнуэльский яблочный пирогebcd341b-d2b1-403f-a3ae-d614fea1841d.JPG
Баклажаны нарезать кружочками толщиной 1см, чуть присолить, дать постоять 7-10 минут. Помидоры нарезать кружочками\nСмешать фарш, лук мелко нарезанный, или перекрученный вместе с мясом и чесноком, яйцо сырое (отдельно взбить его вилкой и добавлять частями, может понадобится меньше), добавить соль, острый красный перец, паприку, хорошо перемешать.\nФорму для запекания смазать маслом, ставить вертикально кружочек баклажана, придерживая рукой, к нему прикладывать лепешку из фарша по размеру кружочка, затем снова баклажан, кружочек помидора, баклажан. Так чередовать по кругу, пока не закончатся продукты\nОбжарить мелко нарезанный лук, добавить тертую морковь, соломкой нарезанный болгарский перец, немного еще потушить на сковороде, минуты две, помешивая.\nДобавить к овощам порезанные помидоры, сначала посолить по вкусу, а затем добавить сахар, чтобы соус был слегка сладковатый. Все тушить на медленном огне минут 10.\nЗалить этим соусом баклажаны. Накрыть фольгой.\nЗапекать в духовке 30-40 минут при средней температуре\nОсторожно, длинной лопаточкой, переносим баклажаны на блюдо. Посыпать мелко нарезанной зеленью, подать на стол. 	Баклажаны гармошка	2	222	Вторые блюда/Баклажаны гармошка/Баклажаны гармошка7531734a-602b-4a30-8d08-c47e76291323.jpg
В йогурт добавить любимые специи, перемешать.\nЯ добавила аджику\nФиле индейки нарезать, выложить в форму, обильно смазать соусом\nСверху выложить нарезанный кружочками помидор, корейскую морковь\nСыр нарезать тонкими слайсами или натереть на терке и покрыть им индейку.\nЗакрыть противень фольгой.\nЗапекать при 180 градусах в течение 45-50 минут. Незадолго до готовности \nможно снять фольгу чтобы блюдо слегка подрумянилось.\nМне же нравится, что сыр не образует хрустящей корочки, а пропитывает морковку :)	Индейка под шубой	2	223	Вторые блюда/Индейка под шубой/Индейка под шубой087bcc9f-de23-415c-92ee-d738b2e8cddb.JPG
Сначала делаем творожно-морковные шарики. Проработаем творог, сахар и 1 желток с помощью толкушки для картошки. Добавляем тёртую на мелкой тёрке сырую морковь и перемешиваем. Далее формируем шарики, предварительно смочив руки водой. Убираем шарики в морозилку.\n\nДелаем тесто. Сливочное масло растираем с сахаром и с ванильным сахаром. Далее по одному добавляем яйца и белок, каждый раз взбивая. Добавляем йогурт или сметану, размешиваем. Частями просеиваем муку вместе с разрыхлителем.\n\nВыкладываем шарики в форму, застеленную пергаментом (у меня d 21 cм), заливаем их тестом и разравниваем. Отправляем в разогретую до 180 градусов на 40 минут. Время выпекания зависит от Вашей духовки.\n\nИзвлекаем пирог из формы и даём ему остыть.\n\nДля глазури смешиваем сахар, какао, масло и молоко. Отправляем смесь в микроволновку.\n\nПока глазурь горячая, покрываем верх пирога. Ждём застывания.	Творожно-морковный пирог	3	215	Десерты/Творожно-морковный пирог/Творожно-морковный пирогafaa473d-788d-42ce-b1dd-86d6e5578ba2.JPG
Стебли ревеня порежьте небольшими кусочками и переложите в сотейник. Залейте водой и доведите до кипения. Уменьшите огонь и варите 1 час. Добавьте сахар, хорошо размешайте и процедите, отжав весь сок. Хорошо охладите и подавайте со льдом и веточками мяты.	Лимонад с ревеня и мяты	9	224	Напитки/Лимонад с ревеня и мяты/Лимонад с ревеня и мяты9bdf3878-2d25-4db4-94a0-0c64d6d6dd8b.JPG
Ингридиенты указаны на 1 маковый корж, а также на крем и фруктовый мусс. Крем из сметаны с маскарпоне плох, чувствуется кислинка от сметаны, рассмотреть вариант со сливками.\n\nЗаранее выпекаем коржи. В оригинальном рецепте используются два маковых и один обычный. \nГотовим маковый корж. Яйца (я не отделяю белки от желтков) взбиваем с сахаром на максимальной скорости минут 10 до густой белой пены. Разрыхлитель смешиваем с мукой и срединяем с яичной массой, в конце добавляем мак и аккуратно смешиваем. Выпекаем примерно 30 мин при температуре 180 градусов.\nДля ягодной прослойки я использовала малину и ежевику. В оригинальном рецепте - клубника. Думаю, очень вкусно получится со смородиной. Я сахар не добавляла. Ягодная прослойка получилась с приятной кислинкой.\n\nЖелатин разводим в небольшом количестве воды. Ягоды перебираем в блендере в однородную массу. Если ягоды, как у меня, с косточками, протираем через сито. Добавляем желатин и смешиваем. \nПредварительно застилаем дно формы пленкой, выливаем половину желе и убираем в холодильник для застывания примерно на 30 минут. Одну порцию ягодной прослойки я сделала так, а вторую выливала полузастывшее желе сразу на крем в форме, в которой собирала торт. Разница очень заметная. Первый слой получился выше и ровнее.\nПриготовим крем. Выливаем сметану в миску и взбиваем до пышности, постепенно добавляем сахарную пудру. Маскарпоне перемешиваем ложкой, небольшими порциями вводим взбитую сметану.\nТеперь собираем торт.\nШпинатный корж - крем - желе - крем - маковый корж - крем - желе - крем - шпинатный корж - крем. \nУ меня форма 21 см. Из указанного количества ингредиентов получился торт более 9 см высотой. Я покрывала сверху вафельной картинкой.	Торт Ягодная поляна в лесу	3	225	Десерты/Торт Ягодная поляна в лесу/Торт Ягодная поляна в лесуc3050967-7b72-45de-bd17-8fbbf9f71a37.jpg
Овощи, которые нам необходимо для приготовления этого ароматного и легкого супа и\n... ещё 1 помидора. Лучше, конечно, мясистого сорта и красного цвета.\nБаклажаны помыть, нарезать кружочками и чуть-чуть посолить, чтобы выделилась горечь. Оставить на 15 минут, затем баклажаны промыть в проточной воде, чтобы смыть горечь и соль.\nБаклажаны обжарить в растительном масле до золотистого цвета с обеих сторон.\nБазилик разобрать на листовую часть и стебли.\nЛистья отложить в сторону.\nСтебли базилика и маленькие листочка, оставшиеся около стебля подровнять Жёсткую часть стебля около корня удалить.\nСтебли базилика мелко нарезать. \nЧеснок порезать на тонкие слайсы.\nНа дно кастрюли налить 1 ст. л. растительного масла и выложить мелко порезанный базилик и чеснок. Помешивая, потомить в течении 1 минуты.\nЛук порезать кому как нравится. Я резала на тонкие полукольца.\nМорковь натереть на тёрке по-корейски.\nЛук и морковь добавить к стеблям базилика с чесноком. Помешивая непрерывно в течении 1 минут.\nПерец болгарский нашинковать на тонкие полоски.\nПомидор нарезать на пластины. Затем порезать мелкими кубиками.\nПерец болгарский и помидор добавить к общей массе овощей. Перемешать. ушить 3 минуты.\nБаклажаны выложить поверх приготовленной овощной пассировки\nМелко порезать базилик. Базилик выложить в кастрюлю поверх баклажанов.\nЗалить 1 литром горячей воды. Добавить мелко порезанный листья базилика. Посолить по вкусу. Накрыть крышкой и прокипятить 5-7 минут.\nСуп готов. Украсить веточкой базилика. Есть горячим.	Суп из баклажанов с базиликом	1	226	Первые блюда/Суп из баклажанов с базиликом/Суп из баклажанов с базиликом92ef55f0-d684-42e4-adc2-721562b5bd75.JPG
Перцы тщательно вымойте под холодной водой и просушите бумажным полотенцем. Целыми выложите на сухой противень.\nЗапекайте перцы до коричневых подпалин около 20-30 минут. В процессе запекания переверните перцы один-два раза.\nГотовые перцы переложите в полиэтиленовый пакет, завяжите его и оставьте на 5 минут.\nЗатем аккуратно удалите с перцев тонкую кожицу.\nРазрежьте перцы пополам, очистите от семян и плодоножек.\nНарежьте перец кубиками или соломкой. Чеснок мелко нарежьте.\nКинзу тщательно вымойте, просушите и нарежьте.\nСоедините в миске перец, чеснок и зелень.\nДобавьте щепотку сахара, соль и черный молотый перец по вкусу.\nДобавьте оливковое масло и яблочный уксус. Хорошо перемешайте. Уберите в холодильник на 15-20 минут, чтобы перцы пропитались заправкой.\nЗакуска из сладкого красного перца с чесноком и зеленью готова.\n\n\n\n	Закуска из печеных перцев	2	227	Вторые блюда/Закуска из печеных перцев/Закуска из печеных перцев4f5dca7a-028a-40cd-8099-a8020d0c0999.jpg
Смешать все ингридиенты кроме яблок и корицы, измельчить, затем переложить яблоки слоями, посыпанными корицей и сахаром.	Творожная запеканка корично-яблочная	3	228	Десерты/Творожная запеканка корично-яблочная/Творожная запеканка корично-яблочная979c2a00-a22d-4f05-bac7-2c355f651542.jpg
Обжарить перец (2шт), морковь(1шт) потертую и лук (3шт). Сварить фунчозу(180г), добавить соус: соевый соус(50г) + тирияки или унаги (50г). В овощи добавить сладкой кукурузы (зерен). На другой сковороде жарятся морепродукты или креветки на оливковом масле с добавлением часнока (4 зубца). Все смешать. Готово.	Фунчоза с морепродуктами	2	229	Вторые блюда/Фунчоза с морепродуктами/Фунчоза с морепродуктами4a72d0a4-646d-4f2c-b86f-7b8c179194e7.jpg
Первый этап приготовления запеченного леща в духовке заключается в предварительной подготовке рыбы. Как и во время запекания любой другой рыбы, лещей необходимо сначала очистить от чешуи. Для более эстетического вида, голову желательно оставить. Острым ножиком вырежьте жабры. Удалите внутренности.\n\nТщательно помойте лещей под проточной водой, уделяя особенное внимание области брюшек и жабр. Обсушите салфетками.\n\nЛещ, запеченный в духовке в майонезе с лимоном. Пошаговый рецепт с фото\n11_лещ, запеченный в духовке в майонезе с лимоном\n48938 ПросмотровОпубликовано 10.04.2016 | От Adkushat |  7 Комментариев\nПодготовка\n5 Минут\n \nВремя готовки\n50 Минут\nМногие рыбаки скажут вам, что лещ – идеальная рыба для тараньки и будут правы. Но в тоже время, как и карп, карась, окунь и щука, леща можно очень вкусно запечь в духовке. Лещ в отличие, к примеру, от толстолобика, содержит в своем составе минимальное количество жиров, поэтому чтобы он получился не сухим, его следует запекать в том или ином маринаде. Хорошо для этих целей подходит майонез. Кроме лучшего вкуса и более нежного мяса, с его помощью можно получить также и красивую зажаристую корочку.\n\nА чтобы превратить его в по-настоящему праздничное и аппетитное блюдо, предлагаю запекать его вместе с лимоном. Лещ, запеченный в духовке в майонезе с лимоном, получается очень вкусным, с легким цитрусовым ароматом. Для запекания желательно использовать крупные тушки рыбы, так как в них меньше мелких костей.\n\nИнгредиенты:\n\nЛещи – 4-5 шт.,\nМайонез – 150-200 гр.,\nПодсолнечное масло для смазывания формы\nЛимон – 1 шт.,\nСоль по вкусу.\nСпеции: черный молотый перец, паприка, карри, прованские травы\nЛещ в духовке в майонезе с лимоном — рецепт\n1_лещ, запеченный в духовке в майонезе с лимоном\n\nПервый этап приготовления запеченного леща в духовке заключается в предварительной подготовке рыбы. Как и во время запекания любой другой рыбы, лещей необходимо сначала очистить от чешуи. Для более эстетического вида, голову желательно оставить. Острым ножиком вырежьте жабры. Удалите внутренности.\n\nТщательно помойте лещей под проточной водой, уделяя особенное внимание области брюшек и жабр. Обсушите салфетками.\n\nНа спинках рыбок сделайте  7-9 надрезов. Надрезы следует делать вдоль ребер на расстоянии 1 см. Дополнительно в область жабр вы можете положить по небольшому зубчику чеснока. В пиалку выложите майонез.\n\nВсыпьте к нему специи и небольшое количество соли. У меня готовый набор специй для рыбы. Полукружками нарежьте лимон.\n\nРазогрейте духовку до 180С. Застрелите противень бумагой для выпечки. Промажьте его подсолнечным маслом. Это необходимо для того, чтобы во время запекания рыба не приклеилась. Лещей хорошо смажьте майонезом со специями снаружи и внутри. Вкусно получится также, если заполнить их брюшко нарезанным полукольцами репчатым луком. Выложите рыбу на противень там, чтобы между тушками было небольшое расстояние.\nВ разрезы на спинке вставьте по дольке лимона. На одну тушку будет достаточно по 3-4 ломтика лимона.\n\nВыпекайте рыбу  на средней полке духовки 30-35 минут. Время приблизительное, так как оно в большей степени будет зависеть от того, какого размера рыбу вы запекаете. Если вы видите, что верх рыбы зарумянился, внутри она еще сырая. Уменьшите температуру духовки и запекайте до полной готовности. Готовых лещей выложите осторожно с помощью широкой лопатки на тарелку, стараясь при этом не повредить их целостность. Запеченный лещ в духовке в майонезе с лимоном, сервируется свежей зеленью и свежими овощами. В качестве гарнира вы можете подать картофельное пюре, запеченный картофель, спагетти, гречку. Приятного вам аппетита.\n\n	Лещ в духовке	2	230	Вторые блюда/Лещ в духовке/Лещ в духовке61d50c28-5f36-40da-acaa-b1b392c79043.JPG
Сироп: 1л воды, 1,5 кружки из темного стекла сахара (неполные), сок половины крупного лимона\n\nБлагодаря ванильному сахару и лимонной кислоте, сироп имеет приятный вкус. Залейте сиропом дыни и простерилизуйте баночки в кипящей воде не менее 10-15 минут. Закатанная дыня в сиропе таким способом отлично хранится всю зиму. Оригинальные пропорции:\nДыня  — 1-3 Штук (сколько уйдет) Вода  — 1 Литр Сахар  — 2 Стакана Ванильный сахар  — 1 Чайная ложка Лимонная кислота  — 1 Чайная ложка \nпроверить вкусно ли, добавить фото	Дыня в сиропе	7	231	\N
слива порезать половинками, напхать в 1л банку залить кипящим сиропом: 0,5л воды, 0,5 стакана сахара, 1\\4 лимона выжать	Слива в сиропе	7	233	\N
сацебели: (из сливы Чародейка - более жидкая, т.к. слива больше сочная и кислая (кисловатая), сахара +2 ст.л.) получилось 1,5л + 300г соуса\n\tЗ слив виймаємо кісточки, часник і перець очищаємо.\n\tПропускаємо через м’ясорубку.\n\tДодаємо сіль, цукор і спеції.\n\tДоводимо до кипіння і варимо 30 хвилин.\n\tРозкладаємо в стерильні баночки і закриваємо.\n\n\tСлива – 2 кг;\n\tЧасник – 2-3 шт.;  (100г)\n\tГострий перець – 2-3 шт.; (67г)\n\tКаррі – 20 г;\n\tСіль – 1 ст. л.;\n\tЦукор – 8 ст. л.; (10 ст.л. ибо біло кисловато)\n\tМелений перець – 2-3 ч.л.;\n\tМелена кориця – 0,5 ч. л.\n\nСацебели 2:  (из сливы Чемпион, мясистая, не сочная,сладкая - очень вкусная) получилось еле еле 1,5л соуса\n\n\tСливы 2 кг\n\tГрецкие орехи 200 г\n\tЧеснок 100 г\n\tПерец чили 50 г\n\tКарри 20 г\n\tПерец черный молотый 2 ч.л.\n\tСоль 1 ст.л.\n\tСахар  8 ст.л.\n\nклассика: из ренклода (предположительно), с нашего дерева, слива ооочень сладкая и сочнейшая получилось 1,5л соуса + 100г\n\tСливы - 2кг\n\tКарри- 30г\n\tСахар - 10ст.л. (8ст.л. уменьшила ибо слива сладкая)\n\tСоль - 1ст.л.\n\tЧеснок - 100г\n\tПерец чили - 3 стручка (увеличила по сравнению с предідущим, т.к. біло не остро)	Сацебели	7	234	\N
Перцы разрезаем пополам на две одинаковые половинки, очищаем от семян и мембран. Разрезанной стороной вниз выкладываем перцы на противень, застланный листом фольги. Ставим перцы в духовку и запекаем при 190 градусах до тех пор, пока кожица перца не обуглится. Это обычно минут 10-20. \n\nСразу из духовки перцы перекладываем в целлофановый пакет, плотно завязываем и оставляем минут на 20. Это делается для того, чтобы было легче снять подгоревшую кожицу с перцев. Спустя 20 минут достаем перцы из пакета и без особых трудов снимаем с них шкурку. \nГрецкие орехи примерно минуту поджариваем на сухой сковороде. В кухонный комбайн или чашу блендера складываем перцы (их для удобства можно произвольно нарезать чуть мельче), орехи и все остальные ингредиенты рецепта. Измельчаем до однородности. Теперь пробуем на вкус и, если надо, корректируем его - добавляем соль или специи, воду (если слишком густо), лимонный сок (если нужно подкислить). Словом, выравниваем на вкус.\n\n\nБыла пресновата - сделать что-то с этим	Мухаммара	8	235	Соусы/Мухаммара/Мухаммара9119e707-a7d3-4daf-bfd6-a4aa09e92cc1.jpg
Готовим бисквит-яйца взбиваем с сахаром и ван. сахаром в миксере, добавляем муку, выкладываем в форму 20-22 см, выпекаем при 180 градусах-25 минут. Остывший разрезаем на 2 части.\nКрем-мусс: Желатин замачиваем 1:5 водой. Смешиваем творог, цедру, йогурт, половину сах. пудры. Отдельно взбиваем сливки с оставшейся сах. пудрой и ван. сахаром. Аккуратно вводим сливки в смесь, добавляем землянику (клубнику), распущенный желатин и перемешиваем. \nПропитка: крепкий сладкий чай с лимоном.\nВ раздвижную форму выкладываем бисквит, пропитываем, потом крем, бисквит и ставим в холодильник для застывания на несколько часов. Выкладываем клубнику, смазывам желе, бока посыпаем фисташками. \n\nВ ингридиенты + цедра лимона 1 ст.л.	Торт Ах Лето	3	236	Десерты/Торт Ах Лето/Торт Ах Лето49a65142-1038-439a-9df7-dd7f11af374d.JPG
ЧАТНИ ИЗ СЛИВ  (делала из сорта Волошка - мясистый, с кислинкой, косточка маленькая, хорошо отходит), сливу перекрутила перед добавлением к имбирю. Вышло слегка солоновато, но необычно.\n\nНа донышко небольшой кастрюли положите мелко нарезанный имбирь, добавьте воду. Доведите до кипения и проварите 1-2 минуты.\nШАГ 4:\nШаг 4.\tДобавьте очищенные сливы. доведите до кипения и протушите на слабом огне 10 минут. Теперь время самого творческого этапа. Нужно добавить сахар и соль. Количество этих продуктов указано примерно, т.к. во многом вкус готового соуса будет зависеть от вкуса самих слив. Вместо сахара можно положить мед или использовать тростниковый коричневый сахар.\nШАГ 5:\nШаг 5.\tДобавьте пряности. Пусть это будут немного корицы (молотой или палочка), черный молотый перец, молотая паприка, чуть-чуть куркумы. Асафетида вместо лука и чеснока. Перемешайте, попробуйте на вкус. Кислый, сладкий и соленый вкусы должны быть сбалансированы для вас. При необходимости добавьте немного уксуса, желательно яблочного, а также измельченную зелень (не жесткую). Доведите до кипения и отставьте в сторону.	Чатни из слив	7	232	Консервация/Чатни из слив/Чатни из слив66256123-dccf-4094-9262-8d22584e806d.jpg
Начинка - соус. Грибы мелко нарежем, сбрызнем соком лимона, перчим, солим, оставим на несколько минут. Затем обжарим и в конце добавим ложку муки.\nШпинат мелко режем, смешиваем с тертым сыром, добавляем яйцо, горчицу, сметану и грибы. Перемешиваем.\nМясо очень хорошо отбиваем. Я взяла большие куски, отбила очень тонко. В итоге кусочек получился на всю тарелку)) Но от этого блюдо еще лучше смотрелось))) Солим, перчим\nВернемся к тесту. Режем тесто на 8 кусков (количество теста на 4 больших порции). Каждую тонко раскатываем. Очень тонко. Тесто очень эластичное, не бойтесь, получится у любого. Выкладываем отбивную, сверху начинку.\nНакрываем сверху вторым пластом теста и обрезаем лишнее. Края сами хорошо слепятся, но можете подстраховаться и немного прижать с помощью вилки\nОбжариваем на огне, чуть меньше среднего, с двух сторон до золотистой корочки. Подаем с зеленью	Отбивная в тесте	2	270	Вторые блюда/Отбивная в тесте/Отбивная в тесте13429838-8989-45fa-a6c1-dad7b8412616.JPG
Воду с маслом доведем до кипения. Муку высыпаем в глубокую посуду, если нужно добавляем соль по вкусу. Заливаем в муку кипяток, хорошо перемешиваем сначала с помощью ложки, домешиваем руками (тесто быстро остывает). И оставляем тесто остывать. Наберитесь терпения или начните готовить тесто раньше. Работать с холодным тестом гораздо приятней.\nТесто очень пластично, раскатывается тонко.	Заварное тесто	4	269	Тесто/Заварное тесто/Заварное тесто0e03ac15-1f70-47f3-8bd8-8c1a179bfe8b.JPG
Натереть цедру с двух апельсинов и отжать сок. Сок и цедру смешать, добавить сахар, яйца.\nАпельсиново-яичную смесь поставить на маленький огонь, не доводя до кипения ввести крахмал, разведенный в паре столовых ложек теплой воды. (Я разводила в части сока - так лучше, в малом кол-ве) Постоянно помешивая довести смесь до загустения.\nАпельсиновый курд снять с огня и добавить сливочное масло (я не добавляла), перемешать, накрыть пищевой пленкой "в контакт" и дать полностью остудиться. У меня получилось достаточно много крема, я использовала не весь. Оставшийся крем я убрала в контейнер в холодильник. Готовый курд хранится около 5 дней и прекрасно подходит к сырникам, оладьям и другой выпечке.\n	Апельсиновый курд	5	271	Крема/Апельсиновый курд/Апельсиновый курд429e9d6d-a48f-4fae-9ac9-dc69aad9e21c.JPG
Взбить на холоде сливки, добавить маскарпоне со сгущённым молоком, добавить сахарную пудру и еще раз взбить.	Сливочный крем	5	272	Крема/Сливочный крем/Сливочный кремed87c2c1-16da-4105-a90a-cc2d0755268d.JPG
Сливочное масло и яйца должны быть комнатной температурой.\nСливочное масло и сахар взбить миксером до посветления, далее по одному ввести 3 яйца, причем каждый раз взбивать все миксером по 1-2 минуты на высоких оборотах. Далее ввести просеянные муку, разрыхлитель и ванильный сахар в два этапа. Сначала половину, далее добавить 60 мл молока, и в конце вторую половину сухих ингредиентов. Стоит отметить, что их вымешивать миксером на низких оборотах.\nФорму застелить пекарской бумагой и выпекать при 180С около 25-30мин.\n(Все получилось плохо, делала в мультиварке, коржи не подошли, были тугими)\nМалиновый джем смешать с коньяком. Остывший корж разрезать вдоль и нижний корж смазать малиновой пропиткой, оставить на 10мин.\nДалее оба коржа щедро смазать апельсиновым курдом, в середину выложить толстый слой крема. Ничего страшного, если немного крема выйдет наружу, когда вы его накроете вторым коржом. Далее выровнять бока торта лопаточкой, кондитерским шпателем или плоским ножом. Перед украшением торт убрать в холодильник на 30мин.\nОставшимся кремом украсить торт так как вам нравится и тем, что у вас есть под рукой. У меня была голубика и физалис, крем я не выравнивала до гладкости. \nОставить в холодильнике на несколько часов, лучше на ночь.\n\n+ добавить коньячную пропитку в ингридиенты	Сливочный торт с апельсиновым курдом	3	273	Десерты/Сливочный торт с апельсиновым курдом/Сливочный торт с апельсиновым курдомb22efe32-4157-48d0-acc3-90a0a406035a.jpg
1.  Отправляем в дежу 6 пастеризованных белков (на 500 г маскарпоне используем 6 яиц), 2 щепотки соли и взбиваем.\n2.  Отжимаем сок из 2 апельсинов. Замачиваем в нем печенье савоярди и выкладываем на дно формочек.\n3.  Выкладываем взбитые белки в миску. Отправляем в дежу 6 пастеризованных желтков, добавляем 6 горстей сахара и взбиваем. Выкладываем в дежу к взбитым желткам 500 г маскарпоне и снова взбиваем.\n4.  Соединяем взбитые белки с желтковой массой, перемешиваем снизу вверх. Выкладываем получившуюся смесь поверх печенья в формочки.\n5.  Мелко нарезаем мяту. Отправляем несколько ягод клубники в стакан блендера, добавляем сахарную пудру и измельчаем. Добавляем туда же мяту, немного лимонного сока и перемешиваем. Поливаем тирамису получившимся десертом и отправляем в холодильник на 4 часа.\n\nУ меня получилось жидковато\n	Тирамису - летняя версия	3	274	Десерты/Тирамису - летняя версия/Тиримисуb3453d13-7193-4276-8e8b-76505aaf3a2e.JPG
Процесс приготовления:\n1. Куриный фарш обжарить на растительном масле, посолить, добавить специи - перец, базилик, орегано и перемешать.\n2. Предварительно очищенные баклажаны нарежем длинными пластинами толщиной 0,3-0,5 см, поместить в емкость с соленой водой на 15 мин.\n3. Затем подсушить нарезанные баклажаны на сухой сковороде с обеих сторон.\n4. Мелко нарезать очищенный чеснок.\n5. Для приготовления соуса обжарить нарезанный чеснок на растительном масле, вылить 150 мл кипящей воды, затем добавить майонез, томатную пасту, соль, перец, орегано и базилик, перемешать и тушить 3 мин.\n6. Нарезать помидоры полукольцами \n7. Натереть сыр на мелкую терку.\n8. Форму для запекания смазать растительным маслом.\n9. На дно и бока формы выложить ломтики баклажанов так чтобы они выступали за края формы на 3-4 см.\n10. На баклажаны выложить слой из половины риса, отваренного в соленой воде, и посыпать сыром.\n11. Вторым слоем выложить мясной фарш и посыпать сыром.\n12. Третьим слоем выложить помидоры, посолить и посыпать тертым сыром.\n13. Сверху выложить оставшийся рис, залить соусом, закрыть поверхность торта выступающими ломтиками баклажанов и на незакрытые участки выложить оставшиеся баклажаны.\n14. Форму поместить в разогретую до 180 градусов духовку и выпекать 25 минут.\n15. Готовый торт остудить, перевернуть на блюдо дном вверх. Подавать, украсив зеленью и овощами.	Торт из баклажанов	2	275	Вторые блюда/Торт из баклажанов/Торт из баклажанов8f0d1ed0-01ac-4e26-8481-4beb09ead4f0.jpg
Классическая порция – 185 г соуса на 1 кг риса.\nУксус 50мл, соль 10г, сахар 30г  на 500г риса\nРазмешать сахар и соль в рисовом уксусе "Мицукан"	Мицукан	8	276	\N
Рис залить на палец толщиной воды, размешать, довести до кипения, газ меньше, накрыть крышкой и 12минут варить, затем вдержать 15 минут под полотенцем.\nВыбирать круглый рис, который промыть 6 раз до светлой воды.\nГотовый рис заправить соусом «Мицукан» по вкусу. Классическая порция – 185 г соуса на 1 кг риса.\n\nДобавить описание закрутки и другие ингридиенты	Роллы	2	277	Вторые блюда/Роллы/Роллы610b09b8-2b50-4145-8ab0-a2251c2a51e1.JPG
	Мороженое	3	278	Десерты/Мороженое/Мороженое2cc5f71b-6e8b-49ae-8eb0-4577734b249b.JPG
Рис отварить как на суши. Порезать средними кусками перец и обжарить на оливковом масле на сильном огне до полуготовности. Морковь натереть на крупной терке и обжарить также как и перец. Лук нарезать средними кусками  и обжарить как и перец. Лук должен быть сладким (ялтинский). Обжарить морепродукты и соединить с луком, перцем, морковью и сладкой кукурузой, пару минут прожарить вместе. Посолить. \nПриготовить соус на основании тирияки (унаги) и соевого, тщательно перемешав. Соус равномерно полить на рис и тщательно перемешать. Добавить смесь овощей и морепродуктов.	Рис с овощами	2	279	Вторые блюда/Рис с овощами/Рис с овощами4dacce75-e306-4e54-bfaa-cce7739e8194.JPG
1. Если тебе нужен белок, то его можно извлечь из яйца, проткнув его толстой иглой с двух сторон. Желток при этом останется в скорлупе. \n2. Белок хорошо взбивается, если он свежий и охлажденный. \n3. Белки нужно взбивать в эмалированной, керамической или стеклянной посуде (ни в коем случае не в алюминиевой, так как белки станут серыми!). \n5. Посуда для взбивания должна быть абсолютно сухой, без капли жира.В белок не должно попасть ни капли желтка или жира, иначе белки не взобьются. \n6. Для взбивания белков нужно брать рамную низкоскоростную мешалку (насадка для миксера в виде рамочки или прекрещивающихся рамочек). Ни в коем случае не подходит блендер для взбивания коктейлей! \n7. Взбивать нужно обязательно охлажденные свежие белки на самой низкой скорости. По мере взбивания, скорость постепенно увеличивать. Если взбивать сразу быстро и предпочесть другой тип мешалки, белки станут жидкими и уже не взобьются. \n8. Долго хранившиеся или яйца сомнительной свежести становятся водянистыми и взбиваются плохо. К ним можно добавить щепотку мелкой соли, капельку лимонной кислоты или уксуса, чтобы улучшить процесс взбивания, но все равно это будет не то. И для взбивания лучше брать свежие яйца. Читай также: Как выбрать куриные яйца? 9. При взбивании миксером нужно следить, чтобы весь объем белков был вовлечен в процесс взбивания (чтобы мешалка доставала до дна посуды), иначе может получиться так, что внизу белки останутся жидкими. \n10. Если белки недостаточно хорошо взбиты, в них образуются крупные пузырьки воздуха, которые лопаются при замешивании теста, и готовые изделия получаются недостаточно воздушными. Излишне взбитые белки содержат мелкие пузырьки воздуха с тонкими стенками. В процессе выпекания такие пузырьки лопаются и бисквиты опадают. Хорошо взбитые белки должны в несколько раз (в 4-5 раз) вырасти в объеме и сохранять свою форму (при выкладывании на лист белки не должны растекаться, т.е должна получиться крепкая пена). \n11. Момент начала добавления сахара очень важен, к этому моменту белки должны быть уже достаточно хорошо взбиты. Не вываливай весь сахар сразу! Он тут же растворится, белки станут жидкими и предполагаемое изделие уже не приобретет нужную форму и вкус. Сахар нужно добавлять понемножку, не спеша. При этом белки продолжают взбивать. Читай также: Куриные яйца: Польза и вред \n12. Для безе (меренг) лучше брать сахарную пудру — соотношение сахара и белков 1:4 (1 стакан сахара на 4 белка. Тут , конечно, свою роль играет и размер яиц). Если взять меньше сахара — безе (меренги) будут слишком вязкими, взять больше сахара — слишком хрупкими, очень сладкими и не такими воздушными — не будут таять во рту, и будет казаться, что наелся чистого сахара, причем кусками. \n13. Рекомендуется сначала взбить белки и убрать их в холодильник, и только потом использовать миксер и посуду для взбивания других смесей. \n14. Яичный белок взбивать в пену с одной щепоткой соли или небольшим количеством лимонного сока настолько круто, что кончик пены при ее вытягивании кверху остается стоять вертикально. Если нужно добавить сахар, белок взбивается сначала до пушистого состояния, затем в него добавляется сахар, а затем вся масса взбивается до однородности и блеска. 15. Завершив процесс взбивания, выложить белки поверх крема или теста и осторожно, в одном направлении, перемешивать до получения однородной массы. При этом взбитые белки нельзя вдавливать, иначе разрушаются воздушные пузырьки и будет утрачен эффект воздушности.\n	Взбитый белок	10	281	Заготовки для рецептов/Взбитый белок/Взбитый белокd74f0104-291b-4b12-9775-b4c41bdbeeb2.jpg
\.


--
-- Data for Name: reference; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.reference (id, recept_id, recept_reference_id, norma, optional) FROM stdin;
55	74	6	\N	f
56	74	111	\N	f
57	74	112	\N	f
59	82	9	\N	f
60	183	124	\N	f
61	86	73	\N	f
62	29	179	\N	f
63	70	8	\N	f
64	142	124	\N	f
65	142	6	\N	f
66	213	212	\N	f
67	193	6	\N	f
68	27	6	\N	f
69	27	24	\N	f
70	211	4	\N	f
71	93	72	\N	f
72	180	179	\N	f
73	180	29	\N	f
74	182	188	\N	f
75	143	4	\N	f
76	143	18	\N	f
77	12	10	\N	f
78	21	9	\N	f
79	21	165	\N	f
81	117	6	\N	f
82	270	269	1 порция	f
83	273	271	1 порция	f
84	273	272	1 порция	f
85	274	219	\N	f
86	277	276	1 порция	f
\.


--
-- Name: reference_ids; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.reference_ids', 86, true);


--
-- Data for Name: tag; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.tag (id, name) FROM stdin;
1	Мультиварка
\.


--
-- Name: tag_ids; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.tag_ids', 1, false);


--
-- Name: alternative_proportion_from_recipes alternative_proportion_from_recipe_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.alternative_proportion_from_recipes
    ADD CONSTRAINT alternative_proportion_from_recipe_pkey PRIMARY KEY (id);


--
-- Name: alternative_proportion alternative_proportion_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.alternative_proportion
    ADD CONSTRAINT alternative_proportion_pkey PRIMARY KEY (id);


--
-- Name: ingredient_ref ingredient_ref_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.ingredient_ref
    ADD CONSTRAINT ingredient_ref_pkey PRIMARY KEY (id);


--
-- Name: category primary_category; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.category
    ADD CONSTRAINT primary_category PRIMARY KEY (id);


--
-- Name: department primary_dapart; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.department
    ADD CONSTRAINT primary_dapart PRIMARY KEY (id);


--
-- Name: detail primary_detail; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.detail
    ADD CONSTRAINT primary_detail PRIMARY KEY (id);


--
-- Name: ingredient primary_ingridient; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.ingredient
    ADD CONSTRAINT primary_ingridient PRIMARY KEY (id);


--
-- Name: proportion primary_proportion; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.proportion
    ADD CONSTRAINT primary_proportion PRIMARY KEY (id);


--
-- Name: recipe primary_recept; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.recipe
    ADD CONSTRAINT primary_recept PRIMARY KEY (id);


--
-- Name: reference primary_reference; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.reference
    ADD CONSTRAINT primary_reference PRIMARY KEY (id);


--
-- Name: tag primary_tag; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tag
    ADD CONSTRAINT primary_tag PRIMARY KEY (id);


--
-- Name: alternative_proportion_from_recipe_id_uindex; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX alternative_proportion_from_recipe_id_uindex ON public.alternative_proportion_from_recipes USING btree (id);


--
-- Name: alternative_proportion_id_uindex; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX alternative_proportion_id_uindex ON public.alternative_proportion USING btree (id);


--
-- Name: ingredient_name_uindex; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX ingredient_name_uindex ON public.ingredient USING btree (name);


--
-- Name: ingredient_ref_id_uindex; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX ingredient_ref_id_uindex ON public.ingredient_ref USING btree (id);


--
-- Name: ingredient_ref_ingredient_id_uindex; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX ingredient_ref_ingredient_id_uindex ON public.ingredient_ref USING btree (ingredient_id);


--
-- Name: recipe_name_uindex; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX recipe_name_uindex ON public.recipe USING btree (name);


--
-- Name: alternative_proportion_from_recipes alternative_proportion_from_recipe_proportion_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.alternative_proportion_from_recipes
    ADD CONSTRAINT alternative_proportion_from_recipe_proportion_id_fk FOREIGN KEY (proportion_id) REFERENCES public.proportion(id);


--
-- Name: alternative_proportion_from_recipes alternative_proportion_from_recipe_recipe_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.alternative_proportion_from_recipes
    ADD CONSTRAINT alternative_proportion_from_recipe_recipe_id_fk FOREIGN KEY (recipe_id) REFERENCES public.recipe(id);


--
-- Name: alternative_proportion alternative_proportion_ingredient_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.alternative_proportion
    ADD CONSTRAINT alternative_proportion_ingredient_id_fk FOREIGN KEY (ingredient_id) REFERENCES public.ingredient(id);


--
-- Name: alternative_proportion alternative_proportion_proportion_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.alternative_proportion
    ADD CONSTRAINT alternative_proportion_proportion_id_fk FOREIGN KEY (proportion_id) REFERENCES public.proportion(id);


--
-- Name: detail fk1nw5i835yc8al8cimjje2kgpg; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.detail
    ADD CONSTRAINT fk1nw5i835yc8al8cimjje2kgpg FOREIGN KEY (recept_id) REFERENCES public.recipe(id);


--
-- Name: proportion fk2strn2h4rxkv7que68nb1s6o7; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.proportion
    ADD CONSTRAINT fk2strn2h4rxkv7que68nb1s6o7 FOREIGN KEY (recept_id) REFERENCES public.recipe(id);


--
-- Name: category fk60vnusk94bxjo51usk10i7vqj; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.category
    ADD CONSTRAINT fk60vnusk94bxjo51usk10i7vqj FOREIGN KEY (recept_id) REFERENCES public.recipe(id);


--
-- Name: category fka69ppchfyf0twdton93nmk7t; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.category
    ADD CONSTRAINT fka69ppchfyf0twdton93nmk7t FOREIGN KEY (tag_id) REFERENCES public.tag(id);


--
-- Name: reference fkirvg7n3ugo1mj18pabd3yyuc7; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.reference
    ADD CONSTRAINT fkirvg7n3ugo1mj18pabd3yyuc7 FOREIGN KEY (recept_reference_id) REFERENCES public.recipe(id);


--
-- Name: reference fkl5hdlt5ceo0a1tgt9m7ccblws; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.reference
    ADD CONSTRAINT fkl5hdlt5ceo0a1tgt9m7ccblws FOREIGN KEY (recept_id) REFERENCES public.recipe(id);


--
-- Name: proportion fklw4037uoshx59vewhsacr797l; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.proportion
    ADD CONSTRAINT fklw4037uoshx59vewhsacr797l FOREIGN KEY (ingredient_id) REFERENCES public.ingredient(id);


--
-- Name: recipe fklyedlwlg09k4qlqerp5hngq9s; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.recipe
    ADD CONSTRAINT fklyedlwlg09k4qlqerp5hngq9s FOREIGN KEY (depart_id) REFERENCES public.department(id);


--
-- Name: category foreign_category_to_recept; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.category
    ADD CONSTRAINT foreign_category_to_recept FOREIGN KEY (recept_id) REFERENCES public.recipe(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: category foreign_category_to_tag; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.category
    ADD CONSTRAINT foreign_category_to_tag FOREIGN KEY (tag_id) REFERENCES public.tag(id);


--
-- Name: detail foreign_detail_to_recept; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.detail
    ADD CONSTRAINT foreign_detail_to_recept FOREIGN KEY (recept_id) REFERENCES public.recipe(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: proportion foreign_proportion_to_ingridient; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.proportion
    ADD CONSTRAINT foreign_proportion_to_ingridient FOREIGN KEY (ingredient_id) REFERENCES public.ingredient(id);


--
-- Name: proportion foreign_proportion_to_recept; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.proportion
    ADD CONSTRAINT foreign_proportion_to_recept FOREIGN KEY (recept_id) REFERENCES public.recipe(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: recipe foreign_recept_to_depart; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.recipe
    ADD CONSTRAINT foreign_recept_to_depart FOREIGN KEY (depart_id) REFERENCES public.department(id);


--
-- Name: reference foreign_reference_to_recept; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.reference
    ADD CONSTRAINT foreign_reference_to_recept FOREIGN KEY (recept_id) REFERENCES public.recipe(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: reference foreign_reference_to_recept_reference; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.reference
    ADD CONSTRAINT foreign_reference_to_recept_reference FOREIGN KEY (recept_reference_id) REFERENCES public.recipe(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: ingredient_ref ingredient_ref_ingredient_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.ingredient_ref
    ADD CONSTRAINT ingredient_ref_ingredient_id_fk FOREIGN KEY (ingredient_id) REFERENCES public.ingredient(id);


--
-- Name: ingredient_ref ingredient_ref_ingredient_id_fk_2; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.ingredient_ref
    ADD CONSTRAINT ingredient_ref_ingredient_id_fk_2 FOREIGN KEY (parent_ingredient_id) REFERENCES public.ingredient(id);


--
-- PostgreSQL database dump complete
--

