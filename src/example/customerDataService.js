(function(angioc){
    'use strict';

    angioc
        .register('customerDataService', CustomerDataService)
        .asClass()
        .asSingleton();

    function CustomerDataService(){
        var self = this;

        self.getCustomers = function(){
            return [
                {id: 1, name: 'Philip JANES'},
                {id: 2, name: 'Philip JANES'}
            ]
        }
    }
}(angioc));