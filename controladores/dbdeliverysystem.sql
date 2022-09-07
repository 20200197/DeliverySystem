--
-- PostgreSQL database dump
--

-- Dumped from database version 14.1
-- Dumped by pg_dump version 14.1

-- Started on 2022-06-29 18:55:16

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 220 (class 1259 OID 34617)
-- Name: administrador; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.administrador (
    id_admin integer NOT NULL,
    nombre_admin character varying(30) NOT NULL,
    apellido_admin character varying(30) NOT NULL,
    dui_admin character varying(10) NOT NULL,
    correo_admin character varying(120) NOT NULL,
    usuario_admin character varying(65) NOT NULL,
    clave_admin character varying(100) NOT NULL,
    fecha_registro_admin date NOT NULL,
    telefono_admin character varying(11) NOT NULL,
    status_admin boolean NOT NULL
);


ALTER TABLE public.administrador OWNER TO postgres;

--
-- TOC entry 219 (class 1259 OID 34616)
-- Name: administrador_id_admin_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.administrador_id_admin_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.administrador_id_admin_seq OWNER TO postgres;

--
-- TOC entry 3510 (class 0 OID 0)
-- Dependencies: 219
-- Name: administrador_id_admin_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.administrador_id_admin_seq OWNED BY public.administrador.id_admin;


--
-- TOC entry 226 (class 1259 OID 34671)
-- Name: categoria; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.categoria (
    id_categoria_producto integer NOT NULL,
    categoria character varying(50) NOT NULL,
    imagen_categoria character varying(1000) NOT NULL,
    status_categoria boolean NOT NULL
);


ALTER TABLE public.categoria OWNER TO postgres;

--
-- TOC entry 225 (class 1259 OID 34670)
-- Name: categoria_id_categoria_producto_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.categoria_id_categoria_producto_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.categoria_id_categoria_producto_seq OWNER TO postgres;

--
-- TOC entry 3511 (class 0 OID 0)
-- Dependencies: 225
-- Name: categoria_id_categoria_producto_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.categoria_id_categoria_producto_seq OWNED BY public.categoria.id_categoria_producto;


--
-- TOC entry 210 (class 1259 OID 34550)
-- Name: cliente; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.cliente (
    id_cliente integer NOT NULL,
    nombre_cliente character varying(30) NOT NULL,
    apellido_cliente character varying(30) NOT NULL,
    dui_cliente character varying(10) NOT NULL,
    correo_cliente character varying(120) NOT NULL,
    telefono_cliente character varying(11) NOT NULL,
    usuario_cliente character varying(65) NOT NULL,
    clave_cliente character varying(100) NOT NULL,
    status_cliente boolean NOT NULL,
    fecha_registro_cliente date NOT NULL
);


ALTER TABLE public.cliente OWNER TO postgres;

--
-- TOC entry 209 (class 1259 OID 34549)
-- Name: cliente_id_cliente_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.cliente_id_cliente_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.cliente_id_cliente_seq OWNER TO postgres;

--
-- TOC entry 3512 (class 0 OID 0)
-- Dependencies: 209
-- Name: cliente_id_cliente_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.cliente_id_cliente_seq OWNED BY public.cliente.id_cliente;


--
-- TOC entry 238 (class 1259 OID 34757)
-- Name: comentario_producto; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.comentario_producto (
    id_comentario integer NOT NULL,
    valoracion integer NOT NULL,
    comentario character varying(300) NOT NULL,
    visible boolean NOT NULL,
    id_detalle integer NOT NULL
);


ALTER TABLE public.comentario_producto OWNER TO postgres;

--
-- TOC entry 237 (class 1259 OID 34756)
-- Name: comentario_producto_id_comentario_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.comentario_producto_id_comentario_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.comentario_producto_id_comentario_seq OWNER TO postgres;

--
-- TOC entry 3513 (class 0 OID 0)
-- Dependencies: 237
-- Name: comentario_producto_id_comentario_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.comentario_producto_id_comentario_seq OWNED BY public.comentario_producto.id_comentario;


--
-- TOC entry 240 (class 1259 OID 34769)
-- Name: comentario_repartidor; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.comentario_repartidor (
    id_comentario_repartidor integer NOT NULL,
    valoracion integer NOT NULL,
    comentario character varying(300) NOT NULL,
    id_factura integer NOT NULL
);


ALTER TABLE public.comentario_repartidor OWNER TO postgres;

--
-- TOC entry 239 (class 1259 OID 34768)
-- Name: comentario_repartidor_id_comentario_repartidor_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.comentario_repartidor_id_comentario_repartidor_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.comentario_repartidor_id_comentario_repartidor_seq OWNER TO postgres;

--
-- TOC entry 3514 (class 0 OID 0)
-- Dependencies: 239
-- Name: comentario_repartidor_id_comentario_repartidor_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.comentario_repartidor_id_comentario_repartidor_seq OWNED BY public.comentario_repartidor.id_comentario_repartidor;


--
-- TOC entry 212 (class 1259 OID 34565)
-- Name: datos_tarjeta; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.datos_tarjeta (
    id_datos_tarjeta integer NOT NULL,
    numero_tarjeta character varying(20) NOT NULL,
    ccv integer NOT NULL,
    vencimiento character varying(15) NOT NULL,
    nombre_titular character varying(1000) NOT NULL,
    id_cliente integer NOT NULL
);


ALTER TABLE public.datos_tarjeta OWNER TO postgres;

--
-- TOC entry 211 (class 1259 OID 34564)
-- Name: datos_tarjeta_id_datos_tarjeta_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.datos_tarjeta_id_datos_tarjeta_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.datos_tarjeta_id_datos_tarjeta_seq OWNER TO postgres;

--
-- TOC entry 3515 (class 0 OID 0)
-- Dependencies: 211
-- Name: datos_tarjeta_id_datos_tarjeta_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.datos_tarjeta_id_datos_tarjeta_seq OWNED BY public.datos_tarjeta.id_datos_tarjeta;


--
-- TOC entry 214 (class 1259 OID 34579)
-- Name: departamento; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.departamento (
    id_departamento integer NOT NULL,
    nombre_departamento character varying(20) NOT NULL
);


