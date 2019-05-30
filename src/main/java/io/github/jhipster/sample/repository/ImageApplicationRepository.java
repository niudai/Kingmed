package io.github.jhipster.sample.repository;

import io.github.jhipster.sample.domain.ImageApplication;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the ImagePlatform
 */
@SuppressWarnings("unused")
@Repository
public interface ImageApplicationRepository extends JpaRepository<ImageApplication, Long> {

}
