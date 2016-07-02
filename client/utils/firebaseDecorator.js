/**
 * Created by amitava on 02/07/16.
 */
import React from 'react';
import {connect} from 'react-redux';


export default function decorator(options) {
  return function (Component) {

    @connect(state => state)
    class DecoratedComponent extends React.Component{

      constructor(...args){
        super(...args);
        this.state = {
          subscribers: {}
        }
      }
      componentWillMount(){
        console.log('mount')
      }

      componentWillUnmount(){
        console.log('unmount')
      }

      render(){

        return <Component {...this.props} />
      }

    }
    return DecoratedComponent;
  }
}