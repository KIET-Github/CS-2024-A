"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.merge = void 0;
const fs_1 = require("fs");
const path_1 = require("path");
let files = {
    issues: "gh-issue-event.json",
    pulls: "gh-pull-request.json",
    stars: "gh-star-event.json",
    soQuestions: "so-tags.json",
};
let canonicalNames = {
    "AL Code": "AL",
    BlitzBasic: "BlitzMax",
    "Classic ASP": "ASP",
    "Csound Document": "Csound",
    "Csound Score": "Csound",
    FORTRAN: "Fortran",
    "Graphviz (DOT)": "DOT",
    Matlab: "MATLAB",
    Nimrod: "Nim",
    PAWN: "Pawn",
    Perl6: "Raku",
    "Perl 6": "Raku",
    REALbasic: "Xojo",
    Sass: "Sass/SCSS",
    SCSS: "Sass/SCSS",
    VimL: "Vim script",
};
// TODO New script to calculate colors and find a seed to maximize the minimum
// TODO distance between any top 10 (or 20?) languages.
// TODO This script should be rerun at any data quarterly update.
function main() {
    let dir = "./scripts/data";
    let mergeKeys = ["name", "date"];
    let items = [];
    for (let key of Object.keys(files)) {
        let kidFull = (0, path_1.join)(dir, files[key]);
        let rawItems = JSON.parse((0, fs_1.readFileSync)(kidFull).toString());
        let convertedItems = rawItems.map((item) => ({
            name: canonicalNames[item.name] || item.name,
            date: `${item.year}Q${item.quarter}`,
            [key]: Number(item.count),
        }));
        if (items.length) {
            if (convertedItems.length) {
                items = merge({ a: items, b: convertedItems, on: mergeKeys });
            }
        }
        else {
            items = convertedItems;
        }
    }
    // Convert to CSV-ish format and write.
    // TODO Totals by quarter. Fraction for langs.
    let sums = sumGrouped({
        by: "date",
        items,
        outs: Object.keys(files),
    });
    let tabled = {
        items: tablify(items),
        sums: tablify(sums),
        // TODO Remove redundancies and auto-apply later?
        translations: readCsv("./scripts/data/keys.csv"),
    };
    console.log(JSON.stringify(tabled));
}
function merge(options) {
    // Extract data and prep compares.
    let { a, b, on } = options;
    if (!a.length || !b.length)
        return [];
    let compares = on.map((key) => {
        let value = a[0][key];
        if (typeof value == "string") {
            return (x, y) => x[key].localeCompare(y[key]);
        }
        else {
            return (x, y) => x[key] - y[key];
        }
    });
    let compareKeys = (x, y) => {
        if (!(x && y)) {
            if (x) {
                return -1;
            }
            else if (y) {
                return 1;
            }
            return 0;
        }
        for (let compare of compares) {
            let result = compare(x, y);
            if (result) {
                return result;
            }
        }
        return 0;
    };
    // Cat arrays and prep merge.
    let combo = a.concat(b).sort(compareKeys);
    let keysA = new Set(Object.keys(a[0]));
    let keysB = new Set(Object.keys(b[0]));
    let extrasA = [...keysA].filter((key) => !keysB.has(key));
    let extrasB = [...keysB].filter((key) => !keysA.has(key));
    let extras = extrasA.concat(extrasB).sort();
    let allKeys = on.concat(extras);
    //~ console.error(combo.slice(0, 10));
    //~ console.error(extras);
    let build = (item) => {
        let result = {};
        for (let key of allKeys) {
            result[key] = item[key] || 0;
        }
        return result;
    };
    // Merge arrays.
    let results = [];
    let prev = build(combo[0]);
    let equals = 0, count = 0;
    for (let item of combo.slice(1)) {
        count += 1;
        let comparison = compareKeys(prev, item);
        if (comparison) {
            // It's new, so just push it on.
            results.push(prev);
            prev = build(item);
        }
        else {
            // It was already there, so expand on it.
            for (let key of extras) {
                let value = item[key];
                if (value != null) {
                    let prev_value = prev[key];
                    if (typeof prev_value == "number") {
                        // Increment existing numbers, because we end up with duplicates,
                        // because of different language names in the same quarter.
                        prev[key] =
                            prev_value + value;
                    }
                    else {
                        prev[key] = value;
                    }
                }
            }
            equals += 1;
        }
    }
    // Include the last one and done.
    results.push(prev);
    console.error(`${equals}/${count}`);
    return results;
}
exports.merge = merge;
function readCsv(name) {
    let content = (0, fs_1.readFileSync)(name).toString();
    let lines = content.split("\n");
    // TODO Improve csv parsing, or maybe convert this whole script to python.
    // TODO Or maybe change keys.csv to json.
    let rows = lines
        .filter((line) => line.trim())
        .map((line) => line.split(",").map((value) => value.replace(/(^")|("$)/g, "")));
    return {
        keys: rows[0],
        rows: rows.slice(1),
    };
}
// TODO Typing here is a disaster. See if there are ways to fix it all.
function sumGrouped(options) {
    let { items, by, outs } = options;
    // Sum things up.
    let keyedSums = {};
    for (let item of items) {
        // TODO How to assert at type level that item[by] is string and
        // TODO item[out] is number?
        let key = item[by];
        let keyedSum = keyedSums[key];
        if (!keyedSum) {
            keyedSum = { [by]: key };
            for (let out of outs) {
                keyedSum[out] = 0;
            }
            // console.error(key, keyedSum);
            keyedSums[key] = keyedSum;
        }
        for (let out of outs) {
            keyedSum[out] +=
                // Treat missing values as 0.
                item[out];
        }
    }
    // Sort array of sums.
    let sums = Object.keys(keyedSums)
        .map((key) => keyedSums[key])
        .sort((a, b) => {
        return a[by].localeCompare(b[by]);
    });
    // // Normalize.
    // let normed = items.map(item => {
    //   item = Object.assign({}, item);
    //   let itemSums = keyedSums[item[by] as unknown as string];
    //   for (let out of outs) {
    //     (item[out] as unknown as number) /= itemSums[out] as unknown as number;
    //   }
    //   return item;
    // });
    // Done.
    return sums;
}
function tablify(items) {
    let keys = Object.keys(items[0]);
    let rows = items.map((item) => keys.map((key) => item[key]));
    return { keys, rows };
}
// Run main.
main();
