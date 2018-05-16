package com.anna.recept.utils;

import java.util.List;
import java.util.ListIterator;
import java.util.function.Predicate;
import java.util.stream.Collectors;

public class MergeObjects {

    public static <T> void deleteItemsNotPresentInSecond(List<T> first, List<T> second) {
        ListIterator<T> iter = first.listIterator();
        while(iter.hasNext()) {
            T fi = iter.next();
            boolean isAbsent = !second.stream().filter(si -> fi.equals(si)).findAny().isPresent();
            if (isAbsent) {
                iter.remove();
            }
        }
    }

    public static <T> List<T> getItemsNotPresentInSecond(List<T> first, List<T> second) {
        Predicate<T> isNotInSecond = (fi) ->
            !second.stream().filter(si -> fi.equals(si)).findAny().isPresent();

        return first.stream().filter(isNotInSecond).collect(Collectors.toList());
    }
}
