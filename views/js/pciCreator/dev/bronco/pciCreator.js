/*
Copyright DEPP © 2017 - Ministère de l'éducation nationale 
*/

define([
    'lodash',
    'bronco/creator/widget/Widget',
    'tpl!bronco/creator/tpl/markup'
], function(_, Widget, markupTpl){

    "use strict"; 

    var _typeIdentifier = 'bronco';

    var broncoCreator = {
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
            $("div .bronco").each(function(index, el) {
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

    return broncoCreator;
});