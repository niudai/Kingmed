package io.github.jhipster.sample.repository.search;

import io.github.jhipster.sample.domain.DiseaseMapIndexDTO;

import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the DiseaseGuangDong entity.
 */
public interface DiseaseMapIndexDTOSearchRepository extends ElasticsearchRepository<DiseaseMapIndexDTO, Long> {
}
