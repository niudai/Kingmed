package io.github.jhipster.sample.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import io.github.jhipster.sample.domain.HelpLink;

/**
 * HelpLinkRepository
 */
@Repository
public interface HelpLinkRepository extends JpaRepository<HelpLink, Long>{

}
