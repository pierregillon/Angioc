(function(){
    'use strict';
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
            return new SpecificationFactory(body, self.resolve, function(spec){
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

    function SpecificationFactory(body, dependencyResolver, callback){
        var self = this;

        self.asClass = function(){
            var spec = new ClassSpecification(body, dependencyResolver);
            callback(spec);
            return spec;
        };

        self.asConstant = function(){

        };
    }

    function ClassSpecification(constructor, dependencyResolver){
        var self = this;
        var dependencyNames = [];
        var isSingleton = false;
        var instance = undefined;

        self.getInstance = function(){
            if(!isSingleton || !instance){
                instance = createInstance();
            }
            return instance;
        };

        self.withDependencies = function(names){
            dependencyNames = names;
        };

        self.asSingleton = function(){
            isSingleton = true;
        };

        function createInstance(){
            var parameterizedConstructor = constructor;
            dependencyNames.forEach(function(dependencyName){
                var dependency = dependencyResolver(dependencyName);
                parameterizedConstructor = parameterizedConstructor.bind(this, dependency);
            });
            return new parameterizedConstructor();
        }
    }


    function injectInstance(factory){
        if (typeof define === 'function' && define.amd) {
            define([], factory);
        } else if (typeof exports === 'object') {
            module.exports = factory;
        } else {
            window.angioc = factory;
        }
    }

    injectInstance(new Angioc());
}());