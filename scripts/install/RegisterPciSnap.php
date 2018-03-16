<?php
/**
 * DEPP
 */
namespace oat\pciWiquid\scripts\install;
use oat\taoQtiItem\model\portableElement\action\RegisterPortableElement;
class RegisterPciSnap extends RegisterPortableElement
{
    protected function getSourceDirectory(){
        $viewDir = \common_ext_ExtensionsManager::singleton()->getExtensionById('pciWiquid')->getConstant('DIR_VIEWS');
        return $viewDir.implode(DIRECTORY_SEPARATOR, ['js', 'pciCreator', 'dev' ,'snap']);  
    }
}