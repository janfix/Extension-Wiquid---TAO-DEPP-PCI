
<div class="panel">
    <label for="panelSizer">{{__ "Panneau Outils Blocks"}}</label>
    <span class="icon-help tooltipstered" data-tooltip="~ .tooltip-content:first" data-tooltip-theme="info"></span>
    <span class="tooltip-content">{{__ "Faites disparaître les blocks et les catégories de blocks pour simplifier l'interface."}}</span>
    <select name="panelSizer" class="panelSizer select2" data-has-search="false">
        <option class="opt" value="visible"> Visible </option>
        <option class="opt" value="nonVisible">Non-visible</option>
    </select>
</div>
<div class="panel">  
    <label for="testLimiter">{{__ "Limiter le nombre d'essais"}}</label>
    <span class="icon-help tooltipstered" data-tooltip="~ .tooltip-content:first" data-tooltip-theme="info"></span>
    <span class="tooltip-content">{{__ "Activer le limiteur d'essai pour contraindre l'élève à résoudre la conception de son programme en deça d'un nombre maximum de test"}}</span>
    <select name="testLimiter" class="testLimiter select2" data-has-search="false">
        <option value="0" selected>Aucune limite</option>
        <option value="2">1 essai max</option>
        <option value="3">2 essais max</option>
        <option value="4">3 essais max</option>
        <option value="5">4 essais max</option>
        <option value="6">5 essais max</option>
    </select>
</div>
<hr>
<div class="panel">
  Importer un Projet :   
 <p class="parag">Attention on ne peut pas construire de projet dans l'éditeur de TAO. Construisez votre projet depuis <a href="http://snap.berkeley.edu/snapsource/snap.html" target="_blank"> une version de Snap en ligne</a> et exporter le, puis utilisez l'outil d'importation ci-dessous.  </p>
 <input type="button" name="scriptImporter" value="Importer un projet Snap" class="scriptImporter btn-info small"> <br>
 
<div>
  <hr>
</div>
<div class="panel">
    <label for="" class="has-icon">{{__ "Response identifier"}}</label>
    <span class="icon-help tooltipstered" data-tooltip="~ .tooltip-content:first" data-tooltip-theme="info"></span>
    <div class="tooltip-content">{{__ 'The identifier of the choice. This identifier must not be used by any other response or item variable. An identifier is a string of characters that must start with a Letter or an underscore ("_") and contain only Letters, underscores, hyphens ("-"), period (".", a.k.a. full-stop), Digits, CombiningChars and Extenders.'}}</div>

    <input type="text" 
           name="identifier" 
           value="{{identifier}}" 
           placeholder="e.g. RESPONSE" 
           data-validate="$notEmpty; $qtiIdentifier; $availableIdentifier(serial={{serial}});">
</div>
<hr>
<div class="panel">
  <p class="parag">Snap for TAO est une PCI conçue par la <a href="http://www.education.gouv.fr/pid25496/statistiques.html" target="blank">DEPP</a>  - Ministère de l'éducation nationale - France.</p>
  <p class="parag">Adaptation et réalisation de la PCI par <a href="http://www.wiquid.fr" target="blank">Wiquid.</a></p>
  <p class="parag">Snap est un projet développé par <a href="http://snap.berkeley.edu/" target="blank">l'Université de Berkeley (Californie)</a>.</p>
</div>
