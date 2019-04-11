package io.github.jhipster.sample.web.rest;

import io.github.jhipster.sample.JhipsterElasticsearchSampleApplicationApp;

import io.github.jhipster.sample.domain.QArobot;
import io.github.jhipster.sample.repository.QArobotRepository;
import io.github.jhipster.sample.repository.search.QArobotSearchRepository;
import io.github.jhipster.sample.web.rest.errors.ExceptionTranslator;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.validation.Validator;

import javax.persistence.EntityManager;
import java.util.Collections;
import java.util.List;


import static io.github.jhipster.sample.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.elasticsearch.index.query.QueryBuilders.queryStringQuery;
import static org.hamcrest.Matchers.hasItem;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the QArobotResource REST controller.
 *
 * @see QArobotResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = JhipsterElasticsearchSampleApplicationApp.class)
public class QArobotResourceIntTest {

    private static final String DEFAULT_DISEASE_SERIES = "AAAAAAAAAA";
    private static final String UPDATED_DISEASE_SERIES = "BBBBBBBBBB";

    private static final String DEFAULT_PROJECT_SERIES = "AAAAAAAAAA";
    private static final String UPDATED_PROJECT_SERIES = "BBBBBBBBBB";

    private static final String DEFAULT_LEVEL = "AAAAAAAAAA";
    private static final String UPDATED_LEVEL = "BBBBBBBBBB";

    private static final String DEFAULT_QUESTION_TYPE = "AAAAAAAAAA";
    private static final String UPDATED_QUESTION_TYPE = "BBBBBBBBBB";

    private static final String DEFAULT_QUESTION = "AAAAAAAAAA";
    private static final String UPDATED_QUESTION = "BBBBBBBBBB";

    private static final String DEFAULT_ANSWER = "AAAAAAAAAA";
    private static final String UPDATED_ANSWER = "BBBBBBBBBB";

    private static final String DEFAULT_UPDATE_DATE = "AAAAAAAAAA";
    private static final String UPDATED_UPDATE_DATE = "BBBBBBBBBB";

    private static final String DEFAULT_SUBMITTER = "AAAAAAAAAA";
    private static final String UPDATED_SUBMITTER = "BBBBBBBBBB";

    private static final String DEFAULT_QA_SUBSIDIARY = "AAAAAAAAAA";
    private static final String UPDATED_QA_SUBSIDIARY = "BBBBBBBBBB";

    private static final String DEFAULT_SPECIAL_PROCESS = "AAAAAAAAAA";
    private static final String UPDATED_SPECIAL_PROCESS = "BBBBBBBBBB";

    private static final String DEFAULT_QA_CLASS = "AAAAAAAAAA";
    private static final String UPDATED_QA_CLASS = "BBBBBBBBBB";

    @Autowired
    private QArobotRepository qArobotRepository;

    /**
     * This repository is mocked in the io.github.jhipster.sample.repository.search test package.
     *
     * @see io.github.jhipster.sample.repository.search.QArobotSearchRepositoryMockConfiguration
     */
    @Autowired
    private QArobotSearchRepository mockQArobotSearchRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    @Autowired
    private Validator validator;

    private MockMvc restQArobotMockMvc;

    private QArobot qArobot;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final QArobotResource qArobotResource = new QArobotResource(qArobotRepository, mockQArobotSearchRepository);
        this.restQArobotMockMvc = MockMvcBuilders.standaloneSetup(qArobotResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter)
            .setValidator(validator).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static QArobot createEntity(EntityManager em) {
        QArobot qArobot = new QArobot()
            .diseaseSeries(DEFAULT_DISEASE_SERIES)
            .projectSeries(DEFAULT_PROJECT_SERIES)
            .level(DEFAULT_LEVEL)
            .questionType(DEFAULT_QUESTION_TYPE)
            .question(DEFAULT_QUESTION)
            .answer(DEFAULT_ANSWER)
            .updateDate(DEFAULT_UPDATE_DATE)
            .submitter(DEFAULT_SUBMITTER)
            .qaSubsidiary(DEFAULT_QA_SUBSIDIARY)
            .specialProcess(DEFAULT_SPECIAL_PROCESS)
            .qaClass(DEFAULT_QA_CLASS);
        return qArobot;
    }

