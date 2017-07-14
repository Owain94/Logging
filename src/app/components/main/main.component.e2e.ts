import { browser, by, element } from 'protractor';
import 'tslib';

describe('App', () => {

  beforeEach(async () => {
    await browser.get('/');
  });

  it('should have a title', async () => {
    const subject = await browser.getTitle();
    const result  = 'Logging';
    expect(subject).toEqual(result);
  });

  it('should have the router-outlet', async () => {
    const subject = await element(by.tagName('router-outlet')).isPresent();
    expect(subject).toBeTruthy();
  });

  it('should have a footer', async () => {
    const subject = await element(by.tagName('app-footer')).isPresent();
    expect(subject).toBeTruthy();
  });

});
