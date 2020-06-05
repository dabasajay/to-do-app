(this["webpackJsonpto-do-app"]=this["webpackJsonpto-do-app"]||[]).push([[0],[,,,,,,,,,,,function(t,e,n){t.exports=n(23)},,,,,function(t,e,n){},,function(t,e,n){},function(t,e,n){},function(t,e,n){},function(t,e,n){},function(t,e,n){},function(t,e,n){"use strict";n.r(e);var o=n(0),a=n.n(o),r=n(7),c=n.n(r),i=(n(16),n(5)),u=n.n(i),l=n(8),s=n(10),p=n(1),d=n(2),x=n(9),f=function(){var t=localStorage.getItem("todos");return t||(t="[]"),JSON.parse(t)},m=function(t){var e=JSON.stringify(t);localStorage.setItem("todos",e)},b=Object(x.a)((function(){var t=Object(o.useState)({isLoaded:!1,todos:[]}),e=Object(d.a)(t,2),n=e[0],a=e[1],r=function(t){t.sort((function(t,e){return t.status===e.status?t.id-e.id:t.status?-1:1}))};return{state:n,setApplicationLoaded:function(){a((function(t){return Object(p.a)(Object(p.a)({},t),{},{isLoaded:!0})}))},pushToDo:function(t){Array.isArray(t)||(t=[t]);var e=[],o=(new Date).getTime();t.forEach((function(t){e.push({id:o,status:!0,text:t}),o++}));var c=[].concat(Object(s.a)(n.todos),e);r(c),m(c),a((function(t){return Object(p.a)(Object(p.a)({},t),{},{todos:c})}))},updateToDo:function(t){var e=n.todos.find((function(e){return e.id===t.id}));if(e){e.text=t.text;var o=n.todos.map((function(t){return t.id!==e.id?t:e}));m(o),a((function(t){return Object(p.a)(Object(p.a)({},t),{},{todos:o})}))}},popToDo:function(t){var e=n.todos.filter((function(e){return e.id!==t}));m(e),a((function(t){return Object(p.a)(Object(p.a)({},t),{},{todos:e})}))},switchStatus:function(t){var e=n.todos.find((function(e){return e.id===t}));if(e){e.status=!e.status;var o=n.todos.map((function(t){return t.id!==e.id?t:e}));r(o),m(o),a((function(t){return Object(p.a)(Object(p.a)({},t),{},{todos:o})}))}},populateStateFromLocalStorage:function(){var t=f();a((function(e){return Object(p.a)(Object(p.a)({},e),{},{todos:t})}))},isStateEmpty:function(){return!(f().length>0)}}})),h=(n(18),function(){return a.a.createElement("hr",{style:{borderTop:"1px solid rgba(0, 0, 0, 0.1)",borderBottom:"1px solid rgba(255, 255, 255, 0.3)"}})}),E=(n(19),function(t){return a.a.createElement("button",{type:t.type,className:"icon-btn ".concat(t.className?t.className:""),onClick:t.onClick,style:t.style?t.style:{}},a.a.createElement("span",null,a.a.createElement("i",{className:t.icon?t.icon+" icon-btn-text":""}),t.text))}),v=(n(20),function(t){return a.a.createElement("textarea",{className:"form-textarea ".concat(t.className?t.className:""),style:t.style?t.style:{},placeholder:t.placeholder?t.placeholder:"",rows:t.rows?t.rows:3,onChange:t.onChange,readOnly:!!t.readOnly&&t.readOnly,value:t.initialValue?t.initialValue:void 0,ref:t.reference?t.reference:null})}),D=function(){var t=b.useContainer().pushToDo,e=Object(o.useState)(""),n=Object(d.a)(e,2),r=n[0],c=n[1];return a.a.createElement("div",{style:{textAlign:"center"}},a.a.createElement("form",{onSubmit:function(e){e.preventDefault();var n=r;n&&0!==n.length&&t(n)}},a.a.createElement(v,{style:{width:"75%",padding:"10px",boxSizing:"border-box"},placeholder:"Let's do it...",rows:5,onChange:function(t){return c(t.target.value)},initialValue:r}),a.a.createElement("br",null),a.a.createElement(E,{type:"submit",text:"Add",icon:"fas fa-plus",style:{color:"white",display:"inline-block",backgroundColor:"#DD7746",boxShadow:"#DD7746 0px 0px 0px 1px, #DD7746 0px 0px 5px",WebkitBoxShadow:"#DD7746 0px 0px 0px 1px, #DD7746 0px 0px 5px",MozBoxShadow:"#DD7746 0px 0px 0px 1px, #DD7746 0px 0px 5px"}})))},y=(n(21),function(t){var e=b.useContainer(),n=e.updateToDo,r=e.popToDo,c=e.switchStatus,i={editMode:!1,todo:{id:t.id,status:t.status,text:t.text}},u=Object(o.useState)(i),l=Object(d.a)(u,2),s=l[0],x=l[1],f=Object(o.useRef)(null),m=function(){!s.editMode&&f&&f.current&&(f.current.focus(),"number"===typeof f.current.selectionStart&&(f.current.selectionStart=f.current.selectionEnd=f.current.value.length)),x(Object(p.a)(Object(p.a)({},s),{},{editMode:!s.editMode}))},h="";return h=s.todo.status?s.editMode?"white":"#005C42":"#9EC97E",a.a.createElement("div",{className:"to-do-box"},a.a.createElement("div",{className:"to-do-box-textarea"},a.a.createElement("div",null,a.a.createElement(v,{style:{color:s.editMode?"black":"white",width:"100%",padding:"10px",backgroundColor:h,boxSizing:"border-box",minHeight:"100px",boxShadow:"".concat(h," 0px 0px 0px 1px, ").concat(h," 0px 0px 5px"),WebkitBoxShadow:"".concat(h," 0px 0px 0px 1px, ").concat(h," 0px 0px 5px"),MozBoxShadow:"".concat(h," 0px 0px 0px 1px, ").concat(h," 0px 0px 5px"),cursor:s.editMode?"text":"auto"},placeholder:"Empty todo doesn't make any sense, does it?",initialValue:s.todo.text,readOnly:!s.editMode,onChange:function(t){var e=Object(p.a)({},s);e.todo.text=t.target.value,x(e)},reference:f}))),a.a.createElement("div",{className:"to-do-box-options"},s.todo.status?a.a.createElement(E,{type:"button",text:s.editMode?"Save":"Edit",icon:s.editMode?"far fa-save":"far fa-edit",onClick:s.editMode?function(){s.todo.text&&0!==s.todo.text.length&&(m(),n(s.todo))}:m,style:{color:"white",backgroundColor:"#DD7746",boxShadow:"#DD7746 0px 0px 0px 1px, #DD7746 0px 0px 5px",WebkitBoxShadow:"#DD7746 0px 0px 0px 1px, #DD7746 0px 0px 5px",MozBoxShadow:"#DD7746 0px 0px 0px 1px, #DD7746 0px 0px 5px"}}):null,a.a.createElement(E,{type:"button",text:s.todo.status?"Mark":"Unmark",icon:s.todo.status?"fas fa-check":"fas fa-times",onClick:function(){c(s.todo.id)},style:{color:"white",backgroundColor:"#44344E",boxShadow:"#44344E 0px 0px 0px 1px, #44344E 0px 0px 5px",WebkitBoxShadow:"#44344E 0px 0px 0px 1px, #44344E 0px 0px 5px",MozBoxShadow:"#44344E 0px 0px 0px 1px, #44344E 0px 0px 5px"}}),a.a.createElement(E,{type:"button",text:"Remove",icon:"far fa-trash-alt",onClick:function(){r(s.todo.id)},style:{color:"white",backgroundColor:"#821517",boxShadow:"#821517 0px 0px 0px 1px, #821517 0px 0px 5px",WebkitBoxShadow:"#821517 0px 0px 0px 1px, #821517 0px 0px 5px",MozBoxShadow:"#821517 0px 0px 0px 1px, #821517 0px 0px 5px"}})))}),S=function(){var t=b.useContainer().state;return a.a.createElement("div",null,t.todos.map((function(t){return!0===t.status?a.a.createElement(y,{key:t.id,id:t.id,status:t.status,text:t.text}):null})))},w=function(){var t=b.useContainer().state;return a.a.createElement("div",null,t.todos.map((function(t){return!1===t.status?a.a.createElement(y,{key:t.id,id:t.id,status:t.status,text:t.text}):null})))},g=function(){return a.a.createElement("div",{className:"Dashboard"},a.a.createElement("div",null,"Add a To-Do"),a.a.createElement(h,null),a.a.createElement(D,null),a.a.createElement("div",null,"Active To-Dos"),a.a.createElement(h,null),a.a.createElement(S,null),a.a.createElement("div",null,"Completed To-Dos"),a.a.createElement(h,null),a.a.createElement(w,null))},O=(n(22),function(){return a.a.createElement("div",{className:"loading-spinner-container"},a.a.createElement("div",{className:"loading-spinner"}))}),k=function(){var t=b.useContainer(),e=t.state,n=t.setApplicationLoaded,r=t.pushToDo,c=t.populateStateFromLocalStorage,i=t.isStateEmpty,s=function(t){return new Promise((function(e){return setTimeout(e,t)}))};return Object(o.useEffect)((function(){(function(){var t=Object(l.a)(u.a.mark((function t(){var e,o,a,l,p;return u.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return c(),t.next=3,s(3e3);case 3:if(!i()){t.next=21;break}e=[],o=1;case 6:if(!(o<=3)){t.next=18;break}return t.next=9,fetch("https://api.chucknorris.io/jokes/random?category=dev");case 9:return a=t.sent,t.next=12,a.json();case 12:l=t.sent,p=l.value,e.push(p);case 15:o++,t.next=6;break;case 18:return r(e),t.next=21,s(3e3);case 21:n();case 22:case"end":return t.stop()}}),t)})));return function(){return t.apply(this,arguments)}})()()}),[]),e.isLoaded?a.a.createElement(g,null):a.a.createElement(O,null)},j=function(t){return a.a.createElement(b.Provider,null,t.children)};c.a.render(a.a.createElement(a.a.StrictMode,null,a.a.createElement(j,null,a.a.createElement(k,null))),document.getElementById("root"))}],[[11,1,2]]]);