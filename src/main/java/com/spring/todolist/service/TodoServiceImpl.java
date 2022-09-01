package com.spring.todolist.service;

import com.spring.todolist.model.Todo;
import com.spring.todolist.repository.TodoRepository;
import org.springframework.beans.factory.annotation.Autowired;

public class TodoServiceImpl implements TodoService {

    @Autowired
    TodoRepository todoRepo;

    @Override
    public Todo addTodo(Todo todo) {
        return todoRepo.save(todo);
    }
}
