package io.github.jhipster.sample.service;

import java.util.ArrayList;
import java.util.Collection;
import java.util.Collections;
import java.util.List;
import java.util.Set;

import javax.persistence.EntityManager;
import javax.persistence.TypedQuery;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Expression;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;
import javax.persistence.metamodel.EntityType;
import javax.persistence.metamodel.Metamodel;
import javax.transaction.Transactional;

import com.google.common.collect.Iterables;
import com.google.common.collect.Lists;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import io.github.jhipster.sample.domain.DiseaseXiAn;
import io.github.jhipster.sample.domain.ImageApplication;
import io.github.jhipster.sample.domain.ImageSupplies;
import io.github.jhipster.sample.domain.LinkCard;
import io.github.jhipster.sample.domain.QArobot;
import io.github.jhipster.sample.domain.User;
import io.github.jhipster.sample.repository.DiseaseXiAnRepository;
import io.github.jhipster.sample.repository.ImageApplicationRepository;
import io.github.jhipster.sample.repository.ImageSuppliesRepository;
import io.github.jhipster.sample.repository.LinkCardRepository;
import io.github.jhipster.sample.repository.QArobotRepository;
import io.github.jhipster.sample.repository.UserRepository;
import io.github.jhipster.sample.repository.search.DiseaseXiAnSearchRepository;

/**
 * DiseaseXiAnService
 */
@Service
public class DiseaseXiAnService {
    private final DiseaseXiAnRepository diseaseXiAnRepository;
    private final DiseaseXiAnSearchRepository diseaseXiAnSearchRepository;
    private final QArobotRepository qArobotRepository;
    private final ImageApplicationRepository imageApplicationRepository;
    private final ImageSuppliesRepository imageSuppliesRepository;
    private final UserRepository userRepository;
    private final LinkCardRepository linkCardRepository;
    private final EntityManager entityManager;

    @Autowired
    public DiseaseXiAnService(DiseaseXiAnRepository diseaseXiAnRepository
        , DiseaseXiAnSearchRepository diseaseXiAnSearchRepository
        , QArobotRepository qArobotRepository
        , ImageApplicationRepository imageApplicationRepository
        , ImageSuppliesRepository imageSuppliesRepository
        , LinkCardRepository linkCardRepository
        , UserRepository userRepository
        , EntityManager entityManager) {
        this.entityManager = entityManager;
        this.userRepository = userRepository;
        this.diseaseXiAnSearchRepository = diseaseXiAnSearchRepository;
        this.imageSuppliesRepository = imageSuppliesRepository;
        this.imageApplicationRepository = imageApplicationRepository;
        this.diseaseXiAnRepository = diseaseXiAnRepository;
        this.qArobotRepository = qArobotRepository;
        this.linkCardRepository = linkCardRepository;
    }

    // @Transactional
    // public List<DiseaseXiAn> findSimilarDiseaseXiAn(DiseaseXiAn diseaseXiAn, Pageable pageable) {
    //     diseaseXiAnRepository.f
    //     return diseaseXiAnSearchRepository.searchSimilar(entity, fields, pageable)
    // }

    /******************** Itself ************************/

    @Transactional
    public DiseaseXiAn updateDiseaseXiAn(DiseaseXiAn disease) {
        DiseaseXiAn result = diseaseXiAnRepository.findById(disease.getId()).get().update(disease);
        return result;
    }

    @Transactional
    public DiseaseXiAn postDiseaseXiAn(DiseaseXiAn disease) {
        return diseaseXiAnSearchRepository.save(diseaseXiAnRepository.save(disease));
    }

    /********************* QArobot ***********/
    @Transactional
    public Collection<QArobot> findQArobotsOfDiseaseXiAn(Long id) {
        DiseaseXiAn diseaseXiAn = diseaseXiAnRepository.findById(id).get();
        diseaseXiAn.getQarobots().size();
        return diseaseXiAn.getQarobots();
    }

    @Transactional
    public void activateDiseaseXiAn(Long id, Boolean activated) {
        DiseaseXiAn diseaseXiAn = diseaseXiAnRepository.findById(id).get();
        diseaseXiAn.setActivated(activated);
        diseaseXiAnSearchRepository.save(diseaseXiAn);
    }

