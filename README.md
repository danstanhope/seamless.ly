seamless.ly
===========

Seamlessly send and receive messages between parent page and iframe. Pass styles and set height, dynamically, with ease!

## Usage

This can be found in the example folder :)

### child.html

	<html>
	  <head>
	    <meta charset="UTF-8">
	    <title>Child Page</title>
	  </head>
	  <body>
	    <article>
	      <h3>Child Page</h3>
	      <p>
	        Seamlessly send and receive messages between parent page and iframe. Pass styles and set height, dynamically, with ease!
	      </p>
	    </article>
	    <script type="text/javascript" src="../src/seamless.ly.js"></script>

	    <script type="text/javascript">
	        var s = SeamLess.config({ window : window.parent, origin : '*' });

	        s.receiveStyle();
	        s.sendHeight();        
	    </script>
	  </body>
	</html>

### parent.html

	<html>
	  <head>
	    <meta charset="UTF-8">
	    <title>Parent Page</title>
	  </head>
	  <body>
	    <article>
	      <h3>Parent Page</h3>
	      <iframe 
	        id="test-frame" 
	        frameborder="0"
	        scrolling="no"
	        seamless
	        src="child.html"
	        style="width: 100%; border: 0px; overflow: hidden; margin-top: 10px;"
	        onload="frameload()"
	        ></iframe>   
	           
	    </article>
	    <script type="text/javascript" src="../src/seamless.ly.js"></script>

	    <script type="text/javascript">
	      var iframe = document.getElementById('test-frame'),
	        s = SeamLess.config({ window : iframe.contentWindow, origin : '*', frameId : 'test-frame' });

	      s.receiveHeight(function(height){
	      iframe.style.height = height + 'px';
	     });

	      function frameload(){
	        s.sendStyle(['strong', 'h4', 'p', 'a']);
	      }
	    </script>
	  </body>
	</html>
	


## License

[BSD License](http://opensource.org/licenses/bsd-license.php)