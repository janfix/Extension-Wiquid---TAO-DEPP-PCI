/*
<<<<<<< HEAD:views/js/pcicreator/dev/abeille/pciCreator.js
Copyright DEPP © 2017 - Ministère de l'éducation nationale  
*/

=======
Copyright DEPP © 2017 - Ministère de l'éducation nationale 
*/
>>>>>>> localdev:views/js/pciCreator/dev/Berthold/pciCreator.js
define([
    'lodash',
    'abeille/creator/widget/Widget',
    'tpl!abeille/creator/tpl/markup'
], function(_, Widget, markupTpl){

<<<<<<< HEAD:views/js/pcicreator/dev/abeille/pciCreator.js
    "use strict";

    var _typeIdentifier = 'abeille';
=======
    "use strict"; 

    var _typeIdentifier = 'Berthold';
>>>>>>> localdev:views/js/pciCreator/dev/Berthold/pciCreator.js

    var abeilleCreator = {
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
<<<<<<< HEAD:views/js/pcicreator/dev/abeille/pciCreator.js
            $("div .abeille").each(function(index, el) {
=======
            $("div .berthold").each(function(index, el) {
>>>>>>> localdev:views/js/pciCreator/dev/Berthold/pciCreator.js
                if(this){
                   $(".widget-box").remove();
                   $(".grid-row").remove();
                   alert("Cette animation ne peut être dupliquée dans le même item"); 
                }         
            });
<<<<<<< HEAD:views/js/pcicreator/dev/abeille/pciCreator.js
=======
            //do some stuff
>>>>>>> localdev:views/js/pciCreator/dev/Berthold/pciCreator.js
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

<<<<<<< HEAD:views/js/pcicreator/dev/abeille/pciCreator.js
    return abeilleCreator;
=======
    return BertholdCreator;
>>>>>>> localdev:views/js/pciCreator/dev/Berthold/pciCreator.js
});