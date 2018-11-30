
define(["dojo/_base/declare","dijit/layout/ContentPane"],
        function(declare,ContentPane){
            return declare("myContentPane",ContentPane,{
                title:"myTitle",
                content:"myContent",
                constructor: function(args){
                    declare.safeMixin(this,args);
                },
                preprocessContent:function(/*String|DocumentFragment*/ content){
                    var resCode={code:""};
                    this.snarfScripts(content,resCode);
                    console.log("rs=",resCode.code);
                    console.log("c=",resCode.cont);
                    return content;
                },

                snarfScripts: function (cont, resCode){
                    // match <script>, <script type="text/..., but not <script type="dojo(/method)...

                    return resCode.cont=cont.replace(/<script\s*(?![^>]*type=['"]?(?:dojo\/|text\/html\b))[^>]*?(?:src=(['"]?)([^>]*?)\1[^>]*)?>([\s\S]*?)<\/script>/gi,
                        function(ignore, delim, src, code){
                            if(src){

                            }else{

                                if(resCode.code !=="") {
                                    code = "\n" + code;
                                }
                                resCode.code += code+";";

                            }
                            return "";
                        }
                    );
                }
            });
        });