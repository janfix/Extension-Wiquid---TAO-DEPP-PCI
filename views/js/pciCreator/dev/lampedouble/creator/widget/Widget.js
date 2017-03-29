/*
Copyright DEPP © 2017 - Ministère de l'éducation nationale  
*/

define([
    'taoQtiItem/qtiCreator/widgets/interactions/customInteraction/Widget',
    'lampedouble/creator/widget/states/states'
], function(Widget, states){

	"use strict";

    var LampeDoubleInteractionWidget = Widget.clone();

    LampeDoubleInteractionWidget.initCreator = function initCreator(){
        
        this.registerStates(states);
        
        Widget.initCreator.call(this);
    };
    
    return LampeDoubleInteractionWidget;
});