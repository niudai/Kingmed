package io.github.jhipster.sample.service.image;

import java.io.InputStream;
import java.net.MalformedURLException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.stream.Stream;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.stereotype.Service;
import org.springframework.util.FileSystemUtils;
import org.springframework.util.StreamUtils;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import io.github.jhipster.sample.config.StorageProperties;
import io.github.jhipster.sample.service.StorageService;
import io.github.jhipster.sample.web.rest.errors.StorageException;
import io.github.jhipster.sample.web.rest.errors.StorageFileNotFoundException;
import io.jsonwebtoken.io.IOException;

/**
 * ImageSerivce
 */
@Service
public class ImageSerivce implements StorageService {

    private final Path rootLocation;

    @Autowired
    public ImageSerivce(StorageProperties properties) {
        this.rootLocation = Paths.get(properties.getImageLocation());
    }

    @Override
    public void store(MultipartFile file) {
        String filename = StringUtils.cleanPath(file.getOriginalFilename());
        try {

            if (file.isEmpty()) {
                throw new StorageException("Failed to store empty file");
            }
            if (filename.contains("..")) {
                throw new StorageException("cannot store image with relative path" + filename);
            }
            try (InputStream inputStream = file.getInputStream()) {
                Files.copy(inputStream, this.rootLocation.resolve(filename), StandardCopyOption.REPLACE_EXISTING);
            }
        } catch (java.io.IOException e) {
            throw new StorageException("Failed to store image" + filename, e);
        }
    }

    @Override
    public Stream<Path> loadAll() {
        try {
            return Files.walk(this.rootLocation, 1).filter(path -> !path.equals(this.rootLocation))
                    .map(this.rootLocation::relativize);
        } catch (java.io.IOException e) {
            // TODO Auto-generated catch block
            throw new StorageException("Failed to read stored files", e);
        }
    }

    @Override
    public Path load(String filename) {
        return rootLocation.resolve(filename);
    }

    @Override
    public Resource loadAsResource(String filename) {
        try {
            Path file = load(filename);
            Resource resource = new UrlResource(file.toUri());
            if (resource.exists() || resource.isReadable()) {
                return resource;
            }
            else {
                throw new StorageFileNotFoundException(
                    "Could Not Read File: " + filename
                );
            }
        }
        catch (MalformedURLException e) {
            throw new StorageFileNotFoundException("Could not read file: " + filename);
        }

    }

    @Override
    public void init() {
        try {
            Files.createDirectories(rootLocation);
        } catch (java.io.IOException e) {
            throw new StorageException("Could not initialize the image directory", e);
        }
    }

	@Override
	public void deleteAll() {
        FileSystemUtils.deleteRecursively(rootLocation.toFile());
	}
}
