define(['IMSGlobal/jquery_2_1_1', 'OAT/util/html'], function($, html){

// Le renderer sert pour le rendu QTI visible dans Preview. 

    function renderChoices(id, $container, config){
        $("#polludiv").append("<input type='range' id='pollu' max='20' min='1'>");

        $("#pollu").val(1);
      
        $("#pollu").change(function(event) {
            var vpol = 40- eval( $("#pollu").val()); 
            $("#air").attr("r", vpol);
         });
    }


    return { //Attention ce return doit appartenir à la syntaxe de require.js il clôt la fonction globale
        render : function(id, container, config){ //Il renvoie la méthode render

            var $container = $(container);// Charge le container dans une variable éponyme

            renderChoices(id, $container, config); // Applique les fonctions de mise en forme
            //render rich text content in prompt
            html.render($container.find('.prompt'));// Attention ceci condition le .prompt du template. Si on veut l'éliminier, il faut virer aussi ceci.
        }
    };
});