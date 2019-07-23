package io.github.jhipster.sample.web.rest;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import io.github.jhipster.sample.domain.DiseaseMap;
import io.github.jhipster.sample.repository.DiseaseBranchRepository;
import io.github.jhipster.sample.repository.DiseaseMapRepository;
import io.github.jhipster.sample.repository.DiseaseXiAnRepository;
import io.github.jhipster.sample.repository.ImageApplicationRepository;
import io.github.jhipster.sample.repository.ImageSuppliesRepository;
import io.github.jhipster.sample.repository.QArobotRepository;
import io.github.jhipster.sample.repository.UserRepository;
import io.github.jhipster.sample.repository.search.DiseaseBranchSearchRepository;
import io.github.jhipster.sample.repository.search.DiseaseMapSearchRepository;
import io.github.jhipster.sample.repository.search.DiseaseXiAnSearchRepository;
import io.github.jhipster.sample.repository.search.ImageApplicationSearchRepository;
import io.github.jhipster.sample.repository.search.ImageSuppliesSearchRepository;
import io.github.jhipster.sample.repository.search.QArobotSearchRepository;
import io.github.jhipster.sample.repository.search.UserSearchRepository;
import io.github.jhipster.web.util.ResponseUtil;

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

        qArobotSearchRepository.deleteAll();
        qArobotSearchRepository.saveAll(qArobotRepository.findAll());

        diseaseMapSearchRepository.deleteAll();
        diseaseMapSearchRepository.saveAll(diseaseMapRepository.findAll());

        diseaseBranchSearchRepository.deleteAll();
        diseaseBranchSearchRepository.saveAll(diseaseBranchRepository.findAll());

        userSearchRepository.deleteAll();
        userSearchRepository.saveAll(userRepository.findAll());

        return ResponseEntity.ok().build();
    }

}