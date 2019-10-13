package io.github.jhipster.sample.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import io.github.jhipster.sample.domain.DiseaseMap;

/**
 * Spring Data JPA repository for the Authority entity.
 */
@Repository
public interface DiseaseMapRepository extends JpaRepository<DiseaseMap, Long> {
    List<DiseaseMap> findAllByUsersLogin(String login);
    List<DiseaseMap> findAllByDiseaseXiAnsId(Long id);
}
