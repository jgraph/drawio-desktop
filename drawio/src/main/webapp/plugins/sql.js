/**
 * Parse SQL CREATE TABLE. Simple initial version for community to improve.
 */
Draw.loadPlugin(function(ui) {

    function TableModel() {
        this.Name = null;
        this.Properties = []
    }

    function PropertyModel() {
        this.Name = null;
        this.Value = null;
        this.TableName = null;
        this.ForeignKey = [];
        this.IsPrimaryKey = false;
        this.IsForeignKey = false;
    }

    function ForeignKeyModel() {
        this.PrimaryKeyName = null;
        this.ReferencesPropertyName = null

        this.PrimaryKeyTableName = null;
        this.ReferencesTableName = null;

        this.IsDestination = false;
    }

    function PrimaryKeyModel() {
        this.PrimaryKeyName = null;
        this.PrimaryKeyTableName = null;
    }

    //SQL Types
    var SQLServer = 'sqlserver';

    //SQL Modes
    var MODE_SQLSERVER = null;

    //Table Info
    var foreignKeyList = [];
    var primaryKeyList = [];
    var tableList = [];
    var cells = [];
    var tableCell = null;
    var rowCell = null;
    var dx = 0;
    var exportedTables = 0;


    //Create Base div
    var div = document.createElement('div');
    div.style.userSelect = 'none';
    div.style.overflow = 'hidden';
    div.style.padding = '10px';
    div.style.height = '100%';

    var graph = ui.editor.graph;

    var sqlInput = document.createElement('textarea');
    sqlInput.style.height = '200px';
    sqlInput.style.width = '100%';
    sqlInput.value = 'CREATE TABLE Persons\n(\nPersonID int,\nLastName varchar(255),\n' +
        'FirstName varchar(255),\nAddress varchar(255),\nCity varchar(255)\n);';
    mxUtils.br(div);
    div.appendChild(sqlInput);

    var graph = ui.editor.graph;

    // Extends Extras menu
    mxResources.parse('fromSql=From SQL');

    var wnd = new mxWindow(mxResources.get('fromSql'), div, document.body.offsetWidth - 480, 140,
        320, 300, true, true);
    wnd.destroyOnClose = false;
    wnd.setMaximizable(false);
    wnd.setResizable(false);
    wnd.setClosable(true);

    function AddRow(propertyModel, tableName) {

        var cellName = propertyModel.Name;

        if (propertyModel.IsForeignKey && propertyModel.ForeignKey !== undefined && propertyModel.ForeignKey !== null) {
            propertyModel.ForeignKey.forEach(function(foreignKeyModel) {

                //We do not want the foreign key to be duplicated in our table to the same property
                if (tableName !== foreignKeyModel.PrimaryKeyTableName || (tableName === foreignKeyModel.PrimaryKeyTableName && propertyModel.Name !== foreignKeyModel.PrimaryKeyName)) {
                    cellName += ' | ' + foreignKeyModel.PrimaryKeyTableName + '(' + foreignKeyModel.PrimaryKeyName + ')';
                }
            })
        }

        rowCell = new mxCell(cellName, new mxGeometry(0, 0, 90, 26),
            'shape=partialRectangle;top=0;left=0;right=0;bottom=0;align=left;verticalAlign=top;spacingTop=-2;fillColor=none;spacingLeft=64;spacingRight=4;overflow=hidden;rotatable=0;points=[[0,0.5],[1,0.5]];portConstraint=eastwest;dropTarget=0;');
        rowCell.vertex = true;

        var columnType = propertyModel.IsPrimaryKey && propertyModel.IsForeignKey ? 'PK | FK' : propertyModel.IsPrimaryKey ? 'PK' : propertyModel.IsForeignKey ? 'FK' : '';

        var left = sb.cloneCell(rowCell, columnType);
        left.connectable = false;
        left.style = 'shape=partialRectangle;top=0;left=0;bottom=0;fillColor=none;align=left;verticalAlign=middle;spacingLeft=4;spacingRight=4;overflow=hidden;rotatable=180;points=[];portConstraint=eastwest;part=1;'
        left.geometry.width = 54;
        left.geometry.height = 26;
        rowCell.insert(left);

        var size = ui.editor.graph.getPreferredSizeForCell(rowCell);

        if (size !== null && tableCell.geometry.width < size.width + 10) {
            tableCell.geometry.width = size.width + 10;
        }

        tableCell.insert(rowCell);
        tableCell.geometry.height += 26;

        rowCell = rowCell;

    };

    function ParseMySQLForeignKey(name, currentTableModel) {
        var referencesIndex = name.toLowerCase().indexOf("references");
        var foreignKeySQL = name.substring(0, referencesIndex);
        var referencesSQL = name.substring(referencesIndex, name.length);

        //Remove references syntax
        referencesSQL = referencesSQL.replace("REFERENCES ", '');

        //Get Table and Property Index
        var referencedTableIndex = referencesSQL.indexOf("(");
        var referencedPropertyIndex = referencesSQL.indexOf(")");

        //Get Referenced Table
        var referencedTableName = referencesSQL.substring(0, referencedTableIndex);

        //Get Referenced Key
        var referencedPropertyName = referencesSQL.substring(referencedTableIndex + 1, referencedPropertyIndex);

        //Get ForeignKey 
        var foreignKey = foreignKeySQL.replace("FOREIGN KEY (", '').replace(")", '').replace(" ", '');

        //Create ForeignKey
        var foreignKeyOriginModel = CreateForeignKey(foreignKey, currentTableModel.Name, referencedPropertyName, referencedTableName, true);

        //Add ForeignKey Origin
        foreignKeyList.push(foreignKeyOriginModel);

        //Create ForeignKey
        var foreignKeyDestinationModel = CreateForeignKey(referencedPropertyName, referencedTableName, foreignKey, currentTableModel.Name, false);

        //Add ForeignKey Destination
        foreignKeyList.push(foreignKeyDestinationModel);
    };

    function ParseSQLServerForeignKey(name, currentTableModel) {
        var referencesIndex = name.toLowerCase().indexOf("references");

        if (name.toLowerCase().indexOf("foreign key(") !== -1) {
            var foreignKeySQL = name.substring(name.toLowerCase().indexOf("foreign key("), referencesIndex).replace("FOREIGN KEY(", '').replace(')', '');
        } else {
            var foreignKeySQL = name.substring(name.toLowerCase().indexOf("foreign key ("), referencesIndex).replace("FOREIGN KEY (", '').replace(')', '');
        }

        var referencesSQL = name.substring(referencesIndex, name.length);
        var alterTableName = name.substring(0, name.indexOf("WITH")).replace('ALTER TABLE ', '');

        if (referencesIndex !== -1 && alterTableName !== '' && foreignKeySQL !== '' && referencesSQL !== '') {

            //Remove references syntax
            referencesSQL = referencesSQL.replace("REFERENCES ", '');

            //Get Table and Property Index
            var referencedTableIndex = referencesSQL.indexOf("(");
            var referencedPropertyIndex = referencesSQL.indexOf(")");

            //Get Referenced Table
            var referencedTableName = referencesSQL.substring(0, referencedTableIndex);

            //Parse Name
            referencedTableName = ParseSQLServerName(referencedTableName);

            //Get Referenced Key
            var referencedPropertyName = referencesSQL.substring(referencedTableIndex + 1, referencedPropertyIndex);

            //Parse Name
            referencedPropertyName = ParseSQLServerName(referencedPropertyName);

            //Get ForeignKey 
            var foreignKey = foreignKeySQL.replace("FOREIGN KEY (", '').replace(")", '');

            //Parse Name
            foreignKey = ParseSQLServerName(foreignKey);

            //Parse Name
            alterTableName = ParseSQLServerName(alterTableName);

            //Create ForeignKey
            var foreignKeyOriginModel = CreateForeignKey(foreignKey, alterTableName, referencedPropertyName, referencedTableName, true);

            //Add ForeignKey Origin
            foreignKeyList.push(foreignKeyOriginModel);

            //Create ForeignKey
            var foreignKeyDestinationModel = CreateForeignKey(referencedPropertyName, referencedTableName, foreignKey, alterTableName, false);

            //Add ForeignKey Destination
            foreignKeyList.push(foreignKeyDestinationModel);
        }
    };

    function ProcessPrimaryKey() {

        primaryKeyList.forEach(function(primaryModel) {
            tableList.forEach(function(tableModel) {
                if (tableModel.Name === primaryModel.PrimaryKeyTableName) {
                    tableModel.Properties.forEach(function(propertyModel) {
                        if (propertyModel.Name === primaryModel.PrimaryKeyName) {
                            propertyModel.IsPrimaryKey = true;
                        }
                    });
                }
            });
        });
    }

    function AssignForeignKey(foreignKeyModel) {
        tableList.forEach(function(tableModel) {
            if (tableModel.Name === foreignKeyModel.ReferencesTableName) {
                tableModel.Properties.forEach(function(propertyModel) {
                    if (propertyModel.Name === foreignKeyModel.ReferencesPropertyName) {
                        propertyModel.IsForeignKey = true;
                        propertyModel.ForeignKey.push(foreignKeyModel);
                    }
                });
            }

            if (tableModel.Name === foreignKeyModel.PrimaryKeyTableName) {
                tableModel.Properties.forEach(function(propertyModel) {
                    if (propertyModel.Name === foreignKeyModel.PrimaryKeyName) {
                        propertyModel.IsForeignKey = true;
                        propertyModel.ForeignKey.push(foreignKeyModel);
                    }
                });
            }
        });
    }

    function ProcessForeignKey() {

        foreignKeyList.forEach(function(foreignKeyModel) {
            //Assign ForeignKey
            AssignForeignKey(foreignKeyModel);
        });
    }

    function CreateForeignKey(primaryKeyName, primaryKeyTableName, referencesPropertyName, referencesTableName, isDestination) {
        var foreignKey = new ForeignKeyModel;

        foreignKey.PrimaryKeyTableName = primaryKeyTableName;
        foreignKey.PrimaryKeyName = primaryKeyName;
        foreignKey.ReferencesPropertyName = referencesPropertyName;
        foreignKey.ReferencesTableName = referencesTableName;
        foreignKey.IsDestination = (isDestination !== undefined && isDestination !== null) ? isDestination : false;

        return foreignKey;
    };

    function CreatePrimaryKey(primaryKeyName, primaryKeyTableName) {
        var primaryKey = new PrimaryKeyModel;

        primaryKey.PrimaryKeyTableName = primaryKeyTableName;
        primaryKey.PrimaryKeyName = primaryKeyName;

        return primaryKey;
    };

    function CreateProperty(name, tableName, foreignKey, isPrimaryKey) {
        var property = new PropertyModel;
        var isForeignKey = foreignKey !== undefined && foreignKey !== null;

        property.Name = name;
        property.TableName = tableName;
        property.ForeignKey = isForeignKey ? foreignKey : [];
        property.IsForeignKey = isForeignKey;
        property.IsPrimaryKey = isPrimaryKey;

        return property;
    };

    function CreateTable(name) {
        var table = new TableModel;

        table.Name = name;

        //Count exported tables
        exportedTables++;

        return table;
    };

    function ParseSQLServerName(name, property) {
        name = name.replace('[dbo].[', '');
        name = name.replace('](', '');
        name = name.replace('].[', '.');
        name = name.replace('[', '');

        if (property == undefined || property == null) {
            name = name.replace(' [', '');
            name = name.replace('] ', '');
        } else {
            if (name.indexOf(']') !== -1) {
                name = name.substring(0, name.indexOf(']'));
            }
        }

        if (name.lastIndexOf(']') === (name.length - 1)) {
            name = name.substring(0, name.length - 1);
        }

        if (name.lastIndexOf(')') === (name.length - 1)) {
            name = name.substring(0, name.length - 1);
        }

        if (name.lastIndexOf('(') === (name.length - 1)) {
            name = name.substring(0, name.length - 1);
        }

        name = name.replace(' ', '');

        return name;
    };

    function ParseTableName(name) {
        if (name.charAt(name.length - 1) === '(') {
            if (!MODE_SQLSERVER) {
                name = name.substring(0, name.lastIndexOf(' '));
            } else {
                name = ParseSQLServerName(name);
            }
        }

        return name;
    };

    function parseSql(text, type) {
        var lines = text.split('\n');
        dx = 0;
        MODE_SQLSERVER = type !== undefined && type !== null && type == SQLServer;

        tableCell = null;
        cells = [];
        exportedTables = 0;
        tableList = [];
        foreignKeyList = [];

        var currentTableModel = null;

        //Parse SQL to objects
        for (var i = 0; i < lines.length; i++) {

            rowCell = null;

            var tmp = mxUtils.trim(lines[i]);

            var propertyRow = tmp.substring(0, 12).toLowerCase();

            //Parse Table
            if (propertyRow === 'create table') {

                //Parse row
                var name = mxUtils.trim(tmp.substring(12));

                //Parse Table Name
                name = ParseTableName(name);

                if (currentTableModel !== null) {
                    //Add table to the list
                    tableList.push(currentTableModel);
                }

                //Create Table
                currentTableModel = CreateTable(name);
            }
            // Parse Properties 
            else if (tmp !== '(' && currentTableModel != null && propertyRow !== 'alter table ') {

                //Parse the row
                var name = tmp.substring(0, (tmp.charAt(tmp.length - 1) === ',') ? tmp.length - 1 : tmp.length);

                //Attempt to get the Key Type
                var propertyType = name.substring(0, 11).toLowerCase();

                //Add special constraints
                if (MODE_SQLSERVER) {
                    if (tmp.indexOf("CONSTRAINT") !== -1 && tmp.indexOf("PRIMARY KEY") !== -1) {
                        propertyType = "constrain primary key";
                    }

                    if (tmp.indexOf("CONSTRAINT") !== -1 && tmp.indexOf("FOREIGN KEY") !== -1) {
                        propertyType = "constrain foreign key";
                    }
                }

                //Verify if this is a property that doesn't have a relationship (One minute of silence for the property)
                var normalProperty = propertyType !== 'primary key' && propertyType !== 'foreign key' && propertyType !== 'constrain primary key' && propertyType !== 'constrain foreign key';

                //Parse properties that don't have relationships
                if (normalProperty) {

                    if (name === '' || name === "" || name === ");") {
                        continue;
                    }

                    if (MODE_SQLSERVER) {
                        if (name.indexOf(" ASC") !== -1 ||
                            name.indexOf(" DESC") !== -1 ||
                            name.indexOf(" EXEC") !== -1 ||
                            name.indexOf(" WITH") !== -1 ||
                            name.indexOf(" ON") !== -1 ||
                            name.indexOf(" ALTER") !== -1 ||
                            name.indexOf("/*") !== -1 ||
                            name.indexOf(" CONSTRAIN") !== -1 ||
                            name.indexOf(" SET") !== -1 ||
                            name.indexOf(" NONCLUSTERED") !== -1 ||
                            name.indexOf(" GO") !== -1 ||
                            name.indexOf(" REFERENCES") !== -1) {
                            continue;
                        }
                        //Get delimiter of column name
                        var firstSpaceIndex = name.indexOf(' ');

                        //Get full name
                        name = name.substring(0, firstSpaceIndex);

                        name = ParseSQLServerName(name, true);
                    } else {
                        //Get delimiter of column name
                        var firstSpaceIndex = name.indexOf(' ');

                        //Get full name
                        name = name.substring(0, firstSpaceIndex);
                    }

                    //Create Property
                    var propertyModel = CreateProperty(name, currentTableModel.Name, null, false, false);

                    //Add Property to table
                    currentTableModel.Properties.push(propertyModel);
                }

                //Parse Primary Key
                if (propertyType === 'primary key' || propertyType === 'constrain primary key') {
                    if (!MODE_SQLSERVER) {
                        var primaryKey = name.replace('PRIMARY KEY (', '').replace(')', '');

                        //Create Primary Key
                        var primaryKeyModel = CreatePrimaryKey(primaryKey, currentTableModel.Name);

                        //Add Primary Key to List
                        primaryKeyList.push(primaryKeyModel);

                    } else {
                        var start = i + 2;
                        var end = 0;
                        if (name.indexOf('PRIMARY KEY') !== -1 && name.indexOf('CLUSTERED') === -1) {
                            var primaryKey = name.replace('PRIMARY KEY (', '').replace(')', '');

                            //Create Primary Key
                            var primaryKeyModel = CreatePrimaryKey(primaryKey, currentTableModel.Name);

                            //Add Primary Key to List
                            primaryKeyList.push(primaryKeyModel);

                        } else {
                            while (end === 0) {
                                var primaryKeyRow = mxUtils.trim(lines[start]);

                                if (primaryKeyRow.indexOf(')') !== -1) {
                                    end = 1;
                                    break;
                                }

                                start++;

                                primaryKeyRow = primaryKeyRow.replace("ASC", '');

                                //Parse name
                                primaryKeyRow = ParseSQLServerName(primaryKeyRow, true);

                                //Create Primary Key
                                var primaryKeyModel = CreatePrimaryKey(primaryKeyRow, currentTableModel.Name);

                                //Add Primary Key to List
                                primaryKeyList.push(primaryKeyModel);
                            }
                        }

                    }
                }

                //Parse Foreign Key
                if (propertyType === 'foreign key' || propertyType === 'constrain foreign key') {
                    if (!MODE_SQLSERVER) {
                        ParseMySQLForeignKey(name, currentTableModel);
                    } else {
                        var completeRow = name;

                        if (name.indexOf('REFERENCES') === -1) {
                            var referencesRow = mxUtils.trim(lines[i + 1]);
                            completeRow = 'ALTER TABLE [dbo].[' + currentTableModel.Name + ']  WITH CHECK ADD' + ' ' + name + ' ' + referencesRow;
                        }

                        ParseSQLServerForeignKey(completeRow, currentTableModel);

                    }
                }

            } else if (propertyRow === 'alter table ') {

                if (MODE_SQLSERVER) {
                    //Parse the row
                    var alterTableRow = tmp.substring(0, (tmp.charAt(tmp.length - 1) === ',') ? tmp.length - 1 : tmp.length);
                    var referencesRow = mxUtils.trim(lines[i + 1]);
                    var completeRow = alterTableRow + ' ' + referencesRow;

                    ParseSQLServerForeignKey(completeRow, currentTableModel);
                }
            }
        }

        //Add last table
        if (currentTableModel !== null) {
            //Add table to the list
            tableList.push(currentTableModel);
        }

        //Process Primary Keys
        ProcessPrimaryKey();

        //Process Foreign Keys
        ProcessForeignKey();

        //Create Table in UI
        CreateTableUI();
    };

    function CreateTableUI() {

        tableList.forEach(function(tableModel) {
            //Define table size width
            var maxNameLenght = 100 + tableModel.Name.length;

            //Create Table
            tableCell = new mxCell(tableModel.Name, new mxGeometry(dx, 0, maxNameLenght, 26),
                'swimlane;fontStyle=0;childLayout=stackLayout;horizontal=1;startSize=26;fillColor=default;horizontalStack=0;resizeParent=1;resizeLast=0;collapsible=1;marginBottom=0;swimlaneFillColor=default;align=center;');
            tableCell.vertex = true;

            //Resize row
            var size = ui.editor.graph.getPreferredSizeForCell(rowCell);
            if (size !== null) {
                tableCell.geometry.width = size.width + maxNameLenght;
            }

            //Add Table to cells
            cells.push(tableCell);

            //Add properties
            tableModel.Properties.forEach(function(propertyModel) {

                //Add row
                AddRow(propertyModel, tableModel.Name);
            });

            //Close table
            dx += tableCell.geometry.width + 40;
            tableCell = null;
        });

        if (cells.length > 0) {
            var graph = ui.editor.graph;
            var view = graph.view;
            var bds = graph.getGraphBounds();
            
            // Computes unscaled, untranslated graph bounds
            var x = Math.ceil(Math.max(0, bds.x / view.scale - view.translate.x) + 4 * graph.gridSize);
            var y = Math.ceil(Math.max(0, (bds.y + bds.height) / view.scale - view.translate.y) + 4 * graph.gridSize);

            graph.setSelectionCells(graph.importCells(cells, x, y));
            graph.scrollCellToVisible(graph.getSelectionCell());
        }

        wnd.setVisible(false);
    };

    mxUtils.br(div);

    var resetBtn = mxUtils.button(mxResources.get('reset'), function()
    {
        sqlInput.value = '';
    });

    resetBtn.style.marginTop = '8px';
    resetBtn.style.marginRight = '4px';
    resetBtn.style.padding = '4px';
    div.appendChild(resetBtn);

    var btn = mxUtils.button('Insert MySQL', function()
    {
        try
        {
            parseSql(sqlInput.value);
        }
        catch (e)
        {
            ui.handleError(e);
        }
    });

    btn.style.marginTop = '8px';
    btn.style.padding = '4px';
    div.appendChild(btn);

    var btn = mxUtils.button('Insert SQL Server', function()
    {
        try
        {
            parseSql(sqlInput.value, 'sqlserver');
        }
        catch (e)
        {
            ui.handleError(e);
        }
    });

    btn.style.marginTop = '8px';
    btn.style.padding = '4px';
    div.appendChild(btn);

    // Adds action
    ui.actions.addAction('fromSql', function() {
        wnd.setVisible(!wnd.isVisible());

        if (wnd.isVisible()) {
            sqlInput.focus();
        }
    });

    var theMenu = ui.menus.get('insert');
    var oldMenu = theMenu.funct;

    theMenu.funct = function(menu, parent) {
        oldMenu.apply(this, arguments);

        ui.menus.addMenuItems(menu, ['fromSql'], parent);
    };
});