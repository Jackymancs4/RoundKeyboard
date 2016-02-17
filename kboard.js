$(function () {

  function neg(x) {
    return x*(-1);
  }

  function print_result() {

    var sstring="";
    $.each(result, function(inde, valu) {

      if(valu[0]>=0) {
        sstring=sstring+letter[valu[0]];
      }
    });

    return sstring;

  }

  function create_bigger( index, value ) {

    $("#container>div").append("<div class=\"letter\" style=\"transform: rotate("+i+"deg) translate("+(diameter/2)+"px) rotate("+neg(i)+"deg);\">"+value+"</div>");
    $("#container>div>div:last-child").click(function(){

      if ($(this).parent().parent().attr("id")=="container") {

        //$("#console").text($("#console").text()+value+"-"+$(this).parent().attr("id"));
        //$("#console").text($("#console").text()+" - "+value+"."+index);

        result[count][0]=index;
        $("#console").text(print_result());

        diameter=diameter+weight;
        ray=diameter/2;
        maxangle=180*l/(Math.PI*ray);
        offset=offset+(singleangle*index)+(-maxangle/2);
        singleangle = maxangle/letter.length;

        i=offset;
        count++;

        result[count]=[-1,maxangle,diameter,ray,singleangle,offset];

        $("#container>div").wrap("<div class=\"circle-bigger\" id=\""+count+"-circle\" style=\"width:"+diameter+"px; height:"+diameter+"px\"></div>");
        $("#container>div>div:first-child").css({"top":""+(weight/2)+"px","left":""+(weight/2)+"px" });
        $("#container>div:first-child").css({"top":"20px","left":"20px" });

        $.each(letter, function( ind, val ) {
          create_bigger( ind, val );
          i=i+singleangle;

        });

        }  else {

          var newi=Number($(this).parent().attr("id").split("-")[0]);

          result[newi][0]=index;
          $("#console").text(print_result());

          for(var s=newi+1; s<result.length; s++) {

            diameter=result[s][2];
            ray=result[s][3];
            maxangle=result[s-1][1];
            singleangle=result[s][4];
            offset=result[s-1][5]+(result[s-1][4]*result[s-1][0])+(-result[s][1]/2);
            
            result[s][5]=offset;

            i=offset;

            $.each($("#"+s+"-circle>.letter"), function(k, v){
              $(this).css({"transform": "rotate("+i+"deg) translate("+(diameter/2)+"px) rotate("+neg(i)+"deg)"});
              i=i+singleangle;

            });
          }
        }

    });

  }

  var letter = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
  var result = [];
  var count=0;

  var maxangle = 200;
  var ray=150;
  var weight=50;

  var diameter=ray*2;
  var singleangle = maxangle/letter.length;
  var offset=(-maxangle/2)+singleangle/2;

  var l=(Math.PI/180)*maxangle*ray;
  var i = offset;

  result[count]=[-1, maxangle,diameter,ray,singleangle,offset];

  $("#container").append("<div class=\"circle\" id=\"0-circle\" style=\"width:"+diameter+"px; height:"+diameter+"px\"></div>");
  $("#container>div").append("<div id=\"center\">0</div>");

  $.each(letter, function( index, value ) {
    create_bigger( index, value );
    i=i+singleangle;

  });

});



