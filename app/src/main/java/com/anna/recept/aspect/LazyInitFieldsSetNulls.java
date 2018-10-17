package com.anna.recept.aspect;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

@Target({ElementType.METHOD})
@Retention(RetentionPolicy.RUNTIME)
public @interface LazyInitFieldsSetNulls {
	//int depth() default 1; //max depth of object tree returned
}
