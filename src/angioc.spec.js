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

        it('can resolve dependency name when class has been registered with this name.', function(){
            // Actors
            function MyClass(){}

            // Actions
            angioc
                .register('MyDependency', MyClass)
                .asClass();

            // Asserts
            var instance = angioc.resolve('MyDependency');
            expect(instance).toBeDefined();
        });
    })
}(window, describe, it));