package io.github.jhipster.sample.repository;

import io.github.jhipster.sample.domain.DiseaseGuangDong;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the DiseaseGuangDong entity.
 */
@SuppressWarnings("unused")
@Repository
public interface DiseaseGuangDongRepository extends JpaRepository<DiseaseGuangDong, Long> {

}
