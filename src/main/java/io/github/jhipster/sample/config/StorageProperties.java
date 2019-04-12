package io.github.jhipster.sample.config;

import org.springframework.boot.context.properties.ConfigurationProperties;

/**
 * StorageProperties denotes where to store the images.
 */
@ConfigurationProperties("storage")
public class StorageProperties {

    private String imageLocation = "images";

    public String getImageLocation() {
        return imageLocation;
    }

    public void setLocation(String location) {
        this.imageLocation = location;
    }

}
