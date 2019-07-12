package io.github.jhipster.sample.repository.search;

import io.github.jhipster.sample.domain.ImageApplication;

import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the DiseaseXiAn entity.
 */
public interface ImageApplicationSearchRepository extends ElasticsearchRepository<ImageApplication, Long> {
}
