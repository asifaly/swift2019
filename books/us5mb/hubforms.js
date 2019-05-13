<!--  
// SWIFT CDROM Feedback Forms Handler
// <meta name='Version-Info' content='$RCSfile: HUBFORMS.JS,v $ $Revision: 1.2 $'>

// show a printer-friendly version of the form
function printForm(f) {
   // collect all data in the body in HTML fashion
   var myBody = "";
   var radioElts = "" ;
   for (i = 0; i < f.elements.length; i++) {
      var fe = f.elements[i]; 
      switch(fe.type) {
         case "password": 
         case "text": 
         case "textarea": 
            myBody += "<P><B>" + fe.name + ":</B> " ;
            var escText = fe.value ;
            escText = escText.replace(/&/g,"&amp;");
            escText = escText.replace(/</g,"&lt;");
            escText = escText.replace(/\r\n/g,"<BR>");
            myBody += escText ; 
            myBody += "</P>\r\n"; 
            break; 
         case "select-multiple": 
         case "select-one":
            myBody += "<P><B>" + fe.name + ":</B> " ;
            if (fe.selectedIndex > -1) {
               var myNotFirst = false; 
               for(j = 0; j < fe.options.length; j++) { 
                  if(fe.options[j].selected) { 
                     if(myNotFirst) { 
                        myBody += ", " + fe.options[j].value; 
                     } 
                     else { 
                        myNotFirst = true; 
                        myBody += fe.options[j].value; 
                     } 
                  } 
               } 
            }
            myBody += "</P>\r\n"; 
            break; 
         case "radio":
            if (radioElts.indexOf(", " + fe.name + " ")==-1) {
               // first element of that name
               radioElts += ", " + fe.name + " " ;
               myBody += "<P><B>" + fe.name + ":</B> " ;
               var fg = eval("f." + fe.name); // get the radio group
               for (j=0; j<fg.length; j++) {
                  if(fg[j].checked == true) { 
                     myBody += fg[j].value ; 
                     break;
                  }
               }
               myBody += "</P>\r\n"; 
            }
            break; 
         case "checkbox": 
            myBody += "<P><B>" + fe.name + ":</B> " ;
            if(fe.checked) { 
               myBody += fe.value ; 
            } 
            myBody += "</P>\r\n"; 
            break; 
      } 
   }

   var d = this.document ;
   var ft = f.FormTitle.value ;
   var ct = f.CDTitle.value ;
   var ed = f.Edition.value ;
   var lic = f.Licence.value;
   d.open();  // clear existing doc
   d.write("<!DOCTYPE HTML PUBLIC \"-//W3C//DTD HTML 4.01 Transitional//EN\">\n<HTML>\n<HEAD>\n<TITLE>") ;
   d.write(ft + " - " + ct + " - " + ed);
   d.write("</TITLE>\n");
   d.write("<META NAME=\"Publisher\" CONTENT=\"S.W.I.F.T. SCRL\">\n<META HTTP-EQUIV=\"Content-Type\" CONTENT=\"text/html; CHARSET=ISO-8859-1\">\n<LINK HREF=\"SWIFTUHB.CSS\" TYPE=\"text/css\" REL=\"stylesheet\">\n</HEAD>\n<BODY BGCOLOR=\"#FFFFFF\">\n<H2>");
   d.write(ft + "<BR>" + ct + "<BR>" + ed);
   d.write("</H2>\n<P>Thank you for your feedback about this SWIFT CD.</P>\n<P>Please <A HREF=\"javascript:window.print();\">print</A> this document, and either</P> \n<OL>\n<LI>mail it to us at the following address:</P>\n<P>SWIFT User Documentation<BR>\nAvenue Ad&egrave;le 1<BR>\nB-1310 La Hulpe<BR>\nBelgium</P>\n<LI>\n<P>or fax it to:</P>\n<P>SWIFT User Documentation, Fax +32 2 655 4754</P></LI>\n</OL>\n<HR>\n") ;
   d.write("<P><B>Licence:</B> " + lic + "</P>")
   d.write(myBody) ;
   d.write("<HR>\n</BODY></HTML>\n");
   d.close();

   return(false) ;
}

