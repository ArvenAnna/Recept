package com.anna.recept.aspect;

import java.lang.reflect.Field;
import java.util.ArrayList;

import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Pointcut;
import org.aspectj.lang.reflect.MethodSignature;
import org.hibernate.LazyInitializationException;
import org.hibernate.collection.internal.PersistentBag;
import org.springframework.stereotype.Component;

@Aspect
@Component
public class LazyInitFieldsNullSetterAspect {

	@Pointcut("@annotation(com.anna.recept.aspect.LazyInitFieldsSetNulls)")// the pointcut expression
	private void annotatedPointcut() {}


	@Around("annotatedPointcut()")
	public Object fillNulls(ProceedingJoinPoint pjp) throws Throwable {
		//String methodName = pjp.getSignature().getName();

		MethodSignature signature = (MethodSignature) pjp.getSignature();

		//Class returnType = signature.getReturnType();

		Object returnValue = pjp.proceed();

//		Field[] fields = returnValue.getClass().getDeclaredFields();
//
//		for (Field field : fields) {   // repeat to depthLevel from annotation
//			field.setAccessible(true);
//
//			if (field.get(returnValue) instanceof PersistentBag) { // if it is Proxied
//
//				PersistentBag pb = (PersistentBag) field.get(returnValue);
//				pb.size();
//				field.set(returnValue, new ArrayList<>()); // only for non-primitives
//			}
//		}

		return returnValue;
//		returnType.cast(returnValue);

	}
}
