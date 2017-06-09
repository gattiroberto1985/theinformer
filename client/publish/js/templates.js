exports['titleTpl']=function(obj){
var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};
with(obj||{}){
__p+='<div class="jumbotron"> <h1>'+
((__t=( title.title ))==null?'':__t)+
'</h1> <p>'+
((__t=( title.subtitle ))==null?'':__t)+
'</p> </div> ';
}
return __p;
};
exports['articles/articleContentTpl']=function(obj){
var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};
with(obj||{}){
__p+='<div id="article-container"> <h1> <a href="'+
((__t=(article.get('url')))==null?'':__t)+
'">'+
((__t=( article.get('title') ))==null?'':__t)+
'</a> </h1> <div id="article-body-container"> '+
((__t=( article.get('content') ))==null?'':__t)+
' </div> </div> ';
}
return __p;
};
exports['articles/articleListTpl']=function(obj){
var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};
with(obj||{}){
__p+='<ul> ';
 _.each(articles, function(article){ 
__p+=' ';
 if ( article.get('isRead') ) { 
__p+=' <li class="read"> ';
 } else {
__p+=' </li><li class="unread"> ';
 }
__p+=' '+
((__t=( article.get('title') ))==null?'':__t)+
' </li>';
 }); 
__p+=' </ul> ';
}
return __p;
};
exports['feeds/feedListTpl']=function(obj){
var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};
with(obj||{}){
__p+='<ul> ';
 _.each(feeds, function(feed){ 
__p+=' <li> <!-- Feed title --> '+
((__t=( feed.get('title') ))==null?'':__t)+
' <span class="pull-right"> <span class="badge"> 5 <!-- '+
((__t=( feed.get('unread') ))==null?'':__t)+
' --> </span> <button class="glyphicons glyphicons-refresh"> <button class="glyphicons glyphicons-delete"> </span> </li> ';
 }); 
__p+=' </ul> ';
}
return __p;
};