// send the form data by email
function sendForm(f) {

   // collect all data in the body in XML fashion
   var myBody = "<" + f.name + ">\r\n<Licence>" + f.Licence.value + "</Licence>\r\n";
   var radioElts = "" ;
   for (i = 0; i < f.elements.length; i++) {
      var fe = f.elements[i]; 
      switch(fe.type) {
         case "password": 
         case "text": 
         case "textarea": 
            myBody += "<" + fe.name + ">" ;
            myBody += escape(fe.value) ; 
            myBody += "</" + fe.name + ">\r\n"; 
            break; 
         case "select-multiple": 
         case "select-one":
            myBody += "<" + fe.name + ">" ;
            if (fe.selectedIndex > -1) {
               var myNotFirst = false; 
               for(j = 0; j < fe.options.length; j++) { 
                  if(fe.options[j].selected) { 
                     if(myNotFirst) { 
                        myBody += ", " + fe.options[j].value; 
                     } 
                     else { 
                        myNotFirst = true; 
                        myBody += fe.options[j].value; 
                     } 
                  } 
               } 
            }
            myBody += "</" + fe.name + ">\r\n"; 
            break; 
         case "radio": 
            if (radioElts.indexOf(", " + fe.name + " ")==-1) {
               // first element of that name
               radioElts += ", " + fe.name + " " ;
               myBody += "<" + fe.name + ">" ;
               var fg = eval("f." + fe.name); // get the radio group
               for (j=0; j<fg.length; j++) {
                  if(fg[j].checked == true) { 
                     myBody += fg[j].value ; 
                     break;
                  }
               }
               myBody += "</" + fe.name + ">\r\n"; 
            }
            break; 
         case "checkbox": 
            myBody += "<" + fe.name + ">" ;
            if(fe.checked) { 
               myBody += fe.value ; 
            } 
            myBody += "</" + fe.name + ">\r\n"; 
            break; 
      } 
   }
   myBody += "</" + f.name + ">\r\n";
   var what = f.FormTitle.value + " - " + f.CDTitle.value + " - " + f.Edition.value ;

   var myURL = "mailto:" + escape(f.Recipient.value) + "?subject=" + escape(what) + "&body=" + myBody; 

   if (navigator.appName.indexOf("Microsoft") != -1) {
      var msie = navigator.appVersion.split("MSIE")
      navigator.version  = parseFloat(msie[1]);
      if (navigator.version==5.5) {
         // MSIE 5.5 has a limit of 260 char in the URL length i.e. less than the form itself => not supported
         // notify user to build an HTML "printer-friendly" version of the form
         alert("Sorry but this feature is not supported by your browser!\nPlease use the print button...") ;
         return false;    // to avoid submit
      }
      else {
         // other MSIE have a limit of 2048 char in the URL length, so we need a workaround in that case
         if (myURL.length > 2048) {
            // notify user to build an HTML "printer-friendly" version of the form
            alert("Sorry but this feature is not supported by your browser!\nPlease use the print button...") ;
            return false;    // to avoid submit
         }
         else {
            if (navigator.version<6) {
               // older MSIE, trigger submission of the form
               //  Note that this will send the message immediately and may 
               //   prevent the log of the message in the "Sent" mailbox
               f.action = "mailto:" + escape(f.Recipient.value) + "?subject=" + escape(what);
               f.method = "GET" ;
               f.body.value = myBody ;
               return true;    // to trigger submit
            }
            else {
               // MSIE 6+, open the "new message" window via mailto:
               window.location = myURL; 
               return false;    // to avoid submit
            }
         }
      }
   }
   else {
      // Mozilla (including old NN): no limit in the URL length, so we can open the "new message" window via mailto:
      window.location = myURL; 
      return false;    // to avoid submit
   }

}

// -->
