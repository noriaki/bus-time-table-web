import TimetableDriver from '~/drivers/TimetableDriver';

describe('drivers/timetable', () => {
  it('t', async () => {
    const t = new TimetableDriver();
    const subject = await t.find('home', 'weekday');
    expect(subject).toHaveProperty('version', 20210301);
  });
});
