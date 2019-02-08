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

    $container.find(".world").css('position','relative'); 
    console.log("CONTROLO JP");
    
     function onResize(element, callback) {
            var elementHeight = element.height,
                elementWidth = element.width;
            setInterval(function () {
                if (element.height !== elementHeight || element.width !== elementWidth) {
                    elementHeight = element.height;
                    elementWidth = element.width;
                    callback();
                }
            }, 300);
        }

        var element = $("canvas");
        onResize(element, function () {
           // location.reload();  // Solution valable pour la partie test.
            alert("MOIIIIIIIIIIIIIIIIIIIII"); 
           //snapInstance = null;
           // element.remove();
           
           /*  $container.find(".snapy").append('<canvas class="world" tabindex="1" ><p>Your browser doesn\'t support canvas.</p></canvas>');
            snapInstance = snapsrc.snap(id, $container, config); */

            });

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
 
 