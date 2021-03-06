//survey new shows survey form and survey form review
import React from "react";
import {reduxForm} from 'redux-form'
import SurveyForm from "./SurveyForm";
import SurveyFormReview from "./SurveryFormReview";

class SurveyNew extends React.Component {
  state = { showFormReview: false };

  renderContent() {
    if (this.state.showFormReview) {
      return (
        <SurveyFormReview
          onCancel={() => this.setState({ showFormReview: false })}
        />
      );
    }
    return (
      <SurveyForm
        onSurveySubmit={() => this.setState({ showFormReview: true })}
      />
    );
  }

  render() {
    return <div>{this.renderContent()}</div>;
  }
}

export default reduxForm({
  form:'surveyForm',
  destroyOnUnmount: true
})(SurveyNew);
