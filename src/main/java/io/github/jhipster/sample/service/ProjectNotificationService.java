package io.github.jhipster.sample.service;

import java.time.Instant;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import javax.persistence.EntityManager;
import javax.persistence.TypedQuery;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;
import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import io.github.jhipster.sample.domain.DiseaseXiAn;
import io.github.jhipster.sample.domain.NotificationType;
import io.github.jhipster.sample.domain.ProjectNotification;
import io.github.jhipster.sample.repository.DiseaseXiAnRepository;
import io.github.jhipster.sample.repository.ProjectNotificationRepository;
import io.github.jhipster.sample.service.dto.ProjectNotificatonDTO;
import io.github.jhipster.sample.web.rest.searchdto.ProjectNotificationSearchDTO;

/**
 * ProjectNotificationService for Crud operations
 */
@Service
public class ProjectNotificationService {
    private final ProjectNotificationRepository notificationRepository;

    private final EntityManager entityManager;
    @Autowired
    public ProjectNotificationService(
        DiseaseXiAnRepository diseaseXiAnRepository,
        EntityManager entityManager,
        ProjectNotificationRepository projectNotificationRepository
        ) {
        this.entityManager = entityManager;
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

    public Page<ProjectNotification> searchntfs(ProjectNotificationSearchDTO searchDTO, Pageable pageable) {
        CriteriaBuilder cb = entityManager.getCriteriaBuilder();
        CriteriaQuery<ProjectNotification> ntfQuery = cb.createQuery(ProjectNotification.class);
        CriteriaQuery<Long> countQuery = cb.createQuery(Long.class);
        Root<ProjectNotification> ntf = ntfQuery.from(ProjectNotification.class);
        Root<ProjectNotification> count = countQuery.from(ProjectNotification.class);
        List<Predicate> restrictions = new ArrayList<Predicate>();
        ntfQuery.select(ntf);
        countQuery.select(cb.count(count));
        ntfQuery.orderBy(cb.desc(ntf.get("createdDate")));

        Long subsidiaryId = searchDTO.getSubsidiaryId();
        Instant lowerBound = searchDTO.getLowerBound();
        Instant upperBound = searchDTO.getUpperBound();
        NotificationType type = searchDTO.getType();

        // restrictions for properties
        if (subsidiaryId != null) {
            restrictions.add(cb.equal(ntf.get("subsidiary").get("id"), subsidiaryId));
        }
        if (type != null) {
            restrictions.add(cb.equal(ntf.get("type"), type));
        }
        if (lowerBound != null) {
            restrictions.add(cb.greaterThanOrEqualTo(ntf.get("createdDate"), lowerBound));
        }
        if (upperBound != null) {
            restrictions.add(cb.lessThanOrEqualTo(ntf.get("createdDate"), upperBound));
        }
        Predicate termPredicate = cb.and(restrictions.toArray(new Predicate[restrictions.size()]));
        // restrictions for query string


        ntfQuery.where(termPredicate);
        countQuery.where(termPredicate);

        // get ntfs satisfied with criterias
        TypedQuery<ProjectNotification> typedntfQuery = entityManager.createQuery(ntfQuery);
        typedntfQuery.setFirstResult((int) pageable.getOffset());
        typedntfQuery.setMaxResults((int) pageable.getPageSize());

        List<ProjectNotification> allNtfs = typedntfQuery.getResultList();

        // get totalItems number with criterias
        TypedQuery<Long> typedCountQuery = entityManager.createQuery(countQuery);
        Long totalItems = typedCountQuery.getSingleResult();

        // create a page in terms of the count and content
        Page<ProjectNotification> resultPage = new PageImpl<>(allNtfs, pageable, totalItems);
        return resultPage;
    }
}
