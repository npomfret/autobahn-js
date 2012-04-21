/*
 * Crypto-JS v2.5.3
 * http://code.google.com/p/crypto-js/
 * (c) 2009-2012 by Jeff Mott. All rights reserved.
 * http://code.google.com/p/crypto-js/wiki/License
 */
(function(g){function k(c,b){var a=c._blocksize*4;return a-b.length%a}var j=g.pad={},f=function(c){for(var b=c.pop(),a=1;a<b;a++)c.pop()};j.NoPadding={pad:function(){},unpad:function(){}};j.ZeroPadding={pad:function(c,b){var a=c._blocksize*4,d=b.length%a;if(d!=0)for(d=a-d;d>0;d--)b.push(0)},unpad:function(){}};j.iso7816={pad:function(c,b){var a=k(c,b);for(b.push(128);a>1;a--)b.push(0)},unpad:function(c){for(;c.pop()!=128;);}};j.ansix923={pad:function(c,b){for(var a=k(c,b),d=1;d<a;d++)b.push(0);b.push(a)},
unpad:f};j.iso10126={pad:function(c,b){for(var a=k(c,b),d=1;d<a;d++)b.push(Math.floor(Math.random()*256));b.push(a)},unpad:f};j.pkcs7={pad:function(c,b){for(var a=k(c,b),d=0;d<a;d++)b.push(a)},unpad:f};var g=g.mode={},h=g.Mode=function(c){if(c)this._padding=c};h.prototype={encrypt:function(c,b,a){this._padding.pad(c,b);this._doEncrypt(c,b,a)},decrypt:function(c,b,a){this._doDecrypt(c,b,a);this._padding.unpad(b)},_padding:j.iso7816};f=(g.ECB=function(){h.apply(this,arguments)}).prototype=new h;f._doEncrypt=
function(c,b){for(var a=c._blocksize*4,d=0;d<b.length;d+=a)c._encryptblock(b,d)};f._doDecrypt=function(c,b){for(var a=c._blocksize*4,d=0;d<b.length;d+=a)c._decryptblock(b,d)};f.fixOptions=function(c){c.iv=[]};f=(g.CBC=function(){h.apply(this,arguments)}).prototype=new h;f._doEncrypt=function(c,b,a){for(var d=c._blocksize*4,e=0;e<b.length;e+=d){if(e==0)for(var i=0;i<d;i++)b[i]^=a[i];else for(i=0;i<d;i++)b[e+i]^=b[e+i-d];c._encryptblock(b,e)}};f._doDecrypt=function(c,b,a){for(var d=c._blocksize*4,e=
0;e<b.length;e+=d){var i=b.slice(e,e+d);c._decryptblock(b,e);for(var f=0;f<d;f++)b[e+f]^=a[f];a=i}};f=(g.CFB=function(){h.apply(this,arguments)}).prototype=new h;f._padding=j.NoPadding;f._doEncrypt=function(c,b,a){for(var d=c._blocksize*4,a=a.slice(0),e=0;e<b.length;e++){var f=e%d;f==0&&c._encryptblock(a,0);b[e]^=a[f];a[f]=b[e]}};f._doDecrypt=function(c,b,a){for(var d=c._blocksize*4,a=a.slice(0),e=0;e<b.length;e++){var f=e%d;f==0&&c._encryptblock(a,0);var g=b[e];b[e]^=a[f];a[f]=g}};f=(g.OFB=function(){h.apply(this,
arguments)}).prototype=new h;f._padding=j.NoPadding;f._doEncrypt=function(c,b,a){for(var d=c._blocksize*4,a=a.slice(0),e=0;e<b.length;e++)e%d==0&&c._encryptblock(a,0),b[e]^=a[e%d]};f._doDecrypt=f._doEncrypt;g=(g.CTR=function(){h.apply(this,arguments)}).prototype=new h;g._padding=j.NoPadding;g._doEncrypt=function(c,b,a){for(var d=c._blocksize*4,a=a.slice(0),e=0;e<b.length;){var f=a.slice(0);c._encryptblock(f,0);for(var g=0;e<b.length&&g<d;g++,e++)b[e]^=f[g];++a[d-1]==256&&(a[d-1]=0,++a[d-2]==256&&
(a[d-2]=0,++a[d-3]==256&&(a[d-3]=0,++a[d-4])))}};g._doDecrypt=g._doEncrypt})(Crypto);
