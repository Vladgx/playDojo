
define(["dojo/_base/declare","dojox/layout/ContentPane"],
        function(declare,ContentPane){
            return declare("myContentPane",ContentPane,{
                title:"myTitle",
                content:"myContent",
                constructor: function(args){
                    declare.safeMixin(this,args);
                }
            });
        });