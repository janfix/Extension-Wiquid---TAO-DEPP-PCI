/**
 * This program is free software; you can redistribute it and/or
 * modify it under the terms of the GNU General Public License
 * as published by the Free Software Foundation; under version 2
 * of the License (non-upgradable).
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program; if not, write to the Free Software
 * Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston, MA  02110-1301, USA.
 *
 * Copyright (c) 2016 (original work) Open Assessment Technologies;
 *
 */
define([
    'jquery',
    'lodash',
    'taoQtiItem/runner/qtiItemRunner',
    'taoQtiItem/portableElementRegistry/ciRegistry',
    'taoQtiItem/portableElementRegistry/provider/localManifestProvider',
<<<<<<< HEAD
    'json!pciWiquid/pciCreator/dev/Berthold/test/data/qti.json'
=======
    'json!pciWiquid/pciCreator/dev/abeille/test/data/qti.json'
>>>>>>> 0f81fb6da02f8d98c6a5acc5508ab6bf4f4691ad
], function ($, _, qtiItemRunner, ciRegistry, pciTestProvider, itemData){
    'use strict';


    var runner;



    //manually register the pci from its manifest
    pciTestProvider.addManifestPath(
<<<<<<< HEAD
        'Berthold',
        'pciWiquid/pciCreator/dev/Berthold/pciCreator.json');
    ciRegistry.resetProviders();
    ciRegistry.registerProvider(pciTestProvider.getModuleName());

    QUnit.module('Berthod');
=======
        'abeille',
        'pciWiquid/pciCreator/dev/abeille/pciCreator.json');
    ciRegistry.resetProviders();
    ciRegistry.registerProvider(pciTestProvider.getModuleName());

    QUnit.module('Abeille');
>>>>>>> 0f81fb6da02f8d98c6a5acc5508ab6bf4f4691ad

    QUnit.asyncTest('display and play', function (assert){

        var $container = $('#outside-container');
        console.log($container);
        assert.equal($container.length, 1, 'the item container exists');


        runner = qtiItemRunner('qti', itemData)
            .on('render', function (){
                    QUnit.start();
<<<<<<< HEAD
                    assert.equal($container.find('.berthold').length,1,'The container contains Berthold' );
=======
                    assert.equal($container.find('.abeille').length,1,'The container contains abeille' );
>>>>>>> 0f81fb6da02f8d98c6a5acc5508ab6bf4f4691ad
                    
            })
            .on('error', function (error){
                    $('#error-display').html(error);
            })
            .init()
            .render($container);
    });

});

