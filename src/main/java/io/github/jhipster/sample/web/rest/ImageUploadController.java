package io.github.jhipster.sample.web.rest;

import java.io.IOException;
import java.util.List;
import java.util.stream.Collectors;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.mvc.method.annotation.MvcUriComponentsBuilder;

import io.github.jhipster.sample.domain.Image;
import io.github.jhipster.sample.domain.ImageApplication;
import io.github.jhipster.sample.domain.ImagePlatform;
import io.github.jhipster.sample.domain.ImageSupplies;
import io.github.jhipster.sample.service.image.ImageApplicationService;
import io.github.jhipster.sample.service.image.ImagePlatformService;
import io.github.jhipster.sample.service.image.ImageService;
import io.github.jhipster.sample.service.image.ImageSuppliesService;
import io.github.jhipster.sample.web.rest.errors.StorageFileNotFoundException;
import io.github.jhipster.sample.web.rest.util.PaginationUtil;

/**
 * ImageUploadController
 */
@RestController
@RequestMapping("/api")
public class ImageUploadController {

    private final Logger log = LoggerFactory.getLogger(ImageUploadController.class);

    private final ImageService storageService;

    private final ImageApplicationService imageApplicationService;

    private final ImageSuppliesService imageSuppliesService;

    private final ImagePlatformService imagePlatformService;

    @Autowired
    public ImageUploadController(ImageService storageService
        , ImageApplicationService imageApplicationService
        , ImageSuppliesService imageSuppliesService
        , ImagePlatformService imagePlatformService) {
        this.imagePlatformService = imagePlatformService;
        this.imageSuppliesService = imageSuppliesService;
        this.storageService = storageService;
        this.imageApplicationService = imageApplicationService;
    }

    /*********************************** Application Files Method Mapping ************************** */

     /**
     * GET /images/:filename get image with name :filename.
     */
    @GetMapping("/images/application/{path}")
    public ResponseEntity<Resource> serveApplication(@PathVariable String path) {
        return imageApplicationService.loadAsResource(path);
    }

     /**
     * DELETE /images/:filename get image with name :filename.
     */
    @DeleteMapping("/images/application/{id}")
    public ResponseEntity<Resource> deleteApplication(@PathVariable Long id) {
        imageApplicationService.delete(id);
        return ResponseEntity.ok().build();
    }

    /**
     * GET /images/application/{id}/{name} : update the name of application
     * @param id id of application.
     * @param name name of application.
     * @return 200 if ok.
     */
    @GetMapping("/images/application/{id}/{name}")
    public ResponseEntity<Resource> updateApplication(@PathVariable Long id, @PathVariable String name) {
        imageApplicationService.update(id, name);
        return ResponseEntity.ok().build();
    }

    /**
     * POST /api/images/ : upload a new image
     * @param image to be uploaded which is multipart file
     * @return responsebody with 200.
     */
    @PostMapping("/images/application")
    public ResponseEntity<Resource> handleApplicationUpload(@RequestParam("image") MultipartFile file, @RequestParam("name") String name) {
        imageApplicationService.store(file, name);
        return ResponseEntity.ok().build();
    }

    /**
     * GET /images/application : get all applications
     * @return
     */
    @GetMapping("/images/application-pageable")
    public ResponseEntity<List<ImageApplication>> listUploadedPageableApplications(Pageable pageable) {
        log.debug("REST request to get a page of ImageApplications");
        Page<ImageApplication> page = imageApplicationService.loadAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "api/images/application");
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * GET /images/application : get all applications
     * @return
     */
    @GetMapping("/images/application")
    public ResponseEntity<List<ImageApplication>> listUploadedApplications(Pageable pageable) {
        log.debug("REST request to get a page of ImageApplications");
        List<ImageApplication> result = imageApplicationService.loadAll();
        return ResponseEntity.ok().body(result);
    }

