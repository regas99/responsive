/*ADOBE SYSTEMS INCORPORATED
Copyright 2007 Adobe Systems Incorporated
All Rights Reserved.

NOTICE:  Adobe permits you to use, modify, and distribute this file in accordance with the
terms of the Adobe license agreement accompanying it.  If you have received this file from a
source other than Adobe, then your use, modification, or distribution of it requires the prior
written permission of Adobe.*/
function cfinit(){
if(!window.ColdFusion){
ColdFusion={};
var $C=ColdFusion;
if(!$C.Ajax){
$C.Ajax={};
}
var $A=$C.Ajax;
if(!$C.AjaxProxy){
$C.AjaxProxy={};
}
var $X=$C.AjaxProxy;
if(!$C.Bind){
$C.Bind={};
}
var $B=$C.Bind;
if(!$C.Event){
$C.Event={};
}
var $E=$C.Event;
if(!$C.Log){
$C.Log={};
}
var $L=$C.Log;
if(!$C.Util){
$C.Util={};
}
var $U=$C.Util;
if(!$C.DOM){
$C.DOM={};
}
var $D=$C.DOM;
if(!$C.Spry){
$C.Spry={};
}
var $S=$C.Spry;
if(!$C.Pod){
$C.Pod={};
}
var $P=$C.Pod;
if(!$C.objectCache){
$C.objectCache={};
}
if(!$C.required){
$C.required={};
}
if(!$C.importedTags){
$C.importedTags=[];
}
if(!$C.requestCounter){
$C.requestCounter=0;
}
if(!$C.bindHandlerCache){
$C.bindHandlerCache={};
}
window._cf_loadingtexthtml="<div style=\"text-align: center;\">"+window._cf_loadingtexthtml+"&nbsp;"+CFMessage["loading"]+"</div>";
$C.globalErrorHandler=function(_94,_95){
if($L.isAvailable){
$L.error(_94,_95);
}
if($C.userGlobalErrorHandler){
$C.userGlobalErrorHandler(_94);
}
if(!$L.isAvailable&&!$C.userGlobalErrorHandler){
alert(_94+CFMessage["globalErrorHandler.alert"]);
}
};
$C.handleError=function(_96,_97,_98,_99,_9a,_9b,_9c,_9d){
var msg=$L.format(_97,_99);
if(_96){
$L.error(msg,"http");
if(!_9a){
_9a=-1;
}
if(!_9b){
_9b=msg;
}
_96(_9a,_9b,_9d);
}else{
if(_9c){
$L.error(msg,"http");
throw msg;
}else{
$C.globalErrorHandler(msg,_98);
}
}
};
$C.setGlobalErrorHandler=function(_9f){
$C.userGlobalErrorHandler=_9f;
};
$A.createXMLHttpRequest=function(){
try{
return new XMLHttpRequest();
}
catch(e){
}
var _a0=["Microsoft.XMLHTTP","MSXML2.XMLHTTP.5.0","MSXML2.XMLHTTP.4.0","MSXML2.XMLHTTP.3.0","MSXML2.XMLHTTP"];
for(var i=0;i<_a0.length;i++){
try{
return new ActiveXObject(_a0[i]);
}
catch(e){
}
}
return false;
};
$A.isRequestError=function(req){
return ((req.status!=0&&req.status!=200)||req.getResponseHeader("server-error"));
};
$A.sendMessage=function(url,_a4,_a5,_a6,_a7,_a8,_a9){
var req=$A.createXMLHttpRequest();
if(!_a4){
_a4="GET";
}
if(_a6&&_a7){
req.onreadystatechange=function(){
$A.callback(req,_a7,_a8);
};
}
if(_a5){
_a5+="&_cf_nodebug=true&_cf_nocache=true";
}else{
_a5="_cf_nodebug=true&_cf_nocache=true";
}
if(window._cf_clientid){
_a5+="&_cf_clientid="+_cf_clientid;
}
if(_a4=="GET"){
if(_a5){
_a5+="&_cf_rc="+($C.requestCounter++);
if(url.indexOf("?")==-1){
url+="?"+_a5;
}else{
url+="&"+_a5;
}
}
$L.info("ajax.sendmessage.get","http",[url]);
req.open(_a4,url,_a6);
req.send(null);
}else{
$L.info("ajax.sendmessage.post","http",[url,_a5]);
req.open(_a4,url,_a6);
req.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
if(_a5){
req.send(_a5);
}else{
req.send(null);
}
}
if(!_a6){
while(req.readyState!=4){
}
if($A.isRequestError(req)){
$C.handleError(null,"ajax.sendmessage.error","http",[req.status,req.statusText],req.status,req.statusText,_a9);
}else{
return req;
}
}
};
$A.callback=function(req,_ac,_ad){
if(req.readyState!=4){
return;
}
req.onreadystatechange=new Function;
_ac(req,_ad);
};
$A.submitForm=function(_ae,url,_b0,_b1,_b2,_b3){
var _b4=$C.getFormQueryString(_ae);
if(_b4==-1){
$C.handleError(_b1,"ajax.submitform.formnotfound","http",[_ae],-1,null,true);
return;
}
if(!_b2){
_b2="POST";
}
_b3=!(_b3===false);
var _b5=function(req){
$A.submitForm.callback(req,_ae,_b0,_b1);
};
$L.info("ajax.submitform.submitting","http",[_ae]);
var _b7=$A.sendMessage(url,_b2,_b4,_b3,_b5);
if(!_b3){
$L.info("ajax.submitform.success","http",[_ae]);
return _b7.responseText;
}
};
$A.submitForm.callback=function(req,_b9,_ba,_bb){
if($A.isRequestError(req)){
$C.handleError(_bb,"ajax.submitform.error","http",[req.status,_b9,req.statusText],req.status,req.statusText);
}else{
$L.info("ajax.submitform.success","http",[_b9]);
if(_ba){
_ba(req.responseText);
}
}
};
$C.empty=function(){
};
$C.setSubmitClicked=function(_bc,_bd){
var el=$D.getElement(_bd,_bc);
el.cfinputbutton=true;
$C.setClickedProperty=function(){
el.clicked=true;
};
$E.addListener(el,"click",$C.setClickedProperty);
};
$C.getFormQueryString=function(_bf,_c0){
var _c1;
if(typeof _bf=="string"){
_c1=(document.getElementById(_bf)||document.forms[_bf]);
}else{
if(typeof _bf=="object"){
_c1=_bf;
}
}
if(!_c1||null==_c1.elements){
return -1;
}
var _c2,elementName,elementValue,elementDisabled;
var _c3=false;
var _c4=(_c0)?{}:"";
for(var i=0;i<_c1.elements.length;i++){
_c2=_c1.elements[i];
elementDisabled=_c2.disabled;
elementName=_c2.name;
elementValue=_c2.value;
if(!elementDisabled&&elementName){
switch(_c2.type){
case "select-one":
case "select-multiple":
for(var j=0;j<_c2.options.length;j++){
if(_c2.options[j].selected){
if(window.ActiveXObject){
_c4=$C.getFormQueryString.processFormData(_c4,_c0,elementName,_c2.options[j].attributes["value"].specified?_c2.options[j].value:_c2.options[j].text);
}else{
_c4=$C.getFormQueryString.processFormData(_c4,_c0,elementName,_c2.options[j].hasAttribute("value")?_c2.options[j].value:_c2.options[j].text);
}
}
}
break;
case "radio":
case "checkbox":
if(_c2.checked){
_c4=$C.getFormQueryString.processFormData(_c4,_c0,elementName,elementValue);
}
break;
case "file":
case undefined:
case "reset":
break;
case "button":
_c4=$C.getFormQueryString.processFormData(_c4,_c0,elementName,elementValue);
break;
case "submit":
if(_c2.cfinputbutton){
if(_c3==false&&_c2.clicked){
_c4=$C.getFormQueryString.processFormData(_c4,_c0,elementName,elementValue);
_c3=true;
}
}else{
_c4=$C.getFormQueryString.processFormData(_c4,_c0,elementName,elementValue);
}
break;
case "textarea":
var _c7;
if(window.FCKeditorAPI&&(_c7=$C.objectCache[elementName])&&_c7.richtextid){
var _c8=FCKeditorAPI.GetInstance(_c7.richtextid);
if(_c8){
elementValue=_c8.GetXHTML();
}
}
_c4=$C.getFormQueryString.processFormData(_c4,_c0,elementName,elementValue);
break;
default:
_c4=$C.getFormQueryString.processFormData(_c4,_c0,elementName,elementValue);
break;
}
}
}
if(!_c0){
_c4=_c4.substr(0,_c4.length-1);
}
return _c4;
};
$C.getFormQueryString.processFormData=function(_c9,_ca,_cb,_cc){
if(_ca){
if(_c9[_cb]){
_c9[_cb]+=","+_cc;
}else{
_c9[_cb]=_cc;
}
}else{
_c9+=encodeURIComponent(_cb)+"="+encodeURIComponent(_cc)+"&";
}
return _c9;
};
$A.importTag=function(_cd){
$C.importedTags.push(_cd);
};
$A.checkImportedTag=function(_ce){
var _cf=false;
for(var i=0;i<$C.importedTags.length;i++){
if($C.importedTags[i]==_ce){
_cf=true;
break;
}
}
if(!_cf){
$C.handleError(null,"ajax.checkimportedtag.error","widget",[_ce]);
}
};
$C.getElementValue=function(_d1,_d2,_d3){
if(!_d1){
$C.handleError(null,"getelementvalue.noelementname","bind",null,null,null,true);
return;
}
if(!_d3){
_d3="value";
}
var _d4=$B.getBindElementValue(_d1,_d2,_d3);
if(typeof (_d4)=="undefined"){
_d4=null;
}
if(_d4==null){
$C.handleError(null,"getelementvalue.elnotfound","bind",[_d1,_d3],null,null,true);
return;
}
return _d4;
};
$B.getBindElementValue=function(_d5,_d6,_d7,_d8,_d9){
var _da="";
if(window[_d5]){
var _db=eval(_d5);
if(_db&&_db._cf_getAttribute){
_da=_db._cf_getAttribute(_d7);
return _da;
}
}
var _dc=$C.objectCache[_d5];
if(_dc&&_dc._cf_getAttribute){
_da=_dc._cf_getAttribute(_d7);
return _da;
}
var el=$D.getElement(_d5,_d6);
var _de=(el&&((!el.length&&el.length!=0)||(el.length&&el.length>0)||el.tagName=="SELECT"));
if(!_de&&!_d9){
$C.handleError(null,"bind.getbindelementvalue.elnotfound","bind",[_d5]);
return null;
}
if(el.tagName!="SELECT"){
if(el.length>1){
var _df=true;
for(var i=0;i<el.length;i++){
var _e1=(el[i].getAttribute("type")=="radio"||el[i].getAttribute("type")=="checkbox");
if(!_e1||(_e1&&el[i].checked)){
if(!_df){
_da+=",";
}
_da+=$B.getBindElementValue.extract(el[i],_d7);
_df=false;
}
}
}else{
_da=$B.getBindElementValue.extract(el,_d7);
}
}else{
var _df=true;
for(var i=0;i<el.options.length;i++){
if(el.options[i].selected){
if(!_df){
_da+=",";
}
_da+=$B.getBindElementValue.extract(el.options[i],_d7);
_df=false;
}
}
}
if(typeof (_da)=="object"){
$C.handleError(null,"bind.getbindelementvalue.simplevalrequired","bind",[_d5,_d7]);
return null;
}
if(_d8&&$C.required[_d5]&&_da.length==0){
return null;
}
return _da;
};
$B.getBindElementValue.extract=function(el,_e3){
var _e4=el[_e3];
if((_e4==null||typeof (_e4)=="undefined")&&el.getAttribute){
_e4=el.getAttribute(_e3);
}
return _e4;
};
$L.init=function(){
if(window.YAHOO&&YAHOO.widget&&YAHOO.widget.Logger){
YAHOO.widget.Logger.categories=[CFMessage["debug"],CFMessage["info"],CFMessage["error"],CFMessage["window"]];
YAHOO.widget.LogReader.prototype.formatMsg=function(_e5){
var _e6=_e5.category;
return "<p>"+"<span class='"+_e6+"'>"+_e6+"</span>:<i>"+_e5.source+"</i>: "+_e5.msg+"</p>";
};
var _e7=new YAHOO.widget.LogReader(null,{width:"30em",fontSize:"100%"});
_e7.setTitle(CFMessage["log.title"]||"ColdFusion AJAX Logger");
_e7._btnCollapse.value=CFMessage["log.collapse"]||"Collapse";
_e7._btnPause.value=CFMessage["log.pause"]||"Pause";
_e7._btnClear.value=CFMessage["log.clear"]||"Clear";
$L.isAvailable=true;
}
};
$L.log=function(_e8,_e9,_ea,_eb){
if(!$L.isAvailable){
return;
}
if(!_ea){
_ea="global";
}
_ea=CFMessage[_ea]||_ea;
_e9=CFMessage[_e9]||_e9;
_e8=$L.format(_e8,_eb);
YAHOO.log(_e8,_e9,_ea);
};
$L.format=function(_ec,_ed){
var msg=CFMessage[_ec]||_ec;
if(_ed){
for(i=0;i<_ed.length;i++){
if(!_ed[i].length){
_ed[i]="";
}
var _ef="{"+i+"}";
msg=msg.replace(_ef,_ed[i]);
}
}
return msg;
};
$L.debug=function(_f0,_f1,_f2){
$L.log(_f0,"debug",_f1,_f2);
};
$L.info=function(_f3,_f4,_f5){
$L.log(_f3,"info",_f4,_f5);
};
$L.error=function(_f6,_f7,_f8){
$L.log(_f6,"error",_f7,_f8);
};
$L.dump=function(_f9,_fa){
if($L.isAvailable){
var _fb=(/string|number|undefined|boolean/.test(typeof (_f9))||_f9==null)?_f9:recurse(_f9,typeof _f9,true);
$L.debug(_fb,_fa);
}
};
$X.invoke=function(_fc,_fd,_fe,_ff,_100){
var _101="method="+_fd+"&_cf_ajaxproxytoken="+_fe;
var _102=_fc.returnFormat||"json";
_101+="&returnFormat="+_102;
if(_fc.queryFormat){
_101+="&queryFormat="+_fc.queryFormat;
}
if(_fc.formId){
var _103=$C.getFormQueryString(_fc.formId,true);
if(_ff!=null){
for(prop in _103){
_ff[prop]=_103[prop];
}
}else{
_ff=_103;
}
_fc.formId=null;
}
var _104="";
if(_ff!=null){
_104=$X.JSON.encode(_ff);
_101+="&argumentCollection="+encodeURIComponent(_104);
}
$L.info("ajaxproxy.invoke.invoking","http",[_fc.cfcPath,_fd,_104]);
if(_fc.callHandler){
_fc.callHandler.call(null,_fc.callHandlerParams,_fc.cfcPath,_101);
return;
}
var _105;
if(_fc.async){
_105=function(req){
$X.callback(req,_fc,_100);
};
}
var req=$A.sendMessage(_fc.cfcPath,_fc.httpMethod,_101,_fc.async,_105,null,true);
if(!_fc.async){
return $X.processResponse(req,_fc);
}
};
$X.callback=function(req,_109,_10a){
if($A.isRequestError(req)){
$C.handleError(_109.errorHandler,"ajaxproxy.invoke.error","http",[req.status,_109.cfcPath,req.statusText],req.status,req.statusText,false,_10a);
}else{
if(_109.callbackHandler){
var _10b=$X.processResponse(req,_109);
_109.callbackHandler(_10b,_10a);
}
}
};
$X.processResponse=function(req,_10d){
var _10e=true;
for(var i=0;i<req.responseText.length;i++){
var c=req.responseText.charAt(i);
_10e=(c==" "||c=="\n"||c=="\t"||c=="\r");
if(!_10e){
break;
}
}
var _111=(req.responseXML&&req.responseXML.childNodes.length>0);
var _112=_111?"[XML Document]":req.responseText;
$L.info("ajaxproxy.invoke.response","http",[_112]);
var _113;
var _114=_10d.returnFormat||"json";
if(_114=="json"){
_113=_10e?null:$X.JSON.decode(req.responseText);
}else{
_113=_111?req.responseXML:(_10e?null:req.responseText);
}
return _113;
};
$X.init=function(_115,_116){
var _117=_116.split(".");
var ns=self;
for(i=0;i<_117.length-1;i++){
if(_117[i].length){
ns[_117[i]]=ns[_117[i]]||{};
ns=ns[_117[i]];
}
}
var _119=_117[_117.length-1];
if(ns[_119]){
return ns[_119];
}
ns[_119]=function(){
this.httpMethod="GET";
this.async=false;
this.callbackHandler=null;
this.errorHandler=null;
this.formId=null;
};
ns[_119].prototype.cfcPath=_115;
ns[_119].prototype.setHTTPMethod=function(_11a){
if(_11a){
_11a=_11a.toUpperCase();
}
if(_11a!="GET"&&_11a!="POST"){
$C.handleError(null,"ajaxproxy.sethttpmethod.invalidmethod","http",[_11a],null,null,true);
}
this.httpMethod=_11a;
};
ns[_119].prototype.setSyncMode=function(){
this.async=false;
};
ns[_119].prototype.setAsyncMode=function(){
this.async=true;
};
ns[_119].prototype.setCallbackHandler=function(fn){
this.callbackHandler=fn;
this.setAsyncMode();
};
ns[_119].prototype.setErrorHandler=function(fn){
this.errorHandler=fn;
this.setAsyncMode();
};
ns[_119].prototype.setForm=function(fn){
this.formId=fn;
};
ns[_119].prototype.setQueryFormat=function(_11e){
if(_11e){
_11e=_11e.toLowerCase();
}
if(!_11e||(_11e!="column"&&_11e!="row")){
$C.handleError(null,"ajaxproxy.setqueryformat.invalidformat","http",[_11e],null,null,true);
}
this.queryFormat=_11e;
};
ns[_119].prototype.setReturnFormat=function(_11f){
if(_11f){
_11f=_11f.toLowerCase();
}
if(!_11f||(_11f!="plain"&&_11f!="json"&&_11f!="wddx")){
$C.handleError(null,"ajaxproxy.setreturnformat.invalidformat","http",[_11f],null,null,true);
}
this.returnFormat=_11f;
};
$L.info("ajaxproxy.init.created","http",[_115]);
return ns[_119];
};
$U.isWhitespace=function(s){
var _121=true;
for(var i=0;i<s.length;i++){
var c=s.charAt(i);
_121=(c==" "||c=="\n"||c=="\t"||c=="\r");
if(!_121){
break;
}
}
return _121;
};
$U.getFirstNonWhitespaceIndex=function(s){
var _125=true;
for(var i=0;i<s.length;i++){
var c=s.charAt(i);
_125=(c==" "||c=="\n"||c=="\t"||c=="\r");
if(!_125){
break;
}
}
return i;
};
$C.trim=function(_128){
return _128.replace(/^\s+|\s+$/g,"");
};
$U.isInteger=function(n){
var _12a=true;
if(typeof (n)=="number"){
_12a=(n>=0);
}else{
for(i=0;i<n.length;i++){
if($U.isInteger.numberChars.indexOf(n.charAt(i))==-1){
_12a=false;
break;
}
}
}
return _12a;
};
$U.isInteger.numberChars="0123456789";
$U.isArray=function(a){
return (typeof (a.length)=="number"&&!a.toUpperCase);
};
$U.isBoolean=function(b){
if(b===true||b===false){
return true;
}else{
if(b.toLowerCase){
b=b.toLowerCase();
return (b==$U.isBoolean.trueChars||b==$U.isBoolean.falseChars);
}else{
return false;
}
}
};
$U.isBoolean.trueChars="true";
$U.isBoolean.falseChars="false";
$U.castBoolean=function(b){
if(b===true){
return true;
}else{
if(b===false){
return false;
}else{
if(b.toLowerCase){
b=b.toLowerCase();
if(b==$U.isBoolean.trueChars){
return true;
}else{
if(b==$U.isBoolean.falseChars){
return false;
}else{
return false;
}
}
}else{
return false;
}
}
}
};
$U.checkQuery=function(o){
var _12f=null;
if(o&&o.COLUMNS&&$U.isArray(o.COLUMNS)&&o.DATA&&$U.isArray(o.DATA)&&(o.DATA.length==0||(o.DATA.length>0&&$U.isArray(o.DATA[0])))){
_12f="row";
}else{
if(o&&o.COLUMNS&&$U.isArray(o.COLUMNS)&&o.ROWCOUNT&&$U.isInteger(o.ROWCOUNT)&&o.DATA){
_12f="col";
for(var i=0;i<o.COLUMNS.length;i++){
var _131=o.DATA[o.COLUMNS[i]];
if(!_131||!$U.isArray(_131)){
_12f=null;
break;
}
}
}
}
return _12f;
};
$X.JSON=new function(){
var _132={}.hasOwnProperty?true:false;
var _133=/^("(\\.|[^"\\\n\r])*?"|[,:{}\[\]0-9.\-+Eaeflnr-u \n\r\t])+?$/;
var pad=function(n){
return n<10?"0"+n:n;
};
var m={"\b":"\\b","\t":"\\t","\n":"\\n","\f":"\\f","\r":"\\r","\"":"\\\"","\\":"\\\\"};
var _137=function(s){
if(/["\\\x00-\x1f]/.test(s)){
return "\""+s.replace(/([\x00-\x1f\\"])/g,function(a,b){
var c=m[b];
if(c){
return c;
}
c=b.charCodeAt();
return "\\u00"+Math.floor(c/16).toString(16)+(c%16).toString(16);
})+"\"";
}
return "\""+s+"\"";
};
var _13c=function(o){
var a=["["],b,i,l=o.length,v;
for(i=0;i<l;i+=1){
v=o[i];
switch(typeof v){
case "undefined":
case "function":
case "unknown":
break;
default:
if(b){
a.push(",");
}
a.push(v===null?"null":$X.JSON.encode(v));
b=true;
}
}
a.push("]");
return a.join("");
};
var _13f=function(o){
return "\""+o.getFullYear()+"-"+pad(o.getMonth()+1)+"-"+pad(o.getDate())+"T"+pad(o.getHours())+":"+pad(o.getMinutes())+":"+pad(o.getSeconds())+"\"";
};
this.encode=function(o){
if(typeof o=="undefined"||o===null){
return "null";
}else{
if(o instanceof Array){
return _13c(o);
}else{
if(o instanceof Date){
return _13f(o);
}else{
if(typeof o=="string"){
return _137(o);
}else{
if(typeof o=="number"){
return isFinite(o)?String(o):"null";
}else{
if(typeof o=="boolean"){
return String(o);
}else{
var a=["{"],b,i,v;
for(var i in o){
if(!_132||o.hasOwnProperty(i)){
v=o[i];
switch(typeof v){
case "undefined":
case "function":
case "unknown":
break;
default:
if(b){
a.push(",");
}
a.push(this.encode(i),":",v===null?"null":this.encode(v));
b=true;
}
}
}
a.push("}");
return a.join("");
}
}
}
}
}
}
};
this.decode=function(json){
if(typeof json=="object"){
return json;
}
if($U.isWhitespace(json)){
return null;
}
var _145=$U.getFirstNonWhitespaceIndex(json);
if(_145>0){
json=json.slice(_145);
}
if(window._cf_jsonprefix&&json.indexOf(_cf_jsonprefix)==0){
json=json.slice(_cf_jsonprefix.length);
}
try{
if(_133.test(json)){
return eval("("+json+")");
}
}
catch(e){
}
throw new SyntaxError("parseJSON");
};
}();
if(!$C.JSON){
$C.JSON={};
}
$C.JSON.encode=$X.JSON.encode;
$C.JSON.decode=$X.JSON.decode;
$C.navigate=function(url,_147,_148,_149,_14a,_14b){
if(url==null){
$C.handleError(_149,"navigate.urlrequired","widget");
return;
}
if(_14a){
_14a=_14a.toUpperCase();
if(_14a!="GET"&&_14a!="POST"){
$C.handleError(null,"navigate.invalidhttpmethod","http",[_14a],null,null,true);
}
}else{
_14a="GET";
}
var _14c;
if(_14b){
_14c=$C.getFormQueryString(_14b);
if(_14c==-1){
$C.handleError(null,"navigate.formnotfound","http",[_14b],null,null,true);
}
}
if(_147==null){
if(_14c){
if(url.indexOf("?")==-1){
url+="?"+_14c;
}else{
url+="&"+_14c;
}
}
$L.info("navigate.towindow","widget",[url]);
window.location.replace(url);
return;
}
$L.info("navigate.tocontainer","widget",[url,_147]);
var obj=$C.objectCache[_147];
if(obj!=null){
if(typeof (obj._cf_body)!="undefined"&&obj._cf_body!=null){
_147=obj._cf_body;
}
}
$A.replaceHTML(_147,url,_14a,_14c,_148,_149);
};
$A.checkForm=function(_14e,_14f,_150,_151,_152){
var _153=_14f.call(null,_14e);
if(_153==false){
return false;
}
var _154=$C.getFormQueryString(_14e);
$L.info("ajax.submitform.submitting","http",[_14e.name]);
$A.replaceHTML(_150,_14e.action,_14e.method,_154,_151,_152);
return false;
};
$A.replaceHTML=function(_155,url,_157,_158,_159,_15a){
var _15b=document.getElementById(_155);
if(!_15b){
$C.handleError(_15a,"ajax.replacehtml.elnotfound","http",[_155]);
return;
}
var _15c="_cf_containerId="+encodeURIComponent(_155);
_158=(_158)?_158+"&"+_15c:_15c;
$L.info("ajax.replacehtml.replacing","http",[_155,url,_158]);
if(_cf_loadingtexthtml){
try{
_15b.innerHTML=_cf_loadingtexthtml;
}
catch(e){
}
}
var _15d=function(req,_15f){
var _160=false;
if($A.isRequestError(req)){
$C.handleError(_15a,"ajax.replacehtml.error","http",[req.status,_15f.id,req.statusText],req.status,req.statusText);
_160=true;
}
var _161=new $E.CustomEvent("onReplaceHTML",_15f);
var _162=new $E.CustomEvent("onReplaceHTMLUser",_15f);
$E.loadEvents[_15f.id]={system:_161,user:_162};
if(req.responseText.search(/<script/i)!=-1){
try{
_15f.innerHTML="";
}
catch(e){
}
$A.replaceHTML.processResponseText(req.responseText,_15f,_15a);
}else{
try{
_15f.innerHTML=req.responseText;
}
catch(e){
}
}
$E.loadEvents[_15f.id]=null;
_161.fire();
_161.unsubscribe();
_162.fire();
_162.unsubscribe();
$L.info("ajax.replacehtml.success","http",[_15f.id]);
if(_159&&!_160){
_159();
}
};
try{
$A.sendMessage(url,_157,_158,true,_15d,_15b);
}
catch(e){
try{
_15b.innerHTML=$L.format(CFMessage["ajax.replacehtml.connectionerrordisplay"],[url,e]);
}
catch(e){
}
$C.handleError(_15a,"ajax.replacehtml.connectionerror","http",[_155,url,e]);
}
};
$A.replaceHTML.processResponseText=function(text,_164,_165){
var pos=0;
var _167=0;
var _168=0;
_164._cf_innerHTML="";
while(pos<text.length){
var _169=text.indexOf("<s",pos);
if(_169==-1){
_169=text.indexOf("<S",pos);
}
if(_169==-1){
break;
}
pos=_169;
var _16a=true;
var _16b=$A.replaceHTML.processResponseText.scriptTagChars;
for(var i=1;i<_16b.length;i++){
var _16d=pos+i+1;
if(_16d>text.length){
break;
}
var _16e=text.charAt(_16d);
if(_16b[i][0]!=_16e&&_16b[i][1]!=_16e){
pos+=i+1;
_16a=false;
break;
}
}
if(!_16a){
continue;
}
var _16f=text.substring(_167,pos);
if(_16f){
_164._cf_innerHTML+=_16f;
}
var _170=text.indexOf(">",pos)+1;
if(_170==0){
pos++;
continue;
}else{
pos+=7;
}
var _171=_170;
while(_171<text.length&&_171!=-1){
_171=text.indexOf("</s",_171);
if(_171==-1){
_171=text.indexOf("</S",_171);
}
if(_171!=-1){
_16a=true;
for(var i=1;i<_16b.length;i++){
var _16d=_171+2+i;
if(_16d>text.length){
break;
}
var _16e=text.charAt(_16d);
if(_16b[i][0]!=_16e&&_16b[i][1]!=_16e){
_171=_16d;
_16a=false;
break;
}
}
if(_16a){
break;
}
}
}
if(_171!=-1){
var _172=text.substring(_170,_171);
var _173=_172.indexOf("<!--");
if(_173!=-1){
_172=_172.substring(_173+4);
}
var _174=_172.lastIndexOf("//-->");
if(_174!=-1){
_172=_172.substring(0,_174-1);
}
if(_172.indexOf("document.write")!=-1||_172.indexOf("CF_RunContent")!=-1){
if(_172.indexOf("CF_RunContent")!=-1){
_172=_172.replace("CF_RunContent","document.write");
}
_172="var _cfDomNode = document.getElementById('"+_164.id+"'); var _cfBuffer='';"+"if (!document._cf_write)"+"{document._cf_write = document.write;"+"document.write = function(str){if (_cfBuffer!=null){_cfBuffer+=str;}else{document._cf_write(str);}};};"+_172+";_cfDomNode._cf_innerHTML += _cfBuffer; _cfBuffer=null;";
}
try{
eval(_172);
}
catch(ex){
$C.handleError(_165,"ajax.replacehtml.jserror","http",[_164.id,ex]);
}
}
_169=text.indexOf(">",_171)+1;
if(_169==0){
_168=_171+1;
break;
}
_168=_169;
pos=_169;
_167=_169;
}
if(_168<text.length-1){
var _16f=text.substring(_168,text.length);
if(_16f){
_164._cf_innerHTML+=_16f;
}
}
try{
_164.innerHTML=_164._cf_innerHTML;
}
catch(e){
}
_164._cf_innerHTML="";
};
$A.replaceHTML.processResponseText.scriptTagChars=[["s","S"],["c","C"],["r","R"],["i","I"],["p","P"],["t","T"]];
$D.getElement=function(_175,_176){
var _177=function(_178){
return (_178.name==_175||_178.id==_175);
};
var _179=$D.getElementsBy(_177,null,_176);
if(_179.length==1){
return _179[0];
}else{
return _179;
}
};
$D.getElementsBy=function(_17a,tag,root){
tag=tag||"*";
var _17d=[];
if(root){
root=$D.get(root);
if(!root){
return _17d;
}
}else{
root=document;
}
var _17e=root.getElementsByTagName(tag);
if(!_17e.length&&(tag=="*"&&root.all)){
_17e=root.all;
}
for(var i=0,len=_17e.length;i<len;++i){
if(_17a(_17e[i])){
_17d[_17d.length]=_17e[i];
}
}
return _17d;
};
$D.get=function(el){
if(!el){
return null;
}
if(typeof el!="string"&&!(el instanceof Array)){
return el;
}
if(typeof el=="string"){
return document.getElementById(el);
}else{
var _181=[];
for(var i=0,len=el.length;i<len;++i){
_181[_181.length]=$D.get(el[i]);
}
return _181;
}
return null;
};
$E.loadEvents={};
$E.CustomEvent=function(_183,_184){
return {name:_183,domNode:_184,subs:[],subscribe:function(func,_186){
var dup=false;
for(var i=0;i<this.subs.length;i++){
var sub=this.subs[i];
if(sub.f==func&&sub.p==_186){
dup=true;
break;
}
}
if(!dup){
this.subs.push({f:func,p:_186});
}
},fire:function(){
for(var i=0;i<this.subs.length;i++){
var sub=this.subs[i];
sub.f.call(null,this,sub.p);
}
},unsubscribe:function(){
this.subscribers=[];
}};
};
$E.windowLoadImpEvent=new $E.CustomEvent("cfWindowLoadImp");
$E.windowLoadEvent=new $E.CustomEvent("cfWindowLoad");
$E.windowLoadUserEvent=new $E.CustomEvent("cfWindowLoadUser");
$E.listeners=[];
$E.addListener=function(el,ev,fn,_18f){
var l={el:el,ev:ev,fn:fn,params:_18f};
$E.listeners.push(l);
var _191=function(e){
if(!e){
var e=window.event;
}
fn.call(null,e,_18f);
};
if(el.addEventListener){
el.addEventListener(ev,_191,false);
return true;
}else{
if(el.attachEvent){
el.attachEvent("on"+ev,_191);
return true;
}else{
return false;
}
}
};
$E.isListener=function(el,ev,fn,_196){
var _197=false;
var ls=$E.listeners;
for(var i=0;i<ls.length;i++){
if(ls[i].el==el&&ls[i].ev==ev&&ls[i].fn==fn&&ls[i].params==_196){
_197=true;
break;
}
}
return _197;
};
$E.callBindHandlers=function(id,_19b,ev){
var el=document.getElementById(id);
if(!el){
return;
}
var ls=$E.listeners;
for(var i=0;i<ls.length;i++){
if(ls[i].el==el&&ls[i].ev==ev&&ls[i].fn._cf_bindhandler){
ls[i].fn.call(null,null,ls[i].params);
}
}
};
$E.registerOnLoad=function(func,_1a1,_1a2,user){
if($E.registerOnLoad.windowLoaded){
if(_1a1&&_1a1._cf_containerId&&$E.loadEvents[_1a1._cf_containerId]){
if(user){
$E.loadEvents[_1a1._cf_containerId].user.subscribe(func,_1a1);
}else{
$E.loadEvents[_1a1._cf_containerId].system.subscribe(func,_1a1);
}
}else{
func.call(null,null,_1a1);
}
}else{
if(user){
$E.windowLoadUserEvent.subscribe(func,_1a1);
}else{
if(_1a2){
$E.windowLoadImpEvent.subscribe(func,_1a1);
}else{
$E.windowLoadEvent.subscribe(func,_1a1);
}
}
}
};
$E.registerOnLoad.windowLoaded=false;
$E.onWindowLoad=function(fn){
if(window.addEventListener){
window.addEventListener("load",fn,false);
}else{
if(window.attachEvent){
window.attachEvent("onload",fn);
}else{
if(document.getElementById){
window.onload=fn;
}
}
}
};
$C.addSpanToDom=function(){
var _1a5=document.createElement("span");
document.body.insertBefore(_1a5,document.body.firstChild);
};
$E.windowLoadHandler=function(e){
if(window.Ext){
Ext.BLANK_IMAGE_URL=_cf_contextpath+"/CFIDE/scripts/ajax/resources/ext/images/default/s.gif";
}
$C.addSpanToDom();
$L.init();
$E.registerOnLoad.windowLoaded=true;
$E.windowLoadImpEvent.fire();
$E.windowLoadImpEvent.unsubscribe();
$E.windowLoadEvent.fire();
$E.windowLoadEvent.unsubscribe();
$E.windowLoadUserEvent.fire();
$E.windowLoadUserEvent.unsubscribe();
};
$E.onWindowLoad($E.windowLoadHandler);
$B.register=function(_1a7,_1a8,_1a9,_1aa){
for(var i=0;i<_1a7.length;i++){
var _1ac=_1a7[i][0];
var _1ad=_1a7[i][1];
var _1ae=_1a7[i][2];
if(window[_1ac]){
var _1af=eval(_1ac);
if(_1af&&_1af._cf_register){
_1af._cf_register(_1ae,_1a9,_1a8);
continue;
}
}
var _1b0=$C.objectCache[_1ac];
if(_1b0&&_1b0._cf_register){
_1b0._cf_register(_1ae,_1a9,_1a8);
continue;
}
var _1b1=$D.getElement(_1ac,_1ad);
var _1b2=(_1b1&&((!_1b1.length&&_1b1.length!=0)||(_1b1.length&&_1b1.length>0)||_1b1.tagName=="SELECT"));
if(!_1b2){
$C.handleError(null,"bind.register.elnotfound","bind",[_1ac]);
}
if(_1b1.length>1&&!_1b1.options){
for(var j=0;j<_1b1.length;j++){
$B.register.addListener(_1b1[j],_1ae,_1a9,_1a8);
}
}else{
$B.register.addListener(_1b1,_1ae,_1a9,_1a8);
}
}
if(!$C.bindHandlerCache[_1a8.bindTo]&&typeof (_1a8.bindTo)=="string"){
$C.bindHandlerCache[_1a8.bindTo]=function(){
_1a9.call(null,null,_1a8);
};
}
if(_1aa){
_1a9.call(null,null,_1a8);
}
};
$B.register.addListener=function(_1b4,_1b5,_1b6,_1b7){
if(!$E.isListener(_1b4,_1b5,_1b6,_1b7)){
$E.addListener(_1b4,_1b5,_1b6,_1b7);
}
};
$B.assignValue=function(_1b8,_1b9,_1ba,_1bb){
if(!_1b8){
return;
}
if(_1b8.call){
_1b8.call(null,_1ba,_1bb);
return;
}
var _1bc=$C.objectCache[_1b8];
if(_1bc&&_1bc._cf_setValue){
_1bc._cf_setValue(_1ba);
return;
}
var _1bd=document.getElementById(_1b8);
if(!_1bd){
$C.handleError(null,"bind.assignvalue.elnotfound","bind",[_1b8]);
}
if(_1bd.tagName=="SELECT"){
var _1be=$U.checkQuery(_1ba);
var _1bf=$C.objectCache[_1b8];
if(_1be){
if(!_1bf||(_1bf&&(!_1bf.valueCol||!_1bf.displayCol))){
$C.handleError(null,"bind.assignvalue.selboxmissingvaldisplay","bind",[_1b8]);
return;
}
}else{
if(typeof (_1ba.length)=="number"&&!_1ba.toUpperCase){
if(_1ba.length>0&&(typeof (_1ba[0].length)!="number"||_1ba[0].toUpperCase)){
$C.handleError(null,"bind.assignvalue.selboxerror","bind",[_1b8]);
return;
}
}else{
$C.handleError(null,"bind.assignvalue.selboxerror","bind",[_1b8]);
return;
}
}
_1bd.options.length=0;
var _1c0;
var _1c1=false;
if(_1bf){
_1c0=_1bf.selected;
if(_1c0&&_1c0.length>0){
_1c1=true;
}
}
if(!_1be){
for(var i=0;i<_1ba.length;i++){
var opt=new Option(_1ba[i][1],_1ba[i][0]);
_1bd.options[i]=opt;
if(_1c1){
for(var j=0;j<_1c0.length;j++){
if(_1c0[j]==opt.value){
opt.selected=true;
}
}
}
}
}else{
if(_1be=="col"){
var _1c5=_1ba.DATA[_1bf.valueCol];
var _1c6=_1ba.DATA[_1bf.displayCol];
if(!_1c5||!_1c6){
$C.handleError(null,"bind.assignvalue.selboxinvalidvaldisplay","bind",[_1b8]);
return;
}
for(var i=0;i<_1c5.length;i++){
var opt=new Option(_1c6[i],_1c5[i]);
_1bd.options[i]=opt;
if(_1c1){
for(var j=0;j<_1c0.length;j++){
if(_1c0[j]==opt.value){
opt.selected=true;
}
}
}
}
}else{
if(_1be=="row"){
var _1c7=-1;
var _1c8=-1;
for(var i=0;i<_1ba.COLUMNS.length;i++){
var col=_1ba.COLUMNS[i];
if(col==_1bf.valueCol){
_1c7=i;
}
if(col==_1bf.displayCol){
_1c8=i;
}
if(_1c7!=-1&&_1c8!=-1){
break;
}
}
if(_1c7==-1||_1c8==-1){
$C.handleError(null,"bind.assignvalue.selboxinvalidvaldisplay","bind",[_1b8]);
return;
}
for(var i=0;i<_1ba.DATA.length;i++){
var opt=new Option(_1ba.DATA[i][_1c8],_1ba.DATA[i][_1c7]);
_1bd.options[i]=opt;
if(_1c1){
for(var j=0;j<_1c0.length;j++){
if(_1c0[j]==opt.value){
opt.selected=true;
}
}
}
}
}
}
}
}else{
_1bd[_1b9]=_1ba;
}
$E.callBindHandlers(_1b8,null,"change");
$L.info("bind.assignvalue.success","bind",[_1ba,_1b8,_1b9]);
};
$B.localBindHandler=function(e,_1cb){
var _1cc=document.getElementById(_1cb.bindTo);
var _1cd=$B.evaluateBindTemplate(_1cb,true);
$B.assignValue(_1cb.bindTo,_1cb.bindToAttr,_1cd);
};
$B.localBindHandler._cf_bindhandler=true;
$B.evaluateBindTemplate=function(_1ce,_1cf,_1d0,_1d1,_1d2){
var _1d3=_1ce.bindExpr;
var _1d4="";
if(typeof _1d2=="undefined"){
_1d2=false;
}
for(var i=0;i<_1d3.length;i++){
if(typeof (_1d3[i])=="object"){
var _1d6=null;
if(!_1d3[i].length||typeof _1d3[i][0]=="object"){
_1d6=$X.JSON.encode(_1d3[i]);
}else{
var _1d6=$B.getBindElementValue(_1d3[i][0],_1d3[i][1],_1d3[i][2],_1cf,_1d1);
if(_1d6==null){
if(_1cf){
_1d4="";
break;
}else{
_1d6="";
}
}
}
if(_1d0){
_1d6=encodeURIComponent(_1d6);
}
_1d4+=_1d6;
}else{
var _1d7=_1d3[i];
if(_1d2==true&&i>0){
if(typeof (_1d7)=="string"&&_1d7.indexOf("&")!=0){
_1d7=encodeURIComponent(_1d7);
}
}
_1d4+=_1d7;
}
}
return _1d4;
};
$B.jsBindHandler=function(e,_1d9){
var _1da=_1d9.bindExpr;
var _1db=new Array();
var _1dc=_1d9.callFunction+"(";
for(var i=0;i<_1da.length;i++){
var _1de;
if(typeof (_1da[i])=="object"){
if(_1da[i].length){
if(typeof _1da[i][0]=="object"){
_1de=_1da[i];
}else{
_1de=$B.getBindElementValue(_1da[i][0],_1da[i][1],_1da[i][2],false);
}
}else{
_1de=_1da[i];
}
}else{
_1de=_1da[i];
}
if(i!=0){
_1dc+=",";
}
_1db[i]=_1de;
_1dc+="'"+_1de+"'";
}
_1dc+=")";
var _1df=_1d9.callFunction.apply(null,_1db);
$B.assignValue(_1d9.bindTo,_1d9.bindToAttr,_1df,_1d9.bindToParams);
};
$B.jsBindHandler._cf_bindhandler=true;
$B.urlBindHandler=function(e,_1e1){
var _1e2=_1e1.bindTo;
if($C.objectCache[_1e2]&&$C.objectCache[_1e2]._cf_visible===false){
$C.objectCache[_1e2]._cf_dirtyview=true;
return;
}
var url=$B.evaluateBindTemplate(_1e1,false,true,false,true);
var _1e4=$U.extractReturnFormat(url);
if(_1e4==null||typeof _1e4=="undefined"){
_1e4="JSON";
}
if(_1e1.bindToAttr||typeof _1e1.bindTo=="undefined"||typeof _1e1.bindTo=="function"){
var _1e1={"bindTo":_1e1.bindTo,"bindToAttr":_1e1.bindToAttr,"bindToParams":_1e1.bindToParams,"errorHandler":_1e1.errorHandler,"url":url,returnFormat:_1e4};
try{
$A.sendMessage(url,"GET",null,true,$B.urlBindHandler.callback,_1e1);
}
catch(e){
$C.handleError(_1e1.errorHandler,"ajax.urlbindhandler.connectionerror","http",[url,e]);
}
}else{
$A.replaceHTML(_1e2,url,null,null,null,_1e1.errorHandler);
}
};
$B.urlBindHandler._cf_bindhandler=true;
$B.urlBindHandler.callback=function(req,_1e6){
if($A.isRequestError(req)){
$C.handleError(_1e6.errorHandler,"bind.urlbindhandler.httperror","http",[req.status,_1e6.url,req.statusText],req.status,req.statusText);
}else{
$L.info("bind.urlbindhandler.response","http",[req.responseText]);
var _1e7;
try{
if(_1e6.returnFormat==null||_1e6.returnFormat==="JSON"){
_1e7=$X.JSON.decode(req.responseText);
}else{
_1e7=req.responseText;
}
}
catch(e){
if(req.responseText!=null&&typeof req.responseText=="string"){
_1e7=req.responseText;
}else{
$C.handleError(_1e6.errorHandler,"bind.urlbindhandler.jsonerror","http",[req.responseText]);
}
}
$B.assignValue(_1e6.bindTo,_1e6.bindToAttr,_1e7,_1e6.bindToParams);
}
};
$A.initSelect=function(_1e8,_1e9,_1ea,_1eb){
$C.objectCache[_1e8]={"valueCol":_1e9,"displayCol":_1ea,selected:_1eb};
};
$S.setupSpry=function(){
if(typeof (Spry)!="undefined"&&Spry.Data){
Spry.Data.DataSet.prototype._cf_getAttribute=function(_1ec){
var val;
var row=this.getCurrentRow();
if(row){
val=row[_1ec];
}
return val;
};
Spry.Data.DataSet.prototype._cf_register=function(_1ef,_1f0,_1f1){
var obs={bindParams:_1f1};
obs.onCurrentRowChanged=function(){
_1f0.call(null,null,this.bindParams);
};
obs.onDataChanged=function(){
_1f0.call(null,null,this.bindParams);
};
this.addObserver(obs);
};
if(Spry.Debug.trace){
var _1f3=Spry.Debug.trace;
Spry.Debug.trace=function(str){
$L.info(str,"spry");
_1f3(str);
};
}
if(Spry.Debug.reportError){
var _1f5=Spry.Debug.reportError;
Spry.Debug.reportError=function(str){
$L.error(str,"spry");
_1f5(str);
};
}
$L.info("spry.setupcomplete","bind");
}
};
$E.registerOnLoad($S.setupSpry,null,true);
$S.bindHandler=function(_1f7,_1f8){
var url;
var _1fa="_cf_nodebug=true&_cf_nocache=true";
if(window._cf_clientid){
_1fa+="&_cf_clientid="+_cf_clientid;
}
var _1fb=window[_1f8.bindTo];
var _1fc=(typeof (_1fb)=="undefined");
if(_1f8.cfc){
var _1fd={};
var _1fe=_1f8.bindExpr;
for(var i=0;i<_1fe.length;i++){
var _200;
if(_1fe[i].length==2){
_200=_1fe[i][1];
}else{
_200=$B.getBindElementValue(_1fe[i][1],_1fe[i][2],_1fe[i][3],false,_1fc);
}
_1fd[_1fe[i][0]]=_200;
}
_1fd=$X.JSON.encode(_1fd);
_1fa+="&method="+_1f8.cfcFunction;
_1fa+="&argumentCollection="+encodeURIComponent(_1fd);
$L.info("spry.bindhandler.loadingcfc","http",[_1f8.bindTo,_1f8.cfc,_1f8.cfcFunction,_1fd]);
url=_1f8.cfc;
}else{
url=$B.evaluateBindTemplate(_1f8,false,true,_1fc);
$L.info("spry.bindhandler.loadingurl","http",[_1f8.bindTo,url]);
}
var _201=_1f8.options||{};
if((_1fb&&_1fb._cf_type=="json")||_1f8.dsType=="json"){
_1fa+="&returnformat=json";
}
if(_1fb){
if(_1fb.requestInfo.method=="GET"){
_201.method="GET";
if(url.indexOf("?")==-1){
url+="?"+_1fa;
}else{
url+="&"+_1fa;
}
}else{
_201.postData=_1fa;
_201.method="POST";
_1fb.setURL("");
}
_1fb.setURL(url,_201);
_1fb.loadData();
}else{
if(!_201.method||_201.method=="GET"){
if(url.indexOf("?")==-1){
url+="?"+_1fa;
}else{
url+="&"+_1fa;
}
}else{
_201.postData=_1fa;
_201.useCache=false;
}
var ds;
if(_1f8.dsType=="xml"){
ds=new Spry.Data.XMLDataSet(url,_1f8.xpath,_201);
}else{
ds=new Spry.Data.JSONDataSet(url,_201);
ds.preparseFunc=$S.preparseData;
}
ds._cf_type=_1f8.dsType;
var _203={onLoadError:function(req){
$C.handleError(_1f8.errorHandler,"spry.bindhandler.error","http",[_1f8.bindTo,req.url,req.requestInfo.postData]);
}};
ds.addObserver(_203);
window[_1f8.bindTo]=ds;
}
};
$S.bindHandler._cf_bindhandler=true;
$S.preparseData=function(ds,_206){
var _207=$U.getFirstNonWhitespaceIndex(_206);
if(_207>0){
_206=_206.slice(_207);
}
if(window._cf_jsonprefix&&_206.indexOf(_cf_jsonprefix)==0){
_206=_206.slice(_cf_jsonprefix.length);
}
return _206;
};
$P.init=function(_208){
$L.info("pod.init.creating","widget",[_208]);
var _209={};
_209._cf_body=_208+"_body";
$C.objectCache[_208]=_209;
};
$B.cfcBindHandler=function(e,_20b){
var _20c=(_20b.httpMethod)?_20b.httpMethod:"GET";
var _20d={};
var _20e=_20b.bindExpr;
for(var i=0;i<_20e.length;i++){
var _210;
if(_20e[i].length==2){
_210=_20e[i][1];
}else{
_210=$B.getBindElementValue(_20e[i][1],_20e[i][2],_20e[i][3],false);
}
_20d[_20e[i][0]]=_210;
}
var _211=function(_212,_213){
$B.assignValue(_213.bindTo,_213.bindToAttr,_212,_213.bindToParams);
};
var _214={"bindTo":_20b.bindTo,"bindToAttr":_20b.bindToAttr,"bindToParams":_20b.bindToParams};
var _215={"async":true,"cfcPath":_20b.cfc,"httpMethod":_20c,"callbackHandler":_211,"errorHandler":_20b.errorHandler};
if(_20b.proxyCallHandler){
_215.callHandler=_20b.proxyCallHandler;
_215.callHandlerParams=_20b;
}
$X.invoke(_215,_20b.cfcFunction,_20b._cf_ajaxproxytoken,_20d,_214);
};
$B.cfcBindHandler._cf_bindhandler=true;
$U.extractReturnFormat=function(url){
var _217;
var _218=url.toUpperCase();
var _219=_218.indexOf("RETURNFORMAT");
if(_219>0){
var _21a=_218.indexOf("&",_219+13);
if(_21a<0){
_21a=_218.length;
}
_217=_218.substring(_219+13,_21a);
}
return _217;
};
$U.replaceAll=function(_21b,_21c,_21d){
var _21e=_21b.indexOf(_21c);
while(_21e>-1){
_21b=_21b.replace(_21c,_21d);
_21e=_21b.indexOf(_21c);
}
return _21b;
};
$U.cloneObject=function(obj){
var _220={};
for(key in obj){
var _221=obj[key];
if(typeof _221=="object"){
_221=$U.cloneObject(_221);
}
_220.key=_221;
}
return _220;
};
$C.clone=function(obj,_223){
if(typeof (obj)!="object"){
return obj;
}
if(obj==null){
return obj;
}
var _224=new Object();
for(var i in obj){
if(_223===true){
_224[i]=$C.clone(obj[i]);
}else{
_224[i]=obj[i];
}
}
return _224;
};
$C.printObject=function(obj){
var str="";
for(key in obj){
str=str+"  "+key+"=";
value=obj[key];
if(typeof (value)=="object"){
value=$C.printObject(value);
}
str+=value;
}
return str;
};
}
}
cfinit();
