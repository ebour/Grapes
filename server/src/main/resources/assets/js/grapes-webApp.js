/**************************************************************************************************/
/*          Fill web-app with actions and filters regarding the targeted object type               */
/**************************************************************************************************/
function displayModuleOptions(){
    $("#targets").empty();
    cleanAction();
	var moduleIds = "<div class=\"control-group\">\n";
	moduleIds += "   <label class=\"control-label\" for=\"moduleName\" style=\"width: auto;\">name: </label>\n";
	moduleIds += "   <div class=\"controls\"  style=\"margin-left: 75px;\"><select id=\"moduleName\"></select></div>\n";
	moduleIds += "</div>\n";
	moduleIds += "<div class=\"control-group\">\n";
	moduleIds += "   <label class=\"control-label\" for=\"moduleVersion\" style=\"width: auto;\">version: </label>\n";
	moduleIds += "   <div class=\"controls\" style=\"margin-left: 75px;\"><select id=\"moduleVersion\"></select></div>\n";
	moduleIds += "</div>\n";
	$("#ids").empty().append(moduleIds);
	var moduleFilters = "<div class=\"row-fluid\">\n";
	moduleFilters += "   <label>\n";
	moduleFilters += "      <input id=\"promoted\" type=\"checkbox\"> promoted\n";
	moduleFilters += "   </label>\n";
	moduleFilters += "</div>\n";
	$("#filters").empty().append(moduleFilters);
	var moduleActions = ""
	moduleActions += "<div class=\"btn-group\" data-toggle=\"buttons-radio\">\n";
	moduleActions += "   <div class=\"row-fluid\">\n";
	moduleActions += "      <button type=\"button\" class=\"btn btn-info action-button\" style=\"margin:2px;\" onclick='getModuleOverview();' id=\"overviewButton\">Overview</button>\n";
	moduleActions += "      <button type=\"button\" class=\"btn btn-info action-button\" style=\"margin:2px;\" onclick='getModuleDependencies();'>Dependencies</button>\n";
	moduleActions += "      <button type=\"button\" class=\"btn btn-info action-button\" style=\"margin:2px;\" onclick='getModuleThirdParty();'>Third Party</button>\n";
	moduleActions += "      <button type=\"button\" class=\"btn btn-info action-button\" style=\"margin:2px;\" onclick='getModuleAncestors();'>Ancestors</button>\n";
	moduleActions += "      <button type=\"button\" class=\"btn btn-info action-button\" style=\"margin:2px;\" onclick='getModuleLicenses();'>Licenses</button>\n";
	moduleActions += "      <button type=\"button\" class=\"btn btn-info action-button\" style=\"margin:2px;\" onclick='getModulePromotionReport();'>Promotion Report</button>\n";
	moduleActions += "   </div>\n";
	moduleActions += "</div>\n";
	$("#action").empty().append(moduleActions);
	$("#action-perform").empty();
	loadModuleNames("moduleName");

	$("#moduleName").change(function () {
		loadModuleVersions($("#moduleName").val(), "moduleVersion");
	});

	$("#search").empty().append("<button type=\"button\" class=\"btn btn-primary\" style=\"margin:2px;\"  onclick='getModuleList(\"moduleName\", \"moduleVersion\", \"promoted\", \"targets\");'><i class=\"icon-search icon-white\"></i></button>");
}


