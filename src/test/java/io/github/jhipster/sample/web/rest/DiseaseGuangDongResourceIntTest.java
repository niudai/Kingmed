package io.github.jhipster.sample.web.rest;

import io.github.jhipster.sample.JhipsterElasticsearchSampleApplicationApp;

import io.github.jhipster.sample.domain.DiseaseGuangDong;
import io.github.jhipster.sample.repository.DiseaseGuangDongRepository;
import io.github.jhipster.sample.repository.search.DiseaseGuangDongSearchRepository;
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
 * Test class for the DiseaseGuangDongResource REST controller.
 *
 * @see DiseaseGuangDongResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = JhipsterElasticsearchSampleApplicationApp.class)
public class DiseaseGuangDongResourceIntTest {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_SUBSIDIARY = "AAAAAAAAAA";
    private static final String UPDATED_SUBSIDIARY = "BBBBBBBBBB";

    private static final String DEFAULT_SUPPLEMENT = "AAAAAAAAAA";
    private static final String UPDATED_SUPPLEMENT = "BBBBBBBBBB";

    private static final String DEFAULT_TEST_METHOD = "AAAAAAAAAA";
    private static final String UPDATED_TEST_METHOD = "BBBBBBBBBB";

    private static final String DEFAULT_SAMPLE = "AAAAAAAAAA";
    private static final String UPDATED_SAMPLE = "BBBBBBBBBB";

    private static final String DEFAULT_ROOM_PRESERVATION = "AAAAAAAAAA";
    private static final String UPDATED_ROOM_PRESERVATION = "BBBBBBBBBB";

    private static final String DEFAULT_COLD_STORAGE_PRESERVATION = "AAAAAAAAAA";
    private static final String UPDATED_COLD_STORAGE_PRESERVATION = "BBBBBBBBBB";

    private static final String DEFAULT_FREEZING = "AAAAAAAAAA";
    private static final String UPDATED_FREEZING = "BBBBBBBBBB";

    private static final String DEFAULT_CLINICAL_APPLICATION = "AAAAAAAAAA";
    private static final String UPDATED_CLINICAL_APPLICATION = "BBBBBBBBBB";

    private static final String DEFAULT_TOLL_STANDARD = "AAAAAAAAAA";
    private static final String UPDATED_TOLL_STANDARD = "BBBBBBBBBB";

    private static final String DEFAULT_REPORTING_TIME = "AAAAAAAAAA";
    private static final String UPDATED_REPORTING_TIME = "BBBBBBBBBB";

    private static final String DEFAULT_REMARKS = "AAAAAAAAAA";
    private static final String UPDATED_REMARKS = "BBBBBBBBBB";

    private static final String DEFAULT_CHARGE_CODE = "AAAAAAAAAA";
    private static final String UPDATED_CHARGE_CODE = "BBBBBBBBBB";

    private static final String DEFAULT_CLASSIFICATION = "AAAAAAAAAA";
    private static final String UPDATED_CLASSIFICATION = "BBBBBBBBBB";

    private static final String DEFAULT_APPLICATION_UNIT_TYPE = "AAAAAAAAAA";
    private static final String UPDATED_APPLICATION_UNIT_TYPE = "BBBBBBBBBB";

    private static final String DEFAULT_SERIES = "AAAAAAAAAA";
    private static final String UPDATED_SERIES = "BBBBBBBBBB";

    private static final String DEFAULT_PROJECT_CHANGE_NOTIFICATION = "AAAAAAAAAA";
    private static final String UPDATED_PROJECT_CHANGE_NOTIFICATION = "BBBBBBBBBB";

    private static final String DEFAULT_SPECIAL_INSPECTION_ITEMS = "AAAAAAAAAA";
    private static final String UPDATED_SPECIAL_INSPECTION_ITEMS = "BBBBBBBBBB";

    private static final String DEFAULT_STOP_DEVELOPING = "AAAAAAAAAA";
    private static final String UPDATED_STOP_DEVELOPING = "BBBBBBBBBB";

    private static final String DEFAULT_PROJECT_CONCOURSE = "AAAAAAAAAA";
    private static final String UPDATED_PROJECT_CONCOURSE = "BBBBBBBBBB";

