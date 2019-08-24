package io.github.jhipster.sample.web.rest.util;

import java.util.Arrays;
import java.util.List;

/**
 * SearchUtil
 */
public class SearchUtil {

    public static List<String> queryKeywordParser(String query) {
        return Arrays.asList(query.split(" "));
    } 
}