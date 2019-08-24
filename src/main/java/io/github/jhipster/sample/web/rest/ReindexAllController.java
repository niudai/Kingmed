package io.github.jhipster.sample.web.rest;

import java.util.List;

import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.Transaction;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import io.github.jhipster.sample.domain.DiseaseMap;
import io.github.jhipster.sample.domain.DiseaseMapIndexDTO;
import io.github.jhipster.sample.repository.DiseaseBranchRepository;
import io.github.jhipster.sample.repository.DiseaseMapRepository;
import io.github.jhipster.sample.repository.DiseaseXiAnRepository;
import io.github.jhipster.sample.repository.ImageApplicationRepository;
import io.github.jhipster.sample.repository.ImageSuppliesRepository;
import io.github.jhipster.sample.repository.QArobotRepository;
import io.github.jhipster.sample.repository.UserRepository;
import io.github.jhipster.sample.search.DiseaseBranchSearchRepository;
import io.github.jhipster.sample.search.DiseaseMapIndexDTOSearchRepository;
import io.github.jhipster.sample.search.DiseaseMapSearchRepository;
import io.github.jhipster.sample.search.DiseaseXiAnSearchRepository;
import io.github.jhipster.sample.search.ImageApplicationSearchRepository;
import io.github.jhipster.sample.search.ImageSuppliesSearchRepository;
import io.github.jhipster.sample.search.QArobotSearchRepository;
import io.github.jhipster.sample.search.UserSearchRepository;

@RestController
@RequestMapping("/api")
public class ReindexAllController {

    private final Logger log = LoggerFactory.getLogger(RobotResource.class);

    @Autowired
    private ImageApplicationRepository imageApplicationRepository;

    @Autowired
    private ImageApplicationSearchRepository imageApplicationSearchRepository;

    @Autowired
    private ImageSuppliesRepository imageSuppliesRepository;

    @Autowired
    private ImageSuppliesSearchRepository imageSuppliesSearchRepository;

    @Autowired
    private DiseaseXiAnRepository diseaseXiAnRepository;

    @Autowired
    private DiseaseXiAnSearchRepository diseaseXiAnSearchRepository;

    @Autowired
    private QArobotRepository qArobotRepository;

    @Autowired
    private QArobotSearchRepository qArobotSearchRepository;

    @Autowired
    private DiseaseMapRepository diseaseMapRepository;

    @Autowired
    private DiseaseMapSearchRepository diseaseMapSearchRepository;

    @Autowired
    private DiseaseMapIndexDTOSearchRepository diseaseMapIndexDTOSearchRepository;

    @Autowired
    private DiseaseBranchRepository diseaseBranchRepository;

    @Autowired
    private DiseaseBranchSearchRepository diseaseBranchSearchRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private UserSearchRepository userSearchRepository;

    public ReindexAllController() {
    }

    /**
     * GET  /robots/:id : get the "id" robot.
     *
     * @param id the id of the robot to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the robot, or with status 404 (Not Found)
     */
    @GetMapping("/_reindexAll")
    public ResponseEntity<Void> reindexAll() {

        imageApplicationSearchRepository.deleteAll();
        imageApplicationSearchRepository.saveAll(imageApplicationRepository.findAll());

        imageSuppliesSearchRepository.deleteAll();
        imageSuppliesSearchRepository.saveAll(imageSuppliesRepository.findAll());

        diseaseXiAnSearchRepository.deleteAll();
        diseaseXiAnSearchRepository.saveAll(diseaseXiAnRepository.findAll());

        reindexDiseaseMap();

        qArobotSearchRepository.deleteAll();
        qArobotSearchRepository.saveAll(qArobotRepository.findAll());

        diseaseBranchSearchRepository.deleteAll();
        diseaseBranchSearchRepository.saveAll(diseaseBranchRepository.findAll());

        userSearchRepository.deleteAll();
        userSearchRepository.saveAll(userRepository.findAll());

        return ResponseEntity.ok().build();
    }

    public void reindexDiseaseMap() {
        List<DiseaseMap> diseaseMaps = diseaseMapRepository.findAll();
        for (DiseaseMap diseaseMap: diseaseMaps) {
            diseaseMapIndexDTOSearchRepository.save(diseaseMapIndexConverter(diseaseMap));
        }
    }

    public DiseaseMapIndexDTO diseaseMapIndexConverter(DiseaseMap diseaseMap) {
        DiseaseMapIndexDTO dto = new DiseaseMapIndexDTO();
        dto.setId(diseaseMap.getId());
        dto.setName(diseaseMap.getName());
        dto.setDescription(diseaseMap.getDescription());
        dto.setSubsidiary(diseaseMap.getSubsidiary());
        return dto;
    }

}
