package io.github.jhipster.sample.search;

import io.github.jhipster.sample.domain.ImageSupplies;

import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the DiseaseXiAn entity.
 */
public interface ImageSuppliesSearchRepository extends ElasticsearchRepository<ImageSupplies, Long> {
}
