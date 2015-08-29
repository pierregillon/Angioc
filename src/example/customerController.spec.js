(function () {
    'use strict';

    describe('[Instance injection] A customer controller', function () {

        var customerController;
        var parameters;

        beforeEach(angioc.inject(function (_customerController_, _parameters_) {
            customerController = _customerController_;
            parameters = _parameters_;
        }));

        it('should be defined.', function () {
            expect(customerController).toBeDefined();
        });

        it('should feed the customer list with exact count when initialized.', function () {
            customerController.initialize();
            expect(customerController.customers.length).toBe(parameters.customerCount);
        });
    });

    describe('[Instance creation] A customer controller', function () {
        var customerController;
        var customerServiceMock;
        var parametersMock;

        beforeEach(angioc.definition(function (_customerController_) {
            customerServiceMock = {
                getCustomers: function () {
                    return [
                        {name: 'Mock customer'}
                    ];
                }
            };
            parametersMock = {
                customerCount: 1
            };
            customerController = new _customerController_(customerServiceMock, parametersMock);
        }));

        it('should be defined.', function () {
            expect(customerController).toBeDefined();
        });

        it('should feed the customer list with exact count when initialized.', function () {
            customerController.initialize();
            expect(customerController.customers.length).toBe(parametersMock.customerCount);
        });
    });
}());