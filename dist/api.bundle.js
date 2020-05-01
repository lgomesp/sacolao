!function(e){var t={};function n(r){if(t[r])return t[r].exports;var a=t[r]={i:r,l:!1,exports:{}};return e[r].call(a.exports,a,a.exports,n),a.l=!0,a.exports}n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var a in e)n.d(r,a,function(t){return e[t]}.bind(null,a));return r},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="/public",n(n.s=10)}([function(e,t,n){e.exports=(n(2).config(),{info:"pg"===process.env.DB?n(13):"mssql"===process.env.DB?n(15):null,system:"pg"===process.env.DB?n(16):"mssql"===process.env.DB?n(17):null,email:"pg"===process.env.DB?n(18):"mssql"===process.env.DB?n(19):null})},function(e,t){var n=function(){};n.prototype.info=function(e){console.log(new Date+" - info:::::"+e)},n.prototype.debug=function(e){console.log(new Date+" - debug:::::"+e)},n.prototype.error=function(e){console.log(new Date+" - error:::::"+e)},e.exports=new n},function(e,t){e.exports=require("dotenv")},function(e,t){e.exports=require("mssql")},function(e,t,n){e.exports=(()=>{n(2).config();const{Client:e}=n(14),t=new e({user:process.env.DB_USER,host:process.env.DB_URL,database:process.env.DB_DATABASE,password:process.env.DB_PASSWORD,port:5432});return{connectDB:()=>(t.connect().then(()=>{}).catch(()=>{}),t),schema:"MONITOR"}})()},function(e,t,n){e.exports=(()=>{n(2).config();const e=n(3),t={user:process.env.DB_USER,password:process.env.DB_PASSWORD,server:process.env.DB_URL,database:process.env.DB_DATABASE,enableArithAbort:!1};return{connectDB:async()=>await e.connect(t),schema:"MONITOR_HOM"}})()},function(e,t,n){e.exports=(()=>{const e=n(3),t=t=>{let n=null;switch(typeof t){case"string":case"object":n=e.VarChar(1e3);case"boolean":case"number":n=e.Int;default:n=e.VarChar}return n};return{insertQueryBuilder:(e,n)=>{let r=" VALUES (",a="insert into "+e+" (",s=Object.keys(n),o=[],i=null;for(let e=0;e<s.length;e++){let c=n[s[e]];a+=s[e]+(e<s.length-1?",":")"),r+="@"+s[e]+(e<s.length-1?",":")"),i=t(c),o.push({name:s[e],value:!0===c?1:!1===c?0:c,type:i})}return a=a.concat(r),{string:a,values:o,getType:t}},updatetQueryBuilder:(e,n)=>{let r="UPDATE "+e+" SET ",a=Object.keys(n).filter(e=>"id"!=e),s=[],o=null;for(let e=0;e<a.length;e++){let i=n[a[e]];"id"!=a[e]&&(r+=a[e]+" = @"+a[e]+(e<a.length-1?",":""),o=t(i),s.push({name:"@"+a[e],value:!0===i?1:!1===i?0:i,type:o}))}return o=t(n.id),r+=" where id = @id",s.push({name:"@id",value:n.id,type:o}),{string:r,values:s}},getType:t}})()},function(e,t){e.exports=(insertQueryBuilder=(e,t)=>{let n=" VALUES (",r="insert into "+e+" (",a=Object.keys(t);for(let e=0;e<a.length;e++)r+=a[e]+(e<a.length-1?",":")"),n+=" $"+(e+1)+(e<a.length-1?",":")");let s=Object.keys(t).map((function(e){return t[e]}));return r=r.concat(n),{string:r,values:s}},updatetQueryBuilder=(e,t)=>{let n="UPDATE "+e+" SET ",r=Object.keys(t).filter(e=>"id"!=e),a=[];for(let e=0;e<r.length;e++)"id"!=r[e]&&(n+=r[e]+" =  $"+(e+1)+(e<r.length-1?",":""),a.push(t[r[e]]));return n+=" where id = $"+(a.length+1),a.push(t.id),{string:n,values:a}},{insertQueryBuilder:insertQueryBuilder,updatetQueryBuilder:updatetQueryBuilder})},function(e,t){e.exports=(updatetQueryBuilder=(e,t,n)=>{let r="UPDATE "+e+" SET ",a=Object.keys(t).filter(e=>"id"!=e),s=[];for(let e=0;e<a.length;e++)"id"!=a[e]&&(r+=`${a[e]} = '${t[a[e]]}' ${e<a.length-1?",":""}`);return r+=" where id = "+(n?"'"+t.id+"'":t.id),s.push(t.id),{string:r,values:s}},{updatetQueryBuilder:updatetQueryBuilder})},function(e,t,n){e.exports=(()=>{const e=n(21),t=n(26),r=n(0),a=t=>{e.fetchMe(t,(function(e){r.info.save(t,e),200==e.status||(async e=>(await r.system.all()).find(t=>t.id==e.id).maintance)(t)||setTimeout(()=>{a(t)},18e4)}))};return{start:()=>{r.connectDB()},requests:async()=>{(await r.system.all()).forEach(async e=>{e.maintance||a(e)})},request:async e=>{var t=(await r.system.all()).find(t=>t.id==e);a(t)},system:t}})()},function(e,t,n){const r=n(11),a=(n(30),n(32)),s=a(),o=n(1);n(2).config(),console.log("Your port is "+process.env.PORT),s.use(a.static(__dirname+"/public")),s.get("/",(function(e,t){t.sendFile("./public/index.html",{root:__dirname})})),r.start(s),o.info("Router setted")},function(e,t,n){e.exports=(()=>{const e=process.env.PORT||3e3,t=n(12),r=n(20),a=n(28),s=n(29),o=n(1);return{start:n=>{n.use(s.urlencoded({extended:!0})),n.use(s.json()),n.use((function(e,t,n){t.setHeader("Access-Control-Allow-Origin","*"),t.setHeader("Access-Control-Allow-Methods","GET, POST, PUT, DELETE"),t.setHeader("Access-Control-Allow-Headers","X-Requested-With,content-type"),t.setHeader("Access-Control-Allow-Credentials",!0),n()})),n.listen(e,(function(){o.info("Started on "+e)})),r.router(n),t.router(n),a.router(n)}}})()},function(e,t,n){e.exports=(()=>{const e=n(0);return{router:t=>{t.get("/last",(async function(t,n){let r=await e.info.last(t.query.system);n.send(r)})),t.get("/history",(async function(t,n){let r=await e.info.get(t.query.system,t.query.size);n.send(r)})),t.get("/all",(async function(t,n){let r=await e.info.all();n.send(r)}))}}})()},function(e,t,n){e.exports=(()=>{const e=n(4),t=e.connectDB(),r=n(1);return{save:(n,a)=>{const s=`INSERT INTO ${e.schema}.INFO(system, name, request, response , status, error) VALUES($1, $2, $3, $4, $5, $6) RETURNING *`,o=[n.id,n.name,a.request,a.response,a.status,a.error];t.query(s,o,e=>{e&&r.error(e.stack)})},get:async(n,r=10)=>{const a=await t.query(`select * from ${e.schema}.INFO where system like $1 order by request desc limit $2`,[n,r]);return await a.rows||[]},all:async()=>{const n=await t.query(`select * from ${e.schema}.INFO`,[]);return await n.rows||[]},last:async n=>{const r=await t.query(`select * from ${e.schema}.INFO where system like $1 order by request desc limit 1`,[n]);return await r.rows[0]||{}},reset:()=>{t.query(`delete from ${e.schema}.INFO`)}}})()},function(e,t){e.exports=require("pg")},function(e,t,n){e.exports=(()=>{const e=n(5),t=n(6),r=n(3);let a=null;(async()=>{a=a||await e.connectDB()})();return{save:async(n,s)=>{a=a||await e.connectDB();let o=s;o.system=n.id,o.name=n.name,delete o.date;for(let e in o)o[e]=o[e].toString();let i=t.insertQueryBuilder(e.schema+".INFO",o),c=await a.request();i.values.forEach(e=>{e&&e.hasOwnProperty("name")&&c.input(e.name,e.type||r.Text,e.value)}),c.query(i.string).then((e,t)=>{if(e)throw e.stack;return t}).catch((e,t)=>{if(e)throw e.stack})},get:async(t,n=10)=>{a=a||await e.connectDB();const r=await a.request().query(`select top ${n} * from ${e.schema}.INFO where system like '${t}' order by request desc `);return await r.recordset||[]},all:async()=>{a=a||await e.connectDB();const t=await a.request().query(`select * from ${e.schema}.INFO`);return await t.recordset||[]},last:async t=>{a=a||await e.connectDB();const n=await a.request().query(`select top 1 * from ${e.schema}.INFO where system like '${t}' order by request desc`);let r=await n.recordset;return(r.length?r[0]:null)||{}},reset:()=>{a.request().query(`delete from ${e.schema}.INFO`)}}})()},function(e,t,n){e.exports=(()=>{const e=n(4),t=n(7),r=e.connectDB();return{maintance:async(t,n)=>{r.query(`UPDATE  ${e.schema}.SYSTEM  SET MAINTANCE = $1 WHERE ID = $2`,[n,t],(e,t)=>{if(e)throw e.stack;return t})},get:async t=>{const n=await r.query(`select * from ${e.schema}.SYSTEM where id = $1`,[t]);return await n.rows[0]||{}},all:async()=>{const t=await r.query(`select * from ${e.schema}.SYSTEM`,[]);return await t.rows||[]},update:async n=>{let a=t.updatetQueryBuilder(e.schema+".SYSTEM",n.body);r.query(a.string,a.values,(e,t)=>{if(e)throw e.stack;return t})},save:async n=>{let a=t.insertQueryBuilder(e.schema+".SYSTEM",n.body);r.query(a.string,a.values,(e,t)=>{if(e)throw e.stack;return t})},remove:async t=>{const n=await r.query(`delete FROM ${e.schema}.SYSTEM where id = $1`,[t]);return await n.rows[0]||{}}}})()},function(e,t,n){e.exports=(()=>{const e=n(5),t=n(6),r=n(8);n(3);let a=null;(async()=>{a=a||await e.connectDB()})();return{maintance:async(t,n)=>{a=a||await e.connectDB(),n=!0===n?1:!1===n?0:n,(await a.request()).query(`UPDATE  ${e.schema}.SYSTEM  SET MAINTANCE = ${n} WHERE ID = '${t}'`).then(e=>e).catch(e=>{console.log(e)})},get:async n=>{a=a||await e.connectDB();let r=await a.request();r.input("id",t.getType(n),n);const s=await r.query(`select * from ${e.schema}.SYSTEM where id = @id `);return await s.recordset[0]||{}},all:async()=>{a=a||await e.connectDB();const t=await a.request().query(`select * from ${e.schema}.SYSTEM`);return await t.recordset||[]},update:async t=>{a=a||await e.connectDB();let n=await a.request(),s=r.updatetQueryBuilder(e.schema+".SYSTEM",t.body,!0).string;try{n.query(s).then((e,t)=>{if(e)throw e.stack;return t}).catch((e,t)=>{if(e)throw e.stack;return t})}catch(e){console.log(e)}},save:async n=>{try{a=a||await e.connectDB();let r=t.insertQueryBuilder(e.schema+".SYSTEM",n.body),s=await a.request();r.values.forEach(e=>{e&&e.hasOwnProperty("name")&&s.input(e.name,e.type,e.value)}),s.query(r.string).then((e,t)=>{if(e)throw e.stack;return t})}catch(e){console.log(e)}},remove:async t=>{a=a||await e.connectDB();const n=await a.query(`delete FROM ${e.schema}.SYSTEM where id = '${t}'`);let r=await n.recordset;return(r&&r.length?r[0]:null)||{}}}})()},function(e,t,n){e.exports=(()=>{const e=n(4),t=n(7),r=e.connectDB();async function a(e){return new Buffer(e).toString("base64")}async function s(e){return new Buffer(e,"base64").toString("ascii")}const o=async(n,a)=>{r=r||await e.connectDB();let o=await r.request();o.input("id",t.getType(n),n);const i=await o.query(`select * from ${e.schema}.EMAIL where id = @id `);let c=await i.recordset[0];return a&&c&&(c.senha=await s(c.senha)),c||{}},i=async e=>{let t=await o(e.id);if(t&&t.id){let n=t.senha,r=await s(t.senha);return n==e.senha?n:r==e.senha?a(r):a(e.senha)}return a(e.senha)},c=async n=>{r=r||await e.connectDB();let a=await i(n.body);n.body.senha=a;let s=t.updatetQueryBuilder(e.schema+".SYSTEM",n.body);r.query(s.string,s.values,(e,t)=>{if(e)throw e.stack;return t})};return{get:o,update:c,save:async n=>{let a=await o(1);return a&&a.id?c(n):(async n=>{n.body.id=1;try{r=r||await e.connectDB();let a=JSON.parse(JSON.stringify(n.body)),s=await i(a);a.senha=s;let o=t.insertQueryBuilder(e.schema+".EMAIL",a);r.query(o.string,o.values,(e,t)=>{if(e)throw e.stack;return t})}catch(e){console.log(e)}})(n)}}})()},function(e,t,n){e.exports=(()=>{const e=n(5),t=n(6),r=n(8);let a=null;async function s(e){return new Buffer(e).toString("base64")}async function o(e){return new Buffer(e,"base64").toString("ascii")}(async()=>{a=a||await e.connectDB()})();const i=async(n,r)=>{a=a||await e.connectDB();let s=await a.request();s.input("id",t.getType(n),n);const i=await s.query(`select * from ${e.schema}.EMAIL where id = @id `);let c=await i.recordset[0];return r&&c&&(c.senha=await o(c.senha)),c||{}},c=async e=>{let t=await i(e.id);if(t&&t.id){let n=t.senha,r=await o(t.senha);return n==e.senha?n:r==e.senha?s(r):s(e.senha)}return s(e.senha)},l=async t=>{a=a||await e.connectDB();let n=await a.request(),s=await c(t.body);t.body.senha=s;let o=r.updatetQueryBuilder(e.schema+".EMAIL",t.body).string;try{n.query(o).then((e,t)=>{if(e)throw e.stack;return t}).catch((e,t)=>{if(e)throw e.stack;return t})}catch(e){console.log(e)}};return{get:i,update:l,save:async n=>{let r=await i(1);return r&&r.id?l(n):(async n=>{n.body.id=1;try{a=a||await e.connectDB();let r=JSON.parse(JSON.stringify(n.body)),s=await c(r);r.senha=s;let o=t.insertQueryBuilder(e.schema+".EMAIL",r),i=await a.request();o.values.forEach(e=>{e&&e.hasOwnProperty("name")&&i.input(e.name,e.type,e.value)}),i.batch(o.string).then((e,t)=>{if(e)throw e.stack;return t}).catch((e,t)=>{if(e)throw e.stack;return t})}catch(e){console.log(e)}})(n)}}})()},function(e,t,n){e.exports=(()=>{const e=n(0),t=n(9),r=n(27);return{router:n=>{n.get("/maintance",(async function(e,t){t.send(r.set(e.query.system))})),n.get("/config",(async function(t,n){let r=await e.system.all();n.send(r)})),n.post("/system",(async function(e,n){let r=t.system.save(e);n.send(r)})),n.delete("/system/:id",(async function(e,n){let r=t.system.remove(e.params.id);n.send({requested:"ok",result:r})})),n.put("/system",(async function(e,n){let r=t.system.update(e);n.send({requested:"ok",result:r})})),n.get("/now",(async function(e,n){t.request(e.query.system),n.send({requested:"ok"})}))}}})()},function(e,t,n){e.exports=(()=>{const e=n(22),t=n(23),r=n(1);let a={date:new Date,status:""};const s=(e,n,a,s)=>{n.response=new Date,n.status=a.status||"Erro",n.error=a.status?JSON.stringify(a.message):a.toString(),r.error(new Date+": Ocorreu um erro na requisicao para: "+e.name+". Erro: "+(n.error?n.error:n.status)),e.maintance?r.info(new Date+": "+e.name+" em manutenção."):t.sendError(e,n),s&&s(n)},o=async(t,n)=>{a.request=new Date;try{e(t.request_url).then(e=>{200==e.status?(a.status=e.status,a.response=new Date,n&&n(a)):s(t,a,e,n)}).catch(e=>{s(t,a,e,n)})}catch(e){s(t,a,e,n)}};return{fetchNow:o,fetchMe:async(e,t)=>{o(e,t)}}})()},function(e,t){e.exports=require("node-fetch")},function(e,t,n){e.exports=(()=>{const e=n(0),t=n(24),r=n(25),a=n(1);n(2).config();let s=null;let o=null,i=[],c={from:" Sistemas e Consultoria <alanemailsender@gmail.com>",subject:"Monitoramento de Sistemas -  Sistemas e Consultoria"};return{sendError:async(n,l)=>{if(s=await e.email.get(1,!0),!s)throw"Configuração de email não econtrada";var u;o=r.createTransport({service:"Gmail",host:s.host,port:s.port,secure:!0,auth:{user:s.email,pass:s.senha}}),c.html=t.get(n,l),c.from=` Sistemas e Consultoria <${s.sender}>`,i=s.destinations.split(";").filter(e=>e&&e.length&&e.length>1),"production"===process.env.MODE?(u=c,i.forEach(e=>{a.info("sending email to "+e),u.to=e,o.sendMail(u).then(e=>a.info("email sent to "+(e.accepted.length?e.accepted[0]:" ERROR MOTHERFUCKER"))).catch(t=>a.error(`There was an error while sending the email to ${e}:`,t))})):console.log("E-mail não enviado, em modo de desenvolvimento")}}})()},function(e,t){e.exports={get:(e,t)=>`\n\t\t<html lang="en" xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">\n\n<head>\n    <meta charset="utf-8">\n    <meta name="viewport" content="width=device-width">\n    <meta http-equiv="X-UA-Compatible" content="IE=edge">\n    <meta name="x-apple-disable-message-reformatting">\n    <meta name="format-detection" content="telephone=no,address=no,email=no,date=no,url=no">\n    <title>  Monitor de Sistemas - Falha!!!!</title>\n    <style>\n        /* What it does: Remove spaces around the email design added by some email clients. */\n        /* Beware: It can remove the padding / margin and add a background color to the compose a reply window. */\n\n        html,\n        body {\n\n          background: #0072ae !important;\n            margin: 0 !important;\n            padding: 0 !important;\n            height: 100% !important;\n            width: 100% !important;\n        }\n        /* What it does: Stops email clients resizing small text. */\n\n        * {\n            -ms-text-size-adjust: 100%;\n            -webkit-text-size-adjust: 100%;\n        }\n        /* What it does: Centers email on Android 4.4 */\n\n        div[style*="margin: 16px 0"] {\n            margin: 0 !important;\n        }\n        /* What it does: Stops Outlook from adding extra spacing to tables. */\n\n        table,\n        td {\n            mso-table-lspace: 0pt !important;\n            mso-table-rspace: 0pt !important;\n        }\n        /* What it does: Fixes webkit padding issue. */\n\n        table {\n            border-spacing: 0 !important;\n            border-collapse: collapse !important;\n            table-layout: fixed !important;\n            margin: 0 auto !important;\n        }\n        /* What it does: Uses a better rendering method when resizing images in IE. */\n\n        img {\n            -ms-interpolation-mode: bicubic;\n        }\n        /* What it does: Prevents Windows 10 Mail from underlining links despite inline CSS. Styles for underlined links should be inline. */\n\n        a {\n            text-decoration: none;\n        }\n        /* What it does: A work-around for email clients meddling in triggered links. */\n\n        a[x-apple-data-detectors],\n        /* iOS */\n\n        .unstyle-auto-detected-links a,\n        .aBn {\n            border-bottom: 0 !important;\n            cursor: default !important;\n            color: inherit !important;\n            text-decoration: none !important;\n            font-size: inherit !important;\n            font-family: inherit !important;\n            font-weight: inherit !important;\n            line-height: inherit !important;\n        }\n        /* What it does: Prevents Gmail from displaying a download button on large, non-linked images. */\n\n        .a6S {\n            display: none !important;\n            opacity: 0.01 !important;\n        }\n        /* What it does: Prevents Gmail from changing the text color in conversation threads. */\n\n        .im {\n            color: inherit !important;\n        }\n        /* If the above doesn't work, add a .g-img class to any image in question. */\n\n        img.g-img + div {\n            display: none !important;\n        }\n        /* What it does: Removes right gutter in Gmail iOS app: https://github.com/TedGoas/Cerberus/issues/89  */\n        /* Create one of these media queries for each additional viewport size you'd like to fix */\n        /* iPhone 4, 4S, 5, 5S, 5C, and 5SE */\n\n        @media only screen and (min-device-width: 320px) and (max-device-width: 374px) {\n            u ~ div .email-container {\n                min-width: 320px !important;\n            }\n        }\n        /* iPhone 6, 6S, 7, 8, and X */\n\n        @media only screen and (min-device-width: 375px) and (max-device-width: 413px) {\n            u ~ div .email-container {\n                min-width: 375px !important;\n            }\n        }\n        /* iPhone 6+, 7+, and 8+ */\n\n        @media only screen and (min-device-width: 414px) {\n            u ~ div .email-container {\n                min-width: 414px !important;\n            }\n        }\n    </style>\n    <style>\n        /* What it does: Hover styles for buttons */\n\n        .button-td,\n        .button-a {\n            transition: all 100ms ease-in;\n        }\n\n        .button-td-primary:hover,\n        .button-a-primary:hover {\n            background: #76a3c9 !important;\n            border-color: #76a3c9 !important;\n        }\n        /* Media Queries */\n\n        @media screen and (max-width: 600px) {\n            /* What it does: Adjust typography on small screens to improve readability */\n            .email-container p {\n                font-size: 17px !important;\n            }\n        }\n    </style>\n</head>\n\n<body width="100%" style="margin: 0; padding: 0 !important; mso-line-height-rule: exactly;\n          background: #0072ae !important;">\n    <center style="width: 100%;\n          background: #0072ae !important; padding-top:40px">\n        <div style="display: none; font-size: 1px; line-height: 1px; max-height: 0px; max-width: 0px; opacity: 0; overflow: hidden; mso-hide: all; font-family: sans-serif;"></div>\n        <div style="display: none; font-size: 1px; line-height: 1px; max-height: 0px; max-width: 0px; opacity: 0; overflow: hidden; mso-hide: all; font-family: sans-serif;">\n            &zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;\n        </div>\n        <div style="max-width: 600px; margin: 0 auto;" class="email-container">\n            <table align="center" role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="margin: auto;">\n                <tbody>\n                    <tr>\n                        <td style="background-color: #e9f2f8;">\n                            <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">\n                                <tbody>\n                                    <tr style="    color: #0172ae;    background-color: #e9f2f8;">\n                                        <td style="padding:5px  20px;font-family: sans-serif;font-size: 15px;line-height: 20px;color: #0172ae;">\n                                            <p>\n                                               O sistema <strong>${e.name} </strong> apresentou erro na requisição da url <br> <em><small>${e.request_url}</small></em>.</p>\n\t\t\t\t\t\t\t\t\t\t\t<h4>Dados da requisição:</h4>\n                                          <pre><code>${JSON.stringify(t)}</code></pre>\n                                               <table>\n                                                 \n                                          </table>\n                                        </td>\n                                    </tr>\n                                    <tr style="    background-color: #e9f2f8;">\n                                        <td style="padding: 0;font-family: sans-serif;font-size: 14px;line-height: 20px;color: #0172ae;text-align:center; width: 100px; background:#e9f2f8">\n\t\t\t\t\t\t\t\t\t\t<img src="https://sistemas.com.br/imagens/logo.png" style="width: 80px"></td>\n                                    </tr>\n\t\t\t\t\t\t\t\t\t\n                                   \n                                </tbody>\n                            </table>\n                        </td>\n                    </tr>\n                    <tr>\n                        <td aria-hidden="true" height="40" style="font-size: 0px; line-height: 0px;">\n                            &nbsp;\n                        </td>\n                    </tr>\n                </tbody>\n            </table>\n            <table align="center" role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="margin: auto;">\n                <tbody>\n                    <tr>\n                        <td style="padding: 20px; font-family: sans-serif; font-size: 12px; line-height: 15px; text-align: center; color: #888888;">\n                            <br>\n                            <br><a style="    color: #0075b1;    text-decoration: none;;" href="https://sistemas.com.br/"> Sistemas e Consultoria</a></td>\n                    </tr>\n                </tbody>\n            </table>\n        </div>\n    </center>\n</body>\n\n</html>\n\t\t`}},function(e,t){e.exports=require("nodemailer")},function(e,t,n){e.exports=(()=>{const e=n(0);return{save:async t=>await e.system.save(t),get:async t=>await e.system.get(t),list:async()=>await e.system.all(),remove:async t=>await e.system.remove(t),update:async t=>await e.system.update(t)}})()},function(e,t,n){e.exports=(()=>{const e=n(0);return{set:async t=>{var n=await e.system.get(t);if(!n)return"erro";try{return null==n.maintance?n.maintance=!0:n.maintance=!n.maintance,e.system.maintance(t,n.maintance),"ok"}catch(e){return"erro"}}}})()},function(e,t,n){e.exports=(()=>{const e=n(0);n(1);return{router:t=>{t.get("/email/:id",(async function(t,n){let r=await e.email.get(t.params.id);n.send(r||{})})),t.post("/email",(async function(t,n){let r=e.email.save(t);n.send(r)})),t.put("/email/:id",(async function(t,n){let r=e.email.update(t);n.send({requested:"ok",result:r})}))}}})()},function(e,t){e.exports=require("body-parser")},function(e,t,n){e.exports=(()=>{const e=n(31),t=n(9),r=n(1);return{start:()=>{t.requests(),e.schedule(" */10 * * * *",()=>{r.info("Running requests"),t.requests()})}}})()},function(e,t){e.exports=require("node-cron")},function(e,t){e.exports=require("express")}]);