function displayArtifactOptions(){
    $("#targets").empty();
    cleanAction();
	var artifactIds = "<div class=\"control-group\">\n";
	artifactIds += "   <label class=\"control-label\" for=\"artifactGroupId\" style=\"width: auto;\">groupId: </label>\n";
	artifactIds += "   <div class=\"controls\"  style=\"margin-left: 75px;\"><select id=\"groupId\"></select></div>\n";
	artifactIds += "</div>\n";
	artifactIds += "<div class=\"control-group\">\n";
    artifactIds += "   <label class=\"control-label\" for=\"artifactVersion\" style=\"width: auto;\">version: </label>\n";
    artifactIds += "   <div class=\"controls\"  style=\"margin-left: 75px;\"><select id=\"version\"></select></div>\n";
    artifactIds += "</div>\n";
	artifactIds += "<div class=\"control-group\">\n";
	artifactIds += "   <label class=\"control-label\" for=\"artifactArtifactId\" style=\"width: auto;\">artifactId: </label>\n";
	artifactIds += "   <div class=\"controls\"  style=\"margin-left: 75px;\"><select id=\"artifactId\"></select></div>\n";
	artifactIds += "</div>\n";
    $("#ids").empty().append(artifactIds);
	var artifactFilters = "<div class=\"row-fluid\">\n";
	artifactFilters += "   <label>\n";
	artifactFilters += "      <input id=\"doNotUse\" type=\"checkbox\"> do not use\n";
	artifactFilters += "   </label>\n";
	artifactFilters += "</div>\n";
	$("#filters").empty().append(artifactFilters);
	var artifactActions = "<div class=\"btn-group\" data-toggle=\"buttons-radio\">\n";
	artifactActions += "   <button type=\"button\" class=\"btn btn-success action-button\" style=\"margin:2px;\" onclick='getArtifactOverview();'>Overview</button>\n";
	artifactActions += "   <button type=\"button\" class=\"btn btn-success action-button\" style=\"margin:2px;\" onclick='getArtifactAncestors();'>Ancestors</button>\n";
	artifactActions += "   <button type=\"button\" class=\"btn btn-success action-button\" style=\"margin:2px;\" onclick='doNotUseArtifact();'>Do not use</button>\n";
	artifactActions += "   <button type=\"button\" class=\"btn btn-success action-button\" style=\"margin:2px;\" onclick='getArtifactLicenses();'>Licenses</button>\n";
	artifactActions += "</div>\n";
	$("#action").empty().append(artifactActions);
	$("#action-perform").empty();
	loadArtifactGroupIds("groupId");

	$("#groupId").change(function () {
		loadArtifactVersions($("#groupId").val(), "version");
		$("#artifactId").empty();
	});

	$("#version").change(function () {
		loadArtifactArtifactId($("#groupId").val(),$("#version").val(), "artifactId");
	});

	$("#search").empty().append("<button type=\"button\" class=\"btn btn-primary\" style=\"margin:2px;\"  onclick='getArtifactList(\"groupId\", \"artifactId\", \"version\", \"doNotUse\", \"targets\");'><i class=\"icon-search icon-white\"></i></button>");
}

function displayLicenseOptions(){
    $("#targets").empty();
    cleanAction();
	var licenseIds = "<div class=\"control-group\">\n";
	licenseIds += "   <label class=\"control-label\" for=\"licenseName\" style=\"width: auto;\">name: </label>\n";
	licenseIds += "      <div class=\"controls\"  style=\"margin-left: 75px;\"><select id=\"licenseName\"></select></div>\n";
	licenseIds += "</div>\n";
	$("#ids").empty().append(licenseIds);
	var licenseFilters = "<form class=\"form-vertical\">\n";
	licenseFilters += "   <label class=\"radio\">\n";
	licenseFilters += "      <input type=\"radio\" name=\"gavc\" value=\"to be validated\" id=\"toBeValidated\"> to be validated\n";
	licenseFilters += "   </label>\n";
	licenseFilters += "   <label class=\"radio\">\n";
	licenseFilters += "      <input type=\"radio\" name=\"gavc\" value=\"approved\" id=\"validated\"> approved\n";
	licenseFilters += "   </label>\n";
	licenseFilters += "   <label class=\"radio\">\n";
	licenseFilters += "      <input type=\"radio\" name=\"gavc\" value=\"rejected\" id=\"unvalidated\"> rejected\n";
	licenseFilters += "   </label>\n";
	licenseFilters += "</form>\n";
	$("#filters").empty().append(licenseFilters);
	var licenseActions = "<div class=\"btn-group\" data-toggle=\"buttons-radio\">\n";
	licenseActions += "   <button type=\"button\" class=\"btn btn-warning action-button\" style=\"margin:2px;\" onclick='createLicense();'>New</button>\n";
	licenseActions += "   <button type=\"button\" class=\"btn btn-warning action-button\" style=\"margin:2px;\" onclick='getLicenseOverview();'>Overview</button>\n";
	licenseActions += "   <button type=\"button\" class=\"btn btn-warning action-button\" style=\"margin:2px;\" onclick='approveLicense();'>Approve</button>\n";
	licenseActions += "   <button type=\"button\" class=\"btn btn-warning action-button\" style=\"margin:2px;\" onclick='rejectLicense();'>Reject</button>\n";
	licenseActions += "</div>\n";
	$("#action").empty().append(licenseActions);
	$("#action-perform").empty();
	loadLicensesNames("licenseName");

	$("#search").empty().append("<button type=\"button\" class=\"btn btn-primary\" style=\"margin:2px;\"  onclick='getLicenseList(\"licenseName\", \"toBeValidated\", \"validated\", \"unvalidated\", \"targets\");'><i class=\"icon-search icon-white\"></i></button>");
}

