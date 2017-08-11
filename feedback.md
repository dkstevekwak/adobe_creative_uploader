# Panel Development Experience Feedback
## Awesomeness
### adobe.io
* All available APIs are well orgnized per Adobe product
* Use cases for each API is well described and presented
* Well designed pages excite users to start using the APIs
### Adobe Creative SDK
* Even though I realized I could not use this API for panel extension integrations, I personally think this should be the standard way of how every Adobe API should be presented to users. [The SDK page](https://creativesdk.adobe.com/index.html) follows the logical flow starting with the overview, available features, use cases, documentation based on different platforms, download page, and blog. 
* Documentation is all web-based without links to PDF/Word pages. Also, there are plenty of integration examples, warnings, gotchas, and useful links. It didn't take long at all to understand documentations and get started with development. 
### Common Extensibility Platform (CEP)
* There are numerous integration examples that can help with your own integration
* There are plenty of code examples if you find the right place
### Extension Builder
* The builder provides the basic skeleton to build the application including the xml schema, useful libraries, and basic js, html, css files
* Automated debugging
## Areas to Improve
### adobe.io
* Standardization of accesing APIs - while the page presents every API in a uniform manner, once you have passed the io page, every API has its own unique way of presenting itself. For example, some direct users to github pages, some download a directory directly, and the others redirect users to another page etc.
	* Suggestion: Create a standard way of accessing the API pages, create an internal tool/webpage that automates/helps this process, and require every API developer team to use the new standard structure
* Standardization of API deveopment and documentation - each API has different ways of building and documenting. There are few standardization measures across different Adobe APIs
	* Suggestion: Similar to the suggestion above, find / create a standard way of developing and documenting new APIs, such as [Swagger](https://swagger.io/)
* Warnings for each API - every API page focuses on what is possible with the API, not necessarily what's not possible. For example, it wasn't until the end phase of development when I realized I could not use creative SDK for panel development
	* Suggestion: Insert more warning signs and be open about what's not allowed/possible using the API as well
### Common Extensibility Platform (CEP)
* Documentation location - Documentations (cookbook,feature lists,CEP for the inDesign Developer) are text/PDF based and spreaded out through out the github page, which makes it hard to pinpoint what's THE documentation that I should use
	* Suggestion: create a single, centralized, web-based documentation with navigatable panel and groupings
* Documentation format - Documentations are text/PDF based and extremely lengthy. Thus, they are not user-friendly to navigate through without a standardized guide panel and groupings
	* Suggestion: see above
* Need for a comprehensive feature list - the available feature lists only list the new features added to a particular version of the API
	* Suggestion: Create a single master feature list that gets updated when new versions come out
* In "Samples" page, each example does not describe what it does. Its name is the only clue and developers have to read the code to understand the purpose of each example
	* Suggestion: Write a short description of what each example integration is desgined to acheive
### Extension Builder
* Photoshop CC launching path configuration - When setting up this tool, the correct extension and CC location have to be configured in order to launch your extension in Adobe CC. The default paths in the tool do not work and need to be modified based on your CC version.
	* Suggestion: "Extension Folder" section in the cookbook needs to be relocated to the earlier part of the documentation (before setting up the builder tool) or dynamically change the paths based on user's CC version