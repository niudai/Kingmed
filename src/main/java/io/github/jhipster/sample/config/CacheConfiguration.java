package io.github.jhipster.sample.config;

import java.time.Duration;

import org.ehcache.config.builders.CacheConfigurationBuilder;
import org.ehcache.config.builders.ExpiryPolicyBuilder;
import org.ehcache.config.builders.ResourcePoolsBuilder;
import org.ehcache.jsr107.Eh107Configuration;
import org.springframework.boot.autoconfigure.cache.JCacheManagerCustomizer;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import io.github.jhipster.config.JHipsterProperties;
import io.github.jhipster.config.jcache.BeanClassLoaderAwareJCacheRegionFactory;

@Configuration
@EnableCaching
public class CacheConfiguration {

    private final javax.cache.configuration.Configuration<Object, Object> jcacheConfiguration;

    public CacheConfiguration(JHipsterProperties jHipsterProperties) {
        BeanClassLoaderAwareJCacheRegionFactory.setBeanClassLoader(this.getClass().getClassLoader());
        JHipsterProperties.Cache.Ehcache ehcache =
            jHipsterProperties.getCache().getEhcache();

        jcacheConfiguration = Eh107Configuration.fromEhcacheCacheConfiguration(
            CacheConfigurationBuilder.newCacheConfigurationBuilder(Object.class, Object.class,
                ResourcePoolsBuilder.heap(ehcache.getMaxEntries()))
                .withExpiry(ExpiryPolicyBuilder.timeToLiveExpiration(Duration.ofSeconds(ehcache.getTimeToLiveSeconds())))
                .build());
    }

    @Bean
    public JCacheManagerCustomizer cacheManagerCustomizer() {
        return cm -> {
            cm.createCache(io.github.jhipster.sample.repository.UserRepository.USERS_BY_LOGIN_CACHE, jcacheConfiguration);
            cm.createCache(io.github.jhipster.sample.repository.UserRepository.USERS_BY_EMAIL_CACHE, jcacheConfiguration);
            cm.createCache(io.github.jhipster.sample.domain.User.class.getName(), jcacheConfiguration);
            cm.createCache(io.github.jhipster.sample.domain.Authority.class.getName(), jcacheConfiguration);
            cm.createCache(io.github.jhipster.sample.domain.User.class.getName() + ".authorities", jcacheConfiguration);
            cm.createCache(io.github.jhipster.sample.domain.User.class.getName() + ".diseaseXiAns", jcacheConfiguration);
            cm.createCache(io.github.jhipster.sample.domain.QArobot.class.getName(), jcacheConfiguration);
            cm.createCache(io.github.jhipster.sample.domain.Prices.class.getName(), jcacheConfiguration);
            cm.createCache(io.github.jhipster.sample.domain.DiseaseXiAn.class.getName(), jcacheConfiguration);
            cm.createCache(io.github.jhipster.sample.domain.PriceXiAn.class.getName(), jcacheConfiguration);
            cm.createCache(io.github.jhipster.sample.domain.DiseaseBranch.class.getName(), jcacheConfiguration);
            cm.createCache(io.github.jhipster.sample.domain.DiseaseMap.class.getName(), jcacheConfiguration);
            cm.createCache(io.github.jhipster.sample.domain.LinkCard.class.getName(), jcacheConfiguration);
            cm.createCache(io.github.jhipster.sample.domain.Subsidiary.class.getName(), jcacheConfiguration);
            cm.createCache(io.github.jhipster.sample.domain.Concourse.class.getName(), jcacheConfiguration);
            cm.createCache(io.github.jhipster.sample.domain.DiseasePartition.class.getName(), jcacheConfiguration);
            // jhipster-needle-ehcache-add-entry
        };
    }
}
