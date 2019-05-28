package io.github.jhipster.sample.domain;

import java.util.Objects;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

/**
 * Image in Service Platform
 * Image object storing it's filename and path
 */
@Entity
@Table(name = "image_application")
public class ImageApplication {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public Long id;

    public String name = "未命名";

    public String path = " Default Path ";

    public ImageApplication() {
    }

    public ImageApplication(Long id, String name, String path) {
        this.id = id;
        this.name = name;
        this.path = path;
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

    public ImageApplication id(Long id) {
        this.id = id;
        return this;
    }

    public ImageApplication name(String name) {
        this.name = name;
        return this;
    }

    public ImageApplication path(String path) {
        this.path = path;
        return this;
    }

    @Override
    public boolean equals(Object o) {
        if (o == this)
            return true;
        if (!(o instanceof ImageApplication)) {
            return false;
        }
        ImageApplication ImageApplication = (ImageApplication) o;
        return Objects.equals(id, ImageApplication.id) && Objects.equals(name, ImageApplication.name) && Objects.equals(path, ImageApplication.path);
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

}
