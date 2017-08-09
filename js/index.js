/* Buttons */
var uploadButton = document.getElementById("upload-cc-file");

/* CSInterface Library Object Init*/
var CSLibrary = new CSInterface();

/* Add click handler to call upload function*/
uploadButton.addEventListener('click', uploadFiles, false);

/* Add change handler to call file select function */
document.getElementById('files').addEventListener('change', handleFileSelect, false);

var files; 

/* Helper Functions*/
function handleFileSelect(evt) {
	clearChildren("upload-result-indicator")
	files = evt.target.files;
    // Loop through the FileList and render image files as thumbnails.
    for (var i = 0, f; f = files[i]; i++) {
      // Only process image files.
      if (!f.type.match('image.*')) {
        continue;
      }
      var reader = new FileReader();
      // Closure to capture the file information.
      reader.onload = (function(theFile) {
        return function(e) {
          // Render thumbnail.
        		createSpanAndInsert(['<img class="thumb" src="', e.target.result,
        '" title="', escape(theFile.name), '"/>'].join(''), 'list')
        };
      })(f);
      // Read in the image file as a data URL.
      reader.readAsDataURL(f);
    }
  }

function uploadFiles() {
	clearChildren("upload-result-indicator")
	var myDocPath = CSLibrary.getSystemPath(SystemPath.MY_DOCUMENTS)
    var cloudPath = myDocPath.replace("Documents", "Creative Cloud Files/")
    	if (!files){
    		document.getElementById("upload-result-indicator").innerHTML="No file has been selected";
    		} else {
    			for (var i = 0, f; f = files[i]; i++) {
    				// immediately invoke the function to properly load via async process
    				(function(file){
    					var reader = new FileReader();
        				var imgName = f.name
        				reader.onload = function(e){
        				    var base64 = processArrayBuffer(e.target.result)
	    		            var result = window.cep.fs.writeFile(cloudPath+imgName, base64, cep.encoding.Base64);
	    		            if (0 == result.err) {
	    		            		createSpanAndInsert(imgName+" uploaded","upload-result-indicator")
	    		            		}
	    		            else {
	    		            		createSpanAndInsert(imgName+" upload failed","upload-result-indicator")
	    		            		}
        				}
        				reader.readAsArrayBuffer(file);
    				})(files[i]);
    			}
    		}
		clearChildren('list');
		files = [];
    	}

function processArrayBuffer(buff){
	var uInt8Array = new Uint8Array(buff);
    var i = uInt8Array.length;
    var binaryString = new Array(i);
    while (i--)
      binaryString[i] = String.fromCharCode(uInt8Array[i]);
    var data = binaryString.join('');
    var base64 = window.btoa(data);
    return base64
}

function createSpanAndInsert(innerContent, elementID){
	var span = document.createElement('span');
	span.innerHTML = innerContent
	span.setAttribute("class", "resultSpan");
	document.getElementById(elementID).insertBefore(span, null);
}

function clearChildren(id){
	var parent = document.getElementById(id);
	while (parent.firstChild) {
	    parent.removeChild(parent.firstChild);
	}
}
