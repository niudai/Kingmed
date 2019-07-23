package io.github.jhipster.sample.service;

import java.util.Collection;
import java.util.List;

import javax.transaction.Transactional;

import com.google.common.collect.Lists;

import org.elasticsearch.index.query.QueryBuilder;
import org.elasticsearch.index.query.QueryBuilders;
import org.elasticsearch.index.query.QueryStringQueryBuilder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestParam;

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
import io.github.jhipster.sample.repository.search.DiseaseBranchSearchRepository;
import io.github.jhipster.sample.repository.search.DiseaseMapSearchRepository;

import static org.elasticsearch.index.query.QueryBuilders.*;

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
    private final DiseaseBranchSearchRepository diseaseBranchSearchRepository;
    private final DiseaseMapSearchRepository diseaseMapSearchRepository;
    @Autowired
    public DiseaseMapService(
        DiseaseMapRepository diseaseMapRepository,
        DiseaseBranchRepository diseaseBranchRepository,
        DiseaseXiAnRepository diseaseXiAnRepository,
        DiseaseBranchSearchRepository diseaseBranchSearchRepository,
        DiseaseMapSearchRepository diseaseMapSearchRepository,
        QArobotRepository qArobotRepository) {
        this.diseaseMapSearchRepository = diseaseMapSearchRepository;
        this.diseaseBranchSearchRepository = diseaseBranchSearchRepository;
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
        diseaseBranchSearchRepository.save(newDiseaseBranch);
    }

    /**
     * get All disease branch.
     * @return
     */
    public Page<DiseaseBranch> getAllDiseaseBranchPageable(Pageable pageable) {
        Page<DiseaseBranch> page =  diseaseBranchRepository.findAll(pageable);
        return page;
    }

    /**
     * get All disease branch.
     * @return
     */
    public List<DiseaseBranch> getAllDiseaseBranch() {
        List<DiseaseBranch> page =  diseaseBranchRepository.findAll();
        return page;
    }

    /**
     * get disease branch.
     * @return
     */
    public DiseaseBranch getDiseaseBranch(Long diseaseBranchId) {
        return diseaseBranchRepository.findById(diseaseBranchId).get();
    }

    /**
     * get disease map.
     * @return
     */
    public DiseaseMap getDiseaseMap(Long diseaseMapId) {
        return diseaseMapRepository.findById(diseaseMapId).get();
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
        diseaseBranchSearchRepository.deleteById(diseaseBranchId);
    }

    /**
     * Add new disease map to disease branch specified with diseaseBranchId.
     * @param diseaseMap
     * @param diseaseBranchId
     */
    @Transactional
    public void attachDiseaseMapToDiseaseBranch(DiseaseMap diseaseMap, Long diseaseBranchId) {
        diseaseBranchRepository.findById(diseaseBranchId).get().getDiseaseMaps().add(diseaseMap);
        diseaseMapSearchRepository.save(diseaseMap);
    }

    /**
     * Put Disease Map what already exists in database to modify some content.
     * @param diseaseMap
     */
    @Transactional
    public void modifyDiseaseMap(DiseaseMap diseaseMap) {
        DiseaseMap _diseaseMap = diseaseMapRepository.findById(diseaseMap.getId()).get();
        _diseaseMap.setName(diseaseMap.getName());
        diseaseMapSearchRepository.save(_diseaseMap);
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
        }
        diseaseBranchRepository.save(diseaseBranch);
        diseaseBranchSearchRepository.save(diseaseBranch);
    }

    /**
     * delete a disease map. all sub disease map related to this map would be deleted.
     * @param diseaseMapId
     */
    @Transactional
    public void deleteDiseaseMap(Long diseaseMapId) {
        diseaseMapRepository.deleteById(diseaseMapId);
        diseaseMapSearchRepository.deleteById(diseaseMapId);
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
        diseaseMapSearchRepository.save(newDiseaseMap);
    }

    @Transactional
    public List<DiseaseBranch> searchDiseaseBranch(String query, Pageable pageable) {
        // Page<DiseaseBranch> page = diseaseBranchSearchRepository.search(QueryBuilders.queryStringQuery(query), pageable);
        List<DiseaseBranch> page =  Lists.newArrayList(diseaseBranchSearchRepository.search(QueryBuilders.queryStringQuery(query)));
        return page;
    }

    @Transactional
    public Page<DiseaseMap> searchDiseaseMap(String query, Pageable pageable) {
        // Page<DiseaseBranch> page = diseaseBranchSearchRepository.search(QueryBuilders.queryStringQuery(query), pageable);
        Page<DiseaseMap> page = diseaseMapSearchRepository.search(QueryBuilders.queryStringQuery(query), pageable);
        return page;
    }

    @Transactional
    public void reindexDiseaseBranch() {
        diseaseBranchSearchRepository.deleteAll();
        diseaseBranchSearchRepository.saveAll(diseaseBranchRepository.findAll());
    }

    @Transactional
    public void reindexDiseaseMap() {
        diseaseMapSearchRepository.deleteAll();
        diseaseMapSearchRepository.saveAll(diseaseMapRepository.findAll());
    }

}
