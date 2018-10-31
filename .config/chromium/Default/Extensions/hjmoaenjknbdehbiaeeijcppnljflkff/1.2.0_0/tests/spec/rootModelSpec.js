describe("RootModel", function() {
  var rootModel;
  var fakeStorageService = {};

  describe("when instantiated with old data", function() {
    beforeEach(function() {
      var oldData = JSON.parse('{"key":"poo","data":[{"url":"http://highscalability.com/blog/2015/10/12/making-the-case-for-building-sca…tm_medium=feed&utm_campaign=Feed%3A+HighScalability+%28High+Scalability%29","text":"Making the Case for Building Scalable Stateful Services in the Modern Era - High Scalability -"},{"url":"chrome-extension://cjpalhdlnbpafiamejdnhcphjbkeiagm/document-blocked.html?d…x1MDAwYnNvdXJjZWZvcmdlLm5ldCIsImZzIjoifHxzb3VyY2Vmb3JnZS5uZXReJG90aGVyIn0=","text":"chrome-extension://cjpalhdlnbpafiamejdnhcphjbkeiagm/document-blocked.html?d…x1MDAwYnNvdXJjZWZvcmdlLm5ldCIsImZzIjoifHxzb3VyY2Vmb3JnZS5uZXReJG90aGVyIn0="},{"url":"https://github.com/Jack000/Expose","text":"Jack000/Expose · GitHub"},{"url":"http://www.theatlantic.com/international/archive/2015/10/words-mom-dad-similar-languages/409810/?single_page=true","text":"Why the Words for ‘Mom’ and ‘Dad’ Sound So Similar in So Many Languages - The Atlantic"},{"url":"http://www.lexika.io/","text":"www.lexika.io"},{"url":"http://www.pckwck.com/","text":"pckwck"},{"url":"http://techcrunch.com/2015/10/12/fixed-the-app-that-fixes-your-parking-tickets-gets-blocked-in-san-francisco-oakland-l-a/#.6qjorz:NOCH","text":"Fixed, The App That Fixes Your Parking Tickets, Gets Blocked In San Francisco, Oakland & L.A. | TechCrunch"},{"url":"http://www.slate.com/blogs/future_tense/2015/10/06/defendants_should_be_able_to_inspect_software_code_used_in_forensics.html","text":"Defendants should be able to inspect software code used in forensics."},{"url":"http://motherboard.vice.com/read/off-the-grid-but-still-online","text":"Off the Grid, But Still Online | Motherboard"},{"url":"http://www.blaenkdenum.com/posts/a-simpler-vim-statusline/","text":"A Simpler Vim Statusline - Blaenk Denum"}]}');
      rootModel = new RootModel(oldData, fakeStorageService);
    });

    it("should have key properly set", function() {
      expect(rootModel.key).toEqual('poo');
    });

    it("should have home folder with all bookmarks in it", function() {
      expect(rootModel.folders.home).not.toBe(null);
      expect(rootModel.folders.home.length).toEqual(10);

      // sample one
      expect(rootModel.folders.home[2].text).toEqual("Jack000/Expose · GitHub");
      expect(rootModel.folders.home[2].url).toEqual("https://github.com/Jack000/Expose");
    });

    it("should have an empty trash folder", function() {
      expect(rootModel.folders.trash).not.toBe(null);
      expect(rootModel.folders.trash.length).toEqual(0);
    });
  });

  describe("when instantiated with new data", function() {
    beforeEach(function() {
      var newData = JSON.parse('{"key":"something","data":{"home":[{"text":"Google","url":"https://www.google.com/?gws_rd=ssl"}],"trash":[],"test":[{"text":"reddit: the front page of the internet","url":"https://www.reddit.com/"}]}}');
      rootModel = new RootModel(newData, fakeStorageService);
    });

    it("should have key properly set", function() {
      expect(rootModel.key).toEqual('something');
    });

    it("should have home folder with all bookmarks in it", function() {
      expect(rootModel.folders.home).not.toBe(null);
      expect(rootModel.folders.home.length).toEqual(1);

      expect(rootModel.folders.home[0].text).toEqual("Google");
      expect(rootModel.folders.home[0].url).toEqual("https://www.google.com/?gws_rd=ssl");
    });

    it("should have an empty trash folder", function() {
      expect(rootModel.folders.trash).not.toBe(null);
      expect(rootModel.folders.trash.length).toEqual(0);
    });

    it("should have pulled in the other folders", function() {
      expect(rootModel.folders.test).not.toBe(null);
      expect(rootModel.folders.test.length).toEqual(1);

      expect(rootModel.folders.test[0].text).toEqual("reddit: the front page of the internet");
      expect(rootModel.folders.test[0].url).toEqual("https://www.reddit.com/");
    });
  });

  describe("when instantiated basically", function() {
    beforeEach(function() {
      var plain = JSON.parse('{"key":"something","data":{"home":[],"trash":[]}}');
      rootModel = new RootModel(plain, fakeStorageService);
    });

    it("should create a folder when a folder is added", function() {
      rootModel.addFolder('charles');

      expect(rootModel.folders.charles).not.toBe(null);
      expect(rootModel.folders.charles.length).toEqual(0);
    });

    it("should be able to add bookmarks", function() {
      rootModel.addBookmark('home', 'something', 'http://www.something.com');

      expect(rootModel.folders.home.length).toEqual(1);
      expect(rootModel.folders.home[0].text).toEqual("something");
      expect(rootModel.folders.home[0].url).toEqual("http://www.something.com");
    });

    it("should create a folder when adding a bookmark to an undefined folder", function() {
      rootModel.addBookmark('whattheheck', 'something', 'http://www.something.com');

      expect(rootModel.folders.whattheheck).not.toBe(null);
      expect(rootModel.folders.whattheheck.length).toEqual(1);
      expect(rootModel.folders.whattheheck[0].text).toEqual("something");
      expect(rootModel.folders.whattheheck[0].url).toEqual("http://www.something.com");
    });
  });
});
