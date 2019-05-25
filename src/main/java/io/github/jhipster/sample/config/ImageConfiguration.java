
package io.github.jhipster.sample.config;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import io.github.jhipster.sample.service.StorageService;
import io.github.jhipster.sample.service.image.ImageApplicationService;

/**
 * ImageConfiguration
 */
@Configuration
public class ImageConfiguration {

    @Bean
    CommandLineRunner init(StorageService storageService
        , ImageApplicationService imageApplicationService) {
        return (args) -> {
            storageService.init();
            imageApplicationService.init();
        };
    }

}
