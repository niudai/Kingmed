package io.github.jhipster.sample.repository;

import io.github.jhipster.sample.domain.QArobot;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the QArobot entity.
 */
@SuppressWarnings("unused")
@Repository
public interface QArobotRepository extends JpaRepository<QArobot, Long> {

}
