import {transform} from '@babel/standalone';
import {tokenize} from 'esprima';
import _ from 'lodash';

const OPEN_DELIMITERS = [ '(', '{', '[', '`' ];
const CLOSE_DELIMITERS = [ ')', '}', ']', '`' ];
const DELIMITER_MAP = {
  ')': '(',
  '}': '{',
  ']': '[',
  '`': '`'
};

class ParserClass {
    findDelimiters = ({ column }, lineContents) =>
        _.intersection(_.takeRight(lineContents, lineContents.length - column), OPEN_DELIMITERS).length
    parse(code) {
        const transformedCode = transform(code, { presets: ['react']}).code;
        const codeByLine = transformedCode.split('\n');
        const tokenized = tokenize(transformedCode, { loc: true });
        const parens = { '(': 0, '{': 0, '[': 0 };
        let wasOpen = false;
        const exp = _.reduce(tokenized, (expressions, { value, loc: { end } }, index) => {
            const lineNumber = end.line;
            const lineContents = codeByLine[lineNumber - 1];
            const lineHasMoreDelimiters = this.findDelimiters(end, lineContents);
            const endOfLine = end.column === lineContents.length;

            if (expressions[lineNumber]) { return expressions; }

            if (OPEN_DELIMITERS.includes(value)) {
            parens[value] += 1;
            wasOpen = true;
            }

            if (CLOSE_DELIMITERS.includes(value)) {
            parens[DELIMITER_MAP[value]] -= 1;
            }

            if (!lineHasMoreDelimiters && wasOpen && _.every(parens, count => count === 0)) {
            wasOpen = false;
            expressions[lineNumber] = _.take(codeByLine, lineNumber).join('\n');

            return expressions;
            }

            if (!lineHasMoreDelimiters && _.every(parens, count => count === 0)) {
            expressions[lineNumber] = _.take(codeByLine, lineNumber).join('\n');

            return expressions;
            }

            return expressions;
        }, {});

        eval(transformedCode);
        return exp;
    }
}

export const Parser = new ParserClass();