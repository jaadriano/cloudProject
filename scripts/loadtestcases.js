$(document).ready(function() {
	$('#pcapform').submit(function() {
		console.log("HelloSW");
        $(this).ajaxSubmit({
            error: function(xhr) {
		            status('Error: ' + xhr.status);
            },
            success: function(response) {
				console.log(response);
            }
		});
			return false;
	});
	$('#addForm').submit(function() {
        $(this).ajaxSubmit({
            error: function(xhr) {
				
		            status('Error: ' + xhr.status);
            },
            success: function(response) {
				addform.reset();
				addtestcasemodal.style.display = "none";
				
            }
		});
			return false;
	});
	$('#loadTestcases').submit(function() {
        $(this).ajaxSubmit({
            error: function(xhr) {
		            status('Error: ' + xhr.status);
            },
            success: function(response) {
				document.getElementById('testcasetable').innerHTML = "";
				var myBodyId = document.getElementById("testcasetable");
					var table_elem = myBodyId.appendChild(document.createElement('table'));    
					for (i=response.length-1;i>=0;i--) {
						var tr_elem = table_elem.appendChild(document.createElement('tr'));
							var dynamicFilename = response[i].filename;
							var td_elem = tr_elem.appendChild(document.createElement('td'));
								//ToDo: 1st column
								var input_elem = td_elem.appendChild(document.createElement('input'));
								input_elem.setAttribute('type', "submit");
								input_elem.setAttribute('id', dynamicFilename);
								input_elem.setAttribute('class', "btn btn-light");
								input_elem.setAttribute('value', "");
								//input_elem.setAttribute('enctype', "multipart/form-data");
								input_elem.addEventListener('click', function(){
									var dynamicID = $(this)[0].getAttribute("id");
									console.log(dynamicID)
									post('/testcase-single', {filename: dynamicID}, "get" );
								});
							var td_elem2 = tr_elem.appendChild(document.createElement('td'));
								//ToDo: 2nd column
								var newNode = document.createElement('a');
								newNode.id = response[i].filename;
								var newElemText = document.createTextNode("("+response[i].profile+") "+response[i].filename);
								newNode.setAttribute('href', "#");
								newNode.setAttribute('class', "nav-link");
								newNode.appendChild(newElemText);
								//ToDo: add 3rd column
						td_elem2.appendChild(newNode);    
					}
            }
	});
	return false;
	});
});