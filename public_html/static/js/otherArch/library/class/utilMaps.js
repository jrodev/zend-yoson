/*Extension para esta funcionalidad GMAPS (si desean guardarlo en otro archivo.)*/
function InfoBubble(a){this.extend(InfoBubble,google.maps.OverlayView);this.tabs_=[];this.activeTab_=null;this.baseZIndex_=100;this.isOpen_=false;var b=a||{};if(b["backgroundColor"]==undefined){b["backgroundColor"]=this.BACKGROUND_COLOR_}if(b["borderColor"]==undefined){b["borderColor"]=this.BORDER_COLOR_}if(b["borderRadius"]==undefined){b["borderRadius"]=this.BORDER_RADIUS_}if(b["borderWidth"]==undefined){b["borderWidth"]=this.BORDER_WIDTH_}if(b["padding"]==undefined){b["padding"]=this.PADDING_}if(b["arrowPosition"]==undefined){b["arrowPosition"]=this.ARROW_POSITION_}if(b["disableAutoPan"]==undefined){b["disableAutoPan"]=false}if(b["disableAnimation"]==undefined){b["disableAnimation"]=false}if(b["minWidth"]==undefined){b["minWidth"]=this.MIN_WIDTH_}if(b["shadowStyle"]==undefined){b["shadowStyle"]=this.SHADOW_STYLE_}if(b["arrowSize"]==undefined){b["arrowSize"]=this.ARROW_SIZE_}if(b["arrowStyle"]==undefined){b["arrowStyle"]=this.ARROW_STYLE_}this.buildDom_();this.setValues(b)}window["InfoBubble"]=InfoBubble;InfoBubble.prototype.ARROW_SIZE_=15;InfoBubble.prototype.ARROW_STYLE_=0;InfoBubble.prototype.SHADOW_STYLE_=1;InfoBubble.prototype.MIN_WIDTH_=50;InfoBubble.prototype.ARROW_POSITION_=50;InfoBubble.prototype.PADDING_=10;InfoBubble.prototype.BORDER_WIDTH_=1;InfoBubble.prototype.BORDER_COLOR_="#ccc";InfoBubble.prototype.BORDER_RADIUS_=10;InfoBubble.prototype.BACKGROUND_COLOR_="#fff";InfoBubble.prototype.extend=function(a,b){return function(a){for(var b in a.prototype){this.prototype[b]=a.prototype[b]}return this}.apply(a,[b])};InfoBubble.prototype.buildDom_=function(){var a=this.bubble_=document.createElement("DIV");a.style["position"]="absolute";a.style["zIndex"]=this.baseZIndex_;var b=this.tabsContainer_=document.createElement("DIV");b.style["position"]="relative";var c=this.close_=document.createElement("IMG");c.style["position"]="absolute";c.style["width"]=this.px(12);c.style["height"]=this.px(12);c.style["border"]=0;c.style["zIndex"]=this.baseZIndex_+1;c.style["cursor"]="pointer";c.src="http://maps.gstatic.com/intl/en_us/mapfiles/iw_close.gif";var d=this;google.maps.event.addDomListener(c,"click",function(){d.close();google.maps.event.trigger(d,"closeclick")});var e=this.contentContainer_=document.createElement("DIV");e.style["overflowX"]="auto";e.style["overflowY"]="auto";e.style["cursor"]="default";e.style["clear"]="both";e.style["position"]="relative";var f=this.content_=document.createElement("DIV");e.appendChild(f);var g=this.arrow_=document.createElement("DIV");g.style["position"]="relative";var h=this.arrowOuter_=document.createElement("DIV");var i=this.arrowInner_=document.createElement("DIV");var j=this.getArrowSize_();h.style["position"]=i.style["position"]="absolute";h.style["left"]=i.style["left"]="50%";h.style["height"]=i.style["height"]="0";h.style["width"]=i.style["width"]="0";h.style["marginLeft"]=this.px(-j);h.style["borderWidth"]=this.px(j);h.style["borderBottomWidth"]=0;var k=this.bubbleShadow_=document.createElement("DIV");k.style["position"]="absolute";a.style["display"]=k.style["display"]="none";a.appendChild(this.tabsContainer_);a.appendChild(c);a.appendChild(e);g.appendChild(h);g.appendChild(i);a.appendChild(g);var l=document.createElement("style");l.setAttribute("type","text/css");this.animationName_="_ibani_"+Math.round(Math.random()*1e4);var m="."+this.animationName_+"{-webkit-animation-name:"+this.animationName_+";-webkit-animation-duration:0.5s;"+"-webkit-animation-iteration-count:1;}"+"@-webkit-keyframes "+this.animationName_+" {from {"+"-webkit-transform: scale(0)}50% {-webkit-transform: scale(1.2)}90% "+"{-webkit-transform: scale(0.95)}to {-webkit-transform: scale(1)}}\n\n";l.textContent=m;document.getElementsByTagName("head")[0].appendChild(l)};InfoBubble.prototype.setBackgroundClassName=function(a){this.set("backgroundClassName",a)};InfoBubble.prototype["setBackgroundClassName"]=InfoBubble.prototype.setBackgroundClassName;InfoBubble.prototype.backgroundClassName_changed=function(){this.content_.className=this.get("backgroundClassName")};InfoBubble.prototype["backgroundClassName_changed"]=InfoBubble.prototype.backgroundClassName_changed;InfoBubble.prototype.setTabClassName=function(a){this.set("tabClassName",a)};InfoBubble.prototype["setTabClassName"]=InfoBubble.prototype.setTabClassName;InfoBubble.prototype.tabClassName_changed=function(){this.updateTabStyles_()};InfoBubble.prototype["tabClassName_changed"]=InfoBubble.prototype.tabClassName_changed;InfoBubble.prototype.getArrowStyle_=function(){return parseInt(this.get("arrowStyle"),10)||0};InfoBubble.prototype.setArrowStyle=function(a){this.set("arrowStyle",a)};InfoBubble.prototype["setArrowStyle"]=InfoBubble.prototype.setArrowStyle;InfoBubble.prototype.arrowStyle_changed=function(){this.arrowSize_changed()};InfoBubble.prototype["arrowStyle_changed"]=InfoBubble.prototype.arrowStyle_changed;InfoBubble.prototype.getArrowSize_=function(){return parseInt(this.get("arrowSize"),10)||0};InfoBubble.prototype.setArrowSize=function(a){this.set("arrowSize",a)};InfoBubble.prototype["setArrowSize"]=InfoBubble.prototype.setArrowSize;InfoBubble.prototype.arrowSize_changed=function(){this.borderWidth_changed()};InfoBubble.prototype["arrowSize_changed"]=InfoBubble.prototype.arrowSize_changed;InfoBubble.prototype.setArrowPosition=function(a){this.set("arrowPosition",a)};InfoBubble.prototype["setArrowPosition"]=InfoBubble.prototype.setArrowPosition;InfoBubble.prototype.getArrowPosition_=function(){return parseInt(this.get("arrowPosition"),10)||0};InfoBubble.prototype.arrowPosition_changed=function(){var a=this.getArrowPosition_();this.arrowOuter_.style["left"]=this.arrowInner_.style["left"]=a+"%";this.redraw_()};InfoBubble.prototype["arrowPosition_changed"]=InfoBubble.prototype.arrowPosition_changed;InfoBubble.prototype.setZIndex=function(a){this.set("zIndex",a)};InfoBubble.prototype["setZIndex"]=InfoBubble.prototype.setZIndex;InfoBubble.prototype.getZIndex=function(){return parseInt(this.get("zIndex"),10)||this.baseZIndex_};InfoBubble.prototype.zIndex_changed=function(){var a=this.getZIndex();this.bubble_.style["zIndex"]=this.baseZIndex_=a;this.close_.style["zIndex"]=a+1};InfoBubble.prototype["zIndex_changed"]=InfoBubble.prototype.zIndex_changed;InfoBubble.prototype.setShadowStyle=function(a){this.set("shadowStyle",a)};InfoBubble.prototype["setShadowStyle"]=InfoBubble.prototype.setShadowStyle;InfoBubble.prototype.getShadowStyle_=function(){return parseInt(this.get("shadowStyle"),10)||0};InfoBubble.prototype.shadowStyle_changed=function(){var a=this.getShadowStyle_();var b="";var c="";var d="";switch(a){case 0:b="none";break;case 1:c="40px 15px 10px rgba(33,33,33,0.3)";d="transparent";break;case 2:c="0 0 2px rgba(33,33,33,0.3)";d="rgba(33,33,33,0.35)";break}this.bubbleShadow_.style["boxShadow"]=this.bubbleShadow_.style["webkitBoxShadow"]=this.bubbleShadow_.style["MozBoxShadow"]=c;this.bubbleShadow_.style["backgroundColor"]=d;if(this.isOpen_){this.bubbleShadow_.style["display"]=b;this.draw()}};InfoBubble.prototype["shadowStyle_changed"]=InfoBubble.prototype.shadowStyle_changed;InfoBubble.prototype.showCloseButton=function(){this.set("hideCloseButton",false)};InfoBubble.prototype["showCloseButton"]=InfoBubble.prototype.showCloseButton;InfoBubble.prototype.hideCloseButton=function(){this.set("hideCloseButton",true)};InfoBubble.prototype["hideCloseButton"]=InfoBubble.prototype.hideCloseButton;InfoBubble.prototype.hideCloseButton_changed=function(){this.close_.style["display"]=this.get("hideCloseButton")?"none":""};InfoBubble.prototype["hideCloseButton_changed"]=InfoBubble.prototype.hideCloseButton_changed;InfoBubble.prototype.setBackgroundColor=function(a){if(a){this.set("backgroundColor",a)}};InfoBubble.prototype["setBackgroundColor"]=InfoBubble.prototype.setBackgroundColor;InfoBubble.prototype.backgroundColor_changed=function(){var a=this.get("backgroundColor");this.contentContainer_.style["backgroundColor"]=a;this.arrowInner_.style["borderColor"]=a+" transparent transparent";this.updateTabStyles_()};InfoBubble.prototype["backgroundColor_changed"]=InfoBubble.prototype.backgroundColor_changed;InfoBubble.prototype.setBorderColor=function(a){if(a){this.set("borderColor",a)}};InfoBubble.prototype["setBorderColor"]=InfoBubble.prototype.setBorderColor;InfoBubble.prototype.borderColor_changed=function(){var a=this.get("borderColor");var b=this.contentContainer_;var c=this.arrowOuter_;b.style["borderColor"]=a;c.style["borderColor"]=a+" transparent transparent";b.style["borderStyle"]=c.style["borderStyle"]=this.arrowInner_.style["borderStyle"]="solid";this.updateTabStyles_()};InfoBubble.prototype["borderColor_changed"]=InfoBubble.prototype.borderColor_changed;InfoBubble.prototype.setBorderRadius=function(a){this.set("borderRadius",a)};InfoBubble.prototype["setBorderRadius"]=InfoBubble.prototype.setBorderRadius;InfoBubble.prototype.getBorderRadius_=function(){return parseInt(this.get("borderRadius"),10)||0};InfoBubble.prototype.borderRadius_changed=function(){var a=this.getBorderRadius_();var b=this.getBorderWidth_();this.contentContainer_.style["borderRadius"]=this.contentContainer_.style["MozBorderRadius"]=this.contentContainer_.style["webkitBorderRadius"]=this.bubbleShadow_.style["borderRadius"]=this.bubbleShadow_.style["MozBorderRadius"]=this.bubbleShadow_.style["webkitBorderRadius"]=this.px(a);this.tabsContainer_.style["paddingLeft"]=this.tabsContainer_.style["paddingRight"]=this.px(a+b);this.redraw_()};InfoBubble.prototype["borderRadius_changed"]=InfoBubble.prototype.borderRadius_changed;InfoBubble.prototype.getBorderWidth_=function(){return parseInt(this.get("borderWidth"),10)||0};InfoBubble.prototype.setBorderWidth=function(a){this.set("borderWidth",a)};InfoBubble.prototype["setBorderWidth"]=InfoBubble.prototype.setBorderWidth;InfoBubble.prototype.borderWidth_changed=function(){var a=this.getBorderWidth_();this.contentContainer_.style["borderWidth"]=this.px(a);this.tabsContainer_.style["top"]=this.px(a);this.updateArrowStyle_();this.updateTabStyles_();this.borderRadius_changed();this.redraw_()};InfoBubble.prototype["borderWidth_changed"]=InfoBubble.prototype.borderWidth_changed;InfoBubble.prototype.updateArrowStyle_=function(){var a=this.getBorderWidth_();var b=this.getArrowSize_();var c=this.getArrowStyle_();var d=this.px(b);var e=this.px(Math.max(0,b-a));var f=this.arrowOuter_;var g=this.arrowInner_;this.arrow_.style["marginTop"]=this.px(-a);f.style["borderTopWidth"]=d;g.style["borderTopWidth"]=e;if(c==0||c==1){f.style["borderLeftWidth"]=d;g.style["borderLeftWidth"]=e}else{f.style["borderLeftWidth"]=g.style["borderLeftWidth"]=0}if(c==0||c==2){f.style["borderRightWidth"]=d;g.style["borderRightWidth"]=e}else{f.style["borderRightWidth"]=g.style["borderRightWidth"]=0}if(c<2){f.style["marginLeft"]=this.px(-b);g.style["marginLeft"]=this.px(-(b-a))}else{f.style["marginLeft"]=g.style["marginLeft"]=0}if(a==0){f.style["display"]="none"}else{f.style["display"]=""}};InfoBubble.prototype.setPadding=function(a){this.set("padding",a)};InfoBubble.prototype["setPadding"]=InfoBubble.prototype.setPadding;InfoBubble.prototype.getPadding_=function(){return parseInt(this.get("padding"),10)||0};InfoBubble.prototype.padding_changed=function(){var a=this.getPadding_();this.contentContainer_.style["padding"]=this.px(a);this.updateTabStyles_();this.redraw_()};InfoBubble.prototype["padding_changed"]=InfoBubble.prototype.padding_changed;InfoBubble.prototype.px=function(a){if(a){return a+"px"}return a};InfoBubble.prototype.addEvents_=function(){var a=["mousedown","mousemove","mouseover","mouseout","mouseup","mousewheel","DOMMouseScroll","touchstart","touchend","touchmove","dblclick","contextmenu","click"];var b=this.bubble_;this.listeners_=[];for(var c=0,d;d=a[c];c++){this.listeners_.push(google.maps.event.addDomListener(b,d,function(a){a.cancelBubble=true;if(a.stopPropagation){a.stopPropagation()}}))}};InfoBubble.prototype.onAdd=function(){if(!this.bubble_){this.buildDom_()}this.addEvents_();var a=this.getPanes();if(a){a.floatPane.appendChild(this.bubble_);a.floatShadow.appendChild(this.bubbleShadow_)}};InfoBubble.prototype["onAdd"]=InfoBubble.prototype.onAdd;InfoBubble.prototype.draw=function(){var a=this.getProjection();if(!a){return}var b=this.get("position");if(!b){this.close();return}var c=0;if(this.activeTab_){c=this.activeTab_.offsetHeight}var d=this.getAnchorHeight_();var e=this.getArrowSize_();var f=this.getArrowPosition_();f=f/100;var g=a.fromLatLngToDivPixel(b);var h=this.contentContainer_.offsetWidth;var i=this.bubble_.offsetHeight;if(!h){return}var j=g.y-(i+e);if(d){j-=d}var k=g.x-h*f;this.bubble_.style["top"]=this.px(j);this.bubble_.style["left"]=this.px(k);var l=parseInt(this.get("shadowStyle"),10);switch(l){case 1:this.bubbleShadow_.style["top"]=this.px(j+c-1);this.bubbleShadow_.style["left"]=this.px(k);this.bubbleShadow_.style["width"]=this.px(h);this.bubbleShadow_.style["height"]=this.px(this.contentContainer_.offsetHeight-e);break;case 2:h=h*.8;if(d){this.bubbleShadow_.style["top"]=this.px(g.y)}else{this.bubbleShadow_.style["top"]=this.px(g.y+e)}this.bubbleShadow_.style["left"]=this.px(g.x-h*f);this.bubbleShadow_.style["width"]=this.px(h);this.bubbleShadow_.style["height"]=this.px(2);break}};InfoBubble.prototype["draw"]=InfoBubble.prototype.draw;InfoBubble.prototype.onRemove=function(){if(this.bubble_&&this.bubble_.parentNode){this.bubble_.parentNode.removeChild(this.bubble_)}if(this.bubbleShadow_&&this.bubbleShadow_.parentNode){this.bubbleShadow_.parentNode.removeChild(this.bubbleShadow_)}for(var a=0,b;b=this.listeners_[a];a++){google.maps.event.removeListener(b)}};InfoBubble.prototype["onRemove"]=InfoBubble.prototype.onRemove;InfoBubble.prototype.isOpen=function(){return this.isOpen_};InfoBubble.prototype["isOpen"]=InfoBubble.prototype.isOpen;InfoBubble.prototype.close=function(){if(this.bubble_){this.bubble_.style["display"]="none";this.bubble_.className=this.bubble_.className.replace(this.animationName_,"")}if(this.bubbleShadow_){this.bubbleShadow_.style["display"]="none";this.bubbleShadow_.className=this.bubbleShadow_.className.replace(this.animationName_,"")}this.isOpen_=false};InfoBubble.prototype["close"]=InfoBubble.prototype.close;InfoBubble.prototype.open=function(a,b){if(InfoBubble.bubleOpened){InfoBubble.bubleOpened.close()}if(a){this.setMap(a)}if(b){this.set("anchor",b);this.bindTo("anchorPoint",b);this.bindTo("position",b)}this.bubble_.style["display"]=this.bubbleShadow_.style["display"]="";var c=!this.get("disableAnimation");if(c){this.bubble_.className+=" "+this.animationName_;this.bubbleShadow_.className+=" "+this.animationName_}this.redraw_();this.isOpen_=true;var d=!this.get("disableAutoPan");if(d){var e=this;window.setTimeout(function(){e.panToView()},200)}};InfoBubble.prototype["open"]=InfoBubble.prototype.open;InfoBubble.prototype.setPosition=function(a){if(a){this.set("position",a)}};InfoBubble.prototype["setPosition"]=InfoBubble.prototype.setPosition;InfoBubble.prototype.getPosition=function(){return this.get("position")};InfoBubble.prototype["getPosition"]=InfoBubble.prototype.getPosition;InfoBubble.prototype.position_changed=function(){this.draw()};InfoBubble.prototype["position_changed"]=InfoBubble.prototype.position_changed;InfoBubble.prototype.panToView=function(){var a=this.getProjection();if(!a){return}if(!this.bubble_){return}var b=this.getAnchorHeight_();var c=this.bubble_.offsetHeight+b;var d=this.get("map");var e=d.getDiv();var f=e.offsetHeight;var g=this.getPosition();var h=a.fromLatLngToContainerPixel(d.getCenter());var i=a.fromLatLngToContainerPixel(g);var j=h.y-c;var k=f-h.y;var l=j<0;var m=0;if(l){j*=-1;m=(j+k)/2}i.y-=m;g=a.fromContainerPixelToLatLng(i);if(d.getCenter()!=g){d.panTo(g)}};InfoBubble.prototype["panToView"]=InfoBubble.prototype.panToView;InfoBubble.prototype.htmlToDocumentFragment_=function(a){a=a.replace(/^\s*([\S\s]*)\b\s*$/,"$1");var b=document.createElement("DIV");b.innerHTML=a;if(b.childNodes.length==1){return b.removeChild(b.firstChild)}else{var c=document.createDocumentFragment();while(b.firstChild){c.appendChild(b.firstChild)}return c}};InfoBubble.prototype.removeChildren_=function(a){if(!a){return}var b;while(b=a.firstChild){a.removeChild(b)}};InfoBubble.prototype.setContent=function(a){this.set("content",a)};InfoBubble.prototype["setContent"]=InfoBubble.prototype.setContent;InfoBubble.prototype.getContent=function(){return this.get("content")};InfoBubble.prototype["getContent"]=InfoBubble.prototype.getContent;InfoBubble.prototype.content_changed=function(){if(!this.content_){return}this.removeChildren_(this.content_);var a=this.getContent();if(a){if(typeof a=="string"){a=this.htmlToDocumentFragment_(a)}this.content_.appendChild(a);var b=this;var c=this.content_.getElementsByTagName("IMG");for(var d=0,e;e=c[d];d++){google.maps.event.addDomListener(e,"load",function(){b.imageLoaded_()})}google.maps.event.trigger(this,"domready")}this.redraw_()};InfoBubble.prototype["content_changed"]=InfoBubble.prototype.content_changed;InfoBubble.prototype.imageLoaded_=function(){var a=!this.get("disableAutoPan");this.redraw_();if(a&&(this.tabs_.length==0||this.activeTab_.index==0)){this.panToView()}};InfoBubble.prototype.updateTabStyles_=function(){if(this.tabs_&&this.tabs_.length){for(var a=0,b;b=this.tabs_[a];a++){this.setTabStyle_(b.tab)}this.activeTab_.style["zIndex"]=this.baseZIndex_;var c=this.getBorderWidth_();var d=this.getPadding_()/2;this.activeTab_.style["borderBottomWidth"]=0;this.activeTab_.style["paddingBottom"]=this.px(d+c)}};InfoBubble.prototype.setTabStyle_=function(a){var b=this.get("backgroundColor");var c=this.get("borderColor");var d=this.getBorderRadius_();var e=this.getBorderWidth_();var f=this.getPadding_();var g=this.px(-Math.max(f,d));var h=this.px(d);var i=this.baseZIndex_;if(a.index){i-=a.index}var j={cssFloat:"left",position:"relative",cursor:"pointer",backgroundColor:b,border:this.px(e)+" solid "+c,padding:this.px(f/2)+" "+this.px(f),marginRight:g,whiteSpace:"nowrap",borderRadiusTopLeft:h,MozBorderRadiusTopleft:h,webkitBorderTopLeftRadius:h,borderRadiusTopRight:h,MozBorderRadiusTopright:h,webkitBorderTopRightRadius:h,zIndex:i,display:"inline"};for(var k in j){a.style[k]=j[k]}var l=this.get("tabClassName");if(l!=undefined){a.className+=" "+l}};InfoBubble.prototype.addTabActions_=function(a){var b=this;a.listener_=google.maps.event.addDomListener(a,"click",function(){b.setTabActive_(this)})};InfoBubble.prototype.setTabActive=function(a){var b=this.tabs_[a-1];if(b){this.setTabActive_(b.tab)}};InfoBubble.prototype["setTabActive"]=InfoBubble.prototype.setTabActive;InfoBubble.prototype.setTabActive_=function(a){if(!a){this.setContent("");return}var b=this.getPadding_()/2;var c=this.getBorderWidth_();if(this.activeTab_){var d=this.activeTab_;d.style["zIndex"]=this.baseZIndex_-d.index;d.style["paddingBottom"]=this.px(b);d.style["borderBottomWidth"]=this.px(c)}a.style["zIndex"]=this.baseZIndex_;a.style["borderBottomWidth"]=0;a.style["marginBottomWidth"]="-10px";a.style["paddingBottom"]=this.px(b+c);this.setContent(this.tabs_[a.index].content);this.activeTab_=a;this.redraw_()};InfoBubble.prototype.setMaxWidth=function(a){this.set("maxWidth",a)};InfoBubble.prototype["setMaxWidth"]=InfoBubble.prototype.setMaxWidth;InfoBubble.prototype.maxWidth_changed=function(){this.redraw_()};InfoBubble.prototype["maxWidth_changed"]=InfoBubble.prototype.maxWidth_changed;InfoBubble.prototype.setMaxHeight=function(a){this.set("maxHeight",a)};InfoBubble.prototype["setMaxHeight"]=InfoBubble.prototype.setMaxHeight;InfoBubble.prototype.maxHeight_changed=function(){this.redraw_()};InfoBubble.prototype["maxHeight_changed"]=InfoBubble.prototype.maxHeight_changed;InfoBubble.prototype.setMinWidth=function(a){this.set("minWidth",a)};InfoBubble.prototype["setMinWidth"]=InfoBubble.prototype.setMinWidth;InfoBubble.prototype.minWidth_changed=function(){this.redraw_()};InfoBubble.prototype["minWidth_changed"]=InfoBubble.prototype.minWidth_changed;InfoBubble.prototype.setMinHeight=function(a){this.set("minHeight",a)};InfoBubble.prototype["setMinHeight"]=InfoBubble.prototype.setMinHeight;InfoBubble.prototype.minHeight_changed=function(){this.redraw_()};InfoBubble.prototype["minHeight_changed"]=InfoBubble.prototype.minHeight_changed;InfoBubble.prototype.addTab=function(a,b){var c=document.createElement("DIV");c.innerHTML=a;this.setTabStyle_(c);this.addTabActions_(c);this.tabsContainer_.appendChild(c);this.tabs_.push({label:a,content:b,tab:c});c.index=this.tabs_.length-1;c.style["zIndex"]=this.baseZIndex_-c.index;if(!this.activeTab_){this.setTabActive_(c)}c.className=c.className+" "+this.animationName_;this.redraw_()};InfoBubble.prototype["addTab"]=InfoBubble.prototype.addTab;InfoBubble.prototype.updateTab=function(a,b,c){if(!this.tabs_.length||a<0||a>=this.tabs_.length){return}var d=this.tabs_[a];if(b!=undefined){d.tab.innerHTML=d.label=b}if(c!=undefined){d.content=c}if(this.activeTab_==d.tab){this.setContent(d.content)}this.redraw_()};InfoBubble.prototype["updateTab"]=InfoBubble.prototype.updateTab;InfoBubble.prototype.removeTab=function(a){if(!this.tabs_.length||a<0||a>=this.tabs_.length){return}var b=this.tabs_[a];b.tab.parentNode.removeChild(b.tab);google.maps.event.removeListener(b.tab.listener_);this.tabs_.splice(a,1);delete b;for(var c=0,d;d=this.tabs_[c];c++){d.tab.index=c}if(b.tab==this.activeTab_){if(this.tabs_[a]){this.activeTab_=this.tabs_[a].tab}else if(this.tabs_[a-1]){this.activeTab_=this.tabs_[a-1].tab}else{this.activeTab_=undefined}this.setTabActive_(this.activeTab_)}this.redraw_()};InfoBubble.prototype["removeTab"]=InfoBubble.prototype.removeTab;InfoBubble.prototype.getElementSize_=function(a,b,c){var d=document.createElement("DIV");d.style["display"]="inline";d.style["position"]="absolute";d.style["visibility"]="hidden";if(typeof a=="string"){d.innerHTML=a}else{d.appendChild(a.cloneNode(true))}document.body.appendChild(d);var e=new google.maps.Size(d.offsetWidth,d.offsetHeight);if(b&&e.width>b){d.style["width"]=this.px(b);e=new google.maps.Size(d.offsetWidth,d.offsetHeight)}if(c&&e.height>c){d.style["height"]=this.px(c);e=new google.maps.Size(d.offsetWidth,d.offsetHeight)}document.body.removeChild(d);delete d;return e};InfoBubble.prototype.redraw_=function(){this.figureOutSize_();this.positionCloseButton_();this.draw()};InfoBubble.prototype.figureOutSize_=function(){var a=this.get("map");if(!a){return}var b=this.getPadding_();var c=this.getBorderWidth_();var d=this.getBorderRadius_();var e=this.getArrowSize_();var f=a.getDiv();var g=e*2;var h=f.offsetWidth-g;var i=f.offsetHeight-g-this.getAnchorHeight_();var j=0;var k=this.get("minWidth")||0;var l=this.get("minHeight")||0;var m=this.get("maxWidth")||0;var n=this.get("maxHeight")||0;m=Math.min(h,m);n=Math.min(i,n);var o=0;if(this.tabs_.length){for(var p=0,q;q=this.tabs_[p];p++){var r=this.getElementSize_(q.tab,m,n);var s=this.getElementSize_(q.content,m,n);if(k<r.width){k=r.width}o+=r.width;if(l<r.height){l=r.height}if(r.height>j){j=r.height}if(k<s.width){k=s.width}if(l<s.height){l=s.height}}}else{var t=this.get("content");if(typeof t=="string"){t=this.htmlToDocumentFragment_(t)}if(t){var s=this.getElementSize_(t,m,n);if(k<s.width){k=s.width}if(l<s.height){l=s.height}}}if(m){k=Math.min(k,m)}if(n){l=Math.min(l,n)}k=Math.max(k,o);if(k==o){k=k+2*b}e=e*2;k=Math.max(k,e);if(k>h){k=h}if(l>i){l=i-j}if(this.tabsContainer_){this.tabHeight_=j;this.tabsContainer_.style["width"]=this.px(o);this.tabsContainer_.style["width"]=this.px(k)}this.contentContainer_.style["width"]=this.px(k);this.contentContainer_.style["height"]=this.px(l)};InfoBubble.prototype.getAnchorHeight_=function(){var a=this.get("anchor");if(a){var b=this.get("anchorPoint");if(b){return-1*b.y}}return 0};InfoBubble.prototype.anchorPoint_changed=function(){this.draw()};InfoBubble.prototype["anchorPoint_changed"]=InfoBubble.prototype.anchorPoint_changed;InfoBubble.prototype.positionCloseButton_=function(){var a=this.getBorderRadius_();var b=this.getBorderWidth_();var c=2;var d=2;if(this.tabs_.length&&this.tabHeight_){d+=this.tabHeight_}d+=b;c+=b;var e=this.contentContainer_;if(e&&e.clientHeight<e.scrollHeight){c+=15}this.close_.style["right"]=this.px(c);this.close_.style["top"]=this.px(d)};InfoBubble.bubleOpened=null;
/*peticion asicrona ajx (si desean guardarlo en otro archivo.)*/	

