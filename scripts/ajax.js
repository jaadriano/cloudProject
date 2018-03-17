var modal = document.getElementById('myModal');
var addtestcasemodal = document.getElementById('addFormTestCase');
var addform = document.getElementById('addForm');
// Get the button that opens the modal
var btn = document.getElementById("loadTestcases");
var addtestcase = document.getElementById("addtestcases");
var pcap_file = document.getElementById("pcap-file");
// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];
// When the user clicks the button, open the modal 
btn.onclick = function() {
    modal.style.display = "block";
}
span.onclick = function() {
    modal.style.display = "none";
}
addtestcase.onclick = function() {
	if(addtestcasemodal.style.display == "block"){
		addform.reset();
		addtestcasemodal.style.display = "none";
	}
	else{
		addtestcasemodal.style.display = "block";
	}	
}
// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if ((event.target == modal)||(event.target == addtestcasemodal)){
        modal.style.display = "none";
		addtestcasemodal.style.display = "none";
    }
}
function post(path, params, method) {
    method = method || "post"; 
	// Set method to post by default if not specified.
    // The rest of this code assumes you are not using a library.
    // It can be made less wordy if you use one.
    var form = document.createElement('form');
	form.setAttribute('id', "pcapform");
    form.setAttribute('method', method);
    form.setAttribute('action', path);

    for(var key in params) {
        if(params.hasOwnProperty(key)) {
            var hiddenField = document.createElement('input');
            hiddenField.setAttribute('type', "hidden");
            hiddenField.setAttribute('name', key);
			hiddenField.setAttribute('id', "hiddenbutton");
            hiddenField.setAttribute('value', params[key]);
			console.log(params[key]);
            form.appendChild(hiddenField);
        }
    }
    document.body.appendChild(form);
    form.submit();	
}