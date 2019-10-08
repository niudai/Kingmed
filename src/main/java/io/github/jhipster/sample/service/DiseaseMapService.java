package io.github.jhipster.sample.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

import javax.persistence.EntityManager;
import javax.persistence.TypedQuery;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;
import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import io.github.jhipster.sample.domain.DiseaseBranch;
import io.github.jhipster.sample.domain.DiseaseMap;
import io.github.jhipster.sample.domain.DiseaseMapIndexDTO;
import io.github.jhipster.sample.domain.DiseaseXiAn;
import io.github.jhipster.sample.domain.LinkCard;
import io.github.jhipster.sample.domain.QArobot;
import io.github.jhipster.sample.repository.DiseaseBranchRepository;
import io.github.jhipster.sample.repository.DiseaseMapRepository;
import io.github.jhipster.sample.repository.DiseaseXiAnRepository;
import io.github.jhipster.sample.repository.LinkCardRepository;
import io.github.jhipster.sample.repository.QArobotRepository;
import io.github.jhipster.sample.web.rest.searchdto.DiseaseMapSearchDTO;
import io.github.jhipster.sample.web.rest.util.SearchUtil;

/**
 * DiseaseMapService used to associate disease map with diseasexian and qarobot.
 * It can also used to create new disease map and associate the newly created
 * disease map with the parent disease map.
 *
 * Another job is to mount new disease branch and delete disease branch. attach
 * new disease map to disease branch.
 */
@Service
public class DiseaseMapService {
    private final DiseaseXiAnRepository diseaseXiAnRepository;
    private final QArobotRepository qArobotRepository;
    private final DiseaseMapRepository diseaseMapRepository;
    private final DiseaseBranchRepository diseaseBranchRepository;
    private final LinkCardRepository linkCardRepository;
    private final EntityManager entityManager;
    @Autowired
    public DiseaseMapService(
        DiseaseMapRepository diseaseMapRepository,
        DiseaseBranchRepository diseaseBranchRepository,
        DiseaseXiAnRepository diseaseXiAnRepository,
        QArobotRepository qArobotRepository,
        LinkCardRepository linkCardRepository,
        EntityManager entityManager) {
        this.diseaseXiAnRepository = diseaseXiAnRepository;
        this.diseaseMapRepository = diseaseMapRepository;
        this.qArobotRepository = qArobotRepository;
        this.diseaseBranchRepository = diseaseBranchRepository;
        this.linkCardRepository = linkCardRepository;
        this.entityManager = entityManager;
    }

    /**
     * Attach new disease branch.
     *
     * @param newDiseaseBranch
     * @param diseaseBranchId
     */
    @Transactional
    public DiseaseBranch attachDiseaseBranch(DiseaseBranch newDiseaseBranch) {
        return diseaseBranchRepository.save(newDiseaseBranch);
    }

    /**
     * get All disease branch.
     *
     * @return
     */
    public Page<DiseaseBranch> getAllDiseaseBranchPageable(Pageable pageable) {
        Page<DiseaseBranch> page = diseaseBranchRepository.findAll(pageable);
        return page;
    }

    /**
     * get All disease branch.
     *
     * @return
     */
    public List<DiseaseBranch> getAllDiseaseBranch() {
        List<DiseaseBranch> page = diseaseBranchRepository.findAll();
        return page;
    }

    /**
     * get disease branch.
     *
     * @return
     */
    public DiseaseBranch getDiseaseBranch(Long diseaseBranchId) {
        return diseaseBranchRepository.findById(diseaseBranchId).get();
    }

    /**
     * get disease branch.
     *
     * @return
     */
    @Transactional
    public DiseaseBranch getDiseaseBranchEagerly(Long diseaseBranchId) {
        DiseaseBranch diseaseBranch = diseaseBranchRepository.findById(diseaseBranchId).get();
        diseaseBranch.getDiseaseMaps().size();
        for (DiseaseMap map : diseaseBranch.getDiseaseMaps()) {
            map.getDiseaseMaps().size();
        }
        return diseaseBranch;
    }

    /**
     * get child disease maps of disease map.
     *
     * @return
     */
    @Transactional
    public List<DiseaseMap> getDiseaseMaps(Long diseaseMapId) {
        DiseaseMap diseaseMap = diseaseMapRepository.findById(diseaseMapId).get();
        diseaseMap.getDiseaseMaps().size();
        return diseaseMap.getDiseaseMaps();
    }

    /**
     * get disease map.
     *
     * @return
     */
    // @Transactional
    public DiseaseMap getDiseaseMap(Long diseaseMapId) {
        DiseaseMap map = diseaseMapRepository.findById(diseaseMapId).get();
        map.setDiseaseXiAns(null);
        map.setQarobots(null);
        return map;

    }

