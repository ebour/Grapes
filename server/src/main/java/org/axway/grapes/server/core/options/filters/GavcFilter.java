package org.axway.grapes.server.core.options.filters;

import org.axway.grapes.server.db.datamodel.DbArtifact;

import java.util.HashMap;
import java.util.Map;

public class GavcFilter implements Filter {

    private String gavc;

    /**
     * The parameter must never be null
     *
     * @param gavc
     */
    public GavcFilter(final String gavc) {
        this.gavc = gavc;
    }

    @Override
    public boolean filter(final Object datamodelObj) {
        if(datamodelObj instanceof DbArtifact){
            return gavc.equals( ((DbArtifact)datamodelObj).getGavc());
        }

        return false;
    }

    @Override
    public Map<String, Object> moduleFilterFields() {
        return new HashMap<String, Object>();
    }

    @Override
    public Map<String, Object> artifactFilterFields() {
        final Map<String, Object> fields = new HashMap<String, Object>();
        fields.put(DbArtifact.GAV_DB_FIELD, gavc);
        return fields;
    }
}
