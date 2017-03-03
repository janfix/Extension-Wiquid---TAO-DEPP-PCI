define([
    'taoQtiItem/qtiCreator/widgets/interactions/customInteraction/Widget',
    'lampedouble/creator/widget/states/states'
], function(Widget, states){

	"use strict";

    var LampeDoubleInteractionWidget = Widget.clone();

    LampeDoubleInteractionWidget.initCreator = function(){
        
        this.registerStates(states);
        
        Widget.initCreator.call(this);
    };
    
    return LampeDoubleInteractionWidget;
});