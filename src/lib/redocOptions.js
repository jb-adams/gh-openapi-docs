import defaults from './defaults';

class RedocOptions {

    constructor() {
        this.options = {...defaults.redoc.options}
        this.optionsDotNotation = [];
    }

    dotNotation(nodeObj, precedingString, list) {

        const concatDotNotation = (a, b) => `${a}.${b}`;

        Object.keys(nodeObj).forEach(key => {
            if (typeof nodeObj[key] === 'object') {
                this.dotNotation(nodeObj[key], concatDotNotation(precedingString, key), list);
            } else {
                let optString = `${concatDotNotation(precedingString, key)}=${nodeObj[key]}`
                list.push(optString);

            }
        });
    }

    getRedocCliOptions() {
        let optStringList = [];
        this.dotNotation(this.options, 'options', optStringList);
        optStringList = optStringList.map(s => `--${s}`);
        let optString = optStringList.join(' ');
        return optString;
    }
}

const redocOptions = new RedocOptions();
Object.freeze(redocOptions);
export default redocOptions;