/*

Build by Wiquid's PCI Generator for TAO platform Free to use - http://www.wiquid.fr/depp/ent/
Copyright DEPP © 2018 - Ministère de l'éducation nationale  

 */

define([
    'lodash',
    'SnapForTao/creator/widget/Widget',
    'tpl!SnapForTao/creator/tpl/markup'
], function(_, Widget, markupTpl){
    'use strict';

    var _typeIdentifier = 'SnapForTao';

    var SnapForTaoCreator = {
        /**
         * (required) Get the typeIdentifier of the custom interaction
         * 
         * @returns {String}
         */
        getTypeIdentifier : function(){
            return _typeIdentifier;
        },
        /**
         * (required) Get the widget prototype
         * Used in the renderer
         * 
         * @returns {Object} Widget
         */
        getWidget : function(){
            return Widget;
        },
        /**
         * (optional) Get the default properties values of the pci.
         * Used on new pci instance creation
         * 
         * @returns {Object}
         */
        getDefaultProperties : function(pci){
            return {
                 panelSizer : "visible", scriptImporter : "shield", testLimiter : 0, snapScript : "shield"
            };
        },
        /**
         * (optional) Callback to execute on the 
         * Used on new pci instance creation
         * 
         * @returns {Object}
         */
        afterCreate : function(pci){
            //do some stuff
        },
        /**
         * (required) Gives the qti pci xml template 
         * 
         * @returns {function} handlebar template
         */
        getMarkupTemplate : function(){
            return markupTpl;
        },
        /**
         * (optional) Allows passing additional data to xml template
         * 
         * @returns {function} handlebar template
         */
        getMarkupData : function(pci, defaultData){
            defaultData.prompt = pci.data('prompt');
            return defaultData;
        }
    };

    //since we assume we are in a tao context, there is no use to expose the a global object for lib registration
    //all libs should be declared here
    return SnapForTaoCreator;
});

