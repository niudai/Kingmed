package io.github.jhipster.sample.repository.search;

import io.github.jhipster.sample.domain.DiseaseBranch;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the DiseaseGuangDong entity.
 */
public interface DiseaseBranchSearchRepository extends ElasticsearchRepository<DiseaseBranch, Long> {
}