var ClassAjax = function(method, url){//method:GET o POST, url:"procc.php", container: object html

    var objAjax = null;
    var This    = this;
    this.method = method;
    this.url    = url;

    var Funcs = { //new Array("noinitialize","loading","loaded","interactive","complete");
        parent: This,
        /*this en este ambito hace referencia a este objeto (Funcs)*/
        state0: function(   ){this.parent.noinitiated()},//0 No inicializado (el método open no a sido llamado)
        state1: function(   ){this.parent.loading()},//1 Cargando (se llamó al método open)
        state2: function(   ){this.parent.loaded()},//2 Cargado (método send llamado se tiene cabecera de petición HTTP y status)
        state3: function(resp, sta){this.parent.interactive(resp, sta)},//3 Interactivo (la propiedad responseText tiene datos parciales)
        state4: function(resp, sta){this.parent.complete(resp, sta)} //4 Completado (objAjax.responseText tiene todos los datos pedidos al servidor)
    };
    //add o push functions for each event ( as a array events )  ????????????
    this.noinitiated = function(   ){/*alert("noinitiated")*/};
    this.loading     = function(   ){/*alert("loading")*/};
    this.loaded      = function(   ){/*alert("loaded")*/};
    this.interactive = function(resp, sta){/*alert(resp)*/};
    this.complete    = function(resp, sta){/*alert(Rsp+"-"+sta)*/};

    function doAjax(){  
        try{return new XMLHttpRequest()}
        catch(err){
            try{return new ActiveXObject("Microsoft.XMLHTTP")}
            catch (err){return null}
        }
    }

    (function(){                          
        objAjax = doAjax();               //Creamos el Objeto xmlHttpRequest   
    })();//method, url

    this.start = function(sendDat){//alert(cantSetReqH);

        var typDat = typeof(sendDat);
        var urlData = (typDat=="string")?sendDat:(typDat=="object")?sendDat.toUrl():"";
        var dataGet = (this.method.toLowerCase()=="get" )?"?"+urlData:"";
        var dataPost= (this.method.toLowerCase()=="post")?urlData:null;

        objAjax.open(this.method, this.url+dataGet, true);  //alert(Method); 
        objAjax.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        objAjax.onreadystatechange = function(){
            var numState = objAjax.readyState;    //Numero de estado del objeto
            //Segun el estado enviamos la Rpta al metodo correcto
            var ajaxResp = (numState==3||numState==4)?"objAjax.responseText":"''";
            //alert(numState);
            /*Ejecutamos metodo de Json func segun el estado. Tambien puede
            usar: Funcs["state"+numState](objAjax.responseText,numState);*/
            //alert("Funcs.state"+numState+"("+ajaxResp+","+numState+");");
            //eval("Funcs.state"+numState+"("+ajaxResp+","+numState+");");
            Funcs["state"+numState]((numState==3||numState==4)?objAjax.responseText:'',objAjax.readyState);
        };        
        objAjax.send(dataPost);
    };

    this.Close = function(){if(objAjax){this.objAjax.abort()}}

};

