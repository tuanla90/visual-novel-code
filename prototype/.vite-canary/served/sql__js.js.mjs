import { t as __commonJSMin } from "file:///D:/Users/tuanla2/game/learn-code-by-game/.claude/worktrees/core-game-design-feedback-57225c/prototype/.vite-canary/served/rolldown-runtime-BPOCksWG.js.mjs";
//#region ../../../../prototype/node_modules/sql.js/dist/sql-wasm-browser.js
var require_sql_wasm_browser = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var initSqlJsPromise = void 0;
	var initSqlJs = function(moduleConfig) {
		if (initSqlJsPromise) return initSqlJsPromise;
		initSqlJsPromise = new Promise(function(resolveModule, reject) {
			var Module = typeof moduleConfig !== "undefined" ? moduleConfig : {};
			var originalOnAbortFunction = Module["onAbort"];
			Module["onAbort"] = function(errorThatCausedAbort) {
				reject(new Error(errorThatCausedAbort));
				if (originalOnAbortFunction) originalOnAbortFunction(errorThatCausedAbort);
			};
			Module["postRun"] = Module["postRun"] || [];
			Module["postRun"].push(function() {
				resolveModule(Module);
			});
			module = void 0;
			var k;
			k ||= typeof Module != "undefined" ? Module : {};
			var aa = !!globalThis.window, ba = !!globalThis.WorkerGlobalScope;
			k.onRuntimeInitialized = function() {
				function a(f, l) {
					switch (typeof l) {
						case "boolean":
							bc(f, l ? 1 : 0);
							break;
						case "number":
							cc(f, l);
							break;
						case "string":
							dc(f, l, -1, -1);
							break;
						case "object":
							if (null === l) eb(f);
							else if (null != l.length) {
								var n = ca(l.length);
								m.set(l, n);
								ec(f, n, l.length, -1);
								da(n);
							} else ua(f, "Wrong API use : tried to return a value of an unknown type (" + l + ").", -1);
							break;
						default: eb(f);
					}
				}
				function b(f, l) {
					for (var n = [], p = 0; p < f; p += 1) {
						var r = t(l + 4 * p, "i32"), v = fc(r);
						if (1 === v || 2 === v) r = gc(r);
						else if (3 === v) r = hc(r);
						else if (4 === v) {
							v = r;
							r = ic(v);
							v = jc(v);
							for (var J = new Uint8Array(r), I = 0; I < r; I += 1) J[I] = m[v + I];
							r = J;
						} else r = null;
						n.push(r);
					}
					return n;
				}
				function c(f, l) {
					this.Qa = f;
					this.db = l;
					this.Oa = 1;
					this.yb = [];
				}
				function d(f, l) {
					this.db = l;
					this.ob = ea(f);
					if (null === this.ob) throw Error("Unable to allocate memory for the SQL string");
					this.ub = this.ob;
					this.gb = this.Fb = null;
				}
				function e(f) {
					this.filename = "dbfile_" + (4294967295 * Math.random() >>> 0);
					if (null != f) {
						var l = this.filename, n = "/", p = l;
						n && (n = "string" == typeof n ? n : fa(n), p = l ? ha(n + "/" + l) : n);
						l = ia(!0, !0);
						p = ja(p, l);
						if (f) {
							if ("string" == typeof f) {
								n = Array(f.length);
								for (var r = 0, v = f.length; r < v; ++r) n[r] = f.charCodeAt(r);
								f = n;
							}
							ka(p, l | 146);
							n = ma(p, 577);
							na(n, f, 0, f.length, 0);
							oa(n);
							ka(p, l);
						}
					}
					this.handleError(q(this.filename, g));
					this.db = t(g, "i32");
					hb(this.db);
					this.pb = {};
					this.Sa = {};
				}
				var g = y(4), h = k.cwrap, q = h("sqlite3_open", "number", ["string", "number"]), w = h("sqlite3_close_v2", "number", ["number"]), u = h("sqlite3_exec", "number", [
					"number",
					"string",
					"number",
					"number",
					"number"
				]), x = h("sqlite3_changes", "number", ["number"]), D = h("sqlite3_prepare_v2", "number", [
					"number",
					"string",
					"number",
					"number",
					"number"
				]), ib = h("sqlite3_sql", "string", ["number"]), lc = h("sqlite3_normalized_sql", "string", ["number"]), jb = h("sqlite3_prepare_v2", "number", [
					"number",
					"number",
					"number",
					"number",
					"number"
				]), mc = h("sqlite3_bind_text", "number", [
					"number",
					"number",
					"number",
					"number",
					"number"
				]), kb = h("sqlite3_bind_blob", "number", [
					"number",
					"number",
					"number",
					"number",
					"number"
				]), nc = h("sqlite3_bind_double", "number", [
					"number",
					"number",
					"number"
				]), oc = h("sqlite3_bind_int", "number", [
					"number",
					"number",
					"number"
				]), pc = h("sqlite3_bind_parameter_index", "number", ["number", "string"]), qc = h("sqlite3_step", "number", ["number"]), rc = h("sqlite3_errmsg", "string", ["number"]), sc = h("sqlite3_column_count", "number", ["number"]), tc = h("sqlite3_data_count", "number", ["number"]), uc = h("sqlite3_column_double", "number", ["number", "number"]), lb = h("sqlite3_column_text", "string", ["number", "number"]), vc = h("sqlite3_column_blob", "number", ["number", "number"]), wc = h("sqlite3_column_bytes", "number", ["number", "number"]), xc = h("sqlite3_column_type", "number", ["number", "number"]), yc = h("sqlite3_column_name", "string", ["number", "number"]), zc = h("sqlite3_reset", "number", ["number"]), Ac = h("sqlite3_clear_bindings", "number", ["number"]), Bc = h("sqlite3_finalize", "number", ["number"]), mb = h("sqlite3_create_function_v2", "number", "number string number number number number number number number".split(" ")), fc = h("sqlite3_value_type", "number", ["number"]), ic = h("sqlite3_value_bytes", "number", ["number"]), hc = h("sqlite3_value_text", "string", ["number"]), jc = h("sqlite3_value_blob", "number", ["number"]), gc = h("sqlite3_value_double", "number", ["number"]), cc = h("sqlite3_result_double", "", ["number", "number"]), eb = h("sqlite3_result_null", "", ["number"]), dc = h("sqlite3_result_text", "", [
					"number",
					"string",
					"number",
					"number"
				]), ec = h("sqlite3_result_blob", "", [
					"number",
					"number",
					"number",
					"number"
				]), bc = h("sqlite3_result_int", "", ["number", "number"]), ua = h("sqlite3_result_error", "", [
					"number",
					"string",
					"number"
				]), nb = h("sqlite3_aggregate_context", "number", ["number", "number"]), hb = h("RegisterExtensionFunctions", "number", ["number"]), ob = h("sqlite3_update_hook", "number", [
					"number",
					"number",
					"number"
				]);
				c.prototype.bind = function(f) {
					if (!this.Qa) throw "Statement closed";
					this.reset();
					return Array.isArray(f) ? this.Wb(f) : null != f && "object" === typeof f ? this.Xb(f) : !0;
				};
				c.prototype.step = function() {
					if (!this.Qa) throw "Statement closed";
					this.Oa = 1;
					var f = qc(this.Qa);
					switch (f) {
						case 100: return !0;
						case 101: return !1;
						default: throw this.db.handleError(f);
					}
				};
				c.prototype.Pb = function(f) {
					f ?? (f = this.Oa, this.Oa += 1);
					return uc(this.Qa, f);
				};
				c.prototype.hc = function(f) {
					f ?? (f = this.Oa, this.Oa += 1);
					f = lb(this.Qa, f);
					if ("function" !== typeof BigInt) throw Error("BigInt is not supported");
					return BigInt(f);
				};
				c.prototype.mc = function(f) {
					f ?? (f = this.Oa, this.Oa += 1);
					return lb(this.Qa, f);
				};
				c.prototype.getBlob = function(f) {
					f ?? (f = this.Oa, this.Oa += 1);
					var l = wc(this.Qa, f);
					f = vc(this.Qa, f);
					for (var n = new Uint8Array(l), p = 0; p < l; p += 1) n[p] = m[f + p];
					return n;
				};
				c.prototype.get = function(f, l) {
					l = l || {};
					null != f && this.bind(f) && this.step();
					f = [];
					for (var n = tc(this.Qa), p = 0; p < n; p += 1) switch (xc(this.Qa, p)) {
						case 1:
							var r = l.useBigInt ? this.hc(p) : this.Pb(p);
							f.push(r);
							break;
						case 2:
							f.push(this.Pb(p));
							break;
						case 3:
							f.push(this.mc(p));
							break;
						case 4:
							f.push(this.getBlob(p));
							break;
						default: f.push(null);
					}
					return f;
				};
				c.prototype.Db = function() {
					for (var f = [], l = sc(this.Qa), n = 0; n < l; n += 1) f.push(yc(this.Qa, n));
					return f;
				};
				c.prototype.Ob = function(f, l) {
					f = this.get(f, l);
					l = this.Db();
					for (var n = {}, p = 0; p < l.length; p += 1) n[l[p]] = f[p];
					return n;
				};
				c.prototype.lc = function() {
					return ib(this.Qa);
				};
				c.prototype.ic = function() {
					return lc(this.Qa);
				};
				c.prototype.Jb = function(f) {
					null != f && this.bind(f);
					this.step();
					return this.reset();
				};
				c.prototype.Lb = function(f, l) {
					l ?? (l = this.Oa, this.Oa += 1);
					f = ea(f);
					this.yb.push(f);
					this.db.handleError(mc(this.Qa, l, f, -1, 0));
				};
				c.prototype.Vb = function(f, l) {
					l ?? (l = this.Oa, this.Oa += 1);
					var n = ca(f.length);
					m.set(f, n);
					this.yb.push(n);
					this.db.handleError(kb(this.Qa, l, n, f.length, 0));
				};
				c.prototype.Kb = function(f, l) {
					l ?? (l = this.Oa, this.Oa += 1);
					this.db.handleError((f === (f | 0) ? oc : nc)(this.Qa, l, f));
				};
				c.prototype.Yb = function(f) {
					f ?? (f = this.Oa, this.Oa += 1);
					kb(this.Qa, f, 0, 0, 0);
				};
				c.prototype.Mb = function(f, l) {
					l ?? (l = this.Oa, this.Oa += 1);
					switch (typeof f) {
						case "string":
							this.Lb(f, l);
							return;
						case "number":
							this.Kb(f, l);
							return;
						case "bigint":
							this.Lb(f.toString(), l);
							return;
						case "boolean":
							this.Kb(f + 0, l);
							return;
						case "object":
							if (null === f) {
								this.Yb(l);
								return;
							}
							if (null != f.length) {
								this.Vb(f, l);
								return;
							}
					}
					throw "Wrong API use : tried to bind a value of an unknown type (" + f + ").";
				};
				c.prototype.Xb = function(f) {
					var l = this;
					Object.keys(f).forEach(function(n) {
						var p = pc(l.Qa, n);
						0 !== p && l.Mb(f[n], p);
					});
					return !0;
				};
				c.prototype.Wb = function(f) {
					for (var l = 0; l < f.length; l += 1) this.Mb(f[l], l + 1);
					return !0;
				};
				c.prototype.reset = function() {
					this.Cb();
					return 0 === Ac(this.Qa) && 0 === zc(this.Qa);
				};
				c.prototype.Cb = function() {
					for (var f; void 0 !== (f = this.yb.pop());) da(f);
				};
				c.prototype.cb = function() {
					this.Cb();
					var f = 0 === Bc(this.Qa);
					delete this.db.pb[this.Qa];
					this.Qa = 0;
					return f;
				};
				d.prototype.next = function() {
					if (null === this.ob) return { done: !0 };
					null !== this.gb && (this.gb.cb(), this.gb = null);
					if (!this.db.db) throw this.Ab(), Error("Database closed");
					var f = pa(), l = y(4);
					qa(g);
					qa(l);
					try {
						this.db.handleError(jb(this.db.db, this.ub, -1, g, l));
						this.ub = t(l, "i32");
						var n = t(g, "i32");
						if (0 === n) return this.Ab(), { done: !0 };
						this.gb = new c(n, this.db);
						this.db.pb[n] = this.gb;
						return {
							value: this.gb,
							done: !1
						};
					} catch (p) {
						throw this.Fb = z(this.ub), this.Ab(), p;
					} finally {
						ra(f);
					}
				};
				d.prototype.Ab = function() {
					da(this.ob);
					this.ob = null;
				};
				d.prototype.jc = function() {
					return null !== this.Fb ? this.Fb : z(this.ub);
				};
				"function" === typeof Symbol && "symbol" === typeof Symbol.iterator && (d.prototype[Symbol.iterator] = function() {
					return this;
				});
				e.prototype.Jb = function(f, l) {
					if (!this.db) throw "Database closed";
					if (l) {
						f = this.Gb(f, l);
						try {
							f.step();
						} finally {
							f.cb();
						}
					} else this.handleError(u(this.db, f, 0, 0, g));
					return this;
				};
				e.prototype.exec = function(f, l, n) {
					if (!this.db) throw "Database closed";
					var p = pa(), r = null, v = null, J = null;
					try {
						J = v = ea(f);
						var I = y(4);
						for (f = []; 0 !== t(J, "i8");) {
							qa(g);
							qa(I);
							this.handleError(jb(this.db, J, -1, g, I));
							var L = t(g, "i32");
							J = t(I, "i32");
							if (0 !== L) {
								var G = null;
								r = new c(L, this);
								for (null != l && r.bind(l); r.step();) null === G && (G = {
									columns: r.Db(),
									values: []
								}, f.push(G)), G.values.push(r.get(null, n));
								r.cb();
							}
						}
						return f;
					} catch (la) {
						throw r && r.cb(), la;
					} finally {
						v && da(v), ra(p);
					}
				};
				e.prototype.ec = function(f, l, n, p, r) {
					"function" === typeof l && (p = n, n = l, l = void 0);
					f = this.Gb(f, l);
					try {
						for (; f.step();) n(f.Ob(null, r));
					} finally {
						f.cb();
					}
					if ("function" === typeof p) return p();
				};
				e.prototype.Gb = function(f, l) {
					qa(g);
					this.handleError(D(this.db, f, -1, g, 0));
					f = t(g, "i32");
					if (0 === f) throw "Nothing to prepare";
					var n = new c(f, this);
					null != l && n.bind(l);
					return this.pb[f] = n;
				};
				e.prototype.pc = function(f) {
					return new d(f, this);
				};
				e.prototype.fc = function() {
					Object.values(this.pb).forEach(function(l) {
						l.cb();
					});
					Object.values(this.Sa).forEach(A);
					this.Sa = {};
					this.handleError(w(this.db));
					var f = sa(this.filename);
					this.handleError(q(this.filename, g));
					this.db = t(g, "i32");
					hb(this.db);
					return f;
				};
				e.prototype.close = function() {
					null !== this.db && (Object.values(this.pb).forEach(function(f) {
						f.cb();
					}), Object.values(this.Sa).forEach(A), this.Sa = {}, this.fb && (A(this.fb), this.fb = void 0), this.handleError(w(this.db)), ta("/" + this.filename), this.db = null);
				};
				e.prototype.handleError = function(f) {
					if (0 === f) return null;
					f = rc(this.db);
					throw Error(f);
				};
				e.prototype.kc = function() {
					return x(this.db);
				};
				e.prototype.bc = function(f, l) {
					Object.prototype.hasOwnProperty.call(this.Sa, f) && (A(this.Sa[f]), delete this.Sa[f]);
					var n = va(function(p, r, v) {
						r = b(r, v);
						try {
							var J = l.apply(null, r);
						} catch (I) {
							ua(p, I, -1);
							return;
						}
						a(p, J);
					}, "viii");
					this.Sa[f] = n;
					this.handleError(mb(this.db, f, l.length, 1, 0, n, 0, 0, 0));
					return this;
				};
				e.prototype.ac = function(f, l) {
					var n = l.init || function() {
						return null;
					}, p = l.finalize || function(L) {
						return L;
					}, r = l.step;
					if (!r) throw "An aggregate function must have a step function in " + f;
					var v = {};
					Object.hasOwnProperty.call(this.Sa, f) && (A(this.Sa[f]), delete this.Sa[f]);
					l = f + "__finalize";
					Object.hasOwnProperty.call(this.Sa, l) && (A(this.Sa[l]), delete this.Sa[l]);
					var J = va(function(L, G, la) {
						var V = nb(L, 1);
						Object.hasOwnProperty.call(v, V) || (v[V] = n());
						G = b(G, la);
						G = [v[V]].concat(G);
						try {
							v[V] = r.apply(null, G);
						} catch (Dc) {
							delete v[V], ua(L, Dc, -1);
						}
					}, "viii"), I = va(function(L) {
						var G = nb(L, 1);
						try {
							var la = p(v[G]);
						} catch (V) {
							delete v[G];
							ua(L, V, -1);
							return;
						}
						a(L, la);
						delete v[G];
					}, "vi");
					this.Sa[f] = J;
					this.Sa[l] = I;
					this.handleError(mb(this.db, f, r.length - 1, 1, 0, 0, J, I, 0));
					return this;
				};
				e.prototype.vc = function(f) {
					this.fb && (ob(this.db, 0, 0), A(this.fb), this.fb = void 0);
					if (!f) return this;
					this.fb = va(function(l, n, p, r, v) {
						switch (n) {
							case 18:
								l = "insert";
								break;
							case 23:
								l = "update";
								break;
							case 9:
								l = "delete";
								break;
							default: throw "unknown operationCode in updateHook callback: " + n;
						}
						p = z(p);
						r = z(r);
						if (v > Number.MAX_SAFE_INTEGER) throw "rowId too big to fit inside a Number";
						f(l, p, r, Number(v));
					}, "viiiij");
					ob(this.db, this.fb, 0);
					return this;
				};
				c.prototype.bind = c.prototype.bind;
				c.prototype.step = c.prototype.step;
				c.prototype.get = c.prototype.get;
				c.prototype.getColumnNames = c.prototype.Db;
				c.prototype.getAsObject = c.prototype.Ob;
				c.prototype.getSQL = c.prototype.lc;
				c.prototype.getNormalizedSQL = c.prototype.ic;
				c.prototype.run = c.prototype.Jb;
				c.prototype.reset = c.prototype.reset;
				c.prototype.freemem = c.prototype.Cb;
				c.prototype.free = c.prototype.cb;
				d.prototype.next = d.prototype.next;
				d.prototype.getRemainingSQL = d.prototype.jc;
				e.prototype.run = e.prototype.Jb;
				e.prototype.exec = e.prototype.exec;
				e.prototype.each = e.prototype.ec;
				e.prototype.prepare = e.prototype.Gb;
				e.prototype.iterateStatements = e.prototype.pc;
				e.prototype["export"] = e.prototype.fc;
				e.prototype.close = e.prototype.close;
				e.prototype.handleError = e.prototype.handleError;
				e.prototype.getRowsModified = e.prototype.kc;
				e.prototype.create_function = e.prototype.bc;
				e.prototype.create_aggregate = e.prototype.ac;
				e.prototype.updateHook = e.prototype.vc;
				k.Database = e;
			};
			var wa = "./this.program", xa = globalThis.document?.currentScript?.src;
			ba && (xa = self.location.href);
			var ya = "", za, Aa;
			if (aa || ba) {
				try {
					ya = new URL(".", xa).href;
				} catch {}
				ba && (Aa = (a) => {
					var b = new XMLHttpRequest();
					b.open("GET", a, !1);
					b.responseType = "arraybuffer";
					b.send(null);
					return new Uint8Array(b.response);
				});
				za = async (a) => {
					a = await fetch(a, { credentials: "same-origin" });
					if (a.ok) return a.arrayBuffer();
					throw Error(a.status + " : " + a.url);
				};
			}
			var Ba = console.log.bind(console), B = console.error.bind(console), Ca, Da = !1, Ea, m, C, Fa, E, F, Ga, Ha, H;
			function Ia() {
				var a = Ja.buffer;
				m = new Int8Array(a);
				Fa = new Int16Array(a);
				C = new Uint8Array(a);
				new Uint16Array(a);
				E = new Int32Array(a);
				F = new Uint32Array(a);
				Ga = new Float32Array(a);
				Ha = new Float64Array(a);
				H = new BigInt64Array(a);
				new BigUint64Array(a);
			}
			function Ka(a) {
				k.onAbort?.(a);
				a = "Aborted(" + a + ")";
				B(a);
				Da = !0;
				throw new WebAssembly.RuntimeError(a + ". Build with -sASSERTIONS for more info.");
			}
			var La;
			async function Ma(a) {
				if (!Ca) try {
					var b = await za(a);
					return new Uint8Array(b);
				} catch {}
				if (a == La && Ca) a = new Uint8Array(Ca);
				else if (Aa) a = Aa(a);
				else throw "both async and sync fetching of the wasm failed";
				return a;
			}
			async function Na(a, b) {
				try {
					var c = await Ma(a);
					return await WebAssembly.instantiate(c, b);
				} catch (d) {
					B(`failed to asynchronously prepare wasm: ${d}`), Ka(d);
				}
			}
			async function Oa(a) {
				var b = La;
				if (!Ca) try {
					var c = fetch(b, { credentials: "same-origin" });
					return await WebAssembly.instantiateStreaming(c, a);
				} catch (d) {
					B(`wasm streaming compile failed: ${d}`), B("falling back to ArrayBuffer instantiation");
				}
				return Na(b, a);
			}
			class Pa {
				name = "ExitStatus";
				constructor(a) {
					this.message = `Program terminated with exit(${a})`;
					this.status = a;
				}
			}
			var Qa = (a) => {
				for (; 0 < a.length;) a.shift()(k);
			}, Ra = [], Sa = [], Ta = () => {
				var a = k.preRun.shift();
				Sa.push(a);
			}, K = 0, Ua = null;
			function t(a, b = "i8") {
				b.endsWith("*") && (b = "*");
				switch (b) {
					case "i1": return m[a];
					case "i8": return m[a];
					case "i16": return Fa[a >> 1];
					case "i32": return E[a >> 2];
					case "i64": return H[a >> 3];
					case "float": return Ga[a >> 2];
					case "double": return Ha[a >> 3];
					case "*": return F[a >> 2];
					default: Ka(`invalid type for getValue: ${b}`);
				}
			}
			var Va = !0;
			function qa(a) {
				var b = "i32";
				b.endsWith("*") && (b = "*");
				switch (b) {
					case "i1":
						m[a] = 0;
						break;
					case "i8":
						m[a] = 0;
						break;
					case "i16":
						Fa[a >> 1] = 0;
						break;
					case "i32":
						E[a >> 2] = 0;
						break;
					case "i64":
						H[a >> 3] = BigInt(0);
						break;
					case "float":
						Ga[a >> 2] = 0;
						break;
					case "double":
						Ha[a >> 3] = 0;
						break;
					case "*":
						F[a >> 2] = 0;
						break;
					default: Ka(`invalid type for setValue: ${b}`);
				}
			}
			var Wa = new TextDecoder(), Xa = (a, b, c, d) => {
				c = b + c;
				if (d) return c;
				for (; a[b] && !(b >= c);) ++b;
				return b;
			}, z = (a, b, c) => a ? Wa.decode(C.subarray(a, Xa(C, a, b, c))) : "", Ya = (a, b) => {
				for (var c = 0, d = a.length - 1; 0 <= d; d--) {
					var e = a[d];
					"." === e ? a.splice(d, 1) : ".." === e ? (a.splice(d, 1), c++) : c && (a.splice(d, 1), c--);
				}
				if (b) for (; c; c--) a.unshift("..");
				return a;
			}, ha = (a) => {
				var b = "/" === a.charAt(0), c = "/" === a.slice(-1);
				(a = Ya(a.split("/").filter((d) => !!d), !b).join("/")) || b || (a = ".");
				a && c && (a += "/");
				return (b ? "/" : "") + a;
			}, Za = (a) => {
				var b = /^(\/?|)([\s\S]*?)((?:\.{1,2}|[^\/]+?|)(\.[^.\/]*|))(?:[\/]*)$/.exec(a).slice(1);
				a = b[0];
				b = b[1];
				if (!a && !b) return ".";
				b &&= b.slice(0, -1);
				return a + b;
			}, $a = (a) => a && a.match(/([^\/]+|\/)\/*$/)[1], ab = () => (a) => crypto.getRandomValues(a), bb = (a) => {
				(bb = ab())(a);
			}, cb = (...a) => {
				for (var b = "", c = !1, d = a.length - 1; -1 <= d && !c; d--) {
					c = 0 <= d ? a[d] : "/";
					if ("string" != typeof c) throw new TypeError("Arguments to path.resolve must be strings");
					if (!c) return "";
					b = c + "/" + b;
					c = "/" === c.charAt(0);
				}
				b = Ya(b.split("/").filter((e) => !!e), !c).join("/");
				return (c ? "/" : "") + b || ".";
			}, db = (a) => {
				var b = Xa(a, 0);
				return Wa.decode(a.buffer ? a.subarray(0, b) : new Uint8Array(a.slice(0, b)));
			}, fb = [], gb = (a) => {
				for (var b = 0, c = 0; c < a.length; ++c) {
					var d = a.charCodeAt(c);
					127 >= d ? b++ : 2047 >= d ? b += 2 : 55296 <= d && 57343 >= d ? (b += 4, ++c) : b += 3;
				}
				return b;
			}, M = (a, b, c, d) => {
				if (!(0 < d)) return 0;
				var e = c;
				d = c + d - 1;
				for (var g = 0; g < a.length; ++g) {
					var h = a.codePointAt(g);
					if (127 >= h) {
						if (c >= d) break;
						b[c++] = h;
					} else if (2047 >= h) {
						if (c + 1 >= d) break;
						b[c++] = 192 | h >> 6;
						b[c++] = 128 | h & 63;
					} else if (65535 >= h) {
						if (c + 2 >= d) break;
						b[c++] = 224 | h >> 12;
						b[c++] = 128 | h >> 6 & 63;
						b[c++] = 128 | h & 63;
					} else {
						if (c + 3 >= d) break;
						b[c++] = 240 | h >> 18;
						b[c++] = 128 | h >> 12 & 63;
						b[c++] = 128 | h >> 6 & 63;
						b[c++] = 128 | h & 63;
						g++;
					}
				}
				b[c] = 0;
				return c - e;
			}, pb = [];
			function qb(a, b) {
				pb[a] = {
					input: [],
					output: [],
					kb: b
				};
				rb(a, sb);
			}
			var sb = {
				open(a) {
					var b = pb[a.node.nb];
					if (!b) throw new N(43);
					a.Va = b;
					a.seekable = !1;
				},
				close(a) {
					a.Va.kb.lb(a.Va);
				},
				lb(a) {
					a.Va.kb.lb(a.Va);
				},
				read(a, b, c, d) {
					if (!a.Va || !a.Va.kb.Qb) throw new N(60);
					for (var e = 0, g = 0; g < d; g++) {
						try {
							var h = a.Va.kb.Qb(a.Va);
						} catch (q) {
							throw new N(29);
						}
						if (void 0 === h && 0 === e) throw new N(6);
						if (null === h || void 0 === h) break;
						e++;
						b[c + g] = h;
					}
					e && (a.node.$a = Date.now());
					return e;
				},
				write(a, b, c, d) {
					if (!a.Va || !a.Va.kb.Hb) throw new N(60);
					try {
						for (var e = 0; e < d; e++) a.Va.kb.Hb(a.Va, b[c + e]);
					} catch (g) {
						throw new N(29);
					}
					d && (a.node.Ua = a.node.Ta = Date.now());
					return e;
				}
			}, tb = {
				Qb() {
					a: {
						if (!fb.length) {
							var a = null;
							globalThis.window?.prompt && (a = window.prompt("Input: "), null !== a && (a += "\n"));
							if (!a) {
								var b = null;
								break a;
							}
							b = Array(gb(a) + 1);
							a = M(a, b, 0, b.length);
							b.length = a;
							fb = b;
						}
						b = fb.shift();
					}
					return b;
				},
				Hb(a, b) {
					null === b || 10 === b ? (Ba(db(a.output)), a.output = []) : 0 != b && a.output.push(b);
				},
				lb(a) {
					0 < a.output?.length && (Ba(db(a.output)), a.output = []);
				},
				Dc() {
					return {
						yc: 25856,
						Ac: 5,
						xc: 191,
						zc: 35387,
						wc: [
							3,
							28,
							127,
							21,
							4,
							0,
							1,
							0,
							17,
							19,
							26,
							0,
							18,
							15,
							23,
							22,
							0,
							0,
							0,
							0,
							0,
							0,
							0,
							0,
							0,
							0,
							0,
							0,
							0,
							0,
							0,
							0
						]
					};
				},
				Ec() {
					return 0;
				},
				Fc() {
					return [24, 80];
				}
			}, ub = {
				Hb(a, b) {
					null === b || 10 === b ? (B(db(a.output)), a.output = []) : 0 != b && a.output.push(b);
				},
				lb(a) {
					0 < a.output?.length && (B(db(a.output)), a.output = []);
				}
			}, O = {
				Za: null,
				ab() {
					return O.createNode(null, "/", 16895, 0);
				},
				createNode(a, b, c, d) {
					if (24576 === (c & 61440) || 4096 === (c & 61440)) throw new N(63);
					O.Za || (O.Za = {
						dir: {
							node: {
								Wa: O.La.Wa,
								Xa: O.La.Xa,
								mb: O.La.mb,
								rb: O.La.rb,
								Tb: O.La.Tb,
								xb: O.La.xb,
								vb: O.La.vb,
								Ib: O.La.Ib,
								wb: O.La.wb
							},
							stream: { Ya: O.Ma.Ya }
						},
						file: {
							node: {
								Wa: O.La.Wa,
								Xa: O.La.Xa
							},
							stream: {
								Ya: O.Ma.Ya,
								read: O.Ma.read,
								write: O.Ma.write,
								sb: O.Ma.sb,
								tb: O.Ma.tb
							}
						},
						link: {
							node: {
								Wa: O.La.Wa,
								Xa: O.La.Xa,
								eb: O.La.eb
							},
							stream: {}
						},
						Nb: {
							node: {
								Wa: O.La.Wa,
								Xa: O.La.Xa
							},
							stream: vb
						}
					});
					c = wb(a, b, c, d);
					P(c.mode) ? (c.La = O.Za.dir.node, c.Ma = O.Za.dir.stream, c.Na = {}) : 32768 === (c.mode & 61440) ? (c.La = O.Za.file.node, c.Ma = O.Za.file.stream, c.Ra = 0, c.Na = null) : 40960 === (c.mode & 61440) ? (c.La = O.Za.link.node, c.Ma = O.Za.link.stream) : 8192 === (c.mode & 61440) && (c.La = O.Za.Nb.node, c.Ma = O.Za.Nb.stream);
					c.$a = c.Ua = c.Ta = Date.now();
					a && (a.Na[b] = c, a.$a = a.Ua = a.Ta = c.$a);
					return c;
				},
				Cc(a) {
					return a.Na ? a.Na.subarray ? a.Na.subarray(0, a.Ra) : new Uint8Array(a.Na) : /* @__PURE__ */ new Uint8Array(0);
				},
				La: {
					Wa(a) {
						var b = {};
						b.cc = 8192 === (a.mode & 61440) ? a.id : 1;
						b.oc = a.id;
						b.mode = a.mode;
						b.rc = 1;
						b.uid = 0;
						b.nc = 0;
						b.nb = a.nb;
						P(a.mode) ? b.size = 4096 : 32768 === (a.mode & 61440) ? b.size = a.Ra : 40960 === (a.mode & 61440) ? b.size = a.link.length : b.size = 0;
						b.$a = new Date(a.$a);
						b.Ua = new Date(a.Ua);
						b.Ta = new Date(a.Ta);
						b.Zb = 4096;
						b.$b = Math.ceil(b.size / b.Zb);
						return b;
					},
					Xa(a, b) {
						for (var c of [
							"mode",
							"atime",
							"mtime",
							"ctime"
						]) null != b[c] && (a[c] = b[c]);
						void 0 !== b.size && (b = b.size, a.Ra != b && (0 == b ? (a.Na = null, a.Ra = 0) : (c = a.Na, a.Na = new Uint8Array(b), c && a.Na.set(c.subarray(0, Math.min(b, a.Ra))), a.Ra = b)));
					},
					mb() {
						O.zb || (O.zb = new N(44), O.zb.stack = "<generic error, no stack>");
						throw O.zb;
					},
					rb(a, b, c, d) {
						return O.createNode(a, b, c, d);
					},
					Tb(a, b, c) {
						try {
							var d = Q(b, c);
						} catch (g) {}
						if (d) {
							if (P(a.mode)) for (var e in d.Na) throw new N(55);
							xb(d);
						}
						delete a.parent.Na[a.name];
						b.Na[c] = a;
						a.name = c;
						b.Ta = b.Ua = a.parent.Ta = a.parent.Ua = Date.now();
					},
					xb(a, b) {
						delete a.Na[b];
						a.Ta = a.Ua = Date.now();
					},
					vb(a, b) {
						var c = Q(a, b), d;
						for (d in c.Na) throw new N(55);
						delete a.Na[b];
						a.Ta = a.Ua = Date.now();
					},
					Ib(a) {
						return [
							".",
							"..",
							...Object.keys(a.Na)
						];
					},
					wb(a, b, c) {
						a = O.createNode(a, b, 41471, 0);
						a.link = c;
						return a;
					},
					eb(a) {
						if (40960 !== (a.mode & 61440)) throw new N(28);
						return a.link;
					}
				},
				Ma: {
					read(a, b, c, d, e) {
						var g = a.node.Na;
						if (e >= a.node.Ra) return 0;
						a = Math.min(a.node.Ra - e, d);
						if (8 < a && g.subarray) b.set(g.subarray(e, e + a), c);
						else for (d = 0; d < a; d++) b[c + d] = g[e + d];
						return a;
					},
					write(a, b, c, d, e, g) {
						b.buffer === m.buffer && (g = !1);
						if (!d) return 0;
						a = a.node;
						a.Ua = a.Ta = Date.now();
						if (b.subarray && (!a.Na || a.Na.subarray)) {
							if (g) return a.Na = b.subarray(c, c + d), a.Ra = d;
							if (0 === a.Ra && 0 === e) return a.Na = b.slice(c, c + d), a.Ra = d;
							if (e + d <= a.Ra) return a.Na.set(b.subarray(c, c + d), e), d;
						}
						g = e + d;
						var h = a.Na ? a.Na.length : 0;
						h >= g || (g = Math.max(g, h * (1048576 > h ? 2 : 1.125) >>> 0), 0 != h && (g = Math.max(g, 256)), h = a.Na, a.Na = new Uint8Array(g), 0 < a.Ra && a.Na.set(h.subarray(0, a.Ra), 0));
						if (a.Na.subarray && b.subarray) a.Na.set(b.subarray(c, c + d), e);
						else for (g = 0; g < d; g++) a.Na[e + g] = b[c + g];
						a.Ra = Math.max(a.Ra, e + d);
						return d;
					},
					Ya(a, b, c) {
						1 === c ? b += a.position : 2 === c && 32768 === (a.node.mode & 61440) && (b += a.node.Ra);
						if (0 > b) throw new N(28);
						return b;
					},
					sb(a, b, c, d, e) {
						if (32768 !== (a.node.mode & 61440)) throw new N(43);
						a = a.node.Na;
						if (e & 2 || !a || a.buffer !== m.buffer) {
							e = !0;
							d = 65536 * Math.ceil(b / 65536);
							var g = yb(65536, d);
							g && C.fill(0, g, g + d);
							d = g;
							if (!d) throw new N(48);
							if (a) {
								if (0 < c || c + b < a.length) a.subarray ? a = a.subarray(c, c + b) : a = Array.prototype.slice.call(a, c, c + b);
								m.set(a, d);
							}
						} else e = !1, d = a.byteOffset;
						return {
							tc: d,
							Ub: e
						};
					},
					tb(a, b, c, d) {
						O.Ma.write(a, b, 0, d, c, !1);
						return 0;
					}
				}
			}, ia = (a, b) => {
				var c = 0;
				a && (c |= 365);
				b && (c |= 146);
				return c;
			}, zb = null, Ab = {}, Bb = [], Cb = 1, R = null, Db = !1, Eb = !0, Fb = {}, N = class {
				name = "ErrnoError";
				constructor(a) {
					this.Pa = a;
				}
			}, Gb = class {
				qb = {};
				node = null;
				get flags() {
					return this.qb.flags;
				}
				set flags(a) {
					this.qb.flags = a;
				}
				get position() {
					return this.qb.position;
				}
				set position(a) {
					this.qb.position = a;
				}
			}, Hb = class {
				La = {};
				Ma = {};
				ib = null;
				constructor(a, b, c, d) {
					a ||= this;
					this.parent = a;
					this.ab = a.ab;
					this.id = Cb++;
					this.name = b;
					this.mode = c;
					this.nb = d;
					this.$a = this.Ua = this.Ta = Date.now();
				}
				get read() {
					return 365 === (this.mode & 365);
				}
				set read(a) {
					a ? this.mode |= 365 : this.mode &= -366;
				}
				get write() {
					return 146 === (this.mode & 146);
				}
				set write(a) {
					a ? this.mode |= 146 : this.mode &= -147;
				}
			};
			function S(a, b = {}) {
				if (!a) throw new N(44);
				b.Bb ?? (b.Bb = !0);
				"/" === a.charAt(0) || (a = "//" + a);
				var c = 0;
				a: for (; 40 > c; c++) {
					a = a.split("/").filter((q) => !!q);
					for (var d = zb, e = "/", g = 0; g < a.length; g++) {
						var h = g === a.length - 1;
						if (h && b.parent) break;
						if ("." !== a[g]) if (".." === a[g]) if (e = Za(e), d === d.parent) {
							a = e + "/" + a.slice(g + 1).join("/");
							c--;
							continue a;
						} else d = d.parent;
						else {
							e = ha(e + "/" + a[g]);
							try {
								d = Q(d, a[g]);
							} catch (q) {
								if (44 === q?.Pa && h && b.sc) return { path: e };
								throw q;
							}
							!d.ib || h && !b.Bb || (d = d.ib.root);
							if (40960 === (d.mode & 61440) && (!h || b.hb)) {
								if (!d.La.eb) throw new N(52);
								d = d.La.eb(d);
								"/" === d.charAt(0) || (d = Za(e) + "/" + d);
								a = d + "/" + a.slice(g + 1).join("/");
								continue a;
							}
						}
					}
					return {
						path: e,
						node: d
					};
				}
				throw new N(32);
			}
			function fa(a) {
				for (var b;;) {
					if (a === a.parent) return a = a.ab.Sb, b ? "/" !== a[a.length - 1] ? `${a}/${b}` : a + b : a;
					b = b ? `${a.name}/${b}` : a.name;
					a = a.parent;
				}
			}
			function Ib(a, b) {
				for (var c = 0, d = 0; d < b.length; d++) c = (c << 5) - c + b.charCodeAt(d) | 0;
				return (a + c >>> 0) % R.length;
			}
			function xb(a) {
				var b = Ib(a.parent.id, a.name);
				if (R[b] === a) R[b] = a.jb;
				else for (b = R[b]; b;) {
					if (b.jb === a) {
						b.jb = a.jb;
						break;
					}
					b = b.jb;
				}
			}
			function Q(a, b) {
				var c = P(a.mode) ? (c = Jb(a, "x")) ? c : a.La.mb ? 0 : 2 : 54;
				if (c) throw new N(c);
				for (c = R[Ib(a.id, b)]; c; c = c.jb) {
					var d = c.name;
					if (c.parent.id === a.id && d === b) return c;
				}
				return a.La.mb(a, b);
			}
			function wb(a, b, c, d) {
				a = new Hb(a, b, c, d);
				b = Ib(a.parent.id, a.name);
				a.jb = R[b];
				return R[b] = a;
			}
			function P(a) {
				return 16384 === (a & 61440);
			}
			function Kb(a) {
				var b = [
					"r",
					"w",
					"rw"
				][a & 3];
				a & 512 && (b += "w");
				return b;
			}
			function Jb(a, b) {
				if (Eb) return 0;
				if (!b.includes("r") || a.mode & 292) {
					if (b.includes("w") && !(a.mode & 146) || b.includes("x") && !(a.mode & 73)) return 2;
				} else return 2;
				return 0;
			}
			function Lb(a, b) {
				if (!P(a.mode)) return 54;
				try {
					return Q(a, b), 20;
				} catch (c) {}
				return Jb(a, "wx");
			}
			function Mb(a, b, c) {
				try {
					var d = Q(a, b);
				} catch (e) {
					return e.Pa;
				}
				if (a = Jb(a, "wx")) return a;
				if (c) {
					if (!P(d.mode)) return 54;
					if (d === d.parent || "/" === fa(d)) return 10;
				} else if (P(d.mode)) return 31;
				return 0;
			}
			function Nb(a) {
				if (!a) throw new N(63);
				return a;
			}
			function T(a) {
				a = Bb[a];
				if (!a) throw new N(8);
				return a;
			}
			function Ob(a, b = -1) {
				a = Object.assign(new Gb(), a);
				if (-1 == b) a: {
					for (b = 0; 4096 >= b; b++) if (!Bb[b]) break a;
					throw new N(33);
				}
				a.bb = b;
				return Bb[b] = a;
			}
			function Pb(a, b = -1) {
				a = Ob(a, b);
				a.Ma?.Bc?.(a);
				return a;
			}
			function Qb(a, b, c) {
				var d = a?.Ma.Xa;
				a = d ? a : b;
				d ??= b.La.Xa;
				Nb(d);
				d(a, c);
			}
			var vb = {
				open(a) {
					a.Ma = Ab[a.node.nb].Ma;
					a.Ma.open?.(a);
				},
				Ya() {
					throw new N(70);
				}
			};
			function rb(a, b) {
				Ab[a] = { Ma: b };
			}
			function Rb(a, b) {
				var c = "/" === b;
				if (c && zb) throw new N(10);
				if (!c && b) {
					var d = S(b, { Bb: !1 });
					b = d.path;
					d = d.node;
					if (d.ib) throw new N(10);
					if (!P(d.mode)) throw new N(54);
				}
				b = {
					type: a,
					Gc: {},
					Sb: b,
					qc: []
				};
				a = a.ab(b);
				a.ab = b;
				b.root = a;
				c ? zb = a : d && (d.ib = b, d.ab && d.ab.qc.push(b));
			}
			function Sb(a, b, c) {
				var d = S(a, { parent: !0 }).node;
				a = $a(a);
				if (!a) throw new N(28);
				if ("." === a || ".." === a) throw new N(20);
				var e = Lb(d, a);
				if (e) throw new N(e);
				if (!d.La.rb) throw new N(63);
				return d.La.rb(d, a, b, c);
			}
			function ja(a, b = 438) {
				return Sb(a, b & 4095 | 32768, 0);
			}
			function U(a, b = 511) {
				return Sb(a, b & 1023 | 16384, 0);
			}
			function Tb(a, b, c) {
				"undefined" == typeof c && (c = b, b = 438);
				Sb(a, b | 8192, c);
			}
			function Ub(a, b) {
				if (!cb(a)) throw new N(44);
				var c = S(b, { parent: !0 }).node;
				if (!c) throw new N(44);
				b = $a(b);
				var d = Lb(c, b);
				if (d) throw new N(d);
				if (!c.La.wb) throw new N(63);
				c.La.wb(c, b, a);
			}
			function Vb(a) {
				var b = S(a, { parent: !0 }).node;
				a = $a(a);
				var c = Q(b, a), d = Mb(b, a, !0);
				if (d) throw new N(d);
				if (!b.La.vb) throw new N(63);
				if (c.ib) throw new N(10);
				b.La.vb(b, a);
				xb(c);
			}
			function ta(a) {
				var b = S(a, { parent: !0 }).node;
				if (!b) throw new N(44);
				a = $a(a);
				var c = Q(b, a), d = Mb(b, a, !1);
				if (d) throw new N(d);
				if (!b.La.xb) throw new N(63);
				if (c.ib) throw new N(10);
				b.La.xb(b, a);
				xb(c);
			}
			function Wb(a, b) {
				a = S(a, { hb: !b }).node;
				return Nb(a.La.Wa)(a);
			}
			function Xb(a, b, c, d) {
				Qb(a, b, {
					mode: c & 4095 | b.mode & -4096,
					Ta: Date.now(),
					dc: d
				});
			}
			function ka(a, b) {
				a = "string" == typeof a ? S(a, { hb: !0 }).node : a;
				Xb(null, a, b);
			}
			function Yb(a, b, c) {
				if (P(b.mode)) throw new N(31);
				if (32768 !== (b.mode & 61440)) throw new N(28);
				var d = Jb(b, "w");
				if (d) throw new N(d);
				Qb(a, b, {
					size: c,
					timestamp: Date.now()
				});
			}
			function ma(a, b, c = 438) {
				if ("" === a) throw new N(44);
				if ("string" == typeof b) {
					var d = {
						r: 0,
						"r+": 2,
						w: 577,
						"w+": 578,
						a: 1089,
						"a+": 1090
					}[b];
					if ("undefined" == typeof d) throw Error(`Unknown file open mode: ${b}`);
					b = d;
				}
				c = b & 64 ? c & 4095 | 32768 : 0;
				if ("object" == typeof a) d = a;
				else {
					var e = a.endsWith("/");
					a = S(a, {
						hb: !(b & 131072),
						sc: !0
					});
					d = a.node;
					a = a.path;
				}
				var g = !1;
				if (b & 64) if (d) {
					if (b & 128) throw new N(20);
				} else {
					if (e) throw new N(31);
					d = Sb(a, c | 511, 0);
					g = !0;
				}
				if (!d) throw new N(44);
				8192 === (d.mode & 61440) && (b &= -513);
				if (b & 65536 && !P(d.mode)) throw new N(54);
				if (!g && (e = d ? 40960 === (d.mode & 61440) ? 32 : P(d.mode) && ("r" !== Kb(b) || b & 576) ? 31 : Jb(d, Kb(b)) : 44)) throw new N(e);
				b & 512 && !g && (e = d, e = "string" == typeof e ? S(e, { hb: !0 }).node : e, Yb(null, e, 0));
				b &= -131713;
				e = Ob({
					node: d,
					path: fa(d),
					flags: b,
					seekable: !0,
					position: 0,
					Ma: d.Ma,
					uc: [],
					error: !1
				});
				e.Ma.open && e.Ma.open(e);
				g && ka(d, c & 511);
				!k.logReadFiles || b & 1 || a in Fb || (Fb[a] = 1);
				return e;
			}
			function oa(a) {
				if (null === a.bb) throw new N(8);
				a.Eb && (a.Eb = null);
				try {
					a.Ma.close && a.Ma.close(a);
				} catch (b) {
					throw b;
				} finally {
					Bb[a.bb] = null;
				}
				a.bb = null;
			}
			function Zb(a, b, c) {
				if (null === a.bb) throw new N(8);
				if (!a.seekable || !a.Ma.Ya) throw new N(70);
				if (0 != c && 1 != c && 2 != c) throw new N(28);
				a.position = a.Ma.Ya(a, b, c);
				a.uc = [];
			}
			function $b(a, b, c, d, e) {
				if (0 > d || 0 > e) throw new N(28);
				if (null === a.bb) throw new N(8);
				if (1 === (a.flags & 2097155)) throw new N(8);
				if (P(a.node.mode)) throw new N(31);
				if (!a.Ma.read) throw new N(28);
				var g = "undefined" != typeof e;
				if (!g) e = a.position;
				else if (!a.seekable) throw new N(70);
				b = a.Ma.read(a, b, c, d, e);
				g || (a.position += b);
				return b;
			}
			function na(a, b, c, d, e) {
				if (0 > d || 0 > e) throw new N(28);
				if (null === a.bb) throw new N(8);
				if (0 === (a.flags & 2097155)) throw new N(8);
				if (P(a.node.mode)) throw new N(31);
				if (!a.Ma.write) throw new N(28);
				a.seekable && a.flags & 1024 && Zb(a, 0, 2);
				var g = "undefined" != typeof e;
				if (!g) e = a.position;
				else if (!a.seekable) throw new N(70);
				b = a.Ma.write(a, b, c, d, e, void 0);
				g || (a.position += b);
				return b;
			}
			function sa(a) {
				var b = b || 0;
				var c = "binary";
				"utf8" !== c && "binary" !== c && Ka(`Invalid encoding type "${c}"`);
				b = ma(a, b);
				a = Wb(a).size;
				var d = new Uint8Array(a);
				$b(b, d, 0, a, 0);
				"utf8" === c && (d = db(d));
				oa(b);
				return d;
			}
			function W(a, b, c) {
				a = ha("/dev/" + a);
				var d = ia(!!b, !!c);
				W.Rb ?? (W.Rb = 64);
				var e = W.Rb++ << 8 | 0;
				rb(e, {
					open(g) {
						g.seekable = !1;
					},
					close() {
						c?.buffer?.length && c(10);
					},
					read(g, h, q, w) {
						for (var u = 0, x = 0; x < w; x++) {
							try {
								var D = b();
							} catch (ib) {
								throw new N(29);
							}
							if (void 0 === D && 0 === u) throw new N(6);
							if (null === D || void 0 === D) break;
							u++;
							h[q + x] = D;
						}
						u && (g.node.$a = Date.now());
						return u;
					},
					write(g, h, q, w) {
						for (var u = 0; u < w; u++) try {
							c(h[q + u]);
						} catch (x) {
							throw new N(29);
						}
						w && (g.node.Ua = g.node.Ta = Date.now());
						return u;
					}
				});
				Tb(a, d, e);
			}
			var X = {};
			function Y(a, b, c) {
				if ("/" === b.charAt(0)) return b;
				a = -100 === a ? "/" : T(a).path;
				if (0 == b.length) {
					if (!c) throw new N(44);
					return a;
				}
				return a + "/" + b;
			}
			function ac(a, b) {
				F[a >> 2] = b.cc;
				F[a + 4 >> 2] = b.mode;
				F[a + 8 >> 2] = b.rc;
				F[a + 12 >> 2] = b.uid;
				F[a + 16 >> 2] = b.nc;
				F[a + 20 >> 2] = b.nb;
				H[a + 24 >> 3] = BigInt(b.size);
				E[a + 32 >> 2] = 4096;
				E[a + 36 >> 2] = b.$b;
				var c = b.$a.getTime(), d = b.Ua.getTime(), e = b.Ta.getTime();
				H[a + 40 >> 3] = BigInt(Math.floor(c / 1e3));
				F[a + 48 >> 2] = c % 1e3 * 1e6;
				H[a + 56 >> 3] = BigInt(Math.floor(d / 1e3));
				F[a + 64 >> 2] = d % 1e3 * 1e6;
				H[a + 72 >> 3] = BigInt(Math.floor(e / 1e3));
				F[a + 80 >> 2] = e % 1e3 * 1e6;
				H[a + 88 >> 3] = BigInt(b.oc);
				return 0;
			}
			var kc = void 0, Cc = () => {
				var a = E[+kc >> 2];
				kc += 4;
				return a;
			}, Ec = 0, Fc = [
				0,
				31,
				60,
				91,
				121,
				152,
				182,
				213,
				244,
				274,
				305,
				335
			], Gc = [
				0,
				31,
				59,
				90,
				120,
				151,
				181,
				212,
				243,
				273,
				304,
				334
			], Hc = {}, Ic = (a) => {
				if (!(a instanceof Pa || "unwind" == a)) throw a;
			}, Jc = (a) => {
				Ea = a;
				Va || 0 < Ec || (k.onExit?.(a), Da = !0);
				throw new Pa(a);
			}, Kc = (a) => {
				if (!Da) try {
					a();
				} catch (b) {
					Ic(b);
				} finally {
					if (!(Va || 0 < Ec)) try {
						Ea = a = Ea, Jc(a);
					} catch (b) {
						Ic(b);
					}
				}
			}, Lc = {}, Nc = () => {
				if (!Mc) {
					var a = {
						USER: "web_user",
						LOGNAME: "web_user",
						PATH: "/",
						PWD: "/",
						HOME: "/home/web_user",
						LANG: (globalThis.navigator?.language ?? "C").replace("-", "_") + ".UTF-8",
						_: wa || "./this.program"
					}, b;
					for (b in Lc) void 0 === Lc[b] ? delete a[b] : a[b] = Lc[b];
					var c = [];
					for (b in a) c.push(`${b}=${a[b]}`);
					Mc = c;
				}
				return Mc;
			}, Mc, Oc = (a, b, c, d) => {
				var e = {
					string: (u) => {
						var x = 0;
						if (null !== u && void 0 !== u && 0 !== u) {
							x = gb(u) + 1;
							var D = y(x);
							M(u, C, D, x);
							x = D;
						}
						return x;
					},
					array: (u) => {
						var x = y(u.length);
						m.set(u, x);
						return x;
					}
				};
				a = k["_" + a];
				var g = [], h = 0;
				if (d) for (var q = 0; q < d.length; q++) {
					var w = e[c[q]];
					w ? (0 === h && (h = pa()), g[q] = w(d[q])) : g[q] = d[q];
				}
				c = a(...g);
				return c = function(u) {
					0 !== h && ra(h);
					return "string" === b ? z(u) : "boolean" === b ? !!u : u;
				}(c);
			}, ea = (a) => {
				var b = gb(a) + 1, c = ca(b);
				c && M(a, C, c, b);
				return c;
			}, Pc, Qc = [], A = (a) => {
				Pc.delete(Z.get(a));
				Z.set(a, null);
				Qc.push(a);
			}, Rc = (a) => {
				const b = a.length;
				return [
					b % 128 | 128,
					b >> 7,
					...a
				];
			}, Sc = {
				i: 127,
				p: 127,
				j: 126,
				f: 125,
				d: 124,
				e: 111
			}, Tc = (a) => Rc(Array.from(a, (b) => Sc[b])), va = (a, b) => {
				if (!Pc) {
					Pc = /* @__PURE__ */ new WeakMap();
					var c = Z.length;
					if (Pc) for (var d = 0; d < 0 + c; d++) {
						var e = Z.get(d);
						e && Pc.set(e, d);
					}
				}
				if (c = Pc.get(a) || 0) return c;
				c = Qc.length ? Qc.pop() : Z.grow(1);
				try {
					Z.set(c, a);
				} catch (g) {
					if (!(g instanceof TypeError)) throw g;
					b = Uint8Array.of(0, 97, 115, 109, 1, 0, 0, 0, 1, ...Rc([
						1,
						96,
						...Tc(b.slice(1)),
						...Tc("v" === b[0] ? "" : b[0])
					]), 2, 7, 1, 1, 101, 1, 102, 0, 0, 7, 5, 1, 1, 102, 0, 0);
					b = new WebAssembly.Module(b);
					b = new WebAssembly.Instance(b, { e: { f: a } }).exports.f;
					Z.set(c, b);
				}
				Pc.set(a, c);
				return c;
			};
			R = Array(4096);
			Rb(O, "/");
			U("/tmp");
			U("/home");
			U("/home/web_user");
			(function() {
				U("/dev");
				rb(259, {
					read: () => 0,
					write: (d, e, g, h) => h,
					Ya: () => 0
				});
				Tb("/dev/null", 259);
				qb(1280, tb);
				qb(1536, ub);
				Tb("/dev/tty", 1280);
				Tb("/dev/tty1", 1536);
				var a = /* @__PURE__ */ new Uint8Array(1024), b = 0, c = () => {
					0 === b && (bb(a), b = a.byteLength);
					return a[--b];
				};
				W("random", c);
				W("urandom", c);
				U("/dev/shm");
				U("/dev/shm/tmp");
			})();
			(function() {
				U("/proc");
				var a = U("/proc/self");
				U("/proc/self/fd");
				Rb({ ab() {
					var b = wb(a, "fd", 16895, 73);
					b.Ma = { Ya: O.Ma.Ya };
					b.La = {
						mb(c, d) {
							c = +d;
							var e = T(c);
							c = {
								parent: null,
								ab: { Sb: "fake" },
								La: { eb: () => e.path },
								id: c + 1
							};
							return c.parent = c;
						},
						Ib() {
							return Array.from(Bb.entries()).filter(([, c]) => c).map(([c]) => c.toString());
						}
					};
					return b;
				} }, "/proc/self/fd");
			})();
			k.noExitRuntime && (Va = k.noExitRuntime);
			k.print && (Ba = k.print);
			k.printErr && (B = k.printErr);
			k.wasmBinary && (Ca = k.wasmBinary);
			k.thisProgram && (wa = k.thisProgram);
			if (k.preInit) for ("function" == typeof k.preInit && (k.preInit = [k.preInit]); 0 < k.preInit.length;) k.preInit.shift()();
			k.stackSave = () => pa();
			k.stackRestore = (a) => ra(a);
			k.stackAlloc = (a) => y(a);
			k.cwrap = (a, b, c, d) => {
				var e = !c || c.every((g) => "number" === g || "boolean" === g);
				return "string" !== b && e && !d ? k["_" + a] : (...g) => Oc(a, b, c, g);
			};
			k.addFunction = va;
			k.removeFunction = A;
			k.UTF8ToString = z;
			k.stringToNewUTF8 = ea;
			k.writeArrayToMemory = (a, b) => {
				m.set(a, b);
			};
			var ca, da, yb, Uc, ra, y, pa, Ja, Z, Vc = {
				a: (a, b, c, d) => Ka(`Assertion failed: ${z(a)}, at: ` + [
					b ? z(b) : "unknown filename",
					c,
					d ? z(d) : "unknown function"
				]),
				i: function(a, b) {
					try {
						return a = z(a), ka(a, b), 0;
					} catch (c) {
						if ("undefined" == typeof X || "ErrnoError" !== c.name) throw c;
						return -c.Pa;
					}
				},
				L: function(a, b, c) {
					try {
						b = z(b);
						b = Y(a, b);
						if (c & -8) return -28;
						var d = S(b, { hb: !0 }).node;
						if (!d) return -44;
						a = "";
						c & 4 && (a += "r");
						c & 2 && (a += "w");
						c & 1 && (a += "x");
						return a && Jb(d, a) ? -2 : 0;
					} catch (e) {
						if ("undefined" == typeof X || "ErrnoError" !== e.name) throw e;
						return -e.Pa;
					}
				},
				j: function(a, b) {
					try {
						var c = T(a);
						Xb(c, c.node, b, !1);
						return 0;
					} catch (d) {
						if ("undefined" == typeof X || "ErrnoError" !== d.name) throw d;
						return -d.Pa;
					}
				},
				h: function(a) {
					try {
						var b = T(a);
						Qb(b, b.node, {
							timestamp: Date.now(),
							dc: !1
						});
						return 0;
					} catch (c) {
						if ("undefined" == typeof X || "ErrnoError" !== c.name) throw c;
						return -c.Pa;
					}
				},
				b: function(a, b, c) {
					kc = c;
					try {
						var d = T(a);
						switch (b) {
							case 0:
								var e = Cc();
								if (0 > e) break;
								for (; Bb[e];) e++;
								return Pb(d, e).bb;
							case 1:
							case 2: return 0;
							case 3: return d.flags;
							case 4: return e = Cc(), d.flags |= e, 0;
							case 12: return e = Cc(), Fa[e + 0 >> 1] = 2, 0;
							case 13:
							case 14: return 0;
						}
						return -28;
					} catch (g) {
						if ("undefined" == typeof X || "ErrnoError" !== g.name) throw g;
						return -g.Pa;
					}
				},
				g: function(a, b) {
					try {
						var c = T(a), d = c.node, e = c.Ma.Wa;
						a = e ? c : d;
						e ??= d.La.Wa;
						Nb(e);
						return ac(b, e(a));
					} catch (h) {
						if ("undefined" == typeof X || "ErrnoError" !== h.name) throw h;
						return -h.Pa;
					}
				},
				H: function(a, b) {
					b = -9007199254740992 > b || 9007199254740992 < b ? NaN : Number(b);
					try {
						if (isNaN(b)) return -61;
						var c = T(a);
						if (0 > b || 0 === (c.flags & 2097155)) throw new N(28);
						Yb(c, c.node, b);
						return 0;
					} catch (d) {
						if ("undefined" == typeof X || "ErrnoError" !== d.name) throw d;
						return -d.Pa;
					}
				},
				G: function(a, b) {
					try {
						if (0 === b) return -28;
						var c = gb("/") + 1;
						if (b < c) return -68;
						M("/", C, a, b);
						return c;
					} catch (d) {
						if ("undefined" == typeof X || "ErrnoError" !== d.name) throw d;
						return -d.Pa;
					}
				},
				K: function(a, b) {
					try {
						return a = z(a), ac(b, Wb(a, !0));
					} catch (c) {
						if ("undefined" == typeof X || "ErrnoError" !== c.name) throw c;
						return -c.Pa;
					}
				},
				C: function(a, b, c) {
					try {
						return b = z(b), b = Y(a, b), U(b, c), 0;
					} catch (d) {
						if ("undefined" == typeof X || "ErrnoError" !== d.name) throw d;
						return -d.Pa;
					}
				},
				J: function(a, b, c, d) {
					try {
						b = z(b);
						var e = d & 256;
						b = Y(a, b, d & 4096);
						return ac(c, e ? Wb(b, !0) : Wb(b));
					} catch (g) {
						if ("undefined" == typeof X || "ErrnoError" !== g.name) throw g;
						return -g.Pa;
					}
				},
				x: function(a, b, c, d) {
					kc = d;
					try {
						b = z(b);
						b = Y(a, b);
						var e = d ? Cc() : 0;
						return ma(b, c, e).bb;
					} catch (g) {
						if ("undefined" == typeof X || "ErrnoError" !== g.name) throw g;
						return -g.Pa;
					}
				},
				v: function(a, b, c, d) {
					try {
						b = z(b);
						b = Y(a, b);
						if (0 >= d) return -28;
						var e = S(b).node;
						if (!e) throw new N(44);
						if (!e.La.eb) throw new N(28);
						var g = e.La.eb(e);
						var h = Math.min(d, gb(g)), q = m[c + h];
						M(g, C, c, d + 1);
						m[c + h] = q;
						return h;
					} catch (w) {
						if ("undefined" == typeof X || "ErrnoError" !== w.name) throw w;
						return -w.Pa;
					}
				},
				u: function(a) {
					try {
						return a = z(a), Vb(a), 0;
					} catch (b) {
						if ("undefined" == typeof X || "ErrnoError" !== b.name) throw b;
						return -b.Pa;
					}
				},
				f: function(a, b) {
					try {
						return a = z(a), ac(b, Wb(a));
					} catch (c) {
						if ("undefined" == typeof X || "ErrnoError" !== c.name) throw c;
						return -c.Pa;
					}
				},
				r: function(a, b, c) {
					try {
						b = z(b);
						b = Y(a, b);
						if (c) if (512 === c) Vb(b);
						else return -28;
						else ta(b);
						return 0;
					} catch (d) {
						if ("undefined" == typeof X || "ErrnoError" !== d.name) throw d;
						return -d.Pa;
					}
				},
				q: function(a, b, c) {
					try {
						b = z(b);
						b = Y(a, b, !0);
						var d = Date.now(), e, g;
						if (c) {
							var h = F[c >> 2] + 4294967296 * E[c + 4 >> 2], q = E[c + 8 >> 2];
							1073741823 == q ? e = d : 1073741822 == q ? e = null : e = 1e3 * h + q / 1e6;
							c += 16;
							h = F[c >> 2] + 4294967296 * E[c + 4 >> 2];
							q = E[c + 8 >> 2];
							1073741823 == q ? g = d : 1073741822 == q ? g = null : g = 1e3 * h + q / 1e6;
						} else g = e = d;
						if (null !== (g ?? e)) {
							a = e;
							var w = S(b, { hb: !0 }).node;
							Nb(w.La.Xa)(w, {
								$a: a,
								Ua: g
							});
						}
						return 0;
					} catch (u) {
						if ("undefined" == typeof X || "ErrnoError" !== u.name) throw u;
						return -u.Pa;
					}
				},
				m: () => Ka(""),
				l: () => {
					Va = !1;
					Ec = 0;
				},
				A: function(a, b) {
					a = -9007199254740992 > a || 9007199254740992 < a ? NaN : Number(a);
					a = /* @__PURE__ */ new Date(1e3 * a);
					E[b >> 2] = a.getSeconds();
					E[b + 4 >> 2] = a.getMinutes();
					E[b + 8 >> 2] = a.getHours();
					E[b + 12 >> 2] = a.getDate();
					E[b + 16 >> 2] = a.getMonth();
					E[b + 20 >> 2] = a.getFullYear() - 1900;
					E[b + 24 >> 2] = a.getDay();
					var c = a.getFullYear();
					E[b + 28 >> 2] = (0 !== c % 4 || 0 === c % 100 && 0 !== c % 400 ? Gc : Fc)[a.getMonth()] + a.getDate() - 1 | 0;
					E[b + 36 >> 2] = -(60 * a.getTimezoneOffset());
					c = new Date(a.getFullYear(), 6, 1).getTimezoneOffset();
					var d = new Date(a.getFullYear(), 0, 1).getTimezoneOffset();
					E[b + 32 >> 2] = (c != d && a.getTimezoneOffset() == Math.min(d, c)) | 0;
				},
				y: function(a, b, c, d, e, g, h) {
					e = -9007199254740992 > e || 9007199254740992 < e ? NaN : Number(e);
					try {
						var q = T(d);
						if (0 !== (b & 2) && 0 === (c & 2) && 2 !== (q.flags & 2097155)) throw new N(2);
						if (1 === (q.flags & 2097155)) throw new N(2);
						if (!q.Ma.sb) throw new N(43);
						if (!a) throw new N(28);
						var w = q.Ma.sb(q, a, e, b, c);
						var u = w.tc;
						E[g >> 2] = w.Ub;
						F[h >> 2] = u;
						return 0;
					} catch (x) {
						if ("undefined" == typeof X || "ErrnoError" !== x.name) throw x;
						return -x.Pa;
					}
				},
				z: function(a, b, c, d, e, g) {
					g = -9007199254740992 > g || 9007199254740992 < g ? NaN : Number(g);
					try {
						var h = T(e);
						if (c & 2) {
							if (32768 !== (h.node.mode & 61440)) throw new N(43);
							d & 2 || h.Ma.tb && h.Ma.tb(h, C.slice(a, a + b), g, b, d);
						}
					} catch (q) {
						if ("undefined" == typeof X || "ErrnoError" !== q.name) throw q;
						return -q.Pa;
					}
				},
				n: (a, b) => {
					Hc[a] && (clearTimeout(Hc[a].id), delete Hc[a]);
					if (!b) return 0;
					Hc[a] = {
						id: setTimeout(() => {
							delete Hc[a];
							Kc(() => Uc(a, performance.now()));
						}, b),
						Hc: b
					};
					return 0;
				},
				B: (a, b, c, d) => {
					var e = (/* @__PURE__ */ new Date()).getFullYear(), g = new Date(e, 0, 1).getTimezoneOffset();
					e = new Date(e, 6, 1).getTimezoneOffset();
					F[a >> 2] = 60 * Math.max(g, e);
					E[b >> 2] = Number(g != e);
					b = (h) => {
						var q = Math.abs(h);
						return `UTC${0 <= h ? "-" : "+"}${String(Math.floor(q / 60)).padStart(2, "0")}${String(q % 60).padStart(2, "0")}`;
					};
					a = b(g);
					b = b(e);
					e < g ? (M(a, C, c, 17), M(b, C, d, 17)) : (M(a, C, d, 17), M(b, C, c, 17));
				},
				d: () => Date.now(),
				s: () => 2147483648,
				c: () => performance.now(),
				o: (a) => {
					var b = C.length;
					a >>>= 0;
					if (2147483648 < a) return !1;
					for (var c = 1; 4 >= c; c *= 2) {
						var d = b * (1 + .2 / c);
						d = Math.min(d, a + 100663296);
						a: {
							d = (Math.min(2147483648, 65536 * Math.ceil(Math.max(a, d) / 65536)) - Ja.buffer.byteLength + 65535) / 65536 | 0;
							try {
								Ja.grow(d);
								Ia();
								var e = 1;
								break a;
							} catch (g) {}
							e = void 0;
						}
						if (e) return !0;
					}
					return !1;
				},
				E: (a, b) => {
					var c = 0, d = 0, e;
					for (e of Nc()) {
						var g = b + c;
						F[a + d >> 2] = g;
						c += M(e, C, g, Infinity) + 1;
						d += 4;
					}
					return 0;
				},
				F: (a, b) => {
					var c = Nc();
					F[a >> 2] = c.length;
					a = 0;
					for (var d of c) a += gb(d) + 1;
					F[b >> 2] = a;
					return 0;
				},
				e: function(a) {
					try {
						oa(T(a));
						return 0;
					} catch (c) {
						if ("undefined" == typeof X || "ErrnoError" !== c.name) throw c;
						return c.Pa;
					}
				},
				p: function(a, b) {
					try {
						var c = T(a);
						m[b] = c.Va ? 2 : P(c.mode) ? 3 : 40960 === (c.mode & 61440) ? 7 : 4;
						Fa[b + 2 >> 1] = 0;
						H[b + 8 >> 3] = BigInt(0);
						H[b + 16 >> 3] = BigInt(0);
						return 0;
					} catch (d) {
						if ("undefined" == typeof X || "ErrnoError" !== d.name) throw d;
						return d.Pa;
					}
				},
				w: function(a, b, c, d) {
					try {
						a: {
							var e = T(a);
							a = b;
							for (var g, h = b = 0; h < c; h++) {
								var q = F[a >> 2], w = F[a + 4 >> 2];
								a += 8;
								var u = $b(e, m, q, w, g);
								if (0 > u) {
									var x = -1;
									break a;
								}
								b += u;
								if (u < w) break;
								"undefined" != typeof g && (g += u);
							}
							x = b;
						}
						F[d >> 2] = x;
						return 0;
					} catch (D) {
						if ("undefined" == typeof X || "ErrnoError" !== D.name) throw D;
						return D.Pa;
					}
				},
				D: function(a, b, c, d) {
					b = -9007199254740992 > b || 9007199254740992 < b ? NaN : Number(b);
					try {
						if (isNaN(b)) return 61;
						var e = T(a);
						Zb(e, b, c);
						H[d >> 3] = BigInt(e.position);
						e.Eb && 0 === b && 0 === c && (e.Eb = null);
						return 0;
					} catch (g) {
						if ("undefined" == typeof X || "ErrnoError" !== g.name) throw g;
						return g.Pa;
					}
				},
				I: function(a) {
					try {
						var b = T(a);
						return b.Ma?.lb?.(b);
					} catch (c) {
						if ("undefined" == typeof X || "ErrnoError" !== c.name) throw c;
						return c.Pa;
					}
				},
				t: function(a, b, c, d) {
					try {
						a: {
							var e = T(a);
							a = b;
							for (var g, h = b = 0; h < c; h++) {
								var q = F[a >> 2], w = F[a + 4 >> 2];
								a += 8;
								var u = na(e, m, q, w, g);
								if (0 > u) {
									var x = -1;
									break a;
								}
								b += u;
								if (u < w) break;
								"undefined" != typeof g && (g += u);
							}
							x = b;
						}
						F[d >> 2] = x;
						return 0;
					} catch (D) {
						if ("undefined" == typeof X || "ErrnoError" !== D.name) throw D;
						return D.Pa;
					}
				},
				k: Jc
			};
			function Wc() {
				function a() {
					k.calledRun = !0;
					if (!Da) {
						if (!k.noFSInit && !Db) {
							var b, c;
							Db = !0;
							b ??= k.stdin;
							c ??= k.stdout;
							d ??= k.stderr;
							b ? W("stdin", b) : Ub("/dev/tty", "/dev/stdin");
							c ? W("stdout", null, c) : Ub("/dev/tty", "/dev/stdout");
							d ? W("stderr", null, d) : Ub("/dev/tty1", "/dev/stderr");
							ma("/dev/stdin", 0);
							ma("/dev/stdout", 1);
							ma("/dev/stderr", 1);
						}
						Xc.N();
						Eb = !1;
						k.onRuntimeInitialized?.();
						if (k.postRun) for ("function" == typeof k.postRun && (k.postRun = [k.postRun]); k.postRun.length;) {
							var d = k.postRun.shift();
							Ra.push(d);
						}
						Qa(Ra);
					}
				}
				if (0 < K) Ua = Wc;
				else {
					if (k.preRun) for ("function" == typeof k.preRun && (k.preRun = [k.preRun]); k.preRun.length;) Ta();
					Qa(Sa);
					0 < K ? Ua = Wc : k.setStatus ? (k.setStatus("Running..."), setTimeout(() => {
						setTimeout(() => k.setStatus(""), 1);
						a();
					}, 1)) : a();
				}
			}
			var Xc;
			(async function() {
				function a(c) {
					c = Xc = c.exports;
					k._sqlite3_free = c.P;
					k._sqlite3_value_text = c.Q;
					k._sqlite3_prepare_v2 = c.R;
					k._sqlite3_step = c.S;
					k._sqlite3_reset = c.T;
					k._sqlite3_exec = c.U;
					k._sqlite3_finalize = c.V;
					k._sqlite3_column_name = c.W;
					k._sqlite3_column_text = c.X;
					k._sqlite3_column_type = c.Y;
					k._sqlite3_errmsg = c.Z;
					k._sqlite3_clear_bindings = c._;
					k._sqlite3_value_blob = c.$;
					k._sqlite3_value_bytes = c.aa;
					k._sqlite3_value_double = c.ba;
					k._sqlite3_value_int = c.ca;
					k._sqlite3_value_type = c.da;
					k._sqlite3_result_blob = c.ea;
					k._sqlite3_result_double = c.fa;
					k._sqlite3_result_error = c.ga;
					k._sqlite3_result_int = c.ha;
					k._sqlite3_result_int64 = c.ia;
					k._sqlite3_result_null = c.ja;
					k._sqlite3_result_text = c.ka;
					k._sqlite3_aggregate_context = c.la;
					k._sqlite3_column_count = c.ma;
					k._sqlite3_data_count = c.na;
					k._sqlite3_column_blob = c.oa;
					k._sqlite3_column_bytes = c.pa;
					k._sqlite3_column_double = c.qa;
					k._sqlite3_bind_blob = c.ra;
					k._sqlite3_bind_double = c.sa;
					k._sqlite3_bind_int = c.ta;
					k._sqlite3_bind_text = c.ua;
					k._sqlite3_bind_parameter_index = c.va;
					k._sqlite3_sql = c.wa;
					k._sqlite3_normalized_sql = c.xa;
					k._sqlite3_changes = c.ya;
					k._sqlite3_close_v2 = c.za;
					k._sqlite3_create_function_v2 = c.Aa;
					k._sqlite3_update_hook = c.Ba;
					k._sqlite3_open = c.Ca;
					ca = k._malloc = c.Da;
					da = k._free = c.Ea;
					k._RegisterExtensionFunctions = c.Fa;
					yb = c.Ga;
					Uc = c.Ha;
					ra = c.Ia;
					y = c.Ja;
					pa = c.Ka;
					Ja = c.M;
					Z = c.O;
					Ia();
					K--;
					k.monitorRunDependencies?.(K);
					0 == K && Ua && (c = Ua, Ua = null, c());
					return Xc;
				}
				K++;
				k.monitorRunDependencies?.(K);
				var b = { a: Vc };
				if (k.instantiateWasm) return new Promise((c) => {
					k.instantiateWasm(b, (d, e) => {
						c(a(d, e));
					});
				});
				La ??= k.locateFile ? k.locateFile("sql-wasm-browser.wasm", ya) : ya + "sql-wasm-browser.wasm";
				return a((await Oa(b)).instance);
			})();
			Wc();
			return Module;
		});
		return initSqlJsPromise;
	};
	if (typeof exports === "object" && typeof module === "object") {
		module.exports = initSqlJs;
		module.exports.default = initSqlJs;
	} else if (typeof define === "function" && define["amd"]) define([], function() {
		return initSqlJs;
	});
	else if (typeof exports === "object") exports["Module"] = initSqlJs;
}));
//#endregion
export default require_sql_wasm_browser();

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJtYXBwaW5ncyI6Ijs7O0NBYUEsSUFBSSxtQkFBbUI7Q0FFdkIsSUFBSSxZQUFZLFNBQVUsY0FBYztFQUVwQyxJQUFJLGtCQUNGLE9BQU87RUFHVCxtQkFBbUIsSUFBSSxRQUFRLFNBQVUsZUFBZSxRQUFRO0dBWTVELElBQUksU0FBUyxPQUFPLGlCQUFpQixjQUFjLGVBQWUsQ0FBQztHQUluRSxJQUFJLDBCQUEwQixPQUFPO0dBQ3JDLE9BQU8sYUFBYSxTQUFVLHNCQUFzQjtJQUNoRCxPQUFPLElBQUksTUFBTSxvQkFBb0IsQ0FBQztJQUN0QyxJQUFJLHlCQUNGLHdCQUF3QixvQkFBb0I7R0FFbEQ7R0FFQSxPQUFPLGFBQWEsT0FBTyxjQUFjLENBQUM7R0FDMUMsT0FBTyxVQUFVLENBQUMsS0FBSyxXQUFZO0lBRS9CLGNBQWMsTUFBTTtHQUN4QixDQUFDO0dBa0JELFNBQVM7R0FJakIsSUFBSTtHQUFFLE1BQUksT0FBTyxVQUFVLGNBQWMsU0FBUyxDQUFDO0dBQUUsSUFBSSxLQUFHLENBQUMsQ0FBQyxXQUFXLFFBQU8sS0FBRyxDQUFDLENBQUMsV0FBVztHQUNoRyxFQUFFLHVCQUFxQixXQUFVO0lBQUMsU0FBUyxFQUFFLEdBQUUsR0FBRTtLQUFDLFFBQU8sT0FBTyxHQUFkO01BQWlCLEtBQUs7T0FBVSxHQUFHLEdBQUUsSUFBRSxJQUFFLENBQUM7T0FBRTtNQUFNLEtBQUs7T0FBUyxHQUFHLEdBQUUsQ0FBQztPQUFFO01BQU0sS0FBSztPQUFTLEdBQUcsR0FBRSxHQUFFLElBQUcsRUFBRTtPQUFFO01BQU0sS0FBSztPQUFTLElBQUcsU0FBTyxHQUFFLEdBQUcsQ0FBQztZQUFPLElBQUcsUUFBTSxFQUFFLFFBQU87UUFBQyxJQUFJLElBQUUsR0FBRyxFQUFFLE1BQU07UUFBRSxFQUFFLElBQUksR0FBRSxDQUFDO1FBQUUsR0FBRyxHQUFFLEdBQUUsRUFBRSxRQUFPLEVBQUU7UUFBRSxHQUFHLENBQUM7T0FBQyxPQUFNLEdBQUcsR0FBRSxpRUFBK0QsSUFBRSxNQUFLLEVBQUU7T0FBRTtNQUFNLFNBQVEsR0FBRyxDQUFDO0tBQUM7SUFBQztJQUFDLFNBQVMsRUFBRSxHQUFFLEdBQUU7S0FBQyxLQUFJLElBQUksSUFBRSxDQUFDLEdBQUUsSUFBRSxHQUFFLElBQUUsR0FBRSxLQUFHLEdBQUU7TUFBQyxJQUFJLElBQUUsRUFBRSxJQUFFLElBQUUsR0FBRSxLQUFLLEdBQUUsSUFBRSxHQUFHLENBQUM7TUFBRSxJQUFHLE1BQUksS0FBRyxNQUFJLEdBQUUsSUFBRSxHQUFHLENBQUM7V0FBTyxJQUFHLE1BQUksR0FBRSxJQUFFLEdBQUcsQ0FBQztXQUFPLElBQUcsTUFDemYsR0FBRTtPQUFDLElBQUU7T0FBRSxJQUFFLEdBQUcsQ0FBQztPQUFFLElBQUUsR0FBRyxDQUFDO09BQUUsS0FBSSxJQUFJLElBQUUsSUFBSSxXQUFXLENBQUMsR0FBRSxJQUFFLEdBQUUsSUFBRSxHQUFFLEtBQUcsR0FBRSxFQUFFLEtBQUcsRUFBRSxJQUFFO09BQUcsSUFBRTtNQUFDLE9BQU0sSUFBRTtNQUFLLEVBQUUsS0FBSyxDQUFDO0tBQUM7S0FBQyxPQUFPO0lBQUM7SUFBQyxTQUFTLEVBQUUsR0FBRSxHQUFFO0tBQUMsS0FBSyxLQUFHO0tBQUUsS0FBSyxLQUFHO0tBQUUsS0FBSyxLQUFHO0tBQUUsS0FBSyxLQUFHLENBQUM7SUFBQztJQUFDLFNBQVMsRUFBRSxHQUFFLEdBQUU7S0FBQyxLQUFLLEtBQUc7S0FBRSxLQUFLLEtBQUcsR0FBRyxDQUFDO0tBQUUsSUFBRyxTQUFPLEtBQUssSUFBRyxNQUFNLE1BQU0sOENBQThDO0tBQUUsS0FBSyxLQUFHLEtBQUs7S0FBRyxLQUFLLEtBQUcsS0FBSyxLQUFHO0lBQUk7SUFBQyxTQUFTLEVBQUUsR0FBRTtLQUFDLEtBQUssV0FBUyxhQUFXLGFBQVcsS0FBSyxPQUFPLE1BQUk7S0FBRyxJQUFHLFFBQU0sR0FBRTtNQUFDLElBQUksSUFBRSxLQUFLLFVBQVMsSUFBRSxLQUFJLElBQUU7TUFBRSxNQUFJLElBQUUsWUFBVSxPQUFPLElBQUUsSUFBRSxHQUFHLENB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QUcsU0FBUyxHQUFFO0tBQUMsUUFBTSxLQUFHLEtBQUssS0FBSyxDQUFDO0tBQUUsS0FBSyxLQUFLO0tBQUUsT0FBTyxLQUFLLE1BQU07SUFBQztJQUFFLEVBQUUsVUFBVSxLQUFHLFNBQVMsR0FBRSxHQUFFO0tBQUMsTUFBVSxJQUFFLEtBQUssSUFBRyxLQUFLLE1BQUk7S0FBRyxJQUFFLEdBQUcsQ0FBQztLQUFFLEtBQUssR0FBRyxLQUFLLENBQUM7S0FBRSxLQUFLLEdBQUcsWUFBWSxHQUFHLEtBQUssSUFBRyxHQUFFLEdBQUUsSUFBRyxDQUFDLENBQUM7SUFBQztJQUFFLEVBQUUsVUFBVSxLQUFHLFNBQVMsR0FBRSxHQUFFO0tBQUMsTUFBVSxJQUFFLEtBQUssSUFBRyxLQUFLLE1BQUk7S0FBRyxJQUFJLElBQUUsR0FBRyxFQUFFLE1BQU07S0FBRSxFQUFFLElBQUksR0FBRSxDQUFDO0tBQUUsS0FBSyxHQUFHLEtBQUssQ0FBQztLQUFFLEtBQUssR0FBRyxZQUFZLEdBQUcsS0FBSyxJQUFHLEdBQUUsR0FBRSxFQUFFLFFBQU8sQ0FBQyxDQUFDO0lBQUM7SUFBRSxFQUFFLFVBQVUsS0FBRyxTQUFTLEdBQUUsR0FBRTtLQUFDLE1BQVUsSUFBRSxLQUFLLElBQUcsS0FBSyxNQUFJO0tBQUcsS0FBSyxHQUFHLGFBQWEsT0FBSyxJQUFFLEtBQUcsS0FBRyxJQUFJLEtBQUssSUFDcmYsR0FBRSxDQUFDLENBQUM7SUFBQztJQUFFLEVBQUUsVUFBVSxLQUFHLFNBQVMsR0FBRTtLQUFDLE1BQVUsSUFBRSxLQUFLLElBQUcsS0FBSyxNQUFJO0tBQUcsR0FBRyxLQUFLLElBQUcsR0FBRSxHQUFFLEdBQUUsQ0FBQztJQUFDO0lBQUUsRUFBRSxVQUFVLEtBQUcsU0FBUyxHQUFFLEdBQUU7S0FBQyxNQUFVLElBQUUsS0FBSyxJQUFHLEtBQUssTUFBSTtLQUFHLFFBQU8sT0FBTyxHQUFkO01BQWlCLEtBQUs7T0FBUyxLQUFLLEdBQUcsR0FBRSxDQUFDO09BQUU7TUFBTyxLQUFLO09BQVMsS0FBSyxHQUFHLEdBQUUsQ0FBQztPQUFFO01BQU8sS0FBSztPQUFTLEtBQUssR0FBRyxFQUFFLFNBQVMsR0FBRSxDQUFDO09BQUU7TUFBTyxLQUFLO09BQVUsS0FBSyxHQUFHLElBQUUsR0FBRSxDQUFDO09BQUU7TUFBTyxLQUFLO09BQVMsSUFBRyxTQUFPLEdBQUU7UUFBQyxLQUFLLEdBQUcsQ0FBQztRQUFFO09BQU07T0FBQyxJQUFHLFFBQU0sRUFBRSxRQUFPO1FBQUMsS0FBSyxHQUFHLEdBQUUsQ0FBQztRQUFFO09BQU07S0FBQztLQUFDLE1BQUssK0RBQTZELElBQUU7SUFBSztJQUFFLEVBQUUsVUFBVSxLQUFHLFNBQVMsR0FBRTtLQUFDLElBQUksSUFDMWY7S0FBSyxPQUFPLEtBQUssQ0FBQyxDQUFDLENBQUMsUUFBUSxTQUFTLEdBQUU7TUFBQyxJQUFJLElBQUUsR0FBRyxFQUFFLElBQUcsQ0FBQztNQUFFLE1BQUksS0FBRyxFQUFFLEdBQUcsRUFBRSxJQUFHLENBQUM7S0FBQyxDQUFDO0tBQUUsT0FBTSxDQUFDO0lBQUM7SUFBRSxFQUFFLFVBQVUsS0FBRyxTQUFTLEdBQUU7S0FBQyxLQUFJLElBQUksSUFBRSxHQUFFLElBQUUsRUFBRSxRQUFPLEtBQUcsR0FBRSxLQUFLLEdBQUcsRUFBRSxJQUFHLElBQUUsQ0FBQztLQUFFLE9BQU0sQ0FBQztJQUFDO0lBQUUsRUFBRSxVQUFVLFFBQU0sV0FBVTtLQUFDLEtBQUssR0FBRztLQUFFLE9BQU8sTUFBSSxHQUFHLEtBQUssRUFBRSxLQUFHLE1BQUksR0FBRyxLQUFLLEVBQUU7SUFBQztJQUFFLEVBQUUsVUFBVSxLQUFHLFdBQVU7S0FBQyxLQUFJLElBQUksR0FBRSxLQUFLLE9BQUssSUFBRSxLQUFLLEdBQUcsSUFBSSxLQUFJLEdBQUcsQ0FBQztJQUFDO0lBQUUsRUFBRSxVQUFVLEtBQUcsV0FBVTtLQUFDLEtBQUssR0FBRztLQUFFLElBQUksSUFBRSxNQUFJLEdBQUcsS0FBSyxFQUFFO0tBQUUsT0FBTyxLQUFLLEdBQUcsR0FBRyxLQUFLO0tBQUksS0FBSyxLQUFHO0tBQUUsT0FBTztJQUFDO0lBQUUsRUFBRSxVQUFVLE9BQUssV0FBVTtLQUFDLElBQUcsU0FBTyxLQUFLLElBQUcsT0FBTSxFQUFDLE1BQUssQ0FBQyxFQUFDO0tBQUUsU0FBTyxLQUFLLE9BQ3JmLEtBQUssR0FBRyxHQUFHLEdBQUUsS0FBSyxLQUFHO0tBQU0sSUFBRyxDQUFDLEtBQUssR0FBRyxJQUFHLE1BQU0sS0FBSyxHQUFHLEdBQUUsTUFBTSxpQkFBaUI7S0FBRSxJQUFJLElBQUUsR0FBRyxHQUFFLElBQUUsRUFBRSxDQUFDO0tBQUUsR0FBRyxDQUFDO0tBQUUsR0FBRyxDQUFDO0tBQUUsSUFBRztNQUFDLEtBQUssR0FBRyxZQUFZLEdBQUcsS0FBSyxHQUFHLElBQUcsS0FBSyxJQUFHLElBQUcsR0FBRSxDQUFDLENBQUM7TUFBRSxLQUFLLEtBQUcsRUFBRSxHQUFFLEtBQUs7TUFBRSxJQUFJLElBQUUsRUFBRSxHQUFFLEtBQUs7TUFBRSxJQUFHLE1BQUksR0FBRSxPQUFPLEtBQUssR0FBRyxHQUFFLEVBQUMsTUFBSyxDQUFDLEVBQUM7TUFBRSxLQUFLLEtBQUcsSUFBSSxFQUFFLEdBQUUsS0FBSyxFQUFFO01BQUUsS0FBSyxHQUFHLEdBQUcsS0FBRyxLQUFLO01BQUcsT0FBTTtPQUFDLE9BQU0sS0FBSztPQUFHLE1BQUssQ0FBQztNQUFDO0tBQUMsU0FBTyxHQUFFO01BQUMsTUFBTSxLQUFLLEtBQUcsRUFBRSxLQUFLLEVBQUUsR0FBRSxLQUFLLEdBQUcsR0FBRTtLQUFFLFVBQVE7TUFBQyxHQUFHLENBQUM7S0FBQztJQUFDO0lBQUUsRUFBRSxVQUFVLEtBQUcsV0FBVTtLQUFDLEdBQUcsS0FBSyxFQUFFO0tBQUUsS0FBSyxLQUFHO0lBQUk7SUFBRSxFQUFFLFVBQVUsS0FBRyxXQUFVO0tBQUMsT0FBTyxTQUFPLEtBQUssS0FBRyxLQUFLLEtBQUcsRUFBRSxLQUFLLEVBQUU7SUFBQztJQUNuZixlQUFhLE9BQU8sVUFBUSxhQUFXLE9BQU8sT0FBTyxhQUFXLEVBQUUsVUFBVSxPQUFPLFlBQVUsV0FBVTtLQUFDLE9BQU87SUFBSTtJQUFHLEVBQUUsVUFBVSxLQUFHLFNBQVMsR0FBRSxHQUFFO0tBQUMsSUFBRyxDQUFDLEtBQUssSUFBRyxNQUFLO0tBQWtCLElBQUcsR0FBRTtNQUFDLElBQUUsS0FBSyxHQUFHLEdBQUUsQ0FBQztNQUFFLElBQUc7T0FBQyxFQUFFLEtBQUs7TUFBQyxVQUFRO09BQUMsRUFBRSxHQUFHO01BQUM7S0FBQyxPQUFNLEtBQUssWUFBWSxFQUFFLEtBQUssSUFBRyxHQUFFLEdBQUUsR0FBRSxDQUFDLENBQUM7S0FBRSxPQUFPO0lBQUk7SUFBRSxFQUFFLFVBQVUsT0FBSyxTQUFTLEdBQUUsR0FBRSxHQUFFO0tBQUMsSUFBRyxDQUFDLEtBQUssSUFBRyxNQUFLO0tBQWtCLElBQUksSUFBRSxHQUFHLEdBQUUsSUFBRSxNQUFLLElBQUUsTUFBSyxJQUFFO0tBQUssSUFBRztNQUFDLElBQUUsSUFBRSxHQUFHLENBQUM7TUFBRSxJQUFJLElBQUUsRUFBRSxDQUFDO01BQUUsS0FBSSxJQUFFLENBQUMsR0FBRSxNQUFJLEVBQUUsR0FBRSxJQUFJLElBQUc7T0FBQyxHQUFHLENBQUM7T0FBRSxHQUFHLENBQUM7T0FBRSxLQUFLLFlBQVksR0FBRyxLQUFLLElBQUcsR0FBRSxJQUFHLEdBQUUsQ0FBQyxDQUFDO09BQUUsSUFBSSxJQUFFLEVBQUUsR0FBRSxLQUFLO09BQ3ZmLElBQUUsRUFBRSxHQUFFLEtBQUs7T0FBRSxJQUFHLE1BQUksR0FBRTtRQUFDLElBQUksSUFBRTtRQUFLLElBQUUsSUFBSSxFQUFFLEdBQUUsSUFBSTtRQUFFLEtBQUksUUFBTSxLQUFHLEVBQUUsS0FBSyxDQUFDLEdBQUUsRUFBRSxLQUFLLElBQUcsU0FBTyxNQUFJLElBQUU7U0FBQyxTQUFRLEVBQUUsR0FBRztTQUFFLFFBQU8sQ0FBQztRQUFDLEdBQUUsRUFBRSxLQUFLLENBQUMsSUFBRyxFQUFFLE9BQU8sS0FBSyxFQUFFLElBQUksTUFBSyxDQUFDLENBQUM7UUFBRSxFQUFFLEdBQUc7T0FBQztNQUFDO01BQUMsT0FBTztLQUFDLFNBQU8sSUFBRztNQUFDLE1BQU0sS0FBRyxFQUFFLEdBQUcsR0FBRTtLQUFHLFVBQVE7TUFBQyxLQUFHLEdBQUcsQ0FBQyxHQUFFLEdBQUcsQ0FBQztLQUFDO0lBQUM7SUFBRSxFQUFFLFVBQVUsS0FBRyxTQUFTLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRTtLQUFDLGVBQWEsT0FBTyxNQUFJLElBQUUsR0FBRSxJQUFFLEdBQUUsSUFBRSxLQUFLO0tBQUcsSUFBRSxLQUFLLEdBQUcsR0FBRSxDQUFDO0tBQUUsSUFBRztNQUFDLE9BQUssRUFBRSxLQUFLLElBQUcsRUFBRSxFQUFFLEdBQUcsTUFBSyxDQUFDLENBQUM7S0FBQyxVQUFRO01BQUMsRUFBRSxHQUFHO0tBQUM7S0FBQyxJQUFHLGVBQWEsT0FBTyxHQUFFLE9BQU8sRUFBRTtJQUFDO0lBQUUsRUFBRSxVQUFVLEtBQUcsU0FBUyxHQUFFLEdBQUU7S0FBQyxHQUFHLENBQUM7S0FBRSxLQUFLLFlBQVksRUFBRSxLQUFLLElBQUcsR0FBRSxJQUFHLEdBQUUsQ0FBQyxDQUFDO0tBQUUsSUFBRSxFQUFFLEdBQUUsS0FBSztLQUFFLElBQUcsTUFDdmYsR0FBRSxNQUFLO0tBQXFCLElBQUksSUFBRSxJQUFJLEVBQUUsR0FBRSxJQUFJO0tBQUUsUUFBTSxLQUFHLEVBQUUsS0FBSyxDQUFDO0tBQUUsT0FBTyxLQUFLLEdBQUcsS0FBRztJQUFDO0lBQUUsRUFBRSxVQUFVLEtBQUcsU0FBUyxHQUFFO0tBQUMsT0FBTyxJQUFJLEVBQUUsR0FBRSxJQUFJO0lBQUM7SUFBRSxFQUFFLFVBQVUsS0FBRyxXQUFVO0tBQUMsT0FBTyxPQUFPLEtBQUssRUFBRSxDQUFDLENBQUMsUUFBUSxTQUFTLEdBQUU7TUFBQyxFQUFFLEdBQUc7S0FBQyxDQUFDO0tBQUUsT0FBTyxPQUFPLEtBQUssRUFBRSxDQUFDLENBQUMsUUFBUSxDQUFDO0tBQUUsS0FBSyxLQUFHLENBQUM7S0FBRSxLQUFLLFlBQVksRUFBRSxLQUFLLEVBQUUsQ0FBQztLQUFFLElBQUksSUFBRSxHQUFHLEtBQUssUUFBUTtLQUFFLEtBQUssWUFBWSxFQUFFLEtBQUssVUFBUyxDQUFDLENBQUM7S0FBRSxLQUFLLEtBQUcsRUFBRSxHQUFFLEtBQUs7S0FBRSxHQUFHLEtBQUssRUFBRTtLQUFFLE9BQU87SUFBQztJQUFFLEVBQUUsVUFBVSxRQUFNLFdBQVU7S0FBQyxTQUFPLEtBQUssT0FBSyxPQUFPLE9BQU8sS0FBSyxFQUFFLENBQUMsQ0FBQyxRQUFRLFNBQVMsR0FBRTtNQUFDLEVBQUUsR0FBRztLQUFDLENBQUMsR0FBRSxPQUFPLE9BQU8sS0FBSyxFQUFFLENBQUMsQ0FBQyxRQUFRLENBQUMsR0FDemdCLEtBQUssS0FBRyxDQUFDLEdBQUUsS0FBSyxPQUFLLEVBQUUsS0FBSyxFQUFFLEdBQUUsS0FBSyxLQUFHLEtBQUssSUFBRyxLQUFLLFlBQVksRUFBRSxLQUFLLEVBQUUsQ0FBQyxHQUFFLEdBQUcsTUFBSSxLQUFLLFFBQVEsR0FBRSxLQUFLLEtBQUc7SUFBSztJQUFFLEVBQUUsVUFBVSxjQUFZLFNBQVMsR0FBRTtLQUFDLElBQUcsTUFBSSxHQUFFLE9BQU87S0FBSyxJQUFFLEdBQUcsS0FBSyxFQUFFO0tBQUUsTUFBTSxNQUFNLENBQUM7SUFBRTtJQUFFLEVBQUUsVUFBVSxLQUFHLFdBQVU7S0FBQyxPQUFPLEVBQUUsS0FBSyxFQUFFO0lBQUM7SUFBRSxFQUFFLFVBQVUsS0FBRyxTQUFTLEdBQUUsR0FBRTtLQUFDLE9BQU8sVUFBVSxlQUFlLEtBQUssS0FBSyxJQUFHLENBQUMsTUFBSSxFQUFFLEtBQUssR0FBRyxFQUFFLEdBQUUsT0FBTyxLQUFLLEdBQUc7S0FBSSxJQUFJLElBQUUsR0FBRyxTQUFTLEdBQUUsR0FBRSxHQUFFO01BQUMsSUFBRSxFQUFFLEdBQUUsQ0FBQztNQUFFLElBQUc7T0FBQyxJQUFJLElBQUUsRUFBRSxNQUFNLE1BQUssQ0FBQztNQUFDLFNBQU8sR0FBRTtPQUFDLEdBQUcsR0FBRSxHQUFFLEVBQUU7T0FBRTtNQUFNO01BQUMsRUFBRSxHQUFFLENBQUM7S0FBQyxHQUFFLE1BQU07S0FBRSxLQUFLLEdBQUcsS0FBRztLQUFFLEtBQUssWUFBWSxHQUFHLEtBQUssSUFDcGYsR0FBRSxFQUFFLFFBQU8sR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLENBQUMsQ0FBQztLQUFFLE9BQU87SUFBSTtJQUFFLEVBQUUsVUFBVSxLQUFHLFNBQVMsR0FBRSxHQUFFO0tBQUMsSUFBSSxJQUFFLEVBQUUsUUFBTSxXQUFVO01BQUMsT0FBTztLQUFJLEdBQUUsSUFBRSxFQUFFLFlBQVUsU0FBUyxHQUFFO01BQUMsT0FBTztLQUFDLEdBQUUsSUFBRSxFQUFFO0tBQUssSUFBRyxDQUFDLEdBQUUsTUFBSyx3REFBc0Q7S0FBRSxJQUFJLElBQUUsQ0FBQztLQUFFLE9BQU8sZUFBZSxLQUFLLEtBQUssSUFBRyxDQUFDLE1BQUksRUFBRSxLQUFLLEdBQUcsRUFBRSxHQUFFLE9BQU8sS0FBSyxHQUFHO0tBQUksSUFBRSxJQUFFO0tBQWEsT0FBTyxlQUFlLEtBQUssS0FBSyxJQUFHLENBQUMsTUFBSSxFQUFFLEtBQUssR0FBRyxFQUFFLEdBQUUsT0FBTyxLQUFLLEdBQUc7S0FBSSxJQUFJLElBQUUsR0FBRyxTQUFTLEdBQUUsR0FBRSxJQUFHO01BQUMsSUFBSSxJQUFFLEdBQUcsR0FBRSxDQUFDO01BQUUsT0FBTyxlQUFlLEtBQUssR0FBRSxDQUFDLE1BQUksRUFBRSxLQUFHLEVBQUU7TUFBRyxJQUFFLEVBQUUsR0FBRSxFQUFFO01BQUUsSUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDO01BQ3BmLElBQUc7T0FBQyxFQUFFLEtBQUcsRUFBRSxNQUFNLE1BQUssQ0FBQztNQUFDLFNBQU8sSUFBRztPQUFDLE9BQU8sRUFBRSxJQUFHLEdBQUcsR0FBRSxJQUFHLEVBQUU7TUFBQztLQUFDLEdBQUUsTUFBTSxHQUFFLElBQUUsR0FBRyxTQUFTLEdBQUU7TUFBQyxJQUFJLElBQUUsR0FBRyxHQUFFLENBQUM7TUFBRSxJQUFHO09BQUMsSUFBSSxLQUFHLEVBQUUsRUFBRSxFQUFFO01B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QUcsS0FBSyxPQUFNLE9BQU8sRUFBRSxLQUFHO0tBQUcsS0FBSyxPQUFNLE9BQU8sRUFBRSxLQUFHO0tBQUcsS0FBSyxTQUFRLE9BQU8sR0FBRyxLQUFHO0tBQUcsS0FBSyxVQUFTLE9BQU8sR0FBRyxLQUFHO0tBQUcsS0FBSyxLQUFJLE9BQU8sRUFBRSxLQUFHO0tBQUcsU0FBUSxHQUFHLDhCQUE4QixHQUFHO0lBQUM7R0FBQztHQUFDLElBQUksS0FBRyxDQUFDO0dBQzdULFNBQVMsR0FBRyxHQUFFO0lBQUMsSUFBSSxJQUFFO0lBQU0sRUFBRSxTQUFTLEdBQUcsTUFBSSxJQUFFO0lBQUssUUFBTyxHQUFQO0tBQVUsS0FBSztNQUFLLEVBQUUsS0FBRztNQUFFO0tBQU0sS0FBSztNQUFLLEVBQUUsS0FBRztNQUFFO0tBQU0sS0FBSztNQUFNLEdBQUcsS0FBRyxLQUFHO01BQUU7S0FBTSxLQUFLO01BQU0sRUFBRSxLQUFHLEtBQUc7TUFBRTtLQUFNLEtBQUs7TUFBTSxFQUFFLEtBQUcsS0FBRyxPQUFPLENBQUM7TUFBRTtLQUFNLEtBQUs7TUFBUSxHQUFHLEtBQUcsS0FBRztNQUFFO0tBQU0sS0FBSztNQUFTLEdBQUcsS0FBRyxLQUFHO01BQUU7S0FBTSxLQUFLO01BQUksRUFBRSxLQUFHLEtBQUc7TUFBRTtLQUFNLFNBQVEsR0FBRyw4QkFBOEIsR0FBRztJQUFDO0dBQUM7R0FDMVUsSUFBSSxLQUFHLElBQUksWUFBVSxHQUFFLE1BQUksR0FBRSxHQUFFLEdBQUUsTUFBSTtJQUFDLElBQUUsSUFBRTtJQUFFLElBQUcsR0FBRSxPQUFPO0lBQUUsT0FBSyxFQUFFLE1BQUksRUFBRSxLQUFHLEtBQUksRUFBRTtJQUFFLE9BQU87R0FBQyxHQUFFLEtBQUcsR0FBRSxHQUFFLE1BQUksSUFBRSxHQUFHLE9BQU8sRUFBRSxTQUFTLEdBQUUsR0FBRyxHQUFFLEdBQUUsR0FBRSxDQUFDLENBQUMsQ0FBQyxJQUFFLElBQUcsTUFBSSxHQUFFLE1BQUk7SUFBQyxLQUFJLElBQUksSUFBRSxHQUFFLElBQUUsRUFBRSxTQUFPLEdBQUUsS0FBRyxHQUFFLEtBQUk7S0FBQyxJQUFJLElBQUUsRUFBRTtLQUFHLFFBQU0sSUFBRSxFQUFFLE9BQU8sR0FBRSxDQUFDLElBQUUsU0FBTyxLQUFHLEVBQUUsT0FBTyxHQUFFLENBQUMsR0FBRSxPQUFLLE1BQUksRUFBRSxPQUFPLEdBQUUsQ0FBQyxHQUFFO0lBQUk7SUFBQyxJQUFHLEdBQUUsT0FBSyxHQUFFLEtBQUksRUFBRSxRQUFRLElBQUk7SUFBRSxPQUFPO0dBQUMsR0FBRSxNQUFHLE1BQUc7SUFBQyxJQUFJLElBQUUsUUFBTSxFQUFFLE9BQU8sQ0FBQyxHQUFFLElBQUUsUUFBTSxFQUFFLE1BQU0sRUFBRTtJQUFFLENBQUMsSUFBRSxHQUFHLEVBQUUsTUFBTSxHQUFHLENBQUMsQ0FBQyxRQUFPLE1BQUcsQ0FBQyxDQUFDLENBQUMsR0FBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssR0FBRyxNQUFJLE1BQUksSUFBRTtJQUFLLEtBQUcsTUFBSSxLQUFHO0lBQUssUUFBTyxJQUFFLE1BQUksTUFBSTtHQUFDLEdBQUUsTUFBRyxNQUFHO0lBQUMsSUFBSSxJQUFFLGdFQUFnRSxLQUFLLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQztJQUM3aUIsSUFBRSxFQUFFO0lBQUcsSUFBRSxFQUFFO0lBQUcsSUFBRyxDQUFDLEtBQUcsQ0FBQyxHQUFFLE9BQU07SUFBSSxNQUFJLEVBQUUsTUFBTSxHQUFFLEVBQUU7SUFBRSxPQUFPLElBQUU7R0FBQyxHQUFFLE1BQUcsTUFBRyxLQUFHLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQyxDQUFDLElBQUcsWUFBTyxNQUFHLE9BQU8sZ0JBQWdCLENBQUMsR0FBRSxNQUFHLE1BQUc7SUFBQyxDQUFDLEtBQUcsR0FBRyxHQUFHLENBQUM7R0FBQyxHQUFFLE1BQUksR0FBRyxNQUFJO0lBQUMsS0FBSSxJQUFJLElBQUUsSUFBRyxJQUFFLENBQUMsR0FBRSxJQUFFLEVBQUUsU0FBTyxHQUFFLE1BQUksS0FBRyxDQUFDLEdBQUUsS0FBSTtLQUFDLElBQUUsS0FBRyxJQUFFLEVBQUUsS0FBRztLQUFJLElBQUcsWUFBVSxPQUFPLEdBQUUsTUFBTSxJQUFJLFVBQVUsMkNBQTJDO0tBQUUsSUFBRyxDQUFDLEdBQUUsT0FBTTtLQUFHLElBQUUsSUFBRSxNQUFJO0tBQUUsSUFBRSxRQUFNLEVBQUUsT0FBTyxDQUFDO0lBQUM7SUFBQyxJQUFFLEdBQUcsRUFBRSxNQUFNLEdBQUcsQ0FBQyxDQUFDLFFBQU8sTUFBRyxDQUFDLENBQUMsQ0FBQyxHQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxHQUFHO0lBQUUsUUFBTyxJQUFFLE1BQUksTUFBSSxLQUFHO0dBQUcsR0FBRSxNQUFHLE1BQUc7SUFBQyxJQUFJLElBQUUsR0FBRyxHQUFFLENBQUM7SUFBRSxPQUFPLEdBQUcsT0FBTyxFQUFFLFNBQU8sRUFBRSxTQUFTLEdBQUUsQ0FBQyxJQUNuZixJQUFJLFdBQVcsRUFBRSxNQUFNLEdBQUUsQ0FBQyxDQUFDLENBQUM7R0FBQyxHQUFFLEtBQUcsQ0FBQyxHQUFFLE1BQUcsTUFBRztJQUFDLEtBQUksSUFBSSxJQUFFLEdBQUUsSUFBRSxHQUFFLElBQUUsRUFBRSxRQUFPLEVBQUUsR0FBRTtLQUFDLElBQUksSUFBRSxFQUFFLFdBQVcsQ0FBQztLQUFFLE9BQUssSUFBRSxNQUFJLFFBQU0sSUFBRSxLQUFHLElBQUUsU0FBTyxLQUFHLFNBQU8sS0FBRyxLQUFHLEdBQUUsRUFBRSxLQUFHLEtBQUc7SUFBQztJQUFDLE9BQU87R0FBQyxHQUFFLEtBQUcsR0FBRSxHQUFFLEdBQUUsTUFBSTtJQUFDLElBQUcsRUFBRSxJQUFFLElBQUcsT0FBTztJQUFFLElBQUksSUFBRTtJQUFFLElBQUUsSUFBRSxJQUFFO0lBQUUsS0FBSSxJQUFJLElBQUUsR0FBRSxJQUFFLEVBQUUsUUFBTyxFQUFFLEdBQUU7S0FBQyxJQUFJLElBQUUsRUFBRSxZQUFZLENBQUM7S0FBRSxJQUFHLE9BQUssR0FBRTtNQUFDLElBQUcsS0FBRyxHQUFFO01BQU0sRUFBRSxPQUFLO0tBQUMsT0FBTSxJQUFHLFFBQU0sR0FBRTtNQUFDLElBQUcsSUFBRSxLQUFHLEdBQUU7TUFBTSxFQUFFLE9BQUssTUFBSSxLQUFHO01BQUUsRUFBRSxPQUFLLE1BQUksSUFBRTtLQUFFLE9BQU0sSUFBRyxTQUFPLEdBQUU7TUFBQyxJQUFHLElBQUUsS0FBRyxHQUFFO01BQU0sRUFBRSxPQUFLLE1BQUksS0FBRztNQUFHLEVBQUUsT0FBSyxNQUFJLEtBQUcsSUFBRTtNQUFHLEVBQUUsT0FBSyxNQUFJLElBQUU7S0FBRSxPQUFLO01BQUMsSUFBRyxJQUFFLEtBQUcsR0FBRTtNQUFNLEVBQUUsT0FBSyxNQUFJLEtBQUc7TUFBRyxFQUFFLE9BQUssTUFDamYsS0FBRyxLQUFHO01BQUcsRUFBRSxPQUFLLE1BQUksS0FBRyxJQUFFO01BQUcsRUFBRSxPQUFLLE1BQUksSUFBRTtNQUFHO0tBQUc7SUFBQztJQUFDLEVBQUUsS0FBRztJQUFFLE9BQU8sSUFBRTtHQUFDLEdBQUUsS0FBRyxDQUFDO0dBQUUsU0FBUyxHQUFHLEdBQUUsR0FBRTtJQUFDLEdBQUcsS0FBRztLQUFDLE9BQU0sQ0FBQztLQUFFLFFBQU8sQ0FBQztLQUFFLElBQUc7SUFBQztJQUFFLEdBQUcsR0FBRSxFQUFFO0dBQUM7R0FDbkksSUFBSSxLQUFHO0lBQUMsS0FBSyxHQUFFO0tBQUMsSUFBSSxJQUFFLEdBQUcsRUFBRSxLQUFLO0tBQUksSUFBRyxDQUFDLEdBQUUsTUFBTSxJQUFJLEVBQUUsRUFBRTtLQUFFLEVBQUUsS0FBRztLQUFFLEVBQUUsV0FBUyxDQUFDO0lBQUM7SUFBRSxNQUFNLEdBQUU7S0FBQyxFQUFFLEdBQUcsR0FBRyxHQUFHLEVBQUUsRUFBRTtJQUFDO0lBQUUsR0FBRyxHQUFFO0tBQUMsRUFBRSxHQUFHLEdBQUcsR0FBRyxFQUFFLEVBQUU7SUFBQztJQUFFLEtBQUssR0FBRSxHQUFFLEdBQUUsR0FBRTtLQUFDLElBQUcsQ0FBQyxFQUFFLE1BQUksQ0FBQyxFQUFFLEdBQUcsR0FBRyxJQUFHLE1BQU0sSUFBSSxFQUFFLEVBQUU7S0FBRSxLQUFJLElBQUksSUFBRSxHQUFFLElBQUUsR0FBRSxJQUFFLEdBQUUsS0FBSTtNQUFDLElBQUc7T0FBQyxJQUFJLElBQUUsRUFBRSxHQUFHLEdBQUcsR0FBRyxFQUFFLEVBQUU7TUFBQyxTQUFPLEdBQUU7T0FBQyxNQUFNLElBQUksRUFBRSxFQUFFO01BQUU7TUFBQyxJQUFHLEtBQUssTUFBSSxLQUFHLE1BQUksR0FBRSxNQUFNLElBQUksRUFBRSxDQUFDO01BQUUsSUFBRyxTQUFPLEtBQUcsS0FBSyxNQUFJLEdBQUU7TUFBTTtNQUFJLEVBQUUsSUFBRSxLQUFHO0tBQUM7S0FBQyxNQUFJLEVBQUUsS0FBSyxLQUFHLEtBQUssSUFBSTtLQUFHLE9BQU87SUFBQztJQUFFLE1BQU0sR0FBRSxHQUFFLEdBQUUsR0FBRTtLQUFDLElBQUcsQ0FBQyxFQUFFLE1BQUksQ0FBQyxFQUFFLEdBQUcsR0FBRyxJQUFHLE1BQU0sSUFBSSxFQUFFLEVBQUU7S0FBRSxJQUFHO01BQUMsS0FBSSxJQUFJLElBQUUsR0FBRSxJQUFFLEdBQUUsS0FBSSxFQUFFLEdBQUcsR0FBRyxHQUFHLEVBQUUsSUFBRyxFQUFFLElBQUUsRUFBRTtLQUFDLFNBQU8sR0FBRTtNQUFDLE1BQU0sSUFBSSxFQUFFLEVBQUU7S0FDcGY7S0FBQyxNQUFJLEVBQUUsS0FBSyxLQUFHLEVBQUUsS0FBSyxLQUFHLEtBQUssSUFBSTtLQUFHLE9BQU87SUFBQztHQUFDLEdBQUUsS0FBRztJQUFDLEtBQUk7S0FBQyxHQUFFO01BQUMsSUFBRyxDQUFDLEdBQUcsUUFBTztPQUFDLElBQUksSUFBRTtPQUFLLFdBQVcsUUFBUSxXQUFTLElBQUUsT0FBTyxPQUFPLFNBQVMsR0FBRSxTQUFPLE1BQUksS0FBRztPQUFPLElBQUcsQ0FBQyxHQUFFO1FBQUMsSUFBSSxJQUFFO1FBQUssTUFBTTtPQUFDO09BQUMsSUFBRSxNQUFNLEdBQUcsQ0FBQyxJQUFFLENBQUM7T0FBRSxJQUFFLEVBQUUsR0FBRSxHQUFFLEdBQUUsRUFBRSxNQUFNO09BQUUsRUFBRSxTQUFPO09BQUUsS0FBRztNQUFDO01BQUMsSUFBRSxHQUFHLE1BQU07S0FBQztLQUFDLE9BQU87SUFBQztJQUFFLEdBQUcsR0FBRSxHQUFFO0tBQUMsU0FBTyxLQUFHLE9BQUssS0FBRyxHQUFHLEdBQUcsRUFBRSxNQUFNLENBQUMsR0FBRSxFQUFFLFNBQU8sQ0FBQyxLQUFHLEtBQUcsS0FBRyxFQUFFLE9BQU8sS0FBSyxDQUFDO0lBQUM7SUFBRSxHQUFHLEdBQUU7S0FBQyxJQUFFLEVBQUUsUUFBUSxXQUFTLEdBQUcsR0FBRyxFQUFFLE1BQU0sQ0FBQyxHQUFFLEVBQUUsU0FBTyxDQUFDO0lBQUU7SUFBRSxLQUFJO0tBQUMsT0FBTTtNQUFDLElBQUc7TUFBTSxJQUFHO01BQUUsSUFBRztNQUFJLElBQUc7TUFBTSxJQUFHO09BQUM7T0FBRTtPQUFHO09BQUk7T0FBRztPQUFFO09BQUU7T0FBRTtPQUFFO09BQUc7T0FBRztPQUFHO09BQUU7T0FBRztPQUFHO09BQUc7T0FBRztPQUFFO09BQUU7T0FBRTtPQUFFO09BQ25mO09BQUU7T0FBRTtPQUFFO09BQUU7T0FBRTtPQUFFO09BQUU7T0FBRTtPQUFFO09BQUU7TUFBQztLQUFDO0lBQUM7SUFBRSxLQUFJO0tBQUMsT0FBTztJQUFDO0lBQUUsS0FBSTtLQUFDLE9BQU0sQ0FBQyxJQUFHLEVBQUU7SUFBQztHQUFDLEdBQUUsS0FBRztJQUFDLEdBQUcsR0FBRSxHQUFFO0tBQUMsU0FBTyxLQUFHLE9BQUssS0FBRyxFQUFFLEdBQUcsRUFBRSxNQUFNLENBQUMsR0FBRSxFQUFFLFNBQU8sQ0FBQyxLQUFHLEtBQUcsS0FBRyxFQUFFLE9BQU8sS0FBSyxDQUFDO0lBQUM7SUFBRSxHQUFHLEdBQUU7S0FBQyxJQUFFLEVBQUUsUUFBUSxXQUFTLEVBQUUsR0FBRyxFQUFFLE1BQU0sQ0FBQyxHQUFFLEVBQUUsU0FBTyxDQUFDO0lBQUU7R0FBQyxHQUFFLElBQUU7SUFBQyxJQUFHO0lBQUssS0FBSTtLQUFDLE9BQU8sRUFBRSxXQUFXLE1BQUssS0FBSSxPQUFNLENBQUM7SUFBQztJQUFFLFdBQVcsR0FBRSxHQUFFLEdBQUUsR0FBRTtLQUFDLElBQUcsV0FBUyxJQUFFLFVBQVEsVUFBUSxJQUFFLFFBQU8sTUFBTSxJQUFJLEVBQUUsRUFBRTtLQUFFLEVBQUUsT0FBSyxFQUFFLEtBQUc7TUFBQyxLQUFJO09BQUMsTUFBSztRQUFDLElBQUcsRUFBRSxHQUFHO1FBQUcsSUFBRyxFQUFFLEdBQUc7UUFBRyxJQUFHLEVBQUUsR0FBRztRQUFHLElBQUcsRUFBRSxHQUFHO1FBQUcsSUFBRyxFQUFFLEdBQUc7UUFBRyxJQUFHLEVBQUUsR0FBRztRQUFHLElBQUcsRUFBRSxHQUFHO1FBQUcsSUFBRyxFQUFFLEdBQUc7UUFBRyxJQUFHLEVBQUUsR0FBRztPQUFFO09BQUUsUUFBTyxFQUFDLElBQUcsRUFBRSxHQUFHLEdBQUU7TUFBQztNQUFFLE1BQUs7T0FBQyxNQUFLO1FBQUMsSUFBRyxFQUFFLEdBQUc7UUFBRyxJQUFHLEVBQUUsR0FBRztPQUFFO09BQzlmLFFBQU87UUFBQyxJQUFHLEVBQUUsR0FBRztRQUFHLE1BQUssRUFBRSxHQUFHO1FBQUssT0FBTSxFQUFFLEdBQUc7UUFBTSxJQUFHLEVBQUUsR0FBRztRQUFHLElBQUcsRUFBRSxHQUFHO09BQUU7TUFBQztNQUFFLE1BQUs7T0FBQyxNQUFLO1FBQUMsSUFBRyxFQUFFLEdBQUc7UUFBRyxJQUFHLEVBQUUsR0FBRztRQUFHLElBQUcsRUFBRSxHQUFHO09BQUU7T0FBRSxRQUFPLENBQUM7TUFBQztNQUFFLElBQUc7T0FBQyxNQUFLO1FBQUMsSUFBRyxFQUFFLEdBQUc7UUFBRyxJQUFHLEVBQUUsR0FBRztPQUFFO09BQUUsUUFBTztNQUFFO0tBQUM7S0FBRyxJQUFFLEdBQUcsR0FBRSxHQUFFLEdBQUUsQ0FBQztLQUFFLEVBQUUsRUFBRSxJQUFJLEtBQUcsRUFBRSxLQUFHLEVBQUUsR0FBRyxJQUFJLE1BQUssRUFBRSxLQUFHLEVBQUUsR0FBRyxJQUFJLFFBQU8sRUFBRSxLQUFHLENBQUMsS0FBRyxXQUFTLEVBQUUsT0FBSyxVQUFRLEVBQUUsS0FBRyxFQUFFLEdBQUcsS0FBSyxNQUFLLEVBQUUsS0FBRyxFQUFFLEdBQUcsS0FBSyxRQUFPLEVBQUUsS0FBRyxHQUFFLEVBQUUsS0FBRyxRQUFNLFdBQVMsRUFBRSxPQUFLLFVBQVEsRUFBRSxLQUFHLEVBQUUsR0FBRyxLQUFLLE1BQUssRUFBRSxLQUFHLEVBQUUsR0FBRyxLQUFLLFVBQVEsVUFBUSxFQUFFLE9BQUssV0FBUyxFQUFFLEtBQUcsRUFBRSxHQUFHLEdBQUcsTUFBSyxFQUFFLEtBQUcsRUFBRSxHQUFHLEdBQUc7S0FBUSxFQUFFLEtBQUcsRUFBRSxLQUFHLEVBQUUsS0FBRyxLQUFLLElBQUk7S0FBRSxNQUFJLEVBQUUsR0FBRyxLQUNyZixHQUFFLEVBQUUsS0FBRyxFQUFFLEtBQUcsRUFBRSxLQUFHLEVBQUU7S0FBSSxPQUFPO0lBQUM7SUFBRSxHQUFHLEdBQUU7S0FBQyxPQUFPLEVBQUUsS0FBRyxFQUFFLEdBQUcsV0FBUyxFQUFFLEdBQUcsU0FBUyxHQUFFLEVBQUUsRUFBRSxJQUFFLElBQUksV0FBVyxFQUFFLEVBQUUsb0JBQUUsSUFBSSxXQUFXLENBQUM7SUFBQztJQUFFLElBQUc7S0FBQyxHQUFHLEdBQUU7TUFBQyxJQUFJLElBQUUsQ0FBQztNQUFFLEVBQUUsS0FBRyxVQUFRLEVBQUUsT0FBSyxTQUFPLEVBQUUsS0FBRztNQUFFLEVBQUUsS0FBRyxFQUFFO01BQUcsRUFBRSxPQUFLLEVBQUU7TUFBSyxFQUFFLEtBQUc7TUFBRSxFQUFFLE1BQUk7TUFBRSxFQUFFLEtBQUc7TUFBRSxFQUFFLEtBQUcsRUFBRTtNQUFHLEVBQUUsRUFBRSxJQUFJLElBQUUsRUFBRSxPQUFLLE9BQUssV0FBUyxFQUFFLE9BQUssU0FBTyxFQUFFLE9BQUssRUFBRSxLQUFHLFdBQVMsRUFBRSxPQUFLLFNBQU8sRUFBRSxPQUFLLEVBQUUsS0FBSyxTQUFPLEVBQUUsT0FBSztNQUFFLEVBQUUsS0FBRyxJQUFJLEtBQUssRUFBRSxFQUFFO01BQUUsRUFBRSxLQUFHLElBQUksS0FBSyxFQUFFLEVBQUU7TUFBRSxFQUFFLEtBQUcsSUFBSSxLQUFLLEVBQUUsRUFBRTtNQUFFLEVBQUUsS0FBRztNQUFLLEVBQUUsS0FBRyxLQUFLLEtBQUssRUFBRSxPQUFLLEVBQUUsRUFBRTtNQUFFLE9BQU87S0FBQztLQUFFLEdBQUcsR0FBRSxHQUFFO01BQUMsS0FBSSxJQUFJLEtBQUk7T0FBQztPQUFPO09BQVE7T0FBUTtNQUFPLEdBQUUsUUFDM2YsRUFBRSxPQUFLLEVBQUUsS0FBRyxFQUFFO01BQUksS0FBSyxNQUFJLEVBQUUsU0FBTyxJQUFFLEVBQUUsTUFBSyxFQUFFLE1BQUksTUFBSSxLQUFHLEtBQUcsRUFBRSxLQUFHLE1BQUssRUFBRSxLQUFHLE1BQUksSUFBRSxFQUFFLElBQUcsRUFBRSxLQUFHLElBQUksV0FBVyxDQUFDLEdBQUUsS0FBRyxFQUFFLEdBQUcsSUFBSSxFQUFFLFNBQVMsR0FBRSxLQUFLLElBQUksR0FBRSxFQUFFLEVBQUUsQ0FBQyxDQUFDLEdBQUUsRUFBRSxLQUFHO0tBQUk7S0FBRSxLQUFJO01BQUMsRUFBRSxPQUFLLEVBQUUsS0FBRyxJQUFJLEVBQUUsRUFBRSxHQUFFLEVBQUUsR0FBRyxRQUFNO01BQTZCLE1BQU0sRUFBRTtLQUFHO0tBQUUsR0FBRyxHQUFFLEdBQUUsR0FBRSxHQUFFO01BQUMsT0FBTyxFQUFFLFdBQVcsR0FBRSxHQUFFLEdBQUUsQ0FBQztLQUFDO0tBQUUsR0FBRyxHQUFFLEdBQUUsR0FBRTtNQUFDLElBQUc7T0FBQyxJQUFJLElBQUUsRUFBRSxHQUFFLENBQUM7TUFBQyxTQUFPLEdBQUUsQ0FBQztNQUFDLElBQUcsR0FBRTtPQUFDLElBQUcsRUFBRSxFQUFFLElBQUksR0FBRSxLQUFJLElBQUksS0FBSyxFQUFFLElBQUcsTUFBTSxJQUFJLEVBQUUsRUFBRTtPQUFFLEdBQUcsQ0FBQztNQUFDO01BQUMsT0FBTyxFQUFFLE9BQU8sR0FBRyxFQUFFO01BQU0sRUFBRSxHQUFHLEtBQUc7TUFBRSxFQUFFLE9BQUs7TUFBRSxFQUFFLEtBQUcsRUFBRSxLQUFHLEVBQUUsT0FBTyxLQUFHLEVBQUUsT0FBTyxLQUFHLEtBQUssSUFBSTtLQUFDO0tBQUUsR0FBRyxHQUFFLEdBQUU7TUFBQyxPQUFPLEVBQUUsR0FBRztNQUFHLEVBQUUsS0FDcGYsRUFBRSxLQUFHLEtBQUssSUFBSTtLQUFDO0tBQUUsR0FBRyxHQUFFLEdBQUU7TUFBQyxJQUFJLElBQUUsRUFBRSxHQUFFLENBQUMsR0FBRTtNQUFFLEtBQUksS0FBSyxFQUFFLElBQUcsTUFBTSxJQUFJLEVBQUUsRUFBRTtNQUFFLE9BQU8sRUFBRSxHQUFHO01BQUcsRUFBRSxLQUFHLEVBQUUsS0FBRyxLQUFLLElBQUk7S0FBQztLQUFFLEdBQUcsR0FBRTtNQUFDLE9BQU07T0FBQztPQUFJO09BQUssR0FBRyxPQUFPLEtBQUssRUFBRSxFQUFFO01BQUM7S0FBQztLQUFFLEdBQUcsR0FBRSxHQUFFLEdBQUU7TUFBQyxJQUFFLEVBQUUsV0FBVyxHQUFFLEdBQUUsT0FBTSxDQUFDO01BQUUsRUFBRSxPQUFLO01BQUUsT0FBTztLQUFDO0tBQUUsR0FBRyxHQUFFO01BQUMsSUFBRyxXQUFTLEVBQUUsT0FBSyxRQUFPLE1BQU0sSUFBSSxFQUFFLEVBQUU7TUFBRSxPQUFPLEVBQUU7S0FBSTtJQUFDO0lBQUUsSUFBRztLQUFDLEtBQUssR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFO01BQUMsSUFBSSxJQUFFLEVBQUUsS0FBSztNQUFHLElBQUcsS0FBRyxFQUFFLEtBQUssSUFBRyxPQUFPO01BQUUsSUFBRSxLQUFLLElBQUksRUFBRSxLQUFLLEtBQUcsR0FBRSxDQUFDO01BQUUsSUFBRyxJQUFFLEtBQUcsRUFBRSxVQUFTLEVBQUUsSUFBSSxFQUFFLFNBQVMsR0FBRSxJQUFFLENBQUMsR0FBRSxDQUFDO1dBQU8sS0FBSSxJQUFFLEdBQUUsSUFBRSxHQUFFLEtBQUksRUFBRSxJQUFFLEtBQUcsRUFBRSxJQUFFO01BQUcsT0FBTztLQUFDO0tBQUUsTUFBTSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRTtNQUFDLEVBQUUsV0FBUyxFQUFFLFdBQVMsSUFBRSxDQUFDO01BQUcsSUFBRyxDQUFDLEdBQUUsT0FBTztNQUMvZixJQUFFLEVBQUU7TUFBSyxFQUFFLEtBQUcsRUFBRSxLQUFHLEtBQUssSUFBSTtNQUFFLElBQUcsRUFBRSxhQUFXLENBQUMsRUFBRSxNQUFJLEVBQUUsR0FBRyxXQUFVO09BQUMsSUFBRyxHQUFFLE9BQU8sRUFBRSxLQUFHLEVBQUUsU0FBUyxHQUFFLElBQUUsQ0FBQyxHQUFFLEVBQUUsS0FBRztPQUFFLElBQUcsTUFBSSxFQUFFLE1BQUksTUFBSSxHQUFFLE9BQU8sRUFBRSxLQUFHLEVBQUUsTUFBTSxHQUFFLElBQUUsQ0FBQyxHQUFFLEVBQUUsS0FBRztPQUFFLElBQUcsSUFBRSxLQUFHLEVBQUUsSUFBRyxPQUFPLEVBQUUsR0FBRyxJQUFJLEVBQUUsU0FBUyxHQUFFLElBQUUsQ0FBQyxHQUFFLENBQUMsR0FBRTtNQUFDO01BQUMsSUFBRSxJQUFFO01BQUUsSUFBSSxJQUFFLEVBQUUsS0FBRyxFQUFFLEdBQUcsU0FBTztNQUFFLEtBQUcsTUFBSSxJQUFFLEtBQUssSUFBSSxHQUFFLEtBQUcsVUFBUSxJQUFFLElBQUUsV0FBUyxDQUFDLEdBQUUsS0FBRyxNQUFJLElBQUUsS0FBSyxJQUFJLEdBQUUsR0FBRyxJQUFHLElBQUUsRUFBRSxJQUFHLEVBQUUsS0FBRyxJQUFJLFdBQVcsQ0FBQyxHQUFFLElBQUUsRUFBRSxNQUFJLEVBQUUsR0FBRyxJQUFJLEVBQUUsU0FBUyxHQUFFLEVBQUUsRUFBRSxHQUFFLENBQUM7TUFBRyxJQUFHLEVBQUUsR0FBRyxZQUFVLEVBQUUsVUFBUyxFQUFFLEdBQUcsSUFBSSxFQUFFLFNBQVMsR0FBRSxJQUFFLENBQUMsR0FBRSxDQUFDO1dBQU8sS0FBSSxJQUFFLEdBQUUsSUFBRSxHQUFFLEtBQUksRUFBRSxHQUFHLElBQUUsS0FBRyxFQUFFLElBQUU7TUFBRyxFQUFFLEtBQUcsS0FBSyxJQUFJLEVBQUUsSUFDdmYsSUFBRSxDQUFDO01BQUUsT0FBTztLQUFDO0tBQUUsR0FBRyxHQUFFLEdBQUUsR0FBRTtNQUFDLE1BQUksSUFBRSxLQUFHLEVBQUUsV0FBUyxNQUFJLEtBQUcsV0FBUyxFQUFFLEtBQUssT0FBSyxXQUFTLEtBQUcsRUFBRSxLQUFLO01BQUksSUFBRyxJQUFFLEdBQUUsTUFBTSxJQUFJLEVBQUUsRUFBRTtNQUFFLE9BQU87S0FBQztLQUFFLEdBQUcsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFO01BQUMsSUFBRyxXQUFTLEVBQUUsS0FBSyxPQUFLLFFBQU8sTUFBTSxJQUFJLEVBQUUsRUFBRTtNQUFFLElBQUUsRUFBRSxLQUFLO01BQUcsSUFBRyxJQUFFLEtBQUcsQ0FBQyxLQUFHLEVBQUUsV0FBUyxFQUFFLFFBQU87T0FBQyxJQUFFLENBQUM7T0FBRSxJQUFFLFFBQU0sS0FBSyxLQUFLLElBQUUsS0FBSztPQUFFLElBQUksSUFBRSxHQUFHLE9BQU0sQ0FBQztPQUFFLEtBQUcsRUFBRSxLQUFLLEdBQUUsR0FBRSxJQUFFLENBQUM7T0FBRSxJQUFFO09BQUUsSUFBRyxDQUFDLEdBQUUsTUFBTSxJQUFJLEVBQUUsRUFBRTtPQUFFLElBQUcsR0FBRTtRQUFDLElBQUcsSUFBRSxLQUFHLElBQUUsSUFBRSxFQUFFLFFBQU8sRUFBRSxXQUFTLElBQUUsRUFBRSxTQUFTLEdBQUUsSUFBRSxDQUFDLElBQUUsSUFBRSxNQUFNLFVBQVUsTUFBTSxLQUFLLEdBQUUsR0FBRSxJQUFFLENBQUM7UUFBRSxFQUFFLElBQUksR0FBRSxDQUFDO09BQUM7TUFBQyxPQUFNLElBQUUsQ0FBQyxHQUFFLElBQUUsRUFBRTtNQUFXLE9BQU07T0FBQyxJQUFHO09BQUUsSUFBRztNQUFDO0tBQUM7S0FBRSxHQUFHLEdBQUUsR0FBRSxHQUFFLEdBQUU7TUFBQyxFQUFFLEdBQUcsTUFBTSxHQUN6ZixHQUFFLEdBQUUsR0FBRSxHQUFFLENBQUMsQ0FBQztNQUFFLE9BQU87S0FBQztJQUFDO0dBQUMsR0FBRSxNQUFJLEdBQUUsTUFBSTtJQUFDLElBQUksSUFBRTtJQUFFLE1BQUksS0FBRztJQUFLLE1BQUksS0FBRztJQUFLLE9BQU87R0FBQyxHQUFFLEtBQUcsTUFBSyxLQUFHLENBQUMsR0FBRSxLQUFHLENBQUMsR0FBRSxLQUFHLEdBQUUsSUFBRSxNQUFLLEtBQUcsQ0FBQyxHQUFFLEtBQUcsQ0FBQyxHQUFFLEtBQUcsQ0FBQyxHQUFFLElBQUUsTUFBSztJQUFDLE9BQUs7SUFBYSxZQUFZLEdBQUU7S0FBQyxLQUFLLEtBQUc7SUFBQztHQUFDLEdBQUUsS0FBRyxNQUFLO0lBQUMsS0FBRyxDQUFDO0lBQUUsT0FBSztJQUFLLElBQUksUUFBTztLQUFDLE9BQU8sS0FBSyxHQUFHO0lBQUs7SUFBQyxJQUFJLE1BQU0sR0FBRTtLQUFDLEtBQUssR0FBRyxRQUFNO0lBQUM7SUFBQyxJQUFJLFdBQVU7S0FBQyxPQUFPLEtBQUssR0FBRztJQUFRO0lBQUMsSUFBSSxTQUFTLEdBQUU7S0FBQyxLQUFLLEdBQUcsV0FBUztJQUFDO0dBQUMsR0FBRSxLQUFHLE1BQUs7SUFBQyxLQUFHLENBQUM7SUFBRSxLQUFHLENBQUM7SUFBRSxLQUFHO0lBQUssWUFBWSxHQUFFLEdBQUUsR0FBRSxHQUFFO0tBQUMsTUFBSTtLQUFLLEtBQUssU0FBTztLQUFFLEtBQUssS0FBRyxFQUFFO0tBQUcsS0FBSyxLQUFHO0tBQUssS0FBSyxPQUFLO0tBQUUsS0FBSyxPQUFLO0tBQUUsS0FBSyxLQUFHO0tBQUUsS0FBSyxLQUFHLEtBQUssS0FBRyxLQUFLLEtBQUcsS0FBSyxJQUFJO0lBQUM7SUFBQyxJQUFJLE9BQU07S0FBQyxPQUFPLFNBQ2hoQixLQUFLLE9BQUs7SUFBSTtJQUFDLElBQUksS0FBSyxHQUFFO0tBQUMsSUFBRSxLQUFLLFFBQU0sTUFBSSxLQUFLLFFBQU07SUFBSTtJQUFDLElBQUksUUFBTztLQUFDLE9BQU8sU0FBTyxLQUFLLE9BQUs7SUFBSTtJQUFDLElBQUksTUFBTSxHQUFFO0tBQUMsSUFBRSxLQUFLLFFBQU0sTUFBSSxLQUFLLFFBQU07SUFBSTtHQUFDO0dBQ3BKLFNBQVMsRUFBRSxHQUFFLElBQUUsQ0FBQyxHQUFFO0lBQUMsSUFBRyxDQUFDLEdBQUUsTUFBTSxJQUFJLEVBQUUsRUFBRTtJQUFFLEVBQUUsT0FBSyxFQUFFLEtBQUcsQ0FBQztJQUFHLFFBQU0sRUFBRSxPQUFPLENBQUMsTUFBSSxJQUFFLE9BQUs7SUFBRyxJQUFJLElBQUU7SUFBRSxHQUFFLE9BQUssS0FBRyxHQUFFLEtBQUk7S0FBQyxJQUFFLEVBQUUsTUFBTSxHQUFHLENBQUMsQ0FBQyxRQUFPLE1BQUcsQ0FBQyxDQUFDLENBQUM7S0FBRSxLQUFJLElBQUksSUFBRSxJQUFHLElBQUUsS0FBSSxJQUFFLEdBQUUsSUFBRSxFQUFFLFFBQU8sS0FBSTtNQUFDLElBQUksSUFBRSxNQUFJLEVBQUUsU0FBTztNQUFFLElBQUcsS0FBRyxFQUFFLFFBQU87TUFBTSxJQUFHLFFBQU0sRUFBRSxJQUFHLElBQUcsU0FBTyxFQUFFLElBQUcsSUFBRyxJQUFFLEdBQUcsQ0FBQyxHQUFFLE1BQUksRUFBRSxRQUFPO09BQUMsSUFBRSxJQUFFLE1BQUksRUFBRSxNQUFNLElBQUUsQ0FBQyxDQUFDLENBQUMsS0FBSyxHQUFHO09BQUU7T0FBSSxTQUFTO01BQUMsT0FBTSxJQUFFLEVBQUU7V0FBVztPQUFDLElBQUUsR0FBRyxJQUFFLE1BQUksRUFBRSxFQUFFO09BQUUsSUFBRztRQUFDLElBQUUsRUFBRSxHQUFFLEVBQUUsRUFBRTtPQUFDLFNBQU8sR0FBRTtRQUFDLElBQUcsT0FBSyxHQUFHLE1BQUksS0FBRyxFQUFFLElBQUcsT0FBTSxFQUFDLE1BQUssRUFBQztRQUFFLE1BQU07T0FBRTtPQUFDLENBQUMsRUFBRSxNQUFJLEtBQUcsQ0FBQyxFQUFFLE9BQUssSUFBRSxFQUFFLEdBQUc7T0FBTSxJQUFHLFdBQVMsRUFBRSxPQUFLLFdBQVMsQ0FBQyxLQUFHLEVBQUUsS0FBSTtRQUFDLElBQUcsQ0FBQyxFQUFFLEdBQUcsSUFBRyxNQUFNLElBQUksRUFBRSxFQUFFO1FBQ2poQixJQUFFLEVBQUUsR0FBRyxHQUFHLENBQUM7UUFBRSxRQUFNLEVBQUUsT0FBTyxDQUFDLE1BQUksSUFBRSxHQUFHLENBQUMsSUFBRSxNQUFJO1FBQUcsSUFBRSxJQUFFLE1BQUksRUFBRSxNQUFNLElBQUUsQ0FBQyxDQUFDLENBQUMsS0FBSyxHQUFHO1FBQUUsU0FBUztPQUFDO01BQUM7S0FBQztLQUFDLE9BQU07TUFBQyxNQUFLO01BQUUsTUFBSztLQUFDO0lBQUM7SUFBQyxNQUFNLElBQUksRUFBRSxFQUFFO0dBQUU7R0FBQyxTQUFTLEdBQUcsR0FBRTtJQUFDLEtBQUksSUFBSSxLQUFJO0tBQUMsSUFBRyxNQUFJLEVBQUUsUUFBTyxPQUFPLElBQUUsRUFBRSxHQUFHLElBQUcsSUFBRSxRQUFNLEVBQUUsRUFBRSxTQUFPLEtBQUcsR0FBRyxFQUFFLEdBQUcsTUFBSSxJQUFFLElBQUU7S0FBRSxJQUFFLElBQUUsR0FBRyxFQUFFLEtBQUssR0FBRyxNQUFJLEVBQUU7S0FBSyxJQUFFLEVBQUU7SUFBTTtHQUFDO0dBQUMsU0FBUyxHQUFHLEdBQUUsR0FBRTtJQUFDLEtBQUksSUFBSSxJQUFFLEdBQUUsSUFBRSxHQUFFLElBQUUsRUFBRSxRQUFPLEtBQUksS0FBRyxLQUFHLEtBQUcsSUFBRSxFQUFFLFdBQVcsQ0FBQyxJQUFFO0lBQUUsUUFBTyxJQUFFLE1BQUksS0FBRyxFQUFFO0dBQU07R0FBQyxTQUFTLEdBQUcsR0FBRTtJQUFDLElBQUksSUFBRSxHQUFHLEVBQUUsT0FBTyxJQUFHLEVBQUUsSUFBSTtJQUFFLElBQUcsRUFBRSxPQUFLLEdBQUUsRUFBRSxLQUFHLEVBQUU7U0FBUSxLQUFJLElBQUUsRUFBRSxJQUFHLElBQUc7S0FBQyxJQUFHLEVBQUUsT0FBSyxHQUFFO01BQUMsRUFBRSxLQUFHLEVBQUU7TUFBRztLQUFLO0tBQUMsSUFBRSxFQUFFO0lBQUU7R0FBQztHQUNoZixTQUFTLEVBQUUsR0FBRSxHQUFFO0lBQUMsSUFBSSxJQUFFLEVBQUUsRUFBRSxJQUFJLEtBQUcsSUFBRSxHQUFHLEdBQUUsR0FBRyxLQUFHLElBQUUsRUFBRSxHQUFHLEtBQUcsSUFBRSxJQUFFO0lBQUcsSUFBRyxHQUFFLE1BQU0sSUFBSSxFQUFFLENBQUM7SUFBRSxLQUFJLElBQUUsRUFBRSxHQUFHLEVBQUUsSUFBRyxDQUFDLElBQUcsR0FBRSxJQUFFLEVBQUUsSUFBRztLQUFDLElBQUksSUFBRSxFQUFFO0tBQUssSUFBRyxFQUFFLE9BQU8sT0FBSyxFQUFFLE1BQUksTUFBSSxHQUFFLE9BQU87SUFBQztJQUFDLE9BQU8sRUFBRSxHQUFHLEdBQUcsR0FBRSxDQUFDO0dBQUM7R0FBQyxTQUFTLEdBQUcsR0FBRSxHQUFFLEdBQUUsR0FBRTtJQUFDLElBQUUsSUFBSSxHQUFHLEdBQUUsR0FBRSxHQUFFLENBQUM7SUFBRSxJQUFFLEdBQUcsRUFBRSxPQUFPLElBQUcsRUFBRSxJQUFJO0lBQUUsRUFBRSxLQUFHLEVBQUU7SUFBRyxPQUFPLEVBQUUsS0FBRztHQUFDO0dBQUMsU0FBUyxFQUFFLEdBQUU7SUFBQyxPQUFPLFdBQVMsSUFBRTtHQUFNO0dBQUMsU0FBUyxHQUFHLEdBQUU7SUFBQyxJQUFJLElBQUU7S0FBQztLQUFJO0tBQUk7SUFBSSxDQUFDLENBQUMsSUFBRTtJQUFHLElBQUUsUUFBTSxLQUFHO0lBQUssT0FBTztHQUFDO0dBQ3hYLFNBQVMsR0FBRyxHQUFFLEdBQUU7SUFBQyxJQUFHLElBQUcsT0FBTztJQUFFLElBQUcsQ0FBQyxFQUFFLFNBQVMsR0FBRyxLQUFHLEVBQUUsT0FBSyxLQUFRO1NBQUEsRUFBRSxTQUFTLEdBQUcsS0FBRyxFQUFFLEVBQUUsT0FBSyxRQUFNLEVBQUUsU0FBUyxHQUFHLEtBQUcsRUFBRSxFQUFFLE9BQUssS0FBSSxPQUFPO0lBQUEsT0FBTyxPQUFPO0lBQUUsT0FBTztHQUFDO0dBQUMsU0FBUyxHQUFHLEdBQUUsR0FBRTtJQUFDLElBQUcsQ0FBQyxFQUFFLEVBQUUsSUFBSSxHQUFFLE9BQU87SUFBRyxJQUFHO0tBQUMsT0FBTyxFQUFFLEdBQUUsQ0FBQyxHQUFFO0lBQUUsU0FBTyxHQUFFLENBQUM7SUFBQyxPQUFPLEdBQUcsR0FBRSxJQUFJO0dBQUM7R0FBQyxTQUFTLEdBQUcsR0FBRSxHQUFFLEdBQUU7SUFBQyxJQUFHO0tBQUMsSUFBSSxJQUFFLEVBQUUsR0FBRSxDQUFDO0lBQUMsU0FBTyxHQUFFO0tBQUMsT0FBTyxFQUFFO0lBQUU7SUFBQyxJQUFHLElBQUUsR0FBRyxHQUFFLElBQUksR0FBRSxPQUFPO0lBQUUsSUFBRyxHQUFFO0tBQUMsSUFBRyxDQUFDLEVBQUUsRUFBRSxJQUFJLEdBQUUsT0FBTztLQUFHLElBQUcsTUFBSSxFQUFFLFVBQVEsUUFBTSxHQUFHLENBQUMsR0FBRSxPQUFPO0lBQUUsT0FBTSxJQUFHLEVBQUUsRUFBRSxJQUFJLEdBQUUsT0FBTztJQUFHLE9BQU87R0FBQztHQUFDLFNBQVMsR0FBRyxHQUFFO0lBQUMsSUFBRyxDQUFDLEdBQUUsTUFBTSxJQUFJLEVBQUUsRUFBRTtJQUFFLE9BQU87R0FBQztHQUNyZSxTQUFTLEVBQUUsR0FBRTtJQUFDLElBQUUsR0FBRztJQUFHLElBQUcsQ0FBQyxHQUFFLE1BQU0sSUFBSSxFQUFFLENBQUM7SUFBRSxPQUFPO0dBQUM7R0FBQyxTQUFTLEdBQUcsR0FBRSxJQUFFLElBQUc7SUFBQyxJQUFFLE9BQU8sT0FBTyxJQUFJLEdBQUMsR0FBRSxDQUFDO0lBQUUsSUFBRyxNQUFJLEdBQUUsR0FBRTtLQUFDLEtBQUksSUFBRSxHQUFFLFFBQU0sR0FBRSxLQUFJLElBQUcsQ0FBQyxHQUFHLElBQUcsTUFBTTtLQUFFLE1BQU0sSUFBSSxFQUFFLEVBQUU7SUFBRTtJQUFDLEVBQUUsS0FBRztJQUFFLE9BQU8sR0FBRyxLQUFHO0dBQUM7R0FBQyxTQUFTLEdBQUcsR0FBRSxJQUFFLElBQUc7SUFBQyxJQUFFLEdBQUcsR0FBRSxDQUFDO0lBQUUsRUFBRSxJQUFJLEtBQUssQ0FBQztJQUFFLE9BQU87R0FBQztHQUFDLFNBQVMsR0FBRyxHQUFFLEdBQUUsR0FBRTtJQUFDLElBQUksSUFBRSxHQUFHLEdBQUc7SUFBRyxJQUFFLElBQUUsSUFBRTtJQUFFLE1BQUksRUFBRSxHQUFHO0lBQUcsR0FBRyxDQUFDO0lBQUUsRUFBRSxHQUFFLENBQUM7R0FBQztHQUFDLElBQUksS0FBRztJQUFDLEtBQUssR0FBRTtLQUFDLEVBQUUsS0FBRyxHQUFHLEVBQUUsS0FBSyxHQUFHLENBQUM7S0FBRyxFQUFFLEdBQUcsT0FBTyxDQUFDO0lBQUM7SUFBRSxLQUFJO0tBQUMsTUFBTSxJQUFJLEVBQUUsRUFBRTtJQUFFO0dBQUM7R0FBRSxTQUFTLEdBQUcsR0FBRSxHQUFFO0lBQUMsR0FBRyxLQUFHLEVBQUMsSUFBRyxFQUFDO0dBQUM7R0FDOVosU0FBUyxHQUFHLEdBQUUsR0FBRTtJQUFDLElBQUksSUFBRSxRQUFNO0lBQUUsSUFBRyxLQUFHLElBQUcsTUFBTSxJQUFJLEVBQUUsRUFBRTtJQUFFLElBQUcsQ0FBQyxLQUFHLEdBQUU7S0FBQyxJQUFJLElBQUUsRUFBRSxHQUFFLEVBQUMsSUFBRyxDQUFDLEVBQUMsQ0FBQztLQUFFLElBQUUsRUFBRTtLQUFLLElBQUUsRUFBRTtLQUFLLElBQUcsRUFBRSxJQUFHLE1BQU0sSUFBSSxFQUFFLEVBQUU7S0FBRSxJQUFHLENBQUMsRUFBRSxFQUFFLElBQUksR0FBRSxNQUFNLElBQUksRUFBRSxFQUFFO0lBQUU7SUFBQyxJQUFFO0tBQUMsTUFBSztLQUFFLElBQUcsQ0FBQztLQUFFLElBQUc7S0FBRSxJQUFHLENBQUM7SUFBQztJQUFFLElBQUUsRUFBRSxHQUFHLENBQUM7SUFBRSxFQUFFLEtBQUc7SUFBRSxFQUFFLE9BQUs7SUFBRSxJQUFFLEtBQUcsSUFBRSxNQUFJLEVBQUUsS0FBRyxHQUFFLEVBQUUsTUFBSSxFQUFFLEdBQUcsR0FBRyxLQUFLLENBQUM7R0FBRTtHQUFDLFNBQVMsR0FBRyxHQUFFLEdBQUUsR0FBRTtJQUFDLElBQUksSUFBRSxFQUFFLEdBQUUsRUFBQyxRQUFPLENBQUMsRUFBQyxDQUFDLENBQUMsQ0FBQztJQUFLLElBQUUsR0FBRyxDQUFDO0lBQUUsSUFBRyxDQUFDLEdBQUUsTUFBTSxJQUFJLEVBQUUsRUFBRTtJQUFFLElBQUcsUUFBTSxLQUFHLFNBQU8sR0FBRSxNQUFNLElBQUksRUFBRSxFQUFFO0lBQUUsSUFBSSxJQUFFLEdBQUcsR0FBRSxDQUFDO0lBQUUsSUFBRyxHQUFFLE1BQU0sSUFBSSxFQUFFLENBQUM7SUFBRSxJQUFHLENBQUMsRUFBRSxHQUFHLElBQUcsTUFBTSxJQUFJLEVBQUUsRUFBRTtJQUFFLE9BQU8sRUFBRSxHQUFHLEdBQUcsR0FBRSxHQUFFLEdBQUUsQ0FBQztHQUFDO0dBQ3BjLFNBQVMsR0FBRyxHQUFFLElBQUUsS0FBSTtJQUFDLE9BQU8sR0FBRyxHQUFFLElBQUUsT0FBSyxPQUFNLENBQUM7R0FBQztHQUFDLFNBQVMsRUFBRSxHQUFFLElBQUUsS0FBSTtJQUFDLE9BQU8sR0FBRyxHQUFFLElBQUUsT0FBSyxPQUFNLENBQUM7R0FBQztHQUFDLFNBQVMsR0FBRyxHQUFFLEdBQUUsR0FBRTtJQUFDLGVBQWEsT0FBTyxNQUFJLElBQUUsR0FBRSxJQUFFO0lBQUssR0FBRyxHQUFFLElBQUUsTUFBSyxDQUFDO0dBQUM7R0FBQyxTQUFTLEdBQUcsR0FBRSxHQUFFO0lBQUMsSUFBRyxDQUFDLEdBQUcsQ0FBQyxHQUFFLE1BQU0sSUFBSSxFQUFFLEVBQUU7SUFBRSxJQUFJLElBQUUsRUFBRSxHQUFFLEVBQUMsUUFBTyxDQUFDLEVBQUMsQ0FBQyxDQUFDLENBQUM7SUFBSyxJQUFHLENBQUMsR0FBRSxNQUFNLElBQUksRUFBRSxFQUFFO0lBQUUsSUFBRSxHQUFHLENBQUM7SUFBRSxJQUFJLElBQUUsR0FBRyxHQUFFLENBQUM7SUFBRSxJQUFHLEdBQUUsTUFBTSxJQUFJLEVBQUUsQ0FBQztJQUFFLElBQUcsQ0FBQyxFQUFFLEdBQUcsSUFBRyxNQUFNLElBQUksRUFBRSxFQUFFO0lBQUUsRUFBRSxHQUFHLEdBQUcsR0FBRSxHQUFFLENBQUM7R0FBQztHQUN2VixTQUFTLEdBQUcsR0FBRTtJQUFDLElBQUksSUFBRSxFQUFFLEdBQUUsRUFBQyxRQUFPLENBQUMsRUFBQyxDQUFDLENBQUMsQ0FBQztJQUFLLElBQUUsR0FBRyxDQUFDO0lBQUUsSUFBSSxJQUFFLEVBQUUsR0FBRSxDQUFDLEdBQUUsSUFBRSxHQUFHLEdBQUUsR0FBRSxDQUFDLENBQUM7SUFBRSxJQUFHLEdBQUUsTUFBTSxJQUFJLEVBQUUsQ0FBQztJQUFFLElBQUcsQ0FBQyxFQUFFLEdBQUcsSUFBRyxNQUFNLElBQUksRUFBRSxFQUFFO0lBQUUsSUFBRyxFQUFFLElBQUcsTUFBTSxJQUFJLEVBQUUsRUFBRTtJQUFFLEVBQUUsR0FBRyxHQUFHLEdBQUUsQ0FBQztJQUFFLEdBQUcsQ0FBQztHQUFDO0dBQUMsU0FBUyxHQUFHLEdBQUU7SUFBQyxJQUFJLElBQUUsRUFBRSxHQUFFLEVBQUMsUUFBTyxDQUFDLEVBQUMsQ0FBQyxDQUFDLENBQUM7SUFBSyxJQUFHLENBQUMsR0FBRSxNQUFNLElBQUksRUFBRSxFQUFFO0lBQUUsSUFBRSxHQUFHLENBQUM7SUFBRSxJQUFJLElBQUUsRUFBRSxHQUFFLENBQUMsR0FBRSxJQUFFLEdBQUcsR0FBRSxHQUFFLENBQUMsQ0FBQztJQUFFLElBQUcsR0FBRSxNQUFNLElBQUksRUFBRSxDQUFDO0lBQUUsSUFBRyxDQUFDLEVBQUUsR0FBRyxJQUFHLE1BQU0sSUFBSSxFQUFFLEVBQUU7SUFBRSxJQUFHLEVBQUUsSUFBRyxNQUFNLElBQUksRUFBRSxFQUFFO0lBQUUsRUFBRSxHQUFHLEdBQUcsR0FBRSxDQUFDO0lBQUUsR0FBRyxDQUFDO0dBQUM7R0FBQyxTQUFTLEdBQUcsR0FBRSxHQUFFO0lBQUMsSUFBRSxFQUFFLEdBQUUsRUFBQyxJQUFHLENBQUMsRUFBQyxDQUFDLENBQUMsQ0FBQztJQUFLLE9BQU8sR0FBRyxFQUFFLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQztHQUFDO0dBQUMsU0FBUyxHQUFHLEdBQUUsR0FBRSxHQUFFLEdBQUU7SUFBQyxHQUFHLEdBQUUsR0FBRTtLQUFDLE1BQUssSUFBRSxPQUFLLEVBQUUsT0FBSztLQUFNLElBQUcsS0FBSyxJQUFJO0tBQUUsSUFBRztJQUFDLENBQUM7R0FBQztHQUMzZSxTQUFTLEdBQUcsR0FBRSxHQUFFO0lBQUMsSUFBRSxZQUFVLE9BQU8sSUFBRSxFQUFFLEdBQUUsRUFBQyxJQUFHLENBQUMsRUFBQyxDQUFDLENBQUMsQ0FBQyxPQUFLO0lBQUUsR0FBRyxNQUFLLEdBQUUsQ0FBQztHQUFDO0dBQUMsU0FBUyxHQUFHLEdBQUUsR0FBRSxHQUFFO0lBQUMsSUFBRyxFQUFFLEVBQUUsSUFBSSxHQUFFLE1BQU0sSUFBSSxFQUFFLEVBQUU7SUFBRSxJQUFHLFdBQVMsRUFBRSxPQUFLLFFBQU8sTUFBTSxJQUFJLEVBQUUsRUFBRTtJQUFFLElBQUksSUFBRSxHQUFHLEdBQUUsR0FBRztJQUFFLElBQUcsR0FBRSxNQUFNLElBQUksRUFBRSxDQUFDO0lBQUUsR0FBRyxHQUFFLEdBQUU7S0FBQyxNQUFLO0tBQUUsV0FBVSxLQUFLLElBQUk7SUFBQyxDQUFDO0dBQUM7R0FDMU8sU0FBUyxHQUFHLEdBQUUsR0FBRSxJQUFFLEtBQUk7SUFBQyxJQUFHLE9BQUssR0FBRSxNQUFNLElBQUksRUFBRSxFQUFFO0lBQUUsSUFBRyxZQUFVLE9BQU8sR0FBRTtLQUFDLElBQUksSUFBRTtNQUFDLEdBQUU7TUFBRSxNQUFLO01BQUUsR0FBRTtNQUFJLE1BQUs7TUFBSSxHQUFFO01BQUssTUFBSztLQUFJLEVBQUU7S0FBRyxJQUFHLGVBQWEsT0FBTyxHQUFFLE1BQU0sTUFBTSwyQkFBMkIsR0FBRztLQUFFLElBQUU7SUFBQztJQUFDLElBQUUsSUFBRSxLQUFHLElBQUUsT0FBSyxRQUFNO0lBQUUsSUFBRyxZQUFVLE9BQU8sR0FBRSxJQUFFO1NBQU07S0FBQyxJQUFJLElBQUUsRUFBRSxTQUFTLEdBQUc7S0FBRSxJQUFFLEVBQUUsR0FBRTtNQUFDLElBQUcsRUFBRSxJQUFFO01BQVEsSUFBRyxDQUFDO0tBQUMsQ0FBQztLQUFFLElBQUUsRUFBRTtLQUFLLElBQUUsRUFBRTtJQUFJO0lBQUMsSUFBSSxJQUFFLENBQUM7SUFBRSxJQUFHLElBQUUsSUFBRyxJQUFHLEdBQU07U0FBQSxJQUFFLEtBQUksTUFBTSxJQUFJLEVBQUUsRUFBRTtJQUFBLE9BQU87S0FBQyxJQUFHLEdBQUUsTUFBTSxJQUFJLEVBQUUsRUFBRTtLQUFFLElBQUUsR0FBRyxHQUFFLElBQUUsS0FBSSxDQUFDO0tBQUUsSUFBRSxDQUFDO0lBQUM7SUFBQyxJQUFHLENBQUMsR0FBRSxNQUFNLElBQUksRUFBRSxFQUFFO0lBQUUsVUFBUSxFQUFFLE9BQUssV0FBUyxLQUFHO0lBQU0sSUFBRyxJQUFFLFNBQU8sQ0FBQyxFQUFFLEVBQUUsSUFBSSxHQUFFLE1BQU0sSUFBSSxFQUFFLEVBQUU7SUFDOWYsSUFBRyxDQUFDLE1BQUksSUFBRSxJQUFFLFdBQVMsRUFBRSxPQUFLLFNBQU8sS0FBRyxFQUFFLEVBQUUsSUFBSSxNQUFJLFFBQU0sR0FBRyxDQUFDLEtBQUcsSUFBRSxPQUFLLEtBQUcsR0FBRyxHQUFFLEdBQUcsQ0FBQyxDQUFDLElBQUUsS0FBSSxNQUFNLElBQUksRUFBRSxDQUFDO0lBQUUsSUFBRSxPQUFLLENBQUMsTUFBSSxJQUFFLEdBQUUsSUFBRSxZQUFVLE9BQU8sSUFBRSxFQUFFLEdBQUUsRUFBQyxJQUFHLENBQUMsRUFBQyxDQUFDLENBQUMsQ0FBQyxPQUFLLEdBQUUsR0FBRyxNQUFLLEdBQUUsQ0FBQztJQUFHLEtBQUc7SUFBUSxJQUFFLEdBQUc7S0FBQyxNQUFLO0tBQUUsTUFBSyxHQUFHLENBQUM7S0FBRSxPQUFNO0tBQUUsVUFBUyxDQUFDO0tBQUUsVUFBUztLQUFFLElBQUcsRUFBRTtLQUFHLElBQUcsQ0FBQztLQUFFLE9BQU0sQ0FBQztJQUFDLENBQUM7SUFBRSxFQUFFLEdBQUcsUUFBTSxFQUFFLEdBQUcsS0FBSyxDQUFDO0lBQUUsS0FBRyxHQUFHLEdBQUUsSUFBRSxHQUFHO0lBQUUsQ0FBQyxFQUFFLGdCQUFjLElBQUUsS0FBRyxLQUFLLE9BQUssR0FBRyxLQUFHO0lBQUcsT0FBTztHQUFDO0dBQUMsU0FBUyxHQUFHLEdBQUU7SUFBQyxJQUFHLFNBQU8sRUFBRSxJQUFHLE1BQU0sSUFBSSxFQUFFLENBQUM7SUFBRSxFQUFFLE9BQUssRUFBRSxLQUFHO0lBQU0sSUFBRztLQUFDLEVBQUUsR0FBRyxTQUFPLEVBQUUsR0FBRyxNQUFNLENBQUM7SUFBQyxTQUFPLEdBQUU7S0FBQyxNQUFNO0lBQUUsVUFBUTtLQUFDLEdBQUcsRUFBRSxNQUFJO0lBQUk7SUFBQyxFQUFFLEtBQUc7R0FBSTtHQUNqZixTQUFTLEdBQUcsR0FBRSxHQUFFLEdBQUU7SUFBQyxJQUFHLFNBQU8sRUFBRSxJQUFHLE1BQU0sSUFBSSxFQUFFLENBQUM7SUFBRSxJQUFHLENBQUMsRUFBRSxZQUFVLENBQUMsRUFBRSxHQUFHLElBQUcsTUFBTSxJQUFJLEVBQUUsRUFBRTtJQUFFLElBQUcsS0FBRyxLQUFHLEtBQUcsS0FBRyxLQUFHLEdBQUUsTUFBTSxJQUFJLEVBQUUsRUFBRTtJQUFFLEVBQUUsV0FBUyxFQUFFLEdBQUcsR0FBRyxHQUFFLEdBQUUsQ0FBQztJQUFFLEVBQUUsS0FBRyxDQUFDO0dBQUM7R0FBQyxTQUFTLEdBQUcsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFO0lBQUMsSUFBRyxJQUFFLEtBQUcsSUFBRSxHQUFFLE1BQU0sSUFBSSxFQUFFLEVBQUU7SUFBRSxJQUFHLFNBQU8sRUFBRSxJQUFHLE1BQU0sSUFBSSxFQUFFLENBQUM7SUFBRSxJQUFHLE9BQUssRUFBRSxRQUFNLFVBQVMsTUFBTSxJQUFJLEVBQUUsQ0FBQztJQUFFLElBQUcsRUFBRSxFQUFFLEtBQUssSUFBSSxHQUFFLE1BQU0sSUFBSSxFQUFFLEVBQUU7SUFBRSxJQUFHLENBQUMsRUFBRSxHQUFHLE1BQUssTUFBTSxJQUFJLEVBQUUsRUFBRTtJQUFFLElBQUksSUFBRSxlQUFhLE9BQU87SUFBRSxJQUFHLENBQUMsR0FBRSxJQUFFLEVBQUU7U0FBYyxJQUFHLENBQUMsRUFBRSxVQUFTLE1BQU0sSUFBSSxFQUFFLEVBQUU7SUFBRSxJQUFFLEVBQUUsR0FBRyxLQUFLLEdBQUUsR0FBRSxHQUFFLEdBQUUsQ0FBQztJQUFFLE1BQUksRUFBRSxZQUFVO0lBQUcsT0FBTztHQUFDO0dBQzlkLFNBQVMsR0FBRyxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUU7SUFBQyxJQUFHLElBQUUsS0FBRyxJQUFFLEdBQUUsTUFBTSxJQUFJLEVBQUUsRUFBRTtJQUFFLElBQUcsU0FBTyxFQUFFLElBQUcsTUFBTSxJQUFJLEVBQUUsQ0FBQztJQUFFLElBQUcsT0FBSyxFQUFFLFFBQU0sVUFBUyxNQUFNLElBQUksRUFBRSxDQUFDO0lBQUUsSUFBRyxFQUFFLEVBQUUsS0FBSyxJQUFJLEdBQUUsTUFBTSxJQUFJLEVBQUUsRUFBRTtJQUFFLElBQUcsQ0FBQyxFQUFFLEdBQUcsT0FBTSxNQUFNLElBQUksRUFBRSxFQUFFO0lBQUUsRUFBRSxZQUFVLEVBQUUsUUFBTSxRQUFNLEdBQUcsR0FBRSxHQUFFLENBQUM7SUFBRSxJQUFJLElBQUUsZUFBYSxPQUFPO0lBQUUsSUFBRyxDQUFDLEdBQUUsSUFBRSxFQUFFO1NBQWMsSUFBRyxDQUFDLEVBQUUsVUFBUyxNQUFNLElBQUksRUFBRSxFQUFFO0lBQUUsSUFBRSxFQUFFLEdBQUcsTUFBTSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsS0FBSyxDQUFDO0lBQUUsTUFBSSxFQUFFLFlBQVU7SUFBRyxPQUFPO0dBQUM7R0FDM1csU0FBUyxHQUFHLEdBQUU7SUFBQyxJQUFJLElBQUUsS0FBRztJQUFFLElBQUksSUFBRTtJQUFTLFdBQVMsS0FBRyxhQUFXLEtBQUcsR0FBRywwQkFBMEIsRUFBRSxFQUFFO0lBQUUsSUFBRSxHQUFHLEdBQUUsQ0FBQztJQUFFLElBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQztJQUFLLElBQUksSUFBRSxJQUFJLFdBQVcsQ0FBQztJQUFFLEdBQUcsR0FBRSxHQUFFLEdBQUUsR0FBRSxDQUFDO0lBQUUsV0FBUyxNQUFJLElBQUUsR0FBRyxDQUFDO0lBQUcsR0FBRyxDQUFDO0lBQUUsT0FBTztHQUFDO0dBQ3ZNLFNBQVMsRUFBRSxHQUFFLEdBQUUsR0FBRTtJQUFDLElBQUUsR0FBRyxVQUFRLENBQUM7SUFBRSxJQUFJLElBQUUsR0FBRyxDQUFDLENBQUMsR0FBRSxDQUFDLENBQUMsQ0FBQztJQUFFLEVBQUUsT0FBSyxFQUFFLEtBQUc7SUFBSSxJQUFJLElBQUUsRUFBRSxRQUFNLElBQUU7SUFBRSxHQUFHLEdBQUU7S0FBQyxLQUFLLEdBQUU7TUFBQyxFQUFFLFdBQVMsQ0FBQztLQUFDO0tBQUUsUUFBTztNQUFDLEdBQUcsUUFBUSxVQUFRLEVBQUUsRUFBRTtLQUFDO0tBQUUsS0FBSyxHQUFFLEdBQUUsR0FBRSxHQUFFO01BQUMsS0FBSSxJQUFJLElBQUUsR0FBRSxJQUFFLEdBQUUsSUFBRSxHQUFFLEtBQUk7T0FBQyxJQUFHO1FBQUMsSUFBSSxJQUFFLEVBQUU7T0FBQyxTQUFPLElBQUc7UUFBQyxNQUFNLElBQUksRUFBRSxFQUFFO09BQUU7T0FBQyxJQUFHLEtBQUssTUFBSSxLQUFHLE1BQUksR0FBRSxNQUFNLElBQUksRUFBRSxDQUFDO09BQUUsSUFBRyxTQUFPLEtBQUcsS0FBSyxNQUFJLEdBQUU7T0FBTTtPQUFJLEVBQUUsSUFBRSxLQUFHO01BQUM7TUFBQyxNQUFJLEVBQUUsS0FBSyxLQUFHLEtBQUssSUFBSTtNQUFHLE9BQU87S0FBQztLQUFFLE1BQU0sR0FBRSxHQUFFLEdBQUUsR0FBRTtNQUFDLEtBQUksSUFBSSxJQUFFLEdBQUUsSUFBRSxHQUFFLEtBQUksSUFBRztPQUFDLEVBQUUsRUFBRSxJQUFFLEVBQUU7TUFBQyxTQUFPLEdBQUU7T0FBQyxNQUFNLElBQUksRUFBRSxFQUFFO01BQUU7TUFBQyxNQUFJLEVBQUUsS0FBSyxLQUFHLEVBQUUsS0FBSyxLQUFHLEtBQUssSUFBSTtNQUFHLE9BQU87S0FBQztJQUFDLENBQUM7SUFBRSxHQUFHLEdBQUUsR0FBRSxDQUFDO0dBQUM7R0FBQyxJQUFJLElBQUUsQ0FBQztHQUNwZSxTQUFTLEVBQUUsR0FBRSxHQUFFLEdBQUU7SUFBQyxJQUFHLFFBQU0sRUFBRSxPQUFPLENBQUMsR0FBRSxPQUFPO0lBQUUsSUFBRSxTQUFPLElBQUUsTUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDO0lBQUssSUFBRyxLQUFHLEVBQUUsUUFBTztLQUFDLElBQUcsQ0FBQyxHQUFFLE1BQU0sSUFBSSxFQUFFLEVBQUU7S0FBRSxPQUFPO0lBQUM7SUFBQyxPQUFPLElBQUUsTUFBSTtHQUFDO0dBQ3RJLFNBQVMsR0FBRyxHQUFFLEdBQUU7SUFBQyxFQUFFLEtBQUcsS0FBRyxFQUFFO0lBQUcsRUFBRSxJQUFFLEtBQUcsS0FBRyxFQUFFO0lBQUssRUFBRSxJQUFFLEtBQUcsS0FBRyxFQUFFO0lBQUcsRUFBRSxJQUFFLE1BQUksS0FBRyxFQUFFO0lBQUksRUFBRSxJQUFFLE1BQUksS0FBRyxFQUFFO0lBQUcsRUFBRSxJQUFFLE1BQUksS0FBRyxFQUFFO0lBQUcsRUFBRSxJQUFFLE1BQUksS0FBRyxPQUFPLEVBQUUsSUFBSTtJQUFFLEVBQUUsSUFBRSxNQUFJLEtBQUc7SUFBSyxFQUFFLElBQUUsTUFBSSxLQUFHLEVBQUU7SUFBRyxJQUFJLElBQUUsRUFBRSxHQUFHLFFBQVEsR0FBRSxJQUFFLEVBQUUsR0FBRyxRQUFRLEdBQUUsSUFBRSxFQUFFLEdBQUcsUUFBUTtJQUFFLEVBQUUsSUFBRSxNQUFJLEtBQUcsT0FBTyxLQUFLLE1BQU0sSUFBRSxHQUFHLENBQUM7SUFBRSxFQUFFLElBQUUsTUFBSSxLQUFHLElBQUUsTUFBSTtJQUFJLEVBQUUsSUFBRSxNQUFJLEtBQUcsT0FBTyxLQUFLLE1BQU0sSUFBRSxHQUFHLENBQUM7SUFBRSxFQUFFLElBQUUsTUFBSSxLQUFHLElBQUUsTUFBSTtJQUFJLEVBQUUsSUFBRSxNQUFJLEtBQUcsT0FBTyxLQUFLLE1BQU0sSUFBRSxHQUFHLENBQUM7SUFBRSxFQUFFLElBQUUsTUFBSSxLQUFHLElBQUUsTUFBSTtJQUFJLEVBQUUsSUFBRSxNQUFJLEtBQUcsT0FBTyxFQUFFLEVBQUU7SUFBRSxPQUFPO0dBQUM7R0FDOWEsSUFBSSxLQUFHLEtBQUssR0FBRSxXQUFPO0lBQUMsSUFBSSxJQUFFLEVBQUUsQ0FBQyxNQUFJO0lBQUcsTUFBSTtJQUFFLE9BQU87R0FBQyxHQUFFLEtBQUcsR0FBRSxLQUFHO0lBQUM7SUFBRTtJQUFHO0lBQUc7SUFBRztJQUFJO0lBQUk7SUFBSTtJQUFJO0lBQUk7SUFBSTtJQUFJO0dBQUcsR0FBRSxLQUFHO0lBQUM7SUFBRTtJQUFHO0lBQUc7SUFBRztJQUFJO0lBQUk7SUFBSTtJQUFJO0lBQUk7SUFBSTtJQUFJO0dBQUcsR0FBRSxLQUFHLENBQUMsR0FBRSxNQUFHLE1BQUc7SUFBQyxJQUFHLEVBQUUsYUFBYSxNQUFJLFlBQVUsSUFBRyxNQUFNO0dBQUUsR0FBRSxNQUFHLE1BQUc7SUFBQyxLQUFHO0lBQUUsTUFBSSxJQUFFLE9BQUssRUFBRSxTQUFTLENBQUMsR0FBRSxLQUFHLENBQUM7SUFBRyxNQUFNLElBQUksR0FBRyxDQUFDO0dBQUUsR0FBRSxNQUFHLE1BQUc7SUFBQyxJQUFHLENBQUMsSUFBRyxJQUFHO0tBQUMsRUFBRTtJQUFDLFNBQU8sR0FBRTtLQUFDLEdBQUcsQ0FBQztJQUFDLFVBQVE7S0FBQyxJQUFHLEVBQUUsTUFBSSxJQUFFLEtBQUksSUFBRztNQUFDLEtBQUcsSUFBRSxJQUFHLEdBQUcsQ0FBQztLQUFDLFNBQU8sR0FBRTtNQUFDLEdBQUcsQ0FBQztLQUFDO0lBQUM7R0FBQyxHQUFFLEtBQUcsQ0FBQyxHQUFFLFdBQU87SUFBQyxJQUFHLENBQUMsSUFBRztLQUFDLElBQUksSUFBRTtNQUFDLE1BQUs7TUFBVyxTQUFRO01BQVcsTUFBSztNQUFJLEtBQUk7TUFBSSxNQUFLO01BQWlCLE9BQU0sV0FBVyxXQUFXLFlBQ3RmLEtBQUssUUFBUSxLQUFJLEdBQUcsSUFBRTtNQUFTLEdBQUUsTUFBSTtLQUFnQixHQUFFO0tBQUUsS0FBSSxLQUFLLElBQUcsS0FBSyxNQUFJLEdBQUcsS0FBRyxPQUFPLEVBQUUsS0FBRyxFQUFFLEtBQUcsR0FBRztLQUFHLElBQUksSUFBRSxDQUFDO0tBQUUsS0FBSSxLQUFLLEdBQUUsRUFBRSxLQUFLLEdBQUcsRUFBRSxHQUFHLEVBQUUsSUFBSTtLQUFFLEtBQUc7SUFBQztJQUFDLE9BQU87R0FBRSxHQUFFLElBQUcsTUFBSSxHQUFFLEdBQUUsR0FBRSxNQUFJO0lBQUMsSUFBSSxJQUFFO0tBQUMsU0FBTyxNQUFHO01BQUMsSUFBSSxJQUFFO01BQUUsSUFBRyxTQUFPLEtBQUcsS0FBSyxNQUFJLEtBQUcsTUFBSSxHQUFFO09BQUMsSUFBRSxHQUFHLENBQUMsSUFBRTtPQUFFLElBQUksSUFBRSxFQUFFLENBQUM7T0FBRSxFQUFFLEdBQUUsR0FBRSxHQUFFLENBQUM7T0FBRSxJQUFFO01BQUM7TUFBQyxPQUFPO0tBQUM7S0FBRSxRQUFNLE1BQUc7TUFBQyxJQUFJLElBQUUsRUFBRSxFQUFFLE1BQU07TUFBRSxFQUFFLElBQUksR0FBRSxDQUFDO01BQUUsT0FBTztLQUFDO0lBQUM7SUFBRSxJQUFFLEVBQUUsTUFBSTtJQUFHLElBQUksSUFBRSxDQUFDLEdBQUUsSUFBRTtJQUFFLElBQUcsR0FBRSxLQUFJLElBQUksSUFBRSxHQUFFLElBQUUsRUFBRSxRQUFPLEtBQUk7S0FBQyxJQUFJLElBQUUsRUFBRSxFQUFFO0tBQUksS0FBRyxNQUFJLE1BQUksSUFBRSxHQUFHLElBQUcsRUFBRSxLQUFHLEVBQUUsRUFBRSxFQUFFLEtBQUcsRUFBRSxLQUFHLEVBQUU7SUFBRTtJQUFDLElBQUUsRUFBRSxHQUFHLENBQUM7SUFBRSxPQUFPLElBQUUsU0FBUyxHQUFFO0tBQUMsTUFBSSxLQUFHLEdBQUcsQ0FBQztLQUFFLE9BQU0sYUFDdGYsSUFBRSxFQUFFLENBQUMsSUFBRSxjQUFZLElBQUUsQ0FBQyxDQUFDLElBQUU7SUFBQyxFQUFFLENBQUM7R0FBQyxHQUFFLE1BQUcsTUFBRztJQUFDLElBQUksSUFBRSxHQUFHLENBQUMsSUFBRSxHQUFFLElBQUUsR0FBRyxDQUFDO0lBQUUsS0FBRyxFQUFFLEdBQUUsR0FBRSxHQUFFLENBQUM7SUFBRSxPQUFPO0dBQUMsR0FBRSxJQUFHLEtBQUcsQ0FBQyxHQUFFLEtBQUUsTUFBRztJQUFDLEdBQUcsT0FBTyxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQUUsRUFBRSxJQUFJLEdBQUUsSUFBSTtJQUFFLEdBQUcsS0FBSyxDQUFDO0dBQUMsR0FBRSxNQUFHLE1BQUc7SUFBQyxNQUFNLElBQUUsRUFBRTtJQUFPLE9BQU07S0FBQyxJQUFFLE1BQUk7S0FBSSxLQUFHO0tBQUUsR0FBRztJQUFDO0dBQUMsR0FBRSxLQUFHO0lBQUMsR0FBRTtJQUFJLEdBQUU7SUFBSSxHQUFFO0lBQUksR0FBRTtJQUFJLEdBQUU7SUFBSSxHQUFFO0dBQUcsR0FBRSxNQUFHLE1BQUcsR0FBRyxNQUFNLEtBQUssSUFBRSxNQUFHLEdBQUcsRUFBRSxDQUFDLEdBQUUsTUFBSSxHQUFFLE1BQUk7SUFBQyxJQUFHLENBQUMsSUFBRztLQUFDLHFCQUFHLElBQUksUUFBTTtLQUFFLElBQUksSUFBRSxFQUFFO0tBQU8sSUFBRyxJQUFHLEtBQUksSUFBSSxJQUFFLEdBQUUsSUFBRSxJQUFFLEdBQUUsS0FBSTtNQUFDLElBQUksSUFBRSxFQUFFLElBQUksQ0FBQztNQUFFLEtBQUcsR0FBRyxJQUFJLEdBQUUsQ0FBQztLQUFDO0lBQUM7SUFBQyxJQUFHLElBQUUsR0FBRyxJQUFJLENBQUMsS0FBRyxHQUFFLE9BQU87SUFBRSxJQUFFLEdBQUcsU0FBTyxHQUFHLElBQUksSUFBRSxFQUFFLEtBQUssQ0FBQztJQUFFLElBQUc7S0FBQyxFQUFFLElBQUksR0FBRSxDQUFDO0lBQUMsU0FBTyxHQUFFO0tBQUMsSUFBRyxFQUFFLGFBQWEsWUFBVyxNQUFNO0tBQ25mLElBQUUsV0FBVyxHQUFHLEdBQUUsSUFBRyxLQUFJLEtBQUksR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUcsR0FBRztNQUFDO01BQUU7TUFBRyxHQUFHLEdBQUcsRUFBRSxNQUFNLENBQUMsQ0FBQztNQUFFLEdBQUcsR0FBRyxRQUFNLEVBQUUsS0FBRyxLQUFHLEVBQUUsRUFBRTtLQUFDLENBQUMsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEtBQUksR0FBRSxLQUFJLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEtBQUksR0FBRSxDQUFDO0tBQUUsSUFBRSxJQUFJLFlBQVksT0FBTyxDQUFDO0tBQUUsSUFBRyxJQUFJLFlBQVksU0FBUyxHQUFFLEVBQUMsR0FBRSxFQUFDLEdBQUUsRUFBQyxFQUFDLENBQUMsQ0FBQyxDQUFFLFFBQVE7S0FBRSxFQUFFLElBQUksR0FBRSxDQUFDO0lBQUM7SUFBQyxHQUFHLElBQUksR0FBRSxDQUFDO0lBQUUsT0FBTztHQUFDO0dBQUUsSUFBRSxNQUFNLElBQUk7R0FBRSxHQUFHLEdBQUUsR0FBRztHQUFFLEVBQUUsTUFBTTtHQUFFLEVBQUUsT0FBTztHQUFFLEVBQUUsZ0JBQWdCO0dBQ3hULENBQUMsV0FBVTtJQUFDLEVBQUUsTUFBTTtJQUFFLEdBQUcsS0FBSTtLQUFDLFlBQVM7S0FBRSxRQUFPLEdBQUUsR0FBRSxHQUFFLE1BQUk7S0FBRSxVQUFPO0lBQUMsQ0FBQztJQUFFLEdBQUcsYUFBWSxHQUFHO0lBQUUsR0FBRyxNQUFLLEVBQUU7SUFBRSxHQUFHLE1BQUssRUFBRTtJQUFFLEdBQUcsWUFBVyxJQUFJO0lBQUUsR0FBRyxhQUFZLElBQUk7SUFBRSxJQUFJLG9CQUFFLElBQUksV0FBVyxJQUFJLEdBQUUsSUFBRSxHQUFFLFVBQU07S0FBQyxNQUFJLE1BQUksR0FBRyxDQUFDLEdBQUUsSUFBRSxFQUFFO0tBQVksT0FBTyxFQUFFLEVBQUU7SUFBRTtJQUFFLEVBQUUsVUFBUyxDQUFDO0lBQUUsRUFBRSxXQUFVLENBQUM7SUFBRSxFQUFFLFVBQVU7SUFBRSxFQUFFLGNBQWM7R0FBQyxHQUFHO0dBQzlTLENBQUMsV0FBVTtJQUFDLEVBQUUsT0FBTztJQUFFLElBQUksSUFBRSxFQUFFLFlBQVk7SUFBRSxFQUFFLGVBQWU7SUFBRSxHQUFHLEVBQUMsS0FBSTtLQUFDLElBQUksSUFBRSxHQUFHLEdBQUUsTUFBSyxPQUFNLEVBQUU7S0FBRSxFQUFFLEtBQUcsRUFBQyxJQUFHLEVBQUUsR0FBRyxHQUFFO0tBQUUsRUFBRSxLQUFHO01BQUMsR0FBRyxHQUFFLEdBQUU7T0FBQyxJQUFFLENBQUM7T0FBRSxJQUFJLElBQUUsRUFBRSxDQUFDO09BQUUsSUFBRTtRQUFDLFFBQU87UUFBSyxJQUFHLEVBQUMsSUFBRyxPQUFNO1FBQUUsSUFBRyxFQUFDLFVBQU8sRUFBRSxLQUFJO1FBQUUs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QUFFO09BQUMsS0FBRyxLQUFLLElBQUksWUFBVyxRQUFNLEtBQUssS0FBSyxLQUFLLElBQUksR0FBRSxDQUFDLElBQUUsS0FBSyxDQUFDLElBQUUsR0FBRyxPQUFPLGFBQzllLFNBQU8sUUFBTTtPQUFFLElBQUc7UUFBQyxHQUFHLEtBQUssQ0FBQztRQUFFLEdBQUc7UUFBRSxJQUFJLElBQUU7UUFBRSxNQUFNO09BQUMsU0FBTyxHQUFFLENBQUM7T0FBQyxJQUFFLEtBQUs7TUFBQztNQUFDLElBQUcsR0FBRSxPQUFNLENBQUM7S0FBQztLQUFDLE9BQU0sQ0FBQztJQUFDO0lBQUUsSUFBRyxHQUFFLE1BQUk7S0FBQyxJQUFJLElBQUUsR0FBRSxJQUFFLEdBQUU7S0FBRSxLQUFJLEtBQUssR0FBRyxHQUFFO01BQUMsSUFBSSxJQUFFLElBQUU7TUFBRSxFQUFFLElBQUUsS0FBRyxLQUFHO01BQUUsS0FBRyxFQUFFLEdBQUUsR0FBRSxHQUFFLFFBQVEsSUFBRTtNQUFFLEtBQUc7S0FBQztLQUFDLE9BQU87SUFBQztJQUFFLElBQUcsR0FBRSxNQUFJO0tBQUMsSUFBSSxJQUFFLEdBQUc7S0FBRSxFQUFFLEtBQUcsS0FBRyxFQUFFO0tBQU8sSUFBRTtLQUFFLEtBQUksSUFBSSxLQUFLLEdBQUUsS0FBRyxHQUFHLENBQUMsSUFBRTtLQUFFLEVBQUUsS0FBRyxLQUFHO0tBQUUsT0FBTztJQUFDO0lBQUUsR0FBRSxTQUFTLEdBQUU7S0FBQyxJQUFHO01BQVksR0FBTCxFQUFFLENBQU0sQ0FBQztNQUFFLE9BQU87S0FBQyxTQUFPLEdBQUU7TUFBQyxJQUFHLGVBQWEsT0FBTyxLQUFHLGlCQUFlLEVBQUUsTUFBSyxNQUFNO01BQUUsT0FBTyxFQUFFO0tBQUU7SUFBQztJQUFFLEdBQUUsU0FBUyxHQUFFLEdBQUU7S0FBQyxJQUFHO01BQUMsSUFBSSxJQUFFLEVBQUUsQ0FBQztNQUFFLEVBQUUsS0FBRyxFQUFFLEtBQUcsSUFBRSxFQUFFLEVBQUUsSUFBSSxJQUFFLElBQUUsV0FBUyxFQUFFLE9BQUssU0FBTyxJQUFF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USxFQUFFO0tBQUcsS0FBRyxFQUFFLFFBQU0sRUFBRTtLQUFHLEVBQUUsOEJBQTRCLEVBQUU7S0FBRyxLQUFHLEVBQUU7S0FBRyxLQUFHLEVBQUU7S0FBRyxLQUFHLEVBQUU7S0FBRyxJQUFFLEVBQUU7S0FBRyxLQUFHLEVBQUU7S0FBRyxLQUFHLEVBQUU7S0FBRSxJQUFFLEVBQUU7S0FBRSxHQUFHO0tBQUU7S0FBSSxFQUFFLHlCQUF5QixDQUFDO0tBQUUsS0FBRyxLQUFHLE9BQUssSUFBRSxJQUFHLEtBQUcsTUFBSyxFQUFFO0tBQUcsT0FBTztJQUFFO0lBQUM7SUFBSSxFQUFFLHlCQUF5QixDQUFDO0lBQUUsSUFBSSxJQUFFLEVBQUMsR0FBRSxHQUFFO0lBQUUsSUFBRyxFQUFFLGlCQUFnQixPQUFPLElBQUksU0FBUSxNQUFHO0tBQUMsRUFBRSxnQkFBZ0IsSUFBRyxHQUFFLE1BQUk7TUFBQyxFQUFFLEVBQUUsR0FBRSxDQUFDLENBQUM7S0FBQyxDQUFDO0lBQUMsQ0FBQztJQUNuZixPQUFLLEVBQUUsYUFBVyxFQUFFLFdBQVcseUJBQXdCLEVBQUUsSUFBRSxLQUFHO0lBQXdCLE9BQU8sR0FBRyxNQUFNLEdBQUcsQ0FBQyxHQUFHLFFBQVE7R0FBQyxHQUFHO0dBQUUsR0FBRztHQUl0SCxPQUFPO0VBQ1gsQ0FBQztFQUVILE9BQU87Q0FDVDtDQUlBLElBQUksT0FBTyxZQUFZLFlBQVksT0FBTyxXQUFXLFVBQVM7RUFDMUQsT0FBTyxVQUFVO0VBRWpCLE9BQU8sUUFBUSxVQUFVO0NBQzdCLE9BQ0ssSUFBSSxPQUFPLFdBQVcsY0FBYyxPQUFPLFFBQzVDLE9BQU8sQ0FBQyxHQUFHLFdBQVc7RUFBRSxPQUFPO0NBQVcsQ0FBQztNQUUxQyxJQUFJLE9BQU8sWUFBWSxVQUN4QixRQUFRLFlBQVkiLCJuYW1lcyI6W10sImlnbm9yZUxpc3QiOlswXSwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9wcm90b3R5cGUvbm9kZV9tb2R1bGVzL3NxbC5qcy9kaXN0L3NxbC13YXNtLWJyb3dzZXIuanMiXSwic291cmNlc0NvbnRlbnQiOlsiXG4vLyBXZSBhcmUgbW9kdWxhcml6aW5nIHRoaXMgbWFudWFsbHkgYmVjYXVzZSB0aGUgY3VycmVudCBtb2R1bGFyaXplIHNldHRpbmcgaW4gRW1zY3JpcHRlbiBoYXMgc29tZSBpc3N1ZXM6XG4vLyBodHRwczovL2dpdGh1Yi5jb20va3JpcGtlbi9lbXNjcmlwdGVuL2lzc3Vlcy81ODIwXG4vLyBJbiBhZGRpdGlvbiwgV2hlbiB5b3UgdXNlIGVtY2MncyBtb2R1bGFyaXphdGlvbiwgaXQgc3RpbGwgZXhwZWN0cyB0byBleHBvcnQgYSBnbG9iYWwgb2JqZWN0IGNhbGxlZCBgTW9kdWxlYCxcbi8vIHdoaWNoIGlzIGFibGUgdG8gYmUgdXNlZC9jYWxsZWQgYmVmb3JlIHRoZSBXQVNNIGlzIGxvYWRlZC5cbi8vIFRoZSBtb2R1bGFyaXphdGlvbiBiZWxvdyBleHBvcnRzIGEgcHJvbWlzZSB0aGF0IGxvYWRzIGFuZCByZXNvbHZlcyB0byB0aGUgYWN0dWFsIHNxbC5qcyBtb2R1bGUuXG4vLyBUaGF0IHdheSwgdGhpcyBtb2R1bGUgY2FuJ3QgYmUgdXNlZCBiZWZvcmUgdGhlIFdBU00gaXMgZmluaXNoZWQgbG9hZGluZy5cblxuLy8gV2UgYXJlIGdvaW5nIHRvIGRlZmluZSBhIGZ1bmN0aW9uIHRoYXQgYSB1c2VyIHdpbGwgY2FsbCB0byBzdGFydCBsb2FkaW5nIGluaXRpYWxpemluZyBvdXIgU3FsLmpzIGxpYnJhcnlcbi8vIEhvd2V2ZXIsIHRoYXQgZnVuY3Rpb24gbWlnaHQgYmUgY2FsbGVkIG11bHRpcGxlIHRpbWVzLCBhbmQgb24gc3Vic2VxdWVudCBjYWxscywgd2UgZG9uJ3QgYWN0dWFsbHkgd2FudCBpdCB0byBpbnN0YW50aWF0ZSBhIG5ldyBpbnN0YW5jZSBvZiB0aGUgTW9kdWxlXG4vLyBJbnN0ZWFkLCB3ZSB3YW50IHRvIHJldHVybiB0aGUgcHJldmlvdXNseSBsb2FkZWQgbW9kdWxlXG5cbi8vIFRPRE86IE1ha2UgdGhpcyBub3QgZGVjbGFyZSBhIGdsb2JhbCBpZiB1c2VkIGluIHRoZSBicm93c2VyXG52YXIgaW5pdFNxbEpzUHJvbWlzZSA9IHVuZGVmaW5lZDtcblxudmFyIGluaXRTcWxKcyA9IGZ1bmN0aW9uIChtb2R1bGVDb25maWcpIHtcblxuICAgIGlmIChpbml0U3FsSnNQcm9taXNlKXtcbiAgICAgIHJldHVybiBpbml0U3FsSnNQcm9taXNlO1xuICAgIH1cbiAgICAvLyBJZiB3ZSdyZSBoZXJlLCB3ZSd2ZSBuZXZlciBjYWxsZWQgdGhpcyBmdW5jdGlvbiBiZWZvcmVcbiAgICBpbml0U3FsSnNQcm9taXNlID0gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmVNb2R1bGUsIHJlamVjdCkge1xuXG4gICAgICAgIC8vIFdlIGFyZSBtb2R1bGFyaXppbmcgdGhpcyBtYW51YWxseSBiZWNhdXNlIHRoZSBjdXJyZW50IG1vZHVsYXJpemUgc2V0dGluZyBpbiBFbXNjcmlwdGVuIGhhcyBzb21lIGlzc3VlczpcbiAgICAgICAgLy8gaHR0cHM6Ly9naXRodWIuY29tL2tyaXBrZW4vZW1zY3JpcHRlbi9pc3N1ZXMvNTgyMFxuXG4gICAgICAgIC8vIFRoZSB3YXkgdG8gYWZmZWN0IHRoZSBsb2FkaW5nIG9mIGVtY2MgY29tcGlsZWQgbW9kdWxlcyBpcyB0byBjcmVhdGUgYSB2YXJpYWJsZSBjYWxsZWQgYE1vZHVsZWAgYW5kIGFkZFxuICAgICAgICAvLyBwcm9wZXJ0aWVzIHRvIGl0LCBsaWtlIGBwcmVSdW5gLCBgcG9zdFJ1bmAsIGV0Y1xuICAgICAgICAvLyBXZSBhcmUgdXNpbmcgdGhhdCB0byBnZXQgbm90aWZpZWQgd2hlbiB0aGUgV0FTTSBoYXMgZmluaXNoZWQgbG9hZGluZy5cbiAgICAgICAgLy8gT25seSB0aGVuIHdpbGwgd2UgcmV0dXJuIG91ciBwcm9taXNlXG5cbiAgICAgICAgLy8gSWYgdGhleSBwYXNzZWQgaW4gYSBtb2R1bGVDb25maWcgb2JqZWN0LCB1c2UgdGhhdFxuICAgICAgICAvLyBPdGhlcndpc2UsIGluaXRpYWxpemUgTW9kdWxlIHRvIHRoZSBlbXB0eSBvYmplY3RcbiAgICAgICAgdmFyIE1vZHVsZSA9IHR5cGVvZiBtb2R1bGVDb25maWcgIT09ICd1bmRlZmluZWQnID8gbW9kdWxlQ29uZmlnIDoge307XG5cbiAgICAgICAgLy8gRU1DQyBvbmx5IGFsbG93cyBmb3IgYSBzaW5nbGUgb25BYm9ydCBmdW5jdGlvbiAobm90IGFuIGFycmF5IG9mIGZ1bmN0aW9ucylcbiAgICAgICAgLy8gU28gaWYgdGhlIHVzZXIgZGVmaW5lZCB0aGVpciBvd24gb25BYm9ydCBmdW5jdGlvbiwgd2UgcmVtZW1iZXIgaXQgYW5kIGNhbGwgaXRcbiAgICAgICAgdmFyIG9yaWdpbmFsT25BYm9ydEZ1bmN0aW9uID0gTW9kdWxlWydvbkFib3J0J107XG4gICAgICAgIE1vZHVsZVsnb25BYm9ydCddID0gZnVuY3Rpb24gKGVycm9yVGhhdENhdXNlZEFib3J0KSB7XG4gICAgICAgICAgICByZWplY3QobmV3IEVycm9yKGVycm9yVGhhdENhdXNlZEFib3J0KSk7XG4gICAgICAgICAgICBpZiAob3JpZ2luYWxPbkFib3J0RnVuY3Rpb24pe1xuICAgICAgICAgICAgICBvcmlnaW5hbE9uQWJvcnRGdW5jdGlvbihlcnJvclRoYXRDYXVzZWRBYm9ydCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG5cbiAgICAgICAgTW9kdWxlWydwb3N0UnVuJ10gPSBNb2R1bGVbJ3Bvc3RSdW4nXSB8fCBbXTtcbiAgICAgICAgTW9kdWxlWydwb3N0UnVuJ10ucHVzaChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAvLyBXaGVuIEVtc2NyaXB0ZWQgY2FsbHMgcG9zdFJ1biwgdGhpcyBwcm9taXNlIHJlc29sdmVzIHdpdGggdGhlIGJ1aWx0IE1vZHVsZVxuICAgICAgICAgICAgcmVzb2x2ZU1vZHVsZShNb2R1bGUpO1xuICAgICAgICB9KTtcblxuICAgICAgICAvLyBUaGVyZSBpcyBhIHNlY3Rpb24gb2YgY29kZSBpbiB0aGUgZW1jYy1nZW5lcmF0ZWQgY29kZSBiZWxvdyB0aGF0IGxvb2tzIGxpa2UgdGhpczpcbiAgICAgICAgLy8gKE5vdGUgdGhhdCB0aGlzIGlzIGxvd2VyY2FzZSBgbW9kdWxlYClcbiAgICAgICAgLy8gaWYgKHR5cGVvZiBtb2R1bGUgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgIC8vICAgICBtb2R1bGVbJ2V4cG9ydHMnXSA9IE1vZHVsZTtcbiAgICAgICAgLy8gfVxuICAgICAgICAvLyBXaGVuIHRoYXQgcnVucywgaXQncyBnb2luZyB0byBvdmVyd3JpdGUgb3VyIG93biBtb2R1bGFyaXphdGlvbiBleHBvcnQgZWZmb3J0cyBpbiBzaGVsbC1wb3N0LmpzIVxuICAgICAgICAvLyBUaGUgb25seSB3YXkgdG8gdGVsbCBlbWNjIG5vdCB0byBlbWl0IGl0IGlzIHRvIHBhc3MgdGhlIE1PRFVMQVJJWkU9MSBvciBNT0RVTEFSSVpFX0lOU1RBTkNFPTEgZmxhZ3MsXG4gICAgICAgIC8vIGJ1dCB0aGF0IGNhcnJpZXMgd2l0aCBpdCBhZGRpdGlvbmFsIHVubmVjZXNzYXJ5IGJhZ2dhZ2UvYnVncyB3ZSBkb24ndCB3YW50IGVpdGhlci5cbiAgICAgICAgLy8gU28sIHdlIGhhdmUgdGhyZWUgb3B0aW9uczpcbiAgICAgICAgLy8gMSkgV2UgdW5kZWZpbmUgYG1vZHVsZWBcbiAgICAgICAgLy8gMikgV2UgcmVtZW1iZXIgd2hhdCBgbW9kdWxlWydleHBvcnRzJ11gIHdhcyBhdCB0aGUgYmVnaW5uaW5nIG9mIHRoaXMgZnVuY3Rpb24gYW5kIHdlIHJlc3RvcmUgaXQgbGF0ZXJcbiAgICAgICAgLy8gMykgV2Ugd3JpdGUgYSBzY3JpcHQgdG8gcmVtb3ZlIHRob3NlIGxpbmVzIG9mIGNvZGUgYXMgcGFydCBvZiB0aGUgTWFrZSBwcm9jZXNzLlxuICAgICAgICAvL1xuICAgICAgICAvLyBTaW5jZSB0aG9zZSBhcmUgdGhlIG9ubHkgbGluZXMgb2YgY29kZSB0aGF0IGNhcmUgYWJvdXQgbW9kdWxlLCB3ZSB3aWxsIHVuZGVmaW5lIGl0LiBJdCdzIHRoZSBtb3N0IHN0cmFpZ2h0Zm9yd2FyZFxuICAgICAgICAvLyBvZiB0aGUgb3B0aW9ucywgYW5kIGhhcyB0aGUgc2lkZSBlZmZlY3Qgb2YgcmVkdWNpbmcgZW1jYydzIGVmZm9ydHMgdG8gbW9kaWZ5IHRoZSBtb2R1bGUgaWYgaXRzIG91dHB1dCB3ZXJlIHRvIGNoYW5nZSBpbiB0aGUgZnV0dXJlLlxuICAgICAgICAvLyBUaGF0J3MgYSBuaWNlIHNpZGUgZWZmZWN0IHNpbmNlIHdlJ3JlIGhhbmRsaW5nIHRoZSBtb2R1bGFyaXphdGlvbiBlZmZvcnRzIG91cnNlbHZlc1xuICAgICAgICBtb2R1bGUgPSB1bmRlZmluZWQ7XG5cbiAgICAgICAgLy8gVGhlIGVtY2MtZ2VuZXJhdGVkIGNvZGUgYW5kIHNoZWxsLXBvc3QuanMgY29kZSBnb2VzIGJlbG93LFxuICAgICAgICAvLyBtZWFuaW5nIHRoYXQgYWxsIG9mIGl0IHJ1bnMgaW5zaWRlIG9mIHRoaXMgcHJvbWlzZS4gSWYgYW55dGhpbmcgdGhyb3dzIGFuIGV4Y2VwdGlvbiwgb3VyIHByb21pc2Ugd2lsbCBhYm9ydFxudmFyIGs7a3x8PXR5cGVvZiBNb2R1bGUgIT0gJ3VuZGVmaW5lZCcgPyBNb2R1bGUgOiB7fTt2YXIgYWE9ISFnbG9iYWxUaGlzLndpbmRvdyxiYT0hIWdsb2JhbFRoaXMuV29ya2VyR2xvYmFsU2NvcGU7XG5rLm9uUnVudGltZUluaXRpYWxpemVkPWZ1bmN0aW9uKCl7ZnVuY3Rpb24gYShmLGwpe3N3aXRjaCh0eXBlb2YgbCl7Y2FzZSBcImJvb2xlYW5cIjpiYyhmLGw/MTowKTticmVhaztjYXNlIFwibnVtYmVyXCI6Y2MoZixsKTticmVhaztjYXNlIFwic3RyaW5nXCI6ZGMoZixsLC0xLC0xKTticmVhaztjYXNlIFwib2JqZWN0XCI6aWYobnVsbD09PWwpZWIoZik7ZWxzZSBpZihudWxsIT1sLmxlbmd0aCl7dmFyIG49Y2EobC5sZW5ndGgpO20uc2V0KGwsbik7ZWMoZixuLGwubGVuZ3RoLC0xKTtkYShuKX1lbHNlIHVhKGYsXCJXcm9uZyBBUEkgdXNlIDogdHJpZWQgdG8gcmV0dXJuIGEgdmFsdWUgb2YgYW4gdW5rbm93biB0eXBlIChcIitsK1wiKS5cIiwtMSk7YnJlYWs7ZGVmYXVsdDplYihmKX19ZnVuY3Rpb24gYihmLGwpe2Zvcih2YXIgbj1bXSxwPTA7cDxmO3ArPTEpe3ZhciByPXQobCs0KnAsXCJpMzJcIiksdj1mYyhyKTtpZigxPT09dnx8Mj09PXYpcj1nYyhyKTtlbHNlIGlmKDM9PT12KXI9aGMocik7ZWxzZSBpZig0PT09XG52KXt2PXI7cj1pYyh2KTt2PWpjKHYpO2Zvcih2YXIgSj1uZXcgVWludDhBcnJheShyKSxJPTA7STxyO0krPTEpSltJXT1tW3YrSV07cj1KfWVsc2Ugcj1udWxsO24ucHVzaChyKX1yZXR1cm4gbn1mdW5jdGlvbiBjKGYsbCl7dGhpcy5RYT1mO3RoaXMuZGI9bDt0aGlzLk9hPTE7dGhpcy55Yj1bXX1mdW5jdGlvbiBkKGYsbCl7dGhpcy5kYj1sO3RoaXMub2I9ZWEoZik7aWYobnVsbD09PXRoaXMub2IpdGhyb3cgRXJyb3IoXCJVbmFibGUgdG8gYWxsb2NhdGUgbWVtb3J5IGZvciB0aGUgU1FMIHN0cmluZ1wiKTt0aGlzLnViPXRoaXMub2I7dGhpcy5nYj10aGlzLkZiPW51bGx9ZnVuY3Rpb24gZShmKXt0aGlzLmZpbGVuYW1lPVwiZGJmaWxlX1wiKyg0Mjk0OTY3Mjk1Kk1hdGgucmFuZG9tKCk+Pj4wKTtpZihudWxsIT1mKXt2YXIgbD10aGlzLmZpbGVuYW1lLG49XCIvXCIscD1sO24mJihuPVwic3RyaW5nXCI9PXR5cGVvZiBuP246ZmEobikscD1sP2hhKG4rXCIvXCIrbCk6bik7bD1pYSghMCwhMCk7cD1qYShwLFxubCk7aWYoZil7aWYoXCJzdHJpbmdcIj09dHlwZW9mIGYpe249QXJyYXkoZi5sZW5ndGgpO2Zvcih2YXIgcj0wLHY9Zi5sZW5ndGg7cjx2OysrciluW3JdPWYuY2hhckNvZGVBdChyKTtmPW59a2EocCxsfDE0Nik7bj1tYShwLDU3Nyk7bmEobixmLDAsZi5sZW5ndGgsMCk7b2Eobik7a2EocCxsKX19dGhpcy5oYW5kbGVFcnJvcihxKHRoaXMuZmlsZW5hbWUsZykpO3RoaXMuZGI9dChnLFwiaTMyXCIpO2hiKHRoaXMuZGIpO3RoaXMucGI9e307dGhpcy5TYT17fX12YXIgZz15KDQpLGg9ay5jd3JhcCxxPWgoXCJzcWxpdGUzX29wZW5cIixcIm51bWJlclwiLFtcInN0cmluZ1wiLFwibnVtYmVyXCJdKSx3PWgoXCJzcWxpdGUzX2Nsb3NlX3YyXCIsXCJudW1iZXJcIixbXCJudW1iZXJcIl0pLHU9aChcInNxbGl0ZTNfZXhlY1wiLFwibnVtYmVyXCIsW1wibnVtYmVyXCIsXCJzdHJpbmdcIixcIm51bWJlclwiLFwibnVtYmVyXCIsXCJudW1iZXJcIl0pLHg9aChcInNxbGl0ZTNfY2hhbmdlc1wiLFwibnVtYmVyXCIsW1wibnVtYmVyXCJdKSxEPWgoXCJzcWxpdGUzX3ByZXBhcmVfdjJcIixcblwibnVtYmVyXCIsW1wibnVtYmVyXCIsXCJzdHJpbmdcIixcIm51bWJlclwiLFwibnVtYmVyXCIsXCJudW1iZXJcIl0pLGliPWgoXCJzcWxpdGUzX3NxbFwiLFwic3RyaW5nXCIsW1wibnVtYmVyXCJdKSxsYz1oKFwic3FsaXRlM19ub3JtYWxpemVkX3NxbFwiLFwic3RyaW5nXCIsW1wibnVtYmVyXCJdKSxqYj1oKFwic3FsaXRlM19wcmVwYXJlX3YyXCIsXCJudW1iZXJcIixbXCJudW1iZXJcIixcIm51bWJlclwiLFwibnVtYmVyXCIsXCJudW1iZXJcIixcIm51bWJlclwiXSksbWM9aChcInNxbGl0ZTNfYmluZF90ZXh0XCIsXCJudW1iZXJcIixbXCJudW1iZXJcIixcIm51bWJlclwiLFwibnVtYmVyXCIsXCJudW1iZXJcIixcIm51bWJlclwiXSksa2I9aChcInNxbGl0ZTNfYmluZF9ibG9iXCIsXCJudW1iZXJcIixbXCJudW1iZXJcIixcIm51bWJlclwiLFwibnVtYmVyXCIsXCJudW1iZXJcIixcIm51bWJlclwiXSksbmM9aChcInNxbGl0ZTNfYmluZF9kb3VibGVcIixcIm51bWJlclwiLFtcIm51bWJlclwiLFwibnVtYmVyXCIsXCJudW1iZXJcIl0pLG9jPWgoXCJzcWxpdGUzX2JpbmRfaW50XCIsXCJudW1iZXJcIixbXCJudW1iZXJcIixcblwibnVtYmVyXCIsXCJudW1iZXJcIl0pLHBjPWgoXCJzcWxpdGUzX2JpbmRfcGFyYW1ldGVyX2luZGV4XCIsXCJudW1iZXJcIixbXCJudW1iZXJcIixcInN0cmluZ1wiXSkscWM9aChcInNxbGl0ZTNfc3RlcFwiLFwibnVtYmVyXCIsW1wibnVtYmVyXCJdKSxyYz1oKFwic3FsaXRlM19lcnJtc2dcIixcInN0cmluZ1wiLFtcIm51bWJlclwiXSksc2M9aChcInNxbGl0ZTNfY29sdW1uX2NvdW50XCIsXCJudW1iZXJcIixbXCJudW1iZXJcIl0pLHRjPWgoXCJzcWxpdGUzX2RhdGFfY291bnRcIixcIm51bWJlclwiLFtcIm51bWJlclwiXSksdWM9aChcInNxbGl0ZTNfY29sdW1uX2RvdWJsZVwiLFwibnVtYmVyXCIsW1wibnVtYmVyXCIsXCJudW1iZXJcIl0pLGxiPWgoXCJzcWxpdGUzX2NvbHVtbl90ZXh0XCIsXCJzdHJpbmdcIixbXCJudW1iZXJcIixcIm51bWJlclwiXSksdmM9aChcInNxbGl0ZTNfY29sdW1uX2Jsb2JcIixcIm51bWJlclwiLFtcIm51bWJlclwiLFwibnVtYmVyXCJdKSx3Yz1oKFwic3FsaXRlM19jb2x1bW5fYnl0ZXNcIixcIm51bWJlclwiLFtcIm51bWJlclwiLFwibnVtYmVyXCJdKSx4Yz1oKFwic3FsaXRlM19jb2x1bW5fdHlwZVwiLFxuXCJudW1iZXJcIixbXCJudW1iZXJcIixcIm51bWJlclwiXSkseWM9aChcInNxbGl0ZTNfY29sdW1uX25hbWVcIixcInN0cmluZ1wiLFtcIm51bWJlclwiLFwibnVtYmVyXCJdKSx6Yz1oKFwic3FsaXRlM19yZXNldFwiLFwibnVtYmVyXCIsW1wibnVtYmVyXCJdKSxBYz1oKFwic3FsaXRlM19jbGVhcl9iaW5kaW5nc1wiLFwibnVtYmVyXCIsW1wibnVtYmVyXCJdKSxCYz1oKFwic3FsaXRlM19maW5hbGl6ZVwiLFwibnVtYmVyXCIsW1wibnVtYmVyXCJdKSxtYj1oKFwic3FsaXRlM19jcmVhdGVfZnVuY3Rpb25fdjJcIixcIm51bWJlclwiLFwibnVtYmVyIHN0cmluZyBudW1iZXIgbnVtYmVyIG51bWJlciBudW1iZXIgbnVtYmVyIG51bWJlciBudW1iZXJcIi5zcGxpdChcIiBcIikpLGZjPWgoXCJzcWxpdGUzX3ZhbHVlX3R5cGVcIixcIm51bWJlclwiLFtcIm51bWJlclwiXSksaWM9aChcInNxbGl0ZTNfdmFsdWVfYnl0ZXNcIixcIm51bWJlclwiLFtcIm51bWJlclwiXSksaGM9aChcInNxbGl0ZTNfdmFsdWVfdGV4dFwiLFwic3RyaW5nXCIsW1wibnVtYmVyXCJdKSxqYz1oKFwic3FsaXRlM192YWx1ZV9ibG9iXCIsXG5cIm51bWJlclwiLFtcIm51bWJlclwiXSksZ2M9aChcInNxbGl0ZTNfdmFsdWVfZG91YmxlXCIsXCJudW1iZXJcIixbXCJudW1iZXJcIl0pLGNjPWgoXCJzcWxpdGUzX3Jlc3VsdF9kb3VibGVcIixcIlwiLFtcIm51bWJlclwiLFwibnVtYmVyXCJdKSxlYj1oKFwic3FsaXRlM19yZXN1bHRfbnVsbFwiLFwiXCIsW1wibnVtYmVyXCJdKSxkYz1oKFwic3FsaXRlM19yZXN1bHRfdGV4dFwiLFwiXCIsW1wibnVtYmVyXCIsXCJzdHJpbmdcIixcIm51bWJlclwiLFwibnVtYmVyXCJdKSxlYz1oKFwic3FsaXRlM19yZXN1bHRfYmxvYlwiLFwiXCIsW1wibnVtYmVyXCIsXCJudW1iZXJcIixcIm51bWJlclwiLFwibnVtYmVyXCJdKSxiYz1oKFwic3FsaXRlM19yZXN1bHRfaW50XCIsXCJcIixbXCJudW1iZXJcIixcIm51bWJlclwiXSksdWE9aChcInNxbGl0ZTNfcmVzdWx0X2Vycm9yXCIsXCJcIixbXCJudW1iZXJcIixcInN0cmluZ1wiLFwibnVtYmVyXCJdKSxuYj1oKFwic3FsaXRlM19hZ2dyZWdhdGVfY29udGV4dFwiLFwibnVtYmVyXCIsW1wibnVtYmVyXCIsXCJudW1iZXJcIl0pLGhiPWgoXCJSZWdpc3RlckV4dGVuc2lvbkZ1bmN0aW9uc1wiLFxuXCJudW1iZXJcIixbXCJudW1iZXJcIl0pLG9iPWgoXCJzcWxpdGUzX3VwZGF0ZV9ob29rXCIsXCJudW1iZXJcIixbXCJudW1iZXJcIixcIm51bWJlclwiLFwibnVtYmVyXCJdKTtjLnByb3RvdHlwZS5iaW5kPWZ1bmN0aW9uKGYpe2lmKCF0aGlzLlFhKXRocm93XCJTdGF0ZW1lbnQgY2xvc2VkXCI7dGhpcy5yZXNldCgpO3JldHVybiBBcnJheS5pc0FycmF5KGYpP3RoaXMuV2IoZik6bnVsbCE9ZiYmXCJvYmplY3RcIj09PXR5cGVvZiBmP3RoaXMuWGIoZik6ITB9O2MucHJvdG90eXBlLnN0ZXA9ZnVuY3Rpb24oKXtpZighdGhpcy5RYSl0aHJvd1wiU3RhdGVtZW50IGNsb3NlZFwiO3RoaXMuT2E9MTt2YXIgZj1xYyh0aGlzLlFhKTtzd2l0Y2goZil7Y2FzZSAxMDA6cmV0dXJuITA7Y2FzZSAxMDE6cmV0dXJuITE7ZGVmYXVsdDp0aHJvdyB0aGlzLmRiLmhhbmRsZUVycm9yKGYpO319O2MucHJvdG90eXBlLlBiPWZ1bmN0aW9uKGYpe251bGw9PWYmJihmPXRoaXMuT2EsdGhpcy5PYSs9MSk7cmV0dXJuIHVjKHRoaXMuUWEsZil9O1xuYy5wcm90b3R5cGUuaGM9ZnVuY3Rpb24oZil7bnVsbD09ZiYmKGY9dGhpcy5PYSx0aGlzLk9hKz0xKTtmPWxiKHRoaXMuUWEsZik7aWYoXCJmdW5jdGlvblwiIT09dHlwZW9mIEJpZ0ludCl0aHJvdyBFcnJvcihcIkJpZ0ludCBpcyBub3Qgc3VwcG9ydGVkXCIpO3JldHVybiBCaWdJbnQoZil9O2MucHJvdG90eXBlLm1jPWZ1bmN0aW9uKGYpe251bGw9PWYmJihmPXRoaXMuT2EsdGhpcy5PYSs9MSk7cmV0dXJuIGxiKHRoaXMuUWEsZil9O2MucHJvdG90eXBlLmdldEJsb2I9ZnVuY3Rpb24oZil7bnVsbD09ZiYmKGY9dGhpcy5PYSx0aGlzLk9hKz0xKTt2YXIgbD13Yyh0aGlzLlFhLGYpO2Y9dmModGhpcy5RYSxmKTtmb3IodmFyIG49bmV3IFVpbnQ4QXJyYXkobCkscD0wO3A8bDtwKz0xKW5bcF09bVtmK3BdO3JldHVybiBufTtjLnByb3RvdHlwZS5nZXQ9ZnVuY3Rpb24oZixsKXtsPWx8fHt9O251bGwhPWYmJnRoaXMuYmluZChmKSYmdGhpcy5zdGVwKCk7Zj1bXTtmb3IodmFyIG49dGModGhpcy5RYSksXG5wPTA7cDxuO3ArPTEpc3dpdGNoKHhjKHRoaXMuUWEscCkpe2Nhc2UgMTp2YXIgcj1sLnVzZUJpZ0ludD90aGlzLmhjKHApOnRoaXMuUGIocCk7Zi5wdXNoKHIpO2JyZWFrO2Nhc2UgMjpmLnB1c2godGhpcy5QYihwKSk7YnJlYWs7Y2FzZSAzOmYucHVzaCh0aGlzLm1jKHApKTticmVhaztjYXNlIDQ6Zi5wdXNoKHRoaXMuZ2V0QmxvYihwKSk7YnJlYWs7ZGVmYXVsdDpmLnB1c2gobnVsbCl9cmV0dXJuIGZ9O2MucHJvdG90eXBlLkRiPWZ1bmN0aW9uKCl7Zm9yKHZhciBmPVtdLGw9c2ModGhpcy5RYSksbj0wO248bDtuKz0xKWYucHVzaCh5Yyh0aGlzLlFhLG4pKTtyZXR1cm4gZn07Yy5wcm90b3R5cGUuT2I9ZnVuY3Rpb24oZixsKXtmPXRoaXMuZ2V0KGYsbCk7bD10aGlzLkRiKCk7Zm9yKHZhciBuPXt9LHA9MDtwPGwubGVuZ3RoO3ArPTEpbltsW3BdXT1mW3BdO3JldHVybiBufTtjLnByb3RvdHlwZS5sYz1mdW5jdGlvbigpe3JldHVybiBpYih0aGlzLlFhKX07Yy5wcm90b3R5cGUuaWM9XG5mdW5jdGlvbigpe3JldHVybiBsYyh0aGlzLlFhKX07Yy5wcm90b3R5cGUuSmI9ZnVuY3Rpb24oZil7bnVsbCE9ZiYmdGhpcy5iaW5kKGYpO3RoaXMuc3RlcCgpO3JldHVybiB0aGlzLnJlc2V0KCl9O2MucHJvdG90eXBlLkxiPWZ1bmN0aW9uKGYsbCl7bnVsbD09bCYmKGw9dGhpcy5PYSx0aGlzLk9hKz0xKTtmPWVhKGYpO3RoaXMueWIucHVzaChmKTt0aGlzLmRiLmhhbmRsZUVycm9yKG1jKHRoaXMuUWEsbCxmLC0xLDApKX07Yy5wcm90b3R5cGUuVmI9ZnVuY3Rpb24oZixsKXtudWxsPT1sJiYobD10aGlzLk9hLHRoaXMuT2ErPTEpO3ZhciBuPWNhKGYubGVuZ3RoKTttLnNldChmLG4pO3RoaXMueWIucHVzaChuKTt0aGlzLmRiLmhhbmRsZUVycm9yKGtiKHRoaXMuUWEsbCxuLGYubGVuZ3RoLDApKX07Yy5wcm90b3R5cGUuS2I9ZnVuY3Rpb24oZixsKXtudWxsPT1sJiYobD10aGlzLk9hLHRoaXMuT2ErPTEpO3RoaXMuZGIuaGFuZGxlRXJyb3IoKGY9PT0oZnwwKT9vYzpuYykodGhpcy5RYSxcbmwsZikpfTtjLnByb3RvdHlwZS5ZYj1mdW5jdGlvbihmKXtudWxsPT1mJiYoZj10aGlzLk9hLHRoaXMuT2ErPTEpO2tiKHRoaXMuUWEsZiwwLDAsMCl9O2MucHJvdG90eXBlLk1iPWZ1bmN0aW9uKGYsbCl7bnVsbD09bCYmKGw9dGhpcy5PYSx0aGlzLk9hKz0xKTtzd2l0Y2godHlwZW9mIGYpe2Nhc2UgXCJzdHJpbmdcIjp0aGlzLkxiKGYsbCk7cmV0dXJuO2Nhc2UgXCJudW1iZXJcIjp0aGlzLktiKGYsbCk7cmV0dXJuO2Nhc2UgXCJiaWdpbnRcIjp0aGlzLkxiKGYudG9TdHJpbmcoKSxsKTtyZXR1cm47Y2FzZSBcImJvb2xlYW5cIjp0aGlzLktiKGYrMCxsKTtyZXR1cm47Y2FzZSBcIm9iamVjdFwiOmlmKG51bGw9PT1mKXt0aGlzLlliKGwpO3JldHVybn1pZihudWxsIT1mLmxlbmd0aCl7dGhpcy5WYihmLGwpO3JldHVybn19dGhyb3dcIldyb25nIEFQSSB1c2UgOiB0cmllZCB0byBiaW5kIGEgdmFsdWUgb2YgYW4gdW5rbm93biB0eXBlIChcIitmK1wiKS5cIjt9O2MucHJvdG90eXBlLlhiPWZ1bmN0aW9uKGYpe3ZhciBsPVxudGhpcztPYmplY3Qua2V5cyhmKS5mb3JFYWNoKGZ1bmN0aW9uKG4pe3ZhciBwPXBjKGwuUWEsbik7MCE9PXAmJmwuTWIoZltuXSxwKX0pO3JldHVybiEwfTtjLnByb3RvdHlwZS5XYj1mdW5jdGlvbihmKXtmb3IodmFyIGw9MDtsPGYubGVuZ3RoO2wrPTEpdGhpcy5NYihmW2xdLGwrMSk7cmV0dXJuITB9O2MucHJvdG90eXBlLnJlc2V0PWZ1bmN0aW9uKCl7dGhpcy5DYigpO3JldHVybiAwPT09QWModGhpcy5RYSkmJjA9PT16Yyh0aGlzLlFhKX07Yy5wcm90b3R5cGUuQ2I9ZnVuY3Rpb24oKXtmb3IodmFyIGY7dm9pZCAwIT09KGY9dGhpcy55Yi5wb3AoKSk7KWRhKGYpfTtjLnByb3RvdHlwZS5jYj1mdW5jdGlvbigpe3RoaXMuQ2IoKTt2YXIgZj0wPT09QmModGhpcy5RYSk7ZGVsZXRlIHRoaXMuZGIucGJbdGhpcy5RYV07dGhpcy5RYT0wO3JldHVybiBmfTtkLnByb3RvdHlwZS5uZXh0PWZ1bmN0aW9uKCl7aWYobnVsbD09PXRoaXMub2IpcmV0dXJue2RvbmU6ITB9O251bGwhPT10aGlzLmdiJiZcbih0aGlzLmdiLmNiKCksdGhpcy5nYj1udWxsKTtpZighdGhpcy5kYi5kYil0aHJvdyB0aGlzLkFiKCksRXJyb3IoXCJEYXRhYmFzZSBjbG9zZWRcIik7dmFyIGY9cGEoKSxsPXkoNCk7cWEoZyk7cWEobCk7dHJ5e3RoaXMuZGIuaGFuZGxlRXJyb3IoamIodGhpcy5kYi5kYix0aGlzLnViLC0xLGcsbCkpO3RoaXMudWI9dChsLFwiaTMyXCIpO3ZhciBuPXQoZyxcImkzMlwiKTtpZigwPT09bilyZXR1cm4gdGhpcy5BYigpLHtkb25lOiEwfTt0aGlzLmdiPW5ldyBjKG4sdGhpcy5kYik7dGhpcy5kYi5wYltuXT10aGlzLmdiO3JldHVybnt2YWx1ZTp0aGlzLmdiLGRvbmU6ITF9fWNhdGNoKHApe3Rocm93IHRoaXMuRmI9eih0aGlzLnViKSx0aGlzLkFiKCkscDt9ZmluYWxseXtyYShmKX19O2QucHJvdG90eXBlLkFiPWZ1bmN0aW9uKCl7ZGEodGhpcy5vYik7dGhpcy5vYj1udWxsfTtkLnByb3RvdHlwZS5qYz1mdW5jdGlvbigpe3JldHVybiBudWxsIT09dGhpcy5GYj90aGlzLkZiOnoodGhpcy51Yil9O1xuXCJmdW5jdGlvblwiPT09dHlwZW9mIFN5bWJvbCYmXCJzeW1ib2xcIj09PXR5cGVvZiBTeW1ib2wuaXRlcmF0b3ImJihkLnByb3RvdHlwZVtTeW1ib2wuaXRlcmF0b3JdPWZ1bmN0aW9uKCl7cmV0dXJuIHRoaXN9KTtlLnByb3RvdHlwZS5KYj1mdW5jdGlvbihmLGwpe2lmKCF0aGlzLmRiKXRocm93XCJEYXRhYmFzZSBjbG9zZWRcIjtpZihsKXtmPXRoaXMuR2IoZixsKTt0cnl7Zi5zdGVwKCl9ZmluYWxseXtmLmNiKCl9fWVsc2UgdGhpcy5oYW5kbGVFcnJvcih1KHRoaXMuZGIsZiwwLDAsZykpO3JldHVybiB0aGlzfTtlLnByb3RvdHlwZS5leGVjPWZ1bmN0aW9uKGYsbCxuKXtpZighdGhpcy5kYil0aHJvd1wiRGF0YWJhc2UgY2xvc2VkXCI7dmFyIHA9cGEoKSxyPW51bGwsdj1udWxsLEo9bnVsbDt0cnl7Sj12PWVhKGYpO3ZhciBJPXkoNCk7Zm9yKGY9W107MCE9PXQoSixcImk4XCIpOyl7cWEoZyk7cWEoSSk7dGhpcy5oYW5kbGVFcnJvcihqYih0aGlzLmRiLEosLTEsZyxJKSk7dmFyIEw9dChnLFwiaTMyXCIpO1xuSj10KEksXCJpMzJcIik7aWYoMCE9PUwpe3ZhciBHPW51bGw7cj1uZXcgYyhMLHRoaXMpO2ZvcihudWxsIT1sJiZyLmJpbmQobCk7ci5zdGVwKCk7KW51bGw9PT1HJiYoRz17Y29sdW1uczpyLkRiKCksdmFsdWVzOltdfSxmLnB1c2goRykpLEcudmFsdWVzLnB1c2goci5nZXQobnVsbCxuKSk7ci5jYigpfX1yZXR1cm4gZn1jYXRjaChsYSl7dGhyb3cgciYmci5jYigpLGxhO31maW5hbGx5e3YmJmRhKHYpLHJhKHApfX07ZS5wcm90b3R5cGUuZWM9ZnVuY3Rpb24oZixsLG4scCxyKXtcImZ1bmN0aW9uXCI9PT10eXBlb2YgbCYmKHA9bixuPWwsbD12b2lkIDApO2Y9dGhpcy5HYihmLGwpO3RyeXtmb3IoO2Yuc3RlcCgpOyluKGYuT2IobnVsbCxyKSl9ZmluYWxseXtmLmNiKCl9aWYoXCJmdW5jdGlvblwiPT09dHlwZW9mIHApcmV0dXJuIHAoKX07ZS5wcm90b3R5cGUuR2I9ZnVuY3Rpb24oZixsKXtxYShnKTt0aGlzLmhhbmRsZUVycm9yKEQodGhpcy5kYixmLC0xLGcsMCkpO2Y9dChnLFwiaTMyXCIpO2lmKDA9PT1cbmYpdGhyb3dcIk5vdGhpbmcgdG8gcHJlcGFyZVwiO3ZhciBuPW5ldyBjKGYsdGhpcyk7bnVsbCE9bCYmbi5iaW5kKGwpO3JldHVybiB0aGlzLnBiW2ZdPW59O2UucHJvdG90eXBlLnBjPWZ1bmN0aW9uKGYpe3JldHVybiBuZXcgZChmLHRoaXMpfTtlLnByb3RvdHlwZS5mYz1mdW5jdGlvbigpe09iamVjdC52YWx1ZXModGhpcy5wYikuZm9yRWFjaChmdW5jdGlvbihsKXtsLmNiKCl9KTtPYmplY3QudmFsdWVzKHRoaXMuU2EpLmZvckVhY2goQSk7dGhpcy5TYT17fTt0aGlzLmhhbmRsZUVycm9yKHcodGhpcy5kYikpO3ZhciBmPXNhKHRoaXMuZmlsZW5hbWUpO3RoaXMuaGFuZGxlRXJyb3IocSh0aGlzLmZpbGVuYW1lLGcpKTt0aGlzLmRiPXQoZyxcImkzMlwiKTtoYih0aGlzLmRiKTtyZXR1cm4gZn07ZS5wcm90b3R5cGUuY2xvc2U9ZnVuY3Rpb24oKXtudWxsIT09dGhpcy5kYiYmKE9iamVjdC52YWx1ZXModGhpcy5wYikuZm9yRWFjaChmdW5jdGlvbihmKXtmLmNiKCl9KSxPYmplY3QudmFsdWVzKHRoaXMuU2EpLmZvckVhY2goQSksXG50aGlzLlNhPXt9LHRoaXMuZmImJihBKHRoaXMuZmIpLHRoaXMuZmI9dm9pZCAwKSx0aGlzLmhhbmRsZUVycm9yKHcodGhpcy5kYikpLHRhKFwiL1wiK3RoaXMuZmlsZW5hbWUpLHRoaXMuZGI9bnVsbCl9O2UucHJvdG90eXBlLmhhbmRsZUVycm9yPWZ1bmN0aW9uKGYpe2lmKDA9PT1mKXJldHVybiBudWxsO2Y9cmModGhpcy5kYik7dGhyb3cgRXJyb3IoZik7fTtlLnByb3RvdHlwZS5rYz1mdW5jdGlvbigpe3JldHVybiB4KHRoaXMuZGIpfTtlLnByb3RvdHlwZS5iYz1mdW5jdGlvbihmLGwpe09iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbCh0aGlzLlNhLGYpJiYoQSh0aGlzLlNhW2ZdKSxkZWxldGUgdGhpcy5TYVtmXSk7dmFyIG49dmEoZnVuY3Rpb24ocCxyLHYpe3I9YihyLHYpO3RyeXt2YXIgSj1sLmFwcGx5KG51bGwscil9Y2F0Y2goSSl7dWEocCxJLC0xKTtyZXR1cm59YShwLEopfSxcInZpaWlcIik7dGhpcy5TYVtmXT1uO3RoaXMuaGFuZGxlRXJyb3IobWIodGhpcy5kYixcbmYsbC5sZW5ndGgsMSwwLG4sMCwwLDApKTtyZXR1cm4gdGhpc307ZS5wcm90b3R5cGUuYWM9ZnVuY3Rpb24oZixsKXt2YXIgbj1sLmluaXR8fGZ1bmN0aW9uKCl7cmV0dXJuIG51bGx9LHA9bC5maW5hbGl6ZXx8ZnVuY3Rpb24oTCl7cmV0dXJuIEx9LHI9bC5zdGVwO2lmKCFyKXRocm93XCJBbiBhZ2dyZWdhdGUgZnVuY3Rpb24gbXVzdCBoYXZlIGEgc3RlcCBmdW5jdGlvbiBpbiBcIitmO3ZhciB2PXt9O09iamVjdC5oYXNPd25Qcm9wZXJ0eS5jYWxsKHRoaXMuU2EsZikmJihBKHRoaXMuU2FbZl0pLGRlbGV0ZSB0aGlzLlNhW2ZdKTtsPWYrXCJfX2ZpbmFsaXplXCI7T2JqZWN0Lmhhc093blByb3BlcnR5LmNhbGwodGhpcy5TYSxsKSYmKEEodGhpcy5TYVtsXSksZGVsZXRlIHRoaXMuU2FbbF0pO3ZhciBKPXZhKGZ1bmN0aW9uKEwsRyxsYSl7dmFyIFY9bmIoTCwxKTtPYmplY3QuaGFzT3duUHJvcGVydHkuY2FsbCh2LFYpfHwodltWXT1uKCkpO0c9YihHLGxhKTtHPVt2W1ZdXS5jb25jYXQoRyk7XG50cnl7dltWXT1yLmFwcGx5KG51bGwsRyl9Y2F0Y2goRGMpe2RlbGV0ZSB2W1ZdLHVhKEwsRGMsLTEpfX0sXCJ2aWlpXCIpLEk9dmEoZnVuY3Rpb24oTCl7dmFyIEc9bmIoTCwxKTt0cnl7dmFyIGxhPXAodltHXSl9Y2F0Y2goVil7ZGVsZXRlIHZbR107dWEoTCxWLC0xKTtyZXR1cm59YShMLGxhKTtkZWxldGUgdltHXX0sXCJ2aVwiKTt0aGlzLlNhW2ZdPUo7dGhpcy5TYVtsXT1JO3RoaXMuaGFuZGxlRXJyb3IobWIodGhpcy5kYixmLHIubGVuZ3RoLTEsMSwwLDAsSixJLDApKTtyZXR1cm4gdGhpc307ZS5wcm90b3R5cGUudmM9ZnVuY3Rpb24oZil7dGhpcy5mYiYmKG9iKHRoaXMuZGIsMCwwKSxBKHRoaXMuZmIpLHRoaXMuZmI9dm9pZCAwKTtpZighZilyZXR1cm4gdGhpczt0aGlzLmZiPXZhKGZ1bmN0aW9uKGwsbixwLHIsdil7c3dpdGNoKG4pe2Nhc2UgMTg6bD1cImluc2VydFwiO2JyZWFrO2Nhc2UgMjM6bD1cInVwZGF0ZVwiO2JyZWFrO2Nhc2UgOTpsPVwiZGVsZXRlXCI7YnJlYWs7ZGVmYXVsdDp0aHJvd1widW5rbm93biBvcGVyYXRpb25Db2RlIGluIHVwZGF0ZUhvb2sgY2FsbGJhY2s6IFwiK1xubjt9cD16KHApO3I9eihyKTtpZih2Pk51bWJlci5NQVhfU0FGRV9JTlRFR0VSKXRocm93XCJyb3dJZCB0b28gYmlnIHRvIGZpdCBpbnNpZGUgYSBOdW1iZXJcIjtmKGwscCxyLE51bWJlcih2KSl9LFwidmlpaWlqXCIpO29iKHRoaXMuZGIsdGhpcy5mYiwwKTtyZXR1cm4gdGhpc307Yy5wcm90b3R5cGUuYmluZD1jLnByb3RvdHlwZS5iaW5kO2MucHJvdG90eXBlLnN0ZXA9Yy5wcm90b3R5cGUuc3RlcDtjLnByb3RvdHlwZS5nZXQ9Yy5wcm90b3R5cGUuZ2V0O2MucHJvdG90eXBlLmdldENvbHVtbk5hbWVzPWMucHJvdG90eXBlLkRiO2MucHJvdG90eXBlLmdldEFzT2JqZWN0PWMucHJvdG90eXBlLk9iO2MucHJvdG90eXBlLmdldFNRTD1jLnByb3RvdHlwZS5sYztjLnByb3RvdHlwZS5nZXROb3JtYWxpemVkU1FMPWMucHJvdG90eXBlLmljO2MucHJvdG90eXBlLnJ1bj1jLnByb3RvdHlwZS5KYjtjLnByb3RvdHlwZS5yZXNldD1jLnByb3RvdHlwZS5yZXNldDtjLnByb3RvdHlwZS5mcmVlbWVtPVxuYy5wcm90b3R5cGUuQ2I7Yy5wcm90b3R5cGUuZnJlZT1jLnByb3RvdHlwZS5jYjtkLnByb3RvdHlwZS5uZXh0PWQucHJvdG90eXBlLm5leHQ7ZC5wcm90b3R5cGUuZ2V0UmVtYWluaW5nU1FMPWQucHJvdG90eXBlLmpjO2UucHJvdG90eXBlLnJ1bj1lLnByb3RvdHlwZS5KYjtlLnByb3RvdHlwZS5leGVjPWUucHJvdG90eXBlLmV4ZWM7ZS5wcm90b3R5cGUuZWFjaD1lLnByb3RvdHlwZS5lYztlLnByb3RvdHlwZS5wcmVwYXJlPWUucHJvdG90eXBlLkdiO2UucHJvdG90eXBlLml0ZXJhdGVTdGF0ZW1lbnRzPWUucHJvdG90eXBlLnBjO2UucHJvdG90eXBlW1wiZXhwb3J0XCJdPWUucHJvdG90eXBlLmZjO2UucHJvdG90eXBlLmNsb3NlPWUucHJvdG90eXBlLmNsb3NlO2UucHJvdG90eXBlLmhhbmRsZUVycm9yPWUucHJvdG90eXBlLmhhbmRsZUVycm9yO2UucHJvdG90eXBlLmdldFJvd3NNb2RpZmllZD1lLnByb3RvdHlwZS5rYztlLnByb3RvdHlwZS5jcmVhdGVfZnVuY3Rpb249ZS5wcm90b3R5cGUuYmM7XG5lLnByb3RvdHlwZS5jcmVhdGVfYWdncmVnYXRlPWUucHJvdG90eXBlLmFjO2UucHJvdG90eXBlLnVwZGF0ZUhvb2s9ZS5wcm90b3R5cGUudmM7ay5EYXRhYmFzZT1lfTt2YXIgd2E9XCIuL3RoaXMucHJvZ3JhbVwiLHhhPWdsb2JhbFRoaXMuZG9jdW1lbnQ/LmN1cnJlbnRTY3JpcHQ/LnNyYztiYSYmKHhhPXNlbGYubG9jYXRpb24uaHJlZik7dmFyIHlhPVwiXCIsemEsQWE7XG5pZihhYXx8YmEpe3RyeXt5YT0obmV3IFVSTChcIi5cIix4YSkpLmhyZWZ9Y2F0Y2h7fWJhJiYoQWE9YT0+e3ZhciBiPW5ldyBYTUxIdHRwUmVxdWVzdDtiLm9wZW4oXCJHRVRcIixhLCExKTtiLnJlc3BvbnNlVHlwZT1cImFycmF5YnVmZmVyXCI7Yi5zZW5kKG51bGwpO3JldHVybiBuZXcgVWludDhBcnJheShiLnJlc3BvbnNlKX0pO3phPWFzeW5jIGE9PnthPWF3YWl0IGZldGNoKGEse2NyZWRlbnRpYWxzOlwic2FtZS1vcmlnaW5cIn0pO2lmKGEub2spcmV0dXJuIGEuYXJyYXlCdWZmZXIoKTt0aHJvdyBFcnJvcihhLnN0YXR1cytcIiA6IFwiK2EudXJsKTt9fXZhciBCYT1jb25zb2xlLmxvZy5iaW5kKGNvbnNvbGUpLEI9Y29uc29sZS5lcnJvci5iaW5kKGNvbnNvbGUpLENhLERhPSExLEVhLG0sQyxGYSxFLEYsR2EsSGEsSDtcbmZ1bmN0aW9uIElhKCl7dmFyIGE9SmEuYnVmZmVyO209bmV3IEludDhBcnJheShhKTtGYT1uZXcgSW50MTZBcnJheShhKTtDPW5ldyBVaW50OEFycmF5KGEpO25ldyBVaW50MTZBcnJheShhKTtFPW5ldyBJbnQzMkFycmF5KGEpO0Y9bmV3IFVpbnQzMkFycmF5KGEpO0dhPW5ldyBGbG9hdDMyQXJyYXkoYSk7SGE9bmV3IEZsb2F0NjRBcnJheShhKTtIPW5ldyBCaWdJbnQ2NEFycmF5KGEpO25ldyBCaWdVaW50NjRBcnJheShhKX1mdW5jdGlvbiBLYShhKXtrLm9uQWJvcnQ/LihhKTthPVwiQWJvcnRlZChcIithK1wiKVwiO0IoYSk7RGE9ITA7dGhyb3cgbmV3IFdlYkFzc2VtYmx5LlJ1bnRpbWVFcnJvcihhK1wiLiBCdWlsZCB3aXRoIC1zQVNTRVJUSU9OUyBmb3IgbW9yZSBpbmZvLlwiKTt9dmFyIExhO1xuYXN5bmMgZnVuY3Rpb24gTWEoYSl7aWYoIUNhKXRyeXt2YXIgYj1hd2FpdCB6YShhKTtyZXR1cm4gbmV3IFVpbnQ4QXJyYXkoYil9Y2F0Y2h7fWlmKGE9PUxhJiZDYSlhPW5ldyBVaW50OEFycmF5KENhKTtlbHNlIGlmKEFhKWE9QWEoYSk7ZWxzZSB0aHJvd1wiYm90aCBhc3luYyBhbmQgc3luYyBmZXRjaGluZyBvZiB0aGUgd2FzbSBmYWlsZWRcIjtyZXR1cm4gYX1hc3luYyBmdW5jdGlvbiBOYShhLGIpe3RyeXt2YXIgYz1hd2FpdCBNYShhKTtyZXR1cm4gYXdhaXQgV2ViQXNzZW1ibHkuaW5zdGFudGlhdGUoYyxiKX1jYXRjaChkKXtCKGBmYWlsZWQgdG8gYXN5bmNocm9ub3VzbHkgcHJlcGFyZSB3YXNtOiAke2R9YCksS2EoZCl9fVxuYXN5bmMgZnVuY3Rpb24gT2EoYSl7dmFyIGI9TGE7aWYoIUNhKXRyeXt2YXIgYz1mZXRjaChiLHtjcmVkZW50aWFsczpcInNhbWUtb3JpZ2luXCJ9KTtyZXR1cm4gYXdhaXQgV2ViQXNzZW1ibHkuaW5zdGFudGlhdGVTdHJlYW1pbmcoYyxhKX1jYXRjaChkKXtCKGB3YXNtIHN0cmVhbWluZyBjb21waWxlIGZhaWxlZDogJHtkfWApLEIoXCJmYWxsaW5nIGJhY2sgdG8gQXJyYXlCdWZmZXIgaW5zdGFudGlhdGlvblwiKX1yZXR1cm4gTmEoYixhKX1jbGFzcyBQYXtuYW1lPVwiRXhpdFN0YXR1c1wiO2NvbnN0cnVjdG9yKGEpe3RoaXMubWVzc2FnZT1gUHJvZ3JhbSB0ZXJtaW5hdGVkIHdpdGggZXhpdCgke2F9KWA7dGhpcy5zdGF0dXM9YX19dmFyIFFhPWE9Pntmb3IoOzA8YS5sZW5ndGg7KWEuc2hpZnQoKShrKX0sUmE9W10sU2E9W10sVGE9KCk9Pnt2YXIgYT1rLnByZVJ1bi5zaGlmdCgpO1NhLnB1c2goYSl9LEs9MCxVYT1udWxsO1xuZnVuY3Rpb24gdChhLGI9XCJpOFwiKXtiLmVuZHNXaXRoKFwiKlwiKSYmKGI9XCIqXCIpO3N3aXRjaChiKXtjYXNlIFwiaTFcIjpyZXR1cm4gbVthXTtjYXNlIFwiaThcIjpyZXR1cm4gbVthXTtjYXNlIFwiaTE2XCI6cmV0dXJuIEZhW2E+PjFdO2Nhc2UgXCJpMzJcIjpyZXR1cm4gRVthPj4yXTtjYXNlIFwiaTY0XCI6cmV0dXJuIEhbYT4+M107Y2FzZSBcImZsb2F0XCI6cmV0dXJuIEdhW2E+PjJdO2Nhc2UgXCJkb3VibGVcIjpyZXR1cm4gSGFbYT4+M107Y2FzZSBcIipcIjpyZXR1cm4gRlthPj4yXTtkZWZhdWx0OkthKGBpbnZhbGlkIHR5cGUgZm9yIGdldFZhbHVlOiAke2J9YCl9fXZhciBWYT0hMDtcbmZ1bmN0aW9uIHFhKGEpe3ZhciBiPVwiaTMyXCI7Yi5lbmRzV2l0aChcIipcIikmJihiPVwiKlwiKTtzd2l0Y2goYil7Y2FzZSBcImkxXCI6bVthXT0wO2JyZWFrO2Nhc2UgXCJpOFwiOm1bYV09MDticmVhaztjYXNlIFwiaTE2XCI6RmFbYT4+MV09MDticmVhaztjYXNlIFwiaTMyXCI6RVthPj4yXT0wO2JyZWFrO2Nhc2UgXCJpNjRcIjpIW2E+PjNdPUJpZ0ludCgwKTticmVhaztjYXNlIFwiZmxvYXRcIjpHYVthPj4yXT0wO2JyZWFrO2Nhc2UgXCJkb3VibGVcIjpIYVthPj4zXT0wO2JyZWFrO2Nhc2UgXCIqXCI6RlthPj4yXT0wO2JyZWFrO2RlZmF1bHQ6S2EoYGludmFsaWQgdHlwZSBmb3Igc2V0VmFsdWU6ICR7Yn1gKX19XG52YXIgV2E9bmV3IFRleHREZWNvZGVyLFhhPShhLGIsYyxkKT0+e2M9YitjO2lmKGQpcmV0dXJuIGM7Zm9yKDthW2JdJiYhKGI+PWMpOykrK2I7cmV0dXJuIGJ9LHo9KGEsYixjKT0+YT9XYS5kZWNvZGUoQy5zdWJhcnJheShhLFhhKEMsYSxiLGMpKSk6XCJcIixZYT0oYSxiKT0+e2Zvcih2YXIgYz0wLGQ9YS5sZW5ndGgtMTswPD1kO2QtLSl7dmFyIGU9YVtkXTtcIi5cIj09PWU/YS5zcGxpY2UoZCwxKTpcIi4uXCI9PT1lPyhhLnNwbGljZShkLDEpLGMrKyk6YyYmKGEuc3BsaWNlKGQsMSksYy0tKX1pZihiKWZvcig7YztjLS0pYS51bnNoaWZ0KFwiLi5cIik7cmV0dXJuIGF9LGhhPWE9Pnt2YXIgYj1cIi9cIj09PWEuY2hhckF0KDApLGM9XCIvXCI9PT1hLnNsaWNlKC0xKTsoYT1ZYShhLnNwbGl0KFwiL1wiKS5maWx0ZXIoZD0+ISFkKSwhYikuam9pbihcIi9cIikpfHxifHwoYT1cIi5cIik7YSYmYyYmKGErPVwiL1wiKTtyZXR1cm4oYj9cIi9cIjpcIlwiKSthfSxaYT1hPT57dmFyIGI9L14oXFwvP3wpKFtcXHNcXFNdKj8pKCg/OlxcLnsxLDJ9fFteXFwvXSs/fCkoXFwuW14uXFwvXSp8KSkoPzpbXFwvXSopJC8uZXhlYyhhKS5zbGljZSgxKTtcbmE9YlswXTtiPWJbMV07aWYoIWEmJiFiKXJldHVyblwiLlwiO2ImJj1iLnNsaWNlKDAsLTEpO3JldHVybiBhK2J9LCRhPWE9PmEmJmEubWF0Y2goLyhbXlxcL10rfFxcLylcXC8qJC8pWzFdLGFiPSgpPT5hPT5jcnlwdG8uZ2V0UmFuZG9tVmFsdWVzKGEpLGJiPWE9PnsoYmI9YWIoKSkoYSl9LGNiPSguLi5hKT0+e2Zvcih2YXIgYj1cIlwiLGM9ITEsZD1hLmxlbmd0aC0xOy0xPD1kJiYhYztkLS0pe2M9MDw9ZD9hW2RdOlwiL1wiO2lmKFwic3RyaW5nXCIhPXR5cGVvZiBjKXRocm93IG5ldyBUeXBlRXJyb3IoXCJBcmd1bWVudHMgdG8gcGF0aC5yZXNvbHZlIG11c3QgYmUgc3RyaW5nc1wiKTtpZighYylyZXR1cm5cIlwiO2I9YytcIi9cIitiO2M9XCIvXCI9PT1jLmNoYXJBdCgwKX1iPVlhKGIuc3BsaXQoXCIvXCIpLmZpbHRlcihlPT4hIWUpLCFjKS5qb2luKFwiL1wiKTtyZXR1cm4oYz9cIi9cIjpcIlwiKStifHxcIi5cIn0sZGI9YT0+e3ZhciBiPVhhKGEsMCk7cmV0dXJuIFdhLmRlY29kZShhLmJ1ZmZlcj9hLnN1YmFycmF5KDAsYik6XG5uZXcgVWludDhBcnJheShhLnNsaWNlKDAsYikpKX0sZmI9W10sZ2I9YT0+e2Zvcih2YXIgYj0wLGM9MDtjPGEubGVuZ3RoOysrYyl7dmFyIGQ9YS5jaGFyQ29kZUF0KGMpOzEyNz49ZD9iKys6MjA0Nz49ZD9iKz0yOjU1Mjk2PD1kJiY1NzM0Mz49ZD8oYis9NCwrK2MpOmIrPTN9cmV0dXJuIGJ9LE09KGEsYixjLGQpPT57aWYoISgwPGQpKXJldHVybiAwO3ZhciBlPWM7ZD1jK2QtMTtmb3IodmFyIGc9MDtnPGEubGVuZ3RoOysrZyl7dmFyIGg9YS5jb2RlUG9pbnRBdChnKTtpZigxMjc+PWgpe2lmKGM+PWQpYnJlYWs7YltjKytdPWh9ZWxzZSBpZigyMDQ3Pj1oKXtpZihjKzE+PWQpYnJlYWs7YltjKytdPTE5MnxoPj42O2JbYysrXT0xMjh8aCY2M31lbHNlIGlmKDY1NTM1Pj1oKXtpZihjKzI+PWQpYnJlYWs7YltjKytdPTIyNHxoPj4xMjtiW2MrK109MTI4fGg+PjYmNjM7YltjKytdPTEyOHxoJjYzfWVsc2V7aWYoYyszPj1kKWJyZWFrO2JbYysrXT0yNDB8aD4+MTg7YltjKytdPTEyOHxcbmg+PjEyJjYzO2JbYysrXT0xMjh8aD4+NiY2MztiW2MrK109MTI4fGgmNjM7ZysrfX1iW2NdPTA7cmV0dXJuIGMtZX0scGI9W107ZnVuY3Rpb24gcWIoYSxiKXtwYlthXT17aW5wdXQ6W10sb3V0cHV0OltdLGtiOmJ9O3JiKGEsc2IpfVxudmFyIHNiPXtvcGVuKGEpe3ZhciBiPXBiW2Eubm9kZS5uYl07aWYoIWIpdGhyb3cgbmV3IE4oNDMpO2EuVmE9YjthLnNlZWthYmxlPSExfSxjbG9zZShhKXthLlZhLmtiLmxiKGEuVmEpfSxsYihhKXthLlZhLmtiLmxiKGEuVmEpfSxyZWFkKGEsYixjLGQpe2lmKCFhLlZhfHwhYS5WYS5rYi5RYil0aHJvdyBuZXcgTig2MCk7Zm9yKHZhciBlPTAsZz0wO2c8ZDtnKyspe3RyeXt2YXIgaD1hLlZhLmtiLlFiKGEuVmEpfWNhdGNoKHEpe3Rocm93IG5ldyBOKDI5KTt9aWYodm9pZCAwPT09aCYmMD09PWUpdGhyb3cgbmV3IE4oNik7aWYobnVsbD09PWh8fHZvaWQgMD09PWgpYnJlYWs7ZSsrO2JbYytnXT1ofWUmJihhLm5vZGUuJGE9RGF0ZS5ub3coKSk7cmV0dXJuIGV9LHdyaXRlKGEsYixjLGQpe2lmKCFhLlZhfHwhYS5WYS5rYi5IYil0aHJvdyBuZXcgTig2MCk7dHJ5e2Zvcih2YXIgZT0wO2U8ZDtlKyspYS5WYS5rYi5IYihhLlZhLGJbYytlXSl9Y2F0Y2goZyl7dGhyb3cgbmV3IE4oMjkpO1xufWQmJihhLm5vZGUuVWE9YS5ub2RlLlRhPURhdGUubm93KCkpO3JldHVybiBlfX0sdGI9e1FiKCl7YTp7aWYoIWZiLmxlbmd0aCl7dmFyIGE9bnVsbDtnbG9iYWxUaGlzLndpbmRvdz8ucHJvbXB0JiYoYT13aW5kb3cucHJvbXB0KFwiSW5wdXQ6IFwiKSxudWxsIT09YSYmKGErPVwiXFxuXCIpKTtpZighYSl7dmFyIGI9bnVsbDticmVhayBhfWI9QXJyYXkoZ2IoYSkrMSk7YT1NKGEsYiwwLGIubGVuZ3RoKTtiLmxlbmd0aD1hO2ZiPWJ9Yj1mYi5zaGlmdCgpfXJldHVybiBifSxIYihhLGIpe251bGw9PT1ifHwxMD09PWI/KEJhKGRiKGEub3V0cHV0KSksYS5vdXRwdXQ9W10pOjAhPWImJmEub3V0cHV0LnB1c2goYil9LGxiKGEpezA8YS5vdXRwdXQ/Lmxlbmd0aCYmKEJhKGRiKGEub3V0cHV0KSksYS5vdXRwdXQ9W10pfSxEYygpe3JldHVybnt5YzoyNTg1NixBYzo1LHhjOjE5MSx6YzozNTM4Nyx3YzpbMywyOCwxMjcsMjEsNCwwLDEsMCwxNywxOSwyNiwwLDE4LDE1LDIzLDIyLDAsMCwwLDAsMCxcbjAsMCwwLDAsMCwwLDAsMCwwLDAsMF19fSxFYygpe3JldHVybiAwfSxGYygpe3JldHVyblsyNCw4MF19fSx1Yj17SGIoYSxiKXtudWxsPT09Ynx8MTA9PT1iPyhCKGRiKGEub3V0cHV0KSksYS5vdXRwdXQ9W10pOjAhPWImJmEub3V0cHV0LnB1c2goYil9LGxiKGEpezA8YS5vdXRwdXQ/Lmxlbmd0aCYmKEIoZGIoYS5vdXRwdXQpKSxhLm91dHB1dD1bXSl9fSxPPXtaYTpudWxsLGFiKCl7cmV0dXJuIE8uY3JlYXRlTm9kZShudWxsLFwiL1wiLDE2ODk1LDApfSxjcmVhdGVOb2RlKGEsYixjLGQpe2lmKDI0NTc2PT09KGMmNjE0NDApfHw0MDk2PT09KGMmNjE0NDApKXRocm93IG5ldyBOKDYzKTtPLlphfHwoTy5aYT17ZGlyOntub2RlOntXYTpPLkxhLldhLFhhOk8uTGEuWGEsbWI6Ty5MYS5tYixyYjpPLkxhLnJiLFRiOk8uTGEuVGIseGI6Ty5MYS54Yix2YjpPLkxhLnZiLEliOk8uTGEuSWIsd2I6Ty5MYS53Yn0sc3RyZWFtOntZYTpPLk1hLllhfX0sZmlsZTp7bm9kZTp7V2E6Ty5MYS5XYSxYYTpPLkxhLlhhfSxcbnN0cmVhbTp7WWE6Ty5NYS5ZYSxyZWFkOk8uTWEucmVhZCx3cml0ZTpPLk1hLndyaXRlLHNiOk8uTWEuc2IsdGI6Ty5NYS50Yn19LGxpbms6e25vZGU6e1dhOk8uTGEuV2EsWGE6Ty5MYS5YYSxlYjpPLkxhLmVifSxzdHJlYW06e319LE5iOntub2RlOntXYTpPLkxhLldhLFhhOk8uTGEuWGF9LHN0cmVhbTp2Yn19KTtjPXdiKGEsYixjLGQpO1AoYy5tb2RlKT8oYy5MYT1PLlphLmRpci5ub2RlLGMuTWE9Ty5aYS5kaXIuc3RyZWFtLGMuTmE9e30pOjMyNzY4PT09KGMubW9kZSY2MTQ0MCk/KGMuTGE9Ty5aYS5maWxlLm5vZGUsYy5NYT1PLlphLmZpbGUuc3RyZWFtLGMuUmE9MCxjLk5hPW51bGwpOjQwOTYwPT09KGMubW9kZSY2MTQ0MCk/KGMuTGE9Ty5aYS5saW5rLm5vZGUsYy5NYT1PLlphLmxpbmsuc3RyZWFtKTo4MTkyPT09KGMubW9kZSY2MTQ0MCkmJihjLkxhPU8uWmEuTmIubm9kZSxjLk1hPU8uWmEuTmIuc3RyZWFtKTtjLiRhPWMuVWE9Yy5UYT1EYXRlLm5vdygpO2EmJihhLk5hW2JdPVxuYyxhLiRhPWEuVWE9YS5UYT1jLiRhKTtyZXR1cm4gY30sQ2MoYSl7cmV0dXJuIGEuTmE/YS5OYS5zdWJhcnJheT9hLk5hLnN1YmFycmF5KDAsYS5SYSk6bmV3IFVpbnQ4QXJyYXkoYS5OYSk6bmV3IFVpbnQ4QXJyYXkoMCl9LExhOntXYShhKXt2YXIgYj17fTtiLmNjPTgxOTI9PT0oYS5tb2RlJjYxNDQwKT9hLmlkOjE7Yi5vYz1hLmlkO2IubW9kZT1hLm1vZGU7Yi5yYz0xO2IudWlkPTA7Yi5uYz0wO2IubmI9YS5uYjtQKGEubW9kZSk/Yi5zaXplPTQwOTY6MzI3Njg9PT0oYS5tb2RlJjYxNDQwKT9iLnNpemU9YS5SYTo0MDk2MD09PShhLm1vZGUmNjE0NDApP2Iuc2l6ZT1hLmxpbmsubGVuZ3RoOmIuc2l6ZT0wO2IuJGE9bmV3IERhdGUoYS4kYSk7Yi5VYT1uZXcgRGF0ZShhLlVhKTtiLlRhPW5ldyBEYXRlKGEuVGEpO2IuWmI9NDA5NjtiLiRiPU1hdGguY2VpbChiLnNpemUvYi5aYik7cmV0dXJuIGJ9LFhhKGEsYil7Zm9yKHZhciBjIG9mW1wibW9kZVwiLFwiYXRpbWVcIixcIm10aW1lXCIsXCJjdGltZVwiXSludWxsIT1cbmJbY10mJihhW2NdPWJbY10pO3ZvaWQgMCE9PWIuc2l6ZSYmKGI9Yi5zaXplLGEuUmEhPWImJigwPT1iPyhhLk5hPW51bGwsYS5SYT0wKTooYz1hLk5hLGEuTmE9bmV3IFVpbnQ4QXJyYXkoYiksYyYmYS5OYS5zZXQoYy5zdWJhcnJheSgwLE1hdGgubWluKGIsYS5SYSkpKSxhLlJhPWIpKSl9LG1iKCl7Ty56Ynx8KE8uemI9bmV3IE4oNDQpLE8uemIuc3RhY2s9XCI8Z2VuZXJpYyBlcnJvciwgbm8gc3RhY2s+XCIpO3Rocm93IE8uemI7fSxyYihhLGIsYyxkKXtyZXR1cm4gTy5jcmVhdGVOb2RlKGEsYixjLGQpfSxUYihhLGIsYyl7dHJ5e3ZhciBkPVEoYixjKX1jYXRjaChnKXt9aWYoZCl7aWYoUChhLm1vZGUpKWZvcih2YXIgZSBpbiBkLk5hKXRocm93IG5ldyBOKDU1KTt4YihkKX1kZWxldGUgYS5wYXJlbnQuTmFbYS5uYW1lXTtiLk5hW2NdPWE7YS5uYW1lPWM7Yi5UYT1iLlVhPWEucGFyZW50LlRhPWEucGFyZW50LlVhPURhdGUubm93KCl9LHhiKGEsYil7ZGVsZXRlIGEuTmFbYl07YS5UYT1cbmEuVWE9RGF0ZS5ub3coKX0sdmIoYSxiKXt2YXIgYz1RKGEsYiksZDtmb3IoZCBpbiBjLk5hKXRocm93IG5ldyBOKDU1KTtkZWxldGUgYS5OYVtiXTthLlRhPWEuVWE9RGF0ZS5ub3coKX0sSWIoYSl7cmV0dXJuW1wiLlwiLFwiLi5cIiwuLi5PYmplY3Qua2V5cyhhLk5hKV19LHdiKGEsYixjKXthPU8uY3JlYXRlTm9kZShhLGIsNDE0NzEsMCk7YS5saW5rPWM7cmV0dXJuIGF9LGViKGEpe2lmKDQwOTYwIT09KGEubW9kZSY2MTQ0MCkpdGhyb3cgbmV3IE4oMjgpO3JldHVybiBhLmxpbmt9fSxNYTp7cmVhZChhLGIsYyxkLGUpe3ZhciBnPWEubm9kZS5OYTtpZihlPj1hLm5vZGUuUmEpcmV0dXJuIDA7YT1NYXRoLm1pbihhLm5vZGUuUmEtZSxkKTtpZig4PGEmJmcuc3ViYXJyYXkpYi5zZXQoZy5zdWJhcnJheShlLGUrYSksYyk7ZWxzZSBmb3IoZD0wO2Q8YTtkKyspYltjK2RdPWdbZStkXTtyZXR1cm4gYX0sd3JpdGUoYSxiLGMsZCxlLGcpe2IuYnVmZmVyPT09bS5idWZmZXImJihnPSExKTtpZighZClyZXR1cm4gMDtcbmE9YS5ub2RlO2EuVWE9YS5UYT1EYXRlLm5vdygpO2lmKGIuc3ViYXJyYXkmJighYS5OYXx8YS5OYS5zdWJhcnJheSkpe2lmKGcpcmV0dXJuIGEuTmE9Yi5zdWJhcnJheShjLGMrZCksYS5SYT1kO2lmKDA9PT1hLlJhJiYwPT09ZSlyZXR1cm4gYS5OYT1iLnNsaWNlKGMsYytkKSxhLlJhPWQ7aWYoZStkPD1hLlJhKXJldHVybiBhLk5hLnNldChiLnN1YmFycmF5KGMsYytkKSxlKSxkfWc9ZStkO3ZhciBoPWEuTmE/YS5OYS5sZW5ndGg6MDtoPj1nfHwoZz1NYXRoLm1heChnLGgqKDEwNDg1NzY+aD8yOjEuMTI1KT4+PjApLDAhPWgmJihnPU1hdGgubWF4KGcsMjU2KSksaD1hLk5hLGEuTmE9bmV3IFVpbnQ4QXJyYXkoZyksMDxhLlJhJiZhLk5hLnNldChoLnN1YmFycmF5KDAsYS5SYSksMCkpO2lmKGEuTmEuc3ViYXJyYXkmJmIuc3ViYXJyYXkpYS5OYS5zZXQoYi5zdWJhcnJheShjLGMrZCksZSk7ZWxzZSBmb3IoZz0wO2c8ZDtnKyspYS5OYVtlK2ddPWJbYytnXTthLlJhPU1hdGgubWF4KGEuUmEsXG5lK2QpO3JldHVybiBkfSxZYShhLGIsYyl7MT09PWM/Yis9YS5wb3NpdGlvbjoyPT09YyYmMzI3Njg9PT0oYS5ub2RlLm1vZGUmNjE0NDApJiYoYis9YS5ub2RlLlJhKTtpZigwPmIpdGhyb3cgbmV3IE4oMjgpO3JldHVybiBifSxzYihhLGIsYyxkLGUpe2lmKDMyNzY4IT09KGEubm9kZS5tb2RlJjYxNDQwKSl0aHJvdyBuZXcgTig0Myk7YT1hLm5vZGUuTmE7aWYoZSYyfHwhYXx8YS5idWZmZXIhPT1tLmJ1ZmZlcil7ZT0hMDtkPTY1NTM2Kk1hdGguY2VpbChiLzY1NTM2KTt2YXIgZz15Yig2NTUzNixkKTtnJiZDLmZpbGwoMCxnLGcrZCk7ZD1nO2lmKCFkKXRocm93IG5ldyBOKDQ4KTtpZihhKXtpZigwPGN8fGMrYjxhLmxlbmd0aClhLnN1YmFycmF5P2E9YS5zdWJhcnJheShjLGMrYik6YT1BcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhLGMsYytiKTttLnNldChhLGQpfX1lbHNlIGU9ITEsZD1hLmJ5dGVPZmZzZXQ7cmV0dXJue3RjOmQsVWI6ZX19LHRiKGEsYixjLGQpe08uTWEud3JpdGUoYSxcbmIsMCxkLGMsITEpO3JldHVybiAwfX19LGlhPShhLGIpPT57dmFyIGM9MDthJiYoY3w9MzY1KTtiJiYoY3w9MTQ2KTtyZXR1cm4gY30semI9bnVsbCxBYj17fSxCYj1bXSxDYj0xLFI9bnVsbCxEYj0hMSxFYj0hMCxGYj17fSxOPWNsYXNze25hbWU9XCJFcnJub0Vycm9yXCI7Y29uc3RydWN0b3IoYSl7dGhpcy5QYT1hfX0sR2I9Y2xhc3N7cWI9e307bm9kZT1udWxsO2dldCBmbGFncygpe3JldHVybiB0aGlzLnFiLmZsYWdzfXNldCBmbGFncyhhKXt0aGlzLnFiLmZsYWdzPWF9Z2V0IHBvc2l0aW9uKCl7cmV0dXJuIHRoaXMucWIucG9zaXRpb259c2V0IHBvc2l0aW9uKGEpe3RoaXMucWIucG9zaXRpb249YX19LEhiPWNsYXNze0xhPXt9O01hPXt9O2liPW51bGw7Y29uc3RydWN0b3IoYSxiLGMsZCl7YXx8PXRoaXM7dGhpcy5wYXJlbnQ9YTt0aGlzLmFiPWEuYWI7dGhpcy5pZD1DYisrO3RoaXMubmFtZT1iO3RoaXMubW9kZT1jO3RoaXMubmI9ZDt0aGlzLiRhPXRoaXMuVWE9dGhpcy5UYT1EYXRlLm5vdygpfWdldCByZWFkKCl7cmV0dXJuIDM2NT09PVxuKHRoaXMubW9kZSYzNjUpfXNldCByZWFkKGEpe2E/dGhpcy5tb2RlfD0zNjU6dGhpcy5tb2RlJj0tMzY2fWdldCB3cml0ZSgpe3JldHVybiAxNDY9PT0odGhpcy5tb2RlJjE0Nil9c2V0IHdyaXRlKGEpe2E/dGhpcy5tb2RlfD0xNDY6dGhpcy5tb2RlJj0tMTQ3fX07XG5mdW5jdGlvbiBTKGEsYj17fSl7aWYoIWEpdGhyb3cgbmV3IE4oNDQpO2IuQmI/PyhiLkJiPSEwKTtcIi9cIj09PWEuY2hhckF0KDApfHwoYT1cIi8vXCIrYSk7dmFyIGM9MDthOmZvcig7NDA+YztjKyspe2E9YS5zcGxpdChcIi9cIikuZmlsdGVyKHE9PiEhcSk7Zm9yKHZhciBkPXpiLGU9XCIvXCIsZz0wO2c8YS5sZW5ndGg7ZysrKXt2YXIgaD1nPT09YS5sZW5ndGgtMTtpZihoJiZiLnBhcmVudClicmVhaztpZihcIi5cIiE9PWFbZ10paWYoXCIuLlwiPT09YVtnXSlpZihlPVphKGUpLGQ9PT1kLnBhcmVudCl7YT1lK1wiL1wiK2Euc2xpY2UoZysxKS5qb2luKFwiL1wiKTtjLS07Y29udGludWUgYX1lbHNlIGQ9ZC5wYXJlbnQ7ZWxzZXtlPWhhKGUrXCIvXCIrYVtnXSk7dHJ5e2Q9UShkLGFbZ10pfWNhdGNoKHEpe2lmKDQ0PT09cT8uUGEmJmgmJmIuc2MpcmV0dXJue3BhdGg6ZX07dGhyb3cgcTt9IWQuaWJ8fGgmJiFiLkJifHwoZD1kLmliLnJvb3QpO2lmKDQwOTYwPT09KGQubW9kZSY2MTQ0MCkmJighaHx8Yi5oYikpe2lmKCFkLkxhLmViKXRocm93IG5ldyBOKDUyKTtcbmQ9ZC5MYS5lYihkKTtcIi9cIj09PWQuY2hhckF0KDApfHwoZD1aYShlKStcIi9cIitkKTthPWQrXCIvXCIrYS5zbGljZShnKzEpLmpvaW4oXCIvXCIpO2NvbnRpbnVlIGF9fX1yZXR1cm57cGF0aDplLG5vZGU6ZH19dGhyb3cgbmV3IE4oMzIpO31mdW5jdGlvbiBmYShhKXtmb3IodmFyIGI7Oyl7aWYoYT09PWEucGFyZW50KXJldHVybiBhPWEuYWIuU2IsYj9cIi9cIiE9PWFbYS5sZW5ndGgtMV0/YCR7YX0vJHtifWA6YStiOmE7Yj1iP2Ake2EubmFtZX0vJHtifWA6YS5uYW1lO2E9YS5wYXJlbnR9fWZ1bmN0aW9uIEliKGEsYil7Zm9yKHZhciBjPTAsZD0wO2Q8Yi5sZW5ndGg7ZCsrKWM9KGM8PDUpLWMrYi5jaGFyQ29kZUF0KGQpfDA7cmV0dXJuKGErYz4+PjApJVIubGVuZ3RofWZ1bmN0aW9uIHhiKGEpe3ZhciBiPUliKGEucGFyZW50LmlkLGEubmFtZSk7aWYoUltiXT09PWEpUltiXT1hLmpiO2Vsc2UgZm9yKGI9UltiXTtiOyl7aWYoYi5qYj09PWEpe2IuamI9YS5qYjticmVha31iPWIuamJ9fVxuZnVuY3Rpb24gUShhLGIpe3ZhciBjPVAoYS5tb2RlKT8oYz1KYihhLFwieFwiKSk/YzphLkxhLm1iPzA6Mjo1NDtpZihjKXRocm93IG5ldyBOKGMpO2ZvcihjPVJbSWIoYS5pZCxiKV07YztjPWMuamIpe3ZhciBkPWMubmFtZTtpZihjLnBhcmVudC5pZD09PWEuaWQmJmQ9PT1iKXJldHVybiBjfXJldHVybiBhLkxhLm1iKGEsYil9ZnVuY3Rpb24gd2IoYSxiLGMsZCl7YT1uZXcgSGIoYSxiLGMsZCk7Yj1JYihhLnBhcmVudC5pZCxhLm5hbWUpO2EuamI9UltiXTtyZXR1cm4gUltiXT1hfWZ1bmN0aW9uIFAoYSl7cmV0dXJuIDE2Mzg0PT09KGEmNjE0NDApfWZ1bmN0aW9uIEtiKGEpe3ZhciBiPVtcInJcIixcIndcIixcInJ3XCJdW2EmM107YSY1MTImJihiKz1cIndcIik7cmV0dXJuIGJ9XG5mdW5jdGlvbiBKYihhLGIpe2lmKEViKXJldHVybiAwO2lmKCFiLmluY2x1ZGVzKFwiclwiKXx8YS5tb2RlJjI5Mil7aWYoYi5pbmNsdWRlcyhcIndcIikmJiEoYS5tb2RlJjE0Nil8fGIuaW5jbHVkZXMoXCJ4XCIpJiYhKGEubW9kZSY3MykpcmV0dXJuIDJ9ZWxzZSByZXR1cm4gMjtyZXR1cm4gMH1mdW5jdGlvbiBMYihhLGIpe2lmKCFQKGEubW9kZSkpcmV0dXJuIDU0O3RyeXtyZXR1cm4gUShhLGIpLDIwfWNhdGNoKGMpe31yZXR1cm4gSmIoYSxcInd4XCIpfWZ1bmN0aW9uIE1iKGEsYixjKXt0cnl7dmFyIGQ9UShhLGIpfWNhdGNoKGUpe3JldHVybiBlLlBhfWlmKGE9SmIoYSxcInd4XCIpKXJldHVybiBhO2lmKGMpe2lmKCFQKGQubW9kZSkpcmV0dXJuIDU0O2lmKGQ9PT1kLnBhcmVudHx8XCIvXCI9PT1mYShkKSlyZXR1cm4gMTB9ZWxzZSBpZihQKGQubW9kZSkpcmV0dXJuIDMxO3JldHVybiAwfWZ1bmN0aW9uIE5iKGEpe2lmKCFhKXRocm93IG5ldyBOKDYzKTtyZXR1cm4gYX1cbmZ1bmN0aW9uIFQoYSl7YT1CYlthXTtpZighYSl0aHJvdyBuZXcgTig4KTtyZXR1cm4gYX1mdW5jdGlvbiBPYihhLGI9LTEpe2E9T2JqZWN0LmFzc2lnbihuZXcgR2IsYSk7aWYoLTE9PWIpYTp7Zm9yKGI9MDs0MDk2Pj1iO2IrKylpZighQmJbYl0pYnJlYWsgYTt0aHJvdyBuZXcgTigzMyk7fWEuYmI9YjtyZXR1cm4gQmJbYl09YX1mdW5jdGlvbiBQYihhLGI9LTEpe2E9T2IoYSxiKTthLk1hPy5CYz8uKGEpO3JldHVybiBhfWZ1bmN0aW9uIFFiKGEsYixjKXt2YXIgZD1hPy5NYS5YYTthPWQ/YTpiO2Q/Pz1iLkxhLlhhO05iKGQpO2QoYSxjKX12YXIgdmI9e29wZW4oYSl7YS5NYT1BYlthLm5vZGUubmJdLk1hO2EuTWEub3Blbj8uKGEpfSxZYSgpe3Rocm93IG5ldyBOKDcwKTt9fTtmdW5jdGlvbiByYihhLGIpe0FiW2FdPXtNYTpifX1cbmZ1bmN0aW9uIFJiKGEsYil7dmFyIGM9XCIvXCI9PT1iO2lmKGMmJnpiKXRocm93IG5ldyBOKDEwKTtpZighYyYmYil7dmFyIGQ9UyhiLHtCYjohMX0pO2I9ZC5wYXRoO2Q9ZC5ub2RlO2lmKGQuaWIpdGhyb3cgbmV3IE4oMTApO2lmKCFQKGQubW9kZSkpdGhyb3cgbmV3IE4oNTQpO31iPXt0eXBlOmEsR2M6e30sU2I6YixxYzpbXX07YT1hLmFiKGIpO2EuYWI9YjtiLnJvb3Q9YTtjP3piPWE6ZCYmKGQuaWI9YixkLmFiJiZkLmFiLnFjLnB1c2goYikpfWZ1bmN0aW9uIFNiKGEsYixjKXt2YXIgZD1TKGEse3BhcmVudDohMH0pLm5vZGU7YT0kYShhKTtpZighYSl0aHJvdyBuZXcgTigyOCk7aWYoXCIuXCI9PT1hfHxcIi4uXCI9PT1hKXRocm93IG5ldyBOKDIwKTt2YXIgZT1MYihkLGEpO2lmKGUpdGhyb3cgbmV3IE4oZSk7aWYoIWQuTGEucmIpdGhyb3cgbmV3IE4oNjMpO3JldHVybiBkLkxhLnJiKGQsYSxiLGMpfVxuZnVuY3Rpb24gamEoYSxiPTQzOCl7cmV0dXJuIFNiKGEsYiY0MDk1fDMyNzY4LDApfWZ1bmN0aW9uIFUoYSxiPTUxMSl7cmV0dXJuIFNiKGEsYiYxMDIzfDE2Mzg0LDApfWZ1bmN0aW9uIFRiKGEsYixjKXtcInVuZGVmaW5lZFwiPT10eXBlb2YgYyYmKGM9YixiPTQzOCk7U2IoYSxifDgxOTIsYyl9ZnVuY3Rpb24gVWIoYSxiKXtpZighY2IoYSkpdGhyb3cgbmV3IE4oNDQpO3ZhciBjPVMoYix7cGFyZW50OiEwfSkubm9kZTtpZighYyl0aHJvdyBuZXcgTig0NCk7Yj0kYShiKTt2YXIgZD1MYihjLGIpO2lmKGQpdGhyb3cgbmV3IE4oZCk7aWYoIWMuTGEud2IpdGhyb3cgbmV3IE4oNjMpO2MuTGEud2IoYyxiLGEpfVxuZnVuY3Rpb24gVmIoYSl7dmFyIGI9UyhhLHtwYXJlbnQ6ITB9KS5ub2RlO2E9JGEoYSk7dmFyIGM9UShiLGEpLGQ9TWIoYixhLCEwKTtpZihkKXRocm93IG5ldyBOKGQpO2lmKCFiLkxhLnZiKXRocm93IG5ldyBOKDYzKTtpZihjLmliKXRocm93IG5ldyBOKDEwKTtiLkxhLnZiKGIsYSk7eGIoYyl9ZnVuY3Rpb24gdGEoYSl7dmFyIGI9UyhhLHtwYXJlbnQ6ITB9KS5ub2RlO2lmKCFiKXRocm93IG5ldyBOKDQ0KTthPSRhKGEpO3ZhciBjPVEoYixhKSxkPU1iKGIsYSwhMSk7aWYoZCl0aHJvdyBuZXcgTihkKTtpZighYi5MYS54Yil0aHJvdyBuZXcgTig2Myk7aWYoYy5pYil0aHJvdyBuZXcgTigxMCk7Yi5MYS54YihiLGEpO3hiKGMpfWZ1bmN0aW9uIFdiKGEsYil7YT1TKGEse2hiOiFifSkubm9kZTtyZXR1cm4gTmIoYS5MYS5XYSkoYSl9ZnVuY3Rpb24gWGIoYSxiLGMsZCl7UWIoYSxiLHttb2RlOmMmNDA5NXxiLm1vZGUmLTQwOTYsVGE6RGF0ZS5ub3coKSxkYzpkfSl9XG5mdW5jdGlvbiBrYShhLGIpe2E9XCJzdHJpbmdcIj09dHlwZW9mIGE/UyhhLHtoYjohMH0pLm5vZGU6YTtYYihudWxsLGEsYil9ZnVuY3Rpb24gWWIoYSxiLGMpe2lmKFAoYi5tb2RlKSl0aHJvdyBuZXcgTigzMSk7aWYoMzI3NjghPT0oYi5tb2RlJjYxNDQwKSl0aHJvdyBuZXcgTigyOCk7dmFyIGQ9SmIoYixcIndcIik7aWYoZCl0aHJvdyBuZXcgTihkKTtRYihhLGIse3NpemU6Yyx0aW1lc3RhbXA6RGF0ZS5ub3coKX0pfVxuZnVuY3Rpb24gbWEoYSxiLGM9NDM4KXtpZihcIlwiPT09YSl0aHJvdyBuZXcgTig0NCk7aWYoXCJzdHJpbmdcIj09dHlwZW9mIGIpe3ZhciBkPXtyOjAsXCJyK1wiOjIsdzo1NzcsXCJ3K1wiOjU3OCxhOjEwODksXCJhK1wiOjEwOTB9W2JdO2lmKFwidW5kZWZpbmVkXCI9PXR5cGVvZiBkKXRocm93IEVycm9yKGBVbmtub3duIGZpbGUgb3BlbiBtb2RlOiAke2J9YCk7Yj1kfWM9YiY2ND9jJjQwOTV8MzI3Njg6MDtpZihcIm9iamVjdFwiPT10eXBlb2YgYSlkPWE7ZWxzZXt2YXIgZT1hLmVuZHNXaXRoKFwiL1wiKTthPVMoYSx7aGI6IShiJjEzMTA3Miksc2M6ITB9KTtkPWEubm9kZTthPWEucGF0aH12YXIgZz0hMTtpZihiJjY0KWlmKGQpe2lmKGImMTI4KXRocm93IG5ldyBOKDIwKTt9ZWxzZXtpZihlKXRocm93IG5ldyBOKDMxKTtkPVNiKGEsY3w1MTEsMCk7Zz0hMH1pZighZCl0aHJvdyBuZXcgTig0NCk7ODE5Mj09PShkLm1vZGUmNjE0NDApJiYoYiY9LTUxMyk7aWYoYiY2NTUzNiYmIVAoZC5tb2RlKSl0aHJvdyBuZXcgTig1NCk7XG5pZighZyYmKGU9ZD80MDk2MD09PShkLm1vZGUmNjE0NDApPzMyOlAoZC5tb2RlKSYmKFwiclwiIT09S2IoYil8fGImNTc2KT8zMTpKYihkLEtiKGIpKTo0NCkpdGhyb3cgbmV3IE4oZSk7YiY1MTImJiFnJiYoZT1kLGU9XCJzdHJpbmdcIj09dHlwZW9mIGU/UyhlLHtoYjohMH0pLm5vZGU6ZSxZYihudWxsLGUsMCkpO2ImPS0xMzE3MTM7ZT1PYih7bm9kZTpkLHBhdGg6ZmEoZCksZmxhZ3M6YixzZWVrYWJsZTohMCxwb3NpdGlvbjowLE1hOmQuTWEsdWM6W10sZXJyb3I6ITF9KTtlLk1hLm9wZW4mJmUuTWEub3BlbihlKTtnJiZrYShkLGMmNTExKTshay5sb2dSZWFkRmlsZXN8fGImMXx8YSBpbiBGYnx8KEZiW2FdPTEpO3JldHVybiBlfWZ1bmN0aW9uIG9hKGEpe2lmKG51bGw9PT1hLmJiKXRocm93IG5ldyBOKDgpO2EuRWImJihhLkViPW51bGwpO3RyeXthLk1hLmNsb3NlJiZhLk1hLmNsb3NlKGEpfWNhdGNoKGIpe3Rocm93IGI7fWZpbmFsbHl7QmJbYS5iYl09bnVsbH1hLmJiPW51bGx9XG5mdW5jdGlvbiBaYihhLGIsYyl7aWYobnVsbD09PWEuYmIpdGhyb3cgbmV3IE4oOCk7aWYoIWEuc2Vla2FibGV8fCFhLk1hLllhKXRocm93IG5ldyBOKDcwKTtpZigwIT1jJiYxIT1jJiYyIT1jKXRocm93IG5ldyBOKDI4KTthLnBvc2l0aW9uPWEuTWEuWWEoYSxiLGMpO2EudWM9W119ZnVuY3Rpb24gJGIoYSxiLGMsZCxlKXtpZigwPmR8fDA+ZSl0aHJvdyBuZXcgTigyOCk7aWYobnVsbD09PWEuYmIpdGhyb3cgbmV3IE4oOCk7aWYoMT09PShhLmZsYWdzJjIwOTcxNTUpKXRocm93IG5ldyBOKDgpO2lmKFAoYS5ub2RlLm1vZGUpKXRocm93IG5ldyBOKDMxKTtpZighYS5NYS5yZWFkKXRocm93IG5ldyBOKDI4KTt2YXIgZz1cInVuZGVmaW5lZFwiIT10eXBlb2YgZTtpZighZyllPWEucG9zaXRpb247ZWxzZSBpZighYS5zZWVrYWJsZSl0aHJvdyBuZXcgTig3MCk7Yj1hLk1hLnJlYWQoYSxiLGMsZCxlKTtnfHwoYS5wb3NpdGlvbis9Yik7cmV0dXJuIGJ9XG5mdW5jdGlvbiBuYShhLGIsYyxkLGUpe2lmKDA+ZHx8MD5lKXRocm93IG5ldyBOKDI4KTtpZihudWxsPT09YS5iYil0aHJvdyBuZXcgTig4KTtpZigwPT09KGEuZmxhZ3MmMjA5NzE1NSkpdGhyb3cgbmV3IE4oOCk7aWYoUChhLm5vZGUubW9kZSkpdGhyb3cgbmV3IE4oMzEpO2lmKCFhLk1hLndyaXRlKXRocm93IG5ldyBOKDI4KTthLnNlZWthYmxlJiZhLmZsYWdzJjEwMjQmJlpiKGEsMCwyKTt2YXIgZz1cInVuZGVmaW5lZFwiIT10eXBlb2YgZTtpZighZyllPWEucG9zaXRpb247ZWxzZSBpZighYS5zZWVrYWJsZSl0aHJvdyBuZXcgTig3MCk7Yj1hLk1hLndyaXRlKGEsYixjLGQsZSx2b2lkIDApO2d8fChhLnBvc2l0aW9uKz1iKTtyZXR1cm4gYn1cbmZ1bmN0aW9uIHNhKGEpe3ZhciBiPWJ8fDA7dmFyIGM9XCJiaW5hcnlcIjtcInV0ZjhcIiE9PWMmJlwiYmluYXJ5XCIhPT1jJiZLYShgSW52YWxpZCBlbmNvZGluZyB0eXBlIFwiJHtjfVwiYCk7Yj1tYShhLGIpO2E9V2IoYSkuc2l6ZTt2YXIgZD1uZXcgVWludDhBcnJheShhKTskYihiLGQsMCxhLDApO1widXRmOFwiPT09YyYmKGQ9ZGIoZCkpO29hKGIpO3JldHVybiBkfVxuZnVuY3Rpb24gVyhhLGIsYyl7YT1oYShcIi9kZXYvXCIrYSk7dmFyIGQ9aWEoISFiLCEhYyk7Vy5SYj8/KFcuUmI9NjQpO3ZhciBlPVcuUmIrKzw8OHwwO3JiKGUse29wZW4oZyl7Zy5zZWVrYWJsZT0hMX0sY2xvc2UoKXtjPy5idWZmZXI/Lmxlbmd0aCYmYygxMCl9LHJlYWQoZyxoLHEsdyl7Zm9yKHZhciB1PTAseD0wO3g8dzt4Kyspe3RyeXt2YXIgRD1iKCl9Y2F0Y2goaWIpe3Rocm93IG5ldyBOKDI5KTt9aWYodm9pZCAwPT09RCYmMD09PXUpdGhyb3cgbmV3IE4oNik7aWYobnVsbD09PUR8fHZvaWQgMD09PUQpYnJlYWs7dSsrO2hbcSt4XT1EfXUmJihnLm5vZGUuJGE9RGF0ZS5ub3coKSk7cmV0dXJuIHV9LHdyaXRlKGcsaCxxLHcpe2Zvcih2YXIgdT0wO3U8dzt1KyspdHJ5e2MoaFtxK3VdKX1jYXRjaCh4KXt0aHJvdyBuZXcgTigyOSk7fXcmJihnLm5vZGUuVWE9Zy5ub2RlLlRhPURhdGUubm93KCkpO3JldHVybiB1fX0pO1RiKGEsZCxlKX12YXIgWD17fTtcbmZ1bmN0aW9uIFkoYSxiLGMpe2lmKFwiL1wiPT09Yi5jaGFyQXQoMCkpcmV0dXJuIGI7YT0tMTAwPT09YT9cIi9cIjpUKGEpLnBhdGg7aWYoMD09Yi5sZW5ndGgpe2lmKCFjKXRocm93IG5ldyBOKDQ0KTtyZXR1cm4gYX1yZXR1cm4gYStcIi9cIitifVxuZnVuY3Rpb24gYWMoYSxiKXtGW2E+PjJdPWIuY2M7RlthKzQ+PjJdPWIubW9kZTtGW2ErOD4+Ml09Yi5yYztGW2ErMTI+PjJdPWIudWlkO0ZbYSsxNj4+Ml09Yi5uYztGW2ErMjA+PjJdPWIubmI7SFthKzI0Pj4zXT1CaWdJbnQoYi5zaXplKTtFW2ErMzI+PjJdPTQwOTY7RVthKzM2Pj4yXT1iLiRiO3ZhciBjPWIuJGEuZ2V0VGltZSgpLGQ9Yi5VYS5nZXRUaW1lKCksZT1iLlRhLmdldFRpbWUoKTtIW2ErNDA+PjNdPUJpZ0ludChNYXRoLmZsb29yKGMvMUUzKSk7RlthKzQ4Pj4yXT1jJTFFMyoxRTY7SFthKzU2Pj4zXT1CaWdJbnQoTWF0aC5mbG9vcihkLzFFMykpO0ZbYSs2ND4+Ml09ZCUxRTMqMUU2O0hbYSs3Mj4+M109QmlnSW50KE1hdGguZmxvb3IoZS8xRTMpKTtGW2ErODA+PjJdPWUlMUUzKjFFNjtIW2ErODg+PjNdPUJpZ0ludChiLm9jKTtyZXR1cm4gMH1cbnZhciBrYz12b2lkIDAsQ2M9KCk9Pnt2YXIgYT1FWytrYz4+Ml07a2MrPTQ7cmV0dXJuIGF9LEVjPTAsRmM9WzAsMzEsNjAsOTEsMTIxLDE1MiwxODIsMjEzLDI0NCwyNzQsMzA1LDMzNV0sR2M9WzAsMzEsNTksOTAsMTIwLDE1MSwxODEsMjEyLDI0MywyNzMsMzA0LDMzNF0sSGM9e30sSWM9YT0+e2lmKCEoYSBpbnN0YW5jZW9mIFBhfHxcInVud2luZFwiPT1hKSl0aHJvdyBhO30sSmM9YT0+e0VhPWE7VmF8fDA8RWN8fChrLm9uRXhpdD8uKGEpLERhPSEwKTt0aHJvdyBuZXcgUGEoYSk7fSxLYz1hPT57aWYoIURhKXRyeXthKCl9Y2F0Y2goYil7SWMoYil9ZmluYWxseXtpZighKFZhfHwwPEVjKSl0cnl7RWE9YT1FYSxKYyhhKX1jYXRjaChiKXtJYyhiKX19fSxMYz17fSxOYz0oKT0+e2lmKCFNYyl7dmFyIGE9e1VTRVI6XCJ3ZWJfdXNlclwiLExPR05BTUU6XCJ3ZWJfdXNlclwiLFBBVEg6XCIvXCIsUFdEOlwiL1wiLEhPTUU6XCIvaG9tZS93ZWJfdXNlclwiLExBTkc6KGdsb2JhbFRoaXMubmF2aWdhdG9yPy5sYW5ndWFnZT8/XG5cIkNcIikucmVwbGFjZShcIi1cIixcIl9cIikrXCIuVVRGLThcIixfOndhfHxcIi4vdGhpcy5wcm9ncmFtXCJ9LGI7Zm9yKGIgaW4gTGMpdm9pZCAwPT09TGNbYl0/ZGVsZXRlIGFbYl06YVtiXT1MY1tiXTt2YXIgYz1bXTtmb3IoYiBpbiBhKWMucHVzaChgJHtifT0ke2FbYl19YCk7TWM9Y31yZXR1cm4gTWN9LE1jLE9jPShhLGIsYyxkKT0+e3ZhciBlPXtzdHJpbmc6dT0+e3ZhciB4PTA7aWYobnVsbCE9PXUmJnZvaWQgMCE9PXUmJjAhPT11KXt4PWdiKHUpKzE7dmFyIEQ9eSh4KTtNKHUsQyxELHgpO3g9RH1yZXR1cm4geH0sYXJyYXk6dT0+e3ZhciB4PXkodS5sZW5ndGgpO20uc2V0KHUseCk7cmV0dXJuIHh9fTthPWtbXCJfXCIrYV07dmFyIGc9W10saD0wO2lmKGQpZm9yKHZhciBxPTA7cTxkLmxlbmd0aDtxKyspe3ZhciB3PWVbY1txXV07dz8oMD09PWgmJihoPXBhKCkpLGdbcV09dyhkW3FdKSk6Z1txXT1kW3FdfWM9YSguLi5nKTtyZXR1cm4gYz1mdW5jdGlvbih1KXswIT09aCYmcmEoaCk7cmV0dXJuXCJzdHJpbmdcIj09PVxuYj96KHUpOlwiYm9vbGVhblwiPT09Yj8hIXU6dX0oYyl9LGVhPWE9Pnt2YXIgYj1nYihhKSsxLGM9Y2EoYik7YyYmTShhLEMsYyxiKTtyZXR1cm4gY30sUGMsUWM9W10sQT1hPT57UGMuZGVsZXRlKFouZ2V0KGEpKTtaLnNldChhLG51bGwpO1FjLnB1c2goYSl9LFJjPWE9Pntjb25zdCBiPWEubGVuZ3RoO3JldHVybltiJTEyOHwxMjgsYj4+NywuLi5hXX0sU2M9e2k6MTI3LHA6MTI3LGo6MTI2LGY6MTI1LGQ6MTI0LGU6MTExfSxUYz1hPT5SYyhBcnJheS5mcm9tKGEsYj0+U2NbYl0pKSx2YT0oYSxiKT0+e2lmKCFQYyl7UGM9bmV3IFdlYWtNYXA7dmFyIGM9Wi5sZW5ndGg7aWYoUGMpZm9yKHZhciBkPTA7ZDwwK2M7ZCsrKXt2YXIgZT1aLmdldChkKTtlJiZQYy5zZXQoZSxkKX19aWYoYz1QYy5nZXQoYSl8fDApcmV0dXJuIGM7Yz1RYy5sZW5ndGg/UWMucG9wKCk6Wi5ncm93KDEpO3RyeXtaLnNldChjLGEpfWNhdGNoKGcpe2lmKCEoZyBpbnN0YW5jZW9mIFR5cGVFcnJvcikpdGhyb3cgZztcbmI9VWludDhBcnJheS5vZigwLDk3LDExNSwxMDksMSwwLDAsMCwxLC4uLlJjKFsxLDk2LC4uLlRjKGIuc2xpY2UoMSkpLC4uLlRjKFwidlwiPT09YlswXT9cIlwiOmJbMF0pXSksMiw3LDEsMSwxMDEsMSwxMDIsMCwwLDcsNSwxLDEsMTAyLDAsMCk7Yj1uZXcgV2ViQXNzZW1ibHkuTW9kdWxlKGIpO2I9KG5ldyBXZWJBc3NlbWJseS5JbnN0YW5jZShiLHtlOntmOmF9fSkpLmV4cG9ydHMuZjtaLnNldChjLGIpfVBjLnNldChhLGMpO3JldHVybiBjfTtSPUFycmF5KDQwOTYpO1JiKE8sXCIvXCIpO1UoXCIvdG1wXCIpO1UoXCIvaG9tZVwiKTtVKFwiL2hvbWUvd2ViX3VzZXJcIik7XG4oZnVuY3Rpb24oKXtVKFwiL2RldlwiKTtyYigyNTkse3JlYWQ6KCk9PjAsd3JpdGU6KGQsZSxnLGgpPT5oLFlhOigpPT4wfSk7VGIoXCIvZGV2L251bGxcIiwyNTkpO3FiKDEyODAsdGIpO3FiKDE1MzYsdWIpO1RiKFwiL2Rldi90dHlcIiwxMjgwKTtUYihcIi9kZXYvdHR5MVwiLDE1MzYpO3ZhciBhPW5ldyBVaW50OEFycmF5KDEwMjQpLGI9MCxjPSgpPT57MD09PWImJihiYihhKSxiPWEuYnl0ZUxlbmd0aCk7cmV0dXJuIGFbLS1iXX07VyhcInJhbmRvbVwiLGMpO1coXCJ1cmFuZG9tXCIsYyk7VShcIi9kZXYvc2htXCIpO1UoXCIvZGV2L3NobS90bXBcIil9KSgpO1xuKGZ1bmN0aW9uKCl7VShcIi9wcm9jXCIpO3ZhciBhPVUoXCIvcHJvYy9zZWxmXCIpO1UoXCIvcHJvYy9zZWxmL2ZkXCIpO1JiKHthYigpe3ZhciBiPXdiKGEsXCJmZFwiLDE2ODk1LDczKTtiLk1hPXtZYTpPLk1hLllhfTtiLkxhPXttYihjLGQpe2M9K2Q7dmFyIGU9VChjKTtjPXtwYXJlbnQ6bnVsbCxhYjp7U2I6XCJmYWtlXCJ9LExhOntlYjooKT0+ZS5wYXRofSxpZDpjKzF9O3JldHVybiBjLnBhcmVudD1jfSxJYigpe3JldHVybiBBcnJheS5mcm9tKEJiLmVudHJpZXMoKSkuZmlsdGVyKChbLGNdKT0+YykubWFwKChbY10pPT5jLnRvU3RyaW5nKCkpfX07cmV0dXJuIGJ9fSxcIi9wcm9jL3NlbGYvZmRcIil9KSgpO2subm9FeGl0UnVudGltZSYmKFZhPWsubm9FeGl0UnVudGltZSk7ay5wcmludCYmKEJhPWsucHJpbnQpO2sucHJpbnRFcnImJihCPWsucHJpbnRFcnIpO2sud2FzbUJpbmFyeSYmKENhPWsud2FzbUJpbmFyeSk7ay50aGlzUHJvZ3JhbSYmKHdhPWsudGhpc1Byb2dyYW0pO1xuaWYoay5wcmVJbml0KWZvcihcImZ1bmN0aW9uXCI9PXR5cGVvZiBrLnByZUluaXQmJihrLnByZUluaXQ9W2sucHJlSW5pdF0pOzA8ay5wcmVJbml0Lmxlbmd0aDspay5wcmVJbml0LnNoaWZ0KCkoKTtrLnN0YWNrU2F2ZT0oKT0+cGEoKTtrLnN0YWNrUmVzdG9yZT1hPT5yYShhKTtrLnN0YWNrQWxsb2M9YT0+eShhKTtrLmN3cmFwPShhLGIsYyxkKT0+e3ZhciBlPSFjfHxjLmV2ZXJ5KGc9PlwibnVtYmVyXCI9PT1nfHxcImJvb2xlYW5cIj09PWcpO3JldHVyblwic3RyaW5nXCIhPT1iJiZlJiYhZD9rW1wiX1wiK2FdOiguLi5nKT0+T2MoYSxiLGMsZyl9O2suYWRkRnVuY3Rpb249dmE7ay5yZW1vdmVGdW5jdGlvbj1BO2suVVRGOFRvU3RyaW5nPXo7ay5zdHJpbmdUb05ld1VURjg9ZWE7ay53cml0ZUFycmF5VG9NZW1vcnk9KGEsYik9PnttLnNldChhLGIpfTtcbnZhciBjYSxkYSx5YixVYyxyYSx5LHBhLEphLFosVmM9e2E6KGEsYixjLGQpPT5LYShgQXNzZXJ0aW9uIGZhaWxlZDogJHt6KGEpfSwgYXQ6IGArW2I/eihiKTpcInVua25vd24gZmlsZW5hbWVcIixjLGQ/eihkKTpcInVua25vd24gZnVuY3Rpb25cIl0pLGk6ZnVuY3Rpb24oYSxiKXt0cnl7cmV0dXJuIGE9eihhKSxrYShhLGIpLDB9Y2F0Y2goYyl7aWYoXCJ1bmRlZmluZWRcIj09dHlwZW9mIFh8fFwiRXJybm9FcnJvclwiIT09Yy5uYW1lKXRocm93IGM7cmV0dXJuLWMuUGF9fSxMOmZ1bmN0aW9uKGEsYixjKXt0cnl7Yj16KGIpO2I9WShhLGIpO2lmKGMmLTgpcmV0dXJuLTI4O3ZhciBkPVMoYix7aGI6ITB9KS5ub2RlO2lmKCFkKXJldHVybi00NDthPVwiXCI7YyY0JiYoYSs9XCJyXCIpO2MmMiYmKGErPVwid1wiKTtjJjEmJihhKz1cInhcIik7cmV0dXJuIGEmJkpiKGQsYSk/LTI6MH1jYXRjaChlKXtpZihcInVuZGVmaW5lZFwiPT10eXBlb2YgWHx8XCJFcnJub0Vycm9yXCIhPT1lLm5hbWUpdGhyb3cgZTtyZXR1cm4tZS5QYX19LFxuajpmdW5jdGlvbihhLGIpe3RyeXt2YXIgYz1UKGEpO1hiKGMsYy5ub2RlLGIsITEpO3JldHVybiAwfWNhdGNoKGQpe2lmKFwidW5kZWZpbmVkXCI9PXR5cGVvZiBYfHxcIkVycm5vRXJyb3JcIiE9PWQubmFtZSl0aHJvdyBkO3JldHVybi1kLlBhfX0saDpmdW5jdGlvbihhKXt0cnl7dmFyIGI9VChhKTtRYihiLGIubm9kZSx7dGltZXN0YW1wOkRhdGUubm93KCksZGM6ITF9KTtyZXR1cm4gMH1jYXRjaChjKXtpZihcInVuZGVmaW5lZFwiPT10eXBlb2YgWHx8XCJFcnJub0Vycm9yXCIhPT1jLm5hbWUpdGhyb3cgYztyZXR1cm4tYy5QYX19LGI6ZnVuY3Rpb24oYSxiLGMpe2tjPWM7dHJ5e3ZhciBkPVQoYSk7c3dpdGNoKGIpe2Nhc2UgMDp2YXIgZT1DYygpO2lmKDA+ZSlicmVhaztmb3IoO0JiW2VdOyllKys7cmV0dXJuIFBiKGQsZSkuYmI7Y2FzZSAxOmNhc2UgMjpyZXR1cm4gMDtjYXNlIDM6cmV0dXJuIGQuZmxhZ3M7Y2FzZSA0OnJldHVybiBlPUNjKCksZC5mbGFnc3w9ZSwwO2Nhc2UgMTI6cmV0dXJuIGU9XG5DYygpLEZhW2UrMD4+MV09MiwwO2Nhc2UgMTM6Y2FzZSAxNDpyZXR1cm4gMH1yZXR1cm4tMjh9Y2F0Y2goZyl7aWYoXCJ1bmRlZmluZWRcIj09dHlwZW9mIFh8fFwiRXJybm9FcnJvclwiIT09Zy5uYW1lKXRocm93IGc7cmV0dXJuLWcuUGF9fSxnOmZ1bmN0aW9uKGEsYil7dHJ5e3ZhciBjPVQoYSksZD1jLm5vZGUsZT1jLk1hLldhO2E9ZT9jOmQ7ZT8/PWQuTGEuV2E7TmIoZSk7dmFyIGc9ZShhKTtyZXR1cm4gYWMoYixnKX1jYXRjaChoKXtpZihcInVuZGVmaW5lZFwiPT10eXBlb2YgWHx8XCJFcnJub0Vycm9yXCIhPT1oLm5hbWUpdGhyb3cgaDtyZXR1cm4taC5QYX19LEg6ZnVuY3Rpb24oYSxiKXtiPS05MDA3MTk5MjU0NzQwOTkyPmJ8fDkwMDcxOTkyNTQ3NDA5OTI8Yj9OYU46TnVtYmVyKGIpO3RyeXtpZihpc05hTihiKSlyZXR1cm4tNjE7dmFyIGM9VChhKTtpZigwPmJ8fDA9PT0oYy5mbGFncyYyMDk3MTU1KSl0aHJvdyBuZXcgTigyOCk7WWIoYyxjLm5vZGUsYik7cmV0dXJuIDB9Y2F0Y2goZCl7aWYoXCJ1bmRlZmluZWRcIj09XG50eXBlb2YgWHx8XCJFcnJub0Vycm9yXCIhPT1kLm5hbWUpdGhyb3cgZDtyZXR1cm4tZC5QYX19LEc6ZnVuY3Rpb24oYSxiKXt0cnl7aWYoMD09PWIpcmV0dXJuLTI4O3ZhciBjPWdiKFwiL1wiKSsxO2lmKGI8YylyZXR1cm4tNjg7TShcIi9cIixDLGEsYik7cmV0dXJuIGN9Y2F0Y2goZCl7aWYoXCJ1bmRlZmluZWRcIj09dHlwZW9mIFh8fFwiRXJybm9FcnJvclwiIT09ZC5uYW1lKXRocm93IGQ7cmV0dXJuLWQuUGF9fSxLOmZ1bmN0aW9uKGEsYil7dHJ5e3JldHVybiBhPXooYSksYWMoYixXYihhLCEwKSl9Y2F0Y2goYyl7aWYoXCJ1bmRlZmluZWRcIj09dHlwZW9mIFh8fFwiRXJybm9FcnJvclwiIT09Yy5uYW1lKXRocm93IGM7cmV0dXJuLWMuUGF9fSxDOmZ1bmN0aW9uKGEsYixjKXt0cnl7cmV0dXJuIGI9eihiKSxiPVkoYSxiKSxVKGIsYyksMH1jYXRjaChkKXtpZihcInVuZGVmaW5lZFwiPT10eXBlb2YgWHx8XCJFcnJub0Vycm9yXCIhPT1kLm5hbWUpdGhyb3cgZDtyZXR1cm4tZC5QYX19LEo6ZnVuY3Rpb24oYSxcbmIsYyxkKXt0cnl7Yj16KGIpO3ZhciBlPWQmMjU2O2I9WShhLGIsZCY0MDk2KTtyZXR1cm4gYWMoYyxlP1diKGIsITApOldiKGIpKX1jYXRjaChnKXtpZihcInVuZGVmaW5lZFwiPT10eXBlb2YgWHx8XCJFcnJub0Vycm9yXCIhPT1nLm5hbWUpdGhyb3cgZztyZXR1cm4tZy5QYX19LHg6ZnVuY3Rpb24oYSxiLGMsZCl7a2M9ZDt0cnl7Yj16KGIpO2I9WShhLGIpO3ZhciBlPWQ/Q2MoKTowO3JldHVybiBtYShiLGMsZSkuYmJ9Y2F0Y2goZyl7aWYoXCJ1bmRlZmluZWRcIj09dHlwZW9mIFh8fFwiRXJybm9FcnJvclwiIT09Zy5uYW1lKXRocm93IGc7cmV0dXJuLWcuUGF9fSx2OmZ1bmN0aW9uKGEsYixjLGQpe3RyeXtiPXooYik7Yj1ZKGEsYik7aWYoMD49ZClyZXR1cm4tMjg7dmFyIGU9UyhiKS5ub2RlO2lmKCFlKXRocm93IG5ldyBOKDQ0KTtpZighZS5MYS5lYil0aHJvdyBuZXcgTigyOCk7dmFyIGc9ZS5MYS5lYihlKTt2YXIgaD1NYXRoLm1pbihkLGdiKGcpKSxxPW1bYytoXTtNKGcsQyxjLGQrMSk7XG5tW2MraF09cTtyZXR1cm4gaH1jYXRjaCh3KXtpZihcInVuZGVmaW5lZFwiPT10eXBlb2YgWHx8XCJFcnJub0Vycm9yXCIhPT13Lm5hbWUpdGhyb3cgdztyZXR1cm4tdy5QYX19LHU6ZnVuY3Rpb24oYSl7dHJ5e3JldHVybiBhPXooYSksVmIoYSksMH1jYXRjaChiKXtpZihcInVuZGVmaW5lZFwiPT10eXBlb2YgWHx8XCJFcnJub0Vycm9yXCIhPT1iLm5hbWUpdGhyb3cgYjtyZXR1cm4tYi5QYX19LGY6ZnVuY3Rpb24oYSxiKXt0cnl7cmV0dXJuIGE9eihhKSxhYyhiLFdiKGEpKX1jYXRjaChjKXtpZihcInVuZGVmaW5lZFwiPT10eXBlb2YgWHx8XCJFcnJub0Vycm9yXCIhPT1jLm5hbWUpdGhyb3cgYztyZXR1cm4tYy5QYX19LHI6ZnVuY3Rpb24oYSxiLGMpe3RyeXtiPXooYik7Yj1ZKGEsYik7aWYoYylpZig1MTI9PT1jKVZiKGIpO2Vsc2UgcmV0dXJuLTI4O2Vsc2UgdGEoYik7cmV0dXJuIDB9Y2F0Y2goZCl7aWYoXCJ1bmRlZmluZWRcIj09dHlwZW9mIFh8fFwiRXJybm9FcnJvclwiIT09ZC5uYW1lKXRocm93IGQ7XG5yZXR1cm4tZC5QYX19LHE6ZnVuY3Rpb24oYSxiLGMpe3RyeXtiPXooYik7Yj1ZKGEsYiwhMCk7dmFyIGQ9RGF0ZS5ub3coKSxlLGc7aWYoYyl7dmFyIGg9RltjPj4yXSs0Mjk0OTY3Mjk2KkVbYys0Pj4yXSxxPUVbYys4Pj4yXTsxMDczNzQxODIzPT1xP2U9ZDoxMDczNzQxODIyPT1xP2U9bnVsbDplPTFFMypoK3EvMUU2O2MrPTE2O2g9RltjPj4yXSs0Mjk0OTY3Mjk2KkVbYys0Pj4yXTtxPUVbYys4Pj4yXTsxMDczNzQxODIzPT1xP2c9ZDoxMDczNzQxODIyPT1xP2c9bnVsbDpnPTFFMypoK3EvMUU2fWVsc2UgZz1lPWQ7aWYobnVsbCE9PShnPz9lKSl7YT1lO3ZhciB3PVMoYix7aGI6ITB9KS5ub2RlO05iKHcuTGEuWGEpKHcseyRhOmEsVWE6Z30pfXJldHVybiAwfWNhdGNoKHUpe2lmKFwidW5kZWZpbmVkXCI9PXR5cGVvZiBYfHxcIkVycm5vRXJyb3JcIiE9PXUubmFtZSl0aHJvdyB1O3JldHVybi11LlBhfX0sbTooKT0+S2EoXCJcIiksbDooKT0+e1ZhPSExO0VjPTB9LEE6ZnVuY3Rpb24oYSxcbmIpe2E9LTkwMDcxOTkyNTQ3NDA5OTI+YXx8OTAwNzE5OTI1NDc0MDk5MjxhP05hTjpOdW1iZXIoYSk7YT1uZXcgRGF0ZSgxRTMqYSk7RVtiPj4yXT1hLmdldFNlY29uZHMoKTtFW2IrND4+Ml09YS5nZXRNaW51dGVzKCk7RVtiKzg+PjJdPWEuZ2V0SG91cnMoKTtFW2IrMTI+PjJdPWEuZ2V0RGF0ZSgpO0VbYisxNj4+Ml09YS5nZXRNb250aCgpO0VbYisyMD4+Ml09YS5nZXRGdWxsWWVhcigpLTE5MDA7RVtiKzI0Pj4yXT1hLmdldERheSgpO3ZhciBjPWEuZ2V0RnVsbFllYXIoKTtFW2IrMjg+PjJdPSgwIT09YyU0fHwwPT09YyUxMDAmJjAhPT1jJTQwMD9HYzpGYylbYS5nZXRNb250aCgpXSthLmdldERhdGUoKS0xfDA7RVtiKzM2Pj4yXT0tKDYwKmEuZ2V0VGltZXpvbmVPZmZzZXQoKSk7Yz0obmV3IERhdGUoYS5nZXRGdWxsWWVhcigpLDYsMSkpLmdldFRpbWV6b25lT2Zmc2V0KCk7dmFyIGQ9KG5ldyBEYXRlKGEuZ2V0RnVsbFllYXIoKSwwLDEpKS5nZXRUaW1lem9uZU9mZnNldCgpO1xuRVtiKzMyPj4yXT0oYyE9ZCYmYS5nZXRUaW1lem9uZU9mZnNldCgpPT1NYXRoLm1pbihkLGMpKXwwfSx5OmZ1bmN0aW9uKGEsYixjLGQsZSxnLGgpe2U9LTkwMDcxOTkyNTQ3NDA5OTI+ZXx8OTAwNzE5OTI1NDc0MDk5MjxlP05hTjpOdW1iZXIoZSk7dHJ5e3ZhciBxPVQoZCk7aWYoMCE9PShiJjIpJiYwPT09KGMmMikmJjIhPT0ocS5mbGFncyYyMDk3MTU1KSl0aHJvdyBuZXcgTigyKTtpZigxPT09KHEuZmxhZ3MmMjA5NzE1NSkpdGhyb3cgbmV3IE4oMik7aWYoIXEuTWEuc2IpdGhyb3cgbmV3IE4oNDMpO2lmKCFhKXRocm93IG5ldyBOKDI4KTt2YXIgdz1xLk1hLnNiKHEsYSxlLGIsYyk7dmFyIHU9dy50YztFW2c+PjJdPXcuVWI7RltoPj4yXT11O3JldHVybiAwfWNhdGNoKHgpe2lmKFwidW5kZWZpbmVkXCI9PXR5cGVvZiBYfHxcIkVycm5vRXJyb3JcIiE9PXgubmFtZSl0aHJvdyB4O3JldHVybi14LlBhfX0sejpmdW5jdGlvbihhLGIsYyxkLGUsZyl7Zz0tOTAwNzE5OTI1NDc0MDk5Mj5nfHxcbjkwMDcxOTkyNTQ3NDA5OTI8Zz9OYU46TnVtYmVyKGcpO3RyeXt2YXIgaD1UKGUpO2lmKGMmMil7aWYoMzI3NjghPT0oaC5ub2RlLm1vZGUmNjE0NDApKXRocm93IG5ldyBOKDQzKTtkJjJ8fGguTWEudGImJmguTWEudGIoaCxDLnNsaWNlKGEsYStiKSxnLGIsZCl9fWNhdGNoKHEpe2lmKFwidW5kZWZpbmVkXCI9PXR5cGVvZiBYfHxcIkVycm5vRXJyb3JcIiE9PXEubmFtZSl0aHJvdyBxO3JldHVybi1xLlBhfX0sbjooYSxiKT0+e0hjW2FdJiYoY2xlYXJUaW1lb3V0KEhjW2FdLmlkKSxkZWxldGUgSGNbYV0pO2lmKCFiKXJldHVybiAwO3ZhciBjPXNldFRpbWVvdXQoKCk9PntkZWxldGUgSGNbYV07S2MoKCk9PlVjKGEscGVyZm9ybWFuY2Uubm93KCkpKX0sYik7SGNbYV09e2lkOmMsSGM6Yn07cmV0dXJuIDB9LEI6KGEsYixjLGQpPT57dmFyIGU9KG5ldyBEYXRlKS5nZXRGdWxsWWVhcigpLGc9KG5ldyBEYXRlKGUsMCwxKSkuZ2V0VGltZXpvbmVPZmZzZXQoKTtlPShuZXcgRGF0ZShlLDYsMSkpLmdldFRpbWV6b25lT2Zmc2V0KCk7XG5GW2E+PjJdPTYwKk1hdGgubWF4KGcsZSk7RVtiPj4yXT1OdW1iZXIoZyE9ZSk7Yj1oPT57dmFyIHE9TWF0aC5hYnMoaCk7cmV0dXJuYFVUQyR7MDw9aD9cIi1cIjpcIitcIn0ke1N0cmluZyhNYXRoLmZsb29yKHEvNjApKS5wYWRTdGFydCgyLFwiMFwiKX0ke1N0cmluZyhxJTYwKS5wYWRTdGFydCgyLFwiMFwiKX1gfTthPWIoZyk7Yj1iKGUpO2U8Zz8oTShhLEMsYywxNyksTShiLEMsZCwxNykpOihNKGEsQyxkLDE3KSxNKGIsQyxjLDE3KSl9LGQ6KCk9PkRhdGUubm93KCksczooKT0+MjE0NzQ4MzY0OCxjOigpPT5wZXJmb3JtYW5jZS5ub3coKSxvOmE9Pnt2YXIgYj1DLmxlbmd0aDthPj4+PTA7aWYoMjE0NzQ4MzY0ODxhKXJldHVybiExO2Zvcih2YXIgYz0xOzQ+PWM7Yyo9Mil7dmFyIGQ9YiooMSsuMi9jKTtkPU1hdGgubWluKGQsYSsxMDA2NjMyOTYpO2E6e2Q9KE1hdGgubWluKDIxNDc0ODM2NDgsNjU1MzYqTWF0aC5jZWlsKE1hdGgubWF4KGEsZCkvNjU1MzYpKS1KYS5idWZmZXIuYnl0ZUxlbmd0aCtcbjY1NTM1KS82NTUzNnwwO3RyeXtKYS5ncm93KGQpO0lhKCk7dmFyIGU9MTticmVhayBhfWNhdGNoKGcpe31lPXZvaWQgMH1pZihlKXJldHVybiEwfXJldHVybiExfSxFOihhLGIpPT57dmFyIGM9MCxkPTAsZTtmb3IoZSBvZiBOYygpKXt2YXIgZz1iK2M7RlthK2Q+PjJdPWc7Yys9TShlLEMsZyxJbmZpbml0eSkrMTtkKz00fXJldHVybiAwfSxGOihhLGIpPT57dmFyIGM9TmMoKTtGW2E+PjJdPWMubGVuZ3RoO2E9MDtmb3IodmFyIGQgb2YgYylhKz1nYihkKSsxO0ZbYj4+Ml09YTtyZXR1cm4gMH0sZTpmdW5jdGlvbihhKXt0cnl7dmFyIGI9VChhKTtvYShiKTtyZXR1cm4gMH1jYXRjaChjKXtpZihcInVuZGVmaW5lZFwiPT10eXBlb2YgWHx8XCJFcnJub0Vycm9yXCIhPT1jLm5hbWUpdGhyb3cgYztyZXR1cm4gYy5QYX19LHA6ZnVuY3Rpb24oYSxiKXt0cnl7dmFyIGM9VChhKTttW2JdPWMuVmE/MjpQKGMubW9kZSk/Mzo0MDk2MD09PShjLm1vZGUmNjE0NDApPzc6NDtGYVtiKzI+PjFdPTA7SFtiK1xuOD4+M109QmlnSW50KDApO0hbYisxNj4+M109QmlnSW50KDApO3JldHVybiAwfWNhdGNoKGQpe2lmKFwidW5kZWZpbmVkXCI9PXR5cGVvZiBYfHxcIkVycm5vRXJyb3JcIiE9PWQubmFtZSl0aHJvdyBkO3JldHVybiBkLlBhfX0sdzpmdW5jdGlvbihhLGIsYyxkKXt0cnl7YTp7dmFyIGU9VChhKTthPWI7Zm9yKHZhciBnLGg9Yj0wO2g8YztoKyspe3ZhciBxPUZbYT4+Ml0sdz1GW2ErND4+Ml07YSs9ODt2YXIgdT0kYihlLG0scSx3LGcpO2lmKDA+dSl7dmFyIHg9LTE7YnJlYWsgYX1iKz11O2lmKHU8dylicmVhaztcInVuZGVmaW5lZFwiIT10eXBlb2YgZyYmKGcrPXUpfXg9Yn1GW2Q+PjJdPXg7cmV0dXJuIDB9Y2F0Y2goRCl7aWYoXCJ1bmRlZmluZWRcIj09dHlwZW9mIFh8fFwiRXJybm9FcnJvclwiIT09RC5uYW1lKXRocm93IEQ7cmV0dXJuIEQuUGF9fSxEOmZ1bmN0aW9uKGEsYixjLGQpe2I9LTkwMDcxOTkyNTQ3NDA5OTI+Ynx8OTAwNzE5OTI1NDc0MDk5MjxiP05hTjpOdW1iZXIoYik7dHJ5e2lmKGlzTmFOKGIpKXJldHVybiA2MTtcbnZhciBlPVQoYSk7WmIoZSxiLGMpO0hbZD4+M109QmlnSW50KGUucG9zaXRpb24pO2UuRWImJjA9PT1iJiYwPT09YyYmKGUuRWI9bnVsbCk7cmV0dXJuIDB9Y2F0Y2goZyl7aWYoXCJ1bmRlZmluZWRcIj09dHlwZW9mIFh8fFwiRXJybm9FcnJvclwiIT09Zy5uYW1lKXRocm93IGc7cmV0dXJuIGcuUGF9fSxJOmZ1bmN0aW9uKGEpe3RyeXt2YXIgYj1UKGEpO3JldHVybiBiLk1hPy5sYj8uKGIpfWNhdGNoKGMpe2lmKFwidW5kZWZpbmVkXCI9PXR5cGVvZiBYfHxcIkVycm5vRXJyb3JcIiE9PWMubmFtZSl0aHJvdyBjO3JldHVybiBjLlBhfX0sdDpmdW5jdGlvbihhLGIsYyxkKXt0cnl7YTp7dmFyIGU9VChhKTthPWI7Zm9yKHZhciBnLGg9Yj0wO2g8YztoKyspe3ZhciBxPUZbYT4+Ml0sdz1GW2ErND4+Ml07YSs9ODt2YXIgdT1uYShlLG0scSx3LGcpO2lmKDA+dSl7dmFyIHg9LTE7YnJlYWsgYX1iKz11O2lmKHU8dylicmVhaztcInVuZGVmaW5lZFwiIT10eXBlb2YgZyYmKGcrPXUpfXg9Yn1GW2Q+PjJdPXg7XG5yZXR1cm4gMH1jYXRjaChEKXtpZihcInVuZGVmaW5lZFwiPT10eXBlb2YgWHx8XCJFcnJub0Vycm9yXCIhPT1ELm5hbWUpdGhyb3cgRDtyZXR1cm4gRC5QYX19LGs6SmN9O1xuZnVuY3Rpb24gV2MoKXtmdW5jdGlvbiBhKCl7ay5jYWxsZWRSdW49ITA7aWYoIURhKXtpZighay5ub0ZTSW5pdCYmIURiKXt2YXIgYixjO0RiPSEwO2I/Pz1rLnN0ZGluO2M/Pz1rLnN0ZG91dDtkPz89ay5zdGRlcnI7Yj9XKFwic3RkaW5cIixiKTpVYihcIi9kZXYvdHR5XCIsXCIvZGV2L3N0ZGluXCIpO2M/VyhcInN0ZG91dFwiLG51bGwsYyk6VWIoXCIvZGV2L3R0eVwiLFwiL2Rldi9zdGRvdXRcIik7ZD9XKFwic3RkZXJyXCIsbnVsbCxkKTpVYihcIi9kZXYvdHR5MVwiLFwiL2Rldi9zdGRlcnJcIik7bWEoXCIvZGV2L3N0ZGluXCIsMCk7bWEoXCIvZGV2L3N0ZG91dFwiLDEpO21hKFwiL2Rldi9zdGRlcnJcIiwxKX1YYy5OKCk7RWI9ITE7ay5vblJ1bnRpbWVJbml0aWFsaXplZD8uKCk7aWYoay5wb3N0UnVuKWZvcihcImZ1bmN0aW9uXCI9PXR5cGVvZiBrLnBvc3RSdW4mJihrLnBvc3RSdW49W2sucG9zdFJ1bl0pO2sucG9zdFJ1bi5sZW5ndGg7KXt2YXIgZD1rLnBvc3RSdW4uc2hpZnQoKTtSYS5wdXNoKGQpfVFhKFJhKX19aWYoMDxcbkspVWE9V2M7ZWxzZXtpZihrLnByZVJ1bilmb3IoXCJmdW5jdGlvblwiPT10eXBlb2Ygay5wcmVSdW4mJihrLnByZVJ1bj1bay5wcmVSdW5dKTtrLnByZVJ1bi5sZW5ndGg7KVRhKCk7UWEoU2EpOzA8Sz9VYT1XYzprLnNldFN0YXR1cz8oay5zZXRTdGF0dXMoXCJSdW5uaW5nLi4uXCIpLHNldFRpbWVvdXQoKCk9PntzZXRUaW1lb3V0KCgpPT5rLnNldFN0YXR1cyhcIlwiKSwxKTthKCl9LDEpKTphKCl9fXZhciBYYztcbihhc3luYyBmdW5jdGlvbigpe2Z1bmN0aW9uIGEoYyl7Yz1YYz1jLmV4cG9ydHM7ay5fc3FsaXRlM19mcmVlPWMuUDtrLl9zcWxpdGUzX3ZhbHVlX3RleHQ9Yy5RO2suX3NxbGl0ZTNfcHJlcGFyZV92Mj1jLlI7ay5fc3FsaXRlM19zdGVwPWMuUztrLl9zcWxpdGUzX3Jlc2V0PWMuVDtrLl9zcWxpdGUzX2V4ZWM9Yy5VO2suX3NxbGl0ZTNfZmluYWxpemU9Yy5WO2suX3NxbGl0ZTNfY29sdW1uX25hbWU9Yy5XO2suX3NxbGl0ZTNfY29sdW1uX3RleHQ9Yy5YO2suX3NxbGl0ZTNfY29sdW1uX3R5cGU9Yy5ZO2suX3NxbGl0ZTNfZXJybXNnPWMuWjtrLl9zcWxpdGUzX2NsZWFyX2JpbmRpbmdzPWMuXztrLl9zcWxpdGUzX3ZhbHVlX2Jsb2I9Yy4kO2suX3NxbGl0ZTNfdmFsdWVfYnl0ZXM9Yy5hYTtrLl9zcWxpdGUzX3ZhbHVlX2RvdWJsZT1jLmJhO2suX3NxbGl0ZTNfdmFsdWVfaW50PWMuY2E7ay5fc3FsaXRlM192YWx1ZV90eXBlPWMuZGE7ay5fc3FsaXRlM19yZXN1bHRfYmxvYj1jLmVhO1xuay5fc3FsaXRlM19yZXN1bHRfZG91YmxlPWMuZmE7ay5fc3FsaXRlM19yZXN1bHRfZXJyb3I9Yy5nYTtrLl9zcWxpdGUzX3Jlc3VsdF9pbnQ9Yy5oYTtrLl9zcWxpdGUzX3Jlc3VsdF9pbnQ2ND1jLmlhO2suX3NxbGl0ZTNfcmVzdWx0X251bGw9Yy5qYTtrLl9zcWxpdGUzX3Jlc3VsdF90ZXh0PWMua2E7ay5fc3FsaXRlM19hZ2dyZWdhdGVfY29udGV4dD1jLmxhO2suX3NxbGl0ZTNfY29sdW1uX2NvdW50PWMubWE7ay5fc3FsaXRlM19kYXRhX2NvdW50PWMubmE7ay5fc3FsaXRlM19jb2x1bW5fYmxvYj1jLm9hO2suX3NxbGl0ZTNfY29sdW1uX2J5dGVzPWMucGE7ay5fc3FsaXRlM19jb2x1bW5fZG91YmxlPWMucWE7ay5fc3FsaXRlM19iaW5kX2Jsb2I9Yy5yYTtrLl9zcWxpdGUzX2JpbmRfZG91YmxlPWMuc2E7ay5fc3FsaXRlM19iaW5kX2ludD1jLnRhO2suX3NxbGl0ZTNfYmluZF90ZXh0PWMudWE7ay5fc3FsaXRlM19iaW5kX3BhcmFtZXRlcl9pbmRleD1jLnZhO2suX3NxbGl0ZTNfc3FsPVxuYy53YTtrLl9zcWxpdGUzX25vcm1hbGl6ZWRfc3FsPWMueGE7ay5fc3FsaXRlM19jaGFuZ2VzPWMueWE7ay5fc3FsaXRlM19jbG9zZV92Mj1jLnphO2suX3NxbGl0ZTNfY3JlYXRlX2Z1bmN0aW9uX3YyPWMuQWE7ay5fc3FsaXRlM191cGRhdGVfaG9vaz1jLkJhO2suX3NxbGl0ZTNfb3Blbj1jLkNhO2NhPWsuX21hbGxvYz1jLkRhO2RhPWsuX2ZyZWU9Yy5FYTtrLl9SZWdpc3RlckV4dGVuc2lvbkZ1bmN0aW9ucz1jLkZhO3liPWMuR2E7VWM9Yy5IYTtyYT1jLklhO3k9Yy5KYTtwYT1jLkthO0phPWMuTTtaPWMuTztJYSgpO0stLTtrLm1vbml0b3JSdW5EZXBlbmRlbmNpZXM/LihLKTswPT1LJiZVYSYmKGM9VWEsVWE9bnVsbCxjKCkpO3JldHVybiBYY31LKys7ay5tb25pdG9yUnVuRGVwZW5kZW5jaWVzPy4oSyk7dmFyIGI9e2E6VmN9O2lmKGsuaW5zdGFudGlhdGVXYXNtKXJldHVybiBuZXcgUHJvbWlzZShjPT57ay5pbnN0YW50aWF0ZVdhc20oYiwoZCxlKT0+e2MoYShkLGUpKX0pfSk7XG5MYT8/PWsubG9jYXRlRmlsZT9rLmxvY2F0ZUZpbGUoXCJzcWwtd2FzbS1icm93c2VyLndhc21cIix5YSk6eWErXCJzcWwtd2FzbS1icm93c2VyLndhc21cIjtyZXR1cm4gYSgoYXdhaXQgT2EoYikpLmluc3RhbmNlKX0pKCk7V2MoKTtcblxuXG4gICAgICAgIC8vIFRoZSBzaGVsbC1wcmUuanMgYW5kIGVtY2MtZ2VuZXJhdGVkIGNvZGUgZ29lcyBhYm92ZVxuICAgICAgICByZXR1cm4gTW9kdWxlO1xuICAgIH0pOyAvLyBUaGUgZW5kIG9mIHRoZSBwcm9taXNlIGJlaW5nIHJldHVybmVkXG5cbiAgcmV0dXJuIGluaXRTcWxKc1Byb21pc2U7XG59IC8vIFRoZSBlbmQgb2Ygb3VyIGluaXRTcWxKcyBmdW5jdGlvblxuXG4vLyBUaGlzIGJpdCBiZWxvdyBpcyBjb3BpZWQgYWxtb3N0IGV4YWN0bHkgZnJvbSB3aGF0IHlvdSBnZXQgd2hlbiB5b3UgdXNlIHRoZSBNT0RVTEFSSVpFPTEgZmxhZyB3aXRoIGVtY2Ncbi8vIEhvd2V2ZXIsIHdlIGRvbid0IHdhbnQgdG8gdXNlIHRoZSBlbWNjIG1vZHVsYXJpemF0aW9uLiBTZWUgc2hlbGwtcHJlLmpzXG5pZiAodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnICYmIHR5cGVvZiBtb2R1bGUgPT09ICdvYmplY3QnKXtcbiAgICBtb2R1bGUuZXhwb3J0cyA9IGluaXRTcWxKcztcbiAgICAvLyBUaGlzIHdpbGwgYWxsb3cgdGhlIG1vZHVsZSB0byBiZSB1c2VkIGluIEVTNiBvciBDb21tb25KU1xuICAgIG1vZHVsZS5leHBvcnRzLmRlZmF1bHQgPSBpbml0U3FsSnM7XG59XG5lbHNlIGlmICh0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZVsnYW1kJ10pIHtcbiAgICBkZWZpbmUoW10sIGZ1bmN0aW9uKCkgeyByZXR1cm4gaW5pdFNxbEpzOyB9KTtcbn1cbmVsc2UgaWYgKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0Jyl7XG4gICAgZXhwb3J0c1tcIk1vZHVsZVwiXSA9IGluaXRTcWxKcztcbn1cbiJdLCJmaWxlIjoiRDovVXNlcnMvdHVhbmxhMi9nYW1lL2xlYXJuLWNvZGUtYnktZ2FtZS8uY2xhdWRlL3dvcmt0cmVlcy9jb3JlLWdhbWUtZGVzaWduLWZlZWRiYWNrLTU3MjI1Yy9wcm90b3R5cGUvLnZpdGUtY2FuYXJ5L2RlcHMvc3FsX19qcy5qcyIsInhfZ29vZ2xlX2lnbm9yZUxpc3QiOlswXX0=