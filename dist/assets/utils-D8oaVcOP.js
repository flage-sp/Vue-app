function i(n,t){let e=null;return function(){return new Promise(r=>{e&&clearTimeout(e),e=setTimeout(async()=>{const u=await n();r(u),e=null},t)})}}export{i as d};
