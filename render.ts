//imports
import util = require("util");
import fs = require("fs");
import ejs = require("ejs");

const format = require('html-format');
const clean = require('remove-blank-lines');

//promisify
const mkdir = util.promisify(fs.mkdir);
const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);
const deleteFile = util.promisify(fs.unlink);

async function render() {
  try{        
    //create output directory
    await mkdir("dist", {recursive: true});

    //render ejs template to html string
    const html = await ejs
      .renderFile("index.ejs", {model: true })
      .then(output => output);

    //format html
    const cleanHtml = clean(html);   
    const formatedHtml = format(cleanHtml, ' '.repeat(4));

    //create file and write html
    await writeFile("dist/index.html", formatedHtml, "utf8");
    deleteFile("dist/render.js");


  }catch(error){
    console.log(error);
  }
}

render();