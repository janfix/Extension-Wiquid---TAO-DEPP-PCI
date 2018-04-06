/*
Build by Wiquid's PCI Generator for TAO platform Free to use - http://www.wiquid.fr/depp/ent/
Copyright DEPP © 2018 - Ministère de l'éducation nationale 
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
            panelsizer, testLimiter, scriptImporter,
            psize = interaction.prop('panelSizer'),
            plimit = interaction.prop('testLimiter');

            
        //render the form using the form template
       $form.html(formTpl({
            serial : response.serial,
            identifier : interaction.attr('responseIdentifier')
        }));

        $container.find(".snapyOverlay").addClass("displayOverlay");

        //init form javascript
        formElement.initWidget($form); 
        
         $form.find(".panelSizer").val(psize).change();
         $form.find(".testLimiter").val(plimit).change();

         $form.find(".scriptImporter").on("click", function() {
           var value;
           interaction.prop('scriptImporter', value);
           interaction.triggerPci('scriptImporterChange', [value]);
        });

         interaction.onPci('scriptSaverChange', function(value){    
            interaction.prop('snapScript', value);            
         });

        //init data change callbacks
        formElement.setChangeCallbacks($form,interaction, {

            panelSizer : function panelSizer(interaction, value){
            interaction.prop('panelSizer', value);
            interaction.triggerPci('panelSizerChange', [value]);
            },

            testLimiter : function testLimiter(interaction, value){
            interaction.prop('testLimiter', value);
            interaction.triggerPci('testLimiterChange', [value]);
            },

            identifier : function(i, value){
            response.id(value);
            interaction.attr('responseIdentifier', value);
      
            }
        });

    };

    return  SnapForTaoStateQuestion;
});