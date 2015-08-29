(function (angioc) {
    'use strict';

    angioc
        .register('customerController', Controller)
        .asClass()
        .asSingleton()
        .withDependencies(['customerService']);

    function Controller(customerService) {
        var self = this;
        self.customers = [];
        self.initialize = function(){
            self.customers = customerService.getCustomers();
        };
    }

}(angioc));