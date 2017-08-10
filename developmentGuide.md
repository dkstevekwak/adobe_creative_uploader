# How to build a panel extension for Photoshop
## Before you start
* Please note this guide will go over specific details for building an extension, [Adobe Creative Uploader](https://github.com/dkstevekwak/adobe_creative_uploader), which allows Adobe Photoshop App users to upload local image files to Adobe Cloud
* Make sure to download [Adobe Photoshop App Free Trial](https://www.adobe.com/products/photoshop/free-trial-download.html) if you don't have it installed already
* Please read [HTML Extension Cookbook](https://github.com/Adobe-CEP/CEP-Resources/blob/master/CEP_7.x/CEP_7.0_HTML_Extension_Cookbook.pdf) for more detailed information
## Pre-coding
### Development and Debugging Tool
[HTML Extension Builder](http://labs.adobe.com/technologies/extensionbuilder3/) is a tool set built on top of Eclipse and can be used for developing and debugging HTML extensions. While this tool is not a requirement for your development, it's highly recommended as it provides assets and tools that ease your development

Here are the steps for you to set this up:
1. Download [Eclipse](http://www.eclipse.org/home/index.php)
2. Download [Extension builder 3](http://labs.adobe.com/downloads/extensionbuilder3.html)
3. Launch Eclipse and go to **Help > Install New Software**
4. In the Add Site dialog, click Archive and browse to the Adobe Extension Builder 3 Preview zip file downloaded from Adobe web site
5. Click **OK** to confirm the changes
6. Select all the Adobe Extension Builder 3 components by selecting the top item under Name. Select **Next** to confirm the selection.
7. In the Install Details review dialog, click **Next** to confirm that you want to install all the components listed
8. Accept the terms of license agreements and click **Finish**
9. Make sure to set the correct paths for the tool to save and load properly. Go to **Eclipse > Preference > Adobe Extension Builder 3 > CC Launching Paths**
(**Note**: _the exact location can be different depending on the version of the installed Photopshop CC_)
	* **Service Manager - Service Manager Root Folder** _(/Library/Application Support/Adobe/CEP)_ - This is where root extensions will be saved
	* **Service Manager - User-specific Service Manager Root Folder** _(/Users/USERNAME/Library/Application Support/Adobe/CEP)_ - This is where user specific extensions will be saved, like this application you are about to build
	* **Target Applications - Photoshop Application** _(/Applications/Adobe Photoshop CC 2017/Adobe Photoshop CC 2017.app/Contents/MacOS/Adobe Photoshop CC 2017)_ - This is where your application is located.
10. Start debugging by going to **Run > Debug > YOUR_DEBUG_TOOL** (Adobe Photoshop Application is an option here)

### Configuration setup
* **CXCS/manifest.xml** (This will be configured automatically if you are using Extension Builder) provides the necessary information to configure a CEP extension. You can validate your schema [here](https://www.corefiling.com/opensource/schemaValidate/)
	* **Versions** - Make sure to name "PHSP" and "PHXS" as a host as they refer to Photoshop Application and Photoshop Extension accordingly (refer to the cookbook to get the version id)
	```
    <HostList>
	<Host Name="PHSP" Version="[14.0,99.9]" />
	<Host Name="PHXS" Version="[14.0,99.9]" />
	</HostList>
    ```
    * **Extension Size** - Determines the size of the extension. This application will use 600*400
    ```
    <Geometry>
		<Size>
			<Height>600</Height>
			<Width>400</Width>
		</Size>
	</Geometry>
    ```
    * **Extension Menu** - Menu can be customized. This application will use the default settings

## Coding
### APIs and Libraries

* **Not Applicable**: [Creative SDK](https://www.adobe.io/apis/creativecloud/creativesdk.html) handles user authentication through a popup or redirect, which is not allowed in a panel extension
* **Optional**: [Common Extensibility Platform (CEP)](https://github.com/Adobe-CEP/CEP-Resources/tree/master/CEP_7.x), Adobe’s toolset for building enhancements to Creative Cloud applications, was used in this application to retrieve user's application path and save image files
### Files Used
* Javascript
	* [CSInterface](https://github.com/Adobe-CEP/CEP-Resources/blob/master/CEP_7.x/CSInterface.js)
	* index.js
* HTML
	* index.html
* CSS
	* style.css   
	* [Bootstrap](https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css)
### Functions
* **handleFileSelect()** - grabs files from html input field, validates the files, and show image thumbnails
* **uploadFiles()** - uploads the files selected in handleFileSelect() to Adobe Creative Cloud.
	* [CSInterface](https://github.com/Adobe-CEP/CEP-Resources/blob/master/CEP_7.x/CSInterface.js) is used to get the user path of the application, which is modified to locate the creative cloud location 
	* FileReader() is a [Javasript API](https://developer.mozilla.org/en-US/docs/Web/API/FileReader) used to read the selected files. However, as noted in the code, since this function is an async function, you need to [immediately invoke](https://en.wikipedia.org/wiki/Immediately-invoked_function_expression) the function that includes the reader and other operations in order to prevent the loop from completing before each file loads.
* **processArrayBuffer(buff)** - takes an array buffer as its input and produces base64 converted input as its output
*  **createSpanAndInsert(innerContent, elementID)** - takes some content and an element ID as its input, wraps the content with <span> and insert <span> under the specified element 
*  **clearChildren(id)** - takes an id as an input and clears all DOM contents under any element that has the id