import { GlobalFontAwesomeModule } from './global-font-awesome.module';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';

describe('GlobalFontAwesomeModule', () => {
  let module: GlobalFontAwesomeModule;
  const library: FaIconLibrary = new FaIconLibrary();

  beforeEach(() => {
    module = new GlobalFontAwesomeModule(library);
  });

  it('should create an instance', () => {
    expect(module).toBeTruthy();
  });
});
