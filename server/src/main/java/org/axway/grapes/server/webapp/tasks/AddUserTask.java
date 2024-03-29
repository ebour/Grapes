package org.axway.grapes.server.webapp.tasks;

import com.google.common.collect.ImmutableMultimap;
import com.yammer.dropwizard.auth.AuthenticationException;
import com.yammer.dropwizard.tasks.Task;
import org.axway.grapes.commons.api.ServerAPI;
import org.axway.grapes.server.config.GrapesServerConfig;
import org.axway.grapes.server.db.RepositoryHandler;
import org.axway.grapes.server.db.datamodel.DbCredential;
import org.axway.grapes.server.webapp.auth.CredentialManager;

import java.io.PrintWriter;

/**
 * Add User Task
 * 
 * <p>At runtime, this task is able to add credentials to Grapes.
 * To add a user: POST <host>:<adminPort>/addUser?user=<user>&password=<password> <p>
 * 
 * @author jdcoffre
 */
public class AddUserTask extends Task{

	private final GrapesServerConfig config;
	private final RepositoryHandler repoHandler;

	public AddUserTask(final RepositoryHandler repoHandler, final GrapesServerConfig config) {
		super("addUser");
		this.repoHandler = repoHandler;
		this.config = config;
	}

	@Override
	public void execute(final ImmutableMultimap<String, String> args, final PrintWriter printer) throws AuthenticationException {
		printer.println("Adding/update credentials ...");
        final DbCredential credential = new DbCredential();
		credential.setUser(args.get(ServerAPI.USER_PARAM).asList().get(0));
		credential.setPassword(CredentialManager.encrypt(args.get(ServerAPI.PASSWORD_PARAM).asList().get(0)));
        
        if(!credential.isHealthy()){
            printer.println("ERROR: Bad request! The provided credential are unhealthy or incomplete.");
            return;
        }
        
		repoHandler.store(credential);

        config.loadCredentials(repoHandler);

		printer.println("Task performed successfully.");
	}

}