package com.gaoxinfu.springboot.sample.jsp.repository;

import com.gaoxinfu.springboot.sample.jsp.model.Book;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BookRepository extends JpaRepository<Book, Integer> {
}
