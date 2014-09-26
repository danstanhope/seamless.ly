describe('SeamLess object exists', function () {
    it('Ensure SeamLess object exists', function () {
    	var sl = window.SeamLess;

    	expect(sl).toBeDefined();
    });
});

describe('SeamLess object creation', function () {
    it('Ensure SeamLess can be created', function () {

    	s = SeamLess.config({ window : window, origin : '*', frameId : 'test-frame' });

    	expect(s).toBeDefined();
    });
});