ALTER TABLE public.departamento OWNER TO postgres;

--
-- TOC entry 213 (class 1259 OID 34578)
-- Name: departamento_id_departamento_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.departamento_id_departamento_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.departamento_id_departamento_seq OWNER TO postgres;

--
-- TOC entry 3516 (class 0 OID 0)
-- Dependencies: 213
-- Name: departamento_id_departamento_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.departamento_id_departamento_seq OWNED BY public.departamento.id_departamento;


--
-- TOC entry 236 (class 1259 OID 34740)
-- Name: detalle_factura; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.detalle_factura (
    id_detalle integer NOT NULL,
    costo_envio numeric(5,2) NOT NULL,
    precio numeric(6,2) NOT NULL,
    status boolean NOT NULL,
    cantidad_pedido integer NOT NULL,
    fecha_envio timestamp without time zone NOT NULL,
    id_factura integer NOT NULL,
    id_producto integer NOT NULL
);


ALTER TABLE public.detalle_factura OWNER TO postgres;

--
-- TOC entry 235 (class 1259 OID 34739)
-- Name: detalle_factura_id_detalle_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.detalle_factura_id_detalle_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.detalle_factura_id_detalle_seq OWNER TO postgres;

--
-- TOC entry 3517 (class 0 OID 0)
-- Dependencies: 235
-- Name: detalle_factura_id_detalle_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.detalle_factura_id_detalle_seq OWNED BY public.detalle_factura.id_detalle;


--
-- TOC entry 218 (class 1259 OID 34598)
-- Name: direccion; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.direccion (
    id_direccion integer NOT NULL,
    descripcion_direccion character varying(200) NOT NULL,
    punto_referencia character varying(100),
    coordenadas character varying(2000) NOT NULL,
    id_cliente integer NOT NULL,
    id_municipio integer NOT NULL
);


ALTER TABLE public.direccion OWNER TO postgres;

--
-- TOC entry 217 (class 1259 OID 34597)
-- Name: direccion_id_direccion_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.direccion_id_direccion_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.direccion_id_direccion_seq OWNER TO postgres;

--
-- TOC entry 3518 (class 0 OID 0)
-- Dependencies: 217
-- Name: direccion_id_direccion_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.direccion_id_direccion_seq OWNED BY public.direccion.id_direccion;


--
-- TOC entry 234 (class 1259 OID 34718)
-- Name: factura; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.factura (
    id_factura integer NOT NULL,
    fecha_compra timestamp without time zone NOT NULL,
    status boolean NOT NULL,
    total numeric(10,2) NOT NULL,
    id_repartidor integer NOT NULL,
    id_direccion integer NOT NULL,
    id_metodo_pago integer NOT NULL
);


ALTER TABLE public.factura OWNER TO postgres;

--
-- TOC entry 233 (class 1259 OID 34717)
-- Name: factura_id_factura_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.factura_id_factura_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.factura_id_factura_seq OWNER TO postgres;

--
-- TOC entry 3519 (class 0 OID 0)
-- Dependencies: 233
-- Name: factura_id_factura_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.factura_id_factura_seq OWNED BY public.factura.id_factura;


--
-- TOC entry 228 (class 1259 OID 34680)
-- Name: marca; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.marca (
    id_marca integer NOT NULL,
    nombre_marca character varying(30) NOT NULL,
    status_marca boolean NOT NULL
);


ALTER TABLE public.marca OWNER TO postgres;

--
-- TOC entry 227 (class 1259 OID 34679)
-- Name: marca_id_marca_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.marca_id_marca_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.marca_id_marca_seq OWNER TO postgres;

--
-- TOC entry 3520 (class 0 OID 0)
-- Dependencies: 227
-- Name: marca_id_marca_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.marca_id_marca_seq OWNED BY public.marca.id_marca;


--
-- TOC entry 232 (class 1259 OID 34711)
-- Name: metodo_pago; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.metodo_pago (
    id_metodo_pago integer NOT NULL,
    metodo_pago character varying(40) NOT NULL
);


ALTER TABLE public.metodo_pago OWNER TO postgres;

--
-- TOC entry 231 (class 1259 OID 34710)
-- Name: metodo_pago_id_metodo_pago_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.metodo_pago_id_metodo_pago_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.metodo_pago_id_metodo_pago_seq OWNER TO postgres;

--
-- TOC entry 3521 (class 0 OID 0)
-- Dependencies: 231
-- Name: metodo_pago_id_metodo_pago_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.metodo_pago_id_metodo_pago_seq OWNED BY public.metodo_pago.id_metodo_pago;


--
-- TOC entry 216 (class 1259 OID 34586)
-- Name: municipio; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.municipio (
    id_municipio integer NOT NULL,
    nombre_municipio character varying(20) NOT NULL,
    id_departamento integer NOT NULL
);


ALTER TABLE public.municipio OWNER TO postgres;

--
-- TOC entry 215 (class 1259 OID 34585)
-- Name: municipio_id_municipio_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.municipio_id_municipio_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.municipio_id_municipio_seq OWNER TO postgres;

--
-- TOC entry 3522 (class 0 OID 0)
-- Dependencies: 215
-- Name: municipio_id_municipio_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.municipio_id_municipio_seq OWNED BY public.municipio.id_municipio;


--
-- TOC entry 230 (class 1259 OID 34687)
-- Name: producto; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.producto (
    id_producto integer NOT NULL,
    nombre_producto character varying(100) NOT NULL,
    cantidad_producto integer NOT NULL,
    descripcion_producto character varying(2000) NOT NULL,
    precio_producto numeric(6,2) NOT NULL,
    imagen character varying(1000) NOT NULL,
    status_producto boolean NOT NULL,
    id_categoria integer NOT NULL,
    id_vendedor integer NOT NULL,
    id_marca integer NOT NULL
);


ALTER TABLE public.producto OWNER TO postgres;

--
-- TOC entry 229 (class 1259 OID 34686)
-- Name: producto_id_producto_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.producto_id_producto_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.producto_id_producto_seq OWNER TO postgres;

--
-- TOC entry 3523 (class 0 OID 0)
-- Dependencies: 229
-- Name: producto_id_producto_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.producto_id_producto_seq OWNED BY public.producto.id_producto;


