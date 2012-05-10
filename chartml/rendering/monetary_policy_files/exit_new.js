//-------------------------Exit Popup
var usewindow; 
function exitWindow2(url, whichExitText, OpenInNewWindow)
{
    usewindow = OpenInNewWindow;
    var TheExit = window.open("", "_blank", "toolbar=no, location=no, directories=no,status=no,menubar=no,scrollbars=no, resizable=no,copyhistory=no,width=850,height=500,left=200,top=100,screen-X=0,screen-Y=0")
    TheExit.document.write(Dialog(url, whichExitText));
}
//-------------------------Exit Popup
function exitWindow(url, whichExitText)
{
    var TheExit = window.open("", "_blank", "toolbar=no, location=no, directories=no,status=no,menubar=no,scrollbars=no, resizable=no,copyhistory=no,width=850,height=500,left=200,top=100,screen-X=0,screen-Y=0")
    TheExit.document.write(Dialog(url, whichExitText));
    TheExit.document.close();
}
//---------------------------------------------------------------------------------------------- 
function Dialog(url, wet)
{
    var TitleText = "";
    var popupText = "";
    switch (wet.toLowerCase()) 
    {
        case "ny":
            TitleText = "Exit Disclaimer";
            popupText = "<p>You are now exiting the Board of Governors of the Federal Reserve System (Board) website ";
            popupText += "and entering the site: " + url;
            popupText += "</p>";
            popupText += "<p>We have provided a link to this site because it has information that may be of interest<br />  to our users.</p>";
            popupText += "<p>As part of the Federal Reserve System, the Board provides links to information on Federal Reserve Bank websites ";
            popupText += "and other System websites. These sites do not necessarily operate under the same laws, regulations, and privacy and ";
            popupText += "security policies as the Board's website.</p>";
            popupText += "<p>To easily return, please bookmark http://www.federalreserve.gov </p>";
            break;
        case "ext":
            TitleText = "Exit Disclaimer";
            popupText = "<p>You are now exiting the Board of Governors of the Federal Reserve System (Board) website ";
            popupText += "and entering the site: " + url;
            popupText += "</p>";
            popupText += "<p>We have provided a link to this site because it has information that may be of interest to our viewers.</p>";
            popupText += "<p>The Board does not necessarily endorse the views expressed or the facts presented on this site.</p>";
            popupText += "<p>The Board does not endorse any commercial products that may be advertised or on this site.</p>";
            popupText += "<p>The Board's privacy policy does not apply on this site. Please check the site for its privacy notice.</p>";
            popupText += "<p>To easily return, please bookmark http://www.federalreserve.gov</p>";
            break;
        case "pc":
            TitleText = "Disclaimer Notice";
            popupText = "<h2>Notice to Those Submitting Comments</h2>";
            popupText += "<p>Please note that all public comments on proposals, however they are submitted (via this web site, by e-mail, ";
            popupText += "or in paper form), will be made available publicly (on this web site, and elsewhere in paper form).</p>";
            popupText += "<p>Comments are not edited for public viewing but are reproduced exactly as submitted, except when alteration is ";
            popupText += "necessary for technical reasons.</p>";
            popupText += "<p>The names and addresses of commenters are included with all comments made available for public viewing.</p>";
            break;            
        default:
            TitleText = "Exit Disclaimer";
            popupText = "<p>You are now exiting the Board of Governors of the Federal Reserve System (Board) website ";
            popupText += "and entering the site: " + url;
            popupText += "</p>";
            popupText += "<p>We have provided a link to this site because it has information that may be of interest<br />  to our users.</p>";
            popupText += "<p>As part of the Federal Reserve System, the Board provides links to information on Federal Reserve Bank websites ";
            popupText += "and other System websites. These sites do not necessarily operate under the same laws, regulations, and privacy and ";
            popupText += "security policies as the Board's website.</p>";
            popupText += "<p>To easily return, please bookmark http://www.federalreserve.gov </p>";
            break;
    } 

    var DialogContent = "";
    DialogContent += "<html>";
    DialogContent += "<head><!-- PageID 6 - published by RedDot 7.5 - 7.5.2.17 - 18956 -->";
    DialogContent += "<title>FRB: " + TitleText + "</title>";
    DialogContent += "<script language='javascript' type='text/javascript'>";
    DialogContent += "function redirectMe() {";

    if (usewindow != "true"){
        DialogContent += "    opener.location = '" + url + "';";
        DialogContent += "    window.close();";
    }
    else
        DialogContent += "    location = '" + url + "';";

    DialogContent += "    }";
    DialogContent += "</script>";
    DialogContent += "<style type='text/css'>";
    DialogContent += "body {";
    DialogContent += "    margin: 0 0 0 0;";
    DialogContent += "    background-image:url(/gifjpg/frb_popup_stripe.jpg);";
    DialogContent += "    font-family:Georgia, 'Times New Roman', Times, serif;";
    DialogContent += "    background-repeat:repeat-x;";
    DialogContent += "    background-color:#8e998e;";
    DialogContent += "    color:#fff;";
    DialogContent += "    text-align:center";
    DialogContent += "}";
    DialogContent += "#seal {";
    DialogContent += "    background-image:url(/gifjpg/frb_popup_seal.jpg);";
    DialogContent += "    width:850px;";
    DialogContent += "    height:500px;";
    DialogContent += "    margin-top:0;";
    DialogContent += "    text-align: center;";
    DialogContent += "    margin-left:auto;";
    DialogContent += "    margin-right:auto;";
    DialogContent += "}";
    DialogContent += "#popup_Top{";
    DialogContent += "    height: 85px;";
    DialogContent += "}";
    DialogContent += "#popup_teaser{";
    DialogContent += "    margin-top:10px; text-align:center; height:325px;";
    DialogContent += "}";
    DialogContent += "#popup_teaser p {";
    DialogContent += "    display:block;";
    DialogContent += "    text-align:center;";
    DialogContent += "    font-size:1em;";
    DialogContent += "    line-height:1.3em;";
    DialogContent += "    font-weight:normal;";
    DialogContent += "    width:45em;";
    DialogContent += "    padding-left:0em;";
    DialogContent += "    margin-left:auto;";
    DialogContent += "    margin-right:auto;";
    DialogContent += "}";
    DialogContent += "#popup_teaser h1 span {";
    DialogContent += "    font-size:17px;";
    DialogContent += "    display:block;";
    DialogContent += "}";
    DialogContent += "#popup_button{";
    DialogContent += "    margin-top:20px;";
    DialogContent += "}";
    DialogContent += "#popup_button a:link{";
    DialogContent += "    text-decoration:underline;";
    DialogContent += "    color:#FFF;";
    DialogContent += "}";
    DialogContent += "#popup_button span{";
    DialogContent += "    font-family:Arial, Helvetica, sans-serif; font-weight:bold;";
    DialogContent += "}";
    DialogContent += "#popup_button .btn_cancel{";
    DialogContent += "    margin:2em;";
    DialogContent += "    font-size:1.5em;";
    DialogContent += "}";
    DialogContent += "#popup_button .btn_continue{";
    DialogContent += "    margin:2em;";
    DialogContent += "    font-size:1.5em;";
    DialogContent += "}";
    DialogContent += "</style>";  
 
    DialogContent += "</ head>";
    DialogContent += "<body>";
    DialogContent += "<div id='seal'>";
    DialogContent += "<div id='popup_Top'></div>";
    DialogContent += "<div id='popup_teaser'>";   
 
    DialogContent += popupText;
    
    DialogContent += "</div>";
    DialogContent += "<div id='popup_button'>";
    DialogContent += "    <a class='btn_cancel' href='javascript: self.close();'>Cancel</a>";
    DialogContent += "    <a class='btn_continue' href='javascript: redirectMe();'>Continue</a>";
    DialogContent += "    </div>";
    DialogContent += "</div>";
    DialogContent += "</body>";
    DialogContent += "</html>";
    return DialogContent;
}


