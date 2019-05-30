package io.github.jhipster.sample.repository;

import io.github.jhipster.sample.domain.DiseaseXiAn;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the DiseaseXiAn entity.
 */
@SuppressWarnings("unused")
@Repository
public interface DiseaseXiAnRepository extends JpaRepository<DiseaseXiAn, Long> {

}
