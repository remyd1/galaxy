$.fn.makeAbsolute=function(a){return this.each(function(){var b=$(this);var c=b.position();b.css({position:"absolute",marginLeft:0,marginTop:0,top:c.top,left:c.left,right:$(window).width()-(c.left+b.width())});if(a){b.remove().appendTo("body")}})};jQuery(document).ready(function(){jQuery("a[confirm]").click(function(){return confirm(jQuery(this).attr("confirm"))});make_popup_menus()});function make_popup_menus(){jQuery("div[popupmenu]").each(function(){var c={};$(this).find("a").each(function(){var b=$(this).attr("confirm"),d=$(this).attr("href"),e=$(this).attr("target");c[$(this).text()]=function(){if(!b||confirm(b)){var g=window;if(e=="_parent"){g=window.parent}else{if(e=="_top"){g=window.top}}g.location=d}}});var a=$("#"+$(this).attr("popupmenu"));make_popupmenu(a,c);$(this).remove();a.addClass("popup").show()})}function ensure_popup_helper(){if($("#popup-helper").length==0){$("<div id='popup-helper'/>").css({background:"white",opacity:0,zIndex:15000,position:"absolute",top:0,left:0,width:"100%",height:"100%"}).appendTo("body").hide()}}function make_popupmenu(d,c){ensure_popup_helper();var a=$(d);var b=$("<ul id='"+d.attr("id")+"-menu'></ul>");$.each(c,function(g,f){if(f){$("<li/>").html(g).click(f).appendTo(b)}else{$("<li class='head'/>").html(g).appendTo(b)}});var e=$("<div class='popmenu-wrapper'>");e.append(b).append("<div class='overlay-border'>").css("position","absolute").appendTo("body").hide();attach_popupmenu(d,e)}function attach_popupmenu(b,d){var a=function(){d.unbind().hide();$("#popup-helper").unbind("click.popupmenu").hide()};var c=function(g){var h=$(b).offset();$("#popup-helper").bind("click.popupmenu",a).show();d.click(a).css({left:0,top:-1000}).show();var f=g.pageX-d.width()/2;f=Math.min(f,$(document).scrollLeft()+$(window).width()-$(d).width()-20);f=Math.max(f,$(document).scrollLeft()+20);d.css({top:g.pageY-5,left:f});return false};$(b).click(c)}var array_length=function(a){if(a.length){return a.length}var b=0;for(element in a){b++}return b};var replace_dbkey_select=function(){var c=$("select[name=dbkey]");var d=c.attr("value");if(c.length!=0){var e=$("<input id='dbkey-input' type='text'></input>");e.attr("size",40);e.attr("name",c.attr("name"));e.click(function(){var g=$(this).attr("value");$(this).attr("value","Loading...");$(this).showAllInCache();$(this).attr("value",g);$(this).select()});var b=new Array();var a=new Object();c.children("option").each(function(){var h=$(this).text();var g=$(this).attr("value");if(g=="?"){return}b.push(h);a[h]=g;if(g==d){e.attr("value",h)}});if(e.attr("value")==""){e.attr("value","Click to Search or Select Build")}var f={selectFirst:false,autoFill:false,mustMatch:false,matchContains:true,max:1000,minChars:0,hideForLessThanMinChars:false};e.autocomplete(b,f);c.replaceWith(e);$("form").submit(function(){var i=$("#dbkey-input");if(i.length!=0){var h=i.attr("value");var g=a[h];if(g!=null&&g!=undefined){i.attr("value",g)}else{if(d!=""){i.attr("value",d)}else{i.attr("value","?")}}}})}};function async_save_text(d,f,e,a,c,h,i,g,b){if(c==null){c=30}if(i==null){i=4}$("#"+d).click(function(){var k=$("#"+f).text();if(h){var j=$("<textarea rows='"+i+"' cols='"+c+"'>"+k+"</textarea>")}else{var j=$("<input type='text' value='"+k+"' size='"+c+"'></input>")}j.blur(function(){$(this).remove();$("#"+f).show();if(b!=null){b(j)}});j.keyup(function(m){if(m.keyCode==27){$(this).trigger("blur")}else{if(m.keyCode==13){new_text=this.value;$(this).trigger("blur");var l=new Object();l[a]=new_text;$.ajax({url:e,data:l,error:function(){alert("Text editing for elt "+f+" failed")},success:function(n){$("#"+f).text(n);if(b!=null){b(j)}}})}}});if(g!=null){g(j)}$("#"+f).hide();j.insertAfter($("#"+f));j.focus();j.select();return false})};