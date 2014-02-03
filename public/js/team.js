(function(){define(["util","player"],function(a,b){var c;return c=function(){function c(a,b){var c,d,e,f,g,h;this.tournament=a;if(b)for(c in b)e=b[c],this[c]=e;this.name==null&&(this.name=""),this.players==null&&(this.players=[]),this.rounds==null&&(this.rounds={});if(!b){h=this.tournament.rounds;for(f=0,g=h.length;f<g;f++)d=h[f],d.registerTeam(this)}}return c.prototype.unpackCycles=function(){var b,c,d,e,f;this.club=a.unpackCycle(this.club,this.tournament.clubs),a.unpackCycles(this.players,this.tournament.players),e=this.rounds,f=[];for(b in e)c=e[b],d=this.tournament.roundWithId(b),d&&c.ballot!=null?f.push(c.ballot=a.unpackCycle(c.ballot,d.ballots)):f.push(void 0);return f},c.prototype.toJSON=function(){var b,c,d,e,f,g;c=a.copyObject(this,["tournament","rounds","stats"]),c.club=a.packCycle(this.club,this.tournament.clubs),c.players=a.packCycles(this.players,this.tournament.players),c.rounds={},g=this.rounds;for(b in g)e=g[b],f=this.tournament.roundWithId(b),f&&(c.rounds[b]=d=a.copyObject(e),e.ballot&&(d.ballot=a.packCycle(e.ballot,f.ballots)));return c},c.calculateStats=function(a,b){var c,d,e,f,g,h,i,j,k,l,m;h=0,g=0,d=0,c=0;for(i=0,k=a.length;i<k;i++)f=a[i],e=f.stats=f.getStats(b),e.score>=0&&(h+=e.score,d++),e.reply>=0&&(g+=e.reply,c++);d?h/=d:h=245,c?g/=c:g=35,m=[];for(j=0,l=a.length;j<l;j++)f=a[j],e=f.stats,e.score<0&&(e.score<-2&&(e.scoreHighLow=h*-(e.score+2)),e.score*=-h),e.reply<0?m.push(e.reply*=-g):m.push(void 0);return m},c.prototype.getStats=function(a){var b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s;e={rawWins:0,rawScore:0,rawReply:0,rawBallots:0,byeWins:0,byeBallots:0,minScore:280,maxScore:0,wins:0,score:0,reply:0,scoreHighLow:0,ballots:0,roundsPlayed:0,roundsBotched:0,prop:0,opp:0};for(n=0,q=a.length;n<q;n++){h=a[n],typeof h=="object"&&(h=h.id),g=this.tournament.roundWithId(h),b=this.rounds[h].ballot;if(!b||!b.locked)continue;if(this===b.teams[0])k=0;else if(this===b.teams[1])k=1;else continue;if(b.presence[k])if(b.presence[1-k]&&b.teams[1-k]){e.roundsPlayed++,j=0,f=0,c=0,m=0,s=b.votes;for(o=0,r=s.length;o<r;o++){l=s[o];for(d=p=0;p<4;d=++p)j+=l.scores[k][d]*l.ballots;f+=l.scores[k][3]*l.ballots,c+=l.ballots,m+=k?l.opp:l.prop}m>c-m&&e.rawWins++,e.rawBallots+=m,c&&(j/=c,f/=c),e.rawScore+=j,e.rawReply+=f,j<e.minScore&&(e.minScore=j),j>e.maxScore&&(e.maxScore=j),k?e.opp++:e.prop++}else e.byeWins++,e.byeBallots+=g.ballotsPerMatchSolved();else e.roundsBotched++}return e.wins=e.rawWins+e.byeWins,e.ballots=e.rawBallots+e.byeBallots,i=e.roundsPlayed+e.roundsBotched,e.score=e.rawScore+e.byeWins*(i?e.rawScore/i:-1),e.reply=e.rawReply+e.byeWins*(i?e.rawReply/i:-1),e.byeWins+i>2&&i&&(e.scoreHighLow=e.score-e.minScore-e.maxScore),e.wins=e.rawWins+e.byeWins,e.ballots=e.rawBallots+e.byeBallots,e},c.prototype.addPlayer=function(){var a;return a=new b(this.tournament),this.players.push(a),this.tournament.players.push(a),a.team=this,a},c.prototype.removePlayer=function(a){var b;return b=this.players.indexOf(a),this.players.splice(b,1)},c.prototype.removePlayerAtIndex=function(a){var b,c,d;return d=this.players[a],this.players.splice(a,1),b=this.tournament.players,c=b.indexOf(d),b.splice(c,1)},c.prototype.destroy=function(){var a,b,c,d;d=this.tournament.rounds;for(b=0,c=d.length;b<c;b++)a=d[b],a.unregisterTeam(this);return this.club&&this.club.removeTeam(this),this.tournament.destroyEntityInJudgeRules(this)},c}()})}).call(this)