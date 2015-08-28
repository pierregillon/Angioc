function Angioc(){
    var self = this;
    var registry = {};

    self.register = function(name, body){
        if(typeof name !== 'string' || !name){
            throw new Error('Unable to register element : the first argument should be a dependency name.');
        }
        if(!body){
            throw new Error('Unable to register element : the second argument should be defined.');
        }
        return new SpecificationFactory(body, function(spec){
            registry[name] = spec;
        });
    };

    self.resolve = function(name){
        if(registry.hasOwnProperty(name) === false){
            throw new Error();
        }
        return registry[name].getInstance();
    };
}

function SpecificationFactory(body, callback){
    var self = this;

    self.asClass = function(){
        callback(new ClassSpecification(body));
    };

    self.asConstant = function(){

    };
}

function ClassSpecification(body){
    var self = this;
    var instance = undefined;

    self.getInstance = function(){
        if(instance === undefined){
            instance = createInstance();
        }
        return instance;
    };

    function createInstance(){
        return new body();
    }
}

(function(factory){
    'use strict';

    if (typeof define === 'function' && define.amd) {
        define([], factory);
    } else if (typeof exports === 'object') {
        module.exports = factory;
    } else {
        window.angioc = factory;
    }

}(new Angioc()));