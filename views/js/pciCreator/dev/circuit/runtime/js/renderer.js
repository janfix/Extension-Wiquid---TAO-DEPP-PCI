define(['IMSGlobal/jquery_2_1_1', 'OAT/util/html'], function($, html){

// Le renderer sert pour le rendu QTI visible dans Preview. 

    function renderChoices(id, $container, config){

    }

    function renderLabels(id, $container, config){

    }

    return { //Attention ce return doit appartenir à la syntaxe de require.js il clôt la fonction globale
        render : function(id, container, config){ //Il renvoie la méthode render

            var $container = $(container);// Charge le container dans une variable éponyme

            renderChoices(id, $container, config); // Applique les fonctions de mise en forme
            renderLabels(id, $container, config);
            
            //render rich text content in prompt
            html.render($container.find('.prompt'));// Utilisation de HTML.js pour générer du html
        },
        renderChoices : function(id, container, config){
            renderChoices(id, $(container), config);
        }
    };
});