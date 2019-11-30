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

import io.github.jhipster.sample.domain.HelpLink;
import io.github.jhipster.sample.repository.HelpLinkRepository;
import io.github.jhipster.sample.web.rest.errors.BadRequestAlertException;
import io.github.jhipster.sample.web.rest.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;

/**
 * REST controller for managing HelpLink.
 */
@RestController
@RequestMapping("/api/help-links")
public class HelpLinkResource {

    private final Logger log = LoggerFactory.getLogger(HelpLinkResource.class);

    private static final String ENTITY_NAME = "helpLink";

    private final HelpLinkRepository helpLinkRepository;

    public HelpLinkResource(HelpLinkRepository helpLinkRepository) {
        this.helpLinkRepository = helpLinkRepository;
    }

    /**
     * POST  /helpLinks : Create a new helpLink.
     *
     * @param helpLink the helpLink to create
     * @return the ResponseEntity with status 201 (Created) and with body the new helpLink, or with status 400 (Bad Request) if the helpLink has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("")
    public ResponseEntity<HelpLink> createHelpLink(@Valid @RequestBody HelpLink helpLink) throws URISyntaxException {
        log.debug("REST request to save HelpLink : {}", helpLink);
        if (helpLink.getId() != null) {
            throw new BadRequestAlertException("A new helpLink cannot already have an ID", ENTITY_NAME, "idexists");
        }
        HelpLink result = helpLinkRepository.save(helpLink);
        return ResponseEntity.created(new URI("/api/helpLinks/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /helpLinks : Updates an existing helpLink.
     *
     * @param helpLink the helpLink to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated helpLink,
     * or with status 400 (Bad Request) if the helpLink is not valid,
     * or with status 500 (Internal Server Error) if the helpLink couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("")
    public ResponseEntity<HelpLink> updateHelpLink(@Valid @RequestBody HelpLink helpLink) throws URISyntaxException {
        log.debug("REST request to update HelpLink : {}", helpLink);
        if (helpLink.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        HelpLink result = helpLinkRepository.save(helpLink);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, helpLink.getId().toString()))
            .body(result);
    }

    /**
     * GET  /helpLinks : get all the helpLinks.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of helpLinks in body
     */
    @GetMapping("")
    public List<HelpLink> getAllHelpLinks() {
        log.debug("REST request to get all HelpLinks");
        return helpLinkRepository.findAll();
    }

    /**
     * GET  /helpLinks/:id : get the "id" helpLink.
     *
     * @param id the id of the helpLink to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the helpLink, or with status 404 (Not Found)
     */
    @GetMapping("/{id}")
    public ResponseEntity<HelpLink> getHelpLink(@PathVariable Long id) {
        log.debug("REST request to get HelpLink : {}", id);
        Optional<HelpLink> helpLink = helpLinkRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(helpLink);
    }

    /**
     * DELETE  /helpLinks/:id : delete the "id" helpLink.
     *
     * @param id the id of the helpLink to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteHelpLink(@PathVariable Long id) {
        log.debug("REST request to delete HelpLink : {}", id);
        helpLinkRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }

}
