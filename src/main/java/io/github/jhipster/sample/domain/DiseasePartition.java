package io.github.jhipster.sample.domain;

import org.hibernate.annotations.BatchSize;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;
import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

/**
 * Disease Branch is used to contain mutiple disease maps, and could contain
 * subDisease map.
 */
@Entity
@Table(name = "diseae_partition")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class DiseasePartition implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Size(max = 50)
    @Column(name = "name", length = 50)
    private String name;

    @OneToMany(
        cascade = CascadeType.ALL
        , orphanRemoval = true,
        fetch = FetchType.LAZY)
    @JoinColumn(name = "disease_partition_id")
    @BatchSize(size = 5)
    private List<DiseaseBranch> diseaseBranches = new ArrayList<DiseaseBranch>();


    @Size(max = 250)
    @Column(name = "description", length = 250)
    private String description = "待添加";

    public DiseasePartition() {
    }

    public DiseasePartition(Long id, String name, List<DiseaseBranch> diseaseBranches) {
        this.id = id;
        this.name = name;
        this.diseaseBranches = diseaseBranches;
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


    public DiseasePartition id(Long id) {
        this.id = id;
        return this;
    }

    public DiseasePartition name(String name) {
        this.name = name;
        return this;
    }

    @Override
    public boolean equals(Object o) {
        if (o == this)
            return true;
        if (!(o instanceof DiseasePartition)) {
            return false;
        }
        DiseasePartition diseaseBranch = (DiseasePartition) o;
        return Objects.equals(id, diseaseBranch.id) && Objects.equals(name, diseaseBranch.name);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, name, diseaseBranches);
    }


    public static long getSerialversionuid() {
        return serialVersionUID;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    @Override
    public String toString() {
        return "DiseasePartition [description=" + description + ", id=" + id + ", name="
                + name + "]";
    }


    public DiseasePartition update(DiseasePartition diseaseBranch) {
        this.id = diseaseBranch.id;
        this.name = diseaseBranch.name;
        this.description = diseaseBranch.description;
        return this;
    }

}