    @Transactional
    public DiseaseMap getDiseaseMapEagerly(Long diseaseMapId) {
        DiseaseMap map = diseaseMapRepository.findById(diseaseMapId).get();
        map.getDiseaseXiAns().size();
        map.getQarobots().size();
        DiseaseMap dto = new DiseaseMap();
        dto.setDiseaseXiAns(map.getDiseaseXiAns());
        dto.setQarobots(map.getQarobots());
        return dto;
    }

    /**
     * get all disease maps in a disease branch
     *
     * @param diseaseBranchId
     * @return
     */
    @org.springframework.transaction.annotation.Transactional
    public List<DiseaseMap> getAllDiseaseMap(Long diseaseBranchId) {

        List<DiseaseMap> diseaseMaps = diseaseBranchRepository.findOneWithDiseaseMapsById(diseaseBranchId).get()
                .getDiseaseMaps();

        return diseaseMaps;
    }

    /**
     * Deattach disease branch
     *
     * @param diseaseBranchId
     */
    @Transactional
    public void deattachDiseaseBranch(Long diseaseBranchId) {
        diseaseBranchRepository.deleteById(diseaseBranchId);
    }

    /**
     * Add new disease map to disease branch specified with diseaseBranchId.
     *
     * @param diseaseMap
     * @param diseaseBranchId
     */
    @Transactional
    public void attachDiseaseMapToDiseaseBranch(DiseaseMap diseaseMap, Long diseaseBranchId) {
        DiseaseMap map = diseaseMapRepository.save(diseaseMap);
        diseaseBranchRepository.findById(diseaseBranchId).get().getDiseaseMaps().add(map);
    }

    /**
     * Put Disease Map what already exists in database to modify some content.
     *
     * @param diseaseMap
     */
    @Transactional
    public void modifyDiseaseMap(DiseaseMap diseaseMap) {
        modifyDiseaseMap(diseaseMapRepository.findById(diseaseMap.getId()).get(), diseaseMap);
    }

    /**
     * Modify disease Branch
     *
     * @param diseaseMap
     */
    @Transactional
    public void modifyDiseaseBranch(DiseaseBranch diseaseBranch) {
        modifyDiseaseBranch(diseaseBranchRepository.findById(diseaseBranch.getId()).get(),
                diseaseBranch);
    }

    /**
     * delete a disease map. all sub disease map related to this map would be
     * deleted.
     *
     * @param diseaseMapId
     */
    @Transactional
    public void deleteDiseaseMap(Long diseaseMapId) {
        diseaseMapRepository.deleteById(diseaseMapId);
    }

    /**
     * associate diseaseMap with a diseaseXiAn
     *
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
     *
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
     *
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
     *
     * @param diseaseMapId
     * @param qArobotId
     */
    @Transactional
    public void deassociatedWithQArobot(Long diseaseMapId, Long qArobotId) {
        DiseaseMap diseaseMap = diseaseMapRepository.findById(diseaseMapId).get();
        QArobot qArobot = qArobotRepository.findById(qArobotId).get();
        diseaseMap.getQarobots().remove(qArobot);
    }

    /**
     * attach disease map to a disease map.
     *
     * @param newDiseaseMap
     * @param diseaseMapId
     */
    @Transactional
    public void attachDiseaseMapToDiseaseMap(DiseaseMap newDiseaseMap, Long diseaseMapId) {
        DiseaseMap newMap = diseaseMapRepository.save(newDiseaseMap);
        diseaseMapRepository.findById(diseaseMapId).get().getDiseaseMaps().add(newMap);
    }

    /**
     * attach link card to a disease map.
     *
     * @param linkcard
     * @param diseaseMapId
     */
    public void attachLinkCardToDiseaseMap(LinkCard linkcard, Long diseaseMapId) {
        DiseaseMap diseaseMap = diseaseMapRepository.findById(diseaseMapId).get();
        Set<LinkCard> links = diseaseMap.getLinkCards();
        if (links.contains(linkcard)) {
            linkCardRepository.save(linkcard);
        } else {
            diseaseMap.getLinkCards().add(linkcard);
            diseaseMapRepository.save(diseaseMap);
        }
    }

    /**
     * attach link card to a disease map.
     *
     * @param linkcard
     * @param diseaseMapId
     */
    @Transactional
    public void deattachLinkCardToDiseaseMap(LinkCard linkcard, Long diseaseMapId) {
        diseaseMapRepository.findById(diseaseMapId).get().getLinkCards().remove(linkcard);
    }

    /**
     * attach link card to a disease branch
     *
     * @param linkcard
     * @param diseaseBranchId
     */
    public void attachLinkCardToDiseaseBranch(LinkCard linkcard, Long diseaseBranchId) {
        DiseaseBranch diseaseBranch = diseaseBranchRepository.findById(diseaseBranchId).get();
        Set<LinkCard> links = diseaseBranch.getLinkCards();
        if (links.contains(linkcard)) {
            linkCardRepository.save(linkcard);
        } else {
            diseaseBranch.getLinkCards().add(linkcard);
            diseaseBranchRepository.save(diseaseBranch);
        }
    }

