// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import {getScheme} from 'utils/url';

import RemoveMarkdown from './remove_markdown';

export default class LinkOnlyRenderer extends RemoveMarkdown {
    public link(href: string, title: string, text: string) {
        // Regex to match trailing full-width punctuation
        const punctuationRegex = /[，。！？、；：]+$/u;

        let outHref = href;
        let outText = text;

        // Remove trailing punctuation from href and text
        const hrefMatch = href.match(punctuationRegex);
        if (hrefMatch) {
            outHref = href.slice(0, -hrefMatch[0].length);
            outText = text.slice(0, -hrefMatch[0].length) + hrefMatch[0];
        }

        if (!getScheme(outHref)) {
            outHref = `http://${outHref}`;
        }

        let output = `<a class="theme markdown__link" href="${outHref}" target="_blank"`;

        if (title) {
            output += ' title="' + title + '"';
        }

        output += `>${outText}</a>`;
        return output;
    }
}
