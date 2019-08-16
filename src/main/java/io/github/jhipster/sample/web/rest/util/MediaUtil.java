package io.github.jhipster.sample.web.rest.util;

import org.springframework.http.HttpHeaders;

import io.github.jhipster.sample.domain.abstractDomain.MediaFile;

public class MediaUtil {

    public static HttpHeaders genearteMediaHeaders(MediaFile media) {
        HttpHeaders headers = new HttpHeaders();
        String path = media.getPath();
        String extension = path.substring(path.indexOf('.')+1);
        if (extension == "pdf") {
            headers.add(HttpHeaders.CONTENT_TYPE, "application/pdf");
        } else {
            headers.add(HttpHeaders.CONTENT_TYPE, "image/" + extension);
        }
        headers.add(HttpHeaders.CONTENT_DISPOSITION, "inline; filename:\"" + media.getPath() + "\"");
        return headers;
    }
}
