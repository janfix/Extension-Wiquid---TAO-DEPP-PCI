/*
Copyright DEPP © 2017 - Ministère de l'éducation nationale 
*/

define([
    'taoQtiItem/qtiCreator/widgets/interactions/customInteraction/Widget',
    'cuisine/creator/widget/states/states'
], function(Widget, states){

	"use strict";

    var CuisineInteractionWidget = Widget.clone();

    CuisineInteractionWidget.initCreator = function(){
        
        this.registerStates(states);
        
        Widget.initCreator.call(this);
    };
    
    return CuisineInteractionWidget;
});