package com.spring.todolist.controller;

import com.spring.todolist.model.Todo;
import com.spring.todolist.repository.TodoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

@RestController
@RequestMapping("/todos")
@CrossOrigin
public class TodoController {

    private SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");

    @Autowired
    private TodoRepository todoRepo;

    @GetMapping("/getAll")
    public List<Todo> getAll() {
        return todoRepo.findAll();
    }

    @PostMapping("/add")
    public void add(@RequestBody Todo todo) {
        todo.setAdded_on(sdf.format(new Date()));
        todo.setCompleted(false);
        todoRepo.save(todo);
    }

    @DeleteMapping("/delete/{id}")
    public void deleteTodoById(@PathVariable Long id) {
        todoRepo.deleteById(id);
    }

    @DeleteMapping("/deleteAllSelected/{ids}")
    public void deleteAllSelected(@PathVariable List<Long> ids) {
        for (Long id : ids) todoRepo.deleteById(id);
    }
}
