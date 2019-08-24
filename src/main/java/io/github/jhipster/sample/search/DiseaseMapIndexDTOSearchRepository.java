package io.github.jhipster.sample.search;

import io.github.jhipster.sample.domain.DiseaseMapIndexDTO;

import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the DiseaseGuangDong entity.
 */
public interface DiseaseMapIndexDTOSearchRepository extends ElasticsearchRepository<DiseaseMapIndexDTO, Long> {
}
