package io.github.jhipster.sample.web.rest;

import io.github.jhipster.sample.domain.DiseaseXiAn;
import io.github.jhipster.sample.domain.ImageApplication;
import io.github.jhipster.sample.domain.ImageSupplies;
import io.github.jhipster.sample.domain.PriceXiAn;
import io.github.jhipster.sample.domain.QArobot;
import io.github.jhipster.sample.repository.DiseaseXiAnRepository;
import io.github.jhipster.sample.repository.PriceXiAnRepository;
import io.github.jhipster.sample.repository.search.DiseaseXiAnSearchRepository;
import io.github.jhipster.sample.service.DiseaseMapService;
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
 * REST controller for managing DiseaseXiAn.
 */
@RestController
@RequestMapping("/api")
public class DiseaseXiAnResource {

    private final Logger log = LoggerFactory.getLogger(DiseaseXiAnResource.class);

    private static final String ENTITY_NAME = "diseaseXiAn";

    private final DiseaseXiAnRepository diseaseXiAnRepository;

    private final DiseaseXiAnSearchRepository diseaseXiAnSearchRepository;

    private final PriceXiAnRepository priceRepository;

    private final DiseaseXiAnService diseaseXiAnService;

    public DiseaseXiAnResource(DiseaseXiAnRepository diseaseXiAnRepository
        , DiseaseXiAnSearchRepository diseaseXiAnSearchRepository
        , PriceXiAnRepository priceXiAnRepository
        , DiseaseXiAnService diseaseXiAnService) {
        this.diseaseXiAnRepository = diseaseXiAnRepository;
        this.diseaseXiAnSearchRepository = diseaseXiAnSearchRepository;
        this.priceRepository = priceXiAnRepository;
        this.diseaseXiAnService = diseaseXiAnService;
    }

    /**
     * PUT  /disease-xi-ans/activate : activate diseaseXiAn.
     *
     * @param diseaseXiAn the diseaseXiAn to create
     * @return the ResponseEntity with status 201 (Created) and with body the new diseaseXiAn, or with status 400 (Bad Request) if the diseaseXiAn has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/disease-xi-ans/activate/{diseaseXiAn}/{activated}")
    public ResponseEntity<DiseaseXiAn> activateDiseaseXiAn(@PathVariable Long diseaseXiAnId, @PathVariable Boolean activated) throws URISyntaxException {
        diseaseXiAnService.activateDiseaseXiAn(diseaseXiAnId, activated);
        return ResponseEntity.ok().build();
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

    /******************************* Many To Many relationship between disease and application **************/

    /**
     * Associate a QA with a disease xi an
     * @param diseaseId
     * @param qarobotId
     * @return ok 200
     */
    @GetMapping("/disease-xi-ans/associate/{diseaseId}/{qarobotId}")
    public ResponseEntity<Void> associateWithQArobot(@PathVariable Long diseaseId
        , @PathVariable Long qarobotId) {

        diseaseXiAnService.associateWithQArobot(diseaseId, qarobotId);
        return ResponseEntity.ok().build();
    }

    /**
     * De associate a QA with a disease xi an
     * @param diseaseId
     * @param qarobotId
     * @return ok 200
     */
    @GetMapping("/disease-xi-ans/deassociate/{diseaseId}/{qarobotId}")
    public ResponseEntity<Void> deassociateWithQArobot(@PathVariable Long diseaseId
        , @PathVariable Long qarobotId) {

        diseaseXiAnService.deassociateWithQArobot(diseaseId, qarobotId);
        return ResponseEntity.ok().build();
    }

    /**
     * get associated qarobots of disease
     * @param id id of disease
     * @return ok 200
     */
    @GetMapping("/disease-xi-ans/getQArobotsOfDisease/{id}")
    public ResponseEntity<Collection<QArobot>> getQArobotsOfDisease(@PathVariable Long id) {
        return ResponseEntity.ok().body(diseaseXiAnService.findQArobotsOfDiseaseXiAn(id));
    }

    /**
     * get associated disease of qarobot
     * @param id id of qarobot
     * @return ok 200
     */
    @GetMapping("/disease-xi-ans/getDiseasesOfQArobot/{id}")
    public ResponseEntity<Collection<DiseaseXiAn>> getPublishersOfBook(@PathVariable Long id) {
        return ResponseEntity.ok().body(diseaseXiAnService.findDiseaseXiAnsOfQArobot(id));
    }

    /**************************************************************************************************** */

    /**************************************** Many to many relationship between disease and applciations***********/

    /**
     * Associate a QA with a disease xi an
     * @param diseaseId
     * @param applicationId
     * @return ok 200
     */
    @GetMapping("/disease-xi-ans/associateWithApplication/{diseaseId}/{applicationId}")
    public ResponseEntity<Void> associateWithApplication(@PathVariable Long diseaseId
        , @PathVariable Long applicationId) {

        diseaseXiAnService.associateWithApplication(diseaseId, applicationId);
        return ResponseEntity.ok().build();
    }

