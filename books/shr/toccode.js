<!-- Javascript code used to handle the table of contents
// <meta name='Version-Info' content='$RCSfile: TOCCODE.JS,v $ $Revision: 1.1 $'>

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
var documentUnselected = 'docoff.gif' ;   // // icon for unselected document
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
  var maxLen = tocWnd.document.images.length ;
  for (var n=0; n<maxLen; n++) {
    var imgObj = tocWnd.document.images[n] ;
    if (imgObj.src.indexOf(folderSelected)!=-1) {
      imgObj.src = folderUnselected ;
    }
    else {
      if (imgObj.src.indexOf(documentSelected)!=-1) {
        imgObj.src = documentUnselected ;
      }
    }
  }
  tocWnd.scrollTo(0,0);
  if (curSelection > 0) {
    setTocFocus();
  }
  tocLoaded = 1;
  if (tocWnd.parent!=null && tocWnd.parent.frames[1]!=null && tocWnd.parent.frames[1].linkself!=null) {
    tocWnd.selectUrl(tocWnd.parent.frames[1].linkself);
  }
  hideMsg();
}

// set the cursor on current selection
function setTocFocus() {
  var tocWnd = this;
  var imgObj = null ;
  var aObj = null ;

  if (curSelection > 0) {
    imgObj = eval('tocWnd.document.IMG' + curSelection ) ;
    if (imgObj.src.indexOf(folderUnselected)!=-1) {
      imgObj.src = folderSelected ;
    }
    else {
      if (imgObj.src.indexOf(documentUnselected)!=-1) {
        imgObj.src = documentSelected ;
      }
    }
    if (navigator.appName.indexOf("Microsoft") != -1) {
      // IE
      imgObj.scrollIntoView();
    }
	else if (document.getElementById)
	{
		var maxLen = tocWnd.document.anchors.length ;
      for (var n=curSelection; n<maxLen; n++) {
        var aName = tocWnd.document.anchors[n].name ;
		
        if (aName == "A"+curSelection || aName == "a"+curSelection) {
			//alert(aName +" "+ n);
			var y=0;
          aObj = tocWnd.document.anchors[n] ;
		  //alert(aObj.y);
          //aObj.focus(+0,+200);
		  //alert(aObj.style.left) ;
		  //alert(imgObj.style.posTop) ;
		  while(aObj){
			y+=aObj.offsetTop;
			aObj=aObj.offsetParent;
			}
			//alert(y);
			tocWnd.scrollTo(0,y-50);
	}
	  }
	}
    else {
      // Netscape: find corresponding anchor
      //var a = tocWnd.document.anchors[curSelection];  // WRONG if a Name not sequential !
      //if (a.name == "A"+curSelection) {
      //  tocWnd.scrollTo(0, a.y-50) ;
      //}
      var maxLen = tocWnd.document.anchors.length ;
      for (var n=curSelection; n<maxLen; n++) {
        var aName = tocWnd.document.anchors[n].name ;
        if (aName == "A"+curSelection || aName == "a"+curSelection) {
          aObj = tocWnd.document.anchors[n] ;
          tocWnd.scrollTo(0, aObj.y-50) ;
          break ;
        }
      }
    }
  }
  else {
    tocWnd.scrollTo(0, 0) ;
  }
}

// when a new document is loaded in the FRAME_BODY, change selection in FRAME_TOC
function selectUrl(docUrl) {
  var imgObj ;
  var urlTxt ;
  var newSelection = 0;
  var tocWnd = this;
  if (!tocLoaded) return;

  docUrl=docUrl.toLowerCase();
  var maxLen = tocWnd.document.links.length ;
  for (var n=0; n<maxLen; n++) {
    urlTxt = tocWnd.document.links[n].href;
    if (urlTxt.indexOf(docUrl)!=-1) {
      // nTh URL in the TOC; look for corresponding image/anchor
      // by construction there is 1 anchor Ax per link + a fake A0 anchor => look for n+1Th anchor
      var aName = tocWnd.document.anchors[n+1].name ;
      if (aName.indexOf('A')!=-1 || aName.indexOf('a')!=-1) {
         newSelection = aName.substring(1);
         break;
      }
    }
  }
  // set the state of the selected entry
  if (curSelection != newSelection) {
    // reset the state of previous selection
    if (curSelection > 0) {
      imgObj = eval('tocWnd.document.IMG' + curSelection ) ;
      if (imgObj.src.indexOf(folderSelected)!=-1) {
        imgObj.src = folderUnselected ;
      }
      else {
        if (imgObj.src.indexOf(documentSelected)!=-1) {
          imgObj.src = documentUnselected ;
        }
      }
    }
    // set the state of the selected entry
    if (newSelection > 0) {
      curSelection = newSelection ;
      tocWnd.setTocFocus();
    }
    else {
      tocWnd.scrollTo(0, 0) ;
    }
  }
}

// end of script -->
