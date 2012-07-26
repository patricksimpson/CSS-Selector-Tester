var nd___vo = {
  remove: function () {
    nd___vo.clean();
    $("#nd___box").hide();
  },
  show: function () {
    $("#nd___box").show();
    if($("#nd___ohighlight").attr("checked") !== "checked"){
      nd___vo.clean();
    }else{
      if(nd___vo.cachE){
        $(nd___vo.cacheE).css("outline","2px dashed #cc0000");
      }
    }
  },
  cacheB: null,
  cacheE: null,
  add: function() {
    $("body").append("<div id='nd___box'><span id='nd___close'>[x]</span><span id='nd___title'>CSS Selector Tester</span><form onsumbut='return false;'><p><label>Selector:</label><input type='text' id='nd___selector'><a href='javascript: void(0);' id='nd___clean'>X</a></p><p>Element: <span id='nd___status'>undefined</span></p><p><input type='checkbox' id='nd___ohighlight' checked='true'><label for='nd___ohighlight'>Highlight</label>&nbsp;<input type='checkbox' id='nd___oautoclean'><label for='nd___oautoclean'>Autoclean</label></p></form></div>");
    $("#nd___selector").keyup(function(){
      nd___vo.clean();
      var q, e;
      q = $.trim($("#nd___selector").val());
      if(q === "#" || q === "."){
        return false;
      }
      e = $("*:not(div#nd___box " + q + ")" + q);
      
      if(e[0]){
        if($(e)[0].tagName.toUpperCase() === "HTML"){ e = false; return false;}
        nd___vo.alert(nd___vo.info(e));
        if($("#nd___ohighlight").attr("checked") === "checked"){
          nd___vo.cacheB = $(e).css("outline");
          nd___vo.cacheE = e;
          $(e).css("outline","2px dashed #cc0000");
        }
        if(($("#nd___oautoclean").attr("checked") === "checked")){
          setTimeout("nd___vo.clean()", 2500);
        }
       }
       else{
        nd___vo.alert("undefined");
       }
    });
    $("#nd___clean").click(function(){
      nd___vo.alert("undefined"); nd___vo.clean(); $("#nd___selector").val("");
    });
    $("#nd___close").click(function(){nd___vo.alert("undefined"); nd___vo.remove();$("#nd___selector").val("");});
    $("#nd___ohighlight").click(function(){
      if($("#nd___ohighlight").attr("checked") !== "checked"){
        nd___vo.clean();
      }else{
        if(nd___vo.cachE){
          $(nd___vo.cacheE).css("outline","2px dashed #cc0000");
        }
      }
    });
  },
  alert: function(msg){
    $("#nd___status").html(msg);
  },
  clean: function(){
    if(nd___vo.cacheE != null){
      $(nd___vo.cacheE).css("outline",nd___vo.cacheB);
    }
  },
  info: function(ele){
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