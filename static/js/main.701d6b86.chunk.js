(this["webpackJsonpmui-data-datagrid-example"]=this["webpackJsonpmui-data-datagrid-example"]||[]).push([[0],{36:function(e,t,n){e.exports=n(49)},37:function(e,t,n){},49:function(e,t,n){"use strict";n.r(t);n(37);var r=n(0),a=n.n(r),i=n(15),o=n.n(i),l=n(29),c=n(30),d=n(64),u=n(67),s=n(65),m=n(68),h=n(66),g=n(31),b=n(24);function p(){return(p=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e}).apply(this,arguments)}var f=Object(d.a)((function(e){return{visuallyHidden:{border:0,clip:"rect(0 0 0 0)",height:1,margin:-1,overflow:"hidden",padding:0,position:"absolute",top:20,width:1},DGridScrollbar:{"&::-webkit-scrollbar-track":{WebkitBoxShadow:"inset 0 0 6px rgba(1,1,1,0.1)",borderRadius:10,backgroundColor:"#F5F5F5"},"&::-webkit-scrollbar":{width:10,backgroundColor:"#F5F5F5"},"&::-webkit-scrollbar-thumb":{width:10,borderRadius:10,backgroundColor:e.palette.primary.main}}}}));function w(e,t,n){return t[n]<e[n]?-1:t[n]>e[n]?1:0}function y(e,t){return"desc"===e?function(e,n){return w(e,n,t)}:function(e,n){return-w(e,n,t)}}function v(e,t){var n=e.map((function(e,t){return[e,t]}));return n.sort((function(e,n){var r=t(e[0],n[0]);return 0!==r?r:e[1]-n[1]})),n.map((function(e){return e[0]}))}function E(e){var t,n=e.columnIndex,r=e.data,i=e.style,o=f();return a.a.createElement(u.a,{display:"flex",alignItems:"center",style:p({},i,r.headerStyle,{height:r.headerHeight})},a.a.createElement(u.a,{pl:2},a.a.createElement(s.a,{variant:"body2"},a.a.createElement(m.a,{active:r.sortBy===r.columns[n].id,direction:r.sortBy===r.columns[n].id?r.sort:"asc",onClick:(t=r.columns[n].id,function(e){r.handleRequestSort(e,t)})},r.columns[n].label,r.orderBy===r.columns[n].id?a.a.createElement("span",{className:o.visuallyHidden},"desc"===r.sort?"sorted descending":"sorted ascending"):null))))}function S(e){var t=e.columnIndex,n=e.data,i=e.rowIndex,o=e.style;return a.a.createElement(r.Fragment,null,0===i?a.a.createElement(E,{columnIndex:t,data:n,style:o}):a.a.createElement(u.a,{display:"flex",alignItems:"center",style:p({},o,n.style,{height:n.rowHeight-n.rowSpacing})},a.a.createElement(u.a,{pl:2},n.data[i-1][n.columns[t].id]),a.a.createElement(u.a,{height:n.rowSpacing})))}var k=function(e){var t=e.columns,n=void 0===t?[]:t,i=e.rows,o=void 0===i?[]:i,l=e.order,c=e.orderBy,d=e.headerHeight,u=void 0===d?60:d,s=e.rowHeight,m=void 0===s?100:s,p=e.rowSpacing,w=void 0===p?20:p,E=e.gridStyle,k=void 0===E?null:E,x=e.headerCellStyle,F=void 0===x?null:x,H=e.cellStyle,O=void 0===H?null:H,j=Object(h.a)(),C=f(),I=Object(r.useState)(l),B=I[0],N=I[1],_=Object(r.useState)(c),R=_[0],D=_[1],V=function(e,t){N(R===t&&"asc"===B?"desc":"asc"),D(t)},q=function(){var e=0,t=n.map((function(t){return{id:t.id,width:o.reduce((function(n,r){return t.width&&0!==t.width?t.width:(e=r[t.id]?10*r[t.id].toString().length:50)>n?e:n}),0)}}));return{data:t,total:t.reduce((function(e,t){return e+t.width}),0)}}();return a.a.createElement(b.a,null,(function(e){var t=e.height,r=e.width;return a.a.createElement(g.a,{columnCount:n.length,columnWidth:function(e){return q.total<r?q.data[e].width+(r-q.total)/n.length-10/n.length:q.data[e].width},height:t,rowCount:o.length+1,rowHeight:function(e){return 0===e?u:m},width:r,style:k||{},className:C.DGridScrollbar,itemData:{data:v(o,y(B,R)),columns:n,rowHeight:m,rowSpacing:w,headerHeight:u,sort:B,sortBy:R,handleRequestSort:V,style:O||{backgroundColor:j.palette.background.paper,borderBottom:"1px solid "+j.palette.primary.main+"66"},headerStyle:F||{color:j.palette.primary.dark+"66"}},itemKey:function(e){var t=e.columnIndex,n=e.data,r=e.rowIndex;return n.columns[t].id+" | "+(0===r?"1":n.data[r-1]._id)}},S)}))};var x=function(){var e=Object(r.useState)([]),t=Object(c.a)(e,2),n=t[0],i=t[1],o=function(){alert("Hi !")};return Object(r.useEffect)((function(){for(var e=[],t=0;t<1e3;t++)e=[].concat(Object(l.a)(e),[{_Name:"test.png",_Visibility:"Public",actions:a.a.createElement("button",{onClick:o},"Hi !")}]);i(e)}),[]),a.a.createElement("div",{style:{width:"100vw",height:"100vh",backgroundColor:"#F8F9FF"}},a.a.createElement(k,{columns:[{id:"_Name",isNumeric:!1,label:"Name",main:!0},{id:"_Visibility",isNumeric:!1,label:"Visibility"},{id:"actions",isNumeric:!1,label:"Actions"}],rows:n}))};o.a.render(a.a.createElement(x,null),document.getElementById("root"))}},[[36,1,2]]]);
//# sourceMappingURL=main.701d6b86.chunk.js.map