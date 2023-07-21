export enum Regex {
    posterURL = '(https?:\/\/.*\.(?:png|jpg))',
    website = '(www)\.[a-z-0-9]{1,42}\.[a-z]{2,3}',
    imdbid = '[t]{2}[0-9]{6,}',
    cf = '^[a-zA-Z]{6}[0-9]{2}[abcdehlmprstABCDEHLMPRST]{1}[0-9]{2}([a-zA-Z]{1}[0-9]{3})[a-zA-Z]{1}$'
}
