/*
Copyright 2019 -  DEPP - Ministère de l'éducation nationale France.
Developer : Jean-Philippe Rivière - Wiquid
www.wiquid.fr

Conception : Jean-Philippe Rivière - Saskia Keskpaik (DEPP) - Thierry Rocher.
Code Review : Sam Sipasseuth from OAT.

The base development structure was build by Wiquid's PCI Generator for TAO platform Free to use : www.wiquid.fr/pcigen 
This project use open source libraries : jstree, datatable, font-awesome, jQuery, Bootstap
 */

define([
    'taoQtiItem/qtiCreator/widgets/states/factory',
    'taoQtiItem/qtiCreator/widgets/interactions/states/Question',
    'taoQtiItem/qtiCreator/widgets/helpers/formElement',
    'taoQtiItem/qtiCreator/editor/simpleContentEditableElement',
    'taoQtiItem/qtiCreator/editor/containerEditor',
    'tpl!explo/creator/tpl/propertiesForm',
    'lodash',
    'jquery'
], function(stateFactory, Question, formElement, simpleEditor, containerEditor, formTpl, _, $){
    'use strict';

    var exploStateQuestion = stateFactory.extend(Question, function(){

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

        simpleEditor.create(Scontainer, '.label-min', function(text){
            interaction.prop('label-min', text);
        });

        simpleEditor.create(Scontainer, '.label-max', function(text){
            interaction.prop('label-max', text);
        });

    }, function(){

        var Scontainer = this.widget.$container,
            Sprompt = Scontainer.find('.prompt');

        simpleEditor.destroy(Scontainer);
        containerEditor.destroy(Sprompt);
    });

     exploStateQuestion.prototype.initForm = function(){

        var _widget = this.widget,
            Sform = _widget.$form,
            interaction = _widget.element,
            response = interaction.getResponseDeclaration(),
            jsonpath = "http://www.wiquid.fr/depp/jpson/data.json";

        //render the form using the form template
        Sform.html(formTpl({
            serial : response.serial,
            jsonpath: jsonpath,
            identifier : interaction.attr('responseIdentifier')
        }));

        //init form javascript
        formElement.initWidget(Sform);

        Sform.find(".jsonImport").on("change", function (event) {
        var uploadedFile = event.target.files[0];
        if (uploadedFile) {
            var readFile = new FileReader();
            readFile.onload = function (e) {
                var contents = e.target.result;
                var json = JSON.parse(contents);
                interaction.prop('data', json); //
                interaction.triggerPci('jsonImporterChange', [json]);
            };
            readFile.readAsText(uploadedFile);
        } else {
            alert("Failed to load file");
        }

        });


        //init data change callbacks
        formElement.setChangeCallbacks(Sform, interaction, {
            jsonpath: function jsonpath(interaction, value) {

                //update the pci property value:
                interaction.prop('jsonpath', value);
                
                //trigger change event:
                interaction.triggerPci('jsonpathchange', [parseInt(value)]);
            },
            identifier : function(i, value){
                response.id(value);
                interaction.attr('responseIdentifier', value);
            }
        });

    };

    return  exploStateQuestion;
});
