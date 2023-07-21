import { CoreModule } from './core.module';

describe('CoreModule', () => {
  let coreModule: CoreModule;

  beforeEach(() => {
    coreModule = new CoreModule(null);
  });

  it('should create an instance', () => {
    expect(coreModule).toBeTruthy();
  });

  it('should have only one instance', () => {
    let e: any;
    try {
      const errorInstance = new CoreModule(coreModule);
      expect(errorInstance).toBe(null);
    } catch (error) {
      e = error;
    }
    expect(e).toEqual(new Error(
      'CoreModule is already loaded. Import it in the AppModule only'
    ));
  });
});
