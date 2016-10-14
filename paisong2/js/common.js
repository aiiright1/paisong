/**
 * Created by Administrator on 2016/10/11.
 */

$(function(){

    $(".city>p").click(function(){
        $(this).toggleClass("selected");
        $(this).next().toggle();
    });
    $(".navlist>.list>a").click(function(){
        $(this).toggleClass("active");
        $(this).next().toggle();
    });
    var $navtop = $(".top_nav").offset().top;
    $(window).scroll(function(){
        if($(window).scrollTop()>50){
            $(".top").addClass("fixed");
        }else{
            $(".top").removeClass("fixed");
        }
        if($(window).scrollTop()>$navtop){
            $(".top_header").addClass("hide");
            $(".top_nav").addClass("fixed");
        }else{
            $(".top_header").removeClass("hide");
            $(".top_nav").removeClass("fixed");
        }
    });

    $(".down>a").click(function(){
        $(this).toggleClass("active");
        $(this).next().toggleClass("active");
    });
    $(".top_right").addClass("hide");
    $(".xs_city").click(function(){
        $(".top_right").toggleClass("hide");
    });




});
