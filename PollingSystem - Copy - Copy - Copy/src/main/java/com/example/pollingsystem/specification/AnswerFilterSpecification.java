package com.example.pollingsystem.specification;

import com.example.pollingsystem.entity.Answer;
import io.micrometer.common.util.StringUtils;
import jakarta.persistence.criteria.Predicate;
import org.springframework.data.jpa.domain.Specification;

import java.util.ArrayList;
import java.util.List;

public class AnswerFilterSpecification {
    public static Specification<Answer> getFilteredAnswer(AnswerFilterParams params) {
        return (root, query, criteriaBuilder) -> {
            List<Predicate> predicates = new ArrayList<>();
            if (StringUtils.isNotBlank(params.getAnswerText())) {
                predicates.add(criteriaBuilder.like(criteriaBuilder.lower(root.get("answerText")),
                        "%" + params.getAnswerText().toLowerCase() + "%") );
            }
            return criteriaBuilder.and(predicates.toArray(new Predicate[0]));
        };
    }
}
