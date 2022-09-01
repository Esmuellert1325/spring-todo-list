package com.spring.todolist;

import com.spring.todolist.model.Todo;
import com.spring.todolist.repository.TodoRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import java.text.SimpleDateFormat;
import java.util.Date;

@SpringBootApplication
public class TodoListApplication {

	SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");

	public static void main(String[] args) {
		SpringApplication.run(TodoListApplication.class, args);
	}

	@Bean
	public CommandLineRunner demoData(TodoRepository todoRepo) {
		return args -> {
			todoRepo.save(new Todo("Homework", "Chemistry, Physics and Mathematics", sdf.format(new Date()), false));
			todoRepo.save(new Todo("Clean kitchen", "Kitchen counter, shelves, table, chairs", sdf.format(new Date()), false));
			todoRepo.save(new Todo("Visit Mike", "At 6pm, saturday night", sdf.format(new Date()), true));
		};
	}
}
