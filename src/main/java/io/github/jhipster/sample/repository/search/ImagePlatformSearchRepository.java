package io.github.jhipster.sample.repository.search;

import io.github.jhipster.sample.domain.ImagePlatform;

import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the DiseaseXiAn entity.
 */
public interface ImagePlatformSearchRepository extends ElasticsearchRepository<ImagePlatform, Long> {
}
