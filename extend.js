//this function applies all the properties to the object
function mixin (obj, props) {
    if(obj && props && typeof props == 'object') {
        for(var property in props) {
            obj[property] = props[property];
        }
    }
}

/* extend is more complicated than it looks. The first step is to set up a constructor function
 * either a passthrough to the superclass constructor, or explicitly specified. This constructor function
 * is the basis of a class in javascript, and can be invoked with the NEW keyword.
 * 
 * We then create an instance of the superclass, and use this instance to modify the subclass prototype
 * so that all the members of the superclass will be present in all subclass instances.
 * 
 * After housekeeping tasks to make the superclass constructor available for invocation from the subclass,
 * we apply any override properties (which may be data or functions) to the subclass prototype and return
 * the new subclass constructor.
 */

/* USAGE:
 * Project.BaseClass = function(){}; //empty class constructor just for example here
 * Project.ChildClass = extend(Project.BaseClass, {
 *		constructor: function(){
 *			//add child constructor logic here
 *			Project.ChildClass.superclass.constructor.apply(this, arguments); //call superclass constructor
 *		},
 *		newChildFunction: function(){
 *			//function logic here
 *		}
 * });
 */
function extend (superclass, overrides) {
    var subclass = overrides.constructor != Object.prototype.constructor ? //if the overrides object has an explicit constructor specified
                        overrides.constructor : //then use the specified constructor
                        function(){superclass.apply(this, arguments);}; //else, pass all constructor arguments to the superclass

    var intermediary = function(){}; //empty class intermediary prevents subclass modifications from affecting the superclass
    
    intermediary.prototype = superclass.prototype;
    //a new instance of intermediary would now be an instance of superclass, containing all its properties
    
    subclass.prototype = new intermediary(); //subclass's prototype now contains all the properties of superclass
    
    //we want the sub and super class instances to have explicit constructor references
    //although in practice we'll always want a subclass constructor to invoke the superclass constructor,
    //there is no way to make this process automatic.
    subclass.prototype.constructor = subclass;
    if(superclass.prototype.constructor == Object.prototype.constructor) {
        superclass.prototype.constructor = superclass;
    }
    
    //give subclass a reference to the superclass. Combined with the superclass' constructor reference from line 58,
    //this will let the subclass constructor invoke the superclass constructor on itself
    subclass.superclass = superclass.prototype;
	//if we did this:
	//subclass.prototype.superclass = superclass.prototype;
	//and tried to use this.superclass, we'd get tripped up with a second level of extension
    
    //with all the housekeeping done, we copy the override properties onto our subclass prototype
    mixin(subclass.prototype, overrides);
    
    return subclass;
}