/********************************************************************/
/*          Fill web-app targets regarding the filters               */
/********************************************************************/
function getModuleList(moduleNameFieldId, moduleVersionFieldId, promotedFieldId, targetedFieldId){
    $("#" + targetedFieldId).empty();
    cleanAction();
    var moduleName = $("#" + moduleNameFieldId).val();
    var moduleVersion = $("#" + moduleVersionFieldId).val();

    var queryParams = "";
    if(moduleName != '-' && moduleName != null){
        queryParams += "name="+ moduleName +"&"
    }
    if(moduleVersion != '-' && moduleVersion != null){
        queryParams += "version="+ moduleVersion +"&"
    }
    if($("#" + promotedFieldId).is(':checked')){
        queryParams += "promoted=true"
    }

    $.ajax({
    		type: "GET",
    		accept: {
    			json: 'application/json'
    		},
    		url: "/module/all?" + queryParams ,
    		data: {},
    		dataType: "json",
    		success: function(data, textStatus) {
    			var html = "";
    			$.each(data, function(i, module) {
    			    var moduleId = module.name + ":" + module.version;
    			    html += "<label class=\"radio\">"
    				html += "<input type=\"radio\" name=\"moduleId\" value=\""+ moduleId+ "\" onclick=\"cleanAction()\">";
    				html += moduleId;
    				html += "</label>"
    			});

    			$("#" + targetedFieldId).append(html);
    		}
    }).done(function(){
                setTimeout(function(){
                      $("input:radio[name=moduleId]:first").attr('checked', true);
                    }, 500);
            });
}

function getArtifactList(groupIdFieldId, artifactIdFieldId, versionFieldId, doNotUseFieldId, targetedFieldId){
    $("#" + targetedFieldId).empty();
    cleanAction();
    var groupId = $("#" + groupIdFieldId).val();
    var artifactId = $("#" + artifactIdFieldId).val();
    var version = $("#" + versionFieldId).val();

    var queryParams = "";
    if(groupId != '-' && groupId != null){
        queryParams += "groupId="+ groupId +"&"
    }
    if(artifactId != '-' && artifactId != null){
        queryParams += "artifactId="+ artifactId +"&"
    }
    if(version != '-' && version != null){
        queryParams += "version="+ version +"&"
    }
    if($("#" + doNotUseFieldId).is(':checked')){
        queryParams += "doNotUse=true"
    }

    $.ajax({
    		type: "GET",
    		accept: {
    			json: 'application/json'
    		},
    		url: "/artifact/all?" + queryParams ,
    		data: {},
    		dataType: "json",
    		success: function(data, textStatus) {
    			var html = "";
    			$.each(data, function(i, artifact) {
    			    var gavc = artifact.groupId + ":" + artifact.artifactId + ":" +artifact.version + ":";
    			    if(typeof artifact.classifier!='undefined'){
                        gavc+= artifact.classifier;
    			    }
                    gavc+= ":";
    			    if(typeof artifact.extension!='undefined'){
                        gavc+= artifact.extension;
    			    }

    			    html += "<label class=\"radio\">"
    				html += "<input type=\"radio\" name=\"gavc\" value=\""+ gavc+ "\" onclick=\"cleanAction()\">";
    				html += gavc;
    				html += "</label>"
    			});

    			$("#" + targetedFieldId).append(html);
    		}
    }).done(function(){
          setTimeout(function(){
                $("input:radio[name=gavc]:first").attr('checked', true);
              }, 500);
      });
}

