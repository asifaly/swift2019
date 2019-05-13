<!-- Javascript code used to handle a body page
// <meta name='Version-Info' content='$RCSfile: uhbdoc.js,v $ $Revision: 1.2 $'>
var imgTOCon = new Image(); 
var imgTOCoff = new Image();
imgTOCon.src = "hidetoc.gif";
imgTOCoff.src = "showtoc.gif";

function resyncUhb() {
   // resync the TOC
   if (parent!=self && parent.frames.length>1 && parent.frames[0]!=self && parent.frames[0].tocLoaded>0) {
      parent.frames[0].selectUrl(this.linkself);
   }

   // update nav bar
   var topWnd = null ;
   if (parent!=self && parent.parent!=parent.self && parent.parent.frames.length!=0) {
      // in a BOOK (frames = 2 lines with 2 columns in 2nd line)
      topWnd = parent.parent.frames[0];
   }
   else {
      if (window.top.frames.length>1 && window.top.frames[0].name=="FRAME_TOPBAR") {
         // other User HandBook document (in HUB, MEDOC index, etc.)
         topWnd = window.top.frames[0];
      }
   }
   if (topWnd != null && topWnd.preloadFlag != null && topWnd.preloadFlag == true) {
      if (topWnd.document.TOC!=null) {
         if (topWnd.linktoc == null || topWnd.linktoc == "") {
            topWnd.document.TOC.src = topWnd.imgOffToc.src;
         }
         else {
            topWnd.document.TOC.src = topWnd.imgToc.src;
         }
      }
      if (topWnd.document.PDF!=null) {
         if (topWnd.linkPDF==null || topWnd.linkPDF=="") {
            topWnd.document.PDF.src = topWnd.imgOffPdf.src;
         }
         else {
            topWnd.document.PDF.src = topWnd.imgPdf.src;
         }
      }
      if (topWnd.document.SEARCH!=null) {
         if (topWnd.linksearch==null || topWnd.linksearch=="") {
            topWnd.document.SEARCH.src = topWnd.imgOffSearch.src;
         }
         else {
            topWnd.document.SEARCH.src = topWnd.imgSearch.src;
         }
      }
      if (topWnd.document.BACK!=null) {
         if (this.linkleft==null || this.linkleft=="") {
            topWnd.document.BACK.src = topWnd.imgOffBack.src;
         }
         else {
            topWnd.document.BACK.src = topWnd.imgBack.src;
         }
      }
      if (topWnd.document.NEXT!=null) {
         if (this.linkright==null || this.linkright=="") {
            topWnd.document.NEXT.src = topWnd.imgOffNext.src;
         }
         else {
            topWnd.document.NEXT.src = topWnd.imgNext.src;
         }
      }
   }

   // update showhidetoc link on body page
   var htframe = this.parent ;
   if (htframe.document.body == null || htframe.document.body.cols == null) {
      // unsupported feature
      return ;
   }

   // toggle TOC display
   if (htframe.document.body.cols == "0,*") {
      // TOC is hidden
	 if (this.document.showhidetoc.src != null) 
		 {
		if (this.document.showhidetoc.src == imgTOCon.src) 
			{
			 this.document.showhidetoc.src = imgTOCoff.src ;
			}
		else {document.showhidetoc.src = imgTOCon.src;}
		}
   }

}

function showHideToc() {
   if (navigator.appName.indexOf("Netscape") > -1 && parseInt(navigator.appVersion) < 5) {
      // NN4: unsupported feature
      return ;
   }
   if (this.parent ==self) {
      // not a frameset: unsupported feature
      return ;
   }
   var htframe = this.parent ;
   if (htframe.document.body == null || htframe.document.body.cols == null) {
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
      htframe.document.body.cols = "0,*" ;
   }

   // toggle hyperlink's image
   if (this.document.showhidetoc.src != null) {
      if (this.document.showhidetoc.src == imgTOCon.src) {
         this.document.showhidetoc.src = imgTOCoff.src ;
      }
      else {
         document.showhidetoc.src = imgTOCon.src;
      }
   }
}

// -->
