package io.github.jhipster.sample.search;

import io.github.jhipster.sample.domain.Label;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the Label entity.
 */
public interface LabelSearchRepository extends ElasticsearchRepository<Label, Long> {
}
