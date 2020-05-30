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
/******/ 	var hotCurrentHash = "cb22cc8dc604f065ec89";
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

/***/ "./node_modules/isomorphic-fetch/fetch-npm-browserify.js":
/*!***************************************************************!*\
  !*** ./node_modules/isomorphic-fetch/fetch-npm-browserify.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("// the whatwg-fetch polyfill installs the fetch() function\n// on the global object (window or self)\n//\n// Return that as the export for use in Webpack, Browserify etc.\n__webpack_require__(/*! whatwg-fetch */ \"./node_modules/whatwg-fetch/fetch.js\");\nmodule.exports = self.fetch.bind(self);\n\n\n//# sourceURL=webpack:///./node_modules/isomorphic-fetch/fetch-npm-browserify.js?");

/***/ }),

/***/ "./node_modules/pexels/dist/main.module.js":
/*!*************************************************!*\
  !*** ./node_modules/pexels/dist/main.module.js ***!
  \*************************************************/
/*! exports provided: createClient */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* WEBPACK VAR INJECTION */(function(process) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"createClient\", function() { return i; });\nfunction r(r,t){var n={method:\"GET\",headers:{Accept:\"application/json\",\"Content-Type\":\"application/json\",Authorization:r}},e=\"photo\"===t?\"https://api.pexels.com/v1/\":\"https://api.pexels.com/videos/\";return function(r,t){return fetch(e+\"/\"+r+\"?\"+function(r){return Object.keys(r).map(function(t){return t+\"=\"+r[t]}).join(\"&\")}(t||{}),n).then(function(r){return r.json()})}}function t(r){return!(!r||!r.photos)}process;var n={__proto__:null,isPhotos:t,isVideos:function(r){return!(!r||!r.videos)},isError:function(r){return!!r.error}};function e(n){var e=r(n,\"photo\");return{search:function(r){return e(\"/search\",r)},curated:function(r){return void 0===r&&(r={}),e(\"/curated\",r)},show:function(r){return e(\"/photos/\"+r.id)},random:function(){try{var r=Math.floor(1e3*Math.random());return Promise.resolve(this.curated({page:r,per_page:1})).then(function(r){return t(r)?r.photos[0]:r})}catch(r){return Promise.reject(r)}}}}function o(t){var n=r(t,\"video\");return{search:function(r){return n(\"/search\",r)},popular:function(r){return void 0===r&&(r={}),n(\"/popular\",r)},show:function(r){return n(\"/videos/\"+r.id)}}}function i(r){if(!r||\"string\"!=typeof r)throw new TypeError(\"An ApiKey must be provided when initiating the Pexel's client.\");return{typeCheckers:n,photos:e(r),videos:o(r)}}__webpack_require__(/*! isomorphic-fetch */ \"./node_modules/isomorphic-fetch/fetch-npm-browserify.js\");\n//# sourceMappingURL=main.module.js.map\n\n/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../process/browser.js */ \"./node_modules/process/browser.js\")))\n\n//# sourceURL=webpack:///./node_modules/pexels/dist/main.module.js?");

/***/ }),

