/*
Build by Wiquid's PCI Generator for TAO platform Free to use 
 */

define(['explo/runtime/js/defaultConfig',
        'explo/runtime/js/lib/datatables', // Contains and extends JQuery
        'explo/runtime/js/lib/progressbar',
        'explo/runtime/js/lib/nicEdit',
        'taoQtiItem/portableLib/OAT/util/html'
    ],
    function (defaultjson, $, ProgressBar, nicEdit, html) {
        'use strict';


        function renderExplo(id, $container, config, assetManager) {

            /*
            mapFile : Json for files
            treeFolder : Json for Folders
            $fileList : Instance of DataTable
            DDFile and DDFolder : arrays for multiselection drag and drop
            SelectedArr : arrays for MultiSelection
            clipBoard : array for Cut/copy/paste clipboard
            bin : array for trash
            eventCollector : for the student answer          
            */
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

            //Default Json Loader

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

            // Collect event for answer 
            function evCollector(evName, var1, var2) {
                var evString = "{" + evName + ":{" + var1 + "," + var2 + "} }";
                eventCollector.push(evString);
                $container.find(".dataActions").html(eventCollector.join(","));
            }

            function runTree() {
                $tree = $container.find('.jstree');
                $tree.jstree({
                    'core': {
                        'data': function () {
                            return treeFolder
                        },
                        "check_callback": function (operation, node, node_parent, node_position, more) {
                            if (operation == 'move_node') {
                                if (node_parent.type == 'cdRom') {
                                    $tree.jstree(true).deselect_all();
                                    return false
                                } else if (node_parent.type == 'root') {
                                    $tree.jstree(true).deselect_all();
                                    return false
                                } else if (node_parent.type == 'netWork') {

                                    $tree.jstree(true).deselect_all();
                                    return false
                                } else if (node_parent.id == '#') {
                                    $tree.jstree(true).deselect_all();
                                    return false
                                } else {
                                    return true;
                                }
                            }
                        }
                    },
                    'plugins': ["contextmenu", "types", "dnd", "state", "unique", "wholerow"],
                    'contextmenu': {
                        'items': customMenu
                    },
                    'dnd': {
                        "is_draggable": function (node) {
                            if (node[0].type == "default") {
                                let evName = "Drag du répertoire depuis l'arborescence ";
                                evCollector(evName, "cf.drop pour nom du rep.", "-");
                                return true; // Controle draggable here --- flip switch here.
                            } else {
                                return false;
                            }
                        }
                        //check_while_dragging: true 
                    },
                    'types': {
                        "bin": {
                            "icon": assetManager.resolve('explo/runtime/css/img/bin.png')
                        },
                        "volume": {
                            "icon": assetManager.resolve('explo/runtime/css/img/hdrive.png')
                        },
                        "cdRom": {
                            "icon": assetManager.resolve('explo/runtime/css/img/cdrom.png')
                        },
                        "netWork": {
                            "icon": assetManager.resolve('explo/runtime/css/img/network.png')
                        },
                        "sdCard": {
                            "icon": assetManager.resolve('explo/runtime/css/img/sdcard.png')
                        },
                        "usb": {
                            "icon": assetManager.resolve('explo/runtime/css/img/usb.png')
                        },
                        "distant": {
                            "icon": assetManager.resolve('explo/runtime/css/img/distant.png')
                        },
                        'root': {
                            "icon": assetManager.resolve('explo/runtime/css/img/computer2.png')
                        }
                    }
                }).bind("move_node.jstree", function (e, data) {
                    destiTarget = data.parent;
                    let evName = "Déplacement de répertoire ";
                    evCollector(evName, getDirName(data.node.id), getDirName(data.parent));
                });

                $tree.jstree(true).settings.core.data = treeFolder;

                $tree.jstree(true).refresh();

                //Listen to drop in jstree specific mvt.
                $container.find(".explo").on("dnd_stop.vakata", function (e, data) {
                    for (let i = 0; i < treeFolder.length; i++) {
                        for (let y = 0; y < data.data.nodes.length; y++) {
                            if (treeFolder[i].id == data.data.nodes[y]) {
                                treeFolder[i].parent = destiTarget;
                                let activDir = $tree.jstree(true).get_selected();
                                $tree.jstree(true).select_node(activDir);
                                $tree.jstree(true).open_node(activDir);
                                displayDirContent(activDir);
                                dataFolder();
                            }
                        }
                    }
                });
            }

            function customMenu(node) {
                if ($tree.jstree("get_selected", true)[0].type == "volume") {
                    var items = {
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
                                let selectedNodeId = $tree.jstree("get_selected", true);
                                formater(selectedNodeId[0].text, selectedNodeId[0].id);

                            }
                        },
                        propertiesDir: {
                            label: "Propriétés",
                            action: function (obj) {
                                let selectedNode = $tree.jstree("get_selected", true);
                                commandProperties(selectedNode);
                            },
                            icon: "fa fa-cog"
                        }
                    }
                    return items;

                } else if ($tree.jstree("get_selected", true)[0].type == "root") {
                    var items = {
                        propertiesDir: {
                            label: "Propriétés",
                            action: function (obj) {
                                let selectedNode = $tree.jstree("get_selected", true);
                                commandProperties(selectedNode);
                            },
                            icon: "fa fa-cog"
                        }
                    }
                    return items;
                } else if ($tree.jstree("get_selected", true)[0].type == "usb" || $tree.jstree("get_selected", true)[0].type == "sdCard") {
                    var items = {
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
                                let selectedNodeId = $tree.jstree("get_selected", true);
                                formater(selectedNodeId[0].text, selectedNodeId[0].id);
                            }
                        },
                        propertiesDir: {
                            label: "Propriétés",
                            action: function (obj) {
                                let selectedNode = $tree.jstree("get_selected", true);
                                commandProperties(selectedNode);
                            },
                            icon: "fa fa-cog"
                        }
                    }
                    return items;

                } else if ($tree.jstree("get_selected", true)[0].type == "cdRom") {
                    var items = {
                        propertiesDir: {
                            label: "Propriétés",
                            action: function (obj) {
                                let selectedNode = $tree.jstree("get_selected", true);
                                commandProperties(selectedNode);
                            },
                            icon: "fa fa-cog"
                        }
                    }
                    return items;
                } else if ($tree.jstree("get_selected", true)[0].type == "bin") {
                    var items = {
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
                    var items = {
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
                                let SelectedArr = $tree.jstree("get_selected", true);
                                if (SelectedArr.length > 1) {
                                    alert("Attention plusieurs éléments ont été sélectionnés");
                                } else if (!SelectedArr.length) {
                                    alert("Attention aucun élément n'est sélectionné");
                                } else {
                                    let selectedNodeId = $tree.jstree("get_selected", true)[0].id;
                                    let selectedNodeName = $tree.jstree("get_selected", true)[0].text;
                                    commandRename(selectedNodeId, selectedNodeName);
                                }
                            },
                            icon: "fa fa-cog"
                        },
                        copierDir: {
                            label: "Copier",
                            action: function (obj) {
                                let selectedNodeId = $tree.jstree("get_selected", true)[0].id;
                                commandCopy(selectedNodeId);
                            },
                            icon: "fa fa-clipboard"
                        },
                        couperDir: {
                            label: "Couper",
                            action: function (obj) {
                                let selectedNodeId = $tree.jstree("get_selected", true)[0].id;
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
                                let selectedNodeId = $tree.jstree("get_selected");
                                commandTrash(selectedNodeId);
                            },
                            icon: "fa fa-trash"
                        },
                        propsDir: {
                            label: "Propriétés",
                            action: function (obj) {
                                let selectedNode = $tree.jstree("get_selected", true);
                                commandProperties(selectedNode);
                            },
                            icon: "fa fa-cog"
                        }
                    }
                    return items;

                }
            }


            //******************************************** Building File/Dir list -  dataTable Chapter *****************************************************            
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
                $container.find(".dirContent tbody").on('mouseenter', 'tr', function () {
                    $container.find(this).addClass('highlight');
                });
                $container.find(".dirContent tbody").on('mouseleave', 'tr', function () {
                    $container.find(this).removeClass('highlight');
                });

                // Listening list directories for browsing
                $container.find('.dirContent tbody').on('dblclick', 'tr', function (e) {

                    if ($fileList.row(this).data()[3] == "Répertoire" ||
                        $fileList.row(this).data()[3] == "Volume" ||
                        $fileList.row(this).data()[3] == "Mémoire Flash" ||
                        $fileList.row(this).data()[3] == "Mémoire Flash usb" ||
                        $fileList.row(this).data()[3] == "Lecteur Optique CD"
                    ) {
                        let saveSelectDir = $fileList.row(this).data()[0];
                        $tree.jstree('deselect_all');
                        $tree.jstree('select_node', saveSelectDir);

                        let evName = "Double Clic - ouverture de répertoire ou de volume";
                        evCollector(evName, getDirName(saveSelectDir), "-");

                        displayDirContent(saveSelectDir);
                    } else {
                        if (e.target.lastChild.data.search(".") == 0) {
                            let targetName = e.target.lastChild.data;
                            let targetPlace = $tree.jstree(true).get_selected();
                            fileCall(targetName, targetPlace);
                            let evName = "Double Clic - ouverture de fichier";
                            evCollector(evName, targetName, getDirName(targetPlace));
                        } else {
                            //Hypothetic case if file name loose the .
                            let targetName = e.target.lastChild.data;
                            let targetPlace = $tree.jstree(true).get_selected();
                            fileCall(targetName, targetPlace);
                        }
                    }
                });

            }
            //***********************JSTree : UI ***********************************/
            // Open folder with one Click instead of doubleClick
            $tree.bind("select_node.jstree", function (e, data) {
                return data.instance.toggle_node(data.node);
            });
            //*********************Tree Listening changes**************************/
            $tree.on("changed.jstree", function (e, data) {


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
            //Dynamic constitution of ShortCutList !
            for (let i = 0; i < treeFolder.length; i++) {
                // Items from ID : unique
                if (treeFolder[i].id == "vol1") {
                    $container.find(".listItemRapid").html('<li class="rapidLi vol1 icoHdrive">' + treeFolder[i].text + '</li>');
                };
                if (treeFolder[i].id == "images") {
                    $container.find(".listItemRapid").prepend('<li class = "rapidLi images icoCamera"> ' + treeFolder[i].text + ' </li>');
                };
                if (treeFolder[i].id == "videos") {
                    $container.find(".listItemRapid").prepend('<li class="rapidLi videos icoVideo">' + treeFolder[i].text + '</li>');
                };
                if (treeFolder[i].id == "documents") {
                    $container.find(".listItemRapid").prepend('<li class="rapidLi documents icoDocument">' + treeFolder[i].text + '</li>');
                };
                if (treeFolder[i].id == "downloads") {
                    $container.find(".listItemRapid").prepend('<li class="rapidLi downloads icoDownload">' + treeFolder[i].text + '</li>');
                };
            }


            // listening shortCuts click
            shortCutList = ['images', 'videos', 'documents', 'downloads', 'vol1', 'vol2', 'vol3', 'vol4', 'vol5', 'vol6'];
            for (let i = 0; i < shortCutList.length; i++) {
                const element = shortCutList[i];
                $container.find("." + element).on('click', function () {
                    $tree.jstree('deselect_all');
                    $tree.jstree('select_node', element);
                    displayDirContent(element);
                });
            }
            //SlideToggle of Quick access link
            $container.find(".accesRapide").addClass('fa fa-angle-down');
            $container.find(".QuickTitle").click(function () {
                $container.find(".listItemRapid").slideToggle();
            });






            //****************Display Folder Content******************************  
            function displayDirContent(activDir) {
                var dirData = $tree.jstree("get_children_dom", activDir);
                var exto, iconExt, labelExt, fileId, dataMod, dataCreat, orginalPath; // for files only

                for (let i = 0; i < treeFolder.length; i++) {
                    if (treeFolder[i].parent == activDir) {};
                }

                function pathDisplay(dirActiv) {
                    var pathArray = $tree.jstree("get_path", dirActiv);
                    var pathIdArray = $tree.jstree("get_path", dirActiv, '/', true);
                    var pathStrg = "";

                    if (pathIdArray) {
                        pathIdArray = pathIdArray.split("/");
                    }

                    for (let i = 0; i < pathArray.length; i++) {
                        const element = pathArray[i];
                        pathStrg = pathStrg + '/ <a href="#" class="pathElement" name = "' + pathIdArray[i] + '">' + element + '</a>';
                    }
                    $container.find(".pathLine").html(pathStrg);
                    $container.find(".pathElement").click(function () {
                        let nodeId = $container.find(this).attr('name');
                        $tree.jstree("deselect_all");
                        $tree.jstree('select_node', nodeId);
                        displayDirContent(nodeId); //Recursiv call with clicked folder
                        $tree.jstree('open_node', nodeId);
                    });
                }

                pathDisplay(activDir);

                // Table Reset
                $fileList
                    .clear()
                    .draw();

                // Select type to display the right tables structure  
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


                //Display Folder List
                function folderDisplayer() {
                    var originalPath = "",
                        rowFolder;
                    for (let i = 0; i < dirData.length; i++) {
                        if ($tree.jstree(true).get_node(dirData[i].id).parent == "searchResult") {
                            originalPath = $tree.jstree(true).get_path(getOriginalPath(dirData[i].id));
                            originalPath.shift();
                            originalPath = originalPath.join('/');
                        }
                        rowFolder = $fileList.row.add([
                            dirData[i].id,
                            "<span class='secretId'>" + dirData[i].id + "</span><img class = 'preIcon' src = " + getIconExt("") + " >" + $tree.jstree(true).get_node(dirData[i].id).text,
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

                function getOriginalPath(idNode) {
                    var oPath;
                    for (let i = 0; i < treeFolder.length; i++) {
                        if (treeFolder[i].id == idNode) {
                            oPath = treeFolder[i].data.originalPath;
                        }
                    }
                    return oPath;
                }

                //Display volume list from root
                function volumeDisplayer() {
                    for (let i = 0; i < dirData.length; i++) {
                        $fileList.row.add([
                            dirData[i].id,
                            "<img class = 'preIcon' src =" + assetManager.resolve('explo/runtime/css/img/logicVol.png') + "/>" + $tree.jstree(true).get_node(dirData[i].id).text,
                            "<span class = 'hide' >" + dataMod + "</span>" + euroDate($tree.jstree(true).get_node(dirData[i].id).data.dateMod),
                            $tree.jstree(true).get_node(dirData[i].id).data.type,
                            bytUnit($tree.jstree(true).get_node(dirData[i].id).data.capacity),
                            bytUnit(freeSpace($tree.jstree(true).get_node(dirData[i].id)))
                        ]).draw();
                    }
                }

                // Display file List
                for (let index = 0; index < mapFile.length; index++) {
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

                        let rowFile = $fileList.row.add([
                            fileId,
                            "<img class = 'preIcon' src = " + iconExt + " >" + mapFile[index].name + exto,
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

                // Table Row Drag & Drop
                //Depending on browsers - Chrome vs others 
                let isChrome = !!window.chrome && !!window.chrome.webstore;
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

                $container.find("tbody").css({
                    'background-color': '#fffdf9'
                });

                // Possible to add here new icon for file Type...    
                function getIconExt(extor) {
                    var icoDelivered = "";
                    var ico_folder = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABYAAAAWCAYAAADEtGw7AAAABmJLR0QAAAAAAAD5Q7t/AAAACXBIWXMAAA3WAAAN1gGQb3mcAAAACXZwQWcAAAAWAAAAFgDcxelYAAAEIklEQVQ4y7WVy4vcRRDHv1XVv+c8nNnHbHaySyZkfYRAEKPGm3jxP/DgRTwJHkRBUVBB8I/wrAYUPIjeBVFITkYESXTX3azJmn1MdmZ35/F79a+7PezDbIRAAmkouqjDp4pvdXWRcw6P4vAjoQJQ9wa6X9N5FnoLcEtEuMrA1eYrbu9BwXSvFLe+oDeaE9OzXhA6U4xEF0mz1EWorftw9lW3/dBSpAmd0y5AUThyXLN+PNMjjvqweGd0iVoPLcU4Q62W2T4zwGzBzFD+RGKNUjs2+XTnS4aC+8UCP598zS3dV4rLH1Ata2DeGbhI8Ucz7am/mBnMgGLg0D+8yzxBmY8bzhRVK25JgJ/mVvErPnHlMfD378uliVZrHMcxXDKYVgFro3PN5FIVqb0oViNmPpZEqX1f69yV2Ti2ZT4BMr+det19diRFktm1i0+/kBeD/uRgY61dmz+TETNgjNteX5Pt1S7pMhtOTEZL9Ya3e5REWTB75EWNlBm3e92NuWMaJwmWd3vdWcmHsbEo8yKBsIBZqHlyzk7On0KeJdE/izee29gajqZb6lq95g8O+6AUQwAkqdPHwGONpe3undmmp2NDzuZpChYG78PBzBBWdPrcWU3EweK1xWe3ezsr7XZ4Ux3ArXMuSTE6Bi6GWNpa771cmZLYqNC4LCE6gMohXDEgDGHBmac6trtRP71y41Zlfs67zgzookSa4WiQGADe+9Z11zeH1SJP48IULstS5AeWFQeWJdBpijzdjzcnq+AgbiVZiSSzSMYlJQmG/3vHg4GGzlHRLDmMEUdCSsSxiCVhJ6wg/J88xALPF9rdK+M44iRJS8nuqvgIrDNspImpjl3GBB06VqJESqWkVIpLT9iwKEP7cjhhQaWq7OqmbgJeMhpY3xj0joGJyH/zpWjl5q7OMLbTpZAvXIon1vq+1oGS3FOce16hlUgpikslYj1PuSSz9TArb+8NTaMwWLm3Yu/K1twNzd3F6Th9MQwgKoRUozIkhlHKxr5CGXisA58KT0nueVR4wro00tgZ2tpg5Foff4f+u1/dNXlE5C0sLDREZLYaevOtcPfiVJQ80wjzx6uBqYcRI4qd+MqRJ2R8j43vQYc+FcurRa5TO85LrH7z56m30zQdra+vZ0ffJhFxp9PxK5VKDKBalmWDmVuNSD/RDofPPxZkZycrxWwQEMcRSRQZpYRsr29dNjJyJ6lcvrLV/hzAstb61lHznHMWQEZEOYBdAJsLCwt/961cHxbTP1prp5hdu10ZXZgKkvPNIO9UYxuLpySxjLWkDmZ+EkAmIn26384jIgJAAGRmZsavVquVMAzrACYAnKj5euFENLhQ9fTU7/0TP+Ta/AFgSUTW6UGWKRExAO50OioMwwqAmnOuDsAHMHTO9ay1w+Xl5eJfGp0XW4RoBUMAAAAldEVYdGRhdGU6Y3JlYXRlADIwMTAtMDUtMjRUMDc6Mzg6MDctMDY6MDCFLazXAAAAJXRFWHRkYXRlOm1vZGlmeQAyMDEwLTA1LTI0VDA3OjM4OjA3LTA2OjAw9HAUawAAADZ0RVh0TGljZW5zZQBodHRwOi8vY3JlYXRpdmVjb21tb25zLm9yZy9saWNlbnNlcy9ieS1zYS8zLjAvYeyvUQAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAAWdEVYdFNvdXJjZQBlY2hvLWljb24tdGhlbWWpTLdTAAAANHRFWHRTb3VyY2VfVVJMAGh0dHBzOi8vZmVkb3JhaG9zdGVkLm9yZy9lY2hvLWljb24tdGhlbWUviDIuQwAAAABJRU5ErkJggg==";
                    var ico_js = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABYAAAAWCAYAAADEtGw7AAAABmJLR0QAAAAAAAD5Q7t/AAAACXBIWXMAAAN2AAADdgF91YLMAAAACXZwQWcAAAAWAAAAFgDcxelYAAADsklEQVQ4y7WVS0xcVRjHf/cyzPAuQ59gxEIfKdJSWh8JsW3sQ9s0jWiIj4XGnXVhujBp4sK4MMFVSVzqxo2JujAVWyrWtmqiNClGQRAqyDBJAcOrMMDM3Nc553MBHafl0RjTk3z5cm9yfud3/zf5jiUiPIgVyn6wLGsbUP8/mb3AICKSKaBJKSWO64rreuJ5S+X74t9bQSB+EEiQVVpraWhoeAuwQ/ce53oeCwsL2LaNZVmZbozBdV1yQyEieXmL7//9VADC4fDKUSzFgW3bGeD02AJD/X8zOz3FYP8ABdEwh081sKViCwX5+eTn52PZdmbv6mC4y7ave5ztNRUcOrmbxMxjxG/e4o/rw3zedZF1mwo59dIxKqsqKS4uvgtsr2ScHcGxxhqqdq1nZnaW9gtXyCsN8/zrz/L2+6fZWB6l+b1zfPBuC6lkEnstY7KgtmVh2TZOOs03X33H2F+3mZlaoN2/RvnDm+np7aO0rJSpkSS93X0cfPqptaPIhga+zy+dXUwOORw9dhjP90imFkjMz1NXU4+Ixc3fY4jcJ+NMHLaNCgJ6unvp+n6IUy88QyQSRgUKxy2hLLoex3GIx0YpiOawd/9ubNtew3jJVmtNf9+f/PbDMI0vnqCwKB+tDLkqRDgvTJEqYmriNvHhYU6/8yrRaPT+xgCjIyN0/Rij8eXjFBbnoZXBKIPWBq00iWmHjp87eeXNk1RVbb3LdlXj+fl5Oi53c/y5I2x8qBStzCJYL/bAV1z/6VeONj1O3d495OTkYIxZOwpjDLfiYzy57wBba8sxSi+C9ZKxMsQHRtlzsJL6/XVYloXv+4gIoVBodTCWhRHN9NQ0I/1hSjYUUVxWQG4khFYGN+UxkRjhyIkDWJaF67pore8Ye+Pj4wlAloFzbJvtO6v58PxHdHZuYk9dDdt2PELJhkKKywq51t7B7id2kpubSzKZZGxsjEgkglJK2trazsfj8csiIlb2PLYsqykIgi993yeVSjE4EOOLT77FSRhqa3dQv28XV6924aXSVFVvYGttOSebjhCLxWhtbb1w9uzZN0RkAmBFsFIq8yNc18VxHMbHJ/j044ukE1BYso4Dhx6lonod6zdFuXTp0pUzZ868dgcKsGweB0EgjuOI53ni+74EQSBKKVFKSTqdlpmZGZmbm5PJyUnp6ekx51pavgY2Z3NEZDlYa52Baa1Fay3GGDHGiIiIMUZ835dEIuE1Nzd/thJURJZF8V+uJh+4ISKTK46FB3WZ/gPlUklVSFgzswAAACV0RVh0Y3JlYXRlLWRhdGUAMjAwOS0xMS0xNVQxNzowMzowNC0wNzowMNeq4s8AAAAldEVYdGRhdGU6Y3JlYXRlADIwMTAtMDItMDhUMTQ6MTE6NDgtMDc6MDDyD2JWAAAAJXRFWHRkYXRlOm1vZGlmeQAyMDEwLTAxLTExVDA5OjI1OjEwLTA3OjAwS/yergAAAGd0RVh0TGljZW5zZQBodHRwOi8vY3JlYXRpdmVjb21tb25zLm9yZy9saWNlbnNlcy9ieS1zYS8zLjAvIG9yIGh0dHA6Ly9jcmVhdGl2ZWNvbW1vbnMub3JnL2xpY2Vuc2VzL0xHUEwvMi4xL1uPPGMAAAAldEVYdG1vZGlmeS1kYXRlADIwMDktMDMtMTlUMTA6NTI6NDYtMDY6MDB2ZcMWAAAAGXRFWHRTb2Z0d2FyZQB3d3cuaW5rc2NhcGUub3Jnm+48GgAAABN0RVh0U291cmNlAE94eWdlbiBJY29uc+wYrugAAAAndEVYdFNvdXJjZV9VUkwAaHR0cDovL3d3dy5veHlnZW4taWNvbnMub3JnL+83qssAAAAASUVORK5CYII=";
                    var ico_html = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABYAAAAWCAYAAADEtGw7AAAABmJLR0QAAAAAAAD5Q7t/AAAACXBIWXMAAA3XAAAN1wFCKJt4AAAACXZwQWcAAAAWAAAAFgDcxelYAAAD1klEQVQ4y6WUy09UVxzHP+fOvXMpj4IMM8MwCpbQtCkUBgI+qE1qumiCxlW7sW0a013/gaZGbdIWQ223XbhzYdqF6WNRY2LShbUoqISHjhAQUJ4DF+YB87wz954ulHTGGbWJ3+Qk93dO7uf3Pb/fOUcADJzr/wY4zUtISvntV1+eOlMwOXCuX76sBs71y3ymmh/Mz8/jcDiQUiKEQAgBUPC9E+c5xe/3F+2gAJwPCAaDRZCnFQgEkFKWXHsmuK2tDVX9b9myrIK4lPsXgoUQTExMvLBhnZ2dKIry/8CKoiClpKOjAwBN0wAYHF9gcHwBI5Yma9loDsHNuRH2tfo56vE8H3x75BYH9/cihGBsbAyAcDzHteAWjbu9fPBuG6/5XZTrOpF4igeLBreDiwwFr6BaWgG4YB/7ew7g8/kQQtDV1YXL18xfwThHD3fyaV+Aupoy5mYmmXq4wloCqsrg474AbzbXM7ft4fjJi+3PLEUoFEIIwfT0NJcGQxx7r523m2sJb4Soa2ylus5HMp0ltDiHapsoVor3e5qxbMnVG5PngYNFjvOb9yjsoM5Vw+GeFjTFJqdWgiLQVBWnplKuq3hdVfg8btw1FfS07qapofbA8ZMXTxSB84/P1MIm3a2NRCMbrGXK8TTsRUqwJSAUhG2yGk7wx7V7XL0+QrUueaulAeCjolIMDd/knd5Dj0sSTtJUv4tbM+s0v+7BlrBzYuPRMPsCrQghkFKyvLpGOpXC564G6C5yfPBALx6PByEEaTOHrjtRKj1E42mMbZNkxmI7aWLGjYLr7nW7mJiaRddUgNqSzTOMxz85HAqxRJqK9AqVqs56oo4NzUnOskmHcwSyWTIZk6rKCpLJJHv9btZTJkC4CJyv2qoy5pc26Gypp3mPj0eLy1x/sIWJk5RZwY+/jqMLiy+OtbO9vc3o/VmoagK489zmNVQ7GJ1awrQf527a4+dIp5vV9TCbsQSxjOBRxMYwDGKxGGW7/EzNhQAulQTv6PMPD7EZiXPj7gJzywbpdJrb45OE41mMSILNaJLNrRSxWIy1WIZIQrIUCg//fPaTC4AoKIXX6y2AnzjSxU+/DWPb0PWGl8vjMSKmEzNnkTFz6JpgISp5uJ5leHSaxak7p4FyIKcC2Lb93fc/nD1VyrnbFozelcwuGHS11FNf9yq6rpFMZ1k1ovw9toSxtkp0ZvCXf36/sAZUApmnH1MF0IAy4JUn2SuEcLj6PjvzdZWroVtxllWAELZtWWZiy1h5eO/K0J/nLwMbwDIQKQUupZ1kel4y55N5AUggBSSfDBOw/wXxi8/S9eE/5QAAACV0RVh0Y3JlYXRlLWRhdGUAMjAwOS0xMS0xMFQxOTozODoxOC0wNzowMD0dxHUAAAAldEVYdGRhdGU6Y3JlYXRlADIwMTAtMDEtMjVUMDg6MzA6MDUtMDc6MDDZqdMpAAAAJXRFWHRkYXRlOm1vZGlmeQAyMDEwLTAxLTExVDA4OjU2OjI4LTA3OjAw6QagLwAAADJ0RVh0TGljZW5zZQBodHRwOi8vZW4ud2lraXBlZGlhLm9yZy93aWtpL1B1YmxpY19kb21haW4//erPAAAAJXRFWHRtb2RpZnktZGF0ZQAyMDA5LTExLTEwVDE5OjM4OjE4LTA3OjAwYqyyQQAAABl0RVh0U291cmNlAFRhbmdvIEljb24gTGlicmFyeVTP7YIAAAA6dEVYdFNvdXJjZV9VUkwAaHR0cDovL3RhbmdvLmZyZWVkZXNrdG9wLm9yZy9UYW5nb19JY29uX0xpYnJhcnm8yK3WAAAAAElFTkSuQmCC";
                    var ico_txt = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABYAAAAWCAYAAADEtGw7AAAABmJLR0QAAAAAAAD5Q7t/AAAACXBIWXMAAA3WAAAN1gGQb3mcAAAACXZwQWcAAAAWAAAAFgDcxelYAAACPklEQVQ4y62UTU9aQRSG3xnu4KUErqRI09vEr7jsP2hqUpfWjRvXpCFh46LphgQWLJu4dOeW30BS/0BN19o0bkgL2gJV0hQaDV7POV1cPlSgCnSSs7mZ8+aZZ84dBQC5XA5EbK+uvnwRDodnAQhGrHa7rcvl8s9SqfQpFotdZTKZofsUABQKBbTb7ecbGxtFx3Ge/CuYmVWj0fhTr9f3Puzv7zxz3WYqlRrYpwHAGAtaa9sYEw0aYxtjQqPKnpmxHceJzy8sZF6vr+8cHx/Hdnd3hwczC0QEzAxiBhONLGKGMAMi1tLycmpzc/P94eFhJJ/PDwZD/GDpNPF9JQLP82AsK7CysvJma2srUywWg+l0uhds+bkdYvEbRUYqBpSCUgqtVgvn5w143pWJRp2329vbJ8lkcu/o6DMODj76xNIjlvtpiWAsC3PxOLTWqFZrqNVq4UQi8S6bzS6trb3qE7P0Hd9L3FkmGITrPkUkEgEzgYjmyuVvj23b/jqggohARA8KBoCA1ph1ooBSaDWbUEpD68BNxwzp+B0nuK9ddU7q11Dih6q4G9wF6vbenoqpie8EM/sTMa7jAWIWMN8i9od+WmJ/ukY4nop4wDHL/5uKmypY+BbxJKsLxAMqWEDcDR6PGFAgps7J74wbi/jP4qQqiHpPww3H/T+PmTBmLpTCcMe1eh2e5/36Ua1+eRQKuTKmCwWoi8vL2tnZ+e+gMd1vgOu6AKAXFxfnLcsKT3J519feRaVyUgGETk+/4y8y/SlLvAr3xAAAACV0RVh0ZGF0ZTpjcmVhdGUAMjAxMC0wNS0yNFQwNzo0MjoyMC0wNjowMDy2EG4AAAAldEVYdGRhdGU6bW9kaWZ5ADIwMTAtMDUtMjRUMDc6NDI6MjAtMDY6MDBN66jSAAAANXRFWHRMaWNlbnNlAGh0dHA6Ly9jcmVhdGl2ZWNvbW1vbnMub3JnL2xpY2Vuc2VzL0xHUEwvMi4xLzvBtBgAAAAZdEVYdFNvZnR3YXJlAHd3dy5pbmtzY2FwZS5vcmeb7jwaAAAAD3RFWHRTb3VyY2UAbnVvdmVYVDLqIDbcAAAAInRFWHRTb3VyY2VfVVJMAGh0dHA6Ly9udW92ZXh0LnB3c3AubmV0kYnHLQAAAABJRU5ErkJggg==";
                    var ico_else = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAASCAYAAABrXO8xAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAIGNIUk0AAHolAACAgwAA+f8AAIDpAAB1MAAA6mAAADqYAAAXb5JfxUYAAAFCSURBVHjanFMxTkJBFJy3uwV2Fr/wBBJJqATvQCcH8AQmFt7Cwkp6SSQ/9tyFWNDRmNAZYvXfjAW78g3Nl02m2by3M2/mrUnCKScBQF3X95SiyCAJpILESCmIBKV41ut9TyaT96qqPgEAkvC2WDy4uwoadzXNAXVda7Va6XU+f9xutxeSEABAZAAAJ+FOuDvcHU0GAFRVhZvx+Hm5XN79SpVUCpQBGGB5nuFw+LFer7HZbPC1250D2DOSCrnG8t0fXPb7g+vRaHA7nV6J+3f3UsVoZp3cpBgPjFJAx1SU1RVzOudXci+MsWsj2ZK6p1dXxtBiZFDHToqtGf+xryWOlHOMBgPF5ljaQUkIloofeXMYzMzoSkfVrRNjgrLUVHIUhJRiB1fbjBReZrMnUflbMUoKFIMoUIoSA6lY/LBTP/LPALPT+HXZCqJgAAAAAElFTkSuQmCC";
                    var ico_img = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABYAAAAWCAYAAADEtGw7AAAABmJLR0QAAAAAAAD5Q7t/AAAACXBIWXMAAA3WAAAN1gGQb3mcAAAACXZwQWcAAAAWAAAAFgDcxelYAAADUklEQVQ4y7WVy24cRRSGv3NOVc+1Pe74EltZgCwvkIhQJNhAEiFeBl4hWbNllTcIEnkKdrBmwRKRRBBIHBtPhMcz7emZrsOiezyOkqxQSir9pVNVp/4+l7/hPQ25f/8+Ry+P7ODgoJvFTBxvdi7BX1+/Yw+c5M7J8Un14MGDSh5+/3Dzzp079/JhfhtBAdyb029Fb92/A6uq+vvp06ffhcPDw1s7OztfdzqdQrhyyFtOV7Bh+La9hnnCSXWiLMvnIcbYV5E4nS84nS5fY3iVzVV7alHaUHj7SC/AqBcw1Y0AYAo/Pyn59pcAZiigAgKoOCI0MQIyg+v9Zv3qAuoEIs2jd4sJ39xqToYVoSoJ59pHNKDSOLYWFQgK13pwYygcbDaOj6ZwdA5V7SwSLOUCb0MVVhmNCttdJwTYGzTJPps3jFScPBP2htA1ZzxrvnIY4MONxsO0cnJfhcsJbT7IFD7IhY0ebHQatvMaJhXgAsBsDh4hz2Cn39z56wyqJYhDZr6KPMHbrGayZDPMiRapllyGY3/g5BHqNp/DTOhFx9ocHBawTDCthHy+LsmGMYJfnFI++YlUHEBa4NZjxjVcewhCNKUYRub9QL9j9KLi7igQTdiI0K9py7JlDLCYT3jx24+E2CEf7WGxx4IuM7aoGDKfl1jMGYz2yPt9doucciFUNRT9yO4oo8jWZRpWDTmfTTh+9hjRxNnoBd3+JlV5TnVxTl3X1GmBWsYi32Y52qccXse622i2xTTb4vlxQW9f4cagKbdV0U/P50xPa0QT5b/HeHqJp8veQFRQWzAdT3kVnhE6GVm3T9YdEjo5KRT8MfuEdPMuvmbsTCvjpNxCpC14FEdBjISxJKMmkoi4BhDDLYIGXI1lMjZXQV4xdncqGfFP9hloBDXQsJ7WoFhA1DALqAXUDAsBa+2D7S6rKms6LyX2d7f48vaniFpzQRVVxazB0NrM1jOoYmYEU0SVj7fTpR4Hd2eZnK9u7vLFR1utvr6pYPhaf9+FTe0L7u5hPB4fl2V5NhwMhr1or2nvWmdbB2/VacddLm2LxaKeTCZ/hkc/PPp1PB7fK4ricxEx3C9JwptivoY3bALObFY+e/z494dy5TelNF36f0da0Xov4z9IwtlM74rHQAAAACV0RVh0ZGF0ZTpjcmVhdGUAMjAxMC0wNS0yNFQwNzo0MjoyMC0wNjowMDy2EG4AAAAldEVYdGRhdGU6bW9kaWZ5ADIwMTAtMDUtMjRUMDc6NDI6MjAtMDY6MDBN66jSAAAANXRFWHRMaWNlbnNlAGh0dHA6Ly9jcmVhdGl2ZWNvbW1vbnMub3JnL2xpY2Vuc2VzL0xHUEwvMi4xLzvBtBgAAAAZdEVYdFNvZnR3YXJlAHd3dy5pbmtzY2FwZS5vcmeb7jwaAAAAD3RFWHRTb3VyY2UAbnVvdmVYVDLqIDbcAAAAInRFWHRTb3VyY2VfVVJMAGh0dHA6Ly9udW92ZXh0LnB3c3AubmV0kYnHLQAAAABJRU5ErkJggg==";

                    if (extor == "") {
                        icoDelivered = ico_folder;
                    } else if (extor == ".js") {
                        icoDelivered = ico_js;
                    } else if (extor == ".html") {
                        icoDelivered = ico_html;
                    } else if (extor == ".txt") {
                        icoDelivered = ico_txt;
                    } else if (extor == ".png") {
                        icoDelivered = ico_img;
                    } else {
                        icoDelivered = ico_else;
                    }

                    return icoDelivered;

                }

            } //End Display folder content 

            // Details of file type hard-coded -> Todo dynamic in Json
            function getLabelExt(extor) {
                let labelDelivered;
                if (extor == "") {
                    labelDelivered = "";
                } else if (extor == ".js") {
                    labelDelivered = "Document Javascript";
                } else if (extor == ".html") {
                    labelDelivered = "Document HTML";
                } else if (extor == ".txt") {
                    labelDelivered = "Document texte";
                } else if (extor == ".png") {
                    labelDelivered = "image";
                } else if (extor == ".jpg") {
                    labelDelivered = "image";
                } else {
                    labelDelivered = "fichier";
                }

                return labelDelivered;
            }

            function getFileName(id) {
                var targetFileName = "";
                for (let index = 0; index < mapFile.length; index++) {
                    if (mapFile[index].fileId == id)
                        targetFileName = mapFile[index].name;
                }
                return targetFileName;
            }


            function getExtension(id) {
                let target = "";
                for (let index = 0; index < mapFile.length; index++) {
                    if (mapFile[index].fileId == id)
                        target = mapFile[index].extension;
                }
                return target;
            }

            function getFolderName(id) {
                var targetFolderName = "";
                for (let index = 0; index < treeFolder.length; index++) {
                    if (treeFolder[index].id == id)
                        targetFolderName = treeFolder[index].text;
                }
                return targetFolderName;
            }

            function formater(volumeName, volumeId) {
                $container.find(".modali").css("height", "450px").show();

                $container.find('.modalTitle').remove();
                if (!volumeName) {
                    $container.find(".contentModal").html('<h3>Formater un volume logique</h3><p>Nom du volume : <select class="volId"></select>' +
                        '</p><p>Label : <input type="text"></p><p>Capacité : <input type="text"></p><p>Taille d\'unité d\'allocation : <input type="text"></p><p> Type de formatage : <select> <option value="FAT 32">FAT 32</option> <option value="exFAT" selected>exFAT</option> <option value="NFTS">NFTS</option><option value="HFS+">HFS+</option> </select> </p><button class="startFormat">Lancer le formatage</button><button class="annule">Annuler</button><div class="progress"><div class="progress-bar">0%</div></div><button disabled="disabled" class="doneClose">Fermer</button>');

                    for (let i = 0; i < treeFolder.length; i++) {

                        if (treeFolder[i].type == "volume" || treeFolder[i].type == "usb" || treeFolder[i].type == "sdCard") {
                            $container.find(".volId").append("<option class=" + treeFolder[i].id + ">" + treeFolder[i].text + "</option>");
                        }
                    }
                } else {
                    $container.find(".contentModal").html('<h3>Formater un volume logique</h3><p>Nom du volume : <input disabled = "disabled" type="text" value="' + volumeName + '"></p><p>Label : <input type="text"></p><p>Capacité : <input type="text"></p><p>Taille d\'unité d\'allocation : <input type="text"></p><p> Type de formatage : <select> <option value="FAT 32">FAT 32</option> <option value="exFAT" selected>exFAT</option> <option value="NFTS">NFTS</option><option value="HFS+">HFS+</option> </select> </p><button class="startFormat">Lancer le formatage</button><button class="annule">Annuler</button><div class="progress"><div class="progress-bar">0%</div></div><button disabled="disabled" class="doneClose">Fermer</button>');
                }
                $container.find(".annule").on('click', function () {
                    let evName = "Mcontextuel ABANDON du Formatage du volume";
                    evCollector(evName, "-", "-");
                    $container.find(".modali").hide();
                });
                $container.find(".startFormat").on('click', function () {
                    if (!volumeId) {
                        volumeName = $container.find(".volId option:selected").text();
                        volumeId = $container.find(".volId option:selected")[0].className;
                    }
                    let valideFormat = confirm("Attention vous allez formater le volume : " +
                        volumeName + " ! Etes vous sûr ? l'ensemble des données seront perdues.")
                    if (valideFormat) {
                        for (let i = 0; i < mapFile.length; i++) {
                            if (mapFile[i].node == volumeId) {
                                mapFile[i].node = "erased";
                                dataFiles();
                            }
                        }
                        for (let x = 0; x < treeFolder.length; x++) {
                            if (treeFolder[x].parent == volumeId) {
                                treeFolder[x].parent = 'erased';
                                $tree.jstree().move_node(treeFolder[x].id, 'erased');
                                dataFolder();
                            }
                        }

                        //Progress Bar
                        pbar(".progress");
                        $container.find(".startFormat").attr('disabled', 'disabled');
                        $container.find(".doneClose").attr('disabled', false);
                        $container.find(".doneClose").on('click', function () {
                            $container.find(".modali").hide();
                            $tree.jstree('deselect_all');
                            $tree.jstree('select_node', 'root');
                            $tree.jstree('open_node', "root");
                        })

                        let evName = "Formatage du volume";
                        evCollector(evName, getDirName(volumeId), "-");
                    }
                });

            }

            function pbar(pbarCont) {
                var bar = new ProgressBar.Line(pbarCont, {
                    strokeWidth: 4,
                    easing: 'easeInOut',
                    duration: 1400,
                    color: '#FFEA82',
                    trailColor: '#eee',
                    trailWidth: 1,
                    svgStyle: {
                        width: '100%',
                        height: '100%'
                    },

                });

                bar.animate(1.0); // Number from 0.0 to 1.0
            }

            $container.find(".formater").on('click', function () {
                formater();
            });

            $container.find(".commandWindow").on('click', function () {
                $container.find(".comWin").show();
                $container.find(".comLine").focus();

            });
            //Drag and Drop For Firefox
            function dragFF(ev) {
                var FileArray = [];
                DDFile = [];
                ev.originalEvent.dataTransfer.setData("text/plain", ev.target.id);
                //identification element grabbed by just mouseDown and not click
                var ddTarget, nameCheck, idCheck, typeCheck; // todo protect variables to prevent accidental drag
                idCheck = ev.target.getAttribute('data');
                nameCheck = ev.target.cells[0].innerText;
                typeCheck = ev.target.cells[2].innerText;

                if (typeCheck == 'Répertoire') { // Identify mousedown on folder
                    for (let i = 0; i < treeFolder.length; i++) {
                        if (treeFolder[i].id == idCheck) {
                            treeFolder[i].origin = treeFolder[i].parent;
                            DDFolder.push(treeFolder[i].id);
                            let evName = "Drag répertoire non sélectionné depuis la liste";
                            evCollector(evName, treeFolder[i].text, getDirName(treeFolder[i].parent));
                        }
                    }
                } else {
                    // Identify mousedown on file
                    for (let i = 0; i < mapFile.length; i++) {
                        if (mapFile[i].fileId == idCheck) {
                            mapFile[i].origin = mapFile[i].node;
                            DDFile.push(mapFile[i].fileId);
                            let evName = "Drag fichier non sélectionné depuis la liste";
                            evCollector(evName, mapFile[i].name + mapFile[i].extension, getDirName(mapFile[i].origin));
                        };
                    }
                }

                ddTarget = $fileList.rows({
                    selected: true
                })[0]; // Array of Ids

                for (let i = 0; i < ddTarget.length; i++) {
                    var dataId = $fileList.row(ddTarget[i]).data()[0];
                    var chain = $fileList.row(ddTarget[i]).data();
                    if (chain.includes("Répertoire")) {
                        for (let i = 0; i < treeFolder.length; i++) {
                            if (treeFolder[i].id == dataId) {
                                treeFolder[i].origin = treeFolder[i].parent;
                                let evName = "Drag répertoire(s)  sélectionné(s) depuis la liste";
                                evCollector(evName, treeFolder[i].text, getDirName(treeFolder[i].origin));
                            };
                        }
                        if(DDFolder.indexOf(dataId) === -1){DDFolder.push(dataId)}
                    } else {
                        FileArray.push(dataId); // Build file array selection
                    }
                }

                // File selected : list builder 

                for (let y = 0; y < FileArray.length; y++) {
                    for (let i = 0; i < mapFile.length; i++) {
                        if (mapFile[i].fileId == FileArray[y]) {
                            mapFile[i].origin = mapFile[i].node;
                            let evName = "Drag fichier(s) sélectionné(s) depuis la liste";
                            evCollector(evName, mapFile[i].name + mapFile[i].extension, getDirName(mapFile[i].origin));
                            if(DDFile.indexOf(FileArray[y]) === -1){DDFile.push(FileArray[y])}
                        };
                    }
                }
            }

            //Drag and Drop Commun function
            function drag(ev) {
                var FileArray = [];
                DDFile = [];
                ev.dataTransfer.setData("text/plain", ev.target.id);
                //ev.target.getAttribute('data'); Get Data value that stock the file / folder ID
                //identification element grabbed by just mouseDown and not click
                var ddTarget, nameCheck, idCheck, typeCheck;
                idCheck = ev.target.getAttribute('data');
                nameCheck = ev.target.cells[0].innerText;
                typeCheck = ev.target.cells[2].innerText;

                if (typeCheck == 'Répertoire') { // Identify mousedown on folder
                    for (let i = 0; i < treeFolder.length; i++) {
                        if (treeFolder[i].id == idCheck) {
                            treeFolder[i].origin = treeFolder[i].parent;
                            DDFolder.push(treeFolder[i].id);
                            let evName = "Drag répertoire non sélectionné depuis la liste";
                            evCollector(evName, treeFolder[i].text, getDirName(treeFolder[i].parent));
                        }
                    }
                } else {
                    // Identify mousedown on file
                    for (let i = 0; i < mapFile.length; i++) {
                        if (mapFile[i].fileId == idCheck) {
                            mapFile[i].origin = mapFile[i].node;
                            DDFile.push(mapFile[i].fileId);
                            let evName = "Drag fichier non sélectionné depuis la liste";
                            evCollector(evName, mapFile[i].name + mapFile[i].extension, getDirName(mapFile[i].origin));
                        };
                    }
                }

                ddTarget = $fileList.rows({
                    selected: true
                })[0];

                for (let i = 0; i < ddTarget.length; i++) {
                    var dataId = $fileList.row(ddTarget[i]).data()[0];
                    var chain = $fileList.row(ddTarget[i]).data();
                    if (chain.includes("Répertoire")) {
                        for (let i = 0; i < treeFolder.length; i++) {
                            if (treeFolder[i].id == dataId) {
                                treeFolder[i].origin = treeFolder[i].parent;
                                let evName = "Drag répertoire(s)  sélectionné(s) depuis la liste";
                                evCollector(evName, treeFolder[i].text, getDirName(treeFolder[i].origin));
                            };
                        }
                        
                        if(DDFolder.indexOf(dataId) === -1){DDFolder.push(dataId)}
                    } else {
                        FileArray.push(dataId); // Build file array selection
                    }
                }

                // File selected : list builder 
                for (let y = 0; y < FileArray.length; y++) {
                    for (let i = 0; i < mapFile.length; i++) {
                        if (mapFile[i].fileId == FileArray[y]) {
                            mapFile[i].origin = mapFile[i].node;
                            let evName = "Drag fichier(s) sélectionné(s) depuis la liste";
                            evCollector(evName, mapFile[i].name + mapFile[i].extension, getDirName(mapFile[i].origin));
                            
                            if(DDFile.indexOf(FileArray[y]) === -1){DDFile.push(FileArray[y])}
                        };
                    }
                }
            }

            function drop(ev) {
                var activDir = $tree.jstree(true).get_selected(); //get activ Directory
                var testDoublon = false; // OK verified
                ev.preventDefault();
                $fileList.rows('.selected').remove().draw();
                if (DDFile.length > 0) {
                    for (let y = 0; y < DDFile.length; y++) { //Look throught Drag file array
                        const targetFileId = DDFile[y];
                        for (let i = 0; i < mapFile.length; i++) { //Look throught Json Files 
                            if (targetFileId == mapFile[i].fileId) { // Scan to find file in MapFile
                                for (let x = 0; x < treeFolder.length; x++) { //Look throught Json Directories to fix autorization to write on volume
                                    let evtstring = String(ev.target.id);
                                    evtstring = evtstring.substring(0, evtstring.length - 7);
                                    if (treeFolder[x].id == evtstring) {
                                        if (treeFolder[x].text == "Disque Optique") {
                                            alert("Opération interdite - il est impossible d'écrire sur le CDROM");
                                            $tree.jstree().deselect_all();
                                            $tree.jstree().select_node(mapFile[i].node);
                                            DDFile = [];
                                            let evName = "Drop Interdit";
                                            evCollector(evName, targetFileId, treeFolder[x].text);
                                        } else if (treeFolder[x].text == "Cet Ordinateur") {
                                            alert("Opération interdite - il est impossible d'écrire à cet endroit");
                                            $tree.jstree().deselect_all();
                                            $tree.jstree().select_node(mapFile[i].node);
                                            DDFile = [];
                                            let evName = "Drop Interdit";
                                            evCollector(evName, targetFileId, treeFolder[x].text);

                                        } else if (treeFolder[x].text == "Réseau Local") {
                                            alert("Opération interdite - Aucune connexion réseau");
                                            $tree.jstree().deselect_all();
                                            $tree.jstree().select_node(mapFile[i].node);
                                            DDFile = [];
                                            let evName = "Drop Interdit";
                                            evCollector(evName, targetFileId, treeFolder[x].text);

                                        } else {
                                            verifDbl(mapFile[i], treeFolder[x].id, "DD");
                                            dataFiles();
                                            let evName = "Drop de fichier exécuté";
                                            evCollector(evName, targetFileId, treeFolder[x].text);

                                        }
                                    } else {
                                        //Drop files to a directory but in the list not in the tree
                                        let evtstring = String(ev.target.id);
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

                    for (let y = 0; y < DDFolder.length; y++) { //Look throught Drag file array
                        var targetFolderId = DDFolder[y];
                        WbranchSize = branchSize(targetFolderId);
                        for (let i = 0; i < treeFolder.length; i++) { //Look throught Json Folders 
                            if (targetFolderId == treeFolder[i].id) { //Find Folder To move in TreeFolder
                                for (let x = 0; x < treeFolder.length; x++) { //Look throught Json Directories
                                    var procy = true;
                                    if ($(ev.target).find(".secretId")[0]) { // Drop Folder from the list to the list
                                        if (treeFolder[x].id == $(ev.target).find(".secretId")[0].innerText) {
                                            if (treeFolder[x].id == "cdRom") { //Exclusion of CdRom
                                                alert("Opération interdite - il est impossible d'écrire sur le CDROM");
                                                targetFolderId = toString(treeFolder[x].id);
                                                $tree.jstree().deselect_all();
                                                $tree.jstree().select_node(treeFolder[i].parent);

                                                let evName = "Drop répertoire Interdit";
                                                evCollector(evName, getDirName(DDFolder[y]), getDirName(treeFolder[x].id));
                                            } else {
                                                if (testFreeSpaceFolder(treeFolder[x].id, WbranchSize)) {
                                                    $tree.jstree().move_node(targetFolderId, treeFolder[x].id); // Move roots of branch (and the branch) from clipboard to destination 
                                                } else {
                                                    alert("Operation impossible, il n'y pas assez d'espace sur le support de destination");
                                                    DDFolder = [];
                                                    displayDirContent(activDir);
                                                    WbranchSize = 0;
                                                    return;
                                                }
                                                //Update Json treeFolder

                                                if (treeFolder[i].id == treeFolder[x].id) {

                                                } // Destination = origin
                                                else {
                                                    if (procy) {
                                                        verifDbl(treeFolder[i].id, treeFolder[x].id, "DD");
                                                        treeFolder[i].parent = treeFolder[x].id;
                                                        WbranchSize = 0;
                                                        dataFolder();
                                                        let evName = "Drop répertoire réalisé";
                                                        evCollector(evName, getDirName(DDFolder[y]), getDirName(treeFolder[x].id));
                                                        procy = false;
                                                    }
                                                }

                                                $tree.jstree(true).refresh();
                                                $tree.jstree(true).select_node(activDir);
                                                $tree.jstree(true).open_node(activDir);
                                                displayDirContent(activDir);
                                            }


                                        } else {
                                            WbranchSize = 0;
                                            testDoublon = true;
                                        }
                                    } else { //Drop folder from the list to the tree
                                        let evtstring = String(ev.target.id);
                                        evtstring = evtstring.substring(0, evtstring.length - 7);
                                        if (treeFolder[x].id == evtstring) {
                                            if (treeFolder[x].id == "cdRom") { //Exclusion of CdRom
                                                alert("Opération interdite - il est impossible d'écrire sur le CDROM");
                                                targetFolderId = toString(treeFolder[x].id);
                                                $tree.jstree().deselect_all();
                                                $tree.jstree().select_node(treeFolder[i].parent);

                                                let evName = "Drop répertoire Interdit";
                                                evCollector(evName, getDirName(DDFolder[y]), getDirName(treeFolder[x].id));
                                            } else {
                                                if (testFreeSpaceFolder(treeFolder[x].id, WbranchSize)) {
                                                    $tree.jstree().move_node(targetFolderId, treeFolder[x].id); // Move roots of branch (and the branch) from clipboard to destination 
                                                } else {
                                                    alert("Operation impossible, il n'y pas assez d'espace sur le support de destination");
                                                    DDFolder = [];
                                                    displayDirContent(activDir);
                                                    WbranchSize = 0;
                                                    return;
                                                }
                                                //Update Json treeFolder 
                                                if (treeFolder[i].id == treeFolder[x].id) {} // Destination = origin
                                                else {
                                                    if (procy) {
                                                        treeFolder[i].parent = treeFolder[x].id;
                                                        WbranchSize = 0;
                                                        dataFolder();
                                                        let evName = "Drop répertoire réalisé";
                                                        evCollector(evName, getDirName(DDFolder[y]), getDirName(treeFolder[x].id));
                                                        procy = false;
                                                    }
                                                }

                                                $tree.jstree(true).refresh();
                                                $tree.jstree(true).select_node(evtstring);
                                                $tree.jstree(true).open_node(evtstring);
                                                displayDirContent(evtstring);
                                            }
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
            function commandCut(selectedNodeId) {
                if (selectedNodeId) {
                    var originalNodes = $tree.jstree(true).get_selected(selectedNodeId);
                    for (let x = 0; x < originalNodes.length; x++) {
                        WbranchSize = branchSize(originalNodes[x].id);

                        $tree.jstree().move_node(originalNodes[x].id, 'clipboard');

                        var oriNodeId = originalNodes[x].id;
                        for (let i = 0; i < treeFolder.length; i++) {
                            const idfold = treeFolder[i];
                            if (idfold.id == oriNodeId) {
                                treeFolder[i].parent = "clipBoard";
                                dataFolder();
                                let evName = "Mcontextuel - Couper répertoire";
                                evCollector(evName, treeFolder[i].text, getDirName(oriNodeId));
                            }
                        }
                    }

                } else {
                    SelectedArr = $fileList.rows({
                        selected: true
                    })[0];
                    for (let index = 0; index < SelectedArr.length; index++) {
                        const indexElement = SelectedArr[index];
                        var element = $fileList.row(indexElement).data();
                        for (let i = 0; i < mapFile.length; i++) {
                            if (element[0] == mapFile[i].fileId) {

                                clipBoard.push(mapFile[i]);

                                dataFiles();
                            };
                        }

                        // get only files id no directories !
                        for (let i = 0; i < mapFile.length; i++) {
                            const idf = mapFile[i];
                            if (idf.fileId == element[0]) {
                                let oriNodeId = mapFile[i].node;
                                mapFile[i].origin = mapFile[i].node;
                                mapFile[i].node = "clipBoard";
                                let evName = "Mcontextuel - Couper fichier";
                                evCollector(evName, mapFile[i].name + mapFile[i].extension, getDirName(oriNodeId));
                                dataFiles();
                            }
                        }
                        // Second for loop to get directories
                        for (let i = 0; i < treeFolder.length; i++) {
                            if (treeFolder[i].id == element[0]) {
                                WbranchSize = branchSize(element[0]);
                                let oriNodeId = treeFolder[i].parent;
                                treeFolder[i].origin = oriNodeId;
                                treeFolder[i].parent = "clipBoard";
                                $tree.jstree().move_node(treeFolder[i].id, 'clipboard');
                                dataFolder();
                                let evName = "Mcontextuel - Couper répertoire";
                                evCollector(evName, treeFolder[i].text, getDirName(oriNodeId));
                            }
                        }
                    }
                }
                $fileList.rows('.selected').remove().draw(); // Remove row from tables


            };

            function commandPaste() {
                // Get files in clipBoard
                let clipDir = $tree.jstree(true).get_node('clipboard');
                let destiPaste = $tree.jstree(true).get_selected();

                // This loop is only for files from copy an cut
                for (let y = 0; y < clipBoard.length; y++) {
                    if (clipBoard[y].fileId) {
                        if (clipBoard[y].copy) {

                            clipBoard[y].node = destiPaste[0];
                            verifDbl(clipBoard[y], destiPaste[0], "copy"); //Verify doubles and write in mapFile
                            // mapFile.push(clipBoard[y]);
                            displayDirContent(destiPaste);

                            //Answer system
                            dataClipBoard();
                            let evName = "Mcontextuel - Coller fichier depuis copier";
                            evCollector(evName, clipBoard[y].name + clipBoard[y].extension, getDirName(destiPaste[0]));
                            dataFiles();

                            //Reset operation copy
                            for (let i = 0; i < mapFile.length; i++) {
                                if (mapFile[i].fileId == clipBoard[y].fileId) {
                                    mapFile[i].copy = false;
                                }
                            }

                        } else {

                            for (let i = 0; i < mapFile.length; i++) {
                                if (mapFile[i].fileId == clipBoard[y].fileId) {

                                    verifDbl(mapFile[i], destiPaste[0], "cut"); //Verify doubles and write in mapFile

                                    let evName = "Mcontextuel - Coller fichier depuis couper";
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
                // Move Directories from clipBoard to targetFolder
                var childArray = clipDir.children; // Get only first direct Child
                var allchildArray = clipDir.children_d;


                for (let ifold = 0; ifold < allchildArray.length; ifold++) { // Scan all directories in childArray
                    for (let i = 0; i < treeFolder.length; i++) {
                        if (treeFolder[i].id == allchildArray[ifold]) {

                            let testWritable = verifDbl(treeFolder[i], destiPaste[0], 'copy'); // Incertitude sur le message copy

                            for (let j = 0; j < childArray.length; j++) { // Scan all directories in childArray
                                if (testFreeSpaceFolder(destiPaste[0], WbranchSize)) {
                                    $tree.jstree().move_node(childArray[j], destiPaste[0]); // Move roots of branch (and the branch) from clipboard to destination 
                                } else {
                                    alert("Operation impossible, il n'y pas assez d'espace sur le support de destination");
                                    return;
                                }
                            }
                            if (testWritable) {
                                //Repopulate the new folders
                                for (let y = 0; y < treeFolder.length; y++) { // Find the original child in treefolder                          
                                    if (treeFolder[y].id == allchildArray[ifold]) {
                                        for (let x = 0; x < mapFile.length; x++) { // Scan all files to duplicate to child dir
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
                            let evName = "Mcontextuel - Coller répertoire";
                            evCollector(evName, treeFolder[i].text, getDirName(destiPaste[0]));
                        }
                    }
                }
                WbranchSize = 0;
                $tree.jstree(true).open_node(destiPaste[0]);
                displayDirContent(destiPaste);
            };

            function verifDbl(element, placeId, operation) { // check doubles
                var testWritable = true;
                var FolderWritable = true // Ok to overwrite or simply write the dir
                if (element.type == "default" || element.type == "Répertoire") {
                    for (let i = 0; i < treeFolder.length; i++) {
                        if (treeFolder[i].text == element.text && treeFolder[i].parent == placeId) {
                            let toriz = confirm("Attention un répertoire avec le même nom existe déjà à cet emplacement, voulez-vous l'écraser ?");
                            if (toriz == true) {
                                FolderWritable = true;
                                $tree.jstree(true).move_node(treeFolder[i], "erased");

                                for (let x = 0; x < treeFolder.length; x++) {
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
                            //FolderWritable = false;
                        }
                    }
                    return FolderWritable;
                } else {
                    if (operation == "copy") {
                        if (placeId == element.origin) {
                            //Automatic Incrimentation double in same folder
                            let testFP = testFreeSpace(placeId, element, "copy"); // Test if there is enough space on the volume
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
                            for (let i = 0; i < mapFile.length; i++) {
                                if (mapFile[i].name == element.name && mapFile[i].extension == element.extension && mapFile[i].node == placeId) {
                                    //Doubles are identify
                                    var autoriz = confirm("Attention un fichier avec le même nom et la même extension existe déjà à cet emplacement, voulez-vous l'écraser ?");
                                    if (autoriz == true) {
                                        let testFP = testFreeSpace(placeId, element, "copy"); // Test if there is enough space on the volume
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

                                let testFP = testFreeSpace(placeId, element); // Test if there is enough space on the volume
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
                        for (let i = 0; i < mapFile.length; i++) {
                            if (mapFile[i].name == element.name && mapFile[i].node == placeId && mapFile[i].extension == element.extension) {

                                var autoriz = confirm("Attention un fichier avec le même nom et la même extension existe déjà à cet emplacement, voulez-vous l'écraser ?");
                                if (autoriz == true) {


                                    let testFP = testFreeSpace(placeId, element, "move"); // Test if there is enough space on the volume
                                    if (testFP) {
                                        //allowed
                                        mapFile[i].node = "erased"; // Erased the previous element  
                                        for (let y = 0; y < mapFile.length; y++) { // search the element to paste
                                            if (mapFile[y].name == element.name && mapFile[y].node == 'clipBoard' && mapFile[y].extension == element.extension) {
                                                mapFile[y].node = placeId;
                                                return mapFile[y];
                                            }
                                        }
                                    } else {
                                        //Not allowed
                                        alert("Espace insuffisant pour achever l'opération. Libérer de l'espace et recommencer");
                                        for (let y = 0; y < mapFile.length; y++) { // search the element to paste
                                            if (mapFile[y].name == element.name && mapFile[y].node == 'clipBoard' && mapFile[y].extension == element.extension) {
                                                mapFile[y].node = mapFile[y].origin; // Back to previous state      
                                            }
                                        }
                                        testWritable = false;

                                    }
                                } else {
                                    for (let y = 0; y < mapFile.length; y++) { // search the element to paste
                                        if (mapFile[y].name == element.name && mapFile[y].node == 'clipBoard' && mapFile[y].extension == element.extension) {
                                            mapFile[y].node = mapFile[y].origin; // Back to previous state      
                                        }
                                    }
                                }
                                testWritable = false;
                            }
                        }
                        if (testWritable == true) {
                            for (let i = 0; i < mapFile.length; i++) {
                                if (mapFile[i].name == element.name && mapFile[i].extension == element.extension && mapFile[i].node == "clipBoard") {
                                    let testFP = testFreeSpace(placeId, element, "move"); // Test if there is enough space on the volume
                                    if (testFP) {
                                        //allowed
                                        mapFile[i].node = placeId;
                                    } else {
                                        //Not allowed
                                        alert("Espace insuffisant pour achever l'opération. Libérer de l'espace et recommencer");
                                        testWritable = false;
                                        for (let y = 0; y < mapFile.length; y++) { // search the element to paste
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
                        for (let i = 0; i < mapFile.length; i++) {
                            if (mapFile[i].name == element.name && mapFile[i].node == placeId && mapFile[i].extension == element.extension) {
                                var autoriz = confirm("Attention un fichier avec le même nom et la même extension existe déjà à cet emplacement, voulez-vous l'écraser ?");
                                if (autoriz == true) {
                                    mapFile[i].node = "erased"; // Erased the previous element
                                    for (let y = 0; y < mapFile.length; y++) { // search the element to paste
                                        if (mapFile[y].fileId == element.fileId) {
                                            let testFP = testFreeSpace(placeId, element, "move"); // Test if there is enough space on the volume
                                            if (testFP) {
                                                //allowed
                                                mapFile[y].node = placeId;
                                                return mapFile[y];
                                            } else {
                                                //Not allowed
                                                alert("Espace insuffisant pour achever l'opération. Libérer de l'espace et recommencer");
                                                for (let y = 0; y < mapFile.length; y++) { // search the element to paste
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
                                    for (let y = 0; y < mapFile.length; y++) { // search the element to paste
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
                            for (let i = 0; i < mapFile.length; i++) {
                                if (mapFile[i].fileId == element.fileId) {
                                    let testFP = testFreeSpace(placeId, element, "move"); // Test if there is enough space on the volume
                                    if (testFP) {
                                        //allowed
                                        mapFile[i].node = placeId;
                                    } else {
                                        //Not allowed
                                        alert("Espace insuffisant pour achever l'opération. Libérer de l'espace et recommencer");
                                        for (let y = 0; y < mapFile.length; y++) { // search the element to paste
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

            function branchSize(rootId) { // root of branch to copy

                var bSize, rootNode, childNode;
                rootNode = $tree.jstree(true).get_node(rootId);
                childNode = rootNode.children_d;
                childNode.push(rootNode.id); // add the branch's root to the array
                for (let i = 0; i < childNode.length; i++) {
                    for (let y = 0; y < mapFile.length; y++) {
                        if (mapFile[y].node == childNode[i]) {
                            bSize = 0;
                            bSize = bSize + parseInt(mapFile[y].size);
                        }
                    }
                }
                if (!bSize) {
                    bSize = 0
                }
                return bSize;
            }


            function resetClipBoard() {
                // Get direct children and delete nodes or branches
            }


            function commandCopy(selectedId) {

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

                function findOriginal(baseTree) {
                    var ChildNodeArr = []
                    let baseNode = $tree.jstree(true).get_node(baseTree.id);
                    for (let i = 0; i < baseNode.children_d.length; i++) {
                        let nChild = $tree.jstree(true).get_node(baseNode.children_d[i]);
                        ChildNodeArr.push(nChild);
                    }
                    return ChildNodeArr;
                }

                // Action starts from Tree
                if (selectedId) {
                    var copyNodes = $tree.jstree(true).get_selected(); // get only ids of nodes

                    WbranchSize = branchSize(selectedId);
                    for (let x = 0; x < copyNodes.length; x++) {
                        // add branch weight
                        var newNode = $tree.jstree().copy_node(copyNodes[x], 'clipboard');
                        var newNodeData = $tree.jstree().get_node(newNode);

                        for (let i = 0; i < treeFolder.length; i++) {
                            if (treeFolder[i].id == copyNodes[x]) {
                                addCopyToJson(newNodeData, newNode, "clipboard", treeFolder[i]);

                                // Update Children in Json
                                childGroup = newNodeData.children_d;
                                for (let y = 0; y < childGroup.length; y++) {
                                    let newChild = $tree.jstree(true).get_node(childGroup[y]);
                                    let newChildDir = childGroup[y];
                                    let parentDir = newChild.parent;
                                    let CNodeOriginal = findOriginal(treeFolder[i], newChild.text); //-> retourne l'objet qu'on passe en TFolder

                                    for (let x = 0; x < CNodeOriginal.length; x++) {
                                        if (CNodeOriginal[x].text == newChild.text) {
                                            addCopyToJson(newChild, newChildDir, parentDir, CNodeOriginal[x]);
                                        }
                                    }
                                }
                            }
                        }
                        dataFolder();
                        let evName = "Mcontextuel  - copie de répertoire";
                    }
                    //Action starts from list
                } else {
                    SelectedArr = $fileList.rows({
                        selected: true
                    })[0];
                    for (let index = 0; index < SelectedArr.length; index++) {
                        const indexElement = SelectedArr[index];
                        var newId = mapFile.length + 1;
                        var element = $fileList.row(indexElement).data();
                        var childGroup;

                        // get only files id... no directories !
                        for (let i = 0; i < mapFile.length; i++) {
                            const idf = mapFile[i];
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
                                let evName = "Mcontextuel - Copier fichier";
                                evCollector(evName, mapFile[i].name + mapFile[i].extension, getDirName(mapFile[i].node));
                            }
                        }
                        // Second for loop to get directories
                        for (let i = 0; i < treeFolder.length; i++) {
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
                                    for (let y = 0; y < childGroup.length; y++) {
                                        let newChild = $tree.jstree(true).get_node(childGroup[y]);
                                        let newChildDir = childGroup[y];
                                        let parentDir = newChild.parent;
                                        let CNodeOriginal = findOriginal(treeFolder[i], newChild.text); //-> retourne l'objet qu'on passe en TFolder
                                        for (let x = 0; x < CNodeOriginal.length; x++) {
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

            function commandNewFile() {
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
                    let writable;
                    let newName = $container.find(".newFile").val();
                    let newExt = $container.find(".inputExtension").val();
                    for (let i = 0; i < mapFile.length; i++) {
                        if (mapFile[i].name == newName && mapFile[i].extension == "." + newExt && mapFile[i].node == actifNode[0].id) {
                            let crashIt = confirm("Un fichier porte déjà ce nom dans ce répertoire ! Désirez-vous l'écraser ?");
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

                        let evName = "Mcontextuel - Création de fichier";
                        evCollector(evName, newName, getDirName(actifNode[0].id));
                        dataFiles();
                    }
                });

            }

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
                    let writable;
                    let newName = $container.find(".newFolderInput").val();
                    for (let i = 0; i < treeFolder.length; i++) {
                        if (treeFolder[i].text == newName && treeFolder[i].parent == actifNode[0].id) {
                            let crashIt = confirm("Un répertoire porte déjà ce nom à cet endroit ! Désirez-vous l'écraser ? Attention l'ensemble des sous-dossiers seront perdus.");
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

                    function NewFolderCreator() {
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
                        let evName = "Mcontextuel - Création de répertoire";
                        evCollector(evName, newNodeData.text, getDirName(newNodeData.parent));
                        $container.find(".modali").hide();
                    }
                });
            }


            function createNode(parent_node, new_node_id, new_node_text, position) {
                $tree.jstree('create_node', $(parent_node), {
                    "text": new_node_text,
                    "id": new_node_id
                }, position, false, false);
            }

            function commandTrash(selectedNodes) {
                if (selectedNodes) {
                    for (let x = 0; x < selectedNodes.length; x++) {
                        const element = selectedNodes[x];

                        for (let i = 0; i < treeFolder.length; i++) {
                            const idfold = treeFolder[i];
                            if (idfold.id == element) {
                                treeFolder[i].origin = treeFolder[i].parent;
                                treeFolder[i].parent = "bin";
                                $tree.jstree().move_node(idfold.id, 'bin');
                                let evName = "Mcontextuel - Suppression de Répertoire";
                                evCollector(evName, treeFolder[i].text, getDirName(treeFolder[i].origin));
                                dataFolder();
                            }
                        }
                    }
                } else {
                    SelectedArr = $fileList.rows({
                        selected: true
                    })[0];
                    for (let index = 0; index < SelectedArr.length; index++) {
                        const indexElement = SelectedArr[index];
                        var element = $fileList.row(indexElement).data();
                        bin.push(element);

                        // get only files id no directories !
                        for (let i = 0; i < mapFile.length; i++) {
                            const idf = mapFile[i];
                            if (idf.fileId == element[0]) {
                                mapFile[i].origin = mapFile[i].node;
                                mapFile[i].node = "bin";

                                let evName = "Mcontextuel - Suppression de fichier vers corbeille";
                                evCollector(evName, mapFile[i].name + mapFile[i].extension, getDirName(mapFile[i].origin));
                                dataFiles();
                            }
                        }
                        // Second for loop to get directories
                        for (let i = 0; i < treeFolder.length; i++) {
                            const idfold = treeFolder[i];
                            if (idfold.id == element[0]) {
                                treeFolder[i].origin = treeFolder[i].parent;
                                treeFolder[i].parent = "bin";
                                $tree.jstree().move_node(idfold.id, 'bin');

                                let evName = "Mcontextuel - Suppression de Répertoire vers corbeille";
                                evCollector(evName, treeFolder[i].text, getDirName(treeFolder[i].origin));
                                dataFolder();
                            }
                        }
                    }
                }
                $fileList.rows('.selected').remove().draw(); // Remove row from tables

            };

            function commandRename(selectedNodeId, selectedNodeName) {
                var element;
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
                        for (let index = 0; index < SelectedArr.length; index++) {
                            const indexElement = SelectedArr[index];
                            element = $fileList.row(indexElement).data();
                            if (element[3] == "Répertoire") {
                                $container.find(".contentModal").html("<h3>Renommer le répertoire</h3><input class='renamerInput' type='text' value=" + getFolderName(element[0]) + " ><button class='btDirRenamer'>OK</button><button class='annulModal'>Annuler</button>");
                                $container.find(".btDirRenamer").click(function () {
                                    for (let i = 0; i < treeFolder.length; i++) {
                                        if (treeFolder[i].id == element[0]) {
                                            // Verify
                                            let newName = $container.find(".renamerInput").val();
                                            for (let y = 0; y < treeFolder.length; y++) {
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
                                                let evName = "Mcontextuel - Renommage du répertoire";
                                                evCollector(evName, treeFolder[i].originalName, treeFolder[i].text);
                                                dataFolder();
                                            }

                                        }
                                    }
                                    $container.find(".modali").hide();
                                    displayDirContent(activDir);
                                });

                            } else {

                                for (let index = 0; index < mapFile.length; index++) {
                                    const FileElement = mapFile[index];
                                    if (FileElement.fileId == element[0]) {
                                        $container.find(".contentModal").html("<h3>Renommer le fichier</h3><input class='renamerInput' type='text' value=" + getFileName(element[0]) + "> . <input class='RenameExtension' type='text' value=" + getExtension(element[0]).substring(1) + "><button class='btFileRenamer'>OK</button><button class='annulModal'>Annuler</button>");
                                        $container.find(".btFileRenamer").click(function () {
                                            // Check the name + ext in same dir
                                            if (mapFile[index].name == $container.find(".renamerInput").val() && mapFile[index].extension == "." + $container.find(".RenameExtension").val() && mapFile[index].node == activDir) {
                                                alert("Un fichier porte déjà ce nom et cette extension à cet endroit ! Impossible de le renommer ainsi. Choisissez un autre nom.");
                                                renamable = false;
                                                return renamable
                                            } else {
                                                var oldName = mapFile[index].name + mapFile[index].extension;
                                                mapFile[index].name = $container.find(".renamerInput").val();
                                                mapFile[index].extension = "." + $container.find(".RenameExtension").val();
                                                renamable = true;
                                            }

                                            if (renamable) {
                                                let newName = mapFile[index].name + mapFile[index].extension;
                                                mapFile[index].dateMod = getNowDate();
                                                $container.find(".modali").hide();
                                                $tree.jstree('open_node', activDir);
                                                displayDirContent(activDir);
                                                let evName = "Mcontextuel - Renommer le fichier";
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

                    $container.find(".annulModal").click(function () {
                        $container.find(".modali").hide();
                    });

                    $container.find(".contentModal").html("<h3>Renommer le répertoire</h3><input class='renamerInput' type='text' value=" + selectedNodeName + " ><button class='btDirRenamer'>OK</button><button class='annulModal'>Annuler</button>");
                    $container.find(".btDirRenamer").click(function () {
                        for (let i = 0; i < treeFolder.length; i++) {
                            if (treeFolder[i].id == selectedNodeId) {
                                // Verify
                                let newName = $container.find(".renamerInput").val();

                                for (let y = 0; y < treeFolder.length; y++) {
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
                                    let evName = "Mcontextuel - Renommage du répertoire";
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

            function commandProperties(selectedNode) {

                if (selectedNode) { // The node tree has been clicked

                    $container.find(".fakeModalWindow").html('<div class="modalTitle"><div class="windowTools"></div></div>');
                    $container.find(".modalTitle").css({
                        height: "37px",
                        opacity: "0.8"
                    });
                    $container.find('.windowTools').html($('<img>', {
                        src: assetManager.resolve('explo/runtime/css/img/close.png')
                    }));
                    $container.find('.windowTools img').addClass('annulModal');

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
                    const indexElement = SelectedArr[0];
                    var element = $fileList.row(indexElement).data();
                    if (SelectedArr.length == 0) {
                        alert("Aucun élément n'est sélectionné dans la liste.");
                    } else {
                        if (element[3] == "Répertoire" || element[3] == "Mémoire Flash" || element[3] == "Lecteur Optique CD" || element[3] == "Mémoire Flash usb" || element[3] == "Volume") {
                            for (let i = 0; i < treeFolder.length; i++) {
                                if (treeFolder[i].id == element[0]) {
                                    $container.find(".fakeModalWindow").html('<div class="modalTitle"><div class="windowTools"></div></div>');
                                    $container.find('.windowTools').html($('<img>', {
                                        src: assetManager.resolve('explo/runtime/css/img/close.png')
                                    }));
                                    $container.find('.windowTools img').addClass('annulModal');
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

                                    let evName = "Consultation des propriétés du répertoire";
                                    evCollector(evName, treeFolder[i].text, getDirName(treeFolder[i].parent));
                                }
                            }
                        } else {
                            for (let i = 0; i < mapFile.length; i++) {
                                if (mapFile[i].fileId == element[0]) {
                                    $container.find(".fakeModalWindow").html('<div class="modalTitle"><div class="windowTools"></div></div>');
                                    $container.find('.windowTools').html($('<img>', {
                                        src: assetManager.resolve('explo/runtime/css/img/close.png')
                                    }));
                                    $container.find('.windowTools img').addClass('annulModal');

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

                                    let evName = "Consultation des propriétés du fichier";
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




            function commandCompress() {
                $container.find(".modali").show().css({
                    width: "500px",
                    height: "500px"
                });
                $container.find(".modalTitle").css({
                    height: "37px",
                    opacity: "0.8"
                })
                $container.find(".contentModal").html("<h3>Compression des fichiers et répertoires</h3>" +
                    "<ul class = 'nav nav-tabs'> <li class = 'active'> <a data-toggle = 'tab' href='#home'> Options </a></li> <li><a data-toggle = 'tab' href='#menu1'> Sécurité </a></li> <li> <a data-toggle = 'tab' href='#menu2'> Détails </a></li> </ul> <div class='tab-content'> <div id='home' class='tab-pane fade in active'> <h3>HOME</h3><p> Some content.<ul><li>to <li>tu <li>ty </ul> </p> </div> <div id = 'menu1' class='tab-pane fade'><h3> Sécurité </h3> <p>Some content in menu 1.</p> </div> <div id='menu2' class='tab-pane fade'> <h3>Détails</h3> <p> Some content in menu 2. </p> </div> </div><button>OK</button><button class='annulModal'>Annuler</button>");
                $container.find(".newFolderInput").css("width", "170px").focus();
                $container.find(".annulModal").click(function () {
                    $container.find(".modali").hide();
                });
            }

            function commandEmptyTrash() {

                confirm("Vous allez vider la corbeille... Les données seront définitivement effacées.");
                var activDir = $tree.jstree(true).get_selected();
                //All elements are moved to the invisible folder Erased
                //Files to Erase
                for (let index = 0; index < mapFile.length; index++) {
                    if (mapFile[index].node == "bin") {
                        mapFile[index].node = "erased";
                        let evName = "Mcontextuel - Destruction définitive de fichier";
                        evCollector(evName, mapFile[index].name + mapFile[index].extension, getDirName(mapFile[index].origin));
                        dataFiles();
                    }
                }

                //Directories to Erase
                for (let i = 0; i < treeFolder.length; i++) { //Look throught Json Folders 
                    if (treeFolder[i].parent == "bin") {
                        $tree.jstree().move_node(treeFolder[i].id, "erased");
                        treeFolder[i].parent = "erased";
                        let evName = "Mcontextuel Destruction définitive de répertoire";
                        evCollector(evName, treeFolder[i].text, getDirName(treeFolder[i].origin));
                        dataFolder();
                    }
                }
                displayDirContent(activDir);
                $tree.jstree('open_node', activDir);
            }

            function commandRestaure() {
                var activDir = $tree.jstree(true).get_selected();
                if (activDir == "bin") {
                    SelectedArr = $fileList.rows({
                        selected: true
                    })[0];
                    for (let index = 0; index < SelectedArr.length; index++) {
                        const indexElement = SelectedArr[index];
                        var element = $fileList.row(indexElement).data();
                        // get only files id no directories !
                        for (let i = 0; i < mapFile.length; i++) {
                            const idf = mapFile[i];
                            if (idf.fileId == element[0]) {
                                mapFile[i].node = mapFile[i].origin;
                                mapFile[i].origin = "bin";
                                let evName = "Mcontextuel - Restaurer fichier de la corbeille";
                                evCollector(evName, mapFile[i].name + mapFile[i].extension, getDirName(mapFile[i].node));
                                dataFiles();
                            }
                        }
                        // Second for loop to get directories
                        for (let i = 0; i < treeFolder.length; i++) {
                            const idfold = treeFolder[i];
                            if (idfold.id == element[0]) {
                                treeFolder[i].parent = treeFolder[i].origin;
                                treeFolder[i].origin = "bin";
                                //$tree.jstree().hide_node(idfold.id);
                                $tree.jstree().move_node(idfold.id, 'bin');
                                dataFolder();
                                let evName = "Mcontextuel Restauration de répertoire";
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
            //***************End Context Mend Command************************/

            //************Modal windows functions******************************************/
            function euroDate(isodate) {
                var eurodate;

                if (!isNaN(isodate[0])) {
                    let dateObj = new Date(isodate);
                    eurodate = ('0' + dateObj.getDate()).slice(-2) + '/' + ('0' + (dateObj.getMonth() + 1)).slice(-2) + '/' + dateObj.getFullYear();
                } else {
                    eurodate = "-";
                }

                return eurodate;
            }
            //Create unique ID
            function ID() {
                // Math.random should be unique because of its seeding algorithm.
                // Convert it to base 36 (numbers + letters), and grab the first 9 characters
                // after the decimal.
                return '_' + Math.random().toString(36).substr(2, 9);
            };

            function getNowDate() {
                var today = new Date();
                return today.toISOString().substring(0, 10).replace(/-/g, "/");
            }

            function getDirName(id) {
                for (let i = 0; i < treeFolder.length; i++) {
                    if (id == treeFolder[i].id) {
                        var namer = treeFolder[i].text;
                    }
                }
                return namer;
            }
            //Cancel default contextMenu event ! 
            $container.find(".explo").on("contextmenu", function () {
                return false;
            });

            //Context Menu on List Files and folders
            let _menuItems = [{
                    type: "item",
                    icon: "clone",
                    text: "Copier",
                    key: "copy",
                    action: function () {
                        commandCopy();
                    }
                },
                {
                    type: "item",
                    icon: "scissors",
                    text: "Couper",
                    key: "commandCut",
                    action: function () {
                        commandCut();
                    }

                },
                {
                    type: "item",
                    icon: "clipboard",
                    text: "Coller",
                    key: "paste",
                    action: function () {
                        commandPaste();
                    }

                },
                {
                    type: "divider"
                },
                {
                    type: "submenu",
                    text: "Nouveau",
                    items: [{
                            type: "item",
                            icon: "file",
                            text: "Fichier",
                            key: "newFile",
                            action: function () {
                                commandNewFile();
                            }

                        },
                        {
                            type: "item",
                            icon: "folder",
                            text: "Répertoire",
                            key: "repertoire",
                            action: function () {
                                commandNewFolder();
                            }
                        }
                    ]
                },
                {
                    type: "item",
                    text: "Ouvrir",
                    key: "open",
                    action: function () {
                        var SelectedArr = $fileList.rows({
                            selected: true
                        })[0];
                        if (SelectedArr.length == 0) {
                            alert("Aucun fichier ou répertoire n'a été sélectionné. Sélectionner d'abord un élément de la liste ou double cliquer sur l'élément pour l'ouvrir")
                        } else {
                            const indexElement = SelectedArr[0];
                            var element = $fileList.row(indexElement).data();
                            // test File or Folder ?
                            if (element[3] == "Répertoire" || element[3] == "Mémoire Flash" || element[3] == "Lecteur Optique CD" || element[3] == "Mémoire Flash usb" || element[3] == "Volume") {
                                $tree.jstree('deselect_all');
                                $tree.jstree('select_node', element[0]);
                                $tree.jstree('open_node', element[0]);
                            } else { //file
                                for (let i = 0; i < mapFile.length; i++) {
                                    if (element[0] == mapFile[i].fileId) {
                                        let evName = "Mcontextuel - ouvrir fichier";
                                        evCollector(evName, mapFile[i].name + mapFile[i].extension, getDirName(mapFile[i].node));
                                        fileCall(mapFile[i].name + mapFile[i].extension, $tree.jstree(true).get_selected()); //file name + activDir
                                    };
                                }
                            }

                        }

                    }
                },
                {
                    type: "item",
                    text: "Renommer",
                    key: "rename",
                    action: function () {
                        commandRename();
                    }
                },
                {
                    type: "item",
                    text: "Supprimer",
                    icon: "trash",
                    key: "delete",
                    action: function () {
                        commandTrash();
                    }
                },
                {
                    type: "item",
                    text: "Propriétés",
                    key: "properties",
                    action: function () {
                        commandProperties();
                    }
                },
                {
                    type: "divider"
                },
                {
                    type: "item",
                    icon: "trash",
                    text: "Vider la corbeille",
                    action: function () {
                        commandEmptyTrash();
                    }
                },
                {
                    type: "item",
                    icon: "trash",
                    text: "restaurer Elément",
                    action: function () {
                        commandRestaure();
                    }
                },
                {
                    type: "item",
                    icon: "home",
                    text: "Home",
                    action: function () {
                        $tree.jstree('deselect_all');
                        $tree.jstree('select_node', 'root');
                        $tree.jstree('open_node', "root");
                    }
                }
            ];

            $container.find(".fileZone").contextMenu({
                items: _menuItems,
            });

            //End of Context Menu Files and Folders


            function isURL(str) {
                var pattern = new RegExp('^(https?:\\/\\/)?' + // protocol
                    '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.?)+[a-z]{2,}|' + // domain name
                    '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
                    '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
                    '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
                    '(\\#[-a-z\\d_]*)?$', 'i'); // fragment locator
                return pattern.test(str);
            }


            //Call app on file
            function fileCall(targetName, targetPlace) {

                for (let i = 0; i < mapFile.length; i++) {
                    let filetname = mapFile[i].name + mapFile[i].extension;
                    if (filetname == targetName && mapFile[i].node == targetPlace) {
                        mapFile[i].dateLastAcces = getNowDate();
                        var appImgUrl = mapFile[i].image_url;
                        if (!appImgUrl) {
                            appImgUrl = assetManager.resolve('explo/runtime/assets/Processing.png');
                        }

                        if (mapFile[i].extension == ".txt") {
                            if (mapFile[i].content) {
                                var content = mapFile[i].content
                            }
                            if (!content) {
                                content = " "
                            }

                            $container.find(".modalApp").show().css({
                                width: "700px",
                                height: "400px",
                                padding: "10px",
                                "text-align": "center"
                            });
                            $container.find('.windowToolbar').html($('<img>', {
                                src: assetManager.resolve('explo/runtime/css/img/close.png')
                            })).hide();
                            $container.find('.windowToolbar img').addClass('closeWindow');
                            $container.find(".contentModalApp").addClass("imageAppContainer");
                            const editorID = ID();
                            $container.find(".contentModalApp").html("<textarea cols='300' id=" + editorID + ">" + content + "</textarea><img class='waitIcon' src= " + assetManager.resolve('explo/runtime/assets/Loading_icon.gif') + ">");

                            var nicE = new nicEditor().panelInstance(editorID);

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
                                let evName = "Fermeture du fichier texte sans sauvegarder";
                                evCollector(evName, mapFile[i].name, mapFile[i].content);
                            });
                            $container.find(".saveTxt").click(function txtSaver(params) {

                                mapFile[i].dateMod = getNowDate();
                                mapFile[i].content = $container.find(".nicEdit-main")[0].innerText;
                                mapFile[i].size = mapFile[i].content.length / 10;
                                dataFiles();
                                let evName = "Sauvegarde du fichier texte";
                                evCollector(evName, mapFile[i].name, mapFile[i].content);

                                $container.find(".modalApp").hide();
                                $container.find(".saveTxt").remove();
                                $tree.jstree(true).open_node(mapFile[i].node);
                                displayDirContent(targetPlace);
                            })

                            $container.find(".closeWindow").click(function () {
                                $container.find(".modalApp").hide();
                                $container.find(".saveTxt").remove();
                            });

                        } else if (isURL(appImgUrl)) {
                            $container.find(".modalApp").show().css({
                                width: "1000px",
                                height: "550px"
                            });
                            $container.find('.windowToolbar').html($('<img>', {
                                src: assetManager.resolve('explo/runtime/css/img/close.png')
                            }));
                            $container.find('.windowToolbar img').addClass('closeWindow');
                            $container.find(".contentModalApp").addClass("imageAppContainer");
                            $container.find(".contentModalApp").html("<button class='annulModal topButtonCloser'>Fermer l'application et retourner à l'explorateur de fichiers</button><img class='imageApp' src=" + appImgUrl + ">");

                            $container.find(".annulModal").click(function () {
                                $container.find(".modalApp").hide();
                                let evName = "Confirmation de la consultation de l'image liée au fichier";
                                evCollector(evName, mapFile[i].name + mapFile[i].extension, getDirName(mapFile[i].node));

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


            searchResultArr = []; // A remettre à zéro au lancement de la recherche
            //************** Chapter Search ******************
            onlyOne = 0;
            $container.find(".magnify").on('click', function () {
                let el = $container.find(".searchInput").val(); // element à rechercher
                let startSearchId = $tree.jstree(true).get_selected()[0];
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

            function searchElement(el, startSearchId) {

                // The search is relative and start from the activ dir.
                // Display searchResult in table but not in the tree section

                $tree.jstree(true).open_all(startSearchId);

                var children = $tree.jstree('get_children_dom', startSearchId);

                if (onlyOne == 0) {
                    baseSearchFile();
                    onlyOne++;
                }

                function baseSearchFile() {
                    //Search files in the base directory
                    for (let i = 0; i < mapFile.length; i++) {
                        let startNode = $tree.jstree(true).get_node(startSearchId);

                        if (startSearchId == mapFile[i].node) {
                            let childrenNameLC = mapFile[i].name.toLowerCase();
                            let childrenExtLC = mapFile[i].extension.toLowerCase();
                            let elLC = el.toLowerCase();
                            var searchTestName = childrenNameLC.search(elLC);
                            var searchTestExt = childrenExtLC.search(elLC);

                            if (searchTestName >= 0 || searchTestExt >= 0) {
                                let newId = mapFile.length + 1;
                                let newEl = {
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

                for (let i = 0; i < children.length; i++) {
                    var childrenName = $tree.jstree('get_node', children[i].id).text;
                    let childrenNameLC = childrenName.toLowerCase();
                    let elLC = el.toLowerCase();
                    var searchTest = childrenNameLC.search(elLC);
                    var scanresult = scanFile(children[i].id, el);
                    if (scanresult.length > 0) {
                        for (let i = 0; i < scanresult.length; i++) {
                            let newId = mapFile.length + 1;
                            let newEl = {
                                'fileId': newId,
                                'node': 'searchResult',
                                'name': scanresult[i].name,
                                'extension': scanresult[i].extension,
                                'size': scanresult[i].size,
                                'dateMod': scanresult[i].dateMod,
                                'dateCreat': scanresult[i].dateCreat,
                                'app': scanresult[i].app,
                                'image_url': scanresult[i].image_url,
                                'dateLastAcces': scanresult[i].dateLastAcces,
                                'author': scanresult[i].author,
                                'content': scanresult[i].content,
                                'originalPath': scanresult[i].node
                            };
                            mapFile.push(newEl);
                        }
                    }
                    if (searchTest >= 0) { //If search is positive
                        searchResultArr.push([children[i].id, childrenName]);
                        searchElement(el, children[i].id); // Recursivity in case of success
                        var copySearchedDir = $tree.jstree().copy_node(children[i].id, 'searchResult');
                        var originalNode = $tree.jstree(true).get_node(children[i].id);
                        var searchedDir = $tree.jstree(true).get_node(copySearchedDir); //Copy node to searchResult -Error message DATA
                        searchedDir.data = [];

                        searchedDir.data.push({
                            "type": originalNode.data.type,
                            "dateMod": originalNode.data.dateMod,
                            'dateCreat': originalNode.data.dateCreat,
                            'originalPath': originalNode.parent
                        });
                        treeFolder.push({
                            "id": searchedDir.id,
                            "parent": "searchResult",
                            "text": originalNode.text,
                            "type": originalNode.type,
                            "data": {
                                "type": originalNode.data.type,
                                "dateMod": originalNode.data.dateMod,
                                "dateCreat": originalNode.data.dateCreat,
                                'originalPath': originalNode.parent
                            }
                        });
                        $tree.jstree(true).get_node(copySearchedDir).data.dateMod = originalNode.data.dateMod;
                        $tree.jstree(true).get_node(copySearchedDir).data.type = originalNode.data.type;
                        $tree.jstree(true).get_node(copySearchedDir).taille = ""
                        $tree.jstree(true).get_node(copySearchedDir).data.dateCreat = originalNode.data.dateCreat;

                        //display résolution
                        $tree.jstree('deselect_all');
                        $tree.jstree('select_node', "searchResult"); // But remains invisible
                    } else { //if search is negativ
                        searchElement(el, children[i].id); // Recursiv call 
                        $tree.jstree('deselect_all');
                        $tree.jstree('select_node', "searchResult"); // But remains invisible
                    }
                }
                $tree.jstree('deselect_all');
                $tree.jstree('select_node', "searchResult"); // But remains invisible
                return searchResultArr;
            }

            function scanFile(dirToScan, el) {
                var scanTest = false;
                var scanResult = [];
                for (let i = 0; i < mapFile.length; i++) {
                    if (mapFile[i].node == dirToScan && mapFile[i].name.toLowerCase().search(el.toLowerCase()) >= 0) {
                        scanTest = true;
                    }
                    if (mapFile[i].node == dirToScan && mapFile[i].extension.toLowerCase().search(el.toLowerCase()) >= 0) {
                        scanTest = true;
                    }

                    if (scanTest) {
                        scanResult.push(mapFile[i]);
                        scanTest = false
                    }
                }
                return scanResult
            }

            function cleanSearch() {
                for (let i = 0; i < treeFolder.length; i++) {
                    if (treeFolder[i].parent == 'searchResult') {
                        $tree.jstree(true).delete_node(treeFolder[i].id);
                    };
                }
                for (let y = 0; y < mapFile.length; y++) {
                    if (mapFile[y].node == 'searchResult') {
                        mapFile[y].node = 'archivSearch'; //All the files searched are archived
                        displayDirContent("searchResult");
                    }

                }

            }



            function bytUnit(size) {
                //Kbyte is the unity in Json file.
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


            function getAllChildren(node) { // Get all children for folders even deep - Input = node object !
                var node_info = $tree.jstree("get_node", node[0]);
                return node_info.children_d;
            }

            function getvol(node) {
                var node_info = $tree.jstree("get_node", node);
                //Two cases : normal folders and root folders
                let parents = [];

                if (node_info.data.type == "Volume" || node_info.data.type == "Mémoire Flash" || node_info.data.type == "Mémoire Flash usb") {
                    parents.push(node_info.id);
                } else {
                    parents = node_info.parents;
                }

                for (let i = 0; i < parents.length; i++) {
                    for (let y = 0; y < treeFolder.length; y++) {
                        if (parents[i] == treeFolder[y].id && treeFolder[y].data.type == "Volume" ||
                            parents[i] == treeFolder[y].id && node_info.data.type == "Mémoire Flash" ||
                            parents[i] == treeFolder[y].id && node_info.data.type == "Mémoire Flash usb") {
                            return treeFolder[y].id;
                        }
                    }
                }
            }

            function freeSpace(vol) {
                var freeSpace = 0,
                    occSpace = 0;
                var ChildArray = [];
                var tNode = $tree.jstree(true).get_node(vol, true)
                ChildArray = getAllChildren(tNode);
                if(ChildArray.indexOf(vol.id) === -1){ChildArray.push(vol.id)}

                //For root Volume 
                for (let i = 0; i < ChildArray.length; i++) {
                    for (let y = 0; y < mapFile.length; y++) {
                        if (mapFile[y].node == ChildArray[i]) {
                            occSpace = occSpace + parseInt(mapFile[y].size);
                        }
                    }
                }
                // FreeSpace evaluation
                for (let i = 0; i < treeFolder.length; i++) {
                    if (treeFolder[i].id == vol.id) {
                        freeSpace = parseInt(treeFolder[i].data.capacity) - occSpace;
                        treeFolder[i].data.freeSpace = freeSpace;
                    }
                }
                return freeSpace;
            }

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

            function duplicateFilestoNewFolder(orginalFolder, destiFolder) {
                for (let i = 0; i < mapFile.length; i++) {
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