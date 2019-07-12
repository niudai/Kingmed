package io.github.jhipster.sample.domain;

import java.util.Objects;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import org.springframework.data.elasticsearch.annotations.Document;

/**
 * Image in Service Platform
 * Image object storing it's filename and path
 */
@Entity
@Table(name = "image_platform")
@Document(indexName = "imageplatform")
public class ImagePlatform {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public Long id;

    public String name = "未命名";

    public String path = " Default Path ";

    public ImagePlatform() {
    }

    public ImagePlatform(Long id, String name, String path) {
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

    public ImagePlatform id(Long id) {
        this.id = id;
        return this;
    }

    public ImagePlatform name(String name) {
        this.name = name;
        return this;
    }

    public ImagePlatform path(String path) {
        this.path = path;
        return this;
    }

    @Override
    public boolean equals(Object o) {
        if (o == this)
            return true;
        if (!(o instanceof ImagePlatform)) {
            return false;
        }
        ImagePlatform imagePlatform = (ImagePlatform) o;
        return Objects.equals(id, imagePlatform.id) && Objects.equals(name, imagePlatform.name) && Objects.equals(path, imagePlatform.path);
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