/***/ "./node_modules/process/browser.js":
/*!*****************************************!*\
  !*** ./node_modules/process/browser.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("// shim for using process in browser\nvar process = module.exports = {};\n\n// cached from whatever global is present so that test runners that stub it\n// don't break things.  But we need to wrap it in a try catch in case it is\n// wrapped in strict mode code which doesn't define any globals.  It's inside a\n// function because try/catches deoptimize in certain engines.\n\nvar cachedSetTimeout;\nvar cachedClearTimeout;\n\nfunction defaultSetTimout() {\n    throw new Error('setTimeout has not been defined');\n}\nfunction defaultClearTimeout () {\n    throw new Error('clearTimeout has not been defined');\n}\n(function () {\n    try {\n        if (typeof setTimeout === 'function') {\n            cachedSetTimeout = setTimeout;\n        } else {\n            cachedSetTimeout = defaultSetTimout;\n        }\n    } catch (e) {\n        cachedSetTimeout = defaultSetTimout;\n    }\n    try {\n        if (typeof clearTimeout === 'function') {\n            cachedClearTimeout = clearTimeout;\n        } else {\n            cachedClearTimeout = defaultClearTimeout;\n        }\n    } catch (e) {\n        cachedClearTimeout = defaultClearTimeout;\n    }\n} ())\nfunction runTimeout(fun) {\n    if (cachedSetTimeout === setTimeout) {\n        //normal enviroments in sane situations\n        return setTimeout(fun, 0);\n    }\n    // if setTimeout wasn't available but was latter defined\n    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {\n        cachedSetTimeout = setTimeout;\n        return setTimeout(fun, 0);\n    }\n    try {\n        // when when somebody has screwed with setTimeout but no I.E. maddness\n        return cachedSetTimeout(fun, 0);\n    } catch(e){\n        try {\n            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally\n            return cachedSetTimeout.call(null, fun, 0);\n        } catch(e){\n            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error\n            return cachedSetTimeout.call(this, fun, 0);\n        }\n    }\n\n\n}\nfunction runClearTimeout(marker) {\n    if (cachedClearTimeout === clearTimeout) {\n        //normal enviroments in sane situations\n        return clearTimeout(marker);\n    }\n    // if clearTimeout wasn't available but was latter defined\n    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {\n        cachedClearTimeout = clearTimeout;\n        return clearTimeout(marker);\n    }\n    try {\n        // when when somebody has screwed with setTimeout but no I.E. maddness\n        return cachedClearTimeout(marker);\n    } catch (e){\n        try {\n            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally\n            return cachedClearTimeout.call(null, marker);\n        } catch (e){\n            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.\n            // Some versions of I.E. have different rules for clearTimeout vs setTimeout\n            return cachedClearTimeout.call(this, marker);\n        }\n    }\n\n\n\n}\nvar queue = [];\nvar draining = false;\nvar currentQueue;\nvar queueIndex = -1;\n\nfunction cleanUpNextTick() {\n    if (!draining || !currentQueue) {\n        return;\n    }\n    draining = false;\n    if (currentQueue.length) {\n        queue = currentQueue.concat(queue);\n    } else {\n        queueIndex = -1;\n    }\n    if (queue.length) {\n        drainQueue();\n    }\n}\n\nfunction drainQueue() {\n    if (draining) {\n        return;\n    }\n    var timeout = runTimeout(cleanUpNextTick);\n    draining = true;\n\n    var len = queue.length;\n    while(len) {\n        currentQueue = queue;\n        queue = [];\n        while (++queueIndex < len) {\n            if (currentQueue) {\n                currentQueue[queueIndex].run();\n            }\n        }\n        queueIndex = -1;\n        len = queue.length;\n    }\n    currentQueue = null;\n    draining = false;\n    runClearTimeout(timeout);\n}\n\nprocess.nextTick = function (fun) {\n    var args = new Array(arguments.length - 1);\n    if (arguments.length > 1) {\n        for (var i = 1; i < arguments.length; i++) {\n            args[i - 1] = arguments[i];\n        }\n    }\n    queue.push(new Item(fun, args));\n    if (queue.length === 1 && !draining) {\n        runTimeout(drainQueue);\n    }\n};\n\n// v8 likes predictible objects\nfunction Item(fun, array) {\n    this.fun = fun;\n    this.array = array;\n}\nItem.prototype.run = function () {\n    this.fun.apply(null, this.array);\n};\nprocess.title = 'browser';\nprocess.browser = true;\nprocess.env = {};\nprocess.argv = [];\nprocess.version = ''; // empty string to avoid regexp issues\nprocess.versions = {};\n\nfunction noop() {}\n\nprocess.on = noop;\nprocess.addListener = noop;\nprocess.once = noop;\nprocess.off = noop;\nprocess.removeListener = noop;\nprocess.removeAllListeners = noop;\nprocess.emit = noop;\nprocess.prependListener = noop;\nprocess.prependOnceListener = noop;\n\nprocess.listeners = function (name) { return [] }\n\nprocess.binding = function (name) {\n    throw new Error('process.binding is not supported');\n};\n\nprocess.cwd = function () { return '/' };\nprocess.chdir = function (dir) {\n    throw new Error('process.chdir is not supported');\n};\nprocess.umask = function() { return 0; };\n\n\n//# sourceURL=webpack:///./node_modules/process/browser.js?");

/***/ }),

