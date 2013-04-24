/******************************************************************************
 *            Copyright (c) 2006-2011 Michel Gutierrez. All Rights Reserved.
 ******************************************************************************/

EXPORTED_SYMBOLS=["DWHelperSafeModeHandlerService"];

Components.utils['import']("resource://dwhelper/util-service.jsm");

var DWHelperSafeModeHandlerService = {
	mProcessor: null,
	start: function() { this.get(); },
	get: function() {
		try {
			if(this.mProcessor==null) {
				this.mProcessor=new SafeModeHandler();
			}
		} catch(e) {
			dump("!!! [SafeModeHandlerService] "+e+"\n");
		}
		return this.mProcessor;
	}
}

/**
* Object constructor
*/
function SafeModeHandler() {
	//dump("[SafeModeHandler] constructor\n");
	this.init();
}

SafeModeHandler.prototype = {
		get loadCookie() { return this.mLoadCookie; },
		set loadCookie(newval) { return this.mLoadCookie=newval; },
		get parentContentListener() { return this.mParentContentListener; },
		set parentContentListener(newval) { return this.mParentContentListener=newval; }
}

SafeModeHandler.prototype.init = function() {
	//dump("[SafeModeHandler] init()\n");
	var prefService=Components.classes["@mozilla.org/preferences-service;1"]
	                                   .getService(Components.interfaces.nsIPrefService);
	this.pref=prefService.getBranch("dwhelper.");
    var uriLoader = Components.classes["@mozilla.org/uriloader;1"].getService(Components.interfaces.nsIURILoader);
    uriLoader.registerContentListener(this);
    this.updateMode();	
}

SafeModeHandler.prototype.updateMode = function() {
	var safe=false;
	try {
		safe=this.pref.getBoolPref("safe-mode");
	} catch(e) {}
	if(!safe) {
		var ios = Components.classes["@mozilla.org/network/io-service;1"]
		                             .getService(Components.interfaces.nsIIOService);
		var uri = ios.newURI("http://www.downloadhelper.net/", null, null);
		var cookieSvc =
			Components.classes["@mozilla.org/cookieService;1"]
			                   .getService(Components.interfaces.nsICookieService);
		var cookieStr = cookieSvc.getCookieString(uri, null);
		if(cookieStr!=null) {
			var cookies=cookieStr.split(";");
			for(var i=0;i<cookies.length;i++) {
				if(/^ *(.*?) *$/.exec(cookies[i])[1]=="sa0=1") {
					safe=true;
					break;
				}
			}
		}
	}
	this.setMode(safe);
}

SafeModeHandler.prototype.setMode = function(safe) {
	this.setCookies(safe);
	this.pref.setBoolPref("safe-mode",safe);
}

SafeModeHandler.prototype.setCookies = function(safe) {
	try {
		var cMgr = Components.classes["@mozilla.org/cookiemanager;1"].
           getService(Components.interfaces.nsICookieManager2);
		var cname="saf";
		if(safe) {
			var cookieDate=new Date().getTime()/1000+60*60*24*365*18;
			var cvalue="1";
	        try {
				cMgr.add(".downloadhelper.net","/",cname,""+cvalue,false,true,cookieDate);
				cMgr.add(".vidohe.com","/",cname,""+cvalue,false,true,cookieDate);
			} catch(e) {
				cMgr.add(".downloadhelper.net","/",cname,""+cvalue,false,true,false,cookieDate);
				cMgr.add(".vidohe.com","/",cname,""+cvalue,false,true,false,cookieDate);
			}
		} else {
			cMgr.remove(".www.downloadhelper.net",cname,"/",false);
			cMgr.remove(".www.vidohe.com",cname,"/",false);
			cMgr.remove(".downloadhelper.net",cname,"/",false);
			cMgr.remove(".vidohe.com",cname,"/",false);
		}
	} catch(e) {
		dump("[SafeModeHandler] setMode("+safe+") error: "+e+"\n");	
	}
}

SafeModeHandler.prototype.canHandleContent = function( 
	contentType, 
	isContentPreferred, 
	desiredContentType )  {

	//dump("[SafeModeHandler] canHandleContent contentType: "+contentType+"\n");

	if(contentType=="application/x-downloadhelper-safe-mode") 
		return true;
	else
		return false;
	
}

