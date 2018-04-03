/*
Build by Wiquid's PCI Generator for TAO platform Free to use - http://www.wiquid.fr/depp/ent/
Copyright DEPP © 2018 - Ministère de l'éducation nationale 
 */
 
define([
    'taoQtiItem/qtiCreator/widgets/states/factory',
    'taoQtiItem/qtiCreator/widgets/interactions/customInteraction/states/states',
    'SnapForTao/creator/widget/states/Question'
], function(factory, states){
    'use strict';
    return factory.createBundle(states, arguments, ['answer', 'correct', 'map']);
});
