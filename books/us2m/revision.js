<!-- Navigation between revision marks

// global variables
var revMax  = revList.length - 1;   // the greatest revision index
var curRev  = -1;                   // the current revision index
var theDir = "";                    // the relative directory that contains the contents pages
var bodyWnd = null;                 // the window where the actual contents is displayed
var ctxtWnd = null;                 // the window where the context info must be displayed

// Get the body window object
function initBodyWnd() {
   if (bodyWnd!=null) {
      return;
   }
   if (parent!=self) {
      if (parent.parent != parent.self) {
         // navigation bar is framed
         if (parent.parent.frames.length==2) {
            if (parent.parent.frames[1].length==2 && parent.parent.frames[1].FRAME_BODY!=null) {
               // SRG layout (2 + 2 frames)
               bodyWnd = parent.parent.frames[1].FRAME_BODY ;
               theDir = "";
            }
         }
      }
      else {
         // navigation bar is alone in top row
         if (parent.frames.length==2) {
            if (parent.frames[1].length==2 && parent.frames[1].FRAME_BODY!=null) {
               // new UHB layout (1 + 2 frames)
               bodyWnd = parent.frames[1].FRAME_BODY ;
               theDir = "";
            }
         }
      }
   }
}

// Get the context window object
function initContextWnd() {
   if (parent!=self) {
      if (parent.parent != parent.self) {
         // navigation bar is framed
         if (parent.parent.frames.length==2) {
            if (parent.parent.frames[0].length==2) {
               // SRG layout (2 + 2 frames)
               ctxtWnd = parent.parent.frames[0].frames[0] ;
            }
         }
      }
   }
}

// Show the cursor corresponding to the given revision and state (On/Off)
function showRevCursor(revId, state) {
   initBodyWnd();
   if (bodyWnd == null) {
      return;
   }
   // nothing to do on 'fake' revision marks i.e. C0
   if (revId == "C0" || revId == "c0") {
      return;
   }
   // by convention, the image name is the revision id prefixed by 'img'
   imgObj = eval('bodyWnd.document.img' + revId.toLowerCase() ) ;
   if (imgObj) {
      // imgcnnn
      if (state == "On") {
         imgObj.src = bodyWnd.imgCursorOn.src ;
      }
      else if (state == "Off") {
         imgObj.src = bodyWnd.imgCursorOff.src ;
      }
   }
   else {
      imgObj = eval('bodyWnd.document.img' + revId.toUpperCase() ) ;
      if (imgObj) {
         // imgCnnn
         if (state == "On") {
            imgObj.src = bodyWnd.imgCursorOn.src ;
         }
         else if (state == "Off") {
            imgObj.src = bodyWnd.imgCursorOff.src ;
         }
      }
   }
}

// Refresh the revision 'cursor' after loading a page
function refreshRevCursor() {
   initBodyWnd();
   if (bodyWnd == null) {
      return;
   }
   var bodyPageUrl = bodyWnd.location.pathname ;
   bodyPageUrl = bodyPageUrl.substring(bodyPageUrl.lastIndexOf('\\')+1) ;
   bodyPageUrl = bodyPageUrl.substring(bodyPageUrl.lastIndexOf('/')+1) ;
   //SANITIZATION
   var isValidPage = /^[A-Za-z0-9_-]+\.htm$/;
   bodyPageUrl = isValidPage.test(bodyPageUrl) ? bodyPageUrl : "title.htm";

   var revUrl = "" ;
   var revId   = bodyWnd.location.hash ;      // take the anchor part of the URL
   if (revId.indexOf('C') == 1 || revId.indexOf('c') == 1) {
      // if a revision is selected, the hash should be #[Cc]nnn
      revId = revId.substring('1') ;     // remove the leading #
      //SANITIZATION
      var isValidRevId = /^[Cc][0-9]+$/;
      revId = isValidRevId.test(revId) ? revId : "C0";
      showRevCursor(revId, 'On');
      // in some case, the revision cursor is not initialised
      //  so we need to define the revision URL
      if (curRev < 0 || curRev > revMax) {
         revUrl = bodyPageUrl ;
         revUrl = revUrl + "#" + revId ;
      }
   }
   else {
      // define the revision URL on the fake revision on the current page
      revUrl = bodyPageUrl ;
      if (revUrl == revUrl.toUpperCase()) {
        revUrl = revUrl + "#C0" ;
      }
      else {
        revUrl = revUrl + "#c0" ;
      }
   }
   // now find the index of the revision URL (to synchronise the revision cursor and the page navigation)
   if (revUrl) {
      for (var i=0; i<=revMax ; i++) {
         if (revList[i] == revUrl) {
            curRev = i;
            break;
         }
      }
   }
   // update the context info
   initContextWnd();
   if (ctxtWnd!=null) {
      var d = ctxtWnd.document ;
      var c = ""; 
      if (bodyWnd!=null && bodyWnd.contextStr!=null) {
          c = bodyWnd.contextStr;
      }
      d.open();  // clear existing doc
      d.write("<!DOCTYPE HTML PUBLIC \"-//W3C//DTD HTML 4.01 Transitional//EN\"><HTML><HEAD><TITLE>Standards - SRGPlus Title</TITLE><META NAME=\"DESCRIPTION\" CONTENT=\"Standards - SRGPlus\"><META NAME=\"PUBLISHER\" CONTENT=\"S.W.I.F.T SCRL\"><META HTTP-EQUIV=\"CONTENT-LANGUAGE\" CONTENT=\"EN_UK\"><META HTTP-EQUIV=\"CONTENT-TYPE\" CONTENT=\"text/html; CHARSET=ISO-8859-1\"></HEAD><BODY><P CLASS=\"header\">") ;
      d.write(c) ;
      d.write("</P></BODY></HTML>\n");
      d.close();
   }
   return true;
}