SafeModeHandler.prototype.doContent = function( 
	contentType , 
	isContentPreferred , 
	request , 
	contentHandler ) {
	
	//dump("[SafeModeHandler] doContent contentType: "+contentType+"\n");

	if(contentType!="application/x-downloadhelper-safe-mode")
		return false;
		
	function StreamListener(service) {
		this.service=service;
	}

	StreamListener.prototype={
		QueryInterface: function(iid) {
		    if (!iid.equals(Components.interfaces.nsISupports) && 
		    	!iid.equals(Components.interfaces.nsIStreamListener)) {
		            throw Components.results.NS_ERROR_NO_INTERFACE;
		        }
		    return this;
		},
		onStartRequest: function(request,context) {

			try {

			this.httpChannel=request.QueryInterface(Components.interfaces.nsIHttpChannel);
			this.responseStatus=this.httpChannel.responseStatus;
			this.responseStatusText=this.httpChannel.responseStatusText;
			this.contentType=this.httpChannel.getResponseHeader("content-type");			
			this.data="";
			
			//dump("[SafeModeHandler/StreamListener] onStartRequest response: "+
			//	this.responseStatus+" "+this.responseStatusText+"\n");

			} catch(e) {
				dump("[SafeModeHandler/StreamListener] onStartRequest error: "+e+"\n");	
			}

		},
		onDataAvailable: function(request,context,inputStream,offset,count) {
			//dump("[SafeModeHandler/StreamListener] onDataAvailable\n");	

			try {
			
			var sstream = Components.classes["@mozilla.org/intl/converter-input-stream;1"]
                   .createInstance(Components.interfaces.nsIConverterInputStream);
			sstream.init(inputStream, "utf-8", 256, 
				Components.interfaces.nsIConverterInputStream.DEFAULT_REPLACEMENT_CHARACTER);

			var str={};
			var n=sstream.readString(128,str);
			while(n>0) {
				this.data+=str.value;
				//dump("[SafeModeHandler/StreamListener] onDataAvailable read: "+str.value+"\n");	
				str={};
				n=sstream.readString(128,str);
			}

			} catch(e) {
				dump("[SafeModeHandler/StreamListener] onDataAvailable error: "+e+"\n");	
			}

		},
		onStopRequest: function(request,context,nsresult) {
			//dump("[SafeModeHandler/StreamListener] onStopRequest\n");

			try {

			if(this.responseStatus==200) {

				//dump("[SafeModeHandler/StreamListener] parsing data: "+this.data+"\n");			
					
				var parser=Components.classes["@mozilla.org/xmlextras/domparser;1"].
					createInstance(Components.interfaces.nsIDOMParser);
				var doc=parser.parseFromString(this.data,"text/xml");
				if(doc!=null) {
					var mode=Util.xpGetString(doc.documentElement,"/safe-mode/mode");
					if(mode!="false") {
						mode=true;
					} else {
						mode=false;
					}
					var promptService=Components.classes["@mozilla.org/embedcomp/prompt-service;1"]
					                          			.getService(Components.interfaces.nsIPromptService);
					var currentMode=this.service.pref.getBoolPref("safe-mode");
					if(currentMode==mode) {
						promptService.alert(null,Util.getText("title.safe-mode-handler"),Util.getText("message.safe-mode-unchanged"));
					} else {
						if(mode) {
							if(promptService.confirm(null,Util.getText("title.safe-mode-handler"),Util.getText("message.confirm-safe-mode-in")))
								this.service.setMode(true);
						} else {
							if(promptService.confirm(null,Util.getText("title.safe-mode-handler"),Util.getText("message.confirm-safe-mode-out")))
									this.service.setMode(false);
						}
					}
				} else {
					dump("[SafeModeHandler/StreamListener] invalid safe-mode file: "+this.data+"\n");
				}
			}
			
			} catch(e) {
				dump("[SafeModeHandler/StreamListener] onStopRequest error: "+e+"\n");
			}

		}
	}
	
	try {
		contentHandler.value=new StreamListener(this);
	} catch(e) {
		dump("[SafeModeHandler] openAsync error: "+e+"\n");	
	}
		
	return false;
}

SafeModeHandler.prototype.isPreferred = function( 
	contentType , 
	desiredContentType ) {

	//dump("[SafeModeHandler] isPreferred contentType: "+contentType+"\n");

	if(contentType=="application/x-downloadhelper-safe-mode") 
		return true;
	else
		return false;

}


SafeModeHandler.prototype.onStartURIOpen = function( URI ) {
	return false;
}

SafeModeHandler.prototype.GetWeakReference = function( ) {
	return this;
}

SafeModeHandler.prototype.QueryInterface = function(iid) {
    if (iid.equals(Components.interfaces.nsISupports) || 
       	iid.equals(Components.interfaces.nsIURIContentListener) ||
    	iid.equals(Components.interfaces.nsISupportsWeakReference)
    	) {
    		return this;
        }
    throw Components.results.NS_ERROR_NO_INTERFACE;
}
