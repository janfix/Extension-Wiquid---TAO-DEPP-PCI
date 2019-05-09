/*

Build by Wiquid's PCI Generator for TAO platform Free to use - http://www.wiquid.fr/depp/ent/
Copyright DEPP © 2018 - Ministère de l'éducation nationale 

*/

define(['qtiCustomInteractionContext', 'taoQtiItem/portableLib/jquery_2_1_1', 'SnapForTao/runtime/js/renderer', 'SnapForTao/runtime/js/lib/snapsrc','taoQtiItem/portableLib/OAT/util/event', 'taoQtiItem/portableLib/lodash' ], function(qtiCustomInteractionContext, $, renderer, snapsrc,event, _){
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
                _this.trigger('scriptSaverChange', [value]);

            });

            renderer.render(this.id, this.dom, this.config, assetManager);
            //tell the rendering engine that I am ready
            qtiCustomInteractionContext.notifyReady(this);

            //listening to dynamic configuration change for 1.panelSizer 2.testLimiter 3.scriptImporter 4.snapScript
            this.on('panelSizerChange', function(level){
                _this.config.panelSizer = level;
                renderer.renderSnap(_this.id, _this.dom, _this.config);
                if(level == 'nonVisible'){
                    snapsrc.snap.world.leftReducer();                       
                }
                else{snapsrc.snap.world.leftExpand();}
                
            });

            this.on('testLimiterChange', function(limiter){
                _this.config.testlimiter = limiter;
                renderer.renderSnap(_this.id, _this.dom, _this.config);
            });

            this.on('scriptImporterChange', function(){
                // Importator function open file explorer to find xml project.
                snapsrc.snap.world.importator();
                
                
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
           
        },
        /**
         * Get the response in the json format described in
         * http://www.imsglobal.org/assessment/pciv1p0cf/imsPCIv1p0cf.html#_Toc353965343
         * 
         * @param {Object} interaction
         * @returns {Object}
         */
        getResponse : function getResponse(){
            var $container = $(this.dom);
            var receiver, i, top, cleanblockTracker, cleanProcessus, countingString, canvas,dataURL,value ;
            var canvasArrLenght = $container.find(".world").length;

            canvasArrLenght = canvasArrLenght - 1;
            // Building Json format answer
            receiver = snapsrc.snap.world.children[0].stage.children;
            snapsrc.blockReporter = [];
            for (i = 0; i < receiver.length; i++) {
                if (typeof receiver[i].scripts != "undefined") {
                    top = receiver[i].scripts.children[0];
                    if (typeof top != "undefined") {
                        snapsrc.snap.world.children[0].stage.threads.startProcess(top, receiver[i]);
                    }
                }
            }
            cleanblockTracker = $container.find(".blockTracker").html();
            cleanProcessus = JSON.stringify(snapsrc.blockReporter);
            cleanProcessus = cleanProcessus.substring(0, cleanProcessus.length - 1);
            cleanProcessus = cleanProcessus.substring(1);
            cleanblockTracker = cleanblockTracker.substring(0, cleanblockTracker.length - 1);
            countingString = $container.find(".compteur").html();
            if (countingString !== "") {
                countingString = ","+ countingString + ",";
            } else {
                countingString = ","
            }
            canvas = $container.find(".world")[canvasArrLenght];
            dataURL = canvas.toDataURL();
                        
            value ='{ "actions": { '+ cleanblockTracker +'}, "processus":  '+ cleanProcessus + '  ' + countingString + '", snapImage": { "image": "' + dataURL + '" }, "keyLog": { "keys": "' + snapsrc.keyLog + '" } }'
            
            return { base: { string: value } };
        },
        /**
         * Remove the current response set in the interaction
         * The state may not be restored at this point.
         * 
         * @param {Object} interaction
         */
        resetResponse : function resetResponse(){
        
        },
        /**
         * Reverse operation performed by render()
         * After this function is executed, only the inital naked markup remains 
         * Event listeners are removed and the state and the response are reset
         * 
         * @param {Object} interaction
         */
        destroy : function destroy(config){
            var $container = $(this.dom);
            var receiver, i, top;
            
            $container.off().empty();
            receiver = snapsrc.snap.world.children[0].stage.children;
            for (i = 0; i < receiver.length; i++) {
                if (typeof receiver[i].scripts != "undefined") {
                    top = receiver[i].scripts.children[0];
                    if (typeof top != "undefined") {
                        //JP : stop the process after few seconds how long ?
                        setTimeout(function () {
                            snapsrc.snap.world.children[0].stage.threads.stopProcess(top, receiver[i]);
                        }, 3000);
                        // 
                    }
                }
            }
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
