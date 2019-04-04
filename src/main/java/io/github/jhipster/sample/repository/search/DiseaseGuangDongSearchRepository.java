package io.github.jhipster.sample.repository.search;

import io.github.jhipster.sample.domain.DiseaseGuangDong;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the DiseaseGuangDong entity.
 */
public interface DiseaseGuangDongSearchRepository extends ElasticsearchRepository<DiseaseGuangDong, Long> {
}