--
-- TOC entry 222 (class 1259 OID 34632)
-- Name: repartidor; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.repartidor (
    id_repartidor integer NOT NULL,
    nombre_repartidor character varying(30) NOT NULL,
    apellido_repartidor character varying(30) NOT NULL,
    dui_repartidor character varying(10) NOT NULL,
    correo_repartidor character varying(120) NOT NULL,
    usuario_repartidor character varying(20) NOT NULL,
    telefono_repartidor character varying(11) NOT NULL,
    clave_repartidor character varying(100) NOT NULL,
    solvencia_pnc character varying(20) NOT NULL,
    antecedente_penal character varying(120) NOT NULL,
    direccion_domicilio character varying(300) NOT NULL,
    placa_vehiculo character varying(7) NOT NULL,
    foto_placa_vehiculo character varying(1000) NOT NULL,
    foto_repartidor character varying(1000) NOT NULL,
    foto_vehiculo character varying(1000) NOT NULL,
    status_repartidor boolean NOT NULL,
    fecha_registro date NOT NULL,
    id_admin integer NOT NULL
);


ALTER TABLE public.repartidor OWNER TO postgres;

--
-- TOC entry 221 (class 1259 OID 34631)
-- Name: repartidor_id_repartidor_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.repartidor_id_repartidor_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.repartidor_id_repartidor_seq OWNER TO postgres;

--
-- TOC entry 3524 (class 0 OID 0)
-- Dependencies: 221
-- Name: repartidor_id_repartidor_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.repartidor_id_repartidor_seq OWNED BY public.repartidor.id_repartidor;


--
-- TOC entry 224 (class 1259 OID 34654)
-- Name: vendedor; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.vendedor (
    id_vendedor integer NOT NULL,
    nombre_vendedor character varying(30) NOT NULL,
    apellido_vendedor character varying(30) NOT NULL,
    dui_vendedor character varying(10) NOT NULL,
    correo_vendedor character varying(120) NOT NULL,
    telefono_vendedor character varying(11) NOT NULL,
    usuario_vendedor character varying(65) NOT NULL,
    clave_vendedor character varying(100) NOT NULL,
    solvencia_pnc character varying(1000) NOT NULL,
    antecendente_penal character varying(1000) NOT NULL,
    direccion_domicilio_vendedor character varying(300) NOT NULL,
    descripcion_vendedor character varying(500),
    status_vendedor boolean NOT NULL,
    foto_vendedor character varying(1000) NOT NULL,
    fecha_registro_vendedor date NOT NULL,
    coordenadas_vendedor character varying(2000) NOT NULL
);


ALTER TABLE public.vendedor OWNER TO postgres;

--
-- TOC entry 223 (class 1259 OID 34653)
-- Name: vendedor_id_vendedor_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.vendedor_id_vendedor_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.vendedor_id_vendedor_seq OWNER TO postgres;

--
-- TOC entry 3525 (class 0 OID 0)
-- Dependencies: 223
-- Name: vendedor_id_vendedor_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.vendedor_id_vendedor_seq OWNED BY public.vendedor.id_vendedor;


--
-- TOC entry 3244 (class 2604 OID 34620)
-- Name: administrador id_admin; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.administrador ALTER COLUMN id_admin SET DEFAULT nextval('public.administrador_id_admin_seq'::regclass);


--
-- TOC entry 3247 (class 2604 OID 34674)
-- Name: categoria id_categoria_producto; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.categoria ALTER COLUMN id_categoria_producto SET DEFAULT nextval('public.categoria_id_categoria_producto_seq'::regclass);


--
-- TOC entry 3239 (class 2604 OID 34553)
-- Name: cliente id_cliente; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cliente ALTER COLUMN id_cliente SET DEFAULT nextval('public.cliente_id_cliente_seq'::regclass);


--
-- TOC entry 3253 (class 2604 OID 34760)
-- Name: comentario_producto id_comentario; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.comentario_producto ALTER COLUMN id_comentario SET DEFAULT nextval('public.comentario_producto_id_comentario_seq'::regclass);


--
-- TOC entry 3254 (class 2604 OID 34772)
-- Name: comentario_repartidor id_comentario_repartidor; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.comentario_repartidor ALTER COLUMN id_comentario_repartidor SET DEFAULT nextval('public.comentario_repartidor_id_comentario_repartidor_seq'::regclass);


--
-- TOC entry 3240 (class 2604 OID 34568)
-- Name: datos_tarjeta id_datos_tarjeta; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.datos_tarjeta ALTER COLUMN id_datos_tarjeta SET DEFAULT nextval('public.datos_tarjeta_id_datos_tarjeta_seq'::regclass);


--
-- TOC entry 3241 (class 2604 OID 34582)
-- Name: departamento id_departamento; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.departamento ALTER COLUMN id_departamento SET DEFAULT nextval('public.departamento_id_departamento_seq'::regclass);


--
-- TOC entry 3252 (class 2604 OID 34743)
-- Name: detalle_factura id_detalle; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.detalle_factura ALTER COLUMN id_detalle SET DEFAULT nextval('public.detalle_factura_id_detalle_seq'::regclass);


--
-- TOC entry 3243 (class 2604 OID 34601)
-- Name: direccion id_direccion; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.direccion ALTER COLUMN id_direccion SET DEFAULT nextval('public.direccion_id_direccion_seq'::regclass);


--
-- TOC entry 3251 (class 2604 OID 34721)
-- Name: factura id_factura; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.factura ALTER COLUMN id_factura SET DEFAULT nextval('public.factura_id_factura_seq'::regclass);


--
-- TOC entry 3248 (class 2604 OID 34683)
-- Name: marca id_marca; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.marca ALTER COLUMN id_marca SET DEFAULT nextval('public.marca_id_marca_seq'::regclass);


--
-- TOC entry 3250 (class 2604 OID 34714)
-- Name: metodo_pago id_metodo_pago; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.metodo_pago ALTER COLUMN id_metodo_pago SET DEFAULT nextval('public.metodo_pago_id_metodo_pago_seq'::regclass);


