package io.github.jhipster.sample.config;

import org.springframework.boot.context.properties.ConfigurationProperties;

/**
 * StorageProperties denotes where to store the images.
 */
@ConfigurationProperties("storage")
public class StorageProperties {

    private String imageLocation = "images";

    private String imageApplicationLocation = "application";

    private String imagePlatformLocation = "platform";

    public String getImageApplicationLocation() {
        return this.imageApplicationLocation;
    }

    public void setImageApplicationLocation(String imageApplicationLocation) {
        this.imageApplicationLocation = imageApplicationLocation;
    }

    public String getImagePlatformLocation() {
        return this.imagePlatformLocation;
    }

    public void setImagePlatformLocation(String imagePlatformLocation) {
        this.imagePlatformLocation = imagePlatformLocation;
    }

    public String getImageSuppliesLocation() {
        return this.imageSuppliesLocation;
    }

    public void setImageSuppliesLocation(String imageSuppliesLocation) {
        this.imageSuppliesLocation = imageSuppliesLocation;
    }

    private String imageSuppliesLocation = "supplies";

    public String getImageLocation() {
        return imageLocation;
    }

    public void setLocation(String location) {
        this.imageLocation = location;
    }

}
