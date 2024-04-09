(function(){"use strict";var t={8268:function(t,e,n){var s=n(6369),i=function(){var t=this,e=t._self._c;return e("div",{attrs:{id:"app"}},[e("svg",{attrs:{id:"main",width:"1800",height:"1000"}},[e("g",{attrs:{id:"links"}}),e("g",{attrs:{id:"circles"}})])])},o=[],r=n(1513),d={name:"App",components:{},data(){return{nodes:[],links:[],idToIndex:{}}},mounted(){let t="miserable.json",e=new XMLHttpRequest,n=this;e.open("get",t),e.send(null),e.onload=function(){let t=JSON.parse(e.responseText);n.processData(t)}},methods:{processData(t){const e=t.nodes,n=t.links;console.log(e,n),this.nodes=t.nodes,this.links=t.links;let s=r.Ys("svg"),i=+s.attr("width"),o=+s.attr("height");console.log(i,o);for(let r=0,d=this.nodes.length;r<d;++r){const t=["#bebada","#fb8072","#80b1d3","#ffffb3","#fdb462","#b3de69","#8dd3c7","#fccde5","#3b6a64","#060808","#baaf7c"];let e=document.createElementNS("http://www.w3.org/2000/svg","circle");this.nodes[r].x=450+i/2*Math.random(),this.nodes[r].y=200+o/2*Math.random(),this.nodes[r].vx=this.nodes[r].vy=0,this.nodes[r].flag=0,this.idToIndex[this.nodes[r].id]=r,e.setAttribute("r",7),e.setAttribute("cx",this.nodes[r].x),e.setAttribute("cy",this.nodes[r].y),e.setAttribute("fill",t[this.nodes[r].group]),e.setAttribute("group",this.nodes[r].group),e.setAttribute("name",this.nodes[r].id),e.setAttribute("id",this.nodes[r].id),e.setAttribute("stroke","#fff"),e.setAttribute("stroke-width","2px");let n=document.getElementById("circles");n.appendChild(e);let s=this;e.onmousedown=function(){let t=s.idToIndex[e.id];s.nodes[t].flag=1,document.onmousemove=function(e){let n=e||window.event,i=n.offsetX,o=n.offsetY;s.nodes[t].x=i,s.nodes[t].y=o,s.nodes[t].vx=s.nodes[t].vy=0},document.onmouseup=function(){console.log("抬起停止移动"),s.nodes[t].flag=0,this.onmouseup=null,this.onmousemove=null},document.ondragstart=function(t){t.preventDefault()},document.ondragend=function(t){t.preventDefault()}}}for(let r=0,d=this.links.length;r<d;++r){let t=this.links[r].source,e=this.links[r].target,n=document.createElementNS("http://www.w3.org/2000/svg","line"),s=document.getElementById(t),i=document.getElementById(e);this.links[r].x1=s.getAttribute("cx"),this.links[r].x2=i.getAttribute("cx"),this.links[r].y1=s.getAttribute("cy"),this.links[r].y2=i.getAttribute("cy"),n.setAttribute("x1",this.links[r].x1),n.setAttribute("x2",this.links[r].x2),n.setAttribute("y1",this.links[r].y1),n.setAttribute("y2",this.links[r].y2),n.setAttribute("id",t+e),n.setAttribute("value",this.links[r].value),n.setAttribute("stroke","#dfdece"),n.setAttribute("stroke-width","2px");let o=document.getElementById("links");o.appendChild(n)}setInterval(this.update,.01)},update(){this.updateNodePos();for(let t=0,e=this.nodes.length;t<e;++t){let e=document.getElementById(this.nodes[t].id);0==this.nodes[t].flag&&(this.nodes[t].x+=this.nodes[t].vx,this.nodes[t].y+=this.nodes[t].vy),e.setAttribute("cx",this.nodes[t].x),e.setAttribute("cy",this.nodes[t].y),this.nodes[t].vx=this.nodes[t].vy=0}for(let t=0,e=this.links.length;t<e;++t){let e=this.links[t].source,n=this.links[t].target,s=document.getElementById(e+n),i=document.getElementById(e),o=document.getElementById(n);this.links[t].x1=i.getAttribute("cx"),this.links[t].x2=o.getAttribute("cx"),this.links[t].y1=i.getAttribute("cy"),this.links[t].y2=o.getAttribute("cy"),s.setAttribute("x1",this.links[t].x1),s.setAttribute("x2",this.links[t].x2),s.setAttribute("y1",this.links[t].y1),s.setAttribute("y2",this.links[t].y2)}},updateNodePos(){let t=.03;for(let s=0,i=this.nodes.length;s<i;s++)for(let e=0;e<i;e++)if(s!=e){let n=this.nodes[e].x-this.nodes[s].x==0?1e-6:this.nodes[e].x-this.nodes[s].x,i=this.nodes[e].y-this.nodes[s].y==0?1e-6:this.nodes[e].y-this.nodes[s].y,o=Math.sqrt(n*n+i*i),r=t/o;this.nodes[e].vx+=n*r,this.nodes[e].vy+=i*r}let e=3e-8;for(let s=0,i=this.nodes.length;s<i;s++){let t=900,n=550,i=t-this.nodes[s].x,o=n-this.nodes[s].y,r=Math.sqrt(i*i+o*o),d=e*r*r;this.nodes[s].vx+=i*d,this.nodes[s].vy+=o*d}let n=15e-8;for(let s=0,i=this.links.length;s<i;s++){let t=this.links[s],e=t.source,i=t.target,o=t.value,r=this.nodes[this.idToIndex[e]],d=this.nodes[this.idToIndex[i]],l=r.x-d.x,u=r.y-d.y,h=Math.sqrt(l*l+u*u),c=n*h*h/o;r.vx-=l*c,r.vy-=u*c,d.vx+=l*c,d.vy+=u*c}}}},l=d,u=n(1001),h=(0,u.Z)(l,i,o,!1,null,null,null),c=h.exports;s.ZP.config.productionTip=!1,new s.ZP({render:t=>t(c)}).$mount("#app")}},e={};function n(s){var i=e[s];if(void 0!==i)return i.exports;var o=e[s]={exports:{}};return t[s].call(o.exports,o,o.exports,n),o.exports}n.m=t,function(){var t=[];n.O=function(e,s,i,o){if(!s){var r=1/0;for(h=0;h<t.length;h++){s=t[h][0],i=t[h][1],o=t[h][2];for(var d=!0,l=0;l<s.length;l++)(!1&o||r>=o)&&Object.keys(n.O).every((function(t){return n.O[t](s[l])}))?s.splice(l--,1):(d=!1,o<r&&(r=o));if(d){t.splice(h--,1);var u=i();void 0!==u&&(e=u)}}return e}o=o||0;for(var h=t.length;h>0&&t[h-1][2]>o;h--)t[h]=t[h-1];t[h]=[s,i,o]}}(),function(){n.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return n.d(e,{a:e}),e}}(),function(){n.d=function(t,e){for(var s in e)n.o(e,s)&&!n.o(t,s)&&Object.defineProperty(t,s,{enumerable:!0,get:e[s]})}}(),function(){n.g=function(){if("object"===typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(t){if("object"===typeof window)return window}}()}(),function(){n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)}}(),function(){var t={143:0};n.O.j=function(e){return 0===t[e]};var e=function(e,s){var i,o,r=s[0],d=s[1],l=s[2],u=0;if(r.some((function(e){return 0!==t[e]}))){for(i in d)n.o(d,i)&&(n.m[i]=d[i]);if(l)var h=l(n)}for(e&&e(s);u<r.length;u++)o=r[u],n.o(t,o)&&t[o]&&t[o][0](),t[o]=0;return n.O(h)},s=self["webpackChunkforce"]=self["webpackChunkforce"]||[];s.forEach(e.bind(null,0)),s.push=e.bind(null,s.push.bind(s))}();var s=n.O(void 0,[998],(function(){return n(8268)}));s=n.O(s)})();
//# sourceMappingURL=app.a4ce568a.js.map