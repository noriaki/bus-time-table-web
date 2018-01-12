import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Card, { CardContent } from 'material-ui/Card';
import Typography from 'material-ui/Typography';
import { withStyles } from 'material-ui/styles';

// style
import ContactFormStyles from '../styles/ContactForm-Style';

class ContactForm extends PureComponent {
  static componentName = 'ContactForm'
  static propTypes = {
    classes: PropTypes.objectOf(PropTypes.string).isRequired,
  }

  componentDidMount() {
    const { form } = this;
    const container = form.parentNode;
    const containerStyle = container.currentStyle ||
            document.defaultView.getComputedStyle(container);
    const containerWidth = parseFloat(containerStyle.width);
    form.setAttribute('width', containerWidth);
  }

  render() {
    const { classes } = this.props;
    return (
      <section>
        <Typography type="headline" className={classes.headline}>
          要望・不具合の問い合わせ
        </Typography>
        <Card>
          <CardContent>
            <iframe
              ref={(c) => { this.form = c; }}
              title="要望・不具合の問い合わせフォーム"
              src="https://docs.google.com/forms/d/e/1FAIpQLSc-Thtn4jIWPvdFq1wsBZ-1bj35mTvCWEqPeULVYH5KSFqWPg/viewform?embedded=true"
              width="300"
              height="500"
              frameBorder="0"
              marginHeight="0"
              marginWidth="0">
              読み込んでいます...
            </iframe>
          </CardContent>
        </Card>
      </section>
    );
  }
}
export default withStyles(ContactFormStyles)(ContactForm);