function getLicenseList(licenseNameFieldId, toBeValidatedFieldId, validatedFieldId, unvalidatedFieldId, targetedFieldId){
    $("#" + targetedFieldId).empty();
    cleanAction();

    var licenceName = $("#" + licenseNameFieldId).val();

    var queryParams = "";
    if(licenceName != '-' && licenceName != null){
        queryParams += "licenseId="+licenceName+"&";
    }
    if($("#" + toBeValidatedFieldId).is(':checked')){
        queryParams += "toBeValidated=true&"
    }
    if($("#" + validatedFieldId).is(':checked')){
        queryParams += "approved=true&"
    }
    if($("#" + unvalidatedFieldId).is(':checked')){
        queryParams += "approved=false"
    }

    $.ajax({
    		type: "GET",
    		accept: {
    			json: 'application/json'
    		},
    		url: "/license/names?" + queryParams ,
    		data: {},
    		dataType: "json",
    		success: function(data, textStatus) {
    			var html = "";
    			$.each(data, function(i, licenseName) {
    			    html += "<label class=\"radio\">"
    				html += "<input type=\"radio\" name=\"licenseId\" value=\""+ licenseName+ "\" onclick=\"cleanAction()\">";
    				html += licenseName;
    				html += "</label>"
    			});

    			$("#" + targetedFieldId).append(html);
    		}
    }).done(function(){
        setTimeout(function(){
              $("input:radio[name=licenseId]:first").attr('checked', true);
            }, 500);
    });
}

/********************************************************/
/*               Actions definitions                    */
/********************************************************/
function getModuleOverview(){
    if($('input[name=moduleId]:checked', '#targets').size() == 0){
        $("#messageAlert").empty().append("<strong>Warning!</strong> You must select a target before performing an action.");
        $("#anyAlert").show();
        return;
    }
    var moduleId = $('input[name=moduleId]:checked', '#targets').val();
    var splitter = moduleId.lastIndexOf(':');
	var moduleVersion = moduleId.substring(splitter + 1);
	var moduleName = moduleId.replace(':'+moduleVersion, '');

	$.ajax({
            type: "GET",
            url: "/module/"+ moduleName + "/" + moduleVersion ,
            data: {},
            dataType: "html",
            success: function(data, textStatus) {
                $("#results").empty().append($(data).filter(".row-fluid"));
            }
        })
}

function getModuleDependencies(){
    if($('input[name=moduleId]:checked', '#targets').size() == 0){
        $("#messageAlert").empty().append("<strong>Warning!</strong> You must select a target before performing an action.");
        $("#anyAlert").show();
        return;
    }
    var moduleId = $('input[name=moduleId]:checked', '#targets').val();
    var splitter = moduleId.lastIndexOf(':');
	var moduleVersion = moduleId.substring(splitter + 1);
	var moduleName = moduleId.replace(':'+moduleVersion, '');

	$.ajax({
            type: "GET",
            url: "/module/"+ moduleName + "/" + moduleVersion + "/dependencies?scopeTest=true&scopeRuntime=true&showSources=false" ,
            data: {},
            dataType: "html",
            success: function(data, textStatus) {
                $("#results").empty().append($(data).filter(".row-fluid"));
            }
        })
}

function getModuleThirdParty(){
    if($('input[name=moduleId]:checked', '#targets').size() == 0){
        $("#messageAlert").empty().append("<strong>Warning!</strong> You must select a target before performing an action.");
        $("#anyAlert").show();
        return;
    }
    var moduleId = $('input[name=moduleId]:checked', '#targets').val();
    var splitter = moduleId.lastIndexOf(':');
	var moduleVersion = moduleId.substring(splitter + 1);
	var moduleName = moduleId.replace(':'+moduleVersion, '');

	$.ajax({
            type: "GET",
            url: "/module/"+ moduleName + "/" + moduleVersion + "/dependencies?scopeTest=true&scopeRuntime=true&showThirdparty=true&corporate=false&showSources=false&showLicenses=true" ,
            data: {},
            dataType: "html",
            success: function(data, textStatus) {
                $("#results").empty().append($(data).filter(".row-fluid"));
            }
        })
}

