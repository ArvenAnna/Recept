package com.anna.recept.dto;

import lombok.*;

import java.util.List;
import java.util.Map;

@Getter
@Setter
@ToString
@EqualsAndHashCode
@NoArgsConstructor
public class ReceptXmlDto {
    private String text;
    private String name;
    private String departName;
    private Map<String, String> proportions;
    private List<String> references;
    private List<String> tags;
}
