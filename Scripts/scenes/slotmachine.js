//The Source file name: slotmachine.ts 
//Author’s name: Christine Cho
//Last Modified by: Christine Cho
//Date last Modified: 02/26/2016
//Program description: Manages the slot machine reels and buttons 
//Revision History: 
//      - Changed reel ids to link to other image and reel image change 02/26/2016
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
// MENU SCENE
var scenes;
(function (scenes) {
    var SlotMachine = (function (_super) {
        __extends(SlotMachine, _super);
        // CONSTRUCTOR ++++++++++++++++++++++
        function SlotMachine() {
            _super.call(this);
            this._venasaur = 0;
            this._charizard = 0;
            this._blastoise = 0;
            this._typlosion = 0;
            this._meganium = 0;
            this._feraligatr = 0;
            this._gengar = 0;
            this._blanks = 0;
        }
        // PUBLIC METHODS +++++++++++++++++++++
        // Start Method
        SlotMachine.prototype.start = function () {
            // Reset game to initial values
            this._resetAll();
            // add background image to the scene
            this._backgroundImage = new createjs.Bitmap(assets.getResult("SlotMachine"));
            this.addChild(this._backgroundImage);
            // add Bet1Button to the scene
            this._bet1Button = new objects.Button("Bet1Button", 168, 400, false);
            this.addChild(this._bet1Button);
            this._bet1Button.on("click", this._bet1ButtonClick, this);
            // add Bet10Button to the scene
            this._bet10Button = new objects.Button("Bet10Button", 240, 400, false);
            this.addChild(this._bet10Button);
            this._bet10Button.on("click", this._bet10ButtonClick, this);
            // add Bet100Button to the scene
            this._bet100Button = new objects.Button("Bet100Button", 312, 400, false);
            this.addChild(this._bet100Button);
            this._bet100Button.on("click", this._bet100ButtonClick, this);
            // add SpinButton to the scene
            this._spinButton = new objects.Button("SpinButton", 420, 400, false);
            this.addChild(this._spinButton);
            this._spinButton.on("click", this._spinButtonClick, this);
            //Add _jackpotText to the scene
            this._jackpotText = new objects.Label(this._jackpot.toString(), "bold 18px Consolas", "#8A80A3", 253, 122, false);
            this._jackpotText.textAlign = "right";
            this.addChild(this._jackpotText);
            //Add _creditText to the scene
            this._creditText = new objects.Label(this._creditText.toString(), "bold 18px Consolas", "#8A80A3", 257, 329, false);
            this._creditText.textAlign = "right";
            this.addChild(this._creditText);
            //Add _betText to the scene
            this._betText = new objects.Label(this._betText.toString(), "bold 18px Consolas", "#8A80A3", 362, 329, false);
            this._betText.textAlign = "right";
            this.addChild(this._betText);
            //Add _paidText to the scene
            this._paidText = new objects.Label(this._paidText.toString(), "bold 18px Consolas", "#8A80A3", 472, 329, false);
            this._paidText.textAlign = "right";
            this.addChild(this._paidText);
            //Initialize the reels array of Bitmaps
            this._initializeBitmapArray();
            // Setup Background
            this._setupBackground("WhiteBackground");
            // FadeIn
            this._fadeIn(500);
            // add this scene to the global stage container
            stage.addChild(this);
        };
        // SLOT_MACHINE Scene updates here
        SlotMachine.prototype.update = function () {
        };
        //PRIVATE METHODS
        /* Utility function to check if a value falls within a range of bounds */
        SlotMachine.prototype._checkRange = function (value, lowerBounds, upperBounds) {
            return (value >= lowerBounds && value <= upperBounds) ? value : -1;
        };
        SlotMachine.prototype._resetAll = function () {
            this._playerMoney = 1000;
            this._winnerPaid = 0;
            this._jackpot = 5000;
            this._bet = 0;
        };
        /* When this function is called it determines the betLine results.
        e.g. Bar - Orange - Banana */
        SlotMachine.prototype._spinReels = function () {
            var betLine = [" ", " ", " "];
            var outCome = [0, 0, 0];
            for (var spin = 0; spin < 3; spin++) {
                outCome[spin] = Math.floor((Math.random() * 65) + 1);
                switch (outCome[spin]) {
                    case this._checkRange(outCome[spin], 1, 27):
                        betLine[spin] = "Blank";
                        this._blanks++;
                        break;
                    case this._checkRange(outCome[spin], 28, 37):
                        betLine[spin] = "Venasaur";
                        this._venasaur++;
                        break;
                    case this._checkRange(outCome[spin], 38, 46):
                        betLine[spin] = "Charizard";
                        this._charizard++;
                        break;
                    case this._checkRange(outCome[spin], 47, 54):
                        betLine[spin] = "Blastoise";
                        this._blastoise++;
                        break;
                    case this._checkRange(outCome[spin], 55, 59):
                        betLine[spin] = "Meganium";
                        this._meganium++;
                        break;
                    case this._checkRange(outCome[spin], 60, 62):
                        betLine[spin] = "Typlosion";
                        this._typlosion++;
                        break;
                    case this._checkRange(outCome[spin], 63, 64):
                        betLine[spin] = "Feraligatr";
                        this._feraligatr++;
                        break;
                    case this._checkRange(outCome[spin], 65, 65):
                        betLine[spin] = "Gengar";
                        this._gengar++;
                        break;
                }
            }
            return betLine;
        };
        //
        SlotMachine.prototype._initializeBitmapArray = function () {
            this._reels = new Array();
            for (var reel = 0; reel < 3; reel++) {
                this._reels[reel] = new createjs.Bitmap(assets.getResult("Blank"));
                this._reels[reel].x = 190 + (reel * 100);
                this._reels[reel].y = 232;
                this.addChild(this._reels[reel]);
            }
        };
        //EVENT HANDLERS ++++++++++++++++++++
        SlotMachine.prototype._bet1ButtonClick = function (event) {
            console.log("Bet 1 Credit");
        };
        SlotMachine.prototype._bet10ButtonClick = function (event) {
            console.log("Bet 10 Credit");
        };
        SlotMachine.prototype._bet100ButtonClick = function (event) {
            console.log("Bet 100 Credit");
        };
        SlotMachine.prototype._spinButtonClick = function (event) {
            var pokemonBitmap = this._spinReels();
            for (var reel = 0; reel < 3; reel++) {
                this._reels[reel].image = assets.getResult(pokemonBitmap[reel]);
            }
        };
        return SlotMachine;
    })(objects.Scene);
    scenes.SlotMachine = SlotMachine;
})(scenes || (scenes = {}));
//# sourceMappingURL=slotmachine.js.map