function getModuleAncestors(){
    if($('input[name=moduleId]:checked', '#targets').size() == 0){
        $("#messageAlert").empty().append("<strong>Warning!</strong> You must select a target before performing an action.");
        $("#anyAlert").show();
        return;
    }
    var moduleId = $('input[name=moduleId]:checked', '#targets').val();
    var splitter = moduleId.lastIndexOf(':');
	var moduleVersion = moduleId.substring(splitter + 1);
	var moduleName = moduleId.replace(':'+moduleVersion, '');

	$.ajax({
            type: "GET",
            url: "/module/"+ moduleName + "/" + moduleVersion + "/ancestors" ,
            data: {},
            dataType: "html",
            success: function(data, textStatus) {
                $("#results").empty().append($(data).filter(".row-fluid"));
            }
        })
}

function getModuleLicenses(){
    if($('input[name=moduleId]:checked', '#targets').size() == 0){
        $("#messageAlert").empty().append("<strong>Warning!</strong> You must select a target before performing an action.");
        $("#anyAlert").show();
        return;
    }
    var moduleId = $('input[name=moduleId]:checked', '#targets').val();
    var splitter = moduleId.lastIndexOf(':');
	var moduleVersion = moduleId.substring(splitter + 1);
	var moduleName = moduleId.replace(':'+moduleVersion, '');

	$.ajax({
            type: "GET",
            url: "/module/"+ moduleName + "/" + moduleVersion + "/licenses" ,
            data: {},
            dataType: "html",
            success: function(data, textStatus) {
                $("#results").empty().append($(data).filter(".row-fluid"));
            }
        })
}

function getModulePromotionReport(){
    if($('input[name=moduleId]:checked', '#targets').size() == 0){
        $("#messageAlert").empty().append("<strong>Warning!</strong> You must select a target before performing an action.");
        $("#anyAlert").show();
        return;
    }
    var moduleId = $('input[name=moduleId]:checked', '#targets').val();
    var splitter = moduleId.lastIndexOf(':');
	var moduleVersion = moduleId.substring(splitter + 1);
	var moduleName = moduleId.replace(':'+moduleVersion, '');

	$.ajax({
            type: "GET",
            url: "/module/"+ moduleName + "/" + moduleVersion + "/promotion/report?fullRecursive=true" ,
            data: {},
            dataType: "html",
            success: function(data, textStatus) {
                $("#results").empty().append($(data).filter(".row-fluid"));
            }
        })
}

function getArtifactOverview(){
    if($('input[name=gavc]:checked', '#targets').size() == 0){
        $("#messageAlert").empty().append("<strong>Warning!</strong> You must select a target before performing an action.");
        $("#anyAlert").show();
        return;
    }
	var gavc = $('input[name=gavc]:checked', '#targets').val();

	$.ajax({
            type: "GET",
            url: "/artifact/"+ gavc,
            data: {},
            dataType: "html",
            success: function(data, textStatus) {
                $("#results").empty().append($(data).filter(".row-fluid"));
            }
        }).done(updateArtifactAction());
}

function changeArtifactAction(){
	var gavc = $('input[name=gavc]:checked', '#targets').val();

	$.ajax({
            type: "GET",
            url: "/artifact/"+ gavc,
            data: {},
            dataType: "json",
            success: function(data, textStatus) {
                $('#artifactEdition').find('#inputDownloadUrl').val(data.downloadUrl);
                $('#artifactEdition').find('#inputProvider').val(data.provider);
            }
        });

    var html ="<div class=\"row-fluid\">\n";
    html +="<button type=\"button\" class=\"btn\" style=\"margin:2px;\" onclick=\"$('#artifactEdition').modal('show');\">Update</button>\n";
    html +="</div>\n";
    $("#extra-action").empty().append(html);
}


