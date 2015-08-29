(function (angioc) {
    'use strict';

    angioc
        .register('customerController', Controller)
        .asClass()
        .asSingleton()
        .withDependencies(['customerService', 'parameters']);

    function Controller(customerService, parameters) {
        var self = this;
        self.customers = [];
        self.initialize = function () {
            var customers = customerService.getCustomers();
            for (var i = 0; i < parameters.customerCount; i++) {
                self.customers.push(customers[i]);
            }
        };
    }

}(angioc));