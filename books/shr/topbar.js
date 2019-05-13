<!-- Javascript code used to handle a navigation bar
// <meta name='Version-Info' content='$RCSfile: TOPBAR.JS,v $ $Revision: 1.1 $'>

// a few variables are defined in the HTML file that include this Javascript
//  because they contain pathnames that depend on the context of the HTML 
//  ex: linktoc, linkPDF, linksearch, hubDir, docDir, imgDir

var preloadFlag = false;

var imgSearch = new Image(); var imgOffSearch = new Image();

// images used by UHBDOC.JS
var imgToc = new Image(); var imgOffToc = new Image();
var imgPdf = new Image(); var imgOffPdf = new Image();
var imgBack = new Image(); var imgOffBack = new Image();
var imgTop = new Image(); var imgOffTop = new Image();
var imgNext = new Image(); var imgOffNext = new Image();

var waitMsg = "Document not fully loaded, please wait..." ;

var textWnd = null;
var tocWnd = null;
initWnd();

// Get the toc and window object
function initWnd() {
   if (textWnd!=null && tocWnd!=null) {
      return;
   }
   if (parent!=self) {
      if (parent.frames.length>1 && parent.frames[0]==self) {
         if (parent.frames[1].length>1 && parent.frames[1].FRAME_BODY!=null) {
            // new UHB layout (BOOK: 1 + 2 frames)
            textWnd = parent.frames[1].FRAME_BODY ;
            tocWnd = parent.frames[1].FRAME_TOC ;
         }
         else {
            // new UHB layout (HUB etc.: 2 frames)
            textWnd = parent.frames[1] ;
            tocWnd = null ;
         }
      }
   }
}

function showHome() {
  if (this.hubDir!=null) {
    parent.location=this.hubDir + "home.htm" ;
  }
}
function showBooks() {
  if (this.hubDir!=null) {
    parent.location=this.hubDir + "books.htm" ;
  }
}
function showFeedback() {
  if (this.hubDir!=null) {
    parent.location=this.hubDir + "feedback.htm" 
  }
}

function showHelp(url) {
  if (this.hubDir!=null) {
    mywin = window.open(this.hubDir + "help/help.htm", "w" + name,"toolbar=0,location=0,directories=0,status=0,menubar=0,scrollbars=1,resizable=1,width=640,height=480"); 
    mywin.focus(); 
  }
}

function showSearch() {
  initWnd();
  if (this.linksearch == null || this.linksearch == "") return ;
  parent.location = this.linksearch;
}

function showToc() {
  if (parent.frames[1] == null) {return;}
  if (parent.frames[1].frames[1] == null) {return;}
  initWnd();
  if (this.linktoc == null || this.linktoc == "") return ;
  if (tocWnd == null) {
    alert(waitMsg);
    return;
  }
  if (this.linktoc!=null) {
    tocWnd.location = this.linktoc;
  }
}

function showPDF() {
   initWnd() ;
   var htframe = parent.frames[1];
   if (this.linkPDF == null || this.linkPDF == "") return ;
   // display PDF in bottom frame
   htframe.location = this.linkPDF;
   // reset globals
   tocWnd = null ;
   textWnd = parent.frames[1];
   bodyWnd = null ;
	this.document.TOP.src = this.imgOffTop.src;
	this.document.BACK.src = this.imgOffBack.src;
	this.document.NEXT.src = this.imgOffNext.src;
	this.document.TOC.src = this.imgOffToc.src;
	}

function showTitle() {
  initWnd() ;
  if (textWnd == null) {
    alert(waitMsg);
    return;
  }
   if (textWnd.linktop == null || textWnd.linktop == "") return ;
   textWnd.location = docDir + textWnd.linktop;
}

function showPrevious() {
  initWnd() ;
  if (parent.frames[1] == null) {return;}
  if (parent.frames[1].frames[1] == null) {return;}
  if (parent.frames[1].frames[1].linkleft == null || parent.frames[1].frames[1].linkleft == "") return ;
  parent.frames[1].frames[1].location = docDir + parent.frames[1].frames[1].linkleft;
}

