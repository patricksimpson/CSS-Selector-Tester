var nd___vo = {
  remove: function () {
    nd___vo.clean();
    $("#nd___box").hide();
    $("#nd___cache").text($.trim($("#nd___selector").val()));
  },
  show: function () {
    $("#nd___box").show();
    var q =  $.trim($("#nd___selector").val());
    if(!q){
      q = $("#nd___cache").text();
      $("#nd___selector").val(q);
    }
    if(q){
      nd___vo.go();
    }
  },
  add: function() {
    $("body").append("<div id='nd___box'></div>");
    $("#nd___box").append("<span id='nd___close'>[X]</span><span id='nd___title'>CSS Selector Tester</span>");
    $("#nd___box").append("<form action='#' id='nd___form'></form>");
    $("#nd___form").append("<p><label>Selector:</label><input type='text' id='nd___selector' /> <a href='javascript: void(0);' id='nd___clean'>clear</a></p>");
    $("#nd___form").append("<p>Element: <span id='nd___status'>undefined</span></p>");
    $("#nd___form").append("<p><input type='checkbox' id='nd___ohighlight' checked='true' /><label for='nd___ohighlight'>Highlight</label> <input type='checkbox' id='nd___oautoclean' /><label for='nd___oautoclean'>Autoclean</label></p>");
    $("#nd___form").on("submit", function(){ return false; });
    $("#nd___selector").keyup(function(){nd___vo.go();});
    $("#nd___box").draggable({ opacity: 0.35 }).resizable({ minWidth: 235 , minHeight: 120});
    $("#nd___clean").click(function(){
      nd___vo.alert("undefined"); 
      nd___vo.clean(); 
      $("#nd___selector").val("");
    });
    $("#nd___close").click(function(){
      nd___vo.alert("undefined"); 
      nd___vo.remove();
      $("#nd___selector").val("");
    });
    $("#nd___ohighlight").click(function(){
      if($("#nd___ohighlight").attr("checked") !== "checked"){
        nd___vo.clean();
      }else{
        if(nd___vo.cacheE){
          $(nd___vo.cacheE).css("outlineColor", "RGB(204,0,0)");
          $(nd___vo.cacheE).css("outlineStyle", "dashed");
          $(nd___vo.cacheE).css("outlineWidth", "2px");
          $(e).addClass("nd___highlighted");
        }
      }
    });
  },
  go: function(){
    nd___vo.clean();
    var q, e;
    q = $.trim($("#nd___selector").val());
    if(q === "#" || q === "." || q === "HTML" || q === "*" || q === ""){
      return false;
    }
    //e = $("*:not(div#nd___box " + q + ")" + q); FAILS to get cascade.
    try{
      e = $(q);
    }catch(error){
      nd___vo.alert("Invalid selector: " + q);
      return false;
    }
    if(e[0]){
      e = $.grep(e, function(domEle){
          if($(domEle).attr("id") === "nd___box" || ($(domEle).parents("#nd___box")[0])){
                return false;
            }
            return true;
      });
      if(e.length < 1){return false;}
      nd___vo.cacheOC = $(e).css("outlineColor");
      nd___vo.cacheOS = $(e).css("outlineStyle");
      nd___vo.cacheOW = $(e).css("outlineWidth");
  
      nd___vo.alert(nd___vo.info(e));
      nd___vo.cacheE = e;
      if($("#nd___ohighlight").attr("checked")){
        $(e).css("outlineColor", "RGB(204,0,0)");
        $(e).css("outlineStyle", "dashed");
        $(e).css("outlineWidth", "2px");
        $(e).addClass("nd___highlighted");
      }
      if($("#nd___oautoclean").attr("checked")){
        setTimeout("nd___vo.clean()", 2500);
      }
     }
     else{
      nd___vo.alert("undefined");
     }
  },
  alert: function(msg){
    $("#nd___status").html(msg);
  },
  clean: function(){
    if(nd___vo.cacheE != null){
      $(nd___vo.cacheE).css("outlineColor",nd___vo.cacheOC);
      $(nd___vo.cacheE).css("outlineStyle",nd___vo.cacheOS);
      $(nd___vo.cacheE).css("outlineWidth",nd___vo.cacheOW);
      $(nd___vo.cacheE).removeClass("nd___highlighted");

    }
  },
  info: function(ele){
    if(!$(ele)[0]){return false;}
    var count = $(ele).length - 1;
    var sel = $(ele)[0].tagName;
    var id = $(ele).attr("id");
    if (id) { 
      sel += "#"+ id;
    }
    var cN = $(ele).attr("class");
    if (cN) {
      sel += "." + $.trim(cN).replace(/\s/gi, ".");
    }
    if(count > 0){
      sel += ", " + count + " others...";
    }
    return sel;
  }
};
if($("#nd___box")[0]){ 
  nd___vo.show();
}else{
  nd___vo.add();
}
