package io.github.jhipster.sample.repository;

import io.github.jhipster.sample.domain.ImageApplication;

import java.util.List;

import com.google.common.base.Optional;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the ImagePlatform
 */
@SuppressWarnings("unused")
@Repository
public interface ImageApplicationRepository extends JpaRepository<ImageApplication, Long> {

    public Optional<ImageApplication> findOneByName(String name);

    public Optional<ImageApplication> findOneByPath(String name);

}
