import TimetableDriver from '~/drivers/TimetableDriver';

describe('drivers/timetable', () => {
  it('#fetch(stationId, operationalDayId) should returning timetable JSON', async () => {
    const driver = new TimetableDriver();
    const subject = await driver.fetch('home', 'weekday');
    expect(subject).toHaveProperty('version', 20210301);
  });
});
