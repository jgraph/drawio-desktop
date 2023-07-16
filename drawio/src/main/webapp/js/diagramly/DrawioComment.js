
DrawioComment = function(file, id, content, modifiedDate, createdDate, isResolved, user)
{
	// The file having this comment 
	this.file = file;
	
	// Unique ID
	this.id = id;
	
	// Comment contents
	this.content = content;
	
	// Comment modified date
	this.modifiedDate = modifiedDate;
	
	// Comment created date
	this.createdDate = createdDate;
	
	// Is comment resolved
	this.isResolved = isResolved;
	
	// User created this comment
	// Type: DrawioUser
	this.user = user;
	
	this.replies = [];
};

DrawioComment.prototype.addReplyDirect = function(reply)
{
	if (reply != null)
		this.replies.push(reply);
};

DrawioComment.prototype.addReply = function(reply, success, error, doResolve, doReopen)
{
	//Placeholder
	success();
};

DrawioComment.prototype.editComment = function(newContent, success, error)
{
	//Placeholder
	success();
};

DrawioComment.prototype.deleteComment = function(success, error)
{
	//Placeholder
	success();
};
