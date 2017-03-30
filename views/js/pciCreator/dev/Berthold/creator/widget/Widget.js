/*
Copyright DEPP © 2017 - Ministère de l'éducation nationale  
*/

define([
    'taoQtiItem/qtiCreator/widgets/interactions/customInteraction/Widget',
    'Berthold/creator/widget/states/states'
], function(Widget, states){

"use strict";

    var BertholdWidget = Widget.clone();

    BertholdWidget.initCreator = function initCreator(){
        
        this.registerStates(states);
        
        Widget.initCreator.call(this);
    };
    
    return BertholdWidget;
});