    private static final String DEFAULT_TEST_DEPARTMENT = "AAAAAAAAAA";
    private static final String UPDATED_TEST_DEPARTMENT = "BBBBBBBBBB";

    private static final String DEFAULT_SUPPLIES_SERIES = "AAAAAAAAAA";
    private static final String UPDATED_SUPPLIES_SERIES = "BBBBBBBBBB";

    @Autowired
    private DiseaseGuangDongRepository diseaseGuangDongRepository;

    /**
     * This repository is mocked in the io.github.jhipster.sample.repository.search test package.
     *
     * @see io.github.jhipster.sample.repository.search.DiseaseGuangDongSearchRepositoryMockConfiguration
     */
    @Autowired
    private DiseaseGuangDongSearchRepository mockDiseaseGuangDongSearchRepository;

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

    private MockMvc restDiseaseGuangDongMockMvc;

    private DiseaseGuangDong diseaseGuangDong;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final DiseaseGuangDongResource diseaseGuangDongResource = new DiseaseGuangDongResource(diseaseGuangDongRepository, mockDiseaseGuangDongSearchRepository);
        this.restDiseaseGuangDongMockMvc = MockMvcBuilders.standaloneSetup(diseaseGuangDongResource)
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
    public static DiseaseGuangDong createEntity(EntityManager em) {
        DiseaseGuangDong diseaseGuangDong = new DiseaseGuangDong()
            .name(DEFAULT_NAME)
            .subsidiary(DEFAULT_SUBSIDIARY)
            .supplement(DEFAULT_SUPPLEMENT)
            .testMethod(DEFAULT_TEST_METHOD)
            .sample(DEFAULT_SAMPLE)
            .roomPreservation(DEFAULT_ROOM_PRESERVATION)
            .coldStoragePreservation(DEFAULT_COLD_STORAGE_PRESERVATION)
            .freezing(DEFAULT_FREEZING)
            .clinicalApplication(DEFAULT_CLINICAL_APPLICATION)
            .tollStandard(DEFAULT_TOLL_STANDARD)
            .reportingTime(DEFAULT_REPORTING_TIME)
            .remarks(DEFAULT_REMARKS)
            .chargeCode(DEFAULT_CHARGE_CODE)
            .classification(DEFAULT_CLASSIFICATION)
            .applicationUnitType(DEFAULT_APPLICATION_UNIT_TYPE)
            .series(DEFAULT_SERIES)
            .projectChangeNotification(DEFAULT_PROJECT_CHANGE_NOTIFICATION)
            .specialInspectionItems(DEFAULT_SPECIAL_INSPECTION_ITEMS)
            .stopDeveloping(DEFAULT_STOP_DEVELOPING)
            .projectConcourse(DEFAULT_PROJECT_CONCOURSE)
            .testDepartment(DEFAULT_TEST_DEPARTMENT)
            .suppliesSeries(DEFAULT_SUPPLIES_SERIES);
        return diseaseGuangDong;
    }

    @Before
    public void initTest() {
        diseaseGuangDong = createEntity(em);
    }

