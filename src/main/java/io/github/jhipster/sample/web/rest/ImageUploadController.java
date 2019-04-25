package io.github.jhipster.sample.web.rest;

import java.nio.file.Path;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.Stream;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
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

import io.github.jhipster.sample.service.StorageService;
import io.github.jhipster.sample.web.rest.errors.StorageFileNotFoundException;

/**
 * ImageUploadController
 */
@RestController
@RequestMapping("/api")
public class ImageUploadController {

    private final StorageService imageService;

    @Autowired
    public ImageUploadController(StorageService imageService) {
        this.imageService = imageService;
    }

    @GetMapping("/images")
    @ResponseBody
    public  List<String> listUploadedImages(Model model) {

        // model.addAttribute("images", imageService.loadAll().map(
        //         path -> MvcUriComponentsBuilder.fromMethodName(ImageUploadController.class,
        //                 "serveFile", path.getFileName().toString()).build().toString())
        //         .collect(Collectors.toList()));
        return imageService.loadAll().map(
            path -> MvcUriComponentsBuilder.fromMethodName(ImageUploadController.class,
                    "serveImage", path.getFileName().toString()).build().toString())
            .collect(Collectors.toList());
    }

    /**
     *
     * @param filename
     * @return
     */
    @GetMapping("/images/{filename:.+}")
    @ResponseBody
    public ResponseEntity<Resource> serveImage(@PathVariable String filename) {

        Resource file = imageService.loadAsResource(filename);
        return ResponseEntity.ok().header(HttpHeaders.CONTENT_DISPOSITION,
                "attachment; filename=\"" + file.getFilename() + "\"").body(file);
    }

    @PostMapping("/images")
    public String handleImageUpload(@RequestParam("file") MultipartFile image,
            RedirectAttributes redirectAttributes) {

        imageService.store(image);
        redirectAttributes.addFlashAttribute("message",
                "You successfully uploaded " + image.getOriginalFilename() + "!");

        return "redirect:/";
    }

    // @GetMapping("/test")
    // @ResponseBody
    // public String test() {
    //     return "Hello World";
    // }


    @ExceptionHandler(StorageFileNotFoundException.class)
    public ResponseEntity<?> handleStorageFileNotFound(StorageFileNotFoundException exc) {
        return ResponseEntity.notFound().build();
    }

}
