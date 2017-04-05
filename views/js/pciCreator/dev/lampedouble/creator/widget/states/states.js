/*
Copyright DEPP © 2017 - Ministère de l'éducation nationale 
*/

define([
    'taoQtiItem/qtiCreator/widgets/states/factory',
    'taoQtiItem/qtiCreator/widgets/interactions/customInteraction/states/states',
    'lampedouble/creator/widget/states/Question'
], function(factory, states){
	"use strict"; 
    return factory.createBundle(states, arguments, ['answer', 'correct', 'map']);
});