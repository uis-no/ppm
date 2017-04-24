import { Injectable } from '@angular/core';

import * as marked from 'marked';

@Injectable()
export class MarkdownService {

  constructor() {
  }

  convert(markdown: string) {
    return marked.parse(markdown);
  }
}
