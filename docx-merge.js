const fs = require('fs');
const path = require('path');
const DocxMerger = require('docx-merger');

const inputDir = path.resolve(__dirname, 'input');
const outputDir = path.resolve(__dirname, 'output');

const readFile = (path) => {
	return new Promise((resolve, reject) => {
		fs.readFile(path, 'binary', (err, data) => {
			if (err) {
				reject(err);
			} else {
				resolve(data);
			}
		});
	});
};

const hrstart = process.hrtime();

(async () => {
	const filesCount = 500;
	const files = [...Array(filesCount)].map((_, i) => i);

	const fileContents = await Promise.all(files.map(() => {
		return readFile(path.resolve(inputDir, 'Conicola.docx'));
	}));

	const hrInt = process.hrtime();
	console.log(`File reading time: ${hrInt[0]} seconds ${hrInt[1] / 1000000} milliseconds`);

	const docx = new DocxMerger({},fileContents);

	docx.save('nodebuffer', (data) => {
		fs.writeFile("output/output.docx", data, (err) => {
			const hrend = process.hrtime(hrstart);

			if (err) {
				console.error(err)
			} else {
				const inputStats = fs.statSync(path.resolve(inputDir, 'Conicola.docx'));
				const outputStats = fs.statSync(path.resolve(outputDir, 'output.docx'));

				console.log(`Input file size: ${inputStats.size  / 1000} Kilobytes`);
				console.log(`Input file size: ${inputStats.size  / 1000000.0} Megabytes`);
				console.log(`Output file size: ${outputStats.size  / 1000} Kilobytes`);
				console.log(`Output file size: ${outputStats.size / 1000000.0} Megabytes`);
				console.log(`Execution time: ${hrend[0]} seconds ${hrend[1] / 1000000} milliseconds`);
			}
		});
	});
})();


