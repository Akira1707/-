/******/ (function(modules) { // webpackBootstrap
/******/ 	function hotDisposeChunk(chunkId) {
/******/ 		delete installedChunks[chunkId];
/******/ 	}
/******/ 	var parentHotUpdateCallback = window["webpackHotUpdate"];
/******/ 	window["webpackHotUpdate"] = // eslint-disable-next-line no-unused-vars
/******/ 	function webpackHotUpdateCallback(chunkId, moreModules) {
/******/ 		hotAddUpdateChunk(chunkId, moreModules);
/******/ 		if (parentHotUpdateCallback) parentHotUpdateCallback(chunkId, moreModules);
/******/ 	} ;
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotDownloadUpdateChunk(chunkId) {
/******/ 		var script = document.createElement("script");
/******/ 		script.charset = "utf-8";
/******/ 		script.src = __webpack_require__.p + "" + chunkId + "." + hotCurrentHash + ".hot-update.js";
/******/ 		if (null) script.crossOrigin = null;
/******/ 		document.head.appendChild(script);
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotDownloadManifest(requestTimeout) {
/******/ 		requestTimeout = requestTimeout || 10000;
/******/ 		return new Promise(function(resolve, reject) {
/******/ 			if (typeof XMLHttpRequest === "undefined") {
/******/ 				return reject(new Error("No browser support"));
/******/ 			}
/******/ 			try {
/******/ 				var request = new XMLHttpRequest();
/******/ 				var requestPath = __webpack_require__.p + "" + hotCurrentHash + ".hot-update.json";
/******/ 				request.open("GET", requestPath, true);
/******/ 				request.timeout = requestTimeout;
/******/ 				request.send(null);
/******/ 			} catch (err) {
/******/ 				return reject(err);
/******/ 			}
/******/ 			request.onreadystatechange = function() {
/******/ 				if (request.readyState !== 4) return;
/******/ 				if (request.status === 0) {
/******/ 					// timeout
/******/ 					reject(
/******/ 						new Error("Manifest request to " + requestPath + " timed out.")
/******/ 					);
/******/ 				} else if (request.status === 404) {
/******/ 					// no update available
/******/ 					resolve();
/******/ 				} else if (request.status !== 200 && request.status !== 304) {
/******/ 					// other failure
/******/ 					reject(new Error("Manifest request to " + requestPath + " failed."));
/******/ 				} else {
/******/ 					// success
/******/ 					try {
/******/ 						var update = JSON.parse(request.responseText);
/******/ 					} catch (e) {
/******/ 						reject(e);
/******/ 						return;
/******/ 					}
/******/ 					resolve(update);
/******/ 				}
/******/ 			};
/******/ 		});
/******/ 	}
/******/
/******/ 	var hotApplyOnUpdate = true;
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	var hotCurrentHash = "01ae577601d712f5b90b";
/******/ 	var hotRequestTimeout = 10000;
/******/ 	var hotCurrentModuleData = {};
/******/ 	var hotCurrentChildModule;
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	var hotCurrentParents = [];
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	var hotCurrentParentsTemp = [];
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotCreateRequire(moduleId) {
/******/ 		var me = installedModules[moduleId];
/******/ 		if (!me) return __webpack_require__;
/******/ 		var fn = function(request) {
/******/ 			if (me.hot.active) {
/******/ 				if (installedModules[request]) {
/******/ 					if (installedModules[request].parents.indexOf(moduleId) === -1) {
/******/ 						installedModules[request].parents.push(moduleId);
/******/ 					}
/******/ 				} else {
/******/ 					hotCurrentParents = [moduleId];
/******/ 					hotCurrentChildModule = request;
/******/ 				}
/******/ 				if (me.children.indexOf(request) === -1) {
/******/ 					me.children.push(request);
/******/ 				}
/******/ 			} else {
/******/ 				console.warn(
/******/ 					"[HMR] unexpected require(" +
/******/ 						request +
/******/ 						") from disposed module " +
/******/ 						moduleId
/******/ 				);
/******/ 				hotCurrentParents = [];
/******/ 			}
/******/ 			return __webpack_require__(request);
/******/ 		};
/******/ 		var ObjectFactory = function ObjectFactory(name) {
/******/ 			return {
/******/ 				configurable: true,
/******/ 				enumerable: true,
/******/ 				get: function() {
/******/ 					return __webpack_require__[name];
/******/ 				},
/******/ 				set: function(value) {
/******/ 					__webpack_require__[name] = value;
/******/ 				}
/******/ 			};
/******/ 		};
/******/ 		for (var name in __webpack_require__) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(__webpack_require__, name) &&
/******/ 				name !== "e" &&
/******/ 				name !== "t"
/******/ 			) {
/******/ 				Object.defineProperty(fn, name, ObjectFactory(name));
/******/ 			}
/******/ 		}
/******/ 		fn.e = function(chunkId) {
/******/ 			if (hotStatus === "ready") hotSetStatus("prepare");
/******/ 			hotChunksLoading++;
/******/ 			return __webpack_require__.e(chunkId).then(finishChunkLoading, function(err) {
/******/ 				finishChunkLoading();
/******/ 				throw err;
/******/ 			});
/******/
/******/ 			function finishChunkLoading() {
/******/ 				hotChunksLoading--;
/******/ 				if (hotStatus === "prepare") {
/******/ 					if (!hotWaitingFilesMap[chunkId]) {
/******/ 						hotEnsureUpdateChunk(chunkId);
/******/ 					}
/******/ 					if (hotChunksLoading === 0 && hotWaitingFiles === 0) {
/******/ 						hotUpdateDownloaded();
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 		fn.t = function(value, mode) {
/******/ 			if (mode & 1) value = fn(value);
/******/ 			return __webpack_require__.t(value, mode & ~1);
/******/ 		};
/******/ 		return fn;
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotCreateModule(moduleId) {
/******/ 		var hot = {
/******/ 			// private stuff
/******/ 			_acceptedDependencies: {},
/******/ 			_declinedDependencies: {},
/******/ 			_selfAccepted: false,
/******/ 			_selfDeclined: false,
/******/ 			_selfInvalidated: false,
/******/ 			_disposeHandlers: [],
/******/ 			_main: hotCurrentChildModule !== moduleId,
/******/
/******/ 			// Module API
/******/ 			active: true,
/******/ 			accept: function(dep, callback) {
/******/ 				if (dep === undefined) hot._selfAccepted = true;
/******/ 				else if (typeof dep === "function") hot._selfAccepted = dep;
/******/ 				else if (typeof dep === "object")
/******/ 					for (var i = 0; i < dep.length; i++)
/******/ 						hot._acceptedDependencies[dep[i]] = callback || function() {};
/******/ 				else hot._acceptedDependencies[dep] = callback || function() {};
/******/ 			},
/******/ 			decline: function(dep) {
/******/ 				if (dep === undefined) hot._selfDeclined = true;
/******/ 				else if (typeof dep === "object")
/******/ 					for (var i = 0; i < dep.length; i++)
/******/ 						hot._declinedDependencies[dep[i]] = true;
/******/ 				else hot._declinedDependencies[dep] = true;
/******/ 			},
/******/ 			dispose: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			addDisposeHandler: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			removeDisposeHandler: function(callback) {
/******/ 				var idx = hot._disposeHandlers.indexOf(callback);
/******/ 				if (idx >= 0) hot._disposeHandlers.splice(idx, 1);
/******/ 			},
/******/ 			invalidate: function() {
/******/ 				this._selfInvalidated = true;
/******/ 				switch (hotStatus) {
/******/ 					case "idle":
/******/ 						hotUpdate = {};
/******/ 						hotUpdate[moduleId] = modules[moduleId];
/******/ 						hotSetStatus("ready");
/******/ 						break;
/******/ 					case "ready":
/******/ 						hotApplyInvalidatedModule(moduleId);
/******/ 						break;
/******/ 					case "prepare":
/******/ 					case "check":
/******/ 					case "dispose":
/******/ 					case "apply":
/******/ 						(hotQueuedInvalidatedModules =
/******/ 							hotQueuedInvalidatedModules || []).push(moduleId);
/******/ 						break;
/******/ 					default:
/******/ 						// ignore requests in error states
/******/ 						break;
/******/ 				}
/******/ 			},
/******/
/******/ 			// Management API
/******/ 			check: hotCheck,
/******/ 			apply: hotApply,
/******/ 			status: function(l) {
/******/ 				if (!l) return hotStatus;
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			addStatusHandler: function(l) {
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			removeStatusHandler: function(l) {
/******/ 				var idx = hotStatusHandlers.indexOf(l);
/******/ 				if (idx >= 0) hotStatusHandlers.splice(idx, 1);
/******/ 			},
/******/
/******/ 			//inherit from previous dispose call
/******/ 			data: hotCurrentModuleData[moduleId]
/******/ 		};
/******/ 		hotCurrentChildModule = undefined;
/******/ 		return hot;
/******/ 	}
/******/
/******/ 	var hotStatusHandlers = [];
/******/ 	var hotStatus = "idle";
/******/
/******/ 	function hotSetStatus(newStatus) {
/******/ 		hotStatus = newStatus;
/******/ 		for (var i = 0; i < hotStatusHandlers.length; i++)
/******/ 			hotStatusHandlers[i].call(null, newStatus);
/******/ 	}
/******/
/******/ 	// while downloading
/******/ 	var hotWaitingFiles = 0;
/******/ 	var hotChunksLoading = 0;
/******/ 	var hotWaitingFilesMap = {};
/******/ 	var hotRequestedFilesMap = {};
/******/ 	var hotAvailableFilesMap = {};
/******/ 	var hotDeferred;
/******/
/******/ 	// The update info
/******/ 	var hotUpdate, hotUpdateNewHash, hotQueuedInvalidatedModules;
/******/
/******/ 	function toModuleId(id) {
/******/ 		var isNumber = +id + "" === id;
/******/ 		return isNumber ? +id : id;
/******/ 	}
/******/
/******/ 	function hotCheck(apply) {
/******/ 		if (hotStatus !== "idle") {
/******/ 			throw new Error("check() is only allowed in idle status");
/******/ 		}
/******/ 		hotApplyOnUpdate = apply;
/******/ 		hotSetStatus("check");
/******/ 		return hotDownloadManifest(hotRequestTimeout).then(function(update) {
/******/ 			if (!update) {
/******/ 				hotSetStatus(hotApplyInvalidatedModules() ? "ready" : "idle");
/******/ 				return null;
/******/ 			}
/******/ 			hotRequestedFilesMap = {};
/******/ 			hotWaitingFilesMap = {};
/******/ 			hotAvailableFilesMap = update.c;
/******/ 			hotUpdateNewHash = update.h;
/******/
/******/ 			hotSetStatus("prepare");
/******/ 			var promise = new Promise(function(resolve, reject) {
/******/ 				hotDeferred = {
/******/ 					resolve: resolve,
/******/ 					reject: reject
/******/ 				};
/******/ 			});
/******/ 			hotUpdate = {};
/******/ 			var chunkId = "main";
/******/ 			// eslint-disable-next-line no-lone-blocks
/******/ 			{
/******/ 				hotEnsureUpdateChunk(chunkId);
/******/ 			}
/******/ 			if (
/******/ 				hotStatus === "prepare" &&
/******/ 				hotChunksLoading === 0 &&
/******/ 				hotWaitingFiles === 0
/******/ 			) {
/******/ 				hotUpdateDownloaded();
/******/ 			}
/******/ 			return promise;
/******/ 		});
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotAddUpdateChunk(chunkId, moreModules) {
/******/ 		if (!hotAvailableFilesMap[chunkId] || !hotRequestedFilesMap[chunkId])
/******/ 			return;
/******/ 		hotRequestedFilesMap[chunkId] = false;
/******/ 		for (var moduleId in moreModules) {
/******/ 			if (Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				hotUpdate[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if (--hotWaitingFiles === 0 && hotChunksLoading === 0) {
/******/ 			hotUpdateDownloaded();
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotEnsureUpdateChunk(chunkId) {
/******/ 		if (!hotAvailableFilesMap[chunkId]) {
/******/ 			hotWaitingFilesMap[chunkId] = true;
/******/ 		} else {
/******/ 			hotRequestedFilesMap[chunkId] = true;
/******/ 			hotWaitingFiles++;
/******/ 			hotDownloadUpdateChunk(chunkId);
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotUpdateDownloaded() {
/******/ 		hotSetStatus("ready");
/******/ 		var deferred = hotDeferred;
/******/ 		hotDeferred = null;
/******/ 		if (!deferred) return;
/******/ 		if (hotApplyOnUpdate) {
/******/ 			// Wrap deferred object in Promise to mark it as a well-handled Promise to
/******/ 			// avoid triggering uncaught exception warning in Chrome.
/******/ 			// See https://bugs.chromium.org/p/chromium/issues/detail?id=465666
/******/ 			Promise.resolve()
/******/ 				.then(function() {
/******/ 					return hotApply(hotApplyOnUpdate);
/******/ 				})
/******/ 				.then(
/******/ 					function(result) {
/******/ 						deferred.resolve(result);
/******/ 					},
/******/ 					function(err) {
/******/ 						deferred.reject(err);
/******/ 					}
/******/ 				);
/******/ 		} else {
/******/ 			var outdatedModules = [];
/******/ 			for (var id in hotUpdate) {
/******/ 				if (Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 					outdatedModules.push(toModuleId(id));
/******/ 				}
/******/ 			}
/******/ 			deferred.resolve(outdatedModules);
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotApply(options) {
/******/ 		if (hotStatus !== "ready")
/******/ 			throw new Error("apply() is only allowed in ready status");
/******/ 		options = options || {};
/******/ 		return hotApplyInternal(options);
/******/ 	}
/******/
/******/ 	function hotApplyInternal(options) {
/******/ 		hotApplyInvalidatedModules();
/******/
/******/ 		var cb;
/******/ 		var i;
/******/ 		var j;
/******/ 		var module;
/******/ 		var moduleId;
/******/
/******/ 		function getAffectedStuff(updateModuleId) {
/******/ 			var outdatedModules = [updateModuleId];
/******/ 			var outdatedDependencies = {};
/******/
/******/ 			var queue = outdatedModules.map(function(id) {
/******/ 				return {
/******/ 					chain: [id],
/******/ 					id: id
/******/ 				};
/******/ 			});
/******/ 			while (queue.length > 0) {
/******/ 				var queueItem = queue.pop();
/******/ 				var moduleId = queueItem.id;
/******/ 				var chain = queueItem.chain;
/******/ 				module = installedModules[moduleId];
/******/ 				if (
/******/ 					!module ||
/******/ 					(module.hot._selfAccepted && !module.hot._selfInvalidated)
/******/ 				)
/******/ 					continue;
/******/ 				if (module.hot._selfDeclined) {
/******/ 					return {
/******/ 						type: "self-declined",
/******/ 						chain: chain,
/******/ 						moduleId: moduleId
/******/ 					};
/******/ 				}
/******/ 				if (module.hot._main) {
/******/ 					return {
/******/ 						type: "unaccepted",
/******/ 						chain: chain,
/******/ 						moduleId: moduleId
/******/ 					};
/******/ 				}
/******/ 				for (var i = 0; i < module.parents.length; i++) {
/******/ 					var parentId = module.parents[i];
/******/ 					var parent = installedModules[parentId];
/******/ 					if (!parent) continue;
/******/ 					if (parent.hot._declinedDependencies[moduleId]) {
/******/ 						return {
/******/ 							type: "declined",
/******/ 							chain: chain.concat([parentId]),
/******/ 							moduleId: moduleId,
/******/ 							parentId: parentId
/******/ 						};
/******/ 					}
/******/ 					if (outdatedModules.indexOf(parentId) !== -1) continue;
/******/ 					if (parent.hot._acceptedDependencies[moduleId]) {
/******/ 						if (!outdatedDependencies[parentId])
/******/ 							outdatedDependencies[parentId] = [];
/******/ 						addAllToSet(outdatedDependencies[parentId], [moduleId]);
/******/ 						continue;
/******/ 					}
/******/ 					delete outdatedDependencies[parentId];
/******/ 					outdatedModules.push(parentId);
/******/ 					queue.push({
/******/ 						chain: chain.concat([parentId]),
/******/ 						id: parentId
/******/ 					});
/******/ 				}
/******/ 			}
/******/
/******/ 			return {
/******/ 				type: "accepted",
/******/ 				moduleId: updateModuleId,
/******/ 				outdatedModules: outdatedModules,
/******/ 				outdatedDependencies: outdatedDependencies
/******/ 			};
/******/ 		}
/******/
/******/ 		function addAllToSet(a, b) {
/******/ 			for (var i = 0; i < b.length; i++) {
/******/ 				var item = b[i];
/******/ 				if (a.indexOf(item) === -1) a.push(item);
/******/ 			}
/******/ 		}
/******/
/******/ 		// at begin all updates modules are outdated
/******/ 		// the "outdated" status can propagate to parents if they don't accept the children
/******/ 		var outdatedDependencies = {};
/******/ 		var outdatedModules = [];
/******/ 		var appliedUpdate = {};
/******/
/******/ 		var warnUnexpectedRequire = function warnUnexpectedRequire() {
/******/ 			console.warn(
/******/ 				"[HMR] unexpected require(" + result.moduleId + ") to disposed module"
/******/ 			);
/******/ 		};
/******/
/******/ 		for (var id in hotUpdate) {
/******/ 			if (Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 				moduleId = toModuleId(id);
/******/ 				/** @type {TODO} */
/******/ 				var result;
/******/ 				if (hotUpdate[id]) {
/******/ 					result = getAffectedStuff(moduleId);
/******/ 				} else {
/******/ 					result = {
/******/ 						type: "disposed",
/******/ 						moduleId: id
/******/ 					};
/******/ 				}
/******/ 				/** @type {Error|false} */
/******/ 				var abortError = false;
/******/ 				var doApply = false;
/******/ 				var doDispose = false;
/******/ 				var chainInfo = "";
/******/ 				if (result.chain) {
/******/ 					chainInfo = "\nUpdate propagation: " + result.chain.join(" -> ");
/******/ 				}
/******/ 				switch (result.type) {
/******/ 					case "self-declined":
/******/ 						if (options.onDeclined) options.onDeclined(result);
/******/ 						if (!options.ignoreDeclined)
/******/ 							abortError = new Error(
/******/ 								"Aborted because of self decline: " +
/******/ 									result.moduleId +
/******/ 									chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "declined":
/******/ 						if (options.onDeclined) options.onDeclined(result);
/******/ 						if (!options.ignoreDeclined)
/******/ 							abortError = new Error(
/******/ 								"Aborted because of declined dependency: " +
/******/ 									result.moduleId +
/******/ 									" in " +
/******/ 									result.parentId +
/******/ 									chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "unaccepted":
/******/ 						if (options.onUnaccepted) options.onUnaccepted(result);
/******/ 						if (!options.ignoreUnaccepted)
/******/ 							abortError = new Error(
/******/ 								"Aborted because " + moduleId + " is not accepted" + chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "accepted":
/******/ 						if (options.onAccepted) options.onAccepted(result);
/******/ 						doApply = true;
/******/ 						break;
/******/ 					case "disposed":
/******/ 						if (options.onDisposed) options.onDisposed(result);
/******/ 						doDispose = true;
/******/ 						break;
/******/ 					default:
/******/ 						throw new Error("Unexception type " + result.type);
/******/ 				}
/******/ 				if (abortError) {
/******/ 					hotSetStatus("abort");
/******/ 					return Promise.reject(abortError);
/******/ 				}
/******/ 				if (doApply) {
/******/ 					appliedUpdate[moduleId] = hotUpdate[moduleId];
/******/ 					addAllToSet(outdatedModules, result.outdatedModules);
/******/ 					for (moduleId in result.outdatedDependencies) {
/******/ 						if (
/******/ 							Object.prototype.hasOwnProperty.call(
/******/ 								result.outdatedDependencies,
/******/ 								moduleId
/******/ 							)
/******/ 						) {
/******/ 							if (!outdatedDependencies[moduleId])
/******/ 								outdatedDependencies[moduleId] = [];
/******/ 							addAllToSet(
/******/ 								outdatedDependencies[moduleId],
/******/ 								result.outdatedDependencies[moduleId]
/******/ 							);
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 				if (doDispose) {
/******/ 					addAllToSet(outdatedModules, [result.moduleId]);
/******/ 					appliedUpdate[moduleId] = warnUnexpectedRequire;
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Store self accepted outdated modules to require them later by the module system
/******/ 		var outdatedSelfAcceptedModules = [];
/******/ 		for (i = 0; i < outdatedModules.length; i++) {
/******/ 			moduleId = outdatedModules[i];
/******/ 			if (
/******/ 				installedModules[moduleId] &&
/******/ 				installedModules[moduleId].hot._selfAccepted &&
/******/ 				// removed self-accepted modules should not be required
/******/ 				appliedUpdate[moduleId] !== warnUnexpectedRequire &&
/******/ 				// when called invalidate self-accepting is not possible
/******/ 				!installedModules[moduleId].hot._selfInvalidated
/******/ 			) {
/******/ 				outdatedSelfAcceptedModules.push({
/******/ 					module: moduleId,
/******/ 					parents: installedModules[moduleId].parents.slice(),
/******/ 					errorHandler: installedModules[moduleId].hot._selfAccepted
/******/ 				});
/******/ 			}
/******/ 		}
/******/
/******/ 		// Now in "dispose" phase
/******/ 		hotSetStatus("dispose");
/******/ 		Object.keys(hotAvailableFilesMap).forEach(function(chunkId) {
/******/ 			if (hotAvailableFilesMap[chunkId] === false) {
/******/ 				hotDisposeChunk(chunkId);
/******/ 			}
/******/ 		});
/******/
/******/ 		var idx;
/******/ 		var queue = outdatedModules.slice();
/******/ 		while (queue.length > 0) {
/******/ 			moduleId = queue.pop();
/******/ 			module = installedModules[moduleId];
/******/ 			if (!module) continue;
/******/
/******/ 			var data = {};
/******/
/******/ 			// Call dispose handlers
/******/ 			var disposeHandlers = module.hot._disposeHandlers;
/******/ 			for (j = 0; j < disposeHandlers.length; j++) {
/******/ 				cb = disposeHandlers[j];
/******/ 				cb(data);
/******/ 			}
/******/ 			hotCurrentModuleData[moduleId] = data;
/******/
/******/ 			// disable module (this disables requires from this module)
/******/ 			module.hot.active = false;
/******/
/******/ 			// remove module from cache
/******/ 			delete installedModules[moduleId];
/******/
/******/ 			// when disposing there is no need to call dispose handler
/******/ 			delete outdatedDependencies[moduleId];
/******/
/******/ 			// remove "parents" references from all children
/******/ 			for (j = 0; j < module.children.length; j++) {
/******/ 				var child = installedModules[module.children[j]];
/******/ 				if (!child) continue;
/******/ 				idx = child.parents.indexOf(moduleId);
/******/ 				if (idx >= 0) {
/******/ 					child.parents.splice(idx, 1);
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// remove outdated dependency from module children
/******/ 		var dependency;
/******/ 		var moduleOutdatedDependencies;
/******/ 		for (moduleId in outdatedDependencies) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)
/******/ 			) {
/******/ 				module = installedModules[moduleId];
/******/ 				if (module) {
/******/ 					moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 					for (j = 0; j < moduleOutdatedDependencies.length; j++) {
/******/ 						dependency = moduleOutdatedDependencies[j];
/******/ 						idx = module.children.indexOf(dependency);
/******/ 						if (idx >= 0) module.children.splice(idx, 1);
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Now in "apply" phase
/******/ 		hotSetStatus("apply");
/******/
/******/ 		if (hotUpdateNewHash !== undefined) {
/******/ 			hotCurrentHash = hotUpdateNewHash;
/******/ 			hotUpdateNewHash = undefined;
/******/ 		}
/******/ 		hotUpdate = undefined;
/******/
/******/ 		// insert new code
/******/ 		for (moduleId in appliedUpdate) {
/******/ 			if (Object.prototype.hasOwnProperty.call(appliedUpdate, moduleId)) {
/******/ 				modules[moduleId] = appliedUpdate[moduleId];
/******/ 			}
/******/ 		}
/******/
/******/ 		// call accept handlers
/******/ 		var error = null;
/******/ 		for (moduleId in outdatedDependencies) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)
/******/ 			) {
/******/ 				module = installedModules[moduleId];
/******/ 				if (module) {
/******/ 					moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 					var callbacks = [];
/******/ 					for (i = 0; i < moduleOutdatedDependencies.length; i++) {
/******/ 						dependency = moduleOutdatedDependencies[i];
/******/ 						cb = module.hot._acceptedDependencies[dependency];
/******/ 						if (cb) {
/******/ 							if (callbacks.indexOf(cb) !== -1) continue;
/******/ 							callbacks.push(cb);
/******/ 						}
/******/ 					}
/******/ 					for (i = 0; i < callbacks.length; i++) {
/******/ 						cb = callbacks[i];
/******/ 						try {
/******/ 							cb(moduleOutdatedDependencies);
/******/ 						} catch (err) {
/******/ 							if (options.onErrored) {
/******/ 								options.onErrored({
/******/ 									type: "accept-errored",
/******/ 									moduleId: moduleId,
/******/ 									dependencyId: moduleOutdatedDependencies[i],
/******/ 									error: err
/******/ 								});
/******/ 							}
/******/ 							if (!options.ignoreErrored) {
/******/ 								if (!error) error = err;
/******/ 							}
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Load self accepted modules
/******/ 		for (i = 0; i < outdatedSelfAcceptedModules.length; i++) {
/******/ 			var item = outdatedSelfAcceptedModules[i];
/******/ 			moduleId = item.module;
/******/ 			hotCurrentParents = item.parents;
/******/ 			hotCurrentChildModule = moduleId;
/******/ 			try {
/******/ 				__webpack_require__(moduleId);
/******/ 			} catch (err) {
/******/ 				if (typeof item.errorHandler === "function") {
/******/ 					try {
/******/ 						item.errorHandler(err);
/******/ 					} catch (err2) {
/******/ 						if (options.onErrored) {
/******/ 							options.onErrored({
/******/ 								type: "self-accept-error-handler-errored",
/******/ 								moduleId: moduleId,
/******/ 								error: err2,
/******/ 								originalError: err
/******/ 							});
/******/ 						}
/******/ 						if (!options.ignoreErrored) {
/******/ 							if (!error) error = err2;
/******/ 						}
/******/ 						if (!error) error = err;
/******/ 					}
/******/ 				} else {
/******/ 					if (options.onErrored) {
/******/ 						options.onErrored({
/******/ 							type: "self-accept-errored",
/******/ 							moduleId: moduleId,
/******/ 							error: err
/******/ 						});
/******/ 					}
/******/ 					if (!options.ignoreErrored) {
/******/ 						if (!error) error = err;
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// handle errors in accept handlers and self accepted module load
/******/ 		if (error) {
/******/ 			hotSetStatus("fail");
/******/ 			return Promise.reject(error);
/******/ 		}
/******/
/******/ 		if (hotQueuedInvalidatedModules) {
/******/ 			return hotApplyInternal(options).then(function(list) {
/******/ 				outdatedModules.forEach(function(moduleId) {
/******/ 					if (list.indexOf(moduleId) < 0) list.push(moduleId);
/******/ 				});
/******/ 				return list;
/******/ 			});
/******/ 		}
/******/
/******/ 		hotSetStatus("idle");
/******/ 		return new Promise(function(resolve) {
/******/ 			resolve(outdatedModules);
/******/ 		});
/******/ 	}
/******/
/******/ 	function hotApplyInvalidatedModules() {
/******/ 		if (hotQueuedInvalidatedModules) {
/******/ 			if (!hotUpdate) hotUpdate = {};
/******/ 			hotQueuedInvalidatedModules.forEach(hotApplyInvalidatedModule);
/******/ 			hotQueuedInvalidatedModules = undefined;
/******/ 			return true;
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotApplyInvalidatedModule(moduleId) {
/******/ 		if (!Object.prototype.hasOwnProperty.call(hotUpdate, moduleId))
/******/ 			hotUpdate[moduleId] = modules[moduleId];
/******/ 	}
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {},
/******/ 			hot: hotCreateModule(moduleId),
/******/ 			parents: (hotCurrentParentsTemp = hotCurrentParents, hotCurrentParents = [], hotCurrentParentsTemp),
/******/ 			children: []
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, hotCreateRequire(moduleId));
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/ 	// __webpack_hash__
/******/ 	__webpack_require__.h = function() { return hotCurrentHash; };
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return hotCreateRequire(0)(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/add-event-listener/index.js":
/*!**************************************************!*\
  !*** ./node_modules/add-event-listener/index.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("addEventListener.removeEventListener = removeEventListener\naddEventListener.addEventListener = addEventListener\n\nmodule.exports = addEventListener\n\nvar Events = null\n\nfunction addEventListener(el, eventName, listener, useCapture) {\n  Events = Events || (\n    document.addEventListener ?\n    {add: stdAttach, rm: stdDetach} :\n    {add: oldIEAttach, rm: oldIEDetach}\n  )\n  \n  return Events.add(el, eventName, listener, useCapture)\n}\n\nfunction removeEventListener(el, eventName, listener, useCapture) {\n  Events = Events || (\n    document.addEventListener ?\n    {add: stdAttach, rm: stdDetach} :\n    {add: oldIEAttach, rm: oldIEDetach}\n  )\n  \n  return Events.rm(el, eventName, listener, useCapture)\n}\n\nfunction stdAttach(el, eventName, listener, useCapture) {\n  el.addEventListener(eventName, listener, useCapture)\n}\n\nfunction stdDetach(el, eventName, listener, useCapture) {\n  el.removeEventListener(eventName, listener, useCapture)\n}\n\nfunction oldIEAttach(el, eventName, listener, useCapture) {\n  if(useCapture) {\n    throw new Error('cannot useCapture in oldIE')\n  }\n\n  el.attachEvent('on' + eventName, listener)\n}\n\nfunction oldIEDetach(el, eventName, listener, useCapture) {\n  el.detachEvent('on' + eventName, listener)\n}\n\n\n//# sourceURL=webpack:///./node_modules/add-event-listener/index.js?");

/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./src/components/app/index.css":
/*!****************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./src/components/app/index.css ***!
  \****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("exports = module.exports = __webpack_require__(/*! ../../../node_modules/css-loader/dist/runtime/api.js */ \"./node_modules/css-loader/dist/runtime/api.js\")(false);\n// Module\nexports.push([module.i, \"[data-component=app] {\\r\\n  padding: 1em;\\r\\n  background-image: linear-gradient(90deg, #a8caba 0%, #5d4157 100%);\\r\\n  background-size: cover;\\r\\n  min-height: 10em;\\r\\n  color: #222;\\r\\n}\", \"\"]);\n\n\n\n//# sourceURL=webpack:///./src/components/app/index.css?./node_modules/css-loader/dist/cjs.js");

/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/api.js":
/*!*****************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/api.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\n/*\n  MIT License http://www.opensource.org/licenses/mit-license.php\n  Author Tobias Koppers @sokra\n*/\n// css base code, injected by the css-loader\nmodule.exports = function (useSourceMap) {\n  var list = []; // return the list of modules as css string\n\n  list.toString = function toString() {\n    return this.map(function (item) {\n      var content = cssWithMappingToString(item, useSourceMap);\n\n      if (item[2]) {\n        return '@media ' + item[2] + '{' + content + '}';\n      } else {\n        return content;\n      }\n    }).join('');\n  }; // import a list of modules into the list\n\n\n  list.i = function (modules, mediaQuery) {\n    if (typeof modules === 'string') {\n      modules = [[null, modules, '']];\n    }\n\n    var alreadyImportedModules = {};\n\n    for (var i = 0; i < this.length; i++) {\n      var id = this[i][0];\n\n      if (id != null) {\n        alreadyImportedModules[id] = true;\n      }\n    }\n\n    for (i = 0; i < modules.length; i++) {\n      var item = modules[i]; // skip already imported module\n      // this implementation is not 100% perfect for weird media query combinations\n      // when a module is imported multiple times with different media queries.\n      // I hope this will never occur (Hey this way we have smaller bundles)\n\n      if (item[0] == null || !alreadyImportedModules[item[0]]) {\n        if (mediaQuery && !item[2]) {\n          item[2] = mediaQuery;\n        } else if (mediaQuery) {\n          item[2] = '(' + item[2] + ') and (' + mediaQuery + ')';\n        }\n\n        list.push(item);\n      }\n    }\n  };\n\n  return list;\n};\n\nfunction cssWithMappingToString(item, useSourceMap) {\n  var content = item[1] || '';\n  var cssMapping = item[3];\n\n  if (!cssMapping) {\n    return content;\n  }\n\n  if (useSourceMap && typeof btoa === 'function') {\n    var sourceMapping = toComment(cssMapping);\n    var sourceURLs = cssMapping.sources.map(function (source) {\n      return '/*# sourceURL=' + cssMapping.sourceRoot + source + ' */';\n    });\n    return [content].concat(sourceURLs).concat([sourceMapping]).join('\\n');\n  }\n\n  return [content].join('\\n');\n} // Adapted from convert-source-map (MIT)\n\n\nfunction toComment(sourceMap) {\n  // eslint-disable-next-line no-undef\n  var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));\n  var data = 'sourceMappingURL=data:application/json;charset=utf-8;base64,' + base64;\n  return '/*# ' + data + ' */';\n}\n\n//# sourceURL=webpack:///./node_modules/css-loader/dist/runtime/api.js?");

/***/ }),

/***/ "./node_modules/gintersect/index.js":
/*!******************************************!*\
  !*** ./node_modules/gintersect/index.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = intersect;\n\n/**\n * Original authors: Mukesh Prasad, Appeared in Graphics Gem II book\n * http://www.opensource.apple.com/source/graphviz/graphviz-498/graphviz/dynagraph/common/xlines.c\n * and adopted to javascript version by Andrei Kashcha.\n *\n * This function computes whether two line segments,\n * respectively joining the input points (x1,y1) -- (x2,y2)\n * and the input points (x3,y3) -- (x4,y4) intersect.\n * If the lines intersect, the output variables x, y are\n * set to coordinates of the point of intersection.\n *\n * @param {Number} x1 First line segment coordinates\n * @param {Number} y1 First line segment coordinates\n * @param {Number} x2 First line segment coordinates\n * @param {Number} x2 First line segment coordinates\n *\n * @param {Number} x3 Second line segment coordinates\n * @param {Number} y3 Second line segment coordinates\n * @param {Number} x4 Second line segment coordinates\n * @param {Number} x4 Second line segment coordinates\n *\n * @return {Object} x, y coordinates of intersection point or falsy value if no\n * intersection found..\n */\nfunction intersect(\n  x1, y1, x2, y2, // first line segment\n  x3, y3, x4, y4  // second line segment\n) {\n\n  var a1, a2, b1, b2, c1, c2, /* Coefficients of line eqns. */\n    r1, r2, r3, r4, /* 'Sign' values */\n    denom, offset, num, /* Intermediate values */\n    result = {\n      x: 0,\n      y: 0\n    };\n\n  /* Compute a1, b1, c1, where line joining points 1 and 2\n   * is \"a1 x  +  b1 y  +  c1  =  0\".\n   */\n  a1 = y2 - y1;\n  b1 = x1 - x2;\n  c1 = x2 * y1 - x1 * y2;\n\n  /* Compute r3 and r4.\n   */\n  r3 = a1 * x3 + b1 * y3 + c1;\n  r4 = a1 * x4 + b1 * y4 + c1;\n\n  /* Check signs of r3 and r4.  If both point 3 and point 4 lie on\n   * same side of line 1, the line segments do not intersect.\n   */\n\n  if (r3 !== 0 && r4 !== 0 && ((r3 >= 0) === (r4 >= 4))) {\n    return null; //no intersection.\n  }\n\n  /* Compute a2, b2, c2 */\n  a2 = y4 - y3;\n  b2 = x3 - x4;\n  c2 = x4 * y3 - x3 * y4;\n\n  /* Compute r1 and r2 */\n\n  r1 = a2 * x1 + b2 * y1 + c2;\n  r2 = a2 * x2 + b2 * y2 + c2;\n\n  /* Check signs of r1 and r2.  If both point 1 and point 2 lie\n   * on same side of second line segment, the line segments do\n   * not intersect.\n   */\n  if (r1 !== 0 && r2 !== 0 && ((r1 >= 0) === (r2 >= 0))) {\n    return null; // no intersection;\n  }\n  /* Line segments intersect: compute intersection point.\n   */\n\n  denom = a1 * b2 - a2 * b1;\n  if (denom === 0) {\n    return null; // Actually collinear..\n  }\n\n  offset = denom < 0 ? -denom / 2 : denom / 2;\n  offset = 0.0;\n\n  /* The denom/2 is to get rounding instead of truncating.  It\n   * is added or subtracted to the numerator, depending upon the\n   * sign of the numerator.\n   */\n  num = b1 * c2 - b2 * c1;\n  result.x = (num < 0 ? num - offset : num + offset) / denom;\n\n  num = a2 * c1 - a1 * c2;\n  result.y = (num < 0 ? num - offset : num + offset) / denom;\n\n  return result;\n}\n\n\n//# sourceURL=webpack:///./node_modules/gintersect/index.js?");

/***/ }),

/***/ "./node_modules/ngraph.centrality/index.js":
/*!*************************************************!*\
  !*** ./node_modules/ngraph.centrality/index.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports.degree = __webpack_require__(/*! ./src/degree.js */ \"./node_modules/ngraph.centrality/src/degree.js\");\nmodule.exports.betweenness = __webpack_require__(/*! ./src/betweenness.js */ \"./node_modules/ngraph.centrality/src/betweenness.js\");\nmodule.exports.closeness = __webpack_require__(/*! ./src/closeness.js */ \"./node_modules/ngraph.centrality/src/closeness.js\");\nmodule.exports.eccentricity = __webpack_require__(/*! ./src/eccentricity.js */ \"./node_modules/ngraph.centrality/src/eccentricity.js\");\n\n\n//# sourceURL=webpack:///./node_modules/ngraph.centrality/index.js?");

/***/ }),

/***/ "./node_modules/ngraph.centrality/src/betweenness.js":
/*!***********************************************************!*\
  !*** ./node_modules/ngraph.centrality/src/betweenness.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = betweennes;\n\n/**\n * I'm using http://www.inf.uni-konstanz.de/algo/publications/b-vspbc-08.pdf\n * as a reference for this implementation\n */\nfunction betweennes(graph, oriented) {\n  var Q = [],\n    S = []; // Queue and Stack\n  // list of predcessors on shorteest paths from source\n  var pred = Object.create(null);\n  // distance from source\n  var dist = Object.create(null);\n  // number of shortest paths from source to key\n  var sigma = Object.create(null);\n  // dependency of source on key\n  var delta = Object.create(null);\n\n  var currentNode;\n  var centrality = Object.create(null);\n\n  graph.forEachNode(setCentralityToZero);\n  graph.forEachNode(calculateCentrality);\n\n  if (!oriented) {\n    // The centrality scores need to be divided by two if the graph is not oriented,\n    // since all shortest paths are considered twice\n    Object.keys(centrality).forEach(divideByTwo);\n  }\n\n  return centrality;\n\n  function divideByTwo(key) {\n    centrality[key] /= 2;\n  }\n\n  function setCentralityToZero(node) {\n    centrality[node.id] = 0;\n  }\n\n  function calculateCentrality(node) {\n    currentNode = node.id;\n    singleSourceShortestPath(currentNode);\n    accumulate();\n  }\n\n  function accumulate() {\n    graph.forEachNode(setDeltaToZero);\n    while (S.length) {\n      var w = S.pop();\n      var coeff = (1 + delta[w])/sigma[w];\n      var predcessors = pred[w];\n      for (var idx = 0; idx < predcessors.length; ++idx) {\n        var v = predcessors[idx];\n        delta[v] += sigma[v] * coeff;\n      }\n      if (w !== currentNode) {\n        centrality[w] += delta[w];\n      }\n    }\n  }\n\n  function setDeltaToZero(node) {\n    delta[node.id] = 0;\n  }\n\n  function singleSourceShortestPath(source) {\n    graph.forEachNode(initNode);\n    dist[source] = 0;\n    sigma[source] = 1;\n    Q.push(source);\n\n    while (Q.length) {\n      var v = Q.shift();\n      S.push(v);\n      graph.forEachLinkedNode(v, toId, oriented);\n    }\n\n    function toId(otherNode) {\n      // NOTE: This code will also consider multi-edges, which are often\n      // ignored by popular software (Gephi/NetworkX). Depending on your use\n      // case this may not be desired and deduping needs to be performed. To\n      // save memory I'm not deduping here...\n      processNode(otherNode.id);\n    }\n\n    function initNode(node) {\n      var nodeId = node.id;\n      pred[nodeId] = []; // empty list\n      dist[nodeId] = -1;\n      sigma[nodeId] = 0;\n    }\n\n    function processNode(w) {\n      // path discovery\n      if (dist[w] === -1) {\n        // Node w is found for the first time\n        dist[w] = dist[v] + 1;\n        Q.push(w);\n      }\n      // path counting\n      if (dist[w] === dist[v] + 1) {\n        // edge (v, w) on a shortest path\n        sigma[w] += sigma[v];\n        pred[w].push(v);\n      }\n    }\n  }\n}\n\n\n//# sourceURL=webpack:///./node_modules/ngraph.centrality/src/betweenness.js?");

/***/ }),

/***/ "./node_modules/ngraph.centrality/src/closeness.js":
/*!*********************************************************!*\
  !*** ./node_modules/ngraph.centrality/src/closeness.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = closeness;\r\n\r\n/**\r\n * In a connected graph, the normalized closeness centrality of a node is the average\r\n * length of the shortest path between the node and all other nodes in the\r\n * graph. Thus the more central a node is, the closer it is to all other nodes.\r\n */\r\nfunction closeness(graph, oriented) {\r\n  var Q = [];\r\n  // list of predcessors on shortest paths from source\r\n  // distance from source\r\n  var dist = Object.create(null);\r\n\r\n  var currentNode;\r\n  var centrality = Object.create(null);\r\n\r\n  graph.forEachNode(setCentralityToZero);\r\n  graph.forEachNode(calculateCentrality);\r\n\r\n  return centrality;\r\n\r\n  function setCentralityToZero(node) {\r\n    centrality[node.id] = 0;\r\n  }\r\n\r\n  function calculateCentrality(node) {\r\n    currentNode = node.id;\r\n    singleSourceShortestPath(currentNode);\r\n    accumulate();\r\n  }\r\n\r\n  function accumulate() {\r\n    // Add all distances for node to array, excluding -1s\r\n    var distances = Object.keys(dist).map(function(key) {return dist[key]}).filter(function(val){return val !== -1});\r\n    // Set number of reachable nodes\r\n    var reachableNodesTotal = distances.length;\r\n    // Compute sum of all distances for node\r\n    var totalDistance = distances.reduce(function(a,b) { return a + b });\r\n    if (totalDistance > 0) {\r\n      centrality[currentNode] = ((reachableNodesTotal - 1) / totalDistance); \r\n    } else {\r\n      centrality[currentNode] = 0;\r\n    }\r\n  }\r\n\r\n  function singleSourceShortestPath(source) {\r\n    graph.forEachNode(initNode);\r\n    dist[source] = 0;\r\n    Q.push(source);\r\n\r\n    while (Q.length) {\r\n      var v = Q.shift();\r\n      graph.forEachLinkedNode(v, processNode, oriented);\r\n    }\r\n\r\n    function initNode(node) {\r\n      var nodeId = node.id;\r\n      dist[nodeId] = -1;\r\n    }\r\n\r\n    function processNode(otherNode) {\r\n      var w = otherNode.id\r\n      if (dist[w] === -1) {\r\n        // Node w is found for the first time\r\n        dist[w] = dist[v] + 1;\r\n        Q.push(w);\r\n      }\r\n    }\r\n  }\r\n}\r\n\n\n//# sourceURL=webpack:///./node_modules/ngraph.centrality/src/closeness.js?");

/***/ }),

/***/ "./node_modules/ngraph.centrality/src/degree.js":
/*!******************************************************!*\
  !*** ./node_modules/ngraph.centrality/src/degree.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = degree;\n\n/**\n * Calculates graph nodes degree centrality (in/out or both).\n *\n * @see http://en.wikipedia.org/wiki/Centrality#Degree_centrality\n *\n * @param {ngraph.graph} graph object for which we are calculating centrality.\n * @param {string} [kind=both] What kind of degree centrality needs to be calculated:\n *   'in'    - calculate in-degree centrality\n *   'out'   - calculate out-degree centrality\n *   'inout' - (default) generic degree centrality is calculated\n */\nfunction degree(graph, kind) {\n  var getNodeDegree;\n  var result = Object.create(null);\n\n  kind = (kind || 'both').toLowerCase();\n  if (kind === 'both' || kind === 'inout') {\n    getNodeDegree = inoutDegreeCalculator;\n  } else if (kind === 'in') {\n    getNodeDegree = inDegreeCalculator;\n  } else if (kind === 'out') {\n    getNodeDegree = outDegreeCalculator;\n  } else {\n    throw new Error('Expected centrality degree kind is: in, out or both');\n  }\n\n  graph.forEachNode(calculateNodeDegree);\n\n  return result;\n\n  function calculateNodeDegree(node) {\n    var links = graph.getLinks(node.id);\n    result[node.id] = getNodeDegree(links, node.id);\n  }\n}\n\nfunction inDegreeCalculator(links, nodeId) {\n  var total = 0;\n  if (!links) return total;\n\n  for (var i = 0; i < links.length; i += 1) {\n    total += (links[i].toId === nodeId) ? 1 : 0;\n  }\n  return total;\n}\n\nfunction outDegreeCalculator(links, nodeId) {\n  var total = 0;\n  if (!links) return total;\n\n  for (var i = 0; i < links.length; i += 1) {\n    total += (links[i].fromId === nodeId) ? 1 : 0;\n  }\n  return total;\n}\n\nfunction inoutDegreeCalculator(links) {\n  if (!links) return 0;\n\n  return links.length;\n}\n\n\n//# sourceURL=webpack:///./node_modules/ngraph.centrality/src/degree.js?");

/***/ }),

/***/ "./node_modules/ngraph.centrality/src/eccentricity.js":
/*!************************************************************!*\
  !*** ./node_modules/ngraph.centrality/src/eccentricity.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = eccentricity;\r\n\r\n/**\r\n * The eccentricity centrality of a node is the greatest distance between that node and\r\n * any other node in the network. \r\n */\r\nfunction eccentricity(graph, oriented) {\r\n  var Q = [];\r\n  // distance from source\r\n  var dist = Object.create(null);\r\n\r\n  var currentNode;\r\n  var centrality = Object.create(null);\r\n\r\n  graph.forEachNode(setCentralityToZero);\r\n  graph.forEachNode(calculateCentrality);\r\n\r\n  return centrality;\r\n\r\n  function setCentralityToZero(node) {\r\n    centrality[node.id] = 0;\r\n  }\r\n\r\n  function calculateCentrality(node) {\r\n    currentNode = node.id;\r\n    singleSourceShortestPath(currentNode);\r\n    accumulate();\r\n  }\r\n\r\n  function accumulate() {\r\n    var maxDist = 0;\r\n    Object.keys(dist).forEach(function (key) {\r\n      var val = dist[key];\r\n      if (maxDist < val) maxDist = val;\r\n    });\r\n\r\n    centrality[currentNode] = maxDist;\r\n  }\r\n\r\n  function singleSourceShortestPath(source) {\r\n    graph.forEachNode(initNode);\r\n    dist[source] = 0;\r\n    Q.push(source);\r\n\r\n    while (Q.length) {\r\n      var v = Q.shift();\r\n      graph.forEachLinkedNode(v, processNode, oriented);\r\n    }\r\n\r\n    function initNode(node) {\r\n      var nodeId = node.id;\r\n      dist[nodeId] = -1;\r\n    }\r\n\r\n    function processNode(otherNode) {\r\n      var w = otherNode.id\r\n      if (dist[w] === -1) {\r\n        // Node w is found for the first time\r\n        dist[w] = dist[v] + 1;\r\n        Q.push(w);\r\n      }\r\n    }\r\n  }\r\n}\r\n\n\n//# sourceURL=webpack:///./node_modules/ngraph.centrality/src/eccentricity.js?");

/***/ }),

/***/ "./node_modules/ngraph.events/index.js":
/*!*********************************************!*\
  !*** ./node_modules/ngraph.events/index.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = function(subject) {\n  validateSubject(subject);\n\n  var eventsStorage = createEventsStorage(subject);\n  subject.on = eventsStorage.on;\n  subject.off = eventsStorage.off;\n  subject.fire = eventsStorage.fire;\n  return subject;\n};\n\nfunction createEventsStorage(subject) {\n  // Store all event listeners to this hash. Key is event name, value is array\n  // of callback records.\n  //\n  // A callback record consists of callback function and its optional context:\n  // { 'eventName' => [{callback: function, ctx: object}] }\n  var registeredEvents = Object.create(null);\n\n  return {\n    on: function (eventName, callback, ctx) {\n      if (typeof callback !== 'function') {\n        throw new Error('callback is expected to be a function');\n      }\n      var handlers = registeredEvents[eventName];\n      if (!handlers) {\n        handlers = registeredEvents[eventName] = [];\n      }\n      handlers.push({callback: callback, ctx: ctx});\n\n      return subject;\n    },\n\n    off: function (eventName, callback) {\n      var wantToRemoveAll = (typeof eventName === 'undefined');\n      if (wantToRemoveAll) {\n        // Killing old events storage should be enough in this case:\n        registeredEvents = Object.create(null);\n        return subject;\n      }\n\n      if (registeredEvents[eventName]) {\n        var deleteAllCallbacksForEvent = (typeof callback !== 'function');\n        if (deleteAllCallbacksForEvent) {\n          delete registeredEvents[eventName];\n        } else {\n          var callbacks = registeredEvents[eventName];\n          for (var i = 0; i < callbacks.length; ++i) {\n            if (callbacks[i].callback === callback) {\n              callbacks.splice(i, 1);\n            }\n          }\n        }\n      }\n\n      return subject;\n    },\n\n    fire: function (eventName) {\n      var callbacks = registeredEvents[eventName];\n      if (!callbacks) {\n        return subject;\n      }\n\n      var fireArguments;\n      if (arguments.length > 1) {\n        fireArguments = Array.prototype.splice.call(arguments, 1);\n      }\n      for(var i = 0; i < callbacks.length; ++i) {\n        var callbackInfo = callbacks[i];\n        callbackInfo.callback.apply(callbackInfo.ctx, fireArguments);\n      }\n\n      return subject;\n    }\n  };\n}\n\nfunction validateSubject(subject) {\n  if (!subject) {\n    throw new Error('Eventify cannot use falsy object as events subject');\n  }\n  var reservedWords = ['on', 'fire', 'off'];\n  for (var i = 0; i < reservedWords.length; ++i) {\n    if (subject.hasOwnProperty(reservedWords[i])) {\n      throw new Error(\"Subject cannot be eventified, since it already has property '\" + reservedWords[i] + \"'\");\n    }\n  }\n}\n\n\n//# sourceURL=webpack:///./node_modules/ngraph.events/index.js?");

/***/ }),

/***/ "./node_modules/ngraph.expose/index.js":
/*!*********************************************!*\
  !*** ./node_modules/ngraph.expose/index.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = exposeProperties;\n\n/**\n * Augments `target` object with getter/setter functions, which modify settings\n *\n * @example\n *  var target = {};\n *  exposeProperties({ age: 42}, target);\n *  target.age(); // returns 42\n *  target.age(24); // make age 24;\n *\n *  var filteredTarget = {};\n *  exposeProperties({ age: 42, name: 'John'}, filteredTarget, ['name']);\n *  filteredTarget.name(); // returns 'John'\n *  filteredTarget.age === undefined; // true\n */\nfunction exposeProperties(settings, target, filter) {\n  var needsFilter = Object.prototype.toString.call(filter) === '[object Array]';\n  if (needsFilter) {\n    for (var i = 0; i < filter.length; ++i) {\n      augment(settings, target, filter[i]);\n    }\n  } else {\n    for (var key in settings) {\n      augment(settings, target, key);\n    }\n  }\n}\n\nfunction augment(source, target, key) {\n  if (source.hasOwnProperty(key)) {\n    if (typeof target[key] === 'function') {\n      // this accessor is already defined. Ignore it\n      return;\n    }\n    target[key] = function (value) {\n      if (value !== undefined) {\n        source[key] = value;\n        return target;\n      }\n      return source[key];\n    }\n  }\n}\n\n\n//# sourceURL=webpack:///./node_modules/ngraph.expose/index.js?");

/***/ }),

/***/ "./node_modules/ngraph.forcelayout/index.js":
/*!**************************************************!*\
  !*** ./node_modules/ngraph.forcelayout/index.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = createLayout;\nmodule.exports.simulator = __webpack_require__(/*! ngraph.physics.simulator */ \"./node_modules/ngraph.physics.simulator/index.js\");\n\nvar eventify = __webpack_require__(/*! ngraph.events */ \"./node_modules/ngraph.forcelayout/node_modules/ngraph.events/index.js\");\n\n/**\n * Creates force based layout for a given graph.\n *\n * @param {ngraph.graph} graph which needs to be laid out\n * @param {object} physicsSettings if you need custom settings\n * for physics simulator you can pass your own settings here. If it's not passed\n * a default one will be created.\n */\nfunction createLayout(graph, physicsSettings) {\n  if (!graph) {\n    throw new Error('Graph structure cannot be undefined');\n  }\n\n  var createSimulator = __webpack_require__(/*! ngraph.physics.simulator */ \"./node_modules/ngraph.physics.simulator/index.js\");\n  var physicsSimulator = createSimulator(physicsSettings);\n\n  var nodeMass = defaultNodeMass\n  if (physicsSettings && typeof physicsSettings.nodeMass === 'function') {\n    nodeMass = physicsSettings.nodeMass\n  }\n\n  var nodeBodies = Object.create(null);\n  var springs = {};\n  var bodiesCount = 0;\n\n  var springTransform = physicsSimulator.settings.springTransform || noop;\n\n  // Initialize physics with what we have in the graph:\n  initPhysics();\n  listenToEvents();\n\n  var wasStable = false;\n\n  var api = {\n    /**\n     * Performs one step of iterative layout algorithm\n     *\n     * @returns {boolean} true if the system should be considered stable; Flase otherwise.\n     * The system is stable if no further call to `step()` can improve the layout.\n     */\n    step: function() {\n      if (bodiesCount === 0) return true; // TODO: This will never fire 'stable'\n\n      var lastMove = physicsSimulator.step();\n\n      // Save the movement in case if someone wants to query it in the step\n      // callback.\n      api.lastMove = lastMove;\n\n      // Allow listeners to perform low-level actions after nodes are updated.\n      api.fire('step');\n\n      var ratio = lastMove/bodiesCount;\n      var isStableNow = ratio <= 0.01; // TODO: The number is somewhat arbitrary...\n\n      if (wasStable !== isStableNow) {\n        wasStable = isStableNow;\n        onStableChanged(isStableNow);\n      }\n\n      return isStableNow;\n    },\n\n    /**\n     * For a given `nodeId` returns position\n     */\n    getNodePosition: function (nodeId) {\n      return getInitializedBody(nodeId).pos;\n    },\n\n    /**\n     * Sets position of a node to a given coordinates\n     * @param {string} nodeId node identifier\n     * @param {number} x position of a node\n     * @param {number} y position of a node\n     * @param {number=} z position of node (only if applicable to body)\n     */\n    setNodePosition: function (nodeId) {\n      var body = getInitializedBody(nodeId);\n      body.setPosition.apply(body, Array.prototype.slice.call(arguments, 1));\n      physicsSimulator.invalidateBBox();\n    },\n\n    /**\n     * @returns {Object} Link position by link id\n     * @returns {Object.from} {x, y} coordinates of link start\n     * @returns {Object.to} {x, y} coordinates of link end\n     */\n    getLinkPosition: function (linkId) {\n      var spring = springs[linkId];\n      if (spring) {\n        return {\n          from: spring.from.pos,\n          to: spring.to.pos\n        };\n      }\n    },\n\n    /**\n     * @returns {Object} area required to fit in the graph. Object contains\n     * `x1`, `y1` - top left coordinates\n     * `x2`, `y2` - bottom right coordinates\n     */\n    getGraphRect: function () {\n      return physicsSimulator.getBBox();\n    },\n\n    /**\n     * Iterates over each body in the layout simulator and performs a callback(body, nodeId)\n     */\n    forEachBody: forEachBody,\n\n    /*\n     * Requests layout algorithm to pin/unpin node to its current position\n     * Pinned nodes should not be affected by layout algorithm and always\n     * remain at their position\n     */\n    pinNode: function (node, isPinned) {\n      var body = getInitializedBody(node.id);\n       body.isPinned = !!isPinned;\n    },\n\n    /**\n     * Checks whether given graph's node is currently pinned\n     */\n    isNodePinned: function (node) {\n      return getInitializedBody(node.id).isPinned;\n    },\n\n    /**\n     * Request to release all resources\n     */\n    dispose: function() {\n      graph.off('changed', onGraphChanged);\n      api.fire('disposed');\n    },\n\n    /**\n     * Gets physical body for a given node id. If node is not found undefined\n     * value is returned.\n     */\n    getBody: getBody,\n\n    /**\n     * Gets spring for a given edge.\n     *\n     * @param {string} linkId link identifer. If two arguments are passed then\n     * this argument is treated as formNodeId\n     * @param {string=} toId when defined this parameter denotes head of the link\n     * and first argument is trated as tail of the link (fromId)\n     */\n    getSpring: getSpring,\n\n    /**\n     * [Read only] Gets current physics simulator\n     */\n    simulator: physicsSimulator,\n\n    /**\n     * Gets the graph that was used for layout\n     */\n    graph: graph,\n\n    /**\n     * Gets amount of movement performed during last step opeartion\n     */\n    lastMove: 0\n  };\n\n  eventify(api);\n\n  return api;\n\n  function forEachBody(cb) {\n    Object.keys(nodeBodies).forEach(function(bodyId) {\n      cb(nodeBodies[bodyId], bodyId);\n    });\n  }\n\n  function getSpring(fromId, toId) {\n    var linkId;\n    if (toId === undefined) {\n      if (typeof fromId !== 'object') {\n        // assume fromId as a linkId:\n        linkId = fromId;\n      } else {\n        // assume fromId to be a link object:\n        linkId = fromId.id;\n      }\n    } else {\n      // toId is defined, should grab link:\n      var link = graph.hasLink(fromId, toId);\n      if (!link) return;\n      linkId = link.id;\n    }\n\n    return springs[linkId];\n  }\n\n  function getBody(nodeId) {\n    return nodeBodies[nodeId];\n  }\n\n  function listenToEvents() {\n    graph.on('changed', onGraphChanged);\n  }\n\n  function onStableChanged(isStable) {\n    api.fire('stable', isStable);\n  }\n\n  function onGraphChanged(changes) {\n    for (var i = 0; i < changes.length; ++i) {\n      var change = changes[i];\n      if (change.changeType === 'add') {\n        if (change.node) {\n          initBody(change.node.id);\n        }\n        if (change.link) {\n          initLink(change.link);\n        }\n      } else if (change.changeType === 'remove') {\n        if (change.node) {\n          releaseNode(change.node);\n        }\n        if (change.link) {\n          releaseLink(change.link);\n        }\n      }\n    }\n    bodiesCount = graph.getNodesCount();\n  }\n\n  function initPhysics() {\n    bodiesCount = 0;\n\n    graph.forEachNode(function (node) {\n      initBody(node.id);\n      bodiesCount += 1;\n    });\n\n    graph.forEachLink(initLink);\n  }\n\n  function initBody(nodeId) {\n    var body = nodeBodies[nodeId];\n    if (!body) {\n      var node = graph.getNode(nodeId);\n      if (!node) {\n        throw new Error('initBody() was called with unknown node id');\n      }\n\n      var pos = node.position;\n      if (!pos) {\n        var neighbors = getNeighborBodies(node);\n        pos = physicsSimulator.getBestNewBodyPosition(neighbors);\n      }\n\n      body = physicsSimulator.addBodyAt(pos);\n      body.id = nodeId;\n\n      nodeBodies[nodeId] = body;\n      updateBodyMass(nodeId);\n\n      if (isNodeOriginallyPinned(node)) {\n        body.isPinned = true;\n      }\n    }\n  }\n\n  function releaseNode(node) {\n    var nodeId = node.id;\n    var body = nodeBodies[nodeId];\n    if (body) {\n      nodeBodies[nodeId] = null;\n      delete nodeBodies[nodeId];\n\n      physicsSimulator.removeBody(body);\n    }\n  }\n\n  function initLink(link) {\n    updateBodyMass(link.fromId);\n    updateBodyMass(link.toId);\n\n    var fromBody = nodeBodies[link.fromId],\n        toBody  = nodeBodies[link.toId],\n        spring = physicsSimulator.addSpring(fromBody, toBody, link.length);\n\n    springTransform(link, spring);\n\n    springs[link.id] = spring;\n  }\n\n  function releaseLink(link) {\n    var spring = springs[link.id];\n    if (spring) {\n      var from = graph.getNode(link.fromId),\n          to = graph.getNode(link.toId);\n\n      if (from) updateBodyMass(from.id);\n      if (to) updateBodyMass(to.id);\n\n      delete springs[link.id];\n\n      physicsSimulator.removeSpring(spring);\n    }\n  }\n\n  function getNeighborBodies(node) {\n    // TODO: Could probably be done better on memory\n    var neighbors = [];\n    if (!node.links) {\n      return neighbors;\n    }\n    var maxNeighbors = Math.min(node.links.length, 2);\n    for (var i = 0; i < maxNeighbors; ++i) {\n      var link = node.links[i];\n      var otherBody = link.fromId !== node.id ? nodeBodies[link.fromId] : nodeBodies[link.toId];\n      if (otherBody && otherBody.pos) {\n        neighbors.push(otherBody);\n      }\n    }\n\n    return neighbors;\n  }\n\n  function updateBodyMass(nodeId) {\n    var body = nodeBodies[nodeId];\n    body.mass = nodeMass(nodeId);\n    if (Number.isNaN(body.mass)) {\n      throw new Error('Node mass should be a number')\n    }\n  }\n\n  /**\n   * Checks whether graph node has in its settings pinned attribute,\n   * which means layout algorithm cannot move it. Node can be preconfigured\n   * as pinned, if it has \"isPinned\" attribute, or when node.data has it.\n   *\n   * @param {Object} node a graph node to check\n   * @return {Boolean} true if node should be treated as pinned; false otherwise.\n   */\n  function isNodeOriginallyPinned(node) {\n    return (node && (node.isPinned || (node.data && node.data.isPinned)));\n  }\n\n  function getInitializedBody(nodeId) {\n    var body = nodeBodies[nodeId];\n    if (!body) {\n      initBody(nodeId);\n      body = nodeBodies[nodeId];\n    }\n    return body;\n  }\n\n  /**\n   * Calculates mass of a body, which corresponds to node with given id.\n   *\n   * @param {String|Number} nodeId identifier of a node, for which body mass needs to be calculated\n   * @returns {Number} recommended mass of the body;\n   */\n  function defaultNodeMass(nodeId) {\n    var links = graph.getLinks(nodeId);\n    if (!links) return 1;\n    return 1 + links.length / 3.0;\n  }\n}\n\nfunction noop() { }\n\n\n//# sourceURL=webpack:///./node_modules/ngraph.forcelayout/index.js?");

/***/ }),

/***/ "./node_modules/ngraph.forcelayout/node_modules/ngraph.events/index.js":
/*!*****************************************************************************!*\
  !*** ./node_modules/ngraph.forcelayout/node_modules/ngraph.events/index.js ***!
  \*****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = function(subject) {\n  validateSubject(subject);\n\n  var eventsStorage = createEventsStorage(subject);\n  subject.on = eventsStorage.on;\n  subject.off = eventsStorage.off;\n  subject.fire = eventsStorage.fire;\n  return subject;\n};\n\nfunction createEventsStorage(subject) {\n  // Store all event listeners to this hash. Key is event name, value is array\n  // of callback records.\n  //\n  // A callback record consists of callback function and its optional context:\n  // { 'eventName' => [{callback: function, ctx: object}] }\n  var registeredEvents = Object.create(null);\n\n  return {\n    on: function (eventName, callback, ctx) {\n      if (typeof callback !== 'function') {\n        throw new Error('callback is expected to be a function');\n      }\n      var handlers = registeredEvents[eventName];\n      if (!handlers) {\n        handlers = registeredEvents[eventName] = [];\n      }\n      handlers.push({callback: callback, ctx: ctx});\n\n      return subject;\n    },\n\n    off: function (eventName, callback) {\n      var wantToRemoveAll = (typeof eventName === 'undefined');\n      if (wantToRemoveAll) {\n        // Killing old events storage should be enough in this case:\n        registeredEvents = Object.create(null);\n        return subject;\n      }\n\n      if (registeredEvents[eventName]) {\n        var deleteAllCallbacksForEvent = (typeof callback !== 'function');\n        if (deleteAllCallbacksForEvent) {\n          delete registeredEvents[eventName];\n        } else {\n          var callbacks = registeredEvents[eventName];\n          for (var i = 0; i < callbacks.length; ++i) {\n            if (callbacks[i].callback === callback) {\n              callbacks.splice(i, 1);\n            }\n          }\n        }\n      }\n\n      return subject;\n    },\n\n    fire: function (eventName) {\n      var callbacks = registeredEvents[eventName];\n      if (!callbacks) {\n        return subject;\n      }\n\n      var fireArguments;\n      if (arguments.length > 1) {\n        fireArguments = Array.prototype.splice.call(arguments, 1);\n      }\n      for(var i = 0; i < callbacks.length; ++i) {\n        var callbackInfo = callbacks[i];\n        callbackInfo.callback.apply(callbackInfo.ctx, fireArguments);\n      }\n\n      return subject;\n    }\n  };\n}\n\nfunction validateSubject(subject) {\n  if (!subject) {\n    throw new Error('Eventify cannot use falsy object as events subject');\n  }\n  var reservedWords = ['on', 'fire', 'off'];\n  for (var i = 0; i < reservedWords.length; ++i) {\n    if (subject.hasOwnProperty(reservedWords[i])) {\n      throw new Error(\"Subject cannot be eventified, since it already has property '\" + reservedWords[i] + \"'\");\n    }\n  }\n}\n\n\n//# sourceURL=webpack:///./node_modules/ngraph.forcelayout/node_modules/ngraph.events/index.js?");

/***/ }),

/***/ "./node_modules/ngraph.fromjson/index.js":
/*!***********************************************!*\
  !*** ./node_modules/ngraph.fromjson/index.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = load;\n\nvar createGraph = __webpack_require__(/*! ngraph.graph */ \"./node_modules/ngraph.graph/index.js\");\n\nfunction load(jsonGraph, nodeTransform, linkTransform) {\n  var stored;\n  nodeTransform = nodeTransform || id;\n  linkTransform = linkTransform || id;\n  if (typeof jsonGraph === 'string') {\n    stored = JSON.parse(jsonGraph);\n  } else {\n    stored = jsonGraph;\n  }\n\n  var graph = createGraph(),\n      i;\n\n  if (stored.links === undefined || stored.nodes === undefined) {\n    throw new Error('Cannot load graph without links and nodes');\n  }\n\n  for (i = 0; i < stored.nodes.length; ++i) {\n    var parsedNode = nodeTransform(stored.nodes[i]);\n    if (!parsedNode.hasOwnProperty('id')) {\n      throw new Error('Graph node format is invalid: Node id is missing');\n    }\n\n    graph.addNode(parsedNode.id, parsedNode.data);\n  }\n\n  for (i = 0; i < stored.links.length; ++i) {\n    var link = linkTransform(stored.links[i]);\n    if (!link.hasOwnProperty('fromId') || !link.hasOwnProperty('toId')) {\n      throw new Error('Graph link format is invalid. Both fromId and toId are required');\n    }\n\n    graph.addLink(link.fromId, link.toId, link.data);\n  }\n\n  return graph;\n}\n\nfunction id(x) { return x; }\n\n\n//# sourceURL=webpack:///./node_modules/ngraph.fromjson/index.js?");

/***/ }),

/***/ "./node_modules/ngraph.generators/index.js":
/*!*************************************************!*\
  !*** ./node_modules/ngraph.generators/index.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var createGraph = __webpack_require__(/*! ngraph.graph */ \"./node_modules/ngraph.graph/index.js\");\n\nmodule.exports = factory(createGraph);\n\n// Allow other developers have their own createGraph\nmodule.exports.factory = factory;\n\nfunction factory(createGraph) {\n  return {\n    ladder: ladder,\n    complete: complete,\n    completeBipartite: completeBipartite,\n    balancedBinTree: balancedBinTree,\n    path: path,\n    circularLadder: circularLadder,\n    grid: grid,\n    grid3: grid3,\n    noLinks: noLinks,\n    wattsStrogatz: wattsStrogatz,\n    cliqueCircle: cliqueCircle\n  };\n\n\n  function ladder(n) {\n  /**\n  * Ladder graph is a graph in form of ladder\n  * @param {Number} n Represents number of steps in the ladder\n  */\n    if (!n || n < 0) {\n      throw new Error(\"Invalid number of nodes\");\n    }\n\n    var g = createGraph(),\n        i;\n\n    for (i = 0; i < n - 1; ++i) {\n      g.addLink(i, i + 1);\n      // first row\n      g.addLink(n + i, n + i + 1);\n      // second row\n      g.addLink(i, n + i);\n      // ladder's step\n    }\n\n    g.addLink(n - 1, 2 * n - 1);\n    // last step in the ladder;\n\n    return g;\n  }\n\n  function circularLadder(n) {\n  /**\n  * Circular ladder with n steps.\n  *\n  * @param {Number} n of steps in the ladder.\n  */\n      if (!n || n < 0) {\n          throw new Error(\"Invalid number of nodes\");\n      }\n\n      var g = ladder(n);\n\n      g.addLink(0, n - 1);\n      g.addLink(n, 2 * n - 1);\n      return g;\n  }\n\n  function complete(n) {\n  /**\n  * Complete graph Kn.\n  *\n  * @param {Number} n represents number of nodes in the complete graph.\n  */\n    if (!n || n < 1) {\n      throw new Error(\"At least two nodes are expected for complete graph\");\n    }\n\n    var g = createGraph(),\n        i,\n        j;\n\n    for (i = 0; i < n; ++i) {\n      for (j = i + 1; j < n; ++j) {\n        if (i !== j) {\n          g.addLink(i, j);\n        }\n      }\n    }\n\n    return g;\n  }\n\n  function completeBipartite (n, m) {\n  /**\n  * Complete bipartite graph K n,m. Each node in the\n  * first partition is connected to all nodes in the second partition.\n  *\n  * @param {Number} n represents number of nodes in the first graph partition\n  * @param {Number} m represents number of nodes in the second graph partition\n  */\n    if (!n || !m || n < 0 || m < 0) {\n      throw new Error(\"Graph dimensions are invalid. Number of nodes in each partition should be greater than 0\");\n    }\n\n    var g = createGraph(),\n        i, j;\n\n    for (i = 0; i < n; ++i) {\n      for (j = n; j < n + m; ++j) {\n        g.addLink(i, j);\n      }\n    }\n\n    return g;\n  }\n\n  function path(n) {\n  /**\n  * Path graph with n steps.\n  *\n  * @param {Number} n number of nodes in the path\n  */\n    if (!n || n < 0) {\n      throw new Error(\"Invalid number of nodes\");\n    }\n\n    var g = createGraph(),\n        i;\n\n    g.addNode(0);\n\n    for (i = 1; i < n; ++i) {\n      g.addLink(i - 1, i);\n    }\n\n    return g;\n  }\n\n\n  function grid(n, m) {\n  /**\n  * Grid graph with n rows and m columns.\n  *\n  * @param {Number} n of rows in the graph.\n  * @param {Number} m of columns in the graph.\n  */\n    if (n < 1 || m < 1) {\n      throw new Error(\"Invalid number of nodes in grid graph\");\n    }\n    var g = createGraph(),\n        i,\n        j;\n    if (n === 1 && m === 1) {\n      g.addNode(0);\n      return g;\n    }\n\n    for (i = 0; i < n; ++i) {\n      for (j = 0; j < m; ++j) {\n        var node = i + j * n;\n        if (i > 0) { g.addLink(node, i - 1 + j * n); }\n        if (j > 0) { g.addLink(node, i + (j - 1) * n); }\n      }\n    }\n\n    return g;\n  }\n\n  function grid3(n, m, z) {\n  /**\n  * 3D grid with n rows and m columns and z levels.\n  *\n  * @param {Number} n of rows in the graph.\n  * @param {Number} m of columns in the graph.\n  * @param {Number} z of levels in the graph.\n  */\n    if (n < 1 || m < 1 || z < 1) {\n      throw new Error(\"Invalid number of nodes in grid3 graph\");\n    }\n    var g = createGraph(),\n        i, j, k;\n\n    if (n === 1 && m === 1 && z === 1) {\n      g.addNode(0);\n      return g;\n    }\n\n    for (k = 0; k < z; ++k) {\n      for (i = 0; i < n; ++i) {\n        for (j = 0; j < m; ++j) {\n          var level = k * n * m;\n          var node = i + j * n + level;\n          if (i > 0) { g.addLink(node, i - 1 + j * n + level); }\n          if (j > 0) { g.addLink(node, i + (j - 1) * n + level); }\n          if (k > 0) { g.addLink(node, i + j * n + (k - 1) * n * m ); }\n        }\n      }\n    }\n\n    return g;\n  }\n\n  function balancedBinTree(n) {\n  /**\n  * Balanced binary tree with n levels.\n  *\n  * @param {Number} n of levels in the binary tree\n  */\n    if (n < 0) {\n      throw new Error(\"Invalid number of nodes in balanced tree\");\n    }\n    var g = createGraph(),\n        count = Math.pow(2, n),\n        level;\n\n    if (n === 0) {\n      g.addNode(1);\n    }\n\n    for (level = 1; level < count; ++level) {\n      var root = level,\n        left = root * 2,\n        right = root * 2 + 1;\n\n      g.addLink(root, left);\n      g.addLink(root, right);\n    }\n\n    return g;\n  }\n\n  function noLinks(n) {\n  /**\n  * Graph with no links\n  *\n  * @param {Number} n of nodes in the graph\n  */\n    if (n < 0) {\n      throw new Error(\"Number of nodes should be >= 0\");\n    }\n\n    var g = createGraph(), i;\n    for (i = 0; i < n; ++i) {\n      g.addNode(i);\n    }\n\n    return g;\n  }\n\n  function cliqueCircle(cliqueCount, cliqueSize) {\n  /**\n  * A circular graph with cliques instead of individual nodes\n  *\n  * @param {Number} cliqueCount number of cliques inside circle\n  * @param {Number} cliqueSize number of nodes inside each clique\n  */\n\n    if (cliqueCount < 1) throw new Error('Invalid number of cliqueCount in cliqueCircle');\n    if (cliqueSize < 1) throw new Error('Invalid number of cliqueSize in cliqueCircle');\n\n    var graph = createGraph();\n\n    for (var i = 0; i < cliqueCount; ++i) {\n      appendClique(cliqueSize, i * cliqueSize)\n\n      if (i > 0) {\n        graph.addLink(i * cliqueSize, i * cliqueSize - 1);\n      }\n    }\n    graph.addLink(0, graph.getNodesCount() - 1);\n\n    return graph;\n\n    function appendClique(size, from) {\n      for (var i = 0; i < size; ++i) {\n        graph.addNode(i + from)\n      }\n\n      for (var i = 0; i < size; ++i) {\n        for (var j = i + 1; j < size; ++j) {\n          graph.addLink(i + from, j + from)\n        }\n      }\n    }\n  }\n\n  function wattsStrogatz(n, k, p, seed) {\n  /**\n  * Watts-Strogatz small-world graph.\n  *\n  * @param {Number} n The number of nodes\n  * @param {Number} k Each node is connected to k nearest neighbors in ring topology\n  * @param {Number} p The probability of rewiring each edge\n\n  * @see https://github.com/networkx/networkx/blob/master/networkx/generators/random_graphs.py\n  */\n    if (k >= n) throw new Error('Choose smaller `k`. It cannot be larger than number of nodes `n`');\n\n\n    var random = __webpack_require__(/*! ngraph.random */ \"./node_modules/ngraph.generators/node_modules/ngraph.random/index.js\").random(seed || 42);\n\n    var g = createGraph(), i, to;\n    for (i = 0; i < n; ++i) {\n      g.addNode(i);\n    }\n\n    // connect each node to k/2 neighbors\n    var neighborsSize = Math.floor(k/2 + 1);\n    for (var j = 1; j < neighborsSize; ++j) {\n      for (i = 0; i < n; ++i) {\n        to = (j + i) % n;\n        g.addLink(i, to);\n      }\n    }\n\n    // rewire edges from each node\n    // loop over all nodes in order (label) and neighbors in order (distance)\n    // no self loops or multiple edges allowed\n    for (j = 1; j < neighborsSize; ++j) {\n      for (i = 0; i < n; ++i) {\n        if (random.nextDouble() < p) {\n          var from = i;\n          to = (j + i) % n;\n\n          var newTo = random.next(n);\n          var needsRewire = (newTo === from || g.hasLink(from, newTo));\n          if (needsRewire && g.getLinks(from).length === n - 1) {\n            // we cannot rewire this node, it has too many links.\n            continue;\n          }\n          // Enforce no self-loops or multiple edges\n          while (needsRewire) {\n            newTo = random.next(n);\n            needsRewire = (newTo === from || g.hasLink(from, newTo));\n          }\n          var link = g.hasLink(from, to);\n          g.removeLink(link);\n          g.addLink(from, newTo);\n        }\n      }\n    }\n\n    return g;\n  }\n}\n\n\n//# sourceURL=webpack:///./node_modules/ngraph.generators/index.js?");

/***/ }),

/***/ "./node_modules/ngraph.generators/node_modules/ngraph.random/index.js":
/*!****************************************************************************!*\
  !*** ./node_modules/ngraph.generators/node_modules/ngraph.random/index.js ***!
  \****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = random;\n\n// TODO: Deprecate?\nmodule.exports.random = random,\nmodule.exports.randomIterator = randomIterator\n\n/**\n * Creates seeded PRNG with two methods:\n *   next() and nextDouble()\n */\nfunction random(inputSeed) {\n  var seed = typeof inputSeed === 'number' ? inputSeed : (+new Date());\n  return new Generator(seed)\n}\n\nfunction Generator(seed) {\n  this.seed = seed;\n}\n\n/**\n  * Generates random integer number in the range from 0 (inclusive) to maxValue (exclusive)\n  *\n  * @param maxValue Number REQUIRED. Omitting this number will result in NaN values from PRNG.\n  */\nGenerator.prototype.next = next;\n\n/**\n  * Generates random double number in the range from 0 (inclusive) to 1 (exclusive)\n  * This function is the same as Math.random() (except that it could be seeded)\n  */\nGenerator.prototype.nextDouble = nextDouble;\n\n/**\n * Returns a random real number uniformly in [0, 1)\n */\nGenerator.prototype.uniform = nextDouble;\n\nGenerator.prototype.gaussian = gaussian;\n\nfunction gaussian() {\n  // use the polar form of the Box-Muller transform\n  // based on https://introcs.cs.princeton.edu/java/23recursion/StdRandom.java\n  var r, x, y;\n  do {\n    x = this.nextDouble() * 2 - 1;\n    y = this.nextDouble() * 2 - 1;\n    r = x * x + y * y;\n  } while (r >= 1 || r === 0);\n\n  return x * Math.sqrt(-2 * Math.log(r)/r);\n}\n\nfunction nextDouble() {\n  var seed = this.seed;\n  // Robert Jenkins' 32 bit integer hash function.\n  seed = ((seed + 0x7ed55d16) + (seed << 12)) & 0xffffffff;\n  seed = ((seed ^ 0xc761c23c) ^ (seed >>> 19)) & 0xffffffff;\n  seed = ((seed + 0x165667b1) + (seed << 5)) & 0xffffffff;\n  seed = ((seed + 0xd3a2646c) ^ (seed << 9)) & 0xffffffff;\n  seed = ((seed + 0xfd7046c5) + (seed << 3)) & 0xffffffff;\n  seed = ((seed ^ 0xb55a4f09) ^ (seed >>> 16)) & 0xffffffff;\n  this.seed = seed;\n  return (seed & 0xfffffff) / 0x10000000;\n}\n\nfunction next(maxValue) {\n  return Math.floor(this.nextDouble() * maxValue);\n}\n\n/*\n * Creates iterator over array, which returns items of array in random order\n * Time complexity is guaranteed to be O(n);\n */\nfunction randomIterator(array, customRandom) {\n  var localRandom = customRandom || random();\n  if (typeof localRandom.next !== 'function') {\n    throw new Error('customRandom does not match expected API: next() function is missing');\n  }\n\n  return {\n    forEach: forEach,\n\n    /**\n     * Shuffles array randomly, in place.\n     */\n    shuffle: shuffle\n  };\n\n  function shuffle() {\n    var i, j, t;\n    for (i = array.length - 1; i > 0; --i) {\n      j = localRandom.next(i + 1); // i inclusive\n      t = array[j];\n      array[j] = array[i];\n      array[i] = t;\n    }\n\n    return array;\n  }\n\n  function forEach(callback) {\n    var i, j, t;\n    for (i = array.length - 1; i > 0; --i) {\n      j = localRandom.next(i + 1); // i inclusive\n      t = array[j];\n      array[j] = array[i];\n      array[i] = t;\n\n      callback(t);\n    }\n\n    if (array.length) {\n      callback(array[0]);\n    }\n  }\n}\n\n//# sourceURL=webpack:///./node_modules/ngraph.generators/node_modules/ngraph.random/index.js?");

/***/ }),

/***/ "./node_modules/ngraph.graph/index.js":
/*!********************************************!*\
  !*** ./node_modules/ngraph.graph/index.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("/**\n * @fileOverview Contains definition of the core graph object.\n */\n\n// TODO: need to change storage layer:\n// 1. Be able to get all nodes O(1)\n// 2. Be able to get number of links O(1)\n\n/**\n * @example\n *  var graph = require('ngraph.graph')();\n *  graph.addNode(1);     // graph has one node.\n *  graph.addLink(2, 3);  // now graph contains three nodes and one link.\n *\n */\nmodule.exports = createGraph;\n\nvar eventify = __webpack_require__(/*! ngraph.events */ \"./node_modules/ngraph.events/index.js\");\n\n/**\n * Creates a new graph\n */\nfunction createGraph(options) {\n  // Graph structure is maintained as dictionary of nodes\n  // and array of links. Each node has 'links' property which\n  // hold all links related to that node. And general links\n  // array is used to speed up all links enumeration. This is inefficient\n  // in terms of memory, but simplifies coding.\n  options = options || {};\n  if ('uniqueLinkId' in options) {\n    console.warn(\n      'ngraph.graph: Starting from version 0.14 `uniqueLinkId` is deprecated.\\n' +\n      'Use `multigraph` option instead\\n',\n      '\\n',\n      'Note: there is also change in default behavior: From now own each graph\\n'+\n      'is considered to be not a multigraph by default (each edge is unique).'\n    );\n\n    options.multigraph = options.uniqueLinkId;\n  }\n\n  // Dear reader, the non-multigraphs do not guarantee that there is only\n  // one link for a given pair of node. When this option is set to false\n  // we can save some memory and CPU (18% faster for non-multigraph);\n  if (options.multigraph === undefined) options.multigraph = false;\n\n  var nodes = typeof Object.create === 'function' ? Object.create(null) : {},\n    links = [],\n    // Hash of multi-edges. Used to track ids of edges between same nodes\n    multiEdges = {},\n    nodesCount = 0,\n    suspendEvents = 0,\n\n    forEachNode = createNodeIterator(),\n    createLink = options.multigraph ? createUniqueLink : createSingleLink,\n\n    // Our graph API provides means to listen to graph changes. Users can subscribe\n    // to be notified about changes in the graph by using `on` method. However\n    // in some cases they don't use it. To avoid unnecessary memory consumption\n    // we will not record graph changes until we have at least one subscriber.\n    // Code below supports this optimization.\n    //\n    // Accumulates all changes made during graph updates.\n    // Each change element contains:\n    //  changeType - one of the strings: 'add', 'remove' or 'update';\n    //  node - if change is related to node this property is set to changed graph's node;\n    //  link - if change is related to link this property is set to changed graph's link;\n    changes = [],\n    recordLinkChange = noop,\n    recordNodeChange = noop,\n    enterModification = noop,\n    exitModification = noop;\n\n  // this is our public API:\n  var graphPart = {\n    /**\n     * Adds node to the graph. If node with given id already exists in the graph\n     * its data is extended with whatever comes in 'data' argument.\n     *\n     * @param nodeId the node's identifier. A string or number is preferred.\n     * @param [data] additional data for the node being added. If node already\n     *   exists its data object is augmented with the new one.\n     *\n     * @return {node} The newly added node or node with given id if it already exists.\n     */\n    addNode: addNode,\n\n    /**\n     * Adds a link to the graph. The function always create a new\n     * link between two nodes. If one of the nodes does not exists\n     * a new node is created.\n     *\n     * @param fromId link start node id;\n     * @param toId link end node id;\n     * @param [data] additional data to be set on the new link;\n     *\n     * @return {link} The newly created link\n     */\n    addLink: addLink,\n\n    /**\n     * Removes link from the graph. If link does not exist does nothing.\n     *\n     * @param link - object returned by addLink() or getLinks() methods.\n     *\n     * @returns true if link was removed; false otherwise.\n     */\n    removeLink: removeLink,\n\n    /**\n     * Removes node with given id from the graph. If node does not exist in the graph\n     * does nothing.\n     *\n     * @param nodeId node's identifier passed to addNode() function.\n     *\n     * @returns true if node was removed; false otherwise.\n     */\n    removeNode: removeNode,\n\n    /**\n     * Gets node with given identifier. If node does not exist undefined value is returned.\n     *\n     * @param nodeId requested node identifier;\n     *\n     * @return {node} in with requested identifier or undefined if no such node exists.\n     */\n    getNode: getNode,\n\n    /**\n     * Gets number of nodes in this graph.\n     *\n     * @return number of nodes in the graph.\n     */\n    getNodesCount: function () {\n      return nodesCount;\n    },\n\n    /**\n     * Gets total number of links in the graph.\n     */\n    getLinksCount: function () {\n      return links.length;\n    },\n\n    /**\n     * Gets all links (inbound and outbound) from the node with given id.\n     * If node with given id is not found null is returned.\n     *\n     * @param nodeId requested node identifier.\n     *\n     * @return Array of links from and to requested node if such node exists;\n     *   otherwise null is returned.\n     */\n    getLinks: getLinks,\n\n    /**\n     * Invokes callback on each node of the graph.\n     *\n     * @param {Function(node)} callback Function to be invoked. The function\n     *   is passed one argument: visited node.\n     */\n    forEachNode: forEachNode,\n\n    /**\n     * Invokes callback on every linked (adjacent) node to the given one.\n     *\n     * @param nodeId Identifier of the requested node.\n     * @param {Function(node, link)} callback Function to be called on all linked nodes.\n     *   The function is passed two parameters: adjacent node and link object itself.\n     * @param oriented if true graph treated as oriented.\n     */\n    forEachLinkedNode: forEachLinkedNode,\n\n    /**\n     * Enumerates all links in the graph\n     *\n     * @param {Function(link)} callback Function to be called on all links in the graph.\n     *   The function is passed one parameter: graph's link object.\n     *\n     * Link object contains at least the following fields:\n     *  fromId - node id where link starts;\n     *  toId - node id where link ends,\n     *  data - additional data passed to graph.addLink() method.\n     */\n    forEachLink: forEachLink,\n\n    /**\n     * Suspend all notifications about graph changes until\n     * endUpdate is called.\n     */\n    beginUpdate: enterModification,\n\n    /**\n     * Resumes all notifications about graph changes and fires\n     * graph 'changed' event in case there are any pending changes.\n     */\n    endUpdate: exitModification,\n\n    /**\n     * Removes all nodes and links from the graph.\n     */\n    clear: clear,\n\n    /**\n     * Detects whether there is a link between two nodes.\n     * Operation complexity is O(n) where n - number of links of a node.\n     * NOTE: this function is synonim for getLink()\n     *\n     * @returns link if there is one. null otherwise.\n     */\n    hasLink: getLink,\n\n    /**\n     * Detects whether there is a node with given id\n     * \n     * Operation complexity is O(1)\n     * NOTE: this function is synonim for getNode()\n     *\n     * @returns node if there is one; Falsy value otherwise.\n     */\n    hasNode: getNode,\n\n    /**\n     * Gets an edge between two nodes.\n     * Operation complexity is O(n) where n - number of links of a node.\n     *\n     * @param {string} fromId link start identifier\n     * @param {string} toId link end identifier\n     *\n     * @returns link if there is one. null otherwise.\n     */\n    getLink: getLink\n  };\n\n  // this will add `on()` and `fire()` methods.\n  eventify(graphPart);\n\n  monitorSubscribers();\n\n  return graphPart;\n\n  function monitorSubscribers() {\n    var realOn = graphPart.on;\n\n    // replace real `on` with our temporary on, which will trigger change\n    // modification monitoring:\n    graphPart.on = on;\n\n    function on() {\n      // now it's time to start tracking stuff:\n      graphPart.beginUpdate = enterModification = enterModificationReal;\n      graphPart.endUpdate = exitModification = exitModificationReal;\n      recordLinkChange = recordLinkChangeReal;\n      recordNodeChange = recordNodeChangeReal;\n\n      // this will replace current `on` method with real pub/sub from `eventify`.\n      graphPart.on = realOn;\n      // delegate to real `on` handler:\n      return realOn.apply(graphPart, arguments);\n    }\n  }\n\n  function recordLinkChangeReal(link, changeType) {\n    changes.push({\n      link: link,\n      changeType: changeType\n    });\n  }\n\n  function recordNodeChangeReal(node, changeType) {\n    changes.push({\n      node: node,\n      changeType: changeType\n    });\n  }\n\n  function addNode(nodeId, data) {\n    if (nodeId === undefined) {\n      throw new Error('Invalid node identifier');\n    }\n\n    enterModification();\n\n    var node = getNode(nodeId);\n    if (!node) {\n      node = new Node(nodeId, data);\n      nodesCount++;\n      recordNodeChange(node, 'add');\n    } else {\n      node.data = data;\n      recordNodeChange(node, 'update');\n    }\n\n    nodes[nodeId] = node;\n\n    exitModification();\n    return node;\n  }\n\n  function getNode(nodeId) {\n    return nodes[nodeId];\n  }\n\n  function removeNode(nodeId) {\n    var node = getNode(nodeId);\n    if (!node) {\n      return false;\n    }\n\n    enterModification();\n\n    var prevLinks = node.links;\n    if (prevLinks) {\n      node.links = null;\n      for(var i = 0; i < prevLinks.length; ++i) {\n        removeLink(prevLinks[i]);\n      }\n    }\n\n    delete nodes[nodeId];\n    nodesCount--;\n\n    recordNodeChange(node, 'remove');\n\n    exitModification();\n\n    return true;\n  }\n\n\n  function addLink(fromId, toId, data) {\n    enterModification();\n\n    var fromNode = getNode(fromId) || addNode(fromId);\n    var toNode = getNode(toId) || addNode(toId);\n\n    var link = createLink(fromId, toId, data);\n\n    links.push(link);\n\n    // TODO: this is not cool. On large graphs potentially would consume more memory.\n    addLinkToNode(fromNode, link);\n    if (fromId !== toId) {\n      // make sure we are not duplicating links for self-loops\n      addLinkToNode(toNode, link);\n    }\n\n    recordLinkChange(link, 'add');\n\n    exitModification();\n\n    return link;\n  }\n\n  function createSingleLink(fromId, toId, data) {\n    var linkId = makeLinkId(fromId, toId);\n    return new Link(fromId, toId, data, linkId);\n  }\n\n  function createUniqueLink(fromId, toId, data) {\n    // TODO: Get rid of this method.\n    var linkId = makeLinkId(fromId, toId);\n    var isMultiEdge = multiEdges.hasOwnProperty(linkId);\n    if (isMultiEdge || getLink(fromId, toId)) {\n      if (!isMultiEdge) {\n        multiEdges[linkId] = 0;\n      }\n      var suffix = '@' + (++multiEdges[linkId]);\n      linkId = makeLinkId(fromId + suffix, toId + suffix);\n    }\n\n    return new Link(fromId, toId, data, linkId);\n  }\n\n  function getLinks(nodeId) {\n    var node = getNode(nodeId);\n    return node ? node.links : null;\n  }\n\n  function removeLink(link) {\n    if (!link) {\n      return false;\n    }\n    var idx = indexOfElementInArray(link, links);\n    if (idx < 0) {\n      return false;\n    }\n\n    enterModification();\n\n    links.splice(idx, 1);\n\n    var fromNode = getNode(link.fromId);\n    var toNode = getNode(link.toId);\n\n    if (fromNode) {\n      idx = indexOfElementInArray(link, fromNode.links);\n      if (idx >= 0) {\n        fromNode.links.splice(idx, 1);\n      }\n    }\n\n    if (toNode) {\n      idx = indexOfElementInArray(link, toNode.links);\n      if (idx >= 0) {\n        toNode.links.splice(idx, 1);\n      }\n    }\n\n    recordLinkChange(link, 'remove');\n\n    exitModification();\n\n    return true;\n  }\n\n  function getLink(fromNodeId, toNodeId) {\n    // TODO: Use sorted links to speed this up\n    var node = getNode(fromNodeId),\n      i;\n    if (!node || !node.links) {\n      return null;\n    }\n\n    for (i = 0; i < node.links.length; ++i) {\n      var link = node.links[i];\n      if (link.fromId === fromNodeId && link.toId === toNodeId) {\n        return link;\n      }\n    }\n\n    return null; // no link.\n  }\n\n  function clear() {\n    enterModification();\n    forEachNode(function(node) {\n      removeNode(node.id);\n    });\n    exitModification();\n  }\n\n  function forEachLink(callback) {\n    var i, length;\n    if (typeof callback === 'function') {\n      for (i = 0, length = links.length; i < length; ++i) {\n        callback(links[i]);\n      }\n    }\n  }\n\n  function forEachLinkedNode(nodeId, callback, oriented) {\n    var node = getNode(nodeId);\n\n    if (node && node.links && typeof callback === 'function') {\n      if (oriented) {\n        return forEachOrientedLink(node.links, nodeId, callback);\n      } else {\n        return forEachNonOrientedLink(node.links, nodeId, callback);\n      }\n    }\n  }\n\n  function forEachNonOrientedLink(links, nodeId, callback) {\n    var quitFast;\n    for (var i = 0; i < links.length; ++i) {\n      var link = links[i];\n      var linkedNodeId = link.fromId === nodeId ? link.toId : link.fromId;\n\n      quitFast = callback(nodes[linkedNodeId], link);\n      if (quitFast) {\n        return true; // Client does not need more iterations. Break now.\n      }\n    }\n  }\n\n  function forEachOrientedLink(links, nodeId, callback) {\n    var quitFast;\n    for (var i = 0; i < links.length; ++i) {\n      var link = links[i];\n      if (link.fromId === nodeId) {\n        quitFast = callback(nodes[link.toId], link);\n        if (quitFast) {\n          return true; // Client does not need more iterations. Break now.\n        }\n      }\n    }\n  }\n\n  // we will not fire anything until users of this library explicitly call `on()`\n  // method.\n  function noop() {}\n\n  // Enter, Exit modification allows bulk graph updates without firing events.\n  function enterModificationReal() {\n    suspendEvents += 1;\n  }\n\n  function exitModificationReal() {\n    suspendEvents -= 1;\n    if (suspendEvents === 0 && changes.length > 0) {\n      graphPart.fire('changed', changes);\n      changes.length = 0;\n    }\n  }\n\n  function createNodeIterator() {\n    // Object.keys iterator is 1.3x faster than `for in` loop.\n    // See `https://github.com/anvaka/ngraph.graph/tree/bench-for-in-vs-obj-keys`\n    // branch for perf test\n    return Object.keys ? objectKeysIterator : forInIterator;\n  }\n\n  function objectKeysIterator(callback) {\n    if (typeof callback !== 'function') {\n      return;\n    }\n\n    var keys = Object.keys(nodes);\n    for (var i = 0; i < keys.length; ++i) {\n      if (callback(nodes[keys[i]])) {\n        return true; // client doesn't want to proceed. Return.\n      }\n    }\n  }\n\n  function forInIterator(callback) {\n    if (typeof callback !== 'function') {\n      return;\n    }\n    var node;\n\n    for (node in nodes) {\n      if (callback(nodes[node])) {\n        return true; // client doesn't want to proceed. Return.\n      }\n    }\n  }\n}\n\n// need this for old browsers. Should this be a separate module?\nfunction indexOfElementInArray(element, array) {\n  if (!array) return -1;\n\n  if (array.indexOf) {\n    return array.indexOf(element);\n  }\n\n  var len = array.length,\n    i;\n\n  for (i = 0; i < len; i += 1) {\n    if (array[i] === element) {\n      return i;\n    }\n  }\n\n  return -1;\n}\n\n/**\n * Internal structure to represent node;\n */\nfunction Node(id, data) {\n  this.id = id;\n  this.links = null;\n  this.data = data;\n}\n\nfunction addLinkToNode(node, link) {\n  if (node.links) {\n    node.links.push(link);\n  } else {\n    node.links = [link];\n  }\n}\n\n/**\n * Internal structure to represent links;\n */\nfunction Link(fromId, toId, data, id) {\n  this.fromId = fromId;\n  this.toId = toId;\n  this.data = data;\n  this.id = id;\n}\n\nfunction hashCode(str) {\n  var hash = 0, i, chr, len;\n  if (str.length == 0) return hash;\n  for (i = 0, len = str.length; i < len; i++) {\n    chr   = str.charCodeAt(i);\n    hash  = ((hash << 5) - hash) + chr;\n    hash |= 0; // Convert to 32bit integer\n  }\n  return hash;\n}\n\nfunction makeLinkId(fromId, toId) {\n  return fromId.toString() + '👉 ' + toId.toString();\n}\n\n\n//# sourceURL=webpack:///./node_modules/ngraph.graph/index.js?");

/***/ }),

/***/ "./node_modules/ngraph.merge/index.js":
/*!********************************************!*\
  !*** ./node_modules/ngraph.merge/index.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = merge;\n\n/**\n * Augments `target` with properties in `options`. Does not override\n * target's properties if they are defined and matches expected type in \n * options\n *\n * @returns {Object} merged object\n */\nfunction merge(target, options) {\n  var key;\n  if (!target) { target = {}; }\n  if (options) {\n    for (key in options) {\n      if (options.hasOwnProperty(key)) {\n        var targetHasIt = target.hasOwnProperty(key),\n            optionsValueType = typeof options[key],\n            shouldReplace = !targetHasIt || (typeof target[key] !== optionsValueType);\n\n        if (shouldReplace) {\n          target[key] = options[key];\n        } else if (optionsValueType === 'object') {\n          // go deep, don't care about loops here, we are simple API!:\n          target[key] = merge(target[key], options[key]);\n        }\n      }\n    }\n  }\n\n  return target;\n}\n\n\n//# sourceURL=webpack:///./node_modules/ngraph.merge/index.js?");

/***/ }),

/***/ "./node_modules/ngraph.physics.primitives/index.js":
/*!*********************************************************!*\
  !*** ./node_modules/ngraph.physics.primitives/index.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = {\n  Body: Body,\n  Vector2d: Vector2d,\n  Body3d: Body3d,\n  Vector3d: Vector3d\n};\n\nfunction Body(x, y) {\n  this.pos = new Vector2d(x, y);\n  this.prevPos = new Vector2d(x, y);\n  this.force = new Vector2d();\n  this.velocity = new Vector2d();\n  this.mass = 1;\n}\n\nBody.prototype.setPosition = function (x, y) {\n  this.prevPos.x = this.pos.x = x;\n  this.prevPos.y = this.pos.y = y;\n};\n\nfunction Vector2d(x, y) {\n  if (x && typeof x !== 'number') {\n    // could be another vector\n    this.x = typeof x.x === 'number' ? x.x : 0;\n    this.y = typeof x.y === 'number' ? x.y : 0;\n  } else {\n    this.x = typeof x === 'number' ? x : 0;\n    this.y = typeof y === 'number' ? y : 0;\n  }\n}\n\nVector2d.prototype.reset = function () {\n  this.x = this.y = 0;\n};\n\nfunction Body3d(x, y, z) {\n  this.pos = new Vector3d(x, y, z);\n  this.prevPos = new Vector3d(x, y, z);\n  this.force = new Vector3d();\n  this.velocity = new Vector3d();\n  this.mass = 1;\n}\n\nBody3d.prototype.setPosition = function (x, y, z) {\n  this.prevPos.x = this.pos.x = x;\n  this.prevPos.y = this.pos.y = y;\n  this.prevPos.z = this.pos.z = z;\n};\n\nfunction Vector3d(x, y, z) {\n  if (x && typeof x !== 'number') {\n    // could be another vector\n    this.x = typeof x.x === 'number' ? x.x : 0;\n    this.y = typeof x.y === 'number' ? x.y : 0;\n    this.z = typeof x.z === 'number' ? x.z : 0;\n  } else {\n    this.x = typeof x === 'number' ? x : 0;\n    this.y = typeof y === 'number' ? y : 0;\n    this.z = typeof z === 'number' ? z : 0;\n  }\n};\n\nVector3d.prototype.reset = function () {\n  this.x = this.y = this.z = 0;\n};\n\n\n//# sourceURL=webpack:///./node_modules/ngraph.physics.primitives/index.js?");

/***/ }),

/***/ "./node_modules/ngraph.physics.simulator/index.js":
/*!********************************************************!*\
  !*** ./node_modules/ngraph.physics.simulator/index.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("/**\n * Manages a simulation of physical forces acting on bodies and springs.\n */\nmodule.exports = physicsSimulator;\n\nfunction physicsSimulator(settings) {\n  var Spring = __webpack_require__(/*! ./lib/spring */ \"./node_modules/ngraph.physics.simulator/lib/spring.js\");\n  var expose = __webpack_require__(/*! ngraph.expose */ \"./node_modules/ngraph.expose/index.js\");\n  var merge = __webpack_require__(/*! ngraph.merge */ \"./node_modules/ngraph.merge/index.js\");\n  var eventify = __webpack_require__(/*! ngraph.events */ \"./node_modules/ngraph.events/index.js\");\n\n  settings = merge(settings, {\n      /**\n       * Ideal length for links (springs in physical model).\n       */\n      springLength: 30,\n\n      /**\n       * Hook's law coefficient. 1 - solid spring.\n       */\n      springCoeff: 0.0008,\n\n      /**\n       * Coulomb's law coefficient. It's used to repel nodes thus should be negative\n       * if you make it positive nodes start attract each other :).\n       */\n      gravity: -1.2,\n\n      /**\n       * Theta coefficient from Barnes Hut simulation. Ranged between (0, 1).\n       * The closer it's to 1 the more nodes algorithm will have to go through.\n       * Setting it to one makes Barnes Hut simulation no different from\n       * brute-force forces calculation (each node is considered).\n       */\n      theta: 0.8,\n\n      /**\n       * Drag force coefficient. Used to slow down system, thus should be less than 1.\n       * The closer it is to 0 the less tight system will be.\n       */\n      dragCoeff: 0.02,\n\n      /**\n       * Default time step (dt) for forces integration\n       */\n      timeStep : 20,\n  });\n\n  // We allow clients to override basic factory methods:\n  var createQuadTree = settings.createQuadTree || __webpack_require__(/*! ngraph.quadtreebh */ \"./node_modules/ngraph.quadtreebh/index.js\");\n  var createBounds = settings.createBounds || __webpack_require__(/*! ./lib/bounds */ \"./node_modules/ngraph.physics.simulator/lib/bounds.js\");\n  var createDragForce = settings.createDragForce || __webpack_require__(/*! ./lib/dragForce */ \"./node_modules/ngraph.physics.simulator/lib/dragForce.js\");\n  var createSpringForce = settings.createSpringForce || __webpack_require__(/*! ./lib/springForce */ \"./node_modules/ngraph.physics.simulator/lib/springForce.js\");\n  var integrate = settings.integrator || __webpack_require__(/*! ./lib/eulerIntegrator */ \"./node_modules/ngraph.physics.simulator/lib/eulerIntegrator.js\");\n  var createBody = settings.createBody || __webpack_require__(/*! ./lib/createBody */ \"./node_modules/ngraph.physics.simulator/lib/createBody.js\");\n\n  var bodies = [], // Bodies in this simulation.\n      springs = [], // Springs in this simulation.\n      quadTree =  createQuadTree(settings),\n      bounds = createBounds(bodies, settings),\n      springForce = createSpringForce(settings),\n      dragForce = createDragForce(settings);\n\n  var bboxNeedsUpdate = true;\n  var totalMovement = 0; // how much movement we made on last step\n\n  var publicApi = {\n    /**\n     * Array of bodies, registered with current simulator\n     *\n     * Note: To add new body, use addBody() method. This property is only\n     * exposed for testing/performance purposes.\n     */\n    bodies: bodies,\n\n    quadTree: quadTree,\n\n    /**\n     * Array of springs, registered with current simulator\n     *\n     * Note: To add new spring, use addSpring() method. This property is only\n     * exposed for testing/performance purposes.\n     */\n    springs: springs,\n\n    /**\n     * Returns settings with which current simulator was initialized\n     */\n    settings: settings,\n\n    /**\n     * Performs one step of force simulation.\n     *\n     * @returns {boolean} true if system is considered stable; False otherwise.\n     */\n    step: function () {\n      accumulateForces();\n\n      var movement = integrate(bodies, settings.timeStep);\n      bounds.update();\n\n      return movement;\n    },\n\n    /**\n     * Adds body to the system\n     *\n     * @param {ngraph.physics.primitives.Body} body physical body\n     *\n     * @returns {ngraph.physics.primitives.Body} added body\n     */\n    addBody: function (body) {\n      if (!body) {\n        throw new Error('Body is required');\n      }\n      bodies.push(body);\n\n      return body;\n    },\n\n    /**\n     * Adds body to the system at given position\n     *\n     * @param {Object} pos position of a body\n     *\n     * @returns {ngraph.physics.primitives.Body} added body\n     */\n    addBodyAt: function (pos) {\n      if (!pos) {\n        throw new Error('Body position is required');\n      }\n      var body = createBody(pos);\n      bodies.push(body);\n\n      return body;\n    },\n\n    /**\n     * Removes body from the system\n     *\n     * @param {ngraph.physics.primitives.Body} body to remove\n     *\n     * @returns {Boolean} true if body found and removed. falsy otherwise;\n     */\n    removeBody: function (body) {\n      if (!body) { return; }\n\n      var idx = bodies.indexOf(body);\n      if (idx < 0) { return; }\n\n      bodies.splice(idx, 1);\n      if (bodies.length === 0) {\n        bounds.reset();\n      }\n      return true;\n    },\n\n    /**\n     * Adds a spring to this simulation.\n     *\n     * @returns {Object} - a handle for a spring. If you want to later remove\n     * spring pass it to removeSpring() method.\n     */\n    addSpring: function (body1, body2, springLength, springWeight, springCoefficient) {\n      if (!body1 || !body2) {\n        throw new Error('Cannot add null spring to force simulator');\n      }\n\n      if (typeof springLength !== 'number') {\n        springLength = -1; // assume global configuration\n      }\n\n      var spring = new Spring(body1, body2, springLength, springCoefficient >= 0 ? springCoefficient : -1, springWeight);\n      springs.push(spring);\n\n      // TODO: could mark simulator as dirty.\n      return spring;\n    },\n\n    /**\n     * Returns amount of movement performed on last step() call\n     */\n    getTotalMovement: function () {\n      return totalMovement;\n    },\n\n    /**\n     * Removes spring from the system\n     *\n     * @param {Object} spring to remove. Spring is an object returned by addSpring\n     *\n     * @returns {Boolean} true if spring found and removed. falsy otherwise;\n     */\n    removeSpring: function (spring) {\n      if (!spring) { return; }\n      var idx = springs.indexOf(spring);\n      if (idx > -1) {\n        springs.splice(idx, 1);\n        return true;\n      }\n    },\n\n    getBestNewBodyPosition: function (neighbors) {\n      return bounds.getBestNewPosition(neighbors);\n    },\n\n    /**\n     * Returns bounding box which covers all bodies\n     */\n    getBBox: function () {\n      if (bboxNeedsUpdate) {\n        bounds.update();\n        bboxNeedsUpdate = false;\n      }\n      return bounds.box;\n    },\n\n    invalidateBBox: function () {\n      bboxNeedsUpdate = true;\n    },\n\n    gravity: function (value) {\n      if (value !== undefined) {\n        settings.gravity = value;\n        quadTree.options({gravity: value});\n        return this;\n      } else {\n        return settings.gravity;\n      }\n    },\n\n    theta: function (value) {\n      if (value !== undefined) {\n        settings.theta = value;\n        quadTree.options({theta: value});\n        return this;\n      } else {\n        return settings.theta;\n      }\n    }\n  };\n\n  // allow settings modification via public API:\n  expose(settings, publicApi);\n\n  eventify(publicApi);\n\n  return publicApi;\n\n  function accumulateForces() {\n    // Accumulate forces acting on bodies.\n    var body,\n        i = bodies.length;\n\n    if (i) {\n      // only add bodies if there the array is not empty:\n      quadTree.insertBodies(bodies); // performance: O(n * log n)\n      while (i--) {\n        body = bodies[i];\n        // If body is pinned there is no point updating its forces - it should\n        // never move:\n        if (!body.isPinned) {\n          body.force.reset();\n\n          quadTree.updateBodyForce(body);\n          dragForce.update(body);\n        }\n      }\n    }\n\n    i = springs.length;\n    while(i--) {\n      springForce.update(springs[i]);\n    }\n  }\n};\n\n\n//# sourceURL=webpack:///./node_modules/ngraph.physics.simulator/index.js?");

/***/ }),

/***/ "./node_modules/ngraph.physics.simulator/lib/bounds.js":
/*!*************************************************************!*\
  !*** ./node_modules/ngraph.physics.simulator/lib/bounds.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = function (bodies, settings) {\n  var random = __webpack_require__(/*! ngraph.random */ \"./node_modules/ngraph.random/index.js\").random(42);\n  var boundingBox =  { x1: 0, y1: 0, x2: 0, y2: 0 };\n\n  return {\n    box: boundingBox,\n\n    update: updateBoundingBox,\n\n    reset : function () {\n      boundingBox.x1 = boundingBox.y1 = 0;\n      boundingBox.x2 = boundingBox.y2 = 0;\n    },\n\n    getBestNewPosition: function (neighbors) {\n      var graphRect = boundingBox;\n\n      var baseX = 0, baseY = 0;\n\n      if (neighbors.length) {\n        for (var i = 0; i < neighbors.length; ++i) {\n          baseX += neighbors[i].pos.x;\n          baseY += neighbors[i].pos.y;\n        }\n\n        baseX /= neighbors.length;\n        baseY /= neighbors.length;\n      } else {\n        baseX = (graphRect.x1 + graphRect.x2) / 2;\n        baseY = (graphRect.y1 + graphRect.y2) / 2;\n      }\n\n      var springLength = settings.springLength;\n      return {\n        x: baseX + random.next(springLength) - springLength / 2,\n        y: baseY + random.next(springLength) - springLength / 2\n      };\n    }\n  };\n\n  function updateBoundingBox() {\n    var i = bodies.length;\n    if (i === 0) { return; } // don't have to wory here.\n\n    var x1 = Number.MAX_VALUE,\n        y1 = Number.MAX_VALUE,\n        x2 = Number.MIN_VALUE,\n        y2 = Number.MIN_VALUE;\n\n    while(i--) {\n      // this is O(n), could it be done faster with quadtree?\n      // how about pinned nodes?\n      var body = bodies[i];\n      if (body.isPinned) {\n        body.pos.x = body.prevPos.x;\n        body.pos.y = body.prevPos.y;\n      } else {\n        body.prevPos.x = body.pos.x;\n        body.prevPos.y = body.pos.y;\n      }\n      if (body.pos.x < x1) {\n        x1 = body.pos.x;\n      }\n      if (body.pos.x > x2) {\n        x2 = body.pos.x;\n      }\n      if (body.pos.y < y1) {\n        y1 = body.pos.y;\n      }\n      if (body.pos.y > y2) {\n        y2 = body.pos.y;\n      }\n    }\n\n    boundingBox.x1 = x1;\n    boundingBox.x2 = x2;\n    boundingBox.y1 = y1;\n    boundingBox.y2 = y2;\n  }\n}\n\n\n//# sourceURL=webpack:///./node_modules/ngraph.physics.simulator/lib/bounds.js?");

/***/ }),

/***/ "./node_modules/ngraph.physics.simulator/lib/createBody.js":
/*!*****************************************************************!*\
  !*** ./node_modules/ngraph.physics.simulator/lib/createBody.js ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var physics = __webpack_require__(/*! ngraph.physics.primitives */ \"./node_modules/ngraph.physics.primitives/index.js\");\n\nmodule.exports = function(pos) {\n  return new physics.Body(pos);\n}\n\n\n//# sourceURL=webpack:///./node_modules/ngraph.physics.simulator/lib/createBody.js?");

/***/ }),

/***/ "./node_modules/ngraph.physics.simulator/lib/dragForce.js":
/*!****************************************************************!*\
  !*** ./node_modules/ngraph.physics.simulator/lib/dragForce.js ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("/**\n * Represents drag force, which reduces force value on each step by given\n * coefficient.\n *\n * @param {Object} options for the drag force\n * @param {Number=} options.dragCoeff drag force coefficient. 0.1 by default\n */\nmodule.exports = function (options) {\n  var merge = __webpack_require__(/*! ngraph.merge */ \"./node_modules/ngraph.merge/index.js\"),\n      expose = __webpack_require__(/*! ngraph.expose */ \"./node_modules/ngraph.expose/index.js\");\n\n  options = merge(options, {\n    dragCoeff: 0.02\n  });\n\n  var api = {\n    update : function (body) {\n      body.force.x -= options.dragCoeff * body.velocity.x;\n      body.force.y -= options.dragCoeff * body.velocity.y;\n    }\n  };\n\n  // let easy access to dragCoeff:\n  expose(options, api, ['dragCoeff']);\n\n  return api;\n};\n\n\n//# sourceURL=webpack:///./node_modules/ngraph.physics.simulator/lib/dragForce.js?");

/***/ }),

/***/ "./node_modules/ngraph.physics.simulator/lib/eulerIntegrator.js":
/*!**********************************************************************!*\
  !*** ./node_modules/ngraph.physics.simulator/lib/eulerIntegrator.js ***!
  \**********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("/**\n * Performs forces integration, using given timestep. Uses Euler method to solve\n * differential equation (http://en.wikipedia.org/wiki/Euler_method ).\n *\n * @returns {Number} squared distance of total position updates.\n */\n\nmodule.exports = integrate;\n\nfunction integrate(bodies, timeStep) {\n  var dx = 0, tx = 0,\n      dy = 0, ty = 0,\n      i,\n      max = bodies.length;\n\n  if (max === 0) {\n    return 0;\n  }\n\n  for (i = 0; i < max; ++i) {\n    var body = bodies[i],\n        coeff = timeStep / body.mass;\n\n    body.velocity.x += coeff * body.force.x;\n    body.velocity.y += coeff * body.force.y;\n    var vx = body.velocity.x,\n        vy = body.velocity.y,\n        v = Math.sqrt(vx * vx + vy * vy);\n\n    if (v > 1) {\n      body.velocity.x = vx / v;\n      body.velocity.y = vy / v;\n    }\n\n    dx = timeStep * body.velocity.x;\n    dy = timeStep * body.velocity.y;\n\n    body.pos.x += dx;\n    body.pos.y += dy;\n\n    tx += Math.abs(dx); ty += Math.abs(dy);\n  }\n\n  return (tx * tx + ty * ty)/max;\n}\n\n\n//# sourceURL=webpack:///./node_modules/ngraph.physics.simulator/lib/eulerIntegrator.js?");

/***/ }),

/***/ "./node_modules/ngraph.physics.simulator/lib/spring.js":
/*!*************************************************************!*\
  !*** ./node_modules/ngraph.physics.simulator/lib/spring.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = Spring;\n\n/**\n * Represents a physical spring. Spring connects two bodies, has rest length\n * stiffness coefficient and optional weight\n */\nfunction Spring(fromBody, toBody, length, coeff, weight) {\n    this.from = fromBody;\n    this.to = toBody;\n    this.length = length;\n    this.coeff = coeff;\n\n    this.weight = typeof weight === 'number' ? weight : 1;\n};\n\n\n//# sourceURL=webpack:///./node_modules/ngraph.physics.simulator/lib/spring.js?");

/***/ }),

/***/ "./node_modules/ngraph.physics.simulator/lib/springForce.js":
/*!******************************************************************!*\
  !*** ./node_modules/ngraph.physics.simulator/lib/springForce.js ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("/**\n * Represents spring force, which updates forces acting on two bodies, conntected\n * by a spring.\n *\n * @param {Object} options for the spring force\n * @param {Number=} options.springCoeff spring force coefficient.\n * @param {Number=} options.springLength desired length of a spring at rest.\n */\nmodule.exports = function (options) {\n  var merge = __webpack_require__(/*! ngraph.merge */ \"./node_modules/ngraph.merge/index.js\");\n  var random = __webpack_require__(/*! ngraph.random */ \"./node_modules/ngraph.random/index.js\").random(42);\n  var expose = __webpack_require__(/*! ngraph.expose */ \"./node_modules/ngraph.expose/index.js\");\n\n  options = merge(options, {\n    springCoeff: 0.0002,\n    springLength: 80\n  });\n\n  var api = {\n    /**\n     * Upsates forces acting on a spring\n     */\n    update : function (spring) {\n      var body1 = spring.from,\n          body2 = spring.to,\n          length = spring.length < 0 ? options.springLength : spring.length,\n          dx = body2.pos.x - body1.pos.x,\n          dy = body2.pos.y - body1.pos.y,\n          r = Math.sqrt(dx * dx + dy * dy);\n\n      if (r === 0) {\n          dx = (random.nextDouble() - 0.5) / 50;\n          dy = (random.nextDouble() - 0.5) / 50;\n          r = Math.sqrt(dx * dx + dy * dy);\n      }\n\n      var d = r - length;\n      var coeff = ((!spring.coeff || spring.coeff < 0) ? options.springCoeff : spring.coeff) * d / r * spring.weight;\n\n      body1.force.x += coeff * dx;\n      body1.force.y += coeff * dy;\n\n      body2.force.x -= coeff * dx;\n      body2.force.y -= coeff * dy;\n    }\n  };\n\n  expose(options, api, ['springCoeff', 'springLength']);\n  return api;\n}\n\n\n//# sourceURL=webpack:///./node_modules/ngraph.physics.simulator/lib/springForce.js?");

/***/ }),

