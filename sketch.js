var myResults = [];
var myResults1 = [];
var myResults2 = [];
var consumerKey = 'jJKwYVKkqnSkbr63NpK7Vzvkx';
var consumerSecret = 'lTMfwMs7rDxz8vPcxBD7Gy5lDO8GXnlIzPw2d8xVhqa1L4xOTw';

var token = '364475473-kMBumzdzoxKZcduTwFGizG0iyMldRx1CQtcRXm2w';
var tokenSecret = 'KBjBbqUZ0of2SQZDFEqSFof7kQPpENigIh7d3BMUQyCjN';

var cb = new Codebird();

const particles = [];

function setup() {
  createCanvas(window.innerWidth, window.innerHeight);

  cb.setConsumerKey(consumerKey, consumerSecret);
  cb.setToken(token, tokenSecret);


  const particlesLength = Math.floor(window.innerWidth/1.5);

  for(let i = 0; i<particlesLength; i++){
    particles.push(new Particle());
  }


    // codebird
  var params = {
    q: "room",
    result_type: 'recent',
    count: 10
  };

    var params1 = {
    q: "window",
    result_type: 'recent',
    count: 10
  };


    var params2 = {
    q: "door",
    result_type: 'recent',
    count: 10
  };

    cb.__call(
    "search_tweets",
    params,
    function(reply) {
      var statuses = reply.statuses;
      for (var i = 0; i < statuses.length; i++) {
        var tweet = statuses[i];
        if (!tweet.retweeted_status) {
          //print(tweet.text);
          //fill('#' + tweet.user.profile_background_color);

          fill(255/i);

          //let myResults = statuses;
         myResults = tweet.text;
          let words = tweet.text.split(" ");
          console.log(words);
          let hyphenated = words.join("-")
         // text(tweet.text , 0, i * 120);
        }
      }
      // print the max_id which helps if you want to grab pages of data
      //print('max_id: ' + reply.search_metadata.max_id);

    }
  );


      cb.__call(
    "search_tweets",
    params1,
    function(reply) {
      var statuses = reply.statuses;
      for (var i = 0; i < statuses.length; i++) {
        var tweet1 = statuses[i];
        if (!tweet1.retweeted_status) {


          fill(255);

          //let myResults = statuses;
         myResults1 = tweet1.text;
          //let words = tweet1.text.split(" ");
          //console.log(words);
          //let hyphenated = words.join("-")
         // text(tweet.text , 0, i * 120);
        }
      }
      // print the max_id which helps if you want to grab pages of data
      //print('max_id: ' + reply.search_metadata.max_id);

    }
  );


  cb.__call(
    "search_tweets",
    params2,
    function(reply) {
      var statuses = reply.statuses;
      for (var i = 0; i < statuses.length; i++) {
        var tweet2 = statuses[i];
        if (!tweet2.retweeted_status) {
          //print(tweet.text);
          //fill('#' + tweet.user.profile_background_color);

          fill(255/i);

          //let myResults = statuses;
         myResults2 = tweet2.text;
          let words = tweet2.text.split(" ");
          //console.log(words);
          let hyphenated = words.join("-")
         // text(tweet.text , 0, i * 120);
        }
      }
      // print the max_id which helps if you want to grab pages of data
      //print('max_id: ' + reply.search_metadata.max_id);

    }
  );
}//----------------________-set up

function draw() {
  background(0, 90);
  particles.forEach((p, index) => {
    p.update();
    p.edges();
    p.mouse();
    p.draw();
  });
}

class Particle{
  constructor(){
    //pos
    this.pos = createVector(random(width), random(height));
    //velo
    this.vel = createVector(random(-2,2), random(-2,2));
    //size
    this.size = 10;
    this.acc = createVector(random(-0.02, 0.02), random(-0.02, 0.02));
  }

  update(){
    this.pos.add(this.vel);
    this.pos.add(this.acc);
  }

  draw(){

      var txt = myResults ;              //scope issue
  var txt1 = myResults1;
  var txt2 = myResults2;
            var tx = String(txt);

    noStroke();
    fill(255, 70);
    textSize(5);
    //circle(this.pos.x, this.pos.y, this.size);
    text(tx, this.pos.x, this.pos.y);
  }

  edges(){
    if (this.pos.x < 0 || this.pos.x >width){
     this.vel.x *=-1;
   }


    if (this.pos.y < 0 || this.pos.y > height){
     this.vel.y *=-1;
    }
  }

  mouse(){
   if (abs(this.pos.x-mouseX)<30){
     this.vel.x *= -1.3;
   }else{
     this.vel.x = random(-0.02, 0.02);}
    if (abs(this.pos.y-mouseY)<30){
     this.vel.y *= -1.3;
   }else{
     this.vel.y = random(-0.02, 0.02);}
  }

}
