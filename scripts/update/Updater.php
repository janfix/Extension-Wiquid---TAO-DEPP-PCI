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
 * Copyright (c) 2015 (original work) Open Assessment Technologies SA;
 *
 *
 */

namespace oat\pciWiquid\scripts\update;

use oat\pciWiquid\scripts\install\RegisterPciDelor;
use oat\pciWiquid\scripts\install\RegisterPciForcegravite;
use oat\pciWiquid\scripts\install\RegisterPciCuisine;
use oat\pciWiquid\scripts\install\RegisterPciTrain;
use oat\pciWiquid\scripts\install\RegisterPciNterre;
use oat\pciWiquid\scripts\install\RegisterPciMaraissalant;
use oat\pciWiquid\scripts\install\RegisterPciAbeille;
use oat\pciWiquid\scripts\install\RegisterPciBronco;
use oat\pciWiquid\scripts\install\RegisterPciRelatem;
use oat\pciWiquid\scripts\install\RegisterPciEffetdeserre;
use oat\pciWiquid\scripts\install\RegisterPciLampedouble;
use oat\pciWiquid\scripts\install\RegisterPciCircuit;
use oat\pciWiquid\scripts\install\RegisterPciBerthold;


class Updater extends \common_ext_ExtensionUpdater
{
    /**
     * @param $initialVersion
     */
    public function update($initialVersion)
    {
        
        if ($this->isVersion('1.13.1')) {
            call_user_func(new RegisterPciDelor(), ['1.1.1']);
            call_user_func(new RegisterPciForcegravite(), ['1.1.1']);
            call_user_func(new RegisterPciCuisine(), ['1.1.1']);
            call_user_func(new RegisterPciTrain(), ['1.1.1']);
            call_user_func(new RegisterPciNterre(), ['1.1.1']);
            call_user_func(new RegisterPciMaraissalant(), ['1.1.1']);
            call_user_func(new RegisterPciAbeille(), ['1.1.1']);
            call_user_func(new RegisterPciBronco(), ['1.1.1']);
            call_user_func(new RegisterPciRelatem(), ['1.1.1']);
            call_user_func(new RegisterPciEffetdeserre(), ['1.1.1']);
            call_user_func(new RegisterPciLampedouble(), ['1.1.1']);
            call_user_func(new RegisterPciCircuit(), ['1.1.1']);
            call_user_func(new RegisterPciBerthold (), ['1.1.1']);
            $this->setVersion('1.13.2');
        } 
    }
}