/***/ "./node_modules/ngraph.quadtreebh/index.js":
/*!*************************************************!*\
  !*** ./node_modules/ngraph.quadtreebh/index.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("/**\n * This is Barnes Hut simulation algorithm for 2d case. Implementation\n * is highly optimized (avoids recusion and gc pressure)\n *\n * http://www.cs.princeton.edu/courses/archive/fall03/cs126/assignments/barnes-hut.html\n */\n\nmodule.exports = function(options) {\n  options = options || {};\n  options.gravity = typeof options.gravity === 'number' ? options.gravity : -1;\n  options.theta = typeof options.theta === 'number' ? options.theta : 0.8;\n\n  // we require deterministic randomness here\n  var random = __webpack_require__(/*! ngraph.random */ \"./node_modules/ngraph.random/index.js\").random(1984),\n    Node = __webpack_require__(/*! ./node */ \"./node_modules/ngraph.quadtreebh/node.js\"),\n    InsertStack = __webpack_require__(/*! ./insertStack */ \"./node_modules/ngraph.quadtreebh/insertStack.js\"),\n    isSamePosition = __webpack_require__(/*! ./isSamePosition */ \"./node_modules/ngraph.quadtreebh/isSamePosition.js\");\n\n  var gravity = options.gravity,\n    updateQueue = [],\n    insertStack = new InsertStack(),\n    theta = options.theta,\n\n    nodesCache = [],\n    currentInCache = 0,\n    root = newNode();\n\n  return {\n    insertBodies: insertBodies,\n    /**\n     * Gets root node if its present\n     */\n    getRoot: function() {\n      return root;\n    },\n    updateBodyForce: update,\n    options: function(newOptions) {\n      if (newOptions) {\n        if (typeof newOptions.gravity === 'number') {\n          gravity = newOptions.gravity;\n        }\n        if (typeof newOptions.theta === 'number') {\n          theta = newOptions.theta;\n        }\n\n        return this;\n      }\n\n      return {\n        gravity: gravity,\n        theta: theta\n      };\n    }\n  };\n\n  function newNode() {\n    // To avoid pressure on GC we reuse nodes.\n    var node = nodesCache[currentInCache];\n    if (node) {\n      node.quad0 = null;\n      node.quad1 = null;\n      node.quad2 = null;\n      node.quad3 = null;\n      node.body = null;\n      node.mass = node.massX = node.massY = 0;\n      node.left = node.right = node.top = node.bottom = 0;\n    } else {\n      node = new Node();\n      nodesCache[currentInCache] = node;\n    }\n\n    ++currentInCache;\n    return node;\n  }\n\n  function update(sourceBody) {\n    var queue = updateQueue,\n      v,\n      dx,\n      dy,\n      r, fx = 0,\n      fy = 0,\n      queueLength = 1,\n      shiftIdx = 0,\n      pushIdx = 1;\n\n    queue[0] = root;\n\n    while (queueLength) {\n      var node = queue[shiftIdx],\n        body = node.body;\n\n      queueLength -= 1;\n      shiftIdx += 1;\n      var differentBody = (body !== sourceBody);\n      if (body && differentBody) {\n        // If the current node is a leaf node (and it is not source body),\n        // calculate the force exerted by the current node on body, and add this\n        // amount to body's net force.\n        dx = body.pos.x - sourceBody.pos.x;\n        dy = body.pos.y - sourceBody.pos.y;\n        r = Math.sqrt(dx * dx + dy * dy);\n\n        if (r === 0) {\n          // Poor man's protection against zero distance.\n          dx = (random.nextDouble() - 0.5) / 50;\n          dy = (random.nextDouble() - 0.5) / 50;\n          r = Math.sqrt(dx * dx + dy * dy);\n        }\n\n        // This is standard gravition force calculation but we divide\n        // by r^3 to save two operations when normalizing force vector.\n        v = gravity * body.mass * sourceBody.mass / (r * r * r);\n        fx += v * dx;\n        fy += v * dy;\n      } else if (differentBody) {\n        // Otherwise, calculate the ratio s / r,  where s is the width of the region\n        // represented by the internal node, and r is the distance between the body\n        // and the node's center-of-mass\n        dx = node.massX / node.mass - sourceBody.pos.x;\n        dy = node.massY / node.mass - sourceBody.pos.y;\n        r = Math.sqrt(dx * dx + dy * dy);\n\n        if (r === 0) {\n          // Sorry about code duplucation. I don't want to create many functions\n          // right away. Just want to see performance first.\n          dx = (random.nextDouble() - 0.5) / 50;\n          dy = (random.nextDouble() - 0.5) / 50;\n          r = Math.sqrt(dx * dx + dy * dy);\n        }\n        // If s / r < θ, treat this internal node as a single body, and calculate the\n        // force it exerts on sourceBody, and add this amount to sourceBody's net force.\n        if ((node.right - node.left) / r < theta) {\n          // in the if statement above we consider node's width only\n          // because the region was squarified during tree creation.\n          // Thus there is no difference between using width or height.\n          v = gravity * node.mass * sourceBody.mass / (r * r * r);\n          fx += v * dx;\n          fy += v * dy;\n        } else {\n          // Otherwise, run the procedure recursively on each of the current node's children.\n\n          // I intentionally unfolded this loop, to save several CPU cycles.\n          if (node.quad0) {\n            queue[pushIdx] = node.quad0;\n            queueLength += 1;\n            pushIdx += 1;\n          }\n          if (node.quad1) {\n            queue[pushIdx] = node.quad1;\n            queueLength += 1;\n            pushIdx += 1;\n          }\n          if (node.quad2) {\n            queue[pushIdx] = node.quad2;\n            queueLength += 1;\n            pushIdx += 1;\n          }\n          if (node.quad3) {\n            queue[pushIdx] = node.quad3;\n            queueLength += 1;\n            pushIdx += 1;\n          }\n        }\n      }\n    }\n\n    sourceBody.force.x += fx;\n    sourceBody.force.y += fy;\n  }\n\n  function insertBodies(bodies) {\n    var x1 = Number.MAX_VALUE,\n      y1 = Number.MAX_VALUE,\n      x2 = Number.MIN_VALUE,\n      y2 = Number.MIN_VALUE,\n      i,\n      max = bodies.length;\n\n    // To reduce quad tree depth we are looking for exact bounding box of all particles.\n    i = max;\n    while (i--) {\n      var x = bodies[i].pos.x;\n      var y = bodies[i].pos.y;\n      if (x < x1) {\n        x1 = x;\n      }\n      if (x > x2) {\n        x2 = x;\n      }\n      if (y < y1) {\n        y1 = y;\n      }\n      if (y > y2) {\n        y2 = y;\n      }\n    }\n\n    // Squarify the bounds.\n    var dx = x2 - x1,\n      dy = y2 - y1;\n    if (dx > dy) {\n      y2 = y1 + dx;\n    } else {\n      x2 = x1 + dy;\n    }\n\n    currentInCache = 0;\n    root = newNode();\n    root.left = x1;\n    root.right = x2;\n    root.top = y1;\n    root.bottom = y2;\n\n    i = max - 1;\n    if (i >= 0) {\n      root.body = bodies[i];\n    }\n    while (i--) {\n      insert(bodies[i], root);\n    }\n  }\n\n  function insert(newBody) {\n    insertStack.reset();\n    insertStack.push(root, newBody);\n\n    while (!insertStack.isEmpty()) {\n      var stackItem = insertStack.pop(),\n        node = stackItem.node,\n        body = stackItem.body;\n\n      if (!node.body) {\n        // This is internal node. Update the total mass of the node and center-of-mass.\n        var x = body.pos.x;\n        var y = body.pos.y;\n        node.mass = node.mass + body.mass;\n        node.massX = node.massX + body.mass * x;\n        node.massY = node.massY + body.mass * y;\n\n        // Recursively insert the body in the appropriate quadrant.\n        // But first find the appropriate quadrant.\n        var quadIdx = 0, // Assume we are in the 0's quad.\n          left = node.left,\n          right = (node.right + left) / 2,\n          top = node.top,\n          bottom = (node.bottom + top) / 2;\n\n        if (x > right) { // somewhere in the eastern part.\n          quadIdx = quadIdx + 1;\n          left = right;\n          right = node.right;\n        }\n        if (y > bottom) { // and in south.\n          quadIdx = quadIdx + 2;\n          top = bottom;\n          bottom = node.bottom;\n        }\n\n        var child = getChild(node, quadIdx);\n        if (!child) {\n          // The node is internal but this quadrant is not taken. Add\n          // subnode to it.\n          child = newNode();\n          child.left = left;\n          child.top = top;\n          child.right = right;\n          child.bottom = bottom;\n          child.body = body;\n\n          setChild(node, quadIdx, child);\n        } else {\n          // continue searching in this quadrant.\n          insertStack.push(child, body);\n        }\n      } else {\n        // We are trying to add to the leaf node.\n        // We have to convert current leaf into internal node\n        // and continue adding two nodes.\n        var oldBody = node.body;\n        node.body = null; // internal nodes do not cary bodies\n\n        if (isSamePosition(oldBody.pos, body.pos)) {\n          // Prevent infinite subdivision by bumping one node\n          // anywhere in this quadrant\n          var retriesCount = 3;\n          do {\n            var offset = random.nextDouble();\n            var dx = (node.right - node.left) * offset;\n            var dy = (node.bottom - node.top) * offset;\n\n            oldBody.pos.x = node.left + dx;\n            oldBody.pos.y = node.top + dy;\n            retriesCount -= 1;\n            // Make sure we don't bump it out of the box. If we do, next iteration should fix it\n          } while (retriesCount > 0 && isSamePosition(oldBody.pos, body.pos));\n\n          if (retriesCount === 0 && isSamePosition(oldBody.pos, body.pos)) {\n            // This is very bad, we ran out of precision.\n            // if we do not return from the method we'll get into\n            // infinite loop here. So we sacrifice correctness of layout, and keep the app running\n            // Next layout iteration should get larger bounding box in the first step and fix this\n            return;\n          }\n        }\n        // Next iteration should subdivide node further.\n        insertStack.push(node, oldBody);\n        insertStack.push(node, body);\n      }\n    }\n  }\n};\n\nfunction getChild(node, idx) {\n  if (idx === 0) return node.quad0;\n  if (idx === 1) return node.quad1;\n  if (idx === 2) return node.quad2;\n  if (idx === 3) return node.quad3;\n  return null;\n}\n\nfunction setChild(node, idx, child) {\n  if (idx === 0) node.quad0 = child;\n  else if (idx === 1) node.quad1 = child;\n  else if (idx === 2) node.quad2 = child;\n  else if (idx === 3) node.quad3 = child;\n}\n\n\n//# sourceURL=webpack:///./node_modules/ngraph.quadtreebh/index.js?");

/***/ }),

