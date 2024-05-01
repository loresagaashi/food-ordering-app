package com.mcdonalds.foodordering.service;

import org.springframework.stereotype.Service;

import com.mcdonalds.foodordering.model.Category;
import com.mcdonalds.foodordering.model.JobPosition;
import com.mcdonalds.foodordering.repository.JobPositionRepository;

@Service
public class JobPositionService extends BasicServiceOperations<JobPositionRepository, JobPosition> {

    public JobPositionService(JobPositionRepository repository) {
        super(repository);
    }
     public JobPosition save(JobPosition entity) {
        if (entity.getId() == null) {
            super.save(entity);
        }

        validateEntity(entity);
        JobPosition jobPosition = findById(entity.getId());
        jobPosition.setName(entity.getName());
        jobPosition.setSalary(entity.getSalary());

        return repository.save(jobPosition);
    }
}
