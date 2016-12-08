/* jshint esversion: 6 */

"use strict";

class Property {
    constructor(name, displayName, description, typeClass, typeName) {
        this.name = name;
        this.displayName = displayName;
        this.description = description;
        this.typeClass = typeClass;
        this.typeName = typeName;
    }
}

class Field extends Property{
    constructor(property, value) {
        super(
            property.name,
            property.displayName,
            property.description,
            property.typeClass,
            property.typeName
        );
        this.value = value;
    }
}

class Definition {
    constructor() {
        this._summaryFormat = "";
        this._nameFormat = "";
        this._properties = [];
    }

    toJSON(key) {
        let repr = {};

        for (let val in this)
        {
            if (val == "_properties") { continue; }
            if (val == "_summaryFormat") { continue; }
            if (val == "_nameFormat") { continue; }
            repr[val] = this[val];
        }

        return repr;
    }

    name() {
        let nameStr = this._nameFormat;

        let re = /{([^}]+)}/g;

        let matches = nameStr.match(re);

        for (let match of matches || [])
        {
            let key = match.slice(1, -1);

            let value = this[key] || match;

            nameStr = nameStr.replace(match, value);
        }

        return nameStr;
    }

    summary() {
        let summaryStr = this._summaryFormat;

        let re = /{([^}]+)}/g;

        let matches = summaryStr.match(re);

        for (let match of matches || [])
        {
            let key = match.slice(1, -1);

            let value = this[key] || match;

            summaryStr = summaryStr.replace(match, value);
        }

        return summaryStr;
    }

    title() {
        let nameStr = this.name();
        let summaryStr = this.summary();

        let titleStr = nameStr;

        if (nameStr.length > 0 && summaryStr.length > 0)
        {
            titleStr += ": ";
        }

        titleStr += summaryStr;

        return titleStr;
    }

    toString() {
        let s = this.title();

        this._properties.forEach(prop => {
            let value = this[prop.name];

            if (value === undefined) { return; }

            s += "\n" + prop.displayName + ": ";

            if (value instanceof Array)
            {
                s += "[" + value.length + "]";
            }
            else
            {
                s += value;
            }
        });

        return s;
    }

    fields() {
        let ret = [];

        this._properties.forEach(prop => {
            let value = this[prop.name];

            if (typeof value != 'undefined')
            {
                ret.push(new Field(prop, value));
            }
        });

        return ret;
    }
}

exports.Definition = Definition;
exports.Property = Property;
exports.Field = Field;