/***/ "./node_modules/ngraph.quadtreebh/insertStack.js":
/*!*******************************************************!*\
  !*** ./node_modules/ngraph.quadtreebh/insertStack.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = InsertStack;\n\n/**\n * Our implmentation of QuadTree is non-recursive to avoid GC hit\n * This data structure represent stack of elements\n * which we are trying to insert into quad tree.\n */\nfunction InsertStack () {\n    this.stack = [];\n    this.popIdx = 0;\n}\n\nInsertStack.prototype = {\n    isEmpty: function() {\n        return this.popIdx === 0;\n    },\n    push: function (node, body) {\n        var item = this.stack[this.popIdx];\n        if (!item) {\n            // we are trying to avoid memory pressue: create new element\n            // only when absolutely necessary\n            this.stack[this.popIdx] = new InsertStackElement(node, body);\n        } else {\n            item.node = node;\n            item.body = body;\n        }\n        ++this.popIdx;\n    },\n    pop: function () {\n        if (this.popIdx > 0) {\n            return this.stack[--this.popIdx];\n        }\n    },\n    reset: function () {\n        this.popIdx = 0;\n    }\n};\n\nfunction InsertStackElement(node, body) {\n    this.node = node; // QuadTree node\n    this.body = body; // physical body which needs to be inserted to node\n}\n\n\n//# sourceURL=webpack:///./node_modules/ngraph.quadtreebh/insertStack.js?");

/***/ }),

/***/ "./node_modules/ngraph.quadtreebh/isSamePosition.js":
/*!**********************************************************!*\
  !*** ./node_modules/ngraph.quadtreebh/isSamePosition.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = function isSamePosition(point1, point2) {\n    var dx = Math.abs(point1.x - point2.x);\n    var dy = Math.abs(point1.y - point2.y);\n\n    return (dx < 1e-8 && dy < 1e-8);\n};\n\n\n//# sourceURL=webpack:///./node_modules/ngraph.quadtreebh/isSamePosition.js?");

/***/ }),

