(function (window, describe, it) {
    'use strict';

    describe('Angioc', function () {
        it('should be injected in the window.', function () {
            expect(window.angioc).toBeDefined();
        });
    });
}(window, describe, it));