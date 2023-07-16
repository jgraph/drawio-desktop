DrawioFilePuller = function(file, sync)
{
    this.file = file;
    this.sync = sync;

};

DrawioFilePuller.prototype.start = function(pullingInterval)
{
    var updateStatus = mxUtils.bind(this, function()
    {
        this.sync.lastModified = this.file.getLastModifiedDate();
        this.sync.updateStatus();
    });

    this.intId = setInterval(mxUtils.bind(this, function()
    {
        this.file.getLatestVersionId(mxUtils.bind(this, function(latestVersionId)
        {
            if (latestVersionId != this.file.getCurrentRevisionId())
            {
                this.file.getLatestVersion(mxUtils.bind(this, function(latestFile)
                {
                    this.file.mergeFile(latestFile, updateStatus);
                }), mxUtils.bind(this, function()
                {
                    // TODO Error handling
                }));
            }
            else
            {
                updateStatus();
            }
        }), mxUtils.bind(this, function()
        {
            // TODO Error handling
        }));
    }), pullingInterval);

    this._isConnected = true;
};

DrawioFilePuller.prototype.stop = function()
{
    clearInterval(this.intId);
    this._isConnected = false;
};

DrawioFilePuller.prototype.isConnected = function()
{
    return this._isConnected;
};