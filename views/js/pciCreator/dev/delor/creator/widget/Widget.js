define([
    'taoQtiItem/qtiCreator/widgets/interactions/customInteraction/Widget',
    'delor/creator/widget/states/states'
], function(Widget, states){

	"use strict";

    var delorInteractionWidget = Widget.clone();

    delorInteractionWidget.initCreator = function(){
        
        this.registerStates(states);
        
        Widget.initCreator.call(this);
    };
    
    return delorInteractionWidget;
});