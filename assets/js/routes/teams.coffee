define ['team'], (Team) ->
  (ui, $routeProvider) ->
    $routeProvider.when '/teams',
      templateUrl: 'partials/teams.html'
      controller: [ '$scope', ($scope) ->
        $scope.addTeam = ->
          tournament = ui.tournament
          team = new Team tournament
          tournament.teams.push team

        $scope.removeTeam = (index) ->
          array = ui.tournament.teams
          array[index].destroy()
          array.splice(index, 1)

        $scope.initRepeat = (iScope) ->
          iScope.$watch ->
            iScope.o.club
          , (newValue, oldValue) ->
            return if newValue == oldValue
            team = iScope.o
            if oldValue
              oldValue.removeTeam(team)
            if newValue
              newValue.addTeam(team)

        $scope.eliminateNil = (a) ->
          if not a?
            return ''
          return a
      ]
