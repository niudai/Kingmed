package io.github.jhipster.sample.web.rest;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;

import javax.validation.Valid;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import io.github.jhipster.sample.config.Constants;
import io.github.jhipster.sample.domain.DiseaseBranch;
import io.github.jhipster.sample.domain.DiseaseMap;
import io.github.jhipster.sample.domain.DiseaseXiAn;
import io.github.jhipster.sample.domain.User;
import io.github.jhipster.sample.repository.UserRepository;
import io.github.jhipster.sample.security.AuthoritiesConstants;
import io.github.jhipster.sample.service.MailService;
import io.github.jhipster.sample.service.UserService;
import io.github.jhipster.sample.service.dto.UserDTO;
import io.github.jhipster.sample.web.rest.errors.BadRequestAlertException;
import io.github.jhipster.sample.web.rest.errors.EmailAlreadyUsedException;
import io.github.jhipster.sample.web.rest.errors.LoginAlreadyUsedException;
import io.github.jhipster.sample.web.rest.searchdto.UserSearchDTO;
import io.github.jhipster.sample.web.rest.util.HeaderUtil;
import io.github.jhipster.sample.web.rest.util.PaginationUtil;
import io.github.jhipster.web.util.ResponseUtil;

/**
 * REST controller for managing users.
 * <p>
 * This class accesses the User entity, and needs to fetch its collection of authorities.
 * <p>
 * For a normal use-case, it would be better to have an eager relationship between User and Authority,
 * and send everything to the client side: there would be no View Model and DTO, a lot less code, and an outer-join
 * which would be good for performance.
 * <p>
 * We use a View Model and a DTO for 3 reasons:
 * <ul>
 * <li>We want to keep a lazy association between the user and the authorities, because people will
 * quite often do relationships with the user, and we don't want them to get the authorities all
 * the time for nothing (for performance reasons). This is the #1 goal: we should not impact our users'
 * application because of this use-case.</li>
 * <li> Not having an outer join causes n+1 requests to the database. This is not a real issue as
 * we have by default a second-level cache. This means on the first HTTP call we do the n+1 requests,
 * but then all authorities come from the cache, so in fact it's much better than doing an outer join
 * (which will get lots of data from the database, for each HTTP call).</li>
 * <li> As this manages users, for security reasons, we'd rather have a DTO layer.</li>
 * </ul>
 * <p>
 * Another option would be to have a specific JPA entity graph to handle this case.
 */
@RestController
@RequestMapping("/api")
public class UserResource {

    private final Logger log = LoggerFactory.getLogger(UserResource.class);

    private final UserService userService;

    private final UserRepository userRepository;

    private final MailService mailService;

    public UserResource(UserService userService, UserRepository userRepository, MailService mailService) {
        this.userService = userService;
        this.userRepository = userRepository;
        this.mailService = mailService;
    }

    /**
     * POST  /users  : Creates a new user.
     * <p>
     * Creates a new user if the login and email are not already used, and sends an
     * mail with an activation link.
     * The user needs to be activated on creation.
     *
     * @param userDTO the user to create
     * @return the ResponseEntity with status 201 (Created) and with body the new user, or with status 400 (Bad Request) if the login or email is already in use
     * @throws URISyntaxException if the Location URI syntax is incorrect
     * @throws BadRequestAlertException 400 (Bad Request) if the login or email is already in use
     */
    @PostMapping("/users")
    @PreAuthorize("hasRole(\"" + AuthoritiesConstants.ADMIN + "\")")
    public ResponseEntity<User> createUser(@Valid @RequestBody UserDTO userDTO) throws URISyntaxException {
        log.debug("REST request to save User : {}", userDTO);

        if (userDTO.getId() != null) {
            throw new BadRequestAlertException("A new user cannot already have an ID", "userManagement", "idexists");
            // Lowercase the user login before comparing with database
        } else if (userRepository.findOneByLogin(userDTO.getLogin().toLowerCase()).isPresent()) {
            throw new LoginAlreadyUsedException();
        } else if (userRepository.findOneByEmailIgnoreCase(userDTO.getEmail()).isPresent()) {
            throw new EmailAlreadyUsedException();
        } else {
            User newUser = userService.createUser(userDTO);
            mailService.sendCreationEmail(newUser);
            return ResponseEntity.created(new URI("/api/users/" + newUser.getLogin()))
                .headers(HeaderUtil.createAlert( "userManagement.created", newUser.getLogin()))
                .body(newUser);
        }
    }

