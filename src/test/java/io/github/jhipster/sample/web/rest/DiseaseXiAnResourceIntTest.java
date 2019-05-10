package io.github.jhipster.sample.web.rest;

import io.github.jhipster.sample.JhipsterElasticsearchSampleApplicationApp;

import io.github.jhipster.sample.domain.DiseaseXiAn;
import io.github.jhipster.sample.repository.DiseaseXiAnRepository;
import io.github.jhipster.sample.repository.search.DiseaseXiAnSearchRepository;
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
 * Test class for the DiseaseXiAnResource REST controller.
 *
 * @see DiseaseXiAnResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = JhipsterElasticsearchSampleApplicationApp.class)
public class DiseaseXiAnResourceIntTest {

    private static final String DEFAULT_SUBSIDIARY = "AAAAAAAAAA";
    private static final String UPDATED_SUBSIDIARY = "BBBBBBBBBB";

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_PROJECT_CODE = "AAAAAAAAAA";
    private static final String UPDATED_PROJECT_CODE = "BBBBBBBBBB";

    private static final String DEFAULT_CHARGE_CODE = "AAAAAAAAAA";
    private static final String UPDATED_CHARGE_CODE = "BBBBBBBBBB";

    private static final String DEFAULT_TOLL_STANDARD = "AAAAAAAAAA";
    private static final String UPDATED_TOLL_STANDARD = "BBBBBBBBBB";

    private static final String DEFAULT_SUPPLEMENT = "AAAAAAAAAA";
    private static final String UPDATED_SUPPLEMENT = "BBBBBBBBBB";

    private static final String DEFAULT_SAMPLE = "AAAAAAAAAA";
    private static final String UPDATED_SAMPLE = "BBBBBBBBBB";

    private static final String DEFAULT_TUTORIAL = "AAAAAAAAAA";
    private static final String UPDATED_TUTORIAL = "BBBBBBBBBB";

    private static final String DEFAULT_PRESERVATION = "AAAAAAAAAA";
    private static final String UPDATED_PRESERVATION = "BBBBBBBBBB";

    private static final String DEFAULT_TRANSPORTATION = "AAAAAAAAAA";
    private static final String UPDATED_TRANSPORTATION = "BBBBBBBBBB";

    private static final String DEFAULT_APPLICATION_UNIT_TYPE = "AAAAAAAAAA";
    private static final String UPDATED_APPLICATION_UNIT_TYPE = "BBBBBBBBBB";

    private static final String DEFAULT_APPLICATION_REMARK = "AAAAAAAAAA";
    private static final String UPDATED_APPLICATION_REMARK = "BBBBBBBBBB";

    private static final String DEFAULT_MEDICAL_METHOD = "AAAAAAAAAA";
    private static final String UPDATED_MEDICAL_METHOD = "BBBBBBBBBB";

    private static final String DEFAULT_PROJECT_CONCOURSE = "AAAAAAAAAA";
    private static final String UPDATED_PROJECT_CONCOURSE = "BBBBBBBBBB";

    private static final String DEFAULT_HURRY_DEPARTMENT = "AAAAAAAAAA";
    private static final String UPDATED_HURRY_DEPARTMENT = "BBBBBBBBBB";

    private static final String DEFAULT_REPORTING_TIME = "AAAAAAAAAA";
    private static final String UPDATED_REPORTING_TIME = "BBBBBBBBBB";

    private static final String DEFAULT_CLINICAL_APPLICATION = "AAAAAAAAAA";
    private static final String UPDATED_CLINICAL_APPLICATION = "BBBBBBBBBB";

    private static final String DEFAULT_SERIES = "AAAAAAAAAA";
    private static final String UPDATED_SERIES = "BBBBBBBBBB";

    private static final String DEFAULT_SUB_SERIES = "AAAAAAAAAA";
    private static final String UPDATED_SUB_SERIES = "BBBBBBBBBB";

    private static final String DEFAULT_REMARKS = "AAAAAAAAAA";
    private static final String UPDATED_REMARKS = "BBBBBBBBBB";

    @Autowired
    private DiseaseXiAnRepository diseaseXiAnRepository;

    /**
     * This repository is mocked in the io.github.jhipster.sample.repository.search test package.
     *
     * @see io.github.jhipster.sample.repository.search.DiseaseXiAnSearchRepositoryMockConfiguration
     */
    @Autowired
    private DiseaseXiAnSearchRepository mockDiseaseXiAnSearchRepository;

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

