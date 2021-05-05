import { NextPage, InferGetStaticPropsType, GetStaticPropsContext } from 'next';
import React from 'react';

import Timetable from '~/models/Timetable';
import TimetableDriver from '~/drivers/TimetableDriver';
import TimetableRepository from '~/repositories/TimetableRepository';
import TimetableUseCase from '~/usecases/TimetableUseCase';

// presenters
import { groupByStation } from '~/presenters/TimetablePresenter';

// components
import StationTimetables from '~/components/StationTimetables';

type Props = InferGetStaticPropsType<typeof getStaticProps>;
type NextPageWithProps = NextPage<Props>;

const BetaPage: NextPageWithProps = ({ timetables }) => {
  const groupedTimetables = groupByStation(timetables);
  // console.log(timetables);
  return (
    <div>
      <h3>Beta</h3>
      {Object.keys(groupedTimetables).map((station) => (
        <StationTimetables
          key={station}
          station={station}
          timetables={groupedTimetables[station]}
        />
      ))}
    </div>
  );
};

Timetable.registerPersistentProps();

export const getStaticProps = async (context: GetStaticPropsContext) => {
  const repository = new TimetableRepository(new TimetableDriver());
  const usecase = new TimetableUseCase(repository);
  const timetables = await usecase.fetchAll();
  // const { VERCEL_GIT_COMMIT_SHA } = process.env;

  return {
    props: {
      // buildId: VERCEL_GIT_COMMIT_SHA || 'development',
      // usecase,
      timetables,
    },
  };
};

export default BetaPage;
