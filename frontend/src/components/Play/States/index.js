import React from "react";
import Move from "./Move";
import Level from "../Widgets/level";
import MoveWithStory from "./MoveWithStory";
import Gate from "./Gate";
import GateI from "./GateI";
import SkipRiddle from "./SkipRiddle";
import Riddle from "./Riddle";
import Guard from "./Guard";
import Jail from "./Jail";
import Mystery from "./Mystery";
import SideQuest from "./SideQuest";

export default {
  "": () => <div>Loading...</div>,
  "visited-moveable": Move,
  "go-moveable": Move,
  "story-moveable": MoveWithStory,
  "levelsolved-moveable": Move,
  level: Level,
  "randchance-moveable": Move,
  "rp-riddle-skippable": SkipRiddle,
  "rp-riddle-moveable": Move,
  "rp-riddle": Riddle,
  "rp-moveable": Move,
  "rp-guard": Guard,
  "rp-guard-moveable": Move,
  "rp-sidequest-skippable": SideQuest,
  jail: Jail,
  "jailvisiting-moveable": Move,
  "gate-moveable": Gate,
  "gatei-moveable": GateI,
  "mystery-moveable": Mystery,
  center: Level,
  // TODO: gatei-moveable
};
