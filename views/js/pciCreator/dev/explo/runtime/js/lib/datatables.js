define([
'IMSGlobal/jquery_2_1_1',
'explo/runtime/js/lib/tether.min'
], function($,Tether) {
	'use strict';
	
	/*
	 * This combined file was created by the DataTables downloader builder:
	 *   https://datatables.net/download
	 *
	 * To rebuild or modify this file with the latest versions of the included
	 * software please visit:
	 *   https://datatables.net/download/#dt/dt-1.10.18
	 *
	 * Included libraries:
	 *   DataTables 1.10.18
	 */

	/*! DataTables 1.10.18
	 * ©2008-2018 SpryMedia Ltd - datatables.net/license
	 */

	/**
	 * @summary     DataTables
	 * @description Paginate, search and order HTML tables
	 * @version     1.10.18
	 * @file        jquery.dataTables.js
	 * @author      SpryMedia Ltd
	 * @contact     www.datatables.net
	 * @copyright   Copyright 2008-2018 SpryMedia Ltd.
	 *
	 * This source file is free software, available under the following license:
	 *   MIT license - http://datatables.net/license
	 *
	 * This source file is distributed in the hope that it will be useful, but
	 * WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY
	 * or FITNESS FOR A PARTICULAR PURPOSE. See the license files for details.
	 *
	 * For details please refer to: http://www.datatables.net
	 */

	/*jslint evil: true, undef: true, browser: true */
	/*globals $,require,jQuery,define,_selector_run,_selector_opts,_selector_first,_selector_row_indexes,_ext,_Api,_api_register,_api_registerPlural,_re_new_lines,_re_html,_re_formatted_numeric,_re_escape_regex,_empty,_intVal,_numToDecimal,_isNumber,_isHtml,_htmlNumeric,_pluck,_pluck_order,_range,_stripHtml,_unique,_fnBuildAjax,_fnAjaxUpdate,_fnAjaxParameters,_fnAjaxUpdateDraw,_fnAjaxDataSrc,_fnAddColumn,_fnColumnOptions,_fnAdjustColumnSizing,_fnVisibleToColumnIndex,_fnColumnIndexToVisible,_fnVisbleColumns,_fnGetColumns,_fnColumnTypes,_fnApplyColumnDefs,_fnHungarianMap,_fnCamelToHungarian,_fnLanguageCompat,_fnBrowserDetect,_fnAddData,_fnAddTr,_fnNodeToDataIndex,_fnNodeToColumnIndex,_fnGetCellData,_fnSetCellData,_fnSplitObjNotation,_fnGetObjectDataFn,_fnSetObjectDataFn,_fnGetDataMaster,_fnClearTable,_fnDeleteIndex,_fnInvalidate,_fnGetRowElements,_fnCreateTr,_fnBuildHead,_fnDrawHead,_fnDraw,_fnReDraw,_fnAddOptionsHtml,_fnDetectHeader,_fnGetUniqueThs,_fnFeatureHtmlFilter,_fnFilterComplete,_fnFilterCustom,_fnFilterColumn,_fnFilter,_fnFilterCreateSearch,_fnEscapeRegex,_fnFilterData,_fnFeatureHtmlInfo,_fnUpdateInfo,_fnInfoMacros,_fnInitialise,_fnInitComplete,_fnLengthChange,_fnFeatureHtmlLength,_fnFeatureHtmlPaginate,_fnPageChange,_fnFeatureHtmlProcessing,_fnProcessingDisplay,_fnFeatureHtmlTable,_fnScrollDraw,_fnApplyToChildren,_fnCalculateColumnWidths,_fnThrottle,_fnConvertToWidth,_fnGetWidestNode,_fnGetMaxLenString,_fnStringToCss,_fnSortFlatten,_fnSort,_fnSortAria,_fnSortListener,_fnSortAttachListener,_fnSortingClasses,_fnSortData,_fnSaveState,_fnLoadState,_fnSettingsFromNode,_fnLog,_fnMap,_fnBindAction,_fnCallbackReg,_fnCallbackFire,_fnLengthOverflow,_fnRenderer,_fnDataSource,_fnRowAttributes*/

	(function (factory) {
			"use strict";

			if (typeof define === 'function' && define.amd) {
				// AMD
				//console.log("cas AMD");
				factory($, window, document);
				/* define(['jquery'], function ($) {
					console.log($);
					return factory($, window, document);
				}); */
			} else if (typeof exports === 'object') {
				// CommonJS
				module.exports = function (root, $) {
					if (!root) {
						// CommonJS environments without a window global must pass a
						// root. This will give an error otherwise
						root = window;
					}

					if (!$) {
						$ = typeof window !== 'undefined' ? // jQuery's factory checks for a global window
							require('jquery') :
							require('jquery')(root);
					}

					return factory($, root, root.document);
				};
			} else {
				// Browser
				factory(jQuery, window, document);
			}
		}
		(function ($, window, document, undefined) {
			"use strict";
		//	console.log($);
			/**
			 * DataTables is a plug-in for the jQuery Javascript library. It is a highly
			 * flexible tool, based upon the foundations of progressive enhancement,
			 * which will add advanced interaction controls to any HTML table. For a
			 * full list of features please refer to
			 * [DataTables.net](href="http://datatables.net).
			 *
			 * Note that the `DataTable` object is not a global variable but is aliased
			 * to `jQuery.fn.DataTable` and `jQuery.fn.dataTable` through which it may
			 * be  accessed.
			 *
			 *  @class
			 *  @param {object} [init={}] Configuration object for DataTables. Options
			 *    are defined by {@link DataTable.defaults}
			 *  @requires jQuery 1.7+
			 *
			 *  @example
			 *    // Basic initialisation
			 *    $(document).ready( function {
			 *      $('#example').dataTable();
			 *    } );
			 *
			 *  @example
			 *    // Initialisation with configuration options - in this case, disable
			 *    // pagination and sorting.
			 *    $(document).ready( function {
			 *      $('#example').dataTable( {
			 *        "paginate": false,
			 *        "sort": false
			 *      } );
			 *    } );
			 */
			var DataTable = function (options) {
				/**
				 * Perform a jQuery selector action on the table's TR elements (from the tbody) and
				 * return the resulting jQuery object.
				 *  @param {string|node|jQuery} sSelector jQuery selector or node collection to act on
				 *  @param {object} [oOpts] Optional parameters for modifying the rows to be included
				 *  @param {string} [oOpts.filter=none] Select TR elements that meet the current filter
				 *    criterion ("applied") or all TR elements (i.e. no filter).
				 *  @param {string} [oOpts.order=current] Order of the TR elements in the processed array.
				 *    Can be either 'current', whereby the current sorting of the table is used, or
				 *    'original' whereby the original order the data was read into the table is used.
				 *  @param {string} [oOpts.page=all] Limit the selection to the currently displayed page
				 *    ("current") or not ("all"). If 'current' is given, then order is assumed to be
				 *    'current' and filter is 'applied', regardless of what they might be given as.
				 *  @returns {object} jQuery object, filtered by the given selector.
				 *  @dtopt API
				 *  @deprecated Since v1.10
				 *
				 *  @example
				 *    $(document).ready(function() {
				 *      var oTable = $('#example').dataTable();
				 *
				 *      // Highlight every second row
				 *      oTable.$('tr:odd').css('backgroundColor', 'blue');
				 *    } );
				 *
				 *  @example
				 *    $(document).ready(function() {
				 *      var oTable = $('#example').dataTable();
				 *
				 *      // Filter to rows with 'Webkit' in them, add a background colour and then
				 *      // remove the filter, thus highlighting the 'Webkit' rows only.
				 *      oTable.fnFilter('Webkit');
				 *      oTable.$('tr', {"search": "applied"}).css('backgroundColor', 'blue');
				 *      oTable.fnFilter('');
				 *    } );
				 */
				this.$ = function (sSelector, oOpts) {
					return this.api(true).$(sSelector, oOpts);
				};


				/**
				 * Almost identical to $ in operation, but in this case returns the data for the matched
				 * rows - as such, the jQuery selector used should match TR row nodes or TD/TH cell nodes
				 * rather than any descendants, so the data can be obtained for the row/cell. If matching
				 * rows are found, the data returned is the original data array/object that was used to
				 * create the row (or a generated array if from a DOM source).
				 *
				 * This method is often useful in-combination with $ where both functions are given the
				 * same parameters and the array indexes will match identically.
				 *  @param {string|node|jQuery} sSelector jQuery selector or node collection to act on
				 *  @param {object} [oOpts] Optional parameters for modifying the rows to be included
				 *  @param {string} [oOpts.filter=none] Select elements that meet the current filter
				 *    criterion ("applied") or all elements (i.e. no filter).
				 *  @param {string} [oOpts.order=current] Order of the data in the processed array.
				 *    Can be either 'current', whereby the current sorting of the table is used, or
				 *    'original' whereby the original order the data was read into the table is used.
				 *  @param {string} [oOpts.page=all] Limit the selection to the currently displayed page
				 *    ("current") or not ("all"). If 'current' is given, then order is assumed to be
				 *    'current' and filter is 'applied', regardless of what they might be given as.
				 *  @returns {array} Data for the matched elements. If any elements, as a result of the
				 *    selector, were not TR, TD or TH elements in the DataTable, they will have a null
				 *    entry in the array.
				 *  @dtopt API
				 *  @deprecated Since v1.10
				 *
				 *  @example
				 *    $(document).ready(function() {
				 *      var oTable = $('#example').dataTable();
				 *
				 *      // Get the data from the first row in the table
				 *      var data = oTable._('tr:first');
				 *
				 *      // Do something useful with the data
				 *      alert( "First cell is: "+data[0] );
				 *    } );
				 *
				 *  @example
				 *    $(document).ready(function() {
				 *      var oTable = $('#example').dataTable();
				 *
				 *      // Filter to 'Webkit' and get all data for
				 *      oTable.fnFilter('Webkit');
				 *      var data = oTable._('tr', {"search": "applied"});
				 *
				 *      // Do something with the data
				 *      alert( data.length+" rows matched the search" );
				 *    } );
				 */
				this._ = function (sSelector, oOpts) {
					return this.api(true).rows(sSelector, oOpts).data();
				};


				/**
				 * Create a DataTables Api instance, with the currently selected tables for
				 * the Api's context.
				 * @param {boolean} [traditional=false] Set the API instance's context to be
				 *   only the table referred to by the `DataTable.ext.iApiIndex` option, as was
				 *   used in the API presented by DataTables 1.9- (i.e. the traditional mode),
				 *   or if all tables captured in the jQuery object should be used.
				 * @return {DataTables.Api}
				 */
				this.api = function (traditional) {
					return traditional ?
						new _Api(
							_fnSettingsFromNode(this[_ext.iApiIndex])
						) :
						new _Api(this);
				};


				/**
				 * Add a single new row or multiple rows of data to the table. Please note
				 * that this is suitable for client-side processing only - if you are using
				 * server-side processing (i.e. "bServerSide": true), then to add data, you
				 * must add it to the data source, i.e. the server-side, through an Ajax call.
				 *  @param {array|object} data The data to be added to the table. This can be:
				 *    <ul>
				 *      <li>1D array of data - add a single row with the data provided</li>
				 *      <li>2D array of arrays - add multiple rows in a single call</li>
				 *      <li>object - data object when using <i>mData</i></li>
				 *      <li>array of objects - multiple data objects when using <i>mData</i></li>
				 *    </ul>
				 *  @param {bool} [redraw=true] redraw the table or not
				 *  @returns {array} An array of integers, representing the list of indexes in
				 *    <i>aoData</i> ({@link DataTable.models.oSettings}) that have been added to
				 *    the table.
				 *  @dtopt API
				 *  @deprecated Since v1.10
				 *
				 *  @example
				 *    // Global var for counter
				 *    var giCount = 2;
				 *
				 *    $(document).ready(function() {
				 *      $('#example').dataTable();
				 *    } );
				 *
				 *    function fnClickAddRow() {
				 *      $('#example').dataTable().fnAddData( [
				 *        giCount+".1",
				 *        giCount+".2",
				 *        giCount+".3",
				 *        giCount+".4" ]
				 *      );
				 *
				 *      giCount++;
				 *    }
				 */
				this.fnAddData = function (data, redraw) {
					var api = this.api(true);

					/* Check if we want to add multiple rows or not */
					var rows = $.isArray(data) && ($.isArray(data[0]) || $.isPlainObject(data[0])) ?
						api.rows.add(data) :
						api.row.add(data);

					if (redraw === undefined || redraw) {
						api.draw();
					}

					return rows.flatten().toArray();
				};


				/**
				 * This function will make DataTables recalculate the column sizes, based on the data
				 * contained in the table and the sizes applied to the columns (in the DOM, CSS or
				 * through the sWidth parameter). This can be useful when the width of the table's
				 * parent element changes (for example a window resize).
				 *  @param {boolean} [bRedraw=true] Redraw the table or not, you will typically want to
				 *  @dtopt API
				 *  @deprecated Since v1.10
				 *
				 *  @example
				 *    $(document).ready(function() {
				 *      var oTable = $('#example').dataTable( {
				 *        "sScrollY": "200px",
				 *        "bPaginate": false
				 *      } );
				 *
				 *      $(window).on('resize', function () {
				 *        oTable.fnAdjustColumnSizing();
				 *      } );
				 *    } );
				 */
				this.fnAdjustColumnSizing = function (bRedraw) {
					var api = this.api(true).columns.adjust();
					var settings = api.settings()[0];
					var scroll = settings.oScroll;

					if (bRedraw === undefined || bRedraw) {
						api.draw(false);
					} else if (scroll.sX !== "" || scroll.sY !== "") {
						/* If not redrawing, but scrolling, we want to apply the new column sizes anyway */
						_fnScrollDraw(settings);
					}
				};


				/**
				 * Quickly and simply clear a table
				 *  @param {bool} [bRedraw=true] redraw the table or not
				 *  @dtopt API
				 *  @deprecated Since v1.10
				 *
				 *  @example
				 *    $(document).ready(function() {
				 *      var oTable = $('#example').dataTable();
				 *
				 *      // Immediately 'nuke' the current rows (perhaps waiting for an Ajax callback...)
				 *      oTable.fnClearTable();
				 *    } );
				 */
				this.fnClearTable = function (bRedraw) {
					var api = this.api(true).clear();

					if (bRedraw === undefined || bRedraw) {
						api.draw();
					}
				};


				/**
				 * The exact opposite of 'opening' a row, this function will close any rows which
				 * are currently 'open'.
				 *  @param {node} nTr the table row to 'close'
				 *  @returns {int} 0 on success, or 1 if failed (can't find the row)
				 *  @dtopt API
				 *  @deprecated Since v1.10
				 *
				 *  @example
				 *    $(document).ready(function() {
				 *      var oTable;
				 *
				 *      // 'open' an information row when a row is clicked on
				 *      $('#example tbody tr').click( function () {
				 *        if ( oTable.fnIsOpen(this) ) {
				 *          oTable.fnClose( this );
				 *        } else {
				 *          oTable.fnOpen( this, "Temporary row opened", "info_row" );
				 *        }
				 *      } );
				 *
				 *      oTable = $('#example').dataTable();
				 *    } );
				 */
				this.fnClose = function (nTr) {
					this.api(true).row(nTr).child.hide();
				};


				/**
				 * Remove a row for the table
				 *  @param {mixed} target The index of the row from aoData to be deleted, or
				 *    the TR element you want to delete
				 *  @param {function|null} [callBack] Callback function
				 *  @param {bool} [redraw=true] Redraw the table or not
				 *  @returns {array} The row that was deleted
				 *  @dtopt API
				 *  @deprecated Since v1.10
				 *
				 *  @example
				 *    $(document).ready(function() {
				 *      var oTable = $('#example').dataTable();
				 *
				 *      // Immediately remove the first row
				 *      oTable.fnDeleteRow( 0 );
				 *    } );
				 */
				this.fnDeleteRow = function (target, callback, redraw) {
					var api = this.api(true);
					var rows = api.rows(target);
					var settings = rows.settings()[0];
					var data = settings.aoData[rows[0][0]];

					rows.remove();

					if (callback) {
						callback.call(this, settings, data);
					}

					if (redraw === undefined || redraw) {
						api.draw();
					}

					return data;
				};


				/**
				 * Restore the table to it's original state in the DOM by removing all of DataTables
				 * enhancements, alterations to the DOM structure of the table and event listeners.
				 *  @param {boolean} [remove=false] Completely remove the table from the DOM
				 *  @dtopt API
				 *  @deprecated Since v1.10
				 *
				 *  @example
				 *    $(document).ready(function() {
				 *      // This example is fairly pointless in reality, but shows how fnDestroy can be used
				 *      var oTable = $('#example').dataTable();
				 *      oTable.fnDestroy();
				 *    } );
				 */
				this.fnDestroy = function (remove) {
					this.api(true).destroy(remove);
				};


				/**
				 * Redraw the table
				 *  @param {bool} [complete=true] Re-filter and resort (if enabled) the table before the draw.
				 *  @dtopt API
				 *  @deprecated Since v1.10
				 *
				 *  @example
				 *    $(document).ready(function() {
				 *      var oTable = $('#example').dataTable();
				 *
				 *      // Re-draw the table - you wouldn't want to do it here, but it's an example :-)
				 *      oTable.fnDraw();
				 *    } );
				 */
				this.fnDraw = function (complete) {
					// Note that this isn't an exact match to the old call to _fnDraw - it takes
					// into account the new data, but can hold position.
					this.api(true).draw(complete);
				};


				/**
				 * Filter the input based on data
				 *  @param {string} sInput String to filter the table on
				 *  @param {int|null} [iColumn] Column to limit filtering to
				 *  @param {bool} [bRegex=false] Treat as regular expression or not
				 *  @param {bool} [bSmart=true] Perform smart filtering or not
				 *  @param {bool} [bShowGlobal=true] Show the input global filter in it's input box(es)
				 *  @param {bool} [bCaseInsensitive=true] Do case-insensitive matching (true) or not (false)
				 *  @dtopt API
				 *  @deprecated Since v1.10
				 *
				 *  @example
				 *    $(document).ready(function() {
				 *      var oTable = $('#example').dataTable();
				 *
				 *      // Sometime later - filter...
				 *      oTable.fnFilter( 'test string' );
				 *    } );
				 */
				this.fnFilter = function (sInput, iColumn, bRegex, bSmart, bShowGlobal, bCaseInsensitive) {
					var api = this.api(true);

					if (iColumn === null || iColumn === undefined) {
						api.search(sInput, bRegex, bSmart, bCaseInsensitive);
					} else {
						api.column(iColumn).search(sInput, bRegex, bSmart, bCaseInsensitive);
					}

					api.draw();
				};


				/**
				 * Get the data for the whole table, an individual row or an individual cell based on the
				 * provided parameters.
				 *  @param {int|node} [src] A TR row node, TD/TH cell node or an integer. If given as
				 *    a TR node then the data source for the whole row will be returned. If given as a
				 *    TD/TH cell node then iCol will be automatically calculated and the data for the
				 *    cell returned. If given as an integer, then this is treated as the aoData internal
				 *    data index for the row (see fnGetPosition) and the data for that row used.
				 *  @param {int} [col] Optional column index that you want the data of.
				 *  @returns {array|object|string} If mRow is undefined, then the data for all rows is
				 *    returned. If mRow is defined, just data for that row, and is iCol is
				 *    defined, only data for the designated cell is returned.
				 *  @dtopt API
				 *  @deprecated Since v1.10
				 *
				 *  @example
				 *    // Row data
				 *    $(document).ready(function() {
				 *      oTable = $('#example').dataTable();
				 *
				 *      oTable.$('tr').click( function () {
				 *        var data = oTable.fnGetData( this );
				 *        // ... do something with the array / object of data for the row
				 *      } );
				 *    } );
				 *
				 *  @example
				 *    // Individual cell data
				 *    $(document).ready(function() {
				 *      oTable = $('#example').dataTable();
				 *
				 *      oTable.$('td').click( function () {
				 *        var sData = oTable.fnGetData( this );
				 *        alert( 'The cell clicked on had the value of '+sData );
				 *      } );
				 *    } );
				 */
				this.fnGetData = function (src, col) {
					var api = this.api(true);

					if (src !== undefined) {
						var type = src.nodeName ? src.nodeName.toLowerCase() : '';

						return col !== undefined || type == 'td' || type == 'th' ?
							api.cell(src, col).data() :
							api.row(src).data() || null;
					}

					return api.data().toArray();
				};


				/**
				 * Get an array of the TR nodes that are used in the table's body. Note that you will
				 * typically want to use the '$' API method in preference to this as it is more
				 * flexible.
				 *  @param {int} [iRow] Optional row index for the TR element you want
				 *  @returns {array|node} If iRow is undefined, returns an array of all TR elements
				 *    in the table's body, or iRow is defined, just the TR element requested.
				 *  @dtopt API
				 *  @deprecated Since v1.10
				 *
				 *  @example
				 *    $(document).ready(function() {
				 *      var oTable = $('#example').dataTable();
				 *
				 *      // Get the nodes from the table
				 *      var nNodes = oTable.fnGetNodes( );
				 *    } );
				 */
				this.fnGetNodes = function (iRow) {
					var api = this.api(true);

					return iRow !== undefined ?
						api.row(iRow).node() :
						api.rows().nodes().flatten().toArray();
				};


				/**
				 * Get the array indexes of a particular cell from it's DOM element
				 * and column index including hidden columns
				 *  @param {node} node this can either be a TR, TD or TH in the table's body
				 *  @returns {int} If nNode is given as a TR, then a single index is returned, or
				 *    if given as a cell, an array of [row index, column index (visible),
				 *    column index (all)] is given.
				 *  @dtopt API
				 *  @deprecated Since v1.10
				 *
				 *  @example
				 *    $(document).ready(function() {
				 *      $('#example tbody td').click( function () {
				 *        // Get the position of the current data from the node
				 *        var aPos = oTable.fnGetPosition( this );
				 *
				 *        // Get the data array for this row
				 *        var aData = oTable.fnGetData( aPos[0] );
				 *
				 *        // Update the data array and return the value
				 *        aData[ aPos[1] ] = 'clicked';
				 *        this.innerHTML = 'clicked';
				 *      } );
				 *
				 *      // Init DataTables
				 *      oTable = $('#example').dataTable();
				 *    } );
				 */
				this.fnGetPosition = function (node) {
					var api = this.api(true);
					var nodeName = node.nodeName.toUpperCase();

					if (nodeName == 'TR') {
						return api.row(node).index();
					} else if (nodeName == 'TD' || nodeName == 'TH') {
						var cell = api.cell(node).index();

						return [
							cell.row,
							cell.columnVisible,
							cell.column
						];
					}
					return null;
				};


				/**
				 * Check to see if a row is 'open' or not.
				 *  @param {node} nTr the table row to check
				 *  @returns {boolean} true if the row is currently open, false otherwise
				 *  @dtopt API
				 *  @deprecated Since v1.10
				 *
				 *  @example
				 *    $(document).ready(function() {
				 *      var oTable;
				 *
				 *      // 'open' an information row when a row is clicked on
				 *      $('#example tbody tr').click( function () {
				 *        if ( oTable.fnIsOpen(this) ) {
				 *          oTable.fnClose( this );
				 *        } else {
				 *          oTable.fnOpen( this, "Temporary row opened", "info_row" );
				 *        }
				 *      } );
				 *
				 *      oTable = $('#example').dataTable();
				 *    } );
				 */
				this.fnIsOpen = function (nTr) {
					return this.api(true).row(nTr).child.isShown();
				};


				/**
				 * This function will place a new row directly after a row which is currently
				 * on display on the page, with the HTML contents that is passed into the
				 * function. This can be used, for example, to ask for confirmation that a
				 * particular record should be deleted.
				 *  @param {node} nTr The table row to 'open'
				 *  @param {string|node|jQuery} mHtml The HTML to put into the row
				 *  @param {string} sClass Class to give the new TD cell
				 *  @returns {node} The row opened. Note that if the table row passed in as the
				 *    first parameter, is not found in the table, this method will silently
				 *    return.
				 *  @dtopt API
				 *  @deprecated Since v1.10
				 *
				 *  @example
				 *    $(document).ready(function() {
				 *      var oTable;
				 *
				 *      // 'open' an information row when a row is clicked on
				 *      $('#example tbody tr').click( function () {
				 *        if ( oTable.fnIsOpen(this) ) {
				 *          oTable.fnClose( this );
				 *        } else {
				 *          oTable.fnOpen( this, "Temporary row opened", "info_row" );
				 *        }
				 *      } );
				 *
				 *      oTable = $('#example').dataTable();
				 *    } );
				 */
				this.fnOpen = function (nTr, mHtml, sClass) {
					return this.api(true)
						.row(nTr)
						.child(mHtml, sClass)
						.show()
						.child()[0];
				};


				/**
				 * Change the pagination - provides the internal logic for pagination in a simple API
				 * function. With this function you can have a DataTables table go to the next,
				 * previous, first or last pages.
				 *  @param {string|int} mAction Paging action to take: "first", "previous", "next" or "last"
				 *    or page number to jump to (integer), note that page 0 is the first page.
				 *  @param {bool} [bRedraw=true] Redraw the table or not
				 *  @dtopt API
				 *  @deprecated Since v1.10
				 *
				 *  @example
				 *    $(document).ready(function() {
				 *      var oTable = $('#example').dataTable();
				 *      oTable.fnPageChange( 'next' );
				 *    } );
				 */
				this.fnPageChange = function (mAction, bRedraw) {
					var api = this.api(true).page(mAction);

					if (bRedraw === undefined || bRedraw) {
						api.draw(false);
					}
				};


				/**
				 * Show a particular column
				 *  @param {int} iCol The column whose display should be changed
				 *  @param {bool} bShow Show (true) or hide (false) the column
				 *  @param {bool} [bRedraw=true] Redraw the table or not
				 *  @dtopt API
				 *  @deprecated Since v1.10
				 *
				 *  @example
				 *    $(document).ready(function() {
				 *      var oTable = $('#example').dataTable();
				 *
				 *      // Hide the second column after initialisation
				 *      oTable.fnSetColumnVis( 1, false );
				 *    } );
				 */
				this.fnSetColumnVis = function (iCol, bShow, bRedraw) {
					var api = this.api(true).column(iCol).visible(bShow);

					if (bRedraw === undefined || bRedraw) {
						api.columns.adjust().draw();
					}
				};


				/**
				 * Get the settings for a particular table for external manipulation
				 *  @returns {object} DataTables settings object. See
				 *    {@link DataTable.models.oSettings}
				 *  @dtopt API
				 *  @deprecated Since v1.10
				 *
				 *  @example
				 *    $(document).ready(function() {
				 *      var oTable = $('#example').dataTable();
				 *      var oSettings = oTable.fnSettings();
				 *
				 *      // Show an example parameter from the settings
				 *      alert( oSettings._iDisplayStart );
				 *    } );
				 */
				this.fnSettings = function () {
					return _fnSettingsFromNode(this[_ext.iApiIndex]);
				};


				/**
				 * Sort the table by a particular column
				 *  @param {int} iCol the data index to sort on. Note that this will not match the
				 *    'display index' if you have hidden data entries
				 *  @dtopt API
				 *  @deprecated Since v1.10
				 *
				 *  @example
				 *    $(document).ready(function() {
				 *      var oTable = $('#example').dataTable();
				 *
				 *      // Sort immediately with columns 0 and 1
				 *      oTable.fnSort( [ [0,'asc'], [1,'asc'] ] );
				 *    } );
				 */
				this.fnSort = function (aaSort) {
					this.api(true).order(aaSort).draw();
				};


				/**
				 * Attach a sort listener to an element for a given column
				 *  @param {node} nNode the element to attach the sort listener to
				 *  @param {int} iColumn the column that a click on this node will sort on
				 *  @param {function} [fnCallback] callback function when sort is run
				 *  @dtopt API
				 *  @deprecated Since v1.10
				 *
				 *  @example
				 *    $(document).ready(function() {
				 *      var oTable = $('#example').dataTable();
				 *
				 *      // Sort on column 1, when 'sorter' is clicked on
				 *      oTable.fnSortListener( document.getElementById('sorter'), 1 );
				 *    } );
				 */
				this.fnSortListener = function (nNode, iColumn, fnCallback) {
					this.api(true).order.listener(nNode, iColumn, fnCallback);
				};


				/**
				 * Update a table cell or row - this method will accept either a single value to
				 * update the cell with, an array of values with one element for each column or
				 * an object in the same format as the original data source. The function is
				 * self-referencing in order to make the multi column updates easier.
				 *  @param {object|array|string} mData Data to update the cell/row with
				 *  @param {node|int} mRow TR element you want to update or the aoData index
				 *  @param {int} [iColumn] The column to update, give as null or undefined to
				 *    update a whole row.
				 *  @param {bool} [bRedraw=true] Redraw the table or not
				 *  @param {bool} [bAction=true] Perform pre-draw actions or not
				 *  @returns {int} 0 on success, 1 on error
				 *  @dtopt API
				 *  @deprecated Since v1.10
				 *
				 *  @example
				 *    $(document).ready(function() {
				 *      var oTable = $('#example').dataTable();
				 *      oTable.fnUpdate( 'Example update', 0, 0 ); // Single cell
				 *      oTable.fnUpdate( ['a', 'b', 'c', 'd', 'e'], $('tbody tr')[0] ); // Row
				 *    } );
				 */
				this.fnUpdate = function (mData, mRow, iColumn, bRedraw, bAction) {
					var api = this.api(true);

					if (iColumn === undefined || iColumn === null) {
						api.row(mRow).data(mData);
					} else {
						api.cell(mRow, iColumn).data(mData);
					}

					if (bAction === undefined || bAction) {
						api.columns.adjust();
					}

					if (bRedraw === undefined || bRedraw) {
						api.draw();
					}
					return 0;
				};


				/**
				 * Provide a common method for plug-ins to check the version of DataTables being used, in order
				 * to ensure compatibility.
				 *  @param {string} sVersion Version string to check for, in the format "X.Y.Z". Note that the
				 *    formats "X" and "X.Y" are also acceptable.
				 *  @returns {boolean} true if this version of DataTables is greater or equal to the required
				 *    version, or false if this version of DataTales is not suitable
				 *  @method
				 *  @dtopt API
				 *  @deprecated Since v1.10
				 *
				 *  @example
				 *    $(document).ready(function() {
				 *      var oTable = $('#example').dataTable();
				 *      alert( oTable.fnVersionCheck( '1.9.0' ) );
				 *    } );
				 */
				this.fnVersionCheck = _ext.fnVersionCheck;


				var _that = this;
				var emptyInit = options === undefined;
				var len = this.length;

				if (emptyInit) {
					options = {};
				}

				this.oApi = this.internal = _ext.internal;

				// Extend with old style plug-in API methods
				for (var fn in DataTable.ext.internal) {
					if (fn) {
						this[fn] = _fnExternApiFunc(fn);
					}
				}

				this.each(function () {
					// For each initialisation we want to give it a clean initialisation
					// object that can be bashed around
					var o = {};
					var oInit = len > 1 ? // optimisation for single table case
						_fnExtend(o, options, true) :
						options;

					/*global oInit,_that,emptyInit*/
					var i = 0,
						iLen, j, jLen, k, kLen;
					var sId = this.getAttribute('id');
					var bInitHandedOff = false;
					var defaults = DataTable.defaults;
					var $this = $(this);


					/* Sanity check */
					if (this.nodeName.toLowerCase() != 'table') {
						_fnLog(null, 0, 'Non-table node initialisation (' + this.nodeName + ')', 2);
						return;
					}

					/* Backwards compatibility for the defaults */
					_fnCompatOpts(defaults);
					_fnCompatCols(defaults.column);

					/* Convert the camel-case defaults to Hungarian */
					_fnCamelToHungarian(defaults, defaults, true);
					_fnCamelToHungarian(defaults.column, defaults.column, true);

					/* Setting up the initialisation object */
					_fnCamelToHungarian(defaults, $.extend(oInit, $this.data()));



					/* Check to see if we are re-initialising a table */
					var allSettings = DataTable.settings;
					for (i = 0, iLen = allSettings.length; i < iLen; i++) {
						var s = allSettings[i];

						/* Base check on table node */
						if (
							s.nTable == this ||
							(s.nTHead && s.nTHead.parentNode == this) ||
							(s.nTFoot && s.nTFoot.parentNode == this)
						) {
							var bRetrieve = oInit.bRetrieve !== undefined ? oInit.bRetrieve : defaults.bRetrieve;
							var bDestroy = oInit.bDestroy !== undefined ? oInit.bDestroy : defaults.bDestroy;

							if (emptyInit || bRetrieve) {
								return s.oInstance;
							} else if (bDestroy) {
								s.oInstance.fnDestroy();
								break;
							} else {
								_fnLog(s, 0, 'Cannot reinitialise DataTable', 3);
								return;
							}
						}

						/* If the element we are initialising has the same ID as a table which was previously
						 * initialised, but the table nodes don't match (from before) then we destroy the old
						 * instance by simply deleting it. This is under the assumption that the table has been
						 * destroyed by other methods. Anyone using non-id selectors will need to do this manually
						 */
						if (s.sTableId == this.id) {
							allSettings.splice(i, 1);
							break;
						}
					}

					/* Ensure the table has an ID - required for accessibility */
					if (sId === null || sId === "") {
						sId = "DataTables_Table_" + (DataTable.ext._unique++);
						this.id = sId;
					}

					/* Create the settings object for this table and set some of the default parameters */
					var oSettings = $.extend(true, {}, DataTable.models.oSettings, {
						"sDestroyWidth": $this[0].style.width,
						"sInstance": sId,
						"sTableId": sId
					});
					oSettings.nTable = this;
					oSettings.oApi = _that.internal;
					oSettings.oInit = oInit;

					allSettings.push(oSettings);

					// Need to add the instance after the instance after the settings object has been added
					// to the settings array, so we can self reference the table instance if more than one
					oSettings.oInstance = (_that.length === 1) ? _that : $this.dataTable();

					// Backwards compatibility, before we apply all the defaults
					_fnCompatOpts(oInit);
					_fnLanguageCompat(oInit.oLanguage);

					// If the length menu is given, but the init display length is not, use the length menu
					if (oInit.aLengthMenu && !oInit.iDisplayLength) {
						oInit.iDisplayLength = $.isArray(oInit.aLengthMenu[0]) ?
							oInit.aLengthMenu[0][0] : oInit.aLengthMenu[0];
					}

					// Apply the defaults and init options to make a single init object will all
					// options defined from defaults and instance options.
					oInit = _fnExtend($.extend(true, {}, defaults), oInit);


					// Map the initialisation options onto the settings object
					_fnMap(oSettings.oFeatures, oInit, [
						"bPaginate",
						"bLengthChange",
						"bFilter",
						"bSort",
						"bSortMulti",
						"bInfo",
						"bProcessing",
						"bAutoWidth",
						"bSortClasses",
						"bServerSide",
						"bDeferRender"
					]);
					_fnMap(oSettings, oInit, [
						"asStripeClasses",
						"ajax",
						"fnServerData",
						"fnFormatNumber",
						"sServerMethod",
						"aaSorting",
						"aaSortingFixed",
						"aLengthMenu",
						"sPaginationType",
						"sAjaxSource",
						"sAjaxDataProp",
						"iStateDuration",
						"sDom",
						"bSortCellsTop",
						"iTabIndex",
						"fnStateLoadCallback",
						"fnStateSaveCallback",
						"renderer",
						"searchDelay",
						"rowId",
						["iCookieDuration", "iStateDuration"], // backwards compat
						["oSearch", "oPreviousSearch"],
						["aoSearchCols", "aoPreSearchCols"],
						["iDisplayLength", "_iDisplayLength"]
					]);
					_fnMap(oSettings.oScroll, oInit, [
						["sScrollX", "sX"],
						["sScrollXInner", "sXInner"],
						["sScrollY", "sY"],
						["bScrollCollapse", "bCollapse"]
					]);
					_fnMap(oSettings.oLanguage, oInit, "fnInfoCallback");

					/* Callback functions which are array driven */
					_fnCallbackReg(oSettings, 'aoDrawCallback', oInit.fnDrawCallback, 'user');
					_fnCallbackReg(oSettings, 'aoServerParams', oInit.fnServerParams, 'user');
					_fnCallbackReg(oSettings, 'aoStateSaveParams', oInit.fnStateSaveParams, 'user');
					_fnCallbackReg(oSettings, 'aoStateLoadParams', oInit.fnStateLoadParams, 'user');
					_fnCallbackReg(oSettings, 'aoStateLoaded', oInit.fnStateLoaded, 'user');
					_fnCallbackReg(oSettings, 'aoRowCallback', oInit.fnRowCallback, 'user');
					_fnCallbackReg(oSettings, 'aoRowCreatedCallback', oInit.fnCreatedRow, 'user');
					_fnCallbackReg(oSettings, 'aoHeaderCallback', oInit.fnHeaderCallback, 'user');
					_fnCallbackReg(oSettings, 'aoFooterCallback', oInit.fnFooterCallback, 'user');
					_fnCallbackReg(oSettings, 'aoInitComplete', oInit.fnInitComplete, 'user');
					_fnCallbackReg(oSettings, 'aoPreDrawCallback', oInit.fnPreDrawCallback, 'user');

					oSettings.rowIdFn = _fnGetObjectDataFn(oInit.rowId);

					/* Browser support detection */
					_fnBrowserDetect(oSettings);

					var oClasses = oSettings.oClasses;

					$.extend(oClasses, DataTable.ext.classes, oInit.oClasses);
					$this.addClass(oClasses.sTable);


					if (oSettings.iInitDisplayStart === undefined) {
						/* Display start point, taking into account the save saving */
						oSettings.iInitDisplayStart = oInit.iDisplayStart;
						oSettings._iDisplayStart = oInit.iDisplayStart;
					}

					if (oInit.iDeferLoading !== null) {
						oSettings.bDeferLoading = true;
						var tmp = $.isArray(oInit.iDeferLoading);
						oSettings._iRecordsDisplay = tmp ? oInit.iDeferLoading[0] : oInit.iDeferLoading;
						oSettings._iRecordsTotal = tmp ? oInit.iDeferLoading[1] : oInit.iDeferLoading;
					}

					/* Language definitions */
					var oLanguage = oSettings.oLanguage;
					$.extend(true, oLanguage, oInit.oLanguage);

					if (oLanguage.sUrl) {
						/* Get the language definitions from a file - because this Ajax call makes the language
						 * get async to the remainder of this function we use bInitHandedOff to indicate that
						 * _fnInitialise will be fired by the returned Ajax handler, rather than the constructor
						 */
						$.ajax({
							dataType: 'json',
							url: oLanguage.sUrl,
							success: function (json) {
								_fnLanguageCompat(json);
								_fnCamelToHungarian(defaults.oLanguage, json);
								$.extend(true, oLanguage, json);
								_fnInitialise(oSettings);
							},
							error: function () {
								// Error occurred loading language file, continue on as best we can
								_fnInitialise(oSettings);
							}
						});
						bInitHandedOff = true;
					}

					/*
					 * Stripes
					 */
					if (oInit.asStripeClasses === null) {
						oSettings.asStripeClasses = [
							oClasses.sStripeOdd,
							oClasses.sStripeEven
						];
					}

					/* Remove row stripe classes if they are already on the table row */
					var stripeClasses = oSettings.asStripeClasses;
					var rowOne = $this.children('tbody').find('tr').eq(0);
					if ($.inArray(true, $.map(stripeClasses, function (el, i) {
							return rowOne.hasClass(el);
						})) !== -1) {
						$('tbody tr', this).removeClass(stripeClasses.join(' '));
						oSettings.asDestroyStripes = stripeClasses.slice();
					}

					/*
					 * Columns
					 * See if we should load columns automatically or use defined ones
					 */
					var anThs = [];
					var aoColumnsInit;
					var nThead = this.getElementsByTagName('thead');
					if (nThead.length !== 0) {
						_fnDetectHeader(oSettings.aoHeader, nThead[0]);
						anThs = _fnGetUniqueThs(oSettings);
					}

					/* If not given a column array, generate one with nulls */
					if (oInit.aoColumns === null) {
						aoColumnsInit = [];
						for (i = 0, iLen = anThs.length; i < iLen; i++) {
							aoColumnsInit.push(null);
						}
					} else {
						aoColumnsInit = oInit.aoColumns;
					}

					/* Add the columns */
					for (i = 0, iLen = aoColumnsInit.length; i < iLen; i++) {
						_fnAddColumn(oSettings, anThs ? anThs[i] : null);
					}

					/* Apply the column definitions */
					_fnApplyColumnDefs(oSettings, oInit.aoColumnDefs, aoColumnsInit, function (iCol, oDef) {
						_fnColumnOptions(oSettings, iCol, oDef);
					});

					/* HTML5 attribute detection - build an mData object automatically if the
					 * attributes are found
					 */
					if (rowOne.length) {
						var a = function (cell, name) {
							return cell.getAttribute('data-' + name) !== null ? name : null;
						};

						$(rowOne[0]).children('th, td').each(function (i, cell) {
							var col = oSettings.aoColumns[i];

							if (col.mData === i) {
								var sort = a(cell, 'sort') || a(cell, 'order');
								var filter = a(cell, 'filter') || a(cell, 'search');

								if (sort !== null || filter !== null) {
									col.mData = {
										_: i + '.display',
										sort: sort !== null ? i + '.@data-' + sort : undefined,
										type: sort !== null ? i + '.@data-' + sort : undefined,
										filter: filter !== null ? i + '.@data-' + filter : undefined
									};

									_fnColumnOptions(oSettings, i);
								}
							}
						});
					}

					var features = oSettings.oFeatures;
					var loadedInit = function () {
						/*
						 * Sorting
						 * @todo For modularisation (1.11) this needs to do into a sort start up handler
						 */

						// If aaSorting is not defined, then we use the first indicator in asSorting
						// in case that has been altered, so the default sort reflects that option
						if (oInit.aaSorting === undefined) {
							var sorting = oSettings.aaSorting;
							for (i = 0, iLen = sorting.length; i < iLen; i++) {
								sorting[i][1] = oSettings.aoColumns[i].asSorting[0];
							}
						}

						/* Do a first pass on the sorting classes (allows any size changes to be taken into
						 * account, and also will apply sorting disabled classes if disabled
						 */
						_fnSortingClasses(oSettings);

						if (features.bSort) {
							_fnCallbackReg(oSettings, 'aoDrawCallback', function () {
								if (oSettings.bSorted) {
									var aSort = _fnSortFlatten(oSettings);
									var sortedColumns = {};

									$.each(aSort, function (i, val) {
										sortedColumns[val.src] = val.dir;
									});

									_fnCallbackFire(oSettings, null, 'order', [oSettings, aSort, sortedColumns]);
									_fnSortAria(oSettings);
								}
							});
						}

						_fnCallbackReg(oSettings, 'aoDrawCallback', function () {
							if (oSettings.bSorted || _fnDataSource(oSettings) === 'ssp' || features.bDeferRender) {
								_fnSortingClasses(oSettings);
							}
						}, 'sc');


						/*
						 * Final init
						 * Cache the header, body and footer as required, creating them if needed
						 */

						// Work around for Webkit bug 83867 - store the caption-side before removing from doc
						var captions = $this.children('caption').each(function () {
							this._captionSide = $(this).css('caption-side');
						});

						var thead = $this.children('thead');
						if (thead.length === 0) {
							thead = $('<thead/>').appendTo($this);
						}
						oSettings.nTHead = thead[0];

						var tbody = $this.children('tbody');
						if (tbody.length === 0) {
							tbody = $('<tbody/>').appendTo($this);
						}
						oSettings.nTBody = tbody[0];

						var tfoot = $this.children('tfoot');
						if (tfoot.length === 0 && captions.length > 0 && (oSettings.oScroll.sX !== "" || oSettings.oScroll.sY !== "")) {
							// If we are a scrolling table, and no footer has been given, then we need to create
							// a tfoot element for the caption element to be appended to
							tfoot = $('<tfoot/>').appendTo($this);
						}

						if (tfoot.length === 0 || tfoot.children().length === 0) {
							$this.addClass(oClasses.sNoFooter);
						} else if (tfoot.length > 0) {
							oSettings.nTFoot = tfoot[0];
							_fnDetectHeader(oSettings.aoFooter, oSettings.nTFoot);
						}

						/* Check if there is data passing into the constructor */
						if (oInit.aaData) {
							for (i = 0; i < oInit.aaData.length; i++) {
								_fnAddData(oSettings, oInit.aaData[i]);
							}
						} else if (oSettings.bDeferLoading || _fnDataSource(oSettings) == 'dom') {
							/* Grab the data from the page - only do this when deferred loading or no Ajax
							 * source since there is no point in reading the DOM data if we are then going
							 * to replace it with Ajax data
							 */
							_fnAddTr(oSettings, $(oSettings.nTBody).children('tr'));
						}

						/* Copy the data index array */
						oSettings.aiDisplay = oSettings.aiDisplayMaster.slice();

						/* Initialisation complete - table can be drawn */
						oSettings.bInitialised = true;

						/* Check if we need to initialise the table (it might not have been handed off to the
						 * language processor)
						 */
						if (bInitHandedOff === false) {
							_fnInitialise(oSettings);
						}
					};

					/* Must be done after everything which can be overridden by the state saving! */
					if (oInit.bStateSave) {
						features.bStateSave = true;
						_fnCallbackReg(oSettings, 'aoDrawCallback', _fnSaveState, 'state_save');
						_fnLoadState(oSettings, oInit, loadedInit);
					} else {
						loadedInit();
					}

				});
				_that = null;
				return this;
			};


			/*
			 * It is useful to have variables which are scoped locally so only the
			 * DataTables functions can access them and they don't leak into global space.
			 * At the same time these functions are often useful over multiple files in the
			 * core and API, so we list, or at least document, all variables which are used
			 * by DataTables as private variables here. This also ensures that there is no
			 * clashing of variable names and that they can easily referenced for reuse.
			 */


			// Defined else where
			//  _selector_run
			//  _selector_opts
			//  _selector_first
			//  _selector_row_indexes

			var _ext; // DataTable.ext
			var _Api; // DataTable.Api
			var _api_register; // DataTable.Api.register
			var _api_registerPlural; // DataTable.Api.registerPlural

			var _re_dic = {};
			var _re_new_lines = /[\r\n]/g;
			var _re_html = /<.*?>/g;

			// This is not strict ISO8601 - Date.parse() is quite lax, although
			// implementations differ between browsers.
			var _re_date = /^\d{2,4}[\.\/\-]\d{1,2}[\.\/\-]\d{1,2}([T ]{1}\d{1,2}[:\.]\d{2}([\.:]\d{2})?)?$/;

			// Escape regular expression special characters
			var _re_escape_regex = new RegExp('(\\' + ['/', '.', '*', '+', '?', '|', '(', ')', '[', ']', '{', '}', '\\', '$', '^', '-'].join('|\\') + ')', 'g');

			// http://en.wikipedia.org/wiki/Foreign_exchange_market
			// - \u20BD - Russian ruble.
			// - \u20a9 - South Korean Won
			// - \u20BA - Turkish Lira
			// - \u20B9 - Indian Rupee
			// - R - Brazil (R$) and South Africa
			// - fr - Swiss Franc
			// - kr - Swedish krona, Norwegian krone and Danish krone
			// - \u2009 is thin space and \u202F is narrow no-break space, both used in many
			// - Ƀ - Bitcoin
			// - Ξ - Ethereum
			//   standards as thousands separators.
			var _re_formatted_numeric = /[',$£€¥%\u2009\u202F\u20BD\u20a9\u20BArfkɃΞ]/gi;


			var _empty = function (d) {
				return !d || d === true || d === '-' ? true : false;
			};


			var _intVal = function (s) {
				var integer = parseInt(s, 10);
				return !isNaN(integer) && isFinite(s) ? integer : null;
			};

			// Convert from a formatted number with characters other than `.` as the
			// decimal place, to a Javascript number
			var _numToDecimal = function (num, decimalPoint) {
				// Cache created regular expressions for speed as this function is called often
				if (!_re_dic[decimalPoint]) {
					_re_dic[decimalPoint] = new RegExp(_fnEscapeRegex(decimalPoint), 'g');
				}
				return typeof num === 'string' && decimalPoint !== '.' ?
					num.replace(/\./g, '').replace(_re_dic[decimalPoint], '.') :
					num;
			};


			var _isNumber = function (d, decimalPoint, formatted) {
				var strType = typeof d === 'string';

				// If empty return immediately so there must be a number if it is a
				// formatted string (this stops the string "k", or "kr", etc being detected
				// as a formatted number for currency
				if (_empty(d)) {
					return true;
				}

				if (decimalPoint && strType) {
					d = _numToDecimal(d, decimalPoint);
				}

				if (formatted && strType) {
					d = d.replace(_re_formatted_numeric, '');
				}

				return !isNaN(parseFloat(d)) && isFinite(d);
			};


			// A string without HTML in it can be considered to be HTML still
			var _isHtml = function (d) {
				return _empty(d) || typeof d === 'string';
			};


			var _htmlNumeric = function (d, decimalPoint, formatted) {
				if (_empty(d)) {
					return true;
				}

				var html = _isHtml(d);
				return !html ?
					null :
					_isNumber(_stripHtml(d), decimalPoint, formatted) ?
					true :
					null;
			};


			var _pluck = function (a, prop, prop2) {
				var out = [];
				var i = 0,
					ien = a.length;

				// Could have the test in the loop for slightly smaller code, but speed
				// is essential here
				if (prop2 !== undefined) {
					for (; i < ien; i++) {
						if (a[i] && a[i][prop]) {
							out.push(a[i][prop][prop2]);
						}
					}
				} else {
					for (; i < ien; i++) {
						if (a[i]) {
							out.push(a[i][prop]);
						}
					}
				}

				return out;
			};


			// Basically the same as _pluck, but rather than looping over `a` we use `order`
			// as the indexes to pick from `a`
			var _pluck_order = function (a, order, prop, prop2) {
				var out = [];
				var i = 0,
					ien = order.length;

				// Could have the test in the loop for slightly smaller code, but speed
				// is essential here
				if (prop2 !== undefined) {
					for (; i < ien; i++) {
						if (a[order[i]][prop]) {
							out.push(a[order[i]][prop][prop2]);
						}
					}
				} else {
					for (; i < ien; i++) {
						out.push(a[order[i]][prop]);
					}
				}

				return out;
			};


			var _range = function (len, start) {
				var out = [];
				var end;

				if (start === undefined) {
					start = 0;
					end = len;
				} else {
					end = start;
					start = len;
				}

				for (var i = start; i < end; i++) {
					out.push(i);
				}

				return out;
			};


			var _removeEmpty = function (a) {
				var out = [];

				for (var i = 0, ien = a.length; i < ien; i++) {
					if (a[i]) { // careful - will remove all falsy values!
						out.push(a[i]);
					}
				}

				return out;
			};


			var _stripHtml = function (d) {
				return d.replace(_re_html, '');
			};


			/**
			 * Determine if all values in the array are unique. This means we can short
			 * cut the _unique method at the cost of a single loop. A sorted array is used
			 * to easily check the values.
			 *
			 * @param  {array} src Source array
			 * @return {boolean} true if all unique, false otherwise
			 * @ignore
			 */
			var _areAllUnique = function (src) {
				if (src.length < 2) {
					return true;
				}

				var sorted = src.slice().sort();
				var last = sorted[0];

				for (var i = 1, ien = sorted.length; i < ien; i++) {
					if (sorted[i] === last) {
						return false;
					}

					last = sorted[i];
				}

				return true;
			};


			/**
			 * Find the unique elements in a source array.
			 *
			 * @param  {array} src Source array
			 * @return {array} Array of unique items
			 * @ignore
			 */
			var _unique = function (src) {
				if (_areAllUnique(src)) {
					return src.slice();
				}

				// A faster unique method is to use object keys to identify used values,
				// but this doesn't work with arrays or objects, which we must also
				// consider. See jsperf.com/compare-array-unique-versions/4 for more
				// information.
				var
					out = [],
					val,
					i, ien = src.length,
					j, k = 0;

				again: for (i = 0; i < ien; i++) {
					val = src[i];

					for (j = 0; j < k; j++) {
						if (out[j] === val) {
							continue again;
						}
					}

					out.push(val);
					k++;
				}

				return out;
			};


			/**
			 * DataTables utility methods
			 * 
			 * This namespace provides helper methods that DataTables uses internally to
			 * create a DataTable, but which are not exclusively used only for DataTables.
			 * These methods can be used by extension authors to save the duplication of
			 * code.
			 *
			 *  @namespace
			 */
			DataTable.util = {
				/**
				 * Throttle the calls to a function. Arguments and context are maintained
				 * for the throttled function.
				 *
				 * @param {function} fn Function to be called
				 * @param {integer} freq Call frequency in mS
				 * @return {function} Wrapped function
				 */
				throttle: function (fn, freq) {
					var
						frequency = freq !== undefined ? freq : 200,
						last,
						timer;

					return function () {
						var
							that = this,
							now = +new Date(),
							args = arguments;

						if (last && now < last + frequency) {
							clearTimeout(timer);

							timer = setTimeout(function () {
								last = undefined;
								fn.apply(that, args);
							}, frequency);
						} else {
							last = now;
							fn.apply(that, args);
						}
					};
				},


				/**
				 * Escape a string such that it can be used in a regular expression
				 *
				 *  @param {string} val string to escape
				 *  @returns {string} escaped string
				 */
				escapeRegex: function (val) {
					return val.replace(_re_escape_regex, '\\$1');
				}
			};



			/**
			 * Create a mapping object that allows camel case parameters to be looked up
			 * for their Hungarian counterparts. The mapping is stored in a private
			 * parameter called `_hungarianMap` which can be accessed on the source object.
			 *  @param {object} o
			 *  @memberof DataTable#oApi
			 */
			function _fnHungarianMap(o) {
				var
					hungarian = 'a aa ai ao as b fn i m o s ',
					match,
					newKey,
					map = {};

				$.each(o, function (key, val) {
					match = key.match(/^([^A-Z]+?)([A-Z])/);

					if (match && hungarian.indexOf(match[1] + ' ') !== -1) {
						newKey = key.replace(match[0], match[2].toLowerCase());
						map[newKey] = key;

						if (match[1] === 'o') {
							_fnHungarianMap(o[key]);
						}
					}
				});

				o._hungarianMap = map;
			}


			/**
			 * Convert from camel case parameters to Hungarian, based on a Hungarian map
			 * created by _fnHungarianMap.
			 *  @param {object} src The model object which holds all parameters that can be
			 *    mapped.
			 *  @param {object} user The object to convert from camel case to Hungarian.
			 *  @param {boolean} force When set to `true`, properties which already have a
			 *    Hungarian value in the `user` object will be overwritten. Otherwise they
			 *    won't be.
			 *  @memberof DataTable#oApi
			 */
			function _fnCamelToHungarian(src, user, force) {
				if (!src._hungarianMap) {
					_fnHungarianMap(src);
				}

				var hungarianKey;

				$.each(user, function (key, val) {
					hungarianKey = src._hungarianMap[key];

					if (hungarianKey !== undefined && (force || user[hungarianKey] === undefined)) {
						// For objects, we need to buzz down into the object to copy parameters
						if (hungarianKey.charAt(0) === 'o') {
							// Copy the camelCase options over to the hungarian
							if (!user[hungarianKey]) {
								user[hungarianKey] = {};
							}
							$.extend(true, user[hungarianKey], user[key]);

							_fnCamelToHungarian(src[hungarianKey], user[hungarianKey], force);
						} else {
							user[hungarianKey] = user[key];
						}
					}
				});
			}


			/**
			 * Language compatibility - when certain options are given, and others aren't, we
			 * need to duplicate the values over, in order to provide backwards compatibility
			 * with older language files.
			 *  @param {object} oSettings dataTables settings object
			 *  @memberof DataTable#oApi
			 */
			function _fnLanguageCompat(lang) {
				// Note the use of the Hungarian notation for the parameters in this method as
				// this is called after the mapping of camelCase to Hungarian
				var defaults = DataTable.defaults.oLanguage;

				// Default mapping
				var defaultDecimal = defaults.sDecimal;
				if (defaultDecimal) {
					_addNumericSort(defaultDecimal);
				}

				if (lang) {
					var zeroRecords = lang.sZeroRecords;

					// Backwards compatibility - if there is no sEmptyTable given, then use the same as
					// sZeroRecords - assuming that is given.
					if (!lang.sEmptyTable && zeroRecords &&
						defaults.sEmptyTable === "No data available in table") {
						_fnMap(lang, lang, 'sZeroRecords', 'sEmptyTable');
					}

					// Likewise with loading records
					if (!lang.sLoadingRecords && zeroRecords &&
						defaults.sLoadingRecords === "Loading...") {
						_fnMap(lang, lang, 'sZeroRecords', 'sLoadingRecords');
					}

					// Old parameter name of the thousands separator mapped onto the new
					if (lang.sInfoThousands) {
						lang.sThousands = lang.sInfoThousands;
					}

					var decimal = lang.sDecimal;
					if (decimal && defaultDecimal !== decimal) {
						_addNumericSort(decimal);
					}
				}
			}


			/**
			 * Map one parameter onto another
			 *  @param {object} o Object to map
			 *  @param {*} knew The new parameter name
			 *  @param {*} old The old parameter name
			 */
			var _fnCompatMap = function (o, knew, old) {
				if (o[knew] !== undefined) {
					o[old] = o[knew];
				}
			};


			/**
			 * Provide backwards compatibility for the main DT options. Note that the new
			 * options are mapped onto the old parameters, so this is an external interface
			 * change only.
			 *  @param {object} init Object to map
			 */
			function _fnCompatOpts(init) {
				_fnCompatMap(init, 'ordering', 'bSort');
				_fnCompatMap(init, 'orderMulti', 'bSortMulti');
				_fnCompatMap(init, 'orderClasses', 'bSortClasses');
				_fnCompatMap(init, 'orderCellsTop', 'bSortCellsTop');
				_fnCompatMap(init, 'order', 'aaSorting');
				_fnCompatMap(init, 'orderFixed', 'aaSortingFixed');
				_fnCompatMap(init, 'paging', 'bPaginate');
				_fnCompatMap(init, 'pagingType', 'sPaginationType');
				_fnCompatMap(init, 'pageLength', 'iDisplayLength');
				_fnCompatMap(init, 'searching', 'bFilter');

				// Boolean initialisation of x-scrolling
				if (typeof init.sScrollX === 'boolean') {
					init.sScrollX = init.sScrollX ? '100%' : '';
				}
				if (typeof init.scrollX === 'boolean') {
					init.scrollX = init.scrollX ? '100%' : '';
				}

				// Column search objects are in an array, so it needs to be converted
				// element by element
				var searchCols = init.aoSearchCols;

				if (searchCols) {
					for (var i = 0, ien = searchCols.length; i < ien; i++) {
						if (searchCols[i]) {
							_fnCamelToHungarian(DataTable.models.oSearch, searchCols[i]);
						}
					}
				}
			}


			/**
			 * Provide backwards compatibility for column options. Note that the new options
			 * are mapped onto the old parameters, so this is an external interface change
			 * only.
			 *  @param {object} init Object to map
			 */
			function _fnCompatCols(init) {
				_fnCompatMap(init, 'orderable', 'bSortable');
				_fnCompatMap(init, 'orderData', 'aDataSort');
				_fnCompatMap(init, 'orderSequence', 'asSorting');
				_fnCompatMap(init, 'orderDataType', 'sortDataType');

				// orderData can be given as an integer
				var dataSort = init.aDataSort;
				if (typeof dataSort === 'number' && !$.isArray(dataSort)) {
					init.aDataSort = [dataSort];
				}
			}


			/**
			 * Browser feature detection for capabilities, quirks
			 *  @param {object} settings dataTables settings object
			 *  @memberof DataTable#oApi
			 */
			function _fnBrowserDetect(settings) {
				// We don't need to do this every time DataTables is constructed, the values
				// calculated are specific to the browser and OS configuration which we
				// don't expect to change between initialisations
				if (!DataTable.__browser) {
					var browser = {};
					DataTable.__browser = browser;

					// Scrolling feature / quirks detection
					var n = $('<div/>')
						.css({
							position: 'fixed',
							top: 0,
							left: $(window).scrollLeft() * -1, // allow for scrolling
							height: 1,
							width: 1,
							overflow: 'hidden'
						})
						.append(
							$('<div/>')
							.css({
								position: 'absolute',
								top: 1,
								left: 1,
								width: 100,
								overflow: 'scroll'
							})
							.append(
								$('<div/>')
								.css({
									width: '100%',
									height: 10
								})
							)
						)
						.appendTo('body');

					var outer = n.children();
					var inner = outer.children();

					// Numbers below, in order, are:
					// inner.offsetWidth, inner.clientWidth, outer.offsetWidth, outer.clientWidth
					//
					// IE6 XP:                           100 100 100  83
					// IE7 Vista:                        100 100 100  83
					// IE 8+ Windows:                     83  83 100  83
					// Evergreen Windows:                 83  83 100  83
					// Evergreen Mac with scrollbars:     85  85 100  85
					// Evergreen Mac without scrollbars: 100 100 100 100

					// Get scrollbar width
					browser.barWidth = outer[0].offsetWidth - outer[0].clientWidth;

					// IE6/7 will oversize a width 100% element inside a scrolling element, to
					// include the width of the scrollbar, while other browsers ensure the inner
					// element is contained without forcing scrolling
					browser.bScrollOversize = inner[0].offsetWidth === 100 && outer[0].clientWidth !== 100;

					// In rtl text layout, some browsers (most, but not all) will place the
					// scrollbar on the left, rather than the right.
					browser.bScrollbarLeft = Math.round(inner.offset().left) !== 1;

					// IE8- don't provide height and width for getBoundingClientRect
					browser.bBounding = n[0].getBoundingClientRect().width ? true : false;

					n.remove();
				}

				$.extend(settings.oBrowser, DataTable.__browser);
				settings.oScroll.iBarWidth = DataTable.__browser.barWidth;
			}


			/**
			 * Array.prototype reduce[Right] method, used for browsers which don't support
			 * JS 1.6. Done this way to reduce code size, since we iterate either way
			 *  @param {object} settings dataTables settings object
			 *  @memberof DataTable#oApi
			 */
			function _fnReduce(that, fn, init, start, end, inc) {
				var
					i = start,
					value,
					isSet = false;

				if (init !== undefined) {
					value = init;
					isSet = true;
				}

				while (i !== end) {
					if (!that.hasOwnProperty(i)) {
						continue;
					}

					value = isSet ?
						fn(value, that[i], i, that) :
						that[i];

					isSet = true;
					i += inc;
				}

				return value;
			}

			/**
			 * Add a column to the list used for the table with default values
			 *  @param {object} oSettings dataTables settings object
			 *  @param {node} nTh The th element for this column
			 *  @memberof DataTable#oApi
			 */
			function _fnAddColumn(oSettings, nTh) {
				// Add column to aoColumns array
				var oDefaults = DataTable.defaults.column;
				var iCol = oSettings.aoColumns.length;
				var oCol = $.extend({}, DataTable.models.oColumn, oDefaults, {
					"nTh": nTh ? nTh : document.createElement('th'),
					"sTitle": oDefaults.sTitle ? oDefaults.sTitle : nTh ? nTh.innerHTML : '',
					"aDataSort": oDefaults.aDataSort ? oDefaults.aDataSort : [iCol],
					"mData": oDefaults.mData ? oDefaults.mData : iCol,
					idx: iCol
				});
				oSettings.aoColumns.push(oCol);

				// Add search object for column specific search. Note that the `searchCols[ iCol ]`
				// passed into extend can be undefined. This allows the user to give a default
				// with only some of the parameters defined, and also not give a default
				var searchCols = oSettings.aoPreSearchCols;
				searchCols[iCol] = $.extend({}, DataTable.models.oSearch, searchCols[iCol]);

				// Use the default column options function to initialise classes etc
				_fnColumnOptions(oSettings, iCol, $(nTh).data());
			}


			/**
			 * Apply options for a column
			 *  @param {object} oSettings dataTables settings object
			 *  @param {int} iCol column index to consider
			 *  @param {object} oOptions object with sType, bVisible and bSearchable etc
			 *  @memberof DataTable#oApi
			 */
			function _fnColumnOptions(oSettings, iCol, oOptions) {
				var oCol = oSettings.aoColumns[iCol];
				var oClasses = oSettings.oClasses;
				var th = $(oCol.nTh);

				// Try to get width information from the DOM. We can't get it from CSS
				// as we'd need to parse the CSS stylesheet. `width` option can override
				if (!oCol.sWidthOrig) {
					// Width attribute
					oCol.sWidthOrig = th.attr('width') || null;

					// Style attribute
					var t = (th.attr('style') || '').match(/width:\s*(\d+[pxem%]+)/);
					if (t) {
						oCol.sWidthOrig = t[1];
					}
				}

				/* User specified column options */
				if (oOptions !== undefined && oOptions !== null) {
					// Backwards compatibility
					_fnCompatCols(oOptions);

					// Map camel case parameters to their Hungarian counterparts
					_fnCamelToHungarian(DataTable.defaults.column, oOptions);

					/* Backwards compatibility for mDataProp */
					if (oOptions.mDataProp !== undefined && !oOptions.mData) {
						oOptions.mData = oOptions.mDataProp;
					}

					if (oOptions.sType) {
						oCol._sManualType = oOptions.sType;
					}

					// `class` is a reserved word in Javascript, so we need to provide
					// the ability to use a valid name for the camel case input
					if (oOptions.className && !oOptions.sClass) {
						oOptions.sClass = oOptions.className;
					}
					if (oOptions.sClass) {
						th.addClass(oOptions.sClass);
					}

					$.extend(oCol, oOptions);
					_fnMap(oCol, oOptions, "sWidth", "sWidthOrig");

					/* iDataSort to be applied (backwards compatibility), but aDataSort will take
					 * priority if defined
					 */
					if (oOptions.iDataSort !== undefined) {
						oCol.aDataSort = [oOptions.iDataSort];
					}
					_fnMap(oCol, oOptions, "aDataSort");
				}

				/* Cache the data get and set functions for speed */
				var mDataSrc = oCol.mData;
				var mData = _fnGetObjectDataFn(mDataSrc);
				var mRender = oCol.mRender ? _fnGetObjectDataFn(oCol.mRender) : null;

				var attrTest = function (src) {
					return typeof src === 'string' && src.indexOf('@') !== -1;
				};
				oCol._bAttrSrc = $.isPlainObject(mDataSrc) && (
					attrTest(mDataSrc.sort) || attrTest(mDataSrc.type) || attrTest(mDataSrc.filter)
				);
				oCol._setter = null;

				oCol.fnGetData = function (rowData, type, meta) {
					var innerData = mData(rowData, type, undefined, meta);

					return mRender && type ?
						mRender(innerData, type, rowData, meta) :
						innerData;
				};
				oCol.fnSetData = function (rowData, val, meta) {
					return _fnSetObjectDataFn(mDataSrc)(rowData, val, meta);
				};

				// Indicate if DataTables should read DOM data as an object or array
				// Used in _fnGetRowElements
				if (typeof mDataSrc !== 'number') {
					oSettings._rowReadObject = true;
				}

				/* Feature sorting overrides column specific when off */
				if (!oSettings.oFeatures.bSort) {
					oCol.bSortable = false;
					th.addClass(oClasses.sSortableNone); // Have to add class here as order event isn't called
				}

				/* Check that the class assignment is correct for sorting */
				var bAsc = $.inArray('asc', oCol.asSorting) !== -1;
				var bDesc = $.inArray('desc', oCol.asSorting) !== -1;
				if (!oCol.bSortable || (!bAsc && !bDesc)) {
					oCol.sSortingClass = oClasses.sSortableNone;
					oCol.sSortingClassJUI = "";
				} else if (bAsc && !bDesc) {
					oCol.sSortingClass = oClasses.sSortableAsc;
					oCol.sSortingClassJUI = oClasses.sSortJUIAscAllowed;
				} else if (!bAsc && bDesc) {
					oCol.sSortingClass = oClasses.sSortableDesc;
					oCol.sSortingClassJUI = oClasses.sSortJUIDescAllowed;
				} else {
					oCol.sSortingClass = oClasses.sSortable;
					oCol.sSortingClassJUI = oClasses.sSortJUI;
				}
			}


			/**
			 * Adjust the table column widths for new data. Note: you would probably want to
			 * do a redraw after calling this function!
			 *  @param {object} settings dataTables settings object
			 *  @memberof DataTable#oApi
			 */
			function _fnAdjustColumnSizing(settings) {
				/* Not interested in doing column width calculation if auto-width is disabled */
				if (settings.oFeatures.bAutoWidth !== false) {
					var columns = settings.aoColumns;

					_fnCalculateColumnWidths(settings);
					for (var i = 0, iLen = columns.length; i < iLen; i++) {
						columns[i].nTh.style.width = columns[i].sWidth;
					}
				}

				var scroll = settings.oScroll;
				if (scroll.sY !== '' || scroll.sX !== '') {
					_fnScrollDraw(settings);
				}

				_fnCallbackFire(settings, null, 'column-sizing', [settings]);
			}


			/**
			 * Covert the index of a visible column to the index in the data array (take account
			 * of hidden columns)
			 *  @param {object} oSettings dataTables settings object
			 *  @param {int} iMatch Visible column index to lookup
			 *  @returns {int} i the data index
			 *  @memberof DataTable#oApi
			 */
			function _fnVisibleToColumnIndex(oSettings, iMatch) {
				var aiVis = _fnGetColumns(oSettings, 'bVisible');

				return typeof aiVis[iMatch] === 'number' ?
					aiVis[iMatch] :
					null;
			}


			/**
			 * Covert the index of an index in the data array and convert it to the visible
			 *   column index (take account of hidden columns)
			 *  @param {int} iMatch Column index to lookup
			 *  @param {object} oSettings dataTables settings object
			 *  @returns {int} i the data index
			 *  @memberof DataTable#oApi
			 */
			function _fnColumnIndexToVisible(oSettings, iMatch) {
				var aiVis = _fnGetColumns(oSettings, 'bVisible');
				var iPos = $.inArray(iMatch, aiVis);

				return iPos !== -1 ? iPos : null;
			}


			/**
			 * Get the number of visible columns
			 *  @param {object} oSettings dataTables settings object
			 *  @returns {int} i the number of visible columns
			 *  @memberof DataTable#oApi
			 */
			function _fnVisbleColumns(oSettings) {
				var vis = 0;

				// No reduce in IE8, use a loop for now
				$.each(oSettings.aoColumns, function (i, col) {
					if (col.bVisible && $(col.nTh).css('display') !== 'none') {
						vis++;
					}
				});

				return vis;
			}


			/**
			 * Get an array of column indexes that match a given property
			 *  @param {object} oSettings dataTables settings object
			 *  @param {string} sParam Parameter in aoColumns to look for - typically
			 *    bVisible or bSearchable
			 *  @returns {array} Array of indexes with matched properties
			 *  @memberof DataTable#oApi
			 */
			function _fnGetColumns(oSettings, sParam) {
				var a = [];

				$.map(oSettings.aoColumns, function (val, i) {
					if (val[sParam]) {
						a.push(i);
					}
				});

				return a;
			}


			/**
			 * Calculate the 'type' of a column
			 *  @param {object} settings dataTables settings object
			 *  @memberof DataTable#oApi
			 */
			function _fnColumnTypes(settings) {
				var columns = settings.aoColumns;
				var data = settings.aoData;
				var types = DataTable.ext.type.detect;
				var i, ien, j, jen, k, ken;
				var col, cell, detectedType, cache;

				// For each column, spin over the 
				for (i = 0, ien = columns.length; i < ien; i++) {
					col = columns[i];
					cache = [];

					if (!col.sType && col._sManualType) {
						col.sType = col._sManualType;
					} else if (!col.sType) {
						for (j = 0, jen = types.length; j < jen; j++) {
							for (k = 0, ken = data.length; k < ken; k++) {
								// Use a cache array so we only need to get the type data
								// from the formatter once (when using multiple detectors)
								if (cache[k] === undefined) {
									cache[k] = _fnGetCellData(settings, k, i, 'type');
								}

								detectedType = types[j](cache[k], settings);

								// If null, then this type can't apply to this column, so
								// rather than testing all cells, break out. There is an
								// exception for the last type which is `html`. We need to
								// scan all rows since it is possible to mix string and HTML
								// types
								if (!detectedType && j !== types.length - 1) {
									break;
								}

								// Only a single match is needed for html type since it is
								// bottom of the pile and very similar to string
								if (detectedType === 'html') {
									break;
								}
							}

							// Type is valid for all data points in the column - use this
							// type
							if (detectedType) {
								col.sType = detectedType;
								break;
							}
						}

						// Fall back - if no type was detected, always use string
						if (!col.sType) {
							col.sType = 'string';
						}
					}
				}
			}


			/**
			 * Take the column definitions and static columns arrays and calculate how
			 * they relate to column indexes. The callback function will then apply the
			 * definition found for a column to a suitable configuration object.
			 *  @param {object} oSettings dataTables settings object
			 *  @param {array} aoColDefs The aoColumnDefs array that is to be applied
			 *  @param {array} aoCols The aoColumns array that defines columns individually
			 *  @param {function} fn Callback function - takes two parameters, the calculated
			 *    column index and the definition for that column.
			 *  @memberof DataTable#oApi
			 */
			function _fnApplyColumnDefs(oSettings, aoColDefs, aoCols, fn) {
				var i, iLen, j, jLen, k, kLen, def;
				var columns = oSettings.aoColumns;

				// Column definitions with aTargets
				if (aoColDefs) {
					/* Loop over the definitions array - loop in reverse so first instance has priority */
					for (i = aoColDefs.length - 1; i >= 0; i--) {
						def = aoColDefs[i];

						/* Each definition can target multiple columns, as it is an array */
						var aTargets = def.targets !== undefined ?
							def.targets :
							def.aTargets;

						if (!$.isArray(aTargets)) {
							aTargets = [aTargets];
						}

						for (j = 0, jLen = aTargets.length; j < jLen; j++) {
							if (typeof aTargets[j] === 'number' && aTargets[j] >= 0) {
								/* Add columns that we don't yet know about */
								while (columns.length <= aTargets[j]) {
									_fnAddColumn(oSettings);
								}

								/* Integer, basic index */
								fn(aTargets[j], def);
							} else if (typeof aTargets[j] === 'number' && aTargets[j] < 0) {
								/* Negative integer, right to left column counting */
								fn(columns.length + aTargets[j], def);
							} else if (typeof aTargets[j] === 'string') {
								/* Class name matching on TH element */
								for (k = 0, kLen = columns.length; k < kLen; k++) {
									if (aTargets[j] == "_all" ||
										$(columns[k].nTh).hasClass(aTargets[j])) {
										fn(k, def);
									}
								}
							}
						}
					}
				}

				// Statically defined columns array
				if (aoCols) {
					for (i = 0, iLen = aoCols.length; i < iLen; i++) {
						fn(i, aoCols[i]);
					}
				}
			}

			/**
			 * Add a data array to the table, creating DOM node etc. This is the parallel to
			 * _fnGatherData, but for adding rows from a Javascript source, rather than a
			 * DOM source.
			 *  @param {object} oSettings dataTables settings object
			 *  @param {array} aData data array to be added
			 *  @param {node} [nTr] TR element to add to the table - optional. If not given,
			 *    DataTables will create a row automatically
			 *  @param {array} [anTds] Array of TD|TH elements for the row - must be given
			 *    if nTr is.
			 *  @returns {int} >=0 if successful (index of new aoData entry), -1 if failed
			 *  @memberof DataTable#oApi
			 */
			function _fnAddData(oSettings, aDataIn, nTr, anTds) {
				/* Create the object for storing information about this new row */
				var iRow = oSettings.aoData.length;
				var oData = $.extend(true, {}, DataTable.models.oRow, {
					src: nTr ? 'dom' : 'data',
					idx: iRow
				});

				oData._aData = aDataIn;
				oSettings.aoData.push(oData);

				/* Create the cells */
				var nTd, sThisType;
				var columns = oSettings.aoColumns;

				// Invalidate the column types as the new data needs to be revalidated
				for (var i = 0, iLen = columns.length; i < iLen; i++) {
					columns[i].sType = null;
				}

				/* Add to the display array */
				oSettings.aiDisplayMaster.push(iRow);

				var id = oSettings.rowIdFn(aDataIn);
				if (id !== undefined) {
					oSettings.aIds[id] = oData;
				}

				/* Create the DOM information, or register it if already present */
				if (nTr || !oSettings.oFeatures.bDeferRender) {
					_fnCreateTr(oSettings, iRow, nTr, anTds);
				}

				return iRow;
			}


			/**
			 * Add one or more TR elements to the table. Generally we'd expect to
			 * use this for reading data from a DOM sourced table, but it could be
			 * used for an TR element. Note that if a TR is given, it is used (i.e.
			 * it is not cloned).
			 *  @param {object} settings dataTables settings object
			 *  @param {array|node|jQuery} trs The TR element(s) to add to the table
			 *  @returns {array} Array of indexes for the added rows
			 *  @memberof DataTable#oApi
			 */
			function _fnAddTr(settings, trs) {
				var row;

				// Allow an individual node to be passed in
				if (!(trs instanceof $)) {
					trs = $(trs);
				}

				return trs.map(function (i, el) {
					row = _fnGetRowElements(settings, el);
					return _fnAddData(settings, row.data, el, row.cells);
				});
			}


			/**
			 * Take a TR element and convert it to an index in aoData
			 *  @param {object} oSettings dataTables settings object
			 *  @param {node} n the TR element to find
			 *  @returns {int} index if the node is found, null if not
			 *  @memberof DataTable#oApi
			 */
			function _fnNodeToDataIndex(oSettings, n) {
				return (n._DT_RowIndex !== undefined) ? n._DT_RowIndex : null;
			}


			/**
			 * Take a TD element and convert it into a column data index (not the visible index)
			 *  @param {object} oSettings dataTables settings object
			 *  @param {int} iRow The row number the TD/TH can be found in
			 *  @param {node} n The TD/TH element to find
			 *  @returns {int} index if the node is found, -1 if not
			 *  @memberof DataTable#oApi
			 */
			function _fnNodeToColumnIndex(oSettings, iRow, n) {
				return $.inArray(n, oSettings.aoData[iRow].anCells);
			}


			/**
			 * Get the data for a given cell from the internal cache, taking into account data mapping
			 *  @param {object} settings dataTables settings object
			 *  @param {int} rowIdx aoData row id
			 *  @param {int} colIdx Column index
			 *  @param {string} type data get type ('display', 'type' 'filter' 'sort')
			 *  @returns {*} Cell data
			 *  @memberof DataTable#oApi
			 */
			function _fnGetCellData(settings, rowIdx, colIdx, type) {
				var draw = settings.iDraw;
				var col = settings.aoColumns[colIdx];
				var rowData = settings.aoData[rowIdx]._aData;
				var defaultContent = col.sDefaultContent;
				var cellData = col.fnGetData(rowData, type, {
					settings: settings,
					row: rowIdx,
					col: colIdx
				});

				if (cellData === undefined) {
					if (settings.iDrawError != draw && defaultContent === null) {
						_fnLog(settings, 0, "Requested unknown parameter " +
							(typeof col.mData == 'function' ? '{function}' : "'" + col.mData + "'") +
							" for row " + rowIdx + ", column " + colIdx, 4);
						settings.iDrawError = draw;
					}
					return defaultContent;
				}

				// When the data source is null and a specific data type is requested (i.e.
				// not the original data), we can use default column data
				if ((cellData === rowData || cellData === null) && defaultContent !== null && type !== undefined) {
					cellData = defaultContent;
				} else if (typeof cellData === 'function') {
					// If the data source is a function, then we run it and use the return,
					// executing in the scope of the data object (for instances)
					return cellData.call(rowData);
				}

				if (cellData === null && type == 'display') {
					return '';
				}
				return cellData;
			}


			/**
			 * Set the value for a specific cell, into the internal data cache
			 *  @param {object} settings dataTables settings object
			 *  @param {int} rowIdx aoData row id
			 *  @param {int} colIdx Column index
			 *  @param {*} val Value to set
			 *  @memberof DataTable#oApi
			 */
			function _fnSetCellData(settings, rowIdx, colIdx, val) {
				var col = settings.aoColumns[colIdx];
				var rowData = settings.aoData[rowIdx]._aData;

				col.fnSetData(rowData, val, {
					settings: settings,
					row: rowIdx,
					col: colIdx
				});
			}


			// Private variable that is used to match action syntax in the data property object
			var __reArray = /\[.*?\]$/;
			var __reFn = /\(\)$/;

			/**
			 * Split string on periods, taking into account escaped periods
			 * @param  {string} str String to split
			 * @return {array} Split string
			 */
			function _fnSplitObjNotation(str) {
				return $.map(str.match(/(\\.|[^\.])+/g) || [''], function (s) {
					return s.replace(/\\\./g, '.');
				});
			}


			/**
			 * Return a function that can be used to get data from a source object, taking
			 * into account the ability to use nested objects as a source
			 *  @param {string|int|function} mSource The data source for the object
			 *  @returns {function} Data get function
			 *  @memberof DataTable#oApi
			 */
			function _fnGetObjectDataFn(mSource) {
				if ($.isPlainObject(mSource)) {
					/* Build an object of get functions, and wrap them in a single call */
					var o = {};
					$.each(mSource, function (key, val) {
						if (val) {
							o[key] = _fnGetObjectDataFn(val);
						}
					});

					return function (data, type, row, meta) {
						var t = o[type] || o._;
						return t !== undefined ?
							t(data, type, row, meta) :
							data;
					};
				} else if (mSource === null) {
					/* Give an empty string for rendering / sorting etc */
					return function (data) { // type, row and meta also passed, but not used
						return data;
					};
				} else if (typeof mSource === 'function') {
					return function (data, type, row, meta) {
						return mSource(data, type, row, meta);
					};
				} else if (typeof mSource === 'string' && (mSource.indexOf('.') !== -1 ||
						mSource.indexOf('[') !== -1 || mSource.indexOf('(') !== -1)) {
					/* If there is a . in the source string then the data source is in a
					 * nested object so we loop over the data for each level to get the next
					 * level down. On each loop we test for undefined, and if found immediately
					 * return. This allows entire objects to be missing and sDefaultContent to
					 * be used if defined, rather than throwing an error
					 */
					var fetchData = function (data, type, src) {
						var arrayNotation, funcNotation, out, innerSrc;

						if (src !== "") {
							var a = _fnSplitObjNotation(src);

							for (var i = 0, iLen = a.length; i < iLen; i++) {
								// Check if we are dealing with special notation
								arrayNotation = a[i].match(__reArray);
								funcNotation = a[i].match(__reFn);

								if (arrayNotation) {
									// Array notation
									a[i] = a[i].replace(__reArray, '');

									// Condition allows simply [] to be passed in
									if (a[i] !== "") {
										data = data[a[i]];
									}
									out = [];

									// Get the remainder of the nested object to get
									a.splice(0, i + 1);
									innerSrc = a.join('.');

									// Traverse each entry in the array getting the properties requested
									if ($.isArray(data)) {
										for (var j = 0, jLen = data.length; j < jLen; j++) {
											out.push(fetchData(data[j], type, innerSrc));
										}
									}

									// If a string is given in between the array notation indicators, that
									// is used to join the strings together, otherwise an array is returned
									var join = arrayNotation[0].substring(1, arrayNotation[0].length - 1);
									data = (join === "") ? out : out.join(join);

									// The inner call to fetchData has already traversed through the remainder
									// of the source requested, so we exit from the loop
									break;
								} else if (funcNotation) {
									// Function call
									a[i] = a[i].replace(__reFn, '');
									data = data[a[i]]();
									continue;
								}

								if (data === null || data[a[i]] === undefined) {
									return undefined;
								}
								data = data[a[i]];
							}
						}

						return data;
					};

					return function (data, type) { // row and meta also passed, but not used
						return fetchData(data, type, mSource);
					};
				} else {
					/* Array or flat object mapping */
					return function (data, type) { // row and meta also passed, but not used
						return data[mSource];
					};
				}
			}


			/**
			 * Return a function that can be used to set data from a source object, taking
			 * into account the ability to use nested objects as a source
			 *  @param {string|int|function} mSource The data source for the object
			 *  @returns {function} Data set function
			 *  @memberof DataTable#oApi
			 */
			function _fnSetObjectDataFn(mSource) {
				if ($.isPlainObject(mSource)) {
					/* Unlike get, only the underscore (global) option is used for for
					 * setting data since we don't know the type here. This is why an object
					 * option is not documented for `mData` (which is read/write), but it is
					 * for `mRender` which is read only.
					 */
					return _fnSetObjectDataFn(mSource._);
				} else if (mSource === null) {
					/* Nothing to do when the data source is null */
					return function () {};
				} else if (typeof mSource === 'function') {
					return function (data, val, meta) {
						mSource(data, 'set', val, meta);
					};
				} else if (typeof mSource === 'string' && (mSource.indexOf('.') !== -1 ||
						mSource.indexOf('[') !== -1 || mSource.indexOf('(') !== -1)) {
					/* Like the get, we need to get data from a nested object */
					var setData = function (data, val, src) {
						var a = _fnSplitObjNotation(src),
							b;
						var aLast = a[a.length - 1];
						var arrayNotation, funcNotation, o, innerSrc;

						for (var i = 0, iLen = a.length - 1; i < iLen; i++) {
							// Check if we are dealing with an array notation request
							arrayNotation = a[i].match(__reArray);
							funcNotation = a[i].match(__reFn);

							if (arrayNotation) {
								a[i] = a[i].replace(__reArray, '');
								data[a[i]] = [];

								// Get the remainder of the nested object to set so we can recurse
								b = a.slice();
								b.splice(0, i + 1);
								innerSrc = b.join('.');

								// Traverse each entry in the array setting the properties requested
								if ($.isArray(val)) {
									for (var j = 0, jLen = val.length; j < jLen; j++) {
										o = {};
										setData(o, val[j], innerSrc);
										data[a[i]].push(o);
									}
								} else {
									// We've been asked to save data to an array, but it
									// isn't array data to be saved. Best that can be done
									// is to just save the value.
									data[a[i]] = val;
								}

								// The inner call to setData has already traversed through the remainder
								// of the source and has set the data, thus we can exit here
								return;
							} else if (funcNotation) {
								// Function call
								a[i] = a[i].replace(__reFn, '');
								data = data[a[i]](val);
							}

							// If the nested object doesn't currently exist - since we are
							// trying to set the value - create it
							if (data[a[i]] === null || data[a[i]] === undefined) {
								data[a[i]] = {};
							}
							data = data[a[i]];
						}

						// Last item in the input - i.e, the actual set
						if (aLast.match(__reFn)) {
							// Function call
							data = data[aLast.replace(__reFn, '')](val);
						} else {
							// If array notation is used, we just want to strip it and use the property name
							// and assign the value. If it isn't used, then we get the result we want anyway
							data[aLast.replace(__reArray, '')] = val;
						}
					};

					return function (data, val) { // meta is also passed in, but not used
						return setData(data, val, mSource);
					};
				} else {
					/* Array or flat object mapping */
					return function (data, val) { // meta is also passed in, but not used
						data[mSource] = val;
					};
				}
			}


			/**
			 * Return an array with the full table data
			 *  @param {object} oSettings dataTables settings object
			 *  @returns array {array} aData Master data array
			 *  @memberof DataTable#oApi
			 */
			function _fnGetDataMaster(settings) {
				return _pluck(settings.aoData, '_aData');
			}


			/**
			 * Nuke the table
			 *  @param {object} oSettings dataTables settings object
			 *  @memberof DataTable#oApi
			 */
			function _fnClearTable(settings) {
				settings.aoData.length = 0;
				settings.aiDisplayMaster.length = 0;
				settings.aiDisplay.length = 0;
				settings.aIds = {};
			}


			/**
			 * Take an array of integers (index array) and remove a target integer (value - not
			 * the key!)
			 *  @param {array} a Index array to target
			 *  @param {int} iTarget value to find
			 *  @memberof DataTable#oApi
			 */
			function _fnDeleteIndex(a, iTarget, splice) {
				var iTargetIndex = -1;

				for (var i = 0, iLen = a.length; i < iLen; i++) {
					if (a[i] == iTarget) {
						iTargetIndex = i;
					} else if (a[i] > iTarget) {
						a[i]--;
					}
				}

				if (iTargetIndex != -1 && splice === undefined) {
					a.splice(iTargetIndex, 1);
				}
			}


			/**
			 * Mark cached data as invalid such that a re-read of the data will occur when
			 * the cached data is next requested. Also update from the data source object.
			 *
			 * @param {object} settings DataTables settings object
			 * @param {int}    rowIdx   Row index to invalidate
			 * @param {string} [src]    Source to invalidate from: undefined, 'auto', 'dom'
			 *     or 'data'
			 * @param {int}    [colIdx] Column index to invalidate. If undefined the whole
			 *     row will be invalidated
			 * @memberof DataTable#oApi
			 *
			 * @todo For the modularisation of v1.11 this will need to become a callback, so
			 *   the sort and filter methods can subscribe to it. That will required
			 *   initialisation options for sorting, which is why it is not already baked in
			 */
			function _fnInvalidate(settings, rowIdx, src, colIdx) {
				var row = settings.aoData[rowIdx];
				var i, ien;
				var cellWrite = function (cell, col) {
					// This is very frustrating, but in IE if you just write directly
					// to innerHTML, and elements that are overwritten are GC'ed,
					// even if there is a reference to them elsewhere
					while (cell.childNodes.length) {
						cell.removeChild(cell.firstChild);
					}

					cell.innerHTML = _fnGetCellData(settings, rowIdx, col, 'display');
				};

				// Are we reading last data from DOM or the data object?
				if (src === 'dom' || ((!src || src === 'auto') && row.src === 'dom')) {
					// Read the data from the DOM
					row._aData = _fnGetRowElements(
							settings, row, colIdx, colIdx === undefined ? undefined : row._aData
						)
						.data;
				} else {
					// Reading from data object, update the DOM
					var cells = row.anCells;

					if (cells) {
						if (colIdx !== undefined) {
							cellWrite(cells[colIdx], colIdx);
						} else {
							for (i = 0, ien = cells.length; i < ien; i++) {
								cellWrite(cells[i], i);
							}
						}
					}
				}

				// For both row and cell invalidation, the cached data for sorting and
				// filtering is nulled out
				row._aSortData = null;
				row._aFilterData = null;

				// Invalidate the type for a specific column (if given) or all columns since
				// the data might have changed
				var cols = settings.aoColumns;
				if (colIdx !== undefined) {
					cols[colIdx].sType = null;
				} else {
					for (i = 0, ien = cols.length; i < ien; i++) {
						cols[i].sType = null;
					}

					// Update DataTables special `DT_*` attributes for the row
					_fnRowAttributes(settings, row);
				}
			}


			/**
			 * Build a data source object from an HTML row, reading the contents of the
			 * cells that are in the row.
			 *
			 * @param {object} settings DataTables settings object
			 * @param {node|object} TR element from which to read data or existing row
			 *   object from which to re-read the data from the cells
			 * @param {int} [colIdx] Optional column index
			 * @param {array|object} [d] Data source object. If `colIdx` is given then this
			 *   parameter should also be given and will be used to write the data into.
			 *   Only the column in question will be written
			 * @returns {object} Object with two parameters: `data` the data read, in
			 *   document order, and `cells` and array of nodes (they can be useful to the
			 *   caller, so rather than needing a second traversal to get them, just return
			 *   them from here).
			 * @memberof DataTable#oApi
			 */
			function _fnGetRowElements(settings, row, colIdx, d) {
				var
					tds = [],
					td = row.firstChild,
					name, col, o, i = 0,
					contents,
					columns = settings.aoColumns,
					objectRead = settings._rowReadObject;

				// Allow the data object to be passed in, or construct
				d = d !== undefined ?
					d :
					objectRead ? {} : [];

				var attr = function (str, td) {
					if (typeof str === 'string') {
						var idx = str.indexOf('@');

						if (idx !== -1) {
							var attr = str.substring(idx + 1);
							var setter = _fnSetObjectDataFn(str);
							setter(d, td.getAttribute(attr));
						}
					}
				};

				// Read data from a cell and store into the data object
				var cellProcess = function (cell) {
					if (colIdx === undefined || colIdx === i) {
						col = columns[i];
						contents = $.trim(cell.innerHTML);

						if (col && col._bAttrSrc) {
							var setter = _fnSetObjectDataFn(col.mData._);
							setter(d, contents);

							attr(col.mData.sort, cell);
							attr(col.mData.type, cell);
							attr(col.mData.filter, cell);
						} else {
							// Depending on the `data` option for the columns the data can
							// be read to either an object or an array.
							if (objectRead) {
								if (!col._setter) {
									// Cache the setter function
									col._setter = _fnSetObjectDataFn(col.mData);
								}
								col._setter(d, contents);
							} else {
								d[i] = contents;
							}
						}
					}

					i++;
				};

				if (td) {
					// `tr` element was passed in
					while (td) {
						name = td.nodeName.toUpperCase();

						if (name == "TD" || name == "TH") {
							cellProcess(td);
							tds.push(td);
						}

						td = td.nextSibling;
					}
				} else {
					// Existing row object passed in
					tds = row.anCells;

					for (var j = 0, jen = tds.length; j < jen; j++) {
						cellProcess(tds[j]);
					}
				}

				// Read the ID from the DOM if present
				var rowNode = row.firstChild ? row : row.nTr;

				if (rowNode) {
					var id = rowNode.getAttribute('id');

					if (id) {
						_fnSetObjectDataFn(settings.rowId)(d, id);
					}
				}

				return {
					data: d,
					cells: tds
				};
			}
			/**
			 * Create a new TR element (and it's TD children) for a row
			 *  @param {object} oSettings dataTables settings object
			 *  @param {int} iRow Row to consider
			 *  @param {node} [nTrIn] TR element to add to the table - optional. If not given,
			 *    DataTables will create a row automatically
			 *  @param {array} [anTds] Array of TD|TH elements for the row - must be given
			 *    if nTr is.
			 *  @memberof DataTable#oApi
			 */
			function _fnCreateTr(oSettings, iRow, nTrIn, anTds) {
				var
					row = oSettings.aoData[iRow],
					rowData = row._aData,
					cells = [],
					nTr, nTd, oCol,
					i, iLen;

				if (row.nTr === null) {
					nTr = nTrIn || document.createElement('tr');

					row.nTr = nTr;
					row.anCells = cells;

					/* Use a private property on the node to allow reserve mapping from the node
					 * to the aoData array for fast look up
					 */
					nTr._DT_RowIndex = iRow;

					/* Special parameters can be given by the data source to be used on the row */
					_fnRowAttributes(oSettings, row);

					/* Process each column */
					for (i = 0, iLen = oSettings.aoColumns.length; i < iLen; i++) {
						oCol = oSettings.aoColumns[i];

						nTd = nTrIn ? anTds[i] : document.createElement(oCol.sCellType);
						nTd._DT_CellIndex = {
							row: iRow,
							column: i
						};

						cells.push(nTd);

						// Need to create the HTML if new, or if a rendering function is defined
						if ((!nTrIn || oCol.mRender || oCol.mData !== i) &&
							(!$.isPlainObject(oCol.mData) || oCol.mData._ !== i + '.display')
						) {
							nTd.innerHTML = _fnGetCellData(oSettings, iRow, i, 'display');
						}

						/* Add user defined class */
						if (oCol.sClass) {
							nTd.className += ' ' + oCol.sClass;
						}

						// Visibility - add or remove as required
						if (oCol.bVisible && !nTrIn) {
							nTr.appendChild(nTd);
						} else if (!oCol.bVisible && nTrIn) {
							nTd.parentNode.removeChild(nTd);
						}

						if (oCol.fnCreatedCell) {
							oCol.fnCreatedCell.call(oSettings.oInstance,
								nTd, _fnGetCellData(oSettings, iRow, i), rowData, iRow, i
							);
						}
					}

					_fnCallbackFire(oSettings, 'aoRowCreatedCallback', null, [nTr, rowData, iRow, cells]);
				}

				// Remove once webkit bug 131819 and Chromium bug 365619 have been resolved
				// and deployed
				row.nTr.setAttribute('role', 'row');
			}


			/**
			 * Add attributes to a row based on the special `DT_*` parameters in a data
			 * source object.
			 *  @param {object} settings DataTables settings object
			 *  @param {object} DataTables row object for the row to be modified
			 *  @memberof DataTable#oApi
			 */
			function _fnRowAttributes(settings, row) {
				var tr = row.nTr;
				var data = row._aData;

				if (tr) {
					var id = settings.rowIdFn(data);

					if (id) {
						tr.id = id;
					}

					if (data.DT_RowClass) {
						// Remove any classes added by DT_RowClass before
						var a = data.DT_RowClass.split(' ');
						row.__rowc = row.__rowc ?
							_unique(row.__rowc.concat(a)) :
							a;

						$(tr)
							.removeClass(row.__rowc.join(' '))
							.addClass(data.DT_RowClass);
					}

					if (data.DT_RowAttr) {
						$(tr).attr(data.DT_RowAttr);
					}

					if (data.DT_RowData) {
						$(tr).data(data.DT_RowData);
					}
				}
			}


			/**
			 * Create the HTML header for the table
			 *  @param {object} oSettings dataTables settings object
			 *  @memberof DataTable#oApi
			 */
			function _fnBuildHead(oSettings) {
				var i, ien, cell, row, column;
				var thead = oSettings.nTHead;
				var tfoot = oSettings.nTFoot;
				var createHeader = $('th, td', thead).length === 0;
				var classes = oSettings.oClasses;
				var columns = oSettings.aoColumns;

				if (createHeader) {
					row = $('<tr/>').appendTo(thead);
				}

				for (i = 0, ien = columns.length; i < ien; i++) {
					column = columns[i];
					cell = $(column.nTh).addClass(column.sClass);

					if (createHeader) {
						cell.appendTo(row);
					}

					// 1.11 move into sorting
					if (oSettings.oFeatures.bSort) {
						cell.addClass(column.sSortingClass);

						if (column.bSortable !== false) {
							cell
								.attr('tabindex', oSettings.iTabIndex)
								.attr('aria-controls', oSettings.sTableId);

							_fnSortAttachListener(oSettings, column.nTh, i);
						}
					}

					if (column.sTitle != cell[0].innerHTML) {
						cell.html(column.sTitle);
					}

					_fnRenderer(oSettings, 'header')(
						oSettings, cell, column, classes
					);
				}

				if (createHeader) {
					_fnDetectHeader(oSettings.aoHeader, thead);
				}

				/* ARIA role for the rows */
				$(thead).find('>tr').attr('role', 'row');

				/* Deal with the footer - add classes if required */
				$(thead).find('>tr>th, >tr>td').addClass(classes.sHeaderTH);
				$(tfoot).find('>tr>th, >tr>td').addClass(classes.sFooterTH);

				// Cache the footer cells. Note that we only take the cells from the first
				// row in the footer. If there is more than one row the user wants to
				// interact with, they need to use the table().foot() method. Note also this
				// allows cells to be used for multiple columns using colspan
				if (tfoot !== null) {
					var cells = oSettings.aoFooter[0];

					for (i = 0, ien = cells.length; i < ien; i++) {
						column = columns[i];
						column.nTf = cells[i].cell;

						if (column.sClass) {
							$(column.nTf).addClass(column.sClass);
						}
					}
				}
			}


			/**
			 * Draw the header (or footer) element based on the column visibility states. The
			 * methodology here is to use the layout array from _fnDetectHeader, modified for
			 * the instantaneous column visibility, to construct the new layout. The grid is
			 * traversed over cell at a time in a rows x columns grid fashion, although each
			 * cell insert can cover multiple elements in the grid - which is tracks using the
			 * aApplied array. Cell inserts in the grid will only occur where there isn't
			 * already a cell in that position.
			 *  @param {object} oSettings dataTables settings object
			 *  @param array {objects} aoSource Layout array from _fnDetectHeader
			 *  @param {boolean} [bIncludeHidden=false] If true then include the hidden columns in the calc,
			 *  @memberof DataTable#oApi
			 */
			function _fnDrawHead(oSettings, aoSource, bIncludeHidden) {
				var i, iLen, j, jLen, k, kLen, n, nLocalTr;
				var aoLocal = [];
				var aApplied = [];
				var iColumns = oSettings.aoColumns.length;
				var iRowspan, iColspan;

				if (!aoSource) {
					return;
				}

				if (bIncludeHidden === undefined) {
					bIncludeHidden = false;
				}

				/* Make a copy of the master layout array, but without the visible columns in it */
				for (i = 0, iLen = aoSource.length; i < iLen; i++) {
					aoLocal[i] = aoSource[i].slice();
					aoLocal[i].nTr = aoSource[i].nTr;

					/* Remove any columns which are currently hidden */
					for (j = iColumns - 1; j >= 0; j--) {
						if (!oSettings.aoColumns[j].bVisible && !bIncludeHidden) {
							aoLocal[i].splice(j, 1);
						}
					}

					/* Prep the applied array - it needs an element for each row */
					aApplied.push([]);
				}

				for (i = 0, iLen = aoLocal.length; i < iLen; i++) {
					nLocalTr = aoLocal[i].nTr;

					/* All cells are going to be replaced, so empty out the row */
					if (nLocalTr) {
						while ((n = nLocalTr.firstChild)) {
							nLocalTr.removeChild(n);
						}
					}

					for (j = 0, jLen = aoLocal[i].length; j < jLen; j++) {
						iRowspan = 1;
						iColspan = 1;

						/* Check to see if there is already a cell (row/colspan) covering our target
						 * insert point. If there is, then there is nothing to do.
						 */
						if (aApplied[i][j] === undefined) {
							nLocalTr.appendChild(aoLocal[i][j].cell);
							aApplied[i][j] = 1;

							/* Expand the cell to cover as many rows as needed */
							while (aoLocal[i + iRowspan] !== undefined &&
								aoLocal[i][j].cell == aoLocal[i + iRowspan][j].cell) {
								aApplied[i + iRowspan][j] = 1;
								iRowspan++;
							}

							/* Expand the cell to cover as many columns as needed */
							while (aoLocal[i][j + iColspan] !== undefined &&
								aoLocal[i][j].cell == aoLocal[i][j + iColspan].cell) {
								/* Must update the applied array over the rows for the columns */
								for (k = 0; k < iRowspan; k++) {
									aApplied[i + k][j + iColspan] = 1;
								}
								iColspan++;
							}

							/* Do the actual expansion in the DOM */
							$(aoLocal[i][j].cell)
								.attr('rowspan', iRowspan)
								.attr('colspan', iColspan);
						}
					}
				}
			}


			/**
			 * Insert the required TR nodes into the table for display
			 *  @param {object} oSettings dataTables settings object
			 *  @memberof DataTable#oApi
			 */
			function _fnDraw(oSettings) {
				/* Provide a pre-callback function which can be used to cancel the draw is false is returned */
				var aPreDraw = _fnCallbackFire(oSettings, 'aoPreDrawCallback', 'preDraw', [oSettings]);
				if ($.inArray(false, aPreDraw) !== -1) {
					_fnProcessingDisplay(oSettings, false);
					return;
				}

				var i, iLen, n;
				var anRows = [];
				var iRowCount = 0;
				var asStripeClasses = oSettings.asStripeClasses;
				var iStripes = asStripeClasses.length;
				var iOpenRows = oSettings.aoOpenRows.length;
				var oLang = oSettings.oLanguage;
				var iInitDisplayStart = oSettings.iInitDisplayStart;
				var bServerSide = _fnDataSource(oSettings) == 'ssp';
				var aiDisplay = oSettings.aiDisplay;

				oSettings.bDrawing = true;

				/* Check and see if we have an initial draw position from state saving */
				if (iInitDisplayStart !== undefined && iInitDisplayStart !== -1) {
					oSettings._iDisplayStart = bServerSide ?
						iInitDisplayStart :
						iInitDisplayStart >= oSettings.fnRecordsDisplay() ?
						0 :
						iInitDisplayStart;

					oSettings.iInitDisplayStart = -1;
				}

				var iDisplayStart = oSettings._iDisplayStart;
				var iDisplayEnd = oSettings.fnDisplayEnd();

				/* Server-side processing draw intercept */
				if (oSettings.bDeferLoading) {
					oSettings.bDeferLoading = false;
					oSettings.iDraw++;
					_fnProcessingDisplay(oSettings, false);
				} else if (!bServerSide) {
					oSettings.iDraw++;
				} else if (!oSettings.bDestroying && !_fnAjaxUpdate(oSettings)) {
					return;
				}

				if (aiDisplay.length !== 0) {
					var iStart = bServerSide ? 0 : iDisplayStart;
					var iEnd = bServerSide ? oSettings.aoData.length : iDisplayEnd;

					for (var j = iStart; j < iEnd; j++) {
						var iDataIndex = aiDisplay[j];
						var aoData = oSettings.aoData[iDataIndex];
						if (aoData.nTr === null) {
							_fnCreateTr(oSettings, iDataIndex);
						}

						var nRow = aoData.nTr;

						/* Remove the old striping classes and then add the new one */
						if (iStripes !== 0) {
							var sStripe = asStripeClasses[iRowCount % iStripes];
							if (aoData._sRowStripe != sStripe) {
								$(nRow).removeClass(aoData._sRowStripe).addClass(sStripe);
								aoData._sRowStripe = sStripe;
							}
						}

						// Row callback functions - might want to manipulate the row
						// iRowCount and j are not currently documented. Are they at all
						// useful?
						_fnCallbackFire(oSettings, 'aoRowCallback', null,
							[nRow, aoData._aData, iRowCount, j, iDataIndex]);

						anRows.push(nRow);
						iRowCount++;
					}
				} else {
					/* Table is empty - create a row with an empty message in it */
					var sZero = oLang.sZeroRecords;
					if (oSettings.iDraw == 1 && _fnDataSource(oSettings) == 'ajax') {
						sZero = oLang.sLoadingRecords;
					} else if (oLang.sEmptyTable && oSettings.fnRecordsTotal() === 0) {
						sZero = oLang.sEmptyTable;
					}

					anRows[0] = $('<tr/>', {
							'class': iStripes ? asStripeClasses[0] : ''
						})
						.append($('<td />', {
							'valign': 'top',
							'colSpan': _fnVisbleColumns(oSettings),
							'class': oSettings.oClasses.sRowEmpty
						}).html(sZero))[0];
				}

				/* Header and footer callbacks */
				_fnCallbackFire(oSettings, 'aoHeaderCallback', 'header', [$(oSettings.nTHead).children('tr')[0],
					_fnGetDataMaster(oSettings), iDisplayStart, iDisplayEnd, aiDisplay
				]);

				_fnCallbackFire(oSettings, 'aoFooterCallback', 'footer', [$(oSettings.nTFoot).children('tr')[0],
					_fnGetDataMaster(oSettings), iDisplayStart, iDisplayEnd, aiDisplay
				]);

				var body = $(oSettings.nTBody);

				body.children().detach();
				body.append($(anRows));

				/* Call all required callback functions for the end of a draw */
				_fnCallbackFire(oSettings, 'aoDrawCallback', 'draw', [oSettings]);

				/* Draw is complete, sorting and filtering must be as well */
				oSettings.bSorted = false;
				oSettings.bFiltered = false;
				oSettings.bDrawing = false;
			}


			/**
			 * Redraw the table - taking account of the various features which are enabled
			 *  @param {object} oSettings dataTables settings object
			 *  @param {boolean} [holdPosition] Keep the current paging position. By default
			 *    the paging is reset to the first page
			 *  @memberof DataTable#oApi
			 */
			function _fnReDraw(settings, holdPosition) {
				var
					features = settings.oFeatures,
					sort = features.bSort,
					filter = features.bFilter;

				if (sort) {
					_fnSort(settings);
				}

				if (filter) {
					_fnFilterComplete(settings, settings.oPreviousSearch);
				} else {
					// No filtering, so we want to just use the display master
					settings.aiDisplay = settings.aiDisplayMaster.slice();
				}

				if (holdPosition !== true) {
					settings._iDisplayStart = 0;
				}

				// Let any modules know about the draw hold position state (used by
				// scrolling internally)
				settings._drawHold = holdPosition;

				_fnDraw(settings);

				settings._drawHold = false;
			}


			/**
			 * Add the options to the page HTML for the table
			 *  @param {object} oSettings dataTables settings object
			 *  @memberof DataTable#oApi
			 */
			function _fnAddOptionsHtml(oSettings) {
				var classes = oSettings.oClasses;
				var table = $(oSettings.nTable);
				var holding = $('<div/>').insertBefore(table); // Holding element for speed
				var features = oSettings.oFeatures;

				// All DataTables are wrapped in a div
				var insert = $('<div/>', {
					id: oSettings.sTableId + '_wrapper',
					'class': classes.sWrapper + (oSettings.nTFoot ? '' : ' ' + classes.sNoFooter)
				});

				oSettings.nHolding = holding[0];
				oSettings.nTableWrapper = insert[0];
				oSettings.nTableReinsertBefore = oSettings.nTable.nextSibling;

				/* Loop over the user set positioning and place the elements as needed */
				var aDom = oSettings.sDom.split('');
				var featureNode, cOption, nNewNode, cNext, sAttr, j;
				for (var i = 0; i < aDom.length; i++) {
					featureNode = null;
					cOption = aDom[i];

					if (cOption == '<') {
						/* New container div */
						nNewNode = $('<div/>')[0];

						/* Check to see if we should append an id and/or a class name to the container */
						cNext = aDom[i + 1];
						if (cNext == "'" || cNext == '"') {
							sAttr = "";
							j = 2;
							while (aDom[i + j] != cNext) {
								sAttr += aDom[i + j];
								j++;
							}

							/* Replace jQuery UI constants @todo depreciated */
							if (sAttr == "H") {
								sAttr = classes.sJUIHeader;
							} else if (sAttr == "F") {
								sAttr = classes.sJUIFooter;
							}

							/* The attribute can be in the format of "#id.class", "#id" or "class" This logic
							 * breaks the string into parts and applies them as needed
							 */
							if (sAttr.indexOf('.') != -1) {
								var aSplit = sAttr.split('.');
								nNewNode.id = aSplit[0].substr(1, aSplit[0].length - 1);
								nNewNode.className = aSplit[1];
							} else if (sAttr.charAt(0) == "#") {
								nNewNode.id = sAttr.substr(1, sAttr.length - 1);
							} else {
								nNewNode.className = sAttr;
							}

							i += j; /* Move along the position array */
						}

						insert.append(nNewNode);
						insert = $(nNewNode);
					} else if (cOption == '>') {
						/* End container div */
						insert = insert.parent();
					}
					// @todo Move options into their own plugins?
					else if (cOption == 'l' && features.bPaginate && features.bLengthChange) {
						/* Length */
						featureNode = _fnFeatureHtmlLength(oSettings);
					} else if (cOption == 'f' && features.bFilter) {
						/* Filter */
						featureNode = _fnFeatureHtmlFilter(oSettings);
					} else if (cOption == 'r' && features.bProcessing) {
						/* pRocessing */
						featureNode = _fnFeatureHtmlProcessing(oSettings);
					} else if (cOption == 't') {
						/* Table */
						featureNode = _fnFeatureHtmlTable(oSettings);
					} else if (cOption == 'i' && features.bInfo) {
						/* Info */
						featureNode = _fnFeatureHtmlInfo(oSettings);
					} else if (cOption == 'p' && features.bPaginate) {
						/* Pagination */
						featureNode = _fnFeatureHtmlPaginate(oSettings);
					} else if (DataTable.ext.feature.length !== 0) {
						/* Plug-in features */
						var aoFeatures = DataTable.ext.feature;
						for (var k = 0, kLen = aoFeatures.length; k < kLen; k++) {
							if (cOption == aoFeatures[k].cFeature) {
								featureNode = aoFeatures[k].fnInit(oSettings);
								break;
							}
						}
					}

					/* Add to the 2D features array */
					if (featureNode) {
						var aanFeatures = oSettings.aanFeatures;

						if (!aanFeatures[cOption]) {
							aanFeatures[cOption] = [];
						}

						aanFeatures[cOption].push(featureNode);
						insert.append(featureNode);
					}
				}

				/* Built our DOM structure - replace the holding div with what we want */
				holding.replaceWith(insert);
				oSettings.nHolding = null;
			}


			/**
			 * Use the DOM source to create up an array of header cells. The idea here is to
			 * create a layout grid (array) of rows x columns, which contains a reference
			 * to the cell that that point in the grid (regardless of col/rowspan), such that
			 * any column / row could be removed and the new grid constructed
			 *  @param array {object} aLayout Array to store the calculated layout in
			 *  @param {node} nThead The header/footer element for the table
			 *  @memberof DataTable#oApi
			 */
			function _fnDetectHeader(aLayout, nThead) {
				var nTrs = $(nThead).children('tr');
				var nTr, nCell;
				var i, k, l, iLen, jLen, iColShifted, iColumn, iColspan, iRowspan;
				var bUnique;
				var fnShiftCol = function (a, i, j) {
					var k = a[i];
					while (k[j]) {
						j++;
					}
					return j;
				};

				aLayout.splice(0, aLayout.length);

				/* We know how many rows there are in the layout - so prep it */
				for (i = 0, iLen = nTrs.length; i < iLen; i++) {
					aLayout.push([]);
				}

				/* Calculate a layout array */
				for (i = 0, iLen = nTrs.length; i < iLen; i++) {
					nTr = nTrs[i];
					iColumn = 0;

					/* For every cell in the row... */
					nCell = nTr.firstChild;
					while (nCell) {
						if (nCell.nodeName.toUpperCase() == "TD" ||
							nCell.nodeName.toUpperCase() == "TH") {
							/* Get the col and rowspan attributes from the DOM and sanitise them */
							iColspan = nCell.getAttribute('colspan') * 1;
							iRowspan = nCell.getAttribute('rowspan') * 1;
							iColspan = (!iColspan || iColspan === 0 || iColspan === 1) ? 1 : iColspan;
							iRowspan = (!iRowspan || iRowspan === 0 || iRowspan === 1) ? 1 : iRowspan;

							/* There might be colspan cells already in this row, so shift our target
							 * accordingly
							 */
							iColShifted = fnShiftCol(aLayout, i, iColumn);

							/* Cache calculation for unique columns */
							bUnique = iColspan === 1 ? true : false;

							/* If there is col / rowspan, copy the information into the layout grid */
							for (l = 0; l < iColspan; l++) {
								for (k = 0; k < iRowspan; k++) {
									aLayout[i + k][iColShifted + l] = {
										"cell": nCell,
										"unique": bUnique
									};
									aLayout[i + k].nTr = nTr;
								}
							}
						}
						nCell = nCell.nextSibling;
					}
				}
			}


			/**
			 * Get an array of unique th elements, one for each column
			 *  @param {object} oSettings dataTables settings object
			 *  @param {node} nHeader automatically detect the layout from this node - optional
			 *  @param {array} aLayout thead/tfoot layout from _fnDetectHeader - optional
			 *  @returns array {node} aReturn list of unique th's
			 *  @memberof DataTable#oApi
			 */
			function _fnGetUniqueThs(oSettings, nHeader, aLayout) {
				var aReturn = [];
				if (!aLayout) {
					aLayout = oSettings.aoHeader;
					if (nHeader) {
						aLayout = [];
						_fnDetectHeader(aLayout, nHeader);
					}
				}

				for (var i = 0, iLen = aLayout.length; i < iLen; i++) {
					for (var j = 0, jLen = aLayout[i].length; j < jLen; j++) {
						if (aLayout[i][j].unique &&
							(!aReturn[j] || !oSettings.bSortCellsTop)) {
							aReturn[j] = aLayout[i][j].cell;
						}
					}
				}

				return aReturn;
			}

			/**
			 * Create an Ajax call based on the table's settings, taking into account that
			 * parameters can have multiple forms, and backwards compatibility.
			 *
			 * @param {object} oSettings dataTables settings object
			 * @param {array} data Data to send to the server, required by
			 *     DataTables - may be augmented by developer callbacks
			 * @param {function} fn Callback function to run when data is obtained
			 */
			function _fnBuildAjax(oSettings, data, fn) {
				// Compatibility with 1.9-, allow fnServerData and event to manipulate
				_fnCallbackFire(oSettings, 'aoServerParams', 'serverParams', [data]);

				// Convert to object based for 1.10+ if using the old array scheme which can
				// come from server-side processing or serverParams
				if (data && $.isArray(data)) {
					var tmp = {};
					var rbracket = /(.*?)\[\]$/;

					$.each(data, function (key, val) {
						var match = val.name.match(rbracket);

						if (match) {
							// Support for arrays
							var name = match[0];

							if (!tmp[name]) {
								tmp[name] = [];
							}
							tmp[name].push(val.value);
						} else {
							tmp[val.name] = val.value;
						}
					});
					data = tmp;
				}

				var ajaxData;
				var ajax = oSettings.ajax;
				var instance = oSettings.oInstance;
				var callback = function (json) {
					_fnCallbackFire(oSettings, null, 'xhr', [oSettings, json, oSettings.jqXHR]);
					fn(json);
				};

				if ($.isPlainObject(ajax) && ajax.data) {
					ajaxData = ajax.data;

					var newData = typeof ajaxData === 'function' ?
						ajaxData(data, oSettings) : // fn can manipulate data or return
						ajaxData; // an object object or array to merge

					// If the function returned something, use that alone
					data = typeof ajaxData === 'function' && newData ?
						newData :
						$.extend(true, data, newData);

					// Remove the data property as we've resolved it already and don't want
					// jQuery to do it again (it is restored at the end of the function)
					delete ajax.data;
				}

				var baseAjax = {
					"data": data,
					"success": function (json) {
						var error = json.error || json.sError;
						if (error) {
							_fnLog(oSettings, 0, error);
						}

						oSettings.json = json;
						callback(json);
					},
					"dataType": "json",
					"cache": false,
					"type": oSettings.sServerMethod,
					"error": function (xhr, error, thrown) {
						var ret = _fnCallbackFire(oSettings, null, 'xhr', [oSettings, null, oSettings.jqXHR]);

						if ($.inArray(true, ret) === -1) {
							if (error == "parsererror") {
								_fnLog(oSettings, 0, 'Invalid JSON response', 1);
							} else if (xhr.readyState === 4) {
								_fnLog(oSettings, 0, 'Ajax error', 7);
							}
						}

						_fnProcessingDisplay(oSettings, false);
					}
				};

				// Store the data submitted for the API
				oSettings.oAjaxData = data;

				// Allow plug-ins and external processes to modify the data
				_fnCallbackFire(oSettings, null, 'preXhr', [oSettings, data]);

				if (oSettings.fnServerData) {
					// DataTables 1.9- compatibility
					oSettings.fnServerData.call(instance,
						oSettings.sAjaxSource,
						$.map(data, function (val, key) { // Need to convert back to 1.9 trad format
							return {
								name: key,
								value: val
							};
						}),
						callback,
						oSettings
					);
				} else if (oSettings.sAjaxSource || typeof ajax === 'string') {
					// DataTables 1.9- compatibility
					oSettings.jqXHR = $.ajax($.extend(baseAjax, {
						url: ajax || oSettings.sAjaxSource
					}));
				} else if (typeof ajax === 'function') {
					// Is a function - let the caller define what needs to be done
					oSettings.jqXHR = ajax.call(instance, data, callback, oSettings);
				} else {
					// Object to extend the base settings
					oSettings.jqXHR = $.ajax($.extend(baseAjax, ajax));

					// Restore for next time around
					ajax.data = ajaxData;
				}
			}


			/**
			 * Update the table using an Ajax call
			 *  @param {object} settings dataTables settings object
			 *  @returns {boolean} Block the table drawing or not
			 *  @memberof DataTable#oApi
			 */
			function _fnAjaxUpdate(settings) {
				if (settings.bAjaxDataGet) {
					settings.iDraw++;
					_fnProcessingDisplay(settings, true);

					_fnBuildAjax(
						settings,
						_fnAjaxParameters(settings),
						function (json) {
							_fnAjaxUpdateDraw(settings, json);
						}
					);

					return false;
				}
				return true;
			}


			/**
			 * Build up the parameters in an object needed for a server-side processing
			 * request. Note that this is basically done twice, is different ways - a modern
			 * method which is used by default in DataTables 1.10 which uses objects and
			 * arrays, or the 1.9- method with is name / value pairs. 1.9 method is used if
			 * the sAjaxSource option is used in the initialisation, or the legacyAjax
			 * option is set.
			 *  @param {object} oSettings dataTables settings object
			 *  @returns {bool} block the table drawing or not
			 *  @memberof DataTable#oApi
			 */
			function _fnAjaxParameters(settings) {
				var
					columns = settings.aoColumns,
					columnCount = columns.length,
					features = settings.oFeatures,
					preSearch = settings.oPreviousSearch,
					preColSearch = settings.aoPreSearchCols,
					i, data = [],
					dataProp, column, columnSearch,
					sort = _fnSortFlatten(settings),
					displayStart = settings._iDisplayStart,
					displayLength = features.bPaginate !== false ?
					settings._iDisplayLength :
					-1;

				var param = function (name, value) {
					data.push({
						'name': name,
						'value': value
					});
				};

				// DataTables 1.9- compatible method
				param('sEcho', settings.iDraw);
				param('iColumns', columnCount);
				param('sColumns', _pluck(columns, 'sName').join(','));
				param('iDisplayStart', displayStart);
				param('iDisplayLength', displayLength);

				// DataTables 1.10+ method
				var d = {
					draw: settings.iDraw,
					columns: [],
					order: [],
					start: displayStart,
					length: displayLength,
					search: {
						value: preSearch.sSearch,
						regex: preSearch.bRegex
					}
				};

				for (i = 0; i < columnCount; i++) {
					column = columns[i];
					columnSearch = preColSearch[i];
					dataProp = typeof column.mData == "function" ? 'function' : column.mData;

					d.columns.push({
						data: dataProp,
						name: column.sName,
						searchable: column.bSearchable,
						orderable: column.bSortable,
						search: {
							value: columnSearch.sSearch,
							regex: columnSearch.bRegex
						}
					});

					param("mDataProp_" + i, dataProp);

					if (features.bFilter) {
						param('sSearch_' + i, columnSearch.sSearch);
						param('bRegex_' + i, columnSearch.bRegex);
						param('bSearchable_' + i, column.bSearchable);
					}

					if (features.bSort) {
						param('bSortable_' + i, column.bSortable);
					}
				}

				if (features.bFilter) {
					param('sSearch', preSearch.sSearch);
					param('bRegex', preSearch.bRegex);
				}

				if (features.bSort) {
					$.each(sort, function (i, val) {
						d.order.push({
							column: val.col,
							dir: val.dir
						});

						param('iSortCol_' + i, val.col);
						param('sSortDir_' + i, val.dir);
					});

					param('iSortingCols', sort.length);
				}

				// If the legacy.ajax parameter is null, then we automatically decide which
				// form to use, based on sAjaxSource
				var legacy = DataTable.ext.legacy.ajax;
				if (legacy === null) {
					return settings.sAjaxSource ? data : d;
				}

				// Otherwise, if legacy has been specified then we use that to decide on the
				// form
				return legacy ? data : d;
			}


			/**
			 * Data the data from the server (nuking the old) and redraw the table
			 *  @param {object} oSettings dataTables settings object
			 *  @param {object} json json data return from the server.
			 *  @param {string} json.sEcho Tracking flag for DataTables to match requests
			 *  @param {int} json.iTotalRecords Number of records in the data set, not accounting for filtering
			 *  @param {int} json.iTotalDisplayRecords Number of records in the data set, accounting for filtering
			 *  @param {array} json.aaData The data to display on this page
			 *  @param {string} [json.sColumns] Column ordering (sName, comma separated)
			 *  @memberof DataTable#oApi
			 */
			function _fnAjaxUpdateDraw(settings, json) {
				// v1.10 uses camelCase variables, while 1.9 uses Hungarian notation.
				// Support both
				var compat = function (old, modern) {
					return json[old] !== undefined ? json[old] : json[modern];
				};

				var data = _fnAjaxDataSrc(settings, json);
				var draw = compat('sEcho', 'draw');
				var recordsTotal = compat('iTotalRecords', 'recordsTotal');
				var recordsFiltered = compat('iTotalDisplayRecords', 'recordsFiltered');

				if (draw) {
					// Protect against out of sequence returns
					if (draw * 1 < settings.iDraw) {
						return;
					}
					settings.iDraw = draw * 1;
				}

				_fnClearTable(settings);
				settings._iRecordsTotal = parseInt(recordsTotal, 10);
				settings._iRecordsDisplay = parseInt(recordsFiltered, 10);

				for (var i = 0, ien = data.length; i < ien; i++) {
					_fnAddData(settings, data[i]);
				}
				settings.aiDisplay = settings.aiDisplayMaster.slice();

				settings.bAjaxDataGet = false;
				_fnDraw(settings);

				if (!settings._bInitComplete) {
					_fnInitComplete(settings, json);
				}

				settings.bAjaxDataGet = true;
				_fnProcessingDisplay(settings, false);
			}


			/**
			 * Get the data from the JSON data source to use for drawing a table. Using
			 * `_fnGetObjectDataFn` allows the data to be sourced from a property of the
			 * source object, or from a processing function.
			 *  @param {object} oSettings dataTables settings object
			 *  @param  {object} json Data source object / array from the server
			 *  @return {array} Array of data to use
			 */
			function _fnAjaxDataSrc(oSettings, json) {
				var dataSrc = $.isPlainObject(oSettings.ajax) && oSettings.ajax.dataSrc !== undefined ?
					oSettings.ajax.dataSrc :
					oSettings.sAjaxDataProp; // Compatibility with 1.9-.

				// Compatibility with 1.9-. In order to read from aaData, check if the
				// default has been changed, if not, check for aaData
				if (dataSrc === 'data') {
					return json.aaData || json[dataSrc];
				}

				return dataSrc !== "" ?
					_fnGetObjectDataFn(dataSrc)(json) :
					json;
			}

			/**
			 * Generate the node required for filtering text
			 *  @returns {node} Filter control element
			 *  @param {object} oSettings dataTables settings object
			 *  @memberof DataTable#oApi
			 */
			function _fnFeatureHtmlFilter(settings) {
				var classes = settings.oClasses;
				var tableId = settings.sTableId;
				var language = settings.oLanguage;
				var previousSearch = settings.oPreviousSearch;
				var features = settings.aanFeatures;
				var input = '<input type="search" class="' + classes.sFilterInput + '"/>';

				var str = language.sSearch;
				str = str.match(/_INPUT_/) ?
					str.replace('_INPUT_', input) :
					str + input;

				var filter = $('<div/>', {
						'id': !features.f ? tableId + '_filter' : null,
						'class': classes.sFilter
					})
					.append($('<label/>').append(str));

				var searchFn = function () {
					/* Update all other filter input elements for the new display */
					var n = features.f;
					var val = !this.value ? "" : this.value; // mental IE8 fix :-(

					/* Now do the filter */
					if (val != previousSearch.sSearch) {
						_fnFilterComplete(settings, {
							"sSearch": val,
							"bRegex": previousSearch.bRegex,
							"bSmart": previousSearch.bSmart,
							"bCaseInsensitive": previousSearch.bCaseInsensitive
						});

						// Need to redraw, without resorting
						settings._iDisplayStart = 0;
						_fnDraw(settings);
					}
				};

				var searchDelay = settings.searchDelay !== null ?
					settings.searchDelay :
					_fnDataSource(settings) === 'ssp' ?
					400 :
					0;

				var jqFilter = $('input', filter)
					.val(previousSearch.sSearch)
					.attr('placeholder', language.sSearchPlaceholder)
					.on(
						'keyup.DT search.DT input.DT paste.DT cut.DT',
						searchDelay ?
						_fnThrottle(searchFn, searchDelay) :
						searchFn
					)
					.on('keypress.DT', function (e) {
						/* Prevent form submission */
						if (e.keyCode == 13) {
							return false;
						}
					})
					.attr('aria-controls', tableId);

				// Update the input elements whenever the table is filtered
				$(settings.nTable).on('search.dt.DT', function (ev, s) {
					if (settings === s) {
						// IE9 throws an 'unknown error' if document.activeElement is used
						// inside an iframe or frame...
						try {
							if (jqFilter[0] !== document.activeElement) {
								jqFilter.val(previousSearch.sSearch);
							}
						} catch (e) {}
					}
				});

				return filter[0];
			}


			/**
			 * Filter the table using both the global filter and column based filtering
			 *  @param {object} oSettings dataTables settings object
			 *  @param {object} oSearch search information
			 *  @param {int} [iForce] force a research of the master array (1) or not (undefined or 0)
			 *  @memberof DataTable#oApi
			 */
			function _fnFilterComplete(oSettings, oInput, iForce) {
				var oPrevSearch = oSettings.oPreviousSearch;
				var aoPrevSearch = oSettings.aoPreSearchCols;
				var fnSaveFilter = function (oFilter) {
					/* Save the filtering values */
					oPrevSearch.sSearch = oFilter.sSearch;
					oPrevSearch.bRegex = oFilter.bRegex;
					oPrevSearch.bSmart = oFilter.bSmart;
					oPrevSearch.bCaseInsensitive = oFilter.bCaseInsensitive;
				};
				var fnRegex = function (o) {
					// Backwards compatibility with the bEscapeRegex option
					return o.bEscapeRegex !== undefined ? !o.bEscapeRegex : o.bRegex;
				};

				// Resolve any column types that are unknown due to addition or invalidation
				// @todo As per sort - can this be moved into an event handler?
				_fnColumnTypes(oSettings);

				/* In server-side processing all filtering is done by the server, so no point hanging around here */
				if (_fnDataSource(oSettings) != 'ssp') {
					/* Global filter */
					_fnFilter(oSettings, oInput.sSearch, iForce, fnRegex(oInput), oInput.bSmart, oInput.bCaseInsensitive);
					fnSaveFilter(oInput);

					/* Now do the individual column filter */
					for (var i = 0; i < aoPrevSearch.length; i++) {
						_fnFilterColumn(oSettings, aoPrevSearch[i].sSearch, i, fnRegex(aoPrevSearch[i]),
							aoPrevSearch[i].bSmart, aoPrevSearch[i].bCaseInsensitive);
					}

					/* Custom filtering */
					_fnFilterCustom(oSettings);
				} else {
					fnSaveFilter(oInput);
				}

				/* Tell the draw function we have been filtering */
				oSettings.bFiltered = true;
				_fnCallbackFire(oSettings, null, 'search', [oSettings]);
			}


			/**
			 * Apply custom filtering functions
			 *  @param {object} oSettings dataTables settings object
			 *  @memberof DataTable#oApi
			 */
			function _fnFilterCustom(settings) {
				var filters = DataTable.ext.search;
				var displayRows = settings.aiDisplay;
				var row, rowIdx;

				for (var i = 0, ien = filters.length; i < ien; i++) {
					var rows = [];

					// Loop over each row and see if it should be included
					for (var j = 0, jen = displayRows.length; j < jen; j++) {
						rowIdx = displayRows[j];
						row = settings.aoData[rowIdx];

						if (filters[i](settings, row._aFilterData, rowIdx, row._aData, j)) {
							rows.push(rowIdx);
						}
					}

					// So the array reference doesn't break set the results into the
					// existing array
					displayRows.length = 0;
					$.merge(displayRows, rows);
				}
			}


			/**
			 * Filter the table on a per-column basis
			 *  @param {object} oSettings dataTables settings object
			 *  @param {string} sInput string to filter on
			 *  @param {int} iColumn column to filter
			 *  @param {bool} bRegex treat search string as a regular expression or not
			 *  @param {bool} bSmart use smart filtering or not
			 *  @param {bool} bCaseInsensitive Do case insenstive matching or not
			 *  @memberof DataTable#oApi
			 */
			function _fnFilterColumn(settings, searchStr, colIdx, regex, smart, caseInsensitive) {
				if (searchStr === '') {
					return;
				}

				var data;
				var out = [];
				var display = settings.aiDisplay;
				var rpSearch = _fnFilterCreateSearch(searchStr, regex, smart, caseInsensitive);

				for (var i = 0; i < display.length; i++) {
					data = settings.aoData[display[i]]._aFilterData[colIdx];

					if (rpSearch.test(data)) {
						out.push(display[i]);
					}
				}

				settings.aiDisplay = out;
			}


			/**
			 * Filter the data table based on user input and draw the table
			 *  @param {object} settings dataTables settings object
			 *  @param {string} input string to filter on
			 *  @param {int} force optional - force a research of the master array (1) or not (undefined or 0)
			 *  @param {bool} regex treat as a regular expression or not
			 *  @param {bool} smart perform smart filtering or not
			 *  @param {bool} caseInsensitive Do case insenstive matching or not
			 *  @memberof DataTable#oApi
			 */
			function _fnFilter(settings, input, force, regex, smart, caseInsensitive) {
				var rpSearch = _fnFilterCreateSearch(input, regex, smart, caseInsensitive);
				var prevSearch = settings.oPreviousSearch.sSearch;
				var displayMaster = settings.aiDisplayMaster;
				var display, invalidated, i;
				var filtered = [];

				// Need to take account of custom filtering functions - always filter
				if (DataTable.ext.search.length !== 0) {
					force = true;
				}

				// Check if any of the rows were invalidated
				invalidated = _fnFilterData(settings);

				// If the input is blank - we just want the full data set
				if (input.length <= 0) {
					settings.aiDisplay = displayMaster.slice();
				} else {
					// New search - start from the master array
					if (invalidated ||
						force ||
						prevSearch.length > input.length ||
						input.indexOf(prevSearch) !== 0 ||
						settings.bSorted // On resort, the display master needs to be
						// re-filtered since indexes will have changed
					) {
						settings.aiDisplay = displayMaster.slice();
					}

					// Search the display array
					display = settings.aiDisplay;

					for (i = 0; i < display.length; i++) {
						if (rpSearch.test(settings.aoData[display[i]]._sFilterRow)) {
							filtered.push(display[i]);
						}
					}

					settings.aiDisplay = filtered;
				}
			}


			/**
			 * Build a regular expression object suitable for searching a table
			 *  @param {string} sSearch string to search for
			 *  @param {bool} bRegex treat as a regular expression or not
			 *  @param {bool} bSmart perform smart filtering or not
			 *  @param {bool} bCaseInsensitive Do case insensitive matching or not
			 *  @returns {RegExp} constructed object
			 *  @memberof DataTable#oApi
			 */
			function _fnFilterCreateSearch(search, regex, smart, caseInsensitive) {
				search = regex ?
					search :
					_fnEscapeRegex(search);

				if (smart) {
					/* For smart filtering we want to allow the search to work regardless of
					 * word order. We also want double quoted text to be preserved, so word
					 * order is important - a la google. So this is what we want to
					 * generate:
					 * 
					 * ^(?=.*?\bone\b)(?=.*?\btwo three\b)(?=.*?\bfour\b).*$
					 */
					var a = $.map(search.match(/"[^"]+"|[^ ]+/g) || [''], function (word) {
						if (word.charAt(0) === '"') {
							var m = word.match(/^"(.*)"$/);
							word = m ? m[1] : word;
						}

						return word.replace('"', '');
					});

					search = '^(?=.*?' + a.join(')(?=.*?') + ').*$';
				}

				return new RegExp(search, caseInsensitive ? 'i' : '');
			}


			/**
			 * Escape a string such that it can be used in a regular expression
			 *  @param {string} sVal string to escape
			 *  @returns {string} escaped string
			 *  @memberof DataTable#oApi
			 */
			var _fnEscapeRegex = DataTable.util.escapeRegex;

			var __filter_div = $('<div>')[0];
			var __filter_div_textContent = __filter_div.textContent !== undefined;

			// Update the filtering data for each row if needed (by invalidation or first run)
			function _fnFilterData(settings) {
				var columns = settings.aoColumns;
				var column;
				var i, j, ien, jen, filterData, cellData, row;
				var fomatters = DataTable.ext.type.search;
				var wasInvalidated = false;

				for (i = 0, ien = settings.aoData.length; i < ien; i++) {
					row = settings.aoData[i];

					if (!row._aFilterData) {
						filterData = [];

						for (j = 0, jen = columns.length; j < jen; j++) {
							column = columns[j];

							if (column.bSearchable) {
								cellData = _fnGetCellData(settings, i, j, 'filter');

								if (fomatters[column.sType]) {
									cellData = fomatters[column.sType](cellData);
								}

								// Search in DataTables 1.10 is string based. In 1.11 this
								// should be altered to also allow strict type checking.
								if (cellData === null) {
									cellData = '';
								}

								if (typeof cellData !== 'string' && cellData.toString) {
									cellData = cellData.toString();
								}
							} else {
								cellData = '';
							}

							// If it looks like there is an HTML entity in the string,
							// attempt to decode it so sorting works as expected. Note that
							// we could use a single line of jQuery to do this, but the DOM
							// method used here is much faster http://jsperf.com/html-decode
							if (cellData.indexOf && cellData.indexOf('&') !== -1) {
								__filter_div.innerHTML = cellData;
								cellData = __filter_div_textContent ?
									__filter_div.textContent :
									__filter_div.innerText;
							}

							if (cellData.replace) {
								cellData = cellData.replace(/[\r\n]/g, '');
							}

							filterData.push(cellData);
						}

						row._aFilterData = filterData;
						row._sFilterRow = filterData.join('  ');
						wasInvalidated = true;
					}
				}

				return wasInvalidated;
			}


			/**
			 * Convert from the internal Hungarian notation to camelCase for external
			 * interaction
			 *  @param {object} obj Object to convert
			 *  @returns {object} Inverted object
			 *  @memberof DataTable#oApi
			 */
			function _fnSearchToCamel(obj) {
				return {
					search: obj.sSearch,
					smart: obj.bSmart,
					regex: obj.bRegex,
					caseInsensitive: obj.bCaseInsensitive
				};
			}



			/**
			 * Convert from camelCase notation to the internal Hungarian. We could use the
			 * Hungarian convert function here, but this is cleaner
			 *  @param {object} obj Object to convert
			 *  @returns {object} Inverted object
			 *  @memberof DataTable#oApi
			 */
			function _fnSearchToHung(obj) {
				return {
					sSearch: obj.search,
					bSmart: obj.smart,
					bRegex: obj.regex,
					bCaseInsensitive: obj.caseInsensitive
				};
			}

			/**
			 * Generate the node required for the info display
			 *  @param {object} oSettings dataTables settings object
			 *  @returns {node} Information element
			 *  @memberof DataTable#oApi
			 */
			function _fnFeatureHtmlInfo(settings) {
				var
					tid = settings.sTableId,
					nodes = settings.aanFeatures.i,
					n = $('<div/>', {
						'class': settings.oClasses.sInfo,
						'id': !nodes ? tid + '_info' : null
					});

				if (!nodes) {
					// Update display on each draw
					settings.aoDrawCallback.push({
						"fn": _fnUpdateInfo,
						"sName": "information"
					});

					n
						.attr('role', 'status')
						.attr('aria-live', 'polite');

					// Table is described by our info div
					$(settings.nTable).attr('aria-describedby', tid + '_info');
				}

				return n[0];
			}


			/**
			 * Update the information elements in the display
			 *  @param {object} settings dataTables settings object
			 *  @memberof DataTable#oApi
			 */
			function _fnUpdateInfo(settings) {
				/* Show information about the table */
				var nodes = settings.aanFeatures.i;
				if (nodes.length === 0) {
					return;
				}

				var
					lang = settings.oLanguage,
					start = settings._iDisplayStart + 1,
					end = settings.fnDisplayEnd(),
					max = settings.fnRecordsTotal(),
					total = settings.fnRecordsDisplay(),
					out = total ?
					lang.sInfo :
					lang.sInfoEmpty;

				if (total !== max) {
					/* Record set after filtering */
					out += ' ' + lang.sInfoFiltered;
				}

				// Convert the macros
				out += lang.sInfoPostFix;
				out = _fnInfoMacros(settings, out);

				var callback = lang.fnInfoCallback;
				if (callback !== null) {
					out = callback.call(settings.oInstance,
						settings, start, end, max, total, out
					);
				}

				$(nodes).html(out);
			}


			function _fnInfoMacros(settings, str) {
				// When infinite scrolling, we are always starting at 1. _iDisplayStart is used only
				// internally
				var
					formatter = settings.fnFormatNumber,
					start = settings._iDisplayStart + 1,
					len = settings._iDisplayLength,
					vis = settings.fnRecordsDisplay(),
					all = len === -1;

				return str.
				replace(/_START_/g, formatter.call(settings, start)).
				replace(/_END_/g, formatter.call(settings, settings.fnDisplayEnd())).
				replace(/_MAX_/g, formatter.call(settings, settings.fnRecordsTotal())).
				replace(/_TOTAL_/g, formatter.call(settings, vis)).
				replace(/_PAGE_/g, formatter.call(settings, all ? 1 : Math.ceil(start / len))).
				replace(/_PAGES_/g, formatter.call(settings, all ? 1 : Math.ceil(vis / len)));
			}



			/**
			 * Draw the table for the first time, adding all required features
			 *  @param {object} settings dataTables settings object
			 *  @memberof DataTable#oApi
			 */
			function _fnInitialise(settings) {
				var i, iLen, iAjaxStart = settings.iInitDisplayStart;
				var columns = settings.aoColumns,
					column;
				var features = settings.oFeatures;
				var deferLoading = settings.bDeferLoading; // value modified by the draw

				/* Ensure that the table data is fully initialised */
				if (!settings.bInitialised) {
					setTimeout(function () {
						_fnInitialise(settings);
					}, 200);
					return;
				}

				/* Show the display HTML options */
				_fnAddOptionsHtml(settings);

				/* Build and draw the header / footer for the table */
				_fnBuildHead(settings);
				_fnDrawHead(settings, settings.aoHeader);
				_fnDrawHead(settings, settings.aoFooter);

				/* Okay to show that something is going on now */
				_fnProcessingDisplay(settings, true);

				/* Calculate sizes for columns */
				if (features.bAutoWidth) {
					_fnCalculateColumnWidths(settings);
				}

				for (i = 0, iLen = columns.length; i < iLen; i++) {
					column = columns[i];

					if (column.sWidth) {
						column.nTh.style.width = _fnStringToCss(column.sWidth);
					}
				}

				_fnCallbackFire(settings, null, 'preInit', [settings]);

				// If there is default sorting required - let's do it. The sort function
				// will do the drawing for us. Otherwise we draw the table regardless of the
				// Ajax source - this allows the table to look initialised for Ajax sourcing
				// data (show 'loading' message possibly)
				_fnReDraw(settings);

				// Server-side processing init complete is done by _fnAjaxUpdateDraw
				var dataSrc = _fnDataSource(settings);
				if (dataSrc != 'ssp' || deferLoading) {
					// if there is an ajax source load the data
					if (dataSrc == 'ajax') {
						_fnBuildAjax(settings, [], function (json) {
							var aData = _fnAjaxDataSrc(settings, json);

							// Got the data - add it to the table
							for (i = 0; i < aData.length; i++) {
								_fnAddData(settings, aData[i]);
							}

							// Reset the init display for cookie saving. We've already done
							// a filter, and therefore cleared it before. So we need to make
							// it appear 'fresh'
							settings.iInitDisplayStart = iAjaxStart;

							_fnReDraw(settings);

							_fnProcessingDisplay(settings, false);
							_fnInitComplete(settings, json);
						}, settings);
					} else {
						_fnProcessingDisplay(settings, false);
						_fnInitComplete(settings);
					}
				}
			}


			/**
			 * Draw the table for the first time, adding all required features
			 *  @param {object} oSettings dataTables settings object
			 *  @param {object} [json] JSON from the server that completed the table, if using Ajax source
			 *    with client-side processing (optional)
			 *  @memberof DataTable#oApi
			 */
			function _fnInitComplete(settings, json) {
				settings._bInitComplete = true;

				// When data was added after the initialisation (data or Ajax) we need to
				// calculate the column sizing
				if (json || settings.oInit.aaData) {
					_fnAdjustColumnSizing(settings);
				}

				_fnCallbackFire(settings, null, 'plugin-init', [settings, json]);
				_fnCallbackFire(settings, 'aoInitComplete', 'init', [settings, json]);
			}


			function _fnLengthChange(settings, val) {
				var len = parseInt(val, 10);
				settings._iDisplayLength = len;

				_fnLengthOverflow(settings);

				// Fire length change event
				_fnCallbackFire(settings, null, 'length', [settings, len]);
			}


			/**
			 * Generate the node required for user display length changing
			 *  @param {object} settings dataTables settings object
			 *  @returns {node} Display length feature node
			 *  @memberof DataTable#oApi
			 */
			function _fnFeatureHtmlLength(settings) {
				var
					classes = settings.oClasses,
					tableId = settings.sTableId,
					menu = settings.aLengthMenu,
					d2 = $.isArray(menu[0]),
					lengths = d2 ? menu[0] : menu,
					language = d2 ? menu[1] : menu;

				var select = $('<select/>', {
					'name': tableId + '_length',
					'aria-controls': tableId,
					'class': classes.sLengthSelect
				});

				for (var i = 0, ien = lengths.length; i < ien; i++) {
					select[0][i] = new Option(
						typeof language[i] === 'number' ?
						settings.fnFormatNumber(language[i]) :
						language[i],
						lengths[i]
					);
				}

				var div = $('<div><label/></div>').addClass(classes.sLength);
				if (!settings.aanFeatures.l) {
					div[0].id = tableId + '_length';
				}

				div.children().append(
					settings.oLanguage.sLengthMenu.replace('_MENU_', select[0].outerHTML)
				);

				// Can't use `select` variable as user might provide their own and the
				// reference is broken by the use of outerHTML
				$('select', div)
					.val(settings._iDisplayLength)
					.on('change.DT', function (e) {
						_fnLengthChange(settings, $(this).val());
						_fnDraw(settings);
					});

				// Update node value whenever anything changes the table's length
				$(settings.nTable).on('length.dt.DT', function (e, s, len) {
					if (settings === s) {
						$('select', div).val(len);
					}
				});

				return div[0];
			}



			/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
			 * Note that most of the paging logic is done in
			 * DataTable.ext.pager
			 */

			/**
			 * Generate the node required for default pagination
			 *  @param {object} oSettings dataTables settings object
			 *  @returns {node} Pagination feature node
			 *  @memberof DataTable#oApi
			 */
			function _fnFeatureHtmlPaginate(settings) {
				var
					type = settings.sPaginationType,
					plugin = DataTable.ext.pager[type],
					modern = typeof plugin === 'function',
					redraw = function (settings) {
						_fnDraw(settings);
					},
					node = $('<div/>').addClass(settings.oClasses.sPaging + type)[0],
					features = settings.aanFeatures;

				if (!modern) {
					plugin.fnInit(settings, node, redraw);
				}

				/* Add a draw callback for the pagination on first instance, to update the paging display */
				if (!features.p) {
					node.id = settings.sTableId + '_paginate';

					settings.aoDrawCallback.push({
						"fn": function (settings) {
							if (modern) {
								var
									start = settings._iDisplayStart,
									len = settings._iDisplayLength,
									visRecords = settings.fnRecordsDisplay(),
									all = len === -1,
									page = all ? 0 : Math.ceil(start / len),
									pages = all ? 1 : Math.ceil(visRecords / len),
									buttons = plugin(page, pages),
									i, ien;

								for (i = 0, ien = features.p.length; i < ien; i++) {
									_fnRenderer(settings, 'pageButton')(
										settings, features.p[i], i, buttons, page, pages
									);
								}
							} else {
								plugin.fnUpdate(settings, redraw);
							}
						},
						"sName": "pagination"
					});
				}

				return node;
			}


			/**
			 * Alter the display settings to change the page
			 *  @param {object} settings DataTables settings object
			 *  @param {string|int} action Paging action to take: "first", "previous",
			 *    "next" or "last" or page number to jump to (integer)
			 *  @param [bool] redraw Automatically draw the update or not
			 *  @returns {bool} true page has changed, false - no change
			 *  @memberof DataTable#oApi
			 */
			function _fnPageChange(settings, action, redraw) {
				var
					start = settings._iDisplayStart,
					len = settings._iDisplayLength,
					records = settings.fnRecordsDisplay();

				if (records === 0 || len === -1) {
					start = 0;
				} else if (typeof action === "number") {
					start = action * len;

					if (start > records) {
						start = 0;
					}
				} else if (action == "first") {
					start = 0;
				} else if (action == "previous") {
					start = len >= 0 ?
						start - len :
						0;

					if (start < 0) {
						start = 0;
					}
				} else if (action == "next") {
					if (start + len < records) {
						start += len;
					}
				} else if (action == "last") {
					start = Math.floor((records - 1) / len) * len;
				} else {
					_fnLog(settings, 0, "Unknown paging action: " + action, 5);
				}

				var changed = settings._iDisplayStart !== start;
				settings._iDisplayStart = start;

				if (changed) {
					_fnCallbackFire(settings, null, 'page', [settings]);

					if (redraw) {
						_fnDraw(settings);
					}
				}

				return changed;
			}



			/**
			 * Generate the node required for the processing node
			 *  @param {object} settings dataTables settings object
			 *  @returns {node} Processing element
			 *  @memberof DataTable#oApi
			 */
			function _fnFeatureHtmlProcessing(settings) {
				return $('<div/>', {
						'id': !settings.aanFeatures.r ? settings.sTableId + '_processing' : null,
						'class': settings.oClasses.sProcessing
					})
					.html(settings.oLanguage.sProcessing)
					.insertBefore(settings.nTable)[0];
			}


			/**
			 * Display or hide the processing indicator
			 *  @param {object} settings dataTables settings object
			 *  @param {bool} show Show the processing indicator (true) or not (false)
			 *  @memberof DataTable#oApi
			 */
			function _fnProcessingDisplay(settings, show) {
				if (settings.oFeatures.bProcessing) {
					$(settings.aanFeatures.r).css('display', show ? 'block' : 'none');
				}

				_fnCallbackFire(settings, null, 'processing', [settings, show]);
			}

			/**
			 * Add any control elements for the table - specifically scrolling
			 *  @param {object} settings dataTables settings object
			 *  @returns {node} Node to add to the DOM
			 *  @memberof DataTable#oApi
			 */
			function _fnFeatureHtmlTable(settings) {
				var table = $(settings.nTable);

				// Add the ARIA grid role to the table
				table.attr('role', 'grid');

				// Scrolling from here on in
				var scroll = settings.oScroll;

				if (scroll.sX === '' && scroll.sY === '') {
					return settings.nTable;
				}

				var scrollX = scroll.sX;
				var scrollY = scroll.sY;
				var classes = settings.oClasses;
				var caption = table.children('caption');
				var captionSide = caption.length ? caption[0]._captionSide : null;
				var headerClone = $(table[0].cloneNode(false));
				var footerClone = $(table[0].cloneNode(false));
				var footer = table.children('tfoot');
				var _div = '<div/>';
				var size = function (s) {
					return !s ? null : _fnStringToCss(s);
				};

				if (!footer.length) {
					footer = null;
				}

				/*
				 * The HTML structure that we want to generate in this function is:
				 *  div - scroller
				 *    div - scroll head
				 *      div - scroll head inner
				 *        table - scroll head table
				 *          thead - thead
				 *    div - scroll body
				 *      table - table (master table)
				 *        thead - thead clone for sizing
				 *        tbody - tbody
				 *    div - scroll foot
				 *      div - scroll foot inner
				 *        table - scroll foot table
				 *          tfoot - tfoot
				 */
				var scroller = $(_div, {
						'class': classes.sScrollWrapper
					})
					.append(
						$(_div, {
							'class': classes.sScrollHead
						})
						.css({
							overflow: 'hidden',
							position: 'relative',
							border: 0,
							width: scrollX ? size(scrollX) : '100%'
						})
						.append(
							$(_div, {
								'class': classes.sScrollHeadInner
							})
							.css({
								'box-sizing': 'content-box',
								width: scroll.sXInner || '100%'
							})
							.append(
								headerClone
								.removeAttr('id')
								.css('margin-left', 0)
								.append(captionSide === 'top' ? caption : null)
								.append(
									table.children('thead')
								)
							)
						)
					)
					.append(
						$(_div, {
							'class': classes.sScrollBody
						})
						.css({
							position: 'relative',
							overflow: 'auto',
							width: size(scrollX)
						})
						.append(table)
					);

				if (footer) {
					scroller.append(
						$(_div, {
							'class': classes.sScrollFoot
						})
						.css({
							overflow: 'hidden',
							border: 0,
							width: scrollX ? size(scrollX) : '100%'
						})
						.append(
							$(_div, {
								'class': classes.sScrollFootInner
							})
							.append(
								footerClone
								.removeAttr('id')
								.css('margin-left', 0)
								.append(captionSide === 'bottom' ? caption : null)
								.append(
									table.children('tfoot')
								)
							)
						)
					);
				}

				var children = scroller.children();
				var scrollHead = children[0];
				var scrollBody = children[1];
				var scrollFoot = footer ? children[2] : null;

				// When the body is scrolled, then we also want to scroll the headers
				if (scrollX) {
					$(scrollBody).on('scroll.DT', function (e) {
						var scrollLeft = this.scrollLeft;

						scrollHead.scrollLeft = scrollLeft;

						if (footer) {
							scrollFoot.scrollLeft = scrollLeft;
						}
					});
				}

				$(scrollBody).css(
					scrollY && scroll.bCollapse ? 'max-height' : 'height',
					scrollY
				);

				settings.nScrollHead = scrollHead;
				settings.nScrollBody = scrollBody;
				settings.nScrollFoot = scrollFoot;

				// On redraw - align columns
				settings.aoDrawCallback.push({
					"fn": _fnScrollDraw,
					"sName": "scrolling"
				});

				return scroller[0];
			}



			/**
			 * Update the header, footer and body tables for resizing - i.e. column
			 * alignment.
			 *
			 * Welcome to the most horrible function DataTables. The process that this
			 * function follows is basically:
			 *   1. Re-create the table inside the scrolling div
			 *   2. Take live measurements from the DOM
			 *   3. Apply the measurements to align the columns
			 *   4. Clean up
			 *
			 *  @param {object} settings dataTables settings object
			 *  @memberof DataTable#oApi
			 */
			function _fnScrollDraw(settings) {
				// Given that this is such a monster function, a lot of variables are use
				// to try and keep the minimised size as small as possible
				var
					scroll = settings.oScroll,
					scrollX = scroll.sX,
					scrollXInner = scroll.sXInner,
					scrollY = scroll.sY,
					barWidth = scroll.iBarWidth,
					divHeader = $(settings.nScrollHead),
					divHeaderStyle = divHeader[0].style,
					divHeaderInner = divHeader.children('div'),
					divHeaderInnerStyle = divHeaderInner[0].style,
					divHeaderTable = divHeaderInner.children('table'),
					divBodyEl = settings.nScrollBody,
					divBody = $(divBodyEl),
					divBodyStyle = divBodyEl.style,
					divFooter = $(settings.nScrollFoot),
					divFooterInner = divFooter.children('div'),
					divFooterTable = divFooterInner.children('table'),
					header = $(settings.nTHead),
					table = $(settings.nTable),
					tableEl = table[0],
					tableStyle = tableEl.style,
					footer = settings.nTFoot ? $(settings.nTFoot) : null,
					browser = settings.oBrowser,
					ie67 = browser.bScrollOversize,
					dtHeaderCells = _pluck(settings.aoColumns, 'nTh'),
					headerTrgEls, footerTrgEls,
					headerSrcEls, footerSrcEls,
					headerCopy, footerCopy,
					headerWidths = [],
					footerWidths = [],
					headerContent = [],
					footerContent = [],
					idx, correction, sanityWidth,
					zeroOut = function (nSizer) {
						var style = nSizer.style;
						style.paddingTop = "0";
						style.paddingBottom = "0";
						style.borderTopWidth = "0";
						style.borderBottomWidth = "0";
						style.height = 0;
					};

				// If the scrollbar visibility has changed from the last draw, we need to
				// adjust the column sizes as the table width will have changed to account
				// for the scrollbar
				var scrollBarVis = divBodyEl.scrollHeight > divBodyEl.clientHeight;

				if (settings.scrollBarVis !== scrollBarVis && settings.scrollBarVis !== undefined) {
					settings.scrollBarVis = scrollBarVis;
					_fnAdjustColumnSizing(settings);
					return; // adjust column sizing will call this function again
				} else {
					settings.scrollBarVis = scrollBarVis;
				}

				/*
				 * 1. Re-create the table inside the scrolling div
				 */

				// Remove the old minimised thead and tfoot elements in the inner table
				table.children('thead, tfoot').remove();

				if (footer) {
					footerCopy = footer.clone().prependTo(table);
					footerTrgEls = footer.find('tr'); // the original tfoot is in its own table and must be sized
					footerSrcEls = footerCopy.find('tr');
				}

				// Clone the current header and footer elements and then place it into the inner table
				headerCopy = header.clone().prependTo(table);
				headerTrgEls = header.find('tr'); // original header is in its own table
				headerSrcEls = headerCopy.find('tr');
				headerCopy.find('th, td').removeAttr('tabindex');


				/*
				 * 2. Take live measurements from the DOM - do not alter the DOM itself!
				 */

				// Remove old sizing and apply the calculated column widths
				// Get the unique column headers in the newly created (cloned) header. We want to apply the
				// calculated sizes to this header
				if (!scrollX) {
					divBodyStyle.width = '100%';
					divHeader[0].style.width = '100%';
				}

				$.each(_fnGetUniqueThs(settings, headerCopy), function (i, el) {
					idx = _fnVisibleToColumnIndex(settings, i);
					el.style.width = settings.aoColumns[idx].sWidth;
				});

				if (footer) {
					_fnApplyToChildren(function (n) {
						n.style.width = "";
					}, footerSrcEls);
				}

				// Size the table as a whole
				sanityWidth = table.outerWidth();
				if (scrollX === "") {
					// No x scrolling
					tableStyle.width = "100%";

					// IE7 will make the width of the table when 100% include the scrollbar
					// - which is shouldn't. When there is a scrollbar we need to take this
					// into account.
					if (ie67 && (table.find('tbody').height() > divBodyEl.offsetHeight ||
							divBody.css('overflow-y') == "scroll")) {
						tableStyle.width = _fnStringToCss(table.outerWidth() - barWidth);
					}

					// Recalculate the sanity width
					sanityWidth = table.outerWidth();
				} else if (scrollXInner !== "") {
					// legacy x scroll inner has been given - use it
					tableStyle.width = _fnStringToCss(scrollXInner);

					// Recalculate the sanity width
					sanityWidth = table.outerWidth();
				}

				// Hidden header should have zero height, so remove padding and borders. Then
				// set the width based on the real headers

				// Apply all styles in one pass
				_fnApplyToChildren(zeroOut, headerSrcEls);

				// Read all widths in next pass
				_fnApplyToChildren(function (nSizer) {
					headerContent.push(nSizer.innerHTML);
					headerWidths.push(_fnStringToCss($(nSizer).css('width')));
				}, headerSrcEls);

				// Apply all widths in final pass
				_fnApplyToChildren(function (nToSize, i) {
					// Only apply widths to the DataTables detected header cells - this
					// prevents complex headers from having contradictory sizes applied
					if ($.inArray(nToSize, dtHeaderCells) !== -1) {
						nToSize.style.width = headerWidths[i];
					}
				}, headerTrgEls);

				$(headerSrcEls).height(0);

				/* Same again with the footer if we have one */
				if (footer) {
					_fnApplyToChildren(zeroOut, footerSrcEls);

					_fnApplyToChildren(function (nSizer) {
						footerContent.push(nSizer.innerHTML);
						footerWidths.push(_fnStringToCss($(nSizer).css('width')));
					}, footerSrcEls);

					_fnApplyToChildren(function (nToSize, i) {
						nToSize.style.width = footerWidths[i];
					}, footerTrgEls);

					$(footerSrcEls).height(0);
				}


				/*
				 * 3. Apply the measurements
				 */

				// "Hide" the header and footer that we used for the sizing. We need to keep
				// the content of the cell so that the width applied to the header and body
				// both match, but we want to hide it completely. We want to also fix their
				// width to what they currently are
				_fnApplyToChildren(function (nSizer, i) {
					nSizer.innerHTML = '<div class="dataTables_sizing">' + headerContent[i] + '</div>';
					nSizer.childNodes[0].style.height = "0";
					nSizer.childNodes[0].style.overflow = "hidden";
					nSizer.style.width = headerWidths[i];
				}, headerSrcEls);

				if (footer) {
					_fnApplyToChildren(function (nSizer, i) {
						nSizer.innerHTML = '<div class="dataTables_sizing">' + footerContent[i] + '</div>';
						nSizer.childNodes[0].style.height = "0";
						nSizer.childNodes[0].style.overflow = "hidden";
						nSizer.style.width = footerWidths[i];
					}, footerSrcEls);
				}

				// Sanity check that the table is of a sensible width. If not then we are going to get
				// misalignment - try to prevent this by not allowing the table to shrink below its min width
				if (table.outerWidth() < sanityWidth) {
					// The min width depends upon if we have a vertical scrollbar visible or not */
					correction = ((divBodyEl.scrollHeight > divBodyEl.offsetHeight ||
							divBody.css('overflow-y') == "scroll")) ?
						sanityWidth + barWidth :
						sanityWidth;

					// IE6/7 are a law unto themselves...
					if (ie67 && (divBodyEl.scrollHeight >
							divBodyEl.offsetHeight || divBody.css('overflow-y') == "scroll")) {
						tableStyle.width = _fnStringToCss(correction - barWidth);
					}

					// And give the user a warning that we've stopped the table getting too small
					if (scrollX === "" || scrollXInner !== "") {
						_fnLog(settings, 1, 'Possible column misalignment', 6);
					}
				} else {
					correction = '100%';
				}

				// Apply to the container elements
				divBodyStyle.width = _fnStringToCss(correction);
				divHeaderStyle.width = _fnStringToCss(correction);

				if (footer) {
					settings.nScrollFoot.style.width = _fnStringToCss(correction);
				}


				/*
				 * 4. Clean up
				 */
				if (!scrollY) {
					/* IE7< puts a vertical scrollbar in place (when it shouldn't be) due to subtracting
					 * the scrollbar height from the visible display, rather than adding it on. We need to
					 * set the height in order to sort this. Don't want to do it in any other browsers.
					 */
					if (ie67) {
						divBodyStyle.height = _fnStringToCss(tableEl.offsetHeight + barWidth);
					}
				}

				/* Finally set the width's of the header and footer tables */
				var iOuterWidth = table.outerWidth();
				divHeaderTable[0].style.width = _fnStringToCss(iOuterWidth);
				divHeaderInnerStyle.width = _fnStringToCss(iOuterWidth);

				// Figure out if there are scrollbar present - if so then we need a the header and footer to
				// provide a bit more space to allow "overflow" scrolling (i.e. past the scrollbar)
				var bScrolling = table.height() > divBodyEl.clientHeight || divBody.css('overflow-y') == "scroll";
				var padding = 'padding' + (browser.bScrollbarLeft ? 'Left' : 'Right');
				divHeaderInnerStyle[padding] = bScrolling ? barWidth + "px" : "0px";

				if (footer) {
					divFooterTable[0].style.width = _fnStringToCss(iOuterWidth);
					divFooterInner[0].style.width = _fnStringToCss(iOuterWidth);
					divFooterInner[0].style[padding] = bScrolling ? barWidth + "px" : "0px";
				}

				// Correct DOM ordering for colgroup - comes before the thead
				table.children('colgroup').insertBefore(table.children('thead'));

				/* Adjust the position of the header in case we loose the y-scrollbar */
				divBody.scroll();

				// If sorting or filtering has occurred, jump the scrolling back to the top
				// only if we aren't holding the position
				if ((settings.bSorted || settings.bFiltered) && !settings._drawHold) {
					divBodyEl.scrollTop = 0;
				}
			}



			/**
			 * Apply a given function to the display child nodes of an element array (typically
			 * TD children of TR rows
			 *  @param {function} fn Method to apply to the objects
			 *  @param array {nodes} an1 List of elements to look through for display children
			 *  @param array {nodes} an2 Another list (identical structure to the first) - optional
			 *  @memberof DataTable#oApi
			 */
			function _fnApplyToChildren(fn, an1, an2) {
				var index = 0,
					i = 0,
					iLen = an1.length;
				var nNode1, nNode2;

				while (i < iLen) {
					nNode1 = an1[i].firstChild;
					nNode2 = an2 ? an2[i].firstChild : null;

					while (nNode1) {
						if (nNode1.nodeType === 1) {
							if (an2) {
								fn(nNode1, nNode2, index);
							} else {
								fn(nNode1, index);
							}

							index++;
						}

						nNode1 = nNode1.nextSibling;
						nNode2 = an2 ? nNode2.nextSibling : null;
					}

					i++;
				}
			}



			var __re_html_remove = /<.*?>/g;


			/**
			 * Calculate the width of columns for the table
			 *  @param {object} oSettings dataTables settings object
			 *  @memberof DataTable#oApi
			 */
			function _fnCalculateColumnWidths(oSettings) {
				var
					table = oSettings.nTable,
					columns = oSettings.aoColumns,
					scroll = oSettings.oScroll,
					scrollY = scroll.sY,
					scrollX = scroll.sX,
					scrollXInner = scroll.sXInner,
					columnCount = columns.length,
					visibleColumns = _fnGetColumns(oSettings, 'bVisible'),
					headerCells = $('th', oSettings.nTHead),
					tableWidthAttr = table.getAttribute('width'), // from DOM element
					tableContainer = table.parentNode,
					userInputs = false,
					i, column, columnIdx, width, outerWidth,
					browser = oSettings.oBrowser,
					ie67 = browser.bScrollOversize;

				var styleWidth = table.style.width;
				if (styleWidth && styleWidth.indexOf('%') !== -1) {
					tableWidthAttr = styleWidth;
				}

				/* Convert any user input sizes into pixel sizes */
				for (i = 0; i < visibleColumns.length; i++) {
					column = columns[visibleColumns[i]];

					if (column.sWidth !== null) {
						column.sWidth = _fnConvertToWidth(column.sWidthOrig, tableContainer);

						userInputs = true;
					}
				}

				/* If the number of columns in the DOM equals the number that we have to
				 * process in DataTables, then we can use the offsets that are created by
				 * the web- browser. No custom sizes can be set in order for this to happen,
				 * nor scrolling used
				 */
				if (ie67 || !userInputs && !scrollX && !scrollY &&
					columnCount == _fnVisbleColumns(oSettings) &&
					columnCount == headerCells.length
				) {
					for (i = 0; i < columnCount; i++) {
						var colIdx = _fnVisibleToColumnIndex(oSettings, i);

						if (colIdx !== null) {
							columns[colIdx].sWidth = _fnStringToCss(headerCells.eq(i).width());
						}
					}
				} else {
					// Otherwise construct a single row, worst case, table with the widest
					// node in the data, assign any user defined widths, then insert it into
					// the DOM and allow the browser to do all the hard work of calculating
					// table widths
					var tmpTable = $(table).clone() // don't use cloneNode - IE8 will remove events on the main table
						.css('visibility', 'hidden')
						.removeAttr('id');

					// Clean up the table body
					tmpTable.find('tbody tr').remove();
					var tr = $('<tr/>').appendTo(tmpTable.find('tbody'));

					// Clone the table header and footer - we can't use the header / footer
					// from the cloned table, since if scrolling is active, the table's
					// real header and footer are contained in different table tags
					tmpTable.find('thead, tfoot').remove();
					tmpTable
						.append($(oSettings.nTHead).clone())
						.append($(oSettings.nTFoot).clone());

					// Remove any assigned widths from the footer (from scrolling)
					tmpTable.find('tfoot th, tfoot td').css('width', '');

					// Apply custom sizing to the cloned header
					headerCells = _fnGetUniqueThs(oSettings, tmpTable.find('thead')[0]);

					for (i = 0; i < visibleColumns.length; i++) {
						column = columns[visibleColumns[i]];

						headerCells[i].style.width = column.sWidthOrig !== null && column.sWidthOrig !== '' ?
							_fnStringToCss(column.sWidthOrig) :
							'';

						// For scrollX we need to force the column width otherwise the
						// browser will collapse it. If this width is smaller than the
						// width the column requires, then it will have no effect
						if (column.sWidthOrig && scrollX) {
							$(headerCells[i]).append($('<div/>').css({
								width: column.sWidthOrig,
								margin: 0,
								padding: 0,
								border: 0,
								height: 1
							}));
						}
					}

					// Find the widest cell for each column and put it into the table
					if (oSettings.aoData.length) {
						for (i = 0; i < visibleColumns.length; i++) {
							columnIdx = visibleColumns[i];
							column = columns[columnIdx];

							$(_fnGetWidestNode(oSettings, columnIdx))
								.clone(false)
								.append(column.sContentPadding)
								.appendTo(tr);
						}
					}

					// Tidy the temporary table - remove name attributes so there aren't
					// duplicated in the dom (radio elements for example)
					$('[name]', tmpTable).removeAttr('name');

					// Table has been built, attach to the document so we can work with it.
					// A holding element is used, positioned at the top of the container
					// with minimal height, so it has no effect on if the container scrolls
					// or not. Otherwise it might trigger scrolling when it actually isn't
					// needed
					var holder = $('<div/>').css(scrollX || scrollY ? {
							position: 'absolute',
							top: 0,
							left: 0,
							height: 1,
							right: 0,
							overflow: 'hidden'
						} : {})
						.append(tmpTable)
						.appendTo(tableContainer);

					// When scrolling (X or Y) we want to set the width of the table as 
					// appropriate. However, when not scrolling leave the table width as it
					// is. This results in slightly different, but I think correct behaviour
					if (scrollX && scrollXInner) {
						tmpTable.width(scrollXInner);
					} else if (scrollX) {
						tmpTable.css('width', 'auto');
						tmpTable.removeAttr('width');

						// If there is no width attribute or style, then allow the table to
						// collapse
						if (tmpTable.width() < tableContainer.clientWidth && tableWidthAttr) {
							tmpTable.width(tableContainer.clientWidth);
						}
					} else if (scrollY) {
						tmpTable.width(tableContainer.clientWidth);
					} else if (tableWidthAttr) {
						tmpTable.width(tableWidthAttr);
					}

					// Get the width of each column in the constructed table - we need to
					// know the inner width (so it can be assigned to the other table's
					// cells) and the outer width so we can calculate the full width of the
					// table. This is safe since DataTables requires a unique cell for each
					// column, but if ever a header can span multiple columns, this will
					// need to be modified.
					var total = 0;
					for (i = 0; i < visibleColumns.length; i++) {
						var cell = $(headerCells[i]);
						var border = cell.outerWidth() - cell.width();

						// Use getBounding... where possible (not IE8-) because it can give
						// sub-pixel accuracy, which we then want to round up!
						var bounding = browser.bBounding ?
							Math.ceil(headerCells[i].getBoundingClientRect().width) :
							cell.outerWidth();

						// Total is tracked to remove any sub-pixel errors as the outerWidth
						// of the table might not equal the total given here (IE!).
						total += bounding;

						// Width for each column to use
						columns[visibleColumns[i]].sWidth = _fnStringToCss(bounding - border);
					}

					table.style.width = _fnStringToCss(total);

					// Finished with the table - ditch it
					holder.remove();
				}

				// If there is a width attr, we want to attach an event listener which
				// allows the table sizing to automatically adjust when the window is
				// resized. Use the width attr rather than CSS, since we can't know if the
				// CSS is a relative value or absolute - DOM read is always px.
				if (tableWidthAttr) {
					table.style.width = _fnStringToCss(tableWidthAttr);
				}

				if ((tableWidthAttr || scrollX) && !oSettings._reszEvt) {
					var bindResize = function () {
						$(window).on('resize.DT-' + oSettings.sInstance, _fnThrottle(function () {
							_fnAdjustColumnSizing(oSettings);
						}));
					};

					// IE6/7 will crash if we bind a resize event handler on page load.
					// To be removed in 1.11 which drops IE6/7 support
					if (ie67) {
						setTimeout(bindResize, 1000);
					} else {
						bindResize();
					}

					oSettings._reszEvt = true;
				}
			}


			/**
			 * Throttle the calls to a function. Arguments and context are maintained for
			 * the throttled function
			 *  @param {function} fn Function to be called
			 *  @param {int} [freq=200] call frequency in mS
			 *  @returns {function} wrapped function
			 *  @memberof DataTable#oApi
			 */
			var _fnThrottle = DataTable.util.throttle;


			/**
			 * Convert a CSS unit width to pixels (e.g. 2em)
			 *  @param {string} width width to be converted
			 *  @param {node} parent parent to get the with for (required for relative widths) - optional
			 *  @returns {int} width in pixels
			 *  @memberof DataTable#oApi
			 */
			function _fnConvertToWidth(width, parent) {
				if (!width) {
					return 0;
				}

				var n = $('<div/>')
					.css('width', _fnStringToCss(width))
					.appendTo(parent || document.body);

				var val = n[0].offsetWidth;
				n.remove();

				return val;
			}


			/**
			 * Get the widest node
			 *  @param {object} settings dataTables settings object
			 *  @param {int} colIdx column of interest
			 *  @returns {node} widest table node
			 *  @memberof DataTable#oApi
			 */
			function _fnGetWidestNode(settings, colIdx) {
				var idx = _fnGetMaxLenString(settings, colIdx);
				if (idx < 0) {
					return null;
				}

				var data = settings.aoData[idx];
				return !data.nTr ? // Might not have been created when deferred rendering
					$('<td/>').html(_fnGetCellData(settings, idx, colIdx, 'display'))[0] :
					data.anCells[colIdx];
			}


			/**
			 * Get the maximum strlen for each data column
			 *  @param {object} settings dataTables settings object
			 *  @param {int} colIdx column of interest
			 *  @returns {string} max string length for each column
			 *  @memberof DataTable#oApi
			 */
			function _fnGetMaxLenString(settings, colIdx) {
				var s, max = -1,
					maxIdx = -1;

				for (var i = 0, ien = settings.aoData.length; i < ien; i++) {
					s = _fnGetCellData(settings, i, colIdx, 'display') + '';
					s = s.replace(__re_html_remove, '');
					s = s.replace(/&nbsp;/g, ' ');

					if (s.length > max) {
						max = s.length;
						maxIdx = i;
					}
				}

				return maxIdx;
			}


			/**
			 * Append a CSS unit (only if required) to a string
			 *  @param {string} value to css-ify
			 *  @returns {string} value with css unit
			 *  @memberof DataTable#oApi
			 */
			function _fnStringToCss(s) {
				if (s === null) {
					return '0px';
				}

				if (typeof s == 'number') {
					return s < 0 ?
						'0px' :
						s + 'px';
				}

				// Check it has a unit character already
				return s.match(/\d$/) ?
					s + 'px' :
					s;
			}



			function _fnSortFlatten(settings) {
				var
					i, iLen, k, kLen,
					aSort = [],
					aiOrig = [],
					aoColumns = settings.aoColumns,
					aDataSort, iCol, sType, srcCol,
					fixed = settings.aaSortingFixed,
					fixedObj = $.isPlainObject(fixed),
					nestedSort = [],
					add = function (a) {
						if (a.length && !$.isArray(a[0])) {
							// 1D array
							nestedSort.push(a);
						} else {
							// 2D array
							$.merge(nestedSort, a);
						}
					};

				// Build the sort array, with pre-fix and post-fix options if they have been
				// specified
				if ($.isArray(fixed)) {
					add(fixed);
				}

				if (fixedObj && fixed.pre) {
					add(fixed.pre);
				}

				add(settings.aaSorting);

				if (fixedObj && fixed.post) {
					add(fixed.post);
				}

				for (i = 0; i < nestedSort.length; i++) {
					srcCol = nestedSort[i][0];
					aDataSort = aoColumns[srcCol].aDataSort;

					for (k = 0, kLen = aDataSort.length; k < kLen; k++) {
						iCol = aDataSort[k];
						sType = aoColumns[iCol].sType || 'string';

						if (nestedSort[i]._idx === undefined) {
							nestedSort[i]._idx = $.inArray(nestedSort[i][1], aoColumns[iCol].asSorting);
						}

						aSort.push({
							src: srcCol,
							col: iCol,
							dir: nestedSort[i][1],
							index: nestedSort[i]._idx,
							type: sType,
							formatter: DataTable.ext.type.order[sType + "-pre"]
						});
					}
				}

				return aSort;
			}

			/**
			 * Change the order of the table
			 *  @param {object} oSettings dataTables settings object
			 *  @memberof DataTable#oApi
			 *  @todo This really needs split up!
			 */
			function _fnSort(oSettings) {
				var
					i, ien, iLen, j, jLen, k, kLen,
					sDataType, nTh,
					aiOrig = [],
					oExtSort = DataTable.ext.type.order,
					aoData = oSettings.aoData,
					aoColumns = oSettings.aoColumns,
					aDataSort, data, iCol, sType, oSort,
					formatters = 0,
					sortCol,
					displayMaster = oSettings.aiDisplayMaster,
					aSort;

				// Resolve any column types that are unknown due to addition or invalidation
				// @todo Can this be moved into a 'data-ready' handler which is called when
				//   data is going to be used in the table?
				_fnColumnTypes(oSettings);

				aSort = _fnSortFlatten(oSettings);

				for (i = 0, ien = aSort.length; i < ien; i++) {
					sortCol = aSort[i];

					// Track if we can use the fast sort algorithm
					if (sortCol.formatter) {
						formatters++;
					}

					// Load the data needed for the sort, for each cell
					_fnSortData(oSettings, sortCol.col);
				}

				/* No sorting required if server-side or no sorting array */
				if (_fnDataSource(oSettings) != 'ssp' && aSort.length !== 0) {
					// Create a value - key array of the current row positions such that we can use their
					// current position during the sort, if values match, in order to perform stable sorting
					for (i = 0, iLen = displayMaster.length; i < iLen; i++) {
						aiOrig[displayMaster[i]] = i;
					}

					/* Do the sort - here we want multi-column sorting based on a given data source (column)
					 * and sorting function (from oSort) in a certain direction. It's reasonably complex to
					 * follow on it's own, but this is what we want (example two column sorting):
					 *  fnLocalSorting = function(a,b){
					 *    var iTest;
					 *    iTest = oSort['string-asc']('data11', 'data12');
					 *      if (iTest !== 0)
					 *        return iTest;
					 *    iTest = oSort['numeric-desc']('data21', 'data22');
					 *    if (iTest !== 0)
					 *      return iTest;
					 *    return oSort['numeric-asc']( aiOrig[a], aiOrig[b] );
					 *  }
					 * Basically we have a test for each sorting column, if the data in that column is equal,
					 * test the next column. If all columns match, then we use a numeric sort on the row
					 * positions in the original data array to provide a stable sort.
					 *
					 * Note - I know it seems excessive to have two sorting methods, but the first is around
					 * 15% faster, so the second is only maintained for backwards compatibility with sorting
					 * methods which do not have a pre-sort formatting function.
					 */
					if (formatters === aSort.length) {
						// All sort types have formatting functions
						displayMaster.sort(function (a, b) {
							var
								x, y, k, test, sort,
								len = aSort.length,
								dataA = aoData[a]._aSortData,
								dataB = aoData[b]._aSortData;

							for (k = 0; k < len; k++) {
								sort = aSort[k];

								x = dataA[sort.col];
								y = dataB[sort.col];

								test = x < y ? -1 : x > y ? 1 : 0;
								if (test !== 0) {
									return sort.dir === 'asc' ? test : -test;
								}
							}

							x = aiOrig[a];
							y = aiOrig[b];
							return x < y ? -1 : x > y ? 1 : 0;
						});
					} else {
						// Depreciated - remove in 1.11 (providing a plug-in option)
						// Not all sort types have formatting methods, so we have to call their sorting
						// methods.
						displayMaster.sort(function (a, b) {
							var
								x, y, k, l, test, sort, fn,
								len = aSort.length,
								dataA = aoData[a]._aSortData,
								dataB = aoData[b]._aSortData;

							for (k = 0; k < len; k++) {
								sort = aSort[k];

								x = dataA[sort.col];
								y = dataB[sort.col];

								fn = oExtSort[sort.type + "-" + sort.dir] || oExtSort["string-" + sort.dir];
								test = fn(x, y);
								if (test !== 0) {
									return test;
								}
							}

							x = aiOrig[a];
							y = aiOrig[b];
							return x < y ? -1 : x > y ? 1 : 0;
						});
					}
				}

				/* Tell the draw function that we have sorted the data */
				oSettings.bSorted = true;
			}


			function _fnSortAria(settings) {
				var label;
				var nextSort;
				var columns = settings.aoColumns;
				var aSort = _fnSortFlatten(settings);
				var oAria = settings.oLanguage.oAria;

				// ARIA attributes - need to loop all columns, to update all (removing old
				// attributes as needed)
				for (var i = 0, iLen = columns.length; i < iLen; i++) {
					var col = columns[i];
					var asSorting = col.asSorting;
					var sTitle = col.sTitle.replace(/<.*?>/g, "");
					var th = col.nTh;

					// IE7 is throwing an error when setting these properties with jQuery's
					// attr() and removeAttr() methods...
					th.removeAttribute('aria-sort');

					/* In ARIA only the first sorting column can be marked as sorting - no multi-sort option */
					if (col.bSortable) {
						if (aSort.length > 0 && aSort[0].col == i) {
							th.setAttribute('aria-sort', aSort[0].dir == "asc" ? "ascending" : "descending");
							nextSort = asSorting[aSort[0].index + 1] || asSorting[0];
						} else {
							nextSort = asSorting[0];
						}

						label = sTitle + (nextSort === "asc" ?
							oAria.sSortAscending :
							oAria.sSortDescending
						);
					} else {
						label = sTitle;
					}

					th.setAttribute('aria-label', label);
				}
			}


			/**
			 * Function to run on user sort request
			 *  @param {object} settings dataTables settings object
			 *  @param {node} attachTo node to attach the handler to
			 *  @param {int} colIdx column sorting index
			 *  @param {boolean} [append=false] Append the requested sort to the existing
			 *    sort if true (i.e. multi-column sort)
			 *  @param {function} [callback] callback function
			 *  @memberof DataTable#oApi
			 */
			function _fnSortListener(settings, colIdx, append, callback) {
				var col = settings.aoColumns[colIdx];
				var sorting = settings.aaSorting;
				var asSorting = col.asSorting;
				var nextSortIdx;
				var next = function (a, overflow) {
					var idx = a._idx;
					if (idx === undefined) {
						idx = $.inArray(a[1], asSorting);
					}

					return idx + 1 < asSorting.length ?
						idx + 1 :
						overflow ?
						null :
						0;
				};

				// Convert to 2D array if needed
				if (typeof sorting[0] === 'number') {
					sorting = settings.aaSorting = [sorting];
				}

				// If appending the sort then we are multi-column sorting
				if (append && settings.oFeatures.bSortMulti) {
					// Are we already doing some kind of sort on this column?
					var sortIdx = $.inArray(colIdx, _pluck(sorting, '0'));

					if (sortIdx !== -1) {
						// Yes, modify the sort
						nextSortIdx = next(sorting[sortIdx], true);

						if (nextSortIdx === null && sorting.length === 1) {
							nextSortIdx = 0; // can't remove sorting completely
						}

						if (nextSortIdx === null) {
							sorting.splice(sortIdx, 1);
						} else {
							sorting[sortIdx][1] = asSorting[nextSortIdx];
							sorting[sortIdx]._idx = nextSortIdx;
						}
					} else {
						// No sort on this column yet
						sorting.push([colIdx, asSorting[0], 0]);
						sorting[sorting.length - 1]._idx = 0;
					}
				} else if (sorting.length && sorting[0][0] == colIdx) {
					// Single column - already sorting on this column, modify the sort
					nextSortIdx = next(sorting[0]);

					sorting.length = 1;
					sorting[0][1] = asSorting[nextSortIdx];
					sorting[0]._idx = nextSortIdx;
				} else {
					// Single column - sort only on this column
					sorting.length = 0;
					sorting.push([colIdx, asSorting[0]]);
					sorting[0]._idx = 0;
				}

				// Run the sort by calling a full redraw
				_fnReDraw(settings);

				// callback used for async user interaction
				if (typeof callback == 'function') {
					callback(settings);
				}
			}


			/**
			 * Attach a sort handler (click) to a node
			 *  @param {object} settings dataTables settings object
			 *  @param {node} attachTo node to attach the handler to
			 *  @param {int} colIdx column sorting index
			 *  @param {function} [callback] callback function
			 *  @memberof DataTable#oApi
			 */
			function _fnSortAttachListener(settings, attachTo, colIdx, callback) {
				var col = settings.aoColumns[colIdx];

				_fnBindAction(attachTo, {}, function (e) {
					/* If the column is not sortable - don't to anything */
					if (col.bSortable === false) {
						return;
					}

					// If processing is enabled use a timeout to allow the processing
					// display to be shown - otherwise to it synchronously
					if (settings.oFeatures.bProcessing) {
						_fnProcessingDisplay(settings, true);

						setTimeout(function () {
							_fnSortListener(settings, colIdx, e.shiftKey, callback);

							// In server-side processing, the draw callback will remove the
							// processing display
							if (_fnDataSource(settings) !== 'ssp') {
								_fnProcessingDisplay(settings, false);
							}
						}, 0);
					} else {
						_fnSortListener(settings, colIdx, e.shiftKey, callback);
					}
				});
			}


			/**
			 * Set the sorting classes on table's body, Note: it is safe to call this function
			 * when bSort and bSortClasses are false
			 *  @param {object} oSettings dataTables settings object
			 *  @memberof DataTable#oApi
			 */
			function _fnSortingClasses(settings) {
				var oldSort = settings.aLastSort;
				var sortClass = settings.oClasses.sSortColumn;
				var sort = _fnSortFlatten(settings);
				var features = settings.oFeatures;
				var i, ien, colIdx;

				if (features.bSort && features.bSortClasses) {
					// Remove old sorting classes
					for (i = 0, ien = oldSort.length; i < ien; i++) {
						colIdx = oldSort[i].src;

						// Remove column sorting
						$(_pluck(settings.aoData, 'anCells', colIdx))
							.removeClass(sortClass + (i < 2 ? i + 1 : 3));
					}

					// Add new column sorting
					for (i = 0, ien = sort.length; i < ien; i++) {
						colIdx = sort[i].src;

						$(_pluck(settings.aoData, 'anCells', colIdx))
							.addClass(sortClass + (i < 2 ? i + 1 : 3));
					}
				}

				settings.aLastSort = sort;
			}


			// Get the data to sort a column, be it from cache, fresh (populating the
			// cache), or from a sort formatter
			function _fnSortData(settings, idx) {
				// Custom sorting function - provided by the sort data type
				var column = settings.aoColumns[idx];
				var customSort = DataTable.ext.order[column.sSortDataType];
				var customData;

				if (customSort) {
					customData = customSort.call(settings.oInstance, settings, idx,
						_fnColumnIndexToVisible(settings, idx)
					);
				}

				// Use / populate cache
				var row, cellData;
				var formatter = DataTable.ext.type.order[column.sType + "-pre"];

				for (var i = 0, ien = settings.aoData.length; i < ien; i++) {
					row = settings.aoData[i];

					if (!row._aSortData) {
						row._aSortData = [];
					}

					if (!row._aSortData[idx] || customSort) {
						cellData = customSort ?
							customData[i] : // If there was a custom sort function, use data from there
							_fnGetCellData(settings, i, idx, 'sort');

						row._aSortData[idx] = formatter ?
							formatter(cellData) :
							cellData;
					}
				}
			}



			/**
			 * Save the state of a table
			 *  @param {object} oSettings dataTables settings object
			 *  @memberof DataTable#oApi
			 */
			function _fnSaveState(settings) {
				if (!settings.oFeatures.bStateSave || settings.bDestroying) {
					return;
				}

				/* Store the interesting variables */
				var state = {
					time: +new Date(),
					start: settings._iDisplayStart,
					length: settings._iDisplayLength,
					order: $.extend(true, [], settings.aaSorting),
					search: _fnSearchToCamel(settings.oPreviousSearch),
					columns: $.map(settings.aoColumns, function (col, i) {
						return {
							visible: col.bVisible,
							search: _fnSearchToCamel(settings.aoPreSearchCols[i])
						};
					})
				};

				_fnCallbackFire(settings, "aoStateSaveParams", 'stateSaveParams', [settings, state]);

				settings.oSavedState = state;
				settings.fnStateSaveCallback.call(settings.oInstance, settings, state);
			}


			/**
			 * Attempt to load a saved table state
			 *  @param {object} oSettings dataTables settings object
			 *  @param {object} oInit DataTables init object so we can override settings
			 *  @param {function} callback Callback to execute when the state has been loaded
			 *  @memberof DataTable#oApi
			 */
			function _fnLoadState(settings, oInit, callback) {
				var i, ien;
				var columns = settings.aoColumns;
				var loaded = function (s) {
					if (!s || !s.time) {
						callback();
						return;
					}

					// Allow custom and plug-in manipulation functions to alter the saved data set and
					// cancelling of loading by returning false
					var abStateLoad = _fnCallbackFire(settings, 'aoStateLoadParams', 'stateLoadParams', [settings, s]);
					if ($.inArray(false, abStateLoad) !== -1) {
						callback();
						return;
					}

					// Reject old data
					var duration = settings.iStateDuration;
					if (duration > 0 && s.time < +new Date() - (duration * 1000)) {
						callback();
						return;
					}

					// Number of columns have changed - all bets are off, no restore of settings
					if (s.columns && columns.length !== s.columns.length) {
						callback();
						return;
					}

					// Store the saved state so it might be accessed at any time
					settings.oLoadedState = $.extend(true, {}, s);

					// Restore key features - todo - for 1.11 this needs to be done by
					// subscribed events
					if (s.start !== undefined) {
						settings._iDisplayStart = s.start;
						settings.iInitDisplayStart = s.start;
					}
					if (s.length !== undefined) {
						settings._iDisplayLength = s.length;
					}

					// Order
					if (s.order !== undefined) {
						settings.aaSorting = [];
						$.each(s.order, function (i, col) {
							settings.aaSorting.push(col[0] >= columns.length ? [0, col[1]] :
								col
							);
						});
					}

					// Search
					if (s.search !== undefined) {
						$.extend(settings.oPreviousSearch, _fnSearchToHung(s.search));
					}

					// Columns
					//
					if (s.columns) {
						for (i = 0, ien = s.columns.length; i < ien; i++) {
							var col = s.columns[i];

							// Visibility
							if (col.visible !== undefined) {
								columns[i].bVisible = col.visible;
							}

							// Search
							if (col.search !== undefined) {
								$.extend(settings.aoPreSearchCols[i], _fnSearchToHung(col.search));
							}
						}
					}

					_fnCallbackFire(settings, 'aoStateLoaded', 'stateLoaded', [settings, s]);
					callback();
				}

				if (!settings.oFeatures.bStateSave) {
					callback();
					return;
				}

				var state = settings.fnStateLoadCallback.call(settings.oInstance, settings, loaded);

				if (state !== undefined) {
					loaded(state);
				}
				// otherwise, wait for the loaded callback to be executed
			}


			/**
			 * Return the settings object for a particular table
			 *  @param {node} table table we are using as a dataTable
			 *  @returns {object} Settings object - or null if not found
			 *  @memberof DataTable#oApi
			 */
			function _fnSettingsFromNode(table) {
				var settings = DataTable.settings;
				var idx = $.inArray(table, _pluck(settings, 'nTable'));

				return idx !== -1 ?
					settings[idx] :
					null;
			}


			/**
			 * Log an error message
			 *  @param {object} settings dataTables settings object
			 *  @param {int} level log error messages, or display them to the user
			 *  @param {string} msg error message
			 *  @param {int} tn Technical note id to get more information about the error.
			 *  @memberof DataTable#oApi
			 */
			function _fnLog(settings, level, msg, tn) {
				msg = 'DataTables warning: ' +
					(settings ? 'table id=' + settings.sTableId + ' - ' : '') + msg;

				if (tn) {
					msg += '. For more information about this error, please see ' +
						'http://datatables.net/tn/' + tn;
				}

				if (!level) {
					// Backwards compatibility pre 1.10
					var ext = DataTable.ext;
					var type = ext.sErrMode || ext.errMode;

					if (settings) {
						_fnCallbackFire(settings, null, 'error', [settings, tn, msg]);
					}

					if (type == 'alert') {
						alert(msg);
					} else if (type == 'throw') {
						throw new Error(msg);
					} else if (typeof type == 'function') {
						type(settings, tn, msg);
					}
				} else if (window.console && console.log) {
					console.log(msg);
				}
			}


			/**
			 * See if a property is defined on one object, if so assign it to the other object
			 *  @param {object} ret target object
			 *  @param {object} src source object
			 *  @param {string} name property
			 *  @param {string} [mappedName] name to map too - optional, name used if not given
			 *  @memberof DataTable#oApi
			 */
			function _fnMap(ret, src, name, mappedName) {
				if ($.isArray(name)) {
					$.each(name, function (i, val) {
						if ($.isArray(val)) {
							_fnMap(ret, src, val[0], val[1]);
						} else {
							_fnMap(ret, src, val);
						}
					});

					return;
				}

				if (mappedName === undefined) {
					mappedName = name;
				}

				if (src[name] !== undefined) {
					ret[mappedName] = src[name];
				}
			}


			/**
			 * Extend objects - very similar to jQuery.extend, but deep copy objects, and
			 * shallow copy arrays. The reason we need to do this, is that we don't want to
			 * deep copy array init values (such as aaSorting) since the dev wouldn't be
			 * able to override them, but we do want to deep copy arrays.
			 *  @param {object} out Object to extend
			 *  @param {object} extender Object from which the properties will be applied to
			 *      out
			 *  @param {boolean} breakRefs If true, then arrays will be sliced to take an
			 *      independent copy with the exception of the `data` or `aaData` parameters
			 *      if they are present. This is so you can pass in a collection to
			 *      DataTables and have that used as your data source without breaking the
			 *      references
			 *  @returns {object} out Reference, just for convenience - out === the return.
			 *  @memberof DataTable#oApi
			 *  @todo This doesn't take account of arrays inside the deep copied objects.
			 */
			function _fnExtend(out, extender, breakRefs) {
				var val;

				for (var prop in extender) {
					if (extender.hasOwnProperty(prop)) {
						val = extender[prop];

						if ($.isPlainObject(val)) {
							if (!$.isPlainObject(out[prop])) {
								out[prop] = {};
							}
							$.extend(true, out[prop], val);
						} else if (breakRefs && prop !== 'data' && prop !== 'aaData' && $.isArray(val)) {
							out[prop] = val.slice();
						} else {
							out[prop] = val;
						}
					}
				}

				return out;
			}


			/**
			 * Bind an event handers to allow a click or return key to activate the callback.
			 * This is good for accessibility since a return on the keyboard will have the
			 * same effect as a click, if the element has focus.
			 *  @param {element} n Element to bind the action to
			 *  @param {object} oData Data object to pass to the triggered function
			 *  @param {function} fn Callback function for when the event is triggered
			 *  @memberof DataTable#oApi
			 */
			function _fnBindAction(n, oData, fn) {
				$(n)
					.on('click.DT', oData, function (e) {
						$(n).blur(); // Remove focus outline for mouse users
						fn(e);
					})
					.on('keypress.DT', oData, function (e) {
						if (e.which === 13) {
							e.preventDefault();
							fn(e);
						}
					})
					.on('selectstart.DT', function () {
						/* Take the brutal approach to cancelling text selection */
						return false;
					});
			}


			/**
			 * Register a callback function. Easily allows a callback function to be added to
			 * an array store of callback functions that can then all be called together.
			 *  @param {object} oSettings dataTables settings object
			 *  @param {string} sStore Name of the array storage for the callbacks in oSettings
			 *  @param {function} fn Function to be called back
			 *  @param {string} sName Identifying name for the callback (i.e. a label)
			 *  @memberof DataTable#oApi
			 */
			function _fnCallbackReg(oSettings, sStore, fn, sName) {
				if (fn) {
					oSettings[sStore].push({
						"fn": fn,
						"sName": sName
					});
				}
			}


			/**
			 * Fire callback functions and trigger events. Note that the loop over the
			 * callback array store is done backwards! Further note that you do not want to
			 * fire off triggers in time sensitive applications (for example cell creation)
			 * as its slow.
			 *  @param {object} settings dataTables settings object
			 *  @param {string} callbackArr Name of the array storage for the callbacks in
			 *      oSettings
			 *  @param {string} eventName Name of the jQuery custom event to trigger. If
			 *      null no trigger is fired
			 *  @param {array} args Array of arguments to pass to the callback function /
			 *      trigger
			 *  @memberof DataTable#oApi
			 */
			function _fnCallbackFire(settings, callbackArr, eventName, args) {
				var ret = [];

				if (callbackArr) {
					ret = $.map(settings[callbackArr].slice().reverse(), function (val, i) {
						return val.fn.apply(settings.oInstance, args);
					});
				}

				if (eventName !== null) {
					var e = $.Event(eventName + '.dt');

					$(settings.nTable).trigger(e, args);

					ret.push(e.result);
				}

				return ret;
			}


			function _fnLengthOverflow(settings) {
				var
					start = settings._iDisplayStart,
					end = settings.fnDisplayEnd(),
					len = settings._iDisplayLength;

				/* If we have space to show extra rows (backing up from the end point - then do so */
				if (start >= end) {
					start = end - len;
				}

				// Keep the start record on the current page
				start -= (start % len);

				if (len === -1 || start < 0) {
					start = 0;
				}

				settings._iDisplayStart = start;
			}


			function _fnRenderer(settings, type) {
				var renderer = settings.renderer;
				var host = DataTable.ext.renderer[type];

				if ($.isPlainObject(renderer) && renderer[type]) {
					// Specific renderer for this type. If available use it, otherwise use
					// the default.
					return host[renderer[type]] || host._;
				} else if (typeof renderer === 'string') {
					// Common renderer - if there is one available for this type use it,
					// otherwise use the default
					return host[renderer] || host._;
				}

				// Use the default
				return host._;
			}


			/**
			 * Detect the data source being used for the table. Used to simplify the code
			 * a little (ajax) and to make it compress a little smaller.
			 *
			 *  @param {object} settings dataTables settings object
			 *  @returns {string} Data source
			 *  @memberof DataTable#oApi
			 */
			function _fnDataSource(settings) {
				if (settings.oFeatures.bServerSide) {
					return 'ssp';
				} else if (settings.ajax || settings.sAjaxSource) {
					return 'ajax';
				}
				return 'dom';
			}




			/**
			 * Computed structure of the DataTables API, defined by the options passed to
			 * `DataTable.Api.register()` when building the API.
			 *
			 * The structure is built in order to speed creation and extension of the Api
			 * objects since the extensions are effectively pre-parsed.
			 *
			 * The array is an array of objects with the following structure, where this
			 * base array represents the Api prototype base:
			 *
			 *     [
			 *       {
			 *         name:      'data'                -- string   - Property name
			 *         val:       function () {},       -- function - Api method (or undefined if just an object
			 *         methodExt: [ ... ],              -- array    - Array of Api object definitions to extend the method result
			 *         propExt:   [ ... ]               -- array    - Array of Api object definitions to extend the property
			 *       },
			 *       {
			 *         name:     'row'
			 *         val:       {},
			 *         methodExt: [ ... ],
			 *         propExt:   [
			 *           {
			 *             name:      'data'
			 *             val:       function () {},
			 *             methodExt: [ ... ],
			 *             propExt:   [ ... ]
			 *           },
			 *           ...
			 *         ]
			 *       }
			 *     ]
			 *
			 * @type {Array}
			 * @ignore
			 */
			var __apiStruct = [];


			/**
			 * `Array.prototype` reference.
			 *
			 * @type object
			 * @ignore
			 */
			var __arrayProto = Array.prototype;


			/**
			 * Abstraction for `context` parameter of the `Api` constructor to allow it to
			 * take several different forms for ease of use.
			 *
			 * Each of the input parameter types will be converted to a DataTables settings
			 * object where possible.
			 *
			 * @param  {string|node|jQuery|object} mixed DataTable identifier. Can be one
			 *   of:
			 *
			 *   * `string` - jQuery selector. Any DataTables' matching the given selector
			 *     with be found and used.
			 *   * `node` - `TABLE` node which has already been formed into a DataTable.
			 *   * `jQuery` - A jQuery object of `TABLE` nodes.
			 *   * `object` - DataTables settings object
			 *   * `DataTables.Api` - API instance
			 * @return {array|null} Matching DataTables settings objects. `null` or
			 *   `undefined` is returned if no matching DataTable is found.
			 * @ignore
			 */
			var _toSettings = function (mixed) {
				var idx, jq;
				var settings = DataTable.settings;
				var tables = $.map(settings, function (el, i) {
					return el.nTable;
				});

				if (!mixed) {
					return [];
				} else if (mixed.nTable && mixed.oApi) {
					// DataTables settings object
					return [mixed];
				} else if (mixed.nodeName && mixed.nodeName.toLowerCase() === 'table') {
					// Table node
					idx = $.inArray(mixed, tables);
					return idx !== -1 ? [settings[idx]] : null;
				} else if (mixed && typeof mixed.settings === 'function') {
					return mixed.settings().toArray();
				} else if (typeof mixed === 'string') {
					// jQuery selector
					jq = $(mixed);
				} else if (mixed instanceof $) {
					// jQuery object (also DataTables instance)
					jq = mixed;
				}

				if (jq) {
					return jq.map(function (i) {
						idx = $.inArray(this, tables);
						return idx !== -1 ? settings[idx] : null;
					}).toArray();
				}
			};


			/**
			 * DataTables API class - used to control and interface with  one or more
			 * DataTables enhanced tables.
			 *
			 * The API class is heavily based on jQuery, presenting a chainable interface
			 * that you can use to interact with tables. Each instance of the API class has
			 * a "context" - i.e. the tables that it will operate on. This could be a single
			 * table, all tables on a page or a sub-set thereof.
			 *
			 * Additionally the API is designed to allow you to easily work with the data in
			 * the tables, retrieving and manipulating it as required. This is done by
			 * presenting the API class as an array like interface. The contents of the
			 * array depend upon the actions requested by each method (for example
			 * `rows().nodes()` will return an array of nodes, while `rows().data()` will
			 * return an array of objects or arrays depending upon your table's
			 * configuration). The API object has a number of array like methods (`push`,
			 * `pop`, `reverse` etc) as well as additional helper methods (`each`, `pluck`,
			 * `unique` etc) to assist your working with the data held in a table.
			 *
			 * Most methods (those which return an Api instance) are chainable, which means
			 * the return from a method call also has all of the methods available that the
			 * top level object had. For example, these two calls are equivalent:
			 *
			 *     // Not chained
			 *     api.row.add( {...} );
			 *     api.draw();
			 *
			 *     // Chained
			 *     api.row.add( {...} ).draw();
			 *
			 * @class DataTable.Api
			 * @param {array|object|string|jQuery} context DataTable identifier. This is
			 *   used to define which DataTables enhanced tables this API will operate on.
			 *   Can be one of:
			 *
			 *   * `string` - jQuery selector. Any DataTables' matching the given selector
			 *     with be found and used.
			 *   * `node` - `TABLE` node which has already been formed into a DataTable.
			 *   * `jQuery` - A jQuery object of `TABLE` nodes.
			 *   * `object` - DataTables settings object
			 * @param {array} [data] Data to initialise the Api instance with.
			 *
			 * @example
			 *   // Direct initialisation during DataTables construction
			 *   var api = $('#example').DataTable();
			 *
			 * @example
			 *   // Initialisation using a DataTables jQuery object
			 *   var api = $('#example').dataTable().api();
			 *
			 * @example
			 *   // Initialisation as a constructor
			 *   var api = new $.fn.DataTable.Api( 'table.dataTable' );
			 */
			_Api = function (context, data) {
				if (!(this instanceof _Api)) {
					return new _Api(context, data);
				}

				var settings = [];
				var ctxSettings = function (o) {
					var a = _toSettings(o);
					if (a) {
						settings = settings.concat(a);
					}
				};

				if ($.isArray(context)) {
					for (var i = 0, ien = context.length; i < ien; i++) {
						ctxSettings(context[i]);
					}
				} else {
					ctxSettings(context);
				}

				// Remove duplicates
				this.context = _unique(settings);

				// Initial data
				if (data) {
					$.merge(this, data);
				}

				// selector
				this.selector = {
					rows: null,
					cols: null,
					opts: null
				};

				_Api.extend(this, this, __apiStruct);
			};

			DataTable.Api = _Api;

			// Don't destroy the existing prototype, just extend it. Required for jQuery 2's
			// isPlainObject.
			$.extend(_Api.prototype, {
				any: function () {
					return this.count() !== 0;
				},


				concat: __arrayProto.concat,


				context: [], // array of table settings objects


				count: function () {
					return this.flatten().length;
				},


				each: function (fn) {
					for (var i = 0, ien = this.length; i < ien; i++) {
						fn.call(this, this[i], i, this);
					}

					return this;
				},


				eq: function (idx) {
					var ctx = this.context;

					return ctx.length > idx ?
						new _Api(ctx[idx], this[idx]) :
						null;
				},


				filter: function (fn) {
					var a = [];

					if (__arrayProto.filter) {
						a = __arrayProto.filter.call(this, fn, this);
					} else {
						// Compatibility for browsers without EMCA-252-5 (JS 1.6)
						for (var i = 0, ien = this.length; i < ien; i++) {
							if (fn.call(this, this[i], i, this)) {
								a.push(this[i]);
							}
						}
					}

					return new _Api(this.context, a);
				},


				flatten: function () {
					var a = [];
					return new _Api(this.context, a.concat.apply(a, this.toArray()));
				},


				join: __arrayProto.join,


				indexOf: __arrayProto.indexOf || function (obj, start) {
					for (var i = (start || 0), ien = this.length; i < ien; i++) {
						if (this[i] === obj) {
							return i;
						}
					}
					return -1;
				},

				iterator: function (flatten, type, fn, alwaysNew) {
					var
						a = [],
						ret,
						i, ien, j, jen,
						context = this.context,
						rows, items, item,
						selector = this.selector;

					// Argument shifting
					if (typeof flatten === 'string') {
						alwaysNew = fn;
						fn = type;
						type = flatten;
						flatten = false;
					}

					for (i = 0, ien = context.length; i < ien; i++) {
						var apiInst = new _Api(context[i]);

						if (type === 'table') {
							ret = fn.call(apiInst, context[i], i);

							if (ret !== undefined) {
								a.push(ret);
							}
						} else if (type === 'columns' || type === 'rows') {
							// this has same length as context - one entry for each table
							ret = fn.call(apiInst, context[i], this[i], i);

							if (ret !== undefined) {
								a.push(ret);
							}
						} else if (type === 'column' || type === 'column-rows' || type === 'row' || type === 'cell') {
							// columns and rows share the same structure.
							// 'this' is an array of column indexes for each context
							items = this[i];

							if (type === 'column-rows') {
								rows = _selector_row_indexes(context[i], selector.opts);
							}

							for (j = 0, jen = items.length; j < jen; j++) {
								item = items[j];

								if (type === 'cell') {
									ret = fn.call(apiInst, context[i], item.row, item.column, i, j);
								} else {
									ret = fn.call(apiInst, context[i], item, i, j, rows);
								}

								if (ret !== undefined) {
									a.push(ret);
								}
							}
						}
					}

					if (a.length || alwaysNew) {
						var api = new _Api(context, flatten ? a.concat.apply([], a) : a);
						var apiSelector = api.selector;
						apiSelector.rows = selector.rows;
						apiSelector.cols = selector.cols;
						apiSelector.opts = selector.opts;
						return api;
					}
					return this;
				},


				lastIndexOf: __arrayProto.lastIndexOf || function (obj, start) {
					// Bit cheeky...
					return this.indexOf.apply(this.toArray.reverse(), arguments);
				},


				length: 0,


				map: function (fn) {
					var a = [];

					if (__arrayProto.map) {
						a = __arrayProto.map.call(this, fn, this);
					} else {
						// Compatibility for browsers without EMCA-252-5 (JS 1.6)
						for (var i = 0, ien = this.length; i < ien; i++) {
							a.push(fn.call(this, this[i], i));
						}
					}

					return new _Api(this.context, a);
				},


				pluck: function (prop) {
					return this.map(function (el) {
						return el[prop];
					});
				},

				pop: __arrayProto.pop,


				push: __arrayProto.push,


				// Does not return an API instance
				reduce: __arrayProto.reduce || function (fn, init) {
					return _fnReduce(this, fn, init, 0, this.length, 1);
				},


				reduceRight: __arrayProto.reduceRight || function (fn, init) {
					return _fnReduce(this, fn, init, this.length - 1, -1, -1);
				},


				reverse: __arrayProto.reverse,


				// Object with rows, columns and opts
				selector: null,


				shift: __arrayProto.shift,


				slice: function () {
					return new _Api(this.context, this);
				},


				sort: __arrayProto.sort, // ? name - order?


				splice: __arrayProto.splice,


				toArray: function () {
					return __arrayProto.slice.call(this);
				},


				to$: function () {
					return $(this);
				},


				toJQuery: function () {
					return $(this);
				},


				unique: function () {
					return new _Api(this.context, _unique(this));
				},


				unshift: __arrayProto.unshift
			});


			_Api.extend = function (scope, obj, ext) {
				// Only extend API instances and static properties of the API
				if (!ext.length || !obj || (!(obj instanceof _Api) && !obj.__dt_wrapper)) {
					return;
				}

				var
					i, ien,
					j, jen,
					struct, inner,
					methodScoping = function (scope, fn, struc) {
						return function () {
							var ret = fn.apply(scope, arguments);

							// Method extension
							_Api.extend(ret, ret, struc.methodExt);
							return ret;
						};
					};

				for (i = 0, ien = ext.length; i < ien; i++) {
					struct = ext[i];

					// Value
					obj[struct.name] = typeof struct.val === 'function' ?
						methodScoping(scope, struct.val, struct) :
						$.isPlainObject(struct.val) ? {} :
						struct.val;

					obj[struct.name].__dt_wrapper = true;

					// Property extension
					_Api.extend(scope, obj[struct.name], struct.propExt);
				}
			};


			// @todo - Is there need for an augment function?
			// _Api.augment = function ( inst, name )
			// {
			// 	// Find src object in the structure from the name
			// 	var parts = name.split('.');

			// 	_Api.extend( inst, obj );
			// };


			//     [
			//       {
			//         name:      'data'                -- string   - Property name
			//         val:       function () {},       -- function - Api method (or undefined if just an object
			//         methodExt: [ ... ],              -- array    - Array of Api object definitions to extend the method result
			//         propExt:   [ ... ]               -- array    - Array of Api object definitions to extend the property
			//       },
			//       {
			//         name:     'row'
			//         val:       {},
			//         methodExt: [ ... ],
			//         propExt:   [
			//           {
			//             name:      'data'
			//             val:       function () {},
			//             methodExt: [ ... ],
			//             propExt:   [ ... ]
			//           },
			//           ...
			//         ]
			//       }
			//     ]

			_Api.register = _api_register = function (name, val) {
				if ($.isArray(name)) {
					for (var j = 0, jen = name.length; j < jen; j++) {
						_Api.register(name[j], val);
					}
					return;
				}

				var
					i, ien,
					heir = name.split('.'),
					struct = __apiStruct,
					key, method;

				var find = function (src, name) {
					for (var i = 0, ien = src.length; i < ien; i++) {
						if (src[i].name === name) {
							return src[i];
						}
					}
					return null;
				};

				for (i = 0, ien = heir.length; i < ien; i++) {
					method = heir[i].indexOf('()') !== -1;
					key = method ?
						heir[i].replace('()', '') :
						heir[i];

					var src = find(struct, key);
					if (!src) {
						src = {
							name: key,
							val: {},
							methodExt: [],
							propExt: []
						};
						struct.push(src);
					}

					if (i === ien - 1) {
						src.val = val;
					} else {
						struct = method ?
							src.methodExt :
							src.propExt;
					}
				}
			};


			_Api.registerPlural = _api_registerPlural = function (pluralName, singularName, val) {
				_Api.register(pluralName, val);

				_Api.register(singularName, function () {
					var ret = val.apply(this, arguments);

					if (ret === this) {
						// Returned item is the API instance that was passed in, return it
						return this;
					} else if (ret instanceof _Api) {
						// New API instance returned, want the value from the first item
						// in the returned array for the singular result.
						return ret.length ?
							$.isArray(ret[0]) ?
							new _Api(ret.context, ret[0]) : // Array results are 'enhanced'
							ret[0] :
							undefined;
					}

					// Non-API return - just fire it back
					return ret;
				});
			};


			/**
			 * Selector for HTML tables. Apply the given selector to the give array of
			 * DataTables settings objects.
			 *
			 * @param {string|integer} [selector] jQuery selector string or integer
			 * @param  {array} Array of DataTables settings objects to be filtered
			 * @return {array}
			 * @ignore
			 */
			var __table_selector = function (selector, a) {
				// Integer is used to pick out a table by index
				if (typeof selector === 'number') {
					return [a[selector]];
				}

				// Perform a jQuery selector on the table nodes
				var nodes = $.map(a, function (el, i) {
					return el.nTable;
				});

				return $(nodes)
					.filter(selector)
					.map(function (i) {
						// Need to translate back from the table node to the settings
						var idx = $.inArray(this, nodes);
						return a[idx];
					})
					.toArray();
			};



			/**
			 * Context selector for the API's context (i.e. the tables the API instance
			 * refers to.
			 *
			 * @name    DataTable.Api#tables
			 * @param {string|integer} [selector] Selector to pick which tables the iterator
			 *   should operate on. If not given, all tables in the current context are
			 *   used. This can be given as a jQuery selector (for example `':gt(0)'`) to
			 *   select multiple tables or as an integer to select a single table.
			 * @returns {DataTable.Api} Returns a new API instance if a selector is given.
			 */
			_api_register('tables()', function (selector) {
				// A new instance is created if there was a selector specified
				return selector ?
					new _Api(__table_selector(selector, this.context)) :
					this;
			});


			_api_register('table()', function (selector) {
				var tables = this.tables(selector);
				var ctx = tables.context;

				// Truncate to the first matched table
				return ctx.length ?
					new _Api(ctx[0]) :
					tables;
			});


			_api_registerPlural('tables().nodes()', 'table().node()', function () {
				return this.iterator('table', function (ctx) {
					return ctx.nTable;
				}, 1);
			});


			_api_registerPlural('tables().body()', 'table().body()', function () {
				return this.iterator('table', function (ctx) {
					return ctx.nTBody;
				}, 1);
			});


			_api_registerPlural('tables().header()', 'table().header()', function () {
				return this.iterator('table', function (ctx) {
					return ctx.nTHead;
				}, 1);
			});


			_api_registerPlural('tables().footer()', 'table().footer()', function () {
				return this.iterator('table', function (ctx) {
					return ctx.nTFoot;
				}, 1);
			});


			_api_registerPlural('tables().containers()', 'table().container()', function () {
				return this.iterator('table', function (ctx) {
					return ctx.nTableWrapper;
				}, 1);
			});



			/**
			 * Redraw the tables in the current context.
			 */
			_api_register('draw()', function (paging) {
				return this.iterator('table', function (settings) {
					if (paging === 'page') {
						_fnDraw(settings);
					} else {
						if (typeof paging === 'string') {
							paging = paging === 'full-hold' ?
								false :
								true;
						}

						_fnReDraw(settings, paging === false);
					}
				});
			});



			/**
			 * Get the current page index.
			 *
			 * @return {integer} Current page index (zero based)
			 */
			/**
			 * Set the current page.
			 *
			 * Note that if you attempt to show a page which does not exist, DataTables will
			 * not throw an error, but rather reset the paging.
			 *
			 * @param {integer|string} action The paging action to take. This can be one of:
			 *  * `integer` - The page index to jump to
			 *  * `string` - An action to take:
			 *    * `first` - Jump to first page.
			 *    * `next` - Jump to the next page
			 *    * `previous` - Jump to previous page
			 *    * `last` - Jump to the last page.
			 * @returns {DataTables.Api} this
			 */
			_api_register('page()', function (action) {
				if (action === undefined) {
					return this.page.info().page; // not an expensive call
				}

				// else, have an action to take on all tables
				return this.iterator('table', function (settings) {
					_fnPageChange(settings, action);
				});
			});


			/**
			 * Paging information for the first table in the current context.
			 *
			 * If you require paging information for another table, use the `table()` method
			 * with a suitable selector.
			 *
			 * @return {object} Object with the following properties set:
			 *  * `page` - Current page index (zero based - i.e. the first page is `0`)
			 *  * `pages` - Total number of pages
			 *  * `start` - Display index for the first record shown on the current page
			 *  * `end` - Display index for the last record shown on the current page
			 *  * `length` - Display length (number of records). Note that generally `start
			 *    + length = end`, but this is not always true, for example if there are
			 *    only 2 records to show on the final page, with a length of 10.
			 *  * `recordsTotal` - Full data set length
			 *  * `recordsDisplay` - Data set length once the current filtering criterion
			 *    are applied.
			 */
			_api_register('page.info()', function (action) {
				if (this.context.length === 0) {
					return undefined;
				}

				var
					settings = this.context[0],
					start = settings._iDisplayStart,
					len = settings.oFeatures.bPaginate ? settings._iDisplayLength : -1,
					visRecords = settings.fnRecordsDisplay(),
					all = len === -1;

				return {
					"page": all ? 0 : Math.floor(start / len),
					"pages": all ? 1 : Math.ceil(visRecords / len),
					"start": start,
					"end": settings.fnDisplayEnd(),
					"length": len,
					"recordsTotal": settings.fnRecordsTotal(),
					"recordsDisplay": visRecords,
					"serverSide": _fnDataSource(settings) === 'ssp'
				};
			});


			/**
			 * Get the current page length.
			 *
			 * @return {integer} Current page length. Note `-1` indicates that all records
			 *   are to be shown.
			 */
			/**
			 * Set the current page length.
			 *
			 * @param {integer} Page length to set. Use `-1` to show all records.
			 * @returns {DataTables.Api} this
			 */
			_api_register('page.len()', function (len) {
				// Note that we can't call this function 'length()' because `length`
				// is a Javascript property of functions which defines how many arguments
				// the function expects.
				if (len === undefined) {
					return this.context.length !== 0 ?
						this.context[0]._iDisplayLength :
						undefined;
				}

				// else, set the page length
				return this.iterator('table', function (settings) {
					_fnLengthChange(settings, len);
				});
			});



			var __reload = function (settings, holdPosition, callback) {
				// Use the draw event to trigger a callback
				if (callback) {
					var api = new _Api(settings);

					api.one('draw', function () {
						callback(api.ajax.json());
					});
				}

				if (_fnDataSource(settings) == 'ssp') {
					_fnReDraw(settings, holdPosition);
				} else {
					_fnProcessingDisplay(settings, true);

					// Cancel an existing request
					var xhr = settings.jqXHR;
					if (xhr && xhr.readyState !== 4) {
						xhr.abort();
					}

					// Trigger xhr
					_fnBuildAjax(settings, [], function (json) {
						_fnClearTable(settings);

						var data = _fnAjaxDataSrc(settings, json);
						for (var i = 0, ien = data.length; i < ien; i++) {
							_fnAddData(settings, data[i]);
						}

						_fnReDraw(settings, holdPosition);
						_fnProcessingDisplay(settings, false);
					});
				}
			};


			/**
			 * Get the JSON response from the last Ajax request that DataTables made to the
			 * server. Note that this returns the JSON from the first table in the current
			 * context.
			 *
			 * @return {object} JSON received from the server.
			 */
			_api_register('ajax.json()', function () {
				var ctx = this.context;

				if (ctx.length > 0) {
					return ctx[0].json;
				}

				// else return undefined;
			});


			/**
			 * Get the data submitted in the last Ajax request
			 */
			_api_register('ajax.params()', function () {
				var ctx = this.context;

				if (ctx.length > 0) {
					return ctx[0].oAjaxData;
				}

				// else return undefined;
			});


			/**
			 * Reload tables from the Ajax data source. Note that this function will
			 * automatically re-draw the table when the remote data has been loaded.
			 *
			 * @param {boolean} [reset=true] Reset (default) or hold the current paging
			 *   position. A full re-sort and re-filter is performed when this method is
			 *   called, which is why the pagination reset is the default action.
			 * @returns {DataTables.Api} this
			 */
			_api_register('ajax.reload()', function (callback, resetPaging) {
				return this.iterator('table', function (settings) {
					__reload(settings, resetPaging === false, callback);
				});
			});


			/**
			 * Get the current Ajax URL. Note that this returns the URL from the first
			 * table in the current context.
			 *
			 * @return {string} Current Ajax source URL
			 */
			/**
			 * Set the Ajax URL. Note that this will set the URL for all tables in the
			 * current context.
			 *
			 * @param {string} url URL to set.
			 * @returns {DataTables.Api} this
			 */
			_api_register('ajax.url()', function (url) {
				var ctx = this.context;

				if (url === undefined) {
					// get
					if (ctx.length === 0) {
						return undefined;
					}
					ctx = ctx[0];

					return ctx.ajax ?
						$.isPlainObject(ctx.ajax) ?
						ctx.ajax.url :
						ctx.ajax :
						ctx.sAjaxSource;
				}

				// set
				return this.iterator('table', function (settings) {
					if ($.isPlainObject(settings.ajax)) {
						settings.ajax.url = url;
					} else {
						settings.ajax = url;
					}
					// No need to consider sAjaxSource here since DataTables gives priority
					// to `ajax` over `sAjaxSource`. So setting `ajax` here, renders any
					// value of `sAjaxSource` redundant.
				});
			});


			/**
			 * Load data from the newly set Ajax URL. Note that this method is only
			 * available when `ajax.url()` is used to set a URL. Additionally, this method
			 * has the same effect as calling `ajax.reload()` but is provided for
			 * convenience when setting a new URL. Like `ajax.reload()` it will
			 * automatically redraw the table once the remote data has been loaded.
			 *
			 * @returns {DataTables.Api} this
			 */
			_api_register('ajax.url().load()', function (callback, resetPaging) {
				// Same as a reload, but makes sense to present it for easy access after a
				// url change
				return this.iterator('table', function (ctx) {
					__reload(ctx, resetPaging === false, callback);
				});
			});




			var _selector_run = function (type, selector, selectFn, settings, opts) {
				var
					out = [],
					res,
					a, i, ien, j, jen,
					selectorType = typeof selector;

				// Can't just check for isArray here, as an API or jQuery instance might be
				// given with their array like look
				if (!selector || selectorType === 'string' || selectorType === 'function' || selector.length === undefined) {
					selector = [selector];
				}

				for (i = 0, ien = selector.length; i < ien; i++) {
					// Only split on simple strings - complex expressions will be jQuery selectors
					a = selector[i] && selector[i].split && !selector[i].match(/[\[\(:]/) ?
						selector[i].split(',') : [selector[i]];

					for (j = 0, jen = a.length; j < jen; j++) {
						res = selectFn(typeof a[j] === 'string' ? $.trim(a[j]) : a[j]);

						if (res && res.length) {
							out = out.concat(res);
						}
					}
				}

				// selector extensions
				var ext = _ext.selector[type];
				if (ext.length) {
					for (i = 0, ien = ext.length; i < ien; i++) {
						out = ext[i](settings, opts, out);
					}
				}

				return _unique(out);
			};


			var _selector_opts = function (opts) {
				if (!opts) {
					opts = {};
				}

				// Backwards compatibility for 1.9- which used the terminology filter rather
				// than search
				if (opts.filter && opts.search === undefined) {
					opts.search = opts.filter;
				}

				return $.extend({
					search: 'none',
					order: 'current',
					page: 'all'
				}, opts);
			};


			var _selector_first = function (inst) {
				// Reduce the API instance to the first item found
				for (var i = 0, ien = inst.length; i < ien; i++) {
					if (inst[i].length > 0) {
						// Assign the first element to the first item in the instance
						// and truncate the instance and context
						inst[0] = inst[i];
						inst[0].length = 1;
						inst.length = 1;
						inst.context = [inst.context[i]];

						return inst;
					}
				}

				// Not found - return an empty instance
				inst.length = 0;
				return inst;
			};


			var _selector_row_indexes = function (settings, opts) {
				var
					i, ien, tmp, a = [],
					displayFiltered = settings.aiDisplay,
					displayMaster = settings.aiDisplayMaster;

				var
					search = opts.search, // none, applied, removed
					order = opts.order, // applied, current, index (original - compatibility with 1.9)
					page = opts.page; // all, current

				if (_fnDataSource(settings) == 'ssp') {
					// In server-side processing mode, most options are irrelevant since
					// rows not shown don't exist and the index order is the applied order
					// Removed is a special case - for consistency just return an empty
					// array
					return search === 'removed' ? [] :
						_range(0, displayMaster.length);
				} else if (page == 'current') {
					// Current page implies that order=current and fitler=applied, since it is
					// fairly senseless otherwise, regardless of what order and search actually
					// are
					for (i = settings._iDisplayStart, ien = settings.fnDisplayEnd(); i < ien; i++) {
						a.push(displayFiltered[i]);
					}
				} else if (order == 'current' || order == 'applied') {
					if (search == 'none') {
						a = displayMaster.slice();
					} else if (search == 'applied') {
						a = displayFiltered.slice();
					} else if (search == 'removed') {
						// O(n+m) solution by creating a hash map
						var displayFilteredMap = {};

						for (var i = 0, ien = displayFiltered.length; i < ien; i++) {
							displayFilteredMap[displayFiltered[i]] = null;
						}

						a = $.map(displayMaster, function (el) {
							return !displayFilteredMap.hasOwnProperty(el) ?
								el :
								null;
						});
					}
				} else if (order == 'index' || order == 'original') {
					for (i = 0, ien = settings.aoData.length; i < ien; i++) {
						if (search == 'none') {
							a.push(i);
						} else { // applied | removed
							tmp = $.inArray(i, displayFiltered);

							if ((tmp === -1 && search == 'removed') ||
								(tmp >= 0 && search == 'applied')) {
								a.push(i);
							}
						}
					}
				}

				return a;
			};


			/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
			 * Rows
			 *
			 * {}          - no selector - use all available rows
			 * {integer}   - row aoData index
			 * {node}      - TR node
			 * {string}    - jQuery selector to apply to the TR elements
			 * {array}     - jQuery array of nodes, or simply an array of TR nodes
			 *
			 */
			var __row_selector = function (settings, selector, opts) {
				var rows;
				var run = function (sel) {
					var selInt = _intVal(sel);
					var i, ien;
					var aoData = settings.aoData;

					// Short cut - selector is a number and no options provided (default is
					// all records, so no need to check if the index is in there, since it
					// must be - dev error if the index doesn't exist).
					if (selInt !== null && !opts) {
						return [selInt];
					}

					if (!rows) {
						rows = _selector_row_indexes(settings, opts);
					}

					if (selInt !== null && $.inArray(selInt, rows) !== -1) {
						// Selector - integer
						return [selInt];
					} else if (sel === null || sel === undefined || sel === '') {
						// Selector - none
						return rows;
					}

					// Selector - function
					if (typeof sel === 'function') {
						return $.map(rows, function (idx) {
							var row = aoData[idx];
							return sel(idx, row._aData, row.nTr) ? idx : null;
						});
					}

					// Selector - node
					if (sel.nodeName) {
						var rowIdx = sel._DT_RowIndex; // Property added by DT for fast lookup
						var cellIdx = sel._DT_CellIndex;

						if (rowIdx !== undefined) {
							// Make sure that the row is actually still present in the table
							return aoData[rowIdx] && aoData[rowIdx].nTr === sel ? [rowIdx] : [];
						} else if (cellIdx) {
							return aoData[cellIdx.row] && aoData[cellIdx.row].nTr === sel ? [cellIdx.row] : [];
						} else {
							var host = $(sel).closest('*[data-dt-row]');
							return host.length ? [host.data('dt-row')] : [];
						}
					}

					// ID selector. Want to always be able to select rows by id, regardless
					// of if the tr element has been created or not, so can't rely upon
					// jQuery here - hence a custom implementation. This does not match
					// Sizzle's fast selector or HTML4 - in HTML5 the ID can be anything,
					// but to select it using a CSS selector engine (like Sizzle or
					// querySelect) it would need to need to be escaped for some characters.
					// DataTables simplifies this for row selectors since you can select
					// only a row. A # indicates an id any anything that follows is the id -
					// unescaped.
					if (typeof sel === 'string' && sel.charAt(0) === '#') {
						// get row index from id
						var rowObj = settings.aIds[sel.replace(/^#/, '')];
						if (rowObj !== undefined) {
							return [rowObj.idx];
						}

						// need to fall through to jQuery in case there is DOM id that
						// matches
					}

					// Get nodes in the order from the `rows` array with null values removed
					var nodes = _removeEmpty(
						_pluck_order(settings.aoData, rows, 'nTr')
					);

					// Selector - jQuery selector string, array of nodes or jQuery object/
					// As jQuery's .filter() allows jQuery objects to be passed in filter,
					// it also allows arrays, so this will cope with all three options
					return $(nodes)
						.filter(sel)
						.map(function () {
							return this._DT_RowIndex;
						})
						.toArray();
				};

				return _selector_run('row', selector, run, settings, opts);
			};


			_api_register('rows()', function (selector, opts) {
				// argument shifting
				if (selector === undefined) {
					selector = '';
				} else if ($.isPlainObject(selector)) {
					opts = selector;
					selector = '';
				}

				opts = _selector_opts(opts);

				var inst = this.iterator('table', function (settings) {
					return __row_selector(settings, selector, opts);
				}, 1);

				// Want argument shifting here and in __row_selector?
				inst.selector.rows = selector;
				inst.selector.opts = opts;

				return inst;
			});

			_api_register('rows().nodes()', function () {
				return this.iterator('row', function (settings, row) {
					return settings.aoData[row].nTr || undefined;
				}, 1);
			});

			_api_register('rows().data()', function () {
				return this.iterator(true, 'rows', function (settings, rows) {
					return _pluck_order(settings.aoData, rows, '_aData');
				}, 1);
			});

			_api_registerPlural('rows().cache()', 'row().cache()', function (type) {
				return this.iterator('row', function (settings, row) {
					var r = settings.aoData[row];
					return type === 'search' ? r._aFilterData : r._aSortData;
				}, 1);
			});

			_api_registerPlural('rows().invalidate()', 'row().invalidate()', function (src) {
				return this.iterator('row', function (settings, row) {
					_fnInvalidate(settings, row, src);
				});
			});

			_api_registerPlural('rows().indexes()', 'row().index()', function () {
				return this.iterator('row', function (settings, row) {
					return row;
				}, 1);
			});

			_api_registerPlural('rows().ids()', 'row().id()', function (hash) {
				var a = [];
				var context = this.context;

				// `iterator` will drop undefined values, but in this case we want them
				for (var i = 0, ien = context.length; i < ien; i++) {
					for (var j = 0, jen = this[i].length; j < jen; j++) {
						var id = context[i].rowIdFn(context[i].aoData[this[i][j]]._aData);
						a.push((hash === true ? '#' : '') + id);
					}
				}

				return new _Api(context, a);
			});

			_api_registerPlural('rows().remove()', 'row().remove()', function () {
				var that = this;

				this.iterator('row', function (settings, row, thatIdx) {
					var data = settings.aoData;
					var rowData = data[row];
					var i, ien, j, jen;
					var loopRow, loopCells;

					data.splice(row, 1);

					// Update the cached indexes
					for (i = 0, ien = data.length; i < ien; i++) {
						loopRow = data[i];
						loopCells = loopRow.anCells;

						// Rows
						if (loopRow.nTr !== null) {
							loopRow.nTr._DT_RowIndex = i;
						}

						// Cells
						if (loopCells !== null) {
							for (j = 0, jen = loopCells.length; j < jen; j++) {
								loopCells[j]._DT_CellIndex.row = i;
							}
						}
					}

					// Delete from the display arrays
					_fnDeleteIndex(settings.aiDisplayMaster, row);
					_fnDeleteIndex(settings.aiDisplay, row);
					_fnDeleteIndex(that[thatIdx], row, false); // maintain local indexes

					// For server-side processing tables - subtract the deleted row from the count
					if (settings._iRecordsDisplay > 0) {
						settings._iRecordsDisplay--;
					}

					// Check for an 'overflow' they case for displaying the table
					_fnLengthOverflow(settings);

					// Remove the row's ID reference if there is one
					var id = settings.rowIdFn(rowData._aData);
					if (id !== undefined) {
						delete settings.aIds[id];
					}
				});

				this.iterator('table', function (settings) {
					for (var i = 0, ien = settings.aoData.length; i < ien; i++) {
						settings.aoData[i].idx = i;
					}
				});

				return this;
			});


			_api_register('rows.add()', function (rows) {
				var newRows = this.iterator('table', function (settings) {
					var row, i, ien;
					var out = [];

					for (i = 0, ien = rows.length; i < ien; i++) {
						row = rows[i];

						if (row.nodeName && row.nodeName.toUpperCase() === 'TR') {
							out.push(_fnAddTr(settings, row)[0]);
						} else {
							out.push(_fnAddData(settings, row));
						}
					}

					return out;
				}, 1);

				// Return an Api.rows() extended instance, so rows().nodes() etc can be used
				var modRows = this.rows(-1);
				modRows.pop();
				$.merge(modRows, newRows);

				return modRows;
			});





			/**
			 *
			 */
			_api_register('row()', function (selector, opts) {
				return _selector_first(this.rows(selector, opts));
			});


			_api_register('row().data()', function (data) {
				var ctx = this.context;

				if (data === undefined) {
					// Get
					return ctx.length && this.length ?
						ctx[0].aoData[this[0]]._aData :
						undefined;
				}

				// Set
				var row = ctx[0].aoData[this[0]];
				row._aData = data;

				// If the DOM has an id, and the data source is an array
				if ($.isArray(data) && row.nTr.id) {
					_fnSetObjectDataFn(ctx[0].rowId)(data, row.nTr.id);
				}

				// Automatically invalidate
				_fnInvalidate(ctx[0], this[0], 'data');

				return this;
			});


			_api_register('row().node()', function () {
				var ctx = this.context;

				return ctx.length && this.length ?
					ctx[0].aoData[this[0]].nTr || null :
					null;
			});


			_api_register('row.add()', function (row) {
				// Allow a jQuery object to be passed in - only a single row is added from
				// it though - the first element in the set
				if (row instanceof $ && row.length) {
					row = row[0];
				}

				var rows = this.iterator('table', function (settings) {
					if (row.nodeName && row.nodeName.toUpperCase() === 'TR') {
						return _fnAddTr(settings, row)[0];
					}
					return _fnAddData(settings, row);
				});

				// Return an Api.rows() extended instance, with the newly added row selected
				return this.row(rows[0]);
			});



			var __details_add = function (ctx, row, data, klass) {
				// Convert to array of TR elements
				var rows = [];
				var addRow = function (r, k) {
					// Recursion to allow for arrays of jQuery objects
					if ($.isArray(r) || r instanceof $) {
						for (var i = 0, ien = r.length; i < ien; i++) {
							addRow(r[i], k);
						}
						return;
					}

					// If we get a TR element, then just add it directly - up to the dev
					// to add the correct number of columns etc
					if (r.nodeName && r.nodeName.toLowerCase() === 'tr') {
						rows.push(r);
					} else {
						// Otherwise create a row with a wrapper
						var created = $('<tr><td/></tr>').addClass(k);
						$('td', created)
							.addClass(k)
							.html(r)[0].colSpan = _fnVisbleColumns(ctx);

						rows.push(created[0]);
					}
				};

				addRow(data, klass);

				if (row._details) {
					row._details.detach();
				}

				row._details = $(rows);

				// If the children were already shown, that state should be retained
				if (row._detailsShow) {
					row._details.insertAfter(row.nTr);
				}
			};


			var __details_remove = function (api, idx) {
				var ctx = api.context;

				if (ctx.length) {
					var row = ctx[0].aoData[idx !== undefined ? idx : api[0]];

					if (row && row._details) {
						row._details.remove();

						row._detailsShow = undefined;
						row._details = undefined;
					}
				}
			};


			var __details_display = function (api, show) {
				var ctx = api.context;

				if (ctx.length && api.length) {
					var row = ctx[0].aoData[api[0]];

					if (row._details) {
						row._detailsShow = show;

						if (show) {
							row._details.insertAfter(row.nTr);
						} else {
							row._details.detach();
						}

						__details_events(ctx[0]);
					}
				}
			};


			var __details_events = function (settings) {
				var api = new _Api(settings);
				var namespace = '.dt.DT_details';
				var drawEvent = 'draw' + namespace;
				var colvisEvent = 'column-visibility' + namespace;
				var destroyEvent = 'destroy' + namespace;
				var data = settings.aoData;

				api.off(drawEvent + ' ' + colvisEvent + ' ' + destroyEvent);

				if (_pluck(data, '_details').length > 0) {
					// On each draw, insert the required elements into the document
					api.on(drawEvent, function (e, ctx) {
						if (settings !== ctx) {
							return;
						}

						api.rows({
							page: 'current'
						}).eq(0).each(function (idx) {
							// Internal data grab
							var row = data[idx];

							if (row._detailsShow) {
								row._details.insertAfter(row.nTr);
							}
						});
					});

					// Column visibility change - update the colspan
					api.on(colvisEvent, function (e, ctx, idx, vis) {
						if (settings !== ctx) {
							return;
						}

						// Update the colspan for the details rows (note, only if it already has
						// a colspan)
						var row, visible = _fnVisbleColumns(ctx);

						for (var i = 0, ien = data.length; i < ien; i++) {
							row = data[i];

							if (row._details) {
								row._details.children('td[colspan]').attr('colspan', visible);
							}
						}
					});

					// Table destroyed - nuke any child rows
					api.on(destroyEvent, function (e, ctx) {
						if (settings !== ctx) {
							return;
						}

						for (var i = 0, ien = data.length; i < ien; i++) {
							if (data[i]._details) {
								__details_remove(api, i);
							}
						}
					});
				}
			};

			// Strings for the method names to help minification
			var _emp = '';
			var _child_obj = _emp + 'row().child';
			var _child_mth = _child_obj + '()';

			// data can be:
			//  tr
			//  string
			//  jQuery or array of any of the above
			_api_register(_child_mth, function (data, klass) {
				var ctx = this.context;

				if (data === undefined) {
					// get
					return ctx.length && this.length ?
						ctx[0].aoData[this[0]]._details :
						undefined;
				} else if (data === true) {
					// show
					this.child.show();
				} else if (data === false) {
					// remove
					__details_remove(this);
				} else if (ctx.length && this.length) {
					// set
					__details_add(ctx[0], ctx[0].aoData[this[0]], data, klass);
				}

				return this;
			});


			_api_register([
				_child_obj + '.show()',
				_child_mth + '.show()' // only when `child()` was called with parameters (without
			], function (show) { // it returns an object and this method is not executed)
				__details_display(this, true);
				return this;
			});


			_api_register([
				_child_obj + '.hide()',
				_child_mth + '.hide()' // only when `child()` was called with parameters (without
			], function () { // it returns an object and this method is not executed)
				__details_display(this, false);
				return this;
			});


			_api_register([
				_child_obj + '.remove()',
				_child_mth + '.remove()' // only when `child()` was called with parameters (without
			], function () { // it returns an object and this method is not executed)
				__details_remove(this);
				return this;
			});


			_api_register(_child_obj + '.isShown()', function () {
				var ctx = this.context;

				if (ctx.length && this.length) {
					// _detailsShown as false or undefined will fall through to return false
					return ctx[0].aoData[this[0]]._detailsShow || false;
				}
				return false;
			});



			/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
			 * Columns
			 *
			 * {integer}           - column index (>=0 count from left, <0 count from right)
			 * "{integer}:visIdx"  - visible column index (i.e. translate to column index)  (>=0 count from left, <0 count from right)
			 * "{integer}:visible" - alias for {integer}:visIdx  (>=0 count from left, <0 count from right)
			 * "{string}:name"     - column name
			 * "{string}"          - jQuery selector on column header nodes
			 *
			 */

			// can be an array of these items, comma separated list, or an array of comma
			// separated lists

			var __re_column_selector = /^([^:]+):(name|visIdx|visible)$/;


			// r1 and r2 are redundant - but it means that the parameters match for the
			// iterator callback in columns().data()
			var __columnData = function (settings, column, r1, r2, rows) {
				var a = [];
				for (var row = 0, ien = rows.length; row < ien; row++) {
					a.push(_fnGetCellData(settings, rows[row], column));
				}
				return a;
			};


			var __column_selector = function (settings, selector, opts) {
				var
					columns = settings.aoColumns,
					names = _pluck(columns, 'sName'),
					nodes = _pluck(columns, 'nTh');

				var run = function (s) {
					var selInt = _intVal(s);

					// Selector - all
					if (s === '') {
						return _range(columns.length);
					}

					// Selector - index
					if (selInt !== null) {
						return [selInt >= 0 ?
							selInt : // Count from left
							columns.length + selInt // Count from right (+ because its a negative value)
						];
					}

					// Selector = function
					if (typeof s === 'function') {
						var rows = _selector_row_indexes(settings, opts);

						return $.map(columns, function (col, idx) {
							return s(
								idx,
								__columnData(settings, idx, 0, 0, rows),
								nodes[idx]
							) ? idx : null;
						});
					}

					// jQuery or string selector
					var match = typeof s === 'string' ?
						s.match(__re_column_selector) :
						'';

					if (match) {
						switch (match[2]) {
							case 'visIdx':
							case 'visible':
								var idx = parseInt(match[1], 10);
								// Visible index given, convert to column index
								if (idx < 0) {
									// Counting from the right
									var visColumns = $.map(columns, function (col, i) {
										return col.bVisible ? i : null;
									});
									return [visColumns[visColumns.length + idx]];
								}
								// Counting from the left
								return [_fnVisibleToColumnIndex(settings, idx)];

							case 'name':
								// match by name. `names` is column index complete and in order
								return $.map(names, function (name, i) {
									return name === match[1] ? i : null;
								});

							default:
								return [];
						}
					}

					// Cell in the table body
					if (s.nodeName && s._DT_CellIndex) {
						return [s._DT_CellIndex.column];
					}

					// jQuery selector on the TH elements for the columns
					var jqResult = $(nodes)
						.filter(s)
						.map(function () {
							return $.inArray(this, nodes); // `nodes` is column index complete and in order
						})
						.toArray();

					if (jqResult.length || !s.nodeName) {
						return jqResult;
					}

					// Otherwise a node which might have a `dt-column` data attribute, or be
					// a child or such an element
					var host = $(s).closest('*[data-dt-column]');
					return host.length ? [host.data('dt-column')] : [];
				};

				return _selector_run('column', selector, run, settings, opts);
			};


			var __setColumnVis = function (settings, column, vis) {
				var
					cols = settings.aoColumns,
					col = cols[column],
					data = settings.aoData,
					row, cells, i, ien, tr;

				// Get
				if (vis === undefined) {
					return col.bVisible;
				}

				// Set
				// No change
				if (col.bVisible === vis) {
					return;
				}

				if (vis) {
					// Insert column
					// Need to decide if we should use appendChild or insertBefore
					var insertBefore = $.inArray(true, _pluck(cols, 'bVisible'), column + 1);

					for (i = 0, ien = data.length; i < ien; i++) {
						tr = data[i].nTr;
						cells = data[i].anCells;

						if (tr) {
							// insertBefore can act like appendChild if 2nd arg is null
							tr.insertBefore(cells[column], cells[insertBefore] || null);
						}
					}
				} else {
					// Remove column
					$(_pluck(settings.aoData, 'anCells', column)).detach();
				}

				// Common actions
				col.bVisible = vis;
				_fnDrawHead(settings, settings.aoHeader);
				_fnDrawHead(settings, settings.aoFooter);

				// Update colspan for no records display. Child rows and extensions will use their own
				// listeners to do this - only need to update the empty table item here
				if (!settings.aiDisplay.length) {
					$(settings.nTBody).find('td[colspan]').attr('colspan', _fnVisbleColumns(settings));
				}

				_fnSaveState(settings);
			};


			_api_register('columns()', function (selector, opts) {
				// argument shifting
				if (selector === undefined) {
					selector = '';
				} else if ($.isPlainObject(selector)) {
					opts = selector;
					selector = '';
				}

				opts = _selector_opts(opts);

				var inst = this.iterator('table', function (settings) {
					return __column_selector(settings, selector, opts);
				}, 1);

				// Want argument shifting here and in _row_selector?
				inst.selector.cols = selector;
				inst.selector.opts = opts;

				return inst;
			});

			_api_registerPlural('columns().header()', 'column().header()', function (selector, opts) {
				return this.iterator('column', function (settings, column) {
					return settings.aoColumns[column].nTh;
				}, 1);
			});

			_api_registerPlural('columns().footer()', 'column().footer()', function (selector, opts) {
				return this.iterator('column', function (settings, column) {
					return settings.aoColumns[column].nTf;
				}, 1);
			});

			_api_registerPlural('columns().data()', 'column().data()', function () {
				return this.iterator('column-rows', __columnData, 1);
			});

			_api_registerPlural('columns().dataSrc()', 'column().dataSrc()', function () {
				return this.iterator('column', function (settings, column) {
					return settings.aoColumns[column].mData;
				}, 1);
			});

			_api_registerPlural('columns().cache()', 'column().cache()', function (type) {
				return this.iterator('column-rows', function (settings, column, i, j, rows) {
					return _pluck_order(settings.aoData, rows,
						type === 'search' ? '_aFilterData' : '_aSortData', column
					);
				}, 1);
			});

			_api_registerPlural('columns().nodes()', 'column().nodes()', function () {
				return this.iterator('column-rows', function (settings, column, i, j, rows) {
					return _pluck_order(settings.aoData, rows, 'anCells', column);
				}, 1);
			});

			_api_registerPlural('columns().visible()', 'column().visible()', function (vis, calc) {
				var ret = this.iterator('column', function (settings, column) {
					if (vis === undefined) {
						return settings.aoColumns[column].bVisible;
					} // else
					__setColumnVis(settings, column, vis);
				});

				// Group the column visibility changes
				if (vis !== undefined) {
					// Second loop once the first is done for events
					this.iterator('column', function (settings, column) {
						_fnCallbackFire(settings, null, 'column-visibility', [settings, column, vis, calc]);
					});

					if (calc === undefined || calc) {
						this.columns.adjust();
					}
				}

				return ret;
			});

			_api_registerPlural('columns().indexes()', 'column().index()', function (type) {
				return this.iterator('column', function (settings, column) {
					return type === 'visible' ?
						_fnColumnIndexToVisible(settings, column) :
						column;
				}, 1);
			});

			_api_register('columns.adjust()', function () {
				return this.iterator('table', function (settings) {
					_fnAdjustColumnSizing(settings);
				}, 1);
			});

			_api_register('column.index()', function (type, idx) {
				if (this.context.length !== 0) {
					var ctx = this.context[0];

					if (type === 'fromVisible' || type === 'toData') {
						return _fnVisibleToColumnIndex(ctx, idx);
					} else if (type === 'fromData' || type === 'toVisible') {
						return _fnColumnIndexToVisible(ctx, idx);
					}
				}
			});

			_api_register('column()', function (selector, opts) {
				return _selector_first(this.columns(selector, opts));
			});



			var __cell_selector = function (settings, selector, opts) {
				var data = settings.aoData;
				var rows = _selector_row_indexes(settings, opts);
				var cells = _removeEmpty(_pluck_order(data, rows, 'anCells'));
				var allCells = $([].concat.apply([], cells));
				var row;
				var columns = settings.aoColumns.length;
				var a, i, ien, j, o, host;

				var run = function (s) {
					var fnSelector = typeof s === 'function';

					if (s === null || s === undefined || fnSelector) {
						// All cells and function selectors
						a = [];

						for (i = 0, ien = rows.length; i < ien; i++) {
							row = rows[i];

							for (j = 0; j < columns; j++) {
								o = {
									row: row,
									column: j
								};

								if (fnSelector) {
									// Selector - function
									host = data[row];

									if (s(o, _fnGetCellData(settings, row, j), host.anCells ? host.anCells[j] : null)) {
										a.push(o);
									}
								} else {
									// Selector - all
									a.push(o);
								}
							}
						}

						return a;
					}

					// Selector - index
					if ($.isPlainObject(s)) {
						// Valid cell index and its in the array of selectable rows
						return s.column !== undefined && s.row !== undefined && $.inArray(s.row, rows) !== -1 ? [s] : [];
					}

					// Selector - jQuery filtered cells
					var jqResult = allCells
						.filter(s)
						.map(function (i, el) {
							return { // use a new object, in case someone changes the values
								row: el._DT_CellIndex.row,
								column: el._DT_CellIndex.column
							};
						})
						.toArray();

					if (jqResult.length || !s.nodeName) {
						return jqResult;
					}

					// Otherwise the selector is a node, and there is one last option - the
					// element might be a child of an element which has dt-row and dt-column
					// data attributes
					host = $(s).closest('*[data-dt-row]');
					return host.length ? [{
						row: host.data('dt-row'),
						column: host.data('dt-column')
					}] : [];
				};

				return _selector_run('cell', selector, run, settings, opts);
			};




			_api_register('cells()', function (rowSelector, columnSelector, opts) {
				// Argument shifting
				if ($.isPlainObject(rowSelector)) {
					// Indexes
					if (rowSelector.row === undefined) {
						// Selector options in first parameter
						opts = rowSelector;
						rowSelector = null;
					} else {
						// Cell index objects in first parameter
						opts = columnSelector;
						columnSelector = null;
					}
				}
				if ($.isPlainObject(columnSelector)) {
					opts = columnSelector;
					columnSelector = null;
				}

				// Cell selector
				if (columnSelector === null || columnSelector === undefined) {
					return this.iterator('table', function (settings) {
						return __cell_selector(settings, rowSelector, _selector_opts(opts));
					});
				}

				// Row + column selector
				var columns = this.columns(columnSelector);
				var rows = this.rows(rowSelector);
				var a, i, ien, j, jen;

				this.iterator('table', function (settings, idx) {
					a = [];

					for (i = 0, ien = rows[idx].length; i < ien; i++) {
						for (j = 0, jen = columns[idx].length; j < jen; j++) {
							a.push({
								row: rows[idx][i],
								column: columns[idx][j]
							});
						}
					}
				}, 1);

				// Now pass through the cell selector for options
				var cells = this.cells(a, opts);

				$.extend(cells.selector, {
					cols: columnSelector,
					rows: rowSelector,
					opts: opts
				});

				return cells;
			});


			_api_registerPlural('cells().nodes()', 'cell().node()', function () {
				return this.iterator('cell', function (settings, row, column) {
					var data = settings.aoData[row];

					return data && data.anCells ?
						data.anCells[column] :
						undefined;
				}, 1);
			});


			_api_register('cells().data()', function () {
				return this.iterator('cell', function (settings, row, column) {
					return _fnGetCellData(settings, row, column);
				}, 1);
			});


			_api_registerPlural('cells().cache()', 'cell().cache()', function (type) {
				type = type === 'search' ? '_aFilterData' : '_aSortData';

				return this.iterator('cell', function (settings, row, column) {
					return settings.aoData[row][type][column];
				}, 1);
			});


			_api_registerPlural('cells().render()', 'cell().render()', function (type) {
				return this.iterator('cell', function (settings, row, column) {
					return _fnGetCellData(settings, row, column, type);
				}, 1);
			});


			_api_registerPlural('cells().indexes()', 'cell().index()', function () {
				return this.iterator('cell', function (settings, row, column) {
					return {
						row: row,
						column: column,
						columnVisible: _fnColumnIndexToVisible(settings, column)
					};
				}, 1);
			});


			_api_registerPlural('cells().invalidate()', 'cell().invalidate()', function (src) {
				return this.iterator('cell', function (settings, row, column) {
					_fnInvalidate(settings, row, src, column);
				});
			});



			_api_register('cell()', function (rowSelector, columnSelector, opts) {
				return _selector_first(this.cells(rowSelector, columnSelector, opts));
			});


			_api_register('cell().data()', function (data) {
				var ctx = this.context;
				var cell = this[0];

				if (data === undefined) {
					// Get
					return ctx.length && cell.length ?
						_fnGetCellData(ctx[0], cell[0].row, cell[0].column) :
						undefined;
				}

				// Set
				_fnSetCellData(ctx[0], cell[0].row, cell[0].column, data);
				_fnInvalidate(ctx[0], cell[0].row, 'data', cell[0].column);

				return this;
			});



			/**
			 * Get current ordering (sorting) that has been applied to the table.
			 *
			 * @returns {array} 2D array containing the sorting information for the first
			 *   table in the current context. Each element in the parent array represents
			 *   a column being sorted upon (i.e. multi-sorting with two columns would have
			 *   2 inner arrays). The inner arrays may have 2 or 3 elements. The first is
			 *   the column index that the sorting condition applies to, the second is the
			 *   direction of the sort (`desc` or `asc`) and, optionally, the third is the
			 *   index of the sorting order from the `column.sorting` initialisation array.
			 */
			/**
			 * Set the ordering for the table.
			 *
			 * @param {integer} order Column index to sort upon.
			 * @param {string} direction Direction of the sort to be applied (`asc` or `desc`)
			 * @returns {DataTables.Api} this
			 */
			/**
			 * Set the ordering for the table.
			 *
			 * @param {array} order 1D array of sorting information to be applied.
			 * @param {array} [...] Optional additional sorting conditions
			 * @returns {DataTables.Api} this
			 */
			/**
			 * Set the ordering for the table.
			 *
			 * @param {array} order 2D array of sorting information to be applied.
			 * @returns {DataTables.Api} this
			 */
			_api_register('order()', function (order, dir) {
				var ctx = this.context;

				if (order === undefined) {
					// get
					return ctx.length !== 0 ?
						ctx[0].aaSorting :
						undefined;
				}

				// set
				if (typeof order === 'number') {
					// Simple column / direction passed in
					order = [
						[order, dir]
					];
				} else if (order.length && !$.isArray(order[0])) {
					// Arguments passed in (list of 1D arrays)
					order = Array.prototype.slice.call(arguments);
				}
				// otherwise a 2D array was passed in

				return this.iterator('table', function (settings) {
					settings.aaSorting = order.slice();
				});
			});


			/**
			 * Attach a sort listener to an element for a given column
			 *
			 * @param {node|jQuery|string} node Identifier for the element(s) to attach the
			 *   listener to. This can take the form of a single DOM node, a jQuery
			 *   collection of nodes or a jQuery selector which will identify the node(s).
			 * @param {integer} column the column that a click on this node will sort on
			 * @param {function} [callback] callback function when sort is run
			 * @returns {DataTables.Api} this
			 */
			_api_register('order.listener()', function (node, column, callback) {
				return this.iterator('table', function (settings) {
					_fnSortAttachListener(settings, node, column, callback);
				});
			});


			_api_register('order.fixed()', function (set) {
				if (!set) {
					var ctx = this.context;
					var fixed = ctx.length ?
						ctx[0].aaSortingFixed :
						undefined;

					return $.isArray(fixed) ? {
							pre: fixed
						} :
						fixed;
				}

				return this.iterator('table', function (settings) {
					settings.aaSortingFixed = $.extend(true, {}, set);
				});
			});


			// Order by the selected column(s)
			_api_register([
				'columns().order()',
				'column().order()'
			], function (dir) {
				var that = this;

				return this.iterator('table', function (settings, i) {
					var sort = [];

					$.each(that[i], function (j, col) {
						sort.push([col, dir]);
					});

					settings.aaSorting = sort;
				});
			});



			_api_register('search()', function (input, regex, smart, caseInsen) {
				var ctx = this.context;

				if (input === undefined) {
					// get
					return ctx.length !== 0 ?
						ctx[0].oPreviousSearch.sSearch :
						undefined;
				}

				// set
				return this.iterator('table', function (settings) {
					if (!settings.oFeatures.bFilter) {
						return;
					}

					_fnFilterComplete(settings, $.extend({}, settings.oPreviousSearch, {
						"sSearch": input + "",
						"bRegex": regex === null ? false : regex,
						"bSmart": smart === null ? true : smart,
						"bCaseInsensitive": caseInsen === null ? true : caseInsen
					}), 1);
				});
			});


			_api_registerPlural(
				'columns().search()',
				'column().search()',
				function (input, regex, smart, caseInsen) {
					return this.iterator('column', function (settings, column) {
						var preSearch = settings.aoPreSearchCols;

						if (input === undefined) {
							// get
							return preSearch[column].sSearch;
						}

						// set
						if (!settings.oFeatures.bFilter) {
							return;
						}

						$.extend(preSearch[column], {
							"sSearch": input + "",
							"bRegex": regex === null ? false : regex,
							"bSmart": smart === null ? true : smart,
							"bCaseInsensitive": caseInsen === null ? true : caseInsen
						});

						_fnFilterComplete(settings, settings.oPreviousSearch, 1);
					});
				}
			);

			/*
			 * State API methods
			 */

			_api_register('state()', function () {
				return this.context.length ?
					this.context[0].oSavedState :
					null;
			});


			_api_register('state.clear()', function () {
				return this.iterator('table', function (settings) {
					// Save an empty object
					settings.fnStateSaveCallback.call(settings.oInstance, settings, {});
				});
			});


			_api_register('state.loaded()', function () {
				return this.context.length ?
					this.context[0].oLoadedState :
					null;
			});


			_api_register('state.save()', function () {
				return this.iterator('table', function (settings) {
					_fnSaveState(settings);
				});
			});



			/**
			 * Provide a common method for plug-ins to check the version of DataTables being
			 * used, in order to ensure compatibility.
			 *
			 *  @param {string} version Version string to check for, in the format "X.Y.Z".
			 *    Note that the formats "X" and "X.Y" are also acceptable.
			 *  @returns {boolean} true if this version of DataTables is greater or equal to
			 *    the required version, or false if this version of DataTales is not
			 *    suitable
			 *  @static
			 *  @dtopt API-Static
			 *
			 *  @example
			 *    alert( $.fn.dataTable.versionCheck( '1.9.0' ) );
			 */
			DataTable.versionCheck = DataTable.fnVersionCheck = function (version) {
				var aThis = DataTable.version.split('.');
				var aThat = version.split('.');
				var iThis, iThat;

				for (var i = 0, iLen = aThat.length; i < iLen; i++) {
					iThis = parseInt(aThis[i], 10) || 0;
					iThat = parseInt(aThat[i], 10) || 0;

					// Parts are the same, keep comparing
					if (iThis === iThat) {
						continue;
					}

					// Parts are different, return immediately
					return iThis > iThat;
				}

				return true;
			};


			/**
			 * Check if a `<table>` node is a DataTable table already or not.
			 *
			 *  @param {node|jquery|string} table Table node, jQuery object or jQuery
			 *      selector for the table to test. Note that if more than more than one
			 *      table is passed on, only the first will be checked
			 *  @returns {boolean} true the table given is a DataTable, or false otherwise
			 *  @static
			 *  @dtopt API-Static
			 *
			 *  @example
			 *    if ( ! $.fn.DataTable.isDataTable( '#example' ) ) {
			 *      $('#example').dataTable();
			 *    }
			 */
			DataTable.isDataTable = DataTable.fnIsDataTable = function (table) {
				var t = $(table).get(0);
				var is = false;

				if (table instanceof DataTable.Api) {
					return true;
				}

				$.each(DataTable.settings, function (i, o) {
					var head = o.nScrollHead ? $('table', o.nScrollHead)[0] : null;
					var foot = o.nScrollFoot ? $('table', o.nScrollFoot)[0] : null;

					if (o.nTable === t || head === t || foot === t) {
						is = true;
					}
				});

				return is;
			};


			/**
			 * Get all DataTable tables that have been initialised - optionally you can
			 * select to get only currently visible tables.
			 *
			 *  @param {boolean} [visible=false] Flag to indicate if you want all (default)
			 *    or visible tables only.
			 *  @returns {array} Array of `table` nodes (not DataTable instances) which are
			 *    DataTables
			 *  @static
			 *  @dtopt API-Static
			 *
			 *  @example
			 *    $.each( $.fn.dataTable.tables(true), function () {
			 *      $(table).DataTable().columns.adjust();
			 *    } );
			 */
			DataTable.tables = DataTable.fnTables = function (visible) {
				var api = false;

				if ($.isPlainObject(visible)) {
					api = visible.api;
					visible = visible.visible;
				}

				var a = $.map(DataTable.settings, function (o) {
					if (!visible || (visible && $(o.nTable).is(':visible'))) {
						return o.nTable;
					}
				});

				return api ?
					new _Api(a) :
					a;
			};


			/**
			 * Convert from camel case parameters to Hungarian notation. This is made public
			 * for the extensions to provide the same ability as DataTables core to accept
			 * either the 1.9 style Hungarian notation, or the 1.10+ style camelCase
			 * parameters.
			 *
			 *  @param {object} src The model object which holds all parameters that can be
			 *    mapped.
			 *  @param {object} user The object to convert from camel case to Hungarian.
			 *  @param {boolean} force When set to `true`, properties which already have a
			 *    Hungarian value in the `user` object will be overwritten. Otherwise they
			 *    won't be.
			 */
			DataTable.camelToHungarian = _fnCamelToHungarian;



			/**
			 *
			 */
			_api_register('$()', function (selector, opts) {
				var
					rows = this.rows(opts).nodes(), // Get all rows
					jqRows = $(rows);

				return $([].concat(
					jqRows.filter(selector).toArray(),
					jqRows.find(selector).toArray()
				));
			});


			// jQuery functions to operate on the tables
			$.each(['on', 'one', 'off'], function (i, key) {
				_api_register(key + '()', function ( /* event, handler */ ) {
					var args = Array.prototype.slice.call(arguments);

					// Add the `dt` namespace automatically if it isn't already present
					args[0] = $.map(args[0].split(/\s/), function (e) {
						return !e.match(/\.dt\b/) ?
							e + '.dt' :
							e;
					}).join(' ');

					var inst = $(this.tables().nodes());
					inst[key].apply(inst, args);
					return this;
				});
			});


			_api_register('clear()', function () {
				return this.iterator('table', function (settings) {
					_fnClearTable(settings);
				});
			});


			_api_register('settings()', function () {
				return new _Api(this.context, this.context);
			});


			_api_register('init()', function () {
				var ctx = this.context;
				return ctx.length ? ctx[0].oInit : null;
			});


			_api_register('data()', function () {
				return this.iterator('table', function (settings) {
					return _pluck(settings.aoData, '_aData');
				}).flatten();
			});


			_api_register('destroy()', function (remove) {
				remove = remove || false;

				return this.iterator('table', function (settings) {
					var orig = settings.nTableWrapper.parentNode;
					var classes = settings.oClasses;
					var table = settings.nTable;
					var tbody = settings.nTBody;
					var thead = settings.nTHead;
					var tfoot = settings.nTFoot;
					var jqTable = $(table);
					var jqTbody = $(tbody);
					var jqWrapper = $(settings.nTableWrapper);
					var rows = $.map(settings.aoData, function (r) {
						return r.nTr;
					});
					var i, ien;

					// Flag to note that the table is currently being destroyed - no action
					// should be taken
					settings.bDestroying = true;

					// Fire off the destroy callbacks for plug-ins etc
					_fnCallbackFire(settings, "aoDestroyCallback", "destroy", [settings]);

					// If not being removed from the document, make all columns visible
					if (!remove) {
						new _Api(settings).columns().visible(true);
					}

					// Blitz all `DT` namespaced events (these are internal events, the
					// lowercase, `dt` events are user subscribed and they are responsible
					// for removing them
					jqWrapper.off('.DT').find(':not(tbody *)').off('.DT');
					$(window).off('.DT-' + settings.sInstance);

					// When scrolling we had to break the table up - restore it
					if (table != thead.parentNode) {
						jqTable.children('thead').detach();
						jqTable.append(thead);
					}

					if (tfoot && table != tfoot.parentNode) {
						jqTable.children('tfoot').detach();
						jqTable.append(tfoot);
					}

					settings.aaSorting = [];
					settings.aaSortingFixed = [];
					_fnSortingClasses(settings);

					$(rows).removeClass(settings.asStripeClasses.join(' '));

					$('th, td', thead).removeClass(classes.sSortable + ' ' +
						classes.sSortableAsc + ' ' + classes.sSortableDesc + ' ' + classes.sSortableNone
					);

					// Add the TR elements back into the table in their original order
					jqTbody.children().detach();
					jqTbody.append(rows);

					// Remove the DataTables generated nodes, events and classes
					var removedMethod = remove ? 'remove' : 'detach';
					jqTable[removedMethod]();
					jqWrapper[removedMethod]();

					// If we need to reattach the table to the document
					if (!remove && orig) {
						// insertBefore acts like appendChild if !arg[1]
						orig.insertBefore(table, settings.nTableReinsertBefore);

						// Restore the width of the original table - was read from the style property,
						// so we can restore directly to that
						jqTable
							.css('width', settings.sDestroyWidth)
							.removeClass(classes.sTable);

						// If the were originally stripe classes - then we add them back here.
						// Note this is not fool proof (for example if not all rows had stripe
						// classes - but it's a good effort without getting carried away
						ien = settings.asDestroyStripes.length;

						if (ien) {
							jqTbody.children().each(function (i) {
								$(this).addClass(settings.asDestroyStripes[i % ien]);
							});
						}
					}

					/* Remove the settings object from the settings array */
					var idx = $.inArray(settings, DataTable.settings);
					if (idx !== -1) {
						DataTable.settings.splice(idx, 1);
					}
				});
			});


			// Add the `every()` method for rows, columns and cells in a compact form
			$.each(['column', 'row', 'cell'], function (i, type) {
				_api_register(type + 's().every()', function (fn) {
					var opts = this.selector.opts;
					var api = this;

					return this.iterator(type, function (settings, arg1, arg2, arg3, arg4) {
						// Rows and columns:
						//  arg1 - index
						//  arg2 - table counter
						//  arg3 - loop counter
						//  arg4 - undefined
						// Cells:
						//  arg1 - row index
						//  arg2 - column index
						//  arg3 - table counter
						//  arg4 - loop counter
						fn.call(
							api[type](
								arg1,
								type === 'cell' ? arg2 : opts,
								type === 'cell' ? opts : undefined
							),
							arg1, arg2, arg3, arg4
						);
					});
				});
			});


			// i18n method for extensions to be able to use the language object from the
			// DataTable
			_api_register('i18n()', function (token, def, plural) {
				var ctx = this.context[0];
				var resolved = _fnGetObjectDataFn(token)(ctx.oLanguage);

				if (resolved === undefined) {
					resolved = def;
				}

				if (plural !== undefined && $.isPlainObject(resolved)) {
					resolved = resolved[plural] !== undefined ?
						resolved[plural] :
						resolved._;
				}

				return resolved.replace('%d', plural); // nb: plural might be undefined,
			});

			/**
			 * Version string for plug-ins to check compatibility. Allowed format is
			 * `a.b.c-d` where: a:int, b:int, c:int, d:string(dev|beta|alpha). `d` is used
			 * only for non-release builds. See http://semver.org/ for more information.
			 *  @member
			 *  @type string
			 *  @default Version number
			 */
			DataTable.version = "1.10.18";

			/**
			 * Private data store, containing all of the settings objects that are
			 * created for the tables on a given page.
			 *
			 * Note that the `DataTable.settings` object is aliased to
			 * `jQuery.fn.dataTableExt` through which it may be accessed and
			 * manipulated, or `jQuery.fn.dataTable.settings`.
			 *  @member
			 *  @type array
			 *  @default []
			 *  @private
			 */
			DataTable.settings = [];

			/**
			 * Object models container, for the various models that DataTables has
			 * available to it. These models define the objects that are used to hold
			 * the active state and configuration of the table.
			 *  @namespace
			 */
			DataTable.models = {};



			/**
			 * Template object for the way in which DataTables holds information about
			 * search information for the global filter and individual column filters.
			 *  @namespace
			 */
			DataTable.models.oSearch = {
				/**
				 * Flag to indicate if the filtering should be case insensitive or not
				 *  @type boolean
				 *  @default true
				 */
				"bCaseInsensitive": true,

				/**
				 * Applied search term
				 *  @type string
				 *  @default <i>Empty string</i>
				 */
				"sSearch": "",

				/**
				 * Flag to indicate if the search term should be interpreted as a
				 * regular expression (true) or not (false) and therefore and special
				 * regex characters escaped.
				 *  @type boolean
				 *  @default false
				 */
				"bRegex": false,

				/**
				 * Flag to indicate if DataTables is to use its smart filtering or not.
				 *  @type boolean
				 *  @default true
				 */
				"bSmart": true
			};




			/**
			 * Template object for the way in which DataTables holds information about
			 * each individual row. This is the object format used for the settings
			 * aoData array.
			 *  @namespace
			 */
			DataTable.models.oRow = {
				/**
				 * TR element for the row
				 *  @type node
				 *  @default null
				 */
				"nTr": null,

				/**
				 * Array of TD elements for each row. This is null until the row has been
				 * created.
				 *  @type array nodes
				 *  @default []
				 */
				"anCells": null,

				/**
				 * Data object from the original data source for the row. This is either
				 * an array if using the traditional form of DataTables, or an object if
				 * using mData options. The exact type will depend on the passed in
				 * data from the data source, or will be an array if using DOM a data
				 * source.
				 *  @type array|object
				 *  @default []
				 */
				"_aData": [],

				/**
				 * Sorting data cache - this array is ostensibly the same length as the
				 * number of columns (although each index is generated only as it is
				 * needed), and holds the data that is used for sorting each column in the
				 * row. We do this cache generation at the start of the sort in order that
				 * the formatting of the sort data need be done only once for each cell
				 * per sort. This array should not be read from or written to by anything
				 * other than the master sorting methods.
				 *  @type array
				 *  @default null
				 *  @private
				 */
				"_aSortData": null,

				/**
				 * Per cell filtering data cache. As per the sort data cache, used to
				 * increase the performance of the filtering in DataTables
				 *  @type array
				 *  @default null
				 *  @private
				 */
				"_aFilterData": null,

				/**
				 * Filtering data cache. This is the same as the cell filtering cache, but
				 * in this case a string rather than an array. This is easily computed with
				 * a join on `_aFilterData`, but is provided as a cache so the join isn't
				 * needed on every search (memory traded for performance)
				 *  @type array
				 *  @default null
				 *  @private
				 */
				"_sFilterRow": null,

				/**
				 * Cache of the class name that DataTables has applied to the row, so we
				 * can quickly look at this variable rather than needing to do a DOM check
				 * on className for the nTr property.
				 *  @type string
				 *  @default <i>Empty string</i>
				 *  @private
				 */
				"_sRowStripe": "",

				/**
				 * Denote if the original data source was from the DOM, or the data source
				 * object. This is used for invalidating data, so DataTables can
				 * automatically read data from the original source, unless uninstructed
				 * otherwise.
				 *  @type string
				 *  @default null
				 *  @private
				 */
				"src": null,

				/**
				 * Index in the aoData array. This saves an indexOf lookup when we have the
				 * object, but want to know the index
				 *  @type integer
				 *  @default -1
				 *  @private
				 */
				"idx": -1
			};


			/**
			 * Template object for the column information object in DataTables. This object
			 * is held in the settings aoColumns array and contains all the information that
			 * DataTables needs about each individual column.
			 *
			 * Note that this object is related to {@link DataTable.defaults.column}
			 * but this one is the internal data store for DataTables's cache of columns.
			 * It should NOT be manipulated outside of DataTables. Any configuration should
			 * be done through the initialisation options.
			 *  @namespace
			 */
			DataTable.models.oColumn = {
				/**
				 * Column index. This could be worked out on-the-fly with $.inArray, but it
				 * is faster to just hold it as a variable
				 *  @type integer
				 *  @default null
				 */
				"idx": null,

				/**
				 * A list of the columns that sorting should occur on when this column
				 * is sorted. That this property is an array allows multi-column sorting
				 * to be defined for a column (for example first name / last name columns
				 * would benefit from this). The values are integers pointing to the
				 * columns to be sorted on (typically it will be a single integer pointing
				 * at itself, but that doesn't need to be the case).
				 *  @type array
				 */
				"aDataSort": null,

				/**
				 * Define the sorting directions that are applied to the column, in sequence
				 * as the column is repeatedly sorted upon - i.e. the first value is used
				 * as the sorting direction when the column if first sorted (clicked on).
				 * Sort it again (click again) and it will move on to the next index.
				 * Repeat until loop.
				 *  @type array
				 */
				"asSorting": null,

				/**
				 * Flag to indicate if the column is searchable, and thus should be included
				 * in the filtering or not.
				 *  @type boolean
				 */
				"bSearchable": null,

				/**
				 * Flag to indicate if the column is sortable or not.
				 *  @type boolean
				 */
				"bSortable": null,

				/**
				 * Flag to indicate if the column is currently visible in the table or not
				 *  @type boolean
				 */
				"bVisible": null,

				/**
				 * Store for manual type assignment using the `column.type` option. This
				 * is held in store so we can manipulate the column's `sType` property.
				 *  @type string
				 *  @default null
				 *  @private
				 */
				"_sManualType": null,

				/**
				 * Flag to indicate if HTML5 data attributes should be used as the data
				 * source for filtering or sorting. True is either are.
				 *  @type boolean
				 *  @default false
				 *  @private
				 */
				"_bAttrSrc": false,

				/**
				 * Developer definable function that is called whenever a cell is created (Ajax source,
				 * etc) or processed for input (DOM source). This can be used as a compliment to mRender
				 * allowing you to modify the DOM element (add background colour for example) when the
				 * element is available.
				 *  @type function
				 *  @param {element} nTd The TD node that has been created
				 *  @param {*} sData The Data for the cell
				 *  @param {array|object} oData The data for the whole row
				 *  @param {int} iRow The row index for the aoData data store
				 *  @default null
				 */
				"fnCreatedCell": null,

				/**
				 * Function to get data from a cell in a column. You should <b>never</b>
				 * access data directly through _aData internally in DataTables - always use
				 * the method attached to this property. It allows mData to function as
				 * required. This function is automatically assigned by the column
				 * initialisation method
				 *  @type function
				 *  @param {array|object} oData The data array/object for the array
				 *    (i.e. aoData[]._aData)
				 *  @param {string} sSpecific The specific data type you want to get -
				 *    'display', 'type' 'filter' 'sort'
				 *  @returns {*} The data for the cell from the given row's data
				 *  @default null
				 */
				"fnGetData": null,

				/**
				 * Function to set data for a cell in the column. You should <b>never</b>
				 * set the data directly to _aData internally in DataTables - always use
				 * this method. It allows mData to function as required. This function
				 * is automatically assigned by the column initialisation method
				 *  @type function
				 *  @param {array|object} oData The data array/object for the array
				 *    (i.e. aoData[]._aData)
				 *  @param {*} sValue Value to set
				 *  @default null
				 */
				"fnSetData": null,

				/**
				 * Property to read the value for the cells in the column from the data
				 * source array / object. If null, then the default content is used, if a
				 * function is given then the return from the function is used.
				 *  @type function|int|string|null
				 *  @default null
				 */
				"mData": null,

				/**
				 * Partner property to mData which is used (only when defined) to get
				 * the data - i.e. it is basically the same as mData, but without the
				 * 'set' option, and also the data fed to it is the result from mData.
				 * This is the rendering method to match the data method of mData.
				 *  @type function|int|string|null
				 *  @default null
				 */
				"mRender": null,

				/**
				 * Unique header TH/TD element for this column - this is what the sorting
				 * listener is attached to (if sorting is enabled.)
				 *  @type node
				 *  @default null
				 */
				"nTh": null,

				/**
				 * Unique footer TH/TD element for this column (if there is one). Not used
				 * in DataTables as such, but can be used for plug-ins to reference the
				 * footer for each column.
				 *  @type node
				 *  @default null
				 */
				"nTf": null,

				/**
				 * The class to apply to all TD elements in the table's TBODY for the column
				 *  @type string
				 *  @default null
				 */
				"sClass": null,

				/**
				 * When DataTables calculates the column widths to assign to each column,
				 * it finds the longest string in each column and then constructs a
				 * temporary table and reads the widths from that. The problem with this
				 * is that "mmm" is much wider then "iiii", but the latter is a longer
				 * string - thus the calculation can go wrong (doing it properly and putting
				 * it into an DOM object and measuring that is horribly(!) slow). Thus as
				 * a "work around" we provide this option. It will append its value to the
				 * text that is found to be the longest string for the column - i.e. padding.
				 *  @type string
				 */
				"sContentPadding": null,

				/**
				 * Allows a default value to be given for a column's data, and will be used
				 * whenever a null data source is encountered (this can be because mData
				 * is set to null, or because the data source itself is null).
				 *  @type string
				 *  @default null
				 */
				"sDefaultContent": null,

				/**
				 * Name for the column, allowing reference to the column by name as well as
				 * by index (needs a lookup to work by name).
				 *  @type string
				 */
				"sName": null,

				/**
				 * Custom sorting data type - defines which of the available plug-ins in
				 * afnSortData the custom sorting will use - if any is defined.
				 *  @type string
				 *  @default std
				 */
				"sSortDataType": 'std',

				/**
				 * Class to be applied to the header element when sorting on this column
				 *  @type string
				 *  @default null
				 */
				"sSortingClass": null,

				/**
				 * Class to be applied to the header element when sorting on this column -
				 * when jQuery UI theming is used.
				 *  @type string
				 *  @default null
				 */
				"sSortingClassJUI": null,

				/**
				 * Title of the column - what is seen in the TH element (nTh).
				 *  @type string
				 */
				"sTitle": null,

				/**
				 * Column sorting and filtering type
				 *  @type string
				 *  @default null
				 */
				"sType": null,

				/**
				 * Width of the column
				 *  @type string
				 *  @default null
				 */
				"sWidth": null,

				/**
				 * Width of the column when it was first "encountered"
				 *  @type string
				 *  @default null
				 */
				"sWidthOrig": null
			};


			/*
			 * Developer note: The properties of the object below are given in Hungarian
			 * notation, that was used as the interface for DataTables prior to v1.10, however
			 * from v1.10 onwards the primary interface is camel case. In order to avoid
			 * breaking backwards compatibility utterly with this change, the Hungarian
			 * version is still, internally the primary interface, but is is not documented
			 * - hence the @name tags in each doc comment. This allows a Javascript function
			 * to create a map from Hungarian notation to camel case (going the other direction
			 * would require each property to be listed, which would at around 3K to the size
			 * of DataTables, while this method is about a 0.5K hit.
			 *
			 * Ultimately this does pave the way for Hungarian notation to be dropped
			 * completely, but that is a massive amount of work and will break current
			 * installs (therefore is on-hold until v2).
			 */

			/**
			 * Initialisation options that can be given to DataTables at initialisation
			 * time.
			 *  @namespace
			 */
			DataTable.defaults = {
				/**
				 * An array of data to use for the table, passed in at initialisation which
				 * will be used in preference to any data which is already in the DOM. This is
				 * particularly useful for constructing tables purely in Javascript, for
				 * example with a custom Ajax call.
				 *  @type array
				 *  @default null
				 *
				 *  @dtopt Option
				 *  @name DataTable.defaults.data
				 *
				 *  @example
				 *    // Using a 2D array data source
				 *    $(document).ready( function () {
				 *      $('#example').dataTable( {
				 *        "data": [
				 *          ['Trident', 'Internet Explorer 4.0', 'Win 95+', 4, 'X'],
				 *          ['Trident', 'Internet Explorer 5.0', 'Win 95+', 5, 'C'],
				 *        ],
				 *        "columns": [
				 *          { "title": "Engine" },
				 *          { "title": "Browser" },
				 *          { "title": "Platform" },
				 *          { "title": "Version" },
				 *          { "title": "Grade" }
				 *        ]
				 *      } );
				 *    } );
				 *
				 *  @example
				 *    // Using an array of objects as a data source (`data`)
				 *    $(document).ready( function () {
				 *      $('#example').dataTable( {
				 *        "data": [
				 *          {
				 *            "engine":   "Trident",
				 *            "browser":  "Internet Explorer 4.0",
				 *            "platform": "Win 95+",
				 *            "version":  4,
				 *            "grade":    "X"
				 *          },
				 *          {
				 *            "engine":   "Trident",
				 *            "browser":  "Internet Explorer 5.0",
				 *            "platform": "Win 95+",
				 *            "version":  5,
				 *            "grade":    "C"
				 *          }
				 *        ],
				 *        "columns": [
				 *          { "title": "Engine",   "data": "engine" },
				 *          { "title": "Browser",  "data": "browser" },
				 *          { "title": "Platform", "data": "platform" },
				 *          { "title": "Version",  "data": "version" },
				 *          { "title": "Grade",    "data": "grade" }
				 *        ]
				 *      } );
				 *    } );
				 */
				"aaData": null,


				/**
				 * If ordering is enabled, then DataTables will perform a first pass sort on
				 * initialisation. You can define which column(s) the sort is performed
				 * upon, and the sorting direction, with this variable. The `sorting` array
				 * should contain an array for each column to be sorted initially containing
				 * the column's index and a direction string ('asc' or 'desc').
				 *  @type array
				 *  @default [[0,'asc']]
				 *
				 *  @dtopt Option
				 *  @name DataTable.defaults.order
				 *
				 *  @example
				 *    // Sort by 3rd column first, and then 4th column
				 *    $(document).ready( function() {
				 *      $('#example').dataTable( {
				 *        "order": [[2,'asc'], [3,'desc']]
				 *      } );
				 *    } );
				 *
				 *    // No initial sorting
				 *    $(document).ready( function() {
				 *      $('#example').dataTable( {
				 *        "order": []
				 *      } );
				 *    } );
				 */
				"aaSorting": [
					[0, 'asc']
				],


				/**
				 * This parameter is basically identical to the `sorting` parameter, but
				 * cannot be overridden by user interaction with the table. What this means
				 * is that you could have a column (visible or hidden) which the sorting
				 * will always be forced on first - any sorting after that (from the user)
				 * will then be performed as required. This can be useful for grouping rows
				 * together.
				 *  @type array
				 *  @default null
				 *
				 *  @dtopt Option
				 *  @name DataTable.defaults.orderFixed
				 *
				 *  @example
				 *    $(document).ready( function() {
				 *      $('#example').dataTable( {
				 *        "orderFixed": [[0,'asc']]
				 *      } );
				 *    } )
				 */
				"aaSortingFixed": [],


				/**
				 * DataTables can be instructed to load data to display in the table from a
				 * Ajax source. This option defines how that Ajax call is made and where to.
				 *
				 * The `ajax` property has three different modes of operation, depending on
				 * how it is defined. These are:
				 *
				 * * `string` - Set the URL from where the data should be loaded from.
				 * * `object` - Define properties for `jQuery.ajax`.
				 * * `function` - Custom data get function
				 *
				 * `string`
				 * --------
				 *
				 * As a string, the `ajax` property simply defines the URL from which
				 * DataTables will load data.
				 *
				 * `object`
				 * --------
				 *
				 * As an object, the parameters in the object are passed to
				 * [jQuery.ajax](http://api.jquery.com/jQuery.ajax/) allowing fine control
				 * of the Ajax request. DataTables has a number of default parameters which
				 * you can override using this option. Please refer to the jQuery
				 * documentation for a full description of the options available, although
				 * the following parameters provide additional options in DataTables or
				 * require special consideration:
				 *
				 * * `data` - As with jQuery, `data` can be provided as an object, but it
				 *   can also be used as a function to manipulate the data DataTables sends
				 *   to the server. The function takes a single parameter, an object of
				 *   parameters with the values that DataTables has readied for sending. An
				 *   object may be returned which will be merged into the DataTables
				 *   defaults, or you can add the items to the object that was passed in and
				 *   not return anything from the function. This supersedes `fnServerParams`
				 *   from DataTables 1.9-.
				 *
				 * * `dataSrc` - By default DataTables will look for the property `data` (or
				 *   `aaData` for compatibility with DataTables 1.9-) when obtaining data
				 *   from an Ajax source or for server-side processing - this parameter
				 *   allows that property to be changed. You can use Javascript dotted
				 *   object notation to get a data source for multiple levels of nesting, or
				 *   it my be used as a function. As a function it takes a single parameter,
				 *   the JSON returned from the server, which can be manipulated as
				 *   required, with the returned value being that used by DataTables as the
				 *   data source for the table. This supersedes `sAjaxDataProp` from
				 *   DataTables 1.9-.
				 *
				 * * `success` - Should not be overridden it is used internally in
				 *   DataTables. To manipulate / transform the data returned by the server
				 *   use `ajax.dataSrc`, or use `ajax` as a function (see below).
				 *
				 * `function`
				 * ----------
				 *
				 * As a function, making the Ajax call is left up to yourself allowing
				 * complete control of the Ajax request. Indeed, if desired, a method other
				 * than Ajax could be used to obtain the required data, such as Web storage
				 * or an AIR database.
				 *
				 * The function is given four parameters and no return is required. The
				 * parameters are:
				 *
				 * 1. _object_ - Data to send to the server
				 * 2. _function_ - Callback function that must be executed when the required
				 *    data has been obtained. That data should be passed into the callback
				 *    as the only parameter
				 * 3. _object_ - DataTables settings object for the table
				 *
				 * Note that this supersedes `fnServerData` from DataTables 1.9-.
				 *
				 *  @type string|object|function
				 *  @default null
				 *
				 *  @dtopt Option
				 *  @name DataTable.defaults.ajax
				 *  @since 1.10.0
				 *
				 * @example
				 *   // Get JSON data from a file via Ajax.
				 *   // Note DataTables expects data in the form `{ data: [ ...data... ] }` by default).
				 *   $('#example').dataTable( {
				 *     "ajax": "data.json"
				 *   } );
				 *
				 * @example
				 *   // Get JSON data from a file via Ajax, using `dataSrc` to change
				 *   // `data` to `tableData` (i.e. `{ tableData: [ ...data... ] }`)
				 *   $('#example').dataTable( {
				 *     "ajax": {
				 *       "url": "data.json",
				 *       "dataSrc": "tableData"
				 *     }
				 *   } );
				 *
				 * @example
				 *   // Get JSON data from a file via Ajax, using `dataSrc` to read data
				 *   // from a plain array rather than an array in an object
				 *   $('#example').dataTable( {
				 *     "ajax": {
				 *       "url": "data.json",
				 *       "dataSrc": ""
				 *     }
				 *   } );
				 *
				 * @example
				 *   // Manipulate the data returned from the server - add a link to data
				 *   // (note this can, should, be done using `render` for the column - this
				 *   // is just a simple example of how the data can be manipulated).
				 *   $('#example').dataTable( {
				 *     "ajax": {
				 *       "url": "data.json",
				 *       "dataSrc": function ( json ) {
				 *         for ( var i=0, ien=json.length ; i<ien ; i++ ) {
				 *           json[i][0] = '<a href="/message/'+json[i][0]+'>View message</a>';
				 *         }
				 *         return json;
				 *       }
				 *     }
				 *   } );
				 *
				 * @example
				 *   // Add data to the request
				 *   $('#example').dataTable( {
				 *     "ajax": {
				 *       "url": "data.json",
				 *       "data": function ( d ) {
				 *         return {
				 *           "extra_search": $('#extra').val()
				 *         };
				 *       }
				 *     }
				 *   } );
				 *
				 * @example
				 *   // Send request as POST
				 *   $('#example').dataTable( {
				 *     "ajax": {
				 *       "url": "data.json",
				 *       "type": "POST"
				 *     }
				 *   } );
				 *
				 * @example
				 *   // Get the data from localStorage (could interface with a form for
				 *   // adding, editing and removing rows).
				 *   $('#example').dataTable( {
				 *     "ajax": function (data, callback, settings) {
				 *       callback(
				 *         JSON.parse( localStorage.getItem('dataTablesData') )
				 *       );
				 *     }
				 *   } );
				 */
				"ajax": null,


				/**
				 * This parameter allows you to readily specify the entries in the length drop
				 * down menu that DataTables shows when pagination is enabled. It can be
				 * either a 1D array of options which will be used for both the displayed
				 * option and the value, or a 2D array which will use the array in the first
				 * position as the value, and the array in the second position as the
				 * displayed options (useful for language strings such as 'All').
				 *
				 * Note that the `pageLength` property will be automatically set to the
				 * first value given in this array, unless `pageLength` is also provided.
				 *  @type array
				 *  @default [ 10, 25, 50, 100 ]
				 *
				 *  @dtopt Option
				 *  @name DataTable.defaults.lengthMenu
				 *
				 *  @example
				 *    $(document).ready( function() {
				 *      $('#example').dataTable( {
				 *        "lengthMenu": [[10, 25, 50, -1], [10, 25, 50, "All"]]
				 *      } );
				 *    } );
				 */
				"aLengthMenu": [10, 25, 50, 100],


				/**
				 * The `columns` option in the initialisation parameter allows you to define
				 * details about the way individual columns behave. For a full list of
				 * column options that can be set, please see
				 * {@link DataTable.defaults.column}. Note that if you use `columns` to
				 * define your columns, you must have an entry in the array for every single
				 * column that you have in your table (these can be null if you don't which
				 * to specify any options).
				 *  @member
				 *
				 *  @name DataTable.defaults.column
				 */
				"aoColumns": null,

				/**
				 * Very similar to `columns`, `columnDefs` allows you to target a specific
				 * column, multiple columns, or all columns, using the `targets` property of
				 * each object in the array. This allows great flexibility when creating
				 * tables, as the `columnDefs` arrays can be of any length, targeting the
				 * columns you specifically want. `columnDefs` may use any of the column
				 * options available: {@link DataTable.defaults.column}, but it _must_
				 * have `targets` defined in each object in the array. Values in the `targets`
				 * array may be:
				 *   <ul>
				 *     <li>a string - class name will be matched on the TH for the column</li>
				 *     <li>0 or a positive integer - column index counting from the left</li>
				 *     <li>a negative integer - column index counting from the right</li>
				 *     <li>the string "_all" - all columns (i.e. assign a default)</li>
				 *   </ul>
				 *  @member
				 *
				 *  @name DataTable.defaults.columnDefs
				 */
				"aoColumnDefs": null,


				/**
				 * Basically the same as `search`, this parameter defines the individual column
				 * filtering state at initialisation time. The array must be of the same size
				 * as the number of columns, and each element be an object with the parameters
				 * `search` and `escapeRegex` (the latter is optional). 'null' is also
				 * accepted and the default will be used.
				 *  @type array
				 *  @default []
				 *
				 *  @dtopt Option
				 *  @name DataTable.defaults.searchCols
				 *
				 *  @example
				 *    $(document).ready( function() {
				 *      $('#example').dataTable( {
				 *        "searchCols": [
				 *          null,
				 *          { "search": "My filter" },
				 *          null,
				 *          { "search": "^[0-9]", "escapeRegex": false }
				 *        ]
				 *      } );
				 *    } )
				 */
				"aoSearchCols": [],


				/**
				 * An array of CSS classes that should be applied to displayed rows. This
				 * array may be of any length, and DataTables will apply each class
				 * sequentially, looping when required.
				 *  @type array
				 *  @default null <i>Will take the values determined by the `oClasses.stripe*`
				 *    options</i>
				 *
				 *  @dtopt Option
				 *  @name DataTable.defaults.stripeClasses
				 *
				 *  @example
				 *    $(document).ready( function() {
				 *      $('#example').dataTable( {
				 *        "stripeClasses": [ 'strip1', 'strip2', 'strip3' ]
				 *      } );
				 *    } )
				 */
				"asStripeClasses": null,


				/**
				 * Enable or disable automatic column width calculation. This can be disabled
				 * as an optimisation (it takes some time to calculate the widths) if the
				 * tables widths are passed in using `columns`.
				 *  @type boolean
				 *  @default true
				 *
				 *  @dtopt Features
				 *  @name DataTable.defaults.autoWidth
				 *
				 *  @example
				 *    $(document).ready( function () {
				 *      $('#example').dataTable( {
				 *        "autoWidth": false
				 *      } );
				 *    } );
				 */
				"bAutoWidth": true,


				/**
				 * Deferred rendering can provide DataTables with a huge speed boost when you
				 * are using an Ajax or JS data source for the table. This option, when set to
				 * true, will cause DataTables to defer the creation of the table elements for
				 * each row until they are needed for a draw - saving a significant amount of
				 * time.
				 *  @type boolean
				 *  @default false
				 *
				 *  @dtopt Features
				 *  @name DataTable.defaults.deferRender
				 *
				 *  @example
				 *    $(document).ready( function() {
				 *      $('#example').dataTable( {
				 *        "ajax": "sources/arrays.txt",
				 *        "deferRender": true
				 *      } );
				 *    } );
				 */
				"bDeferRender": false,


				/**
				 * Replace a DataTable which matches the given selector and replace it with
				 * one which has the properties of the new initialisation object passed. If no
				 * table matches the selector, then the new DataTable will be constructed as
				 * per normal.
				 *  @type boolean
				 *  @default false
				 *
				 *  @dtopt Options
				 *  @name DataTable.defaults.destroy
				 *
				 *  @example
				 *    $(document).ready( function() {
				 *      $('#example').dataTable( {
				 *        "srollY": "200px",
				 *        "paginate": false
				 *      } );
				 *
				 *      // Some time later....
				 *      $('#example').dataTable( {
				 *        "filter": false,
				 *        "destroy": true
				 *      } );
				 *    } );
				 */
				"bDestroy": false,


				/**
				 * Enable or disable filtering of data. Filtering in DataTables is "smart" in
				 * that it allows the end user to input multiple words (space separated) and
				 * will match a row containing those words, even if not in the order that was
				 * specified (this allow matching across multiple columns). Note that if you
				 * wish to use filtering in DataTables this must remain 'true' - to remove the
				 * default filtering input box and retain filtering abilities, please use
				 * {@link DataTable.defaults.dom}.
				 *  @type boolean
				 *  @default true
				 *
				 *  @dtopt Features
				 *  @name DataTable.defaults.searching
				 *
				 *  @example
				 *    $(document).ready( function () {
				 *      $('#example').dataTable( {
				 *        "searching": false
				 *      } );
				 *    } );
				 */
				"bFilter": true,


				/**
				 * Enable or disable the table information display. This shows information
				 * about the data that is currently visible on the page, including information
				 * about filtered data if that action is being performed.
				 *  @type boolean
				 *  @default true
				 *
				 *  @dtopt Features
				 *  @name DataTable.defaults.info
				 *
				 *  @example
				 *    $(document).ready( function () {
				 *      $('#example').dataTable( {
				 *        "info": false
				 *      } );
				 *    } );
				 */
				"bInfo": true,


				/**
				 * Allows the end user to select the size of a formatted page from a select
				 * menu (sizes are 10, 25, 50 and 100). Requires pagination (`paginate`).
				 *  @type boolean
				 *  @default true
				 *
				 *  @dtopt Features
				 *  @name DataTable.defaults.lengthChange
				 *
				 *  @example
				 *    $(document).ready( function () {
				 *      $('#example').dataTable( {
				 *        "lengthChange": false
				 *      } );
				 *    } );
				 */
				"bLengthChange": true,


				/**
				 * Enable or disable pagination.
				 *  @type boolean
				 *  @default true
				 *
				 *  @dtopt Features
				 *  @name DataTable.defaults.paging
				 *
				 *  @example
				 *    $(document).ready( function () {
				 *      $('#example').dataTable( {
				 *        "paging": false
				 *      } );
				 *    } );
				 */
				"bPaginate": true,


				/**
				 * Enable or disable the display of a 'processing' indicator when the table is
				 * being processed (e.g. a sort). This is particularly useful for tables with
				 * large amounts of data where it can take a noticeable amount of time to sort
				 * the entries.
				 *  @type boolean
				 *  @default false
				 *
				 *  @dtopt Features
				 *  @name DataTable.defaults.processing
				 *
				 *  @example
				 *    $(document).ready( function () {
				 *      $('#example').dataTable( {
				 *        "processing": true
				 *      } );
				 *    } );
				 */
				"bProcessing": false,


				/**
				 * Retrieve the DataTables object for the given selector. Note that if the
				 * table has already been initialised, this parameter will cause DataTables
				 * to simply return the object that has already been set up - it will not take
				 * account of any changes you might have made to the initialisation object
				 * passed to DataTables (setting this parameter to true is an acknowledgement
				 * that you understand this). `destroy` can be used to reinitialise a table if
				 * you need.
				 *  @type boolean
				 *  @default false
				 *
				 *  @dtopt Options
				 *  @name DataTable.defaults.retrieve
				 *
				 *  @example
				 *    $(document).ready( function() {
				 *      initTable();
				 *      tableActions();
				 *    } );
				 *
				 *    function initTable ()
				 *    {
				 *      return $('#example').dataTable( {
				 *        "scrollY": "200px",
				 *        "paginate": false,
				 *        "retrieve": true
				 *      } );
				 *    }
				 *
				 *    function tableActions ()
				 *    {
				 *      var table = initTable();
				 *      // perform API operations with oTable
				 *    }
				 */
				"bRetrieve": false,


				/**
				 * When vertical (y) scrolling is enabled, DataTables will force the height of
				 * the table's viewport to the given height at all times (useful for layout).
				 * However, this can look odd when filtering data down to a small data set,
				 * and the footer is left "floating" further down. This parameter (when
				 * enabled) will cause DataTables to collapse the table's viewport down when
				 * the result set will fit within the given Y height.
				 *  @type boolean
				 *  @default false
				 *
				 *  @dtopt Options
				 *  @name DataTable.defaults.scrollCollapse
				 *
				 *  @example
				 *    $(document).ready( function() {
				 *      $('#example').dataTable( {
				 *        "scrollY": "200",
				 *        "scrollCollapse": true
				 *      } );
				 *    } );
				 */
				"bScrollCollapse": false,


				/**
				 * Configure DataTables to use server-side processing. Note that the
				 * `ajax` parameter must also be given in order to give DataTables a
				 * source to obtain the required data for each draw.
				 *  @type boolean
				 *  @default false
				 *
				 *  @dtopt Features
				 *  @dtopt Server-side
				 *  @name DataTable.defaults.serverSide
				 *
				 *  @example
				 *    $(document).ready( function () {
				 *      $('#example').dataTable( {
				 *        "serverSide": true,
				 *        "ajax": "xhr.php"
				 *      } );
				 *    } );
				 */
				"bServerSide": false,


				/**
				 * Enable or disable sorting of columns. Sorting of individual columns can be
				 * disabled by the `sortable` option for each column.
				 *  @type boolean
				 *  @default true
				 *
				 *  @dtopt Features
				 *  @name DataTable.defaults.ordering
				 *
				 *  @example
				 *    $(document).ready( function () {
				 *      $('#example').dataTable( {
				 *        "ordering": false
				 *      } );
				 *    } );
				 */
				"bSort": true,


				/**
				 * Enable or display DataTables' ability to sort multiple columns at the
				 * same time (activated by shift-click by the user).
				 *  @type boolean
				 *  @default true
				 *
				 *  @dtopt Options
				 *  @name DataTable.defaults.orderMulti
				 *
				 *  @example
				 *    // Disable multiple column sorting ability
				 *    $(document).ready( function () {
				 *      $('#example').dataTable( {
				 *        "orderMulti": false
				 *      } );
				 *    } );
				 */
				"bSortMulti": true,


				/**
				 * Allows control over whether DataTables should use the top (true) unique
				 * cell that is found for a single column, or the bottom (false - default).
				 * This is useful when using complex headers.
				 *  @type boolean
				 *  @default false
				 *
				 *  @dtopt Options
				 *  @name DataTable.defaults.orderCellsTop
				 *
				 *  @example
				 *    $(document).ready( function() {
				 *      $('#example').dataTable( {
				 *        "orderCellsTop": true
				 *      } );
				 *    } );
				 */
				"bSortCellsTop": false,


				/**
				 * Enable or disable the addition of the classes `sorting\_1`, `sorting\_2` and
				 * `sorting\_3` to the columns which are currently being sorted on. This is
				 * presented as a feature switch as it can increase processing time (while
				 * classes are removed and added) so for large data sets you might want to
				 * turn this off.
				 *  @type boolean
				 *  @default true
				 *
				 *  @dtopt Features
				 *  @name DataTable.defaults.orderClasses
				 *
				 *  @example
				 *    $(document).ready( function () {
				 *      $('#example').dataTable( {
				 *        "orderClasses": false
				 *      } );
				 *    } );
				 */
				"bSortClasses": true,


				/**
				 * Enable or disable state saving. When enabled HTML5 `localStorage` will be
				 * used to save table display information such as pagination information,
				 * display length, filtering and sorting. As such when the end user reloads
				 * the page the display display will match what thy had previously set up.
				 *
				 * Due to the use of `localStorage` the default state saving is not supported
				 * in IE6 or 7. If state saving is required in those browsers, use
				 * `stateSaveCallback` to provide a storage solution such as cookies.
				 *  @type boolean
				 *  @default false
				 *
				 *  @dtopt Features
				 *  @name DataTable.defaults.stateSave
				 *
				 *  @example
				 *    $(document).ready( function () {
				 *      $('#example').dataTable( {
				 *        "stateSave": true
				 *      } );
				 *    } );
				 */
				"bStateSave": false,


				/**
				 * This function is called when a TR element is created (and all TD child
				 * elements have been inserted), or registered if using a DOM source, allowing
				 * manipulation of the TR element (adding classes etc).
				 *  @type function
				 *  @param {node} row "TR" element for the current row
				 *  @param {array} data Raw data array for this row
				 *  @param {int} dataIndex The index of this row in the internal aoData array
				 *
				 *  @dtopt Callbacks
				 *  @name DataTable.defaults.createdRow
				 *
				 *  @example
				 *    $(document).ready( function() {
				 *      $('#example').dataTable( {
				 *        "createdRow": function( row, data, dataIndex ) {
				 *          // Bold the grade for all 'A' grade browsers
				 *          if ( data[4] == "A" )
				 *          {
				 *            $('td:eq(4)', row).html( '<b>A</b>' );
				 *          }
				 *        }
				 *      } );
				 *    } );
				 */
				"fnCreatedRow": null,


				/**
				 * This function is called on every 'draw' event, and allows you to
				 * dynamically modify any aspect you want about the created DOM.
				 *  @type function
				 *  @param {object} settings DataTables settings object
				 *
				 *  @dtopt Callbacks
				 *  @name DataTable.defaults.drawCallback
				 *
				 *  @example
				 *    $(document).ready( function() {
				 *      $('#example').dataTable( {
				 *        "drawCallback": function( settings ) {
				 *          alert( 'DataTables has redrawn the table' );
				 *        }
				 *      } );
				 *    } );
				 */
				"fnDrawCallback": null,


				/**
				 * Identical to fnHeaderCallback() but for the table footer this function
				 * allows you to modify the table footer on every 'draw' event.
				 *  @type function
				 *  @param {node} foot "TR" element for the footer
				 *  @param {array} data Full table data (as derived from the original HTML)
				 *  @param {int} start Index for the current display starting point in the
				 *    display array
				 *  @param {int} end Index for the current display ending point in the
				 *    display array
				 *  @param {array int} display Index array to translate the visual position
				 *    to the full data array
				 *
				 *  @dtopt Callbacks
				 *  @name DataTable.defaults.footerCallback
				 *
				 *  @example
				 *    $(document).ready( function() {
				 *      $('#example').dataTable( {
				 *        "footerCallback": function( tfoot, data, start, end, display ) {
				 *          tfoot.getElementsByTagName('th')[0].innerHTML = "Starting index is "+start;
				 *        }
				 *      } );
				 *    } )
				 */
				"fnFooterCallback": null,


				/**
				 * When rendering large numbers in the information element for the table
				 * (i.e. "Showing 1 to 10 of 57 entries") DataTables will render large numbers
				 * to have a comma separator for the 'thousands' units (e.g. 1 million is
				 * rendered as "1,000,000") to help readability for the end user. This
				 * function will override the default method DataTables uses.
				 *  @type function
				 *  @member
				 *  @param {int} toFormat number to be formatted
				 *  @returns {string} formatted string for DataTables to show the number
				 *
				 *  @dtopt Callbacks
				 *  @name DataTable.defaults.formatNumber
				 *
				 *  @example
				 *    // Format a number using a single quote for the separator (note that
				 *    // this can also be done with the language.thousands option)
				 *    $(document).ready( function() {
				 *      $('#example').dataTable( {
				 *        "formatNumber": function ( toFormat ) {
				 *          return toFormat.toString().replace(
				 *            /\B(?=(\d{3})+(?!\d))/g, "'"
				 *          );
				 *        };
				 *      } );
				 *    } );
				 */
				"fnFormatNumber": function (toFormat) {
					return toFormat.toString().replace(
						/\B(?=(\d{3})+(?!\d))/g,
						this.oLanguage.sThousands
					);
				},


				/**
				 * This function is called on every 'draw' event, and allows you to
				 * dynamically modify the header row. This can be used to calculate and
				 * display useful information about the table.
				 *  @type function
				 *  @param {node} head "TR" element for the header
				 *  @param {array} data Full table data (as derived from the original HTML)
				 *  @param {int} start Index for the current display starting point in the
				 *    display array
				 *  @param {int} end Index for the current display ending point in the
				 *    display array
				 *  @param {array int} display Index array to translate the visual position
				 *    to the full data array
				 *
				 *  @dtopt Callbacks
				 *  @name DataTable.defaults.headerCallback
				 *
				 *  @example
				 *    $(document).ready( function() {
				 *      $('#example').dataTable( {
				 *        "fheaderCallback": function( head, data, start, end, display ) {
				 *          head.getElementsByTagName('th')[0].innerHTML = "Displaying "+(end-start)+" records";
				 *        }
				 *      } );
				 *    } )
				 */
				"fnHeaderCallback": null,


				/**
				 * The information element can be used to convey information about the current
				 * state of the table. Although the internationalisation options presented by
				 * DataTables are quite capable of dealing with most customisations, there may
				 * be times where you wish to customise the string further. This callback
				 * allows you to do exactly that.
				 *  @type function
				 *  @param {object} oSettings DataTables settings object
				 *  @param {int} start Starting position in data for the draw
				 *  @param {int} end End position in data for the draw
				 *  @param {int} max Total number of rows in the table (regardless of
				 *    filtering)
				 *  @param {int} total Total number of rows in the data set, after filtering
				 *  @param {string} pre The string that DataTables has formatted using it's
				 *    own rules
				 *  @returns {string} The string to be displayed in the information element.
				 *
				 *  @dtopt Callbacks
				 *  @name DataTable.defaults.infoCallback
				 *
				 *  @example
				 *    $('#example').dataTable( {
				 *      "infoCallback": function( settings, start, end, max, total, pre ) {
				 *        return start +" to "+ end;
				 *      }
				 *    } );
				 */
				"fnInfoCallback": null,


				/**
				 * Called when the table has been initialised. Normally DataTables will
				 * initialise sequentially and there will be no need for this function,
				 * however, this does not hold true when using external language information
				 * since that is obtained using an async XHR call.
				 *  @type function
				 *  @param {object} settings DataTables settings object
				 *  @param {object} json The JSON object request from the server - only
				 *    present if client-side Ajax sourced data is used
				 *
				 *  @dtopt Callbacks
				 *  @name DataTable.defaults.initComplete
				 *
				 *  @example
				 *    $(document).ready( function() {
				 *      $('#example').dataTable( {
				 *        "initComplete": function(settings, json) {
				 *          alert( 'DataTables has finished its initialisation.' );
				 *        }
				 *      } );
				 *    } )
				 */
				"fnInitComplete": null,


				/**
				 * Called at the very start of each table draw and can be used to cancel the
				 * draw by returning false, any other return (including undefined) results in
				 * the full draw occurring).
				 *  @type function
				 *  @param {object} settings DataTables settings object
				 *  @returns {boolean} False will cancel the draw, anything else (including no
				 *    return) will allow it to complete.
				 *
				 *  @dtopt Callbacks
				 *  @name DataTable.defaults.preDrawCallback
				 *
				 *  @example
				 *    $(document).ready( function() {
				 *      $('#example').dataTable( {
				 *        "preDrawCallback": function( settings ) {
				 *          if ( $('#test').val() == 1 ) {
				 *            return false;
				 *          }
				 *        }
				 *      } );
				 *    } );
				 */
				"fnPreDrawCallback": null,


				/**
				 * This function allows you to 'post process' each row after it have been
				 * generated for each table draw, but before it is rendered on screen. This
				 * function might be used for setting the row class name etc.
				 *  @type function
				 *  @param {node} row "TR" element for the current row
				 *  @param {array} data Raw data array for this row
				 *  @param {int} displayIndex The display index for the current table draw
				 *  @param {int} displayIndexFull The index of the data in the full list of
				 *    rows (after filtering)
				 *
				 *  @dtopt Callbacks
				 *  @name DataTable.defaults.rowCallback
				 *
				 *  @example
				 *    $(document).ready( function() {
				 *      $('#example').dataTable( {
				 *        "rowCallback": function( row, data, displayIndex, displayIndexFull ) {
				 *          // Bold the grade for all 'A' grade browsers
				 *          if ( data[4] == "A" ) {
				 *            $('td:eq(4)', row).html( '<b>A</b>' );
				 *          }
				 *        }
				 *      } );
				 *    } );
				 */
				"fnRowCallback": null,


				/**
				 * __Deprecated__ The functionality provided by this parameter has now been
				 * superseded by that provided through `ajax`, which should be used instead.
				 *
				 * This parameter allows you to override the default function which obtains
				 * the data from the server so something more suitable for your application.
				 * For example you could use POST data, or pull information from a Gears or
				 * AIR database.
				 *  @type function
				 *  @member
				 *  @param {string} source HTTP source to obtain the data from (`ajax`)
				 *  @param {array} data A key/value pair object containing the data to send
				 *    to the server
				 *  @param {function} callback to be called on completion of the data get
				 *    process that will draw the data on the page.
				 *  @param {object} settings DataTables settings object
				 *
				 *  @dtopt Callbacks
				 *  @dtopt Server-side
				 *  @name DataTable.defaults.serverData
				 *
				 *  @deprecated 1.10. Please use `ajax` for this functionality now.
				 */
				"fnServerData": null,


				/**
				 * __Deprecated__ The functionality provided by this parameter has now been
				 * superseded by that provided through `ajax`, which should be used instead.
				 *
				 *  It is often useful to send extra data to the server when making an Ajax
				 * request - for example custom filtering information, and this callback
				 * function makes it trivial to send extra information to the server. The
				 * passed in parameter is the data set that has been constructed by
				 * DataTables, and you can add to this or modify it as you require.
				 *  @type function
				 *  @param {array} data Data array (array of objects which are name/value
				 *    pairs) that has been constructed by DataTables and will be sent to the
				 *    server. In the case of Ajax sourced data with server-side processing
				 *    this will be an empty array, for server-side processing there will be a
				 *    significant number of parameters!
				 *  @returns {undefined} Ensure that you modify the data array passed in,
				 *    as this is passed by reference.
				 *
				 *  @dtopt Callbacks
				 *  @dtopt Server-side
				 *  @name DataTable.defaults.serverParams
				 *
				 *  @deprecated 1.10. Please use `ajax` for this functionality now.
				 */
				"fnServerParams": null,


				/**
				 * Load the table state. With this function you can define from where, and how, the
				 * state of a table is loaded. By default DataTables will load from `localStorage`
				 * but you might wish to use a server-side database or cookies.
				 *  @type function
				 *  @member
				 *  @param {object} settings DataTables settings object
				 *  @param {object} callback Callback that can be executed when done. It
				 *    should be passed the loaded state object.
				 *  @return {object} The DataTables state object to be loaded
				 *
				 *  @dtopt Callbacks
				 *  @name DataTable.defaults.stateLoadCallback
				 *
				 *  @example
				 *    $(document).ready( function() {
				 *      $('#example').dataTable( {
				 *        "stateSave": true,
				 *        "stateLoadCallback": function (settings, callback) {
				 *          $.ajax( {
				 *            "url": "/state_load",
				 *            "dataType": "json",
				 *            "success": function (json) {
				 *              callback( json );
				 *            }
				 *          } );
				 *        }
				 *      } );
				 *    } );
				 */
				"fnStateLoadCallback": function (settings) {
					try {
						return JSON.parse(
							(settings.iStateDuration === -1 ? sessionStorage : localStorage).getItem(
								'DataTables_' + settings.sInstance + '_' + location.pathname
							)
						);
					} catch (e) {}
				},


				/**
				 * Callback which allows modification of the saved state prior to loading that state.
				 * This callback is called when the table is loading state from the stored data, but
				 * prior to the settings object being modified by the saved state. Note that for
				 * plug-in authors, you should use the `stateLoadParams` event to load parameters for
				 * a plug-in.
				 *  @type function
				 *  @param {object} settings DataTables settings object
				 *  @param {object} data The state object that is to be loaded
				 *
				 *  @dtopt Callbacks
				 *  @name DataTable.defaults.stateLoadParams
				 *
				 *  @example
				 *    // Remove a saved filter, so filtering is never loaded
				 *    $(document).ready( function() {
				 *      $('#example').dataTable( {
				 *        "stateSave": true,
				 *        "stateLoadParams": function (settings, data) {
				 *          data.oSearch.sSearch = "";
				 *        }
				 *      } );
				 *    } );
				 *
				 *  @example
				 *    // Disallow state loading by returning false
				 *    $(document).ready( function() {
				 *      $('#example').dataTable( {
				 *        "stateSave": true,
				 *        "stateLoadParams": function (settings, data) {
				 *          return false;
				 *        }
				 *      } );
				 *    } );
				 */
				"fnStateLoadParams": null,


				/**
				 * Callback that is called when the state has been loaded from the state saving method
				 * and the DataTables settings object has been modified as a result of the loaded state.
				 *  @type function
				 *  @param {object} settings DataTables settings object
				 *  @param {object} data The state object that was loaded
				 *
				 *  @dtopt Callbacks
				 *  @name DataTable.defaults.stateLoaded
				 *
				 *  @example
				 *    // Show an alert with the filtering value that was saved
				 *    $(document).ready( function() {
				 *      $('#example').dataTable( {
				 *        "stateSave": true,
				 *        "stateLoaded": function (settings, data) {
				 *          alert( 'Saved filter was: '+data.oSearch.sSearch );
				 *        }
				 *      } );
				 *    } );
				 */
				"fnStateLoaded": null,


				/**
				 * Save the table state. This function allows you to define where and how the state
				 * information for the table is stored By default DataTables will use `localStorage`
				 * but you might wish to use a server-side database or cookies.
				 *  @type function
				 *  @member
				 *  @param {object} settings DataTables settings object
				 *  @param {object} data The state object to be saved
				 *
				 *  @dtopt Callbacks
				 *  @name DataTable.defaults.stateSaveCallback
				 *
				 *  @example
				 *    $(document).ready( function() {
				 *      $('#example').dataTable( {
				 *        "stateSave": true,
				 *        "stateSaveCallback": function (settings, data) {
				 *          // Send an Ajax request to the server with the state object
				 *          $.ajax( {
				 *            "url": "/state_save",
				 *            "data": data,
				 *            "dataType": "json",
				 *            "method": "POST"
				 *            "success": function () {}
				 *          } );
				 *        }
				 *      } );
				 *    } );
				 */
				"fnStateSaveCallback": function (settings, data) {
					try {
						(settings.iStateDuration === -1 ? sessionStorage : localStorage).setItem(
							'DataTables_' + settings.sInstance + '_' + location.pathname,
							JSON.stringify(data)
						);
					} catch (e) {}
				},


				/**
				 * Callback which allows modification of the state to be saved. Called when the table
				 * has changed state a new state save is required. This method allows modification of
				 * the state saving object prior to actually doing the save, including addition or
				 * other state properties or modification. Note that for plug-in authors, you should
				 * use the `stateSaveParams` event to save parameters for a plug-in.
				 *  @type function
				 *  @param {object} settings DataTables settings object
				 *  @param {object} data The state object to be saved
				 *
				 *  @dtopt Callbacks
				 *  @name DataTable.defaults.stateSaveParams
				 *
				 *  @example
				 *    // Remove a saved filter, so filtering is never saved
				 *    $(document).ready( function() {
				 *      $('#example').dataTable( {
				 *        "stateSave": true,
				 *        "stateSaveParams": function (settings, data) {
				 *          data.oSearch.sSearch = "";
				 *        }
				 *      } );
				 *    } );
				 */
				"fnStateSaveParams": null,


				/**
				 * Duration for which the saved state information is considered valid. After this period
				 * has elapsed the state will be returned to the default.
				 * Value is given in seconds.
				 *  @type int
				 *  @default 7200 <i>(2 hours)</i>
				 *
				 *  @dtopt Options
				 *  @name DataTable.defaults.stateDuration
				 *
				 *  @example
				 *    $(document).ready( function() {
				 *      $('#example').dataTable( {
				 *        "stateDuration": 60*60*24; // 1 day
				 *      } );
				 *    } )
				 */
				"iStateDuration": 7200,


				/**
				 * When enabled DataTables will not make a request to the server for the first
				 * page draw - rather it will use the data already on the page (no sorting etc
				 * will be applied to it), thus saving on an XHR at load time. `deferLoading`
				 * is used to indicate that deferred loading is required, but it is also used
				 * to tell DataTables how many records there are in the full table (allowing
				 * the information element and pagination to be displayed correctly). In the case
				 * where a filtering is applied to the table on initial load, this can be
				 * indicated by giving the parameter as an array, where the first element is
				 * the number of records available after filtering and the second element is the
				 * number of records without filtering (allowing the table information element
				 * to be shown correctly).
				 *  @type int | array
				 *  @default null
				 *
				 *  @dtopt Options
				 *  @name DataTable.defaults.deferLoading
				 *
				 *  @example
				 *    // 57 records available in the table, no filtering applied
				 *    $(document).ready( function() {
				 *      $('#example').dataTable( {
				 *        "serverSide": true,
				 *        "ajax": "scripts/server_processing.php",
				 *        "deferLoading": 57
				 *      } );
				 *    } );
				 *
				 *  @example
				 *    // 57 records after filtering, 100 without filtering (an initial filter applied)
				 *    $(document).ready( function() {
				 *      $('#example').dataTable( {
				 *        "serverSide": true,
				 *        "ajax": "scripts/server_processing.php",
				 *        "deferLoading": [ 57, 100 ],
				 *        "search": {
				 *          "search": "my_filter"
				 *        }
				 *      } );
				 *    } );
				 */
				"iDeferLoading": null,


				/**
				 * Number of rows to display on a single page when using pagination. If
				 * feature enabled (`lengthChange`) then the end user will be able to override
				 * this to a custom setting using a pop-up menu.
				 *  @type int
				 *  @default 10
				 *
				 *  @dtopt Options
				 *  @name DataTable.defaults.pageLength
				 *
				 *  @example
				 *    $(document).ready( function() {
				 *      $('#example').dataTable( {
				 *        "pageLength": 50
				 *      } );
				 *    } )
				 */
				"iDisplayLength": 10,


				/**
				 * Define the starting point for data display when using DataTables with
				 * pagination. Note that this parameter is the number of records, rather than
				 * the page number, so if you have 10 records per page and want to start on
				 * the third page, it should be "20".
				 *  @type int
				 *  @default 0
				 *
				 *  @dtopt Options
				 *  @name DataTable.defaults.displayStart
				 *
				 *  @example
				 *    $(document).ready( function() {
				 *      $('#example').dataTable( {
				 *        "displayStart": 20
				 *      } );
				 *    } )
				 */
				"iDisplayStart": 0,


				/**
				 * By default DataTables allows keyboard navigation of the table (sorting, paging,
				 * and filtering) by adding a `tabindex` attribute to the required elements. This
				 * allows you to tab through the controls and press the enter key to activate them.
				 * The tabindex is default 0, meaning that the tab follows the flow of the document.
				 * You can overrule this using this parameter if you wish. Use a value of -1 to
				 * disable built-in keyboard navigation.
				 *  @type int
				 *  @default 0
				 *
				 *  @dtopt Options
				 *  @name DataTable.defaults.tabIndex
				 *
				 *  @example
				 *    $(document).ready( function() {
				 *      $('#example').dataTable( {
				 *        "tabIndex": 1
				 *      } );
				 *    } );
				 */
				"iTabIndex": 0,


				/**
				 * Classes that DataTables assigns to the various components and features
				 * that it adds to the HTML table. This allows classes to be configured
				 * during initialisation in addition to through the static
				 * {@link DataTable.ext.oStdClasses} object).
				 *  @namespace
				 *  @name DataTable.defaults.classes
				 */
				"oClasses": {},


				/**
				 * All strings that DataTables uses in the user interface that it creates
				 * are defined in this object, allowing you to modified them individually or
				 * completely replace them all as required.
				 *  @namespace
				 *  @name DataTable.defaults.language
				 */
				"oLanguage": {
					/**
					 * Strings that are used for WAI-ARIA labels and controls only (these are not
					 * actually visible on the page, but will be read by screenreaders, and thus
					 * must be internationalised as well).
					 *  @namespace
					 *  @name DataTable.defaults.language.aria
					 */
					"oAria": {
						/**
						 * ARIA label that is added to the table headers when the column may be
						 * sorted ascending by activing the column (click or return when focused).
						 * Note that the column header is prefixed to this string.
						 *  @type string
						 *  @default : activate to sort column ascending
						 *
						 *  @dtopt Language
						 *  @name DataTable.defaults.language.aria.sortAscending
						 *
						 *  @example
						 *    $(document).ready( function() {
						 *      $('#example').dataTable( {
						 *        "language": {
						 *          "aria": {
						 *            "sortAscending": " - click/return to sort ascending"
						 *          }
						 *        }
						 *      } );
						 *    } );
						 */
						"sSortAscending": ": activate to sort column ascending",

						/**
						 * ARIA label that is added to the table headers when the column may be
						 * sorted descending by activing the column (click or return when focused).
						 * Note that the column header is prefixed to this string.
						 *  @type string
						 *  @default : activate to sort column ascending
						 *
						 *  @dtopt Language
						 *  @name DataTable.defaults.language.aria.sortDescending
						 *
						 *  @example
						 *    $(document).ready( function() {
						 *      $('#example').dataTable( {
						 *        "language": {
						 *          "aria": {
						 *            "sortDescending": " - click/return to sort descending"
						 *          }
						 *        }
						 *      } );
						 *    } );
						 */
						"sSortDescending": ": activate to sort column descending"
					},

					/**
					 * Pagination string used by DataTables for the built-in pagination
					 * control types.
					 *  @namespace
					 *  @name DataTable.defaults.language.paginate
					 */
					"oPaginate": {
						/**
						 * Text to use when using the 'full_numbers' type of pagination for the
						 * button to take the user to the first page.
						 *  @type string
						 *  @default First
						 *
						 *  @dtopt Language
						 *  @name DataTable.defaults.language.paginate.first
						 *
						 *  @example
						 *    $(document).ready( function() {
						 *      $('#example').dataTable( {
						 *        "language": {
						 *          "paginate": {
						 *            "first": "First page"
						 *          }
						 *        }
						 *      } );
						 *    } );
						 */
						"sFirst": "First",


						/**
						 * Text to use when using the 'full_numbers' type of pagination for the
						 * button to take the user to the last page.
						 *  @type string
						 *  @default Last
						 *
						 *  @dtopt Language
						 *  @name DataTable.defaults.language.paginate.last
						 *
						 *  @example
						 *    $(document).ready( function() {
						 *      $('#example').dataTable( {
						 *        "language": {
						 *          "paginate": {
						 *            "last": "Last page"
						 *          }
						 *        }
						 *      } );
						 *    } );
						 */
						"sLast": "Last",


						/**
						 * Text to use for the 'next' pagination button (to take the user to the
						 * next page).
						 *  @type string
						 *  @default Next
						 *
						 *  @dtopt Language
						 *  @name DataTable.defaults.language.paginate.next
						 *
						 *  @example
						 *    $(document).ready( function() {
						 *      $('#example').dataTable( {
						 *        "language": {
						 *          "paginate": {
						 *            "next": "Next page"
						 *          }
						 *        }
						 *      } );
						 *    } );
						 */
						"sNext": "Next",


						/**
						 * Text to use for the 'previous' pagination button (to take the user to
						 * the previous page).
						 *  @type string
						 *  @default Previous
						 *
						 *  @dtopt Language
						 *  @name DataTable.defaults.language.paginate.previous
						 *
						 *  @example
						 *    $(document).ready( function() {
						 *      $('#example').dataTable( {
						 *        "language": {
						 *          "paginate": {
						 *            "previous": "Previous page"
						 *          }
						 *        }
						 *      } );
						 *    } );
						 */
						"sPrevious": "Previous"
					},

					/**
					 * This string is shown in preference to `zeroRecords` when the table is
					 * empty of data (regardless of filtering). Note that this is an optional
					 * parameter - if it is not given, the value of `zeroRecords` will be used
					 * instead (either the default or given value).
					 *  @type string
					 *  @default No data available in table
					 *
					 *  @dtopt Language
					 *  @name DataTable.defaults.language.emptyTable
					 *
					 *  @example
					 *    $(document).ready( function() {
					 *      $('#example').dataTable( {
					 *        "language": {
					 *          "emptyTable": "No data available in table"
					 *        }
					 *      } );
					 *    } );
					 */
					"sEmptyTable": "No data available in table",


					/**
					 * This string gives information to the end user about the information
					 * that is current on display on the page. The following tokens can be
					 * used in the string and will be dynamically replaced as the table
					 * display updates. This tokens can be placed anywhere in the string, or
					 * removed as needed by the language requires:
					 *
					 * * `\_START\_` - Display index of the first record on the current page
					 * * `\_END\_` - Display index of the last record on the current page
					 * * `\_TOTAL\_` - Number of records in the table after filtering
					 * * `\_MAX\_` - Number of records in the table without filtering
					 * * `\_PAGE\_` - Current page number
					 * * `\_PAGES\_` - Total number of pages of data in the table
					 *
					 *  @type string
					 *  @default Showing _START_ to _END_ of _TOTAL_ entries
					 *
					 *  @dtopt Language
					 *  @name DataTable.defaults.language.info
					 *
					 *  @example
					 *    $(document).ready( function() {
					 *      $('#example').dataTable( {
					 *        "language": {
					 *          "info": "Showing page _PAGE_ of _PAGES_"
					 *        }
					 *      } );
					 *    } );
					 */
					"sInfo": "Showing _START_ to _END_ of _TOTAL_ entries",


					/**
					 * Display information string for when the table is empty. Typically the
					 * format of this string should match `info`.
					 *  @type string
					 *  @default Showing 0 to 0 of 0 entries
					 *
					 *  @dtopt Language
					 *  @name DataTable.defaults.language.infoEmpty
					 *
					 *  @example
					 *    $(document).ready( function() {
					 *      $('#example').dataTable( {
					 *        "language": {
					 *          "infoEmpty": "No entries to show"
					 *        }
					 *      } );
					 *    } );
					 */
					"sInfoEmpty": "Showing 0 to 0 of 0 entries",


					/**
					 * When a user filters the information in a table, this string is appended
					 * to the information (`info`) to give an idea of how strong the filtering
					 * is. The variable _MAX_ is dynamically updated.
					 *  @type string
					 *  @default (filtered from _MAX_ total entries)
					 *
					 *  @dtopt Language
					 *  @name DataTable.defaults.language.infoFiltered
					 *
					 *  @example
					 *    $(document).ready( function() {
					 *      $('#example').dataTable( {
					 *        "language": {
					 *          "infoFiltered": " - filtering from _MAX_ records"
					 *        }
					 *      } );
					 *    } );
					 */
					"sInfoFiltered": "(filtered from _MAX_ total entries)",


					/**
					 * If can be useful to append extra information to the info string at times,
					 * and this variable does exactly that. This information will be appended to
					 * the `info` (`infoEmpty` and `infoFiltered` in whatever combination they are
					 * being used) at all times.
					 *  @type string
					 *  @default <i>Empty string</i>
					 *
					 *  @dtopt Language
					 *  @name DataTable.defaults.language.infoPostFix
					 *
					 *  @example
					 *    $(document).ready( function() {
					 *      $('#example').dataTable( {
					 *        "language": {
					 *          "infoPostFix": "All records shown are derived from real information."
					 *        }
					 *      } );
					 *    } );
					 */
					"sInfoPostFix": "",


					/**
					 * This decimal place operator is a little different from the other
					 * language options since DataTables doesn't output floating point
					 * numbers, so it won't ever use this for display of a number. Rather,
					 * what this parameter does is modify the sort methods of the table so
					 * that numbers which are in a format which has a character other than
					 * a period (`.`) as a decimal place will be sorted numerically.
					 *
					 * Note that numbers with different decimal places cannot be shown in
					 * the same table and still be sortable, the table must be consistent.
					 * However, multiple different tables on the page can use different
					 * decimal place characters.
					 *  @type string
					 *  @default 
					 *
					 *  @dtopt Language
					 *  @name DataTable.defaults.language.decimal
					 *
					 *  @example
					 *    $(document).ready( function() {
					 *      $('#example').dataTable( {
					 *        "language": {
					 *          "decimal": ","
					 *          "thousands": "."
					 *        }
					 *      } );
					 *    } );
					 */
					"sDecimal": "",


					/**
					 * DataTables has a build in number formatter (`formatNumber`) which is
					 * used to format large numbers that are used in the table information.
					 * By default a comma is used, but this can be trivially changed to any
					 * character you wish with this parameter.
					 *  @type string
					 *  @default ,
					 *
					 *  @dtopt Language
					 *  @name DataTable.defaults.language.thousands
					 *
					 *  @example
					 *    $(document).ready( function() {
					 *      $('#example').dataTable( {
					 *        "language": {
					 *          "thousands": "'"
					 *        }
					 *      } );
					 *    } );
					 */
					"sThousands": ",",


					/**
					 * Detail the action that will be taken when the drop down menu for the
					 * pagination length option is changed. The '_MENU_' variable is replaced
					 * with a default select list of 10, 25, 50 and 100, and can be replaced
					 * with a custom select box if required.
					 *  @type string
					 *  @default Show _MENU_ entries
					 *
					 *  @dtopt Language
					 *  @name DataTable.defaults.language.lengthMenu
					 *
					 *  @example
					 *    // Language change only
					 *    $(document).ready( function() {
					 *      $('#example').dataTable( {
					 *        "language": {
					 *          "lengthMenu": "Display _MENU_ records"
					 *        }
					 *      } );
					 *    } );
					 *
					 *  @example
					 *    // Language and options change
					 *    $(document).ready( function() {
					 *      $('#example').dataTable( {
					 *        "language": {
					 *          "lengthMenu": 'Display <select>'+
					 *            '<option value="10">10</option>'+
					 *            '<option value="20">20</option>'+
					 *            '<option value="30">30</option>'+
					 *            '<option value="40">40</option>'+
					 *            '<option value="50">50</option>'+
					 *            '<option value="-1">All</option>'+
					 *            '</select> records'
					 *        }
					 *      } );
					 *    } );
					 */
					"sLengthMenu": "Show _MENU_ entries",


					/**
					 * When using Ajax sourced data and during the first draw when DataTables is
					 * gathering the data, this message is shown in an empty row in the table to
					 * indicate to the end user the the data is being loaded. Note that this
					 * parameter is not used when loading data by server-side processing, just
					 * Ajax sourced data with client-side processing.
					 *  @type string
					 *  @default Loading...
					 *
					 *  @dtopt Language
					 *  @name DataTable.defaults.language.loadingRecords
					 *
					 *  @example
					 *    $(document).ready( function() {
					 *      $('#example').dataTable( {
					 *        "language": {
					 *          "loadingRecords": "Please wait - loading..."
					 *        }
					 *      } );
					 *    } );
					 */
					"sLoadingRecords": "Loading...",


					/**
					 * Text which is displayed when the table is processing a user action
					 * (usually a sort command or similar).
					 *  @type string
					 *  @default Processing...
					 *
					 *  @dtopt Language
					 *  @name DataTable.defaults.language.processing
					 *
					 *  @example
					 *    $(document).ready( function() {
					 *      $('#example').dataTable( {
					 *        "language": {
					 *          "processing": "DataTables is currently busy"
					 *        }
					 *      } );
					 *    } );
					 */
					"sProcessing": "Processing...",


					/**
					 * Details the actions that will be taken when the user types into the
					 * filtering input text box. The variable "_INPUT_", if used in the string,
					 * is replaced with the HTML text box for the filtering input allowing
					 * control over where it appears in the string. If "_INPUT_" is not given
					 * then the input box is appended to the string automatically.
					 *  @type string
					 *  @default Search:
					 *
					 *  @dtopt Language
					 *  @name DataTable.defaults.language.search
					 *
					 *  @example
					 *    // Input text box will be appended at the end automatically
					 *    $(document).ready( function() {
					 *      $('#example').dataTable( {
					 *        "language": {
					 *          "search": "Filter records:"
					 *        }
					 *      } );
					 *    } );
					 *
					 *  @example
					 *    // Specify where the filter should appear
					 *    $(document).ready( function() {
					 *      $('#example').dataTable( {
					 *        "language": {
					 *          "search": "Apply filter _INPUT_ to table"
					 *        }
					 *      } );
					 *    } );
					 */
					"sSearch": "Search:",


					/**
					 * Assign a `placeholder` attribute to the search `input` element
					 *  @type string
					 *  @default 
					 *
					 *  @dtopt Language
					 *  @name DataTable.defaults.language.searchPlaceholder
					 */
					"sSearchPlaceholder": "",


					/**
					 * All of the language information can be stored in a file on the
					 * server-side, which DataTables will look up if this parameter is passed.
					 * It must store the URL of the language file, which is in a JSON format,
					 * and the object has the same properties as the oLanguage object in the
					 * initialiser object (i.e. the above parameters). Please refer to one of
					 * the example language files to see how this works in action.
					 *  @type string
					 *  @default <i>Empty string - i.e. disabled</i>
					 *
					 *  @dtopt Language
					 *  @name DataTable.defaults.language.url
					 *
					 *  @example
					 *    $(document).ready( function() {
					 *      $('#example').dataTable( {
					 *        "language": {
					 *          "url": "http://www.sprymedia.co.uk/dataTables/lang.txt"
					 *        }
					 *      } );
					 *    } );
					 */
					"sUrl": "",


					/**
					 * Text shown inside the table records when the is no information to be
					 * displayed after filtering. `emptyTable` is shown when there is simply no
					 * information in the table at all (regardless of filtering).
					 *  @type string
					 *  @default No matching records found
					 *
					 *  @dtopt Language
					 *  @name DataTable.defaults.language.zeroRecords
					 *
					 *  @example
					 *    $(document).ready( function() {
					 *      $('#example').dataTable( {
					 *        "language": {
					 *          "zeroRecords": "No records to display"
					 *        }
					 *      } );
					 *    } );
					 */
					"sZeroRecords": "No matching records found"
				},


				/**
				 * This parameter allows you to have define the global filtering state at
				 * initialisation time. As an object the `search` parameter must be
				 * defined, but all other parameters are optional. When `regex` is true,
				 * the search string will be treated as a regular expression, when false
				 * (default) it will be treated as a straight string. When `smart`
				 * DataTables will use it's smart filtering methods (to word match at
				 * any point in the data), when false this will not be done.
				 *  @namespace
				 *  @extends DataTable.models.oSearch
				 *
				 *  @dtopt Options
				 *  @name DataTable.defaults.search
				 *
				 *  @example
				 *    $(document).ready( function() {
				 *      $('#example').dataTable( {
				 *        "search": {"search": "Initial search"}
				 *      } );
				 *    } )
				 */
				"oSearch": $.extend({}, DataTable.models.oSearch),


				/**
				 * __Deprecated__ The functionality provided by this parameter has now been
				 * superseded by that provided through `ajax`, which should be used instead.
				 *
				 * By default DataTables will look for the property `data` (or `aaData` for
				 * compatibility with DataTables 1.9-) when obtaining data from an Ajax
				 * source or for server-side processing - this parameter allows that
				 * property to be changed. You can use Javascript dotted object notation to
				 * get a data source for multiple levels of nesting.
				 *  @type string
				 *  @default data
				 *
				 *  @dtopt Options
				 *  @dtopt Server-side
				 *  @name DataTable.defaults.ajaxDataProp
				 *
				 *  @deprecated 1.10. Please use `ajax` for this functionality now.
				 */
				"sAjaxDataProp": "data",


				/**
				 * __Deprecated__ The functionality provided by this parameter has now been
				 * superseded by that provided through `ajax`, which should be used instead.
				 *
				 * You can instruct DataTables to load data from an external
				 * source using this parameter (use aData if you want to pass data in you
				 * already have). Simply provide a url a JSON object can be obtained from.
				 *  @type string
				 *  @default null
				 *
				 *  @dtopt Options
				 *  @dtopt Server-side
				 *  @name DataTable.defaults.ajaxSource
				 *
				 *  @deprecated 1.10. Please use `ajax` for this functionality now.
				 */
				"sAjaxSource": null,


				/**
				 * This initialisation variable allows you to specify exactly where in the
				 * DOM you want DataTables to inject the various controls it adds to the page
				 * (for example you might want the pagination controls at the top of the
				 * table). DIV elements (with or without a custom class) can also be added to
				 * aid styling. The follow syntax is used:
				 *   <ul>
				 *     <li>The following options are allowed:
				 *       <ul>
				 *         <li>'l' - Length changing</li>
				 *         <li>'f' - Filtering input</li>
				 *         <li>'t' - The table!</li>
				 *         <li>'i' - Information</li>
				 *         <li>'p' - Pagination</li>
				 *         <li>'r' - pRocessing</li>
				 *       </ul>
				 *     </li>
				 *     <li>The following constants are allowed:
				 *       <ul>
				 *         <li>'H' - jQueryUI theme "header" classes ('fg-toolbar ui-widget-header ui-corner-tl ui-corner-tr ui-helper-clearfix')</li>
				 *         <li>'F' - jQueryUI theme "footer" classes ('fg-toolbar ui-widget-header ui-corner-bl ui-corner-br ui-helper-clearfix')</li>
				 *       </ul>
				 *     </li>
				 *     <li>The following syntax is expected:
				 *       <ul>
				 *         <li>'&lt;' and '&gt;' - div elements</li>
				 *         <li>'&lt;"class" and '&gt;' - div with a class</li>
				 *         <li>'&lt;"#id" and '&gt;' - div with an ID</li>
				 *       </ul>
				 *     </li>
				 *     <li>Examples:
				 *       <ul>
				 *         <li>'&lt;"wrapper"flipt&gt;'</li>
				 *         <li>'&lt;lf&lt;t&gt;ip&gt;'</li>
				 *       </ul>
				 *     </li>
				 *   </ul>
				 *  @type string
				 *  @default lfrtip <i>(when `jQueryUI` is false)</i> <b>or</b>
				 *    <"H"lfr>t<"F"ip> <i>(when `jQueryUI` is true)</i>
				 *
				 *  @dtopt Options
				 *  @name DataTable.defaults.dom
				 *
				 *  @example
				 *    $(document).ready( function() {
				 *      $('#example').dataTable( {
				 *        "dom": '&lt;"top"i&gt;rt&lt;"bottom"flp&gt;&lt;"clear"&gt;'
				 *      } );
				 *    } );
				 */
				"sDom": "lfrtip",


				/**
				 * Search delay option. This will throttle full table searches that use the
				 * DataTables provided search input element (it does not effect calls to
				 * `dt-api search()`, providing a delay before the search is made.
				 *  @type integer
				 *  @default 0
				 *
				 *  @dtopt Options
				 *  @name DataTable.defaults.searchDelay
				 *
				 *  @example
				 *    $(document).ready( function() {
				 *      $('#example').dataTable( {
				 *        "searchDelay": 200
				 *      } );
				 *    } )
				 */
				"searchDelay": null,


				/**
				 * DataTables features six different built-in options for the buttons to
				 * display for pagination control:
				 *
				 * * `numbers` - Page number buttons only
				 * * `simple` - 'Previous' and 'Next' buttons only
				 * * 'simple_numbers` - 'Previous' and 'Next' buttons, plus page numbers
				 * * `full` - 'First', 'Previous', 'Next' and 'Last' buttons
				 * * `full_numbers` - 'First', 'Previous', 'Next' and 'Last' buttons, plus page numbers
				 * * `first_last_numbers` - 'First' and 'Last' buttons, plus page numbers
				 *  
				 * Further methods can be added using {@link DataTable.ext.oPagination}.
				 *  @type string
				 *  @default simple_numbers
				 *
				 *  @dtopt Options
				 *  @name DataTable.defaults.pagingType
				 *
				 *  @example
				 *    $(document).ready( function() {
				 *      $('#example').dataTable( {
				 *        "pagingType": "full_numbers"
				 *      } );
				 *    } )
				 */
				"sPaginationType": "simple_numbers",


				/**
				 * Enable horizontal scrolling. When a table is too wide to fit into a
				 * certain layout, or you have a large number of columns in the table, you
				 * can enable x-scrolling to show the table in a viewport, which can be
				 * scrolled. This property can be `true` which will allow the table to
				 * scroll horizontally when needed, or any CSS unit, or a number (in which
				 * case it will be treated as a pixel measurement). Setting as simply `true`
				 * is recommended.
				 *  @type boolean|string
				 *  @default <i>blank string - i.e. disabled</i>
				 *
				 *  @dtopt Features
				 *  @name DataTable.defaults.scrollX
				 *
				 *  @example
				 *    $(document).ready( function() {
				 *      $('#example').dataTable( {
				 *        "scrollX": true,
				 *        "scrollCollapse": true
				 *      } );
				 *    } );
				 */
				"sScrollX": "",


				/**
				 * This property can be used to force a DataTable to use more width than it
				 * might otherwise do when x-scrolling is enabled. For example if you have a
				 * table which requires to be well spaced, this parameter is useful for
				 * "over-sizing" the table, and thus forcing scrolling. This property can by
				 * any CSS unit, or a number (in which case it will be treated as a pixel
				 * measurement).
				 *  @type string
				 *  @default <i>blank string - i.e. disabled</i>
				 *
				 *  @dtopt Options
				 *  @name DataTable.defaults.scrollXInner
				 *
				 *  @example
				 *    $(document).ready( function() {
				 *      $('#example').dataTable( {
				 *        "scrollX": "100%",
				 *        "scrollXInner": "110%"
				 *      } );
				 *    } );
				 */
				"sScrollXInner": "",


				/**
				 * Enable vertical scrolling. Vertical scrolling will constrain the DataTable
				 * to the given height, and enable scrolling for any data which overflows the
				 * current viewport. This can be used as an alternative to paging to display
				 * a lot of data in a small area (although paging and scrolling can both be
				 * enabled at the same time). This property can be any CSS unit, or a number
				 * (in which case it will be treated as a pixel measurement).
				 *  @type string
				 *  @default <i>blank string - i.e. disabled</i>
				 *
				 *  @dtopt Features
				 *  @name DataTable.defaults.scrollY
				 *
				 *  @example
				 *    $(document).ready( function() {
				 *      $('#example').dataTable( {
				 *        "scrollY": "200px",
				 *        "paginate": false
				 *      } );
				 *    } );
				 */
				"sScrollY": "",


				/**
				 * __Deprecated__ The functionality provided by this parameter has now been
				 * superseded by that provided through `ajax`, which should be used instead.
				 *
				 * Set the HTTP method that is used to make the Ajax call for server-side
				 * processing or Ajax sourced data.
				 *  @type string
				 *  @default GET
				 *
				 *  @dtopt Options
				 *  @dtopt Server-side
				 *  @name DataTable.defaults.serverMethod
				 *
				 *  @deprecated 1.10. Please use `ajax` for this functionality now.
				 */
				"sServerMethod": "GET",


				/**
				 * DataTables makes use of renderers when displaying HTML elements for
				 * a table. These renderers can be added or modified by plug-ins to
				 * generate suitable mark-up for a site. For example the Bootstrap
				 * integration plug-in for DataTables uses a paging button renderer to
				 * display pagination buttons in the mark-up required by Bootstrap.
				 *
				 * For further information about the renderers available see
				 * DataTable.ext.renderer
				 *  @type string|object
				 *  @default null
				 *
				 *  @name DataTable.defaults.renderer
				 *
				 */
				"renderer": null,


				/**
				 * Set the data property name that DataTables should use to get a row's id
				 * to set as the `id` property in the node.
				 *  @type string
				 *  @default DT_RowId
				 *
				 *  @name DataTable.defaults.rowId
				 */
				"rowId": "DT_RowId"
			};

			_fnHungarianMap(DataTable.defaults);



			/*
			 * Developer note - See note in model.defaults.js about the use of Hungarian
			 * notation and camel case.
			 */

			/**
			 * Column options that can be given to DataTables at initialisation time.
			 *  @namespace
			 */
			DataTable.defaults.column = {
				/**
				 * Define which column(s) an order will occur on for this column. This
				 * allows a column's ordering to take multiple columns into account when
				 * doing a sort or use the data from a different column. For example first
				 * name / last name columns make sense to do a multi-column sort over the
				 * two columns.
				 *  @type array|int
				 *  @default null <i>Takes the value of the column index automatically</i>
				 *
				 *  @name DataTable.defaults.column.orderData
				 *  @dtopt Columns
				 *
				 *  @example
				 *    // Using `columnDefs`
				 *    $(document).ready( function() {
				 *      $('#example').dataTable( {
				 *        "columnDefs": [
				 *          { "orderData": [ 0, 1 ], "targets": [ 0 ] },
				 *          { "orderData": [ 1, 0 ], "targets": [ 1 ] },
				 *          { "orderData": 2, "targets": [ 2 ] }
				 *        ]
				 *      } );
				 *    } );
				 *
				 *  @example
				 *    // Using `columns`
				 *    $(document).ready( function() {
				 *      $('#example').dataTable( {
				 *        "columns": [
				 *          { "orderData": [ 0, 1 ] },
				 *          { "orderData": [ 1, 0 ] },
				 *          { "orderData": 2 },
				 *          null,
				 *          null
				 *        ]
				 *      } );
				 *    } );
				 */
				"aDataSort": null,
				"iDataSort": -1,


				/**
				 * You can control the default ordering direction, and even alter the
				 * behaviour of the sort handler (i.e. only allow ascending ordering etc)
				 * using this parameter.
				 *  @type array
				 *  @default [ 'asc', 'desc' ]
				 *
				 *  @name DataTable.defaults.column.orderSequence
				 *  @dtopt Columns
				 *
				 *  @example
				 *    // Using `columnDefs`
				 *    $(document).ready( function() {
				 *      $('#example').dataTable( {
				 *        "columnDefs": [
				 *          { "orderSequence": [ "asc" ], "targets": [ 1 ] },
				 *          { "orderSequence": [ "desc", "asc", "asc" ], "targets": [ 2 ] },
				 *          { "orderSequence": [ "desc" ], "targets": [ 3 ] }
				 *        ]
				 *      } );
				 *    } );
				 *
				 *  @example
				 *    // Using `columns`
				 *    $(document).ready( function() {
				 *      $('#example').dataTable( {
				 *        "columns": [
				 *          null,
				 *          { "orderSequence": [ "asc" ] },
				 *          { "orderSequence": [ "desc", "asc", "asc" ] },
				 *          { "orderSequence": [ "desc" ] },
				 *          null
				 *        ]
				 *      } );
				 *    } );
				 */
				"asSorting": ['asc', 'desc'],


				/**
				 * Enable or disable filtering on the data in this column.
				 *  @type boolean
				 *  @default true
				 *
				 *  @name DataTable.defaults.column.searchable
				 *  @dtopt Columns
				 *
				 *  @example
				 *    // Using `columnDefs`
				 *    $(document).ready( function() {
				 *      $('#example').dataTable( {
				 *        "columnDefs": [
				 *          { "searchable": false, "targets": [ 0 ] }
				 *        ] } );
				 *    } );
				 *
				 *  @example
				 *    // Using `columns`
				 *    $(document).ready( function() {
				 *      $('#example').dataTable( {
				 *        "columns": [
				 *          { "searchable": false },
				 *          null,
				 *          null,
				 *          null,
				 *          null
				 *        ] } );
				 *    } );
				 */
				"bSearchable": true,


				/**
				 * Enable or disable ordering on this column.
				 *  @type boolean
				 *  @default true
				 *
				 *  @name DataTable.defaults.column.orderable
				 *  @dtopt Columns
				 *
				 *  @example
				 *    // Using `columnDefs`
				 *    $(document).ready( function() {
				 *      $('#example').dataTable( {
				 *        "columnDefs": [
				 *          { "orderable": false, "targets": [ 0 ] }
				 *        ] } );
				 *    } );
				 *
				 *  @example
				 *    // Using `columns`
				 *    $(document).ready( function() {
				 *      $('#example').dataTable( {
				 *        "columns": [
				 *          { "orderable": false },
				 *          null,
				 *          null,
				 *          null,
				 *          null
				 *        ] } );
				 *    } );
				 */
				"bSortable": true,


				/**
				 * Enable or disable the display of this column.
				 *  @type boolean
				 *  @default true
				 *
				 *  @name DataTable.defaults.column.visible
				 *  @dtopt Columns
				 *
				 *  @example
				 *    // Using `columnDefs`
				 *    $(document).ready( function() {
				 *      $('#example').dataTable( {
				 *        "columnDefs": [
				 *          { "visible": false, "targets": [ 0 ] }
				 *        ] } );
				 *    } );
				 *
				 *  @example
				 *    // Using `columns`
				 *    $(document).ready( function() {
				 *      $('#example').dataTable( {
				 *        "columns": [
				 *          { "visible": false },
				 *          null,
				 *          null,
				 *          null,
				 *          null
				 *        ] } );
				 *    } );
				 */
				"bVisible": true,


				/**
				 * Developer definable function that is called whenever a cell is created (Ajax source,
				 * etc) or processed for input (DOM source). This can be used as a compliment to mRender
				 * allowing you to modify the DOM element (add background colour for example) when the
				 * element is available.
				 *  @type function
				 *  @param {element} td The TD node that has been created
				 *  @param {*} cellData The Data for the cell
				 *  @param {array|object} rowData The data for the whole row
				 *  @param {int} row The row index for the aoData data store
				 *  @param {int} col The column index for aoColumns
				 *
				 *  @name DataTable.defaults.column.createdCell
				 *  @dtopt Columns
				 *
				 *  @example
				 *    $(document).ready( function() {
				 *      $('#example').dataTable( {
				 *        "columnDefs": [ {
				 *          "targets": [3],
				 *          "createdCell": function (td, cellData, rowData, row, col) {
				 *            if ( cellData == "1.7" ) {
				 *              $(td).css('color', 'blue')
				 *            }
				 *          }
				 *        } ]
				 *      });
				 *    } );
				 */
				"fnCreatedCell": null,


				/**
				 * This parameter has been replaced by `data` in DataTables to ensure naming
				 * consistency. `dataProp` can still be used, as there is backwards
				 * compatibility in DataTables for this option, but it is strongly
				 * recommended that you use `data` in preference to `dataProp`.
				 *  @name DataTable.defaults.column.dataProp
				 */


				/**
				 * This property can be used to read data from any data source property,
				 * including deeply nested objects / properties. `data` can be given in a
				 * number of different ways which effect its behaviour:
				 *
				 * * `integer` - treated as an array index for the data source. This is the
				 *   default that DataTables uses (incrementally increased for each column).
				 * * `string` - read an object property from the data source. There are
				 *   three 'special' options that can be used in the string to alter how
				 *   DataTables reads the data from the source object:
				 *    * `.` - Dotted Javascript notation. Just as you use a `.` in
				 *      Javascript to read from nested objects, so to can the options
				 *      specified in `data`. For example: `browser.version` or
				 *      `browser.name`. If your object parameter name contains a period, use
				 *      `\\` to escape it - i.e. `first\\.name`.
				 *    * `[]` - Array notation. DataTables can automatically combine data
				 *      from and array source, joining the data with the characters provided
				 *      between the two brackets. For example: `name[, ]` would provide a
				 *      comma-space separated list from the source array. If no characters
				 *      are provided between the brackets, the original array source is
				 *      returned.
				 *    * `()` - Function notation. Adding `()` to the end of a parameter will
				 *      execute a function of the name given. For example: `browser()` for a
				 *      simple function on the data source, `browser.version()` for a
				 *      function in a nested property or even `browser().version` to get an
				 *      object property if the function called returns an object. Note that
				 *      function notation is recommended for use in `render` rather than
				 *      `data` as it is much simpler to use as a renderer.
				 * * `null` - use the original data source for the row rather than plucking
				 *   data directly from it. This action has effects on two other
				 *   initialisation options:
				 *    * `defaultContent` - When null is given as the `data` option and
				 *      `defaultContent` is specified for the column, the value defined by
				 *      `defaultContent` will be used for the cell.
				 *    * `render` - When null is used for the `data` option and the `render`
				 *      option is specified for the column, the whole data source for the
				 *      row is used for the renderer.
				 * * `function` - the function given will be executed whenever DataTables
				 *   needs to set or get the data for a cell in the column. The function
				 *   takes three parameters:
				 *    * Parameters:
				 *      * `{array|object}` The data source for the row
				 *      * `{string}` The type call data requested - this will be 'set' when
				 *        setting data or 'filter', 'display', 'type', 'sort' or undefined
				 *        when gathering data. Note that when `undefined` is given for the
				 *        type DataTables expects to get the raw data for the object back<
				 *      * `{*}` Data to set when the second parameter is 'set'.
				 *    * Return:
				 *      * The return value from the function is not required when 'set' is
				 *        the type of call, but otherwise the return is what will be used
				 *        for the data requested.
				 *
				 * Note that `data` is a getter and setter option. If you just require
				 * formatting of data for output, you will likely want to use `render` which
				 * is simply a getter and thus simpler to use.
				 *
				 * Note that prior to DataTables 1.9.2 `data` was called `mDataProp`. The
				 * name change reflects the flexibility of this property and is consistent
				 * with the naming of mRender. If 'mDataProp' is given, then it will still
				 * be used by DataTables, as it automatically maps the old name to the new
				 * if required.
				 *
				 *  @type string|int|function|null
				 *  @default null <i>Use automatically calculated column index</i>
				 *
				 *  @name DataTable.defaults.column.data
				 *  @dtopt Columns
				 *
				 *  @example
				 *    // Read table data from objects
				 *    // JSON structure for each row:
				 *    //   {
				 *    //      "engine": {value},
				 *    //      "browser": {value},
				 *    //      "platform": {value},
				 *    //      "version": {value},
				 *    //      "grade": {value}
				 *    //   }
				 *    $(document).ready( function() {
				 *      $('#example').dataTable( {
				 *        "ajaxSource": "sources/objects.txt",
				 *        "columns": [
				 *          { "data": "engine" },
				 *          { "data": "browser" },
				 *          { "data": "platform" },
				 *          { "data": "version" },
				 *          { "data": "grade" }
				 *        ]
				 *      } );
				 *    } );
				 *
				 *  @example
				 *    // Read information from deeply nested objects
				 *    // JSON structure for each row:
				 *    //   {
				 *    //      "engine": {value},
				 *    //      "browser": {value},
				 *    //      "platform": {
				 *    //         "inner": {value}
				 *    //      },
				 *    //      "details": [
				 *    //         {value}, {value}
				 *    //      ]
				 *    //   }
				 *    $(document).ready( function() {
				 *      $('#example').dataTable( {
				 *        "ajaxSource": "sources/deep.txt",
				 *        "columns": [
				 *          { "data": "engine" },
				 *          { "data": "browser" },
				 *          { "data": "platform.inner" },
				 *          { "data": "details.0" },
				 *          { "data": "details.1" }
				 *        ]
				 *      } );
				 *    } );
				 *
				 *  @example
				 *    // Using `data` as a function to provide different information for
				 *    // sorting, filtering and display. In this case, currency (price)
				 *    $(document).ready( function() {
				 *      $('#example').dataTable( {
				 *        "columnDefs": [ {
				 *          "targets": [ 0 ],
				 *          "data": function ( source, type, val ) {
				 *            if (type === 'set') {
				 *              source.price = val;
				 *              // Store the computed dislay and filter values for efficiency
				 *              source.price_display = val=="" ? "" : "$"+numberFormat(val);
				 *              source.price_filter  = val=="" ? "" : "$"+numberFormat(val)+" "+val;
				 *              return;
				 *            }
				 *            else if (type === 'display') {
				 *              return source.price_display;
				 *            }
				 *            else if (type === 'filter') {
				 *              return source.price_filter;
				 *            }
				 *            // 'sort', 'type' and undefined all just use the integer
				 *            return source.price;
				 *          }
				 *        } ]
				 *      } );
				 *    } );
				 *
				 *  @example
				 *    // Using default content
				 *    $(document).ready( function() {
				 *      $('#example').dataTable( {
				 *        "columnDefs": [ {
				 *          "targets": [ 0 ],
				 *          "data": null,
				 *          "defaultContent": "Click to edit"
				 *        } ]
				 *      } );
				 *    } );
				 *
				 *  @example
				 *    // Using array notation - outputting a list from an array
				 *    $(document).ready( function() {
				 *      $('#example').dataTable( {
				 *        "columnDefs": [ {
				 *          "targets": [ 0 ],
				 *          "data": "name[, ]"
				 *        } ]
				 *      } );
				 *    } );
				 *
				 */
				"mData": null,


				/**
				 * This property is the rendering partner to `data` and it is suggested that
				 * when you want to manipulate data for display (including filtering,
				 * sorting etc) without altering the underlying data for the table, use this
				 * property. `render` can be considered to be the the read only companion to
				 * `data` which is read / write (then as such more complex). Like `data`
				 * this option can be given in a number of different ways to effect its
				 * behaviour:
				 *
				 * * `integer` - treated as an array index for the data source. This is the
				 *   default that DataTables uses (incrementally increased for each column).
				 * * `string` - read an object property from the data source. There are
				 *   three 'special' options that can be used in the string to alter how
				 *   DataTables reads the data from the source object:
				 *    * `.` - Dotted Javascript notation. Just as you use a `.` in
				 *      Javascript to read from nested objects, so to can the options
				 *      specified in `data`. For example: `browser.version` or
				 *      `browser.name`. If your object parameter name contains a period, use
				 *      `\\` to escape it - i.e. `first\\.name`.
				 *    * `[]` - Array notation. DataTables can automatically combine data
				 *      from and array source, joining the data with the characters provided
				 *      between the two brackets. For example: `name[, ]` would provide a
				 *      comma-space separated list from the source array. If no characters
				 *      are provided between the brackets, the original array source is
				 *      returned.
				 *    * `()` - Function notation. Adding `()` to the end of a parameter will
				 *      execute a function of the name given. For example: `browser()` for a
				 *      simple function on the data source, `browser.version()` for a
				 *      function in a nested property or even `browser().version` to get an
				 *      object property if the function called returns an object.
				 * * `object` - use different data for the different data types requested by
				 *   DataTables ('filter', 'display', 'type' or 'sort'). The property names
				 *   of the object is the data type the property refers to and the value can
				 *   defined using an integer, string or function using the same rules as
				 *   `render` normally does. Note that an `_` option _must_ be specified.
				 *   This is the default value to use if you haven't specified a value for
				 *   the data type requested by DataTables.
				 * * `function` - the function given will be executed whenever DataTables
				 *   needs to set or get the data for a cell in the column. The function
				 *   takes three parameters:
				 *    * Parameters:
				 *      * {array|object} The data source for the row (based on `data`)
				 *      * {string} The type call data requested - this will be 'filter',
				 *        'display', 'type' or 'sort'.
				 *      * {array|object} The full data source for the row (not based on
				 *        `data`)
				 *    * Return:
				 *      * The return value from the function is what will be used for the
				 *        data requested.
				 *
				 *  @type string|int|function|object|null
				 *  @default null Use the data source value.
				 *
				 *  @name DataTable.defaults.column.render
				 *  @dtopt Columns
				 *
				 *  @example
				 *    // Create a comma separated list from an array of objects
				 *    $(document).ready( function() {
				 *      $('#example').dataTable( {
				 *        "ajaxSource": "sources/deep.txt",
				 *        "columns": [
				 *          { "data": "engine" },
				 *          { "data": "browser" },
				 *          {
				 *            "data": "platform",
				 *            "render": "[, ].name"
				 *          }
				 *        ]
				 *      } );
				 *    } );
				 *
				 *  @example
				 *    // Execute a function to obtain data
				 *    $(document).ready( function() {
				 *      $('#example').dataTable( {
				 *        "columnDefs": [ {
				 *          "targets": [ 0 ],
				 *          "data": null, // Use the full data source object for the renderer's source
				 *          "render": "browserName()"
				 *        } ]
				 *      } );
				 *    } );
				 *
				 *  @example
				 *    // As an object, extracting different data for the different types
				 *    // This would be used with a data source such as:
				 *    //   { "phone": 5552368, "phone_filter": "5552368 555-2368", "phone_display": "555-2368" }
				 *    // Here the `phone` integer is used for sorting and type detection, while `phone_filter`
				 *    // (which has both forms) is used for filtering for if a user inputs either format, while
				 *    // the formatted phone number is the one that is shown in the table.
				 *    $(document).ready( function() {
				 *      $('#example').dataTable( {
				 *        "columnDefs": [ {
				 *          "targets": [ 0 ],
				 *          "data": null, // Use the full data source object for the renderer's source
				 *          "render": {
				 *            "_": "phone",
				 *            "filter": "phone_filter",
				 *            "display": "phone_display"
				 *          }
				 *        } ]
				 *      } );
				 *    } );
				 *
				 *  @example
				 *    // Use as a function to create a link from the data source
				 *    $(document).ready( function() {
				 *      $('#example').dataTable( {
				 *        "columnDefs": [ {
				 *          "targets": [ 0 ],
				 *          "data": "download_link",
				 *          "render": function ( data, type, full ) {
				 *            return '<a href="'+data+'">Download</a>';
				 *          }
				 *        } ]
				 *      } );
				 *    } );
				 */
				"mRender": null,


				/**
				 * Change the cell type created for the column - either TD cells or TH cells. This
				 * can be useful as TH cells have semantic meaning in the table body, allowing them
				 * to act as a header for a row (you may wish to add scope='row' to the TH elements).
				 *  @type string
				 *  @default td
				 *
				 *  @name DataTable.defaults.column.cellType
				 *  @dtopt Columns
				 *
				 *  @example
				 *    // Make the first column use TH cells
				 *    $(document).ready( function() {
				 *      $('#example').dataTable( {
				 *        "columnDefs": [ {
				 *          "targets": [ 0 ],
				 *          "cellType": "th"
				 *        } ]
				 *      } );
				 *    } );
				 */
				"sCellType": "td",


				/**
				 * Class to give to each cell in this column.
				 *  @type string
				 *  @default <i>Empty string</i>
				 *
				 *  @name DataTable.defaults.column.class
				 *  @dtopt Columns
				 *
				 *  @example
				 *    // Using `columnDefs`
				 *    $(document).ready( function() {
				 *      $('#example').dataTable( {
				 *        "columnDefs": [
				 *          { "class": "my_class", "targets": [ 0 ] }
				 *        ]
				 *      } );
				 *    } );
				 *
				 *  @example
				 *    // Using `columns`
				 *    $(document).ready( function() {
				 *      $('#example').dataTable( {
				 *        "columns": [
				 *          { "class": "my_class" },
				 *          null,
				 *          null,
				 *          null,
				 *          null
				 *        ]
				 *      } );
				 *    } );
				 */
				"sClass": "",

				/**
				 * When DataTables calculates the column widths to assign to each column,
				 * it finds the longest string in each column and then constructs a
				 * temporary table and reads the widths from that. The problem with this
				 * is that "mmm" is much wider then "iiii", but the latter is a longer
				 * string - thus the calculation can go wrong (doing it properly and putting
				 * it into an DOM object and measuring that is horribly(!) slow). Thus as
				 * a "work around" we provide this option. It will append its value to the
				 * text that is found to be the longest string for the column - i.e. padding.
				 * Generally you shouldn't need this!
				 *  @type string
				 *  @default <i>Empty string<i>
				 *
				 *  @name DataTable.defaults.column.contentPadding
				 *  @dtopt Columns
				 *
				 *  @example
				 *    // Using `columns`
				 *    $(document).ready( function() {
				 *      $('#example').dataTable( {
				 *        "columns": [
				 *          null,
				 *          null,
				 *          null,
				 *          {
				 *            "contentPadding": "mmm"
				 *          }
				 *        ]
				 *      } );
				 *    } );
				 */
				"sContentPadding": "",


				/**
				 * Allows a default value to be given for a column's data, and will be used
				 * whenever a null data source is encountered (this can be because `data`
				 * is set to null, or because the data source itself is null).
				 *  @type string
				 *  @default null
				 *
				 *  @name DataTable.defaults.column.defaultContent
				 *  @dtopt Columns
				 *
				 *  @example
				 *    // Using `columnDefs`
				 *    $(document).ready( function() {
				 *      $('#example').dataTable( {
				 *        "columnDefs": [
				 *          {
				 *            "data": null,
				 *            "defaultContent": "Edit",
				 *            "targets": [ -1 ]
				 *          }
				 *        ]
				 *      } );
				 *    } );
				 *
				 *  @example
				 *    // Using `columns`
				 *    $(document).ready( function() {
				 *      $('#example').dataTable( {
				 *        "columns": [
				 *          null,
				 *          null,
				 *          null,
				 *          {
				 *            "data": null,
				 *            "defaultContent": "Edit"
				 *          }
				 *        ]
				 *      } );
				 *    } );
				 */
				"sDefaultContent": null,


				/**
				 * This parameter is only used in DataTables' server-side processing. It can
				 * be exceptionally useful to know what columns are being displayed on the
				 * client side, and to map these to database fields. When defined, the names
				 * also allow DataTables to reorder information from the server if it comes
				 * back in an unexpected order (i.e. if you switch your columns around on the
				 * client-side, your server-side code does not also need updating).
				 *  @type string
				 *  @default <i>Empty string</i>
				 *
				 *  @name DataTable.defaults.column.name
				 *  @dtopt Columns
				 *
				 *  @example
				 *    // Using `columnDefs`
				 *    $(document).ready( function() {
				 *      $('#example').dataTable( {
				 *        "columnDefs": [
				 *          { "name": "engine", "targets": [ 0 ] },
				 *          { "name": "browser", "targets": [ 1 ] },
				 *          { "name": "platform", "targets": [ 2 ] },
				 *          { "name": "version", "targets": [ 3 ] },
				 *          { "name": "grade", "targets": [ 4 ] }
				 *        ]
				 *      } );
				 *    } );
				 *
				 *  @example
				 *    // Using `columns`
				 *    $(document).ready( function() {
				 *      $('#example').dataTable( {
				 *        "columns": [
				 *          { "name": "engine" },
				 *          { "name": "browser" },
				 *          { "name": "platform" },
				 *          { "name": "version" },
				 *          { "name": "grade" }
				 *        ]
				 *      } );
				 *    } );
				 */
				"sName": "",


				/**
				 * Defines a data source type for the ordering which can be used to read
				 * real-time information from the table (updating the internally cached
				 * version) prior to ordering. This allows ordering to occur on user
				 * editable elements such as form inputs.
				 *  @type string
				 *  @default std
				 *
				 *  @name DataTable.defaults.column.orderDataType
				 *  @dtopt Columns
				 *
				 *  @example
				 *    // Using `columnDefs`
				 *    $(document).ready( function() {
				 *      $('#example').dataTable( {
				 *        "columnDefs": [
				 *          { "orderDataType": "dom-text", "targets": [ 2, 3 ] },
				 *          { "type": "numeric", "targets": [ 3 ] },
				 *          { "orderDataType": "dom-select", "targets": [ 4 ] },
				 *          { "orderDataType": "dom-checkbox", "targets": [ 5 ] }
				 *        ]
				 *      } );
				 *    } );
				 *
				 *  @example
				 *    // Using `columns`
				 *    $(document).ready( function() {
				 *      $('#example').dataTable( {
				 *        "columns": [
				 *          null,
				 *          null,
				 *          { "orderDataType": "dom-text" },
				 *          { "orderDataType": "dom-text", "type": "numeric" },
				 *          { "orderDataType": "dom-select" },
				 *          { "orderDataType": "dom-checkbox" }
				 *        ]
				 *      } );
				 *    } );
				 */
				"sSortDataType": "std",


				/**
				 * The title of this column.
				 *  @type string
				 *  @default null <i>Derived from the 'TH' value for this column in the
				 *    original HTML table.</i>
				 *
				 *  @name DataTable.defaults.column.title
				 *  @dtopt Columns
				 *
				 *  @example
				 *    // Using `columnDefs`
				 *    $(document).ready( function() {
				 *      $('#example').dataTable( {
				 *        "columnDefs": [
				 *          { "title": "My column title", "targets": [ 0 ] }
				 *        ]
				 *      } );
				 *    } );
				 *
				 *  @example
				 *    // Using `columns`
				 *    $(document).ready( function() {
				 *      $('#example').dataTable( {
				 *        "columns": [
				 *          { "title": "My column title" },
				 *          null,
				 *          null,
				 *          null,
				 *          null
				 *        ]
				 *      } );
				 *    } );
				 */
				"sTitle": null,


				/**
				 * The type allows you to specify how the data for this column will be
				 * ordered. Four types (string, numeric, date and html (which will strip
				 * HTML tags before ordering)) are currently available. Note that only date
				 * formats understood by Javascript's Date() object will be accepted as type
				 * date. For example: "Mar 26, 2008 5:03 PM". May take the values: 'string',
				 * 'numeric', 'date' or 'html' (by default). Further types can be adding
				 * through plug-ins.
				 *  @type string
				 *  @default null <i>Auto-detected from raw data</i>
				 *
				 *  @name DataTable.defaults.column.type
				 *  @dtopt Columns
				 *
				 *  @example
				 *    // Using `columnDefs`
				 *    $(document).ready( function() {
				 *      $('#example').dataTable( {
				 *        "columnDefs": [
				 *          { "type": "html", "targets": [ 0 ] }
				 *        ]
				 *      } );
				 *    } );
				 *
				 *  @example
				 *    // Using `columns`
				 *    $(document).ready( function() {
				 *      $('#example').dataTable( {
				 *        "columns": [
				 *          { "type": "html" },
				 *          null,
				 *          null,
				 *          null,
				 *          null
				 *        ]
				 *      } );
				 *    } );
				 */
				"sType": null,


				/**
				 * Defining the width of the column, this parameter may take any CSS value
				 * (3em, 20px etc). DataTables applies 'smart' widths to columns which have not
				 * been given a specific width through this interface ensuring that the table
				 * remains readable.
				 *  @type string
				 *  @default null <i>Automatic</i>
				 *
				 *  @name DataTable.defaults.column.width
				 *  @dtopt Columns
				 *
				 *  @example
				 *    // Using `columnDefs`
				 *    $(document).ready( function() {
				 *      $('#example').dataTable( {
				 *        "columnDefs": [
				 *          { "width": "20%", "targets": [ 0 ] }
				 *        ]
				 *      } );
				 *    } );
				 *
				 *  @example
				 *    // Using `columns`
				 *    $(document).ready( function() {
				 *      $('#example').dataTable( {
				 *        "columns": [
				 *          { "width": "20%" },
				 *          null,
				 *          null,
				 *          null,
				 *          null
				 *        ]
				 *      } );
				 *    } );
				 */
				"sWidth": null
			};

			_fnHungarianMap(DataTable.defaults.column);



			/**
			 * DataTables settings object - this holds all the information needed for a
			 * given table, including configuration, data and current application of the
			 * table options. DataTables does not have a single instance for each DataTable
			 * with the settings attached to that instance, but rather instances of the
			 * DataTable "class" are created on-the-fly as needed (typically by a
			 * $().dataTable() call) and the settings object is then applied to that
			 * instance.
			 *
			 * Note that this object is related to {@link DataTable.defaults} but this
			 * one is the internal data store for DataTables's cache of columns. It should
			 * NOT be manipulated outside of DataTables. Any configuration should be done
			 * through the initialisation options.
			 *  @namespace
			 *  @todo Really should attach the settings object to individual instances so we
			 *    don't need to create new instances on each $().dataTable() call (if the
			 *    table already exists). It would also save passing oSettings around and
			 *    into every single function. However, this is a very significant
			 *    architecture change for DataTables and will almost certainly break
			 *    backwards compatibility with older installations. This is something that
			 *    will be done in 2.0.
			 */
			DataTable.models.oSettings = {
				/**
				 * Primary features of DataTables and their enablement state.
				 *  @namespace
				 */
				"oFeatures": {

					/**
					 * Flag to say if DataTables should automatically try to calculate the
					 * optimum table and columns widths (true) or not (false).
					 * Note that this parameter will be set by the initialisation routine. To
					 * set a default use {@link DataTable.defaults}.
					 *  @type boolean
					 */
					"bAutoWidth": null,

					/**
					 * Delay the creation of TR and TD elements until they are actually
					 * needed by a driven page draw. This can give a significant speed
					 * increase for Ajax source and Javascript source data, but makes no
					 * difference at all fro DOM and server-side processing tables.
					 * Note that this parameter will be set by the initialisation routine. To
					 * set a default use {@link DataTable.defaults}.
					 *  @type boolean
					 */
					"bDeferRender": null,

					/**
					 * Enable filtering on the table or not. Note that if this is disabled
					 * then there is no filtering at all on the table, including fnFilter.
					 * To just remove the filtering input use sDom and remove the 'f' option.
					 * Note that this parameter will be set by the initialisation routine. To
					 * set a default use {@link DataTable.defaults}.
					 *  @type boolean
					 */
					"bFilter": null,

					/**
					 * Table information element (the 'Showing x of y records' div) enable
					 * flag.
					 * Note that this parameter will be set by the initialisation routine. To
					 * set a default use {@link DataTable.defaults}.
					 *  @type boolean
					 */
					"bInfo": null,

					/**
					 * Present a user control allowing the end user to change the page size
					 * when pagination is enabled.
					 * Note that this parameter will be set by the initialisation routine. To
					 * set a default use {@link DataTable.defaults}.
					 *  @type boolean
					 */
					"bLengthChange": null,

					/**
					 * Pagination enabled or not. Note that if this is disabled then length
					 * changing must also be disabled.
					 * Note that this parameter will be set by the initialisation routine. To
					 * set a default use {@link DataTable.defaults}.
					 *  @type boolean
					 */
					"bPaginate": null,

					/**
					 * Processing indicator enable flag whenever DataTables is enacting a
					 * user request - typically an Ajax request for server-side processing.
					 * Note that this parameter will be set by the initialisation routine. To
					 * set a default use {@link DataTable.defaults}.
					 *  @type boolean
					 */
					"bProcessing": null,

					/**
					 * Server-side processing enabled flag - when enabled DataTables will
					 * get all data from the server for every draw - there is no filtering,
					 * sorting or paging done on the client-side.
					 * Note that this parameter will be set by the initialisation routine. To
					 * set a default use {@link DataTable.defaults}.
					 *  @type boolean
					 */
					"bServerSide": null,

					/**
					 * Sorting enablement flag.
					 * Note that this parameter will be set by the initialisation routine. To
					 * set a default use {@link DataTable.defaults}.
					 *  @type boolean
					 */
					"bSort": null,

					/**
					 * Multi-column sorting
					 * Note that this parameter will be set by the initialisation routine. To
					 * set a default use {@link DataTable.defaults}.
					 *  @type boolean
					 */
					"bSortMulti": null,

					/**
					 * Apply a class to the columns which are being sorted to provide a
					 * visual highlight or not. This can slow things down when enabled since
					 * there is a lot of DOM interaction.
					 * Note that this parameter will be set by the initialisation routine. To
					 * set a default use {@link DataTable.defaults}.
					 *  @type boolean
					 */
					"bSortClasses": null,

					/**
					 * State saving enablement flag.
					 * Note that this parameter will be set by the initialisation routine. To
					 * set a default use {@link DataTable.defaults}.
					 *  @type boolean
					 */
					"bStateSave": null
				},


				/**
				 * Scrolling settings for a table.
				 *  @namespace
				 */
				"oScroll": {
					/**
					 * When the table is shorter in height than sScrollY, collapse the
					 * table container down to the height of the table (when true).
					 * Note that this parameter will be set by the initialisation routine. To
					 * set a default use {@link DataTable.defaults}.
					 *  @type boolean
					 */
					"bCollapse": null,

					/**
					 * Width of the scrollbar for the web-browser's platform. Calculated
					 * during table initialisation.
					 *  @type int
					 *  @default 0
					 */
					"iBarWidth": 0,

					/**
					 * Viewport width for horizontal scrolling. Horizontal scrolling is
					 * disabled if an empty string.
					 * Note that this parameter will be set by the initialisation routine. To
					 * set a default use {@link DataTable.defaults}.
					 *  @type string
					 */
					"sX": null,

					/**
					 * Width to expand the table to when using x-scrolling. Typically you
					 * should not need to use this.
					 * Note that this parameter will be set by the initialisation routine. To
					 * set a default use {@link DataTable.defaults}.
					 *  @type string
					 *  @deprecated
					 */
					"sXInner": null,

					/**
					 * Viewport height for vertical scrolling. Vertical scrolling is disabled
					 * if an empty string.
					 * Note that this parameter will be set by the initialisation routine. To
					 * set a default use {@link DataTable.defaults}.
					 *  @type string
					 */
					"sY": null
				},

				/**
				 * Language information for the table.
				 *  @namespace
				 *  @extends DataTable.defaults.oLanguage
				 */
				"oLanguage": {
					/**
					 * Information callback function. See
					 * {@link DataTable.defaults.fnInfoCallback}
					 *  @type function
					 *  @default null
					 */
					"fnInfoCallback": null
				},

				/**
				 * Browser support parameters
				 *  @namespace
				 */
				"oBrowser": {
					/**
					 * Indicate if the browser incorrectly calculates width:100% inside a
					 * scrolling element (IE6/7)
					 *  @type boolean
					 *  @default false
					 */
					"bScrollOversize": false,

					/**
					 * Determine if the vertical scrollbar is on the right or left of the
					 * scrolling container - needed for rtl language layout, although not
					 * all browsers move the scrollbar (Safari).
					 *  @type boolean
					 *  @default false
					 */
					"bScrollbarLeft": false,

					/**
					 * Flag for if `getBoundingClientRect` is fully supported or not
					 *  @type boolean
					 *  @default false
					 */
					"bBounding": false,

					/**
					 * Browser scrollbar width
					 *  @type integer
					 *  @default 0
					 */
					"barWidth": 0
				},


				"ajax": null,


				/**
				 * Array referencing the nodes which are used for the features. The
				 * parameters of this object match what is allowed by sDom - i.e.
				 *   <ul>
				 *     <li>'l' - Length changing</li>
				 *     <li>'f' - Filtering input</li>
				 *     <li>'t' - The table!</li>
				 *     <li>'i' - Information</li>
				 *     <li>'p' - Pagination</li>
				 *     <li>'r' - pRocessing</li>
				 *   </ul>
				 *  @type array
				 *  @default []
				 */
				"aanFeatures": [],

				/**
				 * Store data information - see {@link DataTable.models.oRow} for detailed
				 * information.
				 *  @type array
				 *  @default []
				 */
				"aoData": [],

				/**
				 * Array of indexes which are in the current display (after filtering etc)
				 *  @type array
				 *  @default []
				 */
				"aiDisplay": [],

				/**
				 * Array of indexes for display - no filtering
				 *  @type array
				 *  @default []
				 */
				"aiDisplayMaster": [],

				/**
				 * Map of row ids to data indexes
				 *  @type object
				 *  @default {}
				 */
				"aIds": {},

				/**
				 * Store information about each column that is in use
				 *  @type array
				 *  @default []
				 */
				"aoColumns": [],

				/**
				 * Store information about the table's header
				 *  @type array
				 *  @default []
				 */
				"aoHeader": [],

				/**
				 * Store information about the table's footer
				 *  @type array
				 *  @default []
				 */
				"aoFooter": [],

				/**
				 * Store the applied global search information in case we want to force a
				 * research or compare the old search to a new one.
				 * Note that this parameter will be set by the initialisation routine. To
				 * set a default use {@link DataTable.defaults}.
				 *  @namespace
				 *  @extends DataTable.models.oSearch
				 */
				"oPreviousSearch": {},

				/**
				 * Store the applied search for each column - see
				 * {@link DataTable.models.oSearch} for the format that is used for the
				 * filtering information for each column.
				 *  @type array
				 *  @default []
				 */
				"aoPreSearchCols": [],

				/**
				 * Sorting that is applied to the table. Note that the inner arrays are
				 * used in the following manner:
				 * <ul>
				 *   <li>Index 0 - column number</li>
				 *   <li>Index 1 - current sorting direction</li>
				 * </ul>
				 * Note that this parameter will be set by the initialisation routine. To
				 * set a default use {@link DataTable.defaults}.
				 *  @type array
				 *  @todo These inner arrays should really be objects
				 */
				"aaSorting": null,

				/**
				 * Sorting that is always applied to the table (i.e. prefixed in front of
				 * aaSorting).
				 * Note that this parameter will be set by the initialisation routine. To
				 * set a default use {@link DataTable.defaults}.
				 *  @type array
				 *  @default []
				 */
				"aaSortingFixed": [],

				/**
				 * Classes to use for the striping of a table.
				 * Note that this parameter will be set by the initialisation routine. To
				 * set a default use {@link DataTable.defaults}.
				 *  @type array
				 *  @default []
				 */
				"asStripeClasses": null,

				/**
				 * If restoring a table - we should restore its striping classes as well
				 *  @type array
				 *  @default []
				 */
				"asDestroyStripes": [],

				/**
				 * If restoring a table - we should restore its width
				 *  @type int
				 *  @default 0
				 */
				"sDestroyWidth": 0,

				/**
				 * Callback functions array for every time a row is inserted (i.e. on a draw).
				 *  @type array
				 *  @default []
				 */
				"aoRowCallback": [],

				/**
				 * Callback functions for the header on each draw.
				 *  @type array
				 *  @default []
				 */
				"aoHeaderCallback": [],

				/**
				 * Callback function for the footer on each draw.
				 *  @type array
				 *  @default []
				 */
				"aoFooterCallback": [],

				/**
				 * Array of callback functions for draw callback functions
				 *  @type array
				 *  @default []
				 */
				"aoDrawCallback": [],

				/**
				 * Array of callback functions for row created function
				 *  @type array
				 *  @default []
				 */
				"aoRowCreatedCallback": [],

				/**
				 * Callback functions for just before the table is redrawn. A return of
				 * false will be used to cancel the draw.
				 *  @type array
				 *  @default []
				 */
				"aoPreDrawCallback": [],

				/**
				 * Callback functions for when the table has been initialised.
				 *  @type array
				 *  @default []
				 */
				"aoInitComplete": [],


				/**
				 * Callbacks for modifying the settings to be stored for state saving, prior to
				 * saving state.
				 *  @type array
				 *  @default []
				 */
				"aoStateSaveParams": [],

				/**
				 * Callbacks for modifying the settings that have been stored for state saving
				 * prior to using the stored values to restore the state.
				 *  @type array
				 *  @default []
				 */
				"aoStateLoadParams": [],

				/**
				 * Callbacks for operating on the settings object once the saved state has been
				 * loaded
				 *  @type array
				 *  @default []
				 */
				"aoStateLoaded": [],

				/**
				 * Cache the table ID for quick access
				 *  @type string
				 *  @default <i>Empty string</i>
				 */
				"sTableId": "",

				/**
				 * The TABLE node for the main table
				 *  @type node
				 *  @default null
				 */
				"nTable": null,

				/**
				 * Permanent ref to the thead element
				 *  @type node
				 *  @default null
				 */
				"nTHead": null,

				/**
				 * Permanent ref to the tfoot element - if it exists
				 *  @type node
				 *  @default null
				 */
				"nTFoot": null,

				/**
				 * Permanent ref to the tbody element
				 *  @type node
				 *  @default null
				 */
				"nTBody": null,

				/**
				 * Cache the wrapper node (contains all DataTables controlled elements)
				 *  @type node
				 *  @default null
				 */
				"nTableWrapper": null,

				/**
				 * Indicate if when using server-side processing the loading of data
				 * should be deferred until the second draw.
				 * Note that this parameter will be set by the initialisation routine. To
				 * set a default use {@link DataTable.defaults}.
				 *  @type boolean
				 *  @default false
				 */
				"bDeferLoading": false,

				/**
				 * Indicate if all required information has been read in
				 *  @type boolean
				 *  @default false
				 */
				"bInitialised": false,

				/**
				 * Information about open rows. Each object in the array has the parameters
				 * 'nTr' and 'nParent'
				 *  @type array
				 *  @default []
				 */
				"aoOpenRows": [],

				/**
				 * Dictate the positioning of DataTables' control elements - see
				 * {@link DataTable.model.oInit.sDom}.
				 * Note that this parameter will be set by the initialisation routine. To
				 * set a default use {@link DataTable.defaults}.
				 *  @type string
				 *  @default null
				 */
				"sDom": null,

				/**
				 * Search delay (in mS)
				 *  @type integer
				 *  @default null
				 */
				"searchDelay": null,

				/**
				 * Which type of pagination should be used.
				 * Note that this parameter will be set by the initialisation routine. To
				 * set a default use {@link DataTable.defaults}.
				 *  @type string
				 *  @default two_button
				 */
				"sPaginationType": "two_button",

				/**
				 * The state duration (for `stateSave`) in seconds.
				 * Note that this parameter will be set by the initialisation routine. To
				 * set a default use {@link DataTable.defaults}.
				 *  @type int
				 *  @default 0
				 */
				"iStateDuration": 0,

				/**
				 * Array of callback functions for state saving. Each array element is an
				 * object with the following parameters:
				 *   <ul>
				 *     <li>function:fn - function to call. Takes two parameters, oSettings
				 *       and the JSON string to save that has been thus far created. Returns
				 *       a JSON string to be inserted into a json object
				 *       (i.e. '"param": [ 0, 1, 2]')</li>
				 *     <li>string:sName - name of callback</li>
				 *   </ul>
				 *  @type array
				 *  @default []
				 */
				"aoStateSave": [],

				/**
				 * Array of callback functions for state loading. Each array element is an
				 * object with the following parameters:
				 *   <ul>
				 *     <li>function:fn - function to call. Takes two parameters, oSettings
				 *       and the object stored. May return false to cancel state loading</li>
				 *     <li>string:sName - name of callback</li>
				 *   </ul>
				 *  @type array
				 *  @default []
				 */
				"aoStateLoad": [],

				/**
				 * State that was saved. Useful for back reference
				 *  @type object
				 *  @default null
				 */
				"oSavedState": null,

				/**
				 * State that was loaded. Useful for back reference
				 *  @type object
				 *  @default null
				 */
				"oLoadedState": null,

				/**
				 * Source url for AJAX data for the table.
				 * Note that this parameter will be set by the initialisation routine. To
				 * set a default use {@link DataTable.defaults}.
				 *  @type string
				 *  @default null
				 */
				"sAjaxSource": null,

				/**
				 * Property from a given object from which to read the table data from. This
				 * can be an empty string (when not server-side processing), in which case
				 * it is  assumed an an array is given directly.
				 * Note that this parameter will be set by the initialisation routine. To
				 * set a default use {@link DataTable.defaults}.
				 *  @type string
				 */
				"sAjaxDataProp": null,

				/**
				 * Note if draw should be blocked while getting data
				 *  @type boolean
				 *  @default true
				 */
				"bAjaxDataGet": true,

				/**
				 * The last jQuery XHR object that was used for server-side data gathering.
				 * This can be used for working with the XHR information in one of the
				 * callbacks
				 *  @type object
				 *  @default null
				 */
				"jqXHR": null,

				/**
				 * JSON returned from the server in the last Ajax request
				 *  @type object
				 *  @default undefined
				 */
				"json": undefined,

				/**
				 * Data submitted as part of the last Ajax request
				 *  @type object
				 *  @default undefined
				 */
				"oAjaxData": undefined,

				/**
				 * Function to get the server-side data.
				 * Note that this parameter will be set by the initialisation routine. To
				 * set a default use {@link DataTable.defaults}.
				 *  @type function
				 */
				"fnServerData": null,

				/**
				 * Functions which are called prior to sending an Ajax request so extra
				 * parameters can easily be sent to the server
				 *  @type array
				 *  @default []
				 */
				"aoServerParams": [],

				/**
				 * Send the XHR HTTP method - GET or POST (could be PUT or DELETE if
				 * required).
				 * Note that this parameter will be set by the initialisation routine. To
				 * set a default use {@link DataTable.defaults}.
				 *  @type string
				 */
				"sServerMethod": null,

				/**
				 * Format numbers for display.
				 * Note that this parameter will be set by the initialisation routine. To
				 * set a default use {@link DataTable.defaults}.
				 *  @type function
				 */
				"fnFormatNumber": null,

				/**
				 * List of options that can be used for the user selectable length menu.
				 * Note that this parameter will be set by the initialisation routine. To
				 * set a default use {@link DataTable.defaults}.
				 *  @type array
				 *  @default []
				 */
				"aLengthMenu": null,

				/**
				 * Counter for the draws that the table does. Also used as a tracker for
				 * server-side processing
				 *  @type int
				 *  @default 0
				 */
				"iDraw": 0,

				/**
				 * Indicate if a redraw is being done - useful for Ajax
				 *  @type boolean
				 *  @default false
				 */
				"bDrawing": false,

				/**
				 * Draw index (iDraw) of the last error when parsing the returned data
				 *  @type int
				 *  @default -1
				 */
				"iDrawError": -1,

				/**
				 * Paging display length
				 *  @type int
				 *  @default 10
				 */
				"_iDisplayLength": 10,

				/**
				 * Paging start point - aiDisplay index
				 *  @type int
				 *  @default 0
				 */
				"_iDisplayStart": 0,

				/**
				 * Server-side processing - number of records in the result set
				 * (i.e. before filtering), Use fnRecordsTotal rather than
				 * this property to get the value of the number of records, regardless of
				 * the server-side processing setting.
				 *  @type int
				 *  @default 0
				 *  @private
				 */
				"_iRecordsTotal": 0,

				/**
				 * Server-side processing - number of records in the current display set
				 * (i.e. after filtering). Use fnRecordsDisplay rather than
				 * this property to get the value of the number of records, regardless of
				 * the server-side processing setting.
				 *  @type boolean
				 *  @default 0
				 *  @private
				 */
				"_iRecordsDisplay": 0,

				/**
				 * The classes to use for the table
				 *  @type object
				 *  @default {}
				 */
				"oClasses": {},

				/**
				 * Flag attached to the settings object so you can check in the draw
				 * callback if filtering has been done in the draw. Deprecated in favour of
				 * events.
				 *  @type boolean
				 *  @default false
				 *  @deprecated
				 */
				"bFiltered": false,

				/**
				 * Flag attached to the settings object so you can check in the draw
				 * callback if sorting has been done in the draw. Deprecated in favour of
				 * events.
				 *  @type boolean
				 *  @default false
				 *  @deprecated
				 */
				"bSorted": false,

				/**
				 * Indicate that if multiple rows are in the header and there is more than
				 * one unique cell per column, if the top one (true) or bottom one (false)
				 * should be used for sorting / title by DataTables.
				 * Note that this parameter will be set by the initialisation routine. To
				 * set a default use {@link DataTable.defaults}.
				 *  @type boolean
				 */
				"bSortCellsTop": null,

				/**
				 * Initialisation object that is used for the table
				 *  @type object
				 *  @default null
				 */
				"oInit": null,

				/**
				 * Destroy callback functions - for plug-ins to attach themselves to the
				 * destroy so they can clean up markup and events.
				 *  @type array
				 *  @default []
				 */
				"aoDestroyCallback": [],


				/**
				 * Get the number of records in the current record set, before filtering
				 *  @type function
				 */
				"fnRecordsTotal": function () {
					return _fnDataSource(this) == 'ssp' ?
						this._iRecordsTotal * 1 :
						this.aiDisplayMaster.length;
				},

				/**
				 * Get the number of records in the current record set, after filtering
				 *  @type function
				 */
				"fnRecordsDisplay": function () {
					return _fnDataSource(this) == 'ssp' ?
						this._iRecordsDisplay * 1 :
						this.aiDisplay.length;
				},

				/**
				 * Get the display end point - aiDisplay index
				 *  @type function
				 */
				"fnDisplayEnd": function () {
					var
						len = this._iDisplayLength,
						start = this._iDisplayStart,
						calc = start + len,
						records = this.aiDisplay.length,
						features = this.oFeatures,
						paginate = features.bPaginate;

					if (features.bServerSide) {
						return paginate === false || len === -1 ?
							start + records :
							Math.min(start + len, this._iRecordsDisplay);
					} else {
						return !paginate || calc > records || len === -1 ?
							records :
							calc;
					}
				},

				/**
				 * The DataTables object for this table
				 *  @type object
				 *  @default null
				 */
				"oInstance": null,

				/**
				 * Unique identifier for each instance of the DataTables object. If there
				 * is an ID on the table node, then it takes that value, otherwise an
				 * incrementing internal counter is used.
				 *  @type string
				 *  @default null
				 */
				"sInstance": null,

				/**
				 * tabindex attribute value that is added to DataTables control elements, allowing
				 * keyboard navigation of the table and its controls.
				 */
				"iTabIndex": 0,

				/**
				 * DIV container for the footer scrolling table if scrolling
				 */
				"nScrollHead": null,

				/**
				 * DIV container for the footer scrolling table if scrolling
				 */
				"nScrollFoot": null,

				/**
				 * Last applied sort
				 *  @type array
				 *  @default []
				 */
				"aLastSort": [],

				/**
				 * Stored plug-in instances
				 *  @type object
				 *  @default {}
				 */
				"oPlugins": {},

				/**
				 * Function used to get a row's id from the row's data
				 *  @type function
				 *  @default null
				 */
				"rowIdFn": null,

				/**
				 * Data location where to store a row's id
				 *  @type string
				 *  @default null
				 */
				"rowId": null
			};

			/**
			 * Extension object for DataTables that is used to provide all extension
			 * options.
			 *
			 * Note that the `DataTable.ext` object is available through
			 * `jQuery.fn.dataTable.ext` where it may be accessed and manipulated. It is
			 * also aliased to `jQuery.fn.dataTableExt` for historic reasons.
			 *  @namespace
			 *  @extends DataTable.models.ext
			 */


			/**
			 * DataTables extensions
			 * 
			 * This namespace acts as a collection area for plug-ins that can be used to
			 * extend DataTables capabilities. Indeed many of the build in methods
			 * use this method to provide their own capabilities (sorting methods for
			 * example).
			 *
			 * Note that this namespace is aliased to `jQuery.fn.dataTableExt` for legacy
			 * reasons
			 *
			 *  @namespace
			 */
			DataTable.ext = _ext = {
				/**
				 * Buttons. For use with the Buttons extension for DataTables. This is
				 * defined here so other extensions can define buttons regardless of load
				 * order. It is _not_ used by DataTables core.
				 *
				 *  @type object
				 *  @default {}
				 */
				buttons: {},


				/**
				 * Element class names
				 *
				 *  @type object
				 *  @default {}
				 */
				classes: {},


				/**
				 * DataTables build type (expanded by the download builder)
				 *
				 *  @type string
				 */
				build: "dt/dt-1.10.18",


				/**
				 * Error reporting.
				 * 
				 * How should DataTables report an error. Can take the value 'alert',
				 * 'throw', 'none' or a function.
				 *
				 *  @type string|function
				 *  @default alert
				 */
				errMode: "alert",


				/**
				 * Feature plug-ins.
				 * 
				 * This is an array of objects which describe the feature plug-ins that are
				 * available to DataTables. These feature plug-ins are then available for
				 * use through the `dom` initialisation option.
				 * 
				 * Each feature plug-in is described by an object which must have the
				 * following properties:
				 * 
				 * * `fnInit` - function that is used to initialise the plug-in,
				 * * `cFeature` - a character so the feature can be enabled by the `dom`
				 *   instillation option. This is case sensitive.
				 *
				 * The `fnInit` function has the following input parameters:
				 *
				 * 1. `{object}` DataTables settings object: see
				 *    {@link DataTable.models.oSettings}
				 *
				 * And the following return is expected:
				 * 
				 * * {node|null} The element which contains your feature. Note that the
				 *   return may also be void if your plug-in does not require to inject any
				 *   DOM elements into DataTables control (`dom`) - for example this might
				 *   be useful when developing a plug-in which allows table control via
				 *   keyboard entry
				 *
				 *  @type array
				 *
				 *  @example
				 *    $.fn.dataTable.ext.features.push( {
				 *      "fnInit": function( oSettings ) {
				 *        return new TableTools( { "oDTSettings": oSettings } );
				 *      },
				 *      "cFeature": "T"
				 *    } );
				 */
				feature: [],


				/**
				 * Row searching.
				 * 
				 * This method of searching is complimentary to the default type based
				 * searching, and a lot more comprehensive as it allows you complete control
				 * over the searching logic. Each element in this array is a function
				 * (parameters described below) that is called for every row in the table,
				 * and your logic decides if it should be included in the searching data set
				 * or not.
				 *
				 * Searching functions have the following input parameters:
				 *
				 * 1. `{object}` DataTables settings object: see
				 *    {@link DataTable.models.oSettings}
				 * 2. `{array|object}` Data for the row to be processed (same as the
				 *    original format that was passed in as the data source, or an array
				 *    from a DOM data source
				 * 3. `{int}` Row index ({@link DataTable.models.oSettings.aoData}), which
				 *    can be useful to retrieve the `TR` element if you need DOM interaction.
				 *
				 * And the following return is expected:
				 *
				 * * {boolean} Include the row in the searched result set (true) or not
				 *   (false)
				 *
				 * Note that as with the main search ability in DataTables, technically this
				 * is "filtering", since it is subtractive. However, for consistency in
				 * naming we call it searching here.
				 *
				 *  @type array
				 *  @default []
				 *
				 *  @example
				 *    // The following example shows custom search being applied to the
				 *    // fourth column (i.e. the data[3] index) based on two input values
				 *    // from the end-user, matching the data in a certain range.
				 *    $.fn.dataTable.ext.search.push(
				 *      function( settings, data, dataIndex ) {
				 *        var min = document.getElementById('min').value * 1;
				 *        var max = document.getElementById('max').value * 1;
				 *        var version = data[3] == "-" ? 0 : data[3]*1;
				 *
				 *        if ( min == "" && max == "" ) {
				 *          return true;
				 *        }
				 *        else if ( min == "" && version < max ) {
				 *          return true;
				 *        }
				 *        else if ( min < version && "" == max ) {
				 *          return true;
				 *        }
				 *        else if ( min < version && version < max ) {
				 *          return true;
				 *        }
				 *        return false;
				 *      }
				 *    );
				 */
				search: [],


				/**
				 * Selector extensions
				 *
				 * The `selector` option can be used to extend the options available for the
				 * selector modifier options (`selector-modifier` object data type) that
				 * each of the three built in selector types offer (row, column and cell +
				 * their plural counterparts). For example the Select extension uses this
				 * mechanism to provide an option to select only rows, columns and cells
				 * that have been marked as selected by the end user (`{selected: true}`),
				 * which can be used in conjunction with the existing built in selector
				 * options.
				 *
				 * Each property is an array to which functions can be pushed. The functions
				 * take three attributes:
				 *
				 * * Settings object for the host table
				 * * Options object (`selector-modifier` object type)
				 * * Array of selected item indexes
				 *
				 * The return is an array of the resulting item indexes after the custom
				 * selector has been applied.
				 *
				 *  @type object
				 */
				selector: {
					cell: [],
					column: [],
					row: []
				},


				/**
				 * Internal functions, exposed for used in plug-ins.
				 * 
				 * Please note that you should not need to use the internal methods for
				 * anything other than a plug-in (and even then, try to avoid if possible).
				 * The internal function may change between releases.
				 *
				 *  @type object
				 *  @default {}
				 */
				internal: {},


				/**
				 * Legacy configuration options. Enable and disable legacy options that
				 * are available in DataTables.
				 *
				 *  @type object
				 */
				legacy: {
					/**
					 * Enable / disable DataTables 1.9 compatible server-side processing
					 * requests
					 *
					 *  @type boolean
					 *  @default null
					 */
					ajax: null
				},


				/**
				 * Pagination plug-in methods.
				 * 
				 * Each entry in this object is a function and defines which buttons should
				 * be shown by the pagination rendering method that is used for the table:
				 * {@link DataTable.ext.renderer.pageButton}. The renderer addresses how the
				 * buttons are displayed in the document, while the functions here tell it
				 * what buttons to display. This is done by returning an array of button
				 * descriptions (what each button will do).
				 *
				 * Pagination types (the four built in options and any additional plug-in
				 * options defined here) can be used through the `paginationType`
				 * initialisation parameter.
				 *
				 * The functions defined take two parameters:
				 *
				 * 1. `{int} page` The current page index
				 * 2. `{int} pages` The number of pages in the table
				 *
				 * Each function is expected to return an array where each element of the
				 * array can be one of:
				 *
				 * * `first` - Jump to first page when activated
				 * * `last` - Jump to last page when activated
				 * * `previous` - Show previous page when activated
				 * * `next` - Show next page when activated
				 * * `{int}` - Show page of the index given
				 * * `{array}` - A nested array containing the above elements to add a
				 *   containing 'DIV' element (might be useful for styling).
				 *
				 * Note that DataTables v1.9- used this object slightly differently whereby
				 * an object with two functions would be defined for each plug-in. That
				 * ability is still supported by DataTables 1.10+ to provide backwards
				 * compatibility, but this option of use is now decremented and no longer
				 * documented in DataTables 1.10+.
				 *
				 *  @type object
				 *  @default {}
				 *
				 *  @example
				 *    // Show previous, next and current page buttons only
				 *    $.fn.dataTableExt.oPagination.current = function ( page, pages ) {
				 *      return [ 'previous', page, 'next' ];
				 *    };
				 */
				pager: {},


				renderer: {
					pageButton: {},
					header: {}
				},


				/**
				 * Ordering plug-ins - custom data source
				 * 
				 * The extension options for ordering of data available here is complimentary
				 * to the default type based ordering that DataTables typically uses. It
				 * allows much greater control over the the data that is being used to
				 * order a column, but is necessarily therefore more complex.
				 * 
				 * This type of ordering is useful if you want to do ordering based on data
				 * live from the DOM (for example the contents of an 'input' element) rather
				 * than just the static string that DataTables knows of.
				 * 
				 * The way these plug-ins work is that you create an array of the values you
				 * wish to be ordering for the column in question and then return that
				 * array. The data in the array much be in the index order of the rows in
				 * the table (not the currently ordering order!). Which order data gathering
				 * function is run here depends on the `dt-init columns.orderDataType`
				 * parameter that is used for the column (if any).
				 *
				 * The functions defined take two parameters:
				 *
				 * 1. `{object}` DataTables settings object: see
				 *    {@link DataTable.models.oSettings}
				 * 2. `{int}` Target column index
				 *
				 * Each function is expected to return an array:
				 *
				 * * `{array}` Data for the column to be ordering upon
				 *
				 *  @type array
				 *
				 *  @example
				 *    // Ordering using `input` node values
				 *    $.fn.dataTable.ext.order['dom-text'] = function  ( settings, col )
				 *    {
				 *      return this.api().column( col, {order:'index'} ).nodes().map( function ( td, i ) {
				 *        return $('input', td).val();
				 *      } );
				 *    }
				 */
				order: {},


				/**
				 * Type based plug-ins.
				 *
				 * Each column in DataTables has a type assigned to it, either by automatic
				 * detection or by direct assignment using the `type` option for the column.
				 * The type of a column will effect how it is ordering and search (plug-ins
				 * can also make use of the column type if required).
				 *
				 * @namespace
				 */
				type: {
					/**
					 * Type detection functions.
					 *
					 * The functions defined in this object are used to automatically detect
					 * a column's type, making initialisation of DataTables super easy, even
					 * when complex data is in the table.
					 *
					 * The functions defined take two parameters:
					 *
					 *  1. `{*}` Data from the column cell to be analysed
					 *  2. `{settings}` DataTables settings object. This can be used to
					 *     perform context specific type detection - for example detection
					 *     based on language settings such as using a comma for a decimal
					 *     place. Generally speaking the options from the settings will not
					 *     be required
					 *
					 * Each function is expected to return:
					 *
					 * * `{string|null}` Data type detected, or null if unknown (and thus
					 *   pass it on to the other type detection functions.
					 *
					 *  @type array
					 *
					 *  @example
					 *    // Currency type detection plug-in:
					 *    $.fn.dataTable.ext.type.detect.push(
					 *      function ( data, settings ) {
					 *        // Check the numeric part
					 *        if ( ! data.substring(1).match(/[0-9]/) ) {
					 *          return null;
					 *        }
					 *
					 *        // Check prefixed by currency
					 *        if ( data.charAt(0) == '$' || data.charAt(0) == '&pound;' ) {
					 *          return 'currency';
					 *        }
					 *        return null;
					 *      }
					 *    );
					 */
					detect: [],


					/**
					 * Type based search formatting.
					 *
					 * The type based searching functions can be used to pre-format the
					 * data to be search on. For example, it can be used to strip HTML
					 * tags or to de-format telephone numbers for numeric only searching.
					 *
					 * Note that is a search is not defined for a column of a given type,
					 * no search formatting will be performed.
					 * 
					 * Pre-processing of searching data plug-ins - When you assign the sType
					 * for a column (or have it automatically detected for you by DataTables
					 * or a type detection plug-in), you will typically be using this for
					 * custom sorting, but it can also be used to provide custom searching
					 * by allowing you to pre-processing the data and returning the data in
					 * the format that should be searched upon. This is done by adding
					 * functions this object with a parameter name which matches the sType
					 * for that target column. This is the corollary of <i>afnSortData</i>
					 * for searching data.
					 *
					 * The functions defined take a single parameter:
					 *
					 *  1. `{*}` Data from the column cell to be prepared for searching
					 *
					 * Each function is expected to return:
					 *
					 * * `{string|null}` Formatted string that will be used for the searching.
					 *
					 *  @type object
					 *  @default {}
					 *
					 *  @example
					 *    $.fn.dataTable.ext.type.search['title-numeric'] = function ( d ) {
					 *      return d.replace(/\n/g," ").replace( /<.*?>/g, "" );
					 *    }
					 */
					search: {},


					/**
					 * Type based ordering.
					 *
					 * The column type tells DataTables what ordering to apply to the table
					 * when a column is sorted upon. The order for each type that is defined,
					 * is defined by the functions available in this object.
					 *
					 * Each ordering option can be described by three properties added to
					 * this object:
					 *
					 * * `{type}-pre` - Pre-formatting function
					 * * `{type}-asc` - Ascending order function
					 * * `{type}-desc` - Descending order function
					 *
					 * All three can be used together, only `{type}-pre` or only
					 * `{type}-asc` and `{type}-desc` together. It is generally recommended
					 * that only `{type}-pre` is used, as this provides the optimal
					 * implementation in terms of speed, although the others are provided
					 * for compatibility with existing Javascript sort functions.
					 *
					 * `{type}-pre`: Functions defined take a single parameter:
					 *
					 *  1. `{*}` Data from the column cell to be prepared for ordering
					 *
					 * And return:
					 *
					 * * `{*}` Data to be sorted upon
					 *
					 * `{type}-asc` and `{type}-desc`: Functions are typical Javascript sort
					 * functions, taking two parameters:
					 *
					 *  1. `{*}` Data to compare to the second parameter
					 *  2. `{*}` Data to compare to the first parameter
					 *
					 * And returning:
					 *
					 * * `{*}` Ordering match: <0 if first parameter should be sorted lower
					 *   than the second parameter, ===0 if the two parameters are equal and
					 *   >0 if the first parameter should be sorted height than the second
					 *   parameter.
					 * 
					 *  @type object
					 *  @default {}
					 *
					 *  @example
					 *    // Numeric ordering of formatted numbers with a pre-formatter
					 *    $.extend( $.fn.dataTable.ext.type.order, {
					 *      "string-pre": function(x) {
					 *        a = (a === "-" || a === "") ? 0 : a.replace( /[^\d\-\.]/g, "" );
					 *        return parseFloat( a );
					 *      }
					 *    } );
					 *
					 *  @example
					 *    // Case-sensitive string ordering, with no pre-formatting method
					 *    $.extend( $.fn.dataTable.ext.order, {
					 *      "string-case-asc": function(x,y) {
					 *        return ((x < y) ? -1 : ((x > y) ? 1 : 0));
					 *      },
					 *      "string-case-desc": function(x,y) {
					 *        return ((x < y) ? 1 : ((x > y) ? -1 : 0));
					 *      }
					 *    } );
					 */
					order: {}
				},

				/**
				 * Unique DataTables instance counter
				 *
				 * @type int
				 * @private
				 */
				_unique: 0,


				//
				// Depreciated
				// The following properties are retained for backwards compatiblity only.
				// The should not be used in new projects and will be removed in a future
				// version
				//

				/**
				 * Version check function.
				 *  @type function
				 *  @depreciated Since 1.10
				 */
				fnVersionCheck: DataTable.fnVersionCheck,


				/**
				 * Index for what 'this' index API functions should use
				 *  @type int
				 *  @deprecated Since v1.10
				 */
				iApiIndex: 0,


				/**
				 * jQuery UI class container
				 *  @type object
				 *  @deprecated Since v1.10
				 */
				oJUIClasses: {},


				/**
				 * Software version
				 *  @type string
				 *  @deprecated Since v1.10
				 */
				sVersion: DataTable.version
			};


			//
			// Backwards compatibility. Alias to pre 1.10 Hungarian notation counter parts
			//
			$.extend(_ext, {
				afnFiltering: _ext.search,
				aTypes: _ext.type.detect,
				ofnSearch: _ext.type.search,
				oSort: _ext.type.order,
				afnSortData: _ext.order,
				aoFeatures: _ext.feature,
				oApi: _ext.internal,
				oStdClasses: _ext.classes,
				oPagination: _ext.pager
			});


			$.extend(DataTable.ext.classes, {
				"sTable": "dataTable",
				"sNoFooter": "no-footer",

				/* Paging buttons */
				"sPageButton": "paginate_button",
				"sPageButtonActive": "current",
				"sPageButtonDisabled": "disabled",

				/* Striping classes */
				"sStripeOdd": "odd",
				"sStripeEven": "even",

				/* Empty row */
				"sRowEmpty": "dataTables_empty",

				/* Features */
				"sWrapper": "dataTables_wrapper",
				"sFilter": "dataTables_filter",
				"sInfo": "dataTables_info",
				"sPaging": "dataTables_paginate paging_",
				/* Note that the type is postfixed */
				"sLength": "dataTables_length",
				"sProcessing": "dataTables_processing",

				/* Sorting */
				"sSortAsc": "sorting_asc",
				"sSortDesc": "sorting_desc",
				"sSortable": "sorting",
				/* Sortable in both directions */
				"sSortableAsc": "sorting_asc_disabled",
				"sSortableDesc": "sorting_desc_disabled",
				"sSortableNone": "sorting_disabled",
				"sSortColumn": "sorting_",
				/* Note that an int is postfixed for the sorting order */

				/* Filtering */
				"sFilterInput": "",

				/* Page length */
				"sLengthSelect": "",

				/* Scrolling */
				"sScrollWrapper": "dataTables_scroll",
				"sScrollHead": "dataTables_scrollHead",
				"sScrollHeadInner": "dataTables_scrollHeadInner",
				"sScrollBody": "dataTables_scrollBody",
				"sScrollFoot": "dataTables_scrollFoot",
				"sScrollFootInner": "dataTables_scrollFootInner",

				/* Misc */
				"sHeaderTH": "",
				"sFooterTH": "",

				// Deprecated
				"sSortJUIAsc": "",
				"sSortJUIDesc": "",
				"sSortJUI": "",
				"sSortJUIAscAllowed": "",
				"sSortJUIDescAllowed": "",
				"sSortJUIWrapper": "",
				"sSortIcon": "",
				"sJUIHeader": "",
				"sJUIFooter": ""
			});


			var extPagination = DataTable.ext.pager;

			function _numbers(page, pages) {
				var
					numbers = [],
					buttons = extPagination.numbers_length,
					half = Math.floor(buttons / 2),
					i = 1;

				if (pages <= buttons) {
					numbers = _range(0, pages);
				} else if (page <= half) {
					numbers = _range(0, buttons - 2);
					numbers.push('ellipsis');
					numbers.push(pages - 1);
				} else if (page >= pages - 1 - half) {
					numbers = _range(pages - (buttons - 2), pages);
					numbers.splice(0, 0, 'ellipsis'); // no unshift in ie6
					numbers.splice(0, 0, 0);
				} else {
					numbers = _range(page - half + 2, page + half - 1);
					numbers.push('ellipsis');
					numbers.push(pages - 1);
					numbers.splice(0, 0, 'ellipsis');
					numbers.splice(0, 0, 0);
				}

				numbers.DT_el = 'span';
				return numbers;
			}


			$.extend(extPagination, {
				simple: function (page, pages) {
					return ['previous', 'next'];
				},

				full: function (page, pages) {
					return ['first', 'previous', 'next', 'last'];
				},

				numbers: function (page, pages) {
					return [_numbers(page, pages)];
				},

				simple_numbers: function (page, pages) {
					return ['previous', _numbers(page, pages), 'next'];
				},

				full_numbers: function (page, pages) {
					return ['first', 'previous', _numbers(page, pages), 'next', 'last'];
				},

				first_last_numbers: function (page, pages) {
					return ['first', _numbers(page, pages), 'last'];
				},

				// For testing and plug-ins to use
				_numbers: _numbers,

				// Number of number buttons (including ellipsis) to show. _Must be odd!_
				numbers_length: 7
			});


			$.extend(true, DataTable.ext.renderer, {
				pageButton: {
					_: function (settings, host, idx, buttons, page, pages) {
						var classes = settings.oClasses;
						var lang = settings.oLanguage.oPaginate;
						var aria = settings.oLanguage.oAria.paginate || {};
						var btnDisplay, btnClass, counter = 0;

						var attach = function (container, buttons) {
							var i, ien, node, button;
							var clickHandler = function (e) {
								_fnPageChange(settings, e.data.action, true);
							};

							for (i = 0, ien = buttons.length; i < ien; i++) {
								button = buttons[i];

								if ($.isArray(button)) {
									var inner = $('<' + (button.DT_el || 'div') + '/>')
										.appendTo(container);
									attach(inner, button);
								} else {
									btnDisplay = null;
									btnClass = '';

									switch (button) {
										case 'ellipsis':
											container.append('<span class="ellipsis">&#x2026;</span>');
											break;

										case 'first':
											btnDisplay = lang.sFirst;
											btnClass = button + (page > 0 ?
												'' : ' ' + classes.sPageButtonDisabled);
											break;

										case 'previous':
											btnDisplay = lang.sPrevious;
											btnClass = button + (page > 0 ?
												'' : ' ' + classes.sPageButtonDisabled);
											break;

										case 'next':
											btnDisplay = lang.sNext;
											btnClass = button + (page < pages - 1 ?
												'' : ' ' + classes.sPageButtonDisabled);
											break;

										case 'last':
											btnDisplay = lang.sLast;
											btnClass = button + (page < pages - 1 ?
												'' : ' ' + classes.sPageButtonDisabled);
											break;

										default:
											btnDisplay = button + 1;
											btnClass = page === button ?
												classes.sPageButtonActive : '';
											break;
									}

									if (btnDisplay !== null) {
										node = $('<a>', {
												'class': classes.sPageButton + ' ' + btnClass,
												'aria-controls': settings.sTableId,
												'aria-label': aria[button],
												'data-dt-idx': counter,
												'tabindex': settings.iTabIndex,
												'id': idx === 0 && typeof button === 'string' ?
													settings.sTableId + '_' + button : null
											})
											.html(btnDisplay)
											.appendTo(container);

										_fnBindAction(
											node, {
												action: button
											}, clickHandler
										);

										counter++;
									}
								}
							}
						};

						// IE9 throws an 'unknown error' if document.activeElement is used
						// inside an iframe or frame. Try / catch the error. Not good for
						// accessibility, but neither are frames.
						var activeEl;

						try {
							// Because this approach is destroying and recreating the paging
							// elements, focus is lost on the select button which is bad for
							// accessibility. So we want to restore focus once the draw has
							// completed
							activeEl = $(host).find(document.activeElement).data('dt-idx');
						} catch (e) {}

						attach($(host).empty(), buttons);

						if (activeEl !== undefined) {
							$(host).find('[data-dt-idx=' + activeEl + ']').focus();
						}
					}
				}
			});



			// Built in type detection. See model.ext.aTypes for information about
			// what is required from this methods.
			$.extend(DataTable.ext.type.detect, [
				// Plain numbers - first since V8 detects some plain numbers as dates
				// e.g. Date.parse('55') (but not all, e.g. Date.parse('22')...).
				function (d, settings) {
					var decimal = settings.oLanguage.sDecimal;
					return _isNumber(d, decimal) ? 'num' + decimal : null;
				},

				// Dates (only those recognised by the browser's Date.parse)
				function (d, settings) {
					// V8 tries _very_ hard to make a string passed into `Date.parse()`
					// valid, so we need to use a regex to restrict date formats. Use a
					// plug-in for anything other than ISO8601 style strings
					if (d && !(d instanceof Date) && !_re_date.test(d)) {
						return null;
					}
					var parsed = Date.parse(d);
					return (parsed !== null && !isNaN(parsed)) || _empty(d) ? 'date' : null;
				},

				// Formatted numbers
				function (d, settings) {
					var decimal = settings.oLanguage.sDecimal;
					return _isNumber(d, decimal, true) ? 'num-fmt' + decimal : null;
				},

				// HTML numeric
				function (d, settings) {
					var decimal = settings.oLanguage.sDecimal;
					return _htmlNumeric(d, decimal) ? 'html-num' + decimal : null;
				},

				// HTML numeric, formatted
				function (d, settings) {
					var decimal = settings.oLanguage.sDecimal;
					return _htmlNumeric(d, decimal, true) ? 'html-num-fmt' + decimal : null;
				},

				// HTML (this is strict checking - there must be html)
				function (d, settings) {
					return _empty(d) || (typeof d === 'string' && d.indexOf('<') !== -1) ?
						'html' : null;
				}
			]);



			// Filter formatting functions. See model.ext.ofnSearch for information about
			// what is required from these methods.
			// 
			// Note that additional search methods are added for the html numbers and
			// html formatted numbers by `_addNumericSort()` when we know what the decimal
			// place is


			$.extend(DataTable.ext.type.search, {
				html: function (data) {
					return _empty(data) ?
						data :
						typeof data === 'string' ?
						data
						.replace(_re_new_lines, " ")
						.replace(_re_html, "") :
						'';
				},

				string: function (data) {
					return _empty(data) ?
						data :
						typeof data === 'string' ?
						data.replace(_re_new_lines, " ") :
						data;
				}
			});



			var __numericReplace = function (d, decimalPlace, re1, re2) {
				if (d !== 0 && (!d || d === '-')) {
					return -Infinity;
				}

				// If a decimal place other than `.` is used, it needs to be given to the
				// function so we can detect it and replace with a `.` which is the only
				// decimal place Javascript recognises - it is not locale aware.
				if (decimalPlace) {
					d = _numToDecimal(d, decimalPlace);
				}

				if (d.replace) {
					if (re1) {
						d = d.replace(re1, '');
					}

					if (re2) {
						d = d.replace(re2, '');
					}
				}

				return d * 1;
			};


			// Add the numeric 'deformatting' functions for sorting and search. This is done
			// in a function to provide an easy ability for the language options to add
			// additional methods if a non-period decimal place is used.
			function _addNumericSort(decimalPlace) {
				$.each({
						// Plain numbers
						"num": function (d) {
							return __numericReplace(d, decimalPlace);
						},

						// Formatted numbers
						"num-fmt": function (d) {
							return __numericReplace(d, decimalPlace, _re_formatted_numeric);
						},

						// HTML numeric
						"html-num": function (d) {
							return __numericReplace(d, decimalPlace, _re_html);
						},

						// HTML numeric, formatted
						"html-num-fmt": function (d) {
							return __numericReplace(d, decimalPlace, _re_html, _re_formatted_numeric);
						}
					},
					function (key, fn) {
						// Add the ordering method
						_ext.type.order[key + decimalPlace + '-pre'] = fn;

						// For HTML types add a search formatter that will strip the HTML
						if (key.match(/^html\-/)) {
							_ext.type.search[key + decimalPlace] = _ext.type.search.html;
						}
					}
				);
			}


			// Default sort methods
			$.extend(_ext.type.order, {
				// Dates
				"date-pre": function (d) {
					var ts = Date.parse(d);
					return isNaN(ts) ? -Infinity : ts;
				},

				// html
				"html-pre": function (a) {
					return _empty(a) ?
						'' :
						a.replace ?
						a.replace(/<.*?>/g, "").toLowerCase() :
						a + '';
				},

				// string
				"string-pre": function (a) {
					// This is a little complex, but faster than always calling toString,
					// http://jsperf.com/tostring-v-check
					return _empty(a) ?
						'' :
						typeof a === 'string' ?
						a.toLowerCase() :
						!a.toString ?
						'' :
						a.toString();
				},

				// string-asc and -desc are retained only for compatibility with the old
				// sort methods
				"string-asc": function (x, y) {
					return ((x < y) ? -1 : ((x > y) ? 1 : 0));
				},

				"string-desc": function (x, y) {
					return ((x < y) ? 1 : ((x > y) ? -1 : 0));
				}
			});


			// Numeric sorting types - order doesn't matter here
			_addNumericSort('');


			$.extend(true, DataTable.ext.renderer, {
				header: {
					_: function (settings, cell, column, classes) {
						// No additional mark-up required
						// Attach a sort listener to update on sort - note that using the
						// `DT` namespace will allow the event to be removed automatically
						// on destroy, while the `dt` namespaced event is the one we are
						// listening for
						$(settings.nTable).on('order.dt.DT', function (e, ctx, sorting, columns) {
							if (settings !== ctx) { // need to check this this is the host
								return; // table, not a nested one
							}

							var colIdx = column.idx;

							cell
								.removeClass(
									column.sSortingClass + ' ' +
									classes.sSortAsc + ' ' +
									classes.sSortDesc
								)
								.addClass(columns[colIdx] == 'asc' ?
									classes.sSortAsc : columns[colIdx] == 'desc' ?
									classes.sSortDesc :
									column.sSortingClass
								);
						});
					},

					jqueryui: function (settings, cell, column, classes) {
						$('<div/>')
							.addClass(classes.sSortJUIWrapper)
							.append(cell.contents())
							.append($('<span/>')
								.addClass(classes.sSortIcon + ' ' + column.sSortingClassJUI)
							)
							.appendTo(cell);

						// Attach a sort listener to update on sort
						$(settings.nTable).on('order.dt.DT', function (e, ctx, sorting, columns) {
							if (settings !== ctx) {
								return;
							}

							var colIdx = column.idx;

							cell
								.removeClass(classes.sSortAsc + " " + classes.sSortDesc)
								.addClass(columns[colIdx] == 'asc' ?
									classes.sSortAsc : columns[colIdx] == 'desc' ?
									classes.sSortDesc :
									column.sSortingClass
								);

							cell
								.find('span.' + classes.sSortIcon)
								.removeClass(
									classes.sSortJUIAsc + " " +
									classes.sSortJUIDesc + " " +
									classes.sSortJUI + " " +
									classes.sSortJUIAscAllowed + " " +
									classes.sSortJUIDescAllowed
								)
								.addClass(columns[colIdx] == 'asc' ?
									classes.sSortJUIAsc : columns[colIdx] == 'desc' ?
									classes.sSortJUIDesc :
									column.sSortingClassJUI
								);
						});
					}
				}
			});

			/*
			 * Public helper functions. These aren't used internally by DataTables, or
			 * called by any of the options passed into DataTables, but they can be used
			 * externally by developers working with DataTables. They are helper functions
			 * to make working with DataTables a little bit easier.
			 */

			var __htmlEscapeEntities = function (d) {
				return typeof d === 'string' ?
					d.replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;') :
					d;
			};

			/**
			 * Helpers for `columns.render`.
			 *
			 * The options defined here can be used with the `columns.render` initialisation
			 * option to provide a display renderer. The following functions are defined:
			 *
			 * * `number` - Will format numeric data (defined by `columns.data`) for
			 *   display, retaining the original unformatted data for sorting and filtering.
			 *   It takes 5 parameters:
			 *   * `string` - Thousands grouping separator
			 *   * `string` - Decimal point indicator
			 *   * `integer` - Number of decimal points to show
			 *   * `string` (optional) - Prefix.
			 *   * `string` (optional) - Postfix (/suffix).
			 * * `text` - Escape HTML to help prevent XSS attacks. It has no optional
			 *   parameters.
			 *
			 * @example
			 *   // Column definition using the number renderer
			 *   {
			 *     data: "salary",
			 *     render: $.fn.dataTable.render.number( '\'', '.', 0, '$' )
			 *   }
			 *
			 * @namespace
			 */
			DataTable.render = {
				number: function (thousands, decimal, precision, prefix, postfix) {
					return {
						display: function (d) {
							if (typeof d !== 'number' && typeof d !== 'string') {
								return d;
							}

							var negative = d < 0 ? '-' : '';
							var flo = parseFloat(d);

							// If NaN then there isn't much formatting that we can do - just
							// return immediately, escaping any HTML (this was supposed to
							// be a number after all)
							if (isNaN(flo)) {
								return __htmlEscapeEntities(d);
							}

							flo = flo.toFixed(precision);
							d = Math.abs(flo);

							var intPart = parseInt(d, 10);
							var floatPart = precision ?
								decimal + (d - intPart).toFixed(precision).substring(2) :
								'';

							return negative + (prefix || '') +
								intPart.toString().replace(
									/\B(?=(\d{3})+(?!\d))/g, thousands
								) +
								floatPart +
								(postfix || '');
						}
					};
				},

				text: function () {
					return {
						display: __htmlEscapeEntities
					};
				}
			};


			/*
			 * This is really a good bit rubbish this method of exposing the internal methods
			 * publicly... - To be fixed in 2.0 using methods on the prototype
			 */


			/**
			 * Create a wrapper function for exporting an internal functions to an external API.
			 *  @param {string} fn API function name
			 *  @returns {function} wrapped function
			 *  @memberof DataTable#internal
			 */
			function _fnExternApiFunc(fn) {
				return function () {
					var args = [_fnSettingsFromNode(this[DataTable.ext.iApiIndex])].concat(
						Array.prototype.slice.call(arguments)
					);
					return DataTable.ext.internal[fn].apply(this, args);
				};
			}


			/**
			 * Reference to internal functions for use by plug-in developers. Note that
			 * these methods are references to internal functions and are considered to be
			 * private. If you use these methods, be aware that they are liable to change
			 * between versions.
			 *  @namespace
			 */
			$.extend(DataTable.ext.internal, {
				_fnExternApiFunc: _fnExternApiFunc,
				_fnBuildAjax: _fnBuildAjax,
				_fnAjaxUpdate: _fnAjaxUpdate,
				_fnAjaxParameters: _fnAjaxParameters,
				_fnAjaxUpdateDraw: _fnAjaxUpdateDraw,
				_fnAjaxDataSrc: _fnAjaxDataSrc,
				_fnAddColumn: _fnAddColumn,
				_fnColumnOptions: _fnColumnOptions,
				_fnAdjustColumnSizing: _fnAdjustColumnSizing,
				_fnVisibleToColumnIndex: _fnVisibleToColumnIndex,
				_fnColumnIndexToVisible: _fnColumnIndexToVisible,
				_fnVisbleColumns: _fnVisbleColumns,
				_fnGetColumns: _fnGetColumns,
				_fnColumnTypes: _fnColumnTypes,
				_fnApplyColumnDefs: _fnApplyColumnDefs,
				_fnHungarianMap: _fnHungarianMap,
				_fnCamelToHungarian: _fnCamelToHungarian,
				_fnLanguageCompat: _fnLanguageCompat,
				_fnBrowserDetect: _fnBrowserDetect,
				_fnAddData: _fnAddData,
				_fnAddTr: _fnAddTr,
				_fnNodeToDataIndex: _fnNodeToDataIndex,
				_fnNodeToColumnIndex: _fnNodeToColumnIndex,
				_fnGetCellData: _fnGetCellData,
				_fnSetCellData: _fnSetCellData,
				_fnSplitObjNotation: _fnSplitObjNotation,
				_fnGetObjectDataFn: _fnGetObjectDataFn,
				_fnSetObjectDataFn: _fnSetObjectDataFn,
				_fnGetDataMaster: _fnGetDataMaster,
				_fnClearTable: _fnClearTable,
				_fnDeleteIndex: _fnDeleteIndex,
				_fnInvalidate: _fnInvalidate,
				_fnGetRowElements: _fnGetRowElements,
				_fnCreateTr: _fnCreateTr,
				_fnBuildHead: _fnBuildHead,
				_fnDrawHead: _fnDrawHead,
				_fnDraw: _fnDraw,
				_fnReDraw: _fnReDraw,
				_fnAddOptionsHtml: _fnAddOptionsHtml,
				_fnDetectHeader: _fnDetectHeader,
				_fnGetUniqueThs: _fnGetUniqueThs,
				_fnFeatureHtmlFilter: _fnFeatureHtmlFilter,
				_fnFilterComplete: _fnFilterComplete,
				_fnFilterCustom: _fnFilterCustom,
				_fnFilterColumn: _fnFilterColumn,
				_fnFilter: _fnFilter,
				_fnFilterCreateSearch: _fnFilterCreateSearch,
				_fnEscapeRegex: _fnEscapeRegex,
				_fnFilterData: _fnFilterData,
				_fnFeatureHtmlInfo: _fnFeatureHtmlInfo,
				_fnUpdateInfo: _fnUpdateInfo,
				_fnInfoMacros: _fnInfoMacros,
				_fnInitialise: _fnInitialise,
				_fnInitComplete: _fnInitComplete,
				_fnLengthChange: _fnLengthChange,
				_fnFeatureHtmlLength: _fnFeatureHtmlLength,
				_fnFeatureHtmlPaginate: _fnFeatureHtmlPaginate,
				_fnPageChange: _fnPageChange,
				_fnFeatureHtmlProcessing: _fnFeatureHtmlProcessing,
				_fnProcessingDisplay: _fnProcessingDisplay,
				_fnFeatureHtmlTable: _fnFeatureHtmlTable,
				_fnScrollDraw: _fnScrollDraw,
				_fnApplyToChildren: _fnApplyToChildren,
				_fnCalculateColumnWidths: _fnCalculateColumnWidths,
				_fnThrottle: _fnThrottle,
				_fnConvertToWidth: _fnConvertToWidth,
				_fnGetWidestNode: _fnGetWidestNode,
				_fnGetMaxLenString: _fnGetMaxLenString,
				_fnStringToCss: _fnStringToCss,
				_fnSortFlatten: _fnSortFlatten,
				_fnSort: _fnSort,
				_fnSortAria: _fnSortAria,
				_fnSortListener: _fnSortListener,
				_fnSortAttachListener: _fnSortAttachListener,
				_fnSortingClasses: _fnSortingClasses,
				_fnSortData: _fnSortData,
				_fnSaveState: _fnSaveState,
				_fnLoadState: _fnLoadState,
				_fnSettingsFromNode: _fnSettingsFromNode,
				_fnLog: _fnLog,
				_fnMap: _fnMap,
				_fnBindAction: _fnBindAction,
				_fnCallbackReg: _fnCallbackReg,
				_fnCallbackFire: _fnCallbackFire,
				_fnLengthOverflow: _fnLengthOverflow,
				_fnRenderer: _fnRenderer,
				_fnDataSource: _fnDataSource,
				_fnRowAttributes: _fnRowAttributes,
				_fnExtend: _fnExtend,
				_fnCalculateEnd: function () {} // Used by a lot of plug-ins, but redundant
				// in 1.10, so this dead-end function is
				// added to prevent errors
			});


			// jQuery access
			$.fn.dataTable = DataTable;

			// Provide access to the host jQuery object (circular reference)
			DataTable.$ = $;

			// Legacy aliases
			$.fn.dataTableSettings = DataTable.settings;
			$.fn.dataTableExt = DataTable.ext;

			// With a capital `D` we return a DataTables API instance rather than a
			// jQuery object
			$.fn.DataTable = function (opts) {
				return $(this).dataTable(opts).api();
			};

			// All properties that are available to $.fn.dataTable should also be
			// available on $.fn.DataTable
			$.each(DataTable, function (prop, val) {
				$.fn.DataTable[prop] = val;
			});


			// Information about events fired by DataTables - for documentation.
			/**
			 * Draw event, fired whenever the table is redrawn on the page, at the same
			 * point as fnDrawCallback. This may be useful for binding events or
			 * performing calculations when the table is altered at all.
			 *  @name DataTable#draw.dt
			 *  @event
			 *  @param {event} e jQuery event object
			 *  @param {object} o DataTables settings object {@link DataTable.models.oSettings}
			 */

			/**
			 * Search event, fired when the searching applied to the table (using the
			 * built-in global search, or column filters) is altered.
			 *  @name DataTable#search.dt
			 *  @event
			 *  @param {event} e jQuery event object
			 *  @param {object} o DataTables settings object {@link DataTable.models.oSettings}
			 */

			/**
			 * Page change event, fired when the paging of the table is altered.
			 *  @name DataTable#page.dt
			 *  @event
			 *  @param {event} e jQuery event object
			 *  @param {object} o DataTables settings object {@link DataTable.models.oSettings}
			 */

			/**
			 * Order event, fired when the ordering applied to the table is altered.
			 *  @name DataTable#order.dt
			 *  @event
			 *  @param {event} e jQuery event object
			 *  @param {object} o DataTables settings object {@link DataTable.models.oSettings}
			 */

			/**
			 * DataTables initialisation complete event, fired when the table is fully
			 * drawn, including Ajax data loaded, if Ajax data is required.
			 *  @name DataTable#init.dt
			 *  @event
			 *  @param {event} e jQuery event object
			 *  @param {object} oSettings DataTables settings object
			 *  @param {object} json The JSON object request from the server - only
			 *    present if client-side Ajax sourced data is used</li></ol>
			 */

			/**
			 * State save event, fired when the table has changed state a new state save
			 * is required. This event allows modification of the state saving object
			 * prior to actually doing the save, including addition or other state
			 * properties (for plug-ins) or modification of a DataTables core property.
			 *  @name DataTable#stateSaveParams.dt
			 *  @event
			 *  @param {event} e jQuery event object
			 *  @param {object} oSettings DataTables settings object
			 *  @param {object} json The state information to be saved
			 */

			/**
			 * State load event, fired when the table is loading state from the stored
			 * data, but prior to the settings object being modified by the saved state
			 * - allowing modification of the saved state is required or loading of
			 * state for a plug-in.
			 *  @name DataTable#stateLoadParams.dt
			 *  @event
			 *  @param {event} e jQuery event object
			 *  @param {object} oSettings DataTables settings object
			 *  @param {object} json The saved state information
			 */

			/**
			 * State loaded event, fired when state has been loaded from stored data and
			 * the settings object has been modified by the loaded data.
			 *  @name DataTable#stateLoaded.dt
			 *  @event
			 *  @param {event} e jQuery event object
			 *  @param {object} oSettings DataTables settings object
			 *  @param {object} json The saved state information
			 */

			/**
			 * Processing event, fired when DataTables is doing some kind of processing
			 * (be it, order, searcg or anything else). It can be used to indicate to
			 * the end user that there is something happening, or that something has
			 * finished.
			 *  @name DataTable#processing.dt
			 *  @event
			 *  @param {event} e jQuery event object
			 *  @param {object} oSettings DataTables settings object
			 *  @param {boolean} bShow Flag for if DataTables is doing processing or not
			 */

			/**
			 * Ajax (XHR) event, fired whenever an Ajax request is completed from a
			 * request to made to the server for new data. This event is called before
			 * DataTables processed the returned data, so it can also be used to pre-
			 * process the data returned from the server, if needed.
			 *
			 * Note that this trigger is called in `fnServerData`, if you override
			 * `fnServerData` and which to use this event, you need to trigger it in you
			 * success function.
			 *  @name DataTable#xhr.dt
			 *  @event
			 *  @param {event} e jQuery event object
			 *  @param {object} o DataTables settings object {@link DataTable.models.oSettings}
			 *  @param {object} json JSON returned from the server
			 *
			 *  @example
			 *     // Use a custom property returned from the server in another DOM element
			 *     $('#table').dataTable().on('xhr.dt', function (e, settings, json) {
			 *       $('#status').html( json.status );
			 *     } );
			 *
			 *  @example
			 *     // Pre-process the data returned from the server
			 *     $('#table').dataTable().on('xhr.dt', function (e, settings, json) {
			 *       for ( var i=0, ien=json.aaData.length ; i<ien ; i++ ) {
			 *         json.aaData[i].sum = json.aaData[i].one + json.aaData[i].two;
			 *       }
			 *       // Note no return - manipulate the data directly in the JSON object.
			 *     } );
			 */

			/**
			 * Destroy event, fired when the DataTable is destroyed by calling fnDestroy
			 * or passing the bDestroy:true parameter in the initialisation object. This
			 * can be used to remove bound events, added DOM nodes, etc.
			 *  @name DataTable#destroy.dt
			 *  @event
			 *  @param {event} e jQuery event object
			 *  @param {object} o DataTables settings object {@link DataTable.models.oSettings}
			 */

			/**
			 * Page length change event, fired when number of records to show on each
			 * page (the length) is changed.
			 *  @name DataTable#length.dt
			 *  @event
			 *  @param {event} e jQuery event object
			 *  @param {object} o DataTables settings object {@link DataTable.models.oSettings}
			 *  @param {integer} len New length
			 */

			/**
			 * Column sizing has changed.
			 *  @name DataTable#column-sizing.dt
			 *  @event
			 *  @param {event} e jQuery event object
			 *  @param {object} o DataTables settings object {@link DataTable.models.oSettings}
			 */

			/**
			 * Column visibility has changed.
			 *  @name DataTable#column-visibility.dt
			 *  @event
			 *  @param {event} e jQuery event object
			 *  @param {object} o DataTables settings object {@link DataTable.models.oSettings}
			 *  @param {int} column Column index
			 *  @param {bool} vis `false` if column now hidden, or `true` if visible
			 */
			//**************************************************************************************************************** */
			//Janfix : Add Here New Jquery Plugins
			//**************************************************************************************************************** */

			// ALERT CLASS DEFINITION
			// ======================
			var dismiss = '[data-dismiss="alert"]'
			var Alert = function (el) {
				$(el).on('click', dismiss, this.close)
			}

			Alert.VERSION = '3.4.0'

			Alert.TRANSITION_DURATION = 150

			Alert.prototype.close = function (e) {
				var $this = $(this)
				var selector = $this.attr('data-target')

				if (!selector) {
					selector = $this.attr('href')
					selector = selector && selector.replace(/.*(?=#[^\s]*$)/, '') // strip for ie7
				}

				selector = selector === '#' ? [] : selector
				var $parent = $(document).find(selector)

				if (e) e.preventDefault()

				if (!$parent.length) {
					$parent = $this.closest('.alert')
				}

				$parent.trigger(e = $.Event('close.bs.alert'))

				if (e.isDefaultPrevented()) return

				$parent.removeClass('in')

				function removeElement() {
					// detach from parent, fire event then clean up data
					$parent.detach().trigger('closed.bs.alert').remove()
				}

				$.support.transition && $parent.hasClass('fade') ?
					$parent
					.one('bsTransitionEnd', removeElement)
					.emulateTransitionEnd(Alert.TRANSITION_DURATION) :
					removeElement()
			}


			// ALERT PLUGIN DEFINITION
			// =======================

			function Plugin(option) {
				return this.each(function () {
					console.log("Plugin OK");
					var $this = $(this)
					var data = $this.data('bs.alert')

					if (!data) $this.data('bs.alert', (data = new Alert(this)))
					if (typeof option == 'string') data[option].call($this)
				})
			}

			var old = $.fn.alert

			$.fn.alert = Plugin
			$.fn.alert.Constructor = Alert


			// ALERT NO CONFLICT
			// =================

			$.fn.alert.noConflict = function () {
				$.fn.alert = old
				return this
			}


			// ALERT DATA-API
			// ==============

			$(document).on('click.bs.alert.data-api', dismiss, Alert.prototype.close);



    /* ========================================================================
     * Bootstrap: tab.js v3.4.0
     * http://getbootstrap.com/javascript/#tabs
     * ========================================================================
     * Copyright 2011-2016 Twitter, Inc.
     * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
     * ======================================================================== */


    +
    function ($) {
    	'use strict';

    	// TAB CLASS DEFINITION
    	// ====================

    	var Tab = function (element) {
    		// jscs:disable requireDollarBeforejQueryAssignment
    		this.element = $(element)
    		// jscs:enable requireDollarBeforejQueryAssignment
    	}

    	Tab.VERSION = '3.4.0'

    	Tab.TRANSITION_DURATION = 150

    	Tab.prototype.show = function () {
    		var $this = this.element
    		var $ul = $this.closest('ul:not(.dropdown-menu)')
    		var selector = $this.data('target')

    		if (!selector) {
    			selector = $this.attr('href')
    			selector = selector && selector.replace(/.*(?=#[^\s]*$)/, '') // strip for ie7
    		}

    		if ($this.parent('li').hasClass('active')) return

    		var $previous = $ul.find('.active:last a')
    		var hideEvent = $.Event('hide.bs.tab', {
    			relatedTarget: $this[0]
    		})
    		var showEvent = $.Event('show.bs.tab', {
    			relatedTarget: $previous[0]
    		})

    		$previous.trigger(hideEvent)
    		$this.trigger(showEvent)

    		if (showEvent.isDefaultPrevented() || hideEvent.isDefaultPrevented()) return

    		var $target = $(document).find(selector)

    		this.activate($this.closest('li'), $ul)
    		this.activate($target, $target.parent(), function () {
    			$previous.trigger({
    				type: 'hidden.bs.tab',
    				relatedTarget: $this[0]
    			})
    			$this.trigger({
    				type: 'shown.bs.tab',
    				relatedTarget: $previous[0]
    			})
    		})
    	}

    	Tab.prototype.activate = function (element, container, callback) {
    		var $active = container.find('> .active')
    		var transition = callback &&
    			$.support.transition &&
    			($active.length && $active.hasClass('fade') || !!container.find('> .fade').length)

    		function next() {
    			$active
    				.removeClass('active')
    				.find('> .dropdown-menu > .active')
    				.removeClass('active')
    				.end()
    				.find('[data-toggle="tab"]')
    				.attr('aria-expanded', false)

    			element
    				.addClass('active')
    				.find('[data-toggle="tab"]')
    				.attr('aria-expanded', true)

    			if (transition) {
    				element[0].offsetWidth // reflow for transition
    				element.addClass('in')
    			} else {
    				element.removeClass('fade')
    			}

    			if (element.parent('.dropdown-menu').length) {
    				element
    					.closest('li.dropdown')
    					.addClass('active')
    					.end()
    					.find('[data-toggle="tab"]')
    					.attr('aria-expanded', true)
    			}

    			callback && callback()
    		}

    		$active.length && transition ?
    			$active
    			.one('bsTransitionEnd', next)
    			.emulateTransitionEnd(Tab.TRANSITION_DURATION) :
    			next()

    		$active.removeClass('in')
    	}


    	// TAB PLUGIN DEFINITION
    	// =====================

    	function Plugin(option) {
    		return this.each(function () {
    			var $this = $(this)
    			var data = $this.data('bs.tab')

    			if (!data) $this.data('bs.tab', (data = new Tab(this)))
    			if (typeof option == 'string') data[option]()
    		})
    	}

    	var old = $.fn.tab

    	$.fn.tab = Plugin
    	$.fn.tab.Constructor = Tab


    	// TAB NO CONFLICT
    	// ===============

    	$.fn.tab.noConflict = function () {
    		$.fn.tab = old
    		return this
    	}


    	// TAB DATA-API
    	// ============

    	var clickHandler = function (e) {
    		e.preventDefault()
    		Plugin.call($(this), 'show')
    	}

    	$(document)
    		.on('click.bs.tab.data-api', '[data-toggle="tab"]', clickHandler)
    		.on('click.bs.tab.data-api', '[data-toggle="pill"]', clickHandler)

    }($);


			
/* ========================================================================
 * Bootstrap: dropdown.js v3.4.0
 * http://getbootstrap.com/javascript/#dropdowns
 * ========================================================================
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */

	// DROPDOWN CLASS DEFINITION
	// =========================

	var backdrop = '.dropdown-backdrop'
	var toggle = '[data-toggle="dropdown"]'
	var Dropdown = function (element) {
		$(element).on('click.bs.dropdown', this.toggle)
	}

	Dropdown.VERSION = '3.4.0'

	function getParent($this) {
		var selector = $this.attr('data-target')

		if (!selector) {
			selector = $this.attr('href')
			selector = selector && /#[A-Za-z]/.test(selector) && selector.replace(/.*(?=#[^\s]*$)/, '') // strip for ie7
		}

		var $parent = selector && $(document).find(selector)

		return $parent && $parent.length ? $parent : $this.parent()
	}

	function clearMenus(e) {
		if (e && e.which === 3) return
		$(backdrop).remove()
		$(toggle).each(function () {
			var $this = $(this)
			var $parent = getParent($this)
			var relatedTarget = {
				relatedTarget: this
			}

			if (!$parent.hasClass('open')) return

			if (e && e.type == 'click' && /input|textarea/i.test(e.target.tagName) && $.contains($parent[0], e.target)) return

			$parent.trigger(e = $.Event('hide.bs.dropdown', relatedTarget))

			if (e.isDefaultPrevented()) return

			$this.attr('aria-expanded', 'false')
			$parent.removeClass('open').trigger($.Event('hidden.bs.dropdown', relatedTarget))
		})
	}

	Dropdown.prototype.toggle = function (e) {
		var $this = $(this)

		if ($this.is('.disabled, :disabled')) return

		var $parent = getParent($this)
		var isActive = $parent.hasClass('open')

		clearMenus()

		if (!isActive) {
			if ('ontouchstart' in document.documentElement && !$parent.closest('.navbar-nav').length) {
				// if mobile we use a backdrop because click events don't delegate
				$(document.createElement('div'))
					.addClass('dropdown-backdrop')
					.insertAfter($(this))
					.on('click', clearMenus)
			}

			var relatedTarget = {
				relatedTarget: this
			}
			$parent.trigger(e = $.Event('show.bs.dropdown', relatedTarget))

			if (e.isDefaultPrevented()) return

			$this
				.trigger('focus')
				.attr('aria-expanded', 'true')

			$parent
				.toggleClass('open')
				.trigger($.Event('shown.bs.dropdown', relatedTarget))
		}

		return false
	}

	Dropdown.prototype.keydown = function (e) {
		if (!/(38|40|27|32)/.test(e.which) || /input|textarea/i.test(e.target.tagName)) return

		var $this = $(this)

		e.preventDefault()
		e.stopPropagation()

		if ($this.is('.disabled, :disabled')) return

		var $parent = getParent($this)
		var isActive = $parent.hasClass('open')

		if (!isActive && e.which != 27 || isActive && e.which == 27) {
			if (e.which == 27) $parent.find(toggle).trigger('focus')
			return $this.trigger('click')
		}

		var desc = ' li:not(.disabled):visible a'
		var $items = $parent.find('.dropdown-menu' + desc)

		if (!$items.length) return

		var index = $items.index(e.target)

		if (e.which == 38 && index > 0) index-- // up
		if (e.which == 40 && index < $items.length - 1) index++ // down
		if (!~index) index = 0

		$items.eq(index).trigger('focus')
	}


	// DROPDOWN PLUGIN DEFINITION
	// ==========================

	function Plugin(option) {
		return this.each(function () {
			var $this = $(this)
			var data = $this.data('bs.dropdown')

			if (!data) $this.data('bs.dropdown', (data = new Dropdown(this)))
			if (typeof option == 'string') data[option].call($this)
		})
	}

	var old = $.fn.dropdown

	$.fn.dropdown = Plugin
	$.fn.dropdown.Constructor = Dropdown


	// DROPDOWN NO CONFLICT
	// ====================

	$.fn.dropdown.noConflict = function () {
		$.fn.dropdown = old
		return this
	}


	// APPLY TO STANDARD DROPDOWN ELEMENTS
	// ===================================

	$(".explo")
		.on('click.bs.dropdown.data-api', clearMenus)
		.on('click.bs.dropdown.data-api', '.dropdown form', function (e) {
			e.stopPropagation()
		})
		.on('click.bs.dropdown.data-api', toggle, Dropdown.prototype.toggle)
		.on('keydown.bs.dropdown.data-api', toggle, Dropdown.prototype.keydown)
		.on('keydown.bs.dropdown.data-api', '.dropdown-menu', Dropdown.prototype.keydown)


	// JSTREE - As a Jquery Plugin **********************************************************jpr
	function jstreeContainer(){
		/*!
		 * jsTree 3.3.5
		 * http://jstree.com/
		 *
		 * Copyright (c) 2014 Ivan Bozhanov (http://vakata.com)
		 *
		 * Licensed same as jquery - under the terms of the MIT License
		 *   http://www.opensource.org/licenses/mit-license.php
		 */
		/*!
		 * if using jslint please allow for the jQuery global and use following options:
		 * jslint: loopfunc: true, browser: true, ass: true, bitwise: true, continue: true, nomen: true, plusplus: true, regexp: true, unparam: true, todo: true, white: true
		 */
		/*jshint -W083 */

		// prevent another load? maybe there is a better way?
		if ($.jstree) {
			return;
		}

		/**
		 * ### jsTree core functionality
		 */

		// internal variables
		var instance_counter = 0,
			ccp_node = false,
			ccp_mode = false,
			ccp_inst = false,
			themes_loaded = [],
			src = $('script:last').attr('src'),
			document = window.document; // local variable is always faster to access then a global

		/**
		 * holds all jstree related functions and variables, including the actual class and methods to create, access and manipulate instances.
		 * @name $.jstree
		 */
		$.jstree = {
			/**
			 * specifies the jstree version in use
			 * @name $.jstree.version
			 */
			version: '3.3.5',
			/**
			 * holds all the default options used when creating new instances
			 * @name $.jstree.defaults
			 */
			defaults: {
				/**
				 * configure which plugins will be active on an instance. Should be an array of strings, where each element is a plugin name. The default is `[]`
				 * @name $.jstree.defaults.plugins
				 */
				plugins: []
			},
			/**
			 * stores all loaded jstree plugins (used internally)
			 * @name $.jstree.plugins
			 */
			plugins: {},
			path: src && src.indexOf('/') !== -1 ? src.replace(/\/[^\/]+$/, '') : '',
			idregex: /[\\:&!^|()\[\]<>@*'+~#";.,=\- \/${}%?`]/g,
			root: '#'
		};

		/**
		 * creates a jstree instance
		 * @name $.jstree.create(el [, options])
		 * @param {DOMElement|jQuery|String} el the element to create the instance on, can be jQuery extended or a selector
		 * @param {Object} options options for this instance (extends `$.jstree.defaults`)
		 * @return {jsTree} the new instance
		 */
		$.jstree.create = function (el, options) {
			var tmp = new $.jstree.core(++instance_counter),
				opt = options;
			options = $.extend(true, {}, $.jstree.defaults, options);
			if (opt && opt.plugins) {
				options.plugins = opt.plugins;
			}
			$.each(options.plugins, function (i, k) {
				if (i !== 'core') {
					tmp = tmp.plugin(k, options[k]);
				}
			});
			$(el).data('jstree', tmp);
			tmp.init(el, options);
			return tmp;
		};
		/**
		 * remove all traces of jstree from the DOM and destroy all instances
		 * @name $.jstree.destroy()
		 */
		$.jstree.destroy = function () {
			$('.jstree:jstree').jstree('destroy');
			$(document).off('.jstree');
		};
		/**
		 * the jstree class constructor, used only internally
		 * @private
		 * @name $.jstree.core(id)
		 * @param {Number} id this instance's index
		 */
		$.jstree.core = function (id) {
			this._id = id;
			this._cnt = 0;
			this._wrk = null;
			this._data = {
				core: {
					themes: {
						name: false,
						dots: false,
						icons: false,
						ellipsis: false
					},
					selected: [],
					last_error: {},
					working: false,
					worker_queue: [],
					focused: null
				}
			};
		};
		/**
		 * get a reference to an existing instance
		 *
		 * __Examples__
		 *
		 *	// provided a container with an ID of "tree", and a nested node with an ID of "branch"
		 *	// all of there will return the same instance
		 *	$.jstree.reference('tree');
		 *	$.jstree.reference('#tree');
		 *	$.jstree.reference($('#tree'));
		 *	$.jstree.reference(document.getElementByID('tree'));
		 *	$.jstree.reference('branch');
		 *	$.jstree.reference('#branch');
		 *	$.jstree.reference($('#branch'));
		 *	$.jstree.reference(document.getElementByID('branch'));
		 *
		 * @name $.jstree.reference(needle)
		 * @param {DOMElement|jQuery|String} needle
		 * @return {jsTree|null} the instance or `null` if not found
		 */
		$.jstree.reference = function (needle) {
			var tmp = null,
				obj = null;
			if (needle && needle.id && (!needle.tagName || !needle.nodeType)) {
				needle = needle.id;
			}

			if (!obj || !obj.length) {
				try {
					obj = $(needle);
				} catch (ignore) {}
			}
			if (!obj || !obj.length) {
				try {
					obj = $('#' + needle.replace($.jstree.idregex, '\\$&'));
				} catch (ignore) {}
			}
			if (obj && obj.length && (obj = obj.closest('.jstree')).length && (obj = obj.data('jstree'))) {
				tmp = obj;
			} else {
				$('.jstree').each(function () {
					var inst = $(this).data('jstree');
					if (inst && inst._model.data[needle]) {
						tmp = inst;
						return false;
					}
				});
			}
			return tmp;
		};
		/**
		 * Create an instance, get an instance or invoke a command on a instance.
		 *
		 * If there is no instance associated with the current node a new one is created and `arg` is used to extend `$.jstree.defaults` for this new instance. There would be no return value (chaining is not broken).
		 *
		 * If there is an existing instance and `arg` is a string the command specified by `arg` is executed on the instance, with any additional arguments passed to the function. If the function returns a value it will be returned (chaining could break depending on function).
		 *
		 * If there is an existing instance and `arg` is not a string the instance itself is returned (similar to `$.jstree.reference`).
		 *
		 * In any other case - nothing is returned and chaining is not broken.
		 *
		 * __Examples__
		 *
		 *	$('#tree1').jstree(); // creates an instance
		 *	$('#tree2').jstree({ plugins : [] }); // create an instance with some options
		 *	$('#tree1').jstree('open_node', '#branch_1'); // call a method on an existing instance, passing additional arguments
		 *	$('#tree2').jstree(); // get an existing instance (or create an instance)
		 *	$('#tree2').jstree(true); // get an existing instance (will not create new instance)
		 *	$('#branch_1').jstree().select_node('#branch_1'); // get an instance (using a nested element and call a method)
		 *
		 * @name $().jstree([arg])
		 * @param {String|Object} arg
		 * @return {Mixed}
		 */
		$.fn.jstree = function (arg) {
			// check for string argument
			var is_method = (typeof arg === 'string'),
				args = Array.prototype.slice.call(arguments, 1),
				result = null;
			if (arg === true && !this.length) {
				return false;
			}
			this.each(function () {
				// get the instance (if there is one) and method (if it exists)
				var instance = $.jstree.reference(this),
					method = is_method && instance ? instance[arg] : null;
				// if calling a method, and method is available - execute on the instance
				result = is_method && method ?
					method.apply(instance, args) :
					null;
				// if there is no instance and no method is being called - create one
				if (!instance && !is_method && (arg === undefined || $.isPlainObject(arg))) {
					$.jstree.create(this, arg);
				}
				// if there is an instance and no method is called - return the instance
				if ((instance && !is_method) || arg === true) {
					result = instance || false;
				}
				// if there was a method call which returned a result - break and return the value
				if (result !== null && result !== undefined) {
					return false;
				}
			});
			// if there was a method call with a valid return value - return that, otherwise continue the chain
			return result !== null && result !== undefined ?
				result : this;
		};
		/**
		 * used to find elements containing an instance
		 *
		 * __Examples__
		 *
		 *	$('div:jstree').each(function () {
		 *		$(this).jstree('destroy');
		 *	});
		 *
		 * @name $(':jstree')
		 * @return {jQuery}
		 */
		$.expr.pseudos.jstree = $.expr.createPseudo(function (search) {
			return function (a) {
				return $(a).hasClass('jstree') &&
					$(a).data('jstree') !== undefined;
			};
		});

		/**
		 * stores all defaults for the core
		 * @name $.jstree.defaults.core
		 */
		$.jstree.defaults.core = {
			/**
			 * data configuration
			 *
			 * If left as `false` the HTML inside the jstree container element is used to populate the tree (that should be an unordered list with list items).
			 *
			 * You can also pass in a HTML string or a JSON array here.
			 *
			 * It is possible to pass in a standard jQuery-like AJAX config and jstree will automatically determine if the response is JSON or HTML and use that to populate the tree.
			 * In addition to the standard jQuery ajax options here you can suppy functions for `data` and `url`, the functions will be run in the current instance's scope and a param will be passed indicating which node is being loaded, the return value of those functions will be used.
			 *
			 * The last option is to specify a function, that function will receive the node being loaded as argument and a second param which is a function which should be called with the result.
			 *
			 * __Examples__
			 *
			 *	// AJAX
			 *	$('#tree').jstree({
			 *		'core' : {
			 *			'data' : {
			 *				'url' : '/get/children/',
			 *				'data' : function (node) {
			 *					return { 'id' : node.id };
			 *				}
			 *			}
			 *		});
			 *
			 *	// direct data
			 *	$('#tree').jstree({
			 *		'core' : {
			 *			'data' : [
			 *				'Simple root node',
			 *				{
			 *					'id' : 'node_2',
			 *					'text' : 'Root node with options',
			 *					'state' : { 'opened' : true, 'selected' : true },
			 *					'children' : [ { 'text' : 'Child 1' }, 'Child 2']
			 *				}
			 *			]
			 *		}
			 *	});
			 *
			 *	// function
			 *	$('#tree').jstree({
			 *		'core' : {
			 *			'data' : function (obj, callback) {
			 *				callback.call(this, ['Root 1', 'Root 2']);
			 *			}
			 *		});
			 *
			 * @name $.jstree.defaults.core.data
			 */
			data: false,
			/**
			 * configure the various strings used throughout the tree
			 *
			 * You can use an object where the key is the string you need to replace and the value is your replacement.
			 * Another option is to specify a function which will be called with an argument of the needed string and should return the replacement.
			 * If left as `false` no replacement is made.
			 *
			 * __Examples__
			 *
			 *	$('#tree').jstree({
			 *		'core' : {
			 *			'strings' : {
			 *				'Loading ...' : 'Please wait ...'
			 *			}
			 *		}
			 *	});
			 *
			 * @name $.jstree.defaults.core.strings
			 */
			strings: false,
			/**
			 * determines what happens when a user tries to modify the structure of the tree
			 * If left as `false` all operations like create, rename, delete, move or copy are prevented.
			 * You can set this to `true` to allow all interactions or use a function to have better control.
			 *
			 * __Examples__
			 *
			 *	$('#tree').jstree({
			 *		'core' : {
			 *			'check_callback' : function (operation, node, node_parent, node_position, more) {
			 *				// operation can be 'create_node', 'rename_node', 'delete_node', 'move_node', 'copy_node' or 'edit'
			 *				// in case of 'rename_node' node_position is filled with the new node name
			 *				return operation === 'rename_node' ? true : false;
			 *			}
			 *		}
			 *	});
			 *
			 * @name $.jstree.defaults.core.check_callback
			 */
			check_callback: false,
			/**
			 * a callback called with a single object parameter in the instance's scope when something goes wrong (operation prevented, ajax failed, etc)
			 * @name $.jstree.defaults.core.error
			 */
			error: $.noop,
			/**
			 * the open / close animation duration in milliseconds - set this to `false` to disable the animation (default is `200`)
			 * @name $.jstree.defaults.core.animation
			 */
			animation: 200,
			/**
			 * a boolean indicating if multiple nodes can be selected
			 * @name $.jstree.defaults.core.multiple
			 */
			multiple: true,
			/**
			 * theme configuration object
			 * @name $.jstree.defaults.core.themes
			 */
			themes: {
				/**
				 * the name of the theme to use (if left as `false` the default theme is used)
				 * @name $.jstree.defaults.core.themes.name
				 */
				name: false,
				/**
				 * the URL of the theme's CSS file, leave this as `false` if you have manually included the theme CSS (recommended). You can set this to `true` too which will try to autoload the theme.
				 * @name $.jstree.defaults.core.themes.url
				 */
				url: false,
				/**
				 * the location of all jstree themes - only used if `url` is set to `true`
				 * @name $.jstree.defaults.core.themes.dir
				 */
				dir: false,
				/**
				 * a boolean indicating if connecting dots are shown
				 * @name $.jstree.defaults.core.themes.dots
				 */
				dots: true,
				/**
				 * a boolean indicating if node icons are shown
				 * @name $.jstree.defaults.core.themes.icons
				 */
				icons: true,
				/**
				 * a boolean indicating if node ellipsis should be shown - this only works with a fixed with on the container
				 * @name $.jstree.defaults.core.themes.ellipsis
				 */
				ellipsis: false,
				/**
				 * a boolean indicating if the tree background is striped
				 * @name $.jstree.defaults.core.themes.stripes
				 */
				stripes: false,
				/**
				 * a string (or boolean `false`) specifying the theme variant to use (if the theme supports variants)
				 * @name $.jstree.defaults.core.themes.variant
				 */
				variant: false,
				/**
				 * a boolean specifying if a reponsive version of the theme should kick in on smaller screens (if the theme supports it). Defaults to `false`.
				 * @name $.jstree.defaults.core.themes.responsive
				 */
				responsive: false
			},
			/**
			 * if left as `true` all parents of all selected nodes will be opened once the tree loads (so that all selected nodes are visible to the user)
			 * @name $.jstree.defaults.core.expand_selected_onload
			 */
			expand_selected_onload: true,
			/**
			 * if left as `true` web workers will be used to parse incoming JSON data where possible, so that the UI will not be blocked by large requests. Workers are however about 30% slower. Defaults to `true`
			 * @name $.jstree.defaults.core.worker
			 */
			worker: true,
			/**
			 * Force node text to plain text (and escape HTML). Defaults to `false`
			 * @name $.jstree.defaults.core.force_text
			 */
			force_text: false,
			/**
			 * Should the node should be toggled if the text is double clicked . Defaults to `true`
			 * @name $.jstree.defaults.core.dblclick_toggle
			 */
			dblclick_toggle: true,
			/**
			 * Should the loaded nodes be part of the state. Defaults to `false`
			 * @name $.jstree.defaults.core.loaded_state
			 */
			loaded_state: false,
			/**
			 * Should the last active node be focused when the tree container is blurred and the focused again. This helps working with screen readers. Defaults to `true`
			 * @name $.jstree.defaults.core.restore_focus
			 */
			restore_focus: true,
			/**
			 * Default keyboard shortcuts (an object where each key is the button name or combo - like 'enter', 'ctrl-space', 'p', etc and the value is the function to execute in the instance's scope)
			 * @name $.jstree.defaults.core.keyboard
			 */
			keyboard: {
				'ctrl-space': function (e) {
					// aria defines space only with Ctrl
					e.type = "click";
					$(e.currentTarget).trigger(e);
				},
				'enter': function (e) {
					// enter
					e.type = "click";
					$(e.currentTarget).trigger(e);
				},
				'left': function (e) {
					// left
					e.preventDefault();
					if (this.is_open(e.currentTarget)) {
						this.close_node(e.currentTarget);
					} else {
						var o = this.get_parent(e.currentTarget);
						if (o && o.id !== $.jstree.root) {
							this.get_node(o, true).children('.jstree-anchor').focus();
						}
					}
				},
				'up': function (e) {
					// up
					e.preventDefault();
					var o = this.get_prev_dom(e.currentTarget);
					if (o && o.length) {
						o.children('.jstree-anchor').focus();
					}
				},
				'right': function (e) {
					// right
					e.preventDefault();
					if (this.is_closed(e.currentTarget)) {
						this.open_node(e.currentTarget, function (o) {
							this.get_node(o, true).children('.jstree-anchor').focus();
						});
					} else if (this.is_open(e.currentTarget)) {
						var o = this.get_node(e.currentTarget, true).children('.jstree-children')[0];
						if (o) {
							$(this._firstChild(o)).children('.jstree-anchor').focus();
						}
					}
				},
				'down': function (e) {
					// down
					e.preventDefault();
					var o = this.get_next_dom(e.currentTarget);
					if (o && o.length) {
						o.children('.jstree-anchor').focus();
					}
				},
				'*': function (e) {
					// aria defines * on numpad as open_all - not very common
					this.open_all();
				},
				'home': function (e) {
					// home
					e.preventDefault();
					var o = this._firstChild(this.get_container_ul()[0]);
					if (o) {
						$(o).children('.jstree-anchor').filter(':visible').focus();
					}
				},
				'end': function (e) {
					// end
					e.preventDefault();
					this.element.find('.jstree-anchor').filter(':visible').last().focus();
				},
				'f2': function (e) {
					// f2 - safe to include - if check_callback is false it will fail
					e.preventDefault();
					this.edit(e.currentTarget);
				}
			}
		};
		$.jstree.core.prototype = {
			/**
			 * used to decorate an instance with a plugin. Used internally.
			 * @private
			 * @name plugin(deco [, opts])
			 * @param  {String} deco the plugin to decorate with
			 * @param  {Object} opts options for the plugin
			 * @return {jsTree}
			 */
			plugin: function (deco, opts) {
				var Child = $.jstree.plugins[deco];
				if (Child) {
					this._data[deco] = {};
					Child.prototype = this;
					return new Child(opts, this);
				}
				return this;
			},
			/**
			 * initialize the instance. Used internally.
			 * @private
			 * @name init(el, optons)
			 * @param {DOMElement|jQuery|String} el the element we are transforming
			 * @param {Object} options options for this instance
			 * @trigger init.jstree, loading.jstree, loaded.jstree, ready.jstree, changed.jstree
			 */
			init: function (el, options) {
				this._model = {
					data: {},
					changed: [],
					force_full_redraw: false,
					redraw_timeout: false,
					default_state: {
						loaded: true,
						opened: false,
						selected: false,
						disabled: false
					}
				};
				this._model.data[$.jstree.root] = {
					id: $.jstree.root,
					parent: null,
					parents: [],
					children: [],
					children_d: [],
					state: {
						loaded: false
					}
				};

				this.element = $(el).addClass('jstree jstree-' + this._id);
				this.settings = options;

				this._data.core.ready = false;
				this._data.core.loaded = false;
				this._data.core.rtl = (this.element.css("direction") === "rtl");
				this.element[this._data.core.rtl ? 'addClass' : 'removeClass']("jstree-rtl");
				this.element.attr('role', 'tree');
				if (this.settings.core.multiple) {
					this.element.attr('aria-multiselectable', true);
				}
				if (!this.element.attr('tabindex')) {
					this.element.attr('tabindex', '0');
				}

				this.bind();
				/**
				 * triggered after all events are bound
				 * @event
				 * @name init.jstree
				 */
				this.trigger("init");

				this._data.core.original_container_html = this.element.find(" > ul > li").clone(true);
				this._data.core.original_container_html
					.find("li").addBack()
					.contents().filter(function () {
						return this.nodeType === 3 && (!this.nodeValue || /^\s+$/.test(this.nodeValue));
					})
					.remove();
				this.element.html("<" + "ul class='jstree-container-ul jstree-children' role='group'><" + "li id='j" + this._id + "_loading' class='jstree-initial-node jstree-loading jstree-leaf jstree-last' role='tree-item'><i class='jstree-icon jstree-ocl'></i><" + "a class='jstree-anchor' href='#'><i class='jstree-icon jstree-themeicon-hidden'></i>" + this.get_string("Loading ...") + "</a></li></ul>");
				this.element.attr('aria-activedescendant', 'j' + this._id + '_loading');
				this._data.core.li_height = this.get_container_ul().children("li").first().outerHeight() || 24;
				this._data.core.node = this._create_prototype_node();
				/**
				 * triggered after the loading text is shown and before loading starts
				 * @event
				 * @name loading.jstree
				 */
				this.trigger("loading");
				this.load_node($.jstree.root);
			},
			/**
			 * destroy an instance
			 * @name destroy()
			 * @param  {Boolean} keep_html if not set to `true` the container will be emptied, otherwise the current DOM elements will be kept intact
			 */
			destroy: function (keep_html) {
				/**
				 * triggered before the tree is destroyed
				 * @event
				 * @name destroy.jstree
				 */
				this.trigger("destroy");
				if (this._wrk) {
					try {
						window.URL.revokeObjectURL(this._wrk);
						this._wrk = null;
					} catch (ignore) {}
				}
				if (!keep_html) {
					this.element.empty();
				}
				this.teardown();
			},
			/**
			 * Create a prototype node
			 * @name _create_prototype_node()
			 * @return {DOMElement}
			 */
			_create_prototype_node: function () {
				var _node = document.createElement('LI'),
					_temp1, _temp2;
				_node.setAttribute('role', 'treeitem');
				_temp1 = document.createElement('I');
				_temp1.className = 'jstree-icon jstree-ocl';
				_temp1.setAttribute('role', 'presentation');
				_node.appendChild(_temp1);
				_temp1 = document.createElement('A');
				_temp1.className = 'jstree-anchor';
				_temp1.setAttribute('href', '#');
				_temp1.setAttribute('tabindex', '-1');
				_temp2 = document.createElement('I');
				_temp2.className = 'jstree-icon jstree-themeicon';
				_temp2.setAttribute('role', 'presentation');
				_temp1.appendChild(_temp2);
				_node.appendChild(_temp1);
				_temp1 = _temp2 = null;

				return _node;
			},
			_kbevent_to_func: function (e) {
				var keys = {
					8: "Backspace",
					9: "Tab",
					13: "Return",
					19: "Pause",
					27: "Esc",
					32: "Space",
					33: "PageUp",
					34: "PageDown",
					35: "End",
					36: "Home",
					37: "Left",
					38: "Up",
					39: "Right",
					40: "Down",
					44: "Print",
					45: "Insert",
					46: "Delete",
					96: "Numpad0",
					97: "Numpad1",
					98: "Numpad2",
					99: "Numpad3",
					100: "Numpad4",
					101: "Numpad5",
					102: "Numpad6",
					103: "Numpad7",
					104: "Numpad8",
					105: "Numpad9",
					'-13': "NumpadEnter",
					112: "F1",
					113: "F2",
					114: "F3",
					115: "F4",
					116: "F5",
					117: "F6",
					118: "F7",
					119: "F8",
					120: "F9",
					121: "F10",
					122: "F11",
					123: "F12",
					144: "Numlock",
					145: "Scrolllock",
					16: 'Shift',
					17: 'Ctrl',
					18: 'Alt',
					48: '0',
					49: '1',
					50: '2',
					51: '3',
					52: '4',
					53: '5',
					54: '6',
					55: '7',
					56: '8',
					57: '9',
					59: ';',
					61: '=',
					65: 'a',
					66: 'b',
					67: 'c',
					68: 'd',
					69: 'e',
					70: 'f',
					71: 'g',
					72: 'h',
					73: 'i',
					74: 'j',
					75: 'k',
					76: 'l',
					77: 'm',
					78: 'n',
					79: 'o',
					80: 'p',
					81: 'q',
					82: 'r',
					83: 's',
					84: 't',
					85: 'u',
					86: 'v',
					87: 'w',
					88: 'x',
					89: 'y',
					90: 'z',
					107: '+',
					109: '-',
					110: '.',
					186: ';',
					187: '=',
					188: ',',
					189: '-',
					190: '.',
					191: '/',
					192: '`',
					219: '[',
					220: '\\',
					221: ']',
					222: "'",
					111: '/',
					106: '*',
					173: '-'
				};
				var parts = [];
				if (e.ctrlKey) {
					parts.push('ctrl');
				}
				if (e.altKey) {
					parts.push('alt');
				}
				if (e.shiftKey) {
					parts.push('shift');
				}
				parts.push(keys[e.which] || e.which);
				parts = parts.sort().join('-').toLowerCase();

				var kb = this.settings.core.keyboard,
					i, tmp;
				for (i in kb) {
					if (kb.hasOwnProperty(i)) {
						tmp = i;
						if (tmp !== '-' && tmp !== '+') {
							tmp = tmp.replace('--', '-MINUS').replace('+-', '-MINUS').replace('++', '-PLUS').replace('-+', '-PLUS');
							tmp = tmp.split(/-|\+/).sort().join('-').replace('MINUS', '-').replace('PLUS', '+').toLowerCase();
						}
						if (tmp === parts) {
							return kb[i];
						}
					}
				}
				return null;
			},
			/**
			 * part of the destroying of an instance. Used internally.
			 * @private
			 * @name teardown()
			 */
			teardown: function () {
				this.unbind();
				this.element
					.removeClass('jstree')
					.removeData('jstree')
					.find("[class^='jstree']")
					.addBack()
					.attr("class", function () {
						return this.className.replace(/jstree[^ ]*|$/ig, '');
					});
				this.element = null;
			},
			/**
			 * bind all events. Used internally.
			 * @private
			 * @name bind()
			 */
			bind: function () {
				var word = '',
					tout = null,
					was_click = 0;
				this.element
					.on("dblclick.jstree", function (e) {
						if (e.target.tagName && e.target.tagName.toLowerCase() === "input") {
							return true;
						}
						if (document.selection && document.selection.empty) {
							document.selection.empty();
						} else {
							if (window.getSelection) {
								var sel = window.getSelection();
								try {
									sel.removeAllRanges();
									sel.collapse();
								} catch (ignore) {}
							}
						}
					})
					.on("mousedown.jstree", $.proxy(function (e) {
						if (e.target === this.element[0]) {
							e.preventDefault(); // prevent losing focus when clicking scroll arrows (FF, Chrome)
							was_click = +(new Date()); // ie does not allow to prevent losing focus
						}
					}, this))
					.on("mousedown.jstree", ".jstree-ocl", function (e) {
						e.preventDefault(); // prevent any node inside from losing focus when clicking the open/close icon
					})
					.on("click.jstree", ".jstree-ocl", $.proxy(function (e) {
						this.toggle_node(e.target);
					}, this))
					.on("dblclick.jstree", ".jstree-anchor", $.proxy(function (e) {
						if (e.target.tagName && e.target.tagName.toLowerCase() === "input") {
							return true;
						}
						if (this.settings.core.dblclick_toggle) {
							this.toggle_node(e.target);
						}
					}, this))
					.on("click.jstree", ".jstree-anchor", $.proxy(function (e) {
						e.preventDefault();
						if (e.currentTarget !== document.activeElement) {
							$(e.currentTarget).focus();
						}
						this.activate_node(e.currentTarget, e);
					}, this))
					.on('keydown.jstree', '.jstree-anchor', $.proxy(function (e) {
						if (e.target.tagName && e.target.tagName.toLowerCase() === "input") {
							return true;
						}
						if (this._data.core.rtl) {
							if (e.which === 37) {
								e.which = 39;
							} else if (e.which === 39) {
								e.which = 37;
							}
						}
						var f = this._kbevent_to_func(e);
						if (f) {
							var r = f.call(this, e);
							if (r === false || r === true) {
								return r;
							}
						}
					}, this))
					.on("load_node.jstree", $.proxy(function (e, data) {
						if (data.status) {
							if (data.node.id === $.jstree.root && !this._data.core.loaded) {
								this._data.core.loaded = true;
								if (this._firstChild(this.get_container_ul()[0])) {
									this.element.attr('aria-activedescendant', this._firstChild(this.get_container_ul()[0]).id);
								}
								/**
								 * triggered after the root node is loaded for the first time
								 * @event
								 * @name loaded.jstree
								 */
								this.trigger("loaded");
							}
							if (!this._data.core.ready) {
								setTimeout($.proxy(function () {
									if (this.element && !this.get_container_ul().find('.jstree-loading').length) {
										this._data.core.ready = true;
										if (this._data.core.selected.length) {
											if (this.settings.core.expand_selected_onload) {
												var tmp = [],
													i, j;
												for (i = 0, j = this._data.core.selected.length; i < j; i++) {
													tmp = tmp.concat(this._model.data[this._data.core.selected[i]].parents);
												}
												tmp = $.vakata.array_unique(tmp);
												for (i = 0, j = tmp.length; i < j; i++) {
													this.open_node(tmp[i], false, 0);
												}
											}
											this.trigger('changed', {
												'action': 'ready',
												'selected': this._data.core.selected
											});
										}
										/**
										 * triggered after all nodes are finished loading
										 * @event
										 * @name ready.jstree
										 */
										this.trigger("ready");
									}
								}, this), 0);
							}
						}
					}, this))
					// quick searching when the tree is focused
					.on('keypress.jstree', $.proxy(function (e) {
						if (e.target.tagName && e.target.tagName.toLowerCase() === "input") {
							return true;
						}
						if (tout) {
							clearTimeout(tout);
						}
						tout = setTimeout(function () {
							word = '';
						}, 500);

						var chr = String.fromCharCode(e.which).toLowerCase(),
							col = this.element.find('.jstree-anchor').filter(':visible'),
							ind = col.index(document.activeElement) || 0,
							end = false;
						word += chr;

						// match for whole word from current node down (including the current node)
						if (word.length > 1) {
							col.slice(ind).each($.proxy(function (i, v) {
								if ($(v).text().toLowerCase().indexOf(word) === 0) {
									$(v).focus();
									end = true;
									return false;
								}
							}, this));
							if (end) {
								return;
							}

							// match for whole word from the beginning of the tree
							col.slice(0, ind).each($.proxy(function (i, v) {
								if ($(v).text().toLowerCase().indexOf(word) === 0) {
									$(v).focus();
									end = true;
									return false;
								}
							}, this));
							if (end) {
								return;
							}
						}
						// list nodes that start with that letter (only if word consists of a single char)
						if (new RegExp('^' + chr.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&') + '+$').test(word)) {
							// search for the next node starting with that letter
							col.slice(ind + 1).each($.proxy(function (i, v) {
								if ($(v).text().toLowerCase().charAt(0) === chr) {
									$(v).focus();
									end = true;
									return false;
								}
							}, this));
							if (end) {
								return;
							}

							// search from the beginning
							col.slice(0, ind + 1).each($.proxy(function (i, v) {
								if ($(v).text().toLowerCase().charAt(0) === chr) {
									$(v).focus();
									end = true;
									return false;
								}
							}, this));
							if (end) {
								return;
							}
						}
					}, this))
					// THEME RELATED
					.on("init.jstree", $.proxy(function () {
						var s = this.settings.core.themes;
						this._data.core.themes.dots = s.dots;
						this._data.core.themes.stripes = s.stripes;
						this._data.core.themes.icons = s.icons;
						this._data.core.themes.ellipsis = s.ellipsis;
						this.set_theme(s.name || "default", s.url);
						this.set_theme_variant(s.variant);
					}, this))
					.on("loading.jstree", $.proxy(function () {
						this[this._data.core.themes.dots ? "show_dots" : "hide_dots"]();
						this[this._data.core.themes.icons ? "show_icons" : "hide_icons"]();
						this[this._data.core.themes.stripes ? "show_stripes" : "hide_stripes"]();
						this[this._data.core.themes.ellipsis ? "show_ellipsis" : "hide_ellipsis"]();
					}, this))
					.on('blur.jstree', '.jstree-anchor', $.proxy(function (e) {
						this._data.core.focused = null;
						$(e.currentTarget).filter('.jstree-hovered').mouseleave();
						this.element.attr('tabindex', '0');
					}, this))
					.on('focus.jstree', '.jstree-anchor', $.proxy(function (e) {
						var tmp = this.get_node(e.currentTarget);
						if (tmp && tmp.id) {
							this._data.core.focused = tmp.id;
						}
						this.element.find('.jstree-hovered').not(e.currentTarget).mouseleave();
						$(e.currentTarget).mouseenter();
						this.element.attr('tabindex', '-1');
					}, this))
					.on('focus.jstree', $.proxy(function () {
						if (+(new Date()) - was_click > 500 && !this._data.core.focused && this.settings.core.restore_focus) {
							was_click = 0;
							var act = this.get_node(this.element.attr('aria-activedescendant'), true);
							if (act) {
								act.find('> .jstree-anchor').focus();
							}
						}
					}, this))
					.on('mouseenter.jstree', '.jstree-anchor', $.proxy(function (e) {
						this.hover_node(e.currentTarget);
					}, this))
					.on('mouseleave.jstree', '.jstree-anchor', $.proxy(function (e) {
						this.dehover_node(e.currentTarget);
					}, this));
			},
			/**
			 * part of the destroying of an instance. Used internally.
			 * @private
			 * @name unbind()
			 */
			unbind: function () {
				this.element.off('.jstree');
				$(document).off('.jstree-' + this._id);
			},
			/**
			 * trigger an event. Used internally.
			 * @private
			 * @name trigger(ev [, data])
			 * @param  {String} ev the name of the event to trigger
			 * @param  {Object} data additional data to pass with the event
			 */
			trigger: function (ev, data) {
				if (!data) {
					data = {};
				}
				data.instance = this;
				this.element.triggerHandler(ev.replace('.jstree', '') + '.jstree', data);
			},
			/**
			 * returns the jQuery extended instance container
			 * @name get_container()
			 * @return {jQuery}
			 */
			get_container: function () {
				return this.element;
			},
			/**
			 * returns the jQuery extended main UL node inside the instance container. Used internally.
			 * @private
			 * @name get_container_ul()
			 * @return {jQuery}
			 */
			get_container_ul: function () {
				return this.element.children(".jstree-children").first();
			},
			/**
			 * gets string replacements (localization). Used internally.
			 * @private
			 * @name get_string(key)
			 * @param  {String} key
			 * @return {String}
			 */
			get_string: function (key) {
				var a = this.settings.core.strings;
				if ($.isFunction(a)) {
					return a.call(this, key);
				}
				if (a && a[key]) {
					return a[key];
				}
				return key;
			},
			/**
			 * gets the first child of a DOM node. Used internally.
			 * @private
			 * @name _firstChild(dom)
			 * @param  {DOMElement} dom
			 * @return {DOMElement}
			 */
			_firstChild: function (dom) {
				dom = dom ? dom.firstChild : null;
				while (dom !== null && dom.nodeType !== 1) {
					dom = dom.nextSibling;
				}
				return dom;
			},
			/**
			 * gets the next sibling of a DOM node. Used internally.
			 * @private
			 * @name _nextSibling(dom)
			 * @param  {DOMElement} dom
			 * @return {DOMElement}
			 */
			_nextSibling: function (dom) {
				dom = dom ? dom.nextSibling : null;
				while (dom !== null && dom.nodeType !== 1) {
					dom = dom.nextSibling;
				}
				return dom;
			},
			/**
			 * gets the previous sibling of a DOM node. Used internally.
			 * @private
			 * @name _previousSibling(dom)
			 * @param  {DOMElement} dom
			 * @return {DOMElement}
			 */
			_previousSibling: function (dom) {
				dom = dom ? dom.previousSibling : null;
				while (dom !== null && dom.nodeType !== 1) {
					dom = dom.previousSibling;
				}
				return dom;
			},
			/**
			 * get the JSON representation of a node (or the actual jQuery extended DOM node) by using any input (child DOM element, ID string, selector, etc)
			 * @name get_node(obj [, as_dom])
			 * @param  {mixed} obj
			 * @param  {Boolean} as_dom
			 * @return {Object|jQuery}
			 */
			get_node: function (obj, as_dom) {
				if (obj && obj.id) {
					obj = obj.id;
				}
				var dom;
				try {
					if (this._model.data[obj]) {
						obj = this._model.data[obj];
					} else if (typeof obj === "string" && this._model.data[obj.replace(/^#/, '')]) {
						obj = this._model.data[obj.replace(/^#/, '')];
					} else if (typeof obj === "string" && (dom = $('#' + obj.replace($.jstree.idregex, '\\$&'), this.element)).length && this._model.data[dom.closest('.jstree-node').attr('id')]) {
						obj = this._model.data[dom.closest('.jstree-node').attr('id')];
					} else if ((dom = $(obj, this.element)).length && this._model.data[dom.closest('.jstree-node').attr('id')]) {
						obj = this._model.data[dom.closest('.jstree-node').attr('id')];
					} else if ((dom = $(obj, this.element)).length && dom.hasClass('jstree')) {
						obj = this._model.data[$.jstree.root];
					} else {
						return false;
					}

					if (as_dom) {
						obj = obj.id === $.jstree.root ? this.element : $('#' + obj.id.replace($.jstree.idregex, '\\$&'), this.element);
					}
					return obj;
				} catch (ex) {
					return false;
				}
			},
			/**
			 * get the path to a node, either consisting of node texts, or of node IDs, optionally glued together (otherwise an array)
			 * @name get_path(obj [, glue, ids])
			 * @param  {mixed} obj the node
			 * @param  {String} glue if you want the path as a string - pass the glue here (for example '/'), if a falsy value is supplied here, an array is returned
			 * @param  {Boolean} ids if set to true build the path using ID, otherwise node text is used
			 * @return {mixed}
			 */
			get_path: function (obj, glue, ids) {
				obj = obj.parents ? obj : this.get_node(obj);
				if (!obj || obj.id === $.jstree.root || !obj.parents) {
					return false;
				}
				var i, j, p = [];
				p.push(ids ? obj.id : obj.text);
				for (i = 0, j = obj.parents.length; i < j; i++) {
					p.push(ids ? obj.parents[i] : this.get_text(obj.parents[i]));
				}
				p = p.reverse().slice(1);
				return glue ? p.join(glue) : p;
			},
			/**
			 * get the next visible node that is below the `obj` node. If `strict` is set to `true` only sibling nodes are returned.
			 * @name get_next_dom(obj [, strict])
			 * @param  {mixed} obj
			 * @param  {Boolean} strict
			 * @return {jQuery}
			 */
			get_next_dom: function (obj, strict) {
				var tmp;
				obj = this.get_node(obj, true);
				if (obj[0] === this.element[0]) {
					tmp = this._firstChild(this.get_container_ul()[0]);
					while (tmp && tmp.offsetHeight === 0) {
						tmp = this._nextSibling(tmp);
					}
					return tmp ? $(tmp) : false;
				}
				if (!obj || !obj.length) {
					return false;
				}
				if (strict) {
					tmp = obj[0];
					do {
						tmp = this._nextSibling(tmp);
					} while (tmp && tmp.offsetHeight === 0);
					return tmp ? $(tmp) : false;
				}
				if (obj.hasClass("jstree-open")) {
					tmp = this._firstChild(obj.children('.jstree-children')[0]);
					while (tmp && tmp.offsetHeight === 0) {
						tmp = this._nextSibling(tmp);
					}
					if (tmp !== null) {
						return $(tmp);
					}
				}
				tmp = obj[0];
				do {
					tmp = this._nextSibling(tmp);
				} while (tmp && tmp.offsetHeight === 0);
				if (tmp !== null) {
					return $(tmp);
				}
				return obj.parentsUntil(".jstree", ".jstree-node").nextAll(".jstree-node:visible").first();
			},
			/**
			 * get the previous visible node that is above the `obj` node. If `strict` is set to `true` only sibling nodes are returned.
			 * @name get_prev_dom(obj [, strict])
			 * @param  {mixed} obj
			 * @param  {Boolean} strict
			 * @return {jQuery}
			 */
			get_prev_dom: function (obj, strict) {
				var tmp;
				obj = this.get_node(obj, true);
				if (obj[0] === this.element[0]) {
					tmp = this.get_container_ul()[0].lastChild;
					while (tmp && tmp.offsetHeight === 0) {
						tmp = this._previousSibling(tmp);
					}
					return tmp ? $(tmp) : false;
				}
				if (!obj || !obj.length) {
					return false;
				}
				if (strict) {
					tmp = obj[0];
					do {
						tmp = this._previousSibling(tmp);
					} while (tmp && tmp.offsetHeight === 0);
					return tmp ? $(tmp) : false;
				}
				tmp = obj[0];
				do {
					tmp = this._previousSibling(tmp);
				} while (tmp && tmp.offsetHeight === 0);
				if (tmp !== null) {
					obj = $(tmp);
					while (obj.hasClass("jstree-open")) {
						obj = obj.children(".jstree-children").first().children(".jstree-node:visible:last");
					}
					return obj;
				}
				tmp = obj[0].parentNode.parentNode;
				return tmp && tmp.className && tmp.className.indexOf('jstree-node') !== -1 ? $(tmp) : false;
			},
			/**
			 * get the parent ID of a node
			 * @name get_parent(obj)
			 * @param  {mixed} obj
			 * @return {String}
			 */
			get_parent: function (obj) {
				obj = this.get_node(obj);
				if (!obj || obj.id === $.jstree.root) {
					return false;
				}
				return obj.parent;
			},
			/**
			 * get a jQuery collection of all the children of a node (node must be rendered), returns false on error
			 * @name get_children_dom(obj)
			 * @param  {mixed} obj
			 * @return {jQuery}
			 */
			get_children_dom: function (obj) {
				obj = this.get_node(obj, true);
				if (obj[0] === this.element[0]) {
					return this.get_container_ul().children(".jstree-node");
				}
				if (!obj || !obj.length) {
					return false;
				}
				return obj.children(".jstree-children").children(".jstree-node");
			},
			/**
			 * checks if a node has children
			 * @name is_parent(obj)
			 * @param  {mixed} obj
			 * @return {Boolean}
			 */
			is_parent: function (obj) {
				obj = this.get_node(obj);
				return obj && (obj.state.loaded === false || obj.children.length > 0);
			},
			/**
			 * checks if a node is loaded (its children are available)
			 * @name is_loaded(obj)
			 * @param  {mixed} obj
			 * @return {Boolean}
			 */
			is_loaded: function (obj) {
				obj = this.get_node(obj);
				return obj && obj.state.loaded;
			},
			/**
			 * check if a node is currently loading (fetching children)
			 * @name is_loading(obj)
			 * @param  {mixed} obj
			 * @return {Boolean}
			 */
			is_loading: function (obj) {
				obj = this.get_node(obj);
				return obj && obj.state && obj.state.loading;
			},
			/**
			 * check if a node is opened
			 * @name is_open(obj)
			 * @param  {mixed} obj
			 * @return {Boolean}
			 */
			is_open: function (obj) {
				obj = this.get_node(obj);
				return obj && obj.state.opened;
			},
			/**
			 * check if a node is in a closed state
			 * @name is_closed(obj)
			 * @param  {mixed} obj
			 * @return {Boolean}
			 */
			is_closed: function (obj) {
				obj = this.get_node(obj);
				return obj && this.is_parent(obj) && !obj.state.opened;
			},
			/**
			 * check if a node has no children
			 * @name is_leaf(obj)
			 * @param  {mixed} obj
			 * @return {Boolean}
			 */
			is_leaf: function (obj) {
				return !this.is_parent(obj);
			},
			/**
			 * loads a node (fetches its children using the `core.data` setting). Multiple nodes can be passed to by using an array.
			 * @name load_node(obj [, callback])
			 * @param  {mixed} obj
			 * @param  {function} callback a function to be executed once loading is complete, the function is executed in the instance's scope and receives two arguments - the node and a boolean status
			 * @return {Boolean}
			 * @trigger load_node.jstree
			 */
			load_node: function (obj, callback) {
				var k, l, i, j, c;
				if ($.isArray(obj)) {
					this._load_nodes(obj.slice(), callback);
					return true;
				}
				obj = this.get_node(obj);
				if (!obj) {
					if (callback) {
						callback.call(this, obj, false);
					}
					return false;
				}
				// if(obj.state.loading) { } // the node is already loading - just wait for it to load and invoke callback? but if called implicitly it should be loaded again?
				if (obj.state.loaded) {
					obj.state.loaded = false;
					for (i = 0, j = obj.parents.length; i < j; i++) {
						this._model.data[obj.parents[i]].children_d = $.vakata.array_filter(this._model.data[obj.parents[i]].children_d, function (v) {
							return $.inArray(v, obj.children_d) === -1;
						});
					}
					for (k = 0, l = obj.children_d.length; k < l; k++) {
						if (this._model.data[obj.children_d[k]].state.selected) {
							c = true;
						}
						delete this._model.data[obj.children_d[k]];
					}
					if (c) {
						this._data.core.selected = $.vakata.array_filter(this._data.core.selected, function (v) {
							return $.inArray(v, obj.children_d) === -1;
						});
					}
					obj.children = [];
					obj.children_d = [];
					if (c) {
						this.trigger('changed', {
							'action': 'load_node',
							'node': obj,
							'selected': this._data.core.selected
						});
					}
				}
				obj.state.failed = false;
				obj.state.loading = true;
				this.get_node(obj, true).addClass("jstree-loading").attr('aria-busy', true);
				this._load_node(obj, $.proxy(function (status) {
					obj = this._model.data[obj.id];
					obj.state.loading = false;
					obj.state.loaded = status;
					obj.state.failed = !obj.state.loaded;
					var dom = this.get_node(obj, true),
						i = 0,
						j = 0,
						m = this._model.data,
						has_children = false;
					for (i = 0, j = obj.children.length; i < j; i++) {
						if (m[obj.children[i]] && !m[obj.children[i]].state.hidden) {
							has_children = true;
							break;
						}
					}
					if (obj.state.loaded && dom && dom.length) {
						dom.removeClass('jstree-closed jstree-open jstree-leaf');
						if (!has_children) {
							dom.addClass('jstree-leaf');
						} else {
							if (obj.id !== '#') {
								dom.addClass(obj.state.opened ? 'jstree-open' : 'jstree-closed');
							}
						}
					}
					dom.removeClass("jstree-loading").attr('aria-busy', false);
					/**
					 * triggered after a node is loaded
					 * @event
					 * @name load_node.jstree
					 * @param {Object} node the node that was loading
					 * @param {Boolean} status was the node loaded successfully
					 */
					this.trigger('load_node', {
						"node": obj,
						"status": status
					});
					if (callback) {
						callback.call(this, obj, status);
					}
				}, this));
				return true;
			},
			/**
			 * load an array of nodes (will also load unavailable nodes as soon as the appear in the structure). Used internally.
			 * @private
			 * @name _load_nodes(nodes [, callback])
			 * @param  {array} nodes
			 * @param  {function} callback a function to be executed once loading is complete, the function is executed in the instance's scope and receives one argument - the array passed to _load_nodes
			 */
			_load_nodes: function (nodes, callback, is_callback, force_reload) {
				var r = true,
					c = function () {
						this._load_nodes(nodes, callback, true);
					},
					m = this._model.data,
					i, j, tmp = [];
				for (i = 0, j = nodes.length; i < j; i++) {
					if (m[nodes[i]] && ((!m[nodes[i]].state.loaded && !m[nodes[i]].state.failed) || (!is_callback && force_reload))) {
						if (!this.is_loading(nodes[i])) {
							this.load_node(nodes[i], c);
						}
						r = false;
					}
				}
				if (r) {
					for (i = 0, j = nodes.length; i < j; i++) {
						if (m[nodes[i]] && m[nodes[i]].state.loaded) {
							tmp.push(nodes[i]);
						}
					}
					if (callback && !callback.done) {
						callback.call(this, tmp);
						callback.done = true;
					}
				}
			},
			/**
			 * loads all unloaded nodes
			 * @name load_all([obj, callback])
			 * @param {mixed} obj the node to load recursively, omit to load all nodes in the tree
			 * @param {function} callback a function to be executed once loading all the nodes is complete,
			 * @trigger load_all.jstree
			 */
			load_all: function (obj, callback) {
				if (!obj) {
					obj = $.jstree.root;
				}
				obj = this.get_node(obj);
				if (!obj) {
					return false;
				}
				var to_load = [],
					m = this._model.data,
					c = m[obj.id].children_d,
					i, j;
				if (obj.state && !obj.state.loaded) {
					to_load.push(obj.id);
				}
				for (i = 0, j = c.length; i < j; i++) {
					if (m[c[i]] && m[c[i]].state && !m[c[i]].state.loaded) {
						to_load.push(c[i]);
					}
				}
				if (to_load.length) {
					this._load_nodes(to_load, function () {
						this.load_all(obj, callback);
					});
				} else {
					/**
					 * triggered after a load_all call completes
					 * @event
					 * @name load_all.jstree
					 * @param {Object} node the recursively loaded node
					 */
					if (callback) {
						callback.call(this, obj);
					}
					this.trigger('load_all', {
						"node": obj
					});
				}
			},
			/**
			 * handles the actual loading of a node. Used only internally.
			 * @private
			 * @name _load_node(obj [, callback])
			 * @param  {mixed} obj
			 * @param  {function} callback a function to be executed once loading is complete, the function is executed in the instance's scope and receives one argument - a boolean status
			 * @return {Boolean}
			 */
			_load_node: function (obj, callback) {
				var s = this.settings.core.data,
					t;
				var notTextOrCommentNode = function notTextOrCommentNode() {
					return this.nodeType !== 3 && this.nodeType !== 8;
				};
				// use original HTML
				if (!s) {
					if (obj.id === $.jstree.root) {
						return this._append_html_data(obj, this._data.core.original_container_html.clone(true), function (status) {
							callback.call(this, status);
						});
					} else {
						return callback.call(this, false);
					}
					// return callback.call(this, obj.id === $.jstree.root ? this._append_html_data(obj, this._data.core.original_container_html.clone(true)) : false);
				}
				if ($.isFunction(s)) {
					return s.call(this, obj, $.proxy(function (d) {
						if (d === false) {
							callback.call(this, false);
						} else {
							this[typeof d === 'string' ? '_append_html_data' : '_append_json_data'](obj, typeof d === 'string' ? $($.parseHTML(d)).filter(notTextOrCommentNode) : d, function (status) {
								callback.call(this, status);
							});
						}
						// return d === false ? callback.call(this, false) : callback.call(this, this[typeof d === 'string' ? '_append_html_data' : '_append_json_data'](obj, typeof d === 'string' ? $(d) : d));
					}, this));
				}
				if (typeof s === 'object') {
					if (s.url) {
						s = $.extend(true, {}, s);
						if ($.isFunction(s.url)) {
							s.url = s.url.call(this, obj);
						}
						if ($.isFunction(s.data)) {
							s.data = s.data.call(this, obj);
						}
						return $.ajax(s)
							.done($.proxy(function (d, t, x) {
								var type = x.getResponseHeader('Content-Type');
								if ((type && type.indexOf('json') !== -1) || typeof d === "object") {
									return this._append_json_data(obj, d, function (status) {
										callback.call(this, status);
									});
									//return callback.call(this, this._append_json_data(obj, d));
								}
								if ((type && type.indexOf('html') !== -1) || typeof d === "string") {
									return this._append_html_data(obj, $($.parseHTML(d)).filter(notTextOrCommentNode), function (status) {
										callback.call(this, status);
									});
									// return callback.call(this, this._append_html_data(obj, $(d)));
								}
								this._data.core.last_error = {
									'error': 'ajax',
									'plugin': 'core',
									'id': 'core_04',
									'reason': 'Could not load node',
									'data': JSON.stringify({
										'id': obj.id,
										'xhr': x
									})
								};
								this.settings.core.error.call(this, this._data.core.last_error);
								return callback.call(this, false);
							}, this))
							.fail($.proxy(function (f) {
								this._data.core.last_error = {
									'error': 'ajax',
									'plugin': 'core',
									'id': 'core_04',
									'reason': 'Could not load node',
									'data': JSON.stringify({
										'id': obj.id,
										'xhr': f
									})
								};
								callback.call(this, false);
								this.settings.core.error.call(this, this._data.core.last_error);
							}, this));
					}
					if ($.isArray(s)) {
						t = $.extend(true, [], s);
					} else if ($.isPlainObject(s)) {
						t = $.extend(true, {}, s);
					} else {
						t = s;
					}
					if (obj.id === $.jstree.root) {
						return this._append_json_data(obj, t, function (status) {
							callback.call(this, status);
						});
					} else {
						this._data.core.last_error = {
							'error': 'nodata',
							'plugin': 'core',
							'id': 'core_05',
							'reason': 'Could not load node',
							'data': JSON.stringify({
								'id': obj.id
							})
						};
						this.settings.core.error.call(this, this._data.core.last_error);
						return callback.call(this, false);
					}
					//return callback.call(this, (obj.id === $.jstree.root ? this._append_json_data(obj, t) : false) );
				}
				if (typeof s === 'string') {
					if (obj.id === $.jstree.root) {
						return this._append_html_data(obj, $($.parseHTML(s)).filter(notTextOrCommentNode), function (status) {
							callback.call(this, status);
						});
					} else {
						this._data.core.last_error = {
							'error': 'nodata',
							'plugin': 'core',
							'id': 'core_06',
							'reason': 'Could not load node',
							'data': JSON.stringify({
								'id': obj.id
							})
						};
						this.settings.core.error.call(this, this._data.core.last_error);
						return callback.call(this, false);
					}
					//return callback.call(this, (obj.id === $.jstree.root ? this._append_html_data(obj, $(s)) : false) );
				}
				return callback.call(this, false);
			},
			/**
			 * adds a node to the list of nodes to redraw. Used only internally.
			 * @private
			 * @name _node_changed(obj [, callback])
			 * @param  {mixed} obj
			 */
			_node_changed: function (obj) {
				obj = this.get_node(obj);
				if (obj && $.inArray(obj.id, this._model.changed) === -1) {
					this._model.changed.push(obj.id);
				}
			},
			/**
			 * appends HTML content to the tree. Used internally.
			 * @private
			 * @name _append_html_data(obj, data)
			 * @param  {mixed} obj the node to append to
			 * @param  {String} data the HTML string to parse and append
			 * @trigger model.jstree, changed.jstree
			 */
			_append_html_data: function (dom, data, cb) {
				dom = this.get_node(dom);
				dom.children = [];
				dom.children_d = [];
				var dat = data.is('ul') ? data.children() : data,
					par = dom.id,
					chd = [],
					dpc = [],
					m = this._model.data,
					p = m[par],
					s = this._data.core.selected.length,
					tmp, i, j;
				dat.each($.proxy(function (i, v) {
					tmp = this._parse_model_from_html($(v), par, p.parents.concat());
					if (tmp) {
						chd.push(tmp);
						dpc.push(tmp);
						if (m[tmp].children_d.length) {
							dpc = dpc.concat(m[tmp].children_d);
						}
					}
				}, this));
				p.children = chd;
				p.children_d = dpc;
				for (i = 0, j = p.parents.length; i < j; i++) {
					m[p.parents[i]].children_d = m[p.parents[i]].children_d.concat(dpc);
				}
				/**
				 * triggered when new data is inserted to the tree model
				 * @event
				 * @name model.jstree
				 * @param {Array} nodes an array of node IDs
				 * @param {String} parent the parent ID of the nodes
				 */
				this.trigger('model', {
					"nodes": dpc,
					'parent': par
				});
				if (par !== $.jstree.root) {
					this._node_changed(par);
					this.redraw();
				} else {
					this.get_container_ul().children('.jstree-initial-node').remove();
					this.redraw(true);
				}
				if (this._data.core.selected.length !== s) {
					this.trigger('changed', {
						'action': 'model',
						'selected': this._data.core.selected
					});
				}
				cb.call(this, true);
			},
			/**
			 * appends JSON content to the tree. Used internally.
			 * @private
			 * @name _append_json_data(obj, data)
			 * @param  {mixed} obj the node to append to
			 * @param  {String} data the JSON object to parse and append
			 * @param  {Boolean} force_processing internal param - do not set
			 * @trigger model.jstree, changed.jstree
			 */
			_append_json_data: function (dom, data, cb, force_processing) {
				if (this.element === null) {
					return;
				}
				dom = this.get_node(dom);
				dom.children = [];
				dom.children_d = [];
				// *%$@!!!
				if (data.d) {
					data = data.d;
					if (typeof data === "string") {
						data = JSON.parse(data);
					}
				}
				if (!$.isArray(data)) {
					data = [data];
				}
				var w = null,
					args = {
						'df': this._model.default_state,
						'dat': data,
						'par': dom.id,
						'm': this._model.data,
						't_id': this._id,
						't_cnt': this._cnt,
						'sel': this._data.core.selected
					},
					func = function (data, undefined) {
						if (data.data) {
							data = data.data;
						}
						var dat = data.dat,
							par = data.par,
							chd = [],
							dpc = [],
							add = [],
							df = data.df,
							t_id = data.t_id,
							t_cnt = data.t_cnt,
							m = data.m,
							p = m[par],
							sel = data.sel,
							tmp, i, j, rslt,
							parse_flat = function (d, p, ps) {
								if (!ps) {
									ps = [];
								} else {
									ps = ps.concat();
								}
								if (p) {
									ps.unshift(p);
								}
								var tid = d.id.toString(),
									i, j, c, e,
									tmp = {
										id: tid,
										text: d.text || '',
										icon: d.icon !== undefined ? d.icon : true,
										parent: p,
										parents: ps,
										children: d.children || [],
										children_d: d.children_d || [],
										data: d.data,
										state: {},
										li_attr: {
											id: false
										},
										a_attr: {
											href: '#'
										},
										original: false
									};
								for (i in df) {
									if (df.hasOwnProperty(i)) {
										tmp.state[i] = df[i];
									}
								}
								if (d && d.data && d.data.jstree && d.data.jstree.icon) {
									tmp.icon = d.data.jstree.icon;
								}
								if (tmp.icon === undefined || tmp.icon === null || tmp.icon === "") {
									tmp.icon = true;
								}
								if (d && d.data) {
									tmp.data = d.data;
									if (d.data.jstree) {
										for (i in d.data.jstree) {
											if (d.data.jstree.hasOwnProperty(i)) {
												tmp.state[i] = d.data.jstree[i];
											}
										}
									}
								}
								if (d && typeof d.state === 'object') {
									for (i in d.state) {
										if (d.state.hasOwnProperty(i)) {
											tmp.state[i] = d.state[i];
										}
									}
								}
								if (d && typeof d.li_attr === 'object') {
									for (i in d.li_attr) {
										if (d.li_attr.hasOwnProperty(i)) {
											tmp.li_attr[i] = d.li_attr[i];
										}
									}
								}
								if (!tmp.li_attr.id) {
									tmp.li_attr.id = tid;
								}
								if (d && typeof d.a_attr === 'object') {
									for (i in d.a_attr) {
										if (d.a_attr.hasOwnProperty(i)) {
											tmp.a_attr[i] = d.a_attr[i];
										}
									}
								}
								if (d && d.children && d.children === true) {
									tmp.state.loaded = false;
									tmp.children = [];
									tmp.children_d = [];
								}
								m[tmp.id] = tmp;
								for (i = 0, j = tmp.children.length; i < j; i++) {
									c = parse_flat(m[tmp.children[i]], tmp.id, ps);
									e = m[c];
									tmp.children_d.push(c);
									if (e.children_d.length) {
										tmp.children_d = tmp.children_d.concat(e.children_d);
									}
								}
								delete d.data;
								delete d.children;
								m[tmp.id].original = d;
								if (tmp.state.selected) {
									add.push(tmp.id);
								}
								return tmp.id;
							},
							parse_nest = function (d, p, ps) {
								if (!ps) {
									ps = [];
								} else {
									ps = ps.concat();
								}
								if (p) {
									ps.unshift(p);
								}
								var tid = false,
									i, j, c, e, tmp;
								do {
									tid = 'j' + t_id + '_' + (++t_cnt);
								} while (m[tid]);

								tmp = {
									id: false,
									text: typeof d === 'string' ? d : '',
									icon: typeof d === 'object' && d.icon !== undefined ? d.icon : true,
									parent: p,
									parents: ps,
									children: [],
									children_d: [],
									data: null,
									state: {},
									li_attr: {
										id: false
									},
									a_attr: {
										href: '#'
									},
									original: false
								};
								for (i in df) {
									if (df.hasOwnProperty(i)) {
										tmp.state[i] = df[i];
									}
								}
								if (d && d.id) {
									tmp.id = d.id.toString();
								}
								if (d && d.text) {
									tmp.text = d.text;
								}
								if (d && d.data && d.data.jstree && d.data.jstree.icon) {
									tmp.icon = d.data.jstree.icon;
								}
								if (tmp.icon === undefined || tmp.icon === null || tmp.icon === "") {
									tmp.icon = true;
								}
								if (d && d.data) {
									tmp.data = d.data;
									if (d.data.jstree) {
										for (i in d.data.jstree) {
											if (d.data.jstree.hasOwnProperty(i)) {
												tmp.state[i] = d.data.jstree[i];
											}
										}
									}
								}
								if (d && typeof d.state === 'object') {
									for (i in d.state) {
										if (d.state.hasOwnProperty(i)) {
											tmp.state[i] = d.state[i];
										}
									}
								}
								if (d && typeof d.li_attr === 'object') {
									for (i in d.li_attr) {
										if (d.li_attr.hasOwnProperty(i)) {
											tmp.li_attr[i] = d.li_attr[i];
										}
									}
								}
								if (tmp.li_attr.id && !tmp.id) {
									tmp.id = tmp.li_attr.id.toString();
								}
								if (!tmp.id) {
									tmp.id = tid;
								}
								if (!tmp.li_attr.id) {
									tmp.li_attr.id = tmp.id;
								}
								if (d && typeof d.a_attr === 'object') {
									for (i in d.a_attr) {
										if (d.a_attr.hasOwnProperty(i)) {
											tmp.a_attr[i] = d.a_attr[i];
										}
									}
								}
								if (d && d.children && d.children.length) {
									for (i = 0, j = d.children.length; i < j; i++) {
										c = parse_nest(d.children[i], tmp.id, ps);
										e = m[c];
										tmp.children.push(c);
										if (e.children_d.length) {
											tmp.children_d = tmp.children_d.concat(e.children_d);
										}
									}
									tmp.children_d = tmp.children_d.concat(tmp.children);
								}
								if (d && d.children && d.children === true) {
									tmp.state.loaded = false;
									tmp.children = [];
									tmp.children_d = [];
								}
								delete d.data;
								delete d.children;
								tmp.original = d;
								m[tmp.id] = tmp;
								if (tmp.state.selected) {
									add.push(tmp.id);
								}
								return tmp.id;
							};

						if (dat.length && dat[0].id !== undefined && dat[0].parent !== undefined) {
							// Flat JSON support (for easy import from DB):
							// 1) convert to object (foreach)
							for (i = 0, j = dat.length; i < j; i++) {
								if (!dat[i].children) {
									dat[i].children = [];
								}
								if (!dat[i].state) {
									dat[i].state = {};
								}
								m[dat[i].id.toString()] = dat[i];
							}
							// 2) populate children (foreach)
							for (i = 0, j = dat.length; i < j; i++) {
								if (!m[dat[i].parent.toString()]) {
									this._data.core.last_error = {
										'error': 'parse',
										'plugin': 'core',
										'id': 'core_07',
										'reason': 'Node with invalid parent',
										'data': JSON.stringify({
											'id': dat[i].id.toString(),
											'parent': dat[i].parent.toString()
										})
									};
									this.settings.core.error.call(this, this._data.core.last_error);
									continue;
								}

								m[dat[i].parent.toString()].children.push(dat[i].id.toString());
								// populate parent.children_d
								p.children_d.push(dat[i].id.toString());
							}
							// 3) normalize && populate parents and children_d with recursion
							for (i = 0, j = p.children.length; i < j; i++) {
								tmp = parse_flat(m[p.children[i]], par, p.parents.concat());
								dpc.push(tmp);
								if (m[tmp].children_d.length) {
									dpc = dpc.concat(m[tmp].children_d);
								}
							}
							for (i = 0, j = p.parents.length; i < j; i++) {
								m[p.parents[i]].children_d = m[p.parents[i]].children_d.concat(dpc);
							}
							// ?) three_state selection - p.state.selected && t - (if three_state foreach(dat => ch) -> foreach(parents) if(parent.selected) child.selected = true;
							rslt = {
								'cnt': t_cnt,
								'mod': m,
								'sel': sel,
								'par': par,
								'dpc': dpc,
								'add': add
							};
						} else {
							for (i = 0, j = dat.length; i < j; i++) {
								tmp = parse_nest(dat[i], par, p.parents.concat());
								if (tmp) {
									chd.push(tmp);
									dpc.push(tmp);
									if (m[tmp].children_d.length) {
										dpc = dpc.concat(m[tmp].children_d);
									}
								}
							}
							p.children = chd;
							p.children_d = dpc;
							for (i = 0, j = p.parents.length; i < j; i++) {
								m[p.parents[i]].children_d = m[p.parents[i]].children_d.concat(dpc);
							}
							rslt = {
								'cnt': t_cnt,
								'mod': m,
								'sel': sel,
								'par': par,
								'dpc': dpc,
								'add': add
							};
						}
						if (typeof window === 'undefined' || typeof window.document === 'undefined') {
							postMessage(rslt);
						} else {
							return rslt;
						}
					},
					rslt = function (rslt, worker) {
						if (this.element === null) {
							return;
						}
						this._cnt = rslt.cnt;
						var i, m = this._model.data;
						for (i in m) {
							if (m.hasOwnProperty(i) && m[i].state && m[i].state.loading && rslt.mod[i]) {
								rslt.mod[i].state.loading = true;
							}
						}
						this._model.data = rslt.mod; // breaks the reference in load_node - careful

						if (worker) {
							var j, a = rslt.add,
								r = rslt.sel,
								s = this._data.core.selected.slice();
							m = this._model.data;
							// if selection was changed while calculating in worker
							if (r.length !== s.length || $.vakata.array_unique(r.concat(s)).length !== r.length) {
								// deselect nodes that are no longer selected
								for (i = 0, j = r.length; i < j; i++) {
									if ($.inArray(r[i], a) === -1 && $.inArray(r[i], s) === -1) {
										m[r[i]].state.selected = false;
									}
								}
								// select nodes that were selected in the mean time
								for (i = 0, j = s.length; i < j; i++) {
									if ($.inArray(s[i], r) === -1) {
										m[s[i]].state.selected = true;
									}
								}
							}
						}
						if (rslt.add.length) {
							this._data.core.selected = this._data.core.selected.concat(rslt.add);
						}

						this.trigger('model', {
							"nodes": rslt.dpc,
							'parent': rslt.par
						});

						if (rslt.par !== $.jstree.root) {
							this._node_changed(rslt.par);
							this.redraw();
						} else {
							// this.get_container_ul().children('.jstree-initial-node').remove();
							this.redraw(true);
						}
						if (rslt.add.length) {
							this.trigger('changed', {
								'action': 'model',
								'selected': this._data.core.selected
							});
						}
						cb.call(this, true);
					};
				if (this.settings.core.worker && window.Blob && window.URL && window.Worker) {
					try {
						if (this._wrk === null) {
							this._wrk = window.URL.createObjectURL(
								new window.Blob(
									['self.onmessage = ' + func.toString()], {
										type: "text/javascript"
									}
								)
							);
						}
						if (!this._data.core.working || force_processing) {
							this._data.core.working = true;
							w = new window.Worker(this._wrk);
							w.onmessage = $.proxy(function (e) {
								rslt.call(this, e.data, true);
								try {
									w.terminate();
									w = null;
								} catch (ignore) {}
								if (this._data.core.worker_queue.length) {
									this._append_json_data.apply(this, this._data.core.worker_queue.shift());
								} else {
									this._data.core.working = false;
								}
							}, this);
							if (!args.par) {
								if (this._data.core.worker_queue.length) {
									this._append_json_data.apply(this, this._data.core.worker_queue.shift());
								} else {
									this._data.core.working = false;
								}
							} else {
								w.postMessage(args);
							}
						} else {
							this._data.core.worker_queue.push([dom, data, cb, true]);
						}
					} catch (e) {
						rslt.call(this, func(args), false);
						if (this._data.core.worker_queue.length) {
							this._append_json_data.apply(this, this._data.core.worker_queue.shift());
						} else {
							this._data.core.working = false;
						}
					}
				} else {
					rslt.call(this, func(args), false);
				}
			},
			/**
			 * parses a node from a jQuery object and appends them to the in memory tree model. Used internally.
			 * @private
			 * @name _parse_model_from_html(d [, p, ps])
			 * @param  {jQuery} d the jQuery object to parse
			 * @param  {String} p the parent ID
			 * @param  {Array} ps list of all parents
			 * @return {String} the ID of the object added to the model
			 */
			_parse_model_from_html: function (d, p, ps) {
				if (!ps) {
					ps = [];
				} else {
					ps = [].concat(ps);
				}
				if (p) {
					ps.unshift(p);
				}
				var c, e, m = this._model.data,
					data = {
						id: false,
						text: false,
						icon: true,
						parent: p,
						parents: ps,
						children: [],
						children_d: [],
						data: null,
						state: {},
						li_attr: {
							id: false
						},
						a_attr: {
							href: '#'
						},
						original: false
					},
					i, tmp, tid;
				for (i in this._model.default_state) {
					if (this._model.default_state.hasOwnProperty(i)) {
						data.state[i] = this._model.default_state[i];
					}
				}
				tmp = $.vakata.attributes(d, true);
				$.each(tmp, function (i, v) {
					v = $.trim(v);
					if (!v.length) {
						return true;
					}
					data.li_attr[i] = v;
					if (i === 'id') {
						data.id = v.toString();
					}
				});
				tmp = d.children('a').first();
				if (tmp.length) {
					tmp = $.vakata.attributes(tmp, true);
					$.each(tmp, function (i, v) {
						v = $.trim(v);
						if (v.length) {
							data.a_attr[i] = v;
						}
					});
				}
				tmp = d.children("a").first().length ? d.children("a").first().clone() : d.clone();
				tmp.children("ins, i, ul").remove();
				tmp = tmp.html();
				tmp = $('<div />').html(tmp);
				data.text = this.settings.core.force_text ? tmp.text() : tmp.html();
				tmp = d.data();
				data.data = tmp ? $.extend(true, {}, tmp) : null;
				data.state.opened = d.hasClass('jstree-open');
				data.state.selected = d.children('a').hasClass('jstree-clicked');
				data.state.disabled = d.children('a').hasClass('jstree-disabled');
				if (data.data && data.data.jstree) {
					for (i in data.data.jstree) {
						if (data.data.jstree.hasOwnProperty(i)) {
							data.state[i] = data.data.jstree[i];
						}
					}
				}
				tmp = d.children("a").children(".jstree-themeicon");
				if (tmp.length) {
					data.icon = tmp.hasClass('jstree-themeicon-hidden') ? false : tmp.attr('rel');
				}
				if (data.state.icon !== undefined) {
					data.icon = data.state.icon;
				}
				if (data.icon === undefined || data.icon === null || data.icon === "") {
					data.icon = true;
				}
				tmp = d.children("ul").children("li");
				do {
					tid = 'j' + this._id + '_' + (++this._cnt);
				} while (m[tid]);
				data.id = data.li_attr.id ? data.li_attr.id.toString() : tid;
				if (tmp.length) {
					tmp.each($.proxy(function (i, v) {
						c = this._parse_model_from_html($(v), data.id, ps);
						e = this._model.data[c];
						data.children.push(c);
						if (e.children_d.length) {
							data.children_d = data.children_d.concat(e.children_d);
						}
					}, this));
					data.children_d = data.children_d.concat(data.children);
				} else {
					if (d.hasClass('jstree-closed')) {
						data.state.loaded = false;
					}
				}
				if (data.li_attr['class']) {
					data.li_attr['class'] = data.li_attr['class'].replace('jstree-closed', '').replace('jstree-open', '');
				}
				if (data.a_attr['class']) {
					data.a_attr['class'] = data.a_attr['class'].replace('jstree-clicked', '').replace('jstree-disabled', '');
				}
				m[data.id] = data;
				if (data.state.selected) {
					this._data.core.selected.push(data.id);
				}
				return data.id;
			},
			/**
			 * parses a node from a JSON object (used when dealing with flat data, which has no nesting of children, but has id and parent properties) and appends it to the in memory tree model. Used internally.
			 * @private
			 * @name _parse_model_from_flat_json(d [, p, ps])
			 * @param  {Object} d the JSON object to parse
			 * @param  {String} p the parent ID
			 * @param  {Array} ps list of all parents
			 * @return {String} the ID of the object added to the model
			 */
			_parse_model_from_flat_json: function (d, p, ps) {
				if (!ps) {
					ps = [];
				} else {
					ps = ps.concat();
				}
				if (p) {
					ps.unshift(p);
				}
				var tid = d.id.toString(),
					m = this._model.data,
					df = this._model.default_state,
					i, j, c, e,
					tmp = {
						id: tid,
						text: d.text || '',
						icon: d.icon !== undefined ? d.icon : true,
						parent: p,
						parents: ps,
						children: d.children || [],
						children_d: d.children_d || [],
						data: d.data,
						state: {},
						li_attr: {
							id: false
						},
						a_attr: {
							href: '#'
						},
						original: false
					};
				for (i in df) {
					if (df.hasOwnProperty(i)) {
						tmp.state[i] = df[i];
					}
				}
				if (d && d.data && d.data.jstree && d.data.jstree.icon) {
					tmp.icon = d.data.jstree.icon;
				}
				if (tmp.icon === undefined || tmp.icon === null || tmp.icon === "") {
					tmp.icon = true;
				}
				if (d && d.data) {
					tmp.data = d.data;
					if (d.data.jstree) {
						for (i in d.data.jstree) {
							if (d.data.jstree.hasOwnProperty(i)) {
								tmp.state[i] = d.data.jstree[i];
							}
						}
					}
				}
				if (d && typeof d.state === 'object') {
					for (i in d.state) {
						if (d.state.hasOwnProperty(i)) {
							tmp.state[i] = d.state[i];
						}
					}
				}
				if (d && typeof d.li_attr === 'object') {
					for (i in d.li_attr) {
						if (d.li_attr.hasOwnProperty(i)) {
							tmp.li_attr[i] = d.li_attr[i];
						}
					}
				}
				if (!tmp.li_attr.id) {
					tmp.li_attr.id = tid;
				}
				if (d && typeof d.a_attr === 'object') {
					for (i in d.a_attr) {
						if (d.a_attr.hasOwnProperty(i)) {
							tmp.a_attr[i] = d.a_attr[i];
						}
					}
				}
				if (d && d.children && d.children === true) {
					tmp.state.loaded = false;
					tmp.children = [];
					tmp.children_d = [];
				}
				m[tmp.id] = tmp;
				for (i = 0, j = tmp.children.length; i < j; i++) {
					c = this._parse_model_from_flat_json(m[tmp.children[i]], tmp.id, ps);
					e = m[c];
					tmp.children_d.push(c);
					if (e.children_d.length) {
						tmp.children_d = tmp.children_d.concat(e.children_d);
					}
				}
				delete d.data;
				delete d.children;
				m[tmp.id].original = d;
				if (tmp.state.selected) {
					this._data.core.selected.push(tmp.id);
				}
				return tmp.id;
			},
			/**
			 * parses a node from a JSON object and appends it to the in memory tree model. Used internally.
			 * @private
			 * @name _parse_model_from_json(d [, p, ps])
			 * @param  {Object} d the JSON object to parse
			 * @param  {String} p the parent ID
			 * @param  {Array} ps list of all parents
			 * @return {String} the ID of the object added to the model
			 */
			_parse_model_from_json: function (d, p, ps) {
				if (!ps) {
					ps = [];
				} else {
					ps = ps.concat();
				}
				if (p) {
					ps.unshift(p);
				}
				var tid = false,
					i, j, c, e, m = this._model.data,
					df = this._model.default_state,
					tmp;
				do {
					tid = 'j' + this._id + '_' + (++this._cnt);
				} while (m[tid]);

				tmp = {
					id: false,
					text: typeof d === 'string' ? d : '',
					icon: typeof d === 'object' && d.icon !== undefined ? d.icon : true,
					parent: p,
					parents: ps,
					children: [],
					children_d: [],
					data: null,
					state: {},
					li_attr: {
						id: false
					},
					a_attr: {
						href: '#'
					},
					original: false
				};
				for (i in df) {
					if (df.hasOwnProperty(i)) {
						tmp.state[i] = df[i];
					}
				}
				if (d && d.id) {
					tmp.id = d.id.toString();
				}
				if (d && d.text) {
					tmp.text = d.text;
				}
				if (d && d.data && d.data.jstree && d.data.jstree.icon) {
					tmp.icon = d.data.jstree.icon;
				}
				if (tmp.icon === undefined || tmp.icon === null || tmp.icon === "") {
					tmp.icon = true;
				}
				if (d && d.data) {
					tmp.data = d.data;
					if (d.data.jstree) {
						for (i in d.data.jstree) {
							if (d.data.jstree.hasOwnProperty(i)) {
								tmp.state[i] = d.data.jstree[i];
							}
						}
					}
				}
				if (d && typeof d.state === 'object') {
					for (i in d.state) {
						if (d.state.hasOwnProperty(i)) {
							tmp.state[i] = d.state[i];
						}
					}
				}
				if (d && typeof d.li_attr === 'object') {
					for (i in d.li_attr) {
						if (d.li_attr.hasOwnProperty(i)) {
							tmp.li_attr[i] = d.li_attr[i];
						}
					}
				}
				if (tmp.li_attr.id && !tmp.id) {
					tmp.id = tmp.li_attr.id.toString();
				}
				if (!tmp.id) {
					tmp.id = tid;
				}
				if (!tmp.li_attr.id) {
					tmp.li_attr.id = tmp.id;
				}
				if (d && typeof d.a_attr === 'object') {
					for (i in d.a_attr) {
						if (d.a_attr.hasOwnProperty(i)) {
							tmp.a_attr[i] = d.a_attr[i];
						}
					}
				}
				if (d && d.children && d.children.length) {
					for (i = 0, j = d.children.length; i < j; i++) {
						c = this._parse_model_from_json(d.children[i], tmp.id, ps);
						e = m[c];
						tmp.children.push(c);
						if (e.children_d.length) {
							tmp.children_d = tmp.children_d.concat(e.children_d);
						}
					}
					tmp.children_d = tmp.children_d.concat(tmp.children);
				}
				if (d && d.children && d.children === true) {
					tmp.state.loaded = false;
					tmp.children = [];
					tmp.children_d = [];
				}
				delete d.data;
				delete d.children;
				tmp.original = d;
				m[tmp.id] = tmp;
				if (tmp.state.selected) {
					this._data.core.selected.push(tmp.id);
				}
				return tmp.id;
			},
			/**
			 * redraws all nodes that need to be redrawn. Used internally.
			 * @private
			 * @name _redraw()
			 * @trigger redraw.jstree
			 */
			_redraw: function () {
				var nodes = this._model.force_full_redraw ? this._model.data[$.jstree.root].children.concat([]) : this._model.changed.concat([]),
					f = document.createElement('UL'),
					tmp, i, j, fe = this._data.core.focused;
				for (i = 0, j = nodes.length; i < j; i++) {
					tmp = this.redraw_node(nodes[i], true, this._model.force_full_redraw);
					if (tmp && this._model.force_full_redraw) {
						f.appendChild(tmp);
					}
				}
				if (this._model.force_full_redraw) {
					f.className = this.get_container_ul()[0].className;
					f.setAttribute('role', 'group');
					this.element.empty().append(f);
					//this.get_container_ul()[0].appendChild(f);
				}
				if (fe !== null) {
					tmp = this.get_node(fe, true);
					if (tmp && tmp.length && tmp.children('.jstree-anchor')[0] !== document.activeElement) {
						tmp.children('.jstree-anchor').focus();
					} else {
						this._data.core.focused = null;
					}
				}
				this._model.force_full_redraw = false;
				this._model.changed = [];
				/**
				 * triggered after nodes are redrawn
				 * @event
				 * @name redraw.jstree
				 * @param {array} nodes the redrawn nodes
				 */
				this.trigger('redraw', {
					"nodes": nodes
				});
			},
			/**
			 * redraws all nodes that need to be redrawn or optionally - the whole tree
			 * @name redraw([full])
			 * @param {Boolean} full if set to `true` all nodes are redrawn.
			 */
			redraw: function (full) {
				if (full) {
					this._model.force_full_redraw = true;
				}
				//if(this._model.redraw_timeout) {
				//	clearTimeout(this._model.redraw_timeout);
				//}
				//this._model.redraw_timeout = setTimeout($.proxy(this._redraw, this),0);
				this._redraw();
			},
			/**
			 * redraws a single node's children. Used internally.
			 * @private
			 * @name draw_children(node)
			 * @param {mixed} node the node whose children will be redrawn
			 */
			draw_children: function (node) {
				var obj = this.get_node(node),
					i = false,
					j = false,
					k = false,
					d = document;
				if (!obj) {
					return false;
				}
				if (obj.id === $.jstree.root) {
					return this.redraw(true);
				}
				node = this.get_node(node, true);
				if (!node || !node.length) {
					return false;
				} // TODO: quick toggle

				node.children('.jstree-children').remove();
				node = node[0];
				if (obj.children.length && obj.state.loaded) {
					k = d.createElement('UL');
					k.setAttribute('role', 'group');
					k.className = 'jstree-children';
					for (i = 0, j = obj.children.length; i < j; i++) {
						k.appendChild(this.redraw_node(obj.children[i], true, true));
					}
					node.appendChild(k);
				}
			},
			/**
			 * redraws a single node. Used internally.
			 * @private
			 * @name redraw_node(node, deep, is_callback, force_render)
			 * @param {mixed} node the node to redraw
			 * @param {Boolean} deep should child nodes be redrawn too
			 * @param {Boolean} is_callback is this a recursion call
			 * @param {Boolean} force_render should children of closed parents be drawn anyway
			 */
			redraw_node: function (node, deep, is_callback, force_render) {
				var obj = this.get_node(node),
					par = false,
					ind = false,
					old = false,
					i = false,
					j = false,
					k = false,
					c = '',
					d = document,
					m = this._model.data,
					f = false,
					s = false,
					tmp = null,
					t = 0,
					l = 0,
					has_children = false,
					last_sibling = false;
				if (!obj) {
					return false;
				}
				if (obj.id === $.jstree.root) {
					return this.redraw(true);
				}
				deep = deep || obj.children.length === 0;
				node = !document.querySelector ? document.getElementById(obj.id) : this.element[0].querySelector('#' + ("0123456789".indexOf(obj.id[0]) !== -1 ? '\\3' + obj.id[0] + ' ' + obj.id.substr(1).replace($.jstree.idregex, '\\$&') : obj.id.replace($.jstree.idregex, '\\$&'))); //, this.element);
				if (!node) {
					deep = true;
					//node = d.createElement('LI');
					if (!is_callback) {
						par = obj.parent !== $.jstree.root ? $('#' + obj.parent.replace($.jstree.idregex, '\\$&'), this.element)[0] : null;
						if (par !== null && (!par || !m[obj.parent].state.opened)) {
							return false;
						}
						ind = $.inArray(obj.id, par === null ? m[$.jstree.root].children : m[obj.parent].children);
					}
				} else {
					node = $(node);
					if (!is_callback) {
						par = node.parent().parent()[0];
						if (par === this.element[0]) {
							par = null;
						}
						ind = node.index();
					}
					// m[obj.id].data = node.data(); // use only node's data, no need to touch jquery storage
					if (!deep && obj.children.length && !node.children('.jstree-children').length) {
						deep = true;
					}
					if (!deep) {
						old = node.children('.jstree-children')[0];
					}
					f = node.children('.jstree-anchor')[0] === document.activeElement;
					node.remove();
					//node = d.createElement('LI');
					//node = node[0];
				}
				node = this._data.core.node.cloneNode(true);
				// node is DOM, deep is boolean

				c = 'jstree-node ';
				for (i in obj.li_attr) {
					if (obj.li_attr.hasOwnProperty(i)) {
						if (i === 'id') {
							continue;
						}
						if (i !== 'class') {
							node.setAttribute(i, obj.li_attr[i]);
						} else {
							c += obj.li_attr[i];
						}
					}
				}
				if (!obj.a_attr.id) {
					obj.a_attr.id = obj.id + '_anchor';
				}
				node.setAttribute('aria-selected', !!obj.state.selected);
				node.setAttribute('aria-level', obj.parents.length);
				node.setAttribute('aria-labelledby', obj.a_attr.id);
				if (obj.state.disabled) {
					node.setAttribute('aria-disabled', true);
				}

				for (i = 0, j = obj.children.length; i < j; i++) {
					if (!m[obj.children[i]].state.hidden) {
						has_children = true;
						break;
					}
				}
				if (obj.parent !== null && m[obj.parent] && !obj.state.hidden) {
					i = $.inArray(obj.id, m[obj.parent].children);
					last_sibling = obj.id;
					if (i !== -1) {
						i++;
						for (j = m[obj.parent].children.length; i < j; i++) {
							if (!m[m[obj.parent].children[i]].state.hidden) {
								last_sibling = m[obj.parent].children[i];
							}
							if (last_sibling !== obj.id) {
								break;
							}
						}
					}
				}

				if (obj.state.hidden) {
					c += ' jstree-hidden';
				}
				if (obj.state.loading) {
					c += ' jstree-loading';
				}
				if (obj.state.loaded && !has_children) {
					c += ' jstree-leaf';
				} else {
					c += obj.state.opened && obj.state.loaded ? ' jstree-open' : ' jstree-closed';
					node.setAttribute('aria-expanded', (obj.state.opened && obj.state.loaded));
				}
				if (last_sibling === obj.id) {
					c += ' jstree-last';
				}
				node.id = obj.id;
				node.className = c;
				c = (obj.state.selected ? ' jstree-clicked' : '') + (obj.state.disabled ? ' jstree-disabled' : '');
				for (j in obj.a_attr) {
					if (obj.a_attr.hasOwnProperty(j)) {
						if (j === 'href' && obj.a_attr[j] === '#') {
							continue;
						}
						if (j !== 'class') {
							node.childNodes[1].setAttribute(j, obj.a_attr[j]);
						} else {
							c += ' ' + obj.a_attr[j];
						}
					}
				}
				if (c.length) {
					node.childNodes[1].className = 'jstree-anchor ' + c;
				}
				if ((obj.icon && obj.icon !== true) || obj.icon === false) {
					if (obj.icon === false) {
						node.childNodes[1].childNodes[0].className += ' jstree-themeicon-hidden';
					} else if (obj.icon.indexOf('/') === -1 && obj.icon.indexOf('.') === -1) {
						node.childNodes[1].childNodes[0].className += ' ' + obj.icon + ' jstree-themeicon-custom';
					} else {
						node.childNodes[1].childNodes[0].style.backgroundImage = 'url("' + obj.icon + '")';
						node.childNodes[1].childNodes[0].style.backgroundPosition = 'center center';
						node.childNodes[1].childNodes[0].style.backgroundSize = 'auto';
						node.childNodes[1].childNodes[0].className += ' jstree-themeicon-custom';
					}
				}

				if (this.settings.core.force_text) {
					node.childNodes[1].appendChild(d.createTextNode(obj.text));
				} else {
					node.childNodes[1].innerHTML += obj.text;
				}


				if (deep && obj.children.length && (obj.state.opened || force_render) && obj.state.loaded) {
					k = d.createElement('UL');
					k.setAttribute('role', 'group');
					k.className = 'jstree-children';
					for (i = 0, j = obj.children.length; i < j; i++) {
						k.appendChild(this.redraw_node(obj.children[i], deep, true));
					}
					node.appendChild(k);
				}
				if (old) {
					node.appendChild(old);
				}
				if (!is_callback) {
					// append back using par / ind
					if (!par) {
						par = this.element[0];
					}
					for (i = 0, j = par.childNodes.length; i < j; i++) {
						if (par.childNodes[i] && par.childNodes[i].className && par.childNodes[i].className.indexOf('jstree-children') !== -1) {
							tmp = par.childNodes[i];
							break;
						}
					}
					if (!tmp) {
						tmp = d.createElement('UL');
						tmp.setAttribute('role', 'group');
						tmp.className = 'jstree-children';
						par.appendChild(tmp);
					}
					par = tmp;

					if (ind < par.childNodes.length) {
						par.insertBefore(node, par.childNodes[ind]);
					} else {
						par.appendChild(node);
					}
					if (f) {
						t = this.element[0].scrollTop;
						l = this.element[0].scrollLeft;
						node.childNodes[1].focus();
						this.element[0].scrollTop = t;
						this.element[0].scrollLeft = l;
					}
				}
				if (obj.state.opened && !obj.state.loaded) {
					obj.state.opened = false;
					setTimeout($.proxy(function () {
						this.open_node(obj.id, false, 0);
					}, this), 0);
				}
				return node;
			},
			/**
			 * opens a node, revaling its children. If the node is not loaded it will be loaded and opened once ready.
			 * @name open_node(obj [, callback, animation])
			 * @param {mixed} obj the node to open
			 * @param {Function} callback a function to execute once the node is opened
			 * @param {Number} animation the animation duration in milliseconds when opening the node (overrides the `core.animation` setting). Use `false` for no animation.
			 * @trigger open_node.jstree, after_open.jstree, before_open.jstree
			 */
			open_node: function (obj, callback, animation) {
				var t1, t2, d, t;
				if ($.isArray(obj)) {
					obj = obj.slice();
					for (t1 = 0, t2 = obj.length; t1 < t2; t1++) {
						this.open_node(obj[t1], callback, animation);
					}
					return true;
				}
				obj = this.get_node(obj);
				if (!obj || obj.id === $.jstree.root) {
					return false;
				}
				animation = animation === undefined ? this.settings.core.animation : animation;
				if (!this.is_closed(obj)) {
					if (callback) {
						callback.call(this, obj, false);
					}
					return false;
				}
				if (!this.is_loaded(obj)) {
					if (this.is_loading(obj)) {
						return setTimeout($.proxy(function () {
							this.open_node(obj, callback, animation);
						}, this), 500);
					}
					this.load_node(obj, function (o, ok) {
						return ok ? this.open_node(o, callback, animation) : (callback ? callback.call(this, o, false) : false);
					});
				} else {
					d = this.get_node(obj, true);
					t = this;
					if (d.length) {
						if (animation && d.children(".jstree-children").length) {
							d.children(".jstree-children").stop(true, true);
						}
						if (obj.children.length && !this._firstChild(d.children('.jstree-children')[0])) {
							this.draw_children(obj);
							//d = this.get_node(obj, true);
						}
						if (!animation) {
							this.trigger('before_open', {
								"node": obj
							});
							d[0].className = d[0].className.replace('jstree-closed', 'jstree-open');
							d[0].setAttribute("aria-expanded", true);
						} else {
							this.trigger('before_open', {
								"node": obj
							});
							d
								.children(".jstree-children").css("display", "none").end()
								.removeClass("jstree-closed").addClass("jstree-open").attr("aria-expanded", true)
								.children(".jstree-children").stop(true, true)
								.slideDown(animation, function () {
									this.style.display = "";
									if (t.element) {
										t.trigger("after_open", {
											"node": obj
										});
									}
								});
						}
					}
					obj.state.opened = true;
					if (callback) {
						callback.call(this, obj, true);
					}
					if (!d.length) {
						/**
						 * triggered when a node is about to be opened (if the node is supposed to be in the DOM, it will be, but it won't be visible yet)
						 * @event
						 * @name before_open.jstree
						 * @param {Object} node the opened node
						 */
						this.trigger('before_open', {
							"node": obj
						});
					}
					/**
					 * triggered when a node is opened (if there is an animation it will not be completed yet)
					 * @event
					 * @name open_node.jstree
					 * @param {Object} node the opened node
					 */
					this.trigger('open_node', {
						"node": obj
					});
					if (!animation || !d.length) {
						/**
						 * triggered when a node is opened and the animation is complete
						 * @event
						 * @name after_open.jstree
						 * @param {Object} node the opened node
						 */
						this.trigger("after_open", {
							"node": obj
						});
					}
					return true;
				}
			},
			/**
			 * opens every parent of a node (node should be loaded)
			 * @name _open_to(obj)
			 * @param {mixed} obj the node to reveal
			 * @private
			 */
			_open_to: function (obj) {
				obj = this.get_node(obj);
				if (!obj || obj.id === $.jstree.root) {
					return false;
				}
				var i, j, p = obj.parents;
				for (i = 0, j = p.length; i < j; i += 1) {
					if (i !== $.jstree.root) {
						this.open_node(p[i], false, 0);
					}
				}
				return $('#' + obj.id.replace($.jstree.idregex, '\\$&'), this.element);
			},
			/**
			 * closes a node, hiding its children
			 * @name close_node(obj [, animation])
			 * @param {mixed} obj the node to close
			 * @param {Number} animation the animation duration in milliseconds when closing the node (overrides the `core.animation` setting). Use `false` for no animation.
			 * @trigger close_node.jstree, after_close.jstree
			 */
			close_node: function (obj, animation) {
				var t1, t2, t, d;
				if ($.isArray(obj)) {
					obj = obj.slice();
					for (t1 = 0, t2 = obj.length; t1 < t2; t1++) {
						this.close_node(obj[t1], animation);
					}
					return true;
				}
				obj = this.get_node(obj);
				if (!obj || obj.id === $.jstree.root) {
					return false;
				}
				if (this.is_closed(obj)) {
					return false;
				}
				animation = animation === undefined ? this.settings.core.animation : animation;
				t = this;
				d = this.get_node(obj, true);

				obj.state.opened = false;
				/**
				 * triggered when a node is closed (if there is an animation it will not be complete yet)
				 * @event
				 * @name close_node.jstree
				 * @param {Object} node the closed node
				 */
				this.trigger('close_node', {
					"node": obj
				});
				if (!d.length) {
					/**
					 * triggered when a node is closed and the animation is complete
					 * @event
					 * @name after_close.jstree
					 * @param {Object} node the closed node
					 */
					this.trigger("after_close", {
						"node": obj
					});
				} else {
					if (!animation) {
						d[0].className = d[0].className.replace('jstree-open', 'jstree-closed');
						d.attr("aria-expanded", false).children('.jstree-children').remove();
						this.trigger("after_close", {
							"node": obj
						});
					} else {
						d
							.children(".jstree-children").attr("style", "display:block !important").end()
							.removeClass("jstree-open").addClass("jstree-closed").attr("aria-expanded", false)
							.children(".jstree-children").stop(true, true).slideUp(animation, function () {
								this.style.display = "";
								d.children('.jstree-children').remove();
								if (t.element) {
									t.trigger("after_close", {
										"node": obj
									});
								}
							});
					}
				}
			},
			/**
			 * toggles a node - closing it if it is open, opening it if it is closed
			 * @name toggle_node(obj)
			 * @param {mixed} obj the node to toggle
			 */
			toggle_node: function (obj) {
				var t1, t2;
				if ($.isArray(obj)) {
					obj = obj.slice();
					for (t1 = 0, t2 = obj.length; t1 < t2; t1++) {
						this.toggle_node(obj[t1]);
					}
					return true;
				}
				if (this.is_closed(obj)) {
					return this.open_node(obj);
				}
				if (this.is_open(obj)) {
					return this.close_node(obj);
				}
			},
			/**
			 * opens all nodes within a node (or the tree), revaling their children. If the node is not loaded it will be loaded and opened once ready.
			 * @name open_all([obj, animation, original_obj])
			 * @param {mixed} obj the node to open recursively, omit to open all nodes in the tree
			 * @param {Number} animation the animation duration in milliseconds when opening the nodes, the default is no animation
			 * @param {jQuery} reference to the node that started the process (internal use)
			 * @trigger open_all.jstree
			 */
			open_all: function (obj, animation, original_obj) {
				if (!obj) {
					obj = $.jstree.root;
				}
				obj = this.get_node(obj);
				if (!obj) {
					return false;
				}
				var dom = obj.id === $.jstree.root ? this.get_container_ul() : this.get_node(obj, true),
					i, j, _this;
				if (!dom.length) {
					for (i = 0, j = obj.children_d.length; i < j; i++) {
						if (this.is_closed(this._model.data[obj.children_d[i]])) {
							this._model.data[obj.children_d[i]].state.opened = true;
						}
					}
					return this.trigger('open_all', {
						"node": obj
					});
				}
				original_obj = original_obj || dom;
				_this = this;
				dom = this.is_closed(obj) ? dom.find('.jstree-closed').addBack() : dom.find('.jstree-closed');
				dom.each(function () {
					_this.open_node(
						this,
						function (node, status) {
							if (status && this.is_parent(node)) {
								this.open_all(node, animation, original_obj);
							}
						},
						animation || 0
					);
				});
				if (original_obj.find('.jstree-closed').length === 0) {
					/**
					 * triggered when an `open_all` call completes
					 * @event
					 * @name open_all.jstree
					 * @param {Object} node the opened node
					 */
					this.trigger('open_all', {
						"node": this.get_node(original_obj)
					});
				}
			},
			/**
			 * closes all nodes within a node (or the tree), revaling their children
			 * @name close_all([obj, animation])
			 * @param {mixed} obj the node to close recursively, omit to close all nodes in the tree
			 * @param {Number} animation the animation duration in milliseconds when closing the nodes, the default is no animation
			 * @trigger close_all.jstree
			 */
			close_all: function (obj, animation) {
				if (!obj) {
					obj = $.jstree.root;
				}
				obj = this.get_node(obj);
				if (!obj) {
					return false;
				}
				var dom = obj.id === $.jstree.root ? this.get_container_ul() : this.get_node(obj, true),
					_this = this,
					i, j;
				if (dom.length) {
					dom = this.is_open(obj) ? dom.find('.jstree-open').addBack() : dom.find('.jstree-open');
					$(dom.get().reverse()).each(function () {
						_this.close_node(this, animation || 0);
					});
				}
				for (i = 0, j = obj.children_d.length; i < j; i++) {
					this._model.data[obj.children_d[i]].state.opened = false;
				}
				/**
				 * triggered when an `close_all` call completes
				 * @event
				 * @name close_all.jstree
				 * @param {Object} node the closed node
				 */
				this.trigger('close_all', {
					"node": obj
				});
			},
			/**
			 * checks if a node is disabled (not selectable)
			 * @name is_disabled(obj)
			 * @param  {mixed} obj
			 * @return {Boolean}
			 */
			is_disabled: function (obj) {
				obj = this.get_node(obj);
				return obj && obj.state && obj.state.disabled;
			},
			/**
			 * enables a node - so that it can be selected
			 * @name enable_node(obj)
			 * @param {mixed} obj the node to enable
			 * @trigger enable_node.jstree
			 */
			enable_node: function (obj) {
				var t1, t2;
				if ($.isArray(obj)) {
					obj = obj.slice();
					for (t1 = 0, t2 = obj.length; t1 < t2; t1++) {
						this.enable_node(obj[t1]);
					}
					return true;
				}
				obj = this.get_node(obj);
				if (!obj || obj.id === $.jstree.root) {
					return false;
				}
				obj.state.disabled = false;
				this.get_node(obj, true).children('.jstree-anchor').removeClass('jstree-disabled').attr('aria-disabled', false);
				/**
				 * triggered when an node is enabled
				 * @event
				 * @name enable_node.jstree
				 * @param {Object} node the enabled node
				 */
				this.trigger('enable_node', {
					'node': obj
				});
			},
			/**
			 * disables a node - so that it can not be selected
			 * @name disable_node(obj)
			 * @param {mixed} obj the node to disable
			 * @trigger disable_node.jstree
			 */
			disable_node: function (obj) {
				var t1, t2;
				if ($.isArray(obj)) {
					obj = obj.slice();
					for (t1 = 0, t2 = obj.length; t1 < t2; t1++) {
						this.disable_node(obj[t1]);
					}
					return true;
				}
				obj = this.get_node(obj);
				if (!obj || obj.id === $.jstree.root) {
					return false;
				}
				obj.state.disabled = true;
				this.get_node(obj, true).children('.jstree-anchor').addClass('jstree-disabled').attr('aria-disabled', true);
				/**
				 * triggered when an node is disabled
				 * @event
				 * @name disable_node.jstree
				 * @param {Object} node the disabled node
				 */
				this.trigger('disable_node', {
					'node': obj
				});
			},
			/**
			 * determines if a node is hidden
			 * @name is_hidden(obj)
			 * @param {mixed} obj the node
			 */
			is_hidden: function (obj) {
				obj = this.get_node(obj);
				return obj.state.hidden === true;
			},
			/**
			 * hides a node - it is still in the structure but will not be visible
			 * @name hide_node(obj)
			 * @param {mixed} obj the node to hide
			 * @param {Boolean} skip_redraw internal parameter controlling if redraw is called
			 * @trigger hide_node.jstree
			 */
			hide_node: function (obj, skip_redraw) {
				var t1, t2;
				if ($.isArray(obj)) {
					obj = obj.slice();
					for (t1 = 0, t2 = obj.length; t1 < t2; t1++) {
						this.hide_node(obj[t1], true);
					}
					if (!skip_redraw) {
						this.redraw();
					}
					return true;
				}
				obj = this.get_node(obj);
				if (!obj || obj.id === $.jstree.root) {
					return false;
				}
				if (!obj.state.hidden) {
					obj.state.hidden = true;
					this._node_changed(obj.parent);
					if (!skip_redraw) {
						this.redraw();
					}
					/**
					 * triggered when an node is hidden
					 * @event
					 * @name hide_node.jstree
					 * @param {Object} node the hidden node
					 */
					this.trigger('hide_node', {
						'node': obj
					});
				}
			},
			/**
			 * shows a node
			 * @name show_node(obj)
			 * @param {mixed} obj the node to show
			 * @param {Boolean} skip_redraw internal parameter controlling if redraw is called
			 * @trigger show_node.jstree
			 */
			show_node: function (obj, skip_redraw) {
				var t1, t2;
				if ($.isArray(obj)) {
					obj = obj.slice();
					for (t1 = 0, t2 = obj.length; t1 < t2; t1++) {
						this.show_node(obj[t1], true);
					}
					if (!skip_redraw) {
						this.redraw();
					}
					return true;
				}
				obj = this.get_node(obj);
				if (!obj || obj.id === $.jstree.root) {
					return false;
				}
				if (obj.state.hidden) {
					obj.state.hidden = false;
					this._node_changed(obj.parent);
					if (!skip_redraw) {
						this.redraw();
					}
					/**
					 * triggered when an node is shown
					 * @event
					 * @name show_node.jstree
					 * @param {Object} node the shown node
					 */
					this.trigger('show_node', {
						'node': obj
					});
				}
			},
			/**
			 * hides all nodes
			 * @name hide_all()
			 * @trigger hide_all.jstree
			 */
			hide_all: function (skip_redraw) {
				var i, m = this._model.data,
					ids = [];
				for (i in m) {
					if (m.hasOwnProperty(i) && i !== $.jstree.root && !m[i].state.hidden) {
						m[i].state.hidden = true;
						ids.push(i);
					}
				}
				this._model.force_full_redraw = true;
				if (!skip_redraw) {
					this.redraw();
				}
				/**
				 * triggered when all nodes are hidden
				 * @event
				 * @name hide_all.jstree
				 * @param {Array} nodes the IDs of all hidden nodes
				 */
				this.trigger('hide_all', {
					'nodes': ids
				});
				return ids;
			},
			/**
			 * shows all nodes
			 * @name show_all()
			 * @trigger show_all.jstree
			 */
			show_all: function (skip_redraw) {
				var i, m = this._model.data,
					ids = [];
				for (i in m) {
					if (m.hasOwnProperty(i) && i !== $.jstree.root && m[i].state.hidden) {
						m[i].state.hidden = false;
						ids.push(i);
					}
				}
				this._model.force_full_redraw = true;
				if (!skip_redraw) {
					this.redraw();
				}
				/**
				 * triggered when all nodes are shown
				 * @event
				 * @name show_all.jstree
				 * @param {Array} nodes the IDs of all shown nodes
				 */
				this.trigger('show_all', {
					'nodes': ids
				});
				return ids;
			},
			/**
			 * called when a node is selected by the user. Used internally.
			 * @private
			 * @name activate_node(obj, e)
			 * @param {mixed} obj the node
			 * @param {Object} e the related event
			 * @trigger activate_node.jstree, changed.jstree
			 */
			activate_node: function (obj, e) {
				if (this.is_disabled(obj)) {
					return false;
				}
				if (!e || typeof e !== 'object') {
					e = {};
				}

				// ensure last_clicked is still in the DOM, make it fresh (maybe it was moved?) and make sure it is still selected, if not - make last_clicked the last selected node
				this._data.core.last_clicked = this._data.core.last_clicked && this._data.core.last_clicked.id !== undefined ? this.get_node(this._data.core.last_clicked.id) : null;
				if (this._data.core.last_clicked && !this._data.core.last_clicked.state.selected) {
					this._data.core.last_clicked = null;
				}
				if (!this._data.core.last_clicked && this._data.core.selected.length) {
					this._data.core.last_clicked = this.get_node(this._data.core.selected[this._data.core.selected.length - 1]);
				}

				if (!this.settings.core.multiple || (!e.metaKey && !e.ctrlKey && !e.shiftKey) || (e.shiftKey && (!this._data.core.last_clicked || !this.get_parent(obj) || this.get_parent(obj) !== this._data.core.last_clicked.parent))) {
					if (!this.settings.core.multiple && (e.metaKey || e.ctrlKey || e.shiftKey) && this.is_selected(obj)) {
						this.deselect_node(obj, false, e);
					} else {
						this.deselect_all(true);
						this.select_node(obj, false, false, e);
						this._data.core.last_clicked = this.get_node(obj);
					}
				} else {
					if (e.shiftKey) {
						var o = this.get_node(obj).id,
							l = this._data.core.last_clicked.id,
							p = this.get_node(this._data.core.last_clicked.parent).children,
							c = false,
							i, j;
						for (i = 0, j = p.length; i < j; i += 1) {
							// separate IFs work whem o and l are the same
							if (p[i] === o) {
								c = !c;
							}
							if (p[i] === l) {
								c = !c;
							}
							if (!this.is_disabled(p[i]) && (c || p[i] === o || p[i] === l)) {
								if (!this.is_hidden(p[i])) {
									this.select_node(p[i], true, false, e);
								}
							} else {
								this.deselect_node(p[i], true, e);
							}
						}
						this.trigger('changed', {
							'action': 'select_node',
							'node': this.get_node(obj),
							'selected': this._data.core.selected,
							'event': e
						});
					} else {
						if (!this.is_selected(obj)) {
							this.select_node(obj, false, false, e);
						} else {
							this.deselect_node(obj, false, e);
						}
					}
				}
				/**
				 * triggered when an node is clicked or intercated with by the user
				 * @event
				 * @name activate_node.jstree
				 * @param {Object} node
				 * @param {Object} event the ooriginal event (if any) which triggered the call (may be an empty object)
				 */
				this.trigger('activate_node', {
					'node': this.get_node(obj),
					'event': e
				});
			},
			/**
			 * applies the hover state on a node, called when a node is hovered by the user. Used internally.
			 * @private
			 * @name hover_node(obj)
			 * @param {mixed} obj
			 * @trigger hover_node.jstree
			 */
			hover_node: function (obj) {
				obj = this.get_node(obj, true);
				if (!obj || !obj.length || obj.children('.jstree-hovered').length) {
					return false;
				}
				var o = this.element.find('.jstree-hovered'),
					t = this.element;
				if (o && o.length) {
					this.dehover_node(o);
				}

				obj.children('.jstree-anchor').addClass('jstree-hovered');
				/**
				 * triggered when an node is hovered
				 * @event
				 * @name hover_node.jstree
				 * @param {Object} node
				 */
				this.trigger('hover_node', {
					'node': this.get_node(obj)
				});
				setTimeout(function () {
					t.attr('aria-activedescendant', obj[0].id);
				}, 0);
			},
			/**
			 * removes the hover state from a nodecalled when a node is no longer hovered by the user. Used internally.
			 * @private
			 * @name dehover_node(obj)
			 * @param {mixed} obj
			 * @trigger dehover_node.jstree
			 */
			dehover_node: function (obj) {
				obj = this.get_node(obj, true);
				if (!obj || !obj.length || !obj.children('.jstree-hovered').length) {
					return false;
				}
				obj.children('.jstree-anchor').removeClass('jstree-hovered');
				/**
				 * triggered when an node is no longer hovered
				 * @event
				 * @name dehover_node.jstree
				 * @param {Object} node
				 */
				this.trigger('dehover_node', {
					'node': this.get_node(obj)
				});
			},
			/**
			 * select a node
			 * @name select_node(obj [, supress_event, prevent_open])
			 * @param {mixed} obj an array can be used to select multiple nodes
			 * @param {Boolean} supress_event if set to `true` the `changed.jstree` event won't be triggered
			 * @param {Boolean} prevent_open if set to `true` parents of the selected node won't be opened
			 * @trigger select_node.jstree, changed.jstree
			 */
			select_node: function (obj, supress_event, prevent_open, e) {
				var dom, t1, t2, th;
				if ($.isArray(obj)) {
					obj = obj.slice();
					for (t1 = 0, t2 = obj.length; t1 < t2; t1++) {
						this.select_node(obj[t1], supress_event, prevent_open, e);
					}
					return true;
				}
				obj = this.get_node(obj);
				if (!obj || obj.id === $.jstree.root) {
					return false;
				}
				dom = this.get_node(obj, true);
				if (!obj.state.selected) {
					obj.state.selected = true;
					this._data.core.selected.push(obj.id);
					if (!prevent_open) {
						dom = this._open_to(obj);
					}
					if (dom && dom.length) {
						dom.attr('aria-selected', true).children('.jstree-anchor').addClass('jstree-clicked');
					}
					/**
					 * triggered when an node is selected
					 * @event
					 * @name select_node.jstree
					 * @param {Object} node
					 * @param {Array} selected the current selection
					 * @param {Object} event the event (if any) that triggered this select_node
					 */
					this.trigger('select_node', {
						'node': obj,
						'selected': this._data.core.selected,
						'event': e
					});
					if (!supress_event) {
						/**
						 * triggered when selection changes
						 * @event
						 * @name changed.jstree
						 * @param {Object} node
						 * @param {Object} action the action that caused the selection to change
						 * @param {Array} selected the current selection
						 * @param {Object} event the event (if any) that triggered this changed event
						 */
						this.trigger('changed', {
							'action': 'select_node',
							'node': obj,
							'selected': this._data.core.selected,
							'event': e
						});
					}
				}
			},
			/**
			 * deselect a node
			 * @name deselect_node(obj [, supress_event])
			 * @param {mixed} obj an array can be used to deselect multiple nodes
			 * @param {Boolean} supress_event if set to `true` the `changed.jstree` event won't be triggered
			 * @trigger deselect_node.jstree, changed.jstree
			 */
			deselect_node: function (obj, supress_event, e) {
				var t1, t2, dom;
				if ($.isArray(obj)) {
					obj = obj.slice();
					for (t1 = 0, t2 = obj.length; t1 < t2; t1++) {
						this.deselect_node(obj[t1], supress_event, e);
					}
					return true;
				}
				obj = this.get_node(obj);
				if (!obj || obj.id === $.jstree.root) {
					return false;
				}
				dom = this.get_node(obj, true);
				if (obj.state.selected) {
					obj.state.selected = false;
					this._data.core.selected = $.vakata.array_remove_item(this._data.core.selected, obj.id);
					if (dom.length) {
						dom.attr('aria-selected', false).children('.jstree-anchor').removeClass('jstree-clicked');
					}
					/**
					 * triggered when an node is deselected
					 * @event
					 * @name deselect_node.jstree
					 * @param {Object} node
					 * @param {Array} selected the current selection
					 * @param {Object} event the event (if any) that triggered this deselect_node
					 */
					this.trigger('deselect_node', {
						'node': obj,
						'selected': this._data.core.selected,
						'event': e
					});
					if (!supress_event) {
						this.trigger('changed', {
							'action': 'deselect_node',
							'node': obj,
							'selected': this._data.core.selected,
							'event': e
						});
					}
				}
			},
			/**
			 * select all nodes in the tree
			 * @name select_all([supress_event])
			 * @param {Boolean} supress_event if set to `true` the `changed.jstree` event won't be triggered
			 * @trigger select_all.jstree, changed.jstree
			 */
			select_all: function (supress_event) {
				var tmp = this._data.core.selected.concat([]),
					i, j;
				this._data.core.selected = this._model.data[$.jstree.root].children_d.concat();
				for (i = 0, j = this._data.core.selected.length; i < j; i++) {
					if (this._model.data[this._data.core.selected[i]]) {
						this._model.data[this._data.core.selected[i]].state.selected = true;
					}
				}
				this.redraw(true);
				/**
				 * triggered when all nodes are selected
				 * @event
				 * @name select_all.jstree
				 * @param {Array} selected the current selection
				 */
				this.trigger('select_all', {
					'selected': this._data.core.selected
				});
				if (!supress_event) {
					this.trigger('changed', {
						'action': 'select_all',
						'selected': this._data.core.selected,
						'old_selection': tmp
					});
				}
			},
			/**
			 * deselect all selected nodes
			 * @name deselect_all([supress_event])
			 * @param {Boolean} supress_event if set to `true` the `changed.jstree` event won't be triggered
			 * @trigger deselect_all.jstree, changed.jstree
			 */
			deselect_all: function (supress_event) {
				var tmp = this._data.core.selected.concat([]),
					i, j;
				for (i = 0, j = this._data.core.selected.length; i < j; i++) {
					if (this._model.data[this._data.core.selected[i]]) {
						this._model.data[this._data.core.selected[i]].state.selected = false;
					}
				}
				this._data.core.selected = [];
				this.element.find('.jstree-clicked').removeClass('jstree-clicked').parent().attr('aria-selected', false);
				/**
				 * triggered when all nodes are deselected
				 * @event
				 * @name deselect_all.jstree
				 * @param {Object} node the previous selection
				 * @param {Array} selected the current selection
				 */
				this.trigger('deselect_all', {
					'selected': this._data.core.selected,
					'node': tmp
				});
				if (!supress_event) {
					this.trigger('changed', {
						'action': 'deselect_all',
						'selected': this._data.core.selected,
						'old_selection': tmp
					});
				}
			},
			/**
			 * checks if a node is selected
			 * @name is_selected(obj)
			 * @param  {mixed}  obj
			 * @return {Boolean}
			 */
			is_selected: function (obj) {
				obj = this.get_node(obj);
				if (!obj || obj.id === $.jstree.root) {
					return false;
				}
				return obj.state.selected;
			},
			/**
			 * get an array of all selected nodes
			 * @name get_selected([full])
			 * @param  {mixed}  full if set to `true` the returned array will consist of the full node objects, otherwise - only IDs will be returned
			 * @return {Array}
			 */
			get_selected: function (full) {
				return full ? $.map(this._data.core.selected, $.proxy(function (i) {
					return this.get_node(i);
				}, this)) : this._data.core.selected.slice();
			},
			/**
			 * get an array of all top level selected nodes (ignoring children of selected nodes)
			 * @name get_top_selected([full])
			 * @param  {mixed}  full if set to `true` the returned array will consist of the full node objects, otherwise - only IDs will be returned
			 * @return {Array}
			 */
			get_top_selected: function (full) {
				var tmp = this.get_selected(true),
					obj = {},
					i, j, k, l;
				for (i = 0, j = tmp.length; i < j; i++) {
					obj[tmp[i].id] = tmp[i];
				}
				for (i = 0, j = tmp.length; i < j; i++) {
					for (k = 0, l = tmp[i].children_d.length; k < l; k++) {
						if (obj[tmp[i].children_d[k]]) {
							delete obj[tmp[i].children_d[k]];
						}
					}
				}
				tmp = [];
				for (i in obj) {
					if (obj.hasOwnProperty(i)) {
						tmp.push(i);
					}
				}
				return full ? $.map(tmp, $.proxy(function (i) {
					return this.get_node(i);
				}, this)) : tmp;
			},
			/**
			 * get an array of all bottom level selected nodes (ignoring selected parents)
			 * @name get_bottom_selected([full])
			 * @param  {mixed}  full if set to `true` the returned array will consist of the full node objects, otherwise - only IDs will be returned
			 * @return {Array}
			 */
			get_bottom_selected: function (full) {
				var tmp = this.get_selected(true),
					obj = [],
					i, j;
				for (i = 0, j = tmp.length; i < j; i++) {
					if (!tmp[i].children.length) {
						obj.push(tmp[i].id);
					}
				}
				return full ? $.map(obj, $.proxy(function (i) {
					return this.get_node(i);
				}, this)) : obj;
			},
			/**
			 * gets the current state of the tree so that it can be restored later with `set_state(state)`. Used internally.
			 * @name get_state()
			 * @private
			 * @return {Object}
			 */
			get_state: function () {
				var state = {
						'core': {
							'open': [],
							'loaded': [],
							'scroll': {
								'left': this.element.scrollLeft(),
								'top': this.element.scrollTop()
							},
							/*!
							'themes' : {
								'name' : this.get_theme(),
								'icons' : this._data.core.themes.icons,
								'dots' : this._data.core.themes.dots
							},
							*/
							'selected': []
						}
					},
					i;
				for (i in this._model.data) {
					if (this._model.data.hasOwnProperty(i)) {
						if (i !== $.jstree.root) {
							if (this._model.data[i].state.loaded && this.settings.core.loaded_state) {
								state.core.loaded.push(i);
							}
							if (this._model.data[i].state.opened) {
								state.core.open.push(i);
							}
							if (this._model.data[i].state.selected) {
								state.core.selected.push(i);
							}
						}
					}
				}
				return state;
			},
			/**
			 * sets the state of the tree. Used internally.
			 * @name set_state(state [, callback])
			 * @private
			 * @param {Object} state the state to restore. Keep in mind this object is passed by reference and jstree will modify it.
			 * @param {Function} callback an optional function to execute once the state is restored.
			 * @trigger set_state.jstree
			 */
			set_state: function (state, callback) {
				if (state) {
					if (state.core && state.core.selected && state.core.initial_selection === undefined) {
						state.core.initial_selection = this._data.core.selected.concat([]).sort().join(',');
					}
					if (state.core) {
						var res, n, t, _this, i;
						if (state.core.loaded) {
							if (!this.settings.core.loaded_state || !$.isArray(state.core.loaded) || !state.core.loaded.length) {
								delete state.core.loaded;
								this.set_state(state, callback);
							} else {
								this._load_nodes(state.core.loaded, function (nodes) {
									delete state.core.loaded;
									this.set_state(state, callback);
								});
							}
							return false;
						}
						if (state.core.open) {
							if (!$.isArray(state.core.open) || !state.core.open.length) {
								delete state.core.open;
								this.set_state(state, callback);
							} else {
								this._load_nodes(state.core.open, function (nodes) {
									this.open_node(nodes, false, 0);
									delete state.core.open;
									this.set_state(state, callback);
								});
							}
							return false;
						}
						if (state.core.scroll) {
							if (state.core.scroll && state.core.scroll.left !== undefined) {
								this.element.scrollLeft(state.core.scroll.left);
							}
							if (state.core.scroll && state.core.scroll.top !== undefined) {
								this.element.scrollTop(state.core.scroll.top);
							}
							delete state.core.scroll;
							this.set_state(state, callback);
							return false;
						}
						if (state.core.selected) {
							_this = this;
							if (state.core.initial_selection === undefined ||
								state.core.initial_selection === this._data.core.selected.concat([]).sort().join(',')
							) {
								this.deselect_all();
								$.each(state.core.selected, function (i, v) {
									_this.select_node(v, false, true);
								});
							}
							delete state.core.initial_selection;
							delete state.core.selected;
							this.set_state(state, callback);
							return false;
						}
						for (i in state) {
							if (state.hasOwnProperty(i) && i !== "core" && $.inArray(i, this.settings.plugins) === -1) {
								delete state[i];
							}
						}
						if ($.isEmptyObject(state.core)) {
							delete state.core;
							this.set_state(state, callback);
							return false;
						}
					}
					if ($.isEmptyObject(state)) {
						state = null;
						if (callback) {
							callback.call(this);
						}
						/**
						 * triggered when a `set_state` call completes
						 * @event
						 * @name set_state.jstree
						 */
						this.trigger('set_state');
						return false;
					}
					return true;
				}
				return false;
			},
			/**
			 * refreshes the tree - all nodes are reloaded with calls to `load_node`.
			 * @name refresh()
			 * @param {Boolean} skip_loading an option to skip showing the loading indicator
			 * @param {Mixed} forget_state if set to `true` state will not be reapplied, if set to a function (receiving the current state as argument) the result of that function will be used as state
			 * @trigger refresh.jstree
			 */
			refresh: function (skip_loading, forget_state) {
				this._data.core.state = forget_state === true ? {} : this.get_state();
				if (forget_state && $.isFunction(forget_state)) {
					this._data.core.state = forget_state.call(this, this._data.core.state);
				}
				this._cnt = 0;
				this._model.data = {};
				this._model.data[$.jstree.root] = {
					id: $.jstree.root,
					parent: null,
					parents: [],
					children: [],
					children_d: [],
					state: {
						loaded: false
					}
				};
				this._data.core.selected = [];
				this._data.core.last_clicked = null;
				this._data.core.focused = null;

				var c = this.get_container_ul()[0].className;
				if (!skip_loading) {
					this.element.html("<" + "ul class='" + c + "' role='group'><" + "li class='jstree-initial-node jstree-loading jstree-leaf jstree-last' role='treeitem' id='j" + this._id + "_loading'><i class='jstree-icon jstree-ocl'></i><" + "a class='jstree-anchor' href='#'><i class='jstree-icon jstree-themeicon-hidden'></i>" + this.get_string("Loading ...") + "</a></li></ul>");
					this.element.attr('aria-activedescendant', 'j' + this._id + '_loading');
				}
				this.load_node($.jstree.root, function (o, s) {
					if (s) {
						this.get_container_ul()[0].className = c;
						if (this._firstChild(this.get_container_ul()[0])) {
							this.element.attr('aria-activedescendant', this._firstChild(this.get_container_ul()[0]).id);
						}
						this.set_state($.extend(true, {}, this._data.core.state), function () {
							/**
							 * triggered when a `refresh` call completes
							 * @event
							 * @name refresh.jstree
							 */
							this.trigger('refresh');
						});
					}
					this._data.core.state = null;
				});
			},
			/**
			 * refreshes a node in the tree (reload its children) all opened nodes inside that node are reloaded with calls to `load_node`.
			 * @name refresh_node(obj)
			 * @param  {mixed} obj the node
			 * @trigger refresh_node.jstree
			 */
			refresh_node: function (obj) {
				obj = this.get_node(obj);
				if (!obj || obj.id === $.jstree.root) {
					return false;
				}
				var opened = [],
					to_load = [],
					s = this._data.core.selected.concat([]);
				to_load.push(obj.id);
				if (obj.state.opened === true) {
					opened.push(obj.id);
				}
				this.get_node(obj, true).find('.jstree-open').each(function () {
					to_load.push(this.id);
					opened.push(this.id);
				});
				this._load_nodes(to_load, $.proxy(function (nodes) {
					this.open_node(opened, false, 0);
					this.select_node(s);
					/**
					 * triggered when a node is refreshed
					 * @event
					 * @name refresh_node.jstree
					 * @param {Object} node - the refreshed node
					 * @param {Array} nodes - an array of the IDs of the nodes that were reloaded
					 */
					this.trigger('refresh_node', {
						'node': obj,
						'nodes': nodes
					});
				}, this), false, true);
			},
			/**
			 * set (change) the ID of a node
			 * @name set_id(obj, id)
			 * @param  {mixed} obj the node
			 * @param  {String} id the new ID
			 * @return {Boolean}
			 * @trigger set_id.jstree
			 */
			set_id: function (obj, id) {
				obj = this.get_node(obj);
				if (!obj || obj.id === $.jstree.root) {
					return false;
				}
				var i, j, m = this._model.data,
					old = obj.id;
				id = id.toString();
				// update parents (replace current ID with new one in children and children_d)
				m[obj.parent].children[$.inArray(obj.id, m[obj.parent].children)] = id;
				for (i = 0, j = obj.parents.length; i < j; i++) {
					m[obj.parents[i]].children_d[$.inArray(obj.id, m[obj.parents[i]].children_d)] = id;
				}
				// update children (replace current ID with new one in parent and parents)
				for (i = 0, j = obj.children.length; i < j; i++) {
					m[obj.children[i]].parent = id;
				}
				for (i = 0, j = obj.children_d.length; i < j; i++) {
					m[obj.children_d[i]].parents[$.inArray(obj.id, m[obj.children_d[i]].parents)] = id;
				}
				i = $.inArray(obj.id, this._data.core.selected);
				if (i !== -1) {
					this._data.core.selected[i] = id;
				}
				// update model and obj itself (obj.id, this._model.data[KEY])
				i = this.get_node(obj.id, true);
				if (i) {
					i.attr('id', id); //.children('.jstree-anchor').attr('id', id + '_anchor').end().attr('aria-labelledby', id + '_anchor');
					if (this.element.attr('aria-activedescendant') === obj.id) {
						this.element.attr('aria-activedescendant', id);
					}
				}
				delete m[obj.id];
				obj.id = id;
				obj.li_attr.id = id;
				m[id] = obj;
				/**
				 * triggered when a node id value is changed
				 * @event
				 * @name set_id.jstree
				 * @param {Object} node
				 * @param {String} old the old id
				 */
				this.trigger('set_id', {
					"node": obj,
					"new": obj.id,
					"old": old
				});
				return true;
			},
			/**
			 * get the text value of a node
			 * @name get_text(obj)
			 * @param  {mixed} obj the node
			 * @return {String}
			 */
			get_text: function (obj) {
				obj = this.get_node(obj);
				return (!obj || obj.id === $.jstree.root) ? false : obj.text;
			},
			/**
			 * set the text value of a node. Used internally, please use `rename_node(obj, val)`.
			 * @private
			 * @name set_text(obj, val)
			 * @param  {mixed} obj the node, you can pass an array to set the text on multiple nodes
			 * @param  {String} val the new text value
			 * @return {Boolean}
			 * @trigger set_text.jstree
			 */
			set_text: function (obj, val) {
				var t1, t2;
				if ($.isArray(obj)) {
					obj = obj.slice();
					for (t1 = 0, t2 = obj.length; t1 < t2; t1++) {
						this.set_text(obj[t1], val);
					}
					return true;
				}
				obj = this.get_node(obj);
				if (!obj || obj.id === $.jstree.root) {
					return false;
				}
				obj.text = val;
				if (this.get_node(obj, true).length) {
					this.redraw_node(obj.id);
				}
				/**
				 * triggered when a node text value is changed
				 * @event
				 * @name set_text.jstree
				 * @param {Object} obj
				 * @param {String} text the new value
				 */
				this.trigger('set_text', {
					"obj": obj,
					"text": val
				});
				return true;
			},
			/**
			 * gets a JSON representation of a node (or the whole tree)
			 * @name get_json([obj, options])
			 * @param  {mixed} obj
			 * @param  {Object} options
			 * @param  {Boolean} options.no_state do not return state information
			 * @param  {Boolean} options.no_id do not return ID
			 * @param  {Boolean} options.no_children do not include children
			 * @param  {Boolean} options.no_data do not include node data
			 * @param  {Boolean} options.no_li_attr do not include LI attributes
			 * @param  {Boolean} options.no_a_attr do not include A attributes
			 * @param  {Boolean} options.flat return flat JSON instead of nested
			 * @return {Object}
			 */
			get_json: function (obj, options, flat) {
				obj = this.get_node(obj || $.jstree.root);
				if (!obj) {
					return false;
				}
				if (options && options.flat && !flat) {
					flat = [];
				}
				var tmp = {
						'id': obj.id,
						'text': obj.text,
						'icon': this.get_icon(obj),
						'li_attr': $.extend(true, {}, obj.li_attr),
						'a_attr': $.extend(true, {}, obj.a_attr),
						'state': {},
						'data': options && options.no_data ? false : $.extend(true, $.isArray(obj.data) ? [] : {}, obj.data)
						//( this.get_node(obj, true).length ? this.get_node(obj, true).data() : obj.data ),
					},
					i, j;
				if (options && options.flat) {
					tmp.parent = obj.parent;
				} else {
					tmp.children = [];
				}
				if (!options || !options.no_state) {
					for (i in obj.state) {
						if (obj.state.hasOwnProperty(i)) {
							tmp.state[i] = obj.state[i];
						}
					}
				} else {
					delete tmp.state;
				}
				if (options && options.no_li_attr) {
					delete tmp.li_attr;
				}
				if (options && options.no_a_attr) {
					delete tmp.a_attr;
				}
				if (options && options.no_id) {
					delete tmp.id;
					if (tmp.li_attr && tmp.li_attr.id) {
						delete tmp.li_attr.id;
					}
					if (tmp.a_attr && tmp.a_attr.id) {
						delete tmp.a_attr.id;
					}
				}
				if (options && options.flat && obj.id !== $.jstree.root) {
					flat.push(tmp);
				}
				if (!options || !options.no_children) {
					for (i = 0, j = obj.children.length; i < j; i++) {
						if (options && options.flat) {
							this.get_json(obj.children[i], options, flat);
						} else {
							tmp.children.push(this.get_json(obj.children[i], options));
						}
					}
				}
				return options && options.flat ? flat : (obj.id === $.jstree.root ? tmp.children : tmp);
			},
			/**
			 * create a new node (do not confuse with load_node)
			 * @name create_node([par, node, pos, callback, is_loaded])
			 * @param  {mixed}   par       the parent node (to create a root node use either "#" (string) or `null`)
			 * @param  {mixed}   node      the data for the new node (a valid JSON object, or a simple string with the name)
			 * @param  {mixed}   pos       the index at which to insert the node, "first" and "last" are also supported, default is "last"
			 * @param  {Function} callback a function to be called once the node is created
			 * @param  {Boolean} is_loaded internal argument indicating if the parent node was succesfully loaded
			 * @return {String}            the ID of the newly create node
			 * @trigger model.jstree, create_node.jstree
			 */
			create_node: function (par, node, pos, callback, is_loaded) {
				if (par === null) {
					par = $.jstree.root;
				}
				par = this.get_node(par);
				if (!par) {
					return false;
				}
				pos = pos === undefined ? "last" : pos;
				if (!pos.toString().match(/^(before|after)$/) && !is_loaded && !this.is_loaded(par)) {
					return this.load_node(par, function () {
						this.create_node(par, node, pos, callback, true);
					});
				}
				if (!node) {
					node = {
						"text": this.get_string('New node')
					};
				}
				if (typeof node === "string") {
					node = {
						"text": node
					};
				} else {
					node = $.extend(true, {}, node);
				}
				if (node.text === undefined) {
					node.text = this.get_string('New node');
				}
				var tmp, dpc, i, j;

				if (par.id === $.jstree.root) {
					if (pos === "before") {
						pos = "first";
					}
					if (pos === "after") {
						pos = "last";
					}
				}
				switch (pos) {
					case "before":
						tmp = this.get_node(par.parent);
						pos = $.inArray(par.id, tmp.children);
						par = tmp;
						break;
					case "after":
						tmp = this.get_node(par.parent);
						pos = $.inArray(par.id, tmp.children) + 1;
						par = tmp;
						break;
					case "inside":
					case "first":
						pos = 0;
						break;
					case "last":
						pos = par.children.length;
						break;
					default:
						if (!pos) {
							pos = 0;
						}
						break;
				}
				if (pos > par.children.length) {
					pos = par.children.length;
				}
				if (!node.id) {
					node.id = true;
				}
				if (!this.check("create_node", node, par, pos)) {
					this.settings.core.error.call(this, this._data.core.last_error);
					return false;
				}
				if (node.id === true) {
					delete node.id;
				}
				node = this._parse_model_from_json(node, par.id, par.parents.concat());
				if (!node) {
					return false;
				}
				tmp = this.get_node(node);
				dpc = [];
				dpc.push(node);
				dpc = dpc.concat(tmp.children_d);
				this.trigger('model', {
					"nodes": dpc,
					"parent": par.id
				});

				par.children_d = par.children_d.concat(dpc);
				for (i = 0, j = par.parents.length; i < j; i++) {
					this._model.data[par.parents[i]].children_d = this._model.data[par.parents[i]].children_d.concat(dpc);
				}
				node = tmp;
				tmp = [];
				for (i = 0, j = par.children.length; i < j; i++) {
					tmp[i >= pos ? i + 1 : i] = par.children[i];
				}
				tmp[pos] = node.id;
				par.children = tmp;

				this.redraw_node(par, true);
				/**
				 * triggered when a node is created
				 * @event
				 * @name create_node.jstree
				 * @param {Object} node
				 * @param {String} parent the parent's ID
				 * @param {Number} position the position of the new node among the parent's children
				 */
				this.trigger('create_node', {
					"node": this.get_node(node),
					"parent": par.id,
					"position": pos
				});
				if (callback) {
					callback.call(this, this.get_node(node));
				}
				return node.id;
			},
			/**
			 * set the text value of a node
			 * @name rename_node(obj, val)
			 * @param  {mixed} obj the node, you can pass an array to rename multiple nodes to the same name
			 * @param  {String} val the new text value
			 * @return {Boolean}
			 * @trigger rename_node.jstree
			 */
			rename_node: function (obj, val) {
				var t1, t2, old;
				if ($.isArray(obj)) {
					obj = obj.slice();
					for (t1 = 0, t2 = obj.length; t1 < t2; t1++) {
						this.rename_node(obj[t1], val);
					}
					return true;
				}
				obj = this.get_node(obj);
				if (!obj || obj.id === $.jstree.root) {
					return false;
				}
				old = obj.text;
				if (!this.check("rename_node", obj, this.get_parent(obj), val)) {
					this.settings.core.error.call(this, this._data.core.last_error);
					return false;
				}
				this.set_text(obj, val); // .apply(this, Array.prototype.slice.call(arguments))
				/**
				 * triggered when a node is renamed
				 * @event
				 * @name rename_node.jstree
				 * @param {Object} node
				 * @param {String} text the new value
				 * @param {String} old the old value
				 */
				this.trigger('rename_node', {
					"node": obj,
					"text": val,
					"old": old
				});
				return true;
			},
			/**
			 * remove a node
			 * @name delete_node(obj)
			 * @param  {mixed} obj the node, you can pass an array to delete multiple nodes
			 * @return {Boolean}
			 * @trigger delete_node.jstree, changed.jstree
			 */
			delete_node: function (obj) {
				var t1, t2, par, pos, tmp, i, j, k, l, c, top, lft;
				if ($.isArray(obj)) {
					obj = obj.slice();
					for (t1 = 0, t2 = obj.length; t1 < t2; t1++) {
						this.delete_node(obj[t1]);
					}
					return true;
				}
				obj = this.get_node(obj);
				if (!obj || obj.id === $.jstree.root) {
					return false;
				}
				par = this.get_node(obj.parent);
				pos = $.inArray(obj.id, par.children);
				c = false;
				if (!this.check("delete_node", obj, par, pos)) {
					this.settings.core.error.call(this, this._data.core.last_error);
					return false;
				}
				if (pos !== -1) {
					par.children = $.vakata.array_remove(par.children, pos);
				}
				tmp = obj.children_d.concat([]);
				tmp.push(obj.id);
				for (i = 0, j = obj.parents.length; i < j; i++) {
					this._model.data[obj.parents[i]].children_d = $.vakata.array_filter(this._model.data[obj.parents[i]].children_d, function (v) {
						return $.inArray(v, tmp) === -1;
					});
				}
				for (k = 0, l = tmp.length; k < l; k++) {
					if (this._model.data[tmp[k]].state.selected) {
						c = true;
						break;
					}
				}
				if (c) {
					this._data.core.selected = $.vakata.array_filter(this._data.core.selected, function (v) {
						return $.inArray(v, tmp) === -1;
					});
				}
				/**
				 * triggered when a node is deleted
				 * @event
				 * @name delete_node.jstree
				 * @param {Object} node
				 * @param {String} parent the parent's ID
				 */
				this.trigger('delete_node', {
					"node": obj,
					"parent": par.id
				});
				if (c) {
					this.trigger('changed', {
						'action': 'delete_node',
						'node': obj,
						'selected': this._data.core.selected,
						'parent': par.id
					});
				}
				for (k = 0, l = tmp.length; k < l; k++) {
					delete this._model.data[tmp[k]];
				}
				if ($.inArray(this._data.core.focused, tmp) !== -1) {
					this._data.core.focused = null;
					top = this.element[0].scrollTop;
					lft = this.element[0].scrollLeft;
					if (par.id === $.jstree.root) {
						if (this._model.data[$.jstree.root].children[0]) {
							this.get_node(this._model.data[$.jstree.root].children[0], true).children('.jstree-anchor').focus();
						}
					} else {
						this.get_node(par, true).children('.jstree-anchor').focus();
					}
					this.element[0].scrollTop = top;
					this.element[0].scrollLeft = lft;
				}
				this.redraw_node(par, true);
				return true;
			},
			/**
			 * check if an operation is premitted on the tree. Used internally.
			 * @private
			 * @name check(chk, obj, par, pos)
			 * @param  {String} chk the operation to check, can be "create_node", "rename_node", "delete_node", "copy_node" or "move_node"
			 * @param  {mixed} obj the node
			 * @param  {mixed} par the parent
			 * @param  {mixed} pos the position to insert at, or if "rename_node" - the new name
			 * @param  {mixed} more some various additional information, for example if a "move_node" operations is triggered by DND this will be the hovered node
			 * @return {Boolean}
			 */
			check: function (chk, obj, par, pos, more) {
				obj = obj && obj.id ? obj : this.get_node(obj);
				par = par && par.id ? par : this.get_node(par);
				var tmp = chk.match(/^move_node|copy_node|create_node$/i) ? par : obj,
					chc = this.settings.core.check_callback;
				if (chk === "move_node" || chk === "copy_node") {
					if ((!more || !more.is_multi) && (obj.id === par.id || (chk === "move_node" && $.inArray(obj.id, par.children) === pos) || $.inArray(par.id, obj.children_d) !== -1)) {
						this._data.core.last_error = {
							'error': 'check',
							'plugin': 'core',
							'id': 'core_01',
							'reason': 'Moving parent inside child',
							'data': JSON.stringify({
								'chk': chk,
								'pos': pos,
								'obj': obj && obj.id ? obj.id : false,
								'par': par && par.id ? par.id : false
							})
						};
						return false;
					}
				}
				if (tmp && tmp.data) {
					tmp = tmp.data;
				}
				if (tmp && tmp.functions && (tmp.functions[chk] === false || tmp.functions[chk] === true)) {
					if (tmp.functions[chk] === false) {
						this._data.core.last_error = {
							'error': 'check',
							'plugin': 'core',
							'id': 'core_02',
							'reason': 'Node data prevents function: ' + chk,
							'data': JSON.stringify({
								'chk': chk,
								'pos': pos,
								'obj': obj && obj.id ? obj.id : false,
								'par': par && par.id ? par.id : false
							})
						};
					}
					return tmp.functions[chk];
				}
				if (chc === false || ($.isFunction(chc) && chc.call(this, chk, obj, par, pos, more) === false) || (chc && chc[chk] === false)) {
					this._data.core.last_error = {
						'error': 'check',
						'plugin': 'core',
						'id': 'core_03',
						'reason': 'User config for core.check_callback prevents function: ' + chk,
						'data': JSON.stringify({
							'chk': chk,
							'pos': pos,
							'obj': obj && obj.id ? obj.id : false,
							'par': par && par.id ? par.id : false
						})
					};
					return false;
				}
				return true;
			},
			/**
			 * get the last error
			 * @name last_error()
			 * @return {Object}
			 */
			last_error: function () {
				return this._data.core.last_error;
			},
			/**
			 * move a node to a new parent
			 * @name move_node(obj, par [, pos, callback, is_loaded])
			 * @param  {mixed} obj the node to move, pass an array to move multiple nodes
			 * @param  {mixed} par the new parent
			 * @param  {mixed} pos the position to insert at (besides integer values, "first" and "last" are supported, as well as "before" and "after"), defaults to integer `0`
			 * @param  {function} callback a function to call once the move is completed, receives 3 arguments - the node, the new parent and the position
			 * @param  {Boolean} is_loaded internal parameter indicating if the parent node has been loaded
			 * @param  {Boolean} skip_redraw internal parameter indicating if the tree should be redrawn
			 * @param  {Boolean} instance internal parameter indicating if the node comes from another instance
			 * @trigger move_node.jstree
			 */
			move_node: function (obj, par, pos, callback, is_loaded, skip_redraw, origin) {
				var t1, t2, old_par, old_pos, new_par, old_ins, is_multi, dpc, tmp, i, j, k, l, p;

				par = this.get_node(par);
				pos = pos === undefined ? 0 : pos;
				if (!par) {
					return false;
				}
				if (!pos.toString().match(/^(before|after)$/) && !is_loaded && !this.is_loaded(par)) {
					return this.load_node(par, function () {
						this.move_node(obj, par, pos, callback, true, false, origin);
					});
				}

				if ($.isArray(obj)) {
					if (obj.length === 1) {
						obj = obj[0];
					} else {
						//obj = obj.slice();
						for (t1 = 0, t2 = obj.length; t1 < t2; t1++) {
							if ((tmp = this.move_node(obj[t1], par, pos, callback, is_loaded, false, origin))) {
								par = tmp;
								pos = "after";
							}
						}
						this.redraw();
						return true;
					}
				}
				obj = obj && obj.id ? obj : this.get_node(obj);

				if (!obj || obj.id === $.jstree.root) {
					return false;
				}

				old_par = (obj.parent || $.jstree.root).toString();
				new_par = (!pos.toString().match(/^(before|after)$/) || par.id === $.jstree.root) ? par : this.get_node(par.parent);
				old_ins = origin ? origin : (this._model.data[obj.id] ? this : $.jstree.reference(obj.id));
				is_multi = !old_ins || !old_ins._id || (this._id !== old_ins._id);
				old_pos = old_ins && old_ins._id && old_par && old_ins._model.data[old_par] && old_ins._model.data[old_par].children ? $.inArray(obj.id, old_ins._model.data[old_par].children) : -1;
				if (old_ins && old_ins._id) {
					obj = old_ins._model.data[obj.id];
				}

				if (is_multi) {
					if ((tmp = this.copy_node(obj, par, pos, callback, is_loaded, false, origin))) {
						if (old_ins) {
							old_ins.delete_node(obj);
						}
						return tmp;
					}
					return false;
				}
				//var m = this._model.data;
				if (par.id === $.jstree.root) {
					if (pos === "before") {
						pos = "first";
					}
					if (pos === "after") {
						pos = "last";
					}
				}
				switch (pos) {
					case "before":
						pos = $.inArray(par.id, new_par.children);
						break;
					case "after":
						pos = $.inArray(par.id, new_par.children) + 1;
						break;
					case "inside":
					case "first":
						pos = 0;
						break;
					case "last":
						pos = new_par.children.length;
						break;
					default:
						if (!pos) {
							pos = 0;
						}
						break;
				}
				if (pos > new_par.children.length) {
					pos = new_par.children.length;
				}
				if (!this.check("move_node", obj, new_par, pos, {
						'core': true,
						'origin': origin,
						'is_multi': (old_ins && old_ins._id && old_ins._id !== this._id),
						'is_foreign': (!old_ins || !old_ins._id)
					})) {
					this.settings.core.error.call(this, this._data.core.last_error);
					return false;
				}
				if (obj.parent === new_par.id) {
					dpc = new_par.children.concat();
					tmp = $.inArray(obj.id, dpc);
					if (tmp !== -1) {
						dpc = $.vakata.array_remove(dpc, tmp);
						if (pos > tmp) {
							pos--;
						}
					}
					tmp = [];
					for (i = 0, j = dpc.length; i < j; i++) {
						tmp[i >= pos ? i + 1 : i] = dpc[i];
					}
					tmp[pos] = obj.id;
					new_par.children = tmp;
					this._node_changed(new_par.id);
					this.redraw(new_par.id === $.jstree.root);
				} else {
					// clean old parent and up
					tmp = obj.children_d.concat();
					tmp.push(obj.id);
					for (i = 0, j = obj.parents.length; i < j; i++) {
						dpc = [];
						p = old_ins._model.data[obj.parents[i]].children_d;
						for (k = 0, l = p.length; k < l; k++) {
							if ($.inArray(p[k], tmp) === -1) {
								dpc.push(p[k]);
							}
						}
						old_ins._model.data[obj.parents[i]].children_d = dpc;
					}
					old_ins._model.data[old_par].children = $.vakata.array_remove_item(old_ins._model.data[old_par].children, obj.id);

					// insert into new parent and up
					for (i = 0, j = new_par.parents.length; i < j; i++) {
						this._model.data[new_par.parents[i]].children_d = this._model.data[new_par.parents[i]].children_d.concat(tmp);
					}
					dpc = [];
					for (i = 0, j = new_par.children.length; i < j; i++) {
						dpc[i >= pos ? i + 1 : i] = new_par.children[i];
					}
					dpc[pos] = obj.id;
					new_par.children = dpc;
					new_par.children_d.push(obj.id);
					new_par.children_d = new_par.children_d.concat(obj.children_d);

					// update object
					obj.parent = new_par.id;
					tmp = new_par.parents.concat();
					tmp.unshift(new_par.id);
					p = obj.parents.length;
					obj.parents = tmp;

					// update object children
					tmp = tmp.concat();
					for (i = 0, j = obj.children_d.length; i < j; i++) {
						this._model.data[obj.children_d[i]].parents = this._model.data[obj.children_d[i]].parents.slice(0, p * -1);
						Array.prototype.push.apply(this._model.data[obj.children_d[i]].parents, tmp);
					}

					if (old_par === $.jstree.root || new_par.id === $.jstree.root) {
						this._model.force_full_redraw = true;
					}
					if (!this._model.force_full_redraw) {
						this._node_changed(old_par);
						this._node_changed(new_par.id);
					}
					if (!skip_redraw) {
						this.redraw();
					}
				}
				if (callback) {
					callback.call(this, obj, new_par, pos);
				}
				/**
				 * triggered when a node is moved
				 * @event
				 * @name move_node.jstree
				 * @param {Object} node
				 * @param {String} parent the parent's ID
				 * @param {Number} position the position of the node among the parent's children
				 * @param {String} old_parent the old parent of the node
				 * @param {Number} old_position the old position of the node
				 * @param {Boolean} is_multi do the node and new parent belong to different instances
				 * @param {jsTree} old_instance the instance the node came from
				 * @param {jsTree} new_instance the instance of the new parent
				 */
				this.trigger('move_node', {
					"node": obj,
					"parent": new_par.id,
					"position": pos,
					"old_parent": old_par,
					"old_position": old_pos,
					'is_multi': (old_ins && old_ins._id && old_ins._id !== this._id),
					'is_foreign': (!old_ins || !old_ins._id),
					'old_instance': old_ins,
					'new_instance': this
				});
				return obj.id;
			},
			/**
			 * copy a node to a new parent
			 * @name copy_node(obj, par [, pos, callback, is_loaded])
			 * @param  {mixed} obj the node to copy, pass an array to copy multiple nodes
			 * @param  {mixed} par the new parent
			 * @param  {mixed} pos the position to insert at (besides integer values, "first" and "last" are supported, as well as "before" and "after"), defaults to integer `0`
			 * @param  {function} callback a function to call once the move is completed, receives 3 arguments - the node, the new parent and the position
			 * @param  {Boolean} is_loaded internal parameter indicating if the parent node has been loaded
			 * @param  {Boolean} skip_redraw internal parameter indicating if the tree should be redrawn
			 * @param  {Boolean} instance internal parameter indicating if the node comes from another instance
			 * @trigger model.jstree copy_node.jstree
			 */
			copy_node: function (obj, par, pos, callback, is_loaded, skip_redraw, origin) {
				var t1, t2, dpc, tmp, i, j, node, old_par, new_par, old_ins, is_multi;

				par = this.get_node(par);
				pos = pos === undefined ? 0 : pos;
				if (!par) {
					return false;
				}
				if (!pos.toString().match(/^(before|after)$/) && !is_loaded && !this.is_loaded(par)) {
					return this.load_node(par, function () {
						this.copy_node(obj, par, pos, callback, true, false, origin);
					});
				}

				if ($.isArray(obj)) {
					if (obj.length === 1) {
						obj = obj[0];
					} else {
						//obj = obj.slice();
						for (t1 = 0, t2 = obj.length; t1 < t2; t1++) {
							if ((tmp = this.copy_node(obj[t1], par, pos, callback, is_loaded, true, origin))) {
								par = tmp;
								pos = "after";
							}
						}
						this.redraw();
						return true;
					}
				}
				obj = obj && obj.id ? obj : this.get_node(obj);
				if (!obj || obj.id === $.jstree.root) {
					return false;
				}

				old_par = (obj.parent || $.jstree.root).toString();
				new_par = (!pos.toString().match(/^(before|after)$/) || par.id === $.jstree.root) ? par : this.get_node(par.parent);
				old_ins = origin ? origin : (this._model.data[obj.id] ? this : $.jstree.reference(obj.id));
				is_multi = !old_ins || !old_ins._id || (this._id !== old_ins._id);

				if (old_ins && old_ins._id) {
					obj = old_ins._model.data[obj.id];
				}

				if (par.id === $.jstree.root) {
					if (pos === "before") {
						pos = "first";
					}
					if (pos === "after") {
						pos = "last";
					}
				}
				switch (pos) {
					case "before":
						pos = $.inArray(par.id, new_par.children);
						break;
					case "after":
						pos = $.inArray(par.id, new_par.children) + 1;
						break;
					case "inside":
					case "first":
						pos = 0;
						break;
					case "last":
						pos = new_par.children.length;
						break;
					default:
						if (!pos) {
							pos = 0;
						}
						break;
				}
				if (pos > new_par.children.length) {
					pos = new_par.children.length;
				}
				if (!this.check("copy_node", obj, new_par, pos, {
						'core': true,
						'origin': origin,
						'is_multi': (old_ins && old_ins._id && old_ins._id !== this._id),
						'is_foreign': (!old_ins || !old_ins._id)
					})) {
					this.settings.core.error.call(this, this._data.core.last_error);
					return false;
				}
				node = old_ins ? old_ins.get_json(obj, {
					no_id: true,
					no_data: true,
					no_state: true
				}) : obj;
				if (!node) {
					return false;
				}
				if (node.id === true) {
					delete node.id;
				}
				node = this._parse_model_from_json(node, new_par.id, new_par.parents.concat());
				if (!node) {
					return false;
				}
				tmp = this.get_node(node);
				if (obj && obj.state && obj.state.loaded === false) {
					tmp.state.loaded = false;
				}
				dpc = [];
				dpc.push(node);
				dpc = dpc.concat(tmp.children_d);
				this.trigger('model', {
					"nodes": dpc,
					"parent": new_par.id
				});

				// insert into new parent and up
				for (i = 0, j = new_par.parents.length; i < j; i++) {
					this._model.data[new_par.parents[i]].children_d = this._model.data[new_par.parents[i]].children_d.concat(dpc);
				}
				dpc = [];
				for (i = 0, j = new_par.children.length; i < j; i++) {
					dpc[i >= pos ? i + 1 : i] = new_par.children[i];
				}
				dpc[pos] = tmp.id;
				new_par.children = dpc;
				new_par.children_d.push(tmp.id);
				new_par.children_d = new_par.children_d.concat(tmp.children_d);

				if (new_par.id === $.jstree.root) {
					this._model.force_full_redraw = true;
				}
				if (!this._model.force_full_redraw) {
					this._node_changed(new_par.id);
				}
				if (!skip_redraw) {
					this.redraw(new_par.id === $.jstree.root);
				}
				if (callback) {
					callback.call(this, tmp, new_par, pos);
				}
				/**
				 * triggered when a node is copied
				 * @event
				 * @name copy_node.jstree
				 * @param {Object} node the copied node
				 * @param {Object} original the original node
				 * @param {String} parent the parent's ID
				 * @param {Number} position the position of the node among the parent's children
				 * @param {String} old_parent the old parent of the node
				 * @param {Number} old_position the position of the original node
				 * @param {Boolean} is_multi do the node and new parent belong to different instances
				 * @param {jsTree} old_instance the instance the node came from
				 * @param {jsTree} new_instance the instance of the new parent
				 */
				this.trigger('copy_node', {
					"node": tmp,
					"original": obj,
					"parent": new_par.id,
					"position": pos,
					"old_parent": old_par,
					"old_position": old_ins && old_ins._id && old_par && old_ins._model.data[old_par] && old_ins._model.data[old_par].children ? $.inArray(obj.id, old_ins._model.data[old_par].children) : -1,
					'is_multi': (old_ins && old_ins._id && old_ins._id !== this._id),
					'is_foreign': (!old_ins || !old_ins._id),
					'old_instance': old_ins,
					'new_instance': this
				});
				return tmp.id;
			},
			/**
			 * cut a node (a later call to `paste(obj)` would move the node)
			 * @name cut(obj)
			 * @param  {mixed} obj multiple objects can be passed using an array
			 * @trigger cut.jstree
			 */
			cut: function (obj) {
				if (!obj) {
					obj = this._data.core.selected.concat();
				}
				if (!$.isArray(obj)) {
					obj = [obj];
				}
				if (!obj.length) {
					return false;
				}
				var tmp = [],
					o, t1, t2;
				for (t1 = 0, t2 = obj.length; t1 < t2; t1++) {
					o = this.get_node(obj[t1]);
					if (o && o.id && o.id !== $.jstree.root) {
						tmp.push(o);
					}
				}
				if (!tmp.length) {
					return false;
				}
				ccp_node = tmp;
				ccp_inst = this;
				ccp_mode = 'move_node';
				/**
				 * triggered when nodes are added to the buffer for moving
				 * @event
				 * @name cut.jstree
				 * @param {Array} node
				 */
				this.trigger('cut', {
					"node": obj
				});
			},
			/**
			 * copy a node (a later call to `paste(obj)` would copy the node)
			 * @name copy(obj)
			 * @param  {mixed} obj multiple objects can be passed using an array
			 * @trigger copy.jstree
			 */
			copy: function (obj) {
				if (!obj) {
					obj = this._data.core.selected.concat();
				}
				if (!$.isArray(obj)) {
					obj = [obj];
				}
				if (!obj.length) {
					return false;
				}
				var tmp = [],
					o, t1, t2;
				for (t1 = 0, t2 = obj.length; t1 < t2; t1++) {
					o = this.get_node(obj[t1]);
					if (o && o.id && o.id !== $.jstree.root) {
						tmp.push(o);
					}
				}
				if (!tmp.length) {
					return false;
				}
				ccp_node = tmp;
				ccp_inst = this;
				ccp_mode = 'copy_node';
				/**
				 * triggered when nodes are added to the buffer for copying
				 * @event
				 * @name copy.jstree
				 * @param {Array} node
				 */
				this.trigger('copy', {
					"node": obj
				});
			},
			/**
			 * get the current buffer (any nodes that are waiting for a paste operation)
			 * @name get_buffer()
			 * @return {Object} an object consisting of `mode` ("copy_node" or "move_node"), `node` (an array of objects) and `inst` (the instance)
			 */
			get_buffer: function () {
				return {
					'mode': ccp_mode,
					'node': ccp_node,
					'inst': ccp_inst
				};
			},
			/**
			 * check if there is something in the buffer to paste
			 * @name can_paste()
			 * @return {Boolean}
			 */
			can_paste: function () {
				return ccp_mode !== false && ccp_node !== false; // && ccp_inst._model.data[ccp_node];
			},
			/**
			 * copy or move the previously cut or copied nodes to a new parent
			 * @name paste(obj [, pos])
			 * @param  {mixed} obj the new parent
			 * @param  {mixed} pos the position to insert at (besides integer, "first" and "last" are supported), defaults to integer `0`
			 * @trigger paste.jstree
			 */
			paste: function (obj, pos) {
				obj = this.get_node(obj);
				if (!obj || !ccp_mode || !ccp_mode.match(/^(copy_node|move_node)$/) || !ccp_node) {
					return false;
				}
				if (this[ccp_mode](ccp_node, obj, pos, false, false, false, ccp_inst)) {
					/**
					 * triggered when paste is invoked
					 * @event
					 * @name paste.jstree
					 * @param {String} parent the ID of the receiving node
					 * @param {Array} node the nodes in the buffer
					 * @param {String} mode the performed operation - "copy_node" or "move_node"
					 */
					this.trigger('paste', {
						"parent": obj.id,
						"node": ccp_node,
						"mode": ccp_mode
					});
				}
				ccp_node = false;
				ccp_mode = false;
				ccp_inst = false;
			},
			/**
			 * clear the buffer of previously copied or cut nodes
			 * @name clear_buffer()
			 * @trigger clear_buffer.jstree
			 */
			clear_buffer: function () {
				ccp_node = false;
				ccp_mode = false;
				ccp_inst = false;
				/**
				 * triggered when the copy / cut buffer is cleared
				 * @event
				 * @name clear_buffer.jstree
				 */
				this.trigger('clear_buffer');
			},
			/**
			 * put a node in edit mode (input field to rename the node)
			 * @name edit(obj [, default_text, callback])
			 * @param  {mixed} obj
			 * @param  {String} default_text the text to populate the input with (if omitted or set to a non-string value the node's text value is used)
			 * @param  {Function} callback a function to be called once the text box is blurred, it is called in the instance's scope and receives the node, a status parameter (true if the rename is successful, false otherwise) and a boolean indicating if the user cancelled the edit. You can access the node's title using .text
			 */
			edit: function (obj, default_text, callback) {
				var rtl, w, a, s, t, h1, h2, fn, tmp, cancel = false;
				obj = this.get_node(obj);
				if (!obj) {
					return false;
				}
				if (!this.check("edit", obj, this.get_parent(obj))) {
					this.settings.core.error.call(this, this._data.core.last_error);
					return false;
				}
				tmp = obj;
				default_text = typeof default_text === 'string' ? default_text : obj.text;
				this.set_text(obj, "");
				obj = this._open_to(obj);
				tmp.text = default_text;

				rtl = this._data.core.rtl;
				w = this.element.width();
				this._data.core.focused = tmp.id;
				a = obj.children('.jstree-anchor').focus();
				s = $('<span>');
				/*!
				oi = obj.children("i:visible"),
				ai = a.children("i:visible"),
				w1 = oi.width() * oi.length,
				w2 = ai.width() * ai.length,
				*/
				t = default_text;
				h1 = $("<" + "div />", {
					css: {
						"position": "absolute",
						"top": "-200px",
						"left": (rtl ? "0px" : "-1000px"),
						"visibility": "hidden"
					}
				}).appendTo("body");
				h2 = $("<" + "input />", {
					"value": t,
					"class": "jstree-rename-input",
					// "size" : t.length,
					"css": {
						"padding": "0",
						"border": "1px solid silver",
						"box-sizing": "border-box",
						"display": "inline-block",
						"height": (this._data.core.li_height) + "px",
						"lineHeight": (this._data.core.li_height) + "px",
						"width": "150px" // will be set a bit further down
					},
					"blur": $.proxy(function (e) {
						e.stopImmediatePropagation();
						e.preventDefault();
						var i = s.children(".jstree-rename-input"),
							v = i.val(),
							f = this.settings.core.force_text,
							nv;
						if (v === "") {
							v = t;
						}
						h1.remove();
						s.replaceWith(a);
						s.remove();
						t = f ? t : $('<div></div>').append($.parseHTML(t)).html();
						this.set_text(obj, t);
						nv = !!this.rename_node(obj, f ? $('<div></div>').text(v).text() : $('<div></div>').append($.parseHTML(v)).html());
						if (!nv) {
							this.set_text(obj, t); // move this up? and fix #483
						}
						this._data.core.focused = tmp.id;
						setTimeout($.proxy(function () {
							var node = this.get_node(tmp.id, true);
							if (node.length) {
								this._data.core.focused = tmp.id;
								node.children('.jstree-anchor').focus();
							}
						}, this), 0);
						if (callback) {
							callback.call(this, tmp, nv, cancel);
						}
						h2 = null;
					}, this),
					"keydown": function (e) {
						var key = e.which;
						if (key === 27) {
							cancel = true;
							this.value = t;
						}
						if (key === 27 || key === 13 || key === 37 || key === 38 || key === 39 || key === 40 || key === 32) {
							e.stopImmediatePropagation();
						}
						if (key === 27 || key === 13) {
							e.preventDefault();
							this.blur();
						}
					},
					"click": function (e) {
						e.stopImmediatePropagation();
					},
					"mousedown": function (e) {
						e.stopImmediatePropagation();
					},
					"keyup": function (e) {
						h2.width(Math.min(h1.text("pW" + this.value).width(), w));
					},
					"keypress": function (e) {
						if (e.which === 13) {
							return false;
						}
					}
				});
				fn = {
					fontFamily: a.css('fontFamily') || '',
					fontSize: a.css('fontSize') || '',
					fontWeight: a.css('fontWeight') || '',
					fontStyle: a.css('fontStyle') || '',
					fontStretch: a.css('fontStretch') || '',
					fontVariant: a.css('fontVariant') || '',
					letterSpacing: a.css('letterSpacing') || '',
					wordSpacing: a.css('wordSpacing') || ''
				};
				s.attr('class', a.attr('class')).append(a.contents().clone()).append(h2);
				a.replaceWith(s);
				h1.css(fn);
				h2.css(fn).width(Math.min(h1.text("pW" + h2[0].value).width(), w))[0].select();
				$(document).one('mousedown.jstree touchstart.jstree dnd_start.vakata', function (e) {
					if (h2 && e.target !== h2) {
						$(h2).blur();
					}
				});
			},


			/**
			 * changes the theme
			 * @name set_theme(theme_name [, theme_url])
			 * @param {String} theme_name the name of the new theme to apply
			 * @param {mixed} theme_url  the location of the CSS file for this theme. Omit or set to `false` if you manually included the file. Set to `true` to autoload from the `core.themes.dir` directory.
			 * @trigger set_theme.jstree
			 */
			set_theme: function (theme_name, theme_url) {
				if (!theme_name) {
					return false;
				}
				if (theme_url === true) {
					var dir = this.settings.core.themes.dir;
					if (!dir) {
						dir = $.jstree.path + '/themes';
					}
					theme_url = dir + '/' + theme_name + '/style.css';
				}
				if (theme_url && $.inArray(theme_url, themes_loaded) === -1) {
					$('head').append('<' + 'link rel="stylesheet" href="' + theme_url + '" type="text/css" />');
					themes_loaded.push(theme_url);
				}
				if (this._data.core.themes.name) {
					this.element.removeClass('jstree-' + this._data.core.themes.name);
				}
				this._data.core.themes.name = theme_name;
				this.element.addClass('jstree-' + theme_name);
				this.element[this.settings.core.themes.responsive ? 'addClass' : 'removeClass']('jstree-' + theme_name + '-responsive');
				/**
				 * triggered when a theme is set
				 * @event
				 * @name set_theme.jstree
				 * @param {String} theme the new theme
				 */
				this.trigger('set_theme', {
					'theme': theme_name
				});
			},
			/**
			 * gets the name of the currently applied theme name
			 * @name get_theme()
			 * @return {String}
			 */
			get_theme: function () {
				return this._data.core.themes.name;
			},
			/**
			 * changes the theme variant (if the theme has variants)
			 * @name set_theme_variant(variant_name)
			 * @param {String|Boolean} variant_name the variant to apply (if `false` is used the current variant is removed)
			 */
			set_theme_variant: function (variant_name) {
				if (this._data.core.themes.variant) {
					this.element.removeClass('jstree-' + this._data.core.themes.name + '-' + this._data.core.themes.variant);
				}
				this._data.core.themes.variant = variant_name;
				if (variant_name) {
					this.element.addClass('jstree-' + this._data.core.themes.name + '-' + this._data.core.themes.variant);
				}
			},
			/**
			 * gets the name of the currently applied theme variant
			 * @name get_theme()
			 * @return {String}
			 */
			get_theme_variant: function () {
				return this._data.core.themes.variant;
			},
			/**
			 * shows a striped background on the container (if the theme supports it)
			 * @name show_stripes()
			 */
			show_stripes: function () {
				this._data.core.themes.stripes = true;
				this.get_container_ul().addClass("jstree-striped");
				/**
				 * triggered when stripes are shown
				 * @event
				 * @name show_stripes.jstree
				 */
				this.trigger('show_stripes');
			},
			/**
			 * hides the striped background on the container
			 * @name hide_stripes()
			 */
			hide_stripes: function () {
				this._data.core.themes.stripes = false;
				this.get_container_ul().removeClass("jstree-striped");
				/**
				 * triggered when stripes are hidden
				 * @event
				 * @name hide_stripes.jstree
				 */
				this.trigger('hide_stripes');
			},
			/**
			 * toggles the striped background on the container
			 * @name toggle_stripes()
			 */
			toggle_stripes: function () {
				if (this._data.core.themes.stripes) {
					this.hide_stripes();
				} else {
					this.show_stripes();
				}
			},
			/**
			 * shows the connecting dots (if the theme supports it)
			 * @name show_dots()
			 */
			show_dots: function () {
				this._data.core.themes.dots = true;
				this.get_container_ul().removeClass("jstree-no-dots");
				/**
				 * triggered when dots are shown
				 * @event
				 * @name show_dots.jstree
				 */
				this.trigger('show_dots');
			},
			/**
			 * hides the connecting dots
			 * @name hide_dots()
			 */
			hide_dots: function () {
				this._data.core.themes.dots = false;
				this.get_container_ul().addClass("jstree-no-dots");
				/**
				 * triggered when dots are hidden
				 * @event
				 * @name hide_dots.jstree
				 */
				this.trigger('hide_dots');
			},
			/**
			 * toggles the connecting dots
			 * @name toggle_dots()
			 */
			toggle_dots: function () {
				if (this._data.core.themes.dots) {
					this.hide_dots();
				} else {
					this.show_dots();
				}
			},
			/**
			 * show the node icons
			 * @name show_icons()
			 */
			show_icons: function () {
				this._data.core.themes.icons = true;
				this.get_container_ul().removeClass("jstree-no-icons");
				/**
				 * triggered when icons are shown
				 * @event
				 * @name show_icons.jstree
				 */
				this.trigger('show_icons');
			},
			/**
			 * hide the node icons
			 * @name hide_icons()
			 */
			hide_icons: function () {
				this._data.core.themes.icons = false;
				this.get_container_ul().addClass("jstree-no-icons");
				/**
				 * triggered when icons are hidden
				 * @event
				 * @name hide_icons.jstree
				 */
				this.trigger('hide_icons');
			},
			/**
			 * toggle the node icons
			 * @name toggle_icons()
			 */
			toggle_icons: function () {
				if (this._data.core.themes.icons) {
					this.hide_icons();
				} else {
					this.show_icons();
				}
			},
			/**
			 * show the node ellipsis
			 * @name show_icons()
			 */
			show_ellipsis: function () {
				this._data.core.themes.ellipsis = true;
				this.get_container_ul().addClass("jstree-ellipsis");
				/**
				 * triggered when ellisis is shown
				 * @event
				 * @name show_ellipsis.jstree
				 */
				this.trigger('show_ellipsis');
			},
			/**
			 * hide the node ellipsis
			 * @name hide_ellipsis()
			 */
			hide_ellipsis: function () {
				this._data.core.themes.ellipsis = false;
				this.get_container_ul().removeClass("jstree-ellipsis");
				/**
				 * triggered when ellisis is hidden
				 * @event
				 * @name hide_ellipsis.jstree
				 */
				this.trigger('hide_ellipsis');
			},
			/**
			 * toggle the node ellipsis
			 * @name toggle_icons()
			 */
			toggle_ellipsis: function () {
				if (this._data.core.themes.ellipsis) {
					this.hide_ellipsis();
				} else {
					this.show_ellipsis();
				}
			},
			/**
			 * set the node icon for a node
			 * @name set_icon(obj, icon)
			 * @param {mixed} obj
			 * @param {String} icon the new icon - can be a path to an icon or a className, if using an image that is in the current directory use a `./` prefix, otherwise it will be detected as a class
			 */
			set_icon: function (obj, icon) {
				var t1, t2, dom, old;
				if ($.isArray(obj)) {
					obj = obj.slice();
					for (t1 = 0, t2 = obj.length; t1 < t2; t1++) {
						this.set_icon(obj[t1], icon);
					}
					return true;
				}
				obj = this.get_node(obj);
				if (!obj || obj.id === $.jstree.root) {
					return false;
				}
				old = obj.icon;
				obj.icon = icon === true || icon === null || icon === undefined || icon === '' ? true : icon;
				dom = this.get_node(obj, true).children(".jstree-anchor").children(".jstree-themeicon");
				if (icon === false) {
					dom.removeClass('jstree-themeicon-custom ' + old).css("background", "").removeAttr("rel");
					this.hide_icon(obj);
				} else if (icon === true || icon === null || icon === undefined || icon === '') {
					dom.removeClass('jstree-themeicon-custom ' + old).css("background", "").removeAttr("rel");
					if (old === false) {
						this.show_icon(obj);
					}
				} else if (icon.indexOf("/") === -1 && icon.indexOf(".") === -1) {
					dom.removeClass(old).css("background", "");
					dom.addClass(icon + ' jstree-themeicon-custom').attr("rel", icon);
					if (old === false) {
						this.show_icon(obj);
					}
				} else {
					dom.removeClass(old).css("background", "");
					dom.addClass('jstree-themeicon-custom').css("background", "url('" + icon + "') center center no-repeat").attr("rel", icon);
					if (old === false) {
						this.show_icon(obj);
					}
				}
				return true;
			},
			/**
			 * get the node icon for a node
			 * @name get_icon(obj)
			 * @param {mixed} obj
			 * @return {String}
			 */
			get_icon: function (obj) {
				obj = this.get_node(obj);
				return (!obj || obj.id === $.jstree.root) ? false : obj.icon;
			},
			/**
			 * hide the icon on an individual node
			 * @name hide_icon(obj)
			 * @param {mixed} obj
			 */
			hide_icon: function (obj) {
				var t1, t2;
				if ($.isArray(obj)) {
					obj = obj.slice();
					for (t1 = 0, t2 = obj.length; t1 < t2; t1++) {
						this.hide_icon(obj[t1]);
					}
					return true;
				}
				obj = this.get_node(obj);
				if (!obj || obj === $.jstree.root) {
					return false;
				}
				obj.icon = false;
				this.get_node(obj, true).children(".jstree-anchor").children(".jstree-themeicon").addClass('jstree-themeicon-hidden');
				return true;
			},
			/**
			 * show the icon on an individual node
			 * @name show_icon(obj)
			 * @param {mixed} obj
			 */
			show_icon: function (obj) {
				var t1, t2, dom;
				if ($.isArray(obj)) {
					obj = obj.slice();
					for (t1 = 0, t2 = obj.length; t1 < t2; t1++) {
						this.show_icon(obj[t1]);
					}
					return true;
				}
				obj = this.get_node(obj);
				if (!obj || obj === $.jstree.root) {
					return false;
				}
				dom = this.get_node(obj, true);
				obj.icon = dom.length ? dom.children(".jstree-anchor").children(".jstree-themeicon").attr('rel') : true;
				if (!obj.icon) {
					obj.icon = true;
				}
				dom.children(".jstree-anchor").children(".jstree-themeicon").removeClass('jstree-themeicon-hidden');
				return true;
			}
		};

		// helpers
		$.vakata = {};
		// collect attributes
		$.vakata.attributes = function (node, with_values) {
			node = $(node)[0];
			var attr = with_values ? {} : [];
			if (node && node.attributes) {
				$.each(node.attributes, function (i, v) {
					if ($.inArray(v.name.toLowerCase(), ['style', 'contenteditable', 'hasfocus', 'tabindex']) !== -1) {
						return;
					}
					if (v.value !== null && $.trim(v.value) !== '') {
						if (with_values) {
							attr[v.name] = v.value;
						} else {
							attr.push(v.name);
						}
					}
				});
			}
			return attr;
		};
		$.vakata.array_unique = function (array) {
			var a = [],
				i, j, l, o = {};
			for (i = 0, l = array.length; i < l; i++) {
				if (o[array[i]] === undefined) {
					a.push(array[i]);
					o[array[i]] = true;
				}
			}
			return a;
		};
		// remove item from array
		$.vakata.array_remove = function (array, from) {
			array.splice(from, 1);
			return array;
			//var rest = array.slice((to || from) + 1 || array.length);
			//array.length = from < 0 ? array.length + from : from;
			//array.push.apply(array, rest);
			//return array;
		};
		// remove item from array
		$.vakata.array_remove_item = function (array, item) {
			var tmp = $.inArray(item, array);
			return tmp !== -1 ? $.vakata.array_remove(array, tmp) : array;
		};
		$.vakata.array_filter = function (c, a, b, d, e) {
			if (c.filter) {
				return c.filter(a, b);
			}
			d = [];
			for (e in c) {
				if (~~e + '' === e + '' && e >= 0 && a.call(b, c[e], +e, c)) {
					d.push(c[e]);
				}
			}
			return d;
		};


		/**
		 * ### Changed plugin
		 *
		 * This plugin adds more information to the `changed.jstree` event. The new data is contained in the `changed` event data property, and contains a lists of `selected` and `deselected` nodes.
		 */

		$.jstree.plugins.changed = function (options, parent) {
			var last = [];
			this.trigger = function (ev, data) {
				var i, j;
				if (!data) {
					data = {};
				}
				if (ev.replace('.jstree', '') === 'changed') {
					data.changed = {
						selected: [],
						deselected: []
					};
					var tmp = {};
					for (i = 0, j = last.length; i < j; i++) {
						tmp[last[i]] = 1;
					}
					for (i = 0, j = data.selected.length; i < j; i++) {
						if (!tmp[data.selected[i]]) {
							data.changed.selected.push(data.selected[i]);
						} else {
							tmp[data.selected[i]] = 2;
						}
					}
					for (i = 0, j = last.length; i < j; i++) {
						if (tmp[last[i]] === 1) {
							data.changed.deselected.push(last[i]);
						}
					}
					last = data.selected.slice();
				}
				/**
				 * triggered when selection changes (the "changed" plugin enhances the original event with more data)
				 * @event
				 * @name changed.jstree
				 * @param {Object} node
				 * @param {Object} action the action that caused the selection to change
				 * @param {Array} selected the current selection
				 * @param {Object} changed an object containing two properties `selected` and `deselected` - both arrays of node IDs, which were selected or deselected since the last changed event
				 * @param {Object} event the event (if any) that triggered this changed event
				 * @plugin changed
				 */
				parent.trigger.call(this, ev, data);
			};
			this.refresh = function (skip_loading, forget_state) {
				last = [];
				return parent.refresh.apply(this, arguments);
			};
		};

		/**
		 * ### Checkbox plugin
		 *
		 * This plugin renders checkbox icons in front of each node, making multiple selection much easier.
		 * It also supports tri-state behavior, meaning that if a node has a few of its children checked it will be rendered as undetermined, and state will be propagated up.
		 */

		var _i = document.createElement('I');
		_i.className = 'jstree-icon jstree-checkbox';
		_i.setAttribute('role', 'presentation');
		/**
		 * stores all defaults for the checkbox plugin
		 * @name $.jstree.defaults.checkbox
		 * @plugin checkbox
		 */
		$.jstree.defaults.checkbox = {
			/**
			 * a boolean indicating if checkboxes should be visible (can be changed at a later time using `show_checkboxes()` and `hide_checkboxes`). Defaults to `true`.
			 * @name $.jstree.defaults.checkbox.visible
			 * @plugin checkbox
			 */
			visible: true,
			/**
			 * a boolean indicating if checkboxes should cascade down and have an undetermined state. Defaults to `true`.
			 * @name $.jstree.defaults.checkbox.three_state
			 * @plugin checkbox
			 */
			three_state: true,
			/**
			 * a boolean indicating if clicking anywhere on the node should act as clicking on the checkbox. Defaults to `true`.
			 * @name $.jstree.defaults.checkbox.whole_node
			 * @plugin checkbox
			 */
			whole_node: true,
			/**
			 * a boolean indicating if the selected style of a node should be kept, or removed. Defaults to `true`.
			 * @name $.jstree.defaults.checkbox.keep_selected_style
			 * @plugin checkbox
			 */
			keep_selected_style: true,
			/**
			 * This setting controls how cascading and undetermined nodes are applied.
			 * If 'up' is in the string - cascading up is enabled, if 'down' is in the string - cascading down is enabled, if 'undetermined' is in the string - undetermined nodes will be used.
			 * If `three_state` is set to `true` this setting is automatically set to 'up+down+undetermined'. Defaults to ''.
			 * @name $.jstree.defaults.checkbox.cascade
			 * @plugin checkbox
			 */
			cascade: '',
			/**
			 * This setting controls if checkbox are bound to the general tree selection or to an internal array maintained by the checkbox plugin. Defaults to `true`, only set to `false` if you know exactly what you are doing.
			 * @name $.jstree.defaults.checkbox.tie_selection
			 * @plugin checkbox
			 */
			tie_selection: true,

			/**
			 * This setting controls if cascading down affects disabled checkboxes
			 * @name $.jstree.defaults.checkbox.cascade_to_disabled
			 * @plugin checkbox
			 */
			cascade_to_disabled: true,

			/**
			 * This setting controls if cascading down affects hidden checkboxes
			 * @name $.jstree.defaults.checkbox.cascade_to_hidden
			 * @plugin checkbox
			 */
			cascade_to_hidden: true
		};
		$.jstree.plugins.checkbox = function (options, parent) {
			this.bind = function () {
				parent.bind.call(this);
				this._data.checkbox.uto = false;
				this._data.checkbox.selected = [];
				if (this.settings.checkbox.three_state) {
					this.settings.checkbox.cascade = 'up+down+undetermined';
				}
				this.element
					.on("init.jstree", $.proxy(function () {
						this._data.checkbox.visible = this.settings.checkbox.visible;
						if (!this.settings.checkbox.keep_selected_style) {
							this.element.addClass('jstree-checkbox-no-clicked');
						}
						if (this.settings.checkbox.tie_selection) {
							this.element.addClass('jstree-checkbox-selection');
						}
					}, this))
					.on("loading.jstree", $.proxy(function () {
						this[this._data.checkbox.visible ? 'show_checkboxes' : 'hide_checkboxes']();
					}, this));
				if (this.settings.checkbox.cascade.indexOf('undetermined') !== -1) {
					this.element
						.on('changed.jstree uncheck_node.jstree check_node.jstree uncheck_all.jstree check_all.jstree move_node.jstree copy_node.jstree redraw.jstree open_node.jstree', $.proxy(function () {
							// only if undetermined is in setting
							if (this._data.checkbox.uto) {
								clearTimeout(this._data.checkbox.uto);
							}
							this._data.checkbox.uto = setTimeout($.proxy(this._undetermined, this), 50);
						}, this));
				}
				if (!this.settings.checkbox.tie_selection) {
					this.element
						.on('model.jstree', $.proxy(function (e, data) {
							var m = this._model.data,
								p = m[data.parent],
								dpc = data.nodes,
								i, j;
							for (i = 0, j = dpc.length; i < j; i++) {
								m[dpc[i]].state.checked = m[dpc[i]].state.checked || (m[dpc[i]].original && m[dpc[i]].original.state && m[dpc[i]].original.state.checked);
								if (m[dpc[i]].state.checked) {
									this._data.checkbox.selected.push(dpc[i]);
								}
							}
						}, this));
				}
				if (this.settings.checkbox.cascade.indexOf('up') !== -1 || this.settings.checkbox.cascade.indexOf('down') !== -1) {
					this.element
						.on('model.jstree', $.proxy(function (e, data) {
							var m = this._model.data,
								p = m[data.parent],
								dpc = data.nodes,
								chd = [],
								c, i, j, k, l, tmp, s = this.settings.checkbox.cascade,
								t = this.settings.checkbox.tie_selection;

							if (s.indexOf('down') !== -1) {
								// apply down
								if (p.state[t ? 'selected' : 'checked']) {
									for (i = 0, j = dpc.length; i < j; i++) {
										m[dpc[i]].state[t ? 'selected' : 'checked'] = true;
									}

									this._data[t ? 'core' : 'checkbox'].selected = this._data[t ? 'core' : 'checkbox'].selected.concat(dpc);
								} else {
									for (i = 0, j = dpc.length; i < j; i++) {
										if (m[dpc[i]].state[t ? 'selected' : 'checked']) {
											for (k = 0, l = m[dpc[i]].children_d.length; k < l; k++) {
												m[m[dpc[i]].children_d[k]].state[t ? 'selected' : 'checked'] = true;
											}
											this._data[t ? 'core' : 'checkbox'].selected = this._data[t ? 'core' : 'checkbox'].selected.concat(m[dpc[i]].children_d);
										}
									}
								}
							}

							if (s.indexOf('up') !== -1) {
								// apply up
								for (i = 0, j = p.children_d.length; i < j; i++) {
									if (!m[p.children_d[i]].children.length) {
										chd.push(m[p.children_d[i]].parent);
									}
								}
								chd = $.vakata.array_unique(chd);
								for (k = 0, l = chd.length; k < l; k++) {
									p = m[chd[k]];
									while (p && p.id !== $.jstree.root) {
										c = 0;
										for (i = 0, j = p.children.length; i < j; i++) {
											c += m[p.children[i]].state[t ? 'selected' : 'checked'];
										}
										if (c === j) {
											p.state[t ? 'selected' : 'checked'] = true;
											this._data[t ? 'core' : 'checkbox'].selected.push(p.id);
											tmp = this.get_node(p, true);
											if (tmp && tmp.length) {
												tmp.attr('aria-selected', true).children('.jstree-anchor').addClass(t ? 'jstree-clicked' : 'jstree-checked');
											}
										} else {
											break;
										}
										p = this.get_node(p.parent);
									}
								}
							}

							this._data[t ? 'core' : 'checkbox'].selected = $.vakata.array_unique(this._data[t ? 'core' : 'checkbox'].selected);
						}, this))
						.on(this.settings.checkbox.tie_selection ? 'select_node.jstree' : 'check_node.jstree', $.proxy(function (e, data) {
							var self = this,
								obj = data.node,
								m = this._model.data,
								par = this.get_node(obj.parent),
								i, j, c, tmp, s = this.settings.checkbox.cascade,
								t = this.settings.checkbox.tie_selection,
								sel = {},
								cur = this._data[t ? 'core' : 'checkbox'].selected;

							for (i = 0, j = cur.length; i < j; i++) {
								sel[cur[i]] = true;
							}

							// apply down
							if (s.indexOf('down') !== -1) {
								//this._data[ t ? 'core' : 'checkbox' ].selected = $.vakata.array_unique(this._data[ t ? 'core' : 'checkbox' ].selected.concat(obj.children_d));
								var selectedIds = this._cascade_new_checked_state(obj.id, true);
								var temp = obj.children_d.concat(obj.id);
								for (i = 0, j = temp.length; i < j; i++) {
									if (selectedIds.indexOf(temp[i]) > -1) {
										sel[temp[i]] = true;
									} else {
										delete sel[temp[i]];
									}
								}
							}

							// apply up
							if (s.indexOf('up') !== -1) {
								while (par && par.id !== $.jstree.root) {
									c = 0;
									for (i = 0, j = par.children.length; i < j; i++) {
										c += m[par.children[i]].state[t ? 'selected' : 'checked'];
									}
									if (c === j) {
										par.state[t ? 'selected' : 'checked'] = true;
										sel[par.id] = true;
										//this._data[ t ? 'core' : 'checkbox' ].selected.push(par.id);
										tmp = this.get_node(par, true);
										if (tmp && tmp.length) {
											tmp.attr('aria-selected', true).children('.jstree-anchor').addClass(t ? 'jstree-clicked' : 'jstree-checked');
										}
									} else {
										break;
									}
									par = this.get_node(par.parent);
								}
							}

							cur = [];
							for (i in sel) {
								if (sel.hasOwnProperty(i)) {
									cur.push(i);
								}
							}
							this._data[t ? 'core' : 'checkbox'].selected = cur;
						}, this))
						.on(this.settings.checkbox.tie_selection ? 'deselect_all.jstree' : 'uncheck_all.jstree', $.proxy(function (e, data) {
							var obj = this.get_node($.jstree.root),
								m = this._model.data,
								i, j, tmp;
							for (i = 0, j = obj.children_d.length; i < j; i++) {
								tmp = m[obj.children_d[i]];
								if (tmp && tmp.original && tmp.original.state && tmp.original.state.undetermined) {
									tmp.original.state.undetermined = false;
								}
							}
						}, this))
						.on(this.settings.checkbox.tie_selection ? 'deselect_node.jstree' : 'uncheck_node.jstree', $.proxy(function (e, data) {
							var self = this,
								obj = data.node,
								dom = this.get_node(obj, true),
								i, j, tmp, s = this.settings.checkbox.cascade,
								t = this.settings.checkbox.tie_selection,
								cur = this._data[t ? 'core' : 'checkbox'].selected,
								sel = {},
								stillSelectedIds = [],
								allIds = obj.children_d.concat(obj.id);

							// apply down
							if (s.indexOf('down') !== -1) {
								var selectedIds = this._cascade_new_checked_state(obj.id, false);

								cur = cur.filter(function (id) {
									return allIds.indexOf(id) === -1 || selectedIds.indexOf(id) > -1;
								});
							}

							// only apply up if cascade up is enabled and if this node is not selected
							// (if all child nodes are disabled and cascade_to_disabled === false then this node will till be selected).
							if (s.indexOf('up') !== -1 && cur.indexOf(obj.id) === -1) {
								for (i = 0, j = obj.parents.length; i < j; i++) {
									tmp = this._model.data[obj.parents[i]];
									tmp.state[t ? 'selected' : 'checked'] = false;
									if (tmp && tmp.original && tmp.original.state && tmp.original.state.undetermined) {
										tmp.original.state.undetermined = false;
									}
									tmp = this.get_node(obj.parents[i], true);
									if (tmp && tmp.length) {
										tmp.attr('aria-selected', false).children('.jstree-anchor').removeClass(t ? 'jstree-clicked' : 'jstree-checked');
									}
								}

								cur = cur.filter(function (id) {
									return obj.parents.indexOf(id) === -1;
								});
							}

							this._data[t ? 'core' : 'checkbox'].selected = cur;
						}, this));
				}
				if (this.settings.checkbox.cascade.indexOf('up') !== -1) {
					this.element
						.on('delete_node.jstree', $.proxy(function (e, data) {
							// apply up (whole handler)
							var p = this.get_node(data.parent),
								m = this._model.data,
								i, j, c, tmp, t = this.settings.checkbox.tie_selection;
							while (p && p.id !== $.jstree.root && !p.state[t ? 'selected' : 'checked']) {
								c = 0;
								for (i = 0, j = p.children.length; i < j; i++) {
									c += m[p.children[i]].state[t ? 'selected' : 'checked'];
								}
								if (j > 0 && c === j) {
									p.state[t ? 'selected' : 'checked'] = true;
									this._data[t ? 'core' : 'checkbox'].selected.push(p.id);
									tmp = this.get_node(p, true);
									if (tmp && tmp.length) {
										tmp.attr('aria-selected', true).children('.jstree-anchor').addClass(t ? 'jstree-clicked' : 'jstree-checked');
									}
								} else {
									break;
								}
								p = this.get_node(p.parent);
							}
						}, this))
						.on('move_node.jstree', $.proxy(function (e, data) {
							// apply up (whole handler)
							var is_multi = data.is_multi,
								old_par = data.old_parent,
								new_par = this.get_node(data.parent),
								m = this._model.data,
								p, c, i, j, tmp, t = this.settings.checkbox.tie_selection;
							if (!is_multi) {
								p = this.get_node(old_par);
								while (p && p.id !== $.jstree.root && !p.state[t ? 'selected' : 'checked']) {
									c = 0;
									for (i = 0, j = p.children.length; i < j; i++) {
										c += m[p.children[i]].state[t ? 'selected' : 'checked'];
									}
									if (j > 0 && c === j) {
										p.state[t ? 'selected' : 'checked'] = true;
										this._data[t ? 'core' : 'checkbox'].selected.push(p.id);
										tmp = this.get_node(p, true);
										if (tmp && tmp.length) {
											tmp.attr('aria-selected', true).children('.jstree-anchor').addClass(t ? 'jstree-clicked' : 'jstree-checked');
										}
									} else {
										break;
									}
									p = this.get_node(p.parent);
								}
							}
							p = new_par;
							while (p && p.id !== $.jstree.root) {
								c = 0;
								for (i = 0, j = p.children.length; i < j; i++) {
									c += m[p.children[i]].state[t ? 'selected' : 'checked'];
								}
								if (c === j) {
									if (!p.state[t ? 'selected' : 'checked']) {
										p.state[t ? 'selected' : 'checked'] = true;
										this._data[t ? 'core' : 'checkbox'].selected.push(p.id);
										tmp = this.get_node(p, true);
										if (tmp && tmp.length) {
											tmp.attr('aria-selected', true).children('.jstree-anchor').addClass(t ? 'jstree-clicked' : 'jstree-checked');
										}
									}
								} else {
									if (p.state[t ? 'selected' : 'checked']) {
										p.state[t ? 'selected' : 'checked'] = false;
										this._data[t ? 'core' : 'checkbox'].selected = $.vakata.array_remove_item(this._data[t ? 'core' : 'checkbox'].selected, p.id);
										tmp = this.get_node(p, true);
										if (tmp && tmp.length) {
											tmp.attr('aria-selected', false).children('.jstree-anchor').removeClass(t ? 'jstree-clicked' : 'jstree-checked');
										}
									} else {
										break;
									}
								}
								p = this.get_node(p.parent);
							}
						}, this));
				}
			};
			/**
			 * get an array of all nodes whose state is "undetermined"
			 * @name get_undetermined([full])
			 * @param  {boolean} full: if set to `true` the returned array will consist of the full node objects, otherwise - only IDs will be returned
			 * @return {Array}
			 * @plugin checkbox
			 */
			this.get_undetermined = function (full) {
				if (this.settings.checkbox.cascade.indexOf('undetermined') === -1) {
					return [];
				}
				var i, j, k, l, o = {},
					m = this._model.data,
					t = this.settings.checkbox.tie_selection,
					s = this._data[t ? 'core' : 'checkbox'].selected,
					p = [],
					tt = this,
					r = [];
				for (i = 0, j = s.length; i < j; i++) {
					if (m[s[i]] && m[s[i]].parents) {
						for (k = 0, l = m[s[i]].parents.length; k < l; k++) {
							if (o[m[s[i]].parents[k]] !== undefined) {
								break;
							}
							if (m[s[i]].parents[k] !== $.jstree.root) {
								o[m[s[i]].parents[k]] = true;
								p.push(m[s[i]].parents[k]);
							}
						}
					}
				}
				// attempt for server side undetermined state
				this.element.find('.jstree-closed').not(':has(.jstree-children)')
					.each(function () {
						var tmp = tt.get_node(this),
							tmp2;

						if (!tmp) {
							return;
						}

						if (!tmp.state.loaded) {
							if (tmp.original && tmp.original.state && tmp.original.state.undetermined && tmp.original.state.undetermined === true) {
								if (o[tmp.id] === undefined && tmp.id !== $.jstree.root) {
									o[tmp.id] = true;
									p.push(tmp.id);
								}
								for (k = 0, l = tmp.parents.length; k < l; k++) {
									if (o[tmp.parents[k]] === undefined && tmp.parents[k] !== $.jstree.root) {
										o[tmp.parents[k]] = true;
										p.push(tmp.parents[k]);
									}
								}
							}
						} else {
							for (i = 0, j = tmp.children_d.length; i < j; i++) {
								tmp2 = m[tmp.children_d[i]];
								if (!tmp2.state.loaded && tmp2.original && tmp2.original.state && tmp2.original.state.undetermined && tmp2.original.state.undetermined === true) {
									if (o[tmp2.id] === undefined && tmp2.id !== $.jstree.root) {
										o[tmp2.id] = true;
										p.push(tmp2.id);
									}
									for (k = 0, l = tmp2.parents.length; k < l; k++) {
										if (o[tmp2.parents[k]] === undefined && tmp2.parents[k] !== $.jstree.root) {
											o[tmp2.parents[k]] = true;
											p.push(tmp2.parents[k]);
										}
									}
								}
							}
						}
					});
				for (i = 0, j = p.length; i < j; i++) {
					if (!m[p[i]].state[t ? 'selected' : 'checked']) {
						r.push(full ? m[p[i]] : p[i]);
					}
				}
				return r;
			};
			/**
			 * set the undetermined state where and if necessary. Used internally.
			 * @private
			 * @name _undetermined()
			 * @plugin checkbox
			 */
			this._undetermined = function () {
				if (this.element === null) {
					return;
				}
				var p = this.get_undetermined(false),
					i, j, s;

				this.element.find('.jstree-undetermined').removeClass('jstree-undetermined');
				for (i = 0, j = p.length; i < j; i++) {
					s = this.get_node(p[i], true);
					if (s && s.length) {
						s.children('.jstree-anchor').children('.jstree-checkbox').addClass('jstree-undetermined');
					}
				}
			};
			this.redraw_node = function (obj, deep, is_callback, force_render) {
				obj = parent.redraw_node.apply(this, arguments);
				if (obj) {
					var i, j, tmp = null,
						icon = null;
					for (i = 0, j = obj.childNodes.length; i < j; i++) {
						if (obj.childNodes[i] && obj.childNodes[i].className && obj.childNodes[i].className.indexOf("jstree-anchor") !== -1) {
							tmp = obj.childNodes[i];
							break;
						}
					}
					if (tmp) {
						if (!this.settings.checkbox.tie_selection && this._model.data[obj.id].state.checked) {
							tmp.className += ' jstree-checked';
						}
						icon = _i.cloneNode(false);
						if (this._model.data[obj.id].state.checkbox_disabled) {
							icon.className += ' jstree-checkbox-disabled';
						}
						tmp.insertBefore(icon, tmp.childNodes[0]);
					}
				}
				if (!is_callback && this.settings.checkbox.cascade.indexOf('undetermined') !== -1) {
					if (this._data.checkbox.uto) {
						clearTimeout(this._data.checkbox.uto);
					}
					this._data.checkbox.uto = setTimeout($.proxy(this._undetermined, this), 50);
				}
				return obj;
			};
			/**
			 * show the node checkbox icons
			 * @name show_checkboxes()
			 * @plugin checkbox
			 */
			this.show_checkboxes = function () {
				this._data.core.themes.checkboxes = true;
				this.get_container_ul().removeClass("jstree-no-checkboxes");
			};
			/**
			 * hide the node checkbox icons
			 * @name hide_checkboxes()
			 * @plugin checkbox
			 */
			this.hide_checkboxes = function () {
				this._data.core.themes.checkboxes = false;
				this.get_container_ul().addClass("jstree-no-checkboxes");
			};
			/**
			 * toggle the node icons
			 * @name toggle_checkboxes()
			 * @plugin checkbox
			 */
			this.toggle_checkboxes = function () {
				if (this._data.core.themes.checkboxes) {
					this.hide_checkboxes();
				} else {
					this.show_checkboxes();
				}
			};
			/**
			 * checks if a node is in an undetermined state
			 * @name is_undetermined(obj)
			 * @param  {mixed} obj
			 * @return {Boolean}
			 */
			this.is_undetermined = function (obj) {
				obj = this.get_node(obj);
				var s = this.settings.checkbox.cascade,
					i, j, t = this.settings.checkbox.tie_selection,
					d = this._data[t ? 'core' : 'checkbox'].selected,
					m = this._model.data;
				if (!obj || obj.state[t ? 'selected' : 'checked'] === true || s.indexOf('undetermined') === -1 || (s.indexOf('down') === -1 && s.indexOf('up') === -1)) {
					return false;
				}
				if (!obj.state.loaded && obj.original.state.undetermined === true) {
					return true;
				}
				for (i = 0, j = obj.children_d.length; i < j; i++) {
					if ($.inArray(obj.children_d[i], d) !== -1 || (!m[obj.children_d[i]].state.loaded && m[obj.children_d[i]].original.state.undetermined)) {
						return true;
					}
				}
				return false;
			};
			/**
			 * disable a node's checkbox
			 * @name disable_checkbox(obj)
			 * @param {mixed} obj an array can be used too
			 * @trigger disable_checkbox.jstree
			 * @plugin checkbox
			 */
			this.disable_checkbox = function (obj) {
				var t1, t2, dom;
				if ($.isArray(obj)) {
					obj = obj.slice();
					for (t1 = 0, t2 = obj.length; t1 < t2; t1++) {
						this.disable_checkbox(obj[t1]);
					}
					return true;
				}
				obj = this.get_node(obj);
				if (!obj || obj.id === $.jstree.root) {
					return false;
				}
				dom = this.get_node(obj, true);
				if (!obj.state.checkbox_disabled) {
					obj.state.checkbox_disabled = true;
					if (dom && dom.length) {
						dom.children('.jstree-anchor').children('.jstree-checkbox').addClass('jstree-checkbox-disabled');
					}
					/**
					 * triggered when an node's checkbox is disabled
					 * @event
					 * @name disable_checkbox.jstree
					 * @param {Object} node
					 * @plugin checkbox
					 */
					this.trigger('disable_checkbox', {
						'node': obj
					});
				}
			};
			/**
			 * enable a node's checkbox
			 * @name disable_checkbox(obj)
			 * @param {mixed} obj an array can be used too
			 * @trigger enable_checkbox.jstree
			 * @plugin checkbox
			 */
			this.enable_checkbox = function (obj) {
				var t1, t2, dom;
				if ($.isArray(obj)) {
					obj = obj.slice();
					for (t1 = 0, t2 = obj.length; t1 < t2; t1++) {
						this.enable_checkbox(obj[t1]);
					}
					return true;
				}
				obj = this.get_node(obj);
				if (!obj || obj.id === $.jstree.root) {
					return false;
				}
				dom = this.get_node(obj, true);
				if (obj.state.checkbox_disabled) {
					obj.state.checkbox_disabled = false;
					if (dom && dom.length) {
						dom.children('.jstree-anchor').children('.jstree-checkbox').removeClass('jstree-checkbox-disabled');
					}
					/**
					 * triggered when an node's checkbox is enabled
					 * @event
					 * @name enable_checkbox.jstree
					 * @param {Object} node
					 * @plugin checkbox
					 */
					this.trigger('enable_checkbox', {
						'node': obj
					});
				}
			};

			this.activate_node = function (obj, e) {
				if ($(e.target).hasClass('jstree-checkbox-disabled')) {
					return false;
				}
				if (this.settings.checkbox.tie_selection && (this.settings.checkbox.whole_node || $(e.target).hasClass('jstree-checkbox'))) {
					e.ctrlKey = true;
				}
				if (this.settings.checkbox.tie_selection || (!this.settings.checkbox.whole_node && !$(e.target).hasClass('jstree-checkbox'))) {
					return parent.activate_node.call(this, obj, e);
				}
				if (this.is_disabled(obj)) {
					return false;
				}
				if (this.is_checked(obj)) {
					this.uncheck_node(obj, e);
				} else {
					this.check_node(obj, e);
				}
				this.trigger('activate_node', {
					'node': this.get_node(obj)
				});
			};

			/**
			 * Cascades checked state to a node and all its descendants. This function does NOT affect hidden and disabled nodes (or their descendants).
			 * However if these unaffected nodes are already selected their ids will be included in the returned array.
			 * @private
			 * @param {string} id the node ID
			 * @param {bool} checkedState should the nodes be checked or not
			 * @returns {Array} Array of all node id's (in this tree branch) that are checked.
			 */
			this._cascade_new_checked_state = function (id, checkedState) {
				var self = this;
				var t = this.settings.checkbox.tie_selection;
				var node = this._model.data[id];
				var selectedNodeIds = [];
				var selectedChildrenIds = [],
					i, j, selectedChildIds;

				if (
					(this.settings.checkbox.cascade_to_disabled || !node.state.disabled) &&
					(this.settings.checkbox.cascade_to_hidden || !node.state.hidden)
				) {
					//First try and check/uncheck the children
					if (node.children) {
						for (i = 0, j = node.children.length; i < j; i++) {
							var childId = node.children[i];
							selectedChildIds = self._cascade_new_checked_state(childId, checkedState);
							selectedNodeIds = selectedNodeIds.concat(selectedChildIds);
							if (selectedChildIds.indexOf(childId) > -1) {
								selectedChildrenIds.push(childId);
							}
						}
					}

					var dom = self.get_node(node, true);

					//A node's state is undetermined if some but not all of it's children are checked/selected .
					var undetermined = selectedChildrenIds.length > 0 && selectedChildrenIds.length < node.children.length;

					if (node.original && node.original.state && node.original.state.undetermined) {
						node.original.state.undetermined = undetermined;
					}

					//If a node is undetermined then remove selected class
					if (undetermined) {
						node.state[t ? 'selected' : 'checked'] = false;
						dom.attr('aria-selected', false).children('.jstree-anchor').removeClass(t ? 'jstree-clicked' : 'jstree-checked');
					}
					//Otherwise, if the checkedState === true (i.e. the node is being checked now) and all of the node's children are checked (if it has any children),
					//check the node and style it correctly.
					else if (checkedState && selectedChildrenIds.length === node.children.length) {
						node.state[t ? 'selected' : 'checked'] = checkedState;
						selectedNodeIds.push(node.id);

						dom.attr('aria-selected', true).children('.jstree-anchor').addClass(t ? 'jstree-clicked' : 'jstree-checked');
					} else {
						node.state[t ? 'selected' : 'checked'] = false;
						dom.attr('aria-selected', false).children('.jstree-anchor').removeClass(t ? 'jstree-clicked' : 'jstree-checked');
					}
				} else {
					selectedChildIds = this.get_checked_descendants(id);

					if (node.state[t ? 'selected' : 'checked']) {
						selectedChildIds.push(node.id);
					}

					selectedNodeIds = selectedNodeIds.concat(selectedChildIds);
				}

				return selectedNodeIds;
			};

			/**
			 * Gets ids of nodes selected in branch (of tree) specified by id (does not include the node specified by id)
			 * @name get_checked_descendants(obj)
			 * @param {string} id the node ID
			 * @return {Array} array of IDs
			 * @plugin checkbox
			 */
			this.get_checked_descendants = function (id) {
				var self = this;
				var t = self.settings.checkbox.tie_selection;
				var node = self._model.data[id];

				return node.children_d.filter(function (_id) {
					return self._model.data[_id].state[t ? 'selected' : 'checked'];
				});
			};

			/**
			 * check a node (only if tie_selection in checkbox settings is false, otherwise select_node will be called internally)
			 * @name check_node(obj)
			 * @param {mixed} obj an array can be used to check multiple nodes
			 * @trigger check_node.jstree
			 * @plugin checkbox
			 */
			this.check_node = function (obj, e) {
				if (this.settings.checkbox.tie_selection) {
					return this.select_node(obj, false, true, e);
				}
				var dom, t1, t2, th;
				if ($.isArray(obj)) {
					obj = obj.slice();
					for (t1 = 0, t2 = obj.length; t1 < t2; t1++) {
						this.check_node(obj[t1], e);
					}
					return true;
				}
				obj = this.get_node(obj);
				if (!obj || obj.id === $.jstree.root) {
					return false;
				}
				dom = this.get_node(obj, true);
				if (!obj.state.checked) {
					obj.state.checked = true;
					this._data.checkbox.selected.push(obj.id);
					if (dom && dom.length) {
						dom.children('.jstree-anchor').addClass('jstree-checked');
					}
					/**
					 * triggered when an node is checked (only if tie_selection in checkbox settings is false)
					 * @event
					 * @name check_node.jstree
					 * @param {Object} node
					 * @param {Array} selected the current selection
					 * @param {Object} event the event (if any) that triggered this check_node
					 * @plugin checkbox
					 */
					this.trigger('check_node', {
						'node': obj,
						'selected': this._data.checkbox.selected,
						'event': e
					});
				}
			};
			/**
			 * uncheck a node (only if tie_selection in checkbox settings is false, otherwise deselect_node will be called internally)
			 * @name uncheck_node(obj)
			 * @param {mixed} obj an array can be used to uncheck multiple nodes
			 * @trigger uncheck_node.jstree
			 * @plugin checkbox
			 */
			this.uncheck_node = function (obj, e) {
				if (this.settings.checkbox.tie_selection) {
					return this.deselect_node(obj, false, e);
				}
				var t1, t2, dom;
				if ($.isArray(obj)) {
					obj = obj.slice();
					for (t1 = 0, t2 = obj.length; t1 < t2; t1++) {
						this.uncheck_node(obj[t1], e);
					}
					return true;
				}
				obj = this.get_node(obj);
				if (!obj || obj.id === $.jstree.root) {
					return false;
				}
				dom = this.get_node(obj, true);
				if (obj.state.checked) {
					obj.state.checked = false;
					this._data.checkbox.selected = $.vakata.array_remove_item(this._data.checkbox.selected, obj.id);
					if (dom.length) {
						dom.children('.jstree-anchor').removeClass('jstree-checked');
					}
					/**
					 * triggered when an node is unchecked (only if tie_selection in checkbox settings is false)
					 * @event
					 * @name uncheck_node.jstree
					 * @param {Object} node
					 * @param {Array} selected the current selection
					 * @param {Object} event the event (if any) that triggered this uncheck_node
					 * @plugin checkbox
					 */
					this.trigger('uncheck_node', {
						'node': obj,
						'selected': this._data.checkbox.selected,
						'event': e
					});
				}
			};

			/**
			 * checks all nodes in the tree (only if tie_selection in checkbox settings is false, otherwise select_all will be called internally)
			 * @name check_all()
			 * @trigger check_all.jstree, changed.jstree
			 * @plugin checkbox
			 */
			this.check_all = function () {
				if (this.settings.checkbox.tie_selection) {
					return this.select_all();
				}
				var tmp = this._data.checkbox.selected.concat([]),
					i, j;
				this._data.checkbox.selected = this._model.data[$.jstree.root].children_d.concat();
				for (i = 0, j = this._data.checkbox.selected.length; i < j; i++) {
					if (this._model.data[this._data.checkbox.selected[i]]) {
						this._model.data[this._data.checkbox.selected[i]].state.checked = true;
					}
				}
				this.redraw(true);
				/**
				 * triggered when all nodes are checked (only if tie_selection in checkbox settings is false)
				 * @event
				 * @name check_all.jstree
				 * @param {Array} selected the current selection
				 * @plugin checkbox
				 */
				this.trigger('check_all', {
					'selected': this._data.checkbox.selected
				});
			};
			/**
			 * uncheck all checked nodes (only if tie_selection in checkbox settings is false, otherwise deselect_all will be called internally)
			 * @name uncheck_all()
			 * @trigger uncheck_all.jstree
			 * @plugin checkbox
			 */
			this.uncheck_all = function () {
				if (this.settings.checkbox.tie_selection) {
					return this.deselect_all();
				}
				var tmp = this._data.checkbox.selected.concat([]),
					i, j;
				for (i = 0, j = this._data.checkbox.selected.length; i < j; i++) {
					if (this._model.data[this._data.checkbox.selected[i]]) {
						this._model.data[this._data.checkbox.selected[i]].state.checked = false;
					}
				}
				this._data.checkbox.selected = [];
				this.element.find('.jstree-checked').removeClass('jstree-checked');
				/**
				 * triggered when all nodes are unchecked (only if tie_selection in checkbox settings is false)
				 * @event
				 * @name uncheck_all.jstree
				 * @param {Object} node the previous selection
				 * @param {Array} selected the current selection
				 * @plugin checkbox
				 */
				this.trigger('uncheck_all', {
					'selected': this._data.checkbox.selected,
					'node': tmp
				});
			};
			/**
			 * checks if a node is checked (if tie_selection is on in the settings this function will return the same as is_selected)
			 * @name is_checked(obj)
			 * @param  {mixed}  obj
			 * @return {Boolean}
			 * @plugin checkbox
			 */
			this.is_checked = function (obj) {
				if (this.settings.checkbox.tie_selection) {
					return this.is_selected(obj);
				}
				obj = this.get_node(obj);
				if (!obj || obj.id === $.jstree.root) {
					return false;
				}
				return obj.state.checked;
			};
			/**
			 * get an array of all checked nodes (if tie_selection is on in the settings this function will return the same as get_selected)
			 * @name get_checked([full])
			 * @param  {mixed}  full if set to `true` the returned array will consist of the full node objects, otherwise - only IDs will be returned
			 * @return {Array}
			 * @plugin checkbox
			 */
			this.get_checked = function (full) {
				if (this.settings.checkbox.tie_selection) {
					return this.get_selected(full);
				}
				return full ? $.map(this._data.checkbox.selected, $.proxy(function (i) {
					return this.get_node(i);
				}, this)) : this._data.checkbox.selected;
			};
			/**
			 * get an array of all top level checked nodes (ignoring children of checked nodes) (if tie_selection is on in the settings this function will return the same as get_top_selected)
			 * @name get_top_checked([full])
			 * @param  {mixed}  full if set to `true` the returned array will consist of the full node objects, otherwise - only IDs will be returned
			 * @return {Array}
			 * @plugin checkbox
			 */
			this.get_top_checked = function (full) {
				if (this.settings.checkbox.tie_selection) {
					return this.get_top_selected(full);
				}
				var tmp = this.get_checked(true),
					obj = {},
					i, j, k, l;
				for (i = 0, j = tmp.length; i < j; i++) {
					obj[tmp[i].id] = tmp[i];
				}
				for (i = 0, j = tmp.length; i < j; i++) {
					for (k = 0, l = tmp[i].children_d.length; k < l; k++) {
						if (obj[tmp[i].children_d[k]]) {
							delete obj[tmp[i].children_d[k]];
						}
					}
				}
				tmp = [];
				for (i in obj) {
					if (obj.hasOwnProperty(i)) {
						tmp.push(i);
					}
				}
				return full ? $.map(tmp, $.proxy(function (i) {
					return this.get_node(i);
				}, this)) : tmp;
			};
			/**
			 * get an array of all bottom level checked nodes (ignoring selected parents) (if tie_selection is on in the settings this function will return the same as get_bottom_selected)
			 * @name get_bottom_checked([full])
			 * @param  {mixed}  full if set to `true` the returned array will consist of the full node objects, otherwise - only IDs will be returned
			 * @return {Array}
			 * @plugin checkbox
			 */
			this.get_bottom_checked = function (full) {
				if (this.settings.checkbox.tie_selection) {
					return this.get_bottom_selected(full);
				}
				var tmp = this.get_checked(true),
					obj = [],
					i, j;
				for (i = 0, j = tmp.length; i < j; i++) {
					if (!tmp[i].children.length) {
						obj.push(tmp[i].id);
					}
				}
				return full ? $.map(obj, $.proxy(function (i) {
					return this.get_node(i);
				}, this)) : obj;
			};
			this.load_node = function (obj, callback) {
				var k, l, i, j, c, tmp;
				if (!$.isArray(obj) && !this.settings.checkbox.tie_selection) {
					tmp = this.get_node(obj);
					if (tmp && tmp.state.loaded) {
						for (k = 0, l = tmp.children_d.length; k < l; k++) {
							if (this._model.data[tmp.children_d[k]].state.checked) {
								c = true;
								this._data.checkbox.selected = $.vakata.array_remove_item(this._data.checkbox.selected, tmp.children_d[k]);
							}
						}
					}
				}
				return parent.load_node.apply(this, arguments);
			};
			this.get_state = function () {
				var state = parent.get_state.apply(this, arguments);
				if (this.settings.checkbox.tie_selection) {
					return state;
				}
				state.checkbox = this._data.checkbox.selected.slice();
				return state;
			};
			this.set_state = function (state, callback) {
				var res = parent.set_state.apply(this, arguments);
				if (res && state.checkbox) {
					if (!this.settings.checkbox.tie_selection) {
						this.uncheck_all();
						var _this = this;
						$.each(state.checkbox, function (i, v) {
							_this.check_node(v);
						});
					}
					delete state.checkbox;
					this.set_state(state, callback);
					return false;
				}
				return res;
			};
			this.refresh = function (skip_loading, forget_state) {
				if (!this.settings.checkbox.tie_selection) {
					this._data.checkbox.selected = [];
				}
				return parent.refresh.apply(this, arguments);
			};
		};

		// include the checkbox plugin by default
		// $.jstree.defaults.plugins.push("checkbox");


		/**
		 * ### Conditionalselect plugin
		 *
		 * This plugin allows defining a callback to allow or deny node selection by user input (activate node method).
		 */

		/**
		 * a callback (function) which is invoked in the instance's scope and receives two arguments - the node and the event that triggered the `activate_node` call. Returning false prevents working with the node, returning true allows invoking activate_node. Defaults to returning `true`.
		 * @name $.jstree.defaults.checkbox.visible
		 * @plugin checkbox
		 */
		$.jstree.defaults.conditionalselect = function () {
			return true;
		};
		$.jstree.plugins.conditionalselect = function (options, parent) {
			// own function
			this.activate_node = function (obj, e) {
				if (this.settings.conditionalselect.call(this, this.get_node(obj), e)) {
					return parent.activate_node.call(this, obj, e);
				}
			};
		};


		/**
		 * ### Contextmenu plugin
		 *
		 * Shows a context menu when a node is right-clicked.
		 */

		/**
		 * stores all defaults for the contextmenu plugin
		 * @name $.jstree.defaults.contextmenu
		 * @plugin contextmenu
		 */
		$.jstree.defaults.contextmenu = {
			/**
			 * a boolean indicating if the node should be selected when the context menu is invoked on it. Defaults to `true`.
			 * @name $.jstree.defaults.contextmenu.select_node
			 * @plugin contextmenu
			 */
			select_node: true,
			/**
			 * a boolean indicating if the menu should be shown aligned with the node. Defaults to `true`, otherwise the mouse coordinates are used.
			 * @name $.jstree.defaults.contextmenu.show_at_node
			 * @plugin contextmenu
			 */
			show_at_node: true,
			/**
			 * an object of actions, or a function that accepts a node and a callback function and calls the callback function with an object of actions available for that node (you can also return the items too).
			 *
			 * Each action consists of a key (a unique name) and a value which is an object with the following properties (only label and action are required). Once a menu item is activated the `action` function will be invoked with an object containing the following keys: item - the contextmenu item definition as seen below, reference - the DOM node that was used (the tree node), element - the contextmenu DOM element, position - an object with x/y properties indicating the position of the menu.
			 *
			 * * `separator_before` - a boolean indicating if there should be a separator before this item
			 * * `separator_after` - a boolean indicating if there should be a separator after this item
			 * * `_disabled` - a boolean indicating if this action should be disabled
			 * * `label` - a string - the name of the action (could be a function returning a string)
			 * * `title` - a string - an optional tooltip for the item
			 * * `action` - a function to be executed if this item is chosen, the function will receive 
			 * * `icon` - a string, can be a path to an icon or a className, if using an image that is in the current directory use a `./` prefix, otherwise it will be detected as a class
			 * * `shortcut` - keyCode which will trigger the action if the menu is open (for example `113` for rename, which equals F2)
			 * * `shortcut_label` - shortcut label (like for example `F2` for rename)
			 * * `submenu` - an object with the same structure as $.jstree.defaults.contextmenu.items which can be used to create a submenu - each key will be rendered as a separate option in a submenu that will appear once the current item is hovered
			 *
			 * @name $.jstree.defaults.contextmenu.items
			 * @plugin contextmenu
			 */
			items: function (o, cb) { // Could be an object directly
				return {
					"create": {
						"separator_before": false,
						"separator_after": true,
						"_disabled": false, //(this.check("create_node", data.reference, {}, "last")),
						"label": "Create",
						"action": function (data) {
							var inst = $.jstree.reference(data.reference),
								obj = inst.get_node(data.reference);
							inst.create_node(obj, {}, "last", function (new_node) {
								try {
									inst.edit(new_node);
								} catch (ex) {
									setTimeout(function () {
										inst.edit(new_node);
									}, 0);
								}
							});
						}
					},
					"rename": {
						"separator_before": false,
						"separator_after": false,
						"_disabled": false, //(this.check("rename_node", data.reference, this.get_parent(data.reference), "")),
						"label": "Rename",
						/*!
						"shortcut"			: 113,
						"shortcut_label"	: 'F2',
						"icon"				: "glyphicon glyphicon-leaf",
						*/
						"action": function (data) {
							var inst = $.jstree.reference(data.reference),
								obj = inst.get_node(data.reference);
							inst.edit(obj);
						}
					},
					"remove": {
						"separator_before": false,
						"icon": false,
						"separator_after": false,
						"_disabled": false, //(this.check("delete_node", data.reference, this.get_parent(data.reference), "")),
						"label": "Delete",
						"action": function (data) {
							var inst = $.jstree.reference(data.reference),
								obj = inst.get_node(data.reference);
							if (inst.is_selected(obj)) {
								inst.delete_node(inst.get_selected());
							} else {
								inst.delete_node(obj);
							}
						}
					},
					"ccp": {
						"separator_before": true,
						"icon": false,
						"separator_after": false,
						"label": "Edit",
						"action": false,
						"submenu": {
							"cut": {
								"separator_before": false,
								"separator_after": false,
								"label": "Cut",
								"action": function (data) {
									var inst = $.jstree.reference(data.reference),
										obj = inst.get_node(data.reference);
									if (inst.is_selected(obj)) {
										inst.cut(inst.get_top_selected());
									} else {
										inst.cut(obj);
									}
								}
							},
							"copy": {
								"separator_before": false,
								"icon": false,
								"separator_after": false,
								"label": "Copy",
								"action": function (data) {
									var inst = $.jstree.reference(data.reference),
										obj = inst.get_node(data.reference);
									if (inst.is_selected(obj)) {
										inst.copy(inst.get_top_selected());
									} else {
										inst.copy(obj);
									}
								}
							},
							"paste": {
								"separator_before": false,
								"icon": false,
								"_disabled": function (data) {
									return !$.jstree.reference(data.reference).can_paste();
								},
								"separator_after": false,
								"label": "Paste",
								"action": function (data) {
									var inst = $.jstree.reference(data.reference),
										obj = inst.get_node(data.reference);
									inst.paste(obj);
								}
							}
						}
					}
				};
			}
		};

		$.jstree.plugins.contextmenu = function (options, parent) {
			this.bind = function () {
				parent.bind.call(this);

				var last_ts = 0,
					cto = null,
					ex, ey;
				this.element
					.on("init.jstree loading.jstree ready.jstree", $.proxy(function () {
						this.get_container_ul().addClass('jstree-contextmenu');
					}, this))
					.on("contextmenu.jstree", ".jstree-anchor", $.proxy(function (e, data) {
						if (e.target.tagName.toLowerCase() === 'input') {
							return;
						}
						e.preventDefault();
						last_ts = e.ctrlKey ? +new Date() : 0;
						if (data || cto) {
							last_ts = (+new Date()) + 10000;
						}
						if (cto) {
							clearTimeout(cto);
						}
						if (!this.is_loading(e.currentTarget)) {
							this.show_contextmenu(e.currentTarget, e.pageX, e.pageY, e);
						}
					}, this))
					.on("click.jstree", ".jstree-anchor", $.proxy(function (e) {
						if (this._data.contextmenu.visible && (!last_ts || (+new Date()) - last_ts > 250)) { // work around safari & macOS ctrl+click
							$.vakata.context.hide();
						}
						last_ts = 0;
					}, this))
					.on("touchstart.jstree", ".jstree-anchor", function (e) {
						if (!e.originalEvent || !e.originalEvent.changedTouches || !e.originalEvent.changedTouches[0]) {
							return;
						}
						ex = e.originalEvent.changedTouches[0].clientX;
						ey = e.originalEvent.changedTouches[0].clientY;
						cto = setTimeout(function () {
							$(e.currentTarget).trigger('contextmenu', true);
						}, 750);
					})
					.on('touchmove.vakata.jstree', function (e) {
						if (cto && e.originalEvent && e.originalEvent.changedTouches && e.originalEvent.changedTouches[0] && (Math.abs(ex - e.originalEvent.changedTouches[0].clientX) > 10 || Math.abs(ey - e.originalEvent.changedTouches[0].clientY) > 10)) {
							clearTimeout(cto);
							$.vakata.context.hide();
						}
					})
					.on('touchend.vakata.jstree', function (e) {
						if (cto) {
							clearTimeout(cto);
						}
					});

				/*!
				if(!('oncontextmenu' in document.body) && ('ontouchstart' in document.body)) {
					var el = null, tm = null;
					this.element
						.on("touchstart", ".jstree-anchor", function (e) {
							el = e.currentTarget;
							tm = +new Date();
							$(document).one("touchend", function (e) {
								e.target = document.elementFromPoint(e.originalEvent.targetTouches[0].pageX - window.pageXOffset, e.originalEvent.targetTouches[0].pageY - window.pageYOffset);
								e.currentTarget = e.target;
								tm = ((+(new Date())) - tm);
								if(e.target === el && tm > 600 && tm < 1000) {
									e.preventDefault();
									$(el).trigger('contextmenu', e);
								}
								el = null;
								tm = null;
							});
						});
				}
				*/
				$(document).on("context_hide.vakata.jstree", $.proxy(function (e, data) {
					this._data.contextmenu.visible = false;
					$(data.reference).removeClass('jstree-context');
				}, this));
			};
			this.teardown = function () {
				if (this._data.contextmenu.visible) {
					$.vakata.context.hide();
				}
				parent.teardown.call(this);
			};

			/**
			 * prepare and show the context menu for a node
			 * @name show_contextmenu(obj [, x, y])
			 * @param {mixed} obj the node
			 * @param {Number} x the x-coordinate relative to the document to show the menu at
			 * @param {Number} y the y-coordinate relative to the document to show the menu at
			 * @param {Object} e the event if available that triggered the contextmenu
			 * @plugin contextmenu
			 * @trigger show_contextmenu.jstree
			 */
			this.show_contextmenu = function (obj, x, y, e) {
				obj = this.get_node(obj);
				if (!obj || obj.id === $.jstree.root) {
					return false;
				}
				var s = this.settings.contextmenu,
					d = this.get_node(obj, true),
					a = d.children(".jstree-anchor"),
					o = false,
					i = false;
				if (s.show_at_node || x === undefined || y === undefined) {
					o = a.offset();
					x = o.left;
					y = o.top + this._data.core.li_height;
				}
				if (this.settings.contextmenu.select_node && !this.is_selected(obj)) {
					this.activate_node(obj, e);
				}

				i = s.items;
				if ($.isFunction(i)) {
					i = i.call(this, obj, $.proxy(function (i) {
						this._show_contextmenu(obj, x, y, i);
					}, this));
				}
				if ($.isPlainObject(i)) {
					this._show_contextmenu(obj, x, y, i);
				}
			};
			/**
			 * show the prepared context menu for a node
			 * @name _show_contextmenu(obj, x, y, i)
			 * @param {mixed} obj the node
			 * @param {Number} x the x-coordinate relative to the document to show the menu at
			 * @param {Number} y the y-coordinate relative to the document to show the menu at
			 * @param {Number} i the object of items to show
			 * @plugin contextmenu
			 * @trigger show_contextmenu.jstree
			 * @private
			 */
			this._show_contextmenu = function (obj, x, y, i) {
				var d = this.get_node(obj, true),
					a = d.children(".jstree-anchor");
				$(document).one("context_show.vakata.jstree", $.proxy(function (e, data) {
					var cls = 'jstree-contextmenu jstree-' + this.get_theme() + '-contextmenu';
					$(data.element).addClass(cls);
					a.addClass('jstree-context');
				}, this));
				this._data.contextmenu.visible = true;
				$.vakata.context.show(a, {
					'x': x,
					'y': y
				}, i);
				/**
				 * triggered when the contextmenu is shown for a node
				 * @event
				 * @name show_contextmenu.jstree
				 * @param {Object} node the node
				 * @param {Number} x the x-coordinate of the menu relative to the document
				 * @param {Number} y the y-coordinate of the menu relative to the document
				 * @plugin contextmenu
				 */
				this.trigger('show_contextmenu', {
					"node": obj,
					"x": x,
					"y": y
				});
			};
		};

		// contextmenu helper
		(function ($) {
			var right_to_left = false,
				vakata_context = {
					element: false,
					reference: false,
					position_x: 0,
					position_y: 0,
					items: [],
					html: "",
					is_visible: false
				};

			$.vakata.context = {
				settings: {
					hide_onmouseleave: 0,
					icons: true
				},
				_trigger: function (event_name) {
					$(document).triggerHandler("context_" + event_name + ".vakata", {
						"reference": vakata_context.reference,
						"element": vakata_context.element,
						"position": {
							"x": vakata_context.position_x,
							"y": vakata_context.position_y
						}
					});
				},
				_execute: function (i) {
					i = vakata_context.items[i];
					return i && (!i._disabled || ($.isFunction(i._disabled) && !i._disabled({
						"item": i,
						"reference": vakata_context.reference,
						"element": vakata_context.element
					}))) && i.action ? i.action.call(null, {
						"item": i,
						"reference": vakata_context.reference,
						"element": vakata_context.element,
						"position": {
							"x": vakata_context.position_x,
							"y": vakata_context.position_y
						}
					}) : false;
				},
				_parse: function (o, is_callback) {
					if (!o) {
						return false;
					}
					if (!is_callback) {
						vakata_context.html = "";
						vakata_context.items = [];
					}
					var str = "",
						sep = false,
						tmp;

					if (is_callback) {
						str += "<" + "ul>";
					}
					$.each(o, function (i, val) {
						if (!val) {
							return true;
						}
						vakata_context.items.push(val);
						if (!sep && val.separator_before) {
							str += "<" + "li class='vakata-context-separator'><" + "a href='#' " + ($.vakata.context.settings.icons ? '' : 'style="margin-left:0px;"') + ">&#160;<" + "/a><" + "/li>";
						}
						sep = false;
						str += "<" + "li class='" + (val._class || "") + (val._disabled === true || ($.isFunction(val._disabled) && val._disabled({
							"item": val,
							"reference": vakata_context.reference,
							"element": vakata_context.element
						})) ? " vakata-contextmenu-disabled " : "") + "' " + (val.shortcut ? " data-shortcut='" + val.shortcut + "' " : '') + ">";
						str += "<" + "a href='#' rel='" + (vakata_context.items.length - 1) + "' " + (val.title ? "title='" + val.title + "'" : "") + ">";
						if ($.vakata.context.settings.icons) {
							str += "<" + "i ";
							if (val.icon) {
								if (val.icon.indexOf("/") !== -1 || val.icon.indexOf(".") !== -1) {
									str += " style='background:url(\"" + val.icon + "\") center center no-repeat' ";
								} else {
									str += " class='" + val.icon + "' ";
								}
							}
							str += "><" + "/i><" + "span class='vakata-contextmenu-sep'>&#160;<" + "/span>";
						}
						str += ($.isFunction(val.label) ? val.label({
							"item": i,
							"reference": vakata_context.reference,
							"element": vakata_context.element
						}) : val.label) + (val.shortcut ? ' <span class="vakata-contextmenu-shortcut vakata-contextmenu-shortcut-' + val.shortcut + '">' + (val.shortcut_label || '') + '</span>' : '') + "<" + "/a>";
						if (val.submenu) {
							tmp = $.vakata.context._parse(val.submenu, true);
							if (tmp) {
								str += tmp;
							}
						}
						str += "<" + "/li>";
						if (val.separator_after) {
							str += "<" + "li class='vakata-context-separator'><" + "a href='#' " + ($.vakata.context.settings.icons ? '' : 'style="margin-left:0px;"') + ">&#160;<" + "/a><" + "/li>";
							sep = true;
						}
					});
					str = str.replace(/<li class\='vakata-context-separator'\><\/li\>$/, "");
					if (is_callback) {
						str += "</ul>";
					}
					/**
					 * triggered on the document when the contextmenu is parsed (HTML is built)
					 * @event
					 * @plugin contextmenu
					 * @name context_parse.vakata
					 * @param {jQuery} reference the element that was right clicked
					 * @param {jQuery} element the DOM element of the menu itself
					 * @param {Object} position the x & y coordinates of the menu
					 */
					if (!is_callback) {
						vakata_context.html = str;
						$.vakata.context._trigger("parse");
					}
					return str.length > 10 ? str : false;
				},
				_show_submenu: function (o) {
					o = $(o);
					if (!o.length || !o.children("ul").length) {
						return;
					}
					var e = o.children("ul"),
						xl = o.offset().left,
						x = xl + o.outerWidth(),
						y = o.offset().top,
						w = e.width(),
						h = e.height(),
						dw = $(window).width() + $(window).scrollLeft(),
						dh = $(window).height() + $(window).scrollTop();
					// може да се спести е една проверка - дали няма някой от класовете вече нагоре
					if (right_to_left) {
						o[x - (w + 10 + o.outerWidth()) < 0 ? "addClass" : "removeClass"]("vakata-context-left");
					} else {
						o[x + w > dw && xl > dw - x ? "addClass" : "removeClass"]("vakata-context-right");
					}
					if (y + h + 10 > dh) {
						e.css("bottom", "-1px");
					}

					//if does not fit - stick it to the side
					if (o.hasClass('vakata-context-right')) {
						if (xl < w) {
							e.css("margin-right", xl - w);
						}
					} else {
						if (dw - x < w) {
							e.css("margin-left", dw - x - w);
						}
					}

					e.show();
				},
				show: function (reference, position, data) {
					var o, e, x, y, w, h, dw, dh, cond = true;
					if (vakata_context.element && vakata_context.element.length) {
						vakata_context.element.width('');
					}
					switch (cond) {
						case (!position && !reference):
							return false;
						case (!!position && !!reference):
							vakata_context.reference = reference;
							vakata_context.position_x = position.x;
							vakata_context.position_y = position.y;
							break;
						case (!position && !!reference):
							vakata_context.reference = reference;
							o = reference.offset();
							vakata_context.position_x = o.left + reference.outerHeight();
							vakata_context.position_y = o.top;
							break;
						case (!!position && !reference):
							vakata_context.position_x = position.x;
							vakata_context.position_y = position.y;
							break;
					}
					if (!!reference && !data && $(reference).data('vakata_contextmenu')) {
						data = $(reference).data('vakata_contextmenu');
					}
					if ($.vakata.context._parse(data)) {
						vakata_context.element.html(vakata_context.html);
					}
					if (vakata_context.items.length) {
						vakata_context.element.appendTo("body");
						e = vakata_context.element;
						x = vakata_context.position_x;
						y = vakata_context.position_y;
						w = e.width();
						h = e.height();
						dw = $(window).width() + $(window).scrollLeft();
						dh = $(window).height() + $(window).scrollTop();
						if (right_to_left) {
							x -= (e.outerWidth() - $(reference).outerWidth());
							if (x < $(window).scrollLeft() + 20) {
								x = $(window).scrollLeft() + 20;
							}
						}
						if (x + w + 20 > dw) {
							x = dw - (w + 20);
						}
						if (y + h + 20 > dh) {
							y = dh - (h + 20);
						}

						vakata_context.element
							.css({
								"left": x,
								"top": y
							})
							.show()
							.find('a').first().focus().parent().addClass("vakata-context-hover");
						vakata_context.is_visible = true;
						/**
						 * triggered on the document when the contextmenu is shown
						 * @event
						 * @plugin contextmenu
						 * @name context_show.vakata
						 * @param {jQuery} reference the element that was right clicked
						 * @param {jQuery} element the DOM element of the menu itself
						 * @param {Object} position the x & y coordinates of the menu
						 */
						$.vakata.context._trigger("show");
					}
				},
				hide: function () {
					if (vakata_context.is_visible) {
						vakata_context.element.hide().find("ul").hide().end().find(':focus').blur().end().detach();
						vakata_context.is_visible = false;
						/**
						 * triggered on the document when the contextmenu is hidden
						 * @event
						 * @plugin contextmenu
						 * @name context_hide.vakata
						 * @param {jQuery} reference the element that was right clicked
						 * @param {jQuery} element the DOM element of the menu itself
						 * @param {Object} position the x & y coordinates of the menu
						 */
						$.vakata.context._trigger("hide");
					}
				}
			};
			$(function () {
				right_to_left = $("body").css("direction") === "rtl";
				var to = false;

				vakata_context.element = $("<ul class='vakata-context'></ul>");
				vakata_context.element
					.on("mouseenter", "li", function (e) {
						e.stopImmediatePropagation();

						if ($.contains(this, e.relatedTarget)) {
							// премахнато заради delegate mouseleave по-долу
							// $(this).find(".vakata-context-hover").removeClass("vakata-context-hover");
							return;
						}

						if (to) {
							clearTimeout(to);
						}
						vakata_context.element.find(".vakata-context-hover").removeClass("vakata-context-hover").end();

						$(this)
							.siblings().find("ul").hide().end().end()
							.parentsUntil(".vakata-context", "li").addBack().addClass("vakata-context-hover");
						$.vakata.context._show_submenu(this);
					})
					// тестово - дали не натоварва?
					.on("mouseleave", "li", function (e) {
						if ($.contains(this, e.relatedTarget)) {
							return;
						}
						$(this).find(".vakata-context-hover").addBack().removeClass("vakata-context-hover");
					})
					.on("mouseleave", function (e) {
						$(this).find(".vakata-context-hover").removeClass("vakata-context-hover");
						if ($.vakata.context.settings.hide_onmouseleave) {
							to = setTimeout(
								(function (t) {
									return function () {
										$.vakata.context.hide();
									};
								}(this)), $.vakata.context.settings.hide_onmouseleave);
						}
					})
					.on("click", "a", function (e) {
						e.preventDefault();
						//})
						//.on("mouseup", "a", function (e) {
						if (!$(this).blur().parent().hasClass("vakata-context-disabled") && $.vakata.context._execute($(this).attr("rel")) !== false) {
							$.vakata.context.hide();
						}
					})
					.on('keydown', 'a', function (e) {
						var o = null;
						switch (e.which) {
							case 13:
							case 32:
								e.type = "click";
								e.preventDefault();
								$(e.currentTarget).trigger(e);
								break;
							case 37:
								if (vakata_context.is_visible) {
									vakata_context.element.find(".vakata-context-hover").last().closest("li").first().find("ul").hide().find(".vakata-context-hover").removeClass("vakata-context-hover").end().end().children('a').focus();
									e.stopImmediatePropagation();
									e.preventDefault();
								}
								break;
							case 38:
								if (vakata_context.is_visible) {
									o = vakata_context.element.find("ul:visible").addBack().last().children(".vakata-context-hover").removeClass("vakata-context-hover").prevAll("li:not(.vakata-context-separator)").first();
									if (!o.length) {
										o = vakata_context.element.find("ul:visible").addBack().last().children("li:not(.vakata-context-separator)").last();
									}
									o.addClass("vakata-context-hover").children('a').focus();
									e.stopImmediatePropagation();
									e.preventDefault();
								}
								break;
							case 39:
								if (vakata_context.is_visible) {
									vakata_context.element.find(".vakata-context-hover").last().children("ul").show().children("li:not(.vakata-context-separator)").removeClass("vakata-context-hover").first().addClass("vakata-context-hover").children('a').focus();
									e.stopImmediatePropagation();
									e.preventDefault();
								}
								break;
							case 40:
								if (vakata_context.is_visible) {
									o = vakata_context.element.find("ul:visible").addBack().last().children(".vakata-context-hover").removeClass("vakata-context-hover").nextAll("li:not(.vakata-context-separator)").first();
									if (!o.length) {
										o = vakata_context.element.find("ul:visible").addBack().last().children("li:not(.vakata-context-separator)").first();
									}
									o.addClass("vakata-context-hover").children('a').focus();
									e.stopImmediatePropagation();
									e.preventDefault();
								}
								break;
							case 27:
								$.vakata.context.hide();
								e.preventDefault();
								break;
							default:
								//console.log(e.which);
								break;
						}
					})
					.on('keydown', function (e) {
						e.preventDefault();
						var a = vakata_context.element.find('.vakata-contextmenu-shortcut-' + e.which).parent();
						if (a.parent().not('.vakata-context-disabled')) {
							a.click();
						}
					});

				$(document)
					.on("mousedown.vakata.jstree", function (e) {
						if (vakata_context.is_visible && vakata_context.element[0] !== e.target && !$.contains(vakata_context.element[0], e.target)) {
							$.vakata.context.hide();
						}
					})
					.on("context_show.vakata.jstree", function (e, data) {
						vakata_context.element.find("li:has(ul)").children("a").addClass("vakata-context-parent");
						if (right_to_left) {
							vakata_context.element.addClass("vakata-context-rtl").css("direction", "rtl");
						}
						// also apply a RTL class?
						vakata_context.element.find("ul").hide().end();
					});
			});
		}($));
		// $.jstree.defaults.plugins.push("contextmenu");


		/**
		 * ### Drag'n'drop plugin
		 *
		 * Enables dragging and dropping of nodes in the tree, resulting in a move or copy operations.
		 */

		/**
		 * stores all defaults for the drag'n'drop plugin
		 * @name $.jstree.defaults.dnd
		 * @plugin dnd
		 */
		$.jstree.defaults.dnd = {
			/**
			 * a boolean indicating if a copy should be possible while dragging (by pressint the meta key or Ctrl). Defaults to `true`.
			 * @name $.jstree.defaults.dnd.copy
			 * @plugin dnd
			 */
			copy: true,
			/**
			 * a number indicating how long a node should remain hovered while dragging to be opened. Defaults to `500`.
			 * @name $.jstree.defaults.dnd.open_timeout
			 * @plugin dnd
			 */
			open_timeout: 500,
			/**
			 * a function invoked each time a node is about to be dragged, invoked in the tree's scope and receives the nodes about to be dragged as an argument (array) and the event that started the drag - return `false` to prevent dragging
			 * @name $.jstree.defaults.dnd.is_draggable
			 * @plugin dnd
			 */
			is_draggable: true,
			/**
			 * a boolean indicating if checks should constantly be made while the user is dragging the node (as opposed to checking only on drop), default is `true`
			 * @name $.jstree.defaults.dnd.check_while_dragging
			 * @plugin dnd
			 */
			check_while_dragging: true,
			/**
			 * a boolean indicating if nodes from this tree should only be copied with dnd (as opposed to moved), default is `false`
			 * @name $.jstree.defaults.dnd.always_copy
			 * @plugin dnd
			 */
			always_copy: false,
			/**
			 * when dropping a node "inside", this setting indicates the position the node should go to - it can be an integer or a string: "first" (same as 0) or "last", default is `0`
			 * @name $.jstree.defaults.dnd.inside_pos
			 * @plugin dnd
			 */
			inside_pos: 0,
			/**
			 * when starting the drag on a node that is selected this setting controls if all selected nodes are dragged or only the single node, default is `true`, which means all selected nodes are dragged when the drag is started on a selected node
			 * @name $.jstree.defaults.dnd.drag_selection
			 * @plugin dnd
			 */
			drag_selection: true,
			/**
			 * controls whether dnd works on touch devices. If left as boolean true dnd will work the same as in desktop browsers, which in some cases may impair scrolling. If set to boolean false dnd will not work on touch devices. There is a special third option - string "selected" which means only selected nodes can be dragged on touch devices.
			 * @name $.jstree.defaults.dnd.touch
			 * @plugin dnd
			 */
			touch: true,
			/**
			 * controls whether items can be dropped anywhere on the node, not just on the anchor, by default only the node anchor is a valid drop target. Works best with the wholerow plugin. If enabled on mobile depending on the interface it might be hard for the user to cancel the drop, since the whole tree container will be a valid drop target.
			 * @name $.jstree.defaults.dnd.large_drop_target
			 * @plugin dnd
			 */
			large_drop_target: false,
			/**
			 * controls whether a drag can be initiated from any part of the node and not just the text/icon part, works best with the wholerow plugin. Keep in mind it can cause problems with tree scrolling on mobile depending on the interface - in that case set the touch option to "selected".
			 * @name $.jstree.defaults.dnd.large_drag_target
			 * @plugin dnd
			 */
			large_drag_target: false,
			/**
			 * controls whether use HTML5 dnd api instead of classical. That will allow better integration of dnd events with other HTML5 controls.
			 * @reference http://caniuse.com/#feat=dragndrop
			 * @name $.jstree.defaults.dnd.use_html5
			 * @plugin dnd
			 */
			use_html5: false
		};
		var drg, elm;
		// TODO: now check works by checking for each node individually, how about max_children, unique, etc?
		$.jstree.plugins.dnd = function (options, parent) {
			this.init = function (el, options) {
				parent.init.call(this, el, options);
				this.settings.dnd.use_html5 = this.settings.dnd.use_html5 && ('draggable' in document.createElement('span'));
			};
			this.bind = function () {
				parent.bind.call(this);

				this.element
					.on(this.settings.dnd.use_html5 ? 'dragstart.jstree' : 'mousedown.jstree touchstart.jstree', this.settings.dnd.large_drag_target ? '.jstree-node' : '.jstree-anchor', $.proxy(function (e) {
						if (this.settings.dnd.large_drag_target && $(e.target).closest('.jstree-node')[0] !== e.currentTarget) {
							return true;
						}
						if (e.type === "touchstart" && (!this.settings.dnd.touch || (this.settings.dnd.touch === 'selected' && !$(e.currentTarget).closest('.jstree-node').children('.jstree-anchor').hasClass('jstree-clicked')))) {
							return true;
						}
						var obj = this.get_node(e.target),
							mlt = this.is_selected(obj) && this.settings.dnd.drag_selection ? this.get_top_selected().length : 1,
							txt = (mlt > 1 ? mlt + ' ' + this.get_string('nodes') : this.get_text(e.currentTarget));
						if (this.settings.core.force_text) {
							txt = $.vakata.html.escape(txt);
						}
						if (obj && obj.id && obj.id !== $.jstree.root && (e.which === 1 || e.type === "touchstart" || e.type === "dragstart") &&
							(this.settings.dnd.is_draggable === true || ($.isFunction(this.settings.dnd.is_draggable) && this.settings.dnd.is_draggable.call(this, (mlt > 1 ? this.get_top_selected(true) : [obj]), e)))
						) {
							drg = {
								'jstree': true,
								'origin': this,
								'obj': this.get_node(obj, true),
								'nodes': mlt > 1 ? this.get_top_selected() : [obj.id]
							};
							elm = e.currentTarget;
							if (this.settings.dnd.use_html5) {
								$.vakata.dnd._trigger('start', e, {
									'helper': $(),
									'element': elm,
									'data': drg
								});
							} else {
								this.element.trigger('mousedown.jstree');
								return $.vakata.dnd.start(e, drg, '<div id="jstree-dnd" class="jstree-' + this.get_theme() + ' jstree-' + this.get_theme() + '-' + this.get_theme_variant() + ' ' + (this.settings.core.themes.responsive ? ' jstree-dnd-responsive' : '') + '"><i class="jstree-icon jstree-er"></i>' + txt + '<ins class="jstree-copy" style="display:none;">+</ins></div>');
							}
						}
					}, this));
				if (this.settings.dnd.use_html5) {
					this.element
						.on('dragover.jstree', function (e) {
							e.preventDefault();
							$.vakata.dnd._trigger('move', e, {
								'helper': $(),
								'element': elm,
								'data': drg
							});
							return false;
						})
						//.on('dragenter.jstree', this.settings.dnd.large_drop_target ? '.jstree-node' : '.jstree-anchor', $.proxy(function (e) {
						//		e.preventDefault();
						//		$.vakata.dnd._trigger('move', e, { 'helper': $(), 'element': elm, 'data': drg });
						//		return false;
						//	}, this))
						.on('drop.jstree', $.proxy(function (e) {
							e.preventDefault();
							$.vakata.dnd._trigger('stop', e, {
								'helper': $(),
								'element': elm,
								'data': drg
							});
							return false;
						}, this));
				}
			};
			this.redraw_node = function (obj, deep, callback, force_render) {
				obj = parent.redraw_node.apply(this, arguments);
				if (obj && this.settings.dnd.use_html5) {
					if (this.settings.dnd.large_drag_target) {
						obj.setAttribute('draggable', true);
					} else {
						var i, j, tmp = null;
						for (i = 0, j = obj.childNodes.length; i < j; i++) {
							if (obj.childNodes[i] && obj.childNodes[i].className && obj.childNodes[i].className.indexOf("jstree-anchor") !== -1) {
								tmp = obj.childNodes[i];
								break;
							}
						}
						if (tmp) {
							tmp.setAttribute('draggable', true);
						}
					}
				}
				return obj;
			};
		};

		$(function () {
			// bind only once for all instances
			var lastmv = false,
				laster = false,
				lastev = false,
				opento = false,
				marker = $('<div id="jstree-marker">&#160;</div>').hide(); //.appendTo('body');

			$(document)
				.on('dnd_start.vakata.jstree', function (e, data) {
					lastmv = false;
					lastev = false;
					if (!data || !data.data || !data.data.jstree) {
						return;
					}
					marker.appendTo('body'); //.show();
				})
				.on('dnd_move.vakata.jstree', function (e, data) {
					var isDifferentNode = data.event.target !== lastev.target;
					if (opento) {
						if (!data.event || data.event.type !== 'dragover' || isDifferentNode) {
							clearTimeout(opento);
						}
					}
					if (!data || !data.data || !data.data.jstree) {
						return;
					}

					// if we are hovering the marker image do nothing (can happen on "inside" drags)
					if (data.event.target.id && data.event.target.id === 'jstree-marker') {
						return;
					}
					lastev = data.event;

					var ins = $.jstree.reference(data.event.target),
						ref = false,
						off = false,
						rel = false,
						tmp, l, t, h, p, i, o, ok, t1, t2, op, ps, pr, ip, tm, is_copy, pn;
					// if we are over an instance
					if (ins && ins._data && ins._data.dnd) {
						marker.attr('class', 'jstree-' + ins.get_theme() + (ins.settings.core.themes.responsive ? ' jstree-dnd-responsive' : ''));
						is_copy = data.data.origin && (data.data.origin.settings.dnd.always_copy || (data.data.origin.settings.dnd.copy && (data.event.metaKey || data.event.ctrlKey)));
						data.helper
							.children().attr('class', 'jstree-' + ins.get_theme() + ' jstree-' + ins.get_theme() + '-' + ins.get_theme_variant() + ' ' + (ins.settings.core.themes.responsive ? ' jstree-dnd-responsive' : ''))
							.find('.jstree-copy').first()[is_copy ? 'show' : 'hide']();

						// if are hovering the container itself add a new root node
						//console.log(data.event);
						if ((data.event.target === ins.element[0] || data.event.target === ins.get_container_ul()[0]) && ins.get_container_ul().children().length === 0) {
							ok = true;
							for (t1 = 0, t2 = data.data.nodes.length; t1 < t2; t1++) {
								ok = ok && ins.check((data.data.origin && (data.data.origin.settings.dnd.always_copy || (data.data.origin.settings.dnd.copy && (data.event.metaKey || data.event.ctrlKey))) ? "copy_node" : "move_node"), (data.data.origin && data.data.origin !== ins ? data.data.origin.get_node(data.data.nodes[t1]) : data.data.nodes[t1]), $.jstree.root, 'last', {
									'dnd': true,
									'ref': ins.get_node($.jstree.root),
									'pos': 'i',
									'origin': data.data.origin,
									'is_multi': (data.data.origin && data.data.origin !== ins),
									'is_foreign': (!data.data.origin)
								});
								if (!ok) {
									break;
								}
							}
							if (ok) {
								lastmv = {
									'ins': ins,
									'par': $.jstree.root,
									'pos': 'last'
								};
								marker.hide();
								data.helper.find('.jstree-icon').first().removeClass('jstree-er').addClass('jstree-ok');
								if (data.event.originalEvent && data.event.originalEvent.dataTransfer) {
									data.event.originalEvent.dataTransfer.dropEffect = is_copy ? 'copy' : 'move';
								}
								return;
							}
						} else {
							// if we are hovering a tree node
							ref = ins.settings.dnd.large_drop_target ? $(data.event.target).closest('.jstree-node').children('.jstree-anchor') : $(data.event.target).closest('.jstree-anchor');
							if (ref && ref.length && ref.parent().is('.jstree-closed, .jstree-open, .jstree-leaf')) {
								off = ref.offset();
								rel = (data.event.pageY !== undefined ? data.event.pageY : data.event.originalEvent.pageY) - off.top;
								h = ref.outerHeight();
								if (rel < h / 3) {
									o = ['b', 'i', 'a'];
								} else if (rel > h - h / 3) {
									o = ['a', 'i', 'b'];
								} else {
									o = rel > h / 2 ? ['i', 'a', 'b'] : ['i', 'b', 'a'];
								}
								$.each(o, function (j, v) {
									switch (v) {
										case 'b':
											l = off.left - 6;
											t = off.top;
											p = ins.get_parent(ref);
											i = ref.parent().index();
											break;
										case 'i':
											ip = ins.settings.dnd.inside_pos;
											tm = ins.get_node(ref.parent());
											l = off.left - 2;
											t = off.top + h / 2 + 1;
											p = tm.id;
											i = ip === 'first' ? 0 : (ip === 'last' ? tm.children.length : Math.min(ip, tm.children.length));
											break;
										case 'a':
											l = off.left - 6;
											t = off.top + h;
											p = ins.get_parent(ref);
											i = ref.parent().index() + 1;
											break;
									}
									ok = true;
									for (t1 = 0, t2 = data.data.nodes.length; t1 < t2; t1++) {
										op = data.data.origin && (data.data.origin.settings.dnd.always_copy || (data.data.origin.settings.dnd.copy && (data.event.metaKey || data.event.ctrlKey))) ? "copy_node" : "move_node";
										ps = i;
										if (op === "move_node" && v === 'a' && (data.data.origin && data.data.origin === ins) && p === ins.get_parent(data.data.nodes[t1])) {
											pr = ins.get_node(p);
											if (ps > $.inArray(data.data.nodes[t1], pr.children)) {
												ps -= 1;
											}
										}
										ok = ok && ((ins && ins.settings && ins.settings.dnd && ins.settings.dnd.check_while_dragging === false) || ins.check(op, (data.data.origin && data.data.origin !== ins ? data.data.origin.get_node(data.data.nodes[t1]) : data.data.nodes[t1]), p, ps, {
											'dnd': true,
											'ref': ins.get_node(ref.parent()),
											'pos': v,
											'origin': data.data.origin,
											'is_multi': (data.data.origin && data.data.origin !== ins),
											'is_foreign': (!data.data.origin)
										}));
										if (!ok) {
											if (ins && ins.last_error) {
												laster = ins.last_error();
											}
											break;
										}
									}
									if (v === 'i' && ref.parent().is('.jstree-closed') && ins.settings.dnd.open_timeout) {
										if (!data.event || data.event.type !== 'dragover' || isDifferentNode) {
											if (opento) {
												clearTimeout(opento);
											}
											opento = setTimeout((function (x, z) {
												return function () {
													x.open_node(z);
												};
											}(ins, ref)), ins.settings.dnd.open_timeout);
										}
									}
									if (ok) {
										pn = ins.get_node(p, true);
										if (!pn.hasClass('.jstree-dnd-parent')) {
											$('.jstree-dnd-parent').removeClass('jstree-dnd-parent');
											pn.addClass('jstree-dnd-parent');
										}
										lastmv = {
											'ins': ins,
											'par': p,
											'pos': v === 'i' && ip === 'last' && i === 0 && !ins.is_loaded(tm) ? 'last' : i
										};
										marker.css({
											'left': l + 'px',
											'top': t + 'px'
										}).show();
										data.helper.find('.jstree-icon').first().removeClass('jstree-er').addClass('jstree-ok');
										if (data.event.originalEvent && data.event.originalEvent.dataTransfer) {
											data.event.originalEvent.dataTransfer.dropEffect = is_copy ? 'copy' : 'move';
										}
										laster = {};
										o = true;
										return false;
									}
								});
								if (o === true) {
									return;
								}
							}
						}
					}
					$('.jstree-dnd-parent').removeClass('jstree-dnd-parent');
					lastmv = false;
					data.helper.find('.jstree-icon').removeClass('jstree-ok').addClass('jstree-er');
					if (data.event.originalEvent && data.event.originalEvent.dataTransfer) {
						data.event.originalEvent.dataTransfer.dropEffect = 'none';
					}
					marker.hide();
				})
				.on('dnd_scroll.vakata.jstree', function (e, data) {
					if (!data || !data.data || !data.data.jstree) {
						return;
					}
					marker.hide();
					lastmv = false;
					lastev = false;
					data.helper.find('.jstree-icon').first().removeClass('jstree-ok').addClass('jstree-er');
				})
				.on('dnd_stop.vakata.jstree', function (e, data) {
					$('.jstree-dnd-parent').removeClass('jstree-dnd-parent');
					if (opento) {
						clearTimeout(opento);
					}
					if (!data || !data.data || !data.data.jstree) {
						return;
					}
					marker.hide().detach();
					var i, j, nodes = [];
					if (lastmv) {
						for (i = 0, j = data.data.nodes.length; i < j; i++) {
							nodes[i] = data.data.origin ? data.data.origin.get_node(data.data.nodes[i]) : data.data.nodes[i];
						}
						lastmv.ins[data.data.origin && (data.data.origin.settings.dnd.always_copy || (data.data.origin.settings.dnd.copy && (data.event.metaKey || data.event.ctrlKey))) ? 'copy_node' : 'move_node'](nodes, lastmv.par, lastmv.pos, false, false, false, data.data.origin);
					} else {
						i = $(data.event.target).closest('.jstree');
						if (i.length && laster && laster.error && laster.error === 'check') {
							i = i.jstree(true);
							if (i) {
								i.settings.core.error.call(this, laster);
							}
						}
					}
					lastev = false;
					lastmv = false;
				})
				.on('keyup.jstree keydown.jstree', function (e, data) {
					data = $.vakata.dnd._get();
					if (data && data.data && data.data.jstree) {
						if (e.type === "keyup" && e.which === 27) {
							if (opento) {
								clearTimeout(opento);
							}
							lastmv = false;
							laster = false;
							lastev = false;
							opento = false;
							marker.hide().detach();
							$.vakata.dnd._clean();
						} else {
							data.helper.find('.jstree-copy').first()[data.data.origin && (data.data.origin.settings.dnd.always_copy || (data.data.origin.settings.dnd.copy && (e.metaKey || e.ctrlKey))) ? 'show' : 'hide']();
							if (lastev) {
								lastev.metaKey = e.metaKey;
								lastev.ctrlKey = e.ctrlKey;
								$.vakata.dnd._trigger('move', lastev);
							}
						}
					}
				});
		});

		// helpers
		(function ($) {
			$.vakata.html = {
				div: $('<div />'),
				escape: function (str) {
					return $.vakata.html.div.text(str).html();
				},
				strip: function (str) {
					return $.vakata.html.div.empty().append($.parseHTML(str)).text();
				}
			};
			// private variable
			var vakata_dnd = {
				element: false,
				target: false,
				is_down: false,
				is_drag: false,
				helper: false,
				helper_w: 0,
				data: false,
				init_x: 0,
				init_y: 0,
				scroll_l: 0,
				scroll_t: 0,
				scroll_e: false,
				scroll_i: false,
				is_touch: false
			};
			$.vakata.dnd = {
				settings: {
					scroll_speed: 10,
					scroll_proximity: 20,
					helper_left: 5,
					helper_top: 10,
					threshold: 5,
					threshold_touch: 10
				},
				_trigger: function (event_name, e, data) {
					if (data === undefined) {
						data = $.vakata.dnd._get();
					}
					data.event = e;
					$(document).triggerHandler("dnd_" + event_name + ".vakata", data);
				},
				_get: function () {
					return {
						"data": vakata_dnd.data,
						"element": vakata_dnd.element,
						"helper": vakata_dnd.helper
					};
				},
				_clean: function () {
					if (vakata_dnd.helper) {
						vakata_dnd.helper.remove();
					}
					if (vakata_dnd.scroll_i) {
						clearInterval(vakata_dnd.scroll_i);
						vakata_dnd.scroll_i = false;
					}
					vakata_dnd = {
						element: false,
						target: false,
						is_down: false,
						is_drag: false,
						helper: false,
						helper_w: 0,
						data: false,
						init_x: 0,
						init_y: 0,
						scroll_l: 0,
						scroll_t: 0,
						scroll_e: false,
						scroll_i: false,
						is_touch: false
					};
					$(document).off("mousemove.vakata.jstree touchmove.vakata.jstree", $.vakata.dnd.drag);
					$(document).off("mouseup.vakata.jstree touchend.vakata.jstree", $.vakata.dnd.stop);
				},
				_scroll: function (init_only) {
					if (!vakata_dnd.scroll_e || (!vakata_dnd.scroll_l && !vakata_dnd.scroll_t)) {
						if (vakata_dnd.scroll_i) {
							clearInterval(vakata_dnd.scroll_i);
							vakata_dnd.scroll_i = false;
						}
						return false;
					}
					if (!vakata_dnd.scroll_i) {
						vakata_dnd.scroll_i = setInterval($.vakata.dnd._scroll, 100);
						return false;
					}
					if (init_only === true) {
						return false;
					}

					var i = vakata_dnd.scroll_e.scrollTop(),
						j = vakata_dnd.scroll_e.scrollLeft();
					vakata_dnd.scroll_e.scrollTop(i + vakata_dnd.scroll_t * $.vakata.dnd.settings.scroll_speed);
					vakata_dnd.scroll_e.scrollLeft(j + vakata_dnd.scroll_l * $.vakata.dnd.settings.scroll_speed);
					if (i !== vakata_dnd.scroll_e.scrollTop() || j !== vakata_dnd.scroll_e.scrollLeft()) {
						/**
						 * triggered on the document when a drag causes an element to scroll
						 * @event
						 * @plugin dnd
						 * @name dnd_scroll.vakata
						 * @param {Mixed} data any data supplied with the call to $.vakata.dnd.start
						 * @param {DOM} element the DOM element being dragged
						 * @param {jQuery} helper the helper shown next to the mouse
						 * @param {jQuery} event the element that is scrolling
						 */
						$.vakata.dnd._trigger("scroll", vakata_dnd.scroll_e);
					}
				},
				start: function (e, data, html) {
					if (e.type === "touchstart" && e.originalEvent && e.originalEvent.changedTouches && e.originalEvent.changedTouches[0]) {
						e.pageX = e.originalEvent.changedTouches[0].pageX;
						e.pageY = e.originalEvent.changedTouches[0].pageY;
						e.target = document.elementFromPoint(e.originalEvent.changedTouches[0].pageX - window.pageXOffset, e.originalEvent.changedTouches[0].pageY - window.pageYOffset);
					}
					if (vakata_dnd.is_drag) {
						$.vakata.dnd.stop({});
					}
					try {
						e.currentTarget.unselectable = "on";
						e.currentTarget.onselectstart = function () {
							return false;
						};
						if (e.currentTarget.style) {
							e.currentTarget.style.touchAction = "none";
							e.currentTarget.style.msTouchAction = "none";
							e.currentTarget.style.MozUserSelect = "none";
						}
					} catch (ignore) {}
					vakata_dnd.init_x = e.pageX;
					vakata_dnd.init_y = e.pageY;
					vakata_dnd.data = data;
					vakata_dnd.is_down = true;
					vakata_dnd.element = e.currentTarget;
					vakata_dnd.target = e.target;
					vakata_dnd.is_touch = e.type === "touchstart";
					if (html !== false) {
						vakata_dnd.helper = $("<div id='vakata-dnd'></div>").html(html).css({
							"display": "block",
							"margin": "0",
							"padding": "0",
							"position": "absolute",
							"top": "-2000px",
							"lineHeight": "16px",
							"zIndex": "10000"
						});
					}
					$(document).on("mousemove.vakata.jstree touchmove.vakata.jstree", $.vakata.dnd.drag);
					$(document).on("mouseup.vakata.jstree touchend.vakata.jstree", $.vakata.dnd.stop);
					return false;
				},
				drag: function (e) {
					if (e.type === "touchmove" && e.originalEvent && e.originalEvent.changedTouches && e.originalEvent.changedTouches[0]) {
						e.pageX = e.originalEvent.changedTouches[0].pageX;
						e.pageY = e.originalEvent.changedTouches[0].pageY;
						e.target = document.elementFromPoint(e.originalEvent.changedTouches[0].pageX - window.pageXOffset, e.originalEvent.changedTouches[0].pageY - window.pageYOffset);
					}
					if (!vakata_dnd.is_down) {
						return;
					}
					if (!vakata_dnd.is_drag) {
						if (
							Math.abs(e.pageX - vakata_dnd.init_x) > (vakata_dnd.is_touch ? $.vakata.dnd.settings.threshold_touch : $.vakata.dnd.settings.threshold) ||
							Math.abs(e.pageY - vakata_dnd.init_y) > (vakata_dnd.is_touch ? $.vakata.dnd.settings.threshold_touch : $.vakata.dnd.settings.threshold)
						) {
							if (vakata_dnd.helper) {
								vakata_dnd.helper.appendTo("body");
								vakata_dnd.helper_w = vakata_dnd.helper.outerWidth();
							}
							vakata_dnd.is_drag = true;
							$(vakata_dnd.target).one('click.vakata', false);
							/**
							 * triggered on the document when a drag starts
							 * @event
							 * @plugin dnd
							 * @name dnd_start.vakata
							 * @param {Mixed} data any data supplied with the call to $.vakata.dnd.start
							 * @param {DOM} element the DOM element being dragged
							 * @param {jQuery} helper the helper shown next to the mouse
							 * @param {Object} event the event that caused the start (probably mousemove)
							 */
							$.vakata.dnd._trigger("start", e);
						} else {
							return;
						}
					}

					var d = false,
						w = false,
						dh = false,
						wh = false,
						dw = false,
						ww = false,
						dt = false,
						dl = false,
						ht = false,
						hl = false;

					vakata_dnd.scroll_t = 0;
					vakata_dnd.scroll_l = 0;
					vakata_dnd.scroll_e = false;
					$($(e.target).parentsUntil("body").addBack().get().reverse())
						.filter(function () {
							return (/^auto|scroll$/).test($(this).css("overflow")) &&
								(this.scrollHeight > this.offsetHeight || this.scrollWidth > this.offsetWidth);
						})
						.each(function () {
							var t = $(this),
								o = t.offset();
							if (this.scrollHeight > this.offsetHeight) {
								if (o.top + t.height() - e.pageY < $.vakata.dnd.settings.scroll_proximity) {
									vakata_dnd.scroll_t = 1;
								}
								if (e.pageY - o.top < $.vakata.dnd.settings.scroll_proximity) {
									vakata_dnd.scroll_t = -1;
								}
							}
							if (this.scrollWidth > this.offsetWidth) {
								if (o.left + t.width() - e.pageX < $.vakata.dnd.settings.scroll_proximity) {
									vakata_dnd.scroll_l = 1;
								}
								if (e.pageX - o.left < $.vakata.dnd.settings.scroll_proximity) {
									vakata_dnd.scroll_l = -1;
								}
							}
							if (vakata_dnd.scroll_t || vakata_dnd.scroll_l) {
								vakata_dnd.scroll_e = $(this);
								return false;
							}
						});

					if (!vakata_dnd.scroll_e) {
						d = $(document);
						w = $(window);
						dh = d.height();
						wh = w.height();
						dw = d.width();
						ww = w.width();
						dt = d.scrollTop();
						dl = d.scrollLeft();
						if (dh > wh && e.pageY - dt < $.vakata.dnd.settings.scroll_proximity) {
							vakata_dnd.scroll_t = -1;
						}
						if (dh > wh && wh - (e.pageY - dt) < $.vakata.dnd.settings.scroll_proximity) {
							vakata_dnd.scroll_t = 1;
						}
						if (dw > ww && e.pageX - dl < $.vakata.dnd.settings.scroll_proximity) {
							vakata_dnd.scroll_l = -1;
						}
						if (dw > ww && ww - (e.pageX - dl) < $.vakata.dnd.settings.scroll_proximity) {
							vakata_dnd.scroll_l = 1;
						}
						if (vakata_dnd.scroll_t || vakata_dnd.scroll_l) {
							vakata_dnd.scroll_e = d;
						}
					}
					if (vakata_dnd.scroll_e) {
						$.vakata.dnd._scroll(true);
					}

					if (vakata_dnd.helper) {
						ht = parseInt(e.pageY + $.vakata.dnd.settings.helper_top, 10);
						hl = parseInt(e.pageX + $.vakata.dnd.settings.helper_left, 10);
						if (dh && ht + 25 > dh) {
							ht = dh - 50;
						}
						if (dw && hl + vakata_dnd.helper_w > dw) {
							hl = dw - (vakata_dnd.helper_w + 2);
						}
						vakata_dnd.helper.css({
							left: hl + "px",
							top: ht + "px"
						});
					}
					/**
					 * triggered on the document when a drag is in progress
					 * @event
					 * @plugin dnd
					 * @name dnd_move.vakata
					 * @param {Mixed} data any data supplied with the call to $.vakata.dnd.start
					 * @param {DOM} element the DOM element being dragged
					 * @param {jQuery} helper the helper shown next to the mouse
					 * @param {Object} event the event that caused this to trigger (most likely mousemove)
					 */
					$.vakata.dnd._trigger("move", e);
					return false;
				},
				stop: function (e) {
					if (e.type === "touchend" && e.originalEvent && e.originalEvent.changedTouches && e.originalEvent.changedTouches[0]) {
						e.pageX = e.originalEvent.changedTouches[0].pageX;
						e.pageY = e.originalEvent.changedTouches[0].pageY;
						e.target = document.elementFromPoint(e.originalEvent.changedTouches[0].pageX - window.pageXOffset, e.originalEvent.changedTouches[0].pageY - window.pageYOffset);
					}
					if (vakata_dnd.is_drag) {
						/**
						 * triggered on the document when a drag stops (the dragged element is dropped)
						 * @event
						 * @plugin dnd
						 * @name dnd_stop.vakata
						 * @param {Mixed} data any data supplied with the call to $.vakata.dnd.start
						 * @param {DOM} element the DOM element being dragged
						 * @param {jQuery} helper the helper shown next to the mouse
						 * @param {Object} event the event that caused the stop
						 */
						if (e.target !== vakata_dnd.target) {
							$(vakata_dnd.target).off('click.vakata');
						}
						$.vakata.dnd._trigger("stop", e);
					} else {
						if (e.type === "touchend" && e.target === vakata_dnd.target) {
							var to = setTimeout(function () {
								$(e.target).click();
							}, 100);
							$(e.target).one('click', function () {
								if (to) {
									clearTimeout(to);
								}
							});
						}
					}
					$.vakata.dnd._clean();
					return false;
				}
			};
		}($));

		// include the dnd plugin by default
		// $.jstree.defaults.plugins.push("dnd");


		/**
		 * ### Massload plugin
		 *
		 * Adds massload functionality to jsTree, so that multiple nodes can be loaded in a single request (only useful with lazy loading).
		 */

		/**
		 * massload configuration
		 *
		 * It is possible to set this to a standard jQuery-like AJAX config.
		 * In addition to the standard jQuery ajax options here you can supply functions for `data` and `url`, the functions will be run in the current instance's scope and a param will be passed indicating which node IDs need to be loaded, the return value of those functions will be used.
		 *
		 * You can also set this to a function, that function will receive the node IDs being loaded as argument and a second param which is a function (callback) which should be called with the result.
		 *
		 * Both the AJAX and the function approach rely on the same return value - an object where the keys are the node IDs, and the value is the children of that node as an array.
		 *
		 *	{
		 *		"id1" : [{ "text" : "Child of ID1", "id" : "c1" }, { "text" : "Another child of ID1", "id" : "c2" }],
		 *		"id2" : [{ "text" : "Child of ID2", "id" : "c3" }]
		 *	}
		 * 
		 * @name $.jstree.defaults.massload
		 * @plugin massload
		 */
		$.jstree.defaults.massload = null;
		$.jstree.plugins.massload = function (options, parent) {
			this.init = function (el, options) {
				this._data.massload = {};
				parent.init.call(this, el, options);
			};
			this._load_nodes = function (nodes, callback, is_callback, force_reload) {
				var s = this.settings.massload,
					nodesString = JSON.stringify(nodes),
					toLoad = [],
					m = this._model.data,
					i, j, dom;
				if (!is_callback) {
					for (i = 0, j = nodes.length; i < j; i++) {
						if (!m[nodes[i]] || ((!m[nodes[i]].state.loaded && !m[nodes[i]].state.failed) || force_reload)) {
							toLoad.push(nodes[i]);
							dom = this.get_node(nodes[i], true);
							if (dom && dom.length) {
								dom.addClass("jstree-loading").attr('aria-busy', true);
							}
						}
					}
					this._data.massload = {};
					if (toLoad.length) {
						if ($.isFunction(s)) {
							return s.call(this, toLoad, $.proxy(function (data) {
								var i, j;
								if (data) {
									for (i in data) {
										if (data.hasOwnProperty(i)) {
											this._data.massload[i] = data[i];
										}
									}
								}
								for (i = 0, j = nodes.length; i < j; i++) {
									dom = this.get_node(nodes[i], true);
									if (dom && dom.length) {
										dom.removeClass("jstree-loading").attr('aria-busy', false);
									}
								}
								parent._load_nodes.call(this, nodes, callback, is_callback, force_reload);
							}, this));
						}
						if (typeof s === 'object' && s && s.url) {
							s = $.extend(true, {}, s);
							if ($.isFunction(s.url)) {
								s.url = s.url.call(this, toLoad);
							}
							if ($.isFunction(s.data)) {
								s.data = s.data.call(this, toLoad);
							}
							return $.ajax(s)
								.done($.proxy(function (data, t, x) {
									var i, j;
									if (data) {
										for (i in data) {
											if (data.hasOwnProperty(i)) {
												this._data.massload[i] = data[i];
											}
										}
									}
									for (i = 0, j = nodes.length; i < j; i++) {
										dom = this.get_node(nodes[i], true);
										if (dom && dom.length) {
											dom.removeClass("jstree-loading").attr('aria-busy', false);
										}
									}
									parent._load_nodes.call(this, nodes, callback, is_callback, force_reload);
								}, this))
								.fail($.proxy(function (f) {
									parent._load_nodes.call(this, nodes, callback, is_callback, force_reload);
								}, this));
						}
					}
				}
				return parent._load_nodes.call(this, nodes, callback, is_callback, force_reload);
			};
			this._load_node = function (obj, callback) {
				var data = this._data.massload[obj.id],
					rslt = null,
					dom;
				if (data) {
					rslt = this[typeof data === 'string' ? '_append_html_data' : '_append_json_data'](
						obj,
						typeof data === 'string' ? $($.parseHTML(data)).filter(function () {
							return this.nodeType !== 3;
						}) : data,
						function (status) {
							callback.call(this, status);
						}
					);
					dom = this.get_node(obj.id, true);
					if (dom && dom.length) {
						dom.removeClass("jstree-loading").attr('aria-busy', false);
					}
					delete this._data.massload[obj.id];
					return rslt;
				}
				return parent._load_node.call(this, obj, callback);
			};
		};

		/**
		 * ### Search plugin
		 *
		 * Adds search functionality to jsTree.
		 */

		/**
		 * stores all defaults for the search plugin
		 * @name $.jstree.defaults.search
		 * @plugin search
		 */
		$.jstree.defaults.search = {
			/**
			 * a jQuery-like AJAX config, which jstree uses if a server should be queried for results.
			 *
			 * A `str` (which is the search string) parameter will be added with the request, an optional `inside` parameter will be added if the search is limited to a node id. The expected result is a JSON array with nodes that need to be opened so that matching nodes will be revealed.
			 * Leave this setting as `false` to not query the server. You can also set this to a function, which will be invoked in the instance's scope and receive 3 parameters - the search string, the callback to call with the array of nodes to load, and the optional node ID to limit the search to
			 * @name $.jstree.defaults.search.ajax
			 * @plugin search
			 */
			ajax: false,
			/**
			 * Indicates if the search should be fuzzy or not (should `chnd3` match `child node 3`). Default is `false`.
			 * @name $.jstree.defaults.search.fuzzy
			 * @plugin search
			 */
			fuzzy: false,
			/**
			 * Indicates if the search should be case sensitive. Default is `false`.
			 * @name $.jstree.defaults.search.case_sensitive
			 * @plugin search
			 */
			case_sensitive: false,
			/**
			 * Indicates if the tree should be filtered (by default) to show only matching nodes (keep in mind this can be a heavy on large trees in old browsers).
			 * This setting can be changed at runtime when calling the search method. Default is `false`.
			 * @name $.jstree.defaults.search.show_only_matches
			 * @plugin search
			 */
			show_only_matches: false,
			/**
			 * Indicates if the children of matched element are shown (when show_only_matches is true)
			 * This setting can be changed at runtime when calling the search method. Default is `false`.
			 * @name $.jstree.defaults.search.show_only_matches_children
			 * @plugin search
			 */
			show_only_matches_children: false,
			/**
			 * Indicates if all nodes opened to reveal the search result, should be closed when the search is cleared or a new search is performed. Default is `true`.
			 * @name $.jstree.defaults.search.close_opened_onclear
			 * @plugin search
			 */
			close_opened_onclear: true,
			/**
			 * Indicates if only leaf nodes should be included in search results. Default is `false`.
			 * @name $.jstree.defaults.search.search_leaves_only
			 * @plugin search
			 */
			search_leaves_only: false,
			/**
			 * If set to a function it wil be called in the instance's scope with two arguments - search string and node (where node will be every node in the structure, so use with caution).
			 * If the function returns a truthy value the node will be considered a match (it might not be displayed if search_only_leaves is set to true and the node is not a leaf). Default is `false`.
			 * @name $.jstree.defaults.search.search_callback
			 * @plugin search
			 */
			search_callback: false
		};

		$.jstree.plugins.search = function (options, parent) {
			this.bind = function () {
				parent.bind.call(this);

				this._data.search.str = "";
				this._data.search.dom = $();
				this._data.search.res = [];
				this._data.search.opn = [];
				this._data.search.som = false;
				this._data.search.smc = false;
				this._data.search.hdn = [];

				this.element
					.on("search.jstree", $.proxy(function (e, data) {
						if (this._data.search.som && data.res.length) {
							var m = this._model.data,
								i, j, p = [],
								k, l;
							for (i = 0, j = data.res.length; i < j; i++) {
								if (m[data.res[i]] && !m[data.res[i]].state.hidden) {
									p.push(data.res[i]);
									p = p.concat(m[data.res[i]].parents);
									if (this._data.search.smc) {
										for (k = 0, l = m[data.res[i]].children_d.length; k < l; k++) {
											if (m[m[data.res[i]].children_d[k]] && !m[m[data.res[i]].children_d[k]].state.hidden) {
												p.push(m[data.res[i]].children_d[k]);
											}
										}
									}
								}
							}
							p = $.vakata.array_remove_item($.vakata.array_unique(p), $.jstree.root);
							this._data.search.hdn = this.hide_all(true);
							this.show_node(p, true);
							this.redraw(true);
						}
					}, this))
					.on("clear_search.jstree", $.proxy(function (e, data) {
						if (this._data.search.som && data.res.length) {
							this.show_node(this._data.search.hdn, true);
							this.redraw(true);
						}
					}, this));
			};
			/**
			 * used to search the tree nodes for a given string
			 * @name search(str [, skip_async])
			 * @param {String} str the search string
			 * @param {Boolean} skip_async if set to true server will not be queried even if configured
			 * @param {Boolean} show_only_matches if set to true only matching nodes will be shown (keep in mind this can be very slow on large trees or old browsers)
			 * @param {mixed} inside an optional node to whose children to limit the search
			 * @param {Boolean} append if set to true the results of this search are appended to the previous search
			 * @plugin search
			 * @trigger search.jstree
			 */
			this.search = function (str, skip_async, show_only_matches, inside, append, show_only_matches_children) {
				if (str === false || $.trim(str.toString()) === "") {
					return this.clear_search();
				}
				inside = this.get_node(inside);
				inside = inside && inside.id ? inside.id : null;
				str = str.toString();
				var s = this.settings.search,
					a = s.ajax ? s.ajax : false,
					m = this._model.data,
					f = null,
					r = [],
					p = [],
					i, j;
				if (this._data.search.res.length && !append) {
					this.clear_search();
				}
				if (show_only_matches === undefined) {
					show_only_matches = s.show_only_matches;
				}
				if (show_only_matches_children === undefined) {
					show_only_matches_children = s.show_only_matches_children;
				}
				if (!skip_async && a !== false) {
					if ($.isFunction(a)) {
						return a.call(this, str, $.proxy(function (d) {
							if (d && d.d) {
								d = d.d;
							}
							this._load_nodes(!$.isArray(d) ? [] : $.vakata.array_unique(d), function () {
								this.search(str, true, show_only_matches, inside, append, show_only_matches_children);
							});
						}, this), inside);
					} else {
						a = $.extend({}, a);
						if (!a.data) {
							a.data = {};
						}
						a.data.str = str;
						if (inside) {
							a.data.inside = inside;
						}
						if (this._data.search.lastRequest) {
							this._data.search.lastRequest.abort();
						}
						this._data.search.lastRequest = $.ajax(a)
							.fail($.proxy(function () {
								this._data.core.last_error = {
									'error': 'ajax',
									'plugin': 'search',
									'id': 'search_01',
									'reason': 'Could not load search parents',
									'data': JSON.stringify(a)
								};
								this.settings.core.error.call(this, this._data.core.last_error);
							}, this))
							.done($.proxy(function (d) {
								if (d && d.d) {
									d = d.d;
								}
								this._load_nodes(!$.isArray(d) ? [] : $.vakata.array_unique(d), function () {
									this.search(str, true, show_only_matches, inside, append, show_only_matches_children);
								});
							}, this));
						return this._data.search.lastRequest;
					}
				}
				if (!append) {
					this._data.search.str = str;
					this._data.search.dom = $();
					this._data.search.res = [];
					this._data.search.opn = [];
					this._data.search.som = show_only_matches;
					this._data.search.smc = show_only_matches_children;
				}

				f = new $.vakata.search(str, true, {
					caseSensitive: s.case_sensitive,
					fuzzy: s.fuzzy
				});
				$.each(m[inside ? inside : $.jstree.root].children_d, function (ii, i) {
					var v = m[i];
					if (v.text && !v.state.hidden && (!s.search_leaves_only || (v.state.loaded && v.children.length === 0)) && ((s.search_callback && s.search_callback.call(this, str, v)) || (!s.search_callback && f.search(v.text).isMatch))) {
						r.push(i);
						p = p.concat(v.parents);
					}
				});
				if (r.length) {
					p = $.vakata.array_unique(p);
					for (i = 0, j = p.length; i < j; i++) {
						if (p[i] !== $.jstree.root && m[p[i]] && this.open_node(p[i], null, 0) === true) {
							this._data.search.opn.push(p[i]);
						}
					}
					if (!append) {
						this._data.search.dom = $(this.element[0].querySelectorAll('#' + $.map(r, function (v) {
							return "0123456789".indexOf(v[0]) !== -1 ? '\\3' + v[0] + ' ' + v.substr(1).replace($.jstree.idregex, '\\$&') : v.replace($.jstree.idregex, '\\$&');
						}).join(', #')));
						this._data.search.res = r;
					} else {
						this._data.search.dom = this._data.search.dom.add($(this.element[0].querySelectorAll('#' + $.map(r, function (v) {
							return "0123456789".indexOf(v[0]) !== -1 ? '\\3' + v[0] + ' ' + v.substr(1).replace($.jstree.idregex, '\\$&') : v.replace($.jstree.idregex, '\\$&');
						}).join(', #'))));
						this._data.search.res = $.vakata.array_unique(this._data.search.res.concat(r));
					}
					this._data.search.dom.children(".jstree-anchor").addClass('jstree-search');
				}
				/**
				 * triggered after search is complete
				 * @event
				 * @name search.jstree
				 * @param {jQuery} nodes a jQuery collection of matching nodes
				 * @param {String} str the search string
				 * @param {Array} res a collection of objects represeing the matching nodes
				 * @plugin search
				 */
				this.trigger('search', {
					nodes: this._data.search.dom,
					str: str,
					res: this._data.search.res,
					show_only_matches: show_only_matches
				});
			};
			/**
			 * used to clear the last search (removes classes and shows all nodes if filtering is on)
			 * @name clear_search()
			 * @plugin search
			 * @trigger clear_search.jstree
			 */
			this.clear_search = function () {
				if (this.settings.search.close_opened_onclear) {
					this.close_node(this._data.search.opn, 0);
				}
				/**
				 * triggered after search is complete
				 * @event
				 * @name clear_search.jstree
				 * @param {jQuery} nodes a jQuery collection of matching nodes (the result from the last search)
				 * @param {String} str the search string (the last search string)
				 * @param {Array} res a collection of objects represeing the matching nodes (the result from the last search)
				 * @plugin search
				 */
				this.trigger('clear_search', {
					'nodes': this._data.search.dom,
					str: this._data.search.str,
					res: this._data.search.res
				});
				if (this._data.search.res.length) {
					this._data.search.dom = $(this.element[0].querySelectorAll('#' + $.map(this._data.search.res, function (v) {
						return "0123456789".indexOf(v[0]) !== -1 ? '\\3' + v[0] + ' ' + v.substr(1).replace($.jstree.idregex, '\\$&') : v.replace($.jstree.idregex, '\\$&');
					}).join(', #')));
					this._data.search.dom.children(".jstree-anchor").removeClass("jstree-search");
				}
				this._data.search.str = "";
				this._data.search.res = [];
				this._data.search.opn = [];
				this._data.search.dom = $();
			};

			this.redraw_node = function (obj, deep, callback, force_render) {
				obj = parent.redraw_node.apply(this, arguments);
				if (obj) {
					if ($.inArray(obj.id, this._data.search.res) !== -1) {
						var i, j, tmp = null;
						for (i = 0, j = obj.childNodes.length; i < j; i++) {
							if (obj.childNodes[i] && obj.childNodes[i].className && obj.childNodes[i].className.indexOf("jstree-anchor") !== -1) {
								tmp = obj.childNodes[i];
								break;
							}
						}
						if (tmp) {
							tmp.className += ' jstree-search';
						}
					}
				}
				return obj;
			};
		};

		// helpers
		(function ($) {
			// from http://kiro.me/projects/fuse.html
			$.vakata.search = function (pattern, txt, options) {
				options = options || {};
				options = $.extend({}, $.vakata.search.defaults, options);
				if (options.fuzzy !== false) {
					options.fuzzy = true;
				}
				pattern = options.caseSensitive ? pattern : pattern.toLowerCase();
				var MATCH_LOCATION = options.location,
					MATCH_DISTANCE = options.distance,
					MATCH_THRESHOLD = options.threshold,
					patternLen = pattern.length,
					matchmask, pattern_alphabet, match_bitapScore, search;
				if (patternLen > 32) {
					options.fuzzy = false;
				}
				if (options.fuzzy) {
					matchmask = 1 << (patternLen - 1);
					pattern_alphabet = (function () {
						var mask = {},
							i = 0;
						for (i = 0; i < patternLen; i++) {
							mask[pattern.charAt(i)] = 0;
						}
						for (i = 0; i < patternLen; i++) {
							mask[pattern.charAt(i)] |= 1 << (patternLen - i - 1);
						}
						return mask;
					}());
					match_bitapScore = function (e, x) {
						var accuracy = e / patternLen,
							proximity = Math.abs(MATCH_LOCATION - x);
						if (!MATCH_DISTANCE) {
							return proximity ? 1.0 : accuracy;
						}
						return accuracy + (proximity / MATCH_DISTANCE);
					};
				}
				search = function (text) {
					text = options.caseSensitive ? text : text.toLowerCase();
					if (pattern === text || text.indexOf(pattern) !== -1) {
						return {
							isMatch: true,
							score: 0
						};
					}
					if (!options.fuzzy) {
						return {
							isMatch: false,
							score: 1
						};
					}
					var i, j,
						textLen = text.length,
						scoreThreshold = MATCH_THRESHOLD,
						bestLoc = text.indexOf(pattern, MATCH_LOCATION),
						binMin, binMid,
						binMax = patternLen + textLen,
						lastRd, start, finish, rd, charMatch,
						score = 1,
						locations = [];
					if (bestLoc !== -1) {
						scoreThreshold = Math.min(match_bitapScore(0, bestLoc), scoreThreshold);
						bestLoc = text.lastIndexOf(pattern, MATCH_LOCATION + patternLen);
						if (bestLoc !== -1) {
							scoreThreshold = Math.min(match_bitapScore(0, bestLoc), scoreThreshold);
						}
					}
					bestLoc = -1;
					for (i = 0; i < patternLen; i++) {
						binMin = 0;
						binMid = binMax;
						while (binMin < binMid) {
							if (match_bitapScore(i, MATCH_LOCATION + binMid) <= scoreThreshold) {
								binMin = binMid;
							} else {
								binMax = binMid;
							}
							binMid = Math.floor((binMax - binMin) / 2 + binMin);
						}
						binMax = binMid;
						start = Math.max(1, MATCH_LOCATION - binMid + 1);
						finish = Math.min(MATCH_LOCATION + binMid, textLen) + patternLen;
						rd = new Array(finish + 2);
						rd[finish + 1] = (1 << i) - 1;
						for (j = finish; j >= start; j--) {
							charMatch = pattern_alphabet[text.charAt(j - 1)];
							if (i === 0) {
								rd[j] = ((rd[j + 1] << 1) | 1) & charMatch;
							} else {
								rd[j] = ((rd[j + 1] << 1) | 1) & charMatch | (((lastRd[j + 1] | lastRd[j]) << 1) | 1) | lastRd[j + 1];
							}
							if (rd[j] & matchmask) {
								score = match_bitapScore(i, j - 1);
								if (score <= scoreThreshold) {
									scoreThreshold = score;
									bestLoc = j - 1;
									locations.push(bestLoc);
									if (bestLoc > MATCH_LOCATION) {
										start = Math.max(1, 2 * MATCH_LOCATION - bestLoc);
									} else {
										break;
									}
								}
							}
						}
						if (match_bitapScore(i + 1, MATCH_LOCATION) > scoreThreshold) {
							break;
						}
						lastRd = rd;
					}
					return {
						isMatch: bestLoc >= 0,
						score: score
					};
				};
				return txt === true ? {
					'search': search
				} : search(txt);
			};
			$.vakata.search.defaults = {
				location: 0,
				distance: 100,
				threshold: 0.6,
				fuzzy: false,
				caseSensitive: false
			};
		}($));

		// include the search plugin by default
		// $.jstree.defaults.plugins.push("search");


		/**
		 * ### Sort plugin
		 *
		 * Automatically sorts all siblings in the tree according to a sorting function.
		 */

		/**
		 * the settings function used to sort the nodes.
		 * It is executed in the tree's context, accepts two nodes as arguments and should return `1` or `-1`.
		 * @name $.jstree.defaults.sort
		 * @plugin sort
		 */
		$.jstree.defaults.sort = function (a, b) {
			//return this.get_type(a) === this.get_type(b) ? (this.get_text(a) > this.get_text(b) ? 1 : -1) : this.get_type(a) >= this.get_type(b);
			return this.get_text(a) > this.get_text(b) ? 1 : -1;
		};
		$.jstree.plugins.sort = function (options, parent) {
			this.bind = function () {
				parent.bind.call(this);
				this.element
					.on("model.jstree", $.proxy(function (e, data) {
						this.sort(data.parent, true);
					}, this))
					.on("rename_node.jstree create_node.jstree", $.proxy(function (e, data) {
						this.sort(data.parent || data.node.parent, false);
						this.redraw_node(data.parent || data.node.parent, true);
					}, this))
					.on("move_node.jstree copy_node.jstree", $.proxy(function (e, data) {
						this.sort(data.parent, false);
						this.redraw_node(data.parent, true);
					}, this));
			};
			/**
			 * used to sort a node's children
			 * @private
			 * @name sort(obj [, deep])
			 * @param  {mixed} obj the node
			 * @param {Boolean} deep if set to `true` nodes are sorted recursively.
			 * @plugin sort
			 * @trigger search.jstree
			 */
			this.sort = function (obj, deep) {
				var i, j;
				obj = this.get_node(obj);
				if (obj && obj.children && obj.children.length) {
					obj.children.sort($.proxy(this.settings.sort, this));
					if (deep) {
						for (i = 0, j = obj.children_d.length; i < j; i++) {
							this.sort(obj.children_d[i], false);
						}
					}
				}
			};
		};

		// include the sort plugin by default
		// $.jstree.defaults.plugins.push("sort");

		/**
		 * ### State plugin
		 *
		 * Saves the state of the tree (selected nodes, opened nodes) on the user's computer using available options (localStorage, cookies, etc)
		 */

		var to = false;
		/**
		 * stores all defaults for the state plugin
		 * @name $.jstree.defaults.state
		 * @plugin state
		 */
		$.jstree.defaults.state = {
			/**
			 * A string for the key to use when saving the current tree (change if using multiple trees in your project). Defaults to `jstree`.
			 * @name $.jstree.defaults.state.key
			 * @plugin state
			 */
			key: 'jstree',
			/**
			 * A space separated list of events that trigger a state save. Defaults to `changed.jstree open_node.jstree close_node.jstree`.
			 * @name $.jstree.defaults.state.events
			 * @plugin state
			 */
			events: 'changed.jstree open_node.jstree close_node.jstree check_node.jstree uncheck_node.jstree',
			/**
			 * Time in milliseconds after which the state will expire. Defaults to 'false' meaning - no expire.
			 * @name $.jstree.defaults.state.ttl
			 * @plugin state
			 */
			ttl: false,
			/**
			 * A function that will be executed prior to restoring state with one argument - the state object. Can be used to clear unwanted parts of the state.
			 * @name $.jstree.defaults.state.filter
			 * @plugin state
			 */
			filter: false,
			/**
			 * Should loaded nodes be restored (setting this to true means that it is possible that the whole tree will be loaded for some users - use with caution). Defaults to `false`
			 * @name $.jstree.defaults.state.preserve_loaded
			 * @plugin state
			 */
			preserve_loaded: false
		};
		$.jstree.plugins.state = function (options, parent) {
			this.bind = function () {
				parent.bind.call(this);
				var bind = $.proxy(function () {
					this.element.on(this.settings.state.events, $.proxy(function () {
						if (to) {
							clearTimeout(to);
						}
						to = setTimeout($.proxy(function () {
							this.save_state();
						}, this), 100);
					}, this));
					/**
					 * triggered when the state plugin is finished restoring the state (and immediately after ready if there is no state to restore).
					 * @event
					 * @name state_ready.jstree
					 * @plugin state
					 */
					this.trigger('state_ready');
				}, this);
				this.element
					.on("ready.jstree", $.proxy(function (e, data) {
						this.element.one("restore_state.jstree", bind);
						if (!this.restore_state()) {
							bind();
						}
					}, this));
			};
			/**
			 * save the state
			 * @name save_state()
			 * @plugin state
			 */
			this.save_state = function () {
				var tm = this.get_state();
				if (!this.settings.state.preserve_loaded) {
					delete tm.core.loaded;
				}
				var st = {
					'state': tm,
					'ttl': this.settings.state.ttl,
					'sec': +(new Date())
				};
				$.vakata.storage.set(this.settings.state.key, JSON.stringify(st));
			};
			/**
			 * restore the state from the user's computer
			 * @name restore_state()
			 * @plugin state
			 */
			this.restore_state = function () {
				var k = $.vakata.storage.get(this.settings.state.key);
				if (!!k) {
					try {
						k = JSON.parse(k);
					} catch (ex) {
						return false;
					}
				}
				if (!!k && k.ttl && k.sec && +(new Date()) - k.sec > k.ttl) {
					return false;
				}
				if (!!k && k.state) {
					k = k.state;
				}
				if (!!k && $.isFunction(this.settings.state.filter)) {
					k = this.settings.state.filter.call(this, k);
				}
				if (!!k) {
					if (!this.settings.state.preserve_loaded) {
						delete k.core.loaded;
					}
					this.element.one("set_state.jstree", function (e, data) {
						data.instance.trigger('restore_state', {
							'state': $.extend(true, {}, k)
						});
					});
					this.set_state(k);
					return true;
				}
				return false;
			};
			/**
			 * clear the state on the user's computer
			 * @name clear_state()
			 * @plugin state
			 */
			this.clear_state = function () {
				return $.vakata.storage.del(this.settings.state.key);
			};
		};

		(function ($, undefined) {
			$.vakata.storage = {
				// simply specifying the functions in FF throws an error
				set: function (key, val) {
					return window.localStorage.setItem(key, val);
				},
				get: function (key) {
					return window.localStorage.getItem(key);
				},
				del: function (key) {
					return window.localStorage.removeItem(key);
				}
			};
		}($));

		// include the state plugin by default
		// $.jstree.defaults.plugins.push("state");

		/**
		 * ### Types plugin
		 *
		 * Makes it possible to add predefined types for groups of nodes, which make it possible to easily control nesting rules and icon for each group.
		 */

		/**
		 * An object storing all types as key value pairs, where the key is the type name and the value is an object that could contain following keys (all optional).
		 *
		 * * `max_children` the maximum number of immediate children this node type can have. Do not specify or set to `-1` for unlimited.
		 * * `max_depth` the maximum number of nesting this node type can have. A value of `1` would mean that the node can have children, but no grandchildren. Do not specify or set to `-1` for unlimited.
		 * * `valid_children` an array of node type strings, that nodes of this type can have as children. Do not specify or set to `-1` for no limits.
		 * * `icon` a string - can be a path to an icon or a className, if using an image that is in the current directory use a `./` prefix, otherwise it will be detected as a class. Omit to use the default icon from your theme.
		 * * `li_attr` an object of values which will be used to add HTML attributes on the resulting LI DOM node (merged with the node's own data)
		 * * `a_attr` an object of values which will be used to add HTML attributes on the resulting A DOM node (merged with the node's own data)
		 *
		 * There are two predefined types:
		 *
		 * * `#` represents the root of the tree, for example `max_children` would control the maximum number of root nodes.
		 * * `default` represents the default node - any settings here will be applied to all nodes that do not have a type specified.
		 *
		 * @name $.jstree.defaults.types
		 * @plugin types
		 */
		$.jstree.defaults.types = {
			'default': {}
		};
		$.jstree.defaults.types[$.jstree.root] = {};

		$.jstree.plugins.types = function (options, parent) {
			this.init = function (el, options) {
				var i, j;
				if (options && options.types && options.types['default']) {
					for (i in options.types) {
						if (i !== "default" && i !== $.jstree.root && options.types.hasOwnProperty(i)) {
							for (j in options.types['default']) {
								if (options.types['default'].hasOwnProperty(j) && options.types[i][j] === undefined) {
									options.types[i][j] = options.types['default'][j];
								}
							}
						}
					}
				}
				parent.init.call(this, el, options);
				this._model.data[$.jstree.root].type = $.jstree.root;
			};
			this.refresh = function (skip_loading, forget_state) {
				parent.refresh.call(this, skip_loading, forget_state);
				this._model.data[$.jstree.root].type = $.jstree.root;
			};
			this.bind = function () {
				this.element
					.on('model.jstree', $.proxy(function (e, data) {
						var m = this._model.data,
							dpc = data.nodes,
							t = this.settings.types,
							i, j, c = 'default',
							k;
						for (i = 0, j = dpc.length; i < j; i++) {
							c = 'default';
							if (m[dpc[i]].original && m[dpc[i]].original.type && t[m[dpc[i]].original.type]) {
								c = m[dpc[i]].original.type;
							}
							if (m[dpc[i]].data && m[dpc[i]].data.jstree && m[dpc[i]].data.jstree.type && t[m[dpc[i]].data.jstree.type]) {
								c = m[dpc[i]].data.jstree.type;
							}
							m[dpc[i]].type = c;
							if (m[dpc[i]].icon === true && t[c].icon !== undefined) {
								m[dpc[i]].icon = t[c].icon;
							}
							if (t[c].li_attr !== undefined && typeof t[c].li_attr === 'object') {
								for (k in t[c].li_attr) {
									if (t[c].li_attr.hasOwnProperty(k)) {
										if (k === 'id') {
											continue;
										} else if (m[dpc[i]].li_attr[k] === undefined) {
											m[dpc[i]].li_attr[k] = t[c].li_attr[k];
										} else if (k === 'class') {
											m[dpc[i]].li_attr['class'] = t[c].li_attr['class'] + ' ' + m[dpc[i]].li_attr['class'];
										}
									}
								}
							}
							if (t[c].a_attr !== undefined && typeof t[c].a_attr === 'object') {
								for (k in t[c].a_attr) {
									if (t[c].a_attr.hasOwnProperty(k)) {
										if (k === 'id') {
											continue;
										} else if (m[dpc[i]].a_attr[k] === undefined) {
											m[dpc[i]].a_attr[k] = t[c].a_attr[k];
										} else if (k === 'href' && m[dpc[i]].a_attr[k] === '#') {
											m[dpc[i]].a_attr['href'] = t[c].a_attr['href'];
										} else if (k === 'class') {
											m[dpc[i]].a_attr['class'] = t[c].a_attr['class'] + ' ' + m[dpc[i]].a_attr['class'];
										}
									}
								}
							}
						}
						m[$.jstree.root].type = $.jstree.root;
					}, this));
				parent.bind.call(this);
			};
			this.get_json = function (obj, options, flat) {
				var i, j,
					m = this._model.data,
					opt = options ? $.extend(true, {}, options, {
						no_id: false
					}) : {},
					tmp = parent.get_json.call(this, obj, opt, flat);
				if (tmp === false) {
					return false;
				}
				if ($.isArray(tmp)) {
					for (i = 0, j = tmp.length; i < j; i++) {
						tmp[i].type = tmp[i].id && m[tmp[i].id] && m[tmp[i].id].type ? m[tmp[i].id].type : "default";
						if (options && options.no_id) {
							delete tmp[i].id;
							if (tmp[i].li_attr && tmp[i].li_attr.id) {
								delete tmp[i].li_attr.id;
							}
							if (tmp[i].a_attr && tmp[i].a_attr.id) {
								delete tmp[i].a_attr.id;
							}
						}
					}
				} else {
					tmp.type = tmp.id && m[tmp.id] && m[tmp.id].type ? m[tmp.id].type : "default";
					if (options && options.no_id) {
						tmp = this._delete_ids(tmp);
					}
				}
				return tmp;
			};
			this._delete_ids = function (tmp) {
				if ($.isArray(tmp)) {
					for (var i = 0, j = tmp.length; i < j; i++) {
						tmp[i] = this._delete_ids(tmp[i]);
					}
					return tmp;
				}
				delete tmp.id;
				if (tmp.li_attr && tmp.li_attr.id) {
					delete tmp.li_attr.id;
				}
				if (tmp.a_attr && tmp.a_attr.id) {
					delete tmp.a_attr.id;
				}
				if (tmp.children && $.isArray(tmp.children)) {
					tmp.children = this._delete_ids(tmp.children);
				}
				return tmp;
			};
			this.check = function (chk, obj, par, pos, more) {
				if (parent.check.call(this, chk, obj, par, pos, more) === false) {
					return false;
				}
				obj = obj && obj.id ? obj : this.get_node(obj);
				par = par && par.id ? par : this.get_node(par);
				var m = obj && obj.id ? (more && more.origin ? more.origin : $.jstree.reference(obj.id)) : null,
					tmp, d, i, j;
				m = m && m._model && m._model.data ? m._model.data : null;
				switch (chk) {
					case "create_node":
					case "move_node":
					case "copy_node":
						if (chk !== 'move_node' || $.inArray(obj.id, par.children) === -1) {
							tmp = this.get_rules(par);
							if (tmp.max_children !== undefined && tmp.max_children !== -1 && tmp.max_children === par.children.length) {
								this._data.core.last_error = {
									'error': 'check',
									'plugin': 'types',
									'id': 'types_01',
									'reason': 'max_children prevents function: ' + chk,
									'data': JSON.stringify({
										'chk': chk,
										'pos': pos,
										'obj': obj && obj.id ? obj.id : false,
										'par': par && par.id ? par.id : false
									})
								};
								return false;
							}
							if (tmp.valid_children !== undefined && tmp.valid_children !== -1 && $.inArray((obj.type || 'default'), tmp.valid_children) === -1) {
								this._data.core.last_error = {
									'error': 'check',
									'plugin': 'types',
									'id': 'types_02',
									'reason': 'valid_children prevents function: ' + chk,
									'data': JSON.stringify({
										'chk': chk,
										'pos': pos,
										'obj': obj && obj.id ? obj.id : false,
										'par': par && par.id ? par.id : false
									})
								};
								return false;
							}
							if (m && obj.children_d && obj.parents) {
								d = 0;
								for (i = 0, j = obj.children_d.length; i < j; i++) {
									d = Math.max(d, m[obj.children_d[i]].parents.length);
								}
								d = d - obj.parents.length + 1;
							}
							if (d <= 0 || d === undefined) {
								d = 1;
							}
							do {
								if (tmp.max_depth !== undefined && tmp.max_depth !== -1 && tmp.max_depth < d) {
									this._data.core.last_error = {
										'error': 'check',
										'plugin': 'types',
										'id': 'types_03',
										'reason': 'max_depth prevents function: ' + chk,
										'data': JSON.stringify({
											'chk': chk,
											'pos': pos,
											'obj': obj && obj.id ? obj.id : false,
											'par': par && par.id ? par.id : false
										})
									};
									return false;
								}
								par = this.get_node(par.parent);
								tmp = this.get_rules(par);
								d++;
							} while (par);
						}
						break;
				}
				return true;
			};
			/**
			 * used to retrieve the type settings object for a node
			 * @name get_rules(obj)
			 * @param {mixed} obj the node to find the rules for
			 * @return {Object}
			 * @plugin types
			 */
			this.get_rules = function (obj) {
				obj = this.get_node(obj);
				if (!obj) {
					return false;
				}
				var tmp = this.get_type(obj, true);
				if (tmp.max_depth === undefined) {
					tmp.max_depth = -1;
				}
				if (tmp.max_children === undefined) {
					tmp.max_children = -1;
				}
				if (tmp.valid_children === undefined) {
					tmp.valid_children = -1;
				}
				return tmp;
			};
			/**
			 * used to retrieve the type string or settings object for a node
			 * @name get_type(obj [, rules])
			 * @param {mixed} obj the node to find the rules for
			 * @param {Boolean} rules if set to `true` instead of a string the settings object will be returned
			 * @return {String|Object}
			 * @plugin types
			 */
			this.get_type = function (obj, rules) {
				obj = this.get_node(obj);
				return (!obj) ? false : (rules ? $.extend({
					'type': obj.type
				}, this.settings.types[obj.type]) : obj.type);
			};
			/**
			 * used to change a node's type
			 * @name set_type(obj, type)
			 * @param {mixed} obj the node to change
			 * @param {String} type the new type
			 * @plugin types
			 */
			this.set_type = function (obj, type) {
				var m = this._model.data,
					t, t1, t2, old_type, old_icon, k, d, a;
				if ($.isArray(obj)) {
					obj = obj.slice();
					for (t1 = 0, t2 = obj.length; t1 < t2; t1++) {
						this.set_type(obj[t1], type);
					}
					return true;
				}
				t = this.settings.types;
				obj = this.get_node(obj);
				if (!t[type] || !obj) {
					return false;
				}
				d = this.get_node(obj, true);
				if (d && d.length) {
					a = d.children('.jstree-anchor');
				}
				old_type = obj.type;
				old_icon = this.get_icon(obj);
				obj.type = type;
				if (old_icon === true || !t[old_type] || (t[old_type].icon !== undefined && old_icon === t[old_type].icon)) {
					this.set_icon(obj, t[type].icon !== undefined ? t[type].icon : true);
				}

				// remove old type props
				if (t[old_type] && t[old_type].li_attr !== undefined && typeof t[old_type].li_attr === 'object') {
					for (k in t[old_type].li_attr) {
						if (t[old_type].li_attr.hasOwnProperty(k)) {
							if (k === 'id') {
								continue;
							} else if (k === 'class') {
								m[obj.id].li_attr['class'] = (m[obj.id].li_attr['class'] || '').replace(t[old_type].li_attr[k], '');
								if (d) {
									d.removeClass(t[old_type].li_attr[k]);
								}
							} else if (m[obj.id].li_attr[k] === t[old_type].li_attr[k]) {
								m[obj.id].li_attr[k] = null;
								if (d) {
									d.removeAttr(k);
								}
							}
						}
					}
				}
				if (t[old_type] && t[old_type].a_attr !== undefined && typeof t[old_type].a_attr === 'object') {
					for (k in t[old_type].a_attr) {
						if (t[old_type].a_attr.hasOwnProperty(k)) {
							if (k === 'id') {
								continue;
							} else if (k === 'class') {
								m[obj.id].a_attr['class'] = (m[obj.id].a_attr['class'] || '').replace(t[old_type].a_attr[k], '');
								if (a) {
									a.removeClass(t[old_type].a_attr[k]);
								}
							} else if (m[obj.id].a_attr[k] === t[old_type].a_attr[k]) {
								if (k === 'href') {
									m[obj.id].a_attr[k] = '#';
									if (a) {
										a.attr('href', '#');
									}
								} else {
									delete m[obj.id].a_attr[k];
									if (a) {
										a.removeAttr(k);
									}
								}
							}
						}
					}
				}

				// add new props
				if (t[type].li_attr !== undefined && typeof t[type].li_attr === 'object') {
					for (k in t[type].li_attr) {
						if (t[type].li_attr.hasOwnProperty(k)) {
							if (k === 'id') {
								continue;
							} else if (m[obj.id].li_attr[k] === undefined) {
								m[obj.id].li_attr[k] = t[type].li_attr[k];
								if (d) {
									if (k === 'class') {
										d.addClass(t[type].li_attr[k]);
									} else {
										d.attr(k, t[type].li_attr[k]);
									}
								}
							} else if (k === 'class') {
								m[obj.id].li_attr['class'] = t[type].li_attr[k] + ' ' + m[obj.id].li_attr['class'];
								if (d) {
									d.addClass(t[type].li_attr[k]);
								}
							}
						}
					}
				}
				if (t[type].a_attr !== undefined && typeof t[type].a_attr === 'object') {
					for (k in t[type].a_attr) {
						if (t[type].a_attr.hasOwnProperty(k)) {
							if (k === 'id') {
								continue;
							} else if (m[obj.id].a_attr[k] === undefined) {
								m[obj.id].a_attr[k] = t[type].a_attr[k];
								if (a) {
									if (k === 'class') {
										a.addClass(t[type].a_attr[k]);
									} else {
										a.attr(k, t[type].a_attr[k]);
									}
								}
							} else if (k === 'href' && m[obj.id].a_attr[k] === '#') {
								m[obj.id].a_attr['href'] = t[type].a_attr['href'];
								if (a) {
									a.attr('href', t[type].a_attr['href']);
								}
							} else if (k === 'class') {
								m[obj.id].a_attr['class'] = t[type].a_attr['class'] + ' ' + m[obj.id].a_attr['class'];
								if (a) {
									a.addClass(t[type].a_attr[k]);
								}
							}
						}
					}
				}

				return true;
			};
		};
		// include the types plugin by default
		// $.jstree.defaults.plugins.push("types");


		/**
		 * ### Unique plugin
		 *
		 * Enforces that no nodes with the same name can coexist as siblings.
		 */

		/**
		 * stores all defaults for the unique plugin
		 * @name $.jstree.defaults.unique
		 * @plugin unique
		 */
		$.jstree.defaults.unique = {
			/**
			 * Indicates if the comparison should be case sensitive. Default is `false`.
			 * @name $.jstree.defaults.unique.case_sensitive
			 * @plugin unique
			 */
			case_sensitive: false,
			/**
			 * Indicates if white space should be trimmed before the comparison. Default is `false`.
			 * @name $.jstree.defaults.unique.trim_whitespace
			 * @plugin unique
			 */
			trim_whitespace: false,
			/**
			 * A callback executed in the instance's scope when a new node is created and the name is already taken, the two arguments are the conflicting name and the counter. The default will produce results like `New node (2)`.
			 * @name $.jstree.defaults.unique.duplicate
			 * @plugin unique
			 */
			duplicate: function (name, counter) {
				return name + ' (' + counter + ')';
			}
		};

		$.jstree.plugins.unique = function (options, parent) {
			this.check = function (chk, obj, par, pos, more) {
				if (parent.check.call(this, chk, obj, par, pos, more) === false) {
					return false;
				}
				obj = obj && obj.id ? obj : this.get_node(obj);
				par = par && par.id ? par : this.get_node(par);
				if (!par || !par.children) {
					return true;
				}
				var n = chk === "rename_node" ? pos : obj.text,
					c = [],
					s = this.settings.unique.case_sensitive,
					w = this.settings.unique.trim_whitespace,
					m = this._model.data,
					i, j, t;
				for (i = 0, j = par.children.length; i < j; i++) {
					t = m[par.children[i]].text;
					if (!s) {
						t = t.toLowerCase();
					}
					if (w) {
						t = t.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, '');
					}
					c.push(t);
				}
				if (!s) {
					n = n.toLowerCase();
				}
				if (w) {
					n = n.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, '');
				}
				switch (chk) {
					case "delete_node":
						return true;
					case "rename_node":
						t = obj.text || '';
						if (!s) {
							t = t.toLowerCase();
						}
						if (w) {
							t = t.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, '');
						}
						i = ($.inArray(n, c) === -1 || (obj.text && t === n));
						if (!i) {
							this._data.core.last_error = {
								'error': 'check',
								'plugin': 'unique',
								'id': 'unique_01',
								'reason': 'Child with name ' + n + ' already exists. Preventing: ' + chk,
								'data': JSON.stringify({
									'chk': chk,
									'pos': pos,
									'obj': obj && obj.id ? obj.id : false,
									'par': par && par.id ? par.id : false
								})
							};
						}
						return i;
					case "create_node":
						i = ($.inArray(n, c) === -1);
						if (!i) {
							this._data.core.last_error = {
								'error': 'check',
								'plugin': 'unique',
								'id': 'unique_04',
								'reason': 'Child with name ' + n + ' already exists. Preventing: ' + chk,
								'data': JSON.stringify({
									'chk': chk,
									'pos': pos,
									'obj': obj && obj.id ? obj.id : false,
									'par': par && par.id ? par.id : false
								})
							};
						}
						return i;
					case "copy_node":
						i = ($.inArray(n, c) === -1);
						if (!i) {
							this._data.core.last_error = {
								'error': 'check',
								'plugin': 'unique',
								'id': 'unique_02',
								'reason': 'Child with name ' + n + ' already exists. Preventing: ' + chk,
								'data': JSON.stringify({
									'chk': chk,
									'pos': pos,
									'obj': obj && obj.id ? obj.id : false,
									'par': par && par.id ? par.id : false
								})
							};
						}
						return i;
					case "move_node":
						i = ((obj.parent === par.id && (!more || !more.is_multi)) || $.inArray(n, c) === -1);
						if (!i) {
							this._data.core.last_error = {
								'error': 'check',
								'plugin': 'unique',
								'id': 'unique_03',
								'reason': 'Child with name ' + n + ' already exists. Preventing: ' + chk,
								'data': JSON.stringify({
									'chk': chk,
									'pos': pos,
									'obj': obj && obj.id ? obj.id : false,
									'par': par && par.id ? par.id : false
								})
							};
						}
						return i;
				}
				return true;
			};
			this.create_node = function (par, node, pos, callback, is_loaded) {
				if (!node || node.text === undefined) {
					if (par === null) {
						par = $.jstree.root;
					}
					par = this.get_node(par);
					if (!par) {
						return parent.create_node.call(this, par, node, pos, callback, is_loaded);
					}
					pos = pos === undefined ? "last" : pos;
					if (!pos.toString().match(/^(before|after)$/) && !is_loaded && !this.is_loaded(par)) {
						return parent.create_node.call(this, par, node, pos, callback, is_loaded);
					}
					if (!node) {
						node = {};
					}
					var tmp, n, dpc, i, j, m = this._model.data,
						s = this.settings.unique.case_sensitive,
						w = this.settings.unique.trim_whitespace,
						cb = this.settings.unique.duplicate,
						t;
					n = tmp = this.get_string('New node');
					dpc = [];
					for (i = 0, j = par.children.length; i < j; i++) {
						t = m[par.children[i]].text;
						if (!s) {
							t = t.toLowerCase();
						}
						if (w) {
							t = t.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, '');
						}
						dpc.push(t);
					}
					i = 1;
					t = n;
					if (!s) {
						t = t.toLowerCase();
					}
					if (w) {
						t = t.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, '');
					}
					while ($.inArray(t, dpc) !== -1) {
						n = cb.call(this, tmp, (++i)).toString();
						t = n;
						if (!s) {
							t = t.toLowerCase();
						}
						if (w) {
							t = t.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, '');
						}
					}
					node.text = n;
				}
				return parent.create_node.call(this, par, node, pos, callback, is_loaded);
			};
		};

		// include the unique plugin by default
		// $.jstree.defaults.plugins.push("unique");


		/**
		 * ### Wholerow plugin
		 *
		 * Makes each node appear block level. Making selection easier. May cause slow down for large trees in old browsers.
		 */

		var div = document.createElement('DIV');
		div.setAttribute('unselectable', 'on');
		div.setAttribute('role', 'presentation');
		div.className = 'jstree-wholerow';
		div.innerHTML = '&#160;';
		$.jstree.plugins.wholerow = function (options, parent) {
			this.bind = function () {
				parent.bind.call(this);

				this.element
					.on('ready.jstree set_state.jstree', $.proxy(function () {
						this.hide_dots();
					}, this))
					.on("init.jstree loading.jstree ready.jstree", $.proxy(function () {
						//div.style.height = this._data.core.li_height + 'px';
						this.get_container_ul().addClass('jstree-wholerow-ul');
					}, this))
					.on("deselect_all.jstree", $.proxy(function (e, data) {
						this.element.find('.jstree-wholerow-clicked').removeClass('jstree-wholerow-clicked');
					}, this))
					.on("changed.jstree", $.proxy(function (e, data) {
						this.element.find('.jstree-wholerow-clicked').removeClass('jstree-wholerow-clicked');
						var tmp = false,
							i, j;
						for (i = 0, j = data.selected.length; i < j; i++) {
							tmp = this.get_node(data.selected[i], true);
							if (tmp && tmp.length) {
								tmp.children('.jstree-wholerow').addClass('jstree-wholerow-clicked');
							}
						}
					}, this))
					.on("open_node.jstree", $.proxy(function (e, data) {
						this.get_node(data.node, true).find('.jstree-clicked').parent().children('.jstree-wholerow').addClass('jstree-wholerow-clicked');
					}, this))
					.on("hover_node.jstree dehover_node.jstree", $.proxy(function (e, data) {
						if (e.type === "hover_node" && this.is_disabled(data.node)) {
							return;
						}
						this.get_node(data.node, true).children('.jstree-wholerow')[e.type === "hover_node" ? "addClass" : "removeClass"]('jstree-wholerow-hovered');
					}, this))
					.on("contextmenu.jstree", ".jstree-wholerow", $.proxy(function (e) {
						if (this._data.contextmenu) {
							e.preventDefault();
							var tmp = $.Event('contextmenu', {
								metaKey: e.metaKey,
								ctrlKey: e.ctrlKey,
								altKey: e.altKey,
								shiftKey: e.shiftKey,
								pageX: e.pageX,
								pageY: e.pageY
							});
							$(e.currentTarget).closest(".jstree-node").children(".jstree-anchor").first().trigger(tmp);
						}
					}, this))
					/*!
					.on("mousedown.jstree touchstart.jstree", ".jstree-wholerow", function (e) {
							if(e.target === e.currentTarget) {
								var a = $(e.currentTarget).closest(".jstree-node").children(".jstree-anchor");
								e.target = a[0];
								a.trigger(e);
							}
						})
					*/
					.on("click.jstree", ".jstree-wholerow", function (e) {
						e.stopImmediatePropagation();
						var tmp = $.Event('click', {
							metaKey: e.metaKey,
							ctrlKey: e.ctrlKey,
							altKey: e.altKey,
							shiftKey: e.shiftKey
						});
						$(e.currentTarget).closest(".jstree-node").children(".jstree-anchor").first().trigger(tmp).focus();
					})
					.on("dblclick.jstree", ".jstree-wholerow", function (e) {
						e.stopImmediatePropagation();
						var tmp = $.Event('dblclick', {
							metaKey: e.metaKey,
							ctrlKey: e.ctrlKey,
							altKey: e.altKey,
							shiftKey: e.shiftKey
						});
						$(e.currentTarget).closest(".jstree-node").children(".jstree-anchor").first().trigger(tmp).focus();
					})
					.on("click.jstree", ".jstree-leaf > .jstree-ocl", $.proxy(function (e) {
						e.stopImmediatePropagation();
						var tmp = $.Event('click', {
							metaKey: e.metaKey,
							ctrlKey: e.ctrlKey,
							altKey: e.altKey,
							shiftKey: e.shiftKey
						});
						$(e.currentTarget).closest(".jstree-node").children(".jstree-anchor").first().trigger(tmp).focus();
					}, this))
					.on("mouseover.jstree", ".jstree-wholerow, .jstree-icon", $.proxy(function (e) {
						e.stopImmediatePropagation();
						if (!this.is_disabled(e.currentTarget)) {
							this.hover_node(e.currentTarget);
						}
						return false;
					}, this))
					.on("mouseleave.jstree", ".jstree-node", $.proxy(function (e) {
						this.dehover_node(e.currentTarget);
					}, this));
			};
			this.teardown = function () {
				if (this.settings.wholerow) {
					this.element.find(".jstree-wholerow").remove();
				}
				parent.teardown.call(this);
			};
			this.redraw_node = function (obj, deep, callback, force_render) {
				obj = parent.redraw_node.apply(this, arguments);
				if (obj) {
					var tmp = div.cloneNode(true);
					//tmp.style.height = this._data.core.li_height + 'px';
					if ($.inArray(obj.id, this._data.core.selected) !== -1) {
						tmp.className += ' jstree-wholerow-clicked';
					}
					if (this._data.core.focused && this._data.core.focused === obj.id) {
						tmp.className += ' jstree-wholerow-hovered';
					}
					obj.insertBefore(tmp, obj.childNodes[0]);
				}
				return obj;
			};
		};
		// include the wholerow plugin by default
		// $.jstree.defaults.plugins.push("wholerow");
		if (document.registerElement && Object && Object.create) {
			var proto = Object.create(HTMLElement.prototype);
			proto.createdCallback = function () {
				var c = {
						core: {},
						plugins: []
					},
					i;
				for (i in $.jstree.plugins) {
					if ($.jstree.plugins.hasOwnProperty(i) && this.attributes[i]) {
						c.plugins.push(i);
						if (this.getAttribute(i) && JSON.parse(this.getAttribute(i))) {
							c[i] = JSON.parse(this.getAttribute(i));
						}
					}
				}
				for (i in $.jstree.defaults.core) {
					if ($.jstree.defaults.core.hasOwnProperty(i) && this.attributes[i]) {
						c.core[i] = JSON.parse(this.getAttribute(i)) || this.getAttribute(i);
					}
				}
				$(this).jstree(c);
			};
			// proto.attributeChangedCallback = function (name, previous, value) { };
			try {
				document.registerElement("vakata-jstree", {
					prototype: proto
				});
			} catch (ignore) {}
		}

	};// End of Jstree Container		
	jstreeContainer();


	//Start Selected Plugin for Datatables jpx
	
	/*! Select for DataTables 1.2.7
	 * 2015-2018 SpryMedia Ltd - datatables.net/license/mit
	 */

	/**
	 * @summary     Select for DataTables
	 * @description A collection of API methods, events and buttons for DataTables
	 *   that provides selection options of the items in a DataTable
	 * @version     1.2.7
	 * @file        dataTables.select.js
	 * @author      SpryMedia Ltd (www.sprymedia.co.uk)
	 * @contact     datatables.net/forums
	 * @copyright   Copyright 2015-2018 SpryMedia Ltd.
	 *
	 * This source file is free software, available under the following license:
	 *   MIT license - http://datatables.net/license/mit
	 *
	 * This source file is distributed in the hope that it will be useful, but
	 * WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY
	 * or FITNESS FOR A PARTICULAR PURPOSE. See the license files for details.
	 *
	 * For details please refer to: http://www.datatables.net/extensions/select
	 */

		//console.log("Trackeur 1");
		var DataTable = $.fn.dataTable;


		// Version information for debugger
		DataTable.select = {};

		DataTable.select.version = '1.2.7';

		DataTable.select.init = function (dt) {
			var ctx = dt.settings()[0];
			var init = ctx.oInit.select;
			var defaults = DataTable.defaults.select;
			var opts = init === undefined ?
				defaults :
				init;

			// Set defaults
			var items = 'row';
			var style = 'api';
			var blurable = false;
			var info = true;
			var selector = 'td, th';
			var className = 'selected';
			var setStyle = false;

			ctx._select = {};

			// Initialisation customisations
			if (opts === true) {
				style = 'os';
				setStyle = true;
			} else if (typeof opts === 'string') {
				style = opts;
				setStyle = true;
			} else if ($.isPlainObject(opts)) {
				if (opts.blurable !== undefined) {
					blurable = opts.blurable;
				}

				if (opts.info !== undefined) {
					info = opts.info;
				}

				if (opts.items !== undefined) {
					items = opts.items;
				}

				if (opts.style !== undefined) {
					style = opts.style;
					setStyle = true;
				}

				if (opts.selector !== undefined) {
					selector = opts.selector;
				}

				if (opts.className !== undefined) {
					className = opts.className;
				}
			}

			dt.select.selector(selector);
			dt.select.items(items);
			dt.select.style(style);
			dt.select.blurable(blurable);
			dt.select.info(info);
			ctx._select.className = className;


			// Sort table based on selected rows. Requires Select Datatables extension
			$.fn.dataTable.ext.order['select-checkbox'] = function (settings, col) {
				return this.api().column(col, {
					order: 'index'
				}).nodes().map(function (td) {
					if (settings._select.items === 'row') {
						return $(td).parent().hasClass(settings._select.className);
					} else if (settings._select.items === 'cell') {
						return $(td).hasClass(settings._select.className);
					}
					return false;
				});
			};

			// If the init options haven't enabled select, but there is a selectable
			// class name, then enable
			if (!setStyle && $(dt.table().node()).hasClass('selectable')) {
				dt.select.style('os');
			}
		};

		/*

		Select is a collection of API methods, event handlers, event emitters and
		buttons (for the `Buttons` extension) for DataTables. It provides the following
		features, with an overview of how they are implemented:

		## Selection of rows, columns and cells. Whether an item is selected or not is
		   stored in:

		* rows: a `_select_selected` property which contains a boolean value of the
		  DataTables' `aoData` object for each row
		* columns: a `_select_selected` property which contains a boolean value of the
		  DataTables' `aoColumns` object for each column
		* cells: a `_selected_cells` property which contains an array of boolean values
		  of the `aoData` object for each row. The array is the same length as the
		  columns array, with each element of it representing a cell.

		This method of using boolean flags allows Select to operate when nodes have not
		been created for rows / cells (DataTables' defer rendering feature).

		## API methods

		A range of API methods are available for triggering selection and de-selection
		of rows. Methods are also available to configure the selection events that can
		be triggered by an end user (such as which items are to be selected). To a large
		extent, these of API methods *is* Select. It is basically a collection of helper
		functions that can be used to select items in a DataTable.

		Configuration of select is held in the object `_select` which is attached to the
		DataTables settings object on initialisation. Select being available on a table
		is not optional when Select is loaded, but its default is for selection only to
		be available via the API - so the end user wouldn't be able to select rows
		without additional configuration.

		The `_select` object contains the following properties:

		```
		{
			items:string     - Can be `rows`, `columns` or `cells`. Defines what item 
			                   will be selected if the user is allowed to activate row
			                   selection using the mouse.
			style:string     - Can be `none`, `single`, `multi` or `os`. Defines the
			                   interaction style when selecting items
			blurable:boolean - If row selection can be cleared by clicking outside of
			                   the table
			info:boolean     - If the selection summary should be shown in the table
			                   information elements
		}
		```

		In addition to the API methods, Select also extends the DataTables selector
		options for rows, columns and cells adding a `selected` option to the selector
		options object, allowing the developer to select only selected items or
		unselected items.

		## Mouse selection of items

		Clicking on items can be used to select items. This is done by a simple event
		handler that will select the items using the API methods.

		 */


		/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
		 * Local functions
		 */

		/**
		 * Add one or more cells to the selection when shift clicking in OS selection
		 * style cell selection.
		 *
		 * Cell range is more complicated than row and column as we want to select
		 * in the visible grid rather than by index in sequence. For example, if you
		 * click first in cell 1-1 and then shift click in 2-2 - cells 1-2 and 2-1
		 * should also be selected (and not 1-3, 1-4. etc)
		 * 
		 * @param  {DataTable.Api} dt   DataTable
		 * @param  {object}        idx  Cell index to select to
		 * @param  {object}        last Cell index to select from
		 * @private
		 */
		function cellRange(dt, idx, last) {
			var indexes;
			var columnIndexes;
			var rowIndexes;
			var selectColumns = function (start, end) {
				if (start > end) {
					var tmp = end;
					end = start;
					start = tmp;
				}

				var record = false;
				return dt.columns(':visible').indexes().filter(function (i) {
					if (i === start) {
						record = true;
					}

					if (i === end) { // not else if, as start might === end
						record = false;
						return true;
					}

					return record;
				});
			};

			var selectRows = function (start, end) {
				var indexes = dt.rows({
					search: 'applied'
				}).indexes();

				// Which comes first - might need to swap
				if (indexes.indexOf(start) > indexes.indexOf(end)) {
					var tmp = end;
					end = start;
					start = tmp;
				}

				var record = false;
				return indexes.filter(function (i) {
					if (i === start) {
						record = true;
					}

					if (i === end) {
						record = false;
						return true;
					}

					return record;
				});
			};

			if (!dt.cells({
					selected: true
				}).any() && !last) {
				// select from the top left cell to this one
				columnIndexes = selectColumns(0, idx.column);
				rowIndexes = selectRows(0, idx.row);
			} else {
				// Get column indexes between old and new
				columnIndexes = selectColumns(last.column, idx.column);
				rowIndexes = selectRows(last.row, idx.row);
			}

			indexes = dt.cells(rowIndexes, columnIndexes).flatten();

			if (!dt.cells(idx, {
					selected: true
				}).any()) {
				// Select range
				dt.cells(indexes).select();
			} else {
				// Deselect range
				dt.cells(indexes).deselect();
			}
		}

		/**
		 * Disable mouse selection by removing the selectors
		 *
		 * @param {DataTable.Api} dt DataTable to remove events from
		 * @private
		 */
		function disableMouseSelection(dt) {
			var ctx = dt.settings()[0];
			var selector = ctx._select.selector;

			$(dt.table().container())
				.off('mousedown.dtSelect', selector)
				.off('mouseup.dtSelect', selector)
				.off('click.dtSelect', selector);

			$('body').off('click.dtSelect' + dt.table().node().id);
		}

		/**
		 * Attach mouse listeners to the table to allow mouse selection of items
		 *
		 * @param {DataTable.Api} dt DataTable to remove events from
		 * @private
		 */
		function enableMouseSelection(dt) {
			var container = $(dt.table().container());
			var ctx = dt.settings()[0];
			var selector = ctx._select.selector;
			var matchSelection;

			container
				.on('mousedown.dtSelect', selector, function (e) {
					// Disallow text selection for shift clicking on the table so multi
					// element selection doesn't look terrible!
					if (e.shiftKey || e.metaKey || e.ctrlKey) {
						container
							.css('-moz-user-select', 'none')
							.one('selectstart.dtSelect', selector, function () {
								return false;
							});
					}

					if (window.getSelection) {
						matchSelection = window.getSelection();
					}
				})
				.on('mouseup.dtSelect', selector, function () {
					// Allow text selection to occur again, Mozilla style (tested in FF
					// 35.0.1 - still required)
					container.css('-moz-user-select', '');
				})
				.on('click.dtSelect', selector, function (e) {
					var items = dt.select.items();
					var idx;

					// If text was selected (click and drag), then we shouldn't change
					// the row's selected state
					if (window.getSelection) {
						var selection = window.getSelection();

						// If the element that contains the selection is not in the table, we can ignore it
						// This can happen if the developer selects text from the click event
						if (!selection.anchorNode || $(selection.anchorNode).closest('table')[0] === dt.table().node()) {
							if (selection !== matchSelection) {
								return;
							}
						}
					}

					var ctx = dt.settings()[0];
					var wrapperClass = dt.settings()[0].oClasses.sWrapper.replace(/ /g, '.');

					// Ignore clicks inside a sub-table
					if ($(e.target).closest('div.' + wrapperClass)[0] != dt.table().container()) {
						return;
					}

					var cell = dt.cell($(e.target).closest('td, th'));

					// Check the cell actually belongs to the host DataTable (so child
					// rows, etc, are ignored)
					if (!cell.any()) {
						return;
					}

					var event = $.Event('user-select.dt');
					eventTrigger(dt, event, [items, cell, e]);

					if (event.isDefaultPrevented()) {
						return;
					}

					var cellIndex = cell.index();
					if (items === 'row') {
						idx = cellIndex.row;
						typeSelect(e, dt, ctx, 'row', idx);
					} else if (items === 'column') {
						idx = cell.index().column;
						typeSelect(e, dt, ctx, 'column', idx);
					} else if (items === 'cell') {
						idx = cell.index();
						typeSelect(e, dt, ctx, 'cell', idx);
					}

					ctx._select_lastCell = cellIndex;
				});

			// Blurable
			$('body').on('click.dtSelect' + dt.table().node().id, function (e) {
				if (ctx._select.blurable) {
					// If the click was inside the DataTables container, don't blur
					if ($(e.target).parents().filter(dt.table().container()).length) {
						return;
					}

					// Ignore elements which have been removed from the DOM (i.e. paging
					// buttons)
					if ($(e.target).parents('html').length === 0) {
						return;
					}

					// Don't blur in Editor form
					if ($(e.target).parents('div.DTE').length) {
						return;
					}

					clear(ctx, true);
				}
			});
		}

		/**
		 * Trigger an event on a DataTable
		 *
		 * @param {DataTable.Api} api      DataTable to trigger events on
		 * @param  {boolean}      selected true if selected, false if deselected
		 * @param  {string}       type     Item type acting on
		 * @param  {boolean}      any      Require that there are values before
		 *     triggering
		 * @private
		 */
		function eventTrigger(api, type, args, any) {
			if (any && !api.flatten().length) {
				return;
			}

			if (typeof type === 'string') {
				type = type + '.dt';
			}

			args.unshift(api);

			$(api.table().node()).trigger(type, args);
		}

		/**
		 * Update the information element of the DataTable showing information about the
		 * items selected. This is done by adding tags to the existing text
		 * 
		 * @param {DataTable.Api} api DataTable to update
		 * @private
		 */
		function info(api) {
			var ctx = api.settings()[0];

			if (!ctx._select.info || !ctx.aanFeatures.i) {
				return;
			}

			if (api.select.style() === 'api') {
				return;
			}

			var rows = api.rows({
				selected: true
			}).flatten().length;
			var columns = api.columns({
				selected: true
			}).flatten().length;
			var cells = api.cells({
				selected: true
			}).flatten().length;

			var add = function (el, name, num) {
				el.append($('<span class="select-item"/>').append(api.i18n(
					'select.' + name + 's', {
						_: '%d ' + name + 's selected',
						0: '',
						1: '1 ' + name + ' selected'
					},
					num
				)));
			};

			// Internal knowledge of DataTables to loop over all information elements
			$.each(ctx.aanFeatures.i, function (i, el) {
				el = $(el);

				var output = $('<span class="select-info"/>');
				add(output, 'row', rows);
				add(output, 'column', columns);
				add(output, 'cell', cells);

				var exisiting = el.children('span.select-info');
				if (exisiting.length) {
					exisiting.remove();
				}

				if (output.text() !== '') {
					el.append(output);
				}
			});
		}

		/**
		 * Initialisation of a new table. Attach event handlers and callbacks to allow
		 * Select to operate correctly.
		 *
		 * This will occur _after_ the initial DataTables initialisation, although
		 * before Ajax data is rendered, if there is ajax data
		 *
		 * @param  {DataTable.settings} ctx Settings object to operate on
		 * @private
		 */
		function init(ctx) {
			var api = new DataTable.Api(ctx);

			// Row callback so that classes can be added to rows and cells if the item
			// was selected before the element was created. This will happen with the
			// `deferRender` option enabled.
			// 
			// This method of attaching to `aoRowCreatedCallback` is a hack until
			// DataTables has proper events for row manipulation If you are reviewing
			// this code to create your own plug-ins, please do not do this!
			ctx.aoRowCreatedCallback.push({
				fn: function (row, data, index) {
					var i, ien;
					var d = ctx.aoData[index];

					// Row
					if (d._select_selected) {
						$(row).addClass(ctx._select.className);
					}

					// Cells and columns - if separated out, we would need to do two
					// loops, so it makes sense to combine them into a single one
					for (i = 0, ien = ctx.aoColumns.length; i < ien; i++) {
						if (ctx.aoColumns[i]._select_selected || (d._selected_cells && d._selected_cells[i])) {
							$(d.anCells[i]).addClass(ctx._select.className);
						}
					}
				},
				sName: 'select-deferRender'
			});

			// On Ajax reload we want to reselect all rows which are currently selected,
			// if there is an rowId (i.e. a unique value to identify each row with)
			api.on('preXhr.dt.dtSelect', function () {
				// note that column selection doesn't need to be cached and then
				// reselected, as they are already selected
				var rows = api.rows({
					selected: true
				}).ids(true).filter(function (d) {
					return d !== undefined;
				});

				var cells = api.cells({
					selected: true
				}).eq(0).map(function (cellIdx) {
					var id = api.row(cellIdx.row).id(true);
					return id ? {
							row: id,
							column: cellIdx.column
						} :
						undefined;
				}).filter(function (d) {
					return d !== undefined;
				});

				// On the next draw, reselect the currently selected items
				api.one('draw.dt.dtSelect', function () {
					api.rows(rows).select();

					// `cells` is not a cell index selector, so it needs a loop
					if (cells.any()) {
						cells.each(function (id) {
							api.cells(id.row, id.column).select();
						});
					}
				});
			});

			// Update the table information element with selected item summary
			api.on('draw.dtSelect.dt select.dtSelect.dt deselect.dtSelect.dt info.dt', function () {
				info(api);
			});

			// Clean up and release
			api.on('destroy.dtSelect', function () {
				disableMouseSelection(api);
				api.off('.dtSelect');
			});
		}

		/**
		 * Add one or more items (rows or columns) to the selection when shift clicking
		 * in OS selection style
		 *
		 * @param  {DataTable.Api} dt   DataTable
		 * @param  {string}        type Row or column range selector
		 * @param  {object}        idx  Item index to select to
		 * @param  {object}        last Item index to select from
		 * @private
		 */
		function rowColumnRange(dt, type, idx, last) {
			// Add a range of rows from the last selected row to this one
			var indexes = dt[type + 's']({
				search: 'applied'
			}).indexes();
			var idx1 = $.inArray(last, indexes);
			var idx2 = $.inArray(idx, indexes);

			if (!dt[type + 's']({
					selected: true
				}).any() && idx1 === -1) {
				// select from top to here - slightly odd, but both Windows and Mac OS
				// do this
				indexes.splice($.inArray(idx, indexes) + 1, indexes.length);
			} else {
				// reverse so we can shift click 'up' as well as down
				if (idx1 > idx2) {
					var tmp = idx2;
					idx2 = idx1;
					idx1 = tmp;
				}

				indexes.splice(idx2 + 1, indexes.length);
				indexes.splice(0, idx1);
			}

			if (!dt[type](idx, {
					selected: true
				}).any()) {
				// Select range
				dt[type + 's'](indexes).select();
			} else {
				// Deselect range - need to keep the clicked on row selected
				indexes.splice($.inArray(idx, indexes), 1);
				dt[type + 's'](indexes).deselect();
			}
		}

		/**
		 * Clear all selected items
		 *
		 * @param  {DataTable.settings} ctx Settings object of the host DataTable
		 * @param  {boolean} [force=false] Force the de-selection to happen, regardless
		 *     of selection style
		 * @private
		 */
		function clear(ctx, force) {
			if (force || ctx._select.style === 'single') {
				var api = new DataTable.Api(ctx);

				api.rows({
					selected: true
				}).deselect();
				api.columns({
					selected: true
				}).deselect();
				api.cells({
					selected: true
				}).deselect();
			}
		}

		/**
		 * Select items based on the current configuration for style and items.
		 *
		 * @param  {object}             e    Mouse event object
		 * @param  {DataTables.Api}     dt   DataTable
		 * @param  {DataTable.settings} ctx  Settings object of the host DataTable
		 * @param  {string}             type Items to select
		 * @param  {int|object}         idx  Index of the item to select
		 * @private
		 */
		function typeSelect(e, dt, ctx, type, idx) {
			var style = dt.select.style();
			var isSelected = dt[type](idx, {
				selected: true
			}).any();

			if (style === 'os') {
				if (e.ctrlKey || e.metaKey) {
					// Add or remove from the selection
					dt[type](idx).select(!isSelected);
				} else if (e.shiftKey) {
					if (type === 'cell') {
						cellRange(dt, idx, ctx._select_lastCell || null);
					} else {
						rowColumnRange(dt, type, idx, ctx._select_lastCell ?
							ctx._select_lastCell[type] :
							null
						);
					}
				} else {
					// No cmd or shift click - deselect if selected, or select
					// this row only
					var selected = dt[type + 's']({
						selected: true
					});

					if (isSelected && selected.flatten().length === 1) {
						dt[type](idx).deselect();
					} else {
						selected.deselect();
						dt[type](idx).select();
					}
				}
			} else if (style == 'multi+shift') {
				if (e.shiftKey) {
					if (type === 'cell') {
						cellRange(dt, idx, ctx._select_lastCell || null);
					} else {
						rowColumnRange(dt, type, idx, ctx._select_lastCell ?
							ctx._select_lastCell[type] :
							null
						);
					}
				} else {
					dt[type](idx).select(!isSelected);
				}
			} else {
				dt[type](idx).select(!isSelected);
			}
		}



		/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
		 * DataTables selectors
		 */

		// row and column are basically identical just assigned to different properties
		// and checking a different array, so we can dynamically create the functions to
		// reduce the code size
		$.each([{
				type: 'row',
				prop: 'aoData'
			},
			{
				type: 'column',
				prop: 'aoColumns'
			}
		], function (i, o) {
			DataTable.ext.selector[o.type].push(function (settings, opts, indexes) {
				var selected = opts.selected;
				var data;
				var out = [];

				if (selected !== true && selected !== false) {
					return indexes;
				}

				for (var i = 0, ien = indexes.length; i < ien; i++) {
					data = settings[o.prop][indexes[i]];

					if ((selected === true && data._select_selected === true) ||
						(selected === false && !data._select_selected)
					) {
						out.push(indexes[i]);
					}
				}

				return out;
			});
		});

		DataTable.ext.selector.cell.push(function (settings, opts, cells) {
			var selected = opts.selected;
			var rowData;
			var out = [];

			if (selected === undefined) {
				return cells;
			}

			for (var i = 0, ien = cells.length; i < ien; i++) {
				rowData = settings.aoData[cells[i].row];

				if ((selected === true && rowData._selected_cells && rowData._selected_cells[cells[i].column] === true) ||
					(selected === false && (!rowData._selected_cells || !rowData._selected_cells[cells[i].column]))
				) {
					out.push(cells[i]);
				}
			}

			return out;
		});



		/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
		 * DataTables API
		 *
		 * For complete documentation, please refer to the docs/api directory or the
		 * DataTables site
		 */

		// Local variables to improve compression
		var apiRegister = DataTable.Api.register;
		var apiRegisterPlural = DataTable.Api.registerPlural;

		apiRegister('select()', function () {
			return this.iterator('table', function (ctx) {
				DataTable.select.init(new DataTable.Api(ctx));
			});
		});

		apiRegister('select.blurable()', function (flag) {
			if (flag === undefined) {
				return this.context[0]._select.blurable;
			}

			return this.iterator('table', function (ctx) {
				ctx._select.blurable = flag;
			});
		});

		apiRegister('select.info()', function (flag) {
			if (info === undefined) {
				return this.context[0]._select.info;
			}

			return this.iterator('table', function (ctx) {
				ctx._select.info = flag;
			});
		});

		apiRegister('select.items()', function (items) {
			if (items === undefined) {
				return this.context[0]._select.items;
			}

			return this.iterator('table', function (ctx) {
				ctx._select.items = items;

				eventTrigger(new DataTable.Api(ctx), 'selectItems', [items]);
			});
		});

		// Takes effect from the _next_ selection. None disables future selection, but
		// does not clear the current selection. Use the `deselect` methods for that
		apiRegister('select.style()', function (style) {
			if (style === undefined) {
				return this.context[0]._select.style;
			}

			return this.iterator('table', function (ctx) {
				ctx._select.style = style;

				if (!ctx._select_init) {
					init(ctx);
				}

				// Add / remove mouse event handlers. They aren't required when only
				// API selection is available
				var dt = new DataTable.Api(ctx);
				disableMouseSelection(dt);

				if (style !== 'api') {
					enableMouseSelection(dt);
				}

				eventTrigger(new DataTable.Api(ctx), 'selectStyle', [style]);
			});
		});

		apiRegister('select.selector()', function (selector) {
			if (selector === undefined) {
				return this.context[0]._select.selector;
			}

			return this.iterator('table', function (ctx) {
				disableMouseSelection(new DataTable.Api(ctx));

				ctx._select.selector = selector;

				if (ctx._select.style !== 'api') {
					enableMouseSelection(new DataTable.Api(ctx));
				}
			});
		});



		apiRegisterPlural('rows().select()', 'row().select()', function (select) {
			var api = this;

			if (select === false) {
				return this.deselect();
			}

			this.iterator('row', function (ctx, idx) {
				clear(ctx);

				ctx.aoData[idx]._select_selected = true;
				$(ctx.aoData[idx].nTr).addClass(ctx._select.className);
			});

			this.iterator('table', function (ctx, i) {
				eventTrigger(api, 'select', ['row', api[i]], true);
			});

			return this;
		});

		apiRegisterPlural('columns().select()', 'column().select()', function (select) {
			var api = this;

			if (select === false) {
				return this.deselect();
			}

			this.iterator('column', function (ctx, idx) {
				clear(ctx);

				ctx.aoColumns[idx]._select_selected = true;

				var column = new DataTable.Api(ctx).column(idx);

				$(column.header()).addClass(ctx._select.className);
				$(column.footer()).addClass(ctx._select.className);

				column.nodes().to$().addClass(ctx._select.className);
			});

			this.iterator('table', function (ctx, i) {
				eventTrigger(api, 'select', ['column', api[i]], true);
			});

			return this;
		});

		apiRegisterPlural('cells().select()', 'cell().select()', function (select) {
			var api = this;

			if (select === false) {
				return this.deselect();
			}

			this.iterator('cell', function (ctx, rowIdx, colIdx) {
				clear(ctx);

				var data = ctx.aoData[rowIdx];

				if (data._selected_cells === undefined) {
					data._selected_cells = [];
				}

				data._selected_cells[colIdx] = true;

				if (data.anCells) {
					$(data.anCells[colIdx]).addClass(ctx._select.className);
				}
			});

			this.iterator('table', function (ctx, i) {
				eventTrigger(api, 'select', ['cell', api[i]], true);
			});

			return this;
		});


		apiRegisterPlural('rows().deselect()', 'row().deselect()', function () {
			var api = this;

			this.iterator('row', function (ctx, idx) {
				ctx.aoData[idx]._select_selected = false;
				$(ctx.aoData[idx].nTr).removeClass(ctx._select.className);
			});

			this.iterator('table', function (ctx, i) {
				eventTrigger(api, 'deselect', ['row', api[i]], true);
			});

			return this;
		});

		apiRegisterPlural('columns().deselect()', 'column().deselect()', function () {
			var api = this;

			this.iterator('column', function (ctx, idx) {
				ctx.aoColumns[idx]._select_selected = false;

				var api = new DataTable.Api(ctx);
				var column = api.column(idx);

				$(column.header()).removeClass(ctx._select.className);
				$(column.footer()).removeClass(ctx._select.className);

				// Need to loop over each cell, rather than just using
				// `column().nodes()` as cells which are individually selected should
				// not have the `selected` class removed from them
				api.cells(null, idx).indexes().each(function (cellIdx) {
					var data = ctx.aoData[cellIdx.row];
					var cellSelected = data._selected_cells;

					if (data.anCells && (!cellSelected || !cellSelected[cellIdx.column])) {
						$(data.anCells[cellIdx.column]).removeClass(ctx._select.className);
					}
				});
			});

			this.iterator('table', function (ctx, i) {
				eventTrigger(api, 'deselect', ['column', api[i]], true);
			});

			return this;
		});

		apiRegisterPlural('cells().deselect()', 'cell().deselect()', function () {
			var api = this;

			this.iterator('cell', function (ctx, rowIdx, colIdx) {
				var data = ctx.aoData[rowIdx];

				data._selected_cells[colIdx] = false;

				// Remove class only if the cells exist, and the cell is not column
				// selected, in which case the class should remain (since it is selected
				// in the column)
				if (data.anCells && !ctx.aoColumns[colIdx]._select_selected) {
					$(data.anCells[colIdx]).removeClass(ctx._select.className);
				}
			});

			this.iterator('table', function (ctx, i) {
				eventTrigger(api, 'deselect', ['cell', api[i]], true);
			});

			return this;
		});



		/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
		 * Buttons
		 */
		function i18n(label, def) {
			return function (dt) {
				return dt.i18n('buttons.' + label, def);
			};
		}

		// Common events with suitable namespaces
		function namespacedEvents(config) {
			var unique = config._eventNamespace;

			return 'draw.dt.DT' + unique + ' select.dt.DT' + unique + ' deselect.dt.DT' + unique;
		}

		function enabled(dt, config) {
			if ($.inArray('rows', config.limitTo) !== -1 && dt.rows({
					selected: true
				}).any()) {
				return true;
			}

			if ($.inArray('columns', config.limitTo) !== -1 && dt.columns({
					selected: true
				}).any()) {
				return true;
			}

			if ($.inArray('cells', config.limitTo) !== -1 && dt.cells({
					selected: true
				}).any()) {
				return true;
			}

			return false;
		}

		var _buttonNamespace = 0;

		$.extend(DataTable.ext.buttons, {
			selected: {
				text: i18n('selected', 'Selected'),
				className: 'buttons-selected',
				limitTo: ['rows', 'columns', 'cells'],
				init: function (dt, node, config) {
					var that = this;
					config._eventNamespace = '.select' + (_buttonNamespace++);

					// .DT namespace listeners are removed by DataTables automatically
					// on table destroy
					dt.on(namespacedEvents(config), function () {
						that.enable(enabled(dt, config));
					});

					this.disable();
				},
				destroy: function (dt, node, config) {
					dt.off(config._eventNamespace);
				}
			},
			selectedSingle: {
				text: i18n('selectedSingle', 'Selected single'),
				className: 'buttons-selected-single',
				init: function (dt, node, config) {
					var that = this;
					config._eventNamespace = '.select' + (_buttonNamespace++);

					dt.on(namespacedEvents(config), function () {
						var count = dt.rows({
								selected: true
							}).flatten().length +
							dt.columns({
								selected: true
							}).flatten().length +
							dt.cells({
								selected: true
							}).flatten().length;

						that.enable(count === 1);
					});

					this.disable();
				},
				destroy: function (dt, node, config) {
					dt.off(config._eventNamespace);
				}
			},
			selectAll: {
				text: i18n('selectAll', 'Select all'),
				className: 'buttons-select-all',
				action: function () {
					var items = this.select.items();
					this[items + 's']().select();
				}
			},
			selectNone: {
				text: i18n('selectNone', 'Deselect all'),
				className: 'buttons-select-none',
				action: function () {
					clear(this.settings()[0], true);
				},
				init: function (dt, node, config) {
					var that = this;
					config._eventNamespace = '.select' + (_buttonNamespace++);

					dt.on(namespacedEvents(config), function () {
						var count = dt.rows({
								selected: true
							}).flatten().length +
							dt.columns({
								selected: true
							}).flatten().length +
							dt.cells({
								selected: true
							}).flatten().length;

						that.enable(count > 0);
					});

					this.disable();
				},
				destroy: function (dt, node, config) {
					dt.off(config._eventNamespace);
				}
			}
		});

		$.each(['Row', 'Column', 'Cell'], function (i, item) {
			var lc = item.toLowerCase();

			DataTable.ext.buttons['select' + item + 's'] = {
				text: i18n('select' + item + 's', 'Select ' + lc + 's'),
				className: 'buttons-select-' + lc + 's',
				action: function () {
					this.select.items(lc);
				},
				init: function (dt) {
					var that = this;

					dt.on('selectItems.dt.DT', function (e, ctx, items) {
						that.active(items === lc);
					});
				}
			};
		});



		/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
		 * Initialisation
		 */

		// DataTables creation - check if select has been defined in the options. Note
		// this required that the table be in the document! If it isn't then something
		// needs to trigger this method unfortunately. The next major release of
		// DataTables will rework the events and address this.
		$(document).on('preInit.dt.dtSelect', function (e, ctx) {
			if (e.namespace !== 'dt') {
				return;
			}

			DataTable.select.init(new DataTable.Api(ctx));
		});

	//End of Selected Plugin for Datatables

	//Plugin Context Menu 2
		function contexMenuContainer($){
			"use strict";

			/*
			 *               jQuery ContextMenu v. 1.0.0
			 *
			 *                Written by Bilotta Matteo.
			 *
			 *     Copyright © 2017, Bylothink. All rights reserved.
			 */

			// Checking if jQuery is available...
			if (typeof jQuery === "undefined") {
				throw new Error("$ is required by ContextMenu to be executed.");
			} else if (typeof Tether === "undefined") {
				throw new Error("Tether is required by ContextMenu to be executed.");
			}

			(function ($, Tether, window) {
				"use strict";
				// Single instance private constants:

				var DEFAULT_OPTS = {

					items: []
				};

				var PREFIX = "cnxt-";
				var CURSOR_ID = PREFIX + "cursor";

				var ATTACHMENTS = {

					MAIN_MENU: "bottom left",
					SUB_MENU: "top right"
				};

				// Single instance private properties:
				var _context = void 0;
				var _contextMenu = void 0;
				var _cursor = void 0;
				var _target = void 0;

				// Instance indipendent private methods:
				var _append = function _append(obj) {
					$("body").append(obj);
				};

				var _init = function _init() {
					_context = $(window);
					_cursor = $('<div id="' + CURSOR_ID + '"></div>');

					_append(_cursor);
				};

				var _isUndefined = function _isUndefined(obj) {
					return obj === undefined || typeof obj === "undefined";
				};

				var _onCloseEvent = function _onCloseEvent() {
					if (_isUndefined(_contextMenu) === false) {
						_contextMenu.close();
					}
				};

				var _updateCursor = function _updateCursor(e) {
					_cursor.css({
						left: e.pageX,
						top: e.pageY
					});
				};

				// Classes:
				var Item = function Item(properties, subMenu) {
					// Private properties:
					var _this = this;
					var _subMenu = subMenu;

					var _$Object = void 0;

					// Private methods:
					var _enableEvents = function _enableEvents() {
						if (properties.type === "item") {
							_$Object.on("click", _onClick);
						} else if (properties.type === "submenu") {
							_$Object.on("mouseenter", _onMouseEnter);
							_$Object.on("mouseleave", _onMouseLeave);
						}
					};

					var _init = function _init() {
						_$Object = _render();

						_append(_$Object);
						_enableEvents();
					};

					var _onClick = function _onClick(e) {
						if (_isUndefined(properties.action) === false) {
							var _haveToClose = properties.action.call(_target, properties, e);

							if (_haveToClose !== false) {
								_contextMenu.close();
							}
						}

						e.preventDefault();
						e.stopPropagation();
					};

					var _onMouseEnter = function _onMouseEnter(e) {
						_subMenu.open();

						e.preventDefault();
						e.stopPropagation();
					};
					var _onMouseLeave = function _onMouseLeave(e) {
						_subMenu.close();

						e.preventDefault();
						e.stopPropagation();
					};

					var _render = function _render() {
						var _item = $('<li></li>');

						if (properties.type === "title") {
							_item.addClass("dropdown-header");
							_item.html(properties.text);
						} else if (properties.type === "divider") {
							_item.addClass("divider");
							_item.attr("role", "separator");
						} else if (properties.type === "item" || properties.type === "submenu") {
							var _link = $('<a></a>');
							var _innerHtml = properties.text;

							if (_isUndefined(properties.icon) === false) {
								_innerHtml = '<span class="fa fa-' + properties.icon + '"></span> ' + _innerHtml;
							}

							_link.html(_innerHtml);

							if (properties.type === "submenu") {
								_link.addClass("dropdown-toggle");
								_item.addClass("dropdown-submenu");
							}

							_item.append(_link);
						}

						return _item;
					};

					// Public methods:
					_this.get$Object = function () {
						return _$Object;
					};

					// Initializing object...
					_init();
				};

				var Menu = function Menu(items) {
					// Private properties:
					var _this = this;

					var _items = [];
					var _subMenus = [];

					var _isMainMenu = void 0;
					var _$Object = void 0;
					var _$TargetObject = void 0;
					var _tetherInstance = void 0;

					// Private methods:
					var _init = function _init() {
						_$Object = _render();

						_append(_$Object);
					};

					var _onMouseEnter = function _onMouseEnter(e) {
						_this.open();

						e.preventDefault();
						e.stopPropagation();
					};
					var _onMouseLeave = function _onMouseLeave(e) {
						_this.close();

						e.preventDefault();
						e.stopPropagation();
					};

					var _render = function _render() {
						var _menu = $('<ul class="context-menu dropdown-menu"></ul>');

						for (var i in items) {
							var _item = void 0;

							if (items[i].type === "submenu") {
								var _subMenu = new Menu(items[i].items);

								_item = new Item(items[i], _subMenu);

								_subMenu.enableEvents(_item.get$Object());
								_subMenus.push(_subMenu);
							} else {
								_item = new Item(items[i]);
							}

							_items.push(_item);

							_menu.append(_item.get$Object());
						}

						return _menu;
					};

					// Public methods:
					_this.close = function () {
						_$Object.removeClass("open");

						for (var i in _subMenus) {
							_subMenus[i].close();
						}

						if (_isMainMenu === true) {
							setTimeout(_this.delete, 150);
						}
					};

					_this.delete = function () {
						_$Object.remove();

						for (var i in _subMenus) {
							_subMenus[i].delete();
						}
					};

					_this.enableEvents = function (target) {
						var _attachment = void 0;

						if (_isUndefined(target) === false) {
							_attachment = ATTACHMENTS.SUB_MENU;
							_isMainMenu = false;
							_$TargetObject = target;
						} else {
							_attachment = ATTACHMENTS.MAIN_MENU;
							_isMainMenu = true;
							_$TargetObject = _cursor;
						}

						_tetherInstance = new Tether({

							element: _$Object,
							target: _$TargetObject,
							attachment: 'top left',
							targetAttachment: _attachment,
							constraints: [{
								attachment: "together",
								pin: true,
								to: "window"
							}],
							targetOffset: "0px 0px"
						});

						if (_isMainMenu === false) {
							_$Object.on("mouseenter", _onMouseEnter);
							_$Object.on("mouseleave", _onMouseLeave);
						}
					};

					_this.get$Object = function () {
						return _$Object;
					};

					_this.open = function () {
						_$Object.addClass("open");
						_tetherInstance.position();
					};

					// Initializing object...
					_init();
				};

				var ContextMenu = function ContextMenu(domElements, options) {
					// Private properties:
					var _this = this;
					var _domElements = domElements;

					var _items = options.items;

					// Private methods:
					var _onRightClick = function _onRightClick(e) {
						_target = this;

						if (_isUndefined(_contextMenu) === false) {
							_contextMenu.close();
						}

						_updateCursor(e);

						var _computedItems = _items;

						if (typeof _items === "function") {
							_computedItems = _items.call(_target);
						}

						_contextMenu = new Menu(_computedItems);
						_contextMenu.enableEvents();
						_contextMenu.open();

						e.preventDefault();
						e.stopPropagation();
					};

					// Start listening for events...
					$(_domElements).on("contextmenu", _onRightClick);
				};

				// Initial initialization...
				_init();

				// Start listening for global events...
				_context.on("click", _onCloseEvent);
				_context.on("contextmenu", _onCloseEvent);

				// Exposing ContextMenu as a $ plugin...
				
				$.fn.contextMenu = function (options) {
					if (_isUndefined(this) === false) {
						var _opts = $.extend({}, DEFAULT_OPTS, options);

						return new ContextMenu(this, _opts);
					}
				};
				
			})($, Tether, window);
			//# sourceMappingURL=$.context-menu.js.map

		}
		contexMenuContainer($);
		
	//End Of Context Menu 2

		function richText($){
		(function ($) {

			$.fn.richText = function (options) {

				// set default options
				// and merge them with the parameter options
				var settings = $.extend({

					// text formatting
					bold: true,
					italic: true,
					underline: true,

					// text alignment
					leftAlign: true,
					centerAlign: true,
					rightAlign: true,
					justify: true,

					// lists
					ol: true,
					ul: true,

					// title
					heading: true,

					// fonts
					fonts: true,
					fontList: ["Arial",
						"Arial Black",
						"Comic Sans MS",
						"Courier New",
						"Geneva",
						"Georgia",
						"Helvetica",
						"Impact",
						"Lucida Console",
						"Tahoma",
						"Times New Roman",
						"Verdana"
					],
					fontColor: true,
					fontSize: true,

					// uploads
					imageUpload: true,
					fileUpload: true,

					// media
					videoEmbed: true,

					// link
					urls: true,

					// tables
					table: true,

					// code
					removeStyles: true,
					code: true,

					// colors
					colors: [],

					// dropdowns
					fileHTML: '',
					imageHTML: '',

					// translations
					translations: {
						'title': 'Title',
						'white': 'White',
						'black': 'Black',
						'brown': 'Brown',
						'beige': 'Beige',
						'darkBlue': 'Dark Blue',
						'blue': 'Blue',
						'lightBlue': 'Light Blue',
						'darkRed': 'Dark Red',
						'red': 'Red',
						'darkGreen': 'Dark Green',
						'green': 'Green',
						'purple': 'Purple',
						'darkTurquois': 'Dark Turquois',
						'turquois': 'Turquois',
						'darkOrange': 'Dark Orange',
						'orange': 'Orange',
						'yellow': 'Yellow',
						'imageURL': 'Image URL',
						'fileURL': 'File URL',
						'linkText': 'Link text',
						'url': 'URL',
						'size': 'Size',
						'responsive': 'Responsive',
						'text': 'Text',
						'openIn': 'Open in',
						'sameTab': 'Same tab',
						'newTab': 'New tab',
						'align': 'Align',
						'left': 'Left',
						'justify': 'Justify',
						'center': 'Center',
						'right': 'Right',
						'rows': 'Rows',
						'columns': 'Columns',
						'add': 'Add',
						'pleaseEnterURL': 'Please enter an URL',
						'videoURLnotSupported': 'Video URL not supported',
						'pleaseSelectImage': 'Please select an image',
						'pleaseSelectFile': 'Please select a file',
						'bold': 'Bold',
						'italic': 'Italic',
						'underline': 'Underline',
						'alignLeft': 'Align left',
						'alignCenter': 'Align centered',
						'alignRight': 'Align right',
						'addOrderedList': 'Add ordered list',
						'addUnorderedList': 'Add unordered list',
						'addHeading': 'Add Heading/title',
						'addFont': 'Add font',
						'addFontColor': 'Add font color',
						'addFontSize': 'Add font size',
						'addImage': 'Add image',
						'addVideo': 'Add video',
						'addFile': 'Add file',
						'addURL': 'Add URL',
						'addTable': 'Add table',
						'removeStyles': 'Remove styles',
						'code': 'Show HTML code',
						'undo': 'Undo',
						'redo': 'Redo',
						'close': 'Close'
					},

					// privacy
					youtubeCookies: false,

					// dev settings
					useSingleQuotes: false,
					height: 0,
					heightPercentage: 0,
					id: "",
					class: "",
					useParagraph: false

				}, options);


				/* prepare toolbar */
				var $inputElement = $(this);
				$inputElement.addClass("richText-initial");
				var $editor,
					$toolbarList = $('<ul />'),
					$toolbarElement = $('<li />'),
					$btnBold = $('<a />', {
						class: "richText-btn",
						"data-command": "bold",
						"title": settings.translations.bold,
						html: '<span class="fa fa-bold"></span>'
					}), // bold
					$btnItalic = $('<a />', {
						class: "richText-btn",
						"data-command": "italic",
						"title": settings.translations.italic,
						html: '<span class="fa fa-italic"></span>'
					}), // italic
					$btnUnderline = $('<a />', {
						class: "richText-btn",
						"data-command": "underline",
						"title": settings.translations.underline,
						html: '<span class="fa fa-underline"></span>'
					}), // underline
					$btnJustify = $('<a />', {
						class: "richText-btn",
						"data-command": "justifyFull",
						"title": settings.translations.justify,
						html: '<span class="fa fa-align-justify"></span>'
					}), // left align
					$btnLeftAlign = $('<a />', {
						class: "richText-btn",
						"data-command": "justifyLeft",
						"title": settings.translations.alignLeft,
						html: '<span class="fa fa-align-left"></span>'
					}), // left align
					$btnCenterAlign = $('<a />', {
						class: "richText-btn",
						"data-command": "justifyCenter",
						"title": settings.translations.alignCenter,
						html: '<span class="fa fa-align-center"></span>'
					}), // centered
					$btnRightAlign = $('<a />', {
						class: "richText-btn",
						"data-command": "justifyRight",
						"title": settings.translations.alignRight,
						html: '<span class="fa fa-align-right"></span>'
					}), // right align
					$btnOL = $('<a />', {
						class: "richText-btn",
						"data-command": "insertOrderedList",
						"title": settings.translations.addOrderedList,
						html: '<span class="fa fa-list-ol"></span>'
					}), // ordered list
					$btnUL = $('<a />', {
						class: "richText-btn",
						"data-command": "insertUnorderedList",
						"title": settings.translations.addUnorderedList,
						html: '<span class="fa fa-list"></span>'
					}), // unordered list
					$btnHeading = $('<a />', {
						class: "richText-btn",
						"title": settings.translations.addHeading,
						html: '<span class="fa fa-header fa-heading"></span>'
					}), // title/header
					$btnFont = $('<a />', {
						class: "richText-btn",
						"title": settings.translations.addFont,
						html: '<span class="fa fa-font"></span>'
					}), // font color
					$btnFontColor = $('<a />', {
						class: "richText-btn",
						"title": settings.translations.addFontColor,
						html: '<span class="fa fa-paint-brush"></span>'
					}), // font color
					$btnFontSize = $('<a />', {
						class: "richText-btn",
						"title": settings.translations.addFontSize,
						html: '<span class="fa fa-text-height"></span>'
					}), // font color
					$btnImageUpload = $('<a />', {
						class: "richText-btn",
						"title": settings.translations.addImage,
						html: '<span class="fa fa-image"></span>'
					}), // image
					$btnVideoEmbed = $('<a />', {
						class: "richText-btn",
						"title": settings.translations.addVideo,
						html: '<span class="fa fa-video-camera fa-video"></span>'
					}), // video
					$btnFileUpload = $('<a />', {
						class: "richText-btn",
						"title": settings.translations.addFile,
						html: '<span class="fa fa-file-text-o far fa-file-alt"></span>'
					}), // file
					$btnURLs = $('<a />', {
						class: "richText-btn",
						"title": settings.translations.addURL,
						html: '<span class="fa fa-link"></span>'
					}), // urls/links
					$btnTable = $('<a />', {
						class: "richText-btn",
						"title": settings.translations.addTable,
						html: '<span class="fa fa-table"></span>'
					}), // table
					$btnRemoveStyles = $('<a />', {
						class: "richText-btn",
						"data-command": "removeFormat",
						"title": settings.translations.removeStyles,
						html: '<span class="fa fa-recycle"></span>'
					}), // clean up styles
					$btnCode = $('<a />', {
						class: "richText-btn",
						"data-command": "toggleCode",
						"title": settings.translations.code,
						html: '<span class="fa fa-code"></span>'
					}); // code


				/* prepare toolbar dropdowns */
				var $dropdownOuter = $('<div />', {
					class: "richText-dropdown-outer"
				});
				var $dropdownClose = $('<span />', {
					class: "richText-dropdown-close",
					html: '<span title="' + settings.translations.close + '"><span class="fa fa-times"></span></span>'
				});
				var $dropdownList = $('<ul />', {
						class: "richText-dropdown"
					}), // dropdown lists
					$dropdownBox = $('<div />', {
						class: "richText-dropdown"
					}), // dropdown boxes / custom dropdowns
					$form = $('<div />', {
						class: "richText-form"
					}), // symbolic form
					$formItem = $('<div />', {
						class: 'richText-form-item'
					}), // form item
					$formLabel = $('<label />'), // form label
					$formInput = $('<input />', {
						type: "text"
					}), //form input field
					$formInputFile = $('<input />', {
						type: "file"
					}), // form file input field
					$formInputSelect = $('<select />'),
					$formButton = $('<button />', {
						text: settings.translations.add,
						class: "btn"
					}); // button

				/* internal settings */
				var savedSelection; // caret position/selection
				var editorID = "richText-" + Math.random().toString(36).substring(7);
				var ignoreSave = false,
					$resizeImage = null,
					history = [],
					historyPosition = 0;

				/* list dropdown for titles */
				var $titles = $dropdownList.clone();
				$titles.append($('<li />', {
					html: '<a data-command="formatBlock" data-option="h1">' + settings.translations.title + ' #1</a>'
				}));
				$titles.append($('<li />', {
					html: '<a data-command="formatBlock" data-option="h2">' + settings.translations.title + ' #2</a>'
				}));
				$titles.append($('<li />', {
					html: '<a data-command="formatBlock" data-option="h3">' + settings.translations.title + ' #3</a>'
				}));
				$titles.append($('<li />', {
					html: '<a data-command="formatBlock" data-option="h4">' + settings.translations.title + ' #4</a>'
				}));
				$btnHeading.append($dropdownOuter.clone().append($titles.prepend($dropdownClose.clone())));

				/* list dropdown for fonts */
				var fonts = settings.fontList;
				var $fonts = $dropdownList.clone();
				for (var i = 0; i < fonts.length; i++) {
					$fonts.append($('<li />', {
						html: '<a style="font-family:' + fonts[i] + ';" data-command="fontName" data-option="' + fonts[i] + '">' + fonts[i] + '</a>'
					}));
				}
				$btnFont.append($dropdownOuter.clone().append($fonts.prepend($dropdownClose.clone())));

				/* list dropdown for font sizes */
				var fontSizes = [24, 18, 16, 14, 12];
				var $fontSizes = $dropdownList.clone();
				for (var i = 0; i < fontSizes.length; i++) {
					$fontSizes.append($('<li />', {
						html: '<a style="font-size:' + fontSizes[i] + 'px;" data-command="fontSize" data-option="' + fontSizes[i] + '">Text ' + fontSizes[i] + 'px</a>'
					}));
				}
				$btnFontSize.append($dropdownOuter.clone().append($fontSizes.prepend($dropdownClose.clone())));

				/* font colors */
				var $fontColors = $dropdownList.clone();
				$fontColors.html(loadColors("forecolor"));
				$btnFontColor.append($dropdownOuter.clone().append($fontColors.prepend($dropdownClose.clone())));


				/* background colors */
				//var $bgColors = $dropdownList.clone();
				//$bgColors.html(loadColors("hiliteColor"));
				//$btnBGColor.append($dropdownOuter.clone().append($bgColors));

				/* box dropdown for links */
				var $linksDropdown = $dropdownBox.clone();
				var $linksForm = $form.clone().attr("id", "richText-URL").attr("data-editor", editorID);
				$linksForm.append(
					$formItem.clone()
					.append($formLabel.clone().text(settings.translations.url).attr("for", "url"))
					.append($formInput.clone().attr("id", "url"))
				);
				$linksForm.append(
					$formItem.clone()
					.append($formLabel.clone().text(settings.translations.text).attr("for", "urlText"))
					.append($formInput.clone().attr("id", "urlText"))
				);
				$linksForm.append(
					$formItem.clone()
					.append($formLabel.clone().text(settings.translations.openIn).attr("for", "openIn"))
					.append(
						$formInputSelect
						.clone().attr("id", "openIn")
						.append($("<option />", {
							value: '_self',
							text: settings.translations.sameTab
						}))
						.append($("<option />", {
							value: '_blank',
							text: settings.translations.newTab
						}))
					)
				);
				$linksForm.append($formItem.clone().append($formButton.clone()));
				$linksDropdown.append($linksForm);
				$btnURLs.append($dropdownOuter.clone().append($linksDropdown.prepend($dropdownClose.clone())));

				/* box dropdown for video embedding */
				var $videoDropdown = $dropdownBox.clone();
				var $videoForm = $form.clone().attr("id", "richText-Video").attr("data-editor", editorID);
				$videoForm.append(
					$formItem.clone()
					.append($formLabel.clone().text(settings.translations.url).attr("for", "videoURL"))
					.append($formInput.clone().attr("id", "videoURL"))
				);
				$videoForm.append(
					$formItem.clone()
					.append($formLabel.clone().text(settings.translations.size).attr("for", "size"))
					.append(
						$formInputSelect
						.clone().attr("id", "size")
						.append($("<option />", {
							value: 'responsive',
							text: settings.translations.responsive
						}))
						.append($("<option />", {
							value: '640x360',
							text: '640x360'
						}))
						.append($("<option />", {
							value: '560x315',
							text: '560x315'
						}))
						.append($("<option />", {
							value: '480x270',
							text: '480x270'
						}))
						.append($("<option />", {
							value: '320x180',
							text: '320x180'
						}))
					)
				);
				$videoForm.append($formItem.clone().append($formButton.clone()));
				$videoDropdown.append($videoForm);
				$btnVideoEmbed.append($dropdownOuter.clone().append($videoDropdown.prepend($dropdownClose.clone())));

				/* box dropdown for image upload/image selection */
				var $imageDropdown = $dropdownBox.clone();
				var $imageForm = $form.clone().attr("id", "richText-Image").attr("data-editor", editorID);

				if (settings.imageHTML &&
					($(settings.imageHTML).find('#imageURL').length > 0 || $(settings.imageHTML).attr("id") === "imageURL")) {
					// custom image form
					$imageForm.html(settings.imageHTML);
				} else {
					// default image form
					$imageForm.append(
						$formItem.clone()
						.append($formLabel.clone().text(settings.translations.imageURL).attr("for", "imageURL"))
						.append($formInput.clone().attr("id", "imageURL"))
					);
					$imageForm.append(
						$formItem.clone()
						.append($formLabel.clone().text(settings.translations.align).attr("for", "align"))
						.append(
							$formInputSelect
							.clone().attr("id", "align")
							.append($("<option />", {
								value: 'left',
								text: settings.translations.left
							}))
							.append($("<option />", {
								value: 'center',
								text: settings.translations.center
							}))
							.append($("<option />", {
								value: 'right',
								text: settings.translations.right
							}))
						)
					);
				}
				$imageForm.append($formItem.clone().append($formButton.clone()));
				$imageDropdown.append($imageForm);
				$btnImageUpload.append($dropdownOuter.clone().append($imageDropdown.prepend($dropdownClose.clone())));

				/* box dropdown for file upload/file selection */
				var $fileDropdown = $dropdownBox.clone();
				var $fileForm = $form.clone().attr("id", "richText-File").attr("data-editor", editorID);

				if (settings.fileHTML &&
					($(settings.fileHTML).find('#fileURL').length > 0 || $(settings.fileHTML).attr("id") === "fileURL")) {
					// custom file form
					$fileForm.html(settings.fileHTML);
				} else {
					// default file form
					$fileForm.append(
						$formItem.clone()
						.append($formLabel.clone().text(settings.translations.fileURL).attr("for", "fileURL"))
						.append($formInput.clone().attr("id", "fileURL"))
					);
					$fileForm.append(
						$formItem.clone()
						.append($formLabel.clone().text(settings.translations.linkText).attr("for", "fileText"))
						.append($formInput.clone().attr("id", "fileText"))
					);
				}
				$fileForm.append($formItem.clone().append($formButton.clone()));
				$fileDropdown.append($fileForm);
				$btnFileUpload.append($dropdownOuter.clone().append($fileDropdown.prepend($dropdownClose.clone())));

				/* box dropdown for tables */
				var $tableDropdown = $dropdownBox.clone();
				var $tableForm = $form.clone().attr("id", "richText-Table").attr("data-editor", editorID);
				$tableForm.append(
					$formItem.clone()
					.append($formLabel.clone().text(settings.translations.rows).attr("for", "tableRows"))
					.append($formInput.clone().attr("id", "tableRows").attr("type", "number"))
				);
				$tableForm.append(
					$formItem.clone()
					.append($formLabel.clone().text(settings.translations.columns).attr("for", "tableColumns"))
					.append($formInput.clone().attr("id", "tableColumns").attr("type", "number"))
				);
				$tableForm.append($formItem.clone().append($formButton.clone()));
				$tableDropdown.append($tableForm);
				$btnTable.append($dropdownOuter.clone().append($tableDropdown.prepend($dropdownClose.clone())));


				/* initizalize editor */
				function init() {
					var value, attributes, attributes_html = '';

					if (settings.useParagraph !== false) {
						// set default tag when pressing ENTER to <p> instead of <div>
						document.execCommand("DefaultParagraphSeparator", false, 'p');
					}


					// reformat $inputElement to textarea
					if ($inputElement.prop("tagName") === "TEXTAREA") {
						// everything perfect
					} else if ($inputElement.val()) {
						value = $inputElement.val();
						attributes = $inputElement.prop("attributes");
						// loop through <select> attributes and apply them on <div>
						$.each(attributes, function () {
							if (this.name) {
								attributes_html += ' ' + this.name + '="' + this.value + '"';
							}
						});
						$inputElement.replaceWith($('<textarea' + attributes_html + ' data-richtext="init">' + value + '</textarea>'));
						$inputElement = $('[data-richtext="init"]');
						$inputElement.removeAttr("data-richtext");
					} else if ($inputElement.html()) {
						value = $inputElement.html();
						attributes = $inputElement.prop("attributes");
						// loop through <select> attributes and apply them on <div>
						$.each(attributes, function () {
							if (this.name) {
								attributes_html += ' ' + this.name + '="' + this.value + '"';
							}
						});
						$inputElement.replaceWith($('<textarea' + attributes_html + ' data-richtext="init">' + value + '</textarea>'));
						$inputElement = $('[data-richtext="init"]');
						$inputElement.removeAttr("data-richtext");
					} else {
						attributes = $inputElement.prop("attributes");
						// loop through <select> attributes and apply them on <div>
						$.each(attributes, function () {
							if (this.name) {
								attributes_html += ' ' + this.name + '="' + this.value + '"';
							}
						});
						$inputElement.replaceWith($('<textarea' + attributes_html + ' data-richtext="init"></textarea>'));
						$inputElement = $('[data-richtext="init"]');
						$inputElement.removeAttr("data-richtext");
					}

					$editor = $('<div />', {
						class: "richText"
					});
					var $toolbar = $('<div />', {
						class: "richText-toolbar"
					});
					var $editorView = $('<div />', {
						class: "richText-editor",
						id: editorID,
						contenteditable: true
					});
					$toolbar.append($toolbarList);

					/* text formatting */
					if (settings.bold === true) {
						$toolbarList.append($toolbarElement.clone().append($btnBold));
					}
					if (settings.italic === true) {
						$toolbarList.append($toolbarElement.clone().append($btnItalic));
					}
					if (settings.underline === true) {
						$toolbarList.append($toolbarElement.clone().append($btnUnderline));
					}

					/* align */
					if (settings.leftAlign === true) {
						$toolbarList.append($toolbarElement.clone().append($btnLeftAlign));
					}
					if (settings.centerAlign === true) {
						$toolbarList.append($toolbarElement.clone().append($btnCenterAlign));
					}
					if (settings.rightAlign === true) {
						$toolbarList.append($toolbarElement.clone().append($btnRightAlign));
					}
					if (settings.justify === true) {
						$toolbarList.append($toolbarElement.clone().append($btnJustify));
					}

					/* lists */
					if (settings.ol === true) {
						$toolbarList.append($toolbarElement.clone().append($btnOL));
					}
					if (settings.ul === true) {
						$toolbarList.append($toolbarElement.clone().append($btnUL));
					}

					/* fonts */
					if (settings.fonts === true && settings.fontList.length > 0) {
						$toolbarList.append($toolbarElement.clone().append($btnFont));
					}
					if (settings.fontSize === true) {
						$toolbarList.append($toolbarElement.clone().append($btnFontSize));
					}

					/* heading */
					if (settings.heading === true) {
						$toolbarList.append($toolbarElement.clone().append($btnHeading));
					}

					/* colors */
					if (settings.fontColor === true) {
						$toolbarList.append($toolbarElement.clone().append($btnFontColor));
					}

					/* uploads */
					if (settings.imageUpload === true) {
						$toolbarList.append($toolbarElement.clone().append($btnImageUpload));
					}
					if (settings.fileUpload === true) {
						$toolbarList.append($toolbarElement.clone().append($btnFileUpload));
					}

					/* media */
					if (settings.videoEmbed === true) {
						$toolbarList.append($toolbarElement.clone().append($btnVideoEmbed));
					}

					/* urls */
					if (settings.urls === true) {
						$toolbarList.append($toolbarElement.clone().append($btnURLs));
					}

					if (settings.table === true) {
						$toolbarList.append($toolbarElement.clone().append($btnTable));
					}

					/* code */
					if (settings.removeStyles === true) {
						$toolbarList.append($toolbarElement.clone().append($btnRemoveStyles));
					}
					if (settings.code === true) {
						$toolbarList.append($toolbarElement.clone().append($btnCode));
					}

					// set current textarea value to editor
					$editorView.html($inputElement.val());

					$editor.append($toolbar);
					$editor.append($editorView);
					$editor.append($inputElement.clone().hide());
					$inputElement.replaceWith($editor);

					// append bottom toolbar
					$editor.append(
						$('<div />', {
							class: 'richText-toolbar'
						})
						.append($('<a />', {
							class: 'richText-undo is-disabled',
							html: '<span class="fa fa-undo"></span>',
							'title': settings.translations.undo
						}))
						.append($('<a />', {
							class: 'richText-redo is-disabled',
							html: '<span class="fa fa-repeat fa-redo"></span>',
							'title': settings.translations.redo
						}))
						.append($('<a />', {
							class: 'richText-help',
							html: '<span class="fa fa-question-circle"></span>'
						}))
					);

					if (settings.height && settings.height > 0) {
						// set custom editor height
						$editor.children(".richText-editor, .richText-initial").css({
							'min-height': settings.height + 'px',
							'height': settings.height + 'px'
						});
					} else if (settings.heightPercentage && settings.heightPercentage > 0) {
						// set custom editor height in percentage
						var parentHeight = $editor.parent().innerHeight(); // get editor parent height
						var height = (settings.heightPercentage / 100) * parentHeight; // calculate pixel value from percentage
						height -= $toolbar.outerHeight() * 2; // remove toolbar size
						height -= parseInt($editor.css("margin-top")); // remove margins
						height -= parseInt($editor.css("margin-bottom")); // remove margins
						height -= parseInt($editor.find(".richText-editor").css("padding-top")); // remove paddings
						height -= parseInt($editor.find(".richText-editor").css("padding-bottom")); // remove paddings
						$editor.children(".richText-editor, .richText-initial").css({
							'min-height': height + 'px',
							'height': height + 'px'
						});
					}

					// add custom class
					if (settings.class) {
						$editor.addClass(settings.class);
					}
					if (settings.id) {
						$editor.attr("id", settings.id);
					}

					// fix the first line
					fixFirstLine();

					// save history
					history.push($editor.find("textarea").val());
				}

				// initialize editor
				init();


				/** EVENT HANDLERS */

				// Help popup
				$editor.find(".richText-help").on("click", function () {
					var $editor = $(this).parents(".richText");
					if ($editor) {
						var $outer = $('<div />', {
							class: 'richText-help-popup',
							style: 'position:absolute;top:0;right:0;bottom:0;left:0;background-color: rgba(0,0,0,0.3);'
						});
						var $inner = $('<div />', {
							style: 'position:relative;margin:60px auto;padding:20px;background-color:#FAFAFA;width:70%;font-family:Calibri,Verdana,Helvetica,sans-serif;font-size:small;'
						});
						var $content = $('<div />', {
							html: '<span id="closeHelp" style="display:block;position:absolute;top:0;right:0;padding:10px;cursor:pointer;" title="' + settings.translations.close + '"><span class="fa fa-times"></span></span>'
						});
						$content.append('<h3 style="margin:0;">RichText</h3>');
						$content.append('<hr><br>Powered by <a href="https://github.com/webfashionist/RichText" target="_blank">webfashionist/RichText</a> (Github) <br>License: <a href="https://github.com/webfashionist/RichText/blob/master/LICENSE" target="_blank">AGPL-3.0</a>');

						$outer.append($inner.append($content));
						$editor.append($outer);

						$outer.on("click", "#closeHelp", function () {
							$(this).parents('.richText-help-popup').remove();
						});
					}
				});

				// undo / redo
				$(document).on("click", ".richText-undo, .richText-redo", function (e) {
					var $this = $(this);
					if ($this.hasClass("richText-undo") && !$this.hasClass("is-disabled")) {
						undo();
					} else if ($this.hasClass("richText-redo") && !$this.hasClass("is-disabled")) {
						redo();
					}
				});


				// Saving changes from editor to textarea
				$(document).on("input change blur keydown keyup", ".richText-editor", function (e) {
					if ((e.keyCode === 9 || e.keyCode === "9") && e.type === "keydown") {
						// tab through table cells
						e.preventDefault();
						tabifyEditableTable(window, e);
						return false;
					}
					fixFirstLine();
					updateTextarea();
					doSave($(this).attr("id"));
				});


				// add context menu to several Node elements
				$(document).on('contextmenu', '.richText-editor', function (e) {

					var $list = $('<ul />', {
						'class': 'list-rightclick richText-list'
					});
					var $li = $('<li />');
					// remove Node selection
					$('.richText-editor').find('.richText-editNode').removeClass('richText-editNode');

					var $target = $(e.target);
					var $richText = $target.parents('.richText');
					var $toolbar = $richText.find('.richText-toolbar');

					var positionX = e.pageX - $richText.offset().left;
					var positionY = e.pageY - $richText.offset().top;

					$list.css({
						'top': positionY,
						'left': positionX
					});


					if ($target.prop("tagName") === "A") {
						// edit URL
						e.preventDefault();

						$list.append($li.clone().html('<span class="fa fa-link"></span>'));
						$target.parents('.richText').append($list);
						$list.find('.fa-link').on('click', function () {
							$('.list-rightclick.richText-list').remove();
							$target.addClass('richText-editNode');
							var $popup = $toolbar.find('#richText-URL');
							$popup.find('input#url').val($target.attr('href'));
							$popup.find('input#urlText').val($target.text());
							$popup.find('select#openIn').val($target.attr('target'));
							$toolbar.find('.richText-btn').children('.fa-link').parents('li').addClass('is-selected');
						});

						return false;
					} else if ($target.prop("tagName") === "IMG") {
						// edit image
						e.preventDefault();

						$list.append($li.clone().html('<span class="fa fa-image"></span>'));
						$target.parents('.richText').append($list);
						$list.find('.fa-image').on('click', function () {
							var align;
							if ($target.parent('div').length > 0 && $target.parent('div').attr('style') === 'text-align:center;') {
								align = 'center';
							} else {
								align = $target.attr('align');
							}
							$('.list-rightclick.richText-list').remove();
							$target.addClass('richText-editNode');
							var $popup = $toolbar.find('#richText-Image');
							$popup.find('input#imageURL').val($target.attr('src'));
							$popup.find('select#align').val(align);
							$toolbar.find('.richText-btn').children('.fa-image').parents('li').addClass('is-selected');
						});

						return false;
					}

				});

				// Saving changes from textarea to editor
				$(document).on("input change blur", ".richText-initial", function () {
					if (settings.useSingleQuotes === true) {
						$(this).val(changeAttributeQuotes($(this).val()));
					}
					var editorID = $(this).siblings('.richText-editor').attr("id");
					updateEditor(editorID);
					doSave(editorID);
				});

				// Save selection seperately (mainly needed for Safari)
				$(document).on("dblclick mouseup", ".richText-editor", function () {
					var editorID = $(this).attr("id");
					doSave(editorID);
				});

				// embedding video
				$(document).on("click", "#richText-Video button.btn", function (event) {
					event.preventDefault();
					var $button = $(this);
					var $form = $button.parent('.richText-form-item').parent('.richText-form');
					if ($form.attr("data-editor") === editorID) {
						// only for the currently selected editor
						var url = $form.find('input#videoURL').val();
						var size = $form.find('select#size').val();

						if (!url) {
							// no url set
							$form.prepend($('<div />', {
								style: 'color:red;display:none;',
								class: 'form-item is-error',
								text: settings.translations.pleaseEnterURL
							}));
							$form.children('.form-item.is-error').slideDown();
							setTimeout(function () {
								$form.children('.form-item.is-error').slideUp(function () {
									$(this).remove();
								});
							}, 5000);
						} else {
							// write html in editor
							var html = '';
							html = getVideoCode(url, size);
							if (!html) {
								$form.prepend($('<div />', {
									style: 'color:red;display:none;',
									class: 'form-item is-error',
									text: settings.translations.videoURLnotSupported
								}));
								$form.children('.form-item.is-error').slideDown();
								setTimeout(function () {
									$form.children('.form-item.is-error').slideUp(function () {
										$(this).remove();
									});
								}, 5000);
							} else {
								if (settings.useSingleQuotes === true) {

								} else {

								}
								restoreSelection(editorID, true);
								pasteHTMLAtCaret(html);
								updateTextarea();
								// reset input values
								$form.find('input#videoURL').val('');
								$('.richText-toolbar li.is-selected').removeClass("is-selected");
							}
						}
					}
				});

				// Resize images
				$(document).on('mousedown', function (e) {
					var $target = $(e.target);
					if (!$target.hasClass('richText-list') && $target.parents('.richText-list').length === 0) {
						// remove context menu
						$('.richText-list.list-rightclick').remove();
						if (!$target.hasClass('richText-form') && $target.parents('.richText-form').length === 0) {
							$('.richText-editNode').each(function () {
								var $this = $(this);
								$this.removeClass('richText-editNode');
								if ($this.attr('class') === '') {
									$this.removeAttr('class');
								}
							});
						}
					}
					if ($target.prop("tagName") === "IMG" && $target.parents("#" + editorID)) {
						var startX = e.pageX;
						var startY = e.pageY;
						var startW = $target.innerWidth();
						var startH = $target.innerHeight();

						var left = $target.offset().left;
						var right = $target.offset().left + $target.innerWidth();
						var bottom = $target.offset().top + $target.innerHeight();
						var top = $target.offset().top;
						var resize = false;
						$target.css({
							'cursor': 'default'
						});

						if (startY <= bottom && startY >= bottom - 20 && startX >= right - 20 && startX <= right) {
							// bottom right corner
							$resizeImage = $target;
							$resizeImage.css({
								'cursor': 'nwse-resize'
							});
							resize = true;
						}

						if ((resize === true || $resizeImage) && !$resizeImage.data("width")) {
							// set initial image size and prevent dragging image while resizing
							$resizeImage.data("width", $target.parents("#" + editorID).innerWidth());
							$resizeImage.data("height", $target.parents("#" + editorID).innerHeight() * 3);
							e.preventDefault();
						} else if (resize === true || $resizeImage) {
							// resizing active, prevent other events
							e.preventDefault();
						} else {
							// resizing disabled, allow dragging image
							$resizeImage = null;
						}

					}
				});
				$(document)
					.mouseup(function () {
						if ($resizeImage) {
							$resizeImage.css({
								'cursor': 'default'
							});
						}
						$resizeImage = null;
					})
					.mousemove(function (e) {
						if ($resizeImage !== null) {
							var maxWidth = $resizeImage.data('width');
							var currentWidth = $resizeImage.width();
							var maxHeight = $resizeImage.data('height');
							var currentHeight = $resizeImage.height();
							var startW = $target.innerWidth();
							var startH = $target.innerHeight();
							try {				
								if ((startW + e.pageX - startX) <= maxWidth && (startH + e.pageY - startY) <= maxHeight) {
									// only resize if new size is smaller than the original image size
									$resizeImage.innerWidth(startW + e.pageX - startX); // only resize width to adapt height proportionally
									// $box.innerHeight(startH + e.pageY-startY);
									updateTextarea();
								} else if ((startW + e.pageX - startX) <= currentWidth && (startH + e.pageY - startY) <= currentHeight) {
									// only resize if new size is smaller than the previous size
									$resizeImage.innerWidth(startW + e.pageX - startX); // only resize width to adapt height proportionally
									updateTextarea();
								}
							} catch (error) {
								console.error(error);
							}
						}
					});

				// adding URL
				$(document).on("click", "#richText-URL button.btn", function (event) {
					event.preventDefault();
					var $button = $(this);
					var $form = $button.parent('.richText-form-item').parent('.richText-form');
					if ($form.attr("data-editor") === editorID) {
						// only for currently selected editor
						var url = $form.find('input#url').val();
						var text = $form.find('input#urlText').val();
						var target = $form.find('#openIn').val();

						// set default values
						if (!target) {
							target = '_self';
						}
						if (!text) {
							text = url;
						}
						if (!url) {
							// no url set
							$form.prepend($('<div />', {
								style: 'color:red;display:none;',
								class: 'form-item is-error',
								text: settings.translations.pleaseEnterURL
							}));
							$form.children('.form-item.is-error').slideDown();
							setTimeout(function () {
								$form.children('.form-item.is-error').slideUp(function () {
									$(this).remove();
								});
							}, 5000);
						} else {
							// write html in editor
							var html = '';
							if (settings.useSingleQuotes === true) {
								html = "<a href='" + url + "' target='" + target + "'>" + text + "</a>";
							} else {
								html = '<a href="' + url + '" target="' + target + '">' + text + '</a>';
							}
							restoreSelection(editorID, false, true);

							var $editNode = $('.richText-editNode');
							if ($editNode.length > 0 && $editNode.prop("tagName") === "A") {
								$editNode.attr("href", url);
								$editNode.attr("target", target);
								$editNode.text(text);
								$editNode.removeClass('richText-editNode');
								if ($editNode.attr('class') === '') {
									$editNode.removeAttr('class');
								}
							} else {
								pasteHTMLAtCaret(html);
							}
							// reset input values
							$form.find('input#url').val('');
							$form.find('input#urlText').val('');
							$('.richText-toolbar li.is-selected').removeClass("is-selected");
						}
					}
				});

				// adding image
				$(document).on("click", "#richText-Image button.btn", function (event) {
					event.preventDefault();
					var $button = $(this);
					var $form = $button.parent('.richText-form-item').parent('.richText-form');
					if ($form.attr("data-editor") === editorID) {
						// only for currently selected editor
						var url = $form.find('#imageURL').val();
						var align = $form.find('select#align').val();

						// set default values
						if (!align) {
							align = 'center';
						}
						if (!url) {
							// no url set
							$form.prepend($('<div />', {
								style: 'color:red;display:none;',
								class: 'form-item is-error',
								text: settings.translations.pleaseSelectImage
							}));
							$form.children('.form-item.is-error').slideDown();
							setTimeout(function () {
								$form.children('.form-item.is-error').slideUp(function () {
									$(this).remove();
								});
							}, 5000);
						} else {
							// write html in editor
							var html = '';
							if (settings.useSingleQuotes === true) {
								if (align === "center") {
									html = "<div style='text-align:center;'><img src='" + url + "'></div>";
								} else {
									html = "<img src='" + url + "' align='" + align + "'>";
								}
							} else {
								if (align === "center") {
									html = '<div style="text-align:center;"><img src="' + url + '"></div>';
								} else {
									html = '<img src="' + url + '" align="' + align + '">';
								}
							}
							restoreSelection(editorID, true);
							var $editNode = $('.richText-editNode');
							if ($editNode.length > 0 && $editNode.prop("tagName") === "IMG") {
								$editNode.attr("src", url);
								if ($editNode.parent('div').length > 0 && $editNode.parent('div').attr('style') === 'text-align:center;' && align !== 'center') {
									$editNode.unwrap('div');
									$editNode.attr('align', align);
								} else if (($editNode.parent('div').length === 0 || $editNode.parent('div').attr('style') !== 'text-align:center;') && align === 'center') {
									$editNode.wrap('<div style="text-align:center;"></div>');
									$editNode.removeAttr('align');
								} else {
									$editNode.attr('align', align);
								}
								$editNode.removeClass('richText-editNode');
								if ($editNode.attr('class') === '') {
									$editNode.removeAttr('class');
								}
							} else {
								pasteHTMLAtCaret(html);
							}
							// reset input values
							$form.find('input#imageURL').val('');
							$('.richText-toolbar li.is-selected').removeClass("is-selected");
						}
					}
				});

				// adding file
				$(document).on("click", "#richText-File button.btn", function (event) {
					event.preventDefault();
					var $button = $(this);
					var $form = $button.parent('.richText-form-item').parent('.richText-form');
					if ($form.attr("data-editor") === editorID) {
						// only for currently selected editor
						var url = $form.find('#fileURL').val();
						var text = $form.find('#fileText').val();

						// set default values
						if (!text) {
							text = url;
						}
						if (!url) {
							// no url set
							$form.prepend($('<div />', {
								style: 'color:red;display:none;',
								class: 'form-item is-error',
								text: settings.translations.pleaseSelectFile
							}));
							$form.children('.form-item.is-error').slideDown();
							setTimeout(function () {
								$form.children('.form-item.is-error').slideUp(function () {
									$(this).remove();
								});
							}, 5000);
						} else {
							// write html in editor
							var html = '';
							if (settings.useSingleQuotes === true) {
								html = "<a href='" + url + "' target='_blank'>" + text + "</a>";
							} else {
								html = '<a href="' + url + '" target="_blank">' + text + '</a>';
							}
							restoreSelection(editorID, true);
							pasteHTMLAtCaret(html);
							// reset input values
							$form.find('input#fileURL').val('');
							$form.find('input#fileText').val('');
							$('.richText-toolbar li.is-selected').removeClass("is-selected");
						}
					}
				});


				// adding table
				$(document).on("click", "#richText-Table button.btn", function (event) {
					event.preventDefault();
					var $button = $(this);
					var $form = $button.parent('.richText-form-item').parent('.richText-form');
					if ($form.attr("data-editor") === editorID) {
						// only for currently selected editor
						var rows = $form.find('input#tableRows').val();
						var columns = $form.find('input#tableColumns').val();

						// set default values
						if (!rows || rows <= 0) {
							rows = 2;
						}
						if (!columns || columns <= 0) {
							columns = 2;
						}

						// generate table
						var html = '';
						if (settings.useSingleQuotes === true) {
							html = "<table class='table-1'><tbody>";
						} else {
							html = '<table class="table-1"><tbody>';
						}
						for (var i = 1; i <= rows; i++) {
							// start new row
							html += '<tr>';
							for (var n = 1; n <= columns; n++) {
								// start new column in row
								html += '<td> </td>';
							}
							html += '</tr>';
						}
						html += '</tbody></table>';

						// write html in editor
						restoreSelection(editorID, true);
						pasteHTMLAtCaret(html);
						// reset input values
						$form.find('input#tableColumns').val('');
						$form.find('input#tableRows').val('');
						$('.richText-toolbar li.is-selected').removeClass("is-selected");
					}
				});

				// opening / closing toolbar dropdown
				$(document).on("click", function (event) {
					var $clickedElement = $(event.target);

					if ($clickedElement.parents('.richText-toolbar').length === 0) {
						// element not in toolbar
						// ignore
					} else if ($clickedElement.hasClass("richText-dropdown-outer")) {
						// closing dropdown by clicking inside the editor
						$clickedElement.parent('a').parent('li').removeClass("is-selected");
					} else if ($clickedElement.find(".richText").length > 0) {
						// closing dropdown by clicking outside of the editor
						$('.richText-toolbar li').removeClass("is-selected");
					} else if ($clickedElement.parent().hasClass("richText-dropdown-close")) {
						// closing dropdown by clicking on the close button
						$('.richText-toolbar li').removeClass("is-selected");
					} else if ($clickedElement.hasClass("richText-btn") && $(event.target).children('.richText-dropdown-outer').length > 0) {
						// opening dropdown by clicking on toolbar button
						$clickedElement.parent('li').addClass("is-selected");

						if ($clickedElement.children('.fa,svg').hasClass("fa-link")) {
							// put currently selected text in URL form to replace it
							restoreSelection(editorID, false, true);
							var selectedText = getSelectedText();
							$clickedElement.find("input#urlText").val('');
							$clickedElement.find("input#url").val('');
							if (selectedText) {
								$clickedElement.find("input#urlText").val(selectedText);
							}
						} else if ($clickedElement.hasClass("fa-image")) {
							// image
						}
					}
				});

				// Executing editor commands
				$(document).on("click", ".richText-toolbar a[data-command]", function (event) {
					var $button = $(this);
					var $toolbar = $button.closest('.richText-toolbar');
					var $editor = $toolbar.siblings('.richText-editor');
					var id = $editor.attr("id");
					if ($editor.length > 0 && id === editorID && (!$button.parent("li").attr('data-disable') || $button.parent("li").attr('data-disable') === "false")) {
						event.preventDefault();
						var command = $(this).data("command");

						if (command === "toggleCode") {
							toggleCode($editor.attr("id"));
						} else {
							var option = null;
							if ($(this).data('option')) {
								option = $(this).data('option').toString();
								if (option.match(/^h[1-6]$/)) {
									command = "heading";
								}
							}

							formatText(command, option, id);
							if (command === "removeFormat") {
								// remove HTML/CSS formatting
								$editor.find('*').each(function () {
									// remove all, but very few, attributes from the nodes
									var keepAttributes = [
										"id", "class",
										"name", "action", "method",
										"src", "align", "alt", "title",
										"style", "webkitallowfullscreen", "mozallowfullscreen", "allowfullscreen",
										"width", "height", "frameborder"
									];
									var element = $(this);
									var attributes = $.map(this.attributes, function (item) {
										return item.name;
									});
									$.each(attributes, function (i, item) {
										if (keepAttributes.indexOf(item) < 0 && item.substr(0, 5) !== 'data-') {
											element.removeAttr(item);
										}
									});
									if (element.prop('tagName') === "A") {
										// remove empty URL tags
										element.replaceWith(function () {
											return $('<span />', {
												html: $(this).html()
											});
										});
									}
								});
								formatText('formatBlock', 'div', id);
							}
							// clean up empty tags, which can be created while replacing formatting or when copy-pasting from other tools
							$editor.find('div:empty,p:empty,li:empty,h1:empty,h2:empty,h3:empty,h4:empty,h5:empty,h6:empty').remove();
							$editor.find('h1,h2,h3,h4,h5,h6').unwrap('h1,h2,h3,h4,h5,h6');
						}
					}
					// close dropdown after click
					$button.parents('li.is-selected').removeClass('is-selected');
				});



				/** INTERNAL METHODS **/

				/**
				 * Format text in editor
				 * @param {string} command
				 * @param {string|null} option
				 * @param {string} editorID
				 * @private
				 */
				function formatText(command, option, editorID) {
					if (typeof option === "undefined") {
						option = null;
					}
					// restore selection from before clicking on any button
					doRestore(editorID);
					// Temporarily enable designMode so that
					// document.execCommand() will work
					// document.designMode = "ON";
					// Execute the command
					if (command === "heading" && getSelectedText()) {
						// IE workaround
						pasteHTMLAtCaret('<' + option + '>' + getSelectedText() + '</' + option + '>');
					} else if (command === "fontSize" && parseInt(option) > 0) {
						var selection = getSelectedText();
						selection = (selection + '').replace(/([^>\r\n]?)(\r\n|\n\r|\r|\n)/g, '$1' + '<br>' + '$2');
						var html = (settings.useSingleQuotes ? "<span style='font-size:" + option + "px;'>" + selection + "</span>" : '<span style="font-size:' + option + 'px;">' + selection + '</span>');
						pasteHTMLAtCaret(html);
					} else {
						document.execCommand(command, false, option);
					}
					// Disable designMode
					// document.designMode = "OFF";
				}


				/**
				 * Update textarea when updating editor
				 * @private
				 */
				function updateTextarea() {
					var $editor = $('#' + editorID);
					var content = $editor.html();
					if (settings.useSingleQuotes === true) {
						content = changeAttributeQuotes(content);
					}
					$editor.siblings('.richText-initial').val(content);
				}


				/**
				 * Update editor when updating textarea
				 * @private
				 */
				function updateEditor(editorID) {
					var $editor = $('#' + editorID);
					var content = $editor.siblings('.richText-initial').val();
					$editor.html(content);
				}


				/**
				 * Save caret position and selection
				 * @return object
				 **/
				function saveSelection(editorID) {
					var containerEl = document.getElementById(editorID);
					var range, start, end, type;
					if (window.getSelection && document.createRange) {
						var sel = window.getSelection && window.getSelection();
						if (sel && sel.rangeCount > 0 && $(sel.anchorNode).parents('#' + editorID).length > 0) {
							range = window.getSelection().getRangeAt(0);
							var preSelectionRange = range.cloneRange();
							preSelectionRange.selectNodeContents(containerEl);
							preSelectionRange.setEnd(range.startContainer, range.startOffset);

							start = preSelectionRange.toString().length;
							end = (start + range.toString().length);

							type = (start === end ? 'caret' : 'selection');
							let anchor = sel.anchorNode; 
							type === "caret" && sel.anchorNode.tagName ? sel.anchorNode : false;
							start = (type === 'caret' && anchor !== false ? 0 : preSelectionRange.toString().length);
							end = (type === 'caret' && anchor !== false ? 0 : (start + range.toString().length));

							return {
								start: start,
								end: end,
								type: type,
								anchor: anchor,
								editorID: editorID
							}
						}
					}
					return (savedSelection ? savedSelection : {
						start: 0,
						end: 0
					});
				}


				/**
				 * Restore selection
				 **/
				function restoreSelection(editorID, media, url) {
					var containerEl = document.getElementById(editorID);
					var savedSel = savedSelection;
					if (!savedSel) {
						// fix selection if editor has not been focused
						savedSel = {
							'start': 0,
							'end': 0,
							'type': 'caret',
							'editorID': editorID,
							'anchor': $('#' + editorID).children('div')[0]
						};
					}

					if (savedSel.editorID !== editorID) {
						return false;
					} else if (media === true) {
						containerEl = (savedSel.anchor ? savedSel.anchor : containerEl); // fix selection issue
					} else if (url === true) {
						if (savedSel.start === 0 && savedSel.end === 0) {
							containerEl = (savedSel.anchor ? savedSel.anchor : containerEl); // fix selection issue
						}
					}

					if (window.getSelection && document.createRange) {
						var charIndex = 0,
							range = document.createRange();
						if (!range || !containerEl) {
							window.getSelection().removeAllRanges();
							return true;
						}
						range.setStart(containerEl, 0);
						range.collapse(true);
						var nodeStack = [containerEl],
							node, foundStart = false,
							stop = false;

						while (!stop && (node = nodeStack.pop())) {
							if (node.nodeType === 3) {
								var nextCharIndex = charIndex + node.length;
								if (!foundStart && savedSel.start >= charIndex && savedSel.start <= nextCharIndex) {
									range.setStart(node, savedSel.start - charIndex);
									foundStart = true;
								}
								if (foundStart && savedSel.end >= charIndex && savedSel.end <= nextCharIndex) {
									range.setEnd(node, savedSel.end - charIndex);
									stop = true;
								}
								charIndex = nextCharIndex;
							} else {
								var i = node.childNodes.length;
								while (i--) {
									nodeStack.push(node.childNodes[i]);
								}
							}
						}
						var sel = window.getSelection();
						sel.removeAllRanges();
						sel.addRange(range);
					}
				}



				/**
				 * Save caret position and selection
				 * @return object
				 **/
				/*
        function saveSelection(editorID) {
            var containerEl = document.getElementById(editorID);
            var start;
            if (window.getSelection && document.createRange) {
                var sel = window.getSelection && window.getSelection();
                if (sel && sel.rangeCount > 0) {
                    var range = window.getSelection().getRangeAt(0);
                    var preSelectionRange = range.cloneRange();
                    preSelectionRange.selectNodeContents(containerEl);
                    preSelectionRange.setEnd(range.startContainer, range.startOffset);
                    start = preSelectionRange.toString().length;

                    return {
                        start: start,
                        end: start + range.toString().length,
                        editorID: editorID
                    }
                } else {
                    return (savedSelection ? savedSelection : {
                        start: 0,
                        end: 0
                    });
                }
            } else if (document.selection && document.body.createTextRange) {
                var selectedTextRange = document.selection.createRange();
                var preSelectionTextRange = document.body.createTextRange();
                preSelectionTextRange.moveToElementText(containerEl);
                preSelectionTextRange.setEndPoint("EndToStart", selectedTextRange);
                start = preSelectionTextRange.text.length;

                return {
                    start: start,
                    end: start + selectedTextRange.text.length,
                    editorID: editorID
                };
            }
        }
        */

				/**
				 * Restore selection
				 **/
				/*
        function restoreSelection(editorID) {
            var containerEl = document.getElementById(editorID);
            var savedSel = savedSelection;
            if(savedSel.editorID !== editorID) {
                return false;
            }
            if (window.getSelection && document.createRange) {
                var charIndex = 0, range = document.createRange();
                range.setStart(containerEl, 0);
                range.collapse(true);
                var nodeStack = [containerEl], node, foundStart = false, stop = false;

                while (!stop && (node = nodeStack.pop())) {
                    if (node.nodeType === 3) {
                        var nextCharIndex = charIndex + node.length;
                        if (!foundStart && savedSel.start >= charIndex && savedSel.start <= nextCharIndex) {
                            range.setStart(node, savedSel.start - charIndex);
                            foundStart = true;
                        }
                        if (foundStart && savedSel.end >= charIndex && savedSel.end <= nextCharIndex) {
                            range.setEnd(node, savedSel.end - charIndex);
                            stop = true;
                        }
                        charIndex = nextCharIndex;
                    } else {
                        var i = node.childNodes.length;
                        while (i--) {
                            nodeStack.push(node.childNodes[i]);
                        }
                    }
                }
                var sel = window.getSelection();
                sel.removeAllRanges();
                sel.addRange(range);
            } else if (document.selection && document.body.createTextRange) {
                var textRange = document.body.createTextRange();
                textRange.moveToElementText(containerEl);
                textRange.collapse(true);
                textRange.moveEnd("character", savedSel.end);
                textRange.moveStart("character", savedSel.start);
                textRange.select();
            }
        }
        */

				/**
				 * Enables tabbing/shift-tabbing between contentEditable table cells
				 * @param {Window} win - Active window context.
				 * @param {Event} e - jQuery Event object for the keydown that fired.
				 */
				function tabifyEditableTable(win, e) {

					if (e.keyCode !== 9) {
						return false;
					}

					var sel;
					if (win.getSelection) {
						sel = win.getSelection();
						if (sel.rangeCount > 0) {

							var textNode = null,
								direction = null;

							if (!e.shiftKey) {
								direction = "next";
								textNode = (sel.focusNode.nodeName === "TD") ?
									(sel.focusNode.nextSibling != null) ?
									sel.focusNode.nextSibling :
									(sel.focusNode.parentNode.nextSibling != null) ?
									sel.focusNode.parentNode.nextSibling.childNodes[0] :
									null :
									(sel.focusNode.parentNode.nextSibling != null) ?
									sel.focusNode.parentNode.nextSibling :
									(sel.focusNode.parentNode.parentNode.nextSibling != null) ?
									sel.focusNode.parentNode.parentNode.nextSibling.childNodes[0] :
									null;
							} else {
								direction = "previous";
								textNode = (sel.focusNode.nodeName === "TD") ?
									(sel.focusNode.previousSibling != null) ?
									sel.focusNode.previousSibling :
									(sel.focusNode.parentNode.previousSibling != null) ?
									sel.focusNode.parentNode.previousSibling.childNodes[sel.focusNode.parentNode.previousSibling.childNodes.length - 1] :
									null :
									(sel.focusNode.parentNode.previousSibling != null) ?
									sel.focusNode.parentNode.previousSibling :
									(sel.focusNode.parentNode.parentNode.previousSibling != null) ?
									sel.focusNode.parentNode.parentNode.previousSibling.childNodes[sel.focusNode.parentNode.parentNode.previousSibling.childNodes.length - 1] :
									null;
							}

							if (textNode != null) {
								sel.collapse(textNode, Math.min(textNode.length, sel.focusOffset + 1));
								if (textNode.textContent != null) {
									sel.selectAllChildren(textNode);
								}
								e.preventDefault();
								return true;
							} else if (textNode === null && direction === "next" && sel.focusNode.nodeName === "TD") {
								// add new row on TAB if arrived at the end of the row
								var $table = $(sel.focusNode).parents("table");
								var cellsPerLine = $table.find("tr").first().children("td").length;
								var $tr = $("<tr />");
								var $td = $("<td />");
								for (var i = 1; i <= cellsPerLine; i++) {
									$tr.append($td.clone());
								}
								$table.append($tr);
								// simulate tabing through table
								tabifyEditableTable(window, {
									keyCode: 9,
									shiftKey: false,
									preventDefault: function () {}
								});
							}
						}
					}
					return false;
				}

				/**
				 * Returns the text from the current selection
				 * @private
				 * @return {string|boolean}
				 */
				function getSelectedText() {
					var range;
					if (window.getSelection) { // all browsers, except IE before version 9
						range = window.getSelection();
						return range.toString() ? range.toString() : range.focusNode.nodeValue;
					} else if (document.selection.createRange) { // Internet Explorer
						range = document.selection.createRange();
						return range.text;
					}
					return false;
				}

				/**
				 * Save selection
				 */
				function doSave(editorID) {
					var $textarea = $('.richText-editor#' + editorID).siblings('.richText-initial');
					addHistory($textarea.val());
					savedSelection = saveSelection(editorID);
				}

				/**
				 * Add to history
				 * @param val
				 */
				function addHistory(val) {
					if (history.length - 1 > historyPosition) {
						history.length = historyPosition + 1;
					}

					if (history[history.length - 1] !== val) {
						history.push(val);
					}

					historyPosition = history.length - 1;
					setHistoryButtons();
				}

				function setHistoryButtons() {
					if (historyPosition <= 0) {
						$editor.find(".richText-undo").addClass("is-disabled");
					} else {
						$editor.find(".richText-undo").removeClass("is-disabled");
					}

					if (historyPosition >= history.length - 1 || history.length === 0) {
						$editor.find(".richText-redo").addClass("is-disabled");
					} else {
						$editor.find(".richText-redo").removeClass("is-disabled");
					}
				}

				/**
				 * Undo
				 */
				function undo() {
					historyPosition--;
					var value = history[historyPosition];
					$editor.find('textarea').val(value);
					$editor.find('.richText-editor').html(value);
					setHistoryButtons();
				}

				/**
				 * Undo
				 */
				function redo() {
					historyPosition++;
					var value = history[historyPosition];
					$editor.find('textarea').val(value);
					$editor.find('.richText-editor').html(value);
					setHistoryButtons();
				}

				/**
				 * Restore selection
				 */
				function doRestore(id) {
					if (savedSelection) {
						restoreSelection((id ? id : savedSelection.editorID));
					}
				}

				/**
				 * Paste HTML at caret position
				 * @param {string} html HTML code
				 * @private
				 */
				function pasteHTMLAtCaret(html) {
					// add HTML code for Internet Explorer
					var sel, range;
					if (window.getSelection) {
						// IE9 and non-IE
						sel = window.getSelection();
						if (sel.getRangeAt && sel.rangeCount) {
							range = sel.getRangeAt(0);
							range.deleteContents();

							// Range.createContextualFragment() would be useful here but is
							// only relatively recently standardized and is not supported in
							// some browsers (IE9, for one)
							var el = document.createElement("div");
							el.innerHTML = html;
							var frag = document.createDocumentFragment(),
								node, lastNode;
							while ((node = el.firstChild)) {
								lastNode = frag.appendChild(node);
							}
							range.insertNode(frag);

							// Preserve the selection
							if (lastNode) {
								range = range.cloneRange();
								range.setStartAfter(lastNode);
								range.collapse(true);
								sel.removeAllRanges();
								sel.addRange(range);
							}
						}
					} else if (document.selection && document.selection.type !== "Control") {
						// IE < 9
						document.selection.createRange().pasteHTML(html);
					}
				}


				/**
				 * Change quotes around HTML attributes
				 * @param  {string} string
				 * @return {string}
				 */
				function changeAttributeQuotes(string) {
					if (!string) {
						return '';
					}

					var regex;
					var rstring;
					if (settings.useSingleQuotes === true) {
						regex = /\s+(\w+\s*=\s*(["][^"]*["])|(['][^']*[']))+/g;
						rstring = string.replace(regex, function ($0, $1, $2) {
							if (!$2) {
								return $0;
							}
							return $0.replace($2, $2.replace(/\"/g, "'"));
						});
					} else {
						regex = /\s+(\w+\s*=\s*(['][^']*['])|(["][^"]*["]))+/g;
						rstring = string.replace(regex, function ($0, $1, $2) {
							if (!$2) {
								return $0;
							}
							return $0.replace($2, $2.replace(/'/g, '"'));
						});
					}
					return rstring;
				}


				/**
				 * Load colors for font or background
				 * @param {string} command Command
				 * @returns {string}
				 * @private
				 */
				function loadColors(command) {
					var colors = [];
					var result = '';

					colors["#FFFFFF"] = settings.translations.white;
					colors["#000000"] = settings.translations.black;
					colors["#7F6000"] = settings.translations.brown;
					colors["#938953"] = settings.translations.beige;
					colors["#1F497D"] = settings.translations.darkBlue;
					colors["blue"] = settings.translations.blue;
					colors["#4F81BD"] = settings.translations.lightBlue;
					colors["#953734"] = settings.translations.darkRed;
					colors["red"] = settings.translations.red;
					colors["#4F6128"] = settings.translations.darkGreen;
					colors["green"] = settings.translations.green;
					colors["#3F3151"] = settings.translations.purple;
					colors["#31859B"] = settings.translations.darkTurquois;
					colors["#4BACC6"] = settings.translations.turquois;
					colors["#E36C09"] = settings.translations.darkOrange;
					colors["#F79646"] = settings.translations.orange;
					colors["#FFFF00"] = settings.translations.yellow;

					if (settings.colors && settings.colors.length > 0) {
						colors = settings.colors;
					}

					for (var i in colors) {
						result += '<li class="inline"><a data-command="' + command + '" data-option="' + i + '" style="text-align:left;" title="' + colors[i] + '"><span class="box-color" style="background-color:' + i + '"></span></a></li>';
					}
					return result;
				}


				/**
				 * Toggle (show/hide) code or editor
				 * @private
				 */
				function toggleCode(editorID) {
					doRestore(editorID);
					if ($editor.find('.richText-editor').is(":visible")) {
						// show code
						$editor.find('.richText-initial').show();
						$editor.find('.richText-editor').hide();
						// disable non working buttons
						$('.richText-toolbar').find('.richText-btn').each(function () {
							if ($(this).children('.fa-code').length === 0) {
								$(this).parent('li').attr("data-disable", "true");
							}
						});
						convertCaretPosition(editorID, savedSelection);
					} else {
						// show editor
						$editor.find('.richText-initial').hide();
						$editor.find('.richText-editor').show();
						convertCaretPosition(editorID, savedSelection, true);
						// enable all buttons again
						$('.richText-toolbar').find('li').removeAttr("data-disable");
					}
				}


				/**
				 * Convert caret position from editor to code view (or in reverse)
				 * @param {string} editorID
				 * @param {object} selection
				 * @param {boolean} reverse
				 **/
				function convertCaretPosition(editorID, selection, reverse) {
					var $editor = $('#' + editorID);
					var $textarea = $editor.siblings(".richText-initial");

					var code = $textarea.val();
					if (!selection || !code) {
						return {
							start: 0,
							end: 0
						};
					}

					if (reverse === true) {
						savedSelection = {
							start: $editor.text().length,
							end: $editor.text().length,
							editorID: editorID
						};
						restoreSelection(editorID);
						return true;
					}
					selection.node = $textarea[0];
					var states = {
						start: false,
						end: false,
						tag: false,
						isTag: false,
						tagsCount: 0,
						isHighlight: (selection.start !== selection.end)
					};
					for (var i = 0; i < code.length; i++) {
						if (code[i] === "<") {
							// HTML tag starts
							states.isTag = true;
							states.tag = false;
							states.tagsCount++;
						} else if (states.isTag === true && code[i] !== ">") {
							states.tagsCount++;
						} else if (states.isTag === true && code[i] === ">") {
							states.isTag = false;
							states.tag = true;
							states.tagsCount++;
						} else if (states.tag === true) {
							states.tag = false;
						}

						if (!reverse) {
							if ((selection.start + states.tagsCount) <= i && states.isHighlight && !states.isTag && !states.tag && !states.start) {
								selection.start = i;
								states.start = true;
							} else if ((selection.start + states.tagsCount) <= i + 1 && !states.isHighlight && !states.isTag && !states.tag && !states.start) {
								selection.start = i + 1;
								states.start = true;
							}
							if ((selection.end + states.tagsCount) <= i + 1 && !states.isTag && !states.tag && !states.end) {
								selection.end = i + 1;
								states.end = true;
							}
						}

					}
					createSelection(selection.node, selection.start, selection.end);
					return selection;
				}

				/**
				 * Create selection on node element
				 * @param {Node} field
				 * @param {int} start
				 * @param {int} end
				 **/
				function createSelection(field, start, end) {
					if (field.createTextRange) {
						var selRange = field.createTextRange();
						selRange.collapse(true);
						selRange.moveStart('character', start);
						selRange.moveEnd('character', end);
						selRange.select();
						field.focus();
					} else if (field.setSelectionRange) {
						field.focus();
						field.setSelectionRange(start, end);
					} else if (typeof field.selectionStart != 'undefined') {
						field.selectionStart = start;
						field.selectionEnd = end;
						field.focus();
					}
				}


				/**
				 * Get video embed code from URL
				 * @param {string} url Video URL
				 * @param {string} size Size in the form of widthxheight
				 * @return {string|boolean}
				 * @private
				 **/
				function getVideoCode(url, size) {
					var video = getVideoID(url);
					var responsive = false,
						success = false;

					if (!video) {
						// video URL not supported
						return false;
					}

					if (!size) {
						size = "640x360";
						size = size.split("x");
					} else if (size !== "responsive") {
						size = size.split("x");
					} else {
						responsive = true;
						size = "640x360";
						size = size.split("x");
					}

					var html = '<br><br>';
					if (responsive === true) {
						html += '<div class="videoEmbed" style="position:relative;height:0;padding-bottom:56.25%">';
					}
					var allowfullscreen = 'webkitallowfullscreen mozallowfullscreen allowfullscreen';

					if (video.platform === "YouTube") {
						var youtubeDomain = (settings.youtubeCookies ? 'www.youtube.com' : 'www.youtube-nocookie.com');
						html += '<iframe src="https://' + youtubeDomain + '/embed/' + video.id + '?ecver=2" width="' + size[0] + '" height="' + size[1] + '" frameborder="0"' + (responsive === true ? ' style="position:absolute;width:100%;height:100%;left:0"' : '') + ' ' + allowfullscreen + '></iframe>';
						success = true;
					} else if (video.platform === "Vimeo") {
						html += '<iframe src="https://player.vimeo.com/video/' + video.id + '" width="' + size[0] + '" height="' + size[1] + '" frameborder="0"' + (responsive === true ? ' style="position:absolute;width:100%;height:100%;left:0"' : '') + ' ' + allowfullscreen + '></iframe>';
						success = true;
					} else if (video.platform === "Facebook") {
						html += '<iframe src="https://www.facebook.com/plugins/video.php?href=' + encodeURI(url) + '&show_text=0&width=' + size[0] + '" width="' + size[0] + '" height="' + size[1] + '" style="' + (responsive === true ? 'position:absolute;width:100%;height:100%;left:0;border:none;overflow:hidden"' : 'border:none;overflow:hidden') + '" scrolling="no" frameborder="0" allowTransparency="true" ' + allowfullscreen + '></iframe>';
						success = true;
					} else if (video.platform === "Dailymotion") {
						html += '<iframe frameborder="0" width="' + size[0] + '" height="' + size[1] + '" src="//www.dailymotion.com/embed/video/' + video.id + '"' + (responsive === true ? ' style="position:absolute;width:100%;height:100%;left:0"' : '') + ' ' + allowfullscreen + '></iframe>';
						success = true;
					}

					if (responsive === true) {
						html += '</div>';
					}
					html += '<br><br>';

					if (success) {
						return html;
					}
					return false;
				}

				/**
				 * Returns the unique video ID
				 * @param {string} url
				 * return {object|boolean}
				 **/
				function getVideoID(url) {
					var vimeoRegExp = /(?:http?s?:\/\/)?(?:www\.)?(?:vimeo\.com)\/?(.+)/;
					var youtubeRegExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
					var facebookRegExp = /(?:http?s?:\/\/)?(?:www\.)?(?:facebook\.com)\/.*\/videos\/[0-9]+/;
					var dailymotionRegExp = /(?:http?s?:\/\/)?(?:www\.)?(?:dailymotion\.com)\/video\/([a-zA-Z0-9]+)/;
					var youtubeMatch = url.match(youtubeRegExp);
					var vimeoMatch = url.match(vimeoRegExp);
					var facebookMatch = url.match(facebookRegExp);
					var dailymotionMatch = url.match(dailymotionRegExp);

					if (youtubeMatch && youtubeMatch[2].length === 11) {
						return {
							"platform": "YouTube",
							"id": youtubeMatch[2]
						};
					} else if (vimeoMatch && vimeoMatch[1]) {
						return {
							"platform": "Vimeo",
							"id": vimeoMatch[1]
						};
					} else if (facebookMatch && facebookMatch[0]) {
						return {
							"platform": "Facebook",
							"id": facebookMatch[0]
						};
					} else if (dailymotionMatch && dailymotionMatch[1]) {
						return {
							"platform": "Dailymotion",
							"id": dailymotionMatch[1]
						};
					}

					return false;
				}


				/**
				 * Fix the first line as by default the first line has no tag container
				 */
				function fixFirstLine() {
					if ($editor && !$editor.find(".richText-editor").html()) {
						// set first line with the right tags
						if (settings.useParagraph !== false) {
							$editor.find(".richText-editor").html('<p><br></p>');
						} else {
							$editor.find(".richText-editor").html('<div><br></div>');
						}
					} else {
						// replace tags, to force <div> or <p> tags and fix issues
						if (settings.useParagraph !== false) {
							$editor.find(".richText-editor").find('div:not(.videoEmbed)').replaceWith(function () {
								return $('<p />', {
									html: $(this).html()
								});
							});
						} else {
							$editor.find(".richText-editor").find('p').replaceWith(function () {
								return $('<div />', {
									html: $(this).html()
								});
							});
						}
					}
					updateTextarea();
				}

				return $(this);
			};

			$.fn.unRichText = function (options) {

				// set default options
				// and merge them with the parameter options
				var settings = $.extend({
					delay: 0 // delay in ms
				}, options);

				var $editor, $textarea, $main;
				var $el = $(this);

				/**
				 * Initialize undoing RichText and call remove() method
				 */
				function init() {

					if ($el.hasClass('richText')) {
						$main = $el;
					} else if ($el.hasClass('richText-initial') || $el.hasClass('richText-editor')) {
						$main = $el.parents('.richText');
					}

					if (!$main) {
						// node element does not correspond to RichText elements
						return false;
					}

					$editor = $main.find('.richText-editor');
					$textarea = $main.find('.richText-initial');

					if (parseInt(settings.delay) > 0) {
						// a delay has been set
						setTimeout(remove, parseInt(settings.delay));
					} else {
						remove();
					}
				}
				init();

				/**
				 * Remove RichText elements
				 */
				function remove() {
					$main.find('.richText-toolbar').remove();
					$main.find('.richText-editor').remove();
					$textarea
						.unwrap('.richText')
						.data('editor', 'richText')
						.removeClass('richText-initial')
						.show();
				}

			};

		}($));
		}
		richText($);
		
		//*******************************************End plugin zone************************************************************************** */
			return $.fn.dataTable;
		}));//End Main Function

		

		return $;
});

