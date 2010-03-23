var Container = function(){
	this.items = []; //empty array to hold items
};
Container.prototype.addItem = function(item) {
	this.items.push(item);
}
Container.prototype.getCount = function() {
	return this.items.length;
}


var LimitedContainer = extend(Container, {
	constructor: function(maxItems) {
		LimitedContainer.superclass.constructor.call(this);
		this.maxItems = maxItems;
	},

	addItem: function(item) {
		if(this.getCount() < this.maxItems) {
			LimitedContainer.superclass.addItem.call(this, item);
		} 
	}

});

###Configuration Object Parameters
new LimitedContainer(3);
new LimitedContainer({maxItems: 3});

function LimitedContainer(config) {
	mixin(this, config); //who knows what you'll need
	this.maxItems = config.maxItems || 3;
}


view = new DS.QueryControllerMapView({map: map});
view = new DS.QueryControllerView();
controller = new DS.QueryController({
	view: view,
	serviceURL: "http://sampleserver1.arcgisonline.com/ArcGIS/rest/services/Demographics/ESRI_Census_USA/MapServer/3"
});

//set up click event handler
dojo.connect(map, "onClick", function(evt) {
	controller.initiateQuery(evt.mapPoint);
});