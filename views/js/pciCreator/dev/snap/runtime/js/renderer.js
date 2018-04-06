/*

Build by Wiquid's PCI Generator for TAO platform Free to use - http://www.wiquid.fr/depp/ent/
Copyright DEPP © 2018 - Ministère de l'éducation nationale 

 */

define(['taoQtiItem/portableLib/jquery_2_1_1', 'taoQtiItem/portableLib/OAT/util/html', 'SnapForTao/runtime/js/lib/snapsrc'], function($, html, snapsrc){
    'use strict';

 function renderSnap(id, $container, config){
    var snapInstance;

    $container.find(".snapy").append('<canvas class="world" tabindex="1" ><p>Your browser doesn\'t support canvas.</p></canvas>');   
                
    snapInstance = snapsrc.snap(id, $container, config);
      
    // Left Panel Sizer 
    if(config.panelSizer == 'nonVisible'){ snapsrc.snap.world.leftReducer(); }
    else{snapsrc.snap.world.leftExpand();}
    
}


    return {
        render : function(id, container, config, assetManager){

            var $container = $(container);

            renderSnap(id, $container, config);
            
            //render rich text content in prompt
            html.render($container.find('.prompt'));
        },
        renderSnap : function(id, container, config){
            renderSnap(id, $(container), config);
        }

    };
});
 
 