

/*
This file is designed to build/write the left-side navigational menu for any section of federalreserve.gov
9.18.2006 - Mag.P.
*/
/* In the event of any JavaScript error, the following runs */
window.onerror = fallout;
function fallout() {
    //document.write("This feature is currently unavailable.<br />");
}
/* The following is a listing of identifiers for the first level headings followed by a list of valued pairs that indicate each menu item.  First level headings have a value of '%FIRSTLEVELHEADING', while links residing in the first level are identified by a dollar sign preceding the URL/HREF like so: '$/folder/file.html'. The dollar sign and percentage sign are necessary. In the event a link ends in default.htm or index.htm or default.cfm or default.aspx, the URL/HREF should end with a / this is a signifier to the javascript to check all the possible file names of this URL/HREF to verify if it is a match with the current page. */
/* linx[ menuItem ] = "URL for menuItem", mHl = menuHeadingLevel */
var mHl = new Array("menuOne", "menuTwo", "menuThr", "menuFou", "menuFiv", "menuSix", "menuSev");
var defPages = new Array("default.htm", "default.cfm", "default.aspx", "default.asp", "", "default.html", "index.htm", "index.html", "index.cfm");
var linx = new Object();
linx["Federal Open Market Committee"] = "$/monetarypolicy/fomc.htm";
linx["Credit and Liquidity Programs and the Balance Sheet"] = "$/monetarypolicy/bst.htm";
linx["Policy Tools"] = "%FIRSTLEVELHEADING";
linx["Maturity Extension Program and Reinvestment Policy"] = "/monetarypolicy/maturityextensionprogram.htm";
linx["Open Market Operations"] = "/monetarypolicy/openmarket.htm";
linx["Discount Rate"] = "/monetarypolicy/discountrate.htm";
linx["Reserve Requirements "] = "/monetarypolicy/reservereq.htm";
linx["Interest on Required Reserve Balances and Excess Balances"] = "/monetarypolicy/reqresbalances.htm";
linx["Term Asset-Backed Securities Loan Facility"] = "/monetarypolicy/talf.htm";
linx["Term Deposit Facility"] = "/monetarypolicy/tdf.htm";
linx["Expired Policy Tools"] = "/monetarypolicy/expiredtools.htm";
linx["Reports"] = "%FIRSTLEVELHEADING";
linx["Monetary Policy Report to the Congress"] = "/monetarypolicy/mpr_default.htm";
linx["Beige Book"] = "/monetarypolicy/beigebook/default.htm";
linx["Monthly Report on Credit and Liquidity Programs"] = "/monetarypolicy/clbsreports.htm";

