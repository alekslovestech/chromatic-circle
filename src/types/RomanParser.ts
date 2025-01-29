import { ChordType } from "./NoteGroupingTypes";

const romanRegex: RegExp =
  /^(#|♯|b|♭)?(I|II|III|IV|V|VI|VII|i|ii|iii|iv|v|vi|vii)(\+|7|maj7|o|o7|dim|dim7|aug|ø7)?$/;

export class ParsedRomanString {
  constructor(
    public prefix: string,
    public pureRoman: string,
    public suffix: string,
    public baseRoman: string | undefined,
  ) {}
}

export function splitRomanString(romanString: string): ParsedRomanString {
  const match = romanString.match(romanRegex);
  if (match) {
    return new ParsedRomanString(match[1] || "", match[2], match[3] || "", undefined);
  }

  return new ParsedRomanString("", romanString, "", undefined);
}
