define([
    'taoQtiItem/qtiCreator/widgets/interactions/customInteraction/Widget',
    'lentilles/creator/widget/states/states'
], function(Widget, states){

    var lentillesInteractionWidget = Widget.clone();

    lentillesInteractionWidget.initCreator = function(){
        
        this.registerStates(states);
        
        Widget.initCreator.call(this);
    };
    
    return lentillesInteractionWidget;
});