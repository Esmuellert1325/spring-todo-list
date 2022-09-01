package com.spring.todolist.model;

import lombok.*;

import javax.persistence.*;

@Entity
@Table(name = "todos")
@Getter
@Setter
@NoArgsConstructor
public class Todo {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private String description;
    private String added_on;
    private boolean completed;

    public Todo(String name, String description, String added_on, boolean completed) {
        this.name = name;
        this.description = description;
        this.added_on = added_on;
        this.completed = completed;
    }
}
