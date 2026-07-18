function t(t,e,s,i){var o,n=arguments.length,r=n<3?e:null===i?i=Object.getOwnPropertyDescriptor(e,s):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(t,e,s,i);else for(var a=t.length-1;a>=0;a--)(o=t[a])&&(r=(n<3?o(r):n>3?o(e,s,r):o(e,s))||r);return n>3&&r&&Object.defineProperty(e,s,r),r}"function"==typeof SuppressedError&&SuppressedError;const e=globalThis,s=e.ShadowRoot&&(void 0===e.ShadyCSS||e.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,i=Symbol(),o=new WeakMap;let n=class{constructor(t,e,s){if(this._$cssResult$=!0,s!==i)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const e=this.t;if(s&&void 0===t){const s=void 0!==e&&1===e.length;s&&(t=o.get(e)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),s&&o.set(e,t))}return t}toString(){return this.cssText}};const r=(t,...e)=>{const s=1===t.length?t[0]:e.reduce((e,s,i)=>e+(t=>{if(!0===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(s)+t[i+1],t[0]);return new n(s,t,i)},a=s?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const s of t.cssRules)e+=s.cssText;return(t=>new n("string"==typeof t?t:t+"",void 0,i))(e)})(t):t,{is:c,defineProperty:h,getOwnPropertyDescriptor:l,getOwnPropertyNames:d,getOwnPropertySymbols:u,getPrototypeOf:p}=Object,_=globalThis,f=_.trustedTypes,g=f?f.emptyScript:"",m=_.reactiveElementPolyfillSupport,$=(t,e)=>t,b={toAttribute(t,e){switch(e){case Boolean:t=t?g:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){let s=t;switch(e){case Boolean:s=null!==t;break;case Number:s=null===t?null:Number(t);break;case Object:case Array:try{s=JSON.parse(t)}catch(t){s=null}}return s}},y=(t,e)=>!c(t,e),v={attribute:!0,type:String,converter:b,reflect:!1,useDefault:!1,hasChanged:y};Symbol.metadata??=Symbol("metadata"),_.litPropertyMetadata??=new WeakMap;let w=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=v){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){const s=Symbol(),i=this.getPropertyDescriptor(t,s,e);void 0!==i&&h(this.prototype,t,i)}}static getPropertyDescriptor(t,e,s){const{get:i,set:o}=l(this.prototype,t)??{get(){return this[e]},set(t){this[e]=t}};return{get:i,set(e){const n=i?.call(this);o?.call(this,e),this.requestUpdate(t,n,s)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??v}static _$Ei(){if(this.hasOwnProperty($("elementProperties")))return;const t=p(this);t.finalize(),void 0!==t.l&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty($("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty($("properties"))){const t=this.properties,e=[...d(t),...u(t)];for(const s of e)this.createProperty(s,t[s])}const t=this[Symbol.metadata];if(null!==t){const e=litPropertyMetadata.get(t);if(void 0!==e)for(const[t,s]of e)this.elementProperties.set(t,s)}this._$Eh=new Map;for(const[t,e]of this.elementProperties){const s=this._$Eu(t,e);void 0!==s&&this._$Eh.set(s,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const s=new Set(t.flat(1/0).reverse());for(const t of s)e.unshift(a(t))}else void 0!==t&&e.push(a(t));return e}static _$Eu(t,e){const s=e.attribute;return!1===s?void 0:"string"==typeof s?s:"string"==typeof t?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this))}addController(t){(this._$EO??=new Set).add(t),void 0!==this.renderRoot&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){const t=new Map,e=this.constructor.elementProperties;for(const s of e.keys())this.hasOwnProperty(s)&&(t.set(s,this[s]),delete this[s]);t.size>0&&(this._$Ep=t)}createRenderRoot(){const t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return((t,i)=>{if(s)t.adoptedStyleSheets=i.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(const s of i){const i=document.createElement("style"),o=e.litNonce;void 0!==o&&i.setAttribute("nonce",o),i.textContent=s.cssText,t.appendChild(i)}})(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(t=>t.hostConnected?.())}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.())}attributeChangedCallback(t,e,s){this._$AK(t,s)}_$ET(t,e){const s=this.constructor.elementProperties.get(t),i=this.constructor._$Eu(t,s);if(void 0!==i&&!0===s.reflect){const o=(void 0!==s.converter?.toAttribute?s.converter:b).toAttribute(e,s.type);this._$Em=t,null==o?this.removeAttribute(i):this.setAttribute(i,o),this._$Em=null}}_$AK(t,e){const s=this.constructor,i=s._$Eh.get(t);if(void 0!==i&&this._$Em!==i){const t=s.getPropertyOptions(i),o="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==t.converter?.fromAttribute?t.converter:b;this._$Em=i;const n=o.fromAttribute(e,t.type);this[i]=n??this._$Ej?.get(i)??n,this._$Em=null}}requestUpdate(t,e,s,i=!1,o){if(void 0!==t){const n=this.constructor;if(!1===i&&(o=this[t]),s??=n.getPropertyOptions(t),!((s.hasChanged??y)(o,e)||s.useDefault&&s.reflect&&o===this._$Ej?.get(t)&&!this.hasAttribute(n._$Eu(t,s))))return;this.C(t,e,s)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(t,e,{useDefault:s,reflect:i,wrapped:o},n){s&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,n??e??this[t]),!0!==o||void 0!==n)||(this._$AL.has(t)||(this.hasUpdated||s||(e=void 0),this._$AL.set(t,e)),!0===i&&this._$Em!==t&&(this._$Eq??=new Set).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[t,e]of this._$Ep)this[t]=e;this._$Ep=void 0}const t=this.constructor.elementProperties;if(t.size>0)for(const[e,s]of t){const{wrapped:t}=s,i=this[e];!0!==t||this._$AL.has(e)||void 0===i||this.C(e,void 0,s,i)}}let t=!1;const e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this._$EO?.forEach(t=>t.hostUpdate?.()),this.update(e)):this._$EM()}catch(e){throw t=!1,this._$EM(),e}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this._$EO?.forEach(t=>t.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&=this._$Eq.forEach(t=>this._$ET(t,this[t])),this._$EM()}updated(t){}firstUpdated(t){}};w.elementStyles=[],w.shadowRootOptions={mode:"open"},w[$("elementProperties")]=new Map,w[$("finalized")]=new Map,m?.({ReactiveElement:w}),(_.reactiveElementVersions??=[]).push("2.1.2");const x=globalThis,A=t=>t,S=x.trustedTypes,E=S?S.createPolicy("lit-html",{createHTML:t=>t}):void 0,C="$lit$",P=`lit$${Math.random().toFixed(9).slice(2)}$`,k="?"+P,U=`<${k}>`,O=document,T=()=>O.createComment(""),H=t=>null===t||"object"!=typeof t&&"function"!=typeof t,M=Array.isArray,N="[ \t\n\f\r]",R=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,z=/-->/g,j=/>/g,D=RegExp(`>|${N}(?:([^\\s"'>=/]+)(${N}*=${N}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),L=/'/g,I=/"/g,B=/^(?:script|style|textarea|title)$/i,V=(t=>(e,...s)=>({_$litType$:t,strings:e,values:s}))(1),W=Symbol.for("lit-noChange"),q=Symbol.for("lit-nothing"),F=new WeakMap,J=O.createTreeWalker(O,129);function K(t,e){if(!M(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==E?E.createHTML(e):e}const Z=(t,e)=>{const s=t.length-1,i=[];let o,n=2===e?"<svg>":3===e?"<math>":"",r=R;for(let e=0;e<s;e++){const s=t[e];let a,c,h=-1,l=0;for(;l<s.length&&(r.lastIndex=l,c=r.exec(s),null!==c);)l=r.lastIndex,r===R?"!--"===c[1]?r=z:void 0!==c[1]?r=j:void 0!==c[2]?(B.test(c[2])&&(o=RegExp("</"+c[2],"g")),r=D):void 0!==c[3]&&(r=D):r===D?">"===c[0]?(r=o??R,h=-1):void 0===c[1]?h=-2:(h=r.lastIndex-c[2].length,a=c[1],r=void 0===c[3]?D:'"'===c[3]?I:L):r===I||r===L?r=D:r===z||r===j?r=R:(r=D,o=void 0);const d=r===D&&t[e+1].startsWith("/>")?" ":"";n+=r===R?s+U:h>=0?(i.push(a),s.slice(0,h)+C+s.slice(h)+P+d):s+P+(-2===h?e:d)}return[K(t,n+(t[s]||"<?>")+(2===e?"</svg>":3===e?"</math>":"")),i]};class G{constructor({strings:t,_$litType$:e},s){let i;this.parts=[];let o=0,n=0;const r=t.length-1,a=this.parts,[c,h]=Z(t,e);if(this.el=G.createElement(c,s),J.currentNode=this.el.content,2===e||3===e){const t=this.el.content.firstChild;t.replaceWith(...t.childNodes)}for(;null!==(i=J.nextNode())&&a.length<r;){if(1===i.nodeType){if(i.hasAttributes())for(const t of i.getAttributeNames())if(t.endsWith(C)){const e=h[n++],s=i.getAttribute(t).split(P),r=/([.?@])?(.*)/.exec(e);a.push({type:1,index:o,name:r[2],strings:s,ctor:"."===r[1]?et:"?"===r[1]?st:"@"===r[1]?it:tt}),i.removeAttribute(t)}else t.startsWith(P)&&(a.push({type:6,index:o}),i.removeAttribute(t));if(B.test(i.tagName)){const t=i.textContent.split(P),e=t.length-1;if(e>0){i.textContent=S?S.emptyScript:"";for(let s=0;s<e;s++)i.append(t[s],T()),J.nextNode(),a.push({type:2,index:++o});i.append(t[e],T())}}}else if(8===i.nodeType)if(i.data===k)a.push({type:2,index:o});else{let t=-1;for(;-1!==(t=i.data.indexOf(P,t+1));)a.push({type:7,index:o}),t+=P.length-1}o++}}static createElement(t,e){const s=O.createElement("template");return s.innerHTML=t,s}}function X(t,e,s=t,i){if(e===W)return e;let o=void 0!==i?s._$Co?.[i]:s._$Cl;const n=H(e)?void 0:e._$litDirective$;return o?.constructor!==n&&(o?._$AO?.(!1),void 0===n?o=void 0:(o=new n(t),o._$AT(t,s,i)),void 0!==i?(s._$Co??=[])[i]=o:s._$Cl=o),void 0!==o&&(e=X(t,o._$AS(t,e.values),o,i)),e}class Y{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:e},parts:s}=this._$AD,i=(t?.creationScope??O).importNode(e,!0);J.currentNode=i;let o=J.nextNode(),n=0,r=0,a=s[0];for(;void 0!==a;){if(n===a.index){let e;2===a.type?e=new Q(o,o.nextSibling,this,t):1===a.type?e=new a.ctor(o,a.name,a.strings,this,t):6===a.type&&(e=new ot(o,this,t)),this._$AV.push(e),a=s[++r]}n!==a?.index&&(o=J.nextNode(),n++)}return J.currentNode=O,i}p(t){let e=0;for(const s of this._$AV)void 0!==s&&(void 0!==s.strings?(s._$AI(t,s,e),e+=s.strings.length-2):s._$AI(t[e])),e++}}class Q{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,e,s,i){this.type=2,this._$AH=q,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=s,this.options=i,this._$Cv=i?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return void 0!==e&&11===t?.nodeType&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=X(this,t,e),H(t)?t===q||null==t||""===t?(this._$AH!==q&&this._$AR(),this._$AH=q):t!==this._$AH&&t!==W&&this._(t):void 0!==t._$litType$?this.$(t):void 0!==t.nodeType?this.T(t):(t=>M(t)||"function"==typeof t?.[Symbol.iterator])(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==q&&H(this._$AH)?this._$AA.nextSibling.data=t:this.T(O.createTextNode(t)),this._$AH=t}$(t){const{values:e,_$litType$:s}=t,i="number"==typeof s?this._$AC(t):(void 0===s.el&&(s.el=G.createElement(K(s.h,s.h[0]),this.options)),s);if(this._$AH?._$AD===i)this._$AH.p(e);else{const t=new Y(i,this),s=t.u(this.options);t.p(e),this.T(s),this._$AH=t}}_$AC(t){let e=F.get(t.strings);return void 0===e&&F.set(t.strings,e=new G(t)),e}k(t){M(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let s,i=0;for(const o of t)i===e.length?e.push(s=new Q(this.O(T()),this.O(T()),this,this.options)):s=e[i],s._$AI(o),i++;i<e.length&&(this._$AR(s&&s._$AB.nextSibling,i),e.length=i)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t!==this._$AB;){const e=A(t).nextSibling;A(t).remove(),t=e}}setConnected(t){void 0===this._$AM&&(this._$Cv=t,this._$AP?.(t))}}class tt{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,s,i,o){this.type=1,this._$AH=q,this._$AN=void 0,this.element=t,this.name=e,this._$AM=i,this.options=o,s.length>2||""!==s[0]||""!==s[1]?(this._$AH=Array(s.length-1).fill(new String),this.strings=s):this._$AH=q}_$AI(t,e=this,s,i){const o=this.strings;let n=!1;if(void 0===o)t=X(this,t,e,0),n=!H(t)||t!==this._$AH&&t!==W,n&&(this._$AH=t);else{const i=t;let r,a;for(t=o[0],r=0;r<o.length-1;r++)a=X(this,i[s+r],e,r),a===W&&(a=this._$AH[r]),n||=!H(a)||a!==this._$AH[r],a===q?t=q:t!==q&&(t+=(a??"")+o[r+1]),this._$AH[r]=a}n&&!i&&this.j(t)}j(t){t===q?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}}class et extends tt{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===q?void 0:t}}class st extends tt{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==q)}}class it extends tt{constructor(t,e,s,i,o){super(t,e,s,i,o),this.type=5}_$AI(t,e=this){if((t=X(this,t,e,0)??q)===W)return;const s=this._$AH,i=t===q&&s!==q||t.capture!==s.capture||t.once!==s.once||t.passive!==s.passive,o=t!==q&&(s===q||i);i&&this.element.removeEventListener(this.name,this,s),o&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}}class ot{constructor(t,e,s){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=s}get _$AU(){return this._$AM._$AU}_$AI(t){X(this,t)}}const nt=x.litHtmlPolyfillSupport;nt?.(G,Q),(x.litHtmlVersions??=[]).push("3.3.3");const rt=globalThis;class at extends w{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=((t,e,s)=>{const i=s?.renderBefore??e;let o=i._$litPart$;if(void 0===o){const t=s?.renderBefore??null;i._$litPart$=o=new Q(e.insertBefore(T(),t),t,void 0,s??{})}return o._$AI(t),o})(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return W}}at._$litElement$=!0,at.finalized=!0,rt.litElementHydrateSupport?.({LitElement:at});const ct=rt.litElementPolyfillSupport;ct?.({LitElement:at}),(rt.litElementVersions??=[]).push("4.2.2");const ht=t=>(e,s)=>{void 0!==s?s.addInitializer(()=>{customElements.define(t,e)}):customElements.define(t,e)},lt={attribute:!0,type:String,converter:b,reflect:!1,hasChanged:y},dt=(t=lt,e,s)=>{const{kind:i,metadata:o}=s;let n=globalThis.litPropertyMetadata.get(o);if(void 0===n&&globalThis.litPropertyMetadata.set(o,n=new Map),"setter"===i&&((t=Object.create(t)).wrapped=!0),n.set(s.name,t),"accessor"===i){const{name:i}=s;return{set(s){const o=e.get.call(this);e.set.call(this,s),this.requestUpdate(i,o,t,!0,s)},init(e){return void 0!==e&&this.C(i,void 0,t,e),e}}}if("setter"===i){const{name:i}=s;return function(s){const o=this[i];e.call(this,s),this.requestUpdate(i,o,t,!0,s)}}throw Error("Unsupported decorator location: "+i)};function ut(t){return(e,s)=>"object"==typeof s?dt(t,e,s):((t,e,s)=>{const i=e.hasOwnProperty(s);return e.constructor.createProperty(s,t),i?Object.getOwnPropertyDescriptor(e,s):void 0})(t,e,s)}function pt(t){return ut({...t,state:!0,attribute:!1})}var _t,ft;!function(t){t.language="language",t.system="system",t.comma_decimal="comma_decimal",t.decimal_comma="decimal_comma",t.space_comma="space_comma",t.none="none"}(_t||(_t={})),function(t){t.language="language",t.system="system",t.am_pm="12",t.twenty_four="24"}(ft||(ft={}));var gt=function(t,e,s,i){i=i||{},s=null==s?{}:s;var o=new Event(e,{bubbles:void 0===i.bubbles||i.bubbles,cancelable:Boolean(i.cancelable),composed:void 0===i.composed||i.composed});return o.detail=s,t.dispatchEvent(o),o};const mt={show_name:!0,show_percentage:!0,show_speed:!0,show_presets:!0,show_oscillation:!0,show_vertical_oscillation:!0,show_timer:!0,show_background:!0,show_box_shadow:!0},$t=[{name:"entity",required:!0,selector:{entity:{domain:"fan"}}},{name:"name",selector:{text:{}}},{name:"icon",selector:{icon:{}}},{type:"grid",name:"",schema:[{name:"show_name",selector:{boolean:{}}},{name:"show_percentage",selector:{boolean:{}}},{name:"show_speed",selector:{boolean:{}}},{name:"show_presets",selector:{boolean:{}}},{name:"show_oscillation",selector:{boolean:{}}},{name:"show_vertical_oscillation",selector:{boolean:{}}},{name:"show_timer",selector:{boolean:{}}},{name:"show_background",selector:{boolean:{}}},{name:"show_box_shadow",selector:{boolean:{}}}]}],bt={entity:"Ventilator entiteit",name:"Naam",icon:"Icoon",show_name:"Toon naam",show_percentage:"Toon percentage",show_speed:"Toon snelheid",show_presets:"Toon presets",show_oscillation:"Toon horizontale oscillatie",show_vertical_oscillation:"Toon verticale oscillatie",show_timer:"Toon timer",show_background:"Toon achtergrond",show_box_shadow:"Toon schaduw"};let yt=class extends at{constructor(){super(...arguments),this._computeLabel=t=>bt[t.name]??t.name}setConfig(t){this._config={...mt,...t}}_valueChanged(t){const e={...t.detail.value};if(e.entity&&e.entity!==this._config.entity){const t=this.hass?.states[e.entity];t?.attributes.friendly_name&&(e.name=t.attributes.friendly_name)}this._config=e,gt(this,"config-changed",{config:e})}get _displayData(){const t=this.hass?.states[this._config.entity];return{...this._config,name:this._config.name??t?.attributes.friendly_name??"",icon:this._config.icon??"mdi:fan"}}render(){return this.hass&&this._config?V`
      <ha-form
        .hass=${this.hass}
        .data=${this._displayData}
        .schema=${$t}
        .computeLabel=${this._computeLabel}
        @value-changed=${this._valueChanged}
      ></ha-form>
    `:q}};yt.styles=r`
    ha-form {
      display: block;
    }
  `,t([ut({attribute:!1})],yt.prototype,"hass",void 0),t([pt()],yt.prototype,"_config",void 0),yt=t([ht("duux-fan-card-editor")],yt);console.info("%c DUUX-FAN-CARD %c 1.0.0 ","color: white; background: #0a84ff; font-weight: 700;","color: #0a84ff; background: white; font-weight: 700;"),window.customCards=window.customCards||[],window.customCards.push({type:"duux-fan-card",name:"Duux Fan Card",description:"Full-featured control card for Duux / Whisper Flex fans",preview:!0,documentationURL:"https://github.com/yourname/duux-fan-card"});const vt={normal:"mdi:fan",nature:"mdi:leaf",sleep:"mdi:weather-night"},wt={normal:"Normaal",nature:"Natuurlijk",sleep:"Slaap"},xt={cancel:"Geen timer","1h":"1 uur","2h":"2 uur","3h":"3 uur","4h":"4 uur","5h":"5 uur","6h":"6 uur","7h":"7 uur","8h":"8 uur","9h":"9 uur","10h":"10 uur","11h":"11 uur","12h":"12 uur"};let At=class extends at{constructor(){super(...arguments),this._togglePower=()=>{this.hass.callService("fan","toggle",{entity_id:this._config.entity})},this._setSpeed=t=>{const e=Number(t.target.value);this.hass.callService("fan","set_percentage",{entity_id:this._config.entity,percentage:e})}}static async getConfigElement(){return document.createElement("duux-fan-card-editor")}static getStubConfig(t){const e=Object.keys(t.states).find(t=>t.startsWith("fan.")),s=e||"fan.whisper_flex_woonkamer",i=t.states[s];return{type:"custom:duux-fan-card",entity:s,name:i?.attributes.friendly_name??"Ventilator",icon:"mdi:fan",...mt}}setConfig(t){if(!t.entity||!t.entity.startsWith("fan."))throw new Error("You must specify a fan entity");this._config={...mt,...t}}getCardSize(){return 4}shouldUpdate(t){if(!this._config)return!1;if(t.has("_config"))return!0;const e=t.get("hass");if(!e)return!0;if(e.states[this._config.entity]!==this.hass.states[this._config.entity])return!0;const s=this._companion("vertical_oscillation","switch",this._config.vertical_oscillation_entity),i=this._companion("timer","select",this._config.timer_entity);for(const t of[s,i])if(t&&e.states[t]!==this.hass.states[t])return!0;return!1}get _base(){return this._config.entity.replace(/^fan\./,"")}_companion(t,e,s){if(s)return s;const i=`${e}.${this._base}_${t}`;return this.hass.states[i]?i:void 0}_setPreset(t){this.hass.callService("fan","set_preset_mode",{entity_id:this._config.entity,preset_mode:t})}_toggleOscillation(t){this.hass.callService("fan","oscillate",{entity_id:this._config.entity,oscillating:!t})}_toggleVertical(t){this.hass.callService("switch","toggle",{entity_id:t})}_setTimer(t,e){this.hass.callService("select","select_option",{entity_id:t,option:e})}_moreInfo(t){gt(this,"hass-more-info",{entityId:t})}render(){if(!this._config||!this.hass)return q;const t=this.hass.states[this._config.entity];if(!t)return V`<ha-card
        ><div class="warning">Entity ${this._config.entity} not found</div></ha-card
      >`;const e="on"===t.state,s=t.attributes,i=s.percentage??0,o=s.preset_modes??[],n=s.preset_mode,r=!!s.oscillating,a=this._config.name??s.friendly_name??this._config.entity,c=this._companion("vertical_oscillation","switch",this._config.vertical_oscillation_entity),h=this._companion("timer","select",this._config.timer_entity),l=!!c&&"on"===this.hass.states[c]?.state,d=h?this.hass.states[h]?.state:void 0,u=h?this.hass.states[h]?.attributes.options??[]:[];return V`
      <ha-card style=${this._cardStyle()}>
        <div class="container">
          ${this._renderHeader(a,e,i)}

          <div class="controls">
            ${this._config.show_presets&&o.length?this._renderPresets(o,n,e):q}
            ${this._renderSecondRow(r,c,l,h,d,u,e)}
          </div>
        </div>
      </ha-card>
    `}_renderHeader(t,e,s){const i=this._config.icon??"mdi:fan";return V`
      <div class="header">
        <button
          class="power-icon ${e?"on":"off"}"
          @click=${this._togglePower}
          title="Aan/uit"
        >
          <ha-icon
            icon=${i}
            style=${e?`animation-duration:${Math.max(.4,2.2-s/60)}s`:""}
            class=${e?"spin":""}
          ></ha-icon>
        </button>
        <div class="header-main">
          ${this._config.show_name||this._config.show_percentage?V`<div class="name" @click=${()=>this._moreInfo(this._config.entity)}>
                ${this._config.show_name?V`<span class="title">${t}</span>`:q}
                ${this._config.show_percentage?V`<span class="subtitle">${e?`${Math.round(s)}%`:"Uit"}</span>`:q}
              </div>`:q}
          ${this._config.show_speed?this._renderSpeed(s,e):q}
        </div>
      </div>
    `}_renderSpeed(t,e){return V`
      <div class="row speed-row">
        <ha-icon icon="mdi:speedometer-slow"></ha-icon>
        <input
          class="slider"
          type="range"
          min="0"
          max="100"
          step="1"
          .value=${String(t)}
          ?disabled=${!e}
          @change=${this._setSpeed}
        />
        <ha-icon icon="mdi:speedometer"></ha-icon>
      </div>
    `}_renderPresets(t,e,s){return V`
      <div class="row presets even" style="grid-template-columns: repeat(${t.length}, 1fr)">
        ${t.map(t=>V`
            <button
              class="chip even ${e===t&&s?"active":""}"
              ?disabled=${!s}
              @click=${()=>this._setPreset(t)}
            >
              <ha-icon icon=${vt[t]??"mdi:fan"}></ha-icon>
              <span>${this._presetLabel(t)}</span>
            </button>
          `)}
      </div>
    `}_renderSecondRow(t,e,s,i,o,n,r){const a=this._config.show_oscillation,c=this._config.show_vertical_oscillation&&e,h=this._config.show_timer&&i;if(!a&&!c&&!h)return q;const l=[a,c,h].filter(Boolean).length;return V`
      <div class="row second-row even" style="grid-template-columns: repeat(${l}, 1fr)">
        ${a?V`<button
              class="chip even toggle ${t?"active":""}"
              ?disabled=${!r}
              @click=${()=>this._toggleOscillation(t)}
            >
              <ha-icon icon="mdi:arrow-left-right"></ha-icon>
              <span>Horizontaal</span>
            </button>`:q}
        ${c?V`<button
              class="chip even toggle ${s?"active":""}"
              ?disabled=${!r}
              @click=${()=>this._toggleVertical(e)}
            >
              <ha-icon icon="mdi:arrow-up-down"></ha-icon>
              <span>Verticaal</span>
            </button>`:q}
        ${h?V`<select
              class="timer-select even"
              ?disabled=${!r}
              @change=${t=>this._setTimer(i,t.target.value)}
            >
              ${n.map(t=>V`<option value=${t} ?selected=${t===o}>
                    ${this._timerLabel(t)}
                  </option>`)}
            </select>`:q}
      </div>
    `}_presetLabel(t){return wt[t]??this._label(t)}_label(t){return t.charAt(0).toUpperCase()+t.slice(1)}_timerLabel(t){return xt[t]??t}_cardStyle(){const t=this._config,e=[];return!1===t.show_background?e.push("--duux-bg:transparent"):t.background&&e.push(`--duux-bg:${t.background}`),!1===t.show_box_shadow?e.push("--duux-shadow-card:none"):e.push("--duux-shadow-card:var(--ha-card-box-shadow, 0 2px 6px rgba(0,0,0,.2))"),t.accent_color&&e.push(`--duux-accent:${t.accent_color}`),t.text_color&&e.push(`--duux-text:${t.text_color}`),t.secondary_text_color&&e.push(`--duux-text2:${t.secondary_text_color}`),t.icon_color&&e.push(`--duux-icon:${t.icon_color}`),t.border_radius&&e.push(`--duux-radius:${t.border_radius}`),t.font_weight&&e.push(`--duux-weight:${t.font_weight}`),t.text_shadow&&e.push(`--duux-shadow:${t.text_shadow}`),e.join(";")}};At.styles=r`
    :host {
      --duux-accent: var(--primary-color, #0a84ff);
      --duux-bg: var(--ha-card-background, var(--card-background-color, #1c1c1e));
      --duux-text: var(--primary-text-color, #fff);
      --duux-text2: var(--secondary-text-color, #9b9b9b);
      --duux-icon: var(--state-icon-color, #9b9b9b);
      --duux-radius: var(--ha-card-border-radius, 16px);
      --duux-weight: 500;
      --duux-shadow: none;
      --duux-shadow-card: var(--ha-card-box-shadow, 0 2px 6px rgba(0, 0, 0, 0.2));
    }
    ha-card {
      background: var(--duux-bg);
      border-radius: var(--duux-radius);
      padding: 16px;
      color: var(--duux-text);
      overflow: hidden;
      box-shadow: var(--duux-shadow-card);
    }
    .header {
      display: flex;
      align-items: center;
      gap: 14px;
      margin-bottom: 14px;
    }
    .header-main {
      flex: 1;
      min-width: 0;
      display: flex;
      flex-direction: column;
      gap: 6px;
    }
    .power-icon {
      border: none;
      cursor: pointer;
      width: 40px;
      height: 40px;
      flex-shrink: 0;
      border-radius: 50%;
      display: grid;
      place-items: center;
      background: rgba(127, 127, 127, 0.12);
      transition: background 0.25s, color 0.25s;
      color: var(--duux-icon);
    }
    .power-icon.on {
      background: color-mix(in srgb, var(--duux-accent) 22%, transparent);
      color: var(--duux-accent);
    }
    .power-icon ha-icon {
      --mdc-icon-size: 22px;
    }
    .power-icon ha-icon.spin {
      animation: spin linear infinite;
    }
    @keyframes spin {
      to {
        transform: rotate(360deg);
      }
    }
    .name {
      cursor: pointer;
      display: flex;
      flex-direction: column;
      line-height: 1.2;
    }
    .title {
      font-weight: var(--duux-weight);
      font-size: 1.05rem;
      color: var(--duux-text);
      text-shadow: var(--entity-text-shadow, none);
    }
    .subtitle {
      font-size: 0.85rem;
      color: var(--duux-text2);
      text-shadow: var(--entity-text-shadow, none);
    }
    .controls {
      display: flex;
      flex-direction: column;
      gap: 12px;
    }
    .row {
      display: flex;
      align-items: center;
      gap: 10px;
      flex-wrap: wrap;
    }
    .row > ha-icon {
      color: var(--duux-icon);
      --mdc-icon-size: 20px;
      flex: 0 0 auto;
    }
    .slider {
      -webkit-appearance: none;
      appearance: none;
      flex: 1;
      height: 6px;
      border-radius: 3px;
      background: rgba(127, 127, 127, 0.25);
      outline: none;
    }
    .slider:disabled {
      opacity: 0.4;
    }
    .slider::-webkit-slider-thumb {
      -webkit-appearance: none;
      width: 20px;
      height: 20px;
      border-radius: 50%;
      background: var(--duux-accent);
      cursor: pointer;
      border: 2px solid #fff;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
    }
    .slider::-moz-range-thumb {
      width: 18px;
      height: 18px;
      border-radius: 50%;
      background: var(--duux-accent);
      cursor: pointer;
      border: 2px solid #fff;
    }
    .chip {
      border: none;
      cursor: pointer;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 6px;
      padding: 8px 12px;
      border-radius: 999px;
      background: rgba(127, 127, 127, 0.14);
      color: var(--primary-text-color, var(--duux-text));
      font-size: 0.85rem;
      font-weight: var(--duux-weight);
      text-shadow: var(--duux-shadow);
      transition: background 0.2s, color 0.2s;
      white-space: nowrap;
    }
    .chip ha-icon {
      --mdc-icon-size: 18px;
    }
    .chip:disabled {
      cursor: not-allowed;
      color: var(--disabled-text-color, rgba(127, 127, 127, 0.6));
    }
    .chip.active {
      background: var(--duux-accent);
      color: #fff;
    }
    .row.even {
      display: grid;
      gap: 8px;
    }
    .chip.even {
      min-width: 0;
      width: 100%;
    }
    .chip.even span {
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .timer-select {
      width: 100%;
      min-width: 0;
      padding: 8px 10px;
      border-radius: 999px;
      border: 1px solid rgba(127, 127, 127, 0.3);
      background: rgba(127, 127, 127, 0.08);
      color: var(--primary-text-color, var(--duux-text));
      font-size: 0.85rem;
      text-align: center;
      text-align-last: center;
    }
    .timer-select:disabled {
      cursor: not-allowed;
      color: var(--disabled-text-color, rgba(127, 127, 127, 0.6));
      -webkit-text-fill-color: var(--disabled-text-color, rgba(127, 127, 127, 0.6));
    }
    .warning {
      padding: 12px;
      color: var(--error-color, #db4437);
    }
  `,t([ut({attribute:!1})],At.prototype,"hass",void 0),t([pt()],At.prototype,"_config",void 0),At=t([ht("duux-fan-card")],At);export{At as DuuxFanCard};
