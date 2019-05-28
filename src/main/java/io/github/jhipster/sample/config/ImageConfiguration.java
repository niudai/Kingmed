
package io.github.jhipster.sample.config;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import io.github.jhipster.sample.service.StorageService;
import io.github.jhipster.sample.service.image.ImageApplicationService;
import io.github.jhipster.sample.service.image.ImagePlatformService;
import io.github.jhipster.sample.service.image.ImageSuppliesService;

/**
 * ImageConfiguration
 */
@Configuration
public class ImageConfiguration {

    @Bean
    CommandLineRunner init(StorageService storageService
        , ImageApplicationService imageApplicationService
        , ImagePlatformService imagePlatformService
        , ImageSuppliesService imageSuppliesService) {
        return (args) -> {
            storageService.init();
            imageApplicationService.init();
            imagePlatformService.init();
            imageSuppliesService.init();
        };
    }

}
