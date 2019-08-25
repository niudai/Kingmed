package io.github.jhipster.sample.domain;

import java.util.HashSet;
import java.util.Objects;
import java.util.Set;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.Table;

import io.github.jhipster.sample.domain.abstractDomain.MediaFile;

/**
 * Image in Supplies
 * Image object storing it's filename and path
 */
@Entity
@Table(name = "image_supplies")
public class ImageSupplies implements MediaFile {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    public String name = "未命名";

    public String path = " Default Path ";

    @ManyToMany
    @JoinTable(
        name = "disease_xi_an_image_supplies",
        inverseJoinColumns = @JoinColumn(name = "disease_xi_an_id", referencedColumnName = "id"),
        joinColumns = @JoinColumn(name = "image_supplies_id", referencedColumnName = "id"))
    private Set<DiseaseXiAn> diseaseXiAns = new HashSet<>();

    public ImageSupplies() {
    }

    public Set<DiseaseXiAn> getDiseaseXiAns() {
        return this.diseaseXiAns;
    }

    public void setDiseaseXiAns(Set<DiseaseXiAn> diseaseXiAns) {
        this.diseaseXiAns = diseaseXiAns;
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

    public String getPath() {
        return this.path;
    }

    public void setPath(String path) {
        this.path = path;
    }

    public ImageSupplies id(Long id) {
        this.id = id;
        return this;
    }

    public ImageSupplies name(String name) {
        this.name = name;
        return this;
    }

    public ImageSupplies path(String path) {
        this.path = path;
        return this;
    }

    @Override
    public boolean equals(Object o) {
        if (o == this)
            return true;
        if (!(o instanceof ImageSupplies)) {
            return false;
        }
        ImageSupplies imageSupplies = (ImageSupplies) o;
        return Objects.equals(id, imageSupplies.id) && Objects.equals(name, imageSupplies.name) && Objects.equals(path, imageSupplies.path);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, name, path);
    }

    @Override
    public String toString() {
        return "{" +
            " id='" + getId() + "'" +
            ", name='" + getName() + "'" +
            ", path='" + getPath() + "'" +
            "}";
    }

    public ImageSupplies update(ImageSupplies imageSupplies) {
        this.id = imageSupplies.id;
        this.name = imageSupplies.name;
        this.path = imageSupplies.path;
        return this;
    }

}