function updateArtifact(){
	var gavc = $('input[name=gavc]:checked', '#targets').val();
    var downloadUrl = $('#artifactEdition').find('#inputDownloadUrl').val();
	$.ajax({
            type: "POST",
            url: "/artifact/"+ gavc + "/downloadurl?url="+ downloadUrl,
            data: {},
            dataType: "html",
            error: function(xhr, error){
                alert("The action cannot be performed: status " + xhr.status);
            }
    });


    var provider = $('#artifactEdition').find('#inputProvider').val();
	$.ajax({
            type: "POST",
            url: "/artifact/"+ gavc + "/provider?provider="+ provider,
            data: {},
            dataType: "html",
            error: function(xhr, error){
                alert("The action cannot be performed: status " + xhr.status);
            }
    });

    cleanAction();
}

function getArtifactAncestors(){
    if($('input[name=gavc]:checked', '#targets').size() == 0){
        $("#messageAlert").empty().append("<strong>Warning!</strong> You must select a target before performing an action.");
        $("#anyAlert").show();
        return;
    }
	var gavc = $('input[name=gavc]:checked', '#targets').val();

	$.ajax({
            type: "GET",
            url: "/artifact/"+ gavc + "/ancestors",
            data: {},
            dataType: "html",
            success: function(data, textStatus) {
                $("#results").empty().append($(data).filter(".row-fluid"));
            }
        })
}

function doNotUseArtifact(){
    if($('input[name=gavc]:checked', '#targets').size() == 0){
        $("#messageAlert").empty().append("<strong>Warning!</strong> You must select a target before performing an action.");
        $("#anyAlert").show();
        return;
    }

    var gavc = $('input[name=gavc]:checked', '#targets').val();

	$.ajax({
            type: "GET",
            url: "/artifact/"+ gavc + "/donotuse",
            data: {},
            dataType: "html",
            success: function(donotUse, textStatus) {
                if(donotUse == "true"){
                    $("#doNotUseArtifactModal-text").empty().append(gavc + " is currently flagged with \"DO_NOT_USE\", do you want to un-flagged it?")
                }
                else{
                    $("#doNotUseArtifactModal-text").empty().append("Do you want to flag " + gavc + " with \"DO_NOT_USE\"")
                }
                $('#doNotUseArtifactModal').modal('show');
            }
    })

}

function postDoNotUse(){
    var gavc = $('input[name=gavc]:checked', '#targets').val();
    var doNotUse = $("#doNotUseArtifactModal-text").text().indexOf("you want to flag") >= 0;
    $.ajax({
            type: "POST",
            url: "/artifact/"+ gavc + "/donotuse?doNotUse=" + doNotUse,
            data: {},
            dataType: "html",
            error: function(xhr, error){
                alert("The action cannot be performed: status " + xhr.status);
            }
    }).done($('#doNotUseArtifactModal').modal('hide'));

    cleanAction()
}

function getArtifactLicenses(){
    if($('input[name=gavc]:checked', '#targets').size() == 0){
        $("#messageAlert").empty().append("<strong>Warning!</strong> You must select a target before performing an action.");
        $("#anyAlert").show();
        return;
    }
	var gavc = $('input[name=gavc]:checked', '#targets').val();

	var html = "<table class=\"table table-bordered table-hover\" id=\"table-of-result\">\n";
	html += "<thead><tr><td>Licenses</td></tr></thead>\n";
	html += "<tbody>\n";
    
	$.ajax({
            type: "GET",
            url: "/artifact/"+ gavc + "/licenses",
            data: {},
            dataType: "json",
            success: function(data, textStatus) {
                $.each(data, function(i, licenseName) {
                    html += "<tr id=\""+licenseName+"-row\"><td onclick=\"removeLicenseAction('"+licenseName+"');\">" + licenseName + "</td></tr>\n";
                });

	            html += "</tbody>\n";
                $("#results").empty().append(html);
            }
    }).done(updateLicenseAction());
}

function addLicenseAction(){
    var html ="<div class=\"row-fluid\">\n";
    html +="<select id=\"licenses\">\n";
    return $.ajax({
            type: "GET",
            url: "/license/names",
            data: {},
            dataType: "json",
            success: function(data, textStatus) {
                $.each(data, function(i, licenseName) {
                    if($('#table-of-result tr > td:contains("'+licenseName+'")').length == 0){
                        html += "<option value=\"";
                        html += licenseName + "\">";
                        html += licenseName + "</option>\n";
                    }
                });

                html +="</select>\n";
                html +="<button type=\"button\" class=\"btn\" style=\"margin:2px;\" onclick=\"addLicense();\">Add</button>\n";
                html +="</div>\n";
                $("#extra-action").empty().append(html);
            }
    })
}

