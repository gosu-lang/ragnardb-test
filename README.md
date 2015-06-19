# ragnardb-test

This is a Gosu-based test project incorporating the [ragnardb](https://github.com/gosu-lang/ragnardb) project.
 
## Environment setup

### Prerequisites

Two versions of IntelliJ are recommended:

* IJ 13 for ragnar deveopment in Java
* IJ 14 for use with this project

The reason I suggest two installations is that IJ 14 will incorporate a preview release of the new ij-gosu plugin.

### IJ 14 setup
Pretty easy actually.  

1. Uninstall any old versions of the Gosu plugin by going to File -> Settings -> Plugins.  If "Gosu" v. 3.8.3 exists, kill it.
2. Also delete any Gosu SDKs: File -> Project Structure -> Platform Settings -> SDKs and remove anything called Gosu SDK.
3. Restart IJ.
4. Get the ij-gosu plugin JAR from http://build/job/ij-gosu/ (Guidewire internal only)
5. Choose File -> Settings -> Plugins -> Install Plugin from disk..., then select the JAR you downloaded
6. Restart IJ again.
7. Ctrl-N to find HelloWorldTest - you should see pretty Gosu syntax highlighting.  Right-click and run the test class.