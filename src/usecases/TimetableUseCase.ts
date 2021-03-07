import Timetable from '~/models/Timetable';
import { TimetableUseCaseInterface } from '~/interfaces/usecases/TimetableUseCaseInterface';
import { TimetableRepositoryInterface } from '~/interfaces/repositories/TimetableRepositoryInterface';

export default class TimetableUseCase implements TimetableUseCaseInterface {
  private readonly timetableRepository: TimetableRepositoryInterface;

  constructor(timetableRepository: TimetableRepositoryInterface) {
    this.timetableRepository = timetableRepository;
  }

  async fetchAllInOperational(currentTime: number): Promise<Timetable[]> {
    const timetables = await this.timetableRepository.fetchAll();
    return timetables.reduce((ret: Timetable[], timetable): Timetable[] => {
      if (timetable.isInServiceDay(currentTime)) {
        return [...ret, timetable];
      }
      return ret;
    }, []);
  }

  async fetchAll(): Promise<Timetable[]> {
    return this.timetableRepository.fetchAll();
  }
}
