var parser = require('apis-parser');

module.exports = function(app,prefix){
    app.get(prefix, function(req, res){
	    var provider = req.query.provider || 'arion';
	    var providers = ['m5', 'arion', 'lb'];
	    if (providers.indexOf(provider) >= 0) {
	        return res.redirect(301,'/currency/'+ provider);
	    } else {
	        return res.json(404,{error:'This provider does not exist',code:2});
	    }
	});

    var arion = require('arion');
	app.get(prefix + '/arion',function(req,res){
		parser(res)(function(cb){
			arion.currency(cb);
		});
	})

	var landsbankinn = require('landsbankinn');
	app.get(prefix + '/lb',function(req,res){
		parser(res)(function(cb){
			//type: A = Almennt gengi, S = Seðlagengi
			landsbankinn.currency(req.query.type || 'A', cb);
		});
	})

	var m5 = require('m5');
	app.get(prefix + '/m5',function(req,res){
		parser(res)(function(cb){
			m5.currency(cb);
		});
	})
}