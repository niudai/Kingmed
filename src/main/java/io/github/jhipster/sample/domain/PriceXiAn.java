
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
import org.springframework.data.elasticsearch.annotations.Document;

/**
 * PriceXiAn
 */
@Entity
@Table(name = "price_xi_an")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
@Document(indexName = "pricexian")
public class PriceXiAn implements Serializable {
    private static final long serialVersionUID = 2L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Size(max = 10)
    @Column(name = "subsidiary", length = 10)
    private String subsidiary; // 子公司

    @Size(max = 300)
    @Column(name = "toll_standard", length = 300)
    private String tollStandard; // 物价

    @Size(max = 100)
    @Column(name = "reporting_time", length = 100)
    private String reportingTime; // 出结果时间

    @Size(max = 500)
    @Column(name = "charge_code", length = 500)
    private String chargeCode; // 物价编码

    @Size(max = 100)
    @Column(name = "subseries", length = 100)
    private String subseries;

    public PriceXiAn() {
    }


    public PriceXiAn(Long id, String tollStandard, String reportingTime, String chargeCode) {
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

    public String getSubseries() {
        return this.subseries;
    }

    public void setSubseries(String subseries) {
        this.subseries = subseries;
    }

    public PriceXiAn id(Long id) {
        this.id = id;
        return this;
    }

    public PriceXiAn tollStandard(String tollStandard) {
        this.tollStandard = tollStandard;
        return this;
    }

    public PriceXiAn reportingTime(String reportingTime) {
        this.reportingTime = reportingTime;
        return this;
    }

    public PriceXiAn chargeCode(String chargeCode) {
        this.chargeCode = chargeCode;
        return this;
    }

    public PriceXiAn subseries(String subseries) {
        this.subseries = subseries;
        return this;
    }


    @Override
    public boolean equals(Object o) {
        if (o == this)
            return true;
        if (!(o instanceof PriceXiAn)) {
            return false;
        }
        PriceXiAn PriceXiAn = (PriceXiAn) o;
        return Objects.equals(id, PriceXiAn.id)
            && Objects.equals(tollStandard, PriceXiAn.tollStandard)
            && Objects.equals(reportingTime, PriceXiAn.reportingTime)
            && Objects.equals(chargeCode, PriceXiAn.chargeCode)
            && Objects.equals(subseries, PriceXiAn.subseries);
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }


    @Override
    public String toString() {
        return "{" +
            " id='" + getId() + "'" +
            ", subsidiary='" + getSubsidiary() + "'" +
            ", tollStandard='" + getTollStandard() + "'" +
            ", reportingTime='" + getReportingTime() + "'" +
            ", chargeCode='" + getChargeCode() + "'" +
            ", subseries='" + getSubseries() + "'" +
            "}";
    }

}
