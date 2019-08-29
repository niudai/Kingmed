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

import io.github.jhipster.sample.domain.Subsidiary;
import io.github.jhipster.sample.repository.SubsidiaryRepository;
import io.github.jhipster.sample.web.rest.errors.BadRequestAlertException;
import io.github.jhipster.sample.web.rest.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;

/**
 * REST controller for managing Subsidiary.
 */
@RestController
@RequestMapping("/api/subsidiaries")
public class SubsidiaryResource {

    private final Logger log = LoggerFactory.getLogger(SubsidiaryResource.class);

    private static final String ENTITY_NAME = "subsidiary";

    private final SubsidiaryRepository subsidiaryRepository;

    public SubsidiaryResource(SubsidiaryRepository subsidiaryRepository) {
        this.subsidiaryRepository = subsidiaryRepository;
    }

    /**
     * POST  /subsidiarys : Create a new subsidiary.
     *
     * @param subsidiary the subsidiary to create
     * @return the ResponseEntity with status 201 (Created) and with body the new subsidiary, or with status 400 (Bad Request) if the subsidiary has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("")
    public ResponseEntity<Subsidiary> createSubsidiary(@Valid @RequestBody Subsidiary subsidiary) throws URISyntaxException {
        log.debug("REST request to save Subsidiary : {}", subsidiary);
        if (subsidiaryRepository.findByName(subsidiary.getName()).isPresent()) {
            throw new BadRequestAlertException("Subsidiary has already been created", ENTITY_NAME, "exists");
        }
        Subsidiary result = subsidiaryRepository.save(subsidiary);
        return ResponseEntity.created(new URI("/api/subsidiarys/" + result.getName()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getName().toString()))
            .body(result);
    }

    /**
     * PUT  /subsidiarys : Updates an existing subsidiary.
     *
     * @param subsidiary the subsidiary to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated subsidiary,
     * or with status 400 (Bad Request) if the subsidiary is not valid,
     * or with status 500 (Internal Server Error) if the subsidiary couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("")
    public ResponseEntity<Subsidiary> updateSubsidiary(@Valid @RequestBody Subsidiary subsidiary) throws URISyntaxException {
        log.debug("REST request to update Subsidiary : {}", subsidiary);
        if (subsidiary.getName() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Subsidiary result = subsidiaryRepository.save(subsidiary);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, subsidiary.toString()))
            .body(result);
    }

    /**
     * GET  /subsidiarys : get all the subsidiarys.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of subsidiarys in body
     */
    @GetMapping("")
    public List<Subsidiary> getAllSubsidiarys() {
        log.debug("REST request to get all Subsidiarys");
        return subsidiaryRepository.findAll();
    }

    /**
     * GET  /subsidiarys/:id : get the "id" subsidiary.
     *
     * @param name the id of the subsidiary to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the subsidiary, or with status 404 (Not Found)
     */
    @GetMapping("/{name}")
    public ResponseEntity<Subsidiary> getSubsidiary(@PathVariable String name) {
        log.debug("REST request to get Subsidiary : {}", name);
        Optional<Subsidiary> subsidiary = subsidiaryRepository.findByName(name);
        return ResponseUtil.wrapOrNotFound(subsidiary);
    }

    /**
     * DELETE  /subsidiarys/:id : delete the "id" subsidiary.
     *
     * @param name the id of the subsidiary to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/{name}")
    public ResponseEntity<Void> deleteSubsidiary(@PathVariable String name) {
        log.debug("REST request to delete Subsidiary : {}", name);
        subsidiaryRepository.deleteByName(name);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, name.toString())).build();
    }

}
