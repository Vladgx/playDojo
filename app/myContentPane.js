
define(["dojo/_base/declare","dijit/layout/ContentPane"],
        function(declare,ContentPane){
            return declare("myContentPane",ContentPane,{
                title:"myTitle",
                content:"myContent",
                constructor: function(args){
                    declare.safeMixin(this,args);
                },
                preprocessContent:function(/*String|DocumentFragment*/ content){
                    var resCode={code:[]};
                    this.snarfScripts(content,resCode);
                    this._code=resCode.code;
                    return resCode.cont;
                },
                onLoad :function(){
                    if(this._code.length>0){                                                    //console.log(this._code);
                        var n = this.containerNode.ownerDocument.createElement('script');
                        n.type = "text/javascript";
                        n.text = "";
                        this.containerNode.appendChild(n);
                        for(var i=0;i<this._code.length;i++){
                            if(n.text==""){n.text = "require(['dijit/registry'],function(registry){ var self=registry.byId('"+this.id+"'); self.script_"+i+"= function(){"+this._code[i]+"}; self.script_"+i+"(); });";}
                            else{n.text += "\nrequire(['dijit/registry'],function(registry){ var self=registry.byId('"+this.id+"'); self.script_"+i+"= function(){"+this._code[i]+"}; self.script_"+i+"(); });";}
                        }                                                                       console.log(n.text);

                    }

                    console.log(this);
                  //  n.text = "require(['dijit/registry'],function(registry){ var self=registry.byId('"+this.id+"'); self.script= function(){"+this._code+"}; self.script(); })";
                },

                snarfScripts: function (cont, resCode){
                    // match <script>, <script type="text/..., but not <script type="dojo(/method)...

                    return resCode.cont=cont.replace(/<script\s*(?![^>]*type=['"]?(?:dojo\/|text\/html\b))[^>]*?(?:src=(['"]?)([^>]*?)\1[^>]*)?>([\s\S]*?)<\/script>/gi,
                        function(ignore, delim, src, code){
                            if(src){

                            }else{
                                resCode.code.push(code);

                            }
                            return "";
                        }
                    );
                }

            //    pageContentPane1.set("content","");                                                console.log('pageContentPane1',pageContentPane1);
            //pageContentPane1.set("href","/ipage1");
            //pageContentPane1.onDownloadEnd= function(){                                                console.log('pageContentPane1.onDownloadEnd',this);
            //    var dn=pageContentPane1.domNode;                                         console.log('pageContentPane1.domNode',pageContentPane1.domNode);
            //    var innerScriptTag=dn.getElementsByTagName("script");                          console.log('script123',innerScriptTag,innerScriptTag[0],innerScriptTag.length);
            //    var innerScriptText=innerScriptTag[0].innerText;
            //    var innerScriptTagItem=innerScriptTag[0], parent=innerScriptTagItem.parentNode;
            //    for(var i in parent.children){
            //        var parentChild=parent.children[i];
            //        if(parentChild==innerScriptTagItem)parent.children[i].remove();
            //    }
            //    var s0="require(['dijit/registry'],function (registry){ var self=registry.byId('PageContentPane_1'); self.script0=function(){ "+innerScriptText+" }; self.script0(); })";
            //    var n = document.createElement('script');n.type = "text/javascript";                            console.log('s0=',s0);
            //    pageContentPane1.domNode.appendChild(n);
            //    n.text = s0;
        //    };
        //
        });
        });