define(['IMSGlobal/jquery_2_1_1', 'OAT/util/html'], function($, html){

// Le renderer sert pour le rendu QTI visible dans Preview. 

    function renderChoices(id, $container, config, assetManager){

            $("#containercuisine").append("<button id='bt-tartre' class='bt'>Observation n°4</button><button id='bt-boiler' class='bt'>Observation n°1</button><button id='bt-feu' class='bt'>Observation n°3</button><button id='bt-choco' class='bt'>Observation n°2</button>"); 
            
            // Insertion image de zoneTartre           
            $("#zonetartre").append($('<img>', {src: assetManager.resolve('cuisine/runtime/img/tartre.png')}).attr('id','tartre1'));
            $("#zonetartre").append($('<img>', {src: assetManager.resolve('cuisine/runtime/img/vinaigre.png')}).attr('id','vinaigre'));
            $("#zonetartre").append($('<img>', {src: assetManager.resolve('cuisine/runtime/img/robpropre.png')}).attr('id','tartre2'));
            $("#zonetartre").append("<div id='tartretxt'>Le vinaigre et le tartre réagissent. Ainsi les traces disparaissent.</div> ");

            // Insertion image zoneBoiler
            $("#zoneBoiler").append($('<img>', {src: assetManager.resolve('cuisine/runtime/img/boiler1.png')}).attr('id','boiler1'));
            $("#zoneBoiler").append($('<img>', {src: assetManager.resolve('cuisine/runtime/img/boiler2.png')}).attr('id','boiler2'));
            $("#zoneBoiler").append("<div id='boilertxt'>L'eau bout dans la bouilloire</div>");

            // Insertion image zoneFeu
            $("#zonefeu").append($('<img>', {src: assetManager.resolve('cuisine/runtime/img/feugaz.png')}).attr('id','feugaz'));
            $("#zonefeu").append("<div id='gazfeutxt'>Le gaz brûle avec le dioxygène de l'air</div>");

            // Insertion image zonechocolat
            $("#zonechocolat").append($('<img>', {src: assetManager.resolve('cuisine/runtime/img/chocolat1.png')}).attr('id','choco1'));
            $("#zonechocolat").append($('<img>', {src: assetManager.resolve('cuisine/runtime/img/chocolat2.png')}).attr('id','choco2'));
            $("#zonechocolat").append($('<img>', {src: assetManager.resolve('cuisine/runtime/img/chocolat3.png')}).attr('id','choco3'));
            $("#zonechocolat").append("<div id='chocotxt'>Le chocolat fond dans la casserole</div>");


            $("#bt-boiler").click(function(event) {
                $(".bt").hide();
                $(".bt").delay("7100").fadeIn();
                $("#boiler1").hide();
                $("#boiler2").hide();
                $("#boilertxt").hide();
                $("#zoneBoiler").css("display","inline");
                $("#boiler1").delay("100").fadeIn();
                $("#boilertxt").delay("100").fadeIn();
                $("#boiler2").delay("1500").fadeIn();
                $("#zoneBoiler").delay("7000").hide(0);
  
               
            }); 


        $("#bt-feu").click(function(event) {
            $("#feugaz").hide();
            $("#gazfeutxt").hide();
            $(".bt").hide();
            $(".bt").delay("5100").fadeIn();
            $("#zonefeu").css("display","inline");
            $("#feugaz").delay("100").fadeIn();
            //$("#feugaz").delay("3500").fadeOut();
            $("#gazfeutxt").delay("100").fadeIn();
            //$("#gazfeutxt").delay("3500").fadeOut();
            $("#zonefeu").delay("5000").hide(0);
    }); 

         $("#bt-choco").click(function(event) {
            $(".bt").hide();
            $(".bt").delay("9100").fadeIn();
            $("#zonechocolat").css("display","inline");
            $("#choco1").hide();
            $("#choco2").hide();
            $("#choco3").hide();

            $("#choco1").delay("100").fadeIn();
            //$("#choco1").delay("2500").fadeOut();
            $("#choco2").delay("2500").fadeIn();
            //$("#choco2").delay("2500").fadeOut();
            $("#choco3").delay("5000").fadeIn();
            //$("#choco3").delay("3500").fadeOut();
            $("#chocotxt").delay("100").fadeIn();
            //$("#chocotxt").delay("5500").fadeOut();
            $("#zonechocolat").delay("9000").hide(0);
    }); 

          $("#bt-tartre").click(function(event) {
            $(".bt").hide();
            $(".bt").delay("8100").fadeIn();
            $("#zonetartre").css("display","inline");
            // Reset des fadeIn/Out
            $("#tartre1").hide();
            $("#vinaigre").hide();
            $("#tartre2").hide();
            
            $("#tartre1").delay("100").fadeIn();
            $("#vinaigre").delay("2500").fadeIn();
            $("#tartre2").delay("5000").fadeIn();
     
            $("#tartretxt").delay("100").fadeIn();
            $("#tartretxt").delay("4500").fadeOut();

            $("#zonetartre").delay("8000").hide(0);
            
    }); 
    }


    return { //Attention ce return doit appartenir à la syntaxe de require.js il clôt la fonction globale
        render : function(id, container, config, assetManager){ //Il renvoie la méthode render

            var $container = $(container);// Charge le container dans une variable éponyme

            renderChoices(id, $container, config, assetManager); // Applique les fonctions de mise en forme
            
            //render rich text content in prompt
            html.render($container.find('.prompt'));// Utilisation de HTML.js pour générer du html
        }
    };
});