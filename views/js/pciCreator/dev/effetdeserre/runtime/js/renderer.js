define(['IMSGlobal/jquery_2_1_1', 'OAT/util/html'], function($, html){

// Le renderer sert pour le rendu QTI visible dans Preview. 

    function renderChoices(id, $container, config){

    var answ;

       $("#consigne").append(" - moins  <input type='range' id='ranger'> plus +");
            $("#ranger").attr("min","0");
            $("#ranger").attr("max","0.8");
            $("#ranger").attr("step","0.1");
            $("#ranger").attr("value","0");     
     
     // $("#ranger").change(function(event) {
        $(document).on("input", "#ranger", function(){ 
           answ = answ + $("#ranger").val(); 
            if(answ.length < 80){$("#efdsasw").append("'"+$("#ranger").val()+"',"); }    

        var seuil = parseFloat($(this).val());
        
        /*$("#fleche2").css("width","234px");
        $("#fleche2").css("height","195px");*/
        
        if(seuil<0.26){
            $("#smallfleche").show();
            $("#fleche1").show();
            $("#mfleche").hide();
            $("#m2fleche").hide();
            $("#bigfleche").hide();
        }
        else if(seuil>0.25 && seuil < 0.51){
            $("#smallfleche").hide();
            $("#fleche1").hide();
            $("#mfleche").show();
            $("#m2fleche").hide();
            $("#bigfleche").hide();
        }
        else if(seuil>0.5 && seuil < 0.76){
            $("#smallfleche").hide();
            $("#fleche1").hide();
            $("#mfleche").hide();
            $("#m2fleche").show();
            $("#bigfleche").hide();
        }
        else if(seuil>0.75){
            $("#smallfleche").hide();
            $("#fleche1").hide();
            $("#mfleche").hide();
            $("#m2fleche").hide();
            $("#bigfleche").show();
        }

        var opaco = $(this).val()-0.1;
        $("#atmos").css("background-color","rgba(255, 255, 255,"+ opaco +")");
        //$(".aniflex2").css("opacity",opaco);
        });
    }



    return { //Attention ce return doit appartenir à la syntaxe de require.js il clôt la fonction globale
        render : function(id, container, config){ //Il renvoie la méthode render

            var $container = $(container);// Charge le container dans une variable éponyme

            renderChoices(id, $container, config); // Applique les fonctions de mise en forme            
            //render rich text content in prompt
            html.render($container.find('.prompt'));// Utilisation de HTML.js pour générer du html
        }
    };
});