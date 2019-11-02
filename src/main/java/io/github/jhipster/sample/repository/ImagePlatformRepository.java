package io.github.jhipster.sample.repository;

import io.github.jhipster.sample.domain.ImagePlatform;

import java.util.Optional;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the ImagePlatform
 */
@SuppressWarnings("unused")
@Repository
public interface ImagePlatformRepository extends JpaRepository<ImagePlatform, Long> {

    public Optional<ImagePlatform> findOneByPath(String name);
}
