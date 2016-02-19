data = {
  game: null,
  choices: null,
  debugMode: false,
  printedText: "",
  music: []
}

gamePath = './game'

consolePrint= ->
  console.log("It's not a real dragon!")

# Game area
gameArea = new Vue(
  el: '#game-area'
  data: data
  methods:
    # Return whether the requirements of a choice have been filled
    requirementsFilled: (choice) ->
      return Scene.requirementsFilled(choice)

    # Return whether the text can be skipped
    textSkipEnabled: (choice) ->
      return data.game.currentScene.skipEnabled

    # Select a choice
    selectChoice: (choice) ->
      Scene.exitScene(@game.currentScene)
      Scene.readItemAndStatsEdits(choice)
      Scene.readSounds(choice,true)
      Scene.readSaving(choice)
      if choice.nextScene != ""
        Scene.changeScene(choice.nextScene)
      else if choice.nextScene == ""
        if choice.nextChoice != undefined
          Scene.selectChoiceByName(Scene.selectRandomOption(choice.nextChoice))
        else
          Scene.updateScene(@game.currentScene,true)
)

### And finally, start the game... ###
GameManager.startGame()
