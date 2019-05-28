package io.github.jhipster.sample.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import io.github.jhipster.sample.domain.PriceXiAn;

/**
 * PriceRepository
 */
@Repository
public interface PriceXiAnRepository extends JpaRepository<PriceXiAn, Long>{

}