    @Transactional
    public Collection<DiseaseXiAn> findDiseaseXiAnsOfQArobot(Long id) {
        QArobot qArobot = qArobotRepository.findById(id).get();
        qArobot.getDiseaseXiAns().size();
        return qArobot.getDiseaseXiAns();
    }

    @Transactional
    public void associateWithQArobot(Long bookId, Long publisherId) {
        DiseaseXiAn diseaseXiAn = diseaseXiAnRepository.findById(bookId).get();
        QArobot qArobot = qArobotRepository.findById(publisherId).get();
        diseaseXiAn.getQarobots().add(qArobot);
    }

    @Transactional
    public void deassociateWithQArobot(Long bookId, Long publisherId) {
        DiseaseXiAn diseaseXiAn = diseaseXiAnRepository.findById(bookId).get();
        diseaseXiAn.getQarobots().remove(qArobotRepository.findById(publisherId).get());
    }

    /***************************** Application ***************************/

    @Transactional
    public void associateWithApplication(Long diseaseId, Long applicationId) {
        DiseaseXiAn diseaseXiAn = diseaseXiAnRepository.findById(diseaseId).get();
        ImageApplication application = imageApplicationRepository.findById(applicationId).get();
        diseaseXiAn.getApplications().add(application);
    }

    @Transactional
    public void deassociateWithApplication(Long diseaseId, Long applicationId) {
        DiseaseXiAn diseaseXiAn = diseaseXiAnRepository.findById(diseaseId).get();
        diseaseXiAn.getApplications().remove(imageApplicationRepository.findById(applicationId).get());
    }

    @Transactional
    public Collection<ImageApplication> findApplicationsOfDiseaseXiAn(Long id) {
        DiseaseXiAn diseaseXiAn = diseaseXiAnRepository.findById(id).get();
        diseaseXiAn.getApplications().size();
        return diseaseXiAn.getApplications();
    }

    /***************************************** Supplies **************************/

    @Transactional
    public void associateWithSupplies(Long diseaseId, Long suppliesId) {
        DiseaseXiAn diseaseXiAn = diseaseXiAnRepository.findById(diseaseId).get();
        ImageSupplies supplies = imageSuppliesRepository.findById(suppliesId).get();
        diseaseXiAn.getSuppliess().add(supplies);
    }

    @Transactional
    public void deassociateWithSupplies(Long diseaseId, Long suppliesId) {
        DiseaseXiAn diseaseXiAn = diseaseXiAnRepository.findById(diseaseId).get();
        diseaseXiAn.getSuppliess().remove(imageSuppliesRepository.findById(suppliesId).get());
    }

    @Transactional
    public Collection<ImageSupplies> findSuppliessOfDiseaseXiAn(Long id) {
        DiseaseXiAn diseaseXiAn = diseaseXiAnRepository.findById(id).get();
        diseaseXiAn.getSuppliess().size();
        return diseaseXiAn.getSuppliess();
    }

    /***************************************** LinkCard **************************/

    /**
     * deattach link card to a disease branch
     * @param linkcard
     * @param diseaseXiAnId
     */
    @Transactional
    public void deattachLinkCardToDiseaseXiAn(LinkCard linkcard, Long diseaseXiAnId) {
        diseaseXiAnRepository.findById(diseaseXiAnId).get().getLinkCards().remove(linkcard);
    }

    /**
     * deattach link card to a disease branch
     * @param linkcard
     * @param diseaseXiAnId
     */
    public void attachLinkCardToDiseaseXiAn(LinkCard linkcard, Long diseaseXiAnId) {
        DiseaseXiAn diseaseXiAn = diseaseXiAnRepository.findById(diseaseXiAnId).get();
        Set<LinkCard> links = diseaseXiAn.getLinkCards();
       if (links.contains(linkcard)) {
           linkCardRepository.save(linkcard);
       } else {
            diseaseXiAn.getLinkCards().add(linkcard);
            diseaseXiAnRepository.save(diseaseXiAn);
       }
    }


