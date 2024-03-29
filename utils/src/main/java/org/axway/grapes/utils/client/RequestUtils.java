package org.axway.grapes.utils.client;

import org.axway.grapes.commons.api.ServerAPI;

/**
 * Request Utils
 * 
 * <p>Handles the build of the request path to a Grapes server</p>
 * 
 * @author jdcoffre
 */
public final class RequestUtils {

	private RequestUtils() {
		// no constructor for utility classes
	}

	public static String moduleResourcePath() {
		final StringBuilder path = new StringBuilder();
		path.append(ServerAPI.MODULE_RESOURCE);
		return path.toString();
	}

	public static String artifactResourcePath() {
		final StringBuilder path = new StringBuilder();
		path.append(ServerAPI.ARTIFACT_RESOURCE);
		return path.toString();
	}

	public static String licenseResourcePath() {
		final StringBuilder path = new StringBuilder();
		path.append(ServerAPI.LICENSE_RESOURCE);
		return path.toString();
	}
	
	public static String getModulePath(final String name, final String version) {
		final StringBuilder path = new StringBuilder();
		path.append(moduleResourcePath());
		path.append("/");
		path.append(name);
		path.append("/");
		path.append(version);
		
		return path.toString();
	}
	
	public static String getArtifactPath(final String gavc) {
		final StringBuilder path = new StringBuilder();
		path.append(artifactResourcePath());
		path.append("/");
		path.append(gavc);
		
		return path.toString();
	}
	
	public static String getLicensePath(final String licenseId) {
		final StringBuilder path = new StringBuilder();
		path.append(licenseResourcePath());
		path.append("/");
		path.append(licenseId);
		
		return path.toString();
	}

	public static String promoteModulePath(final String name, final String version) {
		final StringBuilder path = new StringBuilder();
		path.append(getModulePath(name, version));
		path.append(ServerAPI.PROMOTION);
		
		return path.toString();
	}

	public static String canBePromotedModulePath(final String name, final String version) {
		final StringBuilder path = new StringBuilder();
		path.append(getModulePath(name, version));
        path.append(ServerAPI.PROMOTION);
        path.append(ServerAPI.GET_FEASIBLE);
		
		return path.toString();
	}

	public static String getArtifactLicensesPath(final String gavc) {
		final StringBuilder path = new StringBuilder();
		path.append(getArtifactPath(gavc));
		path.append(ServerAPI.GET_LICENSES);
		
		return path.toString();
	}

	public static String getArtifactAncestors(final String name, final String version) {
		final StringBuilder path = new StringBuilder();
		path.append(getModulePath(name, version));
		path.append(ServerAPI.GET_ANCESTORS);
		
		return path.toString();
	}

	public static String getArtifactDependencies(final String name, final String version) {
		final StringBuilder path = new StringBuilder();
		path.append(getModulePath(name, version));
		path.append(ServerAPI.GET_DEPENDENCIES);
		
		return path.toString();
	}

    public static String getArtifactsPath() {
        final StringBuilder path = new StringBuilder();
        path.append(artifactResourcePath());
        path.append(ServerAPI.GET_ALL);

        return path.toString();
    }

    public static String getDoNotUseArtifact(final String gavc) {
        final StringBuilder path = new StringBuilder();
        path.append(artifactResourcePath());
        path.append("/");
        path.append(gavc);
        path.append(ServerAPI.SET_DO_NOT_USE);

        return path.toString();
    }

}
