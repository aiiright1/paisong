$(function(){
  //轮播
    var termid;
    var currentindex=0;
    var view=document.documentElement.clientWidth;
    window.onresize=function(){
        view=document.documentElement.clientWidth;
        //console.log(view);
    }
    $(".pic-icon>li").click(function(){
        //console.log(1);
        currentindex = $(this).index();
        $(".pic-icon>li").removeClass("active");
        $(this).addClass("active");
        $(".pic-list").animate({
            left:-currentindex*view
        });
    });
    //左键
    $(".pic-left-btn").click(function(){
        if(currentindex<=0){
            $(".pic-list").css("left",-6*view);
        }
        currentindex--;
        if(currentindex<0){
            currentindex = 5;
        }
        $(".pic-icon").children().removeClass("active").eq(currentindex).addClass("active");
        $(".pic-list").animate({
            left:-currentindex*view
        },function(){
            if(currentindex<=0){
                $(".pic-list").css("left",-6*view);
            }
        });
    });
    //右键
    $(".pic-right-btn").click(function(){

        currentindex++;
        if(currentindex>6){
            currentindex = 1;
        }
        $(".pic-icon").children().removeClass("active").eq(currentindex).addClass("active");
        $(".pic-list").animate({
            left:-currentindex*view
        },function(){
            if(currentindex>=6){
                $(".pic-list").css("left","0");
                $(".pic-icon").children().removeClass("active").eq(0).addClass("active");
            }
        });
    });


    //自动轮播
    var on=function (){
        termid=setInterval(function(){

            currentindex++;
            if(currentindex>6){
                currentindex = 1;
            }
            $(".pic-icon").children().removeClass("active").eq(currentindex).addClass("active");
            $(".pic-list").animate({
                left:-currentindex*view
            },function(){
                if(currentindex>=6){
                    $(".pic-list").css("left","0");
                    $(".pic-icon").children().removeClass("active").eq(0).addClass("active");
                }
            });
        },1000)
    }
    on();
    //鼠标进入轮播
    $(".pic").hover(function(){
        clearInterval(termid);
        $(".btn1").show();
    },function(){
        on();
        $(".btn1").hide();
    });
    //new 获取json
    $.get("json/new.json",function(data){
        //type=\"submit\"
        var html="";
        $.each(data,function(i,o){
            html+="<div class=\"col-md-3 col-sm-3 col-xs-6\">"+
                "<div class=\"front-page-product-set-image-container\">"+
                "<a href=\"javascript:;\">"+
                "<img class=\"img-responsive\" src=\" "+o.imgsrc+" \">"+
                 "</a>"+
                "<form accept-charset=\"UTF-8\" action=\"shopping-cart\" class=\"front-page-cart-form hidden-xs\" data-remote=\"true\" method=\"post\"><div style=\"display:none\"><input name=\"utf8\" type=\"hidden\" value=\"✓\"></div>"+
                "<input name=\"authenticity_token\" type=\"hidden\" value=\"YqX3Y6fH364yS7l7HZTo19H7MFKlfsOGjwae5fUXtYc=\">"+
                "<input name=\"product_id\" type=\"hidden\" value=\"564\">"+
                "<input class=\"shopping-cart-button\" pid=\" "+o.pid+" \" value=\"\">"+
                "</form>"+
                "</div>"+
                "<div class=\"chinese-name\">"+
                "<a href=\"#\">"+
                "<h2 class=\"product-set-link\">"+ o.title+"</h2>"+
                "</a>"+
                "<i class=\"size\">"+o.size+"</i>"+
                "<span class=\"size-and-price\">"+ o.price+"</span>"+
                "</div>"+
                "</div>";
        });
        $("#row1").html(html);
        $(".shopping-cart-button").click(
            function(){
                var id=$(this).attr("pid");
                var pname=$(this).parent().parent().next().children().children().html();
                var size=$(this).parent().parent().next().children(".size").html();
                var price=$(this).parent().parent().next().children(".size-and-price").html();
                var img=$(this).parent().prev().children("img").attr("src");
                var str=id+"#"+pname+"#"+img+"#"+price+"#"+"1"+"#"+"size";
                //console.log(str);
                var $shopcart=$.cookie("shopcart");
                if(!$shopcart){
                    $.cookie("shopcart",str,{expires:7});
                }else{
                    var result = strOper.add($shopcart,str);
                    $.cookie("shopcart",result);
                }
                console.log(img);

            }
        );
    });
    $(".btn").click(
        function(){
            $("#set_current_city").hide();
            console.log($(this).text());
        }
    );

});

