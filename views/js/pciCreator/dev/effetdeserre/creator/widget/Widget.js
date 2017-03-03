define([
    'taoQtiItem/qtiCreator/widgets/interactions/customInteraction/Widget',
    'effetdeserre/creator/widget/states/states'
], function(Widget, states){

	"use strict";

    var effetdeserreInteractionWidget = Widget.clone();

    effetdeserreInteractionWidget.initCreator = function(){
        
        this.registerStates(states);
        
        Widget.initCreator.call(this);
    };
    
    return effetdeserreInteractionWidget;
});