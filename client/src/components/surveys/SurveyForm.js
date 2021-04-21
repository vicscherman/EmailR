//shows a form for a user to add input
import _ from 'lodash'
import React from "react";
import { reduxForm, Field } from "redux-form";
import {Link} from 'react-router-dom'
//installed an older version of redux form npm install --save  redux-form --legacy-peer-deps

import SurveyField from "./SurveyField";
import validateEmails from '../../utils/validateEmails'
import formFields from './formFields'



class SurveyForm extends React.Component {
  renderFields() {
    return _.map(formFields, ({label, name}) => {
      return <Field key={name} component={SurveyField} type="text" label={label} name={name}/>
    })
  }
  //w/o lodash
  // renderFields() {
  //  return FIELDS.map(field=>{
  //     return <Field key={field.name} component={SurveyField} type="text" label={field.label} name={field.name}/>
  //   })
  // }

 

  render() {
    return (
      <div>
        <form onSubmit={this.props.handleSubmit(this.props.onSurveySubmit)}>
          {this.renderFields()}
         <Link to="/surveys" className="red btn-flat left white-text">
         Cancel
         </Link>
          <button type="submit" className="blue darken-1 btn-flat right white-text">
            Next
            <i className="material-icons right">done</i>
          </button>
        </form>
      </div>
    );
  }
}

function validate(values){
  const errors = {}

  errors.recipients = validateEmails(values.recipients || '')

  formFields.forEach(({name})=>{
    if (!values[name]){
      errors[name] =`You must provide a value for ${[name]}`
    }
  })
  
 

  return errors
}

export default reduxForm({
  validate: validate,
  form: "surveyForm",
  destroyOnUnmount: false
})(SurveyForm);
