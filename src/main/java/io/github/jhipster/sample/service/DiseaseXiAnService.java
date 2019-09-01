package io.github.jhipster.sample.service;

import static io.github.jhipster.sample.web.rest.util.SearchUtil.queryKeywordParser;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

import javax.persistence.EntityManager;
import javax.persistence.TypedQuery;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;
import javax.transaction.Transactional;

import com.google.common.collect.Iterables;
import com.google.common.collect.Lists;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;

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
import io.github.jhipster.sample.web.rest.searchdto.DiseaseXiAnSearchDTO;
/**
 * DiseaseXiAnService
 */
@Service
public class DiseaseXiAnService {
    private final DiseaseXiAnRepository diseaseXiAnRepository;
    private final QArobotRepository qArobotRepository;
    private final ImageApplicationRepository imageApplicationRepository;
    private final ImageSuppliesRepository imageSuppliesRepository;
    private final UserRepository userRepository;
    private final LinkCardRepository linkCardRepository;
    private final EntityManager entityManager;

    @Autowired
    public DiseaseXiAnService(DiseaseXiAnRepository diseaseXiAnRepository
        , QArobotRepository qArobotRepository
        , ImageApplicationRepository imageApplicationRepository
        , ImageSuppliesRepository imageSuppliesRepository
        , LinkCardRepository linkCardRepository
        , UserRepository userRepository

        , EntityManager entityManager) {
        this.entityManager = entityManager;
        this.userRepository = userRepository;
        this.imageSuppliesRepository = imageSuppliesRepository;
        this.imageApplicationRepository = imageApplicationRepository;
        this.diseaseXiAnRepository = diseaseXiAnRepository;
        this.qArobotRepository = qArobotRepository;
        this.linkCardRepository = linkCardRepository;
    }

    /******************** Itself ************************/

    @Transactional
    public DiseaseXiAn updateDiseaseXiAn(DiseaseXiAn disease) {
        DiseaseXiAn result = diseaseXiAnRepository.findById(disease.getId()).get().update(disease);
        return result;
    }

    @Transactional
    public DiseaseXiAn postDiseaseXiAn(DiseaseXiAn disease) {
        return diseaseXiAnRepository.save(disease);
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
        DiseaseXiAnSearchDTO searchDTO, Pageable pageable) {
        CriteriaBuilder cb = entityManager.getCriteriaBuilder();
        CriteriaQuery<DiseaseXiAn> diseaseQuery = cb.createQuery(DiseaseXiAn.class);
        CriteriaQuery<Long> countQuery = cb.createQuery(Long.class);
        Root<DiseaseXiAn> disease = diseaseQuery.from(DiseaseXiAn.class);
        Root<DiseaseXiAn> count = countQuery.from(DiseaseXiAn.class);
        List<Predicate> restrictions = new ArrayList<Predicate>();
        diseaseQuery.select(disease);
        countQuery.select(cb.count(count));

        String subsidiary = searchDTO.getSubsidiary();
        String projectConcourse = searchDTO.getProjectConcourse();
        String query = searchDTO.getQuery();

        // restrictions for properties
        if (subsidiary != null && subsidiary.length() > 0) {
            restrictions.add(cb.equal(disease.get("subsidiary"), subsidiary));
        }
        if (projectConcourse != null && projectConcourse.length() > 0) {
            restrictions.add(cb.equal(disease.get("projectConcourse"), projectConcourse));
        }
        Predicate termPredicate = cb.and(restrictions.toArray(new Predicate[restrictions.size()]));
        // restrictions for query string
        if (query != null && query.length() > 0) {
            restrictions.clear();
            restrictions.addAll(queryKeywordParser(query).stream().map(
                keyword -> cb.like(disease.get("name"), "%" + keyword + "%")
                ).collect(Collectors.toList()));
            restrictions.add(cb.like(disease.get("name"), "%" + query + "%"));
        }
        Predicate queryPredicate = restrictions.size() > 0 ? cb.or(restrictions.toArray(new Predicate[restrictions.size()])) :
            cb.and();
        // create final Predicate with term and query predicate
        Predicate finalPredicate = cb.and(termPredicate, queryPredicate);
        diseaseQuery.where(finalPredicate);
        countQuery.where(finalPredicate);

        // get diseases satisfied with criterias
        TypedQuery<DiseaseXiAn> typedDiseaseQuery = entityManager.createQuery(diseaseQuery);
        typedDiseaseQuery.setFirstResult((int)pageable.getOffset());
        typedDiseaseQuery.setMaxResults((int)pageable.getPageSize());
        List<DiseaseXiAn> allDis = typedDiseaseQuery.getResultList();

        // get totalItems number with criterias
        TypedQuery<Long> typedCountQuery = entityManager.createQuery(countQuery);
        Long totalItems = typedCountQuery.getSingleResult();

        // create a page in terms of the count and content
        Page<DiseaseXiAn> resultPage = new PageImpl<>(allDis, pageable, totalItems);
        return resultPage;
    }

    @Transactional
    public Optional<DiseaseXiAn> getDiseaseXiAn(Long id) {
        DiseaseXiAn diseaseXiAn = diseaseXiAnRepository.findById(id).get();
        diseaseXiAn.setViews(diseaseXiAn.getViews() + 1);
        return Optional.of(diseaseXiAn);
    }

}
