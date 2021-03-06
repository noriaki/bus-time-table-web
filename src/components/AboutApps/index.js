/* eslint-disable max-len */
import React from 'react';

// material-ui
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';

import logs from '~/data/changelogs.json';
import AppVersion from './AppVersion';

const AboutApps = () => (
  <>
    <Typography component="h2" variant="h6">
      このアプリについて
    </Typography>
    <Card>
      <CardMedia
        component="img"
        alt="DEUX TOURS シャトルバス時刻表アプリ"
        src="/icons/app-512x512.png"
      />
      <CardContent>
        <Typography component="h3" variant="body2">
          開いて3秒で次の発車時刻が分かる
        </Typography>
        <Typography
          paragraph
          component="p"
          variant="caption"
          color="textSecondary"
        >
          東京都中央区晴海三丁目のマンション「ドゥ・トゥール(DEUX
          TOURS)」から東銀座を経由して新橋駅を結ぶシャトルバスの発車タイマーと時刻表を手軽にチェックできるアプリです。
          <br />
          シャトルバスの発車タイマーは『起動して3秒で次の発車時刻が分かる』というコンセプトのもと、各バス停の次発への残り時間をカウントダウンします。時刻表では、マンション発、東銀座駅発、新橋駅発の各バス停の全時間帯のシャトルバス時刻表を一覧で見ることが出来ます。
        </Typography>
        <AppVersion {...logs[0]} />
      </CardContent>
    </Card>
  </>
);

export default AboutApps;
