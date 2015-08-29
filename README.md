#angioc

A simple library of inversion of control, following the dependency injection pattern. This library is inspired by the 
angular ioc.

## Import

AMD loader	

    define('myApplication', ['angioc'], function() {
        ...
    });	
    
Node.js
	
    var angioc = require('angioc');
	
Plain HTML5

    <script src="angioc.min.js"></script>
    
### Introduction

Angioc instance let you register different components. Each type of component has some specific options.
If you register one component by file, you don't need to load the files in any order.
There is no file path dependencies, angioc provides you the dependencies you need.

## How to use

### Register class

Register a class.

    angioc
        .register('customerService', Service)
        .asClass()
        .withDependencies(['customerDataService', 'purchaseDataService']);

    function Service(customerDataService, purchaseDataService) {
        var self = this;
        
        // ...
    }
    
Register a singleton class.

    angioc
        .register('customerController', Controller)
        .asClass()
        .asSingleton()
        .withDependencies(['customerService', 'parameters']);
        
    function Controller(customerService, parameters) {
        var self = this;
        
        // ...
    }
    
Register a constant.

    var parameters = {
        customerCount: 5
    };

    angioc
        .register('parameters', parameters)
        .asConstant();
    
### Resolve dependencies

Resolve dependency names and inject them in the passed function.

    angioc.resolve(['MyClass', 'MyConstant'], function (classInstance, constant) {
        // ...
    });

Angioc does not inject the class definition but a class instance, following the specified configuration at registering.

You are not forced to define dependency names, they will be resolved by reflection. 

    angioc.resolve(function (MyClass, MyConstant) {
        // ...
    });
    
However, in your production code, it is better to do it because your code can be minified. In that case, parameter names 
are changed to single letter and Angioc won't succeeded to resolve them.

### Inject dependencies for better testing

Angioc provides features to help you testing your application.
If you are using Jasmine or Mocha, you can use the 'inject' function to get dependencies from Angioc.

    describe('A customer controller', function () {
        beforeEach(angioc.inject(function (customerController, parameters) {
            // ...
        }));
    });
 
You can surround parameter name by '_' to easy initialize test variables.

    describe('A customer controller', function () {
        var customerController;
        var parameters;

        beforeEach(angioc.inject(function (_customerController_, _parameters_) {
            customerController = _customerController_;
            parameters = _parameters_;
        }));
    });

### Inject class definition for better testing

If you are using Jasmine or Mocha, you can use the 'definition' function to get the original function. This let you instanciate
you class by the hand, and to provide mocks to constructor if needed.

    describe('A customer controller', function () {
        beforeEach(angioc.definition(function (customerController) {
            _customerController = new customerController(customerServiceMock, parametersMock);
        }));
    });
  
You can surround parameter name by '_' to easy initialize test variables.

    describe('A customer controller', function () {
        beforeEach(angioc.definition(function (_customerController_) {
            customerController = new _customerController_(customerServiceMock, parametersMock);
        }));
    });

## How to develop

Run unit test

    gulp test
    
Run unit tests in continuous mode

    gulp test-dev
    
Run example tests

    gulp test-example
    
Build the angioc.min.js in dist folder

    gulp build
    
