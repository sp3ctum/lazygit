#!/usr/bin/env -S deno run --allow-read --allow-write --allow-env
import {  variants } from "npm:@catppuccin/palette@0.1.5";
import { stringify as stringifyYaml } from "https://deno.land/std@0.201.0/yaml/stringify.ts";


const accents = [
  "rosewater",
  "flamingo",
  "pink",
  "mauve",
  "red",
  "maroon",
  "peach",
  "yellow",
  "green",
  "teal",
  "sky",
  "sapphire",
  "blue",
  "lavender",
] as const;

const start = performance.now()
let count = 0

Object.entries(variants)
  .forEach(([name, palette]) => {
    for (const accent of accents) {
      const theme = {
        theme: {
          activeBorderColor: [palette[accent].hex, "bold"],
          inactiveBorderColor: [palette.subtext0.hex],
          optionsTextColor: [palette.blue.hex],
          selectedLineBgColor: [palette.surface0.hex],
          selectedRangeBgColor: [palette.surface0.hex],
          cherryPickedCommitBgColor: [palette.surface1.hex],
          cherryPickedCommitFgColor: [palette[accent].hex],
          unstagedChangesColor: [palette.red.hex],
          defaultFgColor: [palette.text.hex],
          searchingActiveBorderColor: [palette.yellow.hex]
        },
      };

      Deno.writeTextFileSync(`./themes/${name}/${name}-${accent}.yml`, stringifyYaml(theme));
      Deno.writeTextFileSync(`./themes-mergable/${name}/${name}-${accent}.yml`, stringifyYaml({
        gui: theme
      }));
      count += 2
    }
  });

console.log('Built', count, 'files in', performance.now() - start, 'ms');