    @GetMapping("/images/_search/application")
    public ResponseEntity<List<ImageApplication>> searchApplications(@RequestParam String query) {
        log.debug("REST request to get a page of ImageApplications");
        List<ImageApplication> list = imageApplicationService.search(query);
        return ResponseEntity.ok().body(list);
    }

    /**
     * GET /images/application : reindex all applications
     * @return
     */
    @GetMapping("/images/application/reindex")
    public ResponseEntity<Void> reindexApplications() {
        log.debug("REST request to reindex ImageApplications");
        imageApplicationService.reindex();;
        return ResponseEntity.ok().build();
    }

    /*********************************** Supplies Files Method Mapping ************************** */

     /**
     * GET /images/:filename get image with name :filename.
     */
    @GetMapping("/images/supplies/{id}")
    public ResponseEntity<Resource> serveSupplies(@PathVariable Long id) {
        return imageSuppliesService.loadAsResource(id);
    }

     /**
     * DELETE /images/:filename get image with name :filename.
     */
    @DeleteMapping("/images/supplies/{id}")
    public ResponseEntity<Resource> deleteSupplies(@PathVariable Long id) {
        imageSuppliesService.delete(id);
        return ResponseEntity.ok().build();
    }

    /**
     * GET /images/supplies/{id}/{name} : update the name of supplies
     * @param id id of supplies.
     * @param name name of supplies.
     * @return 200 if ok.
     */
    @GetMapping("/images/supplies/{id}/{name}")
    public ResponseEntity<Resource> updateSupplies(@PathVariable Long id, @PathVariable String name) {
        imageSuppliesService.update(id, name);
        return ResponseEntity.ok().build();
    }

    /**
     * POST /api/images/ : upload a new image
     * @param image to be uploaded which is multipart file
     * @return responsebody with 200.
     */
    @PostMapping("/images/supplies")
    public ResponseEntity<Resource> handleSuppliesUpload(@RequestParam("image") MultipartFile file, @RequestParam("name") String name) {
        imageSuppliesService.store(file, name);
        return ResponseEntity.ok().build();
    }

    /**
     * GET /images/supplies : get all suppliess
     * @return
     */
    @GetMapping("/images/supplies-pageable")
    public ResponseEntity<List<ImageSupplies>> listUploadedPageableSuppliess(Pageable pageable) {
        log.debug("REST request to get a page of ImageSupplies");
        Page<ImageSupplies> page = imageSuppliesService.loadAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "api/images/supplies");
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * GET /images/supplies : get all suppliess
     * @return
     */
    @GetMapping("/images/supplies")
    public ResponseEntity<List<ImageSupplies>> listUploadedSuppliess() {
        log.debug("REST request to get a page of ImageSupplies");
        List<ImageSupplies> result = imageSuppliesService.loadAll();
        return ResponseEntity.ok().body(result);
    }

    @GetMapping("/images/_search/supplies")
    public ResponseEntity<List<ImageSupplies>> searchSuppliess(@RequestParam String query, Pageable pageable) {
        log.debug("REST request to get a page of ImageSupplies");
        List<ImageSupplies> list = imageSuppliesService.search(query);
        return ResponseEntity.ok().body(list);
    }

    /**
     * GET /images/supplies : reindex all suppliess
     * @return
     */
    @GetMapping("/images/supplies/reindex")
    public ResponseEntity<Void> reindexSuppliess() {
        log.debug("REST request to reindex ImageSuppliess");
        imageSuppliesService.reindex();
        return ResponseEntity.ok().build();
    }

        /*********************************** Platform Files Method Mapping ************************** */

     /**
     * GET /images/:filename get image with name :filename.
     */
    @GetMapping("/images/platform/{id}")
    public ResponseEntity<Resource> servePlatform(@PathVariable Long id) {
        return imagePlatformService.loadAsResource(id);
    }

