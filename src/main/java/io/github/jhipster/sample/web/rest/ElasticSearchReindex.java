
package io.github.jhipster.sample.web.rest;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import io.github.jhipster.sample.domain.BankAccount;
import io.github.jhipster.sample.domain.Label;
import io.github.jhipster.sample.domain.Operation;
import io.github.jhipster.sample.repository.BankAccountRepository;
import io.github.jhipster.sample.repository.LabelRepository;
import io.github.jhipster.sample.repository.OperationRepository;
import io.github.jhipster.sample.search.BankAccountSearchRepository;
import io.github.jhipster.sample.search.LabelSearchRepository;
import io.github.jhipster.sample.search.OperationSearchRepository;

/**
 * ElasticSearchReindex
 */
@RestController
public class ElasticSearchReindex {

    private final Logger log = LoggerFactory.getLogger(ElasticSearchReindex.class);

    LabelRepository labelRepository;
    BankAccountRepository bankAccountRepository;
    OperationRepository operationRepository;
    LabelSearchRepository labelSearchRepository;
    BankAccountSearchRepository bankAccountSearchRepository;
    OperationSearchRepository operationSearchRepository;

    public ElasticSearchReindex(LabelRepository labelRepository,
        BankAccountRepository bankAccountRepository,
        OperationRepository operationRepository,
        LabelSearchRepository labelSearchRepository,
        BankAccountSearchRepository bankAccountSearchRepository,
        OperationSearchRepository operationSearchRepository) {
        this.labelRepository = labelRepository;
        this.bankAccountRepository = bankAccountRepository;
        this.operationRepository = operationRepository;
        this.labelSearchRepository = labelSearchRepository;
        this.bankAccountSearchRepository = bankAccountSearchRepository;
        this.operationSearchRepository = operationSearchRepository;
    }

    @GetMapping("/reindexAll")
    public void reindexAll() {
        log.info("request to reindex all entities");
        bankAccountSearchRepository.deleteAll();
        List<BankAccount> bankAccount = bankAccountRepository.findAll();
        bankAccountSearchRepository.saveAll(bankAccount);
        operationSearchRepository.deleteAll();
        List<Operation> operation = operationRepository.findAll();
        operationSearchRepository.saveAll(operation);
        labelSearchRepository.deleteAll();
        List<Label> label = labelRepository.findAll();
        labelSearchRepository.saveAll(label);
        log.info("reindex all finished");
    }

}
