package io.github.jhipster.sample.web.rest;

import io.github.jhipster.sample.domain.DiseaseBranch;
import io.github.jhipster.sample.domain.DiseaseMap;
import io.github.jhipster.sample.domain.DiseaseMapIndexDTO;
import io.github.jhipster.sample.domain.LinkCard;
import io.github.jhipster.sample.repository.search.UserSearchRepository;
import io.github.jhipster.sample.service.DiseaseMapService;
import io.github.jhipster.sample.web.rest.util.PaginationUtil;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URISyntaxException;
import java.util.List;

/**
 * REST controller for managing DiseaseXiAn.
 */
@RestController
@RequestMapping("/api/disease-map")
public class DiseaseMapController {

    private final Logger log = LoggerFactory.getLogger(DiseaseMapController.class);

    private final DiseaseMapService diseaseMapService;

    public DiseaseMapController(DiseaseMapService diseaseMapService) {
        this.diseaseMapService = diseaseMapService;
    }

    /**
     * Attach disease branch
     * @param diseaseBranch
     * @return ok with 200
     */
    @PostMapping("/attach-disease-branch")
    public ResponseEntity<Void> attachDiseaseBranch(@Valid @RequestBody DiseaseBranch diseaseBranch) {
        diseaseMapService.attachDiseaseBranch(diseaseBranch);
        return ResponseEntity.ok().build();
    }