--
-- TOC entry 3242 (class 2604 OID 34589)
-- Name: municipio id_municipio; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.municipio ALTER COLUMN id_municipio SET DEFAULT nextval('public.municipio_id_municipio_seq'::regclass);


--
-- TOC entry 3249 (class 2604 OID 34690)
-- Name: producto id_producto; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.producto ALTER COLUMN id_producto SET DEFAULT nextval('public.producto_id_producto_seq'::regclass);


--
-- TOC entry 3245 (class 2604 OID 34635)
-- Name: repartidor id_repartidor; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.repartidor ALTER COLUMN id_repartidor SET DEFAULT nextval('public.repartidor_id_repartidor_seq'::regclass);


--
-- TOC entry 3246 (class 2604 OID 34657)
-- Name: vendedor id_vendedor; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.vendedor ALTER COLUMN id_vendedor SET DEFAULT nextval('public.vendedor_id_vendedor_seq'::regclass);


--
-- TOC entry 3484 (class 0 OID 34617)
-- Dependencies: 220
-- Data for Name: administrador; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.administrador (id_admin, nombre_admin, apellido_admin, dui_admin, correo_admin, usuario_admin, clave_admin, fecha_registro_admin, telefono_admin, status_admin) FROM stdin;
1	Sandra	Abrego	45154215-8	Sandra_abrego@ricaldone.edu.sv	Sandra Abrego	$2y$10$7yEw4RfkRgmvMzWYApSSoe6hVpLYbqT3nbK7/mInVN9onSbC631kG	2022-06-29	7441-8552	t
2	David	Mata	84268426-3	DaviadM@ricaldone.edu.sv	David	$2y$10$7yEw4RfkRgmvMzWYApSSoe6hVpLYbqT3nbK7/mInVN9onSbC631kG	2022-06-29	8546-4521	t
3	Dylan	Connor	87126549-1	DylanC@ricaldone.edu.sv	DylanC	$2y$10$7yEw4RfkRgmvMzWYApSSoe6hVpLYbqT3nbK7/mInVN9onSbC631kG	2022-06-29	8139-1397	t
4	Katerina	Williams	02154526-0	Katerina@ricaldone.edu.sv	Kate	$2y$10$7yEw4RfkRgmvMzWYApSSoe6hVpLYbqT3nbK7/mInVN9onSbC631kG	2022-06-29	2015-4102	t
5	Aaron	Hills	20521502-4	AronHillss@ricaldone.edu.sv	Hills	$2y$10$7yEw4RfkRgmvMzWYApSSoe6hVpLYbqT3nbK7/mInVN9onSbC631kG	2022-06-29	1202-8521	t
\.


--
-- TOC entry 3490 (class 0 OID 34671)
-- Dependencies: 226
-- Data for Name: categoria; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.categoria (id_categoria_producto, categoria, imagen_categoria, status_categoria) FROM stdin;
1	Calzado	categoria.png	t
2	Tecnologia	categoria.png	t
3	Muebles	categoria.png	t
4	Deportes	categoria.png	t
5	Hogar	categoria.png	t
6	Juguetes	categoria.png	t
7	Damas	categoria.png	t
8	Caballero	categoria.png	t
9	Bebés	categoria.png	t
10	Niños	categoria.png	t
11	Salud	categoria.png	t
12	Belleza	categoria.png	t
\.


--
-- TOC entry 3474 (class 0 OID 34550)
-- Dependencies: 210
-- Data for Name: cliente; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.cliente (id_cliente, nombre_cliente, apellido_cliente, dui_cliente, correo_cliente, telefono_cliente, usuario_cliente, clave_cliente, status_cliente, fecha_registro_cliente) FROM stdin;
1	Carlos	Escamilla	15425843-9	Carlos@gmail.com	7458-5682	Carlos Escamilla	$2y$10$7yEw4RfkRgmvMzWYApSSoe6hVpLYbqT3nbK7/mInVN9onSbC631kG	t	2022-06-29
2	Karla	Mosterroza	45451225-0	KarlaM@gmail.com	6525-2512	Karla	$2y$10$7yEw4RfkRgmvMzWYApSSoe6hVpLYbqT3nbK7/mInVN9onSbC631kG	t	2022-06-29
3	Diego	Portillo	85451236-1	DiegoPortillo@gmail.com	1245-5623	DiePortillo	$2y$10$7yEw4RfkRgmvMzWYApSSoe6hVpLYbqT3nbK7/mInVN9onSbC631kG	t	2022-06-29
4	Alfonzo	Alfaro	85412547-8	AlfaroAlfonzo@gmail.com	7415-7458	Alfonzo	$2y$10$7yEw4RfkRgmvMzWYApSSoe6hVpLYbqT3nbK7/mInVN9onSbC631kG	t	2022-06-29
5	Dora	Ramos	85264512-7	RamosDora@gmail.com	8526-4512	DoraRamos	$2y$10$7yEw4RfkRgmvMzWYApSSoe6hVpLYbqT3nbK7/mInVN9onSbC631kG	t	2022-06-29
\.


--
-- TOC entry 3502 (class 0 OID 34757)
-- Dependencies: 238
-- Data for Name: comentario_producto; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.comentario_producto (id_comentario, valoracion, comentario, visible, id_detalle) FROM stdin;
11	5	Esta bonito	t	21
12	5	wow	t	22
13	5	Definitivo, esta bonito	t	23
14	5	Impresiona a todos	t	24
15	5	Todo esta bonito	t	25
\.


--
-- TOC entry 3504 (class 0 OID 34769)
-- Dependencies: 240
-- Data for Name: comentario_repartidor; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.comentario_repartidor (id_comentario_repartidor, valoracion, comentario, id_factura) FROM stdin;
6	5	Buen servicio	1
7	5	Buena persona	2
8	5	Todo a tiempo	2
9	5	Buena entrega	3
10	5	Todo bien	3
\.


--
-- TOC entry 3476 (class 0 OID 34565)
-- Dependencies: 212
-- Data for Name: datos_tarjeta; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.datos_tarjeta (id_datos_tarjeta, numero_tarjeta, ccv, vencimiento, nombre_titular, id_cliente) FROM stdin;
1	5540500001000004	989	2022-07-30	José María	1
2	5020470001370055 	123	2023-08-03	Francisco Silva	2
3	5020080001000006 	456	2027-09-15	Miguel Aguirre	3
4	4507670001000009 	789	2025-10-17	José María	4
5	4548812049400004 	741	2021-11-25	José Manuel	5
\.


