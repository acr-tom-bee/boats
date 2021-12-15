import upath from 'upath';
import fs from 'fs-extra';
import jsYaml from 'js-yaml';
import _ from 'lodash';

export default function (): string {
  const tplGlobals = this.env.globals;

  // eslint-disable-next-line prefer-rest-params
  const injectPath = upath.join(upath.dirname(tplGlobals.currentFilePointer), arguments[0]);

  if (!fs.pathExistsSync(injectPath)) {
    throw new Error('Path not found when trying to make optional: ' + injectPath);
  }

  const content: any = jsYaml.load(fs.readFileSync(injectPath, 'utf-8'));

  if (content && content['type'] !== 'object') {
    throw new TypeError('Referenced item must be an object: ' + injectPath);
  }

  const text = jsYaml.dump(_.omit(content, 'required'));

  const parts = text.split('\n');
  const first = parts.pop();

  for (let i = 1; i < parts.length; i++) {
    parts[i] = tplGlobals.indentObject[tplGlobals.indentNumber].linePadding + parts[i];
  }
  ++this.env.globals.indentNumber;
  return first + parts.join('\n');
}
