/*
Copyright 2019 -  DEPP - Ministère de l'éducation nationale France.
Developer : Jean-Philippe Rivière - Wiquid
www.wiquid.fr

Conception : Jean-Philippe Rivière - Saskia Keskpaik (DEPP) - Thierry Rocher.
Code Review : Sam Sipasseuth from OAT.

The base development structure was build by Wiquid's PCI Generator for TAO platform Free to use : www.wiquid.fr/pcigen 
This project use open source libraries : jstree, datatable, font-awesome, jQuery, Bootstap
 */

define(['explo/runtime/js/defaultConfig',
        'explo/runtime/js/lib/datatables', // Contains and extends JQuery
        'taoQtiItem/portableLib/OAT/util/html'
    ],
     function (defaultjson, $,
         html) {
         'use strict';


         /** 
          * renderExplo function is the main function to render Explorer in Tao context.
          * @param {object} mapFile - Json for file info.
          * @param {object} treeFolder - Json for Folders.
          * @param {object} $fileList - Instance of DataTable.
          * @param {array} DDFile - folder array for multiselection drag and drop.
          * @param {array} DDFolder - folder array for multiselection drag and drop.
          * @param {array} SelectedArr - arrays for MultiSelection.
          * @param {array} clipBoard - array for Cut/copy/paste clipboard.
          * @param {array} bin - array for trash.
          * @param {string} eventCollector - for the student answer.
          **/
         function renderExplo(id, $container, config, assetManager) {
             var mapFile, treeFolder, $fileList, DDFile = [],
                 $tree,
                 DDFolder = [],
                 SelectedArr = [],
                 clipBoard = [],
                 bin = [],
                 eventCollector = [],
                 WbranchSize, incrementor = 1,
                 destiTarget, // Stock target for drag and drop only on jstree  
                 searchResultArr = [],
                 onlyOne,
                 shortCutList;
             var menuTop = '<div class="container-fluid"> <div class="navbar-header"> <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar"> <span class="sr-only">Toggle navigation</span> <span class="icon-bar"></span> <span class="icon-bar"></span> <span class="icon-bar"></span> </button> </div> <div class="navbar-collapse collapse"> <ul class="nav navbar-nav"> <li class="active"> <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Fichier <span class="caret"></span> </a> <ul class="dropdown-menu"> <li> <a href="#" class="formater">Formater lecteur</a> </li>  <!-- <li> <a href="#">Gestion Espace</a> </li> --> </ul> </li> <li> <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Affichage <span class="caret"></span> </a> <ul class="dropdown-menu"> <!-- <li> <a href="#">Grandes icônes</a> </li> <li> <a href="#">Petites icônes</a> </li> --> <li> <a href="#">Détails</a> </li> <!-- <li> <a href="#">Afficher les fichiers cachés</a> </li> --> </ul> </li> <li> <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Navigation <span class="caret"></span> </a> <ul class="dropdown-menu"> <li> <a href="#">Réseau</a> </li> <!-- <li> <a href="#">Ajouter un accès rapide</a> </li> <li> <a href="#">Prévisualiser</a> </li> --> </ul> </li> </ul> </div> <!--/.nav-collapse --> </div> <!--/.container-fluid -->';

             var pathLine = '<div class="preIconPath"></div> <div class="pathLine">Loading...</div><div title="cliquez pour lancer la recherche" class="magnify"></div><input class="searchInput" type="text" placeholder="Rechercher fichier ou dossier"> ';

             $container.find(".prompt").hide();
             $container.find(".navbar").html(menuTop);
             $container.find(".path").html(pathLine);

             /** Default Json data Loader  - build a default tree in Editor.*/

             if (config.data == "") {
                 mapFile = defaultjson.mapFile;
                 treeFolder = defaultjson.treeFolder;
                 runTree();
                 tableDisplayer();
             } else {
                 mapFile = config.data.mapFile;
                 treeFolder = config.data.treeFolder;
                 runTree();
                 $tree.jstree().destroy();
                 $container.find('.tree').html('<div class="jstree "></div>')
                 runTree();
                 tableDisplayer();
                 $fileList.destroy();
                 $container.find('.dirContent').remove();
                 $container.find('.fileList').html('<table class="table dirContent"></table>')
                 tableDisplayer();
             }

             /** Collect event for TAO answering system - 
              * @param {string} evName - Event name
              * @param {obj} var1 object of event
              * @param {obj} var2 location of object
              *Build the event string 
              */
             function evCollector(evName, var1, var2) {
                 var evString = "{" + evName + ":{" + var1 + "," + var2 + "} }";
                 eventCollector.push(evString);
                 $container.find(".dataActions").html(eventCollector.join(","));
             }

             /** Install the tree based on jstree 
              * - fill in data from the object 'treefolder'
              * - control event by checking callback
              * - Elements that could not be written by drop : cf.noMove
              * @param {array} noMove : list of impossible destinations for drop -> tree to tree
              * - add jstree plugins
              * - define dnd plugin
              * - define types of folders
              * - listen node modification for tracking system
              */
             function runTree() {
                 var noMove = ["cdRom", "root", "netWork", "#"],
                     writable = true,
                     i, evName;
                 $tree = $container.find('.jstree');
                 $tree.jstree({
                     core: {
                         'data': function getData() {
                             return treeFolder
                         },
                         "check_callback": function (operation, node, node_parent, node_position, more) { //It is forbidden to copy folders at thess levels
                             if (operation == 'move_node') {
                                 for (i = 0; i < noMove.length; i++) {
                                     if (noMove.indexOf(node_parent.type) < 0 || noMove.indexOf(node_parent.id) < 0) {
                                         $tree.jstree(true).deselect_all();
                                         writable = true;
                                         return writable;
                                     } else {
                                         writable = false;
                                     }
                                 }
                                 return writable;
                             }
                             if (operation == 'copy_node') {
                                 return false;
                             }
                         }
                     },
                     plugins: ["contextmenu", "types", "dnd", "state", "unique", "wholerow"],
                     'contextmenu': {
                         'items': customMenu
                     },
                     dnd: {
                         "is_draggable": function (node) {
                             if (node[0].type == "default") {
                                 evName = "Drag du répertoire depuis l'arborescence ";
                                 evCollector(evName, "-", "-");
                                 return true; // Controle draggable here --- flip switch here.
                             } else {
                                 return false;
                             }
                         }
                         //check_while_dragging: true 
                     },
                     types: {
                         "bin": {
                             "icon": "jstree-bin" //use sprite via CSS class
                         },
                         "volume": {
                             "icon": "jstree-hdrive"
                         },
                         "cdRom": {
                             "icon": "jstree-CDrom"
                         },
                         "netWork": {
                             "icon": "jstree-network"
                         },
                         "sdCard": {
                             "icon": "jstree-sdCard"
                         },
                         "usb": {
                             "icon": "jstree-usb"
                         },
                         "distant": {
                             "icon": "jstree-distant"
                         },
                         'root': {
                             "icon": "jstree-root"
                         }
                     }
                 }).bind("move_node.jstree", function (e, data) {
                     destiTarget = data.parent;
                     evName = "Déplacement de répertoire ";
                     evCollector(evName, getDirName(data.node.id), getDirName(data.parent));
                 });

                 $tree.jstree(true).settings.core.data = treeFolder;

                 $tree.jstree(true).refresh();

                 /**Listen to drop in jstree specific mvt. 
                  * @param {obj} activDir : is the activ node build by Jstree - This name will be used frequently in code !
                  */
                 $container.find(".explo").on("dnd_stop.vakata", function (e, data) {
                     var activDir, i, y;
                     for (i = 0; i < treeFolder.length; i++) {
                         for (y = 0; y < data.data.nodes.length; y++) {
                             if (treeFolder[i].id == data.data.nodes[y]) {
                                 treeFolder[i].parent = destiTarget;
                                 activDir = $tree.jstree(true).get_selected();
                                 $tree.jstree(true).select_node(activDir);
                                 $tree.jstree(true).open_node(activDir);
                                 displayDirContent(activDir);
                                 dataFolder();
                             }
                         }
                     }
                 });
             }
             /**
              * The customMenu function structure the specific jstree context menu
              * Seven types of menu are build depending of the node type.
              * all actions call a command function
              * The icon system is based on font-awesome
              */
             function customMenu(node) {
                 var items;
                 if ($tree.jstree("get_selected", true)[0].type == "volume") {
                     items = {
                         createDir: {
                             label: "Nouveau répertoire",
                             action: function (obj) {
                                 commandNewFolder();
                             },
                             icon: "fa fa-folder"
                         },
                         collerDir: {
                             label: "Coller",
                             action: function (obj) {
                                 commandPaste();
                             },
                             icon: "fa fa-plus-square"
                         },
                         formatVol: {
                             label: "Formater...",
                             action: function (obj) {
                                 var selectedNodeId = $tree.jstree("get_selected", true);
                                 formater(selectedNodeId[0].text, selectedNodeId[0].id);

                             }
                         },
                         propertiesDir: {
                             label: "Propriétés",
                             action: function (obj) {
                                 var selectedNode = $tree.jstree("get_selected", true);
                                 commandProperties(selectedNode);
                             },
                             icon: "fa fa-cog"
                         }
                     }
                     return items;

                 } else if ($tree.jstree("get_selected", true)[0].type == "root") {
                     items = {
                         propertiesDir: {
                             label: "Propriétés",
                             action: function (obj) {
                                 var selectedNode = $tree.jstree("get_selected", true);
                                 commandProperties(selectedNode);
                             },
                             icon: "fa fa-cog"
                         }
                     }
                     return items;
                 } else if ($tree.jstree("get_selected", true)[0].type == "usb" || $tree.jstree("get_selected", true)[0].type == "sdCard") {
                     items = {
                         createDir: {
                             label: "Nouveau répertoire",
                             action: function (obj) {
                                 commandNewFolder();
                             },
                             icon: "fa fa-folder"
                         },
                         collerDir: {
                             label: "Coller",
                             action: function (obj) {
                                 commandPaste();
                             },
                             icon: "fa fa-plus-square"
                         },
                         formatVol: {
                             label: "Formater...",
                             action: function (obj) {
                                 var selectedNodeId = $tree.jstree("get_selected", true);
                                 formater(selectedNodeId[0].text, selectedNodeId[0].id);
                             }
                         },
                         propertiesDir: {
                             label: "Propriétés",
                             action: function (obj) {
                                 var selectedNode = $tree.jstree("get_selected", true);
                                 commandProperties(selectedNode);
                             },
                             icon: "fa fa-cog"
                         }
                     }
                     return items;

                 } else if ($tree.jstree("get_selected", true)[0].type == "cdRom") {
                     items = {
                         propertiesDir: {
                             label: "Propriétés",
                             action: function (obj) {
                                 var selectedNode = $tree.jstree("get_selected", true);
                                 commandProperties(selectedNode);
                             },
                             icon: "fa fa-cog"
                         }
                     }
                     return items;
                 } else if ($tree.jstree("get_selected", true)[0].type == "bin") {
                     items = {
                         emptyBin: {
                             label: "Vider la corbeille",
                             action: function (obj) {
                                 commandEmptyTrash();
                             },
                             icon: "fa fa-recycle"
                         }
                     }
                     return items;
                 } else if ($tree.jstree("get_selected", true)[0].type == "netWork") {

                 } else {
                     items = {
                         createDir: {
                             label: "Nouveau répertoire",
                             action: function (obj) {
                                 commandNewFolder();
                             },
                             icon: "fa fa-folder"
                         },
                         renameDir: {
                             label: "Renommer",
                             action: function (obj) {
                                 var SelectedArr = $tree.jstree("get_selected", true);
                                 if (SelectedArr.length > 1) {
                                     alert("Attention plusieurs éléments ont été sélectionnés");
                                 } else if (!SelectedArr.length) {
                                     alert("Attention aucun élément n'est sélectionné");
                                 } else {
                                     var selectedNodeId = $tree.jstree("get_selected", true)[0].id;
                                     var selectedNodeName = $tree.jstree("get_selected", true)[0].text;
                                     commandRename(selectedNodeId, selectedNodeName);
                                 }
                             },
                             icon: "fa fa-cog"
                         },
                         copierDir: {
                             label: "Copier",
                             action: function (obj) {
                                 var selectedNodeId = $tree.jstree("get_selected", true)[0].id;
                                 commandCopy(selectedNodeId);
                             },
                             icon: "fa fa-clipboard"
                         },
                         couperDir: {
                             label: "Couper",
                             action: function (obj) {
                                 var selectedNodeId = $tree.jstree("get_selected", true)[0].id;
                                 commandCut(selectedNodeId);
                             },
                             icon: "fa fa-scissors"
                         },
                         collerDir: {
                             label: "Coller",
                             action: function (obj) {
                                 commandPaste();
                             },
                             icon: "fa fa-plus-square"
                         },
                         deleteDir: {
                             label: "Effacer",
                             action: function (obj) {
                                 var selectedNodeId = $tree.jstree("get_selected");
                                 commandTrash(selectedNodeId);
                             },
                             icon: "fa fa-trash"
                         },
                         propsDir: {
                             label: "Propriétés",
                             action: function (obj) {
                                 var selectedNode = $tree.jstree("get_selected", true);
                                 commandProperties(selectedNode);
                             },
                             icon: "fa fa-cog"
                         }
                     }
                     return items;

                 }
             }


             //******************************************** Building File/Dir list -  dataTable Chapter *****************************************************            
             /**
              * tableDisplayer function display the data depending of the node chosen in the tree
              * @param {object} $fileList is build by Datatable 
              */
             function tableDisplayer() {
                 $fileList = $container.find('.dirContent').DataTable({
                     "language": {
                         "emptyTable": "Aucun fichier dans ce répertoire."
                     },
                     "destroy": true,
                     "select": true,
                     "paging": false,
                     "ordering": true,
                     "info": false,
                     "searching": false,
                     "columnDefs": [{
                         "defaultContent": "-",
                         "targets": "_all"
                     }],
                     "columns": [{
                             title: "fileId",
                             "visible": false
                         },
                         {
                             title: "Nom",
                             width: "180px"
                         },
                         {
                             title: "Date de Modification",
                             width: "100px"
                         },
                         {
                             title: "Type",
                             width: "160px"
                         },
                         {
                             title: "Taille",
                             width: "80px",
                             className: 'dt-body-right'
                         },
                         {
                             title: "Date de Création",
                             width: "100px",
                             className: 'dt-body-right'
                         },
                         {
                             title: "Chemin",
                             width: "350px",
                             visible: true

                         },
                     ]
                 });


                 //*******************Listening to DataTables elements*******************/
                 /**Listening to DataTables elements - show selected row*/
                 $container.find(".dirContent tbody").on('mouseenter', 'tr', function () {
                     $container.find(this).addClass('highlight');
                 });
                 $container.find(".dirContent tbody").on('mouseleave', 'tr', function () {
                     $container.find(this).removeClass('highlight');
                 });

                 /**Listening list directories for browsing */
                 $container.find('.dirContent tbody').on('dblclick', 'tr', function (e) {
                     var evName, saveSelectDir, targetName, targetPlace;

                     $container.find('.ctxMenu').css("display", "none");

                     if ($fileList.row(this).data()[3] == "Répertoire" ||
                         $fileList.row(this).data()[3] == "Volume" ||
                         $fileList.row(this).data()[3] == "Mémoire Flash" ||
                         $fileList.row(this).data()[3] == "Mémoire Flash usb" ||
                         $fileList.row(this).data()[3] == "Lecteur Optique CD"
                     ) {
                         saveSelectDir = $fileList.row(this).data()[0];
                         $tree.jstree('deselect_all');
                         $tree.jstree('select_node', saveSelectDir);

                         evName = "Double Clic dans liste- ouverture de ";
                         evCollector(evName, getDirName(saveSelectDir), "-");

                         displayDirContent(saveSelectDir);
                     } else {
                         targetName = $(e.currentTarget).find(".elementNameExt")[0].innerText;
                         targetPlace = $tree.jstree(true).get_selected();
                         fileCall(targetName, targetPlace);
                         evName = "Double Clic - ouverture de fichier";
                         evCollector(evName, targetName, getDirName(targetPlace));
                     }
                 });

             }
             //***********************JSTree : UI ***********************************/
             /**Open folder with one Click instead of doubleClick */
             $tree.bind("select_node.jstree", function (e, data) {
                 return data.instance.toggle_node(data.node);
             });
             //*********************Tree Listening changes**************************/
             $tree.on("changed.jstree", function (e, data) {

                 $container.find('.ctxMenu').css("display", "none");

                 $container.find(".jstree-node").on('dragover', function (event) {
                     event.preventDefault();
                     event.stopPropagation();
                     $container.find(this).addClass('dragging');
                 });

                 $container.find(".jstree-node").on('drop', function (event) {
                     event.preventDefault();
                     event.stopPropagation();
                     drop(event);
                 });

                 displayDirContent(data.selected);
             });

             //********************************************************************/
             /** Constitution of ShortCutList ! */
             for (var i = 0; i < treeFolder.length; i++) {
                 // Items from ID : unique -> TODO in exploGen (in this version the shorcut list is build on a default model. The user can't build it - )
                 if (treeFolder[i].id == "vol1") {
                     $container.find(".listItemRapid").html('<li class="rapidLi vol1"><div class="icoHdrive icoRacc"></div><div class="raccVolC">' + treeFolder[i].text + '</div></li>');
                 };
                 if (treeFolder[i].id == "images") {
                     $container.find(".listItemRapid").prepend('<li class = "rapidLi images "><div class="icoPic icoRacc"></div><div class="raccVolC">' + treeFolder[i].text + '</div></li>');
                 };
                 if (treeFolder[i].id == "videos") {
                     $container.find(".listItemRapid").prepend('<li class="rapidLi videos "><div class="icoVideo icoRacc"></div><div class="raccVolC">' + treeFolder[i].text + '</div></li>');
                 };
                 if (treeFolder[i].id == "documents") {
                     $container.find(".listItemRapid").prepend('<li class="rapidLi documents "><div class="icoDocument icoRacc"></div><div class="raccVolC">' + treeFolder[i].text + '</div></li>');
                 };
                 if (treeFolder[i].id == "downloads") {
                     $container.find(".listItemRapid").prepend('<li class="rapidLi downloads "><div class="icoDownload icoRacc"></div><div class="raccVolC">' + treeFolder[i].text + '</div></li>');
                 };
             }


             /**listening shortCuts click */
             $container.find(".images").on('click', function () {
                 $tree.jstree('deselect_all');
                 $tree.jstree('select_node', 'images');
                 displayDirContent('images');
             });

             $container.find(".videos").on('click', function () {
                 $tree.jstree('deselect_all');
                 $tree.jstree('select_node', 'videos');
                 displayDirContent('videos');
             });

             $container.find(".documents").on('click', function () {
                 $tree.jstree('deselect_all');
                 $tree.jstree('select_node', 'documents');
                 displayDirContent('documents');
             });

             $container.find(".downloads").on('click', function () {
                 $tree.jstree('deselect_all');
                 $tree.jstree('select_node', 'downloads');
                 displayDirContent('downloads');
             });

             $container.find(".vol1").on('click', function () {
                 $tree.jstree('deselect_all');
                 $tree.jstree('select_node', 'vol1');
                 displayDirContent('vol1');
             });


             /**SlideToggle of Quick access link */
             $container.find(".accesRapide").addClass('fa fa-angle-down');
             $container.find(".QuickTitle").click(function () {
                 $container.find(".listItemRapid").slideToggle();
             });


             //****************Display Folder Content****************************** 
             /**
              * Display Folder Content based on activ directory 
              *  @param {string} activDir : the node name
              *  @var {array} dirData : get list of children folders for the activ directory as a jstree node object 
              *  @var {string} exto : file extension build dot+extension : example : ".pdf"
              * */
             function displayDirContent(activDir) {
                 var dirData = $tree.jstree("get_children_dom", activDir);
                 var exto, iconExt, labelExt, fileId, dataMod, dataCreat, orginalPath; // for files only

                 for (var i = 0; i < treeFolder.length; i++) {
                     if (treeFolder[i].parent == activDir) {};
                 }

                 function pathDisplay(dirActiv) {
                     var pathArray = $tree.jstree("get_path", dirActiv);
                     var pathIdArray = $tree.jstree("get_path", dirActiv, '/', true);
                     var pathStrg = "";

                     if (pathIdArray) {
                         pathIdArray = pathIdArray.split("/");
                     }

                     for (var i = 0; i < pathArray.length; i++) {
                         var element = pathArray[i];
                         pathStrg = pathStrg + '/ <a href="#" class="pathElement" name = "' + pathIdArray[i] + '">' + element + '</a>';
                     }
                     $container.find(".pathLine").html(pathStrg);
                     $container.find(".pathElement").click(function () {
                         var nodeId = $container.find(this).attr('name');
                         $tree.jstree("deselect_all");
                         $tree.jstree('select_node', nodeId);
                         displayDirContent(nodeId); //Recursiv call with clicked folder
                         $tree.jstree('open_node', nodeId);
                     });
                 }

                 pathDisplay(activDir);

                 /**Table Reset */
                 $fileList
                     .clear()
                     .draw();

                 /**Select type to display the right tables structure */
                 if ($tree.jstree("get_selected", true)[0]) {

                     if ($tree.jstree("get_selected", true)[0].type == 'root') {
                         volumeDisplayer();
                         $fileList.column(1).header().innerText = "Lecteurs";
                         $fileList.column(3).header().innerText = "Description";
                         $fileList.column(4).header().innerText = "Capacités";
                         $fileList.column(5).header().innerText = "Espace libre";
                         $fileList.column(6).visible(false, false);
                         $fileList.column(2).visible(true, false);
                         $fileList.column(5).visible(true, false);

                     } else if ($tree.jstree("get_selected", true)[0].type == 'bin') {
                         folderDisplayer();
                         $fileList.column(1).header().innerText = "Nom";
                         $fileList.column(2).header().innerText = "Date de suppression";
                         $fileList.column(6).visible(false, false);
                         $fileList.column(2).visible(true, false);
                         $fileList.column(5).visible(true, false);


                     } else if ($tree.jstree("get_selected", true)[0].type == 'netWork') {
                         folderDisplayer();
                         $fileList.column(6).visible(false, false);
                         $fileList.column(2).visible(true, false);
                         $fileList.column(5).visible(true, false);

                     } else if ($tree.jstree("get_selected", true)[0].id == 'searchResult') {
                         folderDisplayer();
                         $fileList.column(1).header().innerText = "Nom";
                         $fileList.column(2).header().innerText = "Date de Modification";
                         $fileList.column(3).header().innerText = "Type";
                         $fileList.column(4).header().innerText = "Taille";
                         $fileList.column(2).visible(false, false);
                         $fileList.column(5).visible(false, false);
                         $fileList.column(6).visible(true, false);


                     } else {
                         folderDisplayer();
                         $fileList.column(1).header().innerText = "Nom";
                         $fileList.column(2).header().innerText = "Date de Modification";
                         $fileList.column(3).header().innerText = "Type";
                         $fileList.column(4).header().innerText = "Taille";
                         $fileList.column(5).header().innerText = "Date de Création";
                         $fileList.column(2).visible(true, false);
                         $fileList.column(5).visible(true, false);
                         $fileList.column(6).visible(false, false);
                     }
                 }


                 /**Display Folder List */
                 function folderDisplayer() {
                     var originalPath = "",
                         rowFolder;
                     for (var i = 0; i < dirData.length; i++) {
                         if ($tree.jstree(true).get_node(dirData[i].id).parent == "searchResult") {
                             originalPath = $tree.jstree(true).get_path(getOriginalPath(dirData[i].id));
                             originalPath.shift();
                             originalPath = originalPath.join('/');
                         }
                         rowFolder = $fileList.row.add([
                             dirData[i].id,
                             "<span class='secretId'>" + dirData[i].id + "</span><div class = 'preIcon ico_folder'></div>" + $tree.jstree(true).get_node(dirData[i].id).text,
                             "<span class = 'hide' >" + dataMod + "</span>" + euroDate($tree.jstree(true).get_node(dirData[i].id).data.dateMod),
                             $tree.jstree(true).get_node(dirData[i].id).data.type,
                             $tree.jstree(true).get_node(dirData[i].id).taille,
                             "<span class = 'hide' >" + dataMod + "</span>" + euroDate($tree.jstree(true).get_node(dirData[i].id).data.dateCreat),
                             originalPath
                         ]).draw().node();

                         $container.find(rowFolder).attr({
                             "draggable": true
                         });
                         $container.find(rowFolder).attr({
                             "title": "Vous pouvez déplacer cet élément avec la souris."
                         });
                         $container.find(rowFolder).attr('data', dirData[i].id); // Put the ID file on the row in the data attribute
                         $container.find(rowFolder).addClass('dropZone');
                     }

                 }
                 /** Get complete path from origin. Usefull to calculate if the volume as enough space */
                 function getOriginalPath(idNode) {
                     var oPath;
                     for (var i = 0; i < treeFolder.length; i++) {
                         if (treeFolder[i].id == idNode) {
                             oPath = treeFolder[i].data.originalPath;
                         }
                     }
                     return oPath;
                 }

                 /** Display volume list from root*/
                 function volumeDisplayer() {
                     for (var i = 0; i < dirData.length; i++) {
                         $fileList.row.add([
                             dirData[i].id,
                             "<div class='preIcon " + getVolType($tree.jstree(true).get_node(dirData[i].id).text) + "'></div>" + $tree.jstree(true).get_node(dirData[i].id).text,
                             "<span class='hide' >" + dataMod + "</span>" + euroDate($tree.jstree(true).get_node(dirData[i].id).data.dateMod),
                             $tree.jstree(true).get_node(dirData[i].id).data.type,
                             bytUnit($tree.jstree(true).get_node(dirData[i].id).data.capacity),
                             bytUnit(freeSpace($tree.jstree(true).get_node(dirData[i].id)))
                         ]).draw();
                     }
                 }

                 /** identify volume type */
                 function getVolType(volToFix) {
                     var volType;
                     if (volToFix == "Lecteur CD/DVD") {
                         volType = "ico_CDrom ";
                     } else if (volToFix == "Mémoire flash") {
                         volType = "ico_sdCard ";
                     } else if (volToFix == "clé USB") {
                         volType = "ico_usb ";
                     } else {
                         volType = "icoHdrive";
                     }
                     return volType;
                 }

                 /**Display file List */
                 for (var index = 0; index < mapFile.length; index++) {
                     exto = mapFile[index].extension;
                     iconExt = getIconExt(exto);
                     labelExt = getLabelExt(mapFile[index].extension);
                     fileId = mapFile[index].fileId;
                     dataMod = mapFile[index].dateMod;
                     dataCreat = mapFile[index].dateCreat;
                     orginalPath = "-";

                     if (mapFile[index].node == activDir) {

                         if (activDir == 'searchResult') {
                             orginalPath = mapFile[index].originalPath;
                             orginalPath = $tree.jstree(true).get_path(orginalPath);
                             orginalPath.shift();
                             orginalPath = orginalPath.join('/');
                         }

                         var rowFile = $fileList.row.add([
                             fileId,
                             "<div class = 'preIcon " + iconExt + "'></div><div class='elementNameExt'>" + mapFile[index].name + exto + "</div>",
                             "<span class = 'hide' >" + dataMod + "</span>" + euroDate(dataMod),
                             labelExt,
                             bytUnit(mapFile[index].size),
                             "<span class = 'hide' >" + dataCreat + "</span>" + euroDate(dataCreat),
                             orginalPath
                         ]).draw().node();
                         $container.find(rowFile).attr('draggable', true); // All Rows are draggable for Chrome
                         $container.find(rowFile).attr('data', fileId); // Put the ID file on the row
                     }
                 }

                 // ******************Drag & drop List element to Quick access and table row **************  
                 /** Drag & drop List element to Quick access and table row 
                  * Table Row Drag & Drop
                  * Depending on browsers - Chrome vs others 
                  */
                 var isChrome = !!window.chrome && !!window.chrome.webstore;
                 if (isChrome) {
                     $container.find("tr").on('dragstart', function () {
                         drag(event);
                     });

                     $container.find(".dropZone").on('dragover', function () {
                         event.preventDefault();
                         event.stopPropagation();
                         $container.find(this).addClass('dragging');
                     });

                     $container.find(".dropZone").on('drop', function () {
                         event.preventDefault();
                         event.stopPropagation();
                         drop(event);
                     });

                 } else { // other browsers like FireFox
                     $container.find("tr").on('dragstart', function (event) {
                         dragFF(event);
                     });
                     $container.find(".dropZone").on('dragover', function (event) {
                         event.preventDefault();
                         event.stopPropagation();
                         $container.find(this).addClass('dragging');
                     });
                     $container.find(".dropZone").on('drop', function (event) {
                         event.preventDefault();
                         event.stopPropagation();
                         drop(event);
                     });
                 }

                 //***************End Drag and Drop*****************************    

                 /** Control background color for list of files and folders */
                 $container.find("tbody").css({
                     'background-color': '#fffdf9'
                 });

                 /** System icon for files and folder in datatable list. 
                  * Possible to add here new icon for file Type... 
                  * @param {string} extor is the extension string
                  */
                 function getIconExt(extor) {
                     var icoDelivered = "";
                     if (extor == "") {
                         icoDelivered = "ico_folder";
                     } else if (extor == ".js") {
                         icoDelivered = "ico_js";
                     } else if (extor == ".html") {
                         icoDelivered = "ico_html";
                     } else if (extor == ".txt") {
                         icoDelivered = "ico_txt";
                     } else if (extor == ".png" || extor == ".jpeg" || extor == ".jpg" || extor == ".tiff" || extor == ".ico" || extor == ".gif" || extor == ".bmp" || extor == ".svg") {
                         icoDelivered = "icoPic";
                     } else if (extor == ".mov" || extor == ".mkv") {
                         icoDelivered = "ico_vid";
                     } else if (extor == ".xls" || extor == ".xlsx") {
                         icoDelivered = "ico_xls";
                     } else if (extor == ".doc" || extor == ".docx") {
                         icoDelivered = "ico_doc";
                     } else if (extor == ".ppt" || extor == ".pptx") {
                         icoDelivered = "ico_ppt";
                     } else if (extor == ".pdf") {
                         icoDelivered = "ico_pdf";
                     } else if (extor == ".cad") {
                         icoDelivered = "ico_cad";
                     } else {
                         icoDelivered = "ico_else";
                     }

                     return icoDelivered;

                 }

             } //End Display folder content 

             /**Details of file type hard-coded -> Todo dynamic in Json */
             function getLabelExt(extor) {
                 var labelDelivered;
                 if (extor == "") {
                     labelDelivered = "";
                 } else if (extor == ".js") {
                     labelDelivered = "Document Javascript";
                 } else if (extor == ".html") {
                     labelDelivered = "Document HTML";
                 } else if (extor == ".txt") {
                     labelDelivered = "Document texte";
                 } else if (extor == ".png" || extor == ".jpeg" || extor == ".jpg" || extor == ".tiff" || extor == ".ico" || extor == ".gif" || extor == ".bmp" || extor == ".svg") {
                     labelDelivered = "image";
                 } else if (extor == ".mov" || extor == ".mkv") {
                     labelDelivered = "Video";
                 } else if (extor == ".xls" || extor == ".xlsx") {
                     labelDelivered = "Feuille de calcul";
                 } else if (extor == ".doc" || extor == ".docx") {
                     labelDelivered = "Document";
                 } else if (extor == ".ppt" || extor == ".pptx") {
                     labelDelivered = "Diaporama";
                 } else if (extor == ".pdf") {
                     labelDelivered = "Document PDF";
                 } else if (extor == ".cad") {
                     labelDelivered = "Diagramme Picaxe";
                 } else {
                     labelDelivered = "fichier";
                 }

                 return labelDelivered;
             }

             /** get a file name by id
              * @param {string} id - node id
              */
             function getFileName(id) {
                 var targetFileName = "";
                 for (var index = 0; index < mapFile.length; index++) {
                     if (mapFile[index].fileId == id)
                         targetFileName = mapFile[index].name;
                 }
                 return targetFileName;
             }

             /** get extension string by id 
              * @param {string} id - node id
             */
             function getExtension(id) {
                 var target = "";
                 for (var index = 0; index < mapFile.length; index++) {
                     if (mapFile[index].fileId == id)
                         target = mapFile[index].extension;
                 }
                 return target;
             }

             /** get a folder name by id
              * @param {string} id - node id
              */
             function getFolderName(id) {
                 var targetFolderName = "";
                 for (var index = 0; index < treeFolder.length; index++) {
                     if (treeFolder[index].id == id)
                         targetFolderName = treeFolder[index].text;
                 }
                 return targetFolderName;
             }

             /** Format a volume - 
              * display a modal windows 
              * Identify if a volume has been selected and display the choice in a select box
              * @param {string} volumeName :give the target to format
              **@param {string} volumeId - node id
              * The fake format action consists to send the volume children in a masked folder (erased) to keep track of the student action.
              * It hides the shorcut if necessary.
              * a progress bar simulate the progression
              */
             function formater(volumeName, volumeId) {
                 $container.find(".modali").css("height", "450px").show();
                 $container.find('.modalTitle').remove();
                 if (!volumeName) {
                     $container.find(".contentModal").html('<h3>Formater un volume logique</h3><p>Nom du volume : <select class="volId"></select>' +
                         '</p><p>Label : <input type="text"></p><p>Capacité : <input type="text"></p><p>Taille d\'unité d\'allocation : <input type="text"></p><p> Type de formatage : <select> <option value="FAT 32">FAT 32</option> <option value="exFAT" selected>exFAT</option> <option value="NFTS">NFTS</option><option value="HFS+">HFS+</option> </select> </p><button class="startFormat">Lancer le formatage</button><button class="annule">Annuler</button><div class="meter"><span></span></div><button disabled="disabled" class="doneClose">Fermer</button>');

                     for (var i = 0; i < treeFolder.length; i++) {

                         if (treeFolder[i].type == "volume" || treeFolder[i].type == "usb" || treeFolder[i].type == "sdCard") {
                             $container.find(".volId").append("<option class=" + treeFolder[i].id + ">" + treeFolder[i].text + "</option>");
                         }
                     }
                 } else {
                     $container.find(".contentModal").html('<h3>Formater un volume logique</h3><p>Nom du volume : <input disabled = "disabled" type="text" value="' + volumeName + '"></p><p>Label : <input type="text"></p><p>Capacité : <input type="text"></p><p>Taille d\'unité d\'allocation : <input type="text"></p><p> Type de formatage : <select> <option value="FAT 32">FAT 32</option> <option value="exFAT" selected>exFAT</option> <option value="NFTS">NFTS</option><option value="HFS+">HFS+</option> </select> </p><button class="startFormat">Lancer le formatage</button><button class="annule">Annuler</button><div class="meter"><span></span></div><button disabled="disabled" class="doneClose">Fermer</button>');
                 }
                 $container.find(".annule").on('click', function () {
                     var evName = "Mcontextuel ABANDON du Formatage du volume";
                     evCollector(evName, "-", "-");
                     $container.find(".modali").hide();
                 });
                 $container.find(".startFormat").on('click', function () {
                     var evName;
                     if (!volumeId) {
                         volumeName = $container.find(".volId option:selected").text();
                         volumeId = $container.find(".volId option:selected")[0].className;
                     }
                     var valideFormat = confirm("Attention vous allez formater le volume : " +
                         volumeName + " ! Etes vous sûr ? l'ensemble des données seront perdues.")
                     if (valideFormat) {
                         for (var i = 0; i < mapFile.length; i++) {
                             if (mapFile[i].node == volumeId) {
                                 mapFile[i].node = "erased";
                                 dataFiles();
                                 if (volumeName.search("C:") >= 0) {
                                     $container.find(".documents").hide();
                                 };
                                 if (volumeName.search("D:") >= 0) {
                                     $container.find(".images").hide();
                                     $container.find(".videos").hide();
                                     $container.find(".downloads").hide();
                                 };
                             }
                         }
                         for (var x = 0; x < treeFolder.length; x++) {
                             if (treeFolder[x].parent == volumeId) {
                                 treeFolder[x].parent = 'erased';
                                 $tree.jstree().move_node(treeFolder[x].id, 'erased');
                                 dataFolder();

                             }
                         }
                         $container.find(".meter").show();

                         $container.find(".meter > span").show().each(function () {
                             $container.find(this)
                                 .data("0%", $container.find(this).width())
                                 .width(0)
                                 .animate({
                                     width: "100%"
                                 }, 3000, function () {
                                     alert("formatage terminé.")
                                 });
                         });

                         /**Progress Bar */
                         $container.find(".startFormat").attr('disabled', 'disabled');
                         $container.find(".doneClose").attr('disabled', false);
                         $container.find(".doneClose").on('click', function () {
                             $container.find(".modali").hide();
                             $tree.jstree('deselect_all');
                             $tree.jstree('select_node', 'root');
                             $tree.jstree('open_node', "root");
                         })

                         evName = "Formatage du volume";
                         evCollector(evName, getDirName(volumeId), "-");
                     }
                 });

             }

             $container.find(".formater").on('click', function () {
                 formater();
             });

             $container.find(".commandWindow").on('click', function () {
                 $container.find(".comWin").show();
                 $container.find(".comLine").focus();

             });

             /**Drag function For Firefox -> files and folders list */
             function dragFF(ev) {
                 var FileArray = [],
                     evName;
                 DDFile = [];
                 ev.originalEvent.dataTransfer.setData("text/plain", ev.target.id);
                 //identification element grabbed by just mouseDown and not click
                 var ddTarget, nameCheck, idCheck, typeCheck; // todo protect variables to prevent accidental drag
                 idCheck = ev.target.getAttribute('data');
                 nameCheck = ev.target.cells[0].innerText;
                 typeCheck = ev.target.cells[2].innerText;

                 if (typeCheck == 'Répertoire') { // Identify mousedown on folder
                     for (var i = 0; i < treeFolder.length; i++) {
                         if (treeFolder[i].id == idCheck) {
                             treeFolder[i].origin = treeFolder[i].parent;
                             DDFolder.push(treeFolder[i].id);
                             evName = "Drag répertoire non sélectionné depuis la liste";
                             evCollector(evName, treeFolder[i].text, getDirName(treeFolder[i].parent));
                         }
                     }
                 } else {
                     // Identify mousedown on file
                     for (var i = 0; i < mapFile.length; i++) {
                         if (mapFile[i].fileId == idCheck) {
                             mapFile[i].origin = mapFile[i].node;
                             DDFile.push(mapFile[i].fileId);
                             evName = "Drag fichier non sélectionné depuis la liste";
                             evCollector(evName, mapFile[i].name + mapFile[i].extension, getDirName(mapFile[i].origin));
                         };
                     }
                 }

                 ddTarget = $fileList.rows({
                     selected: true
                 })[0]; // Array of Ids

                 for (var i = 0; i < ddTarget.length; i++) {
                     var dataId = $fileList.row(ddTarget[i]).data()[0];
                     var chain = $fileList.row(ddTarget[i]).data();
                     if (chain.includes("Répertoire")) {
                         for (var i = 0; i < treeFolder.length; i++) {
                             if (treeFolder[i].id == dataId) {
                                 treeFolder[i].origin = treeFolder[i].parent;
                                 evName = "Drag répertoire(s)  sélectionné(s) depuis la liste";
                                 evCollector(evName, treeFolder[i].text, getDirName(treeFolder[i].origin));
                             };
                         }
                         if (DDFolder.indexOf(dataId) === -1) {
                             DDFolder.push(dataId)
                         }
                     } else {
                         FileArray.push(dataId); // Build file array selection
                     }
                 }

                 // File selected : list builder 

                 for (var y = 0; y < FileArray.length; y++) {
                     for (var i = 0; i < mapFile.length; i++) {
                         if (mapFile[i].fileId == FileArray[y]) {
                             mapFile[i].origin = mapFile[i].node;
                             evName = "Drag fichier(s) sélectionné(s) depuis la liste";
                             evCollector(evName, mapFile[i].name + mapFile[i].extension, getDirName(mapFile[i].origin));
                             if (DDFile.indexOf(FileArray[y]) === -1) {
                                 DDFile.push(FileArray[y])
                             }
                         };
                     }
                 }
             }

             /**Drag Commun for Chrome & alii except firefox  */
             function drag(ev) {
                 var FileArray = [],
                     evName;
                 DDFile = [];
                 ev.dataTransfer.setData("text/plain", ev.target.id);
                 //identification element grabbed by just mouseDown and not click
                 var ddTarget, nameCheck, idCheck, typeCheck;
                 idCheck = ev.target.getAttribute('data');
                 nameCheck = ev.target.cells[0].innerText;
                 typeCheck = ev.target.cells[2].innerText;

                 if (typeCheck == 'Répertoire') { // Identify mousedown on folder
                     for (var i = 0; i < treeFolder.length; i++) {
                         if (treeFolder[i].id == idCheck) {
                             treeFolder[i].origin = treeFolder[i].parent;
                             DDFolder.push(treeFolder[i].id);
                             evName = "Drag répertoire non sélectionné depuis la liste";
                             evCollector(evName, treeFolder[i].text, getDirName(treeFolder[i].parent));
                         }
                     }
                 } else {
                     // Identify mousedown on file
                     for (var i = 0; i < mapFile.length; i++) {
                         if (mapFile[i].fileId == idCheck) {
                             mapFile[i].origin = mapFile[i].node;
                             DDFile.push(mapFile[i].fileId);
                             evName = "Drag fichier non sélectionné depuis la liste";
                             evCollector(evName, mapFile[i].name + mapFile[i].extension, getDirName(mapFile[i].origin));
                         };
                     }
                 }

                 ddTarget = $fileList.rows({
                     selected: true
                 })[0];

                 for (var i = 0; i < ddTarget.length; i++) {
                     var dataId = $fileList.row(ddTarget[i]).data()[0];
                     var chain = $fileList.row(ddTarget[i]).data();
                     if (chain.includes("Répertoire")) {
                         for (var i = 0; i < treeFolder.length; i++) {
                             if (treeFolder[i].id == dataId) {
                                 treeFolder[i].origin = treeFolder[i].parent;
                                 evName = "Drag répertoire(s)  sélectionné(s) depuis la liste";
                                 evCollector(evName, treeFolder[i].text, getDirName(treeFolder[i].origin));
                             };
                         }

                         if (DDFolder.indexOf(dataId) === -1) {
                             DDFolder.push(dataId)
                         }
                     } else {
                         FileArray.push(dataId); // Build file array selection
                     }
                 }

                 // File selected : list builder 
                 for (var y = 0; y < FileArray.length; y++) {
                     for (var i = 0; i < mapFile.length; i++) {
                         if (mapFile[i].fileId == FileArray[y]) {
                             mapFile[i].origin = mapFile[i].node;
                             evName = "Drag fichier(s) sélectionné(s) depuis la liste";
                             evCollector(evName, mapFile[i].name + mapFile[i].extension, getDirName(mapFile[i].origin));

                             if (DDFile.indexOf(FileArray[y]) === -1) {
                                 DDFile.push(FileArray[y])
                             }
                         };
                     }
                 }
             }

             /** Drop function From List to Tree - no browser compatibilty problem */
             function drop(ev) {
                 var activDir = $tree.jstree(true).get_selected(),
                     evName; /**get activ Directory */
                 var testDoublon = false; // OK verified

                 /**
                  * Drag and drop folder from list : define destination 
                  * Two moves : 1.from list to list  2.from list to tree 
                  * Is drop allowed?
                  * @param {obj} evTarget - the destination folder containing destination folder id. 
                  */
                 function defineTargetFolder(evTarget) {
                     var targetId;
                     if (evTarget.find(".secretId").context.innerText == "Cet Ordinateur") {
                         targetId = "root"
                     } // from the list to the list
                     else if (evTarget.find(".secretId").context.innerText == "Lecteur CD/DVD") {
                         targetId = "cdRom"
                     } else if (evTarget.find(".secretId").context.innerText == "Réseau Local") {
                         targetId = "netWork"
                     } else {
                         if (typeof evTarget.find(".secretId")[0] !== "undefined") { // From the list to the list
                             targetId = evTarget.find(".secretId")[0].innerText
                         } else { // from the list to the tree folder 
                             var evtstring = String(ev.target.id);
                             targetId = evtstring.substring(0, evtstring.length - 7);
                         }

                     }
                     return targetId
                 }

                 ev.preventDefault();
                 $fileList.rows('.selected').remove().draw();
                 if (DDFile.length > 0) {
                     for (var y = 0; y < DDFile.length; y++) {
                         /**Look throught Drag file array */
                         var targetFileId = DDFile[y];
                         for (var i = 0; i < mapFile.length; i++) {
                             /**Look throught Json Files */
                             if (targetFileId == mapFile[i].fileId) {
                                 /** Scan to find file in MapFile*/
                                 for (var x = 0; x < treeFolder.length; x++) {
                                     /**Look throught Json Directories to fix autorization to write on volume */
                                     var evtstring = String(ev.target.id);
                                     evtstring = evtstring.substring(0, evtstring.length - 7);
                                     if (treeFolder[x].id == evtstring) {
                                         if (treeFolder[x].id == "cdRom" || treeFolder[x].id == "root" || treeFolder[x].id == "netWork") {
                                             alert("Opération interdite - il est impossible d'écrire sur cet emplacement");
                                             $tree.jstree().deselect_all();
                                             $tree.jstree().select_node(mapFile[i].node);
                                             DDFile = [];
                                             evName = "Drop Interdit";
                                             evCollector(evName, targetFileId, treeFolder[x].text);
                                             return;
                                         } else {
                                             verifDbl(mapFile[i], treeFolder[x].id, "DD");
                                             dataFiles();
                                             evName = "Drop de fichier exécuté";
                                             evCollector(evName, targetFileId, treeFolder[x].text);
                                         }
                                     } else {
                                         /** Drop files to a directory but in the list not in the tree*/
                                         var evtstring = String(ev.target.id);
                                         evtstring = evtstring.substring(0, evtstring.length - 7);
                                         if (DDFile[y] == mapFile[i].fileId) {
                                             if ($(ev.target).find(".secretId")[0]) {
                                                 if (treeFolder[x].id == $(ev.target).find(".secretId")[0].innerText || treeFolder[x].id == evtstring) {
                                                     // Check if present in destination
                                                     verifDbl(mapFile[i], treeFolder[x].id, "DD");
                                                 }
                                             } else {
                                                 if (treeFolder[x].id == evtstring) {
                                                     verifDbl(mapFile[i], treeFolder[x].id, "DD");
                                                 }
                                             }
                                         }

                                     }
                                 }
                             }
                         }
                     }
                     $tree.jstree(true).select_node(activDir);
                     $tree.jstree(true).open_node(activDir);
                     displayDirContent(activDir);

                     DDFile = [];
                     return "ciblos";
                 }
                 if (DDFolder.length > 0) {
                     var cblFolderId = defineTargetFolder($(ev.target));
                     for (var y = 0; y < DDFolder.length; y++) {
                         /**Look throught Drag file array */
                         var targetFolderId = DDFolder[y];
                         WbranchSize = branchSize(targetFolderId);

                         for (var i = 0; i < treeFolder.length; i++) {
                             /**Look throught Json Folders */
                             if (targetFolderId == treeFolder[i].id) {
                                 /**Find Folder To move in TreeFolder */
                                 for (var x = 0; x < treeFolder.length; x++) {
                                     /**Look throught Json Directories */
                                     var procy = true;
                                     if (cblFolderId !== "Normalfolder") {
                                         /**Drop Folder from the list to the list */
                                         if (treeFolder[x].id == cblFolderId) {
                                             if (treeFolder[x].id == "cdRom" || treeFolder[x].id == "root" || treeFolder[x].id == "netWork") {
                                                 /**Exclusion of CdRom */
                                                 alert("Opération interdite - il est impossible d'écrire sur cet emplacement");
                                                 targetFolderId = toString(treeFolder[x].id);
                                                 $tree.jstree().deselect_all();
                                                 $tree.jstree().select_node(treeFolder[i].parent);

                                                 evName = "Drop répertoire Interdit";
                                                 evCollector(evName, getDirName(DDFolder[y]), getDirName(treeFolder[x].id));
                                             } else {
                                                 if (testFreeSpaceFolder(treeFolder[x].id, WbranchSize)) {

                                                     $tree.jstree().move_node(targetFolderId, treeFolder[x].id); /**Move roots of branch (and the branch) from clipboard to destination  */
                                                 } else {
                                                     alert("Operation impossible, il n'y pas assez d'espace sur le support de destination");
                                                     DDFolder = [];
                                                     displayDirContent(activDir);
                                                     return;
                                                 }
                                                 /**Update Json treeFolder */

                                                 if (treeFolder[i].id == treeFolder[x].id) {

                                                 } /**Destination = origin */
                                                 else {
                                                     if (procy) {
                                                         verifDbl(treeFolder[i].id, treeFolder[x].id, "DD");
                                                         treeFolder[i].parent = treeFolder[x].id;
                                                         dataFolder();
                                                         evName = "Drop répertoire réalisé";
                                                         evCollector(evName, getDirName(DDFolder[y]), getDirName(treeFolder[x].id));
                                                         procy = false;
                                                     }
                                                 }

                                                 $tree.jstree(true).select_node(activDir);
                                                 $tree.jstree(true).open_node(activDir);
                                                 displayDirContent(activDir);
                                             }
                                         } else {
                                             testDoublon = true;
                                         }
                                     }
                                 }
                             }
                         }
                     }
                 }
                 DDFolder = [];
                 WbranchSize = 0;

             } // End Zone D&D commun function


             //*************Context Menu Command******************************/
             /**list of context Menu Command 
              * Cut, Copy, Paste...
              * But all the CRUD command are conditionned by 2 things : space available and no clones! 
              */
             function commandCut(selectedNodeId) {
                 var evName, originalNodes;
                 if (selectedNodeId) {
                     originalNodes = $tree.jstree(true).get_selected(selectedNodeId);
                     for (var x = 0; x < originalNodes.length; x++) {
                         WbranchSize = branchSize(originalNodes[x].id);

                         $tree.jstree().move_node(originalNodes[x].id, 'clipboard');

                         var oriNodeId = originalNodes[x].id;
                         for (var i = 0; i < treeFolder.length; i++) {
                             var idfold = treeFolder[i];
                             if (idfold.id == oriNodeId) {
                                 treeFolder[i].parent = "clipBoard";
                                 dataFolder();
                                 evName = "Mcontextuel - Couper répertoire";
                                 evCollector(evName, treeFolder[i].text, getDirName(oriNodeId));
                             }
                         }
                     }

                 } else {
                     SelectedArr = $fileList.rows({
                         selected: true
                     })[0];
                     for (var index = 0; index < SelectedArr.length; index++) {
                         var indexElement = SelectedArr[index];
                         var element = $fileList.row(indexElement).data();
                         for (var i = 0; i < mapFile.length; i++) {
                             if (element[0] == mapFile[i].fileId) {

                                 clipBoard.push(mapFile[i]);

                                 dataFiles();
                             };
                         }

                         // get only files id no directories !
                         for (var i = 0; i < mapFile.length; i++) {
                             var idf = mapFile[i];
                             if (idf.fileId == element[0]) {
                                 var oriNodeId = mapFile[i].node;
                                 mapFile[i].origin = mapFile[i].node;
                                 mapFile[i].node = "clipBoard";
                                 evName = "Mcontextuel - Couper fichier";
                                 evCollector(evName, mapFile[i].name + mapFile[i].extension, getDirName(oriNodeId));
                                 dataFiles();
                             }
                         }
                         // Second for loop to get directories
                         for (var i = 0; i < treeFolder.length; i++) {
                             if (treeFolder[i].id == element[0]) {
                                 WbranchSize = branchSize(element[0]);
                                 var oriNodeId = treeFolder[i].parent;
                                 treeFolder[i].origin = oriNodeId;
                                 treeFolder[i].parent = "clipBoard";
                                 $tree.jstree().move_node(treeFolder[i].id, 'clipboard');

                                 $tree.jstree(true).select_node(oriNodeId);
                                 $tree.jstree(true).open_node(oriNodeId);
                                 displayDirContent(oriNodeId);

                                 dataFolder();
                                 evName = "Mcontextuel - Couper répertoire";
                                 evCollector(evName, treeFolder[i].text, getDirName(oriNodeId));
                             }
                         }
                     }
                 }
                 $fileList.rows('.selected').remove().draw(); // Remove row from tables


             };
             /** The commandPaste function -
              * This command is called by the context menu 
              * Two parts : pasting files and pasting folders
              */
             function commandPaste() {
                 /** Get files in clipBoard */
                 var clipDir = $tree.jstree(true).get_node('clipboard');
                 var destiPaste = $tree.jstree(true).get_selected();
                 var evName;

                 /**This loop is only for files from copy an cut */
                 for (var y = 0; y < clipBoard.length; y++) {
                     if (clipBoard[y].fileId) {
                         if (clipBoard[y].copy) {

                             clipBoard[y].node = destiPaste[0];
                             verifDbl(clipBoard[y], destiPaste[0], "copy"); //Verify doubles and write in mapFile
                             displayDirContent(destiPaste);

                             //Answer system
                             dataClipBoard();
                             evName = "Mcontextuel - Coller fichier depuis copier";
                             evCollector(evName, clipBoard[y].name + clipBoard[y].extension, getDirName(destiPaste[0]));
                             dataFiles();

                             //Reset operation copy
                             for (var i = 0; i < mapFile.length; i++) {
                                 if (mapFile[i].fileId == clipBoard[y].fileId) {
                                     mapFile[i].copy = false;
                                 }
                             }

                         } else {

                             for (var i = 0; i < mapFile.length; i++) {
                                 if (mapFile[i].fileId == clipBoard[y].fileId) {
                                     verifDbl(mapFile[i], destiPaste[0], "cut"); //Verify doubles and write in mapFile
                                     evName = "Mcontextuel - Coller fichier depuis couper";
                                     evCollector(evName, mapFile[i].name + mapFile[i].extension, getDirName(mapFile[i].node));
                                     dataFiles();
                                 }
                             }
                             displayDirContent(destiPaste);
                         }
                     }
                 }

                 clipBoard = []; //Empty clipBoard after paste

                 //*******************************************Directories********************************************************** */
                 /**Move Directories from clipBoard to targetFolder */
                 var childArray = clipDir.children; // Get only first direct Child
                 var allchildArray = clipDir.children_d;

                 for (var ifold = 0; ifold < allchildArray.length; ifold++) { // Scan all directories in childArray
                     for (var i = 0; i < treeFolder.length; i++) {
                         if (treeFolder[i].id == allchildArray[ifold]) {

                             var testWritable = verifDbl(treeFolder[i], destiPaste[0], 'copy'); // Incertitude sur le message copy

                             for (var j = 0; j < childArray.length; j++) { // Scan all directories in childArray
                                 if (testFreeSpaceFolder(destiPaste[0], WbranchSize)) {
                                     $tree.jstree().move_node(childArray[j], destiPaste[0]); // Move roots of branch (and the branch) from clipboard to destination 
                                 } else {
                                     alert("Operation impossible, il n'y pas assez d'espace sur le support de destination");
                                     return;
                                 }
                             }
                             if (testWritable) {
                                 //Repopulate the new folders
                                 for (var y = 0; y < treeFolder.length; y++) { // Find the original child in treefolder                          
                                     if (treeFolder[y].id == allchildArray[ifold]) {
                                         for (var x = 0; x < mapFile.length; x++) { // Scan all files to duplicate to child dir
                                             if (mapFile[x].node == treeFolder[y].data.copy) {
                                                 mapFile.push({
                                                     'fileId': mapFile.length + 1,
                                                     'node': allchildArray[ifold],
                                                     'name': mapFile[x].name,
                                                     'extension': mapFile[x].extension,
                                                     'size': mapFile[x].size,
                                                     'dateMod': getNowDate(),
                                                     'dateCreat': mapFile[x].dateCreat,
                                                     "image_url": mapFile[x].image_url,
                                                     "app": mapFile[x].app,
                                                     "dateLastAcces": mapFile[x].dateLastAcces,
                                                     "author": mapFile[x].author,
                                                     "content": mapFile[x].content
                                                 });
                                             }
                                         }
                                     }
                                 }
                             }
                             dataFolder();
                             evName = "Mcontextuel - Coller répertoire";
                             evCollector(evName, treeFolder[i].text, getDirName(destiPaste[0]));
                         }
                     }
                 }
                 WbranchSize = 0;
                 $tree.jstree(true).select_node(destiPaste[0]);
                 $tree.jstree(true).open_node(destiPaste[0]);
                 displayDirContent(destiPaste[0]);
             };
             /** verifDbl : verify double 
              * Two cases :  folders and files
              * Operation could be paste from copy or cut. 
              * If cut -> the element is moved to clipboard. But if the space in the target folder is not enough or an element with the same name is already in the folder target the operation is canceled and the file reappears in the original place.
              */
             function verifDbl(element, placeId, operation) { // check doubles
                 var testWritable = true;
                 var FolderWritable = true // Ok to overwrite or simply write the dir

                 /** element is a Folder - Case 1 */
                 if (element.type == "default" || element.type == "Répertoire") {
                     for (var i = 0; i < treeFolder.length; i++) {
                         if (treeFolder[i].text == element.text && treeFolder[i].parent == placeId) {
                             var toriz = confirm("Attention un répertoire avec le même nom existe déjà à cet emplacement, voulez-vous l'écraser ?");
                             if (toriz == true) {
                                 FolderWritable = true;
                                 $tree.jstree(true).move_node(treeFolder[i], "erased");

                                 for (var x = 0; x < treeFolder.length; x++) {
                                     if (treeFolder[x].id == element.id) {
                                         treeFolder[x].parent = placeId;
                                         treeFolder[x].data.type = element.data.type;
                                         treeFolder[x].data.type = element.data.dateMod;
                                         treeFolder[x].data.type = element.data.dateCreat;
                                         treeFolder[i].parent = erased;
                                         $tree.jstree(true).move_node(treeFolder[x], placeId);
                                     }
                                 }

                                 return FolderWritable;

                             } else {
                                 //Case : cancel
                                 FolderWritable = false;
                                 alert("cet élément reste temporairement disponible en mémoire. Vous pouvez le coller à un autre endroit pour le rendre à nouveau disponible.");
                             }
                         }
                     }
                     return FolderWritable;
                 } else {
                     if (operation == "copy") {
                         if (placeId == element.origin) {
                             //Automatic Incrimentation double in same folder
                             var testFP = testFreeSpace(placeId, element, "copy"); // Test if there is enough space on the volume
                             if (testFP) {
                                 //allowed
                                 element.fileId = mapFile.length + 1;
                                 element.name = "copie_" + incrementor + "_de_" + element.name;
                                 element.dateMod = getNowDate();
                                 mapFile.push(element);
                                 incrementor = incrementor + 1;
                             } else {
                                 //Not allowed
                                 alert("Espace insuffisant pour achever l'opération. Libérer de l'espace et recommencer");
                             }

                         } else {
                             //scan if file name plus extension and destination already exist !
                             for (var i = 0; i < mapFile.length; i++) {
                                 if (mapFile[i].name == element.name && mapFile[i].extension == element.extension && mapFile[i].node == placeId) {
                                     //Doubles are identify
                                     var autoriz = confirm("Attention un fichier avec le même nom et la même extension existe déjà à cet emplacement, voulez-vous l'écraser ?");
                                     if (autoriz == true) {
                                         var testFP = testFreeSpace(placeId, element, "copy"); // Test if there is enough space on the volume
                                         if (testFP) {
                                             mapFile[i].size = element.size;
                                             mapFile[i].dateMod = getNowDate();
                                             mapFile[i].dateCreat = element.dateCreat;
                                             mapFile[i].content = element.content;
                                             mapFile[i].dateLastAcces = element.dateLastAcces;
                                             mapFile[i].author = element.author;
                                             mapFile[i].app = element.app;
                                             mapFile[i].image_url = element.image_url;
                                             testWritable = false;
                                         } else {
                                             alert("Espace insuffisant pour achever l'opération. Libérer de l'espace et recommencer");
                                             testWritable = false;
                                         }

                                     } else {
                                         testWritable = false;
                                     }
                                 }
                             }
                             if (testWritable) {
                                 //Simple paste case

                                 var testFP = testFreeSpace(placeId, element); // Test if there is enough space on the volume
                                 if (testFP) {
                                     element.node = placeId;
                                     element.fileId = mapFile.length + 1;
                                     element.dateMod = getNowDate();
                                     mapFile.push(element);
                                 } else {
                                     alert("Espace insuffisant pour achever l'opération. Libérer de l'espace et recommencer");
                                     testWritable = false;
                                 }
                             }
                         }
                     } else if (operation == "cut") {
                         for (var i = 0; i < mapFile.length; i++) {
                             if (mapFile[i].name == element.name && mapFile[i].node == placeId && mapFile[i].extension == element.extension) {
                                 var autoriz = confirm("Attention un fichier avec le même nom et la même extension existe déjà à cet emplacement, voulez-vous l'écraser ?");
                                 if (autoriz == true) {
                                     var testFP = testFreeSpace(placeId, element, "move"); // Test if there is enough space on the volume
                                     if (testFP) {
                                         //allowed
                                         mapFile[i].node = "erased"; // Erased the previous element  
                                         for (var y = 0; y < mapFile.length; y++) { // search the element to paste
                                             if (mapFile[y].name == element.name && mapFile[y].node == 'clipBoard' && mapFile[y].extension == element.extension) {
                                                 mapFile[y].node = placeId;
                                                 return mapFile[y];
                                             }
                                         }
                                     } else {
                                         //Not allowed
                                         alert("Espace insuffisant pour achever l'opération. Libérer de l'espace et recommencer");
                                         for (var y = 0; y < mapFile.length; y++) { // search the element to paste
                                             if (mapFile[y].name == element.name && mapFile[y].node == 'clipBoard' && mapFile[y].extension == element.extension) {
                                                 mapFile[y].node = mapFile[y].origin; // Back to previous state      
                                             }
                                         }
                                         testWritable = false;
                                     }
                                 } else {
                                     for (var y = 0; y < mapFile.length; y++) { // search the element to paste
                                         if (mapFile[y].name == element.name && mapFile[y].node == 'clipBoard' && mapFile[y].extension == element.extension) {
                                             mapFile[y].node = mapFile[y].origin; // Back to previous state      
                                         }
                                     }
                                 }
                                 testWritable = false;
                             }
                         }
                         if (testWritable == true) {
                             for (var i = 0; i < mapFile.length; i++) {
                                 if (mapFile[i].name == element.name && mapFile[i].extension == element.extension && mapFile[i].node == "clipBoard") {
                                     var testFP = testFreeSpace(placeId, element, "move"); // Test if there is enough space on the volume
                                     if (testFP) {
                                         //allowed
                                         mapFile[i].node = placeId;
                                     } else {
                                         //Not allowed
                                         alert("Espace insuffisant pour achever l'opération. Libérer de l'espace et recommencer");
                                         testWritable = false;
                                         for (var y = 0; y < mapFile.length; y++) { // search the element to paste
                                             if (mapFile[y].name == element.name && mapFile[y].node == 'clipBoard' && mapFile[y].extension == element.extension) {
                                                 mapFile[y].node = mapFile[y].origin; // Back to previous state      
                                             }
                                         }
                                     }
                                 }
                             }
                             displayDirContent(placeId);
                         }

                     } else {
                         for (var i = 0; i < mapFile.length; i++) {
                             if (mapFile[i].name == element.name && mapFile[i].node == placeId && mapFile[i].extension == element.extension) {
                                 var autoriz = confirm("Attention un fichier avec le même nom et la même extension existe déjà à cet emplacement, voulez-vous l'écraser ?");
                                 if (autoriz == true) {
                                     mapFile[i].node = "erased"; // Erased the previous element
                                     for (var y = 0; y < mapFile.length; y++) { // search the element to paste
                                         if (mapFile[y].fileId == element.fileId) {
                                             var testFP = testFreeSpace(placeId, element, "move"); // Test if there is enough space on the volume
                                             if (testFP) {
                                                 //allowed
                                                 mapFile[y].node = placeId;
                                                 return mapFile[y];
                                             } else {
                                                 //Not allowed
                                                 alert("Espace insuffisant pour achever l'opération. Libérer de l'espace et recommencer");
                                                 for (var y = 0; y < mapFile.length; y++) { // search the element to paste
                                                     if (mapFile[y].fileId == element.fileId) {
                                                         mapFile[y].node = mapFile[y].origin; // Back to previous state for dragged element     
                                                     }
                                                     if (mapFile[y].name == element.name && mapFile[y].extension == element.extension && mapFile[y].node == "erased") {
                                                         mapFile[y].node = placeId; // Back to previous state  for targeted element  
                                                     }
                                                 }
                                                 testWritable = false;
                                             }
                                         }
                                     }
                                 } else {
                                     for (var y = 0; y < mapFile.length; y++) { // search the element to paste
                                         if (mapFile[y].fileId == element.fileId) {
                                             mapFile[y].node = mapFile[y].origin; // Back to previous state  for dragged element    
                                         }
                                         if (mapFile[y].name == element.name && mapFile[y].extension == element.extension && mapFile[y].node == "erased") {
                                             mapFile[y].node = placeId; // Back to previous state  for targeted element  
                                         }
                                     }
                                 }
                                 testWritable = false;
                             }
                         }
                         if (testWritable == true) {
                             for (var i = 0; i < mapFile.length; i++) {
                                 if (mapFile[i].fileId == element.fileId) {
                                     var testFP = testFreeSpace(placeId, element, "move"); // Test if there is enough space on the volume
                                     if (testFP) {
                                         //allowed
                                         mapFile[i].node = placeId;
                                     } else {
                                         //Not allowed
                                         alert("Espace insuffisant pour achever l'opération. Libérer de l'espace et recommencer");
                                         for (var y = 0; y < mapFile.length; y++) { // search the element to paste
                                             if (mapFile[y].fileId == element.fileId) {
                                                 mapFile[y].node = mapFile[y].origin; // Back to previous state      
                                             }
                                         }
                                         testWritable = false;
                                     }
                                 }
                             }
                             displayDirContent(placeId);
                         }
                     }
                 }
             }
             /** branchSize calculate the virtual size (octets) of a jstree branch usually to determine if paste is possible (space available?) 
              * @returns  size of on branch root+children
              */
             function branchSize(rootId) { // root of branch to copy

                 var bSize, rootNode, childNode;
                 rootNode = $tree.jstree(true).get_node(rootId);
                 if (rootNode) {
                     childNode = rootNode.children_d;
                     childNode.push(rootNode.id); // add the branch's root to the array
                     for (var i = 0; i < childNode.length; i++) {
                         for (var y = 0; y < mapFile.length; y++) {
                             if (mapFile[y].node == childNode[i]) {
                                 bSize = 0;
                                 bSize = bSize + parseInt(mapFile[y].size);
                             }
                         }
                     }
                 }
                 if (!bSize) {
                     bSize = 0
                 }

                 return bSize;
             }

             /** command copy send by context menu  */
             function commandCopy(selectedId) {
                 var evName;

                 function addCopyToJson(neoNode, DirId, parentDir, TFolder) {
                     neoNode.data = {};
                     neoNode.data.type = TFolder.data.type;
                     neoNode.data.dateMod = TFolder.data.dateMod;
                     neoNode.data.dateCreat = TFolder.data.dateCreat;

                     treeFolder.push({
                         "id": DirId,
                         "parent": parentDir,
                         "text": TFolder.text,
                         "type": TFolder.type,
                         "data": {
                             "copy": TFolder.id,
                             "type": TFolder.data.type,
                             "dateMod": TFolder.data.dateMod,
                             "dateCreat": TFolder.data.dateCreat
                         }
                     });
                 }

                 /**
                  *Build an array of direct children for the node in copy 
                  * @param {obj} baseTree - the node being copied
                  * @returns {obj} ChildNodeArr - the array of copied node + direct children
                  */
                 function findOriginal(baseTree) {
                     var ChildNodeArr = []
                     var baseNode = $tree.jstree(true).get_node(baseTree.id);
                     for (var i = 0; i < baseNode.children_d.length; i++) {
                         var nChild = $tree.jstree(true).get_node(baseNode.children_d[i]);
                         ChildNodeArr.push(nChild);
                     }
                     return ChildNodeArr;
                 }

                 // Action starts from Tree
                 if (selectedId) {
                     var copyNodes = $tree.jstree(true).get_selected(); // get only ids of nodes

                     WbranchSize = branchSize(selectedId);
                     for (var x = 0; x < copyNodes.length; x++) {
                         // add branch weight
                         var newNode = $tree.jstree().copy_node(copyNodes[x], 'clipboard');
                         var newNodeData = $tree.jstree().get_node(newNode);

                         for (var i = 0; i < treeFolder.length; i++) {
                             if (treeFolder[i].id == copyNodes[x]) {
                                 addCopyToJson(newNodeData, newNode, "clipboard", treeFolder[i]);

                                 // Update Children in Json
                                 childGroup = newNodeData.children_d;
                                 for (var y = 0; y < childGroup.length; y++) {
                                     var newChild = $tree.jstree(true).get_node(childGroup[y]);
                                     var newChildDir = childGroup[y];
                                     var parentDir = newChild.parent;
                                     var CNodeOriginal = findOriginal(treeFolder[i], newChild.text);

                                     for (var x = 0; x < CNodeOriginal.length; x++) {
                                         if (CNodeOriginal[x].text == newChild.text) {
                                             addCopyToJson(newChild, newChildDir, parentDir, CNodeOriginal[x]);
                                         }
                                     }
                                 }
                             }
                         }
                         dataFolder();
                         evName = "Mcontextuel  - copie de répertoire";
                     }
                     //Action starts from list
                 } else {
                     SelectedArr = $fileList.rows({
                         selected: true
                     })[0];
                     for (var index = 0; index < SelectedArr.length; index++) {
                         var indexElement = SelectedArr[index];
                         var newId = mapFile.length + 1;
                         var element = $fileList.row(indexElement).data();
                         var childGroup;

                         // get only files id... no directories !
                         for (var i = 0; i < mapFile.length; i++) {
                             var idf = mapFile[i];
                             if (idf.fileId == element[0]) {
                                 var newEl = {
                                     'fileId': newId,
                                     'node': 'clipBoard',
                                     'name': idf.name,
                                     'extension': idf.extension,
                                     'size': idf.size,
                                     'dateMod': idf.dateMod,
                                     'dateCreat': idf.dateCreat,
                                     "image_url": idf.image_url,
                                     "app": idf.app,
                                     "dateLastAcces": idf.dateLastAcces,
                                     "author": idf.author,
                                     "content": idf.content,
                                     'origin': idf.node,
                                     'copy': true
                                 };
                                 clipBoard.push(newEl);
                                 dataClipBoard();
                                 dataFiles();
                                 evName = "Mcontextuel - Copier fichier";
                                 evCollector(evName, mapFile[i].name + mapFile[i].extension, getDirName(mapFile[i].node));
                             }
                         }
                         // Second for loop to get directories
                         for (var i = 0; i < treeFolder.length; i++) {
                             if (treeFolder[i].id == element[0]) {
                                 // Add to  treeFolder the new folder with new ID
                                 var newDir = $tree.jstree(true).copy_node(treeFolder[i], 'clipboard'); // copy and pass ID
                                 var newNode = $tree.jstree(true).get_node(newDir);
                                 WbranchSize = branchSize(element[0]);

                                 addCopyToJson(newNode, newDir, "clipboard", treeFolder[i]);

                                 // treeFolder[i].parent = "clipboard";
                                 $tree.jstree(true).get_node(newDir).data.dateMod = treeFolder[i].data.dateMod;
                                 $tree.jstree(true).get_node(newDir).data.type = treeFolder[i].data.type;
                                 $tree.jstree(true).get_node(newDir).taille = ""
                                 $tree.jstree(true).get_node(newDir).data.dateCreat = treeFolder[i].data.dateCreat;


                                 // Update Children in Json
                                 childGroup = newNode.children_d;
                                 if (childGroup.length > 0) {
                                     for (var y = 0; y < childGroup.length; y++) {
                                         var newChild = $tree.jstree(true).get_node(childGroup[y]);
                                         var newChildDir = childGroup[y];
                                         var parentDir = newChild.parent;
                                         var CNodeOriginal = findOriginal(treeFolder[i], newChild.text);
                                         for (var x = 0; x < CNodeOriginal.length; x++) {
                                             if (CNodeOriginal[x].text == newChild.text) {
                                                 addCopyToJson(newChild, newChildDir, parentDir, CNodeOriginal[x]);
                                             }
                                         }
                                     }
                                 }
                             }
                         }
                     }
                 }
             };

             $container.find(".windowTools").click(function () {
                 $container.find(".modali").hide();
             });
             $container.find(".closeWindow").click(function () {
                 $container.find(".modali").hide();
             });

             /** Create new file from context menu 
              * Check if file name is not present in the target directory
              * The size of new file = 0.
              */
             function commandNewFile() {
                 var evName;
                 $container.find(".modali").show().css({
                     width: "550px",
                     height: "140px"
                 });
                 $container.find('.modalTitle').remove();
                 $container.find(".contentModal").html("<h3>Nouveau Fichier</h3><input class='newFile' type='text' placeholder='Nom du nouveau fichier'>.<input type='text' class='inputExtension' placeholder='Extension'><button class='createNewFile'>OK</button><button class='annulModal'>Annuler</button>");
                 $container.find(".newFile").focus();
                 $container.find(".annulModal").click(function () {
                     $container.find(".modali").hide();
                 });
                 var actifNode = $tree.jstree(true).get_selected(true);
                 $container.find('.createNewFile').click(function () {
                     var writable;
                     var newName = $container.find(".newFile").val();
                     var newExt = $container.find(".inputExtension").val();
                     for (var i = 0; i < mapFile.length; i++) {
                         if (mapFile[i].name == newName && mapFile[i].extension == "." + newExt && mapFile[i].node == actifNode[0].id) {
                             var crashIt = confirm("Un fichier porte déjà ce nom dans ce répertoire ! Désirez-vous l'écraser ?");
                             if (crashIt) {
                                 mapFile[i].node = "erased";
                                 writable = true;
                             } else {
                                 writable = false;
                                 return writable;
                             }
                         } else {
                             writable = true;
                         }
                     }
                     if (writable == true) {
                         mapFile.push({
                             'fileId': mapFile.length + 1,
                             'node': actifNode[0].id,
                             'name': newName,
                             'extension': "." + newExt,
                             'size': '0',
                             'dateMod': getNowDate(),
                             'dateCreat': getNowDate(),
                             'app': "Text Editor",
                             'image_url': "",
                             'dateLastAcces': getNowDate(),
                             'author': "Anonymous",
                             'content': ""
                         });

                         $tree.jstree('open_node', actifNode[0].id);
                         $container.find(".modali").hide();
                         displayDirContent(actifNode[0].id);

                         evName = "Mcontextuel - Création de fichier";
                         evCollector(evName, newName, getDirName(actifNode[0].id));
                         dataFiles();
                     }
                 });

             }

             /**
              * New folder creation : 
              * Use of modal window to choose the name, the location is by default.
              * Check if name is unique in the parent directory
              * Then NewFolderCreator() write it.
              */
             function commandNewFolder() {
                 var actifNode = $tree.jstree(true).get_selected(true);
                 var newNodeData = {};
                 newNodeData.id = ID();
                 newNodeData.parent = actifNode[0].id;
                 newNodeData.text = "";
                 newNodeData.type = "default";
                 newNodeData.li_attr = {};
                 newNodeData.a_attr = {};
                 newNodeData.data = {};
                 newNodeData.data.type = "Répertoire";
                 newNodeData.data.dateMod = getNowDate();
                 newNodeData.data.dateCreat = getNowDate();

                 $container.find(".modali").show().css({
                     width: "500px",
                     height: "140px"
                 });
                 $container.find('.modalTitle').remove();

                 $container.find(".contentModal").html("<h3>Nouveau Répertoire</h3><input class='newFolderInput' type='text' placeholder='Nom du nouveau répertoire'><button class='createNewFolder'>OK</button><button class='annulModal'>Annuler</button>");
                 $container.find(".newFolderInput").css("width", "170px").focus();
                 $container.find(".annulModal").click(function () {
                     $container.find(".modali").hide();
                 });
                 $container.find(".createNewFolder").click(function () {
                     var writable;
                     var newName = $container.find(".newFolderInput").val();
                     var i, crashIt;
                     for (i = 0; i < treeFolder.length; i++) {
                         if (treeFolder[i].text == newName && treeFolder[i].parent == actifNode[0].id) {
                             crashIt = confirm("Un répertoire porte déjà ce nom à cet endroit ! Désirez-vous l'écraser ? Attention l'ensemble des sous-dossiers seront perdus.");
                             if (crashIt) {
                                 $tree.jstree().move_node(treeFolder[i].id, 'erased');
                                 writable = true;
                                 NewFolderCreator();
                                 return writable;
                             } else {
                                 writable = false;
                                 $container.find(".modali").hide();
                                 return writable;
                             }
                         } else {
                             writable = true;
                         }
                     }
                     if (writable == true) {
                         NewFolderCreator();
                     }

                     /**
                      * Create a new folder : using jstree, update json, update the datatable list, hide the modal window
                      */
                     function NewFolderCreator() {
                         var evName
                         newNodeData.text = newName;
                         treeFolder.push(newNodeData);

                         createNode("#" + actifNode[0].id + "_anchor", newNodeData.id, newNodeData.text, "last");

                         $tree.jstree('open_node', actifNode[0].id);

                         //Update complementary data to jstree
                         $tree.jstree(true).get_node(newNodeData.id).data = {};
                         $tree.jstree(true).get_node(newNodeData.id).data.dateMod = newNodeData.data.dateMod;
                         $tree.jstree(true).get_node(newNodeData.id).data.type = "Répertoire";
                         $tree.jstree(true).get_node(newNodeData.id).data.taille = "";
                         $tree.jstree(true).get_node(newNodeData.id).data.dateCreat = newNodeData.data.dateCreat;

                         displayDirContent(actifNode[0].id);
                         dataFolder();
                         evName = "Mcontextuel - Création de répertoire";
                         evCollector(evName, newNodeData.text, getDirName(newNodeData.parent));
                         $container.find(".modali").hide();
                     }
                 });
             }

             /**
              * Use jstree to create a new node.
              * @param {obj} parent_node 
              * @param {string} new_node_id 
              * @param {string} new_node_text 
              * @param {val} position 
              */
             function createNode(parent_node, new_node_id, new_node_text, position) {
                 $tree.jstree('create_node', $(parent_node), {
                     "text": new_node_text,
                     "id": new_node_id
                 }, position, false, false);
             }

             /**
              * Destroy a node or array of nodes
              * @param {*} selectedNodes :  array of selected nodes
              */
             function commandTrash(selectedNodes) {
                 var evName, folderToMove = [],
                     dirOn;
                 /**
                  * if selectedNodes is defined : commandtrash was activated from tree context menu
                  */
                 if (selectedNodes) {
                     for (var x = 0; x < selectedNodes.length; x++) {
                         var element = selectedNodes[x];

                         for (var i = 0; i < treeFolder.length; i++) {
                             var idfold = treeFolder[i];
                             if (idfold.id == element) {
                                 treeFolder[i].origin = treeFolder[i].parent;
                                 treeFolder[i].parent = "bin";
                                 $tree.jstree().move_node(idfold.id, 'bin');
                                 evName = "Mcontextuel - Suppression de Répertoire";
                                 evCollector(evName, treeFolder[i].text, getDirName(treeFolder[i].origin));
                                 dataFolder();
                             }
                         }
                     }
                 } else { //selectedNodes : the function was called from list context menu
                     SelectedArr = $fileList.rows({
                         selected: true
                     })[0];

                     for (var index = 0; index < SelectedArr.length; index++) {
                         var element = $fileList.rows('.selected').data()[index];

                         if (element[3] == "Répertoire") {
                             var sID = element[0];

                             for (var i = 0; i < treeFolder.length; i++) {
                                 if (treeFolder[i].id == sID) {
                                     treeFolder[i].origin = treeFolder[i].parent;
                                     dirOn = treeFolder[i].parent;
                                     treeFolder[i].parent = "bin";
                                     folderToMove.push(treeFolder[i].id); //Building array of node index to move later 
                                     evName = "Mcontextuel - Suppression de Répertoire vers corbeille";
                                     evCollector(evName, treeFolder[i].text, getDirName(treeFolder[i].origin));
                                     dataFolder();
                                 }

                             }
                         } else {
                             var sID = element[0] - 1;
                             mapFile[sID].origin = mapFile[sID].node;
                             dirOn = mapFile[sID].node;
                             mapFile[sID].node = "bin";
                             evName = "Mcontextuel - Suppression de fichier vers corbeille";
                             evCollector(evName, mapFile[sID].name + mapFile[sID].extension, getDirName(mapFile[sID].origin));
                             dataFiles();

                         }
                     }

                     //Moving the folders after changing table
                     for (var i = 0; i < folderToMove.length; i++) {
                         $tree.jstree().move_node(folderToMove[i], 'bin');
                     }
                     $tree.jstree(true).select_node(dirOn);
                     $tree.jstree(true).open_node(dirOn);
                     displayDirContent(dirOn);


                 }
                 $fileList.rows('.selected').remove().draw(); // Remove row from tables

             };

             /**
              * Rename a file or a folder. 
              * Check if one file or folder is highlighted (zero or more than one is not accepted) 
              * Check if the name is available
              * The name format is not checked(everything accepted)
              * @param {*} selectedNodeId 
              * @param {*} selectedNodeName 
              */
             function commandRename(selectedNodeId, selectedNodeName) {
                 var element, evName;
                 var activDir = $tree.jstree(true).get_selected();
                 var renamable = true;
                 if (!selectedNodeId) {
                     // Warning mono selection only
                     SelectedArr = $fileList.rows({
                         selected: true
                     })[0];
                     if (SelectedArr.length > 1) {
                         alert("Attention plusieurs éléments ont été sélectionnés");
                     } else if (!SelectedArr.length) {
                         alert("Attention aucun élément n'est sélectionné");
                     } else {
                         for (var index = 0; index < SelectedArr.length; index++) {
                             var indexElement = SelectedArr[index];
                             element = $fileList.row(indexElement).data();
                             if (element[3] == "Répertoire") {
                                 $container.find(".contentModal").html("<h3>Renommer le répertoire</h3><input class='renamerInput' type='text' value=" + getFolderName(element[0]) + " ><button class='btDirRenamer'>OK</button><button class='annulModal'>Annuler</button>");
                                 $container.find(".btDirRenamer").click(function () {
                                     for (var i = 0; i < treeFolder.length; i++) {
                                         if (treeFolder[i].id == element[0]) {
                                             // Verify
                                             var newName = $container.find(".renamerInput").val();
                                             for (var y = 0; y < treeFolder.length; y++) {
                                                 if (treeFolder[y].text == newName && treeFolder[y].parent == treeFolder[i].parent) {
                                                     alert("Un répertoire porte déjà ce nom à cet endroit ! Impossible de le renommer ainsi. Choisissez un autre nom.");
                                                     renamable = false;
                                                     return renamable
                                                 } else {
                                                     renamable = true;
                                                 }
                                             }
                                             if (renamable) {
                                                 $tree.jstree('rename_node', $tree.jstree(true).get_node(treeFolder[i].id), $container.find(".renamerInput").val());
                                                 treeFolder[i].originalName = treeFolder[i].text
                                                 treeFolder[i].text = newName;
                                                 treeFolder[i].data.dateMod = getNowDate();
                                                 $tree.jstree(true).refresh();
                                                 evName = "Mcontextuel - Renommage du répertoire";
                                                 evCollector(evName, treeFolder[i].originalName, treeFolder[i].text);
                                                 dataFolder();
                                             }

                                         }
                                     }
                                     $container.find(".modali").hide();
                                     displayDirContent(activDir);
                                 });

                             } else {
                                 /**
                                  * element[0] is id of file in mapFile
                                  */
                                 for (var ix = 0; ix < mapFile.length; ix++) {
                                     var fileElement = mapFile[ix];
                                     if (fileElement.fileId == element[0]) {
                                         $container.find(".contentModal").html("<h3>Renommer le fichier</h3><input class='renamerInput' type='text' value=" + getFileName(element[0]) + "> . <input class='RenameExtension' type='text' value=" + getExtension(element[0]).substring(1) + "><button class='btFileRenamer'>OK</button><button class='annulModal'>Annuler</button>");
                                         var protectedFile = fileElement; // necessary -fileElement is lost in following function !    
                                         $container.find(".btFileRenamer").click(function () {
                                             // Check the name + ext in same dir                                        
                                             if (protectedFile.name == $container.find(".renamerInput").val() && protectedFile.extension == "." + $container.find(".RenameExtension").val() && protectedFile.node == activDir) {
                                                 alert("Un fichier porte déjà ce nom et cette extension à cet endroit ! Impossible de le renommer ainsi. Choisissez un autre nom.");
                                                 renamable = false;
                                                 return renamable
                                             } else {
                                                 var oldName = protectedFile.name + protectedFile.extension;
                                                 protectedFile.name = $container.find(".renamerInput").val();
                                                 protectedFile.extension = "." + $container.find(".RenameExtension").val();
                                                 renamable = true;
                                             }
                                             if (renamable) {
                                                 var newName = protectedFile.name + protectedFile.extension;
                                                 protectedFile.dateMod = getNowDate();
                                                 $container.find(".modali").hide();
                                                 $tree.jstree('open_node', activDir);
                                                 displayDirContent(activDir);
                                                 evName = "Mcontextuel - Renommer le fichier";
                                                 evCollector(evName, oldName, newName);
                                                 dataFiles();
                                             }
                                         });
                                     }
                                 }
                             }
                         }
                         $container.find(".modali").show().css({
                             width: "600px",
                             height: "140px"
                         });
                         $container.find(".renamerInput").css("width", "170px").focus();
                         $container.find('.modalTitle').remove();


                         $container.find(".annulModal").click(function () {
                             $container.find(".modali").hide();
                         });

                     }

                 } else {

                     $container.find(".modali").show().css({
                         width: "500px",
                         height: "140px"
                     });
                     $container.find(".renamerInput").css("width", "170px").focus();
                     $container.find(".contentModal").html("<h3>Renommer le répertoire</h3><input class='renamerInput' type='text' value=" + selectedNodeName + " ><button class='btDirRenamer'>OK</button><button class='annulModal'>Annuler</button>");
                     $container.find(".annulModal").click(function () {
                         $container.find(".modali").hide();
                     });
                     $container.find(".btDirRenamer").click(function () {
                         for (var i = 0; i < treeFolder.length; i++) {
                             if (treeFolder[i].id == selectedNodeId) {
                                 // Verify
                                 var newName = $container.find(".renamerInput").val();

                                 for (var y = 0; y < treeFolder.length; y++) {
                                     if (treeFolder[y].text == newName && treeFolder[y].parent == treeFolder[i].parent) {
                                         alert("Un répertoire porte déjà ce nom à cet endroit ! Impossible de le renommer ainsi. Choisissez un autre nom.");
                                         renamable = false;
                                         return renamable
                                     } else {
                                         renamable = true;
                                     }

                                 }
                                 if (renamable) {
                                     $tree.jstree('rename_node', $tree.jstree(true).get_node(treeFolder[i].id), $container.find(".renamerInput").val());
                                     treeFolder[i].originalName = treeFolder[i].text
                                     treeFolder[i].text = newName;
                                     treeFolder[i].data.dateMod = getNowDate();
                                     $tree.jstree(true).refresh();
                                     evName = "Mcontextuel - Renommage du répertoire";
                                     evCollector(evName, treeFolder[i].originalName, treeFolder[i].text);
                                     dataFolder();
                                 }
                             }
                         }
                         $container.find(".modali").hide();
                         $tree.jstree('open_node', activDir);
                         displayDirContent(activDir);
                     });
                 }
             };

             /**
              * Display properties modal window for a file or a folder.
              * @param {*} selectedNode 
              */
             function commandProperties(selectedNode) {
                 var evName;

                 if (selectedNode) { // The node tree has been clicked

                     $container.find(".fakeModalWindow").html('<div class="modalTitle"><div class="windowTools"></div></div>');
                     $container.find(".modalTitle").css({
                         height: "37px",
                         opacity: "0.8"
                     });
                     $container.find('.windowTools').html(
                         '<div class="icoClose annulModal"></div>'
                     );

                     if (selectedNode[0].parent == "#") {
                         $container.find(".contentModal").html("<h3>Propriétés</h3>" +
                             "<ul class = 'nav nav-tabs'> <li class = 'active'> <a data-toggle = 'tab' href='#home'> Général </a></li> <li><a data-toggle = 'tab' href='#menu1'> Sécurité </a></li> <li> <a data-toggle = 'tab' href='#menu2'> Détails </a></li> </ul>" +
                             "<div class='tab-content'> <div id='home' class='tab-pane fade in active'> <h3>Localisation -> " + selectedNode[0].text + "</h3><p>Informations : <ul><li>Répertoire parent : - <li>Date de création : " + euroDate(selectedNode[0].data.dateCreat) + "<li>Date de dernière modification : " + euroDate(selectedNode[0].data.dateMod) + " </ul> </p> </div> <div id = 'menu1' class='tab-pane fade'><h3> Sécurité </h3> <p>Vous ne disposez pas des autorisations pour accéder à ces informations</p> </div> <div id='menu2' class='tab-pane fade'> <h3>Détails</h3> <p>Ce répertoire a été crée par</p><p> .... vous ne disposez pas des droits pour accéder à cette information.</p> </div> </div><button class='annulModal'>Fermer</button>");

                     } else {
                         $container.find(".contentModal").html("<h3>Propriétés</h3>" +
                             "<ul class = 'nav nav-tabs'> <li class = 'active'> <a data-toggle = 'tab' href='#home'> Général </a></li> <li><a data-toggle = 'tab' href='#menu1'> Sécurité </a></li> <li> <a data-toggle = 'tab' href='#menu2'> Détails </a></li> </ul>" +
                             "<div class='tab-content'> <div id='home' class='tab-pane fade in active'> <h3>Localisation -> " + selectedNode[0].text + "</h3><p>Informations : <ul><li>Répertoire parent : " + getDirName(selectedNode[0].parent) + "<li>Date de création : " + euroDate(selectedNode[0].data.dateCreat) + "<li>Date de dernière modification : " + euroDate(selectedNode[0].data.dateMod) + "<li>Capacité : " + bytUnit(selectedNode[0].data.capacity) + "<li>Espace disponible : " + bytUnit(freeSpace(selectedNode[0])) + "</ul> </p> </div> <div id = 'menu1' class='tab-pane fade'><h3> Sécurité </h3 > <p> Vous ne disposez pas des autorisations pour accéder à ces informations </p> </div > <div id = 'menu2' class = 'tab-pane fade'> <h3> Détails </h3> <p>Ce répertoire a été crée par</p><p> ....vous ne disposez pas des droits pour accéder à cette information. </p> </div > </div><button class='annulModal'>Fermer</button > ");
                     }

                     $container.find(".modali").show().css({
                         width: "500px",
                         height: "500px"
                     });
                 } else {
                     var SelectedArr = $fileList.rows({
                         selected: true
                     })[0];
                     var indexElement = SelectedArr[0];
                     var element = $fileList.row(indexElement).data();
                     if (SelectedArr.length == 0) {
                         alert("Aucun élément n'est sélectionné dans la liste.");
                     } else {
                         if (element[3] == "Répertoire" || element[3] == "Mémoire Flash" || element[3] == "Lecteur Optique CD" || element[3] == "Mémoire Flash usb" || element[3] == "Volume") {
                             for (var i = 0; i < treeFolder.length; i++) {
                                 if (treeFolder[i].id == element[0]) {
                                     $container.find(".fakeModalWindow").html('<div class="modalTitle"><div class="windowTools"></div></div>');
                                     $container.find('.windowTools').html(
                                         '<div class="icoClose annulModal"></div>'
                                     );
                                     $container.find(".modalTitle").css({
                                         height: "37px",
                                         opacity: "0.8"
                                     });
                                     $container.find(".contentModal").html("<h3>Propriétés</h3>" +
                                         "<ul class = 'nav nav-tabs'> <li class = 'active'> <a data-toggle = 'tab' href='#home'> Général </a></li> <li><a data-toggle = 'tab' href='#menu1'> Sécurité </a></li> <li> <a data-toggle = 'tab' href='#menu2'> Détails </a></li> </ul>" +
                                         "<div class='tab-content'> <div id='home' class='tab-pane fade in active'> <h3>Nom du répertoire : " + treeFolder[i].text + "</h3><p>Informations : <ul><li>Répertoire parent : " + getDirName(treeFolder[i].parent) + "<li>Date de création : " + euroDate(treeFolder[i].data.dateCreat) + "<li>Date de dernière modification : " + euroDate(treeFolder[i].data.dateMod) + "<li>Capacité : " + bytUnit(treeFolder[i].data.capacity) + "<li>Espace disponible : " + bytUnit(treeFolder[i].data.freeSpace) + "</ul> </p> </div> <div id = 'menu1' class='tab-pane fade'><h3> Sécurité </h3> <p>Vous ne disposez pas des autorisations pour accéder à ces informations</p> </div> <div id='menu2' class='tab-pane fade'> <h3>Détails</h3> <p>Ce répertoire a été crée par</p><p> .... vous ne disposez pas des droits pour accéder à cette information.</p> </div> </div><button class='annulModal'>Fermer</button>");
                                     $container.find(".modali").show().css({
                                         width: "500px",
                                         height: "500px"
                                     });

                                     evName = "Consultation des propriétés du répertoire";
                                     evCollector(evName, treeFolder[i].text, getDirName(treeFolder[i].parent));
                                 }
                             }
                         } else {
                             for (var i = 0; i < mapFile.length; i++) {
                                 if (mapFile[i].fileId == element[0]) {
                                     $container.find(".fakeModalWindow").html('<div class="modalTitle"><div class="windowTools"></div></div>');
                                     $container.find('.windowTools').html(
                                         '<div class="icoClose annulModal"></div>'
                                     );

                                     $container.find(".modalTitle").css({
                                         height: "37px",
                                         opacity: "0.8"
                                     });

                                     $container.find(".contentModal").html("<h3>Propriétés</h3>" +
                                         "<ul class = 'nav nav-tabs'> <li class = 'active'> <a data-toggle = 'tab' href='#home'> Général </a></li> <li><a data-toggle = 'tab' href='#menu1'> Sécurité </a></li> <li> <a data-toggle = 'tab' href='#menu2'> Détails </a></li> </ul>" +
                                         "<div class='tab-content'> <div id='home' class='tab-pane fade in active'> <h3>Nom du fichier : " + mapFile[i].name + mapFile[i].extension + "</h3><p>Informations : <ul><li>Répertoire parent : " + getDirName(mapFile[i].node) + "<li>Date de création : " + euroDate(mapFile[i].dateCreat) + "<li>Date de dernière modification : " + euroDate(mapFile[i].dateMod) + "<li>Date du dernier accès : " + euroDate(mapFile[i].dateLastAcces) + "<li>Application associée : " + mapFile[i].app + "<li>Auteur : " + mapFile[i].author + "</ul> </p> </div> <div id = 'menu1' class='tab-pane fade'><h3> Sécurité </h3> <p>Vous ne disposez pas des autorisations pour accéder à ces informations</p> </div> <div id='menu2' class='tab-pane fade'> <h3>Détails</h3> <p>Ce répertoire a été crée par</p><p> .... vous ne disposez pas des droits pour accéder à cette information.</p> </div> </div><button class='annulModal'>Fermer</button>");
                                     $container.find(".modali").show().css({
                                         width: "500px",
                                         height: "500px"
                                     });

                                     evName = "Consultation des propriétés du fichier";
                                     evCollector(evName, mapFile[i].name + mapFile[i].extension, getDirName(mapFile[i].node));

                                 }
                             }
                         }
                     }
                 }

                 $container.find(".annulModal").click(function () {
                     $container.find(".modali").hide();
                 });
             }

             /**
              * move data from bin to erased folder (invisible).
              */
             function commandEmptyTrash() {
                 var evName
                 confirm("Vous allez vider la corbeille... Les données seront définitivement effacées.");
                 var activDir = $tree.jstree(true).get_selected();
                 //All elements are moved to the invisible folder Erased
                 //Files to Erase
                 for (var index = 0; index < mapFile.length; index++) {
                     if (mapFile[index].node == "bin") {
                         mapFile[index].node = "erased";
                         evName = "Mcontextuel - Destruction définitive de fichier";
                         evCollector(evName, mapFile[index].name + mapFile[index].extension, getDirName(mapFile[index].origin));
                         dataFiles();
                     }
                 }

                 //Directories to Erase
                 for (var i = 0; i < treeFolder.length; i++) { //Look throught Json Folders 
                     if (treeFolder[i].parent == "bin") {
                         $tree.jstree().move_node(treeFolder[i].id, "erased");
                         treeFolder[i].parent = "erased";
                         evName = "Mcontextuel Destruction définitive de répertoire";
                         evCollector(evName, treeFolder[i].text, getDirName(treeFolder[i].origin));
                         dataFolder();
                     }
                 }
                 displayDirContent(activDir);
                 $tree.jstree('open_node', activDir);
             }

             /**
              * Move element from the bin to the original position. This info must be stored in mapFile[x].origin
              */
             function commandRestaure() {
                 var evName;
                 var activDir = $tree.jstree(true).get_selected();
                 if (activDir == "bin") {
                     SelectedArr = $fileList.rows({
                         selected: true
                     })[0];
                     for (var index = 0; index < SelectedArr.length; index++) {
                         var indexElement = SelectedArr[index];
                         var element = $fileList.row(indexElement).data();
                         // get only files id no directories !
                         for (var i = 0; i < mapFile.length; i++) {
                             var idf = mapFile[i];
                             if (idf.fileId == element[0]) {
                                 mapFile[i].node = mapFile[i].origin;
                                 mapFile[i].origin = "bin";
                                 evName = "Mcontextuel - Restaurer fichier de la corbeille";
                                 evCollector(evName, mapFile[i].name + mapFile[i].extension, getDirName(mapFile[i].node));
                                 dataFiles();
                             }
                         }
                         // Second for loop to get directories
                         for (var i = 0; i < treeFolder.length; i++) {
                             var idfold = treeFolder[i];
                             if (idfold.id == element[0]) {
                                 treeFolder[i].parent = treeFolder[i].origin;
                                 treeFolder[i].origin = "bin";
                                 //$tree.jstree().hide_node(idfold.id);
                                 $tree.jstree().move_node(idfold.id, 'bin');
                                 dataFolder();
                                 evName = "Mcontextuel Restauration de répertoire";
                                 evCollector(evName, treeFolder[i].text, getDirName(treeFolder[i].parent));

                             }
                         }
                     }
                     $tree.jstree(true).refresh();
                 } else {
                     $tree.jstree('deselect_all');
                     $tree.jstree('select_node', 'bin');
                     $tree.jstree('open_node', 'bin');
                 }

             }

             /**
              * Fake opening for a file or folder.
              * In case of file: some of them have a special treatment : images, texte.
              * The fileCall function take this part.
              */
             function commandOpen() {
                 var evName;
                 var SelectedArr = $fileList.rows({
                     selected: true
                 })[0];
                 if (SelectedArr.length == 0) {
                     alert("Aucun fichier ou répertoire n'a été sélectionné. Sélectionner d'abord un élément de la liste ou double cliquer sur l'élément pour l'ouvrir")
                 } else {
                     var indexElement = SelectedArr[0];
                     var element = $fileList.row(indexElement).data();
                     // test File or Folder ?
                     if (element[3] == "Répertoire" || element[3] == "Mémoire Flash" || element[3] == "Lecteur Optique CD" || element[3] == "Mémoire Flash usb" || element[3] == "Volume") {
                         $tree.jstree('deselect_all');
                         $tree.jstree('select_node', element[0]);
                         $tree.jstree('open_node', element[0]);
                     } else { //file
                         for (var i = 0; i < mapFile.length; i++) {
                             if (element[0] == mapFile[i].fileId) {
                                 evName = "Mcontextuel - ouvrir fichier";
                                 evCollector(evName, mapFile[i].name + mapFile[i].extension, getDirName(mapFile[i].node));
                                 fileCall(mapFile[i].name + mapFile[i].extension, $tree.jstree(true).get_selected()); //file name + activDir
                             };
                         }
                     }

                 }
             }

             //***************End Context Mend Command************************/

             //************Modal windows functions******************************************/
             /**
              * change date format.
              * @param {date} isodate  Date in Iso format
              * @returns {date} the date in dd/mm/yyyy format
              */
             function euroDate(isodate) {
                 var eurodate;
                 if (!isNaN(isodate[0])) {
                     var dateObj = new Date(isodate);
                     eurodate = ('0' + dateObj.getDate()).slice(-2) + '/' + ('0' + (dateObj.getMonth() + 1)).slice(-2) + '/' + dateObj.getFullYear();
                 } else {
                     eurodate = "-";
                 }
                 return eurodate;
             }

             /**
              * Create unique ID
              * @returns {string} unique id
              */
             function ID() {
                 return '_' + Math.random().toString(36).substr(2, 9);
             };

             /**
              * Get date to complete info on creation file or folder.
              * @returns {date}  date of the day in a formated string
              */
             function getNowDate() {
                 var today = new Date();
                 return today.toISOString().substring(0, 10).replace(/-/g, "/");
             }

             /**
              * Get the name of a folder
              * @param {*} id 
              * @returns {string} name of directory
              */
             function getDirName(id) {
                 for (var i = 0; i < treeFolder.length; i++) {
                     if (id == treeFolder[i].id) {
                         var namer = treeFolder[i].text;
                     }
                 }
                 return namer;
             }

             /**
              * Cancel default contextMenu event !  
              */
             $container.find("div").on("contextmenu", function (event) {
                 event.preventDefault(); // event must be specified in(event) for Firefox    
             });
             $container.find("nav").on("contextmenu", function (event) {
                 event.preventDefault();
                 return false;
             });

             /**
              * Context Menu listener
              */
             $container.find(".fileZone").on("contextmenu", function (event) {
                 event.preventDefault();
             });

             /**
              * Close context menu when another element is clicked
              */
             $container.find(".accesRapide").on("click", function () {
                 $container.find('.ctxMenu').css("display", "none");
             });
             $container.find(".navbar").on("click", function () {
                 $container.find('.ctxMenu').css("display", "none");
             });
             $container.find(".path").on("click", function () {
                 $container.find('.ctxMenu').css("display", "none");
             });
             $container.find(".fileZone").on("click", function () {
                 $container.find('.ctxMenu').css("display", "none");
             });


             /**
              *  Context Menu Files and folders
              */
             var $ctxMenu = $container.find(".ctxMenu");
             $container.find(".fileZone").contextmenu(function (event) {
                 $ctxMenu.css("display", "block");
                 $ctxMenu.css("left", (event.pageX - 200) + "px");
                 $ctxMenu.css("top", (event.pageY - 50) + "px");
             });
             $container.find(".explo").on("click", function () {
                 $ctxMenu.css("display", "none");
             })
             /**
              * Order sender from contextMenu
              */
             $container.find(".copyOrder").on("click", function () {
                 commandCopy();
                 $ctxMenu.css("display", "none");
             });

             $container.find(".cutOrder").on("click", function () {
                 commandCut();
                 $ctxMenu.css("display", "none");
             });

             $container.find(".pasteOrder").on("click", function () {
                 commandPaste();
                 $ctxMenu.css("display", "none");
             });

             $container.find(".newFileOrder").on("click", function () {
                 commandNewFile();
                 $ctxMenu.css("display", "none");
             });

             $container.find(".newFolderOrder").on("click", function () {
                 commandNewFolder();
                 $ctxMenu.css("display", "none");
             });

             $container.find(".openOrder").on("click", function () {
                 commandOpen();
                 $ctxMenu.css("display", "none");
             });

             $container.find(".renameOrder").on("click", function () {
                 commandRename();
                 $ctxMenu.css("display", "none");
             });
             $container.find(".deleteOrder").on("click", function () {
                 commandTrash();
                 $ctxMenu.css("display", "none");
             });
             $container.find(".propsOrder").on("click", function () {
                 commandProperties();
                 $ctxMenu.css("display", "none");
             });
             $container.find(".emptyTrashOrder").on("click", function () {
                 commandEmptyTrash();
                 $ctxMenu.css("display", "none");
             });
             $container.find(".restaureOrder").on("click", function () {
                 commandRestaure();
                 $ctxMenu.css("display", "none");
             });
             $container.find(".homeOrder").on("click", function () {
                 $tree.jstree('deselect_all');
                 $tree.jstree('select_node', 'root');
                 $tree.jstree('open_node', "root");
                 $ctxMenu.css("display", "none");
             });
             //End of Context Menu Files and Folders


             /**
              * Check if the string is a URL : determine if a distant image is associated to a file.
              * @param {string} str check url data for a file
              */
             function isURL(str) {
                 var pattern = new RegExp('^(https?:\\/\\/)?' + // protocol
                     '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.?)+[a-z]{2,}|' + // domain name
                     '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
                     '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
                     '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
                     '(\\#[-a-z\\d_]*)?$', 'i'); // fragment locator
                 return pattern.test(str);
             }


             /**
              *Call app on file  - action associated to a file.
              */
             function fileCall(targetName, targetPlace) {
                 var evName;
                 for (var i = 0; i < mapFile.length; i++) {
                     var filetname = mapFile[i].name + mapFile[i].extension;
                     if (filetname == targetName && mapFile[i].node == targetPlace) {

                         mapFile[i].dateLastAcces = getNowDate();
                         var appImgUrl = mapFile[i].image_url;
                         if (!appImgUrl) {
                             appImgUrl = assetManager.resolve('explo/runtime/assets/Processing.png');
                         }

                         if (mapFile[i].extension == ".txt" || mapFile[i].extension == ".doc" || mapFile[i].extension == ".docx") {

                             var indexMap = i;

                             if (mapFile[i].content) {
                                 var content = mapFile[i].content
                             }
                             if (!content) {
                                 content = " "
                             }

                             $container.find(".modalApp").show().css({
                                 width: "700px",
                                 height: "530px",
                                 padding: "10px",
                                 "text-align": "center"
                             });
                             $container.find('.windowToolbar').html(
                                 '<div class="icoClose closeWindow"></div>'
                             ).hide();
                             $container.find(".contentModalApp").addClass("imageAppContainer");
                             var editorID = ID();
                             $container.find(".contentModalApp").html("<textarea class='richContent' cols='300' id=" + editorID + ">" + content + "</textarea><img class='waitIcon' src= " + assetManager.resolve('explo/runtime/assets/Loading_icon.gif') + ">");
                             $('.richContent').richText();


                             $container.find('.nicEdit-panelContain').parent().width('100%');
                             $container.find('.nicEdit-panelContain').parent().next().width('98%');
                             $container.find('.nicEdit-panelContain').parent().next().height('250px');
                             $container.find('.nicEdit-main').width('98%');

                             $container.find(".waitIcon").hide();
                             $container.find('.windowToolbar').show();
                             $container.find(".contentModalApp").append("<button class='saveTxt butcloser'>Sauvegarder et fermer</button><button class='annulModal butcloser'>fermer sans sauvegarder</button>")
                             $container.find(".annulModal").click(function () {
                                 $container.find(".modalApp").hide();
                                 $container.find(".saveTxt").remove();
                                 evName = "Fermeture du fichier texte sans sauvegarder";
                                 evCollector(evName, mapFile[indexMap].name, mapFile[indexMap].content);
                             });


                             $container.find(".saveTxt").click(function txtSaver(params) {
                                 mapFile[indexMap].dateMod = getNowDate();

                                 mapFile[indexMap].content = $container.find(".richText-editor")[0].innerText;
                                 mapFile[indexMap].size = mapFile[indexMap].content.length / 10;
                                 dataFiles();
                                 evName = "Sauvegarde du fichier texte";
                                 evCollector(evName, mapFile[indexMap].name, mapFile[indexMap].content);

                                 $container.find(".modalApp").hide();
                                 $container.find(".saveTxt").remove();
                                 $tree.jstree(true).open_node(mapFile[indexMap].node);
                                 displayDirContent(targetPlace);
                             })

                             $container.find(".closeWindow").click(function () {
                                 $container.find(".modalApp").hide();
                                 $container.find(".saveTxt").remove();
                             });

                         } else if (isURL(appImgUrl)) {
                             var indexMap = i;

                             $container.find(".modalApp").show().css({
                                 width: "1000px",
                                 height: "550px"
                             });
                             $container.find('.windowToolbar').html(
                                 '<div class="icoClose closeWindow"></div>'
                             );
                             $container.find('.windowToolbar img').addClass('closeWindow');
                             $container.find(".contentModalApp").addClass("imageAppContainer");
                             $container.find(".contentModalApp").html("<button class='annulModal topButtonCloser'>Fermer l'application et retourner à l'explorateur de fichiers</button><img class='imageApp' src=" + appImgUrl + ">");

                             $container.find(".annulModal").click(function () {
                                 $container.find(".modalApp").hide();
                                 evName = "Confirmation de la consultation de l'image liée au fichier";
                                 evCollector(evName, mapFile[indexMap].name + mapFile[indexMap].extension, getDirName(mapFile[indexMap].node));

                             });

                             $container.find(".closeWindow").click(function () {
                                 $container.find(".modalApp").hide();
                             });

                         } else if (mapFile[i].extension == ".js" ||
                             mapFile[i].extension == ".xls" ||
                             mapFile[i].extension == ".doc" ||
                             mapFile[i].extension == ".ppt") {
                             $container.find(".modali").show().css({
                                 width: "500px",
                                 height: "500px"
                             });
                             $container.find(".windowTools").hide();
                             $container.find(".contentModal").html("<br /><hr><h2>Vous venez de lancer l'application permettant d'ouvrir ce fichier.</h2><img class='processing' width='430px' src=" + assetManager.resolve('explo/runtime/assets/Processing.png') + "/><button class='annulModal'>Retourner à l'explorateur de fichiers</button>");
                             $container.find(".annulModal").click(function () {
                                 $container.find(".modali").hide();
                             });
                         } else {
                             alert("Aucune application n'est associée à ce type de fichier.");
                         }

                     };
                 }

             }

             //************** Chapter Search ******************
             /**
              * Search tool
              */
             searchResultArr = []; // reset befor sending research
             onlyOne = 0;
             /**
              * search trigger
              */
             $container.find(".magnify").on('click', function () {
                 var el = $container.find(".searchInput").val(); // element to search
                 var startSearchId = $tree.jstree(true).get_selected()[0];
                 if (!startSearchId) {
                     startSearchId = 'root';
                 }
                 onlyOne = 0;
                 if (el) {
                     cleanSearch();
                     searchResultArr = [];
                     searchElement(el, startSearchId);
                     $tree.jstree('deselect_all');
                     $tree.jstree('select_node', "searchResult"); // But remains invisible 
                 } else {
                     alert("Préciser votre recherche");
                 }
             });

             /**
              * Jstree give a very bad formated list of children.
              * Each element of the childre array must be inspected and reformated then sent back to the bellow function. 
              * @param {*} childBrut 
              */
             function reorganizeChildren(childBrut) {
                 var subtstring = childBrut.split("\n");
                 var result = [];
                 for (var i = 0; i < subtstring.length; i++) {
                     if (subtstring[i] !== " ") {
                         result.push(subtstring[i]);
                     }
                 }
                 return result;
             }

             /**
              * The search is relative and start from the activ dir.
              * Display searchResult in table but not in the tree section (no node highlighted)
              * The search result display the path in the list
              */
             function searchElement(el, startSearchId) {
                 var folderChildren = [];
                 var folderChildrenID = [];
                 $tree.jstree(true).open_all(startSearchId);
                 // jstree send bad formated results -> need to clean the children foldernames
                 var children = $tree.jstree("get_children_dom", startSearchId);

                 for (var i = 0; i < children.length; i++) {
                     var cleanChildren = reorganizeChildren(children[i].innerText);
                     for (var z = 0; z < cleanChildren.length; z++) {
                         folderChildren.push(cleanChildren[z]);
                     }
                 }

                 for (var u = 0; u < treeFolder.length; u++) {
                     for (var x = 0; x < folderChildren.length; x++) {
                         if (treeFolder[u].text == folderChildren[x]) {
                             if (folderChildrenID.indexOf(treeFolder[u].id) === -1) {
                                 folderChildrenID.push(treeFolder[u].id)
                             }
                         }
                     }
                 }
                 if (onlyOne == 0) {
                     baseSearchFile();
                     onlyOne++;
                 }

                 function baseSearchFile() {
                     folderChildrenID.push(startSearchId);
                     //Search files in the base and sub directory
                     for (var i = 0; i < mapFile.length; i++) {
                         //Check in reduced number of folder 
                         for (var ci = 0; ci < folderChildrenID.length; ci++) {
                             if (folderChildrenID[ci] == mapFile[i].node) {
                                 //First everything to lowerCase then compare.
                                 var childrenNameLC = mapFile[i].name.toLowerCase();
                                 var childrenExtLC = mapFile[i].extension.toLowerCase();
                                 var elLC = el.toLowerCase();
                                 var searchTestName = childrenNameLC.search(elLC);
                                 var searchTestExt = childrenExtLC.search(elLC);
                                 if (searchTestName >= 0 || searchTestExt >= 0) {
                                     var newId = mapFile.length + 1;
                                     var newEl = {
                                         'fileId': newId,
                                         'node': 'searchResult',
                                         'name': mapFile[i].name,
                                         'extension': mapFile[i].extension,
                                         'size': mapFile[i].size,
                                         'dateMod': mapFile[i].dateMod,
                                         'dateCreat': mapFile[i].dateCreat,
                                         'app': mapFile[i].app,
                                         'image_url': mapFile[i].image_url,
                                         'dateLastAcces': mapFile[i].dateLastAcces,
                                         'author': mapFile[i].author,
                                         'content': mapFile[i].content,
                                         'originalPath': mapFile[i].node
                                     };
                                     mapFile.push(newEl);
                                 }
                             }
                         }
                     }

                 }

                 baseSearchFolder(folderChildren);
                 /**
                  * Compare search string to foldernames
                  * @param {array} folderChildren 
                  */
                 function baseSearchFolder(folderChildren) {
                     var childrenNameLC, elLC, searchTest, scanRsFolder = [],
                         scanRsFolderID = [],
                         scanresult;

                     for (var i = 0; i < folderChildren.length; i++) {
                         // Everything to lowerCase
                         childrenNameLC = folderChildren[i].toLowerCase();
                         elLC = el.toLowerCase();
                         // Check if key search is in name folder
                         searchTest = childrenNameLC.search(elLC);
                         if (searchTest >= 0) {
                             scanRsFolder.push(folderChildren[i])
                         }
                     }

                     // Find id from names for each element of scanRsfolder
                     for (var a = 0; a < scanRsFolder.length; a++) {
                         for (var wi = 0; wi < treeFolder.length; wi++) {
                             if (treeFolder[wi].text == scanRsFolder[a]) {
                                 if (scanRsFolderID.indexOf(treeFolder[wi].id) === -1) {
                                     scanRsFolderID.push(treeFolder[wi].id)
                                 }
                             };
                         }
                     }

                     for (var b = 0; b < scanRsFolderID.length; b++) {
                         var pathSearchedfolder = $tree.jstree().get_path(scanRsFolderID[b]);
                         var newSearchName = "";
                         for (var s = 1; s < pathSearchedfolder.length; s++) {
                             var newSearchName = newSearchName + pathSearchedfolder[s] + "/";
                         }
                         var originalNode = $tree.jstree(true).get_node(scanRsFolderID[b]);
                         var copyOfNode = $tree.jstree(true).copy_node(scanRsFolderID[b], 'searchResult');
                         var copyObj = $tree.jstree(true).get_node(copyOfNode);
                         $tree.jstree().rename_node(copyOfNode, newSearchName);

                         copyObj.data = [];

                         copyObj.data.type = originalNode.data.type;
                         copyObj.data.dateMod = originalNode.data.dateMod;
                         copyObj.data.dateCreat = originalNode.data.dateCreat;
                         copyObj.data.originalPath = originalNode.parent;

                         treeFolder.push({
                             "id": copyOfNode,
                             "parent": "searchResult",
                             "text": newSearchName,
                             "type": copyObj.type,
                             "data": {
                                 "type": originalNode.data.type,
                                 "dateMod": originalNode.data.dateMod,
                                 "dateCreat": originalNode.data.dateCreat,
                                 'originalPath': originalNode.parent
                             }
                         });
                     }
                     return searchResultArr;
                 } //end of baseSearchFolder


             }


             function cleanSearch() {
                 for (var i = 0; i < treeFolder.length; i++) {
                     if (treeFolder[i].parent == 'searchResult') {
                         $tree.jstree(true).delete_node(treeFolder[i].id);
                     };
                 }
                 for (var y = 0; y < mapFile.length; y++) {
                     if (mapFile[y].node == 'searchResult') {
                         mapFile[y].node = 'archivSearch'; //All the files searched are archived
                         displayDirContent("searchResult");
                     }

                 }

             }



             /**
              * Define unit for file size and display a readable size format
              * @param {val} size 
              * @returns {val} readable size format
              * Kbyte is the unity in Json file.
              */
             function bytUnit(size) {
                 var rightSize;
                 var megabyteTest = parseInt(size) / 1000;
                 var gigabyteTest = parseInt(size) / 1000000;
                 var terabyteTest = parseInt(size) / 1000000000;

                 if (megabyteTest < 1) {
                     rightSize = Number.parseFloat(size).toFixed(2) + " Ko";
                 } else {
                     if (gigabyteTest < 1) {
                         rightSize = Number.parseFloat(megabyteTest).toFixed(2) + " Mo";
                     } else {
                         if (terabyteTest < 1) {
                             rightSize = Number.parseFloat(gigabyteTest).toFixed(2) + " Go";
                         } else {
                             rightSize = Number.parseFloat(terabyteTest).toFixed(2) + " To";
                         }
                     }
                 }
                 if (rightSize == 'NaN') {
                     return "-";
                 } else {
                     return rightSize;
                 }

             }


             /**
              * Get all children for folders even deep - Input = node object !
              * @param {obj} node 
              */
             function getAllChildren(node) {
                 var node_info = $tree.jstree("get_node", node[0]);
                 return node_info.children_d;
             }

             /**
              * find the vol for a node
              * @param {obj} node 
              */
             function getvol(node) {
                 var node_info = $tree.jstree("get_node", node);
                 if (node_info) {
                     //Two cases : normal folders and root folders
                     var parents = [];

                     if (node_info.data.type == "Volume" || node_info.data.type == "Mémoire Flash" || node_info.data.type == "Mémoire Flash usb") {
                         parents.push(node_info.id);
                     } else {
                         parents = node_info.parents;
                     }

                     for (var i = 0; i < parents.length; i++) {
                         for (var y = 0; y < treeFolder.length; y++) {
                             if (parents[i] == treeFolder[y].id && treeFolder[y].data.type == "Volume" ||
                                 parents[i] == treeFolder[y].id && node_info.data.type == "Mémoire Flash" ||
                                 parents[i] == treeFolder[y].id && node_info.data.type == "Mémoire Flash usb") {
                                 return treeFolder[y].id;
                             }
                         }
                     }
                 }

             }

             /**
              * Determine free space for a volume.
              * @param {obj} vol 
              */
             function freeSpace(vol) {
                 var freeSpace = 0,
                     occSpace = 0;
                 var ChildArray = [];
                 var tNode = $tree.jstree(true).get_node(vol, true)
                 ChildArray = getAllChildren(tNode);

                 // Add the root to the childArray (capacity of root must be included)
                 if (vol) {
                     if (ChildArray.indexOf(vol.id) === -1) {
                         ChildArray.push(vol.id)
                     }

                     //need to clean ChildArray (uniq ID)
                     var filteredArr = ChildArray.filter(function (item, index) {
                         if (ChildArray.indexOf(item) == index)
                             return item;
                     });

                     ChildArray = filteredArr;

                     //For root Volume
                     for (var i = 0; i < ChildArray.length; i++) {
                         for (var y = 0; y < mapFile.length; y++) {
                             if (mapFile[y].node == ChildArray[i]) {
                                 //Calculate the freespace
                                 occSpace = occSpace + parseInt(mapFile[y].size);
                             }
                         }
                     }
                     // FreeSpace evaluation
                     for (var i = 0; i < treeFolder.length; i++) {
                         if (treeFolder[i].id == vol.id) {
                             freeSpace = parseInt(treeFolder[i].data.capacity) - occSpace;
                             treeFolder[i].data.freeSpace = freeSpace;
                         }
                     }
                     return freeSpace;
                 } else {
                     return 10000000000;
                 } // Space is always enough because destination volume = origin volume

             }

             /**
              * Return free space
              * @param {string} desti 
              * @param {obj} element 
              * @param {string} operation 
              * @returns {number}  Free space value for a volume.
              */
             function testFreeSpace(desti, element, operation) { // desti is an id node, element is an object
                 var destiNodeId, originalVol, freespace, rest, tfSpace, size = element.size;
                 // get destination volume
                 destiNodeId = getvol(desti);
                 originalVol = getvol(element.origin);
                 if (destiNodeId == originalVol && operation == "move") {
                     tfSpace = true;
                     return tfSpace;
                 } else if (desti == "bin") {
                     tfSpace = true;
                     return tfSpace;
                 } else {
                     freespace = freeSpace($tree.jstree(true).get_node(destiNodeId));
                     rest = freespace - parseInt(size);
                     if (rest > 0) {
                         tfSpace = true
                     } else {
                         tfSpace = false
                     }
                     return tfSpace;
                 }
             }

             /**
              * Free space evaluation for folder (group of files in a node)
              * @param {*} desti 
              * @param {*} size 
              * @returns {boolean} evaluate if free space is available for operation paste
              */
             function testFreeSpaceFolder(desti, size) { // desti is an id node, size is a value
                 var destiNodeId, freespace, rest, tfSpace;
                 destiNodeId = getvol(desti);
                 freespace = freeSpace($tree.jstree(true).get_node(destiNodeId));
                 rest = freespace - parseInt(size);

                 if (rest > 0) {
                     tfSpace = true;
                 } else {
                     tfSpace = false
                 }
                 return tfSpace;
             }

             /**
              * Copy all files to new folder (keeping original name)
              * @param {*} orginalFolder 
              * @param {*} destiFolder 
              */
             function duplicateFilestoNewFolder(orginalFolder, destiFolder) {
                 for (var i = 0; i < mapFile.length; i++) {
                     if (mapFile[i].node == orginalFolder) {
                         mapFile.push({
                             'fileId': mapFile.length + 1,
                             'node': destiFolder,
                             'name': mapFile[i].name,
                             'extension': mapFile[i].extension,
                             'size': mapFile[i].size,
                             'dateMod': getNowDate(),
                             'dateCreat': mapFile[i].dateCreat,
                             'app': mapFile[i].app,
                             'image_url': mapFile[i].image_url,
                             'dateLastAcces': mapFile[i].dateLastAcces,
                             'author': mapFile[i].author,
                             'content': mapFile[i].content

                         });
                         return
                     }
                 }
             }




             // **************Answers builders ***********************************

             /**
              * Get the whole treefolder data, the files and clipBoard and store it for answering system.
              */
             function dataFolder() {
                 $container.find(".dataTree").html(JSON.stringify(treeFolder));
             }

             function dataFiles() {
                 $container.find(".dataFiles").html(JSON.stringify(mapFile));
             }

             function dataClipBoard() {
                 $container.find(".dataClipBoard").html(JSON.stringify(clipBoard));
             }


         } // Main function renderExplo end here 




         return {
             render: function (id, container, config, assetManager) {

                 var Scontainer = $(container);

                 renderExplo(id, Scontainer, config, assetManager);

             },
             renderExplo: function (id, container, config, assetManager) {
                 renderExplo(id, $(container), config, assetManager);
             }
         };
     });