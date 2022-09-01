package com.spring.todolist.repository;

import com.spring.todolist.model.Todo;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TodoRepository extends JpaRepository<Todo, Long> {

}
