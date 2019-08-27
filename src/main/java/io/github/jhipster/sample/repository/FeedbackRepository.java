package io.github.jhipster.sample.repository;

import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import io.github.jhipster.sample.domain.Feedback;

/**
 * FeedbackRepository
 */

@RepositoryRestResource(collectionResourceRel = "feedback", path = "feedback")
public interface FeedbackRepository extends PagingAndSortingRepository<Feedback, Long> {
    
}