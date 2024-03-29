package org.axway.grapes.server.webapp.resources;


import com.sun.jersey.api.client.ClientResponse;
import com.sun.jersey.api.client.WebResource;
import com.yammer.dropwizard.testing.ResourceTest;
import com.yammer.dropwizard.views.ViewMessageBodyWriter;
import org.axway.grapes.commons.api.ServerAPI;
import org.axway.grapes.server.config.CommunityConfig;
import org.axway.grapes.server.config.GrapesServerConfig;
import org.axway.grapes.server.db.RepositoryHandler;
import org.axway.grapes.server.db.datamodel.DbModule;
import org.eclipse.jetty.http.HttpStatus;
import org.junit.Assert;
import org.junit.Test;

import javax.ws.rs.core.MediaType;
import java.net.UnknownHostException;

import static junit.framework.TestCase.assertEquals;
import static junit.framework.TestCase.assertNull;
import static org.junit.Assert.assertNotNull;
import static org.mockito.Matchers.anyString;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

public class WebAppResourcesTest extends ResourceTest {

    private RepositoryHandler repositoryHandler;


    @Override
    protected void setUpResources() throws Exception {
        repositoryHandler = mock(RepositoryHandler.class);
        WebAppResource resource = new WebAppResource(repositoryHandler, mock(GrapesServerConfig.class));
        addProvider(ViewMessageBodyWriter.class);
        addResource(resource);
    }

    @Test
    public void getMainPage() throws UnknownHostException {
        when(repositoryHandler.getModule(anyString())).thenReturn(new DbModule());
        WebResource resource = client().resource("/" + ServerAPI.WEBAPP_RESOURCE);
        ClientResponse response = resource.accept(MediaType.TEXT_HTML).get(ClientResponse.class);
        assertNotNull(response);
        Assert.assertEquals(HttpStatus.OK_200, response.getStatus());
    }

    @Test
    public void checkConfiguration(){
        final CommunityConfig communityConfiguration = new CommunityConfig();
        communityConfiguration.setIssueTracker("issueTracker");
        communityConfiguration.setOnlineHelp("onlineHelp");

        final GrapesServerConfig config = mock(GrapesServerConfig.class);
        when(config.getCommunityConfiguration()).thenReturn(communityConfiguration);
        final WebAppResource resource = new WebAppResource(null, config);

        assertEquals("issueTracker", resource.getIssueTrackerUrl());
        assertEquals("onlineHelp", resource.getOnlineDocumentation());
    }

    @Test
    public void checkEmptyConfiguration(){
        final GrapesServerConfig config = mock(GrapesServerConfig.class);
        final WebAppResource resource = new WebAppResource(null, config);

        assertNull(resource.getIssueTrackerUrl());
        assertNull(resource.getOnlineDocumentation());
    }
}
