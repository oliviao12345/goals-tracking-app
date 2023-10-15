package com.spring.backend.backend2.java.repository;


import com.spring.backend.backend2.java.models.GoalsModel;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface GoalsRepository extends MongoRepository<GoalsModel, String> {

    GoalsModel findByName(String name);
    GoalsModel findByGoal (String goal);
    GoalsModel findByCodingLanguage (String codingLanguage);

    // Find all goals
    List<GoalsModel> findAll();

    // Find a goal by ID
    Optional<GoalsModel> findById(String id);

    // Save a new goal
    GoalsModel save(GoalsModel goal);

    // <S extends GoalsModel> S save(S goal);


    // Delete a goal by ID
    void deleteById(String id);

    // Delete all goals
    void deleteAll();

}

