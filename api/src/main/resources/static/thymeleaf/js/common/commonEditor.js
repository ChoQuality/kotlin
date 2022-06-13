function CustomEditor() {
    "use strict";

    this.instance = [];
    this.setNaverEditor =function(instance, id) {
        nhn.husky.EZCreator.createInIFrame({
            oAppRef: instance,
            elPlaceHolder: id,  //textarea ID
            sSkinURI: "/editor/SmartEditor2Skin.html",  //skin경로
            fCreator: "createSEditor2",
            htParams: { fOnBeforeUnload : function(){}}
        });
    }
}
