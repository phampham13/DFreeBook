package com.example.LibraryJavaBe.BookService.Repository;

import com.example.LibraryJavaBe.BookService.Entities.BorrowerCard;
import com.example.LibraryJavaBe.BookService.Entities.Event;
import org.springframework.data.jpa.repository.JpaRepository;

public interface cate_bookRepo extends JpaRepository<Event,Integer> {

}
