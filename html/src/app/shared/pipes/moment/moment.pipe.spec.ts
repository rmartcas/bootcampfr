import { MomentPipe } from './moment.pipe';

describe('MomentPipe', () => {
  it('create an instance', () => {
    const pipe = new MomentPipe();
    expect(pipe).toBeTruthy();
  });

  it('transform without value returns empty string', () => {
    const pipe = new MomentPipe();
    const ret = pipe.transform(null);
    expect(ret).toEqual('');
  });

  it('transform with value returns string', () => {
    const pipe = new MomentPipe();
    const ret = pipe.transform(new Date(2021, 11, 31, 23, 59, 59));
    expect(ret).toEqual('31/12/2021');
  });

  it('transform with value and format returns formatted string', () => {
    const pipe = new MomentPipe();
    const ret = pipe.transform(new Date(2021, 11, 31, 23, 59, 59), 'DD/MM/YYYY HH:mm:ss');
    expect(ret).toEqual('31/12/2021 23:59:59');
  });
});
