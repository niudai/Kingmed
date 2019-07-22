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

import javax.transaction.Transactional;

import com.google.common.collect.Lists;

import org.apache.lucene.util.fst.PairOutputs.Pair;
import org.elasticsearch.index.query.QueryBuilder;
import org.elasticsearch.index.query.QueryBuilders;
import org.elasticsearch.index.query.QueryStringQueryBuilder;
import org.hibernate.annotations.common.util.impl.LoggerFactory;
import org.slf4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.util.FileSystemUtils;
import org.springframework.util.StreamUtils;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.mvc.method.annotation.MvcUriComponentsBuilder;

import io.github.jhipster.sample.config.StorageProperties;
import io.github.jhipster.sample.domain.ImageApplication;
import io.github.jhipster.sample.repository.ImageApplicationRepository;
import io.github.jhipster.sample.repository.search.ImageApplicationSearchRepository;
import io.github.jhipster.sample.service.StorageService;
import io.github.jhipster.sample.web.rest.ImageUploadController;
import io.github.jhipster.sample.web.rest.errors.StorageException;
import io.github.jhipster.sample.web.rest.errors.StorageFileNotFoundException;
import io.github.jhipster.sample.web.rest.util.PaginationUtil;
import io.jsonwebtoken.io.IOException;

/**
 * Service for application files.
 */
@Service
public class ImageApplicationService {

    private final Logger log = org.slf4j.LoggerFactory.getLogger(ImageApplicationService.class);

    private final Path rootLocation;

    private final ImageApplicationRepository imageApplicationRepository;

    private ImageApplicationSearchRepository imageApplicationSearchRepository;

    @Autowired
    public ImageApplicationService(
        StorageProperties properties,
        ImageApplicationRepository imageApplicationRepository,
        ImageApplicationSearchRepository imageApplicationSearchRepository) {
        this.imageApplicationSearchRepository = imageApplicationSearchRepository;
        this.imageApplicationRepository = imageApplicationRepository;
        this.rootLocation = Paths.get(properties.getImageApplicationLocation());
    }

    @Transactional
    public Long store(MultipartFile file, String name) {
        ImageApplication image = new ImageApplication();

        String filename = StringUtils.cleanPath(file.getOriginalFilename());
        int dot = filename.lastIndexOf('.');
		String extension = (dot == -1) ? "" : filename.substring(dot + 1);
        Long generatedId = imageApplicationRepository.save(image).getId();
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
        imageApplicationSearchRepository.save(image);
        return imageApplicationRepository.save(image).getId();
    }

    /**
     * Method to rename an application.
     * @param id
     * @param name
     */
    @Transactional
    public void update(Long id, String name) {
        ImageApplication imageApplication = imageApplicationRepository.findById(id).get();
        imageApplication.name = name;
        imageApplicationRepository.save(imageApplication);
        imageApplicationSearchRepository.save(imageApplication);
    }

    /**
     * Load All ImageApplications as a list.
     */
    @Transactional
    public Page<ImageApplication> loadAll(Pageable pageable) {
        Page<ImageApplication> page = imageApplicationRepository.findAll(pageable);
        return page;
    }

    /**
     * Load All ImageApplications as a list.
     */
    @Transactional
    public List<ImageApplication> loadAll() {
        return  imageApplicationRepository.findAll();
    }

    @Transactional
    public List<ImageApplication> search(String query) {
        // Page<ImageApplication> page = imageApplicationSearchRepository.search(QueryBuilders.queryStringQuery(query), pageable);
        List<ImageApplication> list = Lists.newArrayList(imageApplicationSearchRepository.search(QueryBuilders.queryStringQuery(query)));
        return list;
    }

    @Transactional
    public void reindex() {
        imageApplicationSearchRepository.deleteAll();
        imageApplicationSearchRepository.saveAll(imageApplicationRepository.findAll());
    }

    @Transactional
    public void delete(Long id) {
        try {
            FileSystemUtils.deleteRecursively(
                rootLocation.resolve(
                    imageApplicationRepository.findById(id).get().getPath()));
        } catch (java.io.IOException e) {
            e.printStackTrace();
        }
        imageApplicationRepository.deleteById(id);
        imageApplicationSearchRepository.deleteById(id);
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
