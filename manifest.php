<?php
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
 * Copyright (c) 2015 (original work) Open Assessment Technologies;
 *
 *
 */
use oat\pciWiquid\scripts\install\RegisterPci;

return array(
    'name' => 'pciWiquid',
	'label' => 'QTI PCI SVT - Wiquid',
	'description' => '',
    'license' => 'GPL-2.0',
    'version' => '1.0.0',
	'author' => 'Jean-Philippe Riviere',
	'requires' => array(
	    'qtiItemPci' => '>=1.0.0',
	    'taoQtiItem' => '>=5.2.0'
    ),
	'managementRole' => 'http://www.tao.lu/Ontologies/generis.rdf#pciWiquidManager',
    'acl' => array(
        array('grant', 'http://www.tao.lu/Ontologies/generis.rdf#pciWiquidManager', array('ext'=>'pciWiquid')),
    ),
    'install' => array(
        'php'	=> array()
    ),
    'update' => 'oat\\pciWiquid\\scripts\\update\\Updater',
    'uninstall' => array(
    ),
    'autoload' => array (
        'psr-4' => array(
            'oat\\pciWiquid\\' => dirname(__FILE__).DIRECTORY_SEPARATOR
        )
    ),
    'routes' => array(
        '/pciWiquid' => 'oat\\pciWiquid\\controller'
    ),
	'constants' => array(
	    # views directory
	    "DIR_VIEWS" => dirname(__FILE__).DIRECTORY_SEPARATOR."views".DIRECTORY_SEPARATOR,

		#BASE URL (usually the domain root)
		'BASE_URL' => ROOT_URL.'pciWiquid/',

	    #BASE WWW required by JS
	    'BASE_WWW' => ROOT_URL.'pciWiquid/views/'
	)
);