/*
Build by Wiquid's PCI Generator for TAO platform Free to use 
 */

define(['IMSGlobal/jquery_2_1_1', 'OAT/util/html', 'SnapForTao/runtime/js/mod'], function($, html,mod){
    'use strict';

 function renderChoices(id, $container, config){
    var snapInstance;

    $container.find(".snapy").append('<canvas class="world" tabindex="1" width="100%" height="100%"><p>Your browser doesn\'t support canvas.</p></canvas>').css("height","10%").css("width","100%");   
                
    snapInstance = mod.snap(id, $container, config);
                
}


    return {
        render : function(id, container, config, assetManager){

            var $container = $(container);

            renderChoices(id, $container, config);
            
            //render rich text content in prompt
            html.render($container.find('.prompt'));
        },
        renderChoices : function(id, container, config){
            renderChoices(id, $(container), config);
        }

    };
});
 
 