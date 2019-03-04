var xmldom       = require('xmldom');

function XMLBeautifier() {
  this.shift = ['\n']; // array of shifts
  this.step = '    ', // 2 spaces
    maxdeep = 100, // nesting level
    ix = 0;

  // initialize array with shifts //
  for(ix=0;ix<maxdeep;ix++){
    this.shift.push(this.shift[ix]+this.step);
  }
};
XMLBeautifier.prototype.beautify = function(text) {

  var ar = text.replace(/>\s{0,}</g,"><")
         .replace(/</g,"~::~<")
//         .replace(/xmlns\:/g,"~::~xmlns:")
//         .replace(/xmlns\=/g,"~::~xmlns=")
                 //.replace(/\s(?=[^x\s][\w]*=/g, "~::~")
                 .replace(/\s+(?=[\w|\:]+=\".+\")/g, " ~::~")
         .split('~::~'),
    len = ar.length,
    inComment = false,
    deep = 0,
    str = '',
    ix = 0;
    for(ix=0;ix<len;ix++) {
      // start comment or <![CDATA[...]]> or <!DOCTYPE //
      if(ar[ix].search(/<!/) > -1) {
        str += this.shift[deep]+ar[ix];
        inComment = true;
        // end comment  or <![CDATA[...]]> //
        if(ar[ix].search(/-->/) > -1 || ar[ix].search(/\]>/) > -1 || ar[ix].search(/!DOCTYPE/) > -1 ) {
          inComment = false;
        }
      } else
      // end comment  or <![CDATA[...]]> //
      if(ar[ix].search(/-->/) > -1 || ar[ix].search(/\]>/) > -1) {
        str += ar[ix];
        inComment = false;
      } else
      // <elm></elm> //
      if( /^<\w/.exec(ar[ix-1]) && /^<\/\w/.exec(ar[ix]) &&
        /^<[\w:\-\.\,]+/.exec(ar[ix-1]) == /^<\/[\w:\-\.\,]+/.exec(ar[ix])[0].replace('/','')) {
        str += ar[ix];
        if(!inComment) deep--;
      } else
       // <elm> //
      if(ar[ix].search(/<\w/) > -1 && ar[ix].search(/<\//) == -1 && ar[ix].search(/\/>/) == -1 ) {
        str = !inComment ? str += this.shift[deep++]+ar[ix] : str += ar[ix];
      } else
       // <elm>...</elm> //
      if(ar[ix].search(/<\w/) > -1 && ar[ix].search(/<\//) > -1) {
        str = !inComment ? str += this.shift[deep]+ar[ix] : str += ar[ix];
      } else
      // </elm> //
      if(ar[ix].search(/<\//) > -1) {
        str = !inComment ? str += this.shift[--deep]+ar[ix] : str += ar[ix];
      } else
      // <elm/> //
      if(ar[ix].search(/\/>/) > -1 ) {
        str = !inComment ? str += this.shift[deep]+ar[ix] : str += ar[ix];
      } else
      // <? xml ... ?> //
      if(ar[ix].search(/<\?/) > -1) {
        str += this.shift[deep]+ar[ix];
      } else
      // xmlns //
      if( ar[ix].search(/xmlns\:/) > -1  || ar[ix].search(/xmlns\=/) > -1
          || ar[ix].search(/version\=/) > -1 || ar[ix].search(/encoding\=/) > -1) {
        str += ar[ix];
      }
            else if( ar[ix].search(/[^x][\w|\:]+=\".+\"/) > -1) {
                str += this.shift[deep]+ar[ix];
            }
      else {
        str += ar[ix];
      }
    }
  return  (str[0] == '\n') ? str.slice(1) : str;
}

function modifyXMLAttr(data, obj){
    var doc,
        jcr_root
        touched = false;
        doc = new xmldom.DOMParser().parseFromString(data, 'application/xml');
        jcr_root = doc.getElementsByTagName('jcr:root')[0];
        //jcr_root.setAttribute('jcr:title', component_name);
        for(var attr in obj){
           if(jcr_root.getAttribute(attr) && jcr_root.getAttribute(attr) !== obj[attr]){
              jcr_root.setAttribute(attr, obj[attr]);
              touched = true;
              console.log('changed ' + attr + ' to ' + obj[attr]);
           }
        }
        var modifiedXML = new xmldom.XMLSerializer().serializeToString(doc);
        var xmlBeautifier = new XMLBeautifier;
        var result = {
           newXML: xmlBeautifier.beautify(modifiedXML),
           touched: touched
        }
        return result;
}

module.exports = {
    modifyXMLAttr: modifyXMLAttr
}