package com.mcdonalds.foodordering.controller;

import com.mcdonalds.foodordering.exception.EntityValidationException;
import com.mcdonalds.foodordering.exception.ExceptionPayload;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.Map;
import java.util.function.Function;
import java.util.stream.Collectors;

@RestControllerAdvice
public class ExceptionController {

  @ExceptionHandler(MethodArgumentNotValidException.class)
  @ResponseStatus(HttpStatus.BAD_REQUEST)
  public Map<String, ?> handleConstraintViolationException(MethodArgumentNotValidException ex) {
    return ex.getBindingResult()
        .getAllErrors()
        .stream()
        .map(x -> (FieldError) x)
        .map(this::buildValidationExceptionPayload)
        .collect(Collectors.toMap(this::buildKey, Function.identity(), ExceptionPayload::mergeValues));
  }

  @ExceptionHandler(EntityNotFoundException.class)
  @ResponseStatus(HttpStatus.BAD_REQUEST)
  public ExceptionPayload handleEntityNotFoundException(EntityNotFoundException ex) {
    return ExceptionPayload.builder()
        .code("EntityNotFound")
        .message(ex.getMessage())
        .build();
  }

  @ExceptionHandler(EntityValidationException.class)
  @ResponseStatus(HttpStatus.BAD_REQUEST)
  public Map<String, ?> handleEntityNotFoundException(EntityValidationException ex) {
    return Map.of(ex.getExceptionPayload().getFieldName(), ex.getExceptionPayload());
  }

  private String buildKey(ExceptionPayload exceptionPayload) {
    return exceptionPayload.getFieldName().split("\\.")[0];
  }

  private ExceptionPayload buildValidationExceptionPayload(FieldError fieldError) {
    ExceptionPayload exceptionPayload = new ExceptionPayload();
    exceptionPayload.setFieldName(fieldError.getField());
    exceptionPayload.setCode(fieldError.getCode());
    exceptionPayload.setMessage(fieldError.getDefaultMessage());
    exceptionPayload.setRejectedValue(fieldError.getRejectedValue());

    return exceptionPayload;
  }

}
