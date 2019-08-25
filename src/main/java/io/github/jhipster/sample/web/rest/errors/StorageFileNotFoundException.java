package io.github.jhipster.sample.web.rest.errors;

public class StorageFileNotFoundException extends StorageException {

    private static final long serialVersionUID = -7971237014606166448L;

    public StorageFileNotFoundException(String message) {
        super(message);
    }

    public StorageFileNotFoundException(String message, Throwable cause) {
        super(message, cause);
    }
}
