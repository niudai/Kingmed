package io.github.jhipster.sample.service;

import java.util.Collection;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import io.github.jhipster.sample.domain.DiseaseMap;
import io.github.jhipster.sample.domain.DiseaseXiAn;
import io.github.jhipster.sample.domain.ImageApplication;
import io.github.jhipster.sample.domain.ImageSupplies;
import io.github.jhipster.sample.domain.QArobot;
import io.github.jhipster.sample.repository.DiseaseMapRepository;
import io.github.jhipster.sample.repository.DiseaseXiAnRepository;
import io.github.jhipster.sample.repository.ImageApplicationRepository;
import io.github.jhipster.sample.repository.ImageSuppliesRepository;
import io.github.jhipster.sample.repository.QArobotRepository;

/**
 * DiseaseMapService used to associate disease map with diseasexian and qarobot.
 * It can also used to create new disease map and associate the newly created disease
 * map with the parent disease map.
 */
@Service
public class DiseaseMapService {
    private final DiseaseXiAnRepository diseaseXiAnRepository;
    private final QArobotRepository qArobotRepository;
    private final DiseaseMapRepository diseaseMapRepository;

    @Autowired
    public DiseaseMapService(
        DiseaseMapRepository diseaseMapRepository,
        DiseaseXiAnRepository diseaseXiAnRepository
        , QArobotRepository qArobotRepository) {
        this.diseaseXiAnRepository = diseaseXiAnRepository;
        this.diseaseMapRepository = diseaseMapRepository;
        this.qArobotRepository = qArobotRepository;
    }

    @Transactional
    public void associateWithDiseaseXiAn(Long diseaseMapId, Long diseaseXiAnId) {
        DiseaseMap diseaseMap = diseaseMapRepository.findById(diseaseMapId).get();
        DiseaseXiAn diseaseXiAn = diseaseXiAnRepository.findById(diseaseXiAnId).get();
        diseaseMap.getDiseaseXiAns().add(diseaseXiAn);
    }

    @Transactional
    public void associatedWithQArobot(Long diseaseMapId, Long qArobotId) {
        DiseaseMap diseaseMap = diseaseMapRepository.findById(diseaseMapId).get();
        QArobot qArobot = qArobotRepository.findById(qArobotId).get();
        diseaseMap.getQArobots().add(qArobot);
    }

    @Transactional
    public void attachNewDiseaseMap(DiseaseMap newDiseaseMap, Long diseaseMapId) {
        diseaseMapRepository.findById(diseaseMapId).get().getDiseaseMaps().add(newDiseaseMap);
    }

    @Transactional
    public void detachNewDiseaseMap(Long diseaseMapId) {
        diseaseMapRepository.deleteById(diseaseMapId);
    }

    public void mountNewDiseaseMap(DiseaseMap new )

    /********************* QArobot ***********/
    @Transactional
    public Collection<QArobot> findQArobotsOfDiseaseXiAn(Long id) {
        DiseaseXiAn diseaseXiAn = diseaseXiAnRepository.findById(id).get();
        diseaseXiAn.getQarobots().size();
        return diseaseXiAn.getQarobots();
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
}
