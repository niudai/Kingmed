package io.github.jhipster.sample.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import io.github.jhipster.sample.domain.Prices;

/**
 * PriceRepository
 */
@Repository
public interface PriceRepository extends JpaRepository<Prices, Long>{

}
