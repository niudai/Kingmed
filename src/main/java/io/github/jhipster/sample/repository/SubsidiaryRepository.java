package io.github.jhipster.sample.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import io.github.jhipster.sample.domain.Subsidiary;

/**
 * RobotRepository
 */
@Repository
public interface SubsidiaryRepository extends JpaRepository<Subsidiary, Long> {

    public Optional<Subsidiary> findByName(String name);

}
