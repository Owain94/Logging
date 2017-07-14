import { browser, by, element } from 'protractor';
import 'tslib';

describe('Header', () => {

  beforeEach(async () => {
    await browser.get('/');
  });

  it('should have one heading', async () => {
    const subject = await element.all(by.tagName('h1')).count();
    expect(subject).toEqual(1);
  });

  it('should have a subheading', async () => {
    const subject = await element(by.css('.subheading')).isPresent();
    expect(subject).toBeTruthy();
  });

});
