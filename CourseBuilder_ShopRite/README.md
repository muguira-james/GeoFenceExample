This is the first working version of the CourseBuilder.  

Is has 2 limitations:
It does not write to the local file system of the machine. It is a browser based app.  I might change it to Proton:React to make it an application that runs on the machine (vs in the browser)

The initial location (Latitude, Longitude) has to be set by a programmer.  This is easy to change – I just did not get around to it yet.
 
There is a simple help button, which shows at the very bottom of the control buttons.  

Yes, this could use some styling ☺.
 
It works on the concept of a hole configuration.  A hole configuration is the set (Tee, Fairway, Green).  At a minimum you have to input those 3 points.  The tool will calculate template locations.  It assumes 3 golfers at a location (either Tee, Fairway or Green).  If you don’t like the calculated spot you can drag and drop any icon you see and it will remember where you dropped the icon.
 
To use the save course button you have to open the developers console and cut/paste the course json to a file.  The tool can read its own generated json.
 
 
Here is a screen shot
 