/*select sd (si desean guardarlo en otro archivo.)*/
eval(function(p,a,c,k,e,r){e=function(c){return(c<a?'':e(parseInt(c/a)))+((c=c%a)>35?String.fromCharCode(c+29):c.toString(36))};if(!''.replace(/^/,String)){while(c--)r[e(c)]=k[c]||e(c);k=[function(e){return r[e]}];e=function(){return'\\w+'};c=1};while(c--)if(k[c])p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c]);return p}('3 V=(4(){3 r=4(6,B){c 6.S(/\\$([1-9]+)/L,4(d,y){c B[12(y)-1]})};3 v=4(6,s){$.11({6:Y.X+6,U:\'R\',N:\'M\',p:s})};3 f={};3 z=4(8,i){f[8[i].7[0]]=[8[i].7[1]];j(8[i-1]&&8[i].7[0]==8[i-1].7[1]){f[8[i-1].7[0]].J(8[i].7[1])}};c{K:4(b){3 l=b.T,i=0,t=o;W(i<l){3 u=$(b[i].7[0]);3 5=$(b[i].7[1]);z(b,i);u.10(\'w\',(4(i,5){c 4(e,x){3 g=$(\'a:q\',o).I().O();3 h=$(f["#"+o.P].Q(\',\'));j(g==\'\'||g==\'-1\'){h.A(\'\').n(\'<a k="">C D E</a>\');c}h.F(\'G\',Z);3 6=r(b[i].6,[g]);v(6,t.p(5,x,H[2]))}})(i++,5))}},p:4(5){3 m=H;c 4(d){5.F(\'G\',13).A(\'\');j(d.14==\'15\'){$.16(d.17,4(i,e){5.n($(\'<a k="\'+i+\'">\'+e+\'</a>\').18(\'q\',(i==m[1])))});5.19(\'w\',[m[2]])}1a 5.n(\'<a k="">C D E</a>\')}},1b:4(){}}})();',62,74,'|||var|function|selB|url|ids|oPrms||option|oParams|return|res||treeDeps|valSel|objDeps||if|value||Args|append|this|success|selected|setUrl|fnc|THIS|selA|ajxReq|change|idB|match|setTreeDeps|html|pars|No|hay|registros|prop|disabled|arguments|val|push|init|gi|json|dataType|trim|id|join|get|replace|length|type|sd|while|baseHost|AppWeb|true|bind|ajax|parseInt|false|status|ok|each|data|attr|trigger|else|destroy'.split('|'),0,{}));



