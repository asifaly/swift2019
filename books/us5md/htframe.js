<!-- When a body page is set in the query string, load it in the body frame


// Global variables
var idMap = new Array();    // (???)
var helpIdStr = 'helpid=' ;
var helpIdLen = helpIdStr.length ;
var subPagStr = 'subpage=' ;
var subPagLen = subPagStr.length ;


//This method returns the URL of the subpage to load if specified by
//the original URL. If not specified, a default URL is returned (title.html).
//Example: if the original URL is http://host/sam/help/index.html?subpage=screen1.html
//the page screen1.html will be loaded into the body frame.
// Note: %26 is the code for the & sign used as a separator between parameters
function getBodyFrameURL()
{
    var result = "title.htm";   // default result
    var argStr = "" ;           // Query string i.e. text after the ? in the page's URL
    var helpIdLoc = "" ;        // position of HelpId parameter in the query
    var subPagLoc = "" ;        // position of SubPage parameter in the query
    var anchorName = "" ;       // Hash string i.e. text after the # in the page's URL

    if (this.parent) {
        argStr = this.parent.location.search.substring(1);
        var anchorValue = this.parent.location.hash.substring(1);
        var isValidAnchor = /^[A-Za-z0-9_-]+$/;
        anchorName = isValidAnchor.test(anchorValue) ? anchorValue : null;

        if (argStr) {
            //alert(argStr);
            helpIdLoc = argStr.indexOf(helpIdStr);
            subPagLoc = argStr.indexOf(subPagStr);
            //alert('helpIdLoc = ' + helpIdLoc + ', subPagLoc = ' + subPagLoc);

            if (helpIdLoc > -1) {
                var nextParamIdx1 = argStr.indexOf('%26', helpIdLoc);
                var idMatch = '';
                if (nextParamIdx1 > -1) {
                    // fetch string between the = and the & characters
                    idMatch = argStr.substring(helpIdLoc + helpIdLen, nextParamIdx1);
                }
                else {
                    // fetch string after the = character
                    idMatch = argStr.substring(helpIdLoc + helpIdLen);
                }
                //alert('|' + idMatch + '|');

                if (typeof idMap != 'undefined') {    // array defined as a global variable (???)
                    var tmp = idMap["ID" + idMatch];
                    if (tmp) {
                        result = tmp;
                    }
                }
            }
            else {
                if (subPagLoc > -1) {
                    var nextParamIdx2 = argStr.indexOf('%26', subPagLoc);
                    var pgMatch = '';
                    if (nextParamIdx2 > -1) {
                        // fetch string between the = and the & characters
                        pgMatch = argStr.substring(subPagLoc + subPagLen, nextParamIdx2);
                    }
                    else {
                        // fetch string after the = character
                        pgMatch = argStr.substring(subPagLoc + subPagLen);
                    }
                    //alert('|' + pgMatch + '|');
                    if (pgMatch) {
                        var isValidSubpage=/^[A-Za-z0-9_-]+\.(htm|pdf)$/;
                        result = isValidSubpage.test(pgMatch) ? pgMatch : "title.htm";
                        if (anchorName) {
                           result+= '#' + anchorName;
                        }
                    }
                }
            }
        }
    }
    else {
      //alert("no query in " + this.parent.location);
    }
    return result;
}
// -->
