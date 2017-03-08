/*
Copyright DEPP © 2017 - Ministère de l'éducation nationale 
*/

define([
    'taoQtiItem/qtiCreator/widgets/interactions/customInteraction/Widget',
    'maraissalant/creator/widget/states/states'
], function(Widget, states){

	"use strict";

    var MaraissalantInteractionWidget = Widget.clone();

    MaraissalantInteractionWidget.initCreator = function(){
        
        this.registerStates(states);
        
        Widget.initCreator.call(this);
    };
    
    return MaraissalantInteractionWidget;
});