/*FRW: DOM.js*/
/*=====================================================================================================
*@description: Natives Extends
**//*=================================================================================================*/

/**-----------------------------------------------------------------------------------------------------
 * Borrando espacio a la derecha e izquierda de un texto
 * @require extendj -> trim()
 * @return {String} texto ya limpio
 *//*---------------------------------------------------------------------------------------------------*/
window.JSON = window.JSON||{}; 
JSON.stringify = JSON.stringify || function (obj) {
    var t=typeof (obj);
    if (t!="object" || obj===null) {
        if (t=="string") obj='"'+obj+'"'; // simple data type
        return String(obj);
    }else{ // recurse array or object
        var n, v, json=[], arr=(obj && obj.constructor==Array);
        for(n in obj){
            v=obj[n]; t=typeof(v);
            if (t=="string") v='"'+v.trim()+'"';
            else if(t=="object" && v!==null) v=JSON.stringify(v);
            json.push((arr?"":'"'+n+'":')+String(v));
        }//Las comas del json aparecen al pasar array a string implicitamente
        return ( (arr?"[" : "{")+String(json)+(arr?"]":"}") ).split(''); 
    }
};
/**-----------------------------------------------------------------------------------------------------
* Borrando espacio a la derecha e izquierda de un texto
* @return {String} texto ya limpio
*//*---------------------------------------------------------------------------------------------------*/
if(typeof String.prototype.trim !== 'function') {
    String.prototype.trim = function() {return this.replace(/^\s+|\s+$/g, '');}
}

