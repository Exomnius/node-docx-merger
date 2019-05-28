const fs = require('fs');
const path = require('path');

const hrstart = process.hrtime();

const DocxMerger = require('docx-merger');

const inputDir = path.resolve(__dirname, 'input');

const file1 = fs.readFileSync(path.resolve(inputDir, '2019_05_27_12_591_25438410_57_254882.docx'), 'binary');
const file2 = fs.readFileSync(path.resolve(inputDir, '2019_05_27_12_591_273903600_57_254882.docx'), 'binary');

const docx = new DocxMerger({},[file1,file2]);

docx.save('nodebuffer', (data) => {
	fs.writeFile("output/output.docx", data, (err) => {
		const hrend = process.hrtime(hrstart);

		if (err) {
			console.error(err)
		} else {
			console.log(`Execution time: ${hrend[0]} seconds ${hrend[1] / 1000000} milliseconds`)
		}
	});
});
