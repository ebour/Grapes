<html>
	<head>
		<meta charset="utf-8">
		<meta name="viewport" content="width=device-width, initial-scale=1.0">
		<meta name="author" content="jdcoffre">
		<meta name="description" content="License Resource Documentation">
		
		<title>License API Documentation</title>
		
		<!-- Bootstrap -->
		<link href="/public/twitter-bootstrap-2.3.2/css/bootstrap.css" rel="stylesheet">
		<link href="/public/twitter-bootstrap-2.3.2/css/bootstrap-responsive.css" rel="stylesheet">
		<link href="/public/twitter-bootstrap-2.3.2/css/docs.css" rel="stylesheet">

        <link rel="shortcut icon" type="image/x-icon" href="assets/img/grapes_small.gif"/>

	</head>
    <body>
        <div class="row-fluid">
            <div class="navbar navbar-inverse navbar-fixed-top">
                <div class="navbar-inner">
                    <div class="container">
                        <a class="brand active" href="/">Grapes</a>
                        <div class="nav-collapse collapse">
                            <ul class="nav">
                                <li class="">
                                <a class="dropdown-toggle" data-toggle="dropdown" href="#">Documentations</a>
                                    <ul class="dropdown-menu" role="menu" aria-labelledby="drop">
                                        <#if getOnlineDocumentation()??>
                                        <li><a tabindex="-1" href="${getOnlineDocumentation()}">Online Documentation</a></li>
                                        </#if>
                                        <li><a tabindex="-1" href="/module">Module API</a></li>
                                        <li><a tabindex="-1" href="/artifact">Artifact API</a></li>
                                        <li><a tabindex="-1" href="/license">License API</a></li>
                                    </ul>
                                </li>
                                <li class="">
                                    <a href="/sequoia">Sequoïa</a>
                                </li>
                                <li class="">
                                    <a href="/webapp">Data Browser</a>
                                </li>
                                <#if getIssueTrackerUrl()??>
                                <li class="">
                                    <a href="${getIssueTrackerUrl()}">Report an issue</a>
                                </li>
                                </#if>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
		</div>
    
    	<div class="container-fluid">        
    		<h1>License Resource API Documentation</h1>
    		
    		<p>
    		<table class="table table-bordered">
				<thead>
					<tr>
						<td>Method</td>
						<td>Resource Path</td>
						<td>Details</td>
					</tr>
				</thead>
				<tbody>
						<tr>
							<td>GET</td>
							<td>/license</td>
							<td>Provide the documentation of the License resource</td>
						</tr>
						<tr>
							<td>POST</td>
							<td>/license</td>
							<td>Publish a license on Grapes (credentials are mandatory).</td>
						</tr>
						<tr>
							<td>GET</td>
							<td>/license/names</td>
							<td>Provide a list of license names.
							Available parameter: approved, toBeValidated.</td>
						</tr>
						<tr>
							<td>GET</td>
							<td>/license/{name}</td>
							<td>Display all the information about the targeted license.</td>
						</tr>
						<tr>
							<td>DELETE</td>
							<td>/license/{name}</td>
							<td>Delete a license from Grapes (credentials are mandatory).</td>
						</tr>
						<tr>
							<td>POST</td>
							<td>/license/{name}</td>
							<td>Validate or unvalidate a license (credentials are mandatory).
							Mandatory parameter: approved</td>
						</tr>
				</tbody>
			</table>
    		</p>
    	</div><!--/.fluid-container-->

		<footer>
			<p>Grapes ${programVersion!?html}.</p>
		</footer>
		
		<!-- ==Javascript== -->
		<script src="/public/jquery-1.9.1/jquery.js"></script>
		<script src="/public/twitter-bootstrap-2.3.2/js/bootstrap.js"></script>
	    
	 </body>
</html>