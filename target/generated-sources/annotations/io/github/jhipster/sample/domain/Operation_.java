package io.github.jhipster.sample.domain;

import java.math.BigDecimal;
import java.time.Instant;
import javax.annotation.Generated;
import javax.persistence.metamodel.SetAttribute;
import javax.persistence.metamodel.SingularAttribute;
import javax.persistence.metamodel.StaticMetamodel;

@Generated(value = "org.hibernate.jpamodelgen.JPAMetaModelEntityProcessor")
@StaticMetamodel(Operation.class)
public abstract class Operation_ {

	public static volatile SingularAttribute<Operation, Instant> date;
	public static volatile SingularAttribute<Operation, BankAccount> bankAccount;
	public static volatile SingularAttribute<Operation, BigDecimal> amount;
	public static volatile SingularAttribute<Operation, String> description;
	public static volatile SingularAttribute<Operation, Long> id;
	public static volatile SetAttribute<Operation, Label> labels;

}

