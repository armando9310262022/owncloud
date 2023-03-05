define(["./chunks/vendor-e2ecbc23","./chunks/useAppDefaults-5dde407f","./chunks/useClientService-0039200a","./chunks/functions-31457630","./chunks/useRequest-915f01e1","./chunks/loadPreview-ce302639","./chunks/manager-1f78e82e","./chunks/useRoute-035af8cd"],(function(e,i,t,a,s,n,r,o){"use strict";var l={cs:{},de:{"%{ displayIndex } of %{ availableMediaFiles }":"%{ displayIndex } von %{ availableMediaFiles }","Download currently viewed file":"Aktuell betrachtete Datei herunterladen","Failed to load media file":"Fehler beim Laden der Mediendatei","Loading media file":"Lade Mediendatei","Media file %{ displayIndex } of %{ availableMediaFiles }":"Mediendatei %{ displayIndex } von %{ availableMediaFiles }",msg:"Nachricht",Preview:"Vorschau","Preview for %{currentMediumName}":"Vorschau für %{currentMediumName}","Show next media file in folder":"Nächste Mediendatei im Order anzeigen","Show previous media file in folder":"Vorherige Mediendatei im Order anzeigen"},es:{msg:"msg"},fr:{"%{ displayIndex } of %{ availableMediaFiles }":"%{ displayIndex } de %{ availableMediaFiles }","Download currently viewed file":"Télécharger le fichier affiché","Failed to load media file":"Impossible de charger le fichier média","Loading media file":"Chargement du fichier média","Media file %{ displayIndex } of %{ availableMediaFiles }":"Fichier média %{ displayIndex } de %{ availableMediaFiles }",msg:"msg",Preview:"Prévisualisation","Preview for %{currentMediumName}":"Prévisualisation de %{currentMediumName}","Show next media file in folder":"Afficher le fichier média suivant","Show previous media file in folder":"Afficher le fichier média précédent"},gl:{msg:"msx"},it:{}};const d=e.defineComponent({name:"Preview",components:{AppTopBar:e.__vue_component__$4},setup(){const e=t.useStore();return{...i.useAppDefaults({applicationId:"preview"}),accessToken:t.useAccessToken({store:e}),isPublicLinkContext:s.usePublicLinkContext({store:e})}},data:()=>({isFileContentLoading:!0,isFileContentError:!1,activeIndex:null,direction:"rtl",cachedFiles:[]}),computed:{...e.mapGetters(["capabilities","user"]),pageTitle(){const e=this.$gettext("Preview for %{currentMediumName}");return this.$gettextInterpolate(e,{currentMediumName:this.activeFilteredFile?.name})},ariaHiddenFileCount(){const e=this.$gettext("%{ displayIndex } of %{ availableMediaFiles }");return this.$gettextInterpolate(e,{displayIndex:this.activeIndex+1,availableMediaFiles:this.filteredFiles.length})},screenreaderFileCount(){const e=this.$gettext("Media file %{ displayIndex } of %{ availableMediaFiles }");return this.$gettextInterpolate(e,{displayIndex:this.activeIndex+1,availableMediaFiles:this.filteredFiles.length})},filteredFiles(){return this.activeFiles?this.activeFiles.filter((e=>p.mimeTypes().includes(e.mimeType?.toLowerCase()))):[]},activeFilteredFile(){return this.filteredFiles[this.activeIndex]},activeMediaFileCached(){const e=this.cachedFiles.find((e=>e.id===this.activeFilteredFile.id));return void 0!==e&&e},thumbDimensions(){switch(!0){case window.innerWidth<=1024:return 1024;case window.innerWidth<=1280:return 1280;case window.innerWidth<=1920:return 1920;case window.innerWidth<=2160:return 2160;default:return 3840}},rawMediaUrl(){return this.getUrlForResource(this.activeFilteredFile)},isActiveFileTypeImage(){return!this.isActiveFileTypeAudio&&!this.isActiveFileTypeVideo},isActiveFileTypeAudio(){return this.activeFilteredFile.mimeType.toLowerCase().startsWith("audio")},isActiveFileTypeVideo(){return this.activeFilteredFile.mimeType.toLowerCase().startsWith("video")},isUrlSigningEnabled(){return this.capabilities.core&&this.capabilities.core["support-url-signing"]}},watch:{activeIndex(e,i){e!==i&&this.loadMedium()}},async mounted(){window.addEventListener("popstate",this.handleLocalHistoryEvent),await this.loadFolderForFileContext(this.currentFileContext),this.setActiveFile(this.currentFileContext.path),this.$refs.preview.focus()},beforeDestroy(){window.removeEventListener("popstate",this.handleLocalHistoryEvent),this.cachedFiles.forEach((e=>{this.revokeUrl(e.url)}))},methods:{setActiveFile(e){for(let i=0;i<this.filteredFiles.length;i++)if(this.filteredFiles[i].webDavPath===e)return void(this.activeIndex=i);this.isFileContentLoading=!1,this.isFileContentError=!0},handleLocalHistoryEvent(){const e=this.$router.resolve(document.location);this.setActiveFile(e.route.params.filePath)},updateLocalHistory(){this.$route.params.filePath=this.activeFilteredFile.webDavPath,history.pushState({},document.title,this.$router.resolve(this.$route).href)},loadMedium(){this.isFileContentLoading=!0,this.activeMediaFileCached?setTimeout((()=>{this.isFileContentLoading=!1}),50):this.loadActiveFileIntoCache()},async loadActiveFileIntoCache(){try{let e;e=!this.isActiveFileTypeImage?await this.getUrlForResource(this.activeFilteredFile):await n.loadPreview({resource:this.activeFilteredFile,isPublic:this.isPublicLinkContext,server:r.configurationManager.serverUrl,userId:this.user.id,token:this.accessToken,dimensions:[this.thumbDimensions,this.thumbDimensions]}),this.cachedFiles.push({id:this.activeFilteredFile.id,name:this.activeFilteredFile.name,url:e,ext:this.activeFilteredFile.extension,mimeType:this.activeFilteredFile.mimeType,isVideo:this.isActiveFileTypeVideo,isImage:this.isActiveFileTypeImage,isAudio:this.isActiveFileTypeAudio}),this.isFileContentLoading=!1,this.isFileContentError=!1}catch(e){this.isFileContentLoading=!1,this.isFileContentError=!0,console.error(e)}},triggerActiveFileDownload(){if(!this.isFileContentLoading)return this.downloadFile(this.activeFilteredFile)},next(){this.isFileContentLoading||(this.isFileContentError=!1,this.direction="rtl",this.activeIndex+1>=this.filteredFiles.length?this.activeIndex=0:(this.activeIndex++,this.updateLocalHistory()))},prev(){this.isFileContentLoading||(this.isFileContentError=!1,this.direction="ltr",0!==this.activeIndex?(this.activeIndex--,this.updateLocalHistory()):this.activeIndex=this.filteredFiles.length-1)}}});var c=function(){var e=this,i=e.$createElement,t=e._self._c||i;return t("main",{ref:"preview",attrs:{id:"preview",tabindex:"-1"},on:{keydown:[function(i){return!i.type.indexOf("key")&&e._k(i.keyCode,"left",37,i.key,["Left","ArrowLeft"])||"button"in i&&0!==i.button?null:e.prev.apply(null,arguments)},function(i){return!i.type.indexOf("key")&&e._k(i.keyCode,"right",39,i.key,["Right","ArrowRight"])||"button"in i&&2!==i.button?null:e.next.apply(null,arguments)},function(i){return!i.type.indexOf("key")&&e._k(i.keyCode,"esc",27,i.key,["Esc","Escape"])?null:e.closeApp.apply(null,arguments)}]}},[t("h1",{staticClass:"oc-invisible-sr",domProps:{textContent:e._s(e.pageTitle)}}),e._v(" "),t("app-top-bar",{attrs:{resource:e.activeFilteredFile},on:{close:e.closeApp},scopedSlots:e._u([{key:"right",fn:function(){return[e.isFileContentError?e._e():t("oc-button",{staticClass:"preview-download",attrs:{size:"small","aria-label":e.$gettext("Download currently viewed file")},on:{click:e.triggerActiveFileDownload}},[t("oc-icon",{attrs:{size:"small",name:"file-download"}})],1)]},proxy:!0}])}),e._v(" "),e.isFolderLoading||e.isFileContentLoading?t("div",{staticClass:"oc-position-center"},[t("oc-spinner",{attrs:{"aria-label":e.$gettext("Loading media file"),size:"xlarge"}})],1):e.isFileContentError?t("oc-icon",{staticClass:"oc-position-center",attrs:{name:"file-damage",variation:"danger",size:"xlarge","accessible-label":e.$gettext("Failed to load media file")}}):[t("div",{directives:[{name:"show",rawName:"v-show",value:e.activeMediaFileCached,expression:"activeMediaFileCached"}],staticClass:"\n        oc-width-1-1 oc-flex oc-flex-center oc-flex-middle oc-p-s oc-box-shadow-medium\n        preview-player\n      "},[e.activeMediaFileCached.isImage?t("img",{key:"media-image-"+e.activeMediaFileCached.id,attrs:{src:e.activeMediaFileCached.url,alt:e.activeMediaFileCached.name,"data-id":e.activeMediaFileCached.id}}):e.activeMediaFileCached.isVideo?t("video",{key:"media-video-"+e.activeMediaFileCached.id,attrs:{controls:"",preload:""}},[t("source",{attrs:{src:e.activeMediaFileCached.url,type:e.activeMediaFileCached.mimeType}})]):e.activeMediaFileCached.isAudio?t("audio",{key:"media-audio-"+e.activeMediaFileCached.id,attrs:{controls:"",preload:""}},[t("source",{attrs:{src:e.activeMediaFileCached.url,type:e.activeMediaFileCached.mimeType}})]):e._e()])],e._v(" "),t("div",{staticClass:"oc-position-medium oc-position-bottom-center preview-details"},[t("div",{staticClass:"\n        oc-background-brand\n        oc-p-s\n        oc-width-large\n        oc-flex\n        oc-flex-middle\n        oc-flex-center\n        oc-flex-around\n        preview-controls-action-bar\n      "},[t("oc-button",{staticClass:"preview-controls-previous",attrs:{appearance:"raw",variation:"inverse","aria-label":e.$gettext("Show previous media file in folder")},on:{click:e.prev}},[t("oc-icon",{attrs:{size:"large",name:"arrow-drop-left"}})],1),e._v(" "),e.isFolderLoading?e._e():t("p",{staticClass:"oc-m-rm preview-controls-action-count"},[t("span",{attrs:{"aria-hidden":"true"},domProps:{textContent:e._s(e.ariaHiddenFileCount)}}),e._v(" "),t("span",{staticClass:"oc-invisible-sr",domProps:{textContent:e._s(e.screenreaderFileCount)}})]),e._v(" "),t("oc-button",{staticClass:"preview-controls-next",attrs:{appearance:"raw",variation:"inverse","aria-label":e.$gettext("Show next media file in folder")},on:{click:e.next}},[t("oc-icon",{attrs:{size:"large",name:"arrow-drop-right"}})],1)],1)])],2)};c._withStripped=!0;const h="preview",u=[{path:"/:filePath*",component:e.normalizeComponent({render:c,staticRenderFns:[]},undefined,d,"data-v-d3d7c92c",false,undefined,!1,void 0,void 0,void 0),name:"media",meta:{auth:!1,title:"Preview",patchCleanPath:!0}}],v=()=>["audio/flac","audio/mpeg","audio/ogg","audio/wav","audio/x-flac","audio/x-wav","image/gif","image/jpeg","image/png","video/mp4","video/webm",...window.Vue.$store.getters.extensionConfigByAppId(h).mimeTypes||[]];var p={appInfo:{name:"Preview",id:h,icon:"eye",extensions:v().map((e=>({canBeDefault:!0,mimeType:e,routeName:"preview-media",label:"Preview"})))},routes:u,translations:l,mimeTypes:v};return p}));
