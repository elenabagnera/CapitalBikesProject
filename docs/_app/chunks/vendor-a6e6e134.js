function b(){}const D=t=>t;function at(t,e){for(const n in e)t[n]=e[n];return t}function Q(t){return t()}function W(){return Object.create(null)}function w(t){t.forEach(Q)}function B(t){return typeof t=="function"}function ft(t,e){return t!=t?e==e:t!==e||t&&typeof t=="object"||typeof t=="function"}let j;function Dt(t,e){return j||(j=document.createElement("a")),j.href=e,t===j.href}function _t(t){return Object.keys(t).length===0}function Bt(t,e,n,r){if(t){const s=U(t,e,n,r);return t[0](s)}}function U(t,e,n,r){return t[1]&&r?at(n.ctx.slice(),t[1](r(e))):n.ctx}function Lt(t,e,n,r){if(t[2]&&r){const s=t[2](r(n));if(e.dirty===void 0)return s;if(typeof s=="object"){const u=[],i=Math.max(e.dirty.length,s.length);for(let c=0;c<i;c+=1)u[c]=e.dirty[c]|s[c];return u}return e.dirty|s}return e.dirty}function Pt(t,e,n,r,s,u){if(s){const i=U(e,n,r,u);t.p(i,s)}}function Tt(t){if(t.ctx.length>32){const e=[],n=t.ctx.length/32;for(let r=0;r<n;r++)e[r]=-1;return e}return-1}const V=typeof window!="undefined";let X=V?()=>window.performance.now():()=>Date.now(),L=V?t=>requestAnimationFrame(t):b;const v=new Set;function Y(t){v.forEach(e=>{e.c(t)||(v.delete(e),e.f())}),v.size!==0&&L(Y)}function Z(t){let e;return v.size===0&&L(Y),{promise:new Promise(n=>{v.add(e={c:t,f:n})}),abort(){v.delete(e)}}}let A=!1;function dt(){A=!0}function ht(){A=!1}function mt(t,e,n,r){for(;t<e;){const s=t+(e-t>>1);n(s)<=r?t=s+1:e=s}return t}function pt(t){if(t.hydrate_init)return;t.hydrate_init=!0;let e=t.childNodes;if(t.nodeName==="HEAD"){const l=[];for(let o=0;o<e.length;o++){const _=e[o];_.claim_order!==void 0&&l.push(_)}e=l}const n=new Int32Array(e.length+1),r=new Int32Array(e.length);n[0]=-1;let s=0;for(let l=0;l<e.length;l++){const o=e[l].claim_order,_=(s>0&&e[n[s]].claim_order<=o?s+1:mt(1,s,a=>e[n[a]].claim_order,o))-1;r[l]=n[_]+1;const f=_+1;n[f]=l,s=Math.max(f,s)}const u=[],i=[];let c=e.length-1;for(let l=n[s]+1;l!=0;l=r[l-1]){for(u.push(e[l-1]);c>=l;c--)i.push(e[c]);c--}for(;c>=0;c--)i.push(e[c]);u.reverse(),i.sort((l,o)=>l.claim_order-o.claim_order);for(let l=0,o=0;l<i.length;l++){for(;o<u.length&&i[l].claim_order>=u[o].claim_order;)o++;const _=o<u.length?u[o]:null;t.insertBefore(i[l],_)}}function yt(t,e){t.appendChild(e)}function tt(t){if(!t)return document;const e=t.getRootNode?t.getRootNode():t.ownerDocument;return e&&e.host?e:t.ownerDocument}function gt(t){const e=et("style");return bt(tt(t),e),e}function bt(t,e){yt(t.head||t,e)}function xt(t,e){if(A){for(pt(t),(t.actual_end_child===void 0||t.actual_end_child!==null&&t.actual_end_child.parentElement!==t)&&(t.actual_end_child=t.firstChild);t.actual_end_child!==null&&t.actual_end_child.claim_order===void 0;)t.actual_end_child=t.actual_end_child.nextSibling;e!==t.actual_end_child?(e.claim_order!==void 0||e.parentNode!==t)&&t.insertBefore(e,t.actual_end_child):t.actual_end_child=e.nextSibling}else(e.parentNode!==t||e.nextSibling!==null)&&t.appendChild(e)}function Ft(t,e,n){A&&!n?xt(t,e):(e.parentNode!==t||e.nextSibling!=n)&&t.insertBefore(e,n||null)}function $t(t){t.parentNode.removeChild(t)}function Ht(t,e){for(let n=0;n<t.length;n+=1)t[n]&&t[n].d(e)}function et(t){return document.createElement(t)}function wt(t){return document.createElementNS("http://www.w3.org/2000/svg",t)}function P(t){return document.createTextNode(t)}function It(){return P(" ")}function Gt(){return P("")}function Jt(t,e,n,r){return t.addEventListener(e,n,r),()=>t.removeEventListener(e,n,r)}function Kt(t,e,n){n==null?t.removeAttribute(e):t.getAttribute(e)!==n&&t.setAttribute(e,n)}function vt(t){return Array.from(t.childNodes)}function Et(t){t.claim_info===void 0&&(t.claim_info={last_index:0,total_claimed:0})}function nt(t,e,n,r,s=!1){Et(t);const u=(()=>{for(let i=t.claim_info.last_index;i<t.length;i++){const c=t[i];if(e(c)){const l=n(c);return l===void 0?t.splice(i,1):t[i]=l,s||(t.claim_info.last_index=i),c}}for(let i=t.claim_info.last_index-1;i>=0;i--){const c=t[i];if(e(c)){const l=n(c);return l===void 0?t.splice(i,1):t[i]=l,s?l===void 0&&t.claim_info.last_index--:t.claim_info.last_index=i,c}}return r()})();return u.claim_order=t.claim_info.total_claimed,t.claim_info.total_claimed+=1,u}function it(t,e,n,r){return nt(t,s=>s.nodeName===e,s=>{const u=[];for(let i=0;i<s.attributes.length;i++){const c=s.attributes[i];n[c.name]||u.push(c.name)}u.forEach(i=>s.removeAttribute(i))},()=>r(e))}function Qt(t,e,n){return it(t,e,n,et)}function Wt(t,e,n){return it(t,e,n,wt)}function kt(t,e){return nt(t,n=>n.nodeType===3,n=>{const r=""+e;if(n.data.startsWith(r)){if(n.data.length!==r.length)return n.splitText(r.length)}else n.data=r},()=>P(e),!0)}function Ut(t){return kt(t," ")}function Vt(t,e){e=""+e,t.wholeText!==e&&(t.data=e)}function St(t,e,n=!1){const r=document.createEvent("CustomEvent");return r.initCustomEvent(t,n,!1,e),r}const T=new Set;let q=0;function Nt(t){let e=5381,n=t.length;for(;n--;)e=(e<<5)-e^t.charCodeAt(n);return e>>>0}function F(t,e,n,r,s,u,i,c=0){const l=16.666/r;let o=`{
`;for(let m=0;m<=1;m+=l){const g=e+(n-e)*u(m);o+=m*100+`%{${i(g,1-g)}}
`}const _=o+`100% {${i(n,1-n)}}
}`,f=`__svelte_${Nt(_)}_${c}`,a=tt(t);T.add(a);const h=a.__svelte_stylesheet||(a.__svelte_stylesheet=gt(t).sheet),d=a.__svelte_rules||(a.__svelte_rules={});d[f]||(d[f]=!0,h.insertRule(`@keyframes ${f} ${_}`,h.cssRules.length));const p=t.style.animation||"";return t.style.animation=`${p?`${p}, `:""}${f} ${r}ms linear ${s}ms 1 both`,q+=1,f}function H(t,e){const n=(t.style.animation||"").split(", "),r=n.filter(e?u=>u.indexOf(e)<0:u=>u.indexOf("__svelte")===-1),s=n.length-r.length;s&&(t.style.animation=r.join(", "),q-=s,q||Ct())}function Ct(){L(()=>{q||(T.forEach(t=>{const e=t.__svelte_stylesheet;let n=e.cssRules.length;for(;n--;)e.deleteRule(n);t.__svelte_rules={}}),T.clear())})}let M;function R(t){M=t}function I(){if(!M)throw new Error("Function called outside component initialization");return M}function Xt(t){I().$$.on_mount.push(t)}function Yt(t){I().$$.after_update.push(t)}function Zt(t,e){I().$$.context.set(t,e)}const k=[],rt=[],z=[],st=[],jt=Promise.resolve();let G=!1;function At(){G||(G=!0,jt.then(lt))}function S(t){z.push(t)}let J=!1;const K=new Set;function lt(){if(!J){J=!0;do{for(let t=0;t<k.length;t+=1){const e=k[t];R(e),qt(e.$$)}for(R(null),k.length=0;rt.length;)rt.pop()();for(let t=0;t<z.length;t+=1){const e=z[t];K.has(e)||(K.add(e),e())}z.length=0}while(k.length);for(;st.length;)st.pop()();G=!1,J=!1,K.clear()}}function qt(t){if(t.fragment!==null){t.update(),w(t.before_update);const e=t.dirty;t.dirty=[-1],t.fragment&&t.fragment.p(t.ctx,e),t.after_update.forEach(S)}}let N;function ct(){return N||(N=Promise.resolve(),N.then(()=>{N=null})),N}function C(t,e,n){t.dispatchEvent(St(`${e?"intro":"outro"}${n}`))}const O=new Set;let y;function te(){y={r:0,c:[],p:y}}function ee(){y.r||w(y.c),y=y.p}function Mt(t,e){t&&t.i&&(O.delete(t),t.i(e))}function ne(t,e,n,r){if(t&&t.o){if(O.has(t))return;O.add(t),y.c.push(()=>{O.delete(t),r&&(n&&t.d(1),r())}),t.o(e)}}const ot={duration:0};function ie(t,e,n){let r=e(t,n),s=!1,u,i,c=0;function l(){u&&H(t,u)}function o(){const{delay:f=0,duration:a=300,easing:h=D,tick:d=b,css:p}=r||ot;p&&(u=F(t,0,1,a,f,h,p,c++)),d(0,1);const m=X()+f,g=m+a;i&&i.abort(),s=!0,S(()=>C(t,!0,"start")),i=Z(x=>{if(s){if(x>=g)return d(1,0),C(t,!0,"end"),l(),s=!1;if(x>=m){const $=h((x-m)/a);d($,1-$)}}return s})}let _=!1;return{start(){_||(_=!0,H(t),B(r)?(r=r(),ct().then(o)):o())},invalidate(){_=!1},end(){s&&(l(),s=!1)}}}function re(t,e,n,r){let s=e(t,n),u=r?0:1,i=null,c=null,l=null;function o(){l&&H(t,l)}function _(a,h){const d=a.b-u;return h*=Math.abs(d),{a:u,b:a.b,d,duration:h,start:a.start,end:a.start+h,group:a.group}}function f(a){const{delay:h=0,duration:d=300,easing:p=D,tick:m=b,css:g}=s||ot,x={start:X()+h,b:a};a||(x.group=y,y.r+=1),i||c?c=x:(g&&(o(),l=F(t,u,a,d,h,p,g)),a&&m(0,1),i=_(x,d),S(()=>C(t,a,"start")),Z($=>{if(c&&$>c.start&&(i=_(c,d),c=null,C(t,i.b,"start"),g&&(o(),l=F(t,u,i.b,i.duration,0,p,s.css))),i){if($>=i.end)m(u=i.b,1-u),C(t,i.b,"end"),c||(i.b?o():--i.group.r||w(i.group.c)),i=null;else if($>=i.start){const ut=$-i.start;u=i.a+i.d*p(ut/i.duration),m(u,1-u)}}return!!(i||c)}))}return{run(a){B(s)?ct().then(()=>{s=s(),f(a)}):f(a)},end(){o(),i=c=null}}}function se(t,e){const n={},r={},s={$$scope:1};let u=t.length;for(;u--;){const i=t[u],c=e[u];if(c){for(const l in i)l in c||(r[l]=1);for(const l in c)s[l]||(n[l]=c[l],s[l]=1);t[u]=c}else for(const l in i)s[l]=1}for(const i in r)i in n||(n[i]=void 0);return n}function le(t){return typeof t=="object"&&t!==null?t:{}}function ce(t){t&&t.c()}function oe(t,e){t&&t.l(e)}function Rt(t,e,n,r){const{fragment:s,on_mount:u,on_destroy:i,after_update:c}=t.$$;s&&s.m(e,n),r||S(()=>{const l=u.map(Q).filter(B);i?i.push(...l):w(l),t.$$.on_mount=[]}),c.forEach(S)}function zt(t,e){const n=t.$$;n.fragment!==null&&(w(n.on_destroy),n.fragment&&n.fragment.d(e),n.on_destroy=n.fragment=null,n.ctx=[])}function Ot(t,e){t.$$.dirty[0]===-1&&(k.push(t),At(),t.$$.dirty.fill(0)),t.$$.dirty[e/31|0]|=1<<e%31}function ue(t,e,n,r,s,u,i,c=[-1]){const l=M;R(t);const o=t.$$={fragment:null,ctx:null,props:u,update:b,not_equal:s,bound:W(),on_mount:[],on_destroy:[],on_disconnect:[],before_update:[],after_update:[],context:new Map(e.context||(l?l.$$.context:[])),callbacks:W(),dirty:c,skip_bound:!1,root:e.target||l.$$.root};i&&i(o.root);let _=!1;if(o.ctx=n?n(t,e.props||{},(f,a,...h)=>{const d=h.length?h[0]:a;return o.ctx&&s(o.ctx[f],o.ctx[f]=d)&&(!o.skip_bound&&o.bound[f]&&o.bound[f](d),_&&Ot(t,f)),a}):[],o.update(),_=!0,w(o.before_update),o.fragment=r?r(o.ctx):!1,e.target){if(e.hydrate){dt();const f=vt(e.target);o.fragment&&o.fragment.l(f),f.forEach($t)}else o.fragment&&o.fragment.c();e.intro&&Mt(t.$$.fragment),Rt(t,e.target,e.anchor,e.customElement),ht(),lt()}R(l)}class ae{$destroy(){zt(this,1),this.$destroy=b}$on(e,n){const r=this.$$.callbacks[e]||(this.$$.callbacks[e]=[]);return r.push(n),()=>{const s=r.indexOf(n);s!==-1&&r.splice(s,1)}}$set(e){this.$$set&&!_t(e)&&(this.$$.skip_bound=!0,this.$$set(e),this.$$.skip_bound=!1)}}const E=[];function fe(t,e=b){let n;const r=new Set;function s(c){if(ft(t,c)&&(t=c,n)){const l=!E.length;for(const o of r)o[1](),E.push(o,t);if(l){for(let o=0;o<E.length;o+=2)E[o][0](E[o+1]);E.length=0}}}function u(c){s(c(t))}function i(c,l=b){const o=[c,l];return r.add(o),r.size===1&&(n=e(s)||b),c(t),()=>{r.delete(o),r.size===0&&(n(),n=null)}}return{set:s,update:u,subscribe:i}}function _e(t,{delay:e=0,duration:n=400,easing:r=D}={}){const s=+getComputedStyle(t).opacity;return{delay:e,duration:n,easing:r,css:u=>`opacity: ${u*s}`}}export{Xt as A,at as B,fe as C,wt as D,Wt as E,xt as F,Jt as G,b as H,S as I,re as J,Ht as K,_e as L,Bt as M,Pt as N,Tt as O,Lt as P,ie as Q,Dt as R,ae as S,vt as a,Kt as b,Qt as c,$t as d,et as e,Ft as f,kt as g,Vt as h,ue as i,ce as j,It as k,Gt as l,oe as m,Ut as n,Rt as o,se as p,le as q,te as r,ft as s,P as t,ne as u,zt as v,ee as w,Mt as x,Zt as y,Yt as z};