/***/ "./node_modules/whatwg-fetch/fetch.js":
/*!********************************************!*\
  !*** ./node_modules/whatwg-fetch/fetch.js ***!
  \********************************************/
/*! exports provided: Headers, Request, Response, DOMException, fetch */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Headers\", function() { return Headers; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Request\", function() { return Request; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Response\", function() { return Response; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"DOMException\", function() { return DOMException; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"fetch\", function() { return fetch; });\nvar support = {\n  searchParams: 'URLSearchParams' in self,\n  iterable: 'Symbol' in self && 'iterator' in Symbol,\n  blob:\n    'FileReader' in self &&\n    'Blob' in self &&\n    (function() {\n      try {\n        new Blob()\n        return true\n      } catch (e) {\n        return false\n      }\n    })(),\n  formData: 'FormData' in self,\n  arrayBuffer: 'ArrayBuffer' in self\n}\n\nfunction isDataView(obj) {\n  return obj && DataView.prototype.isPrototypeOf(obj)\n}\n\nif (support.arrayBuffer) {\n  var viewClasses = [\n    '[object Int8Array]',\n    '[object Uint8Array]',\n    '[object Uint8ClampedArray]',\n    '[object Int16Array]',\n    '[object Uint16Array]',\n    '[object Int32Array]',\n    '[object Uint32Array]',\n    '[object Float32Array]',\n    '[object Float64Array]'\n  ]\n\n  var isArrayBufferView =\n    ArrayBuffer.isView ||\n    function(obj) {\n      return obj && viewClasses.indexOf(Object.prototype.toString.call(obj)) > -1\n    }\n}\n\nfunction normalizeName(name) {\n  if (typeof name !== 'string') {\n    name = String(name)\n  }\n  if (/[^a-z0-9\\-#$%&'*+.^_`|~]/i.test(name)) {\n    throw new TypeError('Invalid character in header field name')\n  }\n  return name.toLowerCase()\n}\n\nfunction normalizeValue(value) {\n  if (typeof value !== 'string') {\n    value = String(value)\n  }\n  return value\n}\n\n// Build a destructive iterator for the value list\nfunction iteratorFor(items) {\n  var iterator = {\n    next: function() {\n      var value = items.shift()\n      return {done: value === undefined, value: value}\n    }\n  }\n\n  if (support.iterable) {\n    iterator[Symbol.iterator] = function() {\n      return iterator\n    }\n  }\n\n  return iterator\n}\n\nfunction Headers(headers) {\n  this.map = {}\n\n  if (headers instanceof Headers) {\n    headers.forEach(function(value, name) {\n      this.append(name, value)\n    }, this)\n  } else if (Array.isArray(headers)) {\n    headers.forEach(function(header) {\n      this.append(header[0], header[1])\n    }, this)\n  } else if (headers) {\n    Object.getOwnPropertyNames(headers).forEach(function(name) {\n      this.append(name, headers[name])\n    }, this)\n  }\n}\n\nHeaders.prototype.append = function(name, value) {\n  name = normalizeName(name)\n  value = normalizeValue(value)\n  var oldValue = this.map[name]\n  this.map[name] = oldValue ? oldValue + ', ' + value : value\n}\n\nHeaders.prototype['delete'] = function(name) {\n  delete this.map[normalizeName(name)]\n}\n\nHeaders.prototype.get = function(name) {\n  name = normalizeName(name)\n  return this.has(name) ? this.map[name] : null\n}\n\nHeaders.prototype.has = function(name) {\n  return this.map.hasOwnProperty(normalizeName(name))\n}\n\nHeaders.prototype.set = function(name, value) {\n  this.map[normalizeName(name)] = normalizeValue(value)\n}\n\nHeaders.prototype.forEach = function(callback, thisArg) {\n  for (var name in this.map) {\n    if (this.map.hasOwnProperty(name)) {\n      callback.call(thisArg, this.map[name], name, this)\n    }\n  }\n}\n\nHeaders.prototype.keys = function() {\n  var items = []\n  this.forEach(function(value, name) {\n    items.push(name)\n  })\n  return iteratorFor(items)\n}\n\nHeaders.prototype.values = function() {\n  var items = []\n  this.forEach(function(value) {\n    items.push(value)\n  })\n  return iteratorFor(items)\n}\n\nHeaders.prototype.entries = function() {\n  var items = []\n  this.forEach(function(value, name) {\n    items.push([name, value])\n  })\n  return iteratorFor(items)\n}\n\nif (support.iterable) {\n  Headers.prototype[Symbol.iterator] = Headers.prototype.entries\n}\n\nfunction consumed(body) {\n  if (body.bodyUsed) {\n    return Promise.reject(new TypeError('Already read'))\n  }\n  body.bodyUsed = true\n}\n\nfunction fileReaderReady(reader) {\n  return new Promise(function(resolve, reject) {\n    reader.onload = function() {\n      resolve(reader.result)\n    }\n    reader.onerror = function() {\n      reject(reader.error)\n    }\n  })\n}\n\nfunction readBlobAsArrayBuffer(blob) {\n  var reader = new FileReader()\n  var promise = fileReaderReady(reader)\n  reader.readAsArrayBuffer(blob)\n  return promise\n}\n\nfunction readBlobAsText(blob) {\n  var reader = new FileReader()\n  var promise = fileReaderReady(reader)\n  reader.readAsText(blob)\n  return promise\n}\n\nfunction readArrayBufferAsText(buf) {\n  var view = new Uint8Array(buf)\n  var chars = new Array(view.length)\n\n  for (var i = 0; i < view.length; i++) {\n    chars[i] = String.fromCharCode(view[i])\n  }\n  return chars.join('')\n}\n\nfunction bufferClone(buf) {\n  if (buf.slice) {\n    return buf.slice(0)\n  } else {\n    var view = new Uint8Array(buf.byteLength)\n    view.set(new Uint8Array(buf))\n    return view.buffer\n  }\n}\n\nfunction Body() {\n  this.bodyUsed = false\n\n  this._initBody = function(body) {\n    this._bodyInit = body\n    if (!body) {\n      this._bodyText = ''\n    } else if (typeof body === 'string') {\n      this._bodyText = body\n    } else if (support.blob && Blob.prototype.isPrototypeOf(body)) {\n      this._bodyBlob = body\n    } else if (support.formData && FormData.prototype.isPrototypeOf(body)) {\n      this._bodyFormData = body\n    } else if (support.searchParams && URLSearchParams.prototype.isPrototypeOf(body)) {\n      this._bodyText = body.toString()\n    } else if (support.arrayBuffer && support.blob && isDataView(body)) {\n      this._bodyArrayBuffer = bufferClone(body.buffer)\n      // IE 10-11 can't handle a DataView body.\n      this._bodyInit = new Blob([this._bodyArrayBuffer])\n    } else if (support.arrayBuffer && (ArrayBuffer.prototype.isPrototypeOf(body) || isArrayBufferView(body))) {\n      this._bodyArrayBuffer = bufferClone(body)\n    } else {\n      this._bodyText = body = Object.prototype.toString.call(body)\n    }\n\n    if (!this.headers.get('content-type')) {\n      if (typeof body === 'string') {\n        this.headers.set('content-type', 'text/plain;charset=UTF-8')\n      } else if (this._bodyBlob && this._bodyBlob.type) {\n        this.headers.set('content-type', this._bodyBlob.type)\n      } else if (support.searchParams && URLSearchParams.prototype.isPrototypeOf(body)) {\n        this.headers.set('content-type', 'application/x-www-form-urlencoded;charset=UTF-8')\n      }\n    }\n  }\n\n  if (support.blob) {\n    this.blob = function() {\n      var rejected = consumed(this)\n      if (rejected) {\n        return rejected\n      }\n\n      if (this._bodyBlob) {\n        return Promise.resolve(this._bodyBlob)\n      } else if (this._bodyArrayBuffer) {\n        return Promise.resolve(new Blob([this._bodyArrayBuffer]))\n      } else if (this._bodyFormData) {\n        throw new Error('could not read FormData body as blob')\n      } else {\n        return Promise.resolve(new Blob([this._bodyText]))\n      }\n    }\n\n    this.arrayBuffer = function() {\n      if (this._bodyArrayBuffer) {\n        return consumed(this) || Promise.resolve(this._bodyArrayBuffer)\n      } else {\n        return this.blob().then(readBlobAsArrayBuffer)\n      }\n    }\n  }\n\n  this.text = function() {\n    var rejected = consumed(this)\n    if (rejected) {\n      return rejected\n    }\n\n    if (this._bodyBlob) {\n      return readBlobAsText(this._bodyBlob)\n    } else if (this._bodyArrayBuffer) {\n      return Promise.resolve(readArrayBufferAsText(this._bodyArrayBuffer))\n    } else if (this._bodyFormData) {\n      throw new Error('could not read FormData body as text')\n    } else {\n      return Promise.resolve(this._bodyText)\n    }\n  }\n\n  if (support.formData) {\n    this.formData = function() {\n      return this.text().then(decode)\n    }\n  }\n\n  this.json = function() {\n    return this.text().then(JSON.parse)\n  }\n\n  return this\n}\n\n// HTTP methods whose capitalization should be normalized\nvar methods = ['DELETE', 'GET', 'HEAD', 'OPTIONS', 'POST', 'PUT']\n\nfunction normalizeMethod(method) {\n  var upcased = method.toUpperCase()\n  return methods.indexOf(upcased) > -1 ? upcased : method\n}\n\nfunction Request(input, options) {\n  options = options || {}\n  var body = options.body\n\n  if (input instanceof Request) {\n    if (input.bodyUsed) {\n      throw new TypeError('Already read')\n    }\n    this.url = input.url\n    this.credentials = input.credentials\n    if (!options.headers) {\n      this.headers = new Headers(input.headers)\n    }\n    this.method = input.method\n    this.mode = input.mode\n    this.signal = input.signal\n    if (!body && input._bodyInit != null) {\n      body = input._bodyInit\n      input.bodyUsed = true\n    }\n  } else {\n    this.url = String(input)\n  }\n\n  this.credentials = options.credentials || this.credentials || 'same-origin'\n  if (options.headers || !this.headers) {\n    this.headers = new Headers(options.headers)\n  }\n  this.method = normalizeMethod(options.method || this.method || 'GET')\n  this.mode = options.mode || this.mode || null\n  this.signal = options.signal || this.signal\n  this.referrer = null\n\n  if ((this.method === 'GET' || this.method === 'HEAD') && body) {\n    throw new TypeError('Body not allowed for GET or HEAD requests')\n  }\n  this._initBody(body)\n}\n\nRequest.prototype.clone = function() {\n  return new Request(this, {body: this._bodyInit})\n}\n\nfunction decode(body) {\n  var form = new FormData()\n  body\n    .trim()\n    .split('&')\n    .forEach(function(bytes) {\n      if (bytes) {\n        var split = bytes.split('=')\n        var name = split.shift().replace(/\\+/g, ' ')\n        var value = split.join('=').replace(/\\+/g, ' ')\n        form.append(decodeURIComponent(name), decodeURIComponent(value))\n      }\n    })\n  return form\n}\n\nfunction parseHeaders(rawHeaders) {\n  var headers = new Headers()\n  // Replace instances of \\r\\n and \\n followed by at least one space or horizontal tab with a space\n  // https://tools.ietf.org/html/rfc7230#section-3.2\n  var preProcessedHeaders = rawHeaders.replace(/\\r?\\n[\\t ]+/g, ' ')\n  preProcessedHeaders.split(/\\r?\\n/).forEach(function(line) {\n    var parts = line.split(':')\n    var key = parts.shift().trim()\n    if (key) {\n      var value = parts.join(':').trim()\n      headers.append(key, value)\n    }\n  })\n  return headers\n}\n\nBody.call(Request.prototype)\n\nfunction Response(bodyInit, options) {\n  if (!options) {\n    options = {}\n  }\n\n  this.type = 'default'\n  this.status = options.status === undefined ? 200 : options.status\n  this.ok = this.status >= 200 && this.status < 300\n  this.statusText = 'statusText' in options ? options.statusText : 'OK'\n  this.headers = new Headers(options.headers)\n  this.url = options.url || ''\n  this._initBody(bodyInit)\n}\n\nBody.call(Response.prototype)\n\nResponse.prototype.clone = function() {\n  return new Response(this._bodyInit, {\n    status: this.status,\n    statusText: this.statusText,\n    headers: new Headers(this.headers),\n    url: this.url\n  })\n}\n\nResponse.error = function() {\n  var response = new Response(null, {status: 0, statusText: ''})\n  response.type = 'error'\n  return response\n}\n\nvar redirectStatuses = [301, 302, 303, 307, 308]\n\nResponse.redirect = function(url, status) {\n  if (redirectStatuses.indexOf(status) === -1) {\n    throw new RangeError('Invalid status code')\n  }\n\n  return new Response(null, {status: status, headers: {location: url}})\n}\n\nvar DOMException = self.DOMException\ntry {\n  new DOMException()\n} catch (err) {\n  DOMException = function(message, name) {\n    this.message = message\n    this.name = name\n    var error = Error(message)\n    this.stack = error.stack\n  }\n  DOMException.prototype = Object.create(Error.prototype)\n  DOMException.prototype.constructor = DOMException\n}\n\nfunction fetch(input, init) {\n  return new Promise(function(resolve, reject) {\n    var request = new Request(input, init)\n\n    if (request.signal && request.signal.aborted) {\n      return reject(new DOMException('Aborted', 'AbortError'))\n    }\n\n    var xhr = new XMLHttpRequest()\n\n    function abortXhr() {\n      xhr.abort()\n    }\n\n    xhr.onload = function() {\n      var options = {\n        status: xhr.status,\n        statusText: xhr.statusText,\n        headers: parseHeaders(xhr.getAllResponseHeaders() || '')\n      }\n      options.url = 'responseURL' in xhr ? xhr.responseURL : options.headers.get('X-Request-URL')\n      var body = 'response' in xhr ? xhr.response : xhr.responseText\n      resolve(new Response(body, options))\n    }\n\n    xhr.onerror = function() {\n      reject(new TypeError('Network request failed'))\n    }\n\n    xhr.ontimeout = function() {\n      reject(new TypeError('Network request failed'))\n    }\n\n    xhr.onabort = function() {\n      reject(new DOMException('Aborted', 'AbortError'))\n    }\n\n    xhr.open(request.method, request.url, true)\n\n    if (request.credentials === 'include') {\n      xhr.withCredentials = true\n    } else if (request.credentials === 'omit') {\n      xhr.withCredentials = false\n    }\n\n    if ('responseType' in xhr && support.blob) {\n      xhr.responseType = 'blob'\n    }\n\n    request.headers.forEach(function(value, name) {\n      xhr.setRequestHeader(name, value)\n    })\n\n    if (request.signal) {\n      request.signal.addEventListener('abort', abortXhr)\n\n      xhr.onreadystatechange = function() {\n        // DONE (success or failure)\n        if (xhr.readyState === 4) {\n          request.signal.removeEventListener('abort', abortXhr)\n        }\n      }\n    }\n\n    xhr.send(typeof request._bodyInit === 'undefined' ? null : request._bodyInit)\n  })\n}\n\nfetch.polyfill = true\n\nif (!self.fetch) {\n  self.fetch = fetch\n  self.Headers = Headers\n  self.Request = Request\n  self.Response = Response\n}\n\n\n//# sourceURL=webpack:///./node_modules/whatwg-fetch/fetch.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar _pexels = __webpack_require__(/*! pexels */ \"./node_modules/pexels/dist/main.module.js\");\n\nvar client = (0, _pexels.createClient)(\"563492ad6f917000010000018b6ffaf958784d1ab7495b2ccaf858f0\");\n// please see email for contents of .env file!\n\nvar first = document.querySelector('.first');\nvar next = document.querySelector('.next');\nvar previous = document.querySelector('.previous');\nvar last = document.querySelector('.last');\n\nvar form = document.querySelector('form');\nvar input = document.querySelector('input');\nvar loadingImage = document.querySelector('#loadingImage');\nvar imageSection = document.querySelector('.grid');\n\nloadingImage.style.display = 'block';\n\nform.addEventListener('submit', formSubmitted);\n\nfunction formSubmitted(event) {\n  event.preventDefault();\n  var searchTerm = input.value;\n\n  searchStart();\n  search(searchTerm).then(displayImages).then(function () {\n    loadingImage.style.display = 'none';\n  });\n}\n\nfunction searchStart() {\n  loadingImage.style.display = '';\n  imageSection.innerHTML = '';\n}\n\nfunction search(searchTerm) {\n  pictureList = [];\n  var query = searchTerm;\n  return client.photos.search({ query: query, per_page: 50 }).then(function (photos) {\n    return photos.photos;\n  });\n}\n\nvar pictureList = [];\nvar page = 0;\n\nfunction displayImages(images) {\n  for (var _i in images) {\n    var imageElement = document.createElement('img');\n    imageElement.src = images[_i].src.large;\n    imageElement.style.borderRadius = \"30px\";\n    imageElement.setAttribute('class', 'myImg');\n    imageElement.alt = 'Photographer: ' + images[_i].photographer;\n    imageElement.id = images[_i].id;\n    pictureList.push(imageElement);\n  };\n\n  page == pictureList.length - 10 ? page = 0 : page += 10;\n  imageSection.innerHTML = \"\";\n  for (var i = page; i < page + 10; i++) {\n    imageSection.appendChild(pictureList[i]);\n  }\n}\n\n/* PAGINATION */\n\nnext.addEventListener(\"click\", function () {\n  page == pictureList.length - 10 ? page = 0 : page += 10;\n  imageSection.innerHTML = \"\";\n  for (var i = page; i < page + 10; i++) {\n    imageSection.appendChild(pictureList[i]);\n  }\n  console.log(pictureList);\n});\n\nprevious.addEventListener(\"click\", function () {\n  page == 0 ? page = pictureList.length - 10 : page -= 10;\n  imageSection.innerHTML = \"\";\n  for (var i = page; i < page + 10; i++) {\n    imageSection.appendChild(pictureList[i]);\n  }\n});\n\nfirst.addEventListener(\"click\", function () {\n  page = 0;\n  imageSection.innerHTML = \"\";\n  for (var i = page; i < page + 10; i++) {\n    imageSection.appendChild(pictureList[i]);\n  }\n});\n\nlast.addEventListener(\"click\", function () {\n  page = pictureList.length - 10;\n  imageSection.innerHTML = \"\";\n  for (var i = page; i < page + 10; i++) {\n    imageSection.appendChild(pictureList[i]);\n  }\n});\n\n/* MODAL */\n\n// Get the modal\nvar modal = document.getElementById(\"myModal\");\n\n// Get the image and insert it inside the modal - use its \"alt\" text as a caption\nvar modalImg = document.getElementById(\"img01\");\nvar captionText = document.getElementById(\"caption\");\n\ndocument.addEventListener('click', function (event) {\n\n  if (event.target.matches('img.myImg')) {\n    var img = document.getElementById(event.target.id);\n\n    modal.style.display = \"block\";\n    modalImg.src = img.src;\n    modalImg.alt = img.alt;\n    captionText.innerHTML = img.alt;\n  }\n\n  if (event.target.matches('.close')) {\n    // Get the <span> element that closes the modal\n    // When the user clicks on <span> (x), close the modal\n    modal.style.display = \"none\";\n  }\n}, false);\n\n/* Hover */\n\ndocument.addEventListener('mouseover', function (event) {\n  // code from mouseover hover function goes here\n  if (event.target.matches('img.myImg')) {\n    var e = document.getElementById(event.target.id);\n    e.style.opacity = \"0.7\";\n    e.style.cursor = \"pointer\";\n  }\n});\n\ndocument.addEventListener('mouseout', function (event) {\n  // code from mouseover hover function goes here\n  if (event.target.matches('img.myImg')) {\n    var e = document.getElementById(event.target.id);\n    e.style.opacity = \"1.0\";\n    e.style.cursor = \"none\";\n  }\n});\n\n//# sourceURL=webpack:///./src/index.js?");

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