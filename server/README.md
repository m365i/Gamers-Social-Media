## Server Layout Explanation  

### Data structure:  

```
server
  |--> app.js ~ the gateway to the app, all the extentions configurations will be placed here
  |--> roututs ~ all the routes **definitions** of our server
  |--> controllers ~ all the routes **actions**(what they do and how)
  |--> public ~ files that need to be accessed by the client
  |--> modules ~ mongodb database data structures
  |--> util ~ useful tools for general purposes
```

### How to add a new route:  

in this simple example we will create a route to a page `/cat` that display the word "cat"  

1) create a controller to the route in `controllers` folder called `cat.js` that contain the following:  

``` 
// in /controllers/cat.js

exports.cat = async function (req, res, next) {
  res.send("cat")
}

```

as you can see the controller is what dose the actual processing of the request.  

2) make a gatway to the route in `routes` folder
* first create a route called `cat.js` in the `routes` folder that contain the following:

```
// in /routes/cat.js

var express = require('express')
var router = express.Router()

var { cat } = require('../controllers/cat')

router.get('/', cat)

module.exports = router
```

as you can see the route is what redirect us to the controller.  

* second go to `index.js` thats in the `routes` folder and **add** a link to the new route:  
```
// in /routes/index.js

var express = require('express')
var router = express.Router()

var authRouter = require('./auth')
var contactRouter = require('./contact')
var catRouter = require('./cat') // <---- what we added!

router.use('/auth', authRouter)
router.use('/contact', contactRouter)
router.use('/cat', catRouter) // <---- what we added!

module.exports = router
```

finally now you can access the page `http://localhost:3001/api/cat` and you shuold get the message `cat` in the browser.  
**notice!** that all routes start with `/api`  

### Advanced: adding api docs for your route  

the server serve **swagger** page at the route `/api-docs` that show information on each access point.  
inorder to add documentation to our new route we need to edit the file `swagger.yml` that is in the main directory.  
for more information on how to use swagger visit: https://swagger.io/docs/specification/basic-structure/  


