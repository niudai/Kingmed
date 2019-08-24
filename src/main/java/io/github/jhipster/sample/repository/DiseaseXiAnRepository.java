package io.github.jhipster.sample.repository;

import io.github.jhipster.sample.domain.DiseaseXiAn;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;
import org.springframework.web.servlet.mvc.method.annotation.RequestMappingHandlerMapping;


/**
 * Spring Data  repository for the DiseaseXiAn entity.
 */
@SuppressWarnings("unused")
@Repository
public interface DiseaseXiAnRepository extends JpaRepository<DiseaseXiAn, Long> {
    Page<DiseaseXiAn> findAllByUsersLogin(String login, Pageable pageable);
    // Page<DiseaseXiAn> findAllBySubsidiaryAndContaining(String subsidiary, String keyword, Pageable pageable);
}
