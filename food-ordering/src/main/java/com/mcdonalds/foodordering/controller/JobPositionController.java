package com.mcdonalds.foodordering.controller;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.mcdonalds.foodordering.model.JobPosition;
import com.mcdonalds.foodordering.service.JobPositionService;

@RestController
@RequestMapping("/job/positions")
public class JobPositionController extends BasicControllerOperations<JobPositionService, JobPosition>{

    public JobPositionController(JobPositionService service) {
        super(service);
    }
    
}
