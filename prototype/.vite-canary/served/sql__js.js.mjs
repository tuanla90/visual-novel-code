import { t as __commonJSMin } from "file:///D:/Users/tuanla2/game/learn-code-by-game/prototype/.vite-canary/served/rolldown-runtime-BPOCksWG.js.mjs";
//#region node_modules/sql.js/dist/sql-wasm-browser.js
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJtYXBwaW5ncyI6Ijs7O0NBYUEsSUFBSSxtQkFBbUI7Q0FFdkIsSUFBSSxZQUFZLFNBQVUsY0FBYztFQUVwQyxJQUFJLGtCQUNGLE9BQU87RUFHVCxtQkFBbUIsSUFBSSxRQUFRLFNBQVUsZUFBZSxRQUFRO0dBWTVELElBQUksU0FBUyxPQUFPLGlCQUFpQixjQUFjLGVBQWUsQ0FBQztHQUluRSxJQUFJLDBCQUEwQixPQUFPO0dBQ3JDLE9BQU8sYUFBYSxTQUFVLHNCQUFzQjtJQUNoRCxPQUFPLElBQUksTUFBTSxvQkFBb0IsQ0FBQztJQUN0QyxJQUFJLHlCQUNGLHdCQUF3QixvQkFBb0I7R0FFbEQ7R0FFQSxPQUFPLGFBQWEsT0FBTyxjQUFjLENBQUM7R0FDMUMsT0FBTyxVQUFVLENBQUMsS0FBSyxXQUFZO0lBRS9CLGNBQWMsTUFBTTtHQUN4QixDQUFDO0dBa0JELFNBQVM7R0FJakIsSUFBSTtHQUFFLE1BQUksT0FBTyxVQUFVLGNBQWMsU0FBUyxDQUFDO0dBQUUsSUFBSSxLQUFHLENBQUMsQ0FBQyxXQUFXLFFBQU8sS0FBRyxDQUFDLENBQUMsV0FBVztHQUNoRyxFQUFFLHVCQUFxQixXQUFVO0lBQUMsU0FBUyxFQUFFLEdBQUUsR0FBRTtLQUFDLFFBQU8sT0FBTyxHQUFkO01BQWlCLEtBQUs7T0FBVSxHQUFHLEdBQUUsSUFBRSxJQUFFLENBQUM7T0FBRTtNQUFNLEtBQUs7T0FBUyxHQUFHLEdBQUUsQ0FBQztPQUFFO01BQU0sS0FBSztPQUFTLEdBQUcsR0FBRSxHQUFFLElBQUcsRUFBRTtPQUFFO01BQU0sS0FBSztPQUFTLElBQUcsU0FBTyxHQUFFLEdBQUcsQ0FBQztZQUFPLElBQUcsUUFBTSxFQUFFLFFBQU87UUFBQyxJQUFJLElBQUUsR0FBRyxFQUFFLE1BQU07UUFBRSxFQUFFLElBQUksR0FBRSxDQUFDO1FBQUUsR0FBRyxHQUFFLEdBQUUsRUFBRSxRQUFPLEVBQUU7UUFBRSxHQUFHLENBQUM7T0FBQyxPQUFNLEdBQUcsR0FBRSxpRUFBK0QsSUFBRSxNQUFLLEVBQUU7T0FBRTtNQUFNLFNBQVEsR0FBRyxDQUFDO0tBQUM7SUFBQztJQUFDLFNBQVMsRUFBRSxHQUFFLEdBQUU7S0FBQyxLQUFJLElBQUksSUFBRSxDQUFDLEdBQUUsSUFBRSxHQUFFLElBQUUsR0FBRSxLQUFHLEdBQUU7TUFBQyxJQUFJLElBQUUsRUFBRSxJQUFFLElBQUUsR0FBRSxLQUFLLEdBQUUsSUFBRSxHQUFHLENBQUM7TUFBRSxJQUFHLE1BQUksS0FBRyxNQUFJLEdBQUUsSUFBRSxHQUFHLENBQUM7V0FBTyxJQUFHLE1BQUksR0FBRSxJQUFFLEdBQUcsQ0FBQztXQUFPLElBQUcsTUFDemYsR0FBRTtPQUFDLElBQUU7T0FBRSxJQUFFLEdBQUcsQ0FBQztPQUFFLElBQUUsR0FBRyxDQUFDO09BQUUsS0FBSSxJQUFJLElBQUUsSUFBSSxXQUFXLENBQUMsR0FBRSxJQUFFLEdBQUUsSUFBRSxHQUFFLEtBQUcsR0FBRSxFQUFFLEtBQUcsRUFBRSxJQUFFO09BQUcsSUFBRTtNQUFDLE9BQU0sSUFBRTtNQUFLLEVBQUUsS0FBSyxDQUFDO0tBQUM7S0FBQyxPQUFPO0lBQUM7SUFBQyxTQUFTLEVBQUUsR0FBRSxHQUFFO0tBQUMsS0FBSyxLQUFHO0tBQUUsS0FBSyxLQUFHO0tBQUUsS0FBSyxLQUFHO0tBQUUsS0FBSyxLQUFHLENBQUM7SUFBQztJQUFDLFNBQVMsRUFBRSxHQUFFLEdBQUU7S0FBQyxLQUFLLEtBQUc7S0FBRSxLQUFLLEtBQUcsR0FBRyxDQUFDO0tBQUUsSUFBRyxTQUFPLEtBQUssSUFBRyxNQUFNLE1BQU0sOENBQThDO0tBQUUsS0FBSyxLQUFHLEtBQUs7S0FBRyxLQUFLLEtBQUcsS0FBSyxLQUFHO0lBQUk7SUFBQyxTQUFTLEVBQUUsR0FBRTtLQUFDLEtBQUssV0FBUyxhQUFXLGFBQVcsS0FBSyxPQUFPLE1BQUk7S0FBRyxJQUFHLFFBQU0sR0FBRTtNQUFDLElBQUksSUFBRSxLQUFLLFVBQVMsSUFBRSxLQUFJLElBQUU7TUFBRSxNQUFJLElBQUUsWUFBVSxPQUFPLElBQUUsSUFBRSxHQUFHLENB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QUcsU0FBUyxHQUFFO0tBQUMsUUFBTSxLQUFHLEtBQUssS0FBSyxDQUFDO0tBQUUsS0FBSyxLQUFLO0tBQUUsT0FBTyxLQUFLLE1BQU07SUFBQztJQUFFLEVBQUUsVUFBVSxLQUFHLFNBQVMsR0FBRSxHQUFFO0tBQUMsTUFBVSxJQUFFLEtBQUssSUFBRyxLQUFLLE1BQUk7S0FBRyxJQUFFLEdBQUcsQ0FBQztLQUFFLEtBQUssR0FBRyxLQUFLLENBQUM7S0FBRSxLQUFLLEdBQUcsWUFBWSxHQUFHLEtBQUssSUFBRyxHQUFFLEdBQUUsSUFBRyxDQUFDLENBQUM7SUFBQztJQUFFLEVBQUUsVUFBVSxLQUFHLFNBQVMsR0FBRSxHQUFFO0tBQUMsTUFBVSxJQUFFLEtBQUssSUFBRyxLQUFLLE1BQUk7S0FBRyxJQUFJLElBQUUsR0FBRyxFQUFFLE1BQU07S0FBRSxFQUFFLElBQUksR0FBRSxDQUFDO0tBQUUsS0FBSyxHQUFHLEtBQUssQ0FBQztLQUFFLEtBQUssR0FBRyxZQUFZLEdBQUcsS0FBSyxJQUFHLEdBQUUsR0FBRSxFQUFFLFFBQU8sQ0FBQyxDQUFDO0lBQUM7SUFBRSxFQUFFLFVBQVUsS0FBRyxTQUFTLEdBQUUsR0FBRTtLQUFDLE1BQVUsSUFBRSxLQUFLLElBQUcsS0FBSyxNQUFJO0tBQUcsS0FBSyxHQUFHLGFBQWEsT0FBSyxJQUFFLEtBQUcsS0FBRyxJQUFJLEtBQUssSUFDcmYsR0FBRSxDQUFDLENBQUM7SUFBQztJQUFFLEVBQUUsVUFBVSxLQUFHLFNBQVMsR0FBRTtLQUFDLE1BQVUsSUFBRSxLQUFLLElBQUcsS0FBSyxNQUFJO0tBQUcsR0FBRyxLQUFLLElBQUcsR0FBRSxHQUFFLEdBQUUsQ0FBQztJQUFDO0lBQUUsRUFBRSxVQUFVLEtBQUcsU0FBUyxHQUFFLEdBQUU7S0FBQyxNQUFVLElBQUUsS0FBSyxJQUFHLEtBQUssTUFBSTtLQUFHLFFBQU8sT0FBTyxHQUFkO01BQWlCLEtBQUs7T0FBUyxLQUFLLEdBQUcsR0FBRSxDQUFDO09BQUU7TUFBTyxLQUFLO09BQVMsS0FBSyxHQUFHLEdBQUUsQ0FBQztPQUFFO01BQU8sS0FBSztPQUFTLEtBQUssR0FBRyxFQUFFLFNBQVMsR0FBRSxDQUFDO09BQUU7TUFBTyxLQUFLO09BQVUsS0FBSyxHQUFHLElBQUUsR0FBRSxDQUFDO09BQUU7TUFBTyxLQUFLO09BQVMsSUFBRyxTQUFPLEdBQUU7UUFBQyxLQUFLLEdBQUcsQ0FBQztRQUFFO09BQU07T0FBQyxJQUFHLFFBQU0sRUFBRSxRQUFPO1FBQUMsS0FBSyxHQUFHLEdBQUUsQ0FBQztRQUFFO09BQU07S0FBQztLQUFDLE1BQUssK0RBQTZELElBQUU7SUFBSztJQUFFLEVBQUUsVUFBVSxLQUFHLFNBQVMsR0FBRTtLQUFDLElBQUksSUFDMWY7S0FBSyxPQUFPLEtBQUssQ0FBQyxDQUFDLENBQUMsUUFBUSxTQUFTLEdBQUU7TUFBQyxJQUFJLElBQUUsR0FBRyxFQUFFLElBQUcsQ0FBQztNQUFFLE1BQUksS0FBRyxFQUFFLEdBQUcsRUFBRSxJQUFHLENBQUM7S0FBQyxDQUFDO0tBQUUsT0FBTSxDQUFDO0lBQUM7SUFBRSxFQUFFLFVBQVUsS0FBRyxTQUFTLEdBQUU7S0FBQyxLQUFJLElBQUksSUFBRSxHQUFFLElBQUUsRUFBRSxRQUFPLEtBQUcsR0FBRSxLQUFLLEdBQUcsRUFBRSxJQUFHLElBQUUsQ0FBQztLQUFFLE9BQU0sQ0FBQztJQUFDO0lBQUUsRUFBRSxVQUFVLFFBQU0sV0FBVTtLQUFDLEtBQUssR0FBRztLQUFFLE9BQU8sTUFBSSxHQUFHLEtBQUssRUFBRSxLQUFHLE1BQUksR0FBRyxLQUFLLEVBQUU7SUFBQztJQUFFLEVBQUUsVUFBVSxLQUFHLFdBQVU7S0FBQyxLQUFJLElBQUksR0FBRSxLQUFLLE9BQUssSUFBRSxLQUFLLEdBQUcsSUFBSSxLQUFJLEdBQUcsQ0FBQztJQUFDO0lBQUUsRUFBRSxVQUFVLEtBQUcsV0FBVTtLQUFDLEtBQUssR0FBRztLQUFFLElBQUksSUFBRSxNQUFJLEdBQUcsS0FBSyxFQUFFO0tBQUUsT0FBTyxLQUFLLEdBQUcsR0FBRyxLQUFLO0tBQUksS0FBSyxLQUFHO0tBQUUsT0FBTztJQUFDO0lBQUUsRUFBRSxVQUFVLE9BQUssV0FBVTtLQUFDLElBQUcsU0FBTyxLQUFLLElBQUcsT0FBTSxFQUFDLE1BQUssQ0FBQyxFQUFDO0tBQUUsU0FBTyxLQUFLLE9BQ3JmLEtBQUssR0FBRyxHQUFHLEdBQUUsS0FBSyxLQUFHO0tBQU0sSUFBRyxDQUFDLEtBQUssR0FBRyxJQUFHLE1BQU0sS0FBSyxHQUFHLEdBQUUsTUFBTSxpQkFBaUI7S0FBRSxJQUFJLElBQUUsR0FBRyxHQUFFLElBQUUsRUFBRSxDQUFDO0tBQUUsR0FBRyxDQUFDO0tBQUUsR0FBRyxDQUFDO0tBQUUsSUFBRztNQUFDLEtBQUssR0FBRyxZQUFZLEdBQUcsS0FBSyxHQUFHLElBQUcsS0FBSyxJQUFHLElBQUcsR0FBRSxDQUFDLENBQUM7TUFBRSxLQUFLLEtBQUcsRUFBRSxHQUFFLEtBQUs7TUFBRSxJQUFJLElBQUUsRUFBRSxHQUFFLEtBQUs7TUFBRSxJQUFHLE1BQUksR0FBRSxPQUFPLEtBQUssR0FBRyxHQUFFLEVBQUMsTUFBSyxDQUFDLEVBQUM7TUFBRSxLQUFLLEtBQUcsSUFBSSxFQUFFLEdBQUUsS0FBSyxFQUFFO01BQUUsS0FBSyxHQUFHLEdBQUcsS0FBRyxLQUFLO01BQUcsT0FBTTtPQUFDLE9BQU0sS0FBSztPQUFHLE1BQUssQ0FBQztNQUFDO0tBQUMsU0FBTyxHQUFFO01BQUMsTUFBTSxLQUFLLEtBQUcsRUFBRSxLQUFLLEVBQUUsR0FBRSxLQUFLLEdBQUcsR0FBRTtLQUFFLFVBQVE7TUFBQyxHQUFHLENBQUM7S0FBQztJQUFDO0lBQUUsRUFBRSxVQUFVLEtBQUcsV0FBVTtLQUFDLEdBQUcsS0FBSyxFQUFFO0tBQUUsS0FBSyxLQUFHO0lBQUk7SUFBRSxFQUFFLFVBQVUsS0FBRyxXQUFVO0tBQUMsT0FBTyxTQUFPLEtBQUssS0FBRyxLQUFLLEtBQUcsRUFBRSxLQUFLLEVBQUU7SUFBQztJQUNuZixlQUFhLE9BQU8sVUFBUSxhQUFXLE9BQU8sT0FBTyxhQUFXLEVBQUUsVUFBVSxPQUFPLFlBQVUsV0FBVTtLQUFDLE9BQU87SUFBSTtJQUFHLEVBQUUsVUFBVSxLQUFHLFNBQVMsR0FBRSxHQUFFO0tBQUMsSUFBRyxDQUFDLEtBQUssSUFBRyxNQUFLO0tBQWtCLElBQUcsR0FBRTtNQUFDLElBQUUsS0FBSyxHQUFHLEdBQUUsQ0FBQztNQUFFLElBQUc7T0FBQyxFQUFFLEtBQUs7TUFBQyxVQUFRO09BQUMsRUFBRSxHQUFHO01BQUM7S0FBQyxPQUFNLEtBQUssWUFBWSxFQUFFLEtBQUssSUFBRyxHQUFFLEdBQUUsR0FBRSxDQUFDLENBQUM7S0FBRSxPQUFPO0lBQUk7SUFBRSxFQUFFLFVBQVUsT0FBSyxTQUFTLEdBQUUsR0FBRSxHQUFFO0tBQUMsSUFBRyxDQUFDLEtBQUssSUFBRyxNQUFLO0tBQWtCLElBQUksSUFBRSxHQUFHLEdBQUUsSUFBRSxNQUFLLElBQUUsTUFBSyxJQUFFO0tBQUssSUFBRztNQUFDLElBQUUsSUFBRSxHQUFHLENBQUM7TUFBRSxJQUFJLElBQUUsRUFBRSxDQUFDO01BQUUsS0FBSSxJQUFFLENBQUMsR0FBRSxNQUFJLEVBQUUsR0FBRSxJQUFJLElBQUc7T0FBQyxHQUFHLENBQUM7T0FBRSxHQUFHLENBQUM7T0FBRSxLQUFLLFlBQVksR0FBRyxLQUFLLElBQUcsR0FBRSxJQUFHLEdBQUUsQ0FBQyxDQUFDO09BQUUsSUFBSSxJQUFFLEVBQUUsR0FBRSxLQUFLO09BQ3ZmLElBQUUsRUFBRSxHQUFFLEtBQUs7T0FBRSxJQUFHLE1BQUksR0FBRTtRQUFDLElBQUksSUFBRTtRQUFLLElBQUUsSUFBSSxFQUFFLEdBQUUsSUFBSTtRQUFFLEtBQUksUUFBTSxLQUFHLEVBQUUsS0FBSyxDQUFDLEdBQUUsRUFBRSxLQUFLLElBQUcsU0FBTyxNQUFJLElBQUU7U0FBQyxTQUFRLEVBQUUsR0FBRztTQUFFLFFBQU8sQ0FBQztRQUFDLEdBQUUsRUFBRSxLQUFLLENBQUMsSUFBRyxFQUFFLE9BQU8sS0FBSyxFQUFFLElBQUksTUFBSyxDQUFDLENBQUM7UUFBRSxFQUFFLEdBQUc7T0FBQztNQUFDO01BQUMsT0FBTztLQUFDLFNBQU8sSUFBRztNQUFDLE1BQU0sS0FBRyxFQUFFLEdBQUcsR0FBRTtLQUFHLFVBQVE7TUFBQyxLQUFHLEdBQUcsQ0FBQyxHQUFFLEdBQUcsQ0FBQztLQUFDO0lBQUM7SUFBRSxFQUFFLFVBQVUsS0FBRyxTQUFTLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRTtLQUFDLGVBQWEsT0FBTyxNQUFJLElBQUUsR0FBRSxJQUFFLEdBQUUsSUFBRSxLQUFLO0tBQUcsSUFBRSxLQUFLLEdBQUcsR0FBRSxDQUFDO0tBQUUsSUFBRztNQUFDLE9BQUssRUFBRSxLQUFLLElBQUcsRUFBRSxFQUFFLEdBQUcsTUFBSyxDQUFDLENBQUM7S0FBQyxVQUFRO01BQUMsRUFBRSxHQUFHO0tBQUM7S0FBQyxJQUFHLGVBQWEsT0FBTyxHQUFFLE9BQU8sRUFBRTtJQUFDO0lBQUUsRUFBRSxVQUFVLEtBQUcsU0FBUyxHQUFFLEdBQUU7S0FBQyxHQUFHLENBQUM7S0FBRSxLQUFLLFlBQVksRUFBRSxLQUFLLElBQUcsR0FBRSxJQUFHLEdBQUUsQ0FBQyxDQUFDO0tBQUUsSUFBRSxFQUFFLEdBQUUsS0FBSztLQUFFLElBQUcsTUFDdmYsR0FBRSxNQUFLO0tBQXFCLElBQUksSUFBRSxJQUFJLEVBQUUsR0FBRSxJQUFJO0tBQUUsUUFBTSxLQUFHLEVBQUUsS0FBSyxDQUFDO0tBQUUsT0FBTyxLQUFLLEdBQUcsS0FBRztJQUFDO0lBQUUsRUFBRSxVQUFVLEtBQUcsU0FBUyxHQUFFO0tBQUMsT0FBTyxJQUFJLEVBQUUsR0FBRSxJQUFJO0lBQUM7SUFBRSxFQUFFLFVBQVUsS0FBRyxXQUFVO0tBQUMsT0FBTyxPQUFPLEtBQUssRUFBRSxDQUFDLENBQUMsUUFBUSxTQUFTLEdBQUU7TUFBQyxFQUFFLEdBQUc7S0FBQyxDQUFDO0tBQUUsT0FBTyxPQUFPLEtBQUssRUFBRSxDQUFDLENBQUMsUUFBUSxDQUFDO0tBQUUsS0FBSyxLQUFHLENBQUM7S0FBRSxLQUFLLFlBQVksRUFBRSxLQUFLLEVBQUUsQ0FBQztLQUFFLElBQUksSUFBRSxHQUFHLEtBQUssUUFBUTtLQUFFLEtBQUssWUFBWSxFQUFFLEtBQUssVUFBUyxDQUFDLENBQUM7S0FBRSxLQUFLLEtBQUcsRUFBRSxHQUFFLEtBQUs7S0FBRSxHQUFHLEtBQUssRUFBRTtLQUFFLE9BQU87SUFBQztJQUFFLEVBQUUsVUFBVSxRQUFNLFdBQVU7S0FBQyxTQUFPLEtBQUssT0FBSyxPQUFPLE9BQU8sS0FBSyxFQUFFLENBQUMsQ0FBQyxRQUFRLFNBQVMsR0FBRTtNQUFDLEVBQUUsR0FBRztLQUFDLENBQUMsR0FBRSxPQUFPLE9BQU8sS0FBSyxFQUFFLENBQUMsQ0FBQyxRQUFRLENBQUMsR0FDemdCLEtBQUssS0FBRyxDQUFDLEdBQUUsS0FBSyxPQUFLLEVBQUUsS0FBSyxFQUFFLEdBQUUsS0FBSyxLQUFHLEtBQUssSUFBRyxLQUFLLFlBQVksRUFBRSxLQUFLLEVBQUUsQ0FBQyxHQUFFLEdBQUcsTUFBSSxLQUFLLFFBQVEsR0FBRSxLQUFLLEtBQUc7SUFBSztJQUFFLEVBQUUsVUFBVSxjQUFZLFNBQVMsR0FBRTtLQUFDLElBQUcsTUFBSSxHQUFFLE9BQU87S0FBSyxJQUFFLEdBQUcsS0FBSyxFQUFFO0tBQUUsTUFBTSxNQUFNLENBQUM7SUFBRTtJQUFFLEVBQUUsVUFBVSxLQUFHLFdBQVU7S0FBQyxPQUFPLEVBQUUsS0FBSyxFQUFFO0lBQUM7SUFBRSxFQUFFLFVBQVUsS0FBRyxTQUFTLEdBQUUsR0FBRTtLQUFDLE9BQU8sVUFBVSxlQUFlLEtBQUssS0FBSyxJQUFHLENBQUMsTUFBSSxFQUFFLEtBQUssR0FBRyxFQUFFLEdBQUUsT0FBTyxLQUFLLEdBQUc7S0FBSSxJQUFJLElBQUUsR0FBRyxTQUFTLEdBQUUsR0FBRSxHQUFFO01BQUMsSUFBRSxFQUFFLEdBQUUsQ0FBQztNQUFFLElBQUc7T0FBQyxJQUFJLElBQUUsRUFBRSxNQUFNLE1BQUssQ0FBQztNQUFDLFNBQU8sR0FBRTtPQUFDLEdBQUcsR0FBRSxHQUFFLEVBQUU7T0FBRTtNQUFNO01BQUMsRUFBRSxHQUFFLENBQUM7S0FBQyxHQUFFLE1BQU07S0FBRSxLQUFLLEdBQUcsS0FBRztLQUFFLEtBQUssWUFBWSxHQUFHLEtBQUssSUFDcGYsR0FBRSxFQUFFLFFBQU8sR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLENBQUMsQ0FBQztLQUFFLE9BQU87SUFBSTtJQUFFLEVBQUUsVUFBVSxLQUFHLFNBQVMsR0FBRSxHQUFFO0tBQUMsSUFBSSxJQUFFLEVBQUUsUUFBTSxXQUFVO01BQUMsT0FBTztLQUFJLEdBQUUsSUFBRSxFQUFFLFlBQVUsU0FBUyxHQUFFO01BQUMsT0FBTztLQUFDLEdBQUUsSUFBRSxFQUFFO0tBQUssSUFBRyxDQUFDLEdBQUUsTUFBSyx3REFBc0Q7S0FBRSxJQUFJLElBQUUsQ0FBQztLQUFFLE9BQU8sZUFBZSxLQUFLLEtBQUssSUFBRyxDQUFDLE1BQUksRUFBRSxLQUFLLEdBQUcsRUFBRSxHQUFFLE9BQU8sS0FBSyxHQUFHO0tBQUksSUFBRSxJQUFFO0tBQWEsT0FBTyxlQUFlLEtBQUssS0FBSyxJQUFHLENBQUMsTUFBSSxFQUFFLEtBQUssR0FBRyxFQUFFLEdBQUUsT0FBTyxLQUFLLEdBQUc7S0FBSSxJQUFJLElBQUUsR0FBRyxTQUFTLEdBQUUsR0FBRSxJQUFHO01BQUMsSUFBSSxJQUFFLEdBQUcsR0FBRSxDQUFDO01BQUUsT0FBTyxlQUFlLEtBQUssR0FBRSxDQUFDLE1BQUksRUFBRSxLQUFHLEVBQUU7TUFBRyxJQUFFLEVBQUUsR0FBRSxFQUFFO01BQUUsSUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDO01BQ3BmLElBQUc7T0FBQyxFQUFFLEtBQUcsRUFBRSxNQUFNLE1BQUssQ0FBQztNQUFDLFNBQU8sSUFBRztPQUFDLE9BQU8sRUFBRSxJQUFHLEdBQUcsR0FBRSxJQUFHLEVBQUU7TUFBQztLQUFDLEdBQUUsTUFBTSxHQUFFLElBQUUsR0FBRyxTQUFTLEdBQUU7TUFBQyxJQUFJLElBQUUsR0FBRyxHQUFFLENBQUM7TUFBRSxJQUFHO09BQUMsSUFBSSxLQUFHLEVBQUUsRUFBRSxFQUFFO01B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QUcsS0FBSyxPQUFNLE9BQU8sRUFBRSxLQUFHO0tBQUcsS0FBSyxPQUFNLE9BQU8sRUFBRSxLQUFHO0tBQUcsS0FBSyxTQUFRLE9BQU8sR0FBRyxLQUFHO0tBQUcsS0FBSyxVQUFTLE9BQU8sR0FBRyxLQUFHO0tBQUcsS0FBSyxLQUFJLE9BQU8sRUFBRSxLQUFHO0tBQUcsU0FBUSxHQUFHLDhCQUE4QixHQUFHO0lBQUM7R0FBQztHQUFDLElBQUksS0FBRyxDQUFDO0dBQzdULFNBQVMsR0FBRyxHQUFFO0lBQUMsSUFBSSxJQUFFO0lBQU0sRUFBRSxTQUFTLEdBQUcsTUFBSSxJQUFFO0lBQUssUUFBTyxHQUFQO0tBQVUsS0FBSztNQUFLLEVBQUUsS0FBRztNQUFFO0tBQU0sS0FBSztNQUFLLEVBQUUsS0FBRztNQUFFO0tBQU0sS0FBSztNQUFNLEdBQUcsS0FBRyxLQUFHO01BQUU7S0FBTSxLQUFLO01BQU0sRUFBRSxLQUFHLEtBQUc7TUFBRTtLQUFNLEtBQUs7TUFBTSxFQUFFLEtBQUcsS0FBRyxPQUFPLENBQUM7TUFBRTtLQUFNLEtBQUs7TUFBUSxHQUFHLEtBQUcsS0FBRztNQUFFO0tBQU0sS0FBSztNQUFTLEdBQUcsS0FBRyxLQUFHO01BQUU7S0FBTSxLQUFLO01BQUksRUFBRSxLQUFHLEtBQUc7TUFBRTtLQUFNLFNBQVEsR0FBRyw4QkFBOEIsR0FBRztJQUFDO0dBQUM7R0FDMVUsSUFBSSxLQUFHLElBQUksWUFBVSxHQUFFLE1BQUksR0FBRSxHQUFFLEdBQUUsTUFBSTtJQUFDLElBQUUsSUFBRTtJQUFFLElBQUcsR0FBRSxPQUFPO0lBQUUsT0FBSyxFQUFFLE1BQUksRUFBRSxLQUFHLEtBQUksRUFBRTtJQUFFLE9BQU87R0FBQyxHQUFFLEtBQUcsR0FBRSxHQUFFLE1BQUksSUFBRSxHQUFHLE9BQU8sRUFBRSxTQUFTLEdBQUUsR0FBRyxHQUFFLEdBQUUsR0FBRSxDQUFDLENBQUMsQ0FBQyxJQUFFLElBQUcsTUFBSSxHQUFFLE1BQUk7SUFBQyxLQUFJLElBQUksSUFBRSxHQUFFLElBQUUsRUFBRSxTQUFPLEdBQUUsS0FBRyxHQUFFLEtBQUk7S0FBQyxJQUFJLElBQUUsRUFBRTtLQUFHLFFBQU0sSUFBRSxFQUFFLE9BQU8sR0FBRSxDQUFDLElBQUUsU0FBTyxLQUFHLEVBQUUsT0FBTyxHQUFFLENBQUMsR0FBRSxPQUFLLE1BQUksRUFBRSxPQUFPLEdBQUUsQ0FBQyxHQUFFO0lBQUk7SUFBQyxJQUFHLEdBQUUsT0FBSyxHQUFFLEtBQUksRUFBRSxRQUFRLElBQUk7SUFBRSxPQUFPO0dBQUMsR0FBRSxNQUFHLE1BQUc7SUFBQyxJQUFJLElBQUUsUUFBTSxFQUFFLE9BQU8sQ0FBQyxHQUFFLElBQUUsUUFBTSxFQUFFLE1BQU0sRUFBRTtJQUFFLENBQUMsSUFBRSxHQUFHLEVBQUUsTUFBTSxHQUFHLENBQUMsQ0FBQyxRQUFPLE1BQUcsQ0FBQyxDQUFDLENBQUMsR0FBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssR0FBRyxNQUFJLE1BQUksSUFBRTtJQUFLLEtBQUcsTUFBSSxLQUFHO0lBQUssUUFBTyxJQUFFLE1BQUksTUFBSTtHQUFDLEdBQUUsTUFBRyxNQUFHO0lBQUMsSUFBSSxJQUFFLGdFQUFnRSxLQUFLLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQztJQUM3aUIsSUFBRSxFQUFFO0lBQUcsSUFBRSxFQUFFO0lBQUcsSUFBRyxDQUFDLEtBQUcsQ0FBQyxHQUFFLE9BQU07SUFBSSxNQUFJLEVBQUUsTUFBTSxHQUFFLEVBQUU7SUFBRSxPQUFPLElBQUU7R0FBQyxHQUFFLE1BQUcsTUFBRyxLQUFHLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQyxDQUFDLElBQUcsWUFBTyxNQUFHLE9BQU8sZ0JBQWdCLENBQUMsR0FBRSxNQUFHLE1BQUc7SUFBQyxDQUFDLEtBQUcsR0FBRyxHQUFHLENBQUM7R0FBQyxHQUFFLE1BQUksR0FBRyxNQUFJO0lBQUMsS0FBSSxJQUFJLElBQUUsSUFBRyxJQUFFLENBQUMsR0FBRSxJQUFFLEVBQUUsU0FBTyxHQUFFLE1BQUksS0FBRyxDQUFDLEdBQUUsS0FBSTtLQUFDLElBQUUsS0FBRyxJQUFFLEVBQUUsS0FBRztLQUFJLElBQUcsWUFBVSxPQUFPLEdBQUUsTUFBTSxJQUFJLFVBQVUsMkNBQTJDO0tBQUUsSUFBRyxDQUFDLEdBQUUsT0FBTTtLQUFHLElBQUUsSUFBRSxNQUFJO0tBQUUsSUFBRSxRQUFNLEVBQUUsT0FBTyxDQUFDO0lBQUM7SUFBQyxJQUFFLEdBQUcsRUFBRSxNQUFNLEdBQUcsQ0FBQyxDQUFDLFFBQU8sTUFBRyxDQUFDLENBQUMsQ0FBQyxHQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxHQUFHO0lBQUUsUUFBTyxJQUFFLE1BQUksTUFBSSxLQUFHO0dBQUcsR0FBRSxNQUFHLE1BQUc7SUFBQyxJQUFJLElBQUUsR0FBRyxHQUFFLENBQUM7SUFBRSxPQUFPLEdBQUcsT0FBTyxFQUFFLFNBQU8sRUFBRSxTQUFTLEdBQUUsQ0FBQyxJQUNuZixJQUFJLFdBQVcsRUFBRSxNQUFNLEdBQUUsQ0FBQyxDQUFDLENBQUM7R0FBQyxHQUFFLEtBQUcsQ0FBQyxHQUFFLE1BQUcsTUFBRztJQUFDLEtBQUksSUFBSSxJQUFFLEdBQUUsSUFBRSxHQUFFLElBQUUsRUFBRSxRQUFPLEVBQUUsR0FBRTtLQUFDLElBQUksSUFBRSxFQUFFLFdBQVcsQ0FBQztLQUFFLE9BQUssSUFBRSxNQUFJLFFBQU0sSUFBRSxLQUFHLElBQUUsU0FBTyxLQUFHLFNBQU8sS0FBRyxLQUFHLEdBQUUsRUFBRSxLQUFHLEtBQUc7SUFBQztJQUFDLE9BQU87R0FBQyxHQUFFLEtBQUcsR0FBRSxHQUFFLEdBQUUsTUFBSTtJQUFDLElBQUcsRUFBRSxJQUFFLElBQUcsT0FBTztJQUFFLElBQUksSUFBRTtJQUFFLElBQUUsSUFBRSxJQUFFO0lBQUUsS0FBSSxJQUFJLElBQUUsR0FBRSxJQUFFLEVBQUUsUUFBTyxFQUFFLEdBQUU7S0FBQyxJQUFJLElBQUUsRUFBRSxZQUFZLENBQUM7S0FBRSxJQUFHLE9BQUssR0FBRTtNQUFDLElBQUcsS0FBRyxHQUFFO01BQU0sRUFBRSxPQUFLO0tBQUMsT0FBTSxJQUFHLFFBQU0sR0FBRTtNQUFDLElBQUcsSUFBRSxLQUFHLEdBQUU7TUFBTSxFQUFFLE9BQUssTUFBSSxLQUFHO01BQUUsRUFBRSxPQUFLLE1BQUksSUFBRTtLQUFFLE9BQU0sSUFBRyxTQUFPLEdBQUU7TUFBQyxJQUFHLElBQUUsS0FBRyxHQUFFO01BQU0sRUFBRSxPQUFLLE1BQUksS0FBRztNQUFHLEVBQUUsT0FBSyxNQUFJLEtBQUcsSUFBRTtNQUFHLEVBQUUsT0FBSyxNQUFJLElBQUU7S0FBRSxPQUFLO01BQUMsSUFBRyxJQUFFLEtBQUcsR0FBRTtNQUFNLEVBQUUsT0FBSyxNQUFJLEtBQUc7TUFBRyxFQUFFLE9BQUssTUFDamYsS0FBRyxLQUFHO01BQUcsRUFBRSxPQUFLLE1BQUksS0FBRyxJQUFFO01BQUcsRUFBRSxPQUFLLE1BQUksSUFBRTtNQUFHO0tBQUc7SUFBQztJQUFDLEVBQUUsS0FBRztJQUFFLE9BQU8sSUFBRTtHQUFDLEdBQUUsS0FBRyxDQUFDO0dBQUUsU0FBUyxHQUFHLEdBQUUsR0FBRTtJQUFDLEdBQUcsS0FBRztLQUFDLE9BQU0sQ0FBQztLQUFFLFFBQU8sQ0FBQztLQUFFLElBQUc7SUFBQztJQUFFLEdBQUcsR0FBRSxFQUFFO0dBQUM7R0FDbkksSUFBSSxLQUFHO0lBQUMsS0FBSyxHQUFFO0tBQUMsSUFBSSxJQUFFLEdBQUcsRUFBRSxLQUFLO0tBQUksSUFBRyxDQUFDLEdBQUUsTUFBTSxJQUFJLEVBQUUsRUFBRTtLQUFFLEVBQUUsS0FBRztLQUFFLEVBQUUsV0FBUyxDQUFDO0lBQUM7SUFBRSxNQUFNLEdBQUU7S0FBQyxFQUFFLEdBQUcsR0FBRyxHQUFHLEVBQUUsRUFBRTtJQUFDO0lBQUUsR0FBRyxHQUFFO0tBQUMsRUFBRSxHQUFHLEdBQUcsR0FBRyxFQUFFLEVBQUU7SUFBQztJQUFFLEtBQUssR0FBRSxHQUFFLEdBQUUsR0FBRTtLQUFDLElBQUcsQ0FBQyxFQUFFLE1BQUksQ0FBQyxFQUFFLEdBQUcsR0FBRyxJQUFHLE1BQU0sSUFBSSxFQUFFLEVBQUU7S0FBRSxLQUFJLElBQUksSUFBRSxHQUFFLElBQUUsR0FBRSxJQUFFLEdBQUUsS0FBSTtNQUFDLElBQUc7T0FBQyxJQUFJLElBQUUsRUFBRSxHQUFHLEdBQUcsR0FBRyxFQUFFLEVBQUU7TUFBQyxTQUFPLEdBQUU7T0FBQyxNQUFNLElBQUksRUFBRSxFQUFFO01BQUU7TUFBQyxJQUFHLEtBQUssTUFBSSxLQUFHLE1BQUksR0FBRSxNQUFNLElBQUksRUFBRSxDQUFDO01BQUUsSUFBRyxTQUFPLEtBQUcsS0FBSyxNQUFJLEdBQUU7TUFBTTtNQUFJLEVBQUUsSUFBRSxLQUFHO0tBQUM7S0FBQyxNQUFJLEVBQUUsS0FBSyxLQUFHLEtBQUssSUFBSTtLQUFHLE9BQU87SUFBQztJQUFFLE1BQU0sR0FBRSxHQUFFLEdBQUUsR0FBRTtLQUFDLElBQUcsQ0FBQyxFQUFFLE1BQUksQ0FBQyxFQUFFLEdBQUcsR0FBRyxJQUFHLE1BQU0sSUFBSSxFQUFFLEVBQUU7S0FBRSxJQUFHO01BQUMsS0FBSSxJQUFJLElBQUUsR0FBRSxJQUFFLEdBQUUsS0FBSSxFQUFFLEdBQUcsR0FBRyxHQUFHLEVBQUUsSUFBRyxFQUFFLElBQUUsRUFBRTtLQUFDLFNBQU8sR0FBRTtNQUFDLE1BQU0sSUFBSSxFQUFFLEVBQUU7S0FDcGY7S0FBQyxNQUFJLEVBQUUsS0FBSyxLQUFHLEVBQUUsS0FBSyxLQUFHLEtBQUssSUFBSTtLQUFHLE9BQU87SUFBQztHQUFDLEdBQUUsS0FBRztJQUFDLEtBQUk7S0FBQyxHQUFFO01BQUMsSUFBRyxDQUFDLEdBQUcsUUFBTztPQUFDLElBQUksSUFBRTtPQUFLLFdBQVcsUUFBUSxXQUFTLElBQUUsT0FBTyxPQUFPLFNBQVMsR0FBRSxTQUFPLE1BQUksS0FBRztPQUFPLElBQUcsQ0FBQyxHQUFFO1FBQUMsSUFBSSxJQUFFO1FBQUssTUFBTTtPQUFDO09BQUMsSUFBRSxNQUFNLEdBQUcsQ0FBQyxJQUFFLENBQUM7T0FBRSxJQUFFLEVBQUUsR0FBRSxHQUFFLEdBQUUsRUFBRSxNQUFNO09BQUUsRUFBRSxTQUFPO09BQUUsS0FBRztNQUFDO01BQUMsSUFBRSxHQUFHLE1BQU07S0FBQztLQUFDLE9BQU87SUFBQztJQUFFLEdBQUcsR0FBRSxHQUFFO0tBQUMsU0FBTyxLQUFHLE9BQUssS0FBRyxHQUFHLEdBQUcsRUFBRSxNQUFNLENBQUMsR0FBRSxFQUFFLFNBQU8sQ0FBQyxLQUFHLEtBQUcsS0FBRyxFQUFFLE9BQU8sS0FBSyxDQUFDO0lBQUM7SUFBRSxHQUFHLEdBQUU7S0FBQyxJQUFFLEVBQUUsUUFBUSxXQUFTLEdBQUcsR0FBRyxFQUFFLE1BQU0sQ0FBQyxHQUFFLEVBQUUsU0FBTyxDQUFDO0lBQUU7SUFBRSxLQUFJO0tBQUMsT0FBTTtNQUFDLElBQUc7TUFBTSxJQUFHO01BQUUsSUFBRztNQUFJLElBQUc7TUFBTSxJQUFHO09BQUM7T0FBRTtPQUFHO09BQUk7T0FBRztPQUFFO09BQUU7T0FBRTtPQUFFO09BQUc7T0FBRztPQUFHO09BQUU7T0FBRztPQUFHO09BQUc7T0FBRztPQUFFO09BQUU7T0FBRTtPQUFFO09BQ25mO09BQUU7T0FBRTtPQUFFO09BQUU7T0FBRTtPQUFFO09BQUU7T0FBRTtPQUFFO09BQUU7TUFBQztLQUFDO0lBQUM7SUFBRSxLQUFJO0tBQUMsT0FBTztJQUFDO0lBQUUsS0FBSTtLQUFDLE9BQU0sQ0FBQyxJQUFHLEVBQUU7SUFBQztHQUFDLEdBQUUsS0FBRztJQUFDLEdBQUcsR0FBRSxHQUFFO0tBQUMsU0FBTyxLQUFHLE9BQUssS0FBRyxFQUFFLEdBQUcsRUFBRSxNQUFNLENBQUMsR0FBRSxFQUFFLFNBQU8sQ0FBQyxLQUFHLEtBQUcsS0FBRyxFQUFFLE9BQU8sS0FBSyxDQUFDO0lBQUM7SUFBRSxHQUFHLEdBQUU7S0FBQyxJQUFFLEVBQUUsUUFBUSxXQUFTLEVBQUUsR0FBRyxFQUFFLE1BQU0sQ0FBQyxHQUFFLEVBQUUsU0FBTyxDQUFDO0lBQUU7R0FBQyxHQUFFLElBQUU7SUFBQyxJQUFHO0lBQUssS0FBSTtLQUFDLE9BQU8sRUFBRSxXQUFXLE1BQUssS0FBSSxPQUFNLENBQUM7SUFBQztJQUFFLFdBQVcsR0FBRSxHQUFFLEdBQUUsR0FBRTtLQUFDLElBQUcsV0FBUyxJQUFFLFVBQVEsVUFBUSxJQUFFLFFBQU8sTUFBTSxJQUFJLEVBQUUsRUFBRTtLQUFFLEVBQUUsT0FBSyxFQUFFLEtBQUc7TUFBQyxLQUFJO09BQUMsTUFBSztRQUFDLElBQUcsRUFBRSxHQUFHO1FBQUcsSUFBRyxFQUFFLEdBQUc7UUFBRyxJQUFHLEVBQUUsR0FBRztRQUFHLElBQUcsRUFBRSxHQUFHO1FBQUcsSUFBRyxFQUFFLEdBQUc7UUFBRyxJQUFHLEVBQUUsR0FBRztRQUFHLElBQUcsRUFBRSxHQUFHO1FBQUcsSUFBRyxFQUFFLEdBQUc7UUFBRyxJQUFHLEVBQUUsR0FBRztPQUFFO09BQUUsUUFBTyxFQUFDLElBQUcsRUFBRSxHQUFHLEdBQUU7TUFBQztNQUFFLE1BQUs7T0FBQyxNQUFLO1FBQUMsSUFBRyxFQUFFLEdBQUc7UUFBRyxJQUFHLEVBQUUsR0FBRztPQUFFO09BQzlmLFFBQU87UUFBQyxJQUFHLEVBQUUsR0FBRztRQUFHLE1BQUssRUFBRSxHQUFHO1FBQUssT0FBTSxFQUFFLEdBQUc7UUFBTSxJQUFHLEVBQUUsR0FBRztRQUFHLElBQUcsRUFBRSxHQUFHO09BQUU7TUFBQztNQUFFLE1BQUs7T0FBQyxNQUFLO1FBQUMsSUFBRyxFQUFFLEdBQUc7UUFBRyxJQUFHLEVBQUUsR0FBRztRQUFHLElBQUcsRUFBRSxHQUFHO09BQUU7T0FBRSxRQUFPLENBQUM7TUFBQztNQUFFLElBQUc7T0FBQyxNQUFLO1FBQUMsSUFBRyxFQUFFLEdBQUc7UUFBRyxJQUFHLEVBQUUsR0FBRztPQUFFO09BQUUsUUFBTztNQUFFO0tBQUM7S0FBRyxJQUFFLEdBQUcsR0FBRSxHQUFFLEdBQUUsQ0FBQztLQUFFLEVBQUUsRUFBRSxJQUFJLEtBQUcsRUFBRSxLQUFHLEVBQUUsR0FBRyxJQUFJLE1BQUssRUFBRSxLQUFHLEVBQUUsR0FBRyxJQUFJLFFBQU8sRUFBRSxLQUFHLENBQUMsS0FBRyxXQUFTLEVBQUUsT0FBSyxVQUFRLEVBQUUsS0FBRyxFQUFFLEdBQUcsS0FBSyxNQUFLLEVBQUUsS0FBRyxFQUFFLEdBQUcsS0FBSyxRQUFPLEVBQUUsS0FBRyxHQUFFLEVBQUUsS0FBRyxRQUFNLFdBQVMsRUFBRSxPQUFLLFVBQVEsRUFBRSxLQUFHLEVBQUUsR0FBRyxLQUFLLE1BQUssRUFBRSxLQUFHLEVBQUUsR0FBRyxLQUFLLFVBQVEsVUFBUSxFQUFFLE9BQUssV0FBUyxFQUFFLEtBQUcsRUFBRSxHQUFHLEdBQUcsTUFBSyxFQUFFLEtBQUcsRUFBRSxHQUFHLEdBQUc7S0FBUSxFQUFFLEtBQUcsRUFBRSxLQUFHLEVBQUUsS0FBRyxLQUFLLElBQUk7S0FBRSxNQUFJLEVBQUUsR0FBRyxLQUNyZixHQUFFLEVBQUUsS0FBRyxFQUFFLEtBQUcsRUFBRSxLQUFHLEVBQUU7S0FBSSxPQUFPO0lBQUM7SUFBRSxHQUFHLEdBQUU7S0FBQyxPQUFPLEVBQUUsS0FBRyxFQUFFLEdBQUcsV0FBUyxFQUFFLEdBQUcsU0FBUyxHQUFFLEVBQUUsRUFBRSxJQUFFLElBQUksV0FBVyxFQUFFLEVBQUUsb0JBQUUsSUFBSSxXQUFXLENBQUM7SUFBQztJQUFFLElBQUc7S0FBQyxHQUFHLEdBQUU7TUFBQyxJQUFJLElBQUUsQ0FBQztNQUFFLEVBQUUsS0FBRyxVQUFRLEVBQUUsT0FBSyxTQUFPLEVBQUUsS0FBRztNQUFFLEVBQUUsS0FBRyxFQUFFO01BQUcsRUFBRSxPQUFLLEVBQUU7TUFBSyxFQUFFLEtBQUc7TUFBRSxFQUFFLE1BQUk7TUFBRSxFQUFFLEtBQUc7TUFBRSxFQUFFLEtBQUcsRUFBRTtNQUFHLEVBQUUsRUFBRSxJQUFJLElBQUUsRUFBRSxPQUFLLE9BQUssV0FBUyxFQUFFLE9BQUssU0FBTyxFQUFFLE9BQUssRUFBRSxLQUFHLFdBQVMsRUFBRSxPQUFLLFNBQU8sRUFBRSxPQUFLLEVBQUUsS0FBSyxTQUFPLEVBQUUsT0FBSztNQUFFLEVBQUUsS0FBRyxJQUFJLEtBQUssRUFBRSxFQUFFO01BQUUsRUFBRSxLQUFHLElBQUksS0FBSyxFQUFFLEVBQUU7TUFBRSxFQUFFLEtBQUcsSUFBSSxLQUFLLEVBQUUsRUFBRTtNQUFFLEVBQUUsS0FBRztNQUFLLEVBQUUsS0FBRyxLQUFLLEtBQUssRUFBRSxPQUFLLEVBQUUsRUFBRTtNQUFFLE9BQU87S0FBQztLQUFFLEdBQUcsR0FBRSxHQUFFO01BQUMsS0FBSSxJQUFJLEtBQUk7T0FBQztPQUFPO09BQVE7T0FBUTtNQUFPLEdBQUUsUUFDM2YsRUFBRSxPQUFLLEVBQUUsS0FBRyxFQUFFO01BQUksS0FBSyxNQUFJLEVBQUUsU0FBTyxJQUFFLEVBQUUsTUFBSyxFQUFFLE1BQUksTUFBSSxLQUFHLEtBQUcsRUFBRSxLQUFHLE1BQUssRUFBRSxLQUFHLE1BQUksSUFBRSxFQUFFLElBQUcsRUFBRSxLQUFHLElBQUksV0FBVyxDQUFDLEdBQUUsS0FBRyxFQUFFLEdBQUcsSUFBSSxFQUFFLFNBQVMsR0FBRSxLQUFLLElBQUksR0FBRSxFQUFFLEVBQUUsQ0FBQyxDQUFDLEdBQUUsRUFBRSxLQUFHO0tBQUk7S0FBRSxLQUFJO01BQUMsRUFBRSxPQUFLLEVBQUUsS0FBRyxJQUFJLEVBQUUsRUFBRSxHQUFFLEVBQUUsR0FBRyxRQUFNO01BQTZCLE1BQU0sRUFBRTtLQUFHO0tBQUUsR0FBRyxHQUFFLEdBQUUsR0FBRSxHQUFFO01BQUMsT0FBTyxFQUFFLFdBQVcsR0FBRSxHQUFFLEdBQUUsQ0FBQztLQUFDO0tBQUUsR0FBRyxHQUFFLEdBQUUsR0FBRTtNQUFDLElBQUc7T0FBQyxJQUFJLElBQUUsRUFBRSxHQUFFLENBQUM7TUFBQyxTQUFPLEdBQUUsQ0FBQztNQUFDLElBQUcsR0FBRTtPQUFDLElBQUcsRUFBRSxFQUFFLElBQUksR0FBRSxLQUFJLElBQUksS0FBSyxFQUFFLElBQUcsTUFBTSxJQUFJLEVBQUUsRUFBRTtPQUFFLEdBQUcsQ0FBQztNQUFDO01BQUMsT0FBTyxFQUFFLE9BQU8sR0FBRyxFQUFFO01BQU0sRUFBRSxHQUFHLEtBQUc7TUFBRSxFQUFFLE9BQUs7TUFBRSxFQUFFLEtBQUcsRUFBRSxLQUFHLEVBQUUsT0FBTyxLQUFHLEVBQUUsT0FBTyxLQUFHLEtBQUssSUFBSTtLQUFDO0tBQUUsR0FBRyxHQUFFLEdBQUU7TUFBQyxPQUFPLEVBQUUsR0FBRztNQUFHLEVBQUUsS0FDcGYsRUFBRSxLQUFHLEtBQUssSUFBSTtLQUFDO0tBQUUsR0FBRyxHQUFFLEdBQUU7TUFBQyxJQUFJLElBQUUsRUFBRSxHQUFFLENBQUMsR0FBRTtNQUFFLEtBQUksS0FBSyxFQUFFLElBQUcsTUFBTSxJQUFJLEVBQUUsRUFBRTtNQUFFLE9BQU8sRUFBRSxHQUFHO01BQUcsRUFBRSxLQUFHLEVBQUUsS0FBRyxLQUFLLElBQUk7S0FBQztLQUFFLEdBQUcsR0FBRTtNQUFDLE9BQU07T0FBQztPQUFJO09BQUssR0FBRyxPQUFPLEtBQUssRUFBRSxFQUFFO01BQUM7S0FBQztLQUFFLEdBQUcsR0FBRSxHQUFFLEdBQUU7TUFBQyxJQUFFLEVBQUUsV0FBVyxHQUFFLEdBQUUsT0FBTSxDQUFDO01BQUUsRUFBRSxPQUFLO01BQUUsT0FBTztLQUFDO0tBQUUsR0FBRyxHQUFFO01BQUMsSUFBRyxXQUFTLEVBQUUsT0FBSyxRQUFPLE1BQU0sSUFBSSxFQUFFLEVBQUU7TUFBRSxPQUFPLEVBQUU7S0FBSTtJQUFDO0lBQUUsSUFBRztLQUFDLEtBQUssR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFO01BQUMsSUFBSSxJQUFFLEVBQUUsS0FBSztNQUFHLElBQUcsS0FBRyxFQUFFLEtBQUssSUFBRyxPQUFPO01BQUUsSUFBRSxLQUFLLElBQUksRUFBRSxLQUFLLEtBQUcsR0FBRSxDQUFDO01BQUUsSUFBRyxJQUFFLEtBQUcsRUFBRSxVQUFTLEVBQUUsSUFBSSxFQUFFLFNBQVMsR0FBRSxJQUFFLENBQUMsR0FBRSxDQUFDO1dBQU8sS0FBSSxJQUFFLEdBQUUsSUFBRSxHQUFFLEtBQUksRUFBRSxJQUFFLEtBQUcsRUFBRSxJQUFFO01BQUcsT0FBTztLQUFDO0tBQUUsTUFBTSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRTtNQUFDLEVBQUUsV0FBUyxFQUFFLFdBQVMsSUFBRSxDQUFDO01BQUcsSUFBRyxDQUFDLEdBQUUsT0FBTztNQUMvZixJQUFFLEVBQUU7TUFBSyxFQUFFLEtBQUcsRUFBRSxLQUFHLEtBQUssSUFBSTtNQUFFLElBQUcsRUFBRSxhQUFXLENBQUMsRUFBRSxNQUFJLEVBQUUsR0FBRyxXQUFVO09BQUMsSUFBRyxHQUFFLE9BQU8sRUFBRSxLQUFHLEVBQUUsU0FBUyxHQUFFLElBQUUsQ0FBQyxHQUFFLEVBQUUsS0FBRztPQUFFLElBQUcsTUFBSSxFQUFFLE1BQUksTUFBSSxHQUFFLE9BQU8sRUFBRSxLQUFHLEVBQUUsTUFBTSxHQUFFLElBQUUsQ0FBQyxHQUFFLEVBQUUsS0FBRztPQUFFLElBQUcsSUFBRSxLQUFHLEVBQUUsSUFBRyxPQUFPLEVBQUUsR0FBRyxJQUFJLEVBQUUsU0FBUyxHQUFFLElBQUUsQ0FBQyxHQUFFLENBQUMsR0FBRTtNQUFDO01BQUMsSUFBRSxJQUFFO01BQUUsSUFBSSxJQUFFLEVBQUUsS0FBRyxFQUFFLEdBQUcsU0FBTztNQUFFLEtBQUcsTUFBSSxJQUFFLEtBQUssSUFBSSxHQUFFLEtBQUcsVUFBUSxJQUFFLElBQUUsV0FBUyxDQUFDLEdBQUUsS0FBRyxNQUFJLElBQUUsS0FBSyxJQUFJLEdBQUUsR0FBRyxJQUFHLElBQUUsRUFBRSxJQUFHLEVBQUUsS0FBRyxJQUFJLFdBQVcsQ0FBQyxHQUFFLElBQUUsRUFBRSxNQUFJLEVBQUUsR0FBRyxJQUFJLEVBQUUsU0FBUyxHQUFFLEVBQUUsRUFBRSxHQUFFLENBQUM7TUFBRyxJQUFHLEVBQUUsR0FBRyxZQUFVLEVBQUUsVUFBUyxFQUFFLEdBQUcsSUFBSSxFQUFFLFNBQVMsR0FBRSxJQUFFLENBQUMsR0FBRSxDQUFDO1dBQU8sS0FBSSxJQUFFLEdBQUUsSUFBRSxHQUFFLEtBQUksRUFBRSxHQUFHLElBQUUsS0FBRyxFQUFFLElBQUU7TUFBRyxFQUFFLEtBQUcsS0FBSyxJQUFJLEVBQUUsSUFDdmYsSUFBRSxDQUFDO01BQUUsT0FBTztLQUFDO0tBQUUsR0FBRyxHQUFFLEdBQUUsR0FBRTtNQUFDLE1BQUksSUFBRSxLQUFHLEVBQUUsV0FBUyxNQUFJLEtBQUcsV0FBUyxFQUFFLEtBQUssT0FBSyxXQUFTLEtBQUcsRUFBRSxLQUFLO01BQUksSUFBRyxJQUFFLEdBQUUsTUFBTSxJQUFJLEVBQUUsRUFBRTtNQUFFLE9BQU87S0FBQztLQUFFLEdBQUcsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFO01BQUMsSUFBRyxXQUFTLEVBQUUsS0FBSyxPQUFLLFFBQU8sTUFBTSxJQUFJLEVBQUUsRUFBRTtNQUFFLElBQUUsRUFBRSxLQUFLO01BQUcsSUFBRyxJQUFFLEtBQUcsQ0FBQyxLQUFHLEVBQUUsV0FBUyxFQUFFLFFBQU87T0FBQyxJQUFFLENBQUM7T0FBRSxJQUFFLFFBQU0sS0FBSyxLQUFLLElBQUUsS0FBSztPQUFFLElBQUksSUFBRSxHQUFHLE9BQU0sQ0FBQztPQUFFLEtBQUcsRUFBRSxLQUFLLEdBQUUsR0FBRSxJQUFFLENBQUM7T0FBRSxJQUFFO09BQUUsSUFBRyxDQUFDLEdBQUUsTUFBTSxJQUFJLEVBQUUsRUFBRTtPQUFFLElBQUcsR0FBRTtRQUFDLElBQUcsSUFBRSxLQUFHLElBQUUsSUFBRSxFQUFFLFFBQU8sRUFBRSxXQUFTLElBQUUsRUFBRSxTQUFTLEdBQUUsSUFBRSxDQUFDLElBQUUsSUFBRSxNQUFNLFVBQVUsTUFBTSxLQUFLLEdBQUUsR0FBRSxJQUFFLENBQUM7UUFBRSxFQUFFLElBQUksR0FBRSxDQUFDO09BQUM7TUFBQyxPQUFNLElBQUUsQ0FBQyxHQUFFLElBQUUsRUFBRTtNQUFXLE9BQU07T0FBQyxJQUFHO09BQUUsSUFBRztNQUFDO0tBQUM7S0FBRSxHQUFHLEdBQUUsR0FBRSxHQUFFLEdBQUU7TUFBQyxFQUFFLEdBQUcsTUFBTSxHQUN6ZixHQUFFLEdBQUUsR0FBRSxHQUFFLENBQUMsQ0FBQztNQUFFLE9BQU87S0FBQztJQUFDO0dBQUMsR0FBRSxNQUFJLEdBQUUsTUFBSTtJQUFDLElBQUksSUFBRTtJQUFFLE1BQUksS0FBRztJQUFLLE1BQUksS0FBRztJQUFLLE9BQU87R0FBQyxHQUFFLEtBQUcsTUFBSyxLQUFHLENBQUMsR0FBRSxLQUFHLENBQUMsR0FBRSxLQUFHLEdBQUUsSUFBRSxNQUFLLEtBQUcsQ0FBQyxHQUFFLEtBQUcsQ0FBQyxHQUFFLEtBQUcsQ0FBQyxHQUFFLElBQUUsTUFBSztJQUFDLE9BQUs7SUFBYSxZQUFZLEdBQUU7S0FBQyxLQUFLLEtBQUc7SUFBQztHQUFDLEdBQUUsS0FBRyxNQUFLO0lBQUMsS0FBRyxDQUFDO0lBQUUsT0FBSztJQUFLLElBQUksUUFBTztLQUFDLE9BQU8sS0FBSyxHQUFHO0lBQUs7SUFBQyxJQUFJLE1BQU0sR0FBRTtLQUFDLEtBQUssR0FBRyxRQUFNO0lBQUM7SUFBQyxJQUFJLFdBQVU7S0FBQyxPQUFPLEtBQUssR0FBRztJQUFRO0lBQUMsSUFBSSxTQUFTLEdBQUU7S0FBQyxLQUFLLEdBQUcsV0FBUztJQUFDO0dBQUMsR0FBRSxLQUFHLE1BQUs7SUFBQyxLQUFHLENBQUM7SUFBRSxLQUFHLENBQUM7SUFBRSxLQUFHO0lBQUssWUFBWSxHQUFFLEdBQUUsR0FBRSxHQUFFO0tBQUMsTUFBSTtLQUFLLEtBQUssU0FBTztLQUFFLEtBQUssS0FBRyxFQUFFO0tBQUcsS0FBSyxLQUFHO0tBQUssS0FBSyxPQUFLO0tBQUUsS0FBSyxPQUFLO0tBQUUsS0FBSyxLQUFHO0tBQUUsS0FBSyxLQUFHLEtBQUssS0FBRyxLQUFLLEtBQUcsS0FBSyxJQUFJO0lBQUM7SUFBQyxJQUFJLE9BQU07S0FBQyxPQUFPLFNBQ2hoQixLQUFLLE9BQUs7SUFBSTtJQUFDLElBQUksS0FBSyxHQUFFO0tBQUMsSUFBRSxLQUFLLFFBQU0sTUFBSSxLQUFLLFFBQU07SUFBSTtJQUFDLElBQUksUUFBTztLQUFDLE9BQU8sU0FBTyxLQUFLLE9BQUs7SUFBSTtJQUFDLElBQUksTUFBTSxHQUFFO0tBQUMsSUFBRSxLQUFLLFFBQU0sTUFBSSxLQUFLLFFBQU07SUFBSTtHQUFDO0dBQ3BKLFNBQVMsRUFBRSxHQUFFLElBQUUsQ0FBQyxHQUFFO0lBQUMsSUFBRyxDQUFDLEdBQUUsTUFBTSxJQUFJLEVBQUUsRUFBRTtJQUFFLEVBQUUsT0FBSyxFQUFFLEtBQUcsQ0FBQztJQUFHLFFBQU0sRUFBRSxPQUFPLENBQUMsTUFBSSxJQUFFLE9BQUs7SUFBRyxJQUFJLElBQUU7SUFBRSxHQUFFLE9BQUssS0FBRyxHQUFFLEtBQUk7S0FBQyxJQUFFLEVBQUUsTUFBTSxHQUFHLENBQUMsQ0FBQyxRQUFPLE1BQUcsQ0FBQyxDQUFDLENBQUM7S0FBRSxLQUFJLElBQUksSUFBRSxJQUFHLElBQUUsS0FBSSxJQUFFLEdBQUUsSUFBRSxFQUFFLFFBQU8sS0FBSTtNQUFDLElBQUksSUFBRSxNQUFJLEVBQUUsU0FBTztNQUFFLElBQUcsS0FBRyxFQUFFLFFBQU87TUFBTSxJQUFHLFFBQU0sRUFBRSxJQUFHLElBQUcsU0FBTyxFQUFFLElBQUcsSUFBRyxJQUFFLEdBQUcsQ0FBQyxHQUFFLE1BQUksRUFBRSxRQUFPO09BQUMsSUFBRSxJQUFFLE1BQUksRUFBRSxNQUFNLElBQUUsQ0FBQyxDQUFDLENBQUMsS0FBSyxHQUFHO09BQUU7T0FBSSxTQUFTO01BQUMsT0FBTSxJQUFFLEVBQUU7V0FBVztPQUFDLElBQUUsR0FBRyxJQUFFLE1BQUksRUFBRSxFQUFFO09BQUUsSUFBRztRQUFDLElBQUUsRUFBRSxHQUFFLEVBQUUsRUFBRTtPQUFDLFNBQU8sR0FBRTtRQUFDLElBQUcsT0FBSyxHQUFHLE1BQUksS0FBRyxFQUFFLElBQUcsT0FBTSxFQUFDLE1BQUssRUFBQztRQUFFLE1BQU07T0FBRTtPQUFDLENBQUMsRUFBRSxNQUFJLEtBQUcsQ0FBQyxFQUFFLE9BQUssSUFBRSxFQUFFLEdBQUc7T0FBTSxJQUFHLFdBQVMsRUFBRSxPQUFLLFdBQVMsQ0FBQyxLQUFHLEVBQUUsS0FBSTtRQUFDLElBQUcsQ0FBQyxFQUFFLEdBQUcsSUFBRyxNQUFNLElBQUksRUFBRSxFQUFFO1FBQ2poQixJQUFFLEVBQUUsR0FBRyxHQUFHLENBQUM7UUFBRSxRQUFNLEVBQUUsT0FBTyxDQUFDLE1BQUksSUFBRSxHQUFHLENBQUMsSUFBRSxNQUFJO1FBQUcsSUFBRSxJQUFFLE1BQUksRUFBRSxNQUFNLElBQUUsQ0FBQyxDQUFDLENBQUMsS0FBSyxHQUFHO1FBQUUsU0FBUztPQUFDO01BQUM7S0FBQztLQUFDLE9BQU07TUFBQyxNQUFLO01BQUUsTUFBSztLQUFDO0lBQUM7SUFBQyxNQUFNLElBQUksRUFBRSxFQUFFO0dBQUU7R0FBQyxTQUFTLEdBQUcsR0FBRTtJQUFDLEtBQUksSUFBSSxLQUFJO0tBQUMsSUFBRyxNQUFJLEVBQUUsUUFBTyxPQUFPLElBQUUsRUFBRSxHQUFHLElBQUcsSUFBRSxRQUFNLEVBQUUsRUFBRSxTQUFPLEtBQUcsR0FBRyxFQUFFLEdBQUcsTUFBSSxJQUFFLElBQUU7S0FBRSxJQUFFLElBQUUsR0FBRyxFQUFFLEtBQUssR0FBRyxNQUFJLEVBQUU7S0FBSyxJQUFFLEVBQUU7SUFBTTtHQUFDO0dBQUMsU0FBUyxHQUFHLEdBQUUsR0FBRTtJQUFDLEtBQUksSUFBSSxJQUFFLEdBQUUsSUFBRSxHQUFFLElBQUUsRUFBRSxRQUFPLEtBQUksS0FBRyxLQUFHLEtBQUcsSUFBRSxFQUFFLFdBQVcsQ0FBQyxJQUFFO0lBQUUsUUFBTyxJQUFFLE1BQUksS0FBRyxFQUFFO0dBQU07R0FBQyxTQUFTLEdBQUcsR0FBRTtJQUFDLElBQUksSUFBRSxHQUFHLEVBQUUsT0FBTyxJQUFHLEVBQUUsSUFBSTtJQUFFLElBQUcsRUFBRSxPQUFLLEdBQUUsRUFBRSxLQUFHLEVBQUU7U0FBUSxLQUFJLElBQUUsRUFBRSxJQUFHLElBQUc7S0FBQyxJQUFHLEVBQUUsT0FBSyxHQUFFO01BQUMsRUFBRSxLQUFHLEVBQUU7TUFBRztLQUFLO0tBQUMsSUFBRSxFQUFFO0lBQUU7R0FBQztHQUNoZixTQUFTLEVBQUUsR0FBRSxHQUFFO0lBQUMsSUFBSSxJQUFFLEVBQUUsRUFBRSxJQUFJLEtBQUcsSUFBRSxHQUFHLEdBQUUsR0FBRyxLQUFHLElBQUUsRUFBRSxHQUFHLEtBQUcsSUFBRSxJQUFFO0lBQUcsSUFBRyxHQUFFLE1BQU0sSUFBSSxFQUFFLENBQUM7SUFBRSxLQUFJLElBQUUsRUFBRSxHQUFHLEVBQUUsSUFBRyxDQUFDLElBQUcsR0FBRSxJQUFFLEVBQUUsSUFBRztLQUFDLElBQUksSUFBRSxFQUFFO0tBQUssSUFBRyxFQUFFLE9BQU8sT0FBSyxFQUFFLE1BQUksTUFBSSxHQUFFLE9BQU87SUFBQztJQUFDLE9BQU8sRUFBRSxHQUFHLEdBQUcsR0FBRSxDQUFDO0dBQUM7R0FBQyxTQUFTLEdBQUcsR0FBRSxHQUFFLEdBQUUsR0FBRTtJQUFDLElBQUUsSUFBSSxHQUFHLEdBQUUsR0FBRSxHQUFFLENBQUM7SUFBRSxJQUFFLEdBQUcsRUFBRSxPQUFPLElBQUcsRUFBRSxJQUFJO0lBQUUsRUFBRSxLQUFHLEVBQUU7SUFBRyxPQUFPLEVBQUUsS0FBRztHQUFDO0dBQUMsU0FBUyxFQUFFLEdBQUU7SUFBQyxPQUFPLFdBQVMsSUFBRTtHQUFNO0dBQUMsU0FBUyxHQUFHLEdBQUU7SUFBQyxJQUFJLElBQUU7S0FBQztLQUFJO0tBQUk7SUFBSSxDQUFDLENBQUMsSUFBRTtJQUFHLElBQUUsUUFBTSxLQUFHO0lBQUssT0FBTztHQUFDO0dBQ3hYLFNBQVMsR0FBRyxHQUFFLEdBQUU7SUFBQyxJQUFHLElBQUcsT0FBTztJQUFFLElBQUcsQ0FBQyxFQUFFLFNBQVMsR0FBRyxLQUFHLEVBQUUsT0FBSyxLQUFRO1NBQUEsRUFBRSxTQUFTLEdBQUcsS0FBRyxFQUFFLEVBQUUsT0FBSyxRQUFNLEVBQUUsU0FBUyxHQUFHLEtBQUcsRUFBRSxFQUFFLE9BQUssS0FBSSxPQUFPO0lBQUEsT0FBTyxPQUFPO0lBQUUsT0FBTztHQUFDO0dBQUMsU0FBUyxHQUFHLEdBQUUsR0FBRTtJQUFDLElBQUcsQ0FBQyxFQUFFLEVBQUUsSUFBSSxHQUFFLE9BQU87SUFBRyxJQUFHO0tBQUMsT0FBTyxFQUFFLEdBQUUsQ0FBQyxHQUFFO0lBQUUsU0FBTyxHQUFFLENBQUM7SUFBQyxPQUFPLEdBQUcsR0FBRSxJQUFJO0dBQUM7R0FBQyxTQUFTLEdBQUcsR0FBRSxHQUFFLEdBQUU7SUFBQyxJQUFHO0tBQUMsSUFBSSxJQUFFLEVBQUUsR0FBRSxDQUFDO0lBQUMsU0FBTyxHQUFFO0tBQUMsT0FBTyxFQUFFO0lBQUU7SUFBQyxJQUFHLElBQUUsR0FBRyxHQUFFLElBQUksR0FBRSxPQUFPO0lBQUUsSUFBRyxHQUFFO0tBQUMsSUFBRyxDQUFDLEVBQUUsRUFBRSxJQUFJLEdBQUUsT0FBTztLQUFHLElBQUcsTUFBSSxFQUFFLFVBQVEsUUFBTSxHQUFHLENBQUMsR0FBRSxPQUFPO0lBQUUsT0FBTSxJQUFHLEVBQUUsRUFBRSxJQUFJLEdBQUUsT0FBTztJQUFHLE9BQU87R0FBQztHQUFDLFNBQVMsR0FBRyxHQUFFO0lBQUMsSUFBRyxDQUFDLEdBQUUsTUFBTSxJQUFJLEVBQUUsRUFBRTtJQUFFLE9BQU87R0FBQztHQUNyZSxTQUFTLEVBQUUsR0FBRTtJQUFDLElBQUUsR0FBRztJQUFHLElBQUcsQ0FBQyxHQUFFLE1BQU0sSUFBSSxFQUFFLENBQUM7SUFBRSxPQUFPO0dBQUM7R0FBQyxTQUFTLEdBQUcsR0FBRSxJQUFFLElBQUc7SUFBQyxJQUFFLE9BQU8sT0FBTyxJQUFJLEdBQUMsR0FBRSxDQUFDO0lBQUUsSUFBRyxNQUFJLEdBQUUsR0FBRTtLQUFDLEtBQUksSUFBRSxHQUFFLFFBQU0sR0FBRSxLQUFJLElBQUcsQ0FBQyxHQUFHLElBQUcsTUFBTTtLQUFFLE1BQU0sSUFBSSxFQUFFLEVBQUU7SUFBRTtJQUFDLEVBQUUsS0FBRztJQUFFLE9BQU8sR0FBRyxLQUFHO0dBQUM7R0FBQyxTQUFTLEdBQUcsR0FBRSxJQUFFLElBQUc7SUFBQyxJQUFFLEdBQUcsR0FBRSxDQUFDO0lBQUUsRUFBRSxJQUFJLEtBQUssQ0FBQztJQUFFLE9BQU87R0FBQztHQUFDLFNBQVMsR0FBRyxHQUFFLEdBQUUsR0FBRTtJQUFDLElBQUksSUFBRSxHQUFHLEdBQUc7SUFBRyxJQUFFLElBQUUsSUFBRTtJQUFFLE1BQUksRUFBRSxHQUFHO0lBQUcsR0FBRyxDQUFDO0lBQUUsRUFBRSxHQUFFLENBQUM7R0FBQztHQUFDLElBQUksS0FBRztJQUFDLEtBQUssR0FBRTtLQUFDLEVBQUUsS0FBRyxHQUFHLEVBQUUsS0FBSyxHQUFHLENBQUM7S0FBRyxFQUFFLEdBQUcsT0FBTyxDQUFDO0lBQUM7SUFBRSxLQUFJO0tBQUMsTUFBTSxJQUFJLEVBQUUsRUFBRTtJQUFFO0dBQUM7R0FBRSxTQUFTLEdBQUcsR0FBRSxHQUFFO0lBQUMsR0FBRyxLQUFHLEVBQUMsSUFBRyxFQUFDO0dBQUM7R0FDOVosU0FBUyxHQUFHLEdBQUUsR0FBRTtJQUFDLElBQUksSUFBRSxRQUFNO0lBQUUsSUFBRyxLQUFHLElBQUcsTUFBTSxJQUFJLEVBQUUsRUFBRTtJQUFFLElBQUcsQ0FBQyxLQUFHLEdBQUU7S0FBQyxJQUFJLElBQUUsRUFBRSxHQUFFLEVBQUMsSUFBRyxDQUFDLEVBQUMsQ0FBQztLQUFFLElBQUUsRUFBRTtLQUFLLElBQUUsRUFBRTtLQUFLLElBQUcsRUFBRSxJQUFHLE1BQU0sSUFBSSxFQUFFLEVBQUU7S0FBRSxJQUFHLENBQUMsRUFBRSxFQUFFLElBQUksR0FBRSxNQUFNLElBQUksRUFBRSxFQUFFO0lBQUU7SUFBQyxJQUFFO0tBQUMsTUFBSztLQUFFLElBQUcsQ0FBQztLQUFFLElBQUc7S0FBRSxJQUFHLENBQUM7SUFBQztJQUFFLElBQUUsRUFBRSxHQUFHLENBQUM7SUFBRSxFQUFFLEtBQUc7SUFBRSxFQUFFLE9BQUs7SUFBRSxJQUFFLEtBQUcsSUFBRSxNQUFJLEVBQUUsS0FBRyxHQUFFLEVBQUUsTUFBSSxFQUFFLEdBQUcsR0FBRyxLQUFLLENBQUM7R0FBRTtHQUFDLFNBQVMsR0FBRyxHQUFFLEdBQUUsR0FBRTtJQUFDLElBQUksSUFBRSxFQUFFLEdBQUUsRUFBQyxRQUFPLENBQUMsRUFBQyxDQUFDLENBQUMsQ0FBQztJQUFLLElBQUUsR0FBRyxDQUFDO0lBQUUsSUFBRyxDQUFDLEdBQUUsTUFBTSxJQUFJLEVBQUUsRUFBRTtJQUFFLElBQUcsUUFBTSxLQUFHLFNBQU8sR0FBRSxNQUFNLElBQUksRUFBRSxFQUFFO0lBQUUsSUFBSSxJQUFFLEdBQUcsR0FBRSxDQUFDO0lBQUUsSUFBRyxHQUFFLE1BQU0sSUFBSSxFQUFFLENBQUM7SUFBRSxJQUFHLENBQUMsRUFBRSxHQUFHLElBQUcsTUFBTSxJQUFJLEVBQUUsRUFBRTtJQUFFLE9BQU8sRUFBRSxHQUFHLEdBQUcsR0FBRSxHQUFFLEdBQUUsQ0FBQztHQUFDO0dBQ3BjLFNBQVMsR0FBRyxHQUFFLElBQUUsS0FBSTtJQUFDLE9BQU8sR0FBRyxHQUFFLElBQUUsT0FBSyxPQUFNLENBQUM7R0FBQztHQUFDLFNBQVMsRUFBRSxHQUFFLElBQUUsS0FBSTtJQUFDLE9BQU8sR0FBRyxHQUFFLElBQUUsT0FBSyxPQUFNLENBQUM7R0FBQztHQUFDLFNBQVMsR0FBRyxHQUFFLEdBQUUsR0FBRTtJQUFDLGVBQWEsT0FBTyxNQUFJLElBQUUsR0FBRSxJQUFFO0lBQUssR0FBRyxHQUFFLElBQUUsTUFBSyxDQUFDO0dBQUM7R0FBQyxTQUFTLEdBQUcsR0FBRSxHQUFFO0lBQUMsSUFBRyxDQUFDLEdBQUcsQ0FBQyxHQUFFLE1BQU0sSUFBSSxFQUFFLEVBQUU7SUFBRSxJQUFJLElBQUUsRUFBRSxHQUFFLEVBQUMsUUFBTyxDQUFDLEVBQUMsQ0FBQyxDQUFDLENBQUM7SUFBSyxJQUFHLENBQUMsR0FBRSxNQUFNLElBQUksRUFBRSxFQUFFO0lBQUUsSUFBRSxHQUFHLENBQUM7SUFBRSxJQUFJLElBQUUsR0FBRyxHQUFFLENBQUM7SUFBRSxJQUFHLEdBQUUsTUFBTSxJQUFJLEVBQUUsQ0FBQztJQUFFLElBQUcsQ0FBQyxFQUFFLEdBQUcsSUFBRyxNQUFNLElBQUksRUFBRSxFQUFFO0lBQUUsRUFBRSxHQUFHLEdBQUcsR0FBRSxHQUFFLENBQUM7R0FBQztHQUN2VixTQUFTLEdBQUcsR0FBRTtJQUFDLElBQUksSUFBRSxFQUFFLEdBQUUsRUFBQyxRQUFPLENBQUMsRUFBQyxDQUFDLENBQUMsQ0FBQztJQUFLLElBQUUsR0FBRyxDQUFDO0lBQUUsSUFBSSxJQUFFLEVBQUUsR0FBRSxDQUFDLEdBQUUsSUFBRSxHQUFHLEdBQUUsR0FBRSxDQUFDLENBQUM7SUFBRSxJQUFHLEdBQUUsTUFBTSxJQUFJLEVBQUUsQ0FBQztJQUFFLElBQUcsQ0FBQyxFQUFFLEdBQUcsSUFBRyxNQUFNLElBQUksRUFBRSxFQUFFO0lBQUUsSUFBRyxFQUFFLElBQUcsTUFBTSxJQUFJLEVBQUUsRUFBRTtJQUFFLEVBQUUsR0FBRyxHQUFHLEdBQUUsQ0FBQztJQUFFLEdBQUcsQ0FBQztHQUFDO0dBQUMsU0FBUyxHQUFHLEdBQUU7SUFBQyxJQUFJLElBQUUsRUFBRSxHQUFFLEVBQUMsUUFBTyxDQUFDLEVBQUMsQ0FBQyxDQUFDLENBQUM7SUFBSyxJQUFHLENBQUMsR0FBRSxNQUFNLElBQUksRUFBRSxFQUFFO0lBQUUsSUFBRSxHQUFHLENBQUM7SUFBRSxJQUFJLElBQUUsRUFBRSxHQUFFLENBQUMsR0FBRSxJQUFFLEdBQUcsR0FBRSxHQUFFLENBQUMsQ0FBQztJQUFFLElBQUcsR0FBRSxNQUFNLElBQUksRUFBRSxDQUFDO0lBQUUsSUFBRyxDQUFDLEVBQUUsR0FBRyxJQUFHLE1BQU0sSUFBSSxFQUFFLEVBQUU7SUFBRSxJQUFHLEVBQUUsSUFBRyxNQUFNLElBQUksRUFBRSxFQUFFO0lBQUUsRUFBRSxHQUFHLEdBQUcsR0FBRSxDQUFDO0lBQUUsR0FBRyxDQUFDO0dBQUM7R0FBQyxTQUFTLEdBQUcsR0FBRSxHQUFFO0lBQUMsSUFBRSxFQUFFLEdBQUUsRUFBQyxJQUFHLENBQUMsRUFBQyxDQUFDLENBQUMsQ0FBQztJQUFLLE9BQU8sR0FBRyxFQUFFLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQztHQUFDO0dBQUMsU0FBUyxHQUFHLEdBQUUsR0FBRSxHQUFFLEdBQUU7SUFBQyxHQUFHLEdBQUUsR0FBRTtLQUFDLE1BQUssSUFBRSxPQUFLLEVBQUUsT0FBSztLQUFNLElBQUcsS0FBSyxJQUFJO0tBQUUsSUFBRztJQUFDLENBQUM7R0FBQztHQUMzZSxTQUFTLEdBQUcsR0FBRSxHQUFFO0lBQUMsSUFBRSxZQUFVLE9BQU8sSUFBRSxFQUFFLEdBQUUsRUFBQyxJQUFHLENBQUMsRUFBQyxDQUFDLENBQUMsQ0FBQyxPQUFLO0lBQUUsR0FBRyxNQUFLLEdBQUUsQ0FBQztHQUFDO0dBQUMsU0FBUyxHQUFHLEdBQUUsR0FBRSxHQUFFO0lBQUMsSUFBRyxFQUFFLEVBQUUsSUFBSSxHQUFFLE1BQU0sSUFBSSxFQUFFLEVBQUU7SUFBRSxJQUFHLFdBQVMsRUFBRSxPQUFLLFFBQU8sTUFBTSxJQUFJLEVBQUUsRUFBRTtJQUFFLElBQUksSUFBRSxHQUFHLEdBQUUsR0FBRztJQUFFLElBQUcsR0FBRSxNQUFNLElBQUksRUFBRSxDQUFDO0lBQUUsR0FBRyxHQUFFLEdBQUU7S0FBQyxNQUFLO0tBQUUsV0FBVSxLQUFLLElBQUk7SUFBQyxDQUFDO0dBQUM7R0FDMU8sU0FBUyxHQUFHLEdBQUUsR0FBRSxJQUFFLEtBQUk7SUFBQyxJQUFHLE9BQUssR0FBRSxNQUFNLElBQUksRUFBRSxFQUFFO0lBQUUsSUFBRyxZQUFVLE9BQU8sR0FBRTtLQUFDLElBQUksSUFBRTtNQUFDLEdBQUU7TUFBRSxNQUFLO01BQUUsR0FBRTtNQUFJLE1BQUs7TUFBSSxHQUFFO01BQUssTUFBSztLQUFJLEVBQUU7S0FBRyxJQUFHLGVBQWEsT0FBTyxHQUFFLE1BQU0sTUFBTSwyQkFBMkIsR0FBRztLQUFFLElBQUU7SUFBQztJQUFDLElBQUUsSUFBRSxLQUFHLElBQUUsT0FBSyxRQUFNO0lBQUUsSUFBRyxZQUFVLE9BQU8sR0FBRSxJQUFFO1NBQU07S0FBQyxJQUFJLElBQUUsRUFBRSxTQUFTLEdBQUc7S0FBRSxJQUFFLEVBQUUsR0FBRTtNQUFDLElBQUcsRUFBRSxJQUFFO01BQVEsSUFBRyxDQUFDO0tBQUMsQ0FBQztLQUFFLElBQUUsRUFBRTtLQUFLLElBQUUsRUFBRTtJQUFJO0lBQUMsSUFBSSxJQUFFLENBQUM7SUFBRSxJQUFHLElBQUUsSUFBRyxJQUFHLEdBQU07U0FBQSxJQUFFLEtBQUksTUFBTSxJQUFJLEVBQUUsRUFBRTtJQUFBLE9BQU87S0FBQyxJQUFHLEdBQUUsTUFBTSxJQUFJLEVBQUUsRUFBRTtLQUFFLElBQUUsR0FBRyxHQUFFLElBQUUsS0FBSSxDQUFDO0tBQUUsSUFBRSxDQUFDO0lBQUM7SUFBQyxJQUFHLENBQUMsR0FBRSxNQUFNLElBQUksRUFBRSxFQUFFO0lBQUUsVUFBUSxFQUFFLE9BQUssV0FBUyxLQUFHO0lBQU0sSUFBRyxJQUFFLFNBQU8sQ0FBQyxFQUFFLEVBQUUsSUFBSSxHQUFFLE1BQU0sSUFBSSxFQUFFLEVBQUU7SUFDOWYsSUFBRyxDQUFDLE1BQUksSUFBRSxJQUFFLFdBQVMsRUFBRSxPQUFLLFNBQU8sS0FBRyxFQUFFLEVBQUUsSUFBSSxNQUFJLFFBQU0sR0FBRyxDQUFDLEtBQUcsSUFBRSxPQUFLLEtBQUcsR0FBRyxHQUFFLEdBQUcsQ0FBQyxDQUFDLElBQUUsS0FBSSxNQUFNLElBQUksRUFBRSxDQUFDO0lBQUUsSUFBRSxPQUFLLENBQUMsTUFBSSxJQUFFLEdBQUUsSUFBRSxZQUFVLE9BQU8sSUFBRSxFQUFFLEdBQUUsRUFBQyxJQUFHLENBQUMsRUFBQyxDQUFDLENBQUMsQ0FBQyxPQUFLLEdBQUUsR0FBRyxNQUFLLEdBQUUsQ0FBQztJQUFHLEtBQUc7SUFBUSxJQUFFLEdBQUc7S0FBQyxNQUFLO0tBQUUsTUFBSyxHQUFHLENBQUM7S0FBRSxPQUFNO0tBQUUsVUFBUyxDQUFDO0tBQUUsVUFBUztLQUFFLElBQUcsRUFBRTtLQUFHLElBQUcsQ0FBQztLQUFFLE9BQU0sQ0FBQztJQUFDLENBQUM7SUFBRSxFQUFFLEdBQUcsUUFBTSxFQUFFLEdBQUcsS0FBSyxDQUFDO0lBQUUsS0FBRyxHQUFHLEdBQUUsSUFBRSxHQUFHO0lBQUUsQ0FBQyxFQUFFLGdCQUFjLElBQUUsS0FBRyxLQUFLLE9BQUssR0FBRyxLQUFHO0lBQUcsT0FBTztHQUFDO0dBQUMsU0FBUyxHQUFHLEdBQUU7SUFBQyxJQUFHLFNBQU8sRUFBRSxJQUFHLE1BQU0sSUFBSSxFQUFFLENBQUM7SUFBRSxFQUFFLE9BQUssRUFBRSxLQUFHO0lBQU0sSUFBRztLQUFDLEVBQUUsR0FBRyxTQUFPLEVBQUUsR0FBRyxNQUFNLENBQUM7SUFBQyxTQUFPLEdBQUU7S0FBQyxNQUFNO0lBQUUsVUFBUTtLQUFDLEdBQUcsRUFBRSxNQUFJO0lBQUk7SUFBQyxFQUFFLEtBQUc7R0FBSTtHQUNqZixTQUFTLEdBQUcsR0FBRSxHQUFFLEdBQUU7SUFBQyxJQUFHLFNBQU8sRUFBRSxJQUFHLE1BQU0sSUFBSSxFQUFFLENBQUM7SUFBRSxJQUFHLENBQUMsRUFBRSxZQUFVLENBQUMsRUFBRSxHQUFHLElBQUcsTUFBTSxJQUFJLEVBQUUsRUFBRTtJQUFFLElBQUcsS0FBRyxLQUFHLEtBQUcsS0FBRyxLQUFHLEdBQUUsTUFBTSxJQUFJLEVBQUUsRUFBRTtJQUFFLEVBQUUsV0FBUyxFQUFFLEdBQUcsR0FBRyxHQUFFLEdBQUUsQ0FBQztJQUFFLEVBQUUsS0FBRyxDQUFDO0dBQUM7R0FBQyxTQUFTLEdBQUcsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFO0lBQUMsSUFBRyxJQUFFLEtBQUcsSUFBRSxHQUFFLE1BQU0sSUFBSSxFQUFFLEVBQUU7SUFBRSxJQUFHLFNBQU8sRUFBRSxJQUFHLE1BQU0sSUFBSSxFQUFFLENBQUM7SUFBRSxJQUFHLE9BQUssRUFBRSxRQUFNLFVBQVMsTUFBTSxJQUFJLEVBQUUsQ0FBQztJQUFFLElBQUcsRUFBRSxFQUFFLEtBQUssSUFBSSxHQUFFLE1BQU0sSUFBSSxFQUFFLEVBQUU7SUFBRSxJQUFHLENBQUMsRUFBRSxHQUFHLE1BQUssTUFBTSxJQUFJLEVBQUUsRUFBRTtJQUFFLElBQUksSUFBRSxlQUFhLE9BQU87SUFBRSxJQUFHLENBQUMsR0FBRSxJQUFFLEVBQUU7U0FBYyxJQUFHLENBQUMsRUFBRSxVQUFTLE1BQU0sSUFBSSxFQUFFLEVBQUU7SUFBRSxJQUFFLEVBQUUsR0FBRyxLQUFLLEdBQUUsR0FBRSxHQUFFLEdBQUUsQ0FBQztJQUFFLE1BQUksRUFBRSxZQUFVO0lBQUcsT0FBTztHQUFDO0dBQzlkLFNBQVMsR0FBRyxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUU7SUFBQyxJQUFHLElBQUUsS0FBRyxJQUFFLEdBQUUsTUFBTSxJQUFJLEVBQUUsRUFBRTtJQUFFLElBQUcsU0FBTyxFQUFFLElBQUcsTUFBTSxJQUFJLEVBQUUsQ0FBQztJQUFFLElBQUcsT0FBSyxFQUFFLFFBQU0sVUFBUyxNQUFNLElBQUksRUFBRSxDQUFDO0lBQUUsSUFBRyxFQUFFLEVBQUUsS0FBSyxJQUFJLEdBQUUsTUFBTSxJQUFJLEVBQUUsRUFBRTtJQUFFLElBQUcsQ0FBQyxFQUFFLEdBQUcsT0FBTSxNQUFNLElBQUksRUFBRSxFQUFFO0lBQUUsRUFBRSxZQUFVLEVBQUUsUUFBTSxRQUFNLEdBQUcsR0FBRSxHQUFFLENBQUM7SUFBRSxJQUFJLElBQUUsZUFBYSxPQUFPO0lBQUUsSUFBRyxDQUFDLEdBQUUsSUFBRSxFQUFFO1NBQWMsSUFBRyxDQUFDLEVBQUUsVUFBUyxNQUFNLElBQUksRUFBRSxFQUFFO0lBQUUsSUFBRSxFQUFFLEdBQUcsTUFBTSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsS0FBSyxDQUFDO0lBQUUsTUFBSSxFQUFFLFlBQVU7SUFBRyxPQUFPO0dBQUM7R0FDM1csU0FBUyxHQUFHLEdBQUU7SUFBQyxJQUFJLElBQUUsS0FBRztJQUFFLElBQUksSUFBRTtJQUFTLFdBQVMsS0FBRyxhQUFXLEtBQUcsR0FBRywwQkFBMEIsRUFBRSxFQUFFO0lBQUUsSUFBRSxHQUFHLEdBQUUsQ0FBQztJQUFFLElBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQztJQUFLLElBQUksSUFBRSxJQUFJLFdBQVcsQ0FBQztJQUFFLEdBQUcsR0FBRSxHQUFFLEdBQUUsR0FBRSxDQUFDO0lBQUUsV0FBUyxNQUFJLElBQUUsR0FBRyxDQUFDO0lBQUcsR0FBRyxDQUFDO0lBQUUsT0FBTztHQUFDO0dBQ3ZNLFNBQVMsRUFBRSxHQUFFLEdBQUUsR0FBRTtJQUFDLElBQUUsR0FBRyxVQUFRLENBQUM7SUFBRSxJQUFJLElBQUUsR0FBRyxDQUFDLENBQUMsR0FBRSxDQUFDLENBQUMsQ0FBQztJQUFFLEVBQUUsT0FBSyxFQUFFLEtBQUc7SUFBSSxJQUFJLElBQUUsRUFBRSxRQUFNLElBQUU7SUFBRSxHQUFHLEdBQUU7S0FBQyxLQUFLLEdBQUU7TUFBQyxFQUFFLFdBQVMsQ0FBQztLQUFDO0tBQUUsUUFBTztNQUFDLEdBQUcsUUFBUSxVQUFRLEVBQUUsRUFBRTtLQUFDO0tBQUUsS0FBSyxHQUFFLEdBQUUsR0FBRSxHQUFFO01BQUMsS0FBSSxJQUFJLElBQUUsR0FBRSxJQUFFLEdBQUUsSUFBRSxHQUFFLEtBQUk7T0FBQyxJQUFHO1FBQUMsSUFBSSxJQUFFLEVBQUU7T0FBQyxTQUFPLElBQUc7UUFBQyxNQUFNLElBQUksRUFBRSxFQUFFO09BQUU7T0FBQyxJQUFHLEtBQUssTUFBSSxLQUFHLE1BQUksR0FBRSxNQUFNLElBQUksRUFBRSxDQUFDO09BQUUsSUFBRyxTQUFPLEtBQUcsS0FBSyxNQUFJLEdBQUU7T0FBTTtPQUFJLEVBQUUsSUFBRSxLQUFHO01BQUM7TUFBQyxNQUFJLEVBQUUsS0FBSyxLQUFHLEtBQUssSUFBSTtNQUFHLE9BQU87S0FBQztLQUFFLE1BQU0sR0FBRSxHQUFFLEdBQUUsR0FBRTtNQUFDLEtBQUksSUFBSSxJQUFFLEdBQUUsSUFBRSxHQUFFLEtBQUksSUFBRztPQUFDLEVBQUUsRUFBRSxJQUFFLEVBQUU7TUFBQyxTQUFPLEdBQUU7T0FBQyxNQUFNLElBQUksRUFBRSxFQUFFO01BQUU7TUFBQyxNQUFJLEVBQUUsS0FBSyxLQUFHLEVBQUUsS0FBSyxLQUFHLEtBQUssSUFBSTtNQUFHLE9BQU87S0FBQztJQUFDLENBQUM7SUFBRSxHQUFHLEdBQUUsR0FBRSxDQUFDO0dBQUM7R0FBQyxJQUFJLElBQUUsQ0FBQztHQUNwZSxTQUFTLEVBQUUsR0FBRSxHQUFFLEdBQUU7SUFBQyxJQUFHLFFBQU0sRUFBRSxPQUFPLENBQUMsR0FBRSxPQUFPO0lBQUUsSUFBRSxTQUFPLElBQUUsTUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDO0lBQUssSUFBRyxLQUFHLEVBQUUsUUFBTztLQUFDLElBQUcsQ0FBQyxHQUFFLE1BQU0sSUFBSSxFQUFFLEVBQUU7S0FBRSxPQUFPO0lBQUM7SUFBQyxPQUFPLElBQUUsTUFBSTtHQUFDO0dBQ3RJLFNBQVMsR0FBRyxHQUFFLEdBQUU7SUFBQyxFQUFFLEtBQUcsS0FBRyxFQUFFO0lBQUcsRUFBRSxJQUFFLEtBQUcsS0FBRyxFQUFFO0lBQUssRUFBRSxJQUFFLEtBQUcsS0FBRyxFQUFFO0lBQUcsRUFBRSxJQUFFLE1BQUksS0FBRyxFQUFFO0lBQUksRUFBRSxJQUFFLE1BQUksS0FBRyxFQUFFO0lBQUcsRUFBRSxJQUFFLE1BQUksS0FBRyxFQUFFO0lBQUcsRUFBRSxJQUFFLE1BQUksS0FBRyxPQUFPLEVBQUUsSUFBSTtJQUFFLEVBQUUsSUFBRSxNQUFJLEtBQUc7SUFBSyxFQUFFLElBQUUsTUFBSSxLQUFHLEVBQUU7SUFBRyxJQUFJLElBQUUsRUFBRSxHQUFHLFFBQVEsR0FBRSxJQUFFLEVBQUUsR0FBRyxRQUFRLEdBQUUsSUFBRSxFQUFFLEdBQUcsUUFBUTtJQUFFLEVBQUUsSUFBRSxNQUFJLEtBQUcsT0FBTyxLQUFLLE1BQU0sSUFBRSxHQUFHLENBQUM7SUFBRSxFQUFFLElBQUUsTUFBSSxLQUFHLElBQUUsTUFBSTtJQUFJLEVBQUUsSUFBRSxNQUFJLEtBQUcsT0FBTyxLQUFLLE1BQU0sSUFBRSxHQUFHLENBQUM7SUFBRSxFQUFFLElBQUUsTUFBSSxLQUFHLElBQUUsTUFBSTtJQUFJLEVBQUUsSUFBRSxNQUFJLEtBQUcsT0FBTyxLQUFLLE1BQU0sSUFBRSxHQUFHLENBQUM7SUFBRSxFQUFFLElBQUUsTUFBSSxLQUFHLElBQUUsTUFBSTtJQUFJLEVBQUUsSUFBRSxNQUFJLEtBQUcsT0FBTyxFQUFFLEVBQUU7SUFBRSxPQUFPO0dBQUM7R0FDOWEsSUFBSSxLQUFHLEtBQUssR0FBRSxXQUFPO0lBQUMsSUFBSSxJQUFFLEVBQUUsQ0FBQyxNQUFJO0lBQUcsTUFBSTtJQUFFLE9BQU87R0FBQyxHQUFFLEtBQUcsR0FBRSxLQUFHO0lBQUM7SUFBRTtJQUFHO0lBQUc7SUFBRztJQUFJO0lBQUk7SUFBSTtJQUFJO0lBQUk7SUFBSTtJQUFJO0dBQUcsR0FBRSxLQUFHO0lBQUM7SUFBRTtJQUFHO0lBQUc7SUFBRztJQUFJO0lBQUk7SUFBSTtJQUFJO0lBQUk7SUFBSTtJQUFJO0dBQUcsR0FBRSxLQUFHLENBQUMsR0FBRSxNQUFHLE1BQUc7SUFBQyxJQUFHLEVBQUUsYUFBYSxNQUFJLFlBQVUsSUFBRyxNQUFNO0dBQUUsR0FBRSxNQUFHLE1BQUc7SUFBQyxLQUFHO0lBQUUsTUFBSSxJQUFFLE9BQUssRUFBRSxTQUFTLENBQUMsR0FBRSxLQUFHLENBQUM7SUFBRyxNQUFNLElBQUksR0FBRyxDQUFDO0dBQUUsR0FBRSxNQUFHLE1BQUc7SUFBQyxJQUFHLENBQUMsSUFBRyxJQUFHO0tBQUMsRUFBRTtJQUFDLFNBQU8sR0FBRTtLQUFDLEdBQUcsQ0FBQztJQUFDLFVBQVE7S0FBQyxJQUFHLEVBQUUsTUFBSSxJQUFFLEtBQUksSUFBRztNQUFDLEtBQUcsSUFBRSxJQUFHLEdBQUcsQ0FBQztLQUFDLFNBQU8sR0FBRTtNQUFDLEdBQUcsQ0FBQztLQUFDO0lBQUM7R0FBQyxHQUFFLEtBQUcsQ0FBQyxHQUFFLFdBQU87SUFBQyxJQUFHLENBQUMsSUFBRztLQUFDLElBQUksSUFBRTtNQUFDLE1BQUs7TUFBVyxTQUFRO01BQVcsTUFBSztNQUFJLEtBQUk7TUFBSSxNQUFLO01BQWlCLE9BQU0sV0FBVyxXQUFXLFlBQ3RmLEtBQUssUUFBUSxLQUFJLEdBQUcsSUFBRTtNQUFTLEdBQUUsTUFBSTtLQUFnQixHQUFFO0tBQUUsS0FBSSxLQUFLLElBQUcsS0FBSyxNQUFJLEdBQUcsS0FBRyxPQUFPLEVBQUUsS0FBRyxFQUFFLEtBQUcsR0FBRztLQUFHLElBQUksSUFBRSxDQUFDO0tBQUUsS0FBSSxLQUFLLEdBQUUsRUFBRSxLQUFLLEdBQUcsRUFBRSxHQUFHLEVBQUUsSUFBSTtLQUFFLEtBQUc7SUFBQztJQUFDLE9BQU87R0FBRSxHQUFFLElBQUcsTUFBSSxHQUFFLEdBQUUsR0FBRSxNQUFJO0lBQUMsSUFBSSxJQUFFO0tBQUMsU0FBTyxNQUFHO01BQUMsSUFBSSxJQUFFO01BQUUsSUFBRyxTQUFPLEtBQUcsS0FBSyxNQUFJLEtBQUcsTUFBSSxHQUFFO09BQUMsSUFBRSxHQUFHLENBQUMsSUFBRTtPQUFFLElBQUksSUFBRSxFQUFFLENBQUM7T0FBRSxFQUFFLEdBQUUsR0FBRSxHQUFFLENBQUM7T0FBRSxJQUFFO01BQUM7TUFBQyxPQUFPO0tBQUM7S0FBRSxRQUFNLE1BQUc7TUFBQyxJQUFJLElBQUUsRUFBRSxFQUFFLE1BQU07TUFBRSxFQUFFLElBQUksR0FBRSxDQUFDO01BQUUsT0FBTztLQUFDO0lBQUM7SUFBRSxJQUFFLEVBQUUsTUFBSTtJQUFHLElBQUksSUFBRSxDQUFDLEdBQUUsSUFBRTtJQUFFLElBQUcsR0FBRSxLQUFJLElBQUksSUFBRSxHQUFFLElBQUUsRUFBRSxRQUFPLEtBQUk7S0FBQyxJQUFJLElBQUUsRUFBRSxFQUFFO0tBQUksS0FBRyxNQUFJLE1BQUksSUFBRSxHQUFHLElBQUcsRUFBRSxLQUFHLEVBQUUsRUFBRSxFQUFFLEtBQUcsRUFBRSxLQUFHLEVBQUU7SUFBRTtJQUFDLElBQUUsRUFBRSxHQUFHLENBQUM7SUFBRSxPQUFPLElBQUUsU0FBUyxHQUFFO0tBQUMsTUFBSSxLQUFHLEdBQUcsQ0FBQztLQUFFLE9BQU0sYUFDdGYsSUFBRSxFQUFFLENBQUMsSUFBRSxjQUFZLElBQUUsQ0FBQyxDQUFDLElBQUU7SUFBQyxFQUFFLENBQUM7R0FBQyxHQUFFLE1BQUcsTUFBRztJQUFDLElBQUksSUFBRSxHQUFHLENBQUMsSUFBRSxHQUFFLElBQUUsR0FBRyxDQUFDO0lBQUUsS0FBRyxFQUFFLEdBQUUsR0FBRSxHQUFFLENBQUM7SUFBRSxPQUFPO0dBQUMsR0FBRSxJQUFHLEtBQUcsQ0FBQyxHQUFFLEtBQUUsTUFBRztJQUFDLEdBQUcsT0FBTyxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQUUsRUFBRSxJQUFJLEdBQUUsSUFBSTtJQUFFLEdBQUcsS0FBSyxDQUFDO0dBQUMsR0FBRSxNQUFHLE1BQUc7SUFBQyxNQUFNLElBQUUsRUFBRTtJQUFPLE9BQU07S0FBQyxJQUFFLE1BQUk7S0FBSSxLQUFHO0tBQUUsR0FBRztJQUFDO0dBQUMsR0FBRSxLQUFHO0lBQUMsR0FBRTtJQUFJLEdBQUU7SUFBSSxHQUFFO0lBQUksR0FBRTtJQUFJLEdBQUU7SUFBSSxHQUFFO0dBQUcsR0FBRSxNQUFHLE1BQUcsR0FBRyxNQUFNLEtBQUssSUFBRSxNQUFHLEdBQUcsRUFBRSxDQUFDLEdBQUUsTUFBSSxHQUFFLE1BQUk7SUFBQyxJQUFHLENBQUMsSUFBRztLQUFDLHFCQUFHLElBQUksUUFBTTtLQUFFLElBQUksSUFBRSxFQUFFO0tBQU8sSUFBRyxJQUFHLEtBQUksSUFBSSxJQUFFLEdBQUUsSUFBRSxJQUFFLEdBQUUsS0FBSTtNQUFDLElBQUksSUFBRSxFQUFFLElBQUksQ0FBQztNQUFFLEtBQUcsR0FBRyxJQUFJLEdBQUUsQ0FBQztLQUFDO0lBQUM7SUFBQyxJQUFHLElBQUUsR0FBRyxJQUFJLENBQUMsS0FBRyxHQUFFLE9BQU87SUFBRSxJQUFFLEdBQUcsU0FBTyxHQUFHLElBQUksSUFBRSxFQUFFLEtBQUssQ0FBQztJQUFFLElBQUc7S0FBQyxFQUFFLElBQUksR0FBRSxDQUFDO0lBQUMsU0FBTyxHQUFFO0tBQUMsSUFBRyxFQUFFLGFBQWEsWUFBVyxNQUFNO0tBQ25mLElBQUUsV0FBVyxHQUFHLEdBQUUsSUFBRyxLQUFJLEtBQUksR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUcsR0FBRztNQUFDO01BQUU7TUFBRyxHQUFHLEdBQUcsRUFBRSxNQUFNLENBQUMsQ0FBQztNQUFFLEdBQUcsR0FBRyxRQUFNLEVBQUUsS0FBRyxLQUFHLEVBQUUsRUFBRTtLQUFDLENBQUMsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEtBQUksR0FBRSxLQUFJLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEtBQUksR0FBRSxDQUFDO0tBQUUsSUFBRSxJQUFJLFlBQVksT0FBTyxDQUFDO0tBQUUsSUFBRyxJQUFJLFlBQVksU0FBUyxHQUFFLEVBQUMsR0FBRSxFQUFDLEdBQUUsRUFBQyxFQUFDLENBQUMsQ0FBQyxDQUFFLFFBQVE7S0FBRSxFQUFFLElBQUksR0FBRSxDQUFDO0lBQUM7SUFBQyxHQUFHLElBQUksR0FBRSxDQUFDO0lBQUUsT0FBTztHQUFDO0dBQUUsSUFBRSxNQUFNLElBQUk7R0FBRSxHQUFHLEdBQUUsR0FBRztHQUFFLEVBQUUsTUFBTTtHQUFFLEVBQUUsT0FBTztHQUFFLEVBQUUsZ0JBQWdCO0dBQ3hULENBQUMsV0FBVTtJQUFDLEVBQUUsTUFBTTtJQUFFLEdBQUcsS0FBSTtLQUFDLFlBQVM7S0FBRSxRQUFPLEdBQUUsR0FBRSxHQUFFLE1BQUk7S0FBRSxVQUFPO0lBQUMsQ0FBQztJQUFFLEdBQUcsYUFBWSxHQUFHO0lBQUUsR0FBRyxNQUFLLEVBQUU7SUFBRSxHQUFHLE1BQUssRUFBRTtJQUFFLEdBQUcsWUFBVyxJQUFJO0lBQUUsR0FBRyxhQUFZLElBQUk7SUFBRSxJQUFJLG9CQUFFLElBQUksV0FBVyxJQUFJLEdBQUUsSUFBRSxHQUFFLFVBQU07S0FBQyxNQUFJLE1BQUksR0FBRyxDQUFDLEdBQUUsSUFBRSxFQUFFO0tBQVksT0FBTyxFQUFFLEVBQUU7SUFBRTtJQUFFLEVBQUUsVUFBUyxDQUFDO0lBQUUsRUFBRSxXQUFVLENBQUM7SUFBRSxFQUFFLFVBQVU7SUFBRSxFQUFFLGNBQWM7R0FBQyxHQUFHO0dBQzlTLENBQUMsV0FBVTtJQUFDLEVBQUUsT0FBTztJQUFFLElBQUksSUFBRSxFQUFFLFlBQVk7SUFBRSxFQUFFLGVBQWU7SUFBRSxHQUFHLEVBQUMsS0FBSTtLQUFDLElBQUksSUFBRSxHQUFHLEdBQUUsTUFBSyxPQUFNLEVBQUU7S0FBRSxFQUFFLEtBQUcsRUFBQyxJQUFHLEVBQUUsR0FBRyxHQUFFO0tBQUUsRUFBRSxLQUFHO01BQUMsR0FBRyxHQUFFLEdBQUU7T0FBQyxJQUFFLENBQUM7T0FBRSxJQUFJLElBQUUsRUFBRSxDQUFDO09BQUUsSUFBRTtRQUFDLFFBQU87UUFBSyxJQUFHLEVBQUMsSUFBRyxPQUFNO1FBQUUsSUFBRyxFQUFDLFVBQU8sRUFBRSxLQUFJO1FBQUUs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QUFFO09BQUMsS0FBRyxLQUFLLElBQUksWUFBVyxRQUFNLEtBQUssS0FBSyxLQUFLLElBQUksR0FBRSxDQUFDLElBQUUsS0FBSyxDQUFDLElBQUUsR0FBRyxPQUFPLGFBQzllLFNBQU8sUUFBTTtPQUFFLElBQUc7UUFBQyxHQUFHLEtBQUssQ0FBQztRQUFFLEdBQUc7UUFBRSxJQUFJLElBQUU7UUFBRSxNQUFNO09BQUMsU0FBTyxHQUFFLENBQUM7T0FBQyxJQUFFLEtBQUs7TUFBQztNQUFDLElBQUcsR0FBRSxPQUFNLENBQUM7S0FBQztLQUFDLE9BQU0sQ0FBQztJQUFDO0lBQUUsSUFBRyxHQUFFLE1BQUk7S0FBQyxJQUFJLElBQUUsR0FBRSxJQUFFLEdBQUU7S0FBRSxLQUFJLEtBQUssR0FBRyxHQUFFO01BQUMsSUFBSSxJQUFFLElBQUU7TUFBRSxFQUFFLElBQUUsS0FBRyxLQUFHO01BQUUsS0FBRyxFQUFFLEdBQUUsR0FBRSxHQUFFLFFBQVEsSUFBRTtNQUFFLEtBQUc7S0FBQztLQUFDLE9BQU87SUFBQztJQUFFLElBQUcsR0FBRSxNQUFJO0tBQUMsSUFBSSxJQUFFLEdBQUc7S0FBRSxFQUFFLEtBQUcsS0FBRyxFQUFFO0tBQU8sSUFBRTtLQUFFLEtBQUksSUFBSSxLQUFLLEdBQUUsS0FBRyxHQUFHLENBQUMsSUFBRTtLQUFFLEVBQUUsS0FBRyxLQUFHO0tBQUUsT0FBTztJQUFDO0lBQUUsR0FBRSxTQUFTLEdBQUU7S0FBQyxJQUFHO01BQVksR0FBTCxFQUFFLENBQU0sQ0FBQztNQUFFLE9BQU87S0FBQyxTQUFPLEdBQUU7TUFBQyxJQUFHLGVBQWEsT0FBTyxLQUFHLGlCQUFlLEVBQUUsTUFBSyxNQUFNO01BQUUsT0FBTyxFQUFFO0tBQUU7SUFBQztJQUFFLEdBQUUsU0FBUyxHQUFFLEdBQUU7S0FBQyxJQUFHO01BQUMsSUFBSSxJQUFFLEVBQUUsQ0FBQztNQUFFLEVBQUUsS0FBRyxFQUFFLEtBQUcsSUFBRSxFQUFFLEVBQUUsSUFBSSxJQUFFLElBQUUsV0FBUyxFQUFFLE9BQUssU0FBTyxJQUFF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USxFQUFFO0tBQUcsS0FBRyxFQUFFLFFBQU0sRUFBRTtLQUFHLEVBQUUsOEJBQTRCLEVBQUU7S0FBRyxLQUFHLEVBQUU7S0FBRyxLQUFHLEVBQUU7S0FBRyxLQUFHLEVBQUU7S0FBRyxJQUFFLEVBQUU7S0FBRyxLQUFHLEVBQUU7S0FBRyxLQUFHLEVBQUU7S0FBRSxJQUFFLEVBQUU7S0FBRSxHQUFHO0tBQUU7S0FBSSxFQUFFLHlCQUF5QixDQUFDO0tBQUUsS0FBRyxLQUFHLE9BQUssSUFBRSxJQUFHLEtBQUcsTUFBSyxFQUFFO0tBQUcsT0FBTztJQUFFO0lBQUM7SUFBSSxFQUFFLHlCQUF5QixDQUFDO0lBQUUsSUFBSSxJQUFFLEVBQUMsR0FBRSxHQUFFO0lBQUUsSUFBRyxFQUFFLGlCQUFnQixPQUFPLElBQUksU0FBUSxNQUFHO0tBQUMsRUFBRSxnQkFBZ0IsSUFBRyxHQUFFLE1BQUk7TUFBQyxFQUFFLEVBQUUsR0FBRSxDQUFDLENBQUM7S0FBQyxDQUFDO0lBQUMsQ0FBQztJQUNuZixPQUFLLEVBQUUsYUFBVyxFQUFFLFdBQVcseUJBQXdCLEVBQUUsSUFBRSxLQUFHO0lBQXdCLE9BQU8sR0FBRyxNQUFNLEdBQUcsQ0FBQyxHQUFHLFFBQVE7R0FBQyxHQUFHO0dBQUUsR0FBRztHQUl0SCxPQUFPO0VBQ1gsQ0FBQztFQUVILE9BQU87Q0FDVDtDQUlBLElBQUksT0FBTyxZQUFZLFlBQVksT0FBTyxXQUFXLFVBQVM7RUFDMUQsT0FBTyxVQUFVO0VBRWpCLE9BQU8sUUFBUSxVQUFVO0NBQzdCLE9BQ0ssSUFBSSxPQUFPLFdBQVcsY0FBYyxPQUFPLFFBQzVDLE9BQU8sQ0FBQyxHQUFHLFdBQVc7RUFBRSxPQUFPO0NBQVcsQ0FBQztNQUUxQyxJQUFJLE9BQU8sWUFBWSxVQUN4QixRQUFRLFlBQVkiLCJuYW1lcyI6W10sImlnbm9yZUxpc3QiOlswXSwic291cmNlcyI6WyIuLi8uLi9ub2RlX21vZHVsZXMvc3FsLmpzL2Rpc3Qvc3FsLXdhc20tYnJvd3Nlci5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJcbi8vIFdlIGFyZSBtb2R1bGFyaXppbmcgdGhpcyBtYW51YWxseSBiZWNhdXNlIHRoZSBjdXJyZW50IG1vZHVsYXJpemUgc2V0dGluZyBpbiBFbXNjcmlwdGVuIGhhcyBzb21lIGlzc3Vlczpcbi8vIGh0dHBzOi8vZ2l0aHViLmNvbS9rcmlwa2VuL2Vtc2NyaXB0ZW4vaXNzdWVzLzU4MjBcbi8vIEluIGFkZGl0aW9uLCBXaGVuIHlvdSB1c2UgZW1jYydzIG1vZHVsYXJpemF0aW9uLCBpdCBzdGlsbCBleHBlY3RzIHRvIGV4cG9ydCBhIGdsb2JhbCBvYmplY3QgY2FsbGVkIGBNb2R1bGVgLFxuLy8gd2hpY2ggaXMgYWJsZSB0byBiZSB1c2VkL2NhbGxlZCBiZWZvcmUgdGhlIFdBU00gaXMgbG9hZGVkLlxuLy8gVGhlIG1vZHVsYXJpemF0aW9uIGJlbG93IGV4cG9ydHMgYSBwcm9taXNlIHRoYXQgbG9hZHMgYW5kIHJlc29sdmVzIHRvIHRoZSBhY3R1YWwgc3FsLmpzIG1vZHVsZS5cbi8vIFRoYXQgd2F5LCB0aGlzIG1vZHVsZSBjYW4ndCBiZSB1c2VkIGJlZm9yZSB0aGUgV0FTTSBpcyBmaW5pc2hlZCBsb2FkaW5nLlxuXG4vLyBXZSBhcmUgZ29pbmcgdG8gZGVmaW5lIGEgZnVuY3Rpb24gdGhhdCBhIHVzZXIgd2lsbCBjYWxsIHRvIHN0YXJ0IGxvYWRpbmcgaW5pdGlhbGl6aW5nIG91ciBTcWwuanMgbGlicmFyeVxuLy8gSG93ZXZlciwgdGhhdCBmdW5jdGlvbiBtaWdodCBiZSBjYWxsZWQgbXVsdGlwbGUgdGltZXMsIGFuZCBvbiBzdWJzZXF1ZW50IGNhbGxzLCB3ZSBkb24ndCBhY3R1YWxseSB3YW50IGl0IHRvIGluc3RhbnRpYXRlIGEgbmV3IGluc3RhbmNlIG9mIHRoZSBNb2R1bGVcbi8vIEluc3RlYWQsIHdlIHdhbnQgdG8gcmV0dXJuIHRoZSBwcmV2aW91c2x5IGxvYWRlZCBtb2R1bGVcblxuLy8gVE9ETzogTWFrZSB0aGlzIG5vdCBkZWNsYXJlIGEgZ2xvYmFsIGlmIHVzZWQgaW4gdGhlIGJyb3dzZXJcbnZhciBpbml0U3FsSnNQcm9taXNlID0gdW5kZWZpbmVkO1xuXG52YXIgaW5pdFNxbEpzID0gZnVuY3Rpb24gKG1vZHVsZUNvbmZpZykge1xuXG4gICAgaWYgKGluaXRTcWxKc1Byb21pc2Upe1xuICAgICAgcmV0dXJuIGluaXRTcWxKc1Byb21pc2U7XG4gICAgfVxuICAgIC8vIElmIHdlJ3JlIGhlcmUsIHdlJ3ZlIG5ldmVyIGNhbGxlZCB0aGlzIGZ1bmN0aW9uIGJlZm9yZVxuICAgIGluaXRTcWxKc1Byb21pc2UgPSBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZU1vZHVsZSwgcmVqZWN0KSB7XG5cbiAgICAgICAgLy8gV2UgYXJlIG1vZHVsYXJpemluZyB0aGlzIG1hbnVhbGx5IGJlY2F1c2UgdGhlIGN1cnJlbnQgbW9kdWxhcml6ZSBzZXR0aW5nIGluIEVtc2NyaXB0ZW4gaGFzIHNvbWUgaXNzdWVzOlxuICAgICAgICAvLyBodHRwczovL2dpdGh1Yi5jb20va3JpcGtlbi9lbXNjcmlwdGVuL2lzc3Vlcy81ODIwXG5cbiAgICAgICAgLy8gVGhlIHdheSB0byBhZmZlY3QgdGhlIGxvYWRpbmcgb2YgZW1jYyBjb21waWxlZCBtb2R1bGVzIGlzIHRvIGNyZWF0ZSBhIHZhcmlhYmxlIGNhbGxlZCBgTW9kdWxlYCBhbmQgYWRkXG4gICAgICAgIC8vIHByb3BlcnRpZXMgdG8gaXQsIGxpa2UgYHByZVJ1bmAsIGBwb3N0UnVuYCwgZXRjXG4gICAgICAgIC8vIFdlIGFyZSB1c2luZyB0aGF0IHRvIGdldCBub3RpZmllZCB3aGVuIHRoZSBXQVNNIGhhcyBmaW5pc2hlZCBsb2FkaW5nLlxuICAgICAgICAvLyBPbmx5IHRoZW4gd2lsbCB3ZSByZXR1cm4gb3VyIHByb21pc2VcblxuICAgICAgICAvLyBJZiB0aGV5IHBhc3NlZCBpbiBhIG1vZHVsZUNvbmZpZyBvYmplY3QsIHVzZSB0aGF0XG4gICAgICAgIC8vIE90aGVyd2lzZSwgaW5pdGlhbGl6ZSBNb2R1bGUgdG8gdGhlIGVtcHR5IG9iamVjdFxuICAgICAgICB2YXIgTW9kdWxlID0gdHlwZW9mIG1vZHVsZUNvbmZpZyAhPT0gJ3VuZGVmaW5lZCcgPyBtb2R1bGVDb25maWcgOiB7fTtcblxuICAgICAgICAvLyBFTUNDIG9ubHkgYWxsb3dzIGZvciBhIHNpbmdsZSBvbkFib3J0IGZ1bmN0aW9uIChub3QgYW4gYXJyYXkgb2YgZnVuY3Rpb25zKVxuICAgICAgICAvLyBTbyBpZiB0aGUgdXNlciBkZWZpbmVkIHRoZWlyIG93biBvbkFib3J0IGZ1bmN0aW9uLCB3ZSByZW1lbWJlciBpdCBhbmQgY2FsbCBpdFxuICAgICAgICB2YXIgb3JpZ2luYWxPbkFib3J0RnVuY3Rpb24gPSBNb2R1bGVbJ29uQWJvcnQnXTtcbiAgICAgICAgTW9kdWxlWydvbkFib3J0J10gPSBmdW5jdGlvbiAoZXJyb3JUaGF0Q2F1c2VkQWJvcnQpIHtcbiAgICAgICAgICAgIHJlamVjdChuZXcgRXJyb3IoZXJyb3JUaGF0Q2F1c2VkQWJvcnQpKTtcbiAgICAgICAgICAgIGlmIChvcmlnaW5hbE9uQWJvcnRGdW5jdGlvbil7XG4gICAgICAgICAgICAgIG9yaWdpbmFsT25BYm9ydEZ1bmN0aW9uKGVycm9yVGhhdENhdXNlZEFib3J0KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcblxuICAgICAgICBNb2R1bGVbJ3Bvc3RSdW4nXSA9IE1vZHVsZVsncG9zdFJ1biddIHx8IFtdO1xuICAgICAgICBNb2R1bGVbJ3Bvc3RSdW4nXS5wdXNoKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIC8vIFdoZW4gRW1zY3JpcHRlZCBjYWxscyBwb3N0UnVuLCB0aGlzIHByb21pc2UgcmVzb2x2ZXMgd2l0aCB0aGUgYnVpbHQgTW9kdWxlXG4gICAgICAgICAgICByZXNvbHZlTW9kdWxlKE1vZHVsZSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIC8vIFRoZXJlIGlzIGEgc2VjdGlvbiBvZiBjb2RlIGluIHRoZSBlbWNjLWdlbmVyYXRlZCBjb2RlIGJlbG93IHRoYXQgbG9va3MgbGlrZSB0aGlzOlxuICAgICAgICAvLyAoTm90ZSB0aGF0IHRoaXMgaXMgbG93ZXJjYXNlIGBtb2R1bGVgKVxuICAgICAgICAvLyBpZiAodHlwZW9mIG1vZHVsZSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgLy8gICAgIG1vZHVsZVsnZXhwb3J0cyddID0gTW9kdWxlO1xuICAgICAgICAvLyB9XG4gICAgICAgIC8vIFdoZW4gdGhhdCBydW5zLCBpdCdzIGdvaW5nIHRvIG92ZXJ3cml0ZSBvdXIgb3duIG1vZHVsYXJpemF0aW9uIGV4cG9ydCBlZmZvcnRzIGluIHNoZWxsLXBvc3QuanMhXG4gICAgICAgIC8vIFRoZSBvbmx5IHdheSB0byB0ZWxsIGVtY2Mgbm90IHRvIGVtaXQgaXQgaXMgdG8gcGFzcyB0aGUgTU9EVUxBUklaRT0xIG9yIE1PRFVMQVJJWkVfSU5TVEFOQ0U9MSBmbGFncyxcbiAgICAgICAgLy8gYnV0IHRoYXQgY2FycmllcyB3aXRoIGl0IGFkZGl0aW9uYWwgdW5uZWNlc3NhcnkgYmFnZ2FnZS9idWdzIHdlIGRvbid0IHdhbnQgZWl0aGVyLlxuICAgICAgICAvLyBTbywgd2UgaGF2ZSB0aHJlZSBvcHRpb25zOlxuICAgICAgICAvLyAxKSBXZSB1bmRlZmluZSBgbW9kdWxlYFxuICAgICAgICAvLyAyKSBXZSByZW1lbWJlciB3aGF0IGBtb2R1bGVbJ2V4cG9ydHMnXWAgd2FzIGF0IHRoZSBiZWdpbm5pbmcgb2YgdGhpcyBmdW5jdGlvbiBhbmQgd2UgcmVzdG9yZSBpdCBsYXRlclxuICAgICAgICAvLyAzKSBXZSB3cml0ZSBhIHNjcmlwdCB0byByZW1vdmUgdGhvc2UgbGluZXMgb2YgY29kZSBhcyBwYXJ0IG9mIHRoZSBNYWtlIHByb2Nlc3MuXG4gICAgICAgIC8vXG4gICAgICAgIC8vIFNpbmNlIHRob3NlIGFyZSB0aGUgb25seSBsaW5lcyBvZiBjb2RlIHRoYXQgY2FyZSBhYm91dCBtb2R1bGUsIHdlIHdpbGwgdW5kZWZpbmUgaXQuIEl0J3MgdGhlIG1vc3Qgc3RyYWlnaHRmb3J3YXJkXG4gICAgICAgIC8vIG9mIHRoZSBvcHRpb25zLCBhbmQgaGFzIHRoZSBzaWRlIGVmZmVjdCBvZiByZWR1Y2luZyBlbWNjJ3MgZWZmb3J0cyB0byBtb2RpZnkgdGhlIG1vZHVsZSBpZiBpdHMgb3V0cHV0IHdlcmUgdG8gY2hhbmdlIGluIHRoZSBmdXR1cmUuXG4gICAgICAgIC8vIFRoYXQncyBhIG5pY2Ugc2lkZSBlZmZlY3Qgc2luY2Ugd2UncmUgaGFuZGxpbmcgdGhlIG1vZHVsYXJpemF0aW9uIGVmZm9ydHMgb3Vyc2VsdmVzXG4gICAgICAgIG1vZHVsZSA9IHVuZGVmaW5lZDtcblxuICAgICAgICAvLyBUaGUgZW1jYy1nZW5lcmF0ZWQgY29kZSBhbmQgc2hlbGwtcG9zdC5qcyBjb2RlIGdvZXMgYmVsb3csXG4gICAgICAgIC8vIG1lYW5pbmcgdGhhdCBhbGwgb2YgaXQgcnVucyBpbnNpZGUgb2YgdGhpcyBwcm9taXNlLiBJZiBhbnl0aGluZyB0aHJvd3MgYW4gZXhjZXB0aW9uLCBvdXIgcHJvbWlzZSB3aWxsIGFib3J0XG52YXIgaztrfHw9dHlwZW9mIE1vZHVsZSAhPSAndW5kZWZpbmVkJyA/IE1vZHVsZSA6IHt9O3ZhciBhYT0hIWdsb2JhbFRoaXMud2luZG93LGJhPSEhZ2xvYmFsVGhpcy5Xb3JrZXJHbG9iYWxTY29wZTtcbmsub25SdW50aW1lSW5pdGlhbGl6ZWQ9ZnVuY3Rpb24oKXtmdW5jdGlvbiBhKGYsbCl7c3dpdGNoKHR5cGVvZiBsKXtjYXNlIFwiYm9vbGVhblwiOmJjKGYsbD8xOjApO2JyZWFrO2Nhc2UgXCJudW1iZXJcIjpjYyhmLGwpO2JyZWFrO2Nhc2UgXCJzdHJpbmdcIjpkYyhmLGwsLTEsLTEpO2JyZWFrO2Nhc2UgXCJvYmplY3RcIjppZihudWxsPT09bCllYihmKTtlbHNlIGlmKG51bGwhPWwubGVuZ3RoKXt2YXIgbj1jYShsLmxlbmd0aCk7bS5zZXQobCxuKTtlYyhmLG4sbC5sZW5ndGgsLTEpO2RhKG4pfWVsc2UgdWEoZixcIldyb25nIEFQSSB1c2UgOiB0cmllZCB0byByZXR1cm4gYSB2YWx1ZSBvZiBhbiB1bmtub3duIHR5cGUgKFwiK2wrXCIpLlwiLC0xKTticmVhaztkZWZhdWx0OmViKGYpfX1mdW5jdGlvbiBiKGYsbCl7Zm9yKHZhciBuPVtdLHA9MDtwPGY7cCs9MSl7dmFyIHI9dChsKzQqcCxcImkzMlwiKSx2PWZjKHIpO2lmKDE9PT12fHwyPT09dilyPWdjKHIpO2Vsc2UgaWYoMz09PXYpcj1oYyhyKTtlbHNlIGlmKDQ9PT1cbnYpe3Y9cjtyPWljKHYpO3Y9amModik7Zm9yKHZhciBKPW5ldyBVaW50OEFycmF5KHIpLEk9MDtJPHI7SSs9MSlKW0ldPW1bditJXTtyPUp9ZWxzZSByPW51bGw7bi5wdXNoKHIpfXJldHVybiBufWZ1bmN0aW9uIGMoZixsKXt0aGlzLlFhPWY7dGhpcy5kYj1sO3RoaXMuT2E9MTt0aGlzLnliPVtdfWZ1bmN0aW9uIGQoZixsKXt0aGlzLmRiPWw7dGhpcy5vYj1lYShmKTtpZihudWxsPT09dGhpcy5vYil0aHJvdyBFcnJvcihcIlVuYWJsZSB0byBhbGxvY2F0ZSBtZW1vcnkgZm9yIHRoZSBTUUwgc3RyaW5nXCIpO3RoaXMudWI9dGhpcy5vYjt0aGlzLmdiPXRoaXMuRmI9bnVsbH1mdW5jdGlvbiBlKGYpe3RoaXMuZmlsZW5hbWU9XCJkYmZpbGVfXCIrKDQyOTQ5NjcyOTUqTWF0aC5yYW5kb20oKT4+PjApO2lmKG51bGwhPWYpe3ZhciBsPXRoaXMuZmlsZW5hbWUsbj1cIi9cIixwPWw7biYmKG49XCJzdHJpbmdcIj09dHlwZW9mIG4/bjpmYShuKSxwPWw/aGEobitcIi9cIitsKTpuKTtsPWlhKCEwLCEwKTtwPWphKHAsXG5sKTtpZihmKXtpZihcInN0cmluZ1wiPT10eXBlb2YgZil7bj1BcnJheShmLmxlbmd0aCk7Zm9yKHZhciByPTAsdj1mLmxlbmd0aDtyPHY7KytyKW5bcl09Zi5jaGFyQ29kZUF0KHIpO2Y9bn1rYShwLGx8MTQ2KTtuPW1hKHAsNTc3KTtuYShuLGYsMCxmLmxlbmd0aCwwKTtvYShuKTtrYShwLGwpfX10aGlzLmhhbmRsZUVycm9yKHEodGhpcy5maWxlbmFtZSxnKSk7dGhpcy5kYj10KGcsXCJpMzJcIik7aGIodGhpcy5kYik7dGhpcy5wYj17fTt0aGlzLlNhPXt9fXZhciBnPXkoNCksaD1rLmN3cmFwLHE9aChcInNxbGl0ZTNfb3BlblwiLFwibnVtYmVyXCIsW1wic3RyaW5nXCIsXCJudW1iZXJcIl0pLHc9aChcInNxbGl0ZTNfY2xvc2VfdjJcIixcIm51bWJlclwiLFtcIm51bWJlclwiXSksdT1oKFwic3FsaXRlM19leGVjXCIsXCJudW1iZXJcIixbXCJudW1iZXJcIixcInN0cmluZ1wiLFwibnVtYmVyXCIsXCJudW1iZXJcIixcIm51bWJlclwiXSkseD1oKFwic3FsaXRlM19jaGFuZ2VzXCIsXCJudW1iZXJcIixbXCJudW1iZXJcIl0pLEQ9aChcInNxbGl0ZTNfcHJlcGFyZV92MlwiLFxuXCJudW1iZXJcIixbXCJudW1iZXJcIixcInN0cmluZ1wiLFwibnVtYmVyXCIsXCJudW1iZXJcIixcIm51bWJlclwiXSksaWI9aChcInNxbGl0ZTNfc3FsXCIsXCJzdHJpbmdcIixbXCJudW1iZXJcIl0pLGxjPWgoXCJzcWxpdGUzX25vcm1hbGl6ZWRfc3FsXCIsXCJzdHJpbmdcIixbXCJudW1iZXJcIl0pLGpiPWgoXCJzcWxpdGUzX3ByZXBhcmVfdjJcIixcIm51bWJlclwiLFtcIm51bWJlclwiLFwibnVtYmVyXCIsXCJudW1iZXJcIixcIm51bWJlclwiLFwibnVtYmVyXCJdKSxtYz1oKFwic3FsaXRlM19iaW5kX3RleHRcIixcIm51bWJlclwiLFtcIm51bWJlclwiLFwibnVtYmVyXCIsXCJudW1iZXJcIixcIm51bWJlclwiLFwibnVtYmVyXCJdKSxrYj1oKFwic3FsaXRlM19iaW5kX2Jsb2JcIixcIm51bWJlclwiLFtcIm51bWJlclwiLFwibnVtYmVyXCIsXCJudW1iZXJcIixcIm51bWJlclwiLFwibnVtYmVyXCJdKSxuYz1oKFwic3FsaXRlM19iaW5kX2RvdWJsZVwiLFwibnVtYmVyXCIsW1wibnVtYmVyXCIsXCJudW1iZXJcIixcIm51bWJlclwiXSksb2M9aChcInNxbGl0ZTNfYmluZF9pbnRcIixcIm51bWJlclwiLFtcIm51bWJlclwiLFxuXCJudW1iZXJcIixcIm51bWJlclwiXSkscGM9aChcInNxbGl0ZTNfYmluZF9wYXJhbWV0ZXJfaW5kZXhcIixcIm51bWJlclwiLFtcIm51bWJlclwiLFwic3RyaW5nXCJdKSxxYz1oKFwic3FsaXRlM19zdGVwXCIsXCJudW1iZXJcIixbXCJudW1iZXJcIl0pLHJjPWgoXCJzcWxpdGUzX2Vycm1zZ1wiLFwic3RyaW5nXCIsW1wibnVtYmVyXCJdKSxzYz1oKFwic3FsaXRlM19jb2x1bW5fY291bnRcIixcIm51bWJlclwiLFtcIm51bWJlclwiXSksdGM9aChcInNxbGl0ZTNfZGF0YV9jb3VudFwiLFwibnVtYmVyXCIsW1wibnVtYmVyXCJdKSx1Yz1oKFwic3FsaXRlM19jb2x1bW5fZG91YmxlXCIsXCJudW1iZXJcIixbXCJudW1iZXJcIixcIm51bWJlclwiXSksbGI9aChcInNxbGl0ZTNfY29sdW1uX3RleHRcIixcInN0cmluZ1wiLFtcIm51bWJlclwiLFwibnVtYmVyXCJdKSx2Yz1oKFwic3FsaXRlM19jb2x1bW5fYmxvYlwiLFwibnVtYmVyXCIsW1wibnVtYmVyXCIsXCJudW1iZXJcIl0pLHdjPWgoXCJzcWxpdGUzX2NvbHVtbl9ieXRlc1wiLFwibnVtYmVyXCIsW1wibnVtYmVyXCIsXCJudW1iZXJcIl0pLHhjPWgoXCJzcWxpdGUzX2NvbHVtbl90eXBlXCIsXG5cIm51bWJlclwiLFtcIm51bWJlclwiLFwibnVtYmVyXCJdKSx5Yz1oKFwic3FsaXRlM19jb2x1bW5fbmFtZVwiLFwic3RyaW5nXCIsW1wibnVtYmVyXCIsXCJudW1iZXJcIl0pLHpjPWgoXCJzcWxpdGUzX3Jlc2V0XCIsXCJudW1iZXJcIixbXCJudW1iZXJcIl0pLEFjPWgoXCJzcWxpdGUzX2NsZWFyX2JpbmRpbmdzXCIsXCJudW1iZXJcIixbXCJudW1iZXJcIl0pLEJjPWgoXCJzcWxpdGUzX2ZpbmFsaXplXCIsXCJudW1iZXJcIixbXCJudW1iZXJcIl0pLG1iPWgoXCJzcWxpdGUzX2NyZWF0ZV9mdW5jdGlvbl92MlwiLFwibnVtYmVyXCIsXCJudW1iZXIgc3RyaW5nIG51bWJlciBudW1iZXIgbnVtYmVyIG51bWJlciBudW1iZXIgbnVtYmVyIG51bWJlclwiLnNwbGl0KFwiIFwiKSksZmM9aChcInNxbGl0ZTNfdmFsdWVfdHlwZVwiLFwibnVtYmVyXCIsW1wibnVtYmVyXCJdKSxpYz1oKFwic3FsaXRlM192YWx1ZV9ieXRlc1wiLFwibnVtYmVyXCIsW1wibnVtYmVyXCJdKSxoYz1oKFwic3FsaXRlM192YWx1ZV90ZXh0XCIsXCJzdHJpbmdcIixbXCJudW1iZXJcIl0pLGpjPWgoXCJzcWxpdGUzX3ZhbHVlX2Jsb2JcIixcblwibnVtYmVyXCIsW1wibnVtYmVyXCJdKSxnYz1oKFwic3FsaXRlM192YWx1ZV9kb3VibGVcIixcIm51bWJlclwiLFtcIm51bWJlclwiXSksY2M9aChcInNxbGl0ZTNfcmVzdWx0X2RvdWJsZVwiLFwiXCIsW1wibnVtYmVyXCIsXCJudW1iZXJcIl0pLGViPWgoXCJzcWxpdGUzX3Jlc3VsdF9udWxsXCIsXCJcIixbXCJudW1iZXJcIl0pLGRjPWgoXCJzcWxpdGUzX3Jlc3VsdF90ZXh0XCIsXCJcIixbXCJudW1iZXJcIixcInN0cmluZ1wiLFwibnVtYmVyXCIsXCJudW1iZXJcIl0pLGVjPWgoXCJzcWxpdGUzX3Jlc3VsdF9ibG9iXCIsXCJcIixbXCJudW1iZXJcIixcIm51bWJlclwiLFwibnVtYmVyXCIsXCJudW1iZXJcIl0pLGJjPWgoXCJzcWxpdGUzX3Jlc3VsdF9pbnRcIixcIlwiLFtcIm51bWJlclwiLFwibnVtYmVyXCJdKSx1YT1oKFwic3FsaXRlM19yZXN1bHRfZXJyb3JcIixcIlwiLFtcIm51bWJlclwiLFwic3RyaW5nXCIsXCJudW1iZXJcIl0pLG5iPWgoXCJzcWxpdGUzX2FnZ3JlZ2F0ZV9jb250ZXh0XCIsXCJudW1iZXJcIixbXCJudW1iZXJcIixcIm51bWJlclwiXSksaGI9aChcIlJlZ2lzdGVyRXh0ZW5zaW9uRnVuY3Rpb25zXCIsXG5cIm51bWJlclwiLFtcIm51bWJlclwiXSksb2I9aChcInNxbGl0ZTNfdXBkYXRlX2hvb2tcIixcIm51bWJlclwiLFtcIm51bWJlclwiLFwibnVtYmVyXCIsXCJudW1iZXJcIl0pO2MucHJvdG90eXBlLmJpbmQ9ZnVuY3Rpb24oZil7aWYoIXRoaXMuUWEpdGhyb3dcIlN0YXRlbWVudCBjbG9zZWRcIjt0aGlzLnJlc2V0KCk7cmV0dXJuIEFycmF5LmlzQXJyYXkoZik/dGhpcy5XYihmKTpudWxsIT1mJiZcIm9iamVjdFwiPT09dHlwZW9mIGY/dGhpcy5YYihmKTohMH07Yy5wcm90b3R5cGUuc3RlcD1mdW5jdGlvbigpe2lmKCF0aGlzLlFhKXRocm93XCJTdGF0ZW1lbnQgY2xvc2VkXCI7dGhpcy5PYT0xO3ZhciBmPXFjKHRoaXMuUWEpO3N3aXRjaChmKXtjYXNlIDEwMDpyZXR1cm4hMDtjYXNlIDEwMTpyZXR1cm4hMTtkZWZhdWx0OnRocm93IHRoaXMuZGIuaGFuZGxlRXJyb3IoZik7fX07Yy5wcm90b3R5cGUuUGI9ZnVuY3Rpb24oZil7bnVsbD09ZiYmKGY9dGhpcy5PYSx0aGlzLk9hKz0xKTtyZXR1cm4gdWModGhpcy5RYSxmKX07XG5jLnByb3RvdHlwZS5oYz1mdW5jdGlvbihmKXtudWxsPT1mJiYoZj10aGlzLk9hLHRoaXMuT2ErPTEpO2Y9bGIodGhpcy5RYSxmKTtpZihcImZ1bmN0aW9uXCIhPT10eXBlb2YgQmlnSW50KXRocm93IEVycm9yKFwiQmlnSW50IGlzIG5vdCBzdXBwb3J0ZWRcIik7cmV0dXJuIEJpZ0ludChmKX07Yy5wcm90b3R5cGUubWM9ZnVuY3Rpb24oZil7bnVsbD09ZiYmKGY9dGhpcy5PYSx0aGlzLk9hKz0xKTtyZXR1cm4gbGIodGhpcy5RYSxmKX07Yy5wcm90b3R5cGUuZ2V0QmxvYj1mdW5jdGlvbihmKXtudWxsPT1mJiYoZj10aGlzLk9hLHRoaXMuT2ErPTEpO3ZhciBsPXdjKHRoaXMuUWEsZik7Zj12Yyh0aGlzLlFhLGYpO2Zvcih2YXIgbj1uZXcgVWludDhBcnJheShsKSxwPTA7cDxsO3ArPTEpbltwXT1tW2YrcF07cmV0dXJuIG59O2MucHJvdG90eXBlLmdldD1mdW5jdGlvbihmLGwpe2w9bHx8e307bnVsbCE9ZiYmdGhpcy5iaW5kKGYpJiZ0aGlzLnN0ZXAoKTtmPVtdO2Zvcih2YXIgbj10Yyh0aGlzLlFhKSxcbnA9MDtwPG47cCs9MSlzd2l0Y2goeGModGhpcy5RYSxwKSl7Y2FzZSAxOnZhciByPWwudXNlQmlnSW50P3RoaXMuaGMocCk6dGhpcy5QYihwKTtmLnB1c2gocik7YnJlYWs7Y2FzZSAyOmYucHVzaCh0aGlzLlBiKHApKTticmVhaztjYXNlIDM6Zi5wdXNoKHRoaXMubWMocCkpO2JyZWFrO2Nhc2UgNDpmLnB1c2godGhpcy5nZXRCbG9iKHApKTticmVhaztkZWZhdWx0OmYucHVzaChudWxsKX1yZXR1cm4gZn07Yy5wcm90b3R5cGUuRGI9ZnVuY3Rpb24oKXtmb3IodmFyIGY9W10sbD1zYyh0aGlzLlFhKSxuPTA7bjxsO24rPTEpZi5wdXNoKHljKHRoaXMuUWEsbikpO3JldHVybiBmfTtjLnByb3RvdHlwZS5PYj1mdW5jdGlvbihmLGwpe2Y9dGhpcy5nZXQoZixsKTtsPXRoaXMuRGIoKTtmb3IodmFyIG49e30scD0wO3A8bC5sZW5ndGg7cCs9MSluW2xbcF1dPWZbcF07cmV0dXJuIG59O2MucHJvdG90eXBlLmxjPWZ1bmN0aW9uKCl7cmV0dXJuIGliKHRoaXMuUWEpfTtjLnByb3RvdHlwZS5pYz1cbmZ1bmN0aW9uKCl7cmV0dXJuIGxjKHRoaXMuUWEpfTtjLnByb3RvdHlwZS5KYj1mdW5jdGlvbihmKXtudWxsIT1mJiZ0aGlzLmJpbmQoZik7dGhpcy5zdGVwKCk7cmV0dXJuIHRoaXMucmVzZXQoKX07Yy5wcm90b3R5cGUuTGI9ZnVuY3Rpb24oZixsKXtudWxsPT1sJiYobD10aGlzLk9hLHRoaXMuT2ErPTEpO2Y9ZWEoZik7dGhpcy55Yi5wdXNoKGYpO3RoaXMuZGIuaGFuZGxlRXJyb3IobWModGhpcy5RYSxsLGYsLTEsMCkpfTtjLnByb3RvdHlwZS5WYj1mdW5jdGlvbihmLGwpe251bGw9PWwmJihsPXRoaXMuT2EsdGhpcy5PYSs9MSk7dmFyIG49Y2EoZi5sZW5ndGgpO20uc2V0KGYsbik7dGhpcy55Yi5wdXNoKG4pO3RoaXMuZGIuaGFuZGxlRXJyb3Ioa2IodGhpcy5RYSxsLG4sZi5sZW5ndGgsMCkpfTtjLnByb3RvdHlwZS5LYj1mdW5jdGlvbihmLGwpe251bGw9PWwmJihsPXRoaXMuT2EsdGhpcy5PYSs9MSk7dGhpcy5kYi5oYW5kbGVFcnJvcigoZj09PShmfDApP29jOm5jKSh0aGlzLlFhLFxubCxmKSl9O2MucHJvdG90eXBlLlliPWZ1bmN0aW9uKGYpe251bGw9PWYmJihmPXRoaXMuT2EsdGhpcy5PYSs9MSk7a2IodGhpcy5RYSxmLDAsMCwwKX07Yy5wcm90b3R5cGUuTWI9ZnVuY3Rpb24oZixsKXtudWxsPT1sJiYobD10aGlzLk9hLHRoaXMuT2ErPTEpO3N3aXRjaCh0eXBlb2YgZil7Y2FzZSBcInN0cmluZ1wiOnRoaXMuTGIoZixsKTtyZXR1cm47Y2FzZSBcIm51bWJlclwiOnRoaXMuS2IoZixsKTtyZXR1cm47Y2FzZSBcImJpZ2ludFwiOnRoaXMuTGIoZi50b1N0cmluZygpLGwpO3JldHVybjtjYXNlIFwiYm9vbGVhblwiOnRoaXMuS2IoZiswLGwpO3JldHVybjtjYXNlIFwib2JqZWN0XCI6aWYobnVsbD09PWYpe3RoaXMuWWIobCk7cmV0dXJufWlmKG51bGwhPWYubGVuZ3RoKXt0aGlzLlZiKGYsbCk7cmV0dXJufX10aHJvd1wiV3JvbmcgQVBJIHVzZSA6IHRyaWVkIHRvIGJpbmQgYSB2YWx1ZSBvZiBhbiB1bmtub3duIHR5cGUgKFwiK2YrXCIpLlwiO307Yy5wcm90b3R5cGUuWGI9ZnVuY3Rpb24oZil7dmFyIGw9XG50aGlzO09iamVjdC5rZXlzKGYpLmZvckVhY2goZnVuY3Rpb24obil7dmFyIHA9cGMobC5RYSxuKTswIT09cCYmbC5NYihmW25dLHApfSk7cmV0dXJuITB9O2MucHJvdG90eXBlLldiPWZ1bmN0aW9uKGYpe2Zvcih2YXIgbD0wO2w8Zi5sZW5ndGg7bCs9MSl0aGlzLk1iKGZbbF0sbCsxKTtyZXR1cm4hMH07Yy5wcm90b3R5cGUucmVzZXQ9ZnVuY3Rpb24oKXt0aGlzLkNiKCk7cmV0dXJuIDA9PT1BYyh0aGlzLlFhKSYmMD09PXpjKHRoaXMuUWEpfTtjLnByb3RvdHlwZS5DYj1mdW5jdGlvbigpe2Zvcih2YXIgZjt2b2lkIDAhPT0oZj10aGlzLnliLnBvcCgpKTspZGEoZil9O2MucHJvdG90eXBlLmNiPWZ1bmN0aW9uKCl7dGhpcy5DYigpO3ZhciBmPTA9PT1CYyh0aGlzLlFhKTtkZWxldGUgdGhpcy5kYi5wYlt0aGlzLlFhXTt0aGlzLlFhPTA7cmV0dXJuIGZ9O2QucHJvdG90eXBlLm5leHQ9ZnVuY3Rpb24oKXtpZihudWxsPT09dGhpcy5vYilyZXR1cm57ZG9uZTohMH07bnVsbCE9PXRoaXMuZ2ImJlxuKHRoaXMuZ2IuY2IoKSx0aGlzLmdiPW51bGwpO2lmKCF0aGlzLmRiLmRiKXRocm93IHRoaXMuQWIoKSxFcnJvcihcIkRhdGFiYXNlIGNsb3NlZFwiKTt2YXIgZj1wYSgpLGw9eSg0KTtxYShnKTtxYShsKTt0cnl7dGhpcy5kYi5oYW5kbGVFcnJvcihqYih0aGlzLmRiLmRiLHRoaXMudWIsLTEsZyxsKSk7dGhpcy51Yj10KGwsXCJpMzJcIik7dmFyIG49dChnLFwiaTMyXCIpO2lmKDA9PT1uKXJldHVybiB0aGlzLkFiKCkse2RvbmU6ITB9O3RoaXMuZ2I9bmV3IGMobix0aGlzLmRiKTt0aGlzLmRiLnBiW25dPXRoaXMuZ2I7cmV0dXJue3ZhbHVlOnRoaXMuZ2IsZG9uZTohMX19Y2F0Y2gocCl7dGhyb3cgdGhpcy5GYj16KHRoaXMudWIpLHRoaXMuQWIoKSxwO31maW5hbGx5e3JhKGYpfX07ZC5wcm90b3R5cGUuQWI9ZnVuY3Rpb24oKXtkYSh0aGlzLm9iKTt0aGlzLm9iPW51bGx9O2QucHJvdG90eXBlLmpjPWZ1bmN0aW9uKCl7cmV0dXJuIG51bGwhPT10aGlzLkZiP3RoaXMuRmI6eih0aGlzLnViKX07XG5cImZ1bmN0aW9uXCI9PT10eXBlb2YgU3ltYm9sJiZcInN5bWJvbFwiPT09dHlwZW9mIFN5bWJvbC5pdGVyYXRvciYmKGQucHJvdG90eXBlW1N5bWJvbC5pdGVyYXRvcl09ZnVuY3Rpb24oKXtyZXR1cm4gdGhpc30pO2UucHJvdG90eXBlLkpiPWZ1bmN0aW9uKGYsbCl7aWYoIXRoaXMuZGIpdGhyb3dcIkRhdGFiYXNlIGNsb3NlZFwiO2lmKGwpe2Y9dGhpcy5HYihmLGwpO3RyeXtmLnN0ZXAoKX1maW5hbGx5e2YuY2IoKX19ZWxzZSB0aGlzLmhhbmRsZUVycm9yKHUodGhpcy5kYixmLDAsMCxnKSk7cmV0dXJuIHRoaXN9O2UucHJvdG90eXBlLmV4ZWM9ZnVuY3Rpb24oZixsLG4pe2lmKCF0aGlzLmRiKXRocm93XCJEYXRhYmFzZSBjbG9zZWRcIjt2YXIgcD1wYSgpLHI9bnVsbCx2PW51bGwsSj1udWxsO3RyeXtKPXY9ZWEoZik7dmFyIEk9eSg0KTtmb3IoZj1bXTswIT09dChKLFwiaThcIik7KXtxYShnKTtxYShJKTt0aGlzLmhhbmRsZUVycm9yKGpiKHRoaXMuZGIsSiwtMSxnLEkpKTt2YXIgTD10KGcsXCJpMzJcIik7XG5KPXQoSSxcImkzMlwiKTtpZigwIT09TCl7dmFyIEc9bnVsbDtyPW5ldyBjKEwsdGhpcyk7Zm9yKG51bGwhPWwmJnIuYmluZChsKTtyLnN0ZXAoKTspbnVsbD09PUcmJihHPXtjb2x1bW5zOnIuRGIoKSx2YWx1ZXM6W119LGYucHVzaChHKSksRy52YWx1ZXMucHVzaChyLmdldChudWxsLG4pKTtyLmNiKCl9fXJldHVybiBmfWNhdGNoKGxhKXt0aHJvdyByJiZyLmNiKCksbGE7fWZpbmFsbHl7diYmZGEodikscmEocCl9fTtlLnByb3RvdHlwZS5lYz1mdW5jdGlvbihmLGwsbixwLHIpe1wiZnVuY3Rpb25cIj09PXR5cGVvZiBsJiYocD1uLG49bCxsPXZvaWQgMCk7Zj10aGlzLkdiKGYsbCk7dHJ5e2Zvcig7Zi5zdGVwKCk7KW4oZi5PYihudWxsLHIpKX1maW5hbGx5e2YuY2IoKX1pZihcImZ1bmN0aW9uXCI9PT10eXBlb2YgcClyZXR1cm4gcCgpfTtlLnByb3RvdHlwZS5HYj1mdW5jdGlvbihmLGwpe3FhKGcpO3RoaXMuaGFuZGxlRXJyb3IoRCh0aGlzLmRiLGYsLTEsZywwKSk7Zj10KGcsXCJpMzJcIik7aWYoMD09PVxuZil0aHJvd1wiTm90aGluZyB0byBwcmVwYXJlXCI7dmFyIG49bmV3IGMoZix0aGlzKTtudWxsIT1sJiZuLmJpbmQobCk7cmV0dXJuIHRoaXMucGJbZl09bn07ZS5wcm90b3R5cGUucGM9ZnVuY3Rpb24oZil7cmV0dXJuIG5ldyBkKGYsdGhpcyl9O2UucHJvdG90eXBlLmZjPWZ1bmN0aW9uKCl7T2JqZWN0LnZhbHVlcyh0aGlzLnBiKS5mb3JFYWNoKGZ1bmN0aW9uKGwpe2wuY2IoKX0pO09iamVjdC52YWx1ZXModGhpcy5TYSkuZm9yRWFjaChBKTt0aGlzLlNhPXt9O3RoaXMuaGFuZGxlRXJyb3Iodyh0aGlzLmRiKSk7dmFyIGY9c2EodGhpcy5maWxlbmFtZSk7dGhpcy5oYW5kbGVFcnJvcihxKHRoaXMuZmlsZW5hbWUsZykpO3RoaXMuZGI9dChnLFwiaTMyXCIpO2hiKHRoaXMuZGIpO3JldHVybiBmfTtlLnByb3RvdHlwZS5jbG9zZT1mdW5jdGlvbigpe251bGwhPT10aGlzLmRiJiYoT2JqZWN0LnZhbHVlcyh0aGlzLnBiKS5mb3JFYWNoKGZ1bmN0aW9uKGYpe2YuY2IoKX0pLE9iamVjdC52YWx1ZXModGhpcy5TYSkuZm9yRWFjaChBKSxcbnRoaXMuU2E9e30sdGhpcy5mYiYmKEEodGhpcy5mYiksdGhpcy5mYj12b2lkIDApLHRoaXMuaGFuZGxlRXJyb3Iodyh0aGlzLmRiKSksdGEoXCIvXCIrdGhpcy5maWxlbmFtZSksdGhpcy5kYj1udWxsKX07ZS5wcm90b3R5cGUuaGFuZGxlRXJyb3I9ZnVuY3Rpb24oZil7aWYoMD09PWYpcmV0dXJuIG51bGw7Zj1yYyh0aGlzLmRiKTt0aHJvdyBFcnJvcihmKTt9O2UucHJvdG90eXBlLmtjPWZ1bmN0aW9uKCl7cmV0dXJuIHgodGhpcy5kYil9O2UucHJvdG90eXBlLmJjPWZ1bmN0aW9uKGYsbCl7T2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHRoaXMuU2EsZikmJihBKHRoaXMuU2FbZl0pLGRlbGV0ZSB0aGlzLlNhW2ZdKTt2YXIgbj12YShmdW5jdGlvbihwLHIsdil7cj1iKHIsdik7dHJ5e3ZhciBKPWwuYXBwbHkobnVsbCxyKX1jYXRjaChJKXt1YShwLEksLTEpO3JldHVybn1hKHAsSil9LFwidmlpaVwiKTt0aGlzLlNhW2ZdPW47dGhpcy5oYW5kbGVFcnJvcihtYih0aGlzLmRiLFxuZixsLmxlbmd0aCwxLDAsbiwwLDAsMCkpO3JldHVybiB0aGlzfTtlLnByb3RvdHlwZS5hYz1mdW5jdGlvbihmLGwpe3ZhciBuPWwuaW5pdHx8ZnVuY3Rpb24oKXtyZXR1cm4gbnVsbH0scD1sLmZpbmFsaXplfHxmdW5jdGlvbihMKXtyZXR1cm4gTH0scj1sLnN0ZXA7aWYoIXIpdGhyb3dcIkFuIGFnZ3JlZ2F0ZSBmdW5jdGlvbiBtdXN0IGhhdmUgYSBzdGVwIGZ1bmN0aW9uIGluIFwiK2Y7dmFyIHY9e307T2JqZWN0Lmhhc093blByb3BlcnR5LmNhbGwodGhpcy5TYSxmKSYmKEEodGhpcy5TYVtmXSksZGVsZXRlIHRoaXMuU2FbZl0pO2w9ZitcIl9fZmluYWxpemVcIjtPYmplY3QuaGFzT3duUHJvcGVydHkuY2FsbCh0aGlzLlNhLGwpJiYoQSh0aGlzLlNhW2xdKSxkZWxldGUgdGhpcy5TYVtsXSk7dmFyIEo9dmEoZnVuY3Rpb24oTCxHLGxhKXt2YXIgVj1uYihMLDEpO09iamVjdC5oYXNPd25Qcm9wZXJ0eS5jYWxsKHYsVil8fCh2W1ZdPW4oKSk7Rz1iKEcsbGEpO0c9W3ZbVl1dLmNvbmNhdChHKTtcbnRyeXt2W1ZdPXIuYXBwbHkobnVsbCxHKX1jYXRjaChEYyl7ZGVsZXRlIHZbVl0sdWEoTCxEYywtMSl9fSxcInZpaWlcIiksST12YShmdW5jdGlvbihMKXt2YXIgRz1uYihMLDEpO3RyeXt2YXIgbGE9cCh2W0ddKX1jYXRjaChWKXtkZWxldGUgdltHXTt1YShMLFYsLTEpO3JldHVybn1hKEwsbGEpO2RlbGV0ZSB2W0ddfSxcInZpXCIpO3RoaXMuU2FbZl09Sjt0aGlzLlNhW2xdPUk7dGhpcy5oYW5kbGVFcnJvcihtYih0aGlzLmRiLGYsci5sZW5ndGgtMSwxLDAsMCxKLEksMCkpO3JldHVybiB0aGlzfTtlLnByb3RvdHlwZS52Yz1mdW5jdGlvbihmKXt0aGlzLmZiJiYob2IodGhpcy5kYiwwLDApLEEodGhpcy5mYiksdGhpcy5mYj12b2lkIDApO2lmKCFmKXJldHVybiB0aGlzO3RoaXMuZmI9dmEoZnVuY3Rpb24obCxuLHAscix2KXtzd2l0Y2gobil7Y2FzZSAxODpsPVwiaW5zZXJ0XCI7YnJlYWs7Y2FzZSAyMzpsPVwidXBkYXRlXCI7YnJlYWs7Y2FzZSA5Omw9XCJkZWxldGVcIjticmVhaztkZWZhdWx0OnRocm93XCJ1bmtub3duIG9wZXJhdGlvbkNvZGUgaW4gdXBkYXRlSG9vayBjYWxsYmFjazogXCIrXG5uO31wPXoocCk7cj16KHIpO2lmKHY+TnVtYmVyLk1BWF9TQUZFX0lOVEVHRVIpdGhyb3dcInJvd0lkIHRvbyBiaWcgdG8gZml0IGluc2lkZSBhIE51bWJlclwiO2YobCxwLHIsTnVtYmVyKHYpKX0sXCJ2aWlpaWpcIik7b2IodGhpcy5kYix0aGlzLmZiLDApO3JldHVybiB0aGlzfTtjLnByb3RvdHlwZS5iaW5kPWMucHJvdG90eXBlLmJpbmQ7Yy5wcm90b3R5cGUuc3RlcD1jLnByb3RvdHlwZS5zdGVwO2MucHJvdG90eXBlLmdldD1jLnByb3RvdHlwZS5nZXQ7Yy5wcm90b3R5cGUuZ2V0Q29sdW1uTmFtZXM9Yy5wcm90b3R5cGUuRGI7Yy5wcm90b3R5cGUuZ2V0QXNPYmplY3Q9Yy5wcm90b3R5cGUuT2I7Yy5wcm90b3R5cGUuZ2V0U1FMPWMucHJvdG90eXBlLmxjO2MucHJvdG90eXBlLmdldE5vcm1hbGl6ZWRTUUw9Yy5wcm90b3R5cGUuaWM7Yy5wcm90b3R5cGUucnVuPWMucHJvdG90eXBlLkpiO2MucHJvdG90eXBlLnJlc2V0PWMucHJvdG90eXBlLnJlc2V0O2MucHJvdG90eXBlLmZyZWVtZW09XG5jLnByb3RvdHlwZS5DYjtjLnByb3RvdHlwZS5mcmVlPWMucHJvdG90eXBlLmNiO2QucHJvdG90eXBlLm5leHQ9ZC5wcm90b3R5cGUubmV4dDtkLnByb3RvdHlwZS5nZXRSZW1haW5pbmdTUUw9ZC5wcm90b3R5cGUuamM7ZS5wcm90b3R5cGUucnVuPWUucHJvdG90eXBlLkpiO2UucHJvdG90eXBlLmV4ZWM9ZS5wcm90b3R5cGUuZXhlYztlLnByb3RvdHlwZS5lYWNoPWUucHJvdG90eXBlLmVjO2UucHJvdG90eXBlLnByZXBhcmU9ZS5wcm90b3R5cGUuR2I7ZS5wcm90b3R5cGUuaXRlcmF0ZVN0YXRlbWVudHM9ZS5wcm90b3R5cGUucGM7ZS5wcm90b3R5cGVbXCJleHBvcnRcIl09ZS5wcm90b3R5cGUuZmM7ZS5wcm90b3R5cGUuY2xvc2U9ZS5wcm90b3R5cGUuY2xvc2U7ZS5wcm90b3R5cGUuaGFuZGxlRXJyb3I9ZS5wcm90b3R5cGUuaGFuZGxlRXJyb3I7ZS5wcm90b3R5cGUuZ2V0Um93c01vZGlmaWVkPWUucHJvdG90eXBlLmtjO2UucHJvdG90eXBlLmNyZWF0ZV9mdW5jdGlvbj1lLnByb3RvdHlwZS5iYztcbmUucHJvdG90eXBlLmNyZWF0ZV9hZ2dyZWdhdGU9ZS5wcm90b3R5cGUuYWM7ZS5wcm90b3R5cGUudXBkYXRlSG9vaz1lLnByb3RvdHlwZS52YztrLkRhdGFiYXNlPWV9O3ZhciB3YT1cIi4vdGhpcy5wcm9ncmFtXCIseGE9Z2xvYmFsVGhpcy5kb2N1bWVudD8uY3VycmVudFNjcmlwdD8uc3JjO2JhJiYoeGE9c2VsZi5sb2NhdGlvbi5ocmVmKTt2YXIgeWE9XCJcIix6YSxBYTtcbmlmKGFhfHxiYSl7dHJ5e3lhPShuZXcgVVJMKFwiLlwiLHhhKSkuaHJlZn1jYXRjaHt9YmEmJihBYT1hPT57dmFyIGI9bmV3IFhNTEh0dHBSZXF1ZXN0O2Iub3BlbihcIkdFVFwiLGEsITEpO2IucmVzcG9uc2VUeXBlPVwiYXJyYXlidWZmZXJcIjtiLnNlbmQobnVsbCk7cmV0dXJuIG5ldyBVaW50OEFycmF5KGIucmVzcG9uc2UpfSk7emE9YXN5bmMgYT0+e2E9YXdhaXQgZmV0Y2goYSx7Y3JlZGVudGlhbHM6XCJzYW1lLW9yaWdpblwifSk7aWYoYS5vaylyZXR1cm4gYS5hcnJheUJ1ZmZlcigpO3Rocm93IEVycm9yKGEuc3RhdHVzK1wiIDogXCIrYS51cmwpO319dmFyIEJhPWNvbnNvbGUubG9nLmJpbmQoY29uc29sZSksQj1jb25zb2xlLmVycm9yLmJpbmQoY29uc29sZSksQ2EsRGE9ITEsRWEsbSxDLEZhLEUsRixHYSxIYSxIO1xuZnVuY3Rpb24gSWEoKXt2YXIgYT1KYS5idWZmZXI7bT1uZXcgSW50OEFycmF5KGEpO0ZhPW5ldyBJbnQxNkFycmF5KGEpO0M9bmV3IFVpbnQ4QXJyYXkoYSk7bmV3IFVpbnQxNkFycmF5KGEpO0U9bmV3IEludDMyQXJyYXkoYSk7Rj1uZXcgVWludDMyQXJyYXkoYSk7R2E9bmV3IEZsb2F0MzJBcnJheShhKTtIYT1uZXcgRmxvYXQ2NEFycmF5KGEpO0g9bmV3IEJpZ0ludDY0QXJyYXkoYSk7bmV3IEJpZ1VpbnQ2NEFycmF5KGEpfWZ1bmN0aW9uIEthKGEpe2sub25BYm9ydD8uKGEpO2E9XCJBYm9ydGVkKFwiK2ErXCIpXCI7QihhKTtEYT0hMDt0aHJvdyBuZXcgV2ViQXNzZW1ibHkuUnVudGltZUVycm9yKGErXCIuIEJ1aWxkIHdpdGggLXNBU1NFUlRJT05TIGZvciBtb3JlIGluZm8uXCIpO312YXIgTGE7XG5hc3luYyBmdW5jdGlvbiBNYShhKXtpZighQ2EpdHJ5e3ZhciBiPWF3YWl0IHphKGEpO3JldHVybiBuZXcgVWludDhBcnJheShiKX1jYXRjaHt9aWYoYT09TGEmJkNhKWE9bmV3IFVpbnQ4QXJyYXkoQ2EpO2Vsc2UgaWYoQWEpYT1BYShhKTtlbHNlIHRocm93XCJib3RoIGFzeW5jIGFuZCBzeW5jIGZldGNoaW5nIG9mIHRoZSB3YXNtIGZhaWxlZFwiO3JldHVybiBhfWFzeW5jIGZ1bmN0aW9uIE5hKGEsYil7dHJ5e3ZhciBjPWF3YWl0IE1hKGEpO3JldHVybiBhd2FpdCBXZWJBc3NlbWJseS5pbnN0YW50aWF0ZShjLGIpfWNhdGNoKGQpe0IoYGZhaWxlZCB0byBhc3luY2hyb25vdXNseSBwcmVwYXJlIHdhc206ICR7ZH1gKSxLYShkKX19XG5hc3luYyBmdW5jdGlvbiBPYShhKXt2YXIgYj1MYTtpZighQ2EpdHJ5e3ZhciBjPWZldGNoKGIse2NyZWRlbnRpYWxzOlwic2FtZS1vcmlnaW5cIn0pO3JldHVybiBhd2FpdCBXZWJBc3NlbWJseS5pbnN0YW50aWF0ZVN0cmVhbWluZyhjLGEpfWNhdGNoKGQpe0IoYHdhc20gc3RyZWFtaW5nIGNvbXBpbGUgZmFpbGVkOiAke2R9YCksQihcImZhbGxpbmcgYmFjayB0byBBcnJheUJ1ZmZlciBpbnN0YW50aWF0aW9uXCIpfXJldHVybiBOYShiLGEpfWNsYXNzIFBhe25hbWU9XCJFeGl0U3RhdHVzXCI7Y29uc3RydWN0b3IoYSl7dGhpcy5tZXNzYWdlPWBQcm9ncmFtIHRlcm1pbmF0ZWQgd2l0aCBleGl0KCR7YX0pYDt0aGlzLnN0YXR1cz1hfX12YXIgUWE9YT0+e2Zvcig7MDxhLmxlbmd0aDspYS5zaGlmdCgpKGspfSxSYT1bXSxTYT1bXSxUYT0oKT0+e3ZhciBhPWsucHJlUnVuLnNoaWZ0KCk7U2EucHVzaChhKX0sSz0wLFVhPW51bGw7XG5mdW5jdGlvbiB0KGEsYj1cImk4XCIpe2IuZW5kc1dpdGgoXCIqXCIpJiYoYj1cIipcIik7c3dpdGNoKGIpe2Nhc2UgXCJpMVwiOnJldHVybiBtW2FdO2Nhc2UgXCJpOFwiOnJldHVybiBtW2FdO2Nhc2UgXCJpMTZcIjpyZXR1cm4gRmFbYT4+MV07Y2FzZSBcImkzMlwiOnJldHVybiBFW2E+PjJdO2Nhc2UgXCJpNjRcIjpyZXR1cm4gSFthPj4zXTtjYXNlIFwiZmxvYXRcIjpyZXR1cm4gR2FbYT4+Ml07Y2FzZSBcImRvdWJsZVwiOnJldHVybiBIYVthPj4zXTtjYXNlIFwiKlwiOnJldHVybiBGW2E+PjJdO2RlZmF1bHQ6S2EoYGludmFsaWQgdHlwZSBmb3IgZ2V0VmFsdWU6ICR7Yn1gKX19dmFyIFZhPSEwO1xuZnVuY3Rpb24gcWEoYSl7dmFyIGI9XCJpMzJcIjtiLmVuZHNXaXRoKFwiKlwiKSYmKGI9XCIqXCIpO3N3aXRjaChiKXtjYXNlIFwiaTFcIjptW2FdPTA7YnJlYWs7Y2FzZSBcImk4XCI6bVthXT0wO2JyZWFrO2Nhc2UgXCJpMTZcIjpGYVthPj4xXT0wO2JyZWFrO2Nhc2UgXCJpMzJcIjpFW2E+PjJdPTA7YnJlYWs7Y2FzZSBcImk2NFwiOkhbYT4+M109QmlnSW50KDApO2JyZWFrO2Nhc2UgXCJmbG9hdFwiOkdhW2E+PjJdPTA7YnJlYWs7Y2FzZSBcImRvdWJsZVwiOkhhW2E+PjNdPTA7YnJlYWs7Y2FzZSBcIipcIjpGW2E+PjJdPTA7YnJlYWs7ZGVmYXVsdDpLYShgaW52YWxpZCB0eXBlIGZvciBzZXRWYWx1ZTogJHtifWApfX1cbnZhciBXYT1uZXcgVGV4dERlY29kZXIsWGE9KGEsYixjLGQpPT57Yz1iK2M7aWYoZClyZXR1cm4gYztmb3IoO2FbYl0mJiEoYj49Yyk7KSsrYjtyZXR1cm4gYn0sej0oYSxiLGMpPT5hP1dhLmRlY29kZShDLnN1YmFycmF5KGEsWGEoQyxhLGIsYykpKTpcIlwiLFlhPShhLGIpPT57Zm9yKHZhciBjPTAsZD1hLmxlbmd0aC0xOzA8PWQ7ZC0tKXt2YXIgZT1hW2RdO1wiLlwiPT09ZT9hLnNwbGljZShkLDEpOlwiLi5cIj09PWU/KGEuc3BsaWNlKGQsMSksYysrKTpjJiYoYS5zcGxpY2UoZCwxKSxjLS0pfWlmKGIpZm9yKDtjO2MtLSlhLnVuc2hpZnQoXCIuLlwiKTtyZXR1cm4gYX0saGE9YT0+e3ZhciBiPVwiL1wiPT09YS5jaGFyQXQoMCksYz1cIi9cIj09PWEuc2xpY2UoLTEpOyhhPVlhKGEuc3BsaXQoXCIvXCIpLmZpbHRlcihkPT4hIWQpLCFiKS5qb2luKFwiL1wiKSl8fGJ8fChhPVwiLlwiKTthJiZjJiYoYSs9XCIvXCIpO3JldHVybihiP1wiL1wiOlwiXCIpK2F9LFphPWE9Pnt2YXIgYj0vXihcXC8/fCkoW1xcc1xcU10qPykoKD86XFwuezEsMn18W15cXC9dKz98KShcXC5bXi5cXC9dKnwpKSg/OltcXC9dKikkLy5leGVjKGEpLnNsaWNlKDEpO1xuYT1iWzBdO2I9YlsxXTtpZighYSYmIWIpcmV0dXJuXCIuXCI7YiYmPWIuc2xpY2UoMCwtMSk7cmV0dXJuIGErYn0sJGE9YT0+YSYmYS5tYXRjaCgvKFteXFwvXSt8XFwvKVxcLyokLylbMV0sYWI9KCk9PmE9PmNyeXB0by5nZXRSYW5kb21WYWx1ZXMoYSksYmI9YT0+eyhiYj1hYigpKShhKX0sY2I9KC4uLmEpPT57Zm9yKHZhciBiPVwiXCIsYz0hMSxkPWEubGVuZ3RoLTE7LTE8PWQmJiFjO2QtLSl7Yz0wPD1kP2FbZF06XCIvXCI7aWYoXCJzdHJpbmdcIiE9dHlwZW9mIGMpdGhyb3cgbmV3IFR5cGVFcnJvcihcIkFyZ3VtZW50cyB0byBwYXRoLnJlc29sdmUgbXVzdCBiZSBzdHJpbmdzXCIpO2lmKCFjKXJldHVyblwiXCI7Yj1jK1wiL1wiK2I7Yz1cIi9cIj09PWMuY2hhckF0KDApfWI9WWEoYi5zcGxpdChcIi9cIikuZmlsdGVyKGU9PiEhZSksIWMpLmpvaW4oXCIvXCIpO3JldHVybihjP1wiL1wiOlwiXCIpK2J8fFwiLlwifSxkYj1hPT57dmFyIGI9WGEoYSwwKTtyZXR1cm4gV2EuZGVjb2RlKGEuYnVmZmVyP2Euc3ViYXJyYXkoMCxiKTpcbm5ldyBVaW50OEFycmF5KGEuc2xpY2UoMCxiKSkpfSxmYj1bXSxnYj1hPT57Zm9yKHZhciBiPTAsYz0wO2M8YS5sZW5ndGg7KytjKXt2YXIgZD1hLmNoYXJDb2RlQXQoYyk7MTI3Pj1kP2IrKzoyMDQ3Pj1kP2IrPTI6NTUyOTY8PWQmJjU3MzQzPj1kPyhiKz00LCsrYyk6Yis9M31yZXR1cm4gYn0sTT0oYSxiLGMsZCk9PntpZighKDA8ZCkpcmV0dXJuIDA7dmFyIGU9YztkPWMrZC0xO2Zvcih2YXIgZz0wO2c8YS5sZW5ndGg7KytnKXt2YXIgaD1hLmNvZGVQb2ludEF0KGcpO2lmKDEyNz49aCl7aWYoYz49ZClicmVhaztiW2MrK109aH1lbHNlIGlmKDIwNDc+PWgpe2lmKGMrMT49ZClicmVhaztiW2MrK109MTkyfGg+PjY7YltjKytdPTEyOHxoJjYzfWVsc2UgaWYoNjU1MzU+PWgpe2lmKGMrMj49ZClicmVhaztiW2MrK109MjI0fGg+PjEyO2JbYysrXT0xMjh8aD4+NiY2MztiW2MrK109MTI4fGgmNjN9ZWxzZXtpZihjKzM+PWQpYnJlYWs7YltjKytdPTI0MHxoPj4xODtiW2MrK109MTI4fFxuaD4+MTImNjM7YltjKytdPTEyOHxoPj42JjYzO2JbYysrXT0xMjh8aCY2MztnKyt9fWJbY109MDtyZXR1cm4gYy1lfSxwYj1bXTtmdW5jdGlvbiBxYihhLGIpe3BiW2FdPXtpbnB1dDpbXSxvdXRwdXQ6W10sa2I6Yn07cmIoYSxzYil9XG52YXIgc2I9e29wZW4oYSl7dmFyIGI9cGJbYS5ub2RlLm5iXTtpZighYil0aHJvdyBuZXcgTig0Myk7YS5WYT1iO2Euc2Vla2FibGU9ITF9LGNsb3NlKGEpe2EuVmEua2IubGIoYS5WYSl9LGxiKGEpe2EuVmEua2IubGIoYS5WYSl9LHJlYWQoYSxiLGMsZCl7aWYoIWEuVmF8fCFhLlZhLmtiLlFiKXRocm93IG5ldyBOKDYwKTtmb3IodmFyIGU9MCxnPTA7ZzxkO2crKyl7dHJ5e3ZhciBoPWEuVmEua2IuUWIoYS5WYSl9Y2F0Y2gocSl7dGhyb3cgbmV3IE4oMjkpO31pZih2b2lkIDA9PT1oJiYwPT09ZSl0aHJvdyBuZXcgTig2KTtpZihudWxsPT09aHx8dm9pZCAwPT09aClicmVhaztlKys7YltjK2ddPWh9ZSYmKGEubm9kZS4kYT1EYXRlLm5vdygpKTtyZXR1cm4gZX0sd3JpdGUoYSxiLGMsZCl7aWYoIWEuVmF8fCFhLlZhLmtiLkhiKXRocm93IG5ldyBOKDYwKTt0cnl7Zm9yKHZhciBlPTA7ZTxkO2UrKylhLlZhLmtiLkhiKGEuVmEsYltjK2VdKX1jYXRjaChnKXt0aHJvdyBuZXcgTigyOSk7XG59ZCYmKGEubm9kZS5VYT1hLm5vZGUuVGE9RGF0ZS5ub3coKSk7cmV0dXJuIGV9fSx0Yj17UWIoKXthOntpZighZmIubGVuZ3RoKXt2YXIgYT1udWxsO2dsb2JhbFRoaXMud2luZG93Py5wcm9tcHQmJihhPXdpbmRvdy5wcm9tcHQoXCJJbnB1dDogXCIpLG51bGwhPT1hJiYoYSs9XCJcXG5cIikpO2lmKCFhKXt2YXIgYj1udWxsO2JyZWFrIGF9Yj1BcnJheShnYihhKSsxKTthPU0oYSxiLDAsYi5sZW5ndGgpO2IubGVuZ3RoPWE7ZmI9Yn1iPWZiLnNoaWZ0KCl9cmV0dXJuIGJ9LEhiKGEsYil7bnVsbD09PWJ8fDEwPT09Yj8oQmEoZGIoYS5vdXRwdXQpKSxhLm91dHB1dD1bXSk6MCE9YiYmYS5vdXRwdXQucHVzaChiKX0sbGIoYSl7MDxhLm91dHB1dD8ubGVuZ3RoJiYoQmEoZGIoYS5vdXRwdXQpKSxhLm91dHB1dD1bXSl9LERjKCl7cmV0dXJue3ljOjI1ODU2LEFjOjUseGM6MTkxLHpjOjM1Mzg3LHdjOlszLDI4LDEyNywyMSw0LDAsMSwwLDE3LDE5LDI2LDAsMTgsMTUsMjMsMjIsMCwwLDAsMCwwLFxuMCwwLDAsMCwwLDAsMCwwLDAsMCwwXX19LEVjKCl7cmV0dXJuIDB9LEZjKCl7cmV0dXJuWzI0LDgwXX19LHViPXtIYihhLGIpe251bGw9PT1ifHwxMD09PWI/KEIoZGIoYS5vdXRwdXQpKSxhLm91dHB1dD1bXSk6MCE9YiYmYS5vdXRwdXQucHVzaChiKX0sbGIoYSl7MDxhLm91dHB1dD8ubGVuZ3RoJiYoQihkYihhLm91dHB1dCkpLGEub3V0cHV0PVtdKX19LE89e1phOm51bGwsYWIoKXtyZXR1cm4gTy5jcmVhdGVOb2RlKG51bGwsXCIvXCIsMTY4OTUsMCl9LGNyZWF0ZU5vZGUoYSxiLGMsZCl7aWYoMjQ1NzY9PT0oYyY2MTQ0MCl8fDQwOTY9PT0oYyY2MTQ0MCkpdGhyb3cgbmV3IE4oNjMpO08uWmF8fChPLlphPXtkaXI6e25vZGU6e1dhOk8uTGEuV2EsWGE6Ty5MYS5YYSxtYjpPLkxhLm1iLHJiOk8uTGEucmIsVGI6Ty5MYS5UYix4YjpPLkxhLnhiLHZiOk8uTGEudmIsSWI6Ty5MYS5JYix3YjpPLkxhLndifSxzdHJlYW06e1lhOk8uTWEuWWF9fSxmaWxlOntub2RlOntXYTpPLkxhLldhLFhhOk8uTGEuWGF9LFxuc3RyZWFtOntZYTpPLk1hLllhLHJlYWQ6Ty5NYS5yZWFkLHdyaXRlOk8uTWEud3JpdGUsc2I6Ty5NYS5zYix0YjpPLk1hLnRifX0sbGluazp7bm9kZTp7V2E6Ty5MYS5XYSxYYTpPLkxhLlhhLGViOk8uTGEuZWJ9LHN0cmVhbTp7fX0sTmI6e25vZGU6e1dhOk8uTGEuV2EsWGE6Ty5MYS5YYX0sc3RyZWFtOnZifX0pO2M9d2IoYSxiLGMsZCk7UChjLm1vZGUpPyhjLkxhPU8uWmEuZGlyLm5vZGUsYy5NYT1PLlphLmRpci5zdHJlYW0sYy5OYT17fSk6MzI3Njg9PT0oYy5tb2RlJjYxNDQwKT8oYy5MYT1PLlphLmZpbGUubm9kZSxjLk1hPU8uWmEuZmlsZS5zdHJlYW0sYy5SYT0wLGMuTmE9bnVsbCk6NDA5NjA9PT0oYy5tb2RlJjYxNDQwKT8oYy5MYT1PLlphLmxpbmsubm9kZSxjLk1hPU8uWmEubGluay5zdHJlYW0pOjgxOTI9PT0oYy5tb2RlJjYxNDQwKSYmKGMuTGE9Ty5aYS5OYi5ub2RlLGMuTWE9Ty5aYS5OYi5zdHJlYW0pO2MuJGE9Yy5VYT1jLlRhPURhdGUubm93KCk7YSYmKGEuTmFbYl09XG5jLGEuJGE9YS5VYT1hLlRhPWMuJGEpO3JldHVybiBjfSxDYyhhKXtyZXR1cm4gYS5OYT9hLk5hLnN1YmFycmF5P2EuTmEuc3ViYXJyYXkoMCxhLlJhKTpuZXcgVWludDhBcnJheShhLk5hKTpuZXcgVWludDhBcnJheSgwKX0sTGE6e1dhKGEpe3ZhciBiPXt9O2IuY2M9ODE5Mj09PShhLm1vZGUmNjE0NDApP2EuaWQ6MTtiLm9jPWEuaWQ7Yi5tb2RlPWEubW9kZTtiLnJjPTE7Yi51aWQ9MDtiLm5jPTA7Yi5uYj1hLm5iO1AoYS5tb2RlKT9iLnNpemU9NDA5NjozMjc2OD09PShhLm1vZGUmNjE0NDApP2Iuc2l6ZT1hLlJhOjQwOTYwPT09KGEubW9kZSY2MTQ0MCk/Yi5zaXplPWEubGluay5sZW5ndGg6Yi5zaXplPTA7Yi4kYT1uZXcgRGF0ZShhLiRhKTtiLlVhPW5ldyBEYXRlKGEuVWEpO2IuVGE9bmV3IERhdGUoYS5UYSk7Yi5aYj00MDk2O2IuJGI9TWF0aC5jZWlsKGIuc2l6ZS9iLlpiKTtyZXR1cm4gYn0sWGEoYSxiKXtmb3IodmFyIGMgb2ZbXCJtb2RlXCIsXCJhdGltZVwiLFwibXRpbWVcIixcImN0aW1lXCJdKW51bGwhPVxuYltjXSYmKGFbY109YltjXSk7dm9pZCAwIT09Yi5zaXplJiYoYj1iLnNpemUsYS5SYSE9YiYmKDA9PWI/KGEuTmE9bnVsbCxhLlJhPTApOihjPWEuTmEsYS5OYT1uZXcgVWludDhBcnJheShiKSxjJiZhLk5hLnNldChjLnN1YmFycmF5KDAsTWF0aC5taW4oYixhLlJhKSkpLGEuUmE9YikpKX0sbWIoKXtPLnpifHwoTy56Yj1uZXcgTig0NCksTy56Yi5zdGFjaz1cIjxnZW5lcmljIGVycm9yLCBubyBzdGFjaz5cIik7dGhyb3cgTy56Yjt9LHJiKGEsYixjLGQpe3JldHVybiBPLmNyZWF0ZU5vZGUoYSxiLGMsZCl9LFRiKGEsYixjKXt0cnl7dmFyIGQ9UShiLGMpfWNhdGNoKGcpe31pZihkKXtpZihQKGEubW9kZSkpZm9yKHZhciBlIGluIGQuTmEpdGhyb3cgbmV3IE4oNTUpO3hiKGQpfWRlbGV0ZSBhLnBhcmVudC5OYVthLm5hbWVdO2IuTmFbY109YTthLm5hbWU9YztiLlRhPWIuVWE9YS5wYXJlbnQuVGE9YS5wYXJlbnQuVWE9RGF0ZS5ub3coKX0seGIoYSxiKXtkZWxldGUgYS5OYVtiXTthLlRhPVxuYS5VYT1EYXRlLm5vdygpfSx2YihhLGIpe3ZhciBjPVEoYSxiKSxkO2ZvcihkIGluIGMuTmEpdGhyb3cgbmV3IE4oNTUpO2RlbGV0ZSBhLk5hW2JdO2EuVGE9YS5VYT1EYXRlLm5vdygpfSxJYihhKXtyZXR1cm5bXCIuXCIsXCIuLlwiLC4uLk9iamVjdC5rZXlzKGEuTmEpXX0sd2IoYSxiLGMpe2E9Ty5jcmVhdGVOb2RlKGEsYiw0MTQ3MSwwKTthLmxpbms9YztyZXR1cm4gYX0sZWIoYSl7aWYoNDA5NjAhPT0oYS5tb2RlJjYxNDQwKSl0aHJvdyBuZXcgTigyOCk7cmV0dXJuIGEubGlua319LE1hOntyZWFkKGEsYixjLGQsZSl7dmFyIGc9YS5ub2RlLk5hO2lmKGU+PWEubm9kZS5SYSlyZXR1cm4gMDthPU1hdGgubWluKGEubm9kZS5SYS1lLGQpO2lmKDg8YSYmZy5zdWJhcnJheSliLnNldChnLnN1YmFycmF5KGUsZSthKSxjKTtlbHNlIGZvcihkPTA7ZDxhO2QrKyliW2MrZF09Z1tlK2RdO3JldHVybiBhfSx3cml0ZShhLGIsYyxkLGUsZyl7Yi5idWZmZXI9PT1tLmJ1ZmZlciYmKGc9ITEpO2lmKCFkKXJldHVybiAwO1xuYT1hLm5vZGU7YS5VYT1hLlRhPURhdGUubm93KCk7aWYoYi5zdWJhcnJheSYmKCFhLk5hfHxhLk5hLnN1YmFycmF5KSl7aWYoZylyZXR1cm4gYS5OYT1iLnN1YmFycmF5KGMsYytkKSxhLlJhPWQ7aWYoMD09PWEuUmEmJjA9PT1lKXJldHVybiBhLk5hPWIuc2xpY2UoYyxjK2QpLGEuUmE9ZDtpZihlK2Q8PWEuUmEpcmV0dXJuIGEuTmEuc2V0KGIuc3ViYXJyYXkoYyxjK2QpLGUpLGR9Zz1lK2Q7dmFyIGg9YS5OYT9hLk5hLmxlbmd0aDowO2g+PWd8fChnPU1hdGgubWF4KGcsaCooMTA0ODU3Nj5oPzI6MS4xMjUpPj4+MCksMCE9aCYmKGc9TWF0aC5tYXgoZywyNTYpKSxoPWEuTmEsYS5OYT1uZXcgVWludDhBcnJheShnKSwwPGEuUmEmJmEuTmEuc2V0KGguc3ViYXJyYXkoMCxhLlJhKSwwKSk7aWYoYS5OYS5zdWJhcnJheSYmYi5zdWJhcnJheSlhLk5hLnNldChiLnN1YmFycmF5KGMsYytkKSxlKTtlbHNlIGZvcihnPTA7ZzxkO2crKylhLk5hW2UrZ109YltjK2ddO2EuUmE9TWF0aC5tYXgoYS5SYSxcbmUrZCk7cmV0dXJuIGR9LFlhKGEsYixjKXsxPT09Yz9iKz1hLnBvc2l0aW9uOjI9PT1jJiYzMjc2OD09PShhLm5vZGUubW9kZSY2MTQ0MCkmJihiKz1hLm5vZGUuUmEpO2lmKDA+Yil0aHJvdyBuZXcgTigyOCk7cmV0dXJuIGJ9LHNiKGEsYixjLGQsZSl7aWYoMzI3NjghPT0oYS5ub2RlLm1vZGUmNjE0NDApKXRocm93IG5ldyBOKDQzKTthPWEubm9kZS5OYTtpZihlJjJ8fCFhfHxhLmJ1ZmZlciE9PW0uYnVmZmVyKXtlPSEwO2Q9NjU1MzYqTWF0aC5jZWlsKGIvNjU1MzYpO3ZhciBnPXliKDY1NTM2LGQpO2cmJkMuZmlsbCgwLGcsZytkKTtkPWc7aWYoIWQpdGhyb3cgbmV3IE4oNDgpO2lmKGEpe2lmKDA8Y3x8YytiPGEubGVuZ3RoKWEuc3ViYXJyYXk/YT1hLnN1YmFycmF5KGMsYytiKTphPUFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGEsYyxjK2IpO20uc2V0KGEsZCl9fWVsc2UgZT0hMSxkPWEuYnl0ZU9mZnNldDtyZXR1cm57dGM6ZCxVYjplfX0sdGIoYSxiLGMsZCl7Ty5NYS53cml0ZShhLFxuYiwwLGQsYywhMSk7cmV0dXJuIDB9fX0saWE9KGEsYik9Pnt2YXIgYz0wO2EmJihjfD0zNjUpO2ImJihjfD0xNDYpO3JldHVybiBjfSx6Yj1udWxsLEFiPXt9LEJiPVtdLENiPTEsUj1udWxsLERiPSExLEViPSEwLEZiPXt9LE49Y2xhc3N7bmFtZT1cIkVycm5vRXJyb3JcIjtjb25zdHJ1Y3RvcihhKXt0aGlzLlBhPWF9fSxHYj1jbGFzc3txYj17fTtub2RlPW51bGw7Z2V0IGZsYWdzKCl7cmV0dXJuIHRoaXMucWIuZmxhZ3N9c2V0IGZsYWdzKGEpe3RoaXMucWIuZmxhZ3M9YX1nZXQgcG9zaXRpb24oKXtyZXR1cm4gdGhpcy5xYi5wb3NpdGlvbn1zZXQgcG9zaXRpb24oYSl7dGhpcy5xYi5wb3NpdGlvbj1hfX0sSGI9Y2xhc3N7TGE9e307TWE9e307aWI9bnVsbDtjb25zdHJ1Y3RvcihhLGIsYyxkKXthfHw9dGhpczt0aGlzLnBhcmVudD1hO3RoaXMuYWI9YS5hYjt0aGlzLmlkPUNiKys7dGhpcy5uYW1lPWI7dGhpcy5tb2RlPWM7dGhpcy5uYj1kO3RoaXMuJGE9dGhpcy5VYT10aGlzLlRhPURhdGUubm93KCl9Z2V0IHJlYWQoKXtyZXR1cm4gMzY1PT09XG4odGhpcy5tb2RlJjM2NSl9c2V0IHJlYWQoYSl7YT90aGlzLm1vZGV8PTM2NTp0aGlzLm1vZGUmPS0zNjZ9Z2V0IHdyaXRlKCl7cmV0dXJuIDE0Nj09PSh0aGlzLm1vZGUmMTQ2KX1zZXQgd3JpdGUoYSl7YT90aGlzLm1vZGV8PTE0Njp0aGlzLm1vZGUmPS0xNDd9fTtcbmZ1bmN0aW9uIFMoYSxiPXt9KXtpZighYSl0aHJvdyBuZXcgTig0NCk7Yi5CYj8/KGIuQmI9ITApO1wiL1wiPT09YS5jaGFyQXQoMCl8fChhPVwiLy9cIithKTt2YXIgYz0wO2E6Zm9yKDs0MD5jO2MrKyl7YT1hLnNwbGl0KFwiL1wiKS5maWx0ZXIocT0+ISFxKTtmb3IodmFyIGQ9emIsZT1cIi9cIixnPTA7ZzxhLmxlbmd0aDtnKyspe3ZhciBoPWc9PT1hLmxlbmd0aC0xO2lmKGgmJmIucGFyZW50KWJyZWFrO2lmKFwiLlwiIT09YVtnXSlpZihcIi4uXCI9PT1hW2ddKWlmKGU9WmEoZSksZD09PWQucGFyZW50KXthPWUrXCIvXCIrYS5zbGljZShnKzEpLmpvaW4oXCIvXCIpO2MtLTtjb250aW51ZSBhfWVsc2UgZD1kLnBhcmVudDtlbHNle2U9aGEoZStcIi9cIithW2ddKTt0cnl7ZD1RKGQsYVtnXSl9Y2F0Y2gocSl7aWYoNDQ9PT1xPy5QYSYmaCYmYi5zYylyZXR1cm57cGF0aDplfTt0aHJvdyBxO30hZC5pYnx8aCYmIWIuQmJ8fChkPWQuaWIucm9vdCk7aWYoNDA5NjA9PT0oZC5tb2RlJjYxNDQwKSYmKCFofHxiLmhiKSl7aWYoIWQuTGEuZWIpdGhyb3cgbmV3IE4oNTIpO1xuZD1kLkxhLmViKGQpO1wiL1wiPT09ZC5jaGFyQXQoMCl8fChkPVphKGUpK1wiL1wiK2QpO2E9ZCtcIi9cIithLnNsaWNlKGcrMSkuam9pbihcIi9cIik7Y29udGludWUgYX19fXJldHVybntwYXRoOmUsbm9kZTpkfX10aHJvdyBuZXcgTigzMik7fWZ1bmN0aW9uIGZhKGEpe2Zvcih2YXIgYjs7KXtpZihhPT09YS5wYXJlbnQpcmV0dXJuIGE9YS5hYi5TYixiP1wiL1wiIT09YVthLmxlbmd0aC0xXT9gJHthfS8ke2J9YDphK2I6YTtiPWI/YCR7YS5uYW1lfS8ke2J9YDphLm5hbWU7YT1hLnBhcmVudH19ZnVuY3Rpb24gSWIoYSxiKXtmb3IodmFyIGM9MCxkPTA7ZDxiLmxlbmd0aDtkKyspYz0oYzw8NSktYytiLmNoYXJDb2RlQXQoZCl8MDtyZXR1cm4oYStjPj4+MCklUi5sZW5ndGh9ZnVuY3Rpb24geGIoYSl7dmFyIGI9SWIoYS5wYXJlbnQuaWQsYS5uYW1lKTtpZihSW2JdPT09YSlSW2JdPWEuamI7ZWxzZSBmb3IoYj1SW2JdO2I7KXtpZihiLmpiPT09YSl7Yi5qYj1hLmpiO2JyZWFrfWI9Yi5qYn19XG5mdW5jdGlvbiBRKGEsYil7dmFyIGM9UChhLm1vZGUpPyhjPUpiKGEsXCJ4XCIpKT9jOmEuTGEubWI/MDoyOjU0O2lmKGMpdGhyb3cgbmV3IE4oYyk7Zm9yKGM9UltJYihhLmlkLGIpXTtjO2M9Yy5qYil7dmFyIGQ9Yy5uYW1lO2lmKGMucGFyZW50LmlkPT09YS5pZCYmZD09PWIpcmV0dXJuIGN9cmV0dXJuIGEuTGEubWIoYSxiKX1mdW5jdGlvbiB3YihhLGIsYyxkKXthPW5ldyBIYihhLGIsYyxkKTtiPUliKGEucGFyZW50LmlkLGEubmFtZSk7YS5qYj1SW2JdO3JldHVybiBSW2JdPWF9ZnVuY3Rpb24gUChhKXtyZXR1cm4gMTYzODQ9PT0oYSY2MTQ0MCl9ZnVuY3Rpb24gS2IoYSl7dmFyIGI9W1wiclwiLFwid1wiLFwicndcIl1bYSYzXTthJjUxMiYmKGIrPVwid1wiKTtyZXR1cm4gYn1cbmZ1bmN0aW9uIEpiKGEsYil7aWYoRWIpcmV0dXJuIDA7aWYoIWIuaW5jbHVkZXMoXCJyXCIpfHxhLm1vZGUmMjkyKXtpZihiLmluY2x1ZGVzKFwid1wiKSYmIShhLm1vZGUmMTQ2KXx8Yi5pbmNsdWRlcyhcInhcIikmJiEoYS5tb2RlJjczKSlyZXR1cm4gMn1lbHNlIHJldHVybiAyO3JldHVybiAwfWZ1bmN0aW9uIExiKGEsYil7aWYoIVAoYS5tb2RlKSlyZXR1cm4gNTQ7dHJ5e3JldHVybiBRKGEsYiksMjB9Y2F0Y2goYyl7fXJldHVybiBKYihhLFwid3hcIil9ZnVuY3Rpb24gTWIoYSxiLGMpe3RyeXt2YXIgZD1RKGEsYil9Y2F0Y2goZSl7cmV0dXJuIGUuUGF9aWYoYT1KYihhLFwid3hcIikpcmV0dXJuIGE7aWYoYyl7aWYoIVAoZC5tb2RlKSlyZXR1cm4gNTQ7aWYoZD09PWQucGFyZW50fHxcIi9cIj09PWZhKGQpKXJldHVybiAxMH1lbHNlIGlmKFAoZC5tb2RlKSlyZXR1cm4gMzE7cmV0dXJuIDB9ZnVuY3Rpb24gTmIoYSl7aWYoIWEpdGhyb3cgbmV3IE4oNjMpO3JldHVybiBhfVxuZnVuY3Rpb24gVChhKXthPUJiW2FdO2lmKCFhKXRocm93IG5ldyBOKDgpO3JldHVybiBhfWZ1bmN0aW9uIE9iKGEsYj0tMSl7YT1PYmplY3QuYXNzaWduKG5ldyBHYixhKTtpZigtMT09YilhOntmb3IoYj0wOzQwOTY+PWI7YisrKWlmKCFCYltiXSlicmVhayBhO3Rocm93IG5ldyBOKDMzKTt9YS5iYj1iO3JldHVybiBCYltiXT1hfWZ1bmN0aW9uIFBiKGEsYj0tMSl7YT1PYihhLGIpO2EuTWE/LkJjPy4oYSk7cmV0dXJuIGF9ZnVuY3Rpb24gUWIoYSxiLGMpe3ZhciBkPWE/Lk1hLlhhO2E9ZD9hOmI7ZD8/PWIuTGEuWGE7TmIoZCk7ZChhLGMpfXZhciB2Yj17b3BlbihhKXthLk1hPUFiW2Eubm9kZS5uYl0uTWE7YS5NYS5vcGVuPy4oYSl9LFlhKCl7dGhyb3cgbmV3IE4oNzApO319O2Z1bmN0aW9uIHJiKGEsYil7QWJbYV09e01hOmJ9fVxuZnVuY3Rpb24gUmIoYSxiKXt2YXIgYz1cIi9cIj09PWI7aWYoYyYmemIpdGhyb3cgbmV3IE4oMTApO2lmKCFjJiZiKXt2YXIgZD1TKGIse0JiOiExfSk7Yj1kLnBhdGg7ZD1kLm5vZGU7aWYoZC5pYil0aHJvdyBuZXcgTigxMCk7aWYoIVAoZC5tb2RlKSl0aHJvdyBuZXcgTig1NCk7fWI9e3R5cGU6YSxHYzp7fSxTYjpiLHFjOltdfTthPWEuYWIoYik7YS5hYj1iO2Iucm9vdD1hO2M/emI9YTpkJiYoZC5pYj1iLGQuYWImJmQuYWIucWMucHVzaChiKSl9ZnVuY3Rpb24gU2IoYSxiLGMpe3ZhciBkPVMoYSx7cGFyZW50OiEwfSkubm9kZTthPSRhKGEpO2lmKCFhKXRocm93IG5ldyBOKDI4KTtpZihcIi5cIj09PWF8fFwiLi5cIj09PWEpdGhyb3cgbmV3IE4oMjApO3ZhciBlPUxiKGQsYSk7aWYoZSl0aHJvdyBuZXcgTihlKTtpZighZC5MYS5yYil0aHJvdyBuZXcgTig2Myk7cmV0dXJuIGQuTGEucmIoZCxhLGIsYyl9XG5mdW5jdGlvbiBqYShhLGI9NDM4KXtyZXR1cm4gU2IoYSxiJjQwOTV8MzI3NjgsMCl9ZnVuY3Rpb24gVShhLGI9NTExKXtyZXR1cm4gU2IoYSxiJjEwMjN8MTYzODQsMCl9ZnVuY3Rpb24gVGIoYSxiLGMpe1widW5kZWZpbmVkXCI9PXR5cGVvZiBjJiYoYz1iLGI9NDM4KTtTYihhLGJ8ODE5MixjKX1mdW5jdGlvbiBVYihhLGIpe2lmKCFjYihhKSl0aHJvdyBuZXcgTig0NCk7dmFyIGM9UyhiLHtwYXJlbnQ6ITB9KS5ub2RlO2lmKCFjKXRocm93IG5ldyBOKDQ0KTtiPSRhKGIpO3ZhciBkPUxiKGMsYik7aWYoZCl0aHJvdyBuZXcgTihkKTtpZighYy5MYS53Yil0aHJvdyBuZXcgTig2Myk7Yy5MYS53YihjLGIsYSl9XG5mdW5jdGlvbiBWYihhKXt2YXIgYj1TKGEse3BhcmVudDohMH0pLm5vZGU7YT0kYShhKTt2YXIgYz1RKGIsYSksZD1NYihiLGEsITApO2lmKGQpdGhyb3cgbmV3IE4oZCk7aWYoIWIuTGEudmIpdGhyb3cgbmV3IE4oNjMpO2lmKGMuaWIpdGhyb3cgbmV3IE4oMTApO2IuTGEudmIoYixhKTt4YihjKX1mdW5jdGlvbiB0YShhKXt2YXIgYj1TKGEse3BhcmVudDohMH0pLm5vZGU7aWYoIWIpdGhyb3cgbmV3IE4oNDQpO2E9JGEoYSk7dmFyIGM9UShiLGEpLGQ9TWIoYixhLCExKTtpZihkKXRocm93IG5ldyBOKGQpO2lmKCFiLkxhLnhiKXRocm93IG5ldyBOKDYzKTtpZihjLmliKXRocm93IG5ldyBOKDEwKTtiLkxhLnhiKGIsYSk7eGIoYyl9ZnVuY3Rpb24gV2IoYSxiKXthPVMoYSx7aGI6IWJ9KS5ub2RlO3JldHVybiBOYihhLkxhLldhKShhKX1mdW5jdGlvbiBYYihhLGIsYyxkKXtRYihhLGIse21vZGU6YyY0MDk1fGIubW9kZSYtNDA5NixUYTpEYXRlLm5vdygpLGRjOmR9KX1cbmZ1bmN0aW9uIGthKGEsYil7YT1cInN0cmluZ1wiPT10eXBlb2YgYT9TKGEse2hiOiEwfSkubm9kZTphO1hiKG51bGwsYSxiKX1mdW5jdGlvbiBZYihhLGIsYyl7aWYoUChiLm1vZGUpKXRocm93IG5ldyBOKDMxKTtpZigzMjc2OCE9PShiLm1vZGUmNjE0NDApKXRocm93IG5ldyBOKDI4KTt2YXIgZD1KYihiLFwid1wiKTtpZihkKXRocm93IG5ldyBOKGQpO1FiKGEsYix7c2l6ZTpjLHRpbWVzdGFtcDpEYXRlLm5vdygpfSl9XG5mdW5jdGlvbiBtYShhLGIsYz00Mzgpe2lmKFwiXCI9PT1hKXRocm93IG5ldyBOKDQ0KTtpZihcInN0cmluZ1wiPT10eXBlb2YgYil7dmFyIGQ9e3I6MCxcInIrXCI6Mix3OjU3NyxcIncrXCI6NTc4LGE6MTA4OSxcImErXCI6MTA5MH1bYl07aWYoXCJ1bmRlZmluZWRcIj09dHlwZW9mIGQpdGhyb3cgRXJyb3IoYFVua25vd24gZmlsZSBvcGVuIG1vZGU6ICR7Yn1gKTtiPWR9Yz1iJjY0P2MmNDA5NXwzMjc2ODowO2lmKFwib2JqZWN0XCI9PXR5cGVvZiBhKWQ9YTtlbHNle3ZhciBlPWEuZW5kc1dpdGgoXCIvXCIpO2E9UyhhLHtoYjohKGImMTMxMDcyKSxzYzohMH0pO2Q9YS5ub2RlO2E9YS5wYXRofXZhciBnPSExO2lmKGImNjQpaWYoZCl7aWYoYiYxMjgpdGhyb3cgbmV3IE4oMjApO31lbHNle2lmKGUpdGhyb3cgbmV3IE4oMzEpO2Q9U2IoYSxjfDUxMSwwKTtnPSEwfWlmKCFkKXRocm93IG5ldyBOKDQ0KTs4MTkyPT09KGQubW9kZSY2MTQ0MCkmJihiJj0tNTEzKTtpZihiJjY1NTM2JiYhUChkLm1vZGUpKXRocm93IG5ldyBOKDU0KTtcbmlmKCFnJiYoZT1kPzQwOTYwPT09KGQubW9kZSY2MTQ0MCk/MzI6UChkLm1vZGUpJiYoXCJyXCIhPT1LYihiKXx8YiY1NzYpPzMxOkpiKGQsS2IoYikpOjQ0KSl0aHJvdyBuZXcgTihlKTtiJjUxMiYmIWcmJihlPWQsZT1cInN0cmluZ1wiPT10eXBlb2YgZT9TKGUse2hiOiEwfSkubm9kZTplLFliKG51bGwsZSwwKSk7YiY9LTEzMTcxMztlPU9iKHtub2RlOmQscGF0aDpmYShkKSxmbGFnczpiLHNlZWthYmxlOiEwLHBvc2l0aW9uOjAsTWE6ZC5NYSx1YzpbXSxlcnJvcjohMX0pO2UuTWEub3BlbiYmZS5NYS5vcGVuKGUpO2cmJmthKGQsYyY1MTEpOyFrLmxvZ1JlYWRGaWxlc3x8YiYxfHxhIGluIEZifHwoRmJbYV09MSk7cmV0dXJuIGV9ZnVuY3Rpb24gb2EoYSl7aWYobnVsbD09PWEuYmIpdGhyb3cgbmV3IE4oOCk7YS5FYiYmKGEuRWI9bnVsbCk7dHJ5e2EuTWEuY2xvc2UmJmEuTWEuY2xvc2UoYSl9Y2F0Y2goYil7dGhyb3cgYjt9ZmluYWxseXtCYlthLmJiXT1udWxsfWEuYmI9bnVsbH1cbmZ1bmN0aW9uIFpiKGEsYixjKXtpZihudWxsPT09YS5iYil0aHJvdyBuZXcgTig4KTtpZighYS5zZWVrYWJsZXx8IWEuTWEuWWEpdGhyb3cgbmV3IE4oNzApO2lmKDAhPWMmJjEhPWMmJjIhPWMpdGhyb3cgbmV3IE4oMjgpO2EucG9zaXRpb249YS5NYS5ZYShhLGIsYyk7YS51Yz1bXX1mdW5jdGlvbiAkYihhLGIsYyxkLGUpe2lmKDA+ZHx8MD5lKXRocm93IG5ldyBOKDI4KTtpZihudWxsPT09YS5iYil0aHJvdyBuZXcgTig4KTtpZigxPT09KGEuZmxhZ3MmMjA5NzE1NSkpdGhyb3cgbmV3IE4oOCk7aWYoUChhLm5vZGUubW9kZSkpdGhyb3cgbmV3IE4oMzEpO2lmKCFhLk1hLnJlYWQpdGhyb3cgbmV3IE4oMjgpO3ZhciBnPVwidW5kZWZpbmVkXCIhPXR5cGVvZiBlO2lmKCFnKWU9YS5wb3NpdGlvbjtlbHNlIGlmKCFhLnNlZWthYmxlKXRocm93IG5ldyBOKDcwKTtiPWEuTWEucmVhZChhLGIsYyxkLGUpO2d8fChhLnBvc2l0aW9uKz1iKTtyZXR1cm4gYn1cbmZ1bmN0aW9uIG5hKGEsYixjLGQsZSl7aWYoMD5kfHwwPmUpdGhyb3cgbmV3IE4oMjgpO2lmKG51bGw9PT1hLmJiKXRocm93IG5ldyBOKDgpO2lmKDA9PT0oYS5mbGFncyYyMDk3MTU1KSl0aHJvdyBuZXcgTig4KTtpZihQKGEubm9kZS5tb2RlKSl0aHJvdyBuZXcgTigzMSk7aWYoIWEuTWEud3JpdGUpdGhyb3cgbmV3IE4oMjgpO2Euc2Vla2FibGUmJmEuZmxhZ3MmMTAyNCYmWmIoYSwwLDIpO3ZhciBnPVwidW5kZWZpbmVkXCIhPXR5cGVvZiBlO2lmKCFnKWU9YS5wb3NpdGlvbjtlbHNlIGlmKCFhLnNlZWthYmxlKXRocm93IG5ldyBOKDcwKTtiPWEuTWEud3JpdGUoYSxiLGMsZCxlLHZvaWQgMCk7Z3x8KGEucG9zaXRpb24rPWIpO3JldHVybiBifVxuZnVuY3Rpb24gc2EoYSl7dmFyIGI9Ynx8MDt2YXIgYz1cImJpbmFyeVwiO1widXRmOFwiIT09YyYmXCJiaW5hcnlcIiE9PWMmJkthKGBJbnZhbGlkIGVuY29kaW5nIHR5cGUgXCIke2N9XCJgKTtiPW1hKGEsYik7YT1XYihhKS5zaXplO3ZhciBkPW5ldyBVaW50OEFycmF5KGEpOyRiKGIsZCwwLGEsMCk7XCJ1dGY4XCI9PT1jJiYoZD1kYihkKSk7b2EoYik7cmV0dXJuIGR9XG5mdW5jdGlvbiBXKGEsYixjKXthPWhhKFwiL2Rldi9cIithKTt2YXIgZD1pYSghIWIsISFjKTtXLlJiPz8oVy5SYj02NCk7dmFyIGU9Vy5SYisrPDw4fDA7cmIoZSx7b3BlbihnKXtnLnNlZWthYmxlPSExfSxjbG9zZSgpe2M/LmJ1ZmZlcj8ubGVuZ3RoJiZjKDEwKX0scmVhZChnLGgscSx3KXtmb3IodmFyIHU9MCx4PTA7eDx3O3grKyl7dHJ5e3ZhciBEPWIoKX1jYXRjaChpYil7dGhyb3cgbmV3IE4oMjkpO31pZih2b2lkIDA9PT1EJiYwPT09dSl0aHJvdyBuZXcgTig2KTtpZihudWxsPT09RHx8dm9pZCAwPT09RClicmVhazt1Kys7aFtxK3hdPUR9dSYmKGcubm9kZS4kYT1EYXRlLm5vdygpKTtyZXR1cm4gdX0sd3JpdGUoZyxoLHEsdyl7Zm9yKHZhciB1PTA7dTx3O3UrKyl0cnl7YyhoW3ErdV0pfWNhdGNoKHgpe3Rocm93IG5ldyBOKDI5KTt9dyYmKGcubm9kZS5VYT1nLm5vZGUuVGE9RGF0ZS5ub3coKSk7cmV0dXJuIHV9fSk7VGIoYSxkLGUpfXZhciBYPXt9O1xuZnVuY3Rpb24gWShhLGIsYyl7aWYoXCIvXCI9PT1iLmNoYXJBdCgwKSlyZXR1cm4gYjthPS0xMDA9PT1hP1wiL1wiOlQoYSkucGF0aDtpZigwPT1iLmxlbmd0aCl7aWYoIWMpdGhyb3cgbmV3IE4oNDQpO3JldHVybiBhfXJldHVybiBhK1wiL1wiK2J9XG5mdW5jdGlvbiBhYyhhLGIpe0ZbYT4+Ml09Yi5jYztGW2ErND4+Ml09Yi5tb2RlO0ZbYSs4Pj4yXT1iLnJjO0ZbYSsxMj4+Ml09Yi51aWQ7RlthKzE2Pj4yXT1iLm5jO0ZbYSsyMD4+Ml09Yi5uYjtIW2ErMjQ+PjNdPUJpZ0ludChiLnNpemUpO0VbYSszMj4+Ml09NDA5NjtFW2ErMzY+PjJdPWIuJGI7dmFyIGM9Yi4kYS5nZXRUaW1lKCksZD1iLlVhLmdldFRpbWUoKSxlPWIuVGEuZ2V0VGltZSgpO0hbYSs0MD4+M109QmlnSW50KE1hdGguZmxvb3IoYy8xRTMpKTtGW2ErNDg+PjJdPWMlMUUzKjFFNjtIW2ErNTY+PjNdPUJpZ0ludChNYXRoLmZsb29yKGQvMUUzKSk7RlthKzY0Pj4yXT1kJTFFMyoxRTY7SFthKzcyPj4zXT1CaWdJbnQoTWF0aC5mbG9vcihlLzFFMykpO0ZbYSs4MD4+Ml09ZSUxRTMqMUU2O0hbYSs4OD4+M109QmlnSW50KGIub2MpO3JldHVybiAwfVxudmFyIGtjPXZvaWQgMCxDYz0oKT0+e3ZhciBhPUVbK2tjPj4yXTtrYys9NDtyZXR1cm4gYX0sRWM9MCxGYz1bMCwzMSw2MCw5MSwxMjEsMTUyLDE4MiwyMTMsMjQ0LDI3NCwzMDUsMzM1XSxHYz1bMCwzMSw1OSw5MCwxMjAsMTUxLDE4MSwyMTIsMjQzLDI3MywzMDQsMzM0XSxIYz17fSxJYz1hPT57aWYoIShhIGluc3RhbmNlb2YgUGF8fFwidW53aW5kXCI9PWEpKXRocm93IGE7fSxKYz1hPT57RWE9YTtWYXx8MDxFY3x8KGsub25FeGl0Py4oYSksRGE9ITApO3Rocm93IG5ldyBQYShhKTt9LEtjPWE9PntpZighRGEpdHJ5e2EoKX1jYXRjaChiKXtJYyhiKX1maW5hbGx5e2lmKCEoVmF8fDA8RWMpKXRyeXtFYT1hPUVhLEpjKGEpfWNhdGNoKGIpe0ljKGIpfX19LExjPXt9LE5jPSgpPT57aWYoIU1jKXt2YXIgYT17VVNFUjpcIndlYl91c2VyXCIsTE9HTkFNRTpcIndlYl91c2VyXCIsUEFUSDpcIi9cIixQV0Q6XCIvXCIsSE9NRTpcIi9ob21lL3dlYl91c2VyXCIsTEFORzooZ2xvYmFsVGhpcy5uYXZpZ2F0b3I/Lmxhbmd1YWdlPz9cblwiQ1wiKS5yZXBsYWNlKFwiLVwiLFwiX1wiKStcIi5VVEYtOFwiLF86d2F8fFwiLi90aGlzLnByb2dyYW1cIn0sYjtmb3IoYiBpbiBMYyl2b2lkIDA9PT1MY1tiXT9kZWxldGUgYVtiXTphW2JdPUxjW2JdO3ZhciBjPVtdO2ZvcihiIGluIGEpYy5wdXNoKGAke2J9PSR7YVtiXX1gKTtNYz1jfXJldHVybiBNY30sTWMsT2M9KGEsYixjLGQpPT57dmFyIGU9e3N0cmluZzp1PT57dmFyIHg9MDtpZihudWxsIT09dSYmdm9pZCAwIT09dSYmMCE9PXUpe3g9Z2IodSkrMTt2YXIgRD15KHgpO00odSxDLEQseCk7eD1EfXJldHVybiB4fSxhcnJheTp1PT57dmFyIHg9eSh1Lmxlbmd0aCk7bS5zZXQodSx4KTtyZXR1cm4geH19O2E9a1tcIl9cIithXTt2YXIgZz1bXSxoPTA7aWYoZClmb3IodmFyIHE9MDtxPGQubGVuZ3RoO3ErKyl7dmFyIHc9ZVtjW3FdXTt3PygwPT09aCYmKGg9cGEoKSksZ1txXT13KGRbcV0pKTpnW3FdPWRbcV19Yz1hKC4uLmcpO3JldHVybiBjPWZ1bmN0aW9uKHUpezAhPT1oJiZyYShoKTtyZXR1cm5cInN0cmluZ1wiPT09XG5iP3oodSk6XCJib29sZWFuXCI9PT1iPyEhdTp1fShjKX0sZWE9YT0+e3ZhciBiPWdiKGEpKzEsYz1jYShiKTtjJiZNKGEsQyxjLGIpO3JldHVybiBjfSxQYyxRYz1bXSxBPWE9PntQYy5kZWxldGUoWi5nZXQoYSkpO1ouc2V0KGEsbnVsbCk7UWMucHVzaChhKX0sUmM9YT0+e2NvbnN0IGI9YS5sZW5ndGg7cmV0dXJuW2IlMTI4fDEyOCxiPj43LC4uLmFdfSxTYz17aToxMjcscDoxMjcsajoxMjYsZjoxMjUsZDoxMjQsZToxMTF9LFRjPWE9PlJjKEFycmF5LmZyb20oYSxiPT5TY1tiXSkpLHZhPShhLGIpPT57aWYoIVBjKXtQYz1uZXcgV2Vha01hcDt2YXIgYz1aLmxlbmd0aDtpZihQYylmb3IodmFyIGQ9MDtkPDArYztkKyspe3ZhciBlPVouZ2V0KGQpO2UmJlBjLnNldChlLGQpfX1pZihjPVBjLmdldChhKXx8MClyZXR1cm4gYztjPVFjLmxlbmd0aD9RYy5wb3AoKTpaLmdyb3coMSk7dHJ5e1ouc2V0KGMsYSl9Y2F0Y2goZyl7aWYoIShnIGluc3RhbmNlb2YgVHlwZUVycm9yKSl0aHJvdyBnO1xuYj1VaW50OEFycmF5Lm9mKDAsOTcsMTE1LDEwOSwxLDAsMCwwLDEsLi4uUmMoWzEsOTYsLi4uVGMoYi5zbGljZSgxKSksLi4uVGMoXCJ2XCI9PT1iWzBdP1wiXCI6YlswXSldKSwyLDcsMSwxLDEwMSwxLDEwMiwwLDAsNyw1LDEsMSwxMDIsMCwwKTtiPW5ldyBXZWJBc3NlbWJseS5Nb2R1bGUoYik7Yj0obmV3IFdlYkFzc2VtYmx5Lkluc3RhbmNlKGIse2U6e2Y6YX19KSkuZXhwb3J0cy5mO1ouc2V0KGMsYil9UGMuc2V0KGEsYyk7cmV0dXJuIGN9O1I9QXJyYXkoNDA5Nik7UmIoTyxcIi9cIik7VShcIi90bXBcIik7VShcIi9ob21lXCIpO1UoXCIvaG9tZS93ZWJfdXNlclwiKTtcbihmdW5jdGlvbigpe1UoXCIvZGV2XCIpO3JiKDI1OSx7cmVhZDooKT0+MCx3cml0ZTooZCxlLGcsaCk9PmgsWWE6KCk9PjB9KTtUYihcIi9kZXYvbnVsbFwiLDI1OSk7cWIoMTI4MCx0Yik7cWIoMTUzNix1Yik7VGIoXCIvZGV2L3R0eVwiLDEyODApO1RiKFwiL2Rldi90dHkxXCIsMTUzNik7dmFyIGE9bmV3IFVpbnQ4QXJyYXkoMTAyNCksYj0wLGM9KCk9PnswPT09YiYmKGJiKGEpLGI9YS5ieXRlTGVuZ3RoKTtyZXR1cm4gYVstLWJdfTtXKFwicmFuZG9tXCIsYyk7VyhcInVyYW5kb21cIixjKTtVKFwiL2Rldi9zaG1cIik7VShcIi9kZXYvc2htL3RtcFwiKX0pKCk7XG4oZnVuY3Rpb24oKXtVKFwiL3Byb2NcIik7dmFyIGE9VShcIi9wcm9jL3NlbGZcIik7VShcIi9wcm9jL3NlbGYvZmRcIik7UmIoe2FiKCl7dmFyIGI9d2IoYSxcImZkXCIsMTY4OTUsNzMpO2IuTWE9e1lhOk8uTWEuWWF9O2IuTGE9e21iKGMsZCl7Yz0rZDt2YXIgZT1UKGMpO2M9e3BhcmVudDpudWxsLGFiOntTYjpcImZha2VcIn0sTGE6e2ViOigpPT5lLnBhdGh9LGlkOmMrMX07cmV0dXJuIGMucGFyZW50PWN9LEliKCl7cmV0dXJuIEFycmF5LmZyb20oQmIuZW50cmllcygpKS5maWx0ZXIoKFssY10pPT5jKS5tYXAoKFtjXSk9PmMudG9TdHJpbmcoKSl9fTtyZXR1cm4gYn19LFwiL3Byb2Mvc2VsZi9mZFwiKX0pKCk7ay5ub0V4aXRSdW50aW1lJiYoVmE9ay5ub0V4aXRSdW50aW1lKTtrLnByaW50JiYoQmE9ay5wcmludCk7ay5wcmludEVyciYmKEI9ay5wcmludEVycik7ay53YXNtQmluYXJ5JiYoQ2E9ay53YXNtQmluYXJ5KTtrLnRoaXNQcm9ncmFtJiYod2E9ay50aGlzUHJvZ3JhbSk7XG5pZihrLnByZUluaXQpZm9yKFwiZnVuY3Rpb25cIj09dHlwZW9mIGsucHJlSW5pdCYmKGsucHJlSW5pdD1bay5wcmVJbml0XSk7MDxrLnByZUluaXQubGVuZ3RoOylrLnByZUluaXQuc2hpZnQoKSgpO2suc3RhY2tTYXZlPSgpPT5wYSgpO2suc3RhY2tSZXN0b3JlPWE9PnJhKGEpO2suc3RhY2tBbGxvYz1hPT55KGEpO2suY3dyYXA9KGEsYixjLGQpPT57dmFyIGU9IWN8fGMuZXZlcnkoZz0+XCJudW1iZXJcIj09PWd8fFwiYm9vbGVhblwiPT09Zyk7cmV0dXJuXCJzdHJpbmdcIiE9PWImJmUmJiFkP2tbXCJfXCIrYV06KC4uLmcpPT5PYyhhLGIsYyxnKX07ay5hZGRGdW5jdGlvbj12YTtrLnJlbW92ZUZ1bmN0aW9uPUE7ay5VVEY4VG9TdHJpbmc9ejtrLnN0cmluZ1RvTmV3VVRGOD1lYTtrLndyaXRlQXJyYXlUb01lbW9yeT0oYSxiKT0+e20uc2V0KGEsYil9O1xudmFyIGNhLGRhLHliLFVjLHJhLHkscGEsSmEsWixWYz17YTooYSxiLGMsZCk9PkthKGBBc3NlcnRpb24gZmFpbGVkOiAke3ooYSl9LCBhdDogYCtbYj96KGIpOlwidW5rbm93biBmaWxlbmFtZVwiLGMsZD96KGQpOlwidW5rbm93biBmdW5jdGlvblwiXSksaTpmdW5jdGlvbihhLGIpe3RyeXtyZXR1cm4gYT16KGEpLGthKGEsYiksMH1jYXRjaChjKXtpZihcInVuZGVmaW5lZFwiPT10eXBlb2YgWHx8XCJFcnJub0Vycm9yXCIhPT1jLm5hbWUpdGhyb3cgYztyZXR1cm4tYy5QYX19LEw6ZnVuY3Rpb24oYSxiLGMpe3RyeXtiPXooYik7Yj1ZKGEsYik7aWYoYyYtOClyZXR1cm4tMjg7dmFyIGQ9UyhiLHtoYjohMH0pLm5vZGU7aWYoIWQpcmV0dXJuLTQ0O2E9XCJcIjtjJjQmJihhKz1cInJcIik7YyYyJiYoYSs9XCJ3XCIpO2MmMSYmKGErPVwieFwiKTtyZXR1cm4gYSYmSmIoZCxhKT8tMjowfWNhdGNoKGUpe2lmKFwidW5kZWZpbmVkXCI9PXR5cGVvZiBYfHxcIkVycm5vRXJyb3JcIiE9PWUubmFtZSl0aHJvdyBlO3JldHVybi1lLlBhfX0sXG5qOmZ1bmN0aW9uKGEsYil7dHJ5e3ZhciBjPVQoYSk7WGIoYyxjLm5vZGUsYiwhMSk7cmV0dXJuIDB9Y2F0Y2goZCl7aWYoXCJ1bmRlZmluZWRcIj09dHlwZW9mIFh8fFwiRXJybm9FcnJvclwiIT09ZC5uYW1lKXRocm93IGQ7cmV0dXJuLWQuUGF9fSxoOmZ1bmN0aW9uKGEpe3RyeXt2YXIgYj1UKGEpO1FiKGIsYi5ub2RlLHt0aW1lc3RhbXA6RGF0ZS5ub3coKSxkYzohMX0pO3JldHVybiAwfWNhdGNoKGMpe2lmKFwidW5kZWZpbmVkXCI9PXR5cGVvZiBYfHxcIkVycm5vRXJyb3JcIiE9PWMubmFtZSl0aHJvdyBjO3JldHVybi1jLlBhfX0sYjpmdW5jdGlvbihhLGIsYyl7a2M9Yzt0cnl7dmFyIGQ9VChhKTtzd2l0Y2goYil7Y2FzZSAwOnZhciBlPUNjKCk7aWYoMD5lKWJyZWFrO2Zvcig7QmJbZV07KWUrKztyZXR1cm4gUGIoZCxlKS5iYjtjYXNlIDE6Y2FzZSAyOnJldHVybiAwO2Nhc2UgMzpyZXR1cm4gZC5mbGFncztjYXNlIDQ6cmV0dXJuIGU9Q2MoKSxkLmZsYWdzfD1lLDA7Y2FzZSAxMjpyZXR1cm4gZT1cbkNjKCksRmFbZSswPj4xXT0yLDA7Y2FzZSAxMzpjYXNlIDE0OnJldHVybiAwfXJldHVybi0yOH1jYXRjaChnKXtpZihcInVuZGVmaW5lZFwiPT10eXBlb2YgWHx8XCJFcnJub0Vycm9yXCIhPT1nLm5hbWUpdGhyb3cgZztyZXR1cm4tZy5QYX19LGc6ZnVuY3Rpb24oYSxiKXt0cnl7dmFyIGM9VChhKSxkPWMubm9kZSxlPWMuTWEuV2E7YT1lP2M6ZDtlPz89ZC5MYS5XYTtOYihlKTt2YXIgZz1lKGEpO3JldHVybiBhYyhiLGcpfWNhdGNoKGgpe2lmKFwidW5kZWZpbmVkXCI9PXR5cGVvZiBYfHxcIkVycm5vRXJyb3JcIiE9PWgubmFtZSl0aHJvdyBoO3JldHVybi1oLlBhfX0sSDpmdW5jdGlvbihhLGIpe2I9LTkwMDcxOTkyNTQ3NDA5OTI+Ynx8OTAwNzE5OTI1NDc0MDk5MjxiP05hTjpOdW1iZXIoYik7dHJ5e2lmKGlzTmFOKGIpKXJldHVybi02MTt2YXIgYz1UKGEpO2lmKDA+Ynx8MD09PShjLmZsYWdzJjIwOTcxNTUpKXRocm93IG5ldyBOKDI4KTtZYihjLGMubm9kZSxiKTtyZXR1cm4gMH1jYXRjaChkKXtpZihcInVuZGVmaW5lZFwiPT1cbnR5cGVvZiBYfHxcIkVycm5vRXJyb3JcIiE9PWQubmFtZSl0aHJvdyBkO3JldHVybi1kLlBhfX0sRzpmdW5jdGlvbihhLGIpe3RyeXtpZigwPT09YilyZXR1cm4tMjg7dmFyIGM9Z2IoXCIvXCIpKzE7aWYoYjxjKXJldHVybi02ODtNKFwiL1wiLEMsYSxiKTtyZXR1cm4gY31jYXRjaChkKXtpZihcInVuZGVmaW5lZFwiPT10eXBlb2YgWHx8XCJFcnJub0Vycm9yXCIhPT1kLm5hbWUpdGhyb3cgZDtyZXR1cm4tZC5QYX19LEs6ZnVuY3Rpb24oYSxiKXt0cnl7cmV0dXJuIGE9eihhKSxhYyhiLFdiKGEsITApKX1jYXRjaChjKXtpZihcInVuZGVmaW5lZFwiPT10eXBlb2YgWHx8XCJFcnJub0Vycm9yXCIhPT1jLm5hbWUpdGhyb3cgYztyZXR1cm4tYy5QYX19LEM6ZnVuY3Rpb24oYSxiLGMpe3RyeXtyZXR1cm4gYj16KGIpLGI9WShhLGIpLFUoYixjKSwwfWNhdGNoKGQpe2lmKFwidW5kZWZpbmVkXCI9PXR5cGVvZiBYfHxcIkVycm5vRXJyb3JcIiE9PWQubmFtZSl0aHJvdyBkO3JldHVybi1kLlBhfX0sSjpmdW5jdGlvbihhLFxuYixjLGQpe3RyeXtiPXooYik7dmFyIGU9ZCYyNTY7Yj1ZKGEsYixkJjQwOTYpO3JldHVybiBhYyhjLGU/V2IoYiwhMCk6V2IoYikpfWNhdGNoKGcpe2lmKFwidW5kZWZpbmVkXCI9PXR5cGVvZiBYfHxcIkVycm5vRXJyb3JcIiE9PWcubmFtZSl0aHJvdyBnO3JldHVybi1nLlBhfX0seDpmdW5jdGlvbihhLGIsYyxkKXtrYz1kO3RyeXtiPXooYik7Yj1ZKGEsYik7dmFyIGU9ZD9DYygpOjA7cmV0dXJuIG1hKGIsYyxlKS5iYn1jYXRjaChnKXtpZihcInVuZGVmaW5lZFwiPT10eXBlb2YgWHx8XCJFcnJub0Vycm9yXCIhPT1nLm5hbWUpdGhyb3cgZztyZXR1cm4tZy5QYX19LHY6ZnVuY3Rpb24oYSxiLGMsZCl7dHJ5e2I9eihiKTtiPVkoYSxiKTtpZigwPj1kKXJldHVybi0yODt2YXIgZT1TKGIpLm5vZGU7aWYoIWUpdGhyb3cgbmV3IE4oNDQpO2lmKCFlLkxhLmViKXRocm93IG5ldyBOKDI4KTt2YXIgZz1lLkxhLmViKGUpO3ZhciBoPU1hdGgubWluKGQsZ2IoZykpLHE9bVtjK2hdO00oZyxDLGMsZCsxKTtcbm1bYytoXT1xO3JldHVybiBofWNhdGNoKHcpe2lmKFwidW5kZWZpbmVkXCI9PXR5cGVvZiBYfHxcIkVycm5vRXJyb3JcIiE9PXcubmFtZSl0aHJvdyB3O3JldHVybi13LlBhfX0sdTpmdW5jdGlvbihhKXt0cnl7cmV0dXJuIGE9eihhKSxWYihhKSwwfWNhdGNoKGIpe2lmKFwidW5kZWZpbmVkXCI9PXR5cGVvZiBYfHxcIkVycm5vRXJyb3JcIiE9PWIubmFtZSl0aHJvdyBiO3JldHVybi1iLlBhfX0sZjpmdW5jdGlvbihhLGIpe3RyeXtyZXR1cm4gYT16KGEpLGFjKGIsV2IoYSkpfWNhdGNoKGMpe2lmKFwidW5kZWZpbmVkXCI9PXR5cGVvZiBYfHxcIkVycm5vRXJyb3JcIiE9PWMubmFtZSl0aHJvdyBjO3JldHVybi1jLlBhfX0scjpmdW5jdGlvbihhLGIsYyl7dHJ5e2I9eihiKTtiPVkoYSxiKTtpZihjKWlmKDUxMj09PWMpVmIoYik7ZWxzZSByZXR1cm4tMjg7ZWxzZSB0YShiKTtyZXR1cm4gMH1jYXRjaChkKXtpZihcInVuZGVmaW5lZFwiPT10eXBlb2YgWHx8XCJFcnJub0Vycm9yXCIhPT1kLm5hbWUpdGhyb3cgZDtcbnJldHVybi1kLlBhfX0scTpmdW5jdGlvbihhLGIsYyl7dHJ5e2I9eihiKTtiPVkoYSxiLCEwKTt2YXIgZD1EYXRlLm5vdygpLGUsZztpZihjKXt2YXIgaD1GW2M+PjJdKzQyOTQ5NjcyOTYqRVtjKzQ+PjJdLHE9RVtjKzg+PjJdOzEwNzM3NDE4MjM9PXE/ZT1kOjEwNzM3NDE4MjI9PXE/ZT1udWxsOmU9MUUzKmgrcS8xRTY7Yys9MTY7aD1GW2M+PjJdKzQyOTQ5NjcyOTYqRVtjKzQ+PjJdO3E9RVtjKzg+PjJdOzEwNzM3NDE4MjM9PXE/Zz1kOjEwNzM3NDE4MjI9PXE/Zz1udWxsOmc9MUUzKmgrcS8xRTZ9ZWxzZSBnPWU9ZDtpZihudWxsIT09KGc/P2UpKXthPWU7dmFyIHc9UyhiLHtoYjohMH0pLm5vZGU7TmIody5MYS5YYSkodyx7JGE6YSxVYTpnfSl9cmV0dXJuIDB9Y2F0Y2godSl7aWYoXCJ1bmRlZmluZWRcIj09dHlwZW9mIFh8fFwiRXJybm9FcnJvclwiIT09dS5uYW1lKXRocm93IHU7cmV0dXJuLXUuUGF9fSxtOigpPT5LYShcIlwiKSxsOigpPT57VmE9ITE7RWM9MH0sQTpmdW5jdGlvbihhLFxuYil7YT0tOTAwNzE5OTI1NDc0MDk5Mj5hfHw5MDA3MTk5MjU0NzQwOTkyPGE/TmFOOk51bWJlcihhKTthPW5ldyBEYXRlKDFFMyphKTtFW2I+PjJdPWEuZ2V0U2Vjb25kcygpO0VbYis0Pj4yXT1hLmdldE1pbnV0ZXMoKTtFW2IrOD4+Ml09YS5nZXRIb3VycygpO0VbYisxMj4+Ml09YS5nZXREYXRlKCk7RVtiKzE2Pj4yXT1hLmdldE1vbnRoKCk7RVtiKzIwPj4yXT1hLmdldEZ1bGxZZWFyKCktMTkwMDtFW2IrMjQ+PjJdPWEuZ2V0RGF5KCk7dmFyIGM9YS5nZXRGdWxsWWVhcigpO0VbYisyOD4+Ml09KDAhPT1jJTR8fDA9PT1jJTEwMCYmMCE9PWMlNDAwP0djOkZjKVthLmdldE1vbnRoKCldK2EuZ2V0RGF0ZSgpLTF8MDtFW2IrMzY+PjJdPS0oNjAqYS5nZXRUaW1lem9uZU9mZnNldCgpKTtjPShuZXcgRGF0ZShhLmdldEZ1bGxZZWFyKCksNiwxKSkuZ2V0VGltZXpvbmVPZmZzZXQoKTt2YXIgZD0obmV3IERhdGUoYS5nZXRGdWxsWWVhcigpLDAsMSkpLmdldFRpbWV6b25lT2Zmc2V0KCk7XG5FW2IrMzI+PjJdPShjIT1kJiZhLmdldFRpbWV6b25lT2Zmc2V0KCk9PU1hdGgubWluKGQsYykpfDB9LHk6ZnVuY3Rpb24oYSxiLGMsZCxlLGcsaCl7ZT0tOTAwNzE5OTI1NDc0MDk5Mj5lfHw5MDA3MTk5MjU0NzQwOTkyPGU/TmFOOk51bWJlcihlKTt0cnl7dmFyIHE9VChkKTtpZigwIT09KGImMikmJjA9PT0oYyYyKSYmMiE9PShxLmZsYWdzJjIwOTcxNTUpKXRocm93IG5ldyBOKDIpO2lmKDE9PT0ocS5mbGFncyYyMDk3MTU1KSl0aHJvdyBuZXcgTigyKTtpZighcS5NYS5zYil0aHJvdyBuZXcgTig0Myk7aWYoIWEpdGhyb3cgbmV3IE4oMjgpO3ZhciB3PXEuTWEuc2IocSxhLGUsYixjKTt2YXIgdT13LnRjO0VbZz4+Ml09dy5VYjtGW2g+PjJdPXU7cmV0dXJuIDB9Y2F0Y2goeCl7aWYoXCJ1bmRlZmluZWRcIj09dHlwZW9mIFh8fFwiRXJybm9FcnJvclwiIT09eC5uYW1lKXRocm93IHg7cmV0dXJuLXguUGF9fSx6OmZ1bmN0aW9uKGEsYixjLGQsZSxnKXtnPS05MDA3MTk5MjU0NzQwOTkyPmd8fFxuOTAwNzE5OTI1NDc0MDk5MjxnP05hTjpOdW1iZXIoZyk7dHJ5e3ZhciBoPVQoZSk7aWYoYyYyKXtpZigzMjc2OCE9PShoLm5vZGUubW9kZSY2MTQ0MCkpdGhyb3cgbmV3IE4oNDMpO2QmMnx8aC5NYS50YiYmaC5NYS50YihoLEMuc2xpY2UoYSxhK2IpLGcsYixkKX19Y2F0Y2gocSl7aWYoXCJ1bmRlZmluZWRcIj09dHlwZW9mIFh8fFwiRXJybm9FcnJvclwiIT09cS5uYW1lKXRocm93IHE7cmV0dXJuLXEuUGF9fSxuOihhLGIpPT57SGNbYV0mJihjbGVhclRpbWVvdXQoSGNbYV0uaWQpLGRlbGV0ZSBIY1thXSk7aWYoIWIpcmV0dXJuIDA7dmFyIGM9c2V0VGltZW91dCgoKT0+e2RlbGV0ZSBIY1thXTtLYygoKT0+VWMoYSxwZXJmb3JtYW5jZS5ub3coKSkpfSxiKTtIY1thXT17aWQ6YyxIYzpifTtyZXR1cm4gMH0sQjooYSxiLGMsZCk9Pnt2YXIgZT0obmV3IERhdGUpLmdldEZ1bGxZZWFyKCksZz0obmV3IERhdGUoZSwwLDEpKS5nZXRUaW1lem9uZU9mZnNldCgpO2U9KG5ldyBEYXRlKGUsNiwxKSkuZ2V0VGltZXpvbmVPZmZzZXQoKTtcbkZbYT4+Ml09NjAqTWF0aC5tYXgoZyxlKTtFW2I+PjJdPU51bWJlcihnIT1lKTtiPWg9Pnt2YXIgcT1NYXRoLmFicyhoKTtyZXR1cm5gVVRDJHswPD1oP1wiLVwiOlwiK1wifSR7U3RyaW5nKE1hdGguZmxvb3IocS82MCkpLnBhZFN0YXJ0KDIsXCIwXCIpfSR7U3RyaW5nKHElNjApLnBhZFN0YXJ0KDIsXCIwXCIpfWB9O2E9YihnKTtiPWIoZSk7ZTxnPyhNKGEsQyxjLDE3KSxNKGIsQyxkLDE3KSk6KE0oYSxDLGQsMTcpLE0oYixDLGMsMTcpKX0sZDooKT0+RGF0ZS5ub3coKSxzOigpPT4yMTQ3NDgzNjQ4LGM6KCk9PnBlcmZvcm1hbmNlLm5vdygpLG86YT0+e3ZhciBiPUMubGVuZ3RoO2E+Pj49MDtpZigyMTQ3NDgzNjQ4PGEpcmV0dXJuITE7Zm9yKHZhciBjPTE7ND49YztjKj0yKXt2YXIgZD1iKigxKy4yL2MpO2Q9TWF0aC5taW4oZCxhKzEwMDY2MzI5Nik7YTp7ZD0oTWF0aC5taW4oMjE0NzQ4MzY0OCw2NTUzNipNYXRoLmNlaWwoTWF0aC5tYXgoYSxkKS82NTUzNikpLUphLmJ1ZmZlci5ieXRlTGVuZ3RoK1xuNjU1MzUpLzY1NTM2fDA7dHJ5e0phLmdyb3coZCk7SWEoKTt2YXIgZT0xO2JyZWFrIGF9Y2F0Y2goZyl7fWU9dm9pZCAwfWlmKGUpcmV0dXJuITB9cmV0dXJuITF9LEU6KGEsYik9Pnt2YXIgYz0wLGQ9MCxlO2ZvcihlIG9mIE5jKCkpe3ZhciBnPWIrYztGW2ErZD4+Ml09ZztjKz1NKGUsQyxnLEluZmluaXR5KSsxO2QrPTR9cmV0dXJuIDB9LEY6KGEsYik9Pnt2YXIgYz1OYygpO0ZbYT4+Ml09Yy5sZW5ndGg7YT0wO2Zvcih2YXIgZCBvZiBjKWErPWdiKGQpKzE7RltiPj4yXT1hO3JldHVybiAwfSxlOmZ1bmN0aW9uKGEpe3RyeXt2YXIgYj1UKGEpO29hKGIpO3JldHVybiAwfWNhdGNoKGMpe2lmKFwidW5kZWZpbmVkXCI9PXR5cGVvZiBYfHxcIkVycm5vRXJyb3JcIiE9PWMubmFtZSl0aHJvdyBjO3JldHVybiBjLlBhfX0scDpmdW5jdGlvbihhLGIpe3RyeXt2YXIgYz1UKGEpO21bYl09Yy5WYT8yOlAoYy5tb2RlKT8zOjQwOTYwPT09KGMubW9kZSY2MTQ0MCk/Nzo0O0ZhW2IrMj4+MV09MDtIW2IrXG44Pj4zXT1CaWdJbnQoMCk7SFtiKzE2Pj4zXT1CaWdJbnQoMCk7cmV0dXJuIDB9Y2F0Y2goZCl7aWYoXCJ1bmRlZmluZWRcIj09dHlwZW9mIFh8fFwiRXJybm9FcnJvclwiIT09ZC5uYW1lKXRocm93IGQ7cmV0dXJuIGQuUGF9fSx3OmZ1bmN0aW9uKGEsYixjLGQpe3RyeXthOnt2YXIgZT1UKGEpO2E9Yjtmb3IodmFyIGcsaD1iPTA7aDxjO2grKyl7dmFyIHE9RlthPj4yXSx3PUZbYSs0Pj4yXTthKz04O3ZhciB1PSRiKGUsbSxxLHcsZyk7aWYoMD51KXt2YXIgeD0tMTticmVhayBhfWIrPXU7aWYodTx3KWJyZWFrO1widW5kZWZpbmVkXCIhPXR5cGVvZiBnJiYoZys9dSl9eD1ifUZbZD4+Ml09eDtyZXR1cm4gMH1jYXRjaChEKXtpZihcInVuZGVmaW5lZFwiPT10eXBlb2YgWHx8XCJFcnJub0Vycm9yXCIhPT1ELm5hbWUpdGhyb3cgRDtyZXR1cm4gRC5QYX19LEQ6ZnVuY3Rpb24oYSxiLGMsZCl7Yj0tOTAwNzE5OTI1NDc0MDk5Mj5ifHw5MDA3MTk5MjU0NzQwOTkyPGI/TmFOOk51bWJlcihiKTt0cnl7aWYoaXNOYU4oYikpcmV0dXJuIDYxO1xudmFyIGU9VChhKTtaYihlLGIsYyk7SFtkPj4zXT1CaWdJbnQoZS5wb3NpdGlvbik7ZS5FYiYmMD09PWImJjA9PT1jJiYoZS5FYj1udWxsKTtyZXR1cm4gMH1jYXRjaChnKXtpZihcInVuZGVmaW5lZFwiPT10eXBlb2YgWHx8XCJFcnJub0Vycm9yXCIhPT1nLm5hbWUpdGhyb3cgZztyZXR1cm4gZy5QYX19LEk6ZnVuY3Rpb24oYSl7dHJ5e3ZhciBiPVQoYSk7cmV0dXJuIGIuTWE/LmxiPy4oYil9Y2F0Y2goYyl7aWYoXCJ1bmRlZmluZWRcIj09dHlwZW9mIFh8fFwiRXJybm9FcnJvclwiIT09Yy5uYW1lKXRocm93IGM7cmV0dXJuIGMuUGF9fSx0OmZ1bmN0aW9uKGEsYixjLGQpe3RyeXthOnt2YXIgZT1UKGEpO2E9Yjtmb3IodmFyIGcsaD1iPTA7aDxjO2grKyl7dmFyIHE9RlthPj4yXSx3PUZbYSs0Pj4yXTthKz04O3ZhciB1PW5hKGUsbSxxLHcsZyk7aWYoMD51KXt2YXIgeD0tMTticmVhayBhfWIrPXU7aWYodTx3KWJyZWFrO1widW5kZWZpbmVkXCIhPXR5cGVvZiBnJiYoZys9dSl9eD1ifUZbZD4+Ml09eDtcbnJldHVybiAwfWNhdGNoKEQpe2lmKFwidW5kZWZpbmVkXCI9PXR5cGVvZiBYfHxcIkVycm5vRXJyb3JcIiE9PUQubmFtZSl0aHJvdyBEO3JldHVybiBELlBhfX0sazpKY307XG5mdW5jdGlvbiBXYygpe2Z1bmN0aW9uIGEoKXtrLmNhbGxlZFJ1bj0hMDtpZighRGEpe2lmKCFrLm5vRlNJbml0JiYhRGIpe3ZhciBiLGM7RGI9ITA7Yj8/PWsuc3RkaW47Yz8/PWsuc3Rkb3V0O2Q/Pz1rLnN0ZGVycjtiP1coXCJzdGRpblwiLGIpOlViKFwiL2Rldi90dHlcIixcIi9kZXYvc3RkaW5cIik7Yz9XKFwic3Rkb3V0XCIsbnVsbCxjKTpVYihcIi9kZXYvdHR5XCIsXCIvZGV2L3N0ZG91dFwiKTtkP1coXCJzdGRlcnJcIixudWxsLGQpOlViKFwiL2Rldi90dHkxXCIsXCIvZGV2L3N0ZGVyclwiKTttYShcIi9kZXYvc3RkaW5cIiwwKTttYShcIi9kZXYvc3Rkb3V0XCIsMSk7bWEoXCIvZGV2L3N0ZGVyclwiLDEpfVhjLk4oKTtFYj0hMTtrLm9uUnVudGltZUluaXRpYWxpemVkPy4oKTtpZihrLnBvc3RSdW4pZm9yKFwiZnVuY3Rpb25cIj09dHlwZW9mIGsucG9zdFJ1biYmKGsucG9zdFJ1bj1bay5wb3N0UnVuXSk7ay5wb3N0UnVuLmxlbmd0aDspe3ZhciBkPWsucG9zdFJ1bi5zaGlmdCgpO1JhLnB1c2goZCl9UWEoUmEpfX1pZigwPFxuSylVYT1XYztlbHNle2lmKGsucHJlUnVuKWZvcihcImZ1bmN0aW9uXCI9PXR5cGVvZiBrLnByZVJ1biYmKGsucHJlUnVuPVtrLnByZVJ1bl0pO2sucHJlUnVuLmxlbmd0aDspVGEoKTtRYShTYSk7MDxLP1VhPVdjOmsuc2V0U3RhdHVzPyhrLnNldFN0YXR1cyhcIlJ1bm5pbmcuLi5cIiksc2V0VGltZW91dCgoKT0+e3NldFRpbWVvdXQoKCk9Pmsuc2V0U3RhdHVzKFwiXCIpLDEpO2EoKX0sMSkpOmEoKX19dmFyIFhjO1xuKGFzeW5jIGZ1bmN0aW9uKCl7ZnVuY3Rpb24gYShjKXtjPVhjPWMuZXhwb3J0cztrLl9zcWxpdGUzX2ZyZWU9Yy5QO2suX3NxbGl0ZTNfdmFsdWVfdGV4dD1jLlE7ay5fc3FsaXRlM19wcmVwYXJlX3YyPWMuUjtrLl9zcWxpdGUzX3N0ZXA9Yy5TO2suX3NxbGl0ZTNfcmVzZXQ9Yy5UO2suX3NxbGl0ZTNfZXhlYz1jLlU7ay5fc3FsaXRlM19maW5hbGl6ZT1jLlY7ay5fc3FsaXRlM19jb2x1bW5fbmFtZT1jLlc7ay5fc3FsaXRlM19jb2x1bW5fdGV4dD1jLlg7ay5fc3FsaXRlM19jb2x1bW5fdHlwZT1jLlk7ay5fc3FsaXRlM19lcnJtc2c9Yy5aO2suX3NxbGl0ZTNfY2xlYXJfYmluZGluZ3M9Yy5fO2suX3NxbGl0ZTNfdmFsdWVfYmxvYj1jLiQ7ay5fc3FsaXRlM192YWx1ZV9ieXRlcz1jLmFhO2suX3NxbGl0ZTNfdmFsdWVfZG91YmxlPWMuYmE7ay5fc3FsaXRlM192YWx1ZV9pbnQ9Yy5jYTtrLl9zcWxpdGUzX3ZhbHVlX3R5cGU9Yy5kYTtrLl9zcWxpdGUzX3Jlc3VsdF9ibG9iPWMuZWE7XG5rLl9zcWxpdGUzX3Jlc3VsdF9kb3VibGU9Yy5mYTtrLl9zcWxpdGUzX3Jlc3VsdF9lcnJvcj1jLmdhO2suX3NxbGl0ZTNfcmVzdWx0X2ludD1jLmhhO2suX3NxbGl0ZTNfcmVzdWx0X2ludDY0PWMuaWE7ay5fc3FsaXRlM19yZXN1bHRfbnVsbD1jLmphO2suX3NxbGl0ZTNfcmVzdWx0X3RleHQ9Yy5rYTtrLl9zcWxpdGUzX2FnZ3JlZ2F0ZV9jb250ZXh0PWMubGE7ay5fc3FsaXRlM19jb2x1bW5fY291bnQ9Yy5tYTtrLl9zcWxpdGUzX2RhdGFfY291bnQ9Yy5uYTtrLl9zcWxpdGUzX2NvbHVtbl9ibG9iPWMub2E7ay5fc3FsaXRlM19jb2x1bW5fYnl0ZXM9Yy5wYTtrLl9zcWxpdGUzX2NvbHVtbl9kb3VibGU9Yy5xYTtrLl9zcWxpdGUzX2JpbmRfYmxvYj1jLnJhO2suX3NxbGl0ZTNfYmluZF9kb3VibGU9Yy5zYTtrLl9zcWxpdGUzX2JpbmRfaW50PWMudGE7ay5fc3FsaXRlM19iaW5kX3RleHQ9Yy51YTtrLl9zcWxpdGUzX2JpbmRfcGFyYW1ldGVyX2luZGV4PWMudmE7ay5fc3FsaXRlM19zcWw9XG5jLndhO2suX3NxbGl0ZTNfbm9ybWFsaXplZF9zcWw9Yy54YTtrLl9zcWxpdGUzX2NoYW5nZXM9Yy55YTtrLl9zcWxpdGUzX2Nsb3NlX3YyPWMuemE7ay5fc3FsaXRlM19jcmVhdGVfZnVuY3Rpb25fdjI9Yy5BYTtrLl9zcWxpdGUzX3VwZGF0ZV9ob29rPWMuQmE7ay5fc3FsaXRlM19vcGVuPWMuQ2E7Y2E9ay5fbWFsbG9jPWMuRGE7ZGE9ay5fZnJlZT1jLkVhO2suX1JlZ2lzdGVyRXh0ZW5zaW9uRnVuY3Rpb25zPWMuRmE7eWI9Yy5HYTtVYz1jLkhhO3JhPWMuSWE7eT1jLkphO3BhPWMuS2E7SmE9Yy5NO1o9Yy5PO0lhKCk7Sy0tO2subW9uaXRvclJ1bkRlcGVuZGVuY2llcz8uKEspOzA9PUsmJlVhJiYoYz1VYSxVYT1udWxsLGMoKSk7cmV0dXJuIFhjfUsrKztrLm1vbml0b3JSdW5EZXBlbmRlbmNpZXM/LihLKTt2YXIgYj17YTpWY307aWYoay5pbnN0YW50aWF0ZVdhc20pcmV0dXJuIG5ldyBQcm9taXNlKGM9PntrLmluc3RhbnRpYXRlV2FzbShiLChkLGUpPT57YyhhKGQsZSkpfSl9KTtcbkxhPz89ay5sb2NhdGVGaWxlP2subG9jYXRlRmlsZShcInNxbC13YXNtLWJyb3dzZXIud2FzbVwiLHlhKTp5YStcInNxbC13YXNtLWJyb3dzZXIud2FzbVwiO3JldHVybiBhKChhd2FpdCBPYShiKSkuaW5zdGFuY2UpfSkoKTtXYygpO1xuXG5cbiAgICAgICAgLy8gVGhlIHNoZWxsLXByZS5qcyBhbmQgZW1jYy1nZW5lcmF0ZWQgY29kZSBnb2VzIGFib3ZlXG4gICAgICAgIHJldHVybiBNb2R1bGU7XG4gICAgfSk7IC8vIFRoZSBlbmQgb2YgdGhlIHByb21pc2UgYmVpbmcgcmV0dXJuZWRcblxuICByZXR1cm4gaW5pdFNxbEpzUHJvbWlzZTtcbn0gLy8gVGhlIGVuZCBvZiBvdXIgaW5pdFNxbEpzIGZ1bmN0aW9uXG5cbi8vIFRoaXMgYml0IGJlbG93IGlzIGNvcGllZCBhbG1vc3QgZXhhY3RseSBmcm9tIHdoYXQgeW91IGdldCB3aGVuIHlvdSB1c2UgdGhlIE1PRFVMQVJJWkU9MSBmbGFnIHdpdGggZW1jY1xuLy8gSG93ZXZlciwgd2UgZG9uJ3Qgd2FudCB0byB1c2UgdGhlIGVtY2MgbW9kdWxhcml6YXRpb24uIFNlZSBzaGVsbC1wcmUuanNcbmlmICh0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIG1vZHVsZSA9PT0gJ29iamVjdCcpe1xuICAgIG1vZHVsZS5leHBvcnRzID0gaW5pdFNxbEpzO1xuICAgIC8vIFRoaXMgd2lsbCBhbGxvdyB0aGUgbW9kdWxlIHRvIGJlIHVzZWQgaW4gRVM2IG9yIENvbW1vbkpTXG4gICAgbW9kdWxlLmV4cG9ydHMuZGVmYXVsdCA9IGluaXRTcWxKcztcbn1cbmVsc2UgaWYgKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lWydhbWQnXSkge1xuICAgIGRlZmluZShbXSwgZnVuY3Rpb24oKSB7IHJldHVybiBpbml0U3FsSnM7IH0pO1xufVxuZWxzZSBpZiAodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnKXtcbiAgICBleHBvcnRzW1wiTW9kdWxlXCJdID0gaW5pdFNxbEpzO1xufVxuIl0sImZpbGUiOiJEOi9Vc2Vycy90dWFubGEyL2dhbWUvbGVhcm4tY29kZS1ieS1nYW1lL3Byb3RvdHlwZS8udml0ZS1jYW5hcnkvZGVwcy9zcWxfX2pzLmpzIiwieF9nb29nbGVfaWdub3JlTGlzdCI6WzBdfQ==