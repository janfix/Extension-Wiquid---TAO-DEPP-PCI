define([
    'taoQtiItem/qtiCreator/widgets/interactions/customInteraction/Widget',
    'relatem/creator/widget/states/states'
], function(Widget, states){

	"use strict";

    var RelatemInteractionWidget = Widget.clone();

    RelatemInteractionWidget.initCreator = function(){
        
        this.registerStates(states);
        
        Widget.initCreator.call(this);
    };
    
    return RelatemInteractionWidget;
});