    /**
     * De associate a QA with a disease xi an
     * @param diseaseId
     * @param applicationId
     * @return ok 200
     */
    @GetMapping("/disease-xi-ans/deassociateWithApplication/{diseaseId}/{applicationId}")
    public ResponseEntity<Void> deassociateWithApplication(@PathVariable Long diseaseId
        , @PathVariable Long applicationId) {

        diseaseXiAnService.deassociateWithApplication(diseaseId, applicationId);
        return ResponseEntity.ok().build();
    }

    /**
     * get associated applications of disease
     * @param id id of disease
     * @return ok 200
     */
    @GetMapping("/disease-xi-ans/getApplicationsOfDisease/{id}")
    public ResponseEntity<Collection<ImageApplication>> getApplicationsOfDisease(@PathVariable Long id) {
        return ResponseEntity.ok().body(diseaseXiAnService.findApplicationsOfDiseaseXiAn(id));
    }

    /**************************************************************************************************** */

    /**************************************** Many to many relationship between disease and applciations***********/

    /**
     * Associate a QA with a disease xi an
     * @param diseaseId
     * @param suppliesId
     * @return ok 200
     */
    @GetMapping("/disease-xi-ans/associateWithSupplies/{diseaseId}/{suppliesId}")
    public ResponseEntity<Void> associateWithSupplies(@PathVariable Long diseaseId
        , @PathVariable Long suppliesId) {

        diseaseXiAnService.associateWithSupplies(diseaseId, suppliesId);
        return ResponseEntity.ok().build();
    }

    /**
     * De associate a QA with a disease xi an
     * @param diseaseId
     * @param suppliesId
     * @return ok 200
     */
    @GetMapping("/disease-xi-ans/deassociateWithSupplies/{diseaseId}/{suppliesId}")
    public ResponseEntity<Void> deassociateWithSupplies(@PathVariable Long diseaseId
        , @PathVariable Long suppliesId) {

        diseaseXiAnService.deassociateWithSupplies(diseaseId, suppliesId);
        return ResponseEntity.ok().build();
    }

    /**
     * get associated suppliess of disease
     * @param id id of disease
     * @return ok 200
     */
    @GetMapping("/disease-xi-ans/getSuppliessOfDisease/{id}")
    public ResponseEntity<Collection<ImageSupplies>> getSuppliessOfDisease(@PathVariable Long id) {
        return ResponseEntity.ok().body(diseaseXiAnService.findSuppliessOfDiseaseXiAn(id));
    }

    /********************************************** Disease Xi An ************************************/


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
     * Request /disease-xi-ans-reindex : reindex the diseaseGuangDong
     *
     */
    @GetMapping("/disease-xi-ans-reindex")
    public void reindexDiseaseXiAn() {
        log.debug("REST request to reindex DiseaseXiAn");
        diseaseXiAnSearchRepository.deleteAll();
        List<DiseaseXiAn> diseaseXiAns = diseaseXiAnRepository.findAll();
        diseaseXiAnSearchRepository.saveAll(diseaseXiAns);
    }

    /**
     * Request /disease-xi-ans/getPrice/{id} : get price with a specified id.
     * @param id the id of price
     * @return response entity with price as response
     */
    @GetMapping("/disease-xi-ans/getPrice/{id}")
    public ResponseEntity<PriceXiAn> getPrice(@PathVariable Long id) {
        log.debug("REST request to get price: {}", id);
        PriceXiAn result = priceRepository.findById(id).get();
        return ResponseEntity.ok().body(result);
    }


    /**
     * Request /disease-xi-ans/addPrice/{id} : add price to a diseaseXiAn
     * @param price Price to be added
     * @param id the id of diseaseXiAn
     * @return ok with 200 status code.
     */
    @PostMapping("/disease-xi-ans/addPrice/{id}")
    public ResponseEntity<Void> addNewPrice(@Valid @RequestBody PriceXiAn price, @PathVariable Long id) {
        log.debug("REST request to add new price: {}", price);
        DiseaseXiAn disease = diseaseXiAnRepository.findById(id).get();
        disease.getPrices().add(price);
        diseaseXiAnRepository.save(disease);
        diseaseXiAnSearchRepository.save(disease);
        return ResponseEntity.ok().build();
    }

    /**
     * Request to update a price
     * @param price the price to be updated
     * @param id the id of price
     * @return response entity with price as its body.
     */
    @PutMapping("/disease-xi-ans/updatePrice")
    public ResponseEntity<PriceXiAn> updatePrice(@Valid @RequestBody PriceXiAn price) {
        log.debug("REST request to update price: {}", price);
        PriceXiAn result = priceRepository.save(price);
        return ResponseEntity.ok().body(result);
    }

    /**
     * Delete price
     * @param priceId the id of price to be deleted
     * @return 200 ok.
     */
    @DeleteMapping("/disease-xi-ans/deletePrice/{priceId}")
    public ResponseEntity<Void> deletePrice(@PathVariable Long priceId) {
        log.debug("REST request to delete Price: {}", priceId);
        priceRepository.deleteById(priceId);
        return ResponseEntity.ok().build();
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
