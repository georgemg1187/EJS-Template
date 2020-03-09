const fs = require('fs');
const ejs = require("ejs");

const format = require('html-format');
const clean = require('remove-blank-lines');

async function render() {
	try {
		await fs.mkdir('dist');

		const html = await ejs
			.renderFile('index.ejs')
			.then(output => output);

		//format html
		const cleanHtml = clean(html);
		const formatedHtml = format(cleanHtml, ' '.repeat(4));

		//create file and write html
		await fs.writeFile("dist/index.html", formatedHtml, "utf8");

		await fs.unlink("dist/render.js");
	} catch (err) {
		console.log(err)
	}
}

render();