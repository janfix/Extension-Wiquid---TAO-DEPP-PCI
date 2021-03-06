/*

Build by Wiquid's PCI Generator for TAO platform Free to use - http://www.wiquid.fr/depp/ent/
Copyright DEPP © 2018 - Ministère de l'éducation nationale  

 */

define([
    'taoQtiItem/qtiCreator/widgets/interactions/customInteraction/Widget',
    'SnapForTao/creator/widget/states/states'
], function(Widget, states){
    'use strict';

    var SnapForTaoWidget = Widget.clone();

     SnapForTaoWidget.initCreator = function(){
        
        this.registerStates(states);
        
        Widget.initCreator.call(this);
    };
    
    return SnapForTaoWidget;
});
