/*
Copyright DEPP © 2017 - Ministère de l'éducation nationale  
*/

define([
    'taoQtiItem/qtiCreator/widgets/interactions/customInteraction/Widget',
    'train/creator/widget/states/states'
], function(Widget, states){

	"use strict";

    var TrainInteractionWidget = Widget.clone();

    TrainInteractionWidget.initCreator = function(){
        
        this.registerStates(states);
        
        Widget.initCreator.call(this);
    };
    
    return TrainInteractionWidget;
});