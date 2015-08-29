(function(angioc){
    'use strict';

    angioc
        .register('purchaseDataService', PurchaseDataService)
        .asClass()
        .asSingleton();

    function PurchaseDataService(){
        var self = this;

        self.getPurchases = function(){
            return [
                {id: 1, customerId: 1, name: 'Computer', price: '1200'},
                {id: 2, customerId: 1, name: 'Shoes', price: '200'},
                {id: 3, customerId: 2, name: 'Jacket', price: '120'}
            ]
        }
    }
}(angioc));