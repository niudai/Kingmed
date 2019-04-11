package io.github.jhipster.sample.repository.search;

import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.Configuration;

/**
 * Configure a Mock version of QArobotSearchRepository to test the
 * application without starting Elasticsearch.
 */
@Configuration
public class QArobotSearchRepositoryMockConfiguration {

    @MockBean
    private QArobotSearchRepository mockQArobotSearchRepository;

}
