
package io.github.jhipster.sample.domain;

import java.io.Serializable;
import java.util.Objects;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.validation.constraints.Size;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * Prices
 */
@Entity
@Table(name = "price")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Prices implements Serializable {
    private static final long serialVersionUID = 2L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Size(max = 10)
    @Column(name = "subsidiary", length = 10)
    private String subsidiary;

    @Size(max = 500)
    @Column(name = "toll_standard", length = 500)
    private String tollStandard;

    @Size(max = 500)
    @Column(name = "reporting_time", length = 500)
    private String reportingTime;

    @Size(max = 500)
    @Column(name = "charge_code", length = 500)
    private String chargeCode;


    public Prices() {
    }


    public Prices(Long id, String tollStandard, String reportingTime, String chargeCode) {
        this.id = id;
        this.tollStandard = tollStandard;
        this.reportingTime = reportingTime;
        this.chargeCode = chargeCode;
    }

    public String getSubsidiary() {
        return this.subsidiary;
    }

    public void setSubsidiary(String subsidiary) {
        this.subsidiary = subsidiary;
    }

    public Long getId() {
        return this.id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTollStandard() {
        return this.tollStandard;
    }

    public void setTollStandard(String tollStandard) {
        this.tollStandard = tollStandard;
    }

    public String getReportingTime() {
        return this.reportingTime;
    }

    public void setReportingTime(String reportingTime) {
        this.reportingTime = reportingTime;
    }

    public String getChargeCode() {
        return this.chargeCode;
    }

    public void setChargeCode(String chargeCode) {
        this.chargeCode = chargeCode;
    }

    public Prices id(Long id) {
        this.id = id;
        return this;
    }

    public Prices tollStandard(String tollStandard) {
        this.tollStandard = tollStandard;
        return this;
    }

    public Prices reportingTime(String reportingTime) {
        this.reportingTime = reportingTime;
        return this;
    }

    public Prices chargeCode(String chargeCode) {
        this.chargeCode = chargeCode;
        return this;
    }

    @Override
    public boolean equals(Object o) {
        if (o == this)
            return true;
        if (!(o instanceof Prices)) {
            return false;
        }
        Prices prices = (Prices) o;
        return Objects.equals(id, prices.id) && Objects.equals(tollStandard, prices.tollStandard) && Objects.equals(reportingTime, prices.reportingTime) && Objects.equals(chargeCode, prices.chargeCode);
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "{" +
            " id='" + getId() + "'" +
            ", tollStandard='" + getTollStandard() + "'" +
            ", reportingTime='" + getReportingTime() + "'" +
            ", chargeCode='" + getChargeCode() + "'" +
            "}";
    }

}
