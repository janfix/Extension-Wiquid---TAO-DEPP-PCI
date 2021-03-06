/*
Copyright DEPP © 2017 - Ministère de l'éducation nationale  
*/

define([
    'lodash',
    'delor/creator/widget/Widget',
    'tpl!delor/creator/tpl/markup'
], function(_, Widget, markupTpl){

    "use strict"; 

    var _typeIdentifier = 'delor';

    var delorCreator = {
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
            
        },
        /**
         * (optional) Callback to execute on the 
         * Used on new pci instance creation
         * 
         * @returns {Object}
         */
        afterCreate : function(pci){
           //TODO - fix me when more than one instance of such PCIs is implemented 
            $("div .delor").each(function(index, el) {
                if(this){
                   // Todo fix multiple instance of pci in the same item 
                   //alert("Cette animation ne peut être dupliquée dans le même item");  
                }         
            });
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

    return delorCreator;
});