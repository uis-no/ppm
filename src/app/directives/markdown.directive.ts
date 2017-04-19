import { Directive, ElementRef, Input } from '@angular/core';
import * as marked from 'marked';

/*
  Dummy directive to allow html-tag "marked"
  Workaround i got from http://stackoverflow.com/questions/39288714/angular-2-rc6-sidebar-is-not-a-known-element
*/

@Directive ({
  selector: '[marked]'
})
export class MarkdownDirective {
  @Input('convert') markdown: string;

  constructor(private el: ElementRef) {

  }

  convert(markdown: string) {
    return marked.parse(markdown);
  }
}
