/*
Build by Wiquid's PCI Generator for TAO platform Free to use - http://www.wiquid.fr/depp/ent/

Copyright DEPP © 2018 - Ministère de l'éducation nationale 
Assets created by Wiquid - licence CC0 - free to use and modify. 
 */
define([
    'taoQtiItem/qtiCreator/widgets/states/factory',
    'taoQtiItem/qtiCreator/widgets/interactions/states/Question',
    'taoQtiItem/qtiCreator/widgets/helpers/formElement',
    'taoQtiItem/qtiCreator/editor/simpleContentEditableElement',
    'taoQtiItem/qtiCreator/editor/containerEditor',
    'tpl!SnapForTao/creator/tpl/propertiesForm',
    'lodash',
    'jquery'
], function(stateFactory, Question, formElement, simpleEditor, containerEditor, formTpl, _, $){
    'use strict';

    var SnapForTaoStateQuestion = stateFactory.extend(Question, function(){

        var $container = this.widget.$container,
            Sprompt = $container.find('.prompt'),
            interaction = this.widget.element;

        containerEditor.create(Sprompt, {
            change : function(text){
                interaction.data('prompt', text);
                interaction.updateMarkup();
            },
            markup : interaction.markup,
            markupSelector : '.prompt',
            related : interaction
        });

    }, function(){

        var $container = this.widget.$container,
            Sprompt = $container.find('.prompt');

        simpleEditor.destroy($container);
        containerEditor.destroy(Sprompt);
    });



     SnapForTaoStateQuestion.prototype.initForm = function(){

        var _widget = this.widget,
            $form = _widget.$form,
            $container = this.widget.$container,
            interaction = _widget.element,
            response = interaction.getResponseDeclaration(),
            panelsizer, testLimiter, scriptImporter;


        //render the form using the form template
       $form.html(formTpl({
            serial : response.serial,
            identifier : interaction.attr('responseIdentifier')
        }));

        //init form javascript
        formElement.initWidget($form); 

         $form.find(".scriptImporter").on("click", function() {
           var value;
           interaction.prop('scriptImporter', value);
           interaction.triggerPci('scriptImporterChange', [value]);
           //console.log(interaction);
        });

         interaction.onPci('scriptSaverChange', function(value){    
            interaction.prop('snapScript', value);
            //console.log(value);
         });

        //init data change callbacks
        formElement.setChangeCallbacks($form,interaction, {

            panelSizer : function panelSizer(interaction, value){
            interaction.prop('panelSizer', value);
            //console.log(value);
            interaction.triggerPci('panelSizerChange', [value]);
            },

            testLimiter : function testLimiter(interaction, value){
            interaction.prop('testLimiter', value);
            //console.log(value);
            interaction.triggerPci('testLimiterChange', [value]);
            },

            /*snapScript : function snapScript(interaction, value){         
            interaction.prop('snapScript', value);
            console.log(value);
            interaction.triggerPci('scriptSaverChange', [value]);
            },*/
                
            identifier : function(i, value){
            response.id(value);
            interaction.attr('responseIdentifier', value);
      
            }
        });

    };

    return  SnapForTaoStateQuestion;
});