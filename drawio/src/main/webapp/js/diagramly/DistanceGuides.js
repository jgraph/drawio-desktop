/**
 * Copyright (c) 2017, CTI LOGIC
 * Copyright (c) 2006-2017, JGraph Ltd
 * Copyright (c) 2006-2017, Gaudenz Alder
 * 
 * Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:
 *
 * 1. Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
 *
 * 2. Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
 *
 * 3. Neither the name of the copyright holder nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY 
 * AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL 
 * DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, 
 * WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

//TODO integrate this code in mxGuide (Especially as this is now affecting the other guides)
(function()
{
	var guideMove = mxGuide.prototype.move;
	
	mxGuide.prototype.move = function (bounds, delta, gridEnabled, clone)
	{
	    var yShift = delta.y;
	    var xShift = delta.x;
	    var hasHorGuides = false;
	    var hasVerGuides = false;
	
	    if (this.states != null && bounds != null && delta != null) 
	    {
	      var guide = this;
		  var newState = new mxCellState();
		  var scale = this.graph.getView().scale;
		  var tolerance = Math.max(2, this.getGuideTolerance() / 2);
		
		  newState.x = bounds.x + xShift;
		  newState.y = bounds.y + yShift;
		  newState.width = bounds.width;
		  newState.height = bounds.height;
		  var verticalCells = [];
		  var horizontalCells = [];
	      
	      //although states are defined as cellState, it has some mxRectangles!
	      var states = [];

	      for (var i = 0; i < this.states.length; i++)
		  {
	    	  var state = this.states[i];
	    	  var found = false;
	    	  
	    	  if (state instanceof mxCellState)
			  {
		    	  if (clone || !this.graph.isCellSelected(state.cell))
				  {
		    		  if (((newState.x >= state.x && newState.x <= (state.x + state.width))
		    	              || (state.x >= newState.x && state.x <= (newState.x + newState.width))) 
		    	              && (newState.y > state.y + state.height + 4|| newState.y + newState.height + 4 < state.y)) // + 4 to avoid having dy = 0 considered which cause a bug with 3 cells case
		    		  {
			            verticalCells.push(state);
			          }
		    		  else if (((newState.y >= state.y && newState.y <= (state.y + state.height))
				            || (state.y >= newState.y && state.y <= (newState.y + newState.height))) 
				            && (newState.x > state.x + state.width + 4 || newState.x + newState.width + 4 < state.x)) // + 4 to avoid having dy = 0 considered which cause a bug with 3 cells case
		    		  {
			            horizontalCells.push(state);
			          }
				  }
			  }
		  }
	      
	      var eqCy = 0;
	      var dy = 0;
	      var fixedDy = 0;
	      var midDy = 0;
	      var eqCx = 0;
	      var dx = 0;
	      var fixedDx = 0;
	      var midDx = 0;
	      var shift = 5 * scale;
	      
	      if (verticalCells.length > 1) 
	      {
	        verticalCells.push(newState);
	        
	        verticalCells.sort(function(s1, s2)
			{
	          return s1.y - s2.y;
	        });
	        
	        var newStatePassed = false;
            var firstMoving = newState == verticalCells[0];
            var lastMoving = newState == verticalCells[verticalCells.length - 1];
            
            //find the mid space and use it as dy and fixedDy
            if (!firstMoving && !lastMoving)
        	{
            	for (var i = 1; i < verticalCells.length - 1; i++)
    	  	  	{
            		if (newState == verticalCells[i])
        			{
            			var s1 = verticalCells[i - 1];
            			var s3 = verticalCells[i + 1];
            			midDy = (s3.y - s1.y - s1.height - newState.height) / 2;
            			dy = midDy;
            			fixedDy = dy;
            			break;
        			}
    	  	  	}
        	}
	        
	        for (var i = 0; i < verticalCells.length - 1; i++)
	  	  	{
	            var s1 = verticalCells[i];
	            var s2 = verticalCells[i + 1];
	            var isMovingOne = newState == s1 || newState == s2;
	            var curDy = s2.y - s1.y - s1.height;
	            
	            newStatePassed |= newState == s1;

	            if (dy == 0 && eqCy == 0)
	            {
	              dy = curDy;
	              eqCy = 1;
	            }
                else if (Math.abs(dy - curDy) <= (isMovingOne || (i == 1 && newStatePassed)? tolerance : 0)) //non-moving cells must have exact same dy, must handle the case of having the first cell moving so we allow tolerance for second cell (until fixedDy is non-zero) 
	            {
	              eqCy += 1;
	            }
	            else if (eqCy > 1 && newStatePassed) //stop and ignore the following cells
            	{
	              verticalCells = verticalCells.slice(0, i + 1);
	              break;
            	}
	            else if (verticalCells.length - i >= 3 && !newStatePassed) //reset and start counting again
            	{
	      	      eqCy = 0;
	    	      dy = midDy != 0? midDy : 0;
	    	      fixedDy = dy;
	    	      verticalCells.splice(0, i == 0? 1 : i);
	    	      i = -1;
            	}
	            else
            	{
		          break;
            	}

	            if (fixedDy == 0 && !isMovingOne)
	        	{
	            	fixedDy = curDy;
	            	//Update dy such that following cells shows equal distance guides without tolerance
	            	dy = fixedDy;
	        	}
	  	  	}
	        
            if (verticalCells.length == 3 && verticalCells[1] == newState) 
        	{
              fixedDy = 0;
        	}
	      }
	      
	      if (horizontalCells.length > 1) 
	      {
	        horizontalCells.push(newState)
	        
	        horizontalCells.sort(function(s1, s2)
			{
	          return s1.x - s2.x;
	        });
	
	        var newStatePassed = false;
            var firstMoving = newState == horizontalCells[0];
            var lastMoving = newState == horizontalCells[horizontalCells.length - 1];
	        
            //find the mid space and use it as dx and fixedDx
            if (!firstMoving && !lastMoving)
        	{
            	for (var i = 1; i < horizontalCells.length - 1; i++)
    	  	  	{
            		if (newState == horizontalCells[i])
        			{
            			var s1 = horizontalCells[i - 1];
            			var s3 = horizontalCells[i + 1];
            			midDx = (s3.x - s1.x - s1.width - newState.width) / 2;
            			dx = midDx;
            			fixedDx = dx;
            			break;
        			}
    	  	  	}
        	}            
            
	        for (var i = 0; i < horizontalCells.length - 1; i++)
	  	  	{
	            var s1 = horizontalCells[i];
	            var s2 = horizontalCells[i + 1];
	            var isMovingOne = newState == s1 || newState == s2;
	            var curDx = s2.x - s1.x - s1.width;
	            
	            newStatePassed |= newState == s1;
	            
	            if (dx == 0 && eqCx == 0) 
	            {
	              dx = curDx;
	              eqCx = 1;
	            }
                else if (Math.abs(dx - curDx) <= (isMovingOne || (i == 1 && newStatePassed)? tolerance : 0)) 
	            {
	              eqCx += 1;
	            }
	            else if (eqCx > 1 && newStatePassed) //stop and ignore the following cells
            	{
	              horizontalCells = horizontalCells.slice(0, i + 1);
	              break;
            	}
	            else if (horizontalCells.length - i >= 3 && !newStatePassed) //reset and start counting again
            	{
	      	      eqCx = 0;
	    	      dx = midDx != 0? midDx : 0;
	    	      fixedDx = dx;
	    	      horizontalCells.splice(0, i == 0? 1 : i);
	    	      i = -1;
            	}
	            else
            	{
		          break;
            	}

	            if (fixedDx == 0 && !isMovingOne)
	        	{
	            	fixedDx = curDx;
	            	//Update dx such that following cells shows equal distance guides without tolerance
	            	dx = fixedDx;
	        	}
	  	  	}
	        if (horizontalCells.length == 3 && horizontalCells[1] == newState) 
        	{
              fixedDx = 0;
        	}
	      }
	      
	      var createEqGuide = function(p1, p2, curGuide, isVer)
	      {
	        var points = [];
	        var dx = 0
	        var dy = 0;
	        
	        if (isVer) 
	        {
	          dx = shift;
	          dy = 0;
	        }
	        else 
	        {
	          dx = 0;
	          dy = shift;
	        }
	        
	        points.push(new mxPoint(p1.x - dx, p1.y - dy));
	        points.push(new mxPoint(p1.x + dx, p1.y + dy));
	        points.push(p1);
	        points.push(p2);
	        points.push(new mxPoint(p2.x - dx, p2.y - dy));
	        points.push(new mxPoint(p2.x + dx, p2.y + dy));
	
	        if (curGuide != null) 
	        {
	          curGuide.points = points;
	          return curGuide;
	        }
	        else
	        {
	          var guideEq = new mxPolyline(points, mxConstants.GUIDE_COLOR, mxConstants.GUIDE_STROKEWIDTH);
	          guideEq.dialect = mxConstants.DIALECT_SVG;
	          guideEq.pointerEvents = false;
	          guideEq.init(guide.graph.getView().getOverlayPane());
	          return guideEq;
	        }
	      };

	      var hideEqGuides = function(horizontal, vertical)
	      {
	    	  if (horizontal && guide.guidesArrHor != null) 
	    	  {
		    	  for (var i = 0; i < guide.guidesArrHor.length; i++)
		          {
		    		  guide.guidesArrHor[i].node.style.visibility = "hidden";
		          }
	    	  }
	    	  
	    	  if (vertical && guide.guidesArrVer != null)
    		  {
		    	  for (var i = 0; i < guide.guidesArrVer.length; i++) 
		          {
		    		  guide.guidesArrVer[i].node.style.visibility = "hidden";
		          }
    		  }
	      };
	      
	      if (eqCx > 1 && eqCx == horizontalCells.length - 1) 
	      {
	        var guidesArr = [];
	        var curArr = guide.guidesArrHor;
	        var hPoints = [];
	        var newX = 0;
	        
	        //If the newState (moving cell) is the first one, use the next one for x coordinate such that the guide doesn't move with the cell
	        var firstI = horizontalCells[0] == newState? 1 : 0;
	        var firstY = horizontalCells[firstI].y + horizontalCells[firstI].height;
	
	        if (fixedDx > 0)
			{
	            for (var i = 0; i < horizontalCells.length - 1; i++)
	      	  	{
	                var s1 = horizontalCells[i];
	                var s2 = horizontalCells[i + 1];
	                
	        		if (newState == s1)
	    			{
	        			newX = s2.x - s1.width - fixedDx;
	        			hPoints.push(new mxPoint(newX + s1.width + shift, firstY));
	                    hPoints.push(new mxPoint(s2.x - shift, firstY));
	    			}
	        		else if (newState == s2)
	    			{
	        			hPoints.push(new mxPoint(s1.x + s1.width + shift, firstY));
	        			newX = s1.x + s1.width + fixedDx;
	        			hPoints.push(new mxPoint(newX - shift, firstY));
	    			}
	        		else
	    			{
	        			hPoints.push(new mxPoint(s1.x + s1.width + shift, firstY));
	                    hPoints.push(new mxPoint(s2.x - shift, firstY));
	    			}
	            }
			}
	        else //this is the case when there are 3 cells and the middle one is moving
	    	{
	        	var s1 = horizontalCells[0];
	            var s3 = horizontalCells[2];
				newX = s1.x + s1.width + (s3.x - s1.x - s1.width - newState.width) / 2;
				hPoints.push(new mxPoint(s1.x + s1.width + shift, firstY));
	            hPoints.push(new mxPoint(newX - shift, firstY));
				hPoints.push(new mxPoint(newX + newState.width + shift, firstY));
	            hPoints.push(new mxPoint(s3.x - shift, firstY));
	    	}
	        
	        for (var i = 0; i < hPoints.length; i += 2) 
	        {
	          var p1 = hPoints[i];
	          var p2 = hPoints[i+1];
	          var guideEq = createEqGuide(p1, p2, curArr != null ? curArr[i/2] : null);
	          guideEq.node.style.visibility = "visible";
	          guideEq.redraw();
	          guidesArr.push(guideEq);
	        }
	        
	        //destroy old non-recycled guides 
	        for (var i = hPoints.length / 2; curArr != null && i < curArr.length; i ++)
	        {
	        	curArr[i].destroy();
	        }
	        
	        guide.guidesArrHor = guidesArr;
	        
	        xShift = newX - bounds.x;
	        hasHorGuides = true;
	      }
	      else 
	      {
	    	  hideEqGuides(true);
	      }
	      
	      if (eqCy > 1 && eqCy == verticalCells.length - 1) 
	      {
	        var guidesArr = [];
	        var curArr = guide.guidesArrVer;
	        var vPoints = [];
	        var newY = 0;
	        
	        //If the newState (moving cell) is the first one, use the next one for x coordinate such that the guide doesn't move with the cell
	        var firstI = verticalCells[0] == newState? 1 : 0;
	        var firstX = verticalCells[firstI].x + verticalCells[firstI].width;
	
	        if (fixedDy > 0)
			{
		        for (var i = 0; i < verticalCells.length - 1; i++)
		  	  	{
		        	var s1 = verticalCells[i];
		            var s2 = verticalCells[i + 1];
		            
	        		if (newState == s1)
	    			{
	        			newY = s2.y - s1.height - fixedDy;
	        			vPoints.push(new mxPoint(firstX, newY + s1.height + shift));
						vPoints.push(new mxPoint(firstX, s2.y - shift));
	    			}
	        		else if (newState == s2)
	    			{
						vPoints.push(new mxPoint(firstX, s1.y + s1.height + shift));
	        			newY = s1.y + s1.height + fixedDy;
	        			vPoints.push(new mxPoint(firstX, newY - shift));
	    			}
	        		else
	    			{
						vPoints.push(new mxPoint(firstX, s1.y + s1.height + shift));
						vPoints.push(new mxPoint(firstX, s2.y - shift));
	    			}
	    		}
			}
	    	else //this is the case when there are 3 cells and the middle one is moving
			{
	        	var s1 = verticalCells[0];
	            var s3 = verticalCells[2];
				newY = s1.y + s1.height + (s3.y - s1.y - s1.height - newState.height) / 2;
				vPoints.push(new mxPoint(firstX, s1.y + s1.height + shift));
				vPoints.push(new mxPoint(firstX, newY - shift));
				vPoints.push(new mxPoint(firstX, newY + newState.height + shift));
				vPoints.push(new mxPoint(firstX, s3.y - shift));
			}
	
	        for (var i = 0; i < vPoints.length; i += 2)
	        {
	          var p1 = vPoints[i];
	          var p2 = vPoints[i+1];
	          var guideEq = createEqGuide(p1, p2, curArr != null ? curArr[i/2] : null, true);
	          guideEq.node.style.visibility = "visible";
	          guideEq.redraw();
	          guidesArr.push(guideEq);
	        }

	        //destroy old non-recycled guides 
	        for (var i = vPoints.length / 2; curArr != null && i < curArr.length; i ++)
	        {
	        	curArr[i].destroy();
	        }
	        
	        guide.guidesArrVer = guidesArr;
	        
	        yShift = newY - bounds.y;
	        hasVerGuides = true;
	      } 
	      else
	      {
	    	  hideEqGuides(false, true);
	      }
	    }
	    
	    if (hasHorGuides || hasVerGuides)
    	{
	    	var eqPoint = new mxPoint(xShift, yShift);
	    	var newPoint = guideMove.call(this, bounds, eqPoint, gridEnabled, clone);
	    	
	    	//Adjust our point to match non-conflicting other guides
	    	if (hasHorGuides && !hasVerGuides) 
			{
	    		eqPoint.y = newPoint.y;
			}
	    	else if (hasVerGuides && !hasHorGuides) 
			{
	    		eqPoint.x = newPoint.x;
			}

    		//Hide other guide if this guide overrides them
    		if (newPoint.y != eqPoint.y)
    		{
    			if (this.guideY != null && this.guideY.node != null)
    			{
    				this.guideY.node.style.visibility = 'hidden';
    			}
    		}	
    		if (newPoint.x != eqPoint.x)
    		{
    			if (this.guideX != null && this.guideX.node != null)
    			{
    				this.guideX.node.style.visibility = 'hidden';
    			}
    		}	

	    	return eqPoint;
    	}
	    else
    	{
	    	hideEqGuides(true, true);
	    	return guideMove.apply(this, arguments);
    	}
	};
	
	var guideSetVisible = mxGuide.prototype.setVisible;
	
	mxGuide.prototype.setVisible = function (visible)
	{
		var guide = this;
		guideSetVisible.call(guide, visible);
	    
	    var guidesArrVer = guide.guidesArrVer;
	    var guidesArrHor = guide.guidesArrHor;
	    
	    if (guidesArrVer != null) 
	    {
	      for (var i = 0; i < guidesArrVer.length; i++)
		  {
	    	  guidesArrVer[i].node.style.visibility = visible? "visible" : "hidden";
		  }
	    }
	    
	    if (guidesArrHor != null) 
	    {
	      for (var i = 0; i < guidesArrHor.length; i++)
	  	  {
	    	  guidesArrHor[i].node.style.visibility = visible? "visible" : "hidden";
	  	  }
	    }
	};
	
	var guideDestroy = mxGuide.prototype.destroy;
	
	mxGuide.prototype.destroy = function()
	{
		guideDestroy.call(this);
	    var guidesArrVer = this.guidesArrVer;
	    var guidesArrHor = this.guidesArrHor;
	    
	    if (guidesArrVer != null)
	    {
	    	for (var i = 0; i < guidesArrVer.length; i++)
	    	{
	    		guidesArrVer[i].destroy();
	    	}
	    	this.guidesArrVer = null;
	    }
	    
	    if (guidesArrHor != null)
	    {
	    	for (var i = 0; i < guidesArrHor.length; i++)
	    	{
	    		guidesArrHor[i].destroy();
	    	}
	    	this.guidesArrHor = null;
	    }
	};
})();