package io.github.jhipster.sample.web.rest.errors;

public class StorageException extends RuntimeException {

    private static final long serialVersionUID = -6961619505714299220L;

    public StorageException(String message) {
        super(message);
    }

    public StorageException(String message, Throwable cause) {
        super(message, cause);
    }
}
