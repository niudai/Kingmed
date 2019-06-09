package io.github.jhipster.sample.repository;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * Spring Data JPA repository for the Authority entity.
 */
@Repository
public interface DiseaseMapRepository extends JpaRepository<DiseaseMapRepository, Long> {
}
