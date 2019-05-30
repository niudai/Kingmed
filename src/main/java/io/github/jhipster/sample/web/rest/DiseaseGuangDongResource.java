package io.github.jhipster.sample.web.rest;
import io.github.jhipster.sample.domain.DiseaseGuangDong;
import io.github.jhipster.sample.domain.Prices;
import io.github.jhipster.sample.repository.DiseaseGuangDongRepository;
import io.github.jhipster.sample.repository.PriceRepository;
import io.github.jhipster.sample.repository.search.DiseaseGuangDongSearchRepository;
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
 * REST controller for managing DiseaseGuangDong.
 */
@RestController
@RequestMapping("/api")
public class DiseaseGuangDongResource {

    private final Logger log = LoggerFactory.getLogger(DiseaseGuangDongResource.class);

    private static final String ENTITY_NAME = "diseaseGuangDong";

    private final DiseaseGuangDongRepository diseaseGuangDongRepository;

    private final DiseaseGuangDongSearchRepository diseaseGuangDongSearchRepository;

    private final PriceRepository priceRepository;

    public DiseaseGuangDongResource(DiseaseGuangDongRepository diseaseGuangDongRepository
        , DiseaseGuangDongSearchRepository diseaseGuangDongSearchRepository
        , PriceRepository priceRepository) {
        this.diseaseGuangDongRepository = diseaseGuangDongRepository;
        this.diseaseGuangDongSearchRepository = diseaseGuangDongSearchRepository;
        this.priceRepository = priceRepository;
    }