--
-- TOC entry 3478 (class 0 OID 34579)
-- Dependencies: 214
-- Data for Name: departamento; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.departamento (id_departamento, nombre_departamento) FROM stdin;
1	Sonsonate
2	Ahuachapán
3	Santa Ana
4	La libertad
5	San Salvador
6	Cabañas
7	San Vicente
8	Morazan
9	La Unión
10	San Miguel
11	Cuscatlán
12	La Paz
13	Chalatenango
14	Usulután
\.


--
-- TOC entry 3500 (class 0 OID 34740)
-- Dependencies: 236
-- Data for Name: detalle_factura; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.detalle_factura (id_detalle, costo_envio, precio, status, cantidad_pedido, fecha_envio, id_factura, id_producto) FROM stdin;
21	12.56	456.23	t	1	2022-07-04 19:06:23.981905	1	8
22	10.99	526.12	t	1	2022-07-07 19:06:23.981905	3	9
23	5.86	366.99	t	1	2022-07-09 19:06:23.981905	2	10
24	4.49	456.23	t	1	2022-07-06 19:06:23.981905	2	7
25	2.25	45.99	t	10	2022-06-30 19:06:23.981905	3	6
\.


--
-- TOC entry 3482 (class 0 OID 34598)
-- Dependencies: 218
-- Data for Name: direccion; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.direccion (id_direccion, descripcion_direccion, punto_referencia, coordenadas, id_cliente, id_municipio) FROM stdin;
1	Avenida Monseñor Romero y Final Calle 5 de Noviembre entre 21ª y 23ª Calle Oriente, una cuadra al norte del Mercado San Miguelito.	Destrás de Mercado San Miguelito	13.710045, -89.1372527	1	1
2	Bo El Centro Av Claudia Lars No 1-1 . Sonsonate - Sonsonate.	Frente a la plaza principal	13.710045, -89.1372527	2	2
3	Av Quirino Chávez 50 . Apopa - San Salvador.	Cerca del hospital apopa	13.710045, -89.1372527	3	3
4	Av. Presbitero Jose Lucas España Villalobo, Frente a Parque José Matías Delgado.  o 2a. Calle Poniente y 6a. Av. Norte, Chalchuapa, Santa Ana, El Salvador.	Cerca de la catedral	13.710045, -89.1372527	4	4
5	1° avenida sur, Barrio Santa Rosa, Frente al Parque Central de Apastepeque, Apastepeque, San Vicente.	Frente al instituto naciona de Apastepeque	13.710045, -89.1372527	5	5
\.


--
-- TOC entry 3498 (class 0 OID 34718)
-- Dependencies: 234
-- Data for Name: factura; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.factura (id_factura, fecha_compra, status, total, id_repartidor, id_direccion, id_metodo_pago) FROM stdin;
1	2022-07-04 18:50:19.35175	t	84.21	1	2	1
2	2022-07-06 18:50:19.35175	t	75.74	2	3	2
3	2022-07-09 18:50:19.35175	t	67.06	3	1	1
4	2022-07-07 18:50:19.35175	t	185.00	4	4	2
\.


--
-- TOC entry 3492 (class 0 OID 34680)
-- Dependencies: 228
-- Data for Name: marca; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.marca (id_marca, nombre_marca, status_marca) FROM stdin;
1	La toscana	t
2	Adoc	t
3	Forever21	t
4	Toshiba	t
5	Samsung	t
\.


--
-- TOC entry 3496 (class 0 OID 34711)
-- Dependencies: 232
-- Data for Name: metodo_pago; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.metodo_pago (id_metodo_pago, metodo_pago) FROM stdin;
1	En efectivo
2	Tarjeta de crédito
3	Tarjeta de débito
\.


--
-- TOC entry 3480 (class 0 OID 34586)
-- Dependencies: 216
-- Data for Name: municipio; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.municipio (id_municipio, nombre_municipio, id_departamento) FROM stdin;
1	San Salvador	5
2	Sonsonate	1
3	Apopa	5
4	Chalchuapa	3
5	Apastepeque	7
6	Chinameca	10
\.


--
-- TOC entry 3494 (class 0 OID 34687)
-- Dependencies: 230
-- Data for Name: producto; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.producto (id_producto, nombre_producto, cantidad_producto, descripcion_producto, precio_producto, imagen, status_producto, id_categoria, id_vendedor, id_marca) FROM stdin;
6	Televisor	500	Televisor de alta gama, y de gran tamaño	456.23	producto.png	t	3	6	1
7	Sofá	750	Sofa para 4 personas, muy comodo y portatil	366.99	producto.png	t	2	2	2
8	Cocina	50	Cocina eléctrica con alta potencia y rápida	526.12	producto.png	t	3	3	3
9	Zapatos	150	Zapatos de tela y cuero, casuales y de gran prestigio	120.00	producto.png	t	3	4	4
10	Camisa	1500	Camisa a base de algodón, muy sueve pero resistente	45.99	producto.png	t	3	2	1
\.


