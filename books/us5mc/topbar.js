<!-- Javascript code used to handle a navigation bar
// <meta name='Version-Info' content='$RCSfile: topbar.js,v $ $Revision: 1.4 $'>

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
var imgPrint = new Image(); var imgOffPrint = new Image();
var imgTOCon = new Image(); 
var imgTOCoff = new Image();
imgTOCon.src = "hidetoc.gif";
imgTOCoff.src = "showtoc.gif";
var waitMsg = "Document not fully loaded, please wait..." ;
var textWnd = null;
var tocWnd = null;
var focus=0;

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

function Print_Body() {
   initWnd();
   if (textWnd != null && textWnd.location.pathname.indexOf(".pdf") == -1) {
      textWnd.focus();
      window.print();
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
    mywin = window.open(this.hubDir + "help.htm", "w" + name,"toolbar=0,location=0,directories=0,status=0,menubar=0,scrollbars=1,resizable=1,width=640,height=480"); 
    mywin.focus(); 
  }
}

function showSearch() {
  initWnd();
  if (this.linksearch == null || this.linksearch == "") return ;
  parent.location = this.linksearch;
}

function showToc() {
   initWnd();
   if (this.linktoc == null || this.linktoc == "") return ;
   if (tocWnd == null) {
      if (textWnd != null && textWnd.location.pathname.indexOf(".pdf") == -1) {
         alert(waitMsg);
      }
      return;
   }
   // refresh 
   if (this.linktoc!=null) {
      tocWnd.location = this.linktoc;
   }

   // show/hide TOC effect
   if (navigator.appName.indexOf("Netscape") > -1 && parseInt(navigator.appVersion) < 5) {
      // NN4: unsupported feature
      return ;
   }
   var htframe = tocWnd.parent ;
   if (htframe == null || htframe.document.body == null || htframe.document.body.cols == null) {
      // unsupported feature
      return ;
   }
   // toggle TOC display
   if (htframe.document.body.cols == "0,*") {
      // show TOC
      htframe.document.body.cols = "35%,*" ;
   }
   else {
      // hide TOC
      htframe.document.body.cols = "0,*";
   }
   // toggle hyperlink's text
   if (textWnd.document.showhidetoc.src != null) {
      if (textWnd.document.showhidetoc.src == textWnd.imgTOCon.src) {
         textWnd.document.showhidetoc.src = textWnd.imgTOCoff.src ;
      }
      else {
         textWnd.document.showhidetoc.src = textWnd.imgTOCon.src;
      }
   }

}

function showPDF() {
   initWnd() ;
   if (textWnd == null) {return;}
   if (tocWnd == null) {return;}
   if (this.linkPDF == null || this.linkPDF == "") return ;

   // display PDF in bottom frame
   var htframe = tocWnd.parent ;
   if (htframe == null) {
      // unsupported feature
      return ;
   }
   htframe.location = this.linkPDF;

   // reset globals
   tocWnd = null ;
   textWnd = null ;
   bodyWnd = null ;

   // disable all icons in HTML NavBar
   if (this.document.PRINT!=null) {
      this.document.PRINT.src = this.imgOffPrint.src;
      this.document.PRINT.alt = "" ;
   }
   if (this.document.TOC!=null) {
      this.document.TOC.src = imgOffToc.src;
      this.document.TOC.alt = "";
   }
   if (this.document.PDF!=null) {
      this.document.PDF.src = imgOffPdf.src;
      this.document.PDF.alt = "";
   }
   if (this.document.BACK!=null) {
      this.document.BACK.src = imgOffBack.src;
      this.document.BACK.alt = "";
   }
   if (this.document.TOP!=null) {
      this.document.TOP.src = imgOffTop.src;
      this.document.TOP.alt = "";
   }
   if (this.document.NEXT!=null) {
      this.document.NEXT.src = imgOffNext.src;
      this.document.NEXT.alt = "";
   }
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
   if (textWnd == null || textWnd.location.pathname.indexOf(".pdf") > -1) {
     return;
   }
   if (textWnd.linkleft == null || textWnd.linkleft == "") return ;
   textWnd.location = docDir + textWnd.linkleft;
}

function showTop() {
   initWnd() ;
   if (textWnd == null || textWnd.location.pathname.indexOf(".pdf") > -1) {
      return;
   }
   textWnd.location=textWnd.location.pathname + "#TOP";
}

function showNext() {
   initWnd() ;
   if (textWnd == null || textWnd.location.pathname.indexOf(".pdf") > -1) {
      return;
   }
   if (textWnd.linkright == null || textWnd.linkright == "") return ;
   textWnd.location = docDir + textWnd.linkright;
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
  if (document.images && (preloadFlag == true)) {
      if (iName =="FEEDBACK" ) {
          img = "feedbck" ;   // to comply with 8.3 filename requirements
      }
      else {
          img = iName.toLowerCase() ;
      }
      switch (iName) {
        case "TOC" :
          if (tocWnd == null) return;
          if (this.linktoc == null || this.linktoc == "") return ;
          break;
        case "PDF" :
          if (textWnd == null) return;
          if (textWnd.location.pathname.indexOf(".pdf") > -1) return ;
          if (this.linkPDF == null || this.linkPDF == "") return ;
          break;
        case "SEARCH" :
          if (textWnd == null) return;
          if (textWnd.location.pathname.indexOf(".pdf") > -1) return ;
          if (this.linksearch == null || this.linksearch == "") return ;
          break;
        case "BACK" :
          if (textWnd == null) return;
          if (textWnd.location.pathname.indexOf(".pdf") > -1) return ;
          if (textWnd.linkleft == null || textWnd.linkleft == "") return ;
          break;
        case "TOP" :
          if (textWnd == null) return;
          if (textWnd.location.pathname.indexOf(".pdf") > -1) return ;
          break;
        case "NEXT" :
          if (textWnd == null) return;
          if (textWnd.linkright == null || textWnd.linkright == "") return ;
          break;
        case "PRINT" :
          if (textWnd == null) return;
          if (textWnd.location.pathname.indexOf(".pdf") > -1) return ;
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
        default :
          break;
      }
      switch (iName) {
        case "BACK" :
          if (textWnd.lefttext) {
            document[iName].alt = textWnd.lefttext ;
          }
          else {
            document[iName].alt = "Previous page" ;
          }
          break;
        case "TOP" :
          document[iName].alt = "Top of page" ;
          break;
        case "NEXT" :
          if (textWnd.righttext) {
            document[iName].alt = textWnd.righttext ;
          }
          else {
            document[iName].alt = "Next page" ;
          }
          break;
        case "TOC" :
          document[iName].alt = "Hide/Show Table of content" ;
          break;
        case "PDF" :
          document[iName].alt = "Open PDF" ;
          break;
        case "PRINT" :
          document[iName].alt = "Print" ;
          break;
        default :
          break;
      }
  }
}