    /********************* DiseaseXiAn ***********/
    @Transactional
    public List<DiseaseXiAn> findDiseaseXiAnsOfDiseaseXiAn(Long id) {
        DiseaseXiAn diseaseXiAn = diseaseXiAnRepository.findById(id).get();
        diseaseXiAn.getDiseaseXiAns().size();
        diseaseXiAn.getReversedDiseaseXiAns().size();
        return Lists.newArrayList(Iterables.concat(diseaseXiAn.getDiseaseXiAns(), diseaseXiAn.getReversedDiseaseXiAns()));
    }

    @Transactional
    public void associateWithDiseaseXiAn(Long ownId, Long reversedId) {
        DiseaseXiAn ownDiseaseXiAn = diseaseXiAnRepository.findById(ownId).get();
        DiseaseXiAn reversedDiseaseXiAn = diseaseXiAnRepository.findById(reversedId).get();
        ownDiseaseXiAn.getDiseaseXiAns().add(reversedDiseaseXiAn);
    }

    @Transactional
    public void deassociateWithDiseaseXiAn(Long ownId, Long reversedId) {
        DiseaseXiAn diseaseXiAn = diseaseXiAnRepository.findById(ownId).get();
        diseaseXiAn.getDiseaseXiAns().remove(diseaseXiAnRepository.findById(reversedId).get());
    }

    /********************* User ***********/
    @Transactional
    public List<User> getUsers(Long diseaseId) {
        return userRepository.findAllByDiseaseXiAnsId(diseaseId);
    }

    /********************** Search *****************/
    public Page<DiseaseXiAn> searchDiseases(
        Pageable pageable,
        String subsidiary,
        String projectConcourse,
        String query) {
        CriteriaBuilder cb = entityManager.getCriteriaBuilder();
        CriteriaQuery<DiseaseXiAn> diseaseQuery = cb.createQuery(DiseaseXiAn.class);
        CriteriaQuery<Long> countQuery = cb.createQuery(Long.class);
        Root<DiseaseXiAn> disease = diseaseQuery.from(DiseaseXiAn.class);
        Root<DiseaseXiAn> count = countQuery.from(DiseaseXiAn.class);
        List<Predicate> restrictions = new ArrayList<Predicate>();
        diseaseQuery.select(disease);
        countQuery.select(cb.count(count));
        if (subsidiary != null && subsidiary.length() > 0) {
            restrictions.add(cb.equal(disease.get("subsidiary"), subsidiary));
            // diseaseQuery = diseaseQuery.where(cb.equal(disease.get("subsidiary"), subsidiary));
            // countQuery = countQuery.where(cb.equal(disease.get("subsidiary"), subsidiary));
        }
        if (projectConcourse != null && projectConcourse.length() > 0) {
            restrictions.add(cb.equal(disease.get("projectConcourse"), projectConcourse));
            // diseaseQuery = diseaseQuery.where(cb.equal(disease.get("projectConcourse"), projectConcourse));
            // countQuery = countQuery.where(cb.equal(disease.get("projectConcourse"), projectConcourse));
        }
        if (query != null && query.length() > 0) {
            restrictions.add(cb.like(disease.get("name"), "%" + query + "%"));
            // diseaseQuery = diseaseQuery.where(cb.like(disease.get("name"), "%" + query + "%"));
            // countQuery = countQuery.where(cb.like(disease.get("name"), "%" + query + "%"));
        }
        Predicate finalPredicate = cb.and(restrictions.toArray(new Predicate[restrictions.size()]));
        diseaseQuery.where(finalPredicate);
        countQuery.where(finalPredicate);
        TypedQuery<DiseaseXiAn> typedDiseaseQuery = entityManager.createQuery(diseaseQuery);
        typedDiseaseQuery.setFirstResult((int)pageable.getOffset());
        typedDiseaseQuery.setMaxResults((int)pageable.getPageSize());
        TypedQuery<Long> typedCountQuery = entityManager.createQuery(countQuery);
        List<DiseaseXiAn> allDis = typedDiseaseQuery.getResultList();
        Long totalItems = typedCountQuery.getSingleResult();
        Page<DiseaseXiAn> resultPage = new PageImpl<>(allDis, pageable, totalItems);
        return resultPage;
    }



}
