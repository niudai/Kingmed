package io.github.jhipster.sample.service;

import java.util.Collection;
import java.util.List;

import javax.persistence.EntityManagerFactory;
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
import io.github.jhipster.sample.domain.DiseaseMapIndexDTO;
import io.github.jhipster.sample.domain.DiseaseXiAn;
import io.github.jhipster.sample.domain.ImageApplication;
import io.github.jhipster.sample.domain.ImageSupplies;
import io.github.jhipster.sample.domain.LinkCard;
import io.github.jhipster.sample.domain.QArobot;
import io.github.jhipster.sample.repository.DiseaseBranchRepository;
import io.github.jhipster.sample.repository.DiseaseMapRepository;
import io.github.jhipster.sample.repository.DiseaseXiAnRepository;
import io.github.jhipster.sample.repository.ImageApplicationRepository;
import io.github.jhipster.sample.repository.ImageSuppliesRepository;
import io.github.jhipster.sample.repository.QArobotRepository;
import io.github.jhipster.sample.repository.search.DiseaseBranchSearchRepository;
import io.github.jhipster.sample.repository.search.DiseaseMapIndexDTOSearchRepository;
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
    private final DiseaseMapIndexDTOSearchRepository diseaseMapIndexDTOSearchRepository;
    private final EntityManagerFactory entityManagerFactory;

    @Autowired
    public DiseaseMapService(
        DiseaseMapRepository diseaseMapRepository,
        DiseaseBranchRepository diseaseBranchRepository,
        DiseaseXiAnRepository diseaseXiAnRepository,
        DiseaseBranchSearchRepository diseaseBranchSearchRepository,
        DiseaseMapIndexDTOSearchRepository diseaseMapIndexDTOSearchRepository,
        DiseaseMapSearchRepository diseaseMapSearchRepository,
        QArobotRepository qArobotRepository,
        EntityManagerFactory entityManagerFactory) {
        this.diseaseMapIndexDTOSearchRepository = diseaseMapIndexDTOSearchRepository;
        this.diseaseMapSearchRepository = diseaseMapSearchRepository;
        this.diseaseBranchSearchRepository = diseaseBranchSearchRepository;
        this.diseaseXiAnRepository = diseaseXiAnRepository;
        this.diseaseMapRepository = diseaseMapRepository;
        this.qArobotRepository = qArobotRepository;
        this.diseaseBranchRepository = diseaseBranchRepository;
        this.entityManagerFactory = entityManagerFactory;
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
     * get disease branch.
     * @return
     */
    @Transactional
    public DiseaseBranch getDiseaseBranchEagerly(Long diseaseBranchId) {
        DiseaseBranch diseaseBranch = diseaseBranchRepository.findById(diseaseBranchId).get();
        diseaseBranch.getDiseaseMaps().size();
        for (DiseaseMap map: diseaseBranch.getDiseaseMaps()) {
            map.getDiseaseMaps().size();
        }
        return diseaseBranch;
    }

    /**
     * get child disease maps of disease map.
     * @return
     */
    @Transactional
    public List<DiseaseMap> getDiseaseMaps(Long diseaseMapId) {
        DiseaseMap diseaseMap =  diseaseMapRepository.findById(diseaseMapId).get();
        diseaseMap.getDiseaseMaps().size();
        return diseaseMap.getDiseaseMaps();
    }

    /**
     * get disease map.
     * @return
     */
    // @Transactional
    public DiseaseMap getDiseaseMap(Long diseaseMapId) {
        DiseaseMap map =  diseaseMapRepository.findById(diseaseMapId).get();
        map.setDiseaseXiAns(null);
        map.setQarobots(null);
        return map;

    }

    @Transactional
    public DiseaseMap getDiseaseMapEagerly(Long diseaseMapId) {
        DiseaseMap map =  diseaseMapRepository.findById(diseaseMapId).get();
        map.getDiseaseXiAns().size();
        map.getQarobots().size();
        DiseaseMap dto = new DiseaseMap();
        dto.setDiseaseXiAns(map.getDiseaseXiAns());
        dto.setQarobots(map.getQarobots());
        return dto;
    }

    /**
     * get all disease maps in a disease branch
     * @param diseaseBranchId
     * @return
     */
    @org.springframework.transaction.annotation.Transactional
    public List<DiseaseMap> getAllDiseaseMap(Long diseaseBranchId) {

        List<DiseaseMap> diseaseMaps =  diseaseBranchRepository.findOneWithDiseaseMapsById(diseaseBranchId).get().getDiseaseMaps();

        return diseaseMaps;
    }

    /**
     * Deattach disease branch
     * @param diseaseBranchId
     */
    @Transactional
    public void deattachDiseaseBranch(Long diseaseBranchId) {
        DiseaseBranch diseaseBranch = diseaseBranchRepository.findById(diseaseBranchId).get();
        diseaseBranchSearchRepository.deleteById(diseaseBranchId);
        for (DiseaseMap map: diseaseBranch.getDiseaseMaps()) {
            diseaseMapIndexDTOSearchRepository.deleteById(map.getId());
        }
    }

    /**
     * Add new disease map to disease branch specified with diseaseBranchId.
     * @param diseaseMap
     * @param diseaseBranchId
     */
    @Transactional
    public void attachDiseaseMapToDiseaseBranch(DiseaseMap diseaseMap, Long diseaseBranchId) {
        DiseaseMap map = diseaseMapRepository.save(diseaseMap);
        diseaseBranchRepository.findById(diseaseBranchId).get().getDiseaseMaps().add(map);
        diseaseMapIndexDTOSearchRepository.save(diseaseMapIndexConverter(map));
    }

    /**
     * Put Disease Map what already exists in database to modify some content.
     * @param diseaseMap
     */
    @Transactional
    public void modifyDiseaseMap(DiseaseMap diseaseMap) {
        DiseaseMap newMap = modifyDiseaseMap(diseaseMapRepository.findById(diseaseMap.getId()).get(), diseaseMap);
        diseaseMapIndexDTOSearchRepository.save(diseaseMapIndexConverter(newMap));
    }

    /**
     * Modify disease Branch
     * @param diseaseMap
     */
    @Transactional
    public void modifyDiseaseBranch(DiseaseBranch diseaseBranch) {
        DiseaseBranch newBranch = modifyDiseaseBranch(diseaseBranchRepository
            .findById(diseaseBranch.getId()).get(), diseaseBranch);
        diseaseBranchSearchRepository.save(newBranch);
    }

    /**
     * delete a disease map. all sub disease map related to this map would be deleted.
     * @param diseaseMapId
     */
    @Transactional
    public void deleteDiseaseMap(Long diseaseMapId) {
        diseaseMapRepository.deleteById(diseaseMapId);
        diseaseMapIndexDTOSearchRepository.deleteById(diseaseMapId);
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
        diseaseMap.getQarobots().add(qArobot);
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
        diseaseMap.getQarobots().remove(qArobot);
    }

    /**
     * attach disease map to a disease map.
     * @param newDiseaseMap
     * @param diseaseMapId
     */
    @Transactional
    public void attachDiseaseMapToDiseaseMap(DiseaseMap newDiseaseMap, Long diseaseMapId) {
        DiseaseMap newMap = diseaseMapRepository.save(newDiseaseMap);
        diseaseMapRepository.findById(diseaseMapId).get().getDiseaseMaps().add(newMap);
        diseaseMapIndexDTOSearchRepository.save(diseaseMapIndexConverter(newMap));
    }

    /**
     * attach link card to a disease map.
     * @param linkcard
     * @param diseaseMapId
     */
    public void attachLinkCardToDiseaseMap(LinkCard linkcard, Long diseaseMapId) {
       DiseaseMap diseaseMap =  diseaseMapRepository.findById(diseaseMapId).get();
       diseaseMap.getLinkCards().add(linkcard);
       diseaseMapRepository.save(diseaseMap);
    }

    /**
     * attach link card to a disease map.
     * @param linkcard
     * @param diseaseMapId
     */
    @Transactional
    public void deattachLinkCardToDiseaseMap(LinkCard linkcard, Long diseaseMapId) {
        diseaseMapRepository.findById(diseaseMapId).get().getLinkCards().remove(linkcard);
    }

    /**
     * attach link card to a disease branch
     * @param linkcard
     * @param diseaseBranchId
     */
    public void attachLinkCardToDiseaseBranch(LinkCard linkcard, Long diseaseBranchId) {
        DiseaseBranch diseaseBranch = diseaseBranchRepository.findById(diseaseBranchId).get();
        diseaseBranch.getLinkCards().add(linkcard);
        diseaseBranchRepository.save(diseaseBranch);
    }

    /**
     * deattach link card to a disease branch
     * @param linkcard
     * @param diseaseBranchId
     */
    @Transactional
    public void deattachLinkCardToDiseaseBranch(LinkCard linkcard, Long diseaseBranchId) {
        diseaseBranchRepository.findById(diseaseBranchId).get().getLinkCards().remove(linkcard);
    }

    @Transactional
    public List<DiseaseBranch> searchDiseaseBranch(String query, Pageable pageable) {
        // Page<DiseaseBranch> page = diseaseBranchSearchRepository.search(QueryBuilders.queryStringQuery(query), pageable);
        List<DiseaseBranch> page =  Lists.newArrayList(diseaseBranchSearchRepository.search(QueryBuilders.queryStringQuery(query)));
        return page;
    }

    @Transactional
    public Page<DiseaseMapIndexDTO> searchDiseaseMap(String query, Pageable pageable) {
        // Page<DiseaseBranch> page = diseaseBranchSearchRepository.search(QueryBuilders.queryStringQuery(query), pageable);
        Page<DiseaseMapIndexDTO> page = diseaseMapIndexDTOSearchRepository.search(QueryBuilders.queryStringQuery(query), pageable);
        return page;
    }

    @Transactional
    public void reindexDiseaseBranch() {
        diseaseBranchSearchRepository.deleteAll();
        diseaseBranchSearchRepository.saveAll(diseaseBranchRepository.findAll());
    }

    public void reindexDiseaseMap() {
        List<DiseaseMap> diseaseMaps = diseaseMapRepository.findAll();
        for (DiseaseMap diseaseMap: diseaseMaps) {
            diseaseMapIndexDTOSearchRepository.save(diseaseMapIndexConverter(diseaseMap));
        }
    }

    private DiseaseMap modifyDiseaseMap(DiseaseMap oldMap, DiseaseMap newMap) {
        oldMap.setDescription(newMap.getDescription());
        oldMap.setId(newMap.getId());
        oldMap.setName(newMap.getName());
        oldMap.setSubsidiary(newMap.getSubsidiary());
        return oldMap;
    }

    private DiseaseBranch modifyDiseaseBranch(DiseaseBranch oldBranch, DiseaseBranch newBranch) {
        oldBranch.setDescription(newBranch.getDescription());
        oldBranch.setId(newBranch.getId());
        oldBranch.setName(newBranch.getName());
        oldBranch.setSubsidiary(newBranch.getSubsidiary());
        return oldBranch;
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
