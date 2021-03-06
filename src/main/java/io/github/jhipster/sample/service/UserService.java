package io.github.jhipster.sample.service;

import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

import javax.persistence.EntityManager;
import javax.persistence.TypedQuery;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.cache.CacheManager;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import io.github.jhipster.sample.config.Constants;
import io.github.jhipster.sample.domain.Authority;
import io.github.jhipster.sample.domain.DiseaseBranch;
import io.github.jhipster.sample.domain.DiseaseMap;
import io.github.jhipster.sample.domain.DiseaseXiAn;
import io.github.jhipster.sample.domain.User;
import io.github.jhipster.sample.repository.AuthorityRepository;
import io.github.jhipster.sample.repository.DiseaseBranchRepository;
import io.github.jhipster.sample.repository.DiseaseMapRepository;
import io.github.jhipster.sample.repository.DiseaseXiAnRepository;
import io.github.jhipster.sample.repository.UserRepository;
import io.github.jhipster.sample.security.AuthoritiesConstants;
import io.github.jhipster.sample.security.SecurityUtils;
import io.github.jhipster.sample.service.dto.UserDTO;
import io.github.jhipster.sample.service.util.RandomUtil;
import io.github.jhipster.sample.web.rest.errors.EmailAlreadyUsedException;
import io.github.jhipster.sample.web.rest.errors.InvalidPasswordException;
import io.github.jhipster.sample.web.rest.errors.LoginAlreadyUsedException;
import io.github.jhipster.sample.web.rest.searchdto.UserSearchDTO;
import io.github.jhipster.sample.web.rest.util.SearchUtil;

/**
 * Service class for managing users.
 */
@Service
@Transactional
public class UserService {

    private final Logger log = LoggerFactory.getLogger(UserService.class);

    private final UserRepository userRepository;

    private final DiseaseXiAnRepository diseaseXiAnRepository;

    private final DiseaseMapRepository diseaseMapRepository;

    private final DiseaseBranchRepository diseaseBranchRepository;

    private final PasswordEncoder passwordEncoder;

    private final AuthorityRepository authorityRepository;

    private final CacheManager cacheManager;

    private final DiseaseXiAnService diseaseXiAnService;

    private final EntityManager entityManager;

    private final DiseaseMapService diseaseMapService;


