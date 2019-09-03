package io.github.jhipster.sample.repository;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import io.github.jhipster.sample.domain.Comment;

/**
 * Spring Data JPA repository for the Authority entity.
 */
@Repository
public interface CommentRepository extends JpaRepository<Comment, Long> {
    List<Comment> findAllByDiseaseXiAnId(Long id);
}
