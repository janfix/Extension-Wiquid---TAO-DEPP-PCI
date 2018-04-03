/*

Build by Wiquid's PCI Generator for TAO platform Free to use - http://www.wiquid.fr/depp/ent/
Copyright DEPP © 2018 - Ministère de l'éducation nationale 

*/

define(['qtiCustomInteractionContext', 'taoQtiItem/portableLib/jquery_2_1_1', 'SnapForTao/runtime/js/renderer', 'SnapForTao/runtime/js/lib/mod','taoQtiItem/portableLib/OAT/util/event', 'taoQtiItem/portableLib/lodash' ], function(qtiCustomInteractionContext, $, renderer, mod,event, _){
    'use strict';

    var SnapForTao = {
        id : -1,
        getTypeIdentifier : function getTypeIdentifier(){
            return 'SnapForTao';
        },
        /**
         * Render the PCI : 
         * @param {String} id
         * @param {Node} dom
         * @param {Object} config - json
         */
        initialize : function initialize(id, dom, config, assetManager){

            //add method on(), off() and trigger() to the current object
            event.addEventMgr(this);
            var customSnapContext = {};
            event.addEventMgr(customSnapContext);

            var _this = this;
            this.id = id;
            this.dom = dom;
            this.config = config || {};
            this.config.customSnapContext = customSnapContext;
            customSnapContext.on('rawDefinitionChange',function(value){
                //console.log(value);
                _this.trigger('scriptSaverChange', [value]);
            });

            renderer.render(this.id, this.dom, this.config, assetManager);

            //tell the rendering engine that I am ready
            qtiCustomInteractionContext.notifyReady(this);

            //listening to dynamic configuration change for 1.panelSizer 2.testLimiter 3.scriptImporter 4.snapScript
            this.on('panelSizerChange', function(level){
                _this.config.panelSizer = level;
                renderer.renderChoices(_this.id, _this.dom, _this.config);
                if(level == 'nonVisible'){
                    //console.log(_this.config); 
                    mod.snap.world.leftReducer(); 
                      
                }
                else{mod.snap.world.leftExpand();}
                
            });

            this.on('testLimiterChange', function(limiter){
                _this.config.testlimiter = limiter;
                renderer.renderChoices(_this.id, _this.dom, _this.config);
            });

            this.on('scriptImporterChange', function(){
                // La fonction importator renvoie la string xml.
                mod.snap.world.importator();
                renderer.renderChoices(_this.id, _this.dom, _this.config);

            });


        },
        /**
         * Programmatically set the response following the json schema described in
         * http://www.imsglobal.org/assessment/pciv1p0cf/imsPCIv1p0cf.html#_Toc353965343
         * 
         * @param {Object} interaction
         * @param {Object} response
         */
        setResponse : function setResponse(response){

            var Scontainer = $(this.dom),value;
        },
        /**
         * Get the response in the json format described in
         * http://www.imsglobal.org/assessment/pciv1p0cf/imsPCIv1p0cf.html#_Toc353965343
         * 
         * @param {Object} interaction
         * @returns {Object}
         */
        getResponse : function getResponse(){
           var elementCanvas = document.getElementsByClassName('world');
           var canvas = elementCanvas[0];
           var dataURL = canvas.toDataURL();
          

            var $container = $(this.dom),
                value = dataURL + $container.find(".compteur").html();// Check this

            return {base : {string : value}};
        },
        /**
         * Remove the current response set in the interaction
         * The state may not be restored at this point.
         * 
         * @param {Object} interaction
         */
        resetResponse : function resetResponse(){

            var Scontainer = $(this.dom);

        },
        /**
         * Reverse operation performed by render()
         * After this function is executed, only the inital naked markup remains 
         * Event listeners are removed and the state and the response are reset
         * 
         * @param {Object} interaction
         */
        destroy : function destroy(){

            var Scontainer = $(this.dom);
            Scontainer.off().empty();
        },
        /**
         * Restore the state of the interaction from the serializedState.
         * 
         * @param {Object} interaction
         * @param {Object} serializedState - json format
         */
        setSerializedState : function setSerializedState(state){

        },
        /**
         * Get the current state of the interaction as a string.
         * It enables saving the state for later usage.
         * 
         * @param {Object} interaction
         * @returns {Object} json format
         */
        getSerializedState : function getSerializedState(){

            return {};
        }
    };

    qtiCustomInteractionContext.register(SnapForTao);
});
