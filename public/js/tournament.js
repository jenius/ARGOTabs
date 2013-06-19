(function() {
  define(['util', 'club', 'team', 'judge', 'room'], function(Util, Club, Team, Judge, Room) {
    var Tournament;
    return Tournament = (function() {
      function Tournament(backend) {
        this.backend = backend;
        this.clubs = [];
      }

      Tournament.prototype.load = function(fn) {
        var _this = this;
        return this.backend.load(function(loadedString) {
          var club, i, judge, key, model, room, team, value, _i, _j, _k, _l, _len, _len1, _len2, _len3, _len4, _len5, _len6, _len7, _m, _n, _o, _p, _ref, _ref1, _ref2, _ref3, _ref4, _ref5, _ref6, _ref7;
          try {
            model = JSON.parse(loadedString);
          } catch (_error) {

          }
          if (model == null) {
            model = {};
          }
          _this.clubs = [];
          _this.teams = [];
          _this.judges = [];
          _this.rooms = [];
          for (key in model) {
            value = model[key];
            _this[key] = value;
          }
          _ref = _this.clubs;
          for (i = _i = 0, _len = _ref.length; _i < _len; i = ++_i) {
            club = _ref[i];
            _this.clubs[i] = new Club(_this, club);
          }
          _ref1 = _this.teams;
          for (i = _j = 0, _len1 = _ref1.length; _j < _len1; i = ++_j) {
            team = _ref1[i];
            _this.teams[i] = new Team(_this, team);
          }
          _ref2 = _this.judges;
          for (i = _k = 0, _len2 = _ref2.length; _k < _len2; i = ++_k) {
            judge = _ref2[i];
            _this.judges[i] = new Judge(_this, judge);
          }
          _ref3 = _this.rooms;
          for (i = _l = 0, _len3 = _ref3.length; _l < _len3; i = ++_l) {
            room = _ref3[i];
            _this.rooms[i] = new Room(_this, room);
          }
          _ref4 = _this.clubs;
          for (_m = 0, _len4 = _ref4.length; _m < _len4; _m++) {
            club = _ref4[_m];
            club.unpackCycles();
          }
          _ref5 = _this.teams;
          for (_n = 0, _len5 = _ref5.length; _n < _len5; _n++) {
            team = _ref5[_n];
            team.unpackCycles();
          }
          _ref6 = _this.judges;
          for (_o = 0, _len6 = _ref6.length; _o < _len6; _o++) {
            judge = _ref6[_o];
            judge.unpackCycles();
          }
          _ref7 = _this.rooms;
          for (_p = 0, _len7 = _ref7.length; _p < _len7; _p++) {
            room = _ref7[_p];
            room.unpackCycles();
          }
          _this.lastData = _this.toFile();
          fn();
        });
      };

      Tournament.prototype.toJSON = function() {
        return Util.copyObject(this, ['backend', 'lastData']);
      };

      Tournament.prototype.toFile = function() {
        return JSON.stringify(this);
      };

      Tournament.prototype.save = function(fn, force) {
        if (force == null) {
          force = false;
        }
        return this.saveData(this.toFile(), fn, force);
      };

      Tournament.prototype.saveIfRequired = function(fn, force) {
        var data;
        if (force == null) {
          force = false;
        }
        data = this.toFile();
        if (this.lastData === data) {
          return false;
        }
        this.saveData(data, fn, force);
        return true;
      };

      Tournament.prototype.saveData = function(data, fn, force) {
        var _this = this;
        if (force == null) {
          force = false;
        }
        return this.backend.save(data, function() {
          _this.lastData = data;
          return fn();
        }, force);
      };

      return Tournament;

    })();
  });

}).call(this);
