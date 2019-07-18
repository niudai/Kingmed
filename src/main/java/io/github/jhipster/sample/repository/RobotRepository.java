package io.github.jhipster.sample.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import io.github.jhipster.sample.domain.Robot;

/**
 * RobotRepository
 */
@Repository
public interface RobotRepository extends JpaRepository<Robot, Long>{

}
