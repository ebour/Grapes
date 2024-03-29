package org.axway.grapes.server.db.datamodel;

import com.fasterxml.jackson.annotation.JsonProperty;
import org.jongo.marshall.jackson.oid.Id;
import org.jongo.marshall.jackson.oid.ObjectId;

import java.util.ArrayList;
import java.util.List;

/**
 * Database Credential
 * 
 * <p>Class that represent Grapes credentials that are stored in the database.
 * Passwords have to be encrypted.</p>
 * 
 * @author jdcoffre
 */
public class DbCredential {

    public static final String DATA_MODEL_VERSION = "data_model_version";
    private String datamodelVersion = "1.0.0";

    /**
     * All the available role for Grapes
     */
    public static enum AvailableRoles {
        // Update dependencies data: module and artifact notification
        DEPENDENCY_NOTIFIER,
        // Update the license attribution and the third party fields "download URL" and "provider"
        DATA_UPDATER,
        // Delete artifacts modules or licenses
        DATA_DELETER,
        // Approve or reject artifacts
        ARTIFACT_CHECKER,
        // Approve or reject licenses
        LICENSE_CHECKER
    }

    @ObjectId
    private String _id;
	
	public static final String USER_FIELD = "user"; 
	private String user;
	
	public static final String PASSWORD_FIELD = "password"; 
	private String password;
	
	public static final String ROLES_FIELD = "roles";
	private List<AvailableRoles> roles = new ArrayList<AvailableRoles>();

    public void setDataModelVersion(final String newVersion){
        this.datamodelVersion = newVersion;
    }

    public String getDataModelVersion(){
        return datamodelVersion;
    }
	
	public String getId() {
		return _id;
	}

	public void setId(final String id) {
		this._id = id;
	}

	public String getUser() {
		return user;
	}
	
	public void setUser(final String user) {
		this.user = user;
	}
	
	public String getPassword() {
		return password;
	}
	
	public void setPassword(final String password) {
		this.password = password;
	}

    public List<AvailableRoles> getRoles() {
        return roles;
    }

    public void setRoles(final List<AvailableRoles> roles) {
        this.roles = roles;
    }

    public void addRole(final AvailableRoles role) {
        roles.add(role);
    }

    public void removeRole(final AvailableRoles role) {
        roles.remove(role);
    }

    public boolean isHealthy() {
        return user != null && password != null;
    }

    public static AvailableRoles getRole(final String roleParam) {
        if(AvailableRoles.LICENSE_CHECKER.toString().equalsIgnoreCase(roleParam)){
            return AvailableRoles.LICENSE_CHECKER;
        }
        if(AvailableRoles.DEPENDENCY_NOTIFIER.toString().equalsIgnoreCase(roleParam)){
            return AvailableRoles.DEPENDENCY_NOTIFIER;
        }
        if(AvailableRoles.DATA_UPDATER.toString().equalsIgnoreCase(roleParam)){
            return AvailableRoles.DATA_UPDATER;
        }
        if(AvailableRoles.DATA_DELETER.toString().equalsIgnoreCase(roleParam)){
            return AvailableRoles.DATA_DELETER;
        }
        if(AvailableRoles.ARTIFACT_CHECKER.toString().equalsIgnoreCase(roleParam)){
            return AvailableRoles.ARTIFACT_CHECKER;
        }

        return null;
    }
}
