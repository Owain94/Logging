import { browser, by, element } from 'protractor';
import 'tslib';

describe('Menu', () => {

  beforeEach(async () => {
    await browser.get('/');
  });

  it('should have a navbar', async () => {
    const subject = await element(by.tagName('nav'));
    expect(subject).toBeTruthy();
  });

  it('should have 3 links', async () => {
    const subject = await element.all(by.css('ul.right a')).count();
    expect(subject).toEqual(3);
  });

  it('should link to the home page', async () => {
    const subject = await element.all(by.css('ul.right a')).get(0).getText();
    expect(subject === 'Home');
  });

  it('should link to the cases page', async () => {
    const subject = await element.all(by.css('ul.right a')).get(1).getText();
    expect(subject === 'Cases');
  });

  it('should link to the settings page', async () => {
    const subject = await element.all(by.css('ul.right a')).get(2).getText();
    expect(subject === 'Settings');
  });

});
