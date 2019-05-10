package io.github.jhipster.sample.web.rest;
import io.github.jhipster.sample.domain.DiseaseXiAn;
import io.github.jhipster.sample.repository.DiseaseXiAnRepository;
import io.github.jhipster.sample.repository.search.DiseaseXiAnSearchRepository;
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

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

import static org.elasticsearch.index.query.QueryBuilders.*;

/**
 * REST controller for managing DiseaseXiAn.
 */
@RestController
@RequestMapping("/api")
public class DiseaseXiAnResource {

    private final Logger log = LoggerFactory.getLogger(DiseaseXiAnResource.class);

    private static final String ENTITY_NAME = "diseaseXiAn";

    private final DiseaseXiAnRepository diseaseXiAnRepository;

    private final DiseaseXiAnSearchRepository diseaseXiAnSearchRepository;

    public DiseaseXiAnResource(DiseaseXiAnRepository diseaseXiAnRepository, DiseaseXiAnSearchRepository diseaseXiAnSearchRepository) {
        this.diseaseXiAnRepository = diseaseXiAnRepository;
        this.diseaseXiAnSearchRepository = diseaseXiAnSearchRepository;
    }

    /**
     * POST  /disease-xi-ans : Create a new diseaseXiAn.
     *
     * @param diseaseXiAn the diseaseXiAn to create
     * @return the ResponseEntity with status 201 (Created) and with body the new diseaseXiAn, or with status 400 (Bad Request) if the diseaseXiAn has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/disease-xi-ans")
    public ResponseEntity<DiseaseXiAn> createDiseaseXiAn(@Valid @RequestBody DiseaseXiAn diseaseXiAn) throws URISyntaxException {
        log.debug("REST request to save DiseaseXiAn : {}", diseaseXiAn);
        if (diseaseXiAn.getId() != null) {
            throw new BadRequestAlertException("A new diseaseXiAn cannot already have an ID", ENTITY_NAME, "idexists");
        }
        DiseaseXiAn result = diseaseXiAnRepository.save(diseaseXiAn);
        diseaseXiAnSearchRepository.save(result);
        return ResponseEntity.created(new URI("/api/disease-xi-ans/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /disease-xi-ans : Updates an existing diseaseXiAn.
     *
     * @param diseaseXiAn the diseaseXiAn to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated diseaseXiAn,
     * or with status 400 (Bad Request) if the diseaseXiAn is not valid,
     * or with status 500 (Internal Server Error) if the diseaseXiAn couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/disease-xi-ans")
    public ResponseEntity<DiseaseXiAn> updateDiseaseXiAn(@Valid @RequestBody DiseaseXiAn diseaseXiAn) throws URISyntaxException {
        log.debug("REST request to update DiseaseXiAn : {}", diseaseXiAn);
        if (diseaseXiAn.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        DiseaseXiAn result = diseaseXiAnRepository.save(diseaseXiAn);
        diseaseXiAnSearchRepository.save(result);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, diseaseXiAn.getId().toString()))
            .body(result);
    }

    /**
     * GET  /disease-xi-ans : get all the diseaseXiAns.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of diseaseXiAns in body
     */
    @GetMapping("/disease-xi-ans")
    public ResponseEntity<List<DiseaseXiAn>> getAllDiseaseXiAns(Pageable pageable) {
        log.debug("REST request to get a page of DiseaseXiAns");
        Page<DiseaseXiAn> page = diseaseXiAnRepository.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/disease-xi-ans");
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * GET  /disease-xi-ans/:id : get the "id" diseaseXiAn.
     *
     * @param id the id of the diseaseXiAn to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the diseaseXiAn, or with status 404 (Not Found)
     */
    @GetMapping("/disease-xi-ans/{id}")
    public ResponseEntity<DiseaseXiAn> getDiseaseXiAn(@PathVariable Long id) {
        log.debug("REST request to get DiseaseXiAn : {}", id);
        Optional<DiseaseXiAn> diseaseXiAn = diseaseXiAnRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(diseaseXiAn);
    }

    /**
     * DELETE  /disease-xi-ans/:id : delete the "id" diseaseXiAn.
     *
     * @param id the id of the diseaseXiAn to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/disease-xi-ans/{id}")
    public ResponseEntity<Void> deleteDiseaseXiAn(@PathVariable Long id) {
        log.debug("REST request to delete DiseaseXiAn : {}", id);
        diseaseXiAnRepository.deleteById(id);
        diseaseXiAnSearchRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }

    /**
     * SEARCH  /_search/disease-xi-ans?query=:query : search for the diseaseXiAn corresponding
     * to the query.
     *
     * @param query the query of the diseaseXiAn search
     * @param pageable the pagination information
     * @return the result of the search
     */
    @GetMapping("/_search/disease-xi-ans")
    public ResponseEntity<List<DiseaseXiAn>> searchDiseaseXiAns(@RequestParam String query, Pageable pageable) {
        log.debug("REST request to search for a page of DiseaseXiAns for query {}", query);
        Page<DiseaseXiAn> page = diseaseXiAnSearchRepository.search(queryStringQuery(query), pageable);
        HttpHeaders headers = PaginationUtil.generateSearchPaginationHttpHeaders(query, page, "/api/_search/disease-xi-ans");
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

}