function removeLicenseAction(licenseId){
    $('#removeLicenseModal-button').attr('onclick', 'removeLicense(\''+licenseId+'\');');

    var gavc = $('input[name=gavc]:checked', '#targets').val();
    var html ="<div class=\"row-fluid\">The following license has been associated with <strong>"+gavc+"</strong></div>\n";

	$.ajax({
        type: "GET",
        url: "/license/"+ licenseId,
        data: {},
        dataType: "html",
        success: function(data, textStatus) {
            html += $(data).filter(".row-fluid").html();
            html += "\n<div class=\"row-fluid\">Would you like to remove this association?</div>\n";
            $("#removeLicenseModal-text").empty().append(html);
        }
    }).done($('#removeLicenseModal').modal('show'));
}

function addLicense(){
    var licenseId = $("#licenses").val();
    var gavc = $('input[name=gavc]:checked', '#targets').val();

    $.ajax({
            type: "POST",
            url: "/artifact/" + gavc + "/licenses?licenseId=" + licenseId ,
            data: {},
            dataType: "html",
            error: function(xhr, error){
                alert("The action cannot be performed: status " + xhr.status);
            }
        }).done(updateLicenses());
}

function removeLicense(licenseId){
    var gavc = $('input[name=gavc]:checked', '#targets').val();

    $.ajax({
            type: "DELETE",
            url: "/artifact/" + gavc + "/licenses?licenseId=" + licenseId ,
            data: {},
            dataType: "html",
            error: function(xhr, error){
                alert("The action cannot be performed: status " + xhr.status);
            }
    }).done($('#removeLicenseModal').modal('hide'));
}

function createLicense(){
    $('#licenseEdition').find('#inputName').val("");
    $('#licenseEdition').find('#inputLongName').val("");
    $('#licenseEdition').find('#inputURL').val("");
    $('#licenseEdition').find('#inputComments').val("");
    $('#licenseEdition').find('#inputRegexp').val("");
	$("#licenseEdition").modal('show');
}

function licenseSave(){
    $.ajax({
        url: "/license",
        method: 'POST',
        contentType: 'application/json',
        data: '{ "name": "'+$('#inputName').val()+'", "longName": "'+$('#inputLongName').val()+'", "comments": "'+$('#inputComments').val()+'", "regexp": "'+$('#inputRegexp').val()+'", "url": "'+$('#inputURL').val()+'", "approved": false }',
        error: function(xhr, error){
            alert("The action cannot be performed: status " + xhr.status);
        }
    }).done(function(){
            cleanAction();
            updateLicenseOptions();
    });
}

function getLicenseOverview(){
    if($('input[name=licenseId]:checked', '#targets').size() == 0){
        $("#messageAlert").empty().append("<strong>Warning!</strong> You must select a target before performing an action.");
        $("#anyAlert").show();
        return;
    }
	var licenseId = $('input[name=licenseId]:checked', '#targets').val();

	$.ajax({
            type: "GET",
            url: "/license/"+ licenseId,
            data: {},
            dataType: "html",
            success: function(data, textStatus) {
                $("#results").empty().append($(data).filter(".row-fluid"));
            }
        })

    $("#extra-action").empty().append("<button type=\"button\" class=\"btn btn-danger\" style=\"margin:2px;\" onclick=\"deleteLicense('"+licenseId+"');\">Delete</button>\n");
    $("#extra-action").append("<button type=\"button\" class=\"btn\" style=\"margin:2px;\" onclick=\"editLicense('"+licenseId+"');\">Edit</button>\n");
}