    private MockMvc restDiseaseXiAnMockMvc;

    private DiseaseXiAn diseaseXiAn;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final DiseaseXiAnResource diseaseXiAnResource = new DiseaseXiAnResource(diseaseXiAnRepository, mockDiseaseXiAnSearchRepository);
        this.restDiseaseXiAnMockMvc = MockMvcBuilders.standaloneSetup(diseaseXiAnResource)
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
    public static DiseaseXiAn createEntity(EntityManager em) {
        DiseaseXiAn diseaseXiAn = new DiseaseXiAn()
            .subsidiary(DEFAULT_SUBSIDIARY)
            .name(DEFAULT_NAME)
            .projectCode(DEFAULT_PROJECT_CODE)
            .chargeCode(DEFAULT_CHARGE_CODE)
            .tollStandard(DEFAULT_TOLL_STANDARD)
            .supplement(DEFAULT_SUPPLEMENT)
            .sample(DEFAULT_SAMPLE)
            .tutorial(DEFAULT_TUTORIAL)
            .preservation(DEFAULT_PRESERVATION)
            .transportation(DEFAULT_TRANSPORTATION)
            .applicationUnitType(DEFAULT_APPLICATION_UNIT_TYPE)
            .applicationRemark(DEFAULT_APPLICATION_REMARK)
            .medicalMethod(DEFAULT_MEDICAL_METHOD)
            .projectConcourse(DEFAULT_PROJECT_CONCOURSE)
            .hurryDepartment(DEFAULT_HURRY_DEPARTMENT)
            .reportingTime(DEFAULT_REPORTING_TIME)
            .clinicalApplication(DEFAULT_CLINICAL_APPLICATION)
            .series(DEFAULT_SERIES)
            .subSeries(DEFAULT_SUB_SERIES)
            .remarks(DEFAULT_REMARKS);
        return diseaseXiAn;
    }

    @Before
    public void initTest() {
        diseaseXiAn = createEntity(em);
    }

    @Test
    @Transactional
    public void createDiseaseXiAn() throws Exception {
        int databaseSizeBeforeCreate = diseaseXiAnRepository.findAll().size();

        // Create the DiseaseXiAn
        restDiseaseXiAnMockMvc.perform(post("/api/disease-xi-ans")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(diseaseXiAn)))
            .andExpect(status().isCreated());

        // Validate the DiseaseXiAn in the database
        List<DiseaseXiAn> diseaseXiAnList = diseaseXiAnRepository.findAll();
        assertThat(diseaseXiAnList).hasSize(databaseSizeBeforeCreate + 1);
        DiseaseXiAn testDiseaseXiAn = diseaseXiAnList.get(diseaseXiAnList.size() - 1);
        assertThat(testDiseaseXiAn.getSubsidiary()).isEqualTo(DEFAULT_SUBSIDIARY);
        assertThat(testDiseaseXiAn.getName()).isEqualTo(DEFAULT_NAME);
        assertThat(testDiseaseXiAn.getProjectCode()).isEqualTo(DEFAULT_PROJECT_CODE);
        assertThat(testDiseaseXiAn.getChargeCode()).isEqualTo(DEFAULT_CHARGE_CODE);
        assertThat(testDiseaseXiAn.getTollStandard()).isEqualTo(DEFAULT_TOLL_STANDARD);
        assertThat(testDiseaseXiAn.getSupplement()).isEqualTo(DEFAULT_SUPPLEMENT);
        assertThat(testDiseaseXiAn.getSample()).isEqualTo(DEFAULT_SAMPLE);
        assertThat(testDiseaseXiAn.getTutorial()).isEqualTo(DEFAULT_TUTORIAL);
        assertThat(testDiseaseXiAn.getPreservation()).isEqualTo(DEFAULT_PRESERVATION);
        assertThat(testDiseaseXiAn.getTransportation()).isEqualTo(DEFAULT_TRANSPORTATION);
        assertThat(testDiseaseXiAn.getApplicationUnitType()).isEqualTo(DEFAULT_APPLICATION_UNIT_TYPE);
        assertThat(testDiseaseXiAn.getApplicationRemark()).isEqualTo(DEFAULT_APPLICATION_REMARK);
        assertThat(testDiseaseXiAn.getMedicalMethod()).isEqualTo(DEFAULT_MEDICAL_METHOD);
        assertThat(testDiseaseXiAn.getProjectConcourse()).isEqualTo(DEFAULT_PROJECT_CONCOURSE);
        assertThat(testDiseaseXiAn.getHurryDepartment()).isEqualTo(DEFAULT_HURRY_DEPARTMENT);
        assertThat(testDiseaseXiAn.getReportingTime()).isEqualTo(DEFAULT_REPORTING_TIME);
        assertThat(testDiseaseXiAn.getClinicalApplication()).isEqualTo(DEFAULT_CLINICAL_APPLICATION);
        assertThat(testDiseaseXiAn.getSeries()).isEqualTo(DEFAULT_SERIES);
        assertThat(testDiseaseXiAn.getSubSeries()).isEqualTo(DEFAULT_SUB_SERIES);
        assertThat(testDiseaseXiAn.getRemarks()).isEqualTo(DEFAULT_REMARKS);

