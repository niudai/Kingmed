package io.github.jhipster.sample.repository;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import io.github.jhipster.sample.domain.ProjectNotification;


/**
 * RobotRepository
 */
@Repository
public interface ProjectNotificationRepository extends JpaRepository<ProjectNotification, Long> {

    public List<ProjectNotification> findAllSortByCreatedDate();

    public Page<ProjectNotification> findAllSortByCreatedDate(Pageable page);

}
