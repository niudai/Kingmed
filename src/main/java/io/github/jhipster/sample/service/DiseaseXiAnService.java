package io.github.jhipster.sample.service;

import java.util.Collection;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import io.github.jhipster.sample.domain.DiseaseXiAn;
import io.github.jhipster.sample.domain.QArobot;
import io.github.jhipster.sample.repository.DiseaseXiAnRepository;
import io.github.jhipster.sample.repository.QArobotRepository;

/**
 * DiseaseXiAnService
 */
@Service
public class DiseaseXiAnService {
    private final DiseaseXiAnRepository diseaseXiAnRepository;
    private final QArobotRepository qArobotRepository;

    @Autowired
    public DiseaseXiAnService(DiseaseXiAnRepository diseaseXiAnRepository
        , QArobotRepository qArobotRepository) {
        this.diseaseXiAnRepository = diseaseXiAnRepository;
        this.qArobotRepository = qArobotRepository;
    }

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
    public void associate(Long bookId, Long publisherId) {
        DiseaseXiAn diseaseXiAn = diseaseXiAnRepository.findById(bookId).get();
        QArobot qArobot = qArobotRepository.findById(publisherId).get();
        diseaseXiAn.getQarobots().add(qArobot);
    }

    @Transactional
    public void deassociate(Long bookId, Long publisherId) {
        DiseaseXiAn diseaseXiAn = diseaseXiAnRepository.findById(bookId).get();
        diseaseXiAn.getQarobots().remove(qArobotRepository.findById(publisherId).get());
    }
}
