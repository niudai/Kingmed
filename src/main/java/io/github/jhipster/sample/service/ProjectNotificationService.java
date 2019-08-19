package io.github.jhipster.sample.service;

import java.util.List;

import javax.persistence.EntityManager;
import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import io.github.jhipster.sample.domain.DiseaseXiAn;
import io.github.jhipster.sample.domain.ProjectNotification;
import io.github.jhipster.sample.repository.DiseaseXiAnRepository;
import io.github.jhipster.sample.repository.ProjectNotificationRepository;
import io.github.jhipster.sample.service.dto.ProjectNotificatonDTO;

/**
 * ProjectNotificationService for Crud operations
 */
@Service
public class ProjectNotificationService {
    private final ProjectNotificationRepository notificationRepository;

    @Autowired
    public ProjectNotificationService(
        DiseaseXiAnRepository diseaseXiAnRepository,
        EntityManager entityManager,
        ProjectNotificationRepository projectNotificationRepository
        ) {
        this.notificationRepository = projectNotificationRepository;
    }


    /******************** Itself ************************/

    @Transactional
    public ProjectNotification generateNotification(DiseaseXiAn disease, ProjectNotificatonDTO dto) {
        ProjectNotification ntf = new ProjectNotification(disease, dto);
        return this.notificationRepository.save(ntf);
    }

    @Transactional
    public void deleteNotification(Long id) {
        notificationRepository.deleteById(id);
    }

    @Transactional
    public List<ProjectNotification> findAllNotificationSortByCreateTime () {
        return notificationRepository.findByOrderByCreatedDateDesc();
    }

}
