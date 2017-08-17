$("#submit").click(function(event){
	
	// Prevent form submission
	event.preventDefault();

	// Getting Information from Form
	var searchTerm = $("#search").val();

	// Targetting HTML
	var table = $("#table-items")[0].childNodes[1];
	
	// Validation
	if(searchTerm.length === 0){
		$("#search").css("border-color", "red");
		$(".btn-primary").css("background-color", "red");
		$("#error-message")[0].innerText = "";
		$("#error-message")[0].innerText = "Please type something in search bar";
		return;
	} else{
		$("#search").css("border-color", "#999999");
		$("#error-message")[0].innerText = "";
		$(".btn-primary").css("background-color", "#286090");
	}

	// Empty the table using remove class
	$(".appended-row").remove();

	$.ajax({
		url:"localhost:3000/search=" + searchTerm,
		dataType: "json",
		success: function(DataFromJSON){
			console.log(DataFromJSON);
		}, error: function(){
			console.log("Error, server not responding.");
		}
	});
});