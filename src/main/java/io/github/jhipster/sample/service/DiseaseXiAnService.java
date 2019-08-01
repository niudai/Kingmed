package io.github.jhipster.sample.service;

import java.util.Collection;
import java.util.Collections;
import java.util.List;
import java.util.Set;

import javax.transaction.Transactional;

import com.google.common.collect.Iterables;
import com.google.common.collect.Lists;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import io.github.jhipster.sample.domain.DiseaseXiAn;
import io.github.jhipster.sample.domain.ImageApplication;
import io.github.jhipster.sample.domain.ImageSupplies;
import io.github.jhipster.sample.domain.LinkCard;
import io.github.jhipster.sample.domain.QArobot;
import io.github.jhipster.sample.repository.DiseaseXiAnRepository;
import io.github.jhipster.sample.repository.ImageApplicationRepository;
import io.github.jhipster.sample.repository.ImageSuppliesRepository;
import io.github.jhipster.sample.repository.LinkCardRepository;
import io.github.jhipster.sample.repository.QArobotRepository;
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
    private final LinkCardRepository linkCardRepository;

    @Autowired
    public DiseaseXiAnService(DiseaseXiAnRepository diseaseXiAnRepository
        , DiseaseXiAnSearchRepository diseaseXiAnSearchRepository
        , QArobotRepository qArobotRepository
        , ImageApplicationRepository imageApplicationRepository
        , ImageSuppliesRepository imageSuppliesRepository
        , LinkCardRepository linkCardRepository) {
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
}
