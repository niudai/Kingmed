package io.github.jhipster.sample.repository.search;

import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.Configuration;

/**
 * Configure a Mock version of DiseaseGuangDongSearchRepository to test the
 * application without starting Elasticsearch.
 */
@Configuration
public class DiseaseGuangDongSearchRepositoryMockConfiguration {

    @MockBean
    private DiseaseGuangDongSearchRepository mockDiseaseGuangDongSearchRepository;

}
