<!-- Javascript code used to handle the table of contents
// <meta name='Version-Info' content='$RCSfile: toccode.js,v $ $Revision: 1.1 $'>

// preload TOC images
var img_folder_open_on = new Image();
var img_folder_open_off = new Image();
var img_document_on = new Image();
var img_document_off = new Image();
var folderSelected  = 'fopenon.gif' ;    // icon for selected folder (always open)
img_folder_open_on.src = folderSelected ;
var folderUnselected  = 'fopenoff.gif' ; // icon for unselected folder (always open)
img_folder_open_off.src = folderUnselected ;
var documentSelected = 'docon.gif' ;      // icon for selected document
img_document_on.src = documentSelected ;
var documentUnselected = 'docoff.gif' ;   // icon for unselected document
img_document_off.src = documentUnselected ;

// status flags
var curSelection = 0;
var tocLoaded = 0;

// loading msg handling
function checkSupport(){
  this.doesDom=document.getElementById?1:0;        // MSIE 5+
  this.isIE4=(document.all && !this.doesDom)?1:0;  // MSIE 4
  this.doesLayers=(document.layers && !this.doesDom)?1:0;   // Netscape 4+
  this.supported=(this.doesDom || this.isIE4 || this.doesLayers);
  return this;
}

function hideMsg() {
  // NB: DOIT is created in the TOC HTML page
  if (doit && doit.supported) {
    divID = "loadingMsg";
    prop = doit.doesDom?document.getElementById(divID).style:doit.isIE4?document.all[divID].style:doit.doesLayers?document[divID]:0;
    if (prop) {
      // Netscape and MSIE do not use the same value for the VISIBILITY property
      prop.visibility=doit.doesLayers?'hide':'hidden';
    }
  }
}

// when FRAME_TOC is loaded or refreshed, make sure the cursor is in sync with the FRAME_BODY
function onLoadUhbToc() {
  var tocWnd = this ;
  tocLoaded = 1;
  if (tocWnd.parent!=null && tocWnd.parent.frames[1]!=null && tocWnd.parent.frames[1].linkself!=null) {
    tocWnd.selectUrl(tocWnd.parent.frames[1].linkself);
  }
  hideMsg();
}

// set the cursor on current selection
function setTocFocus(nodeObj) {
  var tocWnd = this;
  var aObj ;
  var y = 0 ;

  if (navigator.appName.indexOf("Netscape") > -1 && parseInt(navigator.appVersion) < 5) {
    // NN4: use the fact that objects are embedded in layers accessible via "navObj"
    y = nodeObj.navObj.top ;
  }
  else {
    // other browsers: use Javascript 1.2 properties of HTMLElement on associated image
    aObj = nodeObj.iconImg ;
    while (aObj) {
      y += aObj.offsetTop ;
      aObj = aObj.offsetParent ;
    }
  }
  tocWnd.scrollTo(0, y-50) ;
}

// when a new document is loaded in the FRAME_BODY, change selection in FRAME_TOC
function selectUrl(docUrl) {
  var imgObj ;
  var urlTxt ;
  var newSelection = 0;
  var tocWnd = this;
  if (!tocLoaded) return;

   if (tocWnd.foldersTree!=null) {
      var nodeObj = tocWnd.findObj(docUrl) ;
      if (nodeObj!=null) {
         nodeObj.forceOpeningOfAncestorFolders();
         tocWnd.highlightObjLink(nodeObj);;
         tocWnd.setTocFocus(nodeObj);
      }
      else {
         tocWnd.scrollTo(0, 0) ;
      }
   }
}

// end of script -->
