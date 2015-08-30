(function () {
    'use strict';

    function Angioc() {
        var self = this;
        var registry = {};

        // ----- Public methods
        self.register = function (name, body) {
            if (typeof name !== 'string' || !name) {
                throw new Error('Unable to register element : the first argument should be a dependency name.');
            }
            if (!body) {
                throw new Error('Unable to register element : the second argument should be defined.');
            }
            return new SpecificationFactory(body, getInstance, function (spec) {
                registry[name] = spec;
            });
        };
        self.resolve = function (param1, param2) {
            if (Array.isArray(param1) && typeof param2 === 'function') {
                resolveWithParameterNames(param1, param2);
            }
            else if (typeof param1 === 'function') {
                resolveWithoutParameterNames(param1);
            }
            else {
                throw new Error('Bad parameters to resolve dependencies.');
            }
        };
        self.inject = function (callback) {
            return function () {
                self.resolve(callback);
            };
        };
        self.definition = function (callback) {
            return function () {
                var dependencyNames = getParameterNames(callback);
                var definitions = [];
                dependencyNames.forEach(function (dependencyName) {
                    definitions.push(getDefinition(dependencyName));
                });
                callback.apply(this, definitions);
            };
        };
        self.constructor = Angioc;

        // ----- Internal logic
        function getInstance(name) {
            if (registry.hasOwnProperty(name) === false) {
                throw new Error('The dependency "' + name + '" was not found.');
            }
            return registry[name].getInstance();
        }

        function getDefinition(name) {
            if (registry.hasOwnProperty(name) === false) {
                throw new Error('The dependency "' + name + '" was not found.');
            }
            return registry[name].getDefinition();
        }

        function resolveWithParameterNames(dependencyNames, action) {
            var dependencies = [];
            dependencyNames.forEach(function (dependencyName) {
                dependencies.push(getInstance(dependencyName));
            });
            action.apply(this, dependencies);
        }

        function resolveWithoutParameterNames(action) {
            var dependencyNames = getParameterNames(action);
            resolveWithParameterNames(dependencyNames, action);
        }

        var STRIP_COMMENTS = /((\/\/.*$)|(\/\*[\s\S]*?\*\/))/mg;
        var ARGUMENT_NAMES = /([^\s,]+)/g;
        function getParameterNames(func) {
            var fnStr = func.toString().replace(STRIP_COMMENTS, '');
            var result = fnStr.slice(fnStr.indexOf('(') + 1, fnStr.indexOf(')')).match(ARGUMENT_NAMES);
            if (result === null)
                result = [];
            var final = [];
            result.forEach(function (item) {
                final.push(item.split('_').join(''));
            });
            return final;
        }
    }

    function SpecificationFactory(body, dependencyResolver, callback) {
        var self = this;

        self.asClass = function () {
            if (typeof body !== 'function') {
                throw new Error('Cannot register class because "' + JSON.stringify(body) + '" is not a function.')
            }
            var spec = new ClassSpecification(body, dependencyResolver);
            callback(spec);
            return spec;
        };

        self.asConstant = function () {
            var spec = new ConstantSpecification(body);
            callback(spec);
            return spec;
        };
    }

    function ClassSpecification(constructor, dependencyResolver) {
        var self = this;
        var dependencyNames = [];
        var isSingleton = false;
        var instance = undefined;

        self.getInstance = function () {
            if (!isSingleton || !instance) {
                instance = createInstance();
            }
            return instance;
        };
        self.getDefinition = function () {
            return constructor;
        };
        self.withDependencies = function (names) {
            dependencyNames = names;
            return self;
        };
        self.asSingleton = function () {
            isSingleton = true;
            return self;
        };

        function createInstance() {
            var parameterizedConstructor = constructor;
            dependencyNames.forEach(function (dependencyName) {
                var dependency = dependencyResolver(dependencyName);
                parameterizedConstructor = parameterizedConstructor.bind(this, dependency);
            });
            return new parameterizedConstructor();
        }
    }

    function ConstantSpecification(constant) {
        var self = this;

        self.getDefinition = function () {
            throw new Error('A constant has no definition.');
        };
        self.getInstance = function () {
            return constant;
        }
    }

    function injectInstance(factory) {
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