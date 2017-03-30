/*
Copyright DEPP © 2017 - Ministère de l'éducation nationale  
*/

define([
    'taoQtiItem/qtiCreator/widgets/interactions/customInteraction/Widget',
    'circuit/creator/widget/states/states'
], function(Widget, states){

	"use strict";

    var CircuitInteractionWidget = Widget.clone();

    CircuitInteractionWidget.initCreator = function initCreator(){
        
        this.registerStates(states);
        
        Widget.initCreator.call(this);
    };
    
    return CircuitInteractionWidget;
});