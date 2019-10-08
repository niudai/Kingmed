package io.github.jhipster.sample.domain;

import org.hibernate.annotations.BatchSize;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Objects;
import java.util.Set;

/**
 * Disease Branch is used to contain mutiple disease maps, and could contain
 * subDisease map.
 */
@Entity
@Table(name = "disease_branch")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class DiseaseBranch implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Size(max = 50)
    @Column(name = "name", length = 50)
    private String name;

    @OneToMany(
        // mappedBy = "parentDiseaseBranch",
        cascade = CascadeType.ALL
        , orphanRemoval = true,
        fetch = FetchType.LAZY)
    @JoinColumn(name = "disease_branch_id")
    @JsonIgnoreProperties("parentDiseaseBranch")
    @BatchSize(size = 5)
    private List<DiseaseMap> diseaseMaps = new ArrayList<DiseaseMap>();

    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.EAGER)
    @BatchSize(size = 5)
    @JoinColumn(name = "disease_branch_id")
    private Set<LinkCard> linkCards = new HashSet<LinkCard>();

    @Column(name = "disease_partition_id")
    private Long diseasePartitionId;

    @Size(max = 50)
    @Column(name = "subsidiary", length = 50)
    private String subsidiary = "待添加";

    @Size(max = 250)
    @Column(name = "description", length = 250)
    private String description = "待添加";

    public DiseaseBranch() {
    }

    public DiseaseBranch(Long id, String name, List<DiseaseMap> diseaseMaps) {
        this.id = id;
        this.name = name;
        this.diseaseMaps = diseaseMaps;
    }

    public Long getId() {
        return this.id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return this.name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public List<DiseaseMap> getDiseaseMaps() {
        return this.diseaseMaps;
    }

    public void setDiseaseMaps(List<DiseaseMap> diseaseMaps) {
        this.diseaseMaps = diseaseMaps;
    }

    public DiseaseBranch id(Long id) {
        this.id = id;
        return this;
    }

    public DiseaseBranch name(String name) {
        this.name = name;
        return this;
    }

    public DiseaseBranch diseaseMaps(List<DiseaseMap> diseaseMaps) {
        this.diseaseMaps = diseaseMaps;
        return this;
    }

    @Override
    public boolean equals(Object o) {
        if (o == this)
            return true;
        if (!(o instanceof DiseaseBranch)) {
            return false;
        }
        DiseaseBranch diseaseBranch = (DiseaseBranch) o;
        return Objects.equals(id, diseaseBranch.id) && Objects.equals(name, diseaseBranch.name);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, name, diseaseMaps);
    }


    public static long getSerialversionuid() {
        return serialVersionUID;
    }

    public String getSubsidiary() {
        return subsidiary;
    }

    public void setSubsidiary(String subsidiary) {
        this.subsidiary = subsidiary;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    @Override
    public String toString() {
        return "DiseaseBranch [description=" + description + ", id=" + id + ", name="
                + name + ", subsidiary=" + subsidiary + "]";
    }

    public Set<LinkCard> getLinkCards() {
        return linkCards;
    }

    public void setLinkCards(Set<LinkCard> linkCards) {
        this.linkCards = linkCards;
    }

    public DiseaseBranch update(DiseaseBranch diseaseBranch) {
        this.id = diseaseBranch.id;
        this.name = diseaseBranch.name;
        this.subsidiary = diseaseBranch.subsidiary;
        this.description = diseaseBranch.description;
        return this;
    }

    public Long getDiseasePartitionId() {
        return diseasePartitionId;
    }

    public void setDiseasePartitionId(Long diseasePartitionId) {
        this.diseasePartitionId = diseasePartitionId;
    }

}
