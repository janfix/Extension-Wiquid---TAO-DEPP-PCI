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
use oat\taoQtiItem\model\portableElement\storage\PortableElementRegistry;

class Updater extends \common_ext_ExtensionUpdater
{
    /**
     * @param $initialVersion
     */
    public function update($initialVersion)
    {
        $this->setVersion('0.1.0');

        if ($this->isVersion('0.1.0')) {
            call_user_func(new RegisterPciDelor(), ['1.1.0']);
            $pciReigstry = PortableElementRegistry::getRegistry();
            $pciReigstry->removeAllVersions('relatem');
            $this->setVersion('1.0.0');
        }

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
    }
}