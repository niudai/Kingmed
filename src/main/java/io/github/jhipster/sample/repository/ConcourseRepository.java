package io.github.jhipster.sample.repository;

import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import io.github.jhipster.sample.domain.Concourse;

/**
 * ConcourseRepository
 */

@RepositoryRestResource(collectionResourceRel = "concourse", path = "concourse")
public interface ConcourseRepository extends PagingAndSortingRepository<Concourse, Long> {

}