    public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder,
            AuthorityRepository authorityRepository, CacheManager cacheManager,
            DiseaseXiAnRepository diseaseXiAnRepository,
            DiseaseXiAnService diseaseXiAnService,
            EntityManager entityManager,
            DiseaseMapRepository diseaseMapRepository,
            DiseaseBranchRepository diseaseBranchRepository,
            DiseaseMapService diseaseMapService) {
        this.entityManager = entityManager;
        this.diseaseXiAnRepository = diseaseXiAnRepository;
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.authorityRepository = authorityRepository;
        this.cacheManager = cacheManager;
        this.diseaseXiAnService = diseaseXiAnService;
        this.diseaseMapRepository = diseaseMapRepository;
        this.diseaseBranchRepository = diseaseBranchRepository;
        this.diseaseMapService = diseaseMapService;
    }

    public Optional<User> activateRegistration(String key) {
        log.debug("Activating user for activation key {}", key);
        return userRepository.findOneByActivationKey(key).map(user -> {
            // activate given user for the registration key.
            user.setActivated(true);
            user.setActivationKey(null);
            this.clearUserCaches(user);
            log.debug("Activated user: {}", user);
            return user;
        });
    }

    public Optional<User> completePasswordReset(String newPassword, String key) {
        log.debug("Reset user password for reset key {}", key);
        return userRepository.findOneByResetKey(key)
                .filter(user -> user.getResetDate().isAfter(Instant.now().minusSeconds(86400))).map(user -> {
                    user.setPassword(passwordEncoder.encode(newPassword));
                    user.setResetKey(null);
                    user.setResetDate(null);
                    this.clearUserCaches(user);
                    return user;
                });
    }

    public Optional<User> requestPasswordReset(String mail) {
        return userRepository.findOneByEmailIgnoreCase(mail).filter(User::getActivated).map(user -> {
            user.setResetKey(RandomUtil.generateResetKey());
            user.setResetDate(Instant.now());
            this.clearUserCaches(user);
            return user;
        });
    }

    public User registerUser(UserDTO userDTO, String password) {
        userRepository.findOneByLogin(userDTO.getLogin().toLowerCase()).ifPresent(existingUser -> {
            boolean removed = removeNonActivatedUser(existingUser);
            if (!removed) {
                throw new LoginAlreadyUsedException();
            }
        });
        userRepository.findOneByEmailIgnoreCase(userDTO.getEmail()).ifPresent(existingUser -> {
            boolean removed = removeNonActivatedUser(existingUser);
            if (!removed) {
                throw new EmailAlreadyUsedException();
            }
        });
        User newUser = new User();
        String encryptedPassword = passwordEncoder.encode(password);
        newUser.setPassword(encryptedPassword);
        newUser.update(userDTO);
        // new user gets registration key
        newUser.setActivationKey(RandomUtil.generateActivationKey());
        if (userDTO.getAuthorities() == null) {
            Set<Authority> authorities = new HashSet<>();
            authorityRepository.findById(AuthoritiesConstants.USER).ifPresent(authorities::add);
            newUser.setAuthorities(authorities);
        } else {
            newUser.setAuthorities(userDTO.getAuthorities().stream().map(a -> authorityRepository.findById(a).get())
                    .collect(Collectors.toSet()));
        }
        userRepository.save(newUser);
        this.clearUserCaches(newUser);
        log.debug("Created Information for User: {}", newUser);
        return newUser;
    }

    public Page<DiseaseXiAn> getDiseases(String login, Pageable pageable) {
        return diseaseXiAnRepository.findAllByUsersLogin(login, pageable);
    }

    @Transactional
    public void postDiseases(String login, DiseaseXiAn diseaseXiAn) {
        User user = userRepository.findOneByLogin(login).get();
        if (diseaseXiAn.getId() == null) {
            DiseaseXiAn result = diseaseXiAnService.postDiseaseXiAn(diseaseXiAn);
            user.getDiseaseXiAns().add(result);
        } else {
            user.getDiseaseXiAns().add(diseaseXiAnRepository.findById(diseaseXiAn.getId()).get());
        }
    }

    public List<DiseaseMap> getDiseaseMaps(String login) {
        return diseaseMapRepository.findAllByUsersLogin(login);
    }

    public void postDiseaseMapToDiseaseBranch(String login, DiseaseMap diseaseMap, Long diseaseBranchId) {
        User user = userRepository.findOneByLogin(login).get();
        DiseaseMap result = diseaseMapService.attachDiseaseMapToDiseaseBranch(diseaseMap, diseaseBranchId);
        user.getDiseaseMaps().add(result);
    }

    public void postDiseaseMapToDiseaseMap(String login, DiseaseMap diseaseMap, Long diseaseMapId) {
        User user = userRepository.findOneByLogin(login).get();
        DiseaseMap result = diseaseMapService.attachDiseaseMapToDiseaseMap(diseaseMap, diseaseMapId);
        user.getDiseaseMaps().add(result);
    }

    public List<DiseaseBranch> getDiseaseBranches(String login) {
        return diseaseBranchRepository.findAllByUsersLogin(login);
    }


    public void postDiseaseBranch(String login, DiseaseBranch diseaseBranch) {
        User user = userRepository.findOneByLogin(login).get();
        DiseaseBranch result = diseaseMapService.attachDiseaseBranch(diseaseBranch);
        user.getDiseaseBranches().add(result);
    }

    @Transactional
    public void deleteDiseases(String login, Long diseaseXiAnId) {
        diseaseXiAnRepository.deleteById(diseaseXiAnId);
    }

    private boolean removeNonActivatedUser(User existingUser) {
        if (existingUser.getActivated()) {
            return false;
        }
        userRepository.delete(existingUser);
        userRepository.flush();
        this.clearUserCaches(existingUser);
        return true;
    }

    public User createUser(UserDTO userDTO) {
        User user = new User();
        user.setLogin(userDTO.getLogin().toLowerCase());
        user.setFirstName(userDTO.getFirstName());
        user.setLastName(userDTO.getLastName());
        user.setEmail(userDTO.getEmail().toLowerCase());
        user.setImageUrl(userDTO.getImageUrl());
        if (userDTO.getLangKey() == null) {
            user.setLangKey(Constants.DEFAULT_LANGUAGE); // default language
        } else {
            user.setLangKey(userDTO.getLangKey());
        }
        String encryptedPassword = passwordEncoder.encode(RandomUtil.generatePassword());
        user.setPassword(encryptedPassword);
        user.setResetKey(RandomUtil.generateResetKey());
        user.setResetDate(Instant.now());
        user.setActivated(true);
        if (userDTO.getAuthorities() != null) {
            Set<Authority> authorities = userDTO.getAuthorities().stream().map(authorityRepository::findById)
                    .filter(Optional::isPresent).map(Optional::get).collect(Collectors.toSet());
            user.setAuthorities(authorities);
        }
        userRepository.save(user);
        this.clearUserCaches(user);
        log.debug("Created Information for User: {}", user);
        return user;
    }

    /**
     * Update basic information (first name, last name, email, language) for the
     * current user.
     *
     * @param firstName first name of user
     * @param lastName  last name of user
     * @param email     email id of user
     * @param langKey   language key
     * @param imageUrl  image URL of user
     */
    public void updateUser(String firstName, String lastName, String email, String langKey, String imageUrl) {
        SecurityUtils.getCurrentUserLogin().flatMap(userRepository::findOneByLogin).ifPresent(user -> {
            user.setFirstName(firstName);
            user.setLastName(lastName);
            user.setEmail(email.toLowerCase());
            user.setLangKey(langKey);
            user.setImageUrl(imageUrl);
            this.clearUserCaches(user);
            log.debug("Changed Information for User: {}", user);
        });
    }

    /**
     * Update all information for a specific user, and return the modified user.
     *
     * @param userDTO user to update
     * @return updated user
     */
    public Optional<UserDTO> updateUser(UserDTO userDTO) {
        return Optional.of(userRepository.findById(userDTO.getId())).filter(Optional::isPresent).map(Optional::get)
                .map(user -> {
                    this.clearUserCaches(user);
                    user.update(userDTO);
                    Set<Authority> managedAuthorities = user.getAuthorities();
                    managedAuthorities.clear();
                    userDTO.getAuthorities().stream().map(authorityRepository::findById).filter(Optional::isPresent)
                            .map(Optional::get).forEach(managedAuthorities::add);
                    this.clearUserCaches(user);
                    log.debug("Changed Information for User: {}", user);
                    return user;
                }).map(UserDTO::new);
    }

    public void deleteUser(String login) {
        userRepository.findOneByLogin(login).ifPresent(user -> {
            userRepository.delete(user);
            this.clearUserCaches(user);
            log.debug("Deleted User: {}", user);
        });
    }

    public void changePassword(String currentClearTextPassword, String newPassword) {
        SecurityUtils.getCurrentUserLogin().flatMap(userRepository::findOneByLogin).ifPresent(user -> {
            String currentEncryptedPassword = user.getPassword();
            if (!passwordEncoder.matches(currentClearTextPassword, currentEncryptedPassword)) {
                throw new InvalidPasswordException();
            }
            String encryptedPassword = passwordEncoder.encode(newPassword);
            user.setPassword(encryptedPassword);
            this.clearUserCaches(user);
            log.debug("Changed password for User: {}", user);
        });
    }

    @Transactional(readOnly = true)
    public Page<UserDTO> getAllManagedUsers(Pageable pageable) {
        return userRepository.findAllByLoginNot(pageable, Constants.ANONYMOUS_USER).map(UserDTO::new);
    }

    @Transactional(readOnly = true)
    public Optional<User> getUserWithAuthoritiesByLogin(String login) {
        return userRepository.findOneWithAuthoritiesByLogin(login);
    }

    @Transactional(readOnly = true)
    public Optional<User> getUserWithAuthorities(Long id) {
        return userRepository.findOneWithAuthoritiesById(id);
    }

    @Transactional(readOnly = true)
    public Optional<User> getUserWithAuthorities() {
        return SecurityUtils.getCurrentUserLogin().flatMap(userRepository::findOneWithAuthoritiesByLogin);
    }

    /**
     * Not activated users should be automatically deleted after 3 days.
     * <p>
     * This is scheduled to get fired everyday, at 01:00 (am).
     */
    @Scheduled(cron = "0 0 1 * * ?")
    public void removeNotActivatedUsers() {
        userRepository.findAllByActivatedIsFalseAndCreatedDateBefore(Instant.now().minus(3, ChronoUnit.DAYS))
                .forEach(user -> {
                    log.debug("Deleting not activated user {}", user.getLogin());
                    userRepository.delete(user);
                    this.clearUserCaches(user);
                });
    }

    public Page<User> search(UserSearchDTO searchDTO, Pageable pageable) {
        CriteriaBuilder cb = entityManager.getCriteriaBuilder();
        CriteriaQuery<User> imageQuery = cb.createQuery(User.class);
        CriteriaQuery<Long> countQuery = cb.createQuery(Long.class);
        Root<User> image = imageQuery.from(User.class);
        Root<User> count = countQuery.from(User.class);

        List<Predicate> restrictions = new ArrayList<Predicate>();
        imageQuery.select(image);
        countQuery.select(cb.count(count));

        String email = searchDTO.getEmail();
        String login = searchDTO.getLogin();
        String name = searchDTO.getFirstName();

        if (email != null && email.length() > 0) {
            restrictions.clear();
            restrictions.addAll(SearchUtil.queryKeywordParser(email).stream()
                    .map(keyword -> cb.like(image.get("email"), "%" + keyword + "%")).collect(Collectors.toList()));
            restrictions.add(cb.like(image.get("email"), "%" + email + "%"));
        }

        if (login != null && login.length() > 0) {
            restrictions.clear();
            restrictions.addAll(SearchUtil.queryKeywordParser(login).stream()
                    .map(keyword -> cb.like(image.get("login"), "%" + keyword + "%")).collect(Collectors.toList()));
            restrictions.add(cb.like(image.get("login"), "%" + login + "%"));
        }

        if (name != null && name.length() > 0) {
            restrictions.clear();
            restrictions.addAll(SearchUtil.queryKeywordParser(name).stream()
                    .map(keyword -> cb.like(image.get("firstName"), "%" + keyword + "%")).collect(Collectors.toList()));
            restrictions.add(cb.like(image.get("firstName"), "%" + name + "%"));
        }

        Predicate queryPredicate = cb.and(restrictions.toArray(new Predicate[restrictions.size()]));

        imageQuery.where(queryPredicate);

        // get images satisfied with criterias
        TypedQuery<User> typedDiseaseQuery = entityManager.createQuery(imageQuery);
        typedDiseaseQuery.setFirstResult((int) pageable.getOffset());
        typedDiseaseQuery.setMaxResults((int) pageable.getPageSize());

        // get totalItems number with criterias
        TypedQuery<Long> typedCountQuery = entityManager.createQuery(countQuery);
        Long totalItems = typedCountQuery.getSingleResult();

        List<User> allDis = typedDiseaseQuery.getResultList();

        Page<User> resultPage = new PageImpl<>(allDis, pageable, totalItems);

        return resultPage;
    }

    /**
     * @return a list of all the authorities
     */
    public List<String> getAuthorities() {
        return authorityRepository.findAll().stream().map(Authority::getName).collect(Collectors.toList());
    }

    private void clearUserCaches(User user) {
        Objects.requireNonNull(cacheManager.getCache(UserRepository.USERS_BY_LOGIN_CACHE)).evict(user.getLogin());
        Objects.requireNonNull(cacheManager.getCache(UserRepository.USERS_BY_EMAIL_CACHE)).evict(user.getEmail());
    }
}
