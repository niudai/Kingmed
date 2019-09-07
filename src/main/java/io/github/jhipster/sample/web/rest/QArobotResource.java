package io.github.jhipster.sample.web.rest;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.Collection;
import java.util.List;

import javax.transaction.Transactional;
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

import io.github.jhipster.sample.domain.DiseaseXiAn;
import io.github.jhipster.sample.domain.QArobot;
import io.github.jhipster.sample.repository.QArobotRepository;
import io.github.jhipster.sample.service.DiseaseXiAnService;
import io.github.jhipster.sample.service.QArobotService;
import io.github.jhipster.sample.web.rest.errors.BadRequestAlertException;
import io.github.jhipster.sample.web.rest.searchdto.QarobotSearchDTO;
import io.github.jhipster.sample.web.rest.util.HeaderUtil;
import io.github.jhipster.sample.web.rest.util.PaginationUtil;

/**
 * REST controller for managing QArobot.
 */
@RestController
@RequestMapping("/api")
public class QArobotResource {

    private final Logger log = LoggerFactory.getLogger(QArobotResource.class);

    private static final String ENTITY_NAME = "qArobot";

    private final QArobotRepository qArobotRepository;

    private final DiseaseXiAnService diseaseXiAnService;

    private final QArobotService qArobotService;

    public QArobotResource(QArobotRepository qArobotRepository
        , DiseaseXiAnService diseaseXiAnService
        , QArobotService qarobotService) {
        this.qArobotRepository = qArobotRepository;
        this.diseaseXiAnService = diseaseXiAnService;
        this.qArobotService = qarobotService;
    }

    /**
     * POST  /q-arobots : Create a new qArobot.
     *
     * @param qArobot the qArobot to create
     * @return the ResponseEntity with status 201 (Created) and with body the new qArobot, or with status 400 (Bad Request) if the qArobot has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/q-arobots")
    public ResponseEntity<QArobot> createQArobot(@Valid @RequestBody QArobot qArobot) throws URISyntaxException {
        log.debug("REST request to save QArobot : {}", qArobot);
        if (qArobot.getId() != null) {
            throw new BadRequestAlertException("A new qArobot cannot already have an ID", ENTITY_NAME, "idexists");
        }
        QArobot result = qArobotRepository.save(qArobot);
        return ResponseEntity.created(new URI("/api/q-arobots/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /q-arobots : Updates an existing qArobot.
     *
     * @param qArobot the qArobot to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated qArobot,
     * or with status 400 (Bad Request) if the qArobot is not valid,
     * or with status 500 (Internal Server Error) if the qArobot couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/q-arobots")
    @Transactional
    public ResponseEntity<QArobot> updateQArobot(@Valid @RequestBody QArobot qArobot) throws URISyntaxException {
        log.debug("REST request to update QArobot : {}", qArobot);
        if (qArobot.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        QArobot result = qArobotRepository.findById(qArobot.getId()).get().update(qArobot);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, qArobot.getId().toString()))
            .body(result);
    }

    /**
     * GET  /q-arobots : get all the qArobots.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of qArobots in body
     */
    @GetMapping("/q-arobots")
    public ResponseEntity<List<QArobot>> getAllQArobots(Pageable pageable) {
        log.debug("REST request to get a page of QArobots");
        Page<QArobot> page = qArobotRepository.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/q-arobots");
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * GET /q-arobots/getDiseasesOfQArobot/{id} : get diseases of QA.
     * @param id id of QArobot
     * @return ok 200
     */
    @GetMapping("/q-arobots/getDiseasesOfQArobot/{id}")
    public ResponseEntity<Collection<DiseaseXiAn>> getDiseasesOfQArobot(@PathVariable Long id) {
        return ResponseEntity.ok().body(diseaseXiAnService.findDiseaseXiAnsOfQArobot(id));
    }

    /**
     * GET  /q-arobots/:id : get the "id" qArobot.
     *
     * @param id the id of the qArobot to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the qArobot, or with status 404 (Not Found)
     */
    @GetMapping("/q-arobots/{id}")
    public QArobot getQArobot(@PathVariable Long id) {
        log.debug("REST request to get QArobot : {}", id);
        QArobot qArobot = qArobotService.getQArobot(id);
        return qArobot;
    }

    /**
     * DELETE  /q-arobots/:id : delete the "id" qArobot.
     *
     * @param id the id of the qArobot to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/q-arobots/{id}")
    public ResponseEntity<Void> deleteQArobot(@PathVariable Long id) {
        log.debug("REST request to delete QArobot : {}", id);
        qArobotRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }

    /**
     * SEARCH  /_search/q-arobots?query=:query : search for the qArobot corresponding
     * to the query.
     *
     * @param query the query of the qArobot search
     * @param pageable the pagination information
     * @return the result of the search
     */
    @GetMapping("/_search/q-arobots")
    public ResponseEntity<List<QArobot>> searchQArobots(QarobotSearchDTO dto, Pageable pageable) {
        log.debug("REST request to search for a page of QArobots for query {}", dto);
        Page<QArobot> page = qArobotService.searchQArobot(dto, pageable);
        HttpHeaders headers = PaginationUtil.generateSearchPaginationHttpHeaders(dto.toString(), page, "/api/_search/q-arobots");
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

}
