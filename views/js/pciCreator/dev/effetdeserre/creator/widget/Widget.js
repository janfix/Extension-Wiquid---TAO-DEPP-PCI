/*
Copyright DEPP © 2017 - Ministère de l'éducation nationale  
*/

define([
    'taoQtiItem/qtiCreator/widgets/interactions/customInteraction/Widget',
    'effetdeserre/creator/widget/states/states'
], function(Widget, states){

	"use strict";

    var effetdeserreInteractionWidget = Widget.clone();

    effetdeserreInteractionWidget.initCreator = function initCreator(){
        
        this.registerStates(states);
        
        Widget.initCreator.call(this);
    };
    
    return effetdeserreInteractionWidget;
});