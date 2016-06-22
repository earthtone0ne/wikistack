var express = require ('express');
var models = require('../models');
var swig = require('swig');
swig.setDefaults({cache: false});

var Page = models.Page;
var User = models.User;

var router = express.Router();

router.get('/',function (req,res,next) {
  Page.findAll(
    {}).then(function(pages){
      var pageArr = [];
      for (var i = 0; i < pages.length; i++) {
         pageArr.push(pages[i].dataValues);
      }
      console.log("PAGE ARRAY", pageArr);
      res.render('index', {
        pageArr: pageArr
      });
    })
});
router.post('/',function (req,res,next) {
  console.log(req.body);
  var page = Page.build({
    author: req.body.author,
    authorEmail: req.body.authorEmail,
    title: req.body.title,
    content: req.body.content,
    status: req.body.status
  });
  page.save()
  .then(function(newPost){
    res.redirect(newPost.urlTitle);
  }, function(error){
    console.error(error);
  });
});
router.get('/add/', function( req,res,next){
  res.render('addpage.html');
})
router.get('/:title', function(req, res,next){
  //res.send('/wiki/'+ req.params.title);
  Page.findAll({
    where: {
    urlTitle: req.params.title
    }
  }).then(function(result){
    var results=result[0].dataValues;
    // console.log('title: ', results.title);
    res.render('wikipage',{
        results: results})

      })
  });

module.exports = router;