    /**
     * deattach link card to a disease branch
     *
     * @param linkcard
     * @param diseaseBranchId
     */
    @Transactional
    public void deattachLinkCardToDiseaseBranch(LinkCard linkcard, Long diseaseBranchId) {
        diseaseBranchRepository.findById(diseaseBranchId).get().getLinkCards().remove(linkcard);
    }

    @Transactional
    public Page<DiseaseBranch> searchDiseaseBranch(DiseaseMapSearchDTO searchDTO, Pageable pageable) {
        CriteriaBuilder cb = entityManager.getCriteriaBuilder();
        CriteriaQuery<DiseaseBranch> qarobotQuery = cb.createQuery(DiseaseBranch.class);
        CriteriaQuery<Long> countQuery = cb.createQuery(Long.class);
        Root<DiseaseBranch> qarobot = qarobotQuery.from(DiseaseBranch.class);
        Root<DiseaseBranch> count = countQuery.from(DiseaseBranch.class);

        List<Predicate> restrictions = new ArrayList<Predicate>();
        qarobotQuery.select(qarobot);
        countQuery.select(cb.count(count));

        String query = searchDTO.getName();
        if (query != null && query.length() > 0) {
            restrictions.clear();
            restrictions.addAll(SearchUtil.queryKeywordParser(query).stream().map(
                keyword -> cb.like(qarobot.get("name"), "%" + keyword + "%")
                ).collect(Collectors.toList()));
            restrictions.add(cb.like(qarobot.get("name"), "%" + query + "%"));
        }

        Predicate queryPredicate =
            restrictions.size() > 0 ?
                cb.or(restrictions.toArray(new Predicate[restrictions.size()])) : cb.and();

        qarobotQuery.where(queryPredicate);

        // get qarobots satisfied with criterias
        TypedQuery<DiseaseBranch> typedDiseaseQuery = entityManager.createQuery(qarobotQuery);
        // typedDiseaseQuery.setFirstResult((int)pageable.getOffset());
        // typedDiseaseQuery.setMaxResults((int)pageable.getPageSize());
        List<DiseaseBranch> allDis = typedDiseaseQuery.getResultList();

        // get totalItems number with criterias
        TypedQuery<Long> typedCountQuery = entityManager.createQuery(countQuery);
        Long totalItems = typedCountQuery.getSingleResult();

        // create a page in terms of the count and content
        Page<DiseaseBranch> resultPage = new PageImpl<>(allDis, pageable, totalItems);

        return resultPage;
    }

    @Transactional
    public Page<DiseaseMapIndexDTO> searchDiseaseMap(DiseaseMapSearchDTO searchDTO, Pageable pageable) {
        CriteriaBuilder cb = entityManager.getCriteriaBuilder();
        CriteriaQuery<DiseaseMap> qarobotQuery = cb.createQuery(DiseaseMap.class);
        CriteriaQuery<Long> countQuery = cb.createQuery(Long.class);
        Root<DiseaseMap> qarobot = qarobotQuery.from(DiseaseMap.class);
        Root<DiseaseMap> count = countQuery.from(DiseaseMap.class);

        List<Predicate> restrictions = new ArrayList<Predicate>();
        qarobotQuery.select(qarobot);
        countQuery.select(cb.count(count));

        String query = searchDTO.getName();
        if (query != null && query.length() > 0) {
            restrictions.clear();
            restrictions.addAll(SearchUtil.queryKeywordParser(query).stream().map(
                keyword -> cb.like(qarobot.get("name"), "%" + keyword + "%")
                ).collect(Collectors.toList()));
            restrictions.add(cb.like(qarobot.get("name"), "%" + query + "%"));
        }

        Predicate queryPredicate =
            restrictions.size() > 0 ?
                cb.or(restrictions.toArray(new Predicate[restrictions.size()])) : cb.and();

        qarobotQuery.where(queryPredicate);

        // get qarobots satisfied with criterias
        TypedQuery<DiseaseMap> typedDiseaseQuery = entityManager.createQuery(qarobotQuery);
        typedDiseaseQuery.setFirstResult((int)pageable.getOffset());
        typedDiseaseQuery.setMaxResults((int)pageable.getPageSize());
        List<DiseaseMap> allDis = typedDiseaseQuery.getResultList();

        // get totalItems number with criterias
        TypedQuery<Long> typedCountQuery = entityManager.createQuery(countQuery);
        Long totalItems = typedCountQuery.getSingleResult();

        // create a page in terms of the count and content
        Page<DiseaseMapIndexDTO> resultPage = new PageImpl<DiseaseMapIndexDTO>(allDis.stream().map(any -> any.toIndexDTO()).collect(Collectors.toList()), pageable, totalItems);

        return resultPage;
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
