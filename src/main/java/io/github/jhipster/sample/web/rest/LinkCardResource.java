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

import io.github.jhipster.sample.domain.LinkCard;
import io.github.jhipster.sample.repository.LinkCardRepository;
import io.github.jhipster.sample.web.rest.errors.BadRequestAlertException;
import io.github.jhipster.sample.web.rest.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;

/**
 * REST controller for managing LinkCard.
 */
@RestController
@RequestMapping("/api/link-cards")
public class LinkCardResource {

    private final Logger log = LoggerFactory.getLogger(LinkCardResource.class);

    private static final String ENTITY_NAME = "linkCard";

    private final LinkCardRepository linkCardRepository;


    public LinkCardResource(LinkCardRepository linkCardRepository) {
        this.linkCardRepository = linkCardRepository;
    }

    /**
     * POST  /linkCards : Create a new linkCard.
     *
     * @param linkCard the linkCard to create
     * @return the ResponseEntity with status 201 (Created) and with body the new linkCard, or with status 400 (Bad Request) if the linkCard has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("")
    public ResponseEntity<LinkCard> createLinkCard(@Valid @RequestBody LinkCard linkCard) throws URISyntaxException {
        log.debug("REST request to save LinkCard : {}", linkCard);
        if (linkCard.getId() != null) {
            throw new BadRequestAlertException("A new linkCard cannot already have an ID", ENTITY_NAME, "idexists");
        }
        LinkCard result = linkCardRepository.save(linkCard);
        return ResponseEntity.created(new URI("/api/linkCards/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /linkCards : Updates an existing linkCard.
     *
     * @param linkCard the linkCard to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated linkCard,
     * or with status 400 (Bad Request) if the linkCard is not valid,
     * or with status 500 (Internal Server Error) if the linkCard couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("")
    public ResponseEntity<LinkCard> updateLinkCard(@Valid @RequestBody LinkCard linkCard) throws URISyntaxException {
        log.debug("REST request to update LinkCard : {}", linkCard);
        if (linkCard.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        LinkCard result = linkCardRepository.save(linkCard);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, linkCard.getId().toString()))
            .body(result);
    }

    /**
     * GET  /linkCards : get all the linkCards.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of linkCards in body
     */
    @GetMapping("")
    public List<LinkCard> getAllLinkCards() {
        log.debug("REST request to get all LinkCards");
        return linkCardRepository.findAll();
    }

    /**
     * GET  /linkCards/:id : get the "id" linkCard.
     *
     * @param id the id of the linkCard to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the linkCard, or with status 404 (Not Found)
     */
    @GetMapping("/{id}")
    public ResponseEntity<LinkCard> getLinkCard(@PathVariable Long id) {
        log.debug("REST request to get LinkCard : {}", id);
        Optional<LinkCard> linkCard = linkCardRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(linkCard);
    }

    /**
     * DELETE  /linkCards/:id : delete the "id" linkCard.
     *
     * @param id the id of the linkCard to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteLinkCard(@PathVariable Long id) {
        log.debug("REST request to delete LinkCard : {}", id);
        linkCardRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }

}
