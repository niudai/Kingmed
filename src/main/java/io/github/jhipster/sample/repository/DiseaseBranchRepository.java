package io.github.jhipster.sample.repository;

import io.github.jhipster.sample.domain.DiseaseBranch;
import io.github.jhipster.sample.domain.DiseaseMap;

import java.util.Optional;

import org.elasticsearch.search.suggest.Suggest.Suggestion.Entry.Option;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the DiseaseBranch entity.
 */
@SuppressWarnings("unused")
@Repository
public interface DiseaseBranchRepository extends JpaRepository<DiseaseBranch, Long> {
    @EntityGraph(attributePaths = "diseaseMaps")
    Optional<DiseaseBranch> findOneWithDiseaseMapsById(Long id);
}
