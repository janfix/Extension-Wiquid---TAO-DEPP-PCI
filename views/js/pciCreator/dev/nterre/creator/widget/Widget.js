/*
Copyright DEPP © 2017 - Ministère de l'éducation nationale 
*/

define([
    'taoQtiItem/qtiCreator/widgets/interactions/customInteraction/Widget',
    'nterre/creator/widget/states/states'
], function(Widget, states){

	"use strict";

    var NterreInteractionWidget = Widget.clone();

    NterreInteractionWidget.initCreator = function initCreator(){
        
        this.registerStates(states);
        
        Widget.initCreator.call(this);
    };
    
    return NterreInteractionWidget;
});