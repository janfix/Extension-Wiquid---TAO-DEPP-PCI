/*
Copyright DEPP © 2017 - Ministère de l'éducation nationale  
*/

define(['IMSGlobal/jquery_2_1_1', 'OAT/util/html'], function($, html){

"use strict"; 

    function renderChoices(id, $container, config){

    }

    function renderLabels(id, $container, config){

    }

    return { 
        render : function(id, container, config){ 

            var $container = $(container);

            renderChoices(id, $container, config);
            renderLabels(id, $container, config);
            
            //render rich text content in prompt
            html.render($container.find('.prompt'));
        },
        renderChoices : function(id, container, config){
            renderChoices(id, $(container), config);
        }
    };
});