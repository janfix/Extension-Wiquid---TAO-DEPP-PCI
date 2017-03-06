define([
    'taoQtiItem/qtiCreator/widgets/interactions/customInteraction/Widget',
    'circuit/creator/widget/states/states'
], function(Widget, states){

	"use strict";

    var CircuitInteractionWidget = Widget.clone();

    CircuitInteractionWidget.initCreator = function(){
        
        this.registerStates(states);
        
        Widget.initCreator.call(this);
    };
    
    return CircuitInteractionWidget;
});