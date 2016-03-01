//The Source file name: menu.ts 
//Author’s name: Christine Cho
//Last Modified by: Christine Cho
//Date last Modified: 02/29/2016
//Program description: The menu scene for the game
//Revision History: 
//      - Updated menu background 02/29/2016

// MENU SCENE
module scenes {
    export class Menu extends objects.Scene {
        //PRIVATE INSTANCE VARIABLES ++++++++++++
        private _startButton: objects.Button;
        private _welcomeLabel: objects.Label;
        
        // CONSTRUCTOR ++++++++++++++++++++++
        constructor() {
            super();
        }
        
        // PUBLIC METHODS +++++++++++++++++++++
        
        // Start Method
        public start(): void {    

            // Setup Background
            this._setupBackground("GengarBackground");
            
            // add the WELCOME Label to the MENU scene
            this._welcomeLabel = new objects.Label(
                "Phantom Slots",
                "60px Consolas",
                "#FFFFFF",
                config.Screen.CENTER_X,
                config.Screen.CENTER_Y, true);
            this.addChild(this._welcomeLabel);
                   
            // add the START button to the MENU scene
            this._startButton = new objects.Button(
                "StartButton",
                config.Screen.CENTER_X,
                config.Screen.CENTER_Y + 80, true);
            this.addChild(this._startButton);
            
            // START Button event listener
            this._startButton.on("click", this._startButtonClick, this);
           
            // add this scene to the global stage container
            stage.addChild(this);
        }

        // INTRO Scene updates here
        public update(): void {

        }
        
        
        //EVENT HANDLERS ++++++++++++++++++++
        
        // START Button click event handler
        private _startButtonClick(event: createjs.MouseEvent) {
            //FadeOut 
            this._fadeOut(500, () => {
                // Switch to the SLOT_MACHINE Scene
                scene = config.Scene.SLOT_MACHINE;
                changeScene();
            });
        }

    }
}