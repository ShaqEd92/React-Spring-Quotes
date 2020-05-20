package com.shaquille.quotes.repos;

import com.shaquille.quotes.models.Tag;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TagRepository extends JpaRepository<Tag, Integer> {
    Integer findByName(String name);
}


