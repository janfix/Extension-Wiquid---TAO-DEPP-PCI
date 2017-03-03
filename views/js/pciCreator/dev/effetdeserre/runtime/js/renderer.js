define(['IMSGlobal/jquery_2_1_1', 'OAT/util/html'], function($, html){

"use strict"; 

    function renderChoices(id, $container, config){

    var answ;

       $container.find(".consigne").append(" - moins  <input type='range' class='ranger'> plus +");

       var $ranger = $container.find(".ranger");
       var $smallfleche = $container.find(".smallfleche");
       var $fleche1 = $container.find(".fleche1");
       var $mfleche = $container.find(".mfleche");
       var $m2fleche = $container.find(".m2fleche");
       var $bigfleche =  $container.find(".bigfleche");

            $ranger.attr("min","0");
            $ranger.attr("max","0.8");
            $ranger.attr("step","0.1");
            $ranger.attr("value","0");     
     
   
        $container.on("input", ".ranger", function(){ 
           answ = answ + $ranger.val(); 
            if(answ.length < 80){$container.find(".efdsasw").append("'"+$ranger.val()+"',"); }    

        var seuil = parseFloat($(this).val());
        
        if(seuil<0.26){
            $smallfleche.show();
            $fleche1.show();
            $mfleche.hide();
            $m2fleche.hide();
            $bigfleche.hide();
        }
        else if(seuil>0.25 && seuil < 0.51){
            $smallfleche.hide();
            $fleche1.hide();
            $mfleche.show();
            $m2fleche.hide();
            $bigfleche.hide();
        }
        else if(seuil>0.5 && seuil < 0.76){
            $smallfleche.hide();
            $fleche1.hide();
            $mfleche.hide();
            $m2fleche.show();
            $bigfleche.hide();
        }
        else if(seuil>0.75){
            $smallfleche.hide();
            $fleche1.hide();
            $mfleche.hide();
            $m2fleche.hide();
            $bigfleche.show();
        }

        var opaco = $(this).val()-0.1;
        $container.find(".atmos").css("background-color","rgba(255, 255, 255,"+ opaco +")");
        });
    }



    return { 
        render : function(id, container, config){ 

            var $container = $(container);

            renderChoices(id, $container, config);             

            html.render($container.find('.prompt'));
        }
    };
});