    /**
     * get all disease branches.
     * @return disease branches as a list
     */
    @GetMapping("/get-all-disease-branch-pageable")
    public ResponseEntity<List<DiseaseBranch>> getAllDiseaseBranchPageable(Pageable pageable) {
        Page<DiseaseBranch> page = diseaseMapService.getAllDiseaseBranchPageable(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "api/disease-map/get-all-disease-branch");
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * get all disease branches.
     * @return disease branches as a list
     */
    @GetMapping("/get-all-disease-branch")
    public ResponseEntity<List<DiseaseBranch>> getAllDiseaseBranch() {
        List<DiseaseBranch> page = diseaseMapService.getAllDiseaseBranch();
        return ResponseEntity.ok().body(page);
    }

    @GetMapping("/get-disease-branch/{diseaseBranchId}")
    public ResponseEntity<DiseaseBranch> getDiseaseBranch(@PathVariable Long diseaseBranchId) {
        return ResponseEntity.ok().body(diseaseMapService.getDiseaseBranch(diseaseBranchId));
    }

    @GetMapping("/get-disease-branch-eagerly/{diseaseBranchId}")
    public ResponseEntity<DiseaseBranch> getDiseaseBranchEagerly(@PathVariable Long diseaseBranchId) {
        return ResponseEntity.ok().body(diseaseMapService.getDiseaseBranchEagerly(diseaseBranchId));
    }



    /**
     * get child disease maps of disease map specified with diseasMapId
     * @param diseaseMapId
     * @return
     */
    @GetMapping("/get-disease-maps/{diseaseMapId}")
    public ResponseEntity<List<DiseaseMap>> getDiseaseMaps(@PathVariable Long diseaseMapId) {
        return ResponseEntity.ok().body(diseaseMapService.getDiseaseMaps(diseaseMapId));
    }

    /**
     * get current disease map specified with diseaseMapId
     * @param diseaseMapId
     * @return
     */
    @GetMapping("/get-disease-map/{diseaseMapId}")
    public ResponseEntity<DiseaseMap> getDiseaseMap(@PathVariable Long diseaseMapId) {
        return ResponseEntity.ok().body(diseaseMapService.getDiseaseMap(diseaseMapId));
    }

    /**
     * get current disease map eagerly with disease and qarobot specified with diseaseMapId
     * @param diseaseMapId
     * @return
     */
    @GetMapping("/get-disease-map-eagerly/{diseaseMapId}")
    public ResponseEntity<DiseaseMap> getDiseaseMapEagerly(@PathVariable Long diseaseMapId) {
        return ResponseEntity.ok().body(diseaseMapService.getDiseaseMapEagerly(diseaseMapId));
    }

    /**
     * get all disease maps in a disease branch
     * @param diseaseBranchId
     * @return
     */
    @GetMapping("/get-all-disease-map/{diseaseBranchId}")
    public List<DiseaseMap> getAllDiseaseMap(@PathVariable Long diseaseBranchId) {
        return diseaseMapService.getAllDiseaseMap(diseaseBranchId);
    }


    /**
     * deattach a disease branch
     * @param diseaseBranchId
     * @return 200
     */
    @DeleteMapping("/deattach-disease-branch/{diseaseBranchId}")
    public ResponseEntity<Void> deattachDiseaseBranch(@PathVariable Long diseaseBranchId) {
        diseaseMapService.deattachDiseaseBranch(diseaseBranchId);
        return ResponseEntity.ok().build();
    }

    /**
     * attach disease map to disease branch
     * @param diseaseMap
     * @param diseaseBranchId
     */
    @PostMapping("/attach-disease-map-to-disease-branch/{diseaseBranchId}")
    public void attachDiseaseMapToDiseaseBranch(@Valid @RequestBody DiseaseMap diseaseMap, @PathVariable Long diseaseBranchId) {
        diseaseMapService.attachDiseaseMapToDiseaseBranch(diseaseMap, diseaseBranchId);
    }

    /**
     * attach disease map to disease branch
     * @param linkCard
     * @param diseaseBranchId
     */
    @PostMapping("/attach-link-card-to-disease-branch/{diseaseBranchId}")
    public void attachLinkCardToDiseaseBranch(@Valid @RequestBody LinkCard linkCard, @PathVariable Long diseaseBranchId) {
        diseaseMapService.attachLinkCardToDiseaseBranch(linkCard, diseaseBranchId);
    }

    /**
     * attach disease map to disease branch
     * @param linkCard
     * @param diseaseBranchId
     */
    @PostMapping("/deattach-link-card-to-disease-branch/{diseaseBranchId}")
    public void deattachLinkCardToDiseaseBranch(@Valid @RequestBody LinkCard linkCard, @PathVariable Long diseaseBranchId) {
        diseaseMapService.deattachLinkCardToDiseaseBranch(linkCard, diseaseBranchId);
    }

    /**
     * attach disease map to disease branch
     * @param linkCard
     * @param diseaseMapId
     */
    @PostMapping("/attach-link-card-to-disease-map/{diseaseMapId}")
    public void attachLinkCardToDiseaseMap(@Valid @RequestBody LinkCard linkCard, @PathVariable Long diseaseMapId) {
        diseaseMapService.attachLinkCardToDiseaseMap(linkCard, diseaseMapId);
    }

    /**
     * attach disease map to disease branch
     * @param linkCard
     * @param diseaseMapId
     */
    @PostMapping("/deattach-link-card-to-disease-map/{diseaseMapId}")
    public void deattachLinkCardToDiseaseMap(@Valid @RequestBody LinkCard linkCard, @PathVariable Long diseaseMapId) {
        diseaseMapService.deattachLinkCardToDiseaseMap(linkCard, diseaseMapId);
    }

    /**
     * modify disease map
     * @param diseaseMap
     */
    @PutMapping("/modify-disease-map")
    public void modifyDiseaseMap(@Valid @RequestBody DiseaseMap diseaseMap) {
        diseaseMapService.modifyDiseaseMap(diseaseMap);
    }

    /**
     * modify disease branch
     * @param diseaseMapId
     */
    @PutMapping("/modify-disease-branch")
    public void modifyDiseaseBranch(@Valid @RequestBody DiseaseBranch diseaseBranch) {
        diseaseMapService.modifyDiseaseBranch(diseaseBranch);
    }

    /**
     *
     * @param diseaseXiAn
     * @return
     * @throws URISyntaxException
     */
    @DeleteMapping("/delete-disease-map/{diseaseMapId}")
    public void deleteDiseaseMap(@PathVariable Long diseaseMapId) {
        diseaseMapService.deleteDiseaseMap(diseaseMapId);
    }

   /**
     * associate diseaseMap with a diseaseXiAn
     * @param diseaseMapId
     * @param diseaseXiAnId
     */
    @GetMapping("/assocaite-with-disease-xi-an/{diseaseMapId}/{diseaseXiAnId}")
     public void associateWithDiseaseXiAn(@PathVariable Long diseaseMapId, @PathVariable Long diseaseXiAnId) {
        diseaseMapService.associateWithDiseaseXiAn(diseaseMapId, diseaseXiAnId);
    }

    @GetMapping("/deassocaite-with-disease-xi-an/{diseaseMapId}/{diseaseXiAnId}")
    public void deassociateWithDiseaseXiAn(@PathVariable Long diseaseMapId, @PathVariable Long diseaseXiAnId) {
       diseaseMapService.deassociateWithDiseaseXiAn(diseaseMapId, diseaseXiAnId);
   }

    /**
     * associate diseaseMap with QArobot.
     * @param diseaseMapId
     * @param qArobotId
     */
    @GetMapping("/associate-with-q-arobot/{diseaseMapId}/{qArobotId}")
     public void associatedWithQArobot(@PathVariable Long diseaseMapId, @PathVariable Long qArobotId) {
        diseaseMapService.associatedWithQArobot(diseaseMapId, qArobotId);
    }

    /**
     * deassociate diseaseMap with QArobot.
     * @param diseaseMapId
     * @param qArobotId
     */
    @GetMapping("/deassociate-with-q-arobot/{diseaseMapId}/{qArobotId}")
     public void deassociatedWithQArobot(@PathVariable Long diseaseMapId, @PathVariable Long qArobotId) {
        diseaseMapService.deassociatedWithQArobot(diseaseMapId, qArobotId);
    }

    /**
     * attach disease map to a disease map.
     * @param newDiseaseMap
     * @param diseaseMapId
     */
    @PostMapping("/attach-disease-map-to-disease-map/{diseaseMapId}")
     public void attachDiseaseMapToDiseaseMap(@Valid @RequestBody DiseaseMap newDiseaseMap, @PathVariable Long diseaseMapId) {
        diseaseMapService.attachDiseaseMapToDiseaseMap(newDiseaseMap, diseaseMapId);
    }

    @GetMapping("/_search-disease-branch")
    public ResponseEntity<List<DiseaseBranch>> searchBranch(@RequestParam String query, Pageable pageable) {
        log.debug("REST request to search for a page of Branch for query {}", query);
        List<DiseaseBranch> page = diseaseMapService.searchDiseaseBranch(query, pageable);
        return ResponseEntity.ok().body(page);
    }

    @GetMapping("/_search-disease-map")
    public ResponseEntity<List<DiseaseMapIndexDTO>> searchMap(@RequestParam String query, Pageable pageable) {
        log.debug("REST request to search for a page of Map for query {}", query);
        Page<DiseaseMapIndexDTO> page = diseaseMapService.searchDiseaseMap(query, pageable);
        HttpHeaders headers = PaginationUtil.generateSearchPaginationHttpHeaders(query, page, "/api/disease-map/_search-disease-map");
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    @GetMapping("/reindex-disease-branch")
    public ResponseEntity<Void> reindexDiseaseBranch() {
        log.debug("REST request to search for a page of DisaseBranch for query {}");
        diseaseMapService.reindexDiseaseBranch();
        return ResponseEntity.ok().build();
    }

    @GetMapping("/reindex-disease-map")
    public ResponseEntity<Void> reindexDiseaseMap() {
        log.debug("REST request to search for a page of DiseaseMap for query {}");
        diseaseMapService.reindexDiseaseMap();
        return ResponseEntity.ok().build();
    }

}