    /**
     * PUT /users : Updates an existing User.
     *
     * @param userDTO the user to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated user
     * @throws EmailAlreadyUsedException 400 (Bad Request) if the email is already in use
     * @throws LoginAlreadyUsedException 400 (Bad Request) if the login is already in use
     */
    @PutMapping("/users")
    @PreAuthorize("hasRole(\"" + AuthoritiesConstants.ADMIN + "\")")
    public ResponseEntity<UserDTO> updateUser(@Valid @RequestBody UserDTO userDTO) {
        log.debug("REST request to update User : {}", userDTO);
        Optional<User> existingUser = userRepository.findOneByEmailIgnoreCase(userDTO.getEmail());
        if (existingUser.isPresent() && (!existingUser.get().getId().equals(userDTO.getId()))) {
            throw new EmailAlreadyUsedException();
        }
        existingUser = userRepository.findOneByLogin(userDTO.getLogin().toLowerCase());
        if (existingUser.isPresent() && (!existingUser.get().getId().equals(userDTO.getId()))) {
            throw new LoginAlreadyUsedException();
        }
        Optional<UserDTO> updatedUser = userService.updateUser(userDTO);

        return ResponseUtil.wrapOrNotFound(updatedUser,
            HeaderUtil.createAlert("userManagement.updated", userDTO.getLogin()));
    }

