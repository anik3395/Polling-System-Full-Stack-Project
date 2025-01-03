package com.example.pollingsystem.specification;

import com.example.pollingsystem.entity.Question;
import io.micrometer.common.util.StringUtils;
import jakarta.persistence.criteria.Predicate;
import org.springframework.data.jpa.domain.Specification;

import java.util.ArrayList;
import java.util.List;

public class QuestionFilterSpecification {
    public  static Specification<Question> getFilteredQuestions(QuestionFilterParams params){
        return (root, query, criteriaBuilder) -> {
            List<Predicate> predicates= new ArrayList<>();
            if(StringUtils.isNotBlank(params.getQuestionText())){
                predicates.add(criteriaBuilder.like(criteriaBuilder.
                        lower(root.get("questionText")), "%" + params.getQuestionText().toLowerCase() + "%"));
            }
//            predicates.add(criteriaBuilder.equal(root.get("questionText"),params.getQuestionText()));
            return criteriaBuilder.and(predicates.toArray(new Predicate[0]));
        };
    }
}
