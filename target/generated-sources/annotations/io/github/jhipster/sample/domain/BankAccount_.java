package io.github.jhipster.sample.domain;

import java.math.BigDecimal;
import javax.annotation.Generated;
import javax.persistence.metamodel.SetAttribute;
import javax.persistence.metamodel.SingularAttribute;
import javax.persistence.metamodel.StaticMetamodel;

@Generated(value = "org.hibernate.jpamodelgen.JPAMetaModelEntityProcessor")
@StaticMetamodel(BankAccount.class)
public abstract class BankAccount_ {

	public static volatile SetAttribute<BankAccount, Operation> operations;
	public static volatile SingularAttribute<BankAccount, BigDecimal> balance;
	public static volatile SingularAttribute<BankAccount, String> name;
	public static volatile SingularAttribute<BankAccount, Long> id;
	public static volatile SingularAttribute<BankAccount, User> user;

}

