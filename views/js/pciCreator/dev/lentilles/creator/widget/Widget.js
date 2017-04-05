/*
Copyright DEPP © 2017 - Ministère de l'éducation nationale  
*/

define([
    'taoQtiItem/qtiCreator/widgets/interactions/customInteraction/Widget',
    'lentilles/creator/widget/states/states'
], function(Widget, states){

	"use strict";

    var lentillesInteractionWidget = Widget.clone();

    lentillesInteractionWidget.initCreator = function initCreator(){
        
        this.registerStates(states);
        
        Widget.initCreator.call(this);
    };
    
    return lentillesInteractionWidget;
});