// update the navigation bar (i.e. grey out inactive icons)
function updateNavBar() {
  initWnd() ;
  if (this.document.TOC!=null) {
    if (this.linktoc == null || this.linktoc == "") {
      this.document.TOC.src = imgOffToc.src;
      this.document.TOC.alt = "" ;
    }
    else {
      this.document.TOC.src = imgToc.src;
      this.document.TOC.alt = "Hide/Show Table of content" ;
    }
  }
  if (this.document.PDF!=null) {
    if (this.linkPDF==null || this.linkPDF=="") {
      this.document.PDF.src = imgOffPdf.src;
      this.document.PDF.alt = "" ;
    }
    else {
      this.document.PDF.src = imgPdf.src;
      this.document.PDF.alt = "Open PDF" ;
    }
  }
  if (this.document.SEARCH!=null) {
    if (this.linksearch==null || this.linksearch=="") {
      this.document.SEARCH.src = imgOffSearch.src;
      this.document.SEARCH.alt = "" ;
    }
    else {
      this.document.SEARCH.src = imgSearch.src;
      this.document.SEARCH.alt = "Search" ;
    }
  }
  if (textWnd != null) {
      if (this.document.BACK!=null) {
         if (textWnd.linkleft==null || textWnd.linkleft=="") {
            this.document.BACK.src = this.imgOffBack.src;
            this.document.BACK.alt = "" ;
         }
         else {
            this.document.BACK.src = this.imgBack.src;
            this.document.BACK.alt = "Previous page" ;
         }
      }
      if (this.document.TOP!=null) {
         if (textWnd.location.pathname.indexOf(".pdf") > -1) {
            this.document.TOP.src = this.imgOffTop.src;
            this.document.TOP.alt = "" ;
         }
         else {
            this.document.TOP.src = this.imgTop.src;
            this.document.TOP.alt = "Top of page" ;
         }
      }
      if (this.document.NEXT!=null) {
         if (textWnd.linkright==null || textWnd.linkright=="") {
            this.document.NEXT.src = this.imgOffNext.src;
            this.document.NEXT.alt = "" ;
         }
         else {
            this.document.NEXT.src = this.imgNext.src;
            this.document.NEXT.alt = "Next page" ;
         }
      }
      if (this.document.PRINT!=null) {
          if (textWnd.location.pathname.indexOf(".pdf") > -1) {
            this.document.PRINT.src = this.imgOffPrint.src;
            this.document.PRINT.alt = "" ;
         }
         else {
            this.document.PRINT.src = this.imgPrint.src;
            this.document.PRINT.alt = "Print" ;
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
    var imgOverPrint = new Image();

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
    imgOverPrint.src = this.imgDir + "print1.gif" ;

    // function OFF images
    imgToc.src = this.imgDir + "toc.gif" ;
    imgPdf.src = this.imgDir + "pdf.gif" ;
    imgSearch.src = this.imgDir + "search.gif" ;
    imgBack.src = this.imgDir + "back.gif" ;
    imgTop.src = this.imgDir + "top.gif" ;
    imgNext.src = this.imgDir + "next.gif" ;
    imgPrint.src = this.imgDir + "print.gif" ;

    imgOffToc.src = this.imgDir + "toc0.gif" ;
    imgOffPdf.src = this.imgDir + "pdf0.gif" ;
    imgOffSearch.src = this.imgDir + "search0.gif" ;
    imgOffBack.src = this.imgDir + "back0.gif" ;
    imgOffTop.src = this.imgDir + "top0.gif" ;
    imgOffNext.src = this.imgDir + "next0.gif" ;
    imgOffPrint.src = this.imgDir + "print0.gif" ;

    preloadFlag = true;
  }
  // update the nav bar (i.e. grey out inactive icons)
  updateNavBar();
}

function Send_Mail() {
   var myURL = "";
   var myMail = "mailto:userdoc.feedback@swift.com";
   var mySubject = "" ; 
   var myBody = "" ;
   if (parent.frames[1].FRAME_BODY !=null) {
      mySubject = "Error/Question about: " + parent.frames[1].FRAME_BODY.document.title;
      myBody = textWnd.location;
   }
   else {
      mySubject = "Error/Question about: " + parent.frames[1].location;
	  myBody = parent.frames[1].location;
   }
   myURL = myMail + "?subject=" + mySubject + "&body=" + myBody; 
   window.location = myURL; 
}
// -->
