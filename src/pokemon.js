import $ from "jquery";

// Game state
const player = "Red";
const playerLevel = 5;
const playerPokemon = {
  name: "Pikachu",
  hp: 35,
  atk: 70,
  def: 30,
};
const hpPlayerTotal = playerPokemon.hp;
let hpPlayer = hpPlayerTotal;

const foe = "Blue";
const foePokemon = {
  name: "Eevee",
  hp: 40,
  atk: 55,
  def: 50,
};
const hpFoeFull = foePokemon.hp;
let hpFoe = hpFoeFull;
let foeBaseDefense = foePokemon.def;

let potionCount = 1;

// Hide all menus except dialog
const hider = () => {
  $(".window.menu").hide();
  $(".window.item").hide();
  $(".window.pkmn").hide();
  $(".window.fight").hide();
};

// Reset to battle ready mode
const reset = () => {
  $(".text1").text("");
  $(".text2").text("");
  $(".window.item").hide();
  $(".window.pkmn").hide();
  $(".window.fight").hide();
  $(".window.menu").show();
};

// Health bar width calculation
const healthbar = (current, total) => {
  return (current * 100) / total;
};

// Text typer effect
const typer = () => {
  $(".text1, .text2").each(function () {
    const text = $(this).text();
    $(this).html("");
    for (let i = 0; i < text.length; i++) {
      // Use &nbsp; for spaces to preserve them
      const char = text[i] === " " ? "&nbsp;" : text[i];
      $(this).append("<span>" + char + "</span>");
    }
  });
  const line = $(".window.texts");
  line.find("span").hide();
  line.show().find("span").each(function (i) {
    $(this).delay(40 * i).fadeIn(0);
  });
};

// Potion function
const potion = (type) => {
  if (potionCount <= 0) {
    $(".text1").text("No potions left!");
    $(".text2").text("");
    typer();
    return;
  }
  hider();
  $(".text1").text(player.toUpperCase() + " used");
  $(".text2").text("POTION!");
  typer();
  potionCount--;
  $(".potionCount").text(potionCount);
  const healAmount = 20;
  hpPlayer = Math.min(hpPlayer + healAmount, hpPlayerTotal);
  $(".player .hp").text(hpPlayer);
  $(".player .hp-bar-active").css("width", healthbar(hpPlayer, hpPlayerTotal) + "%");
  window.setTimeout(() => {
    attackEnd();
  }, 2000);
};

// Attack function
const attack = (move) => {
  if (move === "-") {
    return;
  }
  hider();
  
  if (move === "tail whip") {
    $(".text1").text(playerPokemon.name.toUpperCase() + " used");
    $(".text2").text("TAIL WHIP!");
    typer();
    foeBaseDefense = Math.max(foeBaseDefense - 10, 10);
    window.setTimeout(() => {
      $(".text1").text(foePokemon.name.toUpperCase() + "'s");
      $(".text2").text("DEFENSE fell!");
      typer();
      window.setTimeout(() => {
        attackEnd();
      }, 2000);
    }, 2000);
    return;
  }
  
  // Tackle attack
  $(".text1").text(playerPokemon.name.toUpperCase() + " used");
  $(".text2").text("TACKLE!");
  typer();
  
  $(".player .images")
    .animate({ left: "2em" }, 100, "linear")
    .animate({ left: "0.8em" }, 50, "linear");
    
  window.setTimeout(() => {
    $(".foe .images").css("opacity", 0);
    window.setTimeout(() => {
      $(".foe .images").css("opacity", 1);
      window.setTimeout(() => {
        $(".foe .images").css("opacity", 0);
        window.setTimeout(() => {
          $(".foe .images").css("opacity", 1);
          window.setTimeout(() => {
            const basePower = 40;
            const baseDamage = Math.floor(
              Math.floor(
                (Math.floor((2 * playerLevel) / 5 + 2) * basePower * playerPokemon.atk) / foeBaseDefense
              ) / 50
            ) + 2;
            hpFoe -= baseDamage;
            $(".foe .hp-bar-active").css("width", healthbar(Math.max(hpFoe, 0), hpFoeFull) + "%");
            window.setTimeout(() => {
              attackEnd();
            }, 500);
          }, 100);
        }, 100);
      }, 100);
    }, 100);
  }, 300);
};

