package io.github.jhipster.sample.service.image;

import java.io.InputStream;
import java.net.MalformedURLException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.util.FileSystemUtils;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import io.github.jhipster.sample.config.StorageProperties;
import io.github.jhipster.sample.domain.ImagePlatform;
import io.github.jhipster.sample.repository.ImagePlatformRepository;
import io.github.jhipster.sample.web.rest.util.MediaUtil;
import io.jsonwebtoken.io.IOException;

/**
 * Service for Platform files.
 */
@Service
public class ImagePlatformService {

    private final Path rootLocation;


    private final ImagePlatformRepository imagePlatformRepository;

    @Autowired
    public ImagePlatformService(
        StorageProperties properties,
        ImagePlatformRepository imagePlatformRepository) {
        this.imagePlatformRepository = imagePlatformRepository;
        this.rootLocation = Paths.get(properties.getImagePlatformLocation());
    }

    public Long store(MultipartFile file, String name, String description) throws java.lang.Exception {
        ImagePlatform image = new ImagePlatform();

        String filename = StringUtils.cleanPath(file.getOriginalFilename());
        int dot = filename.lastIndexOf('.');
		String extension = (dot == -1) ? "" : filename.substring(dot + 1);
        Long generatedId = imagePlatformRepository.save(image).getId();
        image.setPath(
            generatedId.toString() + '.' + extension);
        image.setName(name);
        image.setDescription(description);
        try {
            if (file.isEmpty()) {
                throw new Exception("Failed to store empty file " + filename);
            }
            if (filename.contains("..")) {
                // This is a security check
                throw new Exception(
                        "Cannot store file with relative path outside current directory "
                                + filename);
            }
            try (InputStream inputStream = file.getInputStream()) {
                Files.copy(inputStream, this.rootLocation.resolve(image.getPath()),
                    StandardCopyOption.REPLACE_EXISTING);
            } catch (java.io.IOException e) {
                throw new Exception("Failed to store file" + filename, e);
            }
        }
        catch (IOException e) {
            throw new Exception("Failed to store file " + filename, e);
        }
        return imagePlatformRepository.save(image).getId();
    }

    /**
     * Method to rename an Platform.
     * @param id
     * @param name
     */
    public void update(Long id, String name) {
        ImagePlatform imagePlatform = imagePlatformRepository.findById(id).get();
        imagePlatform.name = name;
        imagePlatformRepository.save(imagePlatform);
    }

    /**
     * Load All ImagePlatforms as a list.
     */
    public Page<ImagePlatform> loadAll(Pageable pageable) {
        return imagePlatformRepository.findAll(pageable);

    }

    public void delete(Long id) {
        try {
            FileSystemUtils.deleteRecursively(
                rootLocation.resolve(
                    imagePlatformRepository.findById(id).get().getPath()));
        } catch (java.io.IOException e) {
            e.printStackTrace();
        }
        imagePlatformRepository.deleteById(id);
    }

    public ResponseEntity<Resource> loadAsResource(String path) throws java.lang.Exception {
        ImagePlatform image = imagePlatformRepository.findOneByPath(path).get();
        try {
            Path file = rootLocation.resolve(image.getPath());
            Resource resource = new UrlResource(file.toUri());
            if (resource.exists() || resource.isReadable()) {
                return ResponseEntity.ok().headers(MediaUtil.genearteMediaHeaders(image)).body(resource);
            }
            else {
                throw new Exception(
                        "Could not read file: " + image.getPath());

            }
        }
        catch (MalformedURLException e) {
            throw new Exception("Could not read file: " + image.getPath(), e);
        }
    }

    public void deleteAll() {
        FileSystemUtils.deleteRecursively(rootLocation.toFile());
    }

    public void init() throws java.lang.Exception {
        try {
            Files.createDirectories(rootLocation);
        } catch (java.io.IOException e) {
            throw new Exception("Could not initialize storage", e);
        }
    }
}