/***/ "./node_modules/ngraph.quadtreebh/node.js":
/*!************************************************!*\
  !*** ./node_modules/ngraph.quadtreebh/node.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("/**\n * Internal data structure to represent 2D QuadTree node\n */\nmodule.exports = function Node() {\n  // body stored inside this node. In quad tree only leaf nodes (by construction)\n  // contain boides:\n  this.body = null;\n\n  // Child nodes are stored in quads. Each quad is presented by number:\n  // 0 | 1\n  // -----\n  // 2 | 3\n  this.quad0 = null;\n  this.quad1 = null;\n  this.quad2 = null;\n  this.quad3 = null;\n\n  // Total mass of current node\n  this.mass = 0;\n\n  // Center of mass coordinates\n  this.massX = 0;\n  this.massY = 0;\n\n  // bounding box coordinates\n  this.left = 0;\n  this.top = 0;\n  this.bottom = 0;\n  this.right = 0;\n};\n\n\n//# sourceURL=webpack:///./node_modules/ngraph.quadtreebh/node.js?");

/***/ }),

/***/ "./node_modules/ngraph.random/index.js":
/*!*********************************************!*\
  !*** ./node_modules/ngraph.random/index.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = {\n  random: random,\n  randomIterator: randomIterator\n};\n\n/**\n * Creates seeded PRNG with two methods:\n *   next() and nextDouble()\n */\nfunction random(inputSeed) {\n  var seed = typeof inputSeed === 'number' ? inputSeed : (+ new Date());\n  var randomFunc = function() {\n      // Robert Jenkins' 32 bit integer hash function.\n      seed = ((seed + 0x7ed55d16) + (seed << 12))  & 0xffffffff;\n      seed = ((seed ^ 0xc761c23c) ^ (seed >>> 19)) & 0xffffffff;\n      seed = ((seed + 0x165667b1) + (seed << 5))   & 0xffffffff;\n      seed = ((seed + 0xd3a2646c) ^ (seed << 9))   & 0xffffffff;\n      seed = ((seed + 0xfd7046c5) + (seed << 3))   & 0xffffffff;\n      seed = ((seed ^ 0xb55a4f09) ^ (seed >>> 16)) & 0xffffffff;\n      return (seed & 0xfffffff) / 0x10000000;\n  };\n\n  return {\n      /**\n       * Generates random integer number in the range from 0 (inclusive) to maxValue (exclusive)\n       *\n       * @param maxValue Number REQUIRED. Ommitting this number will result in NaN values from PRNG.\n       */\n      next : function (maxValue) {\n          return Math.floor(randomFunc() * maxValue);\n      },\n\n      /**\n       * Generates random double number in the range from 0 (inclusive) to 1 (exclusive)\n       * This function is the same as Math.random() (except that it could be seeded)\n       */\n      nextDouble : function () {\n          return randomFunc();\n      }\n  };\n}\n\n/*\n * Creates iterator over array, which returns items of array in random order\n * Time complexity is guaranteed to be O(n);\n */\nfunction randomIterator(array, customRandom) {\n    var localRandom = customRandom || random();\n    if (typeof localRandom.next !== 'function') {\n      throw new Error('customRandom does not match expected API: next() function is missing');\n    }\n\n    return {\n        forEach : function (callback) {\n            var i, j, t;\n            for (i = array.length - 1; i > 0; --i) {\n                j = localRandom.next(i + 1); // i inclusive\n                t = array[j];\n                array[j] = array[i];\n                array[i] = t;\n\n                callback(t);\n            }\n\n            if (array.length) {\n                callback(array[0]);\n            }\n        },\n\n        /**\n         * Shuffles array randomly, in place.\n         */\n        shuffle : function () {\n            var i, j, t;\n            for (i = array.length - 1; i > 0; --i) {\n                j = localRandom.next(i + 1); // i inclusive\n                t = array[j];\n                array[j] = array[i];\n                array[i] = t;\n            }\n\n            return array;\n        }\n    };\n}\n\n\n//# sourceURL=webpack:///./node_modules/ngraph.random/index.js?");

/***/ }),

/***/ "./node_modules/ngraph.tojson/index.js":
/*!*********************************************!*\
  !*** ./node_modules/ngraph.tojson/index.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = save;\n\nfunction save(graph, customNodeTransform, customLinkTransform) {\n  // Object contains `nodes` and `links` arrays.\n  var result = {\n    nodes: [],\n    links: []\n  };\n\n  var nodeTransform = customNodeTransform || defaultTransformForNode;\n  var linkTransform = customLinkTransform || defaultTransformForLink;\n\n  graph.forEachNode(saveNode);\n  graph.forEachLink(saveLink);\n\n  return JSON.stringify(result);\n\n  function saveNode(node) {\n    // Each node of the graph is processed to take only required fields\n    // `id` and `data`\n    result.nodes.push(nodeTransform(node));\n  }\n\n  function saveLink(link) {\n    // Each link of the graph is also processed to take `fromId`, `toId` and\n    // `data`\n    result.links.push(linkTransform(link));\n  }\n\n  function defaultTransformForNode(node) {\n    var result = {\n      id: node.id\n    };\n    // We don't want to store undefined fields when it's not necessary:\n    if (node.data !== undefined) {\n      result.data = node.data;\n    }\n\n    return result;\n  }\n\n  function defaultTransformForLink(link) {\n    var result = {\n      fromId: link.fromId,\n      toId: link.toId,\n    };\n\n    if (link.data !== undefined) {\n      result.data = link.data;\n    }\n\n    return result;\n  }\n}\n\n\n//# sourceURL=webpack:///./node_modules/ngraph.tojson/index.js?");

/***/ }),

/***/ "./node_modules/simplesvg/index.js":
/*!*****************************************!*\
  !*** ./node_modules/simplesvg/index.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = svg;\n\nsvg.compile = __webpack_require__(/*! ./lib/compile */ \"./node_modules/simplesvg/lib/compile.js\");\n\nvar compileTemplate = svg.compileTemplate = __webpack_require__(/*! ./lib/compile_template */ \"./node_modules/simplesvg/lib/compile_template.js\");\n\nvar domEvents = __webpack_require__(/*! add-event-listener */ \"./node_modules/add-event-listener/index.js\");\n\nvar svgns = \"http://www.w3.org/2000/svg\";\nvar xlinkns = \"http://www.w3.org/1999/xlink\";\n\nfunction svg(element, attrBag) {\n  var svgElement = augment(element);\n  if (attrBag === undefined) {\n    return svgElement;\n  }\n\n  var attributes = Object.keys(attrBag);\n  for (var i = 0; i < attributes.length; ++i) {\n    var attributeName = attributes[i];\n    var value = attrBag[attributeName];\n    if (attributeName === 'link') {\n      svgElement.link(value);\n    } else {\n      svgElement.attr(attributeName, value);\n    }\n  }\n\n  return svgElement;\n}\n\nfunction augment(element) {\n  var svgElement = element;\n\n  if (typeof element === \"string\") {\n    svgElement = window.document.createElementNS(svgns, element);\n  } else if (element.simplesvg) {\n    return element;\n  }\n\n  var compiledTempalte;\n\n  svgElement.simplesvg = true; // this is not good, since we are monkey patching svg\n  svgElement.attr = attr;\n  svgElement.append = append;\n  svgElement.link = link;\n  svgElement.text = text;\n\n  // add easy eventing\n  svgElement.on = on;\n  svgElement.off = off;\n\n  // data binding:\n  svgElement.dataSource = dataSource;\n\n  return svgElement;\n\n  function dataSource(model) {\n    if (!compiledTempalte) compiledTempalte = compileTemplate(svgElement);\n    compiledTempalte.link(model);\n    return svgElement;\n  }\n\n  function on(name, cb, useCapture) {\n    domEvents.addEventListener(svgElement, name, cb, useCapture);\n    return svgElement;\n  }\n\n  function off(name, cb, useCapture) {\n    domEvents.removeEventListener(svgElement, name, cb, useCapture);\n    return svgElement;\n  }\n\n  function append(content) {\n    var child = svg(content);\n    svgElement.appendChild(child);\n\n    return child;\n  }\n\n  function attr(name, value) {\n    if (arguments.length === 2) {\n      if (value !== null) {\n        svgElement.setAttributeNS(null, name, value);\n      } else {\n        svgElement.removeAttributeNS(null, name);\n      }\n\n      return svgElement;\n    }\n\n    return svgElement.getAttributeNS(null, name);\n  }\n\n  function link(target) {\n    if (arguments.length) {\n      svgElement.setAttributeNS(xlinkns, \"xlink:href\", target);\n      return svgElement;\n    }\n\n    return svgElement.getAttributeNS(xlinkns, \"xlink:href\");\n  }\n\n  function text(textContent) {\n    if (textContent !== undefined) {\n        svgElement.textContent = textContent;\n        return svgElement;\n    }\n    return svgElement.textContent;\n  }\n}\n\n\n//# sourceURL=webpack:///./node_modules/simplesvg/index.js?");

/***/ }),

/***/ "./node_modules/simplesvg/lib/compile.js":
/*!***********************************************!*\
  !*** ./node_modules/simplesvg/lib/compile.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var parser = __webpack_require__(/*! ./domparser.js */ \"./node_modules/simplesvg/lib/domparser.js\");\nvar svg = __webpack_require__(/*! ../ */ \"./node_modules/simplesvg/index.js\");\n\nmodule.exports = compile;\n\nfunction compile(svgText) {\n  try {\n    svgText = addNamespaces(svgText);\n    return svg(parser.parseFromString(svgText, \"text/xml\").documentElement);\n  } catch (e) {\n    throw e;\n  }\n}\n\nfunction addNamespaces(text) {\n  if (!text) return;\n\n  var namespaces = 'xmlns:svg=\"http://www.w3.org/2000/svg\" xmlns=\"http://www.w3.org/2000/svg\"';\n  var match = text.match(/^<\\w+/);\n  if (match) {\n    var tagLength = match[0].length;\n    return text.substr(0, tagLength) + ' ' + namespaces + ' ' + text.substr(tagLength);\n  } else {\n    throw new Error('Cannot parse input text: invalid xml?');\n  }\n}\n\n\n//# sourceURL=webpack:///./node_modules/simplesvg/lib/compile.js?");

/***/ }),

/***/ "./node_modules/simplesvg/lib/compile_template.js":
/*!********************************************************!*\
  !*** ./node_modules/simplesvg/lib/compile_template.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = template;\n\nvar BINDING_EXPR = /{{(.+?)}}/;\n\nfunction template(domNode) {\n  var allBindings = Object.create(null);\n  extractAllBindings(domNode, allBindings);\n\n  return {\n    link: function(model) {\n      Object.keys(allBindings).forEach(function(key) {\n        var setter = allBindings[key];\n        setter.forEach(changeModel);\n      });\n\n      function changeModel(setter) {\n        setter(model);\n      }\n    }\n  };\n}\n\nfunction extractAllBindings(domNode, allBindings) {\n  var nodeType = domNode.nodeType;\n  var typeSupported = (nodeType === 1) || (nodeType === 3);\n  if (!typeSupported) return;\n  var i;\n  if (domNode.hasChildNodes()) {\n    var domChildren = domNode.childNodes;\n    for (i = 0; i < domChildren.length; ++i) {\n      extractAllBindings(domChildren[i], allBindings);\n    }\n  }\n\n  if (nodeType === 3) { // text:\n    bindTextContent(domNode, allBindings);\n  }\n\n  if (!domNode.attributes) return; // this might be a text. Need to figure out what to do in that case\n\n  var attrs = domNode.attributes;\n  for (i = 0; i < attrs.length; ++i) {\n    bindDomAttribute(attrs[i], domNode, allBindings);\n  }\n}\n\nfunction bindDomAttribute(domAttribute, element, allBindings) {\n  var value = domAttribute.value;\n  if (!value) return; // unary attribute?\n\n  var modelNameMatch = value.match(BINDING_EXPR);\n  if (!modelNameMatch) return; // does not look like a binding\n\n  var attrName = domAttribute.localName;\n  var modelPropertyName = modelNameMatch[1];\n  var isSimpleValue = modelPropertyName.indexOf('.') < 0;\n\n  if (!isSimpleValue) throw new Error('simplesvg currently does not support nested bindings');\n\n  var propertyBindings = allBindings[modelPropertyName];\n  if (!propertyBindings) {\n    propertyBindings = allBindings[modelPropertyName] = [attributeSetter];\n  } else {\n    propertyBindings.push(attributeSetter);\n  }\n\n  function attributeSetter(model) {\n    element.setAttributeNS(null, attrName, model[modelPropertyName]);\n  }\n}\nfunction bindTextContent(element, allBindings) {\n  // todo reduce duplication\n  var value = element.nodeValue;\n  if (!value) return; // unary attribute?\n\n  var modelNameMatch = value.match(BINDING_EXPR);\n  if (!modelNameMatch) return; // does not look like a binding\n\n  var modelPropertyName = modelNameMatch[1];\n  var isSimpleValue = modelPropertyName.indexOf('.') < 0;\n\n  var propertyBindings = allBindings[modelPropertyName];\n  if (!propertyBindings) {\n    propertyBindings = allBindings[modelPropertyName] = [textSetter];\n  } else {\n    propertyBindings.push(textSetter);\n  }\n\n  function textSetter(model) {\n    element.nodeValue = model[modelPropertyName];\n  }\n}\n\n\n//# sourceURL=webpack:///./node_modules/simplesvg/lib/compile_template.js?");

/***/ }),

/***/ "./node_modules/simplesvg/lib/domparser.js":
/*!*************************************************!*\
  !*** ./node_modules/simplesvg/lib/domparser.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = createDomparser();\n\nfunction createDomparser() {\n  if (typeof DOMParser === 'undefined') {\n    return {\n      parseFromString: fail\n    };\n  }\n  return new DOMParser();\n}\n\nfunction fail() {\n  throw new Error('DOMParser is not supported by this platform. Please open issue here https://github.com/anvaka/simplesvg');\n}\n\n\n//# sourceURL=webpack:///./node_modules/simplesvg/lib/domparser.js?");

/***/ }),

/***/ "./node_modules/style-loader/lib/addStyles.js":
/*!****************************************************!*\
  !*** ./node_modules/style-loader/lib/addStyles.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("/*\n\tMIT License http://www.opensource.org/licenses/mit-license.php\n\tAuthor Tobias Koppers @sokra\n*/\n\nvar stylesInDom = {};\n\nvar\tmemoize = function (fn) {\n\tvar memo;\n\n\treturn function () {\n\t\tif (typeof memo === \"undefined\") memo = fn.apply(this, arguments);\n\t\treturn memo;\n\t};\n};\n\nvar isOldIE = memoize(function () {\n\t// Test for IE <= 9 as proposed by Browserhacks\n\t// @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805\n\t// Tests for existence of standard globals is to allow style-loader\n\t// to operate correctly into non-standard environments\n\t// @see https://github.com/webpack-contrib/style-loader/issues/177\n\treturn window && document && document.all && !window.atob;\n});\n\nvar getTarget = function (target, parent) {\n  if (parent){\n    return parent.querySelector(target);\n  }\n  return document.querySelector(target);\n};\n\nvar getElement = (function (fn) {\n\tvar memo = {};\n\n\treturn function(target, parent) {\n                // If passing function in options, then use it for resolve \"head\" element.\n                // Useful for Shadow Root style i.e\n                // {\n                //   insertInto: function () { return document.querySelector(\"#foo\").shadowRoot }\n                // }\n                if (typeof target === 'function') {\n                        return target();\n                }\n                if (typeof memo[target] === \"undefined\") {\n\t\t\tvar styleTarget = getTarget.call(this, target, parent);\n\t\t\t// Special case to return head of iframe instead of iframe itself\n\t\t\tif (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {\n\t\t\t\ttry {\n\t\t\t\t\t// This will throw an exception if access to iframe is blocked\n\t\t\t\t\t// due to cross-origin restrictions\n\t\t\t\t\tstyleTarget = styleTarget.contentDocument.head;\n\t\t\t\t} catch(e) {\n\t\t\t\t\tstyleTarget = null;\n\t\t\t\t}\n\t\t\t}\n\t\t\tmemo[target] = styleTarget;\n\t\t}\n\t\treturn memo[target]\n\t};\n})();\n\nvar singleton = null;\nvar\tsingletonCounter = 0;\nvar\tstylesInsertedAtTop = [];\n\nvar\tfixUrls = __webpack_require__(/*! ./urls */ \"./node_modules/style-loader/lib/urls.js\");\n\nmodule.exports = function(list, options) {\n\tif (typeof DEBUG !== \"undefined\" && DEBUG) {\n\t\tif (typeof document !== \"object\") throw new Error(\"The style-loader cannot be used in a non-browser environment\");\n\t}\n\n\toptions = options || {};\n\n\toptions.attrs = typeof options.attrs === \"object\" ? options.attrs : {};\n\n\t// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>\n\t// tags it will allow on a page\n\tif (!options.singleton && typeof options.singleton !== \"boolean\") options.singleton = isOldIE();\n\n\t// By default, add <style> tags to the <head> element\n        if (!options.insertInto) options.insertInto = \"head\";\n\n\t// By default, add <style> tags to the bottom of the target\n\tif (!options.insertAt) options.insertAt = \"bottom\";\n\n\tvar styles = listToStyles(list, options);\n\n\taddStylesToDom(styles, options);\n\n\treturn function update (newList) {\n\t\tvar mayRemove = [];\n\n\t\tfor (var i = 0; i < styles.length; i++) {\n\t\t\tvar item = styles[i];\n\t\t\tvar domStyle = stylesInDom[item.id];\n\n\t\t\tdomStyle.refs--;\n\t\t\tmayRemove.push(domStyle);\n\t\t}\n\n\t\tif(newList) {\n\t\t\tvar newStyles = listToStyles(newList, options);\n\t\t\taddStylesToDom(newStyles, options);\n\t\t}\n\n\t\tfor (var i = 0; i < mayRemove.length; i++) {\n\t\t\tvar domStyle = mayRemove[i];\n\n\t\t\tif(domStyle.refs === 0) {\n\t\t\t\tfor (var j = 0; j < domStyle.parts.length; j++) domStyle.parts[j]();\n\n\t\t\t\tdelete stylesInDom[domStyle.id];\n\t\t\t}\n\t\t}\n\t};\n};\n\nfunction addStylesToDom (styles, options) {\n\tfor (var i = 0; i < styles.length; i++) {\n\t\tvar item = styles[i];\n\t\tvar domStyle = stylesInDom[item.id];\n\n\t\tif(domStyle) {\n\t\t\tdomStyle.refs++;\n\n\t\t\tfor(var j = 0; j < domStyle.parts.length; j++) {\n\t\t\t\tdomStyle.parts[j](item.parts[j]);\n\t\t\t}\n\n\t\t\tfor(; j < item.parts.length; j++) {\n\t\t\t\tdomStyle.parts.push(addStyle(item.parts[j], options));\n\t\t\t}\n\t\t} else {\n\t\t\tvar parts = [];\n\n\t\t\tfor(var j = 0; j < item.parts.length; j++) {\n\t\t\t\tparts.push(addStyle(item.parts[j], options));\n\t\t\t}\n\n\t\t\tstylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};\n\t\t}\n\t}\n}\n\nfunction listToStyles (list, options) {\n\tvar styles = [];\n\tvar newStyles = {};\n\n\tfor (var i = 0; i < list.length; i++) {\n\t\tvar item = list[i];\n\t\tvar id = options.base ? item[0] + options.base : item[0];\n\t\tvar css = item[1];\n\t\tvar media = item[2];\n\t\tvar sourceMap = item[3];\n\t\tvar part = {css: css, media: media, sourceMap: sourceMap};\n\n\t\tif(!newStyles[id]) styles.push(newStyles[id] = {id: id, parts: [part]});\n\t\telse newStyles[id].parts.push(part);\n\t}\n\n\treturn styles;\n}\n\nfunction insertStyleElement (options, style) {\n\tvar target = getElement(options.insertInto)\n\n\tif (!target) {\n\t\tthrow new Error(\"Couldn't find a style target. This probably means that the value for the 'insertInto' parameter is invalid.\");\n\t}\n\n\tvar lastStyleElementInsertedAtTop = stylesInsertedAtTop[stylesInsertedAtTop.length - 1];\n\n\tif (options.insertAt === \"top\") {\n\t\tif (!lastStyleElementInsertedAtTop) {\n\t\t\ttarget.insertBefore(style, target.firstChild);\n\t\t} else if (lastStyleElementInsertedAtTop.nextSibling) {\n\t\t\ttarget.insertBefore(style, lastStyleElementInsertedAtTop.nextSibling);\n\t\t} else {\n\t\t\ttarget.appendChild(style);\n\t\t}\n\t\tstylesInsertedAtTop.push(style);\n\t} else if (options.insertAt === \"bottom\") {\n\t\ttarget.appendChild(style);\n\t} else if (typeof options.insertAt === \"object\" && options.insertAt.before) {\n\t\tvar nextSibling = getElement(options.insertAt.before, target);\n\t\ttarget.insertBefore(style, nextSibling);\n\t} else {\n\t\tthrow new Error(\"[Style Loader]\\n\\n Invalid value for parameter 'insertAt' ('options.insertAt') found.\\n Must be 'top', 'bottom', or Object.\\n (https://github.com/webpack-contrib/style-loader#insertat)\\n\");\n\t}\n}\n\nfunction removeStyleElement (style) {\n\tif (style.parentNode === null) return false;\n\tstyle.parentNode.removeChild(style);\n\n\tvar idx = stylesInsertedAtTop.indexOf(style);\n\tif(idx >= 0) {\n\t\tstylesInsertedAtTop.splice(idx, 1);\n\t}\n}\n\nfunction createStyleElement (options) {\n\tvar style = document.createElement(\"style\");\n\n\tif(options.attrs.type === undefined) {\n\t\toptions.attrs.type = \"text/css\";\n\t}\n\n\tif(options.attrs.nonce === undefined) {\n\t\tvar nonce = getNonce();\n\t\tif (nonce) {\n\t\t\toptions.attrs.nonce = nonce;\n\t\t}\n\t}\n\n\taddAttrs(style, options.attrs);\n\tinsertStyleElement(options, style);\n\n\treturn style;\n}\n\nfunction createLinkElement (options) {\n\tvar link = document.createElement(\"link\");\n\n\tif(options.attrs.type === undefined) {\n\t\toptions.attrs.type = \"text/css\";\n\t}\n\toptions.attrs.rel = \"stylesheet\";\n\n\taddAttrs(link, options.attrs);\n\tinsertStyleElement(options, link);\n\n\treturn link;\n}\n\nfunction addAttrs (el, attrs) {\n\tObject.keys(attrs).forEach(function (key) {\n\t\tel.setAttribute(key, attrs[key]);\n\t});\n}\n\nfunction getNonce() {\n\tif (false) {}\n\n\treturn __webpack_require__.nc;\n}\n\nfunction addStyle (obj, options) {\n\tvar style, update, remove, result;\n\n\t// If a transform function was defined, run it on the css\n\tif (options.transform && obj.css) {\n\t    result = typeof options.transform === 'function'\n\t\t ? options.transform(obj.css) \n\t\t : options.transform.default(obj.css);\n\n\t    if (result) {\n\t    \t// If transform returns a value, use that instead of the original css.\n\t    \t// This allows running runtime transformations on the css.\n\t    \tobj.css = result;\n\t    } else {\n\t    \t// If the transform function returns a falsy value, don't add this css.\n\t    \t// This allows conditional loading of css\n\t    \treturn function() {\n\t    \t\t// noop\n\t    \t};\n\t    }\n\t}\n\n\tif (options.singleton) {\n\t\tvar styleIndex = singletonCounter++;\n\n\t\tstyle = singleton || (singleton = createStyleElement(options));\n\n\t\tupdate = applyToSingletonTag.bind(null, style, styleIndex, false);\n\t\tremove = applyToSingletonTag.bind(null, style, styleIndex, true);\n\n\t} else if (\n\t\tobj.sourceMap &&\n\t\ttypeof URL === \"function\" &&\n\t\ttypeof URL.createObjectURL === \"function\" &&\n\t\ttypeof URL.revokeObjectURL === \"function\" &&\n\t\ttypeof Blob === \"function\" &&\n\t\ttypeof btoa === \"function\"\n\t) {\n\t\tstyle = createLinkElement(options);\n\t\tupdate = updateLink.bind(null, style, options);\n\t\tremove = function () {\n\t\t\tremoveStyleElement(style);\n\n\t\t\tif(style.href) URL.revokeObjectURL(style.href);\n\t\t};\n\t} else {\n\t\tstyle = createStyleElement(options);\n\t\tupdate = applyToTag.bind(null, style);\n\t\tremove = function () {\n\t\t\tremoveStyleElement(style);\n\t\t};\n\t}\n\n\tupdate(obj);\n\n\treturn function updateStyle (newObj) {\n\t\tif (newObj) {\n\t\t\tif (\n\t\t\t\tnewObj.css === obj.css &&\n\t\t\t\tnewObj.media === obj.media &&\n\t\t\t\tnewObj.sourceMap === obj.sourceMap\n\t\t\t) {\n\t\t\t\treturn;\n\t\t\t}\n\n\t\t\tupdate(obj = newObj);\n\t\t} else {\n\t\t\tremove();\n\t\t}\n\t};\n}\n\nvar replaceText = (function () {\n\tvar textStore = [];\n\n\treturn function (index, replacement) {\n\t\ttextStore[index] = replacement;\n\n\t\treturn textStore.filter(Boolean).join('\\n');\n\t};\n})();\n\nfunction applyToSingletonTag (style, index, remove, obj) {\n\tvar css = remove ? \"\" : obj.css;\n\n\tif (style.styleSheet) {\n\t\tstyle.styleSheet.cssText = replaceText(index, css);\n\t} else {\n\t\tvar cssNode = document.createTextNode(css);\n\t\tvar childNodes = style.childNodes;\n\n\t\tif (childNodes[index]) style.removeChild(childNodes[index]);\n\n\t\tif (childNodes.length) {\n\t\t\tstyle.insertBefore(cssNode, childNodes[index]);\n\t\t} else {\n\t\t\tstyle.appendChild(cssNode);\n\t\t}\n\t}\n}\n\nfunction applyToTag (style, obj) {\n\tvar css = obj.css;\n\tvar media = obj.media;\n\n\tif(media) {\n\t\tstyle.setAttribute(\"media\", media)\n\t}\n\n\tif(style.styleSheet) {\n\t\tstyle.styleSheet.cssText = css;\n\t} else {\n\t\twhile(style.firstChild) {\n\t\t\tstyle.removeChild(style.firstChild);\n\t\t}\n\n\t\tstyle.appendChild(document.createTextNode(css));\n\t}\n}\n\nfunction updateLink (link, options, obj) {\n\tvar css = obj.css;\n\tvar sourceMap = obj.sourceMap;\n\n\t/*\n\t\tIf convertToAbsoluteUrls isn't defined, but sourcemaps are enabled\n\t\tand there is no publicPath defined then lets turn convertToAbsoluteUrls\n\t\ton by default.  Otherwise default to the convertToAbsoluteUrls option\n\t\tdirectly\n\t*/\n\tvar autoFixUrls = options.convertToAbsoluteUrls === undefined && sourceMap;\n\n\tif (options.convertToAbsoluteUrls || autoFixUrls) {\n\t\tcss = fixUrls(css);\n\t}\n\n\tif (sourceMap) {\n\t\t// http://stackoverflow.com/a/26603875\n\t\tcss += \"\\n/*# sourceMappingURL=data:application/json;base64,\" + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + \" */\";\n\t}\n\n\tvar blob = new Blob([css], { type: \"text/css\" });\n\n\tvar oldSrc = link.href;\n\n\tlink.href = URL.createObjectURL(blob);\n\n\tif(oldSrc) URL.revokeObjectURL(oldSrc);\n}\n\n\n//# sourceURL=webpack:///./node_modules/style-loader/lib/addStyles.js?");

/***/ }),

