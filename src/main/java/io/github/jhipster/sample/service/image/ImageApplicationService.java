package io.github.jhipster.sample.service.image;

import java.io.InputStream;
import java.net.MalformedURLException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.Base64;
import java.util.List;
import java.util.stream.Stream;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.stereotype.Service;
import org.springframework.util.FileSystemUtils;
import org.springframework.util.StreamUtils;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.mvc.method.annotation.MvcUriComponentsBuilder;

import io.github.jhipster.sample.config.StorageProperties;
import io.github.jhipster.sample.domain.ImageApplication;
import io.github.jhipster.sample.repository.ImageApplicationRepository;
import io.github.jhipster.sample.service.StorageService;
import io.github.jhipster.sample.web.rest.ImageUploadController;
import io.github.jhipster.sample.web.rest.errors.StorageException;
import io.github.jhipster.sample.web.rest.errors.StorageFileNotFoundException;
import io.jsonwebtoken.io.IOException;

/**
 * Service for application files.
 */
@Service
public class ImageApplicationService {

    private final Path rootLocation;

    private final ImageApplicationRepository imageApplicationRepository;

    private Long id = 0l;

    @Autowired
    public ImageApplicationService(StorageProperties properties
        , ImageApplicationRepository imageApplicationRepository) {
        this.imageApplicationRepository = imageApplicationRepository;
        this.rootLocation = Paths.get(properties.getImageApplicationLocation());
    }

    public void store(MultipartFile file) {
        ImageApplication image = new ImageApplication();

        String filename = StringUtils.cleanPath(file.getOriginalFilename());
        int dot = filename.lastIndexOf('.');
		String extension = (dot == -1) ? "" : filename.substring(dot + 1);
        Long generatedId = imageApplicationRepository.save(image).getId();
        image.setPath(
            generatedId.toString() + '.' + extension);
        try {
            if (file.isEmpty()) {
                throw new StorageException("Failed to store empty file " + filename);
            }
            if (filename.contains("..")) {
                // This is a security check
                throw new StorageException(
                        "Cannot store file with relative path outside current directory "
                                + filename);
            }
            try (InputStream inputStream = file.getInputStream()) {
                Files.copy(inputStream, this.rootLocation.resolve(image.getPath()),
                    StandardCopyOption.REPLACE_EXISTING);
            } catch (java.io.IOException e) {
                throw new StorageException("Failed to store file" + filename, e);
            }
        }
        catch (IOException e) {
            throw new StorageException("Failed to store file " + filename, e);
        }
        imageApplicationRepository.save(image);
    }

    /**
     * Method to rename an application.
     * @param id
     * @param name
     */
    public void update(Long id, String name) {
        ImageApplication imageApplication = imageApplicationRepository.findById(id).get();
        imageApplication.name = name;
        imageApplicationRepository.save(imageApplication);
    }

    /**
     * Load All ImageApplications as a list.
     */
    public List<ImageApplication> loadAll() {
        return imageApplicationRepository.findAll();

    }

    public void delete(Long id) {
        try {
            FileSystemUtils.deleteRecursively(
                rootLocation.resolve(
                    imageApplicationRepository.findById(id).get().getPath()));
        } catch (java.io.IOException e) {
            e.printStackTrace();
        }
        imageApplicationRepository.deleteById(id);
    }

    public Resource loadAsResource(Long id) {
        ImageApplication image = imageApplicationRepository.findById(id).get();
        try {
            Path file = rootLocation.resolve(image.getPath());
            Resource resource = new UrlResource(file.toUri());
            if (resource.exists() || resource.isReadable()) {
                return resource;
            }
            else {
                throw new StorageFileNotFoundException(
                        "Could not read file: " + image.getPath());

            }
        }
        catch (MalformedURLException e) {
            throw new StorageFileNotFoundException("Could not read file: " + image.getPath(), e);
        }
    }

    public void deleteAll() {
        FileSystemUtils.deleteRecursively(rootLocation.toFile());
    }

    public void init() {
        try {
            Files.createDirectories(rootLocation);
        } catch (java.io.IOException e) {
            throw new StorageException("Could not initialize storage", e);
        }
    }
}
