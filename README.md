seamless.ly
===========

Seamlessly send and receive messages between parent page and iframe. Pass styles and set height, dynamically, with ease!

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
	


## License

[BSD License](http://opensource.org/licenses/bsd-license.php)