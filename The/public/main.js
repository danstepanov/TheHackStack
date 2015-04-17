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
		link: (function(){
        console.log("Checking link");
        if (link.indexOf('https://') === 0 || link.indexOf('http://') === 0) {
            return link;
        } else {
            return 'http://'+link;
    }
    console.log("Link properly set");
        })(),
		upvote: 0,
	}).then(function(object) {
		console.log("great success!");
		$("input[name='title']").val('');
        $("input[name='description']").val('');
		$("input[name='link']").val('');
	});
	console.log("submitHack completed");
};

function upvote() {
    console.log("upvote executed");
    
    var currentVotes = parseInt($("#count").text());
    console.log(currentVotes);
    
    currentVotes++;
    console.log(currentVotes);
    
    var stringVotes = currentVotes.toString();
    $("#count").text(stringVotes);
    
};

function pullBitcamp2015() {
    console.log("pullBitcamp2015 executed");
    Parse.initialize("9oSP3PB2jbHOtMg3p0PilW9tQ6ahbfUvlEc9DmYQ", "IhLrkVUv2hGqYadeTW2rk2tOPCPhIgHFDlJO5tnq");	
	var Posts = Parse.Object.extend("Posts");
	var query = new Parse.Query(Posts);
    query.equalTo("Hackathon","Bitcamp 2015");
    query.find({
        success: function(results) {
            console.log("Successfully retrieved " + results.length + " Bitcamp hacks.");
            for (var i=0; i < results.length; i++) {
                var object = results[i];
                
                console.log(object.get('Title'));
                $("input[name='title']").val(object.get('Title'));
                    
                listItem = newStackListItem(object.get('Title'), object.get('Description'));
                $('.list-group').append(listItem);
                
            }
        },
        error: function(error) {
            console.log("Error: " + error.code + " " + error.message);
        }
        });
    
    console.log("getHacks completed");
}

/* AddNewListItem
 * Title
 * TODO: Upvotes, Descriptions, Link
 */

function newStackListItem(title, desc/*, votes*/) {
    listGroupItem = $("<a></a>").addClass("list-group-item");
    listGroupItem.append(newHackInfoTag(title, desc));
    
//    if (!(title === null || title == "")) {
//        console.log(title)
//    }
//
//    if (!(desc == null || desc == "")) {
//        anotherTag = newDescriptionDivTag(desc);
//        listGroupItem.addChild(anotherTag);
//        console.log(desc);
//    }
    
    
    // listGroupItem.addChild(some other element)
    // ...
    
    return listGroupItem;
}

/* Creates something like:

<div class="hack-info" style="display:inline;">
  <h4 class="list-group-item-heading;" id="title"></h4>
  <p class="list-group-item-text" id="description">printing historical chocolatey goodness in 3D!!!!</p>
</div>
*/

function newHackInfoTag(title, desc/*, linkURL*/) {
    outerTag = $("<div></div>").addClass("hack-info");
    
    titleTag = $("<h4></h4>").addClass("list-group-item-heading").attr('id', 'title');
        titleTag.text(title);
    descTag = $("<p></p>").addClass("list-group-item-text").attr('id', 'desc');
        descTag.text(desc);
    outerTag.append(titleTag);
    outerTag.append(descTag);
    return outerTag;
    
}

function newUpvoteBox(initialVotes) {
    upvoteDiv = $("<div></div>").addClass("upvoteBox");
    
    
}