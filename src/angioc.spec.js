(function (window, describe, it, Angioc) {
    'use strict';

    describe('Angioc', function () {
        var angioc;

        beforeEach(function(){
            angioc = new Angioc();
        });

        describe('cannot register an element', function () {
            it('with empty dependency name.', function () {
                // Actions
                var process = (function () {
                    angioc.register(undefined, 'x');
                });

                // Asserts
                expect(process).toThrowError('Unable to register element : the first argument should be a dependency name.');
            });
            it('without dependency name.', function () {
                // Actions
                var process = (function () {
                    angioc.register(function () {
                    });
                });

                // Asserts
                expect(process).toThrowError('Unable to register element : the first argument should be a dependency name.');
            });
            it('without value.', function () {
                // Actions
                var process = (function () {
                    angioc.register('myDependency', undefined);
                });

                // Asserts
                expect(process).toThrowError('Unable to register element : the second argument should be defined.');
            });
        });

        it('cannot register class if value is not a function.', function () {
            // Actions
            var process = function () {
                angioc
                    .register('MyDependency', {})
                    .asClass();
            };

            // Asserts
            expect(process).toThrowError('Cannot register class because "{}" is not a function.');
        });
        it('cannot register a constant twice.', function () {
            // Actions
            var process = function () {
                angioc.register('MyDependency', {}).asConstant();
                angioc.register('MyDependency', {}).asConstant();
            };

            // Asserts
            expect(process).toThrowError('Cannot register the component "MyDependency", it has already been registered.');
        });
        it('cannot register a class twice.', function () {
            // Actors
            function MyClass() {
                this.say = function (message) {
                };
            }

            // Actions
            var process = function () {
                angioc.register('MyClass', MyClass).asClass();
                angioc.register('MyClass', MyClass).asClass();
            };

            // Asserts
            expect(process).toThrowError('Cannot register the component "MyClass", it has already been registered.');
        });

        describe('can resolve', function () {
            it('class instance.', function () {
                // Actors
                function MyClass() {
                    this.say = function (message) {
                    };
                }

                // Actions
                angioc
                    .register('MyDependency', MyClass)
                    .asClass();

                // Asserts
                angioc.resolve(['MyDependency'], function (instance) {
                    expect(instance).toBeDefined();
                    expect(instance.say).toBeDefined();
                });
            });
            it('class instance inject different instances.', function () {
                // Actors
                function MyClass() {
                    this.say = function (message) {
                    };
                }

                // Actions
                angioc
                    .register('MyDependency', MyClass)
                    .asClass();

                // Asserts
                angioc.resolve(['MyDependency', 'MyDependency'], function (instance1, instance2) {
                    expect(instance1).not.toBe(instance2);
                });
            });
            it('singleton class instance.', function () {
                // Actors
                function MyClass() {
                    this.say = function (message) {
                    };
                }

                // Actions
                angioc
                    .register('MyDependency', MyClass)
                    .asClass()
                    .asSingleton();

                // Asserts
                angioc.resolve(['MyDependency', 'MyDependency'], function (instance1, instance2) {
                    expect(instance1).toBe(instance2);
                });
            });
            it('class instance with dependencies.', function () {
                // Actors
                function MyClass(myClass2) {
                    this.get = function () {
                        return 'MyClass' + myClass2.get();
                    };
                }

                function MyClass2() {
                    this.get = function () {
                        return 'MyClass2';
                    };
                }

                // Actions
                angioc
                    .register('MyClass2', MyClass2)
                    .asClass();
                angioc
                    .register('MyClass', MyClass)
                    .asClass()
                    .withDependencies(['MyClass2']);

                // Asserts
                angioc.resolve(['MyClass'], function (instance) {
                    expect(instance).toBeDefined();
                    expect(instance.get).toBeDefined();
                    expect(instance.get()).toBe('MyClassMyClass2');
                });
            });
            it('constant.', function () {
                // Actors
                var constant = {value: 'hello world'};

                // Actions
                angioc
                    .register('MyConstant', constant)
                    .asConstant();

                // Asserts
                angioc.resolve(['MyConstant'], function (instance) {
                    expect(instance).toBe(constant);
                });
            });
            it('dependencies without naming them.', function () {
                // Actors
                var constant = {value: 'hello world'};

                // Actions
                angioc
                    .register('MyConstant', constant)
                    .asConstant();

                // Asserts
                angioc.resolve(function (MyConstant) {
                    expect(MyConstant).toBe(constant);
                });
            });
        });

        it('can access to $provide.', function () {
            angioc.resolve(['$provide'], function($provide){
                expect($provide).toBeDefined();
                expect($provide.replaceDependencyNameByConstant).toBeDefined();
                expect($provide.getDefinition).toBeDefined();
            });
        });

        it('cannot access to $mock in production code.', function () {
            // Actors
            var process = function(){angioc.resolve(['$mock'], function($mock){});};

            // Asserts
            expect(process).toThrowError('The dependency "$mock" was not found.');
        });

    });

}(window, describe, it, angioc.constructor));