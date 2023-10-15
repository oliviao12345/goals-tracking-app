package com.spring.backend.backend2.java.service;


import com.spring.backend.backend2.java.models.GoalsModel;
import com.spring.backend.backend2.java.repository.GoalsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class GoalsService {
    private final GoalsRepository goalsRepository;

    @Autowired
    public GoalsService(GoalsRepository goalsRepository) {
        this.goalsRepository = goalsRepository;
    }

    public GoalsModel createGoal(GoalsModel goal){
        return goalsRepository.save(goal);
    }
    public List<GoalsModel> getAllGoals(){
        return goalsRepository.findAll();
    }

    public GoalsModel getGoalsByGoal(String goal){
        return goalsRepository.findByGoal(goal);
    }

    public GoalsModel getGoalByCodingLanguage(String codingLanguage){
        return goalsRepository.findByCodingLanguage(codingLanguage);
    }

    public GoalsModel getGoalByName(String name){
        return goalsRepository.findByName(name);
    }
    public GoalsModel getGoalsById(String id) {
        Optional<GoalsModel> optionalGoalsModel = goalsRepository.findById(id);
        return optionalGoalsModel.orElse(null); // or handle the case when the goal is not found
    }

    public void deleteById(String id) {
        goalsRepository.deleteById(id); //Does not return a value so is void
    }

    public void deleteAll(){
        goalsRepository.deleteAll();
    }
}
