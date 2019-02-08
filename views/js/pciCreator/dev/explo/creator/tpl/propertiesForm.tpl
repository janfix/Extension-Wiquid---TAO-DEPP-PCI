
<div class="panel">
<label for="" class="has-icon" style="font-size: 1.2em; font-variant: small-caps;">{{__ "importer vos données"}}</label>
    <span class="icon-help tooltipstered" data-tooltip="~ .tooltip-content:first" data-tooltip-theme="info"></span>
    <div class="tooltip-content">{{__ "Rendez-vous sur le site : www.wiquid.fr/depp/explogen pour générer le fichier Json et personnaliser votre arborescence."}}</div>
    <p class="parag">Vous pouvez construire votre projet depuis le générateur : 
        <a href="http://www.wiquid.fr/depp/explogen" target="_blank"> Générateur de fichiers et répertoires</a>, produire un fichier JSON et l'importer ici.
         </p>
    <!-- <input type="file" name="scriptImporter" value="Importer une arborescence" class="scriptImporter btn-info small"> -->
<input type="file" name="jsonImport" value="Charger les données" class="jsonImport btn-info small" accept="application/JSON" >

<div>


<div class="panel" style="margin-top:25px">
    <label for="" class="has-icon">{{__ "Response identifier"}}</label>
    <span class="icon-help tooltipstered" data-tooltip="~ .tooltip-content:first" data-tooltip-theme="info"></span>
    <div class="tooltip-content">{{__ 'The identifier of the choice. This identifier must not be used by any other response or item variable. An identifier is a string of characters that must start with a Letter or an underscore ("_") and contain only Letters, underscores, hyphens ("-"), period (".", a.k.a. full-stop), Digits, CombiningChars and Extenders.'}}</div>

    <input type="text" 
           name="identifier" 
           value="{{identifier}}" 
           placeholder="e.g. RESPONSE" 
           data-validate="$notEmpty; $qtiIdentifier; $availableIdentifier(serial={{serial}});">
</div>
