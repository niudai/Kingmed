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
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.util.FileSystemUtils;
import org.springframework.util.StreamUtils;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.mvc.method.annotation.MvcUriComponentsBuilder;

import io.github.jhipster.sample.config.StorageProperties;
import io.github.jhipster.sample.domain.ImageSupplies;
import io.github.jhipster.sample.repository.ImageSuppliesRepository;
import io.github.jhipster.sample.repository.ImageSuppliesRepository;
import io.github.jhipster.sample.service.StorageService;
import io.github.jhipster.sample.web.rest.ImageUploadController;
import io.github.jhipster.sample.web.rest.errors.StorageException;
import io.github.jhipster.sample.web.rest.errors.StorageFileNotFoundException;
import io.jsonwebtoken.io.IOException;

/**
 * Service for Supplies files.
 */
@Service
public class ImageSuppliesService {

    private final Path rootLocation;

    private final ImageSuppliesRepository imageSuppliesRepository;

    @Autowired
    public ImageSuppliesService(StorageProperties properties
        , ImageSuppliesRepository imageSuppliesRepository) {
        this.imageSuppliesRepository = imageSuppliesRepository;
        this.rootLocation = Paths.get(properties.getImageSuppliesLocation());
    }

    public Long store(MultipartFile file, String name) {
        ImageSupplies image = new ImageSupplies();

        String filename = StringUtils.cleanPath(file.getOriginalFilename());
        int dot = filename.lastIndexOf('.');
		String extension = (dot == -1) ? "" : filename.substring(dot + 1);
        Long generatedId = imageSuppliesRepository.save(image).getId();
        image.setPath(
            generatedId.toString() + '.' + extension);
        image.setName(name);
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
        return imageSuppliesRepository.save(image).getId();
    }

    /**
     * Method to rename an Supplies.
     * @param id
     * @param name
     */
    public void update(Long id, String name) {
        ImageSupplies imageSupplies = imageSuppliesRepository.findById(id).get();
        imageSupplies.name = name;
        imageSuppliesRepository.save(imageSupplies);
    }

    /**
     * Load All ImageSuppliess as a Page.
     */
    public Page<ImageSupplies> loadAll(Pageable pageable) {
        return imageSuppliesRepository.findAll(pageable);
    }

    public void delete(Long id) {
        try {
            FileSystemUtils.deleteRecursively(
                rootLocation.resolve(
                    imageSuppliesRepository.findById(id).get().getPath()));
        } catch (java.io.IOException e) {
            e.printStackTrace();
        }
        imageSuppliesRepository.deleteById(id);
    }

    public Resource loadAsResource(Long id) {
        ImageSupplies image = imageSuppliesRepository.findById(id).get();
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