    @Before
    public void initTest() {
        qArobot = createEntity(em);
    }

    @Test
    @Transactional
    public void createQArobot() throws Exception {
        int databaseSizeBeforeCreate = qArobotRepository.findAll().size();

        // Create the QArobot
        restQArobotMockMvc.perform(post("/api/q-arobots")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(qArobot)))
            .andExpect(status().isCreated());

        // Validate the QArobot in the database
        List<QArobot> qArobotList = qArobotRepository.findAll();
        assertThat(qArobotList).hasSize(databaseSizeBeforeCreate + 1);
        QArobot testQArobot = qArobotList.get(qArobotList.size() - 1);
        assertThat(testQArobot.getDiseaseSeries()).isEqualTo(DEFAULT_DISEASE_SERIES);
        assertThat(testQArobot.getProjectSeries()).isEqualTo(DEFAULT_PROJECT_SERIES);
        assertThat(testQArobot.getLevel()).isEqualTo(DEFAULT_LEVEL);
        assertThat(testQArobot.getQuestionType()).isEqualTo(DEFAULT_QUESTION_TYPE);
        assertThat(testQArobot.getQuestion()).isEqualTo(DEFAULT_QUESTION);
        assertThat(testQArobot.getAnswer()).isEqualTo(DEFAULT_ANSWER);
        assertThat(testQArobot.getUpdateDate()).isEqualTo(DEFAULT_UPDATE_DATE);
        assertThat(testQArobot.getSubmitter()).isEqualTo(DEFAULT_SUBMITTER);
        assertThat(testQArobot.getQaSubsidiary()).isEqualTo(DEFAULT_QA_SUBSIDIARY);
        assertThat(testQArobot.getSpecialProcess()).isEqualTo(DEFAULT_SPECIAL_PROCESS);
        assertThat(testQArobot.getQaClass()).isEqualTo(DEFAULT_QA_CLASS);

