function pullBitcamp2015() {
    
    // Initialize Parse
    Parse.initialize("9oSP3PB2jbHOtMg3p0PilW9tQ6ahbfUvlEc9DmYQ", "IhLrkVUv2hGqYadeTW2rk2tOPCPhIgHFDlJO5tnq");	
    // Intialize the Posts class
	var Posts = Parse.Object.extend("Posts");
    // Initialize a query on instance of Posts
	var query = new Parse.Query(Posts);
    // Return all objects aka Hacks in Posts that are from Bitcamp 2015
    query.equalTo("Hackathon","Bitcamp 2015");
    query.descending("Upvotes");
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
    
    
   
}

/* addResultsToListGroupByClass
 * @results - Results retrieved from Parse.
 * @class - name of the HTML/CSS class of the element to append results to
 */

// ------------------------------------------- ADDS INFORMATION TO LIST GROUP ITEM --------------------------------------------

function addResultsToListGroupByClass(results, className) {
    // Initialize for loop across all hacks in query 
    for (var i=0; i < results.length; i++) {
        // each hack in the loop is i
        var object = results[i];

        listItem = newStackListItem(object.id,
                                    object.get('Title'), 
                                    shortenString(object.get('Description'), 100), 
                                    object.get('Link'), 
                                    object.get('Upvotes'));
        $(className).append(listItem);
    }
}

function shortenString(description, newLength) {
    return description.substring(0, newLength) + '...';
}

/* AddNewListItem
 * Title
 * TODO: Upvotes, Descriptions, Link
 */
// -------------------- CREATE NEW STACK LIST GROUP ITEMS AS A <DIV> WITH A TITLE, DESCRIPTION, URL, AND UPVOTES ---------------------
function newStackListItem(id, title, desc, linkURL, votes) {
    listGroupItem = $("<div></div>").addClass("list-group-item hackathonListGroupItem");
    
    listGroupItem.append(newObjectId(id));
    listGroupItem.append(newUpvoteBox(votes));
    listGroupItem.append(newHackInfoTag(title, desc, linkURL));
    
    return listGroupItem;
}

function newObjectId(id) {
    objectId = $("<span></span>").addClass("hackID hidden").text(id);
    
    return objectId;
}
//    <div class="upvoteBox">
//      <button class="upvotePlus" id="plus" onclick="upvote()">
//        <span class="glyphicon glyphicon-chevron-up" aria-hidden="true"></span>
//        <span id="count">2</span>
//      </button>
//    </div>

// ------------------------------------ CREATE NEW UPVOTE BOX WITHIN LIST GROUP ITEM AS A <DIV> -------------------------------------
function newUpvoteBox(initialVotes) {
    upvoteDiv = $("<div></div>").addClass("upvoteBox");
    
    upvoteButton = $("<button></button>").addClass("upvotePlus").attr('id', 'plus');
    upvoteButton.click(upvote);
    
    upvoteArrow = $("<span></span>").addClass("glyphicon glyphicon-chevron-up").attr('aria-hidden', 'true');
    upvoteCount = $("<span></span>").attr('id', 'count').text(initialVotes);
    
    upvoteButton.append(upvoteArrow).append(upvoteCount);
    upvoteDiv.append(upvoteButton);
    
    return upvoteDiv;  
}

/* Creates something like:

<div class="hack-info" style="display:inline;">
  <h4 class="list-group-item-heading;" id="title"></h4>
  <p class="list-group-item-text" id="description">printing historical chocolatey goodness in 3D!!!!</p>
</div>
*/
// --------------------------------- CREATE TITLE AND DESCRIPTION WITHIN LIST GROUP ITEM AS AN <A> -------------------------------------
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

// --------------------------- ADDS 1 UPVOTE TO THE COUNT EVERY TIME THE UPVOTE BUTTON IS PRESSED -------------------------------------
function upvote() {
//    var Posts = Parse.Object.extend("Posts");
//   
//	var posts = new Posts();
    
    button = this;
    console.log("upvote executed");
    
    // only works for one #count, not dynamic
    /*
    var currentVotes = parseInt($("#count").text());
    currentVotes++;
    var stringVotes = currentVotes.toString();
    $("#count").text(stringVotes);
    */
    
    // increase the button's span#count 
    countTag = $(button).find("#count")[0];
    newCount = parseInt(countTag.innerHTML) + 1;
    $(countTag).text(newCount.toString());
    
    // note these three lines
    objectIdSpans = $(this).parent().parent().children('.hackID');
    objectIdSpan = objectIdSpans[0];
    objectId = objectIdSpan.innerHTML;
    
    var Posts = Parse.Object.extend("Posts");
    var query = new Parse.Query(Posts);
    
    query.get(objectId, {
        success: function(posts) {
            posts.set("Upvotes", newCount);
            posts.save(null, {
                success: function(posts) {
                    console.log(posts.get('Title') + " upvotes updated to " + posts.get('Upvotes'));
                    location.reload();
                }
            });
            
        },
        error: function(object, error) {
            console.log("Some shit went down");
        }
    });

    
    
    
   
    
//    posts.save ({
//        success: function(posts) {
//        
//        },
//        error: function(posts, error) {
//        }
//    });
}

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