//new function for popupbox
var newwindow;
function popupbox(url)
{
    newwindow=window.open(url, "name","toolbar=no,width=500,height=350,status=no,scrollbars=no,resizable=no");
}

//new function for bst pop up box 
var newwindow;
function popupbst(url,winname)
{
    newwindow=window.open(url, winname,'toolbar=no,menubar=yes,width=925,height=650,scrollbars=yes,resizable=yes');
    if (window.focus) {newwindow.focus()}
}
 
/*
function exitalert(url)  {
  adjWidth = 500;
  adjHeight = 350;
  var thisURL = encodeURIComponent(url);
  theWindow=window.open('/exit_win_new.cfm?url=' + thisURL + '','windowName','width=' + adjWidth + ',height=' +      adjHeight + ',top=100,left=100,toolbar=no,location=no,directories=no,status=no,menubar=no,scrollbars=no')
}
*/

function open_new_win(url)  {
    newWindow = window.open(url,"SubForm","toolbar=no,width=500,height=350,top=100,left=100,directories=no,status=no,scrollbars=yes,resizable=no,menubar=no")
}
 
//new-new linkalert
function rdExitAlert(goURL)  {
  //alert(goURL);
  adjWidth = 500;
  adjHeight = 350;
  //added for IE when opener object cannot be accessed
  //must capture calling URL and pass it
  //var thisURL = window.location.href;
  theWindow=window.open('/rdexit.htm?' + goURL + '','windowName','width=' + adjWidth + ',height=' +      adjHeight + ',top=100,left=100,toolbar=no,location=no,directories=no,status=no,menubar=no,scrollbars=no')
  //other approaches to IE problem that failed
  //window.self.name = "callingWindow"; for "target" of exit.htm link
  // Nav 3.0x and IE 3.0x create opener property automatically
  // for older versions, assign it here
  if (navigator.appVersion < 3) {
    if (theWindow.opener == null) {
            theWindow.opener = self;
        }
  }    
}