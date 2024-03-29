package org.axway.grapes.server.core.options.filters;

import org.axway.grapes.server.db.datamodel.DbArtifact;

import java.util.HashMap;
import java.util.Map;

public class HasLicenseFilter implements Filter {

    private Boolean hasLicense;

    /**
     * The parameter must never be null
     *
     * @param hasLicense
     */
    public HasLicenseFilter(final Boolean hasLicense) {
        this.hasLicense = hasLicense;
    }

    @Override
    public boolean filter(final Object datamodelObj) {
        if(datamodelObj instanceof DbArtifact){
            return hasLicense !=(((DbArtifact)datamodelObj).getLicenses().isEmpty());
        }

        return false;
    }

    @Override
    public Map<String, Object> moduleFilterFields() {
        return new HashMap<String, Object>();
    }

    @Override
    public Map<String, Object> artifactFilterFields() {
        return new HashMap<String, Object>();
    }
}
