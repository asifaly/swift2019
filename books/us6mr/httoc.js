
// parameters
PRESERVESTATE = 0;
STARTALLOPEN = 0;
USETEXTLINKS = 1;
HIGHLIGHT = 1 ;
ICONPATH = "" ;

// for non-recursive expand all feature
foldersList = new Object ;
foldersList.size = 1 ;

// nodes
foldersTree = gFld("Standards - Category 6R", "title.htm", "") ;
foldersTree.oldxID = "US6MR" ;
foldersTree.xID = "title.htm" ;
n1 = insFld(foldersTree, gFld("Introduction", "ac.htm#genac", "")) ;
n1.oldxID = "a2" ;
n1.xID = "ac.htm" ;
n2 = insDoc(n1, gLnk("R", "Summary of Changes", "ac.htm#genacb", "")) ;
n2.oldxID = "a3" ;
n2.xID = "ac.htm" ;
n3 = insDoc(foldersTree, gLnk("R", "Category 6 Reference Data Message Types", "ad.htm#genad", "")) ;
n3.oldxID = "a4" ;
n3.xID = "ad.htm" ;
n4 = insDoc(foldersTree, gLnk("R", "Euro - Impact on Category Message Standards", "ae.htm#genae", "")) ;
n4.oldxID = "a5" ;
n4.xID = "ae.htm" ;
n5 = insDoc(foldersTree, gLnk("R", "MT 670  Standing Settlement Instruction Update Notification Request", "afa.htm#mt670", "")) ;
n5.oldxID = "a6" ;
n5.xID = "afa.htm" ;
n6 = insDoc(foldersTree, gLnk("R", "MT 671  Standing Settlement Instruction Update Notification", "aga.htm#mt671", "")) ;
n6.oldxID = "a7" ;
n6.xID = "aga.htm" ;
n7 = insDoc(foldersTree, gLnk("R", "MT 690 Advice of Charges, Interest and Other Adjustments", "aha.htm#mt690", "")) ;
n7.oldxID = "a8" ;
n7.xID = "aha.htm" ;
n8 = insDoc(foldersTree, gLnk("R", "MT 691 Request for Payment of Charges, Interest and Other Expenses", "aia.htm#mt691", "")) ;
n8.oldxID = "a9" ;
n8.xID = "aia.htm" ;
n9 = insDoc(foldersTree, gLnk("R", "MT 692 Request for Cancellation", "aja.htm#mt692", "")) ;
n9.oldxID = "a10" ;
n9.xID = "aja.htm" ;
n10 = insDoc(foldersTree, gLnk("R", "MT 695 Queries", "alaa.htm#mt695", "")) ;
n10.oldxID = "a11" ;
n10.xID = "alaa.htm" ;
n11 = insDoc(foldersTree, gLnk("R", "MT 696 Answers", "alba.htm#mt696", "")) ;
n11.oldxID = "a12" ;
n11.xID = "alba.htm" ;
n12 = insDoc(foldersTree, gLnk("R", "MT 698 Proprietary Message", "alca.htm#mt698", "")) ;
n12.oldxID = "a13" ;
n12.xID = "alca.htm" ;
n13 = insDoc(foldersTree, gLnk("R", "MT 699 Free Format Message", "alda.htm#mt699", "")) ;
n13.oldxID = "a14" ;
n13.xID = "alda.htm" ;
n14 = insDoc(foldersTree, gLnk("R", "Legal Notices", "copyr.htm#genale", "")) ;
n14.oldxID = "a15" ;
n14.xID = "copyr.htm" ;
