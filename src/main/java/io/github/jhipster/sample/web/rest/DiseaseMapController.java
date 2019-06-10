package io.github.jhipster.sample.web.rest;

import io.github.jhipster.sample.domain.DiseaseBranch;
import io.github.jhipster.sample.domain.DiseaseMap;
import io.github.jhipster.sample.service.DiseaseMapService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
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
    @GetMapping("/get-all-disease-branch")
    public ResponseEntity<List<DiseaseBranch>> getAllDiseaseBranch() {
        return ResponseEntity.ok().body(diseaseMapService.getAllDiseaseBranch());
    }

    /**
     * deattach a disease branch
     * @param diseaseBranchId
     * @return 200
     */
    @GetMapping("/deattach-disease-branch")
    public ResponseEntity<Void> deattachDiseaseBranch(Long diseaseBranchId) {
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
     * attach disease map to a disease map.
     * @param newDiseaseMap
     * @param diseaseMapId
     */
    @PostMapping("/attach-disease-map-to-disease-map/{diseaseMapId}")
     public void attachDiseaseMapToDiseaseMap(@Valid @RequestBody DiseaseMap newDiseaseMap, @PathVariable Long diseaseMapId) {
        diseaseMapService.attachDiseaseMapToDiseaseMap(newDiseaseMap, diseaseMapId);
    }

}
