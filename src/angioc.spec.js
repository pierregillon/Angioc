(function(window, describe, it){
    'use strict';

    describe('Angioc', function(){
        describe('cannot register an element', function(){
            it('with empty dependency name.', function() {
                // Actions
                var process = (function(){
                    angioc.register(undefined, 'x');
                });

                // Asserts
                expect(process).toThrowError('Unable to register element : the first argument should be a dependency name.');
            });
            it('without dependency name.', function(){
                // Actions
                var process = (function(){
                    angioc.register(function(){});
                });

                // Asserts
                expect(process).toThrowError('Unable to register element : the first argument should be a dependency name.');
            });
            it('without value.', function(){
                // Actions
                var process = (function(){
                    angioc.register('myDependency', undefined);
                });

                // Asserts
                expect(process).toThrowError('Unable to register element : the second argument should be defined.');
            });
        });

        it('should be injected in the window by default.', function(){
            expect(window.angioc).toBeDefined();
        });

        it('can get class instance when resolving dependency name.', function(){
            // Actors
            function MyClass(){
                this.say = function(message){};
            }

            // Actions
            angioc
                .register('MyDependency', MyClass)
                .asClass();

            // Asserts
            var instance = angioc.resolve('MyDependency');
            expect(instance).toBeDefined();
            expect(instance.say).toBeDefined();
        });

        it('returns same class instance when resolving singleton dependency name.', function(){
            // Actors
            function MyClass(){
                this.say = function(message){};
            }

            // Actions
            angioc
                .register('MyDependency', MyClass)
                .asClass()
                .asSingleton();

            // Asserts
            var instance1 = angioc.resolve('MyDependency');
            var instance2 = angioc.resolve('MyDependency');
            expect(instance1).toBe(instance2);
        });

        it('can get class instance with dependencies when resolving dependency name.', function(){
            // Actors
            function MyClass(myClass2){
                this.get = function(){
                    return 'MyClass' + myClass2.get();
                };
            }
            function MyClass2(){
                this.get = function(){
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
            var instance = angioc.resolve('MyClass');
            expect(instance).toBeDefined();
            expect(instance.get).toBeDefined();
            expect(instance.get()).toBe('MyClassMyClass2');
        });
    })
}(window, describe, it));