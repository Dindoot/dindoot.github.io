new Vue({
  el: "#app",
  data() {
    return {
      audio: null,
      circleLeft: null,
      barWidth: null,
      duration: null,
      currentTime: null,
      isTimerPlaying: false,
      tracks: [
        {
          name: "POP!",
          artist: "NAYEON",
          cover: "https://raw.githubusercontent.com/Dindoot/dindoot.github.io/main/img/imnayeon.jpg",
          source: "https://raw.githubusercontent.com/Dindoot/dindoot.github.io/main/mp3/music1.ogg",
          url: "https://www.youtube.com/watch?v=f6YDKF0LVWw",
          favorited: true
        },
        {
          name: "At That Moment",
          artist: "WSG WANNBE (GAYA-G)",
          cover: "https://raw.githubusercontent.com/Dindoot/dindoot.github.io/main/img/wsg.jpg",
          source: "https://raw.githubusercontent.com/Dindoot/dindoot.github.io/main/mp3/music2.ogg",
          url: "https://www.youtube.com/watch?v=kZvzjX35KxY",
          favorited: true
        },
        {
          name: "To My Youth",
          artist: "BOL4",
          cover: "https://raw.githubusercontent.com/Dindoot/dindoot.github.io/main/img/reddiary.jpg",
          source: "https://raw.githubusercontent.com/Dindoot/dindoot.github.io/main/mp3/music3.ogg",
          url: "https://www.youtube.com/watch?v=GY_StGcBSYw",
          favorited: false
        },
        {
          name: "Rough",
          artist: "GFRIEND",
          cover: "https://raw.githubusercontent.com/Dindoot/dindoot.github.io/main/img/snowflake.jpg",
          source: "https://raw.githubusercontent.com/Dindoot/dindoot.github.io/main/mp3/music4.ogg",
          url: "https://www.youtube.com/watch?v=r_6q_-d-7Sk",
          favorited: true
        },
        {
          name: "YOU AND I",
          artist: "Dreamcatcher",
          cover: "https://raw.githubusercontent.com/Dindoot/dindoot.github.io/main/img/nightmare.jpg",
          source: "https://raw.githubusercontent.com/Dindoot/dindoot.github.io/main/mp3/music5.ogg",
          url: "https://www.youtube.com/watch?v=LFxjwBfFIiY",
          favorited: false
        },
        {
          name: "FEARLESS",
          artist: "LE SSERAFIM",
          cover: "https://raw.githubusercontent.com/Dindoot/dindoot.github.io/main/img/fearless.jpg",
          source: "https://raw.githubusercontent.com/Dindoot/dindoot.github.io/main/mp3/music6.ogg",
          url: "https://www.youtube.com/watch?v=4vbDFu0PUew",
          favorited: false
        },
        {
          name: "Heart Burn",
          artist: "SUNMI",
          cover: "https://raw.githubusercontent.com/Dindoot/dindoot.github.io/main/img/heartburn.jpg",
          source: "https://raw.githubusercontent.com/Dindoot/dindoot.github.io/main/mp3/music7.ogg",
          url: "https://www.youtube.com/watch?v=wVPICMGhFjo",
          favorited: true
        },
        {
          name: "LAW (Prod. by Czaer)",
          artist: "YOON MI RAE & BIBI",
          cover: "https://raw.githubusercontent.com/Dindoot/dindoot.github.io/main/img/smf.jpg",
          source: "https://raw.githubusercontent.com/Dindoot/dindoot.github.io/main/mp3/music8.ogg",
          url: "https://www.youtube.com/watch?v=gXlsYv90pag",
          favorited: false
        },
        {
          name: "LOVEADE (LOVEADE)",
          artist: "VIVIZ",
          cover: "https://raw.githubusercontent.com/Dindoot/dindoot.github.io/main/img/summervibe.jpg",
          source: "https://raw.githubusercontent.com/Dindoot/dindoot.github.io/main/mp3/music9.ogg",
          url: "https://www.youtube.com/watch?v=7oGRnWulYCI",
          favorited: false
        },
        {
          name: "Shut Down",
          artist: "BLACKPINK",
          cover: "https://raw.githubusercontent.com/Dindoot/dindoot.github.io/main/img/bornpink.jpg",
          source: "https://raw.githubusercontent.com/Dindoot/dindoot.github.io/main/mp3/music10.ogg",
          url: "https://www.youtube.com/watch?v=POe9SOEKotk",
          favorited: false
        }
      ],
      currentTrack: null,
      currentTrackIndex: 0,
      transitionName: null
    };
  },
  methods: {
    play() {
      if (this.audio.paused) {
        this.audio.play();
        this.isTimerPlaying = true;
      } else {
        this.audio.pause();
        this.isTimerPlaying = false;
      }
    },
    generateTime() {
      let width = (100 / this.audio.duration) * this.audio.currentTime;
      this.barWidth = width + "%";
      this.circleLeft = width + "%";
      let durmin = Math.floor(this.audio.duration / 60);
      let dursec = Math.floor(this.audio.duration - durmin * 60);
      let curmin = Math.floor(this.audio.currentTime / 60);
      let cursec = Math.floor(this.audio.currentTime - curmin * 60);
      if (durmin < 10) {
        durmin = "0" + durmin;
      }
      if (dursec < 10) {
        dursec = "0" + dursec;
      }
      if (curmin < 10) {
        curmin = "0" + curmin;
      }
      if (cursec < 10) {
        cursec = "0" + cursec;
      }
      this.duration = durmin + ":" + dursec;
      this.currentTime = curmin + ":" + cursec;
    },
    updateBar(x) {
      let progress = this.$refs.progress;
      let maxduration = this.audio.duration;
      let position = x - progress.offsetLeft;
      let percentage = (100 * position) / progress.offsetWidth;
      if (percentage > 100) {
        percentage = 100;
      }
      if (percentage < 0) {
        percentage = 0;
      }
      this.barWidth = percentage + "%";
      this.circleLeft = percentage + "%";
      this.audio.currentTime = (maxduration * percentage) / 100;
      this.audio.play();
    },
    clickProgress(e) {
      this.isTimerPlaying = true;
      this.audio.pause();
      this.updateBar(e.pageX);
    },
    prevTrack() {
      this.transitionName = "scale-in";
      this.isShowCover = false;
      if (this.currentTrackIndex > 0) {
        this.currentTrackIndex--;
      } else {
        this.currentTrackIndex = this.tracks.length - 1;
      }
      this.currentTrack = this.tracks[this.currentTrackIndex];
      this.resetPlayer();
    },
    nextTrack() {
      this.transitionName = "scale-out";
      this.isShowCover = false;
      if (this.currentTrackIndex < this.tracks.length - 1) {
        this.currentTrackIndex++;
      } else {
        this.currentTrackIndex = 0;
      }
      this.currentTrack = this.tracks[this.currentTrackIndex];
      this.resetPlayer();
    },
    resetPlayer() {
      this.barWidth = 0;
      this.circleLeft = 0;
      this.audio.currentTime = 0;
      this.audio.src = this.currentTrack.source;
      setTimeout(() => {
        if(this.isTimerPlaying) {
          this.audio.play();
        } else {
          this.audio.pause();
        }
      }, 300);
    },
    favorite() {
      this.tracks[this.currentTrackIndex].favorited = !this.tracks[
        this.currentTrackIndex
      ].favorited;
    }
  },
  created() {
    let vm = this;
    this.currentTrack = this.tracks[0];
    this.audio = new Audio();
    this.audio.src = this.currentTrack.source;
    this.audio.ontimeupdate = function() {
      vm.generateTime();
    };
    this.audio.onloadedmetadata = function() {
      vm.generateTime();
    };
    this.audio.onended = function() {
      vm.nextTrack();
      this.isTimerPlaying = true;
    };

    // this is optional (for preload covers)
    for (let index = 0; index < this.tracks.length; index++) {
      const element = this.tracks[index];
      let link = document.createElement('link');
      link.rel = "prefetch";
      link.href = element.cover;
      link.as = "image"
      document.head.appendChild(link)
    }
  }
});
