var debug;
var scrollListener;

window.onload = function(){
    init();
}

/** 
 * INITIALIZE
 * ----------------------------------------------------------------------
 * The inital Function that runs after the constructor
 * ----------------------------------------------------------------------
 */
function init(){
    console.log("%cInitializing...","color:#999");
    setupDebug();
    connectToC(document.getElementById('table-of-contents'),'main-section');
}

function connectToC(elem,sectionClass){
  tableOfContents = new TableOfContents(elem,sectionClass);
  tableOfContents.buildTableOfContents();
  tableOfContents.attachListeners();
}

/**
 * SETUP DEBUG
 * ----------------------------------------------------------------------
 * Creates an instance of the Debug Class
 * ----------------------------------------------------------------------
 */
 function setupDebug(){
  debug = new DEBUGTOOL(false,null,[8,8,16]);
}
