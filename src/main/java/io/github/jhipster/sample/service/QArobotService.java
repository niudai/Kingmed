package io.github.jhipster.sample.service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import javax.persistence.EntityManager;
import javax.persistence.TypedQuery;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import io.github.jhipster.sample.domain.QArobot;
import io.github.jhipster.sample.web.rest.searchdto.QarobotSearchDTO;
import static io.github.jhipster.sample.web.rest.util.SearchUtil.*;

/**
 * QArobotService
 */
@Service
public class QArobotService {

    @Autowired
    private EntityManager entityManager;

    public Page<QArobot> searchQArobot(
        QarobotSearchDTO searchDTO, Pageable pageable
    ) {
        CriteriaBuilder cb = entityManager.getCriteriaBuilder();
        CriteriaQuery<QArobot> qarobotQuery = cb.createQuery(QArobot.class);
        CriteriaQuery<Long> countQuery = cb.createQuery(Long.class);
        Root<QArobot> qarobot = qarobotQuery.from(QArobot.class);
        Root<QArobot> count = countQuery.from(QArobot.class);

        List<Predicate> restrictions = new ArrayList<Predicate>();
        qarobotQuery.select(qarobot);
        countQuery.select(cb.count(count));

        String query = searchDTO.getQuery();
        if (query != null && query.length() > 0) {
            restrictions.clear();
            restrictions.addAll(queryKeywordParser(query).stream().map(
                keyword -> cb.like(qarobot.get("question"), "%" + keyword + "%")
                ).collect(Collectors.toList()));
            restrictions.add(cb.like(qarobot.get("question"), "%" + query + "%"));
        }

        Predicate queryPredicate = 
            restrictions.size() > 0 ? 
                cb.or(restrictions.toArray(new Predicate[restrictions.size()])) : cb.and();
        
        qarobotQuery.where(queryPredicate);

        // get qarobots satisfied with criterias
        TypedQuery<QArobot> typedDiseaseQuery = entityManager.createQuery(qarobotQuery);
        typedDiseaseQuery.setFirstResult((int)pageable.getOffset());
        typedDiseaseQuery.setMaxResults((int)pageable.getPageSize());
        List<QArobot> allDis = typedDiseaseQuery.getResultList();

        // get totalItems number with criterias
        TypedQuery<Long> typedCountQuery = entityManager.createQuery(countQuery);
        Long totalItems = typedCountQuery.getSingleResult();

        // create a page in terms of the count and content
        Page<QArobot> resultPage = new PageImpl<>(allDis, pageable, totalItems);

        return resultPage;
    }




}