(function(require){
    'use strict';

    var expect = require('chai').expect;
    var angioc = require('../dist/angioc.min');

    describe('Angioc', function(){
        it('should be well imported with require statement.', function(){
            expect(angioc).to.be.defined;
        });
    });
}(require));