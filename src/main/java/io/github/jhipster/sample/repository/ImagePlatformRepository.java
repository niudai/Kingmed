package io.github.jhipster.sample.repository;

import io.github.jhipster.sample.domain.ImagePlatform;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the ImagePlatform
 */
@SuppressWarnings("unused")
@Repository
public interface ImagePlatformRepository extends JpaRepository<ImagePlatform, Long> {

}