/**-----------------------------------------------------------------------------------------------------
* Verificar si un elemento esta dentro de un array
* @return {Boolean} Si hay una coincidencia retorna true de lo contrario false
*//*----------------------------------------------------------------------------------------------------*/
Array.prototype.inArray=function(ele){
    for(var j in this){if(this[j]==ele){return true;}} 
    return false;     
};

/**-----------------------------------------------------------------------------------------------------
* Cache de resultados de funciones
* @return {Variant} Retorna el resultado anterior para una funcion definida por nombre y argumentos
*//*----------------------------------------------------------------------------------------------------*/
Function.prototype.cache = function(sFName){
    window.CACHE=window.CACHE||{};
    var oTHAT=this; //Console.log(oTHAT.arguments.callee.toString());
    //var sFNAME = /^function\s+([^(]+)/.exec(arguments.callee.toString())[1]; //Console.log(sFNAME);
    return function(){
        var aArgs = [];
        for(var i in arguments)if(arguments[i])aArgs.push(arguments[i]);     
        var index = sFName+'-'+aArgs.join('-');
        console.log("TEST CACHE: index = "+index);
        if(index in window.CACHE){/*probar con: oCACHE.hasOwnProperty(index)*/  
            console.log('__Exist Cache for: fnc['+sFName+'] - index['+index+']');
            return window.CACHE[index];
        }else{
            console.log('__Caching for: fnc['+sFName+'] - index['+index+']'); 
            return window.CACHE[index] = oTHAT.apply(oTHAT, arguments);
        }  
    };  
};

