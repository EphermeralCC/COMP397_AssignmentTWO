//The Source file name: slotmachine.ts 
//Author’s name: Christine Cho
//Last Modified by: Christine Cho
//Date last Modified: 02/29/2016
//Program description: Manages the slot machine reels and buttons 
//Revision History: 
//      - Added Jackpot logic + Reset and Off buttons + Changed reel images 02/29/2016
//                  - Added sounds for spin, jackpot, out of credit
//      - Changed slot machine background, added labels, added logic for buttons 02/28/2016
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
            this._gastly = 0;
            this._haunter = 0;
            this._gengar = 0;
            this._duskull = 0;
            this._duskclops = 0;
            this._dusknoir = 0;
            this._darkrai = 0;
            this._blanks = 0;
        }
        // PUBLIC METHODS +++++++++++++++++++++
        // Start Method
        SlotMachine.prototype.start = function () {
            // Reset game to initial values
            this._resetAll();
            // add background image to the scene
            this._darkBackground = new createjs.Bitmap(assets.getResult("Dark"));
            this.addChild(this._darkBackground);
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
            //add _resetButton to the scene
            this._resetButton = new objects.Button("ResetButton", 411, 472, false);
            this.addChild(this._resetButton);
            this._resetButton.on("click", this._resetButtonClick, this);
            //add _offButton to the scene
            this._offButton = new objects.Button("OffButton", 481, 467, false);
            this.addChild(this._offButton);
            this._offButton.on("click", this._offButtonClick, this);
            //Add _jackpotText to the scene
            this._jackpotText = new objects.Label(this._jackpot.toString(), "bold 18px Consolas", "#8A80A3", 253, 122, false);
            this._jackpotText.textAlign = "right";
            this.addChild(this._jackpotText);
            //Add _creditText to the scene
            this._creditText = new objects.Label(this._credits.toString(), "bold 18px Consolas", "#8A80A3", 257, 329, false);
            this._creditText.textAlign = "right";
            this.addChild(this._creditText);
            //Add _betText to the scene
            this._betText = new objects.Label(this._bet.toString(), "bold 18px Consolas", "#8A80A3", 362, 329, false);
            this._betText.textAlign = "right";
            this.addChild(this._betText);
            //Add _paidText to the scene
            this._paidText = new objects.Label(this._winnerPaid.toString(), "bold 18px Consolas", "#8A80A3", 472, 329, false);
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
            this._credits = 1000;
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
                        betLine[spin] = "Gastly";
                        this._gastly++;
                        break;
                    case this._checkRange(outCome[spin], 38, 46):
                        betLine[spin] = "Haunter";
                        this._haunter++;
                        break;
                    case this._checkRange(outCome[spin], 47, 54):
                        betLine[spin] = "Gengar";
                        this._gengar++;
                        break;
                    case this._checkRange(outCome[spin], 55, 59):
                        betLine[spin] = "Duskull";
                        this._duskclops++;
                        break;
                    case this._checkRange(outCome[spin], 60, 62):
                        betLine[spin] = "Duskclops";
                        this._duskull++;
                        break;
                    case this._checkRange(outCome[spin], 63, 64):
                        betLine[spin] = "Dusknoir";
                        this._dusknoir++;
                        break;
                    case this._checkRange(outCome[spin], 65, 65):
                        betLine[spin] = "Darkrai";
                        this._darkrai++;
                        break;
                }
            }
            return betLine;
        };
        /* This function calculates the player's _winnerPaid, if any */
        SlotMachine.prototype._determineWinnings = function () {
            if (this._blanks == 0) {
                if (this._gastly == 3) {
                    this._winnerPaid = this._bet * 10;
                }
                else if (this._haunter == 3) {
                    this._winnerPaid = this._bet * 20;
                }
                else if (this._gengar == 3) {
                    this._winnerPaid = this._bet * 30;
                }
                else if (this._duskclops == 3) {
                    this._winnerPaid = this._bet * 40;
                }
                else if (this._duskull == 3) {
                    this._winnerPaid = this._bet * 50;
                }
                else if (this._dusknoir == 3) {
                    this._winnerPaid = this._bet * 75;
                }
                else if (this._darkrai == 3) {
                    this._winnerPaid = this._bet * 100;
                }
                else if (this._gastly == 2) {
                    this._winnerPaid = this._bet * 2;
                }
                else if (this._haunter == 2) {
                    this._winnerPaid = this._bet * 2;
                }
                else if (this._gengar == 2) {
                    this._winnerPaid = this._bet * 3;
                }
                else if (this._duskclops == 2) {
                    this._winnerPaid = this._bet * 4;
                }
                else if (this._duskull == 2) {
                    this._winnerPaid = this._bet * 5;
                }
                else if (this._dusknoir == 2) {
                    this._winnerPaid = this._bet * 10;
                }
                else if (this._darkrai == 2) {
                    this._winnerPaid = this._bet * 20;
                }
                else if (this._darkrai == 1) {
                    this._winnerPaid = this._bet * 5;
                }
                else {
                    this._winnerPaid = this._bet * 1;
                }
                console.log("Win!");
                this._checkJackPot();
            }
            else {
                console.log("Loss!");
            }
            this._paidText.text = this._winnerPaid.toString();
            this._credits += this._winnerPaid;
            this._creditText.text = this._credits.toString();
            this._resetReelTally();
        };
        //Reset reel values to zero
        SlotMachine.prototype._resetReelTally = function () {
            this._gastly = 0;
            this._haunter = 0;
            this._gengar = 0;
            this._duskull = 0;
            this._duskclops = 0;
            this._dusknoir = 0;
            this._darkrai = 0;
            this._blanks = 0;
        };
        /* Check to see if the player won the jackpot */
        SlotMachine.prototype._checkJackPot = function () {
            /* compare two random values */
            this._jackpotPercent = Math.floor(Math.random() * 21 + 1);
            this._jackpotWinnings = Math.floor(Math.random() * 21 + 1);
            if (this._jackpotPercent == this._jackpotWinnings) {
                alert("You Won the $" + this._jackpot + " Jackpot!!");
                createjs.Sound.play("JacpotSound");
                this._credits += this._jackpot;
                this._jackpot = 1000;
                this._jackpotText.text = "1000";
            }
        };
        SlotMachine.prototype._initializeBitmapArray = function () {
            this._reels = new Array();
            for (var reel = 0; reel < 3; reel++) {
                this._reels[reel] = new createjs.Bitmap(assets.getResult("Blank"));
                this._reels[reel].x = 190 + (reel * 100);
                this._reels[reel].y = 232;
                this.addChild(this._reels[reel]);
            }
        };
        SlotMachine.prototype._makeABet = function (_bet) {
            //Ensure player bet is less than or equal to player's credit
            if (_bet <= this._credits) {
                this._bet += _bet;
                this._credits -= _bet;
                this._winnerPaid = 0;
                this._creditText.text = this._credits.toString();
                this._betText.text = this._bet.toString();
            }
        };
        //EVENT HANDLERS ++++++++++++++++++++
        SlotMachine.prototype._bet1ButtonClick = function (event) {
            console.log("Bet 1 Credit");
            this._makeABet(1);
        };
        SlotMachine.prototype._bet10ButtonClick = function (event) {
            console.log("Bet 10 Credit");
            this._makeABet(10);
        };
        SlotMachine.prototype._bet100ButtonClick = function (event) {
            console.log("Bet 100 Credit");
            this._makeABet(100);
        };
        SlotMachine.prototype._spinButtonClick = function (event) {
            if (this._bet > 0) {
                var pokemonBitmap = this._spinReels();
                for (var reel = 0; reel < 3; reel++) {
                    this._reels[reel].image = assets.getResult(pokemonBitmap[reel]);
                    createjs.Sound.play("SpinClickSound");
                }
                this._determineWinnings();
                //this._resetReelTally();
                //reset player's bet to zero
                this._bet = 0;
                this._betText.text = this._bet.toString();
            }
            else {
                createjs.Sound.play("GengarSound");
                alert("Please enter a bet amount or reset!");
            }
        };
        SlotMachine.prototype._resetButtonClick = function (event) {
            console.log("Reset The Game");
            this._credits = 1000;
            this._winnerPaid = 0;
            this._jackpot = 5000;
            this._bet = 0;
            this._jackpotText.text = "5000";
            this._creditText.text = "1000";
            this._betText.text = "0";
            this._paidText.text = "0";
            this._reels = new Array();
            for (var reel = 0; reel < 3; reel++) {
                this._reels[reel] = new createjs.Bitmap(assets.getResult("Blank"));
                this._reels[reel].x = 190 + (reel * 100);
                this._reels[reel].y = 232;
                this.addChild(this._reels[reel]);
            }
        };
        SlotMachine.prototype._offButtonClick = function (event) {
            console.log("Turn it off!");
            scene = config.Scene.MENU;
            changeScene();
        };
        return SlotMachine;
    })(objects.Scene);
    scenes.SlotMachine = SlotMachine;
})(scenes || (scenes = {}));
//# sourceMappingURL=slotmachine.js.map