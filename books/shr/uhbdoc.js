<!-- Javascript code used to handle a body page
// <meta name='Version-Info' content='$RCSfile: UHBDOC.JS,v $ $Revision: 1.1 $'>

function resyncUhb() {
   // resync the TOC
   if (parent!=self && parent.frames.length==2 && parent.frames[0]!=self && parent.frames[0].tocLoaded>0) {
      parent.frames[0].selectUrl(this.linkself);
   }

   // update nav bar
   var topWnd = null ;
   if (parent!=self && parent.parent!=parent.self && parent.parent.frames.length!=0) {
      // in a BOOK (frames = 2 lines with 2 columns in 2nd line)
      topWnd = parent.parent.frames[0];
   }
   else {
      if (window.top.frames.length==2 && window.top.frames[0].name=="FRAME_TOPBAR") {
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
      // linktop is different from going to top of page !!!!!!!!!!!
      //if (topWnd.document.TOP!=null) {
      //   if (this.linktop==null || this.linktop=="") {
      //      topWnd.document.TOP.src = topWnd.imgOffTop.src;
      //   }
      //   else {
      //      topWnd.document.TOP.src = topWnd.imgTop.src;
      //   }
      //}
      if (topWnd.document.NEXT!=null) {
         if (this.linkright==null || this.linkright=="") {
            topWnd.document.NEXT.src = topWnd.imgOffNext.src;
         }
         else {
            topWnd.document.NEXT.src = topWnd.imgNext.src;
         }
      }
   }
}
// -->
