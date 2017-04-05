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

use oat\pciWiquid\scripts\install\RegisterPciLentilles;

class Updater extends \common_ext_ExtensionUpdater
{
    /**
     * @param $initialVersion
     */
    public function update($initialVersion)
    {
        $this->setVersion('1.0.0');

        if ($this->isVersion('1.0.0')) {
            call_user_func(new RegisterPciDelor(), ['1.1.0']);
            $this->setVersion('1.1.0');
        }

        if ($this->isVersion('1.1.0')) {
            call_user_func(new RegisterPciForcegravite(), ['1.1.0']);
            $this->setVersion('1.2.0');
        }

        if ($this->isVersion('1.2.0')) {
            call_user_func(new RegisterPciCuisine(), ['1.1.0']);
            $this->setVersion('1.3.0');
        }

        if ($this->isVersion('1.3.0')) {
            call_user_func(new RegisterPciTrain(), ['1.1.0']);
            $this->setVersion('1.4.0');
        }

        if ($this->isVersion('1.4.0')) {
            call_user_func(new RegisterPciNterre(), ['1.1.0']);
            $this->setVersion('1.5.0');
        }

        if ($this->isVersion('1.5.0')) {
            call_user_func(new RegisterPciMaraissalant(), ['1.1.0']);
            $this->setVersion('1.6.0');
        }

        if ($this->isVersion('1.6.0')) {
            call_user_func(new RegisterPciAbeille(), ['1.1.0']);
            $this->setVersion('1.7.0');
        }

        if ($this->isVersion('1.7.0')) {
            call_user_func(new RegisterPciBronco(), ['1.1.0']);
            $this->setVersion('1.8.0');
        }

        if ($this->isVersion('1.8.0')) {
            call_user_func(new RegisterPciRelatem(), ['1.1.0']);
            $this->setVersion('1.9.0');
        }

        if ($this->isVersion('1.9.0')) {
            call_user_func(new RegisterPciEffetdeserre(), ['1.1.0']);
            $this->setVersion('1.10.0');
        }

        if ($this->isVersion('1.10.0')) {
            call_user_func(new RegisterPciLampedouble(), ['1.1.0']);
            $this->setVersion('1.11.0');
        }

        if ($this->isVersion('1.11.0')) {
            call_user_func(new RegisterPciCircuit(), ['1.1.0']);
            $this->setVersion('1.12.0');
        }

        if ($this->isVersion('1.12.0')) {
            call_user_func(new RegisterPciBerthold (), ['1.1.0']);
            $this->setVersion('1.13.0');
        }

        $this->skip('1.13.0', '1.13.1');

        if ($this->isVersion('1.13.1')) {
            call_user_func(new RegisterPciLentilles(), ['1.1.0']);
            $this->setVersion('1.14.0');
        }
    }
}