--
-- TOC entry 3486 (class 0 OID 34632)
-- Dependencies: 222
-- Data for Name: repartidor; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.repartidor (id_repartidor, nombre_repartidor, apellido_repartidor, dui_repartidor, correo_repartidor, usuario_repartidor, telefono_repartidor, clave_repartidor, solvencia_pnc, antecedente_penal, direccion_domicilio, placa_vehiculo, foto_placa_vehiculo, foto_repartidor, foto_vehiculo, status_repartidor, fecha_registro, id_admin) FROM stdin;
1	Madison	Pérez	74581245-8	Mady@gmail.com	Madison	7415-4125	$2y$10$7yEw4RfkRgmvMzWYApSSoe6hVpLYbqT3nbK7/mInVN9onSbC631kG	solvencia.png	antecedente.png	Blvd Del Ejérc Nac Urb Altos Del Boulevard 50 Av Nte	P745812	placa.png	foto.png	vehiculo.png	t	2022-06-29	1
2	Alexander	OConnor	85457412-1	AlexA@gmail.com	AConnor	6521-4102	$2y$10$7yEw4RfkRgmvMzWYApSSoe6hVpLYbqT3nbK7/mInVN9onSbC631kG	solvencia.png	antecedente.png	Calle Gerardo Barrios, 17 AV. Sur #412	P451245	placa.png	foto.png	vehiculo.png	t	2022-06-29	2
3	Logan	Harris	52151021-3	LoganHarris@gmail.com	Login	7425-1214	$2y$10$7yEw4RfkRgmvMzWYApSSoe6hVpLYbqT3nbK7/mInVN9onSbC631kG	solvencia.png	antecedente.png	Alam Roosevelt 37 Av S 114	P414152	placa.png	foto.png	vehiculo.png	t	2022-06-29	3
4	Taylor	Hetfield	45251254-2	Hetfield@gmail.com	Hetfield	2021-2526	$2y$10$7yEw4RfkRgmvMzWYApSSoe6hVpLYbqT3nbK7/mInVN9onSbC631kG	solvencia.png	antecedente.png	AVENIDA NIÑOS HEROES NO. 3	P748596	placa.png	foto.png	vehiculo.png	t	2022-06-29	1
5	Kevin	Salamanca	12345678-6	Kevin@gmail.com	Kevin Salamanca	6565-5454	$2y$10$7yEw4RfkRgmvMzWYApSSoe6hVpLYbqT3nbK7/mInVN9onSbC631kG	solvencia.png	antecedente.png	CARRETERA MEXICO-LAREDO KM.125	P512458	placa.png	foto.png	vehiculo.png	t	2022-06-29	1
\.


--
-- TOC entry 3488 (class 0 OID 34654)
-- Dependencies: 224
-- Data for Name: vendedor; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.vendedor (id_vendedor, nombre_vendedor, apellido_vendedor, dui_vendedor, correo_vendedor, telefono_vendedor, usuario_vendedor, clave_vendedor, solvencia_pnc, antecendente_penal, direccion_domicilio_vendedor, descripcion_vendedor, status_vendedor, foto_vendedor, fecha_registro_vendedor, coordenadas_vendedor) FROM stdin;
2	Juan Sam	Arevalo Fuentes	12345678-9	juan@gmail.com	7878-7878	juan	$2y$10$7yEw4RfkRgmvMzWYApSSoe6hVpLYbqT3nbK7/mInVN9onSbC631kG	solvencia.png	antecedente.png	Calle 1 AV 1	Alto,cabello largo, moreno	t	vendedor.png	2022-06-29	13.710045, -89.1372527
3	Gerardo Ernesto	Garcia Dominguez	20345678-9	gerardo@gmail.com	7979-7979	gerardo	$2y$10$7yEw4RfkRgmvMzWYApSSoe6hVpLYbqT3nbK7/mInVN9onSbC631kG	solvencia.png	antecedente.png	Calle 2 AV 2	Alto,cabello corto, moreno	t	vendedor.png	2022-06-29	13.710045, -89.1372527
4	Gio Omar	Arias Guzman	34567890-9	gio@gmail.com	7070-7070	gio	$2y$10$7yEw4RfkRgmvMzWYApSSoe6hVpLYbqT3nbK7/mInVN9onSbC631kG	solvencia.png	antecedente.png	Calle 1 AV 1	Alto,cabello largo, moreno	t	vendedor.png	2022-06-29	13.710045, -89.1372527
5	Bonilla Rodrigo	Ceron Portillo	45678989-9	bonilla@gmail.com	7515-7557	bonilla	$2y$10$7yEw4RfkRgmvMzWYApSSoe6hVpLYbqT3nbK7/mInVN9onSbC631kG	solvencia.png	antecedente.png	Calle 1 AV 1	Alto,cabello largo, moreno	t	vendedor.png	2022-06-29	13.710045, -89.1372527
6	Oliver Alejandro	Erazo Reyes	56789078-9	oliver@gmail.com	7272-7272	oliver	$2y$10$7yEw4RfkRgmvMzWYApSSoe6hVpLYbqT3nbK7/mInVN9onSbC631kG	solvencia.png	antecedente.png	Calle 1 AV 1	Alto,cabello largo, moreno	t	vendedor.png	2022-06-29	13.710045, -89.1372527
\.


--
-- TOC entry 3526 (class 0 OID 0)
-- Dependencies: 219
-- Name: administrador_id_admin_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.administrador_id_admin_seq', 5, true);


--
-- TOC entry 3527 (class 0 OID 0)
-- Dependencies: 225
-- Name: categoria_id_categoria_producto_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.categoria_id_categoria_producto_seq', 12, true);


--
-- TOC entry 3528 (class 0 OID 0)
-- Dependencies: 209
-- Name: cliente_id_cliente_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.cliente_id_cliente_seq', 5, true);


--
-- TOC entry 3529 (class 0 OID 0)
-- Dependencies: 237
-- Name: comentario_producto_id_comentario_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.comentario_producto_id_comentario_seq', 15, true);


--
-- TOC entry 3530 (class 0 OID 0)
-- Dependencies: 239
-- Name: comentario_repartidor_id_comentario_repartidor_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.comentario_repartidor_id_comentario_repartidor_seq', 10, true);


--
-- TOC entry 3531 (class 0 OID 0)
-- Dependencies: 211
-- Name: datos_tarjeta_id_datos_tarjeta_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.datos_tarjeta_id_datos_tarjeta_seq', 5, true);


--
-- TOC entry 3532 (class 0 OID 0)
-- Dependencies: 213
-- Name: departamento_id_departamento_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.departamento_id_departamento_seq', 14, true);


--
-- TOC entry 3533 (class 0 OID 0)
-- Dependencies: 235
-- Name: detalle_factura_id_detalle_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.detalle_factura_id_detalle_seq', 25, true);


--
-- TOC entry 3534 (class 0 OID 0)
-- Dependencies: 217
-- Name: direccion_id_direccion_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.direccion_id_direccion_seq', 5, true);


