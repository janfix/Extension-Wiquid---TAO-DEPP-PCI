define([
    'taoQtiItem/qtiCreator/widgets/interactions/customInteraction/Widget',
    'volcanisme/creator/widget/states/states'
], function(Widget, states){

	"use strict";

    var VolcanismeInteractionWidget = Widget.clone();

    VolcanismeInteractionWidget.initCreator = function(){
        
        this.registerStates(states);
        
        Widget.initCreator.call(this);
    };
    
    return VolcanismeInteractionWidget;
});