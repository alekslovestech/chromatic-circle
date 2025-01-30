/*const romanRegex: RegExp =
  /^(#|♯|b|♭)?(I|II|III|IV|V|VI|VII|i|ii|iii|iv|v|vi|vii)(\+|7|maj7|o|o7|dim|dim7|aug|ø7)?$/;*/
const accidentalRegex: RegExp = /#|♯|b|♭/;
const pureRomanRegex: RegExp = /I|II|III|IV|V|VI|VII|i|ii|iii|iv|v|vi|vii/;
const chordTypeRegex: RegExp = /\+|7|maj7|o|o7|dim|dim7|aug|ø7/;
const romanRegex: RegExp = new RegExp(
  `^(${accidentalRegex.source})?(${pureRomanRegex.source})(${chordTypeRegex.source})?(\/(${pureRomanRegex.source}))?$`,
);

export class ParsedRomanString {
  constructor(
    public accidentalPrefix: string,
    public pureRoman: string,
    public chordSuffix: string,
    public bassRoman: string | undefined,
  ) {}
}

export function splitRomanString(romanString: string): ParsedRomanString {
  const match = romanString.match(romanRegex);
  if (match) {
    return new ParsedRomanString(match[1] || "", match[2], match[3] || "", match[5] || undefined);
  }

  throw new Error(`No match found for roman string: ${romanString}`);
}