        // Validate the DiseaseXiAn in Elasticsearch
        verify(mockDiseaseXiAnSearchRepository, times(1)).save(testDiseaseXiAn);
    }

    @Test
    @Transactional
    public void createDiseaseXiAnWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = diseaseXiAnRepository.findAll().size();

        // Create the DiseaseXiAn with an existing ID
        diseaseXiAn.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restDiseaseXiAnMockMvc.perform(post("/api/disease-xi-ans")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(diseaseXiAn)))
            .andExpect(status().isBadRequest());

        // Validate the DiseaseXiAn in the database
        List<DiseaseXiAn> diseaseXiAnList = diseaseXiAnRepository.findAll();
        assertThat(diseaseXiAnList).hasSize(databaseSizeBeforeCreate);

        // Validate the DiseaseXiAn in Elasticsearch
        verify(mockDiseaseXiAnSearchRepository, times(0)).save(diseaseXiAn);
    }

    @Test
    @Transactional
    public void getAllDiseaseXiAns() throws Exception {
        // Initialize the database
        diseaseXiAnRepository.saveAndFlush(diseaseXiAn);

        // Get all the diseaseXiAnList
        restDiseaseXiAnMockMvc.perform(get("/api/disease-xi-ans?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(diseaseXiAn.getId().intValue())))
            .andExpect(jsonPath("$.[*].subsidiary").value(hasItem(DEFAULT_SUBSIDIARY.toString())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME.toString())))
            .andExpect(jsonPath("$.[*].projectCode").value(hasItem(DEFAULT_PROJECT_CODE.toString())))
            .andExpect(jsonPath("$.[*].chargeCode").value(hasItem(DEFAULT_CHARGE_CODE.toString())))
            .andExpect(jsonPath("$.[*].tollStandard").value(hasItem(DEFAULT_TOLL_STANDARD.toString())))
            .andExpect(jsonPath("$.[*].supplement").value(hasItem(DEFAULT_SUPPLEMENT.toString())))
            .andExpect(jsonPath("$.[*].sample").value(hasItem(DEFAULT_SAMPLE.toString())))
            .andExpect(jsonPath("$.[*].tutorial").value(hasItem(DEFAULT_TUTORIAL.toString())))
            .andExpect(jsonPath("$.[*].preservation").value(hasItem(DEFAULT_PRESERVATION.toString())))
            .andExpect(jsonPath("$.[*].transportation").value(hasItem(DEFAULT_TRANSPORTATION.toString())))
            .andExpect(jsonPath("$.[*].applicationUnitType").value(hasItem(DEFAULT_APPLICATION_UNIT_TYPE.toString())))
            .andExpect(jsonPath("$.[*].applicationRemark").value(hasItem(DEFAULT_APPLICATION_REMARK.toString())))
            .andExpect(jsonPath("$.[*].medicalMethod").value(hasItem(DEFAULT_MEDICAL_METHOD.toString())))
            .andExpect(jsonPath("$.[*].projectConcourse").value(hasItem(DEFAULT_PROJECT_CONCOURSE.toString())))
            .andExpect(jsonPath("$.[*].hurryDepartment").value(hasItem(DEFAULT_HURRY_DEPARTMENT.toString())))
            .andExpect(jsonPath("$.[*].reportingTime").value(hasItem(DEFAULT_REPORTING_TIME.toString())))
            .andExpect(jsonPath("$.[*].clinicalApplication").value(hasItem(DEFAULT_CLINICAL_APPLICATION.toString())))
            .andExpect(jsonPath("$.[*].series").value(hasItem(DEFAULT_SERIES.toString())))
            .andExpect(jsonPath("$.[*].subSeries").value(hasItem(DEFAULT_SUB_SERIES.toString())))
            .andExpect(jsonPath("$.[*].remarks").value(hasItem(DEFAULT_REMARKS.toString())));
    }
    
    @Test
    @Transactional
    public void getDiseaseXiAn() throws Exception {
        // Initialize the database
        diseaseXiAnRepository.saveAndFlush(diseaseXiAn);

        // Get the diseaseXiAn
        restDiseaseXiAnMockMvc.perform(get("/api/disease-xi-ans/{id}", diseaseXiAn.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(diseaseXiAn.getId().intValue()))
            .andExpect(jsonPath("$.subsidiary").value(DEFAULT_SUBSIDIARY.toString()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME.toString()))
            .andExpect(jsonPath("$.projectCode").value(DEFAULT_PROJECT_CODE.toString()))
            .andExpect(jsonPath("$.chargeCode").value(DEFAULT_CHARGE_CODE.toString()))
            .andExpect(jsonPath("$.tollStandard").value(DEFAULT_TOLL_STANDARD.toString()))
            .andExpect(jsonPath("$.supplement").value(DEFAULT_SUPPLEMENT.toString()))
            .andExpect(jsonPath("$.sample").value(DEFAULT_SAMPLE.toString()))
            .andExpect(jsonPath("$.tutorial").value(DEFAULT_TUTORIAL.toString()))
            .andExpect(jsonPath("$.preservation").value(DEFAULT_PRESERVATION.toString()))
            .andExpect(jsonPath("$.transportation").value(DEFAULT_TRANSPORTATION.toString()))
            .andExpect(jsonPath("$.applicationUnitType").value(DEFAULT_APPLICATION_UNIT_TYPE.toString()))
            .andExpect(jsonPath("$.applicationRemark").value(DEFAULT_APPLICATION_REMARK.toString()))
            .andExpect(jsonPath("$.medicalMethod").value(DEFAULT_MEDICAL_METHOD.toString()))
            .andExpect(jsonPath("$.projectConcourse").value(DEFAULT_PROJECT_CONCOURSE.toString()))
            .andExpect(jsonPath("$.hurryDepartment").value(DEFAULT_HURRY_DEPARTMENT.toString()))
            .andExpect(jsonPath("$.reportingTime").value(DEFAULT_REPORTING_TIME.toString()))
            .andExpect(jsonPath("$.clinicalApplication").value(DEFAULT_CLINICAL_APPLICATION.toString()))
            .andExpect(jsonPath("$.series").value(DEFAULT_SERIES.toString()))
            .andExpect(jsonPath("$.subSeries").value(DEFAULT_SUB_SERIES.toString()))
            .andExpect(jsonPath("$.remarks").value(DEFAULT_REMARKS.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingDiseaseXiAn() throws Exception {
        // Get the diseaseXiAn
        restDiseaseXiAnMockMvc.perform(get("/api/disease-xi-ans/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateDiseaseXiAn() throws Exception {
        // Initialize the database
        diseaseXiAnRepository.saveAndFlush(diseaseXiAn);

        int databaseSizeBeforeUpdate = diseaseXiAnRepository.findAll().size();

        // Update the diseaseXiAn
        DiseaseXiAn updatedDiseaseXiAn = diseaseXiAnRepository.findById(diseaseXiAn.getId()).get();
        // Disconnect from session so that the updates on updatedDiseaseXiAn are not directly saved in db
        em.detach(updatedDiseaseXiAn);
        updatedDiseaseXiAn
            .subsidiary(UPDATED_SUBSIDIARY)
            .name(UPDATED_NAME)
            .projectCode(UPDATED_PROJECT_CODE)
            .chargeCode(UPDATED_CHARGE_CODE)
            .tollStandard(UPDATED_TOLL_STANDARD)
            .supplement(UPDATED_SUPPLEMENT)
            .sample(UPDATED_SAMPLE)
            .tutorial(UPDATED_TUTORIAL)
            .preservation(UPDATED_PRESERVATION)
            .transportation(UPDATED_TRANSPORTATION)
            .applicationUnitType(UPDATED_APPLICATION_UNIT_TYPE)
            .applicationRemark(UPDATED_APPLICATION_REMARK)
            .medicalMethod(UPDATED_MEDICAL_METHOD)
            .projectConcourse(UPDATED_PROJECT_CONCOURSE)
            .hurryDepartment(UPDATED_HURRY_DEPARTMENT)
            .reportingTime(UPDATED_REPORTING_TIME)
            .clinicalApplication(UPDATED_CLINICAL_APPLICATION)
            .series(UPDATED_SERIES)
            .subSeries(UPDATED_SUB_SERIES)
            .remarks(UPDATED_REMARKS);

        restDiseaseXiAnMockMvc.perform(put("/api/disease-xi-ans")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedDiseaseXiAn)))
            .andExpect(status().isOk());

        // Validate the DiseaseXiAn in the database
        List<DiseaseXiAn> diseaseXiAnList = diseaseXiAnRepository.findAll();
        assertThat(diseaseXiAnList).hasSize(databaseSizeBeforeUpdate);
        DiseaseXiAn testDiseaseXiAn = diseaseXiAnList.get(diseaseXiAnList.size() - 1);
        assertThat(testDiseaseXiAn.getSubsidiary()).isEqualTo(UPDATED_SUBSIDIARY);
        assertThat(testDiseaseXiAn.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testDiseaseXiAn.getProjectCode()).isEqualTo(UPDATED_PROJECT_CODE);
        assertThat(testDiseaseXiAn.getChargeCode()).isEqualTo(UPDATED_CHARGE_CODE);
        assertThat(testDiseaseXiAn.getTollStandard()).isEqualTo(UPDATED_TOLL_STANDARD);
        assertThat(testDiseaseXiAn.getSupplement()).isEqualTo(UPDATED_SUPPLEMENT);
        assertThat(testDiseaseXiAn.getSample()).isEqualTo(UPDATED_SAMPLE);
        assertThat(testDiseaseXiAn.getTutorial()).isEqualTo(UPDATED_TUTORIAL);
        assertThat(testDiseaseXiAn.getPreservation()).isEqualTo(UPDATED_PRESERVATION);
        assertThat(testDiseaseXiAn.getTransportation()).isEqualTo(UPDATED_TRANSPORTATION);
        assertThat(testDiseaseXiAn.getApplicationUnitType()).isEqualTo(UPDATED_APPLICATION_UNIT_TYPE);
        assertThat(testDiseaseXiAn.getApplicationRemark()).isEqualTo(UPDATED_APPLICATION_REMARK);
        assertThat(testDiseaseXiAn.getMedicalMethod()).isEqualTo(UPDATED_MEDICAL_METHOD);
        assertThat(testDiseaseXiAn.getProjectConcourse()).isEqualTo(UPDATED_PROJECT_CONCOURSE);
        assertThat(testDiseaseXiAn.getHurryDepartment()).isEqualTo(UPDATED_HURRY_DEPARTMENT);
        assertThat(testDiseaseXiAn.getReportingTime()).isEqualTo(UPDATED_REPORTING_TIME);
        assertThat(testDiseaseXiAn.getClinicalApplication()).isEqualTo(UPDATED_CLINICAL_APPLICATION);
        assertThat(testDiseaseXiAn.getSeries()).isEqualTo(UPDATED_SERIES);
        assertThat(testDiseaseXiAn.getSubSeries()).isEqualTo(UPDATED_SUB_SERIES);
        assertThat(testDiseaseXiAn.getRemarks()).isEqualTo(UPDATED_REMARKS);

        // Validate the DiseaseXiAn in Elasticsearch
        verify(mockDiseaseXiAnSearchRepository, times(1)).save(testDiseaseXiAn);
    }

    @Test
    @Transactional
    public void updateNonExistingDiseaseXiAn() throws Exception {
        int databaseSizeBeforeUpdate = diseaseXiAnRepository.findAll().size();

        // Create the DiseaseXiAn

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restDiseaseXiAnMockMvc.perform(put("/api/disease-xi-ans")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(diseaseXiAn)))
            .andExpect(status().isBadRequest());

        // Validate the DiseaseXiAn in the database
        List<DiseaseXiAn> diseaseXiAnList = diseaseXiAnRepository.findAll();
        assertThat(diseaseXiAnList).hasSize(databaseSizeBeforeUpdate);

        // Validate the DiseaseXiAn in Elasticsearch
        verify(mockDiseaseXiAnSearchRepository, times(0)).save(diseaseXiAn);
    }

    @Test
    @Transactional
    public void deleteDiseaseXiAn() throws Exception {
        // Initialize the database
        diseaseXiAnRepository.saveAndFlush(diseaseXiAn);

        int databaseSizeBeforeDelete = diseaseXiAnRepository.findAll().size();

        // Delete the diseaseXiAn
        restDiseaseXiAnMockMvc.perform(delete("/api/disease-xi-ans/{id}", diseaseXiAn.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<DiseaseXiAn> diseaseXiAnList = diseaseXiAnRepository.findAll();
        assertThat(diseaseXiAnList).hasSize(databaseSizeBeforeDelete - 1);

        // Validate the DiseaseXiAn in Elasticsearch
        verify(mockDiseaseXiAnSearchRepository, times(1)).deleteById(diseaseXiAn.getId());
    }

    @Test
    @Transactional
    public void searchDiseaseXiAn() throws Exception {
        // Initialize the database
        diseaseXiAnRepository.saveAndFlush(diseaseXiAn);
        when(mockDiseaseXiAnSearchRepository.search(queryStringQuery("id:" + diseaseXiAn.getId()), PageRequest.of(0, 20)))
            .thenReturn(new PageImpl<>(Collections.singletonList(diseaseXiAn), PageRequest.of(0, 1), 1));
        // Search the diseaseXiAn
        restDiseaseXiAnMockMvc.perform(get("/api/_search/disease-xi-ans?query=id:" + diseaseXiAn.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(diseaseXiAn.getId().intValue())))
            .andExpect(jsonPath("$.[*].subsidiary").value(hasItem(DEFAULT_SUBSIDIARY)))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME)))
            .andExpect(jsonPath("$.[*].projectCode").value(hasItem(DEFAULT_PROJECT_CODE)))
            .andExpect(jsonPath("$.[*].chargeCode").value(hasItem(DEFAULT_CHARGE_CODE)))
            .andExpect(jsonPath("$.[*].tollStandard").value(hasItem(DEFAULT_TOLL_STANDARD)))
            .andExpect(jsonPath("$.[*].supplement").value(hasItem(DEFAULT_SUPPLEMENT)))
            .andExpect(jsonPath("$.[*].sample").value(hasItem(DEFAULT_SAMPLE)))
            .andExpect(jsonPath("$.[*].tutorial").value(hasItem(DEFAULT_TUTORIAL)))
            .andExpect(jsonPath("$.[*].preservation").value(hasItem(DEFAULT_PRESERVATION)))
            .andExpect(jsonPath("$.[*].transportation").value(hasItem(DEFAULT_TRANSPORTATION)))
            .andExpect(jsonPath("$.[*].applicationUnitType").value(hasItem(DEFAULT_APPLICATION_UNIT_TYPE)))
            .andExpect(jsonPath("$.[*].applicationRemark").value(hasItem(DEFAULT_APPLICATION_REMARK)))
            .andExpect(jsonPath("$.[*].medicalMethod").value(hasItem(DEFAULT_MEDICAL_METHOD)))
            .andExpect(jsonPath("$.[*].projectConcourse").value(hasItem(DEFAULT_PROJECT_CONCOURSE)))
            .andExpect(jsonPath("$.[*].hurryDepartment").value(hasItem(DEFAULT_HURRY_DEPARTMENT)))
            .andExpect(jsonPath("$.[*].reportingTime").value(hasItem(DEFAULT_REPORTING_TIME)))
            .andExpect(jsonPath("$.[*].clinicalApplication").value(hasItem(DEFAULT_CLINICAL_APPLICATION)))
            .andExpect(jsonPath("$.[*].series").value(hasItem(DEFAULT_SERIES)))
            .andExpect(jsonPath("$.[*].subSeries").value(hasItem(DEFAULT_SUB_SERIES)))
            .andExpect(jsonPath("$.[*].remarks").value(hasItem(DEFAULT_REMARKS)));
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(DiseaseXiAn.class);
        DiseaseXiAn diseaseXiAn1 = new DiseaseXiAn();
        diseaseXiAn1.setId(1L);
        DiseaseXiAn diseaseXiAn2 = new DiseaseXiAn();
        diseaseXiAn2.setId(diseaseXiAn1.getId());
        assertThat(diseaseXiAn1).isEqualTo(diseaseXiAn2);
        diseaseXiAn2.setId(2L);
        assertThat(diseaseXiAn1).isNotEqualTo(diseaseXiAn2);
        diseaseXiAn1.setId(null);
        assertThat(diseaseXiAn1).isNotEqualTo(diseaseXiAn2);
    }
}
