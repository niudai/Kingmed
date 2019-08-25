package io.github.jhipster.sample.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import io.github.jhipster.sample.domain.DiseaseBranch;


/**
 * Spring Data  repository for the DiseaseBranch entity.
 */
@Repository
public interface DiseaseBranchRepository extends JpaRepository<DiseaseBranch, Long> {
    @EntityGraph(attributePaths = "diseaseMaps")
    Optional<DiseaseBranch> findOneWithDiseaseMapsById(Long id);
}
