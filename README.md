#angioc

A simple library of inversion of control, following the dependency injection pattern. This library is inspired by the 
angular ioc.

## Install

With npm

    npm install angioc

With bower

    bower install angioc

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

Resolve dependency names and inject them in the given function.

    angioc.resolve(['customerController', 'parameters'], function (controller, myConstantParameters) {
        // ...
    });

Angioc does not inject the class definition but a class instance, following the specified configuration at registering.

### Inject dependencies for better testing

To help you testing your application that is using angioc, you can install angioc-mocks. It helps you inject dependencies
in a beforeEach() (mocha, jasmine) and replace injected member by mock objects.

With bower

    bower install angioc-mocks --save-dev
    
Or npm

    npm install angioc-mocks --save-dev

Repo : https://github.com/pierregillon/angioc-mocks

## How to develop

Run unit test

    gulp test
    
Run unit tests in continuous mode

    gulp test-dev

    
