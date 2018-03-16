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
 * Copyright (c) 2016 (original work) Open Assessment Technologies SA;
 *
 * */

namespace oat\pciWiquid\scripts\install;

use common_ext_action_InstallAction;
use oat\oatbox\service\ServiceManager;
use oat\taoQtiItem\model\portableElement\exception\PortableElementVersionIncompatibilityException;
use oat\taoQtiItem\model\portableElement\PortableElementService;

class RegisterPci extends common_ext_action_InstallAction
{
    public function __invoke($params)
    {
        $service = new PortableElementService();
        $service->setServiceLocator(ServiceManager::getServiceManager());

        $viewDir = \common_ext_ExtensionsManager::singleton()->getExtensionById('pciWiquid')->getConstant('DIR_VIEWS');

        try {
            $sourceCuisine = $viewDir.implode(DIRECTORY_SEPARATOR, ['js', 'pciCreator', 'dev', 'cuisine']);
            $sourceEffetDeSerre =  $viewDir.implode(DIRECTORY_SEPARATOR, ['js', 'pciCreator', 'dev', 'effetdeserre']);
            $sourceBronco =  $viewDir.implode(DIRECTORY_SEPARATOR, ['js', 'pciCreator', 'dev', 'bronco']);
            $sourceCircuit =  $viewDir.implode(DIRECTORY_SEPARATOR, ['js', 'pciCreator', 'dev', 'circuit']);
            $sourceDelor = $viewDir.implode(DIRECTORY_SEPARATOR, ['js', 'pciCreator', 'dev', 'delor']);
            $sourceForcegravite = $viewDir.implode(DIRECTORY_SEPARATOR, ['js', 'pciCreator', 'dev', 'forcegravite']);
            $sourceMaraissalant = $viewDir.implode(DIRECTORY_SEPARATOR, ['js', 'pciCreator', 'dev', 'maraissalant']);
            $sourceNterre = $viewDir.implode(DIRECTORY_SEPARATOR, ['js', 'pciCreator', 'dev', 'nterre']);
            $sourceRelatem = $viewDir.implode(DIRECTORY_SEPARATOR, ['js', 'pciCreator', 'dev', 'relatem']);
            $sourceTrain = $viewDir.implode(DIRECTORY_SEPARATOR, ['js', 'pciCreator', 'dev', 'train']);
            $sourceAbeille = $viewDir.implode(DIRECTORY_SEPARATOR, ['js', 'pciCreator', 'dev', 'abeille']);            
            $sourceBerthold = $viewDir.implode(DIRECTORY_SEPARATOR, ['js', 'pciCreator', 'dev', 'Berthold']);
            $sourceLentilles = $viewDir.implode(DIRECTORY_SEPARATOR, ['js', 'pciCreator', 'dev', 'lentilles']);
            $sourceVolcanisme = $viewDir.implode(DIRECTORY_SEPARATOR, ['js', 'pciCreator', 'dev', 'volcanisme']);
            $sourceLampedouble = $viewDir.implode(DIRECTORY_SEPARATOR, ['js', 'pciCreator', 'dev', 'lampedouble']);
            $snap = $viewDir.implode(DIRECTORY_SEPARATOR, ['js', 'pciCreator', 'dev', 'snap']);
            $service->registerFromDirectorySource($sourceCuisine);
            $service->registerFromDirectorySource($sourceEffetDeSerre);
            $service->registerFromDirectorySource($sourceBronco);
            $service->registerFromDirectorySource($sourceCircuit);
            $service->registerFromDirectorySource($sourceDelor);
            $service->registerFromDirectorySource($sourceForcegravite);
            $service->registerFromDirectorySource($sourceMaraissalant);
            $service->registerFromDirectorySource($sourceNterre);
            $service->registerFromDirectorySource($sourceRelatem);
            $service->registerFromDirectorySource($sourceTrain);
            $service->registerFromDirectorySource($sourceAbeille);
            $service->registerFromDirectorySource($sourceBerthold);
            $service->registerFromDirectorySource($sourceLentilles);
            $service->registerFromDirectorySource($sourceVolcanisme);
            $service->registerFromDirectorySource($sourceLampedouble);
            $service->registerFromDirectorySource($snap);



        } catch (PortableElementVersionIncompatibilityException $e) {
            \common_Logger::i($e->getMessage());
        }



        return new \common_report_Report(\common_report_Report::TYPE_SUCCESS, 'Portable Element Plugins for Qti Creator added to Tao Qti Item extension');
    }
}