     /**
     * DELETE /images/:filename get image with name :filename.
     */
    @DeleteMapping("/images/platform/{id}")
    public ResponseEntity<Resource> deletePlatform(@PathVariable Long id) {
        imagePlatformService.delete(id);
        return ResponseEntity.ok().build();
    }

    /**
     * GET /images/platform/{id}/{name} : update the name of platform
     * @param id id of platform.
     * @param name name of platform.
     * @return 200 if ok.
     */
    @GetMapping("/images/platform/{id}/{name}")
    public ResponseEntity<Resource> updatePlatform(@PathVariable Long id, @PathVariable String name) {
        imagePlatformService.update(id, name);
        return ResponseEntity.ok().build();
    }

    /**
     * POST /api/images/ : upload a new image
     * @param image to be uploaded which is multipart file
     * @return responsebody with 200.
     */
    @PostMapping("/images/platform")
    public ResponseEntity<Resource> handlePlatformUpload(@RequestParam("image") MultipartFile file, @RequestParam("name") String name) {
        imagePlatformService.store(file, name);
        return ResponseEntity.ok().build();
    }

    /**
     * GET /images/platform : get all platforms
     * @return
     */
    @GetMapping("/images/platform")
    public ResponseEntity<List<ImagePlatform>> listUploadedPlatforms(Pageable pageable) {
        log.debug("REST request to get a page of ImageSupplies");
        Page<ImagePlatform> page = imagePlatformService.loadAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "api/images/supplies");
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * GET /images/platform : reindex all platforms
     * @return
     */
    @GetMapping("/images/platform/reindex")
    public ResponseEntity<Void> reindexPlatforms() {
        log.debug("REST request to reindex ImagePlatforms");
        imagePlatformService.reindex();;
        return ResponseEntity.ok().build();
    }

    @GetMapping("/images/_search/platform")
    public ResponseEntity<List<ImagePlatform>> searchPlatforms(@RequestParam String query, Pageable pageable) {
        log.debug("REST request to get a page of ImageSupplies");
        Page<ImagePlatform> page = imagePlatformService.search(pageable, query);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "api/images/platform");
        return ResponseEntity.ok().headers(headers).body(page.getContent());
}

    /************************************* Plain Images Upload Mapping *******************************************/


    /**
     * DELETE /images/:filename delete image with name :filename.
     */
    @DeleteMapping("/images/{filename:.+}")
    public ResponseEntity<Void> deleteFile(@PathVariable String filename) throws IOException {
        log.debug("Request to delete image: {}", filename);
        storageService.delete(filename);
        return ResponseEntity.ok().build();
    }


    /**
     * GET /images/:filename get image with name :filename.
     */
    @GetMapping("/images/{filename:.+}")
    public ResponseEntity<Resource> serveFile(@PathVariable String filename) {

        Resource file = storageService.loadAsResource(filename);
        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "inline; filename=\"" + file.getFilename() + "\"")
                // .header(HttpHeaders.CONTENT_TYPE, "application/pdf")
                .body(file);
    }

    /**
     * POST /api/images/ : upload a new image
     * @param image to be uploaded which is multipart file
     * @return responsebody with 200.
     */
    @PostMapping("/images")
    public ResponseEntity<Resource> handleFileUpload(@RequestParam("image") MultipartFile file) {
        storageService.store(file);
        return ResponseEntity.ok().build();
    }

    /**
     * return the list of images.
     */
    @GetMapping("/images")
    public List<Image> listUploadedImages() {
        List<Image> images =  storageService.loadAll()
                .map(path -> new Image(path.toString(), MvcUriComponentsBuilder
                .fromMethodName(ImageUploadController.class, "serveFile", path.getFileName().toString()).build()
                .toString()) )
                .collect(Collectors.toList());
        return images;
    }

    @ExceptionHandler(StorageFileNotFoundException.class)
    public ResponseEntity<?> handleStorageFileNotFound(StorageFileNotFoundException exc) {
        return ResponseEntity.notFound().build();
    }

}
