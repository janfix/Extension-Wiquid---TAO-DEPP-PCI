/*
Copyright DEPP © 2017 - Ministère de l'éducation nationale 
*/

define(['qtiCustomInteractionContext', 'IMSGlobal/jquery_2_1_1', 'volcanisme/runtime/js/renderer', 'OAT/util/event'], function(qtiCustomInteractionContext, $, renderer, event){

    "use strict"; 

    var volcanisme = {
        id : -1,
        getTypeIdentifier : function getTypeIdentifier(){
            return 'volcanisme';
        },
        /**
         * Render the PCI : 
         * @param {String} id
         * @param {Node} dom
         * @param {Object} config - json
         */
        initialize : function initialize(id, dom, config, assetManager){

            event.addEventMgr(this);
            this.id = id;
            this.dom = dom;
            this.config = config || {};

            this.timeout = renderer.render(this.id, this.dom, this.config, assetManager);
            

            //tell the rendering engine that I am ready
            qtiCustomInteractionContext.notifyReady(this);

        },
        /**
         * Programmatically set the response following the json schema described in
         * http://www.imsglobal.org/assessment/pciv1p0cf/imsPCIv1p0cf.html#_Toc353965343
         * 
         * @param {Object} interaction
         * @param {Object} response
         */
        setResponse : function setResponse(response){

             var $container = $(this.dom),value;
        },
        /**
         * Get the response in the json format described in
         * http://www.imsglobal.org/assessment/pciv1p0cf/imsPCIv1p0cf.html#_Toc353965343
         * 
         * @param {Object} interaction
         * @returns {Object}
         */
        getResponse : function getResponse(){

            var $container = $(this.dom),
            value = "exp.p.fluide : "+ $container.find(".clickpfluide").text() +" -exp.p.compacte : " + $container.find(".clickpcompact").text() + " -anim cachet : " + $container.find(".clickcachet").text()  + " -Retour Init : " + $container.find(".clickreinit").text();

            return {base : {string : value}};
        },
        /**
         * Remove the current response set in the interaction
         * The state may not be restored at this point.
         * 
         * @param {Object} interaction
         */
        resetResponse : function resetResponse(){

            var $container = $(this.dom);

            $container.find('input').prop('checked', false);
        },
        /**
         * Reverse operation performed by render()
         * After this function is executed, only the inital naked markup remains 
         * Event listeners are removed and the state and the response are reset
         * 
         * @param {Object} interaction
         */
        destroy : function destroy(){

            var $container = $(this.dom);
            $container.off().empty();

            clearTimeout(this.timeout[0]);
            clearTimeout(this.timeout[1]); 
            
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

    qtiCustomInteractionContext.register(volcanisme);
});