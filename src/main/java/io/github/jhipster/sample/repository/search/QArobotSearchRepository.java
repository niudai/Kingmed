package io.github.jhipster.sample.repository.search;

import io.github.jhipster.sample.domain.QArobot;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the QArobot entity.
 */
public interface QArobotSearchRepository extends ElasticsearchRepository<QArobot, Long> {
}