/***/ "./node_modules/style-loader/lib/urls.js":
/*!***********************************************!*\
  !*** ./node_modules/style-loader/lib/urls.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("\n/**\n * When source maps are enabled, `style-loader` uses a link element with a data-uri to\n * embed the css on the page. This breaks all relative urls because now they are relative to a\n * bundle instead of the current page.\n *\n * One solution is to only use full urls, but that may be impossible.\n *\n * Instead, this function \"fixes\" the relative urls to be absolute according to the current page location.\n *\n * A rudimentary test suite is located at `test/fixUrls.js` and can be run via the `npm test` command.\n *\n */\n\nmodule.exports = function (css) {\n  // get current location\n  var location = typeof window !== \"undefined\" && window.location;\n\n  if (!location) {\n    throw new Error(\"fixUrls requires window.location\");\n  }\n\n\t// blank or null?\n\tif (!css || typeof css !== \"string\") {\n\t  return css;\n  }\n\n  var baseUrl = location.protocol + \"//\" + location.host;\n  var currentDir = baseUrl + location.pathname.replace(/\\/[^\\/]*$/, \"/\");\n\n\t// convert each url(...)\n\t/*\n\tThis regular expression is just a way to recursively match brackets within\n\ta string.\n\n\t /url\\s*\\(  = Match on the word \"url\" with any whitespace after it and then a parens\n\t   (  = Start a capturing group\n\t     (?:  = Start a non-capturing group\n\t         [^)(]  = Match anything that isn't a parentheses\n\t         |  = OR\n\t         \\(  = Match a start parentheses\n\t             (?:  = Start another non-capturing groups\n\t                 [^)(]+  = Match anything that isn't a parentheses\n\t                 |  = OR\n\t                 \\(  = Match a start parentheses\n\t                     [^)(]*  = Match anything that isn't a parentheses\n\t                 \\)  = Match a end parentheses\n\t             )  = End Group\n              *\\) = Match anything and then a close parens\n          )  = Close non-capturing group\n          *  = Match anything\n       )  = Close capturing group\n\t \\)  = Match a close parens\n\n\t /gi  = Get all matches, not the first.  Be case insensitive.\n\t */\n\tvar fixedCss = css.replace(/url\\s*\\(((?:[^)(]|\\((?:[^)(]+|\\([^)(]*\\))*\\))*)\\)/gi, function(fullMatch, origUrl) {\n\t\t// strip quotes (if they exist)\n\t\tvar unquotedOrigUrl = origUrl\n\t\t\t.trim()\n\t\t\t.replace(/^\"(.*)\"$/, function(o, $1){ return $1; })\n\t\t\t.replace(/^'(.*)'$/, function(o, $1){ return $1; });\n\n\t\t// already a full url? no change\n\t\tif (/^(#|data:|http:\\/\\/|https:\\/\\/|file:\\/\\/\\/|\\s*$)/i.test(unquotedOrigUrl)) {\n\t\t  return fullMatch;\n\t\t}\n\n\t\t// convert the url to a full url\n\t\tvar newUrl;\n\n\t\tif (unquotedOrigUrl.indexOf(\"//\") === 0) {\n\t\t  \t//TODO: should we add protocol?\n\t\t\tnewUrl = unquotedOrigUrl;\n\t\t} else if (unquotedOrigUrl.indexOf(\"/\") === 0) {\n\t\t\t// path should be relative to the base url\n\t\t\tnewUrl = baseUrl + unquotedOrigUrl; // already starts with '/'\n\t\t} else {\n\t\t\t// path should be relative to current directory\n\t\t\tnewUrl = currentDir + unquotedOrigUrl.replace(/^\\.\\//, \"\"); // Strip leading './'\n\t\t}\n\n\t\t// send back the fixed url(...)\n\t\treturn \"url(\" + JSON.stringify(newUrl) + \")\";\n\t});\n\n\t// send back the fixed css\n\treturn fixedCss;\n};\n\n\n//# sourceURL=webpack:///./node_modules/style-loader/lib/urls.js?");

/***/ }),

/***/ "./node_modules/vivagraphjs/src/Algorithms/centrality.js":
/*!***************************************************************!*\
  !*** ./node_modules/vivagraphjs/src/Algorithms/centrality.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var centrality = __webpack_require__(/*! ngraph.centrality */ \"./node_modules/ngraph.centrality/index.js\");\n\nmodule.exports = centralityWrapper;\n\nfunction centralityWrapper() {\n  // TODO: This should not be a function\n  return {\n    betweennessCentrality: betweennessCentrality,\n    degreeCentrality: degreeCentrality\n  };\n}\n\nfunction betweennessCentrality(g) {\n  var betweenness = centrality.betweenness(g);\n  return toVivaGraphCentralityFormat(betweenness);\n}\n\nfunction degreeCentrality(g, kind) {\n  var degree = centrality.degree(g, kind);\n  return toVivaGraphCentralityFormat(degree);\n}\n\nfunction toVivaGraphCentralityFormat(centrality) {\n  return Object.keys(centrality).sort(byValue).map(toKeyValue);\n\n  function byValue(x, y) {\n    return centrality[y] - centrality[x];\n  }\n\n  function toKeyValue(key) {\n    return {\n      key: key,\n      value: centrality[key]\n    };\n  }\n}\n\n\n//# sourceURL=webpack:///./node_modules/vivagraphjs/src/Algorithms/centrality.js?");

/***/ }),

/***/ "./node_modules/vivagraphjs/src/Algorithms/operations.js":
/*!***************************************************************!*\
  !*** ./node_modules/vivagraphjs/src/Algorithms/operations.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("/**\r\n * @fileOverview Contains collection of primitive operations under graph.\r\n *\r\n * @author Andrei Kashcha (aka anvaka) / https://github.com/anvaka\r\n */\r\nmodule.exports = operations;\r\n\r\nfunction operations() {\r\n\r\n    return {\r\n        /**\r\n         * Gets graph density, which is a ratio of actual number of edges to maximum\r\n         * number of edges. I.e. graph density 1 means all nodes are connected with each other with an edge.\r\n         * Density 0 - graph has no edges. Runtime: O(1)\r\n         * \r\n         * @param graph represents oriented graph structure.\r\n         * @param directed (optional boolean) represents if the graph should be treated as a directed graph.\r\n         * \r\n         * @returns density of the graph if graph has nodes. NaN otherwise. Returns density for undirected graph by default but returns density for directed graph if a boolean 'true' is passed along with the graph.\r\n         */\r\n        density : function (graph,directed) {\r\n            var nodes = graph.getNodesCount();\r\n            if (nodes === 0) {\r\n                return NaN;\r\n            }\r\n            if(directed){\r\n                return graph.getLinksCount() / (nodes * (nodes - 1));\r\n            } else {\r\n                return 2 * graph.getLinksCount() / (nodes * (nodes - 1));\r\n            }\r\n        }\r\n    };\r\n};\r\n\n\n//# sourceURL=webpack:///./node_modules/vivagraphjs/src/Algorithms/operations.js?");

/***/ }),

/***/ "./node_modules/vivagraphjs/src/Input/domInputManager.js":
/*!***************************************************************!*\
  !*** ./node_modules/vivagraphjs/src/Input/domInputManager.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("/**\n * @author Andrei Kashcha (aka anvaka) / https://github.com/anvaka\n */\n\nmodule.exports = domInputManager;\n\nvar dragndrop = __webpack_require__(/*! ./dragndrop.js */ \"./node_modules/vivagraphjs/src/Input/dragndrop.js\");\n\nfunction domInputManager(graph, graphics) {\n  var nodeEvents = {};\n  return {\n    /**\n     * Called by renderer to listen to drag-n-drop events from node. E.g. for SVG\n     * graphics we may listen to DOM events, whereas for WebGL the graphics\n     * should provide custom eventing mechanism.\n     *\n     * @param node - to be monitored.\n     * @param handlers - object with set of three callbacks:\n     *   onStart: function(),\n     *   onDrag: function(e, offset),\n     *   onStop: function()\n     */\n    bindDragNDrop: bindDragNDrop\n  };\n\n  function bindDragNDrop(node, handlers) {\n    var events;\n    if (handlers) {\n      var nodeUI = graphics.getNodeUI(node.id);\n      events = dragndrop(nodeUI);\n      if (typeof handlers.onStart === 'function') {\n        events.onStart(handlers.onStart);\n      }\n      if (typeof handlers.onDrag === 'function') {\n        events.onDrag(handlers.onDrag);\n      }\n      if (typeof handlers.onStop === 'function') {\n        events.onStop(handlers.onStop);\n      }\n\n      nodeEvents[node.id] = events;\n    } else if ((events = nodeEvents[node.id])) {\n      events.release();\n      delete nodeEvents[node.id];\n    }\n  }\n}\n\n\n//# sourceURL=webpack:///./node_modules/vivagraphjs/src/Input/domInputManager.js?");

/***/ }),

/***/ "./node_modules/vivagraphjs/src/Input/dragndrop.js":
/*!*********************************************************!*\
  !*** ./node_modules/vivagraphjs/src/Input/dragndrop.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("/**\n * @author Andrei Kashcha (aka anvaka) / https://github.com/anvaka\n */\n\nmodule.exports = dragndrop;\n\nvar documentEvents = __webpack_require__(/*! ../Utils/documentEvents.js */ \"./node_modules/vivagraphjs/src/Utils/documentEvents.js\");\nvar browserInfo = __webpack_require__(/*! ../Utils/browserInfo.js */ \"./node_modules/vivagraphjs/src/Utils/browserInfo.js\");\nvar findElementPosition = __webpack_require__(/*! ../Utils/findElementPosition.js */ \"./node_modules/vivagraphjs/src/Utils/findElementPosition.js\");\n\n// TODO: Move to input namespace\n// TODO: Methods should be extracted into the prototype. This class\n// does not need to consume so much memory for every tracked element\nfunction dragndrop(element) {\n    var start,\n        drag,\n        end,\n        scroll,\n        prevSelectStart,\n        prevDragStart,\n\n        startX = 0,\n        startY = 0,\n        dragObject,\n        touchInProgress = false,\n        pinchZoomLength = 0,\n\n        getMousePos = function (e) {\n            var posx = 0,\n                posy = 0;\n\n            e = e || window.event;\n\n            if (e.pageX || e.pageY) {\n                posx = e.pageX;\n                posy = e.pageY;\n            } else if (e.clientX || e.clientY) {\n                posx = e.clientX + window.document.body.scrollLeft + window.document.documentElement.scrollLeft;\n                posy = e.clientY + window.document.body.scrollTop + window.document.documentElement.scrollTop;\n            }\n\n            return [posx, posy];\n        },\n\n        move = function (e, clientX, clientY) {\n            if (drag) {\n                drag(e, {x : clientX - startX, y : clientY - startY });\n            }\n\n            startX = clientX;\n            startY = clientY;\n        },\n\n        stopPropagation = function (e) {\n            if (e.stopPropagation) { e.stopPropagation(); } else { e.cancelBubble = true; }\n        },\n        preventDefault = function (e) {\n            if (e.preventDefault) { e.preventDefault(); }\n        },\n\n        handleDisabledEvent = function (e) {\n            stopPropagation(e);\n            return false;\n        },\n\n        handleMouseMove = function (e) {\n            e = e || window.event;\n\n            move(e, e.clientX, e.clientY);\n        },\n\n        handleMouseDown = function (e) {\n            e = e || window.event;\n            if (touchInProgress) {\n                // modern browsers will fire mousedown for touch events too\n                // we do not want this, since touch is handled separately.\n                stopPropagation(e);\n                return false;\n            }\n            // for IE, left click == 1\n            // for Firefox, left click == 0\n            var isLeftButton = ((e.button === 1 && window.event !== null) || e.button === 0);\n\n            if (isLeftButton) {\n                startX = e.clientX;\n                startY = e.clientY;\n\n                // TODO: bump zIndex?\n                dragObject = e.target || e.srcElement;\n\n                if (start) { start(e, {x: startX, y : startY}); }\n\n                documentEvents.on('mousemove', handleMouseMove);\n                documentEvents.on('mouseup', handleMouseUp);\n\n\n                stopPropagation(e);\n                // TODO: What if event already there? Not bullet proof:\n                prevSelectStart = window.document.onselectstart;\n                prevDragStart = window.document.ondragstart;\n\n                window.document.onselectstart = handleDisabledEvent;\n                dragObject.ondragstart = handleDisabledEvent;\n\n                // prevent text selection (except IE)\n                return false;\n            }\n        },\n\n        handleMouseUp = function (e) {\n            e = e || window.event;\n\n            documentEvents.off('mousemove', handleMouseMove);\n            documentEvents.off('mouseup', handleMouseUp);\n\n            window.document.onselectstart = prevSelectStart;\n            dragObject.ondragstart = prevDragStart;\n            dragObject = null;\n            if (end) { end(e); }\n        },\n\n        handleMouseWheel = function (e) {\n            if (typeof scroll !== 'function') {\n                return;\n            }\n\n            e = e || window.event;\n            if (e.preventDefault) {\n                e.preventDefault();\n            }\n\n            e.returnValue = false;\n            var delta,\n                mousePos = getMousePos(e),\n                elementOffset = findElementPosition(element),\n                relMousePos = {\n                    x: mousePos[0] - elementOffset[0],\n                    y: mousePos[1] - elementOffset[1]\n                };\n\n            if (e.wheelDelta) {\n                delta = e.wheelDelta / 360; // Chrome/Safari\n            } else {\n                delta = e.detail / -9; // Mozilla\n            }\n\n            scroll(e, delta, relMousePos);\n        },\n\n        updateScrollEvents = function (scrollCallback) {\n            if (!scroll && scrollCallback) {\n                // client is interested in scrolling. Start listening to events:\n                if (browserInfo.browser === 'webkit') {\n                    element.addEventListener('mousewheel', handleMouseWheel, false); // Chrome/Safari\n                } else {\n                    element.addEventListener('DOMMouseScroll', handleMouseWheel, false); // Others\n                }\n            } else if (scroll && !scrollCallback) {\n                if (browserInfo.browser === 'webkit') {\n                    element.removeEventListener('mousewheel', handleMouseWheel, false); // Chrome/Safari\n                } else {\n                    element.removeEventListener('DOMMouseScroll', handleMouseWheel, false); // Others\n                }\n            }\n\n            scroll = scrollCallback;\n        },\n\n        getPinchZoomLength = function(finger1, finger2) {\n            return (finger1.clientX - finger2.clientX) * (finger1.clientX - finger2.clientX) +\n                   (finger1.clientY - finger2.clientY) * (finger1.clientY - finger2.clientY);\n        },\n\n        handleTouchMove = function (e) {\n            if (e.touches.length === 1) {\n                stopPropagation(e);\n\n                var touch = e.touches[0];\n                move(e, touch.clientX, touch.clientY);\n            } else if (e.touches.length === 2) {\n                // it's a zoom:\n                var currentPinchLength = getPinchZoomLength(e.touches[0], e.touches[1]);\n                var delta = 0;\n                if (currentPinchLength < pinchZoomLength) {\n                    delta = -1;\n                } else if (currentPinchLength > pinchZoomLength) {\n                    delta = 1;\n                }\n                scroll(e, delta, {x: e.touches[0].clientX, y: e.touches[0].clientY});\n                pinchZoomLength = currentPinchLength;\n                stopPropagation(e);\n                preventDefault(e);\n            }\n        },\n\n        handleTouchEnd = function (e) {\n            touchInProgress = false;\n            documentEvents.off('touchmove', handleTouchMove);\n            documentEvents.off('touchend', handleTouchEnd);\n            documentEvents.off('touchcancel', handleTouchEnd);\n            dragObject = null;\n            if (end) { end(e); }\n        },\n\n        handleSignleFingerTouch = function (e, touch) {\n            stopPropagation(e);\n            preventDefault(e);\n\n            startX = touch.clientX;\n            startY = touch.clientY;\n\n            dragObject = e.target || e.srcElement;\n\n            if (start) { start(e, {x: startX, y : startY}); }\n            // TODO: can I enter into the state when touch is in progress\n            // but it's still a single finger touch?\n            if (!touchInProgress) {\n                touchInProgress = true;\n                documentEvents.on('touchmove', handleTouchMove);\n                documentEvents.on('touchend', handleTouchEnd);\n                documentEvents.on('touchcancel', handleTouchEnd);\n            }\n        },\n\n        handleTouchStart = function (e) {\n            if (e.touches.length === 1) {\n                return handleSignleFingerTouch(e, e.touches[0]);\n            } else if (e.touches.length === 2) {\n                // handleTouchMove() will care about pinch zoom.\n                stopPropagation(e);\n                preventDefault(e);\n\n                pinchZoomLength = getPinchZoomLength(e.touches[0], e.touches[1]);\n\n            }\n            // don't care about the rest.\n        };\n\n\n    element.addEventListener('mousedown', handleMouseDown);\n    element.addEventListener('touchstart', handleTouchStart);\n\n    return {\n        onStart : function (callback) {\n            start = callback;\n            return this;\n        },\n\n        onDrag : function (callback) {\n            drag = callback;\n            return this;\n        },\n\n        onStop : function (callback) {\n            end = callback;\n            return this;\n        },\n\n        /**\n         * Occurs when mouse wheel event happens. callback = function(e, scrollDelta, scrollPoint);\n         */\n        onScroll : function (callback) {\n            updateScrollEvents(callback);\n            return this;\n        },\n\n        release : function () {\n            // TODO: could be unsafe. We might wanna release dragObject, etc.\n            element.removeEventListener('mousedown', handleMouseDown);\n            element.removeEventListener('touchstart', handleTouchStart);\n\n            documentEvents.off('mousemove', handleMouseMove);\n            documentEvents.off('mouseup', handleMouseUp);\n            documentEvents.off('touchmove', handleTouchMove);\n            documentEvents.off('touchend', handleTouchEnd);\n            documentEvents.off('touchcancel', handleTouchEnd);\n\n            updateScrollEvents(null);\n        }\n    };\n}\n\n\n//# sourceURL=webpack:///./node_modules/vivagraphjs/src/Input/dragndrop.js?");

/***/ }),

/***/ "./node_modules/vivagraphjs/src/Input/webglInputManager.js":
/*!*****************************************************************!*\
  !*** ./node_modules/vivagraphjs/src/Input/webglInputManager.js ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("/**\n * @author Andrei Kashcha (aka anvaka) / https://github.com/anvaka\n */\n\nmodule.exports = webglInputManager;\n\nvar createInputEvents = __webpack_require__(/*! ../WebGL/webglInputEvents.js */ \"./node_modules/vivagraphjs/src/WebGL/webglInputEvents.js\");\n\nfunction webglInputManager(graph, graphics) {\n    var inputEvents = createInputEvents(graphics),\n        draggedNode = null,\n        internalHandlers = {},\n        pos = {x : 0, y : 0};\n\n    inputEvents.mouseDown(function (node, e) {\n        draggedNode = node;\n        pos.x = e.clientX;\n        pos.y = e.clientY;\n\n        inputEvents.mouseCapture(draggedNode);\n\n        var handlers = internalHandlers[node.id];\n        if (handlers && handlers.onStart) {\n            handlers.onStart(e, pos);\n        }\n\n        return true;\n    }).mouseUp(function (node) {\n        inputEvents.releaseMouseCapture(draggedNode);\n\n        draggedNode = null;\n        var handlers = internalHandlers[node.id];\n        if (handlers && handlers.onStop) {\n            handlers.onStop();\n        }\n        return true;\n    }).mouseMove(function (node, e) {\n        if (draggedNode) {\n            var handlers = internalHandlers[draggedNode.id];\n            if (handlers && handlers.onDrag) {\n                handlers.onDrag(e, {x : e.clientX - pos.x, y : e.clientY - pos.y });\n            }\n\n            pos.x = e.clientX;\n            pos.y = e.clientY;\n            return true;\n        }\n    });\n\n    return {\n        /**\n         * Called by renderer to listen to drag-n-drop events from node. E.g. for SVG\n         * graphics we may listen to DOM events, whereas for WebGL we graphics\n         * should provide custom eventing mechanism.\n         *\n         * @param node - to be monitored.\n         * @param handlers - object with set of three callbacks:\n         *   onStart: function(),\n         *   onDrag: function(e, offset),\n         *   onStop: function()\n         */\n        bindDragNDrop : function (node, handlers) {\n            internalHandlers[node.id] = handlers;\n            if (!handlers) {\n                delete internalHandlers[node.id];\n            }\n        }\n    };\n}\n\n\n//# sourceURL=webpack:///./node_modules/vivagraphjs/src/Input/webglInputManager.js?");

/***/ }),

/***/ "./node_modules/vivagraphjs/src/Layout/constant.js":
/*!*********************************************************!*\
  !*** ./node_modules/vivagraphjs/src/Layout/constant.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = constant;\n\nvar merge = __webpack_require__(/*! ngraph.merge */ \"./node_modules/ngraph.merge/index.js\");\nvar random = __webpack_require__(/*! ngraph.random */ \"./node_modules/ngraph.random/index.js\").random;\nvar Rect = __webpack_require__(/*! ../Utils/rect.js */ \"./node_modules/vivagraphjs/src/Utils/rect.js\");\n\n/**\n * Does not really perform any layouting algorithm but is compliant\n * with renderer interface. Allowing clients to provide specific positioning\n * callback and get static layout of the graph\n *\n * @param {Viva.Graph.graph} graph to layout\n * @param {Object} userSettings\n */\nfunction constant(graph, userSettings) {\n    userSettings = merge(userSettings, {\n        maxX : 1024,\n        maxY : 1024,\n        seed : 'Deterministic randomness made me do this'\n    });\n    // This class simply follows API, it does not use some of the arguments:\n    /*jshint unused: false */\n    var rand = random(userSettings.seed),\n        graphRect = new Rect(Number.MAX_VALUE, Number.MAX_VALUE, Number.MIN_VALUE, Number.MIN_VALUE),\n        layoutLinks = {},\n\n        placeNodeCallback = function (node) {\n            return {\n              x: rand.next(userSettings.maxX),\n              y: rand.next(userSettings.maxY)\n            };\n        },\n\n        updateGraphRect = function (position, graphRect) {\n            if (position.x < graphRect.x1) { graphRect.x1 = position.x; }\n            if (position.x > graphRect.x2) { graphRect.x2 = position.x; }\n            if (position.y < graphRect.y1) { graphRect.y1 = position.y; }\n            if (position.y > graphRect.y2) { graphRect.y2 = position.y; }\n        },\n\n        layoutNodes = typeof Object.create === 'function' ? Object.create(null) : {},\n\n        ensureNodeInitialized = function (node) {\n            layoutNodes[node.id] = placeNodeCallback(node);\n            updateGraphRect(layoutNodes[node.id], graphRect);\n        },\n\n        updateNodePositions = function () {\n            if (graph.getNodesCount() === 0) { return; }\n\n            graphRect.x1 = Number.MAX_VALUE;\n            graphRect.y1 = Number.MAX_VALUE;\n            graphRect.x2 = Number.MIN_VALUE;\n            graphRect.y2 = Number.MIN_VALUE;\n\n            graph.forEachNode(ensureNodeInitialized);\n        },\n\n        ensureLinkInitialized = function (link) {\n          layoutLinks[link.id] = link;\n        },\n\n        onGraphChanged = function(changes) {\n            for (var i = 0; i < changes.length; ++i) {\n                var change = changes[i];\n                if (change.node) {\n                    if (change.changeType === 'add') {\n                        ensureNodeInitialized(change.node);\n                    } else {\n                        delete layoutNodes[change.node.id];\n                    }\n                } if (change.link) {\n                    if (change.changeType === 'add') {\n                        ensureLinkInitialized(change.link);\n                    } else {\n                        delete layoutLinks[change.link.id];\n                    }\n                }\n            }\n        };\n\n    graph.forEachNode(ensureNodeInitialized);\n    graph.forEachLink(ensureLinkInitialized);\n    graph.on('changed', onGraphChanged);\n\n    return {\n        /**\n         * Attempts to layout graph within given number of iterations.\n         *\n         * @param {integer} [iterationsCount] number of algorithm's iterations.\n         *  The constant layout ignores this parameter.\n         */\n        run : function (iterationsCount) {\n            this.step();\n        },\n\n        /**\n         * One step of layout algorithm.\n         */\n        step : function () {\n            updateNodePositions();\n\n            return true; // no need to continue.\n        },\n\n        /**\n         * Returns rectangle structure {x1, y1, x2, y2}, which represents\n         * current space occupied by graph.\n         */\n        getGraphRect : function () {\n            return graphRect;\n        },\n\n        /**\n         * Request to release all resources\n         */\n        dispose : function () {\n            graph.off('change', onGraphChanged);\n        },\n\n        /*\n         * Checks whether given node is pinned; all nodes in this layout are pinned.\n         */\n        isNodePinned: function (node) {\n            return true;\n        },\n\n        /*\n         * Requests layout algorithm to pin/unpin node to its current position\n         * Pinned nodes should not be affected by layout algorithm and always\n         * remain at their position\n         */\n        pinNode: function (node, isPinned) {\n           // noop\n        },\n\n        /*\n         * Gets position of a node by its id. If node was not seen by this\n         * layout algorithm undefined value is returned;\n         */\n        getNodePosition: getNodePosition,\n\n        /**\n         * Returns {from, to} position of a link.\n         */\n        getLinkPosition: function (linkId) {\n          var link = layoutLinks[linkId];\n          return {\n              from : getNodePosition(link.fromId),\n              to : getNodePosition(link.toId)\n          };\n        },\n\n        /**\n         * Sets position of a node to a given coordinates\n         */\n        setNodePosition: function (nodeId, x, y) {\n            var pos = layoutNodes[nodeId];\n            if (pos) {\n                pos.x = x;\n                pos.y = y;\n            }\n        },\n\n        // Layout specific methods:\n\n        /**\n         * Based on argument either update default node placement callback or\n         * attempts to place given node using current placement callback.\n         * Setting new node callback triggers position update for all nodes.\n         *\n         * @param {Object} newPlaceNodeCallbackOrNode - if it is a function then\n         * default node placement callback is replaced with new one. Node placement\n         * callback has a form of function (node) {}, and is expected to return an\n         * object with x and y properties set to numbers.\n         *\n         * Otherwise if it's not a function the argument is treated as graph node\n         * and current node placement callback will be used to place it.\n         */\n        placeNode : function (newPlaceNodeCallbackOrNode) {\n            if (typeof newPlaceNodeCallbackOrNode === 'function') {\n                placeNodeCallback = newPlaceNodeCallbackOrNode;\n                updateNodePositions();\n                return this;\n            }\n\n            // it is not a request to update placeNodeCallback, trying to place\n            // a node using current callback:\n            return placeNodeCallback(newPlaceNodeCallbackOrNode);\n        }\n\n    };\n\n    function getNodePosition(nodeId) {\n        return layoutNodes[nodeId];\n    }\n}\n\n\n//# sourceURL=webpack:///./node_modules/vivagraphjs/src/Layout/constant.js?");

/***/ }),

/***/ "./node_modules/vivagraphjs/src/Utils/backwardCompatibleEvents.js":
/*!************************************************************************!*\
  !*** ./node_modules/vivagraphjs/src/Utils/backwardCompatibleEvents.js ***!
  \************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("/**\n * This module provides compatibility layer with 0.6.x library. It will be\n * removed in the next version\n */\n\nvar events = __webpack_require__(/*! ngraph.events */ \"./node_modules/ngraph.events/index.js\");\n\nmodule.exports = backwardCompatibleEvents;\n\nfunction backwardCompatibleEvents(g) {\n  console.log(\"This method is deprecated. Please use Viva.events() instead\");\n\n  if (!g) {\n    return g;\n  }\n\n  var eventsDefined = (g.on !== undefined) ||\n    (g.off !== undefined) ||\n    (g.fire !== undefined);\n\n  if (eventsDefined) {\n    // events already defined, ignore\n    return {\n      extend: function() {\n        return g;\n      },\n      on: g.on,\n      stop: g.off\n    };\n  }\n\n  return {\n    extend: extend,\n    on: g.on,\n    stop: g.off\n  };\n\n  function extend() {\n    var backwardCompatible = events(g);\n    backwardCompatible.addEventListener = backwardCompatible.on;\n    return backwardCompatible;\n  }\n}\n\n\n//# sourceURL=webpack:///./node_modules/vivagraphjs/src/Utils/backwardCompatibleEvents.js?");

/***/ }),

/***/ "./node_modules/vivagraphjs/src/Utils/browserInfo.js":
/*!***********************************************************!*\
  !*** ./node_modules/vivagraphjs/src/Utils/browserInfo.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = browserInfo();\r\n\r\nfunction browserInfo() {\r\n  if (typeof window === \"undefined\" || !window.hasOwnProperty(\"navigator\")) {\r\n    return {\r\n      browser : \"\",\r\n      version : \"0\"\r\n    };\r\n  }\r\n\r\n  var ua = window.navigator.userAgent.toLowerCase(),\r\n  // Useragent RegExp\r\n  rwebkit = /(webkit)[ \\/]([\\w.]+)/,\r\n  ropera = /(opera)(?:.*version)?[ \\/]([\\w.]+)/,\r\n  rmsie = /(msie) ([\\w.]+)/,\r\n  rmozilla = /(mozilla)(?:.*? rv:([\\w.]+))?/,\r\n  match = rwebkit.exec(ua) ||\r\n    ropera.exec(ua) ||\r\n    rmsie.exec(ua) ||\r\n    (ua.indexOf(\"compatible\") < 0 && rmozilla.exec(ua)) ||\r\n    [];\r\n\r\n  return {\r\n    browser: match[1] || \"\",\r\n    version: match[2] || \"0\"\r\n  };\r\n}\r\n\n\n//# sourceURL=webpack:///./node_modules/vivagraphjs/src/Utils/browserInfo.js?");

/***/ }),

/***/ "./node_modules/vivagraphjs/src/Utils/documentEvents.js":
/*!**************************************************************!*\
  !*** ./node_modules/vivagraphjs/src/Utils/documentEvents.js ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var nullEvents = __webpack_require__(/*! ./nullEvents.js */ \"./node_modules/vivagraphjs/src/Utils/nullEvents.js\");\n\nmodule.exports = createDocumentEvents();\n\nfunction createDocumentEvents() {\n  if (typeof document === undefined) {\n    return nullEvents;\n  }\n\n  return {\n    on: on,\n    off: off\n  };\n}\n\nfunction on(eventName, handler) {\n  document.addEventListener(eventName, handler);\n}\n\nfunction off(eventName, handler) {\n  document.removeEventListener(eventName, handler);\n}\n\n\n//# sourceURL=webpack:///./node_modules/vivagraphjs/src/Utils/documentEvents.js?");

/***/ }),

/***/ "./node_modules/vivagraphjs/src/Utils/findElementPosition.js":
/*!*******************************************************************!*\
  !*** ./node_modules/vivagraphjs/src/Utils/findElementPosition.js ***!
  \*******************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("/**\n * Finds the absolute position of an element on a page\n */\nmodule.exports = findElementPosition;\n\nfunction findElementPosition(obj) {\n    var curleft = 0,\n        curtop = 0;\n    if (obj.offsetParent) {\n        do {\n            curleft += obj.offsetLeft;\n            curtop += obj.offsetTop;\n        } while ((obj = obj.offsetParent) !== null);\n    }\n\n    return [curleft, curtop];\n}\n\n\n//# sourceURL=webpack:///./node_modules/vivagraphjs/src/Utils/findElementPosition.js?");

/***/ }),

/***/ "./node_modules/vivagraphjs/src/Utils/getDimensions.js":
/*!*************************************************************!*\
  !*** ./node_modules/vivagraphjs/src/Utils/getDimensions.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = getDimension;\r\n\r\nfunction getDimension(container) {\r\n    if (!container) {\r\n        throw {\r\n            message : 'Cannot get dimensions of undefined container'\r\n        };\r\n    }\r\n\r\n    // TODO: Potential cross browser bug.\r\n    var width = container.clientWidth;\r\n    var height = container.clientHeight;\r\n\r\n    return {\r\n        left : 0,\r\n        top : 0,\r\n        width : width,\r\n        height : height\r\n    };\r\n}\r\n\n\n//# sourceURL=webpack:///./node_modules/vivagraphjs/src/Utils/getDimensions.js?");

/***/ }),

/***/ "./node_modules/vivagraphjs/src/Utils/intersectRect.js":
/*!*************************************************************!*\
  !*** ./node_modules/vivagraphjs/src/Utils/intersectRect.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var intersect = __webpack_require__(/*! gintersect */ \"./node_modules/gintersect/index.js\");\n\nmodule.exports = intersectRect;\n\nfunction intersectRect(left, top, right, bottom, x1, y1, x2, y2) {\n  return intersect(left, top, left, bottom, x1, y1, x2, y2) ||\n    intersect(left, bottom, right, bottom, x1, y1, x2, y2) ||\n    intersect(right, bottom, right, top, x1, y1, x2, y2) ||\n    intersect(right, top, left, top, x1, y1, x2, y2);\n}\n\n\n//# sourceURL=webpack:///./node_modules/vivagraphjs/src/Utils/intersectRect.js?");

/***/ }),

/***/ "./node_modules/vivagraphjs/src/Utils/nullEvents.js":
/*!**********************************************************!*\
  !*** ./node_modules/vivagraphjs/src/Utils/nullEvents.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = createNullEvents();\n\nfunction createNullEvents() {\n  return {\n    on: noop,\n    off: noop,\n    stop: noop\n  };\n}\n\nfunction noop() { }\n\n\n//# sourceURL=webpack:///./node_modules/vivagraphjs/src/Utils/nullEvents.js?");

/***/ }),

/***/ "./node_modules/vivagraphjs/src/Utils/rect.js":
/*!****************************************************!*\
  !*** ./node_modules/vivagraphjs/src/Utils/rect.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = Rect;\n\n/**\n * Very generic rectangle.\n */\nfunction Rect (x1, y1, x2, y2) {\n    this.x1 = x1 || 0;\n    this.y1 = y1 || 0;\n    this.x2 = x2 || 0;\n    this.y2 = y2 || 0;\n}\n\n\n//# sourceURL=webpack:///./node_modules/vivagraphjs/src/Utils/rect.js?");

/***/ }),

