(function(){define(["team"],function(a){return function(b,c){return c.when("/teams",{templateUrl:"partials/teams.html",controller:["$scope",function(c){return c.addTeam=function(){var c,d;return d=b.tournament,c=new a(d),d.teams.push(c)},c.removeTeam=function(a){var c;return c=b.tournament.teams,c[a].destroy(),c.splice(a,1)},c.canRemoveTeam=function(a){var c,d,e,f,g;g=b.tournament.rounds;for(e=0,f=g.length;e<f;e++){d=g[e],c=a.rounds[d.id];if(c!=null&&c.ballot!=null)return!1}return!0},c.canRemovePlayer=function(a){var c,d,e,f,g,h,i,j,k,l;g=a.team,l=b.tournament.rounds;for(h=0,k=l.length;h<k;h++){f=l[h],e=g.rounds[f.id];if(e!=null&&e.ballot!=null&&e.ballot.locked&&e.ballot.roles!=null)for(c=i=0;i<2;c=++i)for(d=j=0;j<4;d=++j)if(e.ballot.roles[c][d]===a)return!1}return!0},c.initRepeat=function(a){return a.$watch(function(){return a.o.club},function(b,c){var d;if(b===c)return;d=a.o,c&&c.removeTeam(d);if(b)return b.addTeam(d)})},c.eliminateNil=function(a){return a==null?"":a}}]})}})}).call(this)