    @Test
    @Transactional
    public void createDiseaseGuangDong() throws Exception {
        int databaseSizeBeforeCreate = diseaseGuangDongRepository.findAll().size();

        // Create the DiseaseGuangDong
        restDiseaseGuangDongMockMvc.perform(post("/api/disease-guang-dongs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(diseaseGuangDong)))
            .andExpect(status().isCreated());

        // Validate the DiseaseGuangDong in the database
        List<DiseaseGuangDong> diseaseGuangDongList = diseaseGuangDongRepository.findAll();
        assertThat(diseaseGuangDongList).hasSize(databaseSizeBeforeCreate + 1);
        DiseaseGuangDong testDiseaseGuangDong = diseaseGuangDongList.get(diseaseGuangDongList.size() - 1);
        assertThat(testDiseaseGuangDong.getName()).isEqualTo(DEFAULT_NAME);
        assertThat(testDiseaseGuangDong.getSubsidiary()).isEqualTo(DEFAULT_SUBSIDIARY);
        assertThat(testDiseaseGuangDong.getSupplement()).isEqualTo(DEFAULT_SUPPLEMENT);
        assertThat(testDiseaseGuangDong.getTestMethod()).isEqualTo(DEFAULT_TEST_METHOD);
        assertThat(testDiseaseGuangDong.getSample()).isEqualTo(DEFAULT_SAMPLE);
        assertThat(testDiseaseGuangDong.getRoomPreservation()).isEqualTo(DEFAULT_ROOM_PRESERVATION);
        assertThat(testDiseaseGuangDong.getColdStoragePreservation()).isEqualTo(DEFAULT_COLD_STORAGE_PRESERVATION);
        assertThat(testDiseaseGuangDong.getFreezing()).isEqualTo(DEFAULT_FREEZING);
        assertThat(testDiseaseGuangDong.getClinicalApplication()).isEqualTo(DEFAULT_CLINICAL_APPLICATION);
        assertThat(testDiseaseGuangDong.getTollStandard()).isEqualTo(DEFAULT_TOLL_STANDARD);
        assertThat(testDiseaseGuangDong.getReportingTime()).isEqualTo(DEFAULT_REPORTING_TIME);
        assertThat(testDiseaseGuangDong.getRemarks()).isEqualTo(DEFAULT_REMARKS);
        assertThat(testDiseaseGuangDong.getChargeCode()).isEqualTo(DEFAULT_CHARGE_CODE);
        assertThat(testDiseaseGuangDong.getClassification()).isEqualTo(DEFAULT_CLASSIFICATION);
        assertThat(testDiseaseGuangDong.getApplicationUnitType()).isEqualTo(DEFAULT_APPLICATION_UNIT_TYPE);
        assertThat(testDiseaseGuangDong.getSeries()).isEqualTo(DEFAULT_SERIES);
        assertThat(testDiseaseGuangDong.getProjectChangeNotification()).isEqualTo(DEFAULT_PROJECT_CHANGE_NOTIFICATION);
        assertThat(testDiseaseGuangDong.getSpecialInspectionItems()).isEqualTo(DEFAULT_SPECIAL_INSPECTION_ITEMS);
        assertThat(testDiseaseGuangDong.getStopDeveloping()).isEqualTo(DEFAULT_STOP_DEVELOPING);
        assertThat(testDiseaseGuangDong.getProjectConcourse()).isEqualTo(DEFAULT_PROJECT_CONCOURSE);
        assertThat(testDiseaseGuangDong.getTestDepartment()).isEqualTo(DEFAULT_TEST_DEPARTMENT);
        assertThat(testDiseaseGuangDong.getSuppliesSeries()).isEqualTo(DEFAULT_SUPPLIES_SERIES);

        // Validate the DiseaseGuangDong in Elasticsearch
        verify(mockDiseaseGuangDongSearchRepository, times(1)).save(testDiseaseGuangDong);
    }

    @Test
    @Transactional
    public void createDiseaseGuangDongWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = diseaseGuangDongRepository.findAll().size();

        // Create the DiseaseGuangDong with an existing ID
        diseaseGuangDong.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restDiseaseGuangDongMockMvc.perform(post("/api/disease-guang-dongs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(diseaseGuangDong)))
            .andExpect(status().isBadRequest());

        // Validate the DiseaseGuangDong in the database
        List<DiseaseGuangDong> diseaseGuangDongList = diseaseGuangDongRepository.findAll();
        assertThat(diseaseGuangDongList).hasSize(databaseSizeBeforeCreate);

        // Validate the DiseaseGuangDong in Elasticsearch
        verify(mockDiseaseGuangDongSearchRepository, times(0)).save(diseaseGuangDong);
    }

    @Test
    @Transactional
    public void getAllDiseaseGuangDongs() throws Exception {
        // Initialize the database
        diseaseGuangDongRepository.saveAndFlush(diseaseGuangDong);

        // Get all the diseaseGuangDongList
        restDiseaseGuangDongMockMvc.perform(get("/api/disease-guang-dongs?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(diseaseGuangDong.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME.toString())))
            .andExpect(jsonPath("$.[*].subsidiary").value(hasItem(DEFAULT_SUBSIDIARY.toString())))
            .andExpect(jsonPath("$.[*].supplement").value(hasItem(DEFAULT_SUPPLEMENT.toString())))
            .andExpect(jsonPath("$.[*].testMethod").value(hasItem(DEFAULT_TEST_METHOD.toString())))
            .andExpect(jsonPath("$.[*].sample").value(hasItem(DEFAULT_SAMPLE.toString())))
            .andExpect(jsonPath("$.[*].roomPreservation").value(hasItem(DEFAULT_ROOM_PRESERVATION.toString())))
            .andExpect(jsonPath("$.[*].coldStoragePreservation").value(hasItem(DEFAULT_COLD_STORAGE_PRESERVATION.toString())))
            .andExpect(jsonPath("$.[*].freezing").value(hasItem(DEFAULT_FREEZING.toString())))
            .andExpect(jsonPath("$.[*].clinicalApplication").value(hasItem(DEFAULT_CLINICAL_APPLICATION.toString())))
            .andExpect(jsonPath("$.[*].tollStandard").value(hasItem(DEFAULT_TOLL_STANDARD.toString())))
            .andExpect(jsonPath("$.[*].reportingTime").value(hasItem(DEFAULT_REPORTING_TIME.toString())))
            .andExpect(jsonPath("$.[*].remarks").value(hasItem(DEFAULT_REMARKS.toString())))
            .andExpect(jsonPath("$.[*].chargeCode").value(hasItem(DEFAULT_CHARGE_CODE.toString())))
            .andExpect(jsonPath("$.[*].classification").value(hasItem(DEFAULT_CLASSIFICATION.toString())))
            .andExpect(jsonPath("$.[*].applicationUnitType").value(hasItem(DEFAULT_APPLICATION_UNIT_TYPE.toString())))
            .andExpect(jsonPath("$.[*].series").value(hasItem(DEFAULT_SERIES.toString())))
            .andExpect(jsonPath("$.[*].projectChangeNotification").value(hasItem(DEFAULT_PROJECT_CHANGE_NOTIFICATION.toString())))
            .andExpect(jsonPath("$.[*].specialInspectionItems").value(hasItem(DEFAULT_SPECIAL_INSPECTION_ITEMS.toString())))
            .andExpect(jsonPath("$.[*].stopDeveloping").value(hasItem(DEFAULT_STOP_DEVELOPING.toString())))
            .andExpect(jsonPath("$.[*].projectConcourse").value(hasItem(DEFAULT_PROJECT_CONCOURSE.toString())))
            .andExpect(jsonPath("$.[*].testDepartment").value(hasItem(DEFAULT_TEST_DEPARTMENT.toString())))
            .andExpect(jsonPath("$.[*].suppliesSeries").value(hasItem(DEFAULT_SUPPLIES_SERIES.toString())));
    }
    
    @Test
    @Transactional
    public void getDiseaseGuangDong() throws Exception {
        // Initialize the database
        diseaseGuangDongRepository.saveAndFlush(diseaseGuangDong);

        // Get the diseaseGuangDong
        restDiseaseGuangDongMockMvc.perform(get("/api/disease-guang-dongs/{id}", diseaseGuangDong.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(diseaseGuangDong.getId().intValue()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME.toString()))
            .andExpect(jsonPath("$.subsidiary").value(DEFAULT_SUBSIDIARY.toString()))
            .andExpect(jsonPath("$.supplement").value(DEFAULT_SUPPLEMENT.toString()))
            .andExpect(jsonPath("$.testMethod").value(DEFAULT_TEST_METHOD.toString()))
            .andExpect(jsonPath("$.sample").value(DEFAULT_SAMPLE.toString()))
            .andExpect(jsonPath("$.roomPreservation").value(DEFAULT_ROOM_PRESERVATION.toString()))
            .andExpect(jsonPath("$.coldStoragePreservation").value(DEFAULT_COLD_STORAGE_PRESERVATION.toString()))
            .andExpect(jsonPath("$.freezing").value(DEFAULT_FREEZING.toString()))
            .andExpect(jsonPath("$.clinicalApplication").value(DEFAULT_CLINICAL_APPLICATION.toString()))
            .andExpect(jsonPath("$.tollStandard").value(DEFAULT_TOLL_STANDARD.toString()))
            .andExpect(jsonPath("$.reportingTime").value(DEFAULT_REPORTING_TIME.toString()))
            .andExpect(jsonPath("$.remarks").value(DEFAULT_REMARKS.toString()))
            .andExpect(jsonPath("$.chargeCode").value(DEFAULT_CHARGE_CODE.toString()))
            .andExpect(jsonPath("$.classification").value(DEFAULT_CLASSIFICATION.toString()))
            .andExpect(jsonPath("$.applicationUnitType").value(DEFAULT_APPLICATION_UNIT_TYPE.toString()))
            .andExpect(jsonPath("$.series").value(DEFAULT_SERIES.toString()))
            .andExpect(jsonPath("$.projectChangeNotification").value(DEFAULT_PROJECT_CHANGE_NOTIFICATION.toString()))
            .andExpect(jsonPath("$.specialInspectionItems").value(DEFAULT_SPECIAL_INSPECTION_ITEMS.toString()))
            .andExpect(jsonPath("$.stopDeveloping").value(DEFAULT_STOP_DEVELOPING.toString()))
            .andExpect(jsonPath("$.projectConcourse").value(DEFAULT_PROJECT_CONCOURSE.toString()))
            .andExpect(jsonPath("$.testDepartment").value(DEFAULT_TEST_DEPARTMENT.toString()))
            .andExpect(jsonPath("$.suppliesSeries").value(DEFAULT_SUPPLIES_SERIES.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingDiseaseGuangDong() throws Exception {
        // Get the diseaseGuangDong
        restDiseaseGuangDongMockMvc.perform(get("/api/disease-guang-dongs/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateDiseaseGuangDong() throws Exception {
        // Initialize the database
        diseaseGuangDongRepository.saveAndFlush(diseaseGuangDong);

        int databaseSizeBeforeUpdate = diseaseGuangDongRepository.findAll().size();

        // Update the diseaseGuangDong
        DiseaseGuangDong updatedDiseaseGuangDong = diseaseGuangDongRepository.findById(diseaseGuangDong.getId()).get();
        // Disconnect from session so that the updates on updatedDiseaseGuangDong are not directly saved in db
        em.detach(updatedDiseaseGuangDong);
        updatedDiseaseGuangDong
            .name(UPDATED_NAME)
            .subsidiary(UPDATED_SUBSIDIARY)
            .supplement(UPDATED_SUPPLEMENT)
            .testMethod(UPDATED_TEST_METHOD)
            .sample(UPDATED_SAMPLE)
            .roomPreservation(UPDATED_ROOM_PRESERVATION)
            .coldStoragePreservation(UPDATED_COLD_STORAGE_PRESERVATION)
            .freezing(UPDATED_FREEZING)
            .clinicalApplication(UPDATED_CLINICAL_APPLICATION)
            .tollStandard(UPDATED_TOLL_STANDARD)
            .reportingTime(UPDATED_REPORTING_TIME)
            .remarks(UPDATED_REMARKS)
            .chargeCode(UPDATED_CHARGE_CODE)
            .classification(UPDATED_CLASSIFICATION)
            .applicationUnitType(UPDATED_APPLICATION_UNIT_TYPE)
            .series(UPDATED_SERIES)
            .projectChangeNotification(UPDATED_PROJECT_CHANGE_NOTIFICATION)
            .specialInspectionItems(UPDATED_SPECIAL_INSPECTION_ITEMS)
            .stopDeveloping(UPDATED_STOP_DEVELOPING)
            .projectConcourse(UPDATED_PROJECT_CONCOURSE)
            .testDepartment(UPDATED_TEST_DEPARTMENT)
            .suppliesSeries(UPDATED_SUPPLIES_SERIES);

        restDiseaseGuangDongMockMvc.perform(put("/api/disease-guang-dongs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedDiseaseGuangDong)))
            .andExpect(status().isOk());

        // Validate the DiseaseGuangDong in the database
        List<DiseaseGuangDong> diseaseGuangDongList = diseaseGuangDongRepository.findAll();
        assertThat(diseaseGuangDongList).hasSize(databaseSizeBeforeUpdate);
        DiseaseGuangDong testDiseaseGuangDong = diseaseGuangDongList.get(diseaseGuangDongList.size() - 1);
        assertThat(testDiseaseGuangDong.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testDiseaseGuangDong.getSubsidiary()).isEqualTo(UPDATED_SUBSIDIARY);
        assertThat(testDiseaseGuangDong.getSupplement()).isEqualTo(UPDATED_SUPPLEMENT);
        assertThat(testDiseaseGuangDong.getTestMethod()).isEqualTo(UPDATED_TEST_METHOD);
        assertThat(testDiseaseGuangDong.getSample()).isEqualTo(UPDATED_SAMPLE);
        assertThat(testDiseaseGuangDong.getRoomPreservation()).isEqualTo(UPDATED_ROOM_PRESERVATION);
        assertThat(testDiseaseGuangDong.getColdStoragePreservation()).isEqualTo(UPDATED_COLD_STORAGE_PRESERVATION);
        assertThat(testDiseaseGuangDong.getFreezing()).isEqualTo(UPDATED_FREEZING);
        assertThat(testDiseaseGuangDong.getClinicalApplication()).isEqualTo(UPDATED_CLINICAL_APPLICATION);
        assertThat(testDiseaseGuangDong.getTollStandard()).isEqualTo(UPDATED_TOLL_STANDARD);
        assertThat(testDiseaseGuangDong.getReportingTime()).isEqualTo(UPDATED_REPORTING_TIME);
        assertThat(testDiseaseGuangDong.getRemarks()).isEqualTo(UPDATED_REMARKS);
        assertThat(testDiseaseGuangDong.getChargeCode()).isEqualTo(UPDATED_CHARGE_CODE);
        assertThat(testDiseaseGuangDong.getClassification()).isEqualTo(UPDATED_CLASSIFICATION);
        assertThat(testDiseaseGuangDong.getApplicationUnitType()).isEqualTo(UPDATED_APPLICATION_UNIT_TYPE);
        assertThat(testDiseaseGuangDong.getSeries()).isEqualTo(UPDATED_SERIES);
        assertThat(testDiseaseGuangDong.getProjectChangeNotification()).isEqualTo(UPDATED_PROJECT_CHANGE_NOTIFICATION);
        assertThat(testDiseaseGuangDong.getSpecialInspectionItems()).isEqualTo(UPDATED_SPECIAL_INSPECTION_ITEMS);
        assertThat(testDiseaseGuangDong.getStopDeveloping()).isEqualTo(UPDATED_STOP_DEVELOPING);
        assertThat(testDiseaseGuangDong.getProjectConcourse()).isEqualTo(UPDATED_PROJECT_CONCOURSE);
        assertThat(testDiseaseGuangDong.getTestDepartment()).isEqualTo(UPDATED_TEST_DEPARTMENT);
        assertThat(testDiseaseGuangDong.getSuppliesSeries()).isEqualTo(UPDATED_SUPPLIES_SERIES);

        // Validate the DiseaseGuangDong in Elasticsearch
        verify(mockDiseaseGuangDongSearchRepository, times(1)).save(testDiseaseGuangDong);
    }

    @Test
    @Transactional
    public void updateNonExistingDiseaseGuangDong() throws Exception {
        int databaseSizeBeforeUpdate = diseaseGuangDongRepository.findAll().size();

        // Create the DiseaseGuangDong

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restDiseaseGuangDongMockMvc.perform(put("/api/disease-guang-dongs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(diseaseGuangDong)))
            .andExpect(status().isBadRequest());

        // Validate the DiseaseGuangDong in the database
        List<DiseaseGuangDong> diseaseGuangDongList = diseaseGuangDongRepository.findAll();
        assertThat(diseaseGuangDongList).hasSize(databaseSizeBeforeUpdate);

        // Validate the DiseaseGuangDong in Elasticsearch
        verify(mockDiseaseGuangDongSearchRepository, times(0)).save(diseaseGuangDong);
    }

    @Test
    @Transactional
    public void deleteDiseaseGuangDong() throws Exception {
        // Initialize the database
        diseaseGuangDongRepository.saveAndFlush(diseaseGuangDong);

        int databaseSizeBeforeDelete = diseaseGuangDongRepository.findAll().size();

        // Delete the diseaseGuangDong
        restDiseaseGuangDongMockMvc.perform(delete("/api/disease-guang-dongs/{id}", diseaseGuangDong.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<DiseaseGuangDong> diseaseGuangDongList = diseaseGuangDongRepository.findAll();
        assertThat(diseaseGuangDongList).hasSize(databaseSizeBeforeDelete - 1);

        // Validate the DiseaseGuangDong in Elasticsearch
        verify(mockDiseaseGuangDongSearchRepository, times(1)).deleteById(diseaseGuangDong.getId());
    }

    @Test
    @Transactional
    public void searchDiseaseGuangDong() throws Exception {
        // Initialize the database
        diseaseGuangDongRepository.saveAndFlush(diseaseGuangDong);
        when(mockDiseaseGuangDongSearchRepository.search(queryStringQuery("id:" + diseaseGuangDong.getId()), PageRequest.of(0, 20)))
            .thenReturn(new PageImpl<>(Collections.singletonList(diseaseGuangDong), PageRequest.of(0, 1), 1));
        // Search the diseaseGuangDong
        restDiseaseGuangDongMockMvc.perform(get("/api/_search/disease-guang-dongs?query=id:" + diseaseGuangDong.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(diseaseGuangDong.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME)))
            .andExpect(jsonPath("$.[*].subsidiary").value(hasItem(DEFAULT_SUBSIDIARY)))
            .andExpect(jsonPath("$.[*].supplement").value(hasItem(DEFAULT_SUPPLEMENT)))
            .andExpect(jsonPath("$.[*].testMethod").value(hasItem(DEFAULT_TEST_METHOD)))
            .andExpect(jsonPath("$.[*].sample").value(hasItem(DEFAULT_SAMPLE)))
            .andExpect(jsonPath("$.[*].roomPreservation").value(hasItem(DEFAULT_ROOM_PRESERVATION)))
            .andExpect(jsonPath("$.[*].coldStoragePreservation").value(hasItem(DEFAULT_COLD_STORAGE_PRESERVATION)))
            .andExpect(jsonPath("$.[*].freezing").value(hasItem(DEFAULT_FREEZING)))
            .andExpect(jsonPath("$.[*].clinicalApplication").value(hasItem(DEFAULT_CLINICAL_APPLICATION)))
            .andExpect(jsonPath("$.[*].tollStandard").value(hasItem(DEFAULT_TOLL_STANDARD)))
            .andExpect(jsonPath("$.[*].reportingTime").value(hasItem(DEFAULT_REPORTING_TIME)))
            .andExpect(jsonPath("$.[*].remarks").value(hasItem(DEFAULT_REMARKS)))
            .andExpect(jsonPath("$.[*].chargeCode").value(hasItem(DEFAULT_CHARGE_CODE)))
            .andExpect(jsonPath("$.[*].classification").value(hasItem(DEFAULT_CLASSIFICATION)))
            .andExpect(jsonPath("$.[*].applicationUnitType").value(hasItem(DEFAULT_APPLICATION_UNIT_TYPE)))
            .andExpect(jsonPath("$.[*].series").value(hasItem(DEFAULT_SERIES)))
            .andExpect(jsonPath("$.[*].projectChangeNotification").value(hasItem(DEFAULT_PROJECT_CHANGE_NOTIFICATION)))
            .andExpect(jsonPath("$.[*].specialInspectionItems").value(hasItem(DEFAULT_SPECIAL_INSPECTION_ITEMS)))
            .andExpect(jsonPath("$.[*].stopDeveloping").value(hasItem(DEFAULT_STOP_DEVELOPING)))
            .andExpect(jsonPath("$.[*].projectConcourse").value(hasItem(DEFAULT_PROJECT_CONCOURSE)))
            .andExpect(jsonPath("$.[*].testDepartment").value(hasItem(DEFAULT_TEST_DEPARTMENT)))
            .andExpect(jsonPath("$.[*].suppliesSeries").value(hasItem(DEFAULT_SUPPLIES_SERIES)));
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(DiseaseGuangDong.class);
        DiseaseGuangDong diseaseGuangDong1 = new DiseaseGuangDong();
        diseaseGuangDong1.setId(1L);
        DiseaseGuangDong diseaseGuangDong2 = new DiseaseGuangDong();
        diseaseGuangDong2.setId(diseaseGuangDong1.getId());
        assertThat(diseaseGuangDong1).isEqualTo(diseaseGuangDong2);
        diseaseGuangDong2.setId(2L);
        assertThat(diseaseGuangDong1).isNotEqualTo(diseaseGuangDong2);
        diseaseGuangDong1.setId(null);
        assertThat(diseaseGuangDong1).isNotEqualTo(diseaseGuangDong2);
    }
}