/***/ "./node_modules/vivagraphjs/src/Utils/timer.js":
/*!*****************************************************!*\
  !*** ./node_modules/vivagraphjs/src/Utils/timer.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("/* WEBPACK VAR INJECTION */(function(global) {/**\r\n * @author Andrei Kashcha (aka anvaka) / https://github.com/anvaka\r\n */\r\n\r\nmodule.exports = createTimer();\r\n\r\nfunction createTimer() {\r\n  var lastTime = 0,\r\n    vendors = ['ms', 'moz', 'webkit', 'o'],\r\n    i,\r\n    scope;\r\n\r\n  if (typeof window !== 'undefined') {\r\n    scope = window;\r\n  } else if (typeof global !== 'undefined') {\r\n    scope = global;\r\n  } else {\r\n    scope = {\r\n      setTimeout: noop,\r\n      clearTimeout: noop\r\n    };\r\n  }\r\n\r\n  for (i = 0; i < vendors.length && !scope.requestAnimationFrame; ++i) {\r\n    var vendorPrefix = vendors[i];\r\n    scope.requestAnimationFrame = scope[vendorPrefix + 'RequestAnimationFrame'];\r\n    scope.cancelAnimationFrame =\r\n      scope[vendorPrefix + 'CancelAnimationFrame'] || scope[vendorPrefix + 'CancelRequestAnimationFrame'];\r\n  }\r\n\r\n  if (!scope.requestAnimationFrame) {\r\n    scope.requestAnimationFrame = rafPolyfill;\r\n  }\r\n\r\n  if (!scope.cancelAnimationFrame) {\r\n    scope.cancelAnimationFrame = cancelRafPolyfill;\r\n  }\r\n\r\n  return timer;\r\n\r\n  /**\r\n   * Timer that fires callback with given interval (in ms) until\r\n   * callback returns true;\r\n   */\r\n  function timer(callback) {\r\n    var intervalId;\r\n    startTimer(); // start it right away.\r\n\r\n    return {\r\n      /**\r\n       * Stops execution of the callback\r\n       */\r\n      stop: stopTimer,\r\n\r\n      restart: restart\r\n    };\r\n\r\n    function startTimer() {\r\n      intervalId = scope.requestAnimationFrame(startTimer);\r\n      if (!callback()) {\r\n        stopTimer();\r\n      }\r\n    }\r\n\r\n    function stopTimer() {\r\n      scope.cancelAnimationFrame(intervalId);\r\n      intervalId = 0;\r\n    }\r\n\r\n    function restart() {\r\n      if (!intervalId) {\r\n        startTimer();\r\n      }\r\n    }\r\n  }\r\n\r\n  function rafPolyfill(callback) {\r\n    var currTime = new Date().getTime();\r\n    var timeToCall = Math.max(0, 16 - (currTime - lastTime));\r\n    var id = scope.setTimeout(function() {\r\n      callback(currTime + timeToCall);\r\n    }, timeToCall);\r\n    lastTime = currTime + timeToCall;\r\n    return id;\r\n  }\r\n\r\n  function cancelRafPolyfill(id) {\r\n    scope.clearTimeout(id);\r\n  }\r\n}\r\n\r\nfunction noop() {}\r\n\n/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../webpack/buildin/global.js */ \"./node_modules/webpack/buildin/global.js\")))\n\n//# sourceURL=webpack:///./node_modules/vivagraphjs/src/Utils/timer.js?");

/***/ }),

/***/ "./node_modules/vivagraphjs/src/Utils/windowEvents.js":
/*!************************************************************!*\
  !*** ./node_modules/vivagraphjs/src/Utils/windowEvents.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var nullEvents = __webpack_require__(/*! ./nullEvents.js */ \"./node_modules/vivagraphjs/src/Utils/nullEvents.js\");\n\nmodule.exports = createDocumentEvents();\n\nfunction createDocumentEvents() {\n  if (typeof window === 'undefined') {\n    return nullEvents;\n  }\n\n  return {\n    on: on,\n    off: off\n  };\n}\n\nfunction on(eventName, handler) {\n  window.addEventListener(eventName, handler);\n}\n\nfunction off(eventName, handler) {\n  window.removeEventListener(eventName, handler);\n}\n\n\n\n//# sourceURL=webpack:///./node_modules/vivagraphjs/src/Utils/windowEvents.js?");

/***/ }),

/***/ "./node_modules/vivagraphjs/src/View/renderer.js":
/*!*******************************************************!*\
  !*** ./node_modules/vivagraphjs/src/View/renderer.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("/**\r\n * @fileOverview Defines a graph renderer that uses CSS based drawings.\r\n *\r\n * @author Andrei Kashcha (aka anvaka) / https://github.com/anvaka\r\n */\r\n\r\nmodule.exports = renderer;\r\n\r\nvar eventify = __webpack_require__(/*! ngraph.events */ \"./node_modules/ngraph.events/index.js\");\r\nvar forceDirected = __webpack_require__(/*! ngraph.forcelayout */ \"./node_modules/ngraph.forcelayout/index.js\");\r\nvar svgGraphics = __webpack_require__(/*! ./svgGraphics.js */ \"./node_modules/vivagraphjs/src/View/svgGraphics.js\");\r\nvar windowEvents = __webpack_require__(/*! ../Utils/windowEvents.js */ \"./node_modules/vivagraphjs/src/Utils/windowEvents.js\");\r\nvar domInputManager = __webpack_require__(/*! ../Input/domInputManager.js */ \"./node_modules/vivagraphjs/src/Input/domInputManager.js\");\r\nvar timer = __webpack_require__(/*! ../Utils/timer.js */ \"./node_modules/vivagraphjs/src/Utils/timer.js\");\r\nvar getDimension = __webpack_require__(/*! ../Utils/getDimensions.js */ \"./node_modules/vivagraphjs/src/Utils/getDimensions.js\");\r\nvar dragndrop = __webpack_require__(/*! ../Input/dragndrop.js */ \"./node_modules/vivagraphjs/src/Input/dragndrop.js\");\r\n\r\n/**\r\n * This is heart of the rendering. Class accepts graph to be rendered and rendering settings.\r\n * It monitors graph changes and depicts them accordingly.\r\n *\r\n * @param graph - Viva.Graph.graph() object to be rendered.\r\n * @param settings - rendering settings, composed from the following parts (with their defaults shown):\r\n *   settings = {\r\n *     // Represents a module that is capable of displaying graph nodes and links.\r\n *     // all graphics has to correspond to defined interface and can be later easily\r\n *     // replaced for specific needs (e.g. adding WebGL should be piece of cake as long\r\n *     // as WebGL has implemented required interface). See svgGraphics for example.\r\n *     graphics : Viva.Graph.View.svgGraphics(),\r\n *\r\n *     // Where the renderer should draw graph. Container size matters, because\r\n *     // renderer will attempt center graph to that size. Also graphics modules\r\n *     // might depend on it.\r\n *     container : document.body,\r\n *\r\n *     // Defines whether graph can respond to use input\r\n *     interactive: true,\r\n *\r\n *     // Layout algorithm to be used. The algorithm is expected to comply with defined\r\n *     // interface and is expected to be iterative. Renderer will use it then to calculate\r\n *     // graph's layout. For examples of the interface refer to Viva.Graph.Layout.forceDirected()\r\n *     layout : Viva.Graph.Layout.forceDirected(),\r\n *\r\n *     // Directs renderer to display links. Usually rendering links is the slowest part of this\r\n *     // library. So if you don't need to display links, consider settings this property to false.\r\n *     renderLinks : true,\r\n *\r\n *     // Number of layout iterations to run before displaying the graph. The bigger you set this number\r\n *     // the closer to ideal position graph will appear first time. But be careful: for large graphs\r\n *     // it can freeze the browser.\r\n *     prerender : 0\r\n *   }\r\n */\r\nfunction renderer(graph, settings) {\r\n  // TODO: This class is getting hard to understand. Consider refactoring.\r\n  // TODO: I have a technical debt here: fix scaling/recentering! Currently it's a total mess.\r\n  var FRAME_INTERVAL = 30;\r\n\r\n  settings = settings || {};\r\n\r\n  var layout = settings.layout,\r\n    graphics = settings.graphics,\r\n    container = settings.container,\r\n    interactive = settings.interactive !== undefined ? settings.interactive : true,\r\n    inputManager,\r\n    animationTimer,\r\n    rendererInitialized = false,\r\n    updateCenterRequired = true,\r\n\r\n    isStable = false,\r\n    userInteraction = false,\r\n    isPaused = false,\r\n\r\n    transform = {\r\n      offsetX: 0,\r\n      offsetY: 0,\r\n      scale: 1\r\n    },\r\n\r\n    publicEvents = eventify({}),\r\n    containerDrag;\r\n\r\n  return {\r\n    /**\r\n     * Performs rendering of the graph.\r\n     *\r\n     * @param iterationsCount if specified renderer will run only given number of iterations\r\n     * and then stop. Otherwise graph rendering is performed indefinitely.\r\n     *\r\n     * Note: if rendering stopped by used started dragging nodes or new nodes were added to the\r\n     * graph renderer will give run more iterations to reflect changes.\r\n     */\r\n    run: function(iterationsCount) {\r\n\r\n      if (!rendererInitialized) {\r\n        prepareSettings();\r\n        prerender();\r\n\r\n        initDom();\r\n        updateCenter();\r\n        listenToEvents();\r\n\r\n        rendererInitialized = true;\r\n      }\r\n\r\n      renderIterations(iterationsCount);\r\n\r\n      return this;\r\n    },\r\n\r\n    reset: function() {\r\n      graphics.resetScale();\r\n      updateCenter();\r\n      transform.scale = 1;\r\n    },\r\n\r\n    pause: function() {\r\n      isPaused = true;\r\n      animationTimer.stop();\r\n    },\r\n\r\n    resume: function() {\r\n      isPaused = false;\r\n      animationTimer.restart();\r\n    },\r\n\r\n    rerender: function() {\r\n      renderGraph();\r\n      return this;\r\n    },\r\n\r\n    zoomOut: function() {\r\n      return scale(true);\r\n    },\r\n\r\n    zoomIn: function() {\r\n      return scale(false);\r\n    },\r\n\r\n    /**\r\n     * Returns current transformation matrix.\r\n     */\r\n    getTransform: function() {\r\n      return transform;\r\n    },\r\n\r\n    /**\r\n     * Centers renderer at x,y graph's coordinates\r\n     */\r\n    moveTo: function(x, y) {\r\n      graphics.graphCenterChanged(transform.offsetX - x * transform.scale, transform.offsetY - y * transform.scale);\r\n      renderGraph();\r\n    },\r\n\r\n    /**\r\n     * Gets current graphics object\r\n     */\r\n    getGraphics: function() {\r\n      return graphics;\r\n    },\r\n    \r\n    /**\r\n     * Gets current layout.\r\n     */\r\n    getLayout: function() {\r\n      return layout;\r\n    },\r\n\r\n    /**\r\n     * Removes this renderer and deallocates all resources/timers\r\n     */\r\n    dispose: function() {\r\n      stopListenToEvents(); // I quit!\r\n    },\r\n\r\n    on: function(eventName, callback) {\r\n      publicEvents.on(eventName, callback);\r\n      return this;\r\n    },\r\n\r\n    off: function(eventName, callback) {\r\n      publicEvents.off(eventName, callback);\r\n      return this;\r\n    }\r\n  };\r\n\r\n  /**\r\n   * Checks whether given interaction (node/scroll) is enabled\r\n   */\r\n  function isInteractive(interactionName) {\r\n    if (typeof interactive === 'string') {\r\n      return interactive.indexOf(interactionName) >= 0;\r\n    } else if (typeof interactive === 'boolean') {\r\n      return interactive;\r\n    }\r\n    return true; // default setting\r\n  }\r\n\r\n  function prepareSettings() {\r\n    container = container || window.document.body;\r\n    layout = layout || forceDirected(graph, {\r\n      springLength: 80,\r\n      springCoeff: 0.0002,\r\n    });\r\n    graphics = graphics || svgGraphics(graph, {\r\n      container: container\r\n    });\r\n\r\n    if (!settings.hasOwnProperty('renderLinks')) {\r\n      settings.renderLinks = true;\r\n    }\r\n\r\n    settings.prerender = settings.prerender || 0;\r\n    inputManager = (graphics.inputManager || domInputManager)(graph, graphics);\r\n  }\r\n\r\n  function renderGraph() {\r\n    graphics.beginRender();\r\n\r\n    // todo: move this check graphics\r\n    if (settings.renderLinks) {\r\n      graphics.renderLinks();\r\n    }\r\n    graphics.renderNodes();\r\n    graphics.endRender();\r\n  }\r\n\r\n  function onRenderFrame() {\r\n    isStable = layout.step() && !userInteraction;\r\n    renderGraph();\r\n\r\n    return !isStable;\r\n  }\r\n\r\n  function renderIterations(iterationsCount) {\r\n    if (animationTimer) {\r\n      return;\r\n    }\r\n\r\n    if (iterationsCount !== undefined) {\r\n      animationTimer = timer(function() {\r\n        iterationsCount -= 1;\r\n        if (iterationsCount < 0) {\r\n          var needMoreFrames = false;\r\n          return needMoreFrames;\r\n        }\r\n\r\n        return onRenderFrame();\r\n      }, FRAME_INTERVAL);\r\n    } else {\r\n      animationTimer = timer(onRenderFrame, FRAME_INTERVAL);\r\n    }\r\n  }\r\n\r\n  function resetStable() {\r\n    if (isPaused) {\r\n      return;\r\n    }\r\n\r\n    isStable = false;\r\n    animationTimer.restart();\r\n  }\r\n\r\n  function prerender() {\r\n    // To get good initial positions for the graph\r\n    // perform several prerender steps in background.\r\n    if (typeof settings.prerender === 'number' && settings.prerender > 0) {\r\n      for (var i = 0; i < settings.prerender; i += 1) {\r\n        layout.step();\r\n      }\r\n    }\r\n  }\r\n\r\n  function updateCenter() {\r\n    var graphRect = layout.getGraphRect(),\r\n      containerSize = getDimension(container);\r\n\r\n    var cx = (graphRect.x2 + graphRect.x1) / 2;\r\n    var cy = (graphRect.y2 + graphRect.y1) / 2;\r\n    transform.offsetX = containerSize.width / 2 - (cx * transform.scale - cx);\r\n    transform.offsetY = containerSize.height / 2 - (cy * transform.scale - cy);\r\n    graphics.graphCenterChanged(transform.offsetX, transform.offsetY);\r\n\r\n    updateCenterRequired = false;\r\n  }\r\n\r\n  function createNodeUi(node) {\r\n    var nodePosition = layout.getNodePosition(node.id);\r\n    graphics.addNode(node, nodePosition);\r\n  }\r\n\r\n  function removeNodeUi(node) {\r\n    graphics.releaseNode(node);\r\n  }\r\n\r\n  function createLinkUi(link) {\r\n    var linkPosition = layout.getLinkPosition(link.id);\r\n    graphics.addLink(link, linkPosition);\r\n  }\r\n\r\n  function removeLinkUi(link) {\r\n    graphics.releaseLink(link);\r\n  }\r\n\r\n  function listenNodeEvents(node) {\r\n    if (!isInteractive('node')) {\r\n      return;\r\n    }\r\n\r\n    var wasPinned = false;\r\n\r\n    // TODO: This may not be memory efficient. Consider reusing handlers object.\r\n    inputManager.bindDragNDrop(node, {\r\n      onStart: function() {\r\n        wasPinned = layout.isNodePinned(node);\r\n        layout.pinNode(node, true);\r\n        userInteraction = true;\r\n        resetStable();\r\n      },\r\n      onDrag: function(e, offset) {\r\n        var oldPos = layout.getNodePosition(node.id);\r\n        layout.setNodePosition(node.id,\r\n          oldPos.x + offset.x / transform.scale,\r\n          oldPos.y + offset.y / transform.scale);\r\n\r\n        userInteraction = true;\r\n\r\n        renderGraph();\r\n      },\r\n      onStop: function() {\r\n        layout.pinNode(node, wasPinned);\r\n        userInteraction = false;\r\n      }\r\n    });\r\n  }\r\n\r\n  function releaseNodeEvents(node) {\r\n    inputManager.bindDragNDrop(node, null);\r\n  }\r\n\r\n  function initDom() {\r\n    graphics.init(container);\r\n\r\n    graph.forEachNode(createNodeUi);\r\n\r\n    if (settings.renderLinks) {\r\n      graph.forEachLink(createLinkUi);\r\n    }\r\n  }\r\n\r\n  function releaseDom() {\r\n    graphics.release(container);\r\n  }\r\n\r\n  function processNodeChange(change) {\r\n    var node = change.node;\r\n\r\n    if (change.changeType === 'add') {\r\n      createNodeUi(node);\r\n      listenNodeEvents(node);\r\n      if (updateCenterRequired) {\r\n        updateCenter();\r\n      }\r\n    } else if (change.changeType === 'remove') {\r\n      releaseNodeEvents(node);\r\n      removeNodeUi(node);\r\n      if (graph.getNodesCount() === 0) {\r\n        updateCenterRequired = true; // Next time when node is added - center the graph.\r\n      }\r\n    } else if (change.changeType === 'update') {\r\n      releaseNodeEvents(node);\r\n      removeNodeUi(node);\r\n\r\n      createNodeUi(node);\r\n      listenNodeEvents(node);\r\n    }\r\n  }\r\n\r\n  function processLinkChange(change) {\r\n    var link = change.link;\r\n    if (change.changeType === 'add') {\r\n      if (settings.renderLinks) {\r\n        createLinkUi(link);\r\n      }\r\n    } else if (change.changeType === 'remove') {\r\n      if (settings.renderLinks) {\r\n        removeLinkUi(link);\r\n      }\r\n    } else if (change.changeType === 'update') {\r\n      throw 'Update type is not implemented. TODO: Implement me!';\r\n    }\r\n  }\r\n\r\n  function onGraphChanged(changes) {\r\n    var i, change;\r\n    for (i = 0; i < changes.length; i += 1) {\r\n      change = changes[i];\r\n      if (change.node) {\r\n        processNodeChange(change);\r\n      } else if (change.link) {\r\n        processLinkChange(change);\r\n      }\r\n    }\r\n\r\n    resetStable();\r\n  }\r\n\r\n  function onWindowResized() {\r\n    updateCenter();\r\n    onRenderFrame();\r\n  }\r\n\r\n  function releaseContainerDragManager() {\r\n    if (containerDrag) {\r\n      containerDrag.release();\r\n      containerDrag = null;\r\n    }\r\n  }\r\n\r\n  function releaseGraphEvents() {\r\n    graph.off('changed', onGraphChanged);\r\n  }\r\n\r\n  function scale(out, scrollPoint) {\r\n    if (!scrollPoint) {\r\n      var containerSize = getDimension(container);\r\n      scrollPoint = {\r\n        x: containerSize.width / 2,\r\n        y: containerSize.height / 2\r\n      };\r\n    }\r\n    var scaleFactor = Math.pow(1 + 0.4, out ? -0.2 : 0.2);\r\n    transform.scale = graphics.scale(scaleFactor, scrollPoint);\r\n\r\n    renderGraph();\r\n    publicEvents.fire('scale', transform.scale);\r\n\r\n    return transform.scale;\r\n  }\r\n\r\n  function listenToEvents() {\r\n    windowEvents.on('resize', onWindowResized);\r\n\r\n    releaseContainerDragManager();\r\n    if (isInteractive('drag')) {\r\n      containerDrag = dragndrop(container);\r\n      containerDrag.onDrag(function(e, offset) {\r\n        graphics.translateRel(offset.x, offset.y);\r\n\r\n        renderGraph();\r\n        publicEvents.fire('drag', offset);\r\n      });\r\n    }\r\n\r\n    if (isInteractive('scroll')) {\r\n      if (!containerDrag) {\r\n        containerDrag = dragndrop(container);\r\n      }\r\n      containerDrag.onScroll(function(e, scaleOffset, scrollPoint) {\r\n        scale(scaleOffset < 0, scrollPoint);\r\n      });\r\n    }\r\n\r\n    graph.forEachNode(listenNodeEvents);\r\n\r\n    releaseGraphEvents();\r\n    graph.on('changed', onGraphChanged);\r\n  }\r\n\r\n  function stopListenToEvents() {\r\n    rendererInitialized = false;\r\n    releaseGraphEvents();\r\n    releaseContainerDragManager();\r\n    windowEvents.off('resize', onWindowResized);\r\n    publicEvents.off();\r\n    animationTimer.stop();\r\n\r\n    graph.forEachLink(function(link) {\r\n      if (settings.renderLinks) {\r\n        removeLinkUi(link);\r\n      }\r\n    });\r\n\r\n    graph.forEachNode(function(node) {\r\n      releaseNodeEvents(node);\r\n      removeNodeUi(node);\r\n    });\r\n\r\n    layout.dispose();\r\n    releaseDom();\r\n  }\r\n}\r\n\n\n//# sourceURL=webpack:///./node_modules/vivagraphjs/src/View/renderer.js?");

/***/ }),

/***/ "./node_modules/vivagraphjs/src/View/svgGraphics.js":
/*!**********************************************************!*\
  !*** ./node_modules/vivagraphjs/src/View/svgGraphics.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("/**\r\n * @fileOverview Defines a graph renderer that uses SVG based drawings.\r\n *\r\n * @author Andrei Kashcha (aka anvaka) / https://github.com/anvaka\r\n */\r\n\r\nmodule.exports = svgGraphics;\r\n\r\nvar svg = __webpack_require__(/*! simplesvg */ \"./node_modules/simplesvg/index.js\");\r\nvar eventify = __webpack_require__(/*! ngraph.events */ \"./node_modules/ngraph.events/index.js\");\r\nvar domInputManager = __webpack_require__(/*! ../Input/domInputManager.js */ \"./node_modules/vivagraphjs/src/Input/domInputManager.js\");\r\n\r\n/**\r\n * Performs svg-based graph rendering. This module does not perform\r\n * layout, but only visualizes nodes and edges of the graph.\r\n */\r\nfunction svgGraphics() {\r\n    var svgContainer,\r\n        svgRoot,\r\n        offsetX = 0,\r\n        offsetY = 0,\r\n        initCallback,\r\n        actualScale = 1,\r\n        allNodes = {},\r\n        allLinks = {},\r\n/*jshint unused: false */\r\n        nodeBuilder = function (node) {\r\n            return svg(\"rect\")\r\n                     .attr(\"width\", 10)\r\n                     .attr(\"height\", 10)\r\n                     .attr(\"fill\", \"#00a2e8\");\r\n        },\r\n\r\n        nodePositionCallback = function (nodeUI, pos) {\r\n            // TODO: Remove magic 5. It should be half of the width or height of the node.\r\n            nodeUI.attr(\"x\", pos.x - 5)\r\n                  .attr(\"y\", pos.y - 5);\r\n        },\r\n\r\n        linkBuilder = function (link) {\r\n            return svg(\"line\").attr(\"stroke\", \"#999\");\r\n        },\r\n\r\n        linkPositionCallback = function (linkUI, fromPos, toPos) {\r\n            linkUI.attr(\"x1\", fromPos.x)\r\n                  .attr(\"y1\", fromPos.y)\r\n                  .attr(\"x2\", toPos.x)\r\n                  .attr(\"y2\", toPos.y);\r\n        },\r\n\r\n        fireRescaled = function (graphics) {\r\n            // TODO: maybe we shall copy changes?\r\n            graphics.fire(\"rescaled\");\r\n        },\r\n\r\n        cachedPos = {x : 0, y: 0},\r\n        cachedFromPos = {x : 0, y: 0},\r\n        cachedToPos = {x : 0, y: 0},\r\n\r\n        updateTransform = function () {\r\n            if (svgContainer) {\r\n                var transform = \"matrix(\" + actualScale + \", 0, 0,\" + actualScale + \",\" + offsetX + \",\" + offsetY + \")\";\r\n                svgContainer.attr(\"transform\", transform);\r\n            }\r\n        };\r\n\r\n    svgRoot = createSvgRoot();\r\n\r\n    var graphics = {\r\n        getNodeUI: function (nodeId) {\r\n            return allNodes[nodeId];\r\n        },\r\n\r\n        getLinkUI: function (linkId) {\r\n            return allLinks[linkId];\r\n        },\r\n\r\n        /**\r\n         * Sets the callback that creates node representation.\r\n         *\r\n         * @param builderCallback a callback function that accepts graph node\r\n         * as a parameter and must return an element representing this node.\r\n         *\r\n         * @returns If builderCallbackOrNode is a valid callback function, instance of this is returned;\r\n         * Otherwise undefined value is returned\r\n         */\r\n        node : function (builderCallback) {\r\n            if (typeof builderCallback !== \"function\") {\r\n                return; // todo: throw? This is not compatible with old versions\r\n            }\r\n\r\n            nodeBuilder = builderCallback;\r\n\r\n            return this;\r\n        },\r\n\r\n        /**\r\n         * Sets the callback that creates link representation\r\n         *\r\n         * @param builderCallback a callback function that accepts graph link\r\n         * as a parameter and must return an element representing this link.\r\n         *\r\n         * @returns If builderCallback is a valid callback function, instance of this is returned;\r\n         * Otherwise undefined value is returned.\r\n         */\r\n        link : function (builderCallback) {\r\n            if (typeof builderCallback !== \"function\") {\r\n                return; // todo: throw? This is not compatible with old versions\r\n            }\r\n\r\n            linkBuilder = builderCallback;\r\n            return this;\r\n        },\r\n\r\n        /**\r\n         * Allows to override default position setter for the node with a new\r\n         * function. newPlaceCallback(nodeUI, position, node) is function which\r\n         * is used by updateNodePosition().\r\n         */\r\n        placeNode : function (newPlaceCallback) {\r\n            nodePositionCallback = newPlaceCallback;\r\n            return this;\r\n        },\r\n\r\n        placeLink : function (newPlaceLinkCallback) {\r\n            linkPositionCallback = newPlaceLinkCallback;\r\n            return this;\r\n        },\r\n\r\n        /**\r\n         * Called every before renderer starts rendering.\r\n         */\r\n        beginRender : function () {},\r\n\r\n        /**\r\n         * Called every time when renderer finishes one step of rendering.\r\n         */\r\n        endRender : function () {},\r\n\r\n        /**\r\n         * Sets translate operation that should be applied to all nodes and links.\r\n         */\r\n        graphCenterChanged : function (x, y) {\r\n            offsetX = x;\r\n            offsetY = y;\r\n            updateTransform();\r\n        },\r\n\r\n        /**\r\n         * Default input manager listens to DOM events to process nodes drag-n-drop\r\n         */\r\n        inputManager : domInputManager,\r\n\r\n        translateRel : function (dx, dy) {\r\n            var p = svgRoot.createSVGPoint(),\r\n                t = svgContainer.getCTM(),\r\n                origin = svgRoot.createSVGPoint().matrixTransform(t.inverse());\r\n\r\n            p.x = dx;\r\n            p.y = dy;\r\n\r\n            p = p.matrixTransform(t.inverse());\r\n            p.x = (p.x - origin.x) * t.a;\r\n            p.y = (p.y - origin.y) * t.d;\r\n\r\n            t.e += p.x;\r\n            t.f += p.y;\r\n\r\n            var transform = \"matrix(\" + t.a + \", 0, 0,\" + t.d + \",\" + t.e + \",\" + t.f + \")\";\r\n            svgContainer.attr(\"transform\", transform);\r\n        },\r\n\r\n        scale : function (scaleFactor, scrollPoint) {\r\n            var p = svgRoot.createSVGPoint();\r\n            p.x = scrollPoint.x;\r\n            p.y = scrollPoint.y;\r\n\r\n            p = p.matrixTransform(svgContainer.getCTM().inverse()); // translate to SVG coordinates\r\n\r\n            // Compute new scale matrix in current mouse position\r\n            var k = svgRoot.createSVGMatrix().translate(p.x, p.y).scale(scaleFactor).translate(-p.x, -p.y),\r\n                t = svgContainer.getCTM().multiply(k);\r\n\r\n            actualScale = t.a;\r\n            offsetX = t.e;\r\n            offsetY = t.f;\r\n            var transform = \"matrix(\" + t.a + \", 0, 0,\" + t.d + \",\" + t.e + \",\" + t.f + \")\";\r\n            svgContainer.attr(\"transform\", transform);\r\n\r\n            fireRescaled(this);\r\n            return actualScale;\r\n        },\r\n\r\n        resetScale : function () {\r\n            actualScale = 1;\r\n            var transform = \"matrix(1, 0, 0, 1, 0, 0)\";\r\n            svgContainer.attr(\"transform\", transform);\r\n            fireRescaled(this);\r\n            return this;\r\n        },\r\n\r\n       /**\r\n        * Called by Viva.Graph.View.renderer to let concrete graphic output\r\n        * provider prepare to render.\r\n        */\r\n        init : function (container) {\r\n            container.appendChild(svgRoot);\r\n            updateTransform();\r\n            // Notify the world if someone waited for update. TODO: should send an event\r\n            if (typeof initCallback === \"function\") {\r\n                initCallback(svgRoot);\r\n            }\r\n        },\r\n\r\n       /**\r\n        * Called by Viva.Graph.View.renderer to let concrete graphic output\r\n        * provider release occupied resources.\r\n        */\r\n        release : function (container) {\r\n            if (svgRoot && container) {\r\n                container.removeChild(svgRoot);\r\n            }\r\n        },\r\n\r\n        /**\r\n         * Called by Viva.Graph.View.renderer to let concrete graphic output\r\n         * provider prepare to render given link of the graph\r\n         *\r\n         * @param link - model of a link\r\n         */\r\n        addLink: function (link, pos) {\r\n            var linkUI = linkBuilder(link);\r\n            if (!linkUI) { return; }\r\n            linkUI.position = pos;\r\n            linkUI.link = link;\r\n            allLinks[link.id] = linkUI;\r\n            if (svgContainer.childElementCount > 0) {\r\n                svgContainer.insertBefore(linkUI, svgContainer.firstChild);\r\n            } else {\r\n                svgContainer.appendChild(linkUI);\r\n            }\r\n            return linkUI;\r\n        },\r\n\r\n       /**\r\n        * Called by Viva.Graph.View.renderer to let concrete graphic output\r\n        * provider remove link from rendering surface.\r\n        *\r\n        * @param linkUI visual representation of the link created by link() execution.\r\n        **/\r\n        releaseLink : function (link) {\r\n            var linkUI = allLinks[link.id];\r\n            if (linkUI) {\r\n                svgContainer.removeChild(linkUI);\r\n                delete allLinks[link.id];\r\n            }\r\n        },\r\n\r\n       /**\r\n        * Called by Viva.Graph.View.renderer to let concrete graphic output\r\n        * provider prepare to render given node of the graph.\r\n        *\r\n        * @param nodeUI visual representation of the node created by node() execution.\r\n        **/\r\n        addNode : function (node, pos) {\r\n            var nodeUI = nodeBuilder(node);\r\n            if (!nodeUI) {\r\n                return;\r\n            }\r\n            nodeUI.position = pos;\r\n            nodeUI.node = node;\r\n            allNodes[node.id] = nodeUI;\r\n\r\n            svgContainer.appendChild(nodeUI);\r\n\r\n            return nodeUI;\r\n        },\r\n\r\n       /**\r\n        * Called by Viva.Graph.View.renderer to let concrete graphic output\r\n        * provider remove node from rendering surface.\r\n        *\r\n        * @param node graph's node\r\n        **/\r\n        releaseNode : function (node) {\r\n            var nodeUI = allNodes[node.id];\r\n            if (nodeUI) {\r\n                svgContainer.removeChild(nodeUI);\r\n                delete allNodes[node.id];\r\n            }\r\n        },\r\n\r\n        renderNodes : function () {\r\n            for (var key in allNodes) {\r\n                if (allNodes.hasOwnProperty(key)) {\r\n                    var nodeUI = allNodes[key];\r\n                    cachedPos.x = nodeUI.position.x;\r\n                    cachedPos.y = nodeUI.position.y;\r\n                    nodePositionCallback(nodeUI, cachedPos, nodeUI.node);\r\n                }\r\n            }\r\n        },\r\n\r\n        renderLinks : function () {\r\n            for (var key in allLinks) {\r\n                if (allLinks.hasOwnProperty(key)) {\r\n                    var linkUI = allLinks[key];\r\n                    cachedFromPos.x = linkUI.position.from.x;\r\n                    cachedFromPos.y = linkUI.position.from.y;\r\n                    cachedToPos.x = linkUI.position.to.x;\r\n                    cachedToPos.y = linkUI.position.to.y;\r\n                    linkPositionCallback(linkUI, cachedFromPos, cachedToPos, linkUI.link);\r\n                }\r\n            }\r\n        },\r\n\r\n        /**\r\n         * Returns root element which hosts graphics.\r\n         */\r\n        getGraphicsRoot : function (callbackWhenReady) {\r\n            // todo: should fire an event, instead of having this context.\r\n            if (typeof callbackWhenReady === \"function\") {\r\n                if (svgRoot) {\r\n                    callbackWhenReady(svgRoot);\r\n                } else {\r\n                    initCallback = callbackWhenReady;\r\n                }\r\n            }\r\n            return svgRoot;\r\n        },\r\n        /**\r\n         * Returns root SVG element.\r\n         *\r\n         * Note: This is internal method specific to this renderer\r\n         */\r\n        getSvgRoot : function () {\r\n            return svgRoot;\r\n        }\r\n    };\r\n\r\n\r\n    // Let graphics fire events before we return it to the caller.\r\n    eventify(graphics);\r\n\r\n    return graphics;\r\n\r\n    function createSvgRoot() {\r\n        var svgRoot = svg(\"svg\");\r\n\r\n        svgContainer = svg(\"g\")\r\n              .attr(\"buffered-rendering\", \"dynamic\");\r\n\r\n        svgRoot.appendChild(svgContainer);\r\n        return svgRoot;\r\n    }\r\n}\r\n\n\n//# sourceURL=webpack:///./node_modules/vivagraphjs/src/View/svgGraphics.js?");

/***/ }),

