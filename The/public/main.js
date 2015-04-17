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
    // Initialize Parse
    Parse.initialize("9oSP3PB2jbHOtMg3p0PilW9tQ6ahbfUvlEc9DmYQ", "IhLrkVUv2hGqYadeTW2rk2tOPCPhIgHFDlJO5tnq");	
    // Intialize the Posts class
	var Posts = Parse.Object.extend("Posts");
    // Initialize a query on instance of Posts
	var query = new Parse.Query(Posts);
    // Return all objects aka Hacks in Posts that are from Bitcamp 2015
    query.equalTo("Hackathon","Bitcamp 2015");
    // Return the Title and Description of each Hack in the query by running a for loop
    query.find({
        success: function(results) {
            // Print the amount of hacks pulled to the console
            console.log("Successfully retrieved " + results.length + " Bitcamp hacks.");
            // pass the list of hacks and 
            addResultsToListGroupByClass(results, ".list-group");
        },
        error: function(error) {
            console.log("Error: " + error.code + " " + error.message);
        }
        });
    
    console.log("getHacks completed");
}

/* addResultsToListGroupByClass
 * @results - Results retrieved from Parse.
 * @class - name of the HTML/CSS class of the element to append results to
 */

function addResultsToListGroupByClass(results, className) {
    // Initialize for loop across all hacks in query 
    for (var i=0; i < results.length; i++) {
        // each hack in the loop is i
        var object = results[i];
        // Print the title of each hack pulled to the console
        console.log(object.get('Title'));

        listItem = newStackListItem(object.get('Title'), shortenString(object.get('Description'), 100), object.get('Link'));
        $(className).append(listItem);
    }
}

/* AddNewListItem
 * Title
 * TODO: Upvotes, Descriptions, Link
 */

function newStackListItem(title, desc, linkURL/*votes*/) {
    listGroupItem = $("<div></div>").addClass("list-group-item hackathonListGroupItem");
    
    listGroupItem.append(newUpvoteBox(0));
    listGroupItem.append(newHackInfoTag(title, desc, linkURL));
    
    return listGroupItem;
}

/* Creates something like:

<div class="hack-info" style="display:inline;">
  <h4 class="list-group-item-heading;" id="title"></h4>
  <p class="list-group-item-text" id="description">printing historical chocolatey goodness in 3D!!!!</p>
</div>
*/

function newHackInfoTag(title, desc, linkURL) {
    outerTag = $("<a></a>").addClass("hack-info").attr('href', linkURL);
    
    titleTag = $("<h4></h4>").addClass("list-group-item-heading").attr('id', 'title');
        titleTag.text(title);
    descTag = $("<p></p>").addClass("list-group-item-text").attr('id', 'desc');
        descTag.text(desc);
    outerTag.append(titleTag);
    outerTag.append(descTag);
    return outerTag;
    
}

//    <div class="upvoteBox">
//      <button class="upvotePlus" id="plus" onclick="upvote()">
//        <span class="glyphicon glyphicon-chevron-up" aria-hidden="true"></span>
//        <span id="count">2</span>
//      </button>
//    </div>

function newUpvoteBox(initialVotes) {
    upvoteDiv = $("<div></div>").addClass("upvoteBox");
    
    upvoteButton = $("<button></button>").addClass("upvotePlus").attr('id', plus).attr('onclick', 'upvote()');
    upvoteArrow = $("<span></span>").addClass("glyphicon glyphicon-chevron-up").attr('aria-hidden', 'true');
    upvoteCount = $("<span></span>").attr('id', count).text(initialVotes);
    
    upvoteButton.append(upvoteArrow).append(upvoteCount);
    upvoteDiv.append(upvoteButton);
    
    return upvoteDiv;
    
    
}

function shortenString(description, newLength) {
    return description.substring(0, newLength) + '...';
}