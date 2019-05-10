package io.github.jhipster.sample.repository.search;

import io.github.jhipster.sample.domain.DiseaseXiAn;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the DiseaseXiAn entity.
 */
public interface DiseaseXiAnSearchRepository extends ElasticsearchRepository<DiseaseXiAn, Long> {
}