    /**
     * GET /users : get all users.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and with body all users
     */
    @GetMapping("/users")
    public ResponseEntity<List<UserDTO>> getAllUsers(Pageable pageable) {
        final Page<UserDTO> page = userService.getAllManagedUsers(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/users");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * @return a string list of the all of the roles
     */
    @GetMapping("/users/authorities")
    // @PreAuthorize("hasRole(\"" + AuthoritiesConstants.ADMIN + "\")")
    public List<String> getAuthorities() {
        return userService.getAuthorities();
    }

    /**
     * GET /users/:login : get the "login" user.
     *
     * @param login the login of the user to find
     * @return the ResponseEntity with status 200 (OK) and with body the "login" user, or with status 404 (Not Found)
     */
    @GetMapping("/users/{login:" + Constants.LOGIN_REGEX + "}")
    public ResponseEntity<UserDTO> getUser(@PathVariable String login) {
        log.debug("REST request to get User : {}", login);
        return ResponseUtil.wrapOrNotFound(
            userService.getUserWithAuthoritiesByLogin(login)
                .map(UserDTO::new));
    }

    /**
     * GET /users/:login : get the "login" user.
     *
     * @param login the login of the user to find
     * @return the ResponseEntity with status 200 (OK) and with body the "login" user, or with status 404 (Not Found)
     */
    @GetMapping("/users/{login:" + Constants.LOGIN_REGEX + "}" + "/diseases")
    public ResponseEntity<List<DiseaseXiAn>> getUserDiseases(@PathVariable String login, Pageable pageable) {
        Page<DiseaseXiAn> diseases = userService.getDiseases(login, pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(diseases, "users/{login}/diseases");
        return ResponseEntity.ok().headers(headers).body(diseases.getContent());
    }

    /**
     * POST /users/:login : post new disease to user.
     *
     * @param login the login of the user to find
     * @return the ResponseEntity with status 200 (OK) or with status 404 (Not Found)
     */
    @PostMapping("/users/{login:" + Constants.LOGIN_REGEX + "}" + "/diseases")
    public ResponseEntity<Void> postUserDiseases(@PathVariable String login, @Valid @RequestBody DiseaseXiAn disease) {
        userService.postDiseases(login, disease);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/users/{login:" + Constants.LOGIN_REGEX + "}" + "/disease-maps")
    public ResponseEntity<List<DiseaseMap>> getUserDiseaseMaps(@PathVariable String login) {
        List<DiseaseMap> diseaseMaps = userService.getDiseaseMaps(login);
        return ResponseEntity.ok().body(diseaseMaps);
    }

    @PostMapping("/users/{login:" + Constants.LOGIN_REGEX + "}" + "/diseases-maps/{diseaseMapId}")
    public ResponseEntity<Void> postUserDiseaseMapToDiseaseMap(@PathVariable String login, @Valid @RequestBody DiseaseMap map, @PathVariable Long diseaseMapId) {
        userService.postDiseaseMapToDiseaseMap(login, map, diseaseMapId);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/users/{login:" + Constants.LOGIN_REGEX + "}" + "/disease-branches/{diseaseBranchId}/disease-maps")
    public ResponseEntity<Void> postUserDiseaseMapToDiseaseBranch(@PathVariable String login, @Valid @RequestBody DiseaseMap map, @PathVariable Long diseaseBranchId) {
        userService.postDiseaseMapToDiseaseBranch(login, map, diseaseBranchId);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/users/{login:" + Constants.LOGIN_REGEX + "}" + "/disease-branches")
    public ResponseEntity<List<DiseaseBranch>> getUserDiseaseBranches(@PathVariable String login) {
        List<DiseaseBranch> branches = userService.getDiseaseBranches(login);
        return ResponseEntity.ok().body(branches);
    }

    @PostMapping("/users/{login:" + Constants.LOGIN_REGEX + "}" + "/disease-branches")
    public ResponseEntity<Void> postUserDiseaseBranch(@PathVariable String login, @Valid @RequestBody DiseaseBranch branch, @PathVariable Long diseaseMapId) {
        userService.postDiseaseBranch(login, branch);
        return ResponseEntity.ok().build();
    }

    /**
     * DELETE /users/:login : delete new disease to user.
     *
     * @param login the login of the user to find
     * @return the ResponseEntity with status 200 (OK) or with status 404 (Not Found)
     */
    @DeleteMapping("/users/{login:" + Constants.LOGIN_REGEX + "}" + "/diseases/{diseaseId}")
    public ResponseEntity<Void> deleteUserDiseases(@PathVariable String login, @PathVariable Long diseaseId) {
        userService.deleteDiseases(login, diseaseId);
        return ResponseEntity.ok().build();
    }

    /**
     * DELETE /users/:login : delete the "login" User.
     *
     * @param login the login of the user to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/users/{login:" + Constants.LOGIN_REGEX + "}")
    @PreAuthorize("hasRole(\"" + AuthoritiesConstants.ADMIN + "\")")
    public ResponseEntity<Void> deleteUser(@PathVariable String login) {
        log.debug("REST request to delete User: {}", login);
        userService.deleteUser(login);
        return ResponseEntity.ok().headers(HeaderUtil.createAlert( "userManagement.deleted", login)).build();
    }

    /**
     * SEARCH /_search/users/:query : search for the User corresponding
     * to the query.
     *
     * @param dto the query to search
     * @return the result of the search
     */
    @GetMapping("/_search/users")
    public ResponseEntity<List<User>> search(UserSearchDTO dto, Pageable pageable) {
        log.debug("REST request to search for a page of Users for query {}", dto);


        Page<User> page = userService.search(dto , pageable);

        HttpHeaders headers = PaginationUtil.generateSearchPaginationHttpHeaders(dto.toString(), page, "/api/_search/users");
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }
}