        // Validate the QArobot in Elasticsearch
        verify(mockQArobotSearchRepository, times(1)).save(testQArobot);
    }

    @Test
    @Transactional
    public void createQArobotWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = qArobotRepository.findAll().size();

        // Create the QArobot with an existing ID
        qArobot.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restQArobotMockMvc.perform(post("/api/q-arobots")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(qArobot)))
            .andExpect(status().isBadRequest());

        // Validate the QArobot in the database
        List<QArobot> qArobotList = qArobotRepository.findAll();
        assertThat(qArobotList).hasSize(databaseSizeBeforeCreate);

        // Validate the QArobot in Elasticsearch
        verify(mockQArobotSearchRepository, times(0)).save(qArobot);
    }

    @Test
    @Transactional
    public void getAllQArobots() throws Exception {
        // Initialize the database
        qArobotRepository.saveAndFlush(qArobot);

        // Get all the qArobotList
        restQArobotMockMvc.perform(get("/api/q-arobots?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(qArobot.getId().intValue())))
            .andExpect(jsonPath("$.[*].diseaseSeries").value(hasItem(DEFAULT_DISEASE_SERIES.toString())))
            .andExpect(jsonPath("$.[*].projectSeries").value(hasItem(DEFAULT_PROJECT_SERIES.toString())))
            .andExpect(jsonPath("$.[*].level").value(hasItem(DEFAULT_LEVEL.toString())))
            .andExpect(jsonPath("$.[*].questionType").value(hasItem(DEFAULT_QUESTION_TYPE.toString())))
            .andExpect(jsonPath("$.[*].question").value(hasItem(DEFAULT_QUESTION.toString())))
            .andExpect(jsonPath("$.[*].answer").value(hasItem(DEFAULT_ANSWER.toString())))
            .andExpect(jsonPath("$.[*].updateDate").value(hasItem(DEFAULT_UPDATE_DATE.toString())))
            .andExpect(jsonPath("$.[*].submitter").value(hasItem(DEFAULT_SUBMITTER.toString())))
            .andExpect(jsonPath("$.[*].qaSubsidiary").value(hasItem(DEFAULT_QA_SUBSIDIARY.toString())))
            .andExpect(jsonPath("$.[*].specialProcess").value(hasItem(DEFAULT_SPECIAL_PROCESS.toString())))
            .andExpect(jsonPath("$.[*].qaClass").value(hasItem(DEFAULT_QA_CLASS.toString())));
    }
    
    @Test
    @Transactional
    public void getQArobot() throws Exception {
        // Initialize the database
        qArobotRepository.saveAndFlush(qArobot);

        // Get the qArobot
        restQArobotMockMvc.perform(get("/api/q-arobots/{id}", qArobot.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(qArobot.getId().intValue()))
            .andExpect(jsonPath("$.diseaseSeries").value(DEFAULT_DISEASE_SERIES.toString()))
            .andExpect(jsonPath("$.projectSeries").value(DEFAULT_PROJECT_SERIES.toString()))
            .andExpect(jsonPath("$.level").value(DEFAULT_LEVEL.toString()))
            .andExpect(jsonPath("$.questionType").value(DEFAULT_QUESTION_TYPE.toString()))
            .andExpect(jsonPath("$.question").value(DEFAULT_QUESTION.toString()))
            .andExpect(jsonPath("$.answer").value(DEFAULT_ANSWER.toString()))
            .andExpect(jsonPath("$.updateDate").value(DEFAULT_UPDATE_DATE.toString()))
            .andExpect(jsonPath("$.submitter").value(DEFAULT_SUBMITTER.toString()))
            .andExpect(jsonPath("$.qaSubsidiary").value(DEFAULT_QA_SUBSIDIARY.toString()))
            .andExpect(jsonPath("$.specialProcess").value(DEFAULT_SPECIAL_PROCESS.toString()))
            .andExpect(jsonPath("$.qaClass").value(DEFAULT_QA_CLASS.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingQArobot() throws Exception {
        // Get the qArobot
        restQArobotMockMvc.perform(get("/api/q-arobots/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateQArobot() throws Exception {
        // Initialize the database
        qArobotRepository.saveAndFlush(qArobot);

        int databaseSizeBeforeUpdate = qArobotRepository.findAll().size();

        // Update the qArobot
        QArobot updatedQArobot = qArobotRepository.findById(qArobot.getId()).get();
        // Disconnect from session so that the updates on updatedQArobot are not directly saved in db
        em.detach(updatedQArobot);
        updatedQArobot
            .diseaseSeries(UPDATED_DISEASE_SERIES)
            .projectSeries(UPDATED_PROJECT_SERIES)
            .level(UPDATED_LEVEL)
            .questionType(UPDATED_QUESTION_TYPE)
            .question(UPDATED_QUESTION)
            .answer(UPDATED_ANSWER)
            .updateDate(UPDATED_UPDATE_DATE)
            .submitter(UPDATED_SUBMITTER)
            .qaSubsidiary(UPDATED_QA_SUBSIDIARY)
            .specialProcess(UPDATED_SPECIAL_PROCESS)
            .qaClass(UPDATED_QA_CLASS);

        restQArobotMockMvc.perform(put("/api/q-arobots")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedQArobot)))
            .andExpect(status().isOk());

        // Validate the QArobot in the database
        List<QArobot> qArobotList = qArobotRepository.findAll();
        assertThat(qArobotList).hasSize(databaseSizeBeforeUpdate);
        QArobot testQArobot = qArobotList.get(qArobotList.size() - 1);
        assertThat(testQArobot.getDiseaseSeries()).isEqualTo(UPDATED_DISEASE_SERIES);
        assertThat(testQArobot.getProjectSeries()).isEqualTo(UPDATED_PROJECT_SERIES);
        assertThat(testQArobot.getLevel()).isEqualTo(UPDATED_LEVEL);
        assertThat(testQArobot.getQuestionType()).isEqualTo(UPDATED_QUESTION_TYPE);
        assertThat(testQArobot.getQuestion()).isEqualTo(UPDATED_QUESTION);
        assertThat(testQArobot.getAnswer()).isEqualTo(UPDATED_ANSWER);
        assertThat(testQArobot.getUpdateDate()).isEqualTo(UPDATED_UPDATE_DATE);
        assertThat(testQArobot.getSubmitter()).isEqualTo(UPDATED_SUBMITTER);
        assertThat(testQArobot.getQaSubsidiary()).isEqualTo(UPDATED_QA_SUBSIDIARY);
        assertThat(testQArobot.getSpecialProcess()).isEqualTo(UPDATED_SPECIAL_PROCESS);
        assertThat(testQArobot.getQaClass()).isEqualTo(UPDATED_QA_CLASS);

        // Validate the QArobot in Elasticsearch
        verify(mockQArobotSearchRepository, times(1)).save(testQArobot);
    }

    @Test
    @Transactional
    public void updateNonExistingQArobot() throws Exception {
        int databaseSizeBeforeUpdate = qArobotRepository.findAll().size();

        // Create the QArobot

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restQArobotMockMvc.perform(put("/api/q-arobots")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(qArobot)))
            .andExpect(status().isBadRequest());

        // Validate the QArobot in the database
        List<QArobot> qArobotList = qArobotRepository.findAll();
        assertThat(qArobotList).hasSize(databaseSizeBeforeUpdate);

        // Validate the QArobot in Elasticsearch
        verify(mockQArobotSearchRepository, times(0)).save(qArobot);
    }

    @Test
    @Transactional
    public void deleteQArobot() throws Exception {
        // Initialize the database
        qArobotRepository.saveAndFlush(qArobot);

        int databaseSizeBeforeDelete = qArobotRepository.findAll().size();

        // Delete the qArobot
        restQArobotMockMvc.perform(delete("/api/q-arobots/{id}", qArobot.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<QArobot> qArobotList = qArobotRepository.findAll();
        assertThat(qArobotList).hasSize(databaseSizeBeforeDelete - 1);

        // Validate the QArobot in Elasticsearch
        verify(mockQArobotSearchRepository, times(1)).deleteById(qArobot.getId());
    }

    @Test
    @Transactional
    public void searchQArobot() throws Exception {
        // Initialize the database
        qArobotRepository.saveAndFlush(qArobot);
        when(mockQArobotSearchRepository.search(queryStringQuery("id:" + qArobot.getId()), PageRequest.of(0, 20)))
            .thenReturn(new PageImpl<>(Collections.singletonList(qArobot), PageRequest.of(0, 1), 1));
        // Search the qArobot
        restQArobotMockMvc.perform(get("/api/_search/q-arobots?query=id:" + qArobot.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(qArobot.getId().intValue())))
            .andExpect(jsonPath("$.[*].diseaseSeries").value(hasItem(DEFAULT_DISEASE_SERIES)))
            .andExpect(jsonPath("$.[*].projectSeries").value(hasItem(DEFAULT_PROJECT_SERIES)))
            .andExpect(jsonPath("$.[*].level").value(hasItem(DEFAULT_LEVEL)))
            .andExpect(jsonPath("$.[*].questionType").value(hasItem(DEFAULT_QUESTION_TYPE)))
            .andExpect(jsonPath("$.[*].question").value(hasItem(DEFAULT_QUESTION)))
            .andExpect(jsonPath("$.[*].answer").value(hasItem(DEFAULT_ANSWER)))
            .andExpect(jsonPath("$.[*].updateDate").value(hasItem(DEFAULT_UPDATE_DATE)))
            .andExpect(jsonPath("$.[*].submitter").value(hasItem(DEFAULT_SUBMITTER)))
            .andExpect(jsonPath("$.[*].qaSubsidiary").value(hasItem(DEFAULT_QA_SUBSIDIARY)))
            .andExpect(jsonPath("$.[*].specialProcess").value(hasItem(DEFAULT_SPECIAL_PROCESS)))
            .andExpect(jsonPath("$.[*].qaClass").value(hasItem(DEFAULT_QA_CLASS)));
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(QArobot.class);
        QArobot qArobot1 = new QArobot();
        qArobot1.setId(1L);
        QArobot qArobot2 = new QArobot();
        qArobot2.setId(qArobot1.getId());
        assertThat(qArobot1).isEqualTo(qArobot2);
        qArobot2.setId(2L);
        assertThat(qArobot1).isNotEqualTo(qArobot2);
        qArobot1.setId(null);
        assertThat(qArobot1).isNotEqualTo(qArobot2);
    }
}
