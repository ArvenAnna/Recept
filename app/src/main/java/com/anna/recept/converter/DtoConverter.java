package com.anna.recept.converter;

import com.anna.recept.entity.*;
import lombok.AccessLevel;
import lombok.NoArgsConstructor;

import java.util.stream.Collectors;

@NoArgsConstructor(access = AccessLevel.PRIVATE)
public class DtoConverter {

    public static Recept toReceptDto(Recept recept) {
        Recept dto = new Recept();
        dto.setId(recept.getId());
        dto.setName(recept.getName());
        dto.setImgPath(recept.getImgPath());
        return dto;
    }

    public static Recept withChildren(Recept recept) {
        Recept dto = toReceptDto(recept);
        dto.setText(recept.getText());
        dto.setProportions(recept.getProportions().stream()
                .map(DtoConverter::toProportionDto)
                .collect(Collectors.toList()));
        dto.setDepartment(toDepartmentDto(recept.getDepartment()));
        dto.setDetails(recept.getDetails().stream()
                .map(DtoConverter::toDetailDto)
                .collect(Collectors.toList()));
        dto.setRefs(recept.getRefs().stream()
                .map(DtoConverter::toReceptDto)
                .collect(Collectors.toList()));
        dto.setTags(recept.getTags().stream()
                .map(DtoConverter::toTagDto)
                .collect(Collectors.toList()));
        return dto;
    }

    public static Tag toTagDto(Tag tag) {
        Tag dto = new Tag();
        dto.setId(tag.getId());
        dto.setName(tag.getName());
        return dto;
    }

    private static Detail toDetailDto(Detail detail) {
        Detail dto = new Detail();
        dto.setId(detail.getId());
        dto.setDescription(detail.getDescription());
        dto.setFilePath(detail.getFilePath());
        return dto;
    }

    public static Department toDepartmentDto(Department department) {
        Department dto = new Department();
        dto.setId(department.getId());
        dto.setName(department.getName());
        return dto;
    }

    public static Proportion toProportionDto(Proportion proportion) {
        Proportion dto = new Proportion();
        dto.setId(proportion.getId());
        dto.setNorma(proportion.getNorma());
        dto.setIngridient(toIngridientDto(proportion.getIngridient()));
        return dto;
    }

    public static Ingridient toIngridientDto(Ingridient ingridient) {
        Ingridient dto = new Ingridient();
        dto.setId(ingridient.getId());
        dto.setName(ingridient.getName());
        return dto;
    }
}
