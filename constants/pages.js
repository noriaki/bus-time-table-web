const { title, description } = require('../package.json');

const pages = {
  '/': {
    title: `${title} - 発車タイマー`,
    appbarTitle: 'バス発車タイマー',
    label: 'タイマー',
    description: `${description} 発車タイマーは、アプリを起動して"3秒"で各バス停の次の発車時刻までの残り時間が分かります`,
  },
  '/timetable': {
    title: `${title} - 時刻表`,
    appbarTitle: 'バス時刻表',
    label: '時刻表',
    description: `${description} 時刻表のページでは、マンション発、東銀座駅発、新橋駅発の各バス停の全時間帯のシャトルバス時刻表を一覧で見ることが出来ます`,
  },
  '/getapp': {
    title: `${title} - アプリとしてホーム画面へ追加するには`,
    appbarTitle: 'アプリをホーム画面へ追加',
    label: 'アプリ',
    description: `${description} 急いでいるときにも簡単にすぐ起動できるよう、ホーム画面にアプリとして配置（ダウンロード）することが出来ます`,
  },
  '/info': {
    title: `${title} - お知らせ・アプリ概要`,
    appbarTitle: 'お知らせ・アプリ概要',
    label: 'お知らせ',
    description: `${description} お知らせのページには、このアプリの概要やアップデート履歴、作者からのお知らせを掲載しています`,
  },
};

pages.paths = Object.keys(pages);
module.exports = pages;