(function(wind, undef){

    wind._nav_ = wind.navigator;
    wind._doc_ = wind.document;

    /*@Herencia [coffeeScript technique]*/
    wind._extends = function(child, parent){
        for(var key in parent){if(parent.hasOwnProperty(key))child[key]=parent[key];}
        function cnstr(){this.constructor=child;} //console.log(this);
        cnstr.prototype = parent.prototype;
        child.prototype = new cnstr;
        child.__super__ = parent.prototype;
        return child;
    };

    /*========================================================================================================
     *@class _DOM
     *@description: Clase de generadora de obj wind.DOM para la manipualcion del DOM
     **//*===================================================================================================*/
    wind._DOM = (function(doc){

        /*----------------------------------------------------------------------------------------------------
         *@private
         *@description: Listado de eventos nativos.
         **//*------------------------------------------------------------------------------------------------*/
        var nativeEvents = [
            'click', 'dblclick', 'mouseup', 'mousedown', 'contextmenu', //mouse buttons
            'mousewheel', 'DOMMouseScroll', //mouse wheel
            'mouseover', 'mouseout', 'mousemove', 'selectstart', 'selectend', //mouse movement
            'keydown', 'keypress', 'keyup', //keyboard
            'orientationchange', //mobile
            'touchstart', 'touchmove', 'touchend', 'touchcancel', //touch
            'gesturestart', 'gesturechange', 'gestureend', //gesture
            'focus', 'blur', 'change', 'reset', 'select', 'submit', 'paste', 'input', //form elements
            'load', 'unload', 'beforeunload', 'resize', 'move', 'DOMContentLoaded', 'readystatechange', //window
            'error', 'abort', 'scroll' //misc
        ];

        /*----------------------------------------------------------------------------------------------------
         *@constructor
         *@description: Retorna un array pero se puede usar los metodos adociados a el (gracias a artificio @A1)
         *//*------------------------------------------------------------------------------------------------*/
        function Dom(/*arguments*/){
            Dom.that = this;
            var args=arguments, _objs=[]; //Dom.browser=_browser;
            this.getObjs = function(){ return _objs };
            if(typeof(args[0])==="object") _objs=(args[0].constructor===Array)?args[0]:[args[0]];
            else _objs = aObjs.cache("aObjs")(args[0], args[1]); //console.log("_objs *-*-*->> ",_objs);
            //Esto asocia a este objeto indices : dom('...')[i] asi se puede acceder a los items por indice tambien
            for(var l=_objs.length,i=0; i<l; i++) this[i]=_objs[i];
            return this; /*Array de todos los objetos obtenidos segun el selector*/
        }

        /*----------------------------------------------------------------------------------------------------
         *@utils
         **//*------------------------------------------------------------------------------------------------*/
        Dom.isNull  = function(vVal){ return (typeof(vVal)==='undefined') };
        Dom.noEmpty = function(sVal){ return (!Dom.isNull(sVal)&&sVal!=='') };
        Dom.isType  = function(oVal, sType){
            if(Dom.isNull(oVal)) return false;
            return new RegExp('('+sType+')','gi').test(oVal.constructor+'');
        };

        function evArgs(oArgs, nLine){
            var rules={o:'object',f:'function',n:'number',s:'string',a:'array'}, ok=true;
            console.log(oArgs);
            for(var sNomArg in oArgs){ //console.log('******************** ',Dom.isNull(oArgs[sNomArg]),oArgs[sNomArg]);
                if(Dom.isNull(oArgs[sNomArg])){
                    ok=false; console.log(sNomArg+':==>', 'is undefined - in line:'+nLine); break;
                }/*if !null*/
                var sPref=sNomArg.charAt(0), sType=rules[sPref], eType=new RegExp('('+sType+')','gi');
                var sCnstr=oArgs[sNomArg].constructor.toString(), sErr='no type:['+sType+']';
                console.log('sType:',sType,' :: sCnstr:',sCnstr,' :: ',eType.test(sCnstr));
                console.log("Antes FOR: oArgs[sNomArg]",oArgs[sNomArg]);
                if( (!eType.test(sCnstr)) || (sPref=='s' && oArgs[sNomArg]=='' && (sErr='String empty')) ){//Si no es del tipo de dato indicado
                    ok=false;
                    console.log("oArgs[sNomArg]:",oArgs[sNomArg], " eType.test(sCnstr):",eType.test(sCnstr), sNomArg+':==>',sErr+' - in line:'+nLine);
                }
            } return ok;
        }

        /*----------------------------------------------------------------------------------------------------
         *@static
         *@description:  Obtenemos un objeto con la version y el navegador en que estamos.
         *@return {object}: { browser:{msie:true,opera:false,...}, version:'7.0' }
         *//*------------------------------------------------------------------------------------------------*/
        Dom.browser = (function(){
            var m = (function(ua){ /*matched*/
                ua = ua.toLowerCase();
                var chr=/(chrome)[ \/]([\w.]+)/.exec(ua), 
                wbk=/(webkit)[ \/]([\w.]+)/.exec(ua),
                opr=/(opera)(?:.*version|)[ \/]([\w.]+)/.exec(ua), 
                ie =/(msie) ([\w.]+)/.exec(ua),
                moz=/(mozilla)(?:.*? rv:([\w.]+)|)/.exec(ua),
                mch=chr||wbk||opr||ie||ua.indexOf("compatible")<0 && moz||[];
                console.log("browser: ",mch);
                return {brw:mch[1]||"", ver:mch[2]||"0"};
            })(_nav_.userAgent), nav={};
            if(m.brw){ nav[m.brw]=true; nav.version=m.ver }
            if(nav.chrome){ nav.webkit=true }else if(nav.webkit){ nav.safari=true }
            /*console.log('browser==>',nav);*/ return nav;
        })();

        /*----------------------------------------------------------------------------------------------------
         *@private
         *@param : fncs{array} Array que contiene funciones
         *@description: Ejecuta todas las funciones contenidas en fncs
         *//*------------------------------------------------------------------------------------------------*/	
        function runFncs(oFncs){ //alert('runFncs');
            for(var i in oFncs){
                if(Dom.isType(arguments[1], 'array'))
                    oFncs[i].apply(arguments[2], arguments[1]);
                else oFncs[i].call(arguments[2], arguments[1]); //console.log('[',i,'|',oFncs[i],']');
            }//for(var i=0,l=fncs.length;i<l;i++)fncs[i](arguments[1],arguments[2])
        }

        /*----------------------------------------------------------------------------------------------------
         *@private
         *@param : rules{string} Selector CSS para obtener elementos DOM (El css del navegador limitara la sintaxis)
         *@description: Obtener todos los objetos del DOM segun selector CSS
         *//*------------------------------------------------------------------------------------------------*/
        function aObjs(rules, context){ //console.log('_browser-->'); console.log(_browser);
            console.log("TEST GETOBJS: rule = "+rules);
            if(Dom.browser.msie && Dom.browser.version=='7.0'){ //console.log('ie7');
                var stl = doc.createStyleSheet();
                var all = (typeof(context)!=="undefined")?context.getElementsByTagName('*'):doc.all; //console.log("getElementsByTagName");
                var rules=rules.replace(/\[for\b/gi, '[htmlFor').split(','); /*for attr de label debe se htmlFor para evitar prob en IE 7 */
                var rpta=[], i=rules.length, j=all.length; //rules.length>0 si esq rules entro separado por comas.
                console.log("__rules.len=",i," | all.len=",j);
                while(i--) stl.addRule(rules[i],'mark:mark'); //marcando las Reglas tiene que ver con por ejm:  form #a{ k:v }
                while(j--) if(all[j].currentStyle.mark){ console.log('__inner('+all[j].id+'): '+all[j].innerHTML); rpta.push(all[j]);} //Agregando los elementos que contienes esa regla(mark)
                var k = stl.rules.length; console.log("__stl.rules.len=",k);
                while(k--){ console.log("__stl.rules[k]: ", stl.rules[k]); stl.removeRule(k); }  /* Removemos la regla(la unica) para qn en la sgte iteracion se le asocie */
                if(rpta.length){
                    console.log("__rpta.length:  --->",rpta.length);
                    console.log("__rpta[0].value:--->",rpta[0].value);
                    console.log("__rpta[0]:      --->",rpta[0]);
                    console.log("__rpta:         --->",rpta);                    
                }
                return rpta;
            }else try{ return (context||doc).querySelectorAll(rules) }catch(e){ console.log(e.message); return [] }
        };
        //Dom.prototype.data = function(key){return DOM.data(key)};

        /*----------------------------------------------------------------------------------------------------
         * @public @function: val 
         * @param       : sVal {string}
         * @description : Asigna un valor a un elemento (usar con formElements). Si no se ingresa un parametro
         * devuelve el valor del primer elemento del grupo (por eso usar con selectores q develvan un elemento.)
         *//*------------------------------------------------------------------------------------------------*/			
        Dom.prototype.val = function(sVal){
            var _objs=this.getObjs(), l=_objs.length, i=0;
            if(typeof(sVal)!=='undefined')while(i<l)_objs[i++].value=sVal;
            else return _objs[0].value; //return this;
        };

        /*----------------------------------------------------------------------------------------------------
         * @public @function: each 
         * @param       : fnc {function}
         * @description : Itera un grupo de elementos DOM para manipularlo con fnc. fnc tiene
         * 3 parametros i(indice), v(valor), a(array de todos los elementos).
         *//*------------------------------------------------------------------------------------------------*/
        Dom.prototype.each = function(fnc /*, cntxt*/){//console.log('browser-->');console.log(browser);return browser;
            var _objs=this.getObjs(), l=_objs.length, i=0, cntxt=arguments[1];
            if(typeof(fnc)!=="function"){throw "74: No function"}
            while(i<l) if(i in _objs)fnc.call(cntxt, i, _objs[i++], _objs);
            return this;
        };

        /*----------------------------------------------------------------------------------------------------
         * @public @function: addClass 
         * @param{HTMLElement} ele : Elemento html al que se le adicionara una clase CSS.
         * @param{String}      cls : Cadena con el nombre de la clase CSS.
         * @description: -Adicionando una clase a un elemento Html Si esque ya tiene una clase, la adiciona 
         * separandolas con un espacio. @example: DOM('[selector]').addClass('classLayout');
         *//*------------------------------------------------------------------------------------------------*/
        Dom.prototype.addClass = function(cls){
            var _objs=this.getObjs(), l=_objs.length, i=0, exp=new RegExp('(\\s|^)'+cls+'(\\s|$)');
            while(i<l)  //Recorriendo objetos obtenidos por el selector
                if(!_objs[i].className.match(exp))//Si no tiene la clase se le agrega
                    _objs[i++].className += " "+cls;
            return this;
        };

        /*----------------------------------------------------------------------------------------------------
         * Eliminamos una clase de un elemento Html
         * @param{HTMLElement} ele : Elemento html al que se le eliminara una clase CSS.
         * @param{String}      cls : Cadena con el nombre de la clase CSS a eliminar.
         * @example                : DOM('[selector]').delClass('classLayout');
         *//*------------------------------------------------------------------------------------------------*/
        Dom.prototype.delClass = function(cls){
            var _objs=this.getObjs(), l=_objs.length, i=0, exp=new RegExp('(\\s|^)'+cls+'(\\s|$)');
            while(i<l)  //Recorriendo objetos obtenidos por el selector
                if(_objs[i].className.match(exp))//Si se encuentra la clase se la elimina
                    _objs[i].className=_objs[i++].className.replace(exp,' ');
            return this;
        };

        /*----------------------------------------------------------------------------------------------------
         * a un Objeto(obj) se le adiciona un evento(sType) con una funcionalidad(fn)
         * @param{HTMLElement} obj  : Elemento html al que se le adiciona el evento.
         * @param{String}      sType: Tipo de evento: ('click','change','blur' ... ).
         * @param{Function}    fnc  : funcion con instrucciones a ejecutar para dicho evento.
         * @example                 : DOM('[selector]').addEvent('click', function(){ alert('click!!'); });
         *//*------------------------------------------------------------------------------------------------*/
        Dom.prototype.addEvent = function(sEvt, fFn){
            //if(!evArgs({sEvt:sEvt, fFn:fFn},200))return;
            var _objs=this.getObjs(), l=_objs.length, i=-1; //console.log(_objs);
            while(++i<l){
                if(Dom.isNull(_objs[i].events)) _objs[i].events={};     //console.log('hasListener:',hasListener);
                var hasListener = _objs[i].events.hasOwnProperty(sEvt); //Escuchador del Evento (click, change, ...)
                if(!hasListener) _objs[i].events[sEvt]={}; //Si no se agrego dicho evento antes para este( _objs[i] )
                _objs[i].events[sEvt]['f-'+fFn]=fFn; //_objs[i].events[sEvt].push(fFn);
                if(!hasListener) /*Creando listener para oir un evento tipo:sEvt */
                    if(_objs[i].attachEvent){
                        _objs[i].attachEvent('on'+sEvt, (function(i){
                            return function(){ runFncs(_objs[i].events[sEvt], window.event, _objs[i]) }
                        })(i));
                    }else _objs[i].addEventListener(sEvt, (function(i){
                        return function(e){ runFncs(_objs[i].events[sEvt], e, _objs[i]) }
                    })(i), false);
            } return this;
        };

        /*----------------------------------------------------------------------------------------------------
         * a un Objeto(obj) se le adiciona un evento(sEvt) con una funcionalidad(fFn)
         * @param{HTMLElement} obj  : Elemento html al que se le adiciona el evento.
         * @param{String}      sEvt: Tipo de evento: ('click','change','blur' ... ).
         * @param{Function}    fnc  : funcion con instrucciones a ejecutar para dicho evento.
         * @example
         * addEvent(document.getElementById('miInput'), 'click', function(){ alert('click!!'); });
         *//*------------------------------------------------------------------------------------------------*/
        Dom.prototype.delEvent = function(sEvt, fFn){
            //if(!evArgs({sEvt:sEvt, fFn:fFn},229))return;
            var _objs=this.getObjs(), l=_objs.length, i=-1;
            while(++i<l)
                if(!Dom.isNull(fFn))
                    delete _objs[i].events[sEvt]['f-'+fFn];
                else{
                    _objs[i].events[sEvt]=null; delete _objs[i].events[sEvt];
                    if(_objs[i].detachEvent){
                        _objs[i].detachEvent('on'+sEvt, runFncs/*, _objs[i].events[sEvt]['f-'+fFn]*/);
                    }else _objs[i].removeEventListener(sEvt, runFncs);							
                }
            return this;
        };

        /*----------------------------------------------------------------------------------------------------
         * @public @function: fireEvent 
         * @param       : sVal {string}
         * @description : Asigna un valor a un elemento (usar con formElements). Si no se ingresa un parametro
         * devuelve el valor del primer elemento del grupo (por eso usar con selectores q develvan un elemento.)
         *//*------------------------------------------------------------------------------------------------*/	
        Dom.prototype.fireEvent = function(sEvt, aArgs){
            var _objs=this.getObjs(), l=_objs.length, i=-1, isCEO=_doc_.createEventObject, tArr=Dom.isType(aArgs,'array');
            //console.log(Dom.isType(aArgs,'array')); console.log(Dom.isType(aArgs,'object'))
            var evt=isCEO?isCEO():_doc_.createEvent("HTMLEvents");
            while(++i<l)
                if(tArr && !Dom.isNull(_objs[i].events) && !Dom.isNull(_objs[i].events[sEvt]))
                    runFncs(_objs[i].events[sEvt], aArgs);
                else{
                    if(isCEO){ return _objs[i].fireEvent('on'+sEvt, evt) }//dispatch for IE
                    else{ //dispatch for firefox + others
                        evt.initEvent(sEvt, true, true); //event type, bubbling, cancelable
                        return _objs[i].dispatchEvent(evt);
                    }
                }
            return this;
        };

        /*----------------------------------------------------------------------------------------------------
         * @private
         * @param : fncs{array} Array que contiene funciones
         * @description: Ejecuta todas las funciones contenidas en fncs
         *//*------------------------------------------------------------------------------------------------*/
        Dom.create = function(sType, oAttr){
            var ele = document.createElement(sType), d=wind.DOM;
            if (!ele){ console.trace(); console.log('19:Elemento no valido!'); return false;}
            for(var a in oAttr){
                console.log("| ---> "+a);
                if(a=='style'){
                    for(var s in oAttr['style'])ele.style[s]=oAttr['style'][s]; continue
                }
                if(a=='events'){
                    for(var e in oAttr['events'])d(ele).addEvent(e, oAttr['events'][e]); continue
                }                            
                if(a=='html'){ ele.innerHTML=oAttr['html']; continue }
                ele[a] = oAttr[a]; //Atributos comunes del elemento.
            } return d(ele);
        };

        return Dom;

    })(_doc_);

    wind.DOM = function(rules, context){ return new wind._DOM(rules, context) }; /*<====@A1*/
    for(var i in wind._DOM)wind.DOM[i] = wind._DOM[i];  /*Asignacion de paramentros staticos.*/
    /*@browser Detectando el navegador y la version [jQ technique]*/
    (function(nav){ })(wind.navigator);

})(window);