--
-- TOC entry 3535 (class 0 OID 0)
-- Dependencies: 233
-- Name: factura_id_factura_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.factura_id_factura_seq', 4, true);


--
-- TOC entry 3536 (class 0 OID 0)
-- Dependencies: 227
-- Name: marca_id_marca_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.marca_id_marca_seq', 5, true);


--
-- TOC entry 3537 (class 0 OID 0)
-- Dependencies: 231
-- Name: metodo_pago_id_metodo_pago_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.metodo_pago_id_metodo_pago_seq', 3, true);


--
-- TOC entry 3538 (class 0 OID 0)
-- Dependencies: 215
-- Name: municipio_id_municipio_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.municipio_id_municipio_seq', 6, true);


--
-- TOC entry 3539 (class 0 OID 0)
-- Dependencies: 229
-- Name: producto_id_producto_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.producto_id_producto_seq', 10, true);


--
-- TOC entry 3540 (class 0 OID 0)
-- Dependencies: 221
-- Name: repartidor_id_repartidor_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.repartidor_id_repartidor_seq', 5, true);


--
-- TOC entry 3541 (class 0 OID 0)
-- Dependencies: 223
-- Name: vendedor_id_vendedor_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.vendedor_id_vendedor_seq', 6, true);


--
-- TOC entry 3274 (class 2606 OID 34626)
-- Name: administrador administrador_correo_admin_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.administrador
    ADD CONSTRAINT administrador_correo_admin_key UNIQUE (correo_admin);


--
-- TOC entry 3276 (class 2606 OID 34624)
-- Name: administrador administrador_dui_admin_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.administrador
    ADD CONSTRAINT administrador_dui_admin_key UNIQUE (dui_admin);


--
-- TOC entry 3278 (class 2606 OID 34622)
-- Name: administrador administrador_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.administrador
    ADD CONSTRAINT administrador_pkey PRIMARY KEY (id_admin);


--
-- TOC entry 3280 (class 2606 OID 34630)
-- Name: administrador administrador_telefono_admin_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.administrador
    ADD CONSTRAINT administrador_telefono_admin_key UNIQUE (telefono_admin);


--
-- TOC entry 3282 (class 2606 OID 34628)
-- Name: administrador administrador_usuario_admin_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.administrador
    ADD CONSTRAINT administrador_usuario_admin_key UNIQUE (usuario_admin);


--
-- TOC entry 3304 (class 2606 OID 34678)
-- Name: categoria categoria_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.categoria
    ADD CONSTRAINT categoria_pkey PRIMARY KEY (id_categoria_producto);


--
-- TOC entry 3256 (class 2606 OID 34559)
-- Name: cliente cliente_correo_cliente_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT cliente_correo_cliente_key UNIQUE (correo_cliente);


--
-- TOC entry 3258 (class 2606 OID 34557)
-- Name: cliente cliente_dui_cliente_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT cliente_dui_cliente_key UNIQUE (dui_cliente);


--
-- TOC entry 3260 (class 2606 OID 34555)
-- Name: cliente cliente_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT cliente_pkey PRIMARY KEY (id_cliente);


--
-- TOC entry 3262 (class 2606 OID 34561)
-- Name: cliente cliente_telefono_cliente_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT cliente_telefono_cliente_key UNIQUE (telefono_cliente);


--
-- TOC entry 3264 (class 2606 OID 34563)
-- Name: cliente cliente_usuario_cliente_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT cliente_usuario_cliente_key UNIQUE (usuario_cliente);


--
-- TOC entry 3316 (class 2606 OID 34762)
-- Name: comentario_producto comentario_producto_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.comentario_producto
    ADD CONSTRAINT comentario_producto_pkey PRIMARY KEY (id_comentario);


--
-- TOC entry 3318 (class 2606 OID 34774)
-- Name: comentario_repartidor comentario_repartidor_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.comentario_repartidor
    ADD CONSTRAINT comentario_repartidor_pkey PRIMARY KEY (id_comentario_repartidor);


--
-- TOC entry 3266 (class 2606 OID 34572)
-- Name: datos_tarjeta datos_tarjeta_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.datos_tarjeta
    ADD CONSTRAINT datos_tarjeta_pkey PRIMARY KEY (id_datos_tarjeta);


--
-- TOC entry 3268 (class 2606 OID 34584)
-- Name: departamento departamento_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.departamento
    ADD CONSTRAINT departamento_pkey PRIMARY KEY (id_departamento);


--
-- TOC entry 3314 (class 2606 OID 34745)
-- Name: detalle_factura detalle_factura_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.detalle_factura
    ADD CONSTRAINT detalle_factura_pkey PRIMARY KEY (id_detalle);


--
-- TOC entry 3272 (class 2606 OID 34605)
-- Name: direccion direccion_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.direccion
    ADD CONSTRAINT direccion_pkey PRIMARY KEY (id_direccion);


--
-- TOC entry 3312 (class 2606 OID 34723)
-- Name: factura factura_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.factura
    ADD CONSTRAINT factura_pkey PRIMARY KEY (id_factura);


--
-- TOC entry 3306 (class 2606 OID 34685)
-- Name: marca marca_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.marca
    ADD CONSTRAINT marca_pkey PRIMARY KEY (id_marca);


--
-- TOC entry 3310 (class 2606 OID 34716)
-- Name: metodo_pago metodo_pago_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.metodo_pago
    ADD CONSTRAINT metodo_pago_pkey PRIMARY KEY (id_metodo_pago);


--
-- TOC entry 3270 (class 2606 OID 34591)
-- Name: municipio municipio_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.municipio
    ADD CONSTRAINT municipio_pkey PRIMARY KEY (id_municipio);


--
-- TOC entry 3308 (class 2606 OID 34694)
-- Name: producto producto_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.producto
    ADD CONSTRAINT producto_pkey PRIMARY KEY (id_producto);


--
-- TOC entry 3284 (class 2606 OID 34643)
-- Name: repartidor repartidor_correo_repartidor_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.repartidor
    ADD CONSTRAINT repartidor_correo_repartidor_key UNIQUE (correo_repartidor);


