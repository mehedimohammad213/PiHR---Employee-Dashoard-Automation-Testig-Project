import { Before, After, BeforeAll, AfterAll } from '@cucumber/cucumber';
import { CustomWorld } from './world';

BeforeAll(async function() {
  console.log('Starting BDD test suite...');
});

Before(async function(this: CustomWorld) {
  await this.init();
});

After(async function(this: CustomWorld) {
  await this.cleanup();
});

AfterAll(async function() {
  console.log('BDD test suite completed.');
});
