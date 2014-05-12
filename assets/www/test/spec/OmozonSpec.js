describe("Omozon", function() {
  var user;

  beforeEach(function() {
    user = new User();
  });

//  it("should be able to play a Song", function() {
//    player.play(song);
//    expect(player.currentlyPlayingSong).toEqual(song);
//
//    //demonstrates use of custom matcher
//    expect(player).toBePlaying(song);
//  });

  describe("when user has been created", function() {
    beforeEach(function() {
    	user.set({"id":"michael", 
    		"passwd":"myers", 
    		"city":"Haddonfield Illinois",
    		"email":"michael@halloween.com", 
    		"name":"Michael Myers",
    		"street":"Smith’s Grove Sanitarium 1",
    		"zip":"22222"});
    });

    it("should indicate that the property 'id' is retrievable", function() {
    	expect(user.get("id")).toEqual("michael");
    });

    it("should indicate that the property 'passwd' is retrievable", function() {
    	expect(user.get("passwd")).toEqual("myers");
    });
    
    it("should indicate that the property 'city' is retrievable", function() {
    	expect(user.get("city")).toEqual("Haddonfield Illinois");
    });
    
    it("should indicate that the property 'email' is retrievable", function() {
    	expect(user.get("email")).toEqual("michael@halloween.com");
    });
    
    it("should indicate that the property 'name' is retrievable", function() {
    	expect(user.get("name")).toEqual("Michael Myers");
    });
    
    it("should indicate that the property 'zip' is retrievable", function() {
    	expect(user.get("zip")).toEqual("22222");
    });
  });
});
