/*
Copyright DEPP © 2017 - Ministère de l'éducation nationale  
*/

define([
    'taoQtiItem/qtiCreator/widgets/interactions/customInteraction/Widget',
    'bronco/creator/widget/states/states'
], function(Widget, states){

"use strict";

    var BroncoInteractionWidget = Widget.clone();

    BroncoInteractionWidget.initCreator = function(){
        
        this.registerStates(states);
        
        Widget.initCreator.call(this);
    };
    
    return BroncoInteractionWidget;
});