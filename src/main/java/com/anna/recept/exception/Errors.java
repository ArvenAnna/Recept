package com.anna.recept.exception;

import lombok.Getter;

@Getter
public enum Errors {
    FILE_NOT_FOUND("К сожалению, файл не найден"),
    RECEPT_NAME_NOT_UNIQUE("Имя рецепта совпадает с существующим"),
    INGRIDIENT_NAME_NOT_UNIQUE("Название ингридиента совпадает с существующим"),
    DEPART_NOT_EXISTS("Нет такого раздела"),
    ID_MUST_BE_NULL("Новая запись не должна содаржать уникальный идентификатор"),
    NOT_NULL("Данные не полные"),
    XML_PARSING_ERROR("Ошибка парсинга"),
    XSD_PARSING_ERROR("Ошибка парсинга XSD"),
    XSD_VALIDATION_ERROR("XML не соответсвует XSD схеме"),
    PDF_TRANSFORM_ERROR("Ошибка PDF трансформации");

    private String cause;

    Errors(final String cause) {
        this.cause = cause;
    }
}
