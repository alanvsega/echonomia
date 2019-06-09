import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { Picker } from 'react-native-picker-dropdown';
import { connect } from 'react-redux';

import Style from '../_utils/Style';
import { okAlert } from '../_utils/Alert';

import Loader from '../_components/loader/Loader';
import Header from '../_components/header/Header';

import { fetchList, fetchAnswers } from '../_actions/QuestionActions';
import * as QuestionReducer from '../_reducers/QuestionReducer';

class FormScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
    }
  }

  _onSalvarButtonClick = () => {
    Keyboard.dismiss();

    console.log(this.state.data);
    //this.props.fetchAnswers();
  }

  setAnswer = (key, question, answer) => {
    let stateCopy = Object.assign({}, this.state);

    stateCopy.data = stateCopy.data.slice();
    stateCopy.data[key] = Object.assign({}, stateCopy.data[key]);
    stateCopy.data[key].question = question;
    stateCopy.data[key].answer = answer;

    this.setState(stateCopy);
  }

  componentDidMount() {
    this.props.fetchList();
  }

  render() {
    if(this.props.questionIsLoading)
      return <Loader/>;
    else {
      return (
        <View style={Style.container}>
          <Header navigation={this.props.navigation}/>
          <ScrollView style={Style.scrollContent}>
            <Text style={Style.titleLabel}>Formulário de Perfil de Usuário</Text>
            <View style={Style.detailsView}>
              {this.props.questions != null && this.props.questions.map((question, i) =>
              <View key={i}>
                <Text style={Style.detailsLabel}>{question.title}}</Text>
                <Picker
                  style={Style.formEditTextInput}
                  onValueChange={(x) => this.setAnswer(i, question.title, x)}
                  style={Style.formEditPicker}
                  textStyle={Style.whiteText}
                >
                  {this.props.questions.alternatives != null && this.props.questions.alternatives.map((alternative, k) =>
                    <Picker.Item label={alternative} value={alternative} key={k}/>
                  )}
                </Picker>
              </View>
              )}
              <View style={Style.buttonView}>
                <TouchableOpacity
                  style={Style.greenButton}
                  onPress={this._onSalvarButtonClick}
                >
                  <Text style={Style.whiteText}>SALVAR</Text>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        </View>
      );
    }
  }
}

const mapStateToProps = state => ({
  questions: QuestionReducer.getQuestions(state),
  questionIsLoading: QuestionReducer.isLoading(state),
});

const mapDispatchToProps = dispatch => ({
  fetchList: () => dispatch(fetchList()),
  fetchAnswers: (data) => dispatch(fetchAnswers(data)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FormScreen);