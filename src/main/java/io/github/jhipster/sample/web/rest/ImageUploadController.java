package io.github.jhipster.sample.web.rest;

import java.io.IOException;
import java.nio.file.Path;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;
import java.util.stream.Stream;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.mvc.method.annotation.MvcUriComponentsBuilder;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import io.github.jhipster.sample.domain.Image;
import io.github.jhipster.sample.domain.ImageApplication;
import io.github.jhipster.sample.domain.ImagePlatform;
import io.github.jhipster.sample.service.StorageService;
import io.github.jhipster.sample.service.image.ImageApplicationService;
import io.github.jhipster.sample.service.image.ImageService;
import io.github.jhipster.sample.web.rest.errors.StorageFileNotFoundException;

/**
 * ImageUploadController
 */
@RestController
@RequestMapping("/api")
public class ImageUploadController {

    private final Logger log = LoggerFactory.getLogger(ImageUploadController.class);

    private final ImageService storageService;

    private final ImageApplicationService imageApplicationService;

    @Autowired
    public ImageUploadController(ImageService storageService
        , ImageApplicationService imageApplicationService) {
        this.storageService = storageService;
        this.imageApplicationService = imageApplicationService;
    }

    /*********************************** Application Files Method Mapping ************************** */

     /**
     * GET /images/:filename get image with name :filename.
     */
    @GetMapping("/images/application/{id}")
    public ResponseEntity<Resource> serveApplication(@PathVariable Long id) {

        Resource file = imageApplicationService.loadAsResource(id);
        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + file.getFilename() + "\"")
                .body(file);
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
    @GetMapping("/images/application")
    public List<ImageApplication> listUploadedApplications() {
        return imageApplicationService.loadAll();
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
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + file.getFilename() + "\"")
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
