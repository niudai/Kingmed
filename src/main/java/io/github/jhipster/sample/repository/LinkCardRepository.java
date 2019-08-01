package io.github.jhipster.sample.repository;

import io.github.jhipster.sample.domain.Label;
import io.github.jhipster.sample.domain.LinkCard;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the Label entity.
 */
@SuppressWarnings("unused")
@Repository
public interface LinkCardRepository extends JpaRepository<LinkCard, Long> {

}
