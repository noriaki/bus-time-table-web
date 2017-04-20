import { Component } from 'react';

export default class extends Component {
  static pageview = ({ page, title = document.title }) => {
    ga('set', { page, title });
    ga('send', 'pageview');
  }

  componentDidMount() {
    /* eslint-disable */
    (function(i,s,o,h,g,r,a,m){
      i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
        (i[r].q=i[r].q||[]).push(arguments)
      },i[r].l=1*new Date();
      a=s.createElement(o),m=s.getElementsByTagName(h)[0];
      a.async=1;a.src=g;m.appendChild(a)
    })(
      window,document,
      'script','head','https://www.google-analytics.com/analytics.js','ga'
    );
    /* eslint-enable */
    ga('create', this.props.id, this.props.options || 'auto');
    if (navigator.standalone) { ga('set', 'dataSource', 'web/standalone'); }
  }

  render() { return null; }
}