/***/ "./node_modules/vivagraphjs/src/View/webglGraphics.js":
/*!************************************************************!*\
  !*** ./node_modules/vivagraphjs/src/View/webglGraphics.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("/**\r\n * @fileOverview Defines a graph renderer that uses WebGL based drawings.\r\n *\r\n * @author Andrei Kashcha (aka anvaka) / https://github.com/anvaka\r\n */\r\n\r\nmodule.exports = webglGraphics;\r\n\r\nvar webglInputManager = __webpack_require__(/*! ../Input/webglInputManager.js */ \"./node_modules/vivagraphjs/src/Input/webglInputManager.js\");\r\nvar webglLinkProgram = __webpack_require__(/*! ../WebGL/webglLinkProgram.js */ \"./node_modules/vivagraphjs/src/WebGL/webglLinkProgram.js\");\r\nvar webglNodeProgram = __webpack_require__(/*! ../WebGL/webglNodeProgram.js */ \"./node_modules/vivagraphjs/src/WebGL/webglNodeProgram.js\");\r\nvar webglSquare = __webpack_require__(/*! ../WebGL/webglSquare.js */ \"./node_modules/vivagraphjs/src/WebGL/webglSquare.js\");\r\nvar webglLine = __webpack_require__(/*! ../WebGL/webglLine.js */ \"./node_modules/vivagraphjs/src/WebGL/webglLine.js\");\r\nvar eventify = __webpack_require__(/*! ngraph.events */ \"./node_modules/ngraph.events/index.js\");\r\nvar merge = __webpack_require__(/*! ngraph.merge */ \"./node_modules/ngraph.merge/index.js\");\r\n\r\n/**\r\n * Performs webgl-based graph rendering. This module does not perform\r\n * layout, but only visualizes nodes and edges of the graph.\r\n *\r\n * @param options - to customize graphics  behavior. Currently supported parameter\r\n *  enableBlending - true by default, allows to use transparency in node/links colors.\r\n *  preserveDrawingBuffer - false by default, tells webgl to preserve drawing buffer.\r\n *                    See https://www.khronos.org/registry/webgl/specs/1.0/#5.2\r\n */\r\n\r\nfunction webglGraphics(options) {\r\n    options = merge(options, {\r\n        enableBlending : true,\r\n        preserveDrawingBuffer : false,\r\n        clearColor: false,\r\n        clearColorValue : {\r\n            r : 1,\r\n            g : 1,\r\n            b : 1,\r\n            a : 1\r\n        }\r\n    });\r\n\r\n    var container,\r\n        graphicsRoot,\r\n        gl,\r\n        width,\r\n        height,\r\n        nodesCount = 0,\r\n        linksCount = 0,\r\n        transform = [\r\n            1, 0, 0, 0,\r\n            0, 1, 0, 0,\r\n            0, 0, 1, 0,\r\n            0, 0, 0, 1\r\n        ],\r\n        userPlaceNodeCallback,\r\n        userPlaceLinkCallback,\r\n        nodes = [],\r\n        links = [],\r\n        initCallback,\r\n\r\n        allNodes = {},\r\n        allLinks = {},\r\n        linkProgram = webglLinkProgram(),\r\n        nodeProgram = webglNodeProgram(),\r\n/*jshint unused: false */\r\n        nodeUIBuilder = function (node) {\r\n            return webglSquare(); // Just make a square, using provided gl context (a nodeProgram);\r\n        },\r\n\r\n        linkUIBuilder = function (link) {\r\n            return webglLine(0xb3b3b3ff);\r\n        },\r\n/*jshint unused: true */\r\n        updateTransformUniform = function () {\r\n            linkProgram.updateTransform(transform);\r\n            nodeProgram.updateTransform(transform);\r\n        },\r\n\r\n        resetScaleInternal = function () {\r\n            transform = [1, 0, 0, 0,\r\n                        0, 1, 0, 0,\r\n                        0, 0, 1, 0,\r\n                        0, 0, 0, 1];\r\n        },\r\n\r\n        updateSize = function () {\r\n            if (container && graphicsRoot) {\r\n                width = graphicsRoot.width = Math.max(container.offsetWidth, 1);\r\n                height = graphicsRoot.height = Math.max(container.offsetHeight, 1);\r\n                if (gl) { gl.viewport(0, 0, width, height); }\r\n                if (linkProgram) { linkProgram.updateSize(width / 2, height / 2); }\r\n                if (nodeProgram) { nodeProgram.updateSize(width / 2, height / 2); }\r\n            }\r\n        },\r\n\r\n        fireRescaled = function (graphics) {\r\n            graphics.fire(\"rescaled\");\r\n        };\r\n\r\n    graphicsRoot = window.document.createElement(\"canvas\");\r\n\r\n    var graphics = {\r\n        getLinkUI: function (linkId) {\r\n            return allLinks[linkId];\r\n        },\r\n\r\n        getNodeUI: function (nodeId) {\r\n            return allNodes[nodeId];\r\n        },\r\n\r\n        /**\r\n         * Sets the callback that creates node representation.\r\n         *\r\n         * @param builderCallback a callback function that accepts graph node\r\n         * as a parameter and must return an element representing this node.\r\n         *\r\n         * @returns If builderCallbackOrNode is a valid callback function, instance of this is returned;\r\n         * Otherwise undefined value is returned\r\n         */\r\n        node : function (builderCallback) {\r\n            if (typeof builderCallback !== \"function\") {\r\n                return; // todo: throw? This is not compatible with old versions\r\n            }\r\n\r\n            nodeUIBuilder = builderCallback;\r\n\r\n            return this;\r\n        },\r\n\r\n        /**\r\n         * Sets the callback that creates link representation\r\n         *\r\n         * @param builderCallback a callback function that accepts graph link\r\n         * as a parameter and must return an element representing this link.\r\n         *\r\n         * @returns If builderCallback is a valid callback function, instance of this is returned;\r\n         * Otherwise undefined value is returned.\r\n         */\r\n        link : function (builderCallback) {\r\n            if (typeof builderCallback !== \"function\") {\r\n                return; // todo: throw? This is not compatible with old versions\r\n            }\r\n\r\n            linkUIBuilder = builderCallback;\r\n            return this;\r\n        },\r\n\r\n\r\n        /**\r\n         * Allows to override default position setter for the node with a new\r\n         * function. newPlaceCallback(nodeUI, position) is function which\r\n         * is used by updateNodePosition().\r\n         */\r\n        placeNode : function (newPlaceCallback) {\r\n            userPlaceNodeCallback = newPlaceCallback;\r\n            return this;\r\n        },\r\n\r\n        placeLink : function (newPlaceLinkCallback) {\r\n            userPlaceLinkCallback = newPlaceLinkCallback;\r\n            return this;\r\n        },\r\n\r\n        /**\r\n         * Custom input manager listens to mouse events to process nodes drag-n-drop inside WebGL canvas\r\n         */\r\n        inputManager : webglInputManager,\r\n\r\n        /**\r\n         * Called every time before renderer starts rendering.\r\n         */\r\n        beginRender : function () {\r\n            // this function could be replaced by this.init,\r\n            // based on user options.\r\n        },\r\n\r\n        /**\r\n         * Called every time when renderer finishes one step of rendering.\r\n         */\r\n        endRender : function () {\r\n            if (linksCount > 0) {\r\n                linkProgram.render();\r\n            }\r\n            if (nodesCount > 0) {\r\n                nodeProgram.render();\r\n            }\r\n        },\r\n\r\n        bringLinkToFront : function (linkUI) {\r\n            var frontLinkId = linkProgram.getFrontLinkId(),\r\n                srcLinkId,\r\n                temp;\r\n\r\n            linkProgram.bringToFront(linkUI);\r\n\r\n            if (frontLinkId > linkUI.id) {\r\n                srcLinkId = linkUI.id;\r\n\r\n                temp = links[frontLinkId];\r\n                links[frontLinkId] = links[srcLinkId];\r\n                links[frontLinkId].id = frontLinkId;\r\n                links[srcLinkId] = temp;\r\n                links[srcLinkId].id = srcLinkId;\r\n            }\r\n        },\r\n\r\n        /**\r\n         * Sets translate operation that should be applied to all nodes and links.\r\n         */\r\n        graphCenterChanged : function (x, y) {\r\n            transform[12] = (2 * x / width) - 1;\r\n            transform[13] = 1 - (2 * y / height);\r\n            updateTransformUniform();\r\n        },\r\n\r\n        /**\r\n         * Called by Viva.Graph.View.renderer to let concrete graphic output\r\n         * provider prepare to render given link of the graph\r\n         *\r\n         * @param link - model of a link\r\n         */\r\n        addLink: function (link, boundPosition) {\r\n            var uiid = linksCount++,\r\n                ui = linkUIBuilder(link);\r\n            ui.id = uiid;\r\n            ui.pos = boundPosition;\r\n\r\n            linkProgram.createLink(ui);\r\n\r\n            links[uiid] = ui;\r\n            allLinks[link.id] = ui;\r\n            return ui;\r\n        },\r\n\r\n       /**\r\n        * Called by Viva.Graph.View.renderer to let concrete graphic output\r\n        * provider prepare to render given node of the graph.\r\n        *\r\n        * @param nodeUI visual representation of the node created by node() execution.\r\n        **/\r\n        addNode : function (node, boundPosition) {\r\n            var uiid = nodesCount++,\r\n                ui = nodeUIBuilder(node);\r\n\r\n            ui.id = uiid;\r\n            ui.position = boundPosition;\r\n            ui.node = node;\r\n\r\n            nodeProgram.createNode(ui);\r\n\r\n            nodes[uiid] = ui;\r\n            allNodes[node.id] = ui;\r\n            return ui;\r\n        },\r\n\r\n        translateRel : function (dx, dy) {\r\n            transform[12] += (2 * transform[0] * dx / width) / transform[0];\r\n            transform[13] -= (2 * transform[5] * dy / height) / transform[5];\r\n            updateTransformUniform();\r\n        },\r\n\r\n        scale : function (scaleFactor, scrollPoint) {\r\n            // Transform scroll point to clip-space coordinates:\r\n            var cx = 2 * scrollPoint.x / width - 1,\r\n                cy = 1 - (2 * scrollPoint.y) / height;\r\n\r\n            cx -= transform[12];\r\n            cy -= transform[13];\r\n\r\n            transform[12] += cx * (1 - scaleFactor);\r\n            transform[13] += cy * (1 - scaleFactor);\r\n\r\n            transform[0] *= scaleFactor;\r\n            transform[5] *= scaleFactor;\r\n\r\n            updateTransformUniform();\r\n            fireRescaled(this);\r\n\r\n            return transform[0];\r\n        },\r\n\r\n        resetScale : function () {\r\n            resetScaleInternal();\r\n\r\n            if (gl) {\r\n                updateSize();\r\n                // TODO: what is this?\r\n                // gl.useProgram(linksProgram);\r\n                // gl.uniform2f(linksProgram.screenSize, width, height);\r\n                updateTransformUniform();\r\n            }\r\n            return this;\r\n        },\r\n\r\n       /**\r\n        * Resizes the graphic without resetting the scale. \r\n        * Useful with viva graph in a dynamic container\r\n        */\r\n        updateSize: updateSize,\r\n\r\n       /**\r\n        * Called by Viva.Graph.View.renderer to let concrete graphic output\r\n        * provider prepare to render.\r\n        */\r\n        init : function (c) {\r\n            var contextParameters = {};\r\n\r\n            if (options.preserveDrawingBuffer) {\r\n                contextParameters.preserveDrawingBuffer = true;\r\n            }\r\n\r\n            container = c;\r\n\r\n            updateSize();\r\n            resetScaleInternal();\r\n            container.appendChild(graphicsRoot);\r\n\r\n\r\n            gl = graphicsRoot.getContext(\"experimental-webgl\", contextParameters);\r\n            if (!gl) {\r\n                var msg = \"Could not initialize WebGL. Seems like the browser doesn't support it.\";\r\n                window.alert(msg);\r\n                throw msg;\r\n            }\r\n            if (options.enableBlending) {\r\n                gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);\r\n                gl.enable(gl.BLEND);\r\n            }\r\n            if (options.clearColor) {\r\n                var color = options.clearColorValue;\r\n                gl.clearColor(color.r, color.g, color.b, color.a);\r\n                // TODO: not the best way, really. Should come up with something better\r\n                // what if we need more updates inside beginRender, like depth buffer?\r\n                this.beginRender = function () {\r\n                    gl.clear(gl.COLOR_BUFFER_BIT);\r\n                };\r\n            }\r\n\r\n            linkProgram.load(gl);\r\n            linkProgram.updateSize(width / 2, height / 2);\r\n\r\n            nodeProgram.load(gl);\r\n            nodeProgram.updateSize(width / 2, height / 2);\r\n\r\n            updateTransformUniform();\r\n\r\n            // Notify the world if someone waited for update. TODO: should send an event\r\n            if (typeof initCallback === \"function\") {\r\n                initCallback(graphicsRoot);\r\n            }\r\n        },\r\n\r\n        /**\r\n        * Called by Viva.Graph.View.renderer to let concrete graphic output\r\n        * provider release occupied resources.\r\n        */\r\n        release : function (container) {\r\n            if (graphicsRoot && container) {\r\n                container.removeChild(graphicsRoot);\r\n                // TODO: anything else?\r\n            }\r\n        },\r\n\r\n       /**\r\n        * Checks whether webgl is supported by this browser.\r\n        */\r\n        isSupported : function () {\r\n            var c = window.document.createElement(\"canvas\"),\r\n                gl = c && c.getContext && c.getContext(\"experimental-webgl\");\r\n            return gl;\r\n        },\r\n\r\n       /**\r\n        * Called by Viva.Graph.View.renderer to let concrete graphic output\r\n        * provider remove link from rendering surface.\r\n        *\r\n        * @param linkUI visual representation of the link created by link() execution.\r\n        **/\r\n        releaseLink : function (link) {\r\n            if (linksCount > 0) { linksCount -= 1; }\r\n            var linkUI = allLinks[link.id];\r\n            delete allLinks[link.id];\r\n\r\n            linkProgram.removeLink(linkUI);\r\n\r\n            var linkIdToRemove = linkUI.id;\r\n            if (linkIdToRemove < linksCount) {\r\n                if (linksCount === 0 || linksCount === linkIdToRemove) {\r\n                    return; // no more links or removed link is the last one.\r\n                }\r\n\r\n                var lastLinkUI = links[linksCount];\r\n                links[linkIdToRemove] = lastLinkUI;\r\n                lastLinkUI.id = linkIdToRemove;\r\n            }\r\n        },\r\n\r\n       /**\r\n        * Called by Viva.Graph.View.renderer to let concrete graphic output\r\n        * provider remove node from rendering surface.\r\n        *\r\n        * @param nodeUI visual representation of the node created by node() execution.\r\n        **/\r\n        releaseNode : function (node) {\r\n            if (nodesCount > 0) { nodesCount -= 1; }\r\n            var nodeUI = allNodes[node.id];\r\n            delete allNodes[node.id];\r\n\r\n            nodeProgram.removeNode(nodeUI);\r\n\r\n            var nodeIdToRemove = nodeUI.id;\r\n            if (nodeIdToRemove < nodesCount) {\r\n                if (nodesCount === 0 || nodesCount === nodeIdToRemove) {\r\n                    return; // no more nodes or removed node is the last in the list.\r\n                }\r\n\r\n                var lastNodeUI = nodes[nodesCount];\r\n\r\n                nodes[nodeIdToRemove] = lastNodeUI;\r\n                lastNodeUI.id = nodeIdToRemove;\r\n\r\n                // Since concrete shaders may cache properties in the UI element\r\n                // we are letting them to make this swap (e.g. image node shader\r\n                // uses this approach to update node's offset in the atlas)\r\n                nodeProgram.replaceProperties(nodeUI, lastNodeUI);\r\n            }\r\n        },\r\n\r\n        renderNodes: function () {\r\n            var pos = {x : 0, y : 0};\r\n            // WebGL coordinate system is different. Would be better\r\n            // to have this transform in the shader code, but it would\r\n            // require every shader to be updated..\r\n            for (var i = 0; i < nodesCount; ++i) {\r\n                var ui = nodes[i];\r\n                pos.x = ui.position.x;\r\n                pos.y = ui.position.y;\r\n                if (userPlaceNodeCallback) {\r\n                    userPlaceNodeCallback(ui, pos);\r\n                }\r\n\r\n                nodeProgram.position(ui, pos);\r\n            }\r\n        },\r\n\r\n        renderLinks: function () {\r\n            if (this.omitLinksRendering) { return; }\r\n\r\n            var toPos = {x : 0, y : 0};\r\n            var fromPos = {x : 0, y : 0};\r\n            for (var i = 0; i < linksCount; ++i) {\r\n                var ui = links[i];\r\n                var pos = ui.pos.from;\r\n                fromPos.x = pos.x;\r\n                fromPos.y = -pos.y;\r\n                pos = ui.pos.to;\r\n                toPos.x = pos.x;\r\n                toPos.y = -pos.y;\r\n                if (userPlaceLinkCallback) {\r\n                    userPlaceLinkCallback(ui, fromPos, toPos);\r\n                }\r\n\r\n                linkProgram.position(ui, fromPos, toPos);\r\n            }\r\n        },\r\n\r\n        /**\r\n         * Returns root element which hosts graphics.\r\n         */\r\n        getGraphicsRoot : function (callbackWhenReady) {\r\n            // todo: should fire an event, instead of having this context.\r\n            if (typeof callbackWhenReady === \"function\") {\r\n                if (graphicsRoot) {\r\n                    callbackWhenReady(graphicsRoot);\r\n                } else {\r\n                    initCallback = callbackWhenReady;\r\n                }\r\n            }\r\n            return graphicsRoot;\r\n        },\r\n\r\n        /**\r\n         * Updates default shader which renders nodes\r\n         *\r\n         * @param newProgram to use for nodes.\r\n         */\r\n        setNodeProgram : function (newProgram) {\r\n            if (!gl && newProgram) {\r\n                // Nothing created yet. Just set shader to the new one\r\n                // and let initialization logic take care about the rest.\r\n                nodeProgram = newProgram;\r\n            } else if (newProgram) {\r\n                throw \"Not implemented. Cannot swap shader on the fly... Yet.\";\r\n                // TODO: unload old shader and reinit.\r\n            }\r\n        },\r\n\r\n        /**\r\n         * Updates default shader which renders links\r\n         *\r\n         * @param newProgram to use for links.\r\n         */\r\n        setLinkProgram : function (newProgram) {\r\n            if (!gl && newProgram) {\r\n                // Nothing created yet. Just set shader to the new one\r\n                // and let initialization logic take care about the rest.\r\n                linkProgram = newProgram;\r\n            } else if (newProgram) {\r\n                throw \"Not implemented. Cannot swap shader on the fly... Yet.\";\r\n                // TODO: unload old shader and reinit.\r\n            }\r\n        },\r\n\r\n        /**\r\n         * Transforms client coordinates into layout coordinates. Client coordinates\r\n         * are DOM coordinates relative to the rendering container. Layout\r\n         * coordinates are those assigned by by layout algorithm to each node.\r\n         *\r\n         * @param {Object} p - a point object with `x` and `y` attributes.\r\n         * This method mutates p.\r\n         */\r\n        transformClientToGraphCoordinates: function (p) {\r\n          // TODO: could be a problem when container has margins?\r\n            // normalize\r\n            p.x = ((2 * p.x) / width) - 1;\r\n            p.y = 1 - ((2 * p.y) / height);\r\n\r\n            // apply transform\r\n            p.x = (p.x - transform[12]) / transform[0];\r\n            p.y = (p.y - transform[13]) / transform[5];\r\n\r\n            // transform to graph coordinates\r\n            p.x = p.x * (width / 2);\r\n            p.y = p.y * (-height / 2);\r\n\r\n            return p;\r\n        },\r\n\r\n        /**\r\n         * Transforms WebGL coordinates into client coordinates. Reverse of \r\n         * `transformClientToGraphCoordinates()`\r\n         *\r\n         * @param {Object} p - a point object with `x` and `y` attributes, which\r\n         * represents a layout coordinate. This method mutates p.\r\n         */\r\n        transformGraphToClientCoordinates: function (p) {\r\n          // TODO: could be a problem when container has margins?\r\n            // transform from graph coordinates\r\n            p.x = p.x / (width / 2);\r\n            p.y = p.y / (-height / 2);\r\n\r\n            // apply transform\r\n            p.x = (p.x * transform[0]) + transform[12];\r\n            p.y = (p.y * transform[5]) + transform[13];\r\n\r\n            // denormalize\r\n            p.x = ((p.x + 1) * width) / 2;\r\n            p.y = ((1 - p.y) * height) / 2;\r\n\r\n            return p;\r\n        },\r\n\r\n        getNodeAtClientPos: function (clientPos, preciseCheck) {\r\n            if (typeof preciseCheck !== \"function\") {\r\n                // we don't know anything about your node structure here :(\r\n                // potentially this could be delegated to node program, but for\r\n                // right now, we are giving up if you don't pass boundary check\r\n                // callback. It answers to a question is nodeUI covers  (x, y)\r\n                return null;\r\n            }\r\n            // first transform to graph coordinates:\r\n            this.transformClientToGraphCoordinates(clientPos);\r\n            // now using precise check iterate over each node and find one within box:\r\n            // TODO: This is poor O(N) performance.\r\n            for (var i = 0; i < nodesCount; ++i) {\r\n                if (preciseCheck(nodes[i], clientPos.x, clientPos.y)) {\r\n                    return nodes[i].node;\r\n                }\r\n            }\r\n            return null;\r\n        }\r\n    };\r\n\r\n    // Let graphics fire events before we return it to the caller.\r\n    eventify(graphics);\r\n\r\n    return graphics;\r\n}\r\n\n\n//# sourceURL=webpack:///./node_modules/vivagraphjs/src/View/webglGraphics.js?");

/***/ }),

/***/ "./node_modules/vivagraphjs/src/WebGL/parseColor.js":
/*!**********************************************************!*\
  !*** ./node_modules/vivagraphjs/src/WebGL/parseColor.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = parseColor;\n\nfunction parseColor(color) {\n  var parsedColor = 0x009ee8ff;\n\n  if (typeof color === 'string' && color) {\n    if (color.length === 4) { // #rgb\n      color = color.replace(/([^#])/g, '$1$1'); // duplicate each letter except first #.\n    }\n    if (color.length === 9) { // #rrggbbaa\n      parsedColor = parseInt(color.substr(1), 16);\n    } else if (color.length === 7) { // or #rrggbb.\n      parsedColor = (parseInt(color.substr(1), 16) << 8) | 0xff;\n    } else {\n      throw 'Color expected in hex format with preceding \"#\". E.g. #00ff00. Got value: ' + color;\n    }\n  } else if (typeof color === 'number') {\n    parsedColor = color;\n  }\n\n  return parsedColor;\n}\n\n\n//# sourceURL=webpack:///./node_modules/vivagraphjs/src/WebGL/parseColor.js?");

/***/ }),

/***/ "./node_modules/vivagraphjs/src/WebGL/texture.js":
/*!*******************************************************!*\
  !*** ./node_modules/vivagraphjs/src/WebGL/texture.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = Texture;\n\n/**\n * Single texture in the webglAtlas.\n */\nfunction Texture(size) {\n  this.canvas = window.document.createElement(\"canvas\");\n  this.ctx = this.canvas.getContext(\"2d\");\n  this.isDirty = false;\n  this.canvas.width = this.canvas.height = size;\n}\n\n\n//# sourceURL=webpack:///./node_modules/vivagraphjs/src/WebGL/texture.js?");

/***/ }),

/***/ "./node_modules/vivagraphjs/src/WebGL/webgl.js":
/*!*****************************************************!*\
  !*** ./node_modules/vivagraphjs/src/WebGL/webgl.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("/**\n * @fileOverview Utility functions for webgl rendering.\n *\n * @author Andrei Kashcha (aka anvaka) / https://github.com/anvaka\n */\n\nmodule.exports = webgl;\n\nfunction webgl(gl) {\n\n  return {\n    createProgram: createProgram,\n    extendArray: extendArray,\n    copyArrayPart: copyArrayPart,\n    swapArrayPart: swapArrayPart,\n    getLocations: getLocations,\n    context: gl\n  };\n\n  function createShader(shaderText, type) {\n    var shader = gl.createShader(type);\n    gl.shaderSource(shader, shaderText);\n    gl.compileShader(shader);\n\n    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {\n      var msg = gl.getShaderInfoLog(shader);\n      window.alert(msg);\n      throw msg;\n    }\n\n    return shader;\n  }\n\n  function createProgram(vertexShaderSrc, fragmentShaderSrc) {\n    var program = gl.createProgram();\n    var vs = createShader(vertexShaderSrc, gl.VERTEX_SHADER);\n    var fs = createShader(fragmentShaderSrc, gl.FRAGMENT_SHADER);\n\n    gl.attachShader(program, vs);\n    gl.attachShader(program, fs);\n    gl.linkProgram(program);\n\n    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {\n      var msg = gl.getShaderInfoLog(program);\n      window.alert(msg);\n      throw msg;\n    }\n\n    return program;\n  }\n\n  function extendArray(buffer, itemsInBuffer, elementsPerItem) {\n    if ((itemsInBuffer + 1) * elementsPerItem > buffer.length) {\n      // Every time we run out of space create new array twice bigger.\n      // TODO: it seems buffer size is limited. Consider using multiple arrays for huge graphs\n      var extendedArray = new Float32Array(buffer.length * elementsPerItem * 2);\n      extendedArray.set(buffer);\n\n      return extendedArray;\n    }\n\n    return buffer;\n  }\n\n  function getLocations(program, uniformOrAttributeNames) {\n    var foundLocations = {};\n    for (var i = 0; i < uniformOrAttributeNames.length; ++i) {\n      var name = uniformOrAttributeNames[i];\n      var location = -1;\n      if (name[0] === 'a' && name[1] === '_') {\n        location = gl.getAttribLocation(program, name);\n        if (location === -1) {\n          throw new Error(\"Program doesn't have required attribute: \" + name);\n        }\n\n        foundLocations[name.slice(2)] = location;\n      } else if (name[0] === 'u' && name[1] === '_') {\n        location = gl.getUniformLocation(program, name);\n        if (location === null) {\n          throw new Error(\"Program doesn't have required uniform: \" + name);\n        }\n\n        foundLocations[name.slice(2)] = location;\n      } else {\n        throw new Error(\"Couldn't figure out your intent. All uniforms should start with 'u_' prefix, and attributes with 'a_'\");\n      }\n    }\n\n    return foundLocations;\n  }\n}\n\nfunction copyArrayPart(array, to, from, elementsCount) {\n  for (var i = 0; i < elementsCount; ++i) {\n    array[to + i] = array[from + i];\n  }\n}\n\nfunction swapArrayPart(array, from, to, elementsCount) {\n  for (var i = 0; i < elementsCount; ++i) {\n    var tmp = array[from + i];\n    array[from + i] = array[to + i];\n    array[to + i] = tmp;\n  }\n}\n\n\n//# sourceURL=webpack:///./node_modules/vivagraphjs/src/WebGL/webgl.js?");

/***/ }),

/***/ "./node_modules/vivagraphjs/src/WebGL/webglAtlas.js":
/*!**********************************************************!*\
  !*** ./node_modules/vivagraphjs/src/WebGL/webglAtlas.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var Texture = __webpack_require__(/*! ./texture.js */ \"./node_modules/vivagraphjs/src/WebGL/texture.js\");\n\nmodule.exports = webglAtlas;\n\n/**\n * My naive implementation of textures atlas. It allows clients to load\n * multiple images into atlas and get canvas representing all of them.\n *\n * @param tilesPerTexture - indicates how many images can be loaded to one\n *          texture of the atlas. If number of loaded images exceeds this\n *          parameter a new canvas will be created.\n */\nfunction webglAtlas(tilesPerTexture) {\n  var tilesPerRow = Math.sqrt(tilesPerTexture || 1024) << 0,\n    tileSize = tilesPerRow,\n    lastLoadedIdx = 1,\n    loadedImages = {},\n    dirtyTimeoutId,\n    skipedDirty = 0,\n    textures = [],\n    trackedUrls = [];\n\n  if (!isPowerOf2(tilesPerTexture)) {\n    throw \"Tiles per texture should be power of two.\";\n  }\n\n  // this is the return object\n  var api = {\n    /**\n     * indicates whether atlas has changed texture in it. If true then\n     * some of the textures has isDirty flag set as well.\n     */\n    isDirty: false,\n\n    /**\n     * Clears any signs of atlas changes.\n     */\n    clearDirty: clearDirty,\n\n    /**\n     * Removes given url from collection of tiles in the atlas.\n     */\n    remove: remove,\n\n    /**\n     * Gets all textures in the atlas.\n     */\n    getTextures: getTextures,\n\n    /**\n     * Gets coordinates of the given image in the atlas. Coordinates is an object:\n     * {offset : int } - where offset is an absolute position of the image in the\n     * atlas.\n     *\n     * Absolute means it can be larger than tilesPerTexture parameter, and in that\n     * case clients should get next texture in getTextures() collection.\n     */\n    getCoordinates: getCoordinates,\n\n    /**\n     * Asynchronously Loads the image to the atlas. Cross-domain security\n     * limitation applies.\n     */\n    load: load\n  };\n\n  return api;\n\n  function clearDirty() {\n    var i;\n    api.isDirty = false;\n    for (i = 0; i < textures.length; ++i) {\n      textures[i].isDirty = false;\n    }\n  }\n\n  function remove(imgUrl) {\n    var coordinates = loadedImages[imgUrl];\n    if (!coordinates) {\n      return false;\n    }\n    delete loadedImages[imgUrl];\n    lastLoadedIdx -= 1;\n\n\n    if (lastLoadedIdx === coordinates.offset) {\n      return true; // Ignore if it's last image in the whole set.\n    }\n\n    var tileToRemove = getTileCoordinates(coordinates.offset),\n      lastTileInSet = getTileCoordinates(lastLoadedIdx);\n\n    copy(lastTileInSet, tileToRemove);\n\n    var replacedOffset = loadedImages[trackedUrls[lastLoadedIdx]];\n    replacedOffset.offset = coordinates.offset;\n    trackedUrls[coordinates.offset] = trackedUrls[lastLoadedIdx];\n\n    markDirty();\n    return true;\n  }\n\n  function getTextures() {\n    return textures; // I trust you...\n  }\n\n  function getCoordinates(imgUrl) {\n    return loadedImages[imgUrl];\n  }\n\n  function load(imgUrl, callback) {\n    if (loadedImages.hasOwnProperty(imgUrl)) {\n      callback(loadedImages[imgUrl]);\n    } else {\n      var img = new window.Image(),\n        imgId = lastLoadedIdx;\n\n      lastLoadedIdx += 1;\n      img.crossOrigin = \"anonymous\";\n      img.onload = function() {\n        markDirty();\n        drawAt(imgId, img, callback);\n      };\n\n      img.src = imgUrl;\n    }\n  }\n\n  function createTexture() {\n    var texture = new Texture(tilesPerRow * tileSize);\n    textures.push(texture);\n  }\n\n  function drawAt(tileNumber, img, callback) {\n    var tilePosition = getTileCoordinates(tileNumber),\n      coordinates = {\n        offset: tileNumber\n      };\n\n    if (tilePosition.textureNumber >= textures.length) {\n      createTexture();\n    }\n    var currentTexture = textures[tilePosition.textureNumber];\n\n    currentTexture.ctx.drawImage(img, tilePosition.col * tileSize, tilePosition.row * tileSize, tileSize, tileSize);\n    trackedUrls[tileNumber] = img.src;\n\n    loadedImages[img.src] = coordinates;\n    currentTexture.isDirty = true;\n\n    callback(coordinates);\n  }\n\n  function getTileCoordinates(absolutePosition) {\n    var textureNumber = (absolutePosition / tilesPerTexture) << 0,\n      localTileNumber = (absolutePosition % tilesPerTexture),\n      row = (localTileNumber / tilesPerRow) << 0,\n      col = (localTileNumber % tilesPerRow);\n\n    return {\n      textureNumber: textureNumber,\n      row: row,\n      col: col\n    };\n  }\n\n  function markDirtyNow() {\n    api.isDirty = true;\n    skipedDirty = 0;\n    dirtyTimeoutId = null;\n  }\n\n  function markDirty() {\n    // delay this call, since it results in texture reload\n    if (dirtyTimeoutId) {\n      window.clearTimeout(dirtyTimeoutId);\n      skipedDirty += 1;\n      dirtyTimeoutId = null;\n    }\n\n    if (skipedDirty > 10) {\n      markDirtyNow();\n    } else {\n      dirtyTimeoutId = window.setTimeout(markDirtyNow, 400);\n    }\n  }\n\n  function copy(from, to) {\n    var fromCanvas = textures[from.textureNumber].canvas,\n      toCtx = textures[to.textureNumber].ctx,\n      x = to.col * tileSize,\n      y = to.row * tileSize;\n\n    toCtx.drawImage(fromCanvas, from.col * tileSize, from.row * tileSize, tileSize, tileSize, x, y, tileSize, tileSize);\n    textures[from.textureNumber].isDirty = true;\n    textures[to.textureNumber].isDirty = true;\n  }\n}\n\nfunction isPowerOf2(n) {\n  return (n & (n - 1)) === 0;\n}\n\n\n//# sourceURL=webpack:///./node_modules/vivagraphjs/src/WebGL/webglAtlas.js?");

/***/ }),

/***/ "./node_modules/vivagraphjs/src/WebGL/webglImage.js":
/*!**********************************************************!*\
  !*** ./node_modules/vivagraphjs/src/WebGL/webglImage.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = webglImage;\n\n/**\n * Represents a model for image.\n */\nfunction webglImage(size, src) {\n    return {\n        /**\n         * Gets texture index where current image is placed.\n         */\n        _texture : 0,\n\n        /**\n         * Gets offset in the texture where current image is placed.\n         */\n        _offset : 0,\n\n        /**\n         * Gets size of the square with the image.\n         */\n        size : typeof size === 'number' ? size : 32,\n\n        /**\n         * Source of the image. If image is coming not from your domain\n         * certain origin restrictions applies.\n         * See http://www.khronos.org/registry/webgl/specs/latest/#4.2 for more details.\n         */\n        src  : src\n    };\n}\n\n\n//# sourceURL=webpack:///./node_modules/vivagraphjs/src/WebGL/webglImage.js?");

/***/ }),

/***/ "./node_modules/vivagraphjs/src/WebGL/webglImageNodeProgram.js":
/*!*********************************************************************!*\
  !*** ./node_modules/vivagraphjs/src/WebGL/webglImageNodeProgram.js ***!
  \*********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("/**\n * @fileOverview Defines an image nodes for webglGraphics class.\n * Shape of nodes is square.\n *\n * @author Andrei Kashcha (aka anvaka) / https://github.com/anvaka\n */\n\nvar WebglAtlas = __webpack_require__(/*! ./webglAtlas.js */ \"./node_modules/vivagraphjs/src/WebGL/webglAtlas.js\");\nvar glUtils = __webpack_require__(/*! ./webgl.js */ \"./node_modules/vivagraphjs/src/WebGL/webgl.js\");\n\nmodule.exports = webglImageNodeProgram;\n\n/**\n * Defines simple UI for nodes in webgl renderer. Each node is rendered as an image.\n * \n * @param {number} tilesPerTexture\n * \n */\nfunction webglImageNodeProgram(tilesPerTexture) {\n  // WebGL is gian state machine, we store some properties of the state here:\n  var ATTRIBUTES_PER_PRIMITIVE = 18;\n  var nodesFS = createNodeFragmentShader();\n  var nodesVS = createNodeVertexShader();\n  var tilesPerTexture = tilesPerTexture || 1024; // TODO: Get based on max texture size\n  var atlas;\n  var program;\n  var gl;\n  var buffer;\n  var utils;\n  var locations;\n  var nodesCount = 0;\n  var nodes = new Float32Array(64);\n  var width;\n  var height;\n  var transform;\n  var sizeDirty;\n\n\n  return {\n    load: load,\n\n    /**\n     * Updates position of current node in the buffer of nodes.\n     *\n     * @param idx - index of current node.\n     * @param pos - new position of the node.\n     */\n    position: position,\n\n    createNode: createNode,\n\n    removeNode: removeNode,\n\n    replaceProperties: replaceProperties,\n\n    updateTransform: updateTransform,\n\n    updateSize: updateSize,\n\n    render: render\n  };\n\n  function refreshTexture(texture, idx) {\n    if (texture.nativeObject) {\n      gl.deleteTexture(texture.nativeObject);\n    }\n\n    var nativeObject = gl.createTexture();\n    gl.activeTexture(gl[\"TEXTURE\" + idx]);\n    gl.bindTexture(gl.TEXTURE_2D, nativeObject);\n    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, texture.canvas);\n    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);\n    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_NEAREST);\n\n    gl.generateMipmap(gl.TEXTURE_2D);\n    gl.uniform1i(locations[\"sampler\" + idx], idx);\n\n    texture.nativeObject = nativeObject;\n  }\n\n  function ensureAtlasTextureUpdated() {\n    if (atlas.isDirty) {\n      var textures = atlas.getTextures(),\n        i;\n      for (i = 0; i < textures.length; ++i) {\n        if (textures[i].isDirty || !textures[i].nativeObject) {\n          refreshTexture(textures[i], i);\n        }\n      }\n\n      atlas.clearDirty();\n    }\n  }\n\n  function load(glContext) {\n    gl = glContext;\n    utils = glUtils(glContext);\n\n    atlas = new WebglAtlas(tilesPerTexture);\n\n    program = utils.createProgram(nodesVS, nodesFS);\n    gl.useProgram(program);\n    locations = utils.getLocations(program, [\"a_vertexPos\", \"a_customAttributes\", \"u_screenSize\", \"u_transform\", \"u_sampler0\", \"u_sampler1\", \"u_sampler2\", \"u_sampler3\", \"u_tilesPerTexture\"]);\n\n    gl.uniform1f(locations.tilesPerTexture, tilesPerTexture);\n\n    gl.enableVertexAttribArray(locations.vertexPos);\n    gl.enableVertexAttribArray(locations.customAttributes);\n\n    buffer = gl.createBuffer();\n  }\n\n  function position(nodeUI, pos) {\n    var idx = nodeUI.id * ATTRIBUTES_PER_PRIMITIVE;\n    nodes[idx] = pos.x - nodeUI.size;\n    nodes[idx + 1] = -pos.y - nodeUI.size;\n    nodes[idx + 2] = nodeUI._offset * 4;\n\n    nodes[idx + 3] = pos.x + nodeUI.size;\n    nodes[idx + 4] = -pos.y - nodeUI.size;\n    nodes[idx + 5] = nodeUI._offset * 4 + 1;\n\n    nodes[idx + 6] = pos.x - nodeUI.size;\n    nodes[idx + 7] = -pos.y + nodeUI.size;\n    nodes[idx + 8] = nodeUI._offset * 4 + 2;\n\n    nodes[idx + 9] = pos.x - nodeUI.size;\n    nodes[idx + 10] = -pos.y + nodeUI.size;\n    nodes[idx + 11] = nodeUI._offset * 4 + 2;\n\n    nodes[idx + 12] = pos.x + nodeUI.size;\n    nodes[idx + 13] = -pos.y - nodeUI.size;\n    nodes[idx + 14] = nodeUI._offset * 4 + 1;\n\n    nodes[idx + 15] = pos.x + nodeUI.size;\n    nodes[idx + 16] = -pos.y + nodeUI.size;\n    nodes[idx + 17] = nodeUI._offset * 4 + 3;\n  }\n\n  function createNode(ui) {\n    nodes = utils.extendArray(nodes, nodesCount, ATTRIBUTES_PER_PRIMITIVE);\n    nodesCount += 1;\n\n    var coordinates = atlas.getCoordinates(ui.src);\n    if (coordinates) {\n      ui._offset = coordinates.offset;\n    } else {\n      ui._offset = 0;\n      // Image is not yet loaded into the atlas. Reload it:\n      atlas.load(ui.src, function(coordinates) {\n        ui._offset = coordinates.offset;\n      });\n    }\n  }\n\n  function removeNode(nodeUI) {\n    if (nodesCount > 0) {\n      nodesCount -= 1;\n    }\n\n    if (nodeUI.id < nodesCount && nodesCount > 0) {\n      if (nodeUI.src) {\n        atlas.remove(nodeUI.src);\n      }\n\n      utils.copyArrayPart(nodes, nodeUI.id * ATTRIBUTES_PER_PRIMITIVE, nodesCount * ATTRIBUTES_PER_PRIMITIVE, ATTRIBUTES_PER_PRIMITIVE);\n    }\n  }\n\n  function replaceProperties(replacedNode, newNode) {\n    newNode._offset = replacedNode._offset;\n  }\n\n  function updateTransform(newTransform) {\n    sizeDirty = true;\n    transform = newTransform;\n  }\n\n  function updateSize(w, h) {\n    width = w;\n    height = h;\n    sizeDirty = true;\n  }\n\n  function render() {\n    gl.useProgram(program);\n    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);\n    gl.bufferData(gl.ARRAY_BUFFER, nodes, gl.DYNAMIC_DRAW);\n\n    if (sizeDirty) {\n      sizeDirty = false;\n      gl.uniformMatrix4fv(locations.transform, false, transform);\n      gl.uniform2f(locations.screenSize, width, height);\n    }\n\n    gl.vertexAttribPointer(locations.vertexPos, 2, gl.FLOAT, false, 3 * Float32Array.BYTES_PER_ELEMENT, 0);\n    gl.vertexAttribPointer(locations.customAttributes, 1, gl.FLOAT, false, 3 * Float32Array.BYTES_PER_ELEMENT, 2 * 4);\n\n    ensureAtlasTextureUpdated();\n\n    gl.drawArrays(gl.TRIANGLES, 0, nodesCount * 6);\n  }\n}\n\n// TODO: Use glslify for shaders\nfunction createNodeFragmentShader() {\n  return [\n    \"precision mediump float;\",\n    \"varying vec4 color;\",\n    \"varying vec3 vTextureCoord;\",\n    \"uniform sampler2D u_sampler0;\",\n    \"uniform sampler2D u_sampler1;\",\n    \"uniform sampler2D u_sampler2;\",\n    \"uniform sampler2D u_sampler3;\",\n\n    \"void main(void) {\",\n    \"   if (vTextureCoord.z == 0.) {\",\n    \"     gl_FragColor = texture2D(u_sampler0, vTextureCoord.xy);\",\n    \"   } else if (vTextureCoord.z == 1.) {\",\n    \"     gl_FragColor = texture2D(u_sampler1, vTextureCoord.xy);\",\n    \"   } else if (vTextureCoord.z == 2.) {\",\n    \"     gl_FragColor = texture2D(u_sampler2, vTextureCoord.xy);\",\n    \"   } else if (vTextureCoord.z == 3.) {\",\n    \"     gl_FragColor = texture2D(u_sampler3, vTextureCoord.xy);\",\n    \"   } else { gl_FragColor = vec4(0, 1, 0, 1); }\",\n    \"}\"\n  ].join(\"\\n\");\n}\n\nfunction createNodeVertexShader() {\n  return [\n    \"attribute vec2 a_vertexPos;\",\n\n    \"attribute float a_customAttributes;\",\n    \"uniform vec2 u_screenSize;\",\n    \"uniform mat4 u_transform;\",\n    \"uniform float u_tilesPerTexture;\",\n    \"varying vec3 vTextureCoord;\",\n\n    \"void main(void) {\",\n    \"   gl_Position = u_transform * vec4(a_vertexPos/u_screenSize, 0, 1);\",\n    \"float corner = mod(a_customAttributes, 4.);\",\n    \"float tileIndex = mod(floor(a_customAttributes / 4.), u_tilesPerTexture);\",\n    \"float tilesPerRow = sqrt(u_tilesPerTexture);\",\n    \"float tileSize = 1./tilesPerRow;\",\n    \"float tileColumn = mod(tileIndex, tilesPerRow);\",\n    \"float tileRow = floor(tileIndex/tilesPerRow);\",\n\n    \"if(corner == 0.0) {\",\n    \"  vTextureCoord.xy = vec2(0, 1);\",\n    \"} else if(corner == 1.0) {\",\n    \"  vTextureCoord.xy = vec2(1, 1);\",\n    \"} else if(corner == 2.0) {\",\n    \"  vTextureCoord.xy = vec2(0, 0);\",\n    \"} else {\",\n    \"  vTextureCoord.xy = vec2(1, 0);\",\n    \"}\",\n\n    \"vTextureCoord *= tileSize;\",\n    \"vTextureCoord.x += tileColumn * tileSize;\",\n    \"vTextureCoord.y += tileRow * tileSize;\",\n    \"vTextureCoord.z = floor(floor(a_customAttributes / 4.)/u_tilesPerTexture);\",\n    \"}\"\n  ].join(\"\\n\");\n}\n\n\n//# sourceURL=webpack:///./node_modules/vivagraphjs/src/WebGL/webglImageNodeProgram.js?");

