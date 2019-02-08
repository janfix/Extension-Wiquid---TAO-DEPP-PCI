/*
Copyright 2019 -  DEPP - Ministère de l'éducation nationale France.
Developer : Jean-Philippe Rivière - Wiquid
www.wiquid.fr

Conception : Jean-Philippe Rivière - Saskia Keskpaik (DEPP) - Thierry Rocher.
Code Review : Sam Sipasseuth from OAT.

The base development structure was build by Wiquid's PCI Generator for TAO platform Free to use : www.wiquid.fr/pcigen 
This project use open source libraries : jstree, datatable, font-awesome, jQuery, Bootstap
 */

define([], function () {
var defaultJson = 
{"mapFile":[
    {
                    "fileId": 1,
                    "node": "vol1",
                    "name": "config",
                    "extension": ".js",
                    "size": "4000000000",
                    "dateMod": "2007-03-20",
                    "dateCreat": "2007-02-18",
                    "app" : "codeEditor.exe",
                    "dateLastAcces" : "2018-02-04",
                    "author" : "John Smith"

    },
    {
                    "fileId": 2,
                    "node": "vol1",
                    "name": "notice",
                    "extension": ".txt",
                    "size": "50000000",
                    "dateMod": "1998-02-04",
                    "dateCreat": "1997-02-03",
                    "content":"Ceci est un exemple de contenu",
                    "app": "Editor.exe",
                    "dateLastAcces": "2018-09-04",
                    "author": "Marc Smith"
    },
    {
                    "fileId": 3,
                    "node": "vol1",
                    "name": "Settings",
                    "extension": ".ppt",
                    "size": "50000000",
                    "dateMod": "2000-12-03",
                    "dateCreat": "2000-01-01",
                    "app" : "",
                    "dateLastAcces" : "",
                    "author" : "Pierre Martin"
    },
    {
                    "fileId": 4,
                    "node": "vol1",
                    "name": "agenda",
                    "extension": ".pdf",
                    "size": "50000000",
                    "dateMod": "2007-10-22",
                    "dateCreat": "2007-10-20",
                    "app" : "",
                    "dateLastAcces" : "",
                    "author" : "Pierre Martin"
    },
    {
                    "fileId": 5,
                    "node": "vol1",
                    "name": "libras",
                    "extension": ".cad",
                    "size": "50000000",
                    "dateMod": "2002-11-22",
                    "dateCreat": "2000-10-22",
                    "app" : "",
                    "dateLastAcces" : "",
                    "author" : "Pierre Martin"
    },
    {
                    "fileId": 6,
                    "node": "vol2",
                    "name": "grunt",
                    "extension": ".kop",
                    "size": "50000000",
                    "dateMod": "2002-01-27",
                    "dateCreat": "2002-01-22",
                    "app" : "",
                    "dateLastAcces" : "",
                    "author" : "Pierre Martin"
    },
    {
                    "fileId": 7,
                    "node": "cdRom",
                    "name": "boot",
                    "extension": ".sig",
                    "size": "5000000",
                    "dateMod": "2012-12-3",
                    "dateCreat": "2001-01-22",
                    "app" : "",
                    "dateLastAcces" : "",
                    "author" : "Pierre Martin"
    },
    {
                    "fileId": 8,
                    "node": "images",
                    "name": "selfy1",
                    "extension": ".png",
                    "size": "50000",
                    "dateMod": "2012-12-3",
                    "dateCreat": "2001-01-22",
                    "app" : "",
                    "dateLastAcces" : "",
                    "author" : "Pierre Martin",
                    "image_url": "http://www.wiquid.fr/img/img1.png"
    },
    {
                    "fileId": 9,
                    "node": "images",
                    "name": "selfy2",
                    "extension": ".png",
                    "size": "500000",
                    "dateMod": "2012-12-3",
                    "dateCreat": "2001-01-22",
                    "app" : "",
                    "dateLastAcces" : "",
                    "author" : "Pierre Martin",
                    "image_url": "http://www.wiquid.fr/img/img2.png"
    },
    {
                    "fileId": 10,
                    "node": "images",
                    "name": "selfy3",
                    "extension": ".png",
                    "size": "500000",
                    "dateMod": "2012-12-3",
                    "dateCreat": "2001-01-22",
                    "app" : "",
                    "dateLastAcces" : "",
                    "author" : "Pierre Martin",
                    "image_url": "http://www.wiquid.fr/img/img3.png"
    },
    {
                    "fileId": 11,
                    "node": "images",
                    "name": "metadonnees",
                    "extension": ".bulk",
                    "size": "50000000",
                    "dateMod": "2012-12-3",
                    "dateCreat": "2001-01-22",
                    "app" : "",
                    "dateLastAcces" : "",
                    "author" : "Pierre Martin"
    },
    {
                    "fileId": 12,
                    "node": "selidon",
                    "name": "protestor",
                    "extension": ".non",
                    "size": "50000000",
                    "dateMod": "2018-08-3",
                    "dateCreat": "2018-08-22",
                    "app" : "",
                    "dateLastAcces" : "",
                    "author" : "Pierre Martin"
    },    
    {
                    "fileId": 13,
                    "node": "dir1",
                    "name": "config",
                    "extension": ".js",
                    "size": "1000000000",
                    "dateMod": "2012-03-20",
                    "dateCreat": "2012-02-18",
                    "app" : "codeEditor.exe",
                    "dateLastAcces" : "2018-10-04",
                    "author" : "Jean-Philippe"
    },
    {
                    "fileId": 14,
                    "node": "vol2",
                    "name": "Settings",
                    "extension": ".set",
                    "size": "1000000000",
                    "dateMod": "2000-01-20",
                    "dateCreat": "2000-01-18",
                    "app" : "codeEditor.exe",
                    "dateLastAcces" : "2018-10-04",
                    "author" : "Jean-Philippe"
    },
    {
                    "fileId": 15,
                    "node": "vol2",
                    "name": "config",
                    "extension": ".js",
                    "size": "3000000000",
                    "dateMod": "2000-01-20",
                    "dateCreat": "2000-01-18",
                    "app" : "codeEditor.exe",
                    "dateLastAcces" : "2018-10-04",
                    "author" : "Jean-Philippe"
    }, 
    {
                    "fileId": 16,
                    "node": "videos",
                    "name": "longfilm",
                    "extension": ".bog",
                    "size": "45210",
                    "dateMod": "2000-01-20",
                    "dateCreat": "2000-01-18",
                    "app" : "codeEditor.exe",
                    "dateLastAcces" : "2018-10-04",
                    "author" : "Jean-Philippe"
    }, 
    {
                    "fileId": 17,
                    "node": "dir100",
                    "name": "biggoodfile",
                    "extension": ".xlt",
                    "size": "300000",
                    "dateMod": "2009-01-20",
                    "dateCreat": "2003-01-18",
                    "app" : "codeEditor.exe",
                    "dateLastAcces" : "2018-10-04",
                    "author" : "Jean-Philippe"
    }

], "treeFolder":[{
        "id": "root",
        "text": "Cet Ordinateur",
        
        "li_attr":
        {
            "id": "root"
        },
        "a_attr":
        {
            "href": "#",
            "id": "root_anchor"
        },
        "state":
        {
            "loaded": true,
            "opened": true,
            "selected": false,
            "disabled": false
        },
        "data":
        {
            "type": "Disque Système",
            "RAM": "8,00 Go",
            "système": "Linux 64 bits",
            "nom": "poste1",
            "dateMod": "2018-01-02",
            "dateCreat": "2001-08-22"
        },
        "parent": "#",
        "type": "root"
    },
    {
        "id": "clipboard",
        "state": {
            "hidden": true
        },
        "parent": "#",
        "text": "ClipBoard",
        "li_attr": {},
        "a_attr": {},
        "type": "clipboard",
        "data": {
            "type": "Volume",
            "dateMod": "-",
            "dateCreat": "2001-08-22"
        }
    },
    {
        "id": "searchResult",
        "state": {
            "hidden": true
        },
        "parent": "#",
        "text": "searchResult",
        "li_attr": {},
        "a_attr": {},
        "type": "searchResult",
        "data": {
            "type": "Volume",
            "dateMod": "-",
            "dateCreat": "-"
        }
    },
    {
        "id": "erased",
        "state": {
            "hidden": true
        },
        "parent": "#",
        "text": "erased",
        "li_attr": {},
        "a_attr": {},
        "type": "erased",
        "data": {
            "type": "erased",
            "dateMod": "-",
            "dateCreat": "-"
        }
    },
    {
        "id": "vol1",
        "parent": "root",
        "text": "C:",
        "li_attr": {},
        "a_attr": {},
        "type": "volume",
        "data": {
            "type": "Volume",
            "dateMod": "-",
            "dateCreat": "2001-08-22",
            "capacity": "8000000000"
        }
    },
    {
        "id": "dir1",
        "parent": "vol1",
        "text": "System",
        "li_attr": {},
        "a_attr": {},
        "type": "default",
        "data": {
            "copy":"",
            "type": "Répertoire",
            "dateMod": "2012-12-3",
            "dateCreat": "2001-08-22"
        }
    },
    {
        "id": "documents",
        "parent": "vol1",
        "text": "Documents",
        "li_attr": {},
        "a_attr": {},
        "type": "default",
        "data": {
            "copy":"",
            "type": "Répertoire",
            "dateMod": "2012-12-3",
            "dateCreat": "2001-08-22"
        }
    },
    {
        "id": "u1",
        "parent": "vol1",
        "text": "Users",
        "li_attr": {},
        "a_attr": {},
        "type": "default",
        "data": {
            "copy":"",
            "type": "Répertoire",
            "dateMod": "1978-01-4",
            "dateCreat": "2003-04-01"
        }
    },
     {
        "id": "u2",
        "parent": "dir1",
        "text": "Users",
        "li_attr": {},
        "a_attr": {},
        "type": "default",
        "data": {
            "copy":"",
            "type": "Répertoire",
            "dateMod": "2012-12-3",
            "dateCreat": "2001-08-22"
        }
    },
    {
        "id": "dir4",
        "parent": "vol1",
        "text": "Project",
        "li_attr": {},
        "a_attr": {},
        "type": "default",
        "data": {
            "copy":"",
            "type": "Répertoire",
            "dateMod": "2012-12-1",
            "dateCreat": "2001-08-22"
        }
    },
    {
        "id": "dir5",
        "parent": "vol1",
        "text": "Programmes",
        "li_attr": {},
        "a_attr": {},
        "type": "default",
        "data": {
            "copy":"",
            "type": "Répertoire",
            "dateMod": "2012-12-3",
            "dateCreat": "2001-08-22"
        }
    },
    {
        "id": "vol2",
        "parent": "root",
        "text": "D:",
        "state": {
            "opened": false
        },
        "type": "volume",
        "data": {
            "type": "Volume",
            "dateMod": "-",
            "dateCreat": "2001-08-22",
            "capacity": "8000000000",
            "freeSpace": "8000000000"
        }
    },
    {
        "id": "downloads",
        "parent": "vol2",
        "text": "Téléchargement",
        "type": "default",
        "data": {
            "copy":"",
            "type": "Répertoire",
            "dateMod": "2012-12-3",
            "dateCreat": "2001-08-22"
        }
    },
    {
        "id": "modeles",
        "parent": "vol2",
        "text": "Modèles",
        "type": "default",
        "data": {
            "copy":"",
            "type": "Répertoire",
            "dateMod": "2012-12-3",
            "dateCreat": "2001-08-22"
        }
    },
    {
        "id": "videos",
        "parent": "vol2",
        "text": "Vidéos",
        "type": "default",
        "data": {
            "copy":"",
            "type": "Répertoire",
            "dateMod": "2012-12-3",
            "dateCreat": "2001-08-22"
        }
    },
    {
        "id": "images",
        "parent": "vol2",
        "text": "Images",
        "type": "default",
        "data": {
            "copy":"",
            "type": "Répertoire",
            "dateMod": "2012-12-3",
            "dateCreat": "2001-08-22"
        }
    },
    {
        "id": "selfies",
        "parent": "images",
        "text": "selfies",
        "type": "default",
        "data": {
            "copy":"",
            "type": "Répertoire",
            "dateMod": "2018-02-31",
            "dateCreat": "2017-08-22"
        }
    },
    {
        "id": "cdRom",
        "parent": "root",
        "text": "Lecteur CD/DVD",
        "type": "cdRom",
        "data": {
            "type": "Lecteur Optique CD/DVD",
            "dateMod": "2012-12-3",
            "dateCreat": "2001-08-22",
            "capacity": "6000000",
            "freeSpace": "6000000"
        }
    },
    {
        "id": "sdCard",
        "parent": "root",
        "text": "Mémoire flash",
        "type": "sdCard",
        "data": {
            "type": "Mémoire Flash",
            "dateMod": "2012-12-3",
            "dateCreat": "2001-08-22",
            "capacity": "1000000",
            "freeSpace": "1000000"
        }
    },
    {
        "id": "usb",
        "parent": "root",
        "text": "clé USB",
        "type": "usb",
        "data": {
            "type": "Mémoire Flash usb",
            "dateMod": "2012-12-4",
            "dateCreat": "2011-01-22",
            "capacity": "1600000",
            "freeSpace": "1600000"
        }
    },
    {
        "id": "netWork",
        "parent": "#",
        "text": "Réseau Local",
        "type": "netWork",
        "data": {
            "type": "Réseau",
            "dateMod": "2012-12-3",
            "dateCreat": "2001-08-22"
        }
    },
    {
        "id": "bin",
        "parent": "#",
        "text": "Corbeille",
        "type": "bin",
        "data": {
            "type": "Poubelle",
            "dateMod": "2012-12-3",
            "dateCreat": "2001-08-22"
        }
    },
    {
        "id": "prtest",
        "parent": "downloads",
        "text": "prtest",
        "type": "default",
        "data": {
            "copy":"",
            "type": "Répertoire",
            "dateMod": "2012-12-3",
            "dateCreat": "2001-08-22"
        }
    },
    {
        "id": "pratique",
        "parent": "prtest",
        "text": "pratique",
        "type": "default",
        "data": {
            "copy":"",
            "type": "Répertoire",
            "dateMod": "2012-12-3",
            "dateCreat": "2001-08-22"
        }
    },
    {
        "id": "user3",
        "parent": "vol2",
        "text": "Users212",
        "type": "default",
        "data": {
            "copy":"",
            "type": "Répertoire",
            "dateMod": "2012-12-3",
            "dateCreat": "2001-08-22"
        }
    },
    {
        "id": "parsel",
        "parent": "prtest",
        "text": "parsel",
        "type": "default",
        "data": {
            "copy":"",
            "type": "Répertoire",
            "dateMod": "2012-12-3",
            "dateCreat": "2001-08-22"
        }
    },
    {
        "id": "selidon",
        "parent": "pratique",
        "text": "selidon",
        "type": "default",
        "data": {
            "copy":"",
            "type": "Répertoire",
            "dateMod": "2012-12-3",
            "dateCreat": "2001-08-22"
        }
    }]
}
return defaultJson
});