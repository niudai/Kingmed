package io.github.jhipster.sample.repository;

import io.github.jhipster.sample.domain.DiseaseBranch;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the DiseaseBranch entity.
 */
@SuppressWarnings("unused")
@Repository
public interface DiseaseBranchRepository extends JpaRepository<DiseaseBranch, Long> {

}
