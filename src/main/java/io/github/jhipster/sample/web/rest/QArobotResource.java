package io.github.jhipster.sample.web.rest;

import io.github.jhipster.sample.domain.DiseaseXiAn;
import io.github.jhipster.sample.domain.QArobot;
import io.github.jhipster.sample.repository.DiseaseXiAnRepository;
import io.github.jhipster.sample.repository.QArobotRepository;
import io.github.jhipster.sample.repository.search.QArobotSearchRepository;
import io.github.jhipster.sample.service.DiseaseXiAnService;
import io.github.jhipster.sample.web.rest.errors.BadRequestAlertException;
import io.github.jhipster.sample.web.rest.util.HeaderUtil;
import io.github.jhipster.sample.web.rest.util.PaginationUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.Collection;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

import static org.elasticsearch.index.query.QueryBuilders.*;

/**
 * REST controller for managing QArobot.
 */
@RestController
@RequestMapping("/api")
public class QArobotResource {

    private final Logger log = LoggerFactory.getLogger(QArobotResource.class);

    private static final String ENTITY_NAME = "qArobot";

    private final QArobotRepository qArobotRepository;

    private final QArobotSearchRepository qArobotSearchRepository;

    private final DiseaseXiAnService diseaseXiAnService;

    public QArobotResource(QArobotRepository qArobotRepository
        , QArobotSearchRepository qArobotSearchRepository
        , DiseaseXiAnService diseaseXiAnService) {
        this.qArobotRepository = qArobotRepository;
        this.qArobotSearchRepository = qArobotSearchRepository;
        this.diseaseXiAnService = diseaseXiAnService;
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
        qArobotSearchRepository.save(result);
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
    public ResponseEntity<QArobot> updateQArobot(@Valid @RequestBody QArobot qArobot) throws URISyntaxException {
        log.debug("REST request to update QArobot : {}", qArobot);
        if (qArobot.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        QArobot result = qArobotRepository.save(qArobot);
        qArobotSearchRepository.save(result);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, qArobot.getId().toString()))
            .body(result);
    }

        /**
     * Request /disease-guang-dongs-reindex : reindex the diseaseGuangDong
     *
     */
    @GetMapping("/q-arobots-reindex")
    public void reindexQArobots() {
        log.debug("REST request to reindex QArobots");
        qArobotSearchRepository.deleteAll();
        List<QArobot> qas =  qArobotRepository.findAll();
        qArobotSearchRepository.saveAll(qas);
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
    public ResponseEntity<QArobot> getQArobot(@PathVariable Long id) {
        log.debug("REST request to get QArobot : {}", id);
        Optional<QArobot> qArobot = qArobotRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(qArobot);
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
        qArobotSearchRepository.deleteById(id);
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
    public ResponseEntity<List<QArobot>> searchQArobots(@RequestParam String query, Pageable pageable) {
        log.debug("REST request to search for a page of QArobots for query {}", query);
        Page<QArobot> page = qArobotSearchRepository.search(queryStringQuery(query), pageable);
        HttpHeaders headers = PaginationUtil.generateSearchPaginationHttpHeaders(query, page, "/api/_search/q-arobots");
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

}
