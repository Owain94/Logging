import { browser, by, element } from 'protractor';
import 'tslib';

describe('Footer', () => {

  beforeEach(async () => {
    await browser.get('/');
  });

  it('should show affection', async () => {
    const subject = await element(by.css('.icon-heart-2')).isPresent();
    expect(subject).toBeTruthy();
  });

  it('should have a link', async () => {
    const subject = await element(by.cssContainingText('a', 'Owain van Brakel')).getAttribute('href');
    expect(subject).toEqual('https://owain.nl/');
  });

});