--
-- TOC entry 3286 (class 2606 OID 34641)
-- Name: repartidor repartidor_dui_repartidor_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.repartidor
    ADD CONSTRAINT repartidor_dui_repartidor_key UNIQUE (dui_repartidor);


--
-- TOC entry 3288 (class 2606 OID 34639)
-- Name: repartidor repartidor_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.repartidor
    ADD CONSTRAINT repartidor_pkey PRIMARY KEY (id_repartidor);


--
-- TOC entry 3290 (class 2606 OID 34647)
-- Name: repartidor repartidor_telefono_repartidor_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.repartidor
    ADD CONSTRAINT repartidor_telefono_repartidor_key UNIQUE (telefono_repartidor);


--
-- TOC entry 3292 (class 2606 OID 34645)
-- Name: repartidor repartidor_usuario_repartidor_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.repartidor
    ADD CONSTRAINT repartidor_usuario_repartidor_key UNIQUE (usuario_repartidor);


--
-- TOC entry 3294 (class 2606 OID 34665)
-- Name: vendedor vendedor_correo_vendedor_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.vendedor
    ADD CONSTRAINT vendedor_correo_vendedor_key UNIQUE (correo_vendedor);


--
-- TOC entry 3296 (class 2606 OID 34663)
-- Name: vendedor vendedor_dui_vendedor_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.vendedor
    ADD CONSTRAINT vendedor_dui_vendedor_key UNIQUE (dui_vendedor);


--
-- TOC entry 3298 (class 2606 OID 34661)
-- Name: vendedor vendedor_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.vendedor
    ADD CONSTRAINT vendedor_pkey PRIMARY KEY (id_vendedor);


--
-- TOC entry 3300 (class 2606 OID 34667)
-- Name: vendedor vendedor_telefono_vendedor_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.vendedor
    ADD CONSTRAINT vendedor_telefono_vendedor_key UNIQUE (telefono_vendedor);


--
-- TOC entry 3302 (class 2606 OID 34669)
-- Name: vendedor vendedor_usuario_vendedor_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.vendedor
    ADD CONSTRAINT vendedor_usuario_vendedor_key UNIQUE (usuario_vendedor);


--
-- TOC entry 3323 (class 2606 OID 34648)
-- Name: repartidor fk_admin; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.repartidor
    ADD CONSTRAINT fk_admin FOREIGN KEY (id_admin) REFERENCES public.administrador(id_admin);


--
-- TOC entry 3324 (class 2606 OID 34695)
-- Name: producto fk_categoria; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.producto
    ADD CONSTRAINT fk_categoria FOREIGN KEY (id_categoria) REFERENCES public.categoria(id_categoria_producto);


--
-- TOC entry 3321 (class 2606 OID 34606)
-- Name: direccion fk_cliente; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.direccion
    ADD CONSTRAINT fk_cliente FOREIGN KEY (id_cliente) REFERENCES public.cliente(id_cliente);


--
-- TOC entry 3319 (class 2606 OID 34573)
-- Name: datos_tarjeta fk_cliente_datos; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.datos_tarjeta
    ADD CONSTRAINT fk_cliente_datos FOREIGN KEY (id_cliente) REFERENCES public.cliente(id_cliente);


--
-- TOC entry 3320 (class 2606 OID 34592)
-- Name: municipio fk_departamento_municipio; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.municipio
    ADD CONSTRAINT fk_departamento_municipio FOREIGN KEY (id_departamento) REFERENCES public.departamento(id_departamento);


--
-- TOC entry 3332 (class 2606 OID 34763)
-- Name: comentario_producto fk_detalle_comentario; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.comentario_producto
    ADD CONSTRAINT fk_detalle_comentario FOREIGN KEY (id_detalle) REFERENCES public.detalle_factura(id_detalle);


--
-- TOC entry 3328 (class 2606 OID 34729)
-- Name: factura fk_direccion_factura; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.factura
    ADD CONSTRAINT fk_direccion_factura FOREIGN KEY (id_direccion) REFERENCES public.direccion(id_direccion);


--
-- TOC entry 3333 (class 2606 OID 34775)
-- Name: comentario_repartidor fk_factura_comentario_repartidor; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.comentario_repartidor
    ADD CONSTRAINT fk_factura_comentario_repartidor FOREIGN KEY (id_factura) REFERENCES public.factura(id_factura);


--
-- TOC entry 3330 (class 2606 OID 34746)
-- Name: detalle_factura fk_factura_detalle; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.detalle_factura
    ADD CONSTRAINT fk_factura_detalle FOREIGN KEY (id_factura) REFERENCES public.factura(id_factura);


--
-- TOC entry 3326 (class 2606 OID 34705)
-- Name: producto fk_marca; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.producto
    ADD CONSTRAINT fk_marca FOREIGN KEY (id_marca) REFERENCES public.marca(id_marca);


--
-- TOC entry 3329 (class 2606 OID 34734)
-- Name: factura fk_metodo_factura; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.factura
    ADD CONSTRAINT fk_metodo_factura FOREIGN KEY (id_metodo_pago) REFERENCES public.metodo_pago(id_metodo_pago);


--
-- TOC entry 3322 (class 2606 OID 34611)
-- Name: direccion fk_municipio; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.direccion
    ADD CONSTRAINT fk_municipio FOREIGN KEY (id_municipio) REFERENCES public.municipio(id_municipio);


--
-- TOC entry 3331 (class 2606 OID 34751)
-- Name: detalle_factura fk_producto_detalle; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.detalle_factura
    ADD CONSTRAINT fk_producto_detalle FOREIGN KEY (id_producto) REFERENCES public.producto(id_producto);


--
-- TOC entry 3327 (class 2606 OID 34724)
-- Name: factura fk_repartidor_factura; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.factura
    ADD CONSTRAINT fk_repartidor_factura FOREIGN KEY (id_repartidor) REFERENCES public.repartidor(id_repartidor);


--
-- TOC entry 3325 (class 2606 OID 34700)
-- Name: producto fk_vendedor; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.producto
    ADD CONSTRAINT fk_vendedor FOREIGN KEY (id_vendedor) REFERENCES public.vendedor(id_vendedor);


-- Completed on 2022-06-29 18:55:16

--
-- PostgreSQL database dump complete
--

