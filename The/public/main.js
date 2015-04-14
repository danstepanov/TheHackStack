function getHacks() {
    console.log("getHacks executed");
    console.log("getHacks completed");
};

function submitHack() {
	console.log("submitHack executed");
	Parse.initialize("9oSP3PB2jbHOtMg3p0PilW9tQ6ahbfUvlEc9DmYQ", "IhLrkVUv2hGqYadeTW2rk2tOPCPhIgHFDlJO5tnq");	
	var Posts = Parse.Object.extend("Posts");
	var post = new Posts();
	var title = $("input[name='title']").val();
    var description = $("input[name='description']").val();
	var link = $("input[name='link']").val();
    
	post.save({
		title: title,
        description: description,
		link: function(link){
        console.log("Checking link");
        if (link.indexOf('https://') === 0 || link.indexOf('http://') === 0) {
            return link;
        } else {
            return 'http://'+link;
    }
    console.log("Link properly set");
        },
		upvote: 0,
	}).then(function(object) {
		console.log("great success!");
		$("input[name='title']").val('');
        $("input[name='description']").val('');
        
		$("input[name='link']").val('');
	});
	console.log("submitHack completed");
    
};
