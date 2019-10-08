package io.github.jhipster.sample.web.rest;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;

import javax.validation.Valid;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import io.github.jhipster.sample.domain.DiseasePartition;
import io.github.jhipster.sample.repository.DiseasePartitionRepository;
import io.github.jhipster.sample.repository.DiseasePartitionRepository;
import io.github.jhipster.sample.web.rest.errors.BadRequestAlertException;
import io.github.jhipster.sample.web.rest.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;

/**
 * REST controller for managing DiseasePartition.
 */
@RestController
@RequestMapping("/api/diseasePartitions")
public class DiseasePartitionResource {

    private final Logger log = LoggerFactory.getLogger(DiseasePartitionResource.class);

    private static final String ENTITY_NAME = "diseasePartition";

    private final DiseasePartitionRepository diseasePartitionRepository;


    public DiseasePartitionResource(DiseasePartitionRepository diseasePartitionRepository) {
        this.diseasePartitionRepository = diseasePartitionRepository;
    }

    /**
     * POST  /diseasePartitions : Create a new diseasePartition.
     *
     * @param diseasePartition the diseasePartition to create
     * @return the ResponseEntity with status 201 (Created) and with body the new diseasePartition, or with status 400 (Bad Request) if the diseasePartition has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("")
    public ResponseEntity<DiseasePartition> createDiseasePartition(@Valid @RequestBody DiseasePartition diseasePartition) throws URISyntaxException {
        log.debug("REST request to save DiseasePartition : {}", diseasePartition);
        if (diseasePartition.getId() != null) {
            throw new BadRequestAlertException("A new diseasePartition cannot already have an ID", ENTITY_NAME, "idexists");
        }
        DiseasePartition result = diseasePartitionRepository.save(diseasePartition);
        return ResponseEntity.created(new URI("/api/diseasePartitions/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /diseasePartitions : Updates an existing diseasePartition.
     *
     * @param diseasePartition the diseasePartition to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated diseasePartition,
     * or with status 400 (Bad Request) if the diseasePartition is not valid,
     * or with status 500 (Internal Server Error) if the diseasePartition couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("")
    public ResponseEntity<DiseasePartition> updateDiseasePartition(@Valid @RequestBody DiseasePartition diseasePartition) throws URISyntaxException {
        log.debug("REST request to update DiseasePartition : {}", diseasePartition);
        if (diseasePartition.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        DiseasePartition result = diseasePartitionRepository.save(diseasePartition);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, diseasePartition.getId().toString()))
            .body(result);
    }

    /**
     * GET  /diseasePartitions : get all the diseasePartitions.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of diseasePartitions in body
     */
    @GetMapping("")
    public List<DiseasePartition> getAllDiseasePartitions() {
        log.debug("REST request to get all DiseasePartitions");
        return diseasePartitionRepository.findAll();
    }

    /**
     * GET  /diseasePartitions/:id : get the "id" diseasePartition.
     *
     * @param id the id of the diseasePartition to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the diseasePartition, or with status 404 (Not Found)
     */
    @GetMapping("/{id}")
    public ResponseEntity<DiseasePartition> getDiseasePartition(@PathVariable Long id) {
        log.debug("REST request to get DiseasePartition : {}", id);
        Optional<DiseasePartition> diseasePartition = diseasePartitionRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(diseasePartition);
    }

    /**
     * DELETE  /diseasePartitions/:id : delete the "id" diseasePartition.
     *
     * @param id the id of the diseasePartition to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteDiseasePartition(@PathVariable Long id) {
        log.debug("REST request to delete DiseasePartition : {}", id);
        diseasePartitionRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }

}
