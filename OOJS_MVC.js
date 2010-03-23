
var DS = {};

//Empty constructor, this is just a stub
DS.QueryControllerView = extend(Object, {
	//No constructor required, use Object's default
	
	//Required Delegate methods:
	QueryCompleted: function (resultSet) {
		alert("Your query finished with " + resultSet.features.length + " features returned.");
	},

	QueryFailed: function (error) {
		alert("Sorry, your query failed. Here are its last words: " + error);
	}
});

DS.QueryControllerMapView = extend(DS.QueryControllerView, {
	constructor: function(config) {
		mixin(this, config);
		
		if (!(this.map instanceof esri.Map)) throw("Incorrect map parameter. Must be of type esri.Map");
		
	},
	
	QueryCompleted: function(resultSet) {
		if(resultSet.features.length) {
			this.map.graphics.clear();
			
			var mySymbol = new esri.symbol.SimpleFillSymbol(esri.symbol.SimpleFillSymbol.STYLE_SOLID, new esri.symbol.SimpleLineSymbol("dashdot", new dojo.Color([255,0,0]), 2.5), new dojo.Color([255,255,0,0.25]));
			var feature = resultSet.features[0];
			
			feature.setSymbol(mySymbol);
			
			this.map.graphics.add(feature);
		}
	}
	
});


DS.QueryController = extend(Object, {
	
	constructor: function (config) {
		//copy all config parameters 
		mixin(this, config);
	
		//verify required parameter presence and types
		if (!(this.view instanceof DS.QueryControllerView)) throw("Incorrect view parameter. Must be of type DS.QueryControllerView");
		if (!this.serviceURL) throw("Missing Service URL.");


		this.queryTask = new esri.tasks.QueryTask(this.serviceURL);
	},

	initiateQuery: function (geometry) {
		if (!geometry instanceof esri.geometry.Geometry) throw("Invalid geometry parameter. What the heck are you feeding me?");

		var query = new esri.tasks.Query();
		query.geometry = geometry;
		query.returnGeometry = true;

		this.runningQuery = this.queryTask.execute(query, this.callback, this.errback);
	},

	//these functions respond to the ESRI QueryTask when it is complete or fails
	callback: function(results) {
		this.view.QueryCompleted(results);
	},
	
	errback: function(error) {
		this.view.QueryFailed(error)
	}


 }); //end DS.QueryController definition