function showTop() {
  initWnd() ;
  if (parent.frames[1] == null) {return;}
  if (parent.frames[1].frames[1] == null) {return;}
   parent.frames[1].location=parent.frames[1].location.pathname + "#TOP";
}
function showNext() {
  initWnd() ;
  if (parent.frames[1] == null) {return;}
  if (parent.frames[1].frames[1] == null) {return;}
  if (parent.frames[1].frames[1].linkright == null || parent.frames[1].frames[1].linkright == "") return ;
   parent.frames[1].frames[1].location = docDir + parent.frames[1].frames[1].linkright;
}
function newImage(arg) {
  if (document.images) {
    rslt = new Image();
    rslt.src = arg;
    return rslt;
  }
}
function changeImages(iName, iState) {
  if (iName == "" || iState == "") {
    return;
  }
  initWnd();
  if (parent.frames[1].location.pathname.indexOf(".pdf") != -1) {return;}
  if (parent.frames[1].location.pathname.indexOf(".PDF") != -1) {return;}

  if (document.images && (preloadFlag == true)) {
      if (iName =="FEEDBACK" ) {
          img = "feedbck" ;   // to comply with 8.3 filename requirements
      }
      else {
          img = iName.toLowerCase();
      }
      switch (iName) {
        case "TOC" :
          if (this.linktoc == null || this.linktoc == "") return ;
          break;
        case "PDF" :
          if (this.linkPDF == null || this.linkPDF == "") return ;
          break;
        case "SEARCH" :
          if (this.linksearch == null || this.linksearch == "") return ;
          break;
        case "BACK" :
          if (textWnd == null) return;
          if (textWnd.linkleft == null || textWnd.linkleft == "") return ;
          break;
        case "TOP" :
          if (textWnd == null) return;
          if (textWnd.linktop == null || textWnd.linktop == "") return ;
          break;
        case "NEXT" :
          if (textWnd == null) return;
          if (textWnd.linkright == null || textWnd.linkright == "") return ;
          break;
        default :
          break;
      }
      switch (iState) {
        case "ON" :
          document[iName].src = this.imgDir + img + ".gif" ;
          break;
        case "OVER" :
          document[iName].src = this.imgDir + img + "1.gif" ;
          break;
      }
  }
}

// update the navigation bar (i.e. grey out inactive icons)
function updateNavBar() {
  if (this.document.TOC!=null) {
    if (this.linktoc == null || this.linktoc == "") {
      this.document.TOC.src = imgOffToc.src;
    }
    else {
      this.document.TOC.src = imgToc.src;
    }
  }
  if (this.document.PDF!=null) {
    if (this.linkPDF==null || this.linkPDF=="") {
      this.document.PDF.src = imgOffPdf.src;
    }
    else {
      this.document.PDF.src = imgPdf.src;
    }
  }
  if (this.document.SEARCH!=null) {
    if (this.linksearch==null || this.linksearch=="") {
      this.document.SEARCH.src = imgOffSearch.src;
    }
    else {
      this.document.SEARCH.src = imgSearch.src;
    }
  }
  initWnd() ;
  if (textWnd != null) {
      if (this.document.BACK!=null) {
         if (textWnd.linkleft==null || textWnd.linkleft=="") {
            this.document.BACK.src = this.imgOffBack.src;
         }
         else {
            this.document.BACK.src = this.imgBack.src;
         }
      }
      // linktop is different from going to top of page !!!!!!!!!!!
      //if (this.document.TOP!=null) {
      //   if (textWnd.linktop==null || textWnd.linktop=="") {
      //      this.document.TOP.src = this.imgOffTop.src;
      //   }
      //   else {
      //      this.document.TOP.src = this.imgTop.src;
      //   }
      //}
      if (this.document.NEXT!=null) {
         if (textWnd.linkright==null || textWnd.linkright=="") {
            this.document.NEXT.src = this.imgOffNext.src;
         }
         else {
            this.document.NEXT.src = this.imgNext.src;
         }
      }
  }
}

// preload images for navigation bar in browser's cache
function preloadImages() {
  if (document.images) {
    // MOUSE-OVER images
    var imgOverHome = new Image();
    var imgOverBooks = new Image();
    var imgOverFeedback = new Image();
    var imgOverHelp = new Image();
    var imgOverToc = new Image();
    var imgOverPdf = new Image();
    var imgOverSearch = new Image();
    var imgOverBack = new Image();
    var imgOverTop = new Image();
    var imgOverNext = new Image();

    imgOverHome.src = this.imgDir + "home1.gif" ;
    imgOverBooks.src = this.imgDir + "books1.gif" ;
    imgOverFeedback.src = this.imgDir + "feedbck1.gif" ;
    imgOverHelp.src = this.imgDir + "help1.gif" ;
    imgOverToc.src = this.imgDir + "toc1.gif" ;
    imgOverPdf.src = this.imgDir + "pdf1.gif" ;
    imgOverSearch.src = this.imgDir + "search1.gif" ;
    imgOverBack.src = this.imgDir + "back1.gif" ;
    imgOverTop.src = this.imgDir + "top1.gif" ;
    imgOverNext.src = this.imgDir + "next1.gif" ;

    // function OFF images
    imgToc.src = this.imgDir + "toc.gif" ;
    imgPdf.src = this.imgDir + "pdf.gif" ;
    imgSearch.src = this.imgDir + "search.gif" ;
    imgBack.src = this.imgDir + "back.gif" ;
    imgTop.src = this.imgDir + "top.gif" ;
    imgNext.src = this.imgDir + "next.gif" ;

    imgOffToc.src = this.imgDir + "toc0.gif" ;
    imgOffPdf.src = this.imgDir + "pdf0.gif" ;
    imgOffSearch.src = this.imgDir + "search0.gif" ;
    imgOffBack.src = this.imgDir + "back0.gif" ;
    imgOffTop.src = this.imgDir + "top0.gif" ;
    imgOffNext.src = this.imgDir + "next0.gif" ;

    preloadFlag = true;
  }
  // update the nav bar (i.e. grey out inactive icons)
  updateNavBar();
}

// -->
