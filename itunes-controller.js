function ItunesController() {
  var itunesService = new ItunesService()
  //Do Not Modify the getMusic function
  this.getMusic = function getMusic(e) {
    e.preventDefault();
    var artist = e.target.artist.value;
    itunesService.getMusicByArtist(artist).then(draw); //after get music by artist returns what are you doing with the objects?
  }

  //Start coding here
  function draw(content) {
    var template = ``;
    var i;
    var audioCount = 0;
    for (i = 0; i < content.length; i++) {
      var buttonId = i;
      var audioId = i + 50;
      artist = content[i];
      if (artist.kind != "song") {
        continue
      } 
      audioCount++
      template += `
        <div class="col-xs-12 col-sm-6">
          <div class="box">
            <div class="row">
              <div class="col-xs-3">
              <img class="albumArt img-responsive" src="${artist.albumArt}" alt"${artist.collection} album art">
              <p class="text-center">$${artist.price}</p>
              </div>
              <div class="col-xs-9">
                <a href="javascript:void(0)" onclick="app.controllers.itunesCtrl.playPause(${audioId}, ${buttonId})">
                  <h3>
                   <span id=${buttonId} class="glyphicon glyphicon-play"></span>  
                  ${artist.title}
                  </h3>
                 </a>
                <p>Album: ${artist.collection}</p>
                <p>By: ${artist.artist}</p>
              </div>
            </div>
            <div>
              <audio id=${audioId}>
              <source src=${artist.preview} type="audio/mpeg">
              </audio>
            </div>
          </div>
        </div>
      `
    }
    document.getElementById("songs").innerHTML = template;
    document.getElementById("message").innerHTML = `Showing ${audioCount} results for "${document.getElementById("search").value}"`;
    console.log(content)
  }

  this.playPause = function playPause(song, icon) {
    var mySong = document.getElementById(song);
    if (mySong.paused && icon != ((!mySong.paused) - 50)) {
      document.getElementById(icon).classList.remove("glyphicon-play");
      document.getElementById(icon).classList.add("glyphicon-pause");
      mySong.play();
    } else {
      document.getElementById(icon).classList.remove("glyphicon-pause");
      document.getElementById(icon).classList.add("glyphicon-play");
      mySong.pause();
    }
  }
  document.addEventListener('play', function (e) {
    var audios = document.getElementsByTagName('audio');
    for (var i = 0, len = audios.length; i < len; i++) {
      if (audios[i] != e.target) {
        audios[i].pause();
      }
    }
  }, true);
}