package io.github.jhipster.sample.web.rest;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;

import javax.validation.Valid;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import io.github.jhipster.sample.domain.ProjectNotification;
import io.github.jhipster.sample.repository.ProjectNotificationRepository;
import io.github.jhipster.sample.service.ProjectNotificationService;
import io.github.jhipster.sample.web.rest.errors.BadRequestAlertException;
import io.github.jhipster.sample.web.rest.searchdto.ProjectNotificationSearchDTO;
import io.github.jhipster.sample.web.rest.util.HeaderUtil;
import io.github.jhipster.sample.web.rest.util.PaginationUtil;
import io.github.jhipster.web.util.ResponseUtil;

/**
 * REST controller for managing ProjectNotification.
 */
@RestController
@RequestMapping("/api/project-notifications")
public class ProjectNotificationResource {

    private final Logger log = LoggerFactory.getLogger(ProjectNotificationResource.class);

    private static final String ENTITY_NAME = "ProjectNotification";

    private final ProjectNotificationRepository projectNotificationRepository;

    private final ProjectNotificationService projectNotificationService;

    public ProjectNotificationResource(
        ProjectNotificationRepository ProjectNotificationRepository,
        ProjectNotificationService projectNotificationService) {
        this.projectNotificationService = projectNotificationService;
        this.projectNotificationRepository = ProjectNotificationRepository;
    }

    /**
     * POST  /ProjectNotifications : Create a new ProjectNotification.
     *
     * @param projectNotification the ProjectNotification to create
     * @return the ResponseEntity with status 201 (Created) and with body the new ProjectNotification, or with status 400 (Bad Request) if the ProjectNotification has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("")
    public ResponseEntity<ProjectNotification> createProjectNotification(@Valid @RequestBody ProjectNotification projectNotification) throws URISyntaxException {
        log.debug("REST request to save ProjectNotification : {}", projectNotification);
        if (projectNotification.getId() != null) {
            throw new BadRequestAlertException("A new ProjectNotification cannot already have an ID", ENTITY_NAME, "idexists");
        }
        ProjectNotification result = projectNotificationRepository.save(projectNotification);
        return ResponseEntity.created(new URI("/api/ProjectNotifications/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /ProjectNotifications : Updates an existing ProjectNotification.
     *
     * @param ProjectNotification the ProjectNotification to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated ProjectNotification,
     * or with status 400 (Bad Request) if the ProjectNotification is not valid,
     * or with status 500 (Internal Server Error) if the ProjectNotification couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("")
    public ResponseEntity<ProjectNotification> updateProjectNotification(@Valid @RequestBody ProjectNotification ProjectNotification) throws URISyntaxException {
        log.debug("REST request to update ProjectNotification : {}", ProjectNotification);
        if (ProjectNotification.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        ProjectNotification result = projectNotificationRepository.save(ProjectNotification);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, ProjectNotification.getId().toString()))
            .body(result);
    }

    /**
     * GET  /ProjectNotifications : get all the ProjectNotifications.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of ProjectNotifications in body
     */
    @GetMapping("")
    public List<ProjectNotification> getAllProjectNotifications() {
        log.debug("REST request to get all ProjectNotifications");
        return projectNotificationRepository.findByOrderByCreatedDateDesc();
    }

    /**
     * GET  /ProjectNotifications/:id : get the "id" ProjectNotification.
     *
     * @param id the id of the ProjectNotification to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the ProjectNotification, or with status 404 (Not Found)
     */
    @GetMapping("{id}")
    public ResponseEntity<ProjectNotification> getProjectNotification(@PathVariable Long id) {
        log.debug("REST request to get ProjectNotification : {}", id);
        Optional<ProjectNotification> ProjectNotification = projectNotificationRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(ProjectNotification);
    }

    /**
     * DELETE  /ProjectNotifications/:id : delete the "id" ProjectNotification.
     *
     * @param id the id of the ProjectNotification to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("{id}")
    public ResponseEntity<Void> deleteProjectNotification(@PathVariable Long id) {
        log.debug("REST request to delete ProjectNotification : {}", id);
        projectNotificationRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }

    /**
     * SEARCH  /_search/q-arobots?query=:query : search for the ProjectNotification corresponding
     * to the query.
     *
     * @param query the query of the ProjectNotification search
     * @param pageable the pagination information
     * @return the result of the search
     */
    @GetMapping("/_search")
    public ResponseEntity<List<ProjectNotification>> searchProjectNotifications(ProjectNotificationSearchDTO dto, Pageable pageable) {
        log.debug("REST request to search for a page of ProjectNotifications for query {}", dto);
        Page<ProjectNotification> page = projectNotificationService.searchntfs(dto, pageable);
        HttpHeaders headers = PaginationUtil.generateSearchPaginationHttpHeaders(dto.toString(), page, "/api/_search/q-arobots");
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

}