function deleteLicense(licenseId){
    $("#toDelete").text(licenseId);
    $("#impactedArtifacts").empty();


    $.ajax({
        type: "GET",
        accept: {
            json: 'application/json'
        },
        url: "/artifact/all?corporate=false&licenseId=" + licenseId,
        success: function(data, textStatus) {
           var impactedArtifacts = "";
            $.each(data, function(i, artifact) {
                impactedArtifacts += "<li class=\"active\" style=\"cursor: pointer\">";
                impactedArtifacts += artifact.groupId + ":" +artifact.artifactId + ":" +artifact.version + ":" +artifact.classifier + ":" + artifact.extension;
                impactedArtifacts += "</li>";

            });

            if(impactedArtifacts.length){
                $("#impactedArtifacts").append("<strong>The license is used by the following artifact(s):<strong><br/>");
                $("#impactedArtifacts").append("<ul>" + impactedArtifacts +"</ul>")
            }
            else{
                 $("#impactedArtifacts").append("No artifact is using this license.");
            }

        },
        error: function(xhr, error){
            alert("The action cannot be performed: status " + xhr.status);
        }
    }).done($('#licenseDelete').modal('show'));
}



function postDeleteLicense(){
	var licenseId = $('input[name=licenseId]:checked', '#targets').val();

	$.ajax({
        type: "DELETE",
        url: "/license/"+ licenseId,
        data: {},
        dataType: "html",
        error: function(xhr, error){
            alert("The action cannot be performed: status " + xhr.status);
        }
    }).done(function(){
                        cleanAction();
                        updateLicenseOptions();
                }
    );
}

function editLicense(licenseId){
    $.ajax({
        type: "GET",
        url: "/license/"+ licenseId,
        data: {},
        dataType: "json",
        success: function(license, textStatus) {
            $('#licenseEdition').find('#inputName').val(license.name);
            $('#licenseEdition').find('#inputLongName').val(license.longName);
            $('#licenseEdition').find('#inputURL').val(license.url);
            $('#licenseEdition').find('#inputComments').val(license.comments);
            $('#licenseEdition').find('#inputRegexp').val(license.regexp);
        }
    }).done($("#licenseEdition").modal('show'));
}


function approveLicense(){
    if($('input[name=licenseId]:checked', '#targets').size() == 0){
        $("#messageAlert").empty().append("<strong>Warning!</strong> You must select a target before performing an action.");
        $("#anyAlert").show();
        return;
    }
	var licenseId = $('input[name=licenseId]:checked', '#targets').val();

    $.ajax({
        type: "POST",
        url: "/license/"+ licenseId +"?approved=true",
        data: {},
        error: function(xhr, error){
            alert("The action cannot be performed: status " + xhr.status);
        },
        success: function(data, textStatus) {
            $("#messageAlert").empty().append("<strong>Operation performed.</strong>");
            $("#anyAlert").show();
            cleanAction();
        }
    });
}

function rejectLicense(){
    if($('input[name=licenseId]:checked', '#targets').size() == 0){
        $("#messageAlert").empty().append("<strong>Warning!</strong> You must select a target before performing an action.");
        $("#anyAlert").show();
        return;
    }
	var licenseId = $('input[name=licenseId]:checked', '#targets').val();

    $.ajax({
        type: "POST",
        url: "/license/"+ licenseId +"?approved=false",
        data: {},
        error: function(xhr, error){
            alert("The action cannot be performed: status " + xhr.status);
        },
        success: function(data, textStatus) {
            $("#messageAlert").empty().append("<strong>Operation performed.</strong>");
            $("#anyAlert").show();
            cleanAction();
        }
    });
}

/*********************/
/*      Utils       */
/*********************/
function cleanAction(){
    $(".action-button").removeClass('active');
    $("#results").empty();
    $("#extra-action").empty();
}

$('#removeLicenseModal').on('hidden', function () {
    getArtifactLicenses();
});

/*WorkAround*/
function updateLicenses(){
    setTimeout(function(){
      getArtifactLicenses();
    }, 500);
}

/*WorkAround*/
function updateArtifactAction(){
    setTimeout(function(){
      changeArtifactAction();
    }, 500);
}

/*WorkAround*/
function updateLicenseAction(){
    setTimeout(function(){
      addLicenseAction();
    }, 500);
}

/*WorkAround*/
function updateLicenseOptions(){
    setTimeout(function(){
      displayLicenseOptions();
    }, 500);
}