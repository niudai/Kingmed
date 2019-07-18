
package io.github.jhipster.sample.domain;

import java.io.Serializable;
import java.util.Objects;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.validation.constraints.Size;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;
import org.springframework.data.elasticsearch.annotations.Document;

/**
 * Robot which stores webhook url.
 */
@Entity
@Table(name = "robot")
public class Robot implements Serializable {
    private static final long serialVersionUID = 2L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Size(max = 200)
    @Column(name = "webhook_url", length = 200)
    private String webhookUrl;

    @Size(max = 30)
    @Column(name = "robot_name", length = 30)
    private String robotName;

    public static long getSerialversionuid() {
        return serialVersionUID;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getWebhookUrl() {
        return webhookUrl;
    }

    public void setWebhookUrl(String webhookUrl) {
        this.webhookUrl = webhookUrl;
    }

    public String getRobotName() {
        return robotName;
    }

    public void setRobotName(String robotName) {
        this.robotName = robotName;
    }

    @Override
    public String toString() {
        return "Robot [id=" + id + ", robotName=" + robotName + ", webhookUrl=" + webhookUrl + "]";
    }

    @Override
    public int hashCode() {
        final int prime = 31;
        int result = 1;
        result = prime * result + ((id == null) ? 0 : id.hashCode());
        result = prime * result + ((robotName == null) ? 0 : robotName.hashCode());
        result = prime * result + ((webhookUrl == null) ? 0 : webhookUrl.hashCode());
        return result;
    }

    @Override
    public boolean equals(Object obj) {
        if (this == obj)
            return true;
        if (obj == null)
            return false;
        if (getClass() != obj.getClass())
            return false;
        Robot other = (Robot) obj;
        if (id == null) {
            if (other.id != null)
                return false;
        } else if (!id.equals(other.id))
            return false;
        if (robotName == null) {
            if (other.robotName != null)
                return false;
        } else if (!robotName.equals(other.robotName))
            return false;
        if (webhookUrl == null) {
            if (other.webhookUrl != null)
                return false;
        } else if (!webhookUrl.equals(other.webhookUrl))
            return false;
        return true;
    }

}
