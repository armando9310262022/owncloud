define(["exports","./vendor-e2ecbc23","./useClientService-0039200a"],(function(e,t,r){"use strict";const u=({store:e})=>t.computed((()=>e.getters["runtime/auth/isPublicLinkContextReady"])),n=({store:e})=>t.computed((()=>e.getters["runtime/auth/publicLinkPassword"]));e.usePublicLinkContext=u,e.usePublicLinkPassword=n,e.useRequest=function(e={}){const s=e.clientService??r.useClientService(),i=e.store??r.useStore(),o=u({store:i}),c=n({store:i}),a=r.useAccessToken({store:i}),d=(({store:e})=>t.computed((()=>e.getters["runtime/auth/publicLinkToken"])))({store:i});return{makeRequest:(e,r,u)=>{let n;return n=t.unref(a)?s.httpAuthenticated(t.unref(a)):s.httpUnAuthenticated,(u=u||{}).headers=u.headers||{},t.unref(o)&&(t.unref(c)&&(u.headers.Authorization="Basic "+t.Buffer.from(["public",t.unref(c)].join(":")).toString("base64")),t.unref(d)&&(u.headers["public-token"]=t.unref(d))),u.method=e,u.url=r,n.request(u)}}}}));