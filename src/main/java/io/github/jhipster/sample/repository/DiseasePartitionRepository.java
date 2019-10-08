package io.github.jhipster.sample.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import io.github.jhipster.sample.domain.DiseaseBranch;
import io.github.jhipster.sample.domain.DiseasePartition;


/**
 * Spring Data  repository for the DiseaseBranch entity.
 */
@Repository
public interface DiseasePartitionRepository extends JpaRepository<DiseasePartition, Long> {
}
