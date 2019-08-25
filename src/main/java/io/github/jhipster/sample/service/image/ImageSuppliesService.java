package io.github.jhipster.sample.service.image;

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

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.util.FileSystemUtils;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import io.github.jhipster.sample.config.StorageProperties;
import io.github.jhipster.sample.domain.ImageSupplies;
import io.github.jhipster.sample.repository.ImageSuppliesRepository;
import io.github.jhipster.sample.web.rest.errors.StorageException;
import io.github.jhipster.sample.web.rest.errors.StorageFileNotFoundException;
import io.github.jhipster.sample.web.rest.searchdto.MediaTypeSearchDTO;
import io.github.jhipster.sample.web.rest.util.MediaUtil;
import io.github.jhipster.sample.web.rest.util.SearchUtil;
import io.jsonwebtoken.io.IOException;

/**
 * Service for Supplies files.
 */
@Service
public class ImageSuppliesService {

    private final Path rootLocation;

    private final ImageSuppliesRepository imageSuppliesRepository;

    private EntityManager entityManager;

    @Autowired
    public ImageSuppliesService(StorageProperties properties, ImageSuppliesRepository imageSuppliesRepository,
            EntityManager entityManager) {
        this.entityManager = entityManager;
        this.imageSuppliesRepository = imageSuppliesRepository;
        this.rootLocation = Paths.get(properties.getImageSuppliesLocation());
    }

    public Long store(MultipartFile file, String name) {
        ImageSupplies image = new ImageSupplies();

        String filename = StringUtils.cleanPath(file.getOriginalFilename());
        int dot = filename.lastIndexOf('.');
        String extension = (dot == -1) ? "" : filename.substring(dot + 1);
        Long generatedId = imageSuppliesRepository.save(image).getId();
        image.setPath(generatedId.toString() + '.' + extension);
        image.setName(name);
        try {
            if (file.isEmpty()) {
                throw new StorageException("Failed to store empty file " + filename);
            }
            if (filename.contains("..")) {
                // This is a security check
                throw new StorageException(
                        "Cannot store file with relative path outside current directory " + filename);
            }
            try (InputStream inputStream = file.getInputStream()) {
                Files.copy(inputStream, this.rootLocation.resolve(image.getPath()),
                        StandardCopyOption.REPLACE_EXISTING);
            } catch (java.io.IOException e) {
                throw new StorageException("Failed to store file" + filename, e);
            }
        } catch (IOException e) {
            throw new StorageException("Failed to store file " + filename, e);
        }
        return imageSuppliesRepository.save(image).getId();
    }

    /**
     * Method to rename an Supplies.
     * 
     * @param id
     * @param name
     */
    public void update(Long id, String name) {
        ImageSupplies imageSupplies = imageSuppliesRepository.findById(id).get();
        imageSupplies.name = name;
        imageSuppliesRepository.save(imageSupplies);
    }

    public Page<ImageSupplies> search(MediaTypeSearchDTO searchDTO, Pageable pageable) {
        CriteriaBuilder cb = entityManager.getCriteriaBuilder();
        CriteriaQuery<ImageSupplies> imageQuery = cb.createQuery(ImageSupplies.class);
        CriteriaQuery<Long> countQuery = cb.createQuery(Long.class);
        Root<ImageSupplies> image = imageQuery.from(ImageSupplies.class);
        Root<ImageSupplies> count = countQuery.from(ImageSupplies.class);

        List<Predicate> restrictions = new ArrayList<Predicate>();
        imageQuery.select(image);
        countQuery.select(cb.count(count));

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
        TypedQuery<ImageSupplies> typedDiseaseQuery = entityManager.createQuery(imageQuery);
        typedDiseaseQuery.setFirstResult((int) pageable.getOffset());
        typedDiseaseQuery.setMaxResults((int) pageable.getPageSize());

        // get totalItems number with criterias
        TypedQuery<Long> typedCountQuery = entityManager.createQuery(countQuery);
        Long totalItems = typedCountQuery.getSingleResult();

        List<ImageSupplies> allDis = typedDiseaseQuery.getResultList();

        Page<ImageSupplies> resultPage = new PageImpl<>(allDis, pageable, totalItems);

        return resultPage;
    }

    /**
     * Load All ImageSuppliess as a Page.
     */
    public Page<ImageSupplies> loadAll(Pageable pageable) {
        return imageSuppliesRepository.findAll(pageable);
    }

    /**
     * Load All ImageSuppliess as a Page.
     */
    public List<ImageSupplies> loadAll() {
        return imageSuppliesRepository.findAll();
    }

    public void delete(Long id) {
        try {
            FileSystemUtils
                    .deleteRecursively(rootLocation.resolve(imageSuppliesRepository.findById(id).get().getPath()));
        } catch (java.io.IOException e) {
            e.printStackTrace();
        }
        imageSuppliesRepository.deleteById(id);
    }

    public ResponseEntity<Resource> loadAsResource(Long id) {
        ImageSupplies suppliess = imageSuppliesRepository.findById(id).get();
        try {
            Path file = rootLocation.resolve(suppliess.getPath());
            Resource resource = new UrlResource(file.toUri());
            if (resource.exists() || resource.isReadable()) {
                return ResponseEntity.ok().headers(MediaUtil.genearteMediaHeaders(suppliess)).body(resource);
            } else {
                throw new StorageFileNotFoundException("Could not read file: " + suppliess.getPath());

            }
        } catch (MalformedURLException e) {
            throw new StorageFileNotFoundException("Could not read file: " + suppliess.getPath(), e);
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
