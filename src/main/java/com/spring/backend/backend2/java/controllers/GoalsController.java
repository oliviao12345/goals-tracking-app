package com.spring.backend.backend2.java.controllers;


import com.spring.backend.backend2.java.models.GoalsModel;
import com.spring.backend.backend2.java.service.GoalsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class GoalsController {
    private final GoalsService goalsService;

    @Autowired
    public GoalsController(GoalsService goalsService) {
        this.goalsService = goalsService;

    }

    @PostMapping("/goals")
    public ResponseEntity<String> createGoal(@RequestBody GoalsModel goalsModel) {
        GoalsModel createdGoal = goalsService.createGoal(goalsModel);
        if (createdGoal != null) {
            return ResponseEntity.status(HttpStatus.CREATED).body("Goal created successfully!");
        } else {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to create goal.");
        }
    }

//    @PostMapping("/goals")
//    public ResponseEntity<String> createGoal(@RequestBody GoalsModel goalsModel) {
//        GoalsModel createdGoal = goalsService.createGoal(goalsModel);
//        if (createdGoal != null) {
//            return ResponseEntity.created(null).build();
//        } else {
//            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
//        }
//    }




//    @GetMapping("/goals")
//    public ResponseEntity<?> getAllGoals(){
//        List<GoalsModel> goals = goalsService.getAllGoals();
//        if (goals.isEmpty()) {
//            String errorMessage = "No Goals Found in the Mongo Database, Please add some goals and try again!";
//            return ResponseEntity.status(HttpStatus.NO_CONTENT).body(errorMessage);
//        }
//
//        StringBuilder successMessage = new StringBuilder("Found Goals!\n");
//        for (GoalsModel goal : goals) {
//            successMessage.append("\nId: ").append(goal.getId())
//                    .append("\nName: ").append(goal.getName())
//                    .append("\nGoal: ").append(goal.getGoal())
//                    .append("\nAge: ").append(goal.getAge())
//                    .append("\nCoding Language: ").append(goal.getCodingLanguage())
//                    .append("\n");
//        }
//
//        return ResponseEntity.status(HttpStatus.OK).body(successMessage.toString());
//    }

    @GetMapping("/goals")
    public ResponseEntity<List<GoalsModel>> getGoals() {
        List<GoalsModel> goals = goalsService.getAllGoals();
        if (goals.isEmpty()) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(goals);
    }


    @GetMapping("/goals/{codingLanguage}")
    public ResponseEntity<?> getGoalByCodingLanguage(@PathVariable String codingLanguage){
        GoalsModel goals = goalsService.getGoalByCodingLanguage(codingLanguage);
        if (goals == null) {
            String errorMessage = "Could not find user with Coding Language Specified as "
                    + codingLanguage + ". Please check your MongoDatabase via the Compass or CLI and try again!" +
                    "\n\nRemember that Json is CASE SENSITIVE so the name in the MongoDb must match the end point exactly!";
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(errorMessage);
        }
        String successMessage = "Found the Following User(s) who have specified " + codingLanguage + " as their Coding Language!"
                +     "\nId: " + goals.getId() +
                "\nName: " +  goals.getName() +
                "\nGoal: " +  goals.getGoal() +
                "\nAge: "+ goals.getAge() +
                "\nCoding Language: " +  goals.getCodingLanguage();
        return ResponseEntity.status(HttpStatus.OK).body(successMessage);
    }

    @GetMapping("/goals/id/{id}")
    public ResponseEntity<?> getGoalsById(@PathVariable String id){
        GoalsModel goals = goalsService.getGoalsById(id);
        if (goals == null) {
            String errorMessage = "Could not find ID: " + id +
                    ". Please check your MongoDatabase via the Compass or CLI and" +
                    "try again!";
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(errorMessage);
        }
        String successMessage = "Found User with ID: " + id + "\n\nUser goal details are: " +
                "\nId: " + goals.getId() +
                "\nName: " +  goals.getName() +
                "\nGoal: " +  goals.getGoal() +
                "\nAge: "+ goals.getAge() +
                "\nCoding Language: " +  goals.getCodingLanguage();
        return ResponseEntity.status(HttpStatus.OK).body(successMessage);
    }

}