/* The following function builds and writes the menu.  It selects the type of list and image to write by first looking at the first character of the link.  It then checks whether it should highlight the page it's on in reference to the list of links.  This is accomplished using the next function (menuItemHighlighter()). */
function buildMenu() {
    var theMenu = new String('');
    var firstLevelCounter = new Number(0);
    var firstLevelHighlight = new Boolean(true);
    var closeTag = new Boolean();
    for (var i in linx) {
        switch(linx[i].charAt(0)) {
            case '%':
                if (closeTag == true) { theMenu += '</span></ul>'; };
                theMenu += '<ul><a id="menuFirstLevelHeading" title="Expand ' + i + '" onmouseover="(window.status=' + "'" + i + "'" + '); return true;" onmouseout="(window.status=' + "'" + "'" + '); return true;" href="javascript:void(0)" onclick="toggle(' + "'" + mHl[firstLevelCounter] + "'" + '); return false;"><img src="/gifjpg/menu_closed.gif" alt="Expand ' + i + '" border="0" />' + i + '</a><span id="' + mHl[firstLevelCounter] + '">';
                firstLevelCounter++;
                closeTag = true;
            break;
            case '$':
                if (closeTag == true) { theMenu += '</span></ul>'; };
                if (menuItemHighlighter(linx[i].slice(1))) {
                    theMenu += '<ul id="menuLink"><img src="/gifjpg/menu_link.gif" alt="' + i + '" border="0"><a id="menuHighlight" href="' + linx[i].slice(1) + '">' + i + '</a></ul>';
                    firstLevelHighlight = false;
                } else {
                    theMenu += '<ul id="menuLink"><img src="/gifjpg/menu_link.gif" alt="' + i + '" border="0"><a href="' + linx[i].slice(1) + '">' + i + '</a></ul>';
                }
                closeTag = false;
            break;
            default:
                if (menuItemHighlighter(linx[i])) {
                    theMenu += '<li id="menuHighlight">' + i.link(linx[i]) + '</li>';
                } else {
                    theMenu += '<li>' + i.link(linx[i]) + '</li>';
                }
                closeTag = true;
            break;
        }
    }
        
    if (closeTag == true) { theMenu += '</span></ul>'; };
    document.write(theMenu);
    if (menuItemHighlighter("/reportforms/")) { toggle("menuOne"); };
    if (firstLevelHighlight) { toggle("menuHighlight"); };
}
/* Please view the previous function description for information on this function. 
Compares the link's folders to the URL's folders, if these are the same compares the filenames, if not compares the possible filenames.  If any of the possible 
filenames are found to match either of the them then returns true. */
function menuItemHighlighter(linxURL) {    
    var docURL = document.URL;
    var startPointU = docURL.indexOf(".gov/") + 4;
    var endPointU = docURL.lastIndexOf("/") + 1;
    var endLinx = linxURL.lastIndexOf("/") + 1;
    var uFolder = docURL.substring(startPointU, endPointU).toUpperCase();
    var lFolder = linxURL.substring(0, endLinx).toUpperCase();
    if (uFolder == lFolder) {
        var uFile = docURL.substring(endPointU).toUpperCase();
        var lFile = linxURL.substring(endLinx).toUpperCase();
        if (uFile == lFile) {
            return true;
        } else {
            var isUfileArray = new Boolean();
            var isLfileArray = new Boolean();
            var count = new Number(0);
            while (count < defPages.length) {
                if (uFile == defPages[count]) {
                    isUfileArray = true;
                }
                if (lFile == defPages[count]) {
                    isLfileArray = true;
                }
                count++;
            }
            if (isUfileArray & isLfileArray) {
                return true;
            } else {
                return false;
            }
        }
    } else {
        return false;
    }
}
/* This function toggles the expanded or collapsed state of the second level menu.  It also changes the link title, the image's alt text, and the image itself as well. */
function toggle(currentMenu) {
    if (currentMenu == "menuHighlight") {
        var checkIt = document.getElementById(currentMenu);
        if (checkIt) { var displayVal = document.getElementById(currentMenu).parentNode;
        } else { return false; };
    } else {
        var displayVal = document.getElementById(currentMenu);
    }
    if (displayVal.style.display == "block") { 
        displayVal.style.display = "none"; 
        var linkTitle = displayVal.parentNode.getElementsByTagName("a")[0].title;
        displayVal.parentNode.getElementsByTagName("a")[0].title = 'Expand ' + linkTitle.substring(linkTitle.indexOf(" ")+1);
        displayVal.parentNode.getElementsByTagName("img")[0].src = '/gifjpg/menu_closed.gif';
        displayVal.parentNode.getElementsByTagName("img")[0].alt = 'Expand ' + linkTitle.substring(linkTitle.indexOf(" ")+1);
      } else { 
        displayVal.style.display = "block";
        var linkTitle = displayVal.parentNode.getElementsByTagName("a")[0].title;
        displayVal.parentNode.getElementsByTagName("a")[0].title = 'Collapse ' + linkTitle.substring(linkTitle.indexOf(" ")+1);
        displayVal.parentNode.getElementsByTagName("img")[0].src = '/gifjpg/menu_open.gif';
        displayVal.parentNode.getElementsByTagName("img")[0].alt = 'Collapse ' + linkTitle.substring(linkTitle.indexOf(" ")+1);
    }
}

