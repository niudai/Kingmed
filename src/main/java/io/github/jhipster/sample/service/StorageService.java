package io.github.jhipster.sample.service;

import java.util.stream.Stream;
import java.io.IOException;
import java.nio.file.Path;
import org.springframework.core.io.Resource;
import org.springframework.web.multipart.MultipartFile;

public interface StorageService {

    void init();

    void store(MultipartFile file);

    void delete(String filename) throws IOException;

    Stream<Path> loadAll();

    Resource loadAsResource(String filename);

    void deleteAll();

}
