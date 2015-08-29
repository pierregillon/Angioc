(function(){
    'use strict';

    describe('[Injection] A customer controller', function(){

        var customerController;

        beforeEach(angioc.inject(function(_customerController_){
            customerController = _customerController_;
        }));

        it('should be defined.', function(){
            expect(customerController).toBeDefined();
        });

        it('should have a customer list.', function(){
            expect(customerController.customers).toBeDefined();
        });
    });

}());