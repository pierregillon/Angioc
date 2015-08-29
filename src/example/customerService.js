(function (angioc) {
    'use strict';

    angioc
        .register('customerService', Service)
        .asClass()
        .withDependencies(['customerDataService', 'purchaseDataService']);

    function Service(customerDataService, purchaseDataService) {
        var self = this;

        self.getCustomers = function () {
            var customers = customerDataService.getCustomers();
            var purchases = purchaseDataService.getPurchases();

            customers.forEach(function (customer) {
                purchases.forEach(function (purchase) {
                    if (customer.id === purchase.customerId) {
                        if (!customer.purchases) {
                            customer.purchases = [];
                        }
                        customer.purchases.push(purchase);
                    }
                })
            });

            return customers;
        }
    }

}(angioc));