// Go to the selected revision
function goRevision(newDirection) {
   var revIndex = curRev;   // default: use the current revision
   var revId = "";          // the id of the revision
   var i;                   // work variable used in loops

   initBodyWnd();
   if (bodyWnd == null) {
      alert("Sorry, change navigation is only available in HTML") ;
      return;
   }
   if (newDirection == "First") {
      // go to the First revision, skipping the 'fake' revisions (C0)
      for (i=0; i<=revMax; i++) {
         if (revList[i].indexOf('#C0') == -1 && revList[i].indexOf('#c0') == -1) {
            revIndex = i;
            break;
         }
      }
   }
   else {
      if (newDirection == "Last") {
         // go to the Last revision, skipping the 'fake' revisions (C0)
         for (i=revMax; i>=0; i--) {
            if (revList[i].indexOf('#C0') == -1 && revList[i].indexOf('#c0') == -1) {
               revIndex = i;
               break;
            }
         }
      }
      else {
         if (newDirection == "Next") {
            // go to the next revision, skipping the 'fake' revisions (C0)
            for (i=curRev+1; i<=revMax; i++) {
               if (revList[i].indexOf('#C0') == -1 && revList[i].indexOf('#c0') == -1) {
                  revIndex = i;
                  break;
               }
            }
         }
         else {
            if (newDirection == "Prev") {
               // go to the previous revision, skipping the 'fake' revisions (C0)
               for (i=curRev-1; i>=0; i--) {
                  if (revList[i].indexOf('#C0') == -1 && revList[i].indexOf('#c0') == -1) {
                     revIndex = i;
                     break;
                  }
               }
            }
         }
      }
   }
   // detect end of navigation
   if (curRev == revIndex) {
      if (newDirection == "First" || newDirection == "Prev") {
         if (revList[curRev].indexOf('#C0') == -1 || revList[curRev].indexOf('#c0') == -1) {
            alert("This is the first change in this Category") ;
         }
         else {
            if (revMax > 0) {
                alert("There are no previous changes.\nUse the 'First change' button to start reviewing changes.");
            }
            else {
                alert("There are no changes in this Category") ;
            }
         }
         return;
      }
      if (newDirection == "Last" || newDirection == "Next") {
         if (revList[curRev].indexOf('#C0') == -1 || revList[curRev].indexOf('#c0') == -1) {
            alert("This is the last change in this Category") ;
         }
         else {
            if (revMax > 0) {
                alert("There are no more changes in this Category");
            }
            else {
                alert("There are no changes in this Category") ;
            }
         }
         return;
      }
   }
   // go to the selected revision
   if (revIndex >= 0 && revIndex <= revMax) {
      // turn OFF the cursor next to the current revision
      if (curRev >= 0 && curRev <= revMax) {
         revId = revList[curRev].substring(revList[curRev].lastIndexOf('#')+1) ;
         showRevCursor(revId, "Off") ;
      }
      // go to the new revision
      bodyWnd.location = theDir + revList[revIndex] ;
      curRev = revIndex ;
      // and show the image next to it
      revId = revList[curRev].substring(revList[curRev].lastIndexOf('#')+1) ;
      showRevCursor(revId, "On") ;
   }
}

// open the HELP floating window
function openHelp() {
   if (top.hlpWnd && !top.hlpWnd.closed) {
      top.hlpWnd.focus() ;
   }
   else {
      top.hlpWnd = window.open("SRGHELP.HTM", "help", "status=no,toolbar=no,scrollbars=yes,resizable=yes,height=450,width=450");
      if (top.hlpWnd.opener == null) this.hlpWnd.opener = self;
   }
}

// -->
