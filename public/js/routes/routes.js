(function(){define(["routes/unimplemented","routes/json","routes/clubs","routes/dashboard","routes/teams","routes/judges","routes/rooms","routes/rounds","routes/team-rank","routes/speaker-rank"],function(a,b,c,d,e,f,g,h,i,j){return function(k){return k.app.config(["$routeProvider",function(l){return a(k,l),c(k,l),d(k,l),e(k,l),f(k,l),g(k,l),h(k,l),i(k,l),j(k,l),b(k,l),l.otherwise({redirectTo:"/unimplemented"})}])}})}).call(this)