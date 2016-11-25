define([
    'taoQtiItem/qtiCreator/widgets/states/factory',
    'taoQtiItem/qtiCreator/widgets/interactions/states/Question',
    'taoQtiItem/qtiCreator/widgets/helpers/formElement',
    'taoQtiItem/qtiCreator/editor/simpleContentEditableElement',
    'taoQtiItem/qtiCreator/editor/containerEditor',
    'tpl!cuisine/creator/tpl/propertiesForm',
    'lodash',
    'jquery'
], function(stateFactory, Question, formElement, simpleEditor, containerEditor, formTpl, _, $){

    var LikertInteractionStateQuestion = stateFactory.extend(Question, function(){ // Extension de l'objet stateFactory


        var $container = this.widget.$container,//Met à jour le container par ses propres modifications
            $prompt = $container.find('.prompt'), //Localise la classe .prompt et la met dans une variable
            interaction = this.widget.element;  // Définit le chemin this.widget.element dans une variable (simplifcation des chemins)

        containerEditor.create($prompt, { //Applique la methode de création du container editor
            change : function(text){ // Methode change activée sur le titre du Widget.Ici le text est la modification du titre, 
                interaction.data('prompt', text);//Elle est passée à interaction.data qui change prompt en lui attribuant la valeur text 
                interaction.updateMarkup();// Mise à jour du template Markup ! 
            },
            markup : interaction.markup, //  On est en dehors de la méthode change : rend prompt interactif ? 
            markupSelector : '.prompt',
            related : interaction
        });

        simpleEditor.create($container, '.likert-label-min', function(text){ // Creation par le CSS du label Min
            interaction.prop('label-min', text);
        });

        simpleEditor.create($container, '.likert-label-max', function(text){ // Création par le CSS du label Max
            interaction.prop('label-max', text);
        });

    }, function(){

        var $container = this.widget.$container,//Met à jour le container par ses propres modifications
            $prompt = $container.find('.prompt');//Localise la classe .prompt et la met dans une variable

        simpleEditor.destroy($container);//Suppression du container
        containerEditor.destroy($prompt);//Suppression du prompt (titre)
    });

    LikertInteractionStateQuestion.prototype.initForm = function(){ // Initialisation de Question - Widget
    // PARAMETRAGE DU SCALE VIA LE FORM DE LA SIDEBAR !     
        var _widget = this.widget,
            $form = _widget.$form,
            interaction = _widget.element,
            response = interaction.getResponseDeclaration(),
            level = parseInt(interaction.prop('level')) || 5,
            levels = [5, 7, 9],
            levelData = {};

        //build select option data for the template
        _.each(levels, function(lvl){ // la fonction lodash applique au tableau levels la fonction en lui passant lvl qui doit être le level du tableau (extrêment efficace)
            levelData[lvl] = {
                label : lvl,
                selected : (lvl === level)
            };
        });

        //render the form using the form template
        $form.html(formTpl({
            serial : response.serial,
            levels : levelData,
            identifier : interaction.attr('responseIdentifier')
        }));

        //init form javascript
        formElement.initWidget($form);

        //init data change callbacks
        formElement.setChangeCallbacks($form, interaction, {
            level : function(interaction, value){

                //update the pci property value:
                interaction.prop('level', value);
                
                //trigger change event:
                interaction.triggerPci('levelchange', [parseInt(value)]);
            },
            identifier : function(i, value){
                response.id(value);
                interaction.attr('responseIdentifier', value);
            }
        });

    };

    return LikertInteractionStateQuestion;
});
