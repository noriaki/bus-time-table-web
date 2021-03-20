import { GetStaticProps, NextPage } from 'next';
import React from 'react';

import Timetable from '~/models/Timetable';
import TimetableDriver from '~/drivers/TimetableDriver';
import TimetableRepository from '~/repositories/TimetableRepository';
import TimetableUseCase from '~/usecases/TimetableUseCase';

type Props = {
  // buildId: string;
  // usecase: TimetableUseCase;
  timetables: Timetable[];
};
type NextPageWithProps = NextPage<Props>;
type GetStaticPropsWithProps = GetStaticProps<Props>;

const BetaPage: NextPageWithProps = ({ timetables }) => {
  return <div>Beta</div>;
};

export const getStaticProps: GetStaticPropsWithProps = async (context) => {
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
