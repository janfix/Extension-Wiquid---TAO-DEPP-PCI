/*
<<<<<<< HEAD:views/js/pcicreator/dev/abeille/creator/widget/states/Question.js
Copyright DEPP © 2017 - Ministère de l'éducation nationale  
=======
Copyright DEPP © 2017 - Ministère de l'éducation nationale 
>>>>>>> localdev:views/js/pciCreator/dev/Berthold/creator/widget/states/Question.js
*/

define([
    'taoQtiItem/qtiCreator/widgets/states/factory',
    'taoQtiItem/qtiCreator/widgets/interactions/states/Question',
    'taoQtiItem/qtiCreator/widgets/helpers/formElement',
    'taoQtiItem/qtiCreator/editor/simpleContentEditableElement',
    'taoQtiItem/qtiCreator/editor/containerEditor',
    'tpl!abeille/creator/tpl/propertiesForm',
    'lodash',
    'jquery'
], function(stateFactory, Question, formElement, simpleEditor, containerEditor, formTpl, _, $){

    "use strict";

<<<<<<< HEAD:views/js/pcicreator/dev/abeille/creator/widget/states/Question.js
    var abeilleStateQuestion = stateFactory.extend(Question, function(){
        
=======
    var BertholdInteractionStateQuestion = stateFactory.extend(Question, function(){
>>>>>>> localdev:views/js/pciCreator/dev/Berthold/creator/widget/states/Question.js

        var $container = this.widget.$container,
            $prompt = $container.find('.prompt'),
            interaction = this.widget.element;
            
            $container.find(".cmdpanel").hide();

        containerEditor.create($prompt, {
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
            $prompt = $container.find('.prompt');

        simpleEditor.destroy($container);
        containerEditor.destroy($prompt);
    });

<<<<<<< HEAD:views/js/pcicreator/dev/abeille/creator/widget/states/Question.js
    abeilleStateQuestion.prototype.initForm = function(){

        var _widget = this.widget,
            $form = _widget.$form,
            interaction = _widget.element,
            response = interaction.getResponseDeclaration();

        //render the form using the form template
        $form.html(formTpl({
            serial : response.serial,
            identifier : interaction.attr('responseIdentifier')
        }));

        //init form javascript
        formElement.initWidget($form);

        //init data change callbacks
        formElement.setChangeCallbacks($form, interaction, {
            identifier : function(i, value){
                response.id(value);
                interaction.attr('responseIdentifier', value);
            }
        });
=======
    BertholdInteractionStateQuestion.prototype.initForm = function(){
        var $container = this.widget.$container;

        $container.find(".cartes").hide();
>>>>>>> localdev:views/js/pciCreator/dev/Berthold/creator/widget/states/Question.js

    };

    return abeilleStateQuestion;
});
