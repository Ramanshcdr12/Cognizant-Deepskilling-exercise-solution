package com.library;

import com.library.repository.BookRepository;
import com.library.service.BookService;
import org.springframework.context.support.ClassPathXmlApplicationContext;

public class LibraryManagementApplication {
    public static void main(String[] args) {
        try (ClassPathXmlApplicationContext context = new ClassPathXmlApplicationContext("applicationContext.xml")) {
            BookService service = context.getBean("bookService", BookService.class);
            BookRepository repository = context.getBean("bookRepository", BookRepository.class);
            System.out.println(service.getServiceName());
            System.out.println(repository.getRepositoryName());
        }
    }
}
