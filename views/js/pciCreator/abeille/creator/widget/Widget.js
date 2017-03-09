/*
Copyright DEPP © 2017 - Ministère de l'éducation nationale 
*/

define([
    'taoQtiItem/qtiCreator/widgets/interactions/customInteraction/Widget',
    'abeille/creator/widget/states/states'
], function(Widget, states){

	"use strict";

    var abeilleInteractionWidget = Widget.clone();

    abeilleInteractionWidget.initCreator = function(){
        
        this.registerStates(states);
        
        Widget.initCreator.call(this);
    };
    
    return abeilleInteractionWidget;
});