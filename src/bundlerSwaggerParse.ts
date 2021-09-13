import upath from 'upath';
import YAML from 'js-yaml';
import fs from 'fs-extra';
import getOutputName from '@/getOutputName';
import validate from '@/validate';
import { BoatsRC } from '@/interfaces/BoatsRc';
import $RefParser from '@apidevtools/json-schema-ref-parser';

/**
 * Bundles many files together and returns the final output path
 * @param inputFile
 * @param outputFile
 * @param options
 * @param indentation
 * @param excludeVersion
 * @param dereference
 * @returns {Promise<string>}
 */
export default async (
  inputFile: string,
  outputFile: string,
  boatsRc: BoatsRC,
  indentation = 2,
  excludeVersion: boolean,
  dereference: boolean
): Promise<string> => {
  let bundled;
  try {
    bundled = await $RefParser.bundle(inputFile, boatsRc.jsonSchemaRefParserBundleOpts);
    if (dereference) {
      bundled = await $RefParser.dereference(bundled);
    }

    await validate.decideThenValidate(
      bundled as any,
      boatsRc
    );

    let contents;
    if (upath.extname(outputFile) === '.json') {
      contents = JSON.stringify(bundled, null, indentation);
    } else {
      contents = YAML.safeDump(bundled, {
        indent: indentation,
      });
    }
    fs.ensureDirSync(upath.dirname(outputFile));
    const pathToWriteTo = getOutputName(outputFile, bundled, excludeVersion);
    fs.writeFileSync(pathToWriteTo, contents);
    return pathToWriteTo;
  } catch (e) {
    console.error(JSON.stringify(bundled, undefined, 2));
    throw e;
  }
};
