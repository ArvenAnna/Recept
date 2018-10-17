package com.anna.recept.exception;

import lombok.Getter;

@Getter
public enum Errors {
    FILE_NOT_FOUND("К сожалению, файл не найден"),
    RECIPE_NAME_NOT_UNIQUE("Имя рецепта совпадает с существующим"),
    TAG_NAME_NOT_UNIQUE("Тэг совпадает с существующим"),
    DEPART_NAME_NOT_UNIQUE("Название раздела совпадает с существующим"),
    RECIPE_NAME_NULL("Имя рецепта не должно быть пустым"),
    RECIPE_DEPART_NULL("Раздел рецепта должен біть задан"),
    INGREDIENT_NAME_NOT_UNIQUE("Название ингридиента совпадает с существующим"),
    DEPART_NOT_EXISTS("Нет такого раздела"),
    ID_MUST_BE_NULL("Новая запись не должна содержать уникальный идентификатор"),
    ID_MUST_NOT_BE_NULL("Запись олжна содержать уникальный идентификатор"),
    REQUEST_MUST_NOT_BE_NULL("Запрос не должен быть с пустым телом"),
    NOT_NULL("Данные не полные"),
    XML_PARSING_ERROR("Ошибка парсинга"),
    XSD_PARSING_ERROR("Ошибка парсинга XSD"),
    XSD_VALIDATION_ERROR("XML не соответсвует XSD схеме"),
    PDF_TRANSFORM_ERROR("Ошибка PDF трансформации"),
    RECIPE_NOT_FOUND("Данный рецепт отсутствует"),
    INGREDIENT_NOT_FOUND("Данный ингридиент отсутствует"),
    TAG_NOT_FOUND("Данный тэг отсутствует"),
    DEPART_NOT_FOUND("Данный раздел отсутствует");

    private String cause;

    Errors(final String cause) {
        this.cause = cause;
    }
}
