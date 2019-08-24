package io.github.jhipster.sample.search;

import io.github.jhipster.sample.domain.DiseaseMap;

import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the DiseaseGuangDong entity.
 */
public interface DiseaseMapSearchRepository extends ElasticsearchRepository<DiseaseMap, Long> {
}
