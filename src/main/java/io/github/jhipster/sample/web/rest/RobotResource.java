package io.github.jhipster.sample.web.rest;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;

import javax.validation.Valid;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import io.github.jhipster.sample.domain.Robot;
import io.github.jhipster.sample.repository.RobotRepository;
import io.github.jhipster.sample.web.rest.errors.BadRequestAlertException;
import io.github.jhipster.sample.web.rest.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;

/**
 * REST controller for managing Robot.
 */
@RestController
@RequestMapping("/api/robots")
public class RobotResource {

    private final Logger log = LoggerFactory.getLogger(RobotResource.class);

    private static final String ENTITY_NAME = "robot";

    private final RobotRepository robotRepository;


    public RobotResource(RobotRepository robotRepository) {
        this.robotRepository = robotRepository;
    }

    /**
     * POST  /robots : Create a new robot.
     *
     * @param robot the robot to create
     * @return the ResponseEntity with status 201 (Created) and with body the new robot, or with status 400 (Bad Request) if the robot has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("")
    public ResponseEntity<Robot> createRobot(@Valid @RequestBody Robot robot) throws URISyntaxException {
        log.debug("REST request to save Robot : {}", robot);
        if (robot.getId() != null) {
            throw new BadRequestAlertException("A new robot cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Robot result = robotRepository.save(robot);
        return ResponseEntity.created(new URI("/api/robots/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /robots : Updates an existing robot.
     *
     * @param robot the robot to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated robot,
     * or with status 400 (Bad Request) if the robot is not valid,
     * or with status 500 (Internal Server Error) if the robot couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("")
    public ResponseEntity<Robot> updateRobot(@Valid @RequestBody Robot robot) throws URISyntaxException {
        log.debug("REST request to update Robot : {}", robot);
        if (robot.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Robot result = robotRepository.save(robot);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, robot.getId().toString()))
            .body(result);
    }

    /**
     * GET  /robots : get all the robots.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of robots in body
     */
    @GetMapping("")
    public List<Robot> getAllRobots() {
        log.debug("REST request to get all Robots");
        return robotRepository.findAll();
    }

    /**
     * GET  /robots/:id : get the "id" robot.
     *
     * @param id the id of the robot to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the robot, or with status 404 (Not Found)
     */
    @GetMapping("/{id}")
    public ResponseEntity<Robot> getRobot(@PathVariable Long id) {
        log.debug("REST request to get Robot : {}", id);
        Optional<Robot> robot = robotRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(robot);
    }

    /**
     * DELETE  /robots/:id : delete the "id" robot.
     *
     * @param id the id of the robot to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteRobot(@PathVariable Long id) {
        log.debug("REST request to delete Robot : {}", id);
        robotRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }

}
