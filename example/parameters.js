(function (angioc) {
    'use strict';

    var parameters = {
        customerCount: 5
    };

    angioc
        .register('parameters', parameters)
        .asConstant();

}(angioc));