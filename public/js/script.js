// Targetting HTML Table
var table = $("#table-items")[0].childNodes[1];

// Calling ajax on form submission, dependant on validation.
$("#submit").click(function(event){
	
	// Prevent form submission
	event.preventDefault();

	// Getting Information from Form
	var searchTerm = $("#search").val();
	
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
		url:"http://localhost:3000/search=" + searchTerm,
		beforesend: function(xhr){
			if(xhr.overrideMimeType){
				xhr.overrideMimeType("application/json");
			}
		},
		contentType:"application/json",
		dataType: "json",
		success: function(DataFromJSON){
			var username;
			var location;
			var favourites;
			var image;
			console.log(DataFromJSON.statuses[0]);
			
			for (var i = 0; i < DataFromJSON.statuses.length; i++) {
				username = DataFromJSON.statuses[i].user.screen_name;
				followers = DataFromJSON.statuses[i].user.followers_count;
				image = DataFromJSON.statuses[i].user.profile_image_url_https;

				if(DataFromJSON.statuses[i].user.location.length !== 0){
					location = DataFromJSON.statuses[i].user.location;
				} else{
					location = "Not Disclosed";
				}

				table.innerHTML += "<tr class='appended-row'><td>" + username +
									"</td><td>" + location + "</td><td>" +
									followers + "</td><td><img src=" + image + "></td></tr>";
			};
		}, error: function(){
			console.log("Error, server not responding.");
		}
	});
});

// Clearing Table
$("#clear-table").click(function(){
	$(".appended-row").remove();
});

// Opening Explanation Panel
$("#question").click(function(){
	$("#overlay").fadeIn(1000);
});

// Closing Explanation Panel
$("#close").click(function(){
	$("#overlay").fadeOut(1000);
});