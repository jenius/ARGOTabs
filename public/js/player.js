(function(){define(["util"],function(a){var b;return b=function(){function b(a,b){var c,d;this.tournament=a;if(b)for(c in b)d=b[c],this[c]=d;this.name==null&&(this.name="Unnamed")}return b.prototype.unpackCycles=function(){return this.team=a.unpackCycle(this.team,this.tournament.teams)},b.prototype.toJSON=function(){var b;return b=a.copyObject(this,["tournament","stats"]),b.team=a.packCycle(this.team,this.tournament.teams),b},b.prototype.destroy=function(){if(this.team)return this.team.removePlayer(this)},b.calculateStats=function(a,b){var c,d,e,f;f=[];for(d=0,e=a.length;d<e;d++)c=a[d],f.push(c.stats=c.getStats(b));return f},b.prototype.getStats=function(a){var b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s;d={rawScore:0,rawReply:0,rawHighLow:0,roundsPlayed:0,roundsReplyed:0,scoreCount:0,replyCount:0,byes:0,replyByes:0,minScore:80,maxScore:0,score:0,reply:0,ballots:0,replyBallots:0,scoreHighLow:0};for(k=0,o=a.length;k<o;k++){f=a[k],typeof f=="object"&&(f=f.id),e=this.tournament.roundWithId(f);if(this.team==null)continue;b=this.team.rounds[f].ballot;if(!b||!b.locked||b.roles==null)continue;if(this.team===b.teams[0])h=0;else if(this.team===b.teams[1])h=1;else continue;i=-1;for(c=l=0;l<4;c=++l)if(b.roles[h][c]===this){i=c;break}if(i===-1)continue;if(b.presence[h])if(b.presence[1-h]&&b.teams[1-h])if(i!==3){d.roundsPlayed++,r=b.votes;for(m=0,p=r.length;m<p;m++)j=r[m],g=j.scores[h][i],d.rawScore+=g*j.ballots,d.scoreCount+=j.ballots,g<d.minScore&&(d.minScore=g),g>d.maxScore&&(d.maxScore=g)}else{d.roundsReplyed++,s=b.votes;for(n=0,q=s.length;n<q;n++)j=s[n],g=j.scores[h][3],d.rawReply+=g*j.ballots,d.replyCount+=j.ballots}else i!==3?(d.byes+=e.ballotsPerMatchSolved(),d.roundsPlayed++):(d.replyByes+=e.ballotsPerMatchSolved(),d.roundsReplyed++)}return d.ballots=d.scoreCount+d.byes,d.replyBallots=d.replyCount+d.replyByes,d.score=d.scoreCount?d.rawScore/d.scoreCount:d.byes?-1:0,d.reply=d.replyCount?d.rawReply/d.replyCount:d.replyByes?-1:0,d.ballots>2?d.scoreCount?d.scoreHighLow=(d.rawScore+d.score*d.byes-d.minScore-d.maxScore)/(d.ballots-2):d.scoreHighLow=-1:d.scoreHighLow=0,d.wins=d.rawWins+d.byeWins,d.ballots=d.rawBallots+d.byeBallots,d},b}()})}).call(this)