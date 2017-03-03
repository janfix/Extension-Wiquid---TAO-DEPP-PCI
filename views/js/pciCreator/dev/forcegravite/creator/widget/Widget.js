define([
    'taoQtiItem/qtiCreator/widgets/interactions/customInteraction/Widget',
    'forcegravite/creator/widget/states/states'
], function(Widget, states){

	"use strict";

    var ForcegraviteInteractionWidget = Widget.clone();

    ForcegraviteInteractionWidget.initCreator = function(){
        
        this.registerStates(states);
        
        Widget.initCreator.call(this);
    };
    
    return ForcegraviteInteractionWidget;
});