/*
Copyright DEPP - Ministère de l'éducation nationale 
*/

define([
    'taoQtiItem/qtiCreator/widgets/interactions/customInteraction/Widget',
    'delor/creator/widget/states/states'
], function(Widget, states){

	"use strict";

    var delorInteractionWidget = Widget.clone();

    delorInteractionWidget.initCreator = function initCreator(){
        
        this.registerStates(states);
        
        Widget.initCreator.call(this);
    };
    
    return delorInteractionWidget;
});