<!DOCTYPE html> 
<html lang="en"> 
	<head> 
		<meta charset="utf-8"> 
		<title>WebApp</title>
		<meta name="description" content="The web application provides a ui over the grapes REST API">
		<link href="/public/twitter-bootstrap-2.3.2/css/bootstrap.css" rel="stylesheet">
		<link href="/public/twitter-bootstrap-2.3.2/css/bootstrap-responsive.css" rel="stylesheet">
		<link href="/public/twitter-bootstrap-2.3.2/css/docs.css" rel="stylesheet">
		<link href="/assets/css/grapes-webapp.css" rel="stylesheet">

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
                                <li class="active">
                                    <a href="#">Data Browser</a>
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
	    <div class="row-fluid">
            <div class="alert" align="bottom" style="display:none;" id="anyAlert">
                <a class="close" onclick="$('.alert').hide()">×</a>
                <div id="messageAlert"></div>
            </div>
	    </div>
		<div class="row-fluid">
            <div class="container">
                <div class="row-fluid">
                    <div class="span12" id="selection_section"  style="padding:8px;border-bottom: 1px solid rgb(0, 68, 300);">
                        <div class="row-fluid">
                            <div class="span2">
                                <div class="btn-group" data-toggle="buttons-radio">
                                    <div class="row-fluid" style="padding:4px">
                                        <button type="button" class="btn btn-inverse" style="margin-left:8px;" onclick='displayModuleOptions();'>Modules</button>
                                    </div>
                                    <div class="row-fluid" style="padding:4px">
                                        <button type="button" class="btn btn-inverse" style="margin-left:8px;" onclick='displayArtifactOptions();'>Artifacts</button>
                                    </div>
                                    <div class="row-fluid" style="padding:4px">
                                        <button type="button" class="btn btn-inverse" style="margin-left:8px;" onclick='displayLicenseOptions();'>Licenses</button>
                                    </div>
                                </div>
                            </div>
                            <div class="span5 content selection_section">
                                <form class="form-horizontal" id="ids"></form>
                            </div>
                            <div class="span5 content selection_section">
                                <div class="row-fluid"><strong>Filters</strong></div>
                                <div class="row-fluid" id="filters"></div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row-fluid">
                    <div class="span12" id="result_list" style="margin-top:8px;padding:8px;border-bottom: 1px solid rgb(0, 68, 300);">
                        <div class="row-fluid">
                            <div class="span11"><strong>Targets:</strong>
                                <form class="form-vertical" id="targets"></form>
                            </div>
                            <div class="span1" id="search"></div>
                        </div>
                    </div>
                </div>
                <div class="row-fluid">
                    <div class="span12" id="actions" style="margin-top:8px;padding:8px">
                        <div class="row-fluid">
                            <div class="span12" id="action"></div>
                            </div>
                        </div>
                        <div class="row-fluid">
                            <div class="span12" id="results"></div>
                        </div>
                        <div class="row-fluid">
                            <div class="span12" id="extra-action"></div>
                        </div>
                    </div>
                </div>
			</div>
		</div>

        <!-- Modal Artifact Edition -->
        <div id="artifactEdition" class="modal hide fade" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true" onclick="cleanAction()">×</button>
                <h3 id="myModalLabel">Edit Artifact</h3>
            </div>
            <div class="modal-body">
                <form class="form-horizontal">
                    <label class="control-label" for="inputDownloadUrl">Provider</label>
                    <div class="controls">
                        <input class="input-large" type="text" id="inputProvider" placeholder="Artifact Provider">
                    </div>
                    <label class="control-label" for="inputDownloadUrl">Download URL</label>
                    <div class="controls">
                        <input class="input-large" type="text" id="inputDownloadUrl" placeholder="Artifact Download Url">
                    </div>
                </form>
            </div>
            <div class="modal-footer">
                <button class="btn" data-dismiss="modal" aria-hidden="true" onclick="cleanAction()">Cancel</button>
                <button class="btn btn-primary" data-dismiss="modal" onclick='updateArtifact();'>Save changes</button>
            </div>
        </div>

        <!-- Modal Artifact "DO_NOT_CHECK" Flag Management -->
        <div id="doNotUseArtifactModal" class="modal hide fade" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true" onclick="cleanAction()">×</button>
                <h3>Do Not Use Flag</h3>
            </div>
            <div class="modal-body" id="doNotUseArtifactModal-text">
            </div>
            <div class="modal-footer">
                <button class="btn" data-dismiss="modal" aria-hidden="true" onclick="cleanAction()">Cancel</button>
                <button class="btn btn-primary" onclick="postDoNotUse()">Perform</button>
            </div>
        </div>

        <!-- Modal remove license association -->
        <div id="removeLicenseModal" class="modal hide fade" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true" onclick="cleanAction()">×</button>
                <h3>License Association</h3>
            </div>
            <div class="modal-body" id="removeLicenseModal-text"></div>
            <div class="modal-footer">
                <button class="btn" data-dismiss="modal" aria-hidden="true" onclick="cleanAction()">Cancel</button>
                <button class="btn btn-primary" id="removeLicenseModal-button">Remove</button>
            </div>
        </div>

        <!-- Modal License Edition -->
        <div id="licenseEdition" class="modal hide fade" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true" onclick="cleanAction()">×</button>
                <h3 id="myModalLabel">Edit License</h3>
            </div>
            <div class="modal-body">
                <form class="form-horizontal">
                    <label class="control-label" for="inputName">Name</label>
                    <div class="controls">
                        <input class="input-large" type="text" id="inputName" placeholder="Short license name">
                    </div>
                    <label class="control-label" for="inputLongName">Long Name</label>
                    <div class="controls">
                        <input class="input-large" type="text" id="inputLongName" placeholder="License full name">
                    </div>
                    <label class="control-label" for="inputURL">URL</label>
                    <div class="controls">
                        <input class="input-large" type="text" id="inputURL" placeholder="License url (not mandatory)">
                    </div>
                    <label class="control-label" for="inputComments">Comments</label>
                    <div class="controls">
                        <input class="input-large" type="text" id="inputComments" placeholder="Comments (not mandatory)">
                    </div>
                    <label class="control-label" for="inputRegexp">Regexp</label>
                    <div class="controls">
                        <input class="input-large" type="text" id="inputRegexp" placeholder="Regexp (not mandatory)">
                    </div>
                </form>
            </div>
            <div class="modal-footer">
                <button class="btn" data-dismiss="modal" aria-hidden="true" onclick="cleanAction()">Cancel</button>
                <button class="btn btn-primary" data-dismiss="modal" onclick='licenseSave();'>Save changes</button>
            </div>
        </div>

        <!-- Modal block in case of license delete -->
        <div id="licenseDelete" class="modal hide fade" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true" style='margin: 0px 0px 0px -25%;'>
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true" onclick="cleanAction()">×</button>
                <h3 id="myModalLabel">Delete License</h3>
            </div>
            <div class="modal-body">
                <div class="alert">
                    <strong>Warning:</strong> This operation cannot be undone! Are you really sure you want te delete this license?
                    <div id="toDelete"></div>
                    <br/>
                    <div id="impactedArtifacts"></div>
                </div>
            </div>
            <div class="modal-footer">
                <button class="btn" data-dismiss="modal" aria-hidden="true" onclick="cleanAction()">Cancel</button>
                <button class="btn btn-primary" data-dismiss="modal" onclick='postDeleteLicense();'>Delete</button>
            </div>
        </div>

       	<script src="/public/jquery-1.9.1/jquery.js"></script>
 		<script src="/public/twitter-bootstrap-2.3.2/js/bootstrap.min.js"></script>
 		<script src="/assets/js/grapes-webApp.js"></script>
 		<script src="/assets/js/grapes-commons.js"></script>
	</body>
</html>