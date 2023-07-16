DriveComment = function(file, id, content, modifiedDate, createdDate, isResolved, user, pCommentId)
{
	DrawioComment.call(this, file, id, content, modifiedDate, createdDate, isResolved, user);
	this.pCommentId = pCommentId; //a reply
};

//Extends DrawioComment
mxUtils.extend(DriveComment, DrawioComment);

DriveComment.prototype.addReply = function(reply, success, error, doResolve, doReopen)
{
	var body = {'content': reply.content};
	
	if (doResolve) 
	{
		body.verb = 'resolve';
	} 
	else if (doReopen) 
	{
		body.verb = 'reopen';
	}
	
	this.file.ui.drive.executeRequest(
		{
			url: '/files/' + this.file.getId() + '/comments/' + this.id + '/replies',
			params: body,
			method: 'POST'
		},
		mxUtils.bind(this, function(resp)
		{
			success(resp.replyId); //pass comment id
		}), error);
};

DriveComment.prototype.editComment = function(newContent, success, error)
{
	this.content = newContent;
	var body = {'content': newContent};
	 
	this.file.ui.drive.executeRequest(
		this.pCommentId?
		{
			url: '/files/' + this.file.getId() + '/comments/' + this.pCommentId + '/replies/' + this.id, 
			params: body,
			method: 'PATCH'
		} :
		{
			url: '/files/' + this.file.getId() + '/comments/' + this.id, 
			params: body,
			method: 'PATCH'
		},
	success, error);
};

DriveComment.prototype.deleteComment = function(success, error)
{
	this.file.ui.drive.executeRequest(
		this.pCommentId?
		{
			url: '/files/' + this.file.getId() + '/comments/' + this.pCommentId + '/replies/' + this.id,
			method: 'DELETE'
		}:
		{
			url: '/files/' + this.file.getId() + '/comments/' + this.id,
			method: 'DELETE'
		},
	success, error);
};