// Enemy turn / check win condition
const attackEnd = () => {
  if (hpFoe <= 0) {
    $(".window.menu").hide();
    $(".foe .hp-bar-active").css("width", "0%");
    window.setTimeout(() => {
      $(".foe .images").delay(500).animate({ bottom: "-35em" }, 1000);
      $(".text1").text(foePokemon.name.toUpperCase() + " fainted!");
      $(".text2").text("");
      typer();
      window.setTimeout(() => {
        $(".foe .stats").hide();
        $(".text1").text("Got $" + Math.floor(playerLevel * 2.5) + " for");
        $(".text2").text("winning!");
        typer();
        window.setTimeout(() => {
          $(".text1").text(foe.toUpperCase() + ": I can't");
          $(".text2").text("believe it!");
          typer();
        }, 2000);
      }, 2000);
    }, 2000);
  } else {
    // Enemy attacks
    window.setTimeout(() => {
      $(".text1").text(foePokemon.name.toUpperCase() + " used");
      $(".text2").text("TACKLE!");
      typer();
      $(".foe .images")
        .animate({ right: "0em" }, 100, "linear")
        .animate({ right: "1.8em" }, 50, "linear")
        .delay(100)
        .animate({ right: "0.8em" }, 10, "linear");
      window.setTimeout(() => {
        $(".player .images").css("opacity", 0);
        window.setTimeout(() => {
          $(".player .images").css("opacity", 1);
          window.setTimeout(() => {
            $(".player .images").css("opacity", 0);
            window.setTimeout(() => {
              $(".player .images").css("opacity", 1);
              window.setTimeout(() => {
                const basePower = 40;
                const baseDamage = Math.floor(
                  Math.floor(
                    (Math.floor((2 * playerLevel) / 5 + 2) * basePower * foePokemon.atk) / playerPokemon.def
                  ) / 50
                ) + 2;
                hpPlayer -= baseDamage;
                
                if (hpPlayer <= 0) {
                  hpPlayer = 0;
                  $(".player .hp").text("0");
                  $(".player .hp-bar-active").css("width", "0%");
                  window.setTimeout(() => {
                    $(".window.menu").hide();
                    $(".player .images").delay(500).animate({ bottom: "-35em" }, 1000);
                    $(".text1").text(playerPokemon.name.toUpperCase() + " fainted...");
                    $(".text2").text("");
                    typer();
                    window.setTimeout(() => {
                      $(".text1").text(player.toUpperCase() + " whited out!");
                      $(".text2").text("");
                      typer();
                    }, 2000);
                  }, 500);
                } else {
                  $(".player .hp").text(hpPlayer);
                  $(".player .hp-bar-active").css("width", healthbar(hpPlayer, hpPlayerTotal) + "%");
                  window.setTimeout(() => {
                    reset();
                  }, 1000);
                }
              }, 100);
            }, 100);
          }, 100);
        }, 100);
      }, 300);
    }, 2000);
  }
};

// Main game function
const playPokemon = () => {
  // Setup UI elements (must be done after React renders)
  $(".player .level").text(playerLevel);
  $(".player .hp").text(hpPlayerTotal);
  $(".player .hpTotal").text(hpPlayerTotal);
  $(".player .name").text(playerPokemon.name.toUpperCase());
  $("#move0").html("TACKLE");
  $("#move1").html("TAIL WHIP");
  $("#move2").html("-");
  
  $(".foe .level").text(playerLevel);
  $(".foe .name").text(foePokemon.name.toUpperCase());
  
  $(".potionCount").text(potionCount);
  
  // Setup click handlers
  $(".button.item").off("click").on("click", () => {
    $(".window.item").show();
    $(".window.menu").hide();
  });
  
  $(".button.potion").off("click").on("click", () => {
    potion("normal");
  });
  
  $(".button.fight").off("click").on("click", () => {
    $(".window.fight").show();
    $(".window.menu").hide();
  });
  
  $(".button#move0").off("click").on("click", () => {
    attack("tackle");
  });
  
  $(".button#move1").off("click").on("click", () => {
    attack("tail whip");
  });
  
  $(".button#move2").off("click").on("click", () => {
    attack("-");
  });
  
  $(".button.back").off("click").on("click", () => {
    reset();
  });
  
  $(".button.pkmn").off("click").on("click", () => {
    $(".window.pkmn").show();
    $(".window.menu").hide();
  });
  
  $(".button.run").off("click").on("click", () => {
    hider();
    $(".text1").text("No! There's no");
    $(".text2").text("running from a");
    typer();
    window.setTimeout(() => {
      $(".text1").text("trainer battle!");
      $(".text2").text("");
      typer();
      window.setTimeout(() => {
        reset();
      }, 2000);
    }, 2000);
  });

  // Initial positions
  $(".foe .images").css("right", "16em");
  $(".player .images").css("left", "16em");
  $(".player .pokemon, .foe .pokemon, .stats, .balls, .window.item, .window.pkmn, .window.fight, .window.menu").hide();
  
  // Start animation sequence
  window.setTimeout(() => {
    $(".foe .images").animate({ right: "0.8em" }, 800, "linear");
    $(".player .images").animate({ left: "0.8em" }, 800, "linear");
    window.setTimeout(() => {
      $(".trainer, .balls").show();
      window.setTimeout(() => {
        $(".text1").text(foe.toUpperCase() + " wants");
        $(".text2").text("to fight!");
        typer();
        window.setTimeout(() => {
          $(".balls").hide();
          $(".foe .images").animate({ right: "-21em" }, 400, "linear");
          window.setTimeout(() => {
            $(".text1").text(foe.toUpperCase() + " sent");
            $(".text2").text("out " + foePokemon.name.toUpperCase() + "!");
            typer();
            $(".foe .pokemon").show();
            $(".foe .trainer").hide();
            $(".foe .images").animate({ right: "0.8em" }, 700, "linear");
            window.setTimeout(() => {
              $(".foe .stats").show();
              $(".player .images").animate({ left: "-21em" }, 400, "linear");
              window.setTimeout(() => {
                $(".player .trainer").hide();
                $(".player .pokemon").show();
                $(".player .images").animate({ left: "0.8em" }, 700, "linear");
                $(".text1").text("Go! " + playerPokemon.name.toUpperCase() + "!");
                $(".text2").text("");
                typer();
                $(".player .stats").show();
                window.setTimeout(() => {
                  reset();
                }, 2000);
              }, 800);
            }, 1500);
          }, 1000);
        }, 2500);
      }, 400);
    }, 800);
  }, 600);
};

export default playPokemon;
