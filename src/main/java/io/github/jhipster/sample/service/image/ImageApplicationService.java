package io.github.jhipster.sample.service.image;

import java.io.IOException;
import java.io.InputStream;
import java.net.MalformedURLException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import javax.persistence.EntityManager;
import javax.persistence.TypedQuery;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;
import javax.transaction.Transactional;

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
import io.github.jhipster.sample.domain.ImageApplication;
import io.github.jhipster.sample.repository.ImageApplicationRepository;
import io.github.jhipster.sample.web.rest.errors.StorageException;
import io.github.jhipster.sample.web.rest.searchdto.MediaTypeSearchDTO;
import io.github.jhipster.sample.web.rest.util.MediaUtil;
import io.github.jhipster.sample.web.rest.util.SearchUtil;

/**
 * Service for application files.
 */
@Service
public class ImageApplicationService {

    private final Path rootLocation;

    private final ImageApplicationRepository imageApplicationRepository;

    private EntityManager entityManager;

    @Autowired
    public ImageApplicationService(StorageProperties properties, ImageApplicationRepository imageApplicationRepository,
            EntityManager entityManager) {
        this.entityManager = entityManager;
        this.imageApplicationRepository = imageApplicationRepository;
        this.rootLocation = Paths.get(properties.getImageApplicationLocation());
    }

    @Transactional
    public Long store(MultipartFile file, String name) throws StorageException {
        ImageApplication image = new ImageApplication();

        String filename = StringUtils.cleanPath(file.getOriginalFilename());
        int dot = filename.lastIndexOf('.');
        String extension = (dot == -1) ? "" : filename.substring(dot + 1);
        Long generatedId = imageApplicationRepository.save(image).getId();
        image.setPath(generatedId.toString() + '.' + extension);
        image.setName(name);
        if (file.isEmpty()) {
            throw new StorageException("Failed to store empty file " + filename);
        }
        if (filename.contains("..")) {
            // This is a security check
            throw new StorageException("Cannot store file with relative path outside current directory " + filename);
        }
        try (InputStream inputStream = file.getInputStream()) {
            Files.copy(inputStream, this.rootLocation.resolve(image.getPath()), StandardCopyOption.REPLACE_EXISTING);
        } catch (IOException e) {
            throw new StorageException("Failed to store file" + filename, e);
        }

        return imageApplicationRepository.save(image).getId();
    }

    /**
     * Method to rename an application.
     * 
     * @param id
     * @param name
     */
    @Transactional
    public void update(Long id, String name) {
        ImageApplication imageApplication = imageApplicationRepository.findById(id).get();
        imageApplication.name = name;
        imageApplicationRepository.save(imageApplication);
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
        return imageApplicationRepository.findAll();
    }

    @Transactional
    public List<ImageApplication> search(MediaTypeSearchDTO searchDTO) {
        CriteriaBuilder cb = entityManager.getCriteriaBuilder();
        CriteriaQuery<ImageApplication> imageQuery = cb.createQuery(ImageApplication.class);
        Root<ImageApplication> image = imageQuery.from(ImageApplication.class);

        List<Predicate> restrictions = new ArrayList<Predicate>();
        imageQuery.select(image);

        String query = searchDTO.getQuery();
        if (query != null && query.length() > 0) {
            restrictions.clear();
            restrictions.addAll(SearchUtil.queryKeywordParser(query).stream()
                    .map(keyword -> cb.like(image.get("name"), "%" + keyword + "%")).collect(Collectors.toList()));
            restrictions.add(cb.like(image.get("name"), "%" + query + "%"));
        }

        Predicate queryPredicate = restrictions.size() > 0
                ? cb.or(restrictions.toArray(new Predicate[restrictions.size()]))
                : cb.and();

        imageQuery.where(queryPredicate);

        // get images satisfied with criterias
        TypedQuery<ImageApplication> typedDiseaseQuery = entityManager.createQuery(imageQuery);
        List<ImageApplication> allDis = typedDiseaseQuery.getResultList();

        return allDis;
    }

    @Transactional
    public void delete(Long id) {
        try {
            FileSystemUtils
                    .deleteRecursively(rootLocation.resolve(imageApplicationRepository.findById(id).get().getPath()));
        } catch (IOException e) {
            e.printStackTrace();
        }
        imageApplicationRepository.deleteById(id);
    }

    public ResponseEntity<Resource> loadAsResource(String path) throws MalformedURLException {
        ImageApplication application = imageApplicationRepository.findOneByPath(path).get();
        Path file = rootLocation.resolve(application.getPath());
        Resource resource;
            resource = new UrlResource(file.toUri());
            if (resource.exists() || resource.isReadable()) {
                return ResponseEntity.ok().headers(MediaUtil.genearteMediaHeaders(application)).body(resource);
            }
            else {
                throw new StorageException(
                        "Could not read file: ");
            }
    }

    public void deleteAll() {
        FileSystemUtils.deleteRecursively(rootLocation.toFile());
    }

    public void init() throws StorageException {
        try {
            Files.createDirectories(rootLocation);
        } catch (IOException e) {
            throw new StorageException("Could not initialize storage", e);
        }
    }
}