    /**
     * POST  /disease-guang-dongs : Create a new diseaseGuangDong.
     *
     * @param diseaseGuangDong the diseaseGuangDong to create
     * @return the ResponseEntity with status 201 (Created) and with body the new diseaseGuangDong, or with status 400 (Bad Request) if the diseaseGuangDong has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/disease-guang-dongs")
    public ResponseEntity<DiseaseGuangDong> createDiseaseGuangDong(@Valid @RequestBody DiseaseGuangDong diseaseGuangDong) throws URISyntaxException {
        log.debug("REST request to save DiseaseGuangDong : {}", diseaseGuangDong);
        if (diseaseGuangDong.getId() != null) {
            throw new BadRequestAlertException("A new diseaseGuangDong cannot already have an ID", ENTITY_NAME, "idexists");
        }
        DiseaseGuangDong result = diseaseGuangDongRepository.save(diseaseGuangDong);
        diseaseGuangDongSearchRepository.save(result);
        return ResponseEntity.created(new URI("/api/disease-guang-dongs/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }



    /**
     * PUT  /disease-guang-dongs : Updates an existing diseaseGuangDong.
     *
     * @param diseaseGuangDong the diseaseGuangDong to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated diseaseGuangDong,
     * or with status 400 (Bad Request) if the diseaseGuangDong is not valid,
     * or with status 500 (Internal Server Error) if the diseaseGuangDong couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/disease-guang-dongs")
    public ResponseEntity<DiseaseGuangDong> updateDiseaseGuangDong(@Valid @RequestBody DiseaseGuangDong diseaseGuangDong) throws URISyntaxException {
        log.debug("REST request to update DiseaseGuangDong : {}", diseaseGuangDong);
        if (diseaseGuangDong.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        DiseaseGuangDong result = diseaseGuangDongRepository.save(diseaseGuangDong);
        diseaseGuangDongSearchRepository.save(result);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, diseaseGuangDong.getId().toString()))
            .body(result);
    }


    /**
     * GET  /disease-guang-dongs : get all the diseaseGuangDongs.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of diseaseGuangDongs in body
     */
    @GetMapping("/disease-guang-dongs")
    public ResponseEntity<List<DiseaseGuangDong>> getAllDiseaseGuangDongs(Pageable pageable) {
        log.debug("REST request to get a page of DiseaseGuangDongs");
        Page<DiseaseGuangDong> page = diseaseGuangDongRepository.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/disease-guang-dongs");
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * GET  /disease-guang-dongs/:id : get the "id" diseaseGuangDong.
     *
     * @param id the id of the diseaseGuangDong to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the diseaseGuangDong, or with status 404 (Not Found)
     */
    @GetMapping("/disease-guang-dongs/{id}")
    public ResponseEntity<DiseaseGuangDong> getDiseaseGuangDong(@PathVariable Long id) {
        log.debug("REST request to get DiseaseGuangDong : {}", id);
        Optional<DiseaseGuangDong> diseaseGuangDong = diseaseGuangDongRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(diseaseGuangDong);
    }

    /**
     * Request /disease-guang-dongs-reindex : reindex the diseaseGuangDong
     *
     */
    @GetMapping("/disease-guang-dongs-reindex")
    public void reindexDiseaseGuangDong() {
        log.debug("REST request to reindex DiseaseGuangDong");
        diseaseGuangDongSearchRepository.deleteAll();
        List<DiseaseGuangDong> diseaseGuangDongs = diseaseGuangDongRepository.findAll();
        diseaseGuangDongSearchRepository.saveAll(diseaseGuangDongs);
    }

    /**
     * Request /disease-guang-dongs/getPrice/{id} : get price with a specified id.
     * @param id the id of price
     * @return response entity with price as response
     */
    @GetMapping("/disease-guang-dongs/getPrice/{id}")
    public ResponseEntity<Prices> getPrice(@PathVariable Long id) {
        log.debug("REST request to get price: {}", id);
        Prices result = priceRepository.findById(id).get();
        return ResponseEntity.ok().body(result);
    }

    /**
     * Request /disease-guang-dongs/addPrice/{id} : add price to a diseaseGuangDong
     * @param price Price to be added
     * @param id the id of diseaseGuangDong
     * @return ok with 200 status code.
     */
    @PostMapping("/disease-guang-dongs/addPrice/{id}")
    public ResponseEntity<Void> addNewPrice(@Valid @RequestBody Prices price, @PathVariable Long id) {
        log.debug("REST request to add new price: {}", price);
        DiseaseGuangDong disease = diseaseGuangDongRepository.findById(id).get();
        disease.getPrices().add(price);
        diseaseGuangDongRepository.save(disease);
        diseaseGuangDongSearchRepository.save(disease);
        return ResponseEntity.ok().build();
    }

    /**
     * Request to update a price
     * @param price the price to be updated
     * @param id the id of price
     * @return response entity with price as its body.
     */
    @PutMapping("/disease-guang-dongs/updatePrice")
    public ResponseEntity<Prices> updatePrice(@Valid @RequestBody Prices price) {
        log.debug("REST request to update price: {}", price);
        Prices result = priceRepository.save(price);
        return ResponseEntity.ok().body(result);
    }

    /**
     * Delete price
     * @param priceId the id of price to be deleted
     * @return 200 ok.
     */
    @DeleteMapping("/disease-guang-dongs/deletePrice/{priceId}")
    public ResponseEntity<Void> deletePrice(@PathVariable Long priceId) {
        log.debug("REST request to delete Price: {}", priceId);
        priceRepository.deleteById(priceId);
        return ResponseEntity.ok().build();
    }



    /**
     * DELETE  /disease-guang-dongs/:id : delete the "id" diseaseGuangDong.
     *
     * @param id the id of the diseaseGuangDong to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/disease-guang-dongs/{id}")
    public ResponseEntity<Void> deleteDiseaseGuangDong(@PathVariable Long id) {
        log.debug("REST request to delete DiseaseGuangDong : {}", id);
        diseaseGuangDongRepository.deleteById(id);
        diseaseGuangDongSearchRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }

    /**
     * SEARCH  /_search/disease-guang-dongs?query=:query : search for the diseaseGuangDong corresponding
     * to the query.
     *
     * @param query the query of the diseaseGuangDong search
     * @param pageable the pagination information
     * @return the result of the search
     */
    @GetMapping("/_search/disease-guang-dongs")
    public ResponseEntity<List<DiseaseGuangDong>> searchDiseaseGuangDongs(@RequestParam String query, Pageable pageable) {
        log.debug("REST request to search for a page of DiseaseGuangDongs for query {}", query);
        Page<DiseaseGuangDong> page = diseaseGuangDongSearchRepository.search(queryStringQuery(query), pageable);
        HttpHeaders headers = PaginationUtil.generateSearchPaginationHttpHeaders(query, page, "/api/_search/disease-guang-dongs");
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

}
