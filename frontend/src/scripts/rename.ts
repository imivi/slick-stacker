import fs from "fs"
import path from "path"


/**
 * Rename gzipped files from "[hash].js.gz" or "[hash].css.gz" to "script.js.gz" or "style.css.gz"
 * @param inputDir where the gzipped files are located
 * @param outputDir where the renamed files will be saved
 */
function renameDistFiles(inputDir: string, outputDir: string) {
    fs.readdirSync(inputDir).forEach(filename => {

        const filePath = path.join(inputDir, filename)

        if (filename.endsWith(".js.gz")) {
            fs.renameSync(filePath, path.join(outputDir, "bundle.js.gz"))
        }
        else if (filename.endsWith(".css.gz")) {
            fs.renameSync(filePath, path.join(outputDir, "style.css.gz"))
        }
    })
}


const inputDir  = "dist/assets"
const outputDir = "dist/assets"
renameDistFiles(inputDir, outputDir)