
/*
Build by Wiquid's PCI Generator for TAO platform Free to use 
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

        var Scontainer = this.widget.$container,
            Sprompt = Scontainer.find('.prompt'),
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

        var Scontainer = this.widget.$container,
            Sprompt = Scontainer.find('.prompt');

        simpleEditor.destroy(Scontainer);
        containerEditor.destroy(Sprompt);
    });

     SnapForTaoStateQuestion.prototype.initForm = function(){

        var _widget = this.widget,
            Sform = _widget.$form,
            interaction = _widget.element,
            response = interaction.getResponseDeclaration(),
            level, 
            levels = ["Visible","Non-visible"], 
            levelData = {};
        //render the form using the form template
        Sform.html(formTpl({
            serial : response.serial,
           // levels : levelData,
            identifier : interaction.attr('responseIdentifier')
        }));

        //init form javascript
        formElement.initWidget(Sform);

        $(".bPanel").val(interaction.prop('blockPanelSizer'));
        $(".Attemptlimiter").val(interaction.prop('Attemptlimiter'));
        
        $(".snapScriptButton").click(function(event) {
          var stockString = $(".snapScript").val();
           interaction.prop('snapScriptSaver', stockString);
        });

        //init data change callbacks
        formElement.setChangeCallbacks(Sform, interaction, {

            blockPanelSizer : function blockPanelSizer(interaction, value){
                //update the pci property value:
                interaction.prop('blockPanelSizer', value);  
                var ArrValue = [];
                ArrValue.push(value);
                //trigger change event:
                interaction.triggerPci('blockPanelSizerChange', ArrValue);

            },
            Attemptlimiter : function Attemptlimiter(interaction, value){
                //update the pci property value:
                interaction.prop('Attemptlimiter', value);  
                var ArrValue = [];
                ArrValue.push(value);
                //trigger change event:
                interaction.triggerPci('AttemptlimiterChange', ArrValue);
            },
            snapScriptSaver : function snapScriptSaver(interaction, value){
                //update the pci property value:
                 var valor = [];
                 valor.push($(".snapScript").val());
                 interaction.prop('snapScriptSaver', "Valeur modifiée");
                //trigger change event:
                interaction.triggerPci('snapScriptSaverChange', valor);
            },

            identifier : function(i, value){
                response.id(value);
                interaction.attr('responseIdentifier', value);
            }
        });

    };

    return  SnapForTaoStateQuestion;
});
