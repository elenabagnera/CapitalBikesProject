function h(){}function I(t,n){for(const e in n)t[e]=n[e];return t}function M(t){return t()}function z(){return Object.create(null)}function m(t){t.forEach(M)}function L(t){return typeof t=="function"}function G(t,n){return t!=t?n==n:t!==n||t&&typeof t=="object"||typeof t=="function"}let y;function ut(t,n){return y||(y=document.createElement("a")),y.href=n,t===y.href}function J(t){return Object.keys(t).length===0}function ft(t,n,e,r){if(t){const c=B(t,n,e,r);return t[0](c)}}function B(t,n,e,r){return t[1]&&r?I(e.ctx.slice(),t[1](r(n))):e.ctx}function st(t,n,e,r){if(t[2]&&r){const c=t[2](r(e));if(n.dirty===void 0)return c;if(typeof c=="object"){const f=[],o=Math.max(n.dirty.length,c.length);for(let l=0;l<o;l+=1)f[l]=n.dirty[l]|c[l];return f}return n.dirty|c}return n.dirty}function at(t,n,e,r,c,f){if(c){const o=B(n,e,r,f);t.p(o,c)}}function _t(t){if(t.ctx.length>32){const n=[],e=t.ctx.length/32;for(let r=0;r<e;r++)n[r]=-1;return n}return-1}let x=!1;function K(){x=!0}function P(){x=!1}function W(t,n,e,r){for(;t<n;){const c=t+(n-t>>1);e(c)<=r?t=c+1:n=c}return t}function Q(t){if(t.hydrate_init)return;t.hydrate_init=!0;let n=t.childNodes;if(t.nodeName==="HEAD"){const i=[];for(let u=0;u<n.length;u++){const a=n[u];a.claim_order!==void 0&&i.push(a)}n=i}const e=new Int32Array(n.length+1),r=new Int32Array(n.length);e[0]=-1;let c=0;for(let i=0;i<n.length;i++){const u=n[i].claim_order,a=(c>0&&n[e[c]].claim_order<=u?c+1:W(1,c,g=>n[e[g]].claim_order,u))-1;r[i]=e[a]+1;const s=a+1;e[s]=i,c=Math.max(s,c)}const f=[],o=[];let l=n.length-1;for(let i=e[c]+1;i!=0;i=r[i-1]){for(f.push(n[i-1]);l>=i;l--)o.push(n[l]);l--}for(;l>=0;l--)o.push(n[l]);f.reverse(),o.sort((i,u)=>i.claim_order-u.claim_order);for(let i=0,u=0;i<o.length;i++){for(;u<f.length&&o[i].claim_order>=f[u].claim_order;)u++;const a=u<f.length?f[u]:null;t.insertBefore(o[i],a)}}function R(t,n){if(x){for(Q(t),(t.actual_end_child===void 0||t.actual_end_child!==null&&t.actual_end_child.parentElement!==t)&&(t.actual_end_child=t.firstChild);t.actual_end_child!==null&&t.actual_end_child.claim_order===void 0;)t.actual_end_child=t.actual_end_child.nextSibling;n!==t.actual_end_child?(n.claim_order!==void 0||n.parentNode!==t)&&t.insertBefore(n,t.actual_end_child):t.actual_end_child=n.nextSibling}else(n.parentNode!==t||n.nextSibling!==null)&&t.appendChild(n)}function dt(t,n,e){x&&!e?R(t,n):(n.parentNode!==t||n.nextSibling!=e)&&t.insertBefore(n,e||null)}function U(t){t.parentNode.removeChild(t)}function V(t){return document.createElement(t)}function X(t){return document.createElementNS("http://www.w3.org/2000/svg",t)}function k(t){return document.createTextNode(t)}function ht(){return k(" ")}function mt(){return k("")}function pt(t,n,e){e==null?t.removeAttribute(n):t.getAttribute(n)!==e&&t.setAttribute(n,e)}function Y(t){return Array.from(t.childNodes)}function Z(t){t.claim_info===void 0&&(t.claim_info={last_index:0,total_claimed:0})}function T(t,n,e,r,c=!1){Z(t);const f=(()=>{for(let o=t.claim_info.last_index;o<t.length;o++){const l=t[o];if(n(l)){const i=e(l);return i===void 0?t.splice(o,1):t[o]=i,c||(t.claim_info.last_index=o),l}}for(let o=t.claim_info.last_index-1;o>=0;o--){const l=t[o];if(n(l)){const i=e(l);return i===void 0?t.splice(o,1):t[o]=i,c?i===void 0&&t.claim_info.last_index--:t.claim_info.last_index=o,l}}return r()})();return f.claim_order=t.claim_info.total_claimed,t.claim_info.total_claimed+=1,f}function O(t,n,e,r){return T(t,c=>c.nodeName===n,c=>{const f=[];for(let o=0;o<c.attributes.length;o++){const l=c.attributes[o];e[l.name]||f.push(l.name)}f.forEach(o=>c.removeAttribute(o))},()=>r(n))}function gt(t,n,e){return O(t,n,e,V)}function yt(t,n,e){return O(t,n,e,X)}function tt(t,n){return T(t,e=>e.nodeType===3,e=>{const r=""+n;if(e.data.startsWith(r)){if(e.data.length!==r.length)return e.splitText(r.length)}else e.data=r},()=>k(n),!0)}function xt(t){return tt(t," ")}function bt(t,n){n=""+n,t.wholeText!==n&&(t.data=n)}let b;function $(t){b=t}function S(){if(!b)throw new Error("Function called outside component initialization");return b}function $t(t){S().$$.on_mount.push(t)}function wt(t){S().$$.after_update.push(t)}function Et(t,n){S().$$.context.set(t,n)}const p=[],D=[],w=[],F=[],nt=Promise.resolve();let j=!1;function et(){j||(j=!0,nt.then(H))}function N(t){w.push(t)}let A=!1;const C=new Set;function H(){if(!A){A=!0;do{for(let t=0;t<p.length;t+=1){const n=p[t];$(n),it(n.$$)}for($(null),p.length=0;D.length;)D.pop()();for(let t=0;t<w.length;t+=1){const n=w[t];C.has(n)||(C.add(n),n())}w.length=0}while(p.length);for(;F.length;)F.pop()();j=!1,A=!1,C.clear()}}function it(t){if(t.fragment!==null){t.update(),m(t.before_update);const n=t.dirty;t.dirty=[-1],t.fragment&&t.fragment.p(t.ctx,n),t.after_update.forEach(N)}}const E=new Set;let _;function kt(){_={r:0,c:[],p:_}}function St(){_.r||m(_.c),_=_.p}function rt(t,n){t&&t.i&&(E.delete(t),t.i(n))}function jt(t,n,e,r){if(t&&t.o){if(E.has(t))return;E.add(t),_.c.push(()=>{E.delete(t),r&&(e&&t.d(1),r())}),t.o(n)}}function Nt(t,n){const e={},r={},c={$$scope:1};let f=t.length;for(;f--;){const o=t[f],l=n[f];if(l){for(const i in o)i in l||(r[i]=1);for(const i in l)c[i]||(e[i]=l[i],c[i]=1);t[f]=l}else for(const i in o)c[i]=1}for(const o in r)o in e||(e[o]=void 0);return e}function At(t){return typeof t=="object"&&t!==null?t:{}}function Ct(t){t&&t.c()}function qt(t,n){t&&t.l(n)}function ct(t,n,e,r){const{fragment:c,on_mount:f,on_destroy:o,after_update:l}=t.$$;c&&c.m(n,e),r||N(()=>{const i=f.map(M).filter(L);o?o.push(...i):m(i),t.$$.on_mount=[]}),l.forEach(N)}function ot(t,n){const e=t.$$;e.fragment!==null&&(m(e.on_destroy),e.fragment&&e.fragment.d(n),e.on_destroy=e.fragment=null,e.ctx=[])}function lt(t,n){t.$$.dirty[0]===-1&&(p.push(t),et(),t.$$.dirty.fill(0)),t.$$.dirty[n/31|0]|=1<<n%31}function vt(t,n,e,r,c,f,o,l=[-1]){const i=b;$(t);const u=t.$$={fragment:null,ctx:null,props:f,update:h,not_equal:c,bound:z(),on_mount:[],on_destroy:[],on_disconnect:[],before_update:[],after_update:[],context:new Map(n.context||(i?i.$$.context:[])),callbacks:z(),dirty:l,skip_bound:!1,root:n.target||i.$$.root};o&&o(u.root);let a=!1;if(u.ctx=e?e(t,n.props||{},(s,g,...q)=>{const v=q.length?q[0]:g;return u.ctx&&c(u.ctx[s],u.ctx[s]=v)&&(!u.skip_bound&&u.bound[s]&&u.bound[s](v),a&&lt(t,s)),g}):[],u.update(),a=!0,m(u.before_update),u.fragment=r?r(u.ctx):!1,n.target){if(n.hydrate){K();const s=Y(n.target);u.fragment&&u.fragment.l(s),s.forEach(U)}else u.fragment&&u.fragment.c();n.intro&&rt(t.$$.fragment),ct(t,n.target,n.anchor,n.customElement),P(),H()}$(i)}class Mt{$destroy(){ot(this,1),this.$destroy=h}$on(n,e){const r=this.$$.callbacks[n]||(this.$$.callbacks[n]=[]);return r.push(e),()=>{const c=r.indexOf(e);c!==-1&&r.splice(c,1)}}$set(n){this.$$set&&!J(n)&&(this.$$.skip_bound=!0,this.$$set(n),this.$$.skip_bound=!1)}}const d=[];function zt(t,n=h){let e;const r=new Set;function c(l){if(G(t,l)&&(t=l,e)){const i=!d.length;for(const u of r)u[1](),d.push(u,t);if(i){for(let u=0;u<d.length;u+=2)d[u][0](d[u+1]);d.length=0}}}function f(l){c(l(t))}function o(l,i=h){const u=[l,i];return r.add(u),r.size===1&&(e=n(c)||h),l(t),()=>{r.delete(u),r.size===0&&(e(),e=null)}}return{set:c,update:f,subscribe:o}}export{$t as A,I as B,zt as C,ft as D,at as E,_t as F,st as G,R as H,h as I,X as J,yt as K,ut as L,Mt as S,Y as a,pt as b,gt as c,U as d,V as e,dt as f,tt as g,bt as h,vt as i,Ct as j,ht as k,mt as l,qt as m,xt as n,ct as o,Nt as p,At as q,kt as r,G as s,k as t,jt as u,ot as v,St as w,rt as x,Et as y,wt as z};