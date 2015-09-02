
describe('SeamLess object exists', function () {   
    it('Ensure SeamLess object exists', function () {
        var sl = window.SeamLess;
        
        expect(sl).toBeDefined();
    });      
});

describe('Send and Receive Message', function () {
    beforeEach(function () {
        jasmine.clock().install();
    });
    
    afterEach(function () {
        jasmine.clock().uninstall();
    });
    
    it('Receives value sent from Send method', function(done) {        
        var s = new SeamLess({ window : window.parent, origin : '*' });

        s.receive(function(data){
            expect(data).not.toBeNull();
            done();
        });

        setTimeout(function() {
            s.send('send')        
        }, 10);
        jasmine.clock().tick(11);

     });   
});


describe('Send and Receive Height', function () {
    beforeEach(function () {       
        jasmine.clock().install();
    });
    
    afterEach(function () {
        jasmine.clock().uninstall();
    });
    
    it('Receives value sent from SendHeight method', function(done) {
        var parentFixture = loadFixtures("../../../example/parent.html");
        var parent = setFixtures(parentFixture);

        var iframe = parent.find('iframe'); 

        var parent = new SeamLess({ window : iframe.contentWindow, origin : '*' , frameId : 'test-frame' });
        var child = new SeamLess({ window : window.parent, origin : '*' , frameId : 'test-frame'  });

        parent.receiveHeight(function(height){
            expect(height).toEqual(300)
            done();
        });

        setTimeout(function() {
            child.sendHeight();
        }, 10);

        jasmine.clock().tick(11);
     });    
});