/***/ }),

/***/ "./node_modules/vivagraphjs/src/WebGL/webglInputEvents.js":
/*!****************************************************************!*\
  !*** ./node_modules/vivagraphjs/src/WebGL/webglInputEvents.js ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var documentEvents = __webpack_require__(/*! ../Utils/documentEvents.js */ \"./node_modules/vivagraphjs/src/Utils/documentEvents.js\");\n\nmodule.exports = webglInputEvents;\n\n/**\n * Monitors graph-related mouse input in webgl graphics and notifies subscribers.\n *\n * @param {Viva.Graph.View.webglGraphics} webglGraphics\n */\nfunction webglInputEvents(webglGraphics) {\n  if (webglGraphics.webglInputEvents) {\n    // Don't listen twice, if we are already attached to this graphics:\n    return webglGraphics.webglInputEvents;\n  }\n\n  var mouseCapturedNode = null,\n    mouseEnterCallback = [],\n    mouseLeaveCallback = [],\n    mouseDownCallback = [],\n    mouseUpCallback = [],\n    mouseMoveCallback = [],\n    clickCallback = [],\n    dblClickCallback = [],\n    prevSelectStart,\n    boundRect;\n\n  var root = webglGraphics.getGraphicsRoot();\n  startListen(root);\n\n  var api = {\n    mouseEnter: mouseEnter,\n    mouseLeave: mouseLeave,\n    mouseDown: mouseDown,\n    mouseUp: mouseUp,\n    mouseMove: mouseMove,\n    click: click,\n    dblClick: dblClick,\n    mouseCapture: mouseCapture,\n    releaseMouseCapture: releaseMouseCapture\n  };\n\n  // TODO I don't remember why this is needed:\n  webglGraphics.webglInputEvents = api;\n\n  return api;\n\n  function releaseMouseCapture() {\n    mouseCapturedNode = null;\n  }\n\n  function mouseCapture(node) {\n    mouseCapturedNode = node;\n  }\n\n  function dblClick(callback) {\n    if (typeof callback === 'function') {\n      dblClickCallback.push(callback);\n    }\n    return api;\n  }\n\n  function click(callback) {\n    if (typeof callback === 'function') {\n      clickCallback.push(callback);\n    }\n    return api;\n  }\n\n  function mouseMove(callback) {\n    if (typeof callback === 'function') {\n      mouseMoveCallback.push(callback);\n    }\n    return api;\n  }\n\n  function mouseUp(callback) {\n    if (typeof callback === 'function') {\n      mouseUpCallback.push(callback);\n    }\n    return api;\n  }\n\n  function mouseDown(callback) {\n    if (typeof callback === 'function') {\n      mouseDownCallback.push(callback);\n    }\n    return api;\n  }\n\n  function mouseLeave(callback) {\n    if (typeof callback === 'function') {\n      mouseLeaveCallback.push(callback);\n    }\n    return api;\n  }\n\n  function mouseEnter(callback) {\n    if (typeof callback === 'function') {\n      mouseEnterCallback.push(callback);\n    }\n    return api;\n  }\n\n  function preciseCheck(nodeUI, x, y) {\n    if (nodeUI && nodeUI.size) {\n      var pos = nodeUI.position,\n        half = nodeUI.size;\n\n      return pos.x - half < x && x < pos.x + half &&\n        pos.y - half < y && y < pos.y + half;\n    }\n\n    return true;\n  }\n\n  function getNodeAtClientPos(pos) {\n    return webglGraphics.getNodeAtClientPos(pos, preciseCheck);\n  }\n\n  function stopPropagation(e) {\n    if (e.stopPropagation) {\n      e.stopPropagation();\n    } else {\n      e.cancelBubble = true;\n    }\n  }\n\n  function handleDisabledEvent(e) {\n    stopPropagation(e);\n    return false;\n  }\n\n  function invoke(callbacksChain, args) {\n    var i, stopPropagation;\n    for (i = 0; i < callbacksChain.length; i += 1) {\n      stopPropagation = callbacksChain[i].apply(undefined, args);\n      if (stopPropagation) {\n        return true;\n      }\n    }\n  }\n\n  function startListen(root) {\n    var pos = {\n        x: 0,\n        y: 0\n      },\n      lastFound = null,\n      lastUpdate = 1,\n      lastClickTime = +new Date(),\n\n      handleMouseMove = function(e) {\n        invoke(mouseMoveCallback, [lastFound, e]);\n        pos.x = e.clientX;\n        pos.y = e.clientY;\n      },\n\n      handleMouseUp = function() {\n        documentEvents.off('mousemove', handleMouseMove);\n        documentEvents.off('mouseup', handleMouseUp);\n      },\n\n      updateBoundRect = function() {\n        boundRect = root.getBoundingClientRect();\n      };\n\n    window.addEventListener('resize', updateBoundRect);\n    updateBoundRect();\n\n    // mouse move inside container serves only to track mouse enter/leave events.\n    root.addEventListener('mousemove',\n      function(e) {\n        if (mouseCapturedNode) {\n          return;\n        }\n        if (lastUpdate++ % 7 === 0) {\n          // since there is no bullet proof method to detect resize\n          // event, we preemptively update the bounding rectangle\n          updateBoundRect();\n          lastUpdate = 1;\n        }\n        var cancelBubble = false,\n          node;\n\n        pos.x = e.clientX - boundRect.left;\n        pos.y = e.clientY - boundRect.top;\n\n        node = getNodeAtClientPos(pos);\n\n        if (node && lastFound !== node) {\n          if(lastFound){ \n            invoke(mouseLeaveCallback, [lastFound]);\n          }\n          lastFound = node;\n          cancelBubble = cancelBubble || invoke(mouseEnterCallback, [lastFound]);\n        } else if (node === null && lastFound !== node) {\n          cancelBubble = cancelBubble || invoke(mouseLeaveCallback, [lastFound]);\n          lastFound = null;\n        }\n\n        if (cancelBubble) {\n          stopPropagation(e);\n        }\n      });\n\n    root.addEventListener('mousedown',\n      function(e) {\n        var cancelBubble = false,\n          args;\n        updateBoundRect();\n        pos.x = e.clientX - boundRect.left;\n        pos.y = e.clientY - boundRect.top;\n\n        args = [getNodeAtClientPos(pos), e];\n        if (args[0]) {\n          cancelBubble = invoke(mouseDownCallback, args);\n          // we clicked on a node. Following drag should be handled on document events:\n          documentEvents.on('mousemove', handleMouseMove);\n          documentEvents.on('mouseup', handleMouseUp);\n\n          prevSelectStart = window.document.onselectstart;\n\n          window.document.onselectstart = handleDisabledEvent;\n\n          lastFound = args[0];\n        } else {\n          lastFound = null;\n        }\n        if (cancelBubble) {\n          stopPropagation(e);\n        }\n      });\n\n    root.addEventListener('mouseup',\n      function(e) {\n        var clickTime = +new Date(),\n          args;\n\n        pos.x = e.clientX - boundRect.left;\n        pos.y = e.clientY - boundRect.top;\n\n        var nodeAtClientPos = getNodeAtClientPos(pos);\n        var sameNode = nodeAtClientPos === lastFound;\n        args = [nodeAtClientPos || lastFound, e];\n        if (args[0]) {\n          window.document.onselectstart = prevSelectStart;\n\n          if (clickTime - lastClickTime < 400 && sameNode) {\n            invoke(dblClickCallback, args);\n          } else {\n            invoke(clickCallback, args);\n          }\n          lastClickTime = clickTime;\n\n          if (invoke(mouseUpCallback, args)) {\n            stopPropagation(e);\n          }\n        }\n      });\n  }\n}\n\n\n//# sourceURL=webpack:///./node_modules/vivagraphjs/src/WebGL/webglInputEvents.js?");

/***/ }),

/***/ "./node_modules/vivagraphjs/src/WebGL/webglLine.js":
/*!*********************************************************!*\
  !*** ./node_modules/vivagraphjs/src/WebGL/webglLine.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var parseColor = __webpack_require__(/*! ./parseColor.js */ \"./node_modules/vivagraphjs/src/WebGL/parseColor.js\");\n\nmodule.exports = webglLine;\n\n/**\n * Defines a webgl line. This class has no rendering logic at all,\n * it's just passed to corresponding shader and the shader should\n * figure out how to render it.\n *\n */\nfunction webglLine(color) {\n  return {\n    /**\n     * Gets or sets color of the line. If you set this property externally\n     * make sure it always come as integer of 0xRRGGBBAA format\n     */\n    color: parseColor(color)\n  };\n}\n\n\n//# sourceURL=webpack:///./node_modules/vivagraphjs/src/WebGL/webglLine.js?");

/***/ }),

/***/ "./node_modules/vivagraphjs/src/WebGL/webglLinkProgram.js":
/*!****************************************************************!*\
  !*** ./node_modules/vivagraphjs/src/WebGL/webglLinkProgram.js ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("/**\n * @fileOverview Defines a naive form of links for webglGraphics class.\n * This form allows to change color of links.\n **/\n\nvar glUtils = __webpack_require__(/*! ./webgl.js */ \"./node_modules/vivagraphjs/src/WebGL/webgl.js\");\n\nmodule.exports = webglLinkProgram;\n\n/**\n * Defines UI for links in webgl renderer.\n */\nfunction webglLinkProgram() {\n    var ATTRIBUTES_PER_PRIMITIVE = 6, // primitive is Line with two points. Each has x,y and color = 3 * 2 attributes.\n        BYTES_PER_LINK = 2 * (2 * Float32Array.BYTES_PER_ELEMENT + Uint32Array.BYTES_PER_ELEMENT), // two nodes * (x, y + color)\n        linksFS = [\n            'precision mediump float;',\n            'varying vec4 color;',\n            'void main(void) {',\n            '   gl_FragColor = color;',\n            '}'\n        ].join('\\n'),\n\n        linksVS = [\n            'attribute vec2 a_vertexPos;',\n            'attribute vec4 a_color;',\n\n            'uniform vec2 u_screenSize;',\n            'uniform mat4 u_transform;',\n\n            'varying vec4 color;',\n\n            'void main(void) {',\n            '   gl_Position = u_transform * vec4(a_vertexPos/u_screenSize, 0.0, 1.0);',\n            '   color = a_color.abgr;',\n            '}'\n        ].join('\\n'),\n\n        program,\n        gl,\n        buffer,\n        utils,\n        locations,\n        linksCount = 0,\n        frontLinkId, // used to track z-index of links.\n        storage = new ArrayBuffer(16 * BYTES_PER_LINK),\n        positions = new Float32Array(storage),\n        colors = new Uint32Array(storage),\n        width,\n        height,\n        transform,\n        sizeDirty,\n\n        ensureEnoughStorage = function () {\n            // TODO: this is a duplicate of webglNodeProgram code. Extract it to webgl.js\n            if ((linksCount+1)*BYTES_PER_LINK > storage.byteLength) {\n                // Every time we run out of space create new array twice bigger.\n                // TODO: it seems buffer size is limited. Consider using multiple arrays for huge graphs\n                var extendedStorage = new ArrayBuffer(storage.byteLength * 2),\n                    extendedPositions = new Float32Array(extendedStorage),\n                    extendedColors = new Uint32Array(extendedStorage);\n\n                extendedColors.set(colors); // should be enough to copy just one view.\n                positions = extendedPositions;\n                colors = extendedColors;\n                storage = extendedStorage;\n            }\n        };\n\n    return {\n        load : function (glContext) {\n            gl = glContext;\n            utils = glUtils(glContext);\n\n            program = utils.createProgram(linksVS, linksFS);\n            gl.useProgram(program);\n            locations = utils.getLocations(program, ['a_vertexPos', 'a_color', 'u_screenSize', 'u_transform']);\n\n            gl.enableVertexAttribArray(locations.vertexPos);\n            gl.enableVertexAttribArray(locations.color);\n\n            buffer = gl.createBuffer();\n        },\n\n        position: function (linkUi, fromPos, toPos) {\n            var linkIdx = linkUi.id,\n                offset = linkIdx * ATTRIBUTES_PER_PRIMITIVE;\n            positions[offset] = fromPos.x;\n            positions[offset + 1] = fromPos.y;\n            colors[offset + 2] = linkUi.color;\n\n            positions[offset + 3] = toPos.x;\n            positions[offset + 4] = toPos.y;\n            colors[offset + 5] = linkUi.color;\n        },\n\n        createLink : function (ui) {\n            ensureEnoughStorage();\n\n            linksCount += 1;\n            frontLinkId = ui.id;\n        },\n\n        removeLink : function (ui) {\n            if (linksCount > 0) { linksCount -= 1; }\n            // swap removed link with the last link. This will give us O(1) performance for links removal:\n            if (ui.id < linksCount && linksCount > 0) {\n                // using colors as a view to array buffer is okay here.\n                utils.copyArrayPart(colors, ui.id * ATTRIBUTES_PER_PRIMITIVE, linksCount * ATTRIBUTES_PER_PRIMITIVE, ATTRIBUTES_PER_PRIMITIVE);\n            }\n        },\n\n        updateTransform : function (newTransform) {\n            sizeDirty = true;\n            transform = newTransform;\n        },\n\n        updateSize : function (w, h) {\n            width = w;\n            height = h;\n            sizeDirty = true;\n        },\n\n        render : function () {\n            gl.useProgram(program);\n            gl.bindBuffer(gl.ARRAY_BUFFER, buffer);\n            gl.bufferData(gl.ARRAY_BUFFER, storage, gl.DYNAMIC_DRAW);\n\n            if (sizeDirty) {\n                sizeDirty = false;\n                gl.uniformMatrix4fv(locations.transform, false, transform);\n                gl.uniform2f(locations.screenSize, width, height);\n            }\n\n            gl.vertexAttribPointer(locations.vertexPos, 2, gl.FLOAT, false, 3 * Float32Array.BYTES_PER_ELEMENT, 0);\n            gl.vertexAttribPointer(locations.color, 4, gl.UNSIGNED_BYTE, true, 3 * Float32Array.BYTES_PER_ELEMENT, 2 * 4);\n\n            gl.drawArrays(gl.LINES, 0, linksCount * 2);\n\n            frontLinkId = linksCount - 1;\n        },\n\n        bringToFront : function (link) {\n            if (frontLinkId > link.id) {\n                utils.swapArrayPart(positions, link.id * ATTRIBUTES_PER_PRIMITIVE, frontLinkId * ATTRIBUTES_PER_PRIMITIVE, ATTRIBUTES_PER_PRIMITIVE);\n            }\n            if (frontLinkId > 0) {\n                frontLinkId -= 1;\n            }\n        },\n\n        getFrontLinkId : function () {\n            return frontLinkId;\n        }\n    };\n}\n\n\n//# sourceURL=webpack:///./node_modules/vivagraphjs/src/WebGL/webglLinkProgram.js?");

/***/ }),

/***/ "./node_modules/vivagraphjs/src/WebGL/webglNodeProgram.js":
/*!****************************************************************!*\
  !*** ./node_modules/vivagraphjs/src/WebGL/webglNodeProgram.js ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("/**\n * @fileOverview Defines a naive form of nodes for webglGraphics class.\n * This form allows to change color of node. Shape of nodes is rectangular.\n *\n * @author Andrei Kashcha (aka anvaka) / https://github.com/anvaka\n */\n\nvar glUtils = __webpack_require__(/*! ./webgl.js */ \"./node_modules/vivagraphjs/src/WebGL/webgl.js\");\n\nmodule.exports = webglNodeProgram;\n\n/**\n * Defines simple UI for nodes in webgl renderer. Each node is rendered as square. Color and size can be changed.\n */\nfunction webglNodeProgram() {\n  var ATTRIBUTES_PER_PRIMITIVE = 4; // Primitive is point, x, y, size, color\n  // x, y, z - floats, color = uint.\n  var BYTES_PER_NODE = 3 * Float32Array.BYTES_PER_ELEMENT + Uint32Array.BYTES_PER_ELEMENT;\n  var nodesFS = [\n    'precision mediump float;',\n    'varying vec4 color;',\n\n    'void main(void) {',\n    '   gl_FragColor = color;',\n    '}'\n  ].join('\\n');\n  var nodesVS = [\n    'attribute vec3 a_vertexPos;',\n    'attribute vec4 a_color;',\n    'uniform vec2 u_screenSize;',\n    'uniform mat4 u_transform;',\n    'varying vec4 color;',\n\n    'void main(void) {',\n    '   gl_Position = u_transform * vec4(a_vertexPos.xy/u_screenSize, 0, 1);',\n    '   gl_PointSize = a_vertexPos.z * u_transform[0][0];',\n    '   color = a_color.abgr;',\n    '}'\n  ].join('\\n');\n\n  var program;\n  var gl;\n  var buffer;\n  var locations;\n  var utils;\n  var storage = new ArrayBuffer(16 * BYTES_PER_NODE);\n  var positions = new Float32Array(storage);\n  var colors = new Uint32Array(storage);\n  var nodesCount = 0;\n  var width;\n  var height;\n  var transform;\n  var sizeDirty;\n\n  return {\n    load: load,\n\n    /**\n     * Updates position of node in the buffer of nodes.\n     *\n     * @param idx - index of current node.\n     * @param pos - new position of the node.\n     */\n    position: position,\n\n    updateTransform: updateTransform,\n\n    updateSize: updateSize,\n\n    removeNode: removeNode,\n\n    createNode: createNode,\n\n    replaceProperties: replaceProperties,\n\n    render: render\n  };\n\n  function ensureEnoughStorage() {\n    if ((nodesCount + 1) * BYTES_PER_NODE >= storage.byteLength) {\n      // Every time we run out of space create new array twice bigger.\n      // TODO: it seems buffer size is limited. Consider using multiple arrays for huge graphs\n      var extendedStorage = new ArrayBuffer(storage.byteLength * 2),\n        extendedPositions = new Float32Array(extendedStorage),\n        extendedColors = new Uint32Array(extendedStorage);\n\n      extendedColors.set(colors); // should be enough to copy just one view.\n      positions = extendedPositions;\n      colors = extendedColors;\n      storage = extendedStorage;\n    }\n  }\n\n  function load(glContext) {\n    gl = glContext;\n    utils = glUtils(glContext);\n\n    program = utils.createProgram(nodesVS, nodesFS);\n    gl.useProgram(program);\n    locations = utils.getLocations(program, ['a_vertexPos', 'a_color', 'u_screenSize', 'u_transform']);\n\n    gl.enableVertexAttribArray(locations.vertexPos);\n    gl.enableVertexAttribArray(locations.color);\n\n    buffer = gl.createBuffer();\n  }\n\n  function position(nodeUI, pos) {\n    var idx = nodeUI.id;\n\n    positions[idx * ATTRIBUTES_PER_PRIMITIVE] = pos.x;\n    positions[idx * ATTRIBUTES_PER_PRIMITIVE + 1] = -pos.y;\n    positions[idx * ATTRIBUTES_PER_PRIMITIVE + 2] = nodeUI.size;\n\n    colors[idx * ATTRIBUTES_PER_PRIMITIVE + 3] = nodeUI.color;\n  }\n\n  function updateTransform(newTransform) {\n    sizeDirty = true;\n    transform = newTransform;\n  }\n\n  function updateSize(w, h) {\n    width = w;\n    height = h;\n    sizeDirty = true;\n  }\n\n  function removeNode(node) {\n      if (nodesCount > 0) {\n        nodesCount -= 1;\n      }\n\n      if (node.id < nodesCount && nodesCount > 0) {\n        // we can use colors as a 'view' into array array buffer.\n        utils.copyArrayPart(colors, node.id * ATTRIBUTES_PER_PRIMITIVE, nodesCount * ATTRIBUTES_PER_PRIMITIVE, ATTRIBUTES_PER_PRIMITIVE);\n      }\n    }\n\n  function createNode() {\n    ensureEnoughStorage();\n    nodesCount += 1;\n  }\n\n  function replaceProperties(/* replacedNode, newNode */) {}\n\n  function render() {\n    gl.useProgram(program);\n    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);\n    gl.bufferData(gl.ARRAY_BUFFER, storage, gl.DYNAMIC_DRAW);\n\n    if (sizeDirty) {\n      sizeDirty = false;\n      gl.uniformMatrix4fv(locations.transform, false, transform);\n      gl.uniform2f(locations.screenSize, width, height);\n    }\n\n    gl.vertexAttribPointer(locations.vertexPos, 3, gl.FLOAT, false, ATTRIBUTES_PER_PRIMITIVE * Float32Array.BYTES_PER_ELEMENT, 0);\n    gl.vertexAttribPointer(locations.color, 4, gl.UNSIGNED_BYTE, true, ATTRIBUTES_PER_PRIMITIVE * Float32Array.BYTES_PER_ELEMENT, 3 * 4);\n\n    gl.drawArrays(gl.POINTS, 0, nodesCount);\n  }\n}\n\n\n//# sourceURL=webpack:///./node_modules/vivagraphjs/src/WebGL/webglNodeProgram.js?");

/***/ }),

/***/ "./node_modules/vivagraphjs/src/WebGL/webglSquare.js":
/*!***********************************************************!*\
  !*** ./node_modules/vivagraphjs/src/WebGL/webglSquare.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var parseColor = __webpack_require__(/*! ./parseColor.js */ \"./node_modules/vivagraphjs/src/WebGL/parseColor.js\");\n\nmodule.exports = webglSquare;\n\n/**\n * Can be used as a callback in the webglGraphics.node() function, to\n * create a custom looking node.\n *\n * @param size - size of the node in pixels.\n * @param color - color of the node in '#rrggbbaa' or '#rgb' format.\n */\nfunction webglSquare(size, color) {\n  return {\n    /**\n     * Gets or sets size of the square side.\n     */\n    size: typeof size === 'number' ? size : 10,\n\n    /**\n     * Gets or sets color of the square.\n     */\n    color: parseColor(color)\n  };\n}\n\n\n//# sourceURL=webpack:///./node_modules/vivagraphjs/src/WebGL/webglSquare.js?");

/***/ }),

/***/ "./node_modules/vivagraphjs/src/version.js":
/*!*************************************************!*\
  !*** ./node_modules/vivagraphjs/src/version.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("// todo: this should be generated at build time.\nmodule.exports = '0.10.1';\n\n\n//# sourceURL=webpack:///./node_modules/vivagraphjs/src/version.js?");

/***/ }),

/***/ "./node_modules/vivagraphjs/src/viva.js":
/*!**********************************************!*\
  !*** ./node_modules/vivagraphjs/src/viva.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("/**\r\n * This is an entry point for global namespace. If you want to use separate\r\n * modules individually - you are more than welcome to do so.\r\n */\r\n\r\nvar random = __webpack_require__(/*! ngraph.random */ \"./node_modules/ngraph.random/index.js\");\r\n\r\nvar Viva = {\r\n  lazyExtend: function() {\r\n    return __webpack_require__(/*! ngraph.merge */ \"./node_modules/ngraph.merge/index.js\").apply(this, arguments);\r\n  },\r\n  randomIterator: function() {\r\n    return random.randomIterator.apply(random, arguments);\r\n  },\r\n  random: function() {\r\n    return random.random.apply(random, arguments);\r\n  },\r\n  events: __webpack_require__(/*! ngraph.events */ \"./node_modules/ngraph.events/index.js\")\r\n};\r\n\r\nViva.Graph = {\r\n  version: __webpack_require__(/*! ./version.js */ \"./node_modules/vivagraphjs/src/version.js\"),\r\n  graph: __webpack_require__(/*! ngraph.graph */ \"./node_modules/ngraph.graph/index.js\"),\r\n\r\n  serializer: function() {\r\n    return {\r\n      loadFromJSON: __webpack_require__(/*! ngraph.fromjson */ \"./node_modules/ngraph.fromjson/index.js\"),\r\n      storeToJSON: __webpack_require__(/*! ngraph.tojson */ \"./node_modules/ngraph.tojson/index.js\")\r\n    };\r\n  },\r\n\r\n  centrality: __webpack_require__(/*! ./Algorithms/centrality.js */ \"./node_modules/vivagraphjs/src/Algorithms/centrality.js\"),\r\n  operations: __webpack_require__(/*! ./Algorithms/operations.js */ \"./node_modules/vivagraphjs/src/Algorithms/operations.js\"),\r\n\r\n  geom: function() {\r\n    return {\r\n      intersect: __webpack_require__(/*! gintersect */ \"./node_modules/gintersect/index.js\"),\r\n      intersectRect: __webpack_require__(/*! ./Utils/intersectRect.js */ \"./node_modules/vivagraphjs/src/Utils/intersectRect.js\")\r\n    };\r\n  },\r\n\r\n  webgl: __webpack_require__(/*! ./WebGL/webgl.js */ \"./node_modules/vivagraphjs/src/WebGL/webgl.js\"),\r\n  webglInputEvents: __webpack_require__(/*! ./WebGL/webglInputEvents.js */ \"./node_modules/vivagraphjs/src/WebGL/webglInputEvents.js\"),\r\n\r\n  generator: function() {\r\n    return __webpack_require__(/*! ngraph.generators */ \"./node_modules/ngraph.generators/index.js\");\r\n  },\r\n\r\n  Input: {\r\n    domInputManager: __webpack_require__(/*! ./Input/domInputManager.js */ \"./node_modules/vivagraphjs/src/Input/domInputManager.js\"),\r\n    webglInputManager: __webpack_require__(/*! ./Input/webglInputManager.js */ \"./node_modules/vivagraphjs/src/Input/webglInputManager.js\")\r\n  },\r\n\r\n  Utils: {\r\n    // TODO: move to Input\r\n    dragndrop: __webpack_require__(/*! ./Input/dragndrop.js */ \"./node_modules/vivagraphjs/src/Input/dragndrop.js\"),\r\n    findElementPosition: __webpack_require__(/*! ./Utils/findElementPosition.js */ \"./node_modules/vivagraphjs/src/Utils/findElementPosition.js\"),\r\n    timer: __webpack_require__(/*! ./Utils/timer.js */ \"./node_modules/vivagraphjs/src/Utils/timer.js\"),\r\n    getDimension: __webpack_require__(/*! ./Utils/getDimensions.js */ \"./node_modules/vivagraphjs/src/Utils/getDimensions.js\"),\r\n    events: __webpack_require__(/*! ./Utils/backwardCompatibleEvents.js */ \"./node_modules/vivagraphjs/src/Utils/backwardCompatibleEvents.js\")\r\n  },\r\n\r\n  Layout: {\r\n    forceDirected: __webpack_require__(/*! ngraph.forcelayout */ \"./node_modules/ngraph.forcelayout/index.js\"),\r\n    constant: __webpack_require__(/*! ./Layout/constant.js */ \"./node_modules/vivagraphjs/src/Layout/constant.js\")\r\n  },\r\n\r\n  View: {\r\n    // TODO: Move `webglXXX` out to webgl namespace\r\n    Texture: __webpack_require__(/*! ./WebGL/texture.js */ \"./node_modules/vivagraphjs/src/WebGL/texture.js\"),\r\n    // TODO: This should not be even exported\r\n    webglAtlas: __webpack_require__(/*! ./WebGL/webglAtlas.js */ \"./node_modules/vivagraphjs/src/WebGL/webglAtlas.js\"),\r\n    webglImageNodeProgram: __webpack_require__(/*! ./WebGL/webglImageNodeProgram.js */ \"./node_modules/vivagraphjs/src/WebGL/webglImageNodeProgram.js\"),\r\n    webglLinkProgram: __webpack_require__(/*! ./WebGL/webglLinkProgram.js */ \"./node_modules/vivagraphjs/src/WebGL/webglLinkProgram.js\"),\r\n    webglNodeProgram: __webpack_require__(/*! ./WebGL/webglNodeProgram.js */ \"./node_modules/vivagraphjs/src/WebGL/webglNodeProgram.js\"),\r\n    webglLine: __webpack_require__(/*! ./WebGL/webglLine.js */ \"./node_modules/vivagraphjs/src/WebGL/webglLine.js\"),\r\n    webglSquare: __webpack_require__(/*! ./WebGL/webglSquare.js */ \"./node_modules/vivagraphjs/src/WebGL/webglSquare.js\"),\r\n    webglImage: __webpack_require__(/*! ./WebGL/webglImage.js */ \"./node_modules/vivagraphjs/src/WebGL/webglImage.js\"),\r\n    webglGraphics: __webpack_require__(/*! ./View/webglGraphics.js */ \"./node_modules/vivagraphjs/src/View/webglGraphics.js\"),\r\n    // TODO: Deprecate this:\r\n    _webglUtil: {\r\n      parseColor: __webpack_require__(/*! ./WebGL/parseColor.js */ \"./node_modules/vivagraphjs/src/WebGL/parseColor.js\")\r\n    },\r\n\r\n    // TODO: move to svg namespace\r\n    svgGraphics: __webpack_require__(/*! ./View/svgGraphics.js */ \"./node_modules/vivagraphjs/src/View/svgGraphics.js\"),\r\n\r\n    renderer: __webpack_require__(/*! ./View/renderer.js */ \"./node_modules/vivagraphjs/src/View/renderer.js\"),\r\n\r\n    // deprecated\r\n    cssGraphics: function() {\r\n      throw new Error('cssGraphics is deprecated. Please use older version of vivagraph (< 0.7) if you need it');\r\n    },\r\n\r\n    svgNodeFactory: function() {\r\n      throw new Error('svgNodeFactory is deprecated. Please use older version of vivagraph (< 0.7) if you need it');\r\n    },\r\n\r\n    community: function() {\r\n      throw new Error('community is deprecated. Please use vivagraph < 0.7 if you need it, or `https://github.com/anvaka/ngraph.slpa` module');\r\n    }\r\n  },\r\n\r\n  Rect: __webpack_require__(/*! ./Utils/rect.js */ \"./node_modules/vivagraphjs/src/Utils/rect.js\"),\r\n\r\n  svg: __webpack_require__(/*! simplesvg */ \"./node_modules/simplesvg/index.js\"),\r\n\r\n  // TODO: should be camelCase\r\n  BrowserInfo: __webpack_require__(/*! ./Utils/browserInfo.js */ \"./node_modules/vivagraphjs/src/Utils/browserInfo.js\")\r\n};\r\n\r\nmodule.exports = Viva;\r\n\n\n//# sourceURL=webpack:///./node_modules/vivagraphjs/src/viva.js?");

/***/ }),

/***/ "./node_modules/webpack/buildin/global.js":
/*!***********************************!*\
  !*** (webpack)/buildin/global.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("var g;\n\n// This works in non-strict mode\ng = (function() {\n\treturn this;\n})();\n\ntry {\n\t// This works if eval is allowed (see CSP)\n\tg = g || new Function(\"return this\")();\n} catch (e) {\n\t// This works if the window reference is available\n\tif (typeof window === \"object\") g = window;\n}\n\n// g can still be undefined, but nothing to do about it...\n// We return undefined, instead of nothing here, so it's\n// easier to handle this case. if(!global) { ...}\n\nmodule.exports = g;\n\n\n//# sourceURL=webpack:///(webpack)/buildin/global.js?");

/***/ }),

/***/ "./src/api/requests.js":
/*!*****************************!*\
  !*** ./src/api/requests.js ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nvar backendHost = \"http://127.0.0.1:5000\";\nvar apiPrefix = \"/api/v1\";\nvar apiURL = backendHost + apiPrefix;\nvar githubPrefix = \"/github\";\n\nvar getUserFollowers = exports.getUserFollowers = function getUserFollowers(username) {\n  var xmlHttp = new XMLHttpRequest();\n  xmlHttp.open(\"GET\", \"\" + apiURL + githubPrefix + \"/\" + username, false); // false for synchronous request\n  xmlHttp.send(null);\n  return JSON.parse(xmlHttp.responseText);\n};\n\n//# sourceURL=webpack:///./src/api/requests.js?");

/***/ }),

/***/ "./src/components/app/index.css":
/*!**************************************!*\
  !*** ./src/components/app/index.css ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("\nvar content = __webpack_require__(/*! !../../../node_modules/css-loader/dist/cjs.js!./index.css */ \"./node_modules/css-loader/dist/cjs.js!./src/components/app/index.css\");\n\nif(typeof content === 'string') content = [[module.i, content, '']];\n\nvar transform;\nvar insertInto;\n\n\n\nvar options = {\"hmr\":true}\n\noptions.transform = transform\noptions.insertInto = undefined;\n\nvar update = __webpack_require__(/*! ../../../node_modules/style-loader/lib/addStyles.js */ \"./node_modules/style-loader/lib/addStyles.js\")(content, options);\n\nif(content.locals) module.exports = content.locals;\n\nif(true) {\n\tmodule.hot.accept(/*! !../../../node_modules/css-loader/dist/cjs.js!./index.css */ \"./node_modules/css-loader/dist/cjs.js!./src/components/app/index.css\", function() {\n\t\tvar newContent = __webpack_require__(/*! !../../../node_modules/css-loader/dist/cjs.js!./index.css */ \"./node_modules/css-loader/dist/cjs.js!./src/components/app/index.css\");\n\n\t\tif(typeof newContent === 'string') newContent = [[module.i, newContent, '']];\n\n\t\tvar locals = (function(a, b) {\n\t\t\tvar key, idx = 0;\n\n\t\t\tfor(key in a) {\n\t\t\t\tif(!b || a[key] !== b[key]) return false;\n\t\t\t\tidx++;\n\t\t\t}\n\n\t\t\tfor(key in b) idx--;\n\n\t\t\treturn idx === 0;\n\t\t}(content.locals, newContent.locals));\n\n\t\tif(!locals) throw new Error('Aborting CSS HMR due to changed css-modules locals.');\n\n\t\tupdate(newContent);\n\t});\n\n\tmodule.hot.dispose(function() { update(); });\n}\n\n//# sourceURL=webpack:///./src/components/app/index.css?");

/***/ }),

/***/ "./src/components/app/index.js":
/*!*************************************!*\
  !*** ./src/components/app/index.js ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nvar _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();\n\nvar _index = __webpack_require__(/*! ./index.css */ \"./src/components/app/index.css\");\n\nvar css = _interopRequireWildcard(_index);\n\nvar _vivagraphjs = __webpack_require__(/*! vivagraphjs */ \"./node_modules/vivagraphjs/src/viva.js\");\n\nvar _vivagraphjs2 = _interopRequireDefault(_vivagraphjs);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nfunction _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nvar App = function () {\n  function App(elem) {\n    _classCallCheck(this, App);\n\n    if (!elem) return;\n    this.elem = elem;\n    this.defaultIconSize = 50;\n    this.defaultURL = \"https://ibb.co/68dTG9c\";\n\n    this.graphics = _vivagraphjs2.default.Graph.View.svgGraphics();\n    this.graphics.node(function (node) {\n      // The function is called every time renderer needs a ui to display node\n      return _vivagraphjs2.default.Graph.svg('image').attr('width', node.data[\"size\"]).attr('height', node.data[\"size\"]).link(node.data && node.data.url);\n      // node.data holds custom object passed to graph.addNode();\n    }).placeNode(function (nodeUI, pos) {\n      // Shift image to let links go to the center:\n      nodeUI.attr('x', pos.x - 12).attr('y', pos.y - 12);\n    });\n  }\n\n  _createClass(App, [{\n    key: \"addNodesToGraph\",\n    value: function addNodesToGraph(root_user, followers, graph) {\n      var _this = this;\n\n      var getDataFromPerson = function getDataFromPerson(person) {\n        return { url: person[\"avatar_url\"] || _this.defaultURL, size: person[\"size\"] || _this.defaultIconSize };\n      };\n\n      graph.addNode(root_user, getDataFromPerson({ \"login\": root_user }));\n\n      var _iteratorNormalCompletion = true;\n      var _didIteratorError = false;\n      var _iteratorError = undefined;\n\n      try {\n        for (var _iterator = followers[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {\n          var person = _step.value;\n\n          if (!graph.getNode(person[\"login\"])) {\n            graph.addNode(person[\"login\"], getDataFromPerson(person));\n          }\n          graph.addLink(root_user, person[\"login\"]);\n          if (person[\"followers\"] !== undefined) {\n            this.addNodesToGraph(person[\"login\"], person[\"followers\"], graph);\n          }\n        }\n      } catch (err) {\n        _didIteratorError = true;\n        _iteratorError = err;\n      } finally {\n        try {\n          if (!_iteratorNormalCompletion && _iterator.return) {\n            _iterator.return();\n          }\n        } finally {\n          if (_didIteratorError) {\n            throw _iteratorError;\n          }\n        }\n      }\n    }\n  }, {\n    key: \"render\",\n    value: function render(root_user, followers) {\n      var graph = _vivagraphjs2.default.Graph.graph();\n      this.addNodesToGraph(root_user, followers, graph);\n\n      var layout = _vivagraphjs2.default.Graph.Layout.forceDirected(graph, {\n        springLength: followers && followers.length * 2 || 200,\n        springCoeff: 0.00001,\n        dragCoeff: 0.002,\n        gravity: -112.5\n      });\n\n      var renderer = _vivagraphjs2.default.Graph.View.renderer(graph, {\n        container: document.querySelector(\".graph-container\"),\n        layout: layout,\n        graphics: this.graphics\n      });\n      renderer.run();\n    }\n  }]);\n\n  return App;\n}();\n\nexports.default = App;\n\n//# sourceURL=webpack:///./src/components/app/index.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar _app = __webpack_require__(/*! ./components/app */ \"./src/components/app/index.js\");\n\nvar _app2 = _interopRequireDefault(_app);\n\nvar _requests = __webpack_require__(/*! ./api/requests */ \"./src/api/requests.js\");\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\n/**\r\n * The entry point\r\n */\n\nvar updateName = function updateName(app, name) {\n  var followers = (0, _requests.getUserFollowers)(name);\n  app.render(name, followers);\n};\n\nwindow.addEventListener('load', function () {\n  var app = new _app2.default(document.getElementById('app'));\n  var input = document.getElementById('input');\n\n  input.oninput = function (e) {\n    return updateName(app, e.target.value);\n  };\n\n  // Дефолтное значение для username\n  updateName(app, \"x4nth055\");\n});\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ }),

/***/ 0:
/*!****************************!*\
  !*** multi ./src/index.js ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__(/*! ./src/index.js */\"./src/index.js\");\n\n\n//# sourceURL=webpack:///multi_./src/index.js?");

/***/ })

/******/ });