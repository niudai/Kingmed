package io.github.jhipster.sample.service;

import java.util.Collection;
import java.util.List;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import io.github.jhipster.sample.domain.DiseaseBranch;
import io.github.jhipster.sample.domain.DiseaseMap;
import io.github.jhipster.sample.domain.DiseaseXiAn;
import io.github.jhipster.sample.domain.ImageApplication;
import io.github.jhipster.sample.domain.ImageSupplies;
import io.github.jhipster.sample.domain.QArobot;
import io.github.jhipster.sample.repository.DiseaseBranchRepository;
import io.github.jhipster.sample.repository.DiseaseMapRepository;
import io.github.jhipster.sample.repository.DiseaseXiAnRepository;
import io.github.jhipster.sample.repository.ImageApplicationRepository;
import io.github.jhipster.sample.repository.ImageSuppliesRepository;
import io.github.jhipster.sample.repository.QArobotRepository;

/**
 * DiseaseMapService used to associate disease map with diseasexian and qarobot.
 * It can also used to create new disease map and associate the newly created disease
 * map with the parent disease map.
 *
 * Another job is to mount new disease branch and delete disease branch. attach new
 * disease map to disease branch.
 */
@Service
public class DiseaseMapService {
    private final DiseaseXiAnRepository diseaseXiAnRepository;
    private final QArobotRepository qArobotRepository;
    private final DiseaseMapRepository diseaseMapRepository;
    private final DiseaseBranchRepository diseaseBranchRepository;

    @Autowired
    public DiseaseMapService(
        DiseaseMapRepository diseaseMapRepository,
        DiseaseBranchRepository diseaseBranchRepository,
        DiseaseXiAnRepository diseaseXiAnRepository
        , QArobotRepository qArobotRepository) {
        this.diseaseXiAnRepository = diseaseXiAnRepository;
        this.diseaseMapRepository = diseaseMapRepository;
        this.qArobotRepository = qArobotRepository;
        this.diseaseBranchRepository = diseaseBranchRepository;
    }

    /**
     * Attach new disease branch.
     * @param newDiseaseBranch
     * @param diseaseBranchId
     */
    @Transactional
    public void attachDiseaseBranch(DiseaseBranch newDiseaseBranch) {
        diseaseBranchRepository.save(newDiseaseBranch);
    }

    /**
     * get All disease branch.
     * @return
     */
    public List<DiseaseBranch> getAllDiseaseBranch() {
        return diseaseBranchRepository.findAll();
    }

    /**
     * get disease branch.
     * @return
     */
    public DiseaseBranch getDiseaseBranch(Long diseaseBranchId) {
        return diseaseBranchRepository.findById(diseaseBranchId).get();
    }

    /**
     * get all disease maps in a disease branch
     * @param diseaseBranchId
     * @return
     */
    @org.springframework.transaction.annotation.Transactional
    public List<DiseaseMap> getAllDiseaseMap(Long diseaseBranchId) {
        List<DiseaseMap> diseaseMaps =  diseaseBranchRepository.findById(diseaseBranchId).get().getDiseaseMaps();
        diseaseMaps.size();
        return diseaseMaps;
    }

    /**
     * Deattach disease branch
     * @param diseaseBranchId
     */
    @Transactional
    public void deattachDiseaseBranch(Long diseaseBranchId) {
        diseaseBranchRepository.deleteById(diseaseBranchId);
    }

    /**
     * Add new disease map to disease branch specified with diseaseBranchId.
     * @param diseaseMap
     * @param diseaseBranchId
     */
    @Transactional
    public void attachDiseaseMapToDiseaseBranch(DiseaseMap diseaseMap, Long diseaseBranchId) {
        diseaseBranchRepository.findById(diseaseBranchId).get().getDiseaseMaps().add(diseaseMap);
    }

    /**
     * Put Disease Map what already exists in database to modify some content.
     * @param diseaseMap
     */
    @Transactional
    public void modifyDiseaseMap(DiseaseMap diseaseMap) {
        diseaseMapRepository.findById(diseaseMap.getId()).get().setName(diseaseMap.getName());
    }

    /**
     * Modify disease Branch
     * @param diseaseMap
     */
    @Transactional
    public void modifyDiseaseBranch(DiseaseBranch diseaseBranch) {
        DiseaseBranch _diseaseBranch = diseaseBranchRepository
            .findById(diseaseBranch.getId()).get();
        if (diseaseBranch.getDiseaseMaps() == null) {
            diseaseBranch.setDiseaseMaps(_diseaseBranch.getDiseaseMaps());
            diseaseBranchRepository.save(diseaseBranch);
        } else {
            diseaseBranchRepository.save(diseaseBranch);
        }
    }

    /**
     * delete a disease map. all sub disease map related to this map would be deleted.
     * @param diseaseMapId
     */
    @Transactional
    public void deleteDiseaseMap(Long diseaseMapId) {
        diseaseMapRepository.deleteById(diseaseMapId);
    }


    /**
     * associate diseaseMap with a diseaseXiAn
     * @param diseaseMapId
     * @param diseaseXiAnId
     */
    @Transactional
    public void associateWithDiseaseXiAn(Long diseaseMapId, Long diseaseXiAnId) {
        DiseaseMap diseaseMap = diseaseMapRepository.findById(diseaseMapId).get();
        DiseaseXiAn diseaseXiAn = diseaseXiAnRepository.findById(diseaseXiAnId).get();
        diseaseMap.getDiseaseXiAns().add(diseaseXiAn);
    }

    /**
     * deassociate diseaseMap with a diseaseXiAn
     * @param diseaseMapId
     * @param diseaseXiAnId
     */
    @Transactional
    public void deassociateWithDiseaseXiAn(Long diseaseMapId, Long diseaseXiAnId) {
        DiseaseMap diseaseMap = diseaseMapRepository.findById(diseaseMapId).get();
        DiseaseXiAn diseaseXiAn = diseaseXiAnRepository.findById(diseaseXiAnId).get();
        diseaseMap.getDiseaseXiAns().remove(diseaseXiAn);
    }

    /**
     * associate diseaseMap with QArobot.
     * @param diseaseMapId
     * @param qArobotId
     */
    @Transactional
    public void associatedWithQArobot(Long diseaseMapId, Long qArobotId) {
        DiseaseMap diseaseMap = diseaseMapRepository.findById(diseaseMapId).get();
        QArobot qArobot = qArobotRepository.findById(qArobotId).get();
        diseaseMap.getQArobots().add(qArobot);
    }

    /**
     * deassociate diseaseMap with QArobot.
     * @param diseaseMapId
     * @param qArobotId
     */
    @Transactional
    public void deassociatedWithQArobot(Long diseaseMapId, Long qArobotId) {
        DiseaseMap diseaseMap = diseaseMapRepository.findById(diseaseMapId).get();
        QArobot qArobot =  qArobotRepository.findById(qArobotId).get();
        diseaseMap.getQArobots().remove(qArobot);
    }

    /**
     * attach disease map to a disease map.
     * @param newDiseaseMap
     * @param diseaseMapId
     */
    @Transactional
    public void attachDiseaseMapToDiseaseMap(DiseaseMap newDiseaseMap, Long diseaseMapId) {
        diseaseMapRepository.findById(diseaseMapId).get().getDiseaseMaps().add